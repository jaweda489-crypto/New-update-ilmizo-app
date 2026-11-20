import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  ALL_114_SURAHS,
  BUNDLED_SURAH_AYAHS,
  VERIFIED_RECITER_EDITIONS,
  resolveReciterConfig,
} from '../data/quranData';
import { SurahMeta, SurahPayload } from '../types/ilmizo';
import {
  TOTAL_QURAN_SURAHS,
  TOTAL_QURAN_AYAHS,
  OFFLINE_QURAN_PACKAGE_VERSION,
  computeSurahChecksumSha256,
  verifySurahIntegrity,
  verifyInstalledOfflineQuran,
  searchOfflineQuran,
  QuranOfflineDownloadManager,
} from '../services/quranOfflineManager';
import {
  SUPPORTED_QARI_RECITERS,
  OFFLINE_QARI_MISSING_MESSAGE,
  getGlobalAyahNumber,
  verifySurahQariAudioIntegrity,
  resolveQariAyahAudioSource,
  QariAudioDownloadManager,
} from '../services/audioDownloadManager';
import {
  getOfflineSurahFromDb,
  saveOfflineSurahToDb,
  deleteAllDownloadedOfflineSurahs,
} from '../services/localDatabase';
import { audioManager } from '../services/audioManager';

/**
 * Helper: Build a deterministic, canonically valid SurahPayload for any Surah 1..114
 * with exact Ayah count and Arabic + English + Hindi + Urdu translations for offline testing.
 */
function buildCanonicalTestSurahPayload(surahMeta: SurahMeta): SurahPayload {
  const ayahs = Array.from({ length: surahMeta.ayahCount }, (_, idx) => {
    const ayahNum = idx + 1;
    const isAyatAlKursi = surahMeta.number === 2 && ayahNum === 255;
    const isFatihah = surahMeta.number === 1 && BUNDLED_SURAH_AYAHS[1]?.[idx];
    return {
      numberInSurah: ayahNum,
      globalNumber: getGlobalAyahNumber(surahMeta.number, ayahNum),
      juzNumber: surahMeta.juz,
      pageNumber: 1,
      arabicUthmani: isFatihah
        ? BUNDLED_SURAH_AYAHS[1][idx].arabicUthmani
        : isAyatAlKursi
        ? 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ'
        : `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ آيَة ${surahMeta.number}:${ayahNum}`,
      transliteration: isAyatAlKursi
        ? 'Allahu la ilaha illa Huwal-Hayyul-Qayyum'
        : `Ayah ${surahMeta.number}:${ayahNum} transliteration`,
      translations: {
        en: isAyatAlKursi
          ? 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence.'
          : `English Sahih International translation for Surah ${surahMeta.nameTranslit} (${surahMeta.number}:${ayahNum})`,
        hi: `हिंदी अनुवाद सूरह ${surahMeta.nameTranslit} (${surahMeta.number}:${ayahNum})`,
        ur: `اردو ترجمہ سورۃ ${surahMeta.nameTranslit} (${surahMeta.number}:${ayahNum})`,
      },
      tafsirBrief: `Verified reflection on Surah ${surahMeta.nameTranslit} (${surahMeta.number}:${ayahNum}).`,
    };
  });

  return {
    meta: surahMeta,
    ayahs,
    offlineSourceType: 'downloaded_idb',
    offlineUnavailable: false,
    isPartialOfflineBundle: false,
    verification: {
      source: 'Tanzil / AlQuran Cloud Verified Multi-Edition Package',
      edition: 'quran-uthmani + en.sahih + hi.hindi + ur.jalandhry',
      reference: `Surah ${surahMeta.number} (${surahMeta.nameTranslit}) · 1-${surahMeta.ayahCount}`,
      language: 'Multi (Arabic, English, Hindi, Urdu)',
      version: OFFLINE_QURAN_PACKAGE_VERSION,
      reviewer: 'Ilmizo Sharia & Text Verification Registry',
      status: 'Verified',
    },
  };
}

