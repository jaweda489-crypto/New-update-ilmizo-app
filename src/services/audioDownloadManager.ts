import {
  ALL_114_SURAHS,
  resolveReciterConfig,
  VERIFIED_RECITER_EDITIONS,
  VerifiedReciterConfig,
} from '../data/quranData';
import {
  deleteAllOfflineAudioFromDb,
  deleteOfflineAudioFromDb,
  getOfflineAudioFromDb,
  listOfflineAudioRecords,
  OfflineAudioRecord,
  saveOfflineAudioToDb,
} from './localDatabase';
import { computeSha256Hex } from './quranOfflineManager';

export const QARI_AUDIO_CACHE_NAME = 'ilmizo-qari-audio-v1';

export const OFFLINE_QARI_MISSING_MESSAGE =
  "Audio for this Surah is not downloaded for offline playback. Connect to the internet or download this Qari's audio.";

/**
 * Canonical global Ayah starting offset (0-indexed) for each Surah 1..114.
 * Used to compute the exact global Ayah number (1..6236) for any (surahNumber, numberInSurah)
 * without requiring a network call.
 */
export function getGlobalAyahNumber(surahNumber: number, ayahNumberInSurah: number): number {
  let offset = 0;
  for (const meta of ALL_114_SURAHS) {
    if (meta.number < surahNumber) {
      offset += meta.ayahCount;
    } else {
      break;
    }
  }
  return offset + ayahNumberInSurah;
}

export interface QariReciterMetadata extends VerifiedReciterConfig {
  sourceAttribution: string;
  audioUrlPattern: string;
}

export const SUPPORTED_QARI_RECITERS: QariReciterMetadata[] = VERIFIED_RECITER_EDITIONS.map(
  (r) => ({
    ...r,
    sourceAttribution: 'Islamic Network Quran Audio CDN / AlQuran Cloud Verified Recitation',
    audioUrlPattern: `https://cdn.islamic.network/quran/audio/${r.cdnBitrate}/${r.editionId}/{globalAyahNumber}.mp3`,
  })
);

export interface QariAudioIntegrityResult {
  valid: boolean;
  editionId: string;
  surahNumber: number;
  expectedAyahCount: number;
  downloadedAyahCount: number;
  sizeBytes: number;
  checksumSha256: string;
  errors: string[];
}

export interface QariAudioDownloadProgressState {
  status: 'idle' | 'downloading' | 'paused' | 'completed' | 'cancelled' | 'error';
  reciterName: string | null;
  editionId: string | null;
  surahNumber: number | null;
  surahName: string | null;
  completedAyahs: number;
  totalAyahs: number;
  completedSurahs: number;
  totalSurahs: number;
  progressPercent: number;
  downloadedBytes: number;
  errorMessage: string | null;
}

export interface ResolvedQariPlaybackSource {
  available: boolean;
  source: 'offline_downloaded' | 'online_stream' | 'unavailable_offline';
  url?: string;
  reciter: VerifiedReciterConfig;
  surahNumber: number;
  ayahNumberInSurah: number;
  globalAyahNumber: number;
  errorMessage?: string;
}

/**
 * Verifies that an OfflineAudioRecord has complete Ayah coverage (1..N) for its Surah and Qari edition.
 */
