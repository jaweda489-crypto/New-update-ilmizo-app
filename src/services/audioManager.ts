import { useEffect, useState } from 'react';
import { ALL_114_SURAHS, resolveReciterConfig } from '../data/quranData';
import {
  OFFLINE_QARI_MISSING_MESSAGE,
  resolveQariAyahAudioSource,
} from './audioDownloadManager';
import {
  clearLockScreenMediaSession,
  initLockScreenMediaSession,
  syncLockScreenMediaMetadata,
  syncLockScreenPositionState,
} from './mediaSessionService';

export interface AudioPlaybackClock {
  currentTimeSec: number;
  durationSec: number;
  ratio: number; // 0..1
}

export type AudioPlaybackStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export type QuranPlaybackMode = 'single_ayah' | 'full_surah' | 'ayah_range';

export type RepeatCountOption = 1 | 2 | 5 | 10 | 'infinite';

export interface QuranSequenceState {
  mode: QuranPlaybackMode | null;
  surahNumber: number | null;
  surahName: string | null;
  currentAyah: number | null;
  startAyah: number | null;
  endAyah: number | null;
  totalAyahsInRange: number;
  completedAyahsInPass: number;
  progressPercent: number;
  repeatOption: RepeatCountOption;
  currentRepetition: number;
  reciterName: string;
  reciterEditionId: string;
  playbackSource: 'offline_downloaded' | 'online_stream' | null;
}

export interface AudioManagerState {
  status: AudioPlaybackStatus;
  activeTrackId: string | null;
  activeKind: 'audio' | 'speech' | null;
  isMuted: boolean;
  repeatEnabled: boolean;
  playbackRate: number;
  errorMessage: string | null;
  quranSequence: QuranSequenceState;
}

export interface PlayAudioOptions {
  id: string;
  url?: string;
  fallbackText?: string;
  fallbackLang?: string;
  allowTtsFallback?: boolean;
  offlineUnavailableMessage?: string;
  rate?: number;
  repeat?: boolean;
  onEnded?: () => void;
  onError?: (message: string) => void;
}

export interface SpeakTextOptions {
  id: string;
  text: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  repeat?: boolean;
  onEnded?: () => void;
  onError?: (message: string) => void;
}

export interface CustomAyahPlaybackDriverContext {
  url: string;
  surahNumber: number;
  ayahNumberInSurah: number;
  repetition: number;
  sessionToken: number;
  onComplete: () => void;
  onFail: (message: string) => void;
}

export type CustomAyahPlaybackDriver = (ctx: CustomAyahPlaybackDriverContext) => void | (() => void);

type Listener = (state: AudioManagerState) => void;
type CleanupCallback = () => void;

const DEFAULT_QURAN_SEQUENCE_STATE: QuranSequenceState = {
  mode: null,
  surahNumber: null,
  surahName: null,
  currentAyah: null,
  startAyah: null,
  endAyah: null,
  totalAyahsInRange: 0,
  completedAyahsInPass: 0,
  progressPercent: 0,
  repeatOption: 1,
  currentRepetition: 1,
  reciterName: 'Mishary Rashid Alafasy',
  reciterEditionId: 'ar.alafasy',
  playbackSource: null,
};

export function validateSurahAyahRange(
  surahNumber: number,
  startAyah: number,
  endAyah: number
): {
  valid: boolean;
  surahName: string;
  ayahCount: number;
  startAyah: number;
  endAyah: number;
  error?: string;
} {
  const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
  if (!meta) {
    return {
      valid: false,
      surahName: '',
      ayahCount: 0,
      startAyah,
      endAyah,
      error: `Invalid Surah number ${surahNumber}. Must be between 1 and 114.`,
    };
  }

  if (
    !Number.isInteger(startAyah) ||
    !Number.isInteger(endAyah) ||
    startAyah < 1 ||
    endAyah < 1 ||
    startAyah > meta.ayahCount ||
    endAyah > meta.ayahCount ||
    startAyah > endAyah
  ) {
    return {
      valid: false,
      surahName: meta.nameTranslit,
      ayahCount: meta.ayahCount,
      startAyah,
      endAyah,
      error: `Invalid Ayah range ${startAyah}–${endAyah} for Surah ${meta.nameTranslit} (valid range: 1–${meta.ayahCount}).`,
    };
  }

  return {
    valid: true,
    surahName: meta.nameTranslit,
    ayahCount: meta.ayahCount,
    startAyah,
    endAyah,
  };
}

class CentralizedAudioManager {
  private state: AudioManagerState = {
    status: 'idle',
    activeTrackId: null,
    activeKind: null,
    isMuted: false,
    repeatEnabled: false,
    playbackRate: 1,
    errorMessage: null,
    quranSequence: { ...DEFAULT_QURAN_SEQUENCE_STATE },
  };

  private currentAudio: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private lastPlayOptions: PlayAudioOptions | null = null;
  private lastSpeakOptions: SpeakTextOptions | null = null;
  private listeners = new Set<Listener>();
  private clockListeners = new Set<(clock: AudioPlaybackClock) => void>();
  private clockRafId: number | null = null;
  private playbackClock: AudioPlaybackClock = { currentTimeSec: 0, durationSec: 0, ratio: 0 };
  private externalCleanups = new Set<CleanupCallback>();
  private mediaSessionInitialized = false;

