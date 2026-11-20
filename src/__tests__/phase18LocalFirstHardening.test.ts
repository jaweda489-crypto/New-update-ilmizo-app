import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import {
  applyValidatedImportWithRecovery,
  createBackupBundle,
  validateAndPreviewBackupJson,
} from '../services/backupRestoreEngine';
import {
  hydrateOrMigrateMasterState,
  PersistedMasterState,
} from '../services/localDatabase';
import {
  buildUnifiedAudioManifest,
} from '../services/audioManifestService';
import {
  playHumanDuaAudio,
} from '../services/humanDuaAndQaidaAudio';
import {
  resolveStoryPageHumanAudio,
  verifyAudioBlobIntegrity,
} from '../services/storyAudioPrefetchService';
import { playStoryQuranVerse } from '../services/storyArtworkAndAudio';
import { analyzeRecitationWithAiTajweed } from '../services/studioAudioAndTajweedService';
import {
  computeEntitlementProofSync,
  getEffectiveEntitlement,
  reconcileGooglePlayEntitlements,
  startLocalSevenDayTrialPatch,
} from '../services/subscriptionEngine';
import type { UserProfile } from '../types/ilmizo';

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
    streakDays: 4,
    lastRead: { surahNumber: 1, surahName: 'Al-Fatiha', ayahNumber: 1 },
    tasbihCount: 12,
    tasbihTotal: 250,
    activeDhikrIndex: 0,
    ...overrides,
  };
}

function minimalNormalizer(raw: Partial<PersistedMasterState> | null): PersistedMasterState {
  const baseUser = createBaseUser();
  return {
    schemaVersion: 2,
    user: { ...baseUser, ...(raw?.user || {}) },
    dailyVerseActivity: raw?.dailyVerseActivity || { dateKey: '2026-11-15', ayahKeys: [] },
    learningEvents: Array.isArray(raw?.learningEvents) ? raw.learningEvents : [],
    studiedNames99Numbers: Array.isArray(raw?.studiedNames99Numbers) ? raw.studiedNames99Numbers : [],
    recentlyOpenedSurahs: Array.isArray(raw?.recentlyOpenedSurahs) ? raw.recentlyOpenedSurahs : [1],
    bookmarks: Array.isArray(raw?.bookmarks) ? raw.bookmarks : [],
    personalNotes: Array.isArray(raw?.personalNotes) ? raw.personalNotes : [],
    hifzPlans: Array.isArray(raw?.hifzPlans) ? raw.hifzPlans : [],
    revisionItems: Array.isArray(raw?.revisionItems) ? raw.revisionItems : [],
    salahRecords: raw?.salahRecords && typeof raw.salahRecords === 'object' ? raw.salahRecords : {},
    favoriteDuaIds: Array.isArray(raw?.favoriteDuaIds) ? raw.favoriteDuaIds : [],
    seerahMilestoneIds: Array.isArray(raw?.seerahMilestoneIds) ? raw.seerahMilestoneIds : [],
    completedLessonIds: Array.isArray(raw?.completedLessonIds) ? raw.completedLessonIds : [],
    masteredVocabIds: Array.isArray(raw?.masteredVocabIds) ? raw.masteredVocabIds : [],
    quizAttempts: Array.isArray(raw?.quizAttempts) ? raw.quizAttempts : [],
    tasks: Array.isArray(raw?.tasks) ? raw.tasks : [],
    expenses: Array.isArray(raw?.expenses) ? raw.expenses : [],
    childrenProfiles: Array.isArray(raw?.childrenProfiles) ? raw.childrenProfiles : [],
    activeChildId: raw?.activeChildId || 'child_ayaan',
  };
}

test('Phase 18 (1) Startup hydration guard & localDatabase recovery protections', () => {
  const ctxSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/context/IlmizoContext.tsx'), 'utf8');
  assert.match(ctxSrc, /hasHydratedFromDbRef/);
  assert.match(ctxSrc, /if\s*\(!hasHydratedFromDbRef\.current\)\s*return;/);
  assert.match(ctxSrc, /requestPersistentLocalStorage/);

  const dbSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/services/localDatabase.ts'), 'utf8');
  assert.match(dbSrc, /tx\.oncomplete/);
  assert.match(dbSrc, /db\.onclose\s*=/);
  assert.match(dbSrc, /pre_import_latest/);
});

