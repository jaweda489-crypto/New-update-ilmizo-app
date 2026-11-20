import type { KidsStoryItem, LanguageCode } from '../types/ilmizo';

export const STUDIO_AUDIO_DB_NAME = 'ilmizo_studio_audio_db';
export const STUDIO_AUDIO_DB_VERSION = 1;
export const STORE_STORY_AUDIO = 'story_audio';
export const STORE_QAIDA_AUDIO = 'qaida_audio';
export const STORE_WBW_AUDIO = 'wbw_audio';

export type StudioVoiceStyle = 'storyteller' | 'teacher';

export const AUDIO_PACK_CONTENT_VERSION = 'v1';

export interface CachedAudioBlobRecord {
  key: string;
  mimeType: string;
  blob: Blob;
  savedAtIso: string;
  bytes: number;
  checksumSha256?: string;
  contentVersion?: string;
}

export interface AudioIntegrityCheckResult {
  valid: boolean;
  reason?: string;
  checksumSha256?: string;
}

export interface StoryAudioCacheMetadata {
  key: string;
  storyId: string;
  pageIndex: number;
  language: LanguageCode;
  voiceStyle: StudioVoiceStyle;
  bytes: number;
  savedAtIso: string;
  checksumSha256?: string;
  contentVersion?: string;
}

export interface StoryOfflineStatus {
  cachedPages: number;
  totalPages: number;
  isFullyCached: boolean;
}

export interface StoryLibraryCacheSummary {
  totalStories: number;
  totalPages: number;
  cachedStoriesCount: number;
  partiallyCachedStoriesCount: number;
  cachedPagesCount: number;
  totalBytes: number;
  storyStatusMap: Record<string, StoryOfflineStatus>;
}

export type StoryPrefetchScope = 'single_story' | 'top_10' | 'all_49';

export interface StoryPrefetchTask {
  storyId: string;
  storyTitle: string;
  pageIndex: number;
  text: string;
  language: LanguageCode;
  voiceStyle: StudioVoiceStyle;
  cacheKey: string;
}

export interface StoryPrefetchProgressState {
  status: 'idle' | 'running' | 'paused' | 'completed' | 'cancelled' | 'error';
  scope: StoryPrefetchScope | null;
  language: LanguageCode | null;
  voiceStyle: StudioVoiceStyle | null;
  totalTasks: number;
  completedTasks: number;
  skippedCachedTasks: number;
  failedTasks: number;
  currentStoryTitle: string;
  currentPageIndex: number;
  lastError: string | null;
}

export interface ResolveHumanStoryAudioResult {
  ok: boolean;
  blobUrl?: string;
  fromCache?: boolean;
  voiceStyleUsed?: StudioVoiceStyle;
  offlineUncached?: boolean;
  error?: string;
}

export function resolveApiEndpoint(apiPath: string): string {
  const normalized = apiPath.startsWith('/') ? apiPath : `/${apiPath}`;
  const rawBase =
    typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL
      ? String((import.meta as any).env.VITE_API_BASE_URL).trim()
      : '';
  if (!rawBase) return normalized;
  return `${rawBase.replace(/\/+$/, '')}${normalized}`;
}

export function buildStoryAudioCacheKey(
  storyId: string,
  pageIndex: number,
  language: LanguageCode,
  voiceStyle: StudioVoiceStyle
): string {
  return `story:${storyId}:p${pageIndex}:${language}:${voiceStyle}`;
}

export function parseStoryAudioCacheKey(key: string): {
  storyId: string;
  pageIndex: number;
  language: LanguageCode;
  voiceStyle: StudioVoiceStyle;
} | null {
  const match = /^story:([^:]+):p(\d+):([^:]+):(storyteller|teacher)$/.exec(key);
  if (!match) return null;
  return {
    storyId: match[1],
    pageIndex: Number(match[2]),
    language: match[3] as LanguageCode,
    voiceStyle: match[4] as StudioVoiceStyle,
  };
}

export function base64ToAudioBlob(base64: string, mimeType = 'audio/wav'): Blob {
  const clean = base64.includes(',') ? base64.split(',')[1] : base64;
  const binary = atob(clean);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}

