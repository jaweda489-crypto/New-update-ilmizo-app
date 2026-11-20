import { ChildProfile, LanguageCode } from '../types/ilmizo';

export type OnboardingStatus = 'pending' | 'completed' | 'skipped';
export type AdultPrimaryGoal =
  | 'daily_quran'
  | 'salah_consistency'
  | 'hifz_revision'
  | 'family_tarbiyah';
export type ChildAgeBand = '4-6' | '7-9' | '10-12';
export type ChildLearningFocus =
  | 'qaida_basics'
  | 'stories_manners'
  | 'daily_duas'
  | 'balanced';

export interface LocalOnboardingProfile {
  schemaVersion: 1;
  status: OnboardingStatus;
  primaryMode: 'adult' | 'kids' | 'family';
  adultGoal: AdultPrimaryGoal;
  adultDailyMinutes: 5 | 10 | 15;
  childAgeBand: ChildAgeBand;
  childFocus: ChildLearningFocus;
  planPaused: boolean;
  completedAtIso: string | null;
  lastActiveDateKey: string | null;
}

export interface SevenDayPlanDay {
  dayNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  label: string;
  adultTask: string;
  adultMinutes: number;
  kidsTask: string;
  kidsMinutes: number;
  targetAdultRoute: 'quran_read' | 'salah' | 'hifz' | 'duas' | 'lessons';
  targetKidsRoute: 'quran_learning' | 'stories' | 'duas_learning' | 'salah_learning' | 'daily_quiz';
}

export interface MissedDayKindnessState {
  missedDays: number;
  showWelcomeBack: boolean;
  toneTitle: string;
  toneMessage: string;
  suggestedQuickMinutes: number;
}

const ONBOARDING_STORAGE_KEY = 'ilmizo_onboarding_profile_v1';

export const DEFAULT_LOCAL_ONBOARDING_PROFILE: LocalOnboardingProfile = {
  schemaVersion: 1,
  status: 'pending',
  primaryMode: 'family',
  adultGoal: 'daily_quran',
  adultDailyMinutes: 10,
  childAgeBand: '7-9',
  childFocus: 'balanced',
  planPaused: false,
  completedAtIso: null,
  lastActiveDateKey: null,
};

/**
 * Checks whether an existing user already has saved local Ilmizo data.
 * Existing upgraders should NEVER be forced through first-run onboarding.
 */
export function hasExistingLocalUserHistory(): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    return Boolean(
      localStorage.getItem('ilmizo_master_state_v1') ||
        localStorage.getItem('ilmizo_azan_notification_prefs_v1')
    );
  } catch {
    return false;
  }
}

export function loadLocalOnboardingProfile(): LocalOnboardingProfile {
  if (typeof localStorage === 'undefined') {
    return { ...DEFAULT_LOCAL_ONBOARDING_PROFILE };
  }
  try {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!raw) {
      if (hasExistingLocalUserHistory()) {
        return {
          ...DEFAULT_LOCAL_ONBOARDING_PROFILE,
          status: 'skipped',
        };
      }
      return { ...DEFAULT_LOCAL_ONBOARDING_PROFILE };
    }
    const parsed = JSON.parse(raw);
    return {
      schemaVersion: 1,
      status:
        parsed.status === 'completed' || parsed.status === 'skipped' || parsed.status === 'pending'
          ? parsed.status
          : 'pending',
      primaryMode:
        parsed.primaryMode === 'adult' ||
        parsed.primaryMode === 'kids' ||
        parsed.primaryMode === 'family'
          ? parsed.primaryMode
          : 'family',
      adultGoal:
        parsed.adultGoal === 'daily_quran' ||
        parsed.adultGoal === 'salah_consistency' ||
        parsed.adultGoal === 'hifz_revision' ||
        parsed.adultGoal === 'family_tarbiyah'
          ? parsed.adultGoal
          : 'daily_quran',
      adultDailyMinutes:
        parsed.adultDailyMinutes === 5 ||
        parsed.adultDailyMinutes === 10 ||
        parsed.adultDailyMinutes === 15
          ? parsed.adultDailyMinutes
          : 10,
      childAgeBand:
        parsed.childAgeBand === '4-6' ||
        parsed.childAgeBand === '7-9' ||
        parsed.childAgeBand === '10-12'
          ? parsed.childAgeBand
          : '7-9',
      childFocus:
        parsed.childFocus === 'qaida_basics' ||
        parsed.childFocus === 'stories_manners' ||
        parsed.childFocus === 'daily_duas' ||
        parsed.childFocus === 'balanced'
          ? parsed.childFocus
          : 'balanced',
      planPaused: Boolean(parsed.planPaused),
      completedAtIso: typeof parsed.completedAtIso === 'string' ? parsed.completedAtIso : null,
      lastActiveDateKey:
        typeof parsed.lastActiveDateKey === 'string' ? parsed.lastActiveDateKey : null,
    };
  } catch {
    return { ...DEFAULT_LOCAL_ONBOARDING_PROFILE };
  }
}

