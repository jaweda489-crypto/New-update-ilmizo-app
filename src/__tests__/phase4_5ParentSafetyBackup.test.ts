import assert from 'node:assert/strict';
import test from 'node:test';
import {
  accumulateKidsForegroundUsage,
  ensureChildUsagePeriodRollover,
  generateParentRecoveryCode,
  isChildScreenTimeLimitReached,
  unlockChildScreenTimeWithPin,
  verifyParentPin,
  verifyRecoveryCodeAndResetPin,
} from '../engines/parentSafetyEngine';
import {
  applyValidatedImportWithRecovery,
  createBackupBundle,
  restorePreImportRecoverySnapshot,
  validateAndPreviewBackupJson,
} from '../services/backupRestoreEngine';
import {
  hydrateOrMigrateMasterState,
  saveMasterStateToLocalDb,
} from '../services/localDatabase';
import { normalizePersistedMasterState } from '../context/IlmizoContext';
import { ChildProfile } from '../types/ilmizo';

function createTestChild(overrides: Partial<ChildProfile> = {}): ChildProfile {
  return {
    id: 'child_test_ayaan',
    name: 'Ayaan',
    age: 8,
    avatar: 'Ayaan',
    dailyGoalMinutes: 10,
    activeMinutesToday: 0,
    activeSecondsToday: 0,
    extraMinutesGrantedToday: 0,
    stars: 45,
    streakDays: 5,
    questStepsCompleted: {
      quran: true,
      dua: false,
      quiz: false,
      salah: false,
      family: false,
    },
    pillarProgress: {
      quranLessons: 4,
      duasPracticed: 3,
      salahLessons: 2,
      akhlaqDeeds: 2,
    },
    unlockedAdventureNode: 3,
    needsPractice: [],
    goodDeeds: [],
    earnedBadgeIds: ['badge_quran', 'badge_kind'],
    completedSurahs: ['Surah Al-Ikhlas', 'Surah Al-Fatiha'],
    completedStoryIds: ['story_1'],
    recentActivities: [],
    ...overrides,
  };
}

test('Phase 4.5 (1) Timer persistence after refresh: saves and rehydrates activeSecondsToday and activeMinutesToday accurately', async () => {
  const now = new Date('2026-10-30T14:00:00');
  let child = createTestChild({ dailyGoalMinutes: 10 });

  // Simulate 185 seconds (3m 5s) of foreground usage across ticks
  for (let i = 0; i < 37; i++) {
    child = accumulateKidsForegroundUsage({
      child,
      elapsedMs: 5000,
      isForegroundAndVisible: true,
      now,
      resetHour: 0,
    }).updatedChild;
  }

  assert.equal(child.activeSecondsToday, 185);
  assert.equal(child.activeMinutesToday, 3);

  const initialMaster = normalizePersistedMasterState(
    {
      childrenProfiles: [child],
      activeChildId: child.id,
    },
    now
  );

  const saved = await saveMasterStateToLocalDb(initialMaster);
  assert.equal(saved.ok, true);

  const hydrated = await hydrateOrMigrateMasterState((raw) =>
    normalizePersistedMasterState(raw, now)
  );
  const restoredChild = hydrated.state.childrenProfiles.find((c) => c.id === child.id);
  assert.ok(restoredChild);
  assert.equal(restoredChild.activeSecondsToday, 185);
  assert.equal(restoredChild.activeMinutesToday, 3);
});

test('Phase 4.5 (2) Timer behaviour in background: pauses when hidden/blurred and prevents duplicate/runaway time jumps', () => {
  const now = new Date('2026-10-30T14:10:00');
  const child = createTestChild({ activeSecondsToday: 120, activeMinutesToday: 2 });

  // App is in background (isForegroundAndVisible = false) for 60 seconds -> 0 seconds added
  const bgResult = accumulateKidsForegroundUsage({
    child,
    elapsedMs: 60000,
    isForegroundAndVisible: false,
    now,
    resetHour: 0,
  });
  assert.equal(bgResult.secondsAdded, 0);
  assert.equal(bgResult.updatedChild.activeSecondsToday, 120);

  // Foreground resume with huge elapsed delta (e.g. 120s suspended tab) -> capped at 5s max delta per tick
  const cappedResult = accumulateKidsForegroundUsage({
    child: bgResult.updatedChild,
    elapsedMs: 120000,
    isForegroundAndVisible: true,
    now,
    resetHour: 0,
  });
  assert.equal(cappedResult.secondsAdded, 5);
  assert.equal(cappedResult.updatedChild.activeSecondsToday, 125);
});

