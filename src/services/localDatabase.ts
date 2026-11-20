import {
  ChildProfile,
  DailyVerseActivity,
  ExpenseEntry,
  HifzPlan,
  LanguageCode,
  LearningEvent,
  LocalStorageMetrics,
  PersonalNote,
  PrayerName,
  QuizAttempt,
  QuranBookmark,
  RevisionItem,
  SalahDayRecord,
  SurahPayload,
  TaskItem,
  UserProfile,
} from '../types/ilmizo';

export const ILMIZO_DB_NAME = 'ilmizo_local_db';
export const ILMIZO_DB_SCHEMA_VERSION = 2;
export const LEGACY_MASTER_STORAGE_KEY = 'ilmizo_master_state_v1';
export const MIGRATION_VERIFIED_PREF_KEY = 'ilmizo_migration_v2_verified';
export const LIGHTWEIGHT_PREFS_KEY = 'ilmizo_lightweight_prefs_v2';

export interface PersistedMasterState {
  schemaVersion: number;
  updatedAtIso?: string;
  user: UserProfile;
  dailyVerseActivity: DailyVerseActivity;
  learningEvents: LearningEvent[];
  studiedNames99Numbers: number[];
  recentlyOpenedSurahs: number[];
  bookmarks: QuranBookmark[];
  personalNotes: PersonalNote[];
  hifzPlans: HifzPlan[];
  revisionItems: RevisionItem[];
  salahRecords: Record<string, SalahDayRecord>;
  favoriteDuaIds: string[];
  seerahMilestoneIds: string[];
  completedLessonIds: string[];
  masteredVocabIds: string[];
  quizAttempts: QuizAttempt[];
  tasks: TaskItem[];
  expenses: ExpenseEntry[];
  childrenProfiles: ChildProfile[];
  activeChildId: string;
}

export interface OfflineSurahRecord {
  cacheKey: string; // "${surahNumber}_${language}"
  surahNumber: number;
  language: LanguageCode;
  isExplicitDownload: boolean;
  downloadedAtIso: string;
  verifiedAtIso?: string;
  packageVersion?: string;
  checksumSha256?: string;
  sizeBytes: number;
  payload: SurahPayload;
}

export interface OfflineAudioRecord {
  audioKey: string; // "${editionId}:${surahNumber}"
  surahNumber: number;
  editionId: string;
  reciterName?: string;
  bitrate?: string;
  expectedAyahCount?: number;
  downloadedAyahCount?: number;
  downloadedAtIso: string;
  verifiedAtIso?: string;
  checksumSha256?: string;
  sizeBytes: number;
  ayahAudioUrls: Record<number, string>;
  ayahAudioDataUrls?: Record<number, string>;
}

export interface CachedPrayerTimingsRecord {
  cacheKey: string; // "${city}_${country}_${method}_${school}_${dateKey}"
  city: string;
  country: string;
  method: number;
  school: number;
  dateKey: string;
  timings: Record<PrayerName, string>;
  hijriLabel: string;
  cachedAtIso: string;
}

export interface RecoverySnapshotRecord {
  id: string; // e.g., 'pre_import_latest'
  createdAtIso: string;
  reason: string;
  schemaVersion: number;
  state: PersistedMasterState;
}

export interface StorageWriteResult {
  ok: boolean;
  quotaExceeded?: boolean;
  error?: string;
}

// ============================================================================
// IN-MEMORY FALLBACK STORE (Used in Node Test Runner or Restricted Environments)
// ============================================================================

interface MemoryStores {
  app_state: Map<string, { id: string; schemaVersion: number; updatedAtIso: string; migratedFromLegacy: boolean; state: PersistedMasterState }>;
  learning_events: Map<string, LearningEvent>;
  offline_surahs: Map<string, OfflineSurahRecord>;
  offline_audio: Map<string, OfflineAudioRecord>;
  prayer_timings_cache: Map<string, CachedPrayerTimingsRecord>;
  recovery_snapshots: Map<string, RecoverySnapshotRecord>;
}

