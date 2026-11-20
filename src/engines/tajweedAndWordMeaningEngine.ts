import { TOP_QURAN_VOCAB } from '../data/islamicContent';
import { LanguageCode } from '../types/ilmizo';

export type LocalizedText = Partial<Record<LanguageCode, string>> & { en: string };


export type TajweedRuleId =
  | 'ghunnah'
  | 'qalqalah'
  | 'madd'
  | 'idgham_ikhfa'
  | 'tafkheem_allah'
  | 'normal';

export interface TajweedRuleMeta {
  id: TajweedRuleId;
  label: string;
  shortLabel: string;
  colorHex: string;
  darkColorHex: string;
  bgClass: string;
  textClass: string;
  darkTextClass: string;
  description: LocalizedText;
}

export const TAJWEED_RULES_META: Record<TajweedRuleId, TajweedRuleMeta> = {
  ghunnah: {
    id: 'ghunnah',
    label: 'Ghunnah (Nasalization - 2 Beats)',
    shortLabel: 'Ghunnah',
    colorHex: '#16A34A',
    darkColorHex: '#4ADE80',
    bgClass: 'bg-emerald-100 border-emerald-400 text-emerald-950',
    textClass: 'text-[#15803D]',
    darkTextClass: 'text-[#4ADE80]',
    description: {
      en: 'Nasal sound held for 2 counts on Noon Mushaddadah (نّ) or Meem Mushaddadah (مّ).',
      hi: 'नून मुशद्दद (نّ) या मीम मुशद्दद (مّ) पर नाक में 2 हरकत तक आवाज़ ठहराना (ग़ुन्ना)।',
      ur: 'نون مشدد (نّ) یا میم مشدد (مّ) پر ناک میں دو حرکت تک آواز ٹھہرانا (غنہ)۔',
      hinglish: 'Noon Mushaddadah (نّ) ya Meem Mushaddadah (مّ) par naak se 2 counts tak aawaz rokna (Ghunnah).',
      ar: 'غُنَّة بمقدار حركتين عند النون والميم المشددتين.',
    },
  },
  qalqalah: {
    id: 'qalqalah',
    label: 'Qalqalah (Echoing Bounce)',
    shortLabel: 'Qalqalah',
    colorHex: '#2563EB',
    darkColorHex: '#60A5FA',
    bgClass: 'bg-blue-100 border-blue-400 text-blue-950',
    textClass: 'text-[#1D4ED8]',
    darkTextClass: 'text-[#60A5FA]',
    description: {
      en: 'Slight echoing bounce when pronouncing Qaf, Ta, Ba, Jeem, or Dal (قطب جد) with Sukoon.',
      hi: 'क़ाफ़, ता, बा, जीम या दाल (قطب جد) पर सुकून होने पर हल्की गूंज (क़लक़ला) के साथ पढ़ना।',
      ur: 'ق، ط، ب، ج، د (قطب جد) ساکن ہونے پر ہلکی گونج (قلقلہ) کے ساتھ ادا کرنا۔',
      hinglish: 'Qaf, Ta, Ba, Jeem ya Dal (قطب جد) par sukoon ho toh halka bounce/echo (Qalqalah) karna.',
      ar: 'قلقلة الحرف الساكن من حروف (قطب جد)اضطراباً خفيفاً في المخرج.',
    },
  },
  madd: {
    id: 'madd',
    label: 'Madd (Vowel Elongation - 2 to 6 Beats)',
    shortLabel: 'Madd',
    colorHex: '#DC2626',
    darkColorHex: '#F87171',
    bgClass: 'bg-rose-100 border-rose-400 text-rose-950',
    textClass: 'text-[#B91C1C]',
    darkTextClass: 'text-[#FCA5A5]',
    description: {
      en: 'Stretch and elongate the long vowel sound smoothly for 2 to 4/6 beats.',
      hi: 'मद्द के निशान या अलिफ़/वाव/या मद्दाह पर आवाज़ को 2 से 4/6 हरकत तक खींच कर पढ़ना।',
      ur: 'مد کی علامت یا حروفِ مدہ پر آواز کو 2 سے 6 حرکت تک کھینچ کر پڑھنا۔',
      hinglish: 'Madd sign ya long vowel par aawaz ko 2 se 4/6 counts tak lamba kheench kar padhna.',
      ar: 'إطالة الصوت بحرف المد من حركتين إلى ست حركات حسب نوع المد.',
    },
  },
  idgham_ikhfa: {
    id: 'idgham_ikhfa',
    label: 'Noon Sakinah / Tanween Rule (Idgham / Ikhfa)',
    shortLabel: 'Tanween / Noon',
    colorHex: '#D97706',
    darkColorHex: '#FBBF24',
    bgClass: 'bg-amber-100 border-amber-400 text-amber-950',
    textClass: 'text-[#B45309]',
    darkTextClass: 'text-[#FCD34D]',
    description: {
      en: 'Apply Noon Sakinah or Tanween blending (Idgham) or soft nasal hiding (Ikhfa) into the following letter.',
      hi: 'नून साकिन या तनवीन (ً ٍ ٌ) को अगले हर्फ़ के साथ मिलाकर (इदग़ाम) या छुपाकर (इख़्फ़ा) पढ़ना।',
      ur: 'نون ساکن یا تنوین کو اگلے حرف کے ساتھ ملا کر (ادغام) یا چھپا کر (اخفاء) پڑھنا۔',
      hinglish: 'Noon Sakinah ya Tanween ko agle harf ke saath blend (Idgham) ya soft nasal (Ikhfa) ke saath padhna.',
      ar: 'أحكام النون الساكنة والتنوين من إدغام أو إخفاء أو إقلاب.',
    },
  },
  tafkheem_allah: {
    id: 'tafkheem_allah',
    label: 'Tafkheem / Lafzatullah (Full-Mouth Heavy Sound)',
    shortLabel: 'Tafkheem',
    colorHex: '#7C3AED',
    darkColorHex: '#C084FC',
    bgClass: 'bg-purple-100 border-purple-400 text-purple-950',
    textClass: 'text-[#6D28D9]',
    darkTextClass: 'text-[#C4B5FD]',
    description: {
      en: 'Pronounce with a resonant, full-mouth heavy tone (Tafkheem) on the Divine Name or elevated letters (خص ضغط قظ).',
      hi: 'अल्लाह के नाम या मोटे हुरूफ़ (خص ضغط قظ) को मुंह भर कर भारी आवाज़ (तफ़ख़ीम) से अदा करना।',
      ur: 'لفظِ اللّٰہ یا حروفِ مستعلیہ (خص ضغط قظ) کو پر (موٹا) کر کے پڑھنا۔',
      hinglish: 'Lafz-e-Allah ya heavy letters (خص ضغط قظ) ko full-mouth heavy tone (Tafkheem) se padhna.',
      ar: 'تفخيم لفظ الجلالة أو حروف الاستعلاء (خص ضغط قظ).',
    },
  },
  normal: {
    id: 'normal',
    label: 'Standard Uthmani Articulation (Tarqeeq)',
    shortLabel: 'Clear Reading',
    colorHex: '#0F172A',
    darkColorHex: '#F8FAFC',
    bgClass: 'bg-slate-100 border-slate-300 text-slate-900',
    textClass: 'text-slate-900',
    darkTextClass: 'text-white',
    description: {
      en: 'Clear, natural Arabic articulation (Tarqeeq) giving each letter its proper Makhraj and Harakah.',
      hi: 'हर हर्फ़ को उसके सही मख़रज और हरकत के साथ साफ़ और स्पष्ट पढ़ना।',
      ur: 'ہر حرف کو اس کے درست مخرج اور حرکت کے ساتھ صاف ادا کرنا۔',
      hinglish: 'Har Arabic letter ko uske sahi makhraj aur harakah ke saath saaf padhna.',
      ar: 'النطق الفصيح الواضح بالحرف مع إعطاء كل حرف حقه ومستحقه.',
    },
  },
};