export function formatAudioCacheSizeMb(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0.0 MB';
  const mb = bytes / (1024 * 1024);
  if (mb < 0.1) return '<0.1 MB';
  return `${mb.toFixed(1)} MB`;
}

async function computeBytesSha256Hex(bytes: Uint8Array): Promise<string> {
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle?.digest) {
      const digest = await crypto.subtle.digest('SHA-256', bytes.buffer as ArrayBuffer);
      return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }
  } catch {
    // Fallback hash below for restricted contexts
  }
  let h1 = 0x811c9dc5 ^ bytes.length;
  for (let i = 0; i < bytes.length; i++) {
    h1 = Math.imul(h1 ^ bytes[i], 16777619);
  }
  return `fnv_${(h1 >>> 0).toString(16).padStart(8, '0')}`;
}

/**
 * Verifies downloaded or cached audio blobs are real non-empty audio containers (WAV/MP3/OGG/WebM/AAC)
 * rather than truncated fragments, empty payloads, or disguised HTML/JSON error pages.
 */
export async function verifyAudioBlobIntegrity(
  blob: Blob | null | undefined,
  expectedChecksum?: string
): Promise<AudioIntegrityCheckResult> {
  if (!blob || blob.size < 44) {
    return {
      valid: false,
      reason: `Audio file is empty or truncated (${blob?.size ?? 0} bytes).`,
    };
  }

  let bytes: Uint8Array;
  try {
    const ab = await blob.arrayBuffer();
    bytes = new Uint8Array(ab);
  } catch {
    return { valid: false, reason: 'Unable to read audio bytes from storage.' };
  }

  if (bytes.length < 44) {
    return { valid: false, reason: 'Audio payload shorter than valid media header.' };
  }

  const asciiHead = String.fromCharCode(...Array.from(bytes.slice(0, 32))).trimStart().toLowerCase();
  if (
    asciiHead.startsWith('<!doctype') ||
    asciiHead.startsWith('<html') ||
    asciiHead.startsWith('{"ok":false') ||
    asciiHead.startsWith('{"error"')
  ) {
    return { valid: false, reason: 'Corrupted payload: server HTML/JSON error saved instead of audio.' };
  }

  const isRiffWave =
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x41 &&
    bytes[10] === 0x56 &&
    bytes[11] === 0x45;
  const isId3 = bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33;
  const isMp3Sync = bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0;
  const isOgg = bytes[0] === 0x4f && bytes[1] === 0x67 && bytes[2] === 0x67 && bytes[3] === 0x53;
  const isFlac = bytes[0] === 0x66 && bytes[1] === 0x4c && bytes[2] === 0x61 && bytes[3] === 0x43;
  const isWebm = bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3;
  const isMp4Audio = bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70;

  if (!isRiffWave && !isId3 && !isMp3Sync && !isOgg && !isFlac && !isWebm && !isMp4Audio) {
    return { valid: false, reason: 'Unrecognized or corrupted audio container signature.' };
  }

  const checksumSha256 = await computeBytesSha256Hex(bytes);
  if (expectedChecksum && expectedChecksum !== checksumSha256) {
    return {
      valid: false,
      reason: 'Audio SHA-256 checksum mismatch (file corrupted on disk).',
    };
  }

  return { valid: true, checksumSha256 };
}

let persistentRequested = false;

export async function requestPersistentAudioStorage(): Promise<boolean> {
  if (persistentRequested) return true;
  persistentRequested = true;
  try {
    if (typeof navigator !== 'undefined' && navigator.storage?.persist) {
      return await navigator.storage.persist();
    }
  } catch {
    // Ignore storage persistence denial on restricted WebViews
  }
  return false;
}

