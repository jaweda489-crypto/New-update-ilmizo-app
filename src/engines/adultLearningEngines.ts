import {
  AyahItem,
  DailyVerseActivity,
  HifzMemorizationState,
  JuzBoundary,
  LearningEvent,
  PrayerName,
  QuizAttempt,
  QuizQuestion,
  RevisionItem,
  SalahDayRecord,
  SurahMeta,
  SurahPayload,
} from '../types/ilmizo';

// ============================================================================
// 1. LOCAL CALENDAR DATE & TIMEZONE HELPERS
// ============================================================================

export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getLocalDateKeyWithOffset(offsetDays: number, baseDate: Date = new Date()): string {
  const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
  d.setDate(d.getDate() + offsetDays);
  return getLocalDateKey(d);
}

// ============================================================================
// 2. QURAN ENGINE: 30-JUZ BOUNDARIES, VALIDATION & AYAH NAVIGATION
// ============================================================================

export const ALL_30_JUZ_BOUNDARIES: JuzBoundary[] = [
  { juz: 1, nameArabic: 'الم', nameTranslit: 'Alif Lam Meem', startSurahNumber: 1, startSurahName: 'Al-Fatiha', startAyahNumber: 1, endSurahNumber: 2, endAyahNumber: 141 },
  { juz: 2, nameArabic: 'سيقول', nameTranslit: 'Sayaqul', startSurahNumber: 2, startSurahName: 'Al-Baqarah', startAyahNumber: 142, endSurahNumber: 2, endAyahNumber: 252 },
  { juz: 3, nameArabic: 'تلك الرسل', nameTranslit: 'Tilkal-Rusul', startSurahNumber: 2, startSurahName: 'Al-Baqarah', startAyahNumber: 253, endSurahNumber: 3, endAyahNumber: 92 },
  { juz: 4, nameArabic: 'لن تنالوا', nameTranslit: 'Lan Tanalu', startSurahNumber: 3, startSurahName: 'Aal-Imran', startAyahNumber: 93, endSurahNumber: 4, endAyahNumber: 23 },
  { juz: 5, nameArabic: 'والمحصنات', nameTranslit: 'Wal-Muhsanat', startSurahNumber: 4, startSurahName: 'An-Nisa', startAyahNumber: 24, endSurahNumber: 4, endAyahNumber: 147 },
  { juz: 6, nameArabic: 'لا يحب الله', nameTranslit: 'La Yuhibbullah', startSurahNumber: 4, startSurahName: 'An-Nisa', startAyahNumber: 148, endSurahNumber: 5, endAyahNumber: 81 },
  { juz: 7, nameArabic: 'وإذا سمعوا', nameTranslit: 'Wa Idha Samiu', startSurahNumber: 5, startSurahName: "Al-Ma'idah", startAyahNumber: 82, endSurahNumber: 6, endAyahNumber: 110 },
  { juz: 8, nameArabic: 'ولو أننا', nameTranslit: 'Wa Law Annana', startSurahNumber: 6, startSurahName: "Al-An'am", startAyahNumber: 111, endSurahNumber: 7, endAyahNumber: 87 },
  { juz: 9, nameArabic: 'قال الملأ', nameTranslit: 'Qalal-Mala', startSurahNumber: 7, startSurahName: "Al-A'raf", startAyahNumber: 88, endSurahNumber: 8, endAyahNumber: 40 },
  { juz: 10, nameArabic: 'واعلموا', nameTranslit: "Wa'lamu", startSurahNumber: 8, startSurahName: 'Al-Anfal', startAyahNumber: 41, endSurahNumber: 9, endAyahNumber: 92 },
  { juz: 11, nameArabic: 'يعتذرون', nameTranslit: "Ya'tadhirun", startSurahNumber: 9, startSurahName: 'At-Tawbah', startAyahNumber: 93, endSurahNumber: 11, endAyahNumber: 5 },
  { juz: 12, nameArabic: 'وما من دابة', nameTranslit: 'Wa Ma Min Dabbah', startSurahNumber: 11, startSurahName: 'Hud', startAyahNumber: 6, endSurahNumber: 12, endAyahNumber: 52 },
  { juz: 13, nameArabic: 'وما أبرئ', nameTranslit: 'Wa Ma Ubarri', startSurahNumber: 12, startSurahName: 'Yusuf', startAyahNumber: 53, endSurahNumber: 14, endAyahNumber: 52 },
  { juz: 14, nameArabic: 'ربما', nameTranslit: 'Rubama', startSurahNumber: 15, startSurahName: 'Al-Hijr', startAyahNumber: 1, endSurahNumber: 16, endAyahNumber: 128 },
  { juz: 15, nameArabic: 'سبحان الذي', nameTranslit: 'Subhanal-Ladhi', startSurahNumber: 17, startSurahName: 'Al-Isra', startAyahNumber: 1, endSurahNumber: 18, endAyahNumber: 74 },
  { juz: 16, nameArabic: 'قال ألم', nameTranslit: 'Qala Alam', startSurahNumber: 18, startSurahName: 'Al-Kahf', startAyahNumber: 75, endSurahNumber: 20, endAyahNumber: 135 },
  { juz: 17, nameArabic: 'اقترب للناس', nameTranslit: 'Iqtaraba Lin-Nas', startSurahNumber: 21, startSurahName: 'Al-Anbiya', startAyahNumber: 1, endSurahNumber: 22, endAyahNumber: 78 },
  { juz: 18, nameArabic: 'قد أفلح', nameTranslit: 'Qad Aflaha', startSurahNumber: 23, startSurahName: "Al-Mu'minun", startAyahNumber: 1, endSurahNumber: 25, endAyahNumber: 20 },
  { juz: 19, nameArabic: 'وقال الذين', nameTranslit: 'Wa Qalal-Ladhina', startSurahNumber: 25, startSurahName: 'Al-Furqan', startAyahNumber: 21, endSurahNumber: 27, endAyahNumber: 55 },
  { juz: 20, nameArabic: 'أمن خلق', nameTranslit: 'Amman Khalaqa', startSurahNumber: 27, startSurahName: 'An-Naml', startAyahNumber: 56, endSurahNumber: 29, endAyahNumber: 45 },
  { juz: 21, nameArabic: 'اتل ما أوحي', nameTranslit: 'Utlu Ma Uhiya', startSurahNumber: 29, startSurahName: 'Al-Ankabut', startAyahNumber: 46, endSurahNumber: 33, endAyahNumber: 30 },
  { juz: 22, nameArabic: 'ومن يقنت', nameTranslit: 'Wa Man Yaqnut', startSurahNumber: 33, startSurahName: 'Al-Ahzab', startAyahNumber: 31, endSurahNumber: 36, endAyahNumber: 27 },
  { juz: 23, nameArabic: 'وما لي', nameTranslit: 'Wa Mali', startSurahNumber: 36, startSurahName: 'Ya-Sin', startAyahNumber: 28, endSurahNumber: 39, endAyahNumber: 31 },
  { juz: 24, nameArabic: 'فمن أظلم', nameTranslit: 'Faman Azlamu', startSurahNumber: 39, startSurahName: 'Az-Zumar', startAyahNumber: 32, endSurahNumber: 41, endAyahNumber: 46 },
  { juz: 25, nameArabic: 'إليه يرد', nameTranslit: 'Ilayhi Yuraddu', startSurahNumber: 41, startSurahName: 'Fussilat', startAyahNumber: 47, endSurahNumber: 45, endAyahNumber: 37 },
  { juz: 26, nameArabic: 'حم', nameTranslit: 'Ha Meem', startSurahNumber: 46, startSurahName: 'Al-Ahqaf', startAyahNumber: 1, endSurahNumber: 51, endAyahNumber: 30 },
  { juz: 27, nameArabic: 'قال فما خطبكم', nameTranslit: 'Qala Fama Khatbukum', startSurahNumber: 51, startSurahName: 'Adh-Dhariyat', startAyahNumber: 31, endSurahNumber: 57, endAyahNumber: 29 },
  { juz: 28, nameArabic: 'قد سمع الله', nameTranslit: 'Qad Sami Allah', startSurahNumber: 58, startSurahName: 'Al-Mujadila', startAyahNumber: 1, endSurahNumber: 66, endAyahNumber: 12 },
  { juz: 29, nameArabic: 'تبارك الذي', nameTranslit: 'Tabarakal-Ladhi', startSurahNumber: 67, startSurahName: 'Al-Mulk', startAyahNumber: 1, endSurahNumber: 77, endAyahNumber: 50 },
  { juz: 30, nameArabic: 'عم يتساءلون', nameTranslit: 'Amma Yatasaalun', startSurahNumber: 78, startSurahName: 'An-Naba', startAyahNumber: 1, endSurahNumber: 114, endAyahNumber: 6 },
];

