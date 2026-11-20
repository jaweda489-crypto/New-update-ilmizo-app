import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Bookmark,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Copy,
  Download,
  Eye,
  EyeOff,
  FileText,
  HardDrive,
  Heart,
  Home,
  Info,
  List,
  Loader2,
  Lock,
  MapPin,
  Mic,
  MoreHorizontal,
  Moon,
  Pause,
  Play,
  Plus,
  Repeat,
  RotateCcw,
  Search,
  Settings,
  Share2,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  Square,
  Sun,
  Trash2,
  User,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useIlmizo, useTranslation } from '../../context/IlmizoContext';
import {
  ALL_114_SURAHS,
  getSurahOfflineAvailability,
  getSurahPayload,
  resolveReciterConfig,
} from '../../data/quranData';
import { getCachedPrayerTimings, saveCachedPrayerTimings } from '../../services/localDatabase';
import { OfflineQuranSearchResult, searchOfflineQuran } from '../../services/quranOfflineManager';
import { audioDownloadManager } from '../../services/audioDownloadManager';
import { syncNativePrayerWidget } from '../../services/capacitorNativeBridge';
import {
  ASMA_UL_HUSNA,
  ISLAMIC_LESSONS,
  SALAH_STEPS,
  SEERAH_TIMELINE,
  VERIFIED_DUAS,
  WUDU_STEPS,
} from '../../data/islamicContent';
import { AsmaUlHusnaItem, AyahItem, PrayerName, PrayerStatus, SurahPayload } from '../../types/ilmizo';
import {
  ALL_30_JUZ_BOUNDARIES,
  computeSalahHistoricalSummary,
  createEmptySalahDayRecord,
  getLocalDateKeyWithOffset,
  parseHifzAyahRange,
  PRAYER_CALCULATION_METHODS,
  resolveAyahIndexByNumber,
} from '../../engines/adultLearningEngines';
import {
  CharacterAvatar,
  MobileStatusBar,
  ScreenBackButton,
  VerifiedSourceFooter,
} from '../pwa/PWAComponents';
import { audioManager, useAudioManager } from '../../services/audioManager';
import { useQuranAudioSync } from '../../hooks/useQuranAudioSync';
import {
  AdultBottomNav,
  computeNextPrayerState,
  formatRevisionReference,
} from './AdultDesignSystem';
import { AdultHomeDashboard } from './AdultHomeDashboard';
import { ADULT_ROUTE_ORDER, useSwipeNavigation } from '../../hooks/useSwipeNavigation';
import {
  InteractiveTajweedAyahView,
  NativeApkAndAzanNotificationStudio,
  QuranAdvancedAudioPlayerBar,
  QuranJournalScreen,
  SalahCompleteGuideAndExcusedPanel,
  WordByWordHifzRevealPanel,
} from './Phase7To11Widgets';
import { SpecialModulesHub, SpecialModuleId } from './SpecialModulesHub';
import { SurahMemorizationCheckCard } from './SurahMemorizationCheckCard';
import {
  playHumanDuaAudio,
  resolveDuaHumanAudio,
} from '../../services/humanDuaAndQaidaAudio';
import {
  FREE_CUSTOM_HIFZ_LIMIT,
  canAccessWordByWordHifzStudio,
  canAddCustomHifzPlan,
  canUseAiTajweedCheck,
  isAdultPlusActive,
  recordAiTajweedUsagePatch,
} from '../../services/subscriptionEngine';
import { FamilyPlusPaywallModal } from '../shared/FamilyPlusPaywallModal';
import {
  AiTajweedFeedbackResult,
  analyzeRecitationWithAiTajweed,
} from '../../services/studioAudioAndTajweedService';
import { pickSupportedAudioMimeType } from '../../services/storyVoiceRecorder';
import { QuranMushafView } from './QuranMushafView';
import {
  loadQuranReaderPreferences,
  QuranReaderViewMode,
  saveQuranReaderPreferences,
} from '../../services/mushafPaginationEngine';
import {
  formatAyahTextForScript,
  getArabicScriptFontClass,
  useQuranScriptStyle,
} from '../../services/quranScriptEngine';
import { triggerSelectionHaptic } from '../../services/hapticsService';
import { BottomSheet } from '../sheets/BottomSheet';
import { SelectSheetField } from '../sheets/SelectSheet';
import {
  InfoDisclosure,
  ScreenSkeleton,
  SkeletonList,
  ThemeModeSegmentedControl,
} from '../design-system/IlmizoPrimitives';
import { BookmarkPopButton, SalahStatusButton } from '../feedback/AdultMicroInteractions';
import { KhatamPlannerCard } from './KhatamPlannerModal';
import { OemBatteryGuardSheet } from './OemBatteryGuardSheet';
import { useSeniorMinimalMode } from '../../services/seniorModeService';
import type { CustomReminderAyahPayload } from './SpecialModulesHub';

const AdultCalendarScreen = lazy(() =>
  import('./AdultExtraScreens').then((m) => ({ default: m.AdultCalendarScreen }))
);
const AdultLessonsScreen = lazy(() =>
  import('./AdultExtraScreens').then((m) => ({ default: m.AdultLessonsScreen }))
);
const AdultMoreSettingsScreen = lazy(() =>
  import('./AdultExtraScreens').then((m) => ({ default: m.AdultMoreSettingsScreen }))
);
const AdultProfileScreen = lazy(() =>
  import('./AdultExtraScreens').then((m) => ({ default: m.AdultProfileScreen }))
);
const AdultProgressScreen = lazy(() =>
  import('./AdultExtraScreens').then((m) => ({ default: m.AdultProgressScreen }))
);
const AdultQiblaScreen = lazy(() =>
  import('./AdultExtraScreens').then((m) => ({ default: m.AdultQiblaScreen }))
);
const AdultQuizzesScreen = lazy(() =>
  import('./AdultExtraScreens').then((m) => ({ default: m.AdultQuizzesScreen }))
);
const AdultTasbihScreen = lazy(() =>
  import('./AdultExtraScreens').then((m) => ({ default: m.AdultTasbihScreen }))
);
const AdultTasksAndExpensesScreen = lazy(() =>
  import('./AdultExtraScreens').then((m) => ({ default: m.AdultTasksAndExpensesScreen }))
);

export interface Names99QuizOption {
  number: number;
  transliteration: string;
  meaning: string;
  isCorrect: boolean;
}

export interface Names99QuizQuestion {
  target: AsmaUlHusnaItem;
  options: Names99QuizOption[];
}

export function build99NamesQuizQuestion(
  allNames: AsmaUlHusnaItem[],
  targetIdx: number,
  randomFn?: () => number
): Names99QuizQuestion {
  const safeList = allNames.length > 0 ? allNames : ASMA_UL_HUSNA;
  const normalizedIdx = ((targetIdx % safeList.length) + safeList.length) % safeList.length;
  const target = safeList[normalizedIdx];

  // Collect 3 distinct distractors from the full 99-name dataset (preventing duplicate meanings or numbers)
  const pool = safeList.filter(
    (item) => item.number !== target.number && item.meaning !== target.meaning
  );
  const distractors: AsmaUlHusnaItem[] = [];
  const usedMeanings = new Set<string>([target.meaning]);
  const usedNumbers = new Set<number>([target.number]);

  if (randomFn) {
    const candidates = [...pool];
    while (distractors.length < 3 && candidates.length > 0) {
      const pickIdx = Math.floor(randomFn() * candidates.length) % candidates.length;
      const picked = candidates.splice(pickIdx, 1)[0];
      if (!usedMeanings.has(picked.meaning) && !usedNumbers.has(picked.number)) {
        distractors.push(picked);
        usedMeanings.add(picked.meaning);
        usedNumbers.add(picked.number);
      }
    }
  } else {
    // Deterministic well-distributed step across the full 99 names when no randomFn is supplied
    const offsets = [17, 41, 67, 29, 53, 83];
    for (const off of offsets) {
      if (distractors.length >= 3) break;
      const candidate = pool[(normalizedIdx * 13 + off) % pool.length];
      if (
        candidate &&
        !usedMeanings.has(candidate.meaning) &&
        !usedNumbers.has(candidate.number)
      ) {
        distractors.push(candidate);
        usedMeanings.add(candidate.meaning);
        usedNumbers.add(candidate.number);
      }
    }
    for (const candidate of pool) {
      if (distractors.length >= 3) break;
      if (!usedMeanings.has(candidate.meaning) && !usedNumbers.has(candidate.number)) {
        distractors.push(candidate);
        usedMeanings.add(candidate.meaning);
        usedNumbers.add(candidate.number);
      }
    }
  }

  const rawOptions: Names99QuizOption[] = [
    {
      number: target.number,
      transliteration: target.transliteration,
      meaning: target.meaning,
      isCorrect: true,
    },
    ...distractors.map((d) => ({
      number: d.number,
      transliteration: d.transliteration,
      meaning: d.meaning,
      isCorrect: false,
    })),
  ];

  // Shuffle answer positions for every question
  const options = [...rawOptions];
  if (randomFn) {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(randomFn() * (i + 1)) % (i + 1);
      [options[i], options[j]] = [options[j], options[i]];
    }
  } else {
    // Rotate/permute deterministically by target index so answer position varies across questions 0..98
    const targetSlot = (normalizedIdx * 3 + 1) % options.length;
    const correctOpt = options[0];
    options.splice(0, 1);
    options.splice(targetSlot, 0, correctOpt);
  }

  return {
    target,
    options,
  };
}

export function validate99NamesQuizAnswer(
  target: AsmaUlHusnaItem,
  selectedOption: Pick<Names99QuizOption, 'number' | 'meaning'> | null | undefined
): boolean {
  if (!selectedOption) return false;
  return (
    selectedOption.number === target.number &&
    selectedOption.meaning === target.meaning
  );
}

