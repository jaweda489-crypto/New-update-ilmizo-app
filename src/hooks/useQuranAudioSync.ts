import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useAudioManager } from '../services/audioManager';
import { triggerVerseTransitionHaptic } from '../services/hapticsService';

export interface SyncableAyahItem {
  numberInSurah: number;
}

export interface UseQuranAudioSyncOptions {
  /** Currently open Surah number (1..114) */
  surahNumber: number;
  /** Ayahs loaded for the active Surah */
  ayahs: readonly SyncableAyahItem[];
  /** Currently focused 0-based Ayah index in the view */
  activeAyahIdx: number;
  /** Callback to update the view's active Ayah index when playback advances */
  onAyahIndexChange: (nextIdx: number) => void;
  /** Optional callback fired whenever playback transitions onto a verse (e.g., to mark practiced) */
  onVerseAdvance?: (ayahNumberInSurah: number) => void;
  /** Whether this view is currently visible/active (defaults to true) */
  enabled?: boolean;
  /** Trigger subtle @capacitor/haptics feedback on verse-to-verse transition (defaults to true) */
  enableHaptics?: boolean;
  /** Automatically smooth-scroll the active Ayah element into focus (defaults to true) */
  autoScroll?: boolean;
}

export interface UseQuranAudioSyncResult {
  audioState: ReturnType<typeof useAudioManager>;
  /** True when this exact Surah is actively playing */
  isPlayingThisSurah: boolean;
  /** True when this exact Surah is paused */
  isPausedThisSurah: boolean;
  /** True when this exact Surah is loading, playing, or paused */
  isActiveThisSurah: boolean;
  /** Active verse number (1-based) currently being recited for this Surah, or null */
  playingAyahNumber: number | null;
  /** 0..100 progress percentage across the active Surah or selected range */
  progressPercent: number;
  /** Helper returning true when the given Ayah should display the active recitation highlight */
  isAyahHighlighted: (ayahNumberInSurah: number) => boolean;
  /** Ref registrar for Ayah DOM elements so auto-scroll can smoothly focus the reciting verse */
  registerAyahElement: (ayahNumberInSurah: number) => (el: HTMLElement | null) => void;
  /** Manually scroll a registered Ayah element into focus */
  scrollToAyah: (ayahNumberInSurah: number) => void;
}

/**
 * Unified Quran audio synchronization hook shared by Adult (Card, Mushaf & Study views)
 * and Kids Quran learning screens. Monitors centralized audioManager events to keep:
 * - active verse index auto-advancing cleanly,
 * - subtle @capacitor/haptics feedback on verse transitions,
 * - smooth auto-scrolling onto the reciting Ayah, and
 * - consistent playback progress tracking & verse highlight state.
 */
