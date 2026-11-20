export type AppMode = 'adult' | 'kids' | 'parent';

export type AdultRoute =
  | 'home'
  | 'quran_list'
  | 'quran_read'
  | 'quran_journal'
  | 'hifz'
  | 'salah'
  | 'duas'
  | 'names99'
  | 'seerah'
  | 'lessons'
  | 'quizzes'
  | 'progress'
  | 'qibla'
  | 'tasbih'
  | 'calendar'
  | 'tasks_expenses'
  | 'more'
  | 'profile';

export type KidsRoute =
  | 'kids_home'
  | 'todays_quest'
  | 'quran_learning'
  | 'recitation_practice'
  | 'duas_learning'
  | 'salah_learning'
  | 'stories'
  | 'adventure_map'
  | 'daily_quiz'
  | 'good_deed'
  | 'family_challenge'
  | 'mission_complete'
  | 'kids_progress'
  | 'needs_practice'
  | 'badges'
  | 'certificate';

export type LanguageCode =
  | 'en'
  | 'hi'
  | 'hinglish'
  | 'ar'
  | 'ur'
  | 'tr'
  | 'id'
  | 'bn'
  | 'fa'
  | 'fr'
  | 'es';

export type CoreSupportedLanguage = 'en' | 'hi' | 'ur' | 'hinglish' | 'ar';

export type ContentReviewStatus =
  | 'DRAFT'
  | 'SOURCE_VERIFIED'
  | 'REVIEW_REQUIRED'
  | 'APPROVED'
  | 'PUBLISHED';

export interface ContentRegistryMetadata {
  id: string;
  contentType:
    | 'quran_surah'
    | 'dua_adhkar'
    | 'kids_story'
    | 'adult_lesson'
    | 'seerah_event'
    | 'quiz_question'
    | 'quran_vocab'
    | 'salah_guide'
    | 'asma_ul_husna';
  language: string;
  availableLanguages?: CoreSupportedLanguage[];
  source: string;
  reviewStatus: ContentReviewStatus;
  ageSuitability: 'Kids 5-8' | 'Kids 7-12' | 'Teens & Adults' | 'All Ages';
  version: string;
  lastUpdatedIso: string;
  offlineAvailable: boolean;
  authenticityType?: 'Canonical Text' | 'Authenticated Hadith/Seerah' | 'Educational Moral Adaptation';
}

export interface VerificationMetadata {
  source: string;
  edition: string;
  reference: string;
  language: string;
  version: string;
  reviewer: string;
  status: 'Verified' | 'Under Review' | 'Draft' | 'Needs Correction';
  reviewStatusCode?: ContentReviewStatus;
  grade?: string;
}

export interface SurahMeta {
  number: number;
  nameArabic: string;
  nameTranslit: string;
  nameEnglish: string;
  ayahCount: number;
  revelationType: 'Meccan' | 'Madani';
  juz: number;
  bundledOffline?: boolean;
}

export interface JuzBoundary {
  juz: number;
  nameArabic: string;
  nameTranslit: string;
  startSurahNumber: number;
  startSurahName: string;
  startAyahNumber: number;
  endSurahNumber: number;
  endAyahNumber: number;
}

export interface AyahItem {
  numberInSurah: number;
  globalNumber?: number;
  arabicUthmani: string;
  transliteration: string;
  translations: Partial<Record<LanguageCode, string>> & { en: string };
  audioUrl?: string;
  tafsirBrief: string;
  mushafPage?: number;
  juzNumber?: number;
}

export interface SurahPayload {
  meta: SurahMeta;
  ayahs: AyahItem[];
  verification: VerificationMetadata;
  offlineUnavailable?: boolean;
  isPartialOfflineBundle?: boolean;
  offlineSourceType?: 'bundled_full' | 'bundled_partial' | 'downloaded_idb' | 'cached_idb' | 'live_api' | 'unavailable';
  validationError?: string;
}