export function validateSurahPayload(
  payload: SurahPayload | null | undefined,
  expectedMeta: SurahMeta,
  allowPartialOfflineBundle = false
): { valid: boolean; error?: string } {
  if (!payload || !payload.meta) {
    return { valid: false, error: 'Missing Surah payload or metadata.' };
  }
  if (payload.meta.number !== expectedMeta.number) {
    return {
      valid: false,
      error: `Surah identity mismatch: expected Surah ${expectedMeta.number}, received Surah ${payload.meta.number}.`,
    };
  }
  if (payload.offlineUnavailable) {
    return { valid: false, error: `Surah ${expectedMeta.nameTranslit} is offline and not cached.` };
  }
  if (!Array.isArray(payload.ayahs) || payload.ayahs.length === 0) {
    return { valid: false, error: `Surah ${expectedMeta.nameTranslit} returned zero Ayahs.` };
  }

  const isPartial = Boolean(payload.isPartialOfflineBundle || allowPartialOfflineBundle);
  if (!isPartial && payload.ayahs.length !== expectedMeta.ayahCount) {
    return {
      valid: false,
      error: `Ayah count mismatch for Surah ${expectedMeta.nameTranslit}: expected ${expectedMeta.ayahCount}, received ${payload.ayahs.length}.`,
    };
  }

  for (let i = 0; i < payload.ayahs.length; i++) {
    const ayah = payload.ayahs[i];
    if (!ayah.arabicUthmani || !ayah.arabicUthmani.trim()) {
      return {
        valid: false,
        error: `Missing Uthmani Arabic text at Ayah ${ayah.numberInSurah || i + 1}.`,
      };
    }
    if (!ayah.translations || typeof ayah.translations.en !== 'string' || !ayah.translations.en.trim()) {
      return {
        valid: false,
        error: `Missing translation text at Ayah ${ayah.numberInSurah || i + 1}.`,
      };
    }
  }

  return { valid: true };
}

