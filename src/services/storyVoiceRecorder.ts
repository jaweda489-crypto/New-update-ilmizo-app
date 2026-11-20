const DB_NAME = 'ilmizo_story_voices_db';
const DB_VERSION = 1;
const STORE_NAME = 'recordings';

export interface StoryVoiceRecording {
  key: string; // `${storyId}:${pageIndex}`
  storyId: string;
  pageIndex: number;
  mimeType: string;
  blob: Blob;
  durationSec: number;
  recordedAtIso: string;
}

function openVoiceDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('Failed to open voice database'));
  });
}

export function buildStoryVoiceKey(storyId: string, pageIndex: number): string {
  return `${storyId}:${pageIndex}`;
}

export async function saveStoryVoiceRecording(
  record: StoryVoiceRecording
): Promise<{ ok: boolean; error?: string }> {
  try {
    const db = await openVoiceDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Unable to save family voice recording.',
    };
  }
}

export async function getStoryVoiceRecording(
  storyId: string,
  pageIndex: number
): Promise<StoryVoiceRecording | null> {
  try {
    const db = await openVoiceDb();
    const key = buildStoryVoiceKey(storyId, pageIndex);
    const result = await new Promise<StoryVoiceRecording | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(key);
      req.onsuccess = () => resolve((req.result as StoryVoiceRecording) || null);
      req.onerror = () => reject(req.error);
    });
    db.close();
    return result;
  } catch {
    return null;
  }
}

export async function deleteStoryVoiceRecording(
  storyId: string,
  pageIndex: number
): Promise<boolean> {
  try {
    const db = await openVoiceDb();
    const key = buildStoryVoiceKey(storyId, pageIndex);
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
    return true;
  } catch {
    return false;
  }
}

export function isVoiceRecorderSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    Boolean(navigator.mediaDevices?.getUserMedia) &&
    typeof MediaRecorder !== 'undefined'
  );
}

export function pickSupportedAudioMimeType(): string {
  if (typeof MediaRecorder === 'undefined') return 'audio/webm';
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
  ];
  for (const type of candidates) {
    if (typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return '';
}
