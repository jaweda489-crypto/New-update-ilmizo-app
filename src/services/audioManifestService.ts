import { ALL_114_SURAHS } from '../data/quranData';
import { KIDS_STORIES, VERIFIED_DUAS } from '../data/islamicContent';
import { NOORANI_QAIDA_COURSE_LESSONS } from '../data/nooraniQaidaCourse';
import { LanguageCode } from '../types/ilmizo';
import { listOfflineAudioRecords } from './localDatabase';
import {
  getOfflineDuaAudioStatus,
  NOORANI_QAIDA_28_LETTERS,
  resolveDuaHumanAudio,
} from './humanDuaAndQaidaAudio';
import {
  AUDIO_PACK_CONTENT_VERSION,
  buildStoryAudioCacheKey,
  listAllCachedStoryAudioMetadata,
  openStudioAudioDatabase,
  STORE_QAIDA_AUDIO,
  STORE_WBW_AUDIO,
  type StudioVoiceStyle,
} from './storyAudioPrefetchService';
import { collectAllQaidaWbwPaths } from './studioAudioAndTajweedService';

export type AudioManifestContentType =
  | 'quran_recitation'
  | 'dua_audio'
  | 'qaida_letter'
  | 'qaida_wbw'
  | 'qaida_syllable'
  | 'kids_story';

export type AudioManifestDownloadStatus = 'bundled' | 'downloaded' | 'not_downloaded';

export type AudioManifestVerificationStatus = 'verified' | 'corrupted' | 'unverified';

export interface UnifiedAudioManifestEntry {
  contentId: string;
  contentType: AudioManifestContentType;
  language: string;
  voiceOrReciter: string;
  fileIdentifier: string;
  durationSec: number | null;
  downloadStatus: AudioManifestDownloadStatus;
  verificationStatus: AudioManifestVerificationStatus;
  contentVersion: string;
  sizeBytes?: number;
  checksumSha256?: string;
}

export interface UnifiedAudioManifestSnapshot {
  generatedAtIso: string;
  contentVersion: string;
  summary: {
    bundledQaidaLetters: number;
    downloadedQariSurahs: number;
    cachedDuaTracks: number;
    totalUniqueDuaTracks: number;
    cachedStoryPages: number;
    totalStoryPages: number;
    cachedQaidaWbwClips: number;
    totalQaidaWbwClips: number;
    cachedQaidaSyllables: number;
    estimatedAudioBytes: number;
  };
  entries: UnifiedAudioManifestEntry[];
}

async function listStoreMetadataKeys(
  storeName: string
): Promise<Map<string, { bytes: number; checksumSha256?: string; contentVersion?: string }>> {
  const result = new Map<string, { bytes: number; checksumSha256?: string; contentVersion?: string }>();
  try {
    const db = await openStudioAudioDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const req = tx.objectStore(storeName).openCursor();
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor) {
          resolve();
          return;
        }
        const rec = cursor.value as {
          key?: string;
          bytes?: number;
          blob?: Blob;
          checksumSha256?: string;
          contentVersion?: string;
        };
        if (rec?.key && rec?.blob && rec.blob.size >= 44) {
          result.set(String(rec.key), {
            bytes: Number(rec.bytes) || rec.blob.size,
            checksumSha256: rec.checksumSha256,
            contentVersion: rec.contentVersion || AUDIO_PACK_CONTENT_VERSION,
          });
        }
        cursor.continue();
      };
      req.onerror = () => reject(req.error);
    });
    db.close();
  } catch {
    // IndexedDB unavailable in non-browser context
  }
  return result;
}