/**
 * Resolves the array index of a target Ayah number (1-indexed in Surah).
 * Supports both complete 1..N Surah payloads and partial offline bundles (e.g., Surah 2 with Ayah 255).
 */
export function resolveAyahIndexByNumber(ayahs: AyahItem[], targetAyahNumber: number): number {
  if (!Array.isArray(ayahs) || ayahs.length === 0) return 0;
  const exactIdx = ayahs.findIndex((a) => a.numberInSurah === targetAyahNumber);
  if (exactIdx !== -1) return exactIdx;

  // Find closest ayah by numberInSurah if targetAyahNumber is not in a partial bundle
  let closestIdx = 0;
  let smallestDiff = Math.abs(ayahs[0].numberInSurah - targetAyahNumber);
  for (let i = 1; i < ayahs.length; i++) {
    const diff = Math.abs(ayahs[i].numberInSurah - targetAyahNumber);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestIdx = i;
    }
  }
  return closestIdx;
}

// ============================================================================
// 3. HIFZ MASTERY ENGINE & SPACED-REPETITION SCHEDULER (SRS)
// ============================================================================

export interface HifzSrsConfig {
  maxIntervalDays: number;
  fluentMultiplier: number;
  goodIncrementDays: number;
  needsWorkResetDays: number;
  masteryThresholdIntervalDays: number;
}