export function saveLocalOnboardingProfile(profile: LocalOnboardingProfile): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Ignore storage quota errors
  }
}

export function inferAgeBandFromAge(age: number): ChildAgeBand {
  if (age <= 6) return '4-6';
  if (age <= 9) return '7-9';
  return '10-12';
}

/**
 * Generates a realistic, calm 7-Day Personalized Local Plan based on user goals and child age band.
 */
export function buildSevenDayLocalPlan(
  profile: Pick<
    LocalOnboardingProfile,
    'adultGoal' | 'adultDailyMinutes' | 'childAgeBand' | 'childFocus'
  >,
  language: LanguageCode = 'en'
): SevenDayPlanDay[] {
  const isHinglish = language === 'hinglish' || language === 'hi';
  const aMin = profile.adultDailyMinutes;
  const kMin = profile.childAgeBand === '4-6' ? 8 : profile.childAgeBand === '7-9' ? 10 : 12;

  const adultTemplates: Record<
    AdultPrimaryGoal,
    Array<{ task: string; route: SevenDayPlanDay['targetAdultRoute'] }>
  > = {
    daily_quran: [
      { task: isHinglish ? 'Surah Al-Fatihah + 5 Ayahs Mushaf reading' : 'Read 5 Ayahs in Uthmani Mushaf Mode', route: 'quran_read' },
      { task: isHinglish ? 'Read 5 Ayahs + 1 short Tadabbur reflection' : 'Read 5 Ayahs with 1 reflection note', route: 'quran_read' },
      { task: isHinglish ? 'Morning & Evening Adhkar + 5 Ayahs' : 'Morning Adhkar + 5 Quran Ayahs', route: 'duas' },
      { task: isHinglish ? 'Study Mode: 3 Ayahs with brief Tafsir' : 'Study Mode: 3 Ayahs with brief Tafsir', route: 'quran_read' },
      { task: isHinglish ? 'Jumuah Surah Al-Kahf key verses' : 'Jumuah reflection & Surah Al-Kahf verses', route: 'quran_read' },
      { task: isHinglish ? '1 short Islamic lesson + Quran review' : '1 concise Islamic lesson + Quran reading', route: 'lessons' },
      { task: isHinglish ? 'Weekly calm recap & Surah bookmark check' : 'Calm weekly recitation recap', route: 'quran_read' },
    ],
    salah_consistency: [
      { task: 'Log all 5 daily prayers & review Wudu steps', route: 'salah' },
      { task: 'Pray on time + learn 1 post-Salah Dua', route: 'duas' },
      { task: 'Salah Khushu reflection + 3 Quran Ayahs', route: 'salah' },
      { task: 'Review Tashahhud & Durood pronunciation', route: 'salah' },
      { task: 'Jumuah preparation + Sunnah prayers', route: 'salah' },
      { task: 'Log 5 prayers + 1 Fiqh lesson', route: 'lessons' },
      { task: 'Weekly Salah rhythm review (zero guilt)', route: 'salah' },
    ],
    hifz_revision: [
      { task: 'Memorize 3 new Ayahs + 3x Qari repeat', route: 'hifz' },
      { task: 'Revise yesterday’s Ayahs in Word Reveal', route: 'hifz' },
      { task: 'Memorize 3 new Ayahs + link to previous', route: 'hifz' },
      { task: 'Due Hifz spaced-repetition check', route: 'hifz' },
      { task: 'Recite full week’s Ayahs in Mushaf Mode', route: 'quran_read' },
      { task: 'Strengthen weak Ayahs from Hifz queue', route: 'hifz' },
      { task: 'Light revision & dua for retention', route: 'duas' },
    ],
    family_tarbiyah: [
      { task: 'Read 3 Ayahs together + guide child’s Qaida', route: 'quran_read' },
      { task: 'Practice 1 family Sunnah Dua at mealtime', route: 'duas' },
      { task: 'Pray Maghrib together & log in tracker', route: 'salah' },
      { task: 'Read 1 Prophet story & discuss its moral', route: 'lessons' },
      { task: 'Jumuah family Surah recitation', route: 'quran_read' },
      { task: 'Review child’s week & praise 1 good deed', route: 'duas' },
      { task: 'Optional Family WhatsApp Progress Card', route: 'salah' },
    ],
  };

  const kidsTemplates: Record<
    ChildLearningFocus,
    Array<{ task: string; route: SevenDayPlanDay['targetKidsRoute'] }>
  > = {
    qaida_basics: [
      { task: 'Trace 3 Arabic letters + hear human audio', route: 'quran_learning' },
      { task: 'Noorani Qaida sound drill & 5Q check', route: 'quran_learning' },
      { task: 'Storybook break + 1 kindness choice', route: 'stories' },
      { task: 'Trace 3 more letters & review mistakes', route: 'quran_learning' },
      { task: 'Listen & repeat 1 short Juz Amma ayah', route: 'quran_learning' },
      { task: 'Practice 1 daily Sunnah Dua', route: 'duas_learning' },
      { task: 'Fun weekend mini quiz with Mizo', route: 'daily_quiz' },
    ],
    stories_manners: [
      { task: 'Read 6-scene Prophet story + moral dilemma', route: 'stories' },
      { task: 'Practice 1 polite Sunnah Dua with Ayla', route: 'duas_learning' },
      { task: 'Quick 3-min Qaida letter tracing', route: 'quran_learning' },
      { task: 'Companion storybook + reflection question', route: 'stories' },
      { task: 'Wudu & Salah gentle step practice', route: 'salah_learning' },
      { task: 'Storybook + 1 family good deed', route: 'stories' },
      { task: 'Playful weekend story quiz', route: 'daily_quiz' },
    ],
    daily_duas: [
      { task: 'Learn Dua before eating + repeat audio', route: 'duas_learning' },
      { task: 'Learn Dua before sleeping + review', route: 'duas_learning' },
      { task: 'Quick Qaida tracing warm-up', route: 'quran_learning' },
      { task: 'Wudu & Salah steps with Ayaan', route: 'salah_learning' },
      { task: 'Bedtime interactive storybook', route: 'stories' },
      { task: 'Dua leaving home + kindness deed', route: 'duas_learning' },
      { task: 'Weekly Dua mastery quiz', route: 'daily_quiz' },
    ],
    balanced: [
      { task: 'Qaida Letter Tracing + Audio Drill', route: 'quran_learning' },
      { task: '6-Scene Interactive Storybook', route: 'stories' },
      { task: 'Daily Sunnah Dua with Ayla', route: 'duas_learning' },
      { task: 'Qaida 5-Question Mastery Check', route: 'quran_learning' },
      { task: 'Wudu & Salah Practice with Ayaan', route: 'salah_learning' },
      { task: 'Interactive Storybook + Good Deed', route: 'stories' },
      { task: 'Gentle Weekend Quiz & Celebration', route: 'daily_quiz' },
    ],
  };

  const adultSeq = adultTemplates[profile.adultGoal];
  const kidsSeq = kidsTemplates[profile.childFocus];

  return ([1, 2, 3, 4, 5, 6, 7] as const).map((dayNum, idx) => ({
    dayNumber: dayNum,
    label: `Day ${dayNum}`,
    adultTask: adultSeq[idx].task,
    adultMinutes: aMin,
    kidsTask: kidsSeq[idx].task,
    kidsMinutes: kMin,
    targetAdultRoute: adultSeq[idx].route,
    targetKidsRoute: kidsSeq[idx].route,
  }));
}

