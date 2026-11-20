import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  AdultRoute,
  AppMode,
  ChildProfile,
  DailyVerseActivity,
  ExpenseEntry,
  HifzPlan,
  KidsRoute,
  LanguageCode,
  LearningEvent,
  LearningEventType,
  LocalStorageMetrics,
  MadhhabCode,
  PersonalNote,
  PrayerName,
  PrayerStatus,
  QuizAttempt,
  QuranBookmark,
  RevisionItem,
  SalahDayRecord,
  TaskItem,
  ThemeMode,
  UserProfile,
} from '../types/ilmizo';
import {
  applyThemeToDocument,
  getSystemPrefersDark,
  loadThemeMode,
  ResolvedTheme,
  resolveThemeMode,
  saveThemeMode,
  subscribeSystemThemeChanges,
} from '../services/themeService';
import {
  computeSalahStatsWithExcusedBridge,
  markDayAsExcused,
} from '../data/salahCompleteGuide';
import {
  LanguageOption,
  TranslationDictionary,
  TranslationKey,
  translationService,
} from '../data/i18n';
import {
  ALL_114_SURAHS,
  downloadSurahForOfflineUse,
  removeDownloadedOfflineSurah,
} from '../data/quranData';
import {
  getLocalDateKey,
  recordDailyVerseRead,
} from '../components/adult/AdultDesignSystem';
import {
  applyChildQuestCompletion,
  applyChildStoryCompletion,
  ensureChildDailyRollover,
  evaluateChildBadgesAndMilestones,
  normalizeSurahCertificateTitle,
} from '../engines/kidsLearningEngines';
import {
  appendLearningEvent,
  computeLearningStreak,
  createEmptySalahDayRecord,
  deriveHifzPlanState,
  parseHifzAyahRange,
  refreshRevisionQueueDueStatuses,
  scheduleHifzRevision,
} from '../engines/adultLearningEngines';
import {
  verifyAndRedeemParentTimeVoucher,
} from '../services/familySyncEngine';
import {
  canNavigateBack,
  INITIAL_NAVIGATION_HISTORY_STATE,
  NavigationHistoryState,
  popNavigationHistory,
  pushAdultRoute,
  pushKidsRoute,
  transitionMode,
} from '../engines/navigationHistoryEngine';
import { audioManager } from '../services/audioManager';
import {
  clearNonDownloadedApiCache,
  computeLocalStorageMetrics,
  hydrateOrMigrateMasterState,
  ILMIZO_DB_SCHEMA_VERSION,
  LEGACY_MASTER_STORAGE_KEY,
  PersistedMasterState,
  readLegacyMasterStateSync,
  requestPersistentLocalStorage,
  saveMasterStateToLocalDb,
} from '../services/localDatabase';
import { reconcileGooglePlayEntitlements } from '../services/subscriptionEngine';
import {
  applyValidatedImportWithRecovery,
  BackupValidationResult,
  createBackupBundle,
  restorePreImportRecoverySnapshot,
  validateAndPreviewBackupJson,
} from '../services/backupRestoreEngine';
import {
  accumulateKidsForegroundUsage,
  createParentPinVerifierAsync,
  createParentPinVerifierSync,
  ensureChildUsagePeriodRollover,
  generateParentRecoveryCode,
  generateParentRecoveryCodeAsync,
  isChildScreenTimeLimitReached,
  isValidParentPinFormat,
  unlockChildScreenTimeWithPin,
  verifyParentPin,
  verifyParentPinAsync,
  verifyRecoveryCodeAndResetPin,
  verifyRecoveryCodeAndResetPinAsync,
} from '../engines/parentSafetyEngine';

export interface PendingParentPinSetup {
  recoveryCode: string;
  recoveryHash: string;
  pinVerifier: string;
  mode: 'initial_setup' | 'change_pin' | 'regenerate_recovery';
}

interface IlmizoContextValue {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  adultRoute: AdultRoute;
  setAdultRoute: (route: AdultRoute) => void;
  kidsRoute: KidsRoute;
  setKidsRoute: (route: KidsRoute) => void;
  adultHistory: AdultRoute[];
  kidsHistory: KidsRoute[];
  canGoBack: boolean;
  goBack: () => void;
  registerSubScreenBackHandler: (handler: (() => boolean) | null) => void;
  parentHubUnlocked: boolean;
  setParentHubUnlocked: (unlocked: boolean) => void;
  selectedSurahNumber: number;
  openSurahForReading: (surahNumber: number, ayahNumber?: number) => void;
  dailyVerseActivity: DailyVerseActivity;
  recordVerseRead: (surahNumber: number, ayahNumber: number) => void;
  learningEvents: LearningEvent[];
  logLearningEvent: (
    type: LearningEventType,
    referenceId: string,
    title: string,
    mode?: 'adult' | 'kids',
    childId?: string,
    value?: number
  ) => void;
  studiedNames99Numbers: number[];
  markName99Studied: (nameNumber: number, transliteration: string) => void;
  recentlyOpenedSurahs: number[];
  user: UserProfile;
  updateUser: (patch: Partial<UserProfile>) => void;
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setThemeMode: (mode: ThemeMode) => void;
  autoPlayRecitation: boolean;
  toggleAutoPlayRecitation: () => void;
  isAudioMuted: boolean;
  toggleAudioMute: () => void;
  setLanguage: (lang: LanguageCode) => void;
  languageMeta: LanguageOption;
  uiLabels: TranslationDictionary;
  translate: (key: TranslationKey, params?: Record<string, string | number>) => string;
  resolveText: (content: Partial<Record<LanguageCode, string>> | undefined, fallback?: string) => string;
  bookmarks: QuranBookmark[];
  toggleBookmark: (bm: Omit<QuranBookmark, 'id' | 'createdAt'>) => void;
  updateBookmarkMeta: (
    bookmarkId: string,
    patch: Partial<Pick<QuranBookmark, 'note' | 'folder' | 'customLabel' | 'readingList'>>
  ) => void;
  personalNotes: PersonalNote[];
  addPersonalNote: (
    title: string,
    body: string,
    surahReference?: string,
    surahNumber?: number,
    ayahNumber?: number,
    extra?: {
      tags?: string[];
      tadabburPrompt?: string;
      noteType?: 'note' | 'tadabbur' | 'hifz_note';
    }
  ) => void;
  editPersonalNote: (
    noteId: string,
    patch: Partial<Pick<PersonalNote, 'title' | 'body' | 'surahReference' | 'surahNumber' | 'ayahNumber' | 'tags' | 'tadabburPrompt' | 'noteType'>>
  ) => void;
  deletePersonalNote: (noteId: string) => void;
  hifzPlans: HifzPlan[];
  updateHifzProgress: (surahNumber: number, memorizedAyahs: number) => void;
  addHifzPlan: (surahNumber: number, dailyTargetAyahs: number, ayahRange?: string) => void;
  resetHifzPlan: (surahNumber: number) => void;
  canUndoHifz: boolean;
  undoLastHifzAction: () => void;
  revisionItems: RevisionItem[];
  recordRevisionAttempt: (id: string, quality: 'Fluent' | 'Good' | 'Needs Work') => void;
  salahRecords: Record<string, SalahDayRecord>;
  togglePrayerStatus: (date: string, prayer: PrayerName) => void;
  setPrayerStatusExplicit: (date: string, prayer: PrayerName, status: PrayerStatus) => void;
  toggleExcusedSalahDay: (dateKey: string, excused: boolean, note?: string) => void;
  salahAnalytics: ReturnType<typeof computeSalahStatsWithExcusedBridge>;
  setUserMadhhab: (madhhab: MadhhabCode) => void;
  toggleExcusedPrayerMode: () => void;
  favoriteDuaIds: string[];
  toggleFavoriteDua: (duaId: string) => void;
  seerahMilestoneIds: string[];
  toggleSeerahMilestone: (eventId: string) => void;
  completedLessonIds: string[];
  markLessonCompleted: (lessonId: string) => void;
  masteredVocabIds: string[];
  toggleVocabMastered: (vocabId: string) => void;
  quizAttempts: QuizAttempt[];
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => void;
  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, 'id' | 'completed'>) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  expenses: ExpenseEntry[];
  addExpense: (entry: Omit<ExpenseEntry, 'id'>) => void;
  deleteExpense: (id: string) => void;
  childrenProfiles: ChildProfile[];
  activeChildId: string;
  activeChild: ChildProfile;
  setActiveChildId: (id: string) => void;
  addChildProfile: (name: string, age: number, avatar: 'Ayaan' | 'Ayla' | 'Mizo', dailyGoalMinutes?: number) => void;
  updateChildProfile: (childId: string, patch: Partial<ChildProfile>) => void;
  deleteChildProfile: (childId: string) => void;
  completeKidsQuestStep: (
    step: 'quran' | 'dua' | 'quiz' | 'salah' | 'family',
    title: string,
    completedSurahTitle?: string
  ) => void;
  completeKidsStory: (
    storyId: string,
    storyTitle: string
  ) => { starsAwarded: number; alreadyCompleted: boolean };
  completeQaidaLesson: (
    lessonId: string,
    lessonTitle: string,
    starsReward?: number,
    quizScorePct?: number
  ) => { starsAwarded: number; alreadyCompleted: boolean };
  addNeedsPracticeItem: (pillar: 'quran' | 'duas' | 'salah' | 'akhlaq', title: string, prompt: string, targetRoute: KidsRoute) => void;
  resolveNeedsPracticeItem: (itemId: string) => void;
  submitKidsGoodDeed: (title: string, description: string) => void;
  confirmChildGoodDeed: (childId: string, deedId: string) => void;
  incrementTasbih: () => void;
  resetTasbih: () => void;
  setActiveDhikr: (idx: number) => void;
  exportAllDataJson: () => string;
  isKidsScreenTimeLocked: boolean;
  isParentPinConfigured: boolean;
  verifyEnteredParentPin: (enteredPin: string) => Promise<boolean>;
  unlockKidsScreenTime: (
    pin: string,
    action: 'grant_10m' | 'grant_15m' | 'unlock_today'
  ) => { ok: boolean; error?: string };
  unlockKidsScreenTimeAsync: (
    pin: string,
    action: 'grant_10m' | 'grant_15m' | 'unlock_today'
  ) => Promise<{ ok: boolean; error?: string }>;
  redeemParentTimeVoucherAsync: (
    voucherCode: string
  ) => Promise<{ ok: boolean; action?: 'grant_10m' | 'grant_15m' | 'unlock_today'; error?: string }>;
  pendingPinSetup: PendingParentPinSetup | null;
  beginParentPinSetup: (
    currentPin: string,
    newPin: string
  ) => Promise<{ ok: boolean; error?: string; recoveryCode?: string }>;
  beginRecoveryCodeRegeneration: (
    currentPin: string
  ) => Promise<{ ok: boolean; error?: string; recoveryCode?: string }>;
  confirmPendingParentPinSetup: () => { ok: boolean; error?: string };
  cancelPendingParentPinSetup: () => void;
  setupParentPinWithRecovery: (
    currentPin: string,
    newPin: string
  ) => { ok: boolean; error?: string; recoveryCode?: string };
  generateNewRecoveryCodeForCurrentPin: (
    currentPin: string
  ) => { ok: boolean; error?: string; recoveryCode?: string };
  resetParentPinWithRecoveryCode: (
    recoveryCode: string,
    newPin: string
  ) => { ok: boolean; error?: string };
  resetParentPinWithRecoveryCodeAsync: (
    recoveryCode: string,
    newPin: string
  ) => Promise<{ ok: boolean; error?: string }>;
  storageMetrics: LocalStorageMetrics;
  refreshStorageMetrics: () => Promise<void>;
  downloadSurahOffline: (surahNumber: number) => Promise<{ ok: boolean; error?: string }>;
  deleteOfflineSurah: (surahNumber: number) => Promise<void>;
  clearCachedOnlineData: () => Promise<{ clearedSurahs: number; clearedPrayerCaches: number }>;
  previewBackupImport: (rawJson: string) => BackupValidationResult;
  applyBackupImport: (
    rawJson: string
  ) => Promise<{ ok: boolean; error?: string; recoveryCreatedAtIso?: string }>;
  restorePreImportBackup: () => Promise<{ ok: boolean; error?: string }>;
}

