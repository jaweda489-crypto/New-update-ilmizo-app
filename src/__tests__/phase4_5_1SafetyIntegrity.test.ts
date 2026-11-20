import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createParentPinVerifierAsync,
  createParentPinVerifierSync,
  ensureChildUsagePeriodRollover,
  generateParentRecoveryCodeAsync,
  getUsagePeriodDateKey,
  getUsagePeriodKey,
  hashRecoveryCode,
  hashRecoveryCodeAsync,
  verifyParentPin,
  verifyParentPinAsync,
  verifyRecoveryCodeAndResetPinAsync,
  verifyRecoveryCodeHashAsync,
} from '../engines/parentSafetyEngine';
import {
  applyChildQuestCompletion,
  ensureChildDailyRollover,
} from '../engines/kidsLearningEngines';
import {
  createBackupBundle,
  getHifzPlanIdentityKey,
  validateAndPreviewBackupJson,
} from '../services/backupRestoreEngine';
import {
  getRecoverySnapshot,
  hydrateOrMigrateMasterState,
  resetLocalDatabaseMemoryForTesting,
  saveMasterStateToLocalDb,
  saveRecoverySnapshot,
} from '../services/localDatabase';
import { normalizePersistedMasterState } from '../context/IlmizoContext';
import { ChildProfile, HifzPlan } from '../types/ilmizo';

const createTestChild = (overrides: Partial<ChildProfile> = {}): ChildProfile => {
  const base = normalizePersistedMasterState(null).childrenProfiles[0];
  return {
    ...base,
    id: 'child_ayaan',
    name: 'Ayaan',
    age: 7,
    avatar: 'Ayaan',
    stars: 40,
    streakDays: 3,
    completedSurahs: ['Surah Al-Fatiha'],
    completedStoryIds: ['kids_story_1'],
    questStepsCompleted: {
      quran: true,
      dua: true,
      quiz: false,
      salah: false,
      family: false,
    },
    dailyGoalMinutes: 10,
    activeMinutesToday: 6,
    activeSecondsToday: 360,
    extraMinutesGrantedToday: 0,
    usagePeriodKey: '2026-10-30_r04',
    lastUsageTimestampMs: new Date(2026, 9, 30, 22, 0, 0).getTime(),
    lastActiveDateKey: '2026-10-30',
    earnedBadgeIds: ['badge_bismillah'],
    ...overrides,
  };
};

test('Phase 4.5.1 Part A: Daily reset hour & midnight rollover unification across reset hours 0, 4, 6, 12', () => {
  for (const resetHour of [0, 4, 6, 12]) {
    const padded = String(resetHour).padStart(2, '0');
    const beforeReset = new Date(2026, 9, 31, resetHour === 0 ? 23 : resetHour - 1, 59, 0);
    const expectedDateBefore = resetHour === 0 ? '2026-10-31' : '2026-10-30';
    assert.equal(getUsagePeriodDateKey(beforeReset, resetHour), expectedDateBefore);
    assert.equal(getUsagePeriodKey(beforeReset, resetHour), `${expectedDateBefore}_r${padded}`);

    const atReset = new Date(2026, 9, 31, resetHour, 0, 0);
    assert.equal(getUsagePeriodDateKey(atReset, resetHour), '2026-10-31');
    assert.equal(getUsagePeriodKey(atReset, resetHour), `2026-10-31_r${padded}`);
  }

  // Specifically test resetHour = 4 across 23:59, 00:01, 01:30, 03:59, 04:00
  const resetHour = 4;
  let child = createTestChild({
    activeSecondsToday: 480,
    activeMinutesToday: 8,
    usagePeriodKey: '2026-10-30_r04',
    lastActiveDateKey: '2026-10-30',
    lastUsageTimestampMs: new Date(2026, 9, 30, 23, 50, 0).getTime(),
  });

  const checkPointsBefore4am = [
    new Date(2026, 9, 30, 23, 59, 0),
    new Date(2026, 9, 31, 0, 1, 0),
    new Date(2026, 9, 31, 1, 30, 0),
    new Date(2026, 9, 31, 3, 59, 0),
  ];

  for (const dt of checkPointsBefore4am) {
    // Calling both ensureChildUsagePeriodRollover and ensureChildDailyRollover (simulating refresh + quest completion)
    child = ensureChildUsagePeriodRollover(child, dt, resetHour);
    child = ensureChildDailyRollover(child, '2026-10-31', resetHour, dt);
    assert.equal(
      child.activeSecondsToday,
      480,
      `Usage must NOT reset at ${dt.toTimeString()} when resetHour=4`
    );
    assert.equal(child.questStepsCompleted.quran, true);
    assert.equal(child.usagePeriodKey, '2026-10-30_r04');
  }

  // Completing a quest step at 01:30 AM (between midnight and 04:00 AM) must preserve existing usage & quest state
  const questAt130am = applyChildQuestCompletion(
    child,
    'salah',
    'Fajr Wudu Practice',
    undefined,
    '2026-10-31',
    resetHour,
    new Date(2026, 9, 31, 1, 30, 0)
  );
  assert.equal(questAt130am.updatedChild.questStepsCompleted.quran, true);
  assert.equal(questAt130am.updatedChild.questStepsCompleted.salah, true);
  assert.equal(questAt130am.updatedChild.activeSecondsToday, 480);

  // At 04:00 AM exactly, rollover occurs cleanly once
  const at4am = new Date(2026, 9, 31, 4, 0, 0);
  const rolledAt4am = ensureChildUsagePeriodRollover(questAt130am.updatedChild, at4am, resetHour);
  assert.equal(rolledAt4am.activeSecondsToday, 0);
  assert.equal(rolledAt4am.activeMinutesToday, 0);
  assert.equal(rolledAt4am.questStepsCompleted.quran, false);
  assert.equal(rolledAt4am.questStepsCompleted.salah, false);
  assert.equal(rolledAt4am.usagePeriodKey, '2026-10-31_r04');
  assert.equal(rolledAt4am.lastActiveDateKey, '2026-10-31');
});