export const DEFAULT_HIFZ_SRS_CONFIG: HifzSrsConfig = {
  maxIntervalDays: 60,
  fluentMultiplier: 2,
  goodIncrementDays: 2,
  needsWorkResetDays: 1,
  masteryThresholdIntervalDays: 21,
};

export function parseHifzAyahRange(
  ayahRange: string | undefined,
  totalAyahs: number
): { startAyah: number; endAyah: number; label: string } {
  const safeTotal = Math.max(1, totalAyahs);
  if (!ayahRange || !ayahRange.trim()) {
    return { startAyah: 1, endAyah: safeTotal, label: `Ayahs 1 – ${safeTotal}` };
  }
  const matches = ayahRange.match(/\d+/g);
  if (!matches || matches.length === 0) {
    return { startAyah: 1, endAyah: safeTotal, label: ayahRange.trim() };
  }
  const first = Math.max(1, Math.min(safeTotal, Number(matches[0]) || 1));
  const second = matches.length > 1 ? Math.max(first, Math.min(safeTotal, Number(matches[1]) || first)) : first;
  const label =
    first === second
      ? ayahRange.includes('Ayat al-Kursi')
        ? `Ayah ${first} (Ayat al-Kursi)`
        : `Ayah ${first}`
      : `Ayahs ${first} – ${second}`;
  return { startAyah: first, endAyah: second, label };
}

export function deriveHifzPlanState(
  memorizedAyahs: number,
  totalAyahs: number,
  hasDueRevision = false,
  intervalDays = 0
): HifzMemorizationState {
  if (memorizedAyahs <= 0) return 'not_started';
  if (memorizedAyahs < totalAyahs) return 'learning';
  if (hasDueRevision) return 'revision_due';
  if (intervalDays >= DEFAULT_HIFZ_SRS_CONFIG.masteryThresholdIntervalDays) return 'mastered';
  return 'memorized';
}

export function scheduleHifzRevision(
  item: RevisionItem,
  quality: 'Fluent' | 'Good' | 'Needs Work',
  now: Date = new Date(),
  config: HifzSrsConfig = DEFAULT_HIFZ_SRS_CONFIG
): RevisionItem {
  const currentInterval = Math.max(1, item.intervalDays || 1);
  let nextInterval: number;
  let difficulty: 'easy' | 'medium' | 'hard';

  if (quality === 'Fluent') {
    nextInterval = Math.min(config.maxIntervalDays, Math.max(2, currentInterval * config.fluentMultiplier));
    difficulty = 'easy';
  } else if (quality === 'Good') {
    nextInterval = Math.min(config.maxIntervalDays, currentInterval + config.goodIncrementDays);
    difficulty = 'medium';
  } else {
    nextInterval = config.needsWorkResetDays;
    difficulty = 'hard';
  }

  const nextReviewDateKey =
    quality === 'Needs Work'
      ? getLocalDateKey(now)
      : getLocalDateKeyWithOffset(nextInterval, now);

  const dueStatus: 'due_today' | 'overdue' | 'upcoming' =
    quality === 'Needs Work' ? 'due_today' : 'upcoming';

  const dueDate =
    quality === 'Needs Work'
      ? 'Review again today'
      : nextInterval === 1
      ? 'Tomorrow'
      : `In ${nextInterval} days (${nextReviewDateKey})`;

  const memorizationState: HifzMemorizationState =
    quality === 'Needs Work'
      ? 'revision_due'
      : nextInterval >= config.masteryThresholdIntervalDays
      ? 'mastered'
      : 'memorized';

  return {
    ...item,
    intervalDays: nextInterval,
    difficulty,
    attemptsCount: (item.attemptsCount || 0) + 1,
    lastSelfReport: quality,
    lastPracticedAt: now.toISOString(),
    nextReviewAt: nextReviewDateKey,
    dueStatus,
    dueDate,
    memorizationState,
  };
}