export async function buildUnifiedAudioManifest(params?: {
  language?: LanguageCode;
  voiceStyle?: StudioVoiceStyle;
  includeUninstalled?: boolean;
}): Promise<UnifiedAudioManifestSnapshot> {
  const language: LanguageCode = params?.language || 'en';
  const voiceStyle: StudioVoiceStyle = params?.voiceStyle || 'storyteller';
  const includeUninstalled = params?.includeUninstalled !== false;

  const entries: UnifiedAudioManifestEntry[] = [];
  let estimatedAudioBytes = 0;

  // 1. Bundled 28 Qaida Isolated Letter MP3s (/public/assets/audio/qaida/*.mp3)
  for (const letter of NOORANI_QAIDA_28_LETTERS) {
    entries.push({
      contentId: `qaida_letter_${letter.id}`,
      contentType: 'qaida_letter',
      language: 'ar',
      voiceOrReciter: 'Bundled Arabic Makharij Recording',
      fileIdentifier: letter.letterAudioMp3Url,
      durationSec: 2,
      downloadStatus: 'bundled',
      verificationStatus: 'verified',
      contentVersion: AUDIO_PACK_CONTENT_VERSION,
    });
  }

  // 2. Downloaded Quran Qari Surahs (IndexedDB)
  const qariRecords = await listOfflineAudioRecords();
  const downloadedQariSet = new Set<string>();
  for (const rec of qariRecords) {
    const meta = ALL_114_SURAHS.find((s) => s.number === rec.surahNumber);
    const bytes = Number(rec.sizeBytes) || 0;
    estimatedAudioBytes += bytes;
    downloadedQariSet.add(rec.audioKey);
    entries.push({
      contentId: `quran_${rec.editionId}_surah_${rec.surahNumber}`,
      contentType: 'quran_recitation',
      language: 'ar',
      voiceOrReciter: rec.reciterName || rec.editionId,
      fileIdentifier: `idb://ilmizo_local_db/offline_audio/${rec.audioKey}`,
      durationSec: meta ? meta.ayahCount * 6 : null,
      downloadStatus: 'downloaded',
      verificationStatus: rec.checksumSha256 ? 'verified' : 'unverified',
      contentVersion: AUDIO_PACK_CONTENT_VERSION,
      sizeBytes: bytes,
      checksumSha256: rec.checksumSha256,
    });
  }

  // 3. Verified Human Duas Audio (Cache Storage)
  const duaStatus = await getOfflineDuaAudioStatus(VERIFIED_DUAS);
  estimatedAudioBytes += duaStatus.totalBytes;
  const cachedDuaUrls = new Set<string>();
  if (typeof caches !== 'undefined') {
    try {
      const cache = await caches.open('ilmizo-human-dua-qaida-audio-v1');
      for (const dua of VERIFIED_DUAS) {
        const desc = resolveDuaHumanAudio(dua);
        const hit = await cache.match(desc.mp3Url);
        if (hit) cachedDuaUrls.add(desc.mp3Url);
      }
    } catch {
      // Ignore cache API read issues
    }
  }
  const seenDuaIds = new Set<string>();
  for (const dua of VERIFIED_DUAS) {
    if (seenDuaIds.has(dua.id)) continue;
    seenDuaIds.add(dua.id);
    const desc = resolveDuaHumanAudio(dua);
    const isCached = cachedDuaUrls.has(desc.mp3Url);
    if (!includeUninstalled && !isCached) continue;
    entries.push({
      contentId: `dua_${dua.id}`,
      contentType: 'dua_audio',
      language: 'ar',
      voiceOrReciter: desc.reciterName,
      fileIdentifier: desc.mp3Url,
      durationSec: null,
      downloadStatus: isCached ? 'downloaded' : 'not_downloaded',
      verificationStatus: isCached ? 'verified' : 'unverified',
      contentVersion: AUDIO_PACK_CONTENT_VERSION,
    });
  }

  // 4. Kids 49-Story Studio Human Narration Pages (IndexedDB)
  const cachedStoryMeta = await listAllCachedStoryAudioMetadata();
  const cachedStoryMap = new Map(cachedStoryMeta.map((m) => [m.key, m]));
  let totalStoryPages = 0;
  let cachedStoryPagesForLang = 0;

  for (const item of cachedStoryMeta) {
    estimatedAudioBytes += item.bytes;
  }

  for (const story of KIDS_STORIES) {
    const pages = story.localizedPages?.[language] || story.pages;
    for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
      totalStoryPages += 1;
      const cacheKey = buildStoryAudioCacheKey(story.id, pageIndex, language, voiceStyle);
      const hit = cachedStoryMap.get(cacheKey);
      if (hit) cachedStoryPagesForLang += 1;
      if (!includeUninstalled && !hit) continue;
      entries.push({
        contentId: cacheKey,
        contentType: 'kids_story',
        language,
        voiceOrReciter: voiceStyle === 'teacher' ? 'Studio Teacher (Zephyr)' : 'Studio Storyteller (Kore)',
        fileIdentifier: `idb://ilmizo_studio_audio_db/story_audio/${cacheKey}`,
        durationSec: null,
        downloadStatus: hit ? 'downloaded' : 'not_downloaded',
        verificationStatus: hit ? 'verified' : 'unverified',
        contentVersion: hit?.contentVersion || AUDIO_PACK_CONTENT_VERSION,
        sizeBytes: hit?.bytes,
        checksumSha256: hit?.checksumSha256,
      });
    }
  }

  // 5. Qaida Word-by-Word Qari Clips & Studio Syllables (IndexedDB)
  const wbwPaths = collectAllQaidaWbwPaths(NOORANI_QAIDA_COURSE_LESSONS);
  const wbwMeta = await listStoreMetadataKeys(STORE_WBW_AUDIO);
  const qaidaSylMeta = await listStoreMetadataKeys(STORE_QAIDA_AUDIO);

  let cachedWbwCount = 0;
  for (const [, v] of wbwMeta) {
    estimatedAudioBytes += v.bytes;
  }
  for (const [, v] of qaidaSylMeta) {
    estimatedAudioBytes += v.bytes;
  }

  for (const path of wbwPaths) {
    const key = `wbw:${path}`;
    const hit = wbwMeta.get(key);
    if (hit) cachedWbwCount += 1;
    if (!includeUninstalled && !hit) continue;
    entries.push({
      contentId: key,
      contentType: 'qaida_wbw',
      language: 'ar',
      voiceOrReciter: 'Quran.com Word-by-Word Qari',
      fileIdentifier: `https://audio.qurancdn.com/${path}`,
      durationSec: 2,
      downloadStatus: hit ? 'downloaded' : 'not_downloaded',
      verificationStatus: hit ? 'verified' : 'unverified',
      contentVersion: hit?.contentVersion || AUDIO_PACK_CONTENT_VERSION,
      sizeBytes: hit?.bytes,
      checksumSha256: hit?.checksumSha256,
    });
  }

  for (const [key, meta] of qaidaSylMeta) {
    entries.push({
      contentId: key,
      contentType: 'qaida_syllable',
      language: 'ar',
      voiceOrReciter: 'Studio Arabic Ustad (Charon)',
      fileIdentifier: `idb://ilmizo_studio_audio_db/qaida_audio/${key}`,
      durationSec: 2,
      downloadStatus: 'downloaded',
      verificationStatus: 'verified',
      contentVersion: meta.contentVersion || AUDIO_PACK_CONTENT_VERSION,
      sizeBytes: meta.bytes,
      checksumSha256: meta.checksumSha256,
    });
  }

  return {
    generatedAtIso: new Date().toISOString(),
    contentVersion: AUDIO_PACK_CONTENT_VERSION,
    summary: {
      bundledQaidaLetters: NOORANI_QAIDA_28_LETTERS.length,
      downloadedQariSurahs: downloadedQariSet.size,
      cachedDuaTracks: duaStatus.cachedTrackCount,
      totalUniqueDuaTracks: duaStatus.uniqueTrackCount,
      cachedStoryPages: cachedStoryPagesForLang,
      totalStoryPages,
      cachedQaidaWbwClips: cachedWbwCount,
      totalQaidaWbwClips: wbwPaths.length,
      cachedQaidaSyllables: qaidaSylMeta.size,
      estimatedAudioBytes,
    },
    entries,
  };
}
