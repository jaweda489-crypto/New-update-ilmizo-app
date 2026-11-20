import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  ALL_114_SURAHS,
  getGlobalAyahOffsetForSurah,
  loadBundledFullSurahFromAssets,
} from '../data/quranData';
import {
  segmentArabicWordsWithTajweed,
  tokenizeAyahWithTajweedAndMeanings,
  resolveWbwWordAudioUrl,
  SurahWbwDictionary,
} from '../engines/tajweedAndWordMeaningEngine';
import {
  ADHAN_AUDIO_STREAMS,
  getCapacitorRuntimeStatus,
} from '../services/capacitorNativeBridge';
import {
  NOORANI_QAIDA_28_LETTERS,
  HUMAN_DUA_AUDIO_MAP,
  resolveDuaHumanAudio,
} from '../services/humanDuaAndQaidaAudio';
import {
  assessVoiceActivityMetrics,
  supportsArabicSpeechRecognition,
} from '../engines/kidsLearningEngines';
import {
  exportEncryptedSyncBundle,
  importEncryptedSyncBundle,
  issueParentTimeVoucher,
  verifyAndRedeemParentTimeVoucher,
} from '../services/familySyncEngine';
import { VERIFIED_DUAS } from '../data/islamicContent';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

test('Gap 4: Bundled offline Quran editions cover all 114 Surahs and 6,236 Ayahs without substitution', async () => {
  const editions = ['uthmani', 'en', 'hi', 'ur'] as const;
  const loadedFiles: Record<string, any> = {};

  for (const ed of editions) {
    const filePath = path.join(PUBLIC_DIR, 'data', `quran-${ed}.json`);
    assert.ok(fs.existsSync(filePath), `Missing bundled Quran edition file: quran-${ed}.json`);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    assert.equal(parsed.totalSurahs, 114);
    assert.equal(parsed.totalAyahs, 6236);
    assert.equal(Object.keys(parsed.surahs).length, 114);
    loadedFiles[ed] = parsed;
  }

  // Verify global offset math matches total 6,236 Ayahs
  const surah114Offset = getGlobalAyahOffsetForSurah(114);
  const surah114Meta = ALL_114_SURAHS.find((s) => s.number === 114)!;
  assert.equal(surah114Offset + surah114Meta.ayahCount, 6236);

  // Test loadBundledFullSurahFromAssets for previously unbundled Surahs (e.g. 2, 18, 36, 50, 114)
  const customLoader = async (k: 'uthmani' | 'en' | 'hi' | 'ur') => loadedFiles[k];

  const baqarah = await loadBundledFullSurahFromAssets(2, 'en', 'Alafasy', customLoader);
  assert.ok(baqarah);
  assert.equal(baqarah.ayahs.length, 286);
  assert.equal(baqarah.offlineSourceType, 'bundled_full');
  assert.equal(baqarah.ayahs[254].globalNumber, 262); // Ayat al-Kursi (2:255)

  const kahf = await loadBundledFullSurahFromAssets(18, 'hi', 'Alafasy', customLoader);
  assert.ok(kahf);
  assert.equal(kahf.ayahs.length, 110);
  assert.ok(kahf.ayahs[0].translations.hi && kahf.ayahs[0].translations.hi.length > 5);

  const qaf = await loadBundledFullSurahFromAssets(50, 'ur', 'Alafasy', customLoader);
  assert.ok(qaf);
  assert.equal(qaf.ayahs.length, 45);
  assert.ok(qaf.ayahs[0].translations.ur && qaf.ayahs[0].translations.ur.length > 5);

  // Confirm no Fatiha substitution on Surah 36 (Ya-Sin)
  const yasin = await loadBundledFullSurahFromAssets(36, 'en', 'Alafasy', customLoader);
  assert.ok(yasin);
  assert.equal(yasin.ayahs.length, 83);
  assert.ok(!yasin.ayahs[0].translations.en.includes('Praise be to Allah, Lord of the worlds'));
});

