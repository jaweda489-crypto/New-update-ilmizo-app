import { ChildProfile, LearningEvent } from '../types/ilmizo';
import { getLocalDateKey } from './adultLearningEngines';
import {
  ensureChildUsagePeriodRollover,
  parseResetHourFromUsagePeriodKey,
} from './parentSafetyEngine';

export function normalizeSurahCertificateTitle(rawTitle: string): string {
  const trimmed = (rawTitle || '').trim();
  if (!trimmed) return 'Surah Al-Ikhlas';
  const stripped = trimmed.replace(/^(surah\s+)+/i, '').trim();
  if (!stripped) return 'Surah Al-Ikhlas';
  return `Surah ${stripped}`;
}

export function getChildCertificateAchievements(completedSurahs: string[] | undefined): string[] {
  if (Array.isArray(completedSurahs) && completedSurahs.length > 0) {
    const uniqueNormalized = Array.from(
      new Set(completedSurahs.filter(Boolean).map(normalizeSurahCertificateTitle))
    );
    if (uniqueNormalized.length > 0) {
      return uniqueNormalized;
    }
  }
  return ['Surah Al-Ikhlas', 'Daily Sunnah Duas', 'Salah Foundations'];
}

export interface BadgeEvaluationResult {
  earnedBadgeIds: string[];
  newlyUnlockedBadgeIds: string[];
  unlockedAdventureNode: number;
}

/**
 * Evaluates a child profile's real recorded progress against the 6 Kids World badges
 * and computes the highest unlocked adventure island node.
 */
export function evaluateChildBadgesAndMilestones(child: ChildProfile): BadgeEvaluationResult {
  const existing = new Set(Array.isArray(child.earnedBadgeIds) ? child.earnedBadgeIds : []);
  const computed = new Set(existing);

  const confirmedDeedsCount = Array.isArray(child.goodDeeds)
    ? child.goodDeeds.filter((d) => d.parentConfirmed).length
    : 0;
  const completedSurahsCount = Array.isArray(child.completedSurahs)
    ? new Set(child.completedSurahs.filter(Boolean).map(normalizeSurahCertificateTitle)).size
    : 0;

  if (child.pillarProgress.quranLessons >= 1 || completedSurahsCount >= 1) {
    computed.add('badge_quran');
  }
  if (child.pillarProgress.duasPracticed >= 5) {
    computed.add('badge_dua');
  }
  if (child.pillarProgress.salahLessons >= 1) {
    computed.add('badge_salah');
  }
  if (child.pillarProgress.akhlaqDeeds >= 1 || confirmedDeedsCount >= 1) {
    computed.add('badge_kind');
  }
  if (completedSurahsCount >= 5) {
    computed.add('badge_5surahs');
  }
  if (child.streakDays >= 30 || child.stars >= 150) {
    computed.add('badge_30day');
  }

  const earnedBadgeIds = Array.from(computed);
  const newlyUnlockedBadgeIds = earnedBadgeIds.filter((id) => !existing.has(id));

  // Unlock adventure island nodes progressively by stars earned
  const unlockedAdventureNode =
    child.stars >= 50
      ? 6
      : child.stars >= 40
      ? 5
      : child.stars >= 30
      ? 4
      : child.stars >= 20
      ? 3
      : child.stars >= 10
      ? 2
      : Math.max(1, child.unlockedAdventureNode || 1);

  return {
    earnedBadgeIds,
    newlyUnlockedBadgeIds,
    unlockedAdventureNode,
  };
}

/**
 * Canonical daily rollover wrapper that delegates to `ensureChildUsagePeriodRollover`
 * so midnight (`00:00`) never prematurely wipes usage or quest steps before `kidsDailyResetHour`.
 */
export function ensureChildDailyRollover(
  child: ChildProfile,
  todayDateKey: string = getLocalDateKey(),
  resetHour?: number,
  now?: Date
): ChildProfile {
  const effectiveResetHour =
    typeof resetHour === 'number' && Number.isFinite(resetHour)
      ? Math.max(0, Math.min(23, Math.floor(resetHour)))
      : parseResetHourFromUsagePeriodKey(child.usagePeriodKey) ?? 0;

  let referenceDate: Date;
  if (now instanceof Date && !Number.isNaN(now.getTime())) {
    referenceDate = now;
  } else {
    const realTodayKey = getLocalDateKey(new Date());
    if (todayDateKey === realTodayKey) {
      referenceDate = new Date();
    } else {
      // Explicit YYYY-MM-DD test date: evaluate at 12:00 local time on that date
      const parsed = new Date(`${todayDateKey}T12:00:00`);
      referenceDate = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
    }
  }

  return ensureChildUsagePeriodRollover(child, referenceDate, effectiveResetHour);
}

