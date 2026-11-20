import {
  ChildProfile,
  ExpenseEntry,
  GoodDeedRecord,
  HifzPlan,
  ImportPreviewSummary,
  LearningEvent,
  NeedsPracticeItem,
  PersonalNote,
  QuizAttempt,
  QuranBookmark,
  RevisionItem,
  TaskItem,
  UserProfile,
} from '../types/ilmizo';
import {
  getChildCertificateAchievements,
  normalizeSurahCertificateTitle,
} from '../engines/kidsLearningEngines';
import { createParentPinVerifierSync } from '../engines/parentSafetyEngine';
import {
  getRecoverySnapshot,
  ILMIZO_DB_SCHEMA_VERSION,
  PersistedMasterState,
  saveMasterStateToLocalDb,
  saveRecoverySnapshot,
} from './localDatabase';

export const MAX_SUPPORTED_CHILD_PROFILES = 5;

export interface BackupValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  preview?: ImportPreviewSummary;
  normalizedState?: PersistedMasterState;
}

/**
 * Computes a stable identity key for a HifzPlan that distinguishes different Ayah ranges
 * within the same Surah while deduplicating identical plans and supporting legacy plans.
 */
export function getHifzPlanIdentityKey(plan: HifzPlan): string {
  const surahNum = Number(plan.surahNumber) || 0;
  const start =
    typeof plan.startAyah === 'number' && Number.isFinite(plan.startAyah) && plan.startAyah > 0
      ? Math.floor(plan.startAyah)
      : 1;
  const end =
    typeof plan.endAyah === 'number' && Number.isFinite(plan.endAyah) && plan.endAyah >= start
      ? Math.floor(plan.endAyah)
      : typeof plan.totalAyahs === 'number' && plan.totalAyahs >= start
      ? Math.floor(plan.totalAyahs)
      : start;
  const normalizedRangeLabel = (plan.ayahRange || '').trim().toLowerCase();
  return `${surahNum}:${start}-${end}:${normalizedRangeLabel}`;
}

function deduplicateByKey<T>(items: T[], getKey: (item: T) => string): { unique: T[]; duplicatesRemoved: number } {
  const seen = new Set<string>();
  const unique: T[] = [];
  let duplicatesRemoved = 0;

  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    const key = getKey(item);
    if (!key) continue;
    if (seen.has(key)) {
      duplicatesRemoved += 1;
      continue;
    }
    seen.add(key);
    unique.push(item);
  }

  return { unique, duplicatesRemoved };
}

function deduplicateStrings(items: string[], normalizeFn?: (s: string) => string): { unique: string[]; duplicatesRemoved: number } {
  const seen = new Set<string>();
  const unique: string[] = [];
  let duplicatesRemoved = 0;

  for (const raw of items) {
    if (typeof raw !== 'string') continue;
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const val = normalizeFn ? normalizeFn(trimmed) : trimmed;
    if (!val) continue;
    if (seen.has(val)) {
      duplicatesRemoved += 1;
      continue;
    }
    seen.add(val);
    unique.push(val);
  }

  return { unique, duplicatesRemoved };
}