test('Gap 1: Bundled core WBW dictionary, per-word MP3 URL resolution, and letter-cluster Tajweed segmentation', () => {
  const wbwPath = path.join(PUBLIC_DIR, 'data', 'quran-wbw-core.json');
  assert.ok(fs.existsSync(wbwPath), 'Missing bundled quran-wbw-core.json');
  const wbwBundle = JSON.parse(fs.readFileSync(wbwPath, 'utf8')) as Record<
    string,
    SurahWbwDictionary
  >;

  // Covers Surah 1, 36, 67, and all 37 Surahs of Juz Amma (78..114) = 40 Surahs
  assert.ok(wbwBundle['1'] && wbwBundle['36'] && wbwBundle['67'] && wbwBundle['78'] && wbwBundle['114']);
  assert.equal(Object.keys(wbwBundle).length, 40);

  // Surah 36 Ayah 1-2 exact WBW check
  const yasinAyah2Wbw = wbwBundle['36'][2];
  assert.ok(Array.isArray(yasinAyah2Wbw) && yasinAyah2Wbw.length >= 2);
  const tokens = tokenizeAyahWithTajweedAndMeanings({
    arabicUthmani: 'وَٱلْقُرْءَانِ ٱلْحَكِيمِ',
    wbwAyahWords: yasinAyah2Wbw,
  });
  assert.equal(tokens[0].isExactDictionaryMatch, true);
  assert.ok(tokens[0].wordAudioUrl?.startsWith('https://audio.qurancdn.com/wbw/'));
  assert.equal(resolveWbwWordAudioUrl('wbw/036_002_001.mp3'), 'https://audio.qurancdn.com/wbw/036_002_001.mp3');

  // Honest fallback (zero translation slicing!) when offline and uncached unknown word is passed
  const unknownWordTokens = tokenizeAyahWithTajweedAndMeanings({
    arabicUthmani: 'مُدْهَامَّتَانِ',
    translations: {
      en: 'Dark green in color',
      hi: 'गहरे हरे रंग के',
      ur: 'گہرے سبز رنگ کے',
      hinglish: 'Gehre hare rang ke',
      ar: 'مدهامتان',
    },
  });
  assert.equal(unknownWordTokens[0].isExactDictionaryMatch, false);
  assert.ok(!unknownWordTokens[0].meanings.en.includes('Dark green'));
  assert.ok(unknownWordTokens[0].meanings.en.includes('Connect once'));

  // Cross-word Noon Sakinah Iqlab check: مِنْ بَعْدِ -> نْ followed by ب in next word
  const iqlabSegments = segmentArabicWordsWithTajweed(['مِنْ', 'بَعْدِ']);
  assert.ok(
    iqlabSegments[0].some((seg) => seg.ruleId === 'idgham_ikhfa' && seg.ruleNote?.includes('Iqlab'))
  );

  // Ghunnah + Qalqalah check in Surah Al-Ikhlas / Al-Masad
  const ghunnahSegments = segmentArabicWordsWithTajweed(['إِنَّا']);
  assert.ok(ghunnahSegments[0].some((seg) => seg.ruleId === 'ghunnah'));

  const qalqalahSukoon = segmentArabicWordsWithTajweed(['لَمْ', 'يَلِدْ']);
  assert.ok(qalqalahSukoon[1].some((seg) => seg.ruleId === 'qalqalah'));

  const qalqalahStop = segmentArabicWordsWithTajweed(['ٱللَّهُ', 'أَحَدٌ']);
  assert.ok(qalqalahStop[1].some((seg) => seg.ruleId === 'qalqalah'));
});