/**
 * Missed-day kindness logic: never shames or punishes users when a day is missed.
 * Offers a gentle 3-minute restart option if the user has been away for 2+ days.
 */
export function evaluateMissedDayKindness(params: {
  lastActiveDateKey: string | null;
  todayDateKey: string;
  planPaused: boolean;
  child?: Pick<ChildProfile, 'name' | 'streakDays'>;
}): MissedDayKindnessState {
  if (params.planPaused) {
    return {
      missedDays: 0,
      showWelcomeBack: true,
      toneTitle: 'Routine Paused — Take Your Time',
      toneMessage:
        'Your progress is safely saved on this device. Resume whenever your family is ready.',
      suggestedQuickMinutes: 3,
    };
  }

  if (!params.lastActiveDateKey) {
    return {
      missedDays: 0,
      showWelcomeBack: false,
      toneTitle: 'Bismillah — Fresh Start',
      toneMessage: 'Small consistent steps are most beloved to Allah.',
      suggestedQuickMinutes: 10,
    };
  }

  const last = new Date(`${params.lastActiveDateKey}T00:00:00`);
  const today = new Date(`${params.todayDateKey}T00:00:00`);
  const diffDays = Math.max(
    0,
    Math.floor((today.getTime() - last.getTime()) / (24 * 60 * 60 * 1000))
  );

  if (diffDays >= 2) {
    const name = params.child?.name ? `, ${params.child.name}` : '';
    return {
      missedDays: diffDays,
      showWelcomeBack: true,
      toneTitle: `Welcome back${name}! Every new day is a fresh mercy`,
      toneMessage:
        'No streak guilt here — pick a gentle 3-minute warm-up to ease back in at your own pace.',
      suggestedQuickMinutes: 3,
    };
  }

  return {
    missedDays: diffDays,
    showWelcomeBack: false,
    toneTitle: 'Steady & Calm',
    toneMessage: 'The most beloved deeds to Allah are those done consistently, even if small.',
    suggestedQuickMinutes: 10,
  };
}