export async function verifySurahQariAudioIntegrity(
  surahNumber: number,
  editionId: string,
  record: OfflineAudioRecord | null | undefined
): Promise<QariAudioIntegrityResult> {
  const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
  if (!meta) {
    return {
      valid: false,
      editionId,
      surahNumber,
      expectedAyahCount: 0,
      downloadedAyahCount: 0,
      sizeBytes: 0,
      checksumSha256: '',
      errors: [`Invalid Surah number: ${surahNumber}.`],
    };
  }

  if (!record || record.surahNumber !== surahNumber || record.editionId !== editionId) {
    return {
      valid: false,
      editionId,
      surahNumber,
      expectedAyahCount: meta.ayahCount,
      downloadedAyahCount: 0,
      sizeBytes: 0,
      checksumSha256: '',
      errors: [`No offline audio record found for Surah ${surahNumber} (${editionId}).`],
    };
  }

  const errors: string[] = [];
  const urlsMap = record.ayahAudioUrls || {};
  const dataUrlsMap = record.ayahAudioDataUrls || {};
  let validAyahCount = 0;
  const canonicalEntries: string[] = [];

  for (let ayahNum = 1; ayahNum <= meta.ayahCount; ayahNum += 1) {
    const cdnUrl = urlsMap[ayahNum];
    const cachedDataOrUrl = dataUrlsMap[ayahNum] || cdnUrl;
    if (!cdnUrl || typeof cdnUrl !== 'string' || !cachedDataOrUrl) {
      errors.push(`Missing offline audio for Surah ${surahNumber} Ayah ${ayahNum}.`);
    } else if (!cdnUrl.includes(`/${editionId}/`)) {
      errors.push(
        `Edition mismatch at Surah ${surahNumber} Ayah ${ayahNum}: expected ${editionId} in URL.`
      );
    } else {
      validAyahCount += 1;
      canonicalEntries.push(`${ayahNum}:${cdnUrl}:${cachedDataOrUrl.length}`);
    }
  }

  const checksumSha256 = await computeSha256Hex(
    `ilmizo_qari_audio_v1|${editionId}|surah=${surahNumber}|count=${validAyahCount}|${canonicalEntries.join(
      '|'
    )}`
  );

  if (
    record.checksumSha256 &&
    record.checksumSha256.trim().length > 0 &&
    record.checksumSha256 !== checksumSha256
  ) {
    errors.push(`Audio checksum mismatch for Surah ${surahNumber} (${editionId}).`);
  }

  return {
    valid: errors.length === 0 && validAyahCount === meta.ayahCount,
    editionId,
    surahNumber,
    expectedAyahCount: meta.ayahCount,
    downloadedAyahCount: validAyahCount,
    sizeBytes: record.sizeBytes || 0,
    checksumSha256,
    errors,
  };
}

/**
 * Resolves the playback URL for a specific Surah and Ayah for the selected Qari.
 * - Prefers verified offline downloaded audio in IndexedDB / Cache API.
 * - If not downloaded and device is online, returns the verified Qari stream URL.
 * - If not downloaded and device is offline, returns `available: false` with the explicit
 *   offline message and NEVER falls back to robotic TTS pretending to be a Qari.
 */
export async function resolveQariAyahAudioSource(params: {
  surahNumber: number;
  ayahNumberInSurah: number;
  globalAyahNumber?: number;
  reciterName?: string;
  isOnline?: boolean;
}): Promise<ResolvedQariPlaybackSource> {
  const { surahNumber, ayahNumberInSurah, reciterName } = params;
  const reciter = resolveReciterConfig(reciterName);
  const globalAyahNumber =
    params.globalAyahNumber && params.globalAyahNumber > 0
      ? params.globalAyahNumber
      : getGlobalAyahNumber(surahNumber, ayahNumberInSurah);

  const isOnline =
    typeof params.isOnline === 'boolean'
      ? params.isOnline
      : typeof navigator !== 'undefined'
      ? navigator.onLine
      : true;

  // 1. Check offline downloaded audio in IndexedDB first
  const storedRecord = await getOfflineAudioFromDb(reciter.editionId, surahNumber);
  if (storedRecord) {
    const integrity = await verifySurahQariAudioIntegrity(
      surahNumber,
      reciter.editionId,
      storedRecord
    );
    if (integrity.valid) {
      const offlineUrl =
        storedRecord.ayahAudioDataUrls?.[ayahNumberInSurah] ||
        storedRecord.ayahAudioUrls?.[ayahNumberInSurah];
      if (offlineUrl) {
        return {
          available: true,
          source: 'offline_downloaded',
          url: offlineUrl,
          reciter,
          surahNumber,
          ayahNumberInSurah,
          globalAyahNumber,
        };
      }
    }
  }

  // 2. If online, stream from verified Islamic Network CDN
  if (isOnline) {
    const cdnUrl = `https://cdn.islamic.network/quran/audio/${reciter.cdnBitrate}/${reciter.editionId}/${globalAyahNumber}.mp3`;
    return {
      available: true,
      source: 'online_stream',
      url: cdnUrl,
      reciter,
      surahNumber,
      ayahNumberInSurah,
      globalAyahNumber,
    };
  }

  // 3. Offline and not downloaded -> explicit message, NEVER robotic TTS
  return {
    available: false,
    source: 'unavailable_offline',
    reciter,
    surahNumber,
    ayahNumberInSurah,
    globalAyahNumber,
    errorMessage: OFFLINE_QARI_MISSING_MESSAGE,
  };
}

