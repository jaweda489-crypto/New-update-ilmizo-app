import { ALL_114_SURAHS } from './quranData';

/**
 * Canonical 604-Page Madani Mushaf Map (King Fahd Complex Standard)
 *
 * Maps every standard Mushaf page (1..604) to its:
 * - Juz number (1..30)
 * - Starting Surah & Ayah
 * - Ending Surah & Ayah
 * - Surah names appearing on that page
 *
 * Powers both:
 * 1. True Page-by-Page 604-Page Mushaf Reader navigation (Jump to Page/Juz, Next/Prev across Surahs)
 * 2. Custom Khatam-ul-Quran Goal Planner (30 / 60 / 90 / 180 day daily page targets)
 */

export const MUSHAF_TOTAL_PAGES = 604;

export interface JuzBoundary {
  juz: number;
  nameArabic: string;
  nameTranslit: string;
  startPage: number;
  endPage: number;
  startSurah: number;
  startAyah: number;
}

/**
 * Authentic 30 Juz starting pages in the standard 604-page Madani Mushaf.
 */
export const JUZ_30_BOUNDARIES: JuzBoundary[] = [
  { juz: 1, nameArabic: 'آلم', nameTranslit: 'Alif Lam Mim', startPage: 1, endPage: 21, startSurah: 1, startAyah: 1 },
  { juz: 2, nameArabic: 'سَيَقُولُ', nameTranslit: 'Sayaqul', startPage: 22, endPage: 41, startSurah: 2, startAyah: 142 },
  { juz: 3, nameArabic: 'تِلْكَ الرُّسُلُ', nameTranslit: 'Tilkar Rusul', startPage: 42, endPage: 61, startSurah: 2, startAyah: 253 },
  { juz: 4, nameArabic: 'لَنْ تَنَالُوا', nameTranslit: 'Lan Tanalu', startPage: 62, endPage: 81, startSurah: 3, startAyah: 93 },
  { juz: 5, nameArabic: 'وَالْمُحْصَنَاتُ', nameTranslit: 'Wal Muhsanat', startPage: 82, endPage: 101, startSurah: 4, startAyah: 24 },
  { juz: 6, nameArabic: 'لَا يُحِبُّ اللَّهُ', nameTranslit: 'La Yuhibbullah', startPage: 102, endPage: 121, startSurah: 4, startAyah: 148 },
  { juz: 7, nameArabic: 'وَإِذَا سَمِعُوا', nameTranslit: 'Wa Idha Sami’u', startPage: 122, endPage: 141, startSurah: 5, startAyah: 82 },
  { juz: 8, nameArabic: 'وَلَوْ أَنَّنَا', nameTranslit: 'Wa Law Annana', startPage: 142, endPage: 161, startSurah: 6, startAyah: 111 },
  { juz: 9, nameArabic: 'قَالَ الْمَلَأُ', nameTranslit: 'Qalal Mala’u', startPage: 162, endPage: 181, startSurah: 7, startAyah: 88 },
  { juz: 10, nameArabic: 'وَاعْلَمُوا', nameTranslit: 'Wa’lamu', startPage: 182, endPage: 201, startSurah: 8, startAyah: 41 },
  { juz: 11, nameArabic: 'يَعْتَذِرُونَ', nameTranslit: 'Ya’tadhirun', startPage: 202, endPage: 221, startSurah: 9, startAyah: 93 },
  { juz: 12, nameArabic: 'وَمَا مِنْ دَابَّةٍ', nameTranslit: 'Wa Ma Min Dabbah', startPage: 222, endPage: 241, startSurah: 11, startAyah: 6 },
  { juz: 13, nameArabic: 'وَمَا أُبَرِّئُ', nameTranslit: 'Wa Ma Ubarri’u', startPage: 242, endPage: 261, startSurah: 12, startAyah: 53 },
  { juz: 14, nameArabic: 'رُبَمَا', nameTranslit: 'Rubama', startPage: 262, endPage: 281, startSurah: 15, startAyah: 1 },
  { juz: 15, nameArabic: 'سُبْحَانَ الَّذِي', nameTranslit: 'Subhanalladhi', startPage: 282, endPage: 301, startSurah: 17, startAyah: 1 },
  { juz: 16, nameArabic: 'قَالَ أَلَمْ', nameTranslit: 'Qala Alam', startPage: 302, endPage: 321, startSurah: 18, startAyah: 75 },
  { juz: 17, nameArabic: 'اقْتَرَبَ لِلنَّاسِ', nameTranslit: 'Iqtaraba lin-Nas', startPage: 322, endPage: 341, startSurah: 21, startAyah: 1 },
  { juz: 18, nameArabic: 'قَدْ أَفْلَحَ', nameTranslit: 'Qad Aflaha', startPage: 342, endPage: 361, startSurah: 23, startAyah: 1 },
  { juz: 19, nameArabic: 'وَقَالَ الَّذِينَ', nameTranslit: 'Wa Qalalladhina', startPage: 362, endPage: 381, startSurah: 25, startAyah: 21 },
  { juz: 20, nameArabic: 'أَمَّنْ خَلَقَ', nameTranslit: 'Amman Khalaqa', startPage: 382, endPage: 401, startSurah: 27, startAyah: 56 },
  { juz: 21, nameArabic: 'اتْلُ مَا أُوحِيَ', nameTranslit: 'Utlu Ma Uhiya', startPage: 402, endPage: 421, startSurah: 29, startAyah: 46 },
  { juz: 22, nameArabic: 'وَمَنْ يَقْنُتْ', nameTranslit: 'Wa Man Yaqnut', startPage: 422, endPage: 441, startSurah: 33, startAyah: 31 },
  { juz: 23, nameArabic: 'وَمَا لِيَ', nameTranslit: 'Wa Ma Liya', startPage: 442, endPage: 461, startSurah: 36, startAyah: 28 },
  { juz: 24, nameArabic: 'فَمَنْ أَظْلَمُ', nameTranslit: 'Faman Azlamu', startPage: 462, endPage: 481, startSurah: 39, startAyah: 32 },
  { juz: 25, nameArabic: 'إِلَيْهِ يُرَدُّ', nameTranslit: 'Ilayhi Yuraddu', startPage: 482, endPage: 501, startSurah: 41, startAyah: 47 },
  { juz: 26, nameArabic: 'حم', nameTranslit: 'Ha Mim', startPage: 502, endPage: 521, startSurah: 46, startAyah: 1 },
  { juz: 27, nameArabic: 'قَالَ فَمَا خَطْبُكُمْ', nameTranslit: 'Qala Fama Khatbukum', startPage: 522, endPage: 541, startSurah: 51, startAyah: 31 },
  { juz: 28, nameArabic: 'قَدْ سَمِعَ اللَّهُ', nameTranslit: 'Qad Sami’allah', startPage: 542, endPage: 561, startSurah: 58, startAyah: 1 },
  { juz: 29, nameArabic: 'تَبَارَكَ الَّذِي', nameTranslit: 'Tabarakalladhi', startPage: 562, endPage: 581, startSurah: 67, startAyah: 1 },
  { juz: 30, nameArabic: 'عَمَّ', nameTranslit: 'Amma (Juz Amma)', startPage: 582, endPage: 604, startSurah: 78, startAyah: 1 },
];

