import assert from 'node:assert/strict';
import test from 'node:test';
import {
  clearNonDownloadedApiCache,
  computeLocalStorageMetrics,
  getCachedPrayerTimings,
  getOfflineSurahFromDb,
  getRecoverySnapshot,
  hydrateOrMigrateMasterState,
  LEGACY_MASTER_STORAGE_KEY,
  MIGRATION_VERIFIED_PREF_KEY,
  PersistedMasterState,
  resetLocalDatabaseMemoryForTesting,
  saveCachedPrayerTimings,
  saveMasterStateToLocalDb,
  saveOfflineSurahToDb,
  setSimulateQuotaExceededForTesting,
} from '../services/localDatabase';
import {
  applyValidatedImportWithRecovery,
  createBackupBundle,
  restorePreImportRecoverySnapshot,
  validateAndPreviewBackupJson,
} from '../services/backupRestoreEngine';
import { normalizePersistedMasterState } from '../context/IlmizoContext';
import {
  applyChildQuestCompletion,
  ensureChildDailyRollover,
} from '../engines/kidsLearningEngines';
import {
  appendLearningEvent,
  computeLearningStreak,
} from '../engines/adultLearningEngines';
import {
  getSurahOfflineAvailability,
  getSurahPayload,
  removeDownloadedOfflineSurah,
} from '../data/quranData';
import { verifyParentPin } from '../engines/parentSafetyEngine';

test('1. Fresh installation initializes clean default state in IndexedDB', async () => {
  resetLocalDatabaseMemoryForTesting();
  const res = await hydrateOrMigrateMasterState(normalizePersistedMasterState);

  assert.equal(res.migratedFromLegacy, false);
  assert.equal(res.verifiedMigration, true);
  assert.equal(res.state.user.name, 'Aqib');
  assert.equal(res.state.childrenProfiles.length, 1);
  assert.equal(res.state.childrenProfiles[0].id, 'child_ayaan');
});

test('2. Safe migration of ilmizo_master_state_v1 into IndexedDB without deleting original v1 record', async () => {
  resetLocalDatabaseMemoryForTesting();

  const mockStorage = new Map<string, string>();
  const g = globalThis as unknown as {
    localStorage?: {
      getItem: (k: string) => string | null;
      setItem: (k: string, v: string) => void;
      removeItem: (k: string) => void;
      length: number;
      key: (i: number) => string | null;
    };
  };
  const previousLocalStorage = g.localStorage;
  g.localStorage = {
    getItem: (k: string) => mockStorage.get(k) ?? null,
    setItem: (k: string, v: string) => {
      mockStorage.set(k, v);
    },
    removeItem: (k: string) => {
      mockStorage.delete(k);
    },
    get length() {
      return mockStorage.size;
    },
    key: (i: number) => Array.from(mockStorage.keys())[i] ?? null,
  };

  try {
    const legacyV1Data = {
      user: {
        name: 'Umar Farooq',
        city: 'Jamshedpur',
        country: 'India',
        language: 'en',
        streakDays: 19,
        dailyGoalMinutes: 20,
        dailyGoalVerses: 7,
        entitlement: 'family_199',
        arabicFontScale: 3,
        reciterName: 'Mishary Rashid Alafasy',
        playbackRate: 1.25,
        hijriAdjustmentDays: 0,
        prayerCalculationMethod: 1,
        prayerAsrSchool: 1,
        darkMode: true,
        tasbihCount: 66,
        tasbihTotal: 1450,
        activeDhikrIndex: 1,
        parentPin: '7860',
        lastRead: {
          surahNumber: 67,
          surahName: 'Al-Mulk',
          ayahNumber: 15,
        },
      },
      bookmarks: [
        {
          id: 'bm_legacy_1',
          surahNumber: 67,
          surahName: 'Al-Mulk',
          ayahNumber: 15,
          arabicSnippet: 'هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا',
          createdAt: '2026-10-01',
        },
      ],
    };

    mockStorage.set(LEGACY_MASTER_STORAGE_KEY, JSON.stringify(legacyV1Data));

    const migrationResult = await hydrateOrMigrateMasterState(normalizePersistedMasterState);

    assert.equal(migrationResult.migratedFromLegacy, true);
    assert.equal(migrationResult.verifiedMigration, true);
    assert.equal(migrationResult.state.user.name, 'Umar Farooq');
    assert.equal(migrationResult.state.user.parentPin, undefined);
    assert.ok(Boolean(migrationResult.state.user.parentPinVerifier));
    assert.equal(verifyParentPin('7860', migrationResult.state.user.parentPinVerifier), true);
    assert.equal(migrationResult.state.user.lastRead.surahNumber, 67);
    assert.equal(migrationResult.state.bookmarks.length, 1);
    assert.equal(migrationResult.state.bookmarks[0].id, 'bm_legacy_1');

    // Original ilmizo_master_state_v1 MUST still exist intact in localStorage
    assert.ok(mockStorage.get(LEGACY_MASTER_STORAGE_KEY)?.includes('Umar Farooq'));
    // Migration verified marker MUST be set only after read-back verification
    assert.equal(mockStorage.get(MIGRATION_VERIFIED_PREF_KEY), 'true');
  } finally {
    g.localStorage = previousLocalStorage;
  }
});

