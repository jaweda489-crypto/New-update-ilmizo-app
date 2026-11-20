import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import {
  ARABIC_LETTER_JOIN_FORMS,
  buildArabicLetterJoinPreview,
  NOORANI_QAIDA_COURSE_LESSONS,
  QAIDA_MODULES,
} from '../data/nooraniQaidaCourse';
import { KIDS_STORIES } from '../data/islamicContent';
import {
  getSpeechLangForUiLanguage,
  getStoryCoverArtwork,
  splitStoryPageIntoSentences,
  STORY_QURAN_VERSES_MAP,
} from '../services/storyArtworkAndAudio';
import {
  canAccessChildSlot,
  canAccessQaidaLesson,
  canAccessStoryIndex,
  canAccessVocabIndex,
  canAccessWordByWordHifzStudio,
  canAddCustomHifzPlan,
  canRecordFamilyStoryVoice,
  createParentGateChallenge,
  FREE_CUSTOM_HIFZ_LIMIT,
  FREE_VOCAB_LIMIT,
  getEffectiveEntitlement,
  getTrialStatus,
  ILMIZO_PLAN_CATALOG,
  isAdultPlusActive,
  isCoreWorshipFeatureAlwaysFree,
  isFamilyPlusActive,
  mapSkuToEntitlement,
  SEVEN_DAY_TRIAL_MS,
  startLocalSevenDayTrialPatch,
  verifyParentGateAnswer,
} from '../services/subscriptionEngine';
import { normalizePersistedMasterState } from '../context/IlmizoContext';
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
    streakDays: 5,
    lastRead: { surahNumber: 1, surahName: 'Al-Fatiha', ayahNumber: 1 },
    tasbihCount: 0,
    tasbihTotal: 0,
    activeDhikrIndex: 0,
    ...overrides,
  };
}

test('Phase 15 (1) Complete 17-Lesson Noorani Qaida Course covers 6 progressive modules with quizzes & 5-language support', () => {
  assert.equal(QAIDA_MODULES.length, 6);
  assert.equal(NOORANI_QAIDA_COURSE_LESSONS.length, 17);
  assert.equal(ARABIC_LETTER_JOIN_FORMS.length, 28);

  const seenNumbers = new Set<number>();
  for (const lesson of NOORANI_QAIDA_COURSE_LESSONS) {
    assert.ok(!seenNumbers.has(lesson.lessonNumber), `Duplicate lesson number ${lesson.lessonNumber}`);
    seenNumbers.add(lesson.lessonNumber);
    assert.ok(lesson.title.en && lesson.title.hi && lesson.title.ur && lesson.title.hinglish && lesson.title.ar);
    assert.ok(lesson.tiles.length >= 2, `Lesson ${lesson.lessonNumber} needs at least 2 drill tiles`);
    assert.ok(
      lesson.quiz.correctIndex >= 0 && lesson.quiz.correctIndex < lesson.quiz.options.length,
      `Lesson ${lesson.lessonNumber} has invalid quiz correctIndex`
    );
  }
});

test('Phase 15 (2) Arabic Letter Joiner accurately computes initial/medial/final & non-connector positions', () => {
  const bsm = buildArabicLetterJoinPreview(['ب', 'س', 'م']);
  assert.equal(bsm.joinedWord, 'بسم');
  assert.equal(bsm.slots[0].position, 'initial');
  assert.equal(bsm.slots[1].position, 'medial');
  assert.equal(bsm.slots[2].position, 'final');

  // Raa (ر) is a non-connector, so Baa after Raa remains isolated
  const rab = buildArabicLetterJoinPreview(['ر', 'ب']);
  assert.equal(rab.joinedWord, 'رب');
  assert.equal(rab.slots[0].connectsLeft, false);
  assert.equal(rab.slots[1].position, 'isolated');
});

