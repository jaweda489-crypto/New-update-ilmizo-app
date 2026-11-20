import { useEffect, useState } from 'react';
import { audioManager } from './audioManager';

export type SleepTimerMode = 'off' | 'countdown' | 'end_of_track';

export interface SleepTimerSnapshot {
  mode: SleepTimerMode;
  totalSeconds: number;
  remainingSeconds: number;
  endsAtMs: number | null;
  lastCompletedAtMs: number | null;
}

export const SLEEP_TIMER_PRESET_MINUTES = [5, 10, 15, 30, 45] as const;

type SleepTimerListener = (state: SleepTimerSnapshot) => void;

class SleepTimerController {
  private state: SleepTimerSnapshot = {
    mode: 'off',
    totalSeconds: 0,
    remainingSeconds: 0,
    endsAtMs: null,
    lastCompletedAtMs: null,
  };

  private listeners = new Set<SleepTimerListener>();
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private audioUnsubscribe: (() => void) | null = null;
  private previousAudioSourceId: string | null = null;

  public getState(): SleepTimerSnapshot {
    return this.state;
  }

  public subscribe(listener: SleepTimerListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  private clearHandles() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.audioUnsubscribe) {
      this.audioUnsubscribe();
      this.audioUnsubscribe = null;
    }
    this.previousAudioSourceId = null;
  }

  public startMinutes(minutes: number): void {
    const safeMinutes = Math.max(1, Math.min(180, Math.round(minutes)));
    const totalSeconds = safeMinutes * 60;
    const endsAtMs = Date.now() + totalSeconds * 1000;

    this.clearHandles();
    this.state = {
      mode: 'countdown',
      totalSeconds,
      remainingSeconds: totalSeconds,
      endsAtMs,
      lastCompletedAtMs: this.state.lastCompletedAtMs,
    };
    this.emit();

    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
  }

  public startEndOfTrack(): void {
    this.clearHandles();
    const currentAudio = audioManager.getState();
    this.previousAudioSourceId = currentAudio.activeTrackId;

    this.state = {
      mode: 'end_of_track',
      totalSeconds: 0,
      remainingSeconds: 0,
      endsAtMs: null,
      lastCompletedAtMs: this.state.lastCompletedAtMs,
    };
    this.emit();

    this.audioUnsubscribe = audioManager.subscribe((audioState) => {
      if (this.state.mode !== 'end_of_track') return;
      // Stop as soon as playback finishes or transitions to a different track
      if (
        (this.previousAudioSourceId &&
          audioState.activeTrackId &&
          audioState.activeTrackId !== this.previousAudioSourceId) ||
        audioState.status === 'idle'
      ) {
        this.completeAndStopAudio();
      } else if (!this.previousAudioSourceId && audioState.activeTrackId) {
        this.previousAudioSourceId = audioState.activeTrackId;
      }
    });
  }

  public cancel(): void {
    this.clearHandles();
    this.state = {
      mode: 'off',
      totalSeconds: 0,
      remainingSeconds: 0,
      endsAtMs: null,
      lastCompletedAtMs: this.state.lastCompletedAtMs,
    };
    this.emit();
  }

  private tick(): void {
    if (this.state.mode !== 'countdown' || !this.state.endsAtMs) {
      this.clearHandles();
      return;
    }
    const remainingSeconds = Math.max(0, Math.ceil((this.state.endsAtMs - Date.now()) / 1000));
    if (remainingSeconds <= 0) {
      this.completeAndStopAudio();
      return;
    }
    if (remainingSeconds !== this.state.remainingSeconds) {
      this.state = {
        ...this.state,
        remainingSeconds,
      };
      this.emit();
    }
  }

  private completeAndStopAudio(): void {
    this.clearHandles();
    audioManager.stopAll();
    this.state = {
      mode: 'off',
      totalSeconds: 0,
      remainingSeconds: 0,
      endsAtMs: null,
      lastCompletedAtMs: Date.now(),
    };
    this.emit();
  }
}

export const sleepTimerService = new SleepTimerController();

export function formatSleepCountdown(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function useSleepTimer(): SleepTimerSnapshot {
  const [snapshot, setSnapshot] = useState<SleepTimerSnapshot>(() => sleepTimerService.getState());
  useEffect(() => sleepTimerService.subscribe(setSnapshot), []);
  return snapshot;
}