test('3. App refresh persistence across saveMasterStateToLocalDb and hydrateOrMigrateMasterState', async () => {
  resetLocalDatabaseMemoryForTesting();
  const baseState = normalizePersistedMasterState({});
  const modifiedState: PersistedMasterState = {
    ...baseState,
    user: {
      ...baseState.user,
      name: 'Zayd Ibn Thabit',
      tasbihTotal: 999,
      lastRead: {
        surahNumber: 36,
        surahName: 'Ya-Sin',
        ayahNumber: 12,
      },
    },
    completedLessonIds: ['les_1', 'les_2', 'les_3'],
    masteredVocabIds: ['v_1', 'v_2', 'v_3', 'v_4'],
  };

  const writeRes = await saveMasterStateToLocalDb(modifiedState);
  assert.equal(writeRes.ok, true);

  // Simulate browser refresh by re-hydrating from localDatabase
  const hydrated = await hydrateOrMigrateMasterState(normalizePersistedMasterState);

  assert.equal(hydrated.state.user.name, 'Zayd Ibn Thabit');
  assert.equal(hydrated.state.user.tasbihTotal, 999);
  assert.equal(hydrated.state.user.lastRead.surahNumber, 36);
  assert.deepEqual(hydrated.state.completedLessonIds, ['les_1', 'les_2', 'les_3']);
  assert.deepEqual(hydrated.state.masteredVocabIds, ['v_1', 'v_2', 'v_3', 'v_4']);
});

test('4. Offline Surah resolution: Bundled, Downloaded IndexedDB, Cached, and Offline-Unavailable safety', async () => {
  resetLocalDatabaseMemoryForTesting();

  // Temporarily stub global fetch to simulate complete offline network outage
  const g = globalThis as unknown as { fetch: typeof fetch };
  const origFetch = g.fetch;
  g.fetch = async () => {
    throw new Error('Simulated offline network outage');
  };

  try {
    // 4a. Bundled full Surah (Surah 1 Al-Fatiha) works offline with zero network
    const fatiha = await getSurahPayload(1, 'en', 'Mishary Rashid Alafasy');
    assert.equal(fatiha.offlineUnavailable, false);
    assert.equal(fatiha.offlineSourceType, 'bundled_full');
    assert.equal(fatiha.ayahs.length, 7);

    // 4b. Uncached Surah (Surah 50 Qaf, 45 ayahs) when offline returns explicit offlineUnavailable and NEVER substitutes Al-Fatiha
    const qafOffline = await getSurahPayload(50, 'en', 'Mishary Rashid Alafasy');
    assert.equal(qafOffline.meta.number, 50);
    assert.equal(qafOffline.meta.nameTranslit, 'Qaf');
    assert.equal(qafOffline.offlineUnavailable, true);
    assert.equal(qafOffline.offlineSourceType, 'unavailable');
    assert.equal(qafOffline.ayahs.length, 0);

    // 4c. Explicitly downloaded Surah in IndexedDB with valid ayahCount (45 ayahs for Surah 50) resolves offline with 'downloaded_idb'
    const fullQafAyahs = Array.from({ length: qafOffline.meta.ayahCount }, (_, idx) => ({
      numberInSurah: idx + 1,
      globalNumber: 4630 + idx + 1,
      arabicUthmani: 'ق ۚ وَالْقُرْآنِ الْمَجِيدِ',
      transliteration: 'Qaf. Wal-Quranil-Majid.',
      translations: {
        en: 'Qaf. By the honored Quran.',
      },
      tafsirBrief: 'Verified Uthmani script — Surah Qaf.',
    }));

    await saveOfflineSurahToDb(
      50,
      'en',
      {
        meta: qafOffline.meta,
        ayahs: fullQafAyahs,
        offlineUnavailable: false,
        verification: qafOffline.verification,
      },
      true
    );

    const qafFromIdb = await getSurahPayload(50, 'en', 'Mishary Rashid Alafasy');
    assert.equal(qafFromIdb.offlineUnavailable, false);
    assert.equal(qafFromIdb.offlineSourceType, 'downloaded_idb');
    assert.equal(qafFromIdb.ayahs.length, 45);

    // Verify availability helper
    assert.equal(getSurahOfflineAvailability(1, [], []), 'bundled_full');
    assert.equal(getSurahOfflineAvailability(112, [], []), 'bundled_full');
    assert.equal(getSurahOfflineAvailability(2, [], []), 'bundled_partial');
    assert.equal(getSurahOfflineAvailability(50, [50], []), 'downloaded');
    assert.equal(getSurahOfflineAvailability(36, [], [36]), 'cached');
    assert.equal(getSurahOfflineAvailability(55, [], []), 'online_only');

    // Remove downloaded Surah and verify cleanup
    await removeDownloadedOfflineSurah(50, 'en');
    const afterDelete = await getOfflineSurahFromDb(50, 'en');
    assert.equal(afterDelete, null);
  } finally {
    g.fetch = origFetch;
  }
});

