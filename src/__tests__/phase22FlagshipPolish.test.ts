import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { KIDS_STORIES } from '../data/islamicContent';
import { audioManager } from '../services/audioManager';

const WORKSPACE_ROOT = process.cwd();

function readProjectFile(relativePath: string): string {
  return fs.readFileSync(path.join(WORKSPACE_ROOT, relativePath), 'utf8');
}

function listFilesRecursive(dirRelativePath: string): string[] {
  const fullDir = path.join(WORKSPACE_ROOT, dirRelativePath);
  const results: string[] = [];
  for (const entry of fs.readdirSync(fullDir, { withFileTypes: true })) {
    const rel = path.join(dirRelativePath, entry.name);
    if (entry.isDirectory()) {
      results.push(...listFilesRecursive(rel));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      results.push(rel);
    }
  }
  return results;
}

test('Phase 22: zero native HTML <select> elements remain across all UI components and App shell', () => {
  const uiFiles = [...listFilesRecursive('src/components'), 'src/App.tsx'];
  const offenders: string[] = [];
  for (const rel of uiFiles) {
    const content = readProjectFile(rel);
    // Match actual JSX <select tags (excluding docblock comments like "HTML <select> controls")
    if (/<select[\s>]/.test(content) && !rel.endsWith('SelectSheet.tsx')) {
      offenders.push(rel);
    }
  }
  assert.deepEqual(
    offenders,
    [],
    `Found native <select> controls that should use SelectSheetField: ${offenders.join(', ')}`
  );
});

test('Phase 22: Adult and Kids bottom navigation bars use clean 5-tab layouts without fake iOS home indicator', () => {
  const adultDesign = readProjectFile('src/components/adult/AdultDesignSystem.tsx');
  assert.ok(
    adultDesign.includes('grid-cols-5'),
    'AdultBottomNav must use a 5-column layout (Home, Quran, Salah, Learn, More)'
  );
  assert.equal(
    adultDesign.includes('grid-cols-6'),
    false,
    'AdultBottomNav must not have cramped 6-column bottom navigation'
  );

  const kidsView = readProjectFile('src/components/kids/KidsWorldView.tsx');
  assert.ok(
    kidsView.includes('grid-cols-5'),
    'KidsWorldView bottom navigation must use a 5-column layout (Home, Qaida, Stories, Map, Stars)'
  );
  assert.equal(
    kidsView.includes('grid-cols-6'),
    false,
    'KidsWorldView must not have 6-column bottom navigation'
  );
  assert.equal(
    kidsView.includes('w-28 h-1 bg-slate-900/20'),
    false,
    'KidsWorldView must not render a fake iOS home indicator bar'
  );
});

test('Phase 22: App shell removes permanent global web header and numbered developer Screens drawer', () => {
  const appSrc = readProjectFile('src/App.tsx');
  assert.equal(
    appSrc.includes('1. Adult Home'),
    false,
    'Production App.tsx must not expose developer numbered "1. Adult Home" drawer'
  );
  assert.equal(
    appSrc.includes('Stories (32)'),
    false,
    'App.tsx must not display stale hardcoded Stories (32) label'
  );
  assert.equal(
    KIDS_STORIES.length,
    49,
    'Verified KIDS_STORIES catalog should contain 49 stories'
  );
  assert.ok(
    appSrc.includes('KIDS_STORIES.length'),
    'App.tsx sidebar must derive the Stories badge dynamically from KIDS_STORIES.length'
  );
  assert.ok(
    appSrc.includes('FloatingAudioMiniPlayer'),
    'App.tsx must mount the persistent FloatingAudioMiniPlayer'
  );
  assert.ok(
    appSrc.includes('ScreenSkeleton'),
    'App.tsx Suspense fallback must use ScreenSkeleton shimmer instead of raw spinner text'
  );
});

