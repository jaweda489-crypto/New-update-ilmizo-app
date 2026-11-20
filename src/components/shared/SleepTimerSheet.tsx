import React from 'react';
import { Moon, Timer, X, Check } from 'lucide-react';
import { BottomSheet } from '../sheets/BottomSheet';
import {
  SLEEP_TIMER_PRESET_MINUTES,
  formatSleepCountdown,
  sleepTimerService,
  useSleepTimer,
} from '../../services/sleepTimerService';
import { triggerLightHaptic, triggerSelectionHaptic } from '../../services/hapticsService';

interface SleepTimerSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export const SleepTimerSheet: React.FC<SleepTimerSheetProps> = ({
  open,
  onClose,
  title = 'Sleep Timer',
}) => {
  const timer = useSleepTimer();

  const handleSelectMinutes = (mins: number) => {
    void triggerSelectionHaptic();
    sleepTimerService.startMinutes(mins);
    onClose();
  };

  const handleSelectEndOfTrack = () => {
    void triggerSelectionHaptic();
    sleepTimerService.startEndOfTrack();
    onClose();
  };

  const handleTurnOff = () => {
    void triggerLightHaptic();
    sleepTimerService.cancel();
    onClose();
  };

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={title}
      subtitle="Automatically pause recitation or bedtime stories peacefully"
    >
      <div className="space-y-4">
        {timer.mode !== 'off' && (
          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-700/50 p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#14532D] text-amber-300 flex items-center justify-center shrink-0">
                <Moon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-[#14532D] dark:text-emerald-100">
                  {timer.mode === 'end_of_track'
                    ? 'Stops after current track'
                    : `Stopping in ${formatSleepCountdown(timer.remainingSeconds)}`}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Audio will pause automatically so you can rest
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleTurnOff}
              className="min-h-[44px] px-3 rounded-xl bg-rose-600 text-white text-xs font-bold flex items-center gap-1 shrink-0 active:scale-95 transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>Turn Off</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2.5">
          {SLEEP_TIMER_PRESET_MINUTES.map((mins) => {
            const isSelected =
              timer.mode === 'countdown' && timer.totalSeconds === mins * 60;
            return (
              <button
                key={mins}
                type="button"
                onClick={() => handleSelectMinutes(mins)}
                className={`min-h-[54px] rounded-2xl border px-3 py-2.5 text-center transition active:scale-[0.97] ${
                  isSelected
                    ? 'bg-[#14532D] text-white border-[#14532D] shadow-sm'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-emerald-600/40'
                }`}
              >
                <p className="text-base font-extrabold tabular-nums">{mins}m</p>
                <p className={`text-xs ${isSelected ? 'text-emerald-100' : 'text-[var(--text-secondary)]'}`}>
                  Minutes
                </p>
              </button>
            );
          })}
          <button
            type="button"
            onClick={handleSelectEndOfTrack}
            className={`min-h-[54px] rounded-2xl border px-3 py-2.5 text-center transition active:scale-[0.97] ${
              timer.mode === 'end_of_track'
                ? 'bg-[#14532D] text-white border-[#14532D] shadow-sm'
                : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-emerald-600/40'
            }`}
          >
            <p className="text-xs font-extrabold leading-tight flex items-center justify-center gap-1">
              {timer.mode === 'end_of_track' && <Check className="w-3.5 h-3.5" />}
              <span>End of</span>
            </p>
            <p
              className={`text-xs font-semibold ${
                timer.mode === 'end_of_track' ? 'text-emerald-100' : 'text-[var(--text-secondary)]'
              }`}
            >
              Track
            </p>
          </button>
        </div>

        <p className="text-xs text-[var(--text-secondary)] text-center">
          Works offline for Kids Bedtime Stories, Surah Recitation, and Car Drive Mode.
        </p>
      </div>
    </BottomSheet>
  );
};

interface SleepTimerTriggerButtonProps {
  onClick: () => void;
  variant?: 'light' | 'dark';
  compact?: boolean;
}

export const SleepTimerTriggerButton: React.FC<SleepTimerTriggerButtonProps> = ({
  onClick,
  variant = 'light',
  compact = false,
}) => {
  const timer = useSleepTimer();
  const isActive = timer.mode !== 'off';

  const label =
    timer.mode === 'countdown'
      ? formatSleepCountdown(timer.remainingSeconds)
      : timer.mode === 'end_of_track'
      ? 'End'
      : 'Sleep';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open Sleep Timer"
      className={`min-h-[44px] ${
        compact ? 'px-2.5' : 'px-3.5'
      } rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition active:scale-95 ${
        isActive
          ? 'bg-amber-400 text-emerald-950 border-amber-500 shadow-xs'
          : variant === 'dark'
          ? 'bg-white/10 text-emerald-100 border-white/15 hover:bg-white/20'
          : 'bg-[var(--bg-surface)] text-[#14532D] dark:text-emerald-200 border-[var(--border-subtle)] hover:border-emerald-600/40'
      }`}
    >
      {isActive ? <Timer className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
      <span className="tabular-nums">{label}</span>
    </button>
  );
};
