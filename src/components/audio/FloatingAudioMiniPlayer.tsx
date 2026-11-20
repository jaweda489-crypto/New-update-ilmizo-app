import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Loader2,
  Moon,
  Pause,
  Play,
  SkipForward,
  Volume2,
  X,
} from 'lucide-react';
import { useAudioManager } from '../../services/audioManager';
import { useIlmizo } from '../../context/IlmizoContext';
import { triggerSelectionHaptic } from '../../services/hapticsService';
import { formatSleepCountdown, useSleepTimer } from '../../services/sleepTimerService';
import { SleepTimerSheet } from '../shared/SleepTimerSheet';

/**
 * Persistent Floating Audio Mini-Player powered strictly by the single existing
 * CentralizedAudioManager (`useAudioManager`). Allows Quran recitation to continue
 * smoothly while browsing Adult screens, respects bottom navigation & safe areas,
 * and shows honest offline/error feedback without ever creating a duplicate player.
 */
export const FloatingAudioMiniPlayer: React.FC = () => {
  const audio = useAudioManager();
  const { mode, adultRoute, kidsRoute, openSurahForReading } = useIlmizo();
  const prefersReducedMotion = useReducedMotion();
  const [minimized, setMinimized] = useState(false);
  const [sleepSheetOpen, setSleepSheetOpen] = useState(false);
  const sleepTimer = useSleepTimer();

  const hasQuranTrack = Boolean(
    audio.quranSequence.surahNumber &&
      audio.quranSequence.surahName &&
      audio.quranSequence.mode
  );

  const isActive =
    audio.status === 'playing' ||
    audio.status === 'paused' ||
    audio.status === 'loading' ||
    (audio.status === 'error' && Boolean(audio.errorMessage));

  const isOnInlineAudioScreen =
    (mode === 'adult' && adultRoute === 'quran_read') ||
    (mode === 'kids' &&
      (kidsRoute === 'quran_learning' ||
        kidsRoute === 'recitation_practice' ||
        kidsRoute === 'stories'));

  // Hide inside screens where a dedicated inline player is already docked
  const shouldShow =
    isActive &&
    !isOnInlineAudioScreen &&
    (hasQuranTrack || audio.activeTrackId !== null);

  if (!shouldShow) return null;

  const title = hasQuranTrack
    ? `Surah ${audio.quranSequence.surahName} · Ayah ${audio.quranSequence.currentAyah ?? 1}`
    : audio.activeKind === 'speech'
    ? 'Voice Reading Active'
    : 'Recitation Audio';

  const subtitle =
    audio.status === 'error' && audio.errorMessage
      ? audio.errorMessage
      : hasQuranTrack
      ? `${audio.quranSequence.reciterName}${
          audio.quranSequence.playbackSource === 'offline_downloaded'
            ? ' · Offline'
            : ''
        }`
      : audio.status === 'loading'
      ? 'Preparing audio…'
      : audio.status === 'paused'
      ? 'Paused'
      : 'Playing';

  const progressPct = hasQuranTrack
    ? Math.max(0, Math.min(100, audio.quranSequence.progressPercent || 0))
    : 0;

  return (
    <AnimatePresence>
      <motion.aside
        key="ilmizo-floating-mini-player"
        aria-label="Audio Mini Player"
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.18 }}
        className="fixed left-3 right-3 lg:left-[20.5rem] lg:right-6 bottom-[76px] z-40 max-w-2xl mx-auto"
      >
        <div
          className={`rounded-2xl border shadow-xl backdrop-blur-md overflow-hidden transition-all ${
            audio.status === 'error'
              ? 'bg-rose-950/95 border-rose-400/40 text-rose-50'
              : 'bg-[#0C2C1E]/95 border-[#D4AF37]/45 text-white'
          }`}
        >
          {/* Slim Persistent Progress Track (always visible even when minimized) */}
          {hasQuranTrack && audio.status !== 'error' && (
            <div className="h-1 w-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] transition-all duration-300"
                style={{ width: `${Math.max(4, progressPct)}%` }}
              />
            </div>
          )}

          {minimized ? (
            <div className="px-3 py-1.5 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setMinimized(false)}
                className="flex items-center gap-2 min-w-0 flex-1 text-left min-h-[36px]"
                aria-label="Expand audio player"
              >
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse shrink-0" />
                <span className="text-xs font-extrabold text-white truncate">{title}</span>
                {hasQuranTrack && (
                  <span className="text-[11px] font-bold text-amber-300 tabular-nums shrink-0">
                    {progressPct}%
                  </span>
                )}
              </button>
              <div className="flex items-center gap-1 shrink-0">
                {audio.status !== 'error' && (
                  <button
                    type="button"
                    onClick={() => {
                      void triggerSelectionHaptic();
                      if (audio.status === 'playing') {
                        audio.pause();
                      } else {
                        audio.resume();
                      }
                    }}
                    aria-label={audio.status === 'playing' ? 'Pause audio' : 'Resume audio'}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-emerald-950 flex items-center justify-center active:scale-95 transition"
                  >
                    {audio.status === 'playing' ? (
                      <Pause className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMinimized(false)}
                  aria-label="Expand audio controls"
                  title="Expand player"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 flex items-center justify-center transition"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="px-3 py-2 flex items-center justify-between gap-2.5">
              {/* Left: Track Info + Tap to Open Quran Reader */}
              <button
                type="button"
                onClick={() => {
                  if (hasQuranTrack && audio.quranSequence.surahNumber) {
                    void triggerSelectionHaptic();
                    openSurahForReading(
                      audio.quranSequence.surahNumber,
                      audio.quranSequence.currentAyah || 1
                    );
                  }
                }}
                className="flex items-center gap-2.5 min-w-0 flex-1 text-left min-h-[44px]"
                title={hasQuranTrack ? 'Open in Quran Reader' : title}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    audio.status === 'error'
                      ? 'bg-rose-500/25 text-rose-200'
                      : 'bg-[#14532D] border border-amber-300/40 text-amber-300'
                  }`}
                >
                  {audio.status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : audio.status === 'error' ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : hasQuranTrack ? (
                    <BookOpen className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold text-white truncate leading-tight">
                    {title}
                  </p>
                  <p className="text-[11px] text-emerald-100/80 truncate mt-0.5 leading-tight">
                    {subtitle}
                  </p>
                </div>
              </button>

              {/* Right: Play/Pause, Next Ayah, Minimize, Close */}
              <div className="flex items-center gap-1 shrink-0">
                {audio.status !== 'error' && (
                  <button
                    type="button"
                    onClick={() => {
                      void triggerSelectionHaptic();
                      if (audio.status === 'playing') {
                        audio.pause();
                      } else {
                        audio.resume();
                      }
                    }}
                    aria-label={audio.status === 'playing' ? 'Pause audio' : 'Resume audio'}
                    className="min-w-[40px] min-h-[40px] rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-emerald-950 flex items-center justify-center shadow-xs active:scale-95 transition"
                  >
                    {audio.status === 'playing' ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>
                )}

                {hasQuranTrack && audio.status !== 'error' && (
                  <button
                    type="button"
                    onClick={() => {
                      void triggerSelectionHaptic();
                      void audio.nextAyah();
                    }}
                    aria-label="Next Ayah"
                    title="Next Ayah"
                    className="min-w-[38px] min-h-[38px] rounded-full bg-white/10 hover:bg-white/20 text-emerald-50 flex items-center justify-center active:scale-95 transition"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    void triggerSelectionHaptic();
                    setSleepSheetOpen(true);
                  }}
                  aria-label="Open Sleep Timer"
                  title="Sleep Timer"
                  className={`min-w-[38px] min-h-[38px] px-2 rounded-full flex items-center justify-center gap-1 active:scale-95 transition ${
                    sleepTimer.mode !== 'off'
                      ? 'bg-amber-400 text-emerald-950 font-extrabold text-[11px]'
                      : 'bg-white/10 hover:bg-white/20 text-emerald-100'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 shrink-0" />
                  {sleepTimer.mode === 'countdown' && (
                    <span className="tabular-nums">
                      {formatSleepCountdown(sleepTimer.remainingSeconds)}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setMinimized(true)}
                  aria-label="Minimize audio player"
                  title="Minimize player"
                  className="min-w-[38px] min-h-[38px] rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 flex items-center justify-center active:scale-95 transition"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    void triggerSelectionHaptic();
                    setMinimized(false);
                    audio.stopAll();
                  }}
                  aria-label="Stop and close audio player"
                  title="Stop audio"
                  className="min-w-[38px] min-h-[38px] rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 flex items-center justify-center active:scale-95 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.aside>
      <SleepTimerSheet open={sleepSheetOpen} onClose={() => setSleepSheetOpen(false)} />
    </AnimatePresence>
  );
};