test('Phase 22: zero fixed min-h-[760px] mockup heights remain in src/', () => {
  const allSrcFiles = listFilesRecursive('src').filter((f) => !f.includes('__tests__'));
  const offenders = allSrcFiles.filter((rel) => readProjectFile(rel).includes('min-h-[760px]'));
  assert.deepEqual(
    offenders,
    [],
    `Found fixed min-h-[760px] heights that should be fluid min-h-dvh: ${offenders.join(', ')}`
  );
});

test('Phase 22: zero consumer-facing developer jargon (Local IndexedDB, Cloud Sync Deferred, PBKDF2-SHA256) in UI', () => {
  const uiFiles = [...listFilesRecursive('src/components'), 'src/App.tsx'];
  const forbidden = ['Local IndexedDB', 'Cloud Sync Deferred', 'PBKDF2-SHA256'];
  const matches: string[] = [];
  for (const rel of uiFiles) {
    const content = readProjectFile(rel);
    for (const term of forbidden) {
      if (content.includes(term)) {
        matches.push(`${rel} -> "${term}"`);
      }
    }
  }
  assert.deepEqual(
    matches,
    [],
    `Found developer jargon in consumer UI: ${matches.join(', ')}`
  );
});

test('Phase 22: typography sweep removes unreadably tiny text-[9px] and text-[10px] tokens from UI components', () => {
  const uiFiles = [...listFilesRecursive('src/components'), 'src/App.tsx'];
  const offenders: string[] = [];
  for (const rel of uiFiles) {
    const content = readProjectFile(rel);
    if (/text-\[(9|10)px\]/.test(content)) {
      offenders.push(rel);
    }
  }
  assert.deepEqual(
    offenders,
    [],
    `Found tiny 9px/10px micro-text classes in UI components: ${offenders.join(', ')}`
  );
});

test('Phase 22: new flagship primitives, SelectSheetField, FloatingAudioMiniPlayer, and 3-tab Parent Hub export cleanly', () => {
  const selectSheetSrc = readProjectFile('src/components/sheets/SelectSheet.tsx');
  assert.ok(selectSheetSrc.includes('export const SelectSheetField'));
  assert.ok(selectSheetSrc.includes('role="listbox"'));
  assert.ok(selectSheetSrc.includes('role="option"'));

  const miniPlayerSrc = readProjectFile('src/components/audio/FloatingAudioMiniPlayer.tsx');
  assert.ok(miniPlayerSrc.includes('export const FloatingAudioMiniPlayer'));
  assert.ok(miniPlayerSrc.includes('useAudioManager'));

  const primitivesSrc = readProjectFile('src/components/design-system/IlmizoPrimitives.tsx');
  for (const symbol of [
    'PrimaryButton',
    'SecondaryButton',
    'SearchField',
    'SettingsGroup',
    'SettingsRow',
    'SkeletonCard',
    'SkeletonList',
    'ScreenSkeleton',
  ]) {
    assert.ok(
      primitivesSrc.includes(`export const ${symbol}`),
      `Missing exported flagship primitive: ${symbol}`
    );
  }

  const parentHubSrc = readProjectFile('src/components/parent/ParentHubView.tsx');
  assert.ok(
    parentHubSrc.includes("activeParentTab === 'overview'") &&
      parentHubSrc.includes("activeParentTab === 'profiles'") &&
      parentHubSrc.includes("activeParentTab === 'safety'"),
    'ParentHubView must organize controls into Overview, Profiles, and Safety tabs'
  );
});

test('Phase 22: single centralized audioManager supports clean stopAll reset and Adult navigation persistence wiring', () => {
  audioManager.stopAll();
  const state = audioManager.getState();
  assert.equal(state.status, 'idle');
  assert.equal(state.quranSequence.mode, null);

  const ctxSrc = readProjectFile('src/context/IlmizoContext.tsx');
  assert.ok(
    ctxSrc.includes('quranSequence.mode'),
    'IlmizoContext must keep active Adult Quran playback alive into FloatingAudioMiniPlayer during Adult navigation'
  );
});