  /**
   * Monotonically increasing session token to prevent stale async callbacks or rapid
   * Play/Pause/Next/Stop interactions from ever restarting or overlapping audio.
   */
  private sessionToken = 0;
  private customDriverCleanup: (() => void) | null = null;
  private customAyahDriver: CustomAyahPlaybackDriver | null = null;
  private activeSequenceOptions: {
    isOnline?: boolean;
    onAyahChange?: (surahNumber: number, ayahNumber: number) => void;
    onSequenceComplete?: () => void;
    onError?: (message: string) => void;
  } | null = null;

  private ensureMediaSessionInitialized() {
    if (this.mediaSessionInitialized) return;
    this.mediaSessionInitialized = true;
    initLockScreenMediaSession({
      onPlay: () => this.resume(),
      onPause: () => this.pause(),
      onNext: () => {
        void this.nextAyah();
      },
      onPrevious: () => {
        void this.previousAyah();
      },
      onStop: () => this.stopAll(),
      onSeekTo: (timeSec) => this.seekTo(timeSec),
    });
  }

  public getState(): AudioManagerState {
    return {
      ...this.state,
      quranSequence: { ...this.state.quranSequence },
    };
  }

  public getPlaybackClock(): AudioPlaybackClock {
    return { ...this.playbackClock };
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public subscribePlaybackClock(listener: (clock: AudioPlaybackClock) => void): () => void {
    this.clockListeners.add(listener);
    listener(this.getPlaybackClock());
    return () => {
      this.clockListeners.delete(listener);
    };
  }

  private emitPlaybackClock(currentTimeSec: number, durationSec: number) {
    const safeDur = Number.isFinite(durationSec) && durationSec > 0 ? durationSec : 0;
    const safeCur = Number.isFinite(currentTimeSec) && currentTimeSec >= 0 ? currentTimeSec : 0;
    const ratio = safeDur > 0 ? Math.max(0, Math.min(1, safeCur / safeDur)) : 0;
    this.playbackClock = { currentTimeSec: safeCur, durationSec: safeDur, ratio };
    if (safeDur > 0) {
      syncLockScreenPositionState(safeCur, safeDur, this.state.playbackRate);
    }
    this.clockListeners.forEach((cb) => cb(this.playbackClock));
  }

  private stopClockLoop() {
    if (this.clockRafId !== null && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(this.clockRafId);
    }
    this.clockRafId = null;
  }

  private startClockLoop(audio: HTMLAudioElement) {
    this.stopClockLoop();
    const tick = () => {
      if (this.currentAudio !== audio || audio.paused || audio.ended) {
        this.clockRafId = null;
        return;
      }
      this.emitPlaybackClock(audio.currentTime || 0, audio.duration || 0);
      if (typeof requestAnimationFrame === 'function') {
        this.clockRafId = requestAnimationFrame(tick);
      }
    };
    if (typeof requestAnimationFrame === 'function') {
      this.clockRafId = requestAnimationFrame(tick);
    }
  }

  public seekTo(timeSec: number): void {
    if (!this.currentAudio || !Number.isFinite(timeSec)) return;
    try {
      const dur = this.currentAudio.duration;
      const clamped = Number.isFinite(dur) && dur > 0 ? Math.max(0, Math.min(dur, timeSec)) : Math.max(0, timeSec);
      this.currentAudio.currentTime = clamped;
      this.emitPlaybackClock(clamped, Number.isFinite(dur) ? dur : 0);
    } catch {
      // Ignore seek errors on unbuffered streams
    }
  }

  /**
   * Test hook for deterministic sequence verification in Node environments without HTMLAudioElement.
   */
  public setCustomAyahPlaybackDriver(driver: CustomAyahPlaybackDriver | null): void {
    this.customAyahDriver = driver;
  }

  public registerExternalCleanup(cb: CleanupCallback): () => void {
    this.externalCleanups.add(cb);
    return () => {
      this.externalCleanups.delete(cb);
    };
  }

  private syncLockScreenFromState() {
    const { status, quranSequence, activeTrackId } = this.state;
    if (status === 'playing' || status === 'loading' || status === 'paused') {
      this.ensureMediaSessionInitialized();
      const hasQuran = Boolean(quranSequence.surahName && quranSequence.currentAyah);
      const title = hasQuran
        ? `${quranSequence.surahName} · Ayah ${quranSequence.currentAyah}`
        : activeTrackId?.startsWith('adhan_')
        ? 'Ilmizo Daily Adhan'
        : activeTrackId?.startsWith('story')
        ? 'Ilmizo Kids Storybook'
        : 'Ilmizo Audio Recitation';
      const artist = hasQuran ? quranSequence.reciterName : 'Ilmizo Islamic Companion';
      const album = hasQuran
        ? quranSequence.mode === 'ayah_range' && quranSequence.startAyah && quranSequence.endAyah
          ? `Ayahs ${quranSequence.startAyah}–${quranSequence.endAyah} · Ilmizo Quran`
          : `Surah ${quranSequence.surahNumber} · Ilmizo Quran`
        : 'Ilmizo — Learn · Pray · Grow';
      const maxAyah = quranSequence.endAyah ?? 0;
      const minAyah = quranSequence.startAyah ?? 1;
      syncLockScreenMediaMetadata({
        title,
        artist,
        album,
        surahNumber: quranSequence.surahNumber,
        ayahNumber: quranSequence.currentAyah,
        isPlaying: status === 'playing' || status === 'loading',
        isPaused: status === 'paused',
        canNext: Boolean(hasQuran && quranSequence.currentAyah && maxAyah > quranSequence.currentAyah),
        canPrevious: Boolean(hasQuran && quranSequence.currentAyah && quranSequence.currentAyah > minAyah),
      });
    } else {
      clearLockScreenMediaSession();
    }
  }

  private updateState(patch: Partial<AudioManagerState>) {
    this.state = {
      ...this.state,
      ...patch,
      quranSequence: patch.quranSequence
        ? { ...this.state.quranSequence, ...patch.quranSequence }
        : this.state.quranSequence,
    };
    this.syncLockScreenFromState();
    const snapshot = this.getState();
    this.listeners.forEach((listener) => listener(snapshot));
  }

  private stopInternalMediaOnly() {
    this.sessionToken += 1;
    this.stopClockLoop();
    this.emitPlaybackClock(0, 0);

    if (this.customDriverCleanup) {
      try {
        this.customDriverCleanup();
      } catch {
        // Ignore cleanup errors
      }
      this.customDriverCleanup = null;
    }

    if (this.currentAudio) {
      try {
        this.currentAudio.onplaying = null;
        this.currentAudio.onpause = null;
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
        this.currentAudio.onloadstart = null;
        this.currentAudio.ontimeupdate = null;
        this.currentAudio.onloadedmetadata = null;
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.removeAttribute('src');
      } catch {
        // Ignore cleanup errors in headless/test environments
      }
      this.currentAudio = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore speechSynthesis cancel errors
      }
    }
    this.currentUtterance = null;
  }

