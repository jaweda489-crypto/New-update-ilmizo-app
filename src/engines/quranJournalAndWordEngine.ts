import {
  LanguageCode,
  PersonalNote,
  QuranBookmark,
  RevisionItem,
} from '../types/ilmizo';

export interface TadabburPromptOption {
  id: string;
  prompt: string;
  localizedPrompts: Partial<Record<LanguageCode, string>> & { en: string };
}

export const TADABBUR_DISCLAIMER: Record<'en' | 'hi' | 'ur' | 'hinglish' | 'ar', string> = {
  en: 'Personal Tadabbur reflection is for self-accountability and spiritual contemplation; it is not scholarly Tafsir.',
  hi: 'व्यक्तिगत तदब्बुर (चिंतन) आत्म-सुधार के लिए है; यह आलिमों की आधिकारिक तफ़्सीर नहीं है।',
  ur: 'ذاتی تدبر اور غور و فکر اپنی اصلاح کے لیے ہے؛ یہ مستند علمی تفسیر کا متبادل نہیں ہے۔',
  hinglish: 'Personal Tadabbur reflection apni islah ke liye hai; yeh scholarly Tafsir nahi hai.',
  ar: 'التدبر الشخصي هو للتأمل ومحاسبة النفس، وليس تفسيراً علمياً معتمداً للآية.',
};

export const TADABBUR_REFLECTION_PROMPTS: TadabburPromptOption[] = [
  {
    id: 'tadabbur_learn',
    prompt: 'What did I learn from this Ayah?',
    localizedPrompts: {
      en: 'What did I learn from this Ayah?',
      hi: 'इस आयत से मैंने क्या सीखा?',
      ur: 'اس آیت سے میں نے کیا سیکھا؟',
      hinglish: 'Is Ayah se maine kya seekha?',
      ar: 'ماذا تعلمت من هذه الآية؟',
    },
  },
  {
    id: 'tadabbur_improve',
    prompt: 'What should I improve in my character or worship?',
    localizedPrompts: {
      en: 'What should I improve in my character or worship?',
      hi: 'मुझे अपने अख़लाक़ या इबादत में क्या सुधारना चाहिए?',
      ur: 'مجھے اپنے اخلاق یا عبادت میں کیا بہتری لانی چاہیے؟',
      hinglish: 'Mujhe apne akhlaq ya ibadat mein kya behtar karna chahiye?',
      ar: 'ما الذي ينبغي أن أحسّنه في خُلقي أو عبادتي؟',
    },
  },
  {
    id: 'tadabbur_apply',
    prompt: 'How can I apply this Ayah today?',
    localizedPrompts: {
      en: 'How can I apply this Ayah today?',
      hi: 'मैं आज इस आयत पर कैसे अमल कर सकता/सकती हूँ?',
      ur: 'میں آج اس آیت پر کیسے عمل کر سکتا/سکتی ہوں؟',
      hinglish: 'Main aaj is Ayah par kaise amal kar sakta hoon?',
      ar: 'كيف يمكنني تطبيق هذه الآية في يومي؟',
    },
  },
  {
    id: 'tadabbur_explore',
    prompt: 'What question do I want to explore in verified Tafsir?',
    localizedPrompts: {
      en: 'What question do I want to explore in verified Tafsir?',
      hi: 'मैं प्रामाणिक तफ़्सीर में कौन-सा सवाल और गहराई से समझना चाहता/चाहती हूँ?',
      ur: 'میں مستند تفسیر میں کون سا نکتہ مزید تلاش کرنا چاہتا/چاہتی ہوں؟',
      hinglish: 'Main verified Tafsir mein kaun sa sawal aur samajhna chahta hoon?',
      ar: 'ما السؤال الذي أودّ البحث عنه في كتب التفسير المعتمدة؟',
    },
  },
];

export type JournalEntryKind = 'bookmark' | 'note' | 'tadabbur' | 'hifz_note';