test('5. Profile switching & strict child isolation across multiple children on same device', () => {
  const baseState = normalizePersistedMasterState({});
  const ayaanSeed = baseState.childrenProfiles.find((c) => c.id === 'child_ayaan')!;
  const state = normalizePersistedMasterState({
    childrenProfiles: [
      ayaanSeed,
      {
        ...ayaanSeed,
        id: 'child_ayla',
        name: 'Ayla',
        age: 5,
        stars: 40,
        questStepsCompleted: { quran: false, dua: false, salah: false, quiz: false, family: false },
      },
    ],
  });
  const ayaan = state.childrenProfiles.find((c) => c.id === 'child_ayaan')!;
  const ayla = state.childrenProfiles.find((c) => c.id === 'child_ayla')!;

  const ayaanInitialStars = ayaan.stars;
  const aylaInitialStars = ayla.stars;

  // Complete 'salah' step for Ayaan only (since quran, dua, quiz are already true in Ayaan's seed)
  const ayaanUpdated = applyChildQuestCompletion(
    ayaan,
    'salah',
    'Salah Step 1',
    undefined,
    '2026-10-30'
  );
  assert.equal(ayaanUpdated.updatedChild.stars, ayaanInitialStars + 5);
  assert.equal(ayaanUpdated.updatedChild.questStepsCompleted.salah, true);

  // Ayla's profile remains 100% isolated and unchanged
  assert.equal(ayla.stars, aylaInitialStars);
  assert.equal(ayla.questStepsCompleted.salah, false);
});

test('6. Learning event persistence, deduplication & streak calculation', () => {
  const day1 = new Date('2026-10-29T10:00:00');
  const day2 = new Date('2026-10-30T10:00:00');

  let events = appendLearningEvent(
    [],
    {
      type: 'quran_ayah_read',
      referenceId: 'surah_67_ayah_1',
      title: 'Read Al-Mulk 67:1',
      mode: 'adult',
    },
    day1
  );

  // Duplicate event on same dateKey with same type + referenceId + mode is prevented
  events = appendLearningEvent(
    events,
    {
      type: 'quran_ayah_read',
      referenceId: 'surah_67_ayah_1',
      title: 'Read Al-Mulk 67:1 again',
      mode: 'adult',
    },
    day1
  );
  assert.equal(events.length, 1);

  // Next day event increments streak to 2 days
  events = appendLearningEvent(
    events,
    {
      type: 'hifz_revision',
      referenceId: 'rev_255',
      title: 'Reviewed Ayat al-Kursi',
      mode: 'adult',
    },
    day2
  );
  assert.equal(events.length, 2);

  const streak = computeLearningStreak({
    learningEvents: events,
    salahRecords: {},
    baseDate: day2,
  });
  assert.equal(streak.currentStreakDays, 2);
  assert.equal(streak.isTodayActive, true);
});