test('Phase 22 Final Polish: 3-tab Storage Hub, calm Quran BottomSheet, consumer Adhan card, and smooth Adult transitions', () => {
  const storageSrc = readProjectFile('src/components/pwa/LocalDataManagerCard.tsx');
  assert.ok(
    storageSrc.includes("activeHubTab === 'quran'") &&
      storageSrc.includes("activeHubTab === 'audio'") &&
      storageSrc.includes("activeHubTab === 'backup'"),
    'LocalDataManagerCard must separate Offline Quran, Audio Packs, and Backup into 3 clean sub-tabs'
  );

  const widgetsSrc = readProjectFile('src/components/adult/Phase7To11Widgets.tsx');
  assert.equal(
    widgetsSrc.includes('Play Store APK Guide'),
    false,
    'Salah Adhan card must not expose Play Store APK developer instructions to end users'
  );
  assert.equal(
    widgetsSrc.includes('Capacitor Android APK Ready'),
    false,
    'Salah Adhan card must not expose Capacitor developer badges to end users'
  );
  assert.ok(
    widgetsSrc.includes('Recitation Controls') && widgetsSrc.includes('<BottomSheet'),
    'Quran audio bar must tuck advanced recitation controls into a BottomSheet'
  );

  const adultModeSrc = readProjectFile('src/components/adult/AdultModeView.tsx');
  assert.ok(
    adultModeSrc.includes('AnimatePresence') && adultModeSrc.includes('useReducedMotion'),
    'AdultModeView must provide reduced-motion-safe AnimatePresence route transitions'
  );
  assert.equal(
    adultModeSrc.includes('Browser Arabic TTS'),
    false,
    '99 Names screen must not leak internal "(Browser Arabic TTS)" developer phrasing'
  );
});

test('Phase 22 Continuous Surah Auto-Advance & 6-Point Native Polish', () => {
  const widgetsSrc = readProjectFile('src/components/adult/Phase7To11Widgets.tsx');
  assert.ok(
    widgetsSrc.includes("audioState.quranSequence.mode || 'full_surah'"),
    'Adult QuranAdvancedAudioPlayerBar must default to continuous full_surah auto-advance playback'
  );

  const adultModeSrc = readProjectFile('src/components/adult/AdultModeView.tsx');
  assert.ok(
    adultModeSrc.includes('audioManager.playFullSurah'),
    'Adult Quran reader Audio action must play continuous Surah sequence and auto-advance Ayahs'
  );

  const kidsSrc = readProjectFile('src/components/kids/KidsWorldView.tsx');
  assert.ok(
    kidsSrc.includes('playKidsSurahContinuous') && kidsSrc.includes('audioManager.playFullSurah'),
    'Kids Quran learning must use continuous playFullSurah so Ayahs auto-advance cleanly'
  );
  assert.ok(
    kidsSrc.includes('<AnimatePresence mode="wait" initial={false}>'),
    'KidsWorldView must animate screen body smoothly above its pinned Bottom Nav'
  );

  const appSrc = readProjectFile('src/App.tsx');
  assert.ok(
    appSrc.includes('const activeScreenKey = mode;'),
    'App.tsx must key outer AnimatePresence on mode only so Bottom Navigation Bars stay pinned without flicker'
  );

  const miniSrc = readProjectFile('src/components/audio/FloatingAudioMiniPlayer.tsx');
  assert.ok(
    miniSrc.includes("kidsRoute === 'quran_learning'"),
    'FloatingAudioMiniPlayer must hide on Kids inline audio screens so it never overlaps on-screen controls'
  );

  const extraSrc = readProjectFile('src/components/adult/AdultExtraScreens.tsx');
  assert.ok(
    extraSrc.includes("['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"),
    'Islamic Calendar must render a visual Sun–Sat Hijri Month Grid'
  );
  assert.ok(
    extraSrc.includes('ilmizoProgressGrad'),
    'Progress screen must render a dynamic SVG Circular Mastery Ring'
  );
});