export function openStudioAudioDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(STUDIO_AUDIO_DB_NAME, STUDIO_AUDIO_DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_STORY_AUDIO)) {
        db.createObjectStore(STORE_STORY_AUDIO, { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains(STORE_QAIDA_AUDIO)) {
        db.createObjectStore(STORE_QAIDA_AUDIO, { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains(STORE_WBW_AUDIO)) {
        db.createObjectStore(STORE_WBW_AUDIO, { keyPath: 'key' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('Failed to open studio audio DB'));
  });
}

export async function getCachedStoryAudioRecord(
  key: string
): Promise<CachedAudioBlobRecord | null> {
  try {
    const db = await openStudioAudioDatabase();
    const rec = await new Promise<CachedAudioBlobRecord | null>((resolve, reject) => {
      const tx = db.transaction(STORE_STORY_AUDIO, 'readonly');
      const req = tx.objectStore(STORE_STORY_AUDIO).get(key);
      req.onsuccess = () => resolve((req.result as CachedAudioBlobRecord) || null);
      req.onerror = () => reject(req.error);
    });
    db.close();
    if (!rec?.blob) return null;
    const integrity = await verifyAudioBlobIntegrity(rec.blob, rec.checksumSha256);
    if (!integrity.valid) {
      await deleteStoryAudioFromCache(key);
      return null;
    }
    return rec;
  } catch {
    return null;
  }
}

export async function putCachedStoryAudioRecord(key: string, blob: Blob): Promise<boolean> {
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
      const tx = db.transaction(STORE_STORY_AUDIO, 'readwrite');
      tx.objectStore(STORE_STORY_AUDIO).put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error('Audio cache write aborted'));
    });
    db.close();
    return true;
  } catch {
    return false;
  }
}

export async function deleteStoryAudioFromCache(key: string): Promise<void> {
  try {
    const db = await openStudioAudioDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_STORY_AUDIO, 'readwrite');
      tx.objectStore(STORE_STORY_AUDIO).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // ignore delete failures
  }
}

export async function clearAllCachedStoryAudio(): Promise<void> {
  try {
    const db = await openStudioAudioDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_STORY_AUDIO, 'readwrite');
      tx.objectStore(STORE_STORY_AUDIO).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // ignore clear failures
  }
}

export async function listAllCachedStoryAudioMetadata(): Promise<StoryAudioCacheMetadata[]> {
  try {
    const db = await openStudioAudioDatabase();
    const items = await new Promise<StoryAudioCacheMetadata[]>((resolve, reject) => {
      const result: StoryAudioCacheMetadata[] = [];
      const tx = db.transaction(STORE_STORY_AUDIO, 'readonly');
      const req = tx.objectStore(STORE_STORY_AUDIO).openCursor();
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor) {
          resolve(result);
          return;
        }
        const rec = cursor.value as CachedAudioBlobRecord;
        const parsed = parseStoryAudioCacheKey(String(rec?.key || ''));
        if (parsed && rec?.blob && rec.blob.size >= 44) {
          result.push({
            key: rec.key,
            storyId: parsed.storyId,
            pageIndex: parsed.pageIndex,
            language: parsed.language,
            voiceStyle: parsed.voiceStyle,
            bytes: Number(rec.bytes) || rec.blob.size,
            savedAtIso: rec.savedAtIso || '',
            checksumSha256: rec.checksumSha256,
            contentVersion: rec.contentVersion || AUDIO_PACK_CONTENT_VERSION,
          });
        }
        cursor.continue();
      };
      req.onerror = () => reject(req.error);
    });
    db.close();
    return items;
  } catch {
    return [];
  }
}

