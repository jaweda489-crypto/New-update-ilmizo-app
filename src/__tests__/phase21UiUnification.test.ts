import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  THEME_MODE_STORAGE_KEY,
  isValidThemeMode,
  loadThemeMode,
  resolveThemeMode,
  saveThemeMode,
} from '../services/themeService';

const WORKSPACE_ROOT = process.cwd();

function readProjectFile(relativePath: string): string {
  return fs.readFileSync(path.join(WORKSPACE_ROOT, relativePath), 'utf8');
}

function createMockLocalStorage() {
  const store = new Map<string, string>();
  return {
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
    removeItem(key: string) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
}

test('Phase 21: themeService validates and resolves light, dark, and system modes accurately', () => {
  assert.equal(isValidThemeMode('light'), true);
  assert.equal(isValidThemeMode('dark'), true);
  assert.equal(isValidThemeMode('system'), true);
  assert.equal(isValidThemeMode('amoled'), false);
  assert.equal(isValidThemeMode(null), false);

  assert.equal(resolveThemeMode('light', true), 'light');
  assert.equal(resolveThemeMode('light', false), 'light');
  assert.equal(resolveThemeMode('dark', true), 'dark');
  assert.equal(resolveThemeMode('dark', false), 'dark');
  assert.equal(resolveThemeMode('system', true), 'dark');
  assert.equal(resolveThemeMode('system', false), 'light');
});

test('Phase 21: themeService persists mode locally and respects legacy darkMode fallback', () => {
  const originalStorage = (globalThis as Record<string, unknown>).localStorage;
  const mockStorage = createMockLocalStorage();
  Object.defineProperty(globalThis, 'localStorage', {
    value: mockStorage,
    configurable: true,
    writable: true,
  });

  try {
    assert.equal(loadThemeMode(false), 'light');
    assert.equal(loadThemeMode(true), 'dark');

    saveThemeMode('system');
    assert.equal(mockStorage.getItem(THEME_MODE_STORAGE_KEY), 'system');
    assert.equal(loadThemeMode(false), 'system');

    saveThemeMode('dark');
    assert.equal(loadThemeMode(false), 'dark');

    saveThemeMode('light');
    assert.equal(loadThemeMode(true), 'light');
  } finally {
    if (originalStorage === undefined) {
      delete (globalThis as Record<string, unknown>).localStorage;
    } else {
      Object.defineProperty(globalThis, 'localStorage', {
        value: originalStorage,
        configurable: true,
        writable: true,
      });
    }
  }
});

test('Phase 21: index.css defines Tailwind v4 class-based dark variant and semantic CSS tokens', () => {
  const css = readProjectFile('src/index.css');
  assert.match(css, /@custom-variant\s+dark\s+\(&:where\(\.dark,\s*\.dark \*\)\);/);
  assert.match(css, /:root\s*\{/);
  assert.match(css, /\.dark\s*\{/);
  for (const token of [
    '--bg-app',
    '--bg-surface',
    '--bg-elevated',
    '--bg-subtle',
    '--bg-input',
    '--bg-sheet',
    '--text-primary',
    '--text-secondary',
    '--text-muted',
    '--border-subtle',
    '--border-strong',
    '--divider',
    '--focus-ring',
  ]) {
    assert.ok(css.includes(token), `Missing semantic CSS token: ${token}`);
  }
  assert.ok(css.includes('.ilmizo-input'), 'Missing .ilmizo-input utility class');
});

test('Phase 21: index.html includes synchronous anti-flicker dark mode boot script', () => {
  const html = readProjectFile('index.html');
  assert.ok(
    html.includes(THEME_MODE_STORAGE_KEY),
    'index.html boot script must read ilmizo_theme_mode_v1 before first paint'
  );
  assert.ok(
    html.includes("classList.toggle('dark'") || html.includes('classList.add'),
    'index.html boot script must toggle .dark class synchronously'
  );
  assert.ok(
    html.includes('bg-[var(--bg-app)]'),
    'index.html body must use semantic var(--bg-app) surface'
  );
});

test('Phase 21: unified design-system primitives, BottomSheet, and micro-interactions exist and export cleanly', () => {
  const sheetSrc = readProjectFile('src/components/sheets/BottomSheet.tsx');
  assert.ok(sheetSrc.includes('export const BottomSheet'));
  assert.ok(sheetSrc.includes('role="dialog"'));
  assert.ok(sheetSrc.includes('aria-modal="true"'));

  const primitivesSrc = readProjectFile('src/components/design-system/IlmizoPrimitives.tsx');
  for (const name of [
    'AppScreen',
    'ScreenHeader',
    'SectionHeader',
    'ContentCard',
    'InfoDisclosure',
    'EmptyState',
    'LoadingState',
    'ErrorState',
    'ThemeModeSegmentedControl',
  ]) {
    assert.ok(
      primitivesSrc.includes(`export const ${name}`),
      `Missing exported primitive: ${name}`
    );
  }

  const feedbackSrc = readProjectFile('src/components/feedback/AdultMicroInteractions.tsx');
  for (const name of ['SalahStatusButton', 'TasbihTapRing', 'BookmarkPopButton']) {
    assert.ok(
      feedbackSrc.includes(`export const ${name}`),
      `Missing exported micro-interaction: ${name}`
    );
  }
});

test('Phase 21: zero raw light-only page canvases (bg-[#FDFBF7]) remain across all screens and modals', () => {
  const filesToAudit = [
    'src/App.tsx',
    'src/components/adult/AdultModeView.tsx',
    'src/components/adult/AdultExtraScreens.tsx',
    'src/components/adult/Phase7To11Widgets.tsx',
    'src/components/adult/QuranMushafView.tsx',
    'src/components/parent/ParentHubView.tsx',
    'src/components/kids/KidsWorldView.tsx',
    'src/components/kids/DailyTarbiyahPlanCard.tsx',
    'src/components/kids/NooraniQaidaCourseView.tsx',
    'src/components/kids/QaidaLetterTracingCanvas.tsx',
    'src/components/shared/FamilyPlusPaywallModal.tsx',
    'src/components/shared/FirstRunOnboardingModal.tsx',
    'src/components/shared/LivingMascot.tsx',
    'src/components/pwa/PWAComponents.tsx',
    'src/components/pwa/LocalDataManagerCard.tsx',
  ];

  for (const relPath of filesToAudit) {
    const content = readProjectFile(relPath);
    assert.equal(
      content.includes('bg-[#FDFBF7]'),
      false,
      `${relPath} still contains hardcoded bg-[#FDFBF7] light-only canvas`
    );
  }
});

test('Phase 21: Adult inner screens wire BottomSheet, InfoDisclosure, ThemeModeSegmentedControl, micro-interactions, and declutter duplicate More grid', () => {
  const adultExtra = readProjectFile('src/components/adult/AdultExtraScreens.tsx');
  assert.ok(adultExtra.includes('BottomSheet'), 'AdultExtraScreens must use BottomSheet');
  assert.ok(adultExtra.includes('InfoDisclosure'), 'AdultExtraScreens must use InfoDisclosure');
  assert.ok(
    adultExtra.includes('ThemeModeSegmentedControl'),
    'AdultExtraScreens Settings must render ThemeModeSegmentedControl'
  );
  assert.ok(adultExtra.includes('TasbihTapRing'), 'Tasbih screen must use TasbihTapRing');
  assert.equal(
    adultExtra.includes('All Ilmizo Modules & Tools'),
    false,
    'AdultMoreSettingsScreen must not duplicate the Explore grid'
  );

  const adultMode = readProjectFile('src/components/adult/AdultModeView.tsx');
  assert.ok(adultMode.includes('SalahStatusButton'), 'Salah Tracker must use SalahStatusButton');
  assert.ok(adultMode.includes('BookmarkPopButton'), 'Quran Reader must use BookmarkPopButton');

  const parentHub = readProjectFile('src/components/parent/ParentHubView.tsx');
  assert.ok(
    parentHub.includes('InfoDisclosure'),
    'ParentHubView must collapse technical PIN security notice into InfoDisclosure'
  );
});