export interface DailyVerseActivity {
  dateKey: string; // Local calendar YYYY-MM-DD
  ayahKeys: string[]; // Unique "${surahNumber}:${ayahNumber}" read on dateKey
}

export type LearningEventType =
  | 'quran_ayah_read'
  | 'hifz_revision'
  | 'hifz_progress'
  | 'salah_logged'
  | 'dua_studied'
  | 'name99_studied'
  | 'seerah_completed'
  | 'lesson_completed'
  | 'vocab_mastered'
  | 'quiz_completed'
  | 'tasbih_milestone';

export interface LearningEvent {
  id: string;
  type: LearningEventType;
  timestampIso: string;
  dateKey: string; // Local calendar YYYY-MM-DD
  mode: 'adult' | 'kids';
  childId?: string;
  referenceId: string;
  title: string;
  value?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface QuranBookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  arabicSnippet: string;
  note?: string;
  folder?: string;
  customLabel?: string;
  readingList?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PersonalNote {
  id: string;
  title: string;
  body: string;
  surahReference?: string;
  surahNumber?: number;
  ayahNumber?: number;
  tags?: string[];
  tadabburPrompt?: string;
  noteType?: 'note' | 'tadabbur' | 'hifz_note';
  createdAt: string;
  updatedAt?: string;
}

export type HifzMemorizationState =
  | 'not_started'
  | 'learning'
  | 'memorized'
  | 'revision_due'
  | 'mastered';

export interface HifzRevisionSessionRecord {
  id: string;
  timestampIso: string;
  dateKey: string;
  surahNumber: number;
  ayahRange: string;
  quality: 'Fluent' | 'Good' | 'Needs Work';
  difficulty: 'easy' | 'medium' | 'hard';
  notes?: string;
}

export interface HifzPlan {
  id?: string;
  surahNumber: number;
  surahName: string;
  totalAyahs: number;
  memorizedAyahs: number;
  lastPracticedAt: string;
  lastPracticedAtIso?: string;
  status: 'completed' | 'in_progress' | 'not_started';
  memorizationState?: HifzMemorizationState;
  dailyTargetAyahs?: number;
  practiceDays?: string[];
  ayahRange?: string;
  startAyah?: number;
  endAyah?: number;
  personalNotes?: string;
}

export interface RevisionItem {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahRange: string;
  startAyah?: number;
  endAyah?: number;
  dueStatus: 'due_today' | 'overdue' | 'upcoming';
  dueDate: string;
  nextReviewAt?: string; // Local calendar YYYY-MM-DD
  lastPracticedAt?: string; // ISO 8601 timestamp
  intervalDays: number;
  difficulty: 'easy' | 'medium' | 'hard';
  attemptsCount: number;
  lastSelfReport?: 'Fluent' | 'Good' | 'Needs Work';
  memorizationState?: HifzMemorizationState;
  personalNotes?: string;
  sessionHistory?: HifzRevisionSessionRecord[];
}

export type PrayerName = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

export type PrayerStatus = 'prayed_on_time' | 'prayed' | 'qaza' | 'pending' | 'excused';

export type MadhhabCode = 'Hanafi' | 'Shafii' | 'Maliki' | 'Hanbali';

export interface SalahDayRecord {
  date: string; // YYYY-MM-DD
  prayers: Record<PrayerName, PrayerStatus>;
  sunnahCompleted: number;
  isExcusedDay?: boolean;
  excusedNote?: string;
  updatedAtIso?: string;
}

export type DuaCategory =
  | 'morning_evening'
  | 'morning_adhkar'
  | 'evening_adhkar'
  | 'eating'
  | 'travel'
  | 'sleep'
  | 'waking'
  | 'home'
  | 'mosque'
  | 'family'
  | 'parents'
  | 'health'
  | 'protection'
  | 'distress'
  | 'gratitude'
  | 'forgiveness'
  | 'daily_routine';

export interface DuaItem {
  id: string;
  category: DuaCategory;
  title: string;
  localizedTitles?: Partial<Record<LanguageCode, string>>;
  kidsTitle?: string;
  localizedKidsTitles?: Partial<Record<LanguageCode, string>>;
  arabic: string;
  transliteration: string;
  translations: Partial<Record<LanguageCode, string>> & { en: string };
  whenToUse: string;
  localizedWhenToUse?: Partial<Record<LanguageCode, string>>;
  grade?: string;
  audioUrl?: string;
  verification: VerificationMetadata;
  registryMeta?: ContentRegistryMetadata;
  isFavorite?: boolean;
}

export interface AsmaUlHusnaItem {
  number: number;
  arabic: string;
  transliteration: string;
  meaning: string;
  translations: Partial<Record<LanguageCode, string>> & { en: string };
  reflection: string;
  localizedReflections?: Partial<Record<LanguageCode, string>>;
  verification: VerificationMetadata;
}

export interface SeerahEvent {
  id: string;
  period: string;
  years: string;
  title: string;
  localizedTitles?: Partial<Record<LanguageCode, string>>;
  location: 'Makkah' | 'Madinah' | 'Taif' | 'Badr' | 'Hudaybiyyah' | 'Uhud' | 'Khandaq' | 'Quba';
  coordinates: { x: number; y: number };
  summary: string;
  localizedSummaries?: Partial<Record<LanguageCode, string>>;
  keyLesson: string;
  localizedKeyLessons?: Partial<Record<LanguageCode, string>>;
  historicalStatus?: 'Established Consensus' | 'Authenticated Report';
  verification: VerificationMetadata;
  registryMeta?: ContentRegistryMetadata;
}

export type LessonCategory =
  | 'Aqidah'
  | 'Akhlaq'
  | 'Fiqh'
  | 'History'
  | 'Tawheed'
  | 'Salah'
  | 'Wudu'
  | 'Fasting'
  | 'Zakat'
  | 'Hajj'
  | 'Family'
  | 'Worship';

export interface IslamicLesson {
  id: string;
  category: LessonCategory;
  title: string;
  localizedTitles?: Partial<Record<LanguageCode, string>>;
  subtitle: string;
  localizedSubtitles?: Partial<Record<LanguageCode, string>>;
  durationMin: number;
  learningObjectives?: string[];
  localizedObjectives?: Partial<Record<LanguageCode, string[]>>;
  content: string[];
  localizedContent?: Partial<Record<LanguageCode, string[]>>;
  keyTakeaway: string;
  localizedKeyTakeaways?: Partial<Record<LanguageCode, string>>;
  reflectionQuestion?: string;
  localizedReflectionQuestions?: Partial<Record<LanguageCode, string>>;
  shortQuiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  verification: VerificationMetadata;
  registryMeta?: ContentRegistryMetadata;
  completed?: boolean;
}

export interface KidsStoryComprehensionQuestion {
  question: string;
  localizedQuestions?: Partial<Record<LanguageCode, string>>;
  options: string[];
  localizedOptions?: Partial<Record<LanguageCode, string[]>>;
  correctIndex: number;
  explanation: string;
}

export interface KidsStoryItem {
  id: string;
  title: string;
  localizedTitles?: Partial<Record<LanguageCode, string>>;
  category:
    | 'Prophets'
    | 'Companions'
    | 'Akhlaq'
    | 'Honesty'
    | 'Kindness'
    | 'Parents'
    | 'Helping'
    | 'Patience'
    | 'Gratitude'
    | 'Animals'
    | 'Manners'
    | 'Responsibility'
    | 'Truthfulness';
  ageRange?: string;
  duration: string;
  themeColor: string;
  badgeIcon: string;
  summary: string;
  localizedSummaries?: Partial<Record<LanguageCode, string>>;
  pages: string[];
  localizedPages?: Partial<Record<LanguageCode, string[]>>;
  learningObjective?: string;
  localizedObjectives?: Partial<Record<LanguageCode, string>>;
  moral: string;
  localizedMorals?: Partial<Record<LanguageCode, string>>;
  sourceReference?: string;
  authenticityLabel?: 'Quran & Sahih Hadith Account' | 'Historical Biography' | 'Illustrative Moral Adaptation';
  comprehensionQuestions?: KidsStoryComprehensionQuestion[];
  reflectionActivity?: string;
  localizedReflectionActivities?: Partial<Record<LanguageCode, string>>;
  registryMeta?: ContentRegistryMetadata;
}

export interface QuranVocabWord {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  localizedMeanings?: Partial<Record<LanguageCode, string>>;
  rootLetters: string;
  occurrencesInQuran: number;
  frequencySource?: string;
  exampleAyah: string;
  exampleRef: string;
  frequencyRank?: number;
  grammarType?: 'Preposition' | 'Noun' | 'Verb' | 'Particle' | 'Pronoun' | 'Adjective' | 'Conjunction' | string;
  cumulativeCoveragePct?: number;
  romanUrduMeaning?: string;
  exampleTranslationEn?: string;
  exampleTranslationRomanUrdu?: string;
  category?: 'Core Particles' | 'Nouns & Names' | 'Verbs & Actions' | 'Worship & Ethics' | string;
  mastered?: boolean;
  nextReviewAt?: string;
  intervalDays?: number;
  reviewCount?: number;
  registryMeta?: ContentRegistryMetadata;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  localizedPrompts?: Partial<Record<LanguageCode, string>>;
  options: string[];
  localizedOptions?: Partial<Record<LanguageCode, string[]>>;
  correctIndex: number;
  explanation: string;
  localizedExplanations?: Partial<Record<LanguageCode, string>>;
  pillar: 'quran' | 'duas' | 'salah' | 'akhlaq' | 'history';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  ageGroup?: 'Kids' | 'Adult' | 'All';
  reference: string;
}

export interface QuizPack {
  id: string;
  title: string;
  localizedTitles?: Partial<Record<LanguageCode, string>>;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Kids';
  category: string;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  score: number;
  total: number;
  completedAt: string;
  completedAtIso?: string;
  dateKey?: string;
  mode: 'adult' | 'kids';
  childId?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  category: 'Deen' | 'Family' | 'Work' | 'Personal';
  prayerAnchor?: PrayerName | 'Anytime';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate: string;
}

export interface ExpenseEntry {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'sadaqah' | 'zakat';
  category: 'Household' | 'Food' | 'Education' | 'Sadaqah' | 'Zakat' | 'Salary' | 'Other';
  date: string;
  note?: string;
}

export interface NeedsPracticeItem {
  id: string;
  pillar: 'quran' | 'duas' | 'salah' | 'akhlaq';
  title: string;
  prompt: string;
  arabic?: string;
  transliteration?: string;
  targetRoute: KidsRoute;
  mistakeCount: number;
  lastAttemptAt: string;
  resolved: boolean;
}

export interface GoodDeedRecord {
  id: string;
  title: string;
  description: string;
  childReportedAt: string;
  parentConfirmed: boolean;
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: 'Ayaan' | 'Ayla' | 'Mizo';
  dailyGoalMinutes: number;
  activeMinutesToday: number;
  activeSecondsToday?: number;
  extraMinutesGrantedToday?: number;
  screenTimeUnlockedForPeriodKey?: string;
  usagePeriodKey?: string;
  lastUsageTimestampMs?: number;
  clockTamperDetected?: boolean;
  stars: number;
  streakDays: number;
  questStepsCompleted: Record<'quran' | 'dua' | 'quiz' | 'salah' | 'family', boolean>;
  pillarProgress: {
    quranLessons: number;
    duasPracticed: number;
    salahLessons: number;
    akhlaqDeeds: number;
  };
  unlockedAdventureNode: number; // 1 to 6
  needsPractice: NeedsPracticeItem[];
  goodDeeds: GoodDeedRecord[];
  earnedBadgeIds: string[];
  completedSurahs: string[];
  completedStoryIds?: string[];
  completedQaidaLessonIds?: string[];
  qaidaQuizScores?: Record<string, number>;
  lastActiveDateKey?: string;
  recentActivities: {
    id: string;
    title: string;
    pillar: 'quran' | 'duas' | 'salah' | 'akhlaq' | 'family';
    timestamp: string;
  }[];
}

export type EntitlementTier = 'free' | 'individual_99' | 'family_199' | 'lifetime_499';

export interface CalendarReminderPreferences {
  whiteDays: boolean;
  mondayThursday: boolean;
  ashura: boolean;
  ramadan: boolean;
  arafah: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface UserProfile {
  name: string;
  city: string;
  country: string;
  language: LanguageCode;
  darkMode: boolean;
  themeMode?: ThemeMode;
  arabicFontScale: number; // 1 to 4
  showTranslation?: boolean;
  parentPin?: string;
  parentPinVerifier?: string;
  parentPinSetupCompleted?: boolean;
  parentPinRecoveryHash?: string;
  parentPinRecoveryCreatedAtIso?: string;
  recoveryCodeUsedAtIso?: string;
  kidsDailyResetHour?: number; // 0 to 23 local hour
  lastBackupExportedAtIso?: string;
  entitlement: EntitlementTier;
  trialStartedAtIso?: string;
  trialEndsAtIso?: string;
  subscriptionPurchaseSource?: 'none' | 'local_trial' | 'google_play';
  subscriptionSku?: string;
  subscriptionOrderId?: string;
  subscriptionUpdatedAtIso?: string;
  subscriptionLastVerifiedAtIso?: string;
  subscriptionProofToken?: string;
  subscriptionAutoRenewing?: boolean;
  streakDays: number;
  lastRead: {
    surahNumber: number;
    surahName: string;
    ayahNumber: number;
  };
  tasbihCount: number;
  tasbihTarget?: number;
  tasbihTotal: number;
  activeDhikrIndex: number;
  dhikrCounts?: Record<string, number>;
  autoPlayRecitation?: boolean;
  isMuted?: boolean;
  reciterName?: string;
  playbackRate?: number;
  prayerCalculationMethod?: number; // 1=Karachi, 2=ISNA, 3=MWL, 4=Umm al-Qura
  prayerAsrSchool?: number; // 0=Shafi/Standard, 1=Hanafi
  madhhab?: MadhhabCode; // Hanafi | Shafii | Maliki | Hanbali
  excusedPrayerModeEnabled?: boolean; // Optional private Women's Excused Prayer Mode
  soloAdultMode?: boolean; // Optional toggle for single adults
  hijriAdjustmentDays?: number; // -2 to +2
  calendarReminders?: CalendarReminderPreferences;
  aiTajweedUsage?: {
    dateKey: string;
    count: number;
  };
}

export type OfflineSurahAvailability =
  | 'downloaded'
  | 'bundled_full'
  | 'bundled_partial'
  | 'cached'
  | 'online_only';

export interface LocalStorageMetrics {
  backend: 'indexeddb' | 'memory_fallback';
  schemaVersion: number;
  migratedFromLegacyV1: boolean;
  legacyBackupPreserved: boolean;
  estimatedUsedBytes: number;
  estimatedQuotaBytes: number | null;
  downloadedSurahNumbers: number[];
  cachedSurahNumbers: number[];
  downloadedAudioKeys: string[];
  learningEventsCount: number;
  hasPreImportRecoverySnapshot: boolean;
  lastSavedAtIso: string | null;
  lastQuotaError: string | null;
}

export interface ImportPreviewSummary {
  schemaVersion: number;
  exportedAt: string;
  storageArchitecture: string;
  adultProfileName: string;
  adultCity: string;
  childProfilesCount: number;
  childNames: string[];
  bookmarksCount: number;
  personalNotesCount: number;
  hifzPlansCount: number;
  revisionItemsCount: number;
  salahDaysCount: number;
  learningEventsCount: number;
  quizAttemptsCount: number;
  tasksCount: number;
  expensesCount: number;
  certificatesCount?: number;
  badgesCount?: number;
  duplicatesRemovedCount?: number;
  warnings: string[];
}