export function refreshRevisionQueueDueStatuses(
  items: RevisionItem[],
  todayDateKey: string = getLocalDateKey()
): RevisionItem[] {
  return items.map((item) => {
    if (!item.nextReviewAt) return item;
    if (item.nextReviewAt < todayDateKey) {
      return {
        ...item,
        dueStatus: 'overdue',
        dueDate: `Overdue (scheduled ${item.nextReviewAt})`,
        memorizationState: 'revision_due',
      };
    }
    if (item.nextReviewAt === todayDateKey) {
      return {
        ...item,
        dueStatus: 'due_today',
        dueDate: 'Due Today',
        memorizationState: 'revision_due',
      };
    }
    return {
      ...item,
      dueStatus: 'upcoming',
    };
  });
}

// ============================================================================
// 4. SALAH & WUDU ENGINE
// ============================================================================

export interface PrayerCalculationMethodOption {
  id: number;
  label: string;
  region: string;
}

export const PRAYER_CALCULATION_METHODS: PrayerCalculationMethodOption[] = [
  { id: 1, label: 'University of Islamic Sciences, Karachi', region: 'India, Pakistan, Bangladesh, South Asia' },
  { id: 2, label: 'Islamic Society of North America (ISNA)', region: 'North America' },
  { id: 3, label: 'Muslim World League (MWL)', region: 'Europe, Far East, Global' },
  { id: 4, label: 'Umm al-Qura University, Makkah', region: 'Arabian Peninsula' },
];

export function createEmptySalahDayRecord(dateKey: string): SalahDayRecord {
  return {
    date: dateKey,
    prayers: {
      Fajr: 'pending',
      Dhuhr: 'pending',
      Asr: 'pending',
      Maghrib: 'pending',
      Isha: 'pending',
    },
    sunnahCompleted: 0,
  };
}

export function computeSalahHistoricalSummary(
  salahRecords: Record<string, SalahDayRecord>,
  baseDate: Date = new Date()
): {
  weeklyPrayedCount: number;
  weeklyOnTimeCount: number;
  weeklyQazaCount: number;
  monthlyPrayedCount: number;
  last7Days: {
    key: string;
    offset: number;
    dayLabel: string;
    doneCount: number;
    onTimeCount: number;
  }[];
} {
  let weeklyPrayedCount = 0;
  let weeklyOnTimeCount = 0;
  let weeklyQazaCount = 0;
  let monthlyPrayedCount = 0;

  const last7Days = Array.from({ length: 7 }, (_, idx) => {
    const offset = idx - 6;
    const key = getLocalDateKeyWithOffset(offset, baseDate);
    const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
    d.setDate(d.getDate() + offset);
    const prayers = salahRecords[key]?.prayers;
    const statuses = prayers ? Object.values(prayers) : [];
    const doneCount = statuses.filter((st) => st === 'prayed_on_time' || st === 'prayed').length;
    const onTimeCount = statuses.filter((st) => st === 'prayed_on_time').length;
    const qazaCount = statuses.filter((st) => st === 'qaza').length;

    weeklyPrayedCount += doneCount;
    weeklyOnTimeCount += onTimeCount;
    weeklyQazaCount += qazaCount;

    return {
      key,
      offset,
      dayLabel: d.toLocaleDateString('en-US', { weekday: 'short' }),
      doneCount,
      onTimeCount,
    };
  });

  for (let i = 0; i < 30; i++) {
    const key = getLocalDateKeyWithOffset(-i, baseDate);
    const prayers = salahRecords[key]?.prayers;
    if (prayers) {
      monthlyPrayedCount += Object.values(prayers).filter(
        (st) => st === 'prayed_on_time' || st === 'prayed'
      ).length;
    }
  }

  return {
    weeklyPrayedCount,
    weeklyOnTimeCount,
    weeklyQazaCount,
    monthlyPrayedCount,
    last7Days,
  };
}

// ============================================================================
// 5. QUIZ SCORING & VALIDATION ENGINE
// ============================================================================

