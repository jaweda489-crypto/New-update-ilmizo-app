import assert from 'node:assert/strict';
import test from 'node:test';
import {
  aggregateKidsProgressByPeriod,
  applyChildQuestCompletion,
  evaluateChildBadgesAndMilestones,
  scoreKidsArabicRecitationMatch,
} from '../engines/kidsLearningEngines';
import { ChildProfile, LearningEvent } from '../types/ilmizo';

function createSampleChild(): ChildProfile {
  return {
    id: 'child_ayaan',
    name: 'Ayaan',
    age: 7,
    avatar: 'Ayaan',
    dailyGoalMinutes: 10,
    activeMinutesToday: 4,
    stars: 20,
    streakDays: 5,
    questStepsCompleted: {
      quran: false,
      dua: false,
      quiz: false,
      salah: false,
      family: false,
    },
    pillarProgress: {
      quranLessons: 1,
      duasPracticed: 4,
      salahLessons: 1,
      akhlaqDeeds: 0,
    },
    unlockedAdventureNode: 2,
    needsPractice: [],
    goodDeeds: [],
    earnedBadgeIds: ['badge_quran'],
    completedSurahs: ['Surah Al-Ikhlas'],
    recentActivities: [],
  };
}

test('Phase 3.1: applyChildQuestCompletion records newly mastered Surahs and unlocks badges', () => {
  const child = createSampleChild();

  // Practicing 5th Dua should unlock 'badge_dua'
  const afterDua = applyChildQuestCompletion(child, 'dua', 'Practiced Dua Before Eating');
  assert.equal(afterDua.updatedChild.pillarProgress.duasPracticed, 5);
  assert.ok(afterDua.updatedChild.earnedBadgeIds.includes('badge_dua'));

  // Completing 4 more Surahs should add normalized Surah names and unlock 'badge_5surahs'
  let current = afterDua.updatedChild;
  for (const s of ['Al-Kawthar', 'Surah Al-Fatiha', 'Al-Asr', 'Al-Falaq']) {
    current = applyChildQuestCompletion(current, 'quran', `Recited ${s}`, s).updatedChild;
  }
  assert.equal(current.completedSurahs.length, 5);
  assert.ok(current.completedSurahs.includes('Surah Al-Kawthar'));
  assert.ok(current.earnedBadgeIds.includes('badge_5surahs'));
});

test('Phase 3.2: aggregateKidsProgressByPeriod computes real Week/Month/All Time metrics without fake multipliers', () => {
  const child = createSampleChild();
  const now = new Date('2026-10-30T12:00:00Z');
  const events: LearningEvent[] = [
    {
      id: 'ev1',
      type: 'quran_ayah_read',
      mode: 'kids',
      childId: 'child_ayaan',
      referenceId: 'kids_quran_112',
      title: 'Surah Al-Ikhlas',
      dateKey: '2026-10-29',
      timestampIso: '2026-10-29T10:00:00Z',
    },
    {
      id: 'ev2',
      type: 'quran_ayah_read',
      mode: 'kids',
      childId: 'child_ayaan',
      referenceId: 'kids_quran_108',
      title: 'Surah Al-Kawthar',
      dateKey: '2026-10-10', // > 7 days ago, within 30 days
      timestampIso: '2026-10-10T10:00:00Z',
    },
  ];

  const weekStats = aggregateKidsProgressByPeriod({
    child,
    learningEvents: events,
    period: 'Week',
    now,
  });
  const monthStats = aggregateKidsProgressByPeriod({
    child,
    learningEvents: events,
    period: 'Month',
    now,
  });

  assert.equal(weekStats.quranCount, 1);
  assert.equal(monthStats.quranCount, 2);
});

test('Phase 3.3: scoreKidsArabicRecitationMatch normalizes diacritics and scores Arabic stem match', () => {
  const target = 'قُلْ هُوَ ٱللَّهُ أَحَدٌ';
  const spoken = 'قل هو الله احد';
  const res = scoreKidsArabicRecitationMatch(target, spoken);
  assert.equal(res.percentage, 100);
  assert.equal(res.ratingSuggestion, 'clear');
});

test('Phase 3.4: evaluateChildBadgesAndMilestones unlocks Kind Heart on parent-confirmed Good Deed', () => {
  const child: ChildProfile = {
    ...createSampleChild(),
    goodDeeds: [
      {
        id: 'gd1',
        title: 'Helped set the table',
        description: 'Done at dinner',
        childReportedAt: 'Today',
        parentConfirmed: true,
      },
    ],
  };
  const res = evaluateChildBadgesAndMilestones(child);
  assert.ok(res.earnedBadgeIds.includes('badge_kind'));
});