test('Phase 15 (3) Every story in KIDS_STORIES maps to an existing compressed .webp cover & supports karaoke sentence splitting', () => {
  assert.ok(KIDS_STORIES.length >= 32);
  for (const story of KIDS_STORIES) {
    const coverPath = getStoryCoverArtwork(story);
    assert.ok(coverPath.startsWith('/assets/illustrations/') && coverPath.endsWith('.webp'));
    const diskPath = path.join(process.cwd(), 'public', coverPath);
    assert.equal(fs.existsSync(diskPath), true, `Missing story cover file: ${diskPath}`);
  }

  assert.ok(Object.keys(STORY_QURAN_VERSES_MAP).length >= 8);
  const sentences = splitStoryPageIntoSentences(
    'Prophet Nuh called his people patiently. Allah commanded him to build an Ark! Did believers board safely?'
  );
  assert.equal(sentences.length, 3);
  assert.equal(getSpeechLangForUiLanguage('hi'), 'hi-IN');
  assert.equal(getSpeechLangForUiLanguage('ur'), 'ur-PK');
  assert.equal(getSpeechLangForUiLanguage('ar'), 'ar-SA');
});

test('Phase 15 (4) Ethical Free Forever vs Family Plus gating & 7-day trial expiry lifecycle', () => {
  assert.equal(isCoreWorshipFeatureAlwaysFree(), true);
  assert.equal(ILMIZO_PLAN_CATALOG.length, 4);

  const freeUser = createBaseUser();
  assert.equal(isFamilyPlusActive(freeUser), false);
  assert.equal(canAccessChildSlot(freeUser, 0), true);
  assert.equal(canAccessChildSlot(freeUser, 1), false);
  assert.equal(canAccessQaidaLesson(freeUser, 1), true);
  assert.equal(canAccessQaidaLesson(freeUser, 3), true);
  assert.equal(canAccessQaidaLesson(freeUser, 4), false);
  assert.equal(canAccessStoryIndex(freeUser, 0), true);
  assert.equal(canAccessStoryIndex(freeUser, 5), true);
  assert.equal(canAccessStoryIndex(freeUser, 6), false);

  // Start 7-Day Free Trial
  const now = Date.now();
  const checkTime = now + 2 * 24 * 60 * 60 * 1000;
  const trialUser = createBaseUser(startLocalSevenDayTrialPatch(now));
  const activeTrialStatus = getTrialStatus(trialUser, checkTime);
  assert.equal(activeTrialStatus.isTrialActive, true);
  assert.equal(activeTrialStatus.daysRemaining, 5);
  assert.equal(getEffectiveEntitlement(trialUser, checkTime), 'family_199');
  assert.equal(isFamilyPlusActive(trialUser, checkTime), true);
  assert.equal(canAccessQaidaLesson(trialUser, 17, checkTime), true);
  assert.equal(canAccessStoryIndex(trialUser, 30, checkTime), true);
  assert.equal(canAccessChildSlot(trialUser, 4, checkTime), true);
  assert.equal(canAccessChildSlot(trialUser, 5, checkTime), false);

  // After 7 days expire, local trial reverts cleanly to free
  const afterExpiry = now + SEVEN_DAY_TRIAL_MS + 1000;
  assert.equal(getTrialStatus(trialUser, afterExpiry).isTrialActive, false);
  assert.equal(getEffectiveEntitlement(trialUser, afterExpiry), 'free');
  assert.equal(isFamilyPlusActive(trialUser, afterExpiry), false);

  // Lifetime stays unlocked permanently
  const lifetimeUser = createBaseUser({ entitlement: 'lifetime_499', subscriptionPurchaseSource: 'google_play' });
  assert.equal(isFamilyPlusActive(lifetimeUser, afterExpiry), true);
  assert.equal(mapSkuToEntitlement('ilmizo_family_199'), 'family_199');
  assert.equal(mapSkuToEntitlement('ilmizo_lifetime_499'), 'lifetime_499');
});

test('Phase 15 (5) Google Play Families Policy Parent Gate rejects wrong answers & accepts exact math product', () => {
  const challenge = createParentGateChallenge(12345);
  assert.equal(verifyParentGateAnswer(challenge, String(challenge.expectedAnswer)), true);
  assert.equal(verifyParentGateAnswer(challenge, String(challenge.expectedAnswer + 1)), false);
  assert.equal(verifyParentGateAnswer(challenge, ''), false);
  assert.equal(verifyParentGateAnswer(challenge, 'abc'), false);
});