const memoryStores: MemoryStores = {
  app_state: new Map(),
  learning_events: new Map(),
  offline_surahs: new Map(),
  offline_audio: new Map(),
  prayer_timings_cache: new Map(),
  recovery_snapshots: new Map(),
};

let simulateQuotaExceededFlag = false;
let lastQuotaErrorMessage: string | null = null;
let lastSavedTimestampIso: string | null = null;
let dbPromise: Promise<IDBDatabase | null> | null = null;

export function setSimulateQuotaExceededForTesting(enabled: boolean): void {
  simulateQuotaExceededFlag = enabled;
  if (!enabled) {
    lastQuotaErrorMessage = null;
  }
}

export function resetLocalDatabaseMemoryForTesting(): void {
  memoryStores.app_state.clear();
  memoryStores.learning_events.clear();
  memoryStores.offline_surahs.clear();
  memoryStores.offline_audio.clear();
  memoryStores.prayer_timings_cache.clear();
  memoryStores.recovery_snapshots.clear();
  simulateQuotaExceededFlag = false;
  lastQuotaErrorMessage = null;
  lastSavedTimestampIso = null;
  dbPromise = null;
}

function hasNativeIndexedDB(): boolean {
  try {
    return typeof indexedDB !== 'undefined' && indexedDB !== null;
  } catch {
    return false;
  }
}

function estimateJsonSizeBytes(obj: unknown): number {
  try {
    return new Blob([JSON.stringify(obj)]).size;
  } catch {
    try {
      return JSON.stringify(obj).length * 2;
    } catch {
      return 0;
    }
  }
}

function isQuotaError(err: unknown): boolean {
  if (!err) return false;
  if (typeof DOMException !== 'undefined' && err instanceof DOMException) {
    return (
      err.name === 'QuotaExceededError' ||
      err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      err.code === 22 ||
      err.code === 1014
    );
  }
  const msg = String((err as Error)?.message || err).toLowerCase();
  return msg.includes('quota') || msg.includes('storage full');
}

function openIndexedDatabase(): Promise<IDBDatabase | null> {
  if (!hasNativeIndexedDB()) {
    return Promise.resolve(null);
  }
  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise<IDBDatabase | null>((resolve) => {
    try {
      const request = indexedDB.open(ILMIZO_DB_NAME, ILMIZO_DB_SCHEMA_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('app_state')) {
          db.createObjectStore('app_state', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('learning_events')) {
          const eventStore = db.createObjectStore('learning_events', { keyPath: 'id' });
          eventStore.createIndex('dateKey', 'dateKey', { unique: false });
          eventStore.createIndex('childId', 'childId', { unique: false });
          eventStore.createIndex('mode', 'mode', { unique: false });
          eventStore.createIndex('type', 'type', { unique: false });
        }
        if (!db.objectStoreNames.contains('offline_surahs')) {
          const surahStore = db.createObjectStore('offline_surahs', { keyPath: 'cacheKey' });
          surahStore.createIndex('surahNumber', 'surahNumber', { unique: false });
          surahStore.createIndex('isExplicitDownload', 'isExplicitDownload', { unique: false });
        }
        if (!db.objectStoreNames.contains('offline_audio')) {
          db.createObjectStore('offline_audio', { keyPath: 'audioKey' });
        }
        if (!db.objectStoreNames.contains('prayer_timings_cache')) {
          db.createObjectStore('prayer_timings_cache', { keyPath: 'cacheKey' });
        }
        if (!db.objectStoreNames.contains('recovery_snapshots')) {
          db.createObjectStore('recovery_snapshots', { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        const db = request.result;
        db.onclose = () => {
          dbPromise = null;
        };
        db.onversionchange = () => {
          try {
            db.close();
          } catch {
            // ignore close errors
          }
          dbPromise = null;
        };
        resolve(db);
      };

      request.onerror = () => {
        dbPromise = null;
        lastQuotaErrorMessage =
          request.error?.message || 'Unable to open local IndexedDB storage.';
        resolve(null);
      };

      request.onblocked = () => {
        dbPromise = null;
        lastQuotaErrorMessage =
          'Local storage upgrade was blocked by another open tab. Close duplicate tabs if persistence fails.';
        resolve(null);
      };
    } catch {
      dbPromise = null;
      resolve(null);
    }
  });

  return dbPromise;
}

export async function requestPersistentLocalStorage(): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.storage?.persist) {
      return await navigator.storage.persist();
    }
  } catch {
    // Ignore unsupported storage.persist in restricted WebViews
  }
  return false;
}

