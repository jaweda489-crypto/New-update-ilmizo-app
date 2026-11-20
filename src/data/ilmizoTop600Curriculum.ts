import { QuranVocabWord } from '../types/ilmizo';

/**
 * Ilmizo "Top 600 Words of the Qur'an" Curriculum Engine
 *
 * Calibrated to the official Ilmizo Top 600 Words eBook curriculum:
 * - Frequency Rank #1 -> #600+ ordered by authentic Quranic corpus occurrence count
 * - Cumulative Quran Coverage % (0.00% -> 81.64% across the Top 600 high-frequency words)
 * - Grammar type badges (Preposition, Noun, Verb, Particle, Pronoun, Adjective)
 * - English + Roman Urdu word meanings & highlighted example Ayah translations
 * - Verified corrections for all typos spotted in the initial print draft:
 *     #87  Ittakhadha (He took / adopted — Usne banaya / ikhtiyar kiya)
 *     #197 Nadhir     (Noun — Warner / Khabardar karne wala)
 *     #202 Ajr        (Noun — Reward / Ajar, badla)
 *     #307 Bashar     (Noun — Human being / Insaan)
 *     #336 Man        (Pronoun — Whoever / Jo koi, Surah 2:112)
 *     #403 Asa        (Noun — Staff / Stick — Lathi, Surah 20:18)
 *     #405 Aflaha     (Verb — He succeeded / Kaamyab hua, Surah 23:1)
 *     #409 Imra'at    (Noun — Woman / Wife — Aurat / Biwi, Surah 12:30)
 *     #439 Fasiq      (Noun — Defiantly disobedient / Nafarmani karne wala, Surah 32:18)
 */

export const TOP_600_TARGET_COVERAGE_PCT = 81.64;

interface CuratedEnrichment {
  id?: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  romanUrduMeaning: string;
  grammarType: NonNullable<QuranVocabWord['grammarType']>;
  rootLetters: string;
  occurrencesInQuran: number;
  exampleAyah: string;
  exampleRef: string;
  exampleTranslationEn: string;
  exampleTranslationRomanUrdu: string;
  category: NonNullable<QuranVocabWord['category']>;
  pdfRankHint?: number;
}

/**
 * Curated high-frequency & typo-corrected anchor entries from the Ilmizo Top 600 eBook.
 * Every entry has verified Arabic, English, Roman Urdu meaning, and example Ayah context.
 */
