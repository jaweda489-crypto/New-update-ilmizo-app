import { AyahItem } from '../types/ilmizo';

export type QuranReaderViewMode = 'card' | 'mushaf' | 'study';

export interface MushafPageGroup {
  pageIndex: number; // 0-based within Surah
  displayPageNumber: number; // Authentic Mushaf page number when available, otherwise Surah page 1..N
  isStandardMushafPageNumber: boolean;
  ayahs: AyahItem[];
}

export interface QuranReaderPreferences {
  viewMode: QuranReaderViewMode;
  mushafParchmentTheme: 'ivory' | 'sepia' | 'night';
  quranScriptStyle?: 'uthmani' | 'indopak';
  lastPageBySurah: Record<number, number>;
  bookmarkedPages: Array<{
    surahNumber: number;
    surahName: string;
    pageIndex: number;
    displayPageNumber: number;
    firstAyahNumber: number;
    savedAtIso: string;
  }>;
}

const READER_PREFS_KEY = 'ilmizo_quran_reader_prefs_v1';

const ARABIC_INDIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toArabicIndicNumber(num: number): string {
  return String(Math.max(0, Math.floor(num)))
    .split('')
    .map((ch) => ARABIC_INDIC_DIGITS[Number(ch)] ?? ch)
    .join('');
}

export function formatOrnamentalAyahMarker(ayahNumber: number): string {
  return `﴿${toArabicIndicNumber(ayahNumber)}﴾`;
}

export function loadQuranReaderPreferences(): QuranReaderPreferences {
  if (typeof localStorage === 'undefined') {
    return {
      viewMode: 'card',
      mushafParchmentTheme: 'ivory',
      quranScriptStyle: 'uthmani',
      lastPageBySurah: {},
      bookmarkedPages: [],
    };
  }
  try {
    const raw = localStorage.getItem(READER_PREFS_KEY);
    if (!raw) {
      return {
        viewMode: 'card',
        mushafParchmentTheme: 'ivory',
        quranScriptStyle: 'uthmani',
        lastPageBySurah: {},
        bookmarkedPages: [],
      };
    }
    const parsed = JSON.parse(raw);
    return {
      viewMode:
        parsed.viewMode === 'mushaf' || parsed.viewMode === 'study' || parsed.viewMode === 'card'
          ? parsed.viewMode
          : 'card',
      mushafParchmentTheme:
        parsed.mushafParchmentTheme === 'sepia' ||
        parsed.mushafParchmentTheme === 'night' ||
        parsed.mushafParchmentTheme === 'ivory'
          ? parsed.mushafParchmentTheme
          : 'ivory',
      quranScriptStyle: parsed.quranScriptStyle === 'indopak' ? 'indopak' : 'uthmani',
      lastPageBySurah:
        parsed.lastPageBySurah && typeof parsed.lastPageBySurah === 'object'
          ? parsed.lastPageBySurah
          : {},
      bookmarkedPages: Array.isArray(parsed.bookmarkedPages) ? parsed.bookmarkedPages : [],
    };
  } catch {
    return {
      viewMode: 'card',
      mushafParchmentTheme: 'ivory',
      quranScriptStyle: 'uthmani',
      lastPageBySurah: {},
      bookmarkedPages: [],
    };
  }
}

export function saveQuranReaderPreferences(prefs: QuranReaderPreferences): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(READER_PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore quota errors
  }
}

/**
 * Groups Surah Ayahs into calm, distraction-free Reflowable Uthmani Mushaf pages.
 * - Uses authentic `ayah.mushafPage` grouping whenever present.
 * - Falls back cleanly to balanced ~650-char / max-8-ayah reflowable pages when page metadata is absent.
 * Never claims to be a scanned 15-line printed Mushaf.
 */
export function buildReflowableMushafPages(ayahs: AyahItem[]): MushafPageGroup[] {
  if (!ayahs || ayahs.length === 0) return [];

  const hasMushafPageMeta = ayahs.every(
    (a) => typeof a.mushafPage === 'number' && Number.isFinite(a.mushafPage) && a.mushafPage > 0
  );

  if (hasMushafPageMeta) {
    const grouped = new Map<number, AyahItem[]>();
    for (const ayah of ayahs) {
      const pageNum = ayah.mushafPage as number;
      const list = grouped.get(pageNum) || [];
      list.push(ayah);
      grouped.set(pageNum, list);
    }
    return Array.from(grouped.entries()).map(([pageNum, list], idx) => ({
      pageIndex: idx,
      displayPageNumber: pageNum,
      isStandardMushafPageNumber: true,
      ayahs: list,
    }));
  }

  const pages: MushafPageGroup[] = [];
  let currentBucket: AyahItem[] = [];
  let charBudget = 0;

  for (const ayah of ayahs) {
    const len = (ayah.arabicUthmani || '').length;
    const wouldOverflow =
      currentBucket.length > 0 && (charBudget + len > 680 || currentBucket.length >= 8);
    if (wouldOverflow) {
      pages.push({
        pageIndex: pages.length,
        displayPageNumber: pages.length + 1,
        isStandardMushafPageNumber: false,
        ayahs: currentBucket,
      });
      currentBucket = [];
      charBudget = 0;
    }
    currentBucket.push(ayah);
    charBudget += len;
  }

  if (currentBucket.length > 0) {
    pages.push({
      pageIndex: pages.length,
      displayPageNumber: pages.length + 1,
      isStandardMushafPageNumber: false,
      ayahs: currentBucket,
    });
  }

  return pages;
}