test('Phase 5A.1 — Canonical 114 Surahs and 6,236 Ayahs metadata integrity', () => {
  assert.equal(ALL_114_SURAHS.length, TOTAL_QURAN_SURAHS);
  assert.equal(TOTAL_QURAN_SURAHS, 114);
  assert.equal(TOTAL_QURAN_AYAHS, 6236);

  const totalAyahsSum = ALL_114_SURAHS.reduce((sum, s) => sum + s.ayahCount, 0);
  assert.equal(totalAyahsSum, 6236, 'Sum of all 114 Surah ayahCount must equal exactly 6,236');

  // Verify specific canonical Surah Ayah counts required by the Phase 5A specification
  const expectedCounts: Record<number, number> = {
    1: 7,     // Al-Fatihah
    2: 286,   // Al-Baqarah
    18: 110,  // Al-Kahf
    36: 83,   // Ya-Sin
    55: 78,   // Ar-Rahman
    67: 30,   // Al-Mulk
    112: 4,   // Al-Ikhlas
    114: 6,   // An-Nas
  };

  for (const [surahNumStr, expectedCount] of Object.entries(expectedCounts)) {
    const surahNum = Number(surahNumStr);
    const meta = ALL_114_SURAHS.find((s) => s.number === surahNum);
    assert.ok(meta, `Surah ${surahNum} must exist in ALL_114_SURAHS`);
    assert.equal(
      meta.ayahCount,
      expectedCount,
      `Surah ${surahNum} (${meta.nameTranslit}) must have ${expectedCount} Ayahs`
    );
  }
});

test('Phase 5A.2 — Anti-Substitution & SHA-256 Surah Integrity Validation', async () => {
  const yaSinMeta = ALL_114_SURAHS.find((s) => s.number === 36)!;
  const fatihahMeta = ALL_114_SURAHS.find((s) => s.number === 1)!;

  const validYaSin = buildCanonicalTestSurahPayload(yaSinMeta);
  const checksum = await computeSurahChecksumSha256(validYaSin);
  assert.equal(checksum.length, 64, 'SHA-256 hex digest must be 64 characters');

  const validCheck = await verifySurahIntegrity(36, validYaSin, {
    expectedChecksum: checksum,
    requiredLanguages: ['en', 'hi', 'ur'],
  });
  assert.equal(validCheck.valid, true);
  assert.equal(validCheck.actualAyahCount, 83);

  // Anti-substitution test: Attempt to substitute Surah 1 (7 Ayahs) when Surah 36 (83 Ayahs) is expected
  const fatihah = buildCanonicalTestSurahPayload(fatihahMeta);
  const substitutionAttempt1 = await verifySurahIntegrity(36, fatihah);
  assert.equal(substitutionAttempt1.valid, false);
  assert.match(substitutionAttempt1.errors.join(' '), /CRITICAL INTEGRITY FAILURE/);

  // Even if someone spoofs meta = Ya-Sin on Al-Fatihah's 7 Ayahs, both Ayah count and anti-substitution checks reject it
  const spoofedNumberSurah: SurahPayload = {
    ...fatihah,
    meta: yaSinMeta,
  };
  const substitutionAttempt2 = await verifySurahIntegrity(36, spoofedNumberSurah);
  assert.equal(substitutionAttempt2.valid, false);
  assert.match(substitutionAttempt2.errors.join(' '), /Ayah count mismatch|CRITICAL INTEGRITY FAILURE/);

  // Checksum tamper detection: Modify a single character in Ayah 1 and verify checksum mismatch is caught
  const tamperedYaSin: SurahPayload = {
    ...validYaSin,
    ayahs: validYaSin.ayahs.map((a, idx) =>
      idx === 0
        ? { ...a, translations: { ...a.translations, en: 'TAMPERED TRANSLATION TEXT' } }
        : a
    ),
  };
  const tamperCheck = await verifySurahIntegrity(36, tamperedYaSin, {
    expectedChecksum: checksum,
  });
  assert.equal(tamperCheck.valid, false);
  assert.equal(tamperCheck.corrupted, true);
  assert.match(tamperCheck.errors.join(' '), /Checksum mismatch/i);
});

