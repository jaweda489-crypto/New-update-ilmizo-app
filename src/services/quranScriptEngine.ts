import { useCallback, useEffect, useState } from 'react';

export type QuranScriptStyle = 'uthmani' | 'indopak';

export interface WordTimingRange {
  index: number;
  word: string;
  startRatio: number; // 0..1
  endRatio: number; // 0..1
}

const SCRIPT_STORAGE_KEY = 'ilmizo_quran_script_style_v1';
const SCRIPT_CHANGE_EVENT = 'ilmizo-quran-script-change';

export function loadQuranScriptStyle(): QuranScriptStyle {
  if (typeof localStorage === 'undefined') return 'uthmani';
  try {
    const raw = localStorage.getItem(SCRIPT_STORAGE_KEY);
    return raw === 'indopak' ? 'indopak' : 'uthmani';
  } catch {
    return 'uthmani';
  }
}

export function saveQuranScriptStyle(style: QuranScriptStyle): void {
  const safeStyle: QuranScriptStyle = style === 'indopak' ? 'indopak' : 'uthmani';
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(SCRIPT_STORAGE_KEY, safeStyle);
    } catch {
      // Ignore storage quota errors
    }
  }
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent<QuranScriptStyle>(SCRIPT_CHANGE_EVENT, { detail: safeStyle }));
  }
}

/**
 * Shared React hook keeping Madani (Uthmani) vs South Asian IndoPak (15-Line) script
 * preference synchronized instantly across Adult Card, Mushaf, Study, and Kids Quran screens.
 */
export function useQuranScriptStyle(): [QuranScriptStyle, (next: QuranScriptStyle) => void] {
  const [scriptStyle, setScriptStyleState] = useState<QuranScriptStyle>(() => loadQuranScriptStyle());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onChange = (ev: Event) => {
      const detail = (ev as CustomEvent<QuranScriptStyle>).detail;
      if (detail === 'indopak' || detail === 'uthmani') {
        setScriptStyleState(detail);
      } else {
        setScriptStyleState(loadQuranScriptStyle());
      }
    };
    window.addEventListener(SCRIPT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(SCRIPT_CHANGE_EVENT, onChange);
  }, []);

  const setScriptStyle = useCallback((next: QuranScriptStyle) => {
    saveQuranScriptStyle(next);
    setScriptStyleState(next);
  }, []);

  return [scriptStyle, setScriptStyle];
}

export function getArabicScriptFontClass(style: QuranScriptStyle): string {
  return style === 'indopak' ? 'font-arabic-indopak' : 'font-arabic-uthmani';
}

export function getQuranScriptLabel(style: QuranScriptStyle): string {
  return style === 'indopak' ? 'IndoPak (15-Line)' : 'Madani (Uthmani)';
}

/**
 * Renders verified Quran text tailored for either Madani (Uthmani) or South Asian IndoPak readability.
 * Preserves every Arabic word and Tajweed vowel faithfully while adapting Uthmani-only symbols
 * (such as Alef Wasla ٱ and Uthmani small high rounded zero ۟) into crisp South Asian Mushaf forms.
 */
export function formatAyahTextForScript(arabicUthmani: string, style: QuranScriptStyle): string {
  if (!arabicUthmani) return '';
  if (style === 'uthmani') return arabicUthmani;

  return arabicUthmani
    .replace(/\u0671/g, '\u0627') // Alef Wasla (ٱ) -> clear South Asian Alif (ا)
    .replace(/\u06DF/g, '\u0652') // Small high rounded zero (۟) -> standard Sukun (ْ)
    .replace(/\u06E0/g, '\u0652') // Small high upright rectangular zero (۠) -> Sukun (ْ)
    .replace(/\u06E1/g, '\u0652') // Small high dotless head of khah (ۡ) -> Sukun (ْ)
    .replace(/\u06CC/g, '\u064A') // Standardize Farsi Yeh if present
    .replace(/\u0640+/g, ''); // Clean tatweel stretchers for crisp IndoPak ligatures
}

/**
 * Estimates syllable/tajweed-weighted timing boundaries [startRatio, endRatio) for each Arabic word
 * in an Ayah so Word-by-Word Live Highlighting smoothly tracks Qari recitation even without
 * external server-side millisecond word-timestamp files.
 *
 * Weights reflect real recitation acoustics:
 * - Madd (elongation ٓ / ٰ / long vowels ا و ي) adds duration
 * - Shaddah (ّ) adds doubled-consonant hold duration
 * - Base Arabic letters contribute proportional articulation duration
 */
export function computeWordTimingRanges(words: readonly string[]): WordTimingRange[] {
  if (!words || words.length === 0) return [];

  const weights = words.map((rawWord) => {
    const word = rawWord || '';
    let w = 1.2; // Base per-word minimum pause/articulation floor
    for (let i = 0; i < word.length; i++) {
      const code = word.charCodeAt(i);
      // Maddah above (ٓ), Superscript Alef (ٰ) -> strong elongation weight
      if (code === 0x0653 || code === 0x0670) {
        w += 2.2;
      } else if (code === 0x0651) {
        // Shaddah (ّ) -> gemination + ghunnah hold
        w += 1.35;
      } else if (code === 0x0627 || code === 0x0648 || code === 0x064a || code === 0x0649 || code === 0x0671) {
        // Long vowel carriers (Alif, Waw, Ya)
        w += 0.95;
      } else if (code >= 0x0621 && code <= 0x064a) {
        // Standard Arabic consonant
        w += 0.8;
      } else if (code >= 0x064b && code <= 0x0650) {
        // Short harakat / tanween
        w += 0.25;
      }
    }
    return Math.max(1.5, w);
  });

  const totalWeight = weights.reduce((acc, v) => acc + v, 0) || 1;
  let cursor = 0;

  return words.map((word, index) => {
    const startRatio = cursor / totalWeight;
    cursor += weights[index];
    const endRatio = index === words.length - 1 ? 1 : cursor / totalWeight;
    return {
      index,
      word,
      startRatio,
      endRatio,
    };
  });
}

/**
 * Resolves the 0-based active Arabic word index for a given playback progress ratio (0..1).
 * Returns -1 when playback is inactive or progress is out of bounds.
 */
export function getActiveWordIndexAtProgress(
  words: readonly string[],
  progressRatio: number
): number {
  if (!words || words.length === 0) return -1;
  if (!Number.isFinite(progressRatio) || progressRatio < 0) return -1;

  const clamped = Math.max(0, Math.min(0.9999, progressRatio));
  const ranges = computeWordTimingRanges(words);
  for (let i = 0; i < ranges.length; i++) {
    if (clamped >= ranges[i].startRatio && clamped < ranges[i].endRatio) {
      return i;
    }
  }
  return ranges.length - 1;
}
