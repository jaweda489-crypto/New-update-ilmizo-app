import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  ALL_114_SURAHS,
  BUNDLED_SURAH_AYAHS,
  VERIFIED_RECITER_EDITIONS,
  getSurahPayload,
  resolveAyahAudioUrl,
  resolveReciterConfig,
} from '../data/quranData';
import { ASMA_UL_HUSNA, QUIZ_PACKS } from '../data/islamicContent';
import {
  computeDailyFocusProgress,
  computeNextPrayerState,
  getLocalDateKey,
  recordDailyVerseRead,
} from '../components/adult/AdultDesignSystem';
import { ADULT_QUIZ_CARDS } from '../components/adult/AdultExtraScreens';
import {
  build99NamesQuizQuestion,
  validate99NamesQuizAnswer,
} from '../components/adult/AdultModeView';
import {
  getChildCertificateAchievements,
  normalizeSurahCertificateTitle,
} from '../components/kids/KidsWorldView';

test('1. Quran Offline Fallback & bundledOffline Metadata Integrity', async () => {
  // Verify bundledOffline metadata matches BUNDLED_SURAH_AYAHS keys 100%
  const bundledKeys = Object.keys(BUNDLED_SURAH_AYAHS)
    .map(Number)
    .sort((a, b) => a - b);
  const flaggedInMeta = ALL_114_SURAHS.filter((s) => s.bundledOffline)
    .map((s) => s.number)
    .sort((a, b) => a - b);

  assert.deepEqual(
    flaggedInMeta,
    bundledKeys,
    'ALL_114_SURAHS bundledOffline flags must match BUNDLED_SURAH_AYAHS keys exactly'
  );

  // Simulate offline environment
  const originalNavigator = globalThis.navigator;
  Object.defineProperty(globalThis, 'navigator', {
    value: { onLine: false },
    configurable: true,
  });

  try {
    // Unbundled, uncached Surah (e.g. Surah 18 Al-Kahf and Surah 36 Ya-Sin)
    const kahfPayload = await getSurahPayload(18, 'en');
    assert.equal(kahfPayload.meta.number, 18);
    assert.equal(kahfPayload.meta.nameTranslit, 'Al-Kahf');
    assert.equal(kahfPayload.offlineUnavailable, true);
    assert.equal(
      kahfPayload.ayahs.length,
      0,
      'Uncached offline Surah must NEVER return Surah Al-Fatiha verses'
    );

    const yasinPayload = await getSurahPayload(36, 'en');
    assert.equal(yasinPayload.meta.number, 36);
    assert.equal(yasinPayload.meta.nameTranslit, 'Ya-Sin');
    assert.equal(yasinPayload.offlineUnavailable, true);
    assert.equal(yasinPayload.ayahs.length, 0);

    // Bundled offline Surah (Surah 112 Al-Ikhlas) works offline
    const ikhlasPayload = await getSurahPayload(112, 'en');
    assert.equal(ikhlasPayload.meta.number, 112);
    assert.equal(ikhlasPayload.offlineUnavailable, false);
    assert.equal(ikhlasPayload.ayahs.length, 4);
    assert.ok(ikhlasPayload.ayahs[0].arabicUthmani.includes('أَحَدٌ'));
  } finally {
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      configurable: true,
    });
  }
});

