import { ChildProfile, LanguageCode } from '../types/ilmizo';
import { NOORANI_QAIDA_COURSE_LESSONS } from '../data/nooraniQaidaCourse';
import { EXPANDED_KIDS_STORIES } from '../data/expandedIslamicLibrary';
import { canAccessStoryIndex } from './subscriptionEngine';
import {
  ChildAgeBand,
  ChildLearningFocus,
  evaluateMissedDayKindness,
  inferAgeBandFromAge,
  loadLocalOnboardingProfile,
  MissedDayKindnessState,
} from './onboardingPlanEngine';
import {
  getActiveQaidaRevisionRecommendations,
  QaidaMistakeRecord,
} from './qaidaTracingStore';

export interface DailyTarbiyahStep {
  id: 'qaida' | 'story' | 'quiz_deed';
  stepNumber: 1 | 2 | 3;
  minutes: number;
  title: string;
  subtitle: string;
  completed: boolean;
  targetRoute: 'quran_learning' | 'stories' | 'daily_quiz' | 'good_deed';
  recommendedItemId?: string;
}

export interface DailyTarbiyahPlan {
  childName: string;
  ageBand: ChildAgeBand;
  focus: ChildLearningFocus;
  dateKey: string;
  totalMinutes: number;
  completedCount: number;
  remainingMinutes: number;
  isComplete: boolean;
  isPaused: boolean;
  kindnessState: MissedDayKindnessState;
  mistakeRevisions: QaidaMistakeRecord[];
  steps: DailyTarbiyahStep[];
}

export interface WeeklyTarbiyahReport {
  childName: string;
  streakDays: number;
  starsEarned: number;
  qaidaCompletedCount: number;
  qaidaTotalCount: number;
  storiesCompletedCount: number;
  storiesTotalCount: number;
  duasMasteredCount: number;
  goodDeedsCount: number;
  weeklyMinutesEstimate: number;
  hasActivityThisWeek: boolean;
  headline: string;
  whatsappShareText: string;
}

/**
 * Adaptive Daily 10-Minute Guided Tarbiyah Plan (3 focused blocks):
 * - Adapts minutes & pacing to Child age band (4-6: 8m, 7-9: 10m, 10-12: 12m)
 * - Surfaces mistake-driven Qaida revision automatically when quiz misses exist
 * - Respects Pause/Resume and Missed-Day Kindness (zero harsh streak punishment)
 */