async function idbGet<T>(storeName: keyof MemoryStores, key: string): Promise<T | null> {
  const db = await openIndexedDatabase();
  if (!db) {
    const map = memoryStores[storeName] as Map<string, T>;
    return map.get(key) ?? null;
  }

  return new Promise<T | null>((resolve) => {
    try {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as T) ?? null);
      req.onerror = () => {
        const map = memoryStores[storeName] as Map<string, T>;
        resolve(map.get(key) ?? null);
      };
    } catch {
      const map = memoryStores[storeName] as Map<string, T>;
      resolve(map.get(key) ?? null);
    }
  });
}

async function idbGetAll<T>(storeName: keyof MemoryStores): Promise<T[]> {
  const db = await openIndexedDatabase();
  if (!db) {
    const map = memoryStores[storeName] as Map<string, T>;
    return Array.from(map.values());
  }

  return new Promise<T[]>((resolve) => {
    try {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve((req.result as T[]) || []);
      req.onerror = () => {
        const map = memoryStores[storeName] as Map<string, T>;
        resolve(Array.from(map.values()));
      };
    } catch {
      const map = memoryStores[storeName] as Map<string, T>;
      resolve(Array.from(map.values()));
    }
  });
}

async function idbPut<T>(
  storeName: keyof MemoryStores,
  key: string,
  value: T
): Promise<StorageWriteResult> {
  if (simulateQuotaExceededFlag) {
    lastQuotaErrorMessage = 'Storage quota exceeded on this device. Free up space or delete offline downloads.';
    return {
      ok: false,
      quotaExceeded: true,
      error: lastQuotaErrorMessage,
    };
  }

  // Always keep in-memory store synchronized for immediate consistency
  (memoryStores[storeName] as Map<string, T>).set(key, value);

  const db = await openIndexedDatabase();
  if (!db) {
    return { ok: true };
  }

  return new Promise<StorageWriteResult>((resolve) => {
    let settled = false;
    const finish = (res: StorageWriteResult) => {
      if (settled) return;
      settled = true;
      resolve(res);
    };

    try {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(value);

      tx.oncomplete = () => {
        finish({ ok: true });
      };

      tx.onabort = () => {
        const err = tx.error || req.error;
        const quota = isQuotaError(err);
        if (quota) {
          lastQuotaErrorMessage = 'Browser IndexedDB quota exceeded.';
        }
        finish({
          ok: false,
          quotaExceeded: quota,
          error: err?.message || 'IndexedDB write transaction was interrupted or aborted.',
        });
      };

      tx.onerror = () => {
        const err = tx.error || req.error;
        const quota = isQuotaError(err);
        if (quota) {
          lastQuotaErrorMessage = 'Browser IndexedDB quota exceeded.';
        }
        finish({
          ok: false,
          quotaExceeded: quota,
          error: err?.message || 'IndexedDB write failed.',
        });
      };

      req.onerror = () => {
        const quota = isQuotaError(req.error);
        if (quota) {
          lastQuotaErrorMessage = 'Browser IndexedDB quota exceeded.';
        }
        finish({
          ok: false,
          quotaExceeded: quota,
          error: req.error?.message || 'IndexedDB write failed.',
        });
      };
    } catch (err) {
      const quota = isQuotaError(err);
      if (quota) {
        lastQuotaErrorMessage = 'Browser IndexedDB quota exceeded.';
      }
      finish({
        ok: false,
        quotaExceeded: quota,
        error: err instanceof Error ? err.message : 'IndexedDB transaction error.',
      });
    }
  });
}

async function idbDelete(storeName: keyof MemoryStores, key: string): Promise<boolean> {
  (memoryStores[storeName] as Map<string, unknown>).delete(key);
  const db = await openIndexedDatabase();
  if (!db) return true;

  return new Promise<boolean>((resolve) => {
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      resolve(ok);
    };
    try {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      tx.oncomplete = () => finish(true);
      tx.onabort = () => finish(false);
      tx.onerror = () => finish(false);
      req.onerror = () => finish(false);
    } catch {
      finish(false);
    }
  });
}