test('2. Today’s Focus Daily Goal: Fresh Account, Seeded History, Real Verse Activity & Day Rollover', () => {
  const todayKey = '2026-10-30';
  const yesterdayKey = '2026-10-29';

  // (a) Fresh account daily goal -> 0 / 5 verses, not completed
  const freshProgress = computeDailyFocusProgress(undefined, 5, todayKey);
  assert.equal(freshProgress.dailyGoal, 5);
  assert.equal(freshProgress.rawTodayVerses, 0);
  assert.equal(freshProgress.dailyCompleted, 0);
  assert.equal(freshProgress.focusProgressPct, 0);
  assert.equal(freshProgress.isDailyGoalMet, false);

  // (b) User with previously opened Surahs / yesterday's activity but NO verse activity today -> 0 / 5
  const yesterdayActivity = {
    dateKey: yesterdayKey,
    ayahKeys: ['2:255', '1:1', '36:1', '67:1', '112:1'],
  };
  const rolloverProgress = computeDailyFocusProgress(yesterdayActivity, 5, todayKey);
  assert.equal(rolloverProgress.rawTodayVerses, 0);
  assert.equal(rolloverProgress.dailyCompleted, 0);
  assert.equal(rolloverProgress.isDailyGoalMet, false);

  // (c) Real verse activity today increments unique verses read and deduplicates same verse
  let activity = recordDailyVerseRead(yesterdayActivity, 2, 255, todayKey);
  assert.equal(activity.dateKey, todayKey);
  assert.deepEqual(activity.ayahKeys, ['2:255']);

  // Reading the same verse again on the same day does not inflate count
  activity = recordDailyVerseRead(activity, 2, 255, todayKey);
  assert.equal(activity.ayahKeys.length, 1);

  // Reading 4 more distinct verses meets the 5-verse daily goal
  activity = recordDailyVerseRead(activity, 2, 256, todayKey);
  activity = recordDailyVerseRead(activity, 112, 1, todayKey);
  activity = recordDailyVerseRead(activity, 112, 2, todayKey);
  const partialProgress = computeDailyFocusProgress(activity, 5, todayKey);
  assert.equal(partialProgress.dailyCompleted, 4);
  assert.equal(partialProgress.focusProgressPct, 80);
  assert.equal(partialProgress.isDailyGoalMet, false);

  activity = recordDailyVerseRead(activity, 112, 3, todayKey);
  const metProgress = computeDailyFocusProgress(activity, 5, todayKey);
  assert.equal(metProgress.dailyCompleted, 5);
  assert.equal(metProgress.focusProgressPct, 100);
  assert.equal(metProgress.isDailyGoalMet, true);

  // Reading beyond daily goal keeps dailyCompleted bounded at dailyGoal (never 6 / 5)
  activity = recordDailyVerseRead(activity, 112, 4, todayKey);
  const extraProgress = computeDailyFocusProgress(activity, 5, todayKey);
  assert.equal(extraProgress.rawTodayVerses, 6);
  assert.equal(extraProgress.dailyCompleted, 5);
  assert.equal(extraProgress.focusProgressPct, 100);
  assert.equal(extraProgress.isDailyGoalMet, true);

  // Local calendar date key format check
  const sampleDate = new Date(2026, 9, 30, 23, 45, 0); // Oct 30, 2026 local
  assert.equal(getLocalDateKey(sampleDate), '2026-10-30');
});

test('3. Adult Quiz Cards Match QUIZ_PACKS IDs & Titles', () => {
  assert.equal(ADULT_QUIZ_CARDS.length, 5);

  const expectedMappings: Record<string, string> = {
    'Quran Knowledge': 'quiz_quran_knowledge',
    'Islamic History': 'quiz_seerah_history',
    'Daily Duas': 'quiz_daily_duas',
    'Salah & Wudu': 'quiz_salah_wudu',
    '99 Names of Allah': 'quiz_names_99',
  };

  for (const card of ADULT_QUIZ_CARDS) {
    const resolvedPackId = card.targetId || card.id;
    assert.equal(
      resolvedPackId,
      expectedMappings[card.title],
      `Card "${card.title}" must resolve to ${expectedMappings[card.title]}`
    );

    const pack = QUIZ_PACKS.find((p) => p.id === resolvedPackId);
    assert.ok(pack, `QUIZ_PACKS must contain pack "${resolvedPackId}"`);
    assert.equal(pack.title, card.title);
    assert.ok(pack.questions.length >= 10, `Pack "${pack.id}" must have at least 10 questions`);
  }
});