test('7. Daily date rollover resets child daily quest steps and activeMinutesToday while preserving stars and badges', () => {
  const state = normalizePersistedMasterState({});
  const ayaan = {
    ...state.childrenProfiles[0],
    lastActiveDateKey: '2026-10-29',
    activeMinutesToday: 8,
    stars: 150,
    questStepsCompleted: {
      quran: true,
      dua: true,
      quiz: true,
      salah: true,
      family: false,
    },
  };

  // Same day does not reset
  const sameDay = ensureChildDailyRollover(ayaan, '2026-10-29');
  assert.equal(sameDay.activeMinutesToday, 8);
  assert.equal(sameDay.questStepsCompleted.quran, true);

  // Next calendar day ('2026-10-30') rolls over daily quest flags and activeMinutesToday, preserving stars
  const rolledOver = ensureChildDailyRollover(ayaan, '2026-10-30');
  assert.equal(rolledOver.lastActiveDateKey, '2026-10-30');
  assert.equal(rolledOver.activeMinutesToday, 0);
  assert.equal(rolledOver.stars, 150);
  assert.deepEqual(rolledOver.questStepsCompleted, {
    quran: false,
    dua: false,
    quiz: false,
    salah: false,
    family: false,
  });
});

test('8. Duplicate reward prevention: repeating an already-completed daily quest step awards 0 extra stars', () => {
  const state = normalizePersistedMasterState({});
  const childYesterday = {
    ...state.childrenProfiles[0],
    lastActiveDateKey: '2026-10-29',
  };
  const freshChild = ensureChildDailyRollover(childYesterday, '2026-10-30');

  // First completion of 'quran' today awards +5 stars and +1 quranLessons
  const firstRun = applyChildQuestCompletion(
    freshChild,
    'quran',
    'Surah Al-Ikhlas',
    undefined,
    '2026-10-30'
  );
  assert.equal(firstRun.starsAwarded, 5);
  assert.equal(firstRun.duplicatePrevented, false);
  assert.equal(firstRun.updatedChild.stars, freshChild.stars + 5);
  assert.equal(
    firstRun.updatedChild.pillarProgress.quranLessons,
    freshChild.pillarProgress.quranLessons + 1
  );

  // Second completion of 'quran' on the SAME day ('2026-10-30') awards 0 stars and does NOT inflate quranLessons
  const duplicateRun = applyChildQuestCompletion(
    firstRun.updatedChild,
    'quran',
    'Surah Al-Ikhlas',
    undefined,
    '2026-10-30'
  );
  assert.equal(duplicateRun.starsAwarded, 0);
  assert.equal(duplicateRun.duplicatePrevented, true);
  assert.equal(duplicateRun.updatedChild.stars, firstRun.updatedChild.stars);
  assert.equal(
    duplicateRun.updatedChild.pillarProgress.quranLessons,
    firstRun.updatedChild.pillarProgress.quranLessons
  );
});

test('9. JSON Export, Import Validation, Deduplication, and Preview Summary', () => {
  const state = normalizePersistedMasterState({});
  const jsonBackup = createBackupBundle(state);

  // Validate valid backup
  const validation = validateAndPreviewBackupJson(jsonBackup, normalizePersistedMasterState);
  assert.equal(validation.valid, true);
  assert.ok(validation.preview);
  assert.equal(validation.preview.schemaVersion, 2);
  assert.equal(validation.preview.adultProfileName, 'Aqib');
  assert.equal(validation.preview.childProfilesCount, 1);

  // Reject malformed JSON
  const corrupted = validateAndPreviewBackupJson('{bad json', normalizePersistedMasterState);
  assert.equal(corrupted.valid, false);
  assert.ok(corrupted.errors[0]?.includes('Invalid JSON'));

  // Reject unrelated JSON object
  const unrelated = validateAndPreviewBackupJson(
    JSON.stringify({ hello: 'world' }),
    normalizePersistedMasterState
  );
  assert.equal(unrelated.valid, false);

  // Deduplicate repeated bookmark/child IDs on import
  const duplicatePayload = JSON.parse(jsonBackup);
  duplicatePayload.bookmarks = [
    ...duplicatePayload.bookmarks,
    ...duplicatePayload.bookmarks, // duplicated IDs
  ];
  const dedupedValidation = validateAndPreviewBackupJson(
    JSON.stringify(duplicatePayload),
    normalizePersistedMasterState
  );
  assert.equal(dedupedValidation.valid, true);
  assert.equal(
    dedupedValidation.normalizedState?.bookmarks.length,
    state.bookmarks.length
  );
});

