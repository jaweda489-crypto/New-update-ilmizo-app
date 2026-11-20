import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  buildSevenDayLocalPlan,
  evaluateMissedDayKindness,
  hasExistingLocalUserHistory,
  inferAgeBandFromAge,
  loadLocalOnboardingProfile,
  saveLocalOnboardingProfile,
} from '../services/onboardingPlanEngine';
import {
  ALL_LIVING_MASCOT_STATES,
  inferAmbientMascotState,
} from '../components/shared/LivingMascot';
import {
  getActiveQaidaRevisionRecommendations,
  getArabicLetterStrokeGuide,
  loadChildQaidaMastery,
  markChildQaidaMistakeResolved,
  recordChildQaidaMistake,
  saveChildLetterTracingProgress,
} from '../services/qaidaTracingStore';
import {
  BUNDLED_STORY_WEBP_ASSETS,
  auditAllStorybookAssets,
} from '../services/storyArtworkAndAudio';
import { EXPANDED_KIDS_STORIES } from '../data/expandedIslamicLibrary';
import { NOORANI_QAIDA_COURSE_LESSONS } from '../data/nooraniQaidaCourse';
import {
  buildReflowableMushafPages,
  formatOrnamentalAyahMarker,
  loadQuranReaderPreferences,
  saveQuranReaderPreferences,
  toArabicIndicNumber,
} from '../services/mushafPaginationEngine';
import {
  buildDailyTarbiyahPlan,
  buildWeeklyTarbiyahReport,
} from '../services/dailyTarbiyahPlanEngine';
import {
  getPrayerWidgetPlatformCapability,
  isPersistentPrayerCountdownEnabled,
  resolveNextPrayerForWidget,
  setPersistentPrayerCountdownEnabled,
  syncNativePrayerWidget,
} from '../services/capacitorNativeBridge';
import {
  isHapticsEnabled,
  setHapticsEnabled,
  triggerLightHaptic,
  triggerSelectionHaptic,
  triggerSuccessHaptic,
} from '../services/hapticsService';
import { ILMIZO_PLAN_CATALOG } from '../services/subscriptionEngine';
import { SUPPORTED_LANGUAGES, loadLanguageLabels } from '../data/i18n';
import { ChildProfile } from '../types/ilmizo';

function installMemoryLocalStorage() {
  const store = new Map<string, string>();
  const mockStorage: Storage = {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
  };
  Object.defineProperty(globalThis, 'localStorage', {
    value: mockStorage,
    configurable: true,
    writable: true,
  });
  return store;
}

const SAMPLE_CHILD: ChildProfile = {
  id: 'child-phase20-test',
  name: 'Ayaan',
  age: 6,
  avatar: 'Mizo',
  dailyGoalMinutes: 25,
  activeMinutesToday: 0,
  stars: 0,
  streakDays: 0,
  questStepsCompleted: {
    quran: false,
    salah: false,
    dua: false,
    quiz: false,
    family: false,
  },
  pillarProgress: {
    quranLessons: 0,
    salahLessons: 0,
    duasPracticed: 0,
    akhlaqDeeds: 0,
  },
  unlockedAdventureNode: 1,
  needsPractice: [],
  goodDeeds: [],
  earnedBadgeIds: [],
  completedSurahs: [],
  completedStoryIds: [],
  completedQaidaLessonIds: [],
  recentActivities: [],
};