export function buildDailyTarbiyahPlan(params: {
  child: ChildProfile;
  language: LanguageCode;
  dateKey: string;
  hasFamilyPlus: boolean;
}): DailyTarbiyahPlan {
  const { child, language, dateKey, hasFamilyPlus } = params;
  const isHinglish = language === 'hinglish' || language === 'hi';
  const onboarding = loadLocalOnboardingProfile();
  const ageBand = inferAgeBandFromAge(child.age || 8);
  const focus = onboarding.childFocus || 'balanced';
  const mistakeRevisions = getActiveQaidaRevisionRecommendations(child.id, 3);

  const kindnessState = evaluateMissedDayKindness({
    lastActiveDateKey: onboarding.lastActiveDateKey,
    todayDateKey: dateKey,
    planPaused: onboarding.planPaused,
    child,
  });

  const completedQaidaIds = new Set(child.completedQaidaLessonIds || []);
  const nextQaidaLesson =
    NOORANI_QAIDA_COURSE_LESSONS.find((l) => !completedQaidaIds.has(l.id)) ||
    NOORANI_QAIDA_COURSE_LESSONS[0];

  const completedStoryIds = new Set(child.completedStoryIds || []);
  const unlockedStories = EXPANDED_KIDS_STORIES.filter((_, idx) =>
    hasFamilyPlus ? true : idx < 6
  );
  const nextStory =
    unlockedStories.find((s) => !completedStoryIds.has(s.id)) || unlockedStories[0];

  const qaidaDone = Boolean(child.questStepsCompleted?.quran);
  const storyOrDuaDone =
    Boolean(child.questStepsCompleted?.dua) ||
    Boolean(nextStory && completedStoryIds.has(nextStory.id) && completedStoryIds.size > 0);
  const quizDeedDone =
    Boolean(child.questStepsCompleted?.quiz) || Boolean(child.questStepsCompleted?.family);

  const qaidaMin = ageBand === '4-6' ? 2 : ageBand === '10-12' ? 4 : 3;
  const storyMin = ageBand === '4-6' ? 4 : ageBand === '10-12' ? 4 : 4;
  const quizMin = ageBand === '4-6' ? 2 : ageBand === '10-12' ? 4 : 3;

  const qaidaSubtitle =
    mistakeRevisions.length > 0
      ? `Review ${mistakeRevisions.map((m) => m.arabicText).join(' · ')} + ${nextQaidaLesson.title.en}`
      : nextQaidaLesson.title.en;

  const steps: DailyTarbiyahStep[] = [
    {
      id: 'qaida',
      stepNumber: 1,
      minutes: qaidaMin,
      title:
        mistakeRevisions.length > 0
          ? isHinglish
            ? `Qaida Revision (${mistakeRevisions.length} harf)`
            : `Qaida Gentle Review (${mistakeRevisions.length} to practice)`
          : isHinglish
          ? `Qaida Lesson ${nextQaidaLesson.lessonNumber} · Trace & Suno`
          : `Qaida Lesson ${nextQaidaLesson.lessonNumber} · Trace & Listen`,
      subtitle: qaidaSubtitle,
      completed: qaidaDone,
      targetRoute: 'quran_learning',
      recommendedItemId: nextQaidaLesson.id,
    },
    {
      id: 'story',
      stepNumber: 2,
      minutes: storyMin,
      title:
        focus === 'daily_duas'
          ? 'Sunnah Story & Dua Time'
          : isHinglish
          ? 'Interactive Storybook'
          : 'Interactive Storybook',
      subtitle: nextStory?.localizedTitles?.[language] || nextStory?.title || 'Prophet Nuh (AS)',
      completed: storyOrDuaDone,
      targetRoute: 'stories',
      recommendedItemId: nextStory?.id,
    },
    {
      id: 'quiz_deed',
      stepNumber: 3,
      minutes: quizMin,
      title: isHinglish ? 'Quick Quiz + Aaj Ka Nek Amal' : 'Quick Quiz & Good Deed',
      subtitle: isHinglish
        ? '2-min Deen quiz aur 1 Sunnah good deed log karo'
        : 'Answer today’s mini quiz or log 1 Sunnah good deed',
      completed: quizDeedDone,
      targetRoute: child.questStepsCompleted?.quiz ? 'good_deed' : 'daily_quiz',
    },
  ];

  const completedCount = steps.filter((s) => s.completed).length;
  const totalMinutes = steps.reduce((sum, s) => sum + s.minutes, 0);
  const remainingMinutes = steps
    .filter((s) => !s.completed)
    .reduce((sum, s) => sum + s.minutes, 0);

  return {
    childName: child.name,
    ageBand,
    focus,
    dateKey,
    totalMinutes,
    completedCount,
    remainingMinutes,
    isComplete: completedCount === steps.length,
    isPaused: onboarding.planPaused,
    kindnessState,
    mistakeRevisions,
    steps,
  };
}

export function buildWeeklyTarbiyahReport(child: ChildProfile): WeeklyTarbiyahReport {
  const qaidaCompletedCount = (child.completedQaidaLessonIds || []).length;
  const qaidaTotalCount = NOORANI_QAIDA_COURSE_LESSONS.length;
  const storiesCompletedCount = (child.completedStoryIds || []).length;
  const storiesTotalCount = EXPANDED_KIDS_STORIES.length;
  const duasMasteredCount = Math.max(0, child.pillarProgress?.duasPracticed || 0);
  const goodDeedsCount = (child.goodDeeds || []).length;
  const streakDays = Math.max(0, child.streakDays || 0);
  const starsEarned = Math.max(0, child.stars || 0);

  const hasActivityThisWeek =
    qaidaCompletedCount > 0 ||
    storiesCompletedCount > 0 ||
    duasMasteredCount > 0 ||
    goodDeedsCount > 0 ||
    starsEarned > 0;

  const weeklyMinutesEstimate = hasActivityThisWeek
    ? Math.max(
        10,
        Math.min(7, Math.max(1, streakDays)) * 10 + qaidaCompletedCount * 5
      )
    : 0;

  const headline = hasActivityThisWeek
    ? `MashaAllah! ${child.name} completed ${qaidaCompletedCount}/${qaidaTotalCount} Qaida lessons & ${storiesCompletedCount} stories`
    : `${child.name} hasn’t logged learning activity yet — complete 1 lesson to unlock your shareable card`;

  const whatsappShareText = [
    `🌙 *Ilmizo Weekly Tarbiyah Summary — ${child.name}*`,
    `━━━━━━━━━━━━━━━━━━`,
    `📖 Noorani Qaida: ${qaidaCompletedCount} / ${qaidaTotalCount} lessons`,
    `📚 Interactive Stories: ${storiesCompletedCount} / ${storiesTotalCount} read`,
    `🤲 Duas Practiced: ${duasMasteredCount}`,
    `💛 Sunnah Good Deeds: ${goodDeedsCount}`,
    `⭐ Stars Earned: ${starsEarned} · ${streakDays} active day(s)`,
    `━━━━━━━━━━━━━━━━━━`,
    `Shared voluntarily by parents from Ilmizo — Ad-Free, Offline-First Islamic Learning.`,
  ].join('\n');

  return {
    childName: child.name,
    streakDays,
    starsEarned,
    qaidaCompletedCount,
    qaidaTotalCount,
    storiesCompletedCount,
    storiesTotalCount,
    duasMasteredCount,
    goodDeedsCount,
    weeklyMinutesEstimate,
    hasActivityThisWeek,
    headline,
    whatsappShareText,
  };
}