export function scoreQuizSubmission(
  questions: QuizQuestion[],
  selectedByQuestionId: Record<string, number>
): {
  score: number;
  total: number;
  missedQuestionIndices: number[];
  isComplete: boolean;
} {
  let score = 0;
  const missedQuestionIndices: number[] = [];
  let answeredCount = 0;

  questions.forEach((q, idx) => {
    const picked = selectedByQuestionId[q.id];
    if (typeof picked === 'number') {
      answeredCount += 1;
      if (picked === q.correctIndex) {
        score += 1;
      } else {
        missedQuestionIndices.push(idx);
      }
    } else {
      missedQuestionIndices.push(idx);
    }
  });

  return {
    score,
    total: questions.length,
    missedQuestionIndices,
    isComplete: questions.length > 0 && answeredCount === questions.length,
  };
}

// ============================================================================
// 6. UNIFIED LEARNING EVENT, STREAK & PROGRESS AGGREGATION ENGINE
// ============================================================================

export function appendLearningEvent(
  events: LearningEvent[],
  newEvent: Omit<LearningEvent, 'id' | 'timestampIso' | 'dateKey'>,
  now: Date = new Date()
): LearningEvent[] {
  const dateKey = getLocalDateKey(now);
  // Deduplicate identical event type + referenceId on the same local calendar day
  const alreadyExistsToday = events.some(
    (e) =>
      e.dateKey === dateKey &&
      e.type === newEvent.type &&
      e.referenceId === newEvent.referenceId &&
      e.mode === newEvent.mode &&
      e.childId === newEvent.childId
  );
  if (alreadyExistsToday) {
    return events;
  }

  const created: LearningEvent = {
    ...newEvent,
    id: `evt_${now.getTime()}_${Math.random().toString(36).slice(2, 7)}`,
    timestampIso: now.toISOString(),
    dateKey,
  };
  return [created, ...events].slice(0, 500);
}

/**
 * Computes the user's consecutive active learning streak according to documented local-date rules:
 * - A local calendar date (YYYY-MM-DD) is active if:
 *   1) At least 1 LearningEvent was recorded on that date, OR
 *   2) At least 1 Quran verse was actually read on that date (dailyVerseActivity), OR
 *   3) At least 1 obligatory prayer was marked 'prayed_on_time' or 'prayed' on that date.
 * - Opening a Surah without reading/navigating does NOT count.
 * - If today is active, the streak counts backwards starting from today.
 * - If today is not yet active, the streak counts backwards starting from yesterday (grace until local midnight).
 * - If both today and yesterday have no activity, the current streak is 0.
 */
