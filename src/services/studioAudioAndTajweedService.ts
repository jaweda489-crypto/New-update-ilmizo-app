import type { QaidaCourseLesson } from '../data/nooraniQaidaCourse';
import type { KidsStoryItem, LanguageCode } from '../types/ilmizo';
import {
  AUDIO_PACK_CONTENT_VERSION,
  base64ToAudioBlob,
  buildStoryAudioCacheKey,
  getStoryLibraryCacheSummary,
  openStudioAudioDatabase,
  resolveApiEndpoint,
  resolveStoryPageHumanAudio,
  STORE_QAIDA_AUDIO,
  STORE_WBW_AUDIO,
  verifyAudioBlobIntegrity,
  type StudioVoiceStyle,
} from './storyAudioPrefetchService';

export {
  buildStoryAudioCacheKey,
  openStudioAudioDatabase,
  resolveApiEndpoint,
  resolveStoryPageHumanAudio,
  type StudioVoiceStyle,
};

export interface CachedAudioBlobRecord {
  key: string;
  mimeType: string;
  blob: Blob;
  savedAtIso: string;
  bytes: number;
  checksumSha256?: string;
  contentVersion?: string;
}

export interface WordTajweedFeedback {
  word: string;
  status: 'correct' | 'harakat_issue' | 'makhraj_issue' | 'missed';
  note: string;
}

export interface AiTajweedFeedbackResult {
  overallScore: number;
  accuracyLabel: string;
  transcriptArabic: string;
  feedbackSummary: string;
  makhrajTip: string;
  wordFeedback: WordTajweedFeedback[];
}

export function buildQaidaSyllableCacheKey(arabicText: string): string {
  return `qaida_syl:${arabicText.trim()}`;
}

export function buildWbwAudioCacheKey(wbwWordPath: string): string {
  return `wbw:${wbwWordPath.trim()}`;
}

export function collectAllQaidaWbwPaths(lessons: QaidaCourseLesson[]): string[] {
  const seen = new Set<string>();
  const paths: string[] = [];
  for (const lesson of lessons) {
    for (const tile of lesson.tiles) {
      if (tile.wbwWordPath && !seen.has(tile.wbwWordPath)) {
        seen.add(tile.wbwWordPath);
        paths.push(tile.wbwWordPath);
      }
    }
  }
  return paths;
}

export function base64ToBlob(base64: string, mimeType = 'audio/wav'): Blob {
  return base64ToAudioBlob(base64, mimeType);
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const commaIdx = result.indexOf(',');
      resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
    };
    reader.onerror = () => reject(reader.error || new Error('Failed to encode audio blob'));
    reader.readAsDataURL(blob);
  });
}

async function deleteRecordFromStore(storeName: string, key: string): Promise<void> {
  try {
    const db = await openStudioAudioDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // ignore delete failures
  }
}

async function getRecordFromStore(
  storeName: string,
  key: string
): Promise<CachedAudioBlobRecord | null> {
  try {
    const db = await openStudioAudioDatabase();
    const record = await new Promise<CachedAudioBlobRecord | null>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const req = tx.objectStore(storeName).get(key);
      req.onsuccess = () => resolve((req.result as CachedAudioBlobRecord) || null);
      req.onerror = () => reject(req.error);
    });
    db.close();
    if (!record?.blob) return null;
    const integrity = await verifyAudioBlobIntegrity(record.blob, record.checksumSha256);
    if (!integrity.valid) {
      await deleteRecordFromStore(storeName, key);
      return null;
    }
    return record;
  } catch {
    return null;
  }
}

async function putRecordInStore(
  storeName: string,
  key: string,
  blob: Blob
): Promise<boolean> {
  try {
    const integrity = await verifyAudioBlobIntegrity(blob);
    if (!integrity.valid) {
      return false;
    }
    const db = await openStudioAudioDatabase();
    const record: CachedAudioBlobRecord = {
      key,
      mimeType: blob.type || 'audio/wav',
      blob,
      savedAtIso: new Date().toISOString(),
      bytes: blob.size,
      checksumSha256: integrity.checksumSha256,
      contentVersion: AUDIO_PACK_CONTENT_VERSION,
    };
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error('Audio write aborted'));
    });
    db.close();
    return true;
  } catch {
    return false;
  }
}

export async function clearOfflineQaidaAudioPack(): Promise<void> {
  try {
    const db = await openStudioAudioDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction([STORE_QAIDA_AUDIO, STORE_WBW_AUDIO], 'readwrite');
      tx.objectStore(STORE_QAIDA_AUDIO).clear();
      tx.objectStore(STORE_WBW_AUDIO).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // ignore clear errors
  }
}

async function listKeysInStore(storeName: string): Promise<string[]> {
  try {
    const db = await openStudioAudioDatabase();
    const keys = await new Promise<string[]>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const req = tx.objectStore(storeName).getAllKeys();
      req.onsuccess = () =>
        resolve(Array.isArray(req.result) ? req.result.map((k) => String(k)) : []);
      req.onerror = () => reject(req.error);
    });
    db.close();
    return keys;
  } catch {
    return [];
  }
}

