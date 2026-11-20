import { ALL_114_SURAHS, BUNDLED_SURAH_AYAHS, getSurahPayload, resolveAyahAudioUrl, resolveReciterConfig } from '../data/quranData';
import { SUPPORTED_LANGUAGES } from '../data/i18n';
import { validateSurahPayload } from '../engines/adultLearningEngines';
import {
  deleteAllDownloadedOfflineSurahs,
  deleteOfflineSurahFromDb,
  getOfflineSurahFromDb,
  listOfflineSurahRecords,
  OfflineSurahRecord,
  saveOfflineSurahToDb,
} from './localDatabase';
import { AyahItem, LanguageCode, SurahMeta, SurahPayload } from '../types/ilmizo';

export const TOTAL_QURAN_SURAHS = 114;
export const TOTAL_QURAN_AYAHS = 6236;
export const OFFLINE_QURAN_PACKAGE_VERSION = '1.2.0';

export interface QuranEditionAttribution {
  editionId: string;
  language: LanguageCode | 'ar';
  languageLabel: string;
  sourceName: string;
  translatorOrAuthority: string;
  totalSurahs: number;
  totalAyahs: number;
  version: string;
}

export const VERIFIED_QURAN_TEXT_EDITIONS: Record<'ar' | 'en' | 'hi' | 'ur', QuranEditionAttribution> = {
  ar: {
    editionId: 'quran-uthmani',
    language: 'ar',
    languageLabel: 'Arabic (Uthmani Script)',
    sourceName: 'Tanzil / King Fahd Glorious Quran Printing Complex via AlQuran Cloud',
    translatorOrAuthority: 'Mushaf Al-Madinah An-Nabawiyyah (Uthmani Rasm)',
    totalSurahs: TOTAL_QURAN_SURAHS,
    totalAyahs: TOTAL_QURAN_AYAHS,
    version: OFFLINE_QURAN_PACKAGE_VERSION,
  },
  en: {
    editionId: 'en.sahih',
    language: 'en',
    languageLabel: 'English',
    sourceName: 'Sahih International via Tanzil / AlQuran Cloud',
    translatorOrAuthority: 'Sahih International (Abul Qasim Publishing House)',
    totalSurahs: TOTAL_QURAN_SURAHS,
    totalAyahs: TOTAL_QURAN_AYAHS,
    version: OFFLINE_QURAN_PACKAGE_VERSION,
  },
  hi: {
    editionId: 'hi.hindi',
    language: 'hi',
    languageLabel: 'Hindi (हिन्दी)',
    sourceName: 'Tanzil / AlQuran Cloud Verified Hindi Translation',
    translatorOrAuthority: 'Suhel Farooq Khan & Saifur Rahman Nadwi',
    totalSurahs: TOTAL_QURAN_SURAHS,
    totalAyahs: TOTAL_QURAN_AYAHS,
    version: OFFLINE_QURAN_PACKAGE_VERSION,
  },
  ur: {
    editionId: 'ur.jalandhry',
    language: 'ur',
    languageLabel: 'Urdu (اردو)',
    sourceName: 'Tanzil / AlQuran Cloud Verified Urdu Translation',
    translatorOrAuthority: 'Fateh Muhammad Jalandhry',
    totalSurahs: TOTAL_QURAN_SURAHS,
    totalAyahs: TOTAL_QURAN_AYAHS,
    version: OFFLINE_QURAN_PACKAGE_VERSION,
  },
};

export interface SurahIntegrityResult {
  valid: boolean;
  corrupted: boolean;
  surahNumber: number;
  expectedAyahCount: number;
  actualAyahCount: number;
  checksumSha256: string;
  errors: string[];
}

export interface FullQuranPackageIntegrityReport {
  valid: boolean;
  isComplete114: boolean;
  totalSurahsVerified: number;
  totalAyahsVerified: number;
  expectedTotalSurahs: number;
  expectedTotalAyahs: number;
  totalSizeBytes: number;
  packageVersion: string;
  packageChecksumSha256: string;
  verifiedAtIso: string;
  corruptedSurahNumbers: number[];
  missingSurahNumbers: number[];
  partialSurahNumbers: number[];
  errors: string[];
}

export interface OfflineQuranDownloadState {
  status: 'idle' | 'downloading' | 'paused' | 'completed' | 'cancelled' | 'error';
  mode: 'full_quran' | 'juz' | 'single_surah' | null;
  completedSurahs: number;
  totalSurahs: number;
  completedAyahs: number;
  totalAyahs: number;
  progressPercent: number;
  downloadedBytes: number;
  currentSurahNumber: number | null;
  currentSurahName: string | null;
  packageVersion: string;
  lastVerifiedAtIso: string | null;
  packageChecksumSha256: string | null;
  corruptedSurahNumbers: number[];
  errorMessage: string | null;
}

