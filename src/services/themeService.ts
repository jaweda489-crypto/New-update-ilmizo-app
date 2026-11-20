import { ThemeMode } from '../types/ilmizo';

export type ResolvedTheme = 'light' | 'dark';

export const THEME_MODE_STORAGE_KEY = 'ilmizo_theme_mode_v1';

export function isValidThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export function loadThemeMode(legacyDarkMode?: boolean): ThemeMode {
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = localStorage.getItem(THEME_MODE_STORAGE_KEY);
      if (isValidThemeMode(stored)) {
        return stored;
      }
    } catch {
      // Ignore storage read errors
    }
  }
  if (legacyDarkMode === true) return 'dark';
  return 'light';
}

export function saveThemeMode(mode: ThemeMode): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
  } catch {
    // Ignore storage quota errors
  }
}

export function resolveThemeMode(
  mode: ThemeMode,
  systemPrefersDark: boolean = getSystemPrefersDark()
): ResolvedTheme {
  if (mode === 'dark') return 'dark';
  if (mode === 'light') return 'light';
  return systemPrefersDark ? 'dark' : 'light';
}

export function applyThemeToDocument(
  mode: ThemeMode,
  systemPrefersDark: boolean = getSystemPrefersDark()
): ResolvedTheme {
  const resolved = resolveThemeMode(mode, systemPrefersDark);
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.classList.toggle('dark', resolved === 'dark');
    root.setAttribute('data-theme', resolved);
    root.style.colorScheme = resolved;

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', resolved === 'dark' ? '#071610' : '#0F3826');
    }
  }
  return resolved;
}

export function subscribeSystemThemeChanges(
  onChange: (prefersDark: boolean) => void
): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {};
  }
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (event: MediaQueryListEvent) => {
    onChange(event.matches);
  };
  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }
  return () => {};
}