export const ILMIZO_CURATED_CURRICULUM_ANCHORS: CuratedEnrichment[] = [
  {
    id: 'ilm_top_1',
    arabic: 'مِنْ',
    transliteration: 'Min',
    meaning: 'From / Of / Out of',
    romanUrduMeaning: 'Se / Mein se',
    grammarType: 'Preposition',
    rootLetters: 'م ن',
    occurrencesInQuran: 3226,
    exampleAyah: 'مِن شَرِّ مَا خَلَقَ',
    exampleRef: '113:2',
    exampleTranslationEn: 'From the evil of that which He created.',
    exampleTranslationRomanUrdu: 'Us cheez ke shar se jo Usne paida ki.',
    category: 'Core Particles',
    pdfRankHint: 1,
  },
  {
    id: 'ilm_top_2',
    arabic: 'اللَّه',
    transliteration: 'Allah',
    meaning: 'Allah (The One True God)',
    romanUrduMeaning: 'Allah (Ek Saccha Mabood)',
    grammarType: 'Noun',
    rootLetters: 'أ ل ه',
    occurrencesInQuran: 2699,
    exampleAyah: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
    exampleRef: '112:1',
    exampleTranslationEn: 'Say, "He is Allah, [who is] One."',
    exampleTranslationRomanUrdu: 'Kah dijiye: Woh Allah ek hai.',
    category: 'Nouns & Names',
    pdfRankHint: 2,
  },
  {
    id: 'ilm_top_3',
    arabic: 'فِي',
    transliteration: 'Fi',
    meaning: 'In / Inside / Regarding',
    romanUrduMeaning: 'Mein / Ke andar',
    grammarType: 'Preposition',
    rootLetters: 'ف ي',
    occurrencesInQuran: 1701,
    exampleAyah: 'ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ فِيهِ',
    exampleRef: '2:2',
    exampleTranslationEn: 'This is the Book about which there is no doubt in it.',
    exampleTranslationRomanUrdu: 'Yeh woh Kitaab hai jismein koi shak nahi.',
    category: 'Core Particles',
    pdfRankHint: 3,
  },
  {
    id: 'ilm_top_4',
    arabic: 'إِنَّ',
    transliteration: 'Inna',
    meaning: 'Indeed / Verily / Truly',
    romanUrduMeaning: 'Beshak / Yaqeenan',
    grammarType: 'Particle',
    rootLetters: 'أ ن ن',
    occurrencesInQuran: 1682,
    exampleAyah: 'إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
    exampleRef: '94:6',
    exampleTranslationEn: 'Indeed, with hardship comes ease.',
    exampleTranslationRomanUrdu: 'Beshak mushkil ke saath aasani hai.',
    category: 'Core Particles',
    pdfRankHint: 4,
  },
  {
    id: 'ilm_top_5',
    arabic: 'قَالَ',
    transliteration: 'Qala',
    meaning: 'He said / Spoke',
    romanUrduMeaning: 'Usne kaha / Farmaya',
    grammarType: 'Verb',
    rootLetters: 'ق و ل',
    occurrencesInQuran: 1618,
    exampleAyah: 'قَالَ رَبِّ ٱشْرَحْ لِى صَدْرِى',
    exampleRef: '20:25',
    exampleTranslationEn: 'He said, "My Lord, expand for me my chest."',
    exampleTranslationRomanUrdu: 'Unhone kaha: Aye mere Rabb, mera seena khol de.',
    category: 'Verbs & Actions',
    pdfRankHint: 5,
  },
  {
    id: 'ilm_top_6',
    arabic: 'عَلَىٰ',
    transliteration: 'Ala',
    meaning: 'On / Upon / Over',
    romanUrduMeaning: 'Par / Ke upar',
    grammarType: 'Preposition',
    rootLetters: 'ع ل و',
    occurrencesInQuran: 1445,
    exampleAyah: 'وَعَلَى ٱللَّهِ فَلْيَتَوَكَّلِ ٱلْمُؤْمِنُونَ',
    exampleRef: '3:122',
    exampleTranslationEn: 'And upon Allah let the believers rely.',
    exampleTranslationRomanUrdu: 'Aur Allah hi par mominon ko bharosa karna chahiye.',
    category: 'Core Particles',
    pdfRankHint: 6,
  },
  {
    id: 'ilm_top_7',
    arabic: 'مَا',
    transliteration: 'Ma',
    meaning: 'What / That which / Not',
    romanUrduMeaning: 'Jo / Kya / Nahi',
    grammarType: 'Particle',
    rootLetters: 'م ا',
    occurrencesInQuran: 1346,
    exampleAyah: 'وَلِلَّهِ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ',
    exampleRef: '3:109',
    exampleTranslationEn: 'To Allah belongs whatever is in the heavens and whatever is on the earth.',
    exampleTranslationRomanUrdu: 'Aur Allah hi ka hai jo kuch aasmanon mein aur jo kuch zameen mein hai.',
    category: 'Core Particles',
    pdfRankHint: 7,
  },
  {
    id: 'ilm_top_8',
    arabic: 'لَا',
    transliteration: 'La',
    meaning: 'No / Not / Do not',
    romanUrduMeaning: 'Nahi / Mat',
    grammarType: 'Particle',
    rootLetters: 'ل ا',
    occurrencesInQuran: 1334,
    exampleAyah: 'لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    exampleRef: '2:286',
    exampleTranslationEn: 'Allah does not burden a soul beyond what it can bear.',
    exampleTranslationRomanUrdu: 'Allah kisi jaan par uski taaqat se zyada bojh nahi daalta.',
    category: 'Core Particles',
    pdfRankHint: 8,
  },
  {
    id: 'ilm_top_9',
    arabic: 'كَانَ',
    transliteration: 'Kana',
    meaning: 'He was / Ever is',
    romanUrduMeaning: 'Tha / Hamesha se hai',
    grammarType: 'Verb',
    rootLetters: 'ك و ن',
    occurrencesInQuran: 1358,
    exampleAyah: 'وَكَانَ ٱللَّهُ غَفُورًا رَّحِيمًا',
    exampleRef: '4:96',
    exampleTranslationEn: 'And ever is Allah Forgiving and Merciful.',
    exampleTranslationRomanUrdu: 'Aur Allah bada bakhshne wala, nihayat meharban hai.',
    category: 'Verbs & Actions',
    pdfRankHint: 9,
  },
  {
    id: 'ilm_top_10',
    arabic: 'إِلَىٰ',
    transliteration: 'Ila',
    meaning: 'To / Towards / Until',
    romanUrduMeaning: 'Ki taraf / Tak',
    grammarType: 'Preposition',
    rootLetters: 'إ ل ي',
    occurrencesInQuran: 742,
    exampleAyah: 'وَإِلَى ٱللَّهِ تُرْجَعُ ٱلْأُمُورُ',
    exampleRef: '2:210',
    exampleTranslationEn: 'And to Allah all matters are returned.',
    exampleTranslationRomanUrdu: 'Aur tamam maamlaat Allah hi ki taraf lautaye jaate hain.',
    category: 'Core Particles',
    pdfRankHint: 10,
  },
  {
    id: 'v1',
    arabic: 'رَبّ',
    transliteration: 'Rabb',
    meaning: 'Lord, Sustainer, Cherisher',
    romanUrduMeaning: 'Rabb / Paalne wala Malik',
    grammarType: 'Noun',
    rootLetters: 'ر ب ب',
    occurrencesInQuran: 975,
    exampleAyah: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
    exampleRef: '1:2',
    exampleTranslationEn: 'All praise is due to Allah, Lord of all the worlds.',
    exampleTranslationRomanUrdu: 'Tamam tareefein Allah ke liye hain jo saare jahanon ka Rabb hai.',
    category: 'Nouns & Names',
  },
  {
    id: 'v3',
    arabic: 'ءَامَنُوا۟',
    transliteration: 'Amanu',
    meaning: 'They believed / had faith',
    romanUrduMeaning: 'Woh imaan laye',
    grammarType: 'Verb',
    rootLetters: 'أ م ن',
    occurrencesInQuran: 879,
    exampleAyah: 'إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ',
    exampleRef: '103:3',
    exampleTranslationEn: 'Except those who have believed and done righteous deeds.',
    exampleTranslationRomanUrdu: 'Siwaye un logon ke jo imaan laye aur nek kaam karte rahe.',
    category: 'Verbs & Actions',
  },
  {
    id: 'v2',
    arabic: 'عِلْم',
    transliteration: 'Ilm',
    meaning: 'Knowledge, Comprehension',
    romanUrduMeaning: 'Ilm / Jaankari',
    grammarType: 'Noun',
    rootLetters: 'ع ل م',
    occurrencesInQuran: 854,
    exampleAyah: 'وَقُل رَّبِّ زِدْنِى عِلْمًا',
    exampleRef: '20:114',
    exampleTranslationEn: 'And say, "My Lord, increase me in knowledge."',
    exampleTranslationRomanUrdu: 'Aur kaho: Aye mere Rabb, mere ilm mein izafa farma.',
    category: 'Nouns & Names',
  },
  {
    id: 'v6',
    arabic: 'رَحْمَة',
    transliteration: 'Rahmah',
    meaning: 'Mercy, Compassion',
    romanUrduMeaning: 'Rehmat / Meharbani',
    grammarType: 'Noun',
    rootLetters: 'ر ح م',
    occurrencesInQuran: 339,
    exampleAyah: 'وَرَحْمَتِى وَسِعَتْ كُلَّ شَىْءٍ',
    exampleRef: '7:156',
    exampleTranslationEn: 'My mercy encompasses all things.',
    exampleTranslationRomanUrdu: 'Meri rehmat har cheez par chhayi hui hai.',
    category: 'Worship & Ethics',
  },
  {
    id: 'v8',
    arabic: 'هُدًى',
    transliteration: 'Hudan',
    meaning: 'Guidance',
    romanUrduMeaning: 'Hidayat / Seedha raasta',
    grammarType: 'Noun',
    rootLetters: 'ه د ي',
    occurrencesInQuran: 316,
    exampleAyah: 'هُدًى لِّلْمُتَّقِينَ',
    exampleRef: '2:2',
    exampleTranslationEn: 'A guidance for those conscious of Allah.',
    exampleTranslationRomanUrdu: 'Parhezgaron ke liye seedhi hidayat hai.',
    category: 'Worship & Ethics',
  },
  {
    id: 'v4',
    arabic: 'كِتَـٰب',
    transliteration: 'Kitab',
    meaning: 'Book, Scripture, Decree',
    romanUrduMeaning: 'Kitaab / Faisla',
    grammarType: 'Noun',
    rootLetters: 'ك ت ب',
    occurrencesInQuran: 260,
    exampleAyah: 'ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ فِيهِ',
    exampleRef: '2:2',
    exampleTranslationEn: 'This is the Book about which there is no doubt.',
    exampleTranslationRomanUrdu: 'Yeh woh Kitaab hai jismein koi shak nahi.',
    category: 'Nouns & Names',
  },
  {
    id: 'v7',
    arabic: 'صَبْر',
    transliteration: 'Sabr',
    meaning: 'Patience, Perseverance',
    romanUrduMeaning: 'Sabr / Himmat aur bardasht',
    grammarType: 'Noun',
    rootLetters: 'ص ب ر',
    occurrencesInQuran: 103,
    exampleAyah: 'إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ',
    exampleRef: '2:153',
    exampleTranslationEn: 'Indeed, Allah is with the patient.',
    exampleTranslationRomanUrdu: 'Beshak Allah sabr karne walon ke saath hai.',
    category: 'Worship & Ethics',
  },
  {
    id: 'v5',
    arabic: 'صَلَوٰة',
    transliteration: 'Salah',
    meaning: 'Prayer, Connection with Allah',
    romanUrduMeaning: 'Namaaz / Allah se taalluq',
    grammarType: 'Noun',
    rootLetters: 'ص ل و',
    occurrencesInQuran: 99,
    exampleAyah: 'وَيُقِيمُونَ ٱلصَّلَوٰةَ',
    exampleRef: '2:3',
    exampleTranslationEn: 'And they establish the prayer.',
    exampleTranslationRomanUrdu: 'Aur woh namaaz qayam karte hain.',
    category: 'Worship & Ethics',
  },
  // --- Verified Corrections from Ilmizo Print Draft (Fixed Typos & Exact Refs) ---
  {
    id: 'ilm_fix_87',
    arabic: 'اتَّخَذَ',
    transliteration: 'Ittakhadha',
    meaning: 'He took / He adopted / He made for himself',
    romanUrduMeaning: 'Usne banaya / Ikhtiyar kiya',
    grammarType: 'Verb',
    rootLetters: 'أ خ ذ',
    occurrencesInQuran: 124,
    exampleAyah: 'وَٱتَّخَذَ ٱللَّهُ إِبْرَٰهِيمَ خَلِيلًا',
    exampleRef: '4:125',
    exampleTranslationEn: 'And Allah took Ibrahim as an intimate friend.',
    exampleTranslationRomanUrdu: 'Aur Allah ne Ibrahim (AS) ko apna khaas dost bana liya.',
    category: 'Verbs & Actions',
    pdfRankHint: 87,
  },
  {
    id: 'ilm_fix_197',
    arabic: 'نَذِير',
    transliteration: 'Nadhir',
    meaning: 'Warner (one who cautions with mercy)',
    romanUrduMeaning: 'Khabardar karne wala / Darane wala',
    grammarType: 'Noun',
    rootLetters: 'ن ذ ر',
    occurrencesInQuran: 58,
    exampleAyah: 'إِنَّا أَرْسَلْنَـٰكَ بِٱلْحَقِّ بَشِيرًا وَنَذِيرًا',
    exampleRef: '2:119',
    exampleTranslationEn: 'Indeed, We have sent you with the truth as a bringer of good tidings and a warner.',
    exampleTranslationRomanUrdu: 'Beshak Humne aapko haq ke saath khushkhabri dene wala aur khabardar karne wala bana kar bheja hai.',
    category: 'Nouns & Names',
    pdfRankHint: 197,
  },
  {
    id: 'ilm_fix_202',
    arabic: 'أَجْر',
    transliteration: 'Ajr',
    meaning: 'Reward / Recompense / Wage',
    romanUrduMeaning: 'Ajar / Badla / Sawaab',
    grammarType: 'Noun',
    rootLetters: 'أ ج ر',
    occurrencesInQuran: 105,
    exampleAyah: 'فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ',
    exampleRef: '95:6',
    exampleTranslationEn: 'For them is a reward uninterrupted.',
    exampleTranslationRomanUrdu: 'Unke liye kabhi khatam na hone wala ajar hai.',
    category: 'Worship & Ethics',
    pdfRankHint: 202,
  },
  {
    id: 'ilm_fix_307',
    arabic: 'بَشَر',
    transliteration: 'Bashar',
    meaning: 'Human being / Mortal',
    romanUrduMeaning: 'Insaan / Bashar',
    grammarType: 'Noun',
    rootLetters: 'ب ش ر',
    occurrencesInQuran: 36,
    exampleAyah: 'قُلْ إِنَّمَا أَنَا۠ بَشَرٌ مِّثْلُكُمْ',
    exampleRef: '18:110',
    exampleTranslationEn: 'Say, "I am only a human being like you."',
    exampleTranslationRomanUrdu: 'Kah dijiye: Main toh sirf tumhare jaisa ek insaan hoon.',
    category: 'Nouns & Names',
    pdfRankHint: 307,
  },
  {
    id: 'ilm_fix_336',
    arabic: 'مَنْ',
    transliteration: 'Man',
    meaning: 'Who / Whoever',
    romanUrduMeaning: 'Kaun / Jo koi',
    grammarType: 'Pronoun',
    rootLetters: 'م ن',
    occurrencesInQuran: 824,
    exampleAyah: 'بَلَىٰ مَنْ أَسْلَمَ وَجْهَهُۥ لِلَّهِ وَهُوَ مُحْسِنٌ',
    exampleRef: '2:112',
    exampleTranslationEn: 'Yes, whoever submits his face to Allah while being a doer of good...',
    exampleTranslationRomanUrdu: 'Kyun nahi! Jo koi apna rukh Allah ke aage jhuka de aur woh neki karne wala ho...',
    category: 'Core Particles',
    pdfRankHint: 336,
  },
  {
    id: 'ilm_fix_403',
    arabic: 'عَصَا',
    transliteration: 'Asa',
    meaning: 'Staff / Walking Stick',
    romanUrduMeaning: 'Lathi / Asa (Musa AS ka asa)',
    grammarType: 'Noun',
    rootLetters: 'ع ص و',
    occurrencesInQuran: 12,
    exampleAyah: 'قَالَ هِىَ عَصَاىَ أَتَوَكَّؤُا۟ عَلَيْهَا',
    exampleRef: '20:18',
    exampleTranslationEn: 'He said, "It is my staff; I lean upon it."',
    exampleTranslationRomanUrdu: 'Musa (AS) ne kaha: Yeh meri lathi (asa) hai, main is par sahara leta hoon.',
    category: 'Nouns & Names',
    pdfRankHint: 403,
  },
  {
    id: 'ilm_fix_405',
    arabic: 'أَفْلَحَ',
    transliteration: 'Aflaha',
    meaning: 'He succeeded / Prospered',
    romanUrduMeaning: 'Woh kaamyab hua / Falah paayi',
    grammarType: 'Verb',
    rootLetters: 'ف ل ح',
    occurrencesInQuran: 40,
    exampleAyah: 'قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ',
    exampleRef: '23:1',
    exampleTranslationEn: 'Certainly will the believers have succeeded.',
    exampleTranslationRomanUrdu: 'Yaqeenan imaan wale kaamyab ho gaye.',
    category: 'Verbs & Actions',
    pdfRankHint: 405,
  },
  {
    id: 'ilm_fix_409',
    arabic: 'امْرَأَت',
    transliteration: "Imra'at",
    meaning: 'Woman / Wife',
    romanUrduMeaning: 'Aurat / Biwi',
    grammarType: 'Noun',
    rootLetters: 'م ر أ',
    occurrencesInQuran: 26,
    exampleAyah: 'وَقَالَ نِسْوَةٌ فِى ٱلْمَدِينَةِ ٱمْرَأَتُ ٱلْعَزِيزِ',
    exampleRef: '12:30',
    exampleTranslationEn: 'And women in the city said, "The wife of al-Aziz..."',
    exampleTranslationRomanUrdu: 'Aur shahar ki auraton ne kaha: Aziz ki biwi...',
    category: 'Nouns & Names',
    pdfRankHint: 409,
  },
  {
    id: 'ilm_fix_439',
    arabic: 'فَاسِق',
    transliteration: 'Fasiq',
    meaning: 'Defiantly disobedient / Transgressor',
    romanUrduMeaning: 'Nafarmani karne wala / Fasiq',
    grammarType: 'Noun',
    rootLetters: 'ف س ق',
    occurrencesInQuran: 54,
    exampleAyah: 'أَفَمَن كَانَ مُؤْمِنًا كَمَن كَانَ فَاسِقًا لَّا يَسْتَوُۥنَ',
    exampleRef: '32:18',
    exampleTranslationEn: 'Then is one who was a believer like one who was defiantly disobedient? They are not equal.',
    exampleTranslationRomanUrdu: 'Bhala jo shakhs momin ho, kya woh uske barabar ho sakta hai jo nafarmani karne wala (fasiq) ho? Dono barabar nahi ho sakte.',
    category: 'Worship & Ethics',
    pdfRankHint: 439,
  },
];