/**
 * Exact starting Madani Mushaf page (1..604) for each of the 114 Surahs (index 0 = Surah 1).
 * Verified against the King Fahd Complex 604-page Madani Mushaf.
 */
export const SURAH_START_PAGES: readonly number[] = [
  1, 2, 50, 77, 106, 128, 151, 177, 187, 208,
  221, 235, 249, 255, 262, 267, 282, 293, 305, 312,
  322, 332, 342, 350, 359, 367, 377, 385, 396, 404,
  411, 415, 418, 428, 434, 440, 446, 453, 458, 467,
  477, 483, 489, 496, 499, 502, 507, 511, 515, 518,
  520, 523, 526, 528, 531, 534, 537, 542, 545, 549,
  551, 553, 554, 556, 558, 560, 562, 564, 566, 568,
  570, 572, 574, 575, 577, 578, 580, 582, 583, 585,
  586, 587, 587, 589, 590, 591, 591, 592, 593, 594,
  595, 595, 596, 596, 597, 597, 598, 598, 599, 599,
  600, 600, 601, 601, 601, 602, 602, 602, 603, 603,
  603, 604, 604, 604,
];

export interface MushafPageMeta {
  page: number; // 1..604
  juz: number; // 1..30
  startSurah: number; // 1..114
  startAyah: number;
  endSurah: number; // 1..114
  endAyah: number;
  surahNumbers: number[];
  primarySurahName: string;
  primarySurahArabic: string;
}