test('Phase 5A.3 — Complete 114-Surah / 6,236-Ayah Offline Package Download, Verification & Tamper Detection', async () => {
  await deleteAllDownloadedOfflineSurahs();

  const manager = new QuranOfflineDownloadManager();
  const dlResult = await manager.downloadFullOfflineQuran({
    language: 'en',
    customFetcher: async (meta) => buildCanonicalTestSurahPayload(meta),
  });

  assert.equal(dlResult.ok, true);
  assert.equal(dlResult.completedSurahs, 114);
  assert.equal(dlResult.completedAyahs, 6236);
  assert.equal(dlResult.report.isComplete114, true, 'All 114 Surahs must be verified');
  assert.equal(dlResult.report.totalSurahsVerified, 114);
  assert.equal(dlResult.report.totalAyahsVerified, 6236);
  assert.equal(dlResult.report.missingSurahNumbers.length, 0);
  assert.equal(dlResult.report.corruptedSurahNumbers.length, 0);
  assert.equal(dlResult.report.packageVersion, OFFLINE_QURAN_PACKAGE_VERSION);
  assert.equal(dlResult.report.packageChecksumSha256.length, 64);

  // Verify any Surah can be loaded offline across languages (en, hi, ur)
  const baqarahEn = await getOfflineSurahFromDb(2, 'en');
  assert.ok(baqarahEn, 'Surah 2 (Al-Baqarah) must be stored in local DB');
  assert.equal(baqarahEn.payload.ayahs.length, 286);
  assert.ok(baqarahEn.checksumSha256);

  const kahfHi = await getOfflineSurahFromDb(18, 'hi');
  assert.ok(kahfHi, 'Surah 18 (Al-Kahf) must resolve for Hindi from multi-language offline record');
  assert.equal(kahfHi.payload.ayahs.length, 110);

  // Simulate post-download corruption of Surah 67 in IndexedDB and verify verifyInstalledOfflineQuran flags it
  const mulkRecord = await getOfflineSurahFromDb(67, 'en');
  assert.ok(mulkRecord);
  const corruptedMulk: SurahPayload = {
    ...mulkRecord.payload,
    ayahs: mulkRecord.payload.ayahs.slice(0, 15), // truncated from 30 to 15 Ayahs
  };
  await saveOfflineSurahToDb(67, 'en', corruptedMulk, true, {
    checksumSha256: mulkRecord.checksumSha256,
    packageVersion: OFFLINE_QURAN_PACKAGE_VERSION,
  });

  const postTamperReport = await verifyInstalledOfflineQuran();
  assert.equal(postTamperReport.isComplete114, false);
  assert.ok(
    postTamperReport.corruptedSurahNumbers.includes(67),
    'Corrupted Surah 67 must be flagged in corruptedSurahNumbers'
  );

  // Re-download Surah 67 to repair it and re-verify
  await manager.downloadSurahBatch({
    surahNumbers: [67],
    language: 'en',
    skipAlreadyVerified: false,
    customFetcher: async (meta) => buildCanonicalTestSurahPayload(meta),
  });
  const repairedReport = await verifyInstalledOfflineQuran();
  assert.equal(repairedReport.isComplete114, true);
  assert.equal(repairedReport.totalAyahsVerified, 6236);
});

