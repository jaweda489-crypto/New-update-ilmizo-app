import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { TOP_QURAN_VOCAB } from '../data/islamicContent';
import {
  computeVocabCoverageStats,
  TOP_600_TARGET_COVERAGE_PCT,
} from '../data/ilmizoTop600Curriculum';
import {
  getMushafPageForSurahAyah,
  getMushafPageMeta,
  getMushafStartPageForSurah,
  JUZ_30_BOUNDARIES,
  MUSHAF_604_PAGES,
  MUSHAF_TOTAL_PAGES,
} from '../data/mushafPageMap';
import {
  computeKhatamTodayTarget,
  createDefaultKhatamState,
} from '../services/khatamPlannerService';
import { OEM_BATTERY_GUIDES } from '../components/adult/OemBatteryGuardSheet';

function readProjectFile(relPath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
}

test('Phase 25.1 — Ilmizo Top 600 Curriculum: frequency ordering, 81.64% coverage & PDF draft typo fixes', () => {
  assert.ok(TOP_QURAN_VOCAB.length >= 600, `Expected >= 600 words, got ${TOP_QURAN_VOCAB.length}`);

  // Frequency rank #1..#N must be strictly descending by occurrencesInQuran
  assert.equal(TOP_QURAN_VOCAB[0].frequencyRank, 1);
  assert.equal(TOP_QURAN_VOCAB[0].transliteration, 'Min');
  assert.equal(TOP_QURAN_VOCAB[0].occurrencesInQuran, 3226);

  for (let i = 1; i < 600; i++) {
    assert.equal(TOP_QURAN_VOCAB[i].frequencyRank, i + 1);
    assert.ok(
      TOP_QURAN_VOCAB[i - 1].occurrencesInQuran >= TOP_QURAN_VOCAB[i].occurrencesInQuran,
      `Rank #${i} (${TOP_QURAN_VOCAB[i - 1].occurrencesInQuran}) should be >= #${i + 1} (${TOP_QURAN_VOCAB[i].occurrencesInQuran})`
    );
  }

  // Word #600 cumulative coverage must hit 81.64%
  assert.equal(TOP_QURAN_VOCAB[599].cumulativeCoveragePct, TOP_600_TARGET_COVERAGE_PCT);

  // Verify all PDF draft typos were fixed
  const byTranslit = (name: string) =>
    TOP_QURAN_VOCAB.find((w) => w.transliteration.toLowerCase() === name.toLowerCase());

  const aflaha = byTranslit('Aflaha');
  assert.ok(aflaha, 'Aflaha must exist in Top 600 curriculum');
  assert.match(aflaha.meaning, /succeed|prosper/i);
  assert.equal(aflaha.exampleRef, '23:1');
  assert.match(aflaha.romanUrduMeaning || '', /kaamyab|falah/i);

  const fasiq = byTranslit('Fasiq');
  assert.ok(fasiq, 'Fasiq must exist');
  assert.equal(fasiq.exampleRef, '32:18');
  assert.match(fasiq.exampleTranslationRomanUrdu || '', /fasiq|nafarmani/i);

  const imraat = byTranslit("Imra'at");
  assert.ok(imraat, "Imra'at must exist");
  assert.equal(imraat.exampleRef, '12:30');

  const asa = TOP_QURAN_VOCAB.find((w) => w.id === 'ilm_fix_403');
  assert.ok(asa, 'Asa (Staff) must exist');
  assert.equal(asa.grammarType, 'Noun');
  assert.equal(asa.exampleRef, '20:18');

  const nadhir = byTranslit('Nadhir');
  assert.ok(nadhir, 'Nadhir must exist');
  assert.equal(nadhir.grammarType, 'Noun');

  // Live cumulative coverage stats computation
  const zeroStats = computeVocabCoverageStats(TOP_QURAN_VOCAB, []);
  assert.equal(zeroStats.coveragePct, 0);

  const top10Ids = TOP_QURAN_VOCAB.slice(0, 10).map((w) => w.id);
  const top10Stats = computeVocabCoverageStats(TOP_QURAN_VOCAB, top10Ids);
  assert.ok(top10Stats.coveragePct > 15, `Top 10 words should cover >15% of Quran, got ${top10Stats.coveragePct}%`);

  const top600Ids = TOP_QURAN_VOCAB.slice(0, 600).map((w) => w.id);
  const fullStats = computeVocabCoverageStats(TOP_QURAN_VOCAB, top600Ids);
  assert.equal(fullStats.coveragePct, TOP_600_TARGET_COVERAGE_PCT);
});

