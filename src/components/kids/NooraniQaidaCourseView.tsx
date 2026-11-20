import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  Loader2,
  Lock,
  PenTool,
  RotateCcw,
  Sparkles,
  Volume2,
  Wand2,
} from 'lucide-react';
import { useIlmizo, useTranslation } from '../../context/IlmizoContext';
import {
  ARABIC_LETTER_JOIN_FORMS,
  buildArabicLetterJoinPreview,
  NOORANI_QAIDA_COURSE_LESSONS,
  QAIDA_MODULES,
  QaidaCourseLesson,
  resolveQaidaText,
} from '../../data/nooraniQaidaCourse';
import {
  NOORANI_QAIDA_28_LETTERS,
  playQaidaLetterHumanAudio,
} from '../../services/humanDuaAndQaidaAudio';
import { audioManager } from '../../services/audioManager';
import { canAccessQaidaLesson, isFamilyPlusActive } from '../../services/subscriptionEngine';
import { playGentleCelebrationChime } from '../../services/celebrationEffects';
import { CelebrationBurst } from '../shared/CelebrationBurst';
import {
  collectAllQaidaWbwPaths,
  downloadQaidaOfflineWbwPack,
  fetchOrGetCachedQaidaSyllable,
  getOfflineQaidaWbwStatus,
  resolveWbwAudioUrlOrCached,
} from '../../services/studioAudioAndTajweedService';
import { QaidaLetterTracingCanvas } from './QaidaLetterTracingCanvas';
import {
  buildQaidaMasteryQuiz,
  evaluateQaidaMasteryResult,
} from '../../services/qaidaMasteryQuizEngine';
import {
  getActiveQaidaRevisionRecommendations,
  markChildQaidaMistakeResolved,
  QaidaMistakeRecord,
  recordChildQaidaMistake,
} from '../../services/qaidaTracingStore';
import { LivingMascot } from '../shared/LivingMascot';
import { triggerLightHaptic, triggerSuccessHaptic } from '../../services/hapticsService';

interface NooraniQaidaCourseViewProps {
  onOpenPaywall: (reason: string) => void;
  onTriggerToast?: (msg: string) => void;
}

const HARAKAT_MARKS = [
  { id: 'fatha', label: 'Zabar (Fatha)', mark: '\u064E', vowelSound: 'a' },
  { id: 'kasra', label: 'Zer (Kasra)', mark: '\u0650', vowelSound: 'i' },
  { id: 'damma', label: 'Pesh (Damma)', mark: '\u064F', vowelSound: 'u' },
  { id: 'tanween_an', label: 'Do-Zabar (-an)', mark: '\u064B', vowelSound: 'an' },
  { id: 'sukoon', label: 'Sukoon (Jazm)', mark: '\u0652', vowelSound: 'stop' },
  { id: 'shaddah', label: 'Shaddah (Double)', mark: '\u0651\u064E', vowelSound: 'double' },
] as const;