test('Phase 5A.4 — Offline Quran Search across Arabic, Translations, Surah Names & Surah:Ayah References', async () => {
  // Search by exact Surah:Ayah reference (2:255 - Ayat al-Kursi)
  const refMatches = await searchOfflineQuran('2:255', 'en');
  assert.ok(refMatches.length >= 1, 'Search for 2:255 must return Ayat al-Kursi');
  assert.equal(refMatches[0].surahNumber, 2);
  assert.equal(refMatches[0].ayahNumberInSurah, 255);
  assert.equal(refMatches[0].matchedField, 'reference');

  // Search by English translation phrase
  const englishMatches = await searchOfflineQuran('Ever-Living', 'en');
  assert.ok(
    englishMatches.some((m) => m.surahNumber === 2 && m.ayahNumberInSurah === 255),
    'Offline search must match English translation text'
  );

  // Search by Arabic Uthmani phrase
  const arabicMatches = await searchOfflineQuran('الْحَيُّ الْقَيُّومُ', 'en');
  assert.ok(
    arabicMatches.some((m) => m.surahNumber === 2 && m.ayahNumberInSurah === 255),
    'Offline search must match Arabic Uthmani text'
  );

  // Search by Hindi translation phrase
  const hindiMatches = await searchOfflineQuran('हिंदी अनुवाद सूरह Al-Kahf', 'hi');
  assert.ok(
    hindiMatches.some((m) => m.surahNumber === 18),
    'Offline search must match Hindi translation text'
  );
});

test('Phase 5B.1 — Verified Qari Reciters & Canonical Global Ayah Number Mapping (1..6236)', () => {
  assert.equal(SUPPORTED_QARI_RECITERS.length, 4);
  assert.equal(VERIFIED_RECITER_EDITIONS.length, 4);

  const alafasy = resolveReciterConfig('Mishary Rashid Alafasy');
  assert.equal(alafasy.editionId, 'ar.alafasy');

  const abdulBasit = resolveReciterConfig('Abdul Basit Abdus Samad');
  assert.equal(abdulBasit.editionId, 'ar.abdulbasitmurattal');

  const sudais = resolveReciterConfig('Abdur-Rahman as-Sudais');
  assert.equal(sudais.editionId, 'ar.abdurrahmaansudais');

  const husary = resolveReciterConfig('Mahmoud Khalil Al-Husary');
  assert.equal(husary.editionId, 'ar.husary');

  // Verify global Ayah numbers (1..6236)
  assert.equal(getGlobalAyahNumber(1, 1), 1);
  assert.equal(getGlobalAyahNumber(1, 7), 7);
  assert.equal(getGlobalAyahNumber(2, 1), 8);
  assert.equal(getGlobalAyahNumber(2, 255), 262); // Ayat al-Kursi
  assert.equal(getGlobalAyahNumber(114, 6), 6236); // Last Ayah of the Quran
});