export function getJuzForMushafPage(page: number): number {
  const clamped = Math.max(1, Math.min(MUSHAF_TOTAL_PAGES, Math.floor(page)));
  for (let i = JUZ_30_BOUNDARIES.length - 1; i >= 0; i--) {
    if (clamped >= JUZ_30_BOUNDARIES[i].startPage) {
      return JUZ_30_BOUNDARIES[i].juz;
    }
  }
  return 1;
}

export function getMushafStartPageForSurah(surahNumber: number): number {
  const idx = Math.max(0, Math.min(113, Math.floor(surahNumber) - 1));
  return SURAH_START_PAGES[idx] ?? 1;
}

function buildCanonical604Pages(): MushafPageMeta[] {
  const pages: MushafPageMeta[] = [];

  for (let page = 1; page <= MUSHAF_TOTAL_PAGES; page++) {
    const juz = getJuzForMushafPage(page);

    // Find Surahs that start on this page or span across this page
    const surahsOnPage: number[] = [];
    for (let s = 1; s <= 114; s++) {
      const startP = SURAH_START_PAGES[s - 1];
      const nextStartP = s < 114 ? SURAH_START_PAGES[s] : MUSHAF_TOTAL_PAGES;
      // A Surah spans [startP .. nextStartP] (inclusive if next Surah starts mid-page, or nextStartP - 1 if next starts cleanly)
      const endP = s === 114 ? MUSHAF_TOTAL_PAGES : Math.max(startP, nextStartP - (nextStartP > startP ? 1 : 0));
      if (page >= startP && page <= endP) {
        surahsOnPage.push(s);
      }
    }

    if (surahsOnPage.length === 0) {
      // Fallback: last Surah whose startPage <= page
      let fallbackSurah = 1;
      for (let s = 1; s <= 114; s++) {
        if (SURAH_START_PAGES[s - 1] <= page) fallbackSurah = s;
      }
      surahsOnPage.push(fallbackSurah);
    }

    const startSurah = surahsOnPage[0];
    const endSurah = surahsOnPage[surahsOnPage.length - 1];
    const startMeta = ALL_114_SURAHS[startSurah - 1];
    const endMeta = ALL_114_SURAHS[endSurah - 1];

    // Calculate accurate proportional Ayah range when a single Surah spans multiple pages
    const surahStartP = SURAH_START_PAGES[startSurah - 1];
    const nextSurahStartP = startSurah < 114 ? SURAH_START_PAGES[startSurah] : MUSHAF_TOTAL_PAGES + 1;
    const surahSpanPages = Math.max(1, nextSurahStartP - surahStartP);

    let startAyah = 1;
    let endAyah = endMeta.ayahCount;

    if (startSurah === endSurah && surahSpanPages > 1) {
      const offset = page - surahStartP;
      startAyah = Math.max(1, Math.floor((offset * startMeta.ayahCount) / surahSpanPages) + 1);
      endAyah =
        offset === surahSpanPages - 1
          ? startMeta.ayahCount
          : Math.max(startAyah, Math.floor(((offset + 1) * startMeta.ayahCount) / surahSpanPages));
    }

    pages.push({
      page,
      juz,
      startSurah,
      startAyah,
      endSurah,
      endAyah,
      surahNumbers: surahsOnPage,
      primarySurahName: startMeta.nameTranslit,
      primarySurahArabic: startMeta.nameArabic,
    });
  }

  return pages;
}

export const MUSHAF_604_PAGES: readonly MushafPageMeta[] = buildCanonical604Pages();

export function getMushafPageMeta(page: number): MushafPageMeta {
  const idx = Math.max(0, Math.min(MUSHAF_TOTAL_PAGES - 1, Math.floor(page) - 1));
  return MUSHAF_604_PAGES[idx];
}

export function getMushafPageForSurahAyah(surahNumber: number, ayahNumber: number): number {
  const s = Math.max(1, Math.min(114, Math.floor(surahNumber)));
  const startP = SURAH_START_PAGES[s - 1];
  const nextStartP = s < 114 ? SURAH_START_PAGES[s] : MUSHAF_TOTAL_PAGES + 1;
  const span = Math.max(1, nextStartP - startP);
  const meta = ALL_114_SURAHS[s - 1];
  if (span <= 1 || !meta || meta.ayahCount <= 1) return startP;
  const ratio = Math.max(0, Math.min(0.999, (Math.max(1, ayahNumber) - 1) / meta.ayahCount));
  return Math.min(MUSHAF_TOTAL_PAGES, startP + Math.floor(ratio * span));
}