export interface OfflineQuranSearchResult {
  surahNumber: number;
  surahNameTranslit: string;
  surahNameArabic: string;
  ayahNumberInSurah: number;
  globalAyahNumber: number;
  juzNumber: number;
  arabicUthmani: string;
  transliteration: string;
  translationSnippet: string;
  matchedField: 'reference' | 'surah_name' | 'arabic' | 'translation' | 'transliteration';
  sourceType: 'downloaded_idb' | 'cached_idb' | 'bundled_full' | 'bundled_partial';
}

/**
 * Computes a deterministic SHA-256 hex digest using the Web Crypto API (`crypto.subtle.digest`).
 */
export async function computeSha256Hex(input: string): Promise<string> {
  if (
    typeof globalThis.crypto !== 'undefined' &&
    globalThis.crypto.subtle &&
    typeof globalThis.crypto.subtle.digest === 'function'
  ) {
    const encoded = new TextEncoder().encode(input);
    const buffer = await globalThis.crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Deterministic fallback only if subtle crypto is unavailable
  let h1 = 0xdeadbeef ^ input.length;
  let h2 = 0x41c6ce57 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  return `${(h1 >>> 0).toString(16).padStart(8, '0')}${(h2 >>> 0).toString(16).padStart(8, '0')}`;
}

/**
 * Computes a canonical SHA-256 checksum over a SurahPayload's Surah number, Ayah count,
 * sequential Ayah numbers, Uthmani Arabic text, and English translation.
 */
export async function computeSurahChecksumSha256(payload: SurahPayload): Promise<string> {
  if (!payload || !payload.meta || !Array.isArray(payload.ayahs)) {
    return '';
  }
  const canonicalLines = payload.ayahs.map(
    (a) =>
      `${payload.meta.number}:${a.numberInSurah}:${(a.arabicUthmani || '').trim()}:${(
        a.translations?.en || ''
      ).trim()}`
  );
  const canonicalString = `ilmizo_quran_v1|surah=${payload.meta.number}|count=${payload.ayahs.length}|${canonicalLines.join(
    '\n'
  )}`;
  return computeSha256Hex(canonicalString);
}

/**
 * Strict integrity verifier for a single SurahPayload.
 * Ensures:
 * - Surah number is 1..114 and matches ALL_114_SURAHS
 * - Ayah count matches canonical metadata
 * - Sequential 1..N Ayah numbering
 * - Non-empty Arabic Uthmani text and English translation for every Ayah
 * - Never substitutes Surah Al-Fatiha into another Surah
 * - Checksum matches expectedChecksum if provided
 */
export async function verifySurahIntegrity(
  surahNumber: number,
  payload: SurahPayload | null | undefined,
  options?: {
    expectedChecksum?: string;
    allowPartialBundle?: boolean;
    requiredLanguages?: LanguageCode[];
  }
): Promise<SurahIntegrityResult> {
  const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
  if (!meta) {
    return {
      valid: false,
      corrupted: true,
      surahNumber,
      expectedAyahCount: 0,
      actualAyahCount: 0,
      checksumSha256: '',
      errors: [`Invalid Surah number ${surahNumber}. Must be between 1 and 114.`],
    };
  }

  if (!payload || typeof payload !== 'object' || !Array.isArray(payload.ayahs)) {
    return {
      valid: false,
      corrupted: true,
      surahNumber,
      expectedAyahCount: meta.ayahCount,
      actualAyahCount: 0,
      checksumSha256: '',
      errors: [`Surah ${surahNumber} (${meta.nameTranslit}) payload is missing or malformed.`],
    };
  }

  const errors: string[] = [];
  const baseValidation = validateSurahPayload(
    payload,
    meta,
    Boolean(options?.allowPartialBundle)
  );
  if (!baseValidation.valid && baseValidation.error) {
    errors.push(baseValidation.error);
  }

  // Anti-substitution check: Surah > 1 must NEVER contain Surah Al-Fatiha's verses
  if (surahNumber !== 1 && payload.ayahs.length > 1) {
    const ayah2Arabic = (payload.ayahs[1]?.arabicUthmani || '').trim();
    const fatihaAyah2 = BUNDLED_SURAH_AYAHS[1]?.[1]?.arabicUthmani?.trim() || '';
    if (fatihaAyah2 && ayah2Arabic === fatihaAyah2) {
      errors.push(
        `CRITICAL INTEGRITY FAILURE: Surah ${surahNumber} contains Surah Al-Fatiha's verses.`
      );
    }
  }

  // Required language translation count & non-empty check
  const requiredLangs = options?.requiredLanguages || ['en'];
  for (const lang of requiredLangs) {
    const missingLangIdx = payload.ayahs.findIndex(
      (a) => !a.translations?.[lang] || typeof a.translations[lang] !== 'string' || !a.translations[lang]!.trim()
    );
    if (missingLangIdx !== -1) {
      errors.push(
        `Surah ${surahNumber} is missing translation '${lang}' at Ayah ${missingLangIdx + 1}.`
      );
    }
  }

  const checksumSha256 = await computeSurahChecksumSha256(payload);
  let corrupted = errors.length > 0;

  if (
    options?.expectedChecksum &&
    options.expectedChecksum.trim().length > 0 &&
    options.expectedChecksum !== checksumSha256
  ) {
    corrupted = true;
    errors.push(
      `Checksum mismatch for Surah ${surahNumber} (${meta.nameTranslit}): expected ${options.expectedChecksum.slice(
        0,
        12
      )}…, got ${checksumSha256.slice(0, 12)}….`
    );
  }

  return {
    valid: errors.length === 0 && !corrupted,
    corrupted,
    surahNumber,
    expectedAyahCount: meta.ayahCount,
    actualAyahCount: payload.ayahs.length,
    checksumSha256,
    errors,
  };
}

/**
 * Validates a collection of SurahPayloads against the canonical 114 Surahs / 6,236 Ayahs specification.
 */
export async function validateFullQuranPackageIntegrity(
  payloads: SurahPayload[],
  requiredLanguages: LanguageCode[] = ['en']
): Promise<FullQuranPackageIntegrityReport> {
  const byNumber = new Map<number, SurahPayload>();
  for (const p of payloads) {
    if (p?.meta?.number) {
      byNumber.set(p.meta.number, p);
    }
  }

  let totalSurahsVerified = 0;
  let totalAyahsVerified = 0;
  let totalSizeBytes = 0;
  const corruptedSurahNumbers: number[] = [];
  const missingSurahNumbers: number[] = [];
  const partialSurahNumbers: number[] = [];
  const errors: string[] = [];
  const surahChecksums: string[] = [];

  for (const meta of ALL_114_SURAHS) {
    const payload = byNumber.get(meta.number);
    if (!payload) {
      missingSurahNumbers.push(meta.number);
      continue;
    }

    if (payload.isPartialOfflineBundle || payload.ayahs.length < meta.ayahCount) {
      partialSurahNumbers.push(meta.number);
      errors.push(
        `Surah ${meta.number} (${meta.nameTranslit}) is partial (${payload.ayahs.length}/${meta.ayahCount} Ayahs).`
      );
      continue;
    }

    const check = await verifySurahIntegrity(meta.number, payload, {
      allowPartialBundle: false,
      requiredLanguages,
    });

    if (!check.valid) {
      corruptedSurahNumbers.push(meta.number);
      errors.push(...check.errors);
    } else {
      totalSurahsVerified += 1;
      totalAyahsVerified += check.actualAyahCount;
      surahChecksums.push(`${meta.number}:${check.checksumSha256}`);
      try {
        totalSizeBytes += new Blob([JSON.stringify(payload)]).size;
      } catch {
        totalSizeBytes += JSON.stringify(payload).length * 2;
      }
    }
  }

  const packageChecksumSha256 = await computeSha256Hex(
    `ilmizo_full_quran_pkg_v${OFFLINE_QURAN_PACKAGE_VERSION}|surahs=${totalSurahsVerified}|ayahs=${totalAyahsVerified}|${surahChecksums.join(
      '|'
    )}`
  );

  const isComplete114 =
    totalSurahsVerified === TOTAL_QURAN_SURAHS &&
    totalAyahsVerified === TOTAL_QURAN_AYAHS &&
    corruptedSurahNumbers.length === 0 &&
    missingSurahNumbers.length === 0 &&
    partialSurahNumbers.length === 0;

  return {
    valid: isComplete114 && errors.length === 0,
    isComplete114,
    totalSurahsVerified,
    totalAyahsVerified,
    expectedTotalSurahs: TOTAL_QURAN_SURAHS,
    expectedTotalAyahs: TOTAL_QURAN_AYAHS,
    totalSizeBytes,
    packageVersion: OFFLINE_QURAN_PACKAGE_VERSION,
    packageChecksumSha256,
    verifiedAtIso: new Date().toISOString(),
    corruptedSurahNumbers,
    missingSurahNumbers,
    partialSurahNumbers,
    errors,
  };
}

/**
 * Inspects all Surahs currently stored in IndexedDB (`offline_surahs`) and verifies their integrity,
 * checksums, total Surah count, and total Ayah count.
 */
export async function verifyInstalledOfflineQuran(): Promise<FullQuranPackageIntegrityReport> {
  const allRecords = await listOfflineSurahRecords();
  // Deduplicate by surahNumber preferring explicit downloads and full bundles
  const bestBySurah = new Map<number, OfflineSurahRecord>();
  for (const rec of allRecords) {
    const existing = bestBySurah.get(rec.surahNumber);
    if (
      !existing ||
      (rec.isExplicitDownload && !existing.isExplicitDownload) ||
      (rec.payload?.ayahs?.length || 0) > (existing.payload?.ayahs?.length || 0)
    ) {
      bestBySurah.set(rec.surahNumber, rec);
    }
  }

  let totalSurahsVerified = 0;
  let totalAyahsVerified = 0;
  let totalSizeBytes = 0;
  const corruptedSurahNumbers: number[] = [];
  const missingSurahNumbers: number[] = [];
  const partialSurahNumbers: number[] = [];
  const errors: string[] = [];
  const surahChecksums: string[] = [];

  for (const meta of ALL_114_SURAHS) {
    const rec = bestBySurah.get(meta.number);
    if (!rec || !rec.payload) {
      missingSurahNumbers.push(meta.number);
      continue;
    }

    if (rec.payload.isPartialOfflineBundle && !rec.isExplicitDownload) {
      partialSurahNumbers.push(meta.number);
      continue;
    }

    const check = await verifySurahIntegrity(meta.number, rec.payload, {
      expectedChecksum: rec.checksumSha256,
      allowPartialBundle: false,
    });

    if (!check.valid) {
      corruptedSurahNumbers.push(meta.number);
      errors.push(...check.errors);
    } else {
      totalSurahsVerified += 1;
      totalAyahsVerified += check.actualAyahCount;
      totalSizeBytes += rec.sizeBytes || 0;
      surahChecksums.push(`${meta.number}:${check.checksumSha256}`);
    }
  }

  const packageChecksumSha256 =
    surahChecksums.length > 0
      ? await computeSha256Hex(
          `ilmizo_installed_quran_v${OFFLINE_QURAN_PACKAGE_VERSION}|${surahChecksums.join('|')}`
        )
      : '';

  const isComplete114 =
    totalSurahsVerified === TOTAL_QURAN_SURAHS &&
    totalAyahsVerified === TOTAL_QURAN_AYAHS &&
    corruptedSurahNumbers.length === 0;

  return {
    valid: corruptedSurahNumbers.length === 0,
    isComplete114,
    totalSurahsVerified,
    totalAyahsVerified,
    expectedTotalSurahs: TOTAL_QURAN_SURAHS,
    expectedTotalAyahs: TOTAL_QURAN_AYAHS,
    totalSizeBytes,
    packageVersion: OFFLINE_QURAN_PACKAGE_VERSION,
    packageChecksumSha256,
    verifiedAtIso: new Date().toISOString(),
    corruptedSurahNumbers,
    missingSurahNumbers,
    partialSurahNumbers,
    errors,
  };
}

/**
 * Fetches a single Surah with Arabic Uthmani + English (`en.sahih`) + Hindi (`hi.hindi`) + Urdu (`ur.jalandhry`)
 * + Transliteration from the verified AlQuran Cloud API, validates all Ayah counts and checksums,
 * and saves it to IndexedDB.
 */
export async function fetchAndVerifyMultiLangSurah(
  surahNumber: number,
  primaryLang: LanguageCode = 'en',
  reciterName?: string,
  customFetcher?: (surahMeta: SurahMeta) => Promise<SurahPayload>
): Promise<{ ok: boolean; payload?: SurahPayload; checksumSha256?: string; sizeBytes?: number; error?: string }> {
  const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
  if (!meta) {
    return { ok: false, error: `Invalid Surah number: ${surahNumber}` };
  }

  if (customFetcher) {
    try {
      const payload = await customFetcher(meta);
      const check = await verifySurahIntegrity(surahNumber, payload, {
        allowPartialBundle: false,
      });
      if (!check.valid) {
        return { ok: false, error: check.errors.join(' ') };
      }
      const verifiedAtIso = new Date().toISOString();
      const writeRes = await saveOfflineSurahToDb(surahNumber, primaryLang, payload, true, {
        checksumSha256: check.checksumSha256,
        packageVersion: OFFLINE_QURAN_PACKAGE_VERSION,
        verifiedAtIso,
      });
      if (!writeRes.ok) {
        return { ok: false, error: writeRes.error || 'Failed to write Surah to IndexedDB.' };
      }
      const sizeBytes = JSON.stringify(payload).length;
      return {
        ok: true,
        payload: { ...payload, offlineSourceType: 'downloaded_idb', offlineUnavailable: false },
        checksumSha256: check.checksumSha256,
        sizeBytes,
      };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Failed to fetch Surah via custom fetcher.',
      };
    }
  }

  const reciter = resolveReciterConfig(reciterName);

  // If online, fetch complete Uthmani + transliteration + en.sahih + hi.hindi + ur.jalandhry editions
  if (typeof navigator !== 'undefined' && navigator.onLine) {
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.transliteration,en.sahih,hi.hindi,ur.jalandhry,${reciter.editionId}`
      );
      if (response.ok) {
        const json = await response.json();
        if (json?.data && Array.isArray(json.data) && json.data.length >= 5) {
          const uthmaniEd = json.data[0];
          const translitEd = json.data[1];
          const enEd = json.data[2];
          const hiEd = json.data[3];
          const urEd = json.data[4];
          const audioEd = json.data[5];

          const uthmaniAyahs = uthmaniEd?.ayahs || [];
          const translitAyahs = translitEd?.ayahs || [];
          const enAyahs = enEd?.ayahs || [];
          const hiAyahs = hiEd?.ayahs || [];
          const urAyahs = urEd?.ayahs || [];
          const audioAyahs = audioEd?.ayahs || [];

          if (
            uthmaniAyahs.length === meta.ayahCount &&
            enAyahs.length === meta.ayahCount &&
            hiAyahs.length === meta.ayahCount &&
            urAyahs.length === meta.ayahCount &&
            (uthmaniEd.number === undefined || uthmaniEd.number === meta.number)
          ) {
            const ayahs: AyahItem[] = uthmaniAyahs.map((a: any, idx: number) => ({
              numberInSurah: a.numberInSurah,
              globalNumber: a.number,
              arabicUthmani: a.text,
              transliteration: translitAyahs[idx]?.text || '',
              translations: {
                en: enAyahs[idx]?.text || '',
                hi: hiAyahs[idx]?.text || '',
                ur: urAyahs[idx]?.text || '',
                hinglish: enAyahs[idx]?.text || '',
              },
              audioUrl:
                audioAyahs[idx]?.audio ||
                resolveAyahAudioUrl({ globalNumber: a.number }, reciter.id),
              mushafPage: typeof a.page === 'number' && a.page > 0 ? a.page : undefined,
              juzNumber: typeof a.juz === 'number' && a.juz > 0 ? a.juz : meta.juz,
              tafsirBrief: `Verified Uthmani script — Surah ${meta.nameTranslit} (${meta.number}:${a.numberInSurah}), Juz ${
                a.juz || meta.juz
              }${typeof a.page === 'number' ? `, Madinah Mushaf Page ${a.page}` : ''}.`,
            }));

            const langConfig =
              SUPPORTED_LANGUAGES.find((l) => l.code === primaryLang) || SUPPORTED_LANGUAGES[0];

            const payload: SurahPayload = {
              meta,
              ayahs,
              offlineUnavailable: false,
              isPartialOfflineBundle: false,
              offlineSourceType: 'downloaded_idb',
              verification: {
                source:
                  'Tanzil / King Fahd Glorious Quran Printing Complex via AlQuran Cloud (Multi-Language Offline Package)',
                edition: `quran-uthmani + en.sahih + hi.hindi + ur.jalandhry (${reciter.editionId})`,
                reference: `Surah ${meta.number} (${meta.nameTranslit}), ${meta.ayahCount} Ayahs`,
                language: langConfig.label,
                version: OFFLINE_QURAN_PACKAGE_VERSION,
                reviewer: 'Ilmizo Sharia & Text Verification Registry',
                status: 'Verified',
              },
            };

            const check = await verifySurahIntegrity(surahNumber, payload, {
              allowPartialBundle: false,
              requiredLanguages: ['en', 'hi', 'ur'],
            });
            if (!check.valid) {
              return { ok: false, error: check.errors.join(' ') };
            }

            const verifiedAtIso = new Date().toISOString();
            const writeRes = await saveOfflineSurahToDb(surahNumber, primaryLang, payload, true, {
              checksumSha256: check.checksumSha256,
              packageVersion: OFFLINE_QURAN_PACKAGE_VERSION,
              verifiedAtIso,
            });
            if (!writeRes.ok) {
              return { ok: false, error: writeRes.error || 'Failed to save Surah to IndexedDB.' };
            }

            return {
              ok: true,
              payload,
              checksumSha256: check.checksumSha256,
              sizeBytes: JSON.stringify(payload).length,
            };
          }
        }
      }
    } catch {
      // Fall through to bundled check if available
    }
  }

  // Fallback to full bundled Surah ONLY if this exact Surah is fully bundled (e.g. Surahs 1, 103, 108, 112, 113, 114)
  const payload = await getSurahPayload(surahNumber, primaryLang, reciterName, {
    markExplicitDownload: true,
  });
  if (payload.offlineUnavailable || payload.isPartialOfflineBundle || payload.ayahs.length < meta.ayahCount) {
    return {
      ok: false,
      error: `Surah ${meta.nameTranslit} (#${surahNumber}) requires an internet connection to download all ${meta.ayahCount} Ayahs.`,
    };
  }

  const check = await verifySurahIntegrity(surahNumber, payload, {
    allowPartialBundle: false,
  });
  if (!check.valid) {
    return { ok: false, error: check.errors.join(' ') };
  }

  const writeRes = await saveOfflineSurahToDb(surahNumber, primaryLang, payload, true, {
    checksumSha256: check.checksumSha256,
    packageVersion: OFFLINE_QURAN_PACKAGE_VERSION,
    verifiedAtIso: new Date().toISOString(),
  });
  if (!writeRes.ok) {
    return { ok: false, error: writeRes.error || 'Failed to save Surah to IndexedDB.' };
  }

  return {
    ok: true,
    payload: { ...payload, offlineSourceType: 'downloaded_idb', offlineUnavailable: false },
    checksumSha256: check.checksumSha256,
    sizeBytes: JSON.stringify(payload).length,
  };
}