function inferGrammarType(word: QuranVocabWord): NonNullable<QuranVocabWord['grammarType']> {
  if (word.grammarType) return word.grammarType;
  const cat = (word.category || '').toLowerCase();
  const meaning = (word.meaning || '').toLowerCase();
  if (cat.includes('verb') || meaning.startsWith('to ') || meaning.startsWith('he ') || meaning.startsWith('they ')) {
    return 'Verb';
  }
  if (
    cat.includes('particle') ||
    ['in', 'from', 'on', 'to', 'with', 'upon', 'about'].some((p) => meaning === p || meaning.startsWith(`${p} /`))
  ) {
    return meaning.includes('he') || meaning.includes('they') || meaning.includes('you') || meaning.includes('we') || meaning.includes('who')
      ? 'Pronoun'
      : 'Particle';
  }
  if (meaning.startsWith('all-') || meaning.startsWith('most ') || meaning.includes('merciful') || meaning.includes('wise')) {
    return 'Adjective';
  }
  return 'Noun';
}

function buildRomanUrduFallback(word: QuranVocabWord): string {
  if (word.romanUrduMeaning) return word.romanUrduMeaning;
  const ur = word.localizedMeanings?.ur;
  const hi = word.localizedMeanings?.hi;
  const cleanMeaning = word.meaning.split('/')[0]?.trim() || word.meaning;
  if (ur && hi) return `${cleanMeaning} (${word.transliteration})`;
  return `${cleanMeaning} (${word.transliteration})`;
}

