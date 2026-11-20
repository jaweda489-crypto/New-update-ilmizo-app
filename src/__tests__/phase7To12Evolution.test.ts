import test from 'node:test';
import assert from 'node:assert/strict';
import {
  audioManager,
  validateSurahAyahRange,
} from '../services/audioManager';
import {
  ASMA_UL_HUSNA,
  canMarkKidsSurahCompleted,
  computeLocalizationCoverageReport,
  CONTENT_REGISTRY,
  createRandomizedQuizSession,
  ISLAMIC_LESSONS,
  JUZ_AMMA_37_SURAHS,
  KIDS_STORIES,
  QUIZ_PACKS,
  randomizeQuizQuestionOptions,
  resolveLocalizedTextWithNotice,
  scheduleVocabFlashcardReview,
  SEERAH_TIMELINE,
  TOP_QURAN_VOCAB,
  VERIFIED_DUAS,
} from '../data/islamicContent';
import {
  buildUnifiedQuranJournalEntries,
  createWordByWordSession,
  queryQuranJournalEntries,
  resetWordByWordSession,
  revealCompleteAyah,
  revealNextWord,
  revealPreviousWord,
  TADABBUR_DISCLAIMER,
  TADABBUR_REFLECTION_PROMPTS,
  tokenizeArabicAyahWords,
} from '../engines/quranJournalAndWordEngine';
import {
  COMPLETE_PRAYER_GUIDES,
  COMPLETE_SALAH_RECITATIONS,
  computeSalahStatsWithExcusedBridge,
  markDayAsExcused,
} from '../data/salahCompleteGuide';
import { SalahDayRecord } from '../types/ilmizo';

test('Phase 7.1 — Validates Surah Ayah ranges strictly against Surah metadata', () => {
  const validRange = validateSurahAyahRange(1, 1, 7);
  assert.equal(validRange.valid, true);
  assert.equal(validRange.startAyah, 1);
  assert.equal(validRange.endAyah, 7);

  assert.equal(validateSurahAyahRange(1, 5, 2).valid, false);
  assert.equal(validateSurahAyahRange(1, 1, 9).valid, false);
  assert.equal(validateSurahAyahRange(1, 0, 4).valid, false);
});

test('Phase 7.2 — Plays Full Surah sequentially from Ayah 1 to N and stops cleanly', async () => {
  audioManager.stopAll();
  const playedAyahs: number[] = [];

  audioManager.setCustomAyahPlaybackDriver((ctx) => {
    playedAyahs.push(ctx.ayahNumberInSurah);
    queueMicrotask(() => ctx.onComplete());
  });

  try {
    await new Promise<void>((resolve, reject) => {
      void audioManager.playFullSurah({
        surahNumber: 108, // Al-Kawthar (3 Ayahs)
        startFromAyah: 1,
        repeatOption: 1,
        isOnline: true,
        onSequenceComplete: () => resolve(),
        onError: (err) => reject(new Error(err)),
      });
    });

    assert.deepEqual(playedAyahs, [1, 2, 3]);
    assert.equal(audioManager.getState().status, 'idle');
  } finally {
    audioManager.setCustomAyahPlaybackDriver(null);
    audioManager.stopAll();
  }
});

test('Phase 7.3 — Plays Selected Ayah Range with repeat=2 and stops cleanly', async () => {
  audioManager.stopAll();
  const playedAyahs: number[] = [];

  audioManager.setCustomAyahPlaybackDriver((ctx) => {
    playedAyahs.push(ctx.ayahNumberInSurah);
    queueMicrotask(() => ctx.onComplete());
  });

  try {
    await new Promise<void>((resolve, reject) => {
      void audioManager.playAyahRange({
        surahNumber: 1,
        startAyah: 2,
        endAyah: 4,
        repeatOption: 2,
        isOnline: true,
        onSequenceComplete: () => resolve(),
        onError: (err) => reject(new Error(err)),
      });
    });

    assert.deepEqual(playedAyahs, [2, 3, 4, 2, 3, 4]);
    assert.equal(audioManager.getState().status, 'idle');
  } finally {
    audioManager.setCustomAyahPlaybackDriver(null);
    audioManager.stopAll();
  }
});