export function useQuranAudioSync({
  surahNumber,
  ayahs,
  activeAyahIdx,
  onAyahIndexChange,
  onVerseAdvance,
  enabled = true,
  enableHaptics = true,
  autoScroll = true,
}: UseQuranAudioSyncOptions): UseQuranAudioSyncResult {
  const audioState = useAudioManager();
  const prefersReducedMotion = useReducedMotion();

  const ayahElementMapRef = useRef<Map<number, HTMLElement>>(new Map());
  const lastTrackedTransitionRef = useRef<string | null>(null);
  const lastScrolledKeyRef = useRef<string | null>(null);

  const onAyahIndexChangeRef = useRef(onAyahIndexChange);
  const onVerseAdvanceRef = useRef(onVerseAdvance);
  onAyahIndexChangeRef.current = onAyahIndexChange;
  onVerseAdvanceRef.current = onVerseAdvance;

  const seq = audioState.quranSequence;
  const isSameSurah = seq.surahNumber === surahNumber;
  const isPlayingThisSurah =
    isSameSurah && (audioState.status === 'playing' || audioState.status === 'loading');
  const isPausedThisSurah = isSameSurah && audioState.status === 'paused';
  const isActiveThisSurah = isPlayingThisSurah || isPausedThisSurah;

  const playingAyahNumber =
    isActiveThisSurah && typeof seq.currentAyah === 'number' ? seq.currentAyah : null;

  const registerAyahElement = useCallback((ayahNumberInSurah: number) => {
    return (el: HTMLElement | null) => {
      if (el) {
        ayahElementMapRef.current.set(ayahNumberInSurah, el);
      } else {
        ayahElementMapRef.current.delete(ayahNumberInSurah);
      }
    };
  }, []);

  const scrollToAyah = useCallback(
    (ayahNumberInSurah: number) => {
      if (typeof window === 'undefined') return;
      const runScroll = () => {
        const target = ayahElementMapRef.current.get(ayahNumberInSurah);
        if (!target || typeof target.scrollIntoView !== 'function') return;
        try {
          target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'center',
            inline: 'nearest',
          });
        } catch {
          target.scrollIntoView();
        }
      };
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(runScroll);
      } else {
        runScroll();
      }
    },
    [prefersReducedMotion]
  );

  // Reset transition trackers when playback stops or Surah changes
  useEffect(() => {
    if (!isActiveThisSurah) {
      lastTrackedTransitionRef.current = null;
      lastScrolledKeyRef.current = null;
    }
  }, [isActiveThisSurah, surahNumber]);

  // Synchronize active Ayah index, subtle haptic pulse, and auto-scroll whenever verse advances
  useEffect(() => {
    if (!enabled || !isActiveThisSurah || playingAyahNumber === null) return;

    const targetIdx = ayahs.findIndex((a) => a.numberInSurah === playingAyahNumber);
    if (targetIdx >= 0 && targetIdx !== activeAyahIdx) {
      onAyahIndexChangeRef.current(targetIdx);
    }

    const transitionKey = `${surahNumber}:${playingAyahNumber}:r${seq.currentRepetition}`;
    const prevKey = lastTrackedTransitionRef.current;

    if (prevKey !== transitionKey) {
      lastTrackedTransitionRef.current = transitionKey;

      // Fire subtle tactile indicator when transitioning from a previous verse to the next verse
      if (prevKey !== null && enableHaptics && audioState.status === 'playing') {
        void triggerVerseTransitionHaptic();
      }

      if (prevKey !== null) {
        onVerseAdvanceRef.current?.(playingAyahNumber);
      }
    }

    if (autoScroll && lastScrolledKeyRef.current !== transitionKey) {
      lastScrolledKeyRef.current = transitionKey;
      scrollToAyah(playingAyahNumber);
    }
  }, [
    enabled,
    isActiveThisSurah,
    playingAyahNumber,
    surahNumber,
    ayahs,
    activeAyahIdx,
    seq.currentRepetition,
    audioState.status,
    enableHaptics,
    autoScroll,
    scrollToAyah,
  ]);

  const progressPercent = useMemo(() => {
    if (isActiveThisSurah && playingAyahNumber !== null) {
      const start = seq.startAyah ?? 1;
      const end = seq.endAyah ?? Math.max(1, ayahs.length);
      const span = Math.max(1, end - start + 1);
      const position = Math.max(1, playingAyahNumber - start + 1);
      return Math.min(100, Math.round((position / span) * 100));
    }
    if (ayahs.length === 0) return 0;
    return Math.min(100, Math.round(((activeAyahIdx + 1) / ayahs.length) * 100));
  }, [isActiveThisSurah, playingAyahNumber, seq.startAyah, seq.endAyah, ayahs.length, activeAyahIdx]);

  const isAyahHighlighted = useCallback(
    (ayahNumberInSurah: number) =>
      isPlayingThisSurah && playingAyahNumber === ayahNumberInSurah,
    [isPlayingThisSurah, playingAyahNumber]
  );

  return {
    audioState,
    isPlayingThisSurah,
    isPausedThisSurah,
    isActiveThisSurah,
    playingAyahNumber,
    progressPercent,
    isAyahHighlighted,
    registerAyahElement,
    scrollToAyah,
  };
}
