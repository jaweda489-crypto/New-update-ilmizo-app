import test from 'node:test';
import assert from 'node:assert/strict';
import { audioManager } from '../services/audioManager';
import {
  INITIAL_NAVIGATION_HISTORY_STATE,
  canNavigateBack,
  popNavigationHistory,
  pushAdultRoute,
  pushKidsRoute,
  transitionMode,
} from '../engines/navigationHistoryEngine';
import { applyChildStoryCompletion } from '../engines/kidsLearningEngines';
import { normalizePersistedMasterState } from '../context/IlmizoContext';
import { ChildProfile } from '../types/ilmizo';

const createTestChild = (overrides?: Partial<ChildProfile>): ChildProfile => ({
  id: 'child-1',
  name: 'Ayaan',
  age: 8,
  avatar: 'Ayaan',
  stars: 20,
  streakDays: 2,
  dailyGoalMinutes: 20,
  activeMinutesToday: 5,
  completedSurahs: ['Surah Al-Ikhlas'],
  completedStoryIds: [],
  pillarProgress: {
    quranLessons: 3,
    duasPracticed: 2,
    salahLessons: 3,
    akhlaqDeeds: 1,
  },
  earnedBadgeIds: ['first_surah'],
  unlockedAdventureNode: 2,
  questStepsCompleted: {
    quran: false,
    dua: false,
    quiz: false,
    salah: false,
    family: false,
  },
  needsPractice: [],
  goodDeeds: [],
  recentActivities: [],
  ...overrides,
});

test('Phase 5.1 — AudioManager: starts in idle state with repeat disabled and never autoplays on initialization', () => {
  audioManager.setMuted(false);
  audioManager.stopAll();

  const state = audioManager.getState();
  assert.equal(state.status, 'idle');
  assert.equal(state.activeKind, null);
  assert.equal(state.activeTrackId, null);
  assert.equal(state.repeatEnabled, false);
});

test('Phase 5.2 — AudioManager: invokes registered external cleanups (e.g., mic recording) when stopAll() is called', () => {
  let cleanupCalls = 0;
  const unregister = audioManager.registerExternalCleanup(() => {
    cleanupCalls += 1;
  });

  audioManager.stopAll();
  assert.equal(cleanupCalls, 1);

  unregister();
  audioManager.stopAll();
  assert.equal(cleanupCalls, 1);
});

test('Phase 5.3 — AudioManager: blocks audio and speech playback when muted and only enables repeat when explicitly toggled', () => {
  audioManager.setMuted(true);
  assert.equal(audioManager.getState().isMuted, true);

  audioManager.playAudioUrl({
    id: 'ayah-1-1',
    url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
  });
  assert.equal(audioManager.getState().status, 'idle');
  assert.equal(audioManager.getState().activeTrackId, null);

  audioManager.speakText({
    id: 'story-nuh-p0',
    text: 'Prophet Nuh built the ark with patience.',
  });
  assert.equal(audioManager.getState().status, 'idle');
  assert.equal(audioManager.getState().activeTrackId, null);

  audioManager.setMuted(false);
  assert.equal(audioManager.getState().repeatEnabled, false);
  audioManager.setRepeatEnabled(true);
  assert.equal(audioManager.getState().repeatEnabled, true);
  audioManager.setRepeatEnabled(false);
  assert.equal(audioManager.getState().repeatEnabled, false);
});

test('Phase 5.4 — NavigationHistoryEngine: AdultHome -> Quran -> Back -> AdultHome & AdultHome -> Hifz -> Back -> AdultHome', () => {
  let state = INITIAL_NAVIGATION_HISTORY_STATE;
  assert.equal(canNavigateBack(state), false);

  state = pushAdultRoute(state, 'quran_read');
  assert.equal(state.adultRoute, 'quran_read');
  assert.deepEqual(state.adultHistory, ['home']);
  assert.equal(canNavigateBack(state), true);

  const poppedQuran = popNavigationHistory(state);
  assert.equal(poppedQuran.adultRoute, 'home');
  assert.deepEqual(poppedQuran.adultHistory, []);

  // AdultHome -> Hifz -> Back -> AdultHome
  state = pushAdultRoute(poppedQuran, 'hifz');
  assert.equal(state.adultRoute, 'hifz');
  assert.deepEqual(state.adultHistory, ['home']);

  const poppedHifz = popNavigationHistory(state);
  assert.equal(poppedHifz.adultRoute, 'home');
});