test('Phase 8.1 — Provides 32 Kids Stories, 37 Juz Amma Surahs (+ Al-Fatiha), 43+ Duas, 37 Lessons, 10 Seerah events, and 315 Quran Vocab words', () => {
  assert.ok(KIDS_STORIES.length >= 32, `Expected >= 32 stories, got ${KIDS_STORIES.length}`);
  assert.ok(JUZ_AMMA_37_SURAHS.length >= 37, `Expected >= 37 Surahs, got ${JUZ_AMMA_37_SURAHS.length}`);
  assert.ok(VERIFIED_DUAS.length >= 43, `Expected >= 43 Duas, got ${VERIFIED_DUAS.length}`);
  assert.ok(ISLAMIC_LESSONS.length >= 37, `Expected >= 37 lessons, got ${ISLAMIC_LESSONS.length}`);
  assert.ok(SEERAH_TIMELINE.length >= 10, `Expected >= 10 Seerah events, got ${SEERAH_TIMELINE.length}`);
  assert.ok(TOP_QURAN_VOCAB.length >= 315, `Expected >= 315 Vocab words, got ${TOP_QURAN_VOCAB.length}`);
  assert.equal(ASMA_UL_HUSNA.length, 99);
  assert.ok(CONTENT_REGISTRY.length > 400);
});

test('Phase 8.2 — Prevents marking a Kids Surah completed merely because the screen was opened', () => {
  assert.equal(
    canMarkKidsSurahCompleted({ surahNumber: 112, practicedAyahNumbers: [] }).eligible,
    false
  );
  assert.equal(
    canMarkKidsSurahCompleted({ surahNumber: 112, practicedAyahNumbers: [1, 2] }).eligible,
    false
  );
  assert.equal(
    canMarkKidsSurahCompleted({ surahNumber: 112, practicedAyahNumbers: [1, 2, 3, 4] }).eligible,
    true
  );
});

test('Phase 8.3 — Randomizes quiz question options while preserving the exact correct answer meaning', () => {
  const samplePack = QUIZ_PACKS[0];
  const q = samplePack.questions[0];
  const correctText = q.options[q.correctIndex];
  const shuffled = randomizeQuizQuestionOptions(q, () => 0.42);
  assert.equal(shuffled.options[shuffled.correctIndex], correctText);
  assert.equal(shuffled.options.length, q.options.length);

  const session = createRandomizedQuizSession({ maxQuestions: 5 });
  assert.equal(session.length, 5);
});

test('Phase 8.4 — Schedules Quran Vocabulary flashcard spaced repetition intervals accurately', () => {
  const easy = scheduleVocabFlashcardReview(undefined, 'v1', 'easy', 1700000000000);
  const hard = scheduleVocabFlashcardReview(easy, 'v1', 'hard', 1700000000000);
  assert.ok(easy.intervalDays >= 3);
  assert.equal(hard.intervalDays, 1);
});

test('Phase 9.1 — Resolves translated text when present and provides an honest notice when falling back to English', () => {
  const fullMap = {
    en: 'Seek knowledge',
    hi: 'इल्म हासिल करो',
    ur: 'علم حاصل کرو',
    hinglish: 'Ilm haasil karo',
    ar: 'اطلب العلم',
  };
  const hiRes = resolveLocalizedTextWithNotice(fullMap, 'hi', fullMap.en);
  assert.equal(hiRes.text, 'इल्म हासिल करो');
  assert.equal(hiRes.isFallback, false);
  assert.equal(hiRes.missingNotice, null);

  const partialMap = {
    en: 'Only English available',
  };
  const urFallback = resolveLocalizedTextWithNotice(partialMap, 'ur', partialMap.en);
  assert.equal(urFallback.text, 'Only English available');
  assert.equal(urFallback.isFallback, true);
  assert.ok(urFallback.missingNotice);
});

test('Phase 9.2 — Generates a complete localization coverage report across all 5 languages', () => {
  const report = computeLocalizationCoverageReport();
  assert.ok(report.rows.length >= 4);
  assert.equal(report.overallPercentByLanguage.en, 100);
  assert.ok(report.overallPercentByLanguage.hi >= 90);
  assert.ok(report.overallPercentByLanguage.ur >= 90);
  assert.ok(report.overallPercentByLanguage.hinglish >= 90);
  assert.ok(report.overallPercentByLanguage.ar >= 90);
});