const STORAGE_KEY = LEGACY_MASTER_STORAGE_KEY;

const getTodayKey = () => getLocalDateKey();

function readSavedField<T>(key: keyof PersistedMasterState, fallback: T): T {
  try {
    const parsed = readLegacyMasterStateSync();
    if (parsed && parsed[key] !== undefined && parsed[key] !== null) {
      return parsed[key] as T;
    }
  } catch {
    // Ignore malformed storage and return fallback safely
  }
  return fallback;
}

const INITIAL_USER: UserProfile = {
  name: 'Aqib',
  city: 'Jamshedpur',
  country: 'India',
  language: 'en',
  darkMode: false,
  themeMode: 'light',
  arabicFontScale: 2,
  parentPin: undefined,
  parentPinVerifier: undefined,
  parentPinSetupCompleted: false,
  entitlement: 'free',
  subscriptionPurchaseSource: 'none',
  streakDays: 14,
  lastRead: {
    surahNumber: 2,
    surahName: 'Al-Baqarah',
    ayahNumber: 255,
  },
  tasbihCount: 33,
  tasbihTarget: 33,
  tasbihTotal: 1420,
  activeDhikrIndex: 0,
  autoPlayRecitation: false,
  isMuted: false,
  reciterName: 'Mishary Rashid Alafasy',
};

const INITIAL_CHILDREN: ChildProfile[] = [
  {
    id: 'child_ayaan',
    name: 'Ayaan',
    age: 8,
    avatar: 'Ayaan',
    dailyGoalMinutes: 10,
    activeMinutesToday: 8,
    stars: 45,
    streakDays: 7,
    questStepsCompleted: {
      quran: true,
      dua: true,
      quiz: true,
      salah: false,
      family: false,
    },
    pillarProgress: {
      quranLessons: 12,
      duasPracticed: 8,
      salahLessons: 5,
      akhlaqDeeds: 6,
    },
    unlockedAdventureNode: 6,
    needsPractice: [
      {
        id: 'np_1',
        pillar: 'quran',
        title: 'Surah Al-Ikhlas — Ayah 4',
        prompt: 'You had a small pause on "Wa lam yakul-lahu kufuwan ahad". Let’s practice this one more time!',
        arabic: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ',
        transliteration: 'Wa lam yakul-lahu kufuwan ahad',
        targetRoute: 'recitation_practice',
        mistakeCount: 1,
        lastAttemptAt: 'Today',
        resolved: false,
      },
    ],
    goodDeeds: [
      {
        id: 'gd_1',
        title: 'Helped set the table for family meal',
        description: 'Arranged plates and water glasses before Maghrib without being asked.',
        childReportedAt: 'Today, 6:05 PM',
        parentConfirmed: true,
      },
      {
        id: 'gd_2',
        title: 'Shared toys with younger sister',
        description: 'Shared building blocks and read a Prophet story together.',
        childReportedAt: 'Today, 4:30 PM',
        parentConfirmed: false,
      },
    ],
    earnedBadgeIds: ['badge_quran', 'badge_dua', 'badge_salah', 'badge_kind', 'badge_5surahs', 'badge_30day'],
    completedSurahs: ['Surah Al-Fatiha', 'Surah Al-Ikhlas', 'Surah Al-Kawthar', 'Surah Al-Asr', 'Surah An-Nas'],
    recentActivities: [
      { id: 'ra_1', title: 'Surah Al-Ikhlas', pillar: 'quran', timestamp: 'Today' },
      { id: 'ra_2', title: 'Dua Before Eating', pillar: 'duas', timestamp: 'Today' },
      { id: 'ra_3', title: 'Salah - Niyyah', pillar: 'salah', timestamp: 'Yesterday' },
      { id: 'ra_4', title: 'Family Challenge', pillar: 'family', timestamp: '2 days ago' },
    ],
  },
];

const INITIAL_HIFZ: HifzPlan[] = [
  { surahNumber: 1, surahName: 'Al-Fatiha', totalAyahs: 7, memorizedAyahs: 7, lastPracticedAt: 'Today', status: 'completed', dailyTargetAyahs: 3 },
  { surahNumber: 2, surahName: 'Al-Baqarah', totalAyahs: 286, memorizedAyahs: 12, lastPracticedAt: 'Today', status: 'in_progress', dailyTargetAyahs: 5 },
  { surahNumber: 3, surahName: 'Aal-Imran', totalAyahs: 200, memorizedAyahs: 0, lastPracticedAt: 'Not started', status: 'not_started', dailyTargetAyahs: 5 },
  { surahNumber: 4, surahName: 'An-Nisa', totalAyahs: 176, memorizedAyahs: 0, lastPracticedAt: 'Not started', status: 'not_started', dailyTargetAyahs: 5 },
  { surahNumber: 67, surahName: 'Al-Mulk', totalAyahs: 30, memorizedAyahs: 30, lastPracticedAt: 'Yesterday', status: 'completed', dailyTargetAyahs: 5 },
  { surahNumber: 103, surahName: 'Al-Asr', totalAyahs: 3, memorizedAyahs: 3, lastPracticedAt: '2 days ago', status: 'completed', dailyTargetAyahs: 3 },
  { surahNumber: 108, surahName: 'Al-Kawthar', totalAyahs: 3, memorizedAyahs: 3, lastPracticedAt: '3 days ago', status: 'completed', dailyTargetAyahs: 3 },
  { surahNumber: 109, surahName: 'Al-Kafirun', totalAyahs: 6, memorizedAyahs: 6, lastPracticedAt: '4 days ago', status: 'completed', dailyTargetAyahs: 3 },
  { surahNumber: 110, surahName: 'An-Nasr', totalAyahs: 3, memorizedAyahs: 3, lastPracticedAt: '4 days ago', status: 'completed', dailyTargetAyahs: 3 },
  { surahNumber: 112, surahName: 'Al-Ikhlas', totalAyahs: 4, memorizedAyahs: 4, lastPracticedAt: 'Today', status: 'completed', dailyTargetAyahs: 4 },
  { surahNumber: 113, surahName: 'Al-Falaq', totalAyahs: 5, memorizedAyahs: 5, lastPracticedAt: 'Yesterday', status: 'completed', dailyTargetAyahs: 5 },
  { surahNumber: 114, surahName: 'An-Nas', totalAyahs: 6, memorizedAyahs: 6, lastPracticedAt: 'Yesterday', status: 'completed', dailyTargetAyahs: 6 },
];

const INITIAL_REVISIONS: RevisionItem[] = [
  {
    id: 'rev_1',
    surahNumber: 2,
    surahName: 'Al-Baqarah',
    ayahRange: 'Ayah 255 (Ayat al-Kursi)',
    dueStatus: 'due_today',
    dueDate: 'Due Today',
    intervalDays: 3,
    difficulty: 'medium',
    attemptsCount: 6,
    lastSelfReport: 'Good',
  },
  {
    id: 'rev_2',
    surahNumber: 67,
    surahName: 'Al-Mulk',
    ayahRange: 'Ayahs 1 – 10',
    dueStatus: 'overdue',
    dueDate: 'Overdue by 1 day',
    intervalDays: 7,
    difficulty: 'hard',
    attemptsCount: 4,
    lastSelfReport: 'Needs Work',
  },
  {
    id: 'rev_3',
    surahNumber: 112,
    surahName: 'Al-Ikhlas',
    ayahRange: 'Ayahs 1 – 4',
    dueStatus: 'upcoming',
    dueDate: 'In 3 days',
    intervalDays: 14,
    difficulty: 'easy',
    attemptsCount: 12,
    lastSelfReport: 'Fluent',
  },
];

const INITIAL_TASKS: TaskItem[] = [
  { id: 't1', title: 'Read 10 Ayahs of Surah Al-Baqarah with reflection', category: 'Deen', prayerAnchor: 'Fajr', priority: 'high', completed: true, dueDate: getTodayKey() },
  { id: 't2', title: 'Listen to Ayaan’s Surah Al-Ikhlas recitation', category: 'Family', prayerAnchor: 'Maghrib', priority: 'high', completed: false, dueDate: getTodayKey() },
  { id: 't3', title: 'Set aside monthly Sadaqah for local food bank', category: 'Deen', prayerAnchor: 'Dhuhr', priority: 'medium', completed: false, dueDate: getTodayKey() },
  { id: 't4', title: 'Purchase groceries and fruit for family dinner', category: 'Personal', prayerAnchor: 'Asr', priority: 'medium', completed: true, dueDate: getTodayKey() },
];

const INITIAL_EXPENSES: ExpenseEntry[] = [
  { id: 'ex1', title: 'Monthly Salary / Halal Income', amount: 85000, type: 'income', category: 'Salary', date: getTodayKey(), note: 'Alhamdulillah' },
  { id: 'ex2', title: 'Friday Mosque & Orphanage Sadaqah', amount: 2500, type: 'sadaqah', category: 'Sadaqah', date: getTodayKey(), note: 'Secret charity' },
  { id: 'ex3', title: 'Annual Zakat Installment', amount: 5000, type: 'zakat', category: 'Zakat', date: getTodayKey(), note: '2.5% Nisab allocation' },
  { id: 'ex4', title: 'Family Groceries & Halal Provisions', amount: 6400, type: 'expense', category: 'Food', date: getTodayKey() },
  { id: 'ex5', title: 'Children Islamic Books & Stationery', amount: 1200, type: 'expense', category: 'Education', date: getTodayKey() },
];

const INITIAL_NOTES: PersonalNote[] = [
  {
    id: 'note_1',
    title: 'Reflection on Ayat al-Kursi (2:255)',
    body: 'Allah is Al-Hayy (The Ever-Living) and Al-Qayyum (The Sustainer of all existence). Reciting this after every obligatory prayer brings peace and protection.',
    surahReference: 'Al-Baqarah 2:255',
    createdAt: '2026-10-26',
  },
];

const INITIAL_BOOKMARKS: QuranBookmark[] = [
  {
    id: 'bm_1',
    surahNumber: 2,
    surahName: 'Al-Baqarah',
    ayahNumber: 255,
    arabicSnippet: 'ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ',
    note: 'Recite after every Fard prayer and before sleeping.',
    createdAt: '2026-10-25',
  },
  {
    id: 'bm_2',
    surahNumber: 1,
    surahName: 'Al-Fatiha',
    ayahNumber: 5,
    arabicSnippet: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    note: 'Core covenant between the servant and Allah.',
    createdAt: '2026-10-26',
  },
];