test('4. Kids Certificate Title Normalization (Prefixed, Double-Prefixed & Unprefixed)', () => {
  assert.equal(normalizeSurahCertificateTitle('Al-Ikhlas'), 'Surah Al-Ikhlas');
  assert.equal(normalizeSurahCertificateTitle('Surah Al-Ikhlas'), 'Surah Al-Ikhlas');
  assert.equal(normalizeSurahCertificateTitle('Surah Surah Al-Ikhlas'), 'Surah Al-Ikhlas');
  assert.equal(normalizeSurahCertificateTitle('  surah   Surah Al-Fatiha '), 'Surah Al-Fatiha');

  const achievements = getChildCertificateAchievements([
    'Surah Al-Fatiha',
    'Al-Ikhlas',
    'Surah Surah Al-Ikhlas',
    'Surah Al-Kawthar',
  ]);
  assert.deepEqual(achievements, [
    'Surah Al-Fatiha',
    'Surah Al-Ikhlas',
    'Surah Al-Kawthar',
  ]);
  for (const title of achievements) {
    assert.equal(
      title.startsWith('Surah Surah'),
      false,
      `Certificate title "${title}" must never contain duplicate "Surah "`
    );
  }
});

test('5. 99 Names Recall Quiz: 3 Valid Distractors + 1 Correct Answer, Shuffled Positions & Record Validation', () => {
  const correctPositionsSeen = new Set<number>();

  for (let i = 0; i < ASMA_UL_HUSNA.length; i++) {
    const q = build99NamesQuizQuestion(ASMA_UL_HUSNA, i);
    assert.equal(q.target.number, ASMA_UL_HUSNA[i].number);
    assert.equal(q.options.length, 4, `Question ${i} must have exactly 4 options`);

    const uniqueNumbers = new Set(q.options.map((o) => o.number));
    const uniqueMeanings = new Set(q.options.map((o) => o.meaning));
    assert.equal(uniqueNumbers.size, 4, `Question ${i} options must come from 4 distinct Names`);
    assert.equal(uniqueMeanings.size, 4, `Question ${i} options must have 4 distinct meanings`);

    const correctIdx = q.options.findIndex((o) =>
      validate99NamesQuizAnswer(q.target, o)
    );
    assert.ok(correctIdx >= 0 && correctIdx < 4, `Question ${i} must include the valid target answer`);
    correctPositionsSeen.add(correctIdx);

    // Ensure distractors fail validation
    q.options.forEach((opt, idx) => {
      if (idx === correctIdx) {
        assert.equal(validate99NamesQuizAnswer(q.target, opt), true);
      } else {
        assert.equal(validate99NamesQuizAnswer(q.target, opt), false);
      }
    });
  }

  // Verify answer position is distributed across all 4 slots (0, 1, 2, 3), never stuck at index 0
  assert.deepEqual(
    Array.from(correctPositionsSeen).sort(),
    [0, 1, 2, 3],
    'Correct answer position must vary across all 4 option slots (0, 1, 2, 3)'
  );
});

test('6. Parent PIN Lock Screen Has Zero Plaintext PIN Disclosure or Auto-Fill', () => {
  const parentHubSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/parent/ParentHubView.tsx'),
    'utf-8'
  );

  assert.equal(
    parentHubSource.includes('Active Parent PIN:'),
    false,
    'ParentHubView must not render Active Parent PIN on the lock screen'
  );
  assert.equal(
    parentHubSource.includes('Auto-Fill'),
    false,
    'ParentHubView must not include an Auto-Fill PIN button'
  );
  assert.equal(
    parentHubSource.includes('Please enter {user.parentPin}'),
    false,
    'ParentHubView error message must not leak user.parentPin'
  );
});