test('Phase 10.1 — Unifies bookmarks and notes, filters by Surah/tag/search, and sorts accurately', () => {
  const bookmarks = [
    {
      id: 'b1',
      surahNumber: 2,
      surahName: 'Al-Baqarah',
      ayahNumber: 255,
      arabicSnippet: 'ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ',
      createdAt: '2026-10-01',
      folder: 'Daily Protection',
    },
  ];
  const personalNotes = [
    {
      id: 'n1',
      title: 'Surah Al-Fatiha 1:5',
      body: 'Personal reflection on relying upon Allah alone.',
      surahReference: 'Al-Fatiha 1:5',
      surahNumber: 1,
      ayahNumber: 5,
      createdAt: '2026-10-15',
      tags: ['tawheed', 'dua'],
      noteType: 'tadabbur' as const,
      tadabburPrompt: TADABBUR_REFLECTION_PROMPTS[0].prompt,
    },
  ];

  const entries = buildUnifiedQuranJournalEntries({ bookmarks, personalNotes });
  assert.equal(entries.length, 2);
  assert.ok(TADABBUR_DISCLAIMER.en.includes('not scholarly Tafsir'));

  const bySurah2 = queryQuranJournalEntries(entries, {
    searchQuery: '',
    kindFilter: 'all',
    surahFilter: 2,
    tagFilter: null,
    folderFilter: null,
    sortOrder: 'newest',
  });
  assert.equal(bySurah2.length, 1);
  assert.equal(bySurah2[0].surahNumber, 2);

  const byTag = queryQuranJournalEntries(entries, {
    searchQuery: '',
    kindFilter: 'all',
    surahFilter: null,
    tagFilter: 'tawheed',
    folderFilter: null,
    sortOrder: 'surah_asc',
  });
  assert.equal(byTag.length, 1);
  assert.equal(byTag[0].surahNumber, 1);
});

test('Phase 10.2 — Tokenizes Arabic Ayahs and reveals words step-by-step for Hifz testing', () => {
  const ayah = 'قُلْ هُوَ ٱللَّهُ أَحَدٌ';
  const tokens = tokenizeArabicAyahWords(ayah);
  assert.equal(tokens.length, 4);

  let session = createWordByWordSession(112, 1, ayah);
  assert.equal(session.revealedCount, 0);
  assert.equal(session.isFullyRevealed, false);

  session = revealNextWord(session);
  assert.equal(session.revealedCount, 1);

  session = revealPreviousWord(session);
  assert.equal(session.revealedCount, 0);

  session = revealCompleteAyah(session);
  assert.equal(session.revealedCount, 4);
  assert.equal(session.isFullyRevealed, true);

  session = resetWordByWordSession(session);
  assert.equal(session.revealedCount, 0);
  assert.equal(session.isFullyRevealed, false);
});

test('Phase 11.1 — Includes all 9 complete Salah recitations and 6 prayer guides with 4 Madhhab notes', () => {
  assert.ok(COMPLETE_SALAH_RECITATIONS.length >= 9);
  assert.equal(COMPLETE_PRAYER_GUIDES.length, 6);
  const witr = COMPLETE_PRAYER_GUIDES.find((g) => g.id === 'Witr');
  assert.ok(witr);
  assert.ok(witr.madhhabSpecifics.Hanafi);
  assert.ok(witr.madhhabSpecifics.Shafii);
});

test('Phase 11.2 — Preserves worship streak across excused days and never counts excused prayers as missed or Qada', () => {
  const records: Record<string, SalahDayRecord> = {
    '2026-10-27': {
      date: '2026-10-27',
      prayers: {
        Fajr: 'prayed_on_time',
        Dhuhr: 'prayed_on_time',
        Asr: 'prayed_on_time',
        Maghrib: 'prayed_on_time',
        Isha: 'prayed_on_time',
      },
      sunnahCompleted: 2,
    },
    '2026-10-28': markDayAsExcused(undefined, '2026-10-28', true),
    '2026-10-29': markDayAsExcused(undefined, '2026-10-29', true),
    '2026-10-30': {
      date: '2026-10-30',
      prayers: {
        Fajr: 'prayed_on_time',
        Dhuhr: 'prayed_on_time',
        Asr: 'prayed_on_time',
        Maghrib: 'prayed_on_time',
        Isha: 'prayed_on_time',
      },
      sunnahCompleted: 2,
    },
    '2026-10-31': {
      date: '2026-10-31',
      prayers: {
        Fajr: 'prayed_on_time',
        Dhuhr: 'prayed_on_time',
        Asr: 'prayed_on_time',
        Maghrib: 'prayed_on_time',
        Isha: 'prayed_on_time',
      },
      sunnahCompleted: 2,
    },
  };

  const stats = computeSalahStatsWithExcusedBridge(records, '2026-10-31');
  assert.equal(stats.consecutiveWorshipStreakDays, 3);
  assert.equal(stats.excusedDaysCount, 2);
  assert.equal(stats.excusedCount, 10);
  assert.equal(stats.qadaCount, 0);
  assert.equal(stats.pendingCount, 0);
});

// ============================================================================
// PHASE 13 — COLOR-CODED TAJWEED, HUMAN DUA/QAIDA AUDIO & CAPACITOR APK BRIDGE
// ============================================================================