test('Phase 18 (2) Audio blob integrity verification rejects HTML/JSON error stubs and truncated files', async () => {
  const validWav = new Uint8Array(64);
  // RIFF....WAVE
  validWav.set([0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45], 0);
  const wavCheck = await verifyAudioBlobIntegrity(new Blob([validWav], { type: 'audio/wav' }));
  assert.equal(wavCheck.valid, true);
  assert.ok(wavCheck.checksumSha256 && wavCheck.checksumSha256.length >= 8);

  const validMp3 = new Uint8Array(64);
  validMp3.set([0x49, 0x44, 0x33, 0x03, 0x00], 0); // ID3
  const mp3Check = await verifyAudioBlobIntegrity(new Blob([validMp3], { type: 'audio/mpeg' }));
  assert.equal(mp3Check.valid, true);

  const htmlErrorBlob = new Blob(
    ['<!DOCTYPE html><html><body>502 Bad Gateway Error Page With Padding</body></html>'],
    { type: 'text/html' }
  );
  const htmlCheck = await verifyAudioBlobIntegrity(htmlErrorBlob);
  assert.equal(htmlCheck.valid, false);

  const tinyBlob = new Blob([new Uint8Array(12)], { type: 'audio/wav' });
  const tinyCheck = await verifyAudioBlobIntegrity(tinyBlob);
  assert.equal(tinyCheck.valid, false);
});

test('Phase 18 (3) Unified Audio Manifest reports complete offline metadata & bundled/downloadable status', async () => {
  const manifest = await buildUnifiedAudioManifest({ language: 'en', includeUninstalled: true });
  assert.equal(manifest.summary.bundledQaidaLetters, 28);
  assert.equal(manifest.summary.totalStoryPages, 147);
  assert.ok(manifest.summary.totalUniqueDuaTracks >= 20);
  assert.ok(manifest.entries.length > 150);

  const bundledEntry = manifest.entries.find((e) => e.contentType === 'qaida_letter');
  assert.ok(bundledEntry);
  assert.equal(bundledEntry.downloadStatus, 'bundled');
  assert.equal(bundledEntry.verificationStatus, 'verified');
  assert.equal(bundledEntry.contentVersion, 'v1');
});

test('Phase 18 (4) Offline sacred audio & live AI features forbid robotic TTS and report honest offline guidance', async () => {
  const originalNavigator = globalThis.navigator;
  let speechCalled = false;
  (globalThis as Record<string, unknown>).speechSynthesis = {
    speak: () => {
      speechCalled = true;
    },
    cancel: () => {},
  };
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { onLine: false },
  });

  try {
    let duaStatusMsg = '';
    await playHumanDuaAudio({
      dua: { id: 'dua_waking', arabic: 'الْحَمْدُ لِلَّهِ', category: 'waking' },
      onStatus: (msg) => {
        duaStatusMsg = msg;
      },
    });
    assert.equal(speechCalled, false, 'Dua audio must never invoke speechSynthesis when offline');
    assert.ok(duaStatusMsg.toLowerCase().includes('not downloaded') || duaStatusMsg.toLowerCase().includes('offline'));

    let verseStatusMsg = '';
    playStoryQuranVerse(
      {
        surahRef: 'Surah Hud 11:41',
        globalAyahNumber: 1514,
        arabicAyah: 'بِسْمِ ٱللَّهِ',
        transliteration: 'Bismillah',
        meaningEn: 'In the Name of Allah',
      },
      (msg) => {
        verseStatusMsg = msg;
      }
    );
    await new Promise((r) => setTimeout(r, 15));
    assert.equal(speechCalled, false, 'Quran verse in story must never invoke speechSynthesis when offline');
    assert.ok(verseStatusMsg.length > 0);

    const storyRes = await resolveStoryPageHumanAudio({
      storyId: 'story_nuh',
      pageIndex: 0,
      text: 'Prophet Nuh built the Ark.',
      language: 'en',
      voiceStyle: 'storyteller',
    });
    assert.equal(storyRes.ok, false);
    assert.equal(storyRes.offlineUncached, true);
    assert.equal(speechCalled, false);

    const tajweedRes = await analyzeRecitationWithAiTajweed({
      audioBlob: new Blob([new Uint8Array(512)], { type: 'audio/webm' }),
      targetArabic: 'بِسْمِ ٱللَّهِ',
      uiLanguage: 'en',
      mode: 'adult',
    });
    assert.equal(tajweedRes.ok, false);
    assert.match(tajweedRes.error || '', /offline/i);
  } finally {
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: originalNavigator,
    });
    delete (globalThis as Record<string, unknown>).speechSynthesis;
  }

  const qaidaSrc = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/kids/NooraniQaidaCourseView.tsx'),
    'utf8'
  );
  assert.doesNotMatch(qaidaSrc, /allowTtsFallback:\s*true/);
  assert.doesNotMatch(qaidaSrc, /audioManager\.speakText/);
});

