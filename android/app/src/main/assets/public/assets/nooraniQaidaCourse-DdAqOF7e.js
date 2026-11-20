// src/data/nooraniQaidaCourse.ts
var NON_CONNECTING_RIGHT_ONLY_LETTERS = /* @__PURE__ */ new Set([
	"ا",
	"أ",
	"إ",
	"آ",
	"د",
	"ذ",
	"ر",
	"ز",
	"و",
	"ة"
]);
var ARABIC_LETTER_JOIN_FORMS = [
	{
		letter: "ا",
		name: "Alif",
		isolated: "ا",
		initial: "ا",
		medial: "ـا",
		final: "ـا",
		connectsLeft: false,
		audioSlug: "alif"
	},
	{
		letter: "ب",
		name: "Baa",
		isolated: "ب",
		initial: "بـ",
		medial: "ـبـ",
		final: "ـب",
		connectsLeft: true,
		audioSlug: "ba"
	},
	{
		letter: "ت",
		name: "Taa",
		isolated: "ت",
		initial: "تـ",
		medial: "ـتـ",
		final: "ـت",
		connectsLeft: true,
		audioSlug: "ta"
	},
	{
		letter: "ث",
		name: "Thaa",
		isolated: "ث",
		initial: "ثـ",
		medial: "ـثـ",
		final: "ـث",
		connectsLeft: true,
		audioSlug: "tha"
	},
	{
		letter: "ج",
		name: "Jeem",
		isolated: "ج",
		initial: "جـ",
		medial: "ـجـ",
		final: "ـج",
		connectsLeft: true,
		audioSlug: "jeem"
	},
	{
		letter: "ح",
		name: "Haa",
		isolated: "ح",
		initial: "حـ",
		medial: "ـحـ",
		final: "ـح",
		connectsLeft: true,
		audioSlug: "haa"
	},
	{
		letter: "خ",
		name: "Khaa",
		isolated: "خ",
		initial: "خـ",
		medial: "ـخـ",
		final: "ـخ",
		connectsLeft: true,
		audioSlug: "kha"
	},
	{
		letter: "د",
		name: "Daal",
		isolated: "د",
		initial: "د",
		medial: "ـد",
		final: "ـد",
		connectsLeft: false,
		audioSlug: "dal"
	},
	{
		letter: "ذ",
		name: "Dhaal",
		isolated: "ذ",
		initial: "ذ",
		medial: "ـذ",
		final: "ـذ",
		connectsLeft: false,
		audioSlug: "dhal"
	},
	{
		letter: "ر",
		name: "Raa",
		isolated: "ر",
		initial: "ر",
		medial: "ـر",
		final: "ـر",
		connectsLeft: false,
		audioSlug: "ra"
	},
	{
		letter: "ز",
		name: "Zaay",
		isolated: "ز",
		initial: "ز",
		medial: "ـز",
		final: "ـز",
		connectsLeft: false,
		audioSlug: "zay"
	},
	{
		letter: "س",
		name: "Seen",
		isolated: "س",
		initial: "سـ",
		medial: "ـسـ",
		final: "ـس",
		connectsLeft: true,
		audioSlug: "seen"
	},
	{
		letter: "ش",
		name: "Sheen",
		isolated: "ش",
		initial: "شـ",
		medial: "ـشـ",
		final: "ـش",
		connectsLeft: true,
		audioSlug: "sheen"
	},
	{
		letter: "ص",
		name: "Saad",
		isolated: "ص",
		initial: "صـ",
		medial: "ـصـ",
		final: "ـص",
		connectsLeft: true,
		audioSlug: "sad"
	},
	{
		letter: "ض",
		name: "Daad",
		isolated: "ض",
		initial: "ضـ",
		medial: "ـضـ",
		final: "ـض",
		connectsLeft: true,
		audioSlug: "dad"
	},
	{
		letter: "ط",
		name: "Taa",
		isolated: "ط",
		initial: "طـ",
		medial: "ـطـ",
		final: "ـط",
		connectsLeft: true,
		audioSlug: "tah"
	},
	{
		letter: "ظ",
		name: "Zaa",
		isolated: "ظ",
		initial: "ظـ",
		medial: "ـظـ",
		final: "ـظ",
		connectsLeft: true,
		audioSlug: "zah"
	},
	{
		letter: "ع",
		name: "Ayn",
		isolated: "ع",
		initial: "عـ",
		medial: "ـعـ",
		final: "ـع",
		connectsLeft: true,
		audioSlug: "ayn"
	},
	{
		letter: "غ",
		name: "Ghayn",
		isolated: "غ",
		initial: "غـ",
		medial: "ـغـ",
		final: "ـغ",
		connectsLeft: true,
		audioSlug: "ghayn"
	},
	{
		letter: "ف",
		name: "Faa",
		isolated: "ف",
		initial: "فـ",
		medial: "ـفـ",
		final: "ـف",
		connectsLeft: true,
		audioSlug: "fa"
	},
	{
		letter: "ق",
		name: "Qaaf",
		isolated: "ق",
		initial: "قـ",
		medial: "ـقـ",
		final: "ـق",
		connectsLeft: true,
		audioSlug: "qaf"
	},
	{
		letter: "ك",
		name: "Kaaf",
		isolated: "ك",
		initial: "كـ",
		medial: "ـكـ",
		final: "ـك",
		connectsLeft: true,
		audioSlug: "kaf"
	},
	{
		letter: "ل",
		name: "Laam",
		isolated: "ل",
		initial: "لـ",
		medial: "ـلـ",
		final: "ـل",
		connectsLeft: true,
		audioSlug: "lam"
	},
	{
		letter: "م",
		name: "Meem",
		isolated: "م",
		initial: "مـ",
		medial: "ـمـ",
		final: "ـم",
		connectsLeft: true,
		audioSlug: "meem"
	},
	{
		letter: "ن",
		name: "Noon",
		isolated: "ن",
		initial: "نـ",
		medial: "ـنـ",
		final: "ـن",
		connectsLeft: true,
		audioSlug: "noon"
	},
	{
		letter: "ه",
		name: "Haa",
		isolated: "ه",
		initial: "هـ",
		medial: "ـهـ",
		final: "ـه",
		connectsLeft: true,
		audioSlug: "ha"
	},
	{
		letter: "و",
		name: "Waaw",
		isolated: "و",
		initial: "و",
		medial: "ـو",
		final: "ـو",
		connectsLeft: false,
		audioSlug: "waw"
	},
	{
		letter: "ي",
		name: "Yaa",
		isolated: "ي",
		initial: "يـ",
		medial: "ـيـ",
		final: "ـي",
		connectsLeft: true,
		audioSlug: "ya"
	}
];
function buildArabicLetterJoinPreview(letters) {
	const clean = letters.filter(Boolean).slice(0, 4);
	if (clean.length === 0) return {
		joinedWord: "",
		slots: []
	};
	const slots = clean.map((ch, idx) => {
		const meta = ARABIC_LETTER_JOIN_FORMS.find((m) => m.letter === ch);
		const connectsFromPrev = idx > 0 && !NON_CONNECTING_RIGHT_ONLY_LETTERS.has(clean[idx - 1]);
		const connectsToNext = idx < clean.length - 1 && !NON_CONNECTING_RIGHT_ONLY_LETTERS.has(ch);
		let position = "isolated";
		if (!connectsFromPrev && connectsToNext) position = "initial";
		else if (connectsFromPrev && connectsToNext) position = "medial";
		else if (connectsFromPrev && !connectsToNext) position = "final";
		else position = "isolated";
		const contextualGlyph = meta ? meta[position] : ch;
		return {
			letter: ch,
			name: meta?.name || ch,
			position,
			contextualGlyph,
			connectsLeft: meta ? meta.connectsLeft : !NON_CONNECTING_RIGHT_ONLY_LETTERS.has(ch)
		};
	});
	return {
		joinedWord: clean.join(""),
		slots
	};
}
var QAIDA_MODULES = [
	{
		id: "module_1_alphabet",
		order: 1,
		accentHex: "#14532D",
		title: {
			en: "1. Alphabet & Makharij",
			hi: "1. हुरूफ़-ए-मुफ़रदात (28 अक्षर)",
			ur: "1. حروف مفردات اور مخارج",
			hinglish: "1. Alphabet & Makharij (28 Letters)",
			ar: "١. الحروف المفردة والمخارج"
		},
		description: {
			en: "Master the 28 Arabic letters, heavy vs light tones, and throat letters.",
			hi: "28 अरबी हुरूफ़ और उनके सही मखारिज (उच्चारण) सीखें।",
			ur: "28 عربی حروف اور ان کے درست مخارج سیکھیں۔",
			hinglish: "28 Arabic letters aur unka sahi Makhraj (pronunciation) seekhein.",
			ar: "إتقان الحروف العربية الثمانية والعشرين ومخارجها."
		}
	},
	{
		id: "module_2_joining",
		order: 2,
		accentHex: "#15803D",
		title: {
			en: "2. Joining Letters (Murakkabat)",
			hi: "2. मुरक्कबात (अक्षरों को जोड़ना)",
			ur: "2. مرکبات (حروف ملانا)",
			hinglish: "2. Joining Letters (Murakkabat)",
			ar: "٢. الحروف المركبة والاتصال"
		},
		description: {
			en: "See how letters transform at the start, middle, and end of Quranic words.",
			hi: "जानें कि शुरू, बीच और आख़िर में हुरूफ़ की शक्ल कैसे बदलती है।",
			ur: "شروع، درمیان اور آخر میں حروف کی بدلتی شکلیں پہچانیں۔",
			hinglish: "Dekhein letters shuru, beech aur end mein kaise judte hain.",
			ar: "التعرف على أشكال الحروف في أول الكلمة ووسطها وآخرها."
		}
	},
	{
		id: "module_3_harakat",
		order: 3,
		accentHex: "#B45309",
		title: {
			en: "3. Harakat (Zabar, Zer, Pesh)",
			hi: "3. हरकात (ज़बर, ज़ेर, पेश)",
			ur: "3. حرکات (زبر، زیر، پیش)",
			hinglish: "3. Harakat (Zabar, Zer, Pesh)",
			ar: "٣. الحركات (الفتحة والكسرة والضمة)"
		},
		description: {
			en: "Read 3-letter words smoothly using Fatha, Kasra, and Damma vowels.",
			hi: "फ़तहा, कसरा और दम्मा के साथ छोटे अरबी शब्द पढ़ना सीखें।",
			ur: "زبر، زیر اور پیش کے ساتھ قرآنی الفاظ روانی سے پڑھیں۔",
			hinglish: "Zabar, Zer aur Pesh ke saath real Arabic words read karna seekhein.",
			ar: "قراءة الكلمات الثلاثية بالحركات الثلاث."
		}
	},
	{
		id: "module_4_tanween_sukoon",
		order: 4,
		accentHex: "#0F766E",
		title: {
			en: "4. Tanween, Sukoon & Qalqalah",
			hi: "4. तनवीन, सुकून और क़लक़ला",
			ur: "4. تنوین، سکون اور قلقلہ",
			hinglish: "4. Tanween, Sukoon & Qalqalah",
			ar: "٤. التنوين والسكون والقلقلة"
		},
		description: {
			en: "Double vowels (-an, -in, -un), silent stops, and the 5 echoing Qalqalah letters.",
			hi: "दो-ज़बर/ज़ेर/पेश, जज़्म और गूँजने वाले 5 क़लक़ला हुरूफ़ सीखें।",
			ur: "تنوین، جزم اور قلقلہ کے پانچ حروف کی مشق کریں۔",
			hinglish: "Do-Zabar/Zer/Pesh, Sukoon aur bounce karne wale Qalqalah letters.",
			ar: "قواعد التنوين والسكون وحروف القلقلة الخمسة."
		}
	},
	{
		id: "module_5_madd_shaddah",
		order: 5,
		accentHex: "#1D4ED8",
		title: {
			en: "5. Madd & Tashdeed (Shaddah)",
			hi: "5. मद्द और तश्दीद (शद्दा)",
			ur: "5. مد اور تشدید",
			hinglish: "5. Madd (Stretch) & Tashdeed",
			ar: "٥. حروف المد والشدة"
		},
		description: {
			en: "Stretch long vowels cleanly and hold nasal Ghunnah on doubled letters.",
			hi: "लंबी आवाज़ें (मद्द) और तश्दीद वाले शब्दों पर ग़ुन्ना करना सीखें।",
			ur: "حروفِ مدہ کا کھینچنا اور تشدید پر غنہ کی مشق۔",
			hinglish: "Long vowels (Madd) aur doubled letters (Tashdeed + Ghunnah) seekhein.",
			ar: "المد الطبيعي والفرعي والغنة في المشدد."
		}
	},
	{
		id: "module_6_quran_fluency",
		order: 6,
		accentHex: "#16A34A",
		title: {
			en: "6. Quran Fluency & Graduation",
			hi: "6. क़ुरआन पढ़ने की रवानी और इम्तिहान",
			ur: "6. قرآنی روانی اور تکمیل امتحان",
			hinglish: "6. Quran Reading & Final Quiz",
			ar: "٦. الطلاقة القرآنية والاختبار النهائي"
		},
		description: {
			en: "Read complete Surahs word-by-word and earn your Qaida Graduate Certificate!",
			hi: "छोटी सूरतें लफ़्ज़-ब-लफ़्ज़ पढ़ें और क़ायदा सर्टिफ़िकेट हासिल करें!",
			ur: "مختصر سورتیں لفظ بہ لفظ پڑھیں اور قاعدہ سرٹیفکیٹ حاصل کریں!",
			hinglish: "Chhoti Surahs word-by-word padhein aur Qaida Certificate jeetein!",
			ar: "قراءة السور القصيرة كلمة بكلمة ونيل شهادة الإتمام."
		}
	}
];
function ml(en, hi, ur, hinglish, ar) {
	return {
		en,
		hi,
		ur,
		hinglish,
		ar
	};
}
var NOORANI_QAIDA_COURSE_LESSONS = [
	{
		id: "qaida_l01_mufradat",
		lessonNumber: 1,
		moduleId: "module_1_alphabet",
		isFreePreview: true,
		estimatedMinutes: 4,
		starsReward: 5,
		title: ml("Lesson 1: The 28 Alphabet Letters (Mufradat)", "सबक़ 1: 28 अरबी अक्षर (मुफ़रदात)", "سبق 1: حروفِ مفردات (28 حروف)", "Lesson 1: 28 Arabic Letters (Mufradat)", "الدرس ١: الحروف المفردة"),
		subtitle: ml("Recognize & pronounce each letter cleanly", "हर अक्षर को अलग-अलग पहचानें और बोलें", "ہر حرف کو درست آواز سے پہچانیں", "Har letter ko alag-alag pehchanein aur sunein", "التعرف على نطق الحروف مفردة"),
		ruleExplanation: ml("Every letter has an exact exit point (Makhraj). Tap any tile below to hear the isolated letter sound.", "हर अरबी अक्षर का मुँह या गले में एक खास मक़ाम (मख़रज) होता है। सुनने के लिए अक्षर पर टैप करें।", "ہر عربی حرف کا ایک خاص مخرج ہے۔ سننے کے لیے کسی بھی حرف پر ٹیپ کریں۔", "Har Arabic letter ka ek exact Makhraj hota hai. Isolated sound sunne ke liye letter tap karein.", "لكل حرف مخرج دقيق في الفم أو الحلق."),
		tiles: [
			{
				id: "l1_alif",
				arabic: "ا",
				transliteration: "Alif",
				meaning: ml("First letter — straight upright line", "पहला अक्षर — सीधी खड़ी लकीर", "پہلا حرف — سیدھی لکیر", "Pehla letter — seedhi line", "أول الحروف الهجائية"),
				tajweedRuleNote: ml("Empty mouth open sound; never bent", "मुँह खोलकर साफ़ पढ़ें", "منہ کے خلا سے صاف ادا کریں", "Open mouth clean sound", "يخرج من الجوف"),
				letterAudioSlug: "alif",
				quranAyahRef: "1:1",
				globalAyahNumber: 1
			},
			{
				id: "l1_baa",
				arabic: "ب",
				transliteration: "Baa",
				meaning: ml("Boat shape with 1 dot underneath", "कश्ती के नीचे 1 नुक़्ता", "کشتی کے نیچے 1 نقطہ", "Boat ke neeche 1 dot", "نقطة واحدة تحت الحرف"),
				tajweedRuleNote: ml("Press both wet lips gently together", "दोनों होंठ मिलाकर अदा करें", "دونوں ہونٹ ملا کر پڑھیں", "Dono lips touch karke bolein", "من انطباق الشفتين"),
				letterAudioSlug: "ba",
				quranAyahRef: "1:1",
				globalAyahNumber: 1
			},
			{
				id: "l1_taa",
				arabic: "ت",
				transliteration: "Taa",
				meaning: ml("Boat shape with 2 dots inside", "कश्ती के अंदर 2 नुक़्ते", "کشتی کے اندر 2 نقطے", "Boat ke andar 2 dots", "نقطتان فوق الحرف"),
				tajweedRuleNote: ml("Soft tip of tongue behind upper teeth", "ज़ुबान की नोक ऊपर के दांतों की जड़ से", "زبان کی نوک اوپر کے دانتوں کی جڑ سے", "Soft T sound, tongue tip teeth ki jad par", "من طرف اللسان وأصول الثنايا"),
				letterAudioSlug: "ta",
				quranAyahRef: "1:5",
				globalAyahNumber: 5
			},
			{
				id: "l1_thaa",
				arabic: "ث",
				transliteration: "Thaa",
				meaning: ml("Boat shape with 3 dots inside", "कश्ती के अंदर 3 नुक़्ते", "کشتی کے اندر 3 نقطے", "Boat ke andar 3 dots", "ثلاث نقاط فوق الحرف"),
				tajweedRuleNote: ml("Soft lisp — NEVER buzz like Z or S", "नरमी से ज़ुबान दांत के सिरे पर — स न बोलें", "نرمی سے ادا کریں — سین نہ پڑھیں", "Soft tongue tip teeth ke edge par (S nahi)", "حرف لثوي يخرج برفق"),
				letterAudioSlug: "tha",
				quranAyahRef: "102:1",
				globalAyahNumber: 6169
			}
		],
		quiz: {
			prompt: ml("Which letter has 1 dot BELOW the boat?", "किस अक्षर के नीचे 1 नुक़्ता होता है?", "کس حرف کے نیچے 1 نقطہ ہوتا ہے؟", "Kis letter ke neeche 1 dot hota hai?", "أي حرف تحته نقطة واحدة؟"),
			arabicTarget: "؟",
			options: [
				{
					label: "Baa",
					arabic: "ب"
				},
				{
					label: "Taa",
					arabic: "ت"
				},
				{
					label: "Noon",
					arabic: "ن"
				},
				{
					label: "Thaa",
					arabic: "ث"
				}
			],
			correctIndex: 0,
			explanation: ml("Baa (ب) has 1 dot underneath; Noon (ن) has 1 dot above.", "बा (ب) के नीचे 1 नुक़्ता होता है, जबकि नून (ن) के ऊपर 1 नुक़्ता।", "باء کے نیچے 1 نقطہ جبکہ نون کے اوپر 1 نقطہ ہوتا ہے۔", "Baa (ب) ke neeche 1 dot hota hai, Noon (ن) ke upar.", "الباء تحته نقطة والنون فوقه نقطة."),
			letterAudioSlug: "ba"
		}
	},
	{
		id: "qaida_l02_heavy_throat",
		lessonNumber: 2,
		moduleId: "module_1_alphabet",
		isFreePreview: true,
		estimatedMinutes: 4,
		starsReward: 5,
		title: ml("Lesson 2: Heavy Letters & Throat Letters", "सबक़ 2: मोटे अक्षर (तफ़ख़ीम) और गले के अक्षर", "سبق 2: پر حروف اور حروفِ حلقی", "Lesson 2: Heavy (Full-Mouth) & Throat Letters", "الدرس ٢: الحروف المفخمة وحروف الحلق"),
		subtitle: ml("7 Always-Heavy letters (Khussa Daghtin Qiz) + 6 Throat letters", "हमेशा मोटे पढ़े जाने वाले 7 अक्षर और गले के 6 अक्षर", "ہمیشہ پر پڑھے جانے والے 7 حروف اور 6 حلقی حروف", "7 Heavy letters (خ ص ض غ ط ق ظ) aur 6 Throat letters", "حروف الاستعلاء السبعة وحروف الحلق الستة"),
		ruleExplanation: ml("The 7 letters خ ص ض غ ط ق ظ always fill the mouth with a deep rounded echo, unlike light letters.", "ये 7 अक्षर (ख़ साद दाद ग़ैन ता ज़ा क़ाफ़) हमेशा मुँह भरकर मोटे पढ़े जाते हैं।", "یہ 7 حروف ہمیشہ منہ بھر کر پر (موٹے) پڑھے جاتے ہیں۔", "Yeh 7 letters hamesha mooh bhar kar heavy padhe jaate hain: خ ص ض غ ط ق ظ.", "حروف خُصَّ ضَغْطٍ قِظْ تفخم دائماً."),
		tiles: [
			{
				id: "l2_khaa",
				arabic: "خ",
				transliteration: "Khaa (Heavy)",
				meaning: ml("Upper throat heavy letter", "ऊपरी गले से मोटा ख़ा", "اوپری حلق سے موٹا خا", "Upper throat se heavy Khaa", "من أدنى الحلق مفخم"),
				tajweedRuleNote: ml("Do not confuse with soft Haa (ح)", "नरम हा (ح) से अलग, हल्की घर्राहट के साथ", "ح سے الگ، ہلکی خراش کے ساتھ", "Gentle scraping sound from upper throat", "يخرج مع التفخيم"),
				letterAudioSlug: "kha",
				quranAyahRef: "112:1",
				globalAyahNumber: 6222
			},
			{
				id: "l2_saad",
				arabic: "ص",
				transliteration: "Saad (Heavy)",
				meaning: ml("Whistling heavy S", "मोटी सीटी वाला साद", "موٹی سیٹی والا صاد", "Heavy whistling Saad (Seen se alag)", "صاد مفخمة"),
				tajweedRuleNote: ml("Raise back of tongue so it sounds round, not thin like س", "ज़ुबान का पिछला हिस्सा उठाकर मोटा पढ़ें", "زبان کی جڑ اٹھا کر پر پڑھیں", "Back of tongue raise karein — Seen (س) jaisa patla na ho", "استعلاء أقصى اللسان"),
				letterAudioSlug: "sad",
				quranAyahRef: "1:6",
				globalAyahNumber: 6
			},
			{
				id: "l2_ayn",
				arabic: "ع",
				transliteration: "Ayn (Middle Throat)",
				meaning: ml("Deep resonant throat sound", "गले के बीच से गहरा ऐन", "حلق کے درمیان سے عین", "Middle throat se clear Ayn", "من وسط الحلق"),
				tajweedRuleNote: ml("Never pronounce Ayn like a plain Alif (ا)", "अलिफ़ जैसा न पढ़ें, बीच गले से साफ़ निकालें", "ہمزہ یا الف کی طرح نہ پڑھیں", "Alif jaisa mat padhein — middle throat se nikalein", "يميزه مخرج وسط الحلق"),
				letterAudioSlug: "ayn",
				quranAyahRef: "1:5",
				globalAyahNumber: 5
			},
			{
				id: "l2_qaaf",
				arabic: "ق",
				transliteration: "Qaaf (Deep Heavy)",
				meaning: ml("Deep back palate Q", "गहरे तालू से मोटा क़ाफ़", "گہرے تالو سے موٹا قاف", "Deep back tongue se heavy Qaaf", "من أقصى اللسان"),
				tajweedRuleNote: ml("Distinguish heavy Qaaf (ق) from light Kaaf (ك)", "मोटा क़ाफ़ (ق) और पतला काफ़ (ك) में फ़र्क़ रखें", "موٹے قاف اور باریک کاف میں فرق رکھیں", "Qaaf (ق) heavy, Kaaf (ك) light", "قاف مفخم وكاف مرقق"),
				letterAudioSlug: "qaf",
				quranAyahRef: "112:1",
				globalAyahNumber: 6222
			}
		],
		quiz: {
			prompt: ml("Which letter is a deep Throat Letter (Huroof-e-Halqi)?", "इनमें से कौन गले का अक्षर (हर्फ़-ए-हलक़ी) है?", "ان میں سے کون سا حرفِ حلقی ہے؟", "Inme se kaun sa letter Throat Letter (Halqi) hai?", "أي حرف من حروف الحلق؟"),
			arabicTarget: "؟",
			options: [
				{
					label: "Baa",
					arabic: "ب"
				},
				{
					label: "Ayn",
					arabic: "ع"
				},
				{
					label: "Meem",
					arabic: "م"
				},
				{
					label: "Seen",
					arabic: "س"
				}
			],
			correctIndex: 1,
			explanation: ml("Ayn (ع) comes from the middle of the throat! The 6 throat letters are ء ه ع ح غ خ.", "ऐन (ع) बीच गले से निकलता है। 6 गले के अक्षर हैं: ء ه ع ح غ خ।", "عین وسطِ حلق سے ادا ہوتا ہے۔", "Ayn (ع) middle throat se aata hai!", "العين يخرج من وسط الحلق."),
			letterAudioSlug: "ayn"
		}
	},
	{
		id: "qaida_l03_joining_shapes",
		lessonNumber: 3,
		moduleId: "module_2_joining",
		isFreePreview: true,
		hasJoinBuilder: true,
		estimatedMinutes: 5,
		starsReward: 8,
		title: ml("Lesson 3: Initial, Medial & Final Shapes + Live Joiner", "सबक़ 3: अक्षरों की जुड़ने वाली शक्लें (मुरक्कबात)", "سبق 3: حروف کی ابتدائی، درمیانی اور آخری شکلیں", "Lesson 3: How Letters Join (Interactive Builder)", "الدرس ٣: مواضع الحروف في الكلمة"),
		subtitle: ml("Build words by joining 2–3 Arabic letters and watch their shapes change!", "2-3 अक्षर जोड़कर देखें कि अरबी में उनकी शक्ल कैसे बदलती है!", "2 یا 3 حروف ملا کر لفظ بنانا سیکھیں!", "2-3 letters tap karke join karein aur shape change dekhein!", "تركيب الحروف ومشاهدة تغير شكلها"),
		ruleExplanation: ml("22 Arabic letters join on both sides, while 6 Non-Connectors (ا د ذ ر ز و) NEVER join to the letter after them.", "22 अक्षर दोनों तरफ़ जुड़ते हैं, लेकिन 6 अक्षर (ا د ذ ر ز و) अपने बाद वाले अक्षर से कभी नहीं जुड़ते!", "22 حروف دونوں طرف سے ملتے ہیں، مگر 6 حروف (ا د ذ ر ز و) اپنے بعد والے حرف سے نہیں ملتے!", "22 letters dono side judte hain, par 6 Non-Connectors (ا د ذ ر ز و) apne baad wale letter se nahi judte!", "الحروف الستة (ا د ذ ر ز و) لا تتصل بما بعدها."),
		tiles: [
			{
				id: "l3_bism",
				arabic: "بِسْمِ",
				transliteration: "Baa + Seen + Meem",
				meaning: ml("In the name of (1:1)", "के नाम से (1:1)", "کے نام سے (1:1)", "Ke naam se (Bismillah)", "بِسْمِ (١:١)"),
				tajweedRuleNote: ml("Notice Baa (بـ) shrinks to a tooth before Seen (ـسـ)", "देखें بـ छोटा होकर ـسـ से जुड़ गया", "باء اور سین کی درمیانی شکل دیکھیں", "Dekhein بـ chhota hokar ـسـ aur ـم se jud gaya", "اتصال الباء بالسين والميم"),
				wbwWordPath: "wbw/001_001_001.mp3",
				quranAyahRef: "1:1",
				globalAyahNumber: 1,
				breakupLetters: [
					"ب",
					"س",
					"م"
				]
			},
			{
				id: "l3_hamd",
				arabic: "حَمْدُ",
				transliteration: "Haa + Meem + Daal",
				meaning: ml("All praise (1:2)", "सारी तारीफ़ (1:2)", "تمام تعریفیں (1:2)", "Saari tareef (Al-Hamd)", "الْحَمْدُ (١:٢)"),
				tajweedRuleNote: ml("Haa (حـ) keeps its head only, Meem loops, Daal stays non-connecting", "حـ का सिर्फ़ सिर, ـمـ गोल, और ـد आख़िर में जुड़कर रुकता है", "حـ، ـمـ اور ـد کا ملاپ دیکھیں", "Haa + Meem + Daal (Daal ke baad koi nahi judta)", "تغيير شكل الحاء والميم والدال"),
				wbwWordPath: "wbw/001_002_001.mp3",
				quranAyahRef: "1:2",
				globalAyahNumber: 2,
				breakupLetters: [
					"ح",
					"م",
					"د"
				]
			},
			{
				id: "l3_rabb",
				arabic: "رَبِّ",
				transliteration: "Raa + Baa (Non-connector demo)",
				meaning: ml("Lord / Sustainer (1:2)", "रब / पालने वाला (1:2)", "رب / پالنے والا (1:2)", "Rabb / Paalne wala", "رَبِّ (١:٢)"),
				tajweedRuleNote: ml("Raa (ر) NEVER connects left, so Baa (ب) stays full-shaped!", "ر अपने बाद नहीं जुड़ता, इसलिए ب अलग लिखा है!", "راء اپنے بعد نہیں ملتا، اس لیے ب الگ ہے!", "Raa non-connector hai — isliye Baa uske baad alag khada hai!", "الراء لا تتصل بما بعدها"),
				wbwWordPath: "wbw/001_002_003.mp3",
				quranAyahRef: "1:2",
				globalAyahNumber: 2,
				breakupLetters: ["ر", "ب"]
			},
			{
				id: "l3_qul",
				arabic: "قُلْ",
				transliteration: "Qaaf + Laam",
				meaning: ml("Say (112:1)", "कहिए (112:1)", "کہیے (112:1)", "Kahiye (Qul)", "قُلْ (١١٢:١)"),
				tajweedRuleNote: ml("Qaaf initial (قـ) drops its tail and connects straight into Laam (ـل)", "क़ाफ़ की दुम हटकर सीधे लाम से जुड़ती है", "قاف کی شکل بدل کر لام سے ملتی ہے", "Qaaf apni tail chhod kar Laam se judta hai", "اتصال القاف باللام"),
				wbwWordPath: "wbw/112_001_001.mp3",
				quranAyahRef: "112:1",
				globalAyahNumber: 6222,
				breakupLetters: ["ق", "ل"]
			}
		],
		quiz: {
			prompt: ml("Which letter does NOT connect to the letter after it?", "इनमें से कौन सा अक्षर अपने बाद वाले अक्षर से नहीं जुड़ता?", "ان میں سے کون سا حرف اپنے بعد والے حرف سے نہیں ملتا؟", "Inme se kaun sa letter apne baad wale letter se nahi judta?", "أي حرف لا يتصل بالحرف الذي بعده؟"),
			arabicTarget: "؟",
			options: [
				{
					label: "Meem",
					arabic: "م"
				},
				{
					label: "Daal",
					arabic: "د"
				},
				{
					label: "Laam",
					arabic: "ل"
				},
				{
					label: "Seen",
					arabic: "س"
				}
			],
			correctIndex: 1,
			explanation: ml("Daal (د) is one of the 6 non-connectors (ا د ذ ر ز و).", "दाल (د) उन 6 अक्षरों में से है जो बाद में नहीं जुड़ते (ا د ذ ر ز و)।", "دال ان 6 حروف میں سے ہے جو بعد والے حرف سے نہیں ملتے۔", "Daal (د) non-connector hai (ا د ذ ر ز و).", "الدال من الحروف الستة التي لا تتصل بما بعدها."),
			letterAudioSlug: "dal"
		}
	},
	{
		id: "qaida_l04_shams_qamar",
		lessonNumber: 4,
		moduleId: "module_2_joining",
		isFreePreview: false,
		estimatedMinutes: 4,
		starsReward: 8,
		title: ml("Lesson 4: Sun & Moon Letters (Al-Shamsiyyah & Al-Qamariyyah)", "सबक़ 4: शम्सी और क़मरी अक्षर (ٱلْـ)", "سبق 4: حروفِ شمسی و قمری", "Lesson 4: Sun & Moon Letters (Al-)", "الدرس ٤: اللام الشمسية واللام القمرية"),
		subtitle: ml("When to pronounce \"L\" in \"Al-\" vs skipping directly to the next letter", "\"अल\" में लाम कब पढ़ा जाता है और कब साइलेंट रहता है", "\"ال\" میں لام کب پڑھا جائے اور کب مدغم ہو", "\"Al-\" mein Laam kab bolna hai aur kab skip karna hai", "متى تُنطق لام (ال) ومتى تُدغم"),
		ruleExplanation: ml("In Moon letters (ٱلْقَمَرُ), pronounce L clearly. In Sun letters (ٱلشَّمْسِ), skip L and double the next letter!", "क़मरी (चाँद) शब्दों में \"ल\" साफ़ पढ़ें (अल-क़मर)। शम्सी (सूरज) में \"ल\" छोड़ दें (अश्-शम्स)!", "قمری میں لام صاف پڑھیں (القمر) اور شمسی میں لام چھوڑ کر اگلے حرف کو تشدید سے پڑھیں (الشمس)!", "Moon letters (Al-Qamar) mein L bole; Sun letters (Ash-Shams) mein L silent karke next letter double karein!", "اللام القمرية تُظهر واللام الشمسية تُدغم في الحرف التالي."),
		tiles: [
			{
				id: "l4_qamar",
				arabic: "ٱلْقَمَرُ",
				transliteration: "Al-Qamaru (Moon Letter)",
				meaning: ml("The Moon — L is pronounced clearly", "चाँद — लाम साफ़ पढ़ा जाता है", "چاند — لام واضح پڑھا جاتا ہے", "Moon — \"L\" clear sunai deta hai", "القمر — لام قمرية"),
				tajweedRuleNote: ml("Sukoon sits on Laam (لْ)", "लाम पर सुकून है इसलिए \"अल-क़मर\"", "لام پر جزم ہے", "Laam par sukoon hai → Al-Qamar", "إظهار اللام لوجود السكون"),
				wbwWordPath: "wbw/054_001_004.mp3",
				quranAyahRef: "54:1",
				globalAyahNumber: 4847
			},
			{
				id: "l4_shams",
				arabic: "وَٱلشَّمْسِ",
				transliteration: "Wash-Shamsi (Sun Letter)",
				meaning: ml("By the Sun — L melts into Sheen", "सूरज — लाम शीन में मिल गया", "سورج — لام شین میں مدغم ہو گیا", "Sun — \"L\" skip hokar Sh double hua", "الشمس — لام شمسية"),
				tajweedRuleNote: ml("No sukoon on Laam; Shaddah sits on شّ", "शीन पर तश्दीद है इसलिए \"वश-शम्सि\"", "شین پر تشدید ہے", "Laam skip → Wash-Shamsi!", "إدغام اللام في الشين"),
				wbwWordPath: "wbw/091_001_001.mp3",
				quranAyahRef: "91:1",
				globalAyahNumber: 6044
			},
			{
				id: "l4_malik",
				arabic: "ٱلْمَلِكُ",
				transliteration: "Al-Maliku (Moon Letter)",
				meaning: ml("The Sovereign King (59:23)", "बादशाह (59:23)", "بادشاہ (59:23)", "Badshah — Moon Letter (L clear)", "الملك — لام قمرية"),
				tajweedRuleNote: ml("Meem is a Moon letter → Al-Maliku", "मीम क़मरी अक्षर है → अल-मलिकु", "میم قمری حرف ہے", "Meem Moon letter hai → Al-Malik", "الميم حرف قمري"),
				wbwWordPath: "wbw/059_023_008.mp3",
				quranAyahRef: "59:23",
				globalAyahNumber: 5149
			},
			{
				id: "l4_naas",
				arabic: "ٱلنَّاسِ",
				transliteration: "An-Naasi (Sun Letter)",
				meaning: ml("Mankind (114:1)", "इंसान (114:1)", "انسان (114:1)", "Mankind — Sun Letter (An-Naas)", "الناس — لام شمسية"),
				tajweedRuleNote: ml("Skip L, hold Noon Shaddah (نّ) for 2 beats!", "लाम न पढ़ें, نّ पर 2 हरकत ग़ुन्ना करें", "لام چھوڑ کر نّ پر غنہ کریں", "L skip karein, نّ par 2 beats Ghunnah!", "إدغام مع غنة حركتين"),
				wbwWordPath: "wbw/114_001_004.mp3",
				quranAyahRef: "114:1",
				globalAyahNumber: 6231
			}
		],
		quiz: {
			prompt: ml("How do you read ٱلشَّمْسُ?", "ٱلشَّمْسُ को कैसे पढ़ा जाता है?", "ٱلشَّمْسُ کو کیسے پڑھا جاتا ہے؟", "ٱلشَّمْسُ ko kaise padhte hain?", "كيف تُقرأ كلمة الشمس؟"),
			arabicTarget: "ٱلشَّمْسُ",
			options: [
				{
					label: "Al-Shamsu",
					arabic: "أَلْ شَمْسُ"
				},
				{
					label: "Ash-Shamsu",
					arabic: "أَشْـشَمْسُ"
				},
				{
					label: "Il-Shamsu",
					arabic: "إِلْ شَمْسُ"
				},
				{
					label: "La-Shamsu",
					arabic: "لَشَمْسُ"
				}
			],
			correctIndex: 1,
			explanation: ml("Sheen (ش) is a Sun letter, so Laam is skipped: Ash-Shamsu.", "शीन शम्सी अक्षर है, इसलिए लाम साइलेंट रहता है: अश्-शम्सु।", "شین شمسی حرف ہے، اس لیے الشّمس پڑھا جاتا ہے۔", "Sheen Sun letter hai, isliye Laam silent → Ash-Shamsu.", "الشين حرف شمسي فتدغم اللام فيها."),
			globalAyahNumber: 6044
		}
	},
	{
		id: "qaida_l05_compound_words",
		lessonNumber: 5,
		moduleId: "module_2_joining",
		isFreePreview: false,
		hasJoinBuilder: true,
		estimatedMinutes: 4,
		starsReward: 8,
		title: ml("Lesson 5: Reading Joined Letter Skeletons", "सबक़ 5: जुड़े हुए अक्षरों को पहचानना", "سبق 5: جڑے ہوئے حروف کی پہچان", "Lesson 5: Spot Letters Inside Joined Words", "الدرس ٥: تحليل الكلمات المتصلة"),
		subtitle: ml("Break real Quranic words into individual dots & shapes", "क़ुरआनी शब्दों के नुक्ते और शक्ल अलग-अलग पहचानें", "قرآنی الفاظ کے حروف کو الگ الگ پہچانیں", "Real Quranic words ko tod kar unke letters pehchanein", "تفكيك الكلمات القرآنية إلى حروفها"),
		ruleExplanation: ml("Look at the dots (above vs below) to recognize letters quickly inside joined words.", "जुड़े हुए शब्दों में अक्षर पहचानने का सबसे आसान तरीका उनके नुक़्ते (ऊपर/नीचे) देखना है।", "جڑے ہوئے الفاظ میں نقطوں کی مدد سے حروف جلدی پہچانے جا سکتے ہیں۔", "Joined words mein dots (upar ya neeche) dekh kar letter turant pehchanein!", "النقاط فوق الحرف أو تحته تساعد على تمييزه سريعاً."),
		tiles: [
			{
				id: "l5_kataba",
				arabic: "كَتَبَ",
				transliteration: "Kaaf + Taa + Baa",
				meaning: ml("He wrote / prescribed", "उसने लिखा / फ़र्ज़ किया", "اس نے لکھا / فرض کیا", "Likha / Farz kiya", "كَتَبَ"),
				tajweedRuleNote: ml("2 dots top = Taa (ـتـ), 1 dot bottom = Baa (ـب)", "ऊपर 2 नुक़्ते = ت, नीचे 1 नुक़्ता = ب", "اوپر 2 نقطے ت اور نیچے 1 نقطہ ب", "Upar 2 dots = Taa, neeche 1 dot = Baa", "الكاف والتاء والباء"),
				wbwWordPath: "wbw/002_187_031.mp3",
				quranAyahRef: "2:187",
				globalAyahNumber: 194,
				breakupLetters: [
					"ك",
					"ت",
					"ب"
				]
			},
			{
				id: "l5_khalq",
				arabic: "خَلَقَ",
				transliteration: "Khaa + Laam + Qaaf",
				meaning: ml("He created (96:1)", "उसने पैदा किया (96:1)", "اس نے پیدا کیا (96:1)", "Usne paida kiya (96:1)", "خَلَقَ (٩٦:١)"),
				tajweedRuleNote: ml("Khaa (خـ) and Qaaf (ـق) are heavy; Laam (ـلـ) stays light", "ख़ा और क़ाफ़ मोटे हैं, लाम पतला रहेगा", "خ اور ق پر جبکہ ل باریک رہے گا", "Khaa aur Qaaf heavy; beech wala Laam light!", "الخاء والقاف مفخمتان واللام مرققة"),
				wbwWordPath: "wbw/096_001_005.mp3",
				quranAyahRef: "96:1",
				globalAyahNumber: 6107,
				breakupLetters: [
					"خ",
					"ل",
					"ق"
				]
			},
			{
				id: "l5_nasara",
				arabic: "نَصْرُ",
				transliteration: "Noon + Saad + Raa",
				meaning: ml("Help / Victory (110:1)", "मदद / फ़तह (110:1)", "مدد / فتح (110:1)", "Madad / Victory (110:1)", "نَصْرُ"),
				tajweedRuleNote: ml("Noon light (نـ) → Saad heavy (ـصـ) → Raa heavy (ـر)", "ن पतला, ص और ر मोटे", "ن باریک، ص اور ر پر", "Noon light, Saad aur Raa heavy", "النون مرققة والصاد والراء مفخمتان"),
				wbwWordPath: "wbw/110_001_003.mp3",
				quranAyahRef: "110:1",
				globalAyahNumber: 6214,
				breakupLetters: [
					"ن",
					"ص",
					"ر"
				]
			},
			{
				id: "l5_sajada",
				arabic: "وَٱسْجُدْ",
				transliteration: "Seen + Jeem + Daal",
				meaning: ml("And bow in Sujood (96:19)", "और सजदा कीजिए (96:19)", "اور سجدہ کیجیے (96:19)", "Aur Sajda kijiye (96:19)", "وَٱسْجُدْ"),
				tajweedRuleNote: ml("Seen 3 teeth (سـ) + Jeem 1 dot below (ـجـ) + Daal (ـد)", "س के 3 दांत, ج के नीचे 1 नुक़्ता, और د", "س کے تین دندانے، ج کے نیچے نقطہ", "Seen ke 3 teeth + Jeem dot below + Daal", "السين والجيم والدال"),
				wbwWordPath: "wbw/096_019_004.mp3",
				quranAyahRef: "96:19",
				globalAyahNumber: 6125,
				breakupLetters: [
					"س",
					"ج",
					"د"
				]
			}
		],
		quiz: {
			prompt: ml("Which 3 letters make up خَلَقَ ?", "خَلَقَ किन 3 अक्षरों से मिलकर बना है?", "خَلَقَ کن 3 حروف سے بنا ہے؟", "خَلَقَ kin 3 letters se milkar bana hai?", "ما الحروف الثلاثة في كلمة خَلَقَ؟"),
			arabicTarget: "خَلَقَ",
			options: [
				{
					label: "Khaa · Laam · Qaaf",
					arabic: "خ + ل + ق"
				},
				{
					label: "Haa · Meem · Faa",
					arabic: "ح + م + ف"
				},
				{
					label: "Jeem · Laam · Kaaf",
					arabic: "ج + ل + ك"
				},
				{
					label: "Khaa · Alif · Qaaf",
					arabic: "خ + ا + ق"
				}
			],
			correctIndex: 0,
			explanation: ml("1 dot on top of initial hook = خ, tall center line = ل, 2 dots on tail = ق.", "शुरू में 1 नुक़्ता = خ, बीच में लंबी लकीर = ل, आख़िर में 2 नुक़्ते = ق।", "شروع میں خ، درمیان میں ل اور آخر میں ق ہے۔", "خ + ل + ق = خَلَقَ!", "خاء ثم لام ثم قاف."),
			globalAyahNumber: 6107
		}
	},
	{
		id: "qaida_l06_fatha_zabar",
		lessonNumber: 6,
		moduleId: "module_3_harakat",
		isFreePreview: false,
		hasVowelPlayground: true,
		estimatedMinutes: 4,
		starsReward: 10,
		title: ml("Lesson 6: Fatha / Zabar ( ـَ )", "सबक़ 6: ज़बर / फ़तहा ( ـَ )", "سبق 6: زبر / فتحہ ( ـَ )", "Lesson 6: Fatha / Zabar (Short \"a\")", "الدرس ٦: حركة الفتحة"),
		subtitle: ml("Short open \"a\" sound — keep it brisk, never stretch!", "हल्की और तेज़ \"अ\" की आवाज़ — खींचें नहीं!", "مختصر \"ا\" کی آواز — کھینچیں نہیں!", "Chhoti aur crisp \"a\" sound — kheechein nahi!", "صوت قصير مفتوح دون مد"),
		ruleExplanation: ml("Fatha (Zabar) sits ABOVE the letter. Read it quickly in 1 beat (ba, ta, tha), without stretching into baa.", "ज़बर अक्षर के ऊपर आता है। इसे झटके या बिना खींचे 1 हरकत में पढ़ें (ब, त, स)।", "زبر حرف کے اوپر آتا ہے، اسے بغیر کھینچے جلدی ادا کریں۔", "Zabar letter ke upar aata hai. 1 beat mein jaldi padhein, \"Baa\" karke lamba na kheechein!", "الفتحة تكتب فوق الحرف وتُنطق بحركة واحدة."),
		tiles: [
			{
				id: "l6_dhahaba",
				arabic: "ذَهَبَ",
				transliteration: "Dha-ha-ba",
				meaning: ml("He went / departed", "वह गया", "وہ گیا", "Woh gaya", "ذَهَبَ"),
				tajweedRuleNote: ml("Keep all 3 beats equal: Dha · ha · ba", "तीनों हरकत बराबर तेज़: ज़ · ह · ब", "تینوں حرکات برابر اور جلدی", "Teeno beats barabar crisp: Dha-ha-ba", "ثلاث فتحات متساوية"),
				wbwWordPath: "wbw/002_017_010.mp3",
				quranAyahRef: "2:17",
				globalAyahNumber: 24
			},
			{
				id: "l6_jaala",
				arabic: "جَعَلَ",
				transliteration: "Ja-‘a-la",
				meaning: ml("He made / appointed", "उसने बनाया", "اس نے بنایا", "Usne banaya", "جَعَلَ"),
				tajweedRuleNote: ml("Clear throat Ayn in the middle (عَ)", "बीच में ऐन गले से साफ़ बोलें", "درمیان میں عین واضح پڑھیں", "Beech mein throat se Ayn saaf nikalein", "تحقيق مخرج العين المفتوحة"),
				wbwWordPath: "wbw/002_022_002.mp3",
				quranAyahRef: "2:22",
				globalAyahNumber: 29
			},
			{
				id: "l6_fasalla",
				arabic: "فَصَلَّىٰ",
				transliteration: "Fa-sallaa",
				meaning: ml("And prays (87:15)", "और नमाज़ पढ़ी (87:15)", "اور نماز پڑھی (87:15)", "Aur Namaz padhi", "فَصَلَّىٰ (٨٧:١٥)"),
				tajweedRuleNote: ml("Light Fa (فَ) then heavy Saad (صَ)", "फ़ हल्का, साद मोटा", "ف باریک اور ص پر", "Light Fa phir heavy Saad", "ترقيق الفاء وتفخيم الصاد"),
				wbwWordPath: "wbw/087_015_004.mp3",
				quranAyahRef: "87:15",
				globalAyahNumber: 5963
			},
			{
				id: "l6_ahad",
				arabic: "أَحَدٌ",
				transliteration: "A-ha-dun",
				meaning: ml("The One (112:1)", "एक (अकेला) (112:1)", "ایک اکیلا (112:1)", "Ek Akela (Surah Ikhlas)", "أَحَدٌ (١١٢:١)"),
				tajweedRuleNote: ml("Hamza + sharp throat Haa with crisp Fatha", "हम्ज़ा और साफ़ गले वाला हा (حَ)", "ہمزہ اور حلق کا صاف حا", "Sharp throat حَ ko ہ से alag saaf padhein", "همزة وحاء مفتوحتان"),
				wbwWordPath: "wbw/112_001_004.mp3",
				quranAyahRef: "112:1",
				globalAyahNumber: 6222
			}
		],
		quiz: {
			prompt: ml("What is the main mistake to avoid on Zabar (Fatha)?", "ज़बर (फ़तहा) पढ़ते वक्त किस गलती से बचना चाहिए?", "زبر پڑھتے وقت کس غلطی سے بچنا چاہیے؟", "Zabar padhte waqt kis galti se bachna chahiye?", "ما الخطأ الشائع عند نطق الفتحة؟"),
			arabicTarget: "بَ",
			options: [
				{
					label: "Stretching it long (like Baa)",
					arabic: "بَا ✗"
				},
				{
					label: "Reading it in 1 crisp beat",
					arabic: "بَ ✓"
				},
				{
					label: "Opening the mouth lightly",
					arabic: "بَ ✓"
				},
				{
					label: "Moving straight to next letter",
					arabic: "بَ ✓"
				}
			],
			correctIndex: 0,
			explanation: ml("Fatha is a short 1-beat vowel. Stretching \"ba\" into \"baa\" changes Arabic meanings!", "ज़बर को लंबा खींचने (बा) से अरबी शब्द का मतलब बदल सकता है।", "زبر کو کھینچ کر پڑھنے سے معنی بدل سکتا ہے۔", "Zabar ko lamba nahi kheenchna chahiye, warna matlab badal jata hai!", "الفتحة حركة قصيرة لا تُمد."),
			globalAyahNumber: 6222
		}
	},
	{
		id: "qaida_l07_kasra_zer",
		lessonNumber: 7,
		moduleId: "module_3_harakat",
		isFreePreview: false,
		hasVowelPlayground: true,
		estimatedMinutes: 4,
		starsReward: 10,
		title: ml("Lesson 7: Kasra / Zer ( ـِ )", "सबक़ 7: ज़ेर / कसरा ( ـِ )", "سبق 7: زیر / کسرہ ( ـِ )", "Lesson 7: Kasra / Zer (Short \"i\")", "الدرس ٧: حركة الكسرة"),
		subtitle: ml("Crisp \"i\" sound underneath the letter — avoid \"ay/eh\"!", "अक्षर के नीचे साफ़ \"इ\" की आवाज़ — \"ए\" न बोलें!", "حرف کے نیچے صاف \"اِ\" کی آواز — \"اے\" نہ پڑھیں!", "Crisp \"i\" sound (\"eh/ay\" mat bolein)!", "صوت قصير مكسور بإتمام الكسرة"),
		ruleExplanation: ml("Kasra (Zer) sits BELOW the letter. Smile slightly and drop the jaw gently to make a clean short \"i\" (bi, ti, mi), not \"be\" or \"te\".", "ज़ेर अक्षर के नीचे होता है। इसे साफ़ \"इ\" (बि, ति, मि) पढ़ें, \"बे/ते\" जैसा ढीला न करें।", "زیر حرف کے نیچے ہوتا ہے۔ اسے صاف \"اِ\" پڑھیں، \"اے\" کی طرف مائل نہ کریں۔", "Zer letter ke neeche hota hai. Clean \"i\" bolein (Bi, Mi), Hindi/Urdu jaisa \"Be, Me\" nahi!", "الكسرة توضع تحت الحرف وتُقرأ بإتمام الكسر."),
		tiles: [
			{
				id: "l7_malik",
				arabic: "مَلِكِ",
				transliteration: "Ma-li-ki",
				meaning: ml("King / Master (1:4 & 114:2)", "मालिक / बादशाह", "مالک / بادشاہ", "Malik / Badshah", "مَلِكِ"),
				tajweedRuleNote: ml("Ma (Zabar) · li (Zer) · ki (Zer) — crisp \"i\"!", "म · लि · कि (\"मलेके\" बिल्कुल न कहें)", "مَلِکِ (ملیکے نہ پڑھیں)", "Ma-li-ki bolein (\"Maleke\" galat hai)", "إتمام الكسرتين في اللام والكاف"),
				wbwWordPath: "wbw/114_002_001.mp3",
				quranAyahRef: "114:2",
				globalAyahNumber: 6232
			},
			{
				id: "l7_samia",
				arabic: "سَمِعَهُۥ",
				transliteration: "Sa-mi-‘a-hu",
				meaning: ml("He heard it (2:181)", "उसने सुना (2:181)", "اس نے سنا (2:181)", "Usne suna (2:181)", "سَمِعَهُ"),
				tajweedRuleNote: ml("Sharp Zer under Meem before throat Ayn", "मीम के नीचे साफ़ ज़ेर (मि)", "میم کے نیچے صاف زیر", "Meem ke neeche crisp Zer: Sa-mi-a-hu", "كسر الميم بوضوح"),
				wbwWordPath: "wbw/002_181_004.mp3",
				quranAyahRef: "2:181",
				globalAyahNumber: 188
			},
			{
				id: "l7_alima",
				arabic: "عَلِمَ",
				transliteration: "‘A-li-ma",
				meaning: ml("He knew", "उसने जाना", "اس نے جانا", "Usne jaana", "عَلِمَ"),
				tajweedRuleNote: ml("Zabar · Zer · Zabar pattern", "ज़बर · ज़ेर · ज़बर का पैटर्न", "زبر · زیر · زبر", "Zabar-Zer-Zabar practice word", "فتح فكسر ففتح"),
				wbwWordPath: "wbw/002_187_016.mp3",
				quranAyahRef: "2:187",
				globalAyahNumber: 194
			},
			{
				id: "l7_bihi",
				arabic: "بِهِ",
				transliteration: "Bi-hi",
				meaning: ml("With it / By Him", "उसके साथ", "اس کے ساتھ", "Uske saath", "بِهِ"),
				tajweedRuleNote: ml("Two crisp Zers: Bi-hi (never Be-he)", "दो साफ़ ज़ेर: बि-हि", "دو صاف زیر: بِہِ", "Bi-hi (Be-he nahi)", "كسرتان خالصتان"),
				wbwWordPath: "wbw/002_026_034.mp3",
				quranAyahRef: "2:26",
				globalAyahNumber: 33
			}
		],
		quiz: {
			prompt: ml("How is مَلِكِ pronounced properly?", "مَلِكِ का सही उच्चारण क्या है?", "مَلِكِ کا صحیح تلفظ کیا ہے؟", "مَلِكِ ko sahi tarah kaise padhte hain?", "ما النطق الصحيح لكلمة مَلِكِ؟"),
			arabicTarget: "مَلِكِ",
			options: [
				{
					label: "Ma-le-ke",
					arabic: "مَلےکے ✗"
				},
				{
					label: "Ma-li-ki",
					arabic: "مَلِكِ ✓"
				},
				{
					label: "Maa-li-ki",
					arabic: "مَالِكِ"
				},
				{
					label: "Mu-li-ku",
					arabic: "مُلِكُ"
				}
			],
			correctIndex: 1,
			explanation: ml("No Alif after Meem, and both Laam and Kaaf have Kasra (i): Ma-li-ki.", "मीम पर सिर्फ़ ज़बर है (अलिफ़ नहीं) और आगे दोनों ज़ेर: म-लि-कि।", "میم پر زبر ہے اور لام و کاف کے نیچے کسرہ: مَلِكِ۔", "Ma-li-ki! Meem ke baad Alif nahi hai aur Zer ka sound \"i\" hota hai.", "الميم مفتوحة دون مد واللام والكاف مكسورتان."),
			globalAyahNumber: 6232
		}
	},
	{
		id: "qaida_l08_damma_pesh",
		lessonNumber: 8,
		moduleId: "module_3_harakat",
		isFreePreview: false,
		hasVowelPlayground: true,
		estimatedMinutes: 4,
		starsReward: 10,
		title: ml("Lesson 8: Damma / Pesh ( ـُ ) & All 3 Vowels", "सबक़ 8: पेश / दम्मा ( ـُ )", "سبق 8: پیش / ضمہ ( ـُ )", "Lesson 8: Damma / Pesh (Short \"u\")", "الدرس ٨: حركة الضمة"),
		subtitle: ml("Round both lips for a crisp short \"u\" (like \"put\")", "दोनों होंठ गोल करके साफ़ \"उ\" की आवाज़ (\"ओ\" न बोलें)", "ہونٹ گول کر کے صاف \"اُ\" پڑھیں (\"او\" نہ پڑھیں)", "Lips round karke short \"u\" bolein (\"o\" nahi)!", "ضم الشفتين عند النطق بالضمة"),
		ruleExplanation: ml("Damma (Pesh) looks like a tiny Waaw above the letter. Round your lips cleanly into a circle for a short \"u\" (bu, tu, ku), never flat \"o\".", "पेश अक्षर के ऊपर छोटे वाव जैसा दिखता है। दोनों होंठ पूरी तरह गोल करें (बु, तु, कु), \"बो/तो\" न बोलें।", "پیش حرف کے اوپر چھوٹے واؤ کی طرح ہوتا ہے؛ ہونٹ گول کر کے \"اُ\" پڑھیں۔", "Pesh par dono lips O-shape mein round karein taaki \"u\" saaf nikle (\"o\" mat bolein).", "تتحقق الضمة بضم الشفتين للأمام."),
		tiles: [
			{
				id: "l8_kutiba",
				arabic: "كُتِبَ",
				transliteration: "Ku-ti-ba",
				meaning: ml("Has been prescribed (2:183)", "फ़र्ज़ किया गया (2:183)", "فرض کیا گیا (2:183)", "Farz kiya gaya (2:183)", "كُتِبَ (٢:١٨٣)"),
				tajweedRuleNote: ml("All 3 Harakat in one word: Pesh · Zer · Zabar!", "तीनों हरकत एक साथ: कु · ति · ब!", "تینوں حرکات ایک لفظ میں: کُ · تِ · بَ", "Teeno Harakat ek hi word mein: Ku-ti-ba!", "تنوع الحركات الثلاث في كلمة"),
				wbwWordPath: "wbw/002_183_004.mp3",
				quranAyahRef: "2:183",
				globalAyahNumber: 190
			},
			{
				id: "l8_khuliqa",
				arabic: "خُلِقَ",
				transliteration: "Khu-li-qa",
				meaning: ml("Was created (86:6)", "पैदा किया गया (86:6)", "پیدا کیا گیا (86:6)", "Paida kiya gaya (86:6)", "خُلِقَ (٨٦:٦)"),
				tajweedRuleNote: ml("Heavy Khaa with rounded lips (Khu) + light li + heavy qa", "मोटा ख़ु · पतला लि · मोटा क़", "خ پر، ل باریک، ق پر", "Khu (heavy) · li (light) · qa (heavy)", "ضمة مع تفخيم الخاء"),
				wbwWordPath: "wbw/086_006_001.mp3",
				quranAyahRef: "86:6",
				globalAyahNumber: 5937
			},
			{
				id: "l8_ruziqa",
				arabic: "رُزِقُوا۟",
				transliteration: "Ru-zi-qoo",
				meaning: ml("Were given sustenance (2:25)", "रिज़्क़ दिया गया (2:25)", "رزق دیا گیا (2:25)", "Rizq diya gaya (2:25)", "رُزِقُوا"),
				tajweedRuleNote: ml("Notice Raa with Pesh (رُ) is always heavy!", "पेश वाला रा (رُ) हमेशा मोटा पढ़ा जाता है", "پیش والی را پر ہوتی ہے", "Pesh wali Raa hamesha heavy hoti hai", "الراء المضمومة مفخمة"),
				wbwWordPath: "wbw/002_025_015.mp3",
				quranAyahRef: "2:25",
				globalAyahNumber: 32
			},
			{
				id: "l8_nabudu",
				arabic: "نَعْبُدُ",
				transliteration: "Na‘-bu-du",
				meaning: ml("We worship (1:5)", "हम इबादत करते हैं (1:5)", "ہم عبادت کرتے ہیں (1:5)", "Hum ibadat karte hain (1:5)", "نَعْبُدُ (١:٥)"),
				tajweedRuleNote: ml("Keep lips rounded on BOTH bu and du", "ब और द दोनों पर होंठ गोल रखें", "بُ اور دُ دونوں پر ہونٹ گول رکھیں", "Bu aur du dono par lips round rakhein", "تتابع الضمتين"),
				wbwWordPath: "wbw/001_005_002.mp3",
				quranAyahRef: "1:5",
				globalAyahNumber: 5
			}
		],
		quiz: {
			prompt: ml("Which word contains ALL 3 Harakat (Pesh, Zer, Zabar) in order?", "किस शब्द में क्रम से पेश, ज़ेर और ज़बर तीनों हैं?", "کس لفظ میں ترتیب سے پیش، زیر اور زبر تینوں ہیں؟", "Kis word mein teeno (Pesh, Zer, Zabar) line se hain?", "أي كلمة تجمع الضمة فالكسرة فالفتحة؟"),
			arabicTarget: "؟",
			options: [
				{
					label: "Kataba",
					arabic: "كَتَبَ"
				},
				{
					label: "Kutiba",
					arabic: "كُتِبَ"
				},
				{
					label: "Alima",
					arabic: "عَلِمَ"
				},
				{
					label: "Samia",
					arabic: "سَمِعَ"
				}
			],
			correctIndex: 1,
			explanation: ml("كُتِبَ has Pesh on Kaaf (كُ), Zer under Taa (تِ), and Zabar on Baa (بَ).", "كُتِبَ में ك पर पेश, ت के नीचे ज़ेर और ب पर ज़बर है।", "كُتِبَ میں ترتیب سے پیش، زیر اور زبر موجود ہیں۔", "كُتِبَ = Ku (Pesh) + ti (Zer) + ba (Zabar)!", "كُ (ضمة) تِ (كسرة) بَ (فتحة)."),
			globalAyahNumber: 190
		}
	},
	{
		id: "qaida_l09_tanween",
		lessonNumber: 9,
		moduleId: "module_4_tanween_sukoon",
		isFreePreview: false,
		estimatedMinutes: 4,
		starsReward: 10,
		title: ml("Lesson 9: Tanween (Do-Zabar, Do-Zer, Do-Pesh)", "सबक़ 9: तनवीन (दो-ज़बर, दो-ज़ेर, दो-पेश)", "سبق 9: تنوین (دو زبر، دو زیر، دو پیش)", "Lesson 9: Tanween (-an, -in, -un)", "الدرس ٩: التنوين بالفتح والكسر والضم"),
		subtitle: ml("Double marks add a crisp hidden \"n\" sound at the end", "दो हरकत मिलकर आख़िर में \"न\" की आवाज़ जोड़ती हैं", "دو حرکات مل کر آخر میں نون کی آواز دیتی ہیں", "Double Zabar/Zer/Pesh end mein \"n\" sound add karte hain", "نطق نون ساكنة زائدة في آخر الكلمة"),
		ruleExplanation: ml("Double Fatha (ـً) = \"-an\", Double Kasra (ـٍ) = \"-in\", Double Damma (ـٌ) = \"-un\". There is no letter Noon written, only its sound!", "दो ज़बर = \"अन\", दो ज़ेर = \"इन\", दो पेश = \"उन\"। आख़िर में नून लिखा नहीं जाता पर आवाज़ आती है।", "دو زبر = اَن، دو زیر = اِن، دو پیش = اُن۔ نون کی آواز آتی ہے۔", "Do-Zabar (-an), Do-Zer (-in), Do-Pesh (-un). Last mein \"n\" ki aawaz aati hai!", "التنوين نون ساكنة تلحق آخر الاسم لفظاً لا خطاً."),
		tiles: [
			{
				id: "l9_kitaban",
				arabic: "كِتَٰبًا",
				transliteration: "Ki-taa-ban",
				meaning: ml("A book (Do-Zabar)", "एक किताब (दो-ज़बर)", "ایک کتاب (دو زبر)", "Ek kitaab (-an)", "كِتَابًا"),
				tajweedRuleNote: ml("Do-Zabar almost always rests with an extra Alif at end", "दो-ज़बर के साथ अक्सर आख़िर में अलिफ़ लिखा होता है", "دو زبر کے ساتھ عموماً الف ہوتا ہے", "Do-Zabar ke saath end mein Alif hota hai", "تنوين الفتح مع الألف"),
				wbwWordPath: "wbw/078_029_004.mp3",
				quranAyahRef: "78:29",
				globalAyahNumber: 5701
			},
			{
				id: "l9_lahab",
				arabic: "لَهَبٍ",
				transliteration: "La-ha-bin",
				meaning: ml("Blazing flame (111:3)", "लपट / आग (111:3)", "شعلہ / آگ (111:3)", "Aag ki lapat (111:3)", "لَهَبٍ (١١١:٣)"),
				tajweedRuleNote: ml("Do-Zer under Baa: bin (when continuing)", "बा के नीचे दो-ज़ेर: बिन", "باء کے نیچے دو زیر: بِن", "Baa ke neeche Do-Zer → bin", "تنوين بالكسر"),
				wbwWordPath: "wbw/111_003_004.mp3",
				quranAyahRef: "111:3",
				globalAyahNumber: 6219
			},
			{
				id: "l9_kufuw",
				arabic: "كُفُوًا",
				transliteration: "Ku-fu-wan",
				meaning: ml("Equal / comparable (112:4)", "बराबर (112:4)", "برابر (112:4)", "Barabar (112:4)", "كُفُوًا (١١٢:٤)"),
				tajweedRuleNote: ml("Waaw has Do-Zabar → wan (followed by Alif)", "वाव पर दो-ज़बर → वन", "واؤ پر دو زبر: وَن", "Waaw par Do-Zabar → Ku-fu-wan", "تنوين الفتح على الواو"),
				wbwWordPath: "wbw/112_004_004.mp3",
				quranAyahRef: "112:4",
				globalAyahNumber: 6225
			},
			{
				id: "l9_raheem",
				arabic: "ٱلرَّحِيمُ",
				transliteration: "Ar-Ra-hee-mu",
				meaning: ml("Most Merciful (2:37)", "निहायत रहम वाला (2:37)", "نہایت رحم والا (2:37)", "Nihayat Reham wala (2:37)", "ٱلرَّحِيمُ"),
				tajweedRuleNote: ml("Clear Damma ending + natural 2-count Madd on Yaa", "मीम पर पेश और या-ए-मद्दा 2 हरकत", "میم پر پیش اور یائے مدہ", "Meem par Pesh aur Yaa par 2-beat Madd", "مد طبيعي مع ضمة"),
				wbwWordPath: "wbw/002_037_012.mp3",
				quranAyahRef: "2:37",
				globalAyahNumber: 44
			}
		],
		quiz: {
			prompt: ml("What sound does Do-Pesh (ـٌ) make on مٌ ?", "مٌ (दो-पेश) की आवाज़ क्या होती है?", "مٌ (دو پیش) کی آواز کیا ہوگی؟", "مٌ par Do-Pesh ki aawaz kya hogi?", "كيف يُنطق حرف مٌ بالتنوين بالضم؟"),
			arabicTarget: "مٌ",
			options: [
				{
					label: "Man",
					arabic: "مًا"
				},
				{
					label: "Min",
					arabic: "مٍ"
				},
				{
					label: "Mun",
					arabic: "مٌ ✓"
				},
				{
					label: "Moo",
					arabic: "مُو"
				}
			],
			correctIndex: 2,
			explanation: ml("Do-Pesh adds an \"-un\" sound: مٌ = Mun.", "दो-पेश की आवाज़ \"उन\" होती है, इसलिए مٌ = मुन।", "دو پیش کی آواز \"اُن\" ہوتی ہے، یعنی مُن۔", "Do-Pesh = \"-un\" sound → Mun!", "التنوين بالضم يقرأ مُن."),
			globalAyahNumber: 44
		}
	},
	{
		id: "qaida_l10_sukoon",
		lessonNumber: 10,
		moduleId: "module_4_tanween_sukoon",
		isFreePreview: false,
		estimatedMinutes: 4,
		starsReward: 10,
		title: ml("Lesson 10: Sukoon / Jazm ( ـْ )", "सबक़ 10: सुकून / जज़्म ( ـْ )", "سبق 10: سکون / جزم ( ـْ )", "Lesson 10: Sukoon / Jazm (Joining Stops)", "الدرس ١٠: السكون والجزم"),
		subtitle: ml("Join a moving letter cleanly into the silent resting letter", "हरकत वाले अक्षर को साकिन अक्षर से जोड़कर रोकना", "متحرک حرف کو ساکن حرف سے ملا کر پڑھنا", "Vowel letter ko silent Sukoon letter se jodkar rokna", "وصل المتحرك بالساكن"),
		ruleExplanation: ml("A letter with Sukoon (ـْ) has NO vowel of its own. Connect the previous letter smoothly into it and stop without adding an extra \"a/u\".", "जज़्म (सुकून) वाले अक्षर की कोई अलग हरकत नहीं होती — पिछला अक्षर उससे आकर टकराता है।", "ساکن حرف پچھلے متحرک حرف سے مل کر پڑھا جاتا ہے۔", "Jazm (ـْ) wale letter ki apni harakat nahi hoti — pichhla letter usse judkar rukta hai.", "الحرف الساكن يُنطق بالاعتماد على الحرف الذي قبله."),
		tiles: [
			{
				id: "l10_qul",
				arabic: "قُلْ",
				transliteration: "Qul",
				meaning: ml("Say (112:1)", "कहिए (112:1)", "کہیے (112:1)", "Kahiye (Qul)", "قُلْ (١١٢:١)"),
				tajweedRuleNote: ml("Do not bounce Laam; hold tongue lightly on upper gums", "लाम को झटका न दें — नरमी से रोकें", "لام پر قلقلہ نہ کریں", "Laam par bounce (qalqalah) nahi karna", "إسكان اللام من غير قلقلة"),
				wbwWordPath: "wbw/112_001_001.mp3",
				quranAyahRef: "112:1",
				globalAyahNumber: 6222
			},
			{
				id: "l10_lam",
				arabic: "لَمْ",
				transliteration: "Lam",
				meaning: ml("Did not (112:3)", "नहीं (112:3)", "نہیں (112:3)", "Nahi (Lam)", "لَمْ (١١٢:٣)"),
				tajweedRuleNote: ml("Close lips gently on Meem Sukoon without humming extra", "मीम साकिन पर होंठ बंद करके रुकें", "میم ساکن پر ہونٹ بند کر کے رکیں", "Meem Sukoon par lips close karke rukein", "إسكان الميم بإظهار شفوي"),
				wbwWordPath: "wbw/112_003_001.mp3",
				quranAyahRef: "112:3",
				globalAyahNumber: 6224
			},
			{
				id: "l10_min",
				arabic: "مِنْ",
				transliteration: "Min",
				meaning: ml("From (113:2)", "से (113:2)", "سے (113:2)", "Se (Min sharri...)", "مِنْ (١١٣:٢)"),
				tajweedRuleNote: ml("Zer under Meem connects cleanly to Noon Sukoon", "मि + न् = मिन्", "مِ + نْ = مِنْ", "Mi + n = Min", "مكسور مع نون ساكنة"),
				wbwWordPath: "wbw/113_002_001.mp3",
				quranAyahRef: "113:2",
				globalAyahNumber: 6227
			},
			{
				id: "l10_alhamd",
				arabic: "ٱلْحَمْدُ",
				transliteration: "Al-Ham-du",
				meaning: ml("All praise (1:2)", "तमाम तारीफ़ (1:2)", "تمام تعریفیں (1:2)", "Saari tareef (1:2)", "الْحَمْدُ (١:٢)"),
				tajweedRuleNote: ml("Two Sukoons in one word: Al · Ham · du!", "दो जज़्म: अल् · हम् · दु!", "دو سکون: الـ · حَمْ · دُ", "Do Sukoons: Al + Ham + du", "سكون اللام والميم"),
				wbwWordPath: "wbw/001_002_001.mp3",
				quranAyahRef: "1:2",
				globalAyahNumber: 2
			}
		],
		quiz: {
			prompt: ml("In قُلْ (Qul), which letter carries the Sukoon?", "قُلْ में सुकून किस अक्षर पर है?", "قُلْ میں سکون کس حرف پر ہے؟", "قُلْ mein Sukoon (Jazm) kis letter par hai?", "أي حرف عليه سكون في قُلْ؟"),
			arabicTarget: "قُلْ",
			options: [
				{
					label: "Qaaf",
					arabic: "قُ"
				},
				{
					label: "Laam",
					arabic: "لْ ✓"
				},
				{
					label: "Alif",
					arabic: "ا"
				},
				{
					label: "Noon",
					arabic: "نْ"
				}
			],
			correctIndex: 1,
			explanation: ml("Qaaf has Pesh (قُ) and Laam carries the Sukoon (لْ).", "क़ाफ़ पर पेश और लाम पर सुकून (لْ) है।", "قاف پر پیش اور لام پر سکون ہے۔", "Qaaf par Pesh aur Laam par Sukoon (لْ) hai.", "اللام هي الحرف الساكن في قُلْ."),
			globalAyahNumber: 6222
		}
	},
	{
		id: "qaida_l11_qalqalah",
		lessonNumber: 11,
		moduleId: "module_4_tanween_sukoon",
		isFreePreview: false,
		estimatedMinutes: 5,
		starsReward: 10,
		title: ml("Lesson 11: Qalqalah Echo Letters (ق ط ب ج د)", "सबक़ 11: क़लक़ला — गूँजने वाले 5 अक्षर", "سبق 11: حروفِ قلقلہ (ق ط ب ج د)", "Lesson 11: Qalqalah Bounce (Qutb Jadd)", "الدرس ١١: حروف القلقلة (قطب جد)"),
		subtitle: ml("The 5 bouncy letters when carrying Sukoon or stopping", "सुकून होने पर इन 5 अक्षरों में हल्की गूँज होती है", "ساکن ہونے پر ان 5 حروف میں ہلکی سی گونج ہوتی ہے", "Yeh 5 letters Sukoon par halka bounce/echo karte hain!", "اضطراب الصوت عند النطق بأحد حروف قطب جد الساكنة"),
		ruleExplanation: ml("Remember \"Qutb Jadd\" (ق ط ب ج د). Whenever any of these 5 letters has Sukoon (or you stop at it), release it with a crisp echoing bounce!", "क़ुत्ब जद्द (ق ط ب ج د) याद रखें! जब इनमें से कोई साकिन हो या हम इस पर रुकें तो साफ़ गूँज (पलटाव) निकालें।", "حروفِ قلقلہ (ق ط ب ج د) ساکن ہوں تو ان کو ہلکی سی گونج کے ساتھ ادا کریں۔", "\"Qutb Jadd\" (ق ط ب ج د) yaad rakhein — jab in par Sukoon ho ya Ayah end ho, crisp bounce dein!", "حروف القلقلة الخمسة مجموعة في (قطب جد)."),
		tiles: [
			{
				id: "l11_falaq",
				arabic: "ٱلْفَلَقِ",
				transliteration: "Al-Fa-laq(a)",
				meaning: ml("The Daybreak (113:1 — strong Qaaf stop)", "सुबह का मालिक (113:1)", "صبح کا رب (113:1)", "Subah ki roshni (113:1)", "الْفَلَقِ (١١٣:١)"),
				tajweedRuleNote: ml("Stopping on ق gives strong Qalqalah Kubra!", "क़ाफ़ पर रुकने से ज़ोरदार क़लक़ला!", "قاف پر وقف کرتے ہوئے قلقلہ کبریٰ", "End mein Qaaf par rukte waqt clear Qalqalah bounce!", "قلقلة كبرى عند الوقف على القاف"),
				wbwWordPath: "wbw/113_001_004.mp3",
				quranAyahRef: "113:1",
				globalAyahNumber: 6226
			},
			{
				id: "l11_ahad_stop",
				arabic: "أَحَدٌۢ",
				transliteration: "A-had(d)",
				meaning: ml("The One (112:1 — Daal Qalqalah stop)", "एक (112:1)", "ایک (112:1)", "Ek Akela (Daal Qalqalah)", "أَحَدٌ (١١٢:١)"),
				tajweedRuleNote: ml("Stop on دْ with clear bounce: A-had", "अख़ीर के दाल पर हल्की गूँज: अ-हद्", "آخری دال پر واضح قلقلہ: اَحَدْ", "Ayah end par دْ ko bounce ke saath padhein: A-had", "قلقلة الدال عند الوقف"),
				wbwWordPath: "wbw/112_001_004.mp3",
				quranAyahRef: "112:1",
				globalAyahNumber: 6222
			},
			{
				id: "l11_watabb",
				arabic: "وَتَبَّ",
				transliteration: "Wa-tabb(b)",
				meaning: ml("And perished (111:1 — Baa stop)", "और बर्बाद हो गया (111:1)", "اور ہلاک ہو گیا (111:1)", "Aur barbaad ho gaya (111:1)", "وَتَبَّ (١١١:١)"),
				tajweedRuleNote: ml("Baa with Shaddah at stop = Akbar Qalqalah!", "तश्दीद वाली बा पर रुकने पर सबसे मज़बूत क़लक़ला", "تشدید والی باء پر وقف میں مضبوط قلقلہ", "Shaddah Baa par stop = strongest bounce!", "قلقلة مشددة عند الوقف"),
				wbwWordPath: "wbw/111_001_005.mp3",
				quranAyahRef: "111:1",
				globalAyahNumber: 6217
			},
			{
				id: "l11_yajalu",
				arabic: "يَجْعَلْ",
				transliteration: "Yaj-‘al",
				meaning: ml("Did He not make... (105:2)", "क्या उसने नहीं कर दिया (105:2)", "کیا اس نے نہیں کر دیا (105:2)", "Kya Usne nahi kar diya (105:2)", "يَجْعَلْ (١٠٥:٢)"),
				tajweedRuleNote: ml("Middle-of-word Jeem Sukoon (جْ) gets light Qalqalah Sughra", "बीच में साकिन जीम (جْ) पर हल्का क़लक़ला", "درمیان میں جیم ساکن پر ہلکا قلقلہ", "Word ke beech mein Jeem Sukoon par light bounce!", "قلقلة صغرى في وسط الكلمة"),
				wbwWordPath: "wbw/105_002_002.mp3",
				quranAyahRef: "105:2",
				globalAyahNumber: 6190
			}
		],
		quiz: {
			prompt: ml("Which set lists ALL 5 Qalqalah letters?", "क़लक़ला के सभी 5 अक्षर कौन से हैं?", "قلقلہ کے تمام 5 حروف کون سے ہیں؟", "Qalqalah ke saare 5 letters kaun se hain?", "ما هي حروف القلقلة الخمسة؟"),
			arabicTarget: "ق ط ب ج د",
			options: [
				{
					label: "Qutb Jadd (ق ط ب ج د)",
					arabic: "ق ط ب ج د ✓"
				},
				{
					label: "Alif Waaw Yaa",
					arabic: "ا و ي"
				},
				{
					label: "Throat Letters",
					arabic: "ء ه ع ح غ خ"
				},
				{
					label: "Sun Letters",
					arabic: "ت ث د ذ"
				}
			],
			correctIndex: 0,
			explanation: ml("Memorize the phrase \"Qutb Jadd\": ق ط ب ج د!", "\"क़ुत्ब जद्द\" (ق ط ب ج د) हमेशा याद रखें!", "\"قطب جد\" (ق ط ب ج د) ہمیشہ یاد رکھیں!", "\"Qutb Jadd\" = ق ط ب ج د!", "مجموعة في عبارة: قُطْبُ جَدٍّ."),
			globalAyahNumber: 6226
		}
	},
	{
		id: "qaida_l12_maddah",
		lessonNumber: 12,
		moduleId: "module_5_madd_shaddah",
		isFreePreview: false,
		estimatedMinutes: 4,
		starsReward: 10,
		title: ml("Lesson 12: Huroof-e-Maddah (2-Count Stretches)", "सबक़ 12: हुरूफ़-ए-मद्दा (लंबी आवाज़)", "سبق 12: حروفِ مدہ (دو حرکت لمبا)", "Lesson 12: Long Vowels — Madd (ا و ي)", "الدرس ١٢: حروف المد الثلاثة"),
		subtitle: ml("Stretch Alif, Waaw, and Yaa cleanly for 2 smooth counts", "अलिफ़, वाव और या को बराबर 2 हरकत खींचें", "الف، واؤ اور یا کو دو حرکت کے برابر کھینچیں", "Alif, Waaw aur Yaa ko smooth 2 counts stretch karein", "المد الطبيعي بمقدار حركتين"),
		ruleExplanation: ml("1) Fatha + empty Alif = \"aa\" (قَالَ). 2) Kasra + Yaa Sukoon = \"ee\" (قِيلَ). 3) Damma + Waaw Sukoon = \"oo\" (يَقُولُ). Hold each for 2 steady beats!", "ज़बर के बाद अलिफ़ (आ), ज़ेर के बाद या-साकिन (ई), पेश के बाद वाव-साकिन (ऊ) — तीनों को 2 गिनती तक खींचें।", "زبر کے بعد الف، زیر کے بعد یائے ساکن اور پیش کے بعد واؤ ساکن کو دو حرکت کھینچیں۔", "Zabar+Alif (aa), Zer+Yaa (ee), Pesh+Waaw (oo) — har ek ko 2 beats stretch karein!", "الألف بعد فتح، والياء الساكنة بعد كسر، والواو الساكنة بعد ضم."),
		tiles: [
			{
				id: "l12_qaala",
				arabic: "قَالَ",
				transliteration: "Qaa-la (2 beats)",
				meaning: ml("He said", "उसने कहा", "اس نے کہا", "Usne kaha", "قَالَ"),
				tajweedRuleNote: ml("Stretch Qaa (قَا) for 2 beats, keep la (لَ) crisp 1 beat", "क़ा को 2 हरकत खींचें, ल को झटपट 1 हरकत", "قَا کو دو حرکت اور لَ کو ایک حرکت", "Qaa = 2 beats, la = 1 beat!", "مد طبيعي حركتان في الألف"),
				wbwWordPath: "wbw/002_030_002.mp3",
				quranAyahRef: "2:30",
				globalAyahNumber: 37
			},
			{
				id: "l12_qeela",
				arabic: "قِيلَ",
				transliteration: "Qee-la (2 beats)",
				meaning: ml("It was said", "कहा गया", "کہا گیا", "Kaha gaya", "قِيلَ"),
				tajweedRuleNote: ml("Kasra + Yaa Sukoon (قِي) stretches cleanly for 2 counts", "ज़ेर के बाद या-साकिन: क़ी-ल", "زیر کے بعد یائے ساکن: قِیْلَ", "Kasra + Yaa Sukoon → Qee (2 beats)", "مد طبيعي بالياء"),
				wbwWordPath: "wbw/002_011_002.mp3",
				quranAyahRef: "2:11",
				globalAyahNumber: 18
			},
			{
				id: "l12_yaqoolu",
				arabic: "يَقُولُ",
				transliteration: "Ya-qoo-lu (2 beats)",
				meaning: ml("He says", "वह कहता है", "وہ کہتا ہے", "Woh kehta hai", "يَقُولُ"),
				tajweedRuleNote: ml("Ya (1 beat) · qoo (2 beats) · lu (1 beat)", "य (1) · क़ू (2) · लु (1)", "یَ (1) · قُو (2) · لُ (1)", "Ya (1) · qoo (2) · lu (1)", "مد طبيعي بالواو"),
				wbwWordPath: "wbw/002_008_004.mp3",
				quranAyahRef: "2:8",
				globalAyahNumber: 15
			},
			{
				id: "l12_maliki_1_4",
				arabic: "مَـٰلِكِ",
				transliteration: "Maa-li-ki (Standing Fatha)",
				meaning: ml("Master of (1:4)", "मालिक (1:4)", "مالک (1:4)", "Maalik (Khada Zabar)", "مَالِكِ (١:٤)"),
				tajweedRuleNote: ml("Mini vertical Alif (ـٰ Khada Zabar) stretches just like Alif Maddah!", "खड़ा ज़बर (ـٰ) भी बिल्कुल 2 हरकत अलिफ़ की तरह खिंचता है", "کھڑا زبر بھی دو حرکت کھینچا جاتا ہے", "Khada Zabar (ـٰ) bhi full 2 counts stretch hota hai!", "الألف الخنجرية تُمد حركتين"),
				wbwWordPath: "wbw/001_004_001.mp3",
				quranAyahRef: "1:4",
				globalAyahNumber: 4
			}
		],
		quiz: {
			prompt: ml("How many beats should a natural Madd (Huroof-e-Maddah) be stretched?", "हुरूफ़-ए-मद्दा को कितनी हरकत (गिनती) खींचना चाहिए?", "حروفِ مدہ کو کتنی حرکت کھینچنا چاہیے؟", "Huroof-e-Maddah ko kitne counts stretch karte hain?", "ما مقدار المد الطبيعي؟"),
			arabicTarget: "قَا · قِي · قُو",
			options: [
				{
					label: "0 beats (very fast)",
					arabic: "١"
				},
				{
					label: "2 steady beats",
					arabic: "٢ حركتان ✓"
				},
				{
					label: "10 beats",
					arabic: "١٠"
				},
				{
					label: "Stop abruptly",
					arabic: "ـْ"
				}
			],
			correctIndex: 1,
			explanation: ml("Madd-e-Asli (Natural Madd) is always 2 steady counts.", "मद्द-ए-असली हमेशा बराबर 2 हरकत खींचा जाता है।", "مدِ اصلی ہمیشہ دو حرکت کے برابر کھینچا جاتا ہے۔", "Natural Madd hamesha 2 beats hota hai.", "المد الطبيعي مقداره حركتان دائماً."),
			globalAyahNumber: 4
		}
	},
	{
		id: "qaida_l13_standing_vowels_waqf",
		lessonNumber: 13,
		moduleId: "module_5_madd_shaddah",
		isFreePreview: false,
		estimatedMinutes: 4,
		starsReward: 10,
		title: ml("Lesson 13: Standing Vowels & Heavy Madd (~)", "सबक़ 13: खड़ा ज़बर, उल्टा पेश और बड़ा मद्द (~)", "سبق 13: کھڑا زبر، کھڑی زیر، الٹا پیش اور مد", "Lesson 13: Standing Vowels & 4-Beat Madd (~)", "الدرس ١٣: الحركات الطويلة والمد الفرعي"),
		subtitle: ml("Mini Alif, Standing Kasra, Inverted Damma & Curved Madd wave", "खड़ा ज़बर, खड़ी ज़ेर, उल्टा पेश और 4-5 गिनती का बड़ा मद्द", "کھڑا زبر، کھڑی زیر، الٹا پیش اور بڑا مد", "Khada Zabar/Zer, Ulta Pesh aur ~ wave wala lamba Madd", "المد الواجب المتصل والمنفصل"),
		ruleExplanation: ml("When you see the wavy Madd mark (~) above an Alif/Waaw/Yaa, stretch it smoothly for 4 to 5 counts!", "जब मद्द की लहराती लकीर (~) नज़र आए, तो उसे 4 से 5 गिनती तक खूबसूरती से लंबा खींचें!", "جب حرفِ مدہ پر (~) کی علامت ہو تو اسے 4 تا 5 حرکت لمبا کھینچیں!", "Jab ~ wave sign dikhe, toh 4-5 counts tak smoothly stretch karein!", "علامة (~) تدل على زيادة المد عن حركتين إلى ٤ أو ٥ حركات."),
		tiles: [
			{
				id: "l13_haadha",
				arabic: "هَـٰذَا",
				transliteration: "Haa-dhaa",
				meaning: ml("This (2:25)", "यह (2:25)", "یہ (2:25)", "Yeh (Haadha)", "هَٰذَا"),
				tajweedRuleNote: ml("Standing Fatha on Haa (هَـٰ) = 2 beats", "हा पर खड़ा ज़बर = 2 गिनती", "ہاء پر کھڑا زبر = دو حرکت", "Haa par Khada Zabar = 2 beats", "ألف خنجرية بمقدار حركتين"),
				wbwWordPath: "wbw/002_025_022.mp3",
				quranAyahRef: "2:25",
				globalAyahNumber: 32
			},
			{
				id: "l13_bismillahi_khada",
				arabic: "إِلَـٰهِ",
				transliteration: "I-laa-hi",
				meaning: ml("God / Worshipped One (114:3)", "माबूद (114:3)", "معبود (114:3)", "Ma’bood (114:3)", "إِلَٰهِ (١١٤:٣)"),
				tajweedRuleNote: ml("Laam carries Standing Fatha (لَـٰ) = 2 counts", "लाम पर खड़ा ज़बर → इलाहि", "لام پر کھڑا زبر", "Laam par Khada Zabar → I-laa-hi", "مد طبيعي في اللام"),
				wbwWordPath: "wbw/114_003_001.mp3",
				quranAyahRef: "114:3",
				globalAyahNumber: 6233
			},
			{
				id: "l13_innaa_madd",
				arabic: "إِنَّآ",
				transliteration: "In-naaaa (4-beat Madd)",
				meaning: ml("Indeed We (108:1)", "बेशक हमने (108:1)", "بے شک ہم نے (108:1)", "Beshak Humne (108:1)", "إِنَّآ (١٠٨:١)"),
				tajweedRuleNote: ml("Notice ~ above إِنَّآ before Hamza → stretch 4 counts!", "إِنَّآ के ऊपर बड़ा मद्द (~) है — 4 हरकत खींचें!", "مد منفصل کی علامت — 4 حرکت کھینچیں", "Innaa ke upar ~ hai → 4 beats stretch!", "مد منفصل ٤-٥ حركات"),
				wbwWordPath: "wbw/108_001_001.mp3",
				quranAyahRef: "108:1",
				globalAyahNumber: 6205
			},
			{
				id: "l13_daalleen",
				arabic: "ٱلضَّآلِّينَ",
				transliteration: "Ad-Daaaaa-lleen",
				meaning: ml("Those astray (1:7 — 6-beat Lazim Madd)", "भटके हुए (1:7 — 6 हरकत मद्द-ए-लाज़िम)", "گمراہ ہونے والے (1:7)", "Madd-e-Lazim 6 beats (1:7)", "الضَّالِّينَ (١:٧)"),
				tajweedRuleNote: ml("Madd wave before Shaddah = full 6-count stretch!", "तश्दीद से पहले ~ आने पर पूरा 6 गिनती मद्द-ए-लाज़िम!", "تشدید سے پہلے مد — 6 حرکت مدِ لازم!", "Shaddah se pehle ~ ho toh full 6 beats!", "مد لازم كلمي مثقل ٦ حركات"),
				wbwWordPath: "wbw/001_007_009.mp3",
				quranAyahRef: "1:7",
				globalAyahNumber: 7
			}
		],
		quiz: {
			prompt: ml("What does the wavy mark (~) tell the reader?", "लहराती हुई मद्द की निशानी (~) क्या बताती है?", "(~) علامت قاری کو کیا بتاتی ہے؟", "Wave sign (~) dikhe toh kya karna hota hai?", "علام تدل علامة (~) فوق حرف المد؟"),
			arabicTarget: "إِنَّآ",
			options: [
				{
					label: "Skip the letter",
					arabic: "✗"
				},
				{
					label: "Stretch longer (4–6 counts)",
					arabic: "٤-٦ حركات ✓"
				},
				{
					label: "Read whisper-soft",
					arabic: "…"
				},
				{
					label: "Stop immediately",
					arabic: "ـْ"
				}
			],
			correctIndex: 1,
			explanation: ml("The ~ sign signals an elongated Madd (4–5 counts before Hamza, or 6 counts before Shaddah/Sukoon).", "~ की निशानी बताती है कि मद्द को आम से ज़्यादा (4 से 6 हरकत) खींचना है।", "یہ علامت مد کو 4 سے 6 حرکت تک لمبا کرنے کی طرف اشارہ کرتی ہے۔", "~ wave ka matlab hota hai 4 se 6 counts lamba stretch karna!", "تدل على المد الفرعي بمقدار ٤ إلى ٦ حركات."),
			globalAyahNumber: 6205
		}
	},
	{
		id: "qaida_l14_tashdeed",
		lessonNumber: 14,
		moduleId: "module_5_madd_shaddah",
		isFreePreview: false,
		estimatedMinutes: 5,
		starsReward: 12,
		title: ml("Lesson 14: Tashdeed / Shaddah ( ـّ ) & Ghunnah", "सबक़ 14: तश्दीद ( ـّ ) और 2-हरकत ग़ुन्ना", "سبق 14: تشدید ( ـّ ) اور غنہ", "Lesson 14: Tashdeed (Doubling) & Ghunnah", "الدرس ١٤: الشدة والغنة"),
		subtitle: ml("Press firmly on doubled letters; hum through the nose on نّ & مّ", "दो बार पढ़े जाने वाले अक्षर और नून/मीम पर ग़ुन्ना", "مشدد حروف پر زور اور نّ و مّ پر دو حرکت غنہ", "Doubled letter ko pakad kar padhein; نّ aur مّ par nasal Ghunnah!", "نطق الحرف المشدد والغنة في النون والميم"),
		ruleExplanation: ml("A letter with Shaddah (ـّ) counts as TWO letters: first silent (Sukoon), second with its vowel (e.g. رَبِّ = رَبْ + بِ). If Shaddah sits on Noon (نّ) or Meem (مّ), hold a sweet nasal hum (Ghunnah) for 2 full beats!", "तश्दीद (ـّ) वाला अक्षर दो बार पढ़ा जाता है। और जब नून (نّ) या मीम (مّ) पर तश्दीद हो, तो नाक में 2 हरकत ग़ुन्ना ज़रूर करें!", "تشدید والا حرف دو مرتبہ پڑھا جاتا ہے، اور نّ یا مّ پر دو حرکت غنہ واجب ہے!", "Shaddah (ـّ) matlab 2 letters ek saath! Aur نّ ya مّ par Shaddah ho toh 2 beats nasal Ghunnah zaroori hai!", "الحرف المشدد أصله حرفان، وتجب الغنة حركتين في النون والميم المشددتين."),
		tiles: [
			{
				id: "l14_rabbika",
				arabic: "لِرَبِّكَ",
				transliteration: "Li-rab-bi-ka",
				meaning: ml("For your Lord (108:2)", "आपके रब के लिए (108:2)", "آپ کے رب کے لیے (108:2)", "Aapke Rabb ke liye (108:2)", "لِرَبِّكَ (١٠٨:٢)"),
				tajweedRuleNote: ml("Hold Baa cleanly: Li · rab · bi · ka", "बा को दो बार जोड़ें: रब् · बि · क", "باء پر تشدید: رَبْ · بِ · کَ", "Baa ko dubara press karein: Li-rab-bi-ka", "تشديد الباء المكسورة"),
				wbwWordPath: "wbw/108_002_002.mp3",
				quranAyahRef: "108:2",
				globalAyahNumber: 6206
			},
			{
				id: "l14_iyyaka",
				arabic: "إِيَّاكَ",
				transliteration: "Iy-yaa-ka",
				meaning: ml("You alone (1:5)", "सिर्फ़ तेरी ही (1:5)", "صرف تیری ہی (1:5)", "Sirf Teri hi (1:5)", "إِيَّاكَ (١:٥)"),
				tajweedRuleNote: ml("Press firmly on Yaa Shaddah (يّ) before stretching Alif!", "ज़ोर से य्य बोलें — सिर्फ़ इयाका नहीं!", "یاء مشدد پر مضبوطی سے رک کر کھینچیں", "Yaa par clear stress dein: Iy-yaa-ka (Iyaaka nahi!)", "تشديد الياء مع المد الطبيعي"),
				wbwWordPath: "wbw/001_005_001.mp3",
				quranAyahRef: "1:5",
				globalAyahNumber: 5
			},
			{
				id: "l14_inna",
				arabic: "إِنَّ",
				transliteration: "In-na (2-beat Ghunnah)",
				meaning: ml("Indeed / Verily", "बेशक", "بے شک", "Beshak (2-beat Ghunnah)", "إِنَّ"),
				tajweedRuleNote: ml("Hold nasal Ghunnah in نّ for 2 full beats!", "نّ पर नाक में 2 हरकत ग़ुन्ना रोकें!", "نّ پر دو حرکت غنہ کریں!", "نّ par 2 beats nasal hum (Ghunnah) rakhein!", "غنة نون مشددة حركتان"),
				wbwWordPath: "wbw/108_003_001.mp3",
				quranAyahRef: "108:3",
				globalAyahNumber: 6207
			},
			{
				id: "l14_thumma",
				arabic: "ثُمَّ",
				transliteration: "Thum-ma (2-beat Ghunnah)",
				meaning: ml("Then / Thereafter (102:4)", "फिर (102:4)", "پھر (102:4)", "Phir (2-beat Ghunnah)", "ثُمَّ (١٠٢:٤)"),
				tajweedRuleNote: ml("Close lips for 2 beats humming on مّ!", "مّ पर होंठ बंद करके 2 गिनती ग़ुन्ना करें", "مّ پر ہونٹ بند رکھ کر دو حرکت غنہ", "مّ par lips close karke 2 beats Ghunnah!", "غنة ميم مشددة حركتان"),
				wbwWordPath: "wbw/102_004_001.mp3",
				quranAyahRef: "102:4",
				globalAyahNumber: 6172
			}
		],
		quiz: {
			prompt: ml("Which TWO letters require a 2-beat nasal Ghunnah whenever they have Shaddah (ـّ)?", "किन 2 अक्षरों पर तश्दीद होने से 2 हरकत ग़ुन्ना ज़रूरी होता है?", "تشدید ہونے پر کن 2 حروف میں دو حرکت غنہ واجب ہوتا ہے؟", "Kin 2 letters par Shaddah ho toh 2-beat Ghunnah zaroori hai?", "ما الحرفان اللذان تجب فيهما الغنة عند التشديد؟"),
			arabicTarget: "نّ · مّ",
			options: [
				{
					label: "Noon & Meem (نّ ، مّ)",
					arabic: "نّ ، مّ ✓"
				},
				{
					label: "Baa & Taa (بّ ، تّ)",
					arabic: "بّ ، تّ"
				},
				{
					label: "Alif & Laam",
					arabic: "ا ، لّ"
				},
				{
					label: "Qaaf & Daal",
					arabic: "قّ ، دّ"
				}
			],
			correctIndex: 0,
			explanation: ml("Noon Mushaddadah (نّ) and Meem Mushaddadah (مّ) always carry a 2-beat Ghunnah!", "नून (نّ) और मीम (مّ) मुशद्ददा पर हमेशा 2 हरकत ग़ुन्ना होता है।", "نون اور میم مشدد پر ہمیشہ دو حرکت غنہ ہوتا ہے۔", "نّ aur مّ par hamesha 2 beats Ghunnah hota hai!", "النون والميم المشددتان فيهما غنة أكمل ما تكون."),
			globalAyahNumber: 6207
		}
	},
	{
		id: "qaida_l15_short_surah_reading",
		lessonNumber: 15,
		moduleId: "module_6_quran_fluency",
		isFreePreview: false,
		estimatedMinutes: 5,
		starsReward: 15,
		title: ml("Lesson 15: Word-by-Word Surah Al-Kawthar & Al-Ikhlas", "सबक़ 15: सूरह कौसर और इख़लास लफ़्ज़-ब-लफ़्ज़", "سبق 15: سورۃ الکوثر اور سورۃ الاخلاص کی مشق", "Lesson 15: Read Real Surahs with All Rules", "الدرس ١٥: تطبيق عملي في سورة الكوثر والإخلاص"),
		subtitle: ml("Combine Harakat, Sukoon, Madd, Ghunnah & Qalqalah in real Quran!", "सब क़ायदों को मिलाकर असली क़ुरआन पढ़ें!", "تمام قواعد کو ملا کر قرآن پڑھنے کی مشق", "Ab saare rules ek saath laga kar real Surahs padhein!", "تطبيق جميع قواعد القاعدة النورانية مع التلاوة"),
		ruleExplanation: ml("Tap each Ayah tile below to hear Sheikh Mishary Rashid Alafasy and spot the exact Qaida rules inside the verse!", "नीचे हर आयत पर टैप करके शेख़ मिशरी अलफ़ासी की तिलावत सुनें और उस आयत के तजवीद क़ायदे पहचानें।", "ہر آیت پر ٹیپ کر کے قاری صاحب کی تلاوت سنیں اور قواعد پہچانیں۔", "Har Ayah par tap karke Sheikh Alafasy ki voice sunein aur Qaida rules spot karein!", "استمع إلى التلاوة وتأمل اجتماع القواعد في كل آية."),
		tiles: [
			{
				id: "l15_kawthar1",
				arabic: "إِنَّآ أَعْطَيْنَـٰكَ ٱلْكَوْثَرَ",
				transliteration: "In-naaa a‘-tay-naa-kal-kaw-thar",
				meaning: ml("Indeed, We have granted you Al-Kawthar (108:1)", "बेशक हमने आपको कौसर अता किया (108:1)", "بے شک ہم نے آپ کو کوثر عطا کیا (108:1)", "Beshak Humne aapko Al-Kawthar ata kiya (108:1)", "سورة الكوثر الآية ١"),
				tajweedRuleNote: ml("Rules: نّ Ghunnah + ~ 4-beat Madd + Al-Qamariyyah L + soft ث", "नّ ग़ुन्ना + ~ बड़ा मद्द + क़मरी लाम + नरम ث", "نّ غنہ + مد منفصل + قمری لام", "نّ Ghunnah + 4-beat ~ Madd + Moon Al + soft Thaa", "غنة النون + مد منفصل + لام قمرية"),
				quranAyahRef: "108:1",
				globalAyahNumber: 6205
			},
			{
				id: "l15_kawthar2",
				arabic: "فَصَلِّ لِرَبِّكَ وَٱنْحَرْ",
				transliteration: "Fa-sal-li li-rab-bi-ka wan-har",
				meaning: ml("So pray to your Lord and sacrifice (108:2)", "तो अपने रब के लिए नमाज़ पढ़िए और क़ुर्बानी कीजिए (108:2)", "پس اپنے رب کے لیے نماز پڑھیے اور قربانی کیجیے (108:2)", "Toh apne Rabb ke liye Namaz padhein aur qurbani karein (108:2)", "سورة الكوثر الآية ٢"),
				tajweedRuleNote: ml("Rules: Heavy ص + Shaddah لّ & بّ + Clear Noon before ح", "मोटा ص + तश्दीद + इज़हार नून", "تفخيم الصاد + تشدید + اظہار نون", "Heavy Saad + Shaddah + Clear Noon before Haa", "تفخيم الصاد + تشديد + إظهار حلقي"),
				quranAyahRef: "108:2",
				globalAyahNumber: 6206
			},
			{
				id: "l15_ikhlas1",
				arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
				transliteration: "Qul hu-wal-laa-hu a-had",
				meaning: ml("Say: He is Allah, the One (112:1)", "कहिए: वह अल्लाह एक है (112:1)", "کہیے: وہ اللہ ایک ہے (112:1)", "Kahiye: Woh Allah Ek hai (112:1)", "سورة الإخلاص الآية ١"),
				tajweedRuleNote: ml("Rules: Heavy Qaaf + Heavy Lafz-e-Allah + Daal Qalqalah stop!", "मोटा क़ाफ़ + मोटा अल्लाह + द पर क़लक़ला!", "تفخیم قاف + لفظِ جلالہ پر + دال قلقلہ", "Heavy Q + Heavy Allah + Daal Qalqalah!", "تفخيم لفظ الجلالة + قلقلة الدال"),
				quranAyahRef: "112:1",
				globalAyahNumber: 6222
			},
			{
				id: "l15_ikhlas2",
				arabic: "ٱللَّهُ ٱلصَّمَدُ",
				transliteration: "Al-laa-hus-sa-mad",
				meaning: ml("Allah, the Eternal Refuge (112:2)", "अल्लाह बेनियाज़ है (112:2)", "اللہ بے نیاز ہے (112:2)", "Allah Be-niyaz hai (112:2)", "سورة الإخلاص الآية ٢"),
				tajweedRuleNote: ml("Rules: Sun letter صّ skips L + Daal Qalqalah stop!", "शम्सी صّ + द पर क़लक़ला!", "شمسی صاد + دال قلقلہ!", "Sun letter Saad skips L + Daal Qalqalah at end!", "لام شمسية في الصاد + قلقلة الدال"),
				quranAyahRef: "112:2",
				globalAyahNumber: 6223
			}
		],
		quiz: {
			prompt: ml("In ٱللَّهُ ٱلصَّمَدُ (112:2), which rule applies on the second word ٱلصَّمَدُ ?", "ٱلصَّمَدُ में कौन सा क़ायदा लागू होता है?", "ٱلصَّمَدُ میں کون سا قاعدہ لاگو ہوتا ہے؟", "ٱلصَّمَدُ mein kaun sa Tajweed rule lagta hai?", "ما القاعدة الموجودة في ٱلصَّمَدُ؟"),
			arabicTarget: "ٱلصَّمَدُ",
			options: [
				{
					label: "Sun letter (skip L) + Daal Qalqalah",
					arabic: "صّ + دْ ✓"
				},
				{
					label: "Noon Ghunnah",
					arabic: "نّ"
				},
				{
					label: "Moon letter L clear",
					arabic: "لْ"
				},
				{
					label: "6-beat Lazim Madd",
					arabic: "~"
				}
			],
			correctIndex: 0,
			explanation: ml("Saad is a Sun letter (Allahus-Samad, skipping L) and stopping on Daal makes Qalqalah!", "ص शम्सी अक्षर है इसलिए \"ल\" साइलेंट है, और द पर रुकने पर क़लक़ला होता है।", "صاد شمسی حرف ہے اور آخر میں دال پر قلقلہ ہے۔", "Sun letter Saad (skip L) aur end mein Daal Qalqalah!", "لام شمسية مدغمة في الصاد وقلقلة الدال عند الوقف."),
			globalAyahNumber: 6223
		}
	},
	{
		id: "qaida_l16_common_traps",
		lessonNumber: 16,
		moduleId: "module_6_quran_fluency",
		isFreePreview: false,
		estimatedMinutes: 4,
		starsReward: 12,
		title: ml("Lesson 16: Sound-Alike Contrast Pairs (No Mistakes!)", "सबक़ 16: मिलते-जुलते अक्षरों का फ़र्क़", "سبق 16: ملتے جلتے حروف کا فرق", "Lesson 16: Similar Letters Mastery (ق/ك, ص/س, ح/ه)", "الدرس ١٦: التمييز بين الحروف المتشابهة"),
		subtitle: ml("Don’t mix up Qalb (heart) and Kalb (dog) — precision builds mastery!", "सही मख़रज से हर शब्द का सही मतलब बनाए रखें", "تلفظ کے معمولی فرق سے معنی بدل جاتے ہیں", "Sahi Makhraj se Quranic words bilkul accurate padhein!", "التدريب على الحروف المتقاربة مخرجاً"),
		ruleExplanation: ml("In Arabic, changing one heavy/light or throat letter changes the entire word meaning. Compare these 4 essential pairs carefully!", "अरबी में एक भी अक्षर मोटा या हल्का गलत पढ़ने से पूरा मतलब बदल जाता है। इन जोड़ियों को ध्यान से सुनें।", "عربی میں ایک حرف کی غلطی سے معنی بدل جاتا ہے۔ ان جوڑوں کی توجہ سے مشق کریں۔", "Arabic mein ek letter heavy/light mistake se meaning badal sakta hai. Dhyan se compare karein!", "الفرق الدقيق بين التفخيم والترقيق يحفظ معنى الكلمة."),
		tiles: [
			{
				id: "l16_qalb_kalb",
				arabic: "قَلْبٍ × كَلْبٍ",
				transliteration: "Qalb (Heart) vs Kalb (Dog)",
				meaning: ml("Deep Qaaf (ق) = Heart; Light Kaaf (ك) = Dog", "मोटा क़ाफ़ = दिल; हल्का काफ़ = कुत्ता", "موٹا قاف = دل؛ ہلکا کاف = کتا", "Heavy Qaaf = Dil; Light Kaaf = Kutta", "قَلْب (فؤاد) و كَلْب (حيوان)"),
				tajweedRuleNote: ml("Always keep Qaaf deep and back-of-throat!", "क़ाफ़ हमेशा गहरा और मोटा बोलें", "قاف کو ہمیشہ گہرا اور پر پڑھیں", "Qaaf ko hamesha deep throat/back palate se padhein!", "قاف أقصى اللسان مفخم"),
				quranAyahRef: "26:89",
				globalAyahNumber: 3021
			},
			{
				id: "l16_saad_seen",
				arabic: "عَصَىٰ × عَسَىٰ",
				transliteration: "‘Asaa (Disobeyed) vs ‘Asaa (Perhaps)",
				meaning: ml("Heavy Saad (ص) vs Light Seen (س)", "मोटा साद बनाम पतला सीन", "پر صاد بمقابلہ باریک سین", "Heavy Saad vs Light Seen", "الصاد المفخمة والسين المرققة"),
				tajweedRuleNote: ml("Round tongue back for ص, smile slightly for س", "ص मोटा और गोल; س पतला और सादा", "ص پر اور س باریک", "ص heavy full-mouth, س light whistle", "صاد مستعلية وسين مستفلة"),
				quranAyahRef: "20:121",
				globalAyahNumber: 2469
			},
			{
				id: "l16_haa_haa",
				arabic: "رَحْمَٰن × أَهْل",
				transliteration: "Sharp Throat ح vs Soft Chest ه",
				meaning: ml("Sharp Haa (ح) vs Soft Haa (ه)", "गले का तीखा हा (ح) बनाम नरम हा (ه)", "تیز حا (ح) بمقابلہ نرم ہا (ہ)", "Middle throat ح vs Chest soft ه", "الحاء الوسطية والهاء القصوى"),
				tajweedRuleNote: ml("Feel a clean breeze in middle throat on ح", "ح में गले के बीच हल्की ठंडी हवा महसूस करें", "ح میں حلق کے درمیان سے صاف ہوا نکلے", "ح mein throat se crisp breeze aani chahiye", "الحاء من وسط الحلق"),
				quranAyahRef: "1:1",
				globalAyahNumber: 1
			},
			{
				id: "l16_thaa_seen",
				arabic: "كَوْثَرَ × كَسَرَ",
				transliteration: "Soft Thaa (ث) vs Seen (س)",
				meaning: ml("Tip-of-tongue Thaa vs whistling Seen", "ज़ुबान की नोक वाला ث बनाम सीटी वाला س", "زبان کی نوک والا ث بمقابلہ س", "Soft Thaa vs whistling Seen", "الثاء اللثوية والسين الصفيرية"),
				tajweedRuleNote: ml("Zero whistle on ث — touch upper teeth tip softly!", "ث में सीटी की आवाज़ न आए", "ث میں سیٹی کی آواز نہ آئے", "ث mein whistle nahi honi chahiye", "الثاء بدون صفير"),
				quranAyahRef: "108:1",
				globalAyahNumber: 6205
			}
		],
		quiz: {
			prompt: ml("Which letter gives a crisp breathy sound from the MIDDLE of the throat (not the chest)?", "इनमें से कौन सा अक्षर गले के बीच से साफ़ निकलता है?", "ان میں سے کون سا حرف حلق کے درمیان سے نکلتا ہے؟", "Inme se kaun sa Haa middle throat se nikalta hai?", "أي حرف يخرج من وسط الحلق؟"),
			arabicTarget: "ح × ه",
			options: [
				{
					label: "Sharp Haa (ح)",
					arabic: "ح ✓"
				},
				{
					label: "Soft Haa (ه)",
					arabic: "ه"
				},
				{
					label: "Seen (س)",
					arabic: "س"
				},
				{
					label: "Faa (ف)",
					arabic: "ف"
				}
			],
			correctIndex: 0,
			explanation: ml("Sharp Haa (ح) comes from the middle of the throat, whereas ه comes from the deepest part near the chest.", "ح बीच गले से और ه नीचे सीने के पास वाले गले से निकलता है।", "ح حلق کے درمیان سے اور ہ سینے کی طرف سے نکلتا ہے۔", "ح middle throat se aur ه chest ke paas wale throat se aata hai!", "الحاء من وسط الحلق والهاء من أقصى الحلق."),
			letterAudioSlug: "haa"
		}
	},
	{
		id: "qaida_l17_graduation",
		lessonNumber: 17,
		moduleId: "module_6_quran_fluency",
		isFreePreview: false,
		estimatedMinutes: 5,
		starsReward: 20,
		title: ml("Lesson 17: Noorani Qaida Final Graduation Challenge", "सबक़ 17: नूरानी क़ायदा फाइनल इम्तिहान", "سبق 17: نورانی قاعدہ تکمیلی امتحان", "Lesson 17: Final Qaida Graduation Challenge", "الدرس ١٧: اختبار التخرج من القاعدة النورانية"),
		subtitle: ml("Pass the final challenge to unlock your Noorani Qaida Graduate Certificate!", "आख़िरी इम्तिहान पास करके अपना सर्टिफ़िकेट अनलॉक करें!", "آخری امتحان پاس کر کے اپنا سرٹیفکیٹ حاصل کریں!", "Final test pass karke apna Qaida Certificate jeetein!", "اجتز الاختبار لتنال شهادة القاعدة النورانية"),
		ruleExplanation: ml("Review the core pillars — Harakat, Tanween, Sukoon, Qalqalah, Madd & Shaddah — and complete the final quiz to graduate to full Mushaf reading!", "हरकात, तनवीन, सुकून, क़लक़ला, मद्द और तश्दीद दोहराएं और क़ुरआन पढ़ने के लिए तैयार हों!", "تمام بنیادی قواعد کی دہرائی کر کے قرآن کریم کی تلاوت شروع کریں!", "Saare main rules revise karein aur Final Graduation Quiz pass karke Certificate paayein!", "مراجعة شاملة تهيئك لقراءة المصحف الشريف بإتقان."),
		tiles: [{
			id: "l17_bismillah",
			arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
			transliteration: "Bismillaahir-Rahmaanir-Raheem",
			meaning: ml("In the name of Allah, Most Merciful (1:1)", "अल्लाह के नाम से जो बहुत मेहरबान है (1:1)", "اللہ کے نام سے جو بڑا مہربان ہے (1:1)", "Allah ke naam se jo nihayat Reham wala hai (1:1)", "البسملة كاملة"),
			tajweedRuleNote: ml("Full mastery: Crisp Kasra (بِ) + Light Allah + Heavy Raa (ٱلرَّ) + Madd-e-Aarid stop (ـيـم)", "पूरा निचोड़: बिस्मि · हल्का अल्लाह · मोटा र · आख़िर में मद्द", "مکمل تطبیق: کسرہ، لفظِ جلالہ باریک، را پر، مد عارض", "Crisp Zer + Light Allah + Heavy Raa + Madd stop!", "تطبيق شامل لأهم قواعد التجويد"),
			quranAyahRef: "1:1",
			globalAyahNumber: 1
		}, {
			id: "l17_ikhlas_end",
			arabic: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
			transliteration: "Wa lam yakul-lahu kufuwan ahad",
			meaning: ml("And there is none comparable to Him (112:4)", "और कोई उसके बराबर नहीं (112:4)", "اور کوئی اس کا ہمسر نہیں (112:4)", "Aur koi Uske barabar nahi (112:4)", "سورة الإخلاص الآية ٤"),
			tajweedRuleNote: ml("Idgham without Ghunnah (يَكُن لَّهُ) + Tanween + Daal Qalqalah stop!", "नून साकिन लाम में मिल गया + तनवीन + क़लक़ला!", "ادغام بلا غنہ + تنوین + قلقلہ", "Idgham (yakul-lahu) + Tanween + Qalqalah!", "إدغام بلا غنة + تنوين + قلقلة"),
			quranAyahRef: "112:4",
			globalAyahNumber: 6225
		}],
		quiz: {
			prompt: ml("In بِسْمِ ٱللَّهِ, why is the name of \"Allah\" pronounced LIGHT (Tarqeeq)?", "بِسْمِ ٱللَّهِ में \"अल्लाह\" को हल्का (बारीक) क्यों पढ़ा जाता है?", "بِسْمِ ٱللَّهِ میں لفظِ اللہ کو باریک کیوں پڑھا جاتا ہے؟", "بِسْمِ ٱللَّهِ mein \"Allah\" light kyun padha jaata hai?", "لماذا يُرقق لفظ الجلالة في بِسْمِ ٱللَّهِ؟"),
			arabicTarget: "بِسْمِ ٱللَّهِ",
			options: [
				{
					label: "Because Kasra (Zer ـِ) comes right before it",
					arabic: "مِ + ٱللَّهِ ✓"
				},
				{
					label: "Because it is at the end",
					arabic: "ـه"
				},
				{
					label: "Because Fatha precedes it",
					arabic: "ـَ"
				},
				{
					label: "Because of Qalqalah",
					arabic: "ق ط ب ج د"
				}
			],
			correctIndex: 0,
			explanation: ml("MashaAllah! Whenever Kasra (ـِ) comes right before ٱللَّه, it is read light (Bismi-llaah). After Fatha/Damma, it is heavy!", "माशाअल्लाह! जब अल्लाह शब्द से ठीक पहले ज़ेर (ـِ) आए तो हल्का पढ़ा जाता है (बिस्मिल्लाह)!", "ما شاء اللہ! لفظِ اللہ سے پہلے زیر ہو تو باریک پڑھا جاتا ہے!", "MashaAllah! Allah se pehle Zer (ـِ) ho toh light (Bismi-llaah), Zabar/Pesh ho toh heavy!", "إذا سبق لفظ الجلالة كسرة رُققت لامه."),
			globalAyahNumber: 1
		}
	}
];
function resolveQaidaText(map, lang) {
	return map[lang] || map.en || "";
}
export { resolveQaidaText as a, buildArabicLetterJoinPreview as i, NOORANI_QAIDA_COURSE_LESSONS as n, QAIDA_MODULES as r, ARABIC_LETTER_JOIN_FORMS as t };