test('Phase 4.5.1 Part B: Device clock tampering protection prevents resetting usage when clock moves backward', () => {
  const realNow = new Date(2026, 9, 30, 18, 0, 0);
  const lockedChild = createTestChild({
    dailyGoalMinutes: 10,
    activeSecondsToday: 600, // 10m used -> locked!
    activeMinutesToday: 10,
    usagePeriodKey: '2026-10-30_r00',
    lastUsageTimestampMs: realNow.getTime(),
  });

  // Case 1: Child sets device clock back by 3 hours on the same day
  const clockBack3Hours = new Date(2026, 9, 30, 15, 0, 0);
  const afterBackHours = ensureChildUsagePeriodRollover(lockedChild, clockBack3Hours, 0);
  assert.equal(afterBackHours.activeSecondsToday, 600);
  assert.equal(afterBackHours.clockTamperDetected, true);

  // Case 2: Child sets device clock back to yesterday (2026-10-29)
  const clockBackYesterday = new Date(2026, 9, 29, 12, 0, 0);
  const afterBackDay = ensureChildUsagePeriodRollover(lockedChild, clockBackYesterday, 0);
  assert.equal(afterBackDay.activeSecondsToday, 600, 'Setting date backward must NOT reset usage to 0');
  assert.equal(afterBackDay.clockTamperDetected, true);
  assert.equal(afterBackDay.usagePeriodKey, '2026-10-30_r00');
});