export function normalizePersistedMasterState(
  raw: Partial<PersistedMasterState> | null,
  referenceNow: Date = new Date()
): PersistedMasterState {
  const todayKey = getLocalDateKey(referenceNow);
  const savedUser = raw?.user;
  const legacyPlainPin =
    typeof savedUser?.parentPin === 'string' && isValidParentPinFormat(savedUser.parentPin)
      ? savedUser.parentPin.trim()
      : undefined;

  const resolvedPinVerifier =
    savedUser?.parentPinVerifier ||
    (legacyPlainPin ? createParentPinVerifierSync(legacyPlainPin) : undefined);

  const { parentPin: _omitPlainPin, ...restSavedUser } =
    savedUser && typeof savedUser === 'object' ? savedUser : ({} as Partial<UserProfile>);

  const user: UserProfile = {
    ...INITIAL_USER,
    ...restSavedUser,
    parentPin: undefined,
    parentPinVerifier: resolvedPinVerifier,
    parentPinSetupCompleted: Boolean(
      savedUser?.parentPinSetupCompleted || resolvedPinVerifier
    ),
    autoPlayRecitation: false,
    isMuted: Boolean(savedUser?.isMuted),
    playbackRate: savedUser?.playbackRate || 1,
    prayerCalculationMethod: savedUser?.prayerCalculationMethod || 1,
    prayerAsrSchool: savedUser?.prayerAsrSchool ?? 1,
    hijriAdjustmentDays: savedUser?.hijriAdjustmentDays ?? 0,
    kidsDailyResetHour:
      typeof savedUser?.kidsDailyResetHour === 'number'
        ? Math.max(0, Math.min(23, Math.floor(savedUser.kidsDailyResetHour)))
        : 0,
    parentPinRecoveryHash: savedUser?.parentPinRecoveryHash,
    parentPinRecoveryCreatedAtIso: savedUser?.parentPinRecoveryCreatedAtIso,
    recoveryCodeUsedAtIso: savedUser?.recoveryCodeUsedAtIso,
    lastBackupExportedAtIso: savedUser?.lastBackupExportedAtIso,
    calendarReminders: savedUser?.calendarReminders || {
      whiteDays: true,
      mondayThursday: true,
      ashura: true,
      ramadan: true,
      arafah: true,
    },
  };

  const rawDaily = raw?.dailyVerseActivity;
  const dailyVerseActivity: DailyVerseActivity =
    rawDaily && rawDaily.dateKey === todayKey && Array.isArray(rawDaily.ayahKeys)
      ? rawDaily
      : { dateKey: todayKey, ayahKeys: [] };

  const rawHifz = Array.isArray(raw?.hifzPlans) && raw!.hifzPlans.length > 0 ? raw!.hifzPlans : INITIAL_HIFZ;
  const hifzPlans: HifzPlan[] = rawHifz.map((plan) => {
    const parsedRange = parseHifzAyahRange(plan.ayahRange, plan.totalAyahs);
    const startAyah = plan.startAyah || parsedRange.startAyah;
    const endAyah = plan.endAyah || parsedRange.endAyah;
    const ayahRange =
      plan.ayahRange ||
      (plan.startAyah && plan.endAyah ? `Ayahs ${plan.startAyah}-${plan.endAyah}` : parsedRange.label);
    return {
      ...plan,
      startAyah,
      endAyah,
      ayahRange,
      memorizationState:
        plan.memorizationState ||
        deriveHifzPlanState(plan.memorizedAyahs, plan.totalAyahs, false, 7),
    };
  });

  const rawRevs =
    Array.isArray(raw?.revisionItems) && raw!.revisionItems.length > 0
      ? raw!.revisionItems
      : INITIAL_REVISIONS;
  const revisionItems: RevisionItem[] = refreshRevisionQueueDueStatuses(
    rawRevs.map((item) => {
      const meta = ALL_114_SURAHS.find((s) => s.number === item.surahNumber);
      const parsedRange = parseHifzAyahRange(item.ayahRange, meta?.ayahCount || 286);
      return {
        ...item,
        startAyah: item.startAyah || parsedRange.startAyah,
        endAyah: item.endAyah || parsedRange.endAyah,
      };
    }),
    todayKey
  );

  const rawChildren =
    Array.isArray(raw?.childrenProfiles) && raw!.childrenProfiles.length > 0
      ? raw!.childrenProfiles
      : INITIAL_CHILDREN;

  const resetHour = user.kidsDailyResetHour ?? 0;
  const childrenProfiles: ChildProfile[] = rawChildren.map((child) => {
    const normalizedChild: ChildProfile = {
      ...child,
      completedSurahs: Array.isArray(child.completedSurahs)
        ? Array.from(
            new Set(child.completedSurahs.filter(Boolean).map(normalizeSurahCertificateTitle))
          )
        : [],
      completedStoryIds: Array.isArray(child.completedStoryIds)
        ? Array.from(new Set(child.completedStoryIds.filter(Boolean)))
        : [],
    };
    return ensureChildUsagePeriodRollover(normalizedChild, referenceNow, resetHour);
  });

  const activeChildId =
    raw?.activeChildId && childrenProfiles.some((c) => c.id === raw.activeChildId)
      ? raw.activeChildId
      : childrenProfiles[0]?.id || 'child_ayaan';

  return {
    schemaVersion: ILMIZO_DB_SCHEMA_VERSION,
    user,
    dailyVerseActivity,
    learningEvents: Array.isArray(raw?.learningEvents) ? raw!.learningEvents : [],
    studiedNames99Numbers: Array.isArray(raw?.studiedNames99Numbers)
      ? raw!.studiedNames99Numbers
      : [1, 2, 3],
    recentlyOpenedSurahs: Array.isArray(raw?.recentlyOpenedSurahs)
      ? raw!.recentlyOpenedSurahs
      : [2, 1, 36, 67, 112],
    bookmarks: Array.isArray(raw?.bookmarks) ? raw!.bookmarks : INITIAL_BOOKMARKS,
    personalNotes: Array.isArray(raw?.personalNotes) ? raw!.personalNotes : INITIAL_NOTES,
    hifzPlans,
    revisionItems,
    salahRecords:
      raw?.salahRecords && typeof raw.salahRecords === 'object'
        ? raw.salahRecords
        : { [todayKey]: createEmptySalahDayRecord(todayKey) },
    favoriteDuaIds: Array.isArray(raw?.favoriteDuaIds)
      ? raw!.favoriteDuaIds
      : ['dua_before_eating', 'dua_morning_protection', 'dua_parents'],
    seerahMilestoneIds: Array.isArray(raw?.seerahMilestoneIds)
      ? raw!.seerahMilestoneIds
      : ['seerah_1', 'seerah_2'],
    completedLessonIds: Array.isArray(raw?.completedLessonIds)
      ? raw!.completedLessonIds
      : ['lesson_1', 'lesson_2'],
    masteredVocabIds: Array.isArray(raw?.masteredVocabIds)
      ? raw!.masteredVocabIds
      : ['v1', 'v2', 'v3'],
    quizAttempts: Array.isArray(raw?.quizAttempts)
      ? raw!.quizAttempts
      : [
          {
            id: 'qa_1',
            quizId: 'quiz_quran_knowledge',
            quizTitle: 'Quran Knowledge',
            score: 3,
            total: 3,
            completedAt: 'Yesterday',
            mode: 'adult',
          },
        ],
    tasks: Array.isArray(raw?.tasks) ? raw!.tasks : INITIAL_TASKS,
    expenses: Array.isArray(raw?.expenses) ? raw!.expenses : INITIAL_EXPENSES,
    childrenProfiles,
    activeChildId,
  };
}

const IlmizoContext = createContext<IlmizoContextValue | null>(null);