test('10. Automatic Pre-Import Recovery Snapshot creation and 1-click restoration', async () => {
  resetLocalDatabaseMemoryForTesting();
  const originalState = normalizePersistedMasterState({
    user: {
      ...normalizePersistedMasterState({}).user,
      name: 'Original State Before Import',
    },
  });
  await saveMasterStateToLocalDb(originalState);

  const importedState = normalizePersistedMasterState({
    user: {
      ...normalizePersistedMasterState({}).user,
      name: 'Imported Replacement Profile',
    },
  });

  // applyValidatedImportWithRecovery(validatedState, currentState)
  const applyRes = await applyValidatedImportWithRecovery(importedState, originalState);
  assert.equal(applyRes.ok, true);
  assert.ok(applyRes.recoveryCreatedAtIso);

  // Verify recovery snapshot exists in IndexedDB with original state
  const snapshot = await getRecoverySnapshot('pre_import_latest');
  assert.ok(snapshot);
  assert.equal(snapshot.state.user.name, 'Original State Before Import');

  // Restore pre-import snapshot with 1 click
  const restored = await restorePreImportRecoverySnapshot(normalizePersistedMasterState);
  assert.equal(restored.ok, true);
  assert.equal(restored.restoredState?.user.name, 'Original State Before Import');
});

test('11. Storage Quota Exceeded error handling & Prayer Timings IndexedDB cache', async () => {
  resetLocalDatabaseMemoryForTesting();
  const state = normalizePersistedMasterState({});

  try {
    setSimulateQuotaExceededForTesting(true);
    const quotaFail = await saveMasterStateToLocalDb(state);
    assert.equal(quotaFail.ok, false);
    assert.equal(quotaFail.quotaExceeded, true);
    assert.ok(quotaFail.error?.toLowerCase().includes('quota exceeded'));
  } finally {
    setSimulateQuotaExceededForTesting(false);
  }

  // Verify Prayer Timings cache & clearNonDownloadedApiCache
  await saveCachedPrayerTimings({
    city: 'Jamshedpur',
    country: 'India',
    method: 1,
    school: 1,
    dateKey: '2026-10-30',
    timings: {
      Fajr: '4:52 AM',
      Dhuhr: '12:08 PM',
      Asr: '3:35 PM',
      Maghrib: '5:52 PM',
      Isha: '7:08 PM',
    },
    hijriLabel: '17 Rabi al-Thani 1448 AH',
  });

  const cachedPrayer = await getCachedPrayerTimings(
    'Jamshedpur',
    'India',
    1,
    1,
    '2026-10-30'
  );
  assert.ok(cachedPrayer);
  assert.equal(cachedPrayer.timings.Dhuhr, '12:08 PM');

  // Save 1 downloaded Surah and 1 cached-only Surah, then clear non-downloaded API cache
  const dummyVerification = {
    source: 'Tanzil Uthmani',
    edition: 'quran-uthmani',
    reference: 'Test',
    language: 'English',
    version: '1.0.0',
    reviewer: 'Ilmizo Registry',
    status: 'Verified' as const,
  };

  await saveOfflineSurahToDb(
    67,
    'en',
    {
      meta: {
        number: 67,
        nameArabic: 'الملك',
        nameTranslit: 'Al-Mulk',
        nameEnglish: 'The Sovereignty',
        ayahCount: 30,
        revelationType: 'Meccan',
        juz: 29,
      },
      ayahs: [],
      verification: dummyVerification,
    },
    true
  );
  await saveOfflineSurahToDb(
    78,
    'en',
    {
      meta: {
        number: 78,
        nameArabic: 'النبإ',
        nameTranslit: 'An-Naba',
        nameEnglish: 'The Tidings',
        ayahCount: 40,
        revelationType: 'Meccan',
        juz: 30,
      },
      ayahs: [],
      verification: dummyVerification,
    },
    false
  );

  const metricsBefore = await computeLocalStorageMetrics();
  assert.deepEqual(metricsBefore.downloadedSurahNumbers, [67]);
  assert.deepEqual(metricsBefore.cachedSurahNumbers, [78]);

  await clearNonDownloadedApiCache();

  const metricsAfter = await computeLocalStorageMetrics();
  // Explicitly downloaded Surah 67 is preserved, while transient cached Surah 78 is cleared
  assert.deepEqual(metricsAfter.downloadedSurahNumbers, [67]);
  assert.deepEqual(metricsAfter.cachedSurahNumbers, []);
});