export interface TajweedSegment {
  text: string;
  ruleId: TajweedRuleId;
  ruleNote?: string;
}

export interface QuranWordAnalysis {
  index: number;
  arabicWord: string;
  normalizedKey: string;
  transliteration: string;
  meanings: LocalizedText;
  tajweedRule: TajweedRuleMeta;
  segments: TajweedSegment[];
  grammarHint: string;
  wordAudioUrl?: string;
  isExactDictionaryMatch?: boolean;
}

/**
 * Strips Arabic diacritics and Uthmani signs for dictionary lookup while keeping root letters.
 */
export function normalizeArabicWordForLookup(word: string): string {
  return word
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, '')
    .replace(/[ٱأإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim();
}

const COMBINING_ARABIC_RE = /^[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]$/u;
const QALQALAH_LETTERS = new Set(['ق', 'ط', 'ب', 'ج', 'د']);
const TAFKHEEM_LETTERS = new Set(['خ', 'ص', 'ض', 'غ', 'ط', 'ق', 'ظ']);
const THROAT_IZHAR_LETTERS = new Set(['ء', 'أ', 'إ', 'آ', 'ؤ', 'ئ', 'ه', 'ع', 'ح', 'غ', 'خ']);
const IDGHAM_GHUNNAH_LETTERS = new Set(['ي', 'ن', 'م', 'و']);
const IDGHAM_BILA_GHUNNAH_LETTERS = new Set(['ل', 'ر']);
const MADD_TRIGGER_SIGNS = /[\u0653\u0670آ]/u;

function splitWordIntoGraphemeClusters(word: string): string[] {
  const clusters: string[] = [];
  for (const ch of Array.from(word)) {
    if (COMBINING_ARABIC_RE.test(ch) && clusters.length > 0) {
      clusters[clusters.length - 1] += ch;
    } else {
      clusters.push(ch);
    }
  }
  return clusters;
}

function getBaseLetter(cluster: string): string {
  for (const ch of Array.from(cluster)) {
    if (!COMBINING_ARABIC_RE.test(ch)) return ch;
  }
  return '';
}

function classifyNoonOrTanweenFollowLetter(nextBase: string): {
  ruleId: TajweedRuleId;
  note?: string;
} {
  if (!nextBase) return { ruleId: 'normal' };
  if (THROAT_IZHAR_LETTERS.has(nextBase)) {
    return { ruleId: 'normal', note: 'Izhar (clear Noon/Tanween before throat letter)' };
  }
  if (nextBase === 'ب') {
    return { ruleId: 'idgham_ikhfa', note: 'Iqlab (Noon/Tanween turns into hidden Meem before ب)' };
  }
  if (IDGHAM_GHUNNAH_LETTERS.has(nextBase)) {
    return { ruleId: 'idgham_ikhfa', note: 'Idgham ma‘al-Ghunnah (merge with 2-beat nasalization)' };
  }
  if (IDGHAM_BILA_GHUNNAH_LETTERS.has(nextBase)) {
    return { ruleId: 'idgham_ikhfa', note: 'Idgham bila Ghunnah (complete merge without nasalization)' };
  }
  return { ruleId: 'idgham_ikhfa', note: 'Ikhfa (soft nasal hiding for 2 beats)' };
}

/**
 * Segments an array of Arabic words in an Ayah into character-cluster Tajweed spans,
 * evaluating both intra-word rules (Ghunnah, Qalqalah, Madd, Tafkheem, Lafzatullah)
 * and cross-word Noon Sakinah / Tanween rules (Iqlab, Idgham, Ikhfa, Izhar).
 */
export function segmentArabicWordsWithTajweed(words: string[]): TajweedSegment[][] {
  return words.map((rawWord, wordIdx) => {
    const w = rawWord.trim();
    if (!w) return [];
    const clusters = splitWordIntoGraphemeClusters(w);
    const normWord = normalizeArabicWordForLookup(w);
    const isLafzatullah = normWord === 'الله' || normWord === 'لله' || normWord === 'بالله' || normWord === 'والله' || normWord === 'تالله' || normWord === 'فالله' || normWord === 'اللهم';
    const nextWord = words[wordIdx + 1]?.trim() || '';
    const nextWordClusters = nextWord ? splitWordIntoGraphemeClusters(nextWord) : [];
    const firstNextLetter = (() => {
      for (const c of nextWordClusters) {
        const b = getBaseLetter(c);
        if (b && b !== 'ٱ') return b;
      }
      return '';
    })();

    const clusterRules: { text: string; ruleId: TajweedRuleId; note?: string }[] = clusters.map((cluster, cIdx) => {
      const base = getBaseLetter(cluster);
      const hasShaddah = cluster.includes('\u0651');
      const hasSukoon = cluster.includes('\u0652') || cluster.includes('\u06E1');
      const hasTanween = /[\u064B\u064C\u064D]/u.test(cluster);
      const hasFatha = cluster.includes('\u064E');
      const hasDamma = cluster.includes('\u064F');
      const nextClusterInWord = clusters[cIdx + 1] || '';
      const nextBaseInWord = getBaseLetter(nextClusterInWord);

      // 1. Ghunnah: Noon or Meem with Shaddah (نّ / مّ)
      if ((base === 'ن' || base === 'م') && hasShaddah) {
        return { text: cluster, ruleId: 'ghunnah', note: 'Ghunnah (2-beat nasal sound)' };
      }

      // 2. Noon Sakinah or Tanween (intra-word or cross-word)
      const isNoonSakinah =
        base === 'ن' &&
        (hasSukoon || (!/[\u064E\u064F\u0650\u0651]/u.test(cluster) && cIdx > 0));
      if (hasTanween || isNoonSakinah) {
        // Look ahead inside the same word or across to the next word
        let targetFollow = nextBaseInWord;
        if (!targetFollow || (hasTanween && nextBaseInWord === 'ا' && cIdx === clusters.length - 2)) {
          targetFollow = firstNextLetter;
        }
        const classified = classifyNoonOrTanweenFollowLetter(targetFollow);
        if (classified.ruleId !== 'normal') {
          return { text: cluster, ruleId: classified.ruleId, note: classified.note };
        }
      }

      // 3. Madd: Maddah sign, Dagger Alif, الآ, or long vowel before Hamzah (Muttasil/Munfasil) or Shaddah (Lazim)
      if (MADD_TRIGGER_SIGNS.test(cluster)) {
        return { text: cluster, ruleId: 'madd', note: 'Madd (4–6 beat elongation)' };
      }
      if ((base === 'ا' || base === 'و' || base === 'ي') && !hasSukoon && !hasFatha && !hasDamma && !cluster.includes('\u0650')) {
        if (['ء', 'أ', 'إ', 'ئ', 'ؤ'].includes(nextBaseInWord) || (cIdx === clusters.length - 1 && ['ء', 'أ', 'إ'].includes(firstNextLetter))) {
          return { text: cluster, ruleId: 'madd', note: 'Madd Muttasil / Munfasil (4–5 beats before Hamzah)' };
        }
        if (nextClusterInWord.includes('\u0651')) {
          return { text: cluster, ruleId: 'madd', note: 'Madd Lazim (6 beats before Shaddah)' };
        }
      }

      // 4. Qalqalah: قطب جد with Sukoon or final stop on last word of Ayah
      if (QALQALAH_LETTERS.has(base) && (hasSukoon || (wordIdx === words.length - 1 && cIdx === clusters.length - 1))) {
        return { text: cluster, ruleId: 'qalqalah', note: 'Qalqalah (echoing bounce)' };
      }

      // 5. Lafzatullah & Heavy Tafkheem letters (خص ضغط قظ + heavy ر)
      if (isLafzatullah && (base === 'ل' || base === 'ه')) {
        return { text: cluster, ruleId: 'tafkheem_allah', note: 'Lafzatullah (Tafkheem)' };
      }
      if (TAFKHEEM_LETTERS.has(base) || (base === 'ر' && (hasFatha || hasDamma))) {
        return { text: cluster, ruleId: 'tafkheem_allah', note: 'Tafkheem (full-mouth heavy letter)' };
      }

      return { text: cluster, ruleId: 'normal' };
    });

    // Merge consecutive clusters sharing the exact same ruleId so Arabic ligatures join naturally!
    const merged: TajweedSegment[] = [];
    for (const seg of clusterRules) {
      const prev = merged[merged.length - 1];
      if (prev && prev.ruleId === seg.ruleId && prev.ruleNote === seg.note) {
        prev.text += seg.text;
      } else {
        merged.push({
          text: seg.text,
          ruleId: seg.ruleId,
          ...(seg.note ? { ruleNote: seg.note } : {}),
        });
      }
    }
    return merged;
  });
}

/**
 * Detects the primary Tajweed rule present in an Arabic Uthmani word token.
 */
export function analyzeArabicWordTajweed(arabicWord: string): TajweedRuleMeta {
  const w = arabicWord.trim();
  if (!w) return TAJWEED_RULES_META.normal;

  const segments = segmentArabicWordsWithTajweed([w])[0] || [];
  const priority: TajweedRuleId[] = [
    'ghunnah',
    'qalqalah',
    'madd',
    'idgham_ikhfa',
    'tafkheem_allah',
  ];
  for (const ruleId of priority) {
    if (segments.some((s) => s.ruleId === ruleId)) {
      return TAJWEED_RULES_META[ruleId];
    }
  }

  return TAJWEED_RULES_META.normal;
}

/**
 * Curated high-frequency word-by-word dictionary covering Al-Fatiha, Juz Amma, Ayat al-Kursi,
 * and common Quranic particles/nouns/verbs, augmented by TOP_QURAN_VOCAB (315 words).
 */
const CURATED_WORD_DICTIONARY: Record<
  string,
  {
    transliteration: string;
    meanings: LocalizedText;
    grammarHint: string;
  }
> = {
  بسم: {
    transliteration: 'Bismi',
    meanings: {
      en: 'In the Name of',
      hi: 'के नाम से (शुरू करता हूँ)',
      ur: 'کے نام سے (شروع کرتا ہوں)',
      hinglish: 'Ke naam se (shuru karta hoon)',
      ar: 'بِاسْمِ (أبتدئ)',
    },
    grammarHint: 'Preposition (بِ) + Noun (اسْم)',
  },
  الله: {
    transliteration: 'Allahi',
    meanings: {
      en: 'Allah (The One True Creator)',
      hi: 'अल्लाह (एकमात्र सच्चा रब)',
      ur: 'اللّٰہ (ایک سچا معبود)',
      hinglish: 'Allah (Ek Sacha Ma’bood)',
      ar: 'اللهُ جل جلاله',
    },
    grammarHint: 'Proper Divine Name (Lafzatullah)',
  },
  الرحمن: {
    transliteration: 'Ar-Rahmani',
    meanings: {
      en: 'The Entirely Merciful',
      hi: 'बेहद रहम करने वाला',
      ur: 'بڑا مہربان',
      hinglish: 'Bada Meherbaan (Sab par reham karne wala)',
      ar: 'ذو الرحمة الواسعة لجميع الخلق',
    },
    grammarHint: 'Divine Attribute (Intensive Form فَعْلان)',
  },
  الرحيم: {
    transliteration: 'Ar-Raheem',
    meanings: {
      en: 'The Especially Merciful',
      hi: 'निहायत रहम वाला (लगातार कृपा करने वाला)',
      ur: 'نہایت رحم والا',
      hinglish: 'Nihayat Reham Wala',
      ar: 'الدائم الرحمة بالمؤمنين',
    },
    grammarHint: 'Divine Attribute (Permanent Form فَعِيل)',
  },
  الحمد: {
    transliteration: 'Al-Hamdu',
    meanings: {
      en: 'All Praise and Gratitude',
      hi: 'तमाम तारीफ़ और शुक्र',
      ur: 'تمام تعریف اور شکر',
      hinglish: 'Tamaam tareef aur shukr',
      ar: 'الثناء الكامل والشكر',
    },
    grammarHint: 'Definite Noun (Subject / Mubtada)',
  },
  لله: {
    transliteration: 'Lillahi',
    meanings: {
      en: 'Belongs to Allah alone',
      hi: 'अल्लाह ही के लिए है',
      ur: 'اللّٰہ ہی کے لیے ہے',
      hinglish: 'Sirf Allah hi ke liye hai',
      ar: 'مستحق لله وحده',
    },
    grammarHint: 'Preposition (لِ) + Divine Name',
  },
  رب: {
    transliteration: 'Rabbi',
    meanings: {
      en: 'Lord, Cherisher & Sustainer',
      hi: 'पालनहार और मालिक (रब)',
      ur: 'پالنے والا اور مالک (رب)',
      hinglish: 'Paalne wala aur Maalik (Rabb)',
      ar: 'المالك والمدبر والمربي',
    },
    grammarHint: 'Noun (Mudhaf / Possessive)',
  },
  العلمين: {
    transliteration: "Al-'Aalameen",
    meanings: {
      en: 'Of all the worlds / universe',
      hi: 'सारे जहानों का',
      ur: 'سارے جہانوں کا',
      hinglish: 'Saare jahanon (worlds) ka',
      ar: 'جميع المخلوقات والعوالم',
    },
    grammarHint: 'Sound Masculine Plural Noun',
  },
  العالمين: {
    transliteration: "Al-'Aalameen",
    meanings: {
      en: 'Of all the worlds / universe',
      hi: 'सारे जहानों का',
      ur: 'سارے جہانوں کا',
      hinglish: 'Saare jahanon (worlds) ka',
      ar: 'جميع المخلوقات والعوالم',
    },
    grammarHint: 'Sound Masculine Plural Noun',
  },
  ملك: {
    transliteration: 'Maliki',
    meanings: {
      en: 'Sovereign Master / King',
      hi: 'मालिक और बादशाह',
      ur: 'مالک اور بادشاہ',
      hinglish: 'Maalik aur Badshah',
      ar: 'المتصرف المطلق وصاحب الملك',
    },
    grammarHint: 'Active Participle / Noun',
  },
  يوم: {
    transliteration: 'Yawmi',
    meanings: {
      en: 'Of the Day',
      hi: 'उस दिन का',
      ur: 'اس دن کا',
      hinglish: 'Us din (Day) ka',
      ar: 'وقت وزمان',
    },
    grammarHint: 'Noun of Time',
  },
  الدين: {
    transliteration: 'Ad-Deen',
    meanings: {
      en: 'Of Judgment & Recompense (or Faith)',
      hi: 'बदले और इंसाफ़ (या दीन)',
      ur: 'بدلے اور جزا (یا دین)',
      hinglish: 'Hisab aur Badle (Judgement) ke',
      ar: 'الجزاء والحساب',
    },
    grammarHint: 'Definite Noun',
  },
  اياك: {
    transliteration: 'Iyyaka',
    meanings: {
      en: 'You Alone',
      hi: 'तुझ ही को (सिर्फ़ तेरी)',
      ur: 'تجھ ہی کو (صرف تیری)',
      hinglish: 'Sirf Tujh hi ko (You alone)',
      ar: 'نخصك وحدك',
    },
    grammarHint: 'Detached Object Pronoun (for exclusivity)',
  },
  نعبد: {
    transliteration: "Na'budu",
    meanings: {
      en: 'We worship',
      hi: 'हम इबादत करते हैं',
      ur: 'ہم عبادت کرتے ہیں',
      hinglish: 'Hum ibadat karte hain',
      ar: 'نطيع ونخضع بغاية المحبة',
    },
    grammarHint: 'Present Tense Verb (1st Person Plural)',
  },
  واياك: {
    transliteration: 'Wa-iyyaka',
    meanings: {
      en: 'And You Alone',
      hi: 'और तुझ ही से',
      ur: 'اور تجھ ہی سے',
      hinglish: 'Aur sirf Tujh hi se',
      ar: 'وبك وحدك',
    },
    grammarHint: 'Conjunction (وَ) + Pronoun',
  },
  نستعين: {
    transliteration: "Nasta'een",
    meanings: {
      en: 'We ask for help',
      hi: 'हम मदद मांगते हैं',
      ur: 'ہم مدد مانگتے ہیں',
      hinglish: 'Hum madad maangte hain',
      ar: 'نطلب المعونة والتوفيق',
    },
    grammarHint: 'Present Tense Verb (Form X - Seeking)',
  },
  اهدنا: {
    transliteration: 'Ihdina',
    meanings: {
      en: 'Guide us',
      hi: 'हमें हिदायत दे (रास्ता दिखा)',
      ur: 'ہمیں ہدایت دے (راستہ دکھا)',
      hinglish: 'Humein seedha raasta dikha (Guide us)',
      ar: 'دلّنا وأرشدنا وثبتنا',
    },
    grammarHint: 'Imperative/Supplication Verb + Pronoun (نا)',
  },
  الصرط: {
    transliteration: 'As-Sirata',
    meanings: {
      en: 'The Path / Way',
      hi: 'रास्ता',
      ur: 'راستہ',
      hinglish: 'Raasta (Path)',
      ar: 'الطريق الواضح',
    },
    grammarHint: 'Definite Noun',
  },
  المستقيم: {
    transliteration: 'Al-Mustaqeem',
    meanings: {
      en: 'The Straight & Upright',
      hi: 'सीधा और सच्चा',
      ur: 'سیدھا اور سچا',
      hinglish: 'Seedha aur sacha (Straight)',
      ar: 'المعتدل الذي لا اعوجاج فيه',
    },
    grammarHint: 'Adjective (Active Participle)',
  },
  صرط: {
    transliteration: 'Sirata',
    meanings: {
      en: 'The Path of',
      hi: 'रास्ता (उनका)',
      ur: 'راستہ (ان کا)',
      hinglish: 'Raasta un logon ka',
      ar: 'طريق ومنهج',
    },
    grammarHint: 'Noun in Apposition (Badal)',
  },
  الذين: {
    transliteration: 'Alladheena',
    meanings: {
      en: 'Those who',
      hi: 'वो लोग जिन',
      ur: 'وہ لوگ جن',
      hinglish: 'Woh log jin',
      ar: 'اسم موصول للجمع',
    },
    grammarHint: 'Relative Pronoun (Plural)',
  },
  انعمت: {
    transliteration: "An'amta",
    meanings: {
      en: 'You have bestowed favor / grace',
      hi: 'तूने इनाम और नेमत अता की',
      ur: 'تو نے انعام فرمایا',
      hinglish: 'Tu ne in’aam aur barkat ata ki',
      ar: 'مننتَ عليهم بالهدى والتوفيق',
    },
    grammarHint: 'Past Tense Verb (2nd Person Singular)',
  },
  عليهم: {
    transliteration: "'Alayhim",
    meanings: {
      en: 'Upon them',
      hi: 'उन पर',
      ur: 'ان پر',
      hinglish: 'Un par (Upon them)',
      ar: 'عليهم',
    },
    grammarHint: 'Preposition (عَلَى) + Pronoun (هُمْ)',
  },
  غير: {
    transliteration: 'Ghayri',
    meanings: {
      en: 'Not of / Other than',
      hi: 'न कि (उनके सिवा)',
      ur: 'نہ کہ (ان کے سوا)',
      hinglish: 'Na ki unke',
      ar: 'سوى / ليس',
    },
    grammarHint: 'Noun of Negation/Exclusion',
  },
  المغضوب: {
    transliteration: 'Al-Maghdoobi',
    meanings: {
      en: 'Those who earned anger/wrath',
      hi: 'जिन पर ग़ज़ब (नाराज़गी) हुआ',
      ur: 'جن پر غضب ہوا',
      hinglish: 'Jin par naraazgi hui',
      ar: 'من عرفوا الحق وتركوه',
    },
    grammarHint: 'Passive Participle (مَفْعُول)',
  },
  ولا: {
    transliteration: 'Wa-la',
    meanings: {
      en: 'And not / Nor',
      hi: 'और न ही',
      ur: 'اور نہ ہی',
      hinglish: 'Aur na hi',
      ar: 'وليس أيضاً',
    },
    grammarHint: 'Conjunction + Negative Particle',
  },
  الضالين: {
    transliteration: 'Ad-Daalleen',
    meanings: {
      en: 'Those who went astray',
      hi: 'जो भटक गए (गुमराह हुए)',
      ur: 'جو بھٹک گئے (گمراہ ہوئے)',
      hinglish: 'Jo raaste se bhatak gaye',
      ar: 'التائهين عن طريق الحق',
    },
    grammarHint: 'Active Participle Plural (Madd Lazim 6 counts)',
  },
  قل: {
    transliteration: 'Qul',
    meanings: {
      en: 'Say / Declare (O Prophet)',
      hi: 'कह दीजिए (ऐ नबी ﷺ)',
      ur: 'کہہ دیجیے (اے نبی ﷺ)',
      hinglish: 'Keh dijiye (Say!)',
      ar: 'قُلْ بلسانك موقناً بقلبك',
    },
    grammarHint: 'Imperative Verb (أمر)',
  },
  هو: {
    transliteration: 'Huwa',
    meanings: {
      en: 'He is',
      hi: 'वह (अल्लाह) है',
      ur: 'وہ (اللّٰہ) ہے',
      hinglish: 'Woh (Allah) hai',
      ar: 'ضمير الشأن لله تعالى',
    },
    grammarHint: '3rd Person Singular Pronoun',
  },
  احد: {
    transliteration: 'Ahad',
    meanings: {
      en: 'One and Unique (Indivisible)',
      hi: 'एक और बेमिसाल (अकेला)',
      ur: 'ایک اور بے مثال (یکتا)',
      hinglish: 'Ek aur Bemisaal (Unique One)',
      ar: 'الواحد الأحد الذي لا نظير له',
    },
    grammarHint: 'Attribute of Absolute Oneness',
  },
  الصمد: {
    transliteration: 'As-Samad',
    meanings: {
      en: 'The Eternal Refuge (Self-Sufficient Master needed by all)',
      hi: 'बेनियाज़ मालिक (जिसके सब मोहताज हैं और वह किसी का मोहताज नहीं)',
      ur: 'بے نیاز آقا (جس کے سب محتاج ہیں)',
      hinglish: 'Be-niyaz Maalik (Jiski sabko zaroorat hai)',
      ar: 'السيد المقصود في جميع الحوائج المستغني عن كل أحد',
    },
    grammarHint: 'Definite Divine Attribute',
  },
  لم: {
    transliteration: 'Lam',
    meanings: {
      en: 'Did not / Never',
      hi: 'नहीं (कभी नहीं)',
      ur: 'نہیں (کبھی نہیں)',
      hinglish: 'Kabhi nahi',
      ar: 'حرف نفي وجزم وقلب',
    },
    grammarHint: 'Negative Particle (Jazim)',
  },
  يلد: {
    transliteration: 'Yalid',
    meanings: {
      en: 'He begets / gives birth',
      hi: 'उसने किसी को जना (औलाद)',
      ur: 'اس نے کسی کو جنا',
      hinglish: 'Usne kisi ko paida kiya (as child)',
      ar: 'لم يخرج منه ولد',
    },
    grammarHint: 'Jussive Verb (Majzoom)',
  },
  ولم: {
    transliteration: 'Wa-lam',
    meanings: {
      en: 'And never',
      hi: 'और न ही',
      ur: 'اور نہ ہی',
      hinglish: 'Aur na hi kabhi',
      ar: 'وحرف عطف ونفي',
    },
    grammarHint: 'Conjunction + Negative Particle',
  },
  يولد: {
    transliteration: 'Yoolad',
    meanings: {
      en: 'Was He begotten / born',
      hi: 'वह किसी से पैदा हुआ',
      ur: 'وہ کسی سے پیدا ہوا',
      hinglish: 'Woh kisi se paida hua',
      ar: 'لم يولد من أب أو أم',
    },
    grammarHint: 'Passive Jussive Verb',
  },
  يكن: {
    transliteration: 'Yakun',
    meanings: {
      en: 'Is / Has ever been',
      hi: 'है / हुआ',
      ur: 'ہے / ہوا',
      hinglish: 'Hai / raha hai',
      ar: 'فعل مضارع مجزوم',
    },
    grammarHint: 'Jussive Verb (from كان)',
  },
  له: {
    transliteration: 'Lahu',
    meanings: {
      en: 'Unto Him / For Him',
      hi: 'उसके लिए',
      ur: 'اس کے لیے',
      hinglish: 'Uske barabar / liye',
      ar: 'لله تعالى',
    },
    grammarHint: 'Preposition + Pronoun',
  },
  كفوا: {
    transliteration: 'Kufuwan',
    meanings: {
      en: 'Comparable / Equivalent',
      hi: 'बराबर या हमसर (मुक़ाबले का)',
      ur: 'برابر یا ہمسر',
      hinglish: 'Barabar ya hamsar (Equal)',
      ar: 'مكافئاً أو مماثلاً أو شبيهاً',
    },
    grammarHint: 'Predicate Noun',
  },
  اعوذ: {
    transliteration: "A'oodhu",
    meanings: {
      en: 'I seek refuge and protection',
      hi: 'मैं पनाह मांगता हूँ',
      ur: 'میں پناہ مانگتا ہوں',
      hinglish: 'Main panaah (protection) maangta hoon',
      ar: 'ألتجئ وأعتصم وأتحصن',
    },
    grammarHint: 'Present Tense Verb (1st Person Singular)',
  },
  برب: {
    transliteration: 'Bi-Rabbi',
    meanings: {
      en: 'In the Lord of',
      hi: 'रब (मालिक) की पनाह में',
      ur: 'رب (مالک) کی پناہ میں',
      hinglish: 'Rabb (Maalik) ki',
      ar: 'بخالق ومالك',
    },
    grammarHint: 'Preposition (بِ) + Noun (رَبّ)',
  },
  الفلق: {
    transliteration: 'Al-Falaq',
    meanings: {
      en: 'The Daybreak / Dawn',
      hi: 'सुबह की पौ (सवेरा)',
      ur: 'صبح کی روشنی',
      hinglish: 'Subah ki roshni (Dawn)',
      ar: 'الصبح الذي ينفلق عن الليل',
    },
    grammarHint: 'Definite Noun (with Qalqalah on stopping)',
  },
  الناس: {
    transliteration: 'An-Naas',
    meanings: {
      en: 'Mankind / Humanity',
      hi: 'इंसानों (लोगों)',
      ur: 'انسانوں (لوگوں)',
      hinglish: 'Insanon (Mankind)',
      ar: 'البشر جميعاً',
    },
    grammarHint: 'Definite Collective Noun (with Ghunnah on نّ)',
  },
  من: {
    transliteration: 'Min',
    meanings: {
      en: 'From / Of',
      hi: 'से',
      ur: 'سے',
      hinglish: 'Se (From)',
      ar: 'حرف جر لابتداء الغاية',
    },
    grammarHint: 'Preposition (Harf Jarr)',
  },
  شر: {
    transliteration: 'Sharri',
    meanings: {
      en: 'The evil / harm of',
      hi: 'बुराई और नुकसान से',
      ur: 'شر اور برائی سے',
      hinglish: 'Buraayi aur nuqsan se',
      ar: 'أذى وسوء وفساد',
    },
    grammarHint: 'Noun',
  },
  ما: {
    transliteration: 'Maa',
    meanings: {
      en: 'What / That which',
      hi: 'जो कुछ',
      ur: 'جو کچھ',
      hinglish: 'Jo kuch',
      ar: 'اسم موصول بمعنى الذي',
    },
    grammarHint: 'Relative Particle',
  },
  خلق: {
    transliteration: 'Khalaq',
    meanings: {
      en: 'He created',
      hi: 'उसने पैदा किया',
      ur: 'اس نے پیدا کیا',
      hinglish: 'Usne paida kiya (Created)',
      ar: 'أوجد وأبدع من العدم',
    },
    grammarHint: 'Past Tense Verb',
  },
  في: {
    transliteration: 'Fee',
    meanings: {
      en: 'In / Within',
      hi: 'में',
      ur: 'میں',
      hinglish: 'Mein (In)',
      ar: 'حرف جر للظرفية',
    },
    grammarHint: 'Preposition',
  },
  على: {
    transliteration: "'Alaa",
    meanings: {
      en: 'Upon / Over',
      hi: 'पर / के ऊपर',
      ur: 'پر / کے اوپر',
      hinglish: 'Par (Upon)',
      ar: 'حرف جر للاستعلاء',
    },
    grammarHint: 'Preposition',
  },
  ان: {
    transliteration: 'Inna',
    meanings: {
      en: 'Indeed / Verily',
      hi: 'बेशक / निश्चय ही',
      ur: 'بے شک / یقیناً',
      hinglish: 'Beshak (Indeed)',
      ar: 'حرف توكيد ونصب',
    },
    grammarHint: 'Particle of Emphasis (Harf Tawkeed)',
  },
  اعطيناك: {
    transliteration: "A'taynaaka",
    meanings: {
      en: 'We have granted you',
      hi: 'हमने आपको अता किया',
      ur: 'ہم نے آپ کو عطا کیا',
      hinglish: 'Humne aapko ata kiya',
      ar: 'وهبناك ومنحناك',
    },
    grammarHint: 'Past Tense Verb + Subject (نا) + Object (كَ)',
  },
  الكوثر: {
    transliteration: 'Al-Kawthar',
    meanings: {
      en: 'Abundant Good & The River of Al-Kawthar in Paradise',
      hi: 'ढेर सारी भलाई और जन्नत की हौज़-ए-कौसर',
      ur: 'خیرِ کثیر اور جنت کا حوضِ کوثر',
      hinglish: 'Beshumaar khair aur Jannat ka Hauz-e-Kawthar',
      ar: 'الخير الكثير ونهر الكوثر في الجنة',
    },
    grammarHint: 'Definite Noun',
  },
  فصل: {
    transliteration: 'Fa-salli',
    meanings: {
      en: 'So pray / establish Salah',
      hi: 'तो नमाज़ पढ़िए',
      ur: 'پس نماز پڑھیے',
      hinglish: 'Toh Namaz padhiye',
      ar: 'أخلص صلاتك المفروضة والنافلة',
    },
    grammarHint: 'Conjunction (فَ) + Imperative Verb',
  },
  لربك: {
    transliteration: 'Li-Rabbika',
    meanings: {
      en: 'To your Lord alone',
      hi: 'अपने रब के लिए',
      ur: 'اپنے رب کے لیے',
      hinglish: 'Apne Rabb ke liye',
      ar: 'لمولاك وخالقك وحده',
    },
    grammarHint: 'Preposition + Noun + Pronoun',
  },
  وانحر: {
    transliteration: 'Wanhar',
    meanings: {
      en: 'And sacrifice (for His sake)',
      hi: 'और क़ुर्बानी कीजिए',
      ur: 'اور قربانی کیجیے',
      hinglish: 'Aur qurbani kijiye',
      ar: 'واذبح نسكك على اسمه وحده',
    },
    grammarHint: 'Conjunction + Imperative Verb',
  },
  والعصر: {
    transliteration: "Wal-'Asr",
    meanings: {
      en: 'By Time (through the ages)',
      hi: 'ज़माने (वक्त) की क़सम',
      ur: 'زمانے (وقت) کی قسم',
      hinglish: 'Waqt (Time) ki qasam',
      ar: 'أقسم الله بالدهر والزمان',
    },
    grammarHint: 'Oath Particle (وَ) + Definite Noun',
  },
  الانسن: {
    transliteration: 'Al-Insaana',
    meanings: {
      en: 'Mankind / The human being',
      hi: 'इंसान',
      ur: 'انسان',
      hinglish: 'Insaan (Human being)',
      ar: 'جنس الإنسان',
    },
    grammarHint: 'Definite Noun',
  },
  الانسان: {
    transliteration: 'Al-Insaana',
    meanings: {
      en: 'Mankind / The human being',
      hi: 'इंसान',
      ur: 'انسان',
      hinglish: 'Insaan (Human being)',
      ar: 'جنس الإنسان',
    },
    grammarHint: 'Definite Noun',
  },
  لفي: {
    transliteration: 'La-fee',
    meanings: {
      en: 'Is surely in',
      hi: 'यक़ीनन में है',
      ur: 'یقیناً میں ہے',
      hinglish: 'Yaqeenan mein hai',
      ar: 'اللام للتوكيد وفي للظرفية',
    },
    grammarHint: 'Emphatic Lam + Preposition',
  },
  خسر: {
    transliteration: 'Khusr',
    meanings: {
      en: 'Loss and ruin',
      hi: 'घाटे और नुक़सान में',
      ur: 'خسارے اور نقصان میں',
      hinglish: 'Khasare aur nuqsan (Loss) mein',
      ar: 'نقصان وهلاك وغبن',
    },
    grammarHint: 'Indefinite Noun for Emphasis',
  },
  الا: {
    transliteration: 'Illaa',
    meanings: {
      en: 'Except / Save for',
      hi: 'सिवाय (मगर)',
      ur: 'سوائے (مگر)',
      hinglish: 'Siwaye (Except)',
      ar: 'أداة استثناء',
    },
    grammarHint: 'Particle of Exception',
  },
  ءامنوا: {
    transliteration: 'Aamanoo',
    meanings: {
      en: 'Believed with true faith',
      hi: 'ईमान लाए',
      ur: 'ایمان لائے',
      hinglish: 'Emaan laaye (Believed)',
      ar: 'صدقوا بالله ورسوله',
    },
    grammarHint: 'Past Tense Verb (3rd Person Plural)',
  },
  وعملوا: {
    transliteration: "Wa-'amiloo",
    meanings: {
      en: 'And did / performed',
      hi: 'और उन्होंने अमल किए',
      ur: 'اور انہوں نے عمل کیے',
      hinglish: 'Aur unhone amal kiye',
      ar: 'وفعلوا وأدّوا',
    },
    grammarHint: 'Conjunction + Past Tense Verb',
  },
  الصلحت: {
    transliteration: 'As-Saalihaat',
    meanings: {
      en: 'Righteous good deeds',
      hi: 'नेक और भले काम',
      ur: 'نیک اور صالح اعمال',
      hinglish: 'Nek aur acche aamaal (Good deeds)',
      ar: 'الأعمال الصالحة المرضية لله',
    },
    grammarHint: 'Sound Feminine Plural Noun',
  },
  وتواصوا: {
    transliteration: 'Wa-tawaasaw',
    meanings: {
      en: 'And advised/encouraged one another',
      hi: 'और एक-दूसरे को नसीहत की',
      ur: 'اور ایک دوسرے کو نصیحت کی',
      hinglish: 'Aur ek doosre ko naseehat/encourage kiya',
      ar: 'أوصى بعضهم بعضاً',
    },
    grammarHint: 'Reciprocal Past Verb (Form VI)',
  },
  بالحق: {
    transliteration: 'Bil-Haqqi',
    meanings: {
      en: 'To the Truth',
      hi: 'हक़ और सच्चाई की',
      ur: 'حق اور سچائی کی',
      hinglish: 'Haq aur sachaayi (Truth) ki',
      ar: 'بالثبات على الإيمان والخير',
    },
    grammarHint: 'Preposition + Definite Noun',
  },
  بالصبر: {
    transliteration: 'Bis-Sabr',
    meanings: {
      en: 'To Patience & Perseverance',
      hi: 'सब्र और हौसले की',
      ur: 'صبر اور استقامت کی',
      hinglish: 'Sabr aur himmat (Patience) ki',
      ar: 'بالصبر على الطاعة وعن المعصية وعلى الأقدار',
    },
    grammarHint: 'Preposition + Definite Noun',
  },
};

// Build a normalized lookup index from TOP_QURAN_VOCAB as well so all 315 high-frequency words are indexed
const VOCAB_LOOKUP_INDEX: Map<
  string,
  {
    transliteration: string;
    meanings: LocalizedText;
    grammarHint: string;
  }
> = new Map();

for (const item of TOP_QURAN_VOCAB) {
  const key = normalizeArabicWordForLookup(item.arabic);
  if (key && !VOCAB_LOOKUP_INDEX.has(key)) {
    VOCAB_LOOKUP_INDEX.set(key, {
      transliteration: item.transliteration,
      meanings: {
        en: item.meaning,
        ...(item.localizedMeanings || {}),
      },
      grammarHint: `Quranic Vocabulary (${item.category || 'Core'} · ${item.occurrencesInQuran}+ occurrences · Root: ${item.rootLetters})`,
    });
  }
}

// [text_uthmani, transliteration, english_meaning, relative_wbw_audio_url]
export type WbwWordTuple = [string, string, string, string];
export type SurahWbwDictionary = Record<number, WbwWordTuple[]>;

const WBW_CACHE_NAME = 'ilmizo-wbw-dictionary-v1';
const surahWbwMemoryCache = new Map<number, SurahWbwDictionary>();
let coreWbwBundlePromise: Promise<Record<string, SurahWbwDictionary> | null> | null = null;

async function loadCoreWbwBundle(): Promise<Record<string, SurahWbwDictionary> | null> {
  if (typeof window === 'undefined' || typeof fetch !== 'function') return null;
  if (!coreWbwBundlePromise) {
    coreWbwBundlePromise = (async () => {
      try {
        const resp = await fetch('/data/quran-wbw-core.json');
        if (!resp.ok) return null;
        return (await resp.json()) as Record<string, SurahWbwDictionary>;
      } catch {
        return null;
      }
    })();
  }
  const bundle = await coreWbwBundlePromise;
  if (!bundle) coreWbwBundlePromise = null;
  return bundle;
}

export function resolveWbwWordAudioUrl(relativeAudioUrl?: string): string | undefined {
  if (!relativeAudioUrl) return undefined;
  if (relativeAudioUrl.startsWith('http://') || relativeAudioUrl.startsWith('https://')) {
    return relativeAudioUrl;
  }
  const cleaned = relativeAudioUrl.replace(/^\/+/, '');
  return `https://audio.qurancdn.com/${cleaned}`;
}

/**
 * Loads exact Word-by-Word meanings, transliteration & human word audio URLs for any Surah (1..114).
 * Resolution order:
 * 1. In-memory cache
 * 2. Bundled offline core WBW pack (/data/quran-wbw-core.json — Fatiha, Ya-Sin, Al-Mulk, all Juz Amma)
 * 3. Persistent CacheStorage ('ilmizo-wbw-dictionary-v1')
 * 4. Live Quran.com v4 API (words=true), cached into CacheStorage for future offline use
 */
export async function fetchAndCacheSurahWbw(
  surahNumber: number
): Promise<SurahWbwDictionary | null> {
  if (surahWbwMemoryCache.has(surahNumber)) {
    return surahWbwMemoryCache.get(surahNumber) || null;
  }

  const coreBundle = await loadCoreWbwBundle();
  if (coreBundle && coreBundle[String(surahNumber)]) {
    const parsed = coreBundle[String(surahNumber)];
    surahWbwMemoryCache.set(surahNumber, parsed);
    return parsed;
  }

  const cacheKey = `/__ilmizo_wbw_surah_${surahNumber}.json`;
  if (typeof caches !== 'undefined') {
    try {
      const cache = await caches.open(WBW_CACHE_NAME);
      const cachedResp = await cache.match(cacheKey);
      if (cachedResp) {
        const parsed = (await cachedResp.json()) as SurahWbwDictionary;
        surahWbwMemoryCache.set(surahNumber, parsed);
        return parsed;
      }
    } catch {
      // ignore CacheStorage read errors
    }
  }

  if (typeof navigator !== 'undefined' && navigator.onLine && typeof fetch === 'function') {
    try {
      let page = 1;
      const verses: SurahWbwDictionary = {};
      while (true) {
        const url = `https://api.quran.com/api/v4/verses/by_chapter/${surahNumber}?words=true&per_page=50&page=${page}&word_fields=text_uthmani,transliteration,translation`;
        const resp = await fetch(url);
        if (!resp.ok) break;
        const json = await resp.json();
        for (const v of json.verses || []) {
          const ayahNum = Number(String(v.verse_key).split(':')[1]);
          if (!ayahNum) continue;
          verses[ayahNum] = (v.words || [])
            .filter((w: any) => w.char_type_name === 'word')
            .map((w: any) => [
              w.text_uthmani || w.text || '',
              w.transliteration?.text || '',
              w.translation?.text || '',
              w.audio_url || '',
            ]);
        }
        if (!json.pagination?.next_page) break;
        page = json.pagination.next_page;
      }

      if (Object.keys(verses).length > 0) {
        surahWbwMemoryCache.set(surahNumber, verses);
        if (typeof caches !== 'undefined' && typeof Response !== 'undefined') {
          try {
            const cache = await caches.open(WBW_CACHE_NAME);
            await cache.put(
              cacheKey,
              new Response(JSON.stringify(verses), {
                headers: { 'Content-Type': 'application/json' },
              })
            );
          } catch {
            // ignore CacheStorage write error
          }
        }
        return verses;
      }
    } catch {
      // network error, return null honestly
    }
  }

  return null;
}

/**
 * Resolves meaning, transliteration, letter-cluster Tajweed, and optional WBW audio
 * for a single Arabic word inside an Ayah.
 * Zero guesswork / translation slicing: returns explicit `isExactDictionaryMatch: false`
 * if neither WBW data nor verified dictionary has the word.
 */
export function resolveArabicWordTooltip(params: {
  arabicWord: string;
  wordIndex: number;
  totalWords: number;
  ayahTransliteration?: string;
  ayahTranslations?: LocalizedText;
  wbwWord?: WbwWordTuple;
  precomputedSegments?: TajweedSegment[];
}): QuranWordAnalysis {
  const {
    arabicWord,
    wordIndex,
    totalWords,
    ayahTransliteration,
    wbwWord,
    precomputedSegments,
  } = params;
  const normalizedKey = normalizeArabicWordForLookup(arabicWord);
  const segments = precomputedSegments || segmentArabicWordsWithTajweed([arabicWord])[0] || [];

  const priorityOrder: TajweedRuleId[] = [
    'ghunnah',
    'qalqalah',
    'madd',
    'idgham_ikhfa',
    'tafkheem_allah',
  ];
  let tajweedRule = TAJWEED_RULES_META.normal;
  for (const rId of priorityOrder) {
    if (segments.some((s) => s.ruleId === rId)) {
      tajweedRule = TAJWEED_RULES_META[rId];
      break;
    }
  }

  const candidates = [
    normalizedKey,
    normalizedKey.replace(/^[وفبل]/, ''),
    normalizedKey.replace(/^ال/, ''),
    normalizedKey.replace(/^[وف]ال/, 'ال'),
  ];

  let dictHit:
    | {
        transliteration: string;
        meanings: LocalizedText;
        grammarHint: string;
      }
    | undefined;

  for (const key of candidates) {
    if (CURATED_WORD_DICTIONARY[key]) {
      dictHit = CURATED_WORD_DICTIONARY[key];
      break;
    }
    const vocabHit = VOCAB_LOOKUP_INDEX.get(key);
    if (vocabHit) {
      dictHit = vocabHit;
      break;
    }
  }

  const wbwTranslit = wbwWord?.[1]?.trim();
  const wbwMeaningEn = wbwWord?.[2]?.trim();
  const wordAudioUrl = resolveWbwWordAudioUrl(wbwWord?.[3]);

  // 1. If we have exact Quran.com v4 WBW entry (all 6,236 Ayahs!), combine with localized dictionary if present
  if (wbwWord && wbwMeaningEn) {
    return {
      index: wordIndex,
      arabicWord,
      normalizedKey,
      transliteration: wbwTranslit || dictHit?.transliteration || arabicWord,
      meanings: {
        en: wbwMeaningEn,
        hi: dictHit?.meanings.hi || wbwMeaningEn,
        ur: dictHit?.meanings.ur || wbwMeaningEn,
        hinglish: dictHit?.meanings.hinglish || wbwMeaningEn,
        ar: arabicWord,
      },
      tajweedRule,
      segments,
      grammarHint:
        dictHit?.grammarHint ||
        `Verified Quran Word-by-Word Corpus (Word ${wordIndex + 1} of ${totalWords})`,
      wordAudioUrl,
      isExactDictionaryMatch: true,
    };
  }

  // 2. Verified static Curated / 315-word Quran Vocabulary match
  if (dictHit) {
    return {
      index: wordIndex,
      arabicWord,
      normalizedKey,
      transliteration: dictHit.transliteration,
      meanings: dictHit.meanings,
      tajweedRule,
      segments,
      grammarHint: dictHit.grammarHint,
      wordAudioUrl,
      isExactDictionaryMatch: true,
    };
  }

  // 3. Honest fallback when offline and Surah WBW not yet cached (no translation slicing!)
  const translitTokens = (ayahTransliteration || '')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
  const alignedTranslit =
    translitTokens[wordIndex] ||
    (translitTokens.length > 0 && !ayahTransliteration?.startsWith('Surah ')
      ? translitTokens[Math.min(translitTokens.length - 1, Math.floor((wordIndex / Math.max(1, totalWords)) * translitTokens.length))]
      : '') ||
    arabicWord;

  return {
    index: wordIndex,
    arabicWord,
    normalizedKey,
    transliteration: alignedTranslit,
    meanings: {
      en: 'Connect once to load exact Word-by-Word meaning for this word.',
      hi: 'इस लफ़्ज़ का सटीक शब्द-दर-शब्द मतलब लोड करने के लिए एक बार इंटरनेट से जुड़ें।',
      ur: 'اس لفظ کا درست لفظ بہ لفظ ترجمہ لوڈ کرنے کے لیے ایک بار انٹرنیٹ سے منسلک ہوں۔',
      hinglish: 'Is lafz ka exact word-by-word meaning load karne ke liye ek baar online connect karein.',
      ar: arabicWord,
    },
    tajweedRule,
    segments,
    grammarHint: `Uthmani Word ${wordIndex + 1} of ${totalWords} (Tap when online once to cache full Surah WBW dictionary)`,
    wordAudioUrl,
    isExactDictionaryMatch: false,
  };
}

/**
 * Tokenizes a complete Arabic Uthmani Ayah into interactive word tokens with
 * letter-cluster Tajweed segments, cross-word rules, and authentic WBW meanings.
 */
export function tokenizeAyahWithTajweedAndMeanings(params: {
  arabicUthmani: string;
  transliteration?: string;
  translations?: LocalizedText;
  wbwAyahWords?: WbwWordTuple[];
}): QuranWordAnalysis[] {
  const { wbwAyahWords } = params;
  const rawTokens = params.arabicUthmani
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0 && !/^[\u06DD\u06D6-\u06DC\u06DF-\u06E4\d٠-٩]+$/u.test(w));

  const wordsForRendering =
    wbwAyahWords && wbwAyahWords.length > 0
      ? wbwAyahWords.map((tuple, idx) => tuple[0] || rawTokens[idx] || '').filter(Boolean)
      : rawTokens;

  const segmentedPerWord = segmentArabicWordsWithTajweed(wordsForRendering);

  return wordsForRendering.map((word, idx) =>
    resolveArabicWordTooltip({
      arabicWord: word,
      wordIndex: idx,
      totalWords: wordsForRendering.length,
      ayahTransliteration: params.transliteration,
      ayahTranslations: params.translations,
      wbwWord: wbwAyahWords?.[idx],
      precomputedSegments: segmentedPerWord[idx],
    })
  );
}

/**
 * Helper to resolve localized word meaning for the active user language.
 */
export function getLocalizedWordMeaning(
  analysis: QuranWordAnalysis,
  language: LanguageCode
): string {
  return analysis.meanings[language] || analysis.meanings.en;
}