test('Phase 4.5 (3) Lock activation at configured limit and daily reset at configured resetHour', () => {
  const now = new Date('2026-10-30T15:00:00');
  // 5-minute daily limit (300 seconds), currently at 298 seconds
  const child = createTestChild({
    dailyGoalMinutes: 5,
    activeSecondsToday: 298,
    activeMinutesToday: 4,
    usagePeriodKey: '2026-10-30_r04',
  });

  assert.equal(isChildScreenTimeLimitReached(child, now, 4), false);

  // 4 seconds of foreground activity reaches 300s cap and activates lock
  const hitLimit = accumulateKidsForegroundUsage({
    child,
    elapsedMs: 4000,
    isForegroundAndVisible: true,
    now,
    resetHour: 4,
  });
  assert.equal(hitLimit.limitReached, true);
  assert.equal(hitLimit.updatedChild.activeSecondsToday, 300);
  assert.equal(hitLimit.updatedChild.activeMinutesToday, 5);
  assert.equal(isChildScreenTimeLimitReached(hitLimit.updatedChild, now, 4), true);

  // Further ticks while locked do not accumulate extra time
  const whileLocked = accumulateKidsForegroundUsage({
    child: hitLimit.updatedChild,
    elapsedMs: 5000,
    isForegroundAndVisible: true,
    now,
    resetHour: 4,
  });
  assert.equal(whileLocked.secondsAdded, 0);
  assert.equal(whileLocked.limitReached, true);

  // Next day after 4:00 AM reset hour -> usage resets to 0 and lock clears
  const nextMorningAfterReset = new Date('2026-10-31T04:05:00');
  const rolled = ensureChildUsagePeriodRollover(
    whileLocked.updatedChild,
    nextMorningAfterReset,
    4
  );
  assert.equal(rolled.activeSecondsToday, 0);
  assert.equal(rolled.activeMinutesToday, 0);
  assert.equal(isChildScreenTimeLimitReached(rolled, nextMorningAfterReset, 4), false);
});

test('Phase 4.5 (4) Incorrect PIN rejection and valid PIN unlock on Screen-Time Lock', () => {
  const now = new Date('2026-10-30T16:00:00');
  const lockedChild = createTestChild({
    dailyGoalMinutes: 10,
    activeSecondsToday: 600,
    activeMinutesToday: 10,
    usagePeriodKey: '2026-10-30_r00',
  });

  assert.equal(verifyParentPin('0000', '1234'), false);
  assert.equal(verifyParentPin('12', '1234'), false);

  const wrongAttempt = unlockChildScreenTimeWithPin({
    child: lockedChild,
    enteredPin: '9999',
    storedParentPin: '1234',
    action: 'grant_10m',
    now,
    resetHour: 0,
  });
  assert.equal(wrongAttempt.ok, false);
  assert.ok(wrongAttempt.error?.includes('Incorrect Parent PIN'));
  assert.equal(isChildScreenTimeLimitReached(wrongAttempt.updatedChild, now, 0), true);

  // Correct PIN grants +10 minutes and unlocks immediately
  const rightAttempt = unlockChildScreenTimeWithPin({
    child: lockedChild,
    enteredPin: '1234',
    storedParentPin: '1234',
    action: 'grant_10m',
    now,
    resetHour: 0,
  });
  assert.equal(rightAttempt.ok, true);
  assert.equal(rightAttempt.updatedChild.extraMinutesGrantedToday, 10);
  assert.equal(isChildScreenTimeLimitReached(rightAttempt.updatedChild, now, 0), false);
});