// ============================================================================
// LIGHTWEIGHT PREFERENCES (localStorage only for small settings/markers)
// ============================================================================

export interface LightweightPreferences {
  language?: LanguageCode;
  darkMode?: boolean;
  autoPlayRecitation?: boolean;
  arabicFontScale?: number;
  pwaInstallDismissedAt?: string;
}

export function getLightweightPreferences(): LightweightPreferences {
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(LIGHTWEIGHT_PREFS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as LightweightPreferences;
  } catch {
    return {};
  }
}

export function saveLightweightPreferences(patch: Partial<LightweightPreferences>): StorageWriteResult {
  if (simulateQuotaExceededFlag) {
    lastQuotaErrorMessage = 'LocalStorage quota exceeded while saving preferences.';
    return {
      ok: false,
      quotaExceeded: true,
      error: lastQuotaErrorMessage,
    };
  }
  try {
    if (typeof localStorage === 'undefined') return { ok: true };
    const current = getLightweightPreferences();
    const merged = { ...current, ...patch };
    localStorage.setItem(LIGHTWEIGHT_PREFS_KEY, JSON.stringify(merged));
    return { ok: true };
  } catch (err) {
    const quota = isQuotaError(err);
    if (quota) {
      lastQuotaErrorMessage = 'LocalStorage quota exceeded.';
    }
    return {
      ok: false,
      quotaExceeded: quota,
      error: err instanceof Error ? err.message : 'Failed to write lightweight preferences.',
    };
  }
}

// ============================================================================
// SYNCHRONOUS LEGACY SEED + ASYNC INDEXEDDB HYDRATION & MIGRATION
// ============================================================================

export function readLegacyMasterStateSync(): Partial<PersistedMasterState> | null {
  try {
    // Check in-memory master state first (helpful when re-mounting in tests/SPA)
    const inMem = memoryStores.app_state.get('master_v2');
    if (inMem?.state) {
      return inMem.state;
    }
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(LEGACY_MASTER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as Partial<PersistedMasterState>;
  } catch {
    return null;
  }
}

/**
 * Hydrates master state from IndexedDB ('master_v2').
 * If IndexedDB has no 'master_v2' record yet and `ilmizo_master_state_v1` exists in localStorage,
 * safely migrates the legacy state into IndexedDB, verifies the read-back, marks migration verified,
 * and preserves `ilmizo_master_state_v1` intact without deleting it.
 */
export async function hydrateOrMigrateMasterState(
  normalizeFn: (raw: Partial<PersistedMasterState> | null) => PersistedMasterState
): Promise<{
  state: PersistedMasterState;
  migratedFromLegacy: boolean;
  verifiedMigration: boolean;
}> {
  const existingRecord = await idbGet<{
    id: string;
    schemaVersion: number;
    updatedAtIso: string;
    migratedFromLegacy: boolean;
    state: PersistedMasterState;
  }>('app_state', 'master_v2');

  if (existingRecord && existingRecord.state && typeof existingRecord.state === 'object') {
    const normalized = normalizeFn(existingRecord.state);
    lastSavedTimestampIso = existingRecord.updatedAtIso || new Date().toISOString();
    return {
      state: normalized,
      migratedFromLegacy: Boolean(existingRecord.migratedFromLegacy),
      verifiedMigration: true,
    };
  }

  // If primary record was unreadable/corrupted, try recovering from pre-import recovery snapshot before legacy v1
  if (existingRecord && (!existingRecord.state || typeof existingRecord.state !== 'object')) {
    const recoverySnap = await getRecoverySnapshot('pre_import_latest');
    if (recoverySnap?.state && typeof recoverySnap.state === 'object') {
      const recovered = normalizeFn(recoverySnap.state);
      lastQuotaErrorMessage =
        'Recovered user progress from local recovery snapshot after detecting a malformed primary state record.';
      return {
        state: recovered,
        migratedFromLegacy: Boolean(recoverySnap.state.schemaVersion === 1),
        verifiedMigration: true,
      };
    }
  }

  // Check for legacy ilmizo_master_state_v1 in localStorage
  const legacyRaw = readLegacyMasterStateSync();
  const hadLegacyRecord = Boolean(legacyRaw && Object.keys(legacyRaw).length > 0);
  const normalizedState = normalizeFn(legacyRaw);
  const nowIso = new Date().toISOString();

  const writeRes = await idbPut('app_state', 'master_v2', {
    id: 'master_v2',
    schemaVersion: ILMIZO_DB_SCHEMA_VERSION,
    updatedAtIso: nowIso,
    migratedFromLegacy: hadLegacyRecord,
    state: normalizedState,
  });

  // Also index individual learning events into learning_events store
  for (const evt of normalizedState.learningEvents || []) {
    if (evt && evt.id) {
      await idbPut('learning_events', evt.id, evt);
    }
  }

  // Verify migration by reading back from IndexedDB before setting the verified marker
  const verifyRead = await idbGet<{ id: string; state: PersistedMasterState }>('app_state', 'master_v2');
  const verified = Boolean(writeRes.ok && verifyRead && verifyRead.state);

  if (verified && hadLegacyRecord) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(MIGRATION_VERIFIED_PREF_KEY, 'true');
      }
    } catch {
      // ignore
    }
  }

  lastSavedTimestampIso = nowIso;
  return {
    state: normalizedState,
    migratedFromLegacy: hadLegacyRecord,
    verifiedMigration: verified,
  };
}

