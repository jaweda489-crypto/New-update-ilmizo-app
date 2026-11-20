import React, { Suspense, lazy, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Bell,
  Bookmark,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Download,
  FileText,
  Globe,
  HelpCircle,
  LocateFixed,
  Lock,
  Plus,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  User,
  Volume2,
  Wallet,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useIlmizo, useTranslation } from '../../context/IlmizoContext';
import { useAudioManager } from '../../services/audioManager';
import {
  ISLAMIC_LESSONS,
  QUIZ_PACKS,
  TOP_QURAN_VOCAB,
} from '../../data/islamicContent';
import { ALL_114_SURAHS } from '../../data/quranData';
import { QuranVocabMasteryView } from './QuranVocabMasteryView';
import { OemBatteryGuardSheet } from './OemBatteryGuardSheet';
import { useSeniorMinimalMode } from '../../services/seniorModeService';
import {
  CharacterAvatar,
  MobileStatusBar,
  ScreenBackButton,
  SyncStatusBadge,
  VerifiedSourceFooter,
} from '../pwa/PWAComponents';
import { PrayerName } from '../../types/ilmizo';

const LocalDataManagerCard = lazy(() =>
  import('../pwa/LocalDataManagerCard').then((m) => ({ default: m.LocalDataManagerCard }))
);
import {
  aggregateAdultProgressByPeriod,
  computeHijriDate,
  computeLearningStreak,
  computeQiblaFromCoords,
  getLocalDateKeyWithOffset,
  scoreQuizSubmission,
} from '../../engines/adultLearningEngines';
import {
  FREE_VOCAB_LIMIT,
  canAccessVocabIndex,
  isAdultPlusActive,
} from '../../services/subscriptionEngine';
import { FamilyPlusPaywallModal } from '../shared/FamilyPlusPaywallModal';
import {
  isHapticsEnabled,
  setHapticsEnabled,
  triggerLightHaptic,
} from '../../services/hapticsService';
import {
  getPrayerWidgetPlatformCapability,
  isPersistentPrayerCountdownEnabled,
  setPersistentPrayerCountdownEnabled,
} from '../../services/capacitorNativeBridge';
import { BottomSheet } from '../sheets/BottomSheet';
import { SelectSheetField } from '../sheets/SelectSheet';
import {
  EmptyState,
  InfoDisclosure,
  PrimaryButton,
  SettingsGroup,
  SettingsRow,
  ThemeModeSegmentedControl,
} from '../design-system/IlmizoPrimitives';
import { TasbihTapRing } from '../feedback/AdultMicroInteractions';

export type AdultLessonsTab = 'All' | 'Aqidah' | 'Akhlaq' | 'Fiqh' | 'Vocab600';

export const AdultLessonsScreen: React.FC<{
  initialTab?: AdultLessonsTab;
  tabRequestNonce?: number;
}> = ({ initialTab = 'All', tabRequestNonce = 0 }) => {
  const {
    user,
    setAdultRoute,
    completedLessonIds,
    markLessonCompleted,
    masteredVocabIds,
    toggleVocabMastered,
    registerSubScreenBackHandler,
  } = useIlmizo();
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const audioState = useAudioManager();
  const [tab, setTab] = useState<AdultLessonsTab>(initialTab);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [lessonSearch, setLessonSearch] = useState('');
  const [vocabSearch, setVocabSearch] = useState('');
  const [checkSelected, setCheckSelected] = useState<number | null>(null);
  const [vocabPaywallOpen, setVocabPaywallOpen] = useState(false);

  useEffect(() => {
    if (tabRequestNonce > 0) {
      setTab(initialTab);
      setActiveLessonId(null);
    }
  }, [initialTab, tabRequestNonce]);

  useEffect(() => {
    if (activeLessonId) {
      registerSubScreenBackHandler(() => {
        setActiveLessonId(null);
        setCheckSelected(null);
        return true;
      });
      return () => registerSubScreenBackHandler(null);
    }
    registerSubScreenBackHandler(null);
    return () => registerSubScreenBackHandler(null);
  }, [activeLessonId, registerSubScreenBackHandler]);

  const filteredLessons = ISLAMIC_LESSONS.filter((l) => {
    if (tab !== 'All' && l.category !== tab) return false;
    if (lessonSearch.trim()) {
      const q = lessonSearch.toLowerCase();
      return (
        l.title.toLowerCase().includes(q) ||
        l.subtitle.toLowerCase().includes(q) ||
        l.keyTakeaway.toLowerCase().includes(q)
      );
    }
    return true;
  });
  const activeLesson = ISLAMIC_LESSONS.find((l) => l.id === activeLessonId);

  const indexedVocab = TOP_QURAN_VOCAB.map((word, originalIdx) => ({ word, originalIdx }));
  const filteredVocab = indexedVocab.filter(
    ({ word }) =>
      word.transliteration.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      word.meaning.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      word.arabic.includes(vocabSearch)
  );
  const adultPlusUnlocked = isAdultPlusActive(user);
  const visibleVocab = filteredVocab.filter(({ originalIdx }) =>
    canAccessVocabIndex(user, originalIdx)
  );
  const lockedVocabCount = Math.max(0, TOP_QURAN_VOCAB.length - FREE_VOCAB_LIMIT);

  const iconStyles = [
    'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-400/30',
    'bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-400/30',
    'bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-400/30',
    'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-400/30',
    'bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-400/30',
  ];

  return (
    <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
      {/* Screen 9: Islamic Lessons Header */}
      <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pb-4 shadow-md border-b border-amber-400/15">
        <MobileStatusBar time="9:31" light />
        <div className="flex items-center justify-between px-4 pt-1 pb-3">
          <ScreenBackButton variant="dark" />
          <h1 className="text-lg font-extrabold">{t('islamic_lessons')}</h1>
          <div className="min-w-[44px] h-9 px-2.5 rounded-full bg-white/10 flex items-center justify-center text-amber-300 text-xs font-bold tabular-nums">
            {completedLessonIds.length}/{ISLAMIC_LESSONS.length}
          </div>
        </div>

        {/* Learn Hub Quick Switcher (1-tap access to Hifz, Progress, Duas, 99 Names, Seerah & Quizzes) */}
        <div className="px-4 pb-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'lessons' as const, label: 'Lessons', active: true },
            { id: 'hifz' as const, label: 'Hifz Studio', active: false },
            { id: 'duas' as const, label: 'Duas', active: false },
            { id: 'names99' as const, label: '99 Names', active: false },
            { id: 'seerah' as const, label: 'Seerah', active: false },
            { id: 'quizzes' as const, label: 'Quizzes', active: false },
            { id: 'progress' as const, label: 'Progress', active: false },
          ].map((hubItem) => (
            <button
              key={hubItem.id}
              type="button"
              onClick={() => {
                if (!hubItem.active) {
                  void triggerLightHaptic();
                  setAdultRoute(hubItem.id);
                }
              }}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition active:scale-95 ${
                hubItem.active
                  ? 'bg-amber-400 text-emerald-950 shadow-2xs'
                  : 'bg-white/10 text-emerald-50 hover:bg-white/20 border border-white/15'
              }`}
            >
              {hubItem.label}
            </button>
          ))}
        </div>

        <div className="mx-4 flex items-center gap-1.5 overflow-x-auto bg-black/25 p-1 rounded-full">
          {(['All', 'Aqidah', 'Akhlaq', 'Fiqh', 'Vocab600'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setTab(item);
                setActiveLessonId(null);
                setCheckSelected(null);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition whitespace-nowrap flex-1 ${
                tab === item
                  ? 'bg-amber-400 text-emerald-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              {item === 'Vocab600' ? '600 Words' : item}
            </button>
          ))}
        </div>
      </div>

      {/* Persistent Sticky Curriculum & Recitation Progress Indicator (stays visible even while scrolling or when audio mini-player is minimized) */}
      {(() => {
        const curriculumPct = Math.round(
          (completedLessonIds.length / Math.max(1, ISLAMIC_LESSONS.length)) * 100
        );
        const hasLiveAudio =
          audioState.status !== 'idle' && Boolean(audioState.quranSequence.surahName);
        const liveAudioPct = Math.max(4, audioState.quranSequence.progressPercent || 0);

        return (
          <div
            aria-label="Persistent Learning Progress"
            className="sticky top-0 z-20 bg-[var(--bg-app)]/92 backdrop-blur-md border-b border-[var(--border-subtle)] px-4 py-2 transition-colors"
          >
            <div className="flex items-center justify-between gap-2 text-[11px] font-extrabold">
              <span className="text-[#14532D] dark:text-emerald-300 tabular-nums">
                Curriculum: {completedLessonIds.length}/{ISLAMIC_LESSONS.length} ({curriculumPct}%)
              </span>
              {hasLiveAudio ? (
                <span className="inline-flex items-center gap-1.5 text-amber-800 dark:text-amber-300 tabular-nums truncate max-w-[55%]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                  <span className="truncate">
                    {audioState.quranSequence.surahName} · Ayah{' '}
                    {audioState.quranSequence.currentAyah || 1} ({liveAudioPct}%)
                  </span>
                </span>
              ) : (
                <span className="text-[var(--text-muted)] tabular-nums">
                  {masteredVocabIds.length} words mastered
                </span>
              )}
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#14532D] via-[#22C55E] to-[#F59E0B] transition-all duration-300"
                style={{ width: `${Math.max(3, curriculumPct)}%` }}
              />
            </div>
          </div>
        );
      })()}

      <div className="px-4 pt-4">
        {activeLesson ? (
          <div className="rounded-3xl bg-[var(--bg-surface)] p-5 shadow-xs border border-[var(--border-subtle)] space-y-4">
            <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-bold">
              <div className="flex items-center gap-2">
                <span>
                  {activeLesson.category} · {activeLesson.durationMin} min read
                </span>
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700/40">
                  {activeLesson.verification.status === 'Verified' ? '✓ Verified' : 'Under Review'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveLessonId(null);
                  setCheckSelected(null);
                }}
                className="underline"
              >
                ← Back
              </button>
            </div>
            <h2 className="text-xl font-extrabold text-[var(--text-primary)]">{activeLesson.title}</h2>
            <p className="text-xs text-[var(--text-secondary)]">{activeLesson.subtitle}</p>
            <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-2.5 text-sm text-[var(--text-primary)] leading-relaxed">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#14532D] dark:text-emerald-300">
                Verified Textual Summary
              </p>
              {activeLesson.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-400/30 p-3.5">
              <p className="text-xs font-extrabold text-amber-900 dark:text-amber-300">
                Educational Takeaway & Personal Reflection
              </p>
              <p className="text-xs text-amber-950 dark:text-amber-100 mt-1">{activeLesson.keyTakeaway}</p>
            </div>

            {/* Quick Knowledge Check inside Lesson */}
            <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-2">
              <p className="text-xs font-extrabold text-[var(--text-primary)]">
                Quick Reflection Check: What is the primary focus of "{activeLesson.title}"?
              </p>
              {[
                activeLesson.keyTakeaway,
                'Skipping daily reflection and rushing through worship without presence of heart.',
              ].map((opt, idx) => {
                const isPicked = checkSelected === idx;
                const isCorrect = idx === 0;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCheckSelected(idx)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-semibold transition flex items-center justify-between gap-2 ${
                      isPicked
                        ? isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-900/40 border-emerald-600 text-emerald-950 dark:text-emerald-100 font-bold'
                          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                        : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                    }`}
                  >
                    <span className="line-clamp-2">{opt}</span>
                    {isPicked && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <VerifiedSourceFooter
              source={activeLesson.verification.source}
              reference={activeLesson.verification.reference}
            />
            <button
              type="button"
              onClick={() => {
                markLessonCompleted(activeLesson.id);
                setActiveLessonId(null);
                setCheckSelected(null);
              }}
              className="w-full min-h-[46px] rounded-2xl bg-[#14532D] text-white font-extrabold text-xs hover:bg-emerald-800 transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {completedLessonIds.includes(activeLesson.id)
                  ? 'Completed ✓ (Tap to Return)'
                  : 'Mark Lesson Complete'}
              </span>
            </button>
          </div>
        ) : tab === 'Vocab600' ? (
          <QuranVocabMasteryView
            words={TOP_QURAN_VOCAB}
            masteredVocabIds={masteredVocabIds}
            onToggleMastered={toggleVocabMastered}
            freeVocabLimit={FREE_VOCAB_LIMIT}
            adultPlusUnlocked={adultPlusUnlocked}
            onOpenPaywall={() => setVocabPaywallOpen(true)}
          />
        ) : (
          <div className="space-y-3">
            {/* Emerald-Gold Learning Journey Hero Anchor */}
            {(() => {
              const nextIncomplete =
                ISLAMIC_LESSONS.find((l) => !completedLessonIds.includes(l.id)) ||
                ISLAMIC_LESSONS[0];
              const pct = Math.round(
                (completedLessonIds.length / Math.max(1, ISLAMIC_LESSONS.length)) * 100
              );
              return (
                <div className="rounded-3xl bg-gradient-to-br from-[#0F3826] via-[#14532D] to-[#0B2D1E] text-white p-4 shadow-md border border-amber-400/25 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                        Structured Islamic Curriculum
                      </p>
                      <h2 className="text-base font-extrabold leading-snug mt-0.5 truncate">
                        {nextIncomplete ? nextIncomplete.title : 'All Lessons Completed'}
                      </h2>
                      <p className="text-xs text-emerald-100/80 mt-0.5">
                        {completedLessonIds.length} of {ISLAMIC_LESSONS.length} lessons completed · {pct}% mastery
                      </p>
                    </div>
                    {nextIncomplete && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLessonId(nextIncomplete.id);
                          setCheckSelected(null);
                        }}
                        className="min-h-[40px] px-3.5 py-2 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-emerald-950 font-extrabold text-xs shrink-0 shadow-sm active:scale-95 transition"
                      >
                        {completedLessonIds.length > 0 ? 'Continue' : 'Start'}
                      </button>
                    )}
                  </div>
                  <div className="h-2 rounded-full bg-black/30 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#4ADE80] via-[#FDE68A] to-[#F59E0B] transition-all duration-300"
                      style={{ width: `${Math.max(4, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })()}

            <div className="relative">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={lessonSearch}
                onChange={(e) => setLessonSearch(e.target.value)}
                placeholder="Search lessons by title, topic or takeaway..."
                className="w-full rounded-full ilmizo-input pl-10 pr-4 py-2.5 text-xs font-medium shadow-2xs"
              />
            </div>
            {filteredLessons.length === 0 ? (
              <div className="rounded-2xl bg-[var(--bg-surface)] p-6 text-center border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                No lessons match "{lessonSearch}". Try clearing your search filter.
              </div>
            ) : (
              filteredLessons.map((lesson, idx) => {
                const done = completedLessonIds.includes(lesson.id);
                return (
                  <motion.button
                    key={lesson.id}
                    type="button"
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.01 : 0.22,
                      delay: prefersReducedMotion ? 0 : Math.min(idx * 0.03, 0.24),
                      ease: 'easeOut',
                    }}
                    onClick={() => {
                      setActiveLessonId(lesson.id);
                      setCheckSelected(null);
                    }}
                    className="w-full text-left rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] hover:border-emerald-700/40 active:scale-[0.99] transition flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${
                          iconStyles[idx % iconStyles.length]
                        }`}
                      >
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{lesson.title}</h3>
                          <span className="text-[11px] font-bold text-[var(--text-muted)]">
                            · {lesson.durationMin}m
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{lesson.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {done && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                      <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                    </div>
                  </motion.button>
                );
              })
            )}
          </div>
        )}
      </div>

      <FamilyPlusPaywallModal
        open={vocabPaywallOpen}
        onClose={() => setVocabPaywallOpen(false)}
        skipParentGate
        triggerReason="Unlock all High-Frequency Quranic Words, Word-by-Word Hifz Studio, and Retention Analytics with Adult Quran Plus (₹99/yr) or Family Plus (₹199/yr)."
      />
    </div>
  );
};

