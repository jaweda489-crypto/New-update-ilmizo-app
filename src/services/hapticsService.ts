import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

const HAPTICS_PREF_KEY = 'ilmizo_haptics_enabled_v1';

export function isHapticsEnabled(): boolean {
  if (typeof localStorage === 'undefined') return true;
  try {
    const raw = localStorage.getItem(HAPTICS_PREF_KEY);
    if (raw === null) return true;
    return raw === 'true';
  } catch {
    return true;
  }
}

export function setHapticsEnabled(enabled: boolean): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(HAPTICS_PREF_KEY, enabled ? 'true' : 'false');
  } catch {
    // Ignore storage quota errors
  }
}

function canRunNativeHaptics(): boolean {
  if (!isHapticsEnabled()) return false;
  if (typeof window === 'undefined') return false;
  try {
    return typeof Capacitor?.isNativePlatform === 'function' && Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

export async function triggerSelectionHaptic(): Promise<void> {
  if (!canRunNativeHaptics()) return;
  try {
    await Haptics.selectionChanged();
  } catch {
    // Graceful no-op when hardware or plugin unavailable
  }
}

export async function triggerLightHaptic(): Promise<void> {
  if (!canRunNativeHaptics()) return;
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    // Graceful no-op
  }
}

/**
 * Subtle tactile pulse when Quran recitation transitions to the next Ayah
 * (used across both Adult and Kids Quran views via useQuranAudioSync).
 */
export async function triggerVerseTransitionHaptic(): Promise<void> {
  if (!canRunNativeHaptics()) return;
  try {
    await Haptics.selectionChanged();
  } catch {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
      // Graceful no-op when hardware or plugin unavailable
    }
  }
}

export async function triggerSuccessHaptic(): Promise<void> {
  if (!canRunNativeHaptics()) return;
  try {
    await Haptics.notification({ type: NotificationType.Success });
  } catch {
    // Graceful no-op
  }
}

export async function triggerWarningHaptic(): Promise<void> {
  if (!canRunNativeHaptics()) return;
  try {
    await Haptics.notification({ type: NotificationType.Warning });
  } catch {
    // Graceful no-op
  }
}