test('Gap 2: Authentic Adhan MP3s, Hisn al-Muslim Dua MP3s, and 28 local isolated Qaida letter MP3s', () => {
  // Adhan URLs must NOT be QuranCDN Ayah placeholders
  for (const stream of Object.values(ADHAN_AUDIO_STREAMS)) {
    assert.ok(!stream.mp3Url.includes('cdn.islamic.network/quran/audio'), `Adhan uses Quran Ayah placeholder: ${stream.mp3Url}`);
    assert.ok(stream.mp3Url.endsWith('.mp3'));
  }

  // Non-Quranic Masnoon Duas must use Hisn al-Muslim chapter MP3s, not Surah Al-Fatiha / Ayat al-Kursi
  const wakeDua = VERIFIED_DUAS.find((d) => d.id === 'dua_waking')!;
  const eatDua = VERIFIED_DUAS.find((d) => d.id === 'dua_before_eating')!;
  const sleepDua = VERIFIED_DUAS.find((d) => d.id === 'dua_sleep')!;
  assert.ok(resolveDuaHumanAudio(wakeDua).mp3Url.includes('hisnmuslim.com/audio/ar/'));
  assert.ok(resolveDuaHumanAudio(eatDua).mp3Url.includes('hisnmuslim.com/audio/ar/'));
  assert.ok(resolveDuaHumanAudio(sleepDua).mp3Url.includes('hisnmuslim.com/audio/ar/'));
  assert.notEqual(HUMAN_DUA_AUDIO_MAP.dua_before_eating.mp3Url, HUMAN_DUA_AUDIO_MAP.dua_sleep.mp3Url);

  // All 28 Qaida letters must point to existing local MP3 files under /public/assets/audio/qaida/
  assert.equal(NOORANI_QAIDA_28_LETTERS.length, 28);
  for (const letter of NOORANI_QAIDA_28_LETTERS) {
    assert.ok(letter.letterAudioMp3Url.startsWith('/assets/audio/qaida/'));
    const diskPath = path.join(PUBLIC_DIR, letter.letterAudioMp3Url.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Missing local Qaida letter MP3: ${diskPath}`);
    assert.ok(fs.statSync(diskPath).size > 2000, `Qaida MP3 suspiciously small: ${diskPath}`);
  }
});

test('Gap 3: Capacitor native runtime bridge & Android wrapper presence check', () => {
  const status = getCapacitorRuntimeStatus();
  assert.equal(status.appId, 'com.ilmizo.tarbiyah');
  assert.equal(status.platform, 'web');
  assert.equal(status.isNativeApp, false);
  const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'));
  assert.ok(pkg.dependencies['@capacitor/core']);
  assert.ok(pkg.dependencies['@capacitor/android']);
  assert.ok(pkg.dependencies['@capacitor/local-notifications']);
  assert.ok(fs.existsSync(path.resolve(process.cwd(), 'android', 'app', 'build.gradle')));
  assert.ok(
    fs.existsSync(
      path.resolve(process.cwd(), 'android', 'app', 'src', 'main', 'assets', 'capacitor.config.json')
    )
  );
});

test('Gap 5: Cross-platform Web Audio voice-activity feedback engine works without SpeechRecognition', () => {
  assert.equal(supportsArabicSpeechRecognition(), false);

  const tooShort = assessVoiceActivityMetrics([0.1, 0.2], 350);
  assert.equal(tooShort.hasClearVoiceActivity, false);
  assert.ok(tooShort.summary.includes('short'));

  const silent = assessVoiceActivityMetrics([0.005, 0.01, 0.008], 1800);
  assert.equal(silent.hasClearVoiceActivity, false);
  assert.ok(silent.summary.includes('low microphone'));

  const clearVoice = assessVoiceActivityMetrics([0.08, 0.14, 0.22, 0.11, 0.09], 2400);
  assert.equal(clearVoice.hasClearVoiceActivity, true);
  assert.ok(clearVoice.activeSpeechRatio >= 0.8);
});

test('Gap 6: Encrypted zero-cloud family sync (.ilmizo-sync) & single-use Parent Time Vouchers', async () => {
  const sampleBackup = JSON.stringify({
    schemaVersion: 2,
    exportedAtIso: new Date().toISOString(),
    app: 'ilmizo',
    user: { id: 'u1', name: 'Amina', mode: 'adult', language: 'en' },
    childrenProfiles: [],
  });

  const encRes = await exportEncryptedSyncBundle(sampleBackup, 'FamilySecret123');
  assert.equal(encRes.ok, true);
  assert.ok(encRes.encryptedContent);
  assert.ok(!encRes.encryptedContent.includes('Amina')); // Plaintext must not appear in encrypted bundle

  // Wrong passphrase fails
  const wrongPass = await importEncryptedSyncBundle(encRes.encryptedContent, 'WrongPass999');
  assert.equal(wrongPass.ok, false);

  // Tampered ciphertext fails
  const tampered = encRes.encryptedContent.replace(
    /"ciphertextB64":\s*"([^"]{6})/,
    '"ciphertextB64": "AAAAAA'
  );
  const tamperedRes = await importEncryptedSyncBundle(tampered, 'FamilySecret123');
  assert.equal(tamperedRes.ok, false);

  // Valid passphrase succeeds and restores exact JSON
  const okDecrypt = await importEncryptedSyncBundle(encRes.encryptedContent, 'FamilySecret123');
  assert.equal(okDecrypt.ok, true);
  assert.equal(okDecrypt.rawBackupJson, sampleBackup);

  // Single-use Parent Time Vouchers
  const signingKey = 'pbkdf2_sha256$100000$salthex$verifierhex';
  const issued = await issueParentTimeVoucher({
    action: 'grant_15m',
    childId: 'child_ayaan',
    signingKey,
  });
  assert.equal(issued.ok, true);
  assert.ok(issued.code?.startsWith('ILMZ-15M-'));

  // Wrong child rejects
  const wrongChild = await verifyAndRedeemParentTimeVoucher({
    code: issued.code!,
    childId: 'child_other',
    signingKey,
    usedVoucherIds: [],
  });
  assert.equal(wrongChild.ok, false);

  // Valid child succeeds first time
  const redeemed = await verifyAndRedeemParentTimeVoucher({
    code: issued.code!,
    childId: 'child_ayaan',
    signingKey,
    usedVoucherIds: [],
  });
  assert.equal(redeemed.ok, true);
  assert.equal(redeemed.action, 'grant_15m');

  // Replay with usedVoucherIds fails
  const replay = await verifyAndRedeemParentTimeVoucher({
    code: issued.code!,
    childId: 'child_ayaan',
    signingKey,
    usedVoucherIds: redeemed.nextUsedVoucherIds,
  });
  assert.equal(replay.ok, false);
  assert.ok(replay.error?.includes('already been redeemed'));
});

test('Phase 14 Optimization: Compressed WebP illustrations (<4 MB), lazy refs, and native res/raw Adhan WAV', () => {
  const illustrationsDir = path.join(PUBLIC_DIR, 'assets', 'illustrations');
  const entries = fs.readdirSync(illustrationsDir);

  assert.ok(entries.length >= 27, 'Expected 27 compressed WebP illustration assets');
  let totalBytes = 0;
  for (const name of entries) {
    assert.ok(name.endsWith('.webp'), `Uncompressed non-WebP asset found in illustrations: ${name}`);
    totalBytes += fs.statSync(path.join(illustrationsDir, name)).size;
  }
  assert.ok(
    totalBytes < 4 * 1024 * 1024,
    `Illustrations folder exceeds 4 MB budget: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`
  );

  // Confirm all src/ references to /assets/illustrations/ use .webp and exist on disk
  const componentFiles = [
    path.resolve(process.cwd(), 'src', 'components', 'adult', 'AdultDesignSystem.tsx'),
    path.resolve(process.cwd(), 'src', 'components', 'adult', 'AdultExtraScreens.tsx'),
    path.resolve(process.cwd(), 'src', 'components', 'adult', 'AdultModeView.tsx'),
    path.resolve(process.cwd(), 'src', 'components', 'kids', 'KidsWorldView.tsx'),
    path.resolve(process.cwd(), 'src', 'components', 'pwa', 'PWAComponents.tsx'),
  ];
  for (const file of componentFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/\/assets\/illustrations\/[a-zA-Z0-9_.-]+/g) || [];
    for (const ref of matches) {
      assert.ok(ref.endsWith('.webp'), `Non-WebP illustration reference in ${file}: ${ref}`);
      const rel = ref.replace(/^\//, '');
      assert.ok(fs.existsSync(path.join(PUBLIC_DIR, rel)), `Referenced illustration missing on disk: ${ref}`);
    }
  }

  // Confirm native Android res/raw/adhan_makkah.wav exists for notification channel sound
  const rawWavPath = path.resolve(
    process.cwd(),
    'android',
    'app',
    'src',
    'main',
    'res',
    'raw',
    'adhan_makkah.wav'
  );
  assert.ok(fs.existsSync(rawWavPath), 'Missing native Android res/raw/adhan_makkah.wav');
  assert.ok(fs.statSync(rawWavPath).size > 200_000, 'adhan_makkah.wav unexpectedly small');
});

test('Play Store Readiness: AndroidManifest permissions, custom notification icon, signing config & Privacy Policy', () => {
  const manifestPath = path.resolve(process.cwd(), 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
  const manifest = fs.readFileSync(manifestPath, 'utf8');
  for (const perm of [
    'android.permission.INTERNET',
    'android.permission.POST_NOTIFICATIONS',
    'android.permission.SCHEDULE_EXACT_ALARM',
    'android.permission.RECEIVE_BOOT_COMPLETED',
    'android.permission.RECORD_AUDIO',
    'android.permission.ACCESS_FINE_LOCATION',
  ]) {
    assert.ok(manifest.includes(perm), `AndroidManifest.xml missing permission: ${perm}`);
  }

  const notifIconPath = path.resolve(
    process.cwd(),
    'android',
    'app',
    'src',
    'main',
    'res',
    'drawable',
    'ic_stat_ilmizo_crescent.xml'
  );
  assert.ok(fs.existsSync(notifIconPath), 'Missing ic_stat_ilmizo_crescent.xml notification icon');

  const iconBgXml = fs.readFileSync(
    path.resolve(process.cwd(), 'android', 'app', 'src', 'main', 'res', 'values', 'ic_launcher_background.xml'),
    'utf8'
  );
  assert.ok(iconBgXml.includes('#0F3826'), 'Expected #0F3826 emerald launcher background');

  const buildGradle = fs.readFileSync(path.resolve(process.cwd(), 'android', 'app', 'build.gradle'), 'utf8');
  assert.ok(buildGradle.includes('signingConfigs'), 'Missing release signingConfigs in build.gradle');
  assert.ok(buildGradle.includes('keystore.properties'), 'Expected keystore.properties support in build.gradle');
  assert.ok(
    fs.existsSync(path.resolve(process.cwd(), 'android', 'keystore.properties.example')),
    'Missing android/keystore.properties.example'
  );

  const privacyPath = path.join(PUBLIC_DIR, 'privacy-policy.html');
  assert.ok(fs.existsSync(privacyPath), 'Missing public/privacy-policy.html');
  const privacyHtml = fs.readFileSync(privacyPath, 'utf8');
  assert.ok(privacyHtml.includes('com.ilmizo.tarbiyah') && privacyHtml.includes('Zero Ads'));

  const colorsXmlPath = path.resolve(
    process.cwd(),
    'android',
    'app',
    'src',
    'main',
    'res',
    'values',
    'colors.xml'
  );
  assert.ok(fs.existsSync(colorsXmlPath), 'Missing android/app/src/main/res/values/colors.xml');
  assert.ok(fs.readFileSync(colorsXmlPath, 'utf8').includes('#0F3826'));

  const ghWorkflowPath = path.resolve(
    process.cwd(),
    '.github',
    'workflows',
    'android-release.yml'
  );
  assert.ok(fs.existsSync(ghWorkflowPath), 'Missing .github/workflows/android-release.yml');
  const ghWorkflow = fs.readFileSync(ghWorkflowPath, 'utf8');
  assert.ok(ghWorkflow.includes('bundleRelease') && ghWorkflow.includes('assembleDebug'));

  assert.ok(
    fs.existsSync(path.resolve(process.cwd(), 'store-listing', 'play_store_icon_512x512.png')),
    'Missing store-listing/play_store_icon_512x512.png'
  );
  assert.ok(
    fs.existsSync(
      path.resolve(process.cwd(), 'store-listing', 'play_store_feature_graphic_1024x500.png')
    ),
    'Missing store-listing/play_store_feature_graphic_1024x500.png'
  );
});



