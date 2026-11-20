import React, { useEffect, useMemo, useState } from 'react';
import {
  Bookmark,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Moon,
  Sparkles,
  Sun,
  Volume2,
} from 'lucide-react';
import { AyahItem, LanguageCode, SurahPayload } from '../../types/ilmizo';
import {
  buildReflowableMushafPages,
  formatOrnamentalAyahMarker,
  loadQuranReaderPreferences,
  QuranReaderPreferences,
  saveQuranReaderPreferences,
} from '../../services/mushafPaginationEngine';
import {
  getMushafPageForSurahAyah,
  getMushafPageMeta,
  JUZ_30_BOUNDARIES,
  MUSHAF_TOTAL_PAGES,
} from '../../data/mushafPageMap';
import { useKhatamPlanner } from '../../services/khatamPlannerService';
import { BottomSheet } from '../sheets/BottomSheet';
import {
  triggerLightHaptic,
  triggerSelectionHaptic,
  triggerSuccessHaptic,
} from '../../services/hapticsService';
import { useQuranAudioSync } from '../../hooks/useQuranAudioSync';
import { useAudioPlaybackClock } from '../../services/audioManager';
import {
  formatAyahTextForScript,
  getActiveWordIndexAtProgress,
  getArabicScriptFontClass,
  useQuranScriptStyle,
} from '../../services/quranScriptEngine';

interface QuranMushafViewProps {
  surahPayload: SurahPayload;
  activeAyahNumber: number;
  arabicFontScale: number;
  darkMode: boolean;
  language: LanguageCode;
  onSelectAyah: (ayahNumberInSurah: number) => void;
  onPlayAyahAudio: (ayah: AyahItem) => void;
  onToggleBookmarkAyah: (ayah: AyahItem) => void;
  isAyahBookmarked: (ayahNumberInSurah: number) => boolean;
  onNavigateToSurahAyah?: (surahNumber: number, ayahNumber: number) => void;
  onCreateReminderCard?: (ayah: AyahItem) => void;
  onToast?: (msg: string) => void;
}