test('Phase 25.2 — Canonical 604-Page Madani Mushaf Map & 30 Juz Boundaries', () => {
  assert.equal(MUSHAF_TOTAL_PAGES, 604);
  assert.equal(MUSHAF_604_PAGES.length, 604);
  assert.equal(JUZ_30_BOUNDARIES.length, 30);

  // Page 1 is Al-Fatiha (Juz 1); Page 604 ends at An-Nas (Juz 30)
  const p1 = getMushafPageMeta(1);
  assert.equal(p1.page, 1);
  assert.equal(p1.juz, 1);
  assert.equal(p1.startSurah, 1);

  const p604 = getMushafPageMeta(604);
  assert.equal(p604.page, 604);
  assert.equal(p604.juz, 30);
  assert.equal(p604.endSurah, 114);
  assert.equal(p604.endAyah, 6);

  // Standard King Fahd Madani Mushaf landmark checks
  assert.equal(getMushafStartPageForSurah(1), 1);
  assert.equal(getMushafStartPageForSurah(2), 2);
  assert.equal(getMushafStartPageForSurah(18), 293); // Al-Kahf
  assert.equal(getMushafStartPageForSurah(36), 440); // Ya-Sin
  assert.equal(getMushafStartPageForSurah(67), 562); // Al-Mulk
  assert.equal(getMushafStartPageForSurah(78), 582); // An-Naba (Juz 30)
  assert.equal(getMushafStartPageForSurah(112), 604); // Al-Ikhlas

  assert.equal(getMushafPageForSurahAyah(18, 1), 293);
  assert.equal(getMushafPageForSurahAyah(114, 6), 604);
});

test('Phase 25.3 — Khatam-ul-Quran Goal Planner daily targets & guilt-free catch-up pace', () => {
  const fixedNow = new Date('2026-05-01T12:00:00');
  const plan30 = {
    ...createDefaultKhatamState(30),
    startDateIso: '2026-05-01',
  };
  const target30 = computeKhatamTodayTarget(plan30, fixedNow);
  assert.equal(target30.startPage, 1);
  assert.equal(target30.pagesTargetToday, 21); // ceil(604 / 30) = 21
  assert.equal(target30.endPage, 21);
  assert.equal(target30.isComplete, false);

  const plan90 = {
    ...createDefaultKhatamState(90),
    startDateIso: '2026-05-01',
  };
  const target90 = computeKhatamTodayTarget(plan90, fixedNow);
  assert.equal(target90.pagesTargetToday, 7); // ceil(604 / 90) = 7

  // Simulate user missing 10 days on a 30-day plan -> guilt-free recalculation over 20 remaining days
  const tenDaysLater = new Date('2026-05-11T12:00:00');
  const catchUp = computeKhatamTodayTarget(plan30, tenDaysLater);
  assert.equal(catchUp.daysRemaining, 20);
  assert.equal(catchUp.recalculatedPagesPerDay, 31); // ceil(604 / 20) = 31

  // Completing first 10 pages advances next target startPage to 11
  const progressedPlan = {
    ...plan90,
    completedPages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };
  const progressedTarget = computeKhatamTodayTarget(progressedPlan, fixedNow);
  assert.equal(progressedTarget.startPage, 11);
  assert.ok(progressedTarget.progressPct > 1.5);
});

test('Phase 25.4 — OEM Battery-Guard Wizard covers all major Android OEMs & wiring checks', () => {
  const oemIds = OEM_BATTERY_GUIDES.map((g) => g.id);
  for (const required of ['xiaomi', 'samsung', 'vivo', 'oppo_realme', 'oneplus', 'stock'] as const) {
    assert.ok(oemIds.includes(required), `Missing OEM battery guide for ${required}`);
  }
  for (const guide of OEM_BATTERY_GUIDES) {
    assert.ok(guide.steps.length >= 2, `${guide.brandLabel} should have at least 2 guided steps`);
  }

  // Verify wiring across core views
  const adultExtraSrc = readProjectFile('src/components/adult/AdultExtraScreens.tsx');
  assert.ok(adultExtraSrc.includes('QuranVocabMasteryView'), 'AdultExtraScreens must mount QuranVocabMasteryView');
  assert.ok(adultExtraSrc.includes('useSeniorMinimalMode'), 'AdultExtraScreens must expose Senior / Minimal Mode toggle');
  assert.ok(adultExtraSrc.includes('OemBatteryGuardSheet'), 'AdultExtraScreens must mount OemBatteryGuardSheet');

  const adultModeSrc = readProjectFile('src/components/adult/AdultModeView.tsx');
  assert.ok(adultModeSrc.includes('KhatamPlannerCard'), 'AdultModeView must mount KhatamPlannerCard');
  assert.ok(adultModeSrc.includes('seniorMinimalMode'), 'AdultModeView must support Senior / Minimal Mode Home');
  assert.ok(adultModeSrc.includes('openAyahInReminderStudio'), 'AdultModeView must support 1-tap Any-Ayah Reminder Card');
  assert.ok(adultModeSrc.includes('OemBatteryGuardSheet'), 'AdultModeView must mount OemBatteryGuardSheet in Salah');

  const mushafSrc = readProjectFile('src/components/adult/QuranMushafView.tsx');
  assert.ok(mushafSrc.includes('MUSHAF_TOTAL_PAGES'), 'QuranMushafView must integrate 604-page Mushaf map');
  assert.ok(mushafSrc.includes('useKhatamPlanner'), 'QuranMushafView must sync Mark Page Read with Khatam Planner');

  const specialSrc = readProjectFile('src/components/adult/SpecialModulesHub.tsx');
  assert.ok(specialSrc.includes('CAR_DRIVE_QUEUE_KEY'), 'SpecialModulesHub must persist Custom Car Drive Playlist');
  assert.ok(specialSrc.includes('autoAdvanceQueue'), 'SpecialModulesHub must support Auto-Play Next Surah in Queue');
  assert.ok(specialSrc.includes('any_ayah'), 'SpecialModulesHub must support Any Quran Ayah (6,236) Reminder Card mode');
});