test('Phase 4.5 (5 & 6) Correct recovery-code verification and Parent PIN reset', () => {
  const generated = generateParentRecoveryCode('20261030');
  assert.match(generated.recoveryCode, /^ILMZ-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  assert.ok(generated.recoveryHash.startsWith('ilmz_rc_v1_'));

  // Reject wrong recovery code
  const badCodeAttempt = verifyRecoveryCodeAndResetPin({
    enteredRecoveryCode: 'ILMZ-WWWW-ZZZZ',
    storedRecoveryHash: generated.recoveryHash,
    newPin: '5678',
  });
  assert.equal(badCodeAttempt.ok, false);
  assert.ok(badCodeAttempt.error?.includes('Invalid recovery code'));

  // Reject invalid new PIN format even with right recovery code
  const badNewPinAttempt = verifyRecoveryCodeAndResetPin({
    enteredRecoveryCode: generated.recoveryCode,
    storedRecoveryHash: generated.recoveryHash,
    newPin: '56a8',
  });
  assert.equal(badNewPinAttempt.ok, false);

  // Accept valid recovery code (case-insensitive / without dashes) and reset PIN
  const lowerWithoutDashes = generated.recoveryCode.replace(/-/g, '').toLowerCase();
  const validReset = verifyRecoveryCodeAndResetPin({
    enteredRecoveryCode: lowerWithoutDashes,
    storedRecoveryHash: generated.recoveryHash,
    newPin: '7890',
  });
  assert.equal(validReset.ok, true);
  assert.equal(validReset.updatedPin, '7890');
});

test('Phase 4.5 (7 & 8) Backup export and import preserve all adult, kids, screen-time, badges, certificates, and parent settings', async () => {
  const customChild = createTestChild({
    id: 'child_backup_1',
    name: 'Zayd',
    stars: 85,
    activeMinutesToday: 7,
    activeSecondsToday: 435,
    dailyGoalMinutes: 15,
    earnedBadgeIds: ['badge_quran', 'badge_dua', 'badge_salah'],
    completedSurahs: ['Surah Al-Fatiha', 'Surah Al-Ikhlas', 'Surah Al-Asr'],
  });

  const stateToExport = normalizePersistedMasterState({
    user: {
      name: 'Umar',
      city: 'Madinah',
      country: 'Saudi Arabia',
      language: 'en',
      darkMode: false,
      arabicFontScale: 3,
      parentPin: '4321',
      parentPinRecoveryHash: 'ilmz_rc_v1_test',
      kidsDailyResetHour: 4,
      entitlement: 'family_199',
      streakDays: 9,
      lastRead: { surahNumber: 36, surahName: 'Ya-Sin', ayahNumber: 12 },
      tasbihCount: 33,
      tasbihTotal: 900,
      activeDhikrIndex: 1,
    },
    childrenProfiles: [customChild],
    activeChildId: customChild.id,
  });

  const jsonExport = createBackupBundle(stateToExport);
  const rawParsed = JSON.parse(jsonExport);

  // Verify Part C.1 required export sections
  assert.equal(rawParsed.user.name, 'Umar');
  assert.equal(rawParsed.parentSafetySettings.kidsDailyResetHour, 4);
  assert.equal(rawParsed.parentSafetySettings.hasRecoveryCodeConfigured, true);
  assert.equal(Array.isArray(rawParsed.certificatesAndBadgesSummary), true);
  assert.equal(rawParsed.certificatesAndBadgesSummary[0].childName, 'Zayd');
  assert.equal(rawParsed.certificatesAndBadgesSummary[0].activeSecondsToday, 435);
  assert.equal(rawParsed.certificatesAndBadgesSummary[0].certificateAchievements.length, 3);
  assert.ok(Array.isArray(rawParsed.bookmarks));
  assert.ok(Array.isArray(rawParsed.personalNotes));
  assert.ok(Array.isArray(rawParsed.hifzPlans));
  assert.ok(Array.isArray(rawParsed.revisionItems));
  assert.ok(typeof rawParsed.salahRecords === 'object');
  assert.ok(Array.isArray(rawParsed.learningEvents));

  // Validate and import
  const validation = validateAndPreviewBackupJson(jsonExport, normalizePersistedMasterState);
  assert.equal(validation.valid, true);
  assert.equal(validation.preview?.adultProfileName, 'Umar');
  assert.equal(validation.preview?.badgesCount, 3);
  assert.equal(validation.preview?.certificatesCount, 3);

  const importRes = await applyValidatedImportWithRecovery(
    validation.normalizedState!,
    normalizePersistedMasterState(null)
  );
  assert.equal(importRes.ok, true);
  assert.ok(importRes.recoveryCreatedAtIso);
});

test('Phase 4.5 (9) Invalid backup rejection: rejects malformed JSON, missing domains, invalid schemaVersion, and wrong field types', () => {
  const emptyRes = validateAndPreviewBackupJson('   ', normalizePersistedMasterState);
  assert.equal(emptyRes.valid, false);

  const malformedRes = validateAndPreviewBackupJson('{not valid json', normalizePersistedMasterState);
  assert.equal(malformedRes.valid, false);

  const unrecognizedRes = validateAndPreviewBackupJson(
    JSON.stringify({ hello: 'world' }),
    normalizePersistedMasterState
  );
  assert.equal(unrecognizedRes.valid, false);

  const futureVersionRes = validateAndPreviewBackupJson(
    JSON.stringify({ schemaVersion: 999, user: { name: 'Aqib' } }),
    normalizePersistedMasterState
  );
  assert.equal(futureVersionRes.valid, false);
  assert.ok(futureVersionRes.errors[0].includes('Unsupported future backup schemaVersion'));

  const corruptedFieldRes = validateAndPreviewBackupJson(
    JSON.stringify({
      schemaVersion: 2,
      user: { name: 'Aqib' },
      childrenProfiles: 'not-an-array',
      salahRecords: ['not-an-object'],
    }),
    normalizePersistedMasterState
  );
  assert.equal(corruptedFieldRes.valid, false);
  assert.equal(corruptedFieldRes.errors.length, 2);
});

test('Phase 4.5 (10) Duplicate event handling & duplicate reward prevention during backup import', () => {
  const baseState = normalizePersistedMasterState(null);
  const duplicatedPayload = {
    ...baseState,
    schemaVersion: 2,
    learningEvents: [
      {
        id: 'ev_1',
        type: 'lesson_completed',
        mode: 'kids',
        childId: 'child_ayaan',
        referenceId: 'kids_story_1',
        title: 'Story 1',
        dateKey: '2026-10-30',
        timestampIso: '2026-10-30T10:00:00Z',
        value: 5,
      },
      {
        id: 'ev_1_dup',
        type: 'lesson_completed',
        mode: 'kids',
        childId: 'child_ayaan',
        referenceId: 'kids_story_1',
        title: 'Story 1 Duplicate',
        dateKey: '2026-10-30',
        timestampIso: '2026-10-30T10:01:00Z',
        value: 5,
      },
    ],
    childrenProfiles: [
      {
        ...baseState.childrenProfiles[0],
        stars: 50, // includes +5 inflated stars from duplicate event
        completedSurahs: ['Surah Al-Ikhlas', 'Al-Ikhlas', 'Surah Al-Fatiha'],
        earnedBadgeIds: ['badge_quran', 'badge_quran'],
      },
    ],
  };

  const res = validateAndPreviewBackupJson(
    JSON.stringify(duplicatedPayload),
    normalizePersistedMasterState
  );
  assert.equal(res.valid, true);
  assert.equal(res.normalizedState?.learningEvents.length, 1);
  assert.equal(res.normalizedState?.childrenProfiles[0].completedSurahs.length, 2);
  assert.equal(res.normalizedState?.childrenProfiles[0].earnedBadgeIds.length, 1);
  // Legitimate earned stars (50) are preserved during deduplication unless provenDuplicateStarInflation is set
  assert.equal(res.normalizedState?.childrenProfiles[0].stars, 50);
  assert.ok((res.preview?.duplicatesRemovedCount ?? 0) >= 3);
});

test('Phase 4.5 (11) Data preservation after import failure and pre-import recovery snapshot restoration', async () => {
  const originalState = normalizePersistedMasterState({
    user: {
      ...normalizePersistedMasterState(null).user,
      name: 'PreservedParentName',
    },
  });
  await saveMasterStateToLocalDb(originalState);

  // Attempting to validate a corrupted backup fails before touching storage
  const failedValidation = validateAndPreviewBackupJson(
    '{"schemaVersion": 2, "user": "corrupted_user_not_object"}',
    normalizePersistedMasterState
  );
  assert.equal(failedValidation.valid, false);

  const afterFailedImport = await hydrateOrMigrateMasterState(normalizePersistedMasterState);
  assert.equal(afterFailedImport.state.user.name, 'PreservedParentName');

  // Even after a valid import, 1-click pre-import recovery snapshot restores the original state
  const replacementState = normalizePersistedMasterState({
    user: {
      ...originalState.user,
      name: 'TemporaryImportedName',
    },
  });
  const applied = await applyValidatedImportWithRecovery(replacementState, originalState);
  assert.equal(applied.ok, true);

  const restoredSnap = await restorePreImportRecoverySnapshot(normalizePersistedMasterState);
  assert.equal(restoredSnap.ok, true);
  assert.equal(restoredSnap.restoredState?.user.name, 'PreservedParentName');
});