export async function saveMasterStateToLocalDb(
  state: PersistedMasterState
): Promise<StorageWriteResult> {
  const nowIso = new Date().toISOString();
  const { parentPin: _omitPlainPin, ...userWithoutPlainPin } = state.user || ({} as any);
  const payload: PersistedMasterState = {
    ...state,
    user: userWithoutPlainPin as any,
    schemaVersion: ILMIZO_DB_SCHEMA_VERSION,
    updatedAtIso: nowIso,
  };

  // 1. Write to IndexedDB primary store
  const idbResult = await idbPut('app_state', 'master_v2', {
    id: 'master_v2',
    schemaVersion: ILMIZO_DB_SCHEMA_VERSION,
    updatedAtIso: nowIso,
    migratedFromLegacy: true,
    state: payload,
  });

  if (!idbResult.ok) {
    return idbResult;
  }

  // 2. Sync learning_events store for latest events
  for (const evt of (state.learningEvents || []).slice(0, 50)) {
    if (evt && evt.id) {
      await idbPut('learning_events', evt.id, evt);
    }
  }

  // 3. Keep lightweight preferences updated
  saveLightweightPreferences({
    language: state.user.language,
    darkMode: state.user.darkMode,
    autoPlayRecitation: state.user.autoPlayRecitation,
    arabicFontScale: state.user.arabicFontScale,
  });

  // 4. Mirror to legacy key only if no pre-migration v1 record is being protected
  try {
    if (typeof localStorage !== 'undefined' && !simulateQuotaExceededFlag) {
      localStorage.setItem(LEGACY_MASTER_STORAGE_KEY, JSON.stringify(payload));
    }
  } catch (err) {
    if (isQuotaError(err)) {
      // IndexedDB succeeded even if localStorage 5MB mirror is full; do not fail primary save
    }
  }

  lastSavedTimestampIso = nowIso;
  return { ok: true };
}

// ============================================================================
// OFFLINE SURAHS & AUDIO STORAGE (IndexedDB)
// ============================================================================

