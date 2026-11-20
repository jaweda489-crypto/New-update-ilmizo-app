import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ALL_30_JUZ_BOUNDARIES,
  aggregateAdultProgressByPeriod,
  appendLearningEvent,
  computeHijriDate,
  computeLearningStreak,
  computeQiblaFromCoords,
  computeSalahHistoricalSummary,
  createEmptySalahDayRecord,
  deriveHifzPlanState,
  getLocalDateKey,
  getLocalDateKeyWithOffset,
  parseHifzAyahRange,
  refreshRevisionQueueDueStatuses,
  resolveAyahIndexByNumber,
  scheduleHifzRevision,
  scoreQuizSubmission,
  validateSurahPayload,
} from '../engines/adultLearningEngines';
import { ALL_114_SURAHS } from '../data/quranData';
import { ASMA_UL_HUSNA, QUIZ_PACKS, VERIFIED_DUAS } from '../data/islamicContent';
import {
  AyahItem,
  DailyVerseActivity,
  LearningEvent,
  RevisionItem,
  SalahDayRecord,
  SurahPayload,
} from '../types/ilmizo';

test('Phase 2.1 — Quran Engine: 30 Juz boundaries, Ayah count validation, and sparse Ayah resolution', () => {
  // All 30 Juz boundaries exist in ascending order 1..30
  assert.equal(ALL_30_JUZ_BOUNDARIES.length, 30);
  for (let i = 0; i < 30; i++) {
    assert.equal(ALL_30_JUZ_BOUNDARIES[i].juz, i + 1);
    assert.ok(ALL_30_JUZ_BOUNDARIES[i].startSurahNumber >= 1);
    assert.ok(ALL_30_JUZ_BOUNDARIES[i].startAyahNumber >= 1);
  }
  // Juz 2 starts at Al-Baqarah 2:142, Juz 3 at 2:253, Juz 30 at An-Naba 78:1
  assert.equal(ALL_30_JUZ_BOUNDARIES[1].startSurahNumber, 2);
  assert.equal(ALL_30_JUZ_BOUNDARIES[1].startAyahNumber, 142);
  assert.equal(ALL_30_JUZ_BOUNDARIES[2].startSurahNumber, 2);
  assert.equal(ALL_30_JUZ_BOUNDARIES[2].startAyahNumber, 253);
  assert.equal(ALL_30_JUZ_BOUNDARIES[29].startSurahNumber, 78);
  assert.equal(ALL_30_JUZ_BOUNDARIES[29].startAyahNumber, 1);

  // Validate Surah payload count & Arabic/Translation alignment
  const fatihaMeta = ALL_114_SURAHS.find((s) => s.number === 1)!;
  const validAyahs: AyahItem[] = Array.from({ length: 7 }, (_, idx) => ({
    numberInSurah: idx + 1,
    arabicUthmani: `آية ${idx + 1}`,
    transliteration: `Ayah ${idx + 1}`,
    translations: { en: `Verse ${idx + 1}` },
    tafsirBrief: 'Tafsir',
  }));
  const validPayload: SurahPayload = {
    meta: fatihaMeta,
    ayahs: validAyahs,
    verification: {
      source: 'Tanzil Uthmani',
      edition: 'quran-uthmani',
      language: 'ar/en',
      version: '1.0',
      reference: 'Surah 1',
      status: 'Verified',
      reviewer: 'Ilmizo Audit',
    },
  };
  const validCheck = validateSurahPayload(validPayload, fatihaMeta, false);
  assert.equal(validCheck.valid, true);

  // Mismatched full payload count is rejected
  const truncatedPayload: SurahPayload = {
    ...validPayload,
    ayahs: validAyahs.slice(0, 4),
  };
  const truncatedCheck = validateSurahPayload(truncatedPayload, fatihaMeta, false);
  assert.equal(truncatedCheck.valid, false);
  assert.match(truncatedCheck.error || '', /Ayah count mismatch/);

  // Partial offline bundle with valid verses is permitted when flagged as partial
  const partialCheck = validateSurahPayload(truncatedPayload, fatihaMeta, true);
  assert.equal(partialCheck.valid, true);

  // Sparse Ayah index resolution (e.g. Al-Baqarah offline bundle where Ayah 255 is at index 5)
  const sparseBaqarah: AyahItem[] = [1, 2, 3, 4, 5, 255, 285, 286].map((n) => ({
    numberInSurah: n,
    arabicUthmani: 'آية',
    transliteration: 'Ayah',
    translations: { en: 'Verse' },
    tafsirBrief: 'Tafsir',
  }));
  assert.equal(resolveAyahIndexByNumber(sparseBaqarah, 255), 5);
  assert.equal(resolveAyahIndexByNumber(sparseBaqarah, 286), 7);
});