test('Phase 4.5.1 Part C & E: Web Crypto PBKDF2-SHA256 recovery code hashing + single-use recovery code invalidation', async () => {
  const gen1 = await generateParentRecoveryCodeAsync();
  const gen2 = await generateParentRecoveryCodeAsync();

  assert.match(gen1.recoveryCode, /^ILMZ-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  assert.ok(gen1.recoveryHash.startsWith('pbkdf2_sha256_v2$100000$'));

  const hashA = await hashRecoveryCodeAsync(gen1.recoveryCode);
  const hashB = await hashRecoveryCodeAsync(gen1.recoveryCode);
  assert.notEqual(hashA, hashB, 'Random 16-byte salt must produce unique hashes for identical inputs');
  assert.equal(await verifyRecoveryCodeHashAsync(gen1.recoveryCode, hashA), true);
  assert.equal(await verifyRecoveryCodeHashAsync(gen1.recoveryCode, hashB), true);
  assert.equal(await verifyRecoveryCodeHashAsync(gen2.recoveryCode, hashA), false);

  const legacyHash = hashRecoveryCode('ILMZ-ABCD-2345');
  assert.equal(await verifyRecoveryCodeHashAsync('ILMZ-ABCD-2345', legacyHash), true);

  const firstReset = await verifyRecoveryCodeAndResetPinAsync({
    enteredRecoveryCode: gen1.recoveryCode,
    storedRecoveryHash: gen1.recoveryHash,
    newPin: '8426',
  });
  assert.equal(firstReset.ok, true);
  assert.equal(firstReset.newPin, '8426');
  assert.ok(firstReset.nextPinVerifier?.startsWith('pin_pbkdf2_v2$100000$'));
  assert.equal(firstReset.nextRecoveryHash, undefined);
  assert.equal(firstReset.recoveryCodeInvalidated, true);

  const secondResetAttempt = await verifyRecoveryCodeAndResetPinAsync({
    enteredRecoveryCode: gen1.recoveryCode,
    storedRecoveryHash: firstReset.nextRecoveryHash,
    newPin: '9999',
  });
  assert.equal(secondResetAttempt.ok, false);
});

test('Phase 4.5.1 Part F: Remove plaintext PIN storage & default 1234 PIN across fresh state, DB, snapshots and backups', async () => {
  resetLocalDatabaseMemoryForTesting();

  const freshState = normalizePersistedMasterState(null);
  assert.equal(freshState.user.parentPin, undefined);
  assert.equal(freshState.user.parentPinVerifier, undefined);
  assert.equal(freshState.user.parentPinSetupCompleted, false);
  assert.equal(verifyParentPin('1234', freshState.user.parentPinVerifier), false);

  const migrated = normalizePersistedMasterState({
    user: {
      ...freshState.user,
      parentPin: '5924',
    },
  });
  assert.equal(migrated.user.parentPin, undefined);
  assert.ok(Boolean(migrated.user.parentPinVerifier));
  assert.equal(migrated.user.parentPinSetupCompleted, true);
  assert.equal(verifyParentPin('5924', migrated.user.parentPinVerifier), true);
  assert.equal(verifyParentPin('1234', migrated.user.parentPinVerifier), false);

  const pbkdf2PinVerifier = await createParentPinVerifierAsync('7391');
  assert.ok(pbkdf2PinVerifier.startsWith('pin_pbkdf2_v2$100000$'));
  assert.equal(await verifyParentPinAsync('7391', pbkdf2PinVerifier), true);
  assert.equal(await verifyParentPinAsync('0000', pbkdf2PinVerifier), false);

  const stateWithAccidentalPlainPin = {
    ...migrated,
    user: {
      ...migrated.user,
      parentPin: '5924',
      parentPinVerifier: createParentPinVerifierSync('5924'),
    },
  };
  await saveMasterStateToLocalDb(stateWithAccidentalPlainPin);
  await saveRecoverySnapshot('pre_import_latest', stateWithAccidentalPlainPin, 'test_snapshot');

  const hydrated = await hydrateOrMigrateMasterState(normalizePersistedMasterState);
  assert.equal(hydrated.state.user.parentPin, undefined);
  assert.equal(verifyParentPin('5924', hydrated.state.user.parentPinVerifier), true);

  const snapshot = await getRecoverySnapshot('pre_import_latest');
  assert.equal(snapshot?.state.user.parentPin, undefined);

  const serializedBackup = createBackupBundle(stateWithAccidentalPlainPin);
  const parsedBackup = JSON.parse(serializedBackup);
  assert.equal('parentPin' in parsedBackup.user, false);
  assert.equal(serializedBackup.includes('"parentPin"'), false);
  assert.ok(Boolean(parsedBackup.user.parentPinVerifier));
});

test('Phase 4.5.1 Part G: Hifz backup preserves multiple Ayah ranges within the same Surah', () => {
  const baseState = normalizePersistedMasterState(null);
  const planBaqarahOpening: HifzPlan = {
    surahNumber: 2,
    surahName: 'Al-Baqarah',
    totalAyahs: 286,
    memorizedAyahs: 5,
    startAyah: 1,
    endAyah: 5,
    ayahRange: '1-5',
    status: 'completed',
    memorizationState: 'mastered',
    lastPracticedAt: '2d ago',
    lastPracticedAtIso: '2026-10-28T08:00:00Z',
  };

  const planAyatulKursi: HifzPlan = {
    ...planBaqarahOpening,
    memorizedAyahs: 3,
    startAyah: 255,
    endAyah: 257,
    ayahRange: '255-257',
    status: 'in_progress',
    memorizationState: 'learning',
  };

  const planBaqarahEnding: HifzPlan = {
    ...planBaqarahOpening,
    memorizedAyahs: 2,
    startAyah: 285,
    endAyah: 286,
    ayahRange: '285-286',
    status: 'in_progress',
    memorizationState: 'revision_due',
  };

  const legacyPlanNoRange: HifzPlan = {
    surahNumber: 67,
    surahName: 'Al-Mulk',
    totalAyahs: 30,
    memorizedAyahs: 15,
    status: 'in_progress',
    lastPracticedAt: '1d ago',
  };

  assert.notEqual(
    getHifzPlanIdentityKey(planBaqarahOpening),
    getHifzPlanIdentityKey(planAyatulKursi)
  );

  const payload = {
    ...baseState,
    hifzPlans: [
      planBaqarahOpening,
      planAyatulKursi,
      { ...planAyatulKursi }, // exact duplicate
      planBaqarahEnding,
      legacyPlanNoRange,
    ],
  };

  const res = validateAndPreviewBackupJson(
    JSON.stringify(payload),
    normalizePersistedMasterState
  );
  assert.equal(res.valid, true);
  const resultingPlans = res.normalizedState?.hifzPlans ?? [];
  const surah2Plans = resultingPlans.filter((p) => p.surahNumber === 2);
  assert.equal(surah2Plans.length, 3, 'All 3 distinct Ayah ranges of Surah Al-Baqarah must be preserved');
  assert.ok(surah2Plans.some((p) => p.startAyah === 1 && p.endAyah === 5));
  assert.ok(surah2Plans.some((p) => p.startAyah === 255 && p.endAyah === 257));
  assert.ok(surah2Plans.some((p) => p.startAyah === 285 && p.endAyah === 286));
  assert.ok(resultingPlans.some((p) => p.surahNumber === 67));
});

test('Phase 4.5.1 Part H: Backup import rejects > 5 unique child profiles with explicit overflow error instead of silent truncation', () => {
  const baseState = normalizePersistedMasterState(null);
  const sixChildren = ['Ayaan', 'Zoya', 'Ibrahim', 'Maryam', 'Yusuf', 'Fatima'].map(
    (name, idx) =>
      createTestChild({
        id: `child_${idx + 1}`,
        name,
      })
  );

  const payloadWithSix = {
    ...baseState,
    childrenProfiles: sixChildren,
  };

  const res = validateAndPreviewBackupJson(
    JSON.stringify(payloadWithSix),
    normalizePersistedMasterState
  );
  assert.equal(res.valid, false, 'Import with > 5 child profiles must not silently truncate');
  assert.ok(
    res.errors.some((e) => e.includes('6 unique child profiles') && e.includes('Fatima')),
    'Error message must explicitly state the profile count and overflow child profile name'
  );
});

test('Phase 4.5.1 Part I: Duplicate star cleanup preserves legitimate earned stars unless provenDuplicateStarInflation is flagged', () => {
  const baseState = normalizePersistedMasterState(null);
  const payload = {
    ...baseState,
    learningEvents: [
      {
        id: 'ev_q1',
        type: 'surah_completed',
        mode: 'kids',
        childId: 'child_ayaan',
        referenceId: 'Surah Al-Ikhlas',
        title: 'Surah Al-Ikhlas',
        dateKey: '2026-10-30',
        timestampIso: '2026-10-30T09:00:00Z',
        value: 5,
      },
      {
        id: 'ev_q1_dup',
        type: 'surah_completed',
        mode: 'kids',
        childId: 'child_ayaan',
        referenceId: 'Surah Al-Ikhlas',
        title: 'Surah Al-Ikhlas',
        dateKey: '2026-10-30',
        timestampIso: '2026-10-30T09:01:00Z',
        value: 5,
      },
    ],
    childrenProfiles: [
      createTestChild({
        stars: 75,
        completedSurahs: ['Surah Al-Ikhlas', 'Al-Ikhlas'],
      }),
    ],
  };

  const res = validateAndPreviewBackupJson(
    JSON.stringify(payload),
    normalizePersistedMasterState
  );
  assert.equal(res.valid, true);
  assert.equal(res.normalizedState?.learningEvents.length, 1);
  assert.equal(res.normalizedState?.childrenProfiles[0].completedSurahs.length, 1);
  assert.equal(
    res.normalizedState?.childrenProfiles[0].stars,
    75,
    'Legitimate earned stars must NOT be reduced when deduplicating events or completedSurahs'
  );
});