  /**
   * Immediately stops all active audio playback, Quran sequence loops, speech synthesis,
   * and registered external streams.
   */
  public stopAll(): void {
    this.stopInternalMediaOnly();
    this.activeSequenceOptions = null;

    this.externalCleanups.forEach((cb) => {
      try {
        cb();
      } catch {
        // Ignore cleanup error
      }
    });

    this.updateState({
      status: 'idle',
      activeTrackId: null,
      activeKind: null,
      errorMessage: null,
      quranSequence: {
        ...DEFAULT_QURAN_SEQUENCE_STATE,
        repeatOption: this.state.quranSequence.repeatOption,
        reciterName: this.state.quranSequence.reciterName,
        reciterEditionId: this.state.quranSequence.reciterEditionId,
      },
    });
  }

  public setMuted(muted: boolean): void {
    const nextMuted = Boolean(muted);
    if (nextMuted) {
      this.stopAll();
    }
    this.updateState({
      isMuted: nextMuted,
      ...(nextMuted
        ? {
            status: 'idle',
            activeTrackId: null,
            activeKind: null,
            errorMessage: null,
          }
        : {}),
    });
  }

  public setRepeatEnabled(repeat: boolean): void {
    const nextRepeat = Boolean(repeat);
    if (this.currentAudio) {
      this.currentAudio.loop = false;
    }
    this.updateState({
      repeatEnabled: nextRepeat,
      quranSequence: {
        ...this.state.quranSequence,
        repeatOption: nextRepeat ? 'infinite' : 1,
      },
    });
  }

  public setRepeatOption(option: RepeatCountOption): void {
    const validOptions: RepeatCountOption[] = [1, 2, 5, 10, 'infinite'];
    const safeOption: RepeatCountOption = validOptions.includes(option) ? option : 1;
    this.updateState({
      repeatEnabled: safeOption !== 1,
      quranSequence: {
        ...this.state.quranSequence,
        repeatOption: safeOption,
      },
    });
  }

  public setReciter(reciterName: string): void {
    const cfg = resolveReciterConfig(reciterName);
    this.updateState({
      quranSequence: {
        ...this.state.quranSequence,
        reciterName: cfg.label,
        reciterEditionId: cfg.editionId,
      },
    });
  }

  public setPlaybackRate(rate: number): void {
    const safeRate = Number.isFinite(rate) && rate >= 0.5 && rate <= 2 ? rate : 1;
    if (this.currentAudio) {
      try {
        this.currentAudio.playbackRate = safeRate;
      } catch {
        // Ignore
      }
    }
    this.updateState({ playbackRate: safeRate });
  }