export async function getStoryLibraryCacheSummary(params: {
  stories: KidsStoryItem[];
  language: LanguageCode;
  voiceStyle: StudioVoiceStyle;
}): Promise<StoryLibraryCacheSummary> {
  const metadata = await listAllCachedStoryAudioMetadata();
  const cachedByExactKey = new Map<string, number>();
  let totalBytes = 0;

  for (const item of metadata) {
    totalBytes += item.bytes;
    if (item.language === params.language && item.voiceStyle === params.voiceStyle) {
      cachedByExactKey.set(item.key, item.bytes);
    }
  }

  let totalPages = 0;
  let cachedPagesCount = 0;
  let cachedStoriesCount = 0;
  let partiallyCachedStoriesCount = 0;
  const storyStatusMap: Record<string, StoryOfflineStatus> = {};

  for (const story of params.stories) {
    const pages = story.localizedPages?.[params.language] || story.pages;
    const pageCount = pages.length;
    let storyCachedPages = 0;

    for (let idx = 0; idx < pageCount; idx++) {
      totalPages += 1;
      const key = buildStoryAudioCacheKey(story.id, idx, params.language, params.voiceStyle);
      if (cachedByExactKey.has(key)) {
        cachedPagesCount += 1;
        storyCachedPages += 1;
      }
    }

    const isFullyCached = pageCount > 0 && storyCachedPages >= pageCount;
    if (isFullyCached) {
      cachedStoriesCount += 1;
    } else if (storyCachedPages > 0) {
      partiallyCachedStoriesCount += 1;
    }

    storyStatusMap[story.id] = {
      cachedPages: storyCachedPages,
      totalPages: pageCount,
      isFullyCached,
    };
  }

  return {
    totalStories: params.stories.length,
    totalPages,
    cachedStoriesCount,
    partiallyCachedStoriesCount,
    cachedPagesCount,
    totalBytes,
    storyStatusMap,
  };
}

function sleepWithAbort(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(Object.assign(new Error('Aborted'), { name: 'AbortError' }));
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(Object.assign(new Error('Aborted'), { name: 'AbortError' }));
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

/**
 * Resolves human-voice WAV audio for a story page strictly via IndexedDB + /api/ai/story-audio.
 * NEVER triggers or falls back to window.speechSynthesis TTS.
 */
export async function resolveStoryPageHumanAudio(params: {
  storyId: string;
  pageIndex: number;
  text: string;
  language: LanguageCode;
  voiceStyle: StudioVoiceStyle;
  signal?: AbortSignal;
  skipBlobUrl?: boolean;
}): Promise<ResolveHumanStoryAudioResult> {
  const primaryKey = buildStoryAudioCacheKey(
    params.storyId,
    params.pageIndex,
    params.language,
    params.voiceStyle
  );

  // 1. Primary IndexedDB cache hit
  const cachedPrimary = await getCachedStoryAudioRecord(primaryKey);
  if (cachedPrimary?.blob && cachedPrimary.blob.size > 0) {
    return {
      ok: true,
      blobUrl: params.skipBlobUrl ? undefined : URL.createObjectURL(cachedPrimary.blob),
      fromCache: true,
      voiceStyleUsed: params.voiceStyle,
    };
  }

  // 2. Alternate human voice persona cached locally (e.g. Teacher <-> Storyteller)
  const alternatePersona: StudioVoiceStyle =
    params.voiceStyle === 'storyteller' ? 'teacher' : 'storyteller';
  const alternateKey = buildStoryAudioCacheKey(
    params.storyId,
    params.pageIndex,
    params.language,
    alternatePersona
  );
  const cachedAlternate = await getCachedStoryAudioRecord(alternateKey);
  if (cachedAlternate?.blob && cachedAlternate.blob.size > 0) {
    return {
      ok: true,
      blobUrl: params.skipBlobUrl ? undefined : URL.createObjectURL(cachedAlternate.blob),
      fromCache: true,
      voiceStyleUsed: alternatePersona,
    };
  }

  // 3. Offline & uncached: explicitly refuse silent robotic TTS fallback
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return {
      ok: false,
      offlineUncached: true,
      error:
        'You are offline and this story page has not been saved yet. Connect once and tap "Save Offline" to hear the human storyteller offline.',
    };
  }

  // 4. Fetch Studio Human Voice WAV with up to 2 transient retries (429 / 5xx)
  const endpoint = resolveApiEndpoint('/api/ai/story-audio');
  const maxAttempts = 3;
  let lastError = 'Studio Storyteller audio is temporarily unavailable.';

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (params.signal?.aborted) {
      return { ok: false, error: 'Cancelled' };
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: params.signal,
        body: JSON.stringify({
          storyId: params.storyId,
          pageIndex: params.pageIndex,
          text: params.text,
          language: params.language,
          voiceStyle: params.voiceStyle,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        mimeType?: string;
        base64Audio?: string;
        error?: string;
      };

      if (res.ok && data.ok && data.base64Audio) {
        const wavBlob = base64ToAudioBlob(data.base64Audio, data.mimeType || 'audio/wav');
        const check = await verifyAudioBlobIntegrity(wavBlob);
        if (check.valid) {
          await requestPersistentAudioStorage();
          await putCachedStoryAudioRecord(primaryKey, wavBlob);
          return {
            ok: true,
            blobUrl: params.skipBlobUrl ? undefined : URL.createObjectURL(wavBlob),
            fromCache: false,
            voiceStyleUsed: params.voiceStyle,
          };
        }
        return {
          ok: false,
          offlineUncached: false,
          error: check.reason || 'Downloaded story audio failed integrity verification.',
        };
      }

      lastError = data.error || `Story audio server returned ${res.status}.`;
      const isRetryable = res.status === 429 || res.status >= 500;
      if (!isRetryable || attempt === maxAttempts - 1) {
        return { ok: false, offlineUncached: false, error: lastError };
      }
      await sleepWithAbort(attempt === 0 ? 550 : 1400, params.signal);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return { ok: false, error: 'Cancelled' };
      }
      lastError =
        'Unable to reach Studio voice service. Connect to internet once to save this story offline.';
      if (attempt === maxAttempts - 1) {
        return {
          ok: false,
          offlineUncached: true,
          error: lastError,
        };
      }
      try {
        await sleepWithAbort(attempt === 0 ? 550 : 1400, params.signal);
      } catch {
        return { ok: false, error: 'Cancelled' };
      }
    }
  }

  return { ok: false, offlineUncached: true, error: lastError };
}