test('Phase 2.2 — Hifz Spaced-Repetition Scheduler & Queue Refresh', () => {
  const now = new Date(2026, 9, 30, 10, 0, 0); // Oct 30, 2026 local
  const baseItem: RevisionItem = {
    id: 'rev_255',
    surahNumber: 2,
    surahName: 'Al-Baqarah',
    ayahRange: 'Ayah 255 (Ayat al-Kursi)',
    startAyah: 255,
    endAyah: 255,
    dueStatus: 'due_today',
    dueDate: 'Today',
    difficulty: 'medium',
    intervalDays: 2,
    attemptsCount: 1,
  };

  // Needs Work resets interval to 1 day
  const needsWork = scheduleHifzRevision(baseItem, 'Needs Work', now);
  assert.equal(needsWork.intervalDays, 1);
  assert.equal(needsWork.attemptsCount, 2);
  assert.equal(needsWork.dueStatus, 'due_today');
  assert.equal(needsWork.memorizationState, 'revision_due');
  assert.ok(needsWork.nextReviewAt && needsWork.nextReviewAt.length === 10);

  // Good increments interval by 2 days (2 + 2 = 4 days)
  const good = scheduleHifzRevision(baseItem, 'Good', now);
  assert.equal(good.intervalDays, 4);
  assert.equal(good.dueStatus, 'upcoming');
  assert.equal(good.memorizationState, 'memorized');

  // Fluent multiplies interval by 2 (2 * 2 = 4 days)
  const fluent = scheduleHifzRevision(baseItem, 'Fluent', now);
  assert.equal(fluent.intervalDays, 4);

  // Queue refresh marks past nextReviewAt date keys as overdue
  const twoDaysAgoKey = getLocalDateKeyWithOffset(-2, now);
  const todayKey = getLocalDateKey(now);
  const refreshed = refreshRevisionQueueDueStatuses(
    [{ ...fluent, nextReviewAt: twoDaysAgoKey }],
    todayKey
  );
  assert.equal(refreshed[0].dueStatus, 'overdue');
  assert.equal(refreshed[0].memorizationState, 'revision_due');

  // Parse Ayah range & derive state
  const r1 = parseHifzAyahRange('Ayahs 1-10', 30);
  assert.equal(r1.startAyah, 1);
  assert.equal(r1.endAyah, 10);
  const r2 = parseHifzAyahRange('Ayah 255 (Ayat al-Kursi)', 286);
  assert.equal(r2.startAyah, 255);
  assert.equal(r2.endAyah, 255);

  assert.equal(deriveHifzPlanState(0, 7, false, 0), 'not_started');
  assert.equal(deriveHifzPlanState(3, 7, false, 1), 'learning');
  assert.equal(deriveHifzPlanState(7, 7, true, 4), 'revision_due');
  assert.equal(deriveHifzPlanState(7, 7, false, 14), 'memorized');
  assert.equal(deriveHifzPlanState(7, 7, false, 21), 'mastered');
});