export function computeLearningStreak(params: {
  learningEvents: LearningEvent[];
  salahRecords: Record<string, SalahDayRecord>;
  dailyVerseActivity?: DailyVerseActivity;
  baseDate?: Date;
}): {
  currentStreakDays: number;
  longestStreakDays: number;
  activeDateKeys: string[];
  isTodayActive: boolean;
} {
  const baseDate = params.baseDate || new Date();
  const todayKey = getLocalDateKey(baseDate);
  const yesterdayKey = getLocalDateKeyWithOffset(-1, baseDate);

  const activeSet = new Set<string>();

  for (const evt of params.learningEvents || []) {
    if (evt.dateKey && /^\d{4}-\d{2}-\d{2}$/.test(evt.dateKey)) {
      activeSet.add(evt.dateKey);
    }
  }

  if (
    params.dailyVerseActivity &&
    params.dailyVerseActivity.dateKey &&
    Array.isArray(params.dailyVerseActivity.ayahKeys) &&
    params.dailyVerseActivity.ayahKeys.length > 0
  ) {
    activeSet.add(params.dailyVerseActivity.dateKey);
  }

  for (const [dateKey, record] of Object.entries(params.salahRecords || {})) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey) || !record?.prayers) continue;
    const hasPrayed = Object.values(record.prayers).some(
      (st) => st === 'prayed_on_time' || st === 'prayed'
    );
    if (hasPrayed) {
      activeSet.add(dateKey);
    }
  }

  const activeDateKeys = Array.from(activeSet).sort();
  const isTodayActive = activeSet.has(todayKey);

  // Calculate current streak
  let currentStreakDays = 0;
  if (activeSet.has(todayKey) || activeSet.has(yesterdayKey)) {
    let offset = activeSet.has(todayKey) ? 0 : -1;
    while (activeSet.has(getLocalDateKeyWithOffset(offset, baseDate))) {
      currentStreakDays += 1;
      offset -= 1;
    }
  }

  // Calculate longest streak
  let longestStreakDays = currentStreakDays;
  if (activeDateKeys.length > 0) {
    longestStreakDays = Math.max(longestStreakDays, 1);
    let run = 1;
    for (let i = 1; i < activeDateKeys.length; i++) {
      const prevParts = activeDateKeys[i - 1].split('-').map(Number);
      const currParts = activeDateKeys[i].split('-').map(Number);
      const prevDate = new Date(prevParts[0], prevParts[1] - 1, prevParts[2]);
      const currDate = new Date(currParts[0], currParts[1] - 1, currParts[2]);
      const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / 86400000);
      if (diffDays === 1) {
        run += 1;
        if (run > longestStreakDays) longestStreakDays = run;
      } else if (diffDays > 1) {
        run = 1;
      }
    }
  }

  return {
    currentStreakDays,
    longestStreakDays,
    activeDateKeys,
    isTodayActive,
  };
}

export function aggregateAdultProgressByPeriod(params: {
  period: 'daily' | 'weekly' | 'monthly' | 'all_time';
  learningEvents: LearningEvent[];
  salahRecords: Record<string, SalahDayRecord>;
  dailyVerseActivity: DailyVerseActivity;
  quizAttempts: QuizAttempt[];
  baseDate?: Date;
}): {
  versesReadCount: number;
  prayersCompletedCount: number;
  hifzRevisionsCount: number;
  lessonsAndSeerahCount: number;
  quizzesCompletedCount: number;
  totalEventsCount: number;
} {
  const baseDate = params.baseDate || new Date();
  const todayKey = getLocalDateKey(baseDate);

  const minDateKey =
    params.period === 'daily'
      ? todayKey
      : params.period === 'weekly'
      ? getLocalDateKeyWithOffset(-6, baseDate)
      : params.period === 'monthly'
      ? getLocalDateKeyWithOffset(-29, baseDate)
      : '0000-01-01';

  const filteredEvents = (params.learningEvents || []).filter(
    (e) => e.mode === 'adult' && e.dateKey >= minDateKey && e.dateKey <= todayKey
  );

  const versesFromEvents = filteredEvents.filter((e) => e.type === 'quran_ayah_read').length;
  const versesToday =
    params.dailyVerseActivity.dateKey === todayKey
      ? params.dailyVerseActivity.ayahKeys.length
      : 0;
  const versesReadCount = Math.max(versesFromEvents, versesToday);

  let prayersCompletedCount = 0;
  for (const [dateKey, rec] of Object.entries(params.salahRecords || {})) {
    if (dateKey >= minDateKey && dateKey <= todayKey && rec?.prayers) {
      prayersCompletedCount += Object.values(rec.prayers).filter(
        (st) => st === 'prayed_on_time' || st === 'prayed'
      ).length;
    }
  }

  const hifzRevisionsCount = filteredEvents.filter(
    (e) => e.type === 'hifz_revision' || e.type === 'hifz_progress'
  ).length;

  const lessonsAndSeerahCount = filteredEvents.filter(
    (e) => e.type === 'lesson_completed' || e.type === 'seerah_completed'
  ).length;

  const quizzesCompletedCount = (params.quizAttempts || []).filter((q) => {
    if (q.mode !== 'adult') return false;
    if (params.period === 'all_time') return true;
    const qDate = q.dateKey || (q.completedAt === 'Just now' || q.completedAt === 'Today' ? todayKey : '');
    return qDate >= minDateKey && qDate <= todayKey;
  }).length;

  return {
    versesReadCount,
    prayersCompletedCount,
    hifzRevisionsCount,
    lessonsAndSeerahCount,
    quizzesCompletedCount,
    totalEventsCount: filteredEvents.length,
  };
}