export function buildStoryPrefetchTasks(params: {
  stories: KidsStoryItem[];
  language: LanguageCode;
  voiceStyle: StudioVoiceStyle;
}): StoryPrefetchTask[] {
  const tasks: StoryPrefetchTask[] = [];
  for (const story of params.stories) {
    const pages = story.localizedPages?.[params.language] || story.pages;
    const title = story.localizedTitles?.[params.language] || story.title;
    pages.forEach((text, pageIndex) => {
      tasks.push({
        storyId: story.id,
        storyTitle: title,
        pageIndex,
        text,
        language: params.language,
        voiceStyle: params.voiceStyle,
        cacheKey: buildStoryAudioCacheKey(story.id, pageIndex, params.language, params.voiceStyle),
      });
    });
  }
  return tasks;
}

const PREFETCH_CONCURRENCY = 2;

class StoryAudioPrefetchManager {
  private state: StoryPrefetchProgressState = {
    status: 'idle',
    scope: null,
    language: null,
    voiceStyle: null,
    totalTasks: 0,
    completedTasks: 0,
    skippedCachedTasks: 0,
    failedTasks: 0,
    currentStoryTitle: '',
    currentPageIndex: 0,
    lastError: null,
  };

  private listeners = new Set<(state: StoryPrefetchProgressState) => void>();
  private abortController: AbortController | null = null;
  private isPaused = false;
  private pauseWaiters: Array<() => void> = [];
  private activeRunId = 0;

  getState(): StoryPrefetchProgressState {
    return { ...this.state };
  }

  subscribe(listener: (state: StoryPrefetchProgressState) => void): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit(patch: Partial<StoryPrefetchProgressState>) {
    this.state = { ...this.state, ...patch };
    const snapshot = this.getState();
    this.listeners.forEach((fn) => fn(snapshot));
  }

  pausePrefetch() {
    if (this.state.status !== 'running') return;
    this.isPaused = true;
    this.emit({ status: 'paused' });
  }

  resumePrefetch() {
    if (this.state.status !== 'paused') return;
    this.isPaused = false;
    this.emit({ status: 'running', lastError: null });
    const waiters = this.pauseWaiters.splice(0);
    waiters.forEach((wake) => wake());
  }

  cancelPrefetch() {
    this.activeRunId += 1;
    this.isPaused = false;
    this.abortController?.abort();
    this.abortController = null;
    const waiters = this.pauseWaiters.splice(0);
    waiters.forEach((wake) => wake());
    this.emit({ status: 'cancelled' });
  }