/**
 * Full Offline Quran Download & Verification Manager with Pause / Resume / Cancel support.
 */
export class QuranOfflineDownloadManager {
  private state: OfflineQuranDownloadState = {
    status: 'idle',
    mode: null,
    completedSurahs: 0,
    totalSurahs: TOTAL_QURAN_SURAHS,
    completedAyahs: 0,
    totalAyahs: TOTAL_QURAN_AYAHS,
    progressPercent: 0,
    downloadedBytes: 0,
    currentSurahNumber: null,
    currentSurahName: null,
    packageVersion: OFFLINE_QURAN_PACKAGE_VERSION,
    lastVerifiedAtIso: null,
    packageChecksumSha256: null,
    corruptedSurahNumbers: [],
    errorMessage: null,
  };

  private listeners = new Set<(state: OfflineQuranDownloadState) => void>();
  private pauseRequested = false;
  private cancelRequested = false;
  private resumeResolver: (() => void) | null = null;

  public getState(): OfflineQuranDownloadState {
    return { ...this.state };
  }

  public subscribe(listener: (state: OfflineQuranDownloadState) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private updateState(patch: Partial<OfflineQuranDownloadState>): void {
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
        currentSurahNumber: null,
        currentSurahName: null,
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
   * Downloads a list of Surahs (or all 114 Surahs for the Complete Offline Quran Package)
   * with real-time progress, pause/resume/cancel support, and SHA-256 integrity verification.
   */
  public async downloadSurahBatch(options?: {
    surahNumbers?: number[];
    language?: LanguageCode;
    reciterName?: string;
    mode?: 'full_quran' | 'juz' | 'single_surah';
    skipAlreadyVerified?: boolean;
    customFetcher?: (surahMeta: SurahMeta) => Promise<SurahPayload>;
  }): Promise<{
    ok: boolean;
    completedSurahs: number;
    completedAyahs: number;
    report: FullQuranPackageIntegrityReport;
    error?: string;
  }> {
    const targetSurahNumbers =
      options?.surahNumbers && options.surahNumbers.length > 0
        ? options.surahNumbers
        : ALL_114_SURAHS.map((s) => s.number);
    const primaryLang = options?.language || 'en';
    const mode = options?.mode || (targetSurahNumbers.length === 114 ? 'full_quran' : 'juz');
    const skipAlreadyVerified = options?.skipAlreadyVerified ?? true;

    const targetMetas = targetSurahNumbers
      .map((num) => ALL_114_SURAHS.find((s) => s.number === num))
      .filter((m): m is SurahMeta => Boolean(m));

    const totalSurahs = targetMetas.length;
    const totalAyahs = targetMetas.reduce((acc, m) => acc + m.ayahCount, 0);

    this.pauseRequested = false;
    this.cancelRequested = false;

    this.updateState({
      status: 'downloading',
      mode,
      completedSurahs: 0,
      totalSurahs,
      completedAyahs: 0,
      totalAyahs,
      progressPercent: 0,
      downloadedBytes: 0,
      currentSurahNumber: targetMetas[0]?.number || null,
      currentSurahName: targetMetas[0]?.nameTranslit || null,
      errorMessage: null,
    });

    let completedSurahs = 0;
    let completedAyahs = 0;
    let downloadedBytes = 0;

    for (const meta of targetMetas) {
      if (this.cancelRequested) {
        const cancelledReport = await verifyInstalledOfflineQuran();
        return {
          ok: false,
          completedSurahs,
          completedAyahs,
          report: cancelledReport,
          error: 'Download cancelled by user.',
        };
      }

      await this.waitIfPaused();

      if (this.cancelRequested) {
        const cancelledReport = await verifyInstalledOfflineQuran();
        return {
          ok: false,
          completedSurahs,
          completedAyahs,
          report: cancelledReport,
          error: 'Download cancelled by user.',
        };
      }

      this.updateState({
        currentSurahNumber: meta.number,
        currentSurahName: meta.nameTranslit,
      });

      // Check if already downloaded and verified in IndexedDB
      if (skipAlreadyVerified && !options?.customFetcher) {
        const existing = await getOfflineSurahFromDb(meta.number, primaryLang);
        if (
          existing &&
          existing.isExplicitDownload &&
          existing.payload &&
          !existing.payload.isPartialOfflineBundle &&
          existing.payload.ayahs.length === meta.ayahCount
        ) {
          const check = await verifySurahIntegrity(meta.number, existing.payload, {
            expectedChecksum: existing.checksumSha256,
            allowPartialBundle: false,
          });
          if (check.valid) {
            completedSurahs += 1;
            completedAyahs += meta.ayahCount;
            downloadedBytes += existing.sizeBytes || 0;
            this.updateState({
              completedSurahs,
              completedAyahs,
              downloadedBytes,
              progressPercent: Math.round((completedAyahs / Math.max(1, totalAyahs)) * 100),
            });
            continue;
          }
        }
      }

      const fetchRes = await fetchAndVerifyMultiLangSurah(
        meta.number,
        primaryLang,
        options?.reciterName,
        options?.customFetcher
      );

      if (!fetchRes.ok) {
        const reportAfterError = await verifyInstalledOfflineQuran();
        this.updateState({
          status: 'error',
          currentSurahNumber: null,
          currentSurahName: null,
          errorMessage: fetchRes.error || `Failed to download Surah ${meta.nameTranslit}.`,
        });
        return {
          ok: false,
          completedSurahs,
          completedAyahs,
          report: reportAfterError,
          error: fetchRes.error,
        };
      }

      completedSurahs += 1;
      completedAyahs += meta.ayahCount;
      downloadedBytes += fetchRes.sizeBytes || 0;
      this.updateState({
        completedSurahs,
        completedAyahs,
        downloadedBytes,
        progressPercent: Math.round((completedAyahs / Math.max(1, totalAyahs)) * 100),
      });
    }

    const finalReport = await verifyInstalledOfflineQuran();
    this.updateState({
      status: 'completed',
      completedSurahs,
      completedAyahs,
      progressPercent: 100,
      currentSurahNumber: null,
      currentSurahName: null,
      lastVerifiedAtIso: finalReport.verifiedAtIso,
      packageChecksumSha256: finalReport.packageChecksumSha256,
      corruptedSurahNumbers: finalReport.corruptedSurahNumbers,
      errorMessage: null,
    });

    return {
      ok: true,
      completedSurahs,
      completedAyahs,
      report: finalReport,
    };
  }

  public async downloadFullOfflineQuran(options?: {
    language?: LanguageCode;
    reciterName?: string;
    customFetcher?: (surahMeta: SurahMeta) => Promise<SurahPayload>;
  }) {
    return this.downloadSurahBatch({
      surahNumbers: ALL_114_SURAHS.map((s) => s.number),
      language: options?.language,
      reciterName: options?.reciterName,
      mode: 'full_quran',
      customFetcher: options?.customFetcher,
    });
  }

  public async downloadJuzOffline(
    juzNumber: number,
    language: LanguageCode = 'en',
    reciterName?: string,
    customFetcher?: (surahMeta: SurahMeta) => Promise<SurahPayload>
  ) {
    const surahsInJuz = ALL_114_SURAHS.filter((s) => s.juz === juzNumber).map((s) => s.number);
    return this.downloadSurahBatch({
      surahNumbers: surahsInJuz,
      language,
      reciterName,
      mode: 'juz',
      customFetcher,
    });
  }

  public async deleteSingleOfflineSurah(surahNumber: number): Promise<void> {
    await deleteOfflineSurahFromDb(surahNumber);
    const report = await verifyInstalledOfflineQuran();
    this.updateState({
      lastVerifiedAtIso: report.verifiedAtIso,
      packageChecksumSha256: report.packageChecksumSha256,
      corruptedSurahNumbers: report.corruptedSurahNumbers,
    });
  }

  public async deleteAllOfflineQuran(): Promise<number> {
    const deleted = await deleteAllDownloadedOfflineSurahs();
    this.updateState({
      status: 'idle',
      mode: null,
      completedSurahs: 0,
      completedAyahs: 0,
      progressPercent: 0,
      downloadedBytes: 0,
      lastVerifiedAtIso: null,
      packageChecksumSha256: null,
      corruptedSurahNumbers: [],
      errorMessage: null,
    });
    return deleted;
  }
}

export const quranOfflineManager = new QuranOfflineDownloadManager();

/**
 * Searches across all downloaded IndexedDB Surahs and bundled offline Surahs without requiring network access.
 * Supports searching by:
 * - Surah:Ayah reference (e.g. "2:255" or "36:1")
 * - Surah name (English, Transliteration, Arabic, or number)
 * - Arabic Uthmani script (diacritic-insensitive and exact)
 * - English, Hindi, Urdu, or Hinglish translations
 * - Transliteration
 */
function stripArabicDiacriticsForSearch(text: string): string {
  return (text || '')
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .trim();
}

export async function searchOfflineQuran(
  rawQuery: string,
  preferredLang: LanguageCode = 'en',
  maxResults = 40
): Promise<OfflineQuranSearchResult[]> {
  const query = (rawQuery || '').trim();
  if (!query) return [];

  const qLower = query.toLowerCase();
  const qArabicStripped = stripArabicDiacriticsForSearch(query);

  // Build map of available offline Surahs (preferring IndexedDB records over bundled partial)
  const storedRecords = await listOfflineSurahRecords();
  const payloadMap = new Map<number, SurahPayload>();

  for (const meta of ALL_114_SURAHS) {
    const bundled = BUNDLED_SURAH_AYAHS[meta.number];
    if (bundled && bundled.length > 0) {
      payloadMap.set(meta.number, {
        meta,
        ayahs: bundled,
        offlineSourceType: bundled.length >= meta.ayahCount ? 'bundled_full' : 'bundled_partial',
        verification: {
          source: 'Bundled Offline Quran',
          edition: 'quran-uthmani + en.sahih',
          reference: `Surah ${meta.number}`,
          language: 'Multi',
          version: '1.0.0',
          reviewer: 'Ilmizo Verification Registry',
          status: 'Verified',
        },
      });
    }
  }

  for (const rec of storedRecords) {
    if (rec.payload && Array.isArray(rec.payload.ayahs) && rec.payload.ayahs.length > 0) {
      const existing = payloadMap.get(rec.surahNumber);
      if (!existing || rec.payload.ayahs.length >= existing.ayahs.length) {
        payloadMap.set(rec.surahNumber, rec.payload);
      }
    }
  }

  const results: OfflineQuranSearchResult[] = [];

  // 1. Check direct Surah:Ayah reference pattern e.g. "2:255"
  const refMatch = qLower.match(/^(\d{1,3}):(\d{1,3})$/);
  if (refMatch) {
    const sNum = Number.parseInt(refMatch[1], 10);
    const aNum = Number.parseInt(refMatch[2], 10);
    const payload = payloadMap.get(sNum);
    if (payload) {
      const ayah = payload.ayahs.find((a) => a.numberInSurah === aNum);
      if (ayah) {
        results.push({
          surahNumber: payload.meta.number,
          surahNameTranslit: payload.meta.nameTranslit,
          surahNameArabic: payload.meta.nameArabic,
          ayahNumberInSurah: ayah.numberInSurah,
          globalAyahNumber: ayah.globalNumber ?? 0,
          juzNumber: ayah.juzNumber || payload.meta.juz,
          arabicUthmani: ayah.arabicUthmani,
          transliteration: ayah.transliteration,
          translationSnippet:
            ayah.translations?.[preferredLang] || ayah.translations?.en || '',
          matchedField: 'reference',
          sourceType:
            (payload.offlineSourceType as OfflineQuranSearchResult['sourceType']) ||
            'downloaded_idb',
        });
      }
    }
    return results;
  }

  // 2. Search across all available offline Surahs and Ayahs
  const sortedSurahNums = Array.from(payloadMap.keys()).sort((a, b) => a - b);
  for (const sNum of sortedSurahNums) {
    const payload = payloadMap.get(sNum)!;
    const meta = payload.meta;
    const surahNameMatched =
      meta.nameTranslit.toLowerCase().includes(qLower) ||
      meta.nameEnglish.toLowerCase().includes(qLower) ||
      meta.nameArabic.includes(query);

    for (const ayah of payload.ayahs) {
      const transPref = ayah.translations?.[preferredLang] || '';
      const transEn = ayah.translations?.en || '';
      const transHi = ayah.translations?.hi || '';
      const transUr = ayah.translations?.ur || '';
      const translit = ayah.transliteration || '';
      const arabic = ayah.arabicUthmani || '';

      let matchedField: OfflineQuranSearchResult['matchedField'] | null = null;
      if (
        transPref.toLowerCase().includes(qLower) ||
        transEn.toLowerCase().includes(qLower) ||
        transHi.toLowerCase().includes(qLower) ||
        transUr.includes(query)
      ) {
        matchedField = 'translation';
      } else if (translit.toLowerCase().includes(qLower)) {
        matchedField = 'transliteration';
      } else if (
        arabic.includes(query) ||
        (qArabicStripped.length >= 2 &&
          stripArabicDiacriticsForSearch(arabic).includes(qArabicStripped))
      ) {
        matchedField = 'arabic';
      } else if (surahNameMatched && ayah.numberInSurah === 1) {
        matchedField = 'surah_name';
      }

      if (matchedField) {
        results.push({
          surahNumber: meta.number,
          surahNameTranslit: meta.nameTranslit,
          surahNameArabic: meta.nameArabic,
          ayahNumberInSurah: ayah.numberInSurah,
          globalAyahNumber: ayah.globalNumber ?? 0,
          juzNumber: ayah.juzNumber || meta.juz,
          arabicUthmani: arabic,
          transliteration: translit,
          translationSnippet: transPref || transEn,
          matchedField,
          sourceType:
            (payload.offlineSourceType as OfflineQuranSearchResult['sourceType']) ||
            'downloaded_idb',
        });

        if (results.length >= maxResults) {
          return results;
        }
      }
    }
  }

  return results;
}