test('Phase 5.5 — NavigationHistoryEngine: AdultHome -> More -> Duas -> Back -> More -> Back -> AdultHome & KidsHome -> Stories -> Back -> KidsHome', () => {
  let state = INITIAL_NAVIGATION_HISTORY_STATE;
  state = pushAdultRoute(state, 'more');
  state = pushAdultRoute(state, 'duas');
  assert.equal(state.adultRoute, 'duas');
  assert.deepEqual(state.adultHistory, ['home', 'more']);

  // Duplicate consecutive push is ignored
  state = pushAdultRoute(state, 'duas');
  assert.deepEqual(state.adultHistory, ['home', 'more']);

  const backToMore = popNavigationHistory(state);
  assert.equal(backToMore.adultRoute, 'more');
  assert.deepEqual(backToMore.adultHistory, ['home']);

  const backToHome = popNavigationHistory(backToMore);
  assert.equal(backToHome.adultRoute, 'home');
  assert.deepEqual(backToHome.adultHistory, []);

  // KidsHome -> Stories -> Back -> KidsHome
  let kidsState = transitionMode(backToHome, 'kids');
  assert.equal(kidsState.mode, 'kids');
  assert.equal(kidsState.kidsRoute, 'kids_home');

  kidsState = pushKidsRoute(kidsState, 'stories');
  assert.equal(kidsState.kidsRoute, 'stories');
  assert.deepEqual(kidsState.kidsHistory, ['kids_home']);

  const backToKidsHome = popNavigationHistory(kidsState);
  assert.equal(backToKidsHome.kidsRoute, 'kids_home');
  assert.deepEqual(backToKidsHome.kidsHistory, []);
});

test('Phase 5.6 — NavigationHistoryEngine: never bypasses Parent Hub PIN protection when switching modes or navigating back', () => {
  let state = INITIAL_NAVIGATION_HISTORY_STATE;
  state = pushAdultRoute(state, 'more');
  state = transitionMode(state, 'parent');
  assert.equal(state.mode, 'parent');
  assert.equal(state.parentHubUnlocked, false);

  // Simulate unlocking Parent Hub with PIN
  state = { ...state, parentHubUnlocked: true };
  assert.equal(state.parentHubUnlocked, true);

  // Navigating back from Parent Hub must return to previous mode AND lock Parent Hub again
  const backFromParent = popNavigationHistory(state);
  assert.equal(backFromParent.mode, 'adult');
  assert.equal(backFromParent.adultRoute, 'more');
  assert.equal(backFromParent.parentHubUnlocked, false);

  // Re-entering Parent Hub must still require PIN
  const reEnterParent = transitionMode(backFromParent, 'parent');
  assert.equal(reEnterParent.parentHubUnlocked, false);
});

test('Phase 5.7 — Kids Story Completion: awards +5 stars only on first completion of a story and 0 stars on subsequent rereads', () => {
  const child = createTestChild({ stars: 20, completedStoryIds: [] });

  // First completion of story_nuh
  const firstResult = applyChildStoryCompletion(
    child,
    'story_nuh',
    'Prophet Nuh & The Great Ark',
    '2026-10-30'
  );
  assert.equal(firstResult.alreadyCompleted, false);
  assert.equal(firstResult.starsAwarded, 5);
  assert.equal(firstResult.updatedChild.stars, 25);
  assert.deepEqual(firstResult.updatedChild.completedStoryIds, ['story_nuh']);
  assert.equal(firstResult.updatedChild.pillarProgress.akhlaqDeeds, 2);

  // Second completion (reread) of story_nuh
  const secondResult = applyChildStoryCompletion(
    firstResult.updatedChild,
    'story_nuh',
    'Prophet Nuh & The Great Ark',
    '2026-10-30'
  );
  assert.equal(secondResult.alreadyCompleted, true);
  assert.equal(secondResult.starsAwarded, 0);
  assert.equal(secondResult.updatedChild.stars, 25);
  assert.deepEqual(secondResult.updatedChild.completedStoryIds, ['story_nuh']);
  assert.equal(secondResult.updatedChild.pillarProgress.akhlaqDeeds, 2);

  // Completing a different story (story_honest_boy) awards +5 stars
  const thirdResult = applyChildStoryCompletion(
    secondResult.updatedChild,
    'story_honest_boy',
    'The Boy Who Always Spoke the Truth',
    '2026-10-30'
  );
  assert.equal(thirdResult.alreadyCompleted, false);
  assert.equal(thirdResult.starsAwarded, 5);
  assert.equal(thirdResult.updatedChild.stars, 30);
  assert.deepEqual(thirdResult.updatedChild.completedStoryIds, [
    'story_nuh',
    'story_honest_boy',
  ]);
});

test('Phase 5.8 — Persisted State Normalization: defaults autoPlayRecitation to false and preserves isMuted & completedStoryIds', () => {
  const normalized = normalizePersistedMasterState({
    user: {
      name: 'Aqib',
      isMuted: true,
    } as any,
    childrenProfiles: [createTestChild({ completedStoryIds: ['story_nuh'] })],
  });

  assert.equal(normalized.user.autoPlayRecitation, false);
  assert.equal(normalized.user.isMuted, true);
  assert.deepEqual(normalized.childrenProfiles[0].completedStoryIds, ['story_nuh']);
});