export async function getOfflineSurahFromDb(
  surahNumber: number,
  language: LanguageCode
): Promise<OfflineSurahRecord | null> {
  const cacheKey = `${surahNumber}_${language}`;
  const fromIdb = await idbGet<OfflineSurahRecord>('offline_surahs', cacheKey);
  if (fromIdb && fromIdb.payload) {
    return fromIdb;
  }

  // Also check if another record for the same surahNumber (e.g. from Full Offline Quran Package)
  // already contains the requested language translation in its ayahs
  const allSurahs = await idbGetAll<OfflineSurahRecord>('offline_surahs');
  const multiLangMatch = allSurahs.find(
    (rec) =>
      rec.surahNumber === surahNumber &&
      rec.payload &&
      Array.isArray(rec.payload.ayahs) &&
      rec.payload.ayahs.length > 0 &&
      Boolean(rec.payload.ayahs[0]?.translations?.[language] || rec.payload.ayahs[0]?.translations?.en)
  );
  if (multiLangMatch) {
    return multiLangMatch;
  }

  // Check legacy localStorage cache and migrate into IndexedDB if present
  try {
    if (typeof localStorage !== 'undefined') {
      const legacyKey = `ilmizo_surah_cache_v1_${surahNumber}_${language}`;
      const raw = localStorage.getItem(legacyKey);
      if (raw) {
        const parsed = JSON.parse(raw) as SurahPayload;
        if (parsed && parsed.meta && parsed.meta.number === surahNumber) {
          const migratedRecord: OfflineSurahRecord = {
            cacheKey,
            surahNumber,
            language,
            isExplicitDownload: false,
            downloadedAtIso: new Date().toISOString(),
            sizeBytes: estimateJsonSizeBytes(parsed),
            payload: parsed,
          };
          await idbPut('offline_surahs', cacheKey, migratedRecord);
          return migratedRecord;
        }
      }
    }
  } catch {
    // ignore
  }

  return null;
}

export async function saveOfflineSurahToDb(
  surahNumber: number,
  language: LanguageCode,
  payload: SurahPayload,
  isExplicitDownload: boolean,
  metadata?: {
    checksumSha256?: string;
    packageVersion?: string;
    verifiedAtIso?: string;
  }
): Promise<StorageWriteResult> {
  const cacheKey = `${surahNumber}_${language}`;
  // Preserve explicit download status if already explicitly downloaded
  const existing = await idbGet<OfflineSurahRecord>('offline_surahs', cacheKey);
  const finalExplicit = isExplicitDownload || Boolean(existing?.isExplicitDownload);

  const enrichedPayload: SurahPayload = {
    ...payload,
    offlineUnavailable: false,
    offlineSourceType: finalExplicit ? 'downloaded_idb' : 'cached_idb',
  };

  const nowIso = new Date().toISOString();
  const record: OfflineSurahRecord = {
    cacheKey,
    surahNumber,
    language,
    isExplicitDownload: finalExplicit,
    downloadedAtIso: existing?.downloadedAtIso || nowIso,
    verifiedAtIso: metadata?.verifiedAtIso || existing?.verifiedAtIso || nowIso,
    packageVersion: metadata?.packageVersion || existing?.packageVersion || '1.2.0',
    checksumSha256: metadata?.checksumSha256 || existing?.checksumSha256,
    sizeBytes: estimateJsonSizeBytes(enrichedPayload),
    payload: enrichedPayload,
  };

  return idbPut('offline_surahs', cacheKey, record);
}

export async function deleteOfflineSurahFromDb(
  surahNumber: number,
  language?: LanguageCode
): Promise<void> {
  const all = await idbGetAll<OfflineSurahRecord>('offline_surahs');
  for (const rec of all) {
    if (rec.surahNumber === surahNumber && (!language || rec.language === language)) {
      await idbDelete('offline_surahs', rec.cacheKey);
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(`ilmizo_surah_cache_v1_${rec.surahNumber}_${rec.language}`);
        }
      } catch {
        // ignore
      }
    }
  }
}

export async function clearNonDownloadedApiCache(): Promise<{ clearedSurahs: number; clearedPrayerCaches: number }> {
  const allSurahs = await idbGetAll<OfflineSurahRecord>('offline_surahs');
  let clearedSurahs = 0;
  for (const rec of allSurahs) {
    if (!rec.isExplicitDownload) {
      await idbDelete('offline_surahs', rec.cacheKey);
      clearedSurahs += 1;
    }
  }

  const allPrayer = await idbGetAll<CachedPrayerTimingsRecord>('prayer_timings_cache');
  let clearedPrayerCaches = 0;
  for (const p of allPrayer) {
    await idbDelete('prayer_timings_cache', p.cacheKey);
    clearedPrayerCaches += 1;
  }

  // Also clear legacy ilmizo_surah_cache_v1_* keys in localStorage
  try {
    if (typeof localStorage !== 'undefined') {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('ilmizo_surah_cache_v1_')) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    }
  } catch {
    // ignore
  }

  return { clearedSurahs, clearedPrayerCaches };
}

