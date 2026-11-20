import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { NOORANI_QAIDA_COURSE_LESSONS } from '../data/nooraniQaidaCourse';
import {
  buildQaidaSyllableCacheKey,
  buildStoryAudioCacheKey,
  buildWbwAudioCacheKey,
  collectAllQaidaWbwPaths,
} from '../services/studioAudioAndTajweedService';
import {
  FREE_DAILY_AI_TAJWEED_LIMIT,
  TOP_STORIES_PACK_COUNT,
  canDownloadTopStoriesAudioPack,
  canUseAiTajweedCheck,
  recordAiTajweedUsagePatch,
  startLocalSevenDayTrialPatch,
} from '../services/subscriptionEngine';
import { UserProfile } from '../types/ilmizo';

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

test('Free daily AI Tajweed quota enforces 2/day limit and resets cleanly on next day', () => {
  const today = '2026-11-15';
  const tomorrow = '2026-11-16';
  let user = createBaseUser();

  assert.equal(FREE_DAILY_AI_TAJWEED_LIMIT, 2);

  const q0 = canUseAiTajweedCheck(user, today);
  assert.equal(q0.allowed, true);
  assert.equal(q0.remaining, 2);

  user = { ...user, ...recordAiTajweedUsagePatch(user, today) };
  const q1 = canUseAiTajweedCheck(user, today);
  assert.equal(q1.allowed, true);
  assert.equal(q1.remaining, 1);

  user = { ...user, ...recordAiTajweedUsagePatch(user, today) };
  const q2 = canUseAiTajweedCheck(user, today);
  assert.equal(q2.allowed, false);
  assert.equal(q2.remaining, 0);

  // Resets next calendar date
  const qNext = canUseAiTajweedCheck(user, tomorrow);
  assert.equal(qNext.allowed, true);
  assert.equal(qNext.remaining, 2);
});

test('Adult Quran Plus (₹99), Family Plus (₹199), and Lifetime get unlimited AI Tajweed checks', () => {
  const today = '2026-11-15';
  const usage = { dateKey: today, count: 15 };

  for (const entitlement of ['individual_99', 'family_199', 'lifetime_499'] as const) {
    const user = createBaseUser({
      entitlement,
      subscriptionPurchaseSource: 'google_play',
      aiTajweedUsage: usage,
    });
    const q = canUseAiTajweedCheck(user, today);
    assert.equal(q.allowed, true);
    assert.equal(q.limit, null);
  }
});

test('Top 10 offline Storyteller Audio pack is gated for Free and unlocked during Trial / Family Plus', () => {
  assert.equal(TOP_STORIES_PACK_COUNT, 10);
  const freeUser = createBaseUser();
  assert.equal(canDownloadTopStoriesAudioPack(freeUser), false);

  const trialUser = createBaseUser(startLocalSevenDayTrialPatch(Date.now()));
  assert.equal(canDownloadTopStoriesAudioPack(trialUser), true);

  const familyUser = createBaseUser({
    entitlement: 'family_199',
    subscriptionPurchaseSource: 'google_play',
  });
  assert.equal(canDownloadTopStoriesAudioPack(familyUser), true);
});

test('collectAllQaidaWbwPaths extracts unique Quran.com single-word MP3 paths from Lessons 3-14', () => {
  const paths = collectAllQaidaWbwPaths(NOORANI_QAIDA_COURSE_LESSONS);
  assert.ok(paths.length >= 40, `Expected >= 40 unique WBW MP3 paths, got ${paths.length}`);
  assert.equal(new Set(paths).size, paths.length, 'Paths must be deduplicated');
  assert.ok(paths.every((p) => p.startsWith('wbw/') && p.endsWith('.mp3')));

  assert.equal(
    buildStoryAudioCacheKey('prophet_nuh', 0, 'hinglish', 'storyteller'),
    'story:prophet_nuh:p0:hinglish:storyteller'
  );
  assert.equal(buildQaidaSyllableCacheKey('بَ'), 'qaida_syl:بَ');
  assert.equal(buildWbwAudioCacheKey('wbw/001_001_001.mp3'), 'wbw:wbw/001_001_001.mp3');
});

test('server.ts defines Gemini 3.8 TTS & Gemini 4 Hydrogen Tajweed routes with no deprecated models', () => {
  const serverSrc = fs.readFileSync(path.resolve(process.cwd(), 'server.ts'), 'utf8');
  assert.match(serverSrc, /\/api\/ai\/story-audio/);
  assert.match(serverSrc, /\/api\/ai\/qaida-syllable/);
  assert.match(serverSrc, /\/api\/ai\/tajweed-check/);
  assert.match(serverSrc, /gemini-3\.8-flash-tts/);
  assert.match(serverSrc, /gemini-3\.8-flash-lite-tts/);
  assert.match(serverSrc, /gemini-4-hydrogen/);
  assert.doesNotMatch(serverSrc, /gemini-1\.5|gemini-2\.0/);
});