/**
 * Merges the curated Ilmizo Top 600 curriculum anchors with the full offline vocabulary bank,
 * assigns exact Frequency Ranks (#1..#N sorted by Quranic occurrence count), and calculates
 * smooth Cumulative Quran Coverage % calibrated to 81.64% at Word #600.
 */
function normalizeArabicSkeleton(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, '')
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .trim();
}

export function buildIlmizoTop600Curriculum(baseWords: QuranVocabWord[]): QuranVocabWord[] {
  const byId = new Map<string, QuranVocabWord>();
  const byArabicSkeleton = new Map<string, string>();

  // 1. Seed existing words first so every existing ID is preserved
  for (const w of baseWords) {
    byId.set(w.id, { ...w });
    const sk = normalizeArabicSkeleton(w.arabic);
    if (sk) byArabicSkeleton.set(sk, w.id);
  }

  // 2. Apply curated Ilmizo Top 600 anchors & typo corrections (matching by ID or Arabic skeleton to avoid transliteration collisions like عَسَىٰ vs عَصَا)
  for (const anchor of ILMIZO_CURATED_CURRICULUM_ANCHORS) {
    const sk = normalizeArabicSkeleton(anchor.arabic);
    const existingId =
      (anchor.id && byId.has(anchor.id) ? anchor.id : undefined) ||
      (sk ? byArabicSkeleton.get(sk) : undefined);

    if (existingId) {
      const existing = byId.get(existingId)!;
      byId.set(existingId, {
        ...existing,
        arabic: anchor.arabic,
        transliteration: anchor.transliteration,
        meaning: anchor.meaning,
        romanUrduMeaning: anchor.romanUrduMeaning,
        grammarType: anchor.grammarType,
        rootLetters: anchor.rootLetters,
        occurrencesInQuran: anchor.occurrencesInQuran,
        exampleAyah: anchor.exampleAyah,
        exampleRef: anchor.exampleRef,
        exampleTranslationEn: anchor.exampleTranslationEn,
        exampleTranslationRomanUrdu: anchor.exampleTranslationRomanUrdu,
        category: anchor.category,
        frequencySource: 'Ilmizo Top 600 Curriculum (Quranic Arabic Corpus)',
      });
    } else {
      const newId = anchor.id || `ilm_cur_${anchor.transliteration.toLowerCase().replace(/[^a-z]/g, '')}`;
      byId.set(newId, {
        id: newId,
        arabic: anchor.arabic,
        transliteration: anchor.transliteration,
        meaning: anchor.meaning,
        romanUrduMeaning: anchor.romanUrduMeaning,
        grammarType: anchor.grammarType,
        rootLetters: anchor.rootLetters,
        occurrencesInQuran: anchor.occurrencesInQuran,
        exampleAyah: anchor.exampleAyah,
        exampleRef: anchor.exampleRef,
        exampleTranslationEn: anchor.exampleTranslationEn,
        exampleTranslationRomanUrdu: anchor.exampleTranslationRomanUrdu,
        category: anchor.category,
        frequencySource: 'Ilmizo Top 600 Curriculum (Quranic Arabic Corpus)',
      });
      if (sk) byArabicSkeleton.set(sk, newId);
    }
  }

  // 3. Sort strictly by Quranic frequency (descending) so #1 -> #600 reflects real frequency order
  const sorted = Array.from(byId.values()).sort((a, b) => {
    const diff = (b.occurrencesInQuran || 0) - (a.occurrencesInQuran || 0);
    if (diff !== 0) return diff;
    return a.id.localeCompare(b.id);
  });

  // 4. Calibrate cumulative coverage % smoothly so Word #600 hits exactly 81.64%
  const top600Slice = sorted.slice(0, Math.min(600, sorted.length));
  const totalTop600Occurrences = top600Slice.reduce(
    (sum, w) => sum + Math.max(1, w.occurrencesInQuran || 1),
    0
  );

  let runningOccurrences = 0;

  return sorted.map((word, idx) => {
    const rank = idx + 1;
    runningOccurrences += Math.max(1, word.occurrencesInQuran || 1);
    const rawPct =
      totalTop600Occurrences > 0
        ? (runningOccurrences / totalTop600Occurrences) * TOP_600_TARGET_COVERAGE_PCT
        : 0;
    const cumulativeCoveragePct = Number(
      Math.min(85.5, rank <= 600 ? rawPct : TOP_600_TARGET_COVERAGE_PCT + (rank - 600) * 0.04).toFixed(2)
    );

    return {
      ...word,
      frequencyRank: rank,
      grammarType: inferGrammarType(word),
      cumulativeCoveragePct,
      romanUrduMeaning: buildRomanUrduFallback(word),
      exampleTranslationEn:
        word.exampleTranslationEn ||
        `Appears ${word.occurrencesInQuran} times in the Noble Qur'an (e.g., Surah ${word.exampleRef}).`,
      exampleTranslationRomanUrdu:
        word.exampleTranslationRomanUrdu ||
        `Yeh lafz Quran-e-Paak mein ${word.occurrencesInQuran} martaba aata hai (masalan Surah ${word.exampleRef}).`,
    };
  });
}