export function createBackupBundle(state: PersistedMasterState): string {
  const exportedAt = new Date().toISOString();
  const salahDaysCount = Object.keys(state.salahRecords || {}).length;
  const childrenProfiles = state.childrenProfiles || [];
  const certificatesAndBadgesSummary = childrenProfiles.map((child) => {
    const normalizedSurahs = Array.isArray(child.completedSurahs)
      ? Array.from(new Set(child.completedSurahs.filter(Boolean).map(normalizeSurahCertificateTitle)))
      : [];
    const certificateAchievements = getChildCertificateAchievements(normalizedSurahs);
    return {
      childId: child.id,
      childName: child.name,
      stars: child.stars,
      activeMinutesToday: child.activeMinutesToday,
      activeSecondsToday:
        typeof child.activeSecondsToday === 'number'
          ? child.activeSecondsToday
          : Math.max(0, Math.round((child.activeMinutesToday || 0) * 60)),
      dailyGoalMinutes: child.dailyGoalMinutes,
      earnedBadgeIds: Array.isArray(child.earnedBadgeIds) ? child.earnedBadgeIds : [],
      completedSurahs: normalizedSurahs,
      certificateAchievements,
    };
  });

  const totalBadgesCount = certificatesAndBadgesSummary.reduce(
    (sum, c) => sum + c.earnedBadgeIds.length,
    0
  );
  const totalCertificatesCount = certificatesAndBadgesSummary.reduce(
    (sum, c) => sum + c.certificateAchievements.length,
    0
  );

  // Never export plaintext parentPin in backup files; export only non-plaintext parentPinVerifier
  const { parentPin: rawPlainPin, ...userWithoutPlainPin } = state.user || ({} as any);
  const resolvedVerifier =
    userWithoutPlainPin.parentPinVerifier ||
    (typeof rawPlainPin === 'string' && rawPlainPin.trim()
      ? createParentPinVerifierSync(rawPlainPin)
      : undefined);

  const bundle = {
    schemaVersion: ILMIZO_DB_SCHEMA_VERSION,
    exportedAt,
    app: 'Ilmizo Local-First Islamic Learning Platform',
    storageArchitecture: 'local_first_indexeddb_v2',
    cloudSyncStatus: 'DEFERRED_LOCAL_ONLY',
    backupNotice:
      'Manual local JSON backup file. Keep this file safe to restore your family progress across browsers or devices.',
    recordCounts: {
      childProfiles: childrenProfiles.length,
      bookmarks: (state.bookmarks || []).length,
      personalNotes: (state.personalNotes || []).length,
      hifzPlans: (state.hifzPlans || []).length,
      revisionItems: (state.revisionItems || []).length,
      salahDays: salahDaysCount,
      learningEvents: (state.learningEvents || []).length,
      quizAttempts: (state.quizAttempts || []).length,
      tasks: (state.tasks || []).length,
      expenses: (state.expenses || []).length,
      badgesEarned: totalBadgesCount,
      certificatesUnlocked: totalCertificatesCount,
    },
    parentSafetySettings: {
      kidsDailyResetHour: state.user?.kidsDailyResetHour ?? 0,
      hasRecoveryCodeConfigured: Boolean(state.user?.parentPinRecoveryHash),
      parentPinSetupCompleted: Boolean(
        state.user?.parentPinSetupCompleted || resolvedVerifier
      ),
      lastBackupExportedAtIso: exportedAt,
    },
    certificatesAndBadgesSummary,
    user: {
      ...userWithoutPlainPin,
      ...(resolvedVerifier
        ? { parentPinVerifier: resolvedVerifier, parentPinSetupCompleted: true }
        : {}),
      lastBackupExportedAtIso: exportedAt,
    },
    dailyVerseActivity: state.dailyVerseActivity,
    learningEvents: state.learningEvents,
    studiedNames99Numbers: state.studiedNames99Numbers,
    recentlyOpenedSurahs: state.recentlyOpenedSurahs,
    bookmarks: state.bookmarks,
    personalNotes: state.personalNotes,
    hifzPlans: state.hifzPlans,
    revisionItems: state.revisionItems,
    salahRecords: state.salahRecords,
    favoriteDuaIds: state.favoriteDuaIds,
    seerahMilestoneIds: state.seerahMilestoneIds,
    completedLessonIds: state.completedLessonIds,
    masteredVocabIds: state.masteredVocabIds,
    quizAttempts: state.quizAttempts,
    tasks: state.tasks,
    expenses: state.expenses,
    childrenProfiles,
    activeChildId: state.activeChildId,
  };

  return JSON.stringify(bundle, null, 2);
}