export interface AdultQuizCardConfig {
  id: string;
  title: string;
  count: string;
  level: 'Beginner' | 'Intermediate';
  tint: string;
  targetId?: string;
}

export const ADULT_QUIZ_CARDS: AdultQuizCardConfig[] = [
  {
    id: 'quiz_quran_knowledge',
    title: 'Quran Knowledge',
    count: '10 Questions',
    level: 'Beginner',
    tint: 'bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300',
  },
  {
    id: 'quiz_seerah_history',
    title: 'Islamic History',
    count: '10 Questions',
    level: 'Intermediate',
    tint: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300',
  },
  {
    id: 'quiz_daily_duas',
    title: 'Daily Duas',
    count: '10 Questions',
    level: 'Beginner',
    tint: 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300',
  },
  {
    id: 'quiz_salah_wudu',
    title: 'Salah & Wudu',
    count: '10 Questions',
    level: 'Beginner',
    tint: 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300',
  },
  {
    id: 'quiz_names_99',
    title: '99 Names of Allah',
    count: '10 Questions',
    level: 'Intermediate',
    tint: 'bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300',
  },
];

export const AdultQuizzesScreen: React.FC = () => {
  const { quizAttempts, recordQuizAttempt, registerSubScreenBackHandler } = useIlmizo();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate'>('All');
  const [activePackId, setActivePackId] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [selectedByQuestionId, setSelectedByQuestionId] = useState<Record<string, number>>({});
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [hasSubmittedAttempt, setHasSubmittedAttempt] = useState(false);
  const [missedQuestionIndices, setMissedQuestionIndices] = useState<number[]>([]);
  const [retryOnlyMissed, setRetryOnlyMissed] = useState(false);

  const activePack = QUIZ_PACKS.find((p) => p.id === activePackId);

  useEffect(() => {
    if (activePackId) {
      registerSubScreenBackHandler(() => {
        setActivePackId(null);
        return true;
      });
      return () => registerSubScreenBackHandler(null);
    }
    registerSubScreenBackHandler(null);
    return () => registerSubScreenBackHandler(null);
  }, [activePackId, registerSubScreenBackHandler]);

  const activeQuestions =
    activePack && retryOnlyMissed && missedQuestionIndices.length > 0
      ? activePack.questions.filter((_, i) => missedQuestionIndices.includes(i))
      : activePack?.questions || [];

  const startQuiz = (id: string) => {
    setActivePackId(id);
    setQIndex(0);
    setSelectedOpt(null);
    setSelectedByQuestionId({});
    setScore(0);
    setFinished(false);
    setHasSubmittedAttempt(false);
    setMissedQuestionIndices([]);
    setRetryOnlyMissed(false);
  };

  const extraQuizCards = ADULT_QUIZ_CARDS.filter((c) =>
    filter === 'All' ? true : c.level === filter
  );

  return (
    <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
      {/* Screen 10: Quizzes Header */}
      <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pb-4 shadow-md border-b border-amber-400/15">
        <MobileStatusBar time="9:31" light />
        <div className="flex items-center justify-between px-4 pt-1 pb-3">
          <ScreenBackButton variant="dark" />
          <h1 className="text-lg font-extrabold">{t('quizzes')}</h1>
          <div className="min-w-[44px] h-9 px-2.5 rounded-full bg-white/10 flex items-center justify-center text-xs font-extrabold text-amber-300 tabular-nums">
            {quizAttempts.length}
          </div>
        </div>
        {!activePack && (
          <div className="mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full">
            {(['All', 'Beginner', 'Intermediate'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setFilter(lvl)}
                className={`py-1.5 rounded-full text-xs font-extrabold transition ${
                  filter === lvl
                    ? 'bg-amber-400 text-emerald-950 shadow-xs'
                    : 'text-emerald-100 hover:bg-white/10'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 pt-4 space-y-4">
        {activePack && activeQuestions.length === 0 ? (
          <div className="rounded-3xl bg-[var(--bg-surface)] p-6 shadow-xs border border-[var(--border-subtle)] text-center space-y-3">
            <p className="text-sm font-extrabold text-[var(--text-primary)]">
              No questions available in this quiz pack.
            </p>
            <button
              type="button"
              onClick={() => setActivePackId(null)}
              className="px-4 py-2 rounded-xl bg-[#14532D] text-white text-xs font-extrabold"
            >
              Back to All Quizzes
            </button>
          </div>
        ) : activePack && activeQuestions.length > 0 ? (
          finished ? (
            <div className="rounded-3xl bg-[var(--bg-surface)] p-6 shadow-xs border border-[var(--border-subtle)] text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
                MashaAllah! Quiz Completed
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                You scored{' '}
                <strong className="text-emerald-700 dark:text-emerald-300 tabular-nums">
                  {score} / {activeQuestions.length}
                </strong>{' '}
                in {activePack.title}.
              </p>
              {missedQuestionIndices.length > 0 && !retryOnlyMissed && (
                <button
                  type="button"
                  onClick={() => {
                    setRetryOnlyMissed(true);
                    setQIndex(0);
                    setSelectedOpt(null);
                    setSelectedByQuestionId({});
                    setScore(0);
                    setFinished(false);
                    setHasSubmittedAttempt(false);
                  }}
                  className="w-full min-h-[44px] rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-400/30 font-extrabold text-xs"
                >
                  Retry {missedQuestionIndices.length} Missed Question(s)
                </button>
              )}
              <button
                type="button"
                onClick={() => setActivePackId(null)}
                className="w-full min-h-[46px] rounded-2xl bg-[#14532D] text-white font-extrabold text-xs"
              >
                Back to All Quizzes
              </button>
            </div>
          ) : (
            <div className="rounded-3xl bg-[var(--bg-surface)] p-5 shadow-xs border border-[var(--border-subtle)] space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-[var(--text-secondary)]">
                <span>
                  {activePack.title} {retryOnlyMissed ? '(Retry Missed)' : ''}
                </span>
                <span className="tabular-nums">
                  {qIndex + 1}/{activeQuestions.length}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-emerald-100 dark:bg-emerald-950 overflow-hidden">
                <div
                  className="h-full bg-[#14532D] dark:bg-emerald-400 transition-all"
                  style={{ width: `${((qIndex + 1) / activeQuestions.length) * 100}%` }}
                />
              </div>
              <h2 className="text-base font-extrabold text-[var(--text-primary)]">
                {activeQuestions[qIndex].prompt}
              </h2>
              <div className="space-y-2">
                {activeQuestions[qIndex].options.map((opt, idx) => {
                  const isSelected = selectedOpt === idx;
                  const isCorrect = idx === activeQuestions[qIndex].correctIndex;
                  let style =
                    'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)]';
                  if (selectedOpt !== null) {
                    if (isCorrect)
                      style =
                        'bg-emerald-50 dark:bg-emerald-900/40 border-emerald-600 text-emerald-950 dark:text-emerald-100 font-bold';
                    else if (isSelected)
                      style =
                        'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200';
                  }
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={selectedOpt !== null}
                      onClick={() => {
                        const currentQ = activeQuestions[qIndex];
                        setSelectedOpt(idx);
                        const nextMap = { ...selectedByQuestionId, [currentQ.id]: idx };
                        setSelectedByQuestionId(nextMap);
                        if (isCorrect) {
                          setScore((s) => s + 1);
                        } else {
                          setMissedQuestionIndices((prev) =>
                            prev.includes(qIndex) ? prev : [...prev, qIndex]
                          );
                        }
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs font-semibold transition flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt !== null && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              {selectedOpt !== null && (
                <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 text-xs text-[var(--text-secondary)] space-y-1">
                  <p className="font-bold text-[var(--text-primary)]">
                    {activeQuestions[qIndex].explanation}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Ref: {activeQuestions[qIndex].reference}
                  </p>
                </div>
              )}
              <button
                type="button"
                disabled={selectedOpt === null || hasSubmittedAttempt}
                onClick={() => {
                  if (qIndex + 1 < activeQuestions.length) {
                    setQIndex((i) => i + 1);
                    setSelectedOpt(null);
                  } else if (!hasSubmittedAttempt) {
                    setHasSubmittedAttempt(true);
                    const scored = scoreQuizSubmission(activeQuestions, selectedByQuestionId);
                    setScore(scored.score);
                    recordQuizAttempt({
                      quizId: activePack.id,
                      quizTitle: activePack.title,
                      score: scored.score,
                      total: scored.total,
                      mode: 'adult',
                    });
                    setFinished(true);
                  }
                }}
                className="w-full min-h-[46px] rounded-2xl bg-[#14532D] disabled:opacity-40 text-white font-extrabold text-xs"
              >
                {qIndex + 1 < activeQuestions.length ? 'Next Question' : 'Complete Quiz'}
              </button>
            </div>
          )
        ) : (
          <>
            <div className="space-y-2.5">
              {extraQuizCards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => startQuiz(card.targetId || card.id)}
                  className="w-full text-left rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] hover:border-emerald-700/40 transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl ${card.tint} flex items-center justify-center shrink-0`}
                    >
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{card.title}</h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {card.count} · {card.level}
                      </p>
                    </div>
                  </div>
                  <Star className="w-5 h-5 text-amber-400 fill-current shrink-0" />
                </button>
              ))}
            </div>

            {/* Recorded Quiz Attempt History */}
            {quizAttempts.length > 0 && (
              <div className="rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-2">
                <h3 className="text-xs font-extrabold text-[var(--text-primary)]">
                  Recent Recorded Quiz Attempts
                </h3>
                <div className="divide-y divide-[var(--divider)]">
                  {quizAttempts.slice(0, 5).map((att) => (
                    <div
                      key={att.id}
                      className="py-2 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-[var(--text-primary)]">{att.quizTitle}</p>
                        <p className="text-[11px] text-[var(--text-muted)]">{att.completedAt}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-200 font-extrabold tabular-nums">
                        {att.score}/{att.total}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export const AdultProgressScreen: React.FC = () => {
  const {
    hifzPlans,
    favoriteDuaIds,
    quizAttempts,
    completedLessonIds,
    masteredVocabIds,
    recentlyOpenedSurahs,
    salahRecords,
    bookmarks,
    learningEvents,
    dailyVerseActivity,
  } = useIlmizo();
  const [tab, setTab] = useState<'Overview' | 'Streak' | 'Achievements'>('Overview');
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'all_time'>('weekly');

  const completedSurahsCount = hifzPlans.filter((p) => p.status === 'completed').length;
  const realLessonsCount = completedLessonIds.length;
  const realDuasSavedCount = favoriteDuaIds.length;
  const realQuizzesCount = quizAttempts.length;

  const periodStats = aggregateAdultProgressByPeriod({
    period,
    learningEvents,
    salahRecords,
    dailyVerseActivity,
    quizAttempts,
    baseDate: new Date(),
  });

  const streakDetails = computeLearningStreak({
    learningEvents,
    salahRecords,
    dailyVerseActivity,
    baseDate: new Date(),
  });

  // Build 7-day activity bars strictly from recorded salahRecords & learningEvents (zero fake offsets)
  const weeklyBars = Array.from({ length: 7 }, (_, idx) => {
    const offset = idx - 6;
    const key = getLocalDateKeyWithOffset(offset, new Date());
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const prayers = salahRecords[key]?.prayers;
    const prayedCount = prayers
      ? Object.values(prayers).filter((s) => s === 'prayed_on_time' || s === 'prayed').length
      : 0;
    const eventsOnDay = learningEvents.filter((e) => e.dateKey === key).length;
    const totalActivityUnits = prayedCount + eventsOnDay;
    const heightPx = totalActivityUnits > 0 ? Math.min(60, 12 + totalActivityUnits * 8) : 6;
    return { key, day: dayLabel, h: heightPx, prayedCount, eventsOnDay };
  });

  const adultAchievements = [
    {
      id: 'ach_quran_reader',
      title: 'Consistent Quran Reader',
      desc: `Read ${periodStats.versesReadCount} verses (${period}) & saved ${bookmarks.length} bookmarks`,
      unlocked: periodStats.versesReadCount >= 1 || bookmarks.length >= 1,
    },
    {
      id: 'ach_hifz_guardian',
      title: 'Hifz Guardian (Juz Amma)',
      desc: `${completedSurahsCount} Surahs completed in Hifz Tracker`,
      unlocked: completedSurahsCount >= 5,
    },
    {
      id: 'ach_seeker_ilm',
      title: 'Seeker of Sacred Knowledge',
      desc: `Completed ${realLessonsCount} Islamic lessons & ${masteredVocabIds.length} Quranic words`,
      unlocked: realLessonsCount >= 1 || masteredVocabIds.length >= 3,
    },
    {
      id: 'ach_dua_memorizer',
      title: 'Hisn al-Muslim Companion',
      desc: `${realDuasSavedCount} verified Duas saved to favorites`,
      unlocked: realDuasSavedCount >= 3,
    },
  ];

  return (
    <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
      {/* Screen 11: My Progress */}
      <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pb-4 shadow-md border-b border-amber-400/15">
        <MobileStatusBar time="9:31" light />
        <div className="flex items-center justify-between px-4 pt-1 pb-3">
          <ScreenBackButton variant="dark" />
          <h1 className="text-lg font-extrabold">My Progress</h1>
          <SyncStatusBadge compact />
        </div>
        <div className="mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full">
          {(['Overview', 'Streak', 'Achievements'] as const).map((tName) => (
            <button
              key={tName}
              type="button"
              onClick={() => setTab(tName)}
              className={`py-1.5 rounded-full text-xs font-extrabold transition ${
                tab === tName
                  ? 'bg-amber-400 text-emerald-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              {tName}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3.5">
        {tab === 'Overview' && (
          <>
            {/* Period Filter: Daily | Weekly | Monthly | All-Time */}
            <div className="grid grid-cols-4 gap-1 bg-[var(--bg-surface)] p-1 rounded-full border border-[var(--border-subtle)] shadow-2xs">
              {(
                [
                  { id: 'daily', label: 'Daily' },
                  { id: 'weekly', label: 'Weekly' },
                  { id: 'monthly', label: 'Monthly' },
                  { id: 'all_time', label: 'All-Time' },
                ] as const
              ).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPeriod(p.id)}
                  className={`py-1.5 rounded-full text-[11px] font-extrabold transition ${
                    period === p.id
                      ? 'bg-[#14532D] text-white shadow-2xs'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="rounded-3xl bg-[var(--bg-surface)] p-5 shadow-xs border border-[var(--border-subtle)] space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-[var(--text-primary)]">Your Learning Journey</h2>
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/40 px-2.5 py-0.5 rounded-full">
                  {streakDetails.activeDateKeys.length} Active Day(s)
                </span>
              </div>

              {/* Dynamic Emerald-Gold Circular Mastery Ring */}
              {(() => {
                const pct = Math.min(
                  100,
                  Math.round((realLessonsCount / Math.max(1, ISLAMIC_LESSONS.length)) * 100)
                );
                const radius = 56;
                const circumference = 2 * Math.PI * radius;
                const dashOffset = circumference - (circumference * Math.max(pct, 3)) / 100;
                return (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-5 py-2">
                    <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                      <svg className="w-36 h-36 -rotate-90" viewBox="0 0 132 132" aria-hidden="true">
                        <defs>
                          <linearGradient id="ilmizoProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#14532D" />
                            <stop offset="55%" stopColor="#22C55E" />
                            <stop offset="100%" stopColor="#F59E0B" />
                          </linearGradient>
                        </defs>
                        <circle
                          cx="66"
                          cy="66"
                          r={radius}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="11"
                          className="text-emerald-950/10 dark:text-white/10"
                        />
                        <circle
                          cx="66"
                          cy="66"
                          r={radius}
                          fill="none"
                          stroke="url(#ilmizoProgressGrad)"
                          strokeWidth="11"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={dashOffset}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-extrabold text-[var(--text-primary)] tabular-nums leading-none">
                          {pct}%
                        </span>
                        <span className="text-[11px] font-bold text-[var(--text-secondary)] mt-1">
                          Overall
                        </span>
                      </div>
                    </div>

                    <div className="text-center sm:text-left space-y-1.5">
                      <p className="text-xs font-extrabold text-[#14532D] dark:text-amber-300 uppercase tracking-wider">
                        Curriculum Progress
                      </p>
                      <p className="text-base font-extrabold text-[var(--text-primary)] tabular-nums">
                        {realLessonsCount} of {ISLAMIC_LESSONS.length} Lessons Completed
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {streakDetails.currentStreakDays}-day active streak · {masteredVocabIds.length} Quranic words mastered
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Period Activity Breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center bg-[var(--bg-elevated)] rounded-2xl p-2.5 border border-[var(--border-subtle)]">
                <div>
                  <p className="text-base font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
                    {periodStats.versesReadCount}
                  </p>
                  <p className="text-[11px] font-bold text-[var(--text-secondary)]">Verses Read</p>
                </div>
                <div>
                  <p className="text-base font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
                    {periodStats.hifzRevisionsCount}
                  </p>
                  <p className="text-[11px] font-bold text-[var(--text-secondary)]">Hifz Reviews</p>
                </div>
                <div>
                  <p className="text-base font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
                    {periodStats.prayersCompletedCount}
                  </p>
                  <p className="text-[11px] font-bold text-[var(--text-secondary)]">Prayers Logged</p>
                </div>
              </div>

              {/* This Week Vertical Bar Chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-[var(--text-primary)]">Last 7 Days (Recorded Activity)</p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Quran words mastered: {masteredVocabIds.length}
                  </p>
                </div>
                <div className="grid grid-cols-7 gap-2 items-end h-24 pt-2 px-2">
                  {weeklyBars.map((b) => (
                    <div key={b.key} className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-4 rounded-md transition-all ${
                          b.prayedCount + b.eventsOnDay > 0
                            ? 'bg-[#14532D] dark:bg-emerald-400'
                            : 'bg-slate-200 dark:bg-emerald-950'
                        }`}
                        style={{ height: `${b.h}px` }}
                        title={`${b.day}: ${b.prayedCount} prayers, ${b.eventsOnDay} learning events`}
                      />
                      <span className="text-[11px] font-semibold text-[var(--text-muted)]">{b.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3 Bottom Stat Cards */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)]">
                <p className="text-2xl font-extrabold text-[var(--text-primary)] tabular-nums">
                  {completedSurahsCount}
                </p>
                <p className="text-xs font-bold text-[var(--text-secondary)] mt-0.5">Surahs</p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Memorized ({recentlyOpenedSurahs.length} opened)
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)]">
                <p className="text-2xl font-extrabold text-[var(--text-primary)] tabular-nums">
                  {realDuasSavedCount}
                </p>
                <p className="text-xs font-bold text-[var(--text-secondary)] mt-0.5">Duas</p>
                <p className="text-[11px] text-[var(--text-muted)]">Saved</p>
              </div>
              <div className="rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)]">
                <p className="text-2xl font-extrabold text-[var(--text-primary)] tabular-nums">
                  {realQuizzesCount}
                </p>
                <p className="text-xs font-bold text-[var(--text-secondary)] mt-0.5">Quizzes</p>
                <p className="text-[11px] text-[var(--text-muted)]">Completed</p>
              </div>
            </div>
          </>
        )}

        {tab === 'Streak' && (
          <div className="rounded-3xl bg-[var(--bg-surface)] p-5 shadow-xs border border-[var(--border-subtle)] space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-[var(--text-secondary)]">Current Learning Streak</p>
                <p className="text-3xl font-extrabold text-[var(--text-primary)] tabular-nums mt-0.5">
                  {streakDetails.currentStreakDays} Day{streakDetails.currentStreakDays === 1 ? '' : 's'}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Longest Streak: <strong className="text-[var(--text-primary)]">{streakDetails.longestStreakDays}d</strong> · Today:{' '}
                  <strong className="text-emerald-700 dark:text-emerald-300">
                    {streakDetails.isTodayActive ? 'Active ✓' : 'Not yet logged'}
                  </strong>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <InfoDisclosure
                  label="Streak Rule"
                  sheetTitle="Streak & Local Timezone Rule"
                  sheetSubtitle="How Ilmizo records your daily consistency"
                >
                  <p>
                    A calendar day (<code>YYYY-MM-DD</code> in your local device timezone) counts as active when you read a Quran verse, complete a Hifz revision, log a Salah prayer, finish a lesson, or submit a quiz.
                  </p>
                  <p>
                    Merely opening a Surah list or browsing without reading does not count. Missing a full local calendar day resets the current streak to 0.
                  </p>
                </InfoDisclosure>
                <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1.5 pt-1">
              {weeklyBars.map((b) => (
                <div
                  key={b.key}
                  className="rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-2 text-center"
                >
                  <p className="text-[11px] font-bold text-[var(--text-muted)]">{b.day}</p>
                  <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300 mt-1 tabular-nums">
                    {b.prayedCount}/5
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Achievements' && (
          <div className="space-y-2.5">
            {adultAchievements.map((ach) => (
              <div
                key={ach.id}
                className={`rounded-2xl p-4 border flex items-center justify-between gap-3 ${
                  ach.unlocked
                    ? 'bg-[var(--bg-surface)] border-[var(--border-subtle)] shadow-2xs'
                    : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] opacity-75'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      ach.unlocked
                        ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300'
                        : 'bg-slate-200 dark:bg-emerald-950 text-[var(--text-muted)]'
                    }`}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{ach.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ach.desc}</p>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${
                    ach.unlocked
                      ? 'bg-emerald-100 dark:bg-emerald-900/50 text-[#14532D] dark:text-emerald-200'
                      : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {ach.unlocked ? 'Earned' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const AdultQiblaScreen: React.FC = () => {
  const { setAdultRoute, user, updateUser } = useIlmizo();
  const [selectedCity, setSelectedCity] = useState(user.city || 'Jamshedpur');
  const [gpsStatus, setGpsStatus] = useState<string | null>(null);
  const [liveBearing, setLiveBearing] = useState<{
    bearing: number;
    dir: string;
    distKm: number;
  } | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [sensorActive, setSensorActive] = useState<boolean>(false);
  const [showAlignmentDetails, setShowAlignmentDetails] = useState(false);

  const cityBearings: Record<
    string,
    { bearing: number; dir: string; distKm: number; lat: number; lon: number }
  > = {
    Jamshedpur: { bearing: 278, dir: '278° WNW', distKm: 4720, lat: 22.8046, lon: 86.2029 },
    NewDelhi: { bearing: 266, dir: '266° W', distKm: 3815, lat: 28.6139, lon: 77.209 },
    Mumbai: { bearing: 280, dir: '280° WNW', distKm: 3520, lat: 19.076, lon: 72.8777 },
    London: { bearing: 119, dir: '119° ESE', distKm: 4790, lat: 51.5072, lon: -0.1276 },
    Istanbul: { bearing: 151, dir: '151° SSE', distKm: 2400, lat: 41.0082, lon: 28.9784 },
  };

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const webkitCompass = (e as any).webkitCompassHeading;
      if (typeof webkitCompass === 'number') {
        setDeviceHeading(Math.round(webkitCompass));
        setSensorActive(true);
      } else if (typeof e.alpha === 'number') {
        setDeviceHeading(Math.round((360 - e.alpha) % 360));
        setSensorActive(true);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  const requestCompassSensor = async () => {
    const DOEvent = window.DeviceOrientationEvent as any;
    if (DOEvent && typeof DOEvent.requestPermission === 'function') {
      try {
        const res = await DOEvent.requestPermission();
        if (res === 'granted') {
          setGpsStatus('Compass permission granted. Rotate your device to receive live heading events.');
        } else {
          setGpsStatus('Compass permission denied; use interactive dial slider below.');
        }
      } catch {
        setGpsStatus('Compass sensor permission denied; use interactive dial slider below.');
      }
    } else {
      setGpsStatus('Rotate your phone (if equipped with a magnetometer) or drag the compass heading slider below.');
    }
  };

  const handleUseLiveGps = () => {
    if (!('geolocation' in navigator)) {
      setGpsStatus('Geolocation is not supported by this browser. Using selected city preset.');
      return;
    }
    setGpsStatus('Requesting GPS coordinates...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const res = computeQiblaFromCoords(pos.coords.latitude, pos.coords.longitude);
        setLiveBearing(res);
        setSelectedCity('Live GPS');
        setGpsStatus(
          `Calibrated from live GPS (${pos.coords.latitude.toFixed(2)}°, ${pos.coords.longitude.toFixed(2)}°)`
        );
      },
      () => {
        setGpsStatus(
          'Location permission declined or unavailable. Using selected city preset.'
        );
      },
      { timeout: 6000 }
    );
  };

  const info =
    liveBearing ||
    cityBearings[selectedCity] || { bearing: 142, dir: '142° SE', distKm: 4720 };

  const relativeNeedleRotation = (info.bearing - deviceHeading + 360) % 360;
  const angularDiff = Math.min(
    Math.abs(info.bearing - deviceHeading),
    360 - Math.abs(info.bearing - deviceHeading)
  );
  const isAlignedWithQibla = angularDiff <= 6;

  return (
    <div className="pb-20 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
      {/* Screen 12: 3D Qibla Kaaba Compass */}
      <div className="relative overflow-hidden bg-[#0F3826] text-white rounded-b-[32px] shadow-lg h-[410px]">
        <img
          src="/assets/illustrations/adult_qibla_compass.webp"
          alt="3D Kaaba Qibla Compass"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#071F15]/90 via-[#071F15]/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-app)] to-transparent" />

        {/* Live Rotating Golden Qibla Pointer Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-14">
          <div
            className={`w-60 h-60 rounded-full border-2 transition-all duration-300 flex items-center justify-center relative ${
              isAlignedWithQibla
                ? 'border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.75)]'
                : 'border-amber-300/40'
            }`}
            style={{ transform: `rotate(${relativeNeedleRotation}deg)` }}
          >
            {/* Golden North/Qibla Arrow Tip */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div
                className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md border ${
                  isAlignedWithQibla
                    ? 'bg-emerald-500 text-emerald-950 border-white'
                    : 'bg-amber-400 text-emerald-950 border-amber-100'
                }`}
              >
                {isAlignedWithQibla ? '🕋 Aligned' : '🕋 Qibla'}
              </div>
              <div
                className={`w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] ${
                  isAlignedWithQibla ? 'border-b-emerald-400' : 'border-b-amber-400'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <MobileStatusBar time="9:31" light />
          <div className="flex items-center justify-between px-4 pt-1">
            <ScreenBackButton variant="dark" />
            <h1 className="text-lg font-extrabold text-amber-200 drop-shadow-md">Qibla</h1>
            <button
              type="button"
              onClick={handleUseLiveGps}
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-black/35 backdrop-blur-xs flex items-center justify-center border border-amber-300/40 text-amber-300 transition active:scale-95"
              title="Calibrate from Live GPS"
            >
              <LocateFixed className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 pt-2 text-center space-y-3">
        <div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-3xl font-extrabold text-[var(--text-primary)] tabular-nums">{info.dir}</p>
            {isAlignedWithQibla && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-600/50 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold">
                Facing Kaaba ✓
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5">
            From your location ({selectedCity}) · {info.distKm.toLocaleString()} km to Makkah
          </p>
          {gpsStatus && (
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/40 rounded-xl px-3 py-1.5 mt-1.5">
              {gpsStatus}
            </p>
          )}
        </div>

        {/* Interactive Phone Heading Calibrator */}
        <div className="rounded-2xl bg-[var(--bg-surface)] px-3.5 py-2.5 border border-[var(--border-subtle)] shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--text-secondary)]">
            <span>
              Phone Heading:{' '}
              <strong className="text-[var(--text-primary)] tabular-nums">{deviceHeading}°</strong>
              {sensorActive ? ' (Sensor Live)' : ''}
            </span>
            <button
              type="button"
              onClick={() => setDeviceHeading(info.bearing)}
              className="text-xs font-extrabold text-[#14532D] dark:text-amber-300 underline"
            >
              Snap to Qibla ({info.bearing}°)
            </button>
          </div>
          <input
            type="range"
            min={0}
            max={359}
            value={deviceHeading}
            onChange={(e) => setDeviceHeading(Number(e.target.value))}
            aria-label="Rotate Compass Heading"
            className="w-full accent-[#14532D] dark:accent-amber-400 cursor-pointer h-1.5"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-1.5">
          {Object.keys(cityBearings).map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => {
                setLiveBearing(null);
                setSelectedCity(city);
                updateUser({ city });
                setGpsStatus(null);
              }}
              className={`min-h-[36px] px-3.5 py-1 rounded-full text-xs font-bold transition ${
                selectedCity === city
                  ? 'bg-[#14532D] text-white shadow-2xs'
                  : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              handleUseLiveGps();
              requestCompassSensor();
            }}
            className="min-h-[44px] px-4 py-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[#14532D] dark:text-emerald-300 font-extrabold text-xs shadow-2xs inline-flex items-center gap-1.5"
          >
            <LocateFixed className="w-3.5 h-3.5" />
            <span>Use GPS & Compass</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAlignmentDetails(!showAlignmentDetails)}
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] text-emerald-950 font-extrabold text-xs shadow-md inline-flex items-center gap-2"
          >
            <span>{showAlignmentDetails ? 'Hide Map Info' : 'View Map'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {showAlignmentDetails && (
          <div className="rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] text-left text-xs space-y-2 shadow-2xs">
            <p className="font-extrabold text-[var(--text-primary)]">
              Great-Circle Qibla Vector to Al-Masjid al-Haram
            </p>
            <p className="text-[var(--text-secondary)]">
              Target: Holy Kaaba (21.4225° N, 39.8262° E) · Bearing:{' '}
              <strong className="tabular-nums text-[var(--text-primary)]">{info.bearing}°</strong> clockwise from True North.
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Sensor Mode:{' '}
              <strong className="text-[var(--text-primary)]">
                {sensorActive ? 'Live Hardware Magnetometer Active' : 'Manual Heading Dial / Static Bearing'}
              </strong>
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=21.4225,39.8262"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#14532D] dark:text-amber-300 underline pt-1"
            >
              <span>Open Holy Kaaba in External Google Maps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export const AdultTasbihScreen: React.FC = () => {
  const { setAdultRoute, user, incrementTasbih, resetTasbih, setActiveDhikr } = useIlmizo();
  const [tab, setTab] = useState<'Counter' | 'Guided' | 'Benefits'>('Counter');
  const [targetGoal, setTargetGoal] = useState<number>(33);
  const [confirmReset, setConfirmReset] = useState(false);

  const dhikrList = [
    {
      arabic: 'سُبْحَانَ اللَّهِ',
      translit: 'SubhanAllah',
      meaning: 'Glory be to Allah',
      target: 33,
    },
    {
      arabic: 'الْحَمْدُ لِلَّهِ',
      translit: 'Alhamdulillah',
      meaning: 'All praise is due to Allah',
      target: 33,
    },
    {
      arabic: 'اللَّهُ أَكْبَرُ',
      translit: 'Allahu Akbar',
      meaning: 'Allah is the Greatest',
      target: 34,
    },
  ];

  const activeDhikr = dhikrList[user.activeDhikrIndex] || dhikrList[0];

  const handleTapCounter = () => {
    setConfirmReset(false);
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(18);
      } catch {
        // ignore vibration restriction
      }
    }
    const nextVal = user.tasbihCount + 1;
    incrementTasbih();
    // In Guided mode, auto-advance through Tasbihat Fatima (33 -> 33 -> 34)
    if (tab === 'Guided' && nextVal >= activeDhikr.target) {
      const nextIdx = (user.activeDhikrIndex + 1) % dhikrList.length;
      setActiveDhikr(nextIdx);
      resetTasbih();
    }
  };

  return (
    <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
      {/* Screen 13: Tasbih Counter */}
      <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pb-4 shadow-md border-b border-amber-400/15">
        <MobileStatusBar time="9:31" light />
        <div className="flex items-center justify-between px-4 pt-1 pb-3">
          <ScreenBackButton variant="dark" />
          <h1 className="text-lg font-extrabold">Tasbih</h1>
          <div className="px-2.5 py-1 rounded-full bg-white/10 text-xs font-extrabold text-amber-300 tabular-nums">
            Total: {user.tasbihTotal}
          </div>
        </div>

        <div className="mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full">
          {(['Counter', 'Guided', 'Benefits'] as const).map((tName) => (
            <button
              key={tName}
              type="button"
              onClick={() => setTab(tName)}
              className={`py-1.5 rounded-full text-xs font-extrabold transition ${
                tab === tName
                  ? 'bg-amber-400 text-emerald-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              {tName}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5 text-center space-y-4">
        {tab === 'Benefits' ? (
          <div className="rounded-3xl bg-[var(--bg-surface)] p-5 shadow-xs border border-[var(--border-subtle)] text-left space-y-2.5">
            <h2 className="text-base font-extrabold text-[var(--text-primary)]">
              Virtues of Tasbihat Fatima
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Glorifying Allah 33 times (SubhanAllah), praising Him 33 times (Alhamdulillah), and magnifying Him 34 times (Allahu Akbar) after every obligatory prayer brings forgiveness of sins even if they are like the foam of the sea.
            </p>
            <VerifiedSourceFooter source="Sahih Muslim 597" reference="Book of Prayer" />
          </div>
        ) : (
          <>
            {/* Active Dhikr Emerald & Gold Focus Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B2E1F] via-[#14532D] to-[#0F3826] border border-[#D4AF37]/45 px-5 py-4 text-white shadow-md space-y-1">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-amber-400/15 blur-2xl"
              />
              <p className="font-arabic text-3xl text-[#FDE68A] font-bold drop-shadow-xs relative">
                {activeDhikr.arabic}
              </p>
              <p className="text-sm font-extrabold text-white relative">
                {activeDhikr.translit}
              </p>
              <p className="text-xs text-emerald-100/85 relative">{activeDhikr.meaning}</p>
            </div>

            {/* Target Loop Selector */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {[33, 99, 100, 1000].map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setTargetGoal(goal)}
                  className={`min-h-[34px] px-3 py-1 rounded-full text-xs font-extrabold tabular-nums transition ${
                    targetGoal === goal
                      ? 'bg-[#14532D] text-white'
                      : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  Target: {goal}
                </button>
              ))}
            </div>

            {/* Tactile Emerald & Gold Ring Counter with Ripple & Haptic */}
            <div className="py-1 flex justify-center">
              <TasbihTapRing
                count={user.tasbihCount}
                target={tab === 'Guided' ? activeDhikr.target : targetGoal}
                onTap={handleTapCounter}
              />
            </div>

            <div className="flex items-center justify-center gap-2">
              {confirmReset ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      resetTasbih();
                      setConfirmReset(false);
                    }}
                    className="min-h-[40px] px-5 py-2 rounded-full bg-rose-600 text-white font-extrabold text-xs shadow-xs"
                  >
                    Confirm Reset to 0
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="min-h-[40px] px-4 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-extrabold text-xs"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="min-h-[42px] px-8 py-2 rounded-full bg-amber-200 dark:bg-amber-500/25 border border-amber-400/70 text-amber-950 dark:text-amber-200 font-extrabold text-xs shadow-xs inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {dhikrList.map((d, idx) => (
                <button
                  key={d.translit}
                  type="button"
                  onClick={() => {
                    setActiveDhikr(idx);
                    setTargetGoal(d.target);
                  }}
                  className={`rounded-2xl p-3 border text-center transition ${
                    user.activeDhikrIndex === idx
                      ? 'bg-[var(--bg-surface)] border-amber-400 ring-2 ring-amber-400/40 shadow-xs'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)]'
                  }`}
                >
                  <p className="text-base font-extrabold text-[var(--text-primary)] tabular-nums">{d.target}</p>
                  <p className="text-[11px] font-bold text-[var(--text-secondary)] truncate mt-0.5">
                    {d.translit}
                  </p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const AdultCalendarScreen: React.FC = () => {
  const { setAdultRoute, user, updateUser } = useIlmizo();
  const [selectedSection, setSelectedSection] = useState<string | null>('events');

  const hijriToday = computeHijriDate(new Date(), user.hijriAdjustmentDays || 0);
  const [monthIdx, setMonthIdx] = useState(() =>
    Math.max(0, Math.min(11, hijriToday.monthNumber - 1))
  );
  const [selectedHijriDay, setSelectedHijriDay] = useState<number>(hijriToday.day);

  const hijriMonths = [
    { name: `Muharram ${hijriToday.year} AH`, greg: 'Month 1 · Sacred Month', event: '1st Muharram (Islamic New Year) & 10th Muharram (Day of Ashura)' },
    { name: `Safar ${hijriToday.year} AH`, greg: 'Month 2', event: 'Ayyam al-Beed (13th, 14th, 15th White Days Fasting)' },
    { name: `Rabi’ al-Awwal ${hijriToday.year} AH`, greg: 'Month 3', event: 'Prophetic Seerah Reflections & Hijrah Arrival in Madinah' },
    { name: `Rabi’ al-Thani ${hijriToday.year} AH`, greg: 'Month 4', event: 'Ayyam al-Beed Sunnah Fasting (13th–15th Rabi’ al-Thani)' },
    { name: `Jumada al-Ula ${hijriToday.year} AH`, greg: 'Month 5', event: 'White Days & Monday/Thursday Sunnah Fasts' },
    { name: `Jumada al-Akhirah ${hijriToday.year} AH`, greg: 'Month 6', event: 'Mid-Year Hijri Reflection & Hifz Review' },
    { name: `Rajab ${hijriToday.year} AH`, greg: 'Month 7 · Sacred Month', event: 'Sacred Month of Allah · Preparation for Ramadan' },
    { name: `Sha’ban ${hijriToday.year} AH`, greg: 'Month 8', event: 'Increased Sunnah Fasting ahead of Blessed Ramadan' },
    { name: `Ramadan ${hijriToday.year} AH`, greg: 'Month 9 · Fasting', event: 'Month of Obligatory Fasting, Quran Revelation & Laylat al-Qadr' },
    { name: `Shawwal ${hijriToday.year} AH`, greg: 'Month 10', event: '1st Shawwal: Eid al-Fitr & 6 Days of Shawwal Fasting' },
    { name: `Dhu al-Qa’dah ${hijriToday.year} AH`, greg: 'Month 11 · Sacred Month', event: 'Sacred Month · Preparation for Hajj' },
    { name: `Dhu al-Hijjah ${hijriToday.year} AH`, greg: 'Month 12 · Sacred Month', event: '9th Day of Arafah & 10th Eid al-Adha' },
  ];

  const activeMonth = hijriMonths[monthIdx] || hijriMonths[0];
  const reminders = user.calendarReminders || {
    whiteDays: true,
    mondayThursday: false,
    ashura: true,
    ramadan: true,
    arafah: true,
  };

  const rows = [
    {
      id: 'events',
      label: 'Islamic Events',
      sub: `${activeMonth.name}: ${activeMonth.event}`,
    },
    {
      id: 'dates',
      label: 'Important Dates (Estimated vs Confirmed)',
      sub: '10th Muharram (Ashura), 1st–30th Ramadan, 1st Shawwal (Eid al-Fitr), 9th Dhu al-Hijjah (Arafah), 10th Dhu al-Hijjah (Eid al-Adha). All future Islamic dates are astronomical/tabular estimates until confirmed by local crescent sighting.',
    },
    {
      id: 'months',
      label: 'Learn about Months',
      sub: 'The 4 Sacred Months (Al-Ashhur al-Hurum) are Muharram, Rajab, Dhu al-Qa’dah, and Dhu al-Hijjah (Quran 9:36).',
    },
    {
      id: 'reminders',
      label: 'In-App Observing Preferences',
      sub: 'Toggle your personal observance reminders below (persisted locally on this device; does not schedule background OS push notifications).',
    },
  ];

  return (
    <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
      {/* Screen 14: Islamic Calendar */}
      <div className="relative overflow-hidden bg-[#0F3826] text-white rounded-b-[28px] shadow-md">
        <MobileStatusBar time="9:31" light />
        <div className="flex items-center justify-between px-4 pt-1 pb-3 relative z-10">
          <ScreenBackButton variant="dark" />
          <h1 className="text-base font-extrabold">Islamic Calendar</h1>
          <InfoDisclosure
            variant="dark"
            label="Hijri Note"
            sheetTitle="Hijri Lunar Date Convention"
            sheetSubtitle="Umm al-Qura / Tabular Islamic Estimate"
          >
            <p>
              Hijri lunar dates are calculated using the Umm al-Qura / Tabular Islamic convention and may vary by ±1–2 days depending on local crescent moon sighting.
            </p>
            <p>
              Use the Moon-Sighting Offset controls (-2d to +2d) to match your local Islamic authority.
            </p>
          </InfoDisclosure>
        </div>

        {/* Scenic Mosque & Crescent Banner */}
        <div className="relative h-40 w-full">
          <img
            src="/assets/illustrations/adult_calendar_mosque.webp"
            alt="Hijri Mosque"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-app)] via-transparent to-black/20" />
        </div>
      </div>

      <div className="px-4 pt-2 text-center space-y-3.5">
        {/* Dynamic Today Hijri Card + Moon Sighting Offset */}
        <div className="rounded-2xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-2">
          <h2 className="text-lg font-extrabold text-[var(--text-primary)]">{hijriToday.formatted}</h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Gregorian: {new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
          <div className="flex items-center justify-center gap-1.5 pt-1 flex-wrap">
            <span className="text-[11px] font-bold text-[var(--text-muted)]">Moon-Sighting Offset:</span>
            {([-2, -1, 0, 1, 2] as const).map((adj) => (
              <button
                key={adj}
                type="button"
                onClick={() => updateUser({ hijriAdjustmentDays: adj })}
                className={`min-h-[30px] px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold tabular-nums transition ${
                  (user.hijriAdjustmentDays || 0) === adj
                    ? 'bg-[#14532D] text-white'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                }`}
              >
                {adj > 0 ? `+${adj}d` : `${adj}d`}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Hijri Month Selector + Visual Sun–Sat Lunar Calendar Grid */}
        <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xs p-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setMonthIdx((i) => (i > 0 ? i - 1 : hijriMonths.length - 1));
                setSelectedHijriDay(1);
              }}
              className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-200 flex items-center justify-center active:scale-95 transition"
              aria-label="Previous Hijri Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div>
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">{activeMonth.name}</h3>
              <p className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5">{activeMonth.greg}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setMonthIdx((i) => (i + 1) % hijriMonths.length);
                setSelectedHijriDay(1);
              }}
              className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-200 flex items-center justify-center active:scale-95 transition"
              aria-label="Next Hijri Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {(() => {
            const viewedMonthNumber = monthIdx + 1;
            const daysInMonth = viewedMonthNumber % 2 === 1 ? 30 : 29;
            const todayWeekday = new Date().getDay();
            const isCurrentHijriMonth = viewedMonthNumber === hijriToday.monthNumber;
            // Anchor weekday cleanly from today for the current month, or deterministic lunar offset for adjacent months
            const firstDayOffset = isCurrentHijriMonth
              ? (((todayWeekday - ((hijriToday.day - 1) % 7)) % 7) + 7) % 7
              : (monthIdx * 2 + 1) % 7;

            const specialDayLabels: Record<number, string> = {
              13: 'Ayyam al-Beed (White Day Fast)',
              14: 'Ayyam al-Beed (White Day Fast)',
              15: 'Ayyam al-Beed (White Day Fast)',
            };
            if (viewedMonthNumber === 1) {
              specialDayLabels[1] = 'Islamic New Year (1st Muharram)';
              specialDayLabels[10] = 'Day of Ashura (10th Muharram)';
            } else if (viewedMonthNumber === 9) {
              specialDayLabels[1] = 'Beginning of Blessed Ramadan';
              specialDayLabels[27] = '27th Night of Ramadan (Seek Laylat al-Qadr)';
            } else if (viewedMonthNumber === 10) {
              specialDayLabels[1] = 'Eid al-Fitr (1st Shawwal)';
            } else if (viewedMonthNumber === 12) {
              specialDayLabels[9] = 'Day of Arafah (9th Dhu al-Hijjah)';
              specialDayLabels[10] = 'Eid al-Adha (10th Dhu al-Hijjah)';
            }

            const cells: Array<number | null> = [
              ...Array.from({ length: firstDayOffset }, () => null),
              ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
            ];
            const activeDayNote = specialDayLabels[selectedHijriDay];

            return (
              <div className="space-y-2.5">
                <div className="grid grid-cols-7 gap-1 text-[11px] font-bold text-[var(--text-muted)]">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className={`py-1 ${d === 'Fri' ? 'text-[#14532D] dark:text-amber-300' : ''}`}>
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {cells.map((dayNum, idx) => {
                    if (dayNum === null) {
                      return <div key={`empty-${idx}`} className="h-10" />;
                    }
                    const isTodayCell = isCurrentHijriMonth && dayNum === hijriToday.day;
                    const isSelectedCell = dayNum === selectedHijriDay;
                    const hasSpecialEvent = Boolean(specialDayLabels[dayNum]);
                    return (
                      <button
                        key={dayNum}
                        type="button"
                        onClick={() => setSelectedHijriDay(dayNum)}
                        className={`h-10 rounded-xl flex flex-col items-center justify-center relative text-xs font-extrabold tabular-nums transition ${
                          isTodayCell
                            ? 'bg-gradient-to-br from-[#14532D] to-[#16A34A] text-white ring-2 ring-amber-400 shadow-xs'
                            : isSelectedCell
                            ? 'bg-amber-100 dark:bg-amber-500/20 text-emerald-950 dark:text-amber-200 border border-amber-400/70'
                            : 'text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                        }`}
                      >
                        <span>{dayNum}</span>
                        {hasSpecialEvent && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                              isTodayCell ? 'bg-amber-300' : 'bg-[#F59E0B]'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-3.5 py-2.5 text-left flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-[var(--text-primary)] tabular-nums">
                      {selectedHijriDay} {activeMonth.name}
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)] truncate mt-0.5">
                      {activeDayNote || 'Lunar calendar estimate · Confirm with local crescent sighting'}
                    </p>
                  </div>
                  {activeDayNote && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200 text-[11px] font-extrabold shrink-0">
                      Notable
                    </span>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        <div className="space-y-2.5 text-left">
          {rows.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xs overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setSelectedSection(selectedSection === r.id ? null : r.id)}
                className="w-full p-3.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/5 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-300 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-extrabold text-[var(--text-primary)]">{r.label}</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${
                    selectedSection === r.id ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {selectedSection === r.id && (
                <div className="px-4 pb-3.5 text-xs text-[var(--text-secondary)] border-t border-[var(--divider)] pt-2.5 leading-relaxed space-y-2">
                  <p>{r.sub}</p>
                  {r.id === 'reminders' && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {(
                        [
                          { key: 'ashura', label: '10th Muharram (Ashura)' },
                          { key: 'whiteDays', label: 'Ayyam al-Beed (13-15th)' },
                          { key: 'ramadan', label: 'Ramadan Moon Sighting' },
                          { key: 'arafah', label: '9th Dhu al-Hijjah (Arafah)' },
                        ] as const
                      ).map((item) => {
                        const enabled = reminders[item.key];
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() =>
                              updateUser({
                                calendarReminders: {
                                  ...reminders,
                                  [item.key]: !enabled,
                                },
                              })
                            }
                            className={`p-2.5 rounded-xl border text-left text-[11px] font-bold flex items-center justify-between ${
                              enabled
                                ? 'bg-emerald-50 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700/50 text-[#14532D] dark:text-emerald-200'
                                : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]'
                            }`}
                          >
                            <span>{item.label}</span>
                            <span>{enabled ? 'ON' : 'OFF'}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AdultTasksAndExpensesScreen: React.FC = () => {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    expenses,
    addExpense,
    deleteExpense,
  } = useIlmizo();

  const [tab, setTab] = useState<'tasks' | 'expenses' | 'zakat'>('tasks');
  const [addTaskSheetOpen, setAddTaskSheetOpen] = useState(false);
  const [addEntrySheetOpen, setAddEntrySheetOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{
    kind: 'task' | 'expense';
    id: string;
    title: string;
  } | null>(null);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'Deen' | 'Family' | 'Work' | 'Personal'>(
    'Deen'
  );
  const [newTaskPrayer, setNewTaskPrayer] = useState<PrayerName | 'Anytime'>('Fajr');

  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expType, setExpType] = useState<'income' | 'expense' | 'sadaqah' | 'zakat'>('sadaqah');
  const [expCategory, setExpCategory] = useState<
    'Household' | 'Food' | 'Education' | 'Sadaqah' | 'Zakat' | 'Salary' | 'Other'
  >('Sadaqah');

  const [zakatableSavings, setZakatableSavings] = useState(250000);

  const openTasksCount = tasks.filter((t) => !t.completed).length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const totalIncome = expenses
    .filter((e) => e.type === 'income')
    .reduce((acc, e) => acc + e.amount, 0);
  const totalOutflow = expenses
    .filter((e) => e.type === 'expense')
    .reduce((acc, e) => acc + e.amount, 0);
  const totalCharity = expenses
    .filter((e) => e.type === 'sadaqah' || e.type === 'zakat')
    .reduce((acc, e) => acc + e.amount, 0);

  return (
    <div className="pb-28 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
      <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pt-safe pb-4 shadow-md border-b border-amber-400/15">
        <div className="flex items-center justify-between px-4 pt-3 pb-3">
          <ScreenBackButton variant="dark" />
          <div className="text-center">
            <h1 className="text-lg font-extrabold tracking-tight">Tasks & Sadaqah</h1>
            <p className="text-xs text-emerald-100/80">
              {completedTasksCount} of {tasks.length} tasks done · ₹{totalCharity.toLocaleString()} charity
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              void triggerLightHaptic();
              if (tab === 'expenses') {
                setAddEntrySheetOpen(true);
              } else {
                setAddTaskSheetOpen(true);
              }
            }}
            aria-label={tab === 'expenses' ? 'Log Sadaqah or Expense' : 'Add New Task'}
            className="min-w-[44px] min-h-[44px] rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shadow-xs active:scale-95 transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-2xl">
          {[
            { id: 'tasks' as const, label: `Tasks (${openTasksCount})` },
            { id: 'expenses' as const, label: 'Sadaqah & Log' },
            { id: 'zakat' as const, label: 'Zakat 2.5%' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`min-h-[38px] py-1.5 rounded-xl text-xs font-extrabold transition ${
                tab === item.id
                  ? 'bg-amber-400 text-emerald-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4 max-w-2xl mx-auto">
        {tab === 'tasks' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-sm font-extrabold text-[var(--text-primary)]">
                  Today’s Deeds & Tasks
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Anchored around your five daily prayers
                </p>
              </div>
              <PrimaryButton onClick={() => setAddTaskSheetOpen(true)} className="min-h-[40px] px-4 py-2 text-xs">
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </PrimaryButton>
            </div>

            {tasks.length === 0 ? (
              <EmptyState
                icon={<CheckCircle2 className="w-6 h-6" />}
                title="No tasks scheduled yet"
                description="Add a simple daily goal like reading Surah Al-Mulk after Isha or calling your parents."
                action={
                  <PrimaryButton onClick={() => setAddTaskSheetOpen(true)}>
                    <Plus className="w-4 h-4" />
                    <span>Add Your First Task</span>
                  </PrimaryButton>
                }
              />
            ) : (
              <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] divide-y divide-[var(--divider)] overflow-hidden shadow-2xs">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="px-4 py-3.5 flex items-center justify-between gap-3 hover:bg-[var(--bg-elevated)]/50 transition"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        void triggerLightHaptic();
                        toggleTask(task.id);
                      }}
                      className="flex items-center gap-3.5 text-left flex-1 min-h-[44px]"
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                          task.completed
                            ? 'bg-[#14532D] border-[#14532D] text-white'
                            : 'border-[var(--border-strong)] bg-[var(--bg-elevated)]'
                        }`}
                      >
                        {task.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-bold leading-snug ${
                            task.completed
                              ? 'line-through text-[var(--text-muted)]'
                              : 'text-[var(--text-primary)]'
                          }`}
                        >
                          {task.title}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                          {task.category} · {task.prayerAnchor === 'Anytime' ? 'Anytime' : `After ${task.prayerAnchor}`}
                        </p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPendingDelete({ kind: 'task', id: task.id, title: task.title })
                      }
                      className="min-w-[40px] min-h-[40px] rounded-xl text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition"
                      aria-label={`Delete task ${task.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'expenses' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] shadow-2xs">
                <p className="text-xs text-[var(--text-secondary)] font-semibold">Income</p>
                <p className="text-base font-extrabold text-emerald-700 dark:text-emerald-300 tabular-nums mt-0.5">
                  ₹{totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] shadow-2xs">
                <p className="text-xs text-[var(--text-secondary)] font-semibold">Expenses</p>
                <p className="text-base font-extrabold text-[var(--text-primary)] tabular-nums mt-0.5">
                  ₹{totalOutflow.toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl bg-amber-50 dark:bg-amber-500/15 p-3.5 border border-amber-300/80 dark:border-amber-400/35 shadow-2xs">
                <p className="text-xs text-amber-900 dark:text-amber-300 font-bold">Sadaqah</p>
                <p className="text-base font-extrabold text-amber-950 dark:text-amber-100 tabular-nums mt-0.5">
                  ₹{totalCharity.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-extrabold text-[var(--text-primary)]">
                Charity & Expense History
              </h2>
              <PrimaryButton onClick={() => setAddEntrySheetOpen(true)} className="min-h-[40px] px-4 py-2 text-xs">
                <Plus className="w-4 h-4" />
                <span>Log Entry</span>
              </PrimaryButton>
            </div>

            {expenses.length === 0 ? (
              <EmptyState
                icon={<Wallet className="w-6 h-6" />}
                title="No entries logged yet"
                description="Track your Sadaqah, Zakat, and household spending privately on this device."
                action={
                  <PrimaryButton onClick={() => setAddEntrySheetOpen(true)}>
                    <Plus className="w-4 h-4" />
                    <span>Log First Entry</span>
                  </PrimaryButton>
                }
              />
            ) : (
              <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] divide-y divide-[var(--divider)] overflow-hidden shadow-2xs">
                {expenses.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[var(--text-primary)] truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {item.category} · {item.type.charAt(0).toUpperCase() + item.type.slice(1)} · {item.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-sm font-extrabold tabular-nums ${
                          item.type === 'income'
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : item.type === 'sadaqah' || item.type === 'zakat'
                            ? 'text-amber-700 dark:text-amber-300'
                            : 'text-[var(--text-primary)]'
                        }`}
                      >
                        {item.type === 'income' ? '+' : '-'}₹{item.amount.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setPendingDelete({ kind: 'expense', id: item.id, title: item.title })
                        }
                        className="min-w-[40px] min-h-[40px] rounded-xl text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition"
                        aria-label={`Delete entry ${item.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'zakat' && (
          <div className="rounded-3xl bg-[var(--bg-surface)] p-5 shadow-2xs border border-[var(--border-subtle)] space-y-4">
            <div>
              <h2 className="text-base font-extrabold text-[var(--text-primary)]">
                Annual Zakat (2.5%) Calculator
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Enter your net Zakatable savings held for one lunar year above Nisab.
              </p>
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="zakat-savings-input"
                className="text-xs font-bold text-[var(--text-secondary)] block"
              >
                Zakatable Savings (₹)
              </label>
              <input
                id="zakat-savings-input"
                type="number"
                value={zakatableSavings}
                onChange={(e) => setZakatableSavings(Math.max(0, Number(e.target.value)))}
                className="w-full min-h-[48px] rounded-2xl ilmizo-input px-4 py-3 text-base font-extrabold tabular-nums"
              />
            </div>
            <div className="rounded-2xl bg-[#0F3826] text-white p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-emerald-200">Obligatory Zakat (2.5%)</p>
                <p className="text-2xl font-extrabold text-amber-300 tabular-nums mt-0.5">
                  ₹{Math.round(zakatableSavings * 0.025).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  addExpense({
                    title: 'Zakat Payment Logged',
                    amount: Math.round(zakatableSavings * 0.025),
                    type: 'zakat',
                    category: 'Zakat',
                    date: new Date().toISOString().slice(0, 10),
                  });
                  setTab('expenses');
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-400 text-emerald-950 font-extrabold text-xs shrink-0 active:scale-95 transition"
              >
                Log Zakat
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Task Bottom Sheet */}
      <BottomSheet
        open={addTaskSheetOpen}
        onClose={() => setAddTaskSheetOpen(false)}
        title="Add Daily Task"
        subtitle="Anchor a beneficial deed or reminder to a daily prayer"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newTaskTitle.trim()) return;
            addTask({
              title: newTaskTitle.trim(),
              category: newTaskCategory,
              prayerAnchor: newTaskPrayer,
              priority: 'high',
              dueDate: new Date().toISOString().slice(0, 10),
            });
            setNewTaskTitle('');
            setAddTaskSheetOpen(false);
          }}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-secondary)] block">
              Task Description
            </label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g., Read Surah Al-Mulk after Isha"
              className="w-full min-h-[46px] rounded-2xl ilmizo-input px-4 py-2.5 text-sm"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[var(--text-secondary)] block">Category</span>
              <SelectSheetField
                value={newTaskCategory}
                onChange={(val) => setNewTaskCategory(val as any)}
                title="Task Category"
                options={[
                  { value: 'Deen', label: 'Deen' },
                  { value: 'Family', label: 'Family' },
                  { value: 'Work', label: 'Work' },
                  { value: 'Personal', label: 'Personal' },
                ]}
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[var(--text-secondary)] block">Prayer Anchor</span>
              <SelectSheetField
                value={newTaskPrayer}
                onChange={(val) => setNewTaskPrayer(val as any)}
                title="Prayer Anchor"
                options={[
                  { value: 'Fajr', label: 'After Fajr' },
                  { value: 'Dhuhr', label: 'After Dhuhr' },
                  { value: 'Asr', label: 'After Asr' },
                  { value: 'Maghrib', label: 'After Maghrib' },
                  { value: 'Isha', label: 'After Isha' },
                  { value: 'Anytime', label: 'Anytime' },
                ]}
              />
            </div>
          </div>

          <PrimaryButton type="submit" fullWidth disabled={!newTaskTitle.trim()}>
            <Plus className="w-4 h-4" />
            <span>Save Task</span>
          </PrimaryButton>
        </form>
      </BottomSheet>

      {/* Log Charity / Expense Bottom Sheet */}
      <BottomSheet
        open={addEntrySheetOpen}
        onClose={() => setAddEntrySheetOpen(false)}
        title="Log Sadaqah or Expense"
        subtitle="Saved privately on this device"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const num = Number(expAmount);
            if (!expTitle.trim() || !num || num <= 0) return;
            addExpense({
              title: expTitle.trim(),
              amount: num,
              type: expType,
              category: expCategory,
              date: new Date().toISOString().slice(0, 10),
            });
            setExpTitle('');
            setExpAmount('');
            setAddEntrySheetOpen(false);
          }}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-secondary)] block">
              Description
            </label>
            <input
              type="text"
              value={expTitle}
              onChange={(e) => setExpTitle(e.target.value)}
              placeholder="e.g., Friday Masjid Sadaqah"
              className="w-full min-h-[46px] rounded-2xl ilmizo-input px-4 py-2.5 text-sm"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-secondary)] block">
                Amount (₹)
              </label>
              <input
                type="number"
                value={expAmount}
                onChange={(e) => setExpAmount(e.target.value)}
                placeholder="500"
                className="w-full min-h-[46px] rounded-2xl ilmizo-input px-4 py-2.5 text-sm font-bold tabular-nums"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[var(--text-secondary)] block">Entry Type</span>
              <SelectSheetField
                value={expType}
                onChange={(val) => {
                  const next = val as any;
                  setExpType(next);
                  if (next === 'sadaqah') setExpCategory('Sadaqah');
                  else if (next === 'zakat') setExpCategory('Zakat');
                  else if (next === 'income') setExpCategory('Salary');
                  else setExpCategory('Household');
                }}
                title="Entry Type"
                options={[
                  { value: 'sadaqah', label: 'Sadaqah' },
                  { value: 'zakat', label: 'Zakat' },
                  { value: 'expense', label: 'Expense' },
                  { value: 'income', label: 'Income' },
                ]}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[var(--text-secondary)] block">Category</span>
            <SelectSheetField
              value={expCategory}
              onChange={(val) => setExpCategory(val as any)}
              title="Expense Category"
              options={[
                { value: 'Sadaqah', label: 'Sadaqah' },
                { value: 'Zakat', label: 'Zakat' },
                { value: 'Household', label: 'Household' },
                { value: 'Food', label: 'Food' },
                { value: 'Education', label: 'Education' },
                { value: 'Salary', label: 'Salary' },
                { value: 'Other', label: 'Other' },
              ]}
            />
          </div>

          <PrimaryButton
            type="submit"
            fullWidth
            disabled={!expTitle.trim() || !Number(expAmount) || Number(expAmount) <= 0}
          >
            <Plus className="w-4 h-4" />
            <span>Save Entry</span>
          </PrimaryButton>
        </form>
      </BottomSheet>

      {/* Delete Confirmation Sheet */}
      <BottomSheet
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        title="Confirm Removal"
        subtitle={pendingDelete?.title}
      >
        <p className="text-sm text-[var(--text-secondary)]">
          Remove this {pendingDelete?.kind === 'task' ? 'task' : 'entry'} from your device?
        </p>
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => setPendingDelete(null)}
            className="min-h-[46px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm font-bold text-[var(--text-primary)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              if (pendingDelete) {
                if (pendingDelete.kind === 'task') deleteTask(pendingDelete.id);
                else deleteExpense(pendingDelete.id);
              }
              setPendingDelete(null);
            }}
            className="min-h-[46px] rounded-2xl bg-rose-600 text-white text-sm font-extrabold"
          >
            Remove
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

export const AdultMoreSettingsScreen: React.FC = () => {
  const {
    user,
    updateUser,
    setAdultRoute,
    setMode,
    isAudioMuted,
    toggleAudioMute,
    themeMode,
    setThemeMode,
  } = useIlmizo();
  const { language, setLanguage, supportedLanguages } = useTranslation();
  const [activeSheetRow, setActiveSheetRow] = useState<string | null>(null);
  const [hapticsOn, setHapticsOn] = useState<boolean>(() => isHapticsEnabled());
  const [persistentCountdownOn, setPersistentCountdownOn] = useState<boolean>(() =>
    isPersistentPrayerCountdownEnabled()
  );
  const [seniorModeOn, setSeniorModeOn] = useSeniorMinimalMode();
  const [batteryGuardOpen, setBatteryGuardOpen] = useState(false);
  const widgetCapability = getPrayerWidgetPlatformCapability();

  const currentLangLabel =
    supportedLanguages.find((l) => l.code === language)?.label || language.toUpperCase();

  const sheetMetaMap: Record<string, { label: string; sub: string }> = {
    quran_settings: { label: 'Quran Reading Preferences', sub: `Arabic size ${user.arabicFontScale}x` },
    language: { label: 'Language & Translation', sub: currentLangLabel },
    audio: { label: 'Audio & Reciter', sub: isAudioMuted ? 'Muted' : user.reciterName || 'Alafasy' },
    offline: { label: 'Downloads & Local Backup', sub: 'Saved privately on this device' },
    notifications: { label: 'Reminders & Prayer Bar', sub: persistentCountdownOn ? 'Active' : 'Opt-in' },
    appearance: { label: 'Appearance & Haptics', sub: `${themeMode} theme` },
    help: { label: 'About Ilmizo & Privacy', sub: 'Verified sources · Zero ads' },
  };
  const activeRowMeta = activeSheetRow ? sheetMetaMap[activeSheetRow] : null;

  return (
    <div className="pb-28 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
      {/* Screen 16: Grouped Settings & Tools Hub */}
      <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pt-safe pb-4 shadow-md border-b border-amber-400/15">
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <ScreenBackButton variant="dark" />
          <h1 className="text-lg font-extrabold tracking-tight">Settings & More</h1>
          <button
            type="button"
            onClick={() => setAdultRoute('profile')}
            className="min-w-[44px] min-h-[44px] px-3 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-amber-300 flex items-center justify-center transition"
          >
            Profile
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-5 max-w-2xl mx-auto">
        {/* Family & Mode Switcher */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setMode('kids')}
            className="min-h-[52px] rounded-2xl bg-[#22C55E] text-emerald-950 px-4 py-3 font-extrabold text-xs flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98] transition"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Open Kids World</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('parent')}
            className="min-h-[52px] rounded-2xl bg-amber-400 text-emerald-950 px-4 py-3 font-extrabold text-xs flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98] transition"
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Open Parent Hub</span>
          </button>
        </div>

        {/* Group 1: Account & Profile */}
        <SettingsGroup title="Account & Daily Tools">
          <SettingsRow
            icon={<User className="w-4 h-4" />}
            title={user.name}
            subtitle={`${user.city}, ${user.country} · ${user.streakDays}-day streak`}
            value="Profile"
            onClick={() => setAdultRoute('profile')}
          />
          <SettingsRow
            icon={<Wallet className="w-4 h-4" />}
            title="Tasks & Sadaqah"
            subtitle="Daily prayer-anchored deeds, charity log & Zakat"
            onClick={() => setAdultRoute('tasks_expenses')}
          />
          <SettingsRow
            icon={<Bookmark className="w-4 h-4" />}
            title="My Quran Journal"
            subtitle="Saved verses, bookmarks & reflections"
            onClick={() => setAdultRoute('quran_journal')}
          />
          <SettingsRow
            icon={<Sparkles className="w-4 h-4" />}
            title="Personalize 7-Day Plan"
            subtitle="Update daily goals and reading focus"
            onClick={() => window.dispatchEvent(new Event('ilmizo:open-onboarding'))}
          />
        </SettingsGroup>

        {/* Group 2: App Appearance */}
        <SettingsGroup title="App Appearance">
          <div className="p-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-[var(--text-primary)]">Theme</p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Applies across Adult, Kids & Parent Hub
                </p>
              </div>
              <SyncStatusBadge compact />
            </div>
            <ThemeModeSegmentedControl value={themeMode} onChange={setThemeMode} />
          </div>
          <SettingsRow
            icon={<Globe className="w-4 h-4" />}
            title="Language"
            subtitle="Menus, stories & translations"
            value={currentLangLabel}
            onClick={() => setActiveSheetRow('language')}
          />
          <SettingsRow
            icon={<Sparkles className="w-4 h-4" />}
            title="Haptics & Motion"
            subtitle="Tactile feedback on Tasbih & checkoffs"
            value={hapticsOn ? 'On' : 'Off'}
            onClick={() => setActiveSheetRow('appearance')}
          />
          <SettingsRow
            icon={<User className="w-4 h-4" />}
            title="Senior / Minimal Mode"
            subtitle="Calm 4-tile large-text Home (Quran, Salah, Duas, Tasbih)"
            value={seniorModeOn ? 'On' : 'Off'}
            onClick={() => {
              void triggerLightHaptic();
              setSeniorModeOn(!seniorModeOn);
            }}
          />
        </SettingsGroup>

        {/* Group 3: Learning & Worship */}
        <SettingsGroup title="Worship & Learning">
          <SettingsRow
            icon={<BookOpen className="w-4 h-4" />}
            title="Quran Reader Settings"
            subtitle="Arabic script scale & translation visibility"
            value={`${user.arabicFontScale}x`}
            onClick={() => setActiveSheetRow('quran_settings')}
          />
          <SettingsRow
            icon={<Bell className="w-4 h-4" />}
            title="Prayer Reminders & Bar"
            subtitle="Daily Salah alerts & Android status bar"
            value={persistentCountdownOn ? 'On' : 'Opt-in'}
            onClick={() => setActiveSheetRow('notifications')}
          />
          <SettingsRow
            icon={<ShieldCheck className="w-4 h-4" />}
            title="Adhan Battery-Guard Wizard"
            subtitle="Fix Xiaomi, Samsung, Vivo & Oppo killing Fajr alarms"
            value="Setup"
            onClick={() => {
              void triggerLightHaptic();
              setBatteryGuardOpen(true);
            }}
          />
          <SettingsRow
            icon={<Compass className="w-4 h-4" />}
            title="Qibla, Tasbih & Calendar"
            subtitle="Jump to worship tools"
            onClick={() => setAdultRoute('qibla')}
          />
        </SettingsGroup>

        {/* Group 3B: Special Learning & Lifestyle Companions */}
        <SettingsGroup title="Special Learning Modules">
          {(
            [
              {
                id: 'prophets_tree',
                title: 'Prophets Family Tree',
                subtitle: 'Interactive lineage of all 25 Quranic Prophets',
              },
              {
                id: 'new_muslim',
                title: 'New Muslim Pathway',
                subtitle: '7-stage beginner guide to faith, Wudu & Salah',
              },
              {
                id: 'friday_hub',
                title: 'Friday (Jummah) Hub',
                subtitle: 'Sunnah checklist, Surah Al-Kahf & Salawat counter',
              },
              {
                id: 'car_drive',
                title: 'Car Drive Mode',
                subtitle: 'Hands-free high-contrast Quran listening view',
              },
              {
                id: 'reminder_cards',
                title: 'Islamic Reminder Cards',
                subtitle: 'Save & share verified Quran and Hadith cards offline',
              },
            ] as const
          ).map((mod) => (
            <SettingsRow
              key={mod.id}
              icon={<Sparkles className="w-4 h-4" />}
              title={mod.title}
              subtitle={mod.subtitle}
              value="Open"
              onClick={() => {
                void triggerLightHaptic();
                window.dispatchEvent(
                  new CustomEvent('ilmizo:open-special-module', { detail: mod.id })
                );
              }}
            />
          ))}
        </SettingsGroup>

        {/* Group 4: Audio & Downloads */}
        <SettingsGroup title="Audio & Storage">
          <SettingsRow
            icon={<Volume2 className="w-4 h-4" />}
            title="Reciter & Sound"
            subtitle={user.reciterName || 'Mishary Rashid Alafasy'}
            value={isAudioMuted ? 'Muted' : 'On'}
            onClick={() => setActiveSheetRow('audio')}
          />
          <SettingsRow
            icon={<Download className="w-4 h-4" />}
            title="Offline Downloads & Backup"
            subtitle="Manage Surahs, audio & encrypted backup files"
            value="On Device"
            onClick={() => setActiveSheetRow('offline')}
          />
        </SettingsGroup>

        {/* Group 5: Explore All Modules */}
        <SettingsGroup title="Quick Access">
          <div className="p-3.5 grid grid-cols-3 gap-2">
            {[
              { id: 'hifz', label: 'Hifz Studio' },
              { id: 'duas', label: 'Duas' },
              { id: 'names99', label: '99 Names' },
              { id: 'seerah', label: 'Seerah' },
              { id: 'quizzes', label: 'Quizzes' },
              { id: 'progress', label: 'Progress' },
              { id: 'tasbih', label: 'Tasbih' },
              { id: 'calendar', label: 'Calendar' },
              { id: 'lessons', label: 'Lessons' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  void triggerLightHaptic();
                  setAdultRoute(item.id as any);
                }}
                className="min-h-[44px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-2.5 py-2 text-xs font-bold text-[#14532D] dark:text-emerald-200 hover:border-emerald-600/40 transition text-center truncate active:scale-95"
              >
                {item.label}
              </button>
            ))}
          </div>
        </SettingsGroup>

        {/* Group 6: About Ilmizo */}
        <SettingsGroup title="About Ilmizo">
          <SettingsRow
            icon={<HelpCircle className="w-4 h-4" />}
            title="Verified Sources & Privacy"
            subtitle="Zero ads · Zero cloud tracking · Offline-first"
            onClick={() => setActiveSheetRow('help')}
          />
        </SettingsGroup>
      </div>

      {/* Native-Style BottomSheet for all Settings Panels */}
      <BottomSheet
        open={activeSheetRow !== null}
        onClose={() => setActiveSheetRow(null)}
        title={activeRowMeta?.label || 'Settings'}
        subtitle={activeRowMeta?.sub}
      >
        {activeSheetRow === 'language' && (
          <div className="grid grid-cols-2 gap-2.5">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`min-h-[54px] p-3 rounded-2xl border text-left text-xs transition active:scale-[0.98] ${
                  language === lang.code
                    ? 'bg-[#14532D] text-white border-[#14532D] font-bold'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)]'
                }`}
              >
                <p className="font-bold text-sm">{lang.nativeLabel}</p>
                <p className="text-xs opacity-80">{lang.label}</p>
              </button>
            ))}
          </div>
        )}

        {activeSheetRow === 'quran_settings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[var(--text-primary)]">Arabic Font Scale</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => updateUser({ arabicFontScale: scale })}
                    className={`min-w-[44px] min-h-[44px] rounded-xl text-xs font-bold transition ${
                      user.arabicFontScale === scale
                        ? 'bg-[#14532D] text-white'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    {scale}x
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[var(--divider)]">
              <span className="text-sm font-bold text-[var(--text-primary)]">
                Show Translation in Reader
              </span>
              <button
                type="button"
                onClick={() => updateUser({ showTranslation: !user.showTranslation })}
                className={`min-h-[42px] px-4 rounded-xl text-xs font-extrabold ${
                  user.showTranslation
                    ? 'bg-[#14532D] text-white'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                }`}
              >
                {user.showTranslation ? 'Visible' : 'Hidden'}
              </button>
            </div>
          </div>
        )}

        {activeSheetRow === 'audio' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-sm font-bold text-[var(--text-primary)] block">
                  App Audio & Voice
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  Plays only when you tap Play or Read Aloud
                </span>
              </div>
              <button
                type="button"
                onClick={toggleAudioMute}
                className={`min-h-[44px] px-4 py-1.5 rounded-xl text-xs font-extrabold shrink-0 ${
                  !isAudioMuted
                    ? 'bg-[#14532D] text-white'
                    : 'bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-700/50'
                }`}
              >
                {!isAudioMuted ? 'Sound On' : 'Muted'}
              </button>
            </div>
            <div className="space-y-2 pt-3 border-t border-[var(--divider)]">
              <span className="text-sm font-bold text-[var(--text-primary)] block">
                Preferred Reciter
              </span>
              <SelectSheetField
                value={user.reciterName || 'Mishary Rashid Alafasy'}
                onChange={(val) => updateUser({ reciterName: val })}
                title="Choose Preferred Reciter"
                subtitle="Used across Quran Reader and Hifz Studio"
                options={[
                  { value: 'Mishary Rashid Alafasy', label: 'Mishary Rashid Alafasy' },
                  { value: 'Abdul Basit Abdus Samad', label: 'Abdul Basit Abdus Samad' },
                  { value: 'Abdur-Rahman as-Sudais', label: 'Abdur-Rahman as-Sudais' },
                  { value: 'Mahmoud Khalil Al-Husary', label: 'Mahmoud Khalil Al-Husary' },
                ]}
              />
            </div>
          </div>
        )}

        {activeSheetRow === 'appearance' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-bold text-[var(--text-primary)] block">Theme Mode</span>
              <ThemeModeSegmentedControl value={themeMode} onChange={setThemeMode} />
            </div>
            <div className="flex items-center justify-between border-t border-[var(--divider)] pt-3 gap-3">
              <div>
                <span className="text-sm font-bold text-[var(--text-primary)] block">Subtle Haptics</span>
                <span className="text-xs text-[var(--text-secondary)]">
                  Gentle tactile feedback on Tasbih, Salah & tabs
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={hapticsOn}
                onClick={() => {
                  const next = !hapticsOn;
                  setHapticsOn(next);
                  setHapticsEnabled(next);
                  if (next) void triggerLightHaptic();
                }}
                className={`min-h-[44px] px-4 py-1.5 rounded-xl text-xs font-extrabold shrink-0 ${
                  hapticsOn
                    ? 'bg-[#14532D] text-white'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                }`}
              >
                {hapticsOn ? 'Haptics On' : 'Off'}
              </button>
            </div>
          </div>
        )}

        {activeSheetRow === 'offline' && (
          <Suspense fallback={<div className="p-3 text-xs text-[var(--text-secondary)]">Loading offline tools…</div>}>
            <LocalDataManagerCard compact />
          </Suspense>
        )}

        {activeSheetRow === 'help' && (
          <div className="space-y-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
            <p className="text-sm font-extrabold text-[var(--text-primary)]">
              Ilmizo Verified Content & Privacy
            </p>
            <p>• Quran Arabic: Tanzil / King Fahd Glorious Quran Printing Complex Uthmani Script.</p>
            <p>• Duas & Adhkar: Hisn al-Muslim, Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud & Jami` at-Tirmidhi.</p>
            <p>• Seerah: Ar-Raheeq Al-Makhtum & Sahih Hadith Compendiums.</p>
            <div className="pt-3 flex items-center justify-between border-t border-[var(--divider)]">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Saved on this device · Zero ads
              </span>
              <a
                href="/privacy-policy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[40px] px-4 inline-flex items-center rounded-full bg-[#14532D] text-white text-xs font-extrabold hover:brightness-110"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        )}

        {activeSheetRow === 'notifications' && (
          <div className="space-y-3 text-xs text-[var(--text-secondary)]">
            <p className="leading-relaxed">
              Daily Salah & Hifz reminders configured for{' '}
              <strong className="text-[var(--text-primary)]">{user.name}</strong> ({user.city}).
            </p>
            <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">
                    Persistent Next-Prayer Bar
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Silent ongoing status notification showing your next Salah time on Android.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    const next = !persistentCountdownOn;
                    setPersistentCountdownOn(next);
                    void triggerLightHaptic();
                    await setPersistentPrayerCountdownEnabled(next);
                  }}
                  className={`min-h-[42px] px-3.5 rounded-xl text-xs font-extrabold border shrink-0 transition ${
                    persistentCountdownOn
                      ? 'bg-[#14532D] text-white border-[#14532D]'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                  }`}
                >
                  {persistentCountdownOn ? 'Enabled' : 'Off'}
                </button>
              </div>
              <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-900/30 border border-emerald-900/15 dark:border-emerald-500/20 p-3">
                <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">
                  Home-Screen Prayer Widgets ({widgetCapability.platform.toUpperCase()})
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                  {widgetCapability.honestStatusNote}
                </p>
              </div>
            </div>
          </div>
        )}
      </BottomSheet>

      <OemBatteryGuardSheet
        open={batteryGuardOpen}
        onClose={() => setBatteryGuardOpen(false)}
      />
    </div>
  );
};

export const AdultProfileScreen: React.FC = () => {
  const {
    user,
    updateUser,
    bookmarks,
    openSurahForReading,
    personalNotes,
    addPersonalNote,
    deletePersonalNote,
    recentlyOpenedSurahs,
    quizAttempts,
    completedLessonIds,
    hifzPlans,
  } = useIlmizo();
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [noteRef, setNoteRef] = useState('');
  const [editName, setEditName] = useState(user.name);
  const [editCity, setEditCity] = useState(user.city);

  const profileRows = [
    { id: 'bookmarks', label: `My Bookmarks (${bookmarks.length})`, icon: Bookmark },
    { id: 'notes', label: `My Notes (${personalNotes.length})`, icon: FileText },
    { id: 'achievements', label: 'My Achievements', icon: Award },
    { id: 'history', label: 'Learning History', icon: Clock },
    { id: 'account', label: 'Account Settings & Backup', icon: Settings },
  ];

  const activeRowMeta = profileRows.find((r) => r.id === activeSheet);

  return (
    <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
      {/* Screen 16: My Profile */}
      <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pb-4 shadow-md border-b border-amber-400/15">
        <MobileStatusBar time="9:31" light />
        <div className="flex items-center justify-between px-4 pt-1">
          <ScreenBackButton variant="dark" />
          <h1 className="text-lg font-extrabold">My Profile</h1>
          <SyncStatusBadge compact />
        </div>
      </div>

      <div className="px-4 pt-5 space-y-4">
        {/* Centered Circular 3D Avatar */}
        <div className="flex flex-col items-center text-center">
          <CharacterAvatar character="Aqib" size="xl" />
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] mt-2.5">{user.name}</h2>
          <p className="text-xs text-[var(--text-secondary)]">
            {user.city}, {user.country} · Streak: {user.streakDays} days
          </p>
        </div>

        {/* Keep Learning & Optional 7-Day Calm Plan Customizer */}
        <div className="rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-400/35 p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/30 flex items-center justify-center text-amber-900 dark:text-amber-300 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[var(--text-primary)]">Your Calm Daily Routine</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-0.5">
                Adjust your personal goals, child age band, or 7-day plan anytime — stored locally.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('ilmizo:open-onboarding'))}
            className="min-h-[44px] px-4 rounded-xl bg-[#14532D] text-white text-xs font-extrabold shrink-0"
          >
            Edit 7-Day Plan
          </button>
        </div>

        {/* 5 Profile List Rows opening Native BottomSheet */}
        <div className="rounded-3xl bg-[var(--bg-surface)] divide-y divide-[var(--divider)] shadow-xs border border-[var(--border-subtle)] overflow-hidden">
          {profileRows.map((row) => {
            const Icon = row.icon;
            return (
              <button
                key={row.id}
                type="button"
                onClick={() => {
                  void triggerLightHaptic();
                  setActiveSheet(row.id);
                }}
                className="w-full min-h-[54px] px-4 py-3.5 flex items-center justify-between hover:bg-[var(--bg-elevated)] transition text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-300 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[var(--text-primary)]">{row.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            );
          })}
        </div>
      </div>

      <BottomSheet
        open={activeSheet !== null}
        onClose={() => setActiveSheet(null)}
        title={activeRowMeta?.label || 'Profile'}
      >
        {activeSheet === 'bookmarks' && (
          <div className="space-y-2">
            {bookmarks.length === 0 ? (
              <p className="text-xs text-[var(--text-secondary)] py-4 text-center">
                No bookmarks saved yet. Tap the bookmark icon on any Quran verse to save it here.
              </p>
            ) : (
              bookmarks.map((bm) => (
                <button
                  key={bm.id}
                  type="button"
                  onClick={() => {
                    setActiveSheet(null);
                    openSurahForReading(bm.surahNumber, bm.ayahNumber);
                  }}
                  className="w-full text-left rounded-2xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)] text-xs"
                >
                  <strong className="text-[var(--text-primary)]">
                    {bm.surahName} · Ayah {bm.ayahNumber}
                  </strong>
                  <p className="font-arabic text-lg text-[var(--text-primary)] mt-1">{bm.arabicSnippet}</p>
                </button>
              ))
            )}
          </div>
        )}

        {activeSheet === 'notes' && (
          <div className="space-y-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!noteTitle.trim() || !noteBody.trim()) return;
                addPersonalNote(
                  noteTitle.trim(),
                  noteBody.trim(),
                  noteRef.trim() || undefined
                );
                setNoteTitle('');
                setNoteBody('');
                setNoteRef('');
              }}
              className="space-y-2 rounded-2xl bg-[var(--bg-elevated)] p-3.5 border border-[var(--border-subtle)]"
            >
              <p className="text-xs font-extrabold text-[var(--text-primary)]">Add Reflection Note</p>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note title (e.g., Ayat al-Kursi reflection)..."
                className="w-full rounded-xl ilmizo-input px-3 py-2 text-xs"
              />
              <input
                type="text"
                value={noteRef}
                onChange={(e) => setNoteRef(e.target.value)}
                placeholder="Reference (optional, e.g. Al-Baqarah 2:255)..."
                className="w-full rounded-xl ilmizo-input px-3 py-2 text-xs"
              />
              <textarea
                rows={2}
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                placeholder="Write your reflection..."
                className="w-full rounded-xl ilmizo-input px-3 py-2 text-xs"
              />
              <button
                type="submit"
                className="w-full min-h-[42px] py-2 rounded-xl bg-[#14532D] text-white text-xs font-extrabold"
              >
                Save Note
              </button>
            </form>
            <div className="space-y-2">
              {personalNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)] text-xs flex items-start justify-between gap-2"
                >
                  <div>
                    <p className="font-extrabold text-[var(--text-primary)]">{note.title}</p>
                    {note.surahReference && (
                      <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                        {note.surahReference} · {note.createdAt}
                      </p>
                    )}
                    <p className="text-[var(--text-secondary)] mt-1">{note.body}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deletePersonalNote(note.id)}
                    className="text-[var(--text-muted)] hover:text-rose-500 p-1"
                    aria-label="Delete note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSheet === 'achievements' && (
          <div className="space-y-2 text-xs">
            <div className="rounded-xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)] flex items-center justify-between">
              <span className="font-bold text-[var(--text-primary)]">Hifz Surahs Completed</span>
              <span className="font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
                {hifzPlans.filter((p) => p.status === 'completed').length} / 114
              </span>
            </div>
            <div className="rounded-xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)] flex items-center justify-between">
              <span className="font-bold text-[var(--text-primary)]">Lessons Completed</span>
              <span className="font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
                {completedLessonIds.length} / {ISLAMIC_LESSONS.length}
              </span>
            </div>
          </div>
        )}

        {activeSheet === 'history' && (
          <div className="space-y-2.5 text-xs">
            <p className="font-bold text-[var(--text-primary)]">Recently Opened Surahs</p>
            <div className="flex flex-wrap gap-1.5">
              {recentlyOpenedSurahs.map((sNum) => {
                const sMeta = ALL_114_SURAHS.find((s) => s.number === sNum);
                return (
                  <button
                    key={sNum}
                    type="button"
                    onClick={() => {
                      setActiveSheet(null);
                      openSurahForReading(sNum, 1);
                    }}
                    className="px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[#14532D] dark:text-emerald-300"
                  >
                    {sNum}. {sMeta?.nameTranslit}
                  </button>
                );
              })}
            </div>
            {quizAttempts.length > 0 && (
              <p className="text-xs text-[var(--text-secondary)] pt-1">
                Last Quiz: {quizAttempts[0].quizTitle} ({quizAttempts[0].score}/
                {quizAttempts[0].total})
              </p>
            )}
          </div>
        )}

        {activeSheet === 'account' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Your Name"
                className="rounded-xl ilmizo-input px-3 py-2 text-xs font-bold"
              />
              <input
                type="text"
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
                placeholder="Your City"
                className="rounded-xl ilmizo-input px-3 py-2 text-xs font-bold"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                updateUser({
                  name: editName.trim() || user.name,
                  city: editCity.trim() || user.city,
                });
                setActiveSheet(null);
              }}
              className="w-full min-h-[42px] py-2 rounded-xl bg-amber-400 text-emerald-950 text-xs font-extrabold"
            >
              Save Profile Details
            </button>
            <Suspense fallback={<div className="p-3 text-xs text-[var(--text-secondary)]">Loading backup tools...</div>}>
              <LocalDataManagerCard compact />
            </Suspense>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};