function arrayBufferToBase64AudioDataUrl(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  if (typeof btoa === 'function') {
    return `data:audio/mpeg;base64,${btoa(binary)}`;
  }
  return `data:audio/mpeg;base64,${Buffer.from(buffer).toString('base64')}`;
}

/**
 * Centralized Qari Audio Download Manager with Pause, Resume, Cancel, Retry, and Delete controls.
 */
export class QariAudioDownloadManager {
  private state: QariAudioDownloadProgressState = {
    status: 'idle',
    reciterName: null,
    editionId: null,
    surahNumber: null,
    surahName: null,
    completedAyahs: 0,
    totalAyahs: 0,
    completedSurahs: 0,
    totalSurahs: 0,
    progressPercent: 0,
    downloadedBytes: 0,
    errorMessage: null,
  };

  private listeners = new Set<(state: QariAudioDownloadProgressState) => void>();
  private pauseRequested = false;
  private cancelRequested = false;
  private resumeResolver: (() => void) | null = null;

  public getState(): QariAudioDownloadProgressState {
    return { ...this.state };
  }

  public subscribe(listener: (state: QariAudioDownloadProgressState) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private updateState(patch: Partial<QariAudioDownloadProgressState>): void {
    this.state = {
      ...this.state,
      ...patch,
    };
    const snapshot = this.getState();
    this.listeners.forEach((l) => l(snapshot));
  }

  public pauseDownload(): void {
    if (this.state.status === 'downloading') {
      this.pauseRequested = true;
      this.updateState({ status: 'paused' });
    }
  }

  public resumeDownload(): void {
    if (this.state.status === 'paused') {
      this.pauseRequested = false;
      this.updateState({ status: 'downloading' });
      if (this.resumeResolver) {
        const resolve = this.resumeResolver;
        this.resumeResolver = null;
        resolve();
      }
    }
  }

  public cancelDownload(): void {
    if (this.state.status === 'downloading' || this.state.status === 'paused') {
      this.cancelRequested = true;
      this.pauseRequested = false;
      if (this.resumeResolver) {
        const resolve = this.resumeResolver;
        this.resumeResolver = null;
        resolve();
      }
      this.updateState({
        status: 'cancelled',
      });
    }
  }

  private async waitIfPaused(): Promise<void> {
    if (!this.pauseRequested) return;
    await new Promise<void>((resolve) => {
      this.resumeResolver = resolve;
    });
  }

  /**
   * Downloads and verifies all Ayah audio files for a single Surah and Qari edition.
   */
  public async downloadSurahQariAudio(options: {
    surahNumber: number;
    reciterName?: string;
    customAudioFetcher?: (
      url: string,
      ayahNumberInSurah: number,
      globalAyahNumber: number
    ) => Promise<{ dataUrl: string; sizeBytes: number }>;
  }): Promise<{
    ok: boolean;
    record?: OfflineAudioRecord;
    integrity?: QariAudioIntegrityResult;
    error?: string;
  }> {
    const meta = ALL_114_SURAHS.find((s) => s.number === options.surahNumber);
    if (!meta) {
      return { ok: false, error: `Invalid Surah number: ${options.surahNumber}` };
    }

    const reciter = resolveReciterConfig(options.reciterName);
    this.pauseRequested = false;
    this.cancelRequested = false;

    this.updateState({
      status: 'downloading',
      reciterName: reciter.label,
      editionId: reciter.editionId,
      surahNumber: meta.number,
      surahName: meta.nameTranslit,
      completedAyahs: 0,
      totalAyahs: meta.ayahCount,
      completedSurahs: 0,
      totalSurahs: 1,
      progressPercent: 0,
      downloadedBytes: 0,
      errorMessage: null,
    });

    const ayahAudioUrls: Record<number, string> = {};
    const ayahAudioDataUrls: Record<number, string> = {};
    let totalBytes = 0;

    for (let ayahNum = 1; ayahNum <= meta.ayahCount; ayahNum += 1) {
      if (this.cancelRequested) {
        return { ok: false, error: 'Audio download cancelled by user.' };
      }

      await this.waitIfPaused();

      if (this.cancelRequested) {
        return { ok: false, error: 'Audio download cancelled by user.' };
      }

      const globalNum = getGlobalAyahNumber(meta.number, ayahNum);
      const cdnUrl = `https://cdn.islamic.network/quran/audio/${reciter.cdnBitrate}/${reciter.editionId}/${globalNum}.mp3`;
      ayahAudioUrls[ayahNum] = cdnUrl;

      try {
        if (options.customAudioFetcher) {
          const fetched = await options.customAudioFetcher(cdnUrl, ayahNum, globalNum);
          ayahAudioDataUrls[ayahNum] = fetched.dataUrl;
          totalBytes += fetched.sizeBytes;
        } else {
          if (typeof navigator !== 'undefined' && !navigator.onLine) {
            throw new Error(
              `Cannot download Qari audio for Surah ${meta.nameTranslit} while offline.`
            );
          }

          const response = await fetch(cdnUrl);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status} while downloading Ayah ${ayahNum} audio.`);
          }

          // Store in browser Cache Storage if available
          if (typeof caches !== 'undefined') {
            try {
              const cache = await caches.open(QARI_AUDIO_CACHE_NAME);
              await cache.put(cdnUrl, response.clone());
            } catch {
              // Ignore Cache API errors and rely on IndexedDB dataUrl
            }
          }

          const arrayBuffer = await response.arrayBuffer();
          if (arrayBuffer.byteLength < 64) {
            throw new Error(`Corrupted or empty audio stream at Ayah ${ayahNum}.`);
          }
          ayahAudioDataUrls[ayahNum] = arrayBufferToBase64AudioDataUrl(arrayBuffer);
          totalBytes += arrayBuffer.byteLength;
        }
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : `Failed to download Qari audio for Surah ${meta.nameTranslit} Ayah ${ayahNum}.`;
        this.updateState({
          status: 'error',
          errorMessage: msg,
        });
        return { ok: false, error: msg };
      }

      this.updateState({
        completedAyahs: ayahNum,
        downloadedBytes: totalBytes,
        progressPercent: Math.round((ayahNum / meta.ayahCount) * 100),
      });
    }

    const nowIso = new Date().toISOString();
    const draftRecord: OfflineAudioRecord = {
      audioKey: `${reciter.editionId}:${meta.number}`,
      surahNumber: meta.number,
      editionId: reciter.editionId,
      reciterName: reciter.label,
      bitrate: `${reciter.cdnBitrate}kbps`,
      expectedAyahCount: meta.ayahCount,
      downloadedAyahCount: meta.ayahCount,
      downloadedAtIso: nowIso,
      verifiedAtIso: nowIso,
      sizeBytes: totalBytes,
      ayahAudioUrls,
      ayahAudioDataUrls,
    };

    const integrity = await verifySurahQariAudioIntegrity(
      meta.number,
      reciter.editionId,
      draftRecord
    );
    if (!integrity.valid) {
      const msg = integrity.errors.join(' ');
      this.updateState({
        status: 'error',
        errorMessage: msg,
      });
      return { ok: false, integrity, error: msg };
    }

    const finalRecord: OfflineAudioRecord = {
      ...draftRecord,
      checksumSha256: integrity.checksumSha256,
    };

    const writeRes = await saveOfflineAudioToDb(finalRecord);
    if (!writeRes.ok) {
      const msg = writeRes.error || 'Failed to save Qari audio to IndexedDB.';
      this.updateState({
        status: 'error',
        errorMessage: msg,
      });
      return { ok: false, error: msg };
    }

    this.updateState({
      status: 'completed',
      completedSurahs: 1,
      progressPercent: 100,
      errorMessage: null,
    });

    return {
      ok: true,
      record: finalRecord,
      integrity,
    };
  }

  /**
   * Downloads Qari audio for multiple Surahs (e.g. Juz Amma or Essential Pack) with progress tracking.
   */
  public async downloadQariAudioBatch(options: {
    surahNumbers: number[];
    reciterName?: string;
    customAudioFetcher?: (
      url: string,
      ayahNumberInSurah: number,
      globalAyahNumber: number
    ) => Promise<{ dataUrl: string; sizeBytes: number }>;
  }): Promise<{
    ok: boolean;
    completedSurahs: number;
    totalBytes: number;
    error?: string;
  }> {
    const reciter = resolveReciterConfig(options.reciterName);
    const metas = options.surahNumbers
      .map((n) => ALL_114_SURAHS.find((s) => s.number === n))
      .filter((m): m is NonNullable<typeof m> => Boolean(m));

    let completedSurahs = 0;
    let totalBytes = 0;

    for (const meta of metas) {
      if (this.cancelRequested) {
        return {
          ok: false,
          completedSurahs,
          totalBytes,
          error: 'Batch audio download cancelled by user.',
        };
      }

      const res = await this.downloadSurahQariAudio({
        surahNumber: meta.number,
        reciterName: reciter.id,
        customAudioFetcher: options.customAudioFetcher,
      });
      if (!res.ok) {
        return {
          ok: false,
          completedSurahs,
          totalBytes,
          error: res.error,
        };
      }

      completedSurahs += 1;
      totalBytes += res.record?.sizeBytes || 0;
      this.updateState({
        completedSurahs,
        totalSurahs: metas.length,
        downloadedBytes: totalBytes,
      });
    }

    return {
      ok: true,
      completedSurahs,
      totalBytes,
    };
  }

  public async deleteSurahQariAudio(surahNumber: number, reciterName?: string): Promise<number> {
    const reciter = resolveReciterConfig(reciterName);
    if (typeof caches !== 'undefined') {
      try {
        const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
        if (meta) {
          const cache = await caches.open(QARI_AUDIO_CACHE_NAME);
          for (let ayahNum = 1; ayahNum <= meta.ayahCount; ayahNum += 1) {
            const globalNum = getGlobalAyahNumber(meta.number, ayahNum);
            const cdnUrl = `https://cdn.islamic.network/quran/audio/${reciter.cdnBitrate}/${reciter.editionId}/${globalNum}.mp3`;
            await cache.delete(cdnUrl);
          }
        }
      } catch {
        // Ignore Cache API cleanup errors
      }
    }
    return deleteOfflineAudioFromDb(reciter.editionId, surahNumber);
  }

  public async deleteReciterAllAudio(reciterName: string): Promise<number> {
    const reciter = resolveReciterConfig(reciterName);
    return deleteOfflineAudioFromDb(reciter.editionId);
  }

  public async deleteAllQariAudio(): Promise<number> {
    if (typeof caches !== 'undefined') {
      try {
        await caches.delete(QARI_AUDIO_CACHE_NAME);
      } catch {
        // Ignore
      }
    }
    const deleted = await deleteAllOfflineAudioFromDb();
    this.updateState({
      status: 'idle',
      completedAyahs: 0,
      totalAyahs: 0,
      completedSurahs: 0,
      totalSurahs: 0,
      progressPercent: 0,
      downloadedBytes: 0,
      errorMessage: null,
    });
    return deleted;
  }

  public async getInstalledAudioSummary(): Promise<{
    records: OfflineAudioRecord[];
    totalBytes: number;
    byReciter: Record<string, { surahNumbers: number[]; totalBytes: number }>;
  }> {
    const records = await listOfflineAudioRecords();
    let totalBytes = 0;
    const byReciter: Record<string, { surahNumbers: number[]; totalBytes: number }> = {};

    for (const rec of records) {
      totalBytes += rec.sizeBytes || 0;
      if (!byReciter[rec.editionId]) {
        byReciter[rec.editionId] = { surahNumbers: [], totalBytes: 0 };
      }
      if (!byReciter[rec.editionId].surahNumbers.includes(rec.surahNumber)) {
        byReciter[rec.editionId].surahNumbers.push(rec.surahNumber);
      }
      byReciter[rec.editionId].totalBytes += rec.sizeBytes || 0;
    }

    for (const key of Object.keys(byReciter)) {
      byReciter[key].surahNumbers.sort((a, b) => a - b);
    }

    return { records, totalBytes, byReciter };
  }
}

export const audioDownloadManager = new QariAudioDownloadManager();