export function validateAndPreviewBackupJson(
  rawJson: string,
  normalizeStateFn: (raw: Partial<PersistedMasterState> | null) => PersistedMasterState,
  options?: { currentLocalUser?: UserProfile }
): BackupValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!rawJson || typeof rawJson !== 'string' || !rawJson.trim()) {
    return {
      valid: false,
      errors: ['Backup file is empty. Please select a valid Ilmizo JSON backup file.'],
      warnings: [],
    };
  }

  let parsed: any;
  try {
    parsed = JSON.parse(rawJson);
  } catch (err) {
    return {
      valid: false,
      errors: [
        `Invalid JSON format: ${err instanceof Error ? err.message : 'Unable to parse file.'}`,
      ],
      warnings: [],
    };
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return {
      valid: false,
      errors: ['Backup root must be a JSON object.'],
      warnings: [],
    };
  }

  // Verify it contains at least one recognizable Ilmizo domain property
  const recognizableKeys = [
    'user',
    'childrenProfiles',
    'bookmarks',
    'hifzPlans',
    'salahRecords',
    'learningEvents',
  ];
  const hasRecognizableKey = recognizableKeys.some((k) => k in parsed);
  if (!hasRecognizableKey) {
    return {
      valid: false,
      errors: [
        'Unrecognized JSON structure. Missing Ilmizo profile, Quran, Hifz, Salah, or Kids records.',
      ],
      warnings: [],
    };
  }

  // Check schemaVersion
  const rawVersion = typeof parsed.schemaVersion === 'number' ? parsed.schemaVersion : 1;
  if (rawVersion <= 0 || !Number.isInteger(rawVersion)) {
    return {
      valid: false,
      errors: [`Invalid schemaVersion (${String(parsed.schemaVersion)}). Expected a positive integer.`],
      warnings: [],
    };
  }
  if (rawVersion > ILMIZO_DB_SCHEMA_VERSION) {
    return {
      valid: false,
      errors: [
        `Unsupported future backup schemaVersion (${rawVersion}). Current app supports up to version ${ILMIZO_DB_SCHEMA_VERSION}.`,
      ],
      warnings: [],
    };
  }
  if (rawVersion < ILMIZO_DB_SCHEMA_VERSION) {
    warnings.push(
      `Legacy backup format (v${rawVersion}) detected — records will be automatically upgraded to Schema v${ILMIZO_DB_SCHEMA_VERSION}.`
    );
  }

  // Validate user object if present
  if (parsed.user !== undefined && (!parsed.user || typeof parsed.user !== 'object' || Array.isArray(parsed.user))) {
    errors.push('Invalid "user" profile field: expected an object.');
  }

  // Validate salahRecords if present
  if (
    parsed.salahRecords !== undefined &&
    (!parsed.salahRecords || typeof parsed.salahRecords !== 'object' || Array.isArray(parsed.salahRecords))
  ) {
    errors.push('Invalid "salahRecords" field: expected a date-keyed object.');
  }

  // Validate arrays if present
  const arrayFields = [
    'childrenProfiles',
    'bookmarks',
    'personalNotes',
    'hifzPlans',
    'revisionItems',
    'learningEvents',
    'quizAttempts',
    'tasks',
    'expenses',
  ] as const;

  for (const field of arrayFields) {
    if (parsed[field] !== undefined && !Array.isArray(parsed[field])) {
      errors.push(`Invalid "${field}" field: expected an array.`);
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors, warnings };
  }

  // Inspect raw children profiles before normalization to count duplicate entries accurately
  const rawChildrenInput: any[] = Array.isArray(parsed.childrenProfiles) ? parsed.childrenProfiles : [];
  const rawChildDuplicatesById = new Map<
    string,
    {
      surahsRemoved: number;
      storiesRemoved: number;
      badgesRemoved: number;
      deedsRemoved: number;
      provenDuplicateStarInflation: number;
    }
  >();

  for (const rawChild of rawChildrenInput) {
    if (!rawChild || typeof rawChild !== 'object' || typeof rawChild.id !== 'string') continue;
    const surahDedup = deduplicateStrings(
      Array.isArray(rawChild.completedSurahs) ? rawChild.completedSurahs : [],
      normalizeSurahCertificateTitle
    );
    const storyDedup = deduplicateStrings(
      Array.isArray(rawChild.completedStoryIds) ? rawChild.completedStoryIds : []
    );
    const badgeDedup = deduplicateStrings(
      Array.isArray(rawChild.earnedBadgeIds) ? rawChild.earnedBadgeIds : []
    );
    const deedDedup = deduplicateByKey<GoodDeedRecord>(
      Array.isArray(rawChild.goodDeeds) ? rawChild.goodDeeds : [],
      (d) => d.id || `${d.title}:${d.childReportedAt}`
    );
    const explicitProvenInflation =
      typeof rawChild.provenDuplicateStarInflation === 'number' &&
      rawChild.provenDuplicateStarInflation > 0
        ? Math.floor(rawChild.provenDuplicateStarInflation)
        : 0;

    rawChildDuplicatesById.set(rawChild.id, {
      surahsRemoved: surahDedup.duplicatesRemoved,
      storiesRemoved: storyDedup.duplicatesRemoved,
      badgesRemoved: badgeDedup.duplicatesRemoved,
      deedsRemoved: deedDedup.duplicatesRemoved,
      provenDuplicateStarInflation: explicitProvenInflation,
    });
  }

  // Normalize through the application's canonical normalizer
  const normalized = normalizeStateFn(parsed as Partial<PersistedMasterState>);
  let totalDuplicatesRemoved = 0;

  // Deduplicate child profiles by stable ID
  const dedupChildren = deduplicateByKey<ChildProfile>(
    normalized.childrenProfiles || [],
    (c) => c.id
  );
  if (dedupChildren.duplicatesRemoved > 0) {
    totalDuplicatesRemoved += dedupChildren.duplicatesRemoved;
    warnings.push(`Removed ${dedupChildren.duplicatesRemoved} duplicate child profile ID(s).`);
  }

  // Phase 4.5.1 Part H: Never silently truncate child profiles with .slice(0, 5)
  if (dedupChildren.unique.length > MAX_SUPPORTED_CHILD_PROFILES) {
    const allNames = dedupChildren.unique.map((c) => c.name || c.id).join(', ');
    const overflowNames = dedupChildren.unique
      .slice(MAX_SUPPORTED_CHILD_PROFILES)
      .map((c) => c.name || c.id)
      .join(', ');
    return {
      valid: false,
      errors: [
        `Backup contains ${dedupChildren.unique.length} unique child profiles (${allNames}), which exceeds the maximum limit of ${MAX_SUPPORTED_CHILD_PROFILES} profiles per family device. Affected overflow profile(s) that would be lost: ${overflowNames}. Import rejected to prevent silent child data truncation.`,
      ],
      warnings,
    };
  }

  const dedupBookmarks = deduplicateByKey<QuranBookmark>(
    normalized.bookmarks || [],
    (b) => `${b.surahNumber}:${b.ayahNumber}`
  );
  if (dedupBookmarks.duplicatesRemoved > 0) {
    totalDuplicatesRemoved += dedupBookmarks.duplicatesRemoved;
    warnings.push(`Removed ${dedupBookmarks.duplicatesRemoved} duplicate Quran bookmark(s).`);
  }
  normalized.bookmarks = dedupBookmarks.unique;

  const dedupNotes = deduplicateByKey<PersonalNote>(
    normalized.personalNotes || [],
    (n) => n.id
  );
  totalDuplicatesRemoved += dedupNotes.duplicatesRemoved;
  normalized.personalNotes = dedupNotes.unique;

  // Phase 4.5.1 Part G: Deduplicate Hifz plans by Surah + Ayah range identity so multiple ranges per Surah are preserved
  const dedupHifz = deduplicateByKey<HifzPlan>(
    normalized.hifzPlans || [],
    (p) => getHifzPlanIdentityKey(p)
  );
  if (dedupHifz.duplicatesRemoved > 0) {
    totalDuplicatesRemoved += dedupHifz.duplicatesRemoved;
    warnings.push(`Removed ${dedupHifz.duplicatesRemoved} identical duplicate Hifz plan(s).`);
  }
  normalized.hifzPlans = dedupHifz.unique;

  const dedupRevisions = deduplicateByKey<RevisionItem>(
    normalized.revisionItems || [],
    (r) => r.id
  );
  totalDuplicatesRemoved += dedupRevisions.duplicatesRemoved;
  normalized.revisionItems = dedupRevisions.unique;

  // Deduplicate learning events without subtracting legitimate child stars unless duplicate reward inflation is explicitly proven
  const provenInflatedStarsByChild = new Map<string, number>();
  const seenEventKeys = new Set<string>();
  const uniqueEvents: LearningEvent[] = [];
  let duplicateEventsRemoved = 0;

  for (const ev of normalized.learningEvents || []) {
    if (!ev || typeof ev !== 'object') continue;
    const key = `${ev.dateKey}:${ev.mode}:${ev.childId || 'adult'}:${ev.type}:${ev.referenceId}`;
    if (!key) continue;
    if (seenEventKeys.has(key)) {
      duplicateEventsRemoved += 1;
      if (
        ev.mode === 'kids' &&
        ev.childId &&
        (ev as any).provenDuplicateStarInflation === true &&
        typeof ev.value === 'number' &&
        ev.value > 0
      ) {
        provenInflatedStarsByChild.set(
          ev.childId,
          (provenInflatedStarsByChild.get(ev.childId) || 0) + ev.value
        );
      }
      continue;
    }
    seenEventKeys.add(key);
    uniqueEvents.push(ev);
  }

  if (duplicateEventsRemoved > 0) {
    totalDuplicatesRemoved += duplicateEventsRemoved;
    warnings.push(
      `Deduplicated ${duplicateEventsRemoved} repeated learning event(s); preserved legitimate star balances.`
    );
  }
  normalized.learningEvents = uniqueEvents;

  // Clean each child profile's sub-collections while preserving legitimate earned stars
  normalized.childrenProfiles = dedupChildren.unique.map((child) => {
    const rawChildDups = rawChildDuplicatesById.get(child.id) || {
      surahsRemoved: 0,
      storiesRemoved: 0,
      badgesRemoved: 0,
      deedsRemoved: 0,
      provenDuplicateStarInflation: 0,
    };

    const dedupSurahs = deduplicateStrings(
      Array.isArray(child.completedSurahs) ? child.completedSurahs : [],
      normalizeSurahCertificateTitle
    );
    const dedupStories = deduplicateStrings(
      Array.isArray(child.completedStoryIds) ? child.completedStoryIds : []
    );
    const dedupBadges = deduplicateStrings(
      Array.isArray(child.earnedBadgeIds) ? child.earnedBadgeIds : []
    );
    const dedupDeeds = deduplicateByKey<GoodDeedRecord>(
      Array.isArray(child.goodDeeds) ? child.goodDeeds : [],
      (d) => d.id || `${d.title}:${d.childReportedAt}`
    );
    const dedupPractice = deduplicateByKey<NeedsPracticeItem>(
      Array.isArray(child.needsPractice) ? child.needsPractice : [],
      (np) => np.id || `${np.pillar}:${np.title}`
    );

    const surahsRemoved = Math.max(rawChildDups.surahsRemoved, dedupSurahs.duplicatesRemoved);
    const storiesRemoved = Math.max(rawChildDups.storiesRemoved, dedupStories.duplicatesRemoved);
    const badgesRemoved = Math.max(rawChildDups.badgesRemoved, dedupBadges.duplicatesRemoved);
    const deedsRemoved = Math.max(rawChildDups.deedsRemoved, dedupDeeds.duplicatesRemoved);

    const childDupsCount =
      surahsRemoved + storiesRemoved + badgesRemoved + deedsRemoved + dedupPractice.duplicatesRemoved;
    if (childDupsCount > 0) {
      totalDuplicatesRemoved += childDupsCount;
      warnings.push(
        `Cleaned ${childDupsCount} duplicate achievement/activity record(s) for ${child.name}; preserved legitimate star balances.`
      );
    }

    const provenInflation =
      (provenInflatedStarsByChild.get(child.id) || 0) +
      rawChildDups.provenDuplicateStarInflation;

    const adjustedStars =
      provenInflation > 0
        ? Math.max(0, child.stars - provenInflation)
        : Math.max(0, child.stars);

    if (provenInflation > 0) {
      warnings.push(
        `Adjusted ${child.name}'s stars by -${provenInflation} due to proven duplicate reward inflation.`
      );
    }

    return {
      ...child,
      stars: adjustedStars,
      completedSurahs: dedupSurahs.unique,
      completedStoryIds: dedupStories.unique,
      earnedBadgeIds: dedupBadges.unique,
      goodDeeds: dedupDeeds.unique,
      needsPractice: dedupPractice.unique,
    };
  });

  const dedupQuizzes = deduplicateByKey<QuizAttempt>(
    normalized.quizAttempts || [],
    (q) => q.id
  );
  totalDuplicatesRemoved += dedupQuizzes.duplicatesRemoved;
  normalized.quizAttempts = dedupQuizzes.unique;

  const dedupTasks = deduplicateByKey<TaskItem>(normalized.tasks || [], (t) => t.id);
  totalDuplicatesRemoved += dedupTasks.duplicatesRemoved;
  normalized.tasks = dedupTasks.unique;

  const dedupExpenses = deduplicateByKey<ExpenseEntry>(
    normalized.expenses || [],
    (ex) => ex.id
  );
  totalDuplicatesRemoved += dedupExpenses.duplicatesRemoved;
  normalized.expenses = dedupExpenses.unique;

  // Ensure activeChildId points to a valid child profile
  if (
    normalized.childrenProfiles.length > 0 &&
    !normalized.childrenProfiles.some((c) => c.id === normalized.activeChildId)
  ) {
    normalized.activeChildId = normalized.childrenProfiles[0].id;
  }

  // Strip untrusted subscription/trial elevation from imported backups
  const rawUserClaimedPaid =
    Boolean(parsed.user?.entitlement && parsed.user.entitlement !== 'free') ||
    Boolean(parsed.user?.trialEndsAtIso || parsed.user?.trialStartedAtIso);

  if (options?.currentLocalUser) {
    normalized.user = {
      ...normalized.user,
      entitlement: options.currentLocalUser.entitlement,
      subscriptionPurchaseSource: options.currentLocalUser.subscriptionPurchaseSource,
      subscriptionSku: options.currentLocalUser.subscriptionSku,
      subscriptionOrderId: options.currentLocalUser.subscriptionOrderId,
      subscriptionUpdatedAtIso: options.currentLocalUser.subscriptionUpdatedAtIso,
      subscriptionLastVerifiedAtIso: options.currentLocalUser.subscriptionLastVerifiedAtIso,
      subscriptionProofToken: options.currentLocalUser.subscriptionProofToken,
      subscriptionAutoRenewing: options.currentLocalUser.subscriptionAutoRenewing,
      trialStartedAtIso: options.currentLocalUser.trialStartedAtIso,
      trialEndsAtIso: options.currentLocalUser.trialEndsAtIso,
    };
  } else {
    normalized.user = {
      ...normalized.user,
      entitlement: 'free',
      subscriptionPurchaseSource: 'none',
      subscriptionSku: undefined,
      subscriptionOrderId: undefined,
      subscriptionLastVerifiedAtIso: undefined,
      subscriptionProofToken: undefined,
      subscriptionAutoRenewing: false,
      trialStartedAtIso: undefined,
      trialEndsAtIso: undefined,
    };
  }

  if (rawUserClaimedPaid) {
    warnings.push(
      'Subscription & trial entitlements are Play Store / device-verified and are never elevated from backup files.'
    );
  }

  const totalBadgesCount = normalized.childrenProfiles.reduce(
    (sum, c) => sum + (Array.isArray(c.earnedBadgeIds) ? c.earnedBadgeIds.length : 0),
    0
  );
  const totalCertificatesCount = normalized.childrenProfiles.reduce(
    (sum, c) => sum + getChildCertificateAchievements(c.completedSurahs).length,
    0
  );

  const preview: ImportPreviewSummary = {
    schemaVersion: rawVersion,
    exportedAt: typeof parsed.exportedAt === 'string' ? parsed.exportedAt : 'Unknown timestamp',
    storageArchitecture:
      typeof parsed.storageArchitecture === 'string'
        ? parsed.storageArchitecture
        : typeof parsed.storageMode === 'string'
        ? parsed.storageMode
        : 'local_device_storage',
    adultProfileName: normalized.user.name || 'Aqib',
    adultCity: normalized.user.city || 'Jamshedpur',
    childProfilesCount: normalized.childrenProfiles.length,
    childNames: normalized.childrenProfiles.map((c) => `${c.name} (${c.stars} ★)`),
    bookmarksCount: normalized.bookmarks.length,
    personalNotesCount: normalized.personalNotes.length,
    hifzPlansCount: normalized.hifzPlans.length,
    revisionItemsCount: normalized.revisionItems.length,
    salahDaysCount: Object.keys(normalized.salahRecords || {}).length,
    learningEventsCount: normalized.learningEvents.length,
    quizAttemptsCount: normalized.quizAttempts.length,
    tasksCount: normalized.tasks.length,
    expensesCount: normalized.expenses.length,
    certificatesCount: totalCertificatesCount,
    badgesCount: totalBadgesCount,
    duplicatesRemovedCount: totalDuplicatesRemoved,
    warnings,
  };

  return {
    valid: true,
    errors: [],
    warnings,
    preview,
    normalizedState: normalized,
  };
}