test('Phase 15 (6) Qaida Lessons 3-14 include verified Quran.com single-word WBW MP3 paths', () => {
  const wbwRegex = /^wbw\/\d{3}_\d{3}_\d{3}\.mp3$/;
  let wbwCount = 0;
  for (const lesson of NOORANI_QAIDA_COURSE_LESSONS) {
    if (lesson.lessonNumber >= 3 && lesson.lessonNumber <= 14) {
      for (const tile of lesson.tiles) {
        assert.ok(
          tile.wbwWordPath && wbwRegex.test(tile.wbwWordPath),
          `Tile ${tile.id} in Lesson ${lesson.lessonNumber} missing valid wbwWordPath: ${tile.wbwWordPath}`
        );
        wbwCount += 1;
      }
    }
  }
  assert.ok(wbwCount >= 40);
});

test('Phase 15 (7) Fresh install enforces 1-child Free slot & Adult Quran Plus (₹99/yr) gates advanced tools across tiers', () => {
  const freshState = normalizePersistedMasterState(null);
  assert.equal(freshState.childrenProfiles.length, 1);
  assert.equal(canAccessChildSlot(freshState.user, freshState.childrenProfiles.length), false);

  const freeUser = createBaseUser();
  assert.equal(isAdultPlusActive(freeUser), false);
  assert.equal(canAccessVocabIndex(freeUser, 0), true);
  assert.equal(canAccessVocabIndex(freeUser, FREE_VOCAB_LIMIT - 1), true);
  assert.equal(canAccessVocabIndex(freeUser, FREE_VOCAB_LIMIT), false);
  assert.equal(canAccessWordByWordHifzStudio(freeUser), false);
  assert.equal(canAddCustomHifzPlan(freeUser, 0), true);
  assert.equal(canAddCustomHifzPlan(freeUser, FREE_CUSTOM_HIFZ_LIMIT), false);
  assert.equal(canRecordFamilyStoryVoice(freeUser), false);

  const adultPlusUser = createBaseUser({ entitlement: 'individual_99', subscriptionPurchaseSource: 'google_play' });
  assert.equal(isAdultPlusActive(adultPlusUser), true);
  assert.equal(isFamilyPlusActive(adultPlusUser), false);
  assert.equal(canAccessVocabIndex(adultPlusUser, FREE_VOCAB_LIMIT), true);
  assert.equal(canAccessWordByWordHifzStudio(adultPlusUser), true);
  assert.equal(canAddCustomHifzPlan(adultPlusUser, 10), true);
  assert.equal(canRecordFamilyStoryVoice(adultPlusUser), false);

  const familyUser = createBaseUser({ entitlement: 'family_199', subscriptionPurchaseSource: 'google_play' });
  assert.equal(isAdultPlusActive(familyUser), true);
  assert.equal(isFamilyPlusActive(familyUser), true);
  assert.equal(canRecordFamilyStoryVoice(familyUser), true);

  const lifetimeUser = createBaseUser({ entitlement: 'lifetime_499', subscriptionPurchaseSource: 'google_play' });
  assert.equal(isAdultPlusActive(lifetimeUser), true);
  assert.equal(isFamilyPlusActive(lifetimeUser), true);
  assert.equal(canRecordFamilyStoryVoice(lifetimeUser), true);
});

test('Phase 15 (8) Native Android Google Play Billing (BillingClient) plugin, MainActivity registration & Gradle dependency are wired', () => {
  const gradlePath = path.join(process.cwd(), 'android/app/build.gradle');
  const mainActivityPath = path.join(
    process.cwd(),
    'android/app/src/main/java/com/ilmizo/tarbiyah/MainActivity.java'
  );
  const pluginPath = path.join(
    process.cwd(),
    'android/app/src/main/java/com/ilmizo/tarbiyah/IlmizoBillingPlugin.java'
  );

  assert.equal(fs.existsSync(gradlePath), true);
  assert.equal(fs.existsSync(mainActivityPath), true);
  assert.equal(fs.existsSync(pluginPath), true);

  const gradleContent = fs.readFileSync(gradlePath, 'utf8');
  const mainActivityContent = fs.readFileSync(mainActivityPath, 'utf8');
  const pluginContent = fs.readFileSync(pluginPath, 'utf8');

  assert.ok(gradleContent.includes('com.android.billingclient:billing:'));
  assert.ok(mainActivityContent.includes('registerPlugin(IlmizoBillingPlugin.class)'));
  assert.ok(pluginContent.includes('@CapacitorPlugin(name = "IlmizoBilling")'));
  assert.ok(pluginContent.includes('ilmizo_individual_99'));
  assert.ok(pluginContent.includes('ilmizo_family_199'));
  assert.ok(pluginContent.includes('ilmizo_lifetime_499'));
});

