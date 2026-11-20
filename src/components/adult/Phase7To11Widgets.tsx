import React, { useMemo, useState } from 'react';
import {
  Bell,
  BookMarked,
  Check,
  Edit3,
  Pause,
  Play,
  Plus,
  Repeat,
  Search,
  ShieldAlert,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
  Sparkles,
  Square,
  Tag,
  Trash2,
  Volume2,
} from 'lucide-react';
import { useIlmizo } from '../../context/IlmizoContext';
import { ALL_114_SURAHS, VERIFIED_RECITER_EDITIONS } from '../../data/quranData';
import {
  audioManager,
  QuranPlaybackMode,
  RepeatCountOption,
  useAudioManager,
  useAudioPlaybackClock,
  validateSurahAyahRange,
} from '../../services/audioManager';
import { useQuranAudioSync } from '../../hooks/useQuranAudioSync';
import {
  formatAyahTextForScript,
  getActiveWordIndexAtProgress,
  getArabicScriptFontClass,
  useQuranScriptStyle,
} from '../../services/quranScriptEngine';
import {
  buildUnifiedQuranJournalEntries,
  createWordByWordSession,
  JournalEntryKind,
  queryQuranJournalEntries,
  QuranJournalQueryOptions,
  resetWordByWordSession,
  revealCompleteAyah,
  revealNextWord,
  revealPreviousWord,
  TADABBUR_DISCLAIMER,
  TADABBUR_REFLECTION_PROMPTS,
} from '../../engines/quranJournalAndWordEngine';
import {
  COMPLETE_PRAYER_GUIDES,
  COMPLETE_SALAH_RECITATIONS,
} from '../../data/salahCompleteGuide';
import {
  AyahItem,
  MadhhabCode,
  PrayerName,
  SurahPayload,
} from '../../types/ilmizo';
import { ScreenBackButton } from '../pwa/PWAComponents';
import { BottomSheet } from '../sheets/BottomSheet';
import { SelectSheetField } from '../sheets/SelectSheet';
import {
  fetchAndCacheSurahWbw,
  getLocalizedWordMeaning,
  QuranWordAnalysis,
  SurahWbwDictionary,
  TAJWEED_RULES_META,
  TajweedRuleId,
  tokenizeAyahWithTajweedAndMeanings,
} from '../../engines/tajweedAndWordMeaningEngine';
import {
  NOORANI_QAIDA_28_LETTERS,
  playQaidaLetterHumanAudio,
} from '../../services/humanDuaAndQaidaAudio';
import {
  AdhanVoiceOption,
  ADHAN_AUDIO_STREAMS,
  AzanNotificationPreferences,
  getAndroidApkBuildCommands,
  getCapacitorRuntimeStatus,
  getPrayerWidgetPlatformCapability,
  isPersistentPrayerCountdownEnabled,
  loadAzanNotificationPrefs,
  playHumanAdhanPreview,
  requestPinNativePrayerWidget,
  resolveNextPrayerForWidget,
  saveAzanNotificationPrefs,
  scheduleDailyAzanNotifications,
  setPersistentPrayerCountdownEnabled,
  syncNativePrayerWidget,
} from '../../services/capacitorNativeBridge';


// ============================================================================
// 1. PHASE 7 — PROFESSIONAL QURAN AUDIO ENGINE PLAYER BAR
// ============================================================================