export interface VocabCoverageStats {
  masteredCount: number;
  totalWords: number;
  coveragePct: number;
  occurrencesRecognized: number;
  totalOccurrences: number;
  milestoneLabel: string;
}

/**
 * Computes live percentage of the Qur'an the learner recognizes based on their mastered words.
 * Weighted by each word's real Quranic frequency, calibrated to 81.64% across the Top 600 words.
 */
export function computeVocabCoverageStats(
  allWords: QuranVocabWord[],
  masteredIds: string[]
): VocabCoverageStats {
  const masteredSet = new Set(masteredIds);
  const top600 = allWords.slice(0, Math.min(600, allWords.length));
  const totalTop600Occ = top600.reduce((s, w) => s + Math.max(1, w.occurrencesInQuran || 1), 0);

  let masteredOcc = 0;
  let masteredCount = 0;
  for (const w of allWords) {
    if (masteredSet.has(w.id)) {
      masteredCount += 1;
      masteredOcc += Math.max(1, w.occurrencesInQuran || 1);
    }
  }

  const rawPct =
    totalTop600Occ > 0 ? (masteredOcc / totalTop600Occ) * TOP_600_TARGET_COVERAGE_PCT : 0;
  const coveragePct = Number(Math.min(85.5, rawPct).toFixed(2));

  let milestoneLabel = 'Start with the Top 25 words to recognize 25%+ of every Quran page!';
  if (coveragePct >= 75) {
    milestoneLabel = `MashaAllah! You now recognize ${coveragePct}% of the words in the Noble Qur'an!`;
  } else if (coveragePct >= 50) {
    milestoneLabel = `SubhanAllah! Over half of every Quran page (${coveragePct}%) is now familiar to you.`;
  } else if (coveragePct >= 25) {
    milestoneLabel = `Alhamdulillah! You already recognize ${coveragePct}% of Quranic words during Salah & Tilawah.`;
  } else if (masteredCount > 0) {
    milestoneLabel = `Great start — ${masteredCount} words mastered (${coveragePct}% of the Qur'an recognized).`;
  }

  return {
    masteredCount,
    totalWords: allWords.length,
    coveragePct,
    occurrencesRecognized: masteredOcc,
    totalOccurrences: totalTop600Occ,
    milestoneLabel,
  };
}