export async function fetchOrGetCachedStoryAudio(params: {
  storyId: string;
  pageIndex: number;
  text: string;
  language: LanguageCode;
  voiceStyle: StudioVoiceStyle;
  signal?: AbortSignal;
}): Promise<{
  ok: boolean;
  blobUrl?: string;
  fromCache?: boolean;
  offlineUncached?: boolean;
  error?: string;
}> {
  return resolveStoryPageHumanAudio(params);
}

export async function getCachedTopStoriesProgress(params: {
  stories: KidsStoryItem[];
  language: LanguageCode;
  voiceStyle: StudioVoiceStyle;
}): Promise<{ cachedPages: number; totalPages: number; cachedStoryCount: number }> {
  const summary = await getStoryLibraryCacheSummary(params);
  return {
    cachedPages: summary.cachedPagesCount,
    totalPages: summary.totalPages,
    cachedStoryCount: summary.cachedStoriesCount,
  };
}

export async function downloadTopStoriesAudioPack(params: {
  stories: KidsStoryItem[];
  language: LanguageCode;
  voiceStyle: StudioVoiceStyle;
  signal?: AbortSignal;
  onProgress?: (progress: { completedPages: number; totalPages: number; currentTitle: string }) => void;
}): Promise<{ ok: boolean; completedPages: number; totalPages: number; error?: string }> {
  const tasks: { story: KidsStoryItem; pageIndex: number; text: string }[] = [];
  for (const story of params.stories) {
    const pages = story.localizedPages?.[params.language] || story.pages;
    pages.forEach((text, pageIndex) => {
      tasks.push({ story, pageIndex, text });
    });
  }

  let completedPages = 0;
  const totalPages = tasks.length;

  for (const item of tasks) {
    if (params.signal?.aborted) {
      return { ok: false, completedPages, totalPages, error: 'Download cancelled.' };
    }
    const title = item.story.localizedTitles?.[params.language] || item.story.title;
    params.onProgress?.({ completedPages, totalPages, currentTitle: title });

    const res = await fetchOrGetCachedStoryAudio({
      storyId: item.story.id,
      pageIndex: item.pageIndex,
      text: item.text,
      language: params.language,
      voiceStyle: params.voiceStyle,
      signal: params.signal,
    });

    if (res.blobUrl) {
      try {
        URL.revokeObjectURL(res.blobUrl);
      } catch {
        // ignore revoke error
      }
    }

    if (!res.ok) {
      return {
        ok: false,
        completedPages,
        totalPages,
        error: res.error || 'Could not download Studio Storyteller audio.',
      };
    }

    completedPages += 1;
    params.onProgress?.({ completedPages, totalPages, currentTitle: title });
  }

  return { ok: true, completedPages, totalPages };
}

export async function fetchOrGetCachedQaidaSyllable(params: {
  arabicText: string;
  label?: string;
}): Promise<{ ok: boolean; blobUrl?: string; fromCache?: boolean; error?: string }> {
  const key = buildQaidaSyllableCacheKey(params.arabicText);
  const cached = await getRecordFromStore(STORE_QAIDA_AUDIO, key);
  if (cached?.blob && cached.blob.size > 0) {
    return {
      ok: true,
      blobUrl: URL.createObjectURL(cached.blob),
      fromCache: true,
    };
  }

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return {
      ok: false,
      error: 'Offline — connect to the internet once to save Ustad Qaida syllable audio.',
    };
  }

  try {
    const res = await fetch(resolveApiEndpoint('/api/ai/qaida-syllable'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        arabicText: params.arabicText,
        label: params.label || '',
      }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      mimeType?: string;
      base64Audio?: string;
      error?: string;
    };

    if (!res.ok || !data.ok || !data.base64Audio) {
      return {
        ok: false,
        error: data.error || 'Qaida Studio syllable audio unavailable.',
      };
    }

    const wavBlob = base64ToBlob(data.base64Audio, data.mimeType || 'audio/wav');
    const saved = await putRecordInStore(STORE_QAIDA_AUDIO, key, wavBlob);
    if (!saved) {
      return {
        ok: false,
        error: 'Downloaded Qaida audio failed integrity check.',
      };
    }
    return {
      ok: true,
      blobUrl: URL.createObjectURL(wavBlob),
      fromCache: false,
    };
  } catch {
    return { ok: false, error: 'Offline — Qaida syllable not cached yet.' };
  }
}

export async function getOfflineQaidaWbwStatus(wbwPaths: string[]): Promise<{
  cachedCount: number;
  totalCount: number;
}> {
  const existingKeys = new Set(await listKeysInStore(STORE_WBW_AUDIO));
  let cachedCount = 0;
  for (const path of wbwPaths) {
    if (existingKeys.has(buildWbwAudioCacheKey(path))) {
      cachedCount += 1;
    }
  }
  return { cachedCount, totalCount: wbwPaths.length };
}