export const QuranMushafView: React.FC<QuranMushafViewProps> = ({
  surahPayload,
  activeAyahNumber,
  arabicFontScale,
  darkMode,
  onSelectAyah,
  onPlayAyahAudio,
  onToggleBookmarkAyah,
  isAyahBookmarked,
  onNavigateToSurahAyah,
  onCreateReminderCard,
  onToast,
}) => {
  const pages = useMemo(
    () => buildReflowableMushafPages(surahPayload.ayahs),
    [surahPayload.ayahs]
  );

  const [prefs, setPrefs] = useState<QuranReaderPreferences>(() => loadQuranReaderPreferences());
  const [pageIdx, setPageIdx] = useState<number>(() => {
    const found = pages.findIndex((p) =>
      p.ayahs.some((a) => a.numberInSurah === activeAyahNumber)
    );
    if (found >= 0) return found;
    const saved = loadQuranReaderPreferences().lastPageBySurah[surahPayload.meta.number];
    if (typeof saved === 'number' && saved >= 0 && saved < pages.length) return saved;
    return 0;
  });

  const [jumpSheetOpen, setJumpSheetOpen] = useState(false);
  const [jumpTab, setJumpTab] = useState<'page' | 'juz'>('page');
  const [jumpPageInput, setJumpPageInput] = useState<number>(1);

  const { state: khatamState, completePage: markKhatamPageComplete } = useKhatamPlanner();

  const activeAyahIdx = useMemo(() => {
    const idx = surahPayload.ayahs.findIndex((a) => a.numberInSurah === activeAyahNumber);
    return idx >= 0 ? idx : 0;
  }, [surahPayload.ayahs, activeAyahNumber]);

  const { isAyahHighlighted, registerAyahElement } = useQuranAudioSync({
    surahNumber: surahPayload.meta.number,
    ayahs: surahPayload.ayahs,
    activeAyahIdx,
    onAyahIndexChange: (nextIdx) => {
      const nextAyah = surahPayload.ayahs[nextIdx];
      if (nextAyah) onSelectAyah(nextAyah.numberInSurah);
    },
    enableHaptics: false,
    autoScroll: true,
  });

  const [scriptStyle, setScriptStyle] = useQuranScriptStyle();
  const playbackClock = useAudioPlaybackClock();
  const scriptFontClass = getArabicScriptFontClass(scriptStyle);

  useEffect(() => {
    const found = pages.findIndex((p) =>
      p.ayahs.some((a) => a.numberInSurah === activeAyahNumber)
    );
    if (found >= 0) {
      setPageIdx(found);
    } else if (pages.length > 0) {
      setPageIdx(0);
    }
  }, [surahPayload.meta.number, pages.length, activeAyahNumber]);

  const currentPage = pages[pageIdx] || pages[0];

  const canonicalMushafPage = useMemo(() => {
    if (!currentPage) return 1;
    if (currentPage.isStandardMushafPageNumber && currentPage.displayPageNumber <= MUSHAF_TOTAL_PAGES) {
      return currentPage.displayPageNumber;
    }
    const firstAyah = currentPage.ayahs[0]?.numberInSurah || 1;
    return getMushafPageForSurahAyah(surahPayload.meta.number, firstAyah);
  }, [currentPage, surahPayload.meta.number]);

  const canonicalPageMeta = useMemo(
    () => getMushafPageMeta(canonicalMushafPage),
    [canonicalMushafPage]
  );

  const isCurrentPageLoggedKhatam = khatamState.completedPages.includes(canonicalMushafPage);

  const persistPageIndex = (nextIdx: number) => {
    const clamped = Math.max(0, Math.min(pages.length - 1, nextIdx));
    setPageIdx(clamped);
    const nextPrefs: QuranReaderPreferences = {
      ...prefs,
      lastPageBySurah: {
        ...prefs.lastPageBySurah,
        [surahPayload.meta.number]: clamped,
      },
    };
    setPrefs(nextPrefs);
    saveQuranReaderPreferences(nextPrefs);
    const firstAyah = pages[clamped]?.ayahs[0];
    if (firstAyah) onSelectAyah(firstAyah.numberInSurah);
    void triggerSelectionHaptic();
  };

  const handleGoToMushafPage = (targetPage: number) => {
    const clampedPage = Math.max(1, Math.min(MUSHAF_TOTAL_PAGES, Math.floor(targetPage)));
    const meta = getMushafPageMeta(clampedPage);
    void triggerSelectionHaptic();
    if (meta.startSurah === surahPayload.meta.number) {
      const matchIdx = pages.findIndex(
        (p) =>
          (p.isStandardMushafPageNumber && p.displayPageNumber === clampedPage) ||
          p.ayahs.some((a) => a.numberInSurah >= meta.startAyah)
      );
      if (matchIdx >= 0) {
        persistPageIndex(matchIdx);
        setJumpSheetOpen(false);
        return;
      }
    }
    onNavigateToSurahAyah?.(meta.startSurah, meta.startAyah);
    onToast?.(`Opened Mushaf Page ${clampedPage} · Juz ${meta.juz} (${meta.primarySurahName})`);
    setJumpSheetOpen(false);
  };

  const handleStepPage = (delta: -1 | 1) => {
    if (delta === -1) {
      if (pageIdx > 0) {
        persistPageIndex(pageIdx - 1);
      } else if (canonicalMushafPage > 1 && onNavigateToSurahAyah) {
        handleGoToMushafPage(canonicalMushafPage - 1);
      }
      return;
    }
    if (pageIdx < pages.length - 1) {
      persistPageIndex(pageIdx + 1);
    } else if (canonicalMushafPage < MUSHAF_TOTAL_PAGES && onNavigateToSurahAyah) {
      handleGoToMushafPage(canonicalMushafPage + 1);
    }
  };

  const handleTogglePageBookmark = () => {
    if (!currentPage) return;
    const exists = prefs.bookmarkedPages.some(
      (b) =>
        b.surahNumber === surahPayload.meta.number && b.pageIndex === currentPage.pageIndex
    );
    const nextBookmarks = exists
      ? prefs.bookmarkedPages.filter(
          (b) =>
            !(
              b.surahNumber === surahPayload.meta.number &&
              b.pageIndex === currentPage.pageIndex
            )
        )
      : [
          {
            surahNumber: surahPayload.meta.number,
            surahName: surahPayload.meta.nameTranslit,
            pageIndex: currentPage.pageIndex,
            displayPageNumber: canonicalMushafPage,
            firstAyahNumber: currentPage.ayahs[0]?.numberInSurah || 1,
            savedAtIso: new Date().toISOString(),
          },
          ...prefs.bookmarkedPages,
        ].slice(0, 40);

    const nextPrefs: QuranReaderPreferences = {
      ...prefs,
      bookmarkedPages: nextBookmarks,
    };
    setPrefs(nextPrefs);
    saveQuranReaderPreferences(nextPrefs);
    void triggerLightHaptic();
    onToast?.(
      exists
        ? `Removed bookmark for Mushaf Page ${canonicalMushafPage}`
        : `Bookmarked ${surahPayload.meta.nameTranslit} · Mushaf Page ${canonicalMushafPage}`
    );
  };

  const handleThemeChange = (theme: 'ivory' | 'sepia' | 'night') => {
    const nextPrefs: QuranReaderPreferences = { ...prefs, mushafParchmentTheme: theme };
    setPrefs(nextPrefs);
    saveQuranReaderPreferences(nextPrefs);
  };

  if (!currentPage) return null;

  const effectiveTheme = darkMode ? 'night' : prefs.mushafParchmentTheme;
  const isPageBookmarked = prefs.bookmarkedPages.some(
    (b) => b.surahNumber === surahPayload.meta.number && b.pageIndex === currentPage.pageIndex
  );

  const fontSizeClass =
    arabicFontScale <= 1
      ? 'text-[22px] leading-[2.35]'
      : arabicFontScale === 2
      ? 'text-[27px] leading-[2.4]'
      : arabicFontScale === 3
      ? 'text-[32px] leading-[2.45]'
      : 'text-[36px] leading-[2.5]';

  const surfaceClasses =
    effectiveTheme === 'night'
      ? 'bg-[#081F15] text-amber-50 border-amber-400/35'
      : effectiveTheme === 'sepia'
      ? 'bg-[#F8F0DF] text-[#1C1917] border-[#D4AF37]/60'
      : 'bg-[#FFFDF8] text-[#0F291E] border-[#D4AF37]/55';

  const selectedAyahObj =
    currentPage.ayahs.find((a) => a.numberInSurah === activeAyahNumber) || currentPage.ayahs[0];

  const canGoPrev = pageIdx > 0 || (Boolean(onNavigateToSurahAyah) && canonicalMushafPage > 1);
  const canGoNext =
    pageIdx < pages.length - 1 ||
    (Boolean(onNavigateToSurahAyah) && canonicalMushafPage < MUSHAF_TOTAL_PAGES);

  return (
    <div className="space-y-3">
      {/* Honest 604-Page Mushaf Header + Script & Surface Switcher */}
      <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>
              {scriptStyle === 'indopak'
                ? 'IndoPak (15-Line) · 604-Page Mushaf'
                : 'Madani (Uthmani) · 604-Page Mushaf'}
            </span>
          </p>
          <p className="text-[11px] text-[var(--text-secondary)]">
            Live word highlight · Tap any Ayah to listen, bookmark or create card
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {/* Madani (Uthmani) vs IndoPak (15-Line) Script Toggle */}
          <div
            role="group"
            aria-label="Quran Script Style"
            className="flex items-center bg-[var(--bg-subtle)] rounded-xl p-0.5 border border-[var(--border-subtle)]"
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
                onClick={() => {
                  setScriptStyle(opt.id);
                  void triggerSelectionHaptic();
                }}
                className={`min-h-[34px] px-2.5 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition ${
                  scriptStyle === opt.id
                    ? 'bg-[#14532D] text-amber-300 shadow-2xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {!darkMode && (
            <div className="flex items-center bg-[var(--bg-subtle)] rounded-xl p-0.5">
              {(['ivory', 'sepia', 'night'] as const).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => handleThemeChange(theme)}
                  className={`min-h-[34px] px-2.5 rounded-lg text-[11px] font-extrabold capitalize transition ${
                    prefs.mushafParchmentTheme === theme
                      ? 'bg-[#14532D] text-white'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {theme === 'night' ? (
                    <Moon className="w-3.5 h-3.5 inline" />
                  ) : theme === 'ivory' ? (
                    <Sun className="w-3.5 h-3.5 inline" />
                  ) : (
                    'Warm'
                  )}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              void triggerLightHaptic();
              setJumpPageInput(canonicalMushafPage);
              setJumpSheetOpen(true);
            }}
            className="min-h-[38px] px-3 rounded-xl bg-[#14532D] text-amber-300 text-xs font-extrabold inline-flex items-center gap-1 tabular-nums transition active:scale-95"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>p. {canonicalMushafPage}/604</span>
          </button>

          <button
            type="button"
            onClick={() => {
              void triggerSuccessHaptic();
              markKhatamPageComplete(canonicalMushafPage);
              onToast?.(
                `Logged Mushaf Page ${canonicalMushafPage} toward your Khatam-ul-Qur'an goal!`
              );
            }}
            aria-pressed={isCurrentPageLoggedKhatam}
            className={`min-h-[38px] px-3 rounded-xl border text-xs font-extrabold inline-flex items-center gap-1 transition ${
              isCurrentPageLoggedKhatam
                ? 'bg-[#22C55E] text-emerald-950 border-emerald-500'
                : 'bg-[var(--bg-elevated)] text-[#14532D] dark:text-emerald-200 border-[var(--border-subtle)]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCurrentPageLoggedKhatam ? 'Page Read ✓' : 'Mark Read'}</span>
          </button>

          <button
            type="button"
            onClick={handleTogglePageBookmark}
            aria-pressed={isPageBookmarked}
            className={`min-h-[38px] px-3 rounded-xl border text-xs font-extrabold inline-flex items-center gap-1 transition ${
              isPageBookmarked
                ? 'bg-amber-400 text-emerald-950 border-amber-500'
                : 'bg-[var(--bg-elevated)] text-[#14532D] dark:text-emerald-200 border-[var(--border-subtle)] hover:border-emerald-500/40'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isPageBookmarked ? 'fill-current' : ''}`} />
            <span>{isPageBookmarked ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Calm Ornamental 604-Page Mushaf Frame */}
      <article
        aria-label={`Surah ${surahPayload.meta.nameTranslit} Mushaf Page ${canonicalMushafPage} of ${MUSHAF_TOTAL_PAGES}`}
        className={`rounded-[24px] border-2 p-5 sm:p-7 shadow-sm space-y-5 transition-colors ${surfaceClasses}`}
      >
        {/* Surah Page Header */}
        <div className="flex items-center justify-between border-b border-amber-500/25 pb-3 text-xs font-extrabold">
          <span className="tabular-nums opacity-85">
            Juz {currentPage.ayahs[0]?.juzNumber || canonicalPageMeta.juz}
          </span>
          <span className="font-arabic text-xl font-bold tracking-normal">
            {surahPayload.meta.nameArabic}
          </span>
          <span className="tabular-nums opacity-85">
            Page {canonicalMushafPage} / {MUSHAF_TOTAL_PAGES}
          </span>
        </div>

        {/* Bismillah on Page 1 (except Surah 1 where it's Ayah 1 and Surah 9) */}
        {currentPage.pageIndex === 0 &&
          surahPayload.meta.number !== 9 &&
          surahPayload.meta.number !== 1 && (
            <p className={`${scriptFontClass} text-2xl sm:text-3xl font-bold text-center opacity-95`}>
              {formatAyahTextForScript('بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ', scriptStyle)}
            </p>
          )}

        {/* Continuous RTL Verse Flow (Madani Uthmani or IndoPak 15-Line) with Live Word Highlight */}
        <div
          dir="rtl"
          lang="ar"
          className={`${scriptFontClass} text-justify ${fontSizeClass} select-text`}
        >
          {currentPage.ayahs.map((ayah) => {
            const isSelected = ayah.numberInSurah === activeAyahNumber;
            const isReciting = isAyahHighlighted(ayah.numberInSurah);
            const bookmarked = isAyahBookmarked(ayah.numberInSurah);
            const displayText = formatAyahTextForScript(ayah.arabicUthmani, scriptStyle);
            const words = isReciting ? displayText.split(/\s+/).filter(Boolean) : [];
            const liveWordIdx = isReciting
              ? getActiveWordIndexAtProgress(words, playbackClock.ratio)
              : -1;
            return (
              <span
                key={ayah.numberInSurah}
                ref={registerAyahElement(ayah.numberInSurah)}
                data-mushaf-ayah={ayah.numberInSurah}
                onClick={() => {
                  onSelectAyah(ayah.numberInSurah);
                  void triggerSelectionHaptic();
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectAyah(ayah.numberInSurah);
                  }
                }}
                className={`inline rounded-xl px-1.5 py-0.5 cursor-pointer transition-all duration-300 ${
                  isReciting
                    ? effectiveTheme === 'night'
                      ? 'ilmizo-ayah-span-playing text-amber-100'
                      : 'ilmizo-ayah-span-playing text-[#0F3826]'
                    : isSelected
                    ? effectiveTheme === 'night'
                      ? 'bg-amber-400/20 text-amber-100'
                      : 'bg-amber-200/55 text-[#0F3826]'
                    : 'hover:bg-amber-300/20'
                }`}
              >
                {isReciting && words.length > 0
                  ? words.map((word, wIdx) => (
                      <React.Fragment key={`${ayah.numberInSurah}-w-${wIdx}`}>
                        <span
                          data-live-word={wIdx === liveWordIdx ? 'true' : undefined}
                          className={
                            wIdx === liveWordIdx
                              ? 'inline-block rounded-lg px-1 bg-amber-400/45 dark:bg-amber-400/35 text-[#0F3826] dark:text-amber-100 font-bold shadow-2xs transition-colors duration-150'
                              : undefined
                          }
                        >
                          {word}
                        </span>{' '}
                      </React.Fragment>
                    ))
                  : `${displayText} `}
                <span
                  className={`inline-block mx-1 text-[0.72em] font-bold tabular-nums ${
                    bookmarked
                      ? 'text-emerald-600'
                      : effectiveTheme === 'night'
                      ? 'text-amber-300'
                      : 'text-amber-700'
                  }`}
                  title={`Ayah ${ayah.numberInSurah}${bookmarked ? ' (Bookmarked)' : ''}`}
                >
                  {formatOrnamentalAyahMarker(ayah.numberInSurah)}
                </span>{' '}
              </span>
            );
          })}
        </div>

        {/* Selected Ayah Quiet Action Strip */}
        {selectedAyahObj && (
          <div
            className={`rounded-2xl p-3 border flex flex-wrap items-center justify-between gap-2 text-xs ${
              effectiveTheme === 'night'
                ? 'bg-white/5 border-white/10 text-emerald-100'
                : 'bg-white/80 border-emerald-950/10 text-slate-800'
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="font-extrabold tabular-nums">
                Selected: {surahPayload.meta.nameTranslit} {surahPayload.meta.number}:
                {selectedAyahObj.numberInSurah}
              </p>
              <p className="text-[11px] opacity-80 line-clamp-2 mt-0.5">
                {selectedAyahObj.translations.en}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onPlayAyahAudio(selectedAyahObj)}
                className="min-h-[40px] px-3 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center gap-1.5 transition"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Recite</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleBookmarkAyah(selectedAyahObj)}
                className="min-h-[40px] px-3 rounded-xl border border-amber-400/60 bg-amber-50 dark:bg-amber-500/20 text-emerald-950 dark:text-amber-200 text-xs font-extrabold inline-flex items-center gap-1 transition"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    isAyahBookmarked(selectedAyahObj.numberInSurah) ? 'fill-current' : ''
                  }`}
                />
                <span>{isAyahBookmarked(selectedAyahObj.numberInSurah) ? 'Saved' : 'Bookmark'}</span>
              </button>
              {onCreateReminderCard && (
                <button
                  type="button"
                  onClick={() => onCreateReminderCard(selectedAyahObj)}
                  className="min-h-[40px] px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold inline-flex items-center gap-1 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Card</span>
                </button>
              )}
            </div>
          </div>
        )}
      </article>

      {/* Page Navigation Footer (604-Page Continuous Navigation Across Surahs) */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          disabled={!canGoPrev}
          onClick={() => handleStepPage(-1)}
          className="min-h-[48px] px-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[#14532D] dark:text-emerald-200 disabled:opacity-40 text-xs font-extrabold inline-flex items-center gap-1.5 shadow-2xs active:scale-95 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Page</span>
        </button>

        <button
          type="button"
          onClick={() => {
            void triggerLightHaptic();
            setJumpPageInput(canonicalMushafPage);
            setJumpSheetOpen(true);
          }}
          className="min-h-[42px] px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-extrabold text-[var(--text-primary)] tabular-nums"
        >
          Page {canonicalMushafPage} / {MUSHAF_TOTAL_PAGES}
        </button>

        <button
          type="button"
          disabled={!canGoNext}
          onClick={() => handleStepPage(1)}
          className="min-h-[48px] px-4 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white disabled:opacity-40 text-xs font-extrabold inline-flex items-center gap-1.5 shadow-2xs active:scale-95 transition"
        >
          <span>Next Page</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 604-Page & 30-Juz Quick Jump BottomSheet */}
      <BottomSheet
        open={jumpSheetOpen}
        onClose={() => setJumpSheetOpen(false)}
        title="Jump in 604-Page Mushaf"
        subtitle="Navigate directly to any Madani Mushaf page (1–604) or Juz (1–30)."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[var(--bg-subtle)]">
            <button
              type="button"
              onClick={() => setJumpTab('page')}
              className={`min-h-[40px] rounded-xl text-xs font-extrabold transition ${
                jumpTab === 'page'
                  ? 'bg-[#14532D] text-amber-300'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              By Page (1–604)
            </button>
            <button
              type="button"
              onClick={() => setJumpTab('juz')}
              className={`min-h-[40px] rounded-xl text-xs font-extrabold transition ${
                jumpTab === 'juz'
                  ? 'bg-[#14532D] text-amber-300'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              By Juz (1–30)
            </button>
          </div>

          {jumpTab === 'page' ? (
            <div className="space-y-4">
              {(() => {
                const previewMeta = getMushafPageMeta(jumpPageInput);
                return (
                  <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 text-center space-y-1.5">
                    <p className="text-xs font-extrabold text-amber-700 dark:text-amber-300 tabular-nums">
                      Page {previewMeta.page} of {MUSHAF_TOTAL_PAGES} · Juz {previewMeta.juz}
                    </p>
                    <p className="font-arabic-uthmani text-2xl text-[var(--text-primary)]">
                      {previewMeta.primarySurahArabic}
                    </p>
                    <p className="text-sm font-extrabold text-[var(--text-primary)]">
                      Surah {previewMeta.primarySurahName} ({previewMeta.startSurah}:
                      {previewMeta.startAyah})
                    </p>
                  </div>
                );
              })()}

              <div className="space-y-2">
                <input
                  type="range"
                  min={1}
                  max={MUSHAF_TOTAL_PAGES}
                  value={jumpPageInput}
                  onChange={(e) => setJumpPageInput(Number(e.target.value))}
                  className="w-full accent-[#14532D]"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={MUSHAF_TOTAL_PAGES}
                    value={jumpPageInput}
                    onChange={(e) =>
                      setJumpPageInput(
                        Math.max(1, Math.min(MUSHAF_TOTAL_PAGES, Number(e.target.value) || 1))
                      )
                    }
                    className="w-28 rounded-2xl ilmizo-input px-3 py-2.5 text-sm font-extrabold text-center tabular-nums"
                  />
                  <button
                    type="button"
                    onClick={() => handleGoToMushafPage(jumpPageInput)}
                    className="flex-1 min-h-[46px] rounded-2xl bg-[#14532D] text-white text-xs font-extrabold active:scale-95 transition"
                  >
                    Open Mushaf Page {jumpPageInput}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 max-h-[52vh] overflow-y-auto pr-1">
              {JUZ_30_BOUNDARIES.map((j) => (
                <button
                  key={j.juz}
                  type="button"
                  onClick={() => handleGoToMushafPage(j.startPage)}
                  className="min-h-[58px] p-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[#14532D]/50 text-left transition active:scale-95"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-black text-[#14532D] dark:text-amber-300 tabular-nums">
                      Juz {j.juz}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] tabular-nums">
                      p. {j.startPage}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[var(--text-primary)] truncate mt-0.5">
                    {j.nameTranslit}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </BottomSheet>
    </div>
  );
};