  /**
   * Plays an audio URL (or falls back to speechSynthesis if allowTtsFallback=true) ONLY when explicitly called.
   * Stops any previously playing audio or speech first.
   */
  public playAudioUrl(options: PlayAudioOptions): void {
    const {
      id,
      url,
      fallbackText,
      fallbackLang = 'ar-SA',
      allowTtsFallback = true,
      offlineUnavailableMessage,
      rate = this.state.playbackRate,
      repeat,
      onEnded,
      onError,
    } = options;

    this.lastPlayOptions = options;
    this.lastSpeakOptions = null;

    if (typeof repeat === 'boolean') {
      this.state.repeatEnabled = repeat;
    }

    this.stopInternalMediaOnly();
    const tokenAtStart = this.sessionToken;

    if (this.state.isMuted) {
      const msg = 'App audio is muted. Tap Unmute in the header to listen.';
      this.updateState({
        status: 'idle',
        activeTrackId: null,
        activeKind: null,
        errorMessage: msg,
      });
      onError?.(msg);
      return;
    }

    if (!url) {
      if (allowTtsFallback && fallbackText) {
        this.speakText({
          id,
          text: fallbackText,
          lang: fallbackLang,
          rate,
          repeat: this.state.repeatEnabled,
          onEnded,
          onError,
        });
        return;
      }
      const msg =
        offlineUnavailableMessage ||
        (typeof navigator !== 'undefined' && !navigator.onLine
          ? OFFLINE_QARI_MISSING_MESSAGE
          : 'Audio source is unavailable for this item.');
      this.updateState({
        status: 'error',
        activeTrackId: id,
        activeKind: 'audio',
        errorMessage: msg,
      });
      onError?.(msg);
      return;
    }

    // If a deterministic custom driver is installed (for automated sequence testing)
    if (this.customAyahDriver) {
      const seq = this.state.quranSequence;
      this.updateState({
        status: 'playing',
        activeTrackId: id,
        activeKind: 'audio',
        playbackRate: rate,
        errorMessage: null,
      });

      const cleanup = this.customAyahDriver({
        url,
        surahNumber: seq.surahNumber || 1,
        ayahNumberInSurah: seq.currentAyah || 1,
        repetition: seq.currentRepetition || 1,
        sessionToken: tokenAtStart,
        onComplete: () => {
          if (this.sessionToken !== tokenAtStart) return;
          if (this.state.repeatEnabled && !seq.mode && !this.state.isMuted) {
            this.playAudioUrl(options);
            return;
          }
          this.updateState({
            status: 'idle',
            activeTrackId: null,
            activeKind: null,
            errorMessage: null,
          });
          onEnded?.();
        },
        onFail: (message: string) => {
          if (this.sessionToken !== tokenAtStart) return;
          this.updateState({
            status: 'error',
            activeTrackId: id,
            activeKind: 'audio',
            errorMessage: message,
          });
          onError?.(message);
        },
      });
      if (typeof cleanup === 'function') {
        this.customDriverCleanup = cleanup;
      }
      return;
    }

    try {
      const audio = new Audio(url);
      this.currentAudio = audio;
      audio.preload = 'auto';
      audio.muted = this.state.isMuted;
      audio.playbackRate = rate;

      this.updateState({
        status: 'loading',
        activeTrackId: id,
        activeKind: 'audio',
        playbackRate: rate,
        errorMessage: null,
      });

      audio.onloadedmetadata = () => {
        if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
        this.emitPlaybackClock(audio.currentTime || 0, audio.duration || 0);
      };

      audio.ontimeupdate = () => {
        if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
        this.emitPlaybackClock(audio.currentTime || 0, audio.duration || 0);
      };

      audio.onplaying = () => {
        if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
        this.startClockLoop(audio);
        this.updateState({
          status: 'playing',
          activeTrackId: id,
          activeKind: 'audio',
          errorMessage: null,
        });
      };

      audio.onpause = () => {
        if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
        this.stopClockLoop();
        if (!audio.ended && this.state.status === 'playing') {
          this.updateState({
            status: 'paused',
          });
        }
      };

      audio.onended = () => {
        if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
        this.stopClockLoop();
        this.emitPlaybackClock(0, 0);
        // Single-track repeat only when not inside a structured Quran sequence
        if (this.state.repeatEnabled && !this.state.quranSequence.mode && !this.state.isMuted) {
          audio.currentTime = 0;
          audio.play().catch(() => {
            if (this.sessionToken !== tokenAtStart) return;
            this.updateState({
              status: 'idle',
              activeTrackId: null,
              activeKind: null,
            });
          });
          return;
        }
        this.currentAudio = null;
        this.updateState({
          status: 'idle',
          activeTrackId: null,
          activeKind: null,
          errorMessage: null,
        });
        onEnded?.();
      };

      audio.onerror = () => {
        if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
        this.currentAudio = null;
        if (allowTtsFallback && fallbackText && !this.state.isMuted) {
          this.speakText({
            id,
            text: fallbackText,
            lang: fallbackLang,
            rate: Math.min(1, rate),
            repeat: this.state.repeatEnabled,
            onEnded,
            onError,
          });
          return;
        }
        const msg =
          offlineUnavailableMessage ||
          (typeof navigator !== 'undefined' && !navigator.onLine
            ? OFFLINE_QARI_MISSING_MESSAGE
            : 'Unable to load recitation audio. Check your connection or offline cache.');
        this.updateState({
          status: 'error',
          activeTrackId: id,
          activeKind: 'audio',
          errorMessage: msg,
        });
        onError?.(msg);
      };

      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            if (this.currentAudio === audio && this.sessionToken === tokenAtStart) {
              this.updateState({
                status: 'playing',
                activeTrackId: id,
                activeKind: 'audio',
                errorMessage: null,
              });
            }
          })
          .catch(() => {
            if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
            this.currentAudio = null;
            if (allowTtsFallback && fallbackText && !this.state.isMuted) {
              this.speakText({
                id,
                text: fallbackText,
                lang: fallbackLang,
                rate: Math.min(1, rate),
                repeat: this.state.repeatEnabled,
                onEnded,
                onError,
              });
              return;
            }
            const msg =
              offlineUnavailableMessage ||
              (typeof navigator !== 'undefined' && !navigator.onLine
                ? OFFLINE_QARI_MISSING_MESSAGE
                : 'Audio playback could not start. Tap Play to try again.');
            this.updateState({
              status: 'error',
              activeTrackId: id,
              activeKind: 'audio',
              errorMessage: msg,
            });
            onError?.(msg);
          });
      }
    } catch {
      const msg = 'Audio playback is not supported in this environment.';
      this.updateState({
        status: 'error',
        activeTrackId: id,
        activeKind: 'audio',
        errorMessage: msg,
      });
      onError?.(msg);
    }
  }

  /**
   * Plays a single verified Qari recitation Ayah (Mode 1: Single Ayah Mode).
   * Resolves downloaded offline audio in IndexedDB first, or online stream when online.
   * If offline and not downloaded, shows the exact offline message and NEVER falls back to robotic TTS.
   */
  public async playQariRecitationAyah(params: {
    id: string;
    surahNumber: number;
    ayahNumberInSurah: number;
    globalAyahNumber?: number;
    reciterName?: string;
    rate?: number;
    repeat?: boolean;
    repeatOption?: RepeatCountOption;
    isOnline?: boolean;
    onEnded?: () => void;
    onError?: (message: string) => void;
  }): Promise<{ ok: boolean; source: string; error?: string }> {
    const validation = validateSurahAyahRange(
      params.surahNumber,
      params.ayahNumberInSurah,
      params.ayahNumberInSurah
    );
    if (!validation.valid) {
      const msg = validation.error || 'Invalid Surah or Ayah number.';
      this.stopInternalMediaOnly();
      this.updateState({
        status: 'error',
        activeTrackId: params.id,
        activeKind: 'audio',
        errorMessage: msg,
      });
      params.onError?.(msg);
      return { ok: false, source: 'invalid_range', error: msg };
    }

    const reciterCfg = resolveReciterConfig(
      params.reciterName || this.state.quranSequence.reciterName
    );
    const repeatOpt: RepeatCountOption =
      params.repeatOption ??
      (params.repeat === true
        ? 'infinite'
        : params.repeat === false
        ? 1
        : this.state.quranSequence.repeatOption);

    this.activeSequenceOptions = {
      isOnline: params.isOnline,
      onSequenceComplete: params.onEnded,
      onError: params.onError,
    };

    this.updateState({
      quranSequence: {
        mode: 'single_ayah',
        surahNumber: params.surahNumber,
        surahName: validation.surahName,
        currentAyah: params.ayahNumberInSurah,
        startAyah: params.ayahNumberInSurah,
        endAyah: params.ayahNumberInSurah,
        totalAyahsInRange: 1,
        completedAyahsInPass: 0,
        progressPercent: 0,
        repeatOption: repeatOpt,
        currentRepetition: 1,
        reciterName: reciterCfg.label,
        reciterEditionId: reciterCfg.editionId,
        playbackSource: null,
      },
    });

    return this.playCurrentSequenceStep({
      explicitTrackId: params.id,
      globalAyahNumber: params.globalAyahNumber,
      rate: params.rate,
    });
  }

  /**
   * Mode 2: Full Surah Mode
   * Explicitly plays Ayah 1 -> Ayah 2 -> ... -> Final Ayah of the Surah sequentially.
   * Stops cleanly at the final Ayah (or repeats according to repeatOption if set).
   */
  public async playFullSurah(params: {
    surahNumber: number;
    startFromAyah?: number;
    reciterName?: string;
    rate?: number;
    repeatOption?: RepeatCountOption;
    isOnline?: boolean;
    onAyahChange?: (surahNumber: number, ayahNumber: number) => void;
    onSequenceComplete?: () => void;
    onError?: (message: string) => void;
  }): Promise<{ ok: boolean; source: string; error?: string }> {
    const meta = ALL_114_SURAHS.find((s) => s.number === params.surahNumber);
    if (!meta) {
      const msg = `Invalid Surah number ${params.surahNumber}.`;
      this.stopInternalMediaOnly();
      this.updateState({
        status: 'error',
        errorMessage: msg,
      });
      params.onError?.(msg);
      return { ok: false, source: 'invalid_surah', error: msg };
    }

    const firstAyah =
      params.startFromAyah &&
      params.startFromAyah >= 1 &&
      params.startFromAyah <= meta.ayahCount
        ? params.startFromAyah
        : 1;

    const reciterCfg = resolveReciterConfig(
      params.reciterName || this.state.quranSequence.reciterName
    );
    const repeatOpt: RepeatCountOption =
      params.repeatOption ?? this.state.quranSequence.repeatOption ?? 1;

    this.activeSequenceOptions = {
      isOnline: params.isOnline,
      onAyahChange: params.onAyahChange,
      onSequenceComplete: params.onSequenceComplete,
      onError: params.onError,
    };

    this.updateState({
      quranSequence: {
        mode: 'full_surah',
        surahNumber: meta.number,
        surahName: meta.nameTranslit,
        currentAyah: firstAyah,
        startAyah: 1,
        endAyah: meta.ayahCount,
        totalAyahsInRange: meta.ayahCount,
        completedAyahsInPass: firstAyah - 1,
        progressPercent: Math.round(((firstAyah - 1) / meta.ayahCount) * 100),
        repeatOption: repeatOpt,
        currentRepetition: 1,
        reciterName: reciterCfg.label,
        reciterEditionId: reciterCfg.editionId,
        playbackSource: null,
      },
    });

    params.onAyahChange?.(meta.number, firstAyah);
    return this.playCurrentSequenceStep({ rate: params.rate });
  }

  /**
   * Mode 3: Selected Ayah Range Mode
   * Validates startAyah..endAyah belong to the selected Surah, plays all Ayahs in sequence,
   * and loops according to repeatOption (1, 2, 5, 10, or 'infinite').
   */
  public async playAyahRange(params: {
    surahNumber: number;
    startAyah: number;
    endAyah: number;
    reciterName?: string;
    rate?: number;
    repeatOption?: RepeatCountOption;
    isOnline?: boolean;
    onAyahChange?: (surahNumber: number, ayahNumber: number) => void;
    onSequenceComplete?: () => void;
    onError?: (message: string) => void;
  }): Promise<{ ok: boolean; source: string; error?: string }> {
    const validation = validateSurahAyahRange(
      params.surahNumber,
      params.startAyah,
      params.endAyah
    );
    if (!validation.valid) {
      const msg = validation.error || 'Invalid Ayah range.';
      this.stopInternalMediaOnly();
      this.updateState({
        status: 'error',
        errorMessage: msg,
      });
      params.onError?.(msg);
      return { ok: false, source: 'invalid_range', error: msg };
    }

    const reciterCfg = resolveReciterConfig(
      params.reciterName || this.state.quranSequence.reciterName
    );
    const repeatOpt: RepeatCountOption =
      params.repeatOption ?? this.state.quranSequence.repeatOption ?? 1;
    const totalInRange = validation.endAyah - validation.startAyah + 1;

    this.activeSequenceOptions = {
      isOnline: params.isOnline,
      onAyahChange: params.onAyahChange,
      onSequenceComplete: params.onSequenceComplete,
      onError: params.onError,
    };

    this.updateState({
      quranSequence: {
        mode: 'ayah_range',
        surahNumber: params.surahNumber,
        surahName: validation.surahName,
        currentAyah: validation.startAyah,
        startAyah: validation.startAyah,
        endAyah: validation.endAyah,
        totalAyahsInRange: totalInRange,
        completedAyahsInPass: 0,
        progressPercent: 0,
        repeatOption: repeatOpt,
        currentRepetition: 1,
        reciterName: reciterCfg.label,
        reciterEditionId: reciterCfg.editionId,
        playbackSource: null,
      },
    });

    params.onAyahChange?.(params.surahNumber, validation.startAyah);
    return this.playCurrentSequenceStep({ rate: params.rate });
  }

  /**
   * Advances to the next Ayah in the current Surah or range when user presses Next Ayah.
   */
  public async nextAyah(): Promise<{ ok: boolean; currentAyah: number | null; error?: string }> {
    const seq = this.state.quranSequence;
    if (!seq.surahNumber || !seq.currentAyah) {
      return { ok: false, currentAyah: null, error: 'No active Quran Surah selected.' };
    }
    const meta = ALL_114_SURAHS.find((s) => s.number === seq.surahNumber);
    if (!meta) {
      return { ok: false, currentAyah: null, error: 'Invalid Surah.' };
    }
    const maxAyah = seq.endAyah && seq.mode === 'ayah_range' ? seq.endAyah : meta.ayahCount;
    const minAyah = seq.startAyah && seq.mode === 'ayah_range' ? seq.startAyah : 1;

    if (seq.currentAyah >= maxAyah) {
      return {
        ok: false,
        currentAyah: seq.currentAyah,
        error: `Already at the last Ayah (${maxAyah}) of the current selection.`,
      };
    }

    const nextAyahNum = seq.currentAyah + 1;
    const totalInRange = Math.max(1, maxAyah - minAyah + 1);
    const completedInPass = Math.max(0, nextAyahNum - minAyah);

    this.updateState({
      quranSequence: {
        ...seq,
        mode: seq.mode || 'single_ayah',
        currentAyah: nextAyahNum,
        completedAyahsInPass: completedInPass,
        progressPercent: Math.round((completedInPass / totalInRange) * 100),
      },
    });

    this.activeSequenceOptions?.onAyahChange?.(seq.surahNumber, nextAyahNum);
    const res = await this.playCurrentSequenceStep({});
    return { ok: res.ok, currentAyah: nextAyahNum, error: res.error };
  }

  /**
   * Moves to the previous Ayah in the current Surah or range when user presses Previous Ayah.
   */
  public async previousAyah(): Promise<{ ok: boolean; currentAyah: number | null; error?: string }> {
    const seq = this.state.quranSequence;
    if (!seq.surahNumber || !seq.currentAyah) {
      return { ok: false, currentAyah: null, error: 'No active Quran Surah selected.' };
    }
    const meta = ALL_114_SURAHS.find((s) => s.number === seq.surahNumber);
    if (!meta) {
      return { ok: false, currentAyah: null, error: 'Invalid Surah.' };
    }
    const maxAyah = seq.endAyah && seq.mode === 'ayah_range' ? seq.endAyah : meta.ayahCount;
    const minAyah = seq.startAyah && seq.mode === 'ayah_range' ? seq.startAyah : 1;

    if (seq.currentAyah <= minAyah) {
      return {
        ok: false,
        currentAyah: seq.currentAyah,
        error: `Already at the first Ayah (${minAyah}) of the current selection.`,
      };
    }

    const prevAyahNum = seq.currentAyah - 1;
    const totalInRange = Math.max(1, maxAyah - minAyah + 1);
    const completedInPass = Math.max(0, prevAyahNum - minAyah);

    this.updateState({
      quranSequence: {
        ...seq,
        mode: seq.mode || 'single_ayah',
        currentAyah: prevAyahNum,
        completedAyahsInPass: completedInPass,
        progressPercent: Math.round((completedInPass / totalInRange) * 100),
      },
    });

    this.activeSequenceOptions?.onAyahChange?.(seq.surahNumber, prevAyahNum);
    const res = await this.playCurrentSequenceStep({});
    return { ok: res.ok, currentAyah: prevAyahNum, error: res.error };
  }

  private async playCurrentSequenceStep(params: {
    explicitTrackId?: string;
    globalAyahNumber?: number;
    rate?: number;
  }): Promise<{ ok: boolean; source: string; error?: string }> {
    const seq = this.state.quranSequence;
    if (!seq.surahNumber || !seq.currentAyah) {
      return { ok: false, source: 'none', error: 'No active Surah or Ayah selected.' };
    }

    const stepSessionToken = this.sessionToken + 1;
    const trackId =
      params.explicitTrackId || `quran-${seq.surahNumber}-${seq.currentAyah}`;

    const resolved = await resolveQariAyahAudioSource({
      surahNumber: seq.surahNumber,
      ayahNumberInSurah: seq.currentAyah,
      globalAyahNumber: params.globalAyahNumber,
      reciterName: seq.reciterName,
      isOnline: this.activeSequenceOptions?.isOnline,
    });

    // Guard against cancellation/navigation while async resolution was in flight
    if (this.sessionToken >= stepSessionToken) {
      return { ok: false, source: 'cancelled', error: 'Playback superseded by newer action.' };
    }

    if (!resolved.available || !resolved.url) {
      const msg = resolved.errorMessage || OFFLINE_QARI_MISSING_MESSAGE;
      this.stopInternalMediaOnly();
      this.updateState({
        status: 'error',
        activeTrackId: trackId,
        activeKind: 'audio',
        errorMessage: msg,
        quranSequence: {
          ...this.state.quranSequence,
          playbackSource: null,
        },
      });
      this.activeSequenceOptions?.onError?.(msg);
      return {
        ok: false,
        source: resolved.source,
        error: msg,
      };
    }

    this.updateState({
      quranSequence: {
        ...this.state.quranSequence,
        playbackSource:
          resolved.source === 'offline_downloaded' ? 'offline_downloaded' : 'online_stream',
      },
    });

    this.playAudioUrl({
      id: trackId,
      url: resolved.url,
      allowTtsFallback: false,
      offlineUnavailableMessage: OFFLINE_QARI_MISSING_MESSAGE,
      rate: params.rate ?? this.state.playbackRate,
      repeat: false, // Sequence engine manages all repetitions & transitions
      onEnded: () => {
        this.handleSequenceAyahEnded();
      },
      onError: (errMsg) => {
        this.activeSequenceOptions?.onError?.(errMsg);
      },
    });

    return {
      ok: true,
      source: resolved.source,
    };
  }

  private handleSequenceAyahEnded(): void {
    const seq = this.state.quranSequence;
    if (!seq.mode || !seq.surahNumber || !seq.currentAyah) {
      return;
    }

    const startAyah = seq.startAyah ?? seq.currentAyah;
    const endAyah = seq.endAyah ?? seq.currentAyah;
    const totalInRange = Math.max(1, endAyah - startAyah + 1);

    // 1. If there are more Ayahs remaining in the current pass (Full Surah or Ayah Range)
    if (seq.currentAyah < endAyah && (seq.mode === 'full_surah' || seq.mode === 'ayah_range')) {
      const nextAyahNum = seq.currentAyah + 1;
      const completedInPass = nextAyahNum - startAyah;
      this.updateState({
        quranSequence: {
          ...seq,
          currentAyah: nextAyahNum,
          completedAyahsInPass: completedInPass,
          progressPercent: Math.round((completedInPass / totalInRange) * 100),
        },
      });
      this.activeSequenceOptions?.onAyahChange?.(seq.surahNumber, nextAyahNum);
      void this.playCurrentSequenceStep({});
      return;
    }

    // 2. Reached the end of the pass (single Ayah finished, or endAyah reached).
    // Check if more repetitions are configured.
    const shouldRepeatAgain =
      seq.repeatOption === 'infinite' ||
      (typeof seq.repeatOption === 'number' && seq.currentRepetition < seq.repeatOption);

    if (shouldRepeatAgain && !this.state.isMuted) {
      const nextRep = seq.currentRepetition + 1;
      this.updateState({
        quranSequence: {
          ...seq,
          currentAyah: startAyah,
          completedAyahsInPass: 0,
          progressPercent: 0,
          currentRepetition: nextRep,
        },
      });
      this.activeSequenceOptions?.onAyahChange?.(seq.surahNumber, startAyah);
      void this.playCurrentSequenceStep({});
      return;
    }

    // 3. Sequence and all repetitions completed -> stop cleanly at the end
    const completionCb = this.activeSequenceOptions?.onSequenceComplete;
    this.activeSequenceOptions = null;
    this.updateState({
      status: 'idle',
      activeTrackId: null,
      activeKind: null,
      errorMessage: null,
      quranSequence: {
        ...seq,
        mode: null,
        completedAyahsInPass: totalInRange,
        progressPercent: 100,
      },
    });
    completionCb?.();
  }

  /**
   * Speaks text via Web Speech synthesis ONLY when explicitly called by a user tap.
   * Stops any existing audio or speech first and respects global mute.
   */
  public speakText(options: SpeakTextOptions): void {
    const {
      id,
      text,
      lang = 'en-US',
      rate = 0.92,
      pitch = 1.0,
      repeat,
      onEnded,
      onError,
    } = options;

    this.lastSpeakOptions = options;
    this.lastPlayOptions = null;

    if (typeof repeat === 'boolean') {
      this.state.repeatEnabled = repeat;
    }

    this.stopInternalMediaOnly();
    const tokenAtStart = this.sessionToken;

    if (this.state.isMuted) {
      const msg = 'App audio is muted. Tap Unmute in the header to listen.';
      this.updateState({
        status: 'idle',
        activeTrackId: null,
        activeKind: null,
        errorMessage: msg,
      });
      onError?.(msg);
      return;
    }

    if (
      typeof window === 'undefined' ||
      !('speechSynthesis' in window) ||
      typeof SpeechSynthesisUtterance === 'undefined'
    ) {
      const msg = 'Read Aloud voice synthesis is not supported on this browser.';
      this.updateState({
        status: 'error',
        activeTrackId: id,
        activeKind: 'speech',
        errorMessage: msg,
      });
      onError?.(msg);
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;

      if (typeof window.speechSynthesis.getVoices === 'function') {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const baseLang = lang.toLowerCase().split('-')[0];
          const matching = voices.filter((v) =>
            v.lang?.toLowerCase().startsWith(baseLang)
          );
          const ranked =
            matching.find((v) =>
              /natural|neural|online|google|siri|enhanced|premium/i.test(v.name)
            ) ||
            matching.find((v) => !/espeak|robot/i.test(v.name)) ||
            matching[0];
          if (ranked) {
            utterance.voice = ranked;
          }
        }
      }

      this.currentUtterance = utterance;

      this.updateState({
        status: 'playing',
        activeTrackId: id,
        activeKind: 'speech',
        errorMessage: null,
      });

      utterance.onend = () => {
        if (this.currentUtterance !== utterance || this.sessionToken !== tokenAtStart) return;
        if (this.state.repeatEnabled && !this.state.isMuted) {
          this.speakText(options);
          return;
        }
        this.currentUtterance = null;
        this.updateState({
          status: 'idle',
          activeTrackId: null,
          activeKind: null,
          errorMessage: null,
        });
        onEnded?.();
      };

      utterance.onerror = () => {
        if (this.currentUtterance !== utterance || this.sessionToken !== tokenAtStart) return;
        this.currentUtterance = null;
        this.updateState({
          status: 'idle',
          activeTrackId: null,
          activeKind: null,
        });
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      const msg = 'Unable to start speech synthesis.';
      this.updateState({
        status: 'error',
        activeTrackId: id,
        activeKind: 'speech',
        errorMessage: msg,
      });
      onError?.(msg);
    }
  }

  public pause(): void {
    if (this.state.activeKind === 'audio') {
      if (this.currentAudio) {
        try {
          this.currentAudio.pause();
        } catch {
          // Ignore
        }
      }
      this.updateState({ status: 'paused' });
      return;
    }

    if (
      this.state.activeKind === 'speech' &&
      typeof window !== 'undefined' &&
      'speechSynthesis' in window
    ) {
      try {
        window.speechSynthesis.pause();
        this.updateState({ status: 'paused' });
      } catch {
        this.stopAll();
      }
    }
  }

  public resume(): void {
    if (this.state.isMuted) {
      return;
    }

    if (this.state.activeKind === 'audio' && this.state.status === 'paused') {
      if (this.currentAudio) {
        const audio = this.currentAudio;
        this.updateState({ status: 'playing', errorMessage: null });
        const p = audio.play();
        if (p && typeof p.catch === 'function') {
          p.catch(() => {
            this.updateState({ status: 'paused' });
          });
        }
      } else {
        this.updateState({ status: 'playing', errorMessage: null });
      }
      return;
    }

    if (
      this.state.activeKind === 'speech' &&
      this.state.status === 'paused' &&
      typeof window !== 'undefined' &&
      'speechSynthesis' in window
    ) {
      try {
        window.speechSynthesis.resume();
        this.updateState({ status: 'playing', errorMessage: null });
      } catch {
        if (this.lastSpeakOptions) {
          this.speakText(this.lastSpeakOptions);
        }
      }
      return;
    }

    // If idle and we have last options, replay explicitly
    if (this.lastPlayOptions) {
      this.playAudioUrl(this.lastPlayOptions);
    } else if (this.lastSpeakOptions) {
      this.speakText(this.lastSpeakOptions);
    }
  }
}