export async function resolveWbwAudioUrlOrCached(wbwWordPath: string): Promise<{
  url: string;
  isOfflineCached: boolean;
  offlineUncached?: boolean;
  error?: string;
}> {
  const key = buildWbwAudioCacheKey(wbwWordPath);
  const cached = await getRecordFromStore(STORE_WBW_AUDIO, key);
  if (cached?.blob && cached.blob.size > 0) {
    return {
      url: URL.createObjectURL(cached.blob),
      isOfflineCached: true,
    };
  }
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return {
      url: '',
      isOfflineCached: false,
      offlineUncached: true,
      error: 'Offline — download the Qaida Word-by-Word Audio Pack to listen without internet.',
    };
  }
  return {
    url: `https://audio.qurancdn.com/${wbwWordPath}`,
    isOfflineCached: false,
  };
}

export async function downloadQaidaOfflineWbwPack(params: {
  wbwPaths: string[];
  signal?: AbortSignal;
  onProgress?: (progress: { completed: number; total: number }) => void;
}): Promise<{ ok: boolean; completed: number; total: number; error?: string }> {
  const existingKeys = new Set(await listKeysInStore(STORE_WBW_AUDIO));
  let completed = 0;
  const total = params.wbwPaths.length;

  for (const wbwPath of params.wbwPaths) {
    if (params.signal?.aborted) {
      return { ok: false, completed, total, error: 'Download cancelled.' };
    }
    const key = buildWbwAudioCacheKey(wbwPath);
    if (existingKeys.has(key)) {
      completed += 1;
      params.onProgress?.({ completed, total });
      continue;
    }

    try {
      const response = await fetch(`https://audio.qurancdn.com/${wbwPath}`, {
        signal: params.signal,
      });
      if (!response.ok) {
        return {
          ok: false,
          completed,
          total,
          error: `Could not fetch Qari word clip (${response.status}).`,
        };
      }
      const blob = await response.blob();
      const saved = await putRecordInStore(STORE_WBW_AUDIO, key, blob);
      if (!saved) {
        return {
          ok: false,
          completed,
          total,
          error: `Downloaded Qari word clip failed integrity check (${wbwPath}).`,
        };
      }
      completed += 1;
      params.onProgress?.({ completed, total });
    } catch {
      return {
        ok: false,
        completed,
        total,
        error: 'Network error while saving offline Qaida Qari word audio.',
      };
    }
  }

  return { ok: true, completed, total };
}

export async function analyzeRecitationWithAiTajweed(params: {
  audioBlob: Blob;
  targetArabic: string;
  targetTransliteration?: string;
  uiLanguage: LanguageCode;
  mode: 'kids' | 'adult';
}): Promise<{ ok: boolean; result?: AiTajweedFeedbackResult; error?: string }> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return {
      ok: false,
      error: 'You appear to be offline. Live AI Tajweed & Harakat analysis requires an internet connection.',
    };
  }

  if (!params.audioBlob || params.audioBlob.size < 256) {
    return {
      ok: false,
      error: 'Recording is too short. Please hold/record your recitation clearly for at least 1 second.',
    };
  }

  try {
    const audioBase64 = await blobToBase64(params.audioBlob);
    const res = await fetch(resolveApiEndpoint('/api/ai/tajweed-check'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audioBase64,
        mimeType: params.audioBlob.type || 'audio/webm',
        targetArabic: params.targetArabic,
        targetTransliteration: params.targetTransliteration || '',
        uiLanguage: params.uiLanguage,
        mode: params.mode,
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      result?: AiTajweedFeedbackResult;
      error?: string;
    };

    if (!res.ok || !data.ok || !data.result) {
      return {
        ok: false,
        error: data.error || 'AI Tajweed Coach is unavailable right now. Check your internet connection.',
      };
    }

    const r = data.result;
    return {
      ok: true,
      result: {
        overallScore: Math.max(0, Math.min(100, Math.round(Number(r.overallScore) || 0))),
        accuracyLabel: String(r.accuracyLabel || 'Reviewed'),
        transcriptArabic: String(r.transcriptArabic || ''),
        feedbackSummary: String(r.feedbackSummary || ''),
        makhrajTip: String(r.makhrajTip || ''),
        wordFeedback: Array.isArray(r.wordFeedback)
          ? r.wordFeedback.map((w) => ({
              word: String(w.word || ''),
              status:
                w.status === 'correct' ||
                w.status === 'harakat_issue' ||
                w.status === 'makhraj_issue' ||
                w.status === 'missed'
                  ? w.status
                  : 'correct',
              note: String(w.note || ''),
            }))
          : [],
      },
    };
  } catch {
    return {
      ok: false,
      error: 'You appear to be offline. Live AI Tajweed & Harakat analysis requires internet.',
    };
  }
}