test('Phase 20.1: First-60-Seconds Onboarding respects returning upgraders, builds 7-day plan, and never shames missed days', () => {
  installMemoryLocalStorage();

  const initial = loadLocalOnboardingProfile();
  assert.equal(initial.status, 'pending');
  assert.equal(hasExistingLocalUserHistory(), false);

  // Returning upgrader with saved local master state is auto-skipped, never interrupted
  localStorage.setItem('ilmizo_master_state_v1', '{"version":1}');
  assert.equal(hasExistingLocalUserHistory(), true);
  assert.equal(loadLocalOnboardingProfile().status, 'skipped');
  localStorage.clear();

  assert.equal(inferAgeBandFromAge(5), '4-6');
  assert.equal(inferAgeBandFromAge(8), '7-9');
  assert.equal(inferAgeBandFromAge(11), '10-12');

  const updated = {
    ...initial,
    status: 'completed' as const,
    adultGoal: 'hifz_revision' as const,
    adultDailyMinutes: 10 as const,
    childAgeBand: '7-9' as const,
    completedAtIso: '2026-11-19T08:00:00.000Z',
  };
  saveLocalOnboardingProfile(updated);
  assert.equal(loadLocalOnboardingProfile().status, 'completed');
  assert.equal(loadLocalOnboardingProfile().adultGoal, 'hifz_revision');

  const planEn = buildSevenDayLocalPlan(updated, 'en');
  assert.equal(planEn.length, 7);
  assert.equal(planEn[0].dayNumber, 1);
  assert.equal(planEn[6].dayNumber, 7);

  const planHinglish = buildSevenDayLocalPlan(updated, 'hinglish');
  assert.equal(planHinglish.length, 7);

  const kindness = evaluateMissedDayKindness({
    lastActiveDateKey: '2026-11-15',
    todayDateKey: '2026-11-19',
    planPaused: false,
    child: SAMPLE_CHILD,
  });
  assert.equal(kindness.missedDays, 4);
  assert.equal(kindness.showWelcomeBack, true);
  assert.equal(kindness.suggestedQuickMinutes, 3);
  assert.ok(kindness.toneMessage.toLowerCase().includes('no streak guilt'));
});

test('Phase 20.2: LivingMascot defines all 10 expressive states and infers ambient resting vs idle cleanly', () => {
  assert.equal(ALL_LIVING_MASCOT_STATES.length, 10);
  const expected = [
    'idle',
    'blink',
    'happy',
    'thinking',
    'encouraging',
    'celebrating',
    'gentle_disappointment',
    'listening',
    'teaching',
    'resting',
  ];
  for (const state of expected) {
    assert.ok(ALL_LIVING_MASCOT_STATES.includes(state as any), `Missing mascot state: ${state}`);
  }
  assert.equal(inferAmbientMascotState(new Date('2026-11-19T22:00:00')), 'resting');
  assert.equal(inferAmbientMascotState(new Date('2026-11-19T03:00:00')), 'resting');
  assert.equal(inferAmbientMascotState(new Date('2026-11-19T10:00:00')), 'idle');
});

test('Phase 20.3: Qaida Tracing Store persists per-child progress, provides stroke guides for all 28 letters, and tracks mistake-driven revisions', () => {
  installMemoryLocalStorage();

  const all28ArabicLetters = [
    'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص',
    'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'و', 'ه', 'ي',
  ];
  assert.equal(all28ArabicLetters.length, 28);
  assert.ok(NOORANI_QAIDA_COURSE_LESSONS.length >= 16);
  for (const ch of all28ArabicLetters) {
    const guide = getArabicLetterStrokeGuide(ch);
    assert.ok(guide.startX >= 0 && guide.startX <= 1, `Invalid startX for ${ch}`);
    assert.ok(guide.endX >= 0 && guide.endX <= 1, `Invalid endX for ${ch}`);
    assert.ok(guide.directionHint.length > 5);
  }

  saveChildLetterTracingProgress({
    childId: SAMPLE_CHILD.id,
    letterId: 'alif',
    letterArabic: 'ا',
    letterName: 'Alif',
    coveragePercent: 86,
  });
  const stored = loadChildQaidaMastery(SAMPLE_CHILD.id).tracingByLetterId['alif'];
  assert.ok(stored);
  assert.equal(stored.bestCoveragePercent, 86);
  assert.equal(stored.tracedCount, 1);

  recordChildQaidaMistake({
    childId: SAMPLE_CHILD.id,
    lessonId: 'qaida-lesson-1',
    lessonNumber: 1,
    arabicText: 'ق',
    label: 'Qaf',
  });
  recordChildQaidaMistake({
    childId: SAMPLE_CHILD.id,
    lessonId: 'qaida-lesson-1',
    lessonNumber: 1,
    arabicText: 'ق',
    label: 'Qaf',
  });
  const activeMistakes = getActiveQaidaRevisionRecommendations(SAMPLE_CHILD.id);
  assert.equal(activeMistakes.length, 1);
  assert.equal(activeMistakes[0].arabicText, 'ق');
  assert.equal(activeMistakes[0].missCount, 2);

  markChildQaidaMistakeResolved(SAMPLE_CHILD.id, activeMistakes[0].id);
  assert.equal(getActiveQaidaRevisionRecommendations(SAMPLE_CHILD.id).length, 0);
});

