import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BookOpen,
  Car,
  Check,
  CheckCircle2,
  Compass,
  Download,
  GitBranch,
  Heart,
  ListMusic,
  Pause,
  Play,
  Plus,
  Share2,
  SkipBack,
  SkipForward,
  Sparkles,
  Sun,
  Trash2,
  X,
} from 'lucide-react';
import {
  CAR_DRIVE_PRESET_SURAHS,
  FRIDAY_SUNNAH_CHECKLIST,
  ISLAMIC_REMINDER_CARDS,
  NEW_MUSLIM_PATHWAY_STAGES,
  PROPHETS_FAMILY_TREE,
  ProphetTreeNode,
  ReminderCardItem,
} from '../../data/specialModulesData';
import { ALL_114_SURAHS, getSurahPayload } from '../../data/quranData';
import { AdultRoute, LanguageCode } from '../../types/ilmizo';
import { audioManager, useAudioManager } from '../../services/audioManager';
import { SleepTimerSheet, SleepTimerTriggerButton } from '../shared/SleepTimerSheet';
import { BottomSheet } from '../sheets/BottomSheet';
import { SelectSheetField } from '../sheets/SelectSheet';
import { triggerLightHaptic, triggerSelectionHaptic, triggerSuccessHaptic } from '../../services/hapticsService';

export type SpecialModuleId =
  | 'prophets_tree'
  | 'new_muslim'
  | 'friday_hub'
  | 'car_drive'
  | 'reminder_cards';

export interface CustomReminderAyahPayload {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  arabic: string;
  transliteration?: string;
  translation: string;
}

interface SpecialModulesHubProps {
  activeModule: SpecialModuleId | null;
  onClose: () => void;
  onNavigateAdultRoute: (route: AdultRoute) => void;
  onOpenSurahInReader: (surahNumber: number) => void;
  reciterName?: string;
  language?: LanguageCode;
  initialCustomAyah?: CustomReminderAyahPayload | null;
}

const CAR_DRIVE_QUEUE_KEY = 'ilmizo_car_drive_queue_v1';
const DEFAULT_DRIVE_QUEUE = [18, 36, 55, 56, 67, 112];

function loadCustomDriveQueue(): number[] {
  if (typeof localStorage === 'undefined') return DEFAULT_DRIVE_QUEUE;
  try {
    const raw = localStorage.getItem(CAR_DRIVE_QUEUE_KEY);
    if (!raw) return DEFAULT_DRIVE_QUEUE;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_DRIVE_QUEUE;
    const valid = parsed
      .map((n) => Number(n))
      .filter((n) => Number.isInteger(n) && n >= 1 && n <= 114);
    return valid.length > 0 ? Array.from(new Set(valid)) : DEFAULT_DRIVE_QUEUE;
  } catch {
    return DEFAULT_DRIVE_QUEUE;
  }
}

const NEW_MUSLIM_STORAGE_KEY = 'ilmizo_new_muslim_pathway_done_v1';
const FRIDAY_HUB_STORAGE_KEY = 'ilmizo_friday_hub_state_v1';