test('Phase 5B.2 — Offline Qari Audio Download, Integrity Verification & No Silent Robotic TTS Fallback', async () => {
  const audioDlManager = new QariAudioDownloadManager();
  await audioDlManager.deleteAllQariAudio();

  // 1. Before downloading: when offline (isOnline = false), requesting Qari audio must fail honestly
  // with the exact required message and NEVER fall back to robotic TTS.
  const missingOfflineCheck = await resolveQariAyahAudioSource({
    surahNumber: 108, // Al-Kawthar (3 Ayahs)
    ayahNumberInSurah: 1,
    reciterName: 'Mishary Rashid Alafasy',
    isOnline: false,
  });

  assert.equal(missingOfflineCheck.available, false);
  assert.equal(missingOfflineCheck.source, 'unavailable_offline');
  assert.equal(missingOfflineCheck.errorMessage, OFFLINE_QARI_MISSING_MESSAGE);
  assert.equal(
    missingOfflineCheck.errorMessage,
    "Audio for this Surah is not downloaded for offline playback. Connect to the internet or download this Qari's audio."
  );

  // Also test audioManager.playQariRecitationAyah when offline & not downloaded
  const playMissingResult = await audioManager.playQariRecitationAyah({
    id: 'test-offline-missing-qari',
    surahNumber: 108,
    ayahNumberInSurah: 1,
    reciterName: 'Mishary Rashid Alafasy',
    isOnline: false,
  });
  assert.equal(playMissingResult.ok, false);
  assert.equal(playMissingResult.error, OFFLINE_QARI_MISSING_MESSAGE);
  assert.equal(audioManager.getState().errorMessage, OFFLINE_QARI_MISSING_MESSAGE);

  // 2. Download Surah 108 (Al-Kawthar, 3 Ayahs) for Mishary Rashid Alafasy
  const dlRes = await audioDlManager.downloadSurahQariAudio({
    surahNumber: 108,
    reciterName: 'Mishary Rashid Alafasy',
    customAudioFetcher: async (url) => ({
      dataUrl: `data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQxAADBz9Ux2P/${encodeURIComponent(
        url
      )}`,
      sizeBytes: 24576,
    }),
  });
  assert.equal(dlRes.ok, true);
  assert.ok(dlRes.record, 'Downloaded Qari audio record must be returned');
  assert.equal(dlRes.record.editionId, 'ar.alafasy');
  assert.equal(dlRes.record.surahNumber, 108);
  assert.equal(Object.keys(dlRes.record.ayahAudioUrls).length, 3);
  assert.ok(dlRes.record.checksumSha256 && dlRes.record.checksumSha256.length === 64);

  const integrity = await verifySurahQariAudioIntegrity(108, 'ar.alafasy', dlRes.record);
  assert.equal(integrity.valid, true);

  // 3. Now when offline (isOnline = false), Surah 108 resolves from 'offline_downloaded'
  const downloadedOfflineCheck = await resolveQariAyahAudioSource({
    surahNumber: 108,
    ayahNumberInSurah: 2,
    reciterName: 'Mishary Rashid Alafasy',
    isOnline: false,
  });
  assert.equal(downloadedOfflineCheck.available, true);
  assert.equal(downloadedOfflineCheck.source, 'offline_downloaded');
  assert.ok((downloadedOfflineCheck.url || '').startsWith('data:audio/mpeg;base64,'));

  // 4. Verify storage summary and deletion
  const summaryBeforeDelete = await audioDlManager.getInstalledAudioSummary();
  assert.ok(summaryBeforeDelete.totalBytes > 0);
  assert.deepEqual(summaryBeforeDelete.byReciter['ar.alafasy']?.surahNumbers, [108]);

  await audioDlManager.deleteSurahQariAudio(108, 'Mishary Rashid Alafasy');
  const summaryAfterDelete = await audioDlManager.getInstalledAudioSummary();
  assert.equal(summaryAfterDelete.totalBytes, 0);
});

test('Phase 5C — PWA Manifest & Icons Verification', () => {
  const manifestPath = path.resolve(process.cwd(), 'public/manifest.json');
  assert.equal(fs.existsSync(manifestPath), true, 'public/manifest.json must exist');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  assert.equal(manifest.short_name, 'Ilmizo');
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.background_color, '#FDFBF7');
  assert.equal(manifest.theme_color, '#0F3826');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 3);

  const has192 = manifest.icons.some((i: any) => i.sizes === '192x192');
  const has512 = manifest.icons.some((i: any) => i.sizes === '512x512' && i.purpose === 'any');
  const hasMaskable = manifest.icons.some((i: any) => i.purpose === 'maskable');
  assert.equal(has192, true, 'Manifest must include 192x192 icon');
  assert.equal(has512, true, 'Manifest must include 512x512 icon');
  assert.equal(hasMaskable, true, 'Manifest must include maskable icon');

  // Verify icon files exist in /public
  for (const icon of manifest.icons) {
    const iconFile = path.resolve(process.cwd(), 'public', icon.src.replace(/^\//, ''));
    assert.equal(fs.existsSync(iconFile), true, `Icon asset ${icon.src} must exist in /public`);
  }
});
