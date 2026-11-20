import test from 'node:test';
import assert from 'node:assert/strict';
import { ILMIZO_PLAN_CATALOG } from '../services/subscriptionEngine';
import { EXPANDED_KIDS_STORIES } from '../data/expandedIslamicLibrary';
import { EXPANDED_QURAN_VOCAB_300 } from '../data/expandedVocabAndQuiz';
import { TOP_QURAN_VOCAB } from '../data/islamicContent';
import { NOORANI_QAIDA_COURSE_LESSONS } from '../data/nooraniQaidaCourse';
import {
  buildQaidaMasteryQuiz,
  evaluateQaidaMasteryResult,
  QAIDA_MASTERY_PASS_PERCENT,
  QAIDA_MASTERY_QUESTION_COUNT,
} from '../services/qaidaMasteryQuizEngine';
import { buildInteractiveStorybook } from '../services/interactiveStorybookEngine';
import {
  buildDailyTarbiyahPlan,
  buildWeeklyTarbiyahReport,
  generateWeeklyProgressCardSvg,
} from '../services/dailyTarbiyahPlanEngine';
import { getStoryCoverArtwork, getStorySceneArtwork } from '../services/storyArtworkAndAudio';
import { ChildProfile } from '../types/ilmizo';

const MOCK_CHILD: ChildProfile = {
  id: 'child_test_19',
  name: 'Ayaan',
  age: 7,
  avatar: 'Ayaan',
  dailyGoalMinutes: 10,
  activeMinutesToday: 6,
  stars: 85,
  streakDays: 5,
  lastActiveDateKey: '2026-11-18',
  completedStoryIds: ['story_nuh', 'story_honest_boy'],
  completedQaidaLessonIds: [
    NOORANI_QAIDA_COURSE_LESSONS[0].id,
    NOORANI_QAIDA_COURSE_LESSONS[1].id,
  ],
  questStepsCompleted: {
    quran: true,
    dua: false,
    quiz: false,
    salah: false,
    family: false,
  },
  pillarProgress: {
    quranLessons: 2,
    duasPracticed: 8,
    salahLessons: 3,
    akhlaqDeeds: 4,
  },
  unlockedAdventureNode: 2,
  needsPractice: [],
  goodDeeds: [
    {
      id: 'gd1',
      title: 'Helped set the dinner table',
      description: 'Helped parents before Maghrib dinner',
      childReportedAt: '2026-11-18T12:00:00.000Z',
      parentConfirmed: true,
    },
  ],
  earnedBadgeIds: [],
  completedSurahs: [],
  recentActivities: [],
};

test('Phase 19.1 — Paywall Honesty: plan catalog numbers strictly match actual verified library counts (600+ vocab, 49 stories)', () => {
  assert.ok(EXPANDED_QURAN_VOCAB_300.length >= 300, 'Expected >= 300 base Quranic vocab words');
  assert.ok(TOP_QURAN_VOCAB.length >= 600, `Expected >= 600 verified Quranic vocab words, got ${TOP_QURAN_VOCAB.length}`);
  assert.equal(EXPANDED_KIDS_STORIES.length, 49, 'Expected 49 Kids stories');

  const catalogJson = JSON.stringify(ILMIZO_PLAN_CATALOG);
  assert.ok(!catalogJson.includes('48 '), 'Catalog must report exact 49 stories, not 48');
  assert.ok(catalogJson.includes('600+'), 'Catalog should honestly state 600+ core Quranic words');
  assert.ok(catalogJson.includes('49'), 'Catalog should honestly state 49 interactive stories');
});