/**
 * Pure state transition when a child completes a quest step or masters a Surah.
 * Enforces idempotency / duplicate-reward prevention and respects `kidsDailyResetHour`.
 */
export function applyChildQuestCompletion(
  child: ChildProfile,
  step: 'quran' | 'dua' | 'quiz' | 'salah' | 'family',
  title: string,
  completedSurahTitle?: string,
  todayDateKey: string = getLocalDateKey(),
  resetHour?: number,
  now?: Date
): {
  updatedChild: ChildProfile;
  newlyUnlockedBadgeIds: string[];
  duplicatePrevented: boolean;
  starsAwarded: number;
} {
  const rolledChild = ensureChildDailyRollover(child, todayDateKey, resetHour, now);
  const alreadyDone = Boolean(rolledChild.questStepsCompleted[step]);
  const updatedSurahs = [...(rolledChild.completedSurahs || [])];
  let newSurahAdded = false;

  if (completedSurahTitle && completedSurahTitle.trim()) {
    const normalized = normalizeSurahCertificateTitle(completedSurahTitle);
    if (!updatedSurahs.includes(normalized)) {
      updatedSurahs.push(normalized);
      newSurahAdded = true;
    }
  }

  // Prevent duplicate star or lesson rewards when the same daily quest step is re-submitted in the same usage period
  const starsAwarded = alreadyDone ? 0 : 5;
  const duplicatePrevented = alreadyDone && !newSurahAdded;

  const draftChild: ChildProfile = {
    ...rolledChild,
    lastActiveDateKey: rolledChild.lastActiveDateKey || todayDateKey,
    activeMinutesToday: rolledChild.activeMinutesToday,
    activeSecondsToday: rolledChild.activeSecondsToday,
    stars: rolledChild.stars + starsAwarded,
    questStepsCompleted: {
      ...rolledChild.questStepsCompleted,
      [step]: true,
    },
    completedSurahs: updatedSurahs,
    pillarProgress: {
      quranLessons:
        step === 'quran' && !alreadyDone
          ? rolledChild.pillarProgress.quranLessons + 1
          : rolledChild.pillarProgress.quranLessons,
      duasPracticed:
        step === 'dua' && !alreadyDone
          ? rolledChild.pillarProgress.duasPracticed + 1
          : rolledChild.pillarProgress.duasPracticed,
      salahLessons:
        step === 'salah' && !alreadyDone
          ? rolledChild.pillarProgress.salahLessons + 1
          : rolledChild.pillarProgress.salahLessons,
      akhlaqDeeds:
        step === 'family' && !alreadyDone
          ? rolledChild.pillarProgress.akhlaqDeeds + 1
          : rolledChild.pillarProgress.akhlaqDeeds,
    },
    recentActivities: alreadyDone
      ? rolledChild.recentActivities
      : [
          {
            id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            title,
            pillar: step === 'dua' ? 'duas' : step === 'quiz' ? 'quran' : step,
            timestamp: 'Just now',
          },
          ...(rolledChild.recentActivities || []).slice(0, 14),
        ],
  };

  const badgeEval = evaluateChildBadgesAndMilestones(draftChild);

  return {
    updatedChild: {
      ...draftChild,
      earnedBadgeIds: badgeEval.earnedBadgeIds,
      unlockedAdventureNode: badgeEval.unlockedAdventureNode,
    },
    newlyUnlockedBadgeIds: badgeEval.newlyUnlockedBadgeIds,
    duplicatePrevented,
    starsAwarded,
  };
}

/**
 * Pure state transition when a child finishes reading a Kids Story.
 * Enforces non-duplicate star rewards per story ID: reopening or rereading an already-completed
 * story awards 0 extra stars while still allowing unlimited rereading.
 */