import {
  analyzeArabicWordTajweed,
  getLocalizedWordMeaning,
  tokenizeAyahWithTajweedAndMeanings,
} from '../engines/tajweedAndWordMeaningEngine';
import {
  NOORANI_QAIDA_28_LETTERS,
  resolveDuaHumanAudio,
} from '../services/humanDuaAndQaidaAudio';
import {
  buildDailyAzanSchedule,
  DEFAULT_AZAN_NOTIFICATION_PREFS,
  getAndroidApkBuildCommands,
  getCapacitorRuntimeStatus,
  scheduleDailyAzanNotifications,
} from '../services/capacitorNativeBridge';
import capacitorConfig from '../../capacitor.config';

test('Phase 13.1 — Color-Coded Tajweed & Word-by-Word Translation Tooltip Engine', () => {
  const tokens = tokenizeAyahWithTajweedAndMeanings({
    arabicUthmani: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
    transliteration: 'Bismillahir-Rahmanir-Raheem',
    translations: {
      en: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      hi: 'अल्लाह के नाम से जो बेहद रहम करने वाला, निहायत मेहरबान है।',
      ur: 'اللّٰہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔',
      hinglish: 'Allah ke naam se jo Bada Meherbaan, Nihayat Reham Wala hai.',
      ar: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
    },
  });

  assert.equal(tokens.length, 4);
  assert.equal(tokens[0].transliteration, 'Bismi');
  assert.equal(getLocalizedWordMeaning(tokens[0], 'en'), 'In the Name of');
  assert.ok(getLocalizedWordMeaning(tokens[1], 'hinglish').includes('Allah'));
  assert.equal(tokens[1].tajweedRule.id, 'tafkheem_allah');
  assert.equal(tokens[2].tajweedRule.id, 'madd');

  // Verify Ghunnah and Qalqalah detection
  const ghunnahRule = analyzeArabicWordTajweed('إِنَّا');
  assert.equal(ghunnahRule.id, 'ghunnah');

  const qalqalahRule = analyzeArabicWordTajweed('ٱلْفَلَقِ');
  assert.equal(qalqalahRule.id, 'qalqalah');
});

test('Phase 13.2 — Real Human Audio for All 43+ Duas & 28 Noorani Qaida Arabic Letters', () => {
  assert.equal(NOORANI_QAIDA_28_LETTERS.length, 28);
  for (const letter of NOORANI_QAIDA_28_LETTERS) {
    assert.ok(letter.letterAudioMp3Url.startsWith('/assets/audio/qaida/') && letter.letterAudioMp3Url.endsWith('.mp3'));
    assert.ok(letter.humanAudioMp3Url.startsWith('https://cdn.islamic.network/quran/audio/128/ar.alafasy/'));
    assert.ok(letter.makhrajTip.en.length > 5);
    assert.ok(letter.makhrajTip.hinglish && letter.makhrajTip.hinglish.length > 5);
  }

  for (const dua of VERIFIED_DUAS) {
    const audio = resolveDuaHumanAudio(dua);
    assert.equal(audio.isHumanRecording, true);
    assert.ok(
      audio.mp3Url.startsWith('https://cdn.islamic.network/quran/audio/128/') ||
        audio.mp3Url.startsWith('https://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_'),
      `Unexpected audio URL for ${dua.id}: ${audio.mp3Url}`
    );
  }
});

test('Phase 13.3 — Capacitor Android APK Config & Native Azan Notification Scheduler', async () => {
  assert.equal(capacitorConfig.appId, 'com.ilmizo.tarbiyah');
  assert.equal(capacitorConfig.webDir, 'dist');

  const runtime = getCapacitorRuntimeStatus();
  assert.equal(runtime.appId, 'com.ilmizo.tarbiyah');

  const buildSteps = getAndroidApkBuildCommands();
  assert.equal(buildSteps.length, 3);

  const schedule = buildDailyAzanSchedule({
    prayerTimes24h: {
      Fajr: '05:15',
      Dhuhr: '12:30',
      Asr: '15:45',
      Maghrib: '18:15',
      Isha: '19:45',
    },
    prefs: DEFAULT_AZAN_NOTIFICATION_PREFS,
    referenceDate: new Date('2026-11-02T04:00:00Z'),
  });
  assert.equal(schedule.length, 5);
  assert.equal(schedule[0].prayerName, 'Fajr');

  const result = await scheduleDailyAzanNotifications({
    prayerTimes24h: {
      Fajr: '05:15',
      Dhuhr: '12:30',
      Asr: '15:45',
      Maghrib: '18:15',
      Isha: '19:45',
    },
    prefs: DEFAULT_AZAN_NOTIFICATION_PREFS,
    referenceDate: new Date('2026-11-02T04:00:00Z'),
  });
  assert.equal(result.ok, true);
  assert.equal(result.scheduledCount, 5);
});

