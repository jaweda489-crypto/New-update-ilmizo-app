import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  Compass,
  Download,
  Heart,
  Home,
  Loader2,
  Lock,
  Mic,
  MoreHorizontal,
  Pause,
  Play,
  Printer,
  RefreshCw,
  Repeat,
  Share2,
  ShieldCheck,
  Sparkles,
  Square,
  Star,
  Trash2,
  Trophy,
  Users,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useIlmizo, useTranslation } from '../../context/IlmizoContext';
import { ALL_114_SURAHS, BUNDLED_SURAH_AYAHS, getSurahPayload } from '../../data/quranData';
import {
  canMarkKidsSurahCompleted,
  JUZ_AMMA_37_SURAHS,
  KIDS_BADGES_CATALOG,
  KIDS_STORIES,
  QUIZ_PACKS,
  SALAH_STEPS,
  VERIFIED_DUAS,
} from '../../data/islamicContent';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useQuranAudioSync } from '../../hooks/useQuranAudioSync';
import { SelectSheetField } from '../sheets/SelectSheet';
import {
  CharacterAvatar,
  Kids3DMetallicBadge,
  MobileStatusBar,
  ScreenBackButton,
  SyncStatusBadge,
} from '../pwa/PWAComponents';
import { KIDS_ROUTE_ORDER, useSwipeNavigation } from '../../hooks/useSwipeNavigation';
import {
  aggregateKidsProgressByPeriod,
  assessVoiceActivityMetrics,
  getChildCertificateAchievements,
  normalizeSurahCertificateTitle,
  scoreKidsArabicRecitationMatch,
  supportsArabicSpeechRecognition,
  VoiceActivityAssessment,
} from '../../engines/kidsLearningEngines';
import { audioManager, useAudioManager } from '../../services/audioManager';
import { AyahItem } from '../../types/ilmizo';
import { InteractiveTajweedAyahView } from '../adult/Phase7To11Widgets';
import {
  playHumanDuaAudio,
  resolveDuaHumanAudio,
} from '../../services/humanDuaAndQaidaAudio';
import { NooraniQaidaCourseView } from './NooraniQaidaCourseView';
import { DailyTarbiyahPlanCard } from './DailyTarbiyahPlanCard';
import { QuranGardenView } from './QuranGardenView';
import { SleepTimerSheet, SleepTimerTriggerButton } from '../shared/SleepTimerSheet';
import { FamilyPlusPaywallModal } from '../shared/FamilyPlusPaywallModal';
import { CelebrationBurst } from '../shared/CelebrationBurst';
import { LivingMascot, inferAmbientMascotState } from '../shared/LivingMascot';
import {
  getSpeechLangForUiLanguage,
  getStoryCoverArtwork,
  playStoryQuranVerse,
  splitStoryPageIntoSentences,
  STORY_QURAN_VERSES_MAP,
  TOP_FEATURED_STORY_IDS,
} from '../../services/storyArtworkAndAudio';
import { buildInteractiveStorybook } from '../../services/interactiveStorybookEngine';
import { buildDailyTarbiyahPlan } from '../../services/dailyTarbiyahPlanEngine';
import {
  ALL_STORIES_PACK_COUNT,
  canAccessStoryIndex,
  canCacheSingleStoryOffline,
  canDownloadFullStoryLibraryAudioPack,
  canDownloadTopStoriesAudioPack,
  canRecordFamilyStoryVoice,
  canUseAiTajweedCheck,
  isFamilyPlusActive,
  recordAiTajweedUsagePatch,
  TOP_STORIES_PACK_COUNT,
} from '../../services/subscriptionEngine';
import {
  deleteStoryVoiceRecording,
  getStoryVoiceRecording,
  isVoiceRecorderSupported,
  pickSupportedAudioMimeType,
  saveStoryVoiceRecording,
} from '../../services/storyVoiceRecorder';
import { playGentleCelebrationChime } from '../../services/celebrationEffects';
import {
  AiTajweedFeedbackResult,
  StudioVoiceStyle,
  analyzeRecitationWithAiTajweed,
} from '../../services/studioAudioAndTajweedService';
import {
  clearAllCachedStoryAudio,
  formatAudioCacheSizeMb,
  getStoryLibraryCacheSummary,
  resolveStoryPageHumanAudio,
  scheduleStarterStoriesWarmup,
  scheduleStoryReaderLookahead,
  StoryLibraryCacheSummary,
  StoryPrefetchProgressState,
  storyAudioPrefetchManager,
} from '../../services/storyAudioPrefetchService';
import { getLocalDateKeyWithOffset } from '../../engines/adultLearningEngines';

export { normalizeSurahCertificateTitle, getChildCertificateAchievements };

const KIDS_SURAH_OPTIONS = [
  ...JUZ_AMMA_37_SURAHS.slice()
    .reverse()
    .map((s) => ({
      number: s.surahNumber,
      title: `${s.surahNumber}. Surah ${s.meta.nameTranslit} (${s.meta.ayahCount} Ayahs)`,
    })),
];