function getCurrentFridayWeekKey(): string {
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.ceil(((now.getTime() - yearStart.getTime()) / 86400000 + yearStart.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${weekNum}`;
}

export const SpecialModulesHub: React.FC<SpecialModulesHubProps> = ({
  activeModule,
  onClose,
  onNavigateAdultRoute,
  onOpenSurahInReader,
  reciterName = 'Mishary Rashid Alafasy',
  language = 'en',
  initialCustomAyah = null,
}) => {
  // --- 1. Prophets Family Tree state ---
  const [treeBranchFilter, setTreeBranchFilter] = useState<'All' | ProphetTreeNode['branch']>('All');
  const [selectedProphet, setSelectedProphet] = useState<ProphetTreeNode>(PROPHETS_FAMILY_TREE[0]);

  // --- 2. New Muslim Pathway state ---
  const [completedStages, setCompletedStages] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(NEW_MUSLIM_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [expandedStageId, setExpandedStageId] = useState<string>(NEW_MUSLIM_PATHWAY_STAGES[0].id);

  // --- 3. Friday Hub state ---
  const weekKey = useMemo(() => getCurrentFridayWeekKey(), []);
  const [fridayCheckedIds, setFridayCheckedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(FRIDAY_HUB_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && parsed.weekKey === weekKey && Array.isArray(parsed.checkedIds)
        ? parsed.checkedIds
        : [];
    } catch {
      return [];
    }
  });
  const [salawatCount, setSalawatCount] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(FRIDAY_HUB_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && parsed.weekKey === weekKey && typeof parsed.salawatCount === 'number'
        ? parsed.salawatCount
        : 0;
    } catch {
      return 0;
    }
  });

  // --- 4. Car Drive Mode state (with Custom 114-Surah Playlist & Auto-Advance) ---
  const audioState = useAudioManager();
  const [driveQueue, setDriveQueue] = useState<number[]>(() => loadCustomDriveQueue());
  const [driveSurahNumber, setDriveSurahNumber] = useState<number>(() => loadCustomDriveQueue()[0] || 18);
  const [driveSpeed, setDriveSpeed] = useState<number>(1);
  const [autoAdvanceQueue, setAutoAdvanceQueue] = useState<boolean>(true);
  const [queueEditorOpen, setQueueEditorOpen] = useState<boolean>(false);
  const [queueAddSurahVal, setQueueAddSurahVal] = useState<string>('2');
  const [sleepSheetOpen, setSleepSheetOpen] = useState<boolean>(false);
  const prevAudioStatusRef = useRef<string>(audioState.status);

  // --- 5. Islamic Reminder Cards state (15 Curated + 6,236 Any-Ayah Generator) ---
  const [reminderMode, setReminderMode] = useState<'curated' | 'any_ayah'>(
    initialCustomAyah ? 'any_ayah' : 'curated'
  );
  const [reminderCategory, setReminderCategory] = useState<'All' | ReminderCardItem['category']>('All');
  const [reminderTheme, setReminderTheme] = useState<'emerald' | 'ivory' | 'gold' | 'midnight'>('emerald');
  const [activeReminderIndex, setActiveReminderIndex] = useState<number>(0);
  const [pickerSurahNum, setPickerSurahNum] = useState<number>(initialCustomAyah?.surahNumber || 1);
  const [pickerAyahNum, setPickerAyahNum] = useState<number>(initialCustomAyah?.ayahNumber || 1);
  const [customAyahCard, setCustomAyahCard] = useState<ReminderCardItem | null>(() =>
    initialCustomAyah
      ? {
          id: `ayah_${initialCustomAyah.surahNumber}_${initialCustomAyah.ayahNumber}`,
          category: 'Trust in Allah',
          arabic: initialCustomAyah.arabic,
          transliteration: initialCustomAyah.transliteration || '',
          translation: initialCustomAyah.translation,
          source: `Qur'an · Surah ${initialCustomAyah.surahName} (${initialCustomAyah.surahNumber}:${initialCustomAyah.ayahNumber})`,
        }
      : null
  );
  const [loadingCustomAyah, setLoadingCustomAyah] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  // Sync incoming 1-tap Ayah card from Quran Reader or Mushaf View
  useEffect(() => {
    if (initialCustomAyah) {
      setReminderMode('any_ayah');
      setPickerSurahNum(initialCustomAyah.surahNumber);
      setPickerAyahNum(initialCustomAyah.ayahNumber);
      setCustomAyahCard({
        id: `ayah_${initialCustomAyah.surahNumber}_${initialCustomAyah.ayahNumber}`,
        category: 'Trust in Allah',
        arabic: initialCustomAyah.arabic,
        transliteration: initialCustomAyah.transliteration || '',
        translation: initialCustomAyah.translation,
        source: `Qur'an · Surah ${initialCustomAyah.surahName} (${initialCustomAyah.surahNumber}:${initialCustomAyah.ayahNumber})`,
      });
    }
  }, [initialCustomAyah]);

  // Load selected Surah & Ayah whenever user changes picker in Any-Ayah mode
  useEffect(() => {
    if (activeModule !== 'reminder_cards' || reminderMode !== 'any_ayah') return;
    if (
      initialCustomAyah &&
      initialCustomAyah.surahNumber === pickerSurahNum &&
      initialCustomAyah.ayahNumber === pickerAyahNum &&
      customAyahCard?.id === `ayah_${pickerSurahNum}_${pickerAyahNum}`
    ) {
      return;
    }
    let cancelled = false;
    setLoadingCustomAyah(true);
    getSurahPayload(pickerSurahNum, language, reciterName)
      .then((payload) => {
        if (cancelled) return;
        const meta = ALL_114_SURAHS[pickerSurahNum - 1];
        const safeAyahNum = Math.max(1, Math.min(meta?.ayahCount || 7, pickerAyahNum));
        const match =
          payload.ayahs.find((a) => a.numberInSurah === safeAyahNum) || payload.ayahs[0];
        if (match) {
          const translated =
            (match.translations as Record<string, string | undefined>)[language] ||
            match.translations.en;
          setCustomAyahCard({
            id: `ayah_${pickerSurahNum}_${match.numberInSurah}`,
            category: 'Trust in Allah',
            arabic: match.arabicUthmani,
            transliteration: match.transliteration || '',
            translation: translated,
            source: `Qur'an · Surah ${payload.meta.nameTranslit} (${payload.meta.number}:${match.numberInSurah})`,
          });
        }
      })
      .catch(() => {
        // retain last card if offline & surah uncached
      })
      .finally(() => {
        if (!cancelled) setLoadingCustomAyah(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeModule, reminderMode, pickerSurahNum, pickerAyahNum, language, reciterName]);

  // Auto-advance to next Surah in Custom Drive Queue when current Surah completes naturally
  useEffect(() => {
    const prev = prevAudioStatusRef.current;
    prevAudioStatusRef.current = audioState.status;
    if (
      activeModule === 'car_drive' &&
      autoAdvanceQueue &&
      prev === 'playing' &&
      audioState.status === 'idle' &&
      audioState.quranSequence.surahNumber === driveSurahNumber &&
      (audioState.quranSequence.endAyah ?? 0) > 0 &&
      (audioState.quranSequence.currentAyah ?? 0) >= (audioState.quranSequence.endAyah ?? 0)
    ) {
      const idx = driveQueue.indexOf(driveSurahNumber);
      if (idx >= 0 && driveQueue.length > 1) {
        const nextSurah = driveQueue[(idx + 1) % driveQueue.length];
        setDriveSurahNumber(nextSurah);
        void audioManager.playFullSurah({
          surahNumber: nextSurah,
          startFromAyah: 1,
          reciterName,
          rate: driveSpeed,
        });
      }
    }
  }, [
    activeModule,
    autoAdvanceQueue,
    audioState.status,
    audioState.quranSequence.surahNumber,
    audioState.quranSequence.currentAyah,
    audioState.quranSequence.endAyah,
    driveSurahNumber,
    driveQueue,
    reciterName,
    driveSpeed,
  ]);

  if (!activeModule) return null;

  const showToast = (msg: string) => {
    setShareToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setShareToast(null), 2600);
  };

  // Persist New Muslim progress
  const toggleNewMuslimStage = (stageId: string) => {
    void triggerSuccessHaptic();
    setCompletedStages((prev) => {
      const next = prev.includes(stageId) ? prev.filter((id) => id !== stageId) : [...prev, stageId];
      try {
        localStorage.setItem(NEW_MUSLIM_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Persist Friday Hub state
  const saveFridayState = (checkedIds: string[], count: number) => {
    try {
      localStorage.setItem(
        FRIDAY_HUB_STORAGE_KEY,
        JSON.stringify({ weekKey, checkedIds, salawatCount: count })
      );
    } catch {
      // ignore
    }
  };

  const toggleFridaySunnah = (id: string) => {
    void triggerSelectionHaptic();
    const next = fridayCheckedIds.includes(id)
      ? fridayCheckedIds.filter((item) => item !== id)
      : [...fridayCheckedIds, id];
    setFridayCheckedIds(next);
    saveFridayState(next, salawatCount);
  };

  const incrementSalawat = () => {
    void triggerLightHaptic();
    const nextCount = salawatCount + 1;
    setSalawatCount(nextCount);
    const nextChecked =
      nextCount >= 10 && !fridayCheckedIds.includes('jummah_salawat')
        ? [...fridayCheckedIds, 'jummah_salawat']
        : fridayCheckedIds;
    setFridayCheckedIds(nextChecked);
    saveFridayState(nextChecked, nextCount);
  };

  // Car Drive Mode controls (supports any of the 114 Surahs in custom queue)
  const persistDriveQueue = (nextQueue: number[]) => {
    const clean = nextQueue.length > 0 ? nextQueue : DEFAULT_DRIVE_QUEUE;
    setDriveQueue(clean);
    try {
      localStorage.setItem(CAR_DRIVE_QUEUE_KEY, JSON.stringify(clean));
    } catch {
      // ignore
    }
  };

  const resolveDriveSurahInfo = (num: number) => {
    const preset = CAR_DRIVE_PRESET_SURAHS.find((s) => s.number === num);
    if (preset) return preset;
    const meta = ALL_114_SURAHS[num - 1] || ALL_114_SURAHS[0];
    return {
      number: meta.number,
      name: meta.nameTranslit,
      arabic: meta.nameArabic,
      ayahs: meta.ayahCount,
      tag: meta.revelationType,
    };
  };

  const drivePreset = resolveDriveSurahInfo(driveSurahNumber);

  const handleDrivePlaySurah = (surahNum: number) => {
    void triggerSelectionHaptic();
    setDriveSurahNumber(surahNum);
    const target = resolveDriveSurahInfo(surahNum);
    void audioManager.playFullSurah({
      surahNumber: target.number,
      startFromAyah: 1,
      reciterName,
      rate: driveSpeed,
    });
  };

  const handleDriveNextQueueSurah = () => {
    const idx = driveQueue.indexOf(driveSurahNumber);
    const nextNum = driveQueue[(idx + 1 + driveQueue.length) % driveQueue.length] || driveQueue[0];
    handleDrivePlaySurah(nextNum);
  };

  const handleDriveTogglePlay = () => {
    void triggerLightHaptic();
    if (audioState.status === 'playing') {
      audioManager.pause();
    } else if (audioState.status === 'paused') {
      audioManager.resume();
    } else {
      handleDrivePlaySurah(driveSurahNumber);
    }
  };

  const handleDriveStepAyah = (delta: -1 | 1) => {
    void triggerLightHaptic();
    const currentSurah = audioState.quranSequence.surahNumber || drivePreset.number;
    const currentTotal = audioState.quranSequence.endAyah || drivePreset.ayahs;
    const currentAyah = audioState.quranSequence.currentAyah || 1;
    const nextAyah = Math.max(1, Math.min(currentTotal, currentAyah + delta));
    void audioManager.playFullSurah({
      surahNumber: currentSurah,
      startFromAyah: nextAyah,
      reciterName,
      rate: driveSpeed,
    });
  };

  const handleDriveCycleSpeed = () => {
    void triggerLightHaptic();
    const speeds = [0.75, 1, 1.25];
    const nextSpeed = speeds[(speeds.indexOf(driveSpeed) + 1) % speeds.length];
    setDriveSpeed(nextSpeed);
    audioManager.setPlaybackRate(nextSpeed);
  };

  // Filtered Reminder Cards or Active Any-Ayah Card
  const filteredReminders =
    reminderCategory === 'All'
      ? ISLAMIC_REMINDER_CARDS
      : ISLAMIC_REMINDER_CARDS.filter((c) => c.category === reminderCategory);
  const currentReminder =
    reminderMode === 'any_ayah' && customAyahCard
      ? customAyahCard
      : filteredReminders[activeReminderIndex % Math.max(1, filteredReminders.length)] ||
        ISLAMIC_REMINDER_CARDS[0];

  const reminderThemeStyles: Record<
    typeof reminderTheme,
    { bg: string; border: string; arabic: string; body: string; accent: string; canvasBg: string; canvasFg: string; canvasGold: string }
  > = {
    emerald: {
      bg: 'bg-gradient-to-br from-[#0F3D24] via-[#14532D] to-[#0B2A19]',
      border: 'border-amber-400/40',
      arabic: 'text-amber-200',
      body: 'text-emerald-50',
      accent: 'text-amber-300',
      canvasBg: '#14532D',
      canvasFg: '#FDFBF7',
      canvasGold: '#F59E0B',
    },
    ivory: {
      bg: 'bg-gradient-to-br from-[#FDFBF7] via-[#FAF3E0] to-[#F5EBD0]',
      border: 'border-amber-300/80',
      arabic: 'text-[#14532D]',
      body: 'text-slate-800',
      accent: 'text-amber-700',
      canvasBg: '#FDFBF7',
      canvasFg: '#14532D',
      canvasGold: '#B45309',
    },
    gold: {
      bg: 'bg-gradient-to-br from-[#78350F] via-[#92400E] to-[#451A03]',
      border: 'border-amber-300/50',
      arabic: 'text-amber-100',
      body: 'text-amber-50',
      accent: 'text-amber-300',
      canvasBg: '#78350F',
      canvasFg: '#FFFBEB',
      canvasGold: '#FDE68A',
    },
    midnight: {
      bg: 'bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#020617]',
      border: 'border-emerald-400/35',
      arabic: 'text-emerald-200',
      body: 'text-slate-100',
      accent: 'text-amber-300',
      canvasBg: '#0F172A',
      canvasFg: '#F8FAFC',
      canvasGold: '#F59E0B',
    },
  };

  const activeThemeStyle = reminderThemeStyles[reminderTheme];

  const handleDownloadReminderCard = () => {
    void triggerSuccessHaptic();
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background
      ctx.fillStyle = activeThemeStyle.canvasBg;
      ctx.fillRect(0, 0, 1080, 1080);

      // Decorative frame
      ctx.strokeStyle = activeThemeStyle.canvasGold;
      ctx.lineWidth = 4;
      ctx.strokeRect(48, 48, 984, 984);

      // Category label
      ctx.fillStyle = activeThemeStyle.canvasGold;
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(currentReminder.category.toUpperCase(), 540, 150);

      // Arabic text
      ctx.fillStyle = activeThemeStyle.canvasGold;
      ctx.font = 'bold 56px serif';
      ctx.fillText(currentReminder.arabic, 540, 390, 880);

      // Transliteration
      ctx.fillStyle = activeThemeStyle.canvasFg;
      ctx.font = 'italic 30px sans-serif';
      ctx.fillText(currentReminder.transliteration, 540, 510, 880);

      // Translation wrapped
      ctx.font = 'bold 36px sans-serif';
      const words = currentReminder.translation.split(' ');
      let line = '';
      let y = 630;
      for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > 840) {
          ctx.fillText(line, 540, y);
          line = word;
          y += 50;
        } else {
          line = test;
        }
      }
      if (line) ctx.fillText(line, 540, y);

      // Source & brand
      ctx.fillStyle = activeThemeStyle.canvasGold;
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(currentReminder.source, 540, 890);
      ctx.fillStyle = activeThemeStyle.canvasFg;
      ctx.globalAlpha = 0.7;
      ctx.font = '24px sans-serif';
      ctx.fillText('Ilmizo · Learn • Pray • Grow', 540, 965);

      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `ilmizo-reminder-${currentReminder.id}.png`;
      a.click();
      showToast('Reminder card saved as PNG');
    } catch {
      showToast('Could not generate image on this browser');
    }
  };

  const handleShareReminder = async () => {
    void triggerLightHaptic();
    const shareText = `${currentReminder.arabic}\n\n“${currentReminder.translation}”\n— ${currentReminder.source}\n\nShared via Ilmizo`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Ilmizo Islamic Reminder', text: shareText });
        return;
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        showToast('Reminder copied to clipboard');
      }
    } catch {
      // user cancelled
    }
  };

  // Filtered Prophets
  const visibleProphets =
    treeBranchFilter === 'All'
      ? PROPHETS_FAMILY_TREE
      : PROPHETS_FAMILY_TREE.filter((p) => p.branch === treeBranchFilter);

  const isFridayToday = new Date().getDay() === 5;
  const moduleTitles: Record<SpecialModuleId, { title: string; subtitle: string }> = {
    prophets_tree: {
      title: 'Prophets Family Tree',
      subtitle: 'All 25 Prophets mentioned by name in the Noble Quran',
    },
    new_muslim: {
      title: 'New Muslim Pathway',
      subtitle: 'Calm 7-stage offline companion for your first steps in Islam',
    },
    friday_hub: {
      title: 'Friday (Jummah) Hub',
      subtitle: 'Sunnah checklist, Surah Al-Kahf & Salawat counter',
    },
    car_drive: {
      title: 'Car Drive Mode',
      subtitle: 'Hands-free high-contrast Quran listening cockpit',
    },
    reminder_cards: {
      title: 'Islamic Reminder Cards',
      subtitle: 'Verified Quran & Hadith cards ready to save or share offline',
    },
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={moduleTitles[activeModule].title}
      className={`fixed inset-0 z-50 flex flex-col ${
        activeModule === 'car_drive'
          ? 'bg-[#071811] text-white'
          : 'bg-[var(--bg-canvas)] text-[var(--text-primary)]'
      }`}
    >
      {/* Compact Sticky Top Bar */}
      <div
        className={`shrink-0 px-4 py-3 flex items-center justify-between gap-3 border-b ${
          activeModule === 'car_drive'
            ? 'bg-[#0B2319] border-emerald-800/60 text-white'
            : 'bg-[#14532D] border-emerald-900/40 text-white'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Back"
          className="min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="min-w-0 flex-1 text-center">
          <h2 className="text-base font-extrabold truncate">{moduleTitles[activeModule].title}</h2>
          <p className="text-xs text-emerald-100/80 truncate">
            {moduleTitles[activeModule].subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-4 py-5 pb-12">
        <div className="max-w-3xl mx-auto space-y-5">
          {/* ===================== 1. PROPHETS FAMILY TREE ===================== */}
          {activeModule === 'prophets_tree' && (
            <>
              {/* Lineage Overview Banner */}
              <div className="rounded-3xl bg-gradient-to-br from-[#14532D] to-[#0D3820] text-white p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                  <GitBranch className="w-4 h-4" />
                  <span>Sacred Prophetic Lineage · Adam (AS) to Muhammad ﷺ</span>
                </div>
                <p className="text-sm text-emerald-50 leading-relaxed">
                  All 25 Prophets mentioned in the Quran carried one unbroken message of Tawhid. Tap any Prophet below to trace their lineage, Quranic Surahs, and timeless lesson.
                </p>
                {/* Visual Lineage Branch Summary */}
                <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-3">
                    <p className="font-extrabold text-amber-300">Branch of Ismail (AS)</p>
                    <p className="text-emerald-100/85 mt-0.5">
                      Ibrahim (AS) → Ismail (AS) → Prophet Muhammad ﷺ
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-3">
                    <p className="font-extrabold text-emerald-200">Branch of Ishaq (AS)</p>
                    <p className="text-emerald-100/85 mt-0.5">
                      Ibrahim → Ishaq → Yaqub → Yusuf, Musa, Dawud, Isa (AS)
                    </p>
                  </div>
                </div>
              </div>

              {/* Branch Filter Segmented Bar */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {(
                  [
                    'All',
                    'Foundations',
                    'Branch of Ismail (AS)',
                    'Branch of Ishaq (AS)',
                    'Arabian & Ancient Nations',
                  ] as const
                ).map((branch) => (
                  <button
                    key={branch}
                    type="button"
                    onClick={() => {
                      void triggerLightHaptic();
                      setTreeBranchFilter(branch);
                    }}
                    className={`min-h-[42px] px-3.5 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 border transition ${
                      treeBranchFilter === branch
                        ? 'bg-[#14532D] text-white border-[#14532D]'
                        : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                    }`}
                  >
                    {branch}
                  </button>
                ))}
              </div>

              {/* Selected Prophet Spotlight Card */}
              <div className="rounded-3xl bg-[var(--bg-surface)] border border-amber-300/70 dark:border-amber-400/35 p-5 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                      #{selectedProphet.order} · {selectedProphet.branch}
                    </p>
                    <h3 className="text-xl font-extrabold text-[var(--text-primary)] mt-0.5">
                      {selectedProphet.name}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--text-secondary)]">
                      {selectedProphet.title} · {selectedProphet.era}
                    </p>
                  </div>
                  <span className="font-arabic-uthmani text-3xl text-[#14532D] dark:text-amber-300 shrink-0">
                    {selectedProphet.arabicName}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="rounded-2xl bg-[var(--bg-elevated)] p-3.5">
                    <p className="text-xs font-bold text-[var(--text-secondary)]">
                      Miracle & Sign · Mentioned {selectedProphet.quranMentions}x in Quran
                    </p>
                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                      {selectedProphet.miracleOrSign}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[var(--bg-elevated)] p-3.5">
                    <p className="text-xs font-bold text-[var(--text-secondary)]">
                      Core Life Lesson · {selectedProphet.keySurahs}
                    </p>
                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                      {selectedProphet.coreLesson}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connected Generational Tree List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {visibleProphets.map((prophet) => {
                  const isSelected = selectedProphet.id === prophet.id;
                  const parentNode = prophet.parentId
                    ? PROPHETS_FAMILY_TREE.find((p) => p.id === prophet.parentId)
                    : null;
                  return (
                    <button
                      key={prophet.id}
                      type="button"
                      onClick={() => {
                        void triggerLightHaptic();
                        setSelectedProphet(prophet);
                      }}
                      className={`min-h-[72px] rounded-2xl border p-3.5 text-left flex items-center justify-between gap-3 transition active:scale-[0.98] ${
                        isSelected
                          ? 'bg-[#14532D] text-white border-[#14532D] shadow-sm'
                          : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-emerald-600/40'
                      }`}
                    >
                      <div className="min-w-0">
                        <p
                          className={`text-xs font-bold tabular-nums ${
                            isSelected ? 'text-amber-300' : 'text-[var(--text-secondary)]'
                          }`}
                        >
                          {prophet.order}. {parentNode ? `Line of ${parentNode.name.replace('Prophet ', '')}` : 'Origin'}
                        </p>
                        <p className="text-sm font-extrabold truncate mt-0.5">{prophet.name}</p>
                        <p
                          className={`text-xs truncate ${
                            isSelected ? 'text-emerald-100/85' : 'text-[var(--text-secondary)]'
                          }`}
                        >
                          {prophet.keySurahs}
                        </p>
                      </div>
                      <span
                        className={`font-arabic-uthmani text-2xl shrink-0 ${
                          isSelected ? 'text-amber-200' : 'text-[#14532D] dark:text-emerald-200'
                        }`}
                      >
                        {prophet.arabicName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ===================== 2. NEW MUSLIM PATHWAY ===================== */}
          {activeModule === 'new_muslim' && (
            <>
              <div className="rounded-3xl bg-gradient-to-br from-[#14532D] to-[#1A6338] text-white p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                    <Compass className="w-4 h-4" />
                    <span>Welcome Home · Step-by-Step Companion</span>
                  </div>
                  <span className="text-xs font-extrabold tabular-nums text-emerald-100">
                    {completedStages.length}/{NEW_MUSLIM_PATHWAY_STAGES.length} Completed
                  </span>
                </div>
                <p className="text-sm text-emerald-50 leading-relaxed">
                  Take Islam at a peaceful, sustainable pace. Complete each stage offline and jump directly into Wudu, Qibla, Quran, or Duas whenever you are ready.
                </p>
                <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-300 transition-all duration-300"
                    style={{
                      width: `${Math.round(
                        (completedStages.length / NEW_MUSLIM_PATHWAY_STAGES.length) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {NEW_MUSLIM_PATHWAY_STAGES.map((stage) => {
                  const isDone = completedStages.includes(stage.id);
                  const isExpanded = expandedStageId === stage.id;
                  return (
                    <div
                      key={stage.id}
                      className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          void triggerLightHaptic();
                          setExpandedStageId(isExpanded ? '' : stage.id);
                        }}
                        className="w-full p-4 text-left flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 ${
                              isDone
                                ? 'bg-[#22C55E] text-emerald-950'
                                : 'bg-emerald-50 dark:bg-emerald-900/50 text-[#14532D] dark:text-emerald-200'
                            }`}
                          >
                            {isDone ? <Check className="w-5 h-5" /> : stage.stageNumber}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-extrabold text-[var(--text-primary)]">
                              {stage.title}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)]">
                              {stage.subtitle} · {stage.estimatedMinutes} min
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#14532D] dark:text-emerald-300 shrink-0">
                          {isExpanded ? 'Hide' : 'Open'}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-[var(--border-subtle)] space-y-3.5">
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            {stage.summary}
                          </p>

                          {stage.keyArabic && (
                            <div className="rounded-2xl bg-[#FDFBF7] dark:bg-emerald-950/60 border border-amber-200/80 dark:border-emerald-700/40 p-4 text-center space-y-1.5">
                              <p
                                dir="rtl"
                                className="font-arabic-uthmani text-2xl text-[#14532D] dark:text-amber-200 leading-loose"
                              >
                                {stage.keyArabic.arabic}
                              </p>
                              <p className="text-xs font-bold text-[var(--text-primary)]">
                                {stage.keyArabic.transliteration}
                              </p>
                              <p className="text-xs text-[var(--text-secondary)]">
                                {stage.keyArabic.meaning}
                              </p>
                            </div>
                          )}

                          <ul className="space-y-2">
                            {stage.actionSteps.map((step, i) => (
                              <li
                                key={i}
                                className="text-xs text-[var(--text-primary)] flex items-start gap-2"
                              >
                                <span className="font-extrabold text-emerald-700 dark:text-emerald-300 tabular-nums">
                                  {i + 1}.
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => toggleNewMuslimStage(stage.id)}
                              className={`min-h-[44px] px-4 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition active:scale-95 ${
                                isDone
                                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-[#14532D] dark:text-emerald-100'
                                  : 'bg-[#14532D] text-white'
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{isDone ? 'Completed' : 'Mark Stage Complete'}</span>
                            </button>
                            {stage.recommendedRoute && (
                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onNavigateAdultRoute(stage.recommendedRoute!);
                                }}
                                className="min-h-[44px] px-4 rounded-2xl bg-amber-400 text-emerald-950 text-xs font-extrabold active:scale-95 transition"
                              >
                                {stage.recommendedRouteLabel}
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ===================== 3. FRIDAY (JUMMAH) HUB ===================== */}
          {activeModule === 'friday_hub' && (
            <>
              <div className="rounded-3xl bg-gradient-to-br from-[#14532D] via-[#176135] to-[#0E3B20] text-white p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                    <Sun className="w-4 h-4" />
                    <span>{isFridayToday ? 'Jumu’ah Mubarak Today' : 'Weekly Friday Sunnah Prep'}</span>
                  </div>
                  <span className="text-xs font-extrabold tabular-nums text-emerald-100">
                    {fridayCheckedIds.length}/{FRIDAY_SUNNAH_CHECKLIST.length} Sunnahs
                  </span>
                </div>
                <h3 className="text-xl font-extrabold">The Best Day the Sun Rises Upon</h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Revive the blessed Friday Sunnahs—read Surah Al-Kahf, send abundant Salawat upon Prophet Muhammad ﷺ, and guard the golden hour of Du’a before Maghrib.
                </p>
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenSurahInReader(18);
                    }}
                    className="min-h-[48px] rounded-2xl bg-amber-400 text-emerald-950 font-extrabold text-xs px-3 flex items-center justify-center gap-2 active:scale-95 transition"
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>Open Surah Al-Kahf</span>
                  </button>
                  <button
                    type="button"
                    onClick={incrementSalawat}
                    className="min-h-[48px] rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-extrabold text-xs px-3 flex items-center justify-center gap-2 active:scale-95 transition tabular-nums"
                  >
                    <Heart className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Salawat ({salawatCount})</span>
                  </button>
                </div>
              </div>

              {/* Salawat Arabic Card */}
              <div className="rounded-3xl bg-[var(--bg-surface)] border border-amber-200 dark:border-amber-500/30 p-4 text-center space-y-1.5">
                <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                  Durood / Salawat upon Prophet Muhammad ﷺ
                </p>
                <p dir="rtl" className="font-arabic-uthmani text-2xl text-[#14532D] dark:text-emerald-100">
                  اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Tap the Salawat button above to count your Durood this Friday (auto-checks at 10+).
                </p>
              </div>

              {/* Interactive Friday Sunnah Checklist */}
              <div className="space-y-2.5">
                {FRIDAY_SUNNAH_CHECKLIST.map((item) => {
                  const checked = fridayCheckedIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleFridaySunnah(item.id)}
                      className={`w-full rounded-2xl border p-4 text-left flex items-start gap-3 transition active:scale-[0.99] ${
                        checked
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400/70'
                          : 'bg-[var(--bg-surface)] border-[var(--border-subtle)]'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          checked
                            ? 'bg-[#14532D] border-[#14532D] text-white'
                            : 'border-slate-300 dark:border-emerald-700'
                        }`}
                      >
                        {checked && <Check className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-extrabold text-[var(--text-primary)]">
                          {item.title}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                          {item.subtitle}
                        </p>
                        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mt-1">
                          {item.source}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ===================== 4. CAR DRIVE MODE ===================== */}
          {activeModule === 'car_drive' && (
            <div className="space-y-5">
              {/* High-Contrast Now Playing Cockpit */}
              <div className="rounded-3xl bg-[#0F2C20] border border-emerald-700/60 p-6 text-center space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs font-bold text-emerald-200">
                  <span className="inline-flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-amber-300" />
                    Eyes-On-Road Mode
                  </span>
                  <SleepTimerTriggerButton
                    variant="dark"
                    compact
                    onClick={() => setSleepSheetOpen(true)}
                  />
                </div>

                <div className="py-2">
                  <p className="font-arabic-uthmani text-4xl text-amber-300">
                    {drivePreset.arabic}
                  </p>
                  <h3 className="text-2xl font-black text-white mt-2">
                    Surah {drivePreset.name}
                  </h3>
                  <p className="text-sm text-emerald-200/85 mt-1 tabular-nums">
                    {audioState.status === 'playing' || audioState.status === 'paused'
                      ? `Ayah ${audioState.quranSequence.currentAyah || 1} of ${
                          audioState.quranSequence.endAyah || drivePreset.ayahs
                        } · ${audioState.status === 'playing' ? 'Reciting' : 'Paused'}`
                      : `${drivePreset.ayahs} Ayahs · Tap Play for Continuous Recitation`}
                  </p>
                </div>

                {/* Oversized Hands-Free Controls (76px+ touch targets) */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleDriveStepAyah(-1)}
                    aria-label="Previous Ayah"
                    className="min-h-[80px] rounded-3xl bg-white/10 hover:bg-white/20 border border-white/15 flex flex-col items-center justify-center gap-1 active:scale-95 transition"
                  >
                    <SkipBack className="w-7 h-7 text-white" />
                    <span className="text-xs font-bold text-emerald-100">Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDriveTogglePlay}
                    aria-label={audioState.status === 'playing' ? 'Pause Recitation' : 'Play Recitation'}
                    className="min-h-[80px] rounded-3xl bg-amber-400 hover:bg-amber-300 text-emerald-950 flex flex-col items-center justify-center gap-1 shadow-lg active:scale-95 transition"
                  >
                    {audioState.status === 'playing' ? (
                      <Pause className="w-9 h-9 fill-emerald-950" />
                    ) : (
                      <Play className="w-9 h-9 fill-emerald-950 ml-0.5" />
                    )}
                    <span className="text-xs font-black">
                      {audioState.status === 'playing' ? 'Pause' : 'Play'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDriveStepAyah(1)}
                    aria-label="Next Ayah"
                    className="min-h-[80px] rounded-3xl bg-white/10 hover:bg-white/20 border border-white/15 flex flex-col items-center justify-center gap-1 active:scale-95 transition"
                  >
                    <SkipForward className="w-7 h-7 text-white" />
                    <span className="text-xs font-bold text-emerald-100">Next</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleDriveCycleSpeed}
                    className="min-h-[54px] rounded-2xl bg-white/10 border border-white/15 text-xs sm:text-sm font-extrabold text-amber-200 active:scale-[0.98] transition tabular-nums"
                  >
                    Speed: {driveSpeed}x
                  </button>
                  <button
                    type="button"
                    onClick={handleDriveNextQueueSurah}
                    className="min-h-[54px] rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-xs sm:text-sm font-extrabold text-emerald-100 active:scale-[0.98] transition"
                  >
                    Next Surah in Queue →
                  </button>
                </div>
              </div>

              {/* Custom Drive Playlist Header + Auto-Play Next Toggle */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-extrabold text-white">
                      Your Custom Drive Playlist ({driveQueue.length} Surahs)
                    </p>
                    <p className="text-[11px] text-emerald-200/75">
                      Add any of the 114 Surahs · Lock-screen controls ready
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        void triggerSelectionHaptic();
                        setAutoAdvanceQueue((v) => !v);
                      }}
                      className={`min-h-[38px] px-3 rounded-xl text-[11px] font-extrabold border transition ${
                        autoAdvanceQueue
                          ? 'bg-emerald-500 text-emerald-950 border-emerald-300'
                          : 'bg-white/10 text-emerald-100 border-white/15'
                      }`}
                    >
                      Auto-Next: {autoAdvanceQueue ? 'ON' : 'OFF'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        void triggerLightHaptic();
                        setQueueEditorOpen(true);
                      }}
                      className="min-h-[38px] px-3 rounded-xl bg-amber-400 text-emerald-950 text-[11px] font-extrabold inline-flex items-center gap-1 active:scale-95 transition"
                    >
                      <ListMusic className="w-3.5 h-3.5" />
                      <span>Edit Queue</span>
                    </button>
                  </div>
                </div>

                {/* Oversized One-Tap Cards for User's Custom Drive Queue */}
                <div className="grid grid-cols-2 gap-3">
                  {driveQueue.map((surahNum, queueIdx) => {
                    const info = resolveDriveSurahInfo(surahNum);
                    const active = driveSurahNumber === info.number;
                    return (
                      <button
                        key={`${info.number}-${queueIdx}`}
                        type="button"
                        onClick={() => handleDrivePlaySurah(info.number)}
                        className={`min-h-[78px] rounded-3xl border p-4 text-left flex flex-col justify-between transition active:scale-95 ${
                          active
                            ? 'bg-emerald-500 text-emerald-950 border-emerald-300'
                            : 'bg-[#0F2C20] text-white border-emerald-800/80 hover:border-emerald-500/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm sm:text-base font-black truncate">
                            {queueIdx + 1}. {info.name}
                          </span>
                          <span className="font-arabic-uthmani text-lg shrink-0">{info.arabic}</span>
                        </div>
                        <span
                          className={`text-xs font-semibold tabular-nums ${
                            active ? 'text-emerald-950/80' : 'text-emerald-200/75'
                          }`}
                        >
                          {info.tag} · {info.ayahs} Ayahs
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ===================== 5. ISLAMIC REMINDER CARDS ===================== */}
          {activeModule === 'reminder_cards' && (
            <>
              {/* Mode Switcher: 15 Curated Cards vs Unlimited 6,236 Qur'an Ayahs */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => {
                    void triggerSelectionHaptic();
                    setReminderMode('curated');
                  }}
                  className={`min-h-[42px] rounded-xl text-xs font-extrabold transition ${
                    reminderMode === 'curated'
                      ? 'bg-[#14532D] text-amber-300 shadow-2xs'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  Curated Cards ({ISLAMIC_REMINDER_CARDS.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    void triggerSelectionHaptic();
                    setReminderMode('any_ayah');
                  }}
                  className={`min-h-[42px] rounded-xl text-xs font-extrabold transition ${
                    reminderMode === 'any_ayah'
                      ? 'bg-[#14532D] text-amber-300 shadow-2xs'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  Any Qur&apos;an Ayah (6,236)
                </button>
              </div>

              {reminderMode === 'curated' ? (
                /* Category Filter for Curated Cards */
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {(
                    [
                      'All',
                      'Ease & Patience',
                      'Gratitude',
                      'Trust in Allah',
                      'Mercy',
                      'Family',
                      'Knowledge',
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        void triggerLightHaptic();
                        setReminderCategory(cat);
                        setActiveReminderIndex(0);
                      }}
                      className={`min-h-[42px] px-3.5 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 border transition ${
                        reminderCategory === cat
                          ? 'bg-[#14532D] text-white border-[#14532D]'
                          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              ) : (
                /* Any of the 114 Surahs & 6,236 Ayahs Picker */
                <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-center">
                    <SelectSheetField
                      title="Choose Any Surah (1–114)"
                      subtitle="Turn any verse of the Qur'an into a shareable card"
                      ariaLabel="Select Surah for Reminder Card"
                      searchable
                      searchPlaceholder="Search Surah name or number…"
                      value={String(pickerSurahNum)}
                      onChange={(val) => {
                        setPickerSurahNum(Number(val));
                        setPickerAyahNum(1);
                      }}
                      options={ALL_114_SURAHS.map((s) => ({
                        value: String(s.number),
                        label: `${s.number}. ${s.nameTranslit}`,
                        subtitle: `${s.nameEnglish} · ${s.nameArabic}`,
                        badge: `${s.ayahCount} ayahs`,
                      }))}
                    />
                    <div className="flex items-center justify-between gap-2 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-3 py-1.5">
                      <span className="text-xs font-extrabold text-[var(--text-secondary)]">Ayah</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPickerAyahNum((a) => Math.max(1, a - 1))}
                          className="min-w-[36px] min-h-[36px] rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm font-black text-[var(--text-primary)]"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          max={ALL_114_SURAHS[pickerSurahNum - 1]?.ayahCount || 7}
                          value={pickerAyahNum}
                          onChange={(e) => {
                            const max = ALL_114_SURAHS[pickerSurahNum - 1]?.ayahCount || 7;
                            setPickerAyahNum(Math.max(1, Math.min(max, Number(e.target.value) || 1)));
                          }}
                          className="w-16 text-center text-xs font-black text-[var(--text-primary)] bg-transparent tabular-nums"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const max = ALL_114_SURAHS[pickerSurahNum - 1]?.ayahCount || 7;
                            setPickerAyahNum((a) => Math.min(max, a + 1));
                          }}
                          className="min-w-[36px] min-h-[36px] rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm font-black text-[var(--text-primary)]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  {loadingCustomAyah && (
                    <p className="text-[11px] font-bold text-amber-700 dark:text-amber-300">
                      Loading verified Ayah text…
                    </p>
                  )}
                </div>
              )}

              {/* Handcrafted Shareable Preview Card */}
              <div
                className={`rounded-3xl border p-6 sm:p-8 text-center space-y-4 shadow-md transition-colors ${activeThemeStyle.bg} ${activeThemeStyle.border}`}
              >
                <p className={`text-xs font-extrabold tracking-wide ${activeThemeStyle.accent}`}>
                  {reminderMode === 'any_ayah'
                    ? 'Noble Qur’an · Custom Ayah Card'
                    : `${currentReminder.category} · ${activeReminderIndex + 1} of ${filteredReminders.length}`}
                </p>
                <p
                  dir="rtl"
                  className={`font-arabic-uthmani text-2xl sm:text-3xl leading-loose ${activeThemeStyle.arabic}`}
                >
                  {currentReminder.arabic}
                </p>
                {currentReminder.transliteration && (
                  <p className={`text-xs italic opacity-85 ${activeThemeStyle.body}`}>
                    {currentReminder.transliteration}
                  </p>
                )}
                <p className={`text-base sm:text-lg font-bold leading-relaxed max-w-xl mx-auto ${activeThemeStyle.body}`}>
                  “{currentReminder.translation}”
                </p>
                <p className={`text-xs font-extrabold pt-2 ${activeThemeStyle.accent}`}>
                  {currentReminder.source}
                </p>
              </div>

              {/* Theme Palette Picker */}
              <div className="flex items-center justify-between gap-2 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3">
                <span className="text-xs font-bold text-[var(--text-secondary)]">Card Style</span>
                <div className="flex items-center gap-2">
                  {(
                    [
                      { id: 'emerald', label: 'Emerald' },
                      { id: 'ivory', label: 'Ivory' },
                      { id: 'gold', label: 'Gold' },
                      { id: 'midnight', label: 'Night' },
                    ] as const
                  ).map((th) => (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => {
                        void triggerLightHaptic();
                        setReminderTheme(th.id);
                      }}
                      className={`min-h-[38px] px-3 rounded-xl text-xs font-bold transition ${
                        reminderTheme === th.id
                          ? 'bg-[#14532D] text-white'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {th.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation + Offline Export / Share Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {reminderMode === 'curated' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        void triggerLightHaptic();
                        setActiveReminderIndex(
                          (i) => (i - 1 + filteredReminders.length) % filteredReminders.length
                        );
                      }}
                      className="min-h-[46px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] active:scale-95 transition"
                    >
                      Previous Card
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        void triggerLightHaptic();
                        setActiveReminderIndex((i) => (i + 1) % filteredReminders.length);
                      }}
                      className="min-h-[46px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] active:scale-95 transition"
                    >
                      Next Card
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        void triggerLightHaptic();
                        setPickerAyahNum((a) => Math.max(1, a - 1));
                      }}
                      className="min-h-[46px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] active:scale-95 transition"
                    >
                      Prev Ayah
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        void triggerLightHaptic();
                        const max = ALL_114_SURAHS[pickerSurahNum - 1]?.ayahCount || 7;
                        setPickerAyahNum((a) => Math.min(max, a + 1));
                      }}
                      className="min-h-[46px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] active:scale-95 transition"
                    >
                      Next Ayah
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={handleDownloadReminderCard}
                  className="min-h-[46px] rounded-2xl bg-[#14532D] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 active:scale-95 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Save PNG</span>
                </button>
                <button
                  type="button"
                  onClick={() => void handleShareReminder()}
                  className="min-h-[46px] rounded-2xl bg-amber-400 text-emerald-950 text-xs font-extrabold flex items-center justify-center gap-1.5 active:scale-95 transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {shareToast && (
                <p className="text-xs font-bold text-center text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{shareToast}</span>
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Custom Car Drive Playlist Editor BottomSheet */}
      <BottomSheet
        open={queueEditorOpen}
        onClose={() => setQueueEditorOpen(false)}
        title="Custom Car Drive Playlist"
        subtitle="Add any of the 114 Surahs and reorder your hands-free listening queue."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <SelectSheetField
                title="Add Surah to Drive Queue"
                subtitle="Choose from all 114 Surahs"
                ariaLabel="Add Surah to Drive Queue"
                searchable
                searchPlaceholder="Search Surah name or number…"
                value={queueAddSurahVal}
                onChange={(val) => setQueueAddSurahVal(val)}
                options={ALL_114_SURAHS.map((s) => ({
                  value: String(s.number),
                  label: `${s.number}. ${s.nameTranslit}`,
                  subtitle: `${s.nameEnglish} · ${s.nameArabic}`,
                  badge: `${s.ayahCount} ayahs`,
                }))}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                const num = Number(queueAddSurahVal);
                if (!driveQueue.includes(num)) {
                  void triggerSuccessHaptic();
                  persistDriveQueue([...driveQueue, num]);
                } else {
                  void triggerLightHaptic();
                }
              }}
              className="min-h-[44px] px-4 rounded-2xl bg-[#14532D] text-white text-xs font-extrabold inline-flex items-center gap-1 shrink-0 active:scale-95 transition"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-2 max-h-[48vh] overflow-y-auto pr-1">
            {driveQueue.map((num, idx) => {
              const info = resolveDriveSurahInfo(num);
              return (
                <div
                  key={`${num}-${idx}`}
                  className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-3.5 py-2.5 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-[var(--text-primary)] truncate">
                      {idx + 1}. Surah {info.name} ({info.number})
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      {info.arabic} · {info.ayahs} Ayahs
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => {
                        const copy = [...driveQueue];
                        [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
                        persistDriveQueue(copy);
                      }}
                      className="w-8 h-8 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center disabled:opacity-30"
                      aria-label="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === driveQueue.length - 1}
                      onClick={() => {
                        const copy = [...driveQueue];
                        [copy[idx + 1], copy[idx]] = [copy[idx], copy[idx + 1]];
                        persistDriveQueue(copy);
                      }}
                      className="w-8 h-8 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center disabled:opacity-30"
                      aria-label="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={driveQueue.length <= 1}
                      onClick={() => {
                        persistDriveQueue(driveQueue.filter((s) => s !== num));
                      }}
                      className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-300 flex items-center justify-center disabled:opacity-30"
                      aria-label="Remove Surah"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </BottomSheet>

      <SleepTimerSheet
        open={sleepSheetOpen}
        onClose={() => setSleepSheetOpen(false)}
        title="Drive Sleep Timer"
      />
    </div>
  );
};