export const NooraniQaidaCourseView: React.FC<NooraniQaidaCourseViewProps> = ({
  onOpenPaywall,
  onTriggerToast,
}) => {
  const { user, activeChild, completeQaidaLesson } = useIlmizo();
  const { language } = useTranslation();
  const prefersReduced = useReducedMotion();

  const [activeLessonId, setActiveLessonId] = useState<string>(NOORANI_QAIDA_COURSE_LESSONS[0].id);
  const [subTab, setSubTab] = useState<'drills' | 'alphabet28' | 'trace' | 'joiner' | 'vowels' | 'quiz'>('drills');
  const [selected28Idx, setSelected28Idx] = useState<number>(0);

  // Interactive Letter Joiner Builder state
  const [builderLetters, setBuilderLetters] = useState<string[]>(['ب', 'س', 'م']);

  // Interactive Harakat Playground state
  const [playgroundLetterIdx, setPlaygroundLetterIdx] = useState<number>(1); // Baa
  const [playgroundHarakatId, setPlaygroundHarakatId] = useState<string>('fatha');

  // 5-Question Audio Recognition Mastery Quiz & Celebration state
  const [quizSeed, setQuizSeed] = useState<number>(101);
  const [quizStepIdx, setQuizStepIdx] = useState<number>(0);
  const [quizAnswerIdx, setQuizAnswerIdx] = useState<number | null>(null);
  const [quizCorrectCount, setQuizCorrectCount] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [revisionItems, setRevisionItems] = useState<QaidaMistakeRecord[]>(() =>
    getActiveQaidaRevisionRecommendations(activeChild.id, 4)
  );

  // Offline Qaida L3-14 Qari WBW Pack state
  const allWbwPaths = useMemo(
    () => collectAllQaidaWbwPaths(NOORANI_QAIDA_COURSE_LESSONS),
    []
  );
  const [wbwCachedCount, setWbwCachedCount] = useState<number>(0);
  const [isDownloadingWbw, setIsDownloadingWbw] = useState<boolean>(false);
  const [wbwProgress, setWbwProgress] = useState<{ completed: number; total: number }>({
    completed: 0,
    total: allWbwPaths.length,
  });
  const [loadingStudioSyllable, setLoadingStudioSyllable] = useState<string | null>(null);
  const activeBlobUrlRef = useRef<string | null>(null);
  const wbwAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let active = true;
    void getOfflineQaidaWbwStatus(allWbwPaths).then((st) => {
      if (active) setWbwCachedCount(st.cachedCount);
    });
    return () => {
      active = false;
      wbwAbortRef.current?.abort();
      if (activeBlobUrlRef.current) {
        try {
          URL.revokeObjectURL(activeBlobUrlRef.current);
        } catch {
          // ignore revoke error
        }
        activeBlobUrlRef.current = null;
      }
    };
  }, [allWbwPaths]);

  const completedIds = activeChild.completedQaidaLessonIds || [];
  const familyPlus = isFamilyPlusActive(user);

  const activeLesson: QaidaCourseLesson = useMemo(
    () =>
      NOORANI_QAIDA_COURSE_LESSONS.find((l) => l.id === activeLessonId) ||
      NOORANI_QAIDA_COURSE_LESSONS[0],
    [activeLessonId]
  );

  const joinPreview = useMemo(() => buildArabicLetterJoinPreview(builderLetters), [builderLetters]);

  const activePlaygroundLetter =
    ARABIC_LETTER_JOIN_FORMS[playgroundLetterIdx] || ARABIC_LETTER_JOIN_FORMS[1];
  const activePlaygroundMark =
    HARAKAT_MARKS.find((h) => h.id === playgroundHarakatId) || HARAKAT_MARKS[0];

  const handleDownloadQaidaOfflinePack = async () => {
    if (isDownloadingWbw) {
      wbwAbortRef.current?.abort();
      setIsDownloadingWbw(false);
      return;
    }
    const controller = new AbortController();
    wbwAbortRef.current = controller;
    setIsDownloadingWbw(true);
    setWbwProgress({ completed: wbwCachedCount, total: allWbwPaths.length });
    const res = await downloadQaidaOfflineWbwPack({
      wbwPaths: allWbwPaths,
      signal: controller.signal,
      onProgress: (p) => {
        setWbwProgress(p);
        setWbwCachedCount(p.completed);
      },
    });
    setIsDownloadingWbw(false);
    wbwAbortRef.current = null;
    if (res.ok) {
      setWbwCachedCount(res.completed);
      onTriggerToast?.(
        `Saved all ${res.completed} Qari single-word clips offline for Lessons 3–14!`
      );
    } else if (res.error && res.error !== 'Download cancelled.') {
      onTriggerToast?.(res.error);
    }
  };

  const masteryQuiz = useMemo(
    () => buildQaidaMasteryQuiz(activeLesson, quizSeed),
    [activeLesson, quizSeed]
  );

  const resetMasteryQuiz = (bumpSeed = false) => {
    setQuizStepIdx(0);
    setQuizAnswerIdx(null);
    setQuizCorrectCount(0);
    setQuizFinished(false);
    if (bumpSeed) setQuizSeed((s) => s + 17);
  };

  const handleSelectLesson = (lesson: QaidaCourseLesson) => {
    const unlocked = canAccessQaidaLesson(user, lesson.lessonNumber);
    if (!unlocked) {
      onOpenPaywall(
        `Unlock "${resolveQaidaText(lesson.title, language)}" and all 17 interactive Noorani Qaida lessons with Family Plus (₹199/yr · 7-Day Free Trial).`
      );
      return;
    }
    setActiveLessonId(lesson.id);
    resetMasteryQuiz(false);
    if (lesson.hasJoinBuilder) setSubTab('joiner');
    else if (lesson.hasVowelPlayground) setSubTab('vowels');
    else setSubTab('drills');
    playGentleCelebrationChime('tap');
  };

  const playManagedBlobUrl = (trackId: string, blobUrl: string) => {
    if (activeBlobUrlRef.current && activeBlobUrlRef.current !== blobUrl) {
      try {
        URL.revokeObjectURL(activeBlobUrlRef.current);
      } catch {
        // ignore
      }
    }
    activeBlobUrlRef.current = blobUrl;
    audioManager.playAudioUrl({
      id: trackId,
      url: blobUrl,
      allowTtsFallback: false,
      rate: 0.95,
      onError: (msg) => onTriggerToast?.(msg),
    });
  };

  const playDrillAudio = (params: {
    id: string;
    arabic: string;
    globalAyahNumber?: number;
    letterAudioSlug?: string;
    wbwWordPath?: string;
    label: string;
  }) => {
    if (params.letterAudioSlug) {
      audioManager.playAudioUrl({
        id: `qaida_course_${params.id}`,
        url: `/assets/audio/qaida/${params.letterAudioSlug}.mp3`,
        allowTtsFallback: false,
        offlineUnavailableMessage: 'Letter audio clip unavailable.',
        rate: 0.95,
        onError: (msg) => onTriggerToast?.(msg),
      });
      onTriggerToast?.(`Playing ${params.label}`);
      return;
    }

    if (params.wbwWordPath) {
      const wbwPath = params.wbwWordPath;
      void resolveWbwAudioUrlOrCached(wbwPath).then((resolved) => {
        if (resolved.offlineUncached || !resolved.url) {
          onTriggerToast?.(
            resolved.error ||
              'Offline — download the Qaida Word-by-Word Audio Pack to listen without internet.'
          );
          return;
        }
        if (resolved.isOfflineCached) {
          playManagedBlobUrl(`qaida_wbw_${params.id}`, resolved.url);
          onTriggerToast?.(`Offline Qari Word — ${params.label}`);
        } else {
          audioManager.playAudioUrl({
            id: `qaida_wbw_${params.id}`,
            url: resolved.url,
            allowTtsFallback: false,
            offlineUnavailableMessage:
              'Offline — download the Qaida Word-by-Word Audio Pack to listen without internet.',
            rate: 0.95,
            onError: (msg) => onTriggerToast?.(msg),
          });
          onTriggerToast?.(`Single-Word Qari — ${params.label}`);
        }
      });
      return;
    }

    if (params.globalAyahNumber) {
      const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
      audioManager.playAudioUrl({
        id: `qaida_qari_${params.id}`,
        url: isOffline
          ? undefined
          : `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${params.globalAyahNumber}.mp3`,
        allowTtsFallback: false,
        offlineUnavailableMessage:
          'Qari Ayah example is not cached offline. Connect to internet to listen.',
        rate: 0.95,
        onError: (msg) => onTriggerToast?.(msg),
      });
      if (!isOffline) {
        onTriggerToast?.(`Sheikh Mishary Alafasy — ${params.label}`);
      }
      return;
    }

    // Harakat Playground / Joined Blends: Studio Arabic Tajweed Audio (cached in IndexedDB)
    setLoadingStudioSyllable(params.id);
    void fetchOrGetCachedQaidaSyllable({
      arabicText: params.arabic,
      label: params.label,
    }).then((res) => {
      setLoadingStudioSyllable((prev) => (prev === params.id ? null : prev));
      if (res.ok && res.blobUrl) {
        playManagedBlobUrl(`qaida_studio_${params.id}`, res.blobUrl);
        onTriggerToast?.(
          res.fromCache
            ? `Offline Ustad Voice — ${params.label}`
            : `Studio Ustad — ${params.label}`
        );
        return;
      }
      onTriggerToast?.(
        res.error || 'Offline — connect to the internet once to save Ustad Qaida audio.'
      );
    });
  };

  const playJoinedLettersSequence = (letters: string[]) => {
    const slugs = letters
      .map((ch) => ARABIC_LETTER_JOIN_FORMS.find((f) => f.letter === ch)?.audioSlug)
      .filter((s): s is string => Boolean(s));
    if (slugs.length === 0) return;

    const playAt = (idx: number) => {
      if (idx >= slugs.length) return;
      audioManager.playAudioUrl({
        id: `qaida_join_seq_${idx}_${slugs[idx]}`,
        url: `/assets/audio/qaida/${slugs[idx]}.mp3`,
        allowTtsFallback: false,
        rate: 1.0,
        onEnded: () => playAt(idx + 1),
        onError: (msg) => onTriggerToast?.(msg),
      });
    };
    playAt(0);
    onTriggerToast?.(`Playing ${letters.length} isolated letters sequentially`);
  };

  const handleCompleteLesson = (scorePct = 100) => {
    const res = completeQaidaLesson(
      activeLesson.id,
      resolveQaidaText(activeLesson.title, language),
      activeLesson.starsReward,
      scorePct
    );
    playGentleCelebrationChime('lesson_complete');
    setShowCelebration(true);
    window.setTimeout(() => setShowCelebration(false), 1800);
    onTriggerToast?.(
      res.alreadyCompleted
        ? `Practiced ${resolveQaidaText(activeLesson.title, language)} again!`
        : `MashaAllah! Completed Lesson ${activeLesson.lessonNumber} (+${res.starsAwarded} ★)`
    );
  };

  const active28Letter =
    NOORANI_QAIDA_28_LETTERS[selected28Idx] || NOORANI_QAIDA_28_LETTERS[0];

  const progressPct = Math.round(
    (completedIds.length / NOORANI_QAIDA_COURSE_LESSONS.length) * 100
  );

  return (
    <div className="space-y-4 text-left">
      <CelebrationBurst
        visible={showCelebration}
        title={`Lesson ${activeLesson.lessonNumber} Complete!`}
        subtitle={`MashaAllah ${activeChild.name}! Keep going toward your Noorani Qaida Certificate.`}
      />

      {/* Course Header & Progress Ribbon */}
      <div className="rounded-3xl bg-[var(--bg-surface)] border-2 border-[#D4AF37]/70 p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Complete Curriculum · {completedIds.length}/{NOORANI_QAIDA_COURSE_LESSONS.length} Lessons Done
            </p>
            <h3 className="text-base font-extrabold text-[var(--text-primary)] mt-0.5">
              Interactive Noorani Qaida Course
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Alphabet · Letter Joining · Harakat · Tanween · Qalqalah · Madd & Tashdeed
            </p>
          </div>
          {!familyPlus && (
            <button
              type="button"
              onClick={() =>
                onOpenPaywall(
                  'Unlock all 17 interactive Noorani Qaida lessons (Harakat, Joining, Madd, Shaddah & Certificate) for just ₹199/year.'
                )
              }
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold min-h-[40px] flex items-center gap-1.5 shadow-xs transition shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlock Full Course</span>
            </button>
          )}
        </div>

        {/* Clean Progress Track */}
        <div className="space-y-1">
          <div className="h-2.5 w-full rounded-full bg-[var(--bg-subtle)] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#14532D] to-[#22C55E]"
              initial={false}
              animate={{ width: `${Math.max(6, progressPct)}%` }}
              transition={{ duration: prefersReduced ? 0.05 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-bold text-[var(--text-secondary)] tabular-nums">
            <span>{progressPct}% Qaida Mastery</span>
            <span>Lessons 1–3 Free · 4–17 Family Plus</span>
          </div>
        </div>

        {/* Offline Qari Single-Word Audio Pack (Lessons 3-14) */}
        <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 flex flex-wrap items-center justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-extrabold text-[var(--text-primary)]">
              Offline Qaida Qari Audio (Lessons 3–14)
            </p>
            <p className="text-[11px] font-semibold text-[var(--text-secondary)] tabular-nums">
              {isDownloadingWbw
                ? `Saving Qari clips offline (${wbwProgress.completed}/${wbwProgress.total})…`
                : wbwCachedCount >= allWbwPaths.length && allWbwPaths.length > 0
                ? `All ${allWbwPaths.length}/${allWbwPaths.length} Qari word clips saved offline`
                : `${wbwCachedCount}/${allWbwPaths.length} Qari word clips cached · L1–2 already bundled`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadQaidaOfflinePack}
            className={`px-3.5 min-h-[44px] rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition shrink-0 ${
              wbwCachedCount >= allWbwPaths.length && allWbwPaths.length > 0
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-200'
                : 'bg-[#14532D] text-white hover:bg-emerald-800'
            }`}
          >
            {isDownloadingWbw ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  {wbwCachedCount >= allWbwPaths.length && allWbwPaths.length > 0
                    ? 'Saved Offline ✓'
                    : 'Save Offline'}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Horizontal 6-Module / 17-Lesson Selector Strip */}
        <div className="space-y-2 pt-1">
          {QAIDA_MODULES.map((mod) => {
            const modLessons = NOORANI_QAIDA_COURSE_LESSONS.filter((l) => l.moduleId === mod.id);
            return (
              <div key={mod.id} className="space-y-1.5">
                <p className="text-[11px] font-extrabold text-[var(--text-secondary)]">
                  {resolveQaidaText(mod.title, language)}
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {modLessons.map((lesson) => {
                    const isSelected = lesson.id === activeLesson.id;
                    const isDone = completedIds.includes(lesson.id);
                    const unlocked = canAccessQaidaLesson(user, lesson.lessonNumber);
                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => handleSelectLesson(lesson)}
                        className={`shrink-0 min-w-[155px] max-w-[190px] rounded-2xl p-2.5 border text-left transition min-h-[56px] flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-[#14532D] text-white border-[#D4AF37] shadow-sm'
                            : isDone
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-500/40'
                            : unlocked
                            ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-amber-400'
                            : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border-[var(--border-subtle)]'
                        }`}
                      >
                        <div className="min-w-0">
                          <p
                            className={`text-[11px] font-extrabold tabular-nums ${
                              isSelected ? 'text-amber-300' : 'text-emerald-800 dark:text-emerald-300'
                            }`}
                          >
                            L{lesson.lessonNumber} · +{lesson.starsReward} ★
                          </p>
                          <p className="text-xs font-extrabold truncate">
                            {resolveQaidaText(lesson.title, language).replace(/^Lesson \d+:\s*|^सबक़ \d+:\s*|^سبق \d+:\s*/, '')}
                          </p>
                        </div>
                        {isDone ? (
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? 'text-amber-300' : 'text-emerald-600 dark:text-emerald-400'
                            }`}
                          />
                        ) : !unlocked ? (
                          <Lock className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 shrink-0 opacity-60" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Lesson Interactive Card */}
      <motion.div
        key={activeLesson.id}
        initial={prefersReduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReduced ? 0.05 : 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 shadow-sm space-y-4"
      >
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 tabular-nums">
              Lesson {activeLesson.lessonNumber} of 17 · {activeLesson.estimatedMinutes} min
            </span>
            <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300">
              {completedIds.includes(activeLesson.id) ? 'Completed ★' : `+${activeLesson.starsReward} ★ Reward`}
            </span>
          </div>
          <h4 className="text-base font-extrabold text-[#14532D] dark:text-emerald-300">
            {resolveQaidaText(activeLesson.title, language)}
          </h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {resolveQaidaText(activeLesson.ruleExplanation, language)}
          </p>
        </div>

        {/* Interactive Lab Mode Switcher */}
        <div className="flex flex-wrap gap-1.5 bg-[var(--bg-subtle)] p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setSubTab('drills')}
            className={`flex-1 min-w-[82px] py-2 px-2.5 rounded-xl text-xs font-extrabold transition min-h-[40px] ${
              subTab === 'drills' ? 'bg-[#14532D] text-white shadow-2xs' : 'text-[var(--text-secondary)]'
            }`}
          >
            Drills
          </button>
          <button
            type="button"
            onClick={() => setSubTab('trace')}
            className={`flex-1 min-w-[92px] py-2 px-2.5 rounded-xl text-xs font-extrabold transition min-h-[40px] flex items-center justify-center gap-1 ${
              subTab === 'trace' ? 'bg-[#14532D] text-white shadow-2xs' : 'text-[var(--text-secondary)]'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Trace Pad</span>
          </button>
          {activeLesson.lessonNumber === 1 && (
            <button
              type="button"
              onClick={() => setSubTab('alphabet28')}
              className={`flex-1 min-w-[92px] py-2 px-2.5 rounded-xl text-xs font-extrabold transition min-h-[40px] ${
                subTab === 'alphabet28' ? 'bg-[#14532D] text-white shadow-2xs' : 'text-[var(--text-secondary)]'
              }`}
            >
              28 Letters
            </button>
          )}
          <button
            type="button"
            onClick={() => setSubTab('joiner')}
            className={`flex-1 min-w-[88px] py-2 px-2.5 rounded-xl text-xs font-extrabold transition min-h-[40px] flex items-center justify-center gap-1 ${
              subTab === 'joiner' ? 'bg-[#14532D] text-white shadow-2xs' : 'text-[var(--text-secondary)]'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Joiner</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('vowels')}
            className={`flex-1 min-w-[86px] py-2 px-2.5 rounded-xl text-xs font-extrabold transition min-h-[40px] ${
              subTab === 'vowels' ? 'bg-[#14532D] text-white shadow-2xs' : 'text-[var(--text-secondary)]'
            }`}
          >
            Vowels
          </button>
          <button
            type="button"
            onClick={() => {
              resetMasteryQuiz(false);
              setSubTab('quiz');
            }}
            className={`flex-1 min-w-[100px] py-2 px-2.5 rounded-xl text-xs font-extrabold transition min-h-[40px] ${
              subTab === 'quiz' ? 'bg-amber-500 text-emerald-950 shadow-2xs' : 'text-[var(--text-secondary)]'
            }`}
          >
            Mastery Quiz (5Q)
          </button>
        </div>

        {/* TAB 1B: INTERACTIVE ARABIC LETTER TRACING PAD */}
        {subTab === 'trace' && (
          <QaidaLetterTracingCanvas
            childId={activeChild.id}
            initialLetterIdx={selected28Idx}
            onLetterTraced={(letterName, pct) => {
              onTriggerToast?.(`MashaAllah! Traced ${letterName} (${pct}% match)`);
            }}
            onTriggerToast={onTriggerToast}
          />
        )}

        {/* TAB 1: DRILL CARDS */}
        {subTab === 'drills' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeLesson.tiles.map((tile) => (
                <motion.div
                  key={tile.id}
                  whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                  className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 flex flex-col justify-between gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold text-[var(--text-primary)]">
                        {tile.transliteration}
                      </p>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                        {resolveQaidaText(tile.meaning, language)}
                      </p>
                    </div>
                    <div
                      dir="rtl"
                      className="px-3 py-1.5 rounded-xl bg-[#0F3826] text-amber-300 font-arabic text-2xl font-bold shrink-0 shadow-xs"
                    >
                      {tile.arabic}
                    </div>
                  </div>

                  {tile.breakupLetters && (
                    <div dir="rtl" className="flex items-center gap-1 text-xs font-arabic">
                      <span className="text-[11px] font-sans font-bold text-[var(--text-muted)] ml-1" dir="ltr">
                        Letters:
                      </span>
                      {tile.breakupLetters.map((ch, i) => (
                        <span
                          key={i}
                          className="w-7 h-7 rounded-lg bg-[var(--bg-surface)] border border-amber-400/40 flex items-center justify-center font-bold text-[var(--text-primary)]"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-[11px] font-semibold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 rounded-xl px-2.5 py-1.5">
                    {resolveQaidaText(tile.tajweedRuleNote, language)}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      playDrillAudio({
                        id: tile.id,
                        arabic: tile.arabic,
                        globalAyahNumber: tile.globalAyahNumber,
                        letterAudioSlug: tile.letterAudioSlug,
                        wbwWordPath: tile.wbwWordPath,
                        label: `${tile.transliteration} (${tile.quranAyahRef})`,
                      })
                    }
                    className="w-full py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 min-h-[42px] transition"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>
                      {tile.letterAudioSlug
                        ? `Hear Isolated Letter (${tile.transliteration})`
                        : tile.wbwWordPath
                        ? `Hear Exact Word (${tile.transliteration})`
                        : `Hear Qari Ayah (${tile.quranAyahRef})`}
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setQuizAnswerIdx(null);
                  setSubTab('quiz');
                }}
                className="flex-1 py-3 rounded-xl bg-[#14532D] text-white text-xs font-extrabold min-h-[44px]"
              >
                Take Lesson {activeLesson.lessonNumber} Quiz →
              </button>
              <button
                type="button"
                onClick={() => handleCompleteLesson(100)}
                className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold min-h-[44px]"
              >
                Mark Practiced (+{activeLesson.starsReward} ★)
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: FULL 28 ARABIC LETTERS ISOLATED MP3 GRID (Lesson 1) */}
        {subTab === 'alphabet28' && (
          <div className="space-y-3">
            <div
              dir="rtl"
              className="grid grid-cols-7 gap-1.5 bg-[var(--bg-elevated)] p-2.5 rounded-2xl border border-[var(--border-subtle)]"
            >
              {NOORANI_QAIDA_28_LETTERS.map((item, idx) => {
                const isSelected = idx === selected28Idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelected28Idx(idx);
                      playQaidaLetterHumanAudio({
                        letter: item,
                        mode: 'letter',
                        onStatus: onTriggerToast,
                      });
                    }}
                    className={`h-11 rounded-xl font-arabic text-xl font-bold flex items-center justify-center border transition ${
                      isSelected
                        ? 'bg-[#14532D] text-amber-300 border-[#D4AF37] scale-105'
                        : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-amber-400'
                    }`}
                  >
                    {item.letterArabic}
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl bg-[var(--bg-elevated)] border border-amber-400/40 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] font-extrabold text-amber-800 dark:text-amber-300">
                    Letter {active28Letter.number} of 28 · Isolated MP3 + Makhraj
                  </p>
                  <h5 className="text-base font-extrabold text-[var(--text-primary)]">
                    {active28Letter.nameEn} ({active28Letter.nameAr})
                  </h5>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {active28Letter.makhrajTip[language] || active28Letter.makhrajTip.en}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#0F3826] text-amber-300 flex items-center justify-center font-arabic text-3xl font-bold shrink-0">
                  {active28Letter.letterArabic}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    playQaidaLetterHumanAudio({
                      letter: active28Letter,
                      mode: 'letter',
                      onStatus: onTriggerToast,
                    })
                  }
                  className="flex-1 py-2.5 px-3 rounded-xl bg-amber-400 text-emerald-950 text-xs font-extrabold min-h-[42px] flex items-center justify-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Hear Letter ({active28Letter.nameEn})</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    playQaidaLetterHumanAudio({
                      letter: active28Letter,
                      mode: 'quran_example',
                      onStatus: onTriggerToast,
                    })
                  }
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#16A34A] text-white text-xs font-extrabold min-h-[42px] flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Quran Ayah ({active28Letter.quranAyahRef})</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INTERACTIVE LETTER JOINER LAB */}
        {subTab === 'joiner' && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-[#0F3826] text-white p-4 text-center space-y-3">
              <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                Live Arabic Letter Joiner (Tap letters below to connect up to 4)
              </p>
              <motion.div
                key={joinPreview.joinedWord}
                initial={prefersReduced ? false : { scale: 0.92, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.18 }}
                dir="rtl"
                className="font-arabic text-5xl font-bold text-amber-300 py-2 min-h-[68px] flex items-center justify-center"
              >
                {joinPreview.joinedWord || '—'}
              </motion.div>

              {joinPreview.slots.length > 0 && (
                <div dir="rtl" className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  {joinPreview.slots.map((slot, i) => (
                    <div
                      key={`${slot.letter}-${i}`}
                      className="rounded-xl bg-white/10 border border-white/15 p-2"
                    >
                      <p className="font-arabic text-2xl font-bold text-white">
                        {slot.contextualGlyph}
                      </p>
                      <p className="text-[11px] font-bold text-emerald-100 capitalize" dir="ltr">
                        {slot.name} · {slot.position}
                      </p>
                      {!slot.connectsLeft && (
                        <p className="text-[11px] font-extrabold text-amber-300" dir="ltr">
                          Non-connector
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setBuilderLetters([])}
                  className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold min-h-[38px]"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setBuilderLetters(['ب', 'س', 'م'])}
                  className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold min-h-[38px]"
                >
                  Try: ب س م
                </button>
                <button
                  type="button"
                  onClick={() => setBuilderLetters(['ر', 'س', 'و', 'ل'])}
                  className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold min-h-[38px]"
                >
                  Try: ر س و ل
                </button>
                {joinPreview.joinedWord && (
                  <>
                    <button
                      type="button"
                      onClick={() => playJoinedLettersSequence(builderLetters)}
                      className="px-3.5 py-2 rounded-xl bg-amber-400 text-emerald-950 text-xs font-extrabold min-h-[38px] inline-flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hear Letters (MP3)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        playDrillAudio({
                          id: `joiner_${joinPreview.joinedWord}`,
                          arabic: joinPreview.joinedWord,
                          label: `Joined word ${joinPreview.joinedWord}`,
                        })
                      }
                      className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold min-h-[38px] inline-flex items-center gap-1"
                    >
                      <span>Blend</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div
              dir="rtl"
              className="grid grid-cols-7 gap-1.5 bg-[var(--bg-elevated)] p-2.5 rounded-2xl border border-[var(--border-subtle)]"
            >
              {ARABIC_LETTER_JOIN_FORMS.map((item) => (
                <button
                  key={item.letter}
                  type="button"
                  onClick={() => {
                    setBuilderLetters((prev) =>
                      prev.length >= 4 ? [prev[1], prev[2], prev[3], item.letter] : [...prev, item.letter]
                    );
                    playGentleCelebrationChime('tap');
                  }}
                  className="h-10 rounded-xl bg-[var(--bg-surface)] hover:border-amber-400 border border-[var(--border-subtle)] font-arabic text-xl font-bold text-[var(--text-primary)] flex items-center justify-center transition"
                >
                  {item.letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: HARAKAT / VOWEL PLAYGROUND */}
        {subTab === 'vowels' && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-[var(--bg-elevated)] border-2 border-amber-400/50 p-4 text-center space-y-3">
              <p className="text-[11px] font-extrabold text-amber-800 dark:text-amber-300 uppercase">
                Tap Any Harakat Below & Hear How It Transforms {activePlaygroundLetter.name}
              </p>
              <motion.div
                key={`${activePlaygroundLetter.letter}-${activePlaygroundMark.id}`}
                initial={prefersReduced ? false : { scale: 0.9, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 rounded-3xl bg-[#0F3826] text-amber-300 flex items-center justify-center font-arabic text-5xl font-bold mx-auto shadow-md"
              >
                {activePlaygroundMark.id === 'sukoon'
                  ? `أَ${activePlaygroundLetter.letter}${activePlaygroundMark.mark}`
                  : `${activePlaygroundLetter.letter}${activePlaygroundMark.mark}`}
              </motion.div>
              <p className="text-xs font-extrabold text-[var(--text-primary)]">
                {activePlaygroundLetter.name} + {activePlaygroundMark.label}
                {loadingStudioSyllable?.startsWith('vowel_') ? ' · Loading Ustad voice…' : ''}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {HARAKAT_MARKS.map((mark) => (
                  <button
                    key={mark.id}
                    type="button"
                    onClick={() => {
                      setPlaygroundHarakatId(mark.id);
                      const vocalized =
                        mark.id === 'sukoon'
                          ? `أَ${activePlaygroundLetter.letter}${mark.mark}`
                          : `${activePlaygroundLetter.letter}${mark.mark}`;
                      playDrillAudio({
                        id: `vowel_${activePlaygroundLetter.letter}_${mark.id}`,
                        arabic: vocalized,
                        label: `${activePlaygroundLetter.name} with ${mark.label}`,
                      });
                    }}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-extrabold min-h-[44px] transition ${
                      playgroundHarakatId === mark.id
                        ? 'bg-[#14532D] text-white border-[#14532D] dark:border-emerald-400'
                        : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                    }`}
                  >
                    {mark.label}
                  </button>
                ))}
              </div>
            </div>

            <div dir="rtl" className="grid grid-cols-7 gap-1.5 bg-[var(--bg-elevated)] p-2 rounded-2xl border border-[var(--border-subtle)]">
              {ARABIC_LETTER_JOIN_FORMS.slice(0, 28).map((item, idx) => (
                <button
                  key={item.letter}
                  type="button"
                  onClick={() => setPlaygroundLetterIdx(idx)}
                  className={`h-10 rounded-xl font-arabic text-lg font-bold border transition ${
                    idx === playgroundLetterIdx
                      ? 'bg-amber-400 text-emerald-950 border-amber-500'
                      : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)]'
                  }`}
                >
                  {item.letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: 5-QUESTION AUDIO RECOGNITION MASTERY QUIZ */}
        {subTab === 'quiz' && (() => {
          const currentQ = masteryQuiz.questions[quizStepIdx] || masteryQuiz.questions[0];
          const totalQ = masteryQuiz.questions.length;
          const result = evaluateQaidaMasteryResult({
            correctCount: quizCorrectCount,
            totalQuestions: totalQ,
          });
          const nextLesson = NOORANI_QAIDA_COURSE_LESSONS.find(
            (l) => l.lessonNumber === activeLesson.lessonNumber + 1
          );
          const nextLessonUnlocked = nextLesson
            ? canAccessQaidaLesson(user, nextLesson.lessonNumber)
            : false;

          if (quizFinished) {
            return (
              <div className="rounded-2xl bg-[var(--bg-elevated)] border-2 border-amber-400/50 p-5 space-y-4 text-center">
                <div className="flex justify-center">
                  <LivingMascot
                    character="Mizo"
                    state={result.passed ? 'celebrating' : 'encouraging'}
                    size="md"
                    showSpeechBubble
                    speechText={
                      result.passed
                        ? `MashaAllah ${activeChild.name}! You mastered Lesson ${activeLesson.lessonNumber}!`
                        : 'Great effort! Let us review the tricky letters gently and try again.'
                    }
                  />
                </div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 tabular-nums">
                  Lesson {activeLesson.lessonNumber} Mastery Result · {quizCorrectCount}/{totalQ} Correct
                </p>
                <h4 className="text-xl font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
                  {result.passed
                    ? `MashaAllah! ${result.scorePercent}% Mastered ★`
                    : `${result.scorePercent}% — Need ${masteryQuiz.passingScorePercent}% to Master`}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
                  {result.passed
                    ? `Wonderful listening and recognition! Lesson ${activeLesson.lessonNumber} is marked mastered for ${activeChild.name}.`
                    : 'Almost there! Review the audio drill cards or try a fresh 5-question round to reach 4/5.'}
                </p>

                {revisionItems.length > 0 && (
                  <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 text-left space-y-2">
                    <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">
                      Recommended Revision Based on Recent Answers
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {revisionItems.map((rev) => (
                        <div
                          key={rev.id}
                          className="rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-2.5 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <p className="font-arabic text-xl font-bold text-[#14532D] dark:text-amber-300 leading-tight">
                              {rev.arabicText}
                            </p>
                            <p className="text-[11px] font-bold text-[var(--text-secondary)] truncate">
                              {rev.label} · Lesson {rev.lessonNumber}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              markChildQaidaMistakeResolved(activeChild.id, rev.id);
                              setRevisionItems(getActiveQaidaRevisionRecommendations(activeChild.id, 4));
                              void triggerLightHaptic();
                            }}
                            className="min-h-[36px] px-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold shrink-0"
                          >
                            Practiced
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => resetMasteryQuiz(true)}
                    className="px-4 min-h-[44px] rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-extrabold inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>New 5Q Round</span>
                  </button>
                  {result.passed && nextLesson && (
                    <button
                      type="button"
                      onClick={() => handleSelectLesson(nextLesson)}
                      className="px-4 min-h-[44px] rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center gap-1.5 shadow-sm transition"
                    >
                      {nextLessonUnlocked ? (
                        <>
                          <span>Continue to Lesson {nextLesson.lessonNumber}</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-amber-300" />
                          <span>Unlock Lesson {nextLesson.lessonNumber} (Family Plus)</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {completedIds.length >= 3 && (
                  <div className="rounded-xl bg-emerald-950 text-amber-200 p-3 flex items-center justify-center gap-2 text-xs font-bold">
                    <Award className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>
                      {completedIds.length >= 17
                        ? 'MashaAllah! All 17 Qaida Lessons mastered — view your Certificate in Badges!'
                        : `${17 - completedIds.length} lesson(s) remaining for Noorani Qaida Graduation!`}
                    </span>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 space-y-3.5">
              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-extrabold text-amber-900 dark:text-amber-300 tabular-nums">
                  <span>
                    Lesson {activeLesson.lessonNumber} Mastery Check · Question {quizStepIdx + 1} of {totalQ}
                  </span>
                  <span className="text-emerald-800 dark:text-emerald-300">Score: {quizCorrectCount}/{totalQ}</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#22C55E] transition-all duration-200"
                    style={{ width: `${((quizStepIdx + (quizAnswerIdx !== null ? 1 : 0)) / totalQ) * 100}%` }}
                  />
                </div>
              </div>

              {/* Prompt + Audio Playback Trigger */}
              <div className="rounded-2xl bg-[#0F3826] text-white p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1 flex-1 min-w-[180px]">
                  <p className="text-[11px] font-bold text-amber-300">
                    {currentQ.kind === 'audio_recognition'
                      ? 'Audio Recognition Challenge'
                      : currentQ.kind === 'rule_check'
                      ? 'Qaida Rule Mastery'
                      : 'Drill Recognition'}
                  </p>
                  <p className="text-sm font-extrabold leading-snug">
                    {language === 'hinglish' || language === 'hi'
                      ? currentQ.promptHinglish
                      : currentQ.promptEn}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {currentQ.visibleTargetArabic && (
                    <div className="px-3.5 py-2 rounded-xl bg-white/10 text-amber-300 font-arabic text-2xl font-bold">
                      {currentQ.visibleTargetArabic}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      playDrillAudio({
                        id: currentQ.id,
                        arabic: currentQ.audio.arabicText,
                        letterAudioSlug: currentQ.audio.letterAudioSlug,
                        wbwWordPath: currentQ.audio.wbwWordPath,
                        globalAyahNumber: currentQ.audio.globalAyahNumber,
                        label:
                          currentQ.kind === 'audio_recognition'
                            ? 'Audio question clip'
                            : currentQ.audio.spokenLabel,
                      })
                    }
                    className="px-4 min-h-[48px] rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold inline-flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Hear Sound</span>
                  </button>
                </div>
              </div>

              {/* 4 Answer Tiles */}
              <div className="grid grid-cols-2 gap-2.5">
                {currentQ.options.map((opt, idx) => {
                  const picked = quizAnswerIdx === idx;
                  const answered = quizAnswerIdx !== null;
                  const isCorrect = idx === currentQ.correctIndex;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={answered}
                      onClick={() => {
                        setQuizAnswerIdx(idx);
                        if (isCorrect) {
                          setQuizCorrectCount((c) => c + 1);
                          playGentleCelebrationChime('star');
                          void triggerSuccessHaptic();
                        } else {
                          playGentleCelebrationChime('tap');
                          void triggerLightHaptic();
                          recordChildQaidaMistake({
                            childId: activeChild.id,
                            lessonId: activeLesson.id,
                            lessonNumber: activeLesson.lessonNumber,
                            arabicText: currentQ.audio.arabicText,
                            label: currentQ.audio.spokenLabel,
                          });
                          setRevisionItems(getActiveQaidaRevisionRecommendations(activeChild.id, 4));
                        }
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-center flex flex-col items-center justify-center gap-1 min-h-[76px] transition ${
                        answered && isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 dark:border-emerald-400 text-emerald-950 dark:text-emerald-100'
                          : picked && !isCorrect
                          ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200'
                          : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-amber-400 text-[var(--text-primary)]'
                      }`}
                    >
                      <span className="font-arabic text-3xl font-bold text-[#14532D] dark:text-amber-300">
                        {opt.arabic}
                      </span>
                      {(answered || currentQ.kind !== 'audio_recognition') && (
                        <span className="text-[11px] font-extrabold text-[var(--text-secondary)]">
                          {opt.label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next Step CTA */}
              {quizAnswerIdx !== null && (
                <div className="space-y-2.5">
                  <div
                    className={`rounded-xl p-3 text-xs font-bold border ${
                      quizAnswerIdx === currentQ.correctIndex
                        ? 'bg-emerald-50 dark:bg-emerald-950/45 border-emerald-300 dark:border-emerald-500/35 text-emerald-950 dark:text-emerald-200'
                        : 'bg-amber-50 dark:bg-amber-950/45 border-amber-300 dark:border-amber-500/35 text-amber-950 dark:text-amber-200'
                    }`}
                  >
                    {quizAnswerIdx === currentQ.correctIndex ? '✓ MashaAllah! ' : 'Keep practicing: '}
                    {currentQ.explanationEn}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (quizStepIdx + 1 < totalQ) {
                        setQuizStepIdx((s) => s + 1);
                        setQuizAnswerIdx(null);
                      } else {
                        const finalScore = evaluateQaidaMasteryResult({
                          correctCount: quizCorrectCount,
                          totalQuestions: totalQ,
                        });
                        setQuizFinished(true);
                        if (finalScore.passed) {
                          handleCompleteLesson(finalScore.scorePercent);
                        }
                      }
                    }}
                    className="w-full min-h-[48px] py-3 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition"
                  >
                    <span>
                      {quizStepIdx + 1 < totalQ ? 'Next Question →' : 'See Mastery Result ★'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          );
        })()}
      </motion.div>
    </div>
  );
};