export const IlmizoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navState, setNavState] = useState<NavigationHistoryState>(
    INITIAL_NAVIGATION_HISTORY_STATE
  );
  const subScreenBackHandlerRef = useRef<(() => boolean) | null>(null);
  const [hasSubScreenBack, setHasSubScreenBack] = useState(false);
  const isHandlingPopStateRef = useRef(false);

  const mode = navState.mode;
  const adultRoute = navState.adultRoute;
  const kidsRoute = navState.kidsRoute;
  const adultHistory = navState.adultHistory;
  const kidsHistory = navState.kidsHistory;
  const parentHubUnlocked = navState.parentHubUnlocked;

  const pushBrowserHistorySnapshot = useCallback((nextNav: NavigationHistoryState) => {
    if (isHandlingPopStateRef.current) return;
    if (typeof window !== 'undefined' && window.history && typeof window.history.pushState === 'function') {
      try {
        window.history.pushState(
          {
            ilmizoNav: true,
            mode: nextNav.mode,
            adultRoute: nextNav.adultRoute,
            kidsRoute: nextNav.kidsRoute,
          },
          ''
        );
      } catch {
        // Ignore history push errors in restricted iframe contexts
      }
    }
  }, []);

  const setMode = useCallback(
    (nextMode: AppMode) => {
      audioManager.stopAll();
      setNavState((prev) => {
        const next = transitionMode(prev, nextMode);
        if (next !== prev) {
          pushBrowserHistorySnapshot(next);
        }
        return next;
      });
    },
    [pushBrowserHistorySnapshot]
  );

  const setAdultRoute = useCallback(
    (nextRoute: AdultRoute) => {
      if (!audioManager.getState().quranSequence.mode) {
        audioManager.stopAll();
      }
      setNavState((prev) => {
        const next = pushAdultRoute(prev, nextRoute);
        if (next !== prev) {
          pushBrowserHistorySnapshot(next);
        }
        return next;
      });
    },
    [pushBrowserHistorySnapshot]
  );

  const setKidsRoute = useCallback(
    (nextRoute: KidsRoute) => {
      audioManager.stopAll();
      setNavState((prev) => {
        const next = pushKidsRoute(prev, nextRoute);
        if (next !== prev) {
          pushBrowserHistorySnapshot(next);
        }
        return next;
      });
    },
    [pushBrowserHistorySnapshot]
  );

  const setParentHubUnlocked = useCallback((unlocked: boolean) => {
    setNavState((prev) => ({
      ...prev,
      parentHubUnlocked: Boolean(unlocked),
    }));
  }, []);

  const registerSubScreenBackHandler = useCallback((handler: (() => boolean) | null) => {
    subScreenBackHandlerRef.current = handler;
    setHasSubScreenBack(Boolean(handler));
  }, []);

  const isKidsScreenTimeLockedRef = useRef(false);

  const setKidsRouteGuarded = useCallback(
    (nextRoute: KidsRoute) => {
      if (isKidsScreenTimeLockedRef.current) {
        audioManager.stopAll();
        return;
      }
      setKidsRoute(nextRoute);
    },
    [setKidsRoute]
  );

  const goBack = useCallback(() => {
    const keepQuranPlaying =
      navState.mode === 'adult' && Boolean(audioManager.getState().quranSequence.mode);
    if (!keepQuranPlaying) {
      audioManager.stopAll();
    }
    // Do not allow navigating around the Kids Screen-Time Lock using internal back buttons
    if (navState.mode === 'kids' && isKidsScreenTimeLockedRef.current) {
      return;
    }
    if (subScreenBackHandlerRef.current) {
      const handledBySubScreen = subScreenBackHandlerRef.current();
      if (handledBySubScreen) {
        return;
      }
    }
    setNavState((prev) => popNavigationHistory(prev));
  }, [navState.mode]);

  const canGoBack = useMemo(
    () =>
      navState.mode === 'kids' && isKidsScreenTimeLockedRef.current
        ? false
        : canNavigateBack(navState, hasSubScreenBack),
    [navState, hasSubScreenBack]
  );

  // Sync with browser / mobile back navigation (popstate)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      isHandlingPopStateRef.current = true;
      try {
        audioManager.stopAll();
        // Prevent browser back button from bypassing the Kids Screen-Time Lock inside Kids World
        if (isKidsScreenTimeLockedRef.current) {
          pushBrowserHistorySnapshot(navState);
          return;
        }
        if (subScreenBackHandlerRef.current) {
          const handled = subScreenBackHandlerRef.current();
          if (handled) {
            return;
          }
        }
        setNavState((prev) => popNavigationHistory(prev));
      } finally {
        isHandlingPopStateRef.current = false;
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navState, pushBrowserHistorySnapshot]);

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = readSavedField<UserProfile>('user', INITIAL_USER);
    const legacyPin =
      typeof saved?.parentPin === 'string' && isValidParentPinFormat(saved.parentPin)
        ? saved.parentPin.trim()
        : undefined;
    const resolvedVerifier =
      saved?.parentPinVerifier ||
      (legacyPin ? createParentPinVerifierSync(legacyPin) : undefined);
    const { parentPin: _omitPlainPin, ...restSaved } = saved || ({} as Partial<UserProfile>);
    return {
      ...INITIAL_USER,
      ...restSaved,
      parentPin: undefined,
      parentPinVerifier: resolvedVerifier,
      parentPinSetupCompleted: Boolean(
        saved?.parentPinSetupCompleted || resolvedVerifier
      ),
      autoPlayRecitation: false,
      isMuted: Boolean(saved?.isMuted),
      playbackRate: saved?.playbackRate || 1,
      prayerCalculationMethod: saved?.prayerCalculationMethod || 1,
      prayerAsrSchool: saved?.prayerAsrSchool ?? 1,
      hijriAdjustmentDays: saved?.hijriAdjustmentDays ?? 0,
      calendarReminders: saved?.calendarReminders || {
        whiteDays: true,
        mondayThursday: true,
        ashura: true,
        ramadan: true,
        arafah: true,
      },
    };
  });

  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(
    () => user.lastRead?.surahNumber || 2
  );

  const [recentlyOpenedSurahs, setRecentlyOpenedSurahs] = useState<number[]>(() =>
    readSavedField<number[]>('recentlyOpenedSurahs', [2, 1, 36, 67, 112])
  );

  const [dailyVerseActivity, setDailyVerseActivity] = useState<DailyVerseActivity>(() => {
    const todayKey = getLocalDateKey();
    const saved = readSavedField<DailyVerseActivity>('dailyVerseActivity', {
      dateKey: todayKey,
      ayahKeys: [],
    });
    if (!saved || saved.dateKey !== todayKey || !Array.isArray(saved.ayahKeys)) {
      return { dateKey: todayKey, ayahKeys: [] };
    }
    return saved;
  });

  const [learningEvents, setLearningEvents] = useState<LearningEvent[]>(() =>
    readSavedField<LearningEvent[]>('learningEvents', [])
  );

  const [studiedNames99Numbers, setStudiedNames99Numbers] = useState<number[]>(() =>
    readSavedField<number[]>('studiedNames99Numbers', [1, 2, 3])
  );

  const [bookmarks, setBookmarks] = useState<QuranBookmark[]>(() =>
    readSavedField<QuranBookmark[]>('bookmarks', [
      {
        id: 'bm_1',
        surahNumber: 2,
        surahName: 'Al-Baqarah',
        ayahNumber: 255,
        arabicSnippet: 'ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ',
        note: 'Recite after every Fard prayer and before sleeping.',
        createdAt: '2026-10-25',
      },
      {
        id: 'bm_2',
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 5,
        arabicSnippet: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        note: 'Core covenant between the servant and Allah.',
        createdAt: '2026-10-26',
      },
    ])
  );

  const [personalNotes, setPersonalNotes] = useState<PersonalNote[]>(() =>
    readSavedField<PersonalNote[]>('personalNotes', INITIAL_NOTES)
  );

  const [hifzPlans, setHifzPlans] = useState<HifzPlan[]>(() => {
    const raw = readSavedField<HifzPlan[]>('hifzPlans', INITIAL_HIFZ);
    return raw.map((plan) => {
      const parsedRange = parseHifzAyahRange(plan.ayahRange, plan.totalAyahs);
      return {
        ...plan,
        startAyah: plan.startAyah || parsedRange.startAyah,
        endAyah: plan.endAyah || parsedRange.endAyah,
        ayahRange: plan.ayahRange || parsedRange.label,
        memorizationState:
          plan.memorizationState ||
          deriveHifzPlanState(plan.memorizedAyahs, plan.totalAyahs, false, 7),
      };
    });
  });

  const [revisionItems, setRevisionItems] = useState<RevisionItem[]>(() => {
    const raw = readSavedField<RevisionItem[]>('revisionItems', INITIAL_REVISIONS);
    return refreshRevisionQueueDueStatuses(
      raw.map((item) => {
        const meta = ALL_114_SURAHS.find((s) => s.number === item.surahNumber);
        const parsedRange = parseHifzAyahRange(item.ayahRange, meta?.ayahCount || 286);
        return {
          ...item,
          startAyah: item.startAyah || parsedRange.startAyah,
          endAyah: item.endAyah || parsedRange.endAyah,
        };
      }),
      getLocalDateKey()
    );
  });

  const [hifzUndoSnapshot, setHifzUndoSnapshot] = useState<{
    hifzPlans: HifzPlan[];
    revisionItems: RevisionItem[];
  } | null>(null);

  const [salahRecords, setSalahRecords] = useState<Record<string, SalahDayRecord>>(() => {
    const today = getTodayKey();
    return readSavedField<Record<string, SalahDayRecord>>('salahRecords', {
      [today]: createEmptySalahDayRecord(today),
    });
  });

  const [favoriteDuaIds, setFavoriteDuaIds] = useState<string[]>(() =>
    readSavedField<string[]>('favoriteDuaIds', ['dua_before_eating', 'dua_morning_protection', 'dua_parents'])
  );

  const [seerahMilestoneIds, setSeerahMilestoneIds] = useState<string[]>(() =>
    readSavedField<string[]>('seerahMilestoneIds', ['seerah_1', 'seerah_2'])
  );

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() =>
    readSavedField<string[]>('completedLessonIds', ['lesson_1', 'lesson_2'])
  );

  const [masteredVocabIds, setMasteredVocabIds] = useState<string[]>(() =>
    readSavedField<string[]>('masteredVocabIds', ['v1', 'v2', 'v3'])
  );

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() =>
    readSavedField<QuizAttempt[]>('quizAttempts', [
      {
        id: 'qa_1',
        quizId: 'quiz_quran_knowledge',
        quizTitle: 'Quran Knowledge',
        score: 3,
        total: 3,
        completedAt: 'Yesterday',
        mode: 'adult',
      },
    ])
  );

  const [tasks, setTasks] = useState<TaskItem[]>(() =>
    readSavedField<TaskItem[]>('tasks', INITIAL_TASKS)
  );

  const [expenses, setExpenses] = useState<ExpenseEntry[]>(() =>
    readSavedField<ExpenseEntry[]>('expenses', INITIAL_EXPENSES)
  );

  const [childrenProfiles, setChildrenProfiles] = useState<ChildProfile[]>(() => {
    const rawProfiles = readSavedField<ChildProfile[]>('childrenProfiles', INITIAL_CHILDREN);
    const resetHour = user.kidsDailyResetHour ?? 0;
    const nowDate = new Date();
    return rawProfiles.map((child) =>
      ensureChildUsagePeriodRollover(
        {
          ...child,
          completedSurahs: Array.isArray(child.completedSurahs)
            ? Array.from(
                new Set(child.completedSurahs.filter(Boolean).map(normalizeSurahCertificateTitle))
              )
            : [],
          completedStoryIds: Array.isArray(child.completedStoryIds)
            ? Array.from(new Set(child.completedStoryIds.filter(Boolean)))
            : [],
        },
        nowDate,
        resetHour
      )
    );
  });

  const [activeChildId, setActiveChildId] = useState<string>(() =>
    readSavedField<string>('activeChildId', 'child_ayaan')
  );

  const [storageMetrics, setStorageMetrics] = useState<LocalStorageMetrics>({
    backend: 'indexeddb',
    schemaVersion: ILMIZO_DB_SCHEMA_VERSION,
    migratedFromLegacyV1: true,
    legacyBackupPreserved: true,
    estimatedUsedBytes: 0,
    estimatedQuotaBytes: null,
    downloadedSurahNumbers: [],
    cachedSurahNumbers: [],
    downloadedAudioKeys: [],
    learningEventsCount: 0,
    hasPreImportRecoverySnapshot: false,
    lastSavedAtIso: null,
    lastQuotaError: null,
  });

  const refreshStorageMetrics = async () => {
    const metrics = await computeLocalStorageMetrics();
    setStorageMetrics(metrics);
  };

  const applyNormalizedMasterStateToReact = (normalized: PersistedMasterState) => {
    setUser(normalized.user);
    setSelectedSurahNumber(normalized.user.lastRead?.surahNumber || 2);
    setDailyVerseActivity(normalized.dailyVerseActivity);
    setLearningEvents(normalized.learningEvents);
    setStudiedNames99Numbers(normalized.studiedNames99Numbers);
    setRecentlyOpenedSurahs(normalized.recentlyOpenedSurahs);
    setBookmarks(normalized.bookmarks);
    setPersonalNotes(normalized.personalNotes);
    setHifzPlans(normalized.hifzPlans);
    setRevisionItems(normalized.revisionItems);
    setSalahRecords(normalized.salahRecords);
    setFavoriteDuaIds(normalized.favoriteDuaIds);
    setSeerahMilestoneIds(normalized.seerahMilestoneIds);
    setCompletedLessonIds(normalized.completedLessonIds);
    setMasteredVocabIds(normalized.masteredVocabIds);
    setQuizAttempts(normalized.quizAttempts);
    setTasks(normalized.tasks);
    setExpenses(normalized.expenses);
    setChildrenProfiles(normalized.childrenProfiles);
    setActiveChildId(normalized.activeChildId);
  };

  const hasHydratedFromDbRef = useRef(false);

  // Hydrate or migrate from IndexedDB on initial mount BEFORE allowing master-state writes
  useEffect(() => {
    let active = true;
    void requestPersistentLocalStorage();
    hydrateOrMigrateMasterState(normalizePersistedMasterState).then(async ({ state }) => {
      if (!active) return;
      hasHydratedFromDbRef.current = true;
      applyNormalizedMasterStateToReact(state);
      await refreshStorageMetrics();
      if (state.user.subscriptionPurchaseSource === 'google_play') {
        void reconcileGooglePlayEntitlements(state.user).then((rec) => {
          if (!active) return;
          if (rec.patch) {
            setUser((prev) => ({ ...prev, ...rec.patch }));
          }
        });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Compute dynamic streak from real recorded events, verse reads, and Salah logs
  const computedStreak = useMemo(
    () =>
      computeLearningStreak({
        learningEvents,
        salahRecords,
        dailyVerseActivity,
      }),
    [learningEvents, salahRecords, dailyVerseActivity]
  );

  const effectiveUser = useMemo(
    () => ({
      ...user,
      streakDays: computedStreak.currentStreakDays,
    }),
    [user, computedStreak.currentStreakDays]
  );

  const currentMasterStateSnapshot = useMemo<PersistedMasterState>(
    () => ({
      schemaVersion: ILMIZO_DB_SCHEMA_VERSION,
      user: effectiveUser,
      dailyVerseActivity,
      learningEvents,
      studiedNames99Numbers,
      recentlyOpenedSurahs,
      bookmarks,
      personalNotes,
      hifzPlans,
      revisionItems,
      salahRecords,
      favoriteDuaIds,
      seerahMilestoneIds,
      completedLessonIds,
      masteredVocabIds,
      quizAttempts,
      tasks,
      expenses,
      childrenProfiles,
      activeChildId,
    }),
    [
      effectiveUser,
      dailyVerseActivity,
      learningEvents,
      studiedNames99Numbers,
      recentlyOpenedSurahs,
      bookmarks,
      personalNotes,
      hifzPlans,
      revisionItems,
      salahRecords,
      favoriteDuaIds,
      seerahMilestoneIds,
      completedLessonIds,
      masteredVocabIds,
      quizAttempts,
      tasks,
      expenses,
      childrenProfiles,
      activeChildId,
    ]
  );

  useEffect(() => {
    if (!hasHydratedFromDbRef.current) return;
    saveMasterStateToLocalDb(currentMasterStateSnapshot).then(() => {
      refreshStorageMetrics();
    });
  }, [currentMasterStateSnapshot]);

  const activeChild = childrenProfiles.find((c) => c.id === activeChildId) || childrenProfiles[0];

  const isKidsScreenTimeLocked = useMemo(() => {
    if (!activeChild) return false;
    return isChildScreenTimeLimitReached(activeChild, new Date(), user.kidsDailyResetHour ?? 0);
  }, [activeChild, user.kidsDailyResetHour]);

  isKidsScreenTimeLockedRef.current = mode === 'kids' && isKidsScreenTimeLocked;

  // Stop all audio immediately when Kids screen-time lock activates
  useEffect(() => {
    if (mode === 'kids' && isKidsScreenTimeLocked) {
      audioManager.stopAll();
    }
  }, [mode, isKidsScreenTimeLocked]);

  // Persistent foreground Kids World usage timer (1-second tick, monotonic elapsed time, pauses when hidden/blurred or locked)
  useEffect(() => {
    if (mode !== 'kids' || !activeChild) return;
    if (typeof document === 'undefined' || typeof window === 'undefined') return;

    const getMonotonicNow = () =>
      typeof performance !== 'undefined' && typeof performance.now === 'function'
        ? performance.now()
        : Date.now();

    let lastMonotonicMs = getMonotonicNow();
    let isWindowFocused = typeof document.hasFocus === 'function' ? document.hasFocus() : true;

    const handleVisibilityChange = () => {
      lastMonotonicMs = getMonotonicNow();
    };
    const handleFocus = () => {
      isWindowFocused = true;
      lastMonotonicMs = getMonotonicNow();
    };
    const handleBlur = () => {
      isWindowFocused = false;
      lastMonotonicMs = getMonotonicNow();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    const intervalId = window.setInterval(() => {
      const nowMonotonicMs = getMonotonicNow();
      const elapsedMs = Math.max(0, nowMonotonicMs - lastMonotonicMs);
      lastMonotonicMs = nowMonotonicMs;

      const isVisible = document.visibilityState === 'visible';
      const isForegroundAndVisible = isVisible && isWindowFocused;
      const wallClockNow = new Date();

      setChildrenProfiles((prev) =>
        prev.map((c) => {
          if (c.id !== activeChild.id) return c;
          const res = accumulateKidsForegroundUsage({
            child: c,
            elapsedMs,
            isForegroundAndVisible,
            now: wallClockNow,
            resetHour: user.kidsDailyResetHour ?? 0,
          });
          if (res.limitReached) {
            audioManager.stopAll();
          }
          return res.updatedChild;
        })
      );
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [mode, activeChild?.id, user.kidsDailyResetHour]);

  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => getSystemPrefersDark());

  const themeMode: ThemeMode = useMemo(() => {
    if (user.themeMode === 'light' || user.themeMode === 'dark' || user.themeMode === 'system') {
      return user.themeMode;
    }
    return loadThemeMode(user.darkMode);
  }, [user.themeMode, user.darkMode]);

  const resolvedTheme: ResolvedTheme = useMemo(
    () => resolveThemeMode(themeMode, systemPrefersDark),
    [themeMode, systemPrefersDark]
  );

  useEffect(() => {
    return subscribeSystemThemeChanges((prefersDark) => {
      setSystemPrefersDark(prefersDark);
    });
  }, []);

  useEffect(() => {
    applyThemeToDocument(themeMode, systemPrefersDark);
    saveThemeMode(themeMode);
  }, [themeMode, systemPrefersDark]);

  const setThemeMode = useCallback(
    (nextMode: ThemeMode) => {
      const nextResolved = resolveThemeMode(nextMode, getSystemPrefersDark());
      saveThemeMode(nextMode);
      applyThemeToDocument(nextMode, getSystemPrefersDark());
      setUser((prev) => ({
        ...prev,
        themeMode: nextMode,
        darkMode: nextResolved === 'dark',
      }));
    },
    []
  );

  const updateUser = (patch: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...patch };
      if (typeof patch.themeMode === 'string') {
        const res = resolveThemeMode(patch.themeMode, systemPrefersDark);
        next.darkMode = res === 'dark';
      } else if (typeof patch.darkMode === 'boolean' && patch.themeMode === undefined) {
        next.themeMode = patch.darkMode ? 'dark' : 'light';
      }
      return next;
    });
  };

  const setLanguage = (lang: LanguageCode) => {
    translationService.setLanguage(lang);
    updateUser({ language: lang });
  };

  useEffect(() => {
    translationService.setLanguage(user.language);
  }, [user.language]);

  const languageMeta = useMemo(
    () => translationService.getLanguageMetadata(user.language),
    [user.language]
  );

  const uiLabels = useMemo(
    () => translationService.loadDictionary(user.language),
    [user.language]
  );

  const translate = (key: TranslationKey, params?: Record<string, string | number>) =>
    translationService.translate(key, user.language, params);

  const resolveText = (content: Partial<Record<LanguageCode, string>> | undefined, fallback = '') =>
    translationService.resolveLocalizedContent(content, user.language, fallback);

  const isAudioMuted = Boolean(user.isMuted);
  // Autoplay is permanently disabled across the entire app per user requirement
  const autoPlayRecitation = false;

  useEffect(() => {
    audioManager.setMuted(isAudioMuted);
  }, [isAudioMuted]);

  useEffect(() => {
    audioManager.setPlaybackRate(user.playbackRate || 1);
  }, [user.playbackRate]);

  const toggleAudioMute = useCallback(() => {
    setUser((prev) => {
      const nextMuted = !prev.isMuted;
      audioManager.setMuted(nextMuted);
      return {
        ...prev,
        isMuted: nextMuted,
        autoPlayRecitation: false,
      };
    });
  }, []);

  const toggleAutoPlayRecitation = toggleAudioMute;

  const logLearningEvent = (
    type: LearningEventType,
    referenceId: string,
    title: string,
    eventMode: 'adult' | 'kids' = 'adult',
    childId?: string,
    value?: number
  ) => {
    setLearningEvents((prev) =>
      appendLearningEvent(prev, {
        type,
        referenceId,
        title,
        mode: eventMode,
        childId,
        value,
      })
    );
  };

  const markName99Studied = (nameNumber: number, transliteration: string) => {
    setStudiedNames99Numbers((prev) =>
      prev.includes(nameNumber) ? prev : [...prev, nameNumber]
    );
    logLearningEvent('name99_studied', `name99_${nameNumber}`, `Studied ${transliteration} (#${nameNumber})`);
  };

  const recordVerseRead = (surahNumber: number, ayahNumber: number) => {
    const surahMeta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
    const surahName = surahMeta ? surahMeta.nameTranslit : `Surah ${surahNumber}`;
    setDailyVerseActivity((prev) =>
      recordDailyVerseRead(prev, surahNumber, ayahNumber, getLocalDateKey())
    );
    logLearningEvent(
      'quran_ayah_read',
      `${surahNumber}:${ayahNumber}`,
      `Read ${surahName} ${surahNumber}:${ayahNumber}`
    );
  };

  // Opens a Surah at the specified Ayah without falsely counting "opening" as verse reading;
  // actual verse reading is recorded only when a verse is loaded & read/navigated in the Reader.
  const openSurahForReading = (surahNumber: number, ayahNumber = 1) => {
    const surahMeta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
    const resolvedName = surahMeta ? surahMeta.nameTranslit : `Surah ${surahNumber}`;

    setSelectedSurahNumber(surahNumber);
    setAdultRoute('quran_read');
    setRecentlyOpenedSurahs((prev) => [
      surahNumber,
      ...prev.filter((n) => n !== surahNumber),
    ].slice(0, 8));

    setUser((prev) => ({
      ...prev,
      lastRead: {
        surahNumber,
        surahName: resolvedName,
        ayahNumber,
      },
    }));
  };

  const toggleBookmark = (bm: Omit<QuranBookmark, 'id' | 'createdAt'>) => {
    setBookmarks((prev) => {
      const exists = prev.find((item) => item.surahNumber === bm.surahNumber && item.ayahNumber === bm.ayahNumber);
      if (exists) {
        return prev.filter((item) => item.id !== exists.id);
      }
      return [
        {
          ...bm,
          id: `bm_${Date.now()}`,
          createdAt: getTodayKey(),
        },
        ...prev,
      ];
    });
  };

  const updateBookmarkMeta = (
    bookmarkId: string,
    patch: Partial<Pick<QuranBookmark, 'note' | 'folder' | 'customLabel' | 'readingList'>>
  ) => {
    setBookmarks((prev) =>
      prev.map((item) =>
        item.id === bookmarkId
          ? {
              ...item,
              ...patch,
              updatedAt: getTodayKey(),
            }
          : item
      )
    );
  };

  const addPersonalNote = (
    title: string,
    body: string,
    surahReference?: string,
    surahNumber?: number,
    ayahNumber?: number,
    extra?: {
      tags?: string[];
      tadabburPrompt?: string;
      noteType?: 'note' | 'tadabbur' | 'hifz_note';
    }
  ) => {
    if (!title.trim() || !body.trim()) return;
    setPersonalNotes((prev) => [
      {
        id: `note_${Date.now()}`,
        title: title.trim(),
        body: body.trim(),
        surahReference: surahReference?.trim() || undefined,
        surahNumber,
        ayahNumber,
        tags: extra?.tags,
        tadabburPrompt: extra?.tadabburPrompt,
        noteType: extra?.noteType || 'note',
        createdAt: getTodayKey(),
        updatedAt: getTodayKey(),
      },
      ...prev,
    ]);
  };

  const editPersonalNote = (
    noteId: string,
    patch: Partial<Pick<PersonalNote, 'title' | 'body' | 'surahReference' | 'surahNumber' | 'ayahNumber' | 'tags' | 'tadabburPrompt' | 'noteType'>>
  ) => {
    setPersonalNotes((prev) =>
      prev.map((n) =>
        n.id === noteId
          ? {
              ...n,
              ...patch,
              updatedAt: getTodayKey(),
            }
          : n
      )
    );
  };

  const deletePersonalNote = (noteId: string) => {
    setPersonalNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  const updateHifzProgress = (surahNumber: number, memorizedAyahs: number) => {
    setHifzUndoSnapshot({ hifzPlans, revisionItems });
    const nowIso = new Date().toISOString();
    setHifzPlans((prev) =>
      prev.map((plan) => {
        if (plan.surahNumber !== surahNumber) return plan;
        const clamped = Math.max(0, Math.min(plan.totalAyahs, memorizedAyahs));
        const status =
          clamped >= plan.totalAyahs ? 'completed' : clamped > 0 ? 'in_progress' : 'not_started';
        return {
          ...plan,
          memorizedAyahs: clamped,
          lastPracticedAt: 'Today',
          lastPracticedAtIso: nowIso,
          status,
          memorizationState: deriveHifzPlanState(clamped, plan.totalAyahs, false, 3),
        };
      })
    );
    logLearningEvent(
      'hifz_progress',
      `hifz_${surahNumber}:${memorizedAyahs}`,
      `Updated Hifz progress for Surah ${surahNumber} (${memorizedAyahs} Ayahs)`
    );
  };

  const addHifzPlan = (surahNumber: number, dailyTargetAyahs: number, ayahRange?: string) => {
    const surahMeta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
    if (!surahMeta) return;
    setHifzUndoSnapshot({ hifzPlans, revisionItems });

    const parsedRange = parseHifzAyahRange(ayahRange, surahMeta.ayahCount);
    const nowIso = new Date().toISOString();
    const todayKey = getLocalDateKey();

    setHifzPlans((prev) => {
      const existing = prev.find((p) => p.surahNumber === surahNumber);
      if (existing) {
        return prev.map((p) =>
          p.surahNumber === surahNumber
            ? {
                ...p,
                dailyTargetAyahs,
                ayahRange: parsedRange.label,
                startAyah: parsedRange.startAyah,
                endAyah: parsedRange.endAyah,
                status: p.memorizedAyahs >= p.totalAyahs ? 'completed' : 'in_progress',
                memorizationState: deriveHifzPlanState(p.memorizedAyahs, p.totalAyahs, true, 1),
                lastPracticedAt: 'Plan updated today',
                lastPracticedAtIso: nowIso,
              }
            : p
        );
      }
      return [
        {
          surahNumber: surahMeta.number,
          surahName: surahMeta.nameTranslit,
          totalAyahs: surahMeta.ayahCount,
          memorizedAyahs: 0,
          lastPracticedAt: 'Created today',
          lastPracticedAtIso: nowIso,
          status: 'in_progress',
          memorizationState: 'learning',
          dailyTargetAyahs,
          ayahRange: parsedRange.label,
          startAyah: parsedRange.startAyah,
          endAyah: parsedRange.endAyah,
        },
        ...prev,
      ];
    });

    setRevisionItems((prev) => {
      const exists = prev.some(
        (r) => r.surahNumber === surahNumber && r.ayahRange === parsedRange.label
      );
      if (exists) return prev;
      return [
        {
          id: `rev_${surahNumber}_${Date.now()}`,
          surahNumber: surahMeta.number,
          surahName: surahMeta.nameTranslit,
          ayahRange: parsedRange.label,
          startAyah: parsedRange.startAyah,
          endAyah: parsedRange.endAyah,
          dueStatus: 'due_today',
          dueDate: 'Due Today',
          nextReviewAt: todayKey,
          lastPracticedAt: nowIso,
          intervalDays: 1,
          difficulty: 'medium',
          attemptsCount: 0,
          memorizationState: 'revision_due',
        },
        ...prev,
      ];
    });
  };

  const resetHifzPlan = (surahNumber: number) => {
    setHifzUndoSnapshot({ hifzPlans, revisionItems });
    setHifzPlans((prev) =>
      prev.map((p) =>
        p.surahNumber === surahNumber
          ? {
              ...p,
              memorizedAyahs: 0,
              status: 'not_started',
              memorizationState: 'not_started',
              lastPracticedAt: 'Reset today',
            }
          : p
      )
    );
  };

  const undoLastHifzAction = () => {
    if (!hifzUndoSnapshot) return;
    setHifzPlans(hifzUndoSnapshot.hifzPlans);
    setRevisionItems(hifzUndoSnapshot.revisionItems);
    setHifzUndoSnapshot(null);
  };

  const recordRevisionAttempt = (id: string, quality: 'Fluent' | 'Good' | 'Needs Work') => {
    setHifzUndoSnapshot({ hifzPlans, revisionItems });
    const now = new Date();
    setRevisionItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return scheduleHifzRevision(item, quality, now);
      })
    );
    logLearningEvent(
      'hifz_revision',
      `${id}_${quality}`,
      `Logged Hifz revision (${quality})`
    );
  };

  const togglePrayerStatus = (date: string, prayer: PrayerName) => {
    setSalahRecords((prev) => {
      const existing = prev[date] || createEmptySalahDayRecord(date);
      const order: PrayerStatus[] = ['pending', 'prayed_on_time', 'prayed', 'qaza'];
      const current = existing.prayers[prayer];
      const next = order[(order.indexOf(current) + 1) % order.length];
      if (next === 'prayed_on_time' || next === 'prayed') {
        logLearningEvent('salah_logged', `${date}_${prayer}`, `Logged ${prayer} (${next})`);
      }
      return {
        ...prev,
        [date]: {
          ...existing,
          updatedAtIso: new Date().toISOString(),
          prayers: {
            ...existing.prayers,
            [prayer]: next,
          },
        },
      };
    });
  };

  const setPrayerStatusExplicit = (date: string, prayer: PrayerName, status: PrayerStatus) => {
    setSalahRecords((prev) => {
      const existing = prev[date] || createEmptySalahDayRecord(date);
      if (status === 'prayed_on_time' || status === 'prayed') {
        logLearningEvent('salah_logged', `${date}_${prayer}`, `Logged ${prayer} (${status})`);
      }
      return {
        ...prev,
        [date]: {
          ...existing,
          updatedAtIso: new Date().toISOString(),
          prayers: {
            ...existing.prayers,
            [prayer]: status,
          },
        },
      };
    });
  };

  const toggleExcusedSalahDay = (dateKey: string, excused: boolean, note?: string) => {
    setSalahRecords((prev) => {
      const existing = prev[dateKey] || createEmptySalahDayRecord(dateKey);
      return {
        ...prev,
        [dateKey]: markDayAsExcused(existing, dateKey, excused, note),
      };
    });
  };

  const salahAnalytics = useMemo(
    () => computeSalahStatsWithExcusedBridge(salahRecords, getLocalDateKey()),
    [salahRecords]
  );

  const setUserMadhhab = (madhhab: MadhhabCode) => {
    const asrSchool = madhhab === 'Hanafi' ? 1 : 0;
    updateUser({ madhhab, prayerAsrSchool: asrSchool });
  };

  const toggleExcusedPrayerMode = () => {
    setUser((prev) => ({
      ...prev,
      excusedPrayerModeEnabled: !prev.excusedPrayerModeEnabled,
    }));
  };

  const toggleFavoriteDua = (duaId: string) => {
    setFavoriteDuaIds((prev) => {
      const next = prev.includes(duaId) ? prev.filter((id) => id !== duaId) : [...prev, duaId];
      if (!prev.includes(duaId)) {
        logLearningEvent('dua_studied', duaId, `Saved Dua ${duaId}`);
      }
      return next;
    });
  };

  const toggleSeerahMilestone = (eventId: string) => {
    setSeerahMilestoneIds((prev) => {
      const isAdding = !prev.includes(eventId);
      if (isAdding) {
        logLearningEvent('seerah_completed', eventId, `Completed Seerah milestone ${eventId}`);
      }
      return isAdding ? [...prev, eventId] : prev.filter((id) => id !== eventId);
    });
  };

  const markLessonCompleted = (lessonId: string) => {
    setCompletedLessonIds((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]));
    logLearningEvent('lesson_completed', lessonId, `Completed lesson ${lessonId}`);
  };

  const toggleVocabMastered = (vocabId: string) => {
    setMasteredVocabIds((prev) => {
      const isAdding = !prev.includes(vocabId);
      if (isAdding) {
        logLearningEvent('vocab_mastered', vocabId, `Mastered Quranic word ${vocabId}`);
      }
      return isAdding ? [...prev, vocabId] : prev.filter((id) => id !== vocabId);
    });
  };

  const recordQuizAttempt = (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => {
    const now = new Date();
    const todayKey = getLocalDateKey(now);
    setQuizAttempts((prev) => [
      {
        ...attempt,
        id: `qa_${now.getTime()}`,
        completedAt: 'Today',
        completedAtIso: now.toISOString(),
        dateKey: todayKey,
      },
      ...prev,
    ]);
    logLearningEvent(
      'quiz_completed',
      `${attempt.quizId}_${now.getTime()}`,
      `Completed ${attempt.quizTitle} (${attempt.score}/${attempt.total})`,
      attempt.mode,
      attempt.childId,
      attempt.score
    );
  };

  const addTask = (task: Omit<TaskItem, 'id' | 'completed'>) => {
    setTasks((prev) => [{ ...task, id: `task_${Date.now()}`, completed: false }, ...prev]);
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const addExpense = (entry: Omit<ExpenseEntry, 'id'>) => {
    setExpenses((prev) => [{ ...entry, id: `exp_${Date.now()}` }, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const addChildProfile = (
    name: string,
    age: number,
    avatar: 'Ayaan' | 'Ayla' | 'Mizo',
    dailyGoalMinutes = 10
  ) => {
    if (childrenProfiles.length >= 5) return;
    const newChild: ChildProfile = {
      id: `child_${Date.now()}`,
      name,
      age,
      avatar,
      dailyGoalMinutes,
      activeMinutesToday: 0,
      stars: 10,
      streakDays: 1,
      questStepsCompleted: { quran: false, dua: false, quiz: false, salah: false, family: false },
      pillarProgress: { quranLessons: 1, duasPracticed: 1, salahLessons: 1, akhlaqDeeds: 1 },
      unlockedAdventureNode: 2,
      needsPractice: [],
      goodDeeds: [],
      earnedBadgeIds: ['badge_quran'],
      completedSurahs: ['Surah Al-Ikhlas'],
      recentActivities: [{ id: `ra_${Date.now()}`, title: 'Joined Ilmizo Kids World', pillar: 'quran', timestamp: 'Just now' }],
    };
    setChildrenProfiles((prev) => [...prev, newChild]);
    setActiveChildId(newChild.id);
  };

  const updateChildProfile = (childId: string, patch: Partial<ChildProfile>) => {
    setChildrenProfiles((prev) =>
      prev.map((c) => (c.id === childId ? { ...c, ...patch } : c))
    );
  };

  const deleteChildProfile = (childId: string) => {
    if (childrenProfiles.length <= 1) return;
    const remaining = childrenProfiles.filter((c) => c.id !== childId);
    setChildrenProfiles(remaining);
    if (activeChildId === childId && remaining.length > 0) {
      setActiveChildId(remaining[0].id);
    }
  };

  const completeKidsQuestStep = (
    step: 'quran' | 'dua' | 'quiz' | 'salah' | 'family',
    title: string,
    completedSurahTitle?: string
  ) => {
    const nowDate = new Date();
    const resetHour = user.kidsDailyResetHour ?? 0;
    setChildrenProfiles((prev) =>
      prev.map((child) => {
        if (child.id !== activeChild.id) return child;
        const { updatedChild } = applyChildQuestCompletion(
          child,
          step,
          title,
          completedSurahTitle,
          getLocalDateKey(nowDate),
          resetHour,
          nowDate
        );
        return updatedChild;
      })
    );

    const eventType: LearningEventType =
      step === 'quran'
        ? 'quran_ayah_read'
        : step === 'dua'
        ? 'dua_studied'
        : step === 'salah'
        ? 'salah_logged'
        : step === 'quiz'
        ? 'quiz_completed'
        : 'lesson_completed';

    // Use a deterministic referenceId per quest step / Surah so appendLearningEvent prevents duplicate daily event inflation
    const stableReferenceId = completedSurahTitle
      ? `kids_${step}_${normalizeSurahCertificateTitle(completedSurahTitle).toLowerCase().replace(/\s+/g, '_')}`
      : `kids_quest_${step}`;

    logLearningEvent(
      eventType,
      stableReferenceId,
      title,
      'kids',
      activeChild.id
    );
  };

  const completeKidsStory = (
    storyId: string,
    storyTitle: string
  ): { starsAwarded: number; alreadyCompleted: boolean } => {
    const cleanId = (storyId || '').trim();
    const existingStories = Array.isArray(activeChild?.completedStoryIds)
      ? activeChild.completedStoryIds
      : [];
    const alreadyCompleted = Boolean(cleanId && existingStories.includes(cleanId));
    const nowDate = new Date();
    const resetHour = user.kidsDailyResetHour ?? 0;

    setChildrenProfiles((prev) =>
      prev.map((child) => {
        if (child.id !== activeChild.id) return child;
        const { updatedChild } = applyChildStoryCompletion(
          child,
          cleanId,
          storyTitle,
          getLocalDateKey(nowDate),
          resetHour,
          nowDate
        );
        return updatedChild;
      })
    );

    if (!alreadyCompleted && cleanId) {
      logLearningEvent(
        'lesson_completed',
        `kids_story_${cleanId}`,
        `Story Completed: ${storyTitle}`,
        'kids',
        activeChild.id,
        5
      );
      return { starsAwarded: 5, alreadyCompleted: false };
    }

    return { starsAwarded: 0, alreadyCompleted: true };
  };

  const completeQaidaLesson = (
    lessonId: string,
    lessonTitle: string,
    starsReward = 10,
    quizScorePct = 100
  ): { starsAwarded: number; alreadyCompleted: boolean } => {
    const cleanId = (lessonId || '').trim();
    const existing = Array.isArray(activeChild?.completedQaidaLessonIds)
      ? activeChild.completedQaidaLessonIds
      : [];
    const alreadyCompleted = Boolean(cleanId && existing.includes(cleanId));
    const awarded = alreadyCompleted ? 0 : Math.max(5, starsReward);

    setChildrenProfiles((prev) =>
      prev.map((child) => {
        if (child.id !== activeChild.id) return child;
        const prevIds = Array.isArray(child.completedQaidaLessonIds)
          ? child.completedQaidaLessonIds
          : [];
        const nextIds =
          cleanId && !prevIds.includes(cleanId) ? [...prevIds, cleanId] : prevIds;
        const prevScores = child.qaidaQuizScores || {};
        const nextScores = cleanId
          ? { ...prevScores, [cleanId]: Math.max(prevScores[cleanId] || 0, quizScorePct) }
          : prevScores;

        return {
          ...child,
          stars: child.stars + awarded,
          completedQaidaLessonIds: nextIds,
          qaidaQuizScores: nextScores,
          pillarProgress: {
            ...child.pillarProgress,
            quranLessons: child.pillarProgress.quranLessons + (alreadyCompleted ? 0 : 1),
          },
          recentActivities: [
            {
              id: `ra_qaida_${Date.now()}`,
              title: `Qaida: ${lessonTitle}`,
              pillar: 'quran',
              timestamp: 'Just now',
            },
            ...child.recentActivities.slice(0, 9),
          ],
        };
      })
    );

    if (!alreadyCompleted && cleanId) {
      logLearningEvent(
        'lesson_completed',
        `kids_qaida_${cleanId}`,
        `Noorani Qaida: ${lessonTitle}`,
        'kids',
        activeChild.id,
        awarded
      );
    }

    return { starsAwarded: awarded, alreadyCompleted };
  };

  const addNeedsPracticeItem = (
    pillar: 'quran' | 'duas' | 'salah' | 'akhlaq',
    title: string,
    prompt: string,
    targetRoute: KidsRoute
  ) => {
    setChildrenProfiles((prev) =>
      prev.map((child) => {
        if (child.id !== activeChild.id) return child;
        const existing = child.needsPractice.find((np) => np.title === title && !np.resolved);
        if (existing) {
          return {
            ...child,
            needsPractice: child.needsPractice.map((np) =>
              np.id === existing.id ? { ...np, mistakeCount: np.mistakeCount + 1, lastAttemptAt: 'Just now' } : np
            ),
          };
        }
        return {
          ...child,
          needsPractice: [
            {
              id: `np_${Date.now()}`,
              pillar,
              title,
              prompt,
              targetRoute,
              mistakeCount: 1,
              lastAttemptAt: 'Just now',
              resolved: false,
            },
            ...child.needsPractice,
          ],
        };
      })
    );
  };

  const resolveNeedsPracticeItem = (itemId: string) => {
    let resolvedTitle = 'Needs Practice Item';
    let wasUnresolved = false;
    setChildrenProfiles((prev) =>
      prev.map((child) => {
        if (child.id !== activeChild.id) return child;
        const target = child.needsPractice.find((np) => np.id === itemId);
        if (!target || target.resolved) {
          return child;
        }
        wasUnresolved = true;
        resolvedTitle = target.title;
        const draft: ChildProfile = {
          ...child,
          stars: child.stars + 5,
          needsPractice: child.needsPractice.map((np) =>
            np.id === itemId ? { ...np, resolved: true } : np
          ),
        };
        const badgeEval = evaluateChildBadgesAndMilestones(draft);
        return {
          ...draft,
          earnedBadgeIds: badgeEval.earnedBadgeIds,
          unlockedAdventureNode: badgeEval.unlockedAdventureNode,
        };
      })
    );
    if (wasUnresolved) {
      logLearningEvent(
        'lesson_completed',
        `kids_review_${itemId}`,
        `Reviewed & Resolved: ${resolvedTitle}`,
        'kids',
        activeChild.id
      );
    }
  };

  const submitKidsGoodDeed = (title: string, description: string) => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    let added = false;
    setChildrenProfiles((prev) =>
      prev.map((child) => {
        if (child.id !== activeChild.id) return child;
        const alreadyPendingSameTitle = child.goodDeeds.some(
          (d) => !d.parentConfirmed && d.title.toLowerCase() === cleanTitle.toLowerCase()
        );
        if (alreadyPendingSameTitle) return child;
        added = true;
        return {
          ...child,
          goodDeeds: [
            {
              id: `gd_${Date.now()}`,
              title: cleanTitle,
              description,
              childReportedAt: 'Just now (Awaiting Parent Confirmation)',
              parentConfirmed: false,
            },
            ...child.goodDeeds,
          ],
        };
      })
    );
    if (added) {
      logLearningEvent(
        'lesson_completed',
        `kids_deed_submitted_${cleanTitle.toLowerCase().replace(/\s+/g, '_')}`,
        `Reported Good Deed: ${cleanTitle}`,
        'kids',
        activeChild.id
      );
    }
  };

  const confirmChildGoodDeed = (childId: string, deedId: string) => {
    let confirmedTitle = 'Good Deed';
    let newlyConfirmed = false;
    setChildrenProfiles((prev) =>
      prev.map((child) => {
        if (child.id !== childId) return child;
        const targetDeed = child.goodDeeds.find((d) => d.id === deedId);
        // Prevent duplicate +10 star award if already confirmed
        if (!targetDeed || targetDeed.parentConfirmed) return child;
        newlyConfirmed = true;
        confirmedTitle = targetDeed.title;
        const draft: ChildProfile = {
          ...child,
          stars: child.stars + 10,
          pillarProgress: {
            ...child.pillarProgress,
            akhlaqDeeds: child.pillarProgress.akhlaqDeeds + 1,
          },
          goodDeeds: child.goodDeeds.map((d) =>
            d.id === deedId ? { ...d, parentConfirmed: true } : d
          ),
        };
        const badgeEval = evaluateChildBadgesAndMilestones(draft);
        return {
          ...draft,
          earnedBadgeIds: badgeEval.earnedBadgeIds,
          unlockedAdventureNode: badgeEval.unlockedAdventureNode,
        };
      })
    );
    if (newlyConfirmed) {
      logLearningEvent(
        'lesson_completed',
        `kids_deed_confirmed_${deedId}`,
        `Parent Verified Good Deed: ${confirmedTitle}`,
        'kids',
        childId
      );
    }
  };

  const incrementTasbih = () => {
    setUser((prev) => {
      const nextCount = prev.tasbihCount + 1;
      const nextTotal = prev.tasbihTotal + 1;
      const key = String(prev.activeDhikrIndex || 0);
      const prevDhikrCounts = prev.dhikrCounts || {};
      if (nextCount % 33 === 0) {
        logLearningEvent('tasbih_milestone', `dhikr_${key}_${nextTotal}`, `Completed 33 Dhikr cycle`);
      }
      return {
        ...prev,
        tasbihCount: nextCount,
        tasbihTotal: nextTotal,
        dhikrCounts: {
          ...prevDhikrCounts,
          [key]: (prevDhikrCounts[key] || 0) + 1,
        },
      };
    });
  };

  const resetTasbih = () => {
    setUser((prev) => ({
      ...prev,
      tasbihCount: 0,
    }));
  };

  const setActiveDhikr = (idx: number) => {
    setUser((prev) => ({
      ...prev,
      activeDhikrIndex: idx,
      tasbihCount: 0,
    }));
  };

  const exportAllDataJson = () => {
    const exportedAtIso = new Date().toISOString();
    setUser((prev) => ({
      ...prev,
      lastBackupExportedAtIso: exportedAtIso,
    }));
    return createBackupBundle({
      ...currentMasterStateSnapshot,
      user: {
        ...currentMasterStateSnapshot.user,
        lastBackupExportedAtIso: exportedAtIso,
      },
    });
  };

  const isParentPinConfigured = Boolean(
    user.parentPinSetupCompleted || user.parentPinVerifier || user.parentPin
  );

  const [pendingPinSetup, setPendingPinSetup] = useState<PendingParentPinSetup | null>(null);

  const verifyEnteredParentPin = async (enteredPin: string): Promise<boolean> => {
    const targetVerifier = user.parentPinVerifier || user.parentPin;
    if (!targetVerifier) return false;
    return verifyParentPinAsync(enteredPin, targetVerifier);
  };

  const unlockKidsScreenTime = (
    pin: string,
    action: 'grant_10m' | 'grant_15m' | 'unlock_today'
  ): { ok: boolean; error?: string } => {
    if (!activeChild) {
      return { ok: false, error: 'No active child profile found.' };
    }
    const res = unlockChildScreenTimeWithPin({
      child: activeChild,
      enteredPin: pin,
      storedParentPin: user.parentPin,
      storedPinVerifier: user.parentPinVerifier,
      action,
      now: new Date(),
      resetHour: user.kidsDailyResetHour ?? 0,
    });
    if (!res.ok) {
      return { ok: false, error: res.error };
    }
    setChildrenProfiles((prev) =>
      prev.map((c) => (c.id === activeChild.id ? res.updatedChild : c))
    );
    return { ok: true };
  };

  const unlockKidsScreenTimeAsync = async (
    pin: string,
    action: 'grant_10m' | 'grant_15m' | 'unlock_today'
  ): Promise<{ ok: boolean; error?: string }> => {
    if (!activeChild) {
      return { ok: false, error: 'No active child profile found.' };
    }
    const okPin = await verifyEnteredParentPin(pin);
    if (!okPin) {
      return {
        ok: false,
        error: 'Incorrect Parent PIN. Please enter the 4-digit PIN set in Parent Hub.',
      };
    }
    const now = new Date();
    const resetHour = user.kidsDailyResetHour ?? 0;
    const rolled = ensureChildUsagePeriodRollover(activeChild, now, resetHour);
    const updatedChild: ChildProfile =
      action === 'unlock_today'
        ? {
            ...rolled,
            screenTimeUnlockedForPeriodKey: rolled.usagePeriodKey,
          }
        : {
            ...rolled,
            extraMinutesGrantedToday:
              (rolled.extraMinutesGrantedToday || 0) + (action === 'grant_15m' ? 15 : 10),
          };

    setChildrenProfiles((prev) =>
      prev.map((c) => (c.id === activeChild.id ? updatedChild : c))
    );
    return { ok: true };
  };

  const redeemParentTimeVoucherAsync = async (
    voucherCode: string
  ): Promise<{ ok: boolean; action?: 'grant_10m' | 'grant_15m' | 'unlock_today'; error?: string }> => {
    if (!activeChild) {
      return { ok: false, error: 'No active child profile found.' };
    }
    const check = await verifyAndRedeemParentTimeVoucher({
      code: voucherCode,
      childId: activeChild.id,
      signingKey: user.parentPinVerifier,
    });
    if (!check.ok || !check.action) {
      return { ok: false, error: check.error || 'Voucher could not be verified.' };
    }
    const now = new Date();
    const resetHour = user.kidsDailyResetHour ?? 0;
    const rolled = ensureChildUsagePeriodRollover(activeChild, now, resetHour);
    const updatedChild: ChildProfile =
      check.action === 'unlock_today'
        ? {
            ...rolled,
            screenTimeUnlockedForPeriodKey: rolled.usagePeriodKey,
          }
        : {
            ...rolled,
            extraMinutesGrantedToday:
              (rolled.extraMinutesGrantedToday || 0) + (check.action === 'grant_15m' ? 15 : 10),
          };
    setChildrenProfiles((prev) =>
      prev.map((c) => (c.id === activeChild.id ? updatedChild : c))
    );
    return { ok: true, action: check.action };
  };

  const beginParentPinSetup = async (
    currentPin: string,
    newPin: string
  ): Promise<{ ok: boolean; error?: string; recoveryCode?: string }> => {
    if (isParentPinConfigured) {
      const validCurrent = await verifyEnteredParentPin(currentPin);
      if (!validCurrent) {
        return { ok: false, error: 'Current 4-digit Parent PIN is incorrect.' };
      }
    }
    if (!isValidParentPinFormat(newPin)) {
      return { ok: false, error: 'New Parent PIN must be exactly 4 digits (0-9).' };
    }

    const pinVerifier = await createParentPinVerifierAsync(newPin.trim());
    const generated = await generateParentRecoveryCodeAsync();

    // Hold in pending memory state ONLY — do NOT persist to user/IndexedDB until parent confirms saving the recovery code!
    setPendingPinSetup({
      recoveryCode: generated.recoveryCode,
      recoveryHash: generated.recoveryHash,
      pinVerifier,
      mode: isParentPinConfigured ? 'change_pin' : 'initial_setup',
    });

    return {
      ok: true,
      recoveryCode: generated.recoveryCode,
    };
  };

  const beginRecoveryCodeRegeneration = async (
    currentPin: string
  ): Promise<{ ok: boolean; error?: string; recoveryCode?: string }> => {
    if (!isParentPinConfigured) {
      return { ok: false, error: 'Please set up a 4-digit Parent PIN first.' };
    }
    const validCurrent = await verifyEnteredParentPin(currentPin);
    if (!validCurrent) {
      return { ok: false, error: 'Current 4-digit Parent PIN is incorrect.' };
    }

    const pinVerifier =
      user.parentPinVerifier && user.parentPinVerifier.startsWith('pin_pbkdf2_v2$')
        ? user.parentPinVerifier
        : await createParentPinVerifierAsync(currentPin.trim());
    const generated = await generateParentRecoveryCodeAsync();

    setPendingPinSetup({
      recoveryCode: generated.recoveryCode,
      recoveryHash: generated.recoveryHash,
      pinVerifier,
      mode: 'regenerate_recovery',
    });

    return {
      ok: true,
      recoveryCode: generated.recoveryCode,
    };
  };

  const confirmPendingParentPinSetup = (): { ok: boolean; error?: string } => {
    if (!pendingPinSetup) {
      return { ok: false, error: 'No pending Parent PIN or recovery code setup to confirm.' };
    }
    const nowIso = new Date().toISOString();
    const committed = pendingPinSetup;
    setUser((prev) => ({
      ...prev,
      parentPin: undefined,
      parentPinVerifier: committed.pinVerifier,
      parentPinSetupCompleted: true,
      parentPinRecoveryHash: committed.recoveryHash,
      parentPinRecoveryCreatedAtIso: nowIso,
      recoveryCodeUsedAtIso: undefined,
    }));
    setPendingPinSetup(null);
    return { ok: true };
  };

  const cancelPendingParentPinSetup = () => {
    setPendingPinSetup(null);
  };

  const setupParentPinWithRecovery = (
    currentPin: string,
    newPin: string
  ): { ok: boolean; error?: string; recoveryCode?: string } => {
    if (isParentPinConfigured && !verifyParentPin(currentPin, user.parentPinVerifier || user.parentPin)) {
      return { ok: false, error: 'Current 4-digit Parent PIN is incorrect.' };
    }
    if (!isValidParentPinFormat(newPin)) {
      return { ok: false, error: 'New Parent PIN must be exactly 4 digits (0-9).' };
    }
    const generated = generateParentRecoveryCode();
    const pinVerifier = createParentPinVerifierSync(newPin.trim());
    setPendingPinSetup({
      recoveryCode: generated.recoveryCode,
      recoveryHash: generated.recoveryHash,
      pinVerifier,
      mode: isParentPinConfigured ? 'change_pin' : 'initial_setup',
    });
    return {
      ok: true,
      recoveryCode: generated.recoveryCode,
    };
  };

  const generateNewRecoveryCodeForCurrentPin = (
    currentPin: string
  ): { ok: boolean; error?: string; recoveryCode?: string } => {
    if (!verifyParentPin(currentPin, user.parentPinVerifier || user.parentPin)) {
      return { ok: false, error: 'Current 4-digit Parent PIN is incorrect.' };
    }
    const generated = generateParentRecoveryCode();
    const pinVerifier = user.parentPinVerifier || createParentPinVerifierSync(currentPin.trim());
    setPendingPinSetup({
      recoveryCode: generated.recoveryCode,
      recoveryHash: generated.recoveryHash,
      pinVerifier,
      mode: 'regenerate_recovery',
    });
    return {
      ok: true,
      recoveryCode: generated.recoveryCode,
    };
  };

  const resetParentPinWithRecoveryCode = (
    recoveryCode: string,
    newPin: string
  ): { ok: boolean; error?: string } => {
    const res = verifyRecoveryCodeAndResetPin({
      enteredRecoveryCode: recoveryCode,
      storedRecoveryHash: user.parentPinRecoveryHash,
      newPin,
    });
    if (!res.ok || !res.nextPinVerifier) {
      return { ok: false, error: res.error };
    }
    const nowIso = new Date().toISOString();
    setUser((prev) => ({
      ...prev,
      parentPin: undefined,
      parentPinVerifier: res.nextPinVerifier!,
      parentPinSetupCompleted: true,
      parentPinRecoveryHash: undefined,
      recoveryCodeUsedAtIso: nowIso,
    }));
    return { ok: true };
  };

  const resetParentPinWithRecoveryCodeAsync = async (
    recoveryCode: string,
    newPin: string
  ): Promise<{ ok: boolean; error?: string }> => {
    const res = await verifyRecoveryCodeAndResetPinAsync({
      enteredRecoveryCode: recoveryCode,
      storedRecoveryHash: user.parentPinRecoveryHash,
      newPin,
    });
    if (!res.ok || !res.nextPinVerifier) {
      return { ok: false, error: res.error };
    }
    const nowIso = new Date().toISOString();
    setUser((prev) => ({
      ...prev,
      parentPin: undefined,
      parentPinVerifier: res.nextPinVerifier!,
      parentPinSetupCompleted: true,
      parentPinRecoveryHash: undefined,
      recoveryCodeUsedAtIso: nowIso,
    }));
    return { ok: true };
  };

  const downloadSurahOffline = async (
    surahNumber: number
  ): Promise<{ ok: boolean; error?: string }> => {
    const res = await downloadSurahForOfflineUse(
      surahNumber,
      user.language,
      user.reciterName
    );
    await refreshStorageMetrics();
    return { ok: res.ok, error: res.error };
  };

  const deleteOfflineSurah = async (surahNumber: number): Promise<void> => {
    await removeDownloadedOfflineSurah(surahNumber);
    await refreshStorageMetrics();
  };

  const clearCachedOnlineData = async (): Promise<{
    clearedSurahs: number;
    clearedPrayerCaches: number;
  }> => {
    const res = await clearNonDownloadedApiCache();
    await refreshStorageMetrics();
    return res;
  };

  const previewBackupImport = (rawJson: string): BackupValidationResult => {
    return validateAndPreviewBackupJson(rawJson, normalizePersistedMasterState, {
      currentLocalUser: user,
    });
  };

  const applyBackupImport = async (
    rawJson: string
  ): Promise<{ ok: boolean; error?: string; recoveryCreatedAtIso?: string }> => {
    const validation = validateAndPreviewBackupJson(rawJson, normalizePersistedMasterState, {
      currentLocalUser: user,
    });
    if (!validation.valid || !validation.normalizedState) {
      return {
        ok: false,
        error: validation.errors.join(' ') || 'Invalid backup file.',
      };
    }

    const res = await applyValidatedImportWithRecovery(
      validation.normalizedState,
      currentMasterStateSnapshot
    );
    if (!res.ok) {
      await refreshStorageMetrics();
      return res;
    }

    applyNormalizedMasterStateToReact(res.appliedState || validation.normalizedState);
    await refreshStorageMetrics();
    return res;
  };

  const restorePreImportBackup = async (): Promise<{ ok: boolean; error?: string }> => {
    const res = await restorePreImportRecoverySnapshot(normalizePersistedMasterState);
    if (!res.ok || !res.restoredState) {
      return { ok: false, error: res.error };
    }
    applyNormalizedMasterStateToReact(res.restoredState);
    await refreshStorageMetrics();
    return { ok: true };
  };

  return (
    <IlmizoContext.Provider
      value={{
        mode,
        setMode,
        adultRoute,
        setAdultRoute,
        kidsRoute,
        setKidsRoute: setKidsRouteGuarded,
        adultHistory,
        kidsHistory,
        canGoBack,
        goBack,
        registerSubScreenBackHandler,
        parentHubUnlocked,
        setParentHubUnlocked,
        selectedSurahNumber,
        openSurahForReading,
        dailyVerseActivity,
        recordVerseRead,
        learningEvents,
        logLearningEvent,
        studiedNames99Numbers,
        markName99Studied,
        recentlyOpenedSurahs,
        user: { ...effectiveUser, darkMode: resolvedTheme === 'dark', themeMode },
        updateUser,
        themeMode,
        resolvedTheme,
        setThemeMode,
        autoPlayRecitation,
        toggleAutoPlayRecitation,
        isAudioMuted,
        toggleAudioMute,
        setLanguage,
        languageMeta,
        uiLabels,
        translate,
        resolveText,
        bookmarks,
        toggleBookmark,
        updateBookmarkMeta,
        personalNotes,
        addPersonalNote,
        editPersonalNote,
        deletePersonalNote,
        hifzPlans,
        updateHifzProgress,
        addHifzPlan,
        resetHifzPlan,
        canUndoHifz: Boolean(hifzUndoSnapshot),
        undoLastHifzAction,
        revisionItems,
        recordRevisionAttempt,
        salahRecords,
        togglePrayerStatus,
        setPrayerStatusExplicit,
        toggleExcusedSalahDay,
        salahAnalytics,
        setUserMadhhab,
        toggleExcusedPrayerMode,
        favoriteDuaIds,
        toggleFavoriteDua,
        seerahMilestoneIds,
        toggleSeerahMilestone,
        completedLessonIds,
        markLessonCompleted,
        masteredVocabIds,
        toggleVocabMastered,
        quizAttempts,
        recordQuizAttempt,
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        expenses,
        addExpense,
        deleteExpense,
        childrenProfiles,
        activeChildId,
        activeChild,
        setActiveChildId,
        addChildProfile,
        updateChildProfile,
        deleteChildProfile,
        completeKidsQuestStep,
        completeKidsStory,
        completeQaidaLesson,
        addNeedsPracticeItem,
        resolveNeedsPracticeItem,
        submitKidsGoodDeed,
        confirmChildGoodDeed,
        incrementTasbih,
        resetTasbih,
        setActiveDhikr,
        exportAllDataJson,
        isKidsScreenTimeLocked,
        isParentPinConfigured,
        verifyEnteredParentPin,
        unlockKidsScreenTime,
        unlockKidsScreenTimeAsync,
        redeemParentTimeVoucherAsync,
        pendingPinSetup,
        beginParentPinSetup,
        beginRecoveryCodeRegeneration,
        confirmPendingParentPinSetup,
        cancelPendingParentPinSetup,
        setupParentPinWithRecovery,
        generateNewRecoveryCodeForCurrentPin,
        resetParentPinWithRecoveryCode,
        resetParentPinWithRecoveryCodeAsync,
        storageMetrics,
        refreshStorageMetrics,
        downloadSurahOffline,
        deleteOfflineSurah,
        clearCachedOnlineData,
        previewBackupImport,
        applyBackupImport,
        restorePreImportBackup,
      }}
    >
      {children}
    </IlmizoContext.Provider>
  );
};

export function useIlmizo() {
  const ctx = useContext(IlmizoContext);
  if (!ctx) throw new Error('useIlmizo must be used inside IlmizoProvider');
  return ctx;
}

export function useTranslation() {
  const { user, setLanguage, languageMeta, uiLabels, translate, resolveText } = useIlmizo();
  return {
    language: user.language,
    setLanguage,
    languageMeta,
    isRTL: languageMeta.dir === 'rtl',
    uiLabels,
    t: translate,
    translate,
    resolveText,
    supportedLanguages: translationService.getSupportedLanguages(),
  };
}