test('Phase 2.3 — Salah Tracker: Unlogged days default to pending and historical summary is accurate', () => {
  const now = new Date(2026, 9, 30, 12, 0, 0);
  const todayKey = getLocalDateKey(now);
  const emptyRecord = createEmptySalahDayRecord(todayKey);

  // Never auto-complete Fajr or any prayer when unlogged
  assert.equal(emptyRecord.prayers.Fajr, 'pending');
  assert.equal(emptyRecord.prayers.Dhuhr, 'pending');
  assert.equal(emptyRecord.prayers.Asr, 'pending');
  assert.equal(emptyRecord.prayers.Maghrib, 'pending');
  assert.equal(emptyRecord.prayers.Isha, 'pending');

  const yesterdayKey = getLocalDateKeyWithOffset(-1, now);
  const records: Record<string, SalahDayRecord> = {
    [todayKey]: {
      date: todayKey,
      sunnahCompleted: 2,
      prayers: {
        Fajr: 'prayed_on_time',
        Dhuhr: 'prayed',
        Asr: 'pending',
        Maghrib: 'pending',
        Isha: 'pending',
      },
    },
    [yesterdayKey]: {
      date: yesterdayKey,
      sunnahCompleted: 4,
      prayers: {
        Fajr: 'prayed_on_time',
        Dhuhr: 'prayed_on_time',
        Asr: 'prayed_on_time',
        Maghrib: 'qaza',
        Isha: 'prayed',
      },
    },
  };

  const summary = computeSalahHistoricalSummary(records, now);
  assert.equal(summary.weeklyPrayedCount, 6); // 2 today + 4 yesterday
  assert.equal(summary.weeklyOnTimeCount, 4);
  assert.equal(summary.weeklyQazaCount, 1);
});

test('Phase 2.4 & 2.5 — Duas Library & 99 Names Verification Integrity', () => {
  assert.ok(VERIFIED_DUAS.length > 0);
  for (const dua of VERIFIED_DUAS) {
    assert.ok(dua.arabic.trim().length > 0);
    assert.ok(dua.verification.source.trim().length > 0);
    assert.ok(dua.verification.reference.trim().length > 0);
  }
  assert.equal(ASMA_UL_HUSNA.length, 99);
});

test('Phase 2.7 — Quiz Engine: Deterministic scoring and missed-question tracking', () => {
  const pack = QUIZ_PACKS.find((p) => p.id === 'quiz_quran_knowledge')!;
  assert.ok(pack && pack.questions.length > 0);

  // Answer first 2 correctly, 3rd wrong
  const q0 = pack.questions[0];
  const q1 = pack.questions[1];
  const q2 = pack.questions[2];
  const wrongIdx = (q2.correctIndex + 1) % q2.options.length;

  const submission = scoreQuizSubmission(pack.questions.slice(0, 3), {
    [q0.id]: q0.correctIndex,
    [q1.id]: q1.correctIndex,
    [q2.id]: wrongIdx,
  });

  assert.equal(submission.score, 2);
  assert.equal(submission.total, 3);
  assert.equal(submission.isComplete, true);
  assert.deepEqual(submission.missedQuestionIndices, [2]);
});