test('Phase 18 (5) Backup bundles exclude heavy audio binaries and block subscription/trial tampering', async () => {
  const freeUser = createBaseUser();
  const freeState = minimalNormalizer({ user: freeUser });

  const backupStr = createBackupBundle(freeState);
  assert.doesNotMatch(backupStr, /base64Audio|story_audio/);

  // Tamper backup JSON with forged lifetime entitlement and trial dates
  const parsed = JSON.parse(backupStr);
  parsed.user.entitlement = 'lifetime_499';
  parsed.user.subscriptionPurchaseSource = 'google_play';
  parsed.user.subscriptionSku = 'ilmizo_lifetime_499';
  parsed.user.trialEndsAtIso = new Date(Date.now() + 90 * 86400_000).toISOString();
  parsed.user.name = 'Zayd (Imported)';

  const validation = validateAndPreviewBackupJson(JSON.stringify(parsed), minimalNormalizer, {
    currentLocalUser: freeUser,
  });
  assert.equal(validation.valid, true);
  assert.equal(validation.normalizedState?.user.name, 'Zayd (Imported)');
  assert.equal(validation.normalizedState?.user.entitlement, 'free');
  assert.equal(validation.normalizedState?.user.subscriptionPurchaseSource, 'none');
  assert.equal(validation.normalizedState?.user.trialEndsAtIso, undefined);
  assert.ok(
    validation.warnings.some((w) => w.includes('never elevated from backup files')),
    'Should warn user that billing/trial claims in backup are ignored'
  );

  const applyRes = await applyValidatedImportWithRecovery(validation.normalizedState!, freeState);
  assert.equal(applyRes.ok, true);
  assert.equal(applyRes.appliedState?.user.entitlement, 'free');
  assert.equal(applyRes.appliedState?.user.subscriptionPurchaseSource, 'none');

  // Verify database hydration preserves state if called cleanly
  const hydrated = await hydrateOrMigrateMasterState(minimalNormalizer);
  assert.ok(hydrated.state);
});