  private async waitIfPaused(runId: number): Promise<boolean> {
    while (this.isPaused && runId === this.activeRunId) {
      await new Promise<void>((resolve) => {
        this.pauseWaiters.push(resolve);
      });
    }
    return runId === this.activeRunId;
  }

  async startPrefetch(params: {
    stories: KidsStoryItem[];
    scope: StoryPrefetchScope;
    language: LanguageCode;
    voiceStyle: StudioVoiceStyle;
  }): Promise<StoryPrefetchProgressState> {
    this.cancelPrefetch();
    const runId = ++this.activeRunId;
    this.isPaused = false;
    const controller = new AbortController();
    this.abortController = controller;

    await requestPersistentAudioStorage();
    const allTasks = buildStoryPrefetchTasks({
      stories: params.stories,
      language: params.language,
      voiceStyle: params.voiceStyle,
    });

    const cachedRecords = await listAllCachedStoryAudioMetadata();
    const existingKeys = new Set(cachedRecords.map((r) => r.key));
    const pendingTasks: StoryPrefetchTask[] = [];
    let skippedCachedTasks = 0;

    for (const task of allTasks) {
      if (existingKeys.has(task.cacheKey)) {
        skippedCachedTasks += 1;
      } else {
        pendingTasks.push(task);
      }
    }

    this.emit({
      status: pendingTasks.length === 0 ? 'completed' : 'running',
      scope: params.scope,
      language: params.language,
      voiceStyle: params.voiceStyle,
      totalTasks: allTasks.length,
      completedTasks: skippedCachedTasks,
      skippedCachedTasks,
      failedTasks: 0,
      currentStoryTitle: pendingTasks[0]?.storyTitle || allTasks[0]?.storyTitle || '',
      currentPageIndex: pendingTasks[0]?.pageIndex || 0,
      lastError: null,
    });

    if (pendingTasks.length === 0) {
      return this.getState();
    }

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      this.emit({
        status: 'error',
        lastError: 'You are offline. Connect to Wi-Fi or mobile data once to save remaining stories.',
      });
      return this.getState();
    }

    let cursor = 0;

    const worker = async () => {
      while (runId === this.activeRunId && !controller.signal.aborted) {
        const shouldContinue = await this.waitIfPaused(runId);
        if (!shouldContinue || controller.signal.aborted) return;

        const nextIdx = cursor++;
        if (nextIdx >= pendingTasks.length) return;
        const task = pendingTasks[nextIdx];

        this.emit({
          currentStoryTitle: task.storyTitle,
          currentPageIndex: task.pageIndex,
        });

        const res = await resolveStoryPageHumanAudio({
          storyId: task.storyId,
          pageIndex: task.pageIndex,
          text: task.text,
          language: task.language,
          voiceStyle: task.voiceStyle,
          signal: controller.signal,
          skipBlobUrl: true,
        });

        if (runId !== this.activeRunId || controller.signal.aborted) return;

        if (res.ok) {
          this.emit({
            completedTasks: this.state.completedTasks + 1,
          });
        } else {
          this.emit({
            failedTasks: this.state.failedTasks + 1,
            lastError: res.error || 'Some pages could not be saved right now.',
          });
          if (res.offlineUncached && typeof navigator !== 'undefined' && navigator.onLine === false) {
            this.isPaused = true;
            this.emit({
              status: 'paused',
              lastError: 'Connection lost. Paused automatically — resume when online.',
            });
          }
        }

        // Gentle pacing so device & API stay responsive for active reader playback
        try {
          await sleepWithAbort(120, controller.signal);
        } catch {
          return;
        }
      }
    };

    const workers = Array.from(
      { length: Math.min(PREFETCH_CONCURRENCY, pendingTasks.length) },
      () => worker()
    );
    await Promise.all(workers);

    if (runId !== this.activeRunId) {
      return this.getState();
    }

    if (controller.signal.aborted) {
      this.emit({ status: 'cancelled' });
    } else if (this.state.failedTasks > 0 && this.state.completedTasks < this.state.totalTasks) {
      this.emit({ status: 'error' });
    } else {
      this.emit({ status: 'completed', lastError: null });
    }

    this.abortController = null;
    return this.getState();
  }
}