export const AdultModeView: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const {
    mode,
    adultRoute,
    setAdultRoute,
    setMode,
    user,
    themeMode,
    setThemeMode,
    updateUser,
    autoPlayRecitation,
    toggleAutoPlayRecitation,
    openSurahForReading,
    dailyVerseActivity,
    recordVerseRead,
    selectedSurahNumber,
    bookmarks,
    toggleBookmark,
    recentlyOpenedSurahs,
    hifzPlans,
    updateHifzProgress,
    addHifzPlan,
    resetHifzPlan,
    canUndoHifz,
    undoLastHifzAction,
    revisionItems,
    recordRevisionAttempt,
    salahRecords,
    togglePrayerStatus,
    setPrayerStatusExplicit,
    favoriteDuaIds,
    toggleFavoriteDua,
    seerahMilestoneIds,
    toggleSeerahMilestone,
    completedLessonIds,
    recordQuizAttempt,
    personalNotes,
    addPersonalNote,
    deletePersonalNote,
    studiedNames99Numbers,
    markName99Studied,
    storageMetrics,
    downloadSurahOffline,
    deleteOfflineSurah,
    isAudioMuted,
    toggleAudioMute,
    registerSubScreenBackHandler,
  } = useIlmizo();

  const { t, resolveText, isRTL, language, setLanguage, supportedLanguages } = useTranslation();

  const {
    feedback: swipeFeedback,
    swipeHandlers,
  } = useSwipeNavigation({
    routes: ADULT_ROUTE_ORDER,
    activeRoute: adultRoute,
    onSelectRoute: setAdultRoute,
    isRTL,
  });

  // Global toast message for copy/share/save actions
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2600);
  };
  const [adultPaywallOpen, setAdultPaywallOpen] = useState(false);
  const [adultPaywallReason, setAdultPaywallReason] = useState<string | undefined>(undefined);
  const openAdultPaywall = (reason: string) => {
    setAdultPaywallReason(reason);
    setAdultPaywallOpen(true);
  };

  // Quran Surah List & Reader Mode state
  const [quranTab, setQuranTab] = useState<'Surah' | 'Juz' | 'Bookmarks'>('Surah');
  const [readerViewMode, setReaderViewMode] = useState<QuranReaderViewMode>(
    () => loadQuranReaderPreferences().viewMode
  );
  const [adultScriptStyle, setAdultScriptStyle] = useQuranScriptStyle();
  const [activeSpecialModule, setActiveSpecialModule] = useState<SpecialModuleId | null>(null);
  const [customReminderAyah, setCustomReminderAyah] = useState<CustomReminderAyahPayload | null>(null);
  const [seniorMinimalMode, setSeniorMinimalMode] = useSeniorMinimalMode();
  const [batteryGuardOpen, setBatteryGuardOpen] = useState(false);
  const [lessonsTabRequest, setLessonsTabRequest] = useState<{
    tab: 'All' | 'Vocab600';
    nonce: number;
  }>({ tab: 'All', nonce: 0 });

  const openTop600FromHome = () => {
    setLessonsTabRequest((prev) => ({ tab: 'Vocab600', nonce: prev.nonce + 1 }));
    setAdultRoute('lessons');
  };

  const openAyahInReminderStudio = (ayah: AyahItem, surahMeta: { number: number; nameTranslit: string }) => {
    void triggerSelectionHaptic();
    setCustomReminderAyah({
      surahNumber: surahMeta.number,
      surahName: surahMeta.nameTranslit,
      ayahNumber: ayah.numberInSurah,
      arabic: ayah.arabicUthmani,
      transliteration: ayah.transliteration,
      translation: resolveText(ayah.translations, ayah.translations.en),
    });
    setActiveSpecialModule('reminder_cards');
  };

  useEffect(() => {
    const onOpenSpecial = (e: Event) => {
      const custom = e as CustomEvent<SpecialModuleId>;
      if (custom.detail) {
        if (custom.detail !== 'reminder_cards') setCustomReminderAyah(null);
        setActiveSpecialModule(custom.detail);
      }
    };
    window.addEventListener('ilmizo:open-special-module', onOpenSpecial as EventListener);
    return () => {
      window.removeEventListener('ilmizo:open-special-module', onOpenSpecial as EventListener);
    };
  }, []);
  const handleChangeReaderViewMode = (nextMode: QuranReaderViewMode) => {
    setReaderViewMode(nextMode);
    const current = loadQuranReaderPreferences();
    saveQuranReaderPreferences({ ...current, viewMode: nextMode });
    void triggerSelectionHaptic();
  };
  const openTodayInMushaf = (surahNumber: number, ayahNumber: number) => {
    handleChangeReaderViewMode('mushaf');
    openSurahForReading(surahNumber, ayahNumber);
  };
  const [surahSearch, setSurahSearch] = useState('');
  const [offlineVerseMatches, setOfflineVerseMatches] = useState<OfflineQuranSearchResult[]>([]);

  useEffect(() => {
    let active = true;
    if (surahSearch.trim().length < 2) {
      setOfflineVerseMatches([]);
      return;
    }
    searchOfflineQuran(surahSearch, user.language, 12)
      .then((res) => {
        if (active) setOfflineVerseMatches(res);
      })
      .catch(() => {
        if (active) setOfflineVerseMatches([]);
      });
    return () => {
      active = false;
    };
  }, [surahSearch, user.language]);

  // Quran Reading state
  const [surahPayload, setSurahPayload] = useState<SurahPayload | null>(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [activeAyahIdx, setActiveAyahIdx] = useState(0);
  const [repeatAyah, setRepeatAyah] = useState(false);
  const [showTafsir, setShowTafsir] = useState(false);
  const [showVerseNotes, setShowVerseNotes] = useState(false);
  const [newVerseNoteBody, setNewVerseNoteBody] = useState('');
  const showTranslation = user.showTranslation ?? true;
  const setShowTranslation = (next: boolean) => updateUser({ showTranslation: next });
  const [showReaderControls, setShowReaderControls] = useState(false);
  const [downloadingQariSurah, setDownloadingQariSurah] = useState(false);
  const [showAdultTajweedCoach, setShowAdultTajweedCoach] = useState(false);
  const [adultMicActive, setAdultMicActive] = useState(false);
  const [adultRecUrl, setAdultRecUrl] = useState<string | null>(null);
  const [adultHasBlob, setAdultHasBlob] = useState(false);
  const [adultTajweedLoading, setAdultTajweedLoading] = useState(false);
  const [adultTajweedError, setAdultTajweedError] = useState<string | null>(null);
  const [adultTajweedResult, setAdultTajweedResult] = useState<AiTajweedFeedbackResult | null>(
    null
  );
  const adultMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const adultMediaStreamRef = useRef<MediaStream | null>(null);
  const adultAudioChunksRef = useRef<Blob[]>([]);
  const adultRecBlobRef = useRef<Blob | null>(null);
  const adultRecUrlRef = useRef<string | null>(null);
  const audioState = useAudioManager();
  const isPlayingAudio = audioState.status === 'playing' || audioState.status === 'loading';
  const isPausedAudio = audioState.status === 'paused';

  useEffect(() => {
    setAdultTajweedResult(null);
    setAdultTajweedError(null);
    setAdultHasBlob(false);
    adultRecBlobRef.current = null;
    if (adultRecUrlRef.current) {
      try {
        URL.revokeObjectURL(adultRecUrlRef.current);
      } catch {
        // ignore
      }
      adultRecUrlRef.current = null;
    }
    setAdultRecUrl(null);
  }, [selectedSurahNumber, activeAyahIdx]);

  useEffect(() => {
    return () => {
      if (adultMediaRecorderRef.current && adultMediaRecorderRef.current.state !== 'inactive') {
        try {
          adultMediaRecorderRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (adultMediaStreamRef.current) {
        adultMediaStreamRef.current.getTracks().forEach((tr) => tr.stop());
      }
      if (adultRecUrlRef.current) {
        try {
          URL.revokeObjectURL(adultRecUrlRef.current);
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const handleToggleAdultMic = async () => {
    if (adultMicActive) {
      if (adultMediaRecorderRef.current && adultMediaRecorderRef.current.state !== 'inactive') {
        try {
          adultMediaRecorderRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (adultMediaStreamRef.current) {
        adultMediaStreamRef.current.getTracks().forEach((tr) => tr.stop());
        adultMediaStreamRef.current = null;
      }
      setAdultMicActive(false);
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      triggerToast('Microphone recording is not supported on this browser.');
      return;
    }

    audioManager.stopAll();
    setAdultTajweedError(null);
    setAdultTajweedResult(null);
    adultRecBlobRef.current = null;
    setAdultHasBlob(false);
    if (adultRecUrlRef.current) {
      try {
        URL.revokeObjectURL(adultRecUrlRef.current);
      } catch {
        // ignore
      }
      adultRecUrlRef.current = null;
    }
    setAdultRecUrl(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      adultMediaStreamRef.current = stream;
      const mimeType = pickSupportedAudioMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      adultAudioChunksRef.current = [];
      recorder.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) adultAudioChunksRef.current.push(ev.data);
      };
      recorder.onstop = () => {
        const finalType = recorder.mimeType || mimeType || 'audio/webm';
        const blob = new Blob(adultAudioChunksRef.current, { type: finalType });
        adultAudioChunksRef.current = [];
        if (blob.size > 0) {
          adultRecBlobRef.current = blob;
          setAdultHasBlob(true);
          const url = URL.createObjectURL(blob);
          adultRecUrlRef.current = url;
          setAdultRecUrl(url);
        }
        stream.getTracks().forEach((tr) => tr.stop());
      };
      adultMediaRecorderRef.current = recorder;
      recorder.start();
      setAdultMicActive(true);
    } catch {
      triggerToast('Microphone permission denied. Allow mic access to check Tajweed.');
    }
  };

  const handleRunAdultAiTajweed = async (arabicText: string, translit: string) => {
    const blob = adultRecBlobRef.current;
    if (!blob || blob.size < 256) {
      triggerToast('Record your Ayah recitation first!');
      return;
    }
    const todayKey = getLocalDateKeyWithOffset(0, new Date());
    const quota = canUseAiTajweedCheck(user, todayKey);
    if (!quota.allowed) {
      openAdultPaywall(
        'You used all 2 Free daily AI Tajweed checks today. Upgrade to Adult Quran Plus (₹99/yr) or Family Plus (₹199/yr) for unlimited Harakat & Makhraj feedback!'
      );
      return;
    }
    setAdultTajweedLoading(true);
    setAdultTajweedError(null);
    const res = await analyzeRecitationWithAiTajweed({
      audioBlob: blob,
      targetArabic: arabicText,
      targetTransliteration: translit,
      uiLanguage: user.language,
      mode: 'adult',
    });
    setAdultTajweedLoading(false);
    if (res.ok && res.result) {
      updateUser(recordAiTajweedUsagePatch(user, todayKey));
      setAdultTajweedResult(res.result);
    } else {
      setAdultTajweedError(res.error || 'AI Tajweed Coach unavailable.');
    }
  };

  // Hifz state
  const [hifzTab, setHifzTab] = useState<'My Hifz' | 'Revision' | 'Stats'>('My Hifz');
  const [activeRecallBlur, setActiveRecallBlur] = useState(false);
  const [revealedCardIds, setRevealedCardIds] = useState<string[]>([]);
  const [showNewHifzForm, setShowNewHifzForm] = useState(false);
  const [newHifzSurahNum, setNewHifzSurahNum] = useState<number>(67);
  const [newHifzDailyTarget, setNewHifzDailyTarget] = useState<number>(5);
  const [newHifzStartAyah, setNewHifzStartAyah] = useState<number>(1);
  const [newHifzEndAyah, setNewHifzEndAyah] = useState<number>(30);
  const [confirmResetSurahNum, setConfirmResetSurahNum] = useState<number | null>(null);

  // Salah state & Live Prayer Timings (Aladhan API with verified Jamshedpur Karachi-method calculation)
  const [salahSubView, setSalahSubView] = useState<'tracker' | 'prayer_guide' | 'wudu_guide'>('tracker');
  const [showSalahCalcConfig, setShowSalahCalcConfig] = useState(false);
  const [salahDayOffset, setSalahDayOffset] = useState(0);
  const [prayerTimings, setPrayerTimings] = useState<Record<PrayerName, string>>({
    Fajr: '4:52 AM',
    Dhuhr: '12:08 PM',
    Asr: '3:35 PM',
    Maghrib: '5:52 PM',
    Isha: '7:08 PM',
  });
  const [hijriLabel, setHijriLabel] = useState<string>('1448 AH');
  const [isLiveTimingsSynced, setIsLiveTimingsSynced] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    const formatTo12Hr = (raw24: string) => {
      const clean = raw24.split(' ')[0];
      const [hStr, mStr] = clean.split(':');
      const h = Number(hStr);
      const m = Number(mStr);
      if (Number.isNaN(h) || Number.isNaN(m)) return raw24;
      const suffix = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 === 0 ? 12 : h % 12;
      return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
    };

    const rawCity = user.city || 'Jamshedpur';
    const rawCountry = user.country || 'India';
    const city = encodeURIComponent(rawCity);
    const country = encodeURIComponent(rawCountry);
    const method = user.prayerCalculationMethod || 1;
    const school = user.prayerAsrSchool ?? 1;
    const todayDateKey = getLocalDateKeyWithOffset(0, new Date());

    // First hydrate any cached prayer timings from IndexedDB for instant/offline availability
    getCachedPrayerTimings(rawCity, rawCountry, method, school, todayDateKey)
      .then((cached) => {
        if (!active || !cached) return;
        setPrayerTimings(cached.timings);
        if (cached.hijriLabel) {
          setHijriLabel(cached.hijriLabel);
        }
        setIsLiveTimingsSynced(true);
      })
      .catch(() => {});

    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}&school=${school}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (!active || !json?.data?.timings) return;
        const tData = json.data.timings;
        const nextTimings: Record<PrayerName, string> = {
          Fajr: formatTo12Hr(tData.Fajr || '05:12'),
          Dhuhr: formatTo12Hr(tData.Dhuhr || '12:28'),
          Asr: formatTo12Hr(tData.Asr || '16:01'),
          Maghrib: formatTo12Hr(tData.Maghrib || '18:18'),
          Isha: formatTo12Hr(tData.Isha || '19:46'),
        };
        setPrayerTimings(nextTimings);
        let computedHijri = hijriLabel;
        if (json.data?.date?.hijri) {
          const hj = json.data.date.hijri;
          computedHijri = `${hj.day} ${hj.month?.en || ''} ${hj.year} AH`;
          setHijriLabel(computedHijri);
        }
        setIsLiveTimingsSynced(true);
        saveCachedPrayerTimings({
          city: rawCity,
          country: rawCountry,
          method,
          school,
          dateKey: todayDateKey,
          timings: nextTimings,
          hijriLabel: computedHijri,
        }).catch(() => {});
      })
      .catch(() => {
        // Keep cached timings if available
      });

    return () => {
      active = false;
    };
  }, [user.city, user.country, user.prayerCalculationMethod, user.prayerAsrSchool]);

  useEffect(() => {
    void syncNativePrayerWidget({
      city: user.city || 'Jamshedpur',
      hijriDate: hijriLabel,
      prayerTimes: prayerTimings,
    });
  }, [user.city, hijriLabel, prayerTimings]);

  // Duas state
  const [duaTab, setDuaTab] = useState<'Categories' | 'Daily' | 'Favorites'>('Categories');
  const [selectedDuaCategory, setSelectedDuaCategory] = useState<string | null>(null);
  const [duaSearch, setDuaSearch] = useState('');

  // 99 Names state
  const [nameIdx, setNameIdx] = useState(0);
  const [namesViewMode, setNamesViewMode] = useState<'card' | 'list' | 'quiz'>('card');
  const [namesSearch, setNamesSearch] = useState('');
  const [namesQuizIdx, setNamesQuizIdx] = useState(0);
  const [namesQuizSelected, setNamesQuizSelected] = useState<Names99QuizOption | null>(null);
  const [namesQuizScore, setNamesQuizScore] = useState(0);
  const [namesQuizDone, setNamesQuizDone] = useState(false);

  // Seerah state
  const [seerahTab, setSeerahTab] = useState<'Timeline' | 'Stories' | 'Lessons' | 'Map'>('Timeline');
  const [selectedSeerahId, setSelectedSeerahId] = useState<string>(SEERAH_TIMELINE[0]?.id || 'seerah_1');
  const [seerahSearch, setSeerahSearch] = useState('');
  const [seerahLocationFilter, setSeerahLocationFilter] = useState<'All' | 'Makkah' | 'Madinah'>('All');

  // Register sub-screen back handlers for Salah (Prayer/Wudu guide) and Duas (Category detail)
  useEffect(() => {
    if (adultRoute === 'salah' && salahSubView !== 'tracker') {
      registerSubScreenBackHandler(() => {
        setSalahSubView('tracker');
        return true;
      });
      return () => registerSubScreenBackHandler(null);
    }
    if (adultRoute === 'duas' && selectedDuaCategory !== null) {
      registerSubScreenBackHandler(() => {
        setSelectedDuaCategory(null);
        setDuaSearch('');
        return true;
      });
      return () => registerSubScreenBackHandler(null);
    }
    registerSubScreenBackHandler(null);
    return () => registerSubScreenBackHandler(null);
  }, [adultRoute, salahSubView, selectedDuaCategory, registerSubScreenBackHandler]);

  const startPlayback = (audioUrl?: string, arabicText?: string, trackId = 'adult_audio') => {
    const rate = user.playbackRate || 1;
    audioManager.playAudioUrl({
      id: trackId,
      url: audioUrl,
      fallbackText: arabicText,
      fallbackLang: 'ar-SA',
      rate,
      repeat: repeatAyah,
      onError: (msg) => triggerToast(msg),
    });
  };

  useEffect(() => {
    audioManager.setRepeatEnabled(repeatAyah);
  }, [repeatAyah]);

  const [surahReloadTick, setSurahReloadTick] = useState(0);

  // Load Surah payload WITHOUT ever auto-starting audio on mount, Surah switch, or Ayah navigation
  useEffect(() => {
    let mounted = true;
    setLoadingSurah(true);
    audioManager.stopAll();
    getSurahPayload(selectedSurahNumber, user.language, user.reciterName).then((payload) => {
      if (mounted) {
        setSurahPayload(payload);
        const targetAyahNum =
          user.lastRead.surahNumber === selectedSurahNumber ? user.lastRead.ayahNumber : 1;
        const initialIdx = resolveAyahIndexByNumber(payload.ayahs, targetAyahNum);
        setActiveAyahIdx(initialIdx);
        setLoadingSurah(false);
        if (adultRoute === 'quran_read' && payload.ayahs.length > 0 && !payload.offlineUnavailable) {
          const firstAyah = payload.ayahs[initialIdx] || payload.ayahs[0];
          recordVerseRead(payload.meta.number, firstAyah.numberInSurah);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, [selectedSurahNumber, user.language, user.reciterName, surahReloadTick]);

  const speakArabicOrPlayAudio = (audioUrl?: string, arabicText?: string, trackId = 'adult_audio') => {
    if (audioState.status === 'playing' && (!trackId || audioState.activeTrackId === trackId)) {
      audioManager.pause();
      return;
    }
    if (audioState.status === 'paused' && audioState.activeTrackId === trackId) {
      audioManager.resume();
      return;
    }
    startPlayback(audioUrl, arabicText, trackId);
  };

  const playQuranAyahAudio = (
    surahNumber: number,
    ayahNumberInSurah: number,
    globalAyahNumber?: number
  ) => {
    const trackId = `quran_${surahNumber}_${ayahNumberInSurah}`;
    const isSameSurahActive =
      audioState.activeTrackId === trackId ||
      (audioState.quranSequence.surahNumber === surahNumber &&
        audioState.quranSequence.currentAyah === ayahNumberInSurah);

    if (audioState.status === 'playing' && isSameSurahActive) {
      audioManager.pause();
      return;
    }
    if (audioState.status === 'paused' && isSameSurahActive) {
      audioManager.resume();
      return;
    }

    if (repeatAyah) {
      void audioManager.playQariRecitationAyah({
        id: trackId,
        surahNumber,
        ayahNumberInSurah,
        globalAyahNumber,
        reciterName: user.reciterName,
        rate: user.playbackRate || 1,
        repeat: true,
        repeatOption: 'infinite',
        onError: (msg) => triggerToast(msg),
      });
      return;
    }

    // Continuous Surah recitation starting at the selected Ayah -> auto-advances Ayah by Ayah
    void audioManager.playFullSurah({
      surahNumber,
      startFromAyah: ayahNumberInSurah,
      reciterName: user.reciterName,
      rate: user.playbackRate || 1,
      repeatOption: 1,
      onAyahChange: (_sNum, nextAyahNum) => {
        if (!surahPayload || surahPayload.meta.number !== surahNumber) return;
        const nextIdx = surahPayload.ayahs.findIndex((a) => a.numberInSurah === nextAyahNum);
        if (nextIdx >= 0) {
          setActiveAyahIdx(nextIdx);
        }
      },
      onError: (msg) => triggerToast(msg),
    });
  };

  // Unified Quran audio sync: auto-advances active Ayah, triggers subtle @capacitor/haptics
  // on verse transitions, and smoothly auto-scrolls the active Ayah into focus.
  const {
    isAyahHighlighted: isAdultAyahHighlighted,
    registerAyahElement: registerAdultAyahElement,
  } = useQuranAudioSync({
    surahNumber: surahPayload?.meta.number || selectedSurahNumber,
    ayahs: surahPayload?.ayahs || [],
    activeAyahIdx,
    onAyahIndexChange: setActiveAyahIdx,
    enabled: adultRoute === 'quran_read',
    enableHaptics: true,
    autoScroll: true,
  });

  const getDateKeyWithOffset = (offsetDays: number) => {
    return getLocalDateKeyWithOffset(offsetDays, new Date());
  };

  const activeSalahDateKey = getDateKeyWithOffset(salahDayOffset);
  const activeSalahDateLabel = (() => {
    const d = new Date();
    d.setDate(d.getDate() + salahDayOffset);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  })();

  const activeSalahPrayers =
    salahRecords[activeSalahDateKey]?.prayers ||
    createEmptySalahDayRecord(activeSalahDateKey).prayers;

  const fontScaleClass =
    {
      1: 'text-2xl',
      2: 'text-3xl',
      3: 'text-4xl',
      4: 'text-5xl',
    }[user.arabicFontScale] || 'text-3xl';

  const handleCopyText = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    triggerToast(label);
  };

  const renderScreen = () => {
    switch (adultRoute) {
      case 'home': {
        const activeHifzPlan =
          hifzPlans.find((p) => p.surahNumber === user.lastRead.surahNumber) ||
          hifzPlans.find((p) => p.status !== 'completed') ||
          hifzPlans[0];

        if (seniorMinimalMode) {
          return (
            <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
              {/* Calm High-Readability Senior / Minimal Mode Home */}
              <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] px-5 pt-safe pb-6 shadow-md space-y-2">
                <MobileStatusBar time="9:41" light />
                <p className="text-sm font-bold text-amber-300">Assalamu Alaikum, {user.name}</p>
                <h1 className="text-2xl font-black tracking-tight">Daily Worship Essentials</h1>
                <p className="text-sm text-emerald-100/90 tabular-nums">
                  {user.city} · Fajr {prayerTimings.Fajr} · Maghrib {prayerTimings.Maghrib}
                </p>
              </div>

              <div className="px-4 pt-5 space-y-4 max-w-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    onClick={() => openTodayInMushaf(user.lastRead.surahNumber, user.lastRead.ayahNumber)}
                    className="min-h-[108px] rounded-[24px] bg-[#14532D] text-white p-5 text-left shadow-md flex flex-col justify-between active:scale-[0.98] transition"
                  >
                    <BookOpen className="w-8 h-8 text-amber-300" />
                    <div>
                      <p className="text-xl font-black">Read Qur&apos;an</p>
                      <p className="text-sm text-emerald-100 mt-0.5">
                        Continue Surah {user.lastRead.surahNumber} · Large Mushaf
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdultRoute('salah')}
                    className="min-h-[108px] rounded-[24px] bg-[var(--bg-surface)] border-2 border-[#14532D]/30 p-5 text-left shadow-xs flex flex-col justify-between active:scale-[0.98] transition"
                  >
                    <Clock className="w-8 h-8 text-[#14532D] dark:text-amber-300" />
                    <div>
                      <p className="text-xl font-black text-[var(--text-primary)]">Prayer Times</p>
                      <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                        5 Daily Salah & Adhan Guard
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdultRoute('duas')}
                    className="min-h-[108px] rounded-[24px] bg-[var(--bg-surface)] border-2 border-amber-400/50 p-5 text-left shadow-xs flex flex-col justify-between active:scale-[0.98] transition"
                  >
                    <Heart className="w-8 h-8 text-amber-600 dark:text-amber-300" />
                    <div>
                      <p className="text-xl font-black text-[var(--text-primary)]">Daily Duas</p>
                      <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                        Morning, Evening & Healing Adhkar
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdultRoute('tasbih')}
                    className="min-h-[108px] rounded-[24px] bg-[var(--bg-surface)] border-2 border-emerald-500/40 p-5 text-left shadow-xs flex flex-col justify-between active:scale-[0.98] transition"
                  >
                    <Sparkles className="w-8 h-8 text-emerald-700 dark:text-emerald-300" />
                    <div>
                      <p className="text-xl font-black text-[var(--text-primary)]">Tasbih Counter</p>
                      <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                        SubhanAllah · Alhamdulillah · Allahu Akbar
                      </p>
                    </div>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    void triggerSelectionHaptic();
                    setSeniorMinimalMode(false);
                    triggerToast('Switched back to Full Ilmizo Mode');
                  }}
                  className="w-full min-h-[54px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm font-extrabold text-[#14532D] dark:text-emerald-200 active:scale-[0.98] transition"
                >
                  Switch Back to Full Ilmizo Mode
                </button>
              </div>
            </div>
          );
        }

        return (
          <AdultHomeDashboard
            user={user}
            hijriLabel={hijriLabel}
            prayerTimings={prayerTimings}
            activeSalahPrayers={activeSalahPrayers}
            isLiveTimingsSynced={isLiveTimingsSynced}
            activeHifzPlan={activeHifzPlan}
            dailyVerseActivity={dailyVerseActivity}
            onSelectMode={setMode}
            onSelectRoute={(route) => {
              if (route === 'lessons') {
                setLessonsTabRequest((prev) => ({ tab: 'All', nonce: prev.nonce + 1 }));
              }
              setAdultRoute(route);
            }}
            onOpenTop600={openTop600FromHome}
            onContinueReading={() =>
              openSurahForReading(user.lastRead.surahNumber, user.lastRead.ayahNumber)
            }
            onOpenTodayInMushaf={(surahNum, ayahNum) => openTodayInMushaf(surahNum, ayahNum)}
            onOpenSpecialModule={(moduleId) => {
              if (moduleId !== 'reminder_cards') setCustomReminderAyah(null);
              setActiveSpecialModule(moduleId);
            }}
            onOpenProfile={() => setAdultRoute('profile')}
            onOpenProgress={() => setAdultRoute('progress')}
            onToast={triggerToast}
            t={t}
          />
        );
      }

      case 'quran_list': {
        const filteredSurahs = ALL_114_SURAHS.filter(
          (s) =>
            s.nameTranslit.toLowerCase().includes(surahSearch.toLowerCase()) ||
            s.nameEnglish.toLowerCase().includes(surahSearch.toLowerCase()) ||
            String(s.number).includes(surahSearch)
        );

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
            {/* Screen 2: Quran Header */}
            <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 shadow-md">
              <MobileStatusBar time="9:41" light />
              <div className="flex items-center justify-between px-4 pt-1 pb-3">
                <ScreenBackButton variant="dark" />
                <h1 className="text-lg font-extrabold tracking-tight">{t('quran')}</h1>
                <button
                  type="button"
                  onClick={() =>
                    openSurahForReading(user.lastRead.surahNumber, user.lastRead.ayahNumber)
                  }
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-amber-400/20 border border-amber-300/50 flex items-center justify-center text-amber-300 transition active:scale-95"
                  title="Resume Last Read"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>

              {/* Pill Tabs: Surah | Juz | Bookmarks */}
              <div className="mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full">
                {[
                  { id: 'Surah' as const, label: t('surah') },
                  { id: 'Juz' as const, label: t('juz') },
                  { id: 'Bookmarks' as const, label: `${t('bookmarks')} (${bookmarks.length})` },
                ].map((tabItem) => (
                  <button
                    key={tabItem.id}
                    type="button"
                    onClick={() => setQuranTab(tabItem.id)}
                    className={`min-h-[38px] py-1.5 rounded-full text-xs font-extrabold transition ${
                      quranTab === tabItem.id
                        ? 'bg-amber-400 text-emerald-950 shadow-xs'
                        : 'text-emerald-100 hover:bg-white/10'
                    }`}
                  >
                    {tabItem.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 pt-3 space-y-3">
              {/* Daily Khatam-ul-Qur'an Goal Planner Card */}
              {quranTab === 'Surah' && !surahSearch.trim() && (
                <KhatamPlannerCard
                  onOpenTodayInMushaf={(surahNum, ayahNum) => openTodayInMushaf(surahNum, ayahNum)}
                  onToast={triggerToast}
                />
              )}

              {/* Search Bar (Surah name, number, 2:255 ref, or offline verse text) */}
              <div className="relative">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={surahSearch}
                  onChange={(e) => setSurahSearch(e.target.value)}
                  placeholder="Search Surah, 2:255 ref, Arabic, or translation..."
                  className="w-full min-h-[44px] rounded-full ilmizo-input pl-10 pr-4 py-2.5 text-xs font-medium shadow-2xs"
                />
              </div>

              {/* Offline Verse Search Matches */}
              {surahSearch.trim().length >= 2 && offlineVerseMatches.length > 0 && (
                <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 space-y-2 shadow-2xs">
                  <p className="text-xs font-extrabold text-[#14532D] dark:text-amber-300 uppercase tracking-wider">
                    Matching Verses in Offline Quran ({offlineVerseMatches.length})
                  </p>
                  <div className="divide-y divide-[var(--divider)] max-h-56 overflow-y-auto">
                    {offlineVerseMatches.map((m) => (
                      <button
                        key={`${m.surahNumber}_${m.ayahNumberInSurah}`}
                        type="button"
                        onClick={() => openSurahForReading(m.surahNumber, m.ayahNumberInSurah)}
                        className="w-full py-2.5 text-left hover:bg-[var(--bg-elevated)] px-2 rounded-xl transition space-y-0.5"
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
                          <span>
                            {m.surahNumber}. {m.surahNameTranslit} · Ayah {m.ayahNumberInSurah} (Juz{' '}
                            {m.juzNumber})
                          </span>
                          <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                            {m.matchedField}
                          </span>
                        </div>
                        <p className="font-arabic text-base text-[var(--text-primary)] text-right" dir="rtl">
                          {m.arabicUthmani}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                          {m.translationSnippet}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recently Opened & Last Read Strip */}
              {quranTab === 'Surah' && !surahSearch && recentlyOpenedSurahs.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {recentlyOpenedSurahs.map((sNum) => {
                    const sMeta = ALL_114_SURAHS.find((s) => s.number === sNum);
                    if (!sMeta) return null;
                    const isLastRead = user.lastRead.surahNumber === sNum;
                    return (
                      <button
                        key={sNum}
                        type="button"
                        onClick={() =>
                          openSurahForReading(
                            sNum,
                            isLastRead ? user.lastRead.ayahNumber : 1
                          )
                        }
                        className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap border transition flex items-center gap-1.5 ${
                          isLastRead
                            ? 'bg-[#14532D] text-amber-200 border-[#14532D] dark:border-amber-400/40 shadow-2xs'
                            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-emerald-700'
                        }`}
                      >
                        <span>
                          {sMeta.number}. {sMeta.nameTranslit}
                        </span>
                        {isLastRead && (
                          <span className="text-[11px] text-amber-300 font-bold">
                            · Ayah {user.lastRead.ayahNumber}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {quranTab === 'Bookmarks' ? (
                <div className="space-y-2">
                  {bookmarks.length === 0 ? (
                    <div className="rounded-3xl bg-[var(--bg-surface)] p-8 text-center border border-[var(--border-subtle)]">
                      <p className="text-xs font-bold text-[var(--text-secondary)]">
                        No verses bookmarked yet. Tap the Bookmark icon while reading any Surah.
                      </p>
                    </div>
                  ) : (
                    bookmarks.map((bm) => (
                      <div
                        key={bm.id}
                        className="w-full text-left rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] flex items-center justify-between gap-2"
                      >
                        <button
                          type="button"
                          onClick={() => openSurahForReading(bm.surahNumber, bm.ayahNumber)}
                          className="flex-1 text-left"
                        >
                          <p className="text-sm font-bold text-[var(--text-primary)]">
                            {bm.surahName} · Ayah {bm.ayahNumber}
                          </p>
                          <p className="font-arabic text-lg text-[var(--text-secondary)] mt-0.5">
                            {bm.arabicSnippet}
                          </p>
                        </button>
                        <BookmarkPopButton
                          saved
                          onToggle={() =>
                            toggleBookmark({
                              surahNumber: bm.surahNumber,
                              surahName: bm.surahName,
                              ayahNumber: bm.ayahNumber,
                              arabicSnippet: bm.arabicSnippet,
                            })
                          }
                        />
                      </div>
                    ))
                  )}
                </div>
              ) : quranTab === 'Juz' ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {ALL_30_JUZ_BOUNDARIES.map((juzInfo) => {
                    const endSurahMeta = ALL_114_SURAHS.find(
                      (s) => s.number === juzInfo.endSurahNumber
                    );
                    return (
                      <button
                        key={juzInfo.juz}
                        type="button"
                        onClick={() =>
                          openSurahForReading(juzInfo.startSurahNumber, juzInfo.startAyahNumber)
                        }
                        className="rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] hover:border-emerald-700 dark:hover:border-amber-400/50 text-left transition"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-[var(--text-primary)] tabular-nums">
                            Juz {juzInfo.juz}
                          </p>
                          <span className="font-arabic text-sm text-amber-700 dark:text-amber-300 font-bold">
                            {juzInfo.nameArabic}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] font-semibold mt-0.5">
                          {juzInfo.startSurahName} · Ayah {juzInfo.startAyahNumber}
                        </p>
                        <p className="text-[11px] text-[var(--text-muted)]">
                          Ends: {endSurahMeta?.nameTranslit || `Surah ${juzInfo.endSurahNumber}`}{' '}
                          {juzInfo.endAyahNumber}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)] divide-y divide-[var(--divider)] shadow-xs overflow-hidden">
                  {filteredSurahs.map((surah) => {
                    const hasBookmark = bookmarks.some((b) => b.surahNumber === surah.number);
                    const isLastRead = user.lastRead.surahNumber === surah.number;
                    const offlineState = getSurahOfflineAvailability(
                      surah.number,
                      storageMetrics.downloadedSurahNumbers,
                      storageMetrics.cachedSurahNumbers
                    );
                    const isDownloadedIdb = storageMetrics.downloadedSurahNumbers.includes(
                      surah.number
                    );
                    const offlineStatusLabel =
                      offlineState === 'bundled_full'
                        ? 'Bundled Offline'
                        : offlineState === 'downloaded'
                        ? 'Saved Offline'
                        : offlineState === 'bundled_partial'
                        ? 'Key Verses Offline'
                        : offlineState === 'cached'
                        ? 'Cached'
                        : '';
                    return (
                      <div
                        key={surah.number}
                        className="w-full px-4 py-3 hover:bg-[var(--bg-elevated)] transition flex items-center justify-between gap-2.5"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openSurahForReading(
                              surah.number,
                              isLastRead ? user.lastRead.ayahNumber : 1
                            )
                          }
                          className="flex items-center gap-3 flex-1 text-left min-w-0"
                        >
                          <span className="w-6 text-xs font-bold text-[var(--text-muted)] tabular-nums shrink-0">
                            {surah.number}
                          </span>
                          <span className="font-arabic text-xl text-[#14532D] dark:text-amber-300 font-bold w-16 text-center shrink-0">
                            {surah.nameArabic}
                          </span>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                                {surah.nameTranslit}
                              </h3>
                              {isLastRead && (
                                <span className="text-[11px] font-extrabold text-[#14532D] dark:text-amber-300">
                                  · Last Read
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[var(--text-secondary)] truncate">
                              {surah.nameEnglish}
                            </p>
                            <p className="text-[11px] text-[var(--text-muted)] tabular-nums">
                              {surah.ayahCount} ayahs · {surah.revelationType}
                              {offlineStatusLabel ? ` · ${offlineStatusLabel}` : ''}
                            </p>
                          </div>
                        </button>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {offlineState !== 'bundled_full' && (
                            <button
                              type="button"
                              onClick={async () => {
                                if (isDownloadedIdb) {
                                  await deleteOfflineSurah(surah.number);
                                  triggerToast(
                                    `Removed offline download for ${surah.nameTranslit}`
                                  );
                                } else {
                                  const res = await downloadSurahOffline(surah.number);
                                  triggerToast(
                                    res.ok
                                      ? `Saved ${surah.nameTranslit} on this device for offline reading`
                                      : res.error || 'Unable to download Surah while offline'
                                  );
                                }
                              }}
                              className={`min-w-[40px] min-h-[40px] rounded-xl border flex items-center justify-center transition ${
                                isDownloadedIdb
                                  ? 'bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/50'
                                  : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[#14532D] dark:hover:text-amber-300'
                              }`}
                              title={
                                isDownloadedIdb
                                  ? `Saved offline (${surah.nameTranslit}) — Tap to remove download`
                                  : `Download ${surah.nameTranslit} for offline reading`
                              }
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                          <BookmarkPopButton
                            saved={hasBookmark}
                            onToggle={() => {
                              toggleBookmark({
                                surahNumber: surah.number,
                                surahName: surah.nameTranslit,
                                ayahNumber: 1,
                                arabicSnippet: surah.nameArabic,
                              });
                              triggerToast(
                                hasBookmark
                                  ? `Removed ${surah.nameTranslit} bookmark`
                                  : `Bookmarked ${surah.nameTranslit}`
                              );
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'quran_read': {
        const currentAyah = surahPayload?.ayahs[activeAyahIdx] || surahPayload?.ayahs[0];
        const isBookmarked =
          currentAyah &&
          bookmarks.some(
            (b) =>
              b.surahNumber === selectedSurahNumber && b.ayahNumber === currentAyah.numberInSurah
          );

        return (
          <div className="pb-24 min-h-full transition-colors bg-[var(--bg-app)] text-[var(--text-primary)]">
            {/* Screen 3: Ornamental Quran Reading View */}
            <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white pb-3 shadow-md">
              <MobileStatusBar time="9:31" light />
              <div className="flex items-center justify-between gap-2 px-3.5 pt-1">
                <ScreenBackButton variant="dark" />
                <div className="text-center min-w-0 flex-1">
                  <div className="flex items-center justify-center gap-1">
                    <SelectSheetField
                      title="Select Surah"
                      subtitle="Jump to any of the 114 Surahs"
                      ariaLabel="Switch Surah"
                      variant="dark-pill"
                      searchable
                      searchPlaceholder="Search Surah name or number…"
                      className="max-w-[185px] sm:max-w-[225px]"
                      value={String(selectedSurahNumber)}
                      onChange={(val) => {
                        audioManager.stopAll();
                        openSurahForReading(Number(val), 1);
                      }}
                      options={ALL_114_SURAHS.map((s) => ({
                        value: String(s.number),
                        label: `${s.number}. ${s.nameTranslit}`,
                        subtitle: `${s.nameEnglish} · ${s.nameArabic}`,
                        badge: `${s.ayahCount} ayahs`,
                      }))}
                    />
                  </div>
                  <p className="text-xs text-emerald-200 tabular-nums truncate">
                    {currentAyah?.mushafPage ? `Page ${currentAyah.mushafPage} · ` : ''}
                    Juz {currentAyah?.juzNumber || surahPayload?.meta.juz || 1}
                    {surahPayload?.offlineSourceType === 'bundled_full'
                      ? ' · Bundled'
                      : surahPayload?.offlineSourceType === 'downloaded_idb'
                      ? ' · Saved Offline'
                      : surahPayload?.offlineSourceType === 'cached_idb'
                      ? ' · Cached'
                      : surahPayload?.isPartialOfflineBundle
                      ? ' · Key Verses'
                      : ''}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {surahPayload &&
                    surahPayload.offlineSourceType !== 'bundled_full' &&
                    surahPayload.offlineSourceType !== 'downloaded_idb' && (
                      <button
                        type="button"
                        onClick={async () => {
                          const res = await downloadSurahOffline(selectedSurahNumber);
                          triggerToast(
                            res.ok
                              ? `Saved Surah ${selectedSurahNumber} on this device for offline reading`
                              : res.error || 'Unable to download Surah while offline'
                          );
                          if (res.ok) {
                            setSurahReloadTick((t) => t + 1);
                          }
                        }}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-amber-300 transition"
                        title="Save full Surah on this device for offline reading"
                      >
                        <HardDrive className="w-4 h-4" />
                      </button>
                    )}
                  {/* Global Audio Mute Toggle */}
                  <button
                    type="button"
                    onClick={toggleAudioMute}
                    aria-pressed={isAudioMuted}
                    className={`px-2.5 h-10 rounded-full flex items-center gap-1 text-xs font-extrabold border transition ${
                      !isAudioMuted
                        ? 'bg-white/15 text-emerald-100 border-white/20 hover:bg-white/25'
                        : 'bg-rose-500/25 text-rose-200 border-rose-400/40'
                    }`}
                    title={
                      isAudioMuted
                        ? 'Audio is Muted — Tap to Unmute'
                        : 'Audio Sound On — Tap to Mute'
                    }
                  >
                    {!isAudioMuted ? (
                      <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                    )}
                    <span className="hidden xs:inline">{!isAudioMuted ? 'Sound' : 'Muted'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReaderControls(true)}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20 transition"
                    title="Reader Settings, Qari Reciter & Appearance"
                    aria-label="Open Reader Settings and Reciter Selector"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Native BottomSheet for Quran Reader Settings & Qari Reciter Selector */}
            <BottomSheet
              open={showReaderControls}
              onClose={() => setShowReaderControls(false)}
              title="Reader Settings & Reciter"
              subtitle="Customize Arabic script size, Qari audio, playback speed, and appearance."
            >
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-extrabold text-[var(--text-secondary)]">Appearance</p>
                  <ThemeModeSegmentedControl value={themeMode} onChange={setThemeMode} compact />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-[var(--text-primary)]">Arabic Script Size</span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((scale) => (
                      <button
                        key={scale}
                        type="button"
                        onClick={() => updateUser({ arabicFontScale: scale })}
                        className={`min-w-[40px] min-h-[38px] px-2.5 rounded-xl font-extrabold text-xs border transition ${
                          user.arabicFontScale === scale
                            ? 'bg-[#14532D] text-amber-300 border-[#14532D]'
                            : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                        }`}
                      >
                        {scale === 1 ? 'A-' : scale === 4 ? 'A+' : `${scale}x`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-[var(--text-primary)]">Audio Speed</span>
                  <div className="flex items-center gap-1.5">
                    {([0.75, 1, 1.25, 1.5] as const).map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => updateUser({ playbackRate: rate })}
                        className={`min-h-[38px] px-2.5 rounded-xl font-extrabold text-xs tabular-nums border transition ${
                          (user.playbackRate || 1) === rate
                            ? 'bg-[#14532D] text-amber-300 border-[#14532D]'
                            : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-extrabold text-[var(--text-primary)]">Qari Reciter</p>
                  <div className="space-y-1.5">
                    {[
                      { id: 'Mishary Rashid Alafasy', edition: 'ar.alafasy', style: 'Murattal · Balanced pace' },
                      { id: 'Abdul Basit Abdus Samad', edition: 'ar.abdulbasitmurattal', style: 'Classic Murattal' },
                      { id: 'Abdur-Rahman as-Sudais', edition: 'ar.abdurrahmaansudais', style: 'Haramain · Clear articulation' },
                      { id: 'Mahmoud Khalil Al-Husary', edition: 'ar.husary', style: 'Tajweed teacher pace' },
                    ].map((qari) => {
                      const selected = (user.reciterName || 'Mishary Rashid Alafasy') === qari.id;
                      return (
                        <button
                          key={qari.id}
                          type="button"
                          onClick={() => {
                            updateUser({ reciterName: qari.id });
                            triggerToast(`Reciter switched to ${qari.id}`);
                          }}
                          className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-2xl border text-left flex items-center justify-between gap-2 transition ${
                            selected
                              ? 'bg-[#14532D] text-white border-[#D4AF37]'
                              : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[#14532D]/50'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-extrabold">{qari.id}</p>
                            <p className={`text-[11px] ${selected ? 'text-emerald-200' : 'text-[var(--text-muted)]'}`}>
                              {qari.style}
                            </p>
                          </div>
                          {selected && <Check className="w-4 h-4 text-amber-300 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--divider)]">
                  <div>
                    <p className="text-xs font-extrabold text-[var(--text-primary)]">Offline Qari Audio</p>
                    <p className="text-[11px] text-[var(--text-muted)]">Save Surah {selectedSurahNumber} on device</p>
                  </div>
                  {(() => {
                    const activeReciterCfg = resolveReciterConfig(user.reciterName);
                    const audioKey = `${activeReciterCfg.editionId}:${selectedSurahNumber}`;
                    const isQariDownloaded = storageMetrics.downloadedAudioKeys.includes(audioKey);
                    return isQariDownloaded ? (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                        Saved Offline
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={downloadingQariSurah}
                        onClick={async () => {
                          setDownloadingQariSurah(true);
                          triggerToast(
                            `Downloading ${activeReciterCfg.label} audio for Surah ${selectedSurahNumber}...`
                          );
                          const res = await audioDownloadManager.downloadSurahQariAudio({
                            surahNumber: selectedSurahNumber,
                            reciterName: activeReciterCfg.id,
                          });
                          setDownloadingQariSurah(false);
                          triggerToast(
                            res.ok
                              ? `Saved ${activeReciterCfg.label} audio for Surah ${selectedSurahNumber} offline!`
                              : res.error || 'Could not download Qari audio.'
                          );
                        }}
                        className="min-h-[40px] px-3.5 rounded-xl bg-amber-400 text-emerald-950 font-extrabold text-xs flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{downloadingQariSurah ? 'Downloading…' : 'Download'}</span>
                      </button>
                    );
                  })()}
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--divider)]">
                  <span className="text-xs font-extrabold text-[var(--text-primary)]">Translation Display</span>
                  <button
                    type="button"
                    onClick={() => setShowTranslation(!showTranslation)}
                    className={`min-h-[40px] px-3.5 rounded-xl font-extrabold text-xs border transition ${
                      showTranslation
                        ? 'bg-[#14532D] text-amber-200 border-[#14532D]'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                    }`}
                  >
                    {showTranslation ? 'Shown' : 'Hidden'}
                  </button>
                </div>
              </div>
            </BottomSheet>

            <div className="p-3.5">
              {loadingSurah ? (
                <div className="space-y-3" aria-busy="true" aria-label="Loading Surah">
                  <SkeletonList count={4} />
                </div>
              ) : surahPayload && (surahPayload.offlineUnavailable || surahPayload.ayahs.length === 0) ? (
                <div
                  className={`rounded-3xl border-2 border-[#D4AF37] p-6 text-center shadow-md space-y-4 ${
                    user.darkMode ? 'bg-[#0B291C] text-white' : 'bg-[#FFFDF7] text-slate-900'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-amber-500">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-[11px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-300">
                      Offline Mode — Not Saved on Device
                    </span>
                    <h2 className="text-lg font-extrabold">
                      Surah {surahPayload.meta.number}: {surahPayload.meta.nameTranslit} ({surahPayload.meta.nameEnglish})
                    </h2>
                    <p
                      className={`text-xs leading-relaxed max-w-xs mx-auto ${
                        user.darkMode ? 'text-emerald-100/90' : 'text-slate-600'
                      }`}
                    >
                      Surah {surahPayload.meta.nameTranslit} ({surahPayload.meta.ayahCount} Ayahs) has not been downloaded to your offline storage yet. Connect to the internet once to cache its verified Uthmani text and audio.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center pt-1">
                    <button
                      type="button"
                      onClick={() => setSurahReloadTick((t) => t + 1)}
                      className="px-4 py-2.5 rounded-xl bg-[#14532D] text-white text-xs font-extrabold shadow-xs hover:bg-emerald-800 transition"
                    >
                      Retry Connection
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdultRoute('quran_list')}
                      className="px-4 py-2.5 rounded-xl bg-amber-400 text-emerald-950 text-xs font-extrabold shadow-xs hover:bg-amber-300 transition"
                    >
                      Browse Offline-Ready Surahs
                    </button>
                  </div>
                </div>
              ) : (
                surahPayload &&
                currentAyah && (
                  <div className="space-y-3">
                    {/* 3-Mode Quran Reading Switcher: Card View | Mushaf (Reflowable Uthmani) | Study View */}
                    <div
                      role="tablist"
                      aria-label="Quran Reading Mode"
                      className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl border bg-[var(--bg-surface)] border-[var(--border-subtle)] shadow-2xs"
                    >
                      {(
                        [
                          { id: 'card', label: 'Card View' },
                          { id: 'mushaf', label: 'Mushaf Mode' },
                          { id: 'study', label: 'Study View' },
                        ] as const
                      ).map((tab) => {
                        const active = readerViewMode === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => handleChangeReaderViewMode(tab.id)}
                            className={`min-h-[44px] rounded-xl text-xs font-extrabold transition ${
                              active
                                ? 'bg-[#14532D] text-amber-300 shadow-2xs'
                                : 'text-[var(--text-secondary)] hover:bg-emerald-500/10'
                            }`}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    {readerViewMode === 'mushaf' ? (
                      <QuranMushafView
                        surahPayload={surahPayload}
                        activeAyahNumber={currentAyah.numberInSurah}
                        arabicFontScale={user.arabicFontScale || 2}
                        darkMode={user.darkMode}
                        language={language}
                        onSelectAyah={(ayahNum) => {
                          const idx = surahPayload.ayahs.findIndex(
                            (a) => a.numberInSurah === ayahNum
                          );
                          if (idx >= 0) setActiveAyahIdx(idx);
                          recordVerseRead(surahPayload.meta.number, ayahNum);
                        }}
                        onPlayAyahAudio={(ayah) =>
                          playQuranAyahAudio(
                            surahPayload.meta.number,
                            ayah.numberInSurah,
                            ayah.globalNumber
                          )
                        }
                        onToggleBookmarkAyah={(ayah) => {
                          toggleBookmark({
                            surahNumber: surahPayload.meta.number,
                            surahName: surahPayload.meta.nameTranslit,
                            ayahNumber: ayah.numberInSurah,
                            arabicSnippet: ayah.arabicUthmani.slice(0, 64),
                          });
                          triggerToast(
                            `Updated bookmark for ${surahPayload.meta.nameTranslit} ${surahPayload.meta.number}:${ayah.numberInSurah}`
                          );
                        }}
                        isAyahBookmarked={(ayahNum) =>
                          bookmarks.some(
                            (b) =>
                              b.surahNumber === surahPayload.meta.number &&
                              b.ayahNumber === ayahNum
                          )
                        }
                        onNavigateToSurahAyah={(nextSurah, nextAyah) =>
                          openSurahForReading(nextSurah, nextAyah)
                        }
                        onCreateReminderCard={(ayah) =>
                          openAyahInReminderStudio(ayah, surahPayload.meta)
                        }
                        onToast={triggerToast}
                      />
                    ) : readerViewMode === 'study' ? (
                      <div className="space-y-3">
                        <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-extrabold text-[#14532D] dark:text-amber-300">
                            Study View · {surahPayload.meta.nameTranslit} ({surahPayload.ayahs.length} Ayahs)
                          </span>
                          <div className="flex items-center gap-1 bg-[var(--bg-subtle)] p-0.5 rounded-xl border border-[var(--border-subtle)]">
                            {(
                              [
                                { id: 'uthmani', label: 'Madani' },
                                { id: 'indopak', label: 'IndoPak' },
                              ] as const
                            ).map((opt) => (
                              <button
                                key={opt.id}
                                type="button"
                                aria-pressed={adultScriptStyle === opt.id}
                                onClick={() => setAdultScriptStyle(opt.id)}
                                className={`min-h-[32px] px-2.5 rounded-lg text-[11px] font-extrabold transition ${
                                  adultScriptStyle === opt.id
                                    ? 'bg-[#14532D] text-amber-300'
                                    : 'text-[var(--text-secondary)]'
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        {surahPayload.ayahs
                          .slice(0, Math.max(40, activeAyahIdx + 12))
                          .map((ayah) => {
                            const saved = bookmarks.some(
                              (b) =>
                                b.surahNumber === surahPayload.meta.number &&
                                b.ayahNumber === ayah.numberInSurah
                            );
                            const isReciting = isAdultAyahHighlighted(ayah.numberInSurah);
                            return (
                              <div
                                key={ayah.numberInSurah}
                                ref={registerAdultAyahElement(ayah.numberInSurah)}
                                data-study-ayah={ayah.numberInSurah}
                                className={`rounded-3xl border p-4 space-y-2.5 shadow-2xs transition-all duration-300 ${
                                  isReciting
                                    ? 'ilmizo-ayah-playing bg-amber-50/70 dark:bg-emerald-950/70 text-[var(--text-primary)]'
                                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-extrabold text-amber-700 dark:text-amber-300 tabular-nums">
                                      {surahPayload.meta.number}:{ayah.numberInSurah}
                                    </span>
                                    {isReciting && (
                                      <span className="px-2 py-0.5 rounded-full bg-amber-400/25 border border-amber-400/60 text-[11px] font-extrabold text-amber-900 dark:text-amber-200 inline-flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                        <span>Reciting</span>
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        playQuranAyahAudio(
                                          surahPayload.meta.number,
                                          ayah.numberInSurah,
                                          ayah.globalNumber
                                        )
                                      }
                                      className={`min-h-[40px] px-3 rounded-xl text-xs font-extrabold inline-flex items-center gap-1 transition ${
                                        isReciting
                                          ? 'bg-amber-400 text-emerald-950'
                                          : 'bg-[#14532D] text-white'
                                      }`}
                                    >
                                      <Volume2
                                        className={`w-3.5 h-3.5 ${
                                          isReciting ? 'text-emerald-950' : 'text-amber-300'
                                        }`}
                                      />
                                      <span>{isReciting ? 'Playing' : 'Play'}</span>
                                    </button>
                                    <BookmarkPopButton
                                      saved={saved}
                                      onToggle={() =>
                                        toggleBookmark({
                                          surahNumber: surahPayload.meta.number,
                                          surahName: surahPayload.meta.nameTranslit,
                                          ayahNumber: ayah.numberInSurah,
                                          arabicSnippet: ayah.arabicUthmani.slice(0, 64),
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <p
                                  dir="rtl"
                                  lang="ar"
                                  className={`${getArabicScriptFontClass(adultScriptStyle)} text-2xl sm:text-3xl text-right`}
                                >
                                  {formatAyahTextForScript(ayah.arabicUthmani, adultScriptStyle)}
                                </p>
                                {ayah.transliteration && (
                                  <p className="text-xs italic text-emerald-800 dark:text-emerald-200">
                                    {ayah.transliteration}
                                  </p>
                                )}
                                <p className="text-sm leading-relaxed">
                                  {resolveText(ayah.translations, ayah.translations.en)}
                                </p>
                                {ayah.tafsirBrief && (
                                  <p className="text-xs text-slate-600 dark:text-emerald-100/80 border-t border-slate-100 dark:border-white/10 pt-2">
                                    <strong>Brief Tafsir:</strong> {ayah.tafsirBrief}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                  <div
                    ref={registerAdultAyahElement(currentAyah.numberInSurah)}
                    data-card-ayah={currentAyah.numberInSurah}
                    className={`rounded-3xl border-[3px] border-[#D4AF37] p-4 shadow-md space-y-4 relative overflow-hidden transition-all duration-300 ${
                      isAdultAyahHighlighted(currentAyah.numberInSurah) ? 'ilmizo-ayah-playing' : ''
                    } ${
                      user.darkMode ? 'bg-[#0B291C] text-white' : 'bg-[#FFFDF7] text-slate-900'
                    }`}
                  >
                    {/* Decorative Royal Ottoman/Mamluk Golden & Emerald Islamic Mihrab Arch matching Screen 3 */}
                    <div
                      className={`relative rounded-2xl border-2 border-[#D4AF37] pt-2 pb-4 px-3 text-center shadow-inner overflow-hidden ${
                        user.darkMode
                          ? 'bg-gradient-to-b from-[#133E2B] via-[#0B291C] to-[#081F15]'
                          : 'bg-gradient-to-b from-[#E6C687]/45 via-[#FEF3C7]/60 to-[#FFFDF7]'
                      }`}
                    >
                      {/* Ornate SVG Golden Mushaf Mihrab Arch Header */}
                      <div className="relative -mx-3 -mt-2 mb-2">
                        <svg
                          viewBox="0 0 360 66"
                          className="w-full h-14 block"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient id="mushafGoldGrad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#B45309" />
                              <stop offset="25%" stopColor="#FDE68A" />
                              <stop offset="50%" stopColor="#D97706" />
                              <stop offset="75%" stopColor="#FDE68A" />
                              <stop offset="100%" stopColor="#B45309" />
                            </linearGradient>
                          </defs>
                          {/* Deep Emerald Spandrel Corners */}
                          <path
                            d="M0,0 L360,0 L360,64 C305,64 275,20 180,10 C85,20 55,64 0,64 Z"
                            fill="#0F3826"
                          />
                          {/* Golden Scalloped Mihrab Arch Border */}
                          <path
                            d="M0,62 C55,62 85,20 180,10 C275,20 305,62 360,62"
                            fill="none"
                            stroke="url(#mushafGoldGrad)"
                            strokeWidth="3.5"
                          />
                          <path
                            d="M0,56 C60,56 90,26 180,16 C270,26 300,56 360,56"
                            fill="none"
                            stroke="#FDE68A"
                            strokeWidth="1"
                            strokeDasharray="4 3"
                            opacity="0.8"
                          />
                          {/* Corner Floral Arabesque Rosettes */}
                          <circle cx="26" cy="22" r="10" fill="none" stroke="#FDE68A" strokeWidth="1.5" />
                          <circle cx="26" cy="22" r="4" fill="#F59E0B" />
                          <circle cx="334" cy="22" r="10" fill="none" stroke="#FDE68A" strokeWidth="1.5" />
                          <circle cx="334" cy="22" r="4" fill="#F59E0B" />
                        </svg>
                        <div className="absolute inset-x-0 top-1.5 flex items-center justify-center">
                          <span className="px-3 py-0.5 rounded-full bg-[#0A261A]/90 border border-[#D4AF37] text-[11px] font-extrabold tracking-widest uppercase text-amber-200 shadow-2xs">
                            Surah {surahPayload.meta.number} · Juz {surahPayload.meta.juz}
                          </span>
                        </div>
                      </div>

                      {surahPayload.meta.number !== 9 && (
                        <p
                          className={`font-arabic text-2xl font-bold pt-1 ${
                            user.darkMode ? 'text-amber-200' : 'text-emerald-950'
                          }`}
                        >
                          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                        </p>
                      )}

                      {/* Interactive Color-Coded Tajweed + Word-by-Word Meaning Tooltip inside Arch */}
                      <div className="mt-3.5 space-y-3 px-1">
                        <InteractiveTajweedAyahView
                          ayah={currentAyah}
                          surahNumber={surahPayload.meta.number}
                          fontScaleClass={fontScaleClass}
                          darkMode={user.darkMode}
                          onPlayAyahAudio={() =>
                            playQuranAyahAudio(
                              surahPayload.meta.number,
                              currentAyah.numberInSurah,
                              currentAyah.globalNumber
                            )
                          }
                        />
                      </div>
                      <div className="mt-2 flex justify-center gap-1.5 text-amber-600/80 text-xs">
                        <span>✦</span>
                        <span>❖</span>
                        <span>✦</span>
                      </div>
                    </div>

                    {/* Numbered Transliteration & Translation matching Screen 3 */}
                    {showTranslation && (
                      <div className="px-1 space-y-2.5 text-left">
                        {currentAyah.transliteration && (
                          <div
                            className={`rounded-xl px-3 py-2 border-l-2 border-[#D4AF37] ${
                              user.darkMode ? 'bg-white/5' : 'bg-emerald-950/5'
                            }`}
                          >
                            <p
                              className={`text-xs font-semibold italic leading-relaxed ${
                                user.darkMode ? 'text-emerald-200' : 'text-emerald-900'
                              }`}
                            >
                              {currentAyah.transliteration}
                            </p>
                          </div>
                        )}
                        <div className="flex items-start justify-between gap-2.5 px-1">
                          <p
                            className={`text-sm leading-relaxed flex-1 ${
                              user.darkMode ? 'text-emerald-50' : 'text-slate-800'
                            }`}
                          >
                            <strong className="tabular-nums mr-1.5 text-[#14532D] dark:text-amber-300">
                              {currentAyah.numberInSurah}.
                            </strong>
                            {resolveText(currentAyah.translations, currentAyah.translations.en)}
                          </p>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => openAyahInReminderStudio(currentAyah, surahPayload.meta)}
                              title="Create Shareable Reminder Card from this Ayah"
                              className="min-h-[38px] px-2.5 rounded-full bg-amber-400/25 hover:bg-amber-400/40 text-amber-900 dark:text-amber-200 border border-amber-400/50 text-[11px] font-extrabold inline-flex items-center gap-1 transition"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Card</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyText(
                                  `${currentAyah.arabicUthmani}\n"${resolveText(
                                    currentAyah.translations,
                                    currentAyah.translations.en
                                  )}"\n— Quran ${surahPayload.meta.nameTranslit} (${surahPayload.meta.number}:${currentAyah.numberInSurah})`,
                                  `Copied ${surahPayload.meta.nameTranslit} ${surahPayload.meta.number}:${currentAyah.numberInSurah}`
                                )
                              }
                              title="Share / Copy Ayah with Verified Attribution"
                              className="min-w-[38px] min-h-[38px] p-2 rounded-full bg-emerald-950/10 hover:bg-emerald-950/20 text-[#14532D] dark:bg-white/10 dark:text-amber-200 flex items-center justify-center shrink-0"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {showTafsir && (
                      <div
                        className={`rounded-2xl border p-3 text-xs space-y-1 ${
                          user.darkMode
                            ? 'bg-black/30 border-emerald-700/40 text-emerald-100'
                            : 'bg-emerald-950/5 border-emerald-900/15 text-slate-700'
                        }`}
                      >
                        <p className="font-bold text-amber-500">Tafsir & Reflection</p>
                        <p>{currentAyah.tafsirBrief}</p>
                      </div>
                    )}

                    {/* Inline Verse Reflection Notes Drawer */}
                    <div className="flex items-center justify-between px-1">
                      <button
                        type="button"
                        onClick={() => setShowVerseNotes(!showVerseNotes)}
                        className="text-xs font-extrabold text-[#14532D] dark:text-amber-300 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>
                          Verse Notes (
                          {
                            personalNotes.filter(
                              (n) =>
                                (n.surahNumber === surahPayload.meta.number &&
                                  n.ayahNumber === currentAyah.numberInSurah) ||
                                n.surahReference?.includes(
                                  `${surahPayload.meta.number}:${currentAyah.numberInSurah}`
                                )
                            ).length
                          }
                          )
                        </span>
                      </button>
                      <span className="text-[11px] font-bold text-[var(--text-muted)] tabular-nums">
                        {user.playbackRate || 1}x · {(user.reciterName || 'Mishary').split(' ')[0]}
                      </span>
                    </div>

                    {showVerseNotes && (
                      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-3 text-xs space-y-2.5">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!newVerseNoteBody.trim()) return;
                            addPersonalNote(
                              `${surahPayload.meta.nameTranslit} ${surahPayload.meta.number}:${currentAyah.numberInSurah}`,
                              newVerseNoteBody.trim(),
                              `${surahPayload.meta.nameTranslit} ${surahPayload.meta.number}:${currentAyah.numberInSurah}`,
                              surahPayload.meta.number,
                              currentAyah.numberInSurah
                            );
                            setNewVerseNoteBody('');
                            triggerToast('Saved reflection note for this Ayah');
                          }}
                          className="flex gap-2"
                        >
                          <input
                            type="text"
                            value={newVerseNoteBody}
                            onChange={(e) => setNewVerseNoteBody(e.target.value)}
                            placeholder={`Write a personal reflection on ${surahPayload.meta.nameTranslit} ${surahPayload.meta.number}:${currentAyah.numberInSurah}...`}
                            className="flex-1 rounded-xl ilmizo-input px-3 py-2 text-xs"
                          />
                          <button
                            type="submit"
                            className="px-3.5 py-2 rounded-xl bg-[#14532D] text-white font-extrabold text-xs shrink-0"
                          >
                            Save
                          </button>
                        </form>
                        {personalNotes
                          .filter(
                            (n) =>
                              (n.surahNumber === surahPayload.meta.number &&
                                n.ayahNumber === currentAyah.numberInSurah) ||
                              n.surahReference?.includes(
                                `${surahPayload.meta.number}:${currentAyah.numberInSurah}`
                              )
                          )
                          .map((note) => (
                            <div
                              key={note.id}
                              className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-2.5 flex items-start justify-between gap-2"
                            >
                              <div>
                                <p className="font-bold text-[#14532D] dark:text-amber-300 text-[11px]">
                                  {note.surahReference || note.title} · {note.createdAt}
                                </p>
                                <p className="text-[var(--text-secondary)] mt-0.5">{note.body}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => deletePersonalNote(note.id)}
                                className="text-[var(--text-muted)] hover:text-rose-500 p-1"
                                title="Delete Note"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Active Audio Status & Stop Control Bar (shown when audio is active or errored) */}
                    {(audioState.status !== 'idle' || audioState.errorMessage) && (
                      <div
                        className={`rounded-2xl px-3.5 py-2 border flex items-center justify-between gap-2 text-xs ${
                          audioState.status === 'error'
                            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-700/40 text-rose-800 dark:text-rose-200'
                            : 'bg-amber-50/90 dark:bg-amber-500/15 border-amber-300/70 dark:border-amber-400/35 text-emerald-950 dark:text-amber-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Volume2 className="w-4 h-4 shrink-0 text-[#14532D] dark:text-amber-300" />
                          <span className="font-bold truncate">
                            {audioState.status === 'loading'
                              ? 'Loading recitation audio...'
                              : audioState.status === 'playing'
                              ? `Playing Ayah ${currentAyah.numberInSurah}${repeatAyah ? ' (Repeat ON)' : ''}`
                              : audioState.status === 'paused'
                              ? `Paused Ayah ${currentAyah.numberInSurah}`
                              : audioState.errorMessage || 'Audio stopped'}
                          </span>
                        </div>
                        {(audioState.status === 'playing' ||
                          audioState.status === 'paused' ||
                          audioState.status === 'loading') && (
                          <button
                            type="button"
                            onClick={() => audioManager.stopAll()}
                            className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-[11px] font-extrabold shrink-0 hover:bg-rose-700 transition"
                          >
                            Stop
                          </button>
                        )}
                      </div>
                    )}

                    {/* Phase 7 Professional Quran Audio Player Bar (Single Ayah, Full Surah, Ayah Range, Repeat 1x/2x/5x/10x/∞, 4 Qaris) */}
                    <QuranAdvancedAudioPlayerBar
                      surahPayload={surahPayload}
                      activeAyahIdx={activeAyahIdx}
                      onSelectAyahIdx={(idx) => setActiveAyahIdx(idx)}
                      onTriggerToast={triggerToast}
                    />

                    {/* 4 Circular Dark-Emerald Action Buttons matching Screen 3 */}
                    <div className="grid grid-cols-4 gap-2 pt-1">
                      {[
                        {
                          label:
                            audioState.status === 'loading'
                              ? 'Loading...'
                              : isPlayingAudio
                              ? 'Pause'
                              : isPausedAudio
                              ? 'Resume'
                              : t('audio'),
                          icon: isPlayingAudio ? Pause : Play,
                          active: isPlayingAudio || isPausedAudio,
                          onClick: () =>
                            playQuranAyahAudio(
                              surahPayload.meta.number,
                              currentAyah.numberInSurah,
                              currentAyah.globalNumber
                            ),
                        },
                        {
                          label: t('repeat'),
                          icon: Repeat,
                          active: repeatAyah,
                          onClick: () => {
                            const nextRepeat = !repeatAyah;
                            setRepeatAyah(nextRepeat);
                            audioManager.setRepeatEnabled(nextRepeat);
                            triggerToast(nextRepeat ? 'Repeat Ayah: ON' : 'Repeat Ayah: OFF');
                          },
                        },
                        {
                          label: t('tafsir'),
                          icon: BookOpen,
                          active: showTafsir,
                          onClick: () => setShowTafsir(!showTafsir),
                        },
                        {
                          label: isBookmarked ? t('saved') : t('bookmark'),
                          icon: Bookmark,
                          active: Boolean(isBookmarked),
                          onClick: () => {
                            toggleBookmark({
                              surahNumber: surahPayload.meta.number,
                              surahName: surahPayload.meta.nameTranslit,
                              ayahNumber: currentAyah.numberInSurah,
                              arabicSnippet: currentAyah.arabicUthmani,
                            });
                            triggerToast(
                              isBookmarked
                                ? 'Removed verse bookmark'
                                : `Bookmarked ${surahPayload.meta.nameTranslit} ${surahPayload.meta.number}:${currentAyah.numberInSurah}`
                            );
                          },
                        },
                      ].map((btn) => {
                        const Icon = btn.icon;
                        return (
                          <button
                            key={btn.label}
                            type="button"
                            onClick={btn.onClick}
                            className="flex flex-col items-center gap-1"
                          >
                            <div
                              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm transition active:scale-95 ${
                                btn.active
                                  ? 'bg-amber-400 text-emerald-950'
                                  : 'bg-[#14532D] text-white hover:bg-emerald-800'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span
                              className={`text-[11px] font-bold ${
                                user.darkMode ? 'text-emerald-100' : 'text-slate-700'
                              }`}
                            >
                              {btn.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Ayah Progress Slider & Prev/Next Bar matching Screen 3 */}
                    <div className="pt-2 space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          disabled={activeAyahIdx === 0}
                          aria-label="Previous Ayah"
                          onClick={() => {
                            audioManager.stopAll();
                            const nextIdx = Math.max(0, activeAyahIdx - 1);
                            setActiveAyahIdx(nextIdx);
                            const nextAyah = surahPayload.ayahs[nextIdx];
                            if (nextAyah) {
                              recordVerseRead(surahPayload.meta.number, nextAyah.numberInSurah);
                              updateUser({
                                lastRead: {
                                  surahNumber: surahPayload.meta.number,
                                  surahName: surahPayload.meta.nameTranslit,
                                  ayahNumber: nextAyah.numberInSurah,
                                },
                              });
                            }
                          }}
                          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-emerald-950/10 hover:bg-emerald-950/15 dark:bg-white/10 dark:text-white disabled:opacity-30 flex items-center justify-center text-emerald-950 transition active:scale-95"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <div className="flex-1 h-2 rounded-full bg-emerald-100 dark:bg-white/15 overflow-hidden">
                          <div
                            className="h-full bg-[#14532D] dark:bg-amber-400 rounded-full transition-all"
                            style={{
                              width: `${((activeAyahIdx + 1) / surahPayload.ayahs.length) * 100}%`,
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          disabled={activeAyahIdx >= surahPayload.ayahs.length - 1}
                          aria-label="Next Ayah"
                          onClick={() => {
                            audioManager.stopAll();
                            const nextIdx = Math.min(
                              surahPayload.ayahs.length - 1,
                              activeAyahIdx + 1
                            );
                            setActiveAyahIdx(nextIdx);
                            const nextAyah = surahPayload.ayahs[nextIdx];
                            if (nextAyah) {
                              recordVerseRead(surahPayload.meta.number, nextAyah.numberInSurah);
                              updateUser({
                                lastRead: {
                                  surahNumber: surahPayload.meta.number,
                                  surahName: surahPayload.meta.nameTranslit,
                                  ayahNumber: nextAyah.numberInSurah,
                                },
                              });
                            }
                          }}
                          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-emerald-950/10 hover:bg-emerald-950/15 dark:bg-white/10 dark:text-white disabled:opacity-30 flex items-center justify-center text-emerald-950 transition active:scale-95"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                      <p
                        className={`text-center text-[11px] font-bold tabular-nums ${
                          user.darkMode ? 'text-emerald-200' : 'text-slate-600'
                        }`}
                      >
                        Ayah {currentAyah.numberInSurah} of {surahPayload.meta.ayahCount} (Loaded:{' '}
                        {surahPayload.ayahs.length})
                      </p>
                    </div>

                    {/* Tarteel-Style AI Tajweed & Harakat Recitation Check */}
                    <div
                      className="rounded-2xl border p-3 space-y-2.5 bg-[var(--bg-elevated)] border-[var(--border-subtle)]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p
                            className={`text-xs font-extrabold ${
                              user.darkMode ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            AI Tajweed & Harakat Coach
                          </p>
                          <p
                            className={`text-[11px] tabular-nums ${
                              user.darkMode ? 'text-emerald-200' : 'text-slate-600'
                            }`}
                          >
                            {(() => {
                              const q = canUseAiTajweedCheck(
                                user,
                                getLocalDateKeyWithOffset(0, new Date())
                              );
                              return q.limit === null
                                ? 'Unlimited Ayah checks active'
                                : `${q.remaining}/${q.limit} free checks left today`;
                            })()}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowAdultTajweedCoach((prev) => !prev)}
                          className="px-3 min-h-[40px] rounded-xl bg-[#14532D] text-white text-xs font-extrabold flex items-center gap-1.5"
                        >
                          <Mic className="w-3.5 h-3.5 text-amber-300" />
                          <span>{showAdultTajweedCoach ? 'Hide Mic' : 'Check Recitation'}</span>
                        </button>
                      </div>

                      {showAdultTajweedCoach && (
                        <div className="space-y-2.5 pt-1 border-t border-emerald-950/10">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => void handleToggleAdultMic()}
                              className={`px-3.5 min-h-[44px] rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition ${
                                adultMicActive
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-[#22C55E] text-emerald-950'
                              }`}
                            >
                              {adultMicActive ? (
                                <>
                                  <Square className="w-3.5 h-3.5 fill-current" />
                                  <span>Stop Recording</span>
                                </>
                              ) : (
                                <>
                                  <Mic className="w-3.5 h-3.5" />
                                  <span>Recite Ayah</span>
                                </>
                              )}
                            </button>

                            {adultRecUrl && !adultMicActive && (
                              <button
                                type="button"
                                onClick={() =>
                                  audioManager.playAudioUrl({
                                    id: `adult-rec-${currentAyah.numberInSurah}`,
                                    url: adultRecUrl,
                                  })
                                }
                                className="px-3 min-h-[44px] rounded-xl bg-amber-100 text-amber-950 text-xs font-extrabold flex items-center gap-1.5"
                              >
                                <Play className="w-3.5 h-3.5" />
                                <span>Play Mine</span>
                              </button>
                            )}

                            {adultHasBlob && !adultMicActive && (
                              <button
                                type="button"
                                disabled={adultTajweedLoading}
                                onClick={() =>
                                  void handleRunAdultAiTajweed(
                                    currentAyah.arabicUthmani,
                                    currentAyah.transliteration
                                  )
                                }
                                className="px-3.5 min-h-[44px] rounded-xl bg-[#14532D] hover:bg-emerald-800 disabled:opacity-60 text-white text-xs font-extrabold flex items-center gap-1.5"
                              >
                                {adultTajweedLoading ? (
                                  <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
                                    <span>Analyzing…</span>
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                    <span>Analyze Tajweed</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>

                          {adultTajweedError && (
                            <p className="text-xs font-semibold text-rose-600">
                              {adultTajweedError}
                            </p>
                          )}

                          {adultTajweedResult && (
                            <div className="rounded-xl bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] p-3 space-y-2.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-extrabold text-[#14532D] dark:text-amber-300">
                                  {adultTajweedResult.accuracyLabel}
                                </span>
                                <span className="text-sm font-black tabular-nums text-[#14532D] dark:text-emerald-300">
                                  {adultTajweedResult.overallScore}%
                                </span>
                              </div>
                              {adultTajweedResult.wordFeedback.length > 0 && (
                                <div dir="rtl" className="flex flex-wrap gap-1.5">
                                  {adultTajweedResult.wordFeedback.map((wf, idx) => (
                                    <div
                                      key={`${wf.word}-${idx}`}
                                      className={`rounded-xl border px-2 py-1 text-center ${
                                        wf.status === 'correct'
                                          ? 'bg-emerald-50 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                                          : wf.status === 'harakat_issue'
                                          ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-100'
                                          : 'bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100'
                                      }`}
                                    >
                                      <p className="font-arabic text-lg font-bold">{wf.word}</p>
                                      <p dir="ltr" className="text-[11px] font-semibold">
                                        {wf.note}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <p className="text-xs font-semibold text-[var(--text-primary)]">
                                {adultTajweedResult.feedbackSummary}
                              </p>
                              <p className="text-xs font-bold text-[#14532D] dark:text-emerald-300">
                                Makhraj Tip: {adultTajweedResult.makhrajTip}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <VerifiedSourceFooter
                      source={surahPayload.verification.source}
                      reference={surahPayload.verification.reference}
                      reviewer={surahPayload.verification.reviewer}
                    />
                  </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        );
      }

      case 'hifz': {
        const completedCount = hifzPlans.filter((p) => p.status === 'completed').length;
        const pct = Math.round((completedCount / 114) * 100);
        const totalMemorizedAyahs = hifzPlans.reduce((acc, p) => acc + p.memorizedAyahs, 0);
        const totalRevisionsLogged = revisionItems.reduce((acc, r) => acc + r.attemptsCount, 0);
        const adultPlusUnlocked = isAdultPlusActive(user);
        const wordByWordUnlocked = canAccessWordByWordHifzStudio(user);
        const defaultHifzSurahs = new Set([1, 2, 3, 4, 67, 103, 108, 109, 110, 112, 113, 114]);
        const customHifzCount = hifzPlans.filter((p) => !defaultHifzSurahs.has(p.surahNumber)).length;

        const toggleRevealCard = (id: string) => {
          setRevealedCardIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
          );
        };

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
            {/* Screen 4: Hifz Mastery Studio */}
            <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 shadow-md">
              <MobileStatusBar time="9:31" light />
              <div className="flex items-center justify-between px-4 pt-1 pb-3">
                <ScreenBackButton variant="dark" />
                <h1 className="text-lg font-extrabold">Hifz Mastery</h1>
                <button
                  type="button"
                  onClick={() => {
                    setActiveRecallBlur(!activeRecallBlur);
                    setRevealedCardIds([]);
                    triggerToast(
                      !activeRecallBlur
                        ? 'Active Recall Blur ON: Tap blurred Arabic to test memory'
                        : 'Active Recall Blur OFF'
                    );
                  }}
                  className={`px-3 h-9 rounded-full flex items-center gap-1 text-xs font-extrabold border transition ${
                    activeRecallBlur
                      ? 'bg-amber-400 text-emerald-950 border-amber-300'
                      : 'bg-white/10 text-amber-300 border-white/15'
                  }`}
                  title="Toggle Active Recall Blur"
                >
                  {activeRecallBlur ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{activeRecallBlur ? 'Blur ON' : 'Recall'}</span>
                </button>
              </div>

              <div className="mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full">
                {(['My Hifz', 'Revision', 'Stats'] as const).map((tName) => (
                  <button
                    key={tName}
                    type="button"
                    onClick={() => setHifzTab(tName)}
                    className={`min-h-[38px] py-1.5 rounded-full text-xs font-extrabold transition ${
                      hifzTab === tName
                        ? 'bg-amber-400 text-emerald-950 shadow-xs'
                        : 'text-emerald-100 hover:bg-white/10'
                    }`}
                  >
                    {tName}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 pt-4 space-y-4">
              {/* Progress Overview Card */}
              <div className="rounded-3xl bg-[var(--bg-surface)] p-4 shadow-xs border border-[var(--border-subtle)] space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-[var(--text-primary)]">
                        Progress Overview
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Spaced-repetition review schedule
                      </p>
                    </div>
                    <InfoDisclosure
                      label="SRS Info"
                      sheetTitle="How Hifz Spaced Repetition Works"
                      sheetSubtitle="Honest self-assessment scheduling stored privately on your device."
                    >
                      <p>
                        Ilmizo uses a self-assessment spaced-repetition schedule (not automated AI
                        recitation grading). After reciting from memory, rate your own fluency:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>Needs Work:</strong> Reschedules review in 1 day.
                        </li>
                        <li>
                          <strong>Good:</strong> Expands interval by ×1.8.
                        </li>
                        <li>
                          <strong>Fluent:</strong> Expands interval by ×2.5.
                        </li>
                      </ul>
                      <p>
                        All Hifz plans and revision attempts stay 100% private on this device with
                        zero cloud tracking.
                      </p>
                    </InfoDisclosure>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {canUndoHifz && (
                      <button
                        type="button"
                        onClick={() => {
                          undoLastHifzAction();
                          triggerToast('Undid last Hifz change');
                        }}
                        className="min-h-[36px] text-xs font-extrabold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-400/40 px-2.5 py-1 rounded-full flex items-center gap-1"
                        title="Undo last Hifz action"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Undo</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowNewHifzForm(!showNewHifzForm)}
                      className="min-h-[36px] text-xs font-extrabold text-[#14532D] dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/50 px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{showNewHifzForm ? 'Close' : 'Add Plan'}</span>
                    </button>
                  </div>
                </div>

                {showNewHifzForm && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const alreadyTracked = hifzPlans.some(
                        (p) => p.surahNumber === newHifzSurahNum
                      );
                      if (!alreadyTracked && !canAddCustomHifzPlan(user, customHifzCount)) {
                        openAdultPaywall(
                          `Free plan includes 12 starter Surahs + ${FREE_CUSTOM_HIFZ_LIMIT} custom Surah plan. Unlock unlimited custom Hifz targets across all 114 Surahs with Adult Quran Plus (₹99/yr).`
                        );
                        return;
                      }
                      addHifzPlan(
                        newHifzSurahNum,
                        newHifzDailyTarget,
                        `Ayahs ${newHifzStartAyah}-${newHifzEndAyah}`
                      );
                      setShowNewHifzForm(false);
                      const sMeta = ALL_114_SURAHS.find((s) => s.number === newHifzSurahNum);
                      triggerToast(
                        `Saved ${sMeta?.nameTranslit || 'Surah'} (Ayahs ${newHifzStartAyah}-${newHifzEndAyah}) to Hifz Plan`
                      );
                    }}
                    className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-2.5"
                  >
                    <p className="text-xs font-extrabold text-[var(--text-primary)]">
                      Create / Update Surah & Ayah Range Target
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <SelectSheetField
                        title="Select Surah for Hifz Plan"
                        ariaLabel="Hifz Surah"
                        variant="compact"
                        searchable
                        searchPlaceholder="Search Surah…"
                        className="w-full"
                        value={String(newHifzSurahNum)}
                        onChange={(val) => {
                          const sNum = Number(val);
                          setNewHifzSurahNum(sNum);
                          const meta = ALL_114_SURAHS.find((s) => s.number === sNum);
                          setNewHifzStartAyah(1);
                          setNewHifzEndAyah(meta?.ayahCount || 7);
                        }}
                        options={ALL_114_SURAHS.map((s) => ({
                          value: String(s.number),
                          label: `${s.number}. ${s.nameTranslit}`,
                          subtitle: s.nameEnglish,
                          badge: `${s.ayahCount} ayahs`,
                        }))}
                      />
                      <SelectSheetField
                        title="Daily Memorization Target"
                        ariaLabel="Daily Ayah target"
                        variant="compact"
                        className="w-full"
                        value={String(newHifzDailyTarget)}
                        onChange={(val) => setNewHifzDailyTarget(Number(val))}
                        options={[
                          { value: '3', label: '3 Ayahs / day', subtitle: 'Gentle steady pace' },
                          { value: '5', label: '5 Ayahs / day', badge: 'Recommended' },
                          { value: '10', label: '10 Ayahs / day', subtitle: 'Focused study' },
                          { value: '15', label: '15 Ayahs / day', subtitle: 'Intensive revision' },
                        ]}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="text-xs font-bold text-[var(--text-secondary)]">
                        Start Ayah
                        <input
                          type="number"
                          min={1}
                          value={newHifzStartAyah}
                          onChange={(e) => setNewHifzStartAyah(Math.max(1, Number(e.target.value)))}
                          className="mt-1 w-full min-h-[40px] rounded-xl ilmizo-input px-2.5 py-1.5 text-xs font-bold tabular-nums"
                        />
                      </label>
                      <label className="text-xs font-bold text-[var(--text-secondary)]">
                        End Ayah
                        <input
                          type="number"
                          min={newHifzStartAyah}
                          value={newHifzEndAyah}
                          onChange={(e) =>
                            setNewHifzEndAyah(Math.max(newHifzStartAyah, Number(e.target.value)))
                          }
                          className="mt-1 w-full min-h-[40px] rounded-xl ilmizo-input px-2.5 py-1.5 text-xs font-bold tabular-nums"
                        />
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full min-h-[44px] py-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold transition"
                    >
                      Save Hifz Plan
                    </button>
                  </form>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-extrabold text-[var(--text-primary)] tabular-nums">
                      {completedCount} / 114
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{t('surahs_completed')}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-[5px] border-amber-400 flex items-center justify-center font-extrabold text-sm text-[var(--text-primary)] tabular-nums shadow-inner">
                    {pct}%
                  </div>
                </div>

                {(() => {
                  const dueRev =
                    revisionItems.find((r) => r.dueStatus === 'overdue') ||
                    revisionItems.find((r) => r.dueStatus === 'due_today') ||
                    revisionItems[0];
                  const targetSurah = dueRev?.surahNumber || 2;
                  const parsedRange = dueRev
                    ? parseHifzAyahRange(
                        dueRev.ayahRange,
                        ALL_114_SURAHS.find((s) => s.number === targetSurah)?.ayahCount || 286
                      )
                    : { startAyah: 255, endAyah: 255 };
                  const targetAyah = dueRev?.startAyah || parsedRange.startAyah;
                  return (
                    <button
                      type="button"
                      onClick={() => openSurahForReading(targetSurah, targetAyah)}
                      className="w-full min-h-[56px] rounded-2xl bg-[#14532D] text-white p-3.5 flex items-center justify-between hover:bg-emerald-800 transition shadow-sm"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-extrabold">
                            Practice Loop · {t('continue_hifz')}
                          </p>
                          <p className="text-xs text-emerald-200">
                            {dueRev ? formatRevisionReference(dueRev) : 'Al-Baqarah · Ayah 255'}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </button>
                  );
                })()}
              </div>

              {/* Phase 10 Interactive Word-by-Word Hifz Active Recall Panel (Adult Quran Plus) */}
              {wordByWordUnlocked ? (
                <WordByWordHifzRevealPanel surahPayload={surahPayload} />
              ) : (
                <div className="rounded-3xl bg-[var(--bg-surface)] border border-amber-400/50 p-4 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Adult Quran Plus · ₹99/yr</span>
                      </p>
                      <h3 className="text-sm font-extrabold text-[var(--text-primary)] mt-0.5">
                        Word-by-Word Hifz Active Recall Studio
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Hide and reveal Arabic words one by one inside any Ayah to test exact word-order memorization. Included with Adult Quran Plus (₹99/yr) & Family Plus (₹199/yr).
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      openAdultPaywall(
                        'Unlock Word-by-Word Hifz Studio, unlimited custom Surah plans, 600+ Core Quranic words, and retention analytics with Adult Quran Plus (₹99/yr · 7-Day Free Trial).'
                      )
                    }
                    className="w-full min-h-[44px] rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold transition"
                  >
                    Start 7-Day Free Trial · Unlock Hifz Studio
                  </button>
                </div>
              )}

              {hifzTab === 'Revision' ? (
                <div className="space-y-2.5">
                  {activeRecallBlur && (
                    <div className="rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-400/35 px-3.5 py-2.5 text-xs font-bold text-amber-950 dark:text-amber-200">
                      Active Recall Mode is ON. Recite from memory, tap the blurred verse to verify, then grade yourself honestly.
                    </div>
                  )}
                  {revisionItems.map((rev) => {
                    const surahMeta = ALL_114_SURAHS.find((s) => s.number === rev.surahNumber);
                    const isBlurred = activeRecallBlur && !revealedCardIds.includes(rev.id);
                    const parsedRange = parseHifzAyahRange(
                      rev.ayahRange,
                      surahMeta?.ayahCount || 286
                    );
                    const targetStartAyah = rev.startAyah || parsedRange.startAyah;
                    return (
                      <div
                        key={rev.id}
                        className="rounded-2xl bg-[var(--bg-surface)] p-4 shadow-xs border border-[var(--border-subtle)] space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-bold text-[var(--text-primary)]">
                              {formatRevisionReference(rev)}
                            </h3>
                            <p className="text-xs text-[var(--text-secondary)]">
                              {rev.dueDate} · {rev.attemptsCount} logged · {rev.dueStatus.replace('_', ' ')}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => openSurahForReading(rev.surahNumber, targetStartAyah)}
                            className="min-h-[36px] text-xs font-extrabold text-[#14532D] dark:text-amber-300 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/50 px-3 py-1 rounded-full hover:brightness-95 transition shrink-0"
                          >
                            Practice
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleRevealCard(rev.id)}
                          className="w-full rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 flex items-center justify-between"
                        >
                          <span className="text-xs font-bold text-[var(--text-muted)]">
                            {isBlurred ? 'Tap to reveal Surah prompt' : 'Surah Calligraphic Prompt'}
                          </span>
                          <span
                            className={`font-arabic text-xl font-bold text-[#14532D] dark:text-amber-300 transition ${
                              isBlurred ? 'blur-xs select-none' : ''
                            }`}
                          >
                            {surahMeta?.nameArabic || 'سورة'}
                          </span>
                        </button>

                        <div className="grid grid-cols-3 gap-2">
                          {(['Needs Work', 'Good', 'Fluent'] as const).map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => {
                                recordRevisionAttempt(rev.id, rating);
                                triggerToast(`Self-assessed "${rating}" for ${rev.surahName}`);
                              }}
                              className="min-h-[40px] py-2 rounded-xl bg-[var(--bg-elevated)] hover:bg-[#14532D] hover:text-white border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] transition"
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : hifzTab === 'Stats' ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-2xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs">
                      <p className="text-xs font-bold text-[var(--text-secondary)]">Memorized Ayahs</p>
                      <p className="text-2xl font-extrabold text-[var(--text-primary)] tabular-nums mt-1">
                        {totalMemorizedAyahs}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        Across {hifzPlans.length} tracked Surahs
                      </p>
                    </div>
                    <div className="rounded-2xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs">
                      <p className="text-xs font-bold text-[var(--text-secondary)]">Revision Sessions</p>
                      <p className="text-2xl font-extrabold text-[var(--text-primary)] tabular-nums mt-1">
                        {totalRevisionsLogged}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        Recorded self-assessments
                      </p>
                    </div>
                  </div>
                  {adultPlusUnlocked ? (
                    <div className="rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-2.5">
                      <h3 className="text-xs font-extrabold text-[var(--text-primary)]">
                        Retention Strength Breakdown (Self-Reported)
                      </h3>
                      {(['Fluent', 'Good', 'Needs Work'] as const).map((strength) => {
                        const count = revisionItems.filter((r) => r.lastSelfReport === strength).length;
                        return (
                          <div key={strength} className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[var(--text-secondary)]">
                              {strength}
                            </span>
                            <span className="font-extrabold text-[#14532D] dark:text-amber-300 tabular-nums">
                              {count} Surahs
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-3xl bg-gradient-to-br from-[#0F3826] to-[#14532D] text-white p-4 shadow-md border border-amber-400/40 space-y-2">
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Adult Quran Plus · ₹99/yr</span>
                      </p>
                      <h3 className="text-sm font-extrabold">
                        Retention Strength & Weak-Surah Analytics
                      </h3>
                      <p className="text-xs text-emerald-100 leading-relaxed">
                        See which Surahs are Fluent vs. Needs Work across your spaced-repetition history with Adult Quran Plus (₹99/yr · 7-Day Free Trial).
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          openAdultPaywall(
                            'Unlock Retention Strength Analytics, Word-by-Word Hifz Studio, and Full 600+ Core Quranic Vocabulary with Adult Quran Plus (₹99/yr).'
                          )
                        }
                        className="w-full min-h-[44px] rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold transition"
                      >
                        Unlock Hifz Analytics · 7-Day Free Trial
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)]">Surah Progress</h3>
                    <span className="text-xs font-bold text-[var(--text-muted)]">
                      Tap +1 to log memorized Ayah
                    </span>
                  </div>
                  <div className="bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)] divide-y divide-[var(--divider)] shadow-xs overflow-hidden">
                    {hifzPlans.map((plan) => {
                      const surahMeta = ALL_114_SURAHS.find((s) => s.number === plan.surahNumber);
                      const isBlurred =
                        activeRecallBlur && !revealedCardIds.includes(`plan_${plan.surahNumber}`);
                      const isConfirmingReset = confirmResetSurahNum === plan.surahNumber;
                      return (
                        <div
                          key={plan.surahNumber}
                          className="p-3.5 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <button
                              type="button"
                              onClick={() => toggleRevealCard(`plan_${plan.surahNumber}`)}
                              className={`font-arabic text-lg text-[#14532D] dark:text-amber-300 font-bold w-12 text-center transition shrink-0 ${
                                isBlurred ? 'blur-xs select-none' : ''
                              }`}
                            >
                              {surahMeta?.nameArabic || 'سورة'}
                            </button>
                            <div className="min-w-0">
                              <h4 className="text-sm font-extrabold text-[var(--text-primary)] truncate">
                                {plan.surahName}
                              </h4>
                              <p className="text-xs text-[var(--text-secondary)] tabular-nums">
                                {plan.memorizedAyahs}/{plan.totalAyahs} Ayahs · Range{' '}
                                {plan.startAyah || 1}-{plan.endAyah || plan.totalAyahs} ·{' '}
                                {(plan.memorizationState || plan.status).replace('_', ' ')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {isConfirmingReset ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    resetHifzPlan(plan.surahNumber);
                                    setConfirmResetSurahNum(null);
                                    triggerToast(`Reset ${plan.surahName} progress to 0`);
                                  }}
                                  className="min-h-[34px] px-2.5 rounded-lg bg-rose-600 text-white text-xs font-extrabold"
                                >
                                  Reset
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmResetSurahNum(null)}
                                  className="min-h-[34px] px-2.5 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-xs font-bold"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                {plan.memorizedAyahs > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => setConfirmResetSurahNum(plan.surahNumber)}
                                    title="Reset Surah Hifz Progress"
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {plan.status === 'completed' ? (
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[var(--text-secondary)] tabular-nums">
                                      {plan.memorizedAyahs}/{plan.totalAyahs}
                                    </span>
                                    <div className="w-7 h-7 rounded-full bg-[#14532D] text-white flex items-center justify-center">
                                      <Check className="w-3.5 h-3.5" />
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateHifzProgress(plan.surahNumber, plan.memorizedAyahs + 1)
                                    }
                                    className="min-h-[36px] flex items-center gap-1.5 text-xs font-extrabold text-[#14532D] dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700/60 px-3 py-1 rounded-full tabular-nums active:scale-95 transition"
                                  >
                                    <span>
                                      {plan.memorizedAyahs}/{plan.totalAyahs}
                                    </span>
                                    <span className="text-emerald-700 dark:text-amber-300">+1</span>
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dedicated Interactive Surah Memorization Check */}
              <SurahMemorizationCheckCard
                defaultSurahNumber={user.lastRead.surahNumber || 112}
                reciterName={user.reciterName || 'Mishary Rashid Alafasy'}
                onCompleteCheck={(summary) => {
                  triggerToast(
                    `${summary.surahName} Check: ${summary.accuracyPct}% (${summary.solidCount}/${summary.totalChecked} solid)`
                  );
                }}
              />
            </div>
          </div>
        );
      }

      case 'salah': {
        const salahHistory = computeSalahHistoricalSummary(salahRecords, new Date());
        const last7Days = salahHistory.last7Days;

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
            {/* Screen 5: Salah Tracker */}
            <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 shadow-md">
              <MobileStatusBar time="9:31" light />
              <div className="flex items-center justify-between px-4 pt-1 pb-2">
                <ScreenBackButton variant="dark" />
                <div className="text-center">
                  <h1 className="text-lg font-extrabold">{t('salah')}</h1>
                  <p className="text-xs text-emerald-200">
                    {user.city}, {user.country} · {hijriLabel}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSalahCalcConfig(true)}
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                  title="Calculation Method & Asr School Settings"
                  aria-label="Open Prayer Calculation Method Settings"
                >
                  <Settings className="w-4 h-4 text-amber-300" />
                </button>
              </div>

              {/* Interactive Date Selector Bar */}
              <div className="mx-6 mt-1 flex items-center justify-between text-xs font-semibold text-emerald-100 bg-black/20 rounded-full px-3 py-1.5">
                <button
                  type="button"
                  onClick={() => setSalahDayOffset((d) => d - 1)}
                  className="p-1 rounded-full hover:bg-white/10"
                  aria-label="Previous Day"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="tabular-nums">{activeSalahDateLabel}</span>
                <button
                  type="button"
                  disabled={salahDayOffset >= 0}
                  onClick={() => setSalahDayOffset((d) => Math.min(0, d + 1))}
                  className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30"
                  aria-label="Next Day"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Native BottomSheet for Prayer Calculation Method & Madhhab */}
            <BottomSheet
              open={showSalahCalcConfig}
              onClose={() => setShowSalahCalcConfig(false)}
              title="Prayer Timing Method & Madhhab"
              subtitle={`Timings for ${user.city}, ${user.country} · ${
                isLiveTimingsSynced ? 'Aladhan Live Sync' : 'Offline Preset'
              }`}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-extrabold text-[var(--text-primary)]">
                    Calculation Convention
                  </p>
                  <div className="space-y-1.5">
                    {PRAYER_CALCULATION_METHODS.map((m) => {
                      const active = (user.prayerCalculationMethod || 1) === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            updateUser({
                              prayerCalculationMethod: m.id as 1 | 2 | 3 | 4,
                            });
                            triggerToast(`Prayer method set to ${m.label}`);
                          }}
                          className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-2xl border text-left flex items-center justify-between gap-2 text-xs font-extrabold transition ${
                            active
                              ? 'bg-[#14532D] text-white border-[#D4AF37]'
                              : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)]'
                          }`}
                        >
                          <span>{m.label}</span>
                          {active && <Check className="w-4 h-4 text-amber-300 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[var(--divider)]">
                  <p className="text-xs font-extrabold text-[var(--text-primary)]">
                    Asr Juristic School
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 0 as const, label: 'Standard', desc: 'Shafi, Maliki, Hanbali' },
                      { id: 1 as const, label: 'Hanafi', desc: 'Later shadow ratio' },
                    ].map((sch) => {
                      const active = (user.prayerAsrSchool ?? 1) === sch.id;
                      return (
                        <button
                          key={sch.id}
                          type="button"
                          onClick={() => {
                            updateUser({ prayerAsrSchool: sch.id });
                            triggerToast(`Asr school set to ${sch.label}`);
                          }}
                          className={`min-h-[54px] p-3 rounded-2xl border text-left transition ${
                            active
                              ? 'bg-[#14532D] text-white border-[#D4AF37]'
                              : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)]'
                          }`}
                        >
                          <p className="text-xs font-extrabold">{sch.label}</p>
                          <p className={`text-[11px] ${active ? 'text-emerald-200' : 'text-[var(--text-muted)]'}`}>
                            {sch.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </BottomSheet>

            <div className="px-4 pt-4 space-y-3">
              {/* 1-Tap OEM Battery-Guard Wizard Banner for Reliable Fajr & Adhan Alarms */}
              <button
                type="button"
                onClick={() => {
                  void triggerSelectionHaptic();
                  setBatteryGuardOpen(true);
                }}
                className="w-full min-h-[54px] rounded-2xl bg-[var(--bg-surface)] border border-amber-300/70 dark:border-amber-500/35 px-3.5 py-2.5 flex items-center justify-between gap-2.5 text-left shadow-2xs active:scale-[0.99] transition"
              >
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-[#14532D] dark:text-amber-300">
                    Adhan Alarm Battery-Guard Wizard
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)] truncate">
                    Prevent Xiaomi, Samsung, Vivo & Oppo from silencing Fajr alerts
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-emerald-950 text-[11px] font-extrabold shrink-0">
                  Fix Alerts
                </span>
              </button>

              {salahSubView === 'tracker' ? (
                <>
                  {/* 7-Day & 30-Day Consistency Strip */}
                  <div className="rounded-2xl bg-[var(--bg-surface)] px-3.5 py-3 shadow-2xs border border-[var(--border-subtle)] space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-extrabold text-[var(--text-primary)]">
                          7-Day Log
                        </span>
                        <span className="text-xs text-[var(--text-secondary)] ml-2 tabular-nums">
                          {salahHistory.weeklyPrayedCount}/35 week · {salahHistory.monthlyPrayedCount}/150 in 30d
                        </span>
                      </div>
                      <InfoDisclosure
                        label="Method"
                        sheetTitle="Prayer Timings & Local Log"
                        sheetSubtitle={`${user.city}, ${user.country}`}
                      >
                        <p>
                          Timings are calculated for <strong>{user.city}</strong> using{' '}
                          <strong>
                            {PRAYER_CALCULATION_METHODS.find(
                              (m) => m.id === (user.prayerCalculationMethod || 1)
                            )?.label || 'Karachi'}
                          </strong>{' '}
                          ({(user.prayerAsrSchool ?? 1) === 1 ? 'Hanafi Asr' : 'Standard Asr'}).
                        </p>
                        <p>
                          Your self-reported prayer log and excused-day entries are stored privately
                          on your device and never leave your phone.
                        </p>
                      </InfoDisclosure>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      {last7Days.map((d) => (
                        <button
                          key={d.key}
                          type="button"
                          onClick={() => setSalahDayOffset(d.offset)}
                          className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition ${
                            salahDayOffset === d.offset
                              ? 'bg-emerald-50 dark:bg-emerald-900/45 ring-1 ring-[#14532D] dark:ring-amber-400/60'
                              : ''
                          }`}
                        >
                          <span className="text-[11px] font-bold text-[var(--text-muted)]">
                            {d.dayLabel}
                          </span>
                          <span
                            className={`w-6 h-6 rounded-full text-[11px] font-extrabold flex items-center justify-center tabular-nums ${
                              d.doneCount === 5
                                ? 'bg-[#14532D] text-white'
                                : d.doneCount > 0
                                ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200'
                                : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
                            }`}
                          >
                            {d.doneCount}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {(() => {
                      const nextPrayerState = computeNextPrayerState(
                        prayerTimings,
                        new Date(),
                        activeSalahPrayers
                      );
                      return (
                        [
                          { name: 'Fajr' as PrayerName, time: prayerTimings.Fajr, icon: 'crescent' },
                          { name: 'Dhuhr' as PrayerName, time: prayerTimings.Dhuhr, icon: 'sun' },
                          { name: 'Asr' as PrayerName, time: prayerTimings.Asr, icon: 'sun' },
                          { name: 'Maghrib' as PrayerName, time: prayerTimings.Maghrib, icon: 'crescent' },
                          { name: 'Isha' as PrayerName, time: prayerTimings.Isha, icon: 'moon' },
                        ] as const
                      ).map((p) => {
                        const status: PrayerStatus = activeSalahPrayers[p.name] || 'pending';
                        const isDone = status === 'prayed_on_time' || status === 'prayed';
                        const statusLabel =
                          status === 'prayed_on_time'
                            ? 'On Time'
                            : status === 'prayed'
                            ? 'Prayed'
                            : status === 'qaza'
                            ? 'Qaza'
                            : status === 'excused'
                            ? 'Excused'
                            : 'Log';
                        const isNextPendingToday =
                          salahDayOffset === 0 &&
                          !nextPrayerState.isRolloverToTomorrow &&
                          nextPrayerState.nextPrayer === p.name &&
                          status === 'pending';
                        const isNextTomorrowRollover =
                          salahDayOffset === 0 &&
                          nextPrayerState.isRolloverToTomorrow &&
                          p.name === 'Fajr';

                        return (
                          <div
                            key={p.name}
                            className="w-full rounded-2xl bg-[var(--bg-surface)] px-4 py-3 shadow-2xs border border-[var(--border-subtle)] flex items-center justify-between gap-2"
                          >
                            <button
                              type="button"
                              onClick={() => togglePrayerStatus(activeSalahDateKey, p.name)}
                              className="flex items-center gap-3.5 text-left flex-1 min-w-0"
                            >
                              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                                {p.icon === 'sun' ? (
                                  <Sun className="w-5 h-5" />
                                ) : (
                                  <Moon className="w-5 h-5" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-extrabold text-[var(--text-primary)]">
                                  {p.name}
                                </p>
                                <p className="text-xs text-[var(--text-secondary)] tabular-nums">
                                  {p.time}
                                  {isNextPendingToday ? ` · ${nextPrayerState.countdownLabel}` : ''}
                                  {isNextTomorrowRollover ? ` · Tomorrow` : ''}
                                </p>
                              </div>
                            </button>

                            <div className="flex items-center gap-2 shrink-0">
                              <SelectSheetField
                                title={`${p.name} Prayer Status`}
                                subtitle={`Update status for ${activeSalahDateKey}`}
                                ariaLabel={`${p.name} status`}
                                variant="inline"
                                value={status}
                                onChange={(val) =>
                                  setPrayerStatusExplicit(
                                    activeSalahDateKey,
                                    p.name,
                                    val as PrayerStatus
                                  )
                                }
                                options={[
                                  { value: 'pending', label: 'Pending', subtitle: 'Not logged yet' },
                                  { value: 'prayed_on_time', label: 'On Time', subtitle: 'Prayed within its time' },
                                  { value: 'prayed', label: 'Prayed', subtitle: 'Completed' },
                                  { value: 'qaza', label: 'Qaza', subtitle: 'Made up after time' },
                                  { value: 'excused', label: 'Excused', subtitle: 'Exempt (streak protected)' },
                                ]}
                              />

                              <SalahStatusButton
                                active={isDone || status === 'qaza' || status === 'excused'}
                                label={statusLabel}
                                ariaLabel={`Toggle ${p.name} (${statusLabel})`}
                                activeClassName={
                                  isDone
                                    ? 'bg-[#14532D] border-[#14532D] text-white'
                                    : status === 'qaza'
                                    ? 'bg-amber-500 border-amber-500 text-emerald-950'
                                    : 'bg-purple-600 border-purple-600 text-white'
                                }
                                onClick={() => togglePrayerStatus(activeSalahDateKey, p.name)}
                              />
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>

                  {/* Phase 11 Complete Salah Guides, Madhhab Selector & Women's Excused Prayer Mode */}
                  <SalahCompleteGuideAndExcusedPanel
                    activeDateKey={activeSalahDateKey}
                    onTriggerToast={triggerToast}
                  />

                  {/* Native Azan Notification Scheduler & Home-Screen Salah Widget Studio */}
                  <NativeApkAndAzanNotificationStudio
                    prayerTimes24h={prayerTimings}
                    city={user.city || 'Jamshedpur'}
                    hijriDate={hijriLabel}
                    onTriggerToast={triggerToast}
                  />

                  {/* Prayer Guide & Wudu Guide Cards at Bottom */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setSalahSubView('prayer_guide')}
                      className="rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] shadow-2xs text-left flex items-center gap-2.5 hover:border-[#14532D]/50 transition"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-200 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-[var(--text-primary)]">
                          {t('prayer_guide')}
                        </p>
                        <p className="text-[11px] text-[var(--text-secondary)]">
                          Step by step + Audio
                        </p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSalahSubView('wudu_guide')}
                      className="rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] shadow-2xs text-left flex items-center gap-2.5 hover:border-[#14532D]/50 transition"
                    >
                      <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-200 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-[var(--text-primary)]">
                          {t('wudu_guide')}
                        </p>
                        <p className="text-[11px] text-[var(--text-secondary)]">
                          With illustrations
                        </p>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setSalahSubView('tracker')}
                    className="min-h-[40px] text-xs font-extrabold text-[#14532D] dark:text-amber-300 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Daily Salah Tracker</span>
                  </button>
                  {(salahSubView === 'prayer_guide' ? SALAH_STEPS : WUDU_STEPS).map((s: any) => (
                    <div
                      key={s.step}
                      className="rounded-2xl bg-[var(--bg-surface)] p-4 shadow-2xs border border-[var(--border-subtle)] space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-[#14532D] dark:text-amber-300">
                          Step {s.step} · {s.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-arabic text-lg text-[var(--text-primary)] font-bold">
                            {s.arabic}
                          </span>
                          {s.arabic && (
                            <button
                              type="button"
                              onClick={() => {
                                speakArabicOrPlayAudio(undefined, s.arabic);
                                triggerToast('Playing Arabic pronunciation');
                              }}
                              className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-amber-300 flex items-center justify-center"
                              title="Listen to Arabic pronunciation"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                      {s.transliteration && (
                        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 italic">
                          {s.transliteration}
                        </p>
                      )}
                      <p className="text-xs text-[var(--text-secondary)]">{s.meaning || s.desc}</p>
                    </div>
                  ))}
                  <VerifiedSourceFooter
                    source={
                      salahSubView === 'prayer_guide'
                        ? 'Sahih al-Bukhari (Book of Adhan / Sifat as-Salah) & Sahih Muslim'
                        : 'Quran 5:6 & Sahih al-Bukhari 159 (Hadith of Humran on Prophetic Wudu)'
                    }
                    reference="Verified Sunni Fiqh & Hadith Compendium"
                  />
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'duas': {
        const categories = [
          {
            id: 'morning_evening',
            title: 'Morning & Evening',
            sub: 'Daily protection',
            color: 'from-[#F59E0B] to-[#D97706] text-white',
            icon: Sun,
          },
          {
            id: 'eating',
            title: 'Before Eating',
            sub: 'Blessed meals',
            color: 'from-[#9333EA] to-[#7E22CE] text-white',
            icon: Heart,
          },
          {
            id: 'after_eating',
            title: 'After Eating',
            sub: 'Gratitude to Allah',
            color: 'from-[#65A30D] to-[#4D7C0F] text-white',
            icon: Sparkles,
          },
          {
            id: 'travel',
            title: 'Travel',
            sub: 'Safe journey',
            color: 'from-[#38BDF8] to-[#0284C7] text-white',
            icon: Compass,
          },
          {
            id: 'sleep',
            title: 'Sleep',
            sub: 'Peaceful rest',
            color: 'from-[#6366F1] to-[#4338CA] text-white',
            icon: Moon,
          },
          {
            id: 'family',
            title: 'Family',
            sub: 'For loved ones',
            color: 'from-[#FBBF24] to-[#D97706] text-amber-950',
            icon: User,
          },
          {
            id: 'health',
            title: 'Health',
            sub: 'Healing & strength',
            color: 'from-[#6EE7B7] to-[#10B981] text-emerald-950',
            icon: Heart,
          },
          {
            id: 'all',
            title: 'All Duas',
            sub: 'Browse all',
            color: 'from-[#64748B] to-[#475569] text-white',
            icon: BookOpen,
          },
        ];

        const displayedDuas = VERIFIED_DUAS.filter((d) => {
          if (duaTab === 'Favorites' && !favoriteDuaIds.includes(d.id)) return false;
          if (selectedDuaCategory && selectedDuaCategory !== 'all') {
            if (selectedDuaCategory === 'after_eating') {
              if (d.id !== 'dua_after_eating' && d.category !== 'eating') return false;
            } else if (selectedDuaCategory === 'eating') {
              if (d.category !== 'eating') return false;
            } else if (d.category !== selectedDuaCategory) {
              return false;
            }
          }
          if (duaSearch.trim()) {
            const q = duaSearch.toLowerCase();
            return (
              d.title.toLowerCase().includes(q) ||
              d.transliteration.toLowerCase().includes(q) ||
              d.translations.en.toLowerCase().includes(q)
            );
          }
          return true;
        });

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
            {/* Screen 6: Duas Library */}
            <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 shadow-md">
              <MobileStatusBar time="9:31" light />
              <div className="flex items-center justify-between px-4 pt-1 pb-3">
                <ScreenBackButton variant="dark" />
                <h1 className="text-lg font-extrabold">{t('duas')}</h1>
                <button
                  type="button"
                  onClick={() => setDuaTab('Favorites')}
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-amber-300 transition"
                  title="Saved Duas"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>

              <div className="mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full">
                {(['Categories', 'Daily', 'Favorites'] as const).map((tName) => (
                  <button
                    key={tName}
                    type="button"
                    onClick={() => {
                      setDuaTab(tName);
                      if (tName !== 'Categories') setSelectedDuaCategory(null);
                    }}
                    className={`min-h-[38px] py-1.5 rounded-full text-xs font-extrabold transition ${
                      duaTab === tName
                        ? 'bg-amber-400 text-emerald-950 shadow-xs'
                        : 'text-emerald-100 hover:bg-white/10'
                    }`}
                  >
                    {tName === 'Favorites' ? `Favorites (${favoriteDuaIds.length})` : tName}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 pt-4 space-y-4">
              {/* Search Bar across all Duas */}
              <div className="relative">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={duaSearch}
                  onChange={(e) => {
                    setDuaSearch(e.target.value);
                    if (e.target.value.trim() && duaTab === 'Categories' && !selectedDuaCategory) {
                      setSelectedDuaCategory('all');
                    }
                  }}
                  placeholder="Search Duas by topic, meaning or transliteration..."
                  className="w-full min-h-[44px] rounded-full ilmizo-input pl-10 pr-4 py-2.5 text-xs font-medium shadow-2xs"
                />
              </div>

              {duaTab === 'Categories' && !selectedDuaCategory && (
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedDuaCategory(cat.id)}
                        className={`rounded-2xl bg-gradient-to-br ${cat.color} p-4 text-center shadow-sm hover:scale-[1.01] transition min-h-[104px] flex flex-col items-center justify-center gap-1.5`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-extrabold leading-tight">{cat.title}</h3>
                        <p className="text-xs opacity-90">{cat.sub}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {(selectedDuaCategory || duaTab !== 'Categories') && (
                <div className="space-y-3">
                  {selectedDuaCategory && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDuaCategory(null);
                        setDuaSearch('');
                      }}
                      className="min-h-[38px] text-xs font-extrabold text-[#14532D] dark:text-amber-300 flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Categories Grid</span>
                    </button>
                  )}
                  {displayedDuas.map((dua) => {
                    const isFav = favoriteDuaIds.includes(dua.id);
                    return (
                      <div
                        key={dua.id}
                        className="rounded-3xl bg-[var(--bg-surface)] p-4 shadow-xs border border-[var(--border-subtle)] space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                              {dua.title}
                            </h3>
                            <p className="text-[11px] font-semibold text-[#14532D] dark:text-emerald-300 mt-0.5">
                              {dua.verification.status === 'Verified' ? 'Verified' : 'Review'} ·{' '}
                              {resolveDuaHumanAudio(dua).reciterName}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                void playHumanDuaAudio({
                                  dua,
                                  rate: user.playbackRate || 1,
                                  onStatus: (msg) => triggerToast(msg),
                                });
                              }}
                              className="px-3 h-9 rounded-full bg-[#14532D] text-amber-200 flex items-center gap-1 text-xs font-extrabold shadow-2xs hover:bg-emerald-800 transition"
                              title="Listen to Real Human Qari Audio (MP3)"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                              <span>Audio</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyText(
                                  `${dua.title}\n${dua.arabic}\n${dua.transliteration}\n"${resolveText(
                                    dua.translations,
                                    dua.translations.en
                                  )}"\nSource: ${dua.verification.source}`,
                                  `Copied "${dua.title}" with verified source`
                                )
                              }
                              className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center"
                              title="Share / Copy Dua"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleFavoriteDua(dua.id)}
                              className={`w-9 h-9 rounded-full flex items-center justify-center transition active:scale-90 ${
                                isFav
                                  ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300'
                                  : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
                              }`}
                              title="Save to Favorites"
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </button>
                          </div>
                        </div>
                        <p className="font-arabic text-2xl text-[var(--text-primary)] text-right leading-[2.05]" dir="rtl" lang="ar">
                          {dua.arabic}
                        </p>
                        <p className="text-xs font-semibold text-[#14532D] dark:text-emerald-300 italic">
                          {dua.transliteration}
                        </p>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {resolveText(dua.translations, dua.translations.en)}
                        </p>
                        {dua.whenToUse && (
                          <p className="text-xs text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/30 rounded-xl px-3 py-2">
                            <strong>When to recite:</strong> {dua.whenToUse}
                          </p>
                        )}
                        <VerifiedSourceFooter
                          source={dua.verification.source}
                          reference={dua.verification.reference}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'names99': {
        const currentName = ASMA_UL_HUSNA[nameIdx] || ASMA_UL_HUSNA[0];
        const filteredNames = ASMA_UL_HUSNA.filter(
          (n) =>
            n.transliteration.toLowerCase().includes(namesSearch.toLowerCase()) ||
            n.meaning.toLowerCase().includes(namesSearch.toLowerCase()) ||
            String(n.number).includes(namesSearch)
        );
        const quizQuestion = build99NamesQuizQuestion(ASMA_UL_HUSNA, namesQuizIdx);
        const quizTarget = quizQuestion.target;
        const quizOptions = quizQuestion.options;

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
            {/* Screen 7: 99 Names of Allah */}
            <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-3.5 shadow-md">
              <MobileStatusBar time="9:31" light />
              <div className="flex items-center justify-between px-4 pt-1 pb-2.5">
                <ScreenBackButton variant="dark" />
                <h1 className="text-base font-extrabold">{t('names_99')}</h1>
                <InfoDisclosure
                  label="Sources"
                  variant="dark"
                  sheetTitle="Scholarly Note on the 99 Names"
                  sheetSubtitle="Enumeration & Educational Reflections"
                >
                  <p>
                    The virtue of learning and living by Allah’s 99 Names is established in{' '}
                    <strong>Sahih al-Bukhari (2736)</strong> and{' '}
                    <strong>Sahih Muslim (2677)</strong>.
                  </p>
                  <p>
                    The widely taught 99-Name listing follows the narration of Al-Walid ibn Muslim
                    in <strong>Jami` at-Tirmidhi (3507)</strong>. Reflections shown alongside each
                    Name are educational Tadabbur and not normative fiqh rulings.
                  </p>
                </InfoDisclosure>
              </div>

              <div className="mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full">
                {[
                  { id: 'card' as const, label: 'Scenic Card' },
                  { id: 'list' as const, label: 'Browse List' },
                  { id: 'quiz' as const, label: 'Recall Quiz' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setNamesViewMode(m.id)}
                    className={`min-h-[38px] py-1 rounded-full text-xs font-extrabold transition ${
                      namesViewMode === m.id
                        ? 'bg-amber-400 text-emerald-950 shadow-xs'
                        : 'text-emerald-100 hover:bg-white/10'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 pt-4 space-y-4">
              {namesViewMode === 'card' && (
                <>
                  {/* Ornate Emerald & Gold Calligraphic Centerpiece Card */}
                  <div className="relative rounded-[28px] border border-[#D4AF37]/60 bg-gradient-to-b from-[#072217] via-[#0D3323] to-[#0B2E1F] text-center text-white shadow-xl overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-amber-400/15 blur-3xl"
                    />
                    <div className="pt-7 pb-5 px-5 relative z-10 flex flex-col items-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/15 border border-amber-300/35 text-[11px] font-bold text-amber-200 tabular-nums mb-3">
                        Name #{currentName.number} of 99
                      </span>
                      <div className="w-36 h-36 rounded-full bg-gradient-to-b from-amber-300/20 via-emerald-950/60 to-emerald-950/90 border border-[#D4AF37]/70 shadow-[0_0_32px_rgba(212,175,55,0.22)] flex items-center justify-center px-3 mb-3">
                        <p className="font-arabic text-4xl sm:text-5xl text-[#FDE68A] font-bold drop-shadow-md leading-tight">
                          {currentName.arabic}
                        </p>
                      </div>
                      <h2 className="text-xl font-extrabold tracking-tight">{currentName.transliteration}</h2>
                      <p className="text-sm text-emerald-100/95 font-medium mt-0.5">
                        {resolveText(currentName.translations, currentName.meaning)}
                      </p>
                    </div>

                    {/* Scenic Mosque Garden Illustration */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src="/assets/illustrations/adult_99names_scenic.webp"
                        alt="Paradise Garden"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-[#0B2E1F]" />
                      <div className="absolute bottom-3.5 inset-x-4 flex flex-col items-center gap-2">
                        <p className="text-xs text-emerald-50 line-clamp-2 max-w-sm leading-relaxed">
                          <strong className="text-amber-200">Reflection:</strong>{' '}
                          {currentName.reflection}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-200 bg-black/45 border border-white/10 px-3 py-1 rounded-full backdrop-blur-xs tabular-nums">
                          <span>{studiedNames99Numbers.length} / 99 Studied</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Media Controls Row */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setNameIdx(Math.floor(Math.random() * ASMA_UL_HUSNA.length))}
                      className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] flex items-center justify-center"
                      title="Random Name"
                    >
                      <Shuffle className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setNameIdx((i) => (i > 0 ? i - 1 : ASMA_UL_HUSNA.length - 1))}
                      className="w-11 h-11 rounded-full bg-[#14532D] text-white flex items-center justify-center shadow-xs active:scale-95 transition"
                      title="Previous Name"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        markName99Studied(currentName.number, currentName.transliteration);
                        speakArabicOrPlayAudio(undefined, currentName.arabic);
                        triggerToast(`Studied ${currentName.transliteration}`);
                      }}
                      className="w-14 h-14 rounded-full bg-[#14532D] text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-900/20 dark:ring-amber-400/25 active:scale-95 transition"
                      title="Play Pronunciation & Mark Studied"
                    >
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        markName99Studied(currentName.number, currentName.transliteration);
                        setNameIdx((i) => (i + 1) % ASMA_UL_HUSNA.length);
                      }}
                      className="w-11 h-11 rounded-full bg-[#14532D] text-white flex items-center justify-center shadow-xs active:scale-95 transition"
                      title="Next Name"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => speakArabicOrPlayAudio(undefined, currentName.arabic)}
                      className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] flex items-center justify-center"
                      title="Repeat Audio"
                    >
                      <Repeat className="w-4 h-4" />
                    </button>
                  </div>

                  <VerifiedSourceFooter
                    source={currentName.verification.source}
                    reference={currentName.verification.reference}
                  />
                </>
              )}

              {namesViewMode === 'list' && (
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={namesSearch}
                      onChange={(e) => setNamesSearch(e.target.value)}
                      placeholder="Search Name of Allah or meaning..."
                      className="w-full min-h-[44px] rounded-full ilmizo-input pl-10 pr-4 py-2.5 text-xs font-medium shadow-2xs"
                    />
                  </div>
                  <div className="space-y-2">
                    {filteredNames.map((item) => {
                      const idxInFull = ASMA_UL_HUSNA.findIndex((n) => n.number === item.number);
                      return (
                        <button
                          key={item.number}
                          type="button"
                          onClick={() => {
                            setNameIdx(Math.max(0, idxInFull));
                            setNamesViewMode('card');
                          }}
                          className="w-full text-left rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] hover:border-[#14532D]/50 shadow-2xs flex items-center justify-between gap-3 transition"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-amber-300 font-extrabold text-xs flex items-center justify-center tabular-nums shrink-0">
                              {item.number}
                            </span>
                            <div>
                              <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                                {item.transliteration}
                              </h3>
                              <p className="text-xs text-[var(--text-secondary)]">
                                {resolveText(item.translations, item.meaning)}
                              </p>
                            </div>
                          </div>
                          <span className="font-arabic text-2xl font-bold text-[#14532D] dark:text-amber-300">
                            {item.arabic}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {namesViewMode === 'quiz' && (
                <div className="rounded-3xl bg-[var(--bg-surface)] p-5 border border-[var(--border-subtle)] shadow-xs space-y-4">
                  {namesQuizDone ? (
                    <div className="text-center space-y-3">
                      <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto">
                        <Award className="w-7 h-7" />
                      </div>
                      <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
                        Asma ul-Husna Recall Complete!
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)]">
                        You scored{' '}
                        <strong className="text-[#14532D] dark:text-amber-300 tabular-nums">
                          {namesQuizScore} / {ASMA_UL_HUSNA.length}
                        </strong>
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setNamesQuizIdx(0);
                          setNamesQuizScore(0);
                          setNamesQuizSelected(null);
                          setNamesQuizDone(false);
                        }}
                        className="w-full min-h-[44px] py-2.5 rounded-2xl bg-[#14532D] text-white text-xs font-extrabold"
                      >
                        Practice Again
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between text-xs font-bold text-[var(--text-secondary)]">
                        <span>Match the Divine Name</span>
                        <span className="tabular-nums">
                          {namesQuizIdx + 1} / {ASMA_UL_HUSNA.length}
                        </span>
                      </div>
                      <div className="rounded-2xl bg-[#0F3826] text-white p-4 text-center">
                        <p className="font-arabic text-4xl text-amber-300 font-bold">
                          {quizTarget.arabic}
                        </p>
                        <p className="text-base font-extrabold mt-1">
                          {quizTarget.transliteration}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {quizOptions.map((opt) => {
                          const isCorrect = validate99NamesQuizAnswer(quizTarget, opt);
                          const isPicked =
                            namesQuizSelected !== null &&
                            namesQuizSelected.number === opt.number &&
                            namesQuizSelected.meaning === opt.meaning;
                          return (
                            <button
                              key={`${opt.number}_${opt.meaning}`}
                              type="button"
                              disabled={namesQuizSelected !== null}
                              onClick={() => {
                                setNamesQuizSelected(opt);
                                if (validate99NamesQuizAnswer(quizTarget, opt)) {
                                  setNamesQuizScore((s) => s + 1);
                                }
                              }}
                              className={`w-full min-h-[46px] text-left p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-between ${
                                namesQuizSelected !== null
                                  ? isCorrect
                                    ? 'bg-emerald-50 dark:bg-emerald-900/40 border-emerald-600 text-emerald-950 dark:text-emerald-100'
                                    : isPicked
                                    ? 'bg-rose-50 dark:bg-rose-900/40 border-rose-500 text-rose-900 dark:text-rose-100'
                                    : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]'
                                  : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[#14532D]'
                              }`}
                            >
                              <span>{opt.meaning}</span>
                              {namesQuizSelected !== null && isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        disabled={namesQuizSelected === null}
                        onClick={() => {
                          if (namesQuizIdx + 1 < ASMA_UL_HUSNA.length) {
                            setNamesQuizIdx((i) => i + 1);
                            setNamesQuizSelected(null);
                          } else {
                            recordQuizAttempt({
                              quizId: 'quiz_names_99_recall',
                              quizTitle: '99 Names of Allah Recall',
                              score: namesQuizScore,
                              total: ASMA_UL_HUSNA.length,
                              mode: 'adult',
                            });
                            setNamesQuizDone(true);
                          }
                        }}
                        className="w-full min-h-[44px] py-2.5 rounded-2xl bg-[#14532D] disabled:opacity-40 text-white text-xs font-extrabold"
                      >
                        {namesQuizIdx + 1 < ASMA_UL_HUSNA.length ? 'Next Name' : 'Finish Quiz'}
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'seerah': {
        const activeSeerah =
          SEERAH_TIMELINE.find((ev) => ev.id === selectedSeerahId) || SEERAH_TIMELINE[0];
        const thumbs = [
          '/assets/illustrations/adult_mosque_banner.webp',
          '/assets/illustrations/adult_calendar_mosque.webp',
          '/assets/illustrations/adult_99names_scenic.webp',
        ];

        return (
          <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
            {/* Screen 8: Seerah Timeline */}
            <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 shadow-md">
              <MobileStatusBar time="9:31" light />
              <div className="flex items-center justify-between px-4 pt-1 pb-3">
                <ScreenBackButton variant="dark" />
                <h1 className="text-lg font-extrabold">Seerah</h1>
                <button
                  type="button"
                  onClick={() => setSeerahTab(seerahTab === 'Map' ? 'Timeline' : 'Map')}
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-amber-300 transition"
                  title="Toggle Hijaz Map View"
                >
                  <MapPin className="w-4 h-4" />
                </button>
              </div>

              <div className="mx-4 grid grid-cols-4 gap-1 bg-black/25 p-1 rounded-full">
                {(['Timeline', 'Stories', 'Lessons', 'Map'] as const).map((tName) => (
                  <button
                    key={tName}
                    type="button"
                    onClick={() => setSeerahTab(tName)}
                    className={`min-h-[38px] py-1.5 rounded-full text-xs font-extrabold transition ${
                      seerahTab === tName
                        ? 'bg-amber-400 text-emerald-950 shadow-xs'
                        : 'text-emerald-100 hover:bg-white/10'
                    }`}
                  >
                    {tName}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 pt-4 space-y-3">
              {/* Seerah Search & Period Filter */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={seerahSearch}
                    onChange={(e) => setSeerahSearch(e.target.value)}
                    placeholder="Search Seerah events, years or lessons..."
                    className="w-full min-h-[42px] rounded-full ilmizo-input pl-10 pr-4 py-2 text-xs font-medium shadow-2xs"
                  />
                </div>
                <div className="flex gap-1.5">
                  {(['All', 'Makkah', 'Madinah'] as const).map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSeerahLocationFilter(loc)}
                      className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-extrabold transition ${
                        seerahLocationFilter === loc
                          ? 'bg-[#14532D] text-white'
                          : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {seerahTab === 'Map' ? (
                <div className="space-y-3">
                  {/* Interactive Hijaz Seerah Map Card */}
                  <div className="rounded-3xl bg-[#0F3826] text-white p-4 border-2 border-[#D4AF37] shadow-md space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-amber-300 font-extrabold">
                          Interactive Seerah Atlas
                        </p>
                        <h2 className="text-sm font-extrabold">
                          Makkah, Cave Hira & Al-Madinah Route
                        </h2>
                      </div>
                      <Compass className="w-5 h-5 text-amber-300" />
                    </div>

                    {/* Visual Hijaz Route Nodes */}
                    <div className="relative rounded-2xl bg-[#092418] border border-emerald-700/50 p-4 space-y-2.5">
                      {SEERAH_TIMELINE.map((ev, i) => {
                        const isSelected = ev.id === activeSeerah?.id;
                        const isSaved = seerahMilestoneIds.includes(ev.id);
                        return (
                          <button
                            key={ev.id}
                            type="button"
                            onClick={() => setSelectedSeerahId(ev.id)}
                            className={`w-full text-left rounded-xl p-2.5 border transition flex items-center justify-between ${
                              isSelected
                                ? 'bg-amber-400/20 border-amber-300 text-white'
                                : 'bg-white/5 border-white/10 text-emerald-100 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-xs flex items-center justify-center tabular-nums">
                                {i + 1}
                              </span>
                              <div>
                                <p className="text-xs font-extrabold">{ev.location}</p>
                                <p className="text-[11px] text-emerald-200">
                                  {ev.title} ({ev.years})
                                </p>
                              </div>
                            </div>
                            {isSaved && <Bookmark className="w-3.5 h-3.5 text-amber-300 fill-current" />}
                          </button>
                        );
                      })}
                    </div>

                    {activeSeerah && (
                      <div className="rounded-2xl bg-[var(--bg-surface)] text-[var(--text-primary)] p-3.5 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                            {activeSeerah.title}
                          </h3>
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                            {activeSeerah.years}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          <strong>Historical Summary:</strong> {activeSeerah.summary}
                        </p>
                        <p className="text-xs font-semibold text-[#14532D] dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/35 p-2.5 rounded-xl">
                          <strong>Educational Reflection:</strong> {activeSeerah.keyLesson}
                        </p>
                        <VerifiedSourceFooter
                          source={activeSeerah.verification.source}
                          reference={activeSeerah.verification.reference}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                SEERAH_TIMELINE.filter((ev) => {
                  if (
                    seerahLocationFilter !== 'All' &&
                    !ev.location.toLowerCase().includes(seerahLocationFilter.toLowerCase())
                  ) {
                    return false;
                  }
                  if (seerahSearch.trim()) {
                    const q = seerahSearch.toLowerCase();
                    return (
                      ev.title.toLowerCase().includes(q) ||
                      ev.summary.toLowerCase().includes(q) ||
                      ev.keyLesson.toLowerCase().includes(q) ||
                      ev.years.toLowerCase().includes(q)
                    );
                  }
                  return true;
                }).map((ev, idx) => {
                  const isExpanded = selectedSeerahId === ev.id;
                  const isSaved = seerahMilestoneIds.includes(ev.id);
                  return (
                    <div
                      key={ev.id}
                      className="rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedSeerahId(isExpanded ? '' : ev.id)}
                          className="flex items-center gap-3 text-left flex-1 min-w-0"
                        >
                          <img
                            src={thumbs[idx % thumbs.length]}
                            alt={ev.title}
                            loading="lazy"
                            decoding="async"
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-amber-300/40"
                          />
                          <div className="min-w-0">
                            <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                              {ev.title}
                            </h3>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                              {ev.years} · {ev.location} ·{' '}
                              {ev.verification.status === 'Verified' ? 'Verified' : 'Review'}
                            </p>
                          </div>
                        </button>
                        <div className="flex items-center gap-1 shrink-0">
                          <BookmarkPopButton
                            saved={isSaved}
                            onToggle={() => {
                              toggleSeerahMilestone(ev.id);
                              triggerToast(
                                isSaved
                                  ? `Removed "${ev.title}" from studied milestones`
                                  : `Marked "${ev.title}" studied & saved`
                              );
                            }}
                          />
                          <ChevronRight
                            className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${
                              isExpanded ? 'rotate-90' : ''
                            }`}
                          />
                        </div>
                      </div>
                      {(seerahTab !== 'Timeline' || isExpanded) && (
                        <div className="pt-2 border-t border-[var(--divider)] space-y-2 text-xs text-[var(--text-secondary)]">
                          <p className="leading-relaxed">
                            <strong className="text-[var(--text-primary)]">Verified Historical Account:</strong>{' '}
                            {seerahTab === 'Lessons' ? ev.keyLesson : ev.summary}
                          </p>
                          {seerahTab !== 'Lessons' && (
                            <p className="text-xs font-semibold text-[#14532D] dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/35 p-2.5 rounded-xl">
                              <strong>Educational Reflection:</strong> {ev.keyLesson}
                            </p>
                          )}
                          <VerifiedSourceFooter
                            source={ev.verification.source}
                            reference={ev.verification.reference}
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      }

      case 'quran_journal':
        return <QuranJournalScreen onTriggerToast={triggerToast} />;
      case 'lessons':
        return (
          <AdultLessonsScreen
            initialTab={lessonsTabRequest.tab}
            tabRequestNonce={lessonsTabRequest.nonce}
          />
        );
      case 'quizzes':
        return <AdultQuizzesScreen />;
      case 'progress':
        return <AdultProgressScreen />;
      case 'qibla':
        return <AdultQiblaScreen />;
      case 'tasbih':
        return <AdultTasbihScreen />;
      case 'calendar':
        return <AdultCalendarScreen />;
      case 'tasks_expenses':
        return <AdultTasksAndExpensesScreen />;
      case 'more':
        return <AdultMoreSettingsScreen />;
      case 'profile':
        return <AdultProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <div
      {...swipeHandlers}
      className="relative min-h-dvh flex-1 flex flex-col bg-[var(--bg-app)] text-[var(--text-primary)] touch-pan-y transition-colors"
    >
      {/* Floating Toast Confirmation */}
      {toastMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#0F3826] text-amber-200 border border-amber-400/50 px-4 py-2 rounded-full shadow-lg text-xs font-extrabold flex items-center gap-2 max-w-[90vw]">
          <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="truncate">{toastMsg}</span>
        </div>
      )}

      <div
        className="flex-1 will-change-transform"
        style={{
          transform: swipeFeedback.offsetX
            ? `translateX(${swipeFeedback.offsetX}px)`
            : undefined,
          transition: swipeFeedback.swiping
            ? 'none'
            : 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <Suspense fallback={<ScreenSkeleton />}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={adultRoute}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.17, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </div>

      {/* Adult 5-Tab Bottom Navigation Bar (Home | Quran | Salah | Learn | More) */}
      <AdultBottomNav activeRoute={adultRoute} onSelectRoute={setAdultRoute} t={t} />

      <FamilyPlusPaywallModal
        open={adultPaywallOpen}
        onClose={() => setAdultPaywallOpen(false)}
        triggerReason={adultPaywallReason}
        skipParentGate
        onUnlocked={(msg) => triggerToast(msg)}
      />

      <SpecialModulesHub
        activeModule={activeSpecialModule}
        onClose={() => {
          setActiveSpecialModule(null);
          setCustomReminderAyah(null);
        }}
        onNavigateAdultRoute={(route) => setAdultRoute(route)}
        onOpenSurahInReader={(surahNum) => openSurahForReading(surahNum, 1)}
        reciterName={user.reciterName || 'Mishary Rashid Alafasy'}
        language={language}
        initialCustomAyah={customReminderAyah}
      />

      <OemBatteryGuardSheet
        open={batteryGuardOpen}
        onClose={() => setBatteryGuardOpen(false)}
        onToast={triggerToast}
      />
    </div>
  );
};