test('Phase 18 (6) Google Play Billing offline preservation, online downgrade on expiry/refund, and proof-token validation', async () => {
  // 1. Bare entitlement boolean/string spoofing with source === 'none' is rejected
  const spoofedNoSource = createBaseUser({
    entitlement: 'lifetime_499',
    subscriptionPurchaseSource: 'none',
  });
  assert.equal(getEffectiveEntitlement(spoofedNoSource), 'free');

  // 2. Signed entitlement with tampered tier is rejected
  const validProof = computeEntitlementProofSync({
    entitlement: 'individual_99',
    source: 'google_play',
    sku: 'ilmizo_individual_99',
    orderId: 'GPA.1234',
  });
  const tamperedProofUser = createBaseUser({
    entitlement: 'lifetime_499',
    subscriptionPurchaseSource: 'google_play',
    subscriptionSku: 'ilmizo_individual_99',
    subscriptionOrderId: 'GPA.1234',
    subscriptionProofToken: validProof,
  });
  assert.equal(getEffectiveEntitlement(tamperedProofUser), 'free');

  // 3. Valid Play purchase survives offline check intact
  const validFamilyUser = createBaseUser({
    entitlement: 'family_199',
    subscriptionPurchaseSource: 'google_play',
    subscriptionSku: 'ilmizo_family_199',
    subscriptionOrderId: 'GPA.5678',
    subscriptionProofToken: computeEntitlementProofSync({
      entitlement: 'family_199',
      source: 'google_play',
      sku: 'ilmizo_family_199',
      orderId: 'GPA.5678',
    }),
  });
  const offlineCheck = await reconcileGooglePlayEntitlements(validFamilyUser, { isOnline: false });
  assert.equal(offlineCheck.ok, true);
  assert.equal(offlineCheck.downgraded, undefined);
  assert.equal(getEffectiveEntitlement(validFamilyUser), 'family_199');

  // 4. Online reconciliation with Pending purchase does not unlock premature premium
  const freeUser = createBaseUser();
  const pendingCheck = await reconcileGooglePlayEntitlements(freeUser, {
    isOnline: true,
    nativeBridge: {
      restorePurchases: async () => ({
        activeSkus: [],
        pendingSkus: ['ilmizo_family_199'],
        queriedSuccessfully: true,
      }),
    },
  });
  assert.equal(pendingCheck.ok, false);
  assert.equal(pendingCheck.patch, undefined);
  assert.match(pendingCheck.message, /pending/i);

  // 5. Online reconciliation with empty activeSkus downgrades expired/refunded Play subscription
  const refundDowngrade = await reconcileGooglePlayEntitlements(validFamilyUser, {
    isOnline: true,
    nativeBridge: {
      restorePurchases: async () => ({
        activeSkus: [],
        pendingSkus: [],
        queriedSuccessfully: true,
      }),
    },
  });
  assert.equal(refundDowngrade.downgraded, true);
  assert.equal(refundDowngrade.patch?.entitlement, 'free');
  assert.equal(refundDowngrade.patch?.subscriptionPurchaseSource, 'none');

  // 6. Local 7-day trial carries valid signed proof and works offline
  const trialPatch = startLocalSevenDayTrialPatch(Date.now());
  const trialUser = createBaseUser(trialPatch);
  assert.equal(getEffectiveEntitlement(trialUser), 'family_199');
});

test('Phase 18 (7) Static security, shared server cache, zero-cloud DB & Android backup exclusions', () => {
  const pkgJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'));
  const allDeps = { ...(pkgJson.dependencies || {}), ...(pkgJson.devDependencies || {}) };
  assert.equal('firebase' in allDeps, false, 'Firebase must not be required');
  assert.equal('@supabase/supabase-js' in allDeps, false, 'Supabase must not be required');

  const serverSrc = fs.readFileSync(path.resolve(process.cwd(), 'server.ts'), 'utf8');
  assert.match(serverSrc, /\.ilmizo-server-cache/);
  assert.match(serverSrc, /readServerAudioCache/);
  assert.match(serverSrc, /writeServerAudioCache/);

  const manifestXml = fs.readFileSync(
    path.resolve(process.cwd(), 'android/app/src/main/AndroidManifest.xml'),
    'utf8'
  );
  assert.match(manifestXml, /android:allowBackup="false"/);
  assert.match(manifestXml, /@xml\/backup_rules/);
  assert.match(manifestXml, /@xml\/data_extraction_rules/);
  assert.ok(fs.existsSync(path.resolve(process.cwd(), 'android/app/src/main/res/xml/backup_rules.xml')));
  assert.ok(
    fs.existsSync(path.resolve(process.cwd(), 'android/app/src/main/res/xml/data_extraction_rules.xml'))
  );
});