test('Phase 20.4: All 25 bundled story WebP illustrations exist on disk and all 49 stories pass honest asset audit', () => {
  assert.equal(BUNDLED_STORY_WEBP_ASSETS.length, 25);
  const publicDir = path.resolve(process.cwd(), 'public');

  for (const relPath of BUNDLED_STORY_WEBP_ASSETS) {
    assert.ok(relPath.startsWith('/assets/illustrations/'), `Unexpected asset path: ${relPath}`);
    assert.ok(relPath.endsWith('.webp'), `Asset must be WebP: ${relPath}`);
    const absPath = path.join(publicDir, relPath.replace(/^\//, ''));
    assert.ok(fs.existsSync(absPath), `Missing bundled WebP on disk: ${absPath}`);
  }

  assert.equal(EXPANDED_KIDS_STORIES.length, 49);
  const auditSummary = auditAllStorybookAssets(EXPANDED_KIDS_STORIES);
  assert.equal(auditSummary.totalStories, 49);
  assert.equal(auditSummary.totalBundledWebpArtworks, 25);
  assert.equal(auditSummary.rows.length, 49);
  for (const row of auditSummary.rows) {
    assert.equal(row.sceneCount, 6, `Story ${row.storyId} must have 6 scenes`);
    assert.ok(row.coverArtworkPath.endsWith('.webp'));
    assert.equal(typeof row.sceneArtworkPendingUnique, 'boolean');
    assert.equal(typeof row.hasBundledQuranVerseAudio, 'boolean');
  }
});

test('Phase 20.5: Reflowable Uthmani Mushaf Mode paginates Ayahs accurately, formats Arabic-Indic markers, and persists local reader preferences', () => {
  installMemoryLocalStorage();

  assert.equal(toArabicIndicNumber(1), '١');
  assert.equal(toArabicIndicNumber(286), '٢٨٦');
  assert.equal(formatOrnamentalAyahMarker(7), '﴿٧﴾');

  const syntheticAyahs = Array.from({ length: 14 }, (_, idx) => ({
    numberInSurah: idx + 1,
    globalNumber: idx + 1,
    arabicUthmani: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
    transliteration: 'Bismillah...',
    translations: { en: 'In the name of Allah...', hi: '', ur: '', hinglish: '', ar: '' },
    mushafPage: idx < 7 ? 1 : 2,
    juz: 1,
  }));

  const pages = buildReflowableMushafPages(syntheticAyahs as any);
  assert.equal(pages.length, 2);
  assert.equal(pages[0].displayPageNumber, 1);
  assert.equal(pages[0].isStandardMushafPageNumber, true);
  assert.equal(pages[0].ayahs.length, 7);
  assert.equal(pages[1].displayPageNumber, 2);
  assert.equal(pages[1].ayahs.length, 7);

  saveQuranReaderPreferences({
    viewMode: 'mushaf',
    mushafParchmentTheme: 'sepia',
    lastPageBySurah: { 1: 1 },
    bookmarkedPages: [
      {
        surahNumber: 1,
        surahName: 'Al-Fatihah',
        pageIndex: 1,
        displayPageNumber: 2,
        firstAyahNumber: 8,
        savedAtIso: '2026-11-19T00:00:00Z',
      },
    ],
  });
  const prefs = loadQuranReaderPreferences();
  assert.equal(prefs.viewMode, 'mushaf');
  assert.equal(prefs.mushafParchmentTheme, 'sepia');
  assert.equal(prefs.lastPageBySurah[1], 1);
  assert.equal(prefs.bookmarkedPages.length, 1);
});

test('Phase 20.6: Daily Tarbiyah Plan adapts by age band, injects mistake-driven Qaida revisions, supports Pause/Resume, and Weekly Report is honest when empty', () => {
  installMemoryLocalStorage();

  const youngChild: ChildProfile = { ...SAMPLE_CHILD, id: 'child-5yr', age: 5 };
  const olderChild: ChildProfile = { ...SAMPLE_CHILD, id: 'child-11yr', age: 11 };

  const planYoung = buildDailyTarbiyahPlan({
    child: youngChild,
    language: 'en',
    dateKey: '2026-11-19',
    hasFamilyPlus: false,
  });
  const planOlder = buildDailyTarbiyahPlan({
    child: olderChild,
    language: 'en',
    dateKey: '2026-11-19',
    hasFamilyPlus: false,
  });
  assert.equal(planYoung.ageBand, '4-6');
  assert.equal(planYoung.totalMinutes, 8);
  assert.equal(planOlder.ageBand, '10-12');
  assert.equal(planOlder.totalMinutes, 12);

  // Inject mistake-driven revision into Qaida step
  recordChildQaidaMistake({
    childId: youngChild.id,
    lessonId: 'qaida-lesson-1',
    lessonNumber: 1,
    arabicText: 'ب',
    label: 'Ba',
  });
  const planWithMistake = buildDailyTarbiyahPlan({
    child: youngChild,
    language: 'en',
    dateKey: '2026-11-19',
    hasFamilyPlus: false,
  });
  assert.equal(planWithMistake.mistakeRevisions.length, 1);
  assert.ok(planWithMistake.steps[0].subtitle.includes('ب'));

  // Pause/Resume works via local onboarding profile
  const currentOnboarding = loadLocalOnboardingProfile();
  saveLocalOnboardingProfile({ ...currentOnboarding, planPaused: true });
  const pausedPlan = buildDailyTarbiyahPlan({
    child: youngChild,
    language: 'en',
    dateKey: '2026-11-19',
    hasFamilyPlus: false,
  });
  assert.equal(pausedPlan.isPaused, true);

  // Honest Weekly Report: empty child has hasActivityThisWeek === false
  const emptyReport = buildWeeklyTarbiyahReport(youngChild);
  assert.equal(emptyReport.hasActivityThisWeek, false);
  assert.equal(emptyReport.weeklyMinutesEstimate, 0);

  const activeChild: ChildProfile = {
    ...youngChild,
    completedStoryIds: ['story_nuh'],
    completedQaidaLessonIds: ['qaida-lesson-1'],
    stars: 10,
  };
  const populatedReport = buildWeeklyTarbiyahReport(activeChild);
  assert.equal(populatedReport.hasActivityThisWeek, true);
  assert.ok(populatedReport.weeklyMinutesEstimate > 0);
});

test('Phase 20.7: Native Android Prayer Widget bridge, Boot Receiver, XML layouts, and Haptics service are wired cleanly', async () => {
  installMemoryLocalStorage();

  const sampleTimes = {
    Fajr: '4:52 AM',
    Dhuhr: '12:08 PM',
    Asr: '3:35 PM',
    Maghrib: '5:52 PM',
    Isha: '7:08 PM',
  };

  const morningRef = new Date('2026-11-19T08:00:00');
  assert.equal(resolveNextPrayerForWidget(sampleTimes, morningRef).name, 'Dhuhr');

  const lateNightRef = new Date('2026-11-19T22:00:00');
  assert.equal(resolveNextPrayerForWidget(sampleTimes, lateNightRef).name, 'Fajr');

  const cap = getPrayerWidgetPlatformCapability();
  assert.equal(cap.platform, 'web');
  assert.equal(cap.supportsHomeScreenWidget, false);

  const syncRes = await syncNativePrayerWidget({
    city: 'Jamshedpur',
    hijriDate: '1448 AH',
    prayerTimes: sampleTimes,
  });
  assert.equal(syncRes.payload.city, 'Jamshedpur');
  assert.equal(syncRes.syncedNative, false);

  await setPersistentPrayerCountdownEnabled(true);
  assert.equal(isPersistentPrayerCountdownEnabled(), true);
  await setPersistentPrayerCountdownEnabled(false);
  assert.equal(isPersistentPrayerCountdownEnabled(), false);

  // Verify Android native files and registrations exist on disk
  const androidRoot = path.resolve(process.cwd(), 'android/app/src/main');
  const requiredAndroidFiles = [
    'java/com/ilmizo/tarbiyah/IlmizoPrayerWidgetProvider.java',
    'java/com/ilmizo/tarbiyah/IlmizoPrayerWidgetPlugin.java',
    'java/com/ilmizo/tarbiyah/IlmizoPrayerBootReceiver.java',
    'res/drawable/widget_prayer_bg.xml',
    'res/layout/widget_prayer_small.xml',
    'res/layout/widget_prayer_medium.xml',
    'res/xml/ilmizo_prayer_widget_small_info.xml',
    'res/xml/ilmizo_prayer_widget_medium_info.xml',
  ];
  for (const file of requiredAndroidFiles) {
    assert.ok(fs.existsSync(path.join(androidRoot, file)), `Missing Android native file: ${file}`);
  }
  const mainActivitySrc = fs.readFileSync(
    path.join(androidRoot, 'java/com/ilmizo/tarbiyah/MainActivity.java'),
    'utf-8'
  );
  assert.ok(mainActivitySrc.includes('IlmizoPrayerWidgetPlugin.class'));
  const manifestSrc = fs.readFileSync(path.join(androidRoot, 'AndroidManifest.xml'), 'utf-8');
  assert.ok(manifestSrc.includes('IlmizoPrayerWidgetProvider$Small'));
  assert.ok(manifestSrc.includes('IlmizoPrayerWidgetProvider$Medium'));
  assert.ok(manifestSrc.includes('IlmizoPrayerBootReceiver'));

  // Haptics safe web no-op and preference toggle
  assert.equal(isHapticsEnabled(), true);
  setHapticsEnabled(false);
  assert.equal(isHapticsEnabled(), false);
  await triggerSelectionHaptic();
  await triggerLightHaptic();
  await triggerSuccessHaptic();
});

test('Phase 20.8: Google Play Billing SKUs remain unchanged and 5 core languages have 100% key parity with RTL metadata', async () => {
  const skus = ILMIZO_PLAN_CATALOG.map((p) => p.sku);
  assert.ok(skus.includes('ilmizo_individual_99'));
  assert.ok(skus.includes('ilmizo_family_199'));
  assert.ok(skus.includes('ilmizo_lifetime_499'));

  const en = (await loadLanguageLabels('en')) as unknown as Record<string, string>;
  const enKeys = Object.keys(en);
  assert.ok(enKeys.length >= 80);

  for (const code of ['en', 'hi', 'ur', 'hinglish', 'ar'] as const) {
    const labels = (await loadLanguageLabels(code)) as unknown as Record<string, string>;
    const missing = enKeys.filter((k) => !labels[k]);
    assert.equal(missing.length, 0, `Language ${code} missing keys: ${missing.join(', ')}`);
  }

  const urMeta = SUPPORTED_LANGUAGES.find((l) => l.code === 'ur');
  const arMeta = SUPPORTED_LANGUAGES.find((l) => l.code === 'ar');
  assert.equal(urMeta?.dir, 'rtl');
  assert.equal(arMeta?.dir, 'rtl');
});