export interface UnifiedQuranJournalEntry {
  id: string;
  kind: JournalEntryKind;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  referenceLabel: string;
  title: string;
  body: string;
  arabicSnippet?: string;
  tags: string[];
  folder?: string;
  readingList?: string;
  tadabburPrompt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuranJournalQueryOptions {
  kindFilter?: 'all' | JournalEntryKind;
  surahFilter?: number | null;
  tagFilter?: string | null;
  folderFilter?: string | null;
  searchQuery?: string;
  dateFrom?: string;
  dateTo?: string;
  sortOrder?: 'newest' | 'oldest' | 'surah_asc' | 'surah_desc';
}

export function buildUnifiedQuranJournalEntries(params: {
  bookmarks: QuranBookmark[];
  personalNotes: PersonalNote[];
  revisionItems?: RevisionItem[];
}): UnifiedQuranJournalEntry[] {
  const entries: UnifiedQuranJournalEntry[] = [];

  for (const bm of params.bookmarks || []) {
    entries.push({
      id: `bm_${bm.id}`,
      kind: 'bookmark',
      surahNumber: bm.surahNumber,
      surahName: bm.surahName,
      ayahNumber: bm.ayahNumber,
      referenceLabel: `${bm.surahName} (${bm.surahNumber}:${bm.ayahNumber})`,
      title: bm.customLabel || `Bookmark · ${bm.surahName} ${bm.surahNumber}:${bm.ayahNumber}`,
      body: bm.note || '',
      arabicSnippet: bm.arabicSnippet,
      tags: bm.folder ? [bm.folder] : [],
      folder: bm.folder || 'General Bookmarks',
      readingList: bm.readingList,
      createdAt: bm.createdAt,
      updatedAt: bm.updatedAt || bm.createdAt,
    });
  }

  for (const note of params.personalNotes || []) {
    const sNum = note.surahNumber || 1;
    const aNum = note.ayahNumber || 1;
    const isTadabbur = Boolean(note.tadabburPrompt) || note.noteType === 'tadabbur';
    const kind: JournalEntryKind =
      note.noteType === 'hifz_note'
        ? 'hifz_note'
        : isTadabbur
        ? 'tadabbur'
        : 'note';

    entries.push({
      id: note.id,
      kind,
      surahNumber: sNum,
      surahName: note.surahReference || `Surah ${sNum}`,
      ayahNumber: aNum,
      referenceLabel: note.surahReference || `${sNum}:${aNum}`,
      title: note.title,
      body: note.body,
      tags: Array.isArray(note.tags) ? note.tags : [],
      tadabburPrompt: note.tadabburPrompt,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt || note.createdAt,
    });
  }

  for (const rev of params.revisionItems || []) {
    if (rev.personalNotes && rev.personalNotes.trim()) {
      entries.push({
        id: `hifz_${rev.id}`,
        kind: 'hifz_note',
        surahNumber: rev.surahNumber,
        surahName: rev.surahName,
        ayahNumber: rev.startAyah || 1,
        referenceLabel: `${rev.surahName} (${rev.ayahRange})`,
        title: `Hifz Revision Note · ${rev.surahName} ${rev.ayahRange}`,
        body: rev.personalNotes.trim(),
        tags: ['Hifz', rev.difficulty],
        createdAt: rev.lastPracticedAt || rev.dueDate,
        updatedAt: rev.lastPracticedAt || rev.dueDate,
      });
    }
  }

  return entries;
}

export function queryQuranJournalEntries(
  entries: UnifiedQuranJournalEntry[],
  options: QuranJournalQueryOptions = {}
): UnifiedQuranJournalEntry[] {
  const {
    kindFilter = 'all',
    surahFilter = null,
    tagFilter = null,
    folderFilter = null,
    searchQuery = '',
    dateFrom,
    dateTo,
    sortOrder = 'newest',
  } = options;

  const q = searchQuery.trim().toLowerCase();

  const filtered = entries.filter((entry) => {
    if (kindFilter !== 'all' && entry.kind !== kindFilter) {
      return false;
    }
    if (surahFilter !== null && surahFilter > 0 && entry.surahNumber !== surahFilter) {
      return false;
    }
    if (tagFilter && tagFilter.trim()) {
      const targetTag = tagFilter.trim().toLowerCase();
      if (!entry.tags.some((t) => t.toLowerCase() === targetTag)) {
        return false;
      }
    }
    if (folderFilter && folderFilter.trim()) {
      if ((entry.folder || '').toLowerCase() !== folderFilter.trim().toLowerCase()) {
        return false;
      }
    }
    if (dateFrom && entry.createdAt < dateFrom) {
      return false;
    }
    if (dateTo && entry.createdAt > dateTo) {
      return false;
    }
    if (q) {
      const haystack = [
        entry.title,
        entry.body,
        entry.referenceLabel,
        entry.arabicSnippet || '',
        entry.tadabburPrompt || '',
        entry.folder || '',
        entry.readingList || '',
        `${entry.surahNumber}:${entry.ayahNumber}`,
        ...entry.tags,
      ]
        .join(' ')
        .toLowerCase();

      if (!haystack.includes(q)) {
        return false;
      }
    }
    return true;
  });

  return filtered.sort((a, b) => {
    if (sortOrder === 'surah_asc') {
      return a.surahNumber !== b.surahNumber
        ? a.surahNumber - b.surahNumber
        : a.ayahNumber - b.ayahNumber;
    }
    if (sortOrder === 'surah_desc') {
      return a.surahNumber !== b.surahNumber
        ? b.surahNumber - a.surahNumber
        : b.ayahNumber - a.ayahNumber;
    }
    if (sortOrder === 'oldest') {
      return a.createdAt.localeCompare(b.createdAt);
    }
    return b.createdAt.localeCompare(a.createdAt);
  });
}

// ============================================================================
// PHASE 10E — WORD-BY-WORD REVEAL ENGINE FOR QURAN MEMORIZATION (HIFZ)
// ============================================================================

export interface WordByWordRevealState {
  surahNumber: number;
  ayahNumber: number;
  originalArabicText: string;
  words: string[];
  totalWords: number;
  revealedCount: number;
  isFullyRevealed: boolean;
}

/**
 * Splits an Uthmani Arabic Ayah into individual words while keeping standalone Quranic
 * pause marks (Waqf symbols like ۖ ۗ ۘ ۙ ۚ ۛ ۜ ۝) attached to the preceding word so
 * word-by-word reveal never lands on a bare punctuation mark.
 */
export function tokenizeArabicAyahWords(arabicText: string): string[] {
  const rawTokens = (arabicText || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const mergedWords: string[] = [];
  const waqfOnlyRegex = /^[\u06D6-\u06ED\u06DD\u06DE\u06E9\uFD3E\uFD3F٠-٩0-9]+$/;

  for (const token of rawTokens) {
    if (waqfOnlyRegex.test(token) && mergedWords.length > 0) {
      mergedWords[mergedWords.length - 1] = `${mergedWords[mergedWords.length - 1]} ${token}`;
    } else {
      mergedWords.push(token);
    }
  }

  return mergedWords;
}

export function createWordByWordSession(
  surahNumber: number,
  ayahNumber: number,
  arabicText: string,
  initialRevealedCount = 0
): WordByWordRevealState {
  const words = tokenizeArabicAyahWords(arabicText);
  const clamped = Math.max(0, Math.min(words.length, initialRevealedCount));
  return {
    surahNumber,
    ayahNumber,
    originalArabicText: arabicText,
    words,
    totalWords: words.length,
    revealedCount: clamped,
    isFullyRevealed: clamped >= words.length && words.length > 0,
  };
}

export function revealNextWord(state: WordByWordRevealState): WordByWordRevealState {
  const nextCount = Math.min(state.totalWords, state.revealedCount + 1);
  return {
    ...state,
    revealedCount: nextCount,
    isFullyRevealed: nextCount >= state.totalWords && state.totalWords > 0,
  };
}

export function revealPreviousWord(state: WordByWordRevealState): WordByWordRevealState {
  const prevCount = Math.max(0, state.revealedCount - 1);
  return {
    ...state,
    revealedCount: prevCount,
    isFullyRevealed: prevCount >= state.totalWords && state.totalWords > 0,
  };
}

export function revealCompleteAyah(state: WordByWordRevealState): WordByWordRevealState {
  return {
    ...state,
    revealedCount: state.totalWords,
    isFullyRevealed: true,
  };
}

export function resetWordByWordSession(state: WordByWordRevealState): WordByWordRevealState {
  return {
    ...state,
    revealedCount: 0,
    isFullyRevealed: false,
  };
}