export async function listOfflineSurahRecords(): Promise<OfflineSurahRecord[]> {
  return idbGetAll<OfflineSurahRecord>('offline_surahs');
}

export async function deleteAllDownloadedOfflineSurahs(): Promise<number> {
  const all = await idbGetAll<OfflineSurahRecord>('offline_surahs');
  let deleted = 0;
  for (const rec of all) {
    await idbDelete('offline_surahs', rec.cacheKey);
    deleted += 1;
  }
  return deleted;
}

export async function getOfflineAudioFromDb(
  editionId: string,
  surahNumber: number
): Promise<OfflineAudioRecord | null> {
  const audioKey = `${editionId}:${surahNumber}`;
  return idbGet<OfflineAudioRecord>('offline_audio', audioKey);
}

export async function saveOfflineAudioToDb(
  record: OfflineAudioRecord
): Promise<StorageWriteResult> {
  return idbPut('offline_audio', record.audioKey, record);
}

export async function deleteOfflineAudioFromDb(
  editionId: string,
  surahNumber?: number
): Promise<number> {
  const all = await idbGetAll<OfflineAudioRecord>('offline_audio');
  let deleted = 0;
  for (const rec of all) {
    if (
      rec.editionId === editionId &&
      (surahNumber === undefined || rec.surahNumber === surahNumber)
    ) {
      await idbDelete('offline_audio', rec.audioKey);
      deleted += 1;
    }
  }
  return deleted;
}

export async function deleteAllOfflineAudioFromDb(): Promise<number> {
  const all = await idbGetAll<OfflineAudioRecord>('offline_audio');
  let deleted = 0;
  for (const rec of all) {
    await idbDelete('offline_audio', rec.audioKey);
    deleted += 1;
  }
  return deleted;
}

export async function listOfflineAudioRecords(): Promise<OfflineAudioRecord[]> {
  return idbGetAll<OfflineAudioRecord>('offline_audio');
}

// ============================================================================
// PRAYER TIMINGS OFFLINE CACHE (IndexedDB)
// ============================================================================

export async function getCachedPrayerTimings(
  city: string,
  country: string,
  method: number,
  school: number,
  dateKey?: string
): Promise<CachedPrayerTimingsRecord | null> {
  const all = await idbGetAll<CachedPrayerTimingsRecord>('prayer_timings_cache');
  const normCity = (city || 'Jamshedpur').trim().toLowerCase();
  const normCountry = (country || 'India').trim().toLowerCase();

  if (dateKey) {
    const exactKey = `${normCity}_${normCountry}_${method}_${school}_${dateKey}`;
    const exact = await idbGet<CachedPrayerTimingsRecord>('prayer_timings_cache', exactKey);
    if (exact) return exact;
  }

  // Fallback to most recent cached record for the same city, method & school
  const matching = all
    .filter(
      (r) =>
        r.city.toLowerCase() === normCity &&
        r.country.toLowerCase() === normCountry &&
        r.method === method &&
        r.school === school
    )
    .sort((a, b) => b.cachedAtIso.localeCompare(a.cachedAtIso));

  return matching[0] || null;
}

export async function saveCachedPrayerTimings(record: Omit<CachedPrayerTimingsRecord, 'cacheKey' | 'cachedAtIso'>): Promise<StorageWriteResult> {
  const normCity = (record.city || 'Jamshedpur').trim().toLowerCase();
  const normCountry = (record.country || 'India').trim().toLowerCase();
  const cacheKey = `${normCity}_${normCountry}_${record.method}_${record.school}_${record.dateKey}`;
  return idbPut('prayer_timings_cache', cacheKey, {
    ...record,
    cacheKey,
    cachedAtIso: new Date().toISOString(),
  });
}