export async function applyValidatedImportWithRecovery(
  validatedState: PersistedMasterState,
  currentState: PersistedMasterState
): Promise<{
  ok: boolean;
  error?: string;
  recoveryCreatedAtIso?: string;
  appliedState?: PersistedMasterState;
}> {
  // 1. Save Pre-Import Recovery Snapshot first
  const snapshotRes = await saveRecoverySnapshot(
    'pre_import_latest',
    currentState,
    'Automatic recovery snapshot created prior to JSON backup import'
  );
  if (!snapshotRes.ok) {
    return {
      ok: false,
      error:
        snapshotRes.error ||
        'Could not create a pre-import recovery snapshot. Import aborted to protect existing data.',
    };
  }

  // Always preserve verified local subscription & trial fields across backup restores
  const safeStateToApply: PersistedMasterState = {
    ...validatedState,
    user: {
      ...validatedState.user,
      entitlement: currentState.user?.entitlement || 'free',
      subscriptionPurchaseSource: currentState.user?.subscriptionPurchaseSource || 'none',
      subscriptionSku: currentState.user?.subscriptionSku,
      subscriptionOrderId: currentState.user?.subscriptionOrderId,
      subscriptionUpdatedAtIso: currentState.user?.subscriptionUpdatedAtIso,
      subscriptionLastVerifiedAtIso: currentState.user?.subscriptionLastVerifiedAtIso,
      subscriptionProofToken: currentState.user?.subscriptionProofToken,
      subscriptionAutoRenewing: currentState.user?.subscriptionAutoRenewing,
      trialStartedAtIso: currentState.user?.trialStartedAtIso,
      trialEndsAtIso: currentState.user?.trialEndsAtIso,
    },
  };

  // 2. Write the sanitized validated state into local database
  const writeRes = await saveMasterStateToLocalDb(safeStateToApply);
  if (!writeRes.ok) {
    return {
      ok: false,
      error: writeRes.error || 'Failed to write imported backup to local storage.',
    };
  }

  const snap = await getRecoverySnapshot('pre_import_latest');
  return {
    ok: true,
    recoveryCreatedAtIso: snap?.createdAtIso,
    appliedState: safeStateToApply,
  };
}

export async function restorePreImportRecoverySnapshot(
  normalizeStateFn: (raw: Partial<PersistedMasterState> | null) => PersistedMasterState
): Promise<{ ok: boolean; restoredState?: PersistedMasterState; error?: string }> {
  const snap = await getRecoverySnapshot('pre_import_latest');
  if (!snap || !snap.state) {
    return {
      ok: false,
      error: 'No pre-import recovery snapshot found on this device.',
    };
  }

  const normalized = normalizeStateFn(snap.state);
  const saveRes = await saveMasterStateToLocalDb(normalized);
  if (!saveRes.ok) {
    return {
      ok: false,
      error: saveRes.error || 'Failed to restore recovery snapshot.',
    };
  }

  return {
    ok: true,
    restoredState: normalized,
  };
}
