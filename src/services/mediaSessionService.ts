import { Capacitor, registerPlugin } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';

export interface MediaSessionTrackInfo {
  title: string;
  artist: string;
  album: string;
  surahNumber?: number | null;
  ayahNumber?: number | null;
  isPlaying: boolean;
  isPaused?: boolean;
  canNext?: boolean;
  canPrevious?: boolean;
}

export interface MediaSessionActionCallbacks {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onStop: () => void;
  onSeekTo?: (seekTimeSec: number) => void;
}

interface IlmizoMediaSessionNativePlugin {
  updatePlayback(options: {
    title: string;
    artist: string;
    album: string;
    isPlaying: boolean;
    canNext: boolean;
    canPrevious: boolean;
  }): Promise<{ active: boolean }>;
  stopPlayback(): Promise<{ active: boolean }>;
  addListener(
    eventName: 'mediaAction',
    listenerFunc: (event: { action: 'play' | 'pause' | 'next' | 'previous' | 'stop' }) => void
  ): Promise<PluginListenerHandle>;
}

const IlmizoMediaSessionNative = registerPlugin<IlmizoMediaSessionNativePlugin>(
  'IlmizoMediaSession'
);

let registeredCallbacks: MediaSessionActionCallbacks | null = null;
let nativeListenerAttached = false;

function isNativeAndroid(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof Capacitor?.isNativePlatform === 'function' &&
    Capacitor.isNativePlatform() &&
    typeof Capacitor?.getPlatform === 'function' &&
    Capacitor.getPlatform() === 'android'
  );
}

/**
 * Registers Web MediaSession API lock-screen controls (iOS Safari, Android Chrome, Desktop PWA)
 * AND bridges Native Android Media Playback Foreground Service button intents back to audioManager.
 */
export function initLockScreenMediaSession(callbacks: MediaSessionActionCallbacks): void {
  registeredCallbacks = callbacks;

  if (typeof navigator !== 'undefined' && 'mediaSession' in navigator && navigator.mediaSession) {
    const ms = navigator.mediaSession;
    const safeSetHandler = (
      action: MediaSessionAction,
      handler: MediaSessionActionHandler | null
    ) => {
      try {
        ms.setActionHandler(action, handler);
      } catch {
        // Some browsers do not support every MediaSessionAction
      }
    };

    safeSetHandler('play', () => registeredCallbacks?.onPlay());
    safeSetHandler('pause', () => registeredCallbacks?.onPause());
    safeSetHandler('nexttrack', () => registeredCallbacks?.onNext());
    safeSetHandler('previoustrack', () => registeredCallbacks?.onPrevious());
    safeSetHandler('stop', () => registeredCallbacks?.onStop());
    safeSetHandler('seekto', (details) => {
      if (typeof details?.seekTime === 'number') {
        registeredCallbacks?.onSeekTo?.(details.seekTime);
      }
    });
  }

  if (isNativeAndroid() && !nativeListenerAttached) {
    nativeListenerAttached = true;
    void IlmizoMediaSessionNative.addListener('mediaAction', (event) => {
      const action = event?.action;
      if (action === 'play') registeredCallbacks?.onPlay();
      else if (action === 'pause') registeredCallbacks?.onPause();
      else if (action === 'next') registeredCallbacks?.onNext();
      else if (action === 'previous') registeredCallbacks?.onPrevious();
      else if (action === 'stop') registeredCallbacks?.onStop();
    }).catch(() => {
      nativeListenerAttached = false;
    });
  }
}

/**
 * Pushes current Surah/Ayah or Story metadata & play/pause state to:
 * 1) Browser/OS Lock-Screen MediaSession API
 * 2) Native Android Media Foreground Service (when running inside the Capacitor APK)
 */
export function syncLockScreenMediaMetadata(info: MediaSessionTrackInfo): void {
  if (typeof navigator !== 'undefined' && 'mediaSession' in navigator && navigator.mediaSession) {
    try {
      if (typeof MediaMetadata !== 'undefined') {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: info.title,
          artist: info.artist,
          album: info.album,
          artwork: [
            { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          ],
        });
      }
      navigator.mediaSession.playbackState = info.isPlaying
        ? 'playing'
        : info.isPaused
        ? 'paused'
        : 'none';
    } catch {
      // Ignore restricted MediaSession environments
    }
  }

  if (isNativeAndroid()) {
    void IlmizoMediaSessionNative.updatePlayback({
      title: info.title,
      artist: info.artist,
      album: info.album,
      isPlaying: info.isPlaying,
      canNext: Boolean(info.canNext),
      canPrevious: Boolean(info.canPrevious),
    }).catch(() => {
      // Ignore if native plugin is unavailable
    });
  }
}

/**
 * Updates lock-screen scrubber position state safely from live HTMLAudioElement time/duration.
 */
export function syncLockScreenPositionState(
  currentTimeSec: number,
  durationSec: number,
  playbackRate = 1
): void {
  if (
    typeof navigator === 'undefined' ||
    !('mediaSession' in navigator) ||
    !navigator.mediaSession ||
    typeof navigator.mediaSession.setPositionState !== 'function'
  ) {
    return;
  }
  if (!Number.isFinite(durationSec) || durationSec <= 0) return;
  const safePosition = Math.max(0, Math.min(durationSec, Number.isFinite(currentTimeSec) ? currentTimeSec : 0));
  const safeRate = Number.isFinite(playbackRate) && playbackRate > 0 ? playbackRate : 1;

  try {
    navigator.mediaSession.setPositionState({
      duration: durationSec,
      playbackRate: safeRate,
      position: safePosition,
    });
  } catch {
    // Ignore invalid position state errors on older WebKit builds
  }
}

/**
 * Clears lock-screen controls and stops the Native Android Foreground Media Service when playback stops.
 */
export function clearLockScreenMediaSession(): void {
  if (typeof navigator !== 'undefined' && 'mediaSession' in navigator && navigator.mediaSession) {
    try {
      navigator.mediaSession.playbackState = 'none';
      navigator.mediaSession.metadata = null;
    } catch {
      // Ignore
    }
  }

  if (isNativeAndroid()) {
    void IlmizoMediaSessionNative.stopPlayback().catch(() => {
      // Ignore
    });
  }
}
