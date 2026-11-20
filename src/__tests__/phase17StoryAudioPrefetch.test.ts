import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { KIDS_STORIES } from '../data/islamicContent';
import {
  buildStoryAudioCacheKey,
  buildStoryPrefetchTasks,
  formatAudioCacheSizeMb,
  parseStoryAudioCacheKey,
  resolveApiEndpoint,
  resolveStoryPageHumanAudio,
} from '../services/storyAudioPrefetchService';
import {
  ALL_STORIES_PACK_COUNT,
  FREE_KIDS_STORY_LIMIT,
  canCacheSingleStoryOffline,
  canDownloadFullStoryLibraryAudioPack,
  startLocalSevenDayTrialPatch,
} from '../services/subscriptionEngine';
import type { LanguageCode, UserProfile } from '../types/ilmizo';

function createBaseUser(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    name: 'Aqib',
    city: 'Jamshedpur',
    country: 'India',
    language: 'en',
    darkMode: false,
    arabicFontScale: 2,
    entitlement: 'free',
    subscriptionPurchaseSource: 'none',
    streakDays: 3,
    lastRead: { surahNumber: 1, surahName: 'Al-Fatiha', ayahNumber: 1 },
    tasbihCount: 0,
    tasbihTotal: 0,
    activeDhikrIndex: 0,
    ...overrides,
  };
}

test('KIDS_STORIES contains 49 stories and buildStoryPrefetchTasks enumerates all 147 pages', () => {
  assert.equal(KIDS_STORIES.length, ALL_STORIES_PACK_COUNT);

  const languages: LanguageCode[] = ['en', 'hi', 'ur', 'hinglish', 'ar'];
  for (const lang of languages) {
    const tasks = buildStoryPrefetchTasks({
      stories: KIDS_STORIES,
      language: lang,
      voiceStyle: 'storyteller',
    });
    assert.equal(tasks.length, 147, `Expected 147 tasks for language=${lang}`);
    assert.equal(
      new Set(tasks.map((t) => t.cacheKey)).size,
      147,
      `Every task cacheKey for ${lang} must be unique`
    );
  }
});

test('buildStoryAudioCacheKey & parseStoryAudioCacheKey round-trip cleanly', () => {
  const key = buildStoryAudioCacheKey('prophet_nuh', 2, 'hinglish', 'teacher');
  assert.equal(key, 'story:prophet_nuh:p2:hinglish:teacher');
  assert.deepEqual(parseStoryAudioCacheKey(key), {
    storyId: 'prophet_nuh',
    pageIndex: 2,
    language: 'hinglish',
    voiceStyle: 'teacher',
  });
  assert.equal(parseStoryAudioCacheKey('invalid_key'), null);
});

test('formatAudioCacheSizeMb formats 0, sub-0.1 MB, and larger caches accurately', () => {
  assert.equal(formatAudioCacheSizeMb(0), '0.0 MB');
  assert.equal(formatAudioCacheSizeMb(42_000), '<0.1 MB');
  assert.equal(formatAudioCacheSizeMb(3.5 * 1024 * 1024), '3.5 MB');
});

test('resolveApiEndpoint normalizes relative API routes cleanly', () => {
  assert.equal(resolveApiEndpoint('/api/ai/story-audio'), '/api/ai/story-audio');
  assert.equal(resolveApiEndpoint('api/ai/story-audio'), '/api/ai/story-audio');
});

test('resolveStoryPageHumanAudio refuses robotic TTS fallback when offline and uncached', async () => {
  const originalNavigator = globalThis.navigator;
  let speechInvoked = false;
  (globalThis as Record<string, unknown>).speechSynthesis = {
    speak: () => {
      speechInvoked = true;
    },
  };
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { onLine: false },
  });

  try {
    const result = await resolveStoryPageHumanAudio({
      storyId: 'prophet_adam',
      pageIndex: 0,
      text: 'Prophet Adam (AS) was taught the names of all things.',
      language: 'en',
      voiceStyle: 'storyteller',
    });

    assert.equal(result.ok, false);
    assert.equal(result.offlineUncached, true);
    assert.ok(result.error && result.error.length > 10);
    assert.equal(speechInvoked, false, 'Must never invoke speechSynthesis in studio resolution');
  } finally {
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: originalNavigator,
    });
    delete (globalThis as Record<string, unknown>).speechSynthesis;
  }
});

test('Offline single-story caching and Full 49-Story Pack obey Free vs Family Plus entitlements', () => {
  const freeUser = createBaseUser();
  assert.equal(canDownloadFullStoryLibraryAudioPack(freeUser), false);
  for (let i = 0; i < FREE_KIDS_STORY_LIMIT; i++) {
    assert.equal(canCacheSingleStoryOffline(freeUser, i), true);
  }
  assert.equal(canCacheSingleStoryOffline(freeUser, FREE_KIDS_STORY_LIMIT), false);

  const trialUser = createBaseUser(startLocalSevenDayTrialPatch(Date.now()));
  assert.equal(canDownloadFullStoryLibraryAudioPack(trialUser), true);
  assert.equal(canCacheSingleStoryOffline(trialUser, 48), true);

  const lifetimeUser = createBaseUser({
    entitlement: 'lifetime_499',
    subscriptionPurchaseSource: 'google_play',
  });
  assert.equal(canDownloadFullStoryLibraryAudioPack(lifetimeUser), true);
});

test('KidsWorldView bypasses robotic TTS in studio mode and exposes 49-story offline manager', () => {
  const src = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/kids/KidsWorldView.tsx'),
    'utf8'
  );
  assert.match(src, /resolveStoryPageHumanAudio/);
  assert.match(src, /storyAudioPrefetchManager/);
  assert.match(src, /scheduleStoryReaderLookahead/);
  assert.match(src, /scheduleStarterStoriesWarmup/);
  assert.match(src, /allowTtsFallback:\s*false/);
  assert.match(src, /if\s*\(storyVoiceMode\s*===\s*'studio'\)\s*\{[\s\S]*?handleToggleStoryNarration/);
});