test('7. Salah Tracker & Next Prayer Countdown Calculation, Completed Prayer Handling & Day Rollover', () => {
  const timings = {
    Fajr: '5:12 AM',
    Dhuhr: '12:28 PM',
    Asr: '4:01 PM',
    Maghrib: '6:18 PM',
    Isha: '7:46 PM',
  };

  // (a) Before Dhuhr (10:13 AM -> 2h 15m before 12:28 PM) when Dhuhr is pending
  const morningNow = new Date(2026, 9, 30, 10, 13, 0);
  const statePending = computeNextPrayerState(timings, morningNow, {
    Fajr: 'prayed_on_time',
    Dhuhr: 'pending',
    Asr: 'pending',
    Maghrib: 'pending',
    Isha: 'pending',
  });
  assert.equal(statePending.nextPrayer, 'Dhuhr');
  assert.equal(statePending.countdownLabel, '2h 15m left');
  assert.equal(statePending.isRolloverToTomorrow, false);

  // (b) If Dhuhr is already marked prayed, advances to next uncompleted prayer (Asr)
  const stateDhuhrDone = computeNextPrayerState(timings, morningNow, {
    Fajr: 'prayed_on_time',
    Dhuhr: 'prayed',
    Asr: 'pending',
    Maghrib: 'pending',
    Isha: 'pending',
  });
  assert.equal(stateDhuhrDone.nextPrayer, 'Asr');
  assert.equal(stateDhuhrDone.isRolloverToTomorrow, false);

  // (c) After Isha (9:00 PM / 21:00) -> rolls over to tomorrow's Fajr (5:12 AM = 8h 12m left)
  const nightNow = new Date(2026, 9, 30, 21, 0, 0);
  const stateAfterIsha = computeNextPrayerState(timings, nightNow, {
    Fajr: 'prayed_on_time',
    Dhuhr: 'prayed_on_time',
    Asr: 'prayed_on_time',
    Maghrib: 'prayed_on_time',
    Isha: 'prayed_on_time',
  });
  assert.equal(stateAfterIsha.nextPrayer, 'Fajr');
  assert.equal(stateAfterIsha.isRolloverToTomorrow, true);
  assert.equal(stateAfterIsha.countdownLabel, '8h 12m left');
});

test('8. Reciter Selection Mapping to Verified Audio Editions', () => {
  assert.equal(VERIFIED_RECITER_EDITIONS.length, 4);

  const alafasy = resolveReciterConfig('Mishary Rashid Alafasy');
  assert.equal(alafasy.editionId, 'ar.alafasy');
  assert.equal(alafasy.cdnBitrate, 128);
  assert.equal(alafasy.verified, true);
  assert.equal(
    resolveAyahAudioUrl({ globalNumber: 262 }, 'Mishary Rashid Alafasy'),
    'https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3'
  );

  const abdulBasit = resolveReciterConfig('Abdul Basit Abdus Samad');
  assert.equal(abdulBasit.editionId, 'ar.abdulbasitmurattal');
  assert.equal(abdulBasit.cdnBitrate, 192);
  assert.equal(abdulBasit.verified, true);
  assert.equal(
    resolveAyahAudioUrl({ globalNumber: 262 }, 'Abdul Basit Abdus Samad'),
    'https://cdn.islamic.network/quran/audio/192/ar.abdulbasitmurattal/262.mp3'
  );

  const sudais = resolveReciterConfig('Abdur-Rahman as-Sudais');
  assert.equal(sudais.editionId, 'ar.abdurrahmaansudais');
  assert.equal(sudais.cdnBitrate, 192);
  assert.equal(sudais.verified, true);
  assert.equal(
    resolveAyahAudioUrl({ globalNumber: 262 }, 'Abdur-Rahman as-Sudais'),
    'https://cdn.islamic.network/quran/audio/192/ar.abdurrahmaansudais/262.mp3'
  );

  const husary = resolveReciterConfig('Mahmoud Khalil Al-Husary');
  assert.equal(husary.editionId, 'ar.husary');
  assert.equal(husary.cdnBitrate, 128);
  assert.equal(husary.verified, true);
  assert.equal(
    resolveAyahAudioUrl({ globalNumber: 262 }, 'Mahmoud Khalil Al-Husary'),
    'https://cdn.islamic.network/quran/audio/128/ar.husary/262.mp3'
  );

  const unknown = resolveReciterConfig('Unverified Qari Name');
  assert.equal(unknown.verified, false);
});
