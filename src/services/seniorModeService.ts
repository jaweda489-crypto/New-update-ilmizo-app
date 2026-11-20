import { useCallback, useEffect, useState } from 'react';

/**
 * Senior / Minimal Mode Service (Local-First)
 *
 * Designed for elders, parents, and users who prefer a calm, ultra-readable,
 * distraction-free 4-tile daily worship home screen with oversized 76px+ buttons
 * (Read Quran, Prayer Times, Daily Duas, Tasbih Counter).
 */

const STORAGE_KEY = 'ilmizo_senior_minimal_mode_v1';
const SYNC_EVENT = 'ilmizo:senior-mode-updated';

export function loadSeniorMinimalMode(): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveSeniorMinimalMode(enabled: boolean): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(SYNC_EVENT));
    }
  } catch {
    // ignore
  }
}

export function useSeniorMinimalMode(): [boolean, (enabled: boolean) => void] {
  const [enabled, setEnabledState] = useState<boolean>(() => loadSeniorMinimalMode());

  useEffect(() => {
    const sync = () => setEnabledState(loadSeniorMinimalMode());
    window.addEventListener(SYNC_EVENT, sync);
    return () => window.removeEventListener(SYNC_EVENT, sync);
  }, []);

  const setEnabled = useCallback((next: boolean) => {
    saveSeniorMinimalMode(next);
    setEnabledState(next);
  }, []);

  return [enabled, setEnabled];
}