export const audioManager = new CentralizedAudioManager();

export function useAudioManager() {
  const [state, setState] = useState<AudioManagerState>(() => audioManager.getState());

  useEffect(() => {
    return audioManager.subscribe(setState);
  }, []);

  return {
    ...state,
    playAudioUrl: (opts: PlayAudioOptions) => audioManager.playAudioUrl(opts),
    playQariRecitationAyah: (opts: Parameters<typeof audioManager.playQariRecitationAyah>[0]) =>
      audioManager.playQariRecitationAyah(opts),
    playFullSurah: (opts: Parameters<typeof audioManager.playFullSurah>[0]) =>
      audioManager.playFullSurah(opts),
    playAyahRange: (opts: Parameters<typeof audioManager.playAyahRange>[0]) =>
      audioManager.playAyahRange(opts),
    nextAyah: () => audioManager.nextAyah(),
    previousAyah: () => audioManager.previousAyah(),
    speakText: (opts: SpeakTextOptions) => audioManager.speakText(opts),
    pause: () => audioManager.pause(),
    resume: () => audioManager.resume(),
    stopAll: () => audioManager.stopAll(),
    setMuted: (muted: boolean) => audioManager.setMuted(muted),
    setRepeatEnabled: (repeat: boolean) => audioManager.setRepeatEnabled(repeat),
    setRepeatOption: (opt: RepeatCountOption) => audioManager.setRepeatOption(opt),
    setReciter: (reciter: string) => audioManager.setReciter(reciter),
    setPlaybackRate: (rate: number) => audioManager.setPlaybackRate(rate),
    seekTo: (timeSec: number) => audioManager.seekTo(timeSec),
  };
}

/**
 * Isolated real-time playback clock hook (currentTimeSec, durationSec, ratio 0..1)
 * driving smooth Word-by-Word live recitation highlighting without re-rendering unrelated UI.
 */
export function useAudioPlaybackClock(): AudioPlaybackClock {
  const [clock, setClock] = useState<AudioPlaybackClock>(() => audioManager.getPlaybackClock());

  useEffect(() => {
    return audioManager.subscribePlaybackClock(setClock);
  }, []);

  return clock;
}