export const QuranAdvancedAudioPlayerBar: React.FC<{
  surahPayload: SurahPayload;
  activeAyahIdx: number;
  onSelectAyahIdx: (idx: number) => void;
  onTriggerToast: (msg: string) => void;
}> = ({ surahPayload, activeAyahIdx, onSelectAyahIdx, onTriggerToast }) => {
  const { user, updateUser, setAdultRoute } = useIlmizo();
  const {
    audioState,
    isActiveThisSurah,
    progressPercent: liveRecitationProgress,
  } = useQuranAudioSync({
    surahNumber: surahPayload.meta.number,
    ayahs: surahPayload.ayahs,
    activeAyahIdx,
    onAyahIndexChange: onSelectAyahIdx,
    enableHaptics: false,
    autoScroll: false,
  });
  const currentAyah = surahPayload.ayahs[activeAyahIdx] || surahPayload.ayahs[0];

  const [selectedMode, setSelectedMode] = useState<QuranPlaybackMode>(
    audioState.quranSequence.mode || 'full_surah'
  );
  const [rangeStart, setRangeStart] = useState<number>(1);
  const [rangeEnd, setRangeEnd] = useState<number>(
    Math.min(surahPayload.meta.ayahCount, Math.max(1, surahPayload.ayahs.length))
  );
  const [repeatOpt, setRepeatOpt] = useState<RepeatCountOption>(
    audioState.quranSequence.repeatOption || 1
  );
  const [optionsSheetOpen, setOptionsSheetOpen] = useState(false);

  const handleStartPlayback = () => {
    if (!currentAyah) return;
    const rate = user.playbackRate || 1;
    const reciterName = user.reciterName;

    if (selectedMode === 'single_ayah') {
      void audioManager.playQariRecitationAyah({
        id: `quran_${surahPayload.meta.number}_${currentAyah.numberInSurah}`,
        surahNumber: surahPayload.meta.number,
        ayahNumberInSurah: currentAyah.numberInSurah,
        globalAyahNumber: currentAyah.globalNumber,
        reciterName,
        rate,
        repeatOption: repeatOpt,
        onError: (msg) => onTriggerToast(msg),
      });
      return;
    }

    if (selectedMode === 'full_surah') {
      void audioManager.playFullSurah({
        surahNumber: surahPayload.meta.number,
        startFromAyah: currentAyah.numberInSurah,
        reciterName,
        rate,
        repeatOption: repeatOpt,
        onAyahChange: (_surahNum, ayahNum) => {
          const idx = surahPayload.ayahs.findIndex((a) => a.numberInSurah === ayahNum);
          if (idx >= 0) onSelectAyahIdx(idx);
        },
        onError: (msg) => onTriggerToast(msg),
      });
      return;
    }

    const validation = validateSurahAyahRange(
      surahPayload.meta.number,
      rangeStart,
      rangeEnd
    );
    if (!validation.valid) {
      onTriggerToast(validation.error || 'Invalid Ayah range');
      return;
    }

    void audioManager.playAyahRange({
      surahNumber: surahPayload.meta.number,
      startAyah: rangeStart,
      endAyah: rangeEnd,
      reciterName,
      rate,
      repeatOption: repeatOpt,
      onAyahChange: (_surahNum, ayahNum) => {
        const idx = surahPayload.ayahs.findIndex((a) => a.numberInSurah === ayahNum);
        if (idx >= 0) onSelectAyahIdx(idx);
      },
      onError: (msg) => onTriggerToast(msg),
    });
  };

  const repeatOptions: { value: RepeatCountOption; label: string }[] = [
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 5, label: '5x' },
    { value: 10, label: '10x' },
    { value: 'infinite', label: '∞ Loop' },
  ];

  const modeSummaryLabel =
    selectedMode === 'full_surah'
      ? 'Full Surah'
      : selectedMode === 'ayah_range'
      ? `Ayahs ${rangeStart}–${rangeEnd}`
      : `Ayah ${currentAyah?.numberInSurah || 1}`;

  const repeatLabel = repeatOpt === 'infinite' ? '∞ Loop' : `${repeatOpt}x`;

  return (
    <>
      <div className="rounded-2xl border px-3.5 py-2.5 bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)] shadow-2xs space-y-2">
        {/* Primary Focused Transport Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => void audioManager.previousAyah()}
              disabled={audioState.status === 'idle'}
              aria-label="Previous Ayah in Queue"
              className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] disabled:opacity-35 flex items-center justify-center transition active:scale-95"
              title="Previous Ayah"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {audioState.status === 'playing' ? (
              <button
                type="button"
                onClick={() => audioManager.pause()}
                className="px-4 h-10 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs whitespace-nowrap shrink-0 active:scale-95 transition"
              >
                <Pause className="w-4 h-4 shrink-0" />
                <span>Pause</span>
              </button>
            ) : audioState.status === 'paused' ? (
              <button
                type="button"
                onClick={() => audioManager.resume()}
                className="px-4 h-10 rounded-full bg-[#22C55E] text-emerald-950 font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs whitespace-nowrap shrink-0 active:scale-95 transition"
              >
                <Play className="w-4 h-4 shrink-0" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartPlayback}
                className="px-4 h-10 rounded-full bg-[#14532D] text-white font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs hover:bg-emerald-800 whitespace-nowrap shrink-0 active:scale-95 transition"
              >
                <Play className="w-4 h-4 shrink-0" />
                <span>
                  {selectedMode === 'full_surah'
                    ? 'Play Surah'
                    : selectedMode === 'ayah_range'
                    ? `Play ${rangeStart}–${rangeEnd}`
                    : 'Play Ayah'}
                </span>
              </button>
            )}

            {audioState.status !== 'idle' && (
              <button
                type="button"
                onClick={() => audioManager.stopAll()}
                aria-label="Stop Audio Playback"
                className="w-9 h-9 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700/40 flex items-center justify-center transition active:scale-95"
                title="Stop Playback"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
            )}

            <button
              type="button"
              onClick={() => void audioManager.nextAyah()}
              disabled={audioState.status === 'idle'}
              aria-label="Next Ayah in Queue"
              className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] disabled:opacity-35 flex items-center justify-center transition active:scale-95"
              title="Next Ayah"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setOptionsSheetOpen(true)}
              aria-label="Audio Playback Options"
              className="min-h-[38px] px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[11px] font-bold inline-flex items-center gap-1.5 hover:border-emerald-700/40 transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#14532D] dark:text-amber-300" />
              <span>{repeatLabel}</span>
            </button>
            <button
              type="button"
              onClick={() => setAdultRoute('quran_journal')}
              aria-label="Open My Quran Journal"
              title="My Quran Journal"
              className="w-9 h-9 rounded-full bg-amber-100/80 dark:bg-amber-400/15 text-amber-950 dark:text-amber-200 border border-amber-300/70 dark:border-amber-500/35 flex items-center justify-center hover:opacity-90 transition"
            >
              <BookMarked className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subtle Secondary Metadata Line */}
        <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--text-secondary)] pt-0.5">
          <span className="truncate font-semibold flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-[#14532D] dark:text-amber-300 shrink-0" />
            <span className="truncate">
              {user.reciterName || VERIFIED_RECITER_EDITIONS[0]?.label || 'Mishary Rashid Alafasy'}
            </span>
          </span>
          <span className="tabular-nums font-bold shrink-0 text-[#14532D] dark:text-amber-300">
            {audioState.status !== 'idle'
              ? `Ayah ${audioState.quranSequence.currentAyah || currentAyah?.numberInSurah} · Rep ${audioState.quranSequence.currentRepetition}/${audioState.quranSequence.repeatOption === 'infinite' ? '∞' : audioState.quranSequence.repeatOption}`
              : modeSummaryLabel}
          </span>
        </div>

        {/* Smooth Live Recitation Progress Track */}
        {isActiveThisSurah && (
          <div className="h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#14532D] via-[#22C55E] to-[#F59E0B] transition-all duration-300"
              style={{ width: `${Math.max(4, liveRecitationProgress)}%` }}
            />
          </div>
        )}
      </div>

      {/* Audio Options BottomSheet (Mode, Ayah Range, Qari Reciter, Repeat) */}
      <BottomSheet
        open={optionsSheetOpen}
        onClose={() => setOptionsSheetOpen(false)}
        title="Recitation Controls"
        subtitle="Choose playback scope, reciter, and repeat count."
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <p className="text-xs font-extrabold text-[var(--text-secondary)]">Playback Scope</p>
            <div className="grid grid-cols-3 gap-1.5 bg-[var(--bg-elevated)] p-1 rounded-2xl border border-[var(--border-subtle)]">
              {(
                [
                  { id: 'single_ayah', label: 'Single Ayah' },
                  { id: 'full_surah', label: 'Full Surah' },
                  { id: 'ayah_range', label: 'Ayah Range' },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMode(m.id)}
                  className={`min-h-[40px] rounded-xl text-xs font-extrabold transition ${
                    selectedMode === m.id
                      ? 'bg-[#14532D] text-white shadow-2xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {selectedMode === 'ayah_range' && (
            <div className="grid grid-cols-2 gap-2.5 bg-[var(--bg-elevated)] p-3 rounded-2xl border border-[var(--border-subtle)]">
              <label className="text-xs font-bold text-[var(--text-secondary)] space-y-1">
                <span>Start Ayah</span>
                <input
                  type="number"
                  min={1}
                  max={surahPayload.meta.ayahCount}
                  value={rangeStart}
                  onChange={(e) => setRangeStart(Math.max(1, Number(e.target.value)))}
                  className="ilmizo-input w-full min-h-[42px] rounded-xl px-3 py-1.5 text-sm font-extrabold tabular-nums"
                />
              </label>
              <label className="text-xs font-bold text-[var(--text-secondary)] space-y-1">
                <span>End Ayah</span>
                <input
                  type="number"
                  min={rangeStart}
                  max={surahPayload.meta.ayahCount}
                  value={rangeEnd}
                  onChange={(e) =>
                    setRangeEnd(
                      Math.min(
                        surahPayload.meta.ayahCount,
                        Math.max(rangeStart, Number(e.target.value))
                      )
                    )
                  }
                  className="ilmizo-input w-full min-h-[42px] rounded-xl px-3 py-1.5 text-sm font-extrabold tabular-nums"
                />
              </label>
            </div>
          )}

          <div className="space-y-1.5">
            <p className="text-xs font-extrabold text-[var(--text-secondary)]">Qari Reciter</p>
            <SelectSheetField
              title="Choose Qari Reciter"
              subtitle="Verified authentic human Quran recitations"
              ariaLabel="Select Qari Reciter"
              variant="default"
              leftIcon={<Volume2 className="w-4 h-4 text-emerald-700 dark:text-amber-300" />}
              value={user.reciterName || VERIFIED_RECITER_EDITIONS[0]?.label || 'Mishary Rashid Alafasy'}
              onChange={(nextQari) => {
                updateUser({ reciterName: nextQari });
                audioManager.setReciter(nextQari);
                onTriggerToast(`Reciter set to ${nextQari}`);
              }}
              options={VERIFIED_RECITER_EDITIONS.map((q) => ({
                value: q.label,
                label: q.label,
                subtitle: `${q.cdnBitrate}kbps authentic audio`,
              }))}
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-extrabold text-[var(--text-secondary)] flex items-center gap-1.5">
              <Repeat className="w-3.5 h-3.5 text-[#14532D] dark:text-amber-300" />
              <span>Repeat Count</span>
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {repeatOptions.map((ro) => (
                <button
                  key={String(ro.value)}
                  type="button"
                  onClick={() => {
                    setRepeatOpt(ro.value);
                    audioManager.setRepeatOption(ro.value);
                    onTriggerToast(`Repeat set to ${ro.label}`);
                  }}
                  className={`min-h-[42px] rounded-xl text-xs font-extrabold border transition ${
                    repeatOpt === ro.value
                      ? 'bg-[#14532D] text-white border-[#14532D]'
                      : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                  }`}
                >
                  {ro.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setOptionsSheetOpen(false);
              handleStartPlayback();
            }}
            className="w-full min-h-[48px] rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Recitation ({modeSummaryLabel})</span>
          </button>
        </div>
      </BottomSheet>
    </>
  );
};

// ============================================================================
// 2. PHASE 10 — MY QURAN JOURNAL SCREEN (NOTES, BOOKMARKS & TADABBUR)
// ============================================================================

export const QuranJournalScreen: React.FC<{
  onTriggerToast: (msg: string) => void;
}> = ({ onTriggerToast }) => {
  const {
    bookmarks,
    personalNotes,
    revisionItems,
    addPersonalNote,
    editPersonalNote,
    deletePersonalNote,
    toggleBookmark,
    openSurahForReading,
  } = useIlmizo();

  const [filter, setFilter] = useState<QuranJournalQueryOptions>({
    searchQuery: '',
    kindFilter: 'all',
    surahFilter: null,
    tagFilter: null,
    folderFilter: null,
    sortOrder: 'newest',
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [noteSurahNum, setNoteSurahNum] = useState<number>(1);
  const [noteAyahNum, setNoteAyahNum] = useState<number>(1);
  const [noteType, setNoteType] = useState<'personal' | 'tadabbur' | 'hifz_note'>('tadabbur');
  const [selectedPromptId, setSelectedPromptId] = useState<string>(TADABBUR_REFLECTION_PROMPTS[0].id);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [noteTagsInput, setNoteTagsInput] = useState('faith, gratitude');

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState('');
  const [editTags, setEditTags] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const allEntries = useMemo(
    () =>
      buildUnifiedQuranJournalEntries({
        bookmarks,
        personalNotes,
        revisionItems,
      }),
    [bookmarks, personalNotes, revisionItems]
  );

  const filteredEntries = useMemo(
    () => queryQuranJournalEntries(allEntries, filter),
    [allEntries, filter]
  );

  const allAvailableTags = useMemo(() => {
    const set = new Set<string>();
    allEntries.forEach((e) => e.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [allEntries]);

  const handleSaveNewNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteBody.trim()) return;
    const surahMeta = ALL_114_SURAHS.find((s) => s.number === noteSurahNum);
    const refLabel = `${surahMeta?.nameTranslit || `Surah ${noteSurahNum}`} ${noteSurahNum}:${noteAyahNum}`;
    const tags = noteTagsInput
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const promptObj = TADABBUR_REFLECTION_PROMPTS.find((p) => p.id === selectedPromptId);

    addPersonalNote(
      noteTitle.trim() || refLabel,
      noteBody.trim(),
      refLabel,
      noteSurahNum,
      noteAyahNum,
      {
        tags,
        noteType: noteType === 'personal' ? 'note' : noteType,
        tadabburPrompt: noteType === 'tadabbur' ? promptObj?.prompt : undefined,
      }
    );
    setNoteTitle('');
    setNoteBody('');
    setShowCreateForm(false);
    onTriggerToast(`Saved ${noteType.replace('_', ' ')} for ${refLabel}`);
  };

  return (
    <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 pt-3 px-4 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <ScreenBackButton variant="dark" />
          <div className="text-center">
            <h1 className="text-lg font-extrabold">My Quran Journal</h1>
            <p className="text-[11px] text-emerald-200">
              Bookmarks, Personal Notes, Tadabbur & Hifz Reflections
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="min-w-[44px] min-h-[44px] px-3 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-xs flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="grid grid-cols-5 gap-1 bg-black/25 p-1 rounded-full text-[11px] font-extrabold">
          {(
            [
              { id: 'all', label: `All (${allEntries.length})` },
              { id: 'bookmark', label: 'Bookmarks' },
              { id: 'note', label: 'Notes' },
              { id: 'tadabbur', label: 'Tadabbur' },
              { id: 'hifz_note', label: 'Hifz' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setFilter((prev: QuranJournalQueryOptions) => ({
                  ...prev,
                  kindFilter: tab.id as 'all' | JournalEntryKind,
                }))
              }
              className={`py-1.5 rounded-full transition truncate px-1 ${
                filter.kindFilter === tab.id
                  ? 'bg-amber-400 text-emerald-950 shadow-2xs'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4 max-w-3xl mx-auto">
        {/* Tadabbur Disclaimer Banner */}
        <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-500/30 px-3.5 py-2.5 text-[11px] text-amber-950 dark:text-amber-200 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <p>{TADABBUR_DISCLAIMER.en}</p>
        </div>

        {/* Create Note / Tadabbur Reflection Form */}
        {showCreateForm && (
          <form
            onSubmit={handleSaveNewNote}
            className="rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-[#14532D] dark:text-emerald-300">
                Add Quran Note or Tadabbur Reflection
              </h2>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Entry Type
                </span>
                <SelectSheetField
                  title="Journal Entry Type"
                  ariaLabel="Entry Type"
                  variant="compact"
                  className="w-full"
                  value={noteType}
                  onChange={(val) => setNoteType(val as 'tadabbur' | 'personal' | 'hifz_note')}
                  options={[
                    { value: 'tadabbur', label: 'Tadabbur Reflection', subtitle: 'Guided verse reflection' },
                    { value: 'personal', label: 'Personal Study Note', subtitle: 'Your own study notes' },
                    { value: 'hifz_note', label: 'Hifz Memorization Note', subtitle: 'Memorization cues & reminders' },
                  ]}
                />
              </div>

              <div>
                <span className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Surah
                </span>
                <SelectSheetField
                  title="Select Surah"
                  ariaLabel="Journal Surah"
                  variant="compact"
                  searchable
                  searchPlaceholder="Search Surah…"
                  className="w-full"
                  value={String(noteSurahNum)}
                  onChange={(val) => {
                    setNoteSurahNum(Number(val));
                    setNoteAyahNum(1);
                  }}
                  options={ALL_114_SURAHS.map((s) => ({
                    value: String(s.number),
                    label: `${s.number}. ${s.nameTranslit}`,
                    subtitle: s.nameEnglish,
                    badge: `${s.ayahCount} ayahs`,
                  }))}
                />
              </div>

              <label className="text-[11px] font-bold text-[var(--text-secondary)]">
                Ayah Number
                <input
                  type="number"
                  min={1}
                  max={
                    ALL_114_SURAHS.find((s) => s.number === noteSurahNum)?.ayahCount || 286
                  }
                  value={noteAyahNum}
                  onChange={(e) => setNoteAyahNum(Math.max(1, Number(e.target.value)))}
                  className="ilmizo-input mt-1 w-full min-h-[42px] rounded-xl px-2.5 py-1.5 text-xs font-bold tabular-nums"
                />
              </label>
            </div>

            {noteType === 'tadabbur' && (
              <div>
                <span className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Guided Tadabbur Reflection Prompt
                </span>
                <SelectSheetField
                  title="Tadabbur Reflection Prompt"
                  ariaLabel="Guided Tadabbur Reflection Prompt"
                  variant="compact"
                  className="w-full"
                  value={selectedPromptId}
                  onChange={(val) => setSelectedPromptId(val)}
                  options={TADABBUR_REFLECTION_PROMPTS.map((p) => ({
                    value: p.id,
                    label: p.prompt,
                  }))}
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Optional custom title..."
                className="ilmizo-input rounded-xl px-3 py-1.5 text-xs font-semibold"
              />
              <input
                type="text"
                value={noteTagsInput}
                onChange={(e) => setNoteTagsInput(e.target.value)}
                placeholder="Tags (comma-separated: patience, dua, hifz)"
                className="ilmizo-input rounded-xl px-3 py-1.5 text-xs font-semibold"
              />
            </div>

            <textarea
              rows={3}
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
              placeholder="Write your reflection, action step, or memorization note..."
              className="ilmizo-input w-full rounded-xl p-3 text-xs"
              required
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#14532D] text-white font-extrabold text-xs hover:bg-emerald-800 transition"
            >
              Save to My Quran Journal
            </button>
          </form>
        )}

        {/* Search, Surah Filter, Tag Filter & Sort Row */}
        <div className="rounded-2xl bg-[var(--bg-surface)] p-3 border border-[var(--border-subtle)] shadow-2xs space-y-2.5">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filter.searchQuery || ''}
                onChange={(e) =>
                  setFilter((prev: QuranJournalQueryOptions) => ({
                    ...prev,
                    searchQuery: e.target.value,
                  }))
                }
                placeholder="Search notes, bookmarks, tags, or Surah 2:255..."
                className="ilmizo-input w-full rounded-full pl-10 pr-4 py-2 text-xs font-medium"
              />
            </div>

            <SelectSheetField
              title="Filter by Surah"
              ariaLabel="Filter by Surah"
              variant="compact"
              searchable
              searchPlaceholder="Search Surah…"
              value={filter.surahFilter ? String(filter.surahFilter) : ''}
              onChange={(val) =>
                setFilter((prev: QuranJournalQueryOptions) => ({
                  ...prev,
                  surahFilter: val ? Number(val) : null,
                }))
              }
              options={[
                { value: '', label: 'All Surahs' },
                ...ALL_114_SURAHS.map((s) => ({
                  value: String(s.number),
                  label: `${s.number}. ${s.nameTranslit}`,
                  subtitle: s.nameEnglish,
                })),
              ]}
            />

            <SelectSheetField
              title="Sort Journal Entries"
              ariaLabel="Sort Journal Entries"
              variant="compact"
              value={filter.sortOrder || 'newest'}
              onChange={(val) =>
                setFilter((prev: QuranJournalQueryOptions) => ({
                  ...prev,
                  sortOrder: val as QuranJournalQueryOptions['sortOrder'],
                }))
              }
              options={[
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' },
                { value: 'surah_asc', label: 'Surah Order (1 → 114)' },
                { value: 'surah_desc', label: 'Surah Order (114 → 1)' },
              ]}
            />
          </div>

          {allAvailableTags.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <Tag className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <button
                type="button"
                onClick={() =>
                  setFilter((prev: QuranJournalQueryOptions) => ({ ...prev, tagFilter: null }))
                }
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                  filter.tagFilter === null
                    ? 'bg-[#14532D] text-white'
                    : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                All Tags
              </button>
              {allAvailableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setFilter((prev: QuranJournalQueryOptions) => ({
                      ...prev,
                      tagFilter: prev.tagFilter === tag ? null : tag,
                    }))
                  }
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold whitespace-nowrap ${
                    filter.tagFilter === tag
                      ? 'bg-amber-400 text-emerald-950'
                      : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Entries List */}
        {filteredEntries.length === 0 ? (
          <div className="rounded-3xl bg-[var(--bg-surface)] p-8 text-center border border-[var(--border-subtle)] space-y-2">
            <BookMarked className="w-8 h-8 text-emerald-800 dark:text-emerald-400 mx-auto opacity-60" />
            <p className="text-sm font-extrabold text-[var(--text-primary)]">
              No matching Quran Journal entries
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Bookmark any Ayah while reading or tap “+ New” above to record a Tadabbur reflection.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEntries.map((entry) => {
              const isBookmark = entry.kind === 'bookmark';
              const rawId = entry.id.replace(/^(bm_|note_)/, '');
              const isEditing = editingNoteId === rawId;
              const isConfirmingDelete = confirmDeleteId === entry.id;

              return (
                <div
                  key={entry.id}
                  className="rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                            isBookmark
                              ? 'bg-amber-100 dark:bg-amber-400/20 text-amber-900 dark:text-amber-200'
                              : entry.kind === 'tadabbur'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200'
                              : entry.kind === 'hifz_note'
                              ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200'
                              : 'bg-sky-100 dark:bg-sky-950/60 text-sky-900 dark:text-sky-200'
                          }`}
                        >
                          {entry.kind.replace('_', ' ')}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            openSurahForReading(entry.surahNumber, entry.ayahNumber)
                          }
                          className="text-sm font-extrabold text-[#14532D] dark:text-emerald-300 hover:underline"
                        >
                          {entry.surahName} · Ayah {entry.ayahNumber}
                        </button>
                        <span className="text-[11px] text-[var(--text-muted)]">· {entry.createdAt}</span>
                      </div>
                      {entry.tadabburPrompt && (
                        <p className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 mt-1">
                          Prompt: {entry.tadabburPrompt}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          openSurahForReading(entry.surahNumber, entry.ayahNumber)
                        }
                        className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold hover:opacity-90"
                      >
                        Open Ayah
                      </button>
                      {!isBookmark && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingNoteId(rawId);
                            setEditBody(entry.body);
                            setEditTags(entry.tags.join(', '));
                          }}
                          className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-[var(--bg-subtle)]"
                          title="Edit Note"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(entry.id)}
                        className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {entry.arabicSnippet && (
                    <p
                      className="font-arabic text-xl text-[var(--text-primary)] text-right bg-[var(--bg-elevated)] p-2.5 rounded-2xl border border-[var(--border-subtle)]"
                      dir="rtl"
                    >
                      {entry.arabicSnippet}
                    </p>
                  )}

                  {isEditing ? (
                    <div className="space-y-2 pt-1">
                      <textarea
                        rows={3}
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        className="ilmizo-input w-full rounded-xl p-2.5 text-xs"
                      />
                      <input
                        type="text"
                        value={editTags}
                        onChange={(e) => setEditTags(e.target.value)}
                        placeholder="Tags (comma-separated)"
                        className="ilmizo-input w-full rounded-xl px-2.5 py-1.5 text-xs"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            editPersonalNote(rawId, {
                              body: editBody.trim(),
                              tags: editTags
                                .split(',')
                                .map((s) => s.trim().toLowerCase())
                                .filter(Boolean),
                            });
                            setEditingNoteId(null);
                            onTriggerToast('Updated journal note');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#14532D] text-white text-xs font-extrabold"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingNoteId(null)}
                          className="px-3 py-1.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-secondary)] text-xs font-bold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{entry.body}</p>
                  )}

                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {entry.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Delete Confirmation */}
                  {isConfirmingDelete && (
                    <div className="rounded-xl bg-rose-50 dark:bg-rose-950/45 border border-rose-200 dark:border-rose-500/35 p-2.5 flex items-center justify-between text-xs">
                      <span className="font-bold text-rose-900 dark:text-rose-200">
                        Confirm permanent deletion of this entry?
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            if (isBookmark) {
                              toggleBookmark({
                                surahNumber: entry.surahNumber,
                                surahName: entry.surahName,
                                ayahNumber: entry.ayahNumber,
                                arabicSnippet: entry.arabicSnippet || '',
                              });
                            } else {
                              deletePersonalNote(rawId);
                            }
                            setConfirmDeleteId(null);
                            onTriggerToast('Deleted entry from My Quran Journal');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-extrabold text-[11px]"
                        >
                          Confirm Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] text-[var(--text-secondary)] font-bold text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
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
};

// ============================================================================
// 3. PHASE 10 — INTERACTIVE WORD-BY-WORD HIFZ REVEAL PANEL
// ============================================================================

export const WordByWordHifzRevealPanel: React.FC<{
  surahPayload: SurahPayload | null;
}> = ({ surahPayload }) => {
  const sampleAyah = surahPayload?.ayahs[0] || {
    numberInSurah: 1,
    arabicUthmani: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
  };

  const [selectedAyahNum, setSelectedAyahNum] = useState<number>(sampleAyah.numberInSurah);
  const activeAyahObj =
    surahPayload?.ayahs.find((a) => a.numberInSurah === selectedAyahNum) || sampleAyah;

  const [session, setSession] = useState(() =>
    createWordByWordSession(
      surahPayload?.meta.number || 1,
      activeAyahObj.numberInSurah,
      activeAyahObj.arabicUthmani
    )
  );

  const handleSwitchAyah = (ayahNum: number) => {
    setSelectedAyahNum(ayahNum);
    const found = surahPayload?.ayahs.find((a) => a.numberInSurah === ayahNum) || sampleAyah;
    setSession(
      createWordByWordSession(
        surahPayload?.meta.number || 1,
        found.numberInSurah,
        found.arabicUthmani
      )
    );
  };

  return (
    <div className="rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-xs space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300 uppercase tracking-wider">
            Word-by-Word Hifz Active Recall
          </h3>
          <p className="text-[11px] text-[var(--text-secondary)]">
            Recite each Arabic word from memory, then reveal one word at a time
          </p>
        </div>

        {surahPayload && surahPayload.ayahs.length > 0 && (
          <SelectSheetField
            title="Choose Ayah to Practice"
            subtitle={surahPayload.meta.nameTranslit}
            ariaLabel="Select Ayah for Word-by-Word Hifz"
            variant="inline"
            searchable={surahPayload.ayahs.length >= 10}
            searchPlaceholder="Search Ayah number…"
            value={String(selectedAyahNum)}
            onChange={(val) => handleSwitchAyah(Number(val))}
            options={surahPayload.ayahs.map((a) => ({
              value: String(a.numberInSurah),
              label: `${surahPayload.meta.nameTranslit} · Ayah ${a.numberInSurah}`,
            }))}
          />
        )}
      </div>

      {/* Arabic Word Tokens Box */}
      <div
        dir="rtl"
        className="rounded-2xl bg-[#0F3826] text-white p-4 min-h-[96px] flex flex-wrap items-center justify-center gap-2.5"
      >
        {session.words.map((word, idx) => {
          const isRevealed = idx < session.revealedCount;
          return (
            <span
              key={`${idx}_${word}`}
              className={`font-arabic text-2xl px-2.5 py-1 rounded-xl border transition ${
                isRevealed
                  ? 'bg-amber-400/20 border-amber-300 text-amber-200 font-bold'
                  : 'bg-white/10 border-white/15 text-transparent select-none blur-xs'
              }`}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-extrabold text-[var(--text-secondary)] tabular-nums">
          Revealed {session.revealedCount} / {session.words.length} words
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSession((s) => revealPreviousWord(s))}
            disabled={session.revealedCount === 0}
            className="px-2.5 py-1.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-primary)] disabled:opacity-40 text-xs font-bold"
          >
            Hide Last
          </button>
          <button
            type="button"
            onClick={() => setSession((s) => revealNextWord(s))}
            disabled={session.isFullyRevealed}
            className="px-3 py-1.5 rounded-xl bg-[#14532D] text-white disabled:opacity-40 text-xs font-extrabold"
          >
            Reveal Next Word
          </button>
          <button
            type="button"
            onClick={() => setSession((s) => revealCompleteAyah(s))}
            disabled={session.isFullyRevealed}
            className="px-2.5 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-400/20 text-amber-950 dark:text-amber-200 disabled:opacity-40 text-xs font-extrabold"
          >
            Reveal Full Ayah
          </button>
          <button
            type="button"
            onClick={() => setSession((s) => resetWordByWordSession(s))}
            className="px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/45 text-rose-800 dark:text-rose-200 text-xs font-bold"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. PHASE 11 — COMPLETE SALAH COURSE, RECITATIONS & WOMEN'S EXCUSED MODE
// ============================================================================

export const SalahCompleteGuideAndExcusedPanel: React.FC<{
  activeDateKey: string;
  onTriggerToast: (msg: string) => void;
}> = ({ activeDateKey, onTriggerToast }) => {
  const {
    user,
    salahRecords,
    salahAnalytics,
    setUserMadhhab,
    toggleExcusedPrayerMode,
    toggleExcusedSalahDay,
  } = useIlmizo();

  const [selectedGuidePrayer, setSelectedGuidePrayer] = useState<string>('Fajr');
  const [showFullRecitations, setShowFullRecitations] = useState<boolean>(false);

  const isDayExcused = Boolean(salahRecords[activeDateKey]?.isExcusedDay);
  const activeGuide =
    COMPLETE_PRAYER_GUIDES.find((g) => g.id === selectedGuidePrayer) ||
    COMPLETE_PRAYER_GUIDES[0];

  return (
    <div className="space-y-3 pt-2">
      {/* 1. Madhhab & Private Women's Excused Mode Card */}
      <div className="rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">
              Fiqh School (Madhhab) & Streak Protection
            </h3>
            <p className="text-[11px] text-[var(--text-secondary)]">
              Active Streak: <strong>{salahAnalytics.consecutiveWorshipStreakDays} days</strong> (Excused days:{' '}
              {salahAnalytics.excusedDaysCount} · Never counted as missed/Qada)
            </p>
          </div>

          <SelectSheetField
            title="Select Fiqh School (Madhhab)"
            ariaLabel="Select Fiqh Madhhab"
            variant="compact"
            value={user.madhhab || 'Hanafi'}
            onChange={(val) => {
              const nextM = val as MadhhabCode;
              setUserMadhhab(nextM);
              onTriggerToast(`Fiqh Madhhab updated to ${nextM}`);
            }}
            options={(['Hanafi', 'Shafii', 'Maliki', 'Hanbali'] as const).map((m) => ({
              value: m,
              label: `${m} School`,
            }))}
          />
        </div>

        {/* Private Optional Women's Excused Mode */}
        <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-extrabold text-[var(--text-primary)]">
                Women’s Excused Prayer Mode (Private & Local-Only)
              </p>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Exempt days preserve your worship streak and are never marked as missed or Qada.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                toggleExcusedPrayerMode();
                onTriggerToast(
                  !user.excusedPrayerModeEnabled
                    ? 'Enabled Women’s Excused Prayer Mode'
                    : 'Hidden Women’s Excused Prayer Mode'
                );
              }}
              className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold transition ${
                user.excusedPrayerModeEnabled
                  ? 'bg-[#14532D] text-amber-300'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
              }`}
            >
              {user.excusedPrayerModeEnabled ? 'Enabled' : 'Enable'}
            </button>
          </div>

          {user.excusedPrayerModeEnabled && (
            <div className="pt-2 border-t border-[var(--divider)] flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[var(--text-primary)]">
                Status for {activeDateKey}:{' '}
                <strong className={isDayExcused ? 'text-purple-700 dark:text-purple-300' : 'text-[var(--text-secondary)]'}>
                  {isDayExcused ? 'EXCUSED (Streak Protected)' : 'Standard Prayer Day'}
                </strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  toggleExcusedSalahDay(activeDateKey, !isDayExcused);
                  onTriggerToast(
                    !isDayExcused
                      ? `Marked ${activeDateKey} as Excused — streak preserved`
                      : `Restored ${activeDateKey} to standard tracking`
                  );
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
                  isDayExcused
                    ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-500/40'
                    : 'bg-emerald-50 dark:bg-emerald-950/50 text-[#14532D] dark:text-emerald-200 border border-emerald-200 dark:border-emerald-500/35'
                }`}
              >
                {isDayExcused ? 'Unmark Excused Day' : 'Mark Day as Excused'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Complete 5 Daily + Witr Prayer Guides & Full Salah Recitations */}
      <div className="rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">
            Complete Prayer Rak’ah Guides & Full Recitations
          </h3>
          <button
            type="button"
            onClick={() => setShowFullRecitations(!showFullRecitations)}
            className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-950 dark:text-amber-200 text-[11px] font-extrabold shrink-0"
          >
            {showFullRecitations ? 'Show Rak’ah Breakdown' : 'Full Arabic Recitations (9)'}
          </button>
        </div>

        {!showFullRecitations ? (
          <div className="space-y-2.5">
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {COMPLETE_PRAYER_GUIDES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGuidePrayer(g.id)}
                  className={`px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap ${
                    selectedGuidePrayer === g.id
                      ? 'bg-[#14532D] text-white'
                      : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200'
                  }`}
                >
                  {g.id} ({g.fardRakahs} Fard)
                </button>
              ))}
            </div>

            {activeGuide && (
              <div className="rounded-2xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)] space-y-1.5 text-xs">
                <p className="font-extrabold text-[#14532D] dark:text-emerald-300">
                  {activeGuide.name} · {activeGuide.timeWindowDesc}
                </p>
                <p className="text-[var(--text-secondary)]">
                  <strong>Fard:</strong> {activeGuide.fardRakahs} Rak’ahs ·{' '}
                  <strong>Sunnah Mu’akkadah:</strong> {activeGuide.sunnahMuakkadahBefore} before,{' '}
                  {activeGuide.sunnahMuakkadahAfter} after
                </p>
                <div className="space-y-1 text-[var(--text-primary)]">
                  {activeGuide.stepByStepSummary.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <p className="text-[11px] text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl border border-amber-200 dark:border-amber-500/30">
                  <strong>{user.madhhab || 'Hanafi'} Note:</strong>{' '}
                  {activeGuide.madhhabSpecifics[user.madhhab || 'Hanafi']}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {COMPLETE_SALAH_RECITATIONS.map((rec) => (
              <div
                key={rec.id}
                className="rounded-2xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)] space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">
                    {rec.title} ({rec.stage})
                  </span>
                  <span className="text-[11px] font-bold text-[var(--text-muted)]">{rec.sourceReference}</span>
                </div>
                <p className="font-arabic text-xl text-[var(--text-primary)] text-right leading-loose" dir="rtl">
                  {rec.arabic}
                </p>
                <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 italic">
                  {rec.transliteration}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">{rec.translations.en}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 5. COLOR-CODED TAJWEED + WORD-BY-WORD TRANSLATION TOOLTIP VIEW
// ============================================================================

export const InteractiveTajweedAyahView: React.FC<{
  ayah: AyahItem;
  surahNumber: number;
  fontScaleClass?: string;
  darkMode?: boolean;
  onPlayAyahAudio?: () => void;
}> = ({
  ayah,
  surahNumber,
  fontScaleClass = 'text-3xl',
  darkMode = false,
  onPlayAyahAudio,
}) => {
  const { user } = useIlmizo();
  const [tajweedColorsEnabled, setTajweedColorsEnabled] = useState<boolean>(true);
  const [showTajweedLegend, setShowTajweedLegend] = useState<boolean>(false);
  const [selectedWordIdx, setSelectedWordIdx] = useState<number | null>(null);
  const [surahWbwDict, setSurahWbwDict] = useState<SurahWbwDictionary | null>(null);

  React.useEffect(() => {
    let active = true;
    setSurahWbwDict(null);
    void fetchAndCacheSurahWbw(surahNumber).then((dict) => {
      if (active && dict) {
        setSurahWbwDict(dict);
      }
    });
    return () => {
      active = false;
    };
  }, [surahNumber]);

  const wbwAyahWords = surahWbwDict?.[ayah.numberInSurah];

  const wordTokens: QuranWordAnalysis[] = useMemo(
    () =>
      tokenizeAyahWithTajweedAndMeanings({
        arabicUthmani: ayah.arabicUthmani,
        transliteration: ayah.transliteration,
        translations: ayah.translations,
        wbwAyahWords,
      }),
    [ayah.arabicUthmani, ayah.transliteration, ayah.translations, wbwAyahWords]
  );

  // Reset selected word when switching Ayah
  React.useEffect(() => {
    setSelectedWordIdx(null);
  }, [surahNumber, ayah.numberInSurah]);

  const [scriptStyle, setScriptStyle] = useQuranScriptStyle();
  const audioState = useAudioManager();
  const playbackClock = useAudioPlaybackClock();

  const isThisAyahReciting =
    (audioState.status === 'playing' || audioState.status === 'loading') &&
    audioState.quranSequence.surahNumber === surahNumber &&
    audioState.quranSequence.currentAyah === ayah.numberInSurah;

  const liveWordIdx = useMemo(() => {
    if (!isThisAyahReciting || wordTokens.length === 0) return -1;
    return getActiveWordIndexAtProgress(
      wordTokens.map((t) => t.arabicWord),
      playbackClock.ratio
    );
  }, [isThisAyahReciting, wordTokens, playbackClock.ratio]);

  const liveSpokenWord =
    liveWordIdx >= 0 && wordTokens[liveWordIdx] ? wordTokens[liveWordIdx] : null;
  const scriptFontClass = getArabicScriptFontClass(scriptStyle);

  const activeWord =
    selectedWordIdx !== null && wordTokens[selectedWordIdx] ? wordTokens[selectedWordIdx] : null;

  const legendRules: TajweedRuleId[] = [
    'ghunnah',
    'qalqalah',
    'madd',
    'idgham_ikhfa',
    'tafkheem_allah',
  ];

  return (
    <div className="space-y-3">
      {/* Top Toolbar: Madani/IndoPak Script Switch + Color-Coded Tajweed Toggle + Legend */}
      <div className="flex flex-col items-center gap-2 px-1">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <div
            role="group"
            aria-label="Quran Script Font"
            className="inline-flex items-center p-0.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)]"
          >
            {(
              [
                { id: 'uthmani', label: 'Madani' },
                { id: 'indopak', label: 'IndoPak' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                aria-pressed={scriptStyle === opt.id}
                onClick={() => setScriptStyle(opt.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold whitespace-nowrap transition ${
                  scriptStyle === opt.id
                    ? 'bg-[#14532D] text-amber-300 shadow-2xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setTajweedColorsEnabled((v) => !v)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold border whitespace-nowrap inline-flex items-center gap-1 transition ${
              tajweedColorsEnabled
                ? 'bg-[#14532D] text-amber-300 border-amber-400/50 shadow-2xs'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
            }`}
          >
            {tajweedColorsEnabled ? <Check className="w-3 h-3 shrink-0" /> : null}
            <span>{tajweedColorsEnabled ? 'Tajweed: ON' : 'Tajweed: OFF'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTajweedLegend((v) => !v)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold border whitespace-nowrap transition ${
              showTajweedLegend
                ? 'bg-amber-400 text-emerald-950 border-amber-500'
                : 'bg-amber-50 dark:bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-400/35'
            }`}
          >
            {showTajweedLegend ? 'Hide Guide' : 'Tajweed Guide'}
          </button>
        </div>

        <span className="text-[11px] font-semibold text-[var(--text-secondary)] inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
          <span>
            {isThisAyahReciting && liveSpokenWord
              ? `Live Word ${liveSpokenWord.index + 1}/${wordTokens.length}: ${liveSpokenWord.transliteration} — ${getLocalizedWordMeaning(liveSpokenWord, user.language)}`
              : 'Tap any Arabic word for meaning & Tajweed rule'}
          </span>
        </span>
      </div>

      {/* Expandable Tajweed Color Legend */}
      {showTajweedLegend && (
        <div
          className={`rounded-2xl border p-3 text-left space-y-2 ${
            darkMode
              ? 'bg-[#092318] border-amber-400/30 text-white'
              : 'bg-white/95 border-amber-300 text-slate-900'
          }`}
        >
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-300">
            Color-Coded Tajweed Guide
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {legendRules.map((ruleKey) => {
              const meta = TAJWEED_RULES_META[ruleKey];
              return (
                <div
                  key={meta.id}
                  className="flex items-start gap-2 rounded-xl p-2 bg-emerald-950/5 dark:bg-black/25"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 mt-0.5 border border-black/15"
                    style={{ backgroundColor: meta.colorHex }}
                  />
                  <div className="text-[11px] leading-snug">
                    <p className="font-extrabold">{meta.label}</p>
                    <p className={darkMode ? 'text-emerald-100/80' : 'text-slate-600'}>
                      {meta.description[user.language] || meta.description.en}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Word-by-Word Verse Display (Madani Uthmani or IndoPak 15-Line + Live Audio Highlight) */}
      <div
        dir="rtl"
        lang="ar"
        className={`${scriptFontClass} ${fontScaleClass} font-bold tracking-normal text-center flex flex-wrap items-center justify-center gap-x-2 gap-y-2 px-1`}
      >
        {wordTokens.map((token) => {
          const isSelected = selectedWordIdx === token.index;
          const isLiveWord = isThisAyahReciting && liveWordIdx === token.index;

          return (
            <button
              key={`${ayah.numberInSurah}_${token.index}_${token.arabicWord}`}
              type="button"
              data-live-word={isLiveWord ? 'true' : undefined}
              onClick={() =>
                setSelectedWordIdx((prev) => (prev === token.index ? null : token.index))
              }
              className={`inline-block px-2 py-0.5 rounded-xl transition cursor-pointer select-none ${
                isLiveWord
                  ? 'ilmizo-word-live font-bold'
                  : isSelected
                  ? 'ring-2 ring-[#D4AF37] bg-amber-400/25 scale-105 shadow-xs'
                  : 'hover:bg-amber-400/15'
              } ${darkMode ? 'text-white' : 'text-slate-900'}`}
              title={`${token.transliteration} — ${getLocalizedWordMeaning(
                token,
                user.language
              )} (${token.tajweedRule.shortLabel})`}
            >
              {tajweedColorsEnabled && token.segments?.length > 0
                ? token.segments.map((seg, segIdx) => {
                    const ruleMeta = TAJWEED_RULES_META[seg.ruleId];
                    const segStyle =
                      seg.ruleId !== 'normal'
                        ? { color: darkMode ? ruleMeta.darkColorHex : ruleMeta.colorHex }
                        : undefined;
                    return (
                      <span key={segIdx} style={segStyle}>
                        {formatAyahTextForScript(seg.text, scriptStyle)}
                      </span>
                    );
                  })
                : formatAyahTextForScript(token.arabicWord, scriptStyle)}
            </button>
          );
        })}

        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#D4AF37] bg-amber-50 dark:bg-amber-500/20 text-xs font-sans text-amber-950 dark:text-amber-200 tabular-nums mx-1 shadow-2xs align-middle">
          {ayah.numberInSurah}
        </span>
      </div>

      {/* Interactive Word-by-Word Translation & Tajweed Tooltip Drawer */}
      {activeWord && (
        <div className="rounded-2xl border-2 border-[#D4AF37] p-3.5 text-left shadow-md space-y-2 transition-all bg-[var(--bg-surface)] text-[var(--text-primary)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-950 dark:text-amber-200 text-[11px] font-extrabold">
                  Word {activeWord.index + 1} of {wordTokens.length}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold text-white"
                  style={{ backgroundColor: activeWord.tajweedRule.colorHex }}
                >
                  Tajweed: {activeWord.tajweedRule.shortLabel}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                    activeWord.isExactDictionaryMatch
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  {activeWord.isExactDictionaryMatch ? '✓ Exact WBW Dictionary' : 'Offline WBW Pending'}
                </span>
              </div>
              <p className="text-sm font-extrabold mt-1.5 text-[#14532D] dark:text-amber-300">
                {activeWord.transliteration} —{' '}
                <span className="text-[var(--text-primary)]">
                  {getLocalizedWordMeaning(activeWord, user.language)}
                </span>
              </p>
              {user.language !== 'hinglish' && activeWord.meanings.hinglish && activeWord.isExactDictionaryMatch && (
                <p className="text-[11px] text-[var(--text-secondary)]">
                  <strong>Hinglish:</strong> {activeWord.meanings.hinglish}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-arabic text-3xl font-bold px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-emerald-950 dark:text-amber-200 border border-amber-200 dark:border-amber-500/35">
                {activeWord.arabicWord}
              </span>
            </div>
          </div>

          <div className="rounded-xl p-2.5 text-[11px] space-y-1 bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
            <p>
              <strong style={{ color: activeWord.tajweedRule.colorHex }}>
                {activeWord.tajweedRule.label}:
              </strong>{' '}
              {activeWord.tajweedRule.description[user.language] ||
                activeWord.tajweedRule.description.en}
            </p>
            {activeWord.segments?.some((s) => s.ruleNote) && (
              <p className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold">
                <strong>Letter-Cluster Rules:</strong>{' '}
                {activeWord.segments
                  .filter((s) => s.ruleNote)
                  .map((s) => `${s.text} (${s.ruleNote})`)
                  .join(' · ')}
              </p>
            )}
            <p className="text-[11px] opacity-80">
              <strong>Corpus / Grammar:</strong> {activeWord.grammarHint}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-1.5">
              {activeWord.wordAudioUrl && (
                <button
                  type="button"
                  onClick={() => {
                    audioManager.playAudioUrl({
                      id: `wbw_${surahNumber}_${ayah.numberInSurah}_${activeWord.index}`,
                      url: activeWord.wordAudioUrl!,
                      fallbackText: activeWord.arabicWord,
                      fallbackLang: 'ar-SA',
                      allowTtsFallback: true,
                      rate: user.playbackRate || 1,
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 text-emerald-950 text-[11px] font-extrabold inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Play Word Audio</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (onPlayAyahAudio) {
                    onPlayAyahAudio();
                  } else {
                    void audioManager.playQariRecitationAyah({
                      id: `word_ayah_${surahNumber}_${ayah.numberInSurah}`,
                      surahNumber,
                      ayahNumberInSurah: ayah.numberInSurah,
                      globalAyahNumber: ayah.globalNumber,
                      reciterName: user.reciterName,
                      rate: user.playbackRate || 1,
                    });
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-[#14532D] text-white text-[11px] font-extrabold inline-flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Listen to Qari Recite Ayah</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSelectedWordIdx(null)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:text-emerald-200"
            >
              Close Tooltip ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 6. KIDS NOORANI QAIDA & 28 ARABIC LETTERS WITH REAL HUMAN QARI MP3 AUDIO
// ============================================================================

export const KidsNooraniQaidaInteractiveCard: React.FC<{
  onAwardStar?: (label: string) => void;
  onTriggerToast?: (msg: string) => void;
}> = ({ onAwardStar, onTriggerToast }) => {
  const { user } = useIlmizo();
  const [selectedLetterIdx, setSelectedLetterIdx] = useState<number>(0);
  const [practicedLetterIds, setPracticedLetterIds] = useState<string[]>([]);
  const [qaidaMode, setQaidaMode] = useState<'learn' | 'quiz'>('learn');
  const [quizTargetIdx, setQuizTargetIdx] = useState<number>(0);
  const [quizPickedIdx, setQuizPickedIdx] = useState<number | null>(null);

  const activeLetter =
    NOORANI_QAIDA_28_LETTERS[selectedLetterIdx] || NOORANI_QAIDA_28_LETTERS[0];

  const handlePlayHumanQaidaAudio = (
    letter = activeLetter,
    mode: 'letter' | 'quran_example' = 'letter'
  ) => {
    playQaidaLetterHumanAudio({
      letter,
      mode,
      rate: 1,
      onStatus: (msg) => {
        if (onTriggerToast) onTriggerToast(msg);
      },
    });
    if (!practicedLetterIds.includes(letter.id)) {
      setPracticedLetterIds((prev) => [...prev, letter.id]);
      if (onAwardStar) {
        onAwardStar(`Noorani Qaida Letter ${letter.nameEn}`);
      }
    }
  };

  const quizTarget = NOORANI_QAIDA_28_LETTERS[quizTargetIdx] || NOORANI_QAIDA_28_LETTERS[0];
  const quizOptions = useMemo(() => {
    const d1 = NOORANI_QAIDA_28_LETTERS[(quizTargetIdx + 5) % NOORANI_QAIDA_28_LETTERS.length];
    const d2 = NOORANI_QAIDA_28_LETTERS[(quizTargetIdx + 13) % NOORANI_QAIDA_28_LETTERS.length];
    const d3 = NOORANI_QAIDA_28_LETTERS[(quizTargetIdx + 21) % NOORANI_QAIDA_28_LETTERS.length];
    const raw = [quizTarget, d1, d2, d3];
    // Deterministic rotation based on quizTargetIdx
    const shift = quizTargetIdx % raw.length;
    return [...raw.slice(shift), ...raw.slice(0, shift)];
  }, [quizTarget, quizTargetIdx]);

  return (
    <div className="rounded-3xl bg-[var(--bg-surface)] border-2 border-[#D4AF37]/70 p-4 shadow-sm space-y-3.5 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold uppercase tracking-wider">
            ✓ Real Human Qari Audio (MP3)
          </span>
          <h3 className="text-sm font-extrabold text-[var(--text-primary)] mt-1">
            Noorani Qaida — 28 Arabic Letters & Makharij
          </h3>
          <p className="text-[11px] text-[var(--text-secondary)]">
            Practiced {practicedLetterIds.length} / 28 letters with Sheikh Mishary Rashid Alafasy
          </p>
        </div>

        <div className="inline-flex rounded-full bg-[var(--bg-subtle)] p-1">
          <button
            type="button"
            onClick={() => setQaidaMode('learn')}
            className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition ${
              qaidaMode === 'learn' ? 'bg-[#14532D] text-white' : 'text-[var(--text-secondary)]'
            }`}
          >
            28 Letters
          </button>
          <button
            type="button"
            onClick={() => {
              setQaidaMode('quiz');
              setQuizPickedIdx(null);
            }}
            className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition ${
              qaidaMode === 'quiz' ? 'bg-[#14532D] text-white' : 'text-[var(--text-secondary)]'
            }`}
          >
            Qaida Quiz
          </button>
        </div>
      </div>

      {qaidaMode === 'learn' ? (
        <>
          {/* 28 Arabic Letters Grid (RTL order) */}
          <div
            dir="rtl"
            className="grid grid-cols-7 gap-1.5 bg-[var(--bg-elevated)] p-2.5 rounded-2xl border border-[var(--border-subtle)]"
          >
            {NOORANI_QAIDA_28_LETTERS.map((item, idx) => {
              const isSelected = idx === selectedLetterIdx;
              const isDone = practicedLetterIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedLetterIdx(idx);
                    handlePlayHumanQaidaAudio(item);
                  }}
                  className={`h-11 rounded-xl font-arabic text-xl font-bold flex flex-col items-center justify-center border transition ${
                    isSelected
                      ? 'bg-[#14532D] text-amber-300 border-[#D4AF37] scale-105 shadow-xs'
                      : isDone
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-500/40'
                      : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-amber-400'
                  }`}
                  title={`${item.nameEn} (${item.nameAr})`}
                >
                  <span>{item.letterArabic}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Letter Detail + Harakat + Human Audio Card */}
          <div className="rounded-2xl bg-[var(--bg-elevated)] border border-amber-400/40 p-3.5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-extrabold uppercase text-amber-800 dark:text-amber-300">
                  Letter {activeLetter.number} of 28 · {activeLetter.reciterName}
                </p>
                <h4 className="text-base font-extrabold text-[var(--text-primary)]">
                  {activeLetter.nameEn} ({activeLetter.nameAr})
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  <strong>Makhraj Tip:</strong>{' '}
                  {activeLetter.makhrajTip[user.language] || activeLetter.makhrajTip.en}
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#0F3826] text-amber-300 border-2 border-[#D4AF37] flex items-center justify-center font-arabic text-4xl font-bold shrink-0 shadow-sm">
                {activeLetter.letterArabic}
              </div>
            </div>

            {/* Harakat Trio: Fatha / Kasra / Damma */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-2">
                <p className="text-[11px] font-bold text-[var(--text-secondary)]">Fatha (Zabar)</p>
                <p className="font-arabic text-lg font-bold text-[var(--text-primary)]">
                  {activeLetter.harakatForms.fatha}
                </p>
              </div>
              <div className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-2">
                <p className="text-[11px] font-bold text-[var(--text-secondary)]">Kasra (Zer)</p>
                <p className="font-arabic text-lg font-bold text-[var(--text-primary)]">
                  {activeLetter.harakatForms.kasra}
                </p>
              </div>
              <div className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-2">
                <p className="text-[11px] font-bold text-[var(--text-secondary)]">Damma (Pesh)</p>
                <p className="font-arabic text-lg font-bold text-[var(--text-primary)]">
                  {activeLetter.harakatForms.damma}
                </p>
              </div>
            </div>

            {/* Quranic Example Word with Dual Human Audio Controls */}
            <div className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-extrabold uppercase text-emerald-800 dark:text-emerald-300">
                  Quranic Word Example (Surah {activeLetter.quranAyahRef})
                </p>
                <p className="font-arabic text-2xl font-bold text-[var(--text-primary)] mt-0.5" dir="rtl">
                  {activeLetter.quranExampleWord}
                </p>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  {activeLetter.quranExampleTranslit} —{' '}
                  <span className="font-medium text-[var(--text-secondary)]">
                    {activeLetter.quranExampleMeaning[user.language] ||
                      activeLetter.quranExampleMeaning.en}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handlePlayHumanQaidaAudio(activeLetter, 'letter')}
                  className="px-3 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold flex items-center gap-1.5 shadow-sm"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Hear Letter ({activeLetter.nameEn})</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePlayHumanQaidaAudio(activeLetter, 'quran_example')}
                  className="px-3 py-2 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Hear Quran Example</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold text-[var(--text-primary)]">
              Listen to the Qari & Spot the Letter: <strong>{quizTarget.nameEn}</strong>
            </p>
            <button
              type="button"
              onClick={() => handlePlayHumanQaidaAudio(quizTarget)}
              className="px-3 py-1 rounded-full bg-[#16A34A] text-white text-[11px] font-extrabold inline-flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen Clue</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {quizOptions.map((opt, i) => {
              const isCorrect = opt.id === quizTarget.id;
              const isPicked = quizPickedIdx === i;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setQuizPickedIdx(i);
                    if (isCorrect) {
                      handlePlayHumanQaidaAudio(opt);
                      if (onTriggerToast) {
                        onTriggerToast(`MashaAllah! Correct letter: ${opt.nameEn}!`);
                      }
                    }
                  }}
                  className={`p-3 rounded-2xl border text-center transition ${
                    quizPickedIdx !== null
                      ? isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-600 dark:border-emerald-400 text-emerald-950 dark:text-emerald-100'
                        : isPicked
                        ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-900 dark:text-rose-200'
                        : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] opacity-60'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-emerald-500 text-[var(--text-primary)]'
                  }`}
                >
                  <p className="font-arabic text-3xl font-bold">{opt.letterArabic}</p>
                  <p className="text-xs font-extrabold mt-1">{opt.nameEn}</p>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              setQuizTargetIdx((idx) => (idx + 1) % NOORANI_QAIDA_28_LETTERS.length);
              setQuizPickedIdx(null);
            }}
            className="w-full py-2 rounded-xl bg-[#14532D] text-white text-xs font-extrabold"
          >
            Next Letter Challenge →
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 7. CAPACITOR ANDROID APK WRAPPER & NATIVE AZAN NOTIFICATION STUDIO
// ============================================================================

export const NativeApkAndAzanNotificationStudio: React.FC<{
  prayerTimes24h?: Record<PrayerName, string>;
  city?: string;
  hijriDate?: string;
  onTriggerToast: (msg: string) => void;
}> = ({
  prayerTimes24h = {
    Fajr: '05:15',
    Dhuhr: '12:30',
    Asr: '15:45',
    Maghrib: '18:15',
    Isha: '19:45',
  },
  city = 'Jamshedpur',
  hijriDate = '1448 AH',
  onTriggerToast,
}) => {
  const [prefs, setPrefs] = useState<AzanNotificationPreferences>(() =>
    loadAzanNotificationPrefs()
  );
  const [widgetSize, setWidgetSize] = useState<'small' | 'medium'>('medium');
  const [countdownBarOn, setCountdownBarOn] = useState<boolean>(() =>
    isPersistentPrayerCountdownEnabled()
  );
  const runtimeStatus = useMemo(() => getCapacitorRuntimeStatus(), []);
  const widgetCapability = useMemo(() => getPrayerWidgetPlatformCapability(), []);
  const nextPrayerPreview = useMemo(
    () => resolveNextPrayerForWidget(prayerTimes24h),
    [prayerTimes24h]
  );

  const handleUpdatePrefs = (next: AzanNotificationPreferences) => {
    setPrefs(next);
    saveAzanNotificationPrefs(next);
  };

  const handleTogglePrayerAlert = (prayer: PrayerName) => {
    const current = prefs.prayers[prayer];
    const next: AzanNotificationPreferences = {
      ...prefs,
      prayers: {
        ...prefs.prayers,
        [prayer]: {
          ...current,
          enabled: !current.enabled,
        },
      },
    };
    handleUpdatePrefs(next);
  };

  const handleChangeVoice = (voice: AdhanVoiceOption) => {
    const next: AzanNotificationPreferences = {
      ...prefs,
      defaultAdhanVoice: voice,
      prayers: {
        Fajr: { ...prefs.prayers.Fajr, soundMode: voice === 'makkah_haram' ? 'madinah_fajr' : voice },
        Dhuhr: { ...prefs.prayers.Dhuhr, soundMode: voice },
        Asr: { ...prefs.prayers.Asr, soundMode: voice },
        Maghrib: { ...prefs.prayers.Maghrib, soundMode: voice },
        Isha: { ...prefs.prayers.Isha, soundMode: voice },
      },
    };
    handleUpdatePrefs(next);
    onTriggerToast(`Default Azan Voice set to ${voice}`);
  };

  const handleSaveAndScheduleAzan = async () => {
    const res = await scheduleDailyAzanNotifications({
      prayerTimes24h,
      prefs,
    });
    await syncNativePrayerWidget({
      city,
      hijriDate,
      prayerTimes: prayerTimes24h,
      persistentCountdownEnabled: countdownBarOn,
    });
    onTriggerToast(res.message);
  };

  const handlePinWidget = async () => {
    await syncNativePrayerWidget({
      city,
      hijriDate,
      prayerTimes: prayerTimes24h,
      persistentCountdownEnabled: countdownBarOn,
    });
    const res = await requestPinNativePrayerWidget(widgetSize);
    onTriggerToast(res.message);
  };

  const handleTogglePersistentCountdown = async () => {
    const next = !countdownBarOn;
    setCountdownBarOn(next);
    await setPersistentPrayerCountdownEnabled(next);
    await syncNativePrayerWidget({
      city,
      hijriDate,
      prayerTimes: prayerTimes24h,
      persistentCountdownEnabled: next,
    });
    onTriggerToast(
      next
        ? 'Lock-screen & notification bar live Salah countdown enabled.'
        : 'Persistent Salah countdown notification turned off.'
    );
  };

  const enabledAlertsCount = (['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).filter(
    (p) => prefs.prayers[p].enabled
  ).length;

  void runtimeStatus;
  void getAndroidApkBuildCommands;

  return (
    <div className="rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-4 text-left">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-amber-300 flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-extrabold text-[var(--text-primary)] truncate">
              Exact Adhan Alarms & Home-Screen Widget
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Doze-safe exact Salah alerts, live widget & lock-screen countdown
            </p>
          </div>
        </div>

        <span className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums shrink-0">
          {enabledAlertsCount}/5 On
        </span>
      </div>

      {/* Adhan Voice Selector + Daily Prayer Toggles */}
      <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-[var(--text-secondary)]">
            Adhan Sound
          </span>
          <SelectSheetField
            title="Choose Adhan Sound"
            subtitle="Used for daily exact background prayer alarms"
            ariaLabel="Select Adhan Voice"
            variant="compact"
            value={prefs.defaultAdhanVoice}
            onChange={(val) => handleChangeVoice(val as AdhanVoiceOption)}
            options={[
              {
                value: 'makkah_haram',
                label: 'Makkah Al-Haram Adhan',
                subtitle: 'Authentic human recording',
              },
              {
                value: 'alafasy_adhan',
                label: 'Sheikh Mishary Alafasy',
                subtitle: 'Authentic human recording',
              },
              {
                value: 'madinah_fajr',
                label: 'Madinah Fajr Style',
                subtitle: 'Authentic human recording',
              },
              {
                value: 'silent_visual',
                label: 'Silent Visual Notification',
                subtitle: 'No sound',
              },
            ]}
          />
        </div>

        {/* 5 Daily Prayers Azan Toggle Buttons */}
        <div className="grid grid-cols-5 gap-1.5">
          {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map((pName) => {
            const pCfg = prefs.prayers[pName];
            return (
              <button
                key={pName}
                type="button"
                aria-pressed={pCfg.enabled}
                onClick={() => handleTogglePrayerAlert(pName)}
                className={`min-h-[60px] rounded-xl py-2 px-1 text-center border transition flex flex-col items-center justify-center gap-0.5 ${
                  pCfg.enabled
                    ? 'bg-[#14532D] text-white border-[#14532D] dark:border-emerald-400 shadow-2xs'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                }`}
              >
                <span className="text-[11px] font-extrabold">{pName}</span>
                <span className="text-[11px] opacity-85 tabular-nums">
                  {prayerTimes24h[pName] || '--:--'}
                </span>
                <span
                  className={`text-[11px] font-bold ${
                    pCfg.enabled ? 'text-amber-300' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {pCfg.enabled ? 'On' : 'Off'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Row: Preview Adhan + Schedule Exact Background Alarms */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          <button
            type="button"
            onClick={() =>
              playHumanAdhanPreview(prefs.defaultAdhanVoice, (msg) => onTriggerToast(msg))
            }
            className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-2xs transition"
          >
            <Volume2 className="w-4 h-4" />
            <span>Preview Adhan</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAndScheduleAzan}
            className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold shadow-2xs transition"
          >
            Schedule Exact Alarms
          </button>
        </div>
      </div>

      {/* Live Android Home-Screen Salah Widget Preview + 1-Tap Pin + Lock-Screen Countdown */}
      <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-extrabold text-[var(--text-primary)]">
              Home-Screen Salah Widget
            </p>
            <p className="text-[11px] text-[var(--text-secondary)]">
              Live preview synced with {city} · {hijriDate}
            </p>
          </div>
          <div className="inline-flex items-center rounded-xl bg-[var(--bg-surface)] p-0.5 border border-[var(--border-subtle)]">
            {(
              [
                { id: 'small', label: '2×1 Compact' },
                { id: 'medium', label: '4×2 Full' },
              ] as const
            ).map((sz) => (
              <button
                key={sz.id}
                type="button"
                aria-pressed={widgetSize === sz.id}
                onClick={() => setWidgetSize(sz.id)}
                className={`min-h-[34px] px-2.5 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition ${
                  widgetSize === sz.id
                    ? 'bg-[#14532D] text-amber-300'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                {sz.label}
              </button>
            ))}
          </div>
        </div>

        {/* Authentic Emerald-Gold Android AppWidget Preview Card */}
        <div
          aria-label="Android Home-Screen Salah Widget Preview"
          className="rounded-2xl bg-gradient-to-br from-[#0F3826] via-[#14532D] to-[#0B2A1C] text-white p-3.5 border border-amber-400/35 shadow-sm space-y-2.5"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-emerald-200/85 truncate">
                Ilmizo · {city}
              </p>
              <p className="text-sm font-extrabold text-white">
                Next: {nextPrayerPreview.name}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-extrabold text-amber-300 tabular-nums leading-tight">
                {nextPrayerPreview.time}
              </p>
              <p className="text-[11px] text-emerald-200/80">{hijriDate}</p>
            </div>
          </div>

          {widgetSize === 'medium' && (
            <div className="grid grid-cols-5 gap-1 pt-2 border-t border-white/10 text-center">
              {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map((p) => {
                const isNext = nextPrayerPreview.name === p;
                return (
                  <div
                    key={p}
                    className={`rounded-lg py-1 px-0.5 ${
                      isNext ? 'bg-amber-400/20 text-amber-200' : 'text-emerald-100/80'
                    }`}
                  >
                    <p className="text-[11px] font-bold">{p}</p>
                    <p className="text-[11px] font-extrabold tabular-nums">
                      {(prayerTimes24h[p] || '--:--').replace(/\s*(AM|PM)/i, '')}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handlePinWidget}
            className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold transition"
          >
            Add Widget to Home Screen
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={countdownBarOn}
            onClick={handleTogglePersistentCountdown}
            className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs font-extrabold transition whitespace-nowrap ${
              countdownBarOn
                ? 'bg-amber-400 text-emerald-950 border-amber-500'
                : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)]'
            }`}
          >
            {countdownBarOn ? 'Countdown Bar: On' : 'Countdown Bar: Off'}
          </button>
        </div>

        <p className="text-[11px] text-[var(--text-muted)] leading-snug">
          {widgetCapability.honestStatusNote}
        </p>
      </div>
    </div>
  );
};