test('Phase 22 Unified Quran Audio Sync, Verse Haptics, Auto-Scroll, Highlight & Lessons Polish', () => {
  const hapticsSrc = readProjectFile('src/services/hapticsService.ts');
  assert.ok(
    hapticsSrc.includes('export async function triggerVerseTransitionHaptic'),
    'hapticsService must export triggerVerseTransitionHaptic using @capacitor/haptics'
  );
  assert.ok(
    hapticsSrc.includes('@capacitor/haptics'),
    'hapticsService must use @capacitor/haptics for native tactile feedback'
  );

  const syncHookSrc = readProjectFile('src/hooks/useQuranAudioSync.ts');
  assert.ok(
    syncHookSrc.includes('export function useQuranAudioSync'),
    'useQuranAudioSync hook must be exported'
  );
  assert.ok(
    syncHookSrc.includes('triggerVerseTransitionHaptic'),
    'useQuranAudioSync must trigger subtle haptic feedback on verse transitions'
  );
  assert.ok(
    syncHookSrc.includes('scrollIntoView'),
    'useQuranAudioSync must auto-scroll to keep the active Ayah focused during recitation'
  );

  const cssSrc = readProjectFile('src/index.css');
  assert.ok(
    cssSrc.includes('.ilmizo-ayah-playing') && cssSrc.includes('.ilmizo-ayah-span-playing'),
    'index.css must define smooth highlight animations for active Quran verses'
  );

  const adultModeSrc = readProjectFile('src/components/adult/AdultModeView.tsx');
  assert.ok(
    adultModeSrc.includes('useQuranAudioSync') && adultModeSrc.includes('ilmizo-ayah-playing'),
    'AdultModeView must wire useQuranAudioSync and active verse highlight animation'
  );

  const mushafSrc = readProjectFile('src/components/adult/QuranMushafView.tsx');
  assert.ok(
    mushafSrc.includes('useQuranAudioSync') && mushafSrc.includes('ilmizo-ayah-span-playing'),
    'QuranMushafView must wire useQuranAudioSync and inline span highlight animation'
  );

  const widgetsSrc = readProjectFile('src/components/adult/Phase7To11Widgets.tsx');
  assert.ok(
    widgetsSrc.includes('useQuranAudioSync'),
    'QuranAdvancedAudioPlayerBar must use unified useQuranAudioSync'
  );

  const kidsSrc = readProjectFile('src/components/kids/KidsWorldView.tsx');
  assert.ok(
    kidsSrc.includes('useQuranAudioSync') && kidsSrc.includes('ilmizo-ayah-playing'),
    'KidsWorldView must wire useQuranAudioSync and active verse highlight animation'
  );
  assert.equal(
    /setPracticedAyahsBySurah\(\(prev\)\s*=>\s*\{[\s\S]*?completeKidsQuestStep/.test(kidsSrc),
    false,
    'KidsWorldView must never invoke IlmizoProvider setState (completeKidsQuestStep) inside setPracticedAyahsBySurah updater'
  );

  const extraSrc = readProjectFile('src/components/adult/AdultExtraScreens.tsx');
  assert.ok(
    extraSrc.includes('Persistent Learning Progress') && extraSrc.includes('<motion.button'),
    'AdultLessonsScreen must include persistent sticky progress bar and animated lesson cards'
  );

  const miniSrc = readProjectFile('src/components/audio/FloatingAudioMiniPlayer.tsx');
  assert.ok(
    miniSrc.includes('Minimize audio player') && miniSrc.includes('Expand audio player'),
    'FloatingAudioMiniPlayer must support minimizing and expanding while preserving live playback progress'
  );
});

test('Phase 23 Flagship Upgrade 1: Lock-Screen MediaSession API & Native Android Media Playback Foreground Service', () => {
  const mediaSessionSrc = readProjectFile('src/services/mediaSessionService.ts');
  for (const symbol of [
    'initLockScreenMediaSession',
    'syncLockScreenMediaMetadata',
    'syncLockScreenPositionState',
    'clearLockScreenMediaSession',
  ]) {
    assert.ok(
      mediaSessionSrc.includes(`export function ${symbol}`),
      `mediaSessionService must export ${symbol}`
    );
  }
  assert.ok(
    mediaSessionSrc.includes('navigator.mediaSession') &&
      mediaSessionSrc.includes('IlmizoMediaSession'),
    'mediaSessionService must bridge both Web MediaSession API and native Android IlmizoMediaSession plugin'
  );

  const audioMgrSrc = readProjectFile('src/services/audioManager.ts');
  assert.ok(
    audioMgrSrc.includes('initLockScreenMediaSession') &&
      audioMgrSrc.includes('syncLockScreenMediaMetadata') &&
      audioMgrSrc.includes('useAudioPlaybackClock'),
    'audioManager must wire lock-screen controls and isolated real-time playback clock'
  );

  const serviceJava = readProjectFile(
    'android/app/src/main/java/com/ilmizo/tarbiyah/IlmizoMediaPlaybackService.java'
  );
  assert.ok(
    serviceJava.includes('FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK'),
    'IlmizoMediaPlaybackService must start as a mediaPlayback foreground service for lock-screen playback'
  );

  const pluginJava = readProjectFile(
    'android/app/src/main/java/com/ilmizo/tarbiyah/IlmizoMediaSessionPlugin.java'
  );
  assert.ok(
    pluginJava.includes('@CapacitorPlugin(name = "IlmizoMediaSession")'),
    'IlmizoMediaSessionPlugin must register as Capacitor plugin IlmizoMediaSession'
  );

  const mainActivity = readProjectFile(
    'android/app/src/main/java/com/ilmizo/tarbiyah/MainActivity.java'
  );
  assert.ok(
    mainActivity.includes('IlmizoMediaSessionPlugin.class'),
    'MainActivity must register IlmizoMediaSessionPlugin'
  );

  const manifest = readProjectFile('android/app/src/main/AndroidManifest.xml');
  assert.ok(
    manifest.includes('FOREGROUND_SERVICE_MEDIA_PLAYBACK') &&
      manifest.includes('IlmizoMediaPlaybackService'),
    'AndroidManifest must declare FOREGROUND_SERVICE_MEDIA_PLAYBACK permission and IlmizoMediaPlaybackService'
  );
});

test('Phase 23 Flagship Upgrade 2: IndoPak 15-Line / Madani Script Switch & Real-Time Word-by-Word Live Highlight', async () => {
  const {
    formatAyahTextForScript,
    computeWordTimingRanges,
    getActiveWordIndexAtProgress,
    getArabicScriptFontClass,
  } = await import('../services/quranScriptEngine');

  const sampleUthmani = 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ';
  assert.equal(
    formatAyahTextForScript(sampleUthmani, 'uthmani'),
    sampleUthmani,
    'Madani/Uthmani script mode must preserve original Uthmani glyphs verbatim'
  );

  const indopakFormatted = formatAyahTextForScript(sampleUthmani, 'indopak');
  assert.equal(
    indopakFormatted.includes('\u0671'),
    false,
    'IndoPak script normalization must convert Alef Wasla (U+0671) into South Asian readable Alef'
  );
  assert.equal(getArabicScriptFontClass('indopak'), 'font-arabic-indopak');
  assert.equal(getArabicScriptFontClass('uthmani'), 'font-arabic-uthmani');

  const words = sampleUthmani.split(/\s+/);
  const ranges = computeWordTimingRanges(words);
  assert.equal(ranges.length, words.length);
  assert.equal(ranges[0].startRatio, 0);
  assert.ok(Math.abs(ranges[ranges.length - 1].endRatio - 1) < 1e-6);

  // Word index must progress monotonically from 0 to last word across 0..1 progress
  let prevIdx = -1;
  for (const ratio of [0.02, 0.3, 0.65, 0.96]) {
    const idx = getActiveWordIndexAtProgress(words, ratio);
    assert.ok(idx >= prevIdx, `Expected monotonic word highlight progression at ratio=${ratio}`);
    prevIdx = idx;
  }
  assert.equal(prevIdx, words.length - 1);

  const mushafSrc = readProjectFile('src/components/adult/QuranMushafView.tsx');
  assert.ok(
    mushafSrc.includes('useQuranScriptStyle') && mushafSrc.includes('useAudioPlaybackClock'),
    'QuranMushafView must wire IndoPak/Madani script switch and live word-by-word highlight'
  );

  const widgetsSrc = readProjectFile('src/components/adult/Phase7To11Widgets.tsx');
  assert.ok(
    widgetsSrc.includes('useQuranScriptStyle') &&
      widgetsSrc.includes('useAudioPlaybackClock') &&
      widgetsSrc.includes('ilmizo-word-live'),
    'InteractiveTajweedAyahView must wire IndoPak/Madani switch and real-time word-by-word highlight for Adult & Kids'
  );

  const indexHtml = readProjectFile('index.html');
  assert.ok(
    indexHtml.includes('Lateef'),
    'index.html must load Lateef font for crisp 15-line IndoPak South Asian script'
  );
});

test('Phase 23 Flagship Upgrade 3: Top 15 Custom Illustrated Kids Stories & Expanded Studio Audio Pre-Warming', async () => {
  const { TOP_FEATURED_STORY_IDS, getStoryCoverArtwork } = await import(
    '../services/storyArtworkAndAudio'
  );

  assert.equal(
    TOP_FEATURED_STORY_IDS.length,
    15,
    'TOP_FEATURED_STORY_IDS must curate the top 15 bespoke illustrated flagship stories'
  );

  const newArtworkFiles = [
    'public/assets/illustrations/story_bilal_adhan.webp',
    'public/assets/illustrations/story_ismail_zamzam.webp',
    'public/assets/illustrations/story_yunus_whale.webp',
    'public/assets/illustrations/story_umar_lantern.webp',
    'public/assets/illustrations/story_uthman_well.webp',
  ];
  for (const relPath of newArtworkFiles) {
    assert.ok(
      fs.existsSync(path.join(WORKSPACE_ROOT, relPath)),
      `Expected bespoke storybook illustration on disk: ${relPath}`
    );
  }

  for (const id of [
    'story_bilal_steadfast',
    'story_ismail_zamzam',
    'story_yunus_dua',
    'story_umar_night_care',
    'story_uthman_well_rumah',
  ]) {
    const story = KIDS_STORIES.find((s) => s.id === id);
    assert.ok(story, `Expected story ${id} in KIDS_STORIES`);
    const resolvedSrc = getStoryCoverArtwork(story!);
    assert.ok(
      resolvedSrc.includes('/assets/illustrations/story_') && resolvedSrc.endsWith('.webp'),
      `Story ${id} must resolve to its custom compressed WebP illustration asset`
    );
  }

  const kidsSrc = readProjectFile('src/components/kids/KidsWorldView.tsx');
  assert.ok(
    kidsSrc.includes('Illustrated Top 15') && kidsSrc.includes('TOP_FEATURED_STORY_IDS'),
    'KidsWorldView must expose the Illustrated Top 15 showcase filter'
  );
  assert.ok(
    kidsSrc.includes('count: 10'),
    'KidsWorldView must pre-warm top 10 flagship stories with Studio Audio in the background'
  );
});

test('Phase 23 Flagship Upgrade 4: Native Android Home-Screen Salah Widget & Exact Doze-Safe Adhan Alarm', () => {
  const receiverJava = readProjectFile(
    'android/app/src/main/java/com/ilmizo/tarbiyah/IlmizoExactAdhanReceiver.java'
  );
  assert.ok(
    receiverJava.includes('setExactAndAllowWhileIdle') &&
      receiverJava.includes('rescheduleSavedAlarms') &&
      receiverJava.includes('adhan_makkah'),
    'IlmizoExactAdhanReceiver must schedule Doze-safe exact alarms with bundled Adhan audio and reboot recovery'
  );

  const widgetPluginJava = readProjectFile(
    'android/app/src/main/java/com/ilmizo/tarbiyah/IlmizoPrayerWidgetPlugin.java'
  );
  assert.ok(
    widgetPluginJava.includes('requestPinAppWidget') &&
      widgetPluginJava.includes('scheduleExactAdhanAlarms'),
    'IlmizoPrayerWidgetPlugin must support 1-tap widget pinning and exact native Adhan alarm scheduling'
  );

  const bootReceiverJava = readProjectFile(
    'android/app/src/main/java/com/ilmizo/tarbiyah/IlmizoPrayerBootReceiver.java'
  );
  assert.ok(
    bootReceiverJava.includes('IlmizoExactAdhanReceiver.rescheduleSavedAlarms'),
    'IlmizoPrayerBootReceiver must restore exact Adhan alarms after device reboot'
  );

  const manifest = readProjectFile('android/app/src/main/AndroidManifest.xml');
  assert.ok(
    manifest.includes('IlmizoExactAdhanReceiver'),
    'AndroidManifest must declare IlmizoExactAdhanReceiver'
  );

  const bridgeSrc = readProjectFile('src/services/capacitorNativeBridge.ts');
  assert.ok(
    bridgeSrc.includes('requestPinNativePrayerWidget') &&
      bridgeSrc.includes('scheduleExactAdhanAlarms'),
    'capacitorNativeBridge must expose 1-tap widget pin and exact Adhan alarm bridge'
  );

  const widgetsSrc = readProjectFile('src/components/adult/Phase7To11Widgets.tsx');
  assert.ok(
    widgetsSrc.includes('Add Widget to Home Screen') &&
      widgetsSrc.includes('requestPinNativePrayerWidget') &&
      widgetsSrc.includes('2×1 Compact') &&
      widgetsSrc.includes('4×2 Full'),
    'NativeApkAndAzanNotificationStudio must provide interactive 2x1/4x2 widget preview and 1-tap Home-Screen pinning'
  );
});

test('Phase 24 Complete Blueprint: Top 600 Quran Words, 7-Day Offline Grace Period & Existing Prices Preserved', async () => {
  const { TOP_QURAN_VOCAB } = await import('../data/islamicContent');
  assert.ok(
    TOP_QURAN_VOCAB.length >= 600,
    `Expected Top 600 Quran Words deck (>= 600), got ${TOP_QURAN_VOCAB.length}`
  );

  const {
    ILMIZO_PLAN_CATALOG,
    SEVEN_DAY_OFFLINE_GRACE_MS,
    getEffectiveEntitlement,
    getOfflineEntitlementGraceStatus,
    computeEntitlementProofSync,
  } = await import('../services/subscriptionEngine');

  // Verify existing billing prices remain strictly untouched
  const priceMap = Object.fromEntries(ILMIZO_PLAN_CATALOG.map((p) => [p.id, p.priceInrLabel]));
  assert.equal(priceMap.free, '₹0');
  assert.equal(priceMap.individual_99, '₹99 / yr');
  assert.equal(priceMap.family_199, '₹199 / yr');
  assert.equal(priceMap.lifetime_499, '₹499 once');

  const nowMs = Date.parse('2026-11-20T12:00:00.000Z');
  const verified3DaysAgo = new Date(nowMs - 3 * 24 * 60 * 60 * 1000).toISOString();
  const verified9DaysAgo = new Date(nowMs - 9 * 24 * 60 * 60 * 1000).toISOString();

  const proof = computeEntitlementProofSync({
    entitlement: 'family_199',
    source: 'google_play',
    sku: 'ilmizo_family_199',
    orderId: 'GPA.1234',
  });

  const basePaidUser: any = {
    entitlement: 'family_199',
    subscriptionPurchaseSource: 'google_play',
    subscriptionSku: 'ilmizo_family_199',
    subscriptionOrderId: 'GPA.1234',
    subscriptionProofToken: proof,
  };

  assert.equal(SEVEN_DAY_OFFLINE_GRACE_MS, 7 * 24 * 60 * 60 * 1000);

  const withinGrace = getOfflineEntitlementGraceStatus(
    { ...basePaidUser, subscriptionLastVerifiedAtIso: verified3DaysAgo },
    nowMs,
    false
  );
  assert.equal(withinGrace.inGracePeriod, true);
  assert.equal(withinGrace.isGraceExpired, false);
  assert.equal(withinGrace.daysRemaining, 4);
  assert.equal(
    getEffectiveEntitlement(
      { ...basePaidUser, subscriptionLastVerifiedAtIso: verified3DaysAgo },
      nowMs,
      false
    ),
    'family_199'
  );

  const expiredGrace = getOfflineEntitlementGraceStatus(
    { ...basePaidUser, subscriptionLastVerifiedAtIso: verified9DaysAgo },
    nowMs,
    false
  );
  assert.equal(expiredGrace.isGraceExpired, true);
  assert.equal(
    getEffectiveEntitlement(
      { ...basePaidUser, subscriptionLastVerifiedAtIso: verified9DaysAgo },
      nowMs,
      false
    ),
    'free'
  );
});

test('Phase 24 Complete Blueprint: 5 Special Learning Modules, Surah Memorization Check, Visual Quran Garden & Sleep Timer', async () => {
  const {
    PROPHETS_FAMILY_TREE,
    NEW_MUSLIM_PATHWAY_STAGES,
    FRIDAY_SUNNAH_CHECKLIST,
    ISLAMIC_REMINDER_CARDS,
    CAR_DRIVE_PRESET_SURAHS,
  } = await import('../data/specialModulesData');

  assert.equal(PROPHETS_FAMILY_TREE.length, 25, 'Prophets Family Tree must cover all 25 Quranic Prophets');
  assert.equal(NEW_MUSLIM_PATHWAY_STAGES.length, 7, 'New Muslim Pathway must include 7 beginner stages');
  assert.ok(FRIDAY_SUNNAH_CHECKLIST.length >= 6, 'Friday Hub must include complete Jummah Sunnah checklist');
  assert.ok(ISLAMIC_REMINDER_CARDS.length >= 15, 'Islamic Reminder Cards must include verified cards');
  assert.ok(CAR_DRIVE_PRESET_SURAHS.length >= 6, 'Car Drive Mode must include quick-launch Surah presets');

  const { sleepTimerService, formatSleepCountdown } = await import('../services/sleepTimerService');
  assert.equal(formatSleepCountdown(125), '2:05');
  sleepTimerService.startMinutes(10);
  assert.equal(sleepTimerService.getState().mode, 'countdown');
  assert.equal(sleepTimerService.getState().totalSeconds, 600);
  sleepTimerService.cancel();
  assert.equal(sleepTimerService.getState().mode, 'off');

  const adultModeSrc = readProjectFile('src/components/adult/AdultModeView.tsx');
  assert.ok(
    adultModeSrc.includes('SpecialModulesHub') && adultModeSrc.includes('SurahMemorizationCheckCard'),
    'AdultModeView must mount SpecialModulesHub and SurahMemorizationCheckCard'
  );

  const extraSrc = readProjectFile('src/components/adult/AdultExtraScreens.tsx');
  assert.ok(
    extraSrc.includes('Prophets Family Tree') &&
      extraSrc.includes('New Muslim Pathway') &&
      extraSrc.includes('Friday (Jummah) Hub') &&
      extraSrc.includes('Car Drive Mode') &&
      extraSrc.includes('Islamic Reminder Cards'),
    'Adult More Hub must expose all 5 Special Learning Modules'
  );

  const kidsSrc = readProjectFile('src/components/kids/KidsWorldView.tsx');
  assert.ok(
    kidsSrc.includes('QuranGardenView') &&
      kidsSrc.includes('SleepTimerSheet') &&
      kidsSrc.includes('SleepTimerTriggerButton'),
    'KidsWorldView must wire interactive QuranGardenView and Bedtime Sleep Timer'
  );

  const miniSrc = readProjectFile('src/components/audio/FloatingAudioMiniPlayer.tsx');
  assert.ok(
    miniSrc.includes('SleepTimerSheet'),
    'FloatingAudioMiniPlayer must expose Sleep Timer controls'
  );
});