export const storyAudioPrefetchManager = new StoryAudioPrefetchManager();

// Predictive background lookahead (respects Save-Data & offline mode)
const inFlightLookaheadKeys = new Set<string>();

function isLookaheadPermitted(): boolean {
  if (typeof navigator === 'undefined') return false;
  if (navigator.onLine === false) return false;
  const conn = (navigator as any).connection;
  if (conn?.saveData === true) return false;
  return true;
}

async function warmStoryPageSilently(params: {
  story: KidsStoryItem;
  pageIndex: number;
  language: LanguageCode;
  voiceStyle: StudioVoiceStyle;
}) {
  if (!isLookaheadPermitted()) return;
  const pages = params.story.localizedPages?.[params.language] || params.story.pages;
  const text = pages[params.pageIndex];
  if (!text?.trim()) return;

  const key = buildStoryAudioCacheKey(
    params.story.id,
    params.pageIndex,
    params.language,
    params.voiceStyle
  );
  if (inFlightLookaheadKeys.has(key)) return;

  const existing = await getCachedStoryAudioRecord(key);
  if (existing?.blob && existing.blob.size > 0) return;

  inFlightLookaheadKeys.add(key);
  try {
    await resolveStoryPageHumanAudio({
      storyId: params.story.id,
      pageIndex: params.pageIndex,
      text,
      language: params.language,
      voiceStyle: params.voiceStyle,
      skipBlobUrl: true,
    });
  } finally {
    inFlightLookaheadKeys.delete(key);
  }
}

export function scheduleStoryReaderLookahead(params: {
  stories: KidsStoryItem[];
  currentStoryId: string;
  currentPageIndex: number;
  language: LanguageCode;
  voiceStyle: StudioVoiceStyle;
  onCachedUpdated?: () => void;
}): () => void {
  if (!isLookaheadPermitted()) return () => {};
  let cancelled = false;
  const storyIdx = params.stories.findIndex((s) => s.id === params.currentStoryId);
  if (storyIdx < 0) return () => {};

  const currentStory = params.stories[storyIdx];
  const currentPages = currentStory.localizedPages?.[params.language] || currentStory.pages;

  const queue: { story: KidsStoryItem; pageIndex: number }[] = [];
  if (params.currentPageIndex + 1 < currentPages.length) {
    queue.push({ story: currentStory, pageIndex: params.currentPageIndex + 1 });
  }
  if (params.currentPageIndex + 2 < currentPages.length) {
    queue.push({ story: currentStory, pageIndex: params.currentPageIndex + 2 });
  }
  const nextStory = params.stories[storyIdx + 1];
  if (nextStory) {
    queue.push({ story: nextStory, pageIndex: 0 });
  }

  const timer = setTimeout(() => {
    void (async () => {
      for (const item of queue) {
        if (cancelled || !isLookaheadPermitted()) return;
        await warmStoryPageSilently({
          story: item.story,
          pageIndex: item.pageIndex,
          language: params.language,
          voiceStyle: params.voiceStyle,
        });
        if (!cancelled) params.onCachedUpdated?.();
      }
    })();
  }, 450);

  return () => {
    cancelled = true;
    clearTimeout(timer);
  };
}

export function scheduleStarterStoriesWarmup(params: {
  stories: KidsStoryItem[];
  language: LanguageCode;
  voiceStyle: StudioVoiceStyle;
  count?: number;
  onCachedUpdated?: () => void;
}): () => void {
  if (!isLookaheadPermitted()) return () => {};
  let cancelled = false;
  const starterCount = Math.min(params.count ?? 2, params.stories.length);
  const targets = params.stories.slice(0, starterCount);

  const timer = setTimeout(() => {
    void (async () => {
      for (const story of targets) {
        if (cancelled || !isLookaheadPermitted()) return;
        await warmStoryPageSilently({
          story,
          pageIndex: 0,
          language: params.language,
          voiceStyle: params.voiceStyle,
        });
        if (!cancelled) params.onCachedUpdated?.();
      }
    })();
  }, 600);

  return () => {
    cancelled = true;
    clearTimeout(timer);
  };
}