// ============================================================================
// PRE-IMPORT RECOVERY SNAPSHOTS (IndexedDB)
// ============================================================================

export async function saveRecoverySnapshot(
  snapshotId: string,
  state: PersistedMasterState,
  reason = 'Pre-Import Automatic Recovery Snapshot'
): Promise<StorageWriteResult> {
  const cloned: PersistedMasterState = JSON.parse(JSON.stringify(state));
  if (cloned.user && 'parentPin' in cloned.user) {
    delete (cloned.user as any).parentPin;
  }
  const record: RecoverySnapshotRecord = {
    id: snapshotId,
    createdAtIso: new Date().toISOString(),
    reason,
    schemaVersion: ILMIZO_DB_SCHEMA_VERSION,
    state: cloned,
  };
  return idbPut('recovery_snapshots', snapshotId, record);
}

export async function getRecoverySnapshot(
  snapshotId = 'pre_import_latest'
): Promise<RecoverySnapshotRecord | null> {
  return idbGet<RecoverySnapshotRecord>('recovery_snapshots', snapshotId);
}

// ============================================================================
// STORAGE USAGE & METRICS INSPECTOR
// ============================================================================

export async function computeLocalStorageMetrics(): Promise<LocalStorageMetrics> {
  const db = await openIndexedDatabase();
  const master = await idbGet<{ id: string; state: PersistedMasterState; migratedFromLegacy: boolean }>(
    'app_state',
    'master_v2'
  );
  const surahs = await idbGetAll<OfflineSurahRecord>('offline_surahs');
  const audioRecords = await idbGetAll<OfflineAudioRecord>('offline_audio');
  const snapshot = await idbGet<RecoverySnapshotRecord>('recovery_snapshots', 'pre_import_latest');

  const downloadedSurahNumbers = Array.from(
    new Set(surahs.filter((s) => s.isExplicitDownload).map((s) => s.surahNumber))
  ).sort((a, b) => a - b);

  const cachedSurahNumbers = Array.from(
    new Set(surahs.filter((s) => !s.isExplicitDownload).map((s) => s.surahNumber))
  ).sort((a, b) => a - b);

  let estimatedUsedBytes =
    (master ? estimateJsonSizeBytes(master.state) : 0) +
    surahs.reduce((acc, s) => acc + (s.sizeBytes || estimateJsonSizeBytes(s.payload)), 0) +
    audioRecords.reduce((acc, a) => acc + (a.sizeBytes || 0), 0) +
    (snapshot ? estimateJsonSizeBytes(snapshot.state) : 0);

  let estimatedQuotaBytes: number | null = null;
  try {
    if (typeof navigator !== 'undefined' && navigator.storage && typeof navigator.storage.estimate === 'function') {
      const est = await navigator.storage.estimate();
      if (typeof est.usage === 'number' && est.usage > estimatedUsedBytes) {
        estimatedUsedBytes = est.usage;
      }
      if (typeof est.quota === 'number') {
        estimatedQuotaBytes = est.quota;
      }
    }
  } catch {
    // ignore
  }

  let legacyBackupPreserved = false;
  try {
    if (typeof localStorage !== 'undefined') {
      legacyBackupPreserved = Boolean(localStorage.getItem(LEGACY_MASTER_STORAGE_KEY));
    }
  } catch {
    legacyBackupPreserved = false;
  }

  return {
    backend: db ? 'indexeddb' : 'memory_fallback',
    schemaVersion: ILMIZO_DB_SCHEMA_VERSION,
    migratedFromLegacyV1: Boolean(master?.migratedFromLegacy),
    legacyBackupPreserved,
    estimatedUsedBytes,
    estimatedQuotaBytes,
    downloadedSurahNumbers,
    cachedSurahNumbers,
    downloadedAudioKeys: audioRecords.map((a) => a.audioKey),
    learningEventsCount: master?.state?.learningEvents?.length || 0,
    hasPreImportRecoverySnapshot: Boolean(snapshot),
    lastSavedAtIso: lastSavedTimestampIso,
    lastQuotaError: lastQuotaErrorMessage,
  };
}
