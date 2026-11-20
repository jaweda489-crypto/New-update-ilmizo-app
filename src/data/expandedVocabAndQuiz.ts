import type {
  ContentRegistryMetadata,
  CoreSupportedLanguage,
  LanguageCode,
  QuizPack,
  QuizQuestion,
  QuranVocabWord,
} from '../types/ilmizo';
import { EXPANDED_KIDS_STORIES } from './expandedIslamicLibrary';
import {
  EXPANDED_ISLAMIC_LESSONS,
  EXPANDED_SEERAH_TIMELINE,
  EXPANDED_VERIFIED_DUAS,
} from './expandedDuasAndLessons';

/**
 * PHASE 8 & PHASE 9 — 300+ VERIFIED HIGH-FREQUENCY QURANIC VOCABULARY LIBRARY,
 * RANDOMIZED MULTI-LEVEL QUIZ ENGINE, CONTENT REGISTRY & LOCALIZATION COVERAGE REPORT
 */

interface VocabTuple {
  id: string;
  ar: string;
  tr: string;
  en: string;
  hi: string;
  ur: string;
  root: string;
  exAr: string;
  exRef: string;
  cat: QuranVocabWord['category'];
  freq: number;
}

const CORE_VOCAB_SEEDS: VocabTuple[] = [
  { id: 'v_allah', ar: 'اللَّه', tr: 'Allah', en: 'Allah (The One True God)', hi: 'अल्लाह (एक सच्चा माबूद)', ur: 'اللہ (معبودِ برحق)', root: 'أ ل ه', exAr: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', exRef: '1:1', cat: 'Nouns & Names', freq: 2699 },
  { id: 'v_rabb', ar: 'رَبّ', tr: 'Rabb', en: 'Lord / Sustainer / Cherisher', hi: 'रब / पालने वाला मालिक', ur: 'رب / پالنے والا مالک', root: 'ر ب ب', exAr: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', exRef: '1:2', cat: 'Nouns & Names', freq: 975 },
  { id: 'v_rahman', ar: 'الرَّحْمَٰن', tr: 'Ar-Rahman', en: 'The Most Gracious / Entirely Merciful', hi: 'बड़ा मेहरबान (रहमान)', ur: 'بڑا مہربان (الرحمٰن)', root: 'ر ح م', exAr: 'الرَّحْمَٰنِ الرَّحِيمِ', exRef: '1:3', cat: 'Nouns & Names', freq: 57 },
  { id: 'v_rahim', ar: 'الرَّحِيم', tr: 'Ar-Rahim', en: 'The Especially Merciful', hi: 'निहायत रहम वाला (रहीम)', ur: 'نہایت رحم فرمانے والا (الرحیم)', root: 'ر ح م', exAr: 'وَكَانَ بِالْمُؤْمِنِينَ رَحِيمًا', exRef: '33:43', cat: 'Nouns & Names', freq: 114 },
  { id: 'v_yawm', ar: 'يَوْم', tr: 'Yawm', en: 'Day', hi: 'दिन (यौम)', ur: 'دن (یوم)', root: 'ي و م', exAr: 'مَالِكِ يَوْمِ الدِّينِ', exRef: '1:4', cat: 'Nouns & Names', freq: 405 },
  { id: 'v_qawm', ar: 'قَوْم', tr: 'Qawm', en: 'People / Nation', hi: 'क़ौम / लोग', ur: 'قوم / لوگ', root: 'ق و م', exAr: 'لِقَوْمٍ يَعْقِلُونَ', exRef: '2:164', cat: 'Nouns & Names', freq: 383 },
  { id: 'v_ayah', ar: 'آيَة', tr: 'Ayah', en: 'Sign / Verse', hi: 'निशानी / आयत', ur: 'نشانی / آیت', root: 'أ ي ي', exAr: 'تِلْكَ آيَاتُ اللَّهِ', exRef: '2:252', cat: 'Nouns & Names', freq: 382 },
  { id: 'v_ard', ar: 'أَرْض', tr: 'Ard', en: 'Earth / Land', hi: 'ज़मीन', ur: 'زمین', root: 'أ ر ض', exAr: 'فِي الْأَرْضِ', exRef: '2:11', cat: 'Nouns & Names', freq: 461 },
  { id: 'v_sama', ar: 'سَمَاء', tr: 'Sama’', en: 'Sky / Heaven', hi: 'आसमान', ur: 'آسمان', root: 'س م و', exAr: 'السَّمَاوَاتِ وَالْأَرْضِ', exRef: '2:107', cat: 'Nouns & Names', freq: 310 },
  { id: 'v_kitab', ar: 'كِتَاب', tr: 'Kitab', en: 'Book / Scripture', hi: 'किताब', ur: 'کتاب', root: 'ك ت ب', exAr: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ', exRef: '2:2', cat: 'Nouns & Names', freq: 260 },
  { id: 'v_haqq', ar: 'حَقّ', tr: 'Haqq', en: 'Truth / Right', hi: 'सच / हक़', ur: 'حق / سچ', root: 'ح ق ق', exAr: 'وَقُلْ جَاءَ الْحَقُّ', exRef: '17:81', cat: 'Nouns & Names', freq: 287 },
  { id: 'v_ilm', ar: 'عِلْم', tr: 'Ilm', en: 'Knowledge', hi: 'इल्म / ज्ञान', ur: 'علم / دانش', root: 'ع ل م', exAr: 'وَقُل رَّبِّ زِدْنِي عِلْمًا', exRef: '20:114', cat: 'Nouns & Names', freq: 105 },
  { id: 'v_qalb', ar: 'قَلْب', tr: 'Qalb', en: 'Heart', hi: 'दिल (क़ल्ब)', ur: 'دل (قلب)', root: 'ق ل ب', exAr: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', exRef: '13:28', cat: 'Nouns & Names', freq: 132 },
  { id: 'v_sabr', ar: 'صَبْر', tr: 'Sabr', en: 'Patience / Perseverance', hi: 'सब्र / धैर्य', ur: 'صبر / استقامت', root: 'ص ب ر', exAr: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ', exRef: '2:45', cat: 'Worship & Ethics', freq: 103 },
  { id: 'v_shukr', ar: 'شُكْر', tr: 'Shukr', en: 'Gratitude / Thankfulness', hi: 'शुक्र / कृतज्ञता', ur: 'شکر / احسان مندی', root: 'ش ك ر', exAr: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ', exRef: '14:7', cat: 'Worship & Ethics', freq: 75 },
  { id: 'v_salah', ar: 'صَلَاة', tr: 'Salah', en: 'Prayer', hi: 'नमाज़ (सलात)', ur: 'نماز (صلوٰۃ)', root: 'ص ل و', exAr: 'وَأَقِيمُوا الصَّلَاةَ', exRef: '2:43', cat: 'Worship & Ethics', freq: 99 },
  { id: 'v_zakah', ar: 'زَكَاة', tr: 'Zakah', en: 'Purifying Charity', hi: 'ज़कात / पाकीज़गी', ur: 'زکوٰۃ / پاکیزگی', root: 'ز ك و', exAr: 'وَآتُوا الزَّكَاةَ', exRef: '2:43', cat: 'Worship & Ethics', freq: 32 },
  { id: 'v_taqwa', ar: 'تَقْوَىٰ', tr: 'Taqwa', en: 'God-Consciousness / Piety', hi: 'तक़वा / परहेज़गारी', ur: 'تقویٰ / پرہیزگاری', root: 'و ق ي', exAr: 'فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ', exRef: '2:197', cat: 'Worship & Ethics', freq: 258 },
];

// Additional structured high-frequency Quranic vocabulary entries across Core Particles, Nouns, Verbs, and Ethics
const COMPACT_QURAN_VOCAB_LIST: Array<[string, string, string, string, string, string, string, QuranVocabWord['category'], number]> = [
  ['مِنْ', 'Min', 'From / Of', 'से (मिन)', 'سے (من)', 'م ن', '2:4', 'Core Particles', 3226],
  ['فِي', 'Fi', 'In / Within', 'में (फ़ी)', 'میں (فی)', 'ف ي', '1:4', 'Core Particles', 1701],
  ['عَلَىٰ', 'Ala', 'Upon / Over', 'पर (अला)', 'پر (علیٰ)', 'ع ل و', '1:7', 'Core Particles', 1445],
  ['إِلَىٰ', 'Ila', 'To / Toward', 'की तरफ़ (इला)', 'کی طرف (الیٰ)', 'إ ل ي', '2:14', 'Core Particles', 742],
  ['عَنْ', 'An', 'From / About', 'के बारे में / से', 'سے / کے بارے میں', 'ع ن', '2:119', 'Core Particles', 465],
  ['مَعَ', 'Ma’a', 'With', 'साथ (मअ)', 'ساتھ (مع)', 'م ع', '2:153', 'Core Particles', 163],
  ['عِنْدَ', 'Inda', 'With / Near / In the sight of', 'के पास (इन्द)', 'کے پاس / نزدیک', 'ع ن د', '3:19', 'Core Particles', 201],
  ['بَيْنَ', 'Bayna', 'Between / Among', 'के बीच (बैन)', 'درمیان (بین)', 'ب ي ن', '2:66', 'Core Particles', 266],
  ['بَعْدَ', 'Ba’da', 'After', 'के बाद (बाद)', 'کے بعد', 'ب ع د', '2:27', 'Core Particles', 199],
  ['قَبْلَ', 'Qabla', 'Before', 'से पहले (क़ब्ल)', 'سے پہلے (قبل)', 'ق ب ل', '2:4', 'Core Particles', 242],
  ['فَوْقَ', 'Fawqa', 'Above / Over', 'के ऊपर (फ़ौक़)', 'کے اوپر (فوق)', 'ف و ق', '2:26', 'Core Particles', 41],
  ['تَحْتَ', 'Tahta', 'Beneath / Under', 'के नीचे (तहत)', 'کے نیچے (تحت)', 'ت ح ت', '2:25', 'Core Particles', 51],
  ['حَوْلَ', 'Hawla', 'Around', 'के इर्द-गिर्द', 'کے ارد گرد', 'ح و ل', '2:17', 'Core Particles', 22],
  ['دُونَ', 'Duna', 'Besides / Other than', 'के सिवा (दून)', 'کے سوا (دون)', 'د و ن', '2:23', 'Core Particles', 144],
  ['لَدُنْ', 'Ladun', 'From the presence of', 'की तरफ़ से', 'کی جانب سے', 'ل د ن', '3:8', 'Core Particles', 18],
  ['إِنَّ', 'Inna', 'Indeed / Verily', 'बेशक (इन्न)', 'بے شک (انّ)', 'إ ن ن', '2:6', 'Core Particles', 1530],
  ['أَنَّ', 'Anna', 'That (indeed)', 'यह कि बेशक', 'یہ کہ بے شک', 'أ ن ن', '2:25', 'Core Particles', 362],
  ['كَأَنَّ', 'Ka’anna', 'As if / As though', 'गोया कि', 'گویا کہ', 'ك أ ن', '2:19', 'Core Particles', 35],
  ['لَٰكِنْ', 'Lakin', 'But / However', 'लेकिन / मगर', 'لیکن / مگر', 'ل ك ن', '2:12', 'Core Particles', 130],
  ['لَعَلَّ', 'La’alla', 'Perhaps / So that you may', 'ताकि तुम / शायद', 'تاکہ تم / شاید', 'ل ع ل', '2:21', 'Core Particles', 129],
  ['لَيْتَ', 'Layta', 'If only / Would that', 'काश! (लैत)', 'کاش! (لیت)', 'ل ي ت', '78:40', 'Core Particles', 14],
  ['إِذْ', 'Idh', 'When (past reminder)', 'जब (याद करो)', 'جب (یاد کرو)', 'إ ذ', '2:30', 'Core Particles', 239],
  ['إِذَا', 'Idha', 'When / Whenever', 'जब (इज़ा)', 'جب (اذا)', 'إ ذ ا', '110:1', 'Core Particles', 406],
  ['لَمَّا', 'Lamma', 'When / Not yet', 'जब / अभी तक नहीं', 'جب / ابھی تک نہیں', 'ل م ا', '2:17', 'Core Particles', 165],
  ['كُلَّمَا', 'Kullama', 'Every time / Whenever', 'जब कभी (कुल्लमा)', 'جب کبھی (کلما)', 'ك ل ل', '2:20', 'Core Particles', 17],
  ['حَتَّىٰ', 'Hatta', 'Until / Even', 'यहाँ तक कि (हत्ता)', 'یہاں تک کہ (حتیٰ)', 'ح ت ي', '97:5', 'Core Particles', 142],
  ['ثُمَّ', 'Thumma', 'Then / Thereafter', 'फिर (सुम्म)', 'پھر (ثمّ)', 'ث م م', '102:4', 'Core Particles', 338],
  ['أَوْ', 'Aw', 'Or', 'या (औ)', 'یا (او)', 'أ و', '2:19', 'Core Particles', 280],
  ['أَمْ', 'Am', 'Or (in question)', 'या क्या (अम)', 'یا کیا (ام)', 'أ م', '2:6', 'Core Particles', 137],
  ['بَلْ', 'Bal', 'Rather / Nay', 'बल्कि (बल)', 'بلکہ (بل)', 'ب ل', '2:88', 'Core Particles', 127],
  ['قَدْ', 'Qad', 'Certainly / Indeed', 'यक़ीनन / तहक़ीक़', 'یقیناً / تحقیق', 'ق د', '23:1', 'Core Particles', 406],
  ['سَوْفَ', 'Sawfa', 'Soon / Will', 'जल्द ही (सौफ़)', 'عنقریب (سوف)', 'س و ف', '93:5', 'Core Particles', 42],
  ['لَا', 'La', 'No / Not', 'नहीं (ला)', 'نہیں (لا)', 'ل ا', '2:2', 'Core Particles', 1723],
  ['لَمْ', 'Lam', 'Did not', 'नहीं किया (लम)', 'نہیں کیا (لم)', 'ل م', '112:3', 'Core Particles', 353],
  ['لَنْ', 'Lan', 'Will never', 'हरगिज़ नहीं (लन)', 'ہرگز نہیں (لن)', 'ل ن', '2:24', 'Core Particles', 106],
  ['مَا', 'Ma', 'What / Not', 'जो कुछ / नहीं', 'جو کچھ / نہیں', 'م ا', '109:2', 'Core Particles', 2165],
  ['مَنْ', 'Man', 'Who / Whoever', 'जो कोई / कौन', 'جو کوئی / کون', 'م ن', '99:7', 'Core Particles', 823],
  ['أَيْنَ', 'Ayna', 'Where', 'कहाँ (ऐन)', 'کہاں (این)', 'أ ي ن', '75:10', 'Core Particles', 29],
  ['كَيْفَ', 'Kayfa', 'How', 'कैसे (कैफ़)', 'کیسے (کیف)', 'ك ي ف', '105:1', 'Core Particles', 83],
  ['مَتَىٰ', 'Mata', 'When?', 'कब? (मता)', 'کب؟ (متیٰ)', 'م ت ي', '2:214', 'Core Particles', 9],
  ['كَمْ', 'Kam', 'How many / How much', 'कितने (कम)', 'کتنے (کم)', 'ك م', '2:211', 'Core Particles', 21],
  ['أَيّ', 'Ayy', 'Which / Whichever', 'कौन-सा (अय्य)', 'کون سا (ایّ)', 'أ ي ي', '67:2', 'Core Particles', 110],
  ['إِلَّا', 'Illa', 'Except / Unless', 'मगर / सिवाय (इल्ला)', 'مگر / سوائے (الا)', 'إ ل ا', '103:3', 'Core Particles', 663],
  ['غَيْر', 'Ghayr', 'Other than / Not', 'के सिवा / बिना (ग़ैर)', 'کے سوا / بغیر (غیر)', 'غ ي ر', '1:7', 'Core Particles', 147],
  ['كُلّ', 'Kull', 'All / Every', 'हर एक / सब (कुल्ल)', 'ہر ایک / تمام (کل)', 'ك ل ل', '2:20', 'Core Particles', 377],
  ['بَعْض', 'Ba’d', 'Some / Part of', 'कुछ / बाज़', 'کچھ / بعض', 'ب ع ض', '2:36', 'Core Particles', 158],
  ['مِثْل', 'Mithl', 'Like / Similar to', 'जैसा / मिसाल', 'جیسا / مثل', 'م ث ل', '42:11', 'Core Particles', 169],
  ['أُولُو', 'Ulu', 'Possessors of / People of', 'वाले (उलू)', 'والے / اصحاب (اولو)', 'أ و ل', '3:190', 'Core Particles', 43],
  ['ذُو', 'Dhu', 'Owner of / Possessor of', 'वाला (ज़ू)', 'والا / صاحب (ذو)', 'ذ و', '55:27', 'Core Particles', 116],
  ['نِعْمَ', 'Ni’ma', 'How excellent!', 'क्या ही अच्छा!', 'کیا ہی اچھا!', 'ن ع م', '3:173', 'Core Particles', 18],
  ['بِئْسَ', 'Bi’sa', 'How wretched!', 'कितना बुरा!', 'کس قدر برا!', 'ب أ س', '2:90', 'Core Particles', 40],
  ['عَسَىٰ', 'Asa', 'Perhaps / It may be that', 'उम्मीद है कि', 'امید ہے کہ (عسیٰ)', 'ع س ي', '2:216', 'Core Particles', 30],
  ['سُبْحَانَ', 'Subhana', 'Glory be to / Exalted is', 'पाक है (सुब्हान)', 'پاک ہے (سبحان)', 'س ب ح', '17:1', 'Worship & Ethics', 41],
  ['هُوَ', 'Huwa', 'He', 'वह (हुव)', 'وہ (ھو)', 'ه و', '112:1', 'Core Particles', 481],
  ['هِيَ', 'Hiya', 'She / It', 'वह (हिय)', 'وہ (ھی)', 'ه ي', '97:5', 'Core Particles', 64],
  ['هُمْ', 'Hum', 'They', 'वे सब (हुम)', 'وہ سب (ھم)', 'ه م', '1:7', 'Core Particles', 444],
  ['أَنْتَ', 'Anta', 'You (singular)', 'तू / आप (अन्त)', 'تو / آپ (انت)', 'أ ن ت', '2:32', 'Core Particles', 81],
  ['أَنْتُمْ', 'Antum', 'You all (plural)', 'तुम सब (अन्तुम)', 'تم سب (انتم)', 'أ ن ت', '2:22', 'Core Particles', 135],
  ['أَنَا', 'Ana', 'I', 'मैं (अना)', 'میں (انا)', 'أ ن ا', '20:14', 'Core Particles', 68],
  ['نَحْنُ', 'Nahnu', 'We', 'हम (नहनु)', 'ہم (نحن)', 'ن ح ن', '15:9', 'Core Particles', 86],
  ['هَٰذَا', 'Hadha', 'This (masculine)', 'यह (हाज़ा)', 'یہ (ھٰذا)', 'ه ذ ا', '2:25', 'Core Particles', 225],
  ['هَٰذِهِ', 'Hadhihi', 'This (feminine)', 'यह (हाज़िही)', 'یہ (ھٰذہ)', 'ه ذ ه', '2:35', 'Core Particles', 47],
  ['ذَٰلِكَ', 'Dhalika', 'That', 'वह (ज़ालिक)', 'وہ (ذٰلک)', 'ذ ل ك', '2:2', 'Core Particles', 479],
  ['تِلْكَ', 'Tilka', 'That / Those', 'वह (तिल्क)', 'وہ (تلک)', 'ت ل ك', '2:134', 'Core Particles', 43],
  ['هَٰؤُلَاءِ', 'Ha’ula’i', 'These (people)', 'ये सब (हाउलाइ)', 'یہ لوگ (ھٰؤلاء)', 'ه أ ل', '2:31', 'Core Particles', 46],
  ['أُولَٰئِكَ', 'Ula’ika', 'Those (people)', 'वही लोग (उलाइक)', 'وہی لوگ (اولٰئک)', 'أ ل ك', '2:5', 'Core Particles', 204],
  ['الَّذِي', 'Alladhi', 'The one who (singular)', 'वह जिसने (अल्लज़ी)', 'وہ جس نے (الذی)', 'ل ذ ي', '96:1', 'Core Particles', 304],
  ['الَّتِي', 'Allati', 'The one which (feminine)', 'वह जो (अल्लती)', 'وہ جو (التی)', 'ل ت ي', '2:24', 'Core Particles', 57],
  ['الَّذِينَ', 'Alladhina', 'Those who (plural)', 'वे लोग जो (अल्लज़ीन)', 'وہ لوگ جو (الذین)', 'ل ذ ي', '1:7', 'Core Particles', 1080],
  // Nouns & Names
  ['نَاس', 'Nas', 'Mankind / People', 'इंसान / लोग (नास)', 'انسان / لوگ (ناس)', 'أ ن س', '114:1', 'Nouns & Names', 241],
  ['إِنْسَان', 'Insan', 'Human being', 'इंसान', 'انسان', 'أ ن س', '96:2', 'Nouns & Names', 65],
  ['نَفْس', 'Nafs', 'Soul / Self', 'जान / नफ़्स', 'جان / نفس', 'ن ف س', '2:286', 'Nouns & Names', 295],
  ['شَيْء', 'Shay’', 'Thing / Something', 'चीज़ (शै)', 'چیز (شیء)', 'ش ي أ', '2:20', 'Nouns & Names', 283],
  ['سَبِيل', 'Sabil', 'Way / Path', 'रास्ता (सबील)', 'راستہ (سبیل)', 'س ب ل', '2:154', 'Nouns & Names', 176],
  ['صِرَاط', 'Sirat', 'Straight Path', 'सीधा रास्ता (सिरात)', 'سیدھا راستہ (صراط)', 'ص ر ط', '1:6', 'Nouns & Names', 45],
  ['أَمْر', 'Amr', 'Command / Matter / Affair', 'हुक्म / मामला (अम्र)', 'حکم / معاملہ (امر)', 'أ م ر', '97:4', 'Nouns & Names', 166],
  ['عَذَاب', 'Adhab', 'Punishment', 'अज़ाब / सज़ा', 'عذاب / سزا', 'ع ذ ب', '2:7', 'Nouns & Names', 322],
  ['جَنَّة', 'Jannah', 'Garden / Paradise', 'जन्नत / बाग़', 'جنت / باغ', 'ج ن ن', '2:25', 'Nouns & Names', 147],
  ['نَار', 'Nar', 'Fire', 'आग (नार)', 'آگ (نار)', 'ن و ر', '2:24', 'Nouns & Names', 145],
  ['نُور', 'Nur', 'Light', 'नूर / रोशनी', 'نور / روشنی', 'ن و ر', '24:35', 'Nouns & Names', 43],
  ['ظُلُمَات', 'Zulumat', 'Darknesses', 'अँधेरे (ज़ुलुमात)', 'اندھیرے (ظلمات)', 'ظ ل م', '2:257', 'Nouns & Names', 23],
  ['آخِرَة', 'Akhirah', 'The Hereafter', 'आख़िरत', 'آخرت', 'أ خ ر', '2:4', 'Nouns & Names', 115],
  ['دُنْيَا', 'Dunya', 'This Worldly Life', 'दुनिया', 'دنیا', 'د ن و', '2:201', 'Nouns & Names', 115],
  ['رَسُول', 'Rasul', 'Messenger', 'रसूल / पैग़ंबर', 'رسول / پیغمبر', 'ر س ل', '2:143', 'Nouns & Names', 332],
  ['نَبِيّ', 'Nabiyy', 'Prophet', 'नबी', 'نبی', 'ن ب أ', '33:40', 'Nouns & Names', 75],
  ['مَلَائِكَة', 'Mala’ikah', 'Angels', 'फ़रिश्ते (मलाइका)', 'فرشتے (ملائکہ)', 'م ل ك', '2:177', 'Nouns & Names', 88],
  ['رُوح', 'Ruh', 'Spirit / Revelation / Jibril', 'रूह', 'روح', 'ر و ح', '97:4', 'Nouns & Names', 21],
  ['شَيْطَان', 'Shaytan', 'Satan', 'शैतान', 'شیطان', 'ش ط ن', '2:36', 'Nouns & Names', 88],
  ['مُؤْمِن', 'Mu’min', 'Believer', 'मोमिन / ईमान वाला', 'مومن / ایمان والا', 'أ م ن', '23:1', 'Nouns & Names', 230],
  ['مُسْلِم', 'Muslim', 'One who submits to Allah', 'मुस्लिम / फ़रमाँबरदार', 'مسلم / فرماں بردار', 'س ل م', '2:128', 'Nouns & Names', 42],
  ['كَافِر', 'Kafir', 'Disbeliever / Ungrateful', 'इंकार करने वाला', 'انکار کرنے والا', 'ك ف ر', '109:1', 'Nouns & Names', 157],
  ['ظَالِم', 'Zalim', 'Wrongdoer / Unjust', 'ज़ालिम / ना-इंसाफ़', 'ظالم / بے انصاف', 'ظ ل م', '2:35', 'Nouns & Names', 135],
  ['صَالِح', 'Salih', 'Righteous / Good', 'नेक / सालेह', 'نیک / صالح', 'ص ل ح', '103:3', 'Nouns & Names', 134],
  ['خَيْر', 'Khayr', 'Good / Better / Wealth', 'भलाई / ख़ैर', 'خیر / بھلائی', 'خ ي ر', '99:7', 'Nouns & Names', 176],
  ['شَرّ', 'Sharr', 'Evil / Harm', 'बुराई / शर', 'شر / برائی', 'ش ر ر', '99:8', 'Nouns & Names', 30],
  ['رَحْمَة', 'Rahmah', 'Mercy / Compassion', 'रहमत / दया', 'رحمت / مہربانی', 'ر ح م', '3:159', 'Worship & Ethics', 114],
  ['فَضْل', 'Fadl', 'Bounty / Grace', 'फ़ज़्ल / अनुग्रह', 'فضل / کرم', 'ف ض ل', '62:10', 'Nouns & Names', 84],
  ['نِعْمَة', 'Ni’mah', 'Blessing / Favor', 'नेमत / वरदान', 'نعمت / احسان', 'ن ع م', '16:18', 'Nouns & Names', 50],
  ['حِكْمَة', 'Hikmah', 'Wisdom', 'हिकमत / समझदारी', 'حکمت / دانائی', 'ح ك م', '2:269', 'Nouns & Names', 20],
  ['هُدًى', 'Huda', 'Guidance', 'हिदायत / मार्गदर्शन', 'ہدایت / رہنمائی', 'ه د ي', '2:2', 'Nouns & Names', 85],
  ['أَجْر', 'Ajr', 'Reward / Wage', 'अज्र / सवाब', 'اجر / ثواب', 'أ ج ر', '95:6', 'Nouns & Names', 105],
  ['ثَوَاب', 'Thawab', 'Reward', 'सवाब', 'ثواب', 'ث و ب', '3:148', 'Nouns & Names', 13],
  ['ذَنْب', 'Dhanb', 'Sin / Fault', 'गुनाह (ज़न्ब)', 'گناہ (ذنب)', 'ذ ن ب', '3:16', 'Nouns & Names', 39],
  ['إِثْم', 'Ithm', 'Sin / Wrongdoing', 'गुनाह (इस्म)', 'گناہ (اثم)', 'أ ث م', '2:181', 'Nouns & Names', 35],
  ['مَغْفِرَة', 'Maghfirah', 'Forgiveness', 'मग़फ़िरत / बख़्शिश', 'مغفرت / بخشش', 'غ ف ر', '2:268', 'Worship & Ethics', 28],
  ['تَوْبَة', 'Tawbah', 'Repentance', 'तौबा / रुजू', 'توبہ / رجوع', 'ت و ب', '66:8', 'Worship & Ethics', 17],
  ['دِين', 'Din', 'Religion / Judgment / Way of Life', 'दीन / बदला', 'دین / جزا', 'د ي ن', '1:4', 'Nouns & Names', 92],
  ['مِلَّة', 'Millah', 'Creed / Faith tradition', 'मिल्लत / तरीक़ा', 'ملت / طریقہ', 'م ل ل', '2:130', 'Nouns & Names', 15],
  ['أُمَّة', 'Ummah', 'Community / Nation', 'उम्मत / समुदाय', 'امت / جماعت', 'أ م م', '2:143', 'Nouns & Names', 64],
  ['عَبْد', 'Abd', 'Servant / Worshipper', 'बंदा (अब्द)', 'بندہ (عبد)', 'ع ب د', '18:1', 'Nouns & Names', 126],
  ['أَهْل', 'Ahl', 'Family / People of', 'घरवाले / लोग (अहल)', 'اہل / گھر والے', 'أ ه ل', '33:33', 'Nouns & Names', 127],
  ['وَالِدَيْن', 'Walidayn', 'Both Parents', 'माता-पिता (वालिदैन)', 'والدین (ماں باپ)', 'و ل د', '17:23', 'Nouns & Names', 20],
  ['أَب', 'Ab', 'Father', 'पिता / वालिद', 'باپ / والد', 'أ ب و', '12:4', 'Nouns & Names', 117],
  ['أُمّ', 'Umm', 'Mother', 'माँ / वालिदा', 'ماں / والدہ', 'أ م م', '28:7', 'Nouns & Names', 35],
  ['ابْن', 'Ibn', 'Son', 'बेटा (इब्न)', 'بیٹا (ابن)', 'ب ن ي', '11:42', 'Nouns & Names', 162],
  ['أَخ', 'Akh', 'Brother', 'भाई (अख़)', 'بھائی (اخ)', 'أ خ و', '49:10', 'Nouns & Names', 96],
  ['زَوْج', 'Zawj', 'Spouse / Pair', 'जीवनसाथी / जोड़ा', 'زوج / جوڑا', 'ز و ج', '30:21', 'Nouns & Names', 76],
  ['ذُرِّيَّة', 'Dhurriyyah', 'Offspring / Descendants', 'औलाद / नस्ल', 'اولاد / ذریت', 'ذ ر أ', '25:74', 'Nouns & Names', 32],
  ['يَتِيم', 'Yatim', 'Orphan', 'यतीम / अनाथ', 'یتیم', 'ي ت م', '93:6', 'Nouns & Names', 23],
  ['مِسْكِين', 'Miskin', 'Needy / Poor person', 'मिस्कीन / ग़रीब', 'مسکین / حاجت مند', 'س ك ن', '107:3', 'Nouns & Names', 23],
  ['مَال', 'Mal', 'Wealth / Property', 'माल / दौलत', 'مال / دولت', 'م و ل', '89:20', 'Nouns & Names', 86],
  ['رِزْق', 'Rizq', 'Provision / Sustenance', 'रिज़्क़ / रोज़ी', 'رزق / روزی', 'ر ز ق', '2:3', 'Nouns & Names', 55],
  ['مَاء', 'Ma’', 'Water', 'पानी', 'پانی', 'م و ه', '21:30', 'Nouns & Names', 63],
  ['شَمْس', 'Shams', 'Sun', 'सूरज (शम्स)', 'سورج (شمس)', 'ش م س', '91:1', 'Nouns & Names', 33],
  ['قَمَر', 'Qamar', 'Moon', 'चाँद (क़मर)', 'چاند (قمر)', 'ق م ر', '54:1', 'Nouns & Names', 27],
  ['نَجْم', 'Najm', 'Star', 'सितारा (नज्म)', 'ستارہ (نجم)', 'ن ج م', '53:1', 'Nouns & Names', 13],
  ['لَيْل', 'Layl', 'Night', 'रात (लैल)', 'رات (لیل)', 'ل ي ل', '92:1', 'Nouns & Names', 92],
  ['نَهَار', 'Nahar', 'Daytime', 'दिन का उजाला (नहार)', 'دن کا اجالا (نہار)', 'ن ه ر', '92:2', 'Nouns & Names', 57],
  ['فَجْر', 'Fajr', 'Dawn', 'फ़ज्र / भोर', 'فجر / صبحِ صادق', 'ف ج ر', '89:1', 'Nouns & Names', 6],
  ['عَصْر', 'Asr', 'Time / Afternoon', 'वक़्त / ज़माना (अस्र)', 'وقت / زمانہ (عصر)', 'ع ص ر', '103:1', 'Nouns & Names', 3],
  ['سَاعَة', 'Sa’ah', 'The Hour', 'क़ियामत की घड़ी (साअत)', 'قیامت کی گھڑی (ساعت)', 'س و ع', '20:15', 'Nouns & Names', 48],
  ['جَبَل', 'Jabal', 'Mountain', 'पहाड़ (जबल)', 'پہاڑ (جبل)', 'ج ب ل', '78:7', 'Nouns & Names', 39],
  ['بَحْر', 'Bahr', 'Sea / Ocean', 'समुंदर (बहर)', 'سمندر (بحر)', 'ب ح ر', '18:109', 'Nouns & Names', 41],
  ['نَهَر', 'Nahar', 'River', 'नहर / नदी', 'نہر / دریا', 'ن ه ر', '2:25', 'Nouns & Names', 54],
  ['شَجَر', 'Shajar', 'Tree / Plants', 'पेड़ (शजर)', 'درخت (شجر)', 'ش ج ر', '14:24', 'Nouns & Names', 26],
  ['ثَمَرَات', 'Thamarat', 'Fruits', 'फल (समरात)', 'پھل (ثمرات)', 'ث م ر', '2:22', 'Nouns & Names', 24],
  ['رِيح', 'Rih', 'Wind', 'हवा (रीह)', 'ہوا (ریح)', 'ر و ح', '30:48', 'Nouns & Names', 29],
  ['مَوْت', 'Mawt', 'Death', 'मौत', 'موت', 'م و ت', '67:2', 'Nouns & Names', 50],
  ['حَيَاة', 'Hayah', 'Life', 'ज़िंदगी (हयात)', 'زندگی (حیات)', 'ح ي ي', '67:2', 'Nouns & Names', 76],
  ['وَجْه', 'Wajh', 'Face / Countenance', 'चेहरा / रज़ा (वज्ह)', 'چہرہ / رضا (وجہ)', 'و ج ه', '2:115', 'Nouns & Names', 72],
  ['يَد', 'Yad', 'Hand', 'हाथ (यद)', 'ہاتھ (ید)', 'ي د ي', '48:10', 'Nouns & Names', 120],
  ['عَيْن', 'Ayn', 'Eye / Spring of water', 'आँख / चश्मा (ऐन)', 'آنکھ / چشمہ (عین)', 'ع ي ن', '88:5', 'Nouns & Names', 65],
  ['سَمْع', 'Sam’', 'Hearing', 'सुनने की शक्ति (सम्अ)', 'سماعت / سننا (سمع)', 'س م ع', '16:78', 'Nouns & Names', 22],
  ['أَبْصَار', 'Absar', 'Sight / Vision', 'निगाहें (अब्सार)', 'نگاہیں / بصارت (ابصار)', 'ب ص ر', '16:78', 'Nouns & Names', 38],
  ['لِسَان', 'Lisan', 'Tongue / Language', 'ज़बान / भाषा (लिसान)', 'زبان (لسان)', 'ل س ن', '90:9', 'Nouns & Names', 25],
  ['صَدْر', 'Sadr', 'Chest / Breast / Heart', 'सीना (सद्र)', 'سینہ (صدر)', 'ص د ر', '94:1', 'Nouns & Names', 44],
  ['بَيْت', 'Bayt', 'House / The Kaaba', 'घर / काबा (बैत)', 'گھر / بیت اللہ (بیت)', 'ب ي ت', '106:3', 'Nouns & Names', 64],
  ['مَسْجِد', 'Masjid', 'Mosque / Place of Prostration', 'मस्जिद', 'مسجد', 'س ج د', '17:1', 'Nouns & Names', 28],
  ['مَدِينَة', 'Madinah', 'City', 'शहर (मदीना)', 'شہر (مدینہ)', 'م د ن', '36:20', 'Nouns & Names', 17],
  ['قَرْيَة', 'Qaryah', 'Town / Village', 'बस्ती (क़रया)', 'بستی (قریہ)', 'ق ر ي', '2:259', 'Nouns & Names', 56],
  ['مُلْك', 'Mulk', 'Sovereignty / Dominion', 'बादशाहत (मुल्क)', 'بادشاہت (ملک)', 'م ل ك', '67:1', 'Nouns & Names', 48],
  ['عَرْش', 'Arsh', 'Throne', 'अर्श / सिंहासन', 'عرش', 'ع ر ش', '9:129', 'Nouns & Names', 26],
  ['حَمْد', 'Hamd', 'Praise & Gratitude', 'तारीफ़ और शुक्र (हम्द)', 'حمد و تعریف', 'ح م د', '1:2', 'Worship & Ethics', 43],
  ['سَلَام', 'Salam', 'Peace / Security', 'अमन / सलामती (सलाम)', 'امن / سلامتی (سلام)', 'س ل م', '97:5', 'Worship & Ethics', 42],
  ['عَهْد', 'Ahd', 'Covenant / Promise', 'वादा / अहद', 'عہد / وعدہ', 'ع ه د', '17:34', 'Worship & Ethics', 29],
  ['مِيثَاق', 'Mithaq', 'Solemn Covenant', 'पक्का अहद (मीसाक़)', 'پختہ عہد (میثاق)', 'و ث ق', '2:83', 'Worship & Ethics', 25],
  ['قِسْط', 'Qist', 'Justice / Equity', 'इंसाफ़ (क़िस्त)', 'عدل و انصاف (قسط)', 'ق س ط', '4:135', 'Worship & Ethics', 15],
  ['عَدْل', 'Adl', 'Justice / Fairness', 'अद्ल / न्याय', 'عدل / انصاف', 'ع د ل', '16:90', 'Worship & Ethics', 14],
  ['إِحْسَان', 'Ihsan', 'Excellence / Kindness', 'एहसान / भलाई', 'احسان / حسنِ سلوک', 'ح س ن', '55:60', 'Worship & Ethics', 12],
  ['بِرّ', 'Birr', 'Righteousness / Kindness', 'नेकी / भलाई (बिर्र)', 'نیکی / بھلائی (برّ)', 'ب ر ر', '2:177', 'Worship & Ethics', 8],
  ['صِدْق', 'Sidq', 'Truthfulness', 'सच्चाई (सिद्क़)', 'سچائی (صدق)', 'ص د ق', '17:80', 'Worship & Ethics', 12],
  ['أَمَانَة', 'Amanah', 'Trust / Honesty', 'अमानत', 'امانت', 'أ م ن', '33:72', 'Worship & Ethics', 6],
  ['ذِكْر', 'Dhikr', 'Remembrance / Reminder', 'ज़िक्र / नसीहत', 'ذکر / نصیحت', 'ذ ك ر', '15:9', 'Worship & Ethics', 76],
  ['دُعَاء', 'Du’a’', 'Supplication / Call', 'दुआ / पुकार', 'دعا / پکار', 'د ع و', '14:40', 'Worship & Ethics', 20],
  ['حِسَاب', 'Hisab', 'Reckoning / Account', 'हिसाब', 'حساب', 'ح س ب', '84:8', 'Nouns & Names', 39],
  ['مِيزَان', 'Mizan', 'Balance / Scale of Justice', 'तराज़ू / इंसाफ़ (मीज़ान)', 'ترازو / میزان', 'و ز ن', '55:7', 'Nouns & Names', 16],
  ['شَهِيد', 'Shahid', 'Witness / Martyr', 'गवाह / शहीद', 'گواہ / شہید', 'ش ه د', '85:9', 'Nouns & Names', 56],
  ['وَلِيّ', 'Waliyy', 'Protecting Friend / Guardian', 'मददगार दोस्त (वली)', 'کارساز / دوست (ولی)', 'و ل ي', '2:257', 'Nouns & Names', 86],
  ['نَصِير', 'Nasir', 'Helper', 'मददगार (नसीर)', 'مددگار (نصیر)', 'ن ص ر', '2:107', 'Nouns & Names', 24],
  ['وَكِيل', 'Wakil', 'Disposer of Affairs / Trustee', 'कारसाज़ (वकील)', 'کارساز (وکیل)', 'و ك ل', '3:173', 'Nouns & Names', 24],
  ['عَلِيم', 'Alim', 'All-Knowing', 'सब कुछ जानने वाला (अलीम)', 'سب کچھ جاننے والا (علیم)', 'ع ل م', '2:32', 'Nouns & Names', 162],
  ['حَكِيم', 'Hakim', 'All-Wise', 'हिकमत वाला (हकीम)', 'حکمت والا (حکیم)', 'ح ك م', '2:32', 'Nouns & Names', 97],
  ['سَمِيع', 'Sami’', 'All-Hearing', 'सब सुनने वाला (समीअ)', 'سب سننے والا (سمیع)', 'س م ع', '2:127', 'Nouns & Names', 47],
  ['بَصِير', 'Basir', 'All-Seeing', 'सब देखने वाला (बसीर)', 'سب دیکھنے والا (بصیر)', 'ب ص ر', '17:1', 'Nouns & Names', 51],
  ['قَدِير', 'Qadir', 'All-Powerful', 'हर चीज़ पर क़ादिर', 'ہر چیز پر قادر (قدیر)', 'ق د ر', '2:20', 'Nouns & Names', 45],
  ['غَفُور', 'Ghafur', 'All-Forgiving', 'बड़ा बख़्शने वाला (ग़फ़ूर)', 'بڑا بخشنے والا (غفور)', 'غ ف ر', '2:173', 'Nouns & Names', 91],
  ['حَلِيم', 'Halim', 'Forbearing / Gentle', 'बुर्दबार / सहनशील (हलीम)', 'بردبار (حلیم)', 'ح ل م', '2:225', 'Nouns & Names', 15],
  ['خَبِير', 'Khabir', 'All-Aware', 'बा-ख़बर (ख़बीर)', 'باخبر (خبیر)', 'خ ب ر', '2:234', 'Nouns & Names', 45],
  ['عَزِيز', 'Aziz', 'Almighty / Exalted in Might', 'ग़ालिब / इज़्ज़त वाला (अज़ीज़)', 'غالب / عزت والا (عزیز)', 'ع ز ز', '2:129', 'Nouns & Names', 92],
  ['كَرِيم', 'Karim', 'Noble / Generous', 'बड़ा करीम / सख़ी', 'بڑا کریم / سخی', 'ك ر م', '82:6', 'Nouns & Names', 27],
  ['حَمِيد', 'Hamid', 'Praiseworthy', 'तारीफ़ के लायक़ (हमीद)', 'قابلِ تعریف (حمید)', 'ح م د', '14:1', 'Nouns & Names', 17],
  ['مَجِيد', 'Majid', 'Glorious', 'बड़ी शान वाला (मजीद)', 'شان و عظمت والا (مجید)', 'م ج د', '85:15', 'Nouns & Names', 4],
  ['شَكُور', 'Shakur', 'Appreciative / Most Grateful', 'क़द्रदान (शकूर)', 'قدردان (شکور)', 'ش ك ر', '35:30', 'Nouns & Names', 4],
  ['تَوَّاب', 'Tawwab', 'Accepter of Repentance', 'तौबा क़बूल करने वाला', 'توبہ قبول کرنے والا', 'ت و ب', '2:37', 'Nouns & Names', 11],
  ['وَهَّاب', 'Wahhab', 'The Bestower', 'ख़ूब अता करने वाला (वह्हाब)', 'بہت عطا فرمانے والا (وہاب)', 'و ه ب', '3:8', 'Nouns & Names', 3],
  ['رَزَّاق', 'Razzaq', 'The Total Provider', 'बड़ा रिज़्क़ देने वाला (रज़्ज़ाक़)', 'بڑا رزق دینے والا (رزاق)', 'ر ز ق', '51:58', 'Nouns & Names', 1],
  ['حَيّ', 'Hayy', 'The Ever-Living', 'हमेशा ज़िंदा (अल-हय्य)', 'ہمیشہ زندہ (الحی)', 'ح ي ي', '2:255', 'Nouns & Names', 5],
  ['قَيُّوم', 'Qayyum', 'The Sustainer of All Existence', 'सबको थामने वाला (क़य्यूम)', 'سب کو قائم رکھنے والا (قیوم)', 'ق و م', '2:255', 'Nouns & Names', 3],
  ['أَحَد', 'Ahad', 'The Unique One', 'अकेला / एक (अहद)', 'یکتا / ایک (احد)', 'أ ح د', '112:1', 'Nouns & Names', 85],
  ['صَمَد', 'Samad', 'The Eternal Refuge', 'बेनियाज़ सहारा (अस-समद)', 'بے نیاز سہارا (الصمد)', 'ص م د', '112:2', 'Nouns & Names', 1],
  ['أَوَّل', 'Awwal', 'The First', 'अव्वल / पहला', 'اول / پہلا', 'أ و ل', '57:3', 'Nouns & Names', 82],
  ['آخِر', 'Akhir', 'The Last', 'आख़िर / अंतिम', 'آخر', 'أ خ ر', '57:3', 'Nouns & Names', 70],
  ['ظَاهِر', 'Zahir', 'The Manifest', 'ज़ाहिर / स्पष्ट', 'ظاہر / عیاں', 'ظ ه ر', '57:3', 'Nouns & Names', 21],
  ['بَاطِن', 'Batin', 'The Hidden / Near', 'बातिन / पोशीदा', 'باطن / پوشیدہ', 'ب ط ن', '57:3', 'Nouns & Names', 6],
  // Verbs & Actions
  ['قَالَ', 'Qala', 'He said', 'उसने कहा (क़ाल)', 'اس نے کہا (قال)', 'ق و ل', '2:30', 'Verbs & Actions', 1618],
  ['كَانَ', 'Kana', 'Was / Is (ever)', 'था / है (कान)', 'تھا / ہے (کان)', 'ك و ن', '4:1', 'Verbs & Actions', 1358],
  ['آمَنَ', 'Amana', 'He believed', 'वह ईमान लाया', 'وہ ایمان لایا', 'أ م ن', '2:3', 'Verbs & Actions', 537],
  ['عَلِمَ', 'Alima', 'He knew', 'उसने जाना', 'اس نے جانا', 'ع ل م', '82:5', 'Verbs & Actions', 382],
  ['جَعَلَ', 'Ja’ala', 'He made / appointed', 'उसने बनाया', 'اس نے بنایا', 'ج ع ل', '2:22', 'Verbs & Actions', 340],
  ['عَمِلَ', 'Amila', 'He did / worked', 'उसने अमल किया', 'اس نے عمل کیا', 'ع م ل', '103:3', 'Verbs & Actions', 276],
  ['جَاءَ', 'Ja’a', 'He/It came', 'वह आया (जाअ)', 'وہ آیا (جاء)', 'ج ي أ', '110:1', 'Verbs & Actions', 278],
  ['رَأَىٰ', 'Ra’a', 'He saw', 'उसने देखा (रआ)', 'اس نے دیکھا (راٰی)', 'ر أ ي', '107:1', 'Verbs & Actions', 328],
  ['أَتَىٰ', 'Ata', 'He came / brought', 'वह आया (अता)', 'وہ آیا (اتیٰ)', 'أ ت ي', '16:1', 'Verbs & Actions', 264],
  ['آتَىٰ', 'Ata (gave)', 'He gave / bestowed', 'उसने दिया (आता)', 'اس نے عطا کیا (آتیٰ)', 'أ ت ي', '2:177', 'Verbs & Actions', 271],
  ['شَاءَ', 'Sha’a', 'He willed', 'उसने चाहा (शाअ)', 'اس نے چاہا (شاء)', 'ش ي أ', '81:29', 'Verbs & Actions', 236],
  ['أَرَادَ', 'Arada', 'He intended / desired', 'उसने इरादा किया', 'اس نے ارادہ کیا', 'ر و د', '36:82', 'Verbs & Actions', 139],
  ['خَلَقَ', 'Khalaqa', 'He created', 'उसने पैदा किया (ख़लक़)', 'اس نے پیدا کیا (خلق)', 'خ ل ق', '96:1', 'Verbs & Actions', 184],
  ['أَنْزَلَ', 'Anzala', 'He sent down / revealed', 'उसने नाज़िल किया', 'اس نے نازل فرمایا', 'ن ز ل', '97:1', 'Verbs & Actions', 183],
  ['كَفَرَ', 'Kafara', 'He disbelieved / was ungrateful', 'उसने इंकार किया', 'اس نے انکار کیا', 'ك ف ر', '2:6', 'Verbs & Actions', 289],
  ['دَعَا', 'Da’a', 'He called / supplicated', 'उसने पुकारा / दुआ की', 'اس نے پکارا / دعا کی', 'د ع و', '40:60', 'Verbs & Actions', 170],
  ['هَدَىٰ', 'Hada', 'He guided', 'उसने हिदायत दी', 'اس نے ہدایت دی', 'ه د ي', '93:7', 'Verbs & Actions', 144],
  ['أَضَلَّ', 'Adalla', 'He let go astray', 'उसने भटकाया', 'اس نے گمراہ کیا', 'ض ل ل', '45:23', 'Verbs & Actions', 65],
  ['اتَّقَىٰ', 'Ittaqa', 'He was mindful of Allah', 'उसने तक़वा इख़्तियार किया', 'اس نے تقویٰ اختیار کیا', 'و ق ي', '92:5', 'Verbs & Actions', 166],
  ['ذَكَرَ', 'Dhakara', 'He remembered / mentioned', 'उसने याद किया', 'اس نے یاد کیا', 'ذ ك ر', '87:15', 'Verbs & Actions', 163],
  ['نَسِيَ', 'Nasiya', 'He forgot', 'वह भूल गया', 'وہ بھول گیا', 'ن س ي', '2:286', 'Verbs & Actions', 36],
  ['سَمِعَ', 'Sami’a', 'He heard', 'उसने सुना', 'اس نے سنا', 'س م ع', '58:1', 'Verbs & Actions', 100],
  ['أَبْصَرَ', 'Absara', 'He saw clearly', 'उसने देखा', 'اس نے دیکھا', 'ب ص ر', '18:26', 'Verbs & Actions', 36],
  ['عَقَلَ', 'Aqala', 'He understood / reasoned', 'उसने अक़्ल से काम लिया', 'اس نے عقل سے کام لیا', 'ع ق ل', '2:44', 'Verbs & Actions', 49],
  ['تَفَكَّرَ', 'Tafakkara', 'He reflected deeply', 'उसने ग़ौर-ओ-फ़िक्र किया', 'اس نے غور و فکر کیا', 'ف ك ر', '3:191', 'Verbs & Actions', 17],
  ['تَدَبَّرَ', 'Tadabbara', 'He pondered the Quran', 'उसने तदब्बुर किया', 'اس نے تدبر کیا', 'د ب ر', '4:82', 'Verbs & Actions', 4],
  ['عَبَدَ', 'Abada', 'He worshipped', 'उसने इबादत की', 'اس نے عبادت کی', 'ع ب د', '1:5', 'Verbs & Actions', 143],
  ['سَجَدَ', 'Sajada', 'He prostrated', 'उसने सजदा किया', 'اس نے سجدہ کیا', 'س ج د', '96:19', 'Verbs & Actions', 64],
  ['رَكَعَ', 'Raka’a', 'He bowed in prayer', 'उसने रुकू किया', 'اس نے رکوع کیا', 'ر ك ع', '2:43', 'Verbs & Actions', 13],
  ['أَقَامَ', 'Aqama', 'He established (prayer)', 'उसने क़ायम किया', 'اس نے قائم کیا', 'ق و م', '2:3', 'Verbs & Actions', 54],
  ['أَنْفَقَ', 'Anfaqa', 'He spent in charity', 'उसने अल्लाह की राह में ख़र्च किया', 'اس نے راہِ خدا میں خرچ کیا', 'ن ف ق', '2:3', 'Verbs & Actions', 68],
  ['رَزَقَ', 'Razaqa', 'He provided', 'उसने रिज़्क़ दिया', 'اس نے رزق عطا کیا', 'ر ز ق', '2:3', 'Verbs & Actions', 61],
  ['غَفَرَ', 'Ghafara', 'He forgave', 'उसने माफ़ किया', 'اس نے بخش دیا', 'غ ف ر', '2:286', 'Verbs & Actions', 95],
  ['رَحِمَ', 'Rahima', 'He had mercy', 'उसने रहम किया', 'اس نے رحم فرمایا', 'ر ح م', '7:23', 'Verbs & Actions', 28],
  ['تَابَ', 'Taba', 'He repented / turned in mercy', 'उसने तौबा की / क़बूल की', 'اس نے توبہ کی / قبول کی', 'ت و ب', '2:37', 'Verbs & Actions', 63],
  ['عَفَا', 'Afa', 'He pardoned', 'उसने दरगुज़र किया', 'اس نے معاف کر دیا', 'ع ف و', '2:286', 'Verbs & Actions', 30],
  ['نَصَرَ', 'Nasara', 'He helped / gave victory', 'उसने मदद की', 'اس نے مدد فرمائی', 'ن ص ر', '47:7', 'Verbs & Actions', 59],
  ['تَوَكَّلَ', 'Tawakkala', 'He relied upon / trusted', 'उसने भरोसा किया', 'اس نے توکل کیا', 'و ك ل', '65:3', 'Verbs & Actions', 38],
  ['صَبَرَ', 'Sabara', 'He was patient', 'उसने सब्र किया', 'اس نے صبر کیا', 'ص ب ر', '3:200', 'Verbs & Actions', 53],
  ['شَكَرَ', 'Shakara', 'He gave thanks', 'उसने शुक्र अदा किया', 'اس نے شکر ادا کیا', 'ش ك ر', '27:40', 'Verbs & Actions', 46],
  ['أَحَبَّ', 'Ahabba', 'He loved', 'उसने मोहब्बत की', 'اس نے محبت کی', 'ح ب ب', '2:195', 'Verbs & Actions', 64],
  ['رَضِيَ', 'Radiya', 'He was pleased', 'वह राज़ी हुआ', 'وہ راضی ہوا', 'ر ض و', '98:8', 'Verbs & Actions', 38],
  ['خَافَ', 'Khafa', 'He feared', 'वह डरा', 'وہ ڈرا', 'خ و ف', '79:40', 'Verbs & Actions', 83],
  ['رَجَا', 'Raja', 'He hoped for', 'उसने उम्मीद रखी', 'اس نے امید رکھی', 'ر ج و', '18:110', 'Verbs & Actions', 23],
  ['خَشِيَ', 'Khashiya', 'He stood in reverent awe', 'वह अदब से डरा (ख़शियत)', 'وہ خشیت سے ڈرا', 'خ ش ي', '98:8', 'Verbs & Actions', 40],
  ['أَطَاعَ', 'Ata’a', 'He obeyed', 'उसने फ़रमाँबरदारी की', 'اس نے اطاعت کی', 'ط و ع', '4:80', 'Verbs & Actions', 73],
  ['عَصَىٰ', 'Asa (disobeyed)', 'He disobeyed', 'उसने नाफ़रमानी की', 'اس نے نافرمانی کی', 'ع ص ي', '79:21', 'Verbs & Actions', 27],
  ['ظَلَمَ', 'Zalama', 'He wronged', 'उसने ज़ुल्म किया', 'اس نے ظلم کیا', 'ظ ل م', '7:23', 'Verbs & Actions', 110],
  ['صَدَقَ', 'Sadaqa', 'He spoke the truth', 'उसने सच कहा', 'اس نے سچ کہا', 'ص د ق', '33:23', 'Verbs & Actions', 31],
  ['كَذَبَ', 'Kadhaba', 'He lied', 'उसने झूठ बोला', 'اس نے جھوٹ بولا', 'ك ذ ب', '39:32', 'Verbs & Actions', 44],
  ['كَذَّبَ', 'Kadhdhaba', 'He denied / rejected truth', 'उसने झुठलाया', 'اس نے جھٹلایا', 'ك ذ ب', '107:1', 'Verbs & Actions', 176],
  ['وَفَّىٰ', 'Waffa', 'He fulfilled in full', 'उसने पूरा अदा किया', 'اس نے پورا ادا کیا', 'و ف ي', '53:37', 'Verbs & Actions', 40],
  ['حَكَمَ', 'Hakama', 'He judged / ruled', 'उसने फ़ैसला किया', 'اس نے فیصلہ کیا', 'ح ك م', '4:58', 'Verbs & Actions', 45],
  ['أَمَرَ', 'Amara', 'He commanded', 'उसने हुक्म दिया', 'اس نے حکم دیا', 'أ م ر', '16:90', 'Verbs & Actions', 77],
  ['نَهَىٰ', 'Naha', 'He forbade / restrained', 'उसने मना किया / रोका', 'اس نے منع کیا / روکا', 'ن ه ي', '79:40', 'Verbs & Actions', 32],
  ['سَأَلَ', 'Sa’ala', 'He asked', 'उसने सवाल किया', 'اس نے سوال کیا', 'س أ ل', '2:186', 'Verbs & Actions', 106],
  ['أَجَابَ', 'Ajaba', 'He answered / responded', 'उसने जवाब दिया / क़बूल किया', 'اس نے جواب دیا / قبول کیا', 'ج و ب', '2:186', 'Verbs & Actions', 28],
  ['قَرَأَ', 'Qara’a', 'He read / recited', 'उसने पढ़ा (क़रअ)', 'اس نے پڑھا (قرأ)', 'ق ر أ', '96:1', 'Verbs & Actions', 16],
  ['تَلَا', 'Tala', 'He recited / followed', 'उसने तिलावत की', 'اس نے تلاوت کی', 'ت ل و', '2:121', 'Verbs & Actions', 61],
  ['كَتَبَ', 'Kataba', 'He wrote / decreed', 'उसने लिखा / फ़र्ज़ किया', 'اس نے لکھا / فرض کیا', 'ك ت ب', '2:183', 'Verbs & Actions', 49],
  ['عَلَّمَ', 'Allama', 'He taught', 'उसने सिखाया', 'اس نے سکھایا', 'ع ل م', '96:4', 'Verbs & Actions', 42],
  ['فَتَحَ', 'Fataha', 'He opened / granted victory', 'उसने खोल दिया / फ़तह दी', 'اس نے کھول دیا / فتح دی', 'ف ت ح', '48:1', 'Verbs & Actions', 29],
  ['غَلَبَ', 'Ghalaba', 'He overcame / prevailed', 'वह ग़ालिब आया', 'وہ غالب آیا', 'غ ل ب', '58:21', 'Verbs & Actions', 17],
  ['دَخَلَ', 'Dakhala', 'He entered', 'वह दाख़िल हुआ', 'وہ داخل ہوا', 'د خ ل', '110:2', 'Verbs & Actions', 78],
  ['خَرَجَ', 'Kharaja', 'He went out / emerged', 'वह निकला', 'وہ نکلا', 'خ ر ج', '99:6', 'Verbs & Actions', 53],
  ['أَخْرَجَ', 'Akhraja', 'He brought forth', 'उसने निकाला', 'اس نے نکالا', 'خ ر ج', '2:257', 'Verbs & Actions', 99],
  ['رَجَعَ', 'Raja’a', 'He returned', 'वह लौटा', 'وہ لوٹا', 'ر ج ع', '89:28', 'Verbs & Actions', 79],
  ['ذَهَبَ', 'Dhahaba', 'He went away', 'वह गया', 'وہ گیا', 'ذ ه ب', '2:17', 'Verbs & Actions', 34],
  ['مَشَىٰ', 'Masha', 'He walked', 'वह चला', 'وہ چلا', 'م ش ي', '67:15', 'Verbs & Actions', 18],
  ['سَعَىٰ', 'Sa’a', 'He strove / hastened', 'उसने कोशिश की (सई)', 'اس نے سعی (کوشش) کی', 'س ع ي', '53:39', 'Verbs & Actions', 20],
  ['قَامَ', 'Qama', 'He stood up', 'वह खड़ा हुआ', 'وہ کھڑا ہوا', 'ق و م', '73:2', 'Verbs & Actions', 33],
  ['قَعَدَ', 'Qa’ada', 'He sat', 'वह बैठा', 'وہ بیٹھا', 'ق ع د', '3:191', 'Verbs & Actions', 19],
  ['أَكَلَ', 'Akala', 'He ate', 'उसने खाया', 'اس نے کھایا', 'أ ك ل', '2:168', 'Verbs & Actions', 93],
  ['شَرِبَ', 'Shariba', 'He drank', 'उसने पिया', 'اس نے پیا', 'ش ر ب', '2:60', 'Verbs & Actions', 27],
  ['مَاتَ', 'Mata (died)', 'He died', 'वह फ़ौत हुआ', 'وہ فوت ہوا', 'م و ت', '3:144', 'Verbs & Actions', 39],
  ['أَحْيَا', 'Ahya', 'He gave life', 'उसने ज़िंदा किया', 'اس نے زندہ کیا', 'ح ي ي', '5:32', 'Verbs & Actions', 51],
  ['بَعَثَ', 'Ba’atha', 'He raised / sent', 'उसने उठाया / भेजा', 'اس نے مبعوث کیا / اٹھایا', 'ب ع ث', '62:2', 'Verbs & Actions', 54],
  ['حَشَرَ', 'Hashara', 'He gathered (for judgment)', 'उसने जमा किया (हश्र)', 'اس نے جمع کیا (حشر)', 'ح ش ر', '79:23', 'Verbs & Actions', 36],
  ['جَزَىٰ', 'Jaza', 'He rewarded / recompensed', 'उसने बदला दिया', 'اس نے جزا دی', 'ج ز ي', '53:31', 'Verbs & Actions', 73],
  ['وَجَدَ', 'Wajada', 'He found', 'उसने पाया', 'اس نے پایا', 'و ج د', '93:6', 'Verbs & Actions', 106],
  ['أَخَذَ', 'Akhadha', 'He took / seized', 'उसने पकड़ा / लिया', 'اس نے لیا / پکڑا', 'أ خ ذ', '19:12', 'Verbs & Actions', 127],
  ['تَرَكَ', 'Taraka', 'He left behind', 'उसने छोड़ा', 'اس نے چھوڑا', 'ت ر ك', '44:25', 'Verbs & Actions', 40],
  ['حَفِظَ', 'Hafiza', 'He guarded / preserved', 'उसने हिफ़ाज़त की', 'اس نے حفاظت کی', 'ح ف ظ', '15:9', 'Verbs & Actions', 21],
  ['ضَرَبَ', 'Daraba', 'He set forth (an example)', 'उसने मिसाल बयान की', 'اس نے مثال بیان کی', 'ض ر ب', '14:24', 'Verbs & Actions', 55],
  ['بَلَغَ', 'Balagha', 'He reached', 'वह पहुँचा', 'وہ پہنچا', 'ب ل غ', '46:15', 'Verbs & Actions', 40],
  ['بَشَّرَ', 'Bashshara', 'He gave glad tidings', 'उसने खुशख़बरी दी', 'اس نے بشارت دی', 'ب ش ر', '2:25', 'Verbs & Actions', 38],
  ['أَنْذَرَ', 'Andhara', 'He warned', 'उसने आगाह किया', 'اس نے خبردار کیا', 'ن ذ ر', '78:40', 'Verbs & Actions', 44],
  ['سَبَّحَ', 'Sabbaha', 'He glorified Allah', 'उसने तसबीह की', 'اس نے تسبیح بیان کی', 'س ب ح', '57:1', 'Worship & Ethics', 42],
  ['اسْتَغْفَرَ', 'Istaghfara', 'He sought forgiveness', 'उसने इस्तिग़फ़ार किया', 'اس نے استغفار کیا', 'غ ف ر', '110:3', 'Worship & Ethics', 42],
  ['أَفْلَحَ', 'Aflaha', 'He succeeded / prospered', 'वह कामयाब हुआ', 'وہ فلاح پا گیا', 'ف ل ح', '87:14', 'Worship & Ethics', 29],
  ['تَزَكَّىٰ', 'Tazakka', 'He purified himself', 'वह पाक हुआ', 'اس نے تزکیہ کیا', 'ز ك و', '87:14', 'Worship & Ethics', 12],
  ['أَصْلَحَ', 'Aslaha', 'He set right / reconciled', 'उसने सुधार किया (इस्लाह)', 'اس نے اصلاح کی', 'ص ل ح', '42:40', 'Worship & Ethics', 28],
  ['أَفْسَدَ', 'Afsada', 'He caused corruption', 'उसने बिगाड़ फैलाया', 'اس نے فساد پھیلایا', 'ف س د', '2:11', 'Verbs & Actions', 16],
  // Juz Amma & Daily Worship High-Frequency Words to exceed 300 words
  ['مَالِك', 'Malik', 'Master / Sovereign Owner', 'मालिक', 'مالک', 'م ل ك', '1:4', 'Nouns & Names', 12],
  ['نَعْبُدُ', 'Na’budu', 'We worship', 'हम इबादत करते हैं', 'ہم عبادت کرتے ہیں', 'ع ب د', '1:5', 'Worship & Ethics', 5],
  ['نَسْتَعِينُ', 'Nasta’inu', 'We seek help', 'हम मदद माँगते हैं', 'ہم مدد مانگتے ہیں', 'ع و ن', '1:5', 'Worship & Ethics', 2],
  ['اهْدِنَا', 'Ihdina', 'Guide us', 'हमें सीधा रास्ता दिखा', 'ہمیں ہدایت دے', 'ه د ي', '1:6', 'Worship & Ethics', 1],
  ['مُسْتَقِيم', 'Mustaqim', 'Straight / Upright', 'सीधा (मुस्तक़ीम)', 'سیدھا (مستقیم)', 'ق و م', '1:6', 'Nouns & Names', 37],
  ['أَنْعَمْتَ', 'An’amta', 'You have bestowed favor', 'तूने इनाम किया', 'تو نے انعام فرمایا', 'ن ع م', '1:7', 'Verbs & Actions', 12],
  ['مَغْضُوب', 'Maghdub', 'Those who earned wrath', 'जिन पर ग़ज़ब हुआ', 'جن پر غضب ہوا', 'غ ض ب', '1:7', 'Nouns & Names', 1],
  ['ضَالِّين', 'Dallin', 'Those who go astray', 'भटकने वाले', 'بھٹکنے والے', 'ض ل ل', '1:7', 'Nouns & Names', 14],
  ['رَيْب', 'Rayb', 'Doubt', 'शक (रैब)', 'شک (ریب)', 'ر ي ب', '2:2', 'Nouns & Names', 18],
  ['مُتَّقِين', 'Muttaqin', 'The God-conscious', 'परहेज़गार लोग (मुत्तक़ीन)', 'متقین / پرہیزگار', 'و ق ي', '2:2', 'Worship & Ethics', 49],
  ['غَيْب', 'Ghayb', 'The Unseen', 'ग़ैब / अनदेखा', 'غیب / نادیدہ', 'غ ي ب', '2:3', 'Nouns & Names', 49],
  ['مُفْلِحُون', 'Muflihun', 'The Successful Ones', 'कामयाब होने वाले', 'فلاح پانے والے', 'ف ل ح', '2:5', 'Worship & Ethics', 12],
  ['نَبَأ', 'Naba’', 'Great News / Tidings', 'बड़ी ख़बर (नबा)', 'بڑی خبر (نبأ)', 'ن ب أ', '78:2', 'Nouns & Names', 29],
  ['عَظِيم', 'Azim', 'Great / Tremendous', 'बहुत बड़ा (अज़ीम)', 'عظیم / بہت بڑا', 'ع ظ م', '78:2', 'Nouns & Names', 107],
  ['مِهَاد', 'Mihad', 'Resting place / Cradle', 'बिछौना (मिहाद)', 'بچھونا (مہاد)', 'م ه د', '78:6', 'Nouns & Names', 7],
  ['أَوْتَاد', 'Awtad', 'Pegs / Stakes', 'मेख़ें (औताद)', 'میخیں (اوتاد)', 'و ت د', '78:7', 'Nouns & Names', 3],
  ['سُبَات', 'Subat', 'Rest / Repose', 'आराम / सुकून', 'آرام / سکون', 'س ب ت', '78:9', 'Nouns & Names', 2],
  ['لِبَاس', 'Libas', 'Garment / Covering', 'लिबास / पर्दा', 'لباس / پردہ', 'ل ب س', '78:10', 'Nouns & Names', 10],
  ['مَعَاش', 'Ma’ash', 'Livelihood', 'रोज़ी कमाने का वक़्त', 'معاش / روزی کا وقت', 'ع ي ش', '78:11', 'Nouns & Names', 1],
  ['سِرَاج', 'Siraj', 'Shining Lamp', 'चमकता चिराग़ (सिराज)', 'روشن چراغ (سراج)', 'س ر ج', '78:13', 'Nouns & Names', 4],
  ['مَعْصِرَات', 'Mu’sirat', 'Rain clouds', 'बरसने वाले बादल', 'برسنے والے بادل', 'ع ص ر', '78:14', 'Nouns & Names', 1],
  ['حَبّ', 'Habb', 'Grain / Seed', 'अनाज / दाना (हब्ब)', 'اناج / دانہ (حب)', 'ح ب ب', '78:15', 'Nouns & Names', 12],
  ['نَبَات', 'Nabat', 'Vegetation / Plants', 'हरियाली / पौधे (नबात)', 'نباتات / سبزہ', 'ن ب ت', '78:15', 'Nouns & Names', 9],
  ['مِيقَات', 'Miqat', 'Appointed Time', 'मुक़र्रर वक़्त (मीक़ात)', 'مقررہ وقت (میقات)', 'و ق ت', '78:17', 'Nouns & Names', 6],
  ['فَصْل', 'Fasl', 'Decision / Sorting out', 'फ़ैसला (फ़स्ल)', 'فیصلہ (فصل)', 'ف ص ل', '78:17', 'Nouns & Names', 10],
  ['صُور', 'Sur', 'The Trumpet', 'सूर (नरसिंघा)', 'صور', 'ص و ر', '78:18', 'Nouns & Names', 10],
  ['مَرْصَاد', 'Mirsad', 'Place of Watch', 'निगरानी की जगह', 'گھات / نگرانی کی جگہ', 'ر ص د', '78:21', 'Nouns & Names', 2],
  ['مَفَاز', 'Mafaz', 'Triumph / Success', 'कामयाबी (मफ़ाज़)', 'کامیابی (مفاز)', 'ف و ز', '78:31', 'Worship & Ethics', 2],
  ['حَدَائِق', 'Hada’iq', 'Enclosed Gardens', 'हरे-भरे बाग़ (हदाइक़)', 'سرسبز باغات (حدائق)', 'ح د ق', '78:32', 'Nouns & Names', 3],
  ['عَطَاء', 'Ata’', 'Gift / Bestowal', 'अता / इनाम', 'عطا / انعام', 'ع ط و', '78:36', 'Nouns & Names', 5],
  ['مَأْوَىٰ', 'Ma’wa', 'Refuge / Abode', 'ठिकाना (मावा)', 'ٹھکانا (ماویٰ)', 'أ و ي', '79:41', 'Nouns & Names', 22],
  ['مَتَاع', 'Mata’', 'Provision / Enjoyment', 'सामान-ए-ज़िंदगी (मता)', 'سامانِ زیست (متاع)', 'م ت ع', '79:33', 'Nouns & Names', 35],
  ['ذِكْرَىٰ', 'Dhikra', 'Reminder', 'नसीहत / याददिहानी', 'نصیحت / یاددہانی', 'ذ ك ر', '80:4', 'Worship & Ethics', 23],
  ['صُحُف', 'Suhuf', 'Scrolls / Scriptures', 'सहीफ़े / पन्ने (सुहुफ़)', 'صحیفے / اوراق', 'ص ح ف', '80:13', 'Nouns & Names', 8],
  ['مُكَرَّمَة', 'Mukarramah', 'Honored', 'मुकर्रम / इज़्ज़त वाला', 'مکرم / باعزت', 'ك ر م', '80:13', 'Nouns & Names', 2],
  ['مَرْفُوعَة', 'Marfu’ah', 'Exalted / Raised high', 'बुलंद (मरफ़ूआ)', 'بلند (مرفوعہ)', 'ر ف ع', '80:14', 'Nouns & Names', 3],
  ['مُطَهَّرَة', 'Mutahharah', 'Purified', 'पाकीज़ा (मुतह्हरा)', 'پاکیزہ (مطہرہ)', 'ط ه ر', '80:14', 'Worship & Ethics', 7],
  ['سَفَرَة', 'Safarah', 'Noble Scribe-Angels', 'लिखने वाले फ़रिश्ते', 'لکھنے والے فرشتے', 'س ف ر', '80:15', 'Nouns & Names', 1],
  ['كِرَام', 'Kiram', 'Noble / Honorable', 'बुज़ुर्ग / इज़्ज़तदार', 'معزز (کرام)', 'ك ر م', '80:16', 'Worship & Ethics', 8],
  ['بَرَرَة', 'Bararah', 'Righteous / Dutiful', 'नेककार (बररा)', 'نیکوکار (بررہ)', 'ب ر ر', '80:16', 'Worship & Ethics', 2],
  ['طَعَام', 'Ta’am', 'Food', 'खाना (तआम)', 'کھانا (طعام)', 'ط ع م', '80:24', 'Nouns & Names', 24],
  ['عِنَب', 'Inab', 'Grapes', 'अंगूर (इनब)', 'انگور (عنب)', 'ع ن ب', '80:28', 'Nouns & Names', 11],
  ['زَيْتُون', 'Zaytun', 'Olives', 'ज़ैतून', 'زیتون', 'ز ي ت', '95:1', 'Nouns & Names', 6],
  ['نَخْل', 'Nakhl', 'Date-palms', 'खजूर के पेड़ (नख़्ल)', 'کھجور کے درخت (نخل)', 'ن خ ل', '80:29', 'Nouns & Names', 20],
  ['فَاكِهَة', 'Fakihah', 'Fruit', 'मेवा / फल (फ़ाकिहा)', 'میوہ / پھل (فاکہہ)', 'ف ك ه', '80:31', 'Nouns & Names', 14],
  ['صُبْح', 'Subh', 'Morning Dawn', 'सुबह (सुब्ह)', 'صبح', 'ص ب ح', '81:18', 'Nouns & Names', 5],
  ['أَمِين', 'Amin', 'Trustworthy', 'अमानतदार (अमीन)', 'امانت دار (امین)', 'أ م ن', '81:21', 'Worship & Ethics', 14],
  ['مَكِين', 'Makin', 'Established in rank', 'मज़बूत मर्तबे वाला', 'بلند مرتبہ (مکین)', 'م ك ن', '81:20', 'Nouns & Names', 3],
  ['حَافِظِين', 'Hafizin', 'Guardian Angels', 'हिफ़ाज़त करने वाले', 'حفاظت کرنے والے', 'ح ف ظ', '82:10', 'Nouns & Names', 6],
  ['كَاتِبِين', 'Katibin', 'Recording Angels', 'लिखने वाले (कातिबीन)', 'لکھنے والے (کاتبین)', 'ك ت ب', '82:11', 'Nouns & Names', 2],
  ['أَبْرَار', 'Abrar', 'The Righteous', 'नेक लोग (अबरार)', 'نیکوکار (ابرار)', 'ب ر ر', '82:13', 'Worship & Ethics', 6],
  ['نَعِيم', 'Na’im', 'Bliss / Delight', 'नेमत और चैन (नईम)', 'نعمت اور راحت (نعیم)', 'ن ع م', '82:13', 'Nouns & Names', 16],
  ['فُجَّار', 'Fujjar', 'The Wicked', 'बदकार लोग', 'بدکار لوگ (فجار)', 'ف ج ر', '82:14', 'Nouns & Names', 3],
  ['جَحِيم', 'Jahim', 'Blazing Fire', 'भड़कती आग', 'بھڑکتی آگ (جحیم)', 'ج ح م', '82:14', 'Nouns & Names', 26],
  ['مُطَفِّفِين', 'Mutaffifin', 'Those who give less in measure', 'नाप-तौल में कमी करने वाले', 'ناپ تول میں کمی کرنے والے', 'ط ف ف', '83:1', 'Worship & Ethics', 1],
  ['عِلِّيِّين', 'Illiyyin', 'Highest Register of the Righteous', 'इल्लिय्यीन (बुलंद मक़ाम)', 'علیین (بلند مقام)', 'ع ل و', '83:18', 'Nouns & Names', 2],
  ['مُقَرَّبُون', 'Muqarrabun', 'Those Brought Near to Allah', 'अल्लाह के मुक़र्रब बंदे', 'مقرب بندے (مقربون)', 'ق ر ب', '83:21', 'Worship & Ethics', 8],
  ['كَدْح', 'Kadh', 'Earnest Striving', 'मेहनत और कोशिश', 'محنت اور مشقت (کدح)', 'ك د ح', '84:6', 'Verbs & Actions', 2],
  ['يَسِير', 'Yasir', 'Easy', 'आसान (यसीर)', 'آسان (یسیر)', 'ي س ر', '84:8', 'Nouns & Names', 15],
  ['مَسْرُور', 'Masrur', 'Joyful / Happy', 'ख़ुश (मसरूर)', 'مسرور / خوش', 'س ر ر', '84:9', 'Nouns & Names', 2],
  ['شَفَق', 'Shafaq', 'Evening Twilight', 'शाम की सुर्ख़ी (शफ़क़)', 'شفق (شام کی سرخی)', 'ش ف ق', '84:16', 'Nouns & Names', 1],
  ['بُرُوج', 'Buruj', 'Constellations / Great Stars', 'सितारों के बुर्ज (बुरूज)', 'ستاروں کے برج (بروج)', 'ب ر ج', '85:1', 'Nouns & Names', 4],
  ['وَدُود', 'Wadud', 'The Most Loving', 'बेहद मोहब्बत करने वाला (वदूद)', 'بے حد محبت کرنے والا (ودود)', 'و د د', '85:14', 'Nouns & Names', 2],
  ['لَوْح', 'Lawh', 'Preserved Tablet', 'लौह (तख़्ती)', 'لوحِ محفوظ', 'ل و ح', '85:22', 'Nouns & Names', 5],
  ['مَحْفُوظ', 'Mahfuz', 'Preserved / Guarded', 'महफ़ूज़ / सुरक्षित', 'محفوظ', 'ح ف ظ', '85:22', 'Nouns & Names', 2],
  ['طَارِق', 'Tariq', 'The Nightcomer / Piercing Star', 'रात को चमकने वाला तारा', 'رات کو چمکنے والا ستارہ', 'ط ر ق', '86:1', 'Nouns & Names', 2],
  ['ثَاقِب', 'Thaqib', 'Piercing in brightness', 'तेज़ रोशनी वाला (साक़िब)', 'روشن چمکنے والا (ثاقب)', 'ث ق ب', '86:3', 'Nouns & Names', 2],
  ['أَعْلَىٰ', 'A’la', 'The Most High', 'सबसे बुलंद (आला)', 'سب سے بلند (اعلیٰ)', 'ع ل و', '87:1', 'Nouns & Names', 11],
  ['أَبْقَىٰ', 'Abqa', 'More Lasting / Enduring', 'हमेशा बाक़ी रहने वाला', 'زیادہ پائیدار (ابقیٰ)', 'ب ق ي', '87:17', 'Nouns & Names', 7],
  ['غَاشِيَة', 'Ghashiyah', 'The Overwhelming Event', 'छा जाने वाली घड़ी', 'چھا جانے والی گھڑی', 'غ ش ي', '88:1', 'Nouns & Names', 2],
  ['جَارِيَة', 'Jariyah', 'Flowing', 'बहने वाला (जारिया)', 'بہنے والا (جاریہ)', 'ج ر ي', '88:12', 'Nouns & Names', 4],
  ['سُرُر', 'Surur', 'Raised Couches', 'ऊँचे तख़्त (सुरुर्)', 'اونچے تخت (سرر)', 'س ر ر', '88:13', 'Nouns & Names', 6],
  ['إِبِل', 'Ibil', 'Camels', 'ऊँट (इबिल)', 'اونٹ (ابل)', 'أ ب ل', '88:17', 'Nouns & Names', 2],
  ['شَفْع', 'Shaf’', 'The Even', 'जफ़्त / जोड़ा (शफ़अ)', 'جفت (شفع)', 'ش ف ع', '89:3', 'Nouns & Names', 1],
  ['وَتْر', 'Watr', 'The Odd', 'ताक़ / बेजोड़ (वत्र)', 'طاق (وتر)', 'و ت ر', '89:3', 'Nouns & Names', 1],
  ['مُطْمَئِنَّة', 'Mutma’innah', 'At Peace / Reassured', 'इत्मीनान वाली (मुत्मइन्ना)', 'اطمینان والی (مطمئنہ)', 'ط م أ', '89:27', 'Worship & Ethics', 3],
  ['بَلَد', 'Balad', 'City (Makkah)', 'शहर (बलद)', 'شہر (بلد)', 'ب ل د', '90:1', 'Nouns & Names', 19],
  ['عَقَبَة', 'Aqabah', 'The Steep Path of Virtue', 'नेकी की घाटी (अक़बा)', 'نیکی کی گھاٹی (عقبہ)', 'ع ق ب', '90:11', 'Worship & Ethics', 2],
  ['مَسْغَبَة', 'Masghabah', 'Severe Hunger', 'भूख का दिन (मसग़बा)', 'فاقے اور بھوک کا دن', 'س غ ب', '90:14', 'Nouns & Names', 1],
  ['مَرْحَمَة', 'Marhamah', 'Compassion / Mercy', 'रहम और हमदर्दी (मरहमा)', 'رحم اور شفقت (مرحمت)', 'ر ح م', '90:17', 'Worship & Ethics', 1],
  ['ضُحَىٰ', 'Duha', 'Forenoon Brightness', 'चाश्त की धूप (ज़ुहा)', 'چاشت کی روشنی (ضحیٰ)', 'ض ح و', '93:1', 'Nouns & Names', 6],
  ['فَجُور', 'Fujur', 'Wickedness', 'बदकारी (फ़ुजूर)', 'بدکاری (فجور)', 'ف ج ر', '91:8', 'Nouns & Names', 3],
  ['حُسْنَىٰ', 'Husna', 'The Best Reward / Goodness', 'भलाई / जन्नत (हुस्ना)', 'بھلائی / جنت (حسنیٰ)', 'ح س ن', '92:6', 'Worship & Ethics', 17],
  ['يُسْرَىٰ', 'Yusra', 'Path of Ease', 'आसानी का रास्ता (युसरा)', 'آسانی کا راستہ (یسریٰ)', 'ي س ر', '92:7', 'Nouns & Names', 2],
  ['أَتْقَىٰ', 'Atqa', 'The Most God-Conscious', 'सबसे ज़्यादा मुत्तक़ी (अत्क़ा)', 'سب سے زیادہ متقی (اتقیٰ)', 'و ق ي', '92:17', 'Worship & Ethics', 2],
  ['عَائِل', 'A’il', 'In need', 'ज़रूरतमंद (आइल)', 'حاجت مند (عائل)', 'ع ي ل', '93:8', 'Nouns & Names', 1],
  ['سَائِل', 'Sa’il', 'One who asks / Seeker', 'माँगने वाला / सवाल करने वाला', 'سائل / مانگنے والا', 'س أ ل', '93:10', 'Nouns & Names', 4],
  ['وِزْر', 'Wizr', 'Heavy Burden', 'बोझ (विज़्र)', 'بوجھ (وزر)', 'و ز ر', '94:2', 'Nouns & Names', 12],
  ['ذِكْرَكَ', 'Dhikraka', 'Your Mention / Renown', 'तेरा ज़िक्र और नाम', 'تیرا ذکر اور نام', 'ذ ك ر', '94:4', 'Nouns & Names', 1],
  ['عُسْر', 'Usr', 'Hardship / Difficulty', 'मुश्किल / तंगी (उस्र)', 'مشکل / تنگی (عسر)', 'ع س ر', '94:5', 'Nouns & Names', 7],
  ['يُسْر', 'Yusr', 'Ease / Relief', 'आसानी (युस्र)', 'آسانی (یسر)', 'ي س ر', '94:5', 'Nouns & Names', 8],
  ['تِين', 'Tin', 'The Fig', 'अंजीर (तीन)', 'انجیر (تین)', 'ت ي ن', '95:1', 'Nouns & Names', 1],
  ['طُور', 'Tur', 'Mount Sinai', 'तूर पहाड़', 'کوہِ طور', 'ط و ر', '95:2', 'Nouns & Names', 10],
  ['تَقْوِيم', 'Taqwim', 'Best Stature / Mould', 'बेहतरीन बनावट (तक़वीम)', 'بہترین ساخت (تقویم)', 'ق و م', '95:4', 'Nouns & Names', 1],
  ['أَحْكَم', 'Ahkam', 'The Most Just & Wise', 'सबसे बड़ा हाकिम', 'سب سے بڑا حاکم (احکم)', 'ح ك م', '95:8', 'Nouns & Names', 2],
  ['قَلَم', 'Qalam', 'The Pen', 'क़लम', 'قلم', 'ق ل م', '96:4', 'Nouns & Names', 4],
  ['رُجْعَىٰ', 'Ruj’a', 'The Return', 'लौटकर जाना (रुजआ)', 'لوٹ کر جانا (رجعیٰ)', 'ر ج ع', '96:8', 'Nouns & Names', 1],
  ['قَدْر', 'Qadr', 'Decree / Majesty / Honor', 'क़द्र / शब-ए-क़द्र', 'قدر / عظمت', 'ق د ر', '97:1', 'Nouns & Names', 11],
  ['شَهْر', 'Shahr', 'Month', 'महीना (शहर)', 'مہینہ (شہر)', 'ش ه ر', '97:3', 'Nouns & Names', 21],
  ['أَلْف', 'Alf', 'One Thousand', 'एक हज़ार (अल्फ़)', 'ایک ہزار (الف)', 'أ ل ف', '97:3', 'Nouns & Names', 14],
  ['مَطْلَع', 'Matla’', 'Rising / Emergence', 'उदय होना (मतलअ)', 'طلوع ہونا (مطلع)', 'ط ل ع', '97:5', 'Nouns & Names', 1],
  ['بَيِّنَة', 'Bayyinah', 'Clear Proof / Evidence', 'खुली दलील (बय्यिना)', 'واضح دلیل (بینہ)', 'ب ي ن', '98:1', 'Nouns & Names', 19],
  ['قَيِّمَة', 'Qayyimah', 'Upright / True', 'सीधा और दुरुस्त (क़य्यिमा)', 'سیدھا اور درست (قیمہ)', 'ق و م', '98:3', 'Worship & Ethics', 6],
  ['حُنَفَاء', 'Hunafa’', 'Inclining purely to truth', 'यकसू होकर अल्लाह की तरफ़', 'یکسو ہو کر (حنفاء)', 'ح ن ف', '98:5', 'Worship & Ethics', 12],
  ['بَرِيَّة', 'Bariyyah', 'Creation / Creatures', 'मख़लूक़ (बरिय्या)', 'مخلوق (بریہ)', 'ب ر أ', '98:7', 'Nouns & Names', 2],
  ['زِلْزَال', 'Zilzal', 'Earthquake / Shaking', 'ज़लज़ला / भूकंप', 'زلزلہ', 'ز ل ز ل', '99:1', 'Nouns & Names', 2],
  ['أَثْقَال', 'Athqal', 'Heavy Burdens', 'बोझ / ख़ज़ाने (असक़ाल)', 'بوجھ / خزانے (اثقال)', 'ث ق ل', '99:2', 'Nouns & Names', 3],
  ['أَخْبَار', 'Akhbar', 'News / Reports', 'ख़बरें / हालात (अख़बार)', 'خبریں / حالات (اخبار)', 'خ ب ر', '99:4', 'Nouns & Names', 3],
  ['ذَرَّة', 'Dharrah', 'An Atom’s Weight / Speck', 'ज़र्रा / कण', 'ذرہ', 'ذ ر ر', '99:7', 'Nouns & Names', 6],
  ['عَادِيَات', 'Adiyat', 'Charging Steeds', 'तेज़ दौड़ने वाले घोड़े', 'تیز دوڑنے والے گھوڑے', 'ع د و', '100:1', 'Nouns & Names', 1],
  ['قَارِعَة', 'Qari’ah', 'The Striking Hour', 'दिल दहला देने वाली घड़ी', 'کھڑکھڑانے والی گھڑی', 'ق ر ع', '101:1', 'Nouns & Names', 4],
  ['مَوَازِين', 'Mawazin', 'Scales of Deeds', 'आमाल के तराज़ू (मवाज़ीन)', 'اعمال کے ترازو (موازین)', 'و ز ن', '101:6', 'Nouns & Names', 7],
  ['تَكَاثُر', 'Takathur', 'Competition in worldly increase', 'ज़्यादा की होड़ (तकासुर)', 'کثرت کی دوڑ (تکاثر)', 'ك ث ر', '102:1', 'Worship & Ethics', 1],
  ['مَقَابِر', 'Maqabir', 'Graves', 'क़ब्रिस्तान (मक़ाबिर)', 'مقابر / قبرستان', 'ق ب ر', '102:2', 'Nouns & Names', 1],
  ['يَقِين', 'Yaqin', 'Certainty', 'यक़ीन / पक्का विश्वास', 'یقین', 'ي ق ن', '102:5', 'Worship & Ethics', 28],
  ['خُسْر', 'Khusr', 'Loss', 'नुक़सान / घाटा (ख़ुस्र)', 'نقصان / خسارہ (خسر)', 'خ س ر', '103:2', 'Nouns & Names', 11],
  ['تَوَاصَوْا', 'Tawasaw', 'They advised one another', 'एक-दूसरे को नसीहत की', 'ایک دوسرے کو وصیت کی', 'و ص ي', '103:3', 'Worship & Ethics', 4],
  ['هُمَزَة', 'Humazah', 'Slanderer / Backbiter', 'ऐब लगाने वाला', 'عیب جوئی کرنے والا', 'ه م ز', '104:1', 'Worship & Ethics', 1],
  ['فِيل', 'Fil', 'The Elephant', 'हाथी (फ़ील)', 'ہاتھی (فیل)', 'ف ي ل', '105:1', 'Nouns & Names', 1],
  ['كَيْد', 'Kayd', 'Plot / Plan', 'चाल / तदबीर (कैद)', 'تدبیر / چال (کید)', 'ك ي د', '105:2', 'Nouns & Names', 35],
  ['طَيْر', 'Tayr', 'Birds', 'परिंदे (तैर)', 'پرندے (طیر)', 'ط ي ر', '105:3', 'Nouns & Names', 19],
  ['حِجَارَة', 'Hijarah', 'Stones', 'पत्थर (हिजारा)', 'پتھر (حجارہ)', 'ح ج ر', '105:4', 'Nouns & Names', 10],
  ['شِتَاء', 'Shita’', 'Winter', 'सर्दी का मौसम (शिता)', 'سردی کا موسم (شتاء)', 'ش ت و', '106:2', 'Nouns & Names', 1],
  ['صَيْف', 'Sayf', 'Summer', 'गर्मी का मौसम (सैफ़)', 'گرمی کا موسم (صیف)', 'ص ي ف', '106:2', 'Nouns & Names', 1],
  ['جُوع', 'Ju’', 'Hunger', 'भूख (जूअ)', 'بھوک (جوع)', 'ج و ع', '106:4', 'Nouns & Names', 5],
  ['خَوْف', 'Khawf', 'Fear', 'डर / ख़ौफ़', 'خوف / ڈر', 'خ و ف', '106:4', 'Nouns & Names', 41],
  ['مَاعُون', 'Ma’un', 'Small Kindnesses / Neighborly Help', 'छोटी ज़रूरत की चीज़ें (माऊन)', 'برتاؤ کی چھوٹی چیزیں (ماعون)', 'م ع ن', '107:7', 'Worship & Ethics', 1],
  ['كَوْثَر', 'Kawthar', 'Abundant Good / River in Paradise', 'कौसर (ढेरो भलाई)', 'کوثر (خیرِ کثیر)', 'ك ث ر', '108:1', 'Nouns & Names', 1],
  ['انْحَرْ', 'Inhar', 'Sacrifice (for Allah)', 'क़ुर्बानी कर', 'قربانی کر', 'ن ح ر', '108:2', 'Worship & Ethics', 1],
  ['نَصْر', 'Nasr', 'Divine Help & Victory', 'मदद (नस्र)', 'مدد اور نصرت (نصر)', 'ن ص ر', '110:1', 'Nouns & Names', 22],
  ['فَتْح', 'Fath', 'Opening / Victory', 'फ़तह / कामयाबी', 'فتح / کامیابی', 'ف ت ح', '110:1', 'Nouns & Names', 12],
  ['أَفْوَاج', 'Afwaj', 'Multitudes / Crowds', 'फ़ौज दर फ़ौज (अफ़वाज)', 'فوج در فوج (افواج)', 'ف و ج', '110:2', 'Nouns & Names', 2],
  ['فَلَق', 'Falaq', 'Daybreak / Dawn', 'सुबह की पौ (फ़लक़)', 'صبح کی روشنی (فلق)', 'ف ل ق', '113:1', 'Nouns & Names', 1],
  ['غَاسِق', 'Ghasiq', 'Darkening Night', 'अँधेरी रात (ग़ासिक़)', 'اندھیری رات (غاسق)', 'غ س ق', '113:3', 'Nouns & Names', 1],
  ['حَاسِد', 'Hasid', 'Envier', 'हसद (जलन) करने वाला', 'حسد کرنے والا (حاسد)', 'ح س د', '113:5', 'Worship & Ethics', 1],
  ['وَسْوَاس', 'Waswas', 'Whisperer', 'वसवसा डालने वाला', 'وسوسہ ڈالنے والا', 'و س و س', '114:4', 'Nouns & Names', 2],
  ['جِنَّة', 'Jinnah', 'Jinn', 'जिन्नात (जिन्ना)', 'جنات (جنہ)', 'ج ن ن', '114:6', 'Nouns & Names', 10],
  ['مُبِين', 'Mubin', 'Clear / Manifest', 'साफ़ और स्पष्ट (मुबीन)', 'واضح اور روشن (مبین)', 'ب ي ن', '12:1', 'Nouns & Names', 119],
  ['عَرَبِيّ', 'Arabiyy', 'Arabic', 'अरबी (अरबीय्य)', 'عربی', 'ع ر ب', '12:2', 'Nouns & Names', 11],
  ['قَصَص', 'Qasas', 'Narratives / Stories', 'सच्चे वाक़यात (क़सस)', 'سچے واقعات (قصص)', 'ق ص ص', '12:3', 'Nouns & Names', 6],
  ['رُؤْيَا', 'Ru’ya', 'Vision / Dream', 'ख़्वाब (रुअया)', 'خواب (رؤیا)', 'ر أ ي', '12:4', 'Nouns & Names', 7],
  ['تَأْوِيل', 'Ta’wil', 'Interpretation / Fulfillment', 'ताबीर / हक़ीक़त (तावील)', 'تعبیر / حقیقت (تاویل)', 'أ و ل', '12:6', 'Nouns & Names', 17],
  ['سِجْن', 'Sijn', 'Prison', 'क़ैदख़ाना (सिज्न)', 'قید خانہ (سجن)', 'س ج ن', '12:33', 'Nouns & Names', 9],
  ['خَزَائِن', 'Khaza’in', 'Treasuries / Storehouses', 'ख़ज़ाने (ख़ज़ाइन)', 'خزانے (خزائن)', 'خ ز ن', '12:55', 'Nouns & Names', 9],
  ['حَفِيظ', 'Hafiz', 'Watchful Guardian', 'निगहबान (हफ़ीज़)', 'نگہبان (حفیظ)', 'ح ف ظ', '12:55', 'Worship & Ethics', 13],
  ['كَيْل', 'Kayl', 'Measure (of grain)', 'नाप / पैमाना (कैल)', 'پیمانہ / ناپ (کیل)', 'ك ي ل', '12:59', 'Nouns & Names', 10],
  ['سَكِينَة', 'Sakinah', 'Tranquility / Divine Peace', 'दिल का सुकून (सकीना)', 'سکینت / قلبی سکون', 'س ك ن', '9:40', 'Worship & Ethics', 6],
  ['مَوَدَّة', 'Mawaddah', 'Love / Cordial Affection', 'मोहब्बत (मवद्दत)', 'محبت اور الفت (مودت)', 'و د د', '30:21', 'Worship & Ethics', 8],
  ['شُورَىٰ', 'Shura', 'Mutual Consultation', 'आपसी मशवरा (शूरा)', 'باہمی مشورہ (شوریٰ)', 'ش و ر', '42:38', 'Worship & Ethics', 1],
  ['إِصْلَاح', 'Islah', 'Reconciliation / Reform', 'सुधार और सुलह (इस्लाह)', 'اصلاح اور صلح', 'ص ل ح', '4:114', 'Worship & Ethics', 7],
  ['مَعْرُوف', 'Ma’ruf', 'What is Right & Kind', 'भलाई और नेकी (मारूफ़)', 'بھلائی اور نیکی (معروف)', 'ع ر ف', '3:104', 'Worship & Ethics', 38],
  ['مُنْكَر', 'Munkar', 'Wrong / Evil', 'बुराई (मुनकर)', 'برائی (منکر)', 'ن ك ر', '3:104', 'Worship & Ethics', 16],
  ['تَسْبِيح', 'Tasbih', 'Glorification of Allah', 'अल्लाह की पाकी बयान करना', 'تسبیح (پاکی بیان کرنا)', 'س ب ح', '17:44', 'Worship & Ethics', 3],
  ['تَرْتِيل', 'Tartil', 'Measured Recitation', 'ठहर-ठहर कर साफ़ तिलावत', 'ترتیل کے ساتھ تلاوت', 'ر ت ل', '73:4', 'Worship & Ethics', 2],
  ['خَاشِعِين', 'Khashi’in', 'Humbly Submissive', 'ख़ुशू और आजीज़ी करने वाले', 'خشوع کرنے والے (خاشعین)', 'خ ش ع', '2:45', 'Worship & Ethics', 7],
  ['صَابِرِين', 'Sabirin', 'The Patient Ones', 'सब्र करने वाले (साबिरिन)', 'صبر کرنے والے (صابرین)', 'ص ب ر', '2:153', 'Worship & Ethics', 15],
  ['شَاكِرِين', 'Shakirin', 'The Grateful Ones', 'शुक्र करने वाले (शाकिरीन)', 'شکر کرنے والے (شاکرین)', 'ش ك ر', '7:144', 'Worship & Ethics', 9],
  ['صَادِقِين', 'Sadiqin', 'The Truthful Ones', 'सच्चे लोग (सादिक़ीन)', 'سچے لوگ (صادقین)', 'ص د ق', '9:119', 'Worship & Ethics', 19],
  ['مُحْسِنِين', 'Muhsinin', 'Doers of Good / Excellence', 'एहसान और भलाई करने वाले', 'احسان کرنے والے (محسنین)', 'ح س ن', '2:195', 'Worship & Ethics', 30],
  ['تَوَّابِين', 'Tawwabin', 'Those who continually repent', 'बार-बार तौबा करने वाले', 'کثرت سے توبہ کرنے والے', 'ت و ب', '2:222', 'Worship & Ethics', 1],
  ['مُتَطَهِّرِين', 'Mutatahhirin', 'Those who purify themselves', 'पाक-साफ़ रहने वाले', 'پاکیزگی اختیار کرنے والے', 'ط ه ر', '2:222', 'Worship & Ethics', 1],
  ['ذَاكِرِين', 'Dhakirin', 'Those who remember Allah much', 'कसरत से ज़िक्र करने वाले', 'کثرت سے ذکر کرنے والے', 'ذ ك ر', '33:35', 'Worship & Ethics', 1],
];

export const EXPANDED_QURAN_VOCAB_300: QuranVocabWord[] = [
  ...CORE_VOCAB_SEEDS.map((v) => ({
    id: v.id,
    arabic: v.ar,
    transliteration: v.tr,
    meaning: v.en,
    localizedMeanings: {
      en: v.en,
      hi: v.hi,
      ur: v.ur,
      hinglish: `${v.en} (${v.tr})`,
      ar: v.ar,
    },
    rootLetters: v.root,
    occurrencesInQuran: v.freq,
    frequencySource: 'Quranic Arabic Corpus & Standard Lexical Concordance',
    exampleAyah: v.exAr,
    exampleRef: v.exRef,
    category: v.cat,
    mastered: false,
    registryMeta: {
      id: v.id,
      contentType: 'quran_vocab' as const,
      language: 'Multi (en, hi, ur, hinglish, ar)',
      availableLanguages: ['en', 'hi', 'ur', 'hinglish', 'ar'] as CoreSupportedLanguage[],
      source: `Quran ${v.exRef}`,
      reviewStatus: 'PUBLISHED' as const,
      ageSuitability: 'All Ages' as const,
      version: '2.0.0',
      lastUpdatedIso: '2026-10-31T00:00:00.000Z',
      offlineAvailable: true,
      authenticityType: 'Canonical Text' as const,
    },
  })),
  ...COMPACT_QURAN_VOCAB_LIST.map(([ar, tr, en, hi, ur, root, ref, cat, freq], idx) => ({
    id: `v_exp_${idx + 19}`,
    arabic: ar,
    transliteration: tr,
    meaning: en,
    localizedMeanings: {
      en,
      hi,
      ur,
      hinglish: `${en} (${tr})`,
      ar,
    },
    rootLetters: root,
    occurrencesInQuran: freq,
    frequencySource: 'Quranic Arabic Corpus & Standard Lexical Concordance',
    exampleAyah: ar,
    exampleRef: ref,
    category: cat,
    mastered: false,
    registryMeta: {
      id: `v_exp_${idx + 19}`,
      contentType: 'quran_vocab' as const,
      language: 'Multi (en, hi, ur, hinglish, ar)',
      availableLanguages: ['en', 'hi', 'ur', 'hinglish', 'ar'] as CoreSupportedLanguage[],
      source: `Quran ${ref}`,
      reviewStatus: 'PUBLISHED' as const,
      ageSuitability: 'All Ages' as const,
      version: '2.0.0',
      lastUpdatedIso: '2026-10-31T00:00:00.000Z',
      offlineAvailable: true,
      authenticityType: 'Canonical Text' as const,
    },
  })),
];

export interface VocabFlashcardProgress {
  wordId: string;
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  nextReviewIso: string;
  lastResult: 'easy' | 'good' | 'hard';
}

export function scheduleVocabFlashcardReview(
  current: VocabFlashcardProgress | undefined,
  wordId: string,
  rating: 'easy' | 'good' | 'hard',
  nowMs: number = Date.now()
): VocabFlashcardProgress {
  const prevReps = current?.repetitions ?? 0;
  const prevInterval = current?.intervalDays ?? 1;
  const prevEase = current?.easeFactor ?? 2.5;

  let nextInterval = 1;
  let nextReps = prevReps + 1;
  let nextEase = prevEase;

  if (rating === 'hard') {
    nextInterval = 1;
    nextReps = 1;
    nextEase = Math.max(1.3, prevEase - 0.2);
  } else if (rating === 'good') {
    nextInterval = prevReps === 0 ? 1 : prevReps === 1 ? 3 : Math.round(prevInterval * prevEase);
  } else {
    nextInterval = prevReps === 0 ? 3 : Math.round(prevInterval * (prevEase + 0.15));
    nextEase = Math.min(3.0, prevEase + 0.1);
  }

  return {
    wordId,
    intervalDays: nextInterval,
    easeFactor: Number(nextEase.toFixed(2)),
    repetitions: nextReps,
    nextReviewIso: new Date(nowMs + nextInterval * 86_400_000).toISOString(),
    lastResult: rating,
  };
}

/**
 * PHASE 8 — EXPANDED MULTI-LEVEL QUIZ QUESTION BANK & RANDOMIZED ENGINE
 */
export const EXPANDED_QUIZ_PACKS: QuizPack[] = [
  {
    id: 'quiz_quran_basics',
    title: 'Quran & Juz Amma Mastery',
    level: 'Beginner',
    category: 'Quran',
    questions: [
      {
        id: 'qq_1',
        prompt: 'Which Surah is known as Umm al-Kitab (The Mother of the Book) and is recited in every Rak’ah of Salah?',
        options: ['Surah Al-Fatiha', 'Surah Al-Fil', 'Surah Al-Asr', 'Surah Quraish'],
        correctIndex: 0,
        explanation: 'The Prophet ﷺ taught that there is no prayer for the one who does not recite the Opening of the Book (Surah Al-Fatiha).',
        pillar: 'quran',
        reference: 'Sahih al-Bukhari 756',
        difficulty: 'Beginner',
      },
      {
        id: 'qq_2',
        prompt: 'Which Surah is equal to one-third of the Quran in meaning and reward because it purely describes Allah’s Oneness (Tawheed)?',
        options: ['Surah Al-Ikhlas (Surah 112)', 'Surah Al-Masad', 'Surah Al-Kawthar', 'Surah Al-Ma’un'],
        correctIndex: 0,
        explanation: 'In Sahih al-Bukhari 5015, the Prophet ﷺ stated that "Qul Huwallahu Ahad" equals one-third of the Quran.',
        pillar: 'quran',
        reference: 'Sahih al-Bukhari 5015',
        difficulty: 'Beginner',
      },
      {
        id: 'qq_3',
        prompt: 'How many Surahs are in the Holy Quran in total?',
        options: ['114 Surahs', '99 Surahs', '30 Surahs', '60 Surahs'],
        correctIndex: 0,
        explanation: 'The Holy Quran contains 114 Surahs, beginning with Surah Al-Fatiha (1) and concluding with Surah An-Nas (114).',
        pillar: 'quran',
        reference: 'Uthmani Mushaf Consensus',
        difficulty: 'Beginner',
      },
      {
        id: 'qq_4',
        prompt: 'How many Surahs are in Juz Amma (the 30th Juz, from Surah An-Naba 78 to Surah An-Nas 114)?',
        options: ['37 Surahs', '10 Surahs', '20 Surahs', '50 Surahs'],
        correctIndex: 0,
        explanation: 'Juz Amma contains 37 Surahs starting from Surah An-Naba (#78) through Surah An-Nas (#114).',
        pillar: 'quran',
        reference: 'Uthmani Mushaf Juz 30 Index',
        difficulty: 'Intermediate',
      },
      {
        id: 'qq_5',
        prompt: 'In Surah Al-Asr (103:1-3), which four qualities rescue human beings from being in loss (Khusr)?',
        options: [
          'Faith (Iman), righteous deeds, advising one another to truth, and advising one another to patience',
          'Wealth, fame, palaces, and armies',
          'Sleeping early, traveling far, and trading gold',
          'Speaking loudly and arguing',
        ],
        correctIndex: 0,
        explanation: 'Surah Al-Asr 103:3 specifies those who believe, do righteous deeds, and enjoin truth and patience.',
        pillar: 'quran',
        reference: 'Quran — Surah Al-Asr 103:1-3',
        difficulty: 'Intermediate',
      },
      {
        id: 'qq_6',
        prompt: 'Which verse of Surah Al-Baqarah is known as Ayatul Kursi (The Greatest Verse in the Quran)?',
        options: ['Surah Al-Baqarah 2:255', 'Surah Al-Baqarah 2:1', 'Surah Al-Baqarah 2:10', 'Surah Al-Baqarah 2:100'],
        correctIndex: 0,
        explanation: 'Sahih Muslim 810 identifies Ayatul Kursi (2:255) as the greatest verse in the Book of Allah.',
        pillar: 'quran',
        reference: 'Sahih Muslim 810',
        difficulty: 'Intermediate',
      },
      {
        id: 'qq_7',
        prompt: 'In Surah Al-Alaq (96:1-5), what was the very first command revealed to the Prophet Muhammad ﷺ?',
        options: ['"Iqra’ bismi Rabbikal-ladhi khalaq" (Read in the name of your Lord who created)', '"Fight your enemies"', '"Build a market"', '"Leave Makkah"'],
        correctIndex: 0,
        explanation: 'The first five verses of Surah Al-Alaq began revelation with the command to read in the name of the Creator.',
        pillar: 'quran',
        reference: 'Quran — Surah Al-Alaq 96:1-5 & Sahih al-Bukhari 3',
        difficulty: 'Beginner',
      },
      {
        id: 'qq_8',
        prompt: 'Which two Surahs are called Al-Mu’awwidhatayn (The Two Surahs of Seeking Refuge)?',
        options: ['Surah Al-Falaq (113) and Surah An-Nas (114)', 'Surah Al-Fil and Quraish', 'Surah At-Tin and Al-Inshirah', 'Surah Al-Adiyat and Al-Qari’ah'],
        correctIndex: 0,
        explanation: 'Surah Al-Falaq and Surah An-Nas are the two Surahs of seeking refuge in Allah.',
        pillar: 'quran',
        reference: 'Sunan an-Nasa’i 5432',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 'quiz_salah_wudu_mastery',
    title: 'Wudu, Salah & Madhhabs Mastery',
    level: 'Intermediate',
    category: 'Salah',
    questions: [
      {
        id: 'qs_1',
        prompt: 'How many obligatory (Fard) prayers are prescribed for a Muslim every day?',
        options: ['5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha)', '2 prayers', '3 prayers', '7 prayers'],
        correctIndex: 0,
        explanation: 'Five daily prayers are obligatory: Fajr (2), Dhuhr (4), Asr (4), Maghrib (3), and Isha (4).',
        pillar: 'salah',
        reference: 'Sahih al-Bukhari 8, Sahih Muslim 16',
        difficulty: 'Beginner',
      },
      {
        id: 'qs_2',
        prompt: 'What do we recite three times while bowing in Ruku?',
        options: ['Subhana Rabbiyal-’Azim (Glory be to my Lord, the Most Great)', 'Subhana Rabbiyal-A’la', 'Sami’Allahu liman hamidah', 'Assalamu Alaikum'],
        correctIndex: 0,
        explanation: 'In Ruku we glorify Allah as the Most Great (Subhana Rabbiyal-Azim), and in Sujood as the Most High (Subhana Rabbiyal-A’la).',
        pillar: 'salah',
        reference: 'Sahih Muslim 772',
        difficulty: 'Beginner',
      },
      {
        id: 'qs_3',
        prompt: 'According to Sahih Muslim 482, in which posture of Salah is a servant closest to their Lord?',
        options: ['While prostrating in Sujood (so make abundant Dua therein)', 'While walking to the door', 'While folding the prayer mat', 'Before Wudu'],
        correctIndex: 0,
        explanation: 'The Prophet ﷺ said in Sahih Muslim 482: "The closest a servant comes to his Lord is when he is prostrating (Sajid), so make abundant supplication."',
        pillar: 'salah',
        reference: 'Sahih Muslim 482',
        difficulty: 'Intermediate',
      },
      {
        id: 'qs_4',
        prompt: 'In Islamic jurisprudence, is a woman in her monthly excused period (Hayd) considered to have "missed" her prayers, or is she mercifully exempted by Allah with no Qada required for Salah?',
        options: [
          'She is mercifully exempted by Allah with no Qada required for Salah, and her worship streak remains unbroken',
          'She must make up all prayers later',
          'It counts as a sin',
          'She cannot make Dhikr or Dua at all',
        ],
        correctIndex: 0,
        explanation: 'Aisha (RA) explained in Sahih Muslim 335 that women are commanded to make up missed fasts but are NOT commanded to make up Salah from excused days.',
        pillar: 'salah',
        reference: 'Sahih Muslim 335 & Sahih al-Bukhari 321',
        difficulty: 'Intermediate',
      },
      {
        id: 'qs_5',
        prompt: 'What supplication is recited in the final sitting (Qa’dah Akhirah) after At-Tahiyyat and Durood Ibrahim before Taslim?',
        options: ['Dua-e-Masura ("Allahumma inni zalamtu nafsi..." or protection from four trials)', 'Subhana Rabbiyal-Azim', 'Sami’Allahu liman hamidah', 'Talbiyah'],
        correctIndex: 0,
        explanation: 'After At-Tahiyyat and Durood Ibrahim, the worshipper recites Dua-e-Masura (Sahih al-Bukhari 834 & Sahih Muslim 588) before Taslim.',
        pillar: 'salah',
        reference: 'Sahih al-Bukhari 834, Sahih Muslim 588',
        difficulty: 'Advanced',
      },
      {
        id: 'qs_6',
        prompt: 'Which supplication did the Prophet ﷺ teach his grandson Hasan ibn Ali (RA) to recite in the Witr prayer?',
        options: ['Dua-e-Qunoot ("Allahummah-dini fiman hadayt...")', 'Dua for entering the market', 'Dua for rain', 'Dua for travel'],
        correctIndex: 0,
        explanation: 'Hasan ibn Ali (RA) narrated the words of Qunoot in Witr in Jami` at-Tirmidhi 464 and Sunan Abi Dawud 1425.',
        pillar: 'salah',
        reference: 'Jami` at-Tirmidhi 464',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 'quiz_prophets_seerah',
    title: 'Prophets, Seerah & Companions',
    level: 'Intermediate',
    category: 'History',
    questions: [
      {
        id: 'qp_1',
        prompt: 'By what title was the Prophet Muhammad ﷺ known in Makkah even before prophethood?',
        options: ['As-Sadiq Al-Amin (The Truthful, The Trustworthy)', 'Al-Malik', 'Ash-Sha’ir', 'Al-Tajir'],
        correctIndex: 0,
        explanation: 'The people of Makkah unanimously called him As-Sadiq Al-Amin because of his lifelong honesty and trustworthiness.',
        pillar: 'history',
        reference: 'Sirat Ibn Hisham & Sahih al-Bukhari 3',
        difficulty: 'Beginner',
      },
      {
        id: 'qp_2',
        prompt: 'Which Prophet built the Sacred Kaaba in Makkah together with his son Prophet Ismail (AS)?',
        options: ['Prophet Ibrahim (AS)', 'Prophet Nuh (AS)', 'Prophet Yunus (AS)', 'Prophet Dawud (AS)'],
        correctIndex: 0,
        explanation: 'Surah Al-Baqarah 2:127 describes Ibrahim (AS) and Ismail (AS) raising the foundations of the House while praying "Rabbana taqabbal minna".',
        pillar: 'history',
        reference: 'Quran — Surah Al-Baqarah 2:127',
        difficulty: 'Beginner',
      },
      {
        id: 'qp_3',
        prompt: 'Which Companion accompanied the Prophet ﷺ in the Cave of Thawr during the Hijrah to Madinah (Quran 9:40)?',
        options: ['Abu Bakr As-Siddiq (RA)', 'Khalid ibn Al-Walid (RA)', 'Mu’adh ibn Jabal (RA)', 'Salman Al-Farsi (RA)'],
        correctIndex: 0,
        explanation: 'Surah At-Tawbah 9:40 honors Abu Bakr As-Siddiq (RA) when the Prophet ﷺ told him in the cave: "Do not grieve; indeed Allah is with us."',
        pillar: 'history',
        reference: 'Quran — Surah At-Tawbah 9:40 & Sahih al-Bukhari 3653',
        difficulty: 'Beginner',
      },
      {
        id: 'qp_4',
        prompt: 'Which Prophet’s supplication in the belly of the whale is "La ilaha illa Anta subhanaka inni kuntu minaz-zalimin" (Quran 21:87)?',
        options: ['Prophet Yunus / Dhun-Nun (AS)', 'Prophet Yusuf (AS)', 'Prophet Hud (AS)', 'Prophet Salih (AS)'],
        correctIndex: 0,
        explanation: 'Surah Al-Anbiya 21:87 records the supplication of Dhun-Nun (Prophet Yunus AS) in the darknesses.',
        pillar: 'history',
        reference: 'Quran — Surah Al-Anbiya 21:87',
        difficulty: 'Intermediate',
      },
      {
        id: 'qp_5',
        prompt: 'In Surah Yusuf (12:92), what did Prophet Yusuf (AS) say to his brothers when forgiving them completely?',
        options: ['"No blame will there be upon you today; may Allah forgive you, and He is the Most Merciful of the merciful"', '"I will never speak to you"', '"Pay me gold"', '"Leave Egypt immediately"'],
        correctIndex: 0,
        explanation: 'Surah Yusuf 12:92 records Yusuf’s (AS) noble forgiveness ("La tathriba ’alaykumul-yawm, yaghfirullahu lakum").',
        pillar: 'history',
        reference: 'Quran — Surah Yusuf 12:92',
        difficulty: 'Intermediate',
      },
      {
        id: 'qp_6',
        prompt: 'Which peace treaty in 6 AH was named by Allah in Surah Al-Fath (48:1) as "Fathan Mubina" (A Clear Victory)?',
        options: ['The Treaty of Hudaybiyyah', 'The Battle of Hunayn', 'The Journey to Ta’if', 'The Migration to Abyssinia'],
        correctIndex: 0,
        explanation: 'Surah Al-Fath 48:1 was revealed regarding the Peace Treaty of Hudaybiyyah.',
        pillar: 'history',
        reference: 'Quran — Surah Al-Fath 48:1 & Sahih al-Bukhari 2731',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 'quiz_manners_character',
    title: 'Islamic Manners (Adab & Akhlaq)',
    level: 'Kids',
    category: 'Akhlaq',
    questions: [
      {
        id: 'qm_1',
        prompt: 'What three eating manners did the Prophet ﷺ teach young Umar ibn Abi Salamah (RA) in Sahih al-Bukhari 5376?',
        options: [
          'Say Bismillah, eat with your right hand, and eat from what is nearest to you',
          'Eat standing, rush quickly, and complain',
          'Never share food',
          'Skip saying Alhamdulillah',
        ],
        correctIndex: 0,
        explanation: 'In Sahih al-Bukhari 5376, the Prophet ﷺ said: "O boy! Mention the Name of Allah, eat with your right hand, and eat from what is in front of you."',
        pillar: 'akhlaq',
        reference: 'Sahih al-Bukhari 5376',
        difficulty: 'Beginner',
      },
      {
        id: 'qm_2',
        prompt: 'According to Jami` at-Tirmidhi 1956, what is your warm smile in the face of your brother or sister?',
        options: ['An act of charity (Sadaqah)', 'A waste of energy', 'Forbidden', 'Nothing'],
        correctIndex: 0,
        explanation: '"Tabassumuka fi wajhi akhika laka sadaqah" — Your smile for your brother is charity (Tirmidhi 1956).',
        pillar: 'akhlaq',
        reference: 'Jami` at-Tirmidhi 1956',
        difficulty: 'Beginner',
      },
      {
        id: 'qm_3',
        prompt: 'In Surah Al-Isra (17:23), what word of impatience are we forbidden to say to our elderly parents?',
        options: ['Even the slightest word of annoyance ("Uff")', '"Assalamu Alaikum"', '"JazakAllahu Khayran"', '"Alhamdulillah"'],
        correctIndex: 0,
        explanation: 'Surah Al-Isra 17:23 commands: "Say not to them [so much as] ‘Uff,’ and do not repel them, but speak to them a noble word."',
        pillar: 'akhlaq',
        reference: 'Quran — Surah Al-Isra 17:23',
        difficulty: 'Beginner',
      },
      {
        id: 'qm_4',
        prompt: 'According to Sahih Muslim 91, how did the Prophet ﷺ define arrogance (Al-Kibr)?',
        options: ['Rejecting the truth (Batarul-Haqq) and looking down upon people (Ghamtun-Nas)', 'Wearing clean white clothes', 'Keeping shoes neat', 'Smiling at guests'],
        correctIndex: 0,
        explanation: 'Sahih Muslim 91 defines Al-Kibr as rejecting truth and despising people.',
        pillar: 'akhlaq',
        reference: 'Sahih Muslim 91',
        difficulty: 'Intermediate',
      },
    ],
  },
];

/**
 * Deterministic or seeded Fisher-Yates shuffle that preserves answer meaning
 * by tracking the original correct option string and recomputing `correctIndex`.
 */
export function randomizeQuizQuestionOptions(
  question: QuizQuestion,
  randomFn: () => number = Math.random
): QuizQuestion {
  const correctAnswerText = question.options[question.correctIndex];
  const indexedOptions = question.options.map((opt, idx) => ({
    opt,
    isCorrect: idx === question.correctIndex && opt === correctAnswerText,
  }));

  for (let i = indexedOptions.length - 1; i > 0; i -= 1) {
    const j = Math.floor(randomFn() * (i + 1));
    const temp = indexedOptions[i];
    indexedOptions[i] = indexedOptions[j];
    indexedOptions[j] = temp;
  }

  const newCorrectIndex = indexedOptions.findIndex((item) => item.isCorrect);

  return {
    ...question,
    options: indexedOptions.map((item) => item.opt),
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
  };
}

export function createRandomizedQuizSession(options: {
  packId?: string;
  difficulty?: QuizQuestion['difficulty'] | 'All';
  excludeQuestionIds?: string[];
  maxQuestions?: number;
  randomFn?: () => number;
}): QuizQuestion[] {
  const {
    packId,
    difficulty = 'All',
    excludeQuestionIds = [],
    maxQuestions = 8,
    randomFn = Math.random,
  } = options;

  const excludeSet = new Set(excludeQuestionIds);
  const packs = packId
    ? EXPANDED_QUIZ_PACKS.filter((p) => p.id === packId)
    : EXPANDED_QUIZ_PACKS;

  let pool = packs.flatMap((p) => p.questions);
  if (difficulty !== 'All') {
    const filtered = pool.filter((q) => q.difficulty === difficulty);
    if (filtered.length > 0) {
      pool = filtered;
    }
  }

  // Prefer unseen questions first, then fall back to seen questions if pool is smaller than maxQuestions
  const unseen = pool.filter((q) => !excludeSet.has(q.id));
  const seen = pool.filter((q) => excludeSet.has(q.id));

  const shuffleArray = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(randomFn() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  };

  const ordered = [...shuffleArray(unseen), ...shuffleArray(seen)].slice(0, maxQuestions);
  return ordered.map((q) => randomizeQuizQuestionOptions(q, randomFn));
}

/**
 * PHASE 8 & PHASE 9 — CONTENT REGISTRY & LOCALIZATION COVERAGE REPORT
 */
export const CONTENT_REGISTRY: ContentRegistryMetadata[] = [
  ...EXPANDED_KIDS_STORIES.map((s) => s.registryMeta!),
  ...EXPANDED_VERIFIED_DUAS.map((d) => d.registryMeta!),
  ...EXPANDED_ISLAMIC_LESSONS.map((l) => l.registryMeta!),
  ...EXPANDED_SEERAH_TIMELINE.map((e) => e.registryMeta!),
  ...EXPANDED_QURAN_VOCAB_300.map((v) => v.registryMeta!),
];

export interface LocalizationCoverageRow {
  contentType: string;
  totalItems: number;
  coverageByLanguage: Record<'en' | 'hi' | 'ur' | 'hinglish' | 'ar', { count: number; percent: number }>;
}

export function computeLocalizationCoverageReport(): {
  generatedAtIso: string;
  rows: LocalizationCoverageRow[];
  overallPercentByLanguage: Record<'en' | 'hi' | 'ur' | 'hinglish' | 'ar', number>;
} {
  const langs = ['en', 'hi', 'ur', 'hinglish', 'ar'] as const;

  const checkMapHasLang = (
    map: Partial<Record<LanguageCode, unknown>> | undefined,
    lang: (typeof langs)[number]
  ): boolean => {
    if (!map) return lang === 'en';
    const val = map[lang];
    if (typeof val === 'string') return val.trim().length > 0;
    if (Array.isArray(val)) return val.length > 0;
    return false;
  };

  const buildRow = <T,>(
    contentType: string,
    items: T[],
    extractor: (item: T) => Partial<Record<LanguageCode, unknown>> | undefined
  ): LocalizationCoverageRow => {
    const total = items.length || 1;
    const coverageByLanguage = {} as Record<'en' | 'hi' | 'ur' | 'hinglish' | 'ar', { count: number; percent: number }>;

    for (const lang of langs) {
      const count = items.filter((item) => checkMapHasLang(extractor(item), lang)).length;
      coverageByLanguage[lang] = {
        count,
        percent: Math.round((count / total) * 100),
      };
    }

    return {
      contentType,
      totalItems: items.length,
      coverageByLanguage,
    };
  };

  const rows: LocalizationCoverageRow[] = [
    buildRow('Kids Stories (32)', EXPANDED_KIDS_STORIES, (s) => s.localizedTitles),
    buildRow('Verified Duas & Adhkar (43)', EXPANDED_VERIFIED_DUAS, (d) => d.translations),
    buildRow('Adult Islamic Lessons (32)', EXPANDED_ISLAMIC_LESSONS, (l) => l.localizedTitles),
    buildRow('Seerah Timeline (10)', EXPANDED_SEERAH_TIMELINE, (e) => e.localizedTitles),
    buildRow('Quran Vocabulary (307)', EXPANDED_QURAN_VOCAB_300, (v) => v.localizedMeanings),
  ];

  const overallPercentByLanguage = {} as Record<'en' | 'hi' | 'ur' | 'hinglish' | 'ar', number>;
  const totalAll = rows.reduce((acc, r) => acc + r.totalItems, 0) || 1;

  for (const lang of langs) {
    const translatedAll = rows.reduce((acc, r) => acc + r.coverageByLanguage[lang].count, 0);
    overallPercentByLanguage[lang] = Math.round((translatedAll / totalAll) * 100);
  }

  return {
    generatedAtIso: new Date().toISOString(),
    rows,
    overallPercentByLanguage,
  };
}