export const KidsWorldView: React.FC = () => {
  const {
    kidsRoute,
    setKidsRoute,
    setMode,
    activeChild,
    childrenProfiles,
    setActiveChildId,
    completeKidsQuestStep,
    completeKidsStory,
    addNeedsPracticeItem,
    resolveNeedsPracticeItem,
    submitKidsGoodDeed,
    recordQuizAttempt,
    learningEvents,
    isAudioMuted,
    toggleAudioMute,
    registerSubScreenBackHandler,
    isKidsScreenTimeLocked,
    unlockKidsScreenTime,
    unlockKidsScreenTimeAsync,
    redeemParentTimeVoucherAsync,
    resetParentPinWithRecoveryCode,
    resetParentPinWithRecoveryCodeAsync,
    user,
    updateUser,
    resolvedTheme,
  } = useIlmizo();

  const audioState = useAudioManager();
  const { t, resolveText, isRTL } = useTranslation();

  const {
    feedback: kidsSwipeFeedback,
    swipeHandlers: kidsSwipeHandlers,
  } = useSwipeNavigation({
    routes: KIDS_ROUTE_ORDER,
    activeRoute: kidsRoute,
    onSelectRoute: setKidsRoute,
    isRTL,
  });

  const [kidsToast, setKidsToast] = useState<string | null>(null);
  const showKidsToast = (msg: string) => {
    setKidsToast(msg);
    window.setTimeout(() => {
      setKidsToast((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  // Parent Screen-Time Lock Screen state
  const [lockPinDigits, setLockPinDigits] = useState<string>('');
  const [lockUnlockAction, setLockUnlockAction] = useState<'grant_10m' | 'grant_15m' | 'unlock_today'>('grant_10m');
  const [lockErrorMsg, setLockErrorMsg] = useState<string | null>(null);
  const [showLockRecovery, setShowLockRecovery] = useState(false);
  const [lockRecoveryCodeInput, setLockRecoveryCodeInput] = useState('');
  const [lockRecoveryNewPin, setLockRecoveryNewPin] = useState('');
  const [lockRecoveryMsg, setLockRecoveryMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [showLockVoucher, setShowLockVoucher] = useState(false);
  const [lockVoucherInput, setLockVoucherInput] = useState('');
  const [lockVoucherMsg, setLockVoucherMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Screen 3: Quran Learning state (Learn -> Practice -> Demonstrate -> Review -> Next Step)
  const [kidsSurahNum, setKidsSurahNum] = useState<number>(112); // Surah Al-Ikhlas default
  const [kidsAyahIdx, setKidsAyahIdx] = useState<number>(0);
  const [quranModeTab, setQuranModeTab] = useState<'Learn' | 'Practice' | 'Recite' | 'Meaning'>(
    'Learn'
  );
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 0.75>(1);
  const [wordPracticeAnswered, setWordPracticeAnswered] = useState<'correct' | 'wrong' | null>(
    null
  );
  const prefersReducedMotion = useReducedMotion();
  const isPlayingKidsAudio =
    audioState.status === 'playing' || audioState.status === 'loading';

  // Screen 4: Recitation Practice state (Web Audio AnalyserNode RMS + MediaRecorder + optional Web Speech Arabic recognition)
  const [isRecordingMic, setIsRecordingMic] = useState(false);
  const [micDone, setMicDone] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recognizedArabic, setRecognizedArabic] = useState<string>('');
  const [speechMatchScore, setSpeechMatchScore] = useState<number | null>(null);
  const [voiceBands, setVoiceBands] = useState<number[]>([
    8, 16, 24, 14, 28, 20, 12, 26, 18, 10, 22, 14, 8,
  ]);
  const [voiceAssessment, setVoiceAssessment] = useState<VoiceActivityAssessment | null>(null);
  const [micPermissionError, setMicPermissionError] = useState<string | null>(null);
  const [recitationSelfRating, setRecitationSelfRating] = useState<'clear' | 'practice' | null>(
    null
  );
  const [ayaanTapCheer, setAyaanTapCheer] = useState<string | null>(null);
  const hasSpeechRecognition = React.useMemo(() => supportsArabicSpeechRecognition(), []);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const speechRecRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const rmsSamplesRef = useRef<number[]>([]);
  const recordingStartRef = useRef<number>(0);
  const recordedAudioBlobRef = useRef<Blob | null>(null);
  const [hasRecordedBlob, setHasRecordedBlob] = useState(false);
  const [aiTajweedLoading, setAiTajweedLoading] = useState(false);
  const [aiTajweedError, setAiTajweedError] = useState<string | null>(null);
  const [aiTajweedResult, setAiTajweedResult] = useState<AiTajweedFeedbackResult | null>(null);

  // Screen 5: Duas Learning state
  const [kidsDuaIdx, setKidsDuaIdx] = useState(0);
  const [duaPracticeMode, setDuaPracticeMode] = useState<'card' | 'quiz' | 'use_it'>('card');
  const [duaQuizPicked, setDuaQuizPicked] = useState<number | null>(null);

  // Screen 6: Salah Learning state
  const [salahStepIdx, setSalahStepIdx] = useState(0);
  const [salahQuizPicked, setSalahQuizPicked] = useState<number | null>(null);

  // Screen 7: Stories state
  const [storyCat, setStoryCat] = useState<
    'Featured' | 'All' | 'Prophets' | 'Companions' | 'Akhlaq'
  >('All');
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [storyPageIdx, setStoryPageIdx] = useState(0);
  const [storyMoralChecked, setStoryMoralChecked] = useState(false);
  const [storyChoicePicked, setStoryChoicePicked] = useState<number | null>(null);
  const [storySpeed, setStorySpeed] = useState<0.85 | 1>(0.85);
  const [storyActiveSentenceIdx, setStoryActiveSentenceIdx] = useState<number | null>(null);
  const [storyQuizPicked, setStoryQuizPicked] = useState<number | null>(null);
  const [storyVoiceMode, setStoryVoiceMode] = useState<'studio' | 'device'>('studio');
  const [storyVoicePersona, setStoryVoicePersona] = useState<StudioVoiceStyle>('storyteller');
  const [loadingStudioStoryAudio, setLoadingStudioStoryAudio] = useState(false);
  const [studioOfflineNotice, setStudioOfflineNotice] = useState<{
    storyId: string;
    pageIndex: number;
    message: string;
    isOfflineUncached: boolean;
  } | null>(null);
  const [storyLibrarySummary, setStoryLibrarySummary] = useState<StoryLibraryCacheSummary>({
    totalStories: KIDS_STORIES.length,
    totalPages: KIDS_STORIES.reduce(
      (sum, s) => sum + (s.localizedPages?.[user.language]?.length ?? s.pages.length),
      0
    ),
    cachedStoriesCount: 0,
    partiallyCachedStoriesCount: 0,
    cachedPagesCount: 0,
    totalBytes: 0,
    storyStatusMap: {},
  });
  const [prefetchState, setPrefetchState] = useState<StoryPrefetchProgressState>(() =>
    storyAudioPrefetchManager.getState()
  );
  const studioStoryBlobUrlRef = useRef<string | null>(null);
  const [storyCelebration, setStoryCelebration] = useState<{
    visible: boolean;
    title: string;
    subtitle: string;
  }>({ visible: false, title: '', subtitle: '' });
  const storyNarrationTokenRef = useRef<number>(0);
  const [customStoryVoiceUrl, setCustomStoryVoiceUrl] = useState<string | null>(null);
  const [customStoryVoiceDuration, setCustomStoryVoiceDuration] = useState<number>(0);
  const [isRecordingStoryVoice, setIsRecordingStoryVoice] = useState<boolean>(false);
  const storyVoiceRecorderRef = useRef<MediaRecorder | null>(null);
  const storyVoiceStreamRef = useRef<MediaStream | null>(null);
  const storyVoiceChunksRef = useRef<Blob[]>([]);
  const storyVoiceStartRef = useRef<number>(0);
  const customStoryVoiceUrlRef = useRef<string | null>(null);

  const refreshStoryLibrarySummary = React.useCallback(() => {
    void getStoryLibraryCacheSummary({
      stories: KIDS_STORIES,
      language: user.language,
      voiceStyle: storyVoicePersona,
    }).then((summary) => {
      setStoryLibrarySummary(summary);
    });
  }, [user.language, storyVoicePersona]);

  useEffect(() => {
    const unsubscribe = storyAudioPrefetchManager.subscribe((nextState) => {
      setPrefetchState(nextState);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    refreshStoryLibrarySummary();
  }, [
    refreshStoryLibrarySummary,
    prefetchState.completedTasks,
    prefetchState.status,
    activeStoryId,
    storyPageIdx,
  ]);

  useEffect(() => {
    setStudioOfflineNotice(null);
  }, [activeStoryId, storyPageIdx, storyVoiceMode, storyVoicePersona]);

  useEffect(() => {
    if (kidsRoute !== 'stories') return;
    if (!activeStoryId) {
      const featuredFirst = [
        ...TOP_FEATURED_STORY_IDS.map((id) => KIDS_STORIES.find((s) => s.id === id)).filter(
          (s): s is (typeof KIDS_STORIES)[number] => Boolean(s)
        ),
        ...KIDS_STORIES.filter((s) => !TOP_FEATURED_STORY_IDS.includes(s.id)),
      ];
      return scheduleStarterStoriesWarmup({
        stories: featuredFirst,
        language: user.language,
        voiceStyle: storyVoicePersona,
        count: 10,
        onCachedUpdated: refreshStoryLibrarySummary,
      });
    }
    return scheduleStoryReaderLookahead({
      stories: KIDS_STORIES,
      currentStoryId: activeStoryId,
      currentPageIndex: storyPageIdx,
      language: user.language,
      voiceStyle: storyVoicePersona,
      onCachedUpdated: refreshStoryLibrarySummary,
    });
  }, [
    kidsRoute,
    activeStoryId,
    storyPageIdx,
    user.language,
    storyVoicePersona,
    refreshStoryLibrarySummary,
  ]);

  useEffect(() => {
    return () => {
      storyAudioPrefetchManager.cancelPrefetch();
      if (studioStoryBlobUrlRef.current) {
        try {
          URL.revokeObjectURL(studioStoryBlobUrlRef.current);
        } catch {
          // ignore
        }
        studioStoryBlobUrlRef.current = null;
      }
    };
  }, []);

  const stopActiveStoryVoiceCapture = (discard: boolean) => {
    const rec = storyVoiceRecorderRef.current;
    if (rec && rec.state !== 'inactive') {
      if (discard) {
        rec.onstop = null;
      }
      try {
        rec.stop();
      } catch {
        // Ignore stop error if already inactive
      }
    }
    storyVoiceRecorderRef.current = null;
    if (storyVoiceStreamRef.current) {
      storyVoiceStreamRef.current.getTracks().forEach((tr) => tr.stop());
      storyVoiceStreamRef.current = null;
    }
    setIsRecordingStoryVoice(false);
  };

  useEffect(() => {
    let active = true;
    stopActiveStoryVoiceCapture(true);
    if (customStoryVoiceUrlRef.current) {
      URL.revokeObjectURL(customStoryVoiceUrlRef.current);
      customStoryVoiceUrlRef.current = null;
    }
    setCustomStoryVoiceUrl(null);
    setCustomStoryVoiceDuration(0);

    if (!activeStoryId) return () => {
      active = false;
    };

    void getStoryVoiceRecording(activeStoryId, storyPageIdx).then((rec) => {
      if (!active || !rec?.blob) return;
      const objUrl = URL.createObjectURL(rec.blob);
      customStoryVoiceUrlRef.current = objUrl;
      setCustomStoryVoiceUrl(objUrl);
      setCustomStoryVoiceDuration(rec.durationSec || 1);
    });

    return () => {
      active = false;
      stopActiveStoryVoiceCapture(true);
      if (customStoryVoiceUrlRef.current) {
        URL.revokeObjectURL(customStoryVoiceUrlRef.current);
        customStoryVoiceUrlRef.current = null;
      }
    };
  }, [activeStoryId, storyPageIdx]);

  // Parent-Gated Family Plus Paywall state
  const [kidsPaywallOpen, setKidsPaywallOpen] = useState(false);
  const [kidsPaywallReason, setKidsPaywallReason] = useState<string | undefined>(undefined);
  const openKidsPaywall = (reason: string) => {
    setKidsPaywallReason(reason);
    setKidsPaywallOpen(true);
  };

  // Screen 8: Adventure Map selected island preview
  const [selectedIslandNum, setSelectedIslandNum] = useState<number | null>(null);

  // Screen 9: Daily Quiz state
  const [quizQIdx, setQuizQIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [kidsQuizScore, setKidsQuizScore] = useState(0);

  // Screen 10 & 11: Good Deed & Family Challenge selection
  const [selectedDeedIdx, setSelectedDeedIdx] = useState(0);
  const [selectedFamilyIdx, setSelectedFamilyIdx] = useState(0);

  // Screen 13: Progress state
  const [progressRange, setProgressRange] = useState<'Week' | 'Month' | 'All Time'>('Week');

  // Screen 15 & 16: Badges & Certificate state
  const [badgeTab, setBadgeTab] = useState<'Badges' | 'Certificates'>('Badges');
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
  const [certAchievementIdx, setCertAchievementIdx] = useState(0);
  const [showQuranGarden, setShowQuranGarden] = useState(false);
  const [kidsSleepSheetOpen, setKidsSleepSheetOpen] = useState(false);

  const [dynamicKidsAyahs, setDynamicKidsAyahs] = useState<Record<number, AyahItem[]>>({});
  const [practicedAyahsBySurah, setPracticedAyahsBySurah] = useState<Record<number, number[]>>({});
  const practicedAyahsBySurahRef = useRef<Record<number, number[]>>({});

  React.useEffect(() => {
    if (BUNDLED_SURAH_AYAHS[kidsSurahNum] || dynamicKidsAyahs[kidsSurahNum]) return;
    let active = true;
    getSurahPayload(kidsSurahNum, user.language, user.reciterName)
      .then((payload) => {
        if (active && payload.ayahs.length > 0) {
          setDynamicKidsAyahs((prev) => ({ ...prev, [kidsSurahNum]: payload.ayahs }));
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [kidsSurahNum, user.language, user.reciterName, dynamicKidsAyahs]);

  const kidsSurahAyahs =
    BUNDLED_SURAH_AYAHS[kidsSurahNum] ||
    dynamicKidsAyahs[kidsSurahNum] ||
    BUNDLED_SURAH_AYAHS[112];
  const currentKidsAyah = kidsSurahAyahs[kidsAyahIdx] || kidsSurahAyahs[0];
  const currentSurahMeta =
    ALL_114_SURAHS.find((s) => s.number === kidsSurahNum) || ALL_114_SURAHS[111];

  const stopRecordingPractice = React.useCallback(() => {
    setIsRecordingMic(false);
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (recordingStartRef.current > 0) {
      const durationMs = Date.now() - recordingStartRef.current;
      recordingStartRef.current = 0;
      const assessment = assessVoiceActivityMetrics(rmsSamplesRef.current, durationMs);
      setVoiceAssessment(assessment);
    }
    setVoiceBands([8, 16, 24, 14, 28, 20, 12, 26, 18, 10, 22, 14, 8]);
    if (audioCtxRef.current) {
      try {
        void audioCtxRef.current.close();
      } catch {
        // ignore AudioContext close errors
      }
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore recorder stop errors
      }
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (speechRecRef.current) {
      try {
        speechRecRef.current.stop();
      } catch {
        // ignore speech recognition stop errors
      }
      speechRecRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    const unregister = audioManager.registerExternalCleanup(stopRecordingPractice);
    return () => {
      unregister();
      stopRecordingPractice();
    };
  }, [stopRecordingPractice]);

  React.useEffect(() => {
    if (isKidsScreenTimeLocked) {
      stopRecordingPractice();
      audioManager.stopAll();
    }
  }, [isKidsScreenTimeLocked, stopRecordingPractice]);

  React.useEffect(() => {
    if (kidsRoute !== 'stories' || !activeStoryId) {
      registerSubScreenBackHandler(null);
      return;
    }
    registerSubScreenBackHandler(() => {
      audioManager.stopAll();
      setActiveStoryId(null);
      setStoryMoralChecked(false);
      return true;
    });
    return () => registerSubScreenBackHandler(null);
  }, [kidsRoute, activeStoryId, registerSubScreenBackHandler]);

  const speakArabic = (text: string, audioUrl?: string, trackId?: string, _title?: string) => {
    if (isAudioMuted) {
      showKidsToast('Sound is muted. Tap Sound to unmute.');
      return;
    }
    audioManager.setPlaybackRate(playbackSpeed);
    if (audioUrl) {
      audioManager.playAudioUrl({
        id: trackId || `kids-arabic-${kidsSurahNum}-${kidsAyahIdx}`,
        url: audioUrl,
        fallbackText: text,
        fallbackLang: 'ar-SA',
        rate: playbackSpeed,
      });
      return;
    }

    audioManager.speakText({
      id: trackId || `kids-arabic-tts-${text.slice(0, 16)}`,
      text,
      lang: 'ar-SA',
      rate: playbackSpeed,
    });
  };

  const markKidsAyahPracticed = (ayahNumberInSurah: number) => {
    const prevPracticed = practicedAyahsBySurahRef.current[kidsSurahNum] || [];
    const nextPracticed = prevPracticed.includes(ayahNumberInSurah)
      ? prevPracticed
      : [...prevPracticed, ayahNumberInSurah];
    practicedAyahsBySurahRef.current = {
      ...practicedAyahsBySurahRef.current,
      [kidsSurahNum]: nextPracticed,
    };
    setPracticedAyahsBySurah((prev) => ({
      ...prev,
      [kidsSurahNum]: nextPracticed,
    }));
    const isSurahFullyPracticed = canMarkKidsSurahCompleted({
      surahNumber: kidsSurahNum,
      practicedAyahNumbers: nextPracticed,
    }).eligible;
    completeKidsQuestStep(
      'quran',
      `${currentSurahMeta.nameTranslit} Ayah ${ayahNumberInSurah}`,
      isSurahFullyPracticed ? currentSurahMeta.nameTranslit : undefined
    );
  };

  // Unified Quran audio sync for Kids: auto-advances Ayah, triggers subtle @capacitor/haptics
  // on verse transition, smoothly auto-scrolls, and marks each recited Ayah practiced.
  const {
    isAyahHighlighted: isKidsAyahHighlighted,
    registerAyahElement: registerKidsAyahElement,
  } = useQuranAudioSync({
    surahNumber: kidsSurahNum,
    ayahs: kidsSurahAyahs,
    activeAyahIdx: kidsAyahIdx,
    onAyahIndexChange: setKidsAyahIdx,
    onVerseAdvance: markKidsAyahPracticed,
    enabled: kidsRoute === 'quran_learning',
    enableHaptics: true,
    autoScroll: true,
  });

  const playKidsSurahContinuous = () => {
    if (isAudioMuted) {
      showKidsToast('Sound is muted. Tap Sound to unmute.');
      return;
    }
    audioManager.setPlaybackRate(playbackSpeed);
    markKidsAyahPracticed(currentKidsAyah.numberInSurah);

    void audioManager.playFullSurah({
      surahNumber: kidsSurahNum,
      startFromAyah: currentKidsAyah.numberInSurah,
      reciterName: user.reciterName,
      rate: playbackSpeed,
      repeatOption: 1,
      onAyahChange: (_sNum, nextAyahNum) => {
        const nextIdx = kidsSurahAyahs.findIndex((a) => a.numberInSurah === nextAyahNum);
        if (nextIdx >= 0) {
          setKidsAyahIdx(nextIdx);
        }
      },
      onSequenceComplete: () => {
        showKidsToast(`MashaAllah! Finished ${currentSurahMeta.nameTranslit}`);
      },
      onError: (msg) => showKidsToast(msg),
    });
  };

  const speakEnglishText = (text: string, trackId?: string, _title?: string) => {
    if (isAudioMuted) {
      showKidsToast('Sound is muted. Tap Sound to unmute.');
      return;
    }
    audioManager.speakText({
      id: trackId || `kids-en-${text.slice(0, 20)}`,
      text,
      lang: 'en-US',
      rate: 0.95,
    });
  };

  const handleToggleMicRecording = async () => {
    if (isRecordingMic) {
      setMicDone(true);
      stopRecordingPractice();
      return;
    }

    audioManager.stopAll();
    setRecitationSelfRating(null);
    setRecognizedArabic('');
    setSpeechMatchScore(null);
    setVoiceAssessment(null);
    setMicPermissionError(null);
    setAiTajweedError(null);
    setAiTajweedResult(null);
    recordedAudioBlobRef.current = null;
    setHasRecordedBlob(false);
    if (recordedAudioUrl) {
      try {
        URL.revokeObjectURL(recordedAudioUrl);
      } catch {
        // ignore revoke error
      }
      setRecordedAudioUrl(null);
    }
    rmsSamplesRef.current = [];
    recordingStartRef.current = Date.now();
    setIsRecordingMic(true);
    setMicDone(false);

    // Start Web Speech API Arabic recognition if available in browser
    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionCtor) {
      try {
        const recognition = new SpeechRecognitionCtor();
        recognition.lang = 'ar-SA';
        recognition.interimResults = true;
        recognition.continuous = false;
        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((r: any) => r[0]?.transcript || '')
            .join(' ');
          setRecognizedArabic(transcript);
          const matchResult = scoreKidsArabicRecitationMatch(
            currentKidsAyah.arabicUthmani,
            transcript
          );
          if (matchResult.totalWords > 0 && transcript.trim().length > 0) {
            setSpeechMatchScore(matchResult.percentage);
          }
        };
        recognition.start();
        speechRecRef.current = recognition;
      } catch {
        // Fallback gracefully if SpeechRecognition cannot start
      }
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        // Live Web Audio API RMS metering (cross-platform iOS Safari, Firefox, Chrome, Android WebView)
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          try {
            const audioCtx = new AudioCtx();
            audioCtxRef.current = audioCtx;
            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            analyserRef.current = analyser;

            const timeDomain = new Uint8Array(analyser.fftSize);
            const freqData = new Uint8Array(analyser.frequencyBinCount);
            const tickMeter = () => {
              if (!analyserRef.current) return;
              analyserRef.current.getByteTimeDomainData(timeDomain);
              let sumSq = 0;
              for (let i = 0; i < timeDomain.length; i++) {
                const centered = (timeDomain[i] - 128) / 128;
                sumSq += centered * centered;
              }
              const rms = Math.sqrt(sumSq / timeDomain.length);
              rmsSamplesRef.current.push(rms);

              analyserRef.current.getByteFrequencyData(freqData);
              const step = Math.max(1, Math.floor(freqData.length / 13));
              const nextBands = Array.from({ length: 13 }, (_, idx) => {
                const binVal = freqData[Math.min(freqData.length - 1, idx * step)] || 0;
                return Math.max(6, Math.min(32, Math.round(6 + (binVal / 255) * 26)));
              });
              setVoiceBands(nextBands);
              rafIdRef.current = requestAnimationFrame(tickMeter);
            };
            rafIdRef.current = requestAnimationFrame(tickMeter);
          } catch {
            // AudioContext setup optional if browser restricts Web Audio
          }
        }

        if (typeof MediaRecorder !== 'undefined') {
          const recorder = new MediaRecorder(stream);
          audioChunksRef.current = [];
          recorder.ondataavailable = (ev) => {
            if (ev.data.size > 0) audioChunksRef.current.push(ev.data);
          };
          recorder.onstop = () => {
            const mimeType = recorder.mimeType || 'audio/webm';
            const blob = new Blob(audioChunksRef.current, { type: mimeType });
            if (blob.size > 0) {
              recordedAudioBlobRef.current = blob;
              setHasRecordedBlob(true);
              const url = URL.createObjectURL(blob);
              setRecordedAudioUrl(url);
            }
            stream.getTracks().forEach((track) => track.stop());
          };
          mediaRecorderRef.current = recorder;
          recorder.start();
        }
      } catch {
        setMicPermissionError(
          'Microphone permission was denied or unavailable on this device. Tap "Listen to Qari" to practice along aloud.'
        );
        stopRecordingPractice();
      }
    } else {
      setMicPermissionError(
        'Microphone capture is not supported in this browser context. Tap "Listen to Qari" to practice along aloud.'
      );
      stopRecordingPractice();
    }
  };

  const handleRunKidsAiTajweed = async () => {
    const blob = recordedAudioBlobRef.current;
    if (!blob || blob.size < 256) {
      showKidsToast('Record your recitation with the mic first!');
      return;
    }
    const todayKey = getLocalDateKeyWithOffset(0, new Date());
    const quota = canUseAiTajweedCheck(user, todayKey);
    if (!quota.allowed) {
      openKidsPaywall(
        'You used all 2 Free daily AI Tajweed checks today. Upgrade to Adult Quran Plus (₹99/yr) or Family Plus (₹199/yr) for unlimited Harakat & Makhraj AI feedback!'
      );
      return;
    }
    setAiTajweedLoading(true);
    setAiTajweedError(null);
    const res = await analyzeRecitationWithAiTajweed({
      audioBlob: blob,
      targetArabic: currentKidsAyah.arabicUthmani,
      targetTransliteration: currentKidsAyah.transliteration,
      uiLanguage: user.language,
      mode: 'kids',
    });
    setAiTajweedLoading(false);
    if (res.ok && res.result) {
      updateUser(recordAiTajweedUsagePatch(user, todayKey));
      setAiTajweedResult(res.result);
      if (res.result.overallScore >= 80) {
        playGentleCelebrationChime('star');
      }
    } else {
      setAiTajweedError(res.error || 'AI Tajweed check unavailable.');
    }
  };

  const triggerAyaanInteraction = (phrase: string) => {
    setAyaanTapCheer(phrase);
    speakEnglishText(phrase, 'ayaan-cheer', 'Ayaan Helper');
    window.setTimeout(() => {
      setAyaanTapCheer((prev) => (prev === phrase ? null : prev));
    }, 2400);
  };

  const handleSwitchKidsSurah = (nextSurahNum: number) => {
    audioManager.stopAll();
    setKidsSurahNum(nextSurahNum);
    setKidsAyahIdx(0);
    setWordPracticeAnswered(null);
    setAiTajweedResult(null);
    setAiTajweedError(null);
    recordedAudioBlobRef.current = null;
    setHasRecordedBlob(false);
  };

  const handleDownloadCertificateSvg = (achievementTitle: string) => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560" viewBox="0 0 800 560">
      <rect width="800" height="560" rx="32" fill="#FFFDF7" stroke="#D4AF37" stroke-width="14"/>
      <rect x="28" y="28" width="744" height="504" rx="20" fill="none" stroke="#14532D" stroke-width="3" stroke-dasharray="8 6"/>
      <text x="400" y="95" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="800" fill="#14532D">iLMiZO KIDS</text>
      <text x="400" y="145" text-anchor="middle" font-family="serif" font-size="34" font-weight="bold" fill="#0F3826">Certificate of Achievement</text>
      <text x="400" y="195" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#64748B">This is to celebrate that</text>
      <text x="400" y="255" text-anchor="middle" font-family="sans-serif" font-size="44" font-weight="800" fill="#14532D">${activeChild.name}</text>
      <text x="400" y="300" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#64748B">has completed</text>
      <text x="400" y="350" text-anchor="middle" font-family="sans-serif" font-size="30" font-weight="800" fill="#0F172A">${achievementTitle}</text>
      <text x="400" y="405" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#475569">With effort, sincerity and love for Allah. May Allah increase you in knowledge and Iman.</text>
      <text x="400" y="475" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#B45309">Stars Earned: ${activeChild.stars} ★ · Verified Ilmizo Seal · ${new Date().toLocaleDateString()}</text>
    </svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ilmizo-certificate-${activeChild.name.toLowerCase()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    showKidsToast(`Downloaded ${activeChild.name}'s Certificate!`);
  };

  const completedStepsCount = Object.values(activeChild.questStepsCompleted).filter(Boolean).length;
  const unresolvedPracticeItems = activeChild.needsPractice.filter((np) => !np.resolved);

  const getNextIncompleteQuestRoute = () => {
    if (!activeChild.questStepsCompleted.quran) return 'quran_learning' as const;
    if (!activeChild.questStepsCompleted.dua) return 'duas_learning' as const;
    if (!activeChild.questStepsCompleted.quiz) return 'daily_quiz' as const;
    if (!activeChild.questStepsCompleted.salah) return 'salah_learning' as const;
    if (!activeChild.questStepsCompleted.family) return 'family_challenge' as const;
    return 'mission_complete' as const;
  };

  const renderKidsScreen = () => {
    switch (kidsRoute) {
      case 'kids_home':
        return (
          <div className="pb-20 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 1: Full-bleed 3D Garden Hero Banner with Ayaan on Right matching Reference */}
            <div className="relative overflow-hidden rounded-b-[32px] bg-[#0F3826] text-white shadow-lg h-56">
              <img
                src="/assets/illustrations/kids_home_banner.webp"
                alt="Ayaan in Islamic Garden"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A2E1D]/90 via-[#0F3826]/45 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/50 to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-between pb-6">
                <MobileStatusBar light />

                <div className="px-4 flex items-start justify-between">
                  <div className="max-w-[70%] space-y-1">
                    <div className="flex items-center gap-2.5">
                      <LivingMascot
                        character={activeChild.avatar}
                        state={
                          completedStepsCount >= 5
                            ? 'celebrating'
                            : inferAmbientMascotState()
                        }
                        size="sm"
                      />
                      <div>
                        <p className="text-[11px] font-extrabold text-amber-200 drop-shadow-xs">
                          {t('greeting')},
                        </p>
                        <h1 className="text-2xl font-extrabold tracking-tight leading-none drop-shadow-sm">
                          {activeChild.name}!
                        </h1>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-white/95 pt-1 drop-shadow-xs">
                      {t('ready_for_adventure')}
                    </p>

                    {childrenProfiles.length > 1 && (
                      <div className="flex items-center gap-1 pt-1 flex-wrap">
                        {childrenProfiles.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setActiveChildId(c.id)}
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold transition ${
                              c.id === activeChild.id
                                ? 'bg-amber-400 text-emerald-950 shadow-2xs'
                                : 'bg-black/40 text-white'
                            }`}
                          >
                            {c.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Top-Right Controls: Star Counter + Adult/Parent Switch */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setKidsRoute('badges')}
                      aria-label={`${activeChild.stars} Stars earned`}
                      className="min-h-[40px] px-3 py-1 rounded-2xl bg-black/45 border border-amber-300/60 backdrop-blur-xs flex items-center gap-1 text-amber-300 text-xs font-extrabold tabular-nums active:scale-95 transition"
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{activeChild.stars}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('parent')}
                      aria-label="Open Parent Hub"
                      title="Parent Hub"
                      className="min-w-[40px] min-h-[40px] rounded-2xl bg-black/45 border border-white/25 backdrop-blur-xs flex items-center justify-center text-white hover:bg-black/60 active:scale-95 transition"
                    >
                      <Lock className="w-4 h-4 text-amber-200" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('adult')}
                      aria-label="Switch to Adult Mode"
                      title="Switch to Adult Mode"
                      className="min-h-[40px] px-2.5 rounded-2xl bg-black/45 border border-white/25 backdrop-blur-xs text-[11px] font-extrabold text-emerald-100 hover:bg-black/60 active:scale-95 transition"
                    >
                      Adult
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 -mt-5 relative z-20 space-y-4">
              {/* Primary Single-Focus Hero: Adaptive Daily 10-Minute Tarbiyah Plan */}
              <DailyTarbiyahPlanCard
                plan={buildDailyTarbiyahPlan({
                  child: activeChild,
                  language: user.language,
                  dateKey: getLocalDateKeyWithOffset(0, new Date()),
                  hasFamilyPlus: isFamilyPlusActive(user),
                })}
                onLaunchStep={(step) => {
                  if (step.targetRoute === 'stories' && step.recommendedItemId) {
                    setActiveStoryId(step.recommendedItemId);
                    setStoryPageIdx(0);
                    setStoryChoicePicked(null);
                    setStoryQuizPicked(null);
                    setStoryMoralChecked(false);
                  }
                  setKidsRoute(step.targetRoute);
                }}
              />

              {/* Visual Interactive Quran Garden Entry & Expandable Garden Dome */}
              {showQuranGarden ? (
                <QuranGardenView
                  child={activeChild}
                  completedStoryCount={activeChild.completedStoryIds?.length || 0}
                  practicedSurahCount={Object.keys(practicedAyahsBySurah).length}
                  qaidaCompletedCount={activeChild.completedQaidaLessonIds?.length || 0}
                  onClose={() => setShowQuranGarden(false)}
                  onOpenQuran={() => {
                    setShowQuranGarden(false);
                    setKidsRoute('quran_learning');
                  }}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowQuranGarden(true)}
                  className="w-full min-h-[68px] rounded-3xl bg-gradient-to-r from-[#14532D] to-[#1E6B3A] text-white p-4 shadow-xs flex items-center justify-between gap-3 text-left active:scale-[0.99] transition"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-amber-300">Interactive Visual Garden</p>
                    <p className="text-sm font-extrabold truncate">
                      Visit {activeChild.name}’s Quran Garden
                    </p>
                    <p className="text-xs text-emerald-100/85 truncate">
                      {activeChild.stars} Jannah Stars growing trees, flowers & golden lanterns
                    </p>
                  </div>
                  <span className="min-h-[40px] px-3.5 rounded-2xl bg-amber-400 text-emerald-950 text-xs font-extrabold flex items-center shrink-0">
                    Open Garden
                  </span>
                </button>
              )}

              {/* Compact Calm Companion Strip (Quest Progress + Practice/Good Deed) */}
              <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 shadow-2xs flex items-center justify-between gap-3">
                <LivingMascot
                  character="Mizo"
                  state={unresolvedPracticeItems.length > 0 ? 'encouraging' : 'happy'}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
                    {t('todays_mission')}: {completedStepsCount}/5 Done
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)] truncate">
                    {unresolvedPracticeItems.length > 0
                      ? `${unresolvedPracticeItems.length} gentle review item(s) waiting`
                      : 'Tap to open Today’s Quest or log a Good Deed'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setKidsRoute(
                      unresolvedPracticeItems.length > 0 ? 'needs_practice' : 'todays_quest'
                    )
                  }
                  className="min-h-[44px] px-3.5 rounded-xl bg-[#14532D] dark:bg-emerald-600 text-white text-xs font-extrabold shrink-0"
                >
                  {unresolvedPracticeItems.length > 0 ? 'Review' : 'Quest'}
                </button>
              </div>

              {/* Learn & Explore 2x2 Illustrated Grid matching Screen 1 */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-sm font-extrabold text-[var(--text-primary)]">
                    {t('learn_and_explore')}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setKidsRoute('adventure_map')}
                    className="text-xs font-bold text-[#14532D] dark:text-emerald-300"
                  >
                    See All
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    {
                      title: t('quran'),
                      sub: 'Learn & Recite',
                      route: 'quran_learning' as const,
                      img: '/assets/illustrations/tile_kids_quran.webp',
                    },
                    {
                      title: t('duas'),
                      sub: 'Daily Duas',
                      route: 'duas_learning' as const,
                      img: '/assets/illustrations/tile_kids_duas.webp',
                    },
                    {
                      title: t('salah'),
                      sub: 'Learn & Practice',
                      route: 'salah_learning' as const,
                      img: '/assets/illustrations/tile_kids_salah.webp',
                    },
                    {
                      title: t('stories'),
                      sub: 'Islamic Stories',
                      route: 'stories' as const,
                      img: '/assets/illustrations/tile_kids_stories.webp',
                    },
                  ].map((card) => (
                    <button
                      key={card.route}
                      type="button"
                      onClick={() => setKidsRoute(card.route)}
                      className="relative overflow-hidden rounded-2xl h-28 text-left shadow-sm border border-emerald-950/10 group"
                    >
                      <img
                        src={card.img}
                        alt={card.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                      <div className="relative z-10 h-full p-3 flex flex-col justify-end text-white">
                        <h3 className="text-sm font-extrabold leading-tight">{card.title}</h3>
                        <p className="text-[11px] text-emerald-100">{card.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Direct Spotlight Banner for Full 17-Lesson Noorani Qaida Course + Family Plus */}
                <div className="mt-3 rounded-2xl bg-gradient-to-r from-[#0F3826] to-[#14532D] text-white p-3.5 flex items-center justify-between gap-3 shadow-sm border border-[#D4AF37]/50">
                  <div className="min-w-0">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 tabular-nums">
                      {(activeChild.completedQaidaLessonIds || []).length}/17 Lessons · Interactive Joiner
                    </p>
                    <h3 className="text-xs font-extrabold mt-0.5 truncate">
                      Complete Noorani Qaida Course
                    </h3>
                    <p className="text-[11px] text-emerald-100/85 truncate">
                      Alphabet · Harakat · Joining · Madd & Certificate
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setKidsRoute('quran_learning')}
                      className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold min-h-[38px] transition"
                    >
                      Open Qaida
                    </button>
                    {!isFamilyPlusActive(user) && (
                      <button
                        type="button"
                        onClick={() =>
                          openKidsPaywall(
                            'Start your 7-Day Free Family Trial (then ₹199/yr · ~₹16/mo) to unlock all 17 Noorani Qaida lessons with Tracing, 49 multi-scene storybooks, and 5 child profiles!'
                          )
                        }
                        className="px-2.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-amber-200 text-[11px] font-bold min-h-[38px]"
                      >
                        Plus
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'todays_quest':
        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 2: Today's Quest 10-Minute Mission matching Reference */}
            <div className="relative overflow-hidden rounded-b-[32px] bg-[#0F3826] text-white shadow-lg">
              <MobileStatusBar time="9:41" light />
              <div className="flex items-center justify-between px-4 pt-1 pb-2 relative z-10">
                <ScreenBackButton variant="light" label="Back" />
                <div className="text-center">
                  <h1 className="text-base font-extrabold">Today’s Quest</h1>
                  <p className="text-xs text-amber-300 font-bold">10-Minute Mission</p>
                </div>
                <div className="w-11 h-11 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 text-xs font-extrabold tabular-nums">
                  {completedStepsCount}/5
                </div>
              </div>

              {/* 3D Illustration of Ayaan with Open Glowing Quran */}
              <div className="relative h-44 w-full">
                <img
                  src="/assets/illustrations/kids_quest_ayaan.webp"
                  alt="Ayaan Today's Quest"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3826] via-transparent to-transparent" />
                <p className="absolute bottom-2.5 inset-x-4 text-center text-xs font-bold text-white drop-shadow-xs">
                  Let’s complete 5 activities today and grow closer to Allah!
                </p>
              </div>
            </div>

            <div className="px-4 pt-3.5 space-y-2.5">
              {[
                {
                  key: 'quran' as const,
                  title: 'Quran',
                  sub: 'Read or listen',
                  time: '3 min',
                  route: 'quran_learning' as const,
                  tint: 'bg-emerald-100 text-emerald-800',
                },
                {
                  key: 'dua' as const,
                  title: 'Dua',
                  sub: 'Learn a new dua',
                  time: '2 min',
                  route: 'duas_learning' as const,
                  tint: 'bg-amber-100 text-amber-800',
                },
                {
                  key: 'quiz' as const,
                  title: 'Quiz',
                  sub: 'Answer a few questions',
                  time: '2 min',
                  route: 'daily_quiz' as const,
                  tint: 'bg-rose-100 text-rose-800',
                },
                {
                  key: 'salah' as const,
                  title: 'Salah',
                  sub: 'Learn a simple step',
                  time: '2 min',
                  route: 'salah_learning' as const,
                  tint: 'bg-purple-100 text-purple-800',
                },
                {
                  key: 'family' as const,
                  title: 'Family Challenge',
                  sub: 'Do a good deed',
                  time: '1 min',
                  route: 'family_challenge' as const,
                  tint: 'bg-orange-100 text-orange-800',
                },
              ].map((step) => {
                const done = activeChild.questStepsCompleted[step.key];
                return (
                  <button
                    key={step.key}
                    type="button"
                    onClick={() => setKidsRoute(step.route)}
                    className="w-full rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div
                        className={`w-10 h-10 rounded-xl ${step.tint} flex items-center justify-center font-extrabold text-xs`}
                      >
                        {step.title[0]}
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-[var(--text-primary)]">{step.title}</p>
                        <p className="text-[11px] text-[var(--text-secondary)]">{step.sub}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-[var(--text-muted)] tabular-nums">
                        {step.time}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          done ? 'bg-[#22C55E] text-white' : 'border-2 border-[var(--border-strong)]'
                        }`}
                      >
                        {done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setKidsRoute(getNextIncompleteQuestRoute())}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md mt-2"
              >
                {completedStepsCount === 5
                  ? 'View Mission Complete! ★'
                  : `Continue Mission (${5 - completedStepsCount} left)`}
              </button>
            </div>
          </div>
        );

      case 'quran_learning': {
        const arabicWords = currentKidsAyah.arabicUthmani.split(' ');
        const targetWord = arabicWords[arabicWords.length - 1] || arabicWords[0];
        const distractorWord = 'ٱلْعَـٰلَمِينَ';

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 3: Kids Quran Learning matching Reference */}
            <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-3.5 shadow-md">
              <MobileStatusBar time="9:41" light />
              <div className="flex items-center justify-between px-4 pt-1">
                <ScreenBackButton variant="light" label="Back" />
                <div className="flex flex-col items-center">
                  <SelectSheetField
                    value={String(kidsSurahNum)}
                    onChange={(val) => handleSwitchKidsSurah(Number(val))}
                    title="Choose a Surah"
                    subtitle="Juz Amma Surahs for kids learning"
                    ariaLabel="Select Kids Surah"
                    variant="dark-pill"
                    searchable
                    searchPlaceholder="Search Juz Amma Surah…"
                    className="max-w-[200px]"
                    options={KIDS_SURAH_OPTIONS.map((opt) => ({
                      value: String(opt.number),
                      label: opt.title,
                    }))}
                  />
                  <p className="text-[11px] text-amber-300 font-bold tabular-nums mt-1">
                    {kidsAyahIdx + 1} of {kidsSurahAyahs.length} Ayahs
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* Global Mute Toggle */}
                  <button
                    type="button"
                    onClick={toggleAudioMute}
                    aria-pressed={!isAudioMuted}
                    className={`px-2.5 min-h-[38px] rounded-full flex items-center gap-1 text-[11px] font-extrabold border transition ${
                      !isAudioMuted
                        ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-2xs'
                        : 'bg-rose-500/80 text-white border-rose-300/60'
                    }`}
                  >
                    {!isAudioMuted ? (
                      <Volume2 className="w-3.5 h-3.5" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5" />
                    )}
                    <span>{!isAudioMuted ? 'Sound' : 'Muted'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setKidsRoute('recitation_practice')}
                    className="w-9 h-9 rounded-full bg-white/15 text-amber-300 flex items-center justify-center"
                    title="Recite with Mic"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 pt-3 space-y-3">
              {/* Ornate Cream Mushaf Arch Card matching Screen 3 */}
              <div
                ref={registerKidsAyahElement(currentKidsAyah.numberInSurah)}
                data-kids-ayah={currentKidsAyah.numberInSurah}
                className={`rounded-3xl bg-[#FFFDF7] dark:bg-[var(--bg-surface)] border border-[#D4AF37]/50 dark:border-amber-500/35 p-4 text-center shadow-md space-y-3.5 relative overflow-hidden transition-all duration-300 ${
                  isKidsAyahHighlighted(currentKidsAyah.numberInSurah) ? 'ilmizo-ayah-playing' : ''
                }`}
              >
                {/* Golden Floral Archway Header with Interactive Color-Coded Tajweed & Word-by-Word Tooltip */}
                <div className="relative rounded-t-2xl bg-gradient-to-b from-[#FDE68A]/50 via-[#FEF3C7]/30 to-transparent dark:from-amber-500/15 dark:via-amber-500/5 dark:to-transparent border-t-2 border-x-2 border-[#D4AF37]/70 dark:border-amber-500/35 pt-3 pb-2 px-3">
                  <div className="flex items-center justify-center gap-2 text-amber-700/80 dark:text-amber-300/80 text-xs font-bold mb-1">
                    <span>❁</span>
                    <span>
                      {isKidsAyahHighlighted(currentKidsAyah.numberInSurah)
                        ? `Reciting Ayah ${currentKidsAyah.numberInSurah}`
                        : '─── ❖ ───'}
                    </span>
                    <span>❁</span>
                  </div>
                  <InteractiveTajweedAyahView
                    ayah={currentKidsAyah}
                    surahNumber={kidsSurahNum}
                    fontScaleClass="text-3xl sm:text-4xl"
                    darkMode={resolvedTheme === 'dark'}
                    onPlayAyahAudio={() => playKidsSurahContinuous()}
                  />
                </div>

                <p className="text-sm font-extrabold text-[var(--text-primary)]">
                  {currentKidsAyah.transliteration}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {resolveText(currentKidsAyah.translations, currentKidsAyah.translations.en)}
                </p>

                {/* Audio Controls Row: 1x | Play/Pause (Auto-Advance Surah) | Stop | Repeat Ayah */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const nextSpeed = playbackSpeed === 1 ? 0.75 : 1;
                      setPlaybackSpeed(nextSpeed);
                      audioManager.setPlaybackRate(nextSpeed);
                    }}
                    className="w-11 h-11 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-extrabold text-xs tabular-nums shadow-2xs"
                  >
                    {playbackSpeed}x
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (isPlayingKidsAudio) {
                        audioManager.pause();
                        return;
                      }
                      if (audioState.status === 'paused') {
                        audioManager.resume();
                        return;
                      }
                      playKidsSurahContinuous();
                    }}
                    aria-label={isPlayingKidsAudio ? 'Pause Surah Recitation' : 'Play Surah'}
                    className="w-14 h-14 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-100 dark:ring-emerald-900/50 active:scale-95 transition"
                  >
                    {isPlayingKidsAudio ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    )}
                  </button>
                  {(isPlayingKidsAudio || audioState.status === 'paused') && (
                    <button
                      type="button"
                      onClick={() => audioManager.stopAll()}
                      aria-label="Stop Audio"
                      className="w-11 h-11 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-700/40 text-rose-700 dark:text-rose-300 flex items-center justify-center shadow-2xs"
                    >
                      <Square className="w-4 h-4 fill-current" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (isAudioMuted) {
                        showKidsToast('Sound is muted. Tap Sound to unmute.');
                        return;
                      }
                      void audioManager.playQariRecitationAyah({
                        id: `kids-quran-repeat-${kidsSurahNum}-${currentKidsAyah.numberInSurah}`,
                        surahNumber: kidsSurahNum,
                        ayahNumberInSurah: currentKidsAyah.numberInSurah,
                        globalAyahNumber: currentKidsAyah.globalNumber,
                        reciterName: user.reciterName,
                        rate: playbackSpeed,
                        repeat: true,
                        repeatOption: 'infinite',
                        onError: (msg) => showKidsToast(msg),
                      });
                      showKidsToast(`Repeating Ayah ${currentKidsAyah.numberInSurah}`);
                    }}
                    aria-label="Repeat Current Ayah"
                    title="Repeat Current Ayah"
                    className="w-11 h-11 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] flex items-center justify-center shadow-2xs active:scale-95 transition"
                  >
                    <Repeat className="w-4 h-4" />
                  </button>
                </div>

                {/* 4 Pill Mode Tabs: Learn | Practice | Recite | Meaning */}
                <div className="grid grid-cols-4 gap-1 bg-[var(--bg-subtle)] p-1 rounded-full">
                  {(['Learn', 'Practice', 'Recite', 'Meaning'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setQuranModeTab(m);
                        setWordPracticeAnswered(null);
                        if (m === 'Recite') setKidsRoute('recitation_practice');
                      }}
                      className={`py-1.5 rounded-full text-[11px] font-extrabold transition ${
                        quranModeTab === m
                          ? 'bg-[#14532D] dark:bg-emerald-600 text-white shadow-2xs'
                          : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                {/* Dynamic Content for Learn / Practice / Meaning Stages */}
                {quranModeTab === 'Practice' && (
                  <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-700/40 p-3 text-left space-y-2">
                    <p className="text-xs font-extrabold text-emerald-950 dark:text-emerald-200">
                      Practice Stage: Tap the final Arabic word of this Ayah!
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[targetWord, distractorWord].map((w, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (w === targetWord) {
                              setWordPracticeAnswered('correct');
                              completeKidsQuestStep(
                                'quran',
                                `Practiced ${currentSurahMeta.nameTranslit}`,
                                currentSurahMeta.nameTranslit
                              );
                              showKidsToast('MashaAllah! Correct word!');
                            } else {
                              setWordPracticeAnswered('wrong');
                              addNeedsPracticeItem(
                                'quran',
                                `${currentSurahMeta.nameTranslit} Ayah ${currentKidsAyah.numberInSurah}`,
                                currentKidsAyah.transliteration,
                                'quran_learning'
                              );
                            }
                          }}
                          className="py-2 px-3 rounded-xl bg-[var(--bg-surface)] border border-emerald-300 dark:border-emerald-700/50 font-arabic text-2xl font-bold text-emerald-950 dark:text-emerald-100 text-center"
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                    {wordPracticeAnswered === 'correct' && (
                      <p className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                        ★ Awesome job! Now tap Recite to practice with Ayaan.
                      </p>
                    )}
                    {wordPracticeAnswered === 'wrong' && (
                      <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300">
                        Added to Ayla’s Practice Queue so we can review it together!
                      </p>
                    )}
                  </div>
                )}

                {quranModeTab === 'Meaning' && (
                  <div className="rounded-2xl bg-[#FEF3C7]/90 dark:bg-amber-950/35 border border-amber-300 dark:border-amber-700/40 p-3 flex items-center gap-3 text-left">
                    <CharacterAvatar character="Mizo" size="md" />
                    <div className="space-y-1">
                      <p className="text-xs font-extrabold text-amber-950 dark:text-amber-200">
                        What Allah Teaches Us Here:
                      </p>
                      <p className="text-xs text-amber-900 dark:text-amber-100/90 leading-relaxed">
                        {currentKidsAyah.tafsirBrief}
                      </p>
                    </div>
                  </div>
                )}

                {/* 3D Ayaan Character Cutout with Framer Motion Idle & Tap Interaction matching Screen 3 */}
                <div className="flex items-center gap-2.5 pt-1">
                  <motion.div
                    onClick={() =>
                      triggerAyaanInteraction('MashaAllah! Listen carefully and repeat with me!')
                    }
                    animate={
                      isPlayingKidsAudio
                        ? { y: [0, -7, 0], rotate: [0, 3, -3, 0], scale: [1, 1.06, 1] }
                        : { y: [0, -4, 0], rotate: [0, 1.5, -1.5, 0] }
                    }
                    transition={{
                      duration: isPlayingKidsAudio ? 1.4 : 3.0,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.08, rotate: 4 }}
                    whileTap={{ scale: 0.9, rotate: -8 }}
                    className="relative cursor-pointer shrink-0 -ml-1 select-none"
                    title="Tap Ayaan for encouragement!"
                  >
                    <img
                      src="/assets/illustrations/avatar_ayaan_3d.webp"
                      alt="Ayaan"
                      loading="lazy"
                      decoding="async"
                      className="w-24 h-24 object-contain rounded-2xl drop-shadow-md"
                    />
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 text-[11px] font-black shadow-2xs">
                      Tap me!
                    </span>
                  </motion.div>
                  <motion.div
                    key={ayaanTapCheer || quranModeTab}
                    initial={{ opacity: 0.7, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative flex-1 rounded-2xl bg-[var(--bg-elevated)] border border-amber-200 dark:border-amber-700/40 p-3 text-left shadow-xs"
                  >
                    <p className="text-xs font-extrabold text-[var(--text-primary)] leading-snug">
                      {ayaanTapCheer
                        ? ayaanTapCheer
                        : quranModeTab === 'Practice'
                        ? 'Can you spot the right Arabic word from this verse?'
                        : quranModeTab === 'Meaning'
                        ? 'Reflecting on the meaning helps our hearts love Allah!'
                        : 'Listen and repeat after me!'}
                    </p>
                  </motion.div>
                </div>

                {/* Bottom Prev / 1/4 / Next Bar */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    disabled={kidsAyahIdx === 0}
                    onClick={() => {
                      audioManager.stopAll();
                      setKidsAyahIdx((i) => Math.max(0, i - 1));
                      setWordPracticeAnswered(null);
                    }}
                    className="w-11 h-11 rounded-full bg-[#16A34A] disabled:opacity-30 text-white flex items-center justify-center shadow-xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-extrabold text-[var(--text-secondary)] tabular-nums">
                    {kidsAyahIdx + 1} / {kidsSurahAyahs.length}
                  </span>
                  <button
                    type="button"
                    disabled={kidsAyahIdx >= kidsSurahAyahs.length - 1}
                    onClick={() => {
                      audioManager.stopAll();
                      setKidsAyahIdx((i) => Math.min(kidsSurahAyahs.length - 1, i + 1));
                      setWordPracticeAnswered(null);
                    }}
                    className="w-11 h-11 rounded-full bg-[#16A34A] disabled:opacity-30 text-white flex items-center justify-center shadow-xs"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Complete Interactive 17-Lesson Noorani Qaida Course + Letter Joiner + Vowel Lab */}
              <NooraniQaidaCourseView
                onOpenPaywall={openKidsPaywall}
                onTriggerToast={showKidsToast}
              />
            </div>
          </div>
        );
      }

      case 'recitation_practice':
        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 4: Recite with Ayaan matching Reference */}
            <div className="bg-[var(--bg-app)] text-[var(--text-primary)]">
              <MobileStatusBar time="9:41" light={resolvedTheme === 'dark'} />
              <div className="flex items-center justify-between px-4 pt-1 pb-2">
                <ScreenBackButton variant="kids" label="Back" />
                <div className="flex flex-col items-center gap-1">
                  <h1 className="text-base font-extrabold text-[var(--text-primary)]">
                    {t('recite_with_ayaan')}
                  </h1>
                  <SelectSheetField
                    value={String(kidsSurahNum)}
                    onChange={(val) => handleSwitchKidsSurah(Number(val))}
                    title="Choose Surah to Recite"
                    subtitle="Practice verse by verse with Ayaan"
                    ariaLabel="Switch Recitation Surah"
                    variant="inline"
                    searchable
                    searchPlaceholder="Search Juz Amma Surah…"
                    className="max-w-[190px]"
                    options={KIDS_SURAH_OPTIONS.map((opt) => ({
                      value: String(opt.number),
                      label: opt.title,
                    }))}
                  />
                </div>
                {/* Global Mute Toggle */}
                <button
                  type="button"
                  onClick={toggleAudioMute}
                  aria-pressed={!isAudioMuted}
                  className={`px-2.5 min-h-[38px] rounded-full flex items-center gap-1 text-[11px] font-extrabold border transition ${
                    !isAudioMuted
                      ? 'bg-[#16A34A] text-white border-[#15803D] shadow-2xs'
                      : 'bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-700/50'
                  }`}
                >
                  {!isAudioMuted ? (
                    <Volume2 className="w-3.5 h-3.5" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5" />
                  )}
                  <span>{!isAudioMuted ? 'Sound' : 'Muted'}</span>
                </button>
              </div>
            </div>

            <div className="px-4 pt-2 text-center space-y-4">
              <p className="text-xs font-bold text-[var(--text-secondary)]">
                {isRecordingMic
                  ? 'Listening to your voice — tap mic again when finished'
                  : 'Tap the mic and recite this ayah'}
              </p>

              {!hasSpeechRecognition && (
                <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-700/40 px-3 py-2 text-[11px] font-semibold text-amber-950 dark:text-amber-200">
                  Voice Activity & Qari Comparison Mode — Live mic waveform & playback work offline; automatic Arabic transcript is not supported in this browser.
                </div>
              )}

              <div className="rounded-3xl bg-[var(--bg-surface)] border border-amber-200 dark:border-amber-700/40 p-5 shadow-xs space-y-2">
                <p className="font-arabic text-4xl text-[var(--text-primary)] font-bold">
                  {currentKidsAyah.arabicUthmani}
                </p>
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  {currentKidsAyah.transliteration}
                </p>
              </div>

              {/* Huge Glowing Green Mic Circle + Live Web Audio AnalyserNode Waveform */}
              <div className="py-1 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={handleToggleMicRecording}
                  className={`w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition ${
                    isRecordingMic
                      ? 'bg-[#22C55E] ring-8 ring-emerald-200 dark:ring-emerald-800/60 scale-105 text-white'
                      : 'bg-gradient-to-b from-[#4ADE80] to-[#16A34A] text-white ring-8 ring-emerald-100 dark:ring-emerald-900/50'
                  }`}
                >
                  <Mic className="w-12 h-12" />
                </button>

                {/* Live AnalyserNode Green Waveform Bars */}
                <div className="flex items-center justify-center gap-1 h-8">
                  {voiceBands.map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-[#22C55E] transition-all duration-75"
                      style={{ height: `${isRecordingMic ? h : Math.max(6, Math.round(h * 0.45))}px` }}
                    />
                  ))}
                </div>

                {micPermissionError && (
                  <p className="text-[11px] font-bold text-rose-700 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 rounded-xl px-3 py-2 max-w-sm">
                    {micPermissionError}
                  </p>
                )}

                {/* Compare With Qari / Play Recorded Voice / AI Tajweed Check */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      speakArabic(currentKidsAyah.arabicUthmani, currentKidsAyah.audioUrl)
                    }
                    className="px-3.5 min-h-[44px] py-2 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-extrabold text-[var(--text-primary)] flex items-center gap-1.5 shadow-2xs"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Listen to Qari</span>
                  </button>
                  {recordedAudioUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        audioManager.playAudioUrl({
                          id: 'kids-recorded-voice',
                          url: recordedAudioUrl,
                        });
                      }}
                      className="px-3.5 min-h-[44px] py-2 rounded-full bg-amber-100 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700/50 text-xs font-extrabold text-amber-950 dark:text-amber-200 flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Play My Voice</span>
                    </button>
                  )}
                  {hasRecordedBlob && !isRecordingMic && (
                    <button
                      type="button"
                      disabled={aiTajweedLoading}
                      onClick={handleRunKidsAiTajweed}
                      className="px-4 min-h-[44px] py-2 rounded-full bg-[#14532D] hover:bg-emerald-800 disabled:opacity-60 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition"
                    >
                      {aiTajweedLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
                          <span>Checking Tajweed…</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>AI Tajweed Check</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                {hasRecordedBlob && !isRecordingMic && (() => {
                  const quota = canUseAiTajweedCheck(user, getLocalDateKeyWithOffset(0, new Date()));
                  return (
                    <p className="text-[11px] font-bold text-[var(--text-muted)] tabular-nums">
                      {quota.limit === null
                        ? 'AI Harakat & Makhraj Coach · Unlimited active'
                        : `AI Harakat & Makhraj Coach · ${quota.remaining}/${quota.limit} free checks left today`}
                    </p>
                  );
                })()}
              </div>

              {/* AI Tajweed & Harakat Word-by-Word Feedback Card */}
              {(aiTajweedResult || aiTajweedError) && (
                <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 space-y-3 text-left shadow-xs">
                  {aiTajweedError ? (
                    <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">{aiTajweedError}</p>
                  ) : aiTajweedResult ? (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                            AI Tajweed & Harakat Review
                          </p>
                          <p className="text-sm font-extrabold text-slate-900">
                            {aiTajweedResult.accuracyLabel}
                          </p>
                        </div>
                        <span
                          className={`text-lg font-black tabular-nums ${
                            aiTajweedResult.overallScore >= 80
                              ? 'text-[#14532D]'
                              : aiTajweedResult.overallScore >= 55
                              ? 'text-amber-600'
                              : 'text-rose-600'
                          }`}
                        >
                          {aiTajweedResult.overallScore}%
                        </span>
                      </div>

                      {aiTajweedResult.wordFeedback.length > 0 && (
                        <div dir="rtl" className="flex flex-wrap gap-1.5 pt-0.5">
                          {aiTajweedResult.wordFeedback.map((wf, idx) => {
                            const toneClass =
                              wf.status === 'correct'
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/50 text-emerald-950 dark:text-emerald-200'
                                : wf.status === 'harakat_issue'
                                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/50 text-amber-950 dark:text-amber-200'
                                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700/50 text-rose-900 dark:text-rose-200';
                            return (
                              <div
                                key={`${wf.word}-${idx}`}
                                className={`rounded-xl border px-2.5 py-1.5 text-center ${toneClass}`}
                              >
                                <p className="font-arabic text-xl font-bold leading-snug">
                                  {wf.word}
                                </p>
                                <p dir="ltr" className="text-[11px] font-semibold leading-tight mt-0.5">
                                  {wf.note}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="space-y-1 text-xs text-[var(--text-secondary)] bg-[var(--bg-subtle)] rounded-xl p-2.5 border border-amber-200/70 dark:border-amber-700/40">
                        <p className="font-bold text-[var(--text-primary)]">{aiTajweedResult.feedbackSummary}</p>
                        <p className="text-[11px] font-semibold text-emerald-900 dark:text-emerald-300">
                          Makhraj Tip: {aiTajweedResult.makhrajTip}
                        </p>
                        {aiTajweedResult.transcriptArabic && (
                          <p className="text-[11px] text-[var(--text-muted)]">
                            Heard:{' '}
                            <span dir="rtl" className="font-arabic text-sm font-bold text-[var(--text-primary)]">
                              {aiTajweedResult.transcriptArabic}
                            </span>
                          </p>
                        )}
                      </div>
                    </>
                  ) : null}
                </div>
              )}

              {/* Voice Activity Metrics + Optional Live Arabic Speech Recognition + Self-Check Rubric */}
              {(micDone || recognizedArabic || voiceAssessment) && (
                <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 space-y-2.5 text-left">
                  {voiceAssessment && (
                    <div
                      className={`rounded-xl border p-2.5 text-xs ${
                        voiceAssessment.hasClearVoiceActivity
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-700/40 text-emerald-950 dark:text-emerald-200'
                          : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-700/40 text-amber-950 dark:text-amber-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider">
                          Microphone Voice Activity Check
                        </span>
                        <span className="text-[11px] font-bold tabular-nums">
                          {(voiceAssessment.durationMs / 1000).toFixed(1)}s · Peak{' '}
                          {Math.round(voiceAssessment.peakLevel * 100)}%
                        </span>
                      </div>
                      <p className="font-semibold text-[11px]">{voiceAssessment.summary}</p>
                    </div>
                  )}
                  {recognizedArabic && (
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-700/40 p-2.5 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-extrabold uppercase text-emerald-800 dark:text-emerald-300">
                          Live Arabic Voice Check
                        </p>
                        <p className="font-arabic text-lg font-bold text-[var(--text-primary)]">
                          {recognizedArabic}
                        </p>
                      </div>
                      {speechMatchScore !== null && (
                        <span className="px-2.5 py-1 rounded-full bg-[#16A34A] text-white text-xs font-extrabold tabular-nums">
                          {speechMatchScore}% Match
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-xs font-extrabold text-[var(--text-primary)] text-center">
                    How did your recitation sound compared to the Qari?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRecitationSelfRating('clear')}
                      className={`py-2 rounded-xl text-xs font-extrabold border inline-flex items-center justify-center gap-1.5 transition ${
                        recitationSelfRating === 'clear'
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                          : 'bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span>Clear & Smooth!</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRecitationSelfRating('practice');
                        addNeedsPracticeItem(
                          'quran',
                          `Recite ${currentSurahMeta.nameTranslit} Ayah ${currentKidsAyah.numberInSurah}`,
                          currentKidsAyah.transliteration,
                          'recitation_practice'
                        );
                      }}
                      className={`py-2 rounded-xl text-xs font-extrabold border inline-flex items-center justify-center gap-1.5 transition ${
                        recitationSelfRating === 'practice'
                          ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-950 dark:text-amber-100'
                          : 'bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Practice Again Later</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 3D Ayaan with Framer Motion Listening/Idle Animation matching Screen 4 */}
              <div className="flex items-center gap-2.5 px-1">
                <motion.div
                  onClick={() =>
                    triggerAyaanInteraction('Bismillah! Take a deep breath and recite clearly!')
                  }
                  animate={
                    isRecordingMic
                      ? { scale: [1, 1.08, 1], rotate: [0, 3, -3, 0], y: [0, -6, 0] }
                      : { y: [0, -5, 0], rotate: [0, 1.5, -1.5, 0] }
                  }
                  transition={{
                    duration: isRecordingMic ? 1.2 : 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9, rotate: -8 }}
                  className="relative cursor-pointer shrink-0 select-none"
                  title="Tap Ayaan!"
                >
                  <img
                    src="/assets/illustrations/avatar_ayaan_3d.webp"
                    alt="Ayaan"
                    loading="lazy"
                    decoding="async"
                    className="w-24 h-24 object-contain rounded-2xl drop-shadow-md"
                  />
                </motion.div>
                <div className="flex-1 rounded-2xl bg-[var(--bg-surface)] border border-amber-200 dark:border-amber-700/40 p-3.5 text-left shadow-xs">
                  <p className="text-xs font-extrabold text-[var(--text-primary)] leading-snug">
                    {ayaanTapCheer
                      ? ayaanTapCheer
                      : isRecordingMic
                      ? 'I’m listening closely... Take your time!'
                      : micDone
                      ? 'MashaAllah! Listening to the Qari and repeating builds strong Tajweed!'
                      : 'Tap the green mic or tap me for a tip!'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  completeKidsQuestStep(
                    'quran',
                    `Recited ${currentSurahMeta.nameTranslit}`,
                    currentSurahMeta.nameTranslit
                  );
                  showKidsToast(`Completed ${currentSurahMeta.nameTranslit} recitation!`);
                  setKidsRoute('todays_quest');
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md"
              >
                Finish Recitation
              </button>
            </div>
          </div>
        );

      case 'duas_learning': {
        const activeDua = VERIFIED_DUAS[kidsDuaIdx] || VERIFIED_DUAS[0];
        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 5: Duas Learning with 3D Ayla Illustration matching Reference */}
            <div className="bg-[var(--bg-app)] text-[var(--text-primary)]">
              <MobileStatusBar time="9:41" light={resolvedTheme === 'dark'} />
              <div className="flex items-center justify-between px-4 pt-1 pb-2">
                <ScreenBackButton variant="kids" label="Back" />
                <div className="text-center">
                  <h1 className="text-base font-extrabold text-[var(--text-primary)]">
                    {activeDua.kidsTitle || activeDua.title}
                  </h1>
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                    Dua {kidsDuaIdx + 1} of {VERIFIED_DUAS.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    audioManager.stopAll();
                    setKidsDuaIdx((i) => (i + 1) % VERIFIED_DUAS.length);
                    setDuaPracticeMode('card');
                    setDuaQuizPicked(null);
                  }}
                  className="w-11 h-11 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 flex items-center justify-center"
                  title="Next Dua"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="px-4 space-y-3.5">
              {/* Full 3D Illustration of Ayla at Meal Table from Reference */}
              <div className="rounded-3xl overflow-hidden border border-amber-200 dark:border-amber-700/40 shadow-sm h-44 relative">
                <img
                  src="/assets/illustrations/kids_dua_ayla.webp"
                  alt="Ayla Dua Before Eating"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/55 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full backdrop-blur-xs">
                  {activeDua.verification.source}
                </div>
              </div>

              {/* Cream Dua Card matching Screen 5 with Real Human Qari Audio */}
              <div className="rounded-3xl bg-[var(--bg-surface)] border border-amber-200 dark:border-amber-700/40 p-4 text-center shadow-xs space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/40 text-[#14532D] dark:text-emerald-300 text-[11px] font-extrabold">
                  ✓ Real Human Qari Audio ({resolveDuaHumanAudio(activeDua).reciterName})
                </span>
                <p className="font-arabic text-3xl text-[var(--text-primary)] font-bold leading-[1.9]">
                  {activeDua.arabic}
                </p>
                <p className="text-sm font-extrabold text-[var(--text-primary)]">{activeDua.transliteration}</p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {resolveText(activeDua.translations, activeDua.translations.en)}
                </p>

                <div className="pt-2 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 0.75 : 1)}
                    className="w-9 h-9 rounded-full bg-[var(--bg-subtle)] text-[var(--text-primary)] font-extrabold text-xs flex items-center justify-center tabular-nums"
                  >
                    {playbackSpeed}x
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      void playHumanDuaAudio({
                        dua: activeDua,
                        rate: playbackSpeed,
                        onStatus: (msg) => showKidsToast(msg),
                      });
                      completeKidsQuestStep('dua', activeDua.title);
                    }}
                    className="w-12 h-12 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-md"
                    title="Play Human Qari Audio"
                  >
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      void playHumanDuaAudio({
                        dua: activeDua,
                        rate: playbackSpeed,
                        onStatus: (msg) => showKidsToast(msg),
                      });
                    }}
                    className="w-9 h-9 rounded-full bg-[var(--bg-subtle)] text-[var(--text-primary)] flex items-center justify-center"
                    title="Repeat Human Qari Audio"
                  >
                    <Repeat className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Interactive Quiz or Use-It Stage when selected */}
              {duaPracticeMode === 'quiz' && (
                <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-700/40 p-3.5 space-y-2">
                  <p className="text-xs font-extrabold text-emerald-950 dark:text-emerald-200">
                    When do we recite "{activeDua.kidsTitle || activeDua.title}"?
                  </p>
                  {[
                    activeDua.whenToUse,
                    'Only once a year on Eid morning.',
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setDuaQuizPicked(idx);
                        if (idx === 0) {
                          completeKidsQuestStep('dua', `Mastered ${activeDua.title}`);
                          showKidsToast('MashaAllah! You know when to use this Dua!');
                        }
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs font-bold ${
                        duaQuizPicked === idx
                          ? idx === 0
                            ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-600 text-emerald-950 dark:text-emerald-100'
                            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200'
                          : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {duaPracticeMode === 'use_it' && (
                <div className="rounded-2xl bg-[#FEF3C7] dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/40 p-3.5 space-y-2">
                  <p className="text-xs font-extrabold text-amber-950 dark:text-amber-200">
                    Real-Life Action: {activeDua.whenToUse}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      completeKidsQuestStep('dua', `Used ${activeDua.title}`);
                      showKidsToast('★ Star awarded for practicing this Sunnah Dua!');
                      setDuaPracticeMode('card');
                    }}
                    className="w-full py-2 rounded-xl bg-[#16A34A] text-white text-xs font-extrabold"
                  >
                    I Said This Dua Today! ✓
                  </button>
                </div>
              )}

              {/* 4 Practice Action Tiles matching Screen 5: Listen | Repeat | Quiz | Use It */}
              <div>
                <p className="text-xs font-extrabold text-[var(--text-primary)] mb-2">Practice</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    {
                      label: 'Listen',
                      action: () =>
                        void playHumanDuaAudio({
                          dua: activeDua,
                          rate: playbackSpeed,
                          onStatus: (msg) => showKidsToast(msg),
                        }),
                      bg: 'bg-orange-100 text-orange-900',
                    },
                    {
                      label: 'Repeat',
                      action: () =>
                        void playHumanDuaAudio({
                          dua: activeDua,
                          rate: playbackSpeed,
                          onStatus: (msg) => showKidsToast(msg),
                        }),
                      bg: 'bg-sky-100 text-sky-900',
                    },
                    {
                      label: 'Quiz',
                      action: () => setDuaPracticeMode(duaPracticeMode === 'quiz' ? 'card' : 'quiz'),
                      bg: 'bg-emerald-100 text-emerald-900',
                    },
                    {
                      label: 'Use It',
                      action: () =>
                        setDuaPracticeMode(duaPracticeMode === 'use_it' ? 'card' : 'use_it'),
                      bg: 'bg-amber-100 text-amber-900',
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={item.action}
                      className={`rounded-2xl ${item.bg} py-2.5 px-2 font-extrabold text-[11px] flex flex-col items-center justify-center gap-1 shadow-2xs`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'salah_learning': {
        const currentSalahStep = SALAH_STEPS[salahStepIdx] || SALAH_STEPS[0];
        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 6: Kids Salah Learning with 3D Ayaan Prayer Illustration matching Reference */}
            <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[24px] pb-3 shadow-md">
              <MobileStatusBar time="9:41" light />
              <div className="flex items-center justify-between px-4 pt-1">
                <ScreenBackButton variant="light" label="Back" />
                <h1 className="text-base font-extrabold">Salah Learning</h1>
                <div className="w-11 h-11 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 text-xs font-extrabold tabular-nums">
                  {currentSalahStep.step}/{SALAH_STEPS.length}
                </div>
              </div>
            </div>

            <div className="px-4 pt-3 space-y-3.5">
              {/* Full 3D Illustration of Ayaan Standing on Prayer Rug in Sunlit Mosque */}
              <div className="rounded-3xl overflow-hidden border border-amber-300/60 dark:border-amber-400/30 shadow-md h-60 relative">
                <img
                  src="/assets/illustrations/kids_salah_ayaan.webp"
                  alt="Ayaan Salah Learning"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => speakArabic(currentSalahStep.arabic)}
                  className="absolute bottom-3 right-3 px-3.5 py-2 rounded-full bg-[#16A34A] text-white text-xs font-extrabold shadow-md flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>

              <div className="rounded-3xl bg-[var(--bg-surface)] p-4 shadow-xs border border-[var(--border-subtle)] text-center space-y-2">
                <p className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
                  Step {currentSalahStep.step}: {currentSalahStep.title}
                </p>
                <p className="text-sm font-extrabold text-[var(--text-primary)] leading-snug">
                  {currentSalahStep.kidsDesc}
                </p>
                <p className="font-arabic text-2xl text-emerald-950 dark:text-emerald-100 font-bold">
                  {currentSalahStep.arabic}
                </p>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 italic">
                  {currentSalahStep.transliteration}
                </p>
              </div>

              {/* Demonstrate Step Check on final step */}
              {salahStepIdx === SALAH_STEPS.length - 1 && (
                <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-700/40 p-3.5 space-y-2">
                  <p className="text-xs font-extrabold text-emerald-950 dark:text-emerald-200">
                    Quick Salah Check: What do we say when bowing in Ruku?
                  </p>
                  {[
                    'Subhana Rabbiyal-Azim (Glory to my Lord, the Most Great)',
                    'Subhana Rabbiyal-A’la',
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSalahQuizPicked(idx)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs font-bold ${
                        salahQuizPicked === idx
                          ? idx === 0
                            ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-600 text-emerald-950 dark:text-emerald-100'
                            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200'
                          : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  disabled={salahStepIdx === 0}
                  onClick={() => {
                    audioManager.stopAll();
                    setSalahStepIdx((i) => Math.max(0, i - 1));
                  }}
                  className="px-4 py-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] disabled:opacity-40 text-[var(--text-primary)] font-extrabold text-xs min-h-[44px]"
                >
                  Previous
                </button>
                <span className="text-xs font-extrabold text-[var(--text-secondary)] tabular-nums">
                  {salahStepIdx + 1} / {SALAH_STEPS.length}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    audioManager.stopAll();
                    if (salahStepIdx + 1 < SALAH_STEPS.length) {
                      setSalahStepIdx((i) => i + 1);
                    } else {
                      completeKidsQuestStep('salah', 'Completed Salah Steps');
                      showKidsToast('MashaAllah! Completed all 6 Salah steps!');
                      setKidsRoute('todays_quest');
                    }
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#16A34A] text-white font-extrabold text-xs shadow-sm min-h-[44px]"
                >
                  {salahStepIdx + 1 < SALAH_STEPS.length ? 'Next ›' : 'Finish ✓'}
                </button>
              </div>
            </div>
          </div>
        );
      }

      case 'stories': {
        const activeStory = KIDS_STORIES.find((s) => s.id === activeStoryId);
        const filteredStories =
          storyCat === 'Featured'
            ? TOP_FEATURED_STORY_IDS.map((id) => KIDS_STORIES.find((s) => s.id === id)).filter(
                (s): s is (typeof KIDS_STORIES)[number] => Boolean(s)
              )
            : KIDS_STORIES.filter((s) => (storyCat === 'All' ? true : s.category === storyCat));
        const familyUnlocked = isFamilyPlusActive(user);

        const activeLocalizedTitle = activeStory
          ? activeStory.localizedTitles?.[user.language] || activeStory.title
          : t('stories');
        const activeLocalizedPages = activeStory
          ? activeStory.localizedPages?.[user.language] || activeStory.pages
          : [];
        const activeStorybook = activeStory
          ? buildInteractiveStorybook(activeStory, user.language)
          : null;
        const activeScenes = activeStorybook ? activeStorybook.scenes : [];
        const currentScene = activeScenes[storyPageIdx] || activeScenes[0] || null;
        const activeLocalizedMoral = activeStory
          ? activeStory.localizedMorals?.[user.language] || activeStory.moral
          : '';
        const currentPageText = currentScene
          ? currentScene.narrationParagraphs.join(' ')
          : activeLocalizedPages[storyPageIdx] || '';
        const pageSentences = splitStoryPageIntoSentences(currentPageText);
        // Map core narrative scenes (0, 1, 3) to pre-fetched raw story pages (0, 1, 2) for 100% offline Studio Voice reuse
        const mappedAudioPageIdx =
          storyPageIdx === 0
            ? 0
            : storyPageIdx === 1
            ? Math.min(1, Math.max(0, activeLocalizedPages.length - 1))
            : storyPageIdx === 3
            ? Math.min(2, Math.max(0, activeLocalizedPages.length - 1))
            : storyPageIdx;
        const relatedQuranRef = activeStory ? STORY_QURAN_VERSES_MAP[activeStory.id] : undefined;
        const activeQuiz = activeStory?.comprehensionQuestions?.[0];

        const currentStoryTrackPrefix = activeStory
          ? `story-${activeStory.id}-p${storyPageIdx}`
          : '';
        const isCurrentStorySpeaking =
          Boolean(activeStory) &&
          Boolean(audioState.activeTrackId?.startsWith(currentStoryTrackPrefix)) &&
          (audioState.status === 'playing' || audioState.status === 'loading');
        const isCurrentStoryPaused =
          Boolean(activeStory) &&
          Boolean(audioState.activeTrackId?.startsWith(currentStoryTrackPrefix)) &&
          audioState.status === 'paused';
        const isActiveStoryAlreadyCompleted = Boolean(
          activeStory && activeChild.completedStoryIds?.includes(activeStory.id)
        );

        const speakKaraokeFromSentence = (startIdx: number, tokenAtStart: number) => {
          if (!activeStory || tokenAtStart !== storyNarrationTokenRef.current) return;
          if (startIdx >= pageSentences.length) {
            setStoryActiveSentenceIdx(null);
            return;
          }
          setStoryActiveSentenceIdx(startIdx);
          audioManager.speakText({
            id: `${currentStoryTrackPrefix}-s${startIdx}`,
            text: pageSentences[startIdx],
            lang: getSpeechLangForUiLanguage(user.language),
            rate: storySpeed,
            pitch: 1.04,
            onEnded: () => {
              if (tokenAtStart !== storyNarrationTokenRef.current) return;
              speakKaraokeFromSentence(startIdx + 1, tokenAtStart);
            },
            onError: (msg) => {
              setStoryActiveSentenceIdx(null);
              showKidsToast(msg);
            },
          });
        };

        const isPrefetchActive =
          prefetchState.status === 'running' || prefetchState.status === 'paused';

        const top10Stories = KIDS_STORIES.slice(0, TOP_STORIES_PACK_COUNT);
        const top10CachedCount = top10Stories.filter(
          (st) => storyLibrarySummary.storyStatusMap[st.id]?.isFullyCached
        ).length;
        const all49Cached =
          KIDS_STORIES.length > 0 &&
          storyLibrarySummary.cachedStoriesCount >= KIDS_STORIES.length;

        const handlePrefetchSingleStory = async (
          story: (typeof KIDS_STORIES)[number],
          storyGlobalIdx: number
        ) => {
          const title = story.localizedTitles?.[user.language] || story.title;
          if (!canCacheSingleStoryOffline(user, storyGlobalIdx)) {
            openKidsPaywall(
              `Unlock "${title}" and offline human storytelling for all ${KIDS_STORIES.length} stories with Family Plus (₹199/yr · 7-Day Free Trial).`
            );
            return;
          }
          const finalState = await storyAudioPrefetchManager.startPrefetch({
            stories: [story],
            scope: 'single_story',
            language: user.language,
            voiceStyle: storyVoicePersona,
          });
          refreshStoryLibrarySummary();
          if (finalState.status === 'completed') {
            setStudioOfflineNotice(null);
            showKidsToast(`Saved "${title}" (${finalState.totalTasks} pages) offline!`);
          } else if (finalState.lastError) {
            showKidsToast(finalState.lastError);
          }
        };

        const handleDownloadTop10Pack = async () => {
          if (!canDownloadTopStoriesAudioPack(user)) {
            openKidsPaywall(
              'Save Top 10 Prophet & Companion stories human-voice audio offline with Family Plus (₹199/yr · 7-Day Free Trial).'
            );
            return;
          }
          const finalState = await storyAudioPrefetchManager.startPrefetch({
            stories: top10Stories,
            scope: 'top_10',
            language: user.language,
            voiceStyle: storyVoicePersona,
          });
          refreshStoryLibrarySummary();
          if (finalState.status === 'completed') {
            showKidsToast(
              `Saved Top ${TOP_STORIES_PACK_COUNT} Stories (${finalState.completedTasks} pages) offline!`
            );
          } else if (finalState.lastError) {
            showKidsToast(finalState.lastError);
          }
        };

        const handleDownloadAllStoriesPack = async () => {
          if (!canDownloadFullStoryLibraryAudioPack(user)) {
            openKidsPaywall(
              `Download warm Studio Storyteller human voice for all ${ALL_STORIES_PACK_COUNT} stories (${storyLibrarySummary.totalPages} pages) offline with Family Plus (₹199/yr · 7-Day Free Trial).`
            );
            return;
          }
          const finalState = await storyAudioPrefetchManager.startPrefetch({
            stories: KIDS_STORIES,
            scope: 'all_49',
            language: user.language,
            voiceStyle: storyVoicePersona,
          });
          refreshStoryLibrarySummary();
          if (finalState.status === 'completed') {
            showKidsToast(
              `Saved all ${KIDS_STORIES.length} stories (${finalState.completedTasks} pages) for offline listening!`
            );
          } else if (finalState.lastError) {
            showKidsToast(finalState.lastError);
          }
        };

        const handleClearOfflineStoryCache = async () => {
          storyAudioPrefetchManager.cancelPrefetch();
          await clearAllCachedStoryAudio();
          refreshStoryLibrarySummary();
          showKidsToast('Cleared saved offline story audio cache.');
        };

        const handleToggleStoryNarration = async () => {
          if (isCurrentStorySpeaking) {
            audioManager.pause();
            return;
          }
          if (isCurrentStoryPaused) {
            audioManager.resume();
            return;
          }
          if (!activeStory || !currentPageText.trim()) return;

          if (storyVoiceMode === 'studio') {
            setLoadingStudioStoryAudio(true);
            setStudioOfflineNotice(null);
            setStoryActiveSentenceIdx(null);
            const res = await resolveStoryPageHumanAudio({
              storyId: activeStory.id,
              pageIndex: mappedAudioPageIdx,
              text: currentPageText,
              language: user.language,
              voiceStyle: storyVoicePersona,
            });
            setLoadingStudioStoryAudio(false);

            if (res.ok && res.blobUrl) {
              if (studioStoryBlobUrlRef.current && studioStoryBlobUrlRef.current !== res.blobUrl) {
                try {
                  URL.revokeObjectURL(studioStoryBlobUrlRef.current);
                } catch {
                  // ignore
                }
              }
              studioStoryBlobUrlRef.current = res.blobUrl;
              audioManager.playAudioUrl({
                id: `${currentStoryTrackPrefix}-studio-${res.voiceStyleUsed || storyVoicePersona}`,
                url: res.blobUrl,
                rate: storySpeed,
                allowTtsFallback: false,
                onError: (msg) => {
                  setStudioOfflineNotice({
                    storyId: activeStory.id,
                    pageIndex: storyPageIdx,
                    message: msg,
                    isOfflineUncached: false,
                  });
                },
              });
              refreshStoryLibrarySummary();
              const label =
                (res.voiceStyleUsed || storyVoicePersona) === 'teacher'
                  ? 'Teacher'
                  : 'Storyteller';
              showKidsToast(
                res.fromCache
                  ? `Playing offline Studio ${label} voice`
                  : `Playing Studio ${label} voice (saved offline)`
              );
              return;
            }

            // Strictly bypass default robotic speechSynthesis TTS fallback
            setStudioOfflineNotice({
              storyId: activeStory.id,
              pageIndex: storyPageIdx,
              message:
                res.error ||
                'Human Studio narration for this page is not saved offline yet.',
              isOfflineUncached: Boolean(res.offlineUncached),
            });
            return;
          }

          storyNarrationTokenRef.current += 1;
          speakKaraokeFromSentence(0, storyNarrationTokenRef.current);
        };

        const handleStopStoryNarration = () => {
          storyNarrationTokenRef.current += 1;
          setStoryActiveSentenceIdx(null);
          setLoadingStudioStoryAudio(false);
          audioManager.stopAll();
        };

        const totalStoryScenes = activeScenes.length || activeLocalizedPages.length;
        const isLastStoryPage = Boolean(
          activeStory && storyPageIdx + 1 >= totalStoryScenes
        );
        const canCompleteStoryNow =
          !activeQuiz || storyQuizPicked === activeQuiz.correctIndex;

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 7: Kids Stories with 49 Multi-Scene Interactive Storybooks, Persistent IndexedDB Human Voice Caching, Qari Verses & Quizzes */}
            <div className="bg-[var(--bg-app)] text-[var(--text-primary)]">
              <MobileStatusBar time="9:41" light={resolvedTheme === 'dark'} />
              <div className="flex items-center justify-between px-4 pt-1 pb-2">
                <ScreenBackButton
                  variant="kids"
                  label={activeStory ? 'Back to Stories' : 'Back'}
                />
                <div className="text-center max-w-[60%]">
                  <h1 className="text-base font-extrabold text-[var(--text-primary)] truncate">
                    {activeLocalizedTitle}
                  </h1>
                  {activeStory && (
                    <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                      {currentScene?.sceneLabel || `Scene ${storyPageIdx + 1}`} · {storyPageIdx + 1}/{totalStoryScenes}
                    </p>
                  )}
                </div>
                <SleepTimerTriggerButton
                  compact
                  onClick={() => setKidsSleepSheetOpen(true)}
                />
              </div>
            </div>

            <div className="px-4 space-y-3">
              {!activeStory && (
                <>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {(['Featured', 'All', 'Prophets', 'Companions', 'Akhlaq'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setStoryCat(cat)}
                        className={`px-3.5 py-2 rounded-full text-xs font-extrabold transition whitespace-nowrap min-h-[40px] ${
                          storyCat === cat
                            ? 'bg-[#14532D] dark:bg-emerald-600 text-white shadow-2xs'
                            : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)]'
                        }`}
                      >
                        {cat === 'Featured' ? 'Illustrated Top 15' : cat}
                      </button>
                    ))}
                  </div>

                  {/* 49-Story Persistent Offline Human Voice Library Manager */}
                  <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 shadow-2xs space-y-2.5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-extrabold text-[var(--text-primary)]">
                          Offline Human Storyteller Audio ({KIDS_STORIES.length} Stories)
                        </p>
                        <p className="text-[11px] font-semibold text-[var(--text-secondary)] tabular-nums mt-0.5">
                          {storyLibrarySummary.cachedStoriesCount}/{storyLibrarySummary.totalStories} stories
                          {' · '}
                          {storyLibrarySummary.cachedPagesCount}/{storyLibrarySummary.totalPages} pages
                          {' · '}
                          {formatAudioCacheSizeMb(storyLibrarySummary.totalBytes)} saved
                        </p>
                      </div>
                      {storyLibrarySummary.totalBytes > 0 && !isPrefetchActive && (
                        <button
                          type="button"
                          onClick={() => void handleClearOfflineStoryCache()}
                          className="px-2.5 min-h-[36px] rounded-xl text-[11px] font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] flex items-center gap-1 shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear Cache</span>
                        </button>
                      )}
                    </div>

                    {isPrefetchActive ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-emerald-900 dark:text-emerald-200">
                          <span className="truncate">
                            {prefetchState.status === 'paused'
                              ? 'Paused: '
                              : 'Saving offline: '}
                            {prefetchState.currentStoryTitle}
                          </span>
                          <span className="tabular-nums shrink-0">
                            {prefetchState.completedTasks}/{prefetchState.totalTasks} pages
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                          <div
                            className="h-full bg-[#22C55E] transition-all duration-200"
                            style={{
                              width: `${
                                prefetchState.totalTasks > 0
                                  ? Math.max(
                                      5,
                                      Math.round(
                                        (prefetchState.completedTasks / prefetchState.totalTasks) *
                                          100
                                      )
                                    )
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              prefetchState.status === 'paused'
                                ? storyAudioPrefetchManager.resumePrefetch()
                                : storyAudioPrefetchManager.pausePrefetch()
                            }
                            className="flex-1 min-h-[44px] rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/40 text-[#14532D] dark:text-emerald-200 text-xs font-extrabold flex items-center justify-center gap-1.5"
                          >
                            {prefetchState.status === 'paused' ? (
                              <>
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>Resume</span>
                              </>
                            ) : (
                              <>
                                <Pause className="w-3.5 h-3.5" />
                                <span>Pause</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => storyAudioPrefetchManager.cancelPrefetch()}
                            className="px-4 min-h-[44px] rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 text-rose-700 dark:text-rose-200 text-xs font-extrabold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => void handleDownloadTop10Pack()}
                          className={`min-h-[44px] px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                            top10CachedCount >= TOP_STORIES_PACK_COUNT
                              ? 'bg-emerald-100 dark:bg-emerald-900/50 text-[#14532D] dark:text-emerald-200'
                              : 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-700/40 text-[#14532D] dark:text-emerald-200'
                          }`}
                        >
                          {!canDownloadTopStoriesAudioPack(user) ? (
                            <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300 shrink-0" />
                          ) : top10CachedCount >= TOP_STORIES_PACK_COUNT ? (
                            <Check className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <Download className="w-3.5 h-3.5 shrink-0" />
                          )}
                          <span className="truncate">
                            {top10CachedCount >= TOP_STORIES_PACK_COUNT
                              ? 'Top 10 Saved'
                              : `Save Top ${TOP_STORIES_PACK_COUNT}`}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => void handleDownloadAllStoriesPack()}
                          className={`min-h-[44px] px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                            all49Cached
                              ? 'bg-emerald-100 dark:bg-emerald-900/50 text-[#14532D] dark:text-emerald-200'
                              : 'bg-[#14532D] dark:bg-emerald-600 text-white hover:bg-emerald-800'
                          }`}
                        >
                          {!canDownloadFullStoryLibraryAudioPack(user) ? (
                            <Lock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                          ) : all49Cached ? (
                            <Check className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <Download className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                          )}
                          <span className="truncate">
                            {all49Cached
                              ? `All ${KIDS_STORIES.length} Saved`
                              : `Save All ${KIDS_STORIES.length}`}
                          </span>
                        </button>
                      </div>
                    )}

                    {prefetchState.status === 'error' && prefetchState.lastError && (
                      <p className="text-[11px] font-semibold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 rounded-xl px-2.5 py-2">
                        {prefetchState.lastError}
                      </p>
                    )}
                  </div>

                  {!familyUnlocked && (
                    <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-300 dark:border-amber-700/40 p-3 flex items-center justify-between gap-2">
                      <p className="text-[11px] font-bold text-amber-950 dark:text-amber-200">
                        First 6 stories are Free Forever · Unlock all {KIDS_STORIES.length} illustrated stories with 7-Day Free Trial
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          openKidsPaywall(
                            `Unlock all ${KIDS_STORIES.length} illustrated Prophet & Companion stories with Family Plus (₹199/yr · 7-Day Free Trial).`
                          )
                        }
                        className="px-3 py-1.5 rounded-xl bg-[#14532D] dark:bg-emerald-600 text-white text-[11px] font-extrabold shrink-0"
                      >
                        Unlock
                      </button>
                    </div>
                  )}
                </>
              )}

              {activeStory ? (
                <motion.div
                  key={`${activeStory.id}-${storyPageIdx}`}
                  initial={{ opacity: 0.75, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl bg-[var(--bg-surface)] p-4 sm:p-5 shadow-md border border-[var(--border-subtle)] space-y-4"
                >
                  {/* Multi-Scene Progress Bar */}
                  <div className="flex items-center gap-1.5" aria-label="Story scene progress">
                    {activeScenes.map((sc, sIdx) => (
                      <button
                        key={sc.sceneIndex}
                        type="button"
                        onClick={() => {
                          handleStopStoryNarration();
                          setStoryPageIdx(sIdx);
                        }}
                        aria-label={`Jump to ${sc.sceneLabel}`}
                        className={`h-2 flex-1 rounded-full transition ${
                          sIdx === storyPageIdx
                            ? 'bg-[#14532D] dark:bg-emerald-400'
                            : sIdx < storyPageIdx
                            ? 'bg-[#22C55E]'
                            : 'bg-[var(--bg-subtle)]'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="relative rounded-2xl overflow-hidden bg-emerald-950">
                    <img
                      src={currentScene?.illustrationUrl || getStoryCoverArtwork(activeStory)}
                      alt={`${activeLocalizedTitle} — ${currentScene?.chapterTitle || ''}`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className={`w-full h-48 object-cover ${currentScene?.imageFocalClass || 'object-center'} transition duration-300`}
                    />
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/65 to-transparent pointer-events-none" />
                    <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                      <span className="text-[11px] font-extrabold text-amber-200 drop-shadow-xs">
                        {currentScene?.chapterTitle}
                      </span>
                      <span className="text-[11px] font-bold text-white/90 tabular-nums">
                        {storyPageIdx + 1}/{totalStoryScenes}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setStorySpeed((prev) => (prev === 0.85 ? 1 : 0.85))
                        }
                        className="px-2.5 min-h-[40px] rounded-full bg-black/65 text-amber-200 text-[11px] font-extrabold backdrop-blur-xs tabular-nums"
                        title="Toggle narration speed"
                      >
                        {storySpeed === 0.85 ? '0.85x Kids' : '1.0x'}
                      </button>
                      <button
                        type="button"
                        disabled={loadingStudioStoryAudio}
                        onClick={() => void handleToggleStoryNarration()}
                        className="px-3.5 min-h-[40px] rounded-full bg-[#16A34A] text-white text-xs font-extrabold shadow-md flex items-center gap-1.5"
                      >
                        {loadingStudioStoryAudio ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Loading Voice…</span>
                          </>
                        ) : isCurrentStorySpeaking ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pause</span>
                          </>
                        ) : isCurrentStoryPaused ? (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Resume</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>
                              {storyVoiceMode === 'studio' ? 'Studio Read' : 'Read Aloud'}
                            </span>
                          </>
                        )}
                      </button>
                      {(isCurrentStorySpeaking || isCurrentStoryPaused) && (
                        <button
                          type="button"
                          onClick={handleStopStoryNarration}
                          aria-label="Stop Read Aloud"
                          className="w-10 h-10 rounded-full bg-rose-600 text-white shadow-md flex items-center justify-center"
                        >
                          <Square className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Storyteller Persona & Playback Engine Selector */}
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-2">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          handleStopStoryNarration();
                          setStoryVoiceMode('studio');
                          setStoryVoicePersona('storyteller');
                        }}
                        className={`px-2.5 min-h-[40px] rounded-xl text-[11px] font-extrabold transition ${
                          storyVoiceMode === 'studio' && storyVoicePersona === 'storyteller'
                            ? 'bg-[#14532D] dark:bg-emerald-600 text-white'
                            : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)]'
                        }`}
                      >
                        Storyteller
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleStopStoryNarration();
                          setStoryVoiceMode('studio');
                          setStoryVoicePersona('teacher');
                        }}
                        className={`px-2.5 min-h-[40px] rounded-xl text-[11px] font-extrabold transition ${
                          storyVoiceMode === 'studio' && storyVoicePersona === 'teacher'
                            ? 'bg-[#14532D] dark:bg-emerald-600 text-white'
                            : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)]'
                        }`}
                      >
                        Gentle Teacher
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      {(() => {
                        const activeStatus = storyLibrarySummary.storyStatusMap[activeStory.id];
                        const activeIdx = KIDS_STORIES.findIndex((s) => s.id === activeStory.id);
                        return (
                          <button
                            type="button"
                            disabled={isPrefetchActive}
                            onClick={() => void handlePrefetchSingleStory(activeStory, activeIdx)}
                            className={`px-2.5 min-h-[40px] rounded-xl text-[11px] font-extrabold flex items-center gap-1 transition ${
                              activeStatus?.isFullyCached
                                ? 'bg-emerald-100 dark:bg-emerald-900/50 text-[#14532D] dark:text-emerald-200'
                                : 'bg-[var(--bg-surface)] text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700/40'
                            }`}
                          >
                            {activeStatus?.isFullyCached ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Saved Offline</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>Save Story</span>
                              </>
                            )}
                          </button>
                        );
                      })()}
                      <button
                        type="button"
                        onClick={() => {
                          handleStopStoryNarration();
                          setStoryVoiceMode('device');
                        }}
                        className={`px-2.5 min-h-[40px] rounded-xl text-[11px] font-bold transition ${
                          storyVoiceMode === 'device'
                            ? 'bg-amber-400 text-emerald-950 font-extrabold'
                            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                        }`}
                      >
                        Device Voice
                      </button>
                    </div>
                  </div>

                  {/* Honest Offline Human Voice Notice (Strictly Bypasses Default TTS Fallback) */}
                  {studioOfflineNotice &&
                    studioOfflineNotice.storyId === activeStory.id &&
                    studioOfflineNotice.pageIndex === storyPageIdx && (
                      <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/40 p-3 space-y-2.5">
                        <p className="text-xs font-bold text-amber-950 dark:text-amber-200 leading-snug">
                          {studioOfflineNotice.message}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const activeIdx = KIDS_STORIES.findIndex(
                                (s) => s.id === activeStory.id
                              );
                              void handlePrefetchSingleStory(activeStory, activeIdx);
                            }}
                            className="px-3.5 min-h-[44px] rounded-xl bg-[#14532D] dark:bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Save Story Offline</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setStudioOfflineNotice(null);
                              setStoryVoiceMode('device');
                              storyNarrationTokenRef.current += 1;
                              speakKaraokeFromSentence(0, storyNarrationTokenRef.current);
                            }}
                            className="px-3 min-h-[44px] rounded-xl bg-[var(--bg-surface)] border border-amber-300 dark:border-amber-700/50 text-amber-950 dark:text-amber-200 text-xs font-bold"
                          >
                            Switch to Device Voice
                          </button>
                        </div>
                      </div>
                    )}

                  <div>
                    <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                      {activeStory.category} · {activeStory.duration || '4 min'} · {currentScene?.sceneLabel || `Scene ${storyPageIdx + 1}`}
                      {storyLibrarySummary.storyStatusMap[activeStory.id]?.isFullyCached
                        ? ' · Ready Offline'
                        : ''}
                    </p>
                    <h2 className="text-lg font-extrabold text-[var(--text-primary)] mt-0.5">
                      {activeLocalizedTitle}
                    </h2>
                    {activeStory.sourceReference && (
                      <p className="text-[11px] font-semibold text-[var(--text-muted)] mt-0.5">
                        Source: {activeStory.sourceReference}
                      </p>
                    )}
                  </div>

                  {/* Sentence-by-sentence Reader (Studio mode stays on Human Voice; Device mode supports sentence tap karaoke) */}
                  <div className="space-y-1.5 text-sm text-[var(--text-primary)] leading-relaxed">
                    {pageSentences.map((sentence, sIdx) => {
                      const isHighlighted = storyActiveSentenceIdx === sIdx && isCurrentStorySpeaking;
                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => {
                            if (storyVoiceMode === 'studio') {
                              void handleToggleStoryNarration();
                              return;
                            }
                            storyNarrationTokenRef.current += 1;
                            speakKaraokeFromSentence(sIdx, storyNarrationTokenRef.current);
                          }}
                          className={`block w-full text-left rounded-xl px-2.5 py-1.5 transition ${
                            isHighlighted
                              ? 'bg-amber-100 dark:bg-amber-900/50 text-emerald-950 dark:text-amber-100 font-semibold shadow-2xs'
                              : 'hover:bg-[var(--bg-subtle)]'
                          }`}
                        >
                          {sentence}
                        </button>
                      );
                    })}
                  </div>

                  {/* Scene Callout (Discovery Goal / Authentic Source / Dinner Family Talk) */}
                  {currentScene?.calloutText && (
                    <div className="rounded-2xl bg-[var(--bg-subtle)] border border-amber-300/70 dark:border-amber-700/40 p-3.5 space-y-1">
                      <p className="text-[11px] font-extrabold text-amber-800 dark:text-amber-300">
                        {currentScene.calloutBadge}
                      </p>
                      <p className="text-xs font-semibold text-[var(--text-primary)] leading-relaxed">
                        {currentScene.calloutText}
                      </p>
                    </div>
                  )}

                  {/* Scene 3 Interactive Moral Choice ("What Would You Do?") */}
                  {currentScene?.interactiveChoice && (
                    <div className="rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-700/40 p-4 space-y-2.5">
                      <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">
                        {currentScene.interactiveChoice.question}
                      </p>
                      <div className="space-y-2">
                        {currentScene.interactiveChoice.options.map((choiceOpt, cIdx) => {
                          const picked = storyChoicePicked === cIdx;
                          return (
                            <button
                              key={choiceOpt.label}
                              type="button"
                              onClick={() => {
                                setStoryChoicePicked(cIdx);
                                playGentleCelebrationChime(choiceOpt.isBestChoice ? 'star' : 'tap');
                              }}
                              className={`w-full text-left p-3 rounded-xl border-2 text-xs font-bold min-h-[48px] transition ${
                                picked
                                  ? choiceOpt.isBestChoice
                                    ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-600 text-emerald-950 dark:text-emerald-100'
                                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-950 dark:text-amber-200'
                                  : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-emerald-400 text-[var(--text-primary)]'
                              }`}
                            >
                              {choiceOpt.label}
                            </button>
                          );
                        })}
                      </div>
                      {storyChoicePicked !== null && (
                        <p className="text-xs font-bold text-[#14532D] dark:text-emerald-200 bg-[var(--bg-surface)] rounded-xl p-3 border border-emerald-200 dark:border-emerald-700/40">
                          {currentScene.interactiveChoice.options[storyChoicePicked]?.feedback}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Authentic Quran Verse Qari Recitation Card (when story relates to a Quran Ayah) */}
                  {relatedQuranRef && (
                    <div className="rounded-2xl bg-[#0F3826] text-white p-3.5 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                          Quran Ayah in This Story · {relatedQuranRef.surahRef}
                        </span>
                        <button
                          type="button"
                          onClick={() => playStoryQuranVerse(relatedQuranRef, showKidsToast)}
                          className="px-3 py-1.5 rounded-xl bg-amber-400 text-emerald-950 text-[11px] font-extrabold flex items-center gap-1 min-h-[34px]"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Hear Qari</span>
                        </button>
                      </div>
                      <p dir="rtl" className="font-arabic text-xl font-bold text-amber-100 leading-loose text-right">
                        {relatedQuranRef.arabicAyah}
                      </p>
                      <p className="text-[11px] text-emerald-100/90 leading-snug">
                        {relatedQuranRef.meaningEn}
                      </p>
                    </div>
                  )}

                  {/* Mama / Papa Bedtime Story Voice Recorder & Playback */}
                  <div className="rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-700/40 p-3 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#14532D] dark:text-emerald-300 flex items-center gap-1.5">
                          <Mic className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                          <span>Mama / Papa Story Voice</span>
                        </p>
                        <p className="text-[11px] text-[var(--text-secondary)]">
                          {isRecordingStoryVoice
                            ? 'Recording your voice for this page… Tap Stop & Save when ready.'
                            : customStoryVoiceUrl
                            ? `Saved human family voice note (${customStoryVoiceDuration}s) for Page ${storyPageIdx + 1}`
                            : 'Record your own warm voice for bedtime reading on this page'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {customStoryVoiceUrl && !isRecordingStoryVoice && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                const trackId = `story-custom-${activeStory.id}-p${storyPageIdx}`;
                                if (
                                  audioState.activeTrackId === trackId &&
                                  audioState.status === 'playing'
                                ) {
                                  audioManager.stopAll();
                                  return;
                                }
                                storyNarrationTokenRef.current += 1;
                                setStoryActiveSentenceIdx(null);
                                void audioManager.playAudioUrl({
                                  id: trackId,
                                  url: customStoryVoiceUrl,
                                  rate: 1,
                                  onError: (msg) => showKidsToast(msg),
                                });
                              }}
                              className="px-3 min-h-[38px] rounded-xl bg-[#14532D] text-white text-[11px] font-extrabold flex items-center gap-1.5"
                            >
                              {audioState.activeTrackId === `story-custom-${activeStory.id}-p${storyPageIdx}` &&
                              audioState.status === 'playing' ? (
                                <>
                                  <Square className="w-3 h-3 fill-current" />
                                  <span>Stop</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3 fill-current" />
                                  <span>Play Mama/Papa</span>
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              aria-label="Delete Mama/Papa Voice Recording"
                              onClick={async () => {
                                audioManager.stopAll();
                                await deleteStoryVoiceRecording(activeStory.id, storyPageIdx);
                                if (customStoryVoiceUrlRef.current) {
                                  URL.revokeObjectURL(customStoryVoiceUrlRef.current);
                                  customStoryVoiceUrlRef.current = null;
                                }
                                setCustomStoryVoiceUrl(null);
                                setCustomStoryVoiceDuration(0);
                                showKidsToast('Deleted voice note for this page');
                              }}
                              className="w-9 h-9 rounded-xl bg-[var(--bg-surface)] border border-rose-200 dark:border-rose-700/50 text-rose-600 dark:text-rose-300 flex items-center justify-center"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          onClick={async () => {
                            if (isRecordingStoryVoice) {
                              stopActiveStoryVoiceCapture(false);
                              return;
                            }
                            if (!canRecordFamilyStoryVoice(user)) {
                              openKidsPaywall(
                                'Record custom Mama/Papa bedtime voices for every story page with Family Plus (₹199/yr · 7-Day Free Trial).'
                              );
                              return;
                            }
                            if (!isVoiceRecorderSupported()) {
                              showKidsToast('Voice recording is not supported on this device browser.');
                              return;
                            }
                            handleStopStoryNarration();
                            try {
                              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                              storyVoiceStreamRef.current = stream;
                              const mimeType = pickSupportedAudioMimeType();
                              const recorder = mimeType
                                ? new MediaRecorder(stream, { mimeType })
                                : new MediaRecorder(stream);
                              storyVoiceChunksRef.current = [];
                              storyVoiceStartRef.current = Date.now();
                              const capturedStoryId = activeStory.id;
                              const capturedPageIdx = storyPageIdx;

                              recorder.ondataavailable = (ev) => {
                                if (ev.data && ev.data.size > 0) {
                                  storyVoiceChunksRef.current.push(ev.data);
                                }
                              };
                              recorder.onstop = async () => {
                                if (storyVoiceStreamRef.current) {
                                  storyVoiceStreamRef.current.getTracks().forEach((tr) => tr.stop());
                                  storyVoiceStreamRef.current = null;
                                }
                                setIsRecordingStoryVoice(false);
                                const finalType = recorder.mimeType || mimeType || 'audio/webm';
                                const blob = new Blob(storyVoiceChunksRef.current, { type: finalType });
                                storyVoiceChunksRef.current = [];
                                if (blob.size < 256) {
                                  showKidsToast('Recording too short. Hold and read a sentence aloud.');
                                  return;
                                }
                                const durationSec = Math.max(
                                  1,
                                  Math.round((Date.now() - storyVoiceStartRef.current) / 1000)
                                );
                                const saved = await saveStoryVoiceRecording({
                                  key: `${capturedStoryId}:${capturedPageIdx}`,
                                  storyId: capturedStoryId,
                                  pageIndex: capturedPageIdx,
                                  mimeType: finalType,
                                  blob,
                                  durationSec,
                                  recordedAtIso: new Date().toISOString(),
                                });
                                if (saved.ok) {
                                  if (customStoryVoiceUrlRef.current) {
                                    URL.revokeObjectURL(customStoryVoiceUrlRef.current);
                                  }
                                  const nextUrl = URL.createObjectURL(blob);
                                  customStoryVoiceUrlRef.current = nextUrl;
                                  setCustomStoryVoiceUrl(nextUrl);
                                  setCustomStoryVoiceDuration(durationSec);
                                  showKidsToast(`Saved Mama/Papa voice note (${durationSec}s) offline!`);
                                } else {
                                  showKidsToast(saved.error || 'Could not save voice recording.');
                                }
                              };
                              storyVoiceRecorderRef.current = recorder;
                              recorder.start();
                              setIsRecordingStoryVoice(true);
                            } catch {
                              showKidsToast('Microphone permission denied. Allow mic access to record your voice.');
                            }
                          }}
                          className={`px-3 min-h-[38px] rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 transition ${
                            isRecordingStoryVoice
                              ? 'bg-rose-600 text-white animate-pulse'
                              : canRecordFamilyStoryVoice(user)
                              ? 'bg-amber-400 text-emerald-950 hover:bg-amber-300'
                              : 'bg-[var(--bg-surface)] border border-amber-300 dark:border-amber-700/50 text-amber-950 dark:text-amber-200'
                          }`}
                        >
                          {isRecordingStoryVoice ? (
                            <>
                              <Square className="w-3 h-3 fill-current" />
                              <span>Stop & Save</span>
                            </>
                          ) : canRecordFamilyStoryVoice(user) ? (
                            <>
                              <Mic className="w-3.5 h-3.5" />
                              <span>{customStoryVoiceUrl ? 'Re-record' : 'Record Voice'}</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3 text-amber-700 dark:text-amber-300" />
                              <span>Record Voice</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#FEF3C7] dark:bg-amber-950/40 p-3.5 text-xs text-amber-950 dark:text-amber-200 flex items-center gap-2.5">
                    <CharacterAvatar character="Mizo" size="sm" />
                    <div>
                      <strong>Moral Lesson:</strong> {activeLocalizedMoral}
                    </div>
                  </div>

                  {/* Interactive End-of-Story Comprehension Quiz + Moral Promise */}
                  {isLastStoryPage && activeQuiz && (
                    <div className="rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-3.5 space-y-2.5">
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                        Quick Story Check (Earn +5 ★)
                      </p>
                      <p className="text-xs font-extrabold text-[var(--text-primary)]">
                        {activeQuiz.question}
                      </p>
                      <div className="space-y-1.5">
                        {activeQuiz.options.map((opt, idx) => {
                          const isPicked = storyQuizPicked === idx;
                          const isCorrect = idx === activeQuiz.correctIndex;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setStoryQuizPicked(idx);
                                if (isCorrect) {
                                  playGentleCelebrationChime('star');
                                } else {
                                  playGentleCelebrationChime('tap');
                                }
                              }}
                              className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs font-bold min-h-[42px] transition ${
                                isPicked
                                  ? isCorrect
                                    ? 'bg-emerald-50 dark:bg-emerald-900/50 border-emerald-600 text-emerald-950 dark:text-emerald-100'
                                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200'
                                  : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-amber-300'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {storyQuizPicked !== null && (
                        <p className="text-[11px] font-semibold text-emerald-900 dark:text-emerald-300">
                          {storyQuizPicked === activeQuiz.correctIndex ? '✓ ' : 'Hint: '}
                          {activeQuiz.explanation}
                        </p>
                      )}
                    </div>
                  )}

                  {isLastStoryPage && (
                    <button
                      type="button"
                      onClick={() => {
                        setStoryMoralChecked(true);
                        playGentleCelebrationChime('tap');
                      }}
                      className={`w-full py-3 rounded-xl border text-xs font-extrabold transition min-h-[44px] ${
                        storyMoralChecked
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                          : 'bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                      }`}
                    >
                      {storyMoralChecked
                        ? '★ Moral Understood! Ready to Finish'
                        : 'Tap to Promise: I Will Practice This Lesson Today!'}
                    </button>
                  )}

                  <div className="flex items-center justify-between pt-1 gap-2">
                    <button
                      type="button"
                      disabled={storyPageIdx === 0}
                      onClick={() => {
                        handleStopStoryNarration();
                        setStoryPageIdx((p) => Math.max(0, p - 1));
                      }}
                      className="px-4 py-2.5 min-h-[44px] rounded-full bg-[var(--bg-subtle)] disabled:opacity-40 text-xs font-extrabold text-[var(--text-primary)]"
                    >
                      Previous
                    </button>
                    <span className="text-xs font-extrabold text-[var(--text-secondary)] tabular-nums">
                      Scene {storyPageIdx + 1} of {totalStoryScenes}
                    </span>
                    <button
                      type="button"
                      disabled={isLastStoryPage && !canCompleteStoryNow}
                      onClick={() => {
                        handleStopStoryNarration();
                        if (storyPageIdx + 1 < totalStoryScenes) {
                          setStoryPageIdx((p) => p + 1);
                        } else {
                          const completion = completeKidsStory(
                            activeStory.id,
                            activeLocalizedTitle
                          );
                          playGentleCelebrationChime('lesson_complete');
                          setStoryCelebration({
                            visible: true,
                            title: 'Story Completed!',
                            subtitle: completion.alreadyCompleted
                              ? `Finished rereading "${activeLocalizedTitle}"!`
                              : `MashaAllah ${activeChild.name}! Earned +${completion.starsAwarded} ★`,
                          });
                          window.setTimeout(() => {
                            setStoryCelebration((prev) => ({ ...prev, visible: false }));
                          }, 1800);
                          showKidsToast(
                            completion.alreadyCompleted
                              ? `Finished rereading "${activeLocalizedTitle}"!`
                              : `Finished "${activeLocalizedTitle}"! (+${completion.starsAwarded} ★)`
                          );
                          setActiveStoryId(null);
                          setStoryMoralChecked(false);
                          setStoryChoicePicked(null);
                          setStoryQuizPicked(null);
                        }
                      }}
                      className="px-4 py-2.5 min-h-[44px] rounded-full bg-[#16A34A] disabled:opacity-45 text-white text-xs font-extrabold shadow-xs"
                    >
                      {!isLastStoryPage
                        ? 'Next Scene →'
                        : !canCompleteStoryNow
                        ? 'Answer Quiz Above'
                        : isActiveStoryAlreadyCompleted
                        ? 'Finish Replay ✓'
                        : 'Complete (+5 ★)'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-2.5">
                  {filteredStories.map((story) => {
                    const globalIdx = KIDS_STORIES.findIndex((item) => item.id === story.id);
                    const unlocked = canAccessStoryIndex(user, globalIdx);
                    const isCompleted = Boolean(
                      activeChild.completedStoryIds?.includes(story.id)
                    );
                    const displayTitle = story.localizedTitles?.[user.language] || story.title;
                    const cacheStatus = storyLibrarySummary.storyStatusMap[story.id];
                    const isStoryFullyCached = Boolean(cacheStatus?.isFullyCached);
                    const partialCachedPages = cacheStatus?.cachedPages ?? 0;
                    const totalStoryPages = cacheStatus?.totalPages ?? story.pages.length;

                    return (
                      <div
                        key={story.id}
                        className="relative w-full h-28 rounded-2xl overflow-hidden shadow-md group border border-emerald-950/10"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            handleStopStoryNarration();
                            if (!unlocked) {
                              openKidsPaywall(
                                `Unlock "${displayTitle}" and all ${KIDS_STORIES.length} illustrated Prophet & Companion stories with Family Plus (₹199/yr · 7-Day Free Trial).`
                              );
                              return;
                            }
                            setActiveStoryId(story.id);
                            setStoryPageIdx(0);
                            setStoryMoralChecked(false);
                            setStoryQuizPicked(null);
                          }}
                          className="w-full h-full text-left relative block"
                        >
                          <img
                            src={getStoryCoverArtwork(story)}
                            alt={displayTitle}
                            loading="lazy"
                            decoding="async"
                            className={`absolute inset-0 w-full h-full object-cover transition duration-300 ${
                              unlocked ? 'group-hover:scale-105' : 'grayscale-[40%] opacity-85'
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/15" />
                          <div className="relative z-10 h-full p-4 pr-20 flex items-end justify-between text-white">
                            <div>
                              <p className="text-[11px] font-bold text-amber-300 tabular-nums">
                                {story.category}
                                {STORY_QURAN_VERSES_MAP[story.id] ? ' · Quran Verse' : ''}
                                {isCompleted ? ' · Completed ★' : ''}
                                {unlocked
                                  ? isStoryFullyCached
                                    ? ' · Offline Voice Ready'
                                    : partialCachedPages > 0
                                    ? ` · ${partialCachedPages}/${totalStoryPages} Cached`
                                    : ''
                                  : ' · Family Plus'}
                              </p>
                              <h3 className="text-sm font-extrabold leading-tight max-w-[235px] mt-0.5">
                                {displayTitle}
                              </h3>
                            </div>
                          </div>
                        </button>

                        {unlocked ? (
                          <button
                            type="button"
                            disabled={isPrefetchActive}
                            onClick={() => void handlePrefetchSingleStory(story, globalIdx)}
                            aria-label={
                              isStoryFullyCached
                                ? `${displayTitle} saved offline`
                                : `Save ${displayTitle} offline`
                            }
                            className={`absolute right-3 bottom-3 z-20 min-w-[44px] min-h-[44px] px-2.5 rounded-xl flex items-center justify-center gap-1 text-[11px] font-extrabold backdrop-blur-xs transition ${
                              isStoryFullyCached
                                ? 'bg-emerald-500/90 text-white'
                                : 'bg-black/60 text-amber-200 hover:bg-black/80'
                            }`}
                          >
                            {isStoryFullyCached ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Saved</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>Save</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <div className="absolute right-4 bottom-4 z-20 pointer-events-none">
                            <Lock className="w-4 h-4 text-amber-300" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'adventure_map': {
        const islandPins = [
          {
            num: 8,
            title: 'Stars & Night Journey',
            desc: 'Earn badges & certificates under the night sky',
            route: 'badges' as const,
            top: '18%',
            left: '58%',
            pinBg: 'from-amber-300 to-amber-500 text-emerald-950',
            requiredStars: 15,
          },
          {
            num: 7,
            title: 'Story Village',
            desc: 'Prophet stories & noble character adventures',
            route: 'stories' as const,
            top: '33%',
            left: '28%',
            pinBg: 'from-amber-300 to-amber-500 text-emerald-950',
            requiredStars: 10,
          },
          {
            num: 5,
            title: 'Salah Garden',
            desc: 'Step-by-step Wudu & prayer with Ayaan',
            route: 'salah_learning' as const,
            top: '47%',
            left: '64%',
            pinBg: 'from-emerald-400 to-emerald-600 text-white',
            requiredStars: 5,
          },
          {
            num: 3,
            title: 'Dua Garden',
            desc: 'Daily Sunnah Duas with Ayla',
            route: 'duas_learning' as const,
            top: '60%',
            left: '30%',
            pinBg: 'from-amber-300 to-amber-500 text-emerald-950',
            requiredStars: 0,
          },
          {
            num: 2,
            title: 'Quran Valley',
            desc: 'Learn & recite short Surahs with Ayaan',
            route: 'quran_learning' as const,
            top: '73%',
            left: '66%',
            pinBg: 'from-amber-300 to-amber-500 text-emerald-950',
            requiredStars: 0,
          },
          {
            num: 1,
            title: 'Ilmizo Home',
            desc: 'Your daily 10-minute quest basecamp',
            route: 'kids_home' as const,
            top: '87%',
            left: '42%',
            pinBg: 'from-amber-300 to-amber-500 text-emerald-950',
            requiredStars: 0,
          },
        ];

        const activeIsland = islandPins.find((p) => p.num === selectedIslandNum);

        return (
          <div className="bg-[#0B2838] min-h-[700px] text-white relative overflow-hidden">
            {/* Screen 8: Full-bleed 3D Floating Islands Adventure Map matching Reference */}
            <img
              src="/assets/illustrations/kids_adventure_map.webp"
              alt="Ilmizo Adventure World"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07182E]/90 via-[#07182E]/50 to-transparent" />

            <div className="relative z-10">
              <MobileStatusBar time="9:41" light />
              <div className="flex items-center justify-between px-4 pt-1 pb-2">
                <ScreenBackButton variant="light" label="Back" />
                <div className="text-center">
                  <h1 className="text-base font-extrabold drop-shadow-md">Ilmizo Adventure</h1>
                  <p className="text-[11px] text-sky-100 font-semibold drop-shadow-xs">
                    Explore, learn and unlock new worlds!
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-black/40 border border-amber-300/50 text-amber-300 text-xs font-extrabold flex items-center gap-1 tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{activeChild.stars}</span>
                </div>
              </div>
            </div>

            {/* Interactive 3D Winding Path & Floating Island Pins matching Screen 8 */}
            <div className="relative z-10 h-[590px] w-full">
              {/* Animated Golden S-Curve Winding Trail Connecting Islands 1 -> 2 -> 3 -> 5 -> 7 -> 8 */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <defs>
                  <linearGradient id="adventurePathGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="50%" stopColor="#4ADE80" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 42 87 C 68 82, 72 76, 66 73 C 54 68, 22 65, 30 60 C 38 54, 72 52, 64 47 C 54 41, 20 39, 28 33 C 36 27, 62 24, 58 18"
                  fill="none"
                  stroke="url(#adventurePathGrad)"
                  strokeWidth="1.2"
                  strokeDasharray="2.5 2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: 1, opacity: 0.95 }}
                  transition={{ duration: 1.6, ease: 'easeOut' }}
                />
              </svg>

              {islandPins.map((pin, idx) => {
                const isUnlocked = activeChild.stars >= pin.requiredStars;
                const isSelectedPin = selectedIslandNum === pin.num;
                const mascotForPin: 'Ayaan' | 'Ayla' | 'Mizo' =
                  pin.num === 3 ? 'Ayla' : pin.num === 8 || pin.num === 7 ? 'Mizo' : 'Ayaan';

                return (
                  <motion.button
                    key={pin.num}
                    type="button"
                    onClick={() => setSelectedIslandNum(pin.num)}
                    style={{ top: pin.top, left: pin.left }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2.6 + idx * 0.25,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 group z-20"
                  >
                    <span
                      className={`w-9 h-9 rounded-full bg-gradient-to-b ${pin.pinBg} border-2 ${
                        isSelectedPin ? 'border-amber-200 ring-4 ring-amber-400/60' : 'border-white'
                      } font-extrabold text-xs flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.5)] tabular-nums shrink-0`}
                    >
                      {isUnlocked ? pin.num : <Lock className="w-3.5 h-3.5" />}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#091E3A]/90 border border-amber-300/75 text-white text-[11px] font-extrabold whitespace-nowrap shadow-lg backdrop-blur-xs flex items-center gap-1.5">
                      <span>{pin.title}</span>
                      {isSelectedPin && (
                        <CharacterAvatar character={mascotForPin} size="sm" interactive={false} />
                      )}
                    </span>
                  </motion.button>
                );
              })}

              {/* Selected Island Preview Card */}
              <AnimatePresence>
                {activeIsland && (
                  <motion.div
                    key={activeIsland.num}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="absolute bottom-4 inset-x-4 rounded-3xl bg-[#091E3A]/95 border-2 border-amber-300 p-4 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 z-30"
                  >
                    <div className="flex items-center gap-3">
                      <CharacterAvatar
                        character={activeIsland.num === 3 ? 'Ayla' : 'Mizo'}
                        size="md"
                        mood="happy"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-extrabold text-amber-300">
                            {activeIsland.title}
                          </h3>
                          {activeChild.stars < activeIsland.requiredStars && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300 text-amber-200 text-[11px] font-extrabold">
                              Requires {activeIsland.requiredStars} ★
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-sky-100">{activeIsland.desc}</p>
                      </div>
                    </div>
                    {activeChild.stars >= activeIsland.requiredStars ? (
                      <button
                        type="button"
                        onClick={() => setKidsRoute(activeIsland.route)}
                        className="px-4 py-2 rounded-full bg-[#22C55E] text-emerald-950 font-extrabold text-xs shrink-0 shadow-md"
                      >
                        Enter →
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          showKidsToast(
                            `Earn ${activeIsland.requiredStars - activeChild.stars} more ★ in Today's Quest to unlock ${activeIsland.title}!`
                          );
                          setKidsRoute('todays_quest');
                        }}
                        className="px-3.5 py-2 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-xs shrink-0 shadow-md"
                      >
                        Earn ★ →
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      }

      case 'daily_quiz': {
        const kidsQuiz = QUIZ_PACKS[0];
        const currentQ = kidsQuiz.questions[quizQIdx] || kidsQuiz.questions[0];

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 9: Kids Daily Quiz matching Reference */}
            <MobileStatusBar time="9:41" light={resolvedTheme === 'dark'} />
            <div className="flex items-center justify-between px-4 pt-1 pb-3">
              <ScreenBackButton variant="kids" label="Back" />
              <h1 className="text-base font-extrabold text-[var(--text-primary)]">Daily Quiz</h1>
              <span className="text-xs font-extrabold text-[var(--text-muted)] tabular-nums">
                {quizQIdx + 1}/{kidsQuiz.questions.length}
              </span>
            </div>

            <div className="px-4 space-y-4">
              <div className="w-full h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                <div
                  className="h-full bg-[#16A34A] transition-all"
                  style={{ width: `${((quizQIdx + 1) / kidsQuiz.questions.length) * 100}%` }}
                />
              </div>

              <h2 className="text-base font-extrabold text-[var(--text-primary)] pt-1">{currentQ.prompt}</h2>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = quizSelected === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  const optionLetters = ['A', 'B', 'C', 'D'];
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={quizSelected !== null}
                      onClick={() => {
                        setQuizSelected(idx);
                        if (isCorrect) {
                          setKidsQuizScore((s) => s + 1);
                        } else {
                          addNeedsPracticeItem(
                            currentQ.pillar === 'history' ? 'quran' : currentQ.pillar,
                            `Quiz Review: ${currentQ.prompt}`,
                            currentQ.explanation,
                            'daily_quiz'
                          );
                        }
                      }}
                      className={`w-full rounded-2xl p-3.5 border text-left font-extrabold text-sm flex items-center justify-between shadow-2xs transition ${
                        quizSelected !== null
                          ? isCorrect
                            ? 'bg-[#DCFCE7] dark:bg-emerald-900/50 border-[#22C55E] ring-1 ring-[#22C55E]/40 text-emerald-950 dark:text-emerald-100'
                            : isSelected
                            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200'
                            : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)]'
                          : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-emerald-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-300/60 dark:border-amber-400/35 text-amber-900 dark:text-amber-200 flex items-center justify-center text-xs font-extrabold shrink-0">
                          {optionLetters[idx % optionLetters.length]}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {quizSelected !== null && isCorrect && (
                        <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {quizSelected !== null && (
                <div className="rounded-2xl bg-[#FEF3C7] dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/40 p-3 flex items-center gap-2.5 text-xs text-amber-950 dark:text-amber-200">
                  <CharacterAvatar character="Mizo" size="sm" />
                  <p className="font-bold">{currentQ.explanation}</p>
                </div>
              )}

              <button
                type="button"
                disabled={quizSelected === null}
                onClick={() => {
                  if (quizQIdx + 1 < kidsQuiz.questions.length) {
                    setQuizQIdx((i) => i + 1);
                    setQuizSelected(null);
                  } else {
                    recordQuizAttempt({
                      quizId: kidsQuiz.id,
                      quizTitle: kidsQuiz.title,
                      score: kidsQuizScore,
                      total: kidsQuiz.questions.length,
                      mode: 'kids',
                      childId: activeChild.id,
                    });
                    completeKidsQuestStep('quiz', 'Daily Quiz Completed');
                    setQuizQIdx(0);
                    setQuizSelected(null);
                    setKidsQuizScore(0);
                    setKidsRoute('mission_complete');
                  }
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] disabled:opacity-40 text-white font-extrabold text-sm shadow-md mt-2"
              >
                {quizQIdx + 1 < kidsQuiz.questions.length ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          </div>
        );
      }

      case 'good_deed': {
        const deedPrompts = [
          'Help someone at home today without being asked.',
          'Water a plant or feed birds with kindness.',
          'Put away your toys and books neatly with a smile.',
        ];
        const activeDeedPrompt = deedPrompts[selectedDeedIdx] || deedPrompts[0];

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 10: Today's Good Deed with 3D Ayaan Watering Plant matching Reference */}
            <div className="relative overflow-hidden rounded-b-[28px] bg-[#92400E] text-white shadow-md">
              <MobileStatusBar time="9:41" light />
              <div className="flex items-center justify-between px-4 pt-1 pb-2">
                <ScreenBackButton variant="light" label="Back" />
                <h1 className="text-base font-extrabold">{t('todays_good_deed')}</h1>
                <button
                  type="button"
                  onClick={() => setSelectedDeedIdx((i) => (i + 1) % deedPrompts.length)}
                  className="w-11 h-11 rounded-full bg-black/20 flex items-center justify-center text-amber-200"
                  title="Another Good Deed Idea"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <div className="h-56 w-full">
                <img
                  src="/assets/illustrations/kids_good_deed.webp"
                  alt="Ayaan Watering Plant"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="px-5 pt-5 text-center space-y-4">
              <h2 className="text-lg font-extrabold text-[var(--text-primary)] leading-snug max-w-[260px] mx-auto">
                {activeDeedPrompt}
              </h2>

              <p className="text-[11px] font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-700/40 rounded-xl px-3 py-1.5">
                Parent Hub Verification: Mom or Dad can confirm your Good Deed in Parent Hub!
              </p>

              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    submitKidsGoodDeed(activeDeedPrompt, 'Completed Today’s Good Deed mission.');
                    completeKidsQuestStep('family', 'Today’s Good Deed');
                    showKidsToast('Good Deed sent to Parent Hub for confirmation!');
                    setKidsRoute('mission_complete');
                  }}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md"
                >
                  Mark as Done
                </button>
                <button
                  type="button"
                  onClick={() => setKidsRoute('kids_home')}
                  className="w-full py-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-extrabold text-xs"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        );
      }

      case 'family_challenge': {
        const familyPrompts = [
          'Help set the table for today’s meal.',
          'Recite Dua Before Eating together with your family.',
          'Say Assalamu Alaikum first to everyone at home.',
        ];
        const activeFamilyPrompt = familyPrompts[selectedFamilyIdx] || familyPrompts[0];

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 11: Family Challenge with 3D Ayaan & Father Setting Table matching Reference */}
            <div className="relative overflow-hidden rounded-b-[28px] bg-sky-800 text-white shadow-md">
              <MobileStatusBar time="9:41" light />
              <div className="flex items-center justify-between px-4 pt-1 pb-2">
                <ScreenBackButton variant="light" label="Back" />
                <h1 className="text-base font-extrabold">{t('family_challenge')}</h1>
                <button
                  type="button"
                  onClick={() => setSelectedFamilyIdx((i) => (i + 1) % familyPrompts.length)}
                  className="w-11 h-11 rounded-full bg-black/20 flex items-center justify-center text-amber-200"
                  title="Switch Family Challenge"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <div className="h-56 w-full">
                <img
                  src="/assets/illustrations/kids_family_challenge.webp"
                  alt="Family Challenge"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="px-5 pt-6 text-center space-y-5">
              <h2 className="text-lg font-extrabold text-[var(--text-primary)] leading-snug max-w-[250px] mx-auto">
                {activeFamilyPrompt}
              </h2>

              <button
                type="button"
                onClick={() => {
                  submitKidsGoodDeed(
                    `Family Challenge: ${activeFamilyPrompt}`,
                    'Completed with family'
                  );
                  completeKidsQuestStep('family', 'Family Challenge');
                  showKidsToast('MashaAllah! Family Challenge recorded!');
                  setKidsRoute('mission_complete');
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md"
              >
                I Did It!
              </button>

              <div className="rounded-2xl bg-[#FEF3C7] dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/40 p-3.5 text-xs text-amber-950 dark:text-amber-200 font-bold flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-300 shrink-0" />
                <span>
                  <strong>Tip:</strong> A small act of kindness can make a big difference.
                </span>
              </div>
            </div>
          </div>
        );
      }

      case 'mission_complete':
        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 12: Mission Complete with 3 Stars & 3D Ayaan + Ayla matching Reference */}
            <div className="relative overflow-hidden rounded-b-[32px] bg-[#0F3826] text-white shadow-lg">
              <MobileStatusBar time="9:41" light />
              <div className="flex items-center justify-between px-4 pt-1 pb-2 relative z-10">
                <ScreenBackButton variant="light" label="Back" />
                <h1 className="text-base font-extrabold">Mission Complete</h1>
                <div className="w-11 h-11" />
              </div>
              <div className="h-56 w-full relative">
                <img
                  src="/assets/illustrations/kids_mission_complete.webp"
                  alt="Mission Complete"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-app)] via-transparent to-transparent" />
              </div>
            </div>

            <div className="px-5 pt-2 text-center space-y-4">
              {/* Interactive Celebrating Trio: Ayaan, Ayla & Mizo */}
              <div className="flex items-center justify-center gap-3 -mt-8 relative z-20">
                <CharacterAvatar character="Ayaan" size="md" mood="celebrating" />
                <CharacterAvatar character="Mizo" size="lg" mood="celebrating" />
                <CharacterAvatar character="Ayla" size="md" mood="celebrating" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              >
                <h1 className="text-2xl font-extrabold text-[#14532D] dark:text-emerald-300">MashaAllah!</h1>
                <h2 className="text-xl font-extrabold text-[var(--text-primary)]">Mission Complete!</h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  You completed {completedStepsCount} of 5 learning activities today ({activeChild.stars} ★ total).
                </p>
              </motion.div>

              <div className="inline-flex items-center gap-3 rounded-2xl bg-[var(--bg-surface)] border border-amber-200 dark:border-amber-700/40 px-5 py-3 shadow-2xs">
                <Trophy className="w-7 h-7 text-amber-500" />
                <div className="text-left">
                  <p className="text-base font-extrabold text-[var(--text-primary)] tabular-nums">
                    {activeChild.activeMinutesToday} min
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">active learning</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setKidsRoute('kids_progress')}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md"
                >
                  See What I Learned →
                </button>
                <button
                  type="button"
                  onClick={() => setKidsRoute('kids_home')}
                  className="w-full py-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-extrabold text-xs"
                >
                  Keep Exploring
                </button>
              </div>
            </div>
          </div>
        );

      case 'kids_progress': {
        const periodStats = aggregateKidsProgressByPeriod({
          child: activeChild,
          learningEvents,
          period: progressRange,
        });
        const confirmedDeedsCount = periodStats.confirmedDeedsCount;

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 13: My Progress (Kids) matching Reference */}
            <MobileStatusBar time="9:41" light={resolvedTheme === 'dark'} />
            <div className="flex items-center justify-between px-4 pt-1 pb-3">
              <ScreenBackButton variant="kids" label="Back" />
              <h1 className="text-base font-extrabold text-[var(--text-primary)]">My Progress</h1>
              <button
                type="button"
                onClick={() => setKidsRoute('needs_practice')}
                className="w-11 h-11 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center"
                title="Needs Practice"
              >
                <RefreshCw className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="px-4 space-y-4">
              <div className="grid grid-cols-3 gap-1 bg-[var(--bg-subtle)] p-1 rounded-full">
                {(['Week', 'Month', 'All Time'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setProgressRange(r)}
                    className={`py-1.5 rounded-full text-xs font-extrabold transition ${
                      progressRange === r
                        ? 'bg-[#16A34A] text-white shadow-2xs'
                        : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* 3 Circular Pillar Medallions matching Screen 13 */}
              <div className="grid grid-cols-3 gap-2.5 text-center pt-1">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-b from-sky-200 to-sky-400 border-2 border-amber-300 shadow-sm flex items-center justify-center text-sky-950">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <p className="text-xs font-extrabold text-[var(--text-primary)] mt-1.5">Quran</p>
                  <p className="text-[11px] text-[var(--text-secondary)] tabular-nums">
                    {periodStats.quranCount} lessons
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 border-2 border-amber-300 shadow-sm flex items-center justify-center text-amber-950">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <p className="text-xs font-extrabold text-[var(--text-primary)] mt-1.5">Duas</p>
                  <p className="text-[11px] text-[var(--text-secondary)] tabular-nums">
                    {periodStats.duasCount} practiced
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-b from-emerald-200 to-emerald-400 border-2 border-amber-300 shadow-sm flex items-center justify-center text-emerald-950">
                    <Award className="w-7 h-7" />
                  </div>
                  <p className="text-xs font-extrabold text-[var(--text-primary)] mt-1.5">Salah</p>
                  <p className="text-[11px] text-[var(--text-secondary)] tabular-nums">
                    {periodStats.salahCount} lessons
                  </p>
                </div>
              </div>

              {/* Good Deeds & Sync Status Summary */}
              <div className="rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold text-[var(--text-primary)]">
                    Good Deeds Confirmed by Parent: {confirmedDeedsCount}/{activeChild.goodDeeds.length}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Streak: {activeChild.streakDays} days · Total Stars: {activeChild.stars} ★ · {periodStats.activeDaysInPeriod} active day(s) in {progressRange}
                  </p>
                </div>
                <SyncStatusBadge />
              </div>

              <div className="space-y-2 pt-1">
                <h3 className="text-xs font-extrabold text-[var(--text-primary)]">Recent Activity</h3>
                <div className="bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)] divide-y divide-[var(--divider)] shadow-2xs overflow-hidden">
                  {activeChild.recentActivities.map((act, idx) => (
                    <div key={act.id} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CharacterAvatar
                          character={
                            idx % 3 === 0 ? 'Ayaan' : idx % 3 === 1 ? 'Ayla' : 'Mizo'
                          }
                          size="sm"
                        />
                        <div>
                          <p className="text-xs font-extrabold text-[var(--text-primary)]">{act.title}</p>
                          <p className="text-[11px] text-[var(--text-muted)] capitalize">{act.pillar}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-[var(--text-muted)] font-bold">{act.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'needs_practice': {
        const unresolved = activeChild.needsPractice.filter((np) => !np.resolved);
        const firstItem = unresolved[0];

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 14: Let's Practice! with 3D Ayla Illustration matching Reference */}
            <MobileStatusBar time="9:41" light={resolvedTheme === 'dark'} />
            <div className="flex items-center justify-between px-4 pt-1 pb-2">
              <ScreenBackButton variant="kids" label="Back" />
              <h1 className="text-base font-extrabold text-[var(--text-primary)]">{t('lets_practice')}</h1>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 text-xs font-extrabold tabular-nums">
                {unresolved.length}
              </span>
            </div>

            <div className="px-4 pt-2 text-center space-y-4">
              <motion.div
                onClick={() =>
                  triggerAyaanInteraction(
                    'Every time we practice a tricky verse, Allah gives us double reward!'
                  )
                }
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative rounded-3xl overflow-hidden border border-pink-200/80 dark:border-pink-800/45 shadow-sm h-52 cursor-pointer"
                title="Tap Ayla for encouragement!"
              >
                <img
                  src="/assets/illustrations/kids_needs_practice_ayla.webp"
                  alt="Ayla Let's Practice"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-[var(--bg-surface)]/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-sm border border-pink-200 dark:border-pink-800/50">
                  <CharacterAvatar character="Ayla" size="sm" mood="happy" />
                  <span className="text-[11px] font-extrabold text-rose-900 dark:text-rose-200">
                    Tap Ayla for a tip!
                  </span>
                </div>
              </motion.div>

              {firstItem ? (
                <>
                  <p className="text-sm font-extrabold text-[var(--text-primary)] max-w-[260px] mx-auto leading-relaxed">
                    You had some mistakes in <strong>{firstItem.title}</strong>. Let’s practice this one more time!
                  </p>
                  <div className="space-y-2 text-left">
                    {unresolved.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl bg-[var(--bg-surface)] p-3 border border-amber-200 dark:border-amber-700/40 flex items-center justify-between gap-2"
                      >
                        <div>
                          <p className="text-xs font-extrabold text-[var(--text-primary)]">{item.title}</p>
                          <p className="text-[11px] text-[var(--text-secondary)]">{item.prompt}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            resolveNeedsPracticeItem(item.id);
                            setKidsRoute(item.targetRoute);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#16A34A] text-white text-xs font-extrabold shrink-0"
                        >
                          Practice
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        resolveNeedsPracticeItem(firstItem.id);
                        setKidsRoute(firstItem.targetRoute);
                      }}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md"
                    >
                      Practice Now
                    </button>
                    <button
                      type="button"
                      onClick={() => setKidsRoute('kids_home')}
                      className="w-full py-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-extrabold text-xs"
                    >
                      Maybe Later
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm font-extrabold text-emerald-950 dark:text-emerald-200">
                    MashaAllah! You practiced all your tricky items. Let’s review Surah Al-Ikhlas together!
                  </p>
                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setKidsRoute('quran_learning')}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md"
                    >
                      Practice Now
                    </button>
                    <button
                      type="button"
                      onClick={() => setKidsRoute('kids_home')}
                      className="w-full py-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-extrabold text-xs"
                    >
                      Maybe Later
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      }

      case 'badges': {
        const inspectedBadge =
          KIDS_BADGES_CATALOG.find((b) => b.id === selectedBadgeId) || KIDS_BADGES_CATALOG[0];
        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
            {/* Screen 15: My Badges matching Reference */}
            <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 shadow-md">
              <MobileStatusBar time="9:41" light />
              <div className="flex items-center justify-between px-4 pt-1 pb-3">
                <ScreenBackButton variant="light" label="Back" />
                <h1 className="text-base font-extrabold">{t('my_badges')}</h1>
                <Trophy className="w-5 h-5 text-amber-300" />
              </div>

              <div className="mx-4 grid grid-cols-2 gap-1.5 bg-black/25 p-1 rounded-full">
                {(['Badges', 'Certificates'] as const).map((tabName) => (
                  <button
                    key={tabName}
                    type="button"
                    onClick={() => {
                      setBadgeTab(tabName);
                      if (tabName === 'Certificates') setKidsRoute('certificate');
                    }}
                    className={`py-1.5 rounded-full text-xs font-extrabold transition ${
                      badgeTab === tabName
                        ? 'bg-amber-400 text-emerald-950 shadow-2xs'
                        : 'text-emerald-100/85 hover:text-white'
                    }`}
                  >
                    {tabName}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 pt-5 space-y-4">
              <div className="grid grid-cols-3 gap-2.5">
                {KIDS_BADGES_CATALOG.map((badge) => {
                  const earned = activeChild.earnedBadgeIds.includes(badge.id);
                  return (
                    <Kids3DMetallicBadge
                      key={badge.id}
                      badgeId={badge.id}
                      title={badge.title}
                      earned={earned}
                      selected={selectedBadgeId === badge.id}
                      onClick={() => setSelectedBadgeId(badge.id)}
                    />
                  );
                })}
              </div>

              {inspectedBadge && (
                <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <CharacterAvatar character="Mizo" size="sm" />
                    <div>
                      <p className="text-xs font-extrabold text-[var(--text-primary)]">
                        {inspectedBadge.title}
                      </p>
                      <p className="text-[11px] text-[var(--text-secondary)]">{inspectedBadge.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 shrink-0">
                    {activeChild.earnedBadgeIds.includes(inspectedBadge.id)
                      ? 'Unlocked ★'
                      : 'Keep Learning'}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setKidsRoute('certificate')}
                  className="py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>My Certificate</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('parent')}
                  className="py-3.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[#14532D] dark:text-emerald-300 font-extrabold text-xs shadow-2xs flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Parent Hub</span>
                </button>
              </div>
            </div>
          </div>
        );
      }

      case 'certificate': {
        const achievementsList = getChildCertificateAchievements(activeChild.completedSurahs);
        const activeCertTitle =
          achievementsList[certAchievementIdx % achievementsList.length] || 'Surah Al-Ikhlas';

        return (
          <div className="pb-24 bg-[#0F3826] min-h-full text-white">
            {/* Screen 16: Certificate (Share / Print) matching Reference */}
            <MobileStatusBar time="9:41" light />
            <div className="flex items-center justify-between px-4 pt-1 pb-3">
              <ScreenBackButton variant="light" label="Back" />
              <h1 className="text-base font-extrabold">Certificate</h1>
              <button
                type="button"
                onClick={() => setCertAchievementIdx((i) => i + 1)}
                className="px-3.5 py-2 min-h-[40px] rounded-full border border-white/40 text-xs font-bold"
              >
                Switch
              </button>
            </div>

            <div className="px-4 pt-1 space-y-4">
              {/* Ornate Golden Certificate Frame matching Screen 16 */}
              <div className="rounded-3xl bg-[#FFFDF7] border-[5px] border-[#D4AF37] p-5 text-center text-slate-900 shadow-2xl space-y-2.5 relative overflow-hidden">
                <div className="inline-block text-sm font-extrabold text-[#14532D] tracking-wider">
                  iLMiZO <span className="text-amber-500">KIDS</span>
                </div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Certificate of Achievement
                </h2>
                <p className="text-xs text-slate-500">This is to celebrate that</p>
                <p className="text-2xl font-extrabold text-[#14532D]">{activeChild.name}</p>
                <p className="text-xs text-slate-500">has completed</p>
                <p className="text-lg font-extrabold text-slate-900">{activeCertTitle}</p>
                <p className="text-[11px] text-slate-600 max-w-[230px] mx-auto leading-relaxed">
                  With effort, sincerity and love for Allah. May Allah accept and increase you in knowledge and Iman.
                </p>
                <div className="flex items-end justify-between pt-3">
                  <CharacterAvatar character={activeChild.avatar} size="lg" />
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-slate-600">
                      Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <p className="text-[11px] text-amber-700 font-bold inline-flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Verified Ilmizo Seal ({activeChild.stars} ★)</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: `${activeChild.name}'s Ilmizo Certificate`,
                          text: `MashaAllah! ${activeChild.name} completed ${activeCertTitle} on Ilmizo Kids!`,
                        })
                        .catch(() => {});
                    } else {
                      showKidsToast(`Copied ${activeChild.name}'s certificate summary!`);
                    }
                  }}
                  className="py-2.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] border border-white/15 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#14532D] dark:text-emerald-300" />
                  <span>Share</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadCertificateSvg(activeCertTitle)}
                  className="py-2.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] border border-white/15 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#14532D] dark:text-emerald-300" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="py-2.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] border border-white/15 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-[#14532D] dark:text-emerald-300" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  if (isKidsScreenTimeLocked) {
    const effectiveLimitMinutes =
      Math.max(1, activeChild.dailyGoalMinutes || 10) +
      Math.max(0, activeChild.extraMinutesGrantedToday || 0);
    const usedSeconds =
      typeof activeChild.activeSecondsToday === 'number'
        ? activeChild.activeSecondsToday
        : Math.round((activeChild.activeMinutesToday || 0) * 60);
    const usedMins = Math.floor(usedSeconds / 60);
    const resetHour = user.kidsDailyResetHour ?? 0;
    const resetTimeLabel =
      resetHour === 0
        ? '12:00 AM (Midnight)'
        : resetHour < 12
        ? `${resetHour}:00 AM`
        : resetHour === 12
        ? '12:00 PM (Noon)'
        : `${resetHour - 12}:00 PM`;

    const handleLockPinDigit = (digit: string) => {
      setLockErrorMsg(null);
      if (lockPinDigits.length >= 4) return;
      const nextPin = lockPinDigits + digit;
      setLockPinDigits(nextPin);
      if (nextPin.length === 4) {
        void unlockKidsScreenTimeAsync(nextPin, lockUnlockAction).then((res) => {
          if (res.ok) {
            setLockPinDigits('');
            setLockErrorMsg(null);
            showKidsToast(
              lockUnlockAction === 'grant_10m'
                ? 'Parent unlocked +10 extra minutes!'
                : lockUnlockAction === 'grant_15m'
                ? 'Parent unlocked +15 extra minutes!'
                : 'Parent unlocked Kids World for today!'
            );
          } else {
            setLockErrorMsg(res.error || 'Incorrect Parent PIN.');
            window.setTimeout(() => setLockPinDigits(''), 320);
          }
        });
      }
    };

    const handleLockRecoveryReset = () => {
      setLockRecoveryMsg(null);
      void resetParentPinWithRecoveryCodeAsync(lockRecoveryCodeInput, lockRecoveryNewPin).then(
        (res) => {
          if (!res.ok) {
            setLockRecoveryMsg({
              ok: false,
              text: res.error || 'Recovery verification failed.',
            });
            return;
          }
          setLockRecoveryMsg({
            ok: true,
            text: 'Parent PIN reset! Enter your new 4-digit PIN above to unlock.',
          });
          setLockRecoveryCodeInput('');
          setLockRecoveryNewPin('');
          setShowLockRecovery(false);
        }
      );
    };

    const handleRedeemVoucher = () => {
      setLockVoucherMsg(null);
      void redeemParentTimeVoucherAsync(lockVoucherInput).then((res) => {
        if (!res.ok) {
          setLockVoucherMsg({
            ok: false,
            text: res.error || 'Could not redeem time voucher.',
          });
          return;
        }
        setLockVoucherInput('');
        setShowLockVoucher(false);
        showKidsToast(
          res.action === 'grant_10m'
            ? 'Time Voucher redeemed: +10 extra minutes!'
            : res.action === 'grant_15m'
            ? 'Time Voucher redeemed: +15 extra minutes!'
            : 'Time Voucher redeemed: Unlocked for today!'
        );
      });
    };

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="kids-screen-time-lock-title"
        className="min-h-dvh flex-1 flex flex-col justify-between bg-[#0F3826] text-white p-5 select-none"
      >
        <MobileStatusBar time="9:41" light />

        <div className="space-y-4 my-auto py-2">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border-2 border-amber-300/60 flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-8 h-8 text-amber-300" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-[11px] font-extrabold text-amber-200 uppercase tracking-wider">
              Parent Screen-Time Lock Active
            </span>
            <h1 id="kids-screen-time-lock-title" className="text-xl font-extrabold text-white">
              Great Job Today, {activeChild.name}!
            </h1>
            <p className="text-xs text-emerald-100/90 leading-relaxed max-w-xs mx-auto">
              You have reached today’s Kids World learning time limit ({usedMins}m / {effectiveLimitMinutes}m used). Time to rest your eyes, play offline, or ask a parent to unlock more time.
            </p>
            <p className="text-[11px] text-amber-200/90 font-semibold">
              Automatically resets daily at {resetTimeLabel}
            </p>
          </div>

          {/* Unlock Duration Selector */}
          <div className="rounded-2xl bg-white/10 border border-white/15 p-3 space-y-2">
            <p className="text-[11px] font-bold text-emerald-100 text-center">
              Parent: Choose action & enter 4-digit Parent PIN
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'grant_10m' as const, label: '+10 Mins' },
                { id: 'grant_15m' as const, label: '+15 Mins' },
                { id: 'unlock_today' as const, label: 'Unlock Today' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setLockUnlockAction(opt.id);
                    setLockErrorMsg(null);
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold transition ${
                    lockUnlockAction === opt.id
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-white/10 text-white hover:bg-white/15'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* 4-Dot PIN Indicator */}
            <div className="flex justify-center gap-3 py-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 transition ${
                    lockPinDigits.length > i
                      ? 'bg-amber-300 border-amber-300 scale-110'
                      : 'border-white/50 bg-transparent'
                  }`}
                />
              ))}
            </div>

            {lockErrorMsg && (
              <p className="text-xs font-bold text-rose-300 text-center bg-rose-950/50 border border-rose-400/30 rounded-xl py-1.5 px-2">
                {lockErrorMsg}
              </p>
            )}

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2 pt-1 max-w-[250px] mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleLockPinDigit(digit)}
                  className="h-11 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-base font-extrabold text-white transition"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setLockPinDigits('');
                  setLockErrorMsg(null);
                }}
                className="h-11 rounded-2xl bg-white/10 hover:bg-white/20 text-[11px] font-bold text-emerald-100"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => handleLockPinDigit('0')}
                className="h-11 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-base font-extrabold text-white transition"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => setLockPinDigits((p) => p.slice(0, -1))}
                className="h-11 rounded-2xl bg-white/10 hover:bg-white/20 text-[11px] font-bold text-emerald-100"
              >
                ⌫
              </button>
            </div>
          </div>

          {/* Recovery Code Reset Toggle */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setShowLockRecovery((v) => !v);
                setLockRecoveryMsg(null);
              }}
              className="text-xs font-bold text-amber-200 underline underline-offset-2"
            >
              {showLockRecovery ? 'Hide Recovery Code Reset' : 'Forgot Parent PIN? Use Recovery Code'}
            </button>
          </div>

          {lockRecoveryMsg && (
            <div
              className={`rounded-xl p-2.5 text-xs font-bold text-center ${
                lockRecoveryMsg.ok
                  ? 'bg-emerald-900/70 border border-emerald-400/40 text-emerald-100'
                  : 'bg-rose-950/70 border border-rose-400/40 text-rose-200'
              }`}
            >
              {lockRecoveryMsg.text}
            </div>
          )}

          {showLockRecovery && (
            <div className="rounded-2xl bg-white/10 border border-white/20 p-3.5 space-y-2.5 text-left">
              <p className="text-xs font-extrabold text-amber-200">
                Reset Parent PIN with Saved Recovery Code
              </p>
              <p className="text-[11px] text-emerald-100/90 leading-relaxed">
                Enter the recovery code (e.g. <span className="font-mono">ILMZ-XXXX-XXXX</span>) saved when configuring your Parent PIN. Without either the PIN or recovery code, a local browser storage reset is required.
              </p>
              <input
                type="text"
                value={lockRecoveryCodeInput}
                onChange={(e) => setLockRecoveryCodeInput(e.target.value.toUpperCase())}
                placeholder="ILMZ-XXXX-XXXX"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/25 text-xs font-mono text-white placeholder:text-slate-400"
              />
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={lockRecoveryNewPin}
                onChange={(e) => setLockRecoveryNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="New 4-digit PIN"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/25 text-xs font-mono text-white placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={handleLockRecoveryReset}
                className="w-full py-2.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs"
              >
                Verify Recovery Code & Reset PIN
              </button>
            </div>
          )}

          {/* Single-Use Offline Parent Time Voucher Redemption */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => {
                setShowLockVoucher((v) => !v);
                setLockVoucherMsg(null);
              }}
              className="text-xs font-bold text-emerald-200 underline underline-offset-2"
            >
              {showLockVoucher ? 'Hide Parent Time Voucher' : 'Have a Parent Time Voucher Code?'}
            </button>
          </div>

          {lockVoucherMsg && (
            <div
              className={`rounded-xl p-2.5 text-xs font-bold text-center ${
                lockVoucherMsg.ok
                  ? 'bg-emerald-900/70 border border-emerald-400/40 text-emerald-100'
                  : 'bg-rose-950/70 border border-rose-400/40 text-rose-200'
              }`}
            >
              {lockVoucherMsg.text}
            </div>
          )}

          {showLockVoucher && (
            <div className="rounded-2xl bg-white/10 border border-white/20 p-3.5 space-y-2.5 text-left">
              <p className="text-xs font-extrabold text-emerald-200">
                Redeem Single-Use Parent Time Voucher
              </p>
              <p className="text-[11px] text-emerald-100/90 leading-relaxed">
                Enter the one-time code issued from Parent Hub (e.g.{' '}
                <span className="font-mono">ILMZ-10M-XXXXXX-YYYYYYYY</span>) to grant extra time for {activeChild.name}.
              </p>
              <input
                type="text"
                value={lockVoucherInput}
                onChange={(e) => setLockVoucherInput(e.target.value.toUpperCase())}
                placeholder="ILMZ-10M-XXXXXX-YYYYYYYY"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/25 text-xs font-mono text-white placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={handleRedeemVoucher}
                disabled={!lockVoucherInput.trim()}
                className="w-full py-2.5 rounded-xl bg-emerald-400 disabled:opacity-40 text-slate-950 font-extrabold text-xs"
              >
                Verify & Redeem Time Voucher
              </button>
            </div>
          )}
        </div>

        {/* Exit to Adult Mode + Honest Browser Disclosure */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={() => setMode('adult')}
            className="w-full py-3 rounded-2xl bg-[var(--bg-surface)] text-[#14532D] dark:text-emerald-300 border border-white/15 font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Exit Kids World to Adult Mode</span>
          </button>
          <p className="text-xs text-emerald-200/80 text-center leading-relaxed">
            App usage controls: enforces daily time limits inside Ilmizo. For full device-level locking, pair with iOS Screen Time or Android Family Link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      {...kidsSwipeHandlers}
      className="relative min-h-dvh flex-1 flex flex-col bg-[var(--bg-app)] text-[var(--text-primary)] touch-pan-y"
    >
      {/* Floating Kids Toast Confirmation */}
      {kidsToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#14532D] text-amber-200 border border-amber-300 px-4 py-2 rounded-full shadow-lg text-xs font-extrabold flex items-center gap-2 max-w-[90vw]">
          <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="truncate">{kidsToast}</span>
        </div>
      )}

      <div
        className="flex-1 will-change-transform"
        style={{
          transform: kidsSwipeFeedback.offsetX
            ? `translateX(${kidsSwipeFeedback.offsetX}px)`
            : undefined,
          transition: kidsSwipeFeedback.swiping
            ? 'none'
            : 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={kidsRoute}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.17, ease: 'easeOut' }}
            className="flex-1 flex flex-col"
          >
            {renderKidsScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Kids Bottom Navigation — Clean 5-Tab Structure (Home · Qaida · Stories · Map · Stars) */}
      <nav
        aria-label="Kids World Navigation"
        className="sticky bottom-0 left-0 right-0 z-30 bg-[var(--bg-surface)]/95 backdrop-blur-md border-t border-[var(--border-subtle)] px-2 pt-1.5 pb-safe shadow-[0_-6px_20px_rgba(0,0,0,0.08)]"
      >
        <div className="grid grid-cols-5 items-center max-w-2xl mx-auto">
          {[
            {
              id: 'kids_home',
              label: t('home'),
              icon: Home,
              match: [
                'kids_home',
                'todays_quest',
                'good_deed',
                'family_challenge',
                'mission_complete',
              ],
            },
            {
              id: 'quran_learning',
              label: 'Qaida',
              icon: BookOpen,
              match: ['quran_learning', 'recitation_practice', 'duas_learning', 'salah_learning'],
            },
            {
              id: 'stories',
              label: 'Stories',
              icon: Sparkles,
              match: ['stories'],
            },
            {
              id: 'adventure_map',
              label: 'Map',
              icon: Compass,
              match: ['adventure_map'],
            },
            {
              id: 'kids_progress',
              label: 'Stars',
              icon: Trophy,
              match: ['kids_progress', 'needs_practice', 'daily_quiz', 'badges', 'certificate'],
            },
          ].map((nav) => {
            const Icon = nav.icon;
            const active = nav.match.includes(kidsRoute);
            return (
              <button
                key={nav.id}
                type="button"
                onClick={() => setKidsRoute(nav.id as any)}
                aria-current={active ? 'page' : undefined}
                className="flex flex-col items-center justify-center py-0.5 min-h-[52px] transition active:scale-95"
              >
                <div
                  className={`px-3.5 py-1.5 rounded-2xl flex flex-col items-center justify-center transition ${
                    active
                      ? 'bg-[#16A34A]/15 dark:bg-emerald-500/20 text-[#15803D] dark:text-emerald-300 font-extrabold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span className="text-[11px] font-bold mt-0.5 whitespace-nowrap leading-none">
                    {nav.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      <CelebrationBurst
        visible={storyCelebration.visible}
        title={storyCelebration.title}
        subtitle={storyCelebration.subtitle}
      />

      <FamilyPlusPaywallModal
        open={kidsPaywallOpen}
        onClose={() => setKidsPaywallOpen(false)}
        triggerReason={kidsPaywallReason}
        onUnlocked={(msg) => showKidsToast(msg)}
      />

      <SleepTimerSheet
        open={kidsSleepSheetOpen}
        onClose={() => setKidsSleepSheetOpen(false)}
        title="Bedtime Sleep Timer"
      />
    </div>
  );
};