export function applyChildStoryCompletion(
  child: ChildProfile,
  storyId: string,
  storyTitle: string,
  todayDateKey: string = getLocalDateKey(),
  resetHour?: number,
  now?: Date
): {
  updatedChild: ChildProfile;
  newlyUnlockedBadgeIds: string[];
  alreadyCompleted: boolean;
  starsAwarded: number;
} {
  const rolledChild = ensureChildDailyRollover(child, todayDateKey, resetHour, now);
  const existingStories = Array.isArray(rolledChild.completedStoryIds)
    ? rolledChild.completedStoryIds
    : [];
  const cleanStoryId = (storyId || '').trim();
  const alreadyCompleted = Boolean(cleanStoryId && existingStories.includes(cleanStoryId));

  if (alreadyCompleted) {
    return {
      updatedChild: {
        ...rolledChild,
        completedStoryIds: existingStories,
      },
      newlyUnlockedBadgeIds: [],
      alreadyCompleted: true,
      starsAwarded: 0,
    };
  }

  const nextCompletedStories = cleanStoryId
    ? [...existingStories, cleanStoryId]
    : existingStories;
  const starsAwarded = 5;

  const draftChild: ChildProfile = {
    ...rolledChild,
    lastActiveDateKey: rolledChild.lastActiveDateKey || todayDateKey,
    activeMinutesToday: Math.min(60, (rolledChild.activeMinutesToday || 0) + 2),
    stars: rolledChild.stars + starsAwarded,
    completedStoryIds: nextCompletedStories,
    questStepsCompleted: {
      ...rolledChild.questStepsCompleted,
      family: true,
    },
    pillarProgress: {
      ...rolledChild.pillarProgress,
      akhlaqDeeds: rolledChild.pillarProgress.akhlaqDeeds + 1,
    },
    recentActivities: [
      {
        id: `act_story_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        title: `Story Completed: ${storyTitle}`,
        pillar: 'akhlaq',
        timestamp: 'Just now',
      },
      ...(rolledChild.recentActivities || []).slice(0, 14),
    ],
  };

  const badgeEval = evaluateChildBadgesAndMilestones(draftChild);

  return {
    updatedChild: {
      ...draftChild,
      earnedBadgeIds: badgeEval.earnedBadgeIds,
      unlockedAdventureNode: badgeEval.unlockedAdventureNode,
    },
    newlyUnlockedBadgeIds: badgeEval.newlyUnlockedBadgeIds,
    alreadyCompleted: false,
    starsAwarded,
  };
}

export interface KidsPeriodAnalytics {
  period: 'Week' | 'Month' | 'All Time';
  quranCount: number;
  duasCount: number;
  salahCount: number;
  akhlaqCount: number;
  quizzesCount: number;
  totalEventsInPeriod: number;
  confirmedDeedsCount: number;
  pendingDeedsCount: number;
  activeDaysInPeriod: number;
  filteredEvents: LearningEvent[];
}

/**
 * Replaces the fake `rangeMultiplier` in Kids Progress with a real period-based
 * aggregator driven by recorded `learningEvents` (filtered by `mode === 'kids'` and `child.id`)
 * combined with the child's persisted baseline profile records.
 */
export function aggregateKidsProgressByPeriod(params: {
  child: ChildProfile;
  learningEvents: LearningEvent[];
  period: 'Week' | 'Month' | 'All Time';
  now?: Date;
}): KidsPeriodAnalytics {
  const { child, learningEvents, period, now = new Date() } = params;
  const maxDays = period === 'Week' ? 7 : period === 'Month' ? 30 : 36500;

  const allowedDates = new Set<string>();
  if (period !== 'All Time') {
    for (let i = 0; i < maxDays; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      allowedDates.add(getLocalDateKey(d));
    }
  }

  const childEvents = learningEvents.filter(
    (ev) =>
      ev.mode === 'kids' &&
      (!ev.childId || ev.childId === child.id) &&
      (period === 'All Time' || allowedDates.has(ev.dateKey))
  );

  const eventQuran = childEvents.filter(
    (e) => e.type === 'quran_ayah_read' || (e.type === 'lesson_completed' && e.referenceId.startsWith('kids_quran'))
  ).length;
  const eventDuas = childEvents.filter((e) => e.type === 'dua_studied').length;
  const eventSalah = childEvents.filter((e) => e.type === 'salah_logged').length;
  const eventAkhlaq = childEvents.filter(
    (e) => e.type === 'lesson_completed' && e.referenceId.startsWith('kids_deed')
  ).length;
  const eventQuizzes = childEvents.filter((e) => e.type === 'quiz_completed').length;

  // In 'All Time', include full cumulative pillar totals; in 'Week' or 'Month', show
  // real recorded events within that window (or current session baseline if no older events exist).
  const quranCount =
    period === 'All Time'
      ? Math.max(child.pillarProgress.quranLessons, eventQuran)
      : eventQuran > 0
      ? eventQuran
      : child.pillarProgress.quranLessons;

  const duasCount =
    period === 'All Time'
      ? Math.max(child.pillarProgress.duasPracticed, eventDuas)
      : eventDuas > 0
      ? eventDuas
      : child.pillarProgress.duasPracticed;

  const salahCount =
    period === 'All Time'
      ? Math.max(child.pillarProgress.salahLessons, eventSalah)
      : eventSalah > 0
      ? eventSalah
      : child.pillarProgress.salahLessons;

  const akhlaqCount =
    period === 'All Time'
      ? Math.max(child.pillarProgress.akhlaqDeeds, eventAkhlaq)
      : eventAkhlaq > 0
      ? eventAkhlaq
      : child.pillarProgress.akhlaqDeeds;

  const confirmedDeedsCount = (child.goodDeeds || []).filter((g) => g.parentConfirmed).length;
  const pendingDeedsCount = (child.goodDeeds || []).filter((g) => !g.parentConfirmed).length;
  const activeDaysInPeriod = Math.max(
    1,
    new Set(childEvents.map((e) => e.dateKey)).size
  );

  return {
    period,
    quranCount,
    duasCount,
    salahCount,
    akhlaqCount,
    quizzesCount: eventQuizzes,
    totalEventsInPeriod: childEvents.length,
    confirmedDeedsCount,
    pendingDeedsCount,
    activeDaysInPeriod,
    filteredEvents: childEvents,
  };
}

export function normalizeArabicTextForMatch(str: string): string {
  return (str || '')
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim();
}

/**
 * Deterministic word-stem comparison between target Quranic Ayah and Web Speech transcript.
 */
export function scoreKidsArabicRecitationMatch(
  targetArabic: string,
  spokenArabic: string
): {
  percentage: number;
  matchedWords: number;
  totalWords: number;
  ratingSuggestion: 'clear' | 'practice';
} {
  const targetWords = normalizeArabicTextForMatch(targetArabic)
    .split(/\s+/)
    .filter(Boolean);
  const spokenNorm = normalizeArabicTextForMatch(spokenArabic);

  if (targetWords.length === 0 || spokenNorm.length === 0) {
    return {
      percentage: 0,
      matchedWords: 0,
      totalWords: targetWords.length,
      ratingSuggestion: 'practice',
    };
  }

  const matchedWords = targetWords.filter((w) => {
    const stem = w.slice(0, Math.min(3, w.length));
    return stem.length > 0 && spokenNorm.includes(stem);
  }).length;

  const percentage = Math.min(100, Math.round((matchedWords / targetWords.length) * 100));
  return {
    percentage,
    matchedWords,
    totalWords: targetWords.length,
    ratingSuggestion: percentage >= 65 ? 'clear' : 'practice',
  };
}

export interface VoiceActivityAssessment {
  durationMs: number;
  activeSpeechRatio: number;
  peakLevel: number;
  hasClearVoiceActivity: boolean;
  summary: string;
}

/**
 * Evaluates Web Audio API AnalyserNode RMS samples (0..1) and recording duration so
 * browsers without Web Speech API (iOS Safari, Firefox, WebViews) still get truthful
 * microphone voice-activity feedback instead of a silent dead end.
 */
export function assessVoiceActivityMetrics(
  rmsSamples: number[],
  durationMs: number
): VoiceActivityAssessment {
  const safeDuration = Math.max(0, Math.round(durationMs));
  const peakLevel = rmsSamples.length > 0 ? Math.max(...rmsSamples) : 0;
  const voicedSamples = rmsSamples.filter((s) => s >= 0.025).length;
  const activeSpeechRatio =
    rmsSamples.length > 0 ? Math.round((voicedSamples / rmsSamples.length) * 100) / 100 : 0;
  const hasClearVoiceActivity = safeDuration >= 700 && peakLevel >= 0.04 && activeSpeechRatio >= 0.15;

  let summary = 'Tap "Play My Voice" and compare side-by-side with the Qari.';
  if (safeDuration < 700) {
    summary = 'Recording was very short (< 1s). Hold and recite the full Ayah clearly.';
  } else if (peakLevel < 0.03) {
    summary = 'Very low microphone input detected. Check mic permission or speak closer.';
  } else if (hasClearVoiceActivity) {
    summary = `Clear voice detected (${(safeDuration / 1000).toFixed(1)}s). Compare "Play My Voice" with "Listen to Qari"!`;
  }

  return {
    durationMs: safeDuration,
    activeSpeechRatio,
    peakLevel,
    hasClearVoiceActivity,
    summary,
  };
}

export function supportsArabicSpeechRecognition(): boolean {
  if (typeof window === 'undefined') return false;
  const w = window as unknown as {
    SpeechRecognition?: unknown;
    webkitSpeechRecognition?: unknown;
  };
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
}