function escapeXml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates a clean, privacy-safe self-contained SVG Weekly Progress Card
 * (first name / nickname only, zero location/email/device IDs, 100% offline).
 */
export function generateWeeklyProgressCardSvg(report: WeeklyTarbiyahReport): string {
  const safeName = escapeXml(report.childName);
  const safeHeadline = escapeXml(report.headline);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="540" viewBox="0 0 900 540">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0F3826"/>
      <stop offset="100%" stop-color="#14532D"/>
    </linearGradient>
  </defs>
  <rect width="900" height="540" rx="32" fill="url(#bg)"/>
  <rect x="24" y="24" width="852" height="492" rx="24" fill="none" stroke="#F59E0B" stroke-opacity="0.45" stroke-width="2"/>
  <text x="56" y="78" fill="#FCD34D" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" letter-spacing="2">ILMIZO FAMILY TARBIYAH · WEEKLY SUMMARY</text>
  <text x="56" y="132" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800">MashaAllah, ${safeName}!</text>
  <text x="56" y="168" fill="#D1FAE5" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="600">${safeHeadline}</text>

  <g transform="translate(56, 210)">
    <rect width="184" height="136" rx="20" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="20" y="54" fill="#FCD34D" font-family="system-ui, sans-serif" font-size="36" font-weight="800">${report.qaidaCompletedCount}/${report.qaidaTotalCount}</text>
    <text x="20" y="90" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="700">Noorani Qaida</text>
    <text x="20" y="114" fill="#A7F3D0" font-family="system-ui, sans-serif" font-size="13">Lessons Mastered</text>
  </g>

  <g transform="translate(258, 210)">
    <rect width="184" height="136" rx="20" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="20" y="54" fill="#FCD34D" font-family="system-ui, sans-serif" font-size="36" font-weight="800">${report.storiesCompletedCount}/${report.storiesTotalCount}</text>
    <text x="20" y="90" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="700">Storybooks</text>
    <text x="20" y="114" fill="#A7F3D0" font-family="system-ui, sans-serif" font-size="13">Stories Finished</text>
  </g>

  <g transform="translate(460, 210)">
    <rect width="184" height="136" rx="20" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="20" y="54" fill="#FCD34D" font-family="system-ui, sans-serif" font-size="36" font-weight="800">${report.duasMasteredCount}</text>
    <text x="20" y="90" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="700">Sunnah Duas</text>
    <text x="20" y="114" fill="#A7F3D0" font-family="system-ui, sans-serif" font-size="13">&amp; ${report.goodDeedsCount} Good Deeds</text>
  </g>

  <g transform="translate(662, 210)">
    <rect width="182" height="136" rx="20" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="20" y="54" fill="#FCD34D" font-family="system-ui, sans-serif" font-size="36" font-weight="800">${report.starsEarned} ★</text>
    <text x="20" y="90" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="700">${report.streakDays} Active Day(s)</text>
    <text x="20" y="114" fill="#A7F3D0" font-family="system-ui, sans-serif" font-size="13">~${report.weeklyMinutesEstimate} min learned</text>
  </g>

  <rect x="56" y="392" width="788" height="84" rx="20" fill="#FDFBF7"/>
  <text x="84" y="429" fill="#14532D" font-family="system-ui, sans-serif" font-size="18" font-weight="800">Ad-Free, Offline-First Islamic Learning for the Whole Family</text>
  <text x="84" y="456" fill="#475569" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Generated privately on-device · No child tracking · No ads</text>
</svg>`;
}

export const _verifyStoryHelper = canAccessStoryIndex;