// ============================================================================
// 7. QIBLA SPHERICAL GREAT-CIRCLE BEARING ENGINE
// ============================================================================

export function computeQiblaFromCoords(
  latDeg: number,
  lonDeg: number
): { bearing: number; dir: string; distKm: number } {
  const kaabaLat = (21.4225 * Math.PI) / 180;
  const kaabaLon = (39.8262 * Math.PI) / 180;
  const phi = (latDeg * Math.PI) / 180;
  const lam = (lonDeg * Math.PI) / 180;
  const dLon = kaabaLon - lam;
  const y = Math.sin(dLon);
  const x = Math.cos(phi) * Math.tan(kaabaLat) - Math.sin(phi) * Math.cos(dLon);
  const brng = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  const rounded = Math.round(brng) % 360;
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const cardinal = dirs[Math.round(rounded / 45) % 8];
  const R = 6371;
  const dLat = kaabaLat - phi;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(phi) * Math.cos(kaabaLat) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const distKm = Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  return { bearing: rounded, dir: `${rounded}° ${cardinal}`, distKm };
}

// ============================================================================
// 8. DYNAMIC HIJRI CALENDAR ENGINE (UMM AL-QURA / TABULAR FALLBACK)
// ============================================================================

export const HIJRI_MONTH_NAMES = [
  'Muharram',
  'Safar',
  'Rabi’ al-Awwal',
  'Rabi’ al-Thani',
  'Jumada al-Ula',
  'Jumada al-Akhirah',
  'Rajab',
  'Sha’ban',
  'Ramadan',
  'Shawwal',
  'Dhu al-Qa’dah',
  'Dhu al-Hijjah',
] as const;

export function computeHijriDate(
  date: Date = new Date(),
  adjustmentDays = 0
): {
  day: number;
  monthNumber: number; // 1 to 12
  monthName: string;
  year: number;
  formatted: string;
  convention: string;
  disclaimer: string;
} {
  const adjusted = new Date(date.getTime() + adjustmentDays * 86400000);
  const disclaimer =
    'Calculated astronomical/tabular estimate. Actual Islamic dates depend on confirmed local crescent moon sighting (±1–2 days).';

  try {
    const formatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(adjusted);
    const day = Number(parts.find((p) => p.type === 'day')?.value || 1);
    const monthNumber = Number(parts.find((p) => p.type === 'month')?.value || 1);
    const rawYear = parts.find((p) => p.type === 'year')?.value || '1448';
    const year = Number(rawYear.replace(/[^\d]/g, '')) || 1448;
    if (monthNumber >= 1 && monthNumber <= 12 && day >= 1 && day <= 30) {
      const monthName = HIJRI_MONTH_NAMES[monthNumber - 1];
      return {
        day,
        monthNumber,
        monthName,
        year,
        formatted: `${day} ${monthName} ${year} AH`,
        convention: 'Umm al-Qura Calendar (ICU/Intl)',
        disclaimer,
      };
    }
  } catch {
    // Fall back to deterministic Kuwaiti/Tabular arithmetic below
  }

  // Deterministic Tabular Islamic Calendar fallback
  const jd = Math.floor(adjusted.getTime() / 86400000) + 2440588;
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
    Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 =
    l2 -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const monthNumber = Math.max(1, Math.min(12, Math.floor((24 * l3) / 709)));
  const day = Math.max(1, Math.min(30, l3 - Math.floor((709 * monthNumber) / 24)));
  const year = 30 * n + j - 30;
  const monthName = HIJRI_MONTH_NAMES[monthNumber - 1];

  return {
    day,
    monthNumber,
    monthName,
    year,
    formatted: `${day} ${monthName} ${year} AH`,
    convention: 'Tabular Islamic Calendar (30-Year Cycle)',
    disclaimer,
  };
}