test('Phase 2.8 — Progress & Streak Engine: Local date keys, streak rollover, and period aggregation', () => {
  const now = new Date(2026, 9, 30, 15, 0, 0); // Oct 30, 2026
  const day0 = getLocalDateKeyWithOffset(0, now);
  const dayMinus10 = getLocalDateKeyWithOffset(-10, now);

  let events: LearningEvent[] = [];
  events = appendLearningEvent(
    events,
    {
      type: 'quran_ayah_read',
      mode: 'adult',
      referenceId: '2:255',
      title: 'Read Ayat al-Kursi',
    },
    new Date(2026, 9, 30, 10, 0, 0)
  );
  events = appendLearningEvent(
    events,
    {
      type: 'hifz_revision',
      mode: 'adult',
      referenceId: 'rev_1',
      title: 'Reviewed Al-Baqarah 2:255',
    },
    new Date(2026, 9, 29, 10, 0, 0)
  );
  events = appendLearningEvent(
    events,
    {
      type: 'lesson_completed',
      mode: 'adult',
      referenceId: 'lesson_1',
      title: 'Completed Lesson 1',
    },
    new Date(2026, 9, 28, 10, 0, 0)
  );
  // Older event 10 days ago (gap of 7 days before dayMinus2)
  events = appendLearningEvent(
    events,
    {
      type: 'quiz_completed',
      mode: 'adult',
      referenceId: 'quiz_1',
      title: 'Completed Quiz 1',
    },
    new Date(2026, 9, 20, 10, 0, 0)
  );

  const dailyVerse: DailyVerseActivity = {
    dateKey: day0,
    ayahKeys: ['2:255'],
  };

  const streak = computeLearningStreak({
    learningEvents: events,
    salahRecords: {},
    dailyVerseActivity: dailyVerse,
    baseDate: now,
  });
  assert.equal(streak.currentStreakDays, 3); // Oct 28, 29, 30 consecutive
  assert.equal(streak.longestStreakDays, 3);
  assert.equal(streak.isTodayActive, true);

  // If user misses both today and yesterday, current streak resets to 0
  const staleEvents: LearningEvent[] = [
    {
      id: 'ev_old',
      type: 'lesson_completed',
      mode: 'adult',
      referenceId: 'lesson_1',
      title: 'Completed Lesson 1',
      timestampIso: new Date(2026, 9, 20, 10, 0, 0).toISOString(),
      dateKey: dayMinus10,
    },
  ];
  const brokenStreak = computeLearningStreak({
    learningEvents: staleEvents,
    salahRecords: {},
    dailyVerseActivity: { dateKey: day0, ayahKeys: [] },
    baseDate: now,
  });
  assert.equal(brokenStreak.currentStreakDays, 0);
  assert.equal(brokenStreak.longestStreakDays, 1);

  // Period aggregation (Daily vs Weekly vs All-Time)
  const dailyAgg = aggregateAdultProgressByPeriod({
    period: 'daily',
    learningEvents: events,
    salahRecords: {},
    dailyVerseActivity: dailyVerse,
    quizAttempts: [],
    baseDate: now,
  });
  assert.equal(dailyAgg.versesReadCount, 1);
  assert.equal(dailyAgg.hifzRevisionsCount, 0);

  const weeklyAgg = aggregateAdultProgressByPeriod({
    period: 'weekly',
    learningEvents: events,
    salahRecords: {},
    dailyVerseActivity: dailyVerse,
    quizAttempts: [],
    baseDate: now,
  });
  assert.equal(weeklyAgg.versesReadCount, 1);
  assert.equal(weeklyAgg.hifzRevisionsCount, 1);
  assert.equal(weeklyAgg.lessonsAndSeerahCount, 1);
});

test('Phase 2.9 & 2.10 — Qibla Great-Circle Bearing & Dynamic Hijri Calendar Calculation', () => {
  // Jamshedpur (22.8046 N, 86.2029 E) -> ~278 deg WNW
  const jamshedpurQibla = computeQiblaFromCoords(22.8046, 86.2029);
  assert.ok(jamshedpurQibla.bearing >= 276 && jamshedpurQibla.bearing <= 280);
  assert.ok(jamshedpurQibla.distKm > 4500 && jamshedpurQibla.distKm < 4900);

  // London (51.5072 N, -0.1276 W) -> ~119 deg ESE
  const londonQibla = computeQiblaFromCoords(51.5072, -0.1276);
  assert.ok(londonQibla.bearing >= 117 && londonQibla.bearing <= 121);

  // Dynamic Hijri calendar calculation & moon-sighting adjustment
  const sampleDate = new Date(2026, 9, 30, 12, 0, 0);
  const hijri0 = computeHijriDate(sampleDate, 0);
  const hijriPlus1 = computeHijriDate(sampleDate, 1);
  assert.ok(hijri0.disclaimer.includes('moon sighting'));
  assert.ok(hijri0.year >= 1447 && hijri0.year <= 1449);
  assert.ok(hijri0.monthNumber >= 1 && hijri0.monthNumber <= 12);
  assert.notEqual(hijri0.formatted, hijriPlus1.formatted);
});