test('Phase 19.2 — Noorani Qaida 5Q Audio Recognition Mastery Quiz covers all 17 lessons deterministically', () => {
  for (const lesson of NOORANI_QAIDA_COURSE_LESSONS) {
    const quiz = buildQaidaMasteryQuiz(lesson, 123);
    assert.equal(quiz.lessonId, lesson.id);
    assert.equal(quiz.questions.length, QAIDA_MASTERY_QUESTION_COUNT);
    assert.equal(quiz.passingScorePercent, QAIDA_MASTERY_PASS_PERCENT);

    for (const q of quiz.questions) {
      assert.ok(q.options.length >= 2, `Lesson ${lesson.lessonNumber} Q${q.questionIndex} must have options`);
      assert.ok(
        q.correctIndex >= 0 && q.correctIndex < q.options.length,
        `Valid correctIndex for ${q.id}`
      );
      assert.ok(q.audio.arabicText.length > 0, `Audio Arabic target present for ${q.id}`);
    }
  }

  // Lesson 1 must include pure audio-first letter recognition questions with bundled MP3 slugs
  const l1Quiz = buildQaidaMasteryQuiz(1, 99);
  const audioFirstQs = l1Quiz.questions.filter((q) => q.kind === 'audio_recognition');
  assert.equal(audioFirstQs.length, 4);
  for (const q of audioFirstQs) {
    assert.ok(q.audio.letterAudioSlug, 'Lesson 1 audio question must reference bundled human letter MP3 slug');
  }

  // Pass/Fail threshold check (4/5 = 80% passes, 3/5 = 60% fails)
  assert.equal(evaluateQaidaMasteryResult({ correctCount: 4, totalQuestions: 5 }).passed, true);
  assert.equal(evaluateQaidaMasteryResult({ correctCount: 3, totalQuestions: 5 }).passed, false);
});

test('Phase 19.3 — Multi-Scene Interactive Storybooks expand all 49 stories to 6 scenes with moral choice & varied artwork', () => {
  const uniqueCovers = new Set<string>();

  for (const story of EXPANDED_KIDS_STORIES) {
    uniqueCovers.add(getStoryCoverArtwork(story));
    const book = buildInteractiveStorybook(story, 'hinglish');
    assert.equal(book.totalScenes, 6, `Story ${story.id} must have 6 interactive scenes`);
    assert.equal(book.scenes.length, 6);

    const choiceScene = book.scenes[2];
    assert.ok(choiceScene.interactiveChoice, `Story ${story.id} Scene 3 must have an interactive moral choice`);
    assert.equal(choiceScene.interactiveChoice.options.length, 2);
    assert.equal(
      choiceScene.interactiveChoice.options.filter((o) => o.isBestChoice).length,
      1,
      'Moral choice must have 1 clear best Islamic choice'
    );

    // Verify scene artwork varies across scenes
    const scene0Art = getStorySceneArtwork(story, 0);
    const scene1Art = getStorySceneArtwork(story, 1);
    assert.notEqual(scene0Art, scene1Art, `Story ${story.id} should vary illustration across scenes`);
  }

  assert.ok(
    uniqueCovers.size >= 12,
    `Expected >= 12 distinct story cover illustrations after adding new gouache art, got ${uniqueCovers.size}`
  );
});

test('Phase 19.4 — Daily 10-Minute Guided Tarbiyah Plan & WhatsApp Weekly Progress Card SVG generation', () => {
  const plan = buildDailyTarbiyahPlan({
    child: MOCK_CHILD,
    language: 'hinglish',
    dateKey: '2026-11-18',
    hasFamilyPlus: false,
  });

  assert.equal(plan.totalMinutes, 10);
  assert.equal(plan.steps.length, 3);
  // Child completed L1 and L2, so next Qaida step must point directly to Lesson 3
  assert.equal(plan.steps[0].recommendedItemId, NOORANI_QAIDA_COURSE_LESSONS[2].id);
  assert.ok(plan.steps[0].title.includes('Lesson 3'));
  // Child finished story_nuh and story_honest_boy, so next story must be an unread unlocked story
  assert.notEqual(plan.steps[1].recommendedItemId, 'story_nuh');
  assert.notEqual(plan.steps[1].recommendedItemId, 'story_honest_boy');

  const report = buildWeeklyTarbiyahReport(MOCK_CHILD);
  assert.equal(report.qaidaCompletedCount, 2);
  assert.equal(report.storiesCompletedCount, 2);
  assert.ok(report.whatsappShareText.includes('Ayaan'));
  assert.ok(report.whatsappShareText.includes('2 / 17'));

  const svg = generateWeeklyProgressCardSvg(report);
  assert.ok(svg.startsWith('<?xml version="1.0"'));
  assert.ok(svg.includes('MashaAllah, Ayaan!'));
  assert.ok(svg.includes('2/17'));
  assert.ok(svg.includes('2/49'));
});
