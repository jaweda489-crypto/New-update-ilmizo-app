const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdultModeView-B1sEPexT.js","assets/rolldown-runtime-DQp2zzRu.js","assets/vendor-icons-DCckKQxi.js","assets/vendor-motion-DfqbQRzE.js","assets/data-islamic-content-DVwdNHPG.js","assets/vendor-capacitor-BtYYifC8.js","assets/FamilyPlusPaywallModal-B_X5oIMT.js","assets/storyVoiceRecorder-CtwnVwnJ.js","assets/studioAudioAndTajweedService-DF0oWwfx.js","assets/KidsWorldView-lF1loSCa.js","assets/nooraniQaidaCourse-DdAqOF7e.js","assets/dailyTarbiyahPlanEngine-BDxia3dk.js","assets/ParentHubView-B3pllX08.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_client } from "./vendor-react-CoNEUsWJ.js";
import { $ as Flame, C as ShieldCheck, D as Search, Dt as Bell, Et as BookMarked, Ft as require_react, I as Pause, K as Info, L as Moon, Mt as ArrowRight, N as Play, Nt as ArrowLeft, R as Monitor, Tt as BookOpen, U as LoaderCircle, V as Lock, X as Globe, Y as HardDrive, Z as GraduationCap, _ as Sparkles, _t as ChevronRight, a as VolumeX, b as SkipForward, bt as Check, c as User, dt as Clock, f as Timer, gt as ChevronUp, ht as CircleAlert, it as Ellipsis, m as Sun, n as WifiOff, o as Volume2, q as House, t as X, yt as ChevronDown } from "./vendor-icons-DCckKQxi.js";
import { i as require_jsx_runtime, n as useReducedMotion, r as AnimatePresence, t as motion } from "./vendor-motion-DfqbQRzE.js";
import { $ as createEmptySalahDayRecord, A as deleteOfflineSurahFromDb, C as resolveAyahAudioUrl, D as deleteAllDownloadedOfflineSurahs, E as computeLocalStorageMetrics, F as hydrateOrMigrateMasterState, H as saveOfflineAudioToDb, I as listOfflineAudioRecords, J as appendLearningEvent, L as listOfflineSurahRecords, M as getOfflineAudioFromDb, N as getOfflineSurahFromDb, O as deleteAllOfflineAudioFromDb, P as getRecoverySnapshot, R as readLegacyMasterStateSync, S as removeDownloadedOfflineSurah, T as clearNonDownloadedApiCache, U as saveOfflineSurahToDb, V as saveMasterStateToLocalDb, W as saveRecoverySnapshot, X as computeLearningStreak, _ as BUNDLED_SURAH_AYAHS, ct as validateSurahPayload, et as deriveHifzPlanState, g as ALL_114_SURAHS, i as KIDS_STORIES, it as refreshRevisionQueueDueStatuses, k as deleteOfflineAudioFromDb, lt as SUPPORTED_LANGUAGES, ot as scheduleHifzRevision, rt as parseHifzAyahRange, tt as getLocalDateKey$1, ut as translationService, v as VERIFIED_RECITER_EDITIONS, w as resolveReciterConfig, x as getSurahPayload, y as downloadSurahForOfflineUse, z as requestPersistentLocalStorage } from "./data-islamic-content-DVwdNHPG.js";
import { a as NotificationType, i as ImpactStyle, n as Haptics, o as Capacitor, r as __vitePreload, s as registerPlugin } from "./vendor-capacitor-BtYYifC8.js";
// \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
// src/services/themeService.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_client = require_client();
var THEME_MODE_STORAGE_KEY = "ilmizo_theme_mode_v1";
function isValidThemeMode(value) {
	return value === "light" || value === "dark" || value === "system";
}
function getSystemPrefersDark() {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
	try {
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	} catch {
		return false;
	}
}
function loadThemeMode(legacyDarkMode) {
	if (typeof localStorage !== "undefined") try {
		const stored = localStorage.getItem(THEME_MODE_STORAGE_KEY);
		if (isValidThemeMode(stored)) return stored;
	} catch {}
	if (legacyDarkMode === true) return "dark";
	return "light";
}
function saveThemeMode(mode) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
	} catch {}
}
function resolveThemeMode(mode, systemPrefersDark = getSystemPrefersDark()) {
	if (mode === "dark") return "dark";
	if (mode === "light") return "light";
	return systemPrefersDark ? "dark" : "light";
}
function applyThemeToDocument(mode, systemPrefersDark = getSystemPrefersDark()) {
	const resolved = resolveThemeMode(mode, systemPrefersDark);
	if (typeof document !== "undefined") {
		const root = document.documentElement;
		root.classList.toggle("dark", resolved === "dark");
		root.setAttribute("data-theme", resolved);
		root.style.colorScheme = resolved;
		const metaTheme = document.querySelector("meta[name=\"theme-color\"]");
		if (metaTheme) metaTheme.setAttribute("content", resolved === "dark" ? "#071610" : "#0F3826");
	}
	return resolved;
}
function subscribeSystemThemeChanges(onChange) {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => {};
	const mq = window.matchMedia("(prefers-color-scheme: dark)");
	const handler = (event) => {
		onChange(event.matches);
	};
	if (typeof mq.addEventListener === "function") {
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}
	return () => {};
}
// src/data/salahCompleteGuide.ts
var COMPLETE_SALAH_RECITATIONS = [
	{
		id: "rec_thana",
		stepOrder: 1,
		title: "Opening Supplication (Thana / Istiftah)",
		localizedTitles: {
			en: "Opening Supplication (Thana / Istiftah)",
			hi: "सना (नमाज़ की शुरुआती दुआ)",
			ur: "ثناء (نماز کی ابتدائی دعا)",
			hinglish: "Thana (Namaz ki shuruati dua)",
			ar: "دعاء الاستفتاح (الثناء)"
		},
		stage: "opening",
		arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ",
		transliteration: "Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta‘ala jadduka, wa la ilaha ghayruk.",
		translations: {
			en: "Glory be to You, O Allah, and praise be to You; blessed is Your Name, exalted is Your Majesty, and there is no deity worthy of worship besides You.",
			hi: "ऐ अल्लाह! तू पाक है अपनी तमाम तारीफ़ों के साथ, तेरा नाम बरकत वाला है, तेरी शान बुलंद है, और तेरे सिवा कोई माबूद नहीं।",
			ur: "اے اللہ! تو اپنی حمد کے ساتھ پاک ہے، تیرا نام بابرکت ہے، تیری شان بلند ہے، اور تیرے سوا کوئی معبود نہیں۔",
			hinglish: "Ai Allah! Tu apni tareef ke saath paak hai, Tera naam barkat wala hai, Teri shaan buland hai, aur Tere siwa koi mabood nahi.",
			ar: "تنزيهٌ لله تعالى وثناءٌ عليه بصفاته العلى في مطلع الصلاة."
		},
		whenRecited: "Recited silently in the 1st Rak’ah immediately after Takbiratul Ihram (Allahu Akbar).",
		localizedWhenRecited: {
			en: "Recited silently in the 1st Rak’ah immediately after Takbiratul Ihram (Allahu Akbar).",
			hi: "पहली रकात में तकबीर-ए-तहरीमा (अल्लाहु अकबर) के तुरंत बाद आहिस्ता पढ़ी जाती है।",
			ur: "پہلی رکعت میں تکبیر تحریمہ کے فوراً بعد آہستہ پڑھی جاتی ہے۔",
			hinglish: "Pehli rakat mein Takbir-e-Tahrima ke turant baad aahista padhi jaati hai.",
			ar: "يُقرأ سرّاً في الركعة الأولى بعد تكبيرة الإحرام."
		},
		madhhabNotes: {
			Hanafi: "Sunnah Mu’akkadah to recite Subhanaka Allahumma silently before Ta’awwudh.",
			Shafii: "Recommended (Sunnah) after Takbir; Wajjahtu wajhiya or Subhanaka Allahumma are both authentic options.",
			Maliki: "In the Maliki school, one proceeds directly to Al-Fatiha in obligatory prayers (opening Istiftah is optional in Nafl).",
			Hanbali: "Sunnah to recite Subhanaka Allahumma after Takbiratul Ihram."
		},
		sourceReference: "Sunan Abi Dawud 775, Jami` at-Tirmidhi 243"
	},
	{
		id: "rec_fatiha",
		stepOrder: 2,
		title: "Surah Al-Fatiha (The Opening)",
		localizedTitles: {
			en: "Surah Al-Fatiha (The Opening)",
			hi: "सूरह अल-फ़ातिहा",
			ur: "سورۃ الفاتحہ",
			hinglish: "Surah Al-Fatiha",
			ar: "سورة الفاتحة"
		},
		stage: "qiyam",
		arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
		transliteration: "Bismillahir-Rahmanir-Rahim. Alhamdu lillahi Rabbil-‘alamin. Ar-Rahmanir-Rahim. Maliki yawmid-din. Iyyaka na‘budu wa iyyaka nasta‘in. Ihdinas-Siratal-Mustaqim. Siratal-ladhina an‘amta ‘alayhim ghayril-maghdubi ‘alayhim wa lad-dallin. (Amin)",
		translations: {
			en: "In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is [due] to Allah, Lord of the worlds — The Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path — The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
			hi: "अल्लाह के नाम से जो बड़ा मेहरबान, निहायत रहम वाला है। सब तारीफ़ अल्लाह के लिए है जो सारे जहानों का रब है। बड़ा मेहरबान, निहायत रहम वाला। बदले के दिन का मालिक। हम तेरी ही इबादत करते हैं और तुझी से मदद माँगते हैं। हमें सीधे रास्ते पर चला। उन लोगों के रास्ते पर जिन पर तूने इनाम किया।",
			ur: "اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ سب تعریف اللہ کے لیے ہے جو تمام جہانوں کا رب ہے۔ بڑا مہربان نہایت رحم والا۔ روزِ جزا کا مالک۔ ہم تیری ہی عبادت کرتے ہیں اور تجھی سے مدد مانگتے ہیں۔ ہمیں سیدھا راستہ دکھا۔ ان لوگوں کا راستہ جن پر تو نے انعام فرمایا۔",
			hinglish: "Allah ke naam se jo bada Meharban, nihayat Raham wala hai. Sab tareef Allah ke liye hai jo saare jahano ka Rab hai. Bada Meharban, nihayat Raham wala. Badle ke din ka Maalik. Hum Teri hi ibadat karte hain aur Tujhi se madad maangte hain. Humein seedha raasta dikha.",
			ar: "أمّ القرآن والسبع المثاني التي تُقرأ في كل ركعة من الصلاة."
		},
		whenRecited: "Recited while standing (Qiyam) in every Rak’ah of prayer, followed by an additional Surah or verses in the first two Rak’ahs.",
		localizedWhenRecited: {
			en: "Recited while standing (Qiyam) in every Rak’ah of prayer.",
			hi: "नमाज़ की हर रकात में क़ियाम (खड़े होने की हालत) में पढ़ी जाती है।",
			ur: "نماز کی ہر رکعت میں قیام کی حالت میں پڑھی جاتی ہے۔",
			hinglish: "Namaz ki har rakat mein Qiyam (khade hone ki haalat) mein padhi jaati hai.",
			ar: "تُقرأ في القيام في كل ركعة من ركعات الصلاة."
		},
		madhhabNotes: {
			Hanafi: "Wajib in prayer; Bismillah is recited silently before Al-Fatiha, and Amin is said silently.",
			Shafii: "Pillar (Rukn) in every Rak’ah for both Imam and follower; Bismillah is counted as a verse of Al-Fatiha and Amin is said audibly in audible prayers.",
			Maliki: "Pillar (Rukn) for the individual and Imam; behind an Imam in audible prayers, the follower listens attentively.",
			Hanbali: "Pillar (Rukn) of prayer; Bismillah is recited silently and Amin is said audibly in audible prayers."
		},
		sourceReference: "Surah Al-Fatiha 1:1-7 · Sahih al-Bukhari 756"
	},
	{
		id: "rec_ruku_qawmah",
		stepOrder: 3,
		title: "Ruku (Bowing) & Rising (Qawmah)",
		localizedTitles: {
			en: "Ruku (Bowing) & Rising (Qawmah)",
			hi: "रुकू और क़ौमा (रुकू से उठने) की तसबीह",
			ur: "رکوع اور قومہ کی تسبیح",
			hinglish: "Ruku aur Qawmah ki Tasbih",
			ar: "أذكار الركوع والرفع منه (القومة)"
		},
		stage: "ruku",
		arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ (٣ مرات) — سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ — رَبَّنَا وَلَكَ الْحَمْدُ",
		transliteration: "Subhana Rabbiyal-‘Adhim (3x) — [While rising:] Sami‘Allahu liman hamidah — [Standing upright:] Rabbana wa lakal-hamd.",
		translations: {
			en: "Glory be to my Lord, the Most Great (3 times). — Allah hears the one who praises Him. — Our Lord, to You belongs all praise.",
			hi: "पाक है मेरा रब जो सबसे अज़मत वाला है (3 बार)। — अल्लाह ने उसकी बात सुन ली जिसने उसकी तारीफ़ की। — ऐ हमारे रब! तेरे ही लिए सब तारीफ़ है।",
			ur: "پاک ہے میرا رب جو بڑی عظمت والا ہے (3 بار)۔ — اللہ نے اس کی سن لی جس نے اس کی تعریف کی۔ — اے ہمارے رب! تیرے ہی لیے تمام تعریف ہے۔",
			hinglish: "Paak hai mera Rab jo sabse azmat wala hai (3x). — Allah ne uski sun li jisne Uski tareef ki. — Ai hamare Rab! Tere hi liye sab tareef hai.",
			ar: "تعظيم الله في الركوع وحمده عند الاعتدال قائماً."
		},
		whenRecited: "Say Subhana Rabbiyal-Adhim 3 times in Ruku; say Sami Allahu liman hamidah while rising, and Rabbana wa lakal-hamd when standing straight.",
		localizedWhenRecited: {
			en: "In Ruku (3x) and upon rising upright with composure (Tuma’ninah).",
			hi: "रुकू में कम से कम 3 बार और रुकू से सीधे खड़े होते समय इत्मीनान के साथ।",
			ur: "رکوع میں کم از کم 3 بار اور رکوع سے سیدھے کھڑے ہوتے وقت اطمینان کے ساتھ۔",
			hinglish: "Ruku mein 3 baar aur Ruku se seedhe khade hote waqt itminan ke saath.",
			ar: "في الركوع ثلاثاً وعند الاعتدال قائماً بطمأنينة."
		},
		madhhabNotes: {
			Hanafi: "Saying Subhana Rabbiyal-Adhim 3 times is Sunnah; calm composure in Ruku and Qawmah is Wajib.",
			Shafii: "Calm stillness (Tuma’ninah) in both Ruku and standing upright (I’tidal) is an essential Pillar (Rukn).",
			Maliki: "Stillness (Tuma’ninah) in Ruku and rising is obligatory (Fard).",
			Hanbali: "Saying Subhana Rabbiyal-Adhim at least once in Ruku and Sami Allahu liman hamidah / Rabbana wa lakal-hamd is Wajib."
		},
		sourceReference: "Sahih Muslim 772, Sahih al-Bukhari 796"
	},
	{
		id: "rec_sujood_jalsa",
		stepOrder: 4,
		title: "Sujood (Prostration) & Sitting Between Two Prostrations (Jalsa)",
		localizedTitles: {
			en: "Sujood (Prostration) & Jalsa (Sitting Between Prostrations)",
			hi: "सज्दा और जलसा (दो सज्दों के बीच बैठने की दुआ)",
			ur: "سجدہ اور جلسہ (دو سجدوں کے درمیان کی دعا)",
			hinglish: "Sujood aur Jalsa (Do sajdon ke beech ki dua)",
			ar: "أذكار السجود والجلوس بين السجدتين"
		},
		stage: "sujood",
		arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى (٣ مرات) — رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي",
		transliteration: "Subhana Rabbiyal-A‘la (3x in each Sujood) — [Between the two prostrations:] Rabbighfir li, Rabbighfir li.",
		translations: {
			en: "Glory be to my Lord, the Most High (3 times). — [Sitting between the two prostrations:] My Lord, forgive me; my Lord, forgive me.",
			hi: "पाक है मेरा रब जो सबसे बुलंद है (3 बार)। — (दोनों सज्दों के बीच बैठकर:) ऐ मेरे रब! मुझे बख़्श दे, ऐ मेरे रब! मुझे बख़्श दे।",
			ur: "پاک ہے میرا رب جو سب سے بلند ہے (3 بار)۔ — (دونوں سجدوں کے درمیان بیٹھ کر:) اے میرے رب! مجھے بخش دے، اے میرے رب! مجھے بخش دے۔",
			hinglish: "Paak hai mera Rab jo sabse buland hai (3x). — (Dono sajdon ke beech:) Ai mere Rab! Mujhe bakhsh de.",
			ar: "تسبيح الله الأعلى في السجود وسؤاله المغفرة في الجلسة بين السجدتين."
		},
		whenRecited: "Recite Subhana Rabbiyal-A’la 3 times in the 1st Sujood, sit calmly for Jalsa saying Rabbighfir li, then perform the 2nd Sujood.",
		localizedWhenRecited: {
			en: "In both prostrations (3x each) and while sitting calmly between them.",
			hi: "दोनों सज्दों में 3-3 बार और दोनों सज्दों के बीच सीधा बैठकर।",
			ur: "دونوں سجدوں میں تین تین بار اور دونوں سجدوں کے درمیان اطمینان سے بیٹھ کر۔",
			hinglish: "Dono sajdon mein 3-3 baar aur dono ke beech aaram se baith kar.",
			ar: "في السجدتين وفي الجلسة المطمئنة بينهما."
		},
		madhhabNotes: {
			Hanafi: "Forehead, nose, both palms, both knees, and toes of both feet touch the ground cleanly.",
			Shafii: "Seven bones (forehead, both palms, both knees, and undersides of toes of both feet) must rest on the ground.",
			Maliki: "Resting on the seven limbs with stillness between the two prostrations.",
			Hanbali: "Resting all seven limbs on the ground and saying Rabbighfir li between the two prostrations is Wajib."
		},
		sourceReference: "Sunan an-Nasa’i 1136, Sunan Abi Dawud 874"
	},
	{
		id: "rec_tashahhud",
		stepOrder: 5,
		title: "At-Tahiyyat (Tashahhud)",
		localizedTitles: {
			en: "At-Tahiyyat (Tashahhud in Sitting Position)",
			hi: "अत्तहिय्यात (तशह्हुद)",
			ur: "التحیات (تشہد)",
			hinglish: "At-Tahiyyat (Tashahhud)",
			ar: "التحيات (التشهد)"
		},
		stage: "tashahhud",
		arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
		transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu ‘alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. As-salamu ‘alayna wa ‘ala ‘ibadillahis-salihin. Ash-hadu an la ilaha illallahu wa ash-hadu anna Muhammadan ‘abduhu wa rasuluh.",
		translations: {
			en: "All compliments, prayers, and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity worthy of worship except Allah, and I bear witness that Muhammad is His servant and Messenger.",
			hi: "तमाम ज़बानी, बदनी और माली इबादतें अल्लाह ही के लिए हैं। ऐ नबी ﷺ! आप पर सलाम हो और अल्लाह की रहमत और उसकी बरकतें हों। सलाम हो हम पर और अल्लाह के तमाम नेक बंदों पर। मैं गवाही देता हूँ कि अल्लाह के सिवा कोई माबूद नहीं और मैं गवाही देता हूँ कि मुहम्मद ﷺ उसके बंदे और रसूल हैं।",
			ur: "تمام قولی، بدنی اور مالی عبادتیں اللہ ہی کے لیے ہیں۔ اے نبی ﷺ! آپ پر سلام ہو اور اللہ کی رحمت اور اس کی برکتیں ہوں۔ سلام ہو ہم پر اور اللہ کے نیک بندوں پر۔ میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور میں گواہی دیتا ہوں کہ محمد ﷺ اس کے بندے اور رسول ہیں۔",
			hinglish: "Tamam ibadatein aur paak kalmaat Allah ke liye hain. Ai Nabi ﷺ! Aap par salam ho aur Allah ki rahmat aur barkatein hon. Salam ho hum par aur Allah ke nek bandon par. Main gawahi deta hoon ki Allah ke siwa koi mabood nahi aur Muhammad ﷺ Uske bande aur Rasool hain.",
			ar: "التشهد المأثور عن ابن مسعود رضي الله عنه في القعود الأوسط والأخير."
		},
		whenRecited: "Recited while sitting after the 2nd Rak’ah (middle sitting) and in the final sitting (Qa’dah Akhirah) of every prayer.",
		localizedWhenRecited: {
			en: "Recited in the sitting position after the 2nd Rak’ah and in the final sitting of every prayer.",
			hi: "दूसरी रकात के बाद बैठने में और हर नमाज़ की आख़िरी बैठक (क़ादा अख़ीरा) में पढ़ी जाती है।",
			ur: "دوسری رکعت کے بعد قعدہ اولیٰ میں اور ہر نماز کے قعدہ اخیرہ میں پڑھی جاتی ہے۔",
			hinglish: "Doosri rakat ke baad aur har namaz ki aakhiri baithak mein padhi jaati hai.",
			ar: "يُقرأ في التشهد الأول والتشهد الأخير من كل صلاة."
		},
		madhhabNotes: {
			Hanafi: "Tashahhud of Ibn Mas’ud (RA) shown above is Wajib in both middle and final sittings.",
			Shafii: "Tashahhud of Ibn Abbas (At-tahiyyatul-mubarakatus-salawatut-tayyibatu lillah...) or Ibn Mas’ud are both valid; final Tashahhud is a Pillar (Rukn).",
			Maliki: "Tashahhud of Umar ibn Al-Khattab (RA) or Ibn Mas’ud (RA) is recited.",
			Hanbali: "Tashahhud of Ibn Mas’ud (RA) is Wajib in the first sitting and a Pillar (Rukn) in the final sitting."
		},
		sourceReference: "Sahih al-Bukhari 831, Sahih Muslim 402"
	},
	{
		id: "rec_durood_ibrahim",
		stepOrder: 6,
		title: "Durood Ibrahim (As-Salatu al-Ibrahimiyyah)",
		localizedTitles: {
			en: "Durood Ibrahim (Salawat upon the Prophet ﷺ)",
			hi: "दुरूद-ए-इब्राहीमी",
			ur: "درودِ ابراہیمی",
			hinglish: "Durood-e-Ibrahimi",
			ar: "الصلاة الإبراهيمية"
		},
		stage: "durood",
		arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
		transliteration: "Allahumma salli ‘ala Muhammadin wa ‘ala ali Muhammadin kama sallayta ‘ala Ibrahima wa ‘ala ali Ibrahima innaka Hamidum-Majid. Allahumma barik ‘ala Muhammadin wa ‘ala ali Muhammadin kama barakta ‘ala Ibrahima wa ‘ala ali Ibrahima innaka Hamidum-Majid.",
		translations: {
			en: "O Allah, send grace and honor upon Muhammad and upon the family of Muhammad, just as You sent grace and honor upon Ibrahim and upon the family of Ibrahim; indeed, You are Praiseworthy, Glorious. O Allah, bless Muhammad and the family of Muhammad, just as You blessed Ibrahim and the family of Ibrahim; indeed, You are Praiseworthy, Glorious.",
			hi: "ऐ अल्लाह! रहमत नाज़िल फ़रमा मुहम्मद ﷺ पर और मुहम्मद ﷺ की आल (परिवार) पर, जैसा कि तूने रहमत नाज़िल फ़रमाई इब्राहीम (अलैहिस्सलाम) पर और इब्राहीम की आल पर, बेशक तू तारीफ़ के लायक़, बड़ी बुज़ुर्गी वाला है। ऐ अल्लाह! बरकत नाज़िल फ़रमा मुहम्मद ﷺ पर और मुहम्मद ﷺ की आल पर, जैसा कि तूने बरकत नाज़िल फ़रमाई इब्राहीम और उनकी आल पर, बेशक तू तारीफ़ के लायक़, बड़ी बुज़ुर्गी वाला है।",
			ur: "اے اللہ! رحمت نازل فرما محمد ﷺ پر اور آلِ محمد ﷺ پر، جس طرح تو نے رحمت نازل فرمائی ابراہیم علیہ السلام پر اور آلِ ابراہیم پر، بے شک تو تعریف والا، بزرگی والا ہے۔ اے اللہ! برکت نازل فرما محمد ﷺ پر اور آلِ محمد ﷺ پر، جس طرح تو نے برکت نازل فرمائی ابراہیم علیہ السلام پر اور آلِ ابراہیم پر، بے شک تو تعریف والا، بزرگی والا ہے۔",
			hinglish: "Ai Allah! Rahmat aur barkat nazil farma Muhammad ﷺ par aur Aapki aal par, jis tarah Tune Ibrahim (AS) aur unki aal par rahmat aur barkat nazil farmayi, beshak Tu tareef ke laiq aur buzurgi wala hai.",
			ar: "الصلاة على النبي ﷺ في التشهد الأخير بعد الشهادتين."
		},
		whenRecited: "Recited in the final sitting (Qa’dah Akhirah) immediately after At-Tahiyyat.",
		localizedWhenRecited: {
			en: "Recited in the final sitting immediately after At-Tahiyyat.",
			hi: "नमाज़ की आख़िरी बैठक में अत्तहिय्यात के तुरंत बाद पढ़ा जाता है।",
			ur: "نماز کے آخری قعدہ میں التحیات کے فوراً بعد پڑھا جاتا ہے۔",
			hinglish: "Namaz ki aakhiri baithak mein At-Tahiyyat ke baad padha jaata hai.",
			ar: "تُقرأ في القعود الأخير بعد التشهد."
		},
		madhhabNotes: {
			Hanafi: "Sunnah Mu’akkadah in the final sitting after Tashahhud.",
			Shafii: "Sending Salawat upon the Prophet ﷺ in the final sitting is a Pillar (Rukn) of prayer.",
			Maliki: "Sunnah Mu’akkadah in the final sitting.",
			Hanbali: "Pillar (Rukn) in the final sitting of prayer."
		},
		sourceReference: "Sahih al-Bukhari 3370, Sahih Muslim 406"
	},
	{
		id: "rec_dua_masura",
		stepOrder: 7,
		title: "Dua After Durood Before Salam (Dua-e-Masura)",
		localizedTitles: {
			en: "Prophetic Dua Before Salam (Dua-e-Masura)",
			hi: "दुआ-ए-मासूरा (सलाम फेरने से पहले की दुआ)",
			ur: "دعائے ماثورہ (سلام پھیرنے سے پہلے کی دعا)",
			hinglish: "Dua-e-Masura (Salam se pehle ki dua)",
			ar: "الدعاء بعد التشهد الأخير قبل السلام"
		},
		stage: "dua_masura",
		arabic: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
		transliteration: "Allahumma inni dhalamtu nafsi dhulman kathiran, wa la yaghfirudh-dhunuba illa Anta, faghfir li maghfiratan min ‘indika warhamni, innaka Antal-Ghafurur-Rahim.",
		translations: {
			en: "O Allah, I have wronged myself greatly, and none forgives sins except You; so grant me forgiveness from Yourself and have mercy on me. Indeed, You are the Oft-Forgiving, the Most Merciful.",
			hi: "ऐ अल्लाह! बेशक मैंने अपनी जान पर बहुत ज़ुल्म (कमी) किया, और तेरे सिवा कोई गुनाहों को नहीं बख़्श सकता, बस अपनी ख़ास मग्फ़िरत से मुझे बख़्श दे और मुझ पर रहम फ़रमा, बेशक तू ही बख़्शने वाला, रहम करने वाला है।",
			ur: "اے اللہ! بے شک میں نے اپنی جان پر بہت ظلم کیا اور تیرے سوا گناہوں کو کوئی نہیں بخش سکتا، پس اپنی خاص بخشش سے مجھے بخش دے اور مجھ پر رحم فرما، بے شک تو ہی بخشنے والا مہربان ہے۔",
			hinglish: "Ai Allah! Maine apni jaan par bahut kami ki, aur Tere siwa koi gunahon ko maaf nahi kar sakta, pas apni khaas maghfirat se mujhe bakhsh de aur mujh par raham farma, beshak Tu Ghafurur-Rahim hai.",
			ar: "الدعاء الذي علّمه النبي ﷺ أبا بكر الصديق رضي الله عنه ليقوله في صلاته."
		},
		whenRecited: "Recited in the final sitting after Durood Ibrahim and right before turning the head for Salam.",
		localizedWhenRecited: {
			en: "Recited after Durood Ibrahim right before Salam.",
			hi: "दुरूद-ए-इब्राहीमी के बाद और सलाम फेरने से ठीक पहले पढ़ी जाती है।",
			ur: "درودِ ابراہیمی کے بعد اور سلام پھیرنے سے پہلے پڑھی جاتی ہے۔",
			hinglish: "Durood-e-Ibrahimi ke baad aur Salam pherne se theek pehle padhi jaati hai.",
			ar: "يُقرأ بعد الصلاة الإبراهيمية وقبل التسليم."
		},
		madhhabNotes: {
			Hanafi: "Sunnah to recite Quranic/Hadith Duas (such as Allahumma inni dhalamtu nafsi or Rabbana atina fid-dunya) before Salam.",
			Shafii: "Sunnah to seek refuge from four trials (Allahumma inni a’udhu bika min ‘adhabi jahannam...) and make supplication before Salam.",
			Maliki: "Recommended to supplicate with authentic Duas before Taslim.",
			Hanbali: "Emphasized Sunnah to seek refuge from the four trials and supplicate before Salam."
		},
		sourceReference: "Sahih al-Bukhari 834, Sahih Muslim 2705 (Taught to Abu Bakr As-Siddiq RA)"
	},
	{
		id: "rec_dua_qunoot",
		stepOrder: 8,
		title: "Dua-e-Qunoot (Recited in Witr Prayer)",
		localizedTitles: {
			en: "Dua-e-Qunoot (Supplication in Witr Prayer)",
			hi: "दुआ-ए-क़ुनूत (वित्र की नमाज़ के लिए)",
			ur: "دعائے قنوت (نمازِ وتر کے لیے)",
			hinglish: "Dua-e-Qunoot (Witr ki namaz ke liye)",
			ar: "دعاء القنوت في الوتر"
		},
		stage: "qunoot",
		arabic: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ",
		transliteration: "Allahummah-dini fiman hadayt, wa ‘afini fiman ‘afayt, wa tawallani fiman tawallayt, wa barik li fima a‘tayt, wa qini sharra ma qadayt, fa innaka taqdi wa la yuqda ‘alayk, wa innahu la yadhillu man walayt, tabarakta Rabbana wa ta‘alayt.",
		translations: {
			en: "O Allah, guide me among those You have guided, grant me well-being among those You have granted well-being, take me into Your charge among those You have taken into Your charge, bless me in what You have given, and protect me from the evil of what You have decreed; for indeed You decree and none can decree over You, and none whom You befriend is ever humiliated. Blessed are You, our Lord, and Exalted.",
			hi: "ऐ अल्लाह! मुझे हिदायत दे उन लोगों में जिन्हें तूने हिदायत दी, और मुझे आफ़ियत दे उन लोगों में जिन्हें तूने आफ़ियत दी, और मेरी कारसाज़ी फ़रमा उन लोगों में जिनकी तूने कारसाज़ी फ़रमाई, और जो कुछ तूने मुझे दिया उसमें बरकत दे, और जिस चीज़ का तूने फ़ैसला किया है उसकी बुराई से मुझे बचा।",
			ur: "اے اللہ! مجھے ہدایت دے ان لوگوں میں جنہیں تو نے ہدایت دی، اور مجھے عافیت دے ان لوگوں میں جنہیں تو نے عافیت دی، اور میری کارسازی فرما ان لوگوں میں جن کی تو نے کارسازی فرمائی، اور جو کچھ تو نے مجھے عطا کیا اس میں برکت دے۔",
			hinglish: "Ai Allah! Mujhe hidayat de un logon mein jinhein Tune hidayat di, aur mujhe aafiyat de, aur jo kuch Tune mujhe ata kiya usmein barkat de, aur bure faisle ke shar se meri hifazat farma.",
			ar: "دعاء القنوت الذي علّمه النبي ﷺ الحسن بن علي رضي الله عنهما ليقوله في الوتر."
		},
		whenRecited: "Recited in the final Rak’ah of Witr prayer (after Surah recitation before Ruku in Hanafi school, or after rising from Ruku in Shafi’i/Hanbali schools).",
		localizedWhenRecited: {
			en: "Recited in the final Rak’ah of Witr prayer.",
			hi: "ईशा के बाद वित्र की नमाज़ की तीसरी/आख़िरी रकात में पढ़ी जाती है।",
			ur: "عشاء کے بعد نمازِ وتر کی آخری رکعت میں پڑھی جاتی ہے۔",
			hinglish: "Isha ke baad Witr ki namaz ki aakhiri rakat mein padhi jaati hai.",
			ar: "يُقرأ في الركعة الأخيرة من صلاة الوتر."
		},
		madhhabNotes: {
			Hanafi: "Witr is 3 Rak’ahs Wajib; Qunoot (Allahumma inna nasta’inuka... or Allahummah-dini...) is recited in the 3rd Rak’ah after the Surah and Takbir, BEFORE going into Ruku.",
			Shafii: "Recited after rising from Ruku in the final Rak’ah of Witr (especially in the second half of Ramadan) and in Fajr.",
			Maliki: "Qunoot is recited silently before Ruku in the 2nd Rak’ah of Fajr prayer.",
			Hanbali: "Recited in Witr after rising from Ruku (or before Ruku, both being permissible)."
		},
		sourceReference: "Sunan Abi Dawud 1425, Jami` at-Tirmidhi 464 (Sahih)"
	},
	{
		id: "rec_salam",
		stepOrder: 9,
		title: "Taslim (Concluding Salam Right & Left)",
		localizedTitles: {
			en: "Taslim (Concluding Salam Right & Left)",
			hi: "तस्लीम (दाएँ और बाएँ सलाम फेरना)",
			ur: "تسلیم (دائیں اور بائیں سلام پھیرنا)",
			hinglish: "Taslim (Daayein aur baayein Salam pherna)",
			ar: "التسليم لختام الصلاة"
		},
		stage: "salam",
		arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ — أَسْتَغْفِرُ اللَّهَ (٣ مرات) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
		transliteration: "As-salamu ‘alaykum wa rahmatullah (turning right, then left). — [After Salam:] Astaghfirullah (3x), Allahumma Antas-Salamu wa minkas-salamu, tabarakta ya Dhal-Jalali wal-Ikram.",
		translations: {
			en: "Peace and mercy of Allah be upon you (right & left). — [After finishing:] I seek forgiveness from Allah (3x). O Allah, You are Peace and from You comes peace; blessed are You, O Possessor of Majesty and Honor.",
			hi: "तुम पर सलाम हो और अल्लाह की रहमत हो (दाएँ और बाएँ)। — (सलाम के बाद:) अस्तग़फ़िरुल्लाह (3 बार), ऐ अल्लाह! तू ही सलामती देने वाला है और तुझी से सलामती है, तू बड़ा बरकत वाला है ऐ अजमत और इज़्ज़त वाले।",
			ur: "تم پر سلامتی ہو اور اللہ کی رحمت ہو (دائیں اور بائیں)۔ — (سلام کے بعد:) استغفر اللہ (3 بار)، اے اللہ! تو ہی سلامتی والا ہے اور تجھی سے سلامتی ہے، تو بابرکت ہے اے جلال اور عزت والے۔",
			hinglish: "As-salamu alaykum wa rahmatullah (daayein aur baayein). — Salam ke baad 3 baar Astaghfirullah aur Allahumma Antas-Salam padhein.",
			ar: "ختام الصلاة بالتسليم يميناً ويساراً ثم الاستغفار والذكر المأثور."
		},
		whenRecited: "Turn your head to the right shoulder saying As-salamu alaykum wa rahmatullah, then to the left shoulder.",
		localizedWhenRecited: {
			en: "Turn head to the right shoulder, then to the left shoulder to conclude the prayer.",
			hi: "पहले दाएँ कंधे की तरफ़ चेहरा करके सलाम कहें, फिर बाएँ कंधे की तरफ़।",
			ur: "پہلے دائیں کندھے کی طرف رخ کر کے سلام کہیں، پھر بائیں کندھے کی طرف۔",
			hinglish: "Pehle daayein kandhe ki taraf chehra karke salam kahein, phir baayein taraf.",
			ar: "الالتفات يميناً ثم يساراً بالتسليم لختام الصلاة."
		},
		madhhabNotes: {
			Hanafi: "Turning right and left saying As-salamu alaykum wa rahmatullah exits the state of prayer.",
			Shafii: "The first Taslim to the right is a Pillar (Rukn); the second to the left is Sunnah.",
			Maliki: "One Taslim is obligatory for the Imam and solo worshipper.",
			Hanbali: "Both Taslims (right and left) are Pillars (Arkan) of obligatory prayers."
		},
		sourceReference: "Sahih Muslim 582, Sahih Muslim 591"
	}
];
var COMPLETE_PRAYER_GUIDES = [
	{
		id: "Fajr",
		name: "Fajr (Dawn Prayer)",
		localizedNames: {
			en: "Fajr (Dawn Prayer — 2 Fard Rak’ahs)",
			hi: "फ़ज्र की नमाज़ (2 सुन्नत + 2 फ़र्ज़)",
			ur: "نمازِ فجر (2 سنت مؤکدہ + 2 فرض)",
			hinglish: "Fajr ki Namaz (2 Sunnah + 2 Fard)",
			ar: "صلاة الفجر (ركعتا سنة + ركعتا فرض)"
		},
		timeWindowDesc: "From true dawn (Subh Sadiq) until just before sunrise.",
		fardRakahs: 2,
		sunnahMuakkadahBefore: 2,
		sunnahMuakkadahAfter: 0,
		recitationAudibility: "Audible (Jahri) in Fard",
		stepByStepSummary: [
			"1. Offer 2 Rak’ahs of emphasized Sunnah (Sunnah Mu’akkadah) quietly before the Fard prayer.",
			"2. For the 2 Rak’ahs Fard: Stand facing Qibla, make intention in the heart, raise hands and say \"Allahu Akbar\".",
			"3. Recite opening Thana silently, then Surah Al-Fatiha and an additional Surah in the 1st Rak’ah.",
			"4. Perform Ruku (Subhana Rabbiyal-Adhim 3x), rise upright (Sami Allahu liman hamidah / Rabbana wa lakal-hamd), and perform two Sujoods with a calm sitting (Jalsa) between them.",
			"5. Stand for the 2nd Rak’ah: recite Surah Al-Fatiha and another Surah, then complete Ruku and two Sujoods.",
			"6. Sit for the final sitting: recite At-Tahiyyat, Durood Ibrahim, and Dua-e-Masura, then conclude with Salam to the right and left."
		],
		localizedStepByStep: {
			hi: [
				"1. पहले 2 रकात सुन्नत-ए-मुअक्कदा अदा करें।",
				"2. 2 रकात फ़र्ज़ के लिए क़िब्ला रुख़ खड़े होकर दिल में नियत करें और \"अल्लाहु अकबर\" कहकर हाथ बाँधें।",
				"3. पहली रकात में सना, सूरह फ़ातिहा और कोई एक सूरह पढ़ें, फिर रुकू और दो सज्दे पूरे करें।",
				"4. दूसरी रकात में सूरह फ़ातिहा और एक सूरह पढ़ें, फिर रुकू और दो सज्दे करें।",
				"5. आख़िरी बैठक में अत्तहिय्यात, दुरूद-ए-इब्राहीमी और दुआ-ए-मासूरा पढ़कर दाएँ और बाएँ सलाम फेरें।"
			],
			ur: [
				"1. پہلے 2 رکعت سنت مؤکدہ ادا کریں۔",
				"2. 2 رکعت فرض کے لیے قبلہ رخ کھڑے ہو کر نیت کریں اور اللہ اکبر کہہ کر ہاتھ باندھیں۔",
				"3. پہلی رکعت میں ثناء، سورۃ الفاتحہ اور کوئی سورت پڑھیں، پھر رکوع اور دو سجدے کریں۔",
				"4. دوسری رکعت میں سورۃ الفاتحہ اور سورت پڑھ کر رکوع اور دو سجدے مکمل کریں۔",
				"5. قعدہ اخیرہ میں التحیات، درودِ ابراہیمی اور دعائے ماثورہ پڑھ کر دائیں اور بائیں سلام پھیریں۔"
			]
		},
		commonBeginnerMistakes: [
			"Rushing through Ruku and Sujood without pausing calmly (Tuma’ninah).",
			"Delaying Fajr past sunrise time without a valid excuse.",
			"Lifting the feet or toes off the prayer mat during Sujood."
		],
		madhhabSpecifics: {
			Hanafi: "2 Sunnah Mu’akkadah strongly emphasized before 2 Fard; no Nafl after Fajr until after sunrise.",
			Shafii: "Qunoot supplication is Sunnah in the 2nd Rak’ah of Fajr after rising from Ruku.",
			Maliki: "2 Rak’ahs Raghibah before 2 Fard; Qunoot recited silently before Ruku in the 2nd Rak’ah.",
			Hanbali: "2 Sunnah Rawatib before 2 Fard; Qunoot in Fajr is only during times of calamity (Qunoot an-Nawazil)."
		},
		sourceReference: "Sahih al-Bukhari 350, Sahih Muslim 724"
	},
	{
		id: "Dhuhr",
		name: "Dhuhr (Midday Prayer)",
		localizedNames: {
			en: "Dhuhr (Midday Prayer — 4 Fard Rak’ahs)",
			hi: "ज़ुहर की नमाज़ (4 सुन्नत + 4 फ़र्ज़ + 2 सुन्नत)",
			ur: "نمازِ ظہر (4 سنت + 4 فرض + 2 سنت)",
			hinglish: "Dhuhr ki Namaz (4 Sunnah + 4 Fard + 2 Sunnah)",
			ar: "صلاة الظهر (٤ فرض)"
		},
		timeWindowDesc: "Starts just after the sun passes its zenith (Zawal) until Asr time begins.",
		fardRakahs: 4,
		sunnahMuakkadahBefore: 4,
		sunnahMuakkadahAfter: 2,
		recitationAudibility: "Silent (Sirri) in Fard",
		stepByStepSummary: [
			"1. All recitation in the 4 Fard Rak’ahs of Dhuhr is done silently (moving the lips/tongue softly without loud voice).",
			"2. In Rak’ahs 1 & 2: Recite Surah Al-Fatiha followed by another Surah/verses, then perform Ruku and two Sujoods.",
			"3. After the 2nd Rak’ah, sit for the Middle Sitting (Qa’dah Ula) and recite ONLY At-Tahiyyat, then stand up for the 3rd Rak’ah saying Allahu Akbar.",
			"4. In Rak’ahs 3 & 4: Recite ONLY Surah Al-Fatiha while standing, followed by Ruku and two Sujoods.",
			"5. After the 4th Rak’ah, sit for the Final Sitting: recite At-Tahiyyat, Durood Ibrahim, and Dua-e-Masura, then conclude with Salam."
		],
		commonBeginnerMistakes: ["Accidentally reciting Durood Ibrahim in the middle (2nd Rak’ah) sitting instead of standing up right after At-Tahiyyat.", "Thinking silently in the mind without moving the lips and tongue during silent prayers."],
		madhhabSpecifics: {
			Hanafi: "4 Sunnah Mu’akkadah (prayed as one unit of 4) before 4 Fard, and 2 Sunnah Mu’akkadah after.",
			Shafii: "2 or 4 Sunnah Rawatib (prayed in units of 2+2) before 4 Fard, and 2 Sunnah after.",
			Maliki: "Sunnah prayers before and after Dhuhr are strongly recommended in units of 2.",
			Hanbali: "2+2 Sunnah Rawatib before 4 Fard, and 2 Sunnah Rawatib after."
		},
		sourceReference: "Sahih al-Bukhari 541, Jami` at-Tirmidhi 424"
	},
	{
		id: "Asr",
		name: "Asr (Afternoon Prayer)",
		localizedNames: {
			en: "Asr (Afternoon Prayer — 4 Fard Rak’ahs)",
			hi: "असर की नमाज़ (4 फ़र्ज़)",
			ur: "نمازِ عصر (4 فرض)",
			hinglish: "Asr ki Namaz (4 Fard)",
			ar: "صلاة العصر (٤ فرض)"
		},
		timeWindowDesc: "Late afternoon until before sunset (when shadow reaches 1x object length in Shafi’i/Maliki/Hanbali, or 2x in Hanafi).",
		fardRakahs: 4,
		sunnahMuakkadahBefore: 0,
		sunnahMuakkadahAfter: 0,
		recitationAudibility: "Silent (Sirri) in Fard",
		stepByStepSummary: [
			"1. The 4 Fard Rak’ahs of Asr are prayed exactly like the 4 Fard Rak’ahs of Dhuhr (all recitation is silent).",
			"2. Rak’ahs 1 & 2 include Surah Al-Fatiha + another Surah, followed by the middle sitting (At-Tahiyyat only).",
			"3. Rak’ahs 3 & 4 include Surah Al-Fatiha only, followed by the final sitting (At-Tahiyyat + Durood Ibrahim + Dua + Salam).",
			"4. No voluntary (Nafl/Sunnah) prayer is offered after Asr Fard until Maghrib."
		],
		commonBeginnerMistakes: ["Delaying Asr until the sun turns pale/orange just before sunset.", "Praying extra Sunnah Rak’ahs after Asr during the restricted time."],
		madhhabSpecifics: {
			Hanafi: "Asr window begins when an object’s shadow equals twice (2x) its height plus noon shadow; 4 Sunnah Ghayr Mu’akkadah before Asr are rewarding.",
			Shafii: "Asr window begins when an object’s shadow equals 1x its height plus noon shadow.",
			Maliki: "Asr window begins at 1x shadow length.",
			Hanbali: "Asr window begins at 1x shadow length."
		},
		sourceReference: "Sahih al-Bukhari 553, Sunan Abi Dawud 1271"
	},
	{
		id: "Maghrib",
		name: "Maghrib (Sunset Prayer)",
		localizedNames: {
			en: "Maghrib (Sunset Prayer — 3 Fard Rak’ahs)",
			hi: "मग़रिब की नमाज़ (3 फ़र्ज़ + 2 सुन्नत)",
			ur: "نمازِ مغرب (3 فرض + 2 سنت)",
			hinglish: "Maghrib ki Namaz (3 Fard + 2 Sunnah)",
			ar: "صلاة المغرب (٣ فرض + ركعتا سنة)"
		},
		timeWindowDesc: "Immediately after sunset until the red/white twilight disappears.",
		fardRakahs: 3,
		sunnahMuakkadahBefore: 0,
		sunnahMuakkadahAfter: 2,
		recitationAudibility: "First 2 Audible, Remaining Silent",
		stepByStepSummary: [
			"1. Maghrib Fard has 3 Rak’ahs.",
			"2. In Rak’ahs 1 & 2: Recite Surah Al-Fatiha + another Surah (audibly if Imam/solo), complete Ruku and two Sujoods, and sit after the 2nd Rak’ah for At-Tahiyyat only.",
			"3. Stand for the 3rd Rak’ah: Recite ONLY Surah Al-Fatiha silently, then perform Ruku and two Sujoods.",
			"4. Sit after the 3rd Rak’ah for the Final Sitting: recite At-Tahiyyat, Durood Ibrahim, and Dua-e-Masura, then conclude with Salam.",
			"5. Offer 2 Rak’ahs of Sunnah Mu’akkadah after the Fard prayer."
		],
		commonBeginnerMistakes: ["Reciting an extra Surah after Al-Fatiha in the 3rd Rak’ah of Maghrib.", "Standing up for a 4th Rak’ah out of habit instead of sitting for final Tashahhud after the 3rd Rak’ah."],
		madhhabSpecifics: {
			Hanafi: "3 Fard immediately after sunset, followed by 2 Sunnah Mu’akkadah.",
			Shafii: "2 light Rak’ahs before Maghrib are recommended, then 3 Fard, then 2 Sunnah Mu’akkadah.",
			Maliki: "3 Fard offered promptly after sunset, followed by 2 Sunnah.",
			Hanbali: "3 Fard followed by 2 Sunnah Rawatib."
		},
		sourceReference: "Sahih al-Bukhari 559, Sahih Muslim 637"
	},
	{
		id: "Isha",
		name: "Isha (Night Prayer)",
		localizedNames: {
			en: "Isha (Night Prayer — 4 Fard Rak’ahs)",
			hi: "ईशा की नमाज़ (4 फ़र्ज़ + 2 सुन्नत)",
			ur: "نمازِ عشاء (4 فرض + 2 سنت)",
			hinglish: "Isha ki Namaz (4 Fard + 2 Sunnah)",
			ar: "صلاة العشاء (٤ فرض + ركعتا سنة)"
		},
		timeWindowDesc: "Starts after twilight vanishes until the middle of the night (and before true dawn).",
		fardRakahs: 4,
		sunnahMuakkadahBefore: 0,
		sunnahMuakkadahAfter: 2,
		recitationAudibility: "First 2 Audible, Remaining Silent",
		stepByStepSummary: [
			"1. Offer 4 Rak’ahs of Isha Fard.",
			"2. Rak’ahs 1 & 2: Recite Surah Al-Fatiha + another Surah (audibly if Imam/solo), then sit after the 2nd Rak’ah for At-Tahiyyat only.",
			"3. Rak’ahs 3 & 4: Recite ONLY Surah Al-Fatiha silently, then sit after the 4th Rak’ah for At-Tahiyyat, Durood Ibrahim, Dua-e-Masura, and Salam.",
			"4. Offer 2 Rak’ahs of Sunnah Mu’akkadah after Isha Fard, followed by Witr prayer."
		],
		commonBeginnerMistakes: ["Falling asleep without praying Isha or setting a reliable alarm.", "Forgetting that Rak’ahs 3 and 4 only require Surah Al-Fatiha silently."],
		madhhabSpecifics: {
			Hanafi: "4 Fard + 2 Sunnah Mu’akkadah + 3 Wajib Witr.",
			Shafii: "4 Fard + 2 Sunnah Mu’akkadah + Witr (1 to 11 Rak’ahs, commonly 3).",
			Maliki: "4 Fard + 2 Shafa’ + 1 Witr.",
			Hanbali: "4 Fard + 2 Sunnah Rawatib + Witr."
		},
		sourceReference: "Sahih al-Bukhari 565, Sahih Muslim 647"
	},
	{
		id: "Witr",
		name: "Witr (Night Concluding Prayer)",
		localizedNames: {
			en: "Witr Prayer (1 or 3 Rak’ahs after Isha)",
			hi: "वित्र की नमाज़ (ईशा के बाद 3 या 1 रकात)",
			ur: "نمازِ وتر (عشاء کے بعد 3 یا 1 رکعت)",
			hinglish: "Witr ki Namaz (Isha ke baad 3 ya 1 rakat)",
			ar: "صلاة الوتر"
		},
		timeWindowDesc: "Offered after the Isha Fard & Sunnah prayers until true dawn (Fajr).",
		fardRakahs: 3,
		sunnahMuakkadahBefore: 0,
		sunnahMuakkadahAfter: 0,
		recitationAudibility: "Silent (Sirri) in Fard",
		stepByStepSummary: [
			"1. Witr is the final odd-numbered night prayer after Isha.",
			"2. In all Rak’ahs of Witr (unlike 3rd Rak’ah of Maghrib), an additional Surah IS recited after Surah Al-Fatiha (commonly Surah Al-A’la in 1st, Al-Kafirun in 2nd, and Al-Ikhlas in 3rd).",
			"3. In the final Rak’ah, recite Dua-e-Qunoot (either after the Surah before Ruku in Hanafi practice, or after rising from Ruku in Shafi’i/Hanbali practice).",
			"4. Complete the two Sujoods and final sitting (At-Tahiyyat + Durood Ibrahim + Dua + Salam)."
		],
		commonBeginnerMistakes: ["Omitting the additional Surah in the 3rd Rak’ah of Witr.", "Confusing the Madhhab methods instead of consistently following one learned method."],
		madhhabSpecifics: {
			Hanafi: "Witr is Wajib (necessary) and prayed as 3 continuous Rak’ahs with one Salam at the end; in the 3rd Rak’ah after the Surah, raise hands with Takbir and recite Dua-e-Qunoot before Ruku.",
			Shafii: "Witr is Sunnah Mu’akkadah; commonly prayed as 2 Rak’ahs (Shafa’) with Salam followed by 1 separate Rak’ah of Witr.",
			Maliki: "Witr is Sunnah Mu’akkadah; prayed as 2 Rak’ahs of Shafa’ followed by 1 separate Rak’ah of Witr.",
			Hanbali: "Witr is Sunnah Mu’akkadah; may be prayed as 2+1 Rak’ahs or 3 continuous Rak’ahs without sitting in the 2nd."
		},
		sourceReference: "Sunan an-Nasa’i 1729, Sunan Abi Dawud 1422"
	}
];
/**
* Phase 11D & 11E — Women's Excused Prayer Mode & Worship Streak Engine
*
* Ensures that when a day or individual prayer is marked as 'excused' (e.g. during
* menstruation / postnatal bleeding / valid Islamic exemption):
* 1. It is NEVER counted as a missed prayer or Qada debt.
* 2. It NEVER breaks the user's consecutive worship streak (streak bridges cleanly across excused days).
* 3. Historical records are preserved accurately and never fabricated as 'prayed'.
*/
var ALL_FIVE_PRAYERS = [
	"Fajr",
	"Dhuhr",
	"Asr",
	"Maghrib",
	"Isha"
];
function markDayAsExcused(existingRecord, dateKey, excused, note) {
	const nowIso = (/* @__PURE__ */ new Date()).toISOString();
	if (excused) return {
		date: dateKey,
		prayers: {
			Fajr: "excused",
			Dhuhr: "excused",
			Asr: "excused",
			Maghrib: "excused",
			Isha: "excused"
		},
		sunnahCompleted: existingRecord?.sunnahCompleted ?? 0,
		isExcusedDay: true,
		excusedNote: note,
		updatedAtIso: nowIso
	};
	return {
		date: dateKey,
		prayers: {
			Fajr: existingRecord?.prayers.Fajr === "excused" ? "pending" : existingRecord?.prayers.Fajr || "pending",
			Dhuhr: existingRecord?.prayers.Dhuhr === "excused" ? "pending" : existingRecord?.prayers.Dhuhr || "pending",
			Asr: existingRecord?.prayers.Asr === "excused" ? "pending" : existingRecord?.prayers.Asr || "pending",
			Maghrib: existingRecord?.prayers.Maghrib === "excused" ? "pending" : existingRecord?.prayers.Maghrib || "pending",
			Isha: existingRecord?.prayers.Isha === "excused" ? "pending" : existingRecord?.prayers.Isha || "pending"
		},
		sunnahCompleted: existingRecord?.sunnahCompleted ?? 0,
		isExcusedDay: false,
		excusedNote: void 0,
		updatedAtIso: nowIso
	};
}
/**
* Computes Salah statistics and consecutive streak across a date history, bridging
* over excused days without counting them as missed/Qada or breaking the streak.
*/
function computeSalahStatsWithExcusedBridge(salahRecords, todayDateKey) {
	let completedCount = 0;
	let onTimeCount = 0;
	let qadaCount = 0;
	let pendingCount = 0;
	let excusedCount = 0;
	let excusedDaysCount = 0;
	const sortedDateKeys = Object.keys(salahRecords).sort();
	for (const dateKey of sortedDateKeys) {
		const rec = salahRecords[dateKey];
		if (!rec || !rec.prayers) continue;
		let dayHasExcused = Boolean(rec.isExcusedDay);
		for (const p of ALL_FIVE_PRAYERS) {
			const status = rec.prayers[p] || "pending";
			if (status === "prayed_on_time") {
				completedCount += 1;
				onTimeCount += 1;
			} else if (status === "prayed") completedCount += 1;
			else if (status === "qaza") qadaCount += 1;
			else if (status === "excused") {
				excusedCount += 1;
				dayHasExcused = true;
			} else pendingCount += 1;
		}
		if (dayHasExcused) excusedDaysCount += 1;
	}
	const applicablePrayersCount = completedCount + qadaCount + pendingCount;
	const completionRatePercent = applicablePrayersCount > 0 ? Math.round(completedCount / applicablePrayersCount * 100) : 100;
	let streak = 0;
	const [y, m, d] = todayDateKey.split("-").map(Number);
	const cursor = new Date(y, (m || 1) - 1, d || 1, 12, 0, 0);
	for (let i = 0; i < 366; i += 1) {
		const rec = salahRecords[`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`];
		if (!rec) {
			if (i === 0) {
				cursor.setDate(cursor.getDate() - 1);
				continue;
			}
			break;
		}
		const statuses = ALL_FIVE_PRAYERS.map((p) => rec.prayers[p] || "pending");
		const allExcused = rec.isExcusedDay || statuses.every((s) => s === "excused");
		const anyCompleted = statuses.some((s) => s === "prayed_on_time" || s === "prayed");
		const anyExcusedAndRestCompleted = statuses.some((s) => s === "excused") && statuses.every((s) => s === "excused" || s === "prayed_on_time" || s === "prayed");
		if (allExcused) {
			cursor.setDate(cursor.getDate() - 1);
			continue;
		}
		if (anyCompleted || anyExcusedAndRestCompleted) {
			streak += 1;
			cursor.setDate(cursor.getDate() - 1);
			continue;
		}
		if (i === 0 && statuses.every((s) => s === "pending")) {
			cursor.setDate(cursor.getDate() - 1);
			continue;
		}
		break;
	}
	return {
		completedCount,
		onTimeCount,
		qadaCount,
		pendingCount,
		excusedCount,
		excusedDaysCount,
		applicablePrayersCount,
		completionRatePercent,
		consecutiveWorshipStreakDays: streak
	};
}
var TOTAL_QURAN_AYAHS = 6236;
var OFFLINE_QURAN_PACKAGE_VERSION = "1.2.0";
/**
* Computes a deterministic SHA-256 hex digest using the Web Crypto API (`crypto.subtle.digest`).
*/
async function computeSha256Hex(input) {
	if (typeof globalThis.crypto !== "undefined" && globalThis.crypto.subtle && typeof globalThis.crypto.subtle.digest === "function") {
		const encoded = new TextEncoder().encode(input);
		const buffer = await globalThis.crypto.subtle.digest("SHA-256", encoded);
		return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
	}
	let h1 = 3735928559 ^ input.length;
	let h2 = 1103547991 ^ input.length;
	for (let i = 0; i < input.length; i++) {
		const ch = input.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	return `${(h1 >>> 0).toString(16).padStart(8, "0")}${(h2 >>> 0).toString(16).padStart(8, "0")}`;
}
/**
* Computes a canonical SHA-256 checksum over a SurahPayload's Surah number, Ayah count,
* sequential Ayah numbers, Uthmani Arabic text, and English translation.
*/
async function computeSurahChecksumSha256(payload) {
	if (!payload || !payload.meta || !Array.isArray(payload.ayahs)) return "";
	const canonicalLines = payload.ayahs.map((a) => `${payload.meta.number}:${a.numberInSurah}:${(a.arabicUthmani || "").trim()}:${(a.translations?.en || "").trim()}`);
	return computeSha256Hex(`ilmizo_quran_v1|surah=${payload.meta.number}|count=${payload.ayahs.length}|${canonicalLines.join("\n")}`);
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
async function verifySurahIntegrity(surahNumber, payload, options) {
	const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
	if (!meta) return {
		valid: false,
		corrupted: true,
		surahNumber,
		expectedAyahCount: 0,
		actualAyahCount: 0,
		checksumSha256: "",
		errors: [`Invalid Surah number ${surahNumber}. Must be between 1 and 114.`]
	};
	if (!payload || typeof payload !== "object" || !Array.isArray(payload.ayahs)) return {
		valid: false,
		corrupted: true,
		surahNumber,
		expectedAyahCount: meta.ayahCount,
		actualAyahCount: 0,
		checksumSha256: "",
		errors: [`Surah ${surahNumber} (${meta.nameTranslit}) payload is missing or malformed.`]
	};
	const errors = [];
	const baseValidation = validateSurahPayload(payload, meta, Boolean(options?.allowPartialBundle));
	if (!baseValidation.valid && baseValidation.error) errors.push(baseValidation.error);
	if (surahNumber !== 1 && payload.ayahs.length > 1) {
		const ayah2Arabic = (payload.ayahs[1]?.arabicUthmani || "").trim();
		const fatihaAyah2 = BUNDLED_SURAH_AYAHS[1]?.[1]?.arabicUthmani?.trim() || "";
		if (fatihaAyah2 && ayah2Arabic === fatihaAyah2) errors.push(`CRITICAL INTEGRITY FAILURE: Surah ${surahNumber} contains Surah Al-Fatiha's verses.`);
	}
	const requiredLangs = options?.requiredLanguages || ["en"];
	for (const lang of requiredLangs) {
		const missingLangIdx = payload.ayahs.findIndex((a) => !a.translations?.[lang] || typeof a.translations[lang] !== "string" || !a.translations[lang].trim());
		if (missingLangIdx !== -1) errors.push(`Surah ${surahNumber} is missing translation '${lang}' at Ayah ${missingLangIdx + 1}.`);
	}
	const checksumSha256 = await computeSurahChecksumSha256(payload);
	let corrupted = errors.length > 0;
	if (options?.expectedChecksum && options.expectedChecksum.trim().length > 0 && options.expectedChecksum !== checksumSha256) {
		corrupted = true;
		errors.push(`Checksum mismatch for Surah ${surahNumber} (${meta.nameTranslit}): expected ${options.expectedChecksum.slice(0, 12)}…, got ${checksumSha256.slice(0, 12)}….`);
	}
	return {
		valid: errors.length === 0 && !corrupted,
		corrupted,
		surahNumber,
		expectedAyahCount: meta.ayahCount,
		actualAyahCount: payload.ayahs.length,
		checksumSha256,
		errors
	};
}
/**
* Inspects all Surahs currently stored in IndexedDB (`offline_surahs`) and verifies their integrity,
* checksums, total Surah count, and total Ayah count.
*/
async function verifyInstalledOfflineQuran() {
	const allRecords = await listOfflineSurahRecords();
	const bestBySurah = /* @__PURE__ */ new Map();
	for (const rec of allRecords) {
		const existing = bestBySurah.get(rec.surahNumber);
		if (!existing || rec.isExplicitDownload && !existing.isExplicitDownload || (rec.payload?.ayahs?.length || 0) > (existing.payload?.ayahs?.length || 0)) bestBySurah.set(rec.surahNumber, rec);
	}
	let totalSurahsVerified = 0;
	let totalAyahsVerified = 0;
	let totalSizeBytes = 0;
	const corruptedSurahNumbers = [];
	const missingSurahNumbers = [];
	const partialSurahNumbers = [];
	const errors = [];
	const surahChecksums = [];
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
			allowPartialBundle: false
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
	const packageChecksumSha256 = surahChecksums.length > 0 ? await computeSha256Hex(`ilmizo_installed_quran_v${OFFLINE_QURAN_PACKAGE_VERSION}|${surahChecksums.join("|")}`) : "";
	const isComplete114 = totalSurahsVerified === 114 && totalAyahsVerified === 6236 && corruptedSurahNumbers.length === 0;
	return {
		valid: corruptedSurahNumbers.length === 0,
		isComplete114,
		totalSurahsVerified,
		totalAyahsVerified,
		expectedTotalSurahs: 114,
		expectedTotalAyahs: TOTAL_QURAN_AYAHS,
		totalSizeBytes,
		packageVersion: OFFLINE_QURAN_PACKAGE_VERSION,
		packageChecksumSha256,
		verifiedAtIso: (/* @__PURE__ */ new Date()).toISOString(),
		corruptedSurahNumbers,
		missingSurahNumbers,
		partialSurahNumbers,
		errors
	};
}
/**
* Fetches a single Surah with Arabic Uthmani + English (`en.sahih`) + Hindi (`hi.hindi`) + Urdu (`ur.jalandhry`)
* + Transliteration from the verified AlQuran Cloud API, validates all Ayah counts and checksums,
* and saves it to IndexedDB.
*/
async function fetchAndVerifyMultiLangSurah(surahNumber, primaryLang = "en", reciterName, customFetcher) {
	const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
	if (!meta) return {
		ok: false,
		error: `Invalid Surah number: ${surahNumber}`
	};
	if (customFetcher) try {
		const payload = await customFetcher(meta);
		const check = await verifySurahIntegrity(surahNumber, payload, { allowPartialBundle: false });
		if (!check.valid) return {
			ok: false,
			error: check.errors.join(" ")
		};
		const verifiedAtIso = (/* @__PURE__ */ new Date()).toISOString();
		const writeRes = await saveOfflineSurahToDb(surahNumber, primaryLang, payload, true, {
			checksumSha256: check.checksumSha256,
			packageVersion: OFFLINE_QURAN_PACKAGE_VERSION,
			verifiedAtIso
		});
		if (!writeRes.ok) return {
			ok: false,
			error: writeRes.error || "Failed to write Surah to IndexedDB."
		};
		const sizeBytes = JSON.stringify(payload).length;
		return {
			ok: true,
			payload: {
				...payload,
				offlineSourceType: "downloaded_idb",
				offlineUnavailable: false
			},
			checksumSha256: check.checksumSha256,
			sizeBytes
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Failed to fetch Surah via custom fetcher."
		};
	}
	const reciter = resolveReciterConfig(reciterName);
	if (typeof navigator !== "undefined" && navigator.onLine) try {
		const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.transliteration,en.sahih,hi.hindi,ur.jalandhry,${reciter.editionId}`);
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
				if (uthmaniAyahs.length === meta.ayahCount && enAyahs.length === meta.ayahCount && hiAyahs.length === meta.ayahCount && urAyahs.length === meta.ayahCount && (uthmaniEd.number === void 0 || uthmaniEd.number === meta.number)) {
					const ayahs = uthmaniAyahs.map((a, idx) => ({
						numberInSurah: a.numberInSurah,
						globalNumber: a.number,
						arabicUthmani: a.text,
						transliteration: translitAyahs[idx]?.text || "",
						translations: {
							en: enAyahs[idx]?.text || "",
							hi: hiAyahs[idx]?.text || "",
							ur: urAyahs[idx]?.text || "",
							hinglish: enAyahs[idx]?.text || ""
						},
						audioUrl: audioAyahs[idx]?.audio || resolveAyahAudioUrl({ globalNumber: a.number }, reciter.id),
						mushafPage: typeof a.page === "number" && a.page > 0 ? a.page : void 0,
						juzNumber: typeof a.juz === "number" && a.juz > 0 ? a.juz : meta.juz,
						tafsirBrief: `Verified Uthmani script — Surah ${meta.nameTranslit} (${meta.number}:${a.numberInSurah}), Juz ${a.juz || meta.juz}${typeof a.page === "number" ? `, Madinah Mushaf Page ${a.page}` : ""}.`
					}));
					const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === primaryLang) || SUPPORTED_LANGUAGES[0];
					const payload = {
						meta,
						ayahs,
						offlineUnavailable: false,
						isPartialOfflineBundle: false,
						offlineSourceType: "downloaded_idb",
						verification: {
							source: "Tanzil / King Fahd Glorious Quran Printing Complex via AlQuran Cloud (Multi-Language Offline Package)",
							edition: `quran-uthmani + en.sahih + hi.hindi + ur.jalandhry (${reciter.editionId})`,
							reference: `Surah ${meta.number} (${meta.nameTranslit}), ${meta.ayahCount} Ayahs`,
							language: langConfig.label,
							version: OFFLINE_QURAN_PACKAGE_VERSION,
							reviewer: "Ilmizo Sharia & Text Verification Registry",
							status: "Verified"
						}
					};
					const check = await verifySurahIntegrity(surahNumber, payload, {
						allowPartialBundle: false,
						requiredLanguages: [
							"en",
							"hi",
							"ur"
						]
					});
					if (!check.valid) return {
						ok: false,
						error: check.errors.join(" ")
					};
					const verifiedAtIso = (/* @__PURE__ */ new Date()).toISOString();
					const writeRes = await saveOfflineSurahToDb(surahNumber, primaryLang, payload, true, {
						checksumSha256: check.checksumSha256,
						packageVersion: OFFLINE_QURAN_PACKAGE_VERSION,
						verifiedAtIso
					});
					if (!writeRes.ok) return {
						ok: false,
						error: writeRes.error || "Failed to save Surah to IndexedDB."
					};
					return {
						ok: true,
						payload,
						checksumSha256: check.checksumSha256,
						sizeBytes: JSON.stringify(payload).length
					};
				}
			}
		}
	} catch {}
	const payload = await getSurahPayload(surahNumber, primaryLang, reciterName, { markExplicitDownload: true });
	if (payload.offlineUnavailable || payload.isPartialOfflineBundle || payload.ayahs.length < meta.ayahCount) return {
		ok: false,
		error: `Surah ${meta.nameTranslit} (#${surahNumber}) requires an internet connection to download all ${meta.ayahCount} Ayahs.`
	};
	const check = await verifySurahIntegrity(surahNumber, payload, { allowPartialBundle: false });
	if (!check.valid) return {
		ok: false,
		error: check.errors.join(" ")
	};
	const writeRes = await saveOfflineSurahToDb(surahNumber, primaryLang, payload, true, {
		checksumSha256: check.checksumSha256,
		packageVersion: OFFLINE_QURAN_PACKAGE_VERSION,
		verifiedAtIso: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (!writeRes.ok) return {
		ok: false,
		error: writeRes.error || "Failed to save Surah to IndexedDB."
	};
	return {
		ok: true,
		payload: {
			...payload,
			offlineSourceType: "downloaded_idb",
			offlineUnavailable: false
		},
		checksumSha256: check.checksumSha256,
		sizeBytes: JSON.stringify(payload).length
	};
}
/**
* Full Offline Quran Download & Verification Manager with Pause / Resume / Cancel support.
*/
var QuranOfflineDownloadManager = class {
	constructor() {
		this.state = {
			status: "idle",
			mode: null,
			completedSurahs: 0,
			totalSurahs: 114,
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
			errorMessage: null
		};
		this.listeners = /* @__PURE__ */ new Set();
		this.pauseRequested = false;
		this.cancelRequested = false;
		this.resumeResolver = null;
	}
	getState() {
		return { ...this.state };
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	updateState(patch) {
		this.state = {
			...this.state,
			...patch
		};
		const snapshot = this.getState();
		this.listeners.forEach((l) => l(snapshot));
	}
	pauseDownload() {
		if (this.state.status === "downloading") {
			this.pauseRequested = true;
			this.updateState({ status: "paused" });
		}
	}
	resumeDownload() {
		if (this.state.status === "paused") {
			this.pauseRequested = false;
			this.updateState({ status: "downloading" });
			if (this.resumeResolver) {
				const resolve = this.resumeResolver;
				this.resumeResolver = null;
				resolve();
			}
		}
	}
	cancelDownload() {
		if (this.state.status === "downloading" || this.state.status === "paused") {
			this.cancelRequested = true;
			this.pauseRequested = false;
			if (this.resumeResolver) {
				const resolve = this.resumeResolver;
				this.resumeResolver = null;
				resolve();
			}
			this.updateState({
				status: "cancelled",
				currentSurahNumber: null,
				currentSurahName: null
			});
		}
	}
	async waitIfPaused() {
		if (!this.pauseRequested) return;
		await new Promise((resolve) => {
			this.resumeResolver = resolve;
		});
	}
	/**
	* Downloads a list of Surahs (or all 114 Surahs for the Complete Offline Quran Package)
	* with real-time progress, pause/resume/cancel support, and SHA-256 integrity verification.
	*/
	async downloadSurahBatch(options) {
		const targetSurahNumbers = options?.surahNumbers && options.surahNumbers.length > 0 ? options.surahNumbers : ALL_114_SURAHS.map((s) => s.number);
		const primaryLang = options?.language || "en";
		const mode = options?.mode || (targetSurahNumbers.length === 114 ? "full_quran" : "juz");
		const skipAlreadyVerified = options?.skipAlreadyVerified ?? true;
		const targetMetas = targetSurahNumbers.map((num) => ALL_114_SURAHS.find((s) => s.number === num)).filter((m) => Boolean(m));
		const totalSurahs = targetMetas.length;
		const totalAyahs = targetMetas.reduce((acc, m) => acc + m.ayahCount, 0);
		this.pauseRequested = false;
		this.cancelRequested = false;
		this.updateState({
			status: "downloading",
			mode,
			completedSurahs: 0,
			totalSurahs,
			completedAyahs: 0,
			totalAyahs,
			progressPercent: 0,
			downloadedBytes: 0,
			currentSurahNumber: targetMetas[0]?.number || null,
			currentSurahName: targetMetas[0]?.nameTranslit || null,
			errorMessage: null
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
					error: "Download cancelled by user."
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
					error: "Download cancelled by user."
				};
			}
			this.updateState({
				currentSurahNumber: meta.number,
				currentSurahName: meta.nameTranslit
			});
			if (skipAlreadyVerified && !options?.customFetcher) {
				const existing = await getOfflineSurahFromDb(meta.number, primaryLang);
				if (existing && existing.isExplicitDownload && existing.payload && !existing.payload.isPartialOfflineBundle && existing.payload.ayahs.length === meta.ayahCount) {
					if ((await verifySurahIntegrity(meta.number, existing.payload, {
						expectedChecksum: existing.checksumSha256,
						allowPartialBundle: false
					})).valid) {
						completedSurahs += 1;
						completedAyahs += meta.ayahCount;
						downloadedBytes += existing.sizeBytes || 0;
						this.updateState({
							completedSurahs,
							completedAyahs,
							downloadedBytes,
							progressPercent: Math.round(completedAyahs / Math.max(1, totalAyahs) * 100)
						});
						continue;
					}
				}
			}
			const fetchRes = await fetchAndVerifyMultiLangSurah(meta.number, primaryLang, options?.reciterName, options?.customFetcher);
			if (!fetchRes.ok) {
				const reportAfterError = await verifyInstalledOfflineQuran();
				this.updateState({
					status: "error",
					currentSurahNumber: null,
					currentSurahName: null,
					errorMessage: fetchRes.error || `Failed to download Surah ${meta.nameTranslit}.`
				});
				return {
					ok: false,
					completedSurahs,
					completedAyahs,
					report: reportAfterError,
					error: fetchRes.error
				};
			}
			completedSurahs += 1;
			completedAyahs += meta.ayahCount;
			downloadedBytes += fetchRes.sizeBytes || 0;
			this.updateState({
				completedSurahs,
				completedAyahs,
				downloadedBytes,
				progressPercent: Math.round(completedAyahs / Math.max(1, totalAyahs) * 100)
			});
		}
		const finalReport = await verifyInstalledOfflineQuran();
		this.updateState({
			status: "completed",
			completedSurahs,
			completedAyahs,
			progressPercent: 100,
			currentSurahNumber: null,
			currentSurahName: null,
			lastVerifiedAtIso: finalReport.verifiedAtIso,
			packageChecksumSha256: finalReport.packageChecksumSha256,
			corruptedSurahNumbers: finalReport.corruptedSurahNumbers,
			errorMessage: null
		});
		return {
			ok: true,
			completedSurahs,
			completedAyahs,
			report: finalReport
		};
	}
	async downloadFullOfflineQuran(options) {
		return this.downloadSurahBatch({
			surahNumbers: ALL_114_SURAHS.map((s) => s.number),
			language: options?.language,
			reciterName: options?.reciterName,
			mode: "full_quran",
			customFetcher: options?.customFetcher
		});
	}
	async downloadJuzOffline(juzNumber, language = "en", reciterName, customFetcher) {
		const surahsInJuz = ALL_114_SURAHS.filter((s) => s.juz === juzNumber).map((s) => s.number);
		return this.downloadSurahBatch({
			surahNumbers: surahsInJuz,
			language,
			reciterName,
			mode: "juz",
			customFetcher
		});
	}
	async deleteSingleOfflineSurah(surahNumber) {
		await deleteOfflineSurahFromDb(surahNumber);
		const report = await verifyInstalledOfflineQuran();
		this.updateState({
			lastVerifiedAtIso: report.verifiedAtIso,
			packageChecksumSha256: report.packageChecksumSha256,
			corruptedSurahNumbers: report.corruptedSurahNumbers
		});
	}
	async deleteAllOfflineQuran() {
		const deleted = await deleteAllDownloadedOfflineSurahs();
		this.updateState({
			status: "idle",
			mode: null,
			completedSurahs: 0,
			completedAyahs: 0,
			progressPercent: 0,
			downloadedBytes: 0,
			lastVerifiedAtIso: null,
			packageChecksumSha256: null,
			corruptedSurahNumbers: [],
			errorMessage: null
		});
		return deleted;
	}
};
var quranOfflineManager = new QuranOfflineDownloadManager();
/**
* Searches across all downloaded IndexedDB Surahs and bundled offline Surahs without requiring network access.
* Supports searching by:
* - Surah:Ayah reference (e.g. "2:255" or "36:1")
* - Surah name (English, Transliteration, Arabic, or number)
* - Arabic Uthmani script (diacritic-insensitive and exact)
* - English, Hindi, Urdu, or Hinglish translations
* - Transliteration
*/
function stripArabicDiacriticsForSearch(text) {
	return (text || "").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "").replace(/[أإآٱ]/g, "ا").trim();
}
async function searchOfflineQuran(rawQuery, preferredLang = "en", maxResults = 40) {
	const query = (rawQuery || "").trim();
	if (!query) return [];
	const qLower = query.toLowerCase();
	const qArabicStripped = stripArabicDiacriticsForSearch(query);
	const storedRecords = await listOfflineSurahRecords();
	const payloadMap = /* @__PURE__ */ new Map();
	for (const meta of ALL_114_SURAHS) {
		const bundled = BUNDLED_SURAH_AYAHS[meta.number];
		if (bundled && bundled.length > 0) payloadMap.set(meta.number, {
			meta,
			ayahs: bundled,
			offlineSourceType: bundled.length >= meta.ayahCount ? "bundled_full" : "bundled_partial",
			verification: {
				source: "Bundled Offline Quran",
				edition: "quran-uthmani + en.sahih",
				reference: `Surah ${meta.number}`,
				language: "Multi",
				version: "1.0.0",
				reviewer: "Ilmizo Verification Registry",
				status: "Verified"
			}
		});
	}
	for (const rec of storedRecords) if (rec.payload && Array.isArray(rec.payload.ayahs) && rec.payload.ayahs.length > 0) {
		const existing = payloadMap.get(rec.surahNumber);
		if (!existing || rec.payload.ayahs.length >= existing.ayahs.length) payloadMap.set(rec.surahNumber, rec.payload);
	}
	const results = [];
	const refMatch = qLower.match(/^(\d{1,3}):(\d{1,3})$/);
	if (refMatch) {
		const sNum = Number.parseInt(refMatch[1], 10);
		const aNum = Number.parseInt(refMatch[2], 10);
		const payload = payloadMap.get(sNum);
		if (payload) {
			const ayah = payload.ayahs.find((a) => a.numberInSurah === aNum);
			if (ayah) results.push({
				surahNumber: payload.meta.number,
				surahNameTranslit: payload.meta.nameTranslit,
				surahNameArabic: payload.meta.nameArabic,
				ayahNumberInSurah: ayah.numberInSurah,
				globalAyahNumber: ayah.globalNumber ?? 0,
				juzNumber: ayah.juzNumber || payload.meta.juz,
				arabicUthmani: ayah.arabicUthmani,
				transliteration: ayah.transliteration,
				translationSnippet: ayah.translations?.[preferredLang] || ayah.translations?.en || "",
				matchedField: "reference",
				sourceType: payload.offlineSourceType || "downloaded_idb"
			});
		}
		return results;
	}
	const sortedSurahNums = Array.from(payloadMap.keys()).sort((a, b) => a - b);
	for (const sNum of sortedSurahNums) {
		const payload = payloadMap.get(sNum);
		const meta = payload.meta;
		const surahNameMatched = meta.nameTranslit.toLowerCase().includes(qLower) || meta.nameEnglish.toLowerCase().includes(qLower) || meta.nameArabic.includes(query);
		for (const ayah of payload.ayahs) {
			const transPref = ayah.translations?.[preferredLang] || "";
			const transEn = ayah.translations?.en || "";
			const transHi = ayah.translations?.hi || "";
			const transUr = ayah.translations?.ur || "";
			const translit = ayah.transliteration || "";
			const arabic = ayah.arabicUthmani || "";
			let matchedField = null;
			if (transPref.toLowerCase().includes(qLower) || transEn.toLowerCase().includes(qLower) || transHi.toLowerCase().includes(qLower) || transUr.includes(query)) matchedField = "translation";
			else if (translit.toLowerCase().includes(qLower)) matchedField = "transliteration";
			else if (arabic.includes(query) || qArabicStripped.length >= 2 && stripArabicDiacriticsForSearch(arabic).includes(qArabicStripped)) matchedField = "arabic";
			else if (surahNameMatched && ayah.numberInSurah === 1) matchedField = "surah_name";
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
					sourceType: payload.offlineSourceType || "downloaded_idb"
				});
				if (results.length >= maxResults) return results;
			}
		}
	}
	return results;
}
// src/services/audioDownloadManager.ts
var QARI_AUDIO_CACHE_NAME = "ilmizo-qari-audio-v1";
var OFFLINE_QARI_MISSING_MESSAGE = "Audio for this Surah is not downloaded for offline playback. Connect to the internet or download this Qari's audio.";
/**
* Canonical global Ayah starting offset (0-indexed) for each Surah 1..114.
* Used to compute the exact global Ayah number (1..6236) for any (surahNumber, numberInSurah)
* without requiring a network call.
*/
function getGlobalAyahNumber(surahNumber, ayahNumberInSurah) {
	let offset = 0;
	for (const meta of ALL_114_SURAHS) if (meta.number < surahNumber) offset += meta.ayahCount;
	else break;
	return offset + ayahNumberInSurah;
}
VERIFIED_RECITER_EDITIONS.map((r) => ({
	...r,
	sourceAttribution: "Islamic Network Quran Audio CDN / AlQuran Cloud Verified Recitation",
	audioUrlPattern: `https://cdn.islamic.network/quran/audio/${r.cdnBitrate}/${r.editionId}/{globalAyahNumber}.mp3`
}));
/**
* Verifies that an OfflineAudioRecord has complete Ayah coverage (1..N) for its Surah and Qari edition.
*/
async function verifySurahQariAudioIntegrity(surahNumber, editionId, record) {
	const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
	if (!meta) return {
		valid: false,
		editionId,
		surahNumber,
		expectedAyahCount: 0,
		downloadedAyahCount: 0,
		sizeBytes: 0,
		checksumSha256: "",
		errors: [`Invalid Surah number: ${surahNumber}.`]
	};
	if (!record || record.surahNumber !== surahNumber || record.editionId !== editionId) return {
		valid: false,
		editionId,
		surahNumber,
		expectedAyahCount: meta.ayahCount,
		downloadedAyahCount: 0,
		sizeBytes: 0,
		checksumSha256: "",
		errors: [`No offline audio record found for Surah ${surahNumber} (${editionId}).`]
	};
	const errors = [];
	const urlsMap = record.ayahAudioUrls || {};
	const dataUrlsMap = record.ayahAudioDataUrls || {};
	let validAyahCount = 0;
	const canonicalEntries = [];
	for (let ayahNum = 1; ayahNum <= meta.ayahCount; ayahNum += 1) {
		const cdnUrl = urlsMap[ayahNum];
		const cachedDataOrUrl = dataUrlsMap[ayahNum] || cdnUrl;
		if (!cdnUrl || typeof cdnUrl !== "string" || !cachedDataOrUrl) errors.push(`Missing offline audio for Surah ${surahNumber} Ayah ${ayahNum}.`);
		else if (!cdnUrl.includes(`/${editionId}/`)) errors.push(`Edition mismatch at Surah ${surahNumber} Ayah ${ayahNum}: expected ${editionId} in URL.`);
		else {
			validAyahCount += 1;
			canonicalEntries.push(`${ayahNum}:${cdnUrl}:${cachedDataOrUrl.length}`);
		}
	}
	const checksumSha256 = await computeSha256Hex(`ilmizo_qari_audio_v1|${editionId}|surah=${surahNumber}|count=${validAyahCount}|${canonicalEntries.join("|")}`);
	if (record.checksumSha256 && record.checksumSha256.trim().length > 0 && record.checksumSha256 !== checksumSha256) errors.push(`Audio checksum mismatch for Surah ${surahNumber} (${editionId}).`);
	return {
		valid: errors.length === 0 && validAyahCount === meta.ayahCount,
		editionId,
		surahNumber,
		expectedAyahCount: meta.ayahCount,
		downloadedAyahCount: validAyahCount,
		sizeBytes: record.sizeBytes || 0,
		checksumSha256,
		errors
	};
}
/**
* Resolves the playback URL for a specific Surah and Ayah for the selected Qari.
* - Prefers verified offline downloaded audio in IndexedDB / Cache API.
* - If not downloaded and device is online, returns the verified Qari stream URL.
* - If not downloaded and device is offline, returns `available: false` with the explicit
*   offline message and NEVER falls back to robotic TTS pretending to be a Qari.
*/
async function resolveQariAyahAudioSource(params) {
	const { surahNumber, ayahNumberInSurah, reciterName } = params;
	const reciter = resolveReciterConfig(reciterName);
	const globalAyahNumber = params.globalAyahNumber && params.globalAyahNumber > 0 ? params.globalAyahNumber : getGlobalAyahNumber(surahNumber, ayahNumberInSurah);
	const isOnline = typeof params.isOnline === "boolean" ? params.isOnline : typeof navigator !== "undefined" ? navigator.onLine : true;
	const storedRecord = await getOfflineAudioFromDb(reciter.editionId, surahNumber);
	if (storedRecord) {
		if ((await verifySurahQariAudioIntegrity(surahNumber, reciter.editionId, storedRecord)).valid) {
			const offlineUrl = storedRecord.ayahAudioDataUrls?.[ayahNumberInSurah] || storedRecord.ayahAudioUrls?.[ayahNumberInSurah];
			if (offlineUrl) return {
				available: true,
				source: "offline_downloaded",
				url: offlineUrl,
				reciter,
				surahNumber,
				ayahNumberInSurah,
				globalAyahNumber
			};
		}
	}
	if (isOnline) return {
		available: true,
		source: "online_stream",
		url: `https://cdn.islamic.network/quran/audio/${reciter.cdnBitrate}/${reciter.editionId}/${globalAyahNumber}.mp3`,
		reciter,
		surahNumber,
		ayahNumberInSurah,
		globalAyahNumber
	};
	return {
		available: false,
		source: "unavailable_offline",
		reciter,
		surahNumber,
		ayahNumberInSurah,
		globalAyahNumber,
		errorMessage: OFFLINE_QARI_MISSING_MESSAGE
	};
}
function arrayBufferToBase64AudioDataUrl(buffer) {
	const bytes = new Uint8Array(buffer);
	let binary = "";
	const chunkSize = 32768;
	for (let i = 0; i < bytes.length; i += chunkSize) {
		const chunk = bytes.subarray(i, i + chunkSize);
		binary += String.fromCharCode(...chunk);
	}
	if (typeof btoa === "function") return `data:audio/mpeg;base64,${btoa(binary)}`;
	return `data:audio/mpeg;base64,${Buffer.from(buffer).toString("base64")}`;
}
/**
* Centralized Qari Audio Download Manager with Pause, Resume, Cancel, Retry, and Delete controls.
*/
var QariAudioDownloadManager = class {
	constructor() {
		this.state = {
			status: "idle",
			reciterName: null,
			editionId: null,
			surahNumber: null,
			surahName: null,
			completedAyahs: 0,
			totalAyahs: 0,
			completedSurahs: 0,
			totalSurahs: 0,
			progressPercent: 0,
			downloadedBytes: 0,
			errorMessage: null
		};
		this.listeners = /* @__PURE__ */ new Set();
		this.pauseRequested = false;
		this.cancelRequested = false;
		this.resumeResolver = null;
	}
	getState() {
		return { ...this.state };
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	updateState(patch) {
		this.state = {
			...this.state,
			...patch
		};
		const snapshot = this.getState();
		this.listeners.forEach((l) => l(snapshot));
	}
	pauseDownload() {
		if (this.state.status === "downloading") {
			this.pauseRequested = true;
			this.updateState({ status: "paused" });
		}
	}
	resumeDownload() {
		if (this.state.status === "paused") {
			this.pauseRequested = false;
			this.updateState({ status: "downloading" });
			if (this.resumeResolver) {
				const resolve = this.resumeResolver;
				this.resumeResolver = null;
				resolve();
			}
		}
	}
	cancelDownload() {
		if (this.state.status === "downloading" || this.state.status === "paused") {
			this.cancelRequested = true;
			this.pauseRequested = false;
			if (this.resumeResolver) {
				const resolve = this.resumeResolver;
				this.resumeResolver = null;
				resolve();
			}
			this.updateState({ status: "cancelled" });
		}
	}
	async waitIfPaused() {
		if (!this.pauseRequested) return;
		await new Promise((resolve) => {
			this.resumeResolver = resolve;
		});
	}
	/**
	* Downloads and verifies all Ayah audio files for a single Surah and Qari edition.
	*/
	async downloadSurahQariAudio(options) {
		const meta = ALL_114_SURAHS.find((s) => s.number === options.surahNumber);
		if (!meta) return {
			ok: false,
			error: `Invalid Surah number: ${options.surahNumber}`
		};
		const reciter = resolveReciterConfig(options.reciterName);
		this.pauseRequested = false;
		this.cancelRequested = false;
		this.updateState({
			status: "downloading",
			reciterName: reciter.label,
			editionId: reciter.editionId,
			surahNumber: meta.number,
			surahName: meta.nameTranslit,
			completedAyahs: 0,
			totalAyahs: meta.ayahCount,
			completedSurahs: 0,
			totalSurahs: 1,
			progressPercent: 0,
			downloadedBytes: 0,
			errorMessage: null
		});
		const ayahAudioUrls = {};
		const ayahAudioDataUrls = {};
		let totalBytes = 0;
		for (let ayahNum = 1; ayahNum <= meta.ayahCount; ayahNum += 1) {
			if (this.cancelRequested) return {
				ok: false,
				error: "Audio download cancelled by user."
			};
			await this.waitIfPaused();
			if (this.cancelRequested) return {
				ok: false,
				error: "Audio download cancelled by user."
			};
			const globalNum = getGlobalAyahNumber(meta.number, ayahNum);
			const cdnUrl = `https://cdn.islamic.network/quran/audio/${reciter.cdnBitrate}/${reciter.editionId}/${globalNum}.mp3`;
			ayahAudioUrls[ayahNum] = cdnUrl;
			try {
				if (options.customAudioFetcher) {
					const fetched = await options.customAudioFetcher(cdnUrl, ayahNum, globalNum);
					ayahAudioDataUrls[ayahNum] = fetched.dataUrl;
					totalBytes += fetched.sizeBytes;
				} else {
					if (typeof navigator !== "undefined" && !navigator.onLine) throw new Error(`Cannot download Qari audio for Surah ${meta.nameTranslit} while offline.`);
					const response = await fetch(cdnUrl);
					if (!response.ok) throw new Error(`HTTP ${response.status} while downloading Ayah ${ayahNum} audio.`);
					if (typeof caches !== "undefined") try {
						await (await caches.open(QARI_AUDIO_CACHE_NAME)).put(cdnUrl, response.clone());
					} catch {}
					const arrayBuffer = await response.arrayBuffer();
					if (arrayBuffer.byteLength < 64) throw new Error(`Corrupted or empty audio stream at Ayah ${ayahNum}.`);
					ayahAudioDataUrls[ayahNum] = arrayBufferToBase64AudioDataUrl(arrayBuffer);
					totalBytes += arrayBuffer.byteLength;
				}
			} catch (err) {
				const msg = err instanceof Error ? err.message : `Failed to download Qari audio for Surah ${meta.nameTranslit} Ayah ${ayahNum}.`;
				this.updateState({
					status: "error",
					errorMessage: msg
				});
				return {
					ok: false,
					error: msg
				};
			}
			this.updateState({
				completedAyahs: ayahNum,
				downloadedBytes: totalBytes,
				progressPercent: Math.round(ayahNum / meta.ayahCount * 100)
			});
		}
		const nowIso = (/* @__PURE__ */ new Date()).toISOString();
		const draftRecord = {
			audioKey: `${reciter.editionId}:${meta.number}`,
			surahNumber: meta.number,
			editionId: reciter.editionId,
			reciterName: reciter.label,
			bitrate: `${reciter.cdnBitrate}kbps`,
			expectedAyahCount: meta.ayahCount,
			downloadedAyahCount: meta.ayahCount,
			downloadedAtIso: nowIso,
			verifiedAtIso: nowIso,
			sizeBytes: totalBytes,
			ayahAudioUrls,
			ayahAudioDataUrls
		};
		const integrity = await verifySurahQariAudioIntegrity(meta.number, reciter.editionId, draftRecord);
		if (!integrity.valid) {
			const msg = integrity.errors.join(" ");
			this.updateState({
				status: "error",
				errorMessage: msg
			});
			return {
				ok: false,
				integrity,
				error: msg
			};
		}
		const finalRecord = {
			...draftRecord,
			checksumSha256: integrity.checksumSha256
		};
		const writeRes = await saveOfflineAudioToDb(finalRecord);
		if (!writeRes.ok) {
			const msg = writeRes.error || "Failed to save Qari audio to IndexedDB.";
			this.updateState({
				status: "error",
				errorMessage: msg
			});
			return {
				ok: false,
				error: msg
			};
		}
		this.updateState({
			status: "completed",
			completedSurahs: 1,
			progressPercent: 100,
			errorMessage: null
		});
		return {
			ok: true,
			record: finalRecord,
			integrity
		};
	}
	/**
	* Downloads Qari audio for multiple Surahs (e.g. Juz Amma or Essential Pack) with progress tracking.
	*/
	async downloadQariAudioBatch(options) {
		const reciter = resolveReciterConfig(options.reciterName);
		const metas = options.surahNumbers.map((n) => ALL_114_SURAHS.find((s) => s.number === n)).filter((m) => Boolean(m));
		let completedSurahs = 0;
		let totalBytes = 0;
		for (const meta of metas) {
			if (this.cancelRequested) return {
				ok: false,
				completedSurahs,
				totalBytes,
				error: "Batch audio download cancelled by user."
			};
			const res = await this.downloadSurahQariAudio({
				surahNumber: meta.number,
				reciterName: reciter.id,
				customAudioFetcher: options.customAudioFetcher
			});
			if (!res.ok) return {
				ok: false,
				completedSurahs,
				totalBytes,
				error: res.error
			};
			completedSurahs += 1;
			totalBytes += res.record?.sizeBytes || 0;
			this.updateState({
				completedSurahs,
				totalSurahs: metas.length,
				downloadedBytes: totalBytes
			});
		}
		return {
			ok: true,
			completedSurahs,
			totalBytes
		};
	}
	async deleteSurahQariAudio(surahNumber, reciterName) {
		const reciter = resolveReciterConfig(reciterName);
		if (typeof caches !== "undefined") try {
			const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
			if (meta) {
				const cache = await caches.open(QARI_AUDIO_CACHE_NAME);
				for (let ayahNum = 1; ayahNum <= meta.ayahCount; ayahNum += 1) {
					const globalNum = getGlobalAyahNumber(meta.number, ayahNum);
					const cdnUrl = `https://cdn.islamic.network/quran/audio/${reciter.cdnBitrate}/${reciter.editionId}/${globalNum}.mp3`;
					await cache.delete(cdnUrl);
				}
			}
		} catch {}
		return deleteOfflineAudioFromDb(reciter.editionId, surahNumber);
	}
	async deleteReciterAllAudio(reciterName) {
		const reciter = resolveReciterConfig(reciterName);
		return deleteOfflineAudioFromDb(reciter.editionId);
	}
	async deleteAllQariAudio() {
		if (typeof caches !== "undefined") try {
			await caches.delete(QARI_AUDIO_CACHE_NAME);
		} catch {}
		const deleted = await deleteAllOfflineAudioFromDb();
		this.updateState({
			status: "idle",
			completedAyahs: 0,
			totalAyahs: 0,
			completedSurahs: 0,
			totalSurahs: 0,
			progressPercent: 0,
			downloadedBytes: 0,
			errorMessage: null
		});
		return deleted;
	}
	async getInstalledAudioSummary() {
		const records = await listOfflineAudioRecords();
		let totalBytes = 0;
		const byReciter = {};
		for (const rec of records) {
			totalBytes += rec.sizeBytes || 0;
			if (!byReciter[rec.editionId]) byReciter[rec.editionId] = {
				surahNumbers: [],
				totalBytes: 0
			};
			if (!byReciter[rec.editionId].surahNumbers.includes(rec.surahNumber)) byReciter[rec.editionId].surahNumbers.push(rec.surahNumber);
			byReciter[rec.editionId].totalBytes += rec.sizeBytes || 0;
		}
		for (const key of Object.keys(byReciter)) byReciter[key].surahNumbers.sort((a, b) => a - b);
		return {
			records,
			totalBytes,
			byReciter
		};
	}
};
var audioDownloadManager = new QariAudioDownloadManager();
// src/services/mediaSessionService.ts
var IlmizoMediaSessionNative = registerPlugin("IlmizoMediaSession");
var registeredCallbacks = null;
var nativeListenerAttached = false;
function isNativeAndroid() {
	return typeof window !== "undefined" && typeof Capacitor?.isNativePlatform === "function" && Capacitor.isNativePlatform() && typeof Capacitor?.getPlatform === "function" && Capacitor.getPlatform() === "android";
}
/**
* Registers Web MediaSession API lock-screen controls (iOS Safari, Android Chrome, Desktop PWA)
* AND bridges Native Android Media Playback Foreground Service button intents back to audioManager.
*/
function initLockScreenMediaSession(callbacks) {
	registeredCallbacks = callbacks;
	if (typeof navigator !== "undefined" && "mediaSession" in navigator && navigator.mediaSession) {
		const ms = navigator.mediaSession;
		const safeSetHandler = (action, handler) => {
			try {
				ms.setActionHandler(action, handler);
			} catch {}
		};
		safeSetHandler("play", () => registeredCallbacks?.onPlay());
		safeSetHandler("pause", () => registeredCallbacks?.onPause());
		safeSetHandler("nexttrack", () => registeredCallbacks?.onNext());
		safeSetHandler("previoustrack", () => registeredCallbacks?.onPrevious());
		safeSetHandler("stop", () => registeredCallbacks?.onStop());
		safeSetHandler("seekto", (details) => {
			if (typeof details?.seekTime === "number") registeredCallbacks?.onSeekTo?.(details.seekTime);
		});
	}
	if (isNativeAndroid() && !nativeListenerAttached) {
		nativeListenerAttached = true;
		IlmizoMediaSessionNative.addListener("mediaAction", (event) => {
			const action = event?.action;
			if (action === "play") registeredCallbacks?.onPlay();
			else if (action === "pause") registeredCallbacks?.onPause();
			else if (action === "next") registeredCallbacks?.onNext();
			else if (action === "previous") registeredCallbacks?.onPrevious();
			else if (action === "stop") registeredCallbacks?.onStop();
		}).catch(() => {
			nativeListenerAttached = false;
		});
	}
}
/**
* Pushes current Surah/Ayah or Story metadata & play/pause state to:
* 1) Browser/OS Lock-Screen MediaSession API
* 2) Native Android Media Foreground Service (when running inside the Capacitor APK)
*/
function syncLockScreenMediaMetadata(info) {
	if (typeof navigator !== "undefined" && "mediaSession" in navigator && navigator.mediaSession) try {
		if (typeof MediaMetadata !== "undefined") navigator.mediaSession.metadata = new MediaMetadata({
			title: info.title,
			artist: info.artist,
			album: info.album,
			artwork: [{
				src: "/pwa-192x192.png",
				sizes: "192x192",
				type: "image/png"
			}, {
				src: "/pwa-512x512.png",
				sizes: "512x512",
				type: "image/png"
			}]
		});
		navigator.mediaSession.playbackState = info.isPlaying ? "playing" : info.isPaused ? "paused" : "none";
	} catch {}
	if (isNativeAndroid()) IlmizoMediaSessionNative.updatePlayback({
		title: info.title,
		artist: info.artist,
		album: info.album,
		isPlaying: info.isPlaying,
		canNext: Boolean(info.canNext),
		canPrevious: Boolean(info.canPrevious)
	}).catch(() => {});
}
/**
* Updates lock-screen scrubber position state safely from live HTMLAudioElement time/duration.
*/
function syncLockScreenPositionState(currentTimeSec, durationSec, playbackRate = 1) {
	if (typeof navigator === "undefined" || !("mediaSession" in navigator) || !navigator.mediaSession || typeof navigator.mediaSession.setPositionState !== "function") return;
	if (!Number.isFinite(durationSec) || durationSec <= 0) return;
	const safePosition = Math.max(0, Math.min(durationSec, Number.isFinite(currentTimeSec) ? currentTimeSec : 0));
	const safeRate = Number.isFinite(playbackRate) && playbackRate > 0 ? playbackRate : 1;
	try {
		navigator.mediaSession.setPositionState({
			duration: durationSec,
			playbackRate: safeRate,
			position: safePosition
		});
	} catch {}
}
/**
* Clears lock-screen controls and stops the Native Android Foreground Media Service when playback stops.
*/
function clearLockScreenMediaSession() {
	if (typeof navigator !== "undefined" && "mediaSession" in navigator && navigator.mediaSession) try {
		navigator.mediaSession.playbackState = "none";
		navigator.mediaSession.metadata = null;
	} catch {}
	if (isNativeAndroid()) IlmizoMediaSessionNative.stopPlayback().catch(() => {});
}
// src/services/audioManager.ts
var DEFAULT_QURAN_SEQUENCE_STATE = {
	mode: null,
	surahNumber: null,
	surahName: null,
	currentAyah: null,
	startAyah: null,
	endAyah: null,
	totalAyahsInRange: 0,
	completedAyahsInPass: 0,
	progressPercent: 0,
	repeatOption: 1,
	currentRepetition: 1,
	reciterName: "Mishary Rashid Alafasy",
	reciterEditionId: "ar.alafasy",
	playbackSource: null
};
function validateSurahAyahRange(surahNumber, startAyah, endAyah) {
	const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
	if (!meta) return {
		valid: false,
		surahName: "",
		ayahCount: 0,
		startAyah,
		endAyah,
		error: `Invalid Surah number ${surahNumber}. Must be between 1 and 114.`
	};
	if (!Number.isInteger(startAyah) || !Number.isInteger(endAyah) || startAyah < 1 || endAyah < 1 || startAyah > meta.ayahCount || endAyah > meta.ayahCount || startAyah > endAyah) return {
		valid: false,
		surahName: meta.nameTranslit,
		ayahCount: meta.ayahCount,
		startAyah,
		endAyah,
		error: `Invalid Ayah range ${startAyah}–${endAyah} for Surah ${meta.nameTranslit} (valid range: 1–${meta.ayahCount}).`
	};
	return {
		valid: true,
		surahName: meta.nameTranslit,
		ayahCount: meta.ayahCount,
		startAyah,
		endAyah
	};
}
var CentralizedAudioManager = class {
	constructor() {
		this.state = {
			status: "idle",
			activeTrackId: null,
			activeKind: null,
			isMuted: false,
			repeatEnabled: false,
			playbackRate: 1,
			errorMessage: null,
			quranSequence: { ...DEFAULT_QURAN_SEQUENCE_STATE }
		};
		this.currentAudio = null;
		this.currentUtterance = null;
		this.lastPlayOptions = null;
		this.lastSpeakOptions = null;
		this.listeners = /* @__PURE__ */ new Set();
		this.clockListeners = /* @__PURE__ */ new Set();
		this.clockRafId = null;
		this.playbackClock = {
			currentTimeSec: 0,
			durationSec: 0,
			ratio: 0
		};
		this.externalCleanups = /* @__PURE__ */ new Set();
		this.mediaSessionInitialized = false;
		this.sessionToken = 0;
		this.customDriverCleanup = null;
		this.customAyahDriver = null;
		this.activeSequenceOptions = null;
	}
	ensureMediaSessionInitialized() {
		if (this.mediaSessionInitialized) return;
		this.mediaSessionInitialized = true;
		initLockScreenMediaSession({
			onPlay: () => this.resume(),
			onPause: () => this.pause(),
			onNext: () => {
				this.nextAyah();
			},
			onPrevious: () => {
				this.previousAyah();
			},
			onStop: () => this.stopAll(),
			onSeekTo: (timeSec) => this.seekTo(timeSec)
		});
	}
	getState() {
		return {
			...this.state,
			quranSequence: { ...this.state.quranSequence }
		};
	}
	getPlaybackClock() {
		return { ...this.playbackClock };
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	subscribePlaybackClock(listener) {
		this.clockListeners.add(listener);
		listener(this.getPlaybackClock());
		return () => {
			this.clockListeners.delete(listener);
		};
	}
	emitPlaybackClock(currentTimeSec, durationSec) {
		const safeDur = Number.isFinite(durationSec) && durationSec > 0 ? durationSec : 0;
		const safeCur = Number.isFinite(currentTimeSec) && currentTimeSec >= 0 ? currentTimeSec : 0;
		const ratio = safeDur > 0 ? Math.max(0, Math.min(1, safeCur / safeDur)) : 0;
		this.playbackClock = {
			currentTimeSec: safeCur,
			durationSec: safeDur,
			ratio
		};
		if (safeDur > 0) syncLockScreenPositionState(safeCur, safeDur, this.state.playbackRate);
		this.clockListeners.forEach((cb) => cb(this.playbackClock));
	}
	stopClockLoop() {
		if (this.clockRafId !== null && typeof cancelAnimationFrame === "function") cancelAnimationFrame(this.clockRafId);
		this.clockRafId = null;
	}
	startClockLoop(audio) {
		this.stopClockLoop();
		const tick = () => {
			if (this.currentAudio !== audio || audio.paused || audio.ended) {
				this.clockRafId = null;
				return;
			}
			this.emitPlaybackClock(audio.currentTime || 0, audio.duration || 0);
			if (typeof requestAnimationFrame === "function") this.clockRafId = requestAnimationFrame(tick);
		};
		if (typeof requestAnimationFrame === "function") this.clockRafId = requestAnimationFrame(tick);
	}
	seekTo(timeSec) {
		if (!this.currentAudio || !Number.isFinite(timeSec)) return;
		try {
			const dur = this.currentAudio.duration;
			const clamped = Number.isFinite(dur) && dur > 0 ? Math.max(0, Math.min(dur, timeSec)) : Math.max(0, timeSec);
			this.currentAudio.currentTime = clamped;
			this.emitPlaybackClock(clamped, Number.isFinite(dur) ? dur : 0);
		} catch {}
	}
	/**
	* Test hook for deterministic sequence verification in Node environments without HTMLAudioElement.
	*/
	setCustomAyahPlaybackDriver(driver) {
		this.customAyahDriver = driver;
	}
	registerExternalCleanup(cb) {
		this.externalCleanups.add(cb);
		return () => {
			this.externalCleanups.delete(cb);
		};
	}
	syncLockScreenFromState() {
		const { status, quranSequence, activeTrackId } = this.state;
		if (status === "playing" || status === "loading" || status === "paused") {
			this.ensureMediaSessionInitialized();
			const hasQuran = Boolean(quranSequence.surahName && quranSequence.currentAyah);
			const title = hasQuran ? `${quranSequence.surahName} · Ayah ${quranSequence.currentAyah}` : activeTrackId?.startsWith("adhan_") ? "Ilmizo Daily Adhan" : activeTrackId?.startsWith("story") ? "Ilmizo Kids Storybook" : "Ilmizo Audio Recitation";
			const artist = hasQuran ? quranSequence.reciterName : "Ilmizo Islamic Companion";
			const album = hasQuran ? quranSequence.mode === "ayah_range" && quranSequence.startAyah && quranSequence.endAyah ? `Ayahs ${quranSequence.startAyah}–${quranSequence.endAyah} · Ilmizo Quran` : `Surah ${quranSequence.surahNumber} · Ilmizo Quran` : "Ilmizo — Learn · Pray · Grow";
			const maxAyah = quranSequence.endAyah ?? 0;
			const minAyah = quranSequence.startAyah ?? 1;
			syncLockScreenMediaMetadata({
				title,
				artist,
				album,
				surahNumber: quranSequence.surahNumber,
				ayahNumber: quranSequence.currentAyah,
				isPlaying: status === "playing" || status === "loading",
				isPaused: status === "paused",
				canNext: Boolean(hasQuran && quranSequence.currentAyah && maxAyah > quranSequence.currentAyah),
				canPrevious: Boolean(hasQuran && quranSequence.currentAyah && quranSequence.currentAyah > minAyah)
			});
		} else clearLockScreenMediaSession();
	}
	updateState(patch) {
		this.state = {
			...this.state,
			...patch,
			quranSequence: patch.quranSequence ? {
				...this.state.quranSequence,
				...patch.quranSequence
			} : this.state.quranSequence
		};
		this.syncLockScreenFromState();
		const snapshot = this.getState();
		this.listeners.forEach((listener) => listener(snapshot));
	}
	stopInternalMediaOnly() {
		this.sessionToken += 1;
		this.stopClockLoop();
		this.emitPlaybackClock(0, 0);
		if (this.customDriverCleanup) {
			try {
				this.customDriverCleanup();
			} catch {}
			this.customDriverCleanup = null;
		}
		if (this.currentAudio) {
			try {
				this.currentAudio.onplaying = null;
				this.currentAudio.onpause = null;
				this.currentAudio.onended = null;
				this.currentAudio.onerror = null;
				this.currentAudio.onloadstart = null;
				this.currentAudio.ontimeupdate = null;
				this.currentAudio.onloadedmetadata = null;
				this.currentAudio.pause();
				this.currentAudio.currentTime = 0;
				this.currentAudio.removeAttribute("src");
			} catch {}
			this.currentAudio = null;
		}
		if (typeof window !== "undefined" && "speechSynthesis" in window) try {
			window.speechSynthesis.cancel();
		} catch {}
		this.currentUtterance = null;
	}
	/**
	* Immediately stops all active audio playback, Quran sequence loops, speech synthesis,
	* and registered external streams.
	*/
	stopAll() {
		this.stopInternalMediaOnly();
		this.activeSequenceOptions = null;
		this.externalCleanups.forEach((cb) => {
			try {
				cb();
			} catch {}
		});
		this.updateState({
			status: "idle",
			activeTrackId: null,
			activeKind: null,
			errorMessage: null,
			quranSequence: {
				...DEFAULT_QURAN_SEQUENCE_STATE,
				repeatOption: this.state.quranSequence.repeatOption,
				reciterName: this.state.quranSequence.reciterName,
				reciterEditionId: this.state.quranSequence.reciterEditionId
			}
		});
	}
	setMuted(muted) {
		const nextMuted = Boolean(muted);
		if (nextMuted) this.stopAll();
		this.updateState({
			isMuted: nextMuted,
			...nextMuted ? {
				status: "idle",
				activeTrackId: null,
				activeKind: null,
				errorMessage: null
			} : {}
		});
	}
	setRepeatEnabled(repeat) {
		const nextRepeat = Boolean(repeat);
		if (this.currentAudio) this.currentAudio.loop = false;
		this.updateState({
			repeatEnabled: nextRepeat,
			quranSequence: {
				...this.state.quranSequence,
				repeatOption: nextRepeat ? "infinite" : 1
			}
		});
	}
	setRepeatOption(option) {
		const safeOption = [
			1,
			2,
			5,
			10,
			"infinite"
		].includes(option) ? option : 1;
		this.updateState({
			repeatEnabled: safeOption !== 1,
			quranSequence: {
				...this.state.quranSequence,
				repeatOption: safeOption
			}
		});
	}
	setReciter(reciterName) {
		const cfg = resolveReciterConfig(reciterName);
		this.updateState({ quranSequence: {
			...this.state.quranSequence,
			reciterName: cfg.label,
			reciterEditionId: cfg.editionId
		} });
	}
	setPlaybackRate(rate) {
		const safeRate = Number.isFinite(rate) && rate >= .5 && rate <= 2 ? rate : 1;
		if (this.currentAudio) try {
			this.currentAudio.playbackRate = safeRate;
		} catch {}
		this.updateState({ playbackRate: safeRate });
	}
	/**
	* Plays an audio URL (or falls back to speechSynthesis if allowTtsFallback=true) ONLY when explicitly called.
	* Stops any previously playing audio or speech first.
	*/
	playAudioUrl(options) {
		const { id, url, fallbackText, fallbackLang = "ar-SA", allowTtsFallback = true, offlineUnavailableMessage, rate = this.state.playbackRate, repeat, onEnded, onError } = options;
		this.lastPlayOptions = options;
		this.lastSpeakOptions = null;
		if (typeof repeat === "boolean") this.state.repeatEnabled = repeat;
		this.stopInternalMediaOnly();
		const tokenAtStart = this.sessionToken;
		if (this.state.isMuted) {
			const msg = "App audio is muted. Tap Unmute in the header to listen.";
			this.updateState({
				status: "idle",
				activeTrackId: null,
				activeKind: null,
				errorMessage: msg
			});
			onError?.(msg);
			return;
		}
		if (!url) {
			if (allowTtsFallback && fallbackText) {
				this.speakText({
					id,
					text: fallbackText,
					lang: fallbackLang,
					rate,
					repeat: this.state.repeatEnabled,
					onEnded,
					onError
				});
				return;
			}
			const msg = offlineUnavailableMessage || (typeof navigator !== "undefined" && !navigator.onLine ? "Audio for this Surah is not downloaded for offline playback. Connect to the internet or download this Qari's audio." : "Audio source is unavailable for this item.");
			this.updateState({
				status: "error",
				activeTrackId: id,
				activeKind: "audio",
				errorMessage: msg
			});
			onError?.(msg);
			return;
		}
		if (this.customAyahDriver) {
			const seq = this.state.quranSequence;
			this.updateState({
				status: "playing",
				activeTrackId: id,
				activeKind: "audio",
				playbackRate: rate,
				errorMessage: null
			});
			const cleanup = this.customAyahDriver({
				url,
				surahNumber: seq.surahNumber || 1,
				ayahNumberInSurah: seq.currentAyah || 1,
				repetition: seq.currentRepetition || 1,
				sessionToken: tokenAtStart,
				onComplete: () => {
					if (this.sessionToken !== tokenAtStart) return;
					if (this.state.repeatEnabled && !seq.mode && !this.state.isMuted) {
						this.playAudioUrl(options);
						return;
					}
					this.updateState({
						status: "idle",
						activeTrackId: null,
						activeKind: null,
						errorMessage: null
					});
					onEnded?.();
				},
				onFail: (message) => {
					if (this.sessionToken !== tokenAtStart) return;
					this.updateState({
						status: "error",
						activeTrackId: id,
						activeKind: "audio",
						errorMessage: message
					});
					onError?.(message);
				}
			});
			if (typeof cleanup === "function") this.customDriverCleanup = cleanup;
			return;
		}
		try {
			const audio = new Audio(url);
			this.currentAudio = audio;
			audio.preload = "auto";
			audio.muted = this.state.isMuted;
			audio.playbackRate = rate;
			this.updateState({
				status: "loading",
				activeTrackId: id,
				activeKind: "audio",
				playbackRate: rate,
				errorMessage: null
			});
			audio.onloadedmetadata = () => {
				if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
				this.emitPlaybackClock(audio.currentTime || 0, audio.duration || 0);
			};
			audio.ontimeupdate = () => {
				if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
				this.emitPlaybackClock(audio.currentTime || 0, audio.duration || 0);
			};
			audio.onplaying = () => {
				if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
				this.startClockLoop(audio);
				this.updateState({
					status: "playing",
					activeTrackId: id,
					activeKind: "audio",
					errorMessage: null
				});
			};
			audio.onpause = () => {
				if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
				this.stopClockLoop();
				if (!audio.ended && this.state.status === "playing") this.updateState({ status: "paused" });
			};
			audio.onended = () => {
				if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
				this.stopClockLoop();
				this.emitPlaybackClock(0, 0);
				if (this.state.repeatEnabled && !this.state.quranSequence.mode && !this.state.isMuted) {
					audio.currentTime = 0;
					audio.play().catch(() => {
						if (this.sessionToken !== tokenAtStart) return;
						this.updateState({
							status: "idle",
							activeTrackId: null,
							activeKind: null
						});
					});
					return;
				}
				this.currentAudio = null;
				this.updateState({
					status: "idle",
					activeTrackId: null,
					activeKind: null,
					errorMessage: null
				});
				onEnded?.();
			};
			audio.onerror = () => {
				if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
				this.currentAudio = null;
				if (allowTtsFallback && fallbackText && !this.state.isMuted) {
					this.speakText({
						id,
						text: fallbackText,
						lang: fallbackLang,
						rate: Math.min(1, rate),
						repeat: this.state.repeatEnabled,
						onEnded,
						onError
					});
					return;
				}
				const msg = offlineUnavailableMessage || (typeof navigator !== "undefined" && !navigator.onLine ? "Audio for this Surah is not downloaded for offline playback. Connect to the internet or download this Qari's audio." : "Unable to load recitation audio. Check your connection or offline cache.");
				this.updateState({
					status: "error",
					activeTrackId: id,
					activeKind: "audio",
					errorMessage: msg
				});
				onError?.(msg);
			};
			const playPromise = audio.play();
			if (playPromise && typeof playPromise.then === "function") playPromise.then(() => {
				if (this.currentAudio === audio && this.sessionToken === tokenAtStart) this.updateState({
					status: "playing",
					activeTrackId: id,
					activeKind: "audio",
					errorMessage: null
				});
			}).catch(() => {
				if (this.currentAudio !== audio || this.sessionToken !== tokenAtStart) return;
				this.currentAudio = null;
				if (allowTtsFallback && fallbackText && !this.state.isMuted) {
					this.speakText({
						id,
						text: fallbackText,
						lang: fallbackLang,
						rate: Math.min(1, rate),
						repeat: this.state.repeatEnabled,
						onEnded,
						onError
					});
					return;
				}
				const msg = offlineUnavailableMessage || (typeof navigator !== "undefined" && !navigator.onLine ? "Audio for this Surah is not downloaded for offline playback. Connect to the internet or download this Qari's audio." : "Audio playback could not start. Tap Play to try again.");
				this.updateState({
					status: "error",
					activeTrackId: id,
					activeKind: "audio",
					errorMessage: msg
				});
				onError?.(msg);
			});
		} catch {
			const msg = "Audio playback is not supported in this environment.";
			this.updateState({
				status: "error",
				activeTrackId: id,
				activeKind: "audio",
				errorMessage: msg
			});
			onError?.(msg);
		}
	}
	/**
	* Plays a single verified Qari recitation Ayah (Mode 1: Single Ayah Mode).
	* Resolves downloaded offline audio in IndexedDB first, or online stream when online.
	* If offline and not downloaded, shows the exact offline message and NEVER falls back to robotic TTS.
	*/
	async playQariRecitationAyah(params) {
		const validation = validateSurahAyahRange(params.surahNumber, params.ayahNumberInSurah, params.ayahNumberInSurah);
		if (!validation.valid) {
			const msg = validation.error || "Invalid Surah or Ayah number.";
			this.stopInternalMediaOnly();
			this.updateState({
				status: "error",
				activeTrackId: params.id,
				activeKind: "audio",
				errorMessage: msg
			});
			params.onError?.(msg);
			return {
				ok: false,
				source: "invalid_range",
				error: msg
			};
		}
		const reciterCfg = resolveReciterConfig(params.reciterName || this.state.quranSequence.reciterName);
		const repeatOpt = params.repeatOption ?? (params.repeat === true ? "infinite" : params.repeat === false ? 1 : this.state.quranSequence.repeatOption);
		this.activeSequenceOptions = {
			isOnline: params.isOnline,
			onSequenceComplete: params.onEnded,
			onError: params.onError
		};
		this.updateState({ quranSequence: {
			mode: "single_ayah",
			surahNumber: params.surahNumber,
			surahName: validation.surahName,
			currentAyah: params.ayahNumberInSurah,
			startAyah: params.ayahNumberInSurah,
			endAyah: params.ayahNumberInSurah,
			totalAyahsInRange: 1,
			completedAyahsInPass: 0,
			progressPercent: 0,
			repeatOption: repeatOpt,
			currentRepetition: 1,
			reciterName: reciterCfg.label,
			reciterEditionId: reciterCfg.editionId,
			playbackSource: null
		} });
		return this.playCurrentSequenceStep({
			explicitTrackId: params.id,
			globalAyahNumber: params.globalAyahNumber,
			rate: params.rate
		});
	}
	/**
	* Mode 2: Full Surah Mode
	* Explicitly plays Ayah 1 -> Ayah 2 -> ... -> Final Ayah of the Surah sequentially.
	* Stops cleanly at the final Ayah (or repeats according to repeatOption if set).
	*/
	async playFullSurah(params) {
		const meta = ALL_114_SURAHS.find((s) => s.number === params.surahNumber);
		if (!meta) {
			const msg = `Invalid Surah number ${params.surahNumber}.`;
			this.stopInternalMediaOnly();
			this.updateState({
				status: "error",
				errorMessage: msg
			});
			params.onError?.(msg);
			return {
				ok: false,
				source: "invalid_surah",
				error: msg
			};
		}
		const firstAyah = params.startFromAyah && params.startFromAyah >= 1 && params.startFromAyah <= meta.ayahCount ? params.startFromAyah : 1;
		const reciterCfg = resolveReciterConfig(params.reciterName || this.state.quranSequence.reciterName);
		const repeatOpt = params.repeatOption ?? this.state.quranSequence.repeatOption ?? 1;
		this.activeSequenceOptions = {
			isOnline: params.isOnline,
			onAyahChange: params.onAyahChange,
			onSequenceComplete: params.onSequenceComplete,
			onError: params.onError
		};
		this.updateState({ quranSequence: {
			mode: "full_surah",
			surahNumber: meta.number,
			surahName: meta.nameTranslit,
			currentAyah: firstAyah,
			startAyah: 1,
			endAyah: meta.ayahCount,
			totalAyahsInRange: meta.ayahCount,
			completedAyahsInPass: firstAyah - 1,
			progressPercent: Math.round((firstAyah - 1) / meta.ayahCount * 100),
			repeatOption: repeatOpt,
			currentRepetition: 1,
			reciterName: reciterCfg.label,
			reciterEditionId: reciterCfg.editionId,
			playbackSource: null
		} });
		params.onAyahChange?.(meta.number, firstAyah);
		return this.playCurrentSequenceStep({ rate: params.rate });
	}
	/**
	* Mode 3: Selected Ayah Range Mode
	* Validates startAyah..endAyah belong to the selected Surah, plays all Ayahs in sequence,
	* and loops according to repeatOption (1, 2, 5, 10, or 'infinite').
	*/
	async playAyahRange(params) {
		const validation = validateSurahAyahRange(params.surahNumber, params.startAyah, params.endAyah);
		if (!validation.valid) {
			const msg = validation.error || "Invalid Ayah range.";
			this.stopInternalMediaOnly();
			this.updateState({
				status: "error",
				errorMessage: msg
			});
			params.onError?.(msg);
			return {
				ok: false,
				source: "invalid_range",
				error: msg
			};
		}
		const reciterCfg = resolveReciterConfig(params.reciterName || this.state.quranSequence.reciterName);
		const repeatOpt = params.repeatOption ?? this.state.quranSequence.repeatOption ?? 1;
		const totalInRange = validation.endAyah - validation.startAyah + 1;
		this.activeSequenceOptions = {
			isOnline: params.isOnline,
			onAyahChange: params.onAyahChange,
			onSequenceComplete: params.onSequenceComplete,
			onError: params.onError
		};
		this.updateState({ quranSequence: {
			mode: "ayah_range",
			surahNumber: params.surahNumber,
			surahName: validation.surahName,
			currentAyah: validation.startAyah,
			startAyah: validation.startAyah,
			endAyah: validation.endAyah,
			totalAyahsInRange: totalInRange,
			completedAyahsInPass: 0,
			progressPercent: 0,
			repeatOption: repeatOpt,
			currentRepetition: 1,
			reciterName: reciterCfg.label,
			reciterEditionId: reciterCfg.editionId,
			playbackSource: null
		} });
		params.onAyahChange?.(params.surahNumber, validation.startAyah);
		return this.playCurrentSequenceStep({ rate: params.rate });
	}
	/**
	* Advances to the next Ayah in the current Surah or range when user presses Next Ayah.
	*/
	async nextAyah() {
		const seq = this.state.quranSequence;
		if (!seq.surahNumber || !seq.currentAyah) return {
			ok: false,
			currentAyah: null,
			error: "No active Quran Surah selected."
		};
		const meta = ALL_114_SURAHS.find((s) => s.number === seq.surahNumber);
		if (!meta) return {
			ok: false,
			currentAyah: null,
			error: "Invalid Surah."
		};
		const maxAyah = seq.endAyah && seq.mode === "ayah_range" ? seq.endAyah : meta.ayahCount;
		const minAyah = seq.startAyah && seq.mode === "ayah_range" ? seq.startAyah : 1;
		if (seq.currentAyah >= maxAyah) return {
			ok: false,
			currentAyah: seq.currentAyah,
			error: `Already at the last Ayah (${maxAyah}) of the current selection.`
		};
		const nextAyahNum = seq.currentAyah + 1;
		const totalInRange = Math.max(1, maxAyah - minAyah + 1);
		const completedInPass = Math.max(0, nextAyahNum - minAyah);
		this.updateState({ quranSequence: {
			...seq,
			mode: seq.mode || "single_ayah",
			currentAyah: nextAyahNum,
			completedAyahsInPass: completedInPass,
			progressPercent: Math.round(completedInPass / totalInRange * 100)
		} });
		this.activeSequenceOptions?.onAyahChange?.(seq.surahNumber, nextAyahNum);
		const res = await this.playCurrentSequenceStep({});
		return {
			ok: res.ok,
			currentAyah: nextAyahNum,
			error: res.error
		};
	}
	/**
	* Moves to the previous Ayah in the current Surah or range when user presses Previous Ayah.
	*/
	async previousAyah() {
		const seq = this.state.quranSequence;
		if (!seq.surahNumber || !seq.currentAyah) return {
			ok: false,
			currentAyah: null,
			error: "No active Quran Surah selected."
		};
		const meta = ALL_114_SURAHS.find((s) => s.number === seq.surahNumber);
		if (!meta) return {
			ok: false,
			currentAyah: null,
			error: "Invalid Surah."
		};
		const maxAyah = seq.endAyah && seq.mode === "ayah_range" ? seq.endAyah : meta.ayahCount;
		const minAyah = seq.startAyah && seq.mode === "ayah_range" ? seq.startAyah : 1;
		if (seq.currentAyah <= minAyah) return {
			ok: false,
			currentAyah: seq.currentAyah,
			error: `Already at the first Ayah (${minAyah}) of the current selection.`
		};
		const prevAyahNum = seq.currentAyah - 1;
		const totalInRange = Math.max(1, maxAyah - minAyah + 1);
		const completedInPass = Math.max(0, prevAyahNum - minAyah);
		this.updateState({ quranSequence: {
			...seq,
			mode: seq.mode || "single_ayah",
			currentAyah: prevAyahNum,
			completedAyahsInPass: completedInPass,
			progressPercent: Math.round(completedInPass / totalInRange * 100)
		} });
		this.activeSequenceOptions?.onAyahChange?.(seq.surahNumber, prevAyahNum);
		const res = await this.playCurrentSequenceStep({});
		return {
			ok: res.ok,
			currentAyah: prevAyahNum,
			error: res.error
		};
	}
	async playCurrentSequenceStep(params) {
		const seq = this.state.quranSequence;
		if (!seq.surahNumber || !seq.currentAyah) return {
			ok: false,
			source: "none",
			error: "No active Surah or Ayah selected."
		};
		const stepSessionToken = this.sessionToken + 1;
		const trackId = params.explicitTrackId || `quran-${seq.surahNumber}-${seq.currentAyah}`;
		const resolved = await resolveQariAyahAudioSource({
			surahNumber: seq.surahNumber,
			ayahNumberInSurah: seq.currentAyah,
			globalAyahNumber: params.globalAyahNumber,
			reciterName: seq.reciterName,
			isOnline: this.activeSequenceOptions?.isOnline
		});
		if (this.sessionToken >= stepSessionToken) return {
			ok: false,
			source: "cancelled",
			error: "Playback superseded by newer action."
		};
		if (!resolved.available || !resolved.url) {
			const msg = resolved.errorMessage || "Audio for this Surah is not downloaded for offline playback. Connect to the internet or download this Qari's audio.";
			this.stopInternalMediaOnly();
			this.updateState({
				status: "error",
				activeTrackId: trackId,
				activeKind: "audio",
				errorMessage: msg,
				quranSequence: {
					...this.state.quranSequence,
					playbackSource: null
				}
			});
			this.activeSequenceOptions?.onError?.(msg);
			return {
				ok: false,
				source: resolved.source,
				error: msg
			};
		}
		this.updateState({ quranSequence: {
			...this.state.quranSequence,
			playbackSource: resolved.source === "offline_downloaded" ? "offline_downloaded" : "online_stream"
		} });
		this.playAudioUrl({
			id: trackId,
			url: resolved.url,
			allowTtsFallback: false,
			offlineUnavailableMessage: OFFLINE_QARI_MISSING_MESSAGE,
			rate: params.rate ?? this.state.playbackRate,
			repeat: false,
			onEnded: () => {
				this.handleSequenceAyahEnded();
			},
			onError: (errMsg) => {
				this.activeSequenceOptions?.onError?.(errMsg);
			}
		});
		return {
			ok: true,
			source: resolved.source
		};
	}
	handleSequenceAyahEnded() {
		const seq = this.state.quranSequence;
		if (!seq.mode || !seq.surahNumber || !seq.currentAyah) return;
		const startAyah = seq.startAyah ?? seq.currentAyah;
		const endAyah = seq.endAyah ?? seq.currentAyah;
		const totalInRange = Math.max(1, endAyah - startAyah + 1);
		if (seq.currentAyah < endAyah && (seq.mode === "full_surah" || seq.mode === "ayah_range")) {
			const nextAyahNum = seq.currentAyah + 1;
			const completedInPass = nextAyahNum - startAyah;
			this.updateState({ quranSequence: {
				...seq,
				currentAyah: nextAyahNum,
				completedAyahsInPass: completedInPass,
				progressPercent: Math.round(completedInPass / totalInRange * 100)
			} });
			this.activeSequenceOptions?.onAyahChange?.(seq.surahNumber, nextAyahNum);
			this.playCurrentSequenceStep({});
			return;
		}
		if ((seq.repeatOption === "infinite" || typeof seq.repeatOption === "number" && seq.currentRepetition < seq.repeatOption) && !this.state.isMuted) {
			const nextRep = seq.currentRepetition + 1;
			this.updateState({ quranSequence: {
				...seq,
				currentAyah: startAyah,
				completedAyahsInPass: 0,
				progressPercent: 0,
				currentRepetition: nextRep
			} });
			this.activeSequenceOptions?.onAyahChange?.(seq.surahNumber, startAyah);
			this.playCurrentSequenceStep({});
			return;
		}
		const completionCb = this.activeSequenceOptions?.onSequenceComplete;
		this.activeSequenceOptions = null;
		this.updateState({
			status: "idle",
			activeTrackId: null,
			activeKind: null,
			errorMessage: null,
			quranSequence: {
				...seq,
				mode: null,
				completedAyahsInPass: totalInRange,
				progressPercent: 100
			}
		});
		completionCb?.();
	}
	/**
	* Speaks text via Web Speech synthesis ONLY when explicitly called by a user tap.
	* Stops any existing audio or speech first and respects global mute.
	*/
	speakText(options) {
		const { id, text, lang = "en-US", rate = .92, pitch = 1, repeat, onEnded, onError } = options;
		this.lastSpeakOptions = options;
		this.lastPlayOptions = null;
		if (typeof repeat === "boolean") this.state.repeatEnabled = repeat;
		this.stopInternalMediaOnly();
		const tokenAtStart = this.sessionToken;
		if (this.state.isMuted) {
			const msg = "App audio is muted. Tap Unmute in the header to listen.";
			this.updateState({
				status: "idle",
				activeTrackId: null,
				activeKind: null,
				errorMessage: msg
			});
			onError?.(msg);
			return;
		}
		if (typeof window === "undefined" || !("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
			const msg = "Read Aloud voice synthesis is not supported on this browser.";
			this.updateState({
				status: "error",
				activeTrackId: id,
				activeKind: "speech",
				errorMessage: msg
			});
			onError?.(msg);
			return;
		}
		try {
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = lang;
			utterance.rate = rate;
			utterance.pitch = pitch;
			if (typeof window.speechSynthesis.getVoices === "function") {
				const voices = window.speechSynthesis.getVoices();
				if (voices && voices.length > 0) {
					const baseLang = lang.toLowerCase().split("-")[0];
					const matching = voices.filter((v) => v.lang?.toLowerCase().startsWith(baseLang));
					const ranked = matching.find((v) => /natural|neural|online|google|siri|enhanced|premium/i.test(v.name)) || matching.find((v) => !/espeak|robot/i.test(v.name)) || matching[0];
					if (ranked) utterance.voice = ranked;
				}
			}
			this.currentUtterance = utterance;
			this.updateState({
				status: "playing",
				activeTrackId: id,
				activeKind: "speech",
				errorMessage: null
			});
			utterance.onend = () => {
				if (this.currentUtterance !== utterance || this.sessionToken !== tokenAtStart) return;
				if (this.state.repeatEnabled && !this.state.isMuted) {
					this.speakText(options);
					return;
				}
				this.currentUtterance = null;
				this.updateState({
					status: "idle",
					activeTrackId: null,
					activeKind: null,
					errorMessage: null
				});
				onEnded?.();
			};
			utterance.onerror = () => {
				if (this.currentUtterance !== utterance || this.sessionToken !== tokenAtStart) return;
				this.currentUtterance = null;
				this.updateState({
					status: "idle",
					activeTrackId: null,
					activeKind: null
				});
			};
			window.speechSynthesis.speak(utterance);
		} catch {
			const msg = "Unable to start speech synthesis.";
			this.updateState({
				status: "error",
				activeTrackId: id,
				activeKind: "speech",
				errorMessage: msg
			});
			onError?.(msg);
		}
	}
	pause() {
		if (this.state.activeKind === "audio") {
			if (this.currentAudio) try {
				this.currentAudio.pause();
			} catch {}
			this.updateState({ status: "paused" });
			return;
		}
		if (this.state.activeKind === "speech" && typeof window !== "undefined" && "speechSynthesis" in window) try {
			window.speechSynthesis.pause();
			this.updateState({ status: "paused" });
		} catch {
			this.stopAll();
		}
	}
	resume() {
		if (this.state.isMuted) return;
		if (this.state.activeKind === "audio" && this.state.status === "paused") {
			if (this.currentAudio) {
				const audio = this.currentAudio;
				this.updateState({
					status: "playing",
					errorMessage: null
				});
				const p = audio.play();
				if (p && typeof p.catch === "function") p.catch(() => {
					this.updateState({ status: "paused" });
				});
			} else this.updateState({
				status: "playing",
				errorMessage: null
			});
			return;
		}
		if (this.state.activeKind === "speech" && this.state.status === "paused" && typeof window !== "undefined" && "speechSynthesis" in window) {
			try {
				window.speechSynthesis.resume();
				this.updateState({
					status: "playing",
					errorMessage: null
				});
			} catch {
				if (this.lastSpeakOptions) this.speakText(this.lastSpeakOptions);
			}
			return;
		}
		if (this.lastPlayOptions) this.playAudioUrl(this.lastPlayOptions);
		else if (this.lastSpeakOptions) this.speakText(this.lastSpeakOptions);
	}
};
var audioManager = new CentralizedAudioManager();
function useAudioManager() {
	const [state, setState] = (0, import_react.useState)(() => audioManager.getState());
	(0, import_react.useEffect)(() => {
		return audioManager.subscribe(setState);
	}, []);
	return {
		...state,
		playAudioUrl: (opts) => audioManager.playAudioUrl(opts),
		playQariRecitationAyah: (opts) => audioManager.playQariRecitationAyah(opts),
		playFullSurah: (opts) => audioManager.playFullSurah(opts),
		playAyahRange: (opts) => audioManager.playAyahRange(opts),
		nextAyah: () => audioManager.nextAyah(),
		previousAyah: () => audioManager.previousAyah(),
		speakText: (opts) => audioManager.speakText(opts),
		pause: () => audioManager.pause(),
		resume: () => audioManager.resume(),
		stopAll: () => audioManager.stopAll(),
		setMuted: (muted) => audioManager.setMuted(muted),
		setRepeatEnabled: (repeat) => audioManager.setRepeatEnabled(repeat),
		setRepeatOption: (opt) => audioManager.setRepeatOption(opt),
		setReciter: (reciter) => audioManager.setReciter(reciter),
		setPlaybackRate: (rate) => audioManager.setPlaybackRate(rate),
		seekTo: (timeSec) => audioManager.seekTo(timeSec)
	};
}
/**
* Isolated real-time playback clock hook (currentTimeSec, durationSec, ratio 0..1)
* driving smooth Word-by-Word live recitation highlighting without re-rendering unrelated UI.
*/
function useAudioPlaybackClock() {
	const [clock, setClock] = (0, import_react.useState)(() => audioManager.getPlaybackClock());
	(0, import_react.useEffect)(() => {
		return audioManager.subscribePlaybackClock(setClock);
	}, []);
	return clock;
}
// src/components/pwa/PWAComponents.tsx
var import_jsx_runtime = require_jsx_runtime();
function useOnlineStatus() {
	const [isOnline, setIsOnline] = (0, import_react.useState)(typeof navigator !== "undefined" ? navigator.onLine : true);
	(0, import_react.useEffect)(() => {
		const handleOnline = () => setIsOnline(true);
		const handleOffline = () => setIsOnline(false);
		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);
		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);
	return isOnline;
}
var OfflineIndicator = () => {
	if (useOnlineStatus()) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"aria-live": "polite",
		className: "fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-2xl bg-[#D97706] px-4 py-2 text-xs font-bold text-white shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "w-3.5 h-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Offline Mode — Saved Surahs and progress are ready" })]
	});
};
var SyncStatusBadge = ({ compact = false }) => {
	const isOnline = useOnlineStatus();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `inline-flex items-center gap-1.5 text-xs font-semibold ${compact ? "text-emerald-100/90" : "text-[var(--text-secondary)]"}`,
		title: "Your progress is saved privately on this device and works offline.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: "w-3.5 h-3.5 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: compact ? "Saved on device" : isOnline ? "Saved on this device · Works offline" : "Offline · Saved on this device" })]
	});
};
var PWAInstallPromptBanner = () => {
	const [deferredPrompt, setDeferredPrompt] = (0, import_react.useState)(null);
	const [dismissed, setDismissed] = (0, import_react.useState)(false);
	const [isStandalone, setIsStandalone] = (0, import_react.useState)(false);
	const [showInstructionsModal, setShowInstructionsModal] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
			setIsStandalone(standalone);
		} catch {}
		const handleBeforeInstallPrompt = (e) => {
			e.preventDefault();
			setDeferredPrompt(e);
		};
		const handleAppInstalled = () => {
			setIsStandalone(true);
			setDeferredPrompt(null);
		};
		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		window.addEventListener("appinstalled", handleAppInstalled);
		return () => {
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
			window.removeEventListener("appinstalled", handleAppInstalled);
		};
	}, []);
	if (isStandalone || dismissed) return null;
	const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	const handleInstallClick = async () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			await deferredPrompt.userChoice.catch(() => {});
			setDeferredPrompt(null);
		} else setShowInstructionsModal(true);
	};
	if (!deferredPrompt && !showInstructionsModal) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [deferredPrompt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-[#0F3826] text-white px-3.5 py-2 border-b border-amber-400/30 flex items-center justify-between gap-2 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: "w-3.5 h-3.5 text-amber-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold",
				children: "Install Ilmizo for faster offline access"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: handleInstallClick,
				className: "px-2.5 py-1 rounded-lg bg-amber-400 text-emerald-950 font-extrabold text-[11px]",
				children: "Install App"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setDismissed(true),
				className: "px-1.5 py-1 text-emerald-200 hover:text-white text-[11px]",
				children: "✕"
			})]
		})]
	}), showInstructionsModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-sm w-full rounded-3xl bg-[var(--bg-sheet)] border border-[var(--border-subtle)] p-5 space-y-3 text-[var(--text-primary)] shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-extrabold text-[#14532D] dark:text-emerald-300",
					children: "Install Ilmizo as an Offline App"
				}),
				isIOS ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-[var(--text-secondary)] leading-relaxed",
					children: [
						"On iPhone/iPad Safari, tap the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Share" }),
						" button in the bottom bar and select",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Add to Home Screen" }),
						"."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-[var(--text-secondary)] leading-relaxed",
					children: [
						"Open Ilmizo in a standalone browser tab and select ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Install App" }),
						" or",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Add to Home Screen" }),
						" from your browser menu."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setShowInstructionsModal(false),
					className: "w-full py-2.5 min-h-[44px] rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-extrabold text-xs",
					children: "Got It"
				})
			]
		})
	})] });
};
var MobileStatusBar = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "h-1.5 w-full select-none pointer-events-none",
	"aria-hidden": "true"
});
var MASCOT_CHEER_PHRASES = {
	Ayaan: [
		"Assalamu Alaikum!",
		"Bismillah! Let’s learn!",
		"MashaAllah, great job!",
		"SubhanAllah!"
	],
	Ayla: [
		"You’re doing amazing!",
		"Alhamdulillah!",
		"Let’s practice together!",
		"Allah loves kindness!"
	],
	Mizo: [
		"✨ Shine bright with Iman!",
		"🌟 +1 Sparkle of Ilm!",
		"MashaAllah, star learner!",
		"Keep glowing! ✨"
	],
	Aqib: [
		"Assalamu Alaikum",
		"BarakAllahu Feek",
		"Keep up your daily wird"
	]
};
var CharacterAvatar = ({ character, size = "md", className = "", interactive = true, mood = "idle" }) => {
	const prefersReducedMotion = useReducedMotion();
	const [cheerIndex, setCheerIndex] = (0, import_react.useState)(null);
	const [burstKey, setBurstKey] = (0, import_react.useState)(0);
	const dimensions = {
		sm: "w-10 h-10",
		md: "w-14 h-14",
		lg: "w-20 h-20",
		xl: "w-28 h-28"
	}[size];
	const idleAnimation = prefersReducedMotion ? {} : mood === "celebrating" ? {
		y: [
			0,
			-10,
			0
		],
		rotate: [
			0,
			-6,
			6,
			-4,
			4,
			0
		],
		scale: [
			1,
			1.08,
			1
		]
	} : mood === "listening" ? {
		scale: [
			1,
			1.06,
			1
		],
		rotate: [
			0,
			2,
			-2,
			0
		]
	} : character === "Ayaan" ? {
		y: [
			0,
			-4,
			0
		],
		rotate: [
			0,
			1.8,
			-1.8,
			0
		],
		scale: [
			1,
			1.02,
			1
		]
	} : character === "Ayla" ? {
		y: [
			0,
			-5,
			0
		],
		rotate: [
			0,
			-2.5,
			2.5,
			0
		],
		scale: [
			1,
			1.03,
			1
		]
	} : character === "Mizo" ? {
		y: [
			0,
			-7,
			0
		],
		rotate: [
			-4,
			4,
			-4
		],
		scale: [
			1,
			1.06,
			1
		]
	} : { y: [
		0,
		-2,
		0
	] };
	const idleTransition = {
		duration: mood === "celebrating" ? 1.2 : mood === "listening" ? 1.5 : character === "Mizo" ? 2.6 : character === "Ayla" ? 3.4 : 3.1,
		repeat: Infinity,
		ease: "easeInOut"
	};
	const handleTap = (e) => {
		if (!interactive) return;
		e.stopPropagation();
		const phrases = MASCOT_CHEER_PHRASES[character];
		const nextIdx = cheerIndex === null ? 0 : (cheerIndex + 1) % phrases.length;
		setCheerIndex(nextIdx);
		setBurstKey((prev) => prev + 1);
	};
	(0, import_react.useEffect)(() => {
		if (cheerIndex === null) return;
		const timer = setTimeout(() => setCheerIndex(null), 2200);
		return () => clearTimeout(timer);
	}, [cheerIndex, burstKey]);
	const gradientClass = character === "Ayaan" ? "from-amber-300 via-emerald-600 to-emerald-950 ring-amber-300/85" : character === "Ayla" ? "from-pink-200 via-rose-500 to-emerald-900 ring-pink-300/85" : character === "Mizo" ? "from-amber-200 via-amber-400 to-emerald-900 ring-amber-300" : "from-amber-200 to-emerald-900 ring-amber-300/80";
	const imgSrc = character === "Ayaan" ? "/assets/illustrations/avatar_ayaan_3d.webp" : character === "Ayla" ? "/assets/illustrations/avatar_ayla_3d.webp" : character === "Mizo" ? "/assets/illustrations/avatar_mizo_3d.webp" : "/assets/illustrations/avatar_aqib_3d.webp";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative inline-flex items-center justify-center shrink-0 select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: cheerIndex !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 8,
					scale: .75
				},
				animate: {
					opacity: 1,
					y: -6,
					scale: 1
				},
				exit: {
					opacity: 0,
					y: -14,
					scale: .85
				},
				transition: {
					type: "spring",
					stiffness: 420,
					damping: 22
				},
				className: "absolute -top-9 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-2xl bg-gradient-to-r from-[#0F3826] to-[#14532D] px-3 py-1 text-[11px] font-extrabold text-amber-300 shadow-lg border border-amber-300/50 pointer-events-none flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3 text-amber-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: MASCOT_CHEER_PHRASES[character][cheerIndex] })]
			}, `cheer-${burstKey}`) }),
			character === "Mizo" && !prefersReducedMotion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				animate: {
					scale: [
						1,
						1.18,
						1
					],
					opacity: [
						.35,
						.7,
						.35
					]
				},
				transition: {
					duration: 2.4,
					repeat: Infinity,
					ease: "easeInOut"
				},
				className: "absolute inset-0 rounded-full bg-amber-400/35 blur-md pointer-events-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				onClick: handleTap,
				animate: idleAnimation,
				transition: idleTransition,
				whileHover: interactive && !prefersReducedMotion ? {
					scale: 1.1,
					rotate: character === "Ayla" ? -5 : 5,
					transition: {
						type: "spring",
						stiffness: 400,
						damping: 16
					}
				} : void 0,
				whileTap: interactive && !prefersReducedMotion ? {
					scale: .88,
					rotate: character === "Mizo" ? 14 : -10,
					transition: {
						type: "spring",
						stiffness: 500,
						damping: 15
					}
				} : void 0,
				className: `${dimensions} ${className} relative rounded-full bg-gradient-to-b ${gradientClass} p-0.5 shadow-md overflow-hidden flex items-center justify-center ring-2 ${interactive ? "cursor-pointer" : ""}`,
				title: `${character} — Tap to interact!`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: imgSrc,
					alt: character,
					loading: "lazy",
					decoding: "async",
					className: "w-full h-full object-cover rounded-full"
				})
			}),
			character !== "Aqib" && size !== "sm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				animate: prefersReducedMotion ? {} : {
					scale: [
						1,
						1.25,
						1
					],
					rotate: [
						0,
						15,
						-15,
						0
					]
				},
				transition: {
					duration: 2.2,
					repeat: Infinity,
					ease: "easeInOut"
				},
				className: "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center text-[11px] font-black shadow-xs border border-white pointer-events-none",
				children: "★"
			})
		]
	});
};
var Kids3DMetallicBadge = ({ badgeId, title, earned, selected = false, onClick }) => {
	const prefersReducedMotion = useReducedMotion();
	const themeMap = {
		badge_quran: {
			outerRing: "from-amber-200 via-amber-400 to-amber-700",
			innerCore: "from-sky-400 via-blue-600 to-indigo-950",
			ribbon: "from-sky-500 to-blue-800",
			emblemSvg: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 48 48",
				className: "w-9 h-9 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M8 14c6-2 12-1 16 2 4-3 10-4 16-2v20c-6-2-12-1-16 2-4-3-10-4-16-2V14z",
						fill: "url(#goldGrad)",
						stroke: "#FEF3C7",
						strokeWidth: "1.8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M24 16v18",
						stroke: "#78350F",
						strokeWidth: "1.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "24",
						cy: "10",
						r: "3",
						fill: "#FDE68A"
					})
				]
			})
		},
		badge_dua: {
			outerRing: "from-amber-200 via-amber-400 to-amber-700",
			innerCore: "from-emerald-400 via-emerald-600 to-emerald-950",
			ribbon: "from-emerald-500 to-emerald-800",
			emblemSvg: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 48 48",
				className: "w-9 h-9 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M14 28c0-6 4-12 10-16 6 4 10 10 10 16a10 10 0 01-20 0z",
					fill: "url(#goldGrad)",
					stroke: "#FEF3C7",
					strokeWidth: "1.8"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "24",
					cy: "25",
					r: "4",
					fill: "#FFFBEB"
				})]
			})
		},
		badge_salah: {
			outerRing: "from-amber-200 via-amber-400 to-amber-700",
			innerCore: "from-amber-400 via-orange-600 to-amber-950",
			ribbon: "from-amber-500 to-orange-800",
			emblemSvg: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 48 48",
				className: "w-9 h-9 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M24 10c-6 5-9 10-9 16v10h18V26c0-6-3-11-9-16z",
						fill: "url(#goldGrad)",
						stroke: "#FEF3C7",
						strokeWidth: "1.8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M20 36v-7a4 4 0 018 0v7",
						fill: "#0F3826"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "24",
						cy: "7",
						r: "2",
						fill: "#FEF08A"
					})
				]
			})
		},
		badge_kind: {
			outerRing: "from-amber-200 via-amber-400 to-amber-700",
			innerCore: "from-rose-400 via-pink-600 to-rose-950",
			ribbon: "from-rose-500 to-pink-800",
			emblemSvg: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 48 48",
				className: "w-9 h-9 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M24 38s-13-8.2-13-17a7.5 7.5 0 0113-4.8A7.5 7.5 0 0137 21c0 8.8-13 17-13 17z",
					fill: "url(#roseGrad)",
					stroke: "#FFE4E6",
					strokeWidth: "1.8"
				})
			})
		},
		badge_5surahs: {
			outerRing: "from-amber-200 via-amber-400 to-amber-700",
			innerCore: "from-teal-400 via-emerald-700 to-emerald-950",
			ribbon: "from-teal-500 to-emerald-800",
			emblemSvg: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 48 48",
				className: "w-9 h-9 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "24,8 28.5,18 39.5,19.2 31.2,26.8 33.5,37.8 24,32.2 14.5,37.8 16.8,26.8 8.5,19.2 19.5,18",
					fill: "url(#goldGrad)",
					stroke: "#FEF3C7",
					strokeWidth: "1.8"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "24",
					y: "27",
					textAnchor: "middle",
					fill: "#0F3826",
					fontSize: "11",
					fontWeight: "900",
					children: "5"
				})]
			})
		},
		badge_30day: {
			outerRing: "from-amber-200 via-amber-400 to-amber-700",
			innerCore: "from-indigo-400 via-purple-700 to-indigo-950",
			ribbon: "from-indigo-500 to-purple-800",
			emblemSvg: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 48 48",
				className: "w-9 h-9 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M14 14h20v8c0 6-4.5 11-10 11s-10-5-10-11v-8z",
						fill: "url(#goldGrad)",
						stroke: "#FEF3C7",
						strokeWidth: "1.8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M19 33h10v5H19z",
						fill: "#FDE68A"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "24",
						y: "24",
						textAnchor: "middle",
						fill: "#0F3826",
						fontSize: "9.5",
						fontWeight: "900",
						children: "30d"
					})
				]
			})
		}
	};
	const theme = themeMap[badgeId] || themeMap.badge_quran;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
		type: "button",
		onClick,
		animate: earned && !prefersReducedMotion ? { y: [
			0,
			-4,
			0
		] } : {},
		transition: {
			duration: 3,
			repeat: Infinity,
			ease: "easeInOut"
		},
		whileHover: {
			scale: 1.06,
			rotate: 2
		},
		whileTap: { scale: .94 },
		className: `group relative flex flex-col items-center text-center p-2.5 rounded-3xl transition ${selected ? "bg-emerald-950/10 dark:bg-emerald-500/20 ring-2 ring-[#14532D] dark:ring-emerald-400" : "hover:bg-amber-50/60 dark:hover:bg-white/5"} ${earned ? "" : "opacity-50 grayscale-[45%]"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				width: "0",
				height: "0",
				className: "absolute",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "goldGrad",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#FEF08A"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "50%",
							stopColor: "#F59E0B"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#B45309"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "roseGrad",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#FECDD3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "50%",
							stopColor: "#F43F5E"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#9F1239"
						})
					]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-20 h-20 flex items-center justify-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute -bottom-1 w-12 h-5 bg-gradient-to-b ${theme.ribbon} rounded-b-lg shadow-md border-x border-b border-amber-300/60` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `relative w-[72px] h-[72px] rounded-[24px] rotate-45 bg-gradient-to-br ${theme.outerRing} p-[5px] shadow-[0_10px_20px_rgba(15,56,38,0.28),inset_0_2px_4px_rgba(255,255,255,0.85)] border border-amber-100`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `w-full h-full rounded-[19px] bg-gradient-to-br ${theme.innerCore} flex items-center justify-center shadow-[inset_0_4px_8px_rgba(0,0,0,0.45)] border border-amber-200/60`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "-rotate-45 flex items-center justify-center",
								children: theme.emblemSvg
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-2 left-4 w-5 h-2 rounded-full bg-white/60 rotate-[-25deg] blur-[0.5px] pointer-events-none" }),
					earned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-emerald-950 text-[11px] font-black flex items-center justify-center shadow-sm border border-white",
						children: "✓"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-extrabold text-[var(--text-primary)] mt-2 leading-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-[11px] font-bold mt-0.5 ${earned ? "text-emerald-700 dark:text-emerald-300" : "text-[var(--text-muted)]"}`,
				children: earned ? "Unlocked" : "Locked"
			})
		]
	});
};
var VerifiedSourceFooter = ({ source, reference, reviewer = "Ilmizo Sharia & Text Verification Registry" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "mt-3 pt-2.5 border-t border-[var(--divider)] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-secondary)]",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			"Verified · ",
			source,
			" · ",
			reference
		] })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-[var(--text-muted)]",
		children: reviewer
	})]
});
/**
* Global 44x44px touch-target Back Button for all secondary screens across Adult Mode,
* Kids World, and Parent Hub. Stops any active audio immediately and pops the navigation history stack.
*/
var ScreenBackButton = ({ onClick, variant = "dark", label = "Go Back", className = "" }) => {
	const { mode, goBack } = useIlmizo();
	const handlePress = () => {
		const audioState = audioManager.getState();
		if (!(mode === "adult" && Boolean(audioState.quranSequence.mode))) audioManager.stopAll();
		if (onClick) onClick();
		else goBack();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: handlePress,
		"aria-label": label,
		title: label,
		className: `min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center transition active:scale-95 shrink-0 ${variant === "light" ? "bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[#0F3826] dark:text-emerald-200 border border-[var(--border-subtle)] shadow-2xs" : variant === "kids" ? "bg-white/20 hover:bg-white/30 text-white border border-white/25 backdrop-blur-xs shadow-2xs" : "bg-black/30 hover:bg-black/45 text-white border border-white/20 backdrop-blur-xs shadow-2xs"} ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
	});
};
// src/services/hapticsService.ts
var HAPTICS_PREF_KEY = "ilmizo_haptics_enabled_v1";
function isHapticsEnabled() {
	if (typeof localStorage === "undefined") return true;
	try {
		const raw = localStorage.getItem(HAPTICS_PREF_KEY);
		if (raw === null) return true;
		return raw === "true";
	} catch {
		return true;
	}
}
function setHapticsEnabled(enabled) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(HAPTICS_PREF_KEY, enabled ? "true" : "false");
	} catch {}
}
function canRunNativeHaptics() {
	if (!isHapticsEnabled()) return false;
	if (typeof window === "undefined") return false;
	try {
		return typeof Capacitor?.isNativePlatform === "function" && Capacitor.isNativePlatform();
	} catch {
		return false;
	}
}
async function triggerSelectionHaptic() {
	if (!canRunNativeHaptics()) return;
	try {
		await Haptics.selectionChanged();
	} catch {}
}
async function triggerLightHaptic() {
	if (!canRunNativeHaptics()) return;
	try {
		await Haptics.impact({ style: ImpactStyle.Light });
	} catch {}
}
/**
* Subtle tactile pulse when Quran recitation transitions to the next Ayah
* (used across both Adult and Kids Quran views via useQuranAudioSync).
*/
async function triggerVerseTransitionHaptic() {
	if (!canRunNativeHaptics()) return;
	try {
		await Haptics.selectionChanged();
	} catch {
		try {
			await Haptics.impact({ style: ImpactStyle.Light });
		} catch {}
	}
}
async function triggerSuccessHaptic() {
	if (!canRunNativeHaptics()) return;
	try {
		await Haptics.notification({ type: NotificationType.Success });
	} catch {}
}
// src/components/sheets/BottomSheet.tsx
/**
* Reusable Native-Style Bottom Sheet (Mobile) & Calm Centered Dialog (Desktop md+).
* Supports spring open/close, drag-to-dismiss on mobile, Escape key, reduced-motion,
* safe-area padding, and full Light/Dark semantic theme tokens.
*/
var BottomSheet = ({ open, onClose, title, subtitle, children, footer, preventBackdropDismiss = false, maxHeightClassName = "max-h-[85vh]" }) => {
	const prefersReducedMotion = useReducedMotion();
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && !preventBackdropDismiss) onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		open,
		onClose,
		preventBackdropDismiss
	]);
	const handleDragEnd = (_event, info) => {
		if (preventBackdropDismiss) return;
		if (info.offset.y > 90 || info.velocity.y > 450) {
			triggerSelectionHaptic();
			onClose();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": title,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: { duration: prefersReducedMotion ? .01 : .18 },
			onClick: () => {
				if (!preventBackdropDismiss) onClose();
			},
			className: "fixed inset-0 bg-black/55 backdrop-blur-[2px]",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: prefersReducedMotion ? { opacity: 0 } : {
				opacity: 0,
				y: 44,
				scale: .98
			},
			animate: prefersReducedMotion ? { opacity: 1 } : {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: prefersReducedMotion ? { opacity: 0 } : {
				opacity: 0,
				y: 40,
				scale: .98
			},
			transition: prefersReducedMotion ? { duration: .01 } : {
				type: "spring",
				stiffness: 390,
				damping: 34,
				mass: .85
			},
			drag: preventBackdropDismiss || prefersReducedMotion ? false : "y",
			dragConstraints: {
				top: 0,
				bottom: 0
			},
			dragElastic: {
				top: .04,
				bottom: .35
			},
			onDragEnd: handleDragEnd,
			className: `relative z-10 w-full md:max-w-lg rounded-t-[28px] md:rounded-3xl bg-[var(--bg-sheet)] text-[var(--text-primary)] border-t md:border border-[var(--border-subtle)] shadow-2xl flex flex-col overflow-hidden pb-safe ${maxHeightClassName}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:hidden pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-1.5 rounded-full bg-slate-300 dark:bg-emerald-200/25" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 px-5 pt-3 md:pt-5 pb-3 border-b border-[var(--divider)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base sm:text-lg font-extrabold text-[var(--text-primary)] leading-snug",
							children: title
						}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed",
							children: subtitle
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Close",
						className: "min-w-[40px] min-h-[40px] rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center shrink-0 transition active:scale-95",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 py-4 overflow-y-auto flex-1 space-y-3",
					children
				}),
				footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 py-3.5 border-t border-[var(--divider)] bg-[var(--bg-sheet)]",
					children: footer
				})
			]
		})]
	}) });
};
// src/components/sheets/SelectSheet.tsx
/**
* Mobile-native BottomSheet picker built on top of the shared BottomSheet primitive.
* Replaces native browser HTML <select> controls across Ilmizo with accessible,
* touch-friendly, searchable, Light/Dark-themed selection sheets.
*/
var SelectSheetField = ({ value, options, onChange, title, subtitle, ariaLabel, placeholder = "Select an option", searchable, searchPlaceholder = "Search options…", leftIcon, variant = "default", className = "", disabled = false }) => {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const selectedOption = (0, import_react.useMemo)(() => options.find((opt) => opt.value === value) || null, [options, value]);
	const showSearch = searchable ?? options.length >= 8;
	const filteredOptions = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return options;
		return options.filter((opt) => opt.label.toLowerCase().includes(q) || opt.subtitle && opt.subtitle.toLowerCase().includes(q) || opt.value.toLowerCase().includes(q));
	}, [options, query]);
	const handleOpen = () => {
		if (disabled) return;
		triggerSelectionHaptic();
		setQuery("");
		setOpen(true);
	};
	const handleSelect = (nextVal) => {
		triggerSelectionHaptic();
		onChange(nextVal);
		setOpen(false);
		setQuery("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled,
		onClick: handleOpen,
		"aria-label": ariaLabel || title,
		"aria-haspopup": "listbox",
		"aria-expanded": open,
		className: `transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${variant === "dark-pill" ? "min-h-[40px] px-3 py-1.5 rounded-full bg-[#071F15]/85 backdrop-blur-md border border-[#D4AF37]/45 text-amber-100 hover:bg-white/15 text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0" : variant === "compact" ? "min-h-[42px] px-3 py-2 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--border-strong)] text-xs font-bold inline-flex items-center justify-between gap-2" : variant === "inline" ? "min-h-[40px] px-3 py-1.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--border-strong)] text-xs font-bold inline-flex items-center justify-between gap-2" : "w-full min-h-[46px] px-3.5 py-2.5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--border-strong)] text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 text-left"} ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2 min-w-0",
			children: [leftIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0",
				children: leftIcon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: selectedOption ? selectedOption.label : placeholder
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4 shrink-0 opacity-70" })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BottomSheet, {
		open,
		onClose: () => {
			setOpen(false);
			setQuery("");
		},
		title,
		subtitle,
		children: [showSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: searchPlaceholder,
				"aria-label": searchPlaceholder,
				className: "w-full min-h-[44px] pl-10 pr-3.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#14532D] dark:focus:border-amber-400"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "listbox",
			"aria-label": title,
			className: "space-y-1.5",
			children: filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-xs text-[var(--text-secondary)]",
				children: "No matching options found."
			}) : filteredOptions.map((opt) => {
				const isSelected = opt.value === value;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "option",
					"aria-selected": isSelected,
					disabled: opt.disabled,
					onClick: () => handleSelect(opt.value),
					className: `w-full min-h-[48px] px-4 py-2.5 rounded-2xl border text-left transition flex items-center justify-between gap-3 active:scale-[0.99] disabled:opacity-45 ${isSelected ? "bg-[#14532D]/10 dark:bg-emerald-500/20 border-[#14532D] dark:border-amber-400/70 text-[var(--text-primary)]" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)]"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-sm truncate ${isSelected ? "font-extrabold text-[#14532D] dark:text-amber-300" : "font-semibold text-[var(--text-primary)]"}`,
								children: opt.label
							}), opt.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] font-bold text-[var(--text-muted)] shrink-0",
								children: ["· ", opt.badge]
							})]
						}), opt.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-secondary)] mt-0.5 leading-snug",
							children: opt.subtitle
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition ${isSelected ? "bg-[#14532D] dark:bg-amber-400 text-white dark:text-emerald-950" : "border border-[var(--border-strong)]"}`,
						children: isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 stroke-[2.5]" })
					})]
				}, opt.value);
			})
		})]
	})] });
};
// src/components/adult/AdultDesignSystem.tsx
/**
* Helper to format Hifz Revision references cleanly without duplicate "Ayahs Ayah" text.
* Example output: "Ayat al-Kursi · Al-Baqarah 2:255" or "Al-Mulk · Ayahs 1-10"
*/
function formatRevisionReference(rev) {
	if (!rev) return "Schedule a Surah revision";
	const raw = rev.ayahRange.trim();
	if (rev.surahNumber === 2 && raw.includes("255")) return "Ayat al-Kursi · Al-Baqarah 2:255";
	if (/^ayahs?\s+/i.test(raw)) {
		const cleaned = raw.replace(/^ayahs?\s+/i, "");
		return `${rev.surahName} ${rev.surahNumber}:${cleaned}`;
	}
	return `${rev.surahName} · Ayahs ${raw}`;
}
/**
* Unified Premium 3D-Style Emerald & Champagne-Gold Islamic Icon Set
*/
var Islamic3DIcon = ({ variant, size = "md" }) => {
	const dim = size === "lg" ? "w-12 h-12" : size === "sm" ? "w-8 h-8" : "w-10 h-10";
	switch (variant) {
		case "quran_rehal": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: dim,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "rehalWood",
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#B45309"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#78350F"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "quranPage",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#FFFBEB"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#FDE68A"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "emeraldCover",
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#15803D"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#0F3826"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "32",
					r: "24",
					fill: "#FEF3C7",
					opacity: "0.55"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M14 48 L32 35 L50 48 L46 53 L32 42 L18 53 Z",
					fill: "url(#rehalWood)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M19 37 L45 53 M45 37 L19 53",
					stroke: "#78350F",
					strokeWidth: "3.2",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M9 23 L32 30 L55 23 L51 39 L32 45 L13 39 Z",
					fill: "url(#emeraldCover)",
					stroke: "#D97706",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M11 20 Q21 18 32 26 Q43 18 53 20 L50 36 Q41 34 32 41 Q23 34 14 36 Z",
					fill: "url(#quranPage)",
					stroke: "#D97706",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "32",
					y1: "25",
					x2: "32",
					y2: "41",
					stroke: "#B45309",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "22",
					cy: "28",
					r: "2.8",
					fill: "#D97706",
					opacity: "0.75"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "42",
					cy: "28",
					r: "2.8",
					fill: "#D97706",
					opacity: "0.75"
				})
			]
		});
		case "hifz_mushaf": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: dim,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "mushafEmerald",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#15803D"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#0F3826"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "mushafGold",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#FEF08A"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#D97706"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "32",
					r: "24",
					fill: "#FEF3C7",
					opacity: "0.55"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M12 35 L32 46 L52 35 L52 41 L32 52 L12 41 Z",
					fill: "#FFFBEB",
					stroke: "#D97706",
					strokeWidth: "1.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M12 25 L32 14 L52 25 L32 36 Z",
					fill: "url(#mushafEmerald)",
					stroke: "#F59E0B",
					strokeWidth: "1.6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M17 25 L32 17 L47 25 L32 33 Z",
					fill: "none",
					stroke: "#FDE68A",
					strokeWidth: "1",
					opacity: "0.85"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "25",
					r: "4.5",
					fill: "url(#mushafGold)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M32 46 L32 54 L29 52",
					fill: "none",
					stroke: "#D97706",
					strokeWidth: "2",
					strokeLinecap: "round"
				})
			]
		});
		case "hifz_medal": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: dim,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "hifzGold",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#FEF08A"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "50%",
							stopColor: "#F59E0B"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#B45309"
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "10",
					y: "10",
					width: "44",
					height: "44",
					rx: "14",
					fill: "#0F3826",
					stroke: "#D4AF37",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M25 38 L21 50 L27 47 L30 51 L32 39",
					fill: "#D97706"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M39 38 L43 50 L37 47 L34 51 L32 39",
					fill: "#B45309"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "26",
					r: "12",
					fill: "url(#hifzGold)",
					stroke: "#FFFBEB",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "26",
					r: "8",
					fill: "none",
					stroke: "#78350F",
					strokeWidth: "1.2",
					strokeDasharray: "2 2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M32 20 L33.8 24 L38 24.4 L34.8 27.2 L35.8 31.4 L32 29.1 L28.2 31.4 L29.2 27.2 L26 24.4 L30.2 24 Z",
					fill: "#78350F"
				})
			]
		});
		case "kaaba": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: dim,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "32",
					r: "24",
					fill: "#FEF3C7",
					opacity: "0.55"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "32",
					cy: "50",
					rx: "20",
					ry: "5",
					fill: "#E2E8F0",
					stroke: "#CBD5E1",
					strokeWidth: "1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M15 21 L32 28 L32 49 L15 42 Z",
					fill: "#1E293B"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M32 28 L49 21 L49 42 L32 49 Z",
					fill: "#0F172A"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M15 21 L32 15 L49 21 L32 28 Z",
					fill: "#334155"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M15 27 L32 34 L49 27 L49 31 L32 38 L15 31 Z",
					fill: "#F59E0B"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "36",
					y: "34",
					width: "4.5",
					height: "8.5",
					rx: "1",
					fill: "#FDE68A",
					stroke: "#D97706",
					strokeWidth: "0.8",
					transform: "skewY(-18)"
				})
			]
		});
		case "mosque_dome": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: dim,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "domeEmerald",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#15803D"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#0F3826"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "wallCream",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#FFFBEB"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#FDE68A"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "32",
					r: "24",
					fill: "#FEF3C7",
					opacity: "0.55"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "45",
					y: "18",
					width: "6",
					height: "32",
					rx: "2",
					fill: "url(#wallCream)",
					stroke: "#D97706",
					strokeWidth: "1.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M44 18 L48 11 L52 18 Z",
					fill: "url(#domeEmerald)",
					stroke: "#D97706",
					strokeWidth: "1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M13 35 C13 20 41 20 41 35 Z",
					fill: "url(#domeEmerald)",
					stroke: "#D97706",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M27 15 L27 20",
					stroke: "#D97706",
					strokeWidth: "1.8",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "27",
					cy: "14",
					r: "2.2",
					fill: "#F59E0B"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "11",
					y: "35",
					width: "32",
					height: "15",
					rx: "2.5",
					fill: "url(#wallCream)",
					stroke: "#D97706",
					strokeWidth: "1.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M22 50 L22 41 C22 37 32 37 32 41 L32 50 Z",
					fill: "#0F3826",
					stroke: "#D97706",
					strokeWidth: "1"
				})
			]
		});
		case "dua_hands": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: dim,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "skinWarm",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#FDE68A"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#F59E0B"
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "32",
					r: "24",
					fill: "#FEF3C7",
					opacity: "0.55"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M15 36 C13 26 18 17 23 17 C26 17 29 22 30 30 L30 45 C22 45 17 41 15 36 Z",
					fill: "url(#skinWarm)",
					stroke: "#B45309",
					strokeWidth: "1.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M49 36 C51 26 46 17 41 17 C38 17 35 22 34 30 L34 45 C42 45 47 41 49 36 Z",
					fill: "url(#skinWarm)",
					stroke: "#B45309",
					strokeWidth: "1.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M21 21 L23 32 M25 19 L26 32 M43 21 L41 32 M39 19 L38 32",
					stroke: "#92400E",
					strokeWidth: "1.1",
					opacity: "0.55",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "18",
					y: "44",
					width: "11",
					height: "6.5",
					rx: "2",
					fill: "#0F3826",
					stroke: "#D97706",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "35",
					y: "44",
					width: "11",
					height: "6.5",
					rx: "2",
					fill: "#0F3826",
					stroke: "#D97706",
					strokeWidth: "1.2"
				})
			]
		});
		case "allah_calligraphy": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `${dim} rounded-xl bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A] border border-amber-300/80 flex items-center justify-center shadow-2xs`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-arabic text-xl font-bold text-[#0F3826] leading-none select-none",
				children: "ٱللَّٰه"
			})
		});
		case "seerah_mosque": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: dim,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M14 38 C14 21 40 21 40 38 Z",
					fill: "#15803D",
					stroke: "#0F3826",
					strokeWidth: "1.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M27 17 L27 23",
					stroke: "#D97706",
					strokeWidth: "2",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "44",
					y: "14",
					width: "6",
					height: "36",
					rx: "1.5",
					fill: "#FFFBEB",
					stroke: "#D97706",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M44 14 L47 8 L50 14 Z",
					fill: "#D97706"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "11",
					y: "38",
					width: "32",
					height: "12",
					rx: "2",
					fill: "#FEF3C7",
					stroke: "#D97706",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M23 50 L23 42 C23 39 31 39 31 42 L31 50 Z",
					fill: "#0F3826"
				})
			]
		});
		case "lessons_books": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: dim,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "12",
					y: "38",
					width: "40",
					height: "10",
					rx: "3",
					fill: "#0F3826",
					stroke: "#D4AF37",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "15",
					y: "40",
					width: "34",
					height: "6",
					rx: "1.5",
					fill: "#FFFBEB"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "14",
					y: "27",
					width: "36",
					height: "10",
					rx: "3",
					fill: "#B45309",
					stroke: "#FDE68A",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "17",
					y: "29",
					width: "30",
					height: "6",
					rx: "1.5",
					fill: "#FEF3C7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "16",
					y: "16",
					width: "32",
					height: "10",
					rx: "3",
					fill: "#15803D",
					stroke: "#FDE68A",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "19",
					y: "18",
					width: "26",
					height: "6",
					rx: "1.5",
					fill: "#FFFBEB"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M36 22 L36 32 L33 29 L30 32 L30 22 Z",
					fill: "#D97706"
				})
			]
		});
		case "quizzes_trophy": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: dim,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M18 20 H12 C12 30 16 34 22 34",
					fill: "none",
					stroke: "#D97706",
					strokeWidth: "3",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M46 20 H52 C52 30 48 34 42 34",
					fill: "none",
					stroke: "#D97706",
					strokeWidth: "3",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M18 14 H46 V28 C46 37 39 42 32 42 C25 42 18 37 18 28 Z",
					fill: "#F59E0B",
					stroke: "#B45309",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "29",
					y: "42",
					width: "6",
					height: "7",
					fill: "#D97706"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "21",
					y: "49",
					width: "22",
					height: "6",
					rx: "2",
					fill: "#0F3826",
					stroke: "#F59E0B",
					strokeWidth: "1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "26",
					r: "6",
					fill: "#FFFBEB"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "32",
					y: "30",
					textAnchor: "middle",
					fontSize: "10",
					fontWeight: "bold",
					fill: "#0F3826",
					children: "?"
				})
			]
		});
		case "qibla_compass": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: dim,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "32",
					r: "21",
					fill: "#0F3826",
					stroke: "#F59E0B",
					strokeWidth: "3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "32",
					r: "17",
					fill: "none",
					stroke: "#FDE68A",
					strokeWidth: "1",
					strokeDasharray: "3 3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "32,14 37,32 32,29 27,32",
					fill: "#F59E0B"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "32,50 37,32 32,35 27,32",
					fill: "#94A3B8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "32",
					r: "3",
					fill: "#FFFBEB"
				})
			]
		});
		case "tasbih_beads": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: dim,
			"aria-hidden": "true",
			children: [
				[
					[24, 16],
					[32, 14],
					[40, 16],
					[46, 22],
					[48, 30],
					[45, 38],
					[38, 43],
					[26, 43],
					[19, 38],
					[16, 30],
					[18, 22]
				].map(([cx, cy], idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx,
					cy,
					r: "4.2",
					fill: idx % 3 === 0 ? "#15803D" : "#0F3826",
					stroke: "#FDE68A",
					strokeWidth: "0.8"
				}, idx)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "30",
					y: "44",
					width: "4",
					height: "6",
					rx: "1.5",
					fill: "#D97706"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M32 50 L28 57 H36 Z",
					fill: "#F59E0B"
				})
			]
		});
		case "hijri_calendar": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: dim,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "12",
					y: "16",
					width: "40",
					height: "36",
					rx: "6",
					fill: "#FFFBEB",
					stroke: "#D97706",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M12 22 C12 18 15 16 18 16 H46 C49 16 52 18 52 22 V26 H12 Z",
					fill: "#0F3826"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "21",
					y: "12",
					width: "3",
					height: "7",
					rx: "1.5",
					fill: "#D97706"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "40",
					y: "12",
					width: "3",
					height: "7",
					rx: "1.5",
					fill: "#D97706"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M35 32 A7 7 0 1 0 35 45 A5.5 5.5 0 1 1 35 32 Z",
					fill: "#F59E0B"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "38",
					cy: "36",
					r: "1.5",
					fill: "#D97706"
				})
			]
		});
	}
};
/**
* Reusable Ilmizo Brand Emblem & Title matching the Reference Header
*/
var IlmizoBrandLogo = ({ compact = false }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `${compact ? "w-9 h-9" : "w-11 h-11"} rounded-full bg-gradient-to-b from-[#174932] to-[#0A261A] border-2 border-[#EAB308] shadow-[0_0_15px_rgba(234,179,8,0.32)] flex items-center justify-center shrink-0 relative`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 40 40",
				className: compact ? "w-5 h-5" : "w-6 h-6",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M7 13 Q13.5 11 20 16 Q26.5 11 33 13 V27 Q26.5 25 20 30 Q13.5 25 7 27 Z",
						fill: "none",
						stroke: "#FDE68A",
						strokeWidth: "2.2",
						strokeLinejoin: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "20",
						y1: "16",
						x2: "20",
						y2: "30",
						stroke: "#FDE68A",
						strokeWidth: "2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M12 10 L20 6 L28 10",
						fill: "none",
						stroke: "#F59E0B",
						strokeWidth: "1.4",
						opacity: "0.8"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `${compact ? "text-xl" : "text-[26px]"} font-serif font-extrabold tracking-tight bg-gradient-to-r from-[#FFFBEB] via-[#FDE68A] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-xs block`,
				children: "Ilmizo"
			}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10.5px] font-medium text-emerald-50/95 tracking-wide block drop-shadow-xs",
				children: "A Complete Islamic Learning Journey"
			})]
		})]
	});
};
/**
* Local Calendar Date Key & Real Daily Verse Activity Helpers
*/
function getLocalDateKey(now = /* @__PURE__ */ new Date()) {
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function recordDailyVerseRead(current, surahNumber, ayahNumber, todayKey = getLocalDateKey()) {
	const verseKey = `${surahNumber}:${ayahNumber}`;
	if (!current || current.dateKey !== todayKey || !Array.isArray(current.ayahKeys)) return {
		dateKey: todayKey,
		ayahKeys: [verseKey]
	};
	if (current.ayahKeys.includes(verseKey)) return current;
	return {
		dateKey: todayKey,
		ayahKeys: [...current.ayahKeys, verseKey]
	};
}
function computeDailyFocusProgress(activity, dailyGoalInput = 5, todayKey = getLocalDateKey()) {
	const dailyGoal = Math.max(1, dailyGoalInput || 5);
	const rawTodayVerses = activity && activity.dateKey === todayKey && Array.isArray(activity.ayahKeys) ? activity.ayahKeys.length : 0;
	const dailyCompleted = Math.min(dailyGoal, Math.max(0, rawTodayVerses));
	return {
		dailyGoal,
		rawTodayVerses,
		dailyCompleted,
		focusProgressPct: Math.min(100, Math.round(dailyCompleted / dailyGoal * 100)),
		isDailyGoalMet: rawTodayVerses >= dailyGoal
	};
}
function parse12HrToMinutes(timeStr) {
	const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
	if (!match) return null;
	let hours = Number(match[1]);
	const minutes = Number(match[2]);
	const period = match[3].toUpperCase();
	if (period === "PM" && hours !== 12) hours += 12;
	if (period === "AM" && hours === 12) hours = 0;
	return hours * 60 + minutes;
}
function computeNextPrayerState(timings, now, activeSalahPrayers) {
	const order = [
		"Fajr",
		"Dhuhr",
		"Asr",
		"Maghrib",
		"Isha"
	];
	const nowMinutes = now.getHours() * 60 + now.getMinutes();
	let foundNext = null;
	let minutesUntilNext = 0;
	let isRolloverToTomorrow = false;
	const parsedMap = {
		Fajr: parse12HrToMinutes(timings.Fajr) ?? 292,
		Dhuhr: parse12HrToMinutes(timings.Dhuhr) ?? 728,
		Asr: parse12HrToMinutes(timings.Asr) ?? 935,
		Maghrib: parse12HrToMinutes(timings.Maghrib) ?? 1072,
		Isha: parse12HrToMinutes(timings.Isha) ?? 1148
	};
	const isPrayerCompleted = (p) => {
		const status = activeSalahPrayers?.[p];
		return status === "prayed_on_time" || status === "prayed";
	};
	for (const p of order) {
		const pMin = parsedMap[p];
		if (pMin > nowMinutes && !isPrayerCompleted(p)) {
			foundNext = p;
			minutesUntilNext = pMin - nowMinutes;
			break;
		}
	}
	if (!foundNext) {
		foundNext = "Fajr";
		isRolloverToTomorrow = true;
		minutesUntilNext = nowMinutes >= parsedMap.Fajr ? 1440 - nowMinutes + parsedMap.Fajr : parsedMap.Fajr - nowMinutes;
	}
	const hrs = Math.floor(minutesUntilNext / 60);
	const mins = minutesUntilNext % 60;
	const countdownLabel = hrs > 0 ? `${hrs}h ${mins}m left` : `${Math.max(1, mins)}m left`;
	const timeline = order.map((name) => {
		const pMin = parsedMap[name];
		let state = "upcoming";
		if (!isRolloverToTomorrow && name === foundNext) state = "next";
		else if (isRolloverToTomorrow && name === "Fajr" && !isPrayerCompleted("Fajr")) state = "next";
		else if (pMin <= nowMinutes || isPrayerCompleted(name)) state = "passed";
		return {
			name,
			time: timings[name],
			state
		};
	});
	return {
		nextPrayer: foundNext,
		nextTimeLabel: timings[foundNext],
		countdownLabel,
		isRolloverToTomorrow,
		timeline
	};
}
/**
* 1 & 2. Premium Adult Home Hero Section + Balanced Branding + Today's Focus Card
*/
var AdultHomeHeroSection = ({ user, mode, onSelectMode, language, supportedLanguages, onSelectLanguage, activeHifzPlan, dailyVerseActivity, onStartLearning, onOpenProfile, onOpenStreak, onOpenNotifications, t }) => {
	const targetGoal = activeHifzPlan?.dailyTargetAyahs ?? 5;
	const totalMemorizedInSurah = activeHifzPlan?.memorizedAyahs ?? 12;
	const totalSurahAyahs = activeHifzPlan?.totalAyahs ?? 286;
	const { dailyGoal, dailyCompleted, focusProgressPct, isDailyGoalMet } = computeDailyFocusProgress(dailyVerseActivity, targetGoal, getLocalDateKey());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-b-[30px] bg-[#0B2B1D] text-white shadow-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/assets/illustrations/adult_home_hero.webp",
				alt: "Golden Mosque Courtyard at Sunrise",
				decoding: "async",
				className: "absolute inset-0 w-full h-[380px] object-cover object-center brightness-105 contrast-105"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: { background: "linear-gradient(180deg, rgba(6,25,17,0.72) 0%, rgba(9,36,24,0.20) 34%, rgba(8,33,22,0.56) 68%, #0B2B1D 93%), linear-gradient(90deg, rgba(6,25,17,0.62) 0%, rgba(6,25,17,0.18) 58%, rgba(6,25,17,0.05) 100%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
						time: "9:41",
						light: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3.5 pt-1 flex items-center justify-between gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center bg-[#071F15]/85 backdrop-blur-md p-0.5 rounded-full border border-[#D4AF37]/45 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onSelectMode("adult"),
								className: `px-2.5 py-1 rounded-full text-[11px] font-extrabold transition flex items-center gap-1 ${mode === "adult" ? "bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] text-emerald-950 shadow-2xs" : "text-emerald-100 hover:text-white"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Adult Mode" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onSelectMode("kids"),
								className: "pl-2 pr-1.5 py-0.5 rounded-full text-[11px] font-extrabold text-emerald-50 hover:bg-white/10 transition flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3 text-amber-300" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kids World" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/assets/illustrations/kids_hero_duo.webp",
										alt: "Ayaan and Ayla",
										loading: "lazy",
										decoding: "async",
										className: "w-5 h-5 rounded-full object-cover border border-amber-300/70"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
									value: language,
									onChange: (val) => onSelectLanguage(val),
									title: "Choose Language",
									subtitle: "Update menus and translations across Ilmizo",
									ariaLabel: "Select Language",
									variant: "dark-pill",
									leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3.5 h-3.5 text-amber-300" }),
									className: "min-h-[40px] max-w-[110px]",
									options: supportedLanguages.map((lang) => ({
										value: lang.code,
										label: lang.label
									}))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: onOpenNotifications,
									title: "Prayer & Hifz Reminders",
									"aria-label": "Notifications",
									className: "min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-[#071F15]/85 backdrop-blur-md border border-[#D4AF37]/45 flex items-center justify-center text-amber-200 hover:bg-white/15 transition active:scale-95",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-4 h-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onSelectMode("parent"),
									title: "Parent Hub",
									"aria-label": "Open Parent Hub",
									className: "min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-[#071F15]/85 backdrop-blur-md border border-[#D4AF37]/45 flex items-center justify-center text-amber-200 hover:bg-white/15 transition active:scale-95",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4" })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pt-2.5 flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IlmizoBrandLogo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onOpenProfile,
							"aria-label": "Open Aqib Profile",
							title: "Open My Profile",
							className: "rounded-full ring-2 ring-[#EAB308] shadow-[0_0_14px_rgba(234,179,8,0.4)] hover:scale-105 transition shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
								character: "Aqib",
								size: "md"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 pt-3 pb-3.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[245px] space-y-0.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-extrabold text-[#FDE68A] flex items-center gap-1.5 drop-shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										viewBox: "0 0 20 20",
										className: "w-4 h-4 text-[#F59E0B] fill-current shrink-0",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14.5 12.5A6.5 6.5 0 0 1 7.5 2.5a6.5 6.5 0 1 0 7 10z" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("greeting") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-[30px] font-extrabold tracking-tight text-white drop-shadow-sm leading-none pt-0.5",
									children: user.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11.5px] text-emerald-50/95 leading-snug pt-1 drop-shadow-xs font-medium",
									children: t("subtitle_home")
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-3.5 mb-3.5 rounded-[22px] bg-gradient-to-r from-[#082418]/95 via-[#0D3524]/95 to-[#12422D]/95 border-[1.5px] border-[#D4AF37] p-3.5 shadow-[0_10px_28px_rgba(0,0,0,0.45)] relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-6 -top-6 w-24 h-24 rounded-full bg-amber-400/10 blur-xl pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 mb-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-extrabold tracking-wide text-[#FDE68A]",
									children: t("todays_focus")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: onOpenStreak,
									className: "px-2.5 py-0.5 rounded-full bg-[#071F15]/90 border border-[#D4AF37]/65 flex items-center gap-1 text-[11px] font-extrabold text-amber-200 hover:border-amber-300 transition shadow-2xs",
									title: "View Learning Streak & Progress",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-3.5 h-3.5 text-amber-400 fill-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums",
										children: [
											"Streak: ",
											user.streakDays,
											"d"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-14 h-14 rounded-full bg-gradient-to-b from-[#174E36] to-[#092418] border-2 border-[#D4AF37] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.25)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Islamic3DIcon, {
										variant: "quran_rehal",
										size: "lg"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-[14px] font-extrabold text-white leading-snug",
											children: t("read_verses_reflection")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-semibold text-[#FDE68A] mt-0.5",
											children: [
												user.lastRead.surahName,
												" · Ayah ",
												user.lastRead.ayahNumber
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 w-full h-1.5 rounded-full bg-emerald-950/90 border border-emerald-700/40 overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full rounded-full bg-gradient-to-r from-[#22C55E] via-[#34D399] to-[#F59E0B] transition-all duration-300",
												style: { width: `${focusProgressPct === 0 ? 0 : Math.max(12, focusProgressPct)}%` }
											})
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-extrabold text-emerald-100 tabular-nums",
										children: isDailyGoalMet ? `${dailyGoal} / ${dailyGoal} verses · Daily goal complete` : `${dailyCompleted} / ${dailyGoal} verses daily goal`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-emerald-200/80 font-medium tabular-nums",
										children: [
											"Surah Hifz: ",
											totalMemorizedInSurah,
											" of ",
											totalSurahAyahs,
											" ayahs memorized"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: onStartLearning,
									className: "px-4 py-2 rounded-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] text-emerald-950 font-extrabold text-xs shadow-md hover:brightness-105 active:scale-98 transition inline-flex items-center gap-1.5 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("start_learning") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })]
								})]
							})
						]
					})
				]
			})
		]
	});
};
/**
* 4. Quick Access — 4 Primary Shortcuts with Unified Premium Icon Medallions
*/
var QuickAccessPillars = ({ onSelectRoute, t }) => {
	const pillars = [
		{
			route: "quran_list",
			label: t("quran"),
			icon: "quran_rehal"
		},
		{
			route: "hifz",
			label: t("hifz"),
			icon: "hifz_mushaf"
		},
		{
			route: "salah",
			label: t("salah"),
			icon: "mosque_dome"
		},
		{
			route: "duas",
			label: t("duas"),
			icon: "dua_hands"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-4 gap-2.5",
		children: pillars.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onSelectRoute(item.route),
			className: "group rounded-[20px] bg-gradient-to-b from-[#FFFDF9] to-[#F5EFE0] dark:from-[#102B20] dark:to-[#0B2118] border border-[#D4AF37]/40 dark:border-amber-400/20 p-2.5 shadow-2xs hover:border-[#14532D]/60 dark:hover:border-amber-400/45 hover:shadow-sm active:scale-98 transition flex flex-col items-center text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-12 h-12 rounded-2xl bg-gradient-to-b from-[#FFFDF7] to-[#FEF3C7]/75 dark:from-[#153628] dark:to-[#0E281D] border border-[#D4AF37]/45 dark:border-amber-400/25 flex items-center justify-center shadow-inner group-hover:scale-105 transition",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Islamic3DIcon, {
					variant: item.icon,
					size: "md"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-extrabold text-[#0F3826] dark:text-emerald-50 mt-1.5 leading-tight",
				children: item.label
			})]
		}, item.route))
	});
};
/**
* 3. Next Prayer Card with Verified Jamshedpur Timings, Live Countdown & 5-Prayer Daily Timeline
*/
var NextPrayerCard = ({ city, prayerTimings, activeSalahPrayers, isLiveTimingsSynced, onOpenSalah, t }) => {
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => {
			setNow(/* @__PURE__ */ new Date());
		}, 15e3);
		return () => window.clearInterval(timer);
	}, []);
	const computed = computeNextPrayerState(prayerTimings, now, activeSalahPrayers);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpenSalah,
		className: "w-full rounded-[22px] bg-gradient-to-r from-[#FFFDF9] via-[#FAF5E8] to-[#F5EBD6] dark:from-[#0E291E] dark:via-[#102E22] dark:to-[#133426] p-3.5 shadow-xs border border-[#D4AF37]/40 dark:border-amber-400/25 hover:border-[#14532D]/50 dark:hover:border-amber-400/50 transition text-left relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 120 80",
				className: "w-28 h-20 absolute right-0 top-0 opacity-15 dark:opacity-10 pointer-events-none text-[#B45309] dark:text-amber-300",
				fill: "currentColor",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M85 10 L88 22 L88 75 L82 75 L82 22 Z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M35 45 C35 24 75 24 75 45 L75 75 L35 75 Z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 55 C10 42 32 42 32 55 L32 75 L10 75 Z" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-2xl bg-[#FEF3C7] dark:bg-amber-400/15 border border-[#D4AF37]/65 dark:border-amber-400/35 flex items-center justify-center shrink-0 shadow-2xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Islamic3DIcon, {
							variant: "mosque_dome",
							size: "md"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-slate-600 dark:text-emerald-200/80 font-semibold flex items-center gap-1.5 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							t("next_prayer"),
							" · ",
							city
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11px] text-[#14532D] dark:text-amber-300 font-bold",
							children: ["· ", isLiveTimingsSynced ? "Aladhan" : "Karachi Calc"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-2 mt-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-extrabold text-[#0F3826] dark:text-white leading-tight",
							children: computed.nextPrayer
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-extrabold text-slate-800 dark:text-amber-200 tabular-nums",
							children: computed.nextTimeLabel
						})]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2.5 py-1 rounded-full bg-[#0F3826]/10 dark:bg-amber-400/15 border border-[#0F3826]/15 dark:border-amber-400/30 text-[#0F3826] dark:text-amber-200 text-xs font-extrabold tabular-nums",
						children: computed.countdownLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4 text-slate-500 dark:text-emerald-200/60" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mt-3 pt-2.5 border-t border-amber-900/10 dark:border-emerald-200/10 grid grid-cols-5 gap-1",
				children: computed.timeline.map((item) => {
					const status = activeSalahPrayers[item.name] || "pending";
					const isPrayed = status === "prayed_on_time" || status === "prayed";
					const isNext = item.state === "next";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-4 h-4 rounded-full flex items-center justify-center text-[11px] font-extrabold mb-1 ${isPrayed ? "bg-[#14532D] dark:bg-emerald-500 text-white dark:text-emerald-950" : isNext ? "bg-amber-400 text-emerald-950 ring-2 ring-amber-200 dark:ring-amber-400/35" : "bg-slate-200 dark:bg-emerald-900/60 text-slate-600 dark:text-emerald-200/70"}`,
								children: isPrayed ? "✓" : isNext ? "☀" : "•"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[11px] font-extrabold leading-tight ${isNext ? "text-[#0F3826] dark:text-amber-300" : "text-slate-700 dark:text-emerald-100/85"}`,
								children: item.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-semibold text-slate-600 dark:text-emerald-200/65 tabular-nums leading-tight mt-0.5",
								children: item.time
							})
						]
					}, item.name);
				})
			})
		]
	});
};
/**
* 8. Clean 5-Tab Deep-Emerald Adult Bottom Navigation Bar (Home · Quran · Salah · Learn · More)
*/
var AdultBottomNav = ({ activeRoute, onSelectRoute, t }) => {
	const navItems = [
		{
			id: "home",
			label: t("home"),
			icon: House,
			match: ["home"]
		},
		{
			id: "quran_list",
			label: t("quran"),
			icon: BookOpen,
			match: [
				"quran_list",
				"quran_read",
				"quran_journal"
			]
		},
		{
			id: "salah",
			label: t("salah"),
			icon: Moon,
			match: [
				"salah",
				"qibla",
				"tasbih",
				"calendar"
			]
		},
		{
			id: "lessons",
			label: "Learn",
			icon: GraduationCap,
			match: [
				"lessons",
				"hifz",
				"duas",
				"names99",
				"seerah",
				"quizzes",
				"progress"
			]
		},
		{
			id: "more",
			label: t("more"),
			icon: Ellipsis,
			match: [
				"more",
				"profile",
				"tasks_expenses"
			]
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Adult Mode Navigation",
		className: "sticky bottom-0 left-0 right-0 z-30 bg-[#09261A]/95 backdrop-blur-md text-emerald-100/85 border-t border-[#D4AF37]/25 px-2 pt-1.5 pb-safe shadow-[0_-8px_24px_rgba(0,0,0,0.24)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-5 items-center max-w-2xl mx-auto",
			children: navItems.map((navItem) => {
				const Icon = navItem.icon;
				const active = navItem.match.includes(activeRoute);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onSelectRoute(navItem.id),
					"aria-current": active ? "page" : void 0,
					className: "flex flex-col items-center justify-center py-0.5 min-h-[52px] transition active:scale-95",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `px-3.5 py-1.5 rounded-2xl flex flex-col items-center justify-center transition ${active ? "bg-[#14532D] border border-[#D4AF37]/75 text-[#FDE68A] shadow-sm" : "text-emerald-100/75 hover:text-white"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-[18px] h-[18px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-[11px] mt-0.5 whitespace-nowrap leading-none ${active ? "font-extrabold text-[#FDE68A]" : "font-semibold"}`,
							children: navItem.label
						})]
					})
				}, navItem.id);
			})
		})
	});
};
// src/engines/parentSafetyEngine.ts
/**
* Maximum elapsed milliseconds accepted in a single foreground timer tick.
* Prevents phantom time accumulation if the browser tab was suspended, hibernated, or backgrounded.
*/
var MAX_FOREGROUND_TICK_DELTA_MS = 5e3;
/**
* Computes the current daily usage period key (`YYYY-MM-DD_rHH`) taking into account
* the parent's configured local daily reset hour (0..23, default 0 = midnight).
* If the current local hour is before `resetHour`, the usage period belongs to the previous calendar day.
*/
function getUsagePeriodKey(now = /* @__PURE__ */ new Date(), resetHour = 0) {
	const safeResetHour = Number.isFinite(resetHour) && resetHour >= 0 && resetHour <= 23 ? Math.floor(resetHour) : 0;
	const adjusted = new Date(now.getTime());
	if (adjusted.getHours() < safeResetHour) adjusted.setDate(adjusted.getDate() - 1);
	return `${adjusted.getFullYear()}-${String(adjusted.getMonth() + 1).padStart(2, "0")}-${String(adjusted.getDate()).padStart(2, "0")}_r${String(safeResetHour).padStart(2, "0")}`;
}
/**
* Extracts the stored resetHour (0..23) from a `YYYY-MM-DD_rHH` usagePeriodKey if present.
*/
function parseResetHourFromUsagePeriodKey(periodKey) {
	if (!periodKey || typeof periodKey !== "string") return void 0;
	const match = periodKey.match(/_r(\d{2})$/);
	if (!match) return void 0;
	const parsed = Number.parseInt(match[1], 10);
	return Number.isFinite(parsed) && parsed >= 0 && parsed <= 23 ? parsed : void 0;
}
/**
* Single canonical daily usage-period rollover function.
* Ensures a child profile's daily screen-time usage and quest steps are reset ONLY when
* the local clock legitimately crosses forward into a new daily usage period (`resetHour`).
*
* Includes device clock tampering safeguards:
* - If the device wall-clock moves backward beyond `CLOCK_ROLLBACK_TOLERANCE_MS`, or if
*   `currentPeriodKey` is earlier than `storedPeriodKey`, daily usage is NEVER reset to 0
*   and `clockTamperDetected` is flagged as `true`.
*/
function ensureChildUsagePeriodRollover(child, now = /* @__PURE__ */ new Date(), resetHour) {
	const effectiveResetHour = typeof resetHour === "number" && Number.isFinite(resetHour) ? Math.max(0, Math.min(23, Math.floor(resetHour))) : parseResetHourFromUsagePeriodKey(child.usagePeriodKey) ?? 0;
	const currentPeriodKey = getUsagePeriodKey(now, effectiveResetHour);
	const currentCalendarDateKey = currentPeriodKey.slice(0, 10);
	const rawUsagePeriodKey = child.usagePeriodKey || "";
	const rawStoredDatePart = rawUsagePeriodKey ? rawUsagePeriodKey.slice(0, 10) : "";
	const storedPeriodKey = child.lastActiveDateKey && (!rawUsagePeriodKey || rawStoredDatePart !== child.lastActiveDateKey) ? `${child.lastActiveDateKey}_r${String(effectiveResetHour).padStart(2, "0")}` : rawUsagePeriodKey;
	const normalizedSeconds = typeof child.activeSecondsToday === "number" && Number.isFinite(child.activeSecondsToday) && (child.activeSecondsToday > 0 || (child.activeMinutesToday || 0) === 0) ? Math.max(0, Math.floor(child.activeSecondsToday)) : Math.max(0, Math.floor((child.activeMinutesToday || 0) * 60));
	const nowMs = now.getTime();
	const prevWallMs = typeof child.lastUsageTimestampMs === "number" && Number.isFinite(child.lastUsageTimestampMs) ? child.lastUsageTimestampMs : void 0;
	const backwardClockJumpDetected = prevWallMs !== void 0 && nowMs + 6e4 < prevWallMs;
	const storedDatePart = storedPeriodKey ? storedPeriodKey.slice(0, 10) : "";
	if (backwardClockJumpDetected || Boolean(storedDatePart && currentCalendarDateKey < storedDatePart)) return {
		...child,
		activeSecondsToday: normalizedSeconds,
		activeMinutesToday: Math.floor(normalizedSeconds / 60),
		extraMinutesGrantedToday: child.extraMinutesGrantedToday || 0,
		usagePeriodKey: storedPeriodKey || currentPeriodKey,
		lastActiveDateKey: storedDatePart || currentCalendarDateKey,
		lastUsageTimestampMs: prevWallMs ?? nowMs,
		clockTamperDetected: true
	};
	if (!storedPeriodKey) return {
		...child,
		activeSecondsToday: normalizedSeconds,
		activeMinutesToday: Math.floor(normalizedSeconds / 60),
		extraMinutesGrantedToday: child.extraMinutesGrantedToday || 0,
		screenTimeUnlockedForPeriodKey: child.screenTimeUnlockedForPeriodKey,
		usagePeriodKey: currentPeriodKey,
		lastActiveDateKey: currentCalendarDateKey,
		clockTamperDetected: false
	};
	if (storedPeriodKey === currentPeriodKey || storedDatePart === currentCalendarDateKey) return {
		...child,
		activeSecondsToday: normalizedSeconds,
		activeMinutesToday: Math.floor(normalizedSeconds / 60),
		extraMinutesGrantedToday: child.extraMinutesGrantedToday || 0,
		usagePeriodKey: currentPeriodKey,
		lastActiveDateKey: currentCalendarDateKey,
		clockTamperDetected: Boolean(child.clockTamperDetected)
	};
	return {
		...child,
		activeSecondsToday: 0,
		activeMinutesToday: 0,
		extraMinutesGrantedToday: 0,
		screenTimeUnlockedForPeriodKey: void 0,
		usagePeriodKey: currentPeriodKey,
		lastActiveDateKey: currentCalendarDateKey,
		lastUsageTimestampMs: nowMs,
		clockTamperDetected: false,
		questStepsCompleted: {
			quran: false,
			dua: false,
			quiz: false,
			salah: false,
			family: false
		}
	};
}
/**
* Returns the effective daily screen-time limit in seconds for a child profile,
* including any bonus minutes granted by the parent for the current day.
*/
function getEffectiveDailyLimitSeconds(child) {
	return ((typeof child.dailyGoalMinutes === "number" && child.dailyGoalMinutes > 0 ? child.dailyGoalMinutes : 15) + (typeof child.extraMinutesGrantedToday === "number" && child.extraMinutesGrantedToday > 0 ? child.extraMinutesGrantedToday : 0)) * 60;
}
/**
* Determines whether the child has reached or exceeded their daily Kids World screen-time limit.
*/
function isChildScreenTimeLimitReached(child, now = /* @__PURE__ */ new Date(), resetHour = 0) {
	const rolled = ensureChildUsagePeriodRollover(child, now, resetHour);
	const currentPeriodKey = getUsagePeriodKey(now, resetHour);
	if (rolled.screenTimeUnlockedForPeriodKey === currentPeriodKey || rolled.clockTamperDetected && rolled.screenTimeUnlockedForPeriodKey && rolled.screenTimeUnlockedForPeriodKey === rolled.usagePeriodKey) return false;
	const limitSeconds = getEffectiveDailyLimitSeconds(rolled);
	return (rolled.activeSecondsToday ?? rolled.activeMinutesToday * 60) >= limitSeconds;
}
/**
* Pure function that accumulates foreground Kids World usage time.
* - Pauses automatically when `isForegroundAndVisible` is false.
* - Caps delta at `MAX_FOREGROUND_TICK_DELTA_MS` so background sleep / tab suspension cannot add phantom time.
* - Tracks `lastUsageTimestampMs` so backward clock tampering cannot reset usage.
* - Clamps usage at the effective limit once reached until parent unlocks or grants bonus time.
*/
function accumulateKidsForegroundUsage(params) {
	const { child, elapsedMs, isForegroundAndVisible, now = /* @__PURE__ */ new Date(), resetHour = 0 } = params;
	const rolled = ensureChildUsagePeriodRollover(child, now, resetHour);
	if (!isForegroundAndVisible || elapsedMs <= 0 || !Number.isFinite(elapsedMs)) return {
		updatedChild: rolled,
		limitReached: isChildScreenTimeLimitReached(rolled, now, resetHour),
		secondsAdded: 0
	};
	if (isChildScreenTimeLimitReached(rolled, now, resetHour)) return {
		updatedChild: rolled,
		limitReached: true,
		secondsAdded: 0
	};
	const secondsToAdd = Math.max(1, Math.round(Math.min(Math.max(0, elapsedMs), MAX_FOREGROUND_TICK_DELTA_MS) / 1e3));
	const limitSeconds = getEffectiveDailyLimitSeconds(rolled);
	const currentPeriodKey = getUsagePeriodKey(now, resetHour);
	const isUnlimitedToday = rolled.screenTimeUnlockedForPeriodKey === currentPeriodKey;
	const prevSeconds = rolled.activeSecondsToday ?? rolled.activeMinutesToday * 60;
	const nextSeconds = isUnlimitedToday ? prevSeconds + secondsToAdd : Math.min(limitSeconds, prevSeconds + secondsToAdd);
	const nowMs = now.getTime();
	const nextWallMs = typeof rolled.lastUsageTimestampMs === "number" ? Math.max(rolled.lastUsageTimestampMs, nowMs) : nowMs;
	const updatedChild = {
		...rolled,
		activeSecondsToday: nextSeconds,
		activeMinutesToday: Math.floor(nextSeconds / 60),
		lastUsageTimestampMs: nextWallMs
	};
	return {
		updatedChild,
		limitReached: isChildScreenTimeLimitReached(updatedChild, now, resetHour),
		secondsAdded: nextSeconds - prevSeconds
	};
}
/**
* Grants parent-authorized bonus time or unlocks the remainder of the current usage period
* after verifying the 4-digit Parent PIN against the stored verifier (or legacy PIN).
*/
function unlockChildScreenTimeWithPin(params) {
	const { child, enteredPin, storedParentPin, storedPinVerifier, action, now = /* @__PURE__ */ new Date(), resetHour = 0 } = params;
	if (!verifyParentPin(enteredPin, storedPinVerifier || storedParentPin || "")) return {
		ok: false,
		error: "Incorrect Parent PIN. Please enter the 4-digit PIN set in Parent Hub.",
		updatedChild: child
	};
	const rolled = ensureChildUsagePeriodRollover(child, now, resetHour);
	const currentPeriodKey = getUsagePeriodKey(now, resetHour);
	if (action === "unlock_today") return {
		ok: true,
		updatedChild: {
			...rolled,
			screenTimeUnlockedForPeriodKey: currentPeriodKey
		}
	};
	const addMinutes = action === "grant_15m" ? 15 : 10;
	return {
		ok: true,
		updatedChild: {
			...rolled,
			extraMinutesGrantedToday: (rolled.extraMinutesGrantedToday || 0) + addMinutes
		}
	};
}
var RECOVERY_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
var PBKDF2_ITERATIONS = 1e5;
function bytesToHex(bytes) {
	let out = "";
	for (let i = 0; i < bytes.length; i += 1) out += bytes[i].toString(16).padStart(2, "0");
	return out;
}
function hexToBytes(hex) {
	const clean = hex.trim().toLowerCase();
	if (clean.length % 2 !== 0) return /* @__PURE__ */ new Uint8Array(0);
	const out = new Uint8Array(clean.length / 2);
	for (let i = 0; i < out.length; i += 1) out[i] = Number.parseInt(clean.slice(i * 2, i * 2 + 2), 16) || 0;
	return out;
}
function generateRandomSaltHex(byteLength = 16) {
	const bytes = new Uint8Array(byteLength);
	if (typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.getRandomValues === "function") globalThis.crypto.getRandomValues(bytes);
	else for (let i = 0; i < byteLength; i += 1) bytes[i] = Math.floor(Math.random() * 256);
	return bytesToHex(bytes);
}
/**
* Constant-time string comparison to avoid timing side channels.
*/
function timingSafeEqualStr(a, b) {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return diff === 0;
}
/**
* Derives a 256-bit hex key using Web Crypto API PBKDF2-SHA256.
*/
async function derivePbkdf2Sha256Hex(secret, saltHex, iterations = PBKDF2_ITERATIONS) {
	if (typeof globalThis.crypto !== "undefined" && globalThis.crypto.subtle && typeof globalThis.crypto.subtle.importKey === "function") {
		const enc = new TextEncoder();
		const keyMaterial = await globalThis.crypto.subtle.importKey("raw", enc.encode(secret), { name: "PBKDF2" }, false, ["deriveBits"]);
		const derivedBits = await globalThis.crypto.subtle.deriveBits({
			name: "PBKDF2",
			salt: hexToBytes(saltHex),
			iterations,
			hash: "SHA-256"
		}, keyMaterial, 256);
		return bytesToHex(new Uint8Array(derivedBits));
	}
	return computeNonPlaintextDigest(`fallback_pbkdf2:${iterations}:${saltHex}:${secret}`);
}
/**
* Synchronous non-plaintext multi-round digest used when migrating legacy plaintext PINs
* inside synchronous state normalizers before async Web Crypto upgrade runs.
*/
function computeNonPlaintextDigest(payload) {
	let h1 = 2166136261;
	let h2 = 16777619;
	let h3 = 2654435769;
	let h4 = 2246822507;
	for (let round = 0; round < 64; round += 1) for (let i = 0; i < payload.length; i += 1) {
		const ch = payload.charCodeAt(i) + round * 17;
		h1 = Math.imul(h1 ^ ch, 16777619);
		h2 = Math.imul(h2 ^ ch + i * 31, 2246822507);
		h3 = Math.imul(h3 ^ (ch ^ h1 >>> 13), 3266489909);
		h4 = Math.imul(h4 ^ ch + (h2 >>> 11), 668265263);
	}
	return [
		h1,
		h2,
		h3,
		h4
	].map((h) => (h >>> 0).toString(16).padStart(8, "0")).join("");
}
/**
* Validates that a candidate PIN is strictly 4 numeric digits.
*/
function isValidParentPinFormat(pin) {
	return typeof pin === "string" && /^\d{4}$/.test(pin.trim());
}
/**
* Creates a non-plaintext synchronous PIN verifier (`pin_v1$<saltHex>$<digestHex>`)
* so plaintext PINs are never stored in memory snapshots, IndexedDB, or JSON backups.
*/
function createParentPinVerifierSync(pin, customSaltHex) {
	if (!isValidParentPinFormat(pin)) return "";
	const cleanPin = pin.trim();
	const saltHex = customSaltHex || generateRandomSaltHex(16);
	return `pin_v1$${saltHex}$${computeNonPlaintextDigest(`ilmizo_pin_v1:${saltHex}:${cleanPin}`)}`;
}
/**
* Creates a salted Web Crypto API PBKDF2-SHA256 Parent PIN verifier (`pin_pbkdf2_v2$100000$<saltHex>$<derivedHex>`).
*/
async function createParentPinVerifierAsync(pin, customSaltHex, iterations = PBKDF2_ITERATIONS) {
	if (!isValidParentPinFormat(pin)) return "";
	const cleanPin = pin.trim();
	const saltHex = customSaltHex || generateRandomSaltHex(16);
	return `pin_pbkdf2_v2$${iterations}$${saltHex}$${await derivePbkdf2Sha256Hex(`ilmizo_parent_pin_v2:${cleanPin}`, saltHex, iterations)}`;
}
/**
* Verifies an entered 4-digit PIN against a stored PIN verifier (`pin_v1$...` or legacy 4-digit string).
*/
function verifyParentPin(enteredPin, storedVerifierOrPin) {
	if (!isValidParentPinFormat(enteredPin) || !storedVerifierOrPin || typeof storedVerifierOrPin !== "string") return false;
	const cleanPin = enteredPin.trim();
	const target = storedVerifierOrPin.trim();
	if (target.startsWith("pin_v1$")) {
		const parts = target.split("$");
		if (parts.length !== 3) return false;
		const saltHex = parts[1];
		return timingSafeEqualStr(createParentPinVerifierSync(cleanPin, saltHex), target);
	}
	if (isValidParentPinFormat(target)) return timingSafeEqualStr(cleanPin, target);
	return false;
}
/**
* Asynchronously verifies an entered 4-digit PIN against a Web Crypto PBKDF2-SHA256 verifier
* (`pin_pbkdf2_v2$...`), a sync migration verifier (`pin_v1$...`), or a legacy 4-digit PIN.
*/
async function verifyParentPinAsync(enteredPin, storedVerifierOrPin) {
	if (!isValidParentPinFormat(enteredPin) || !storedVerifierOrPin || typeof storedVerifierOrPin !== "string") return false;
	const cleanPin = enteredPin.trim();
	const target = storedVerifierOrPin.trim();
	if (target.startsWith("pin_pbkdf2_v2$")) {
		const parts = target.split("$");
		if (parts.length !== 4) return false;
		const iterations = Number.parseInt(parts[1], 10) || 1e5;
		const saltHex = parts[2];
		return timingSafeEqualStr(await createParentPinVerifierAsync(cleanPin, saltHex, iterations), target);
	}
	return verifyParentPin(cleanPin, target);
}
/**
* Normalizes a user-entered recovery code by upper-casing and stripping spaces/hyphens.
*/
function normalizeRecoveryCodeInput(rawCode) {
	if (typeof rawCode !== "string") return "";
	return rawCode.toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/^ILMZ/, "");
}
/**
* Legacy v1 recovery code hash function retained ONLY for verifying/migrating pre-existing
* `ilmz_rc_v1_` hashes so existing users are not locked out.
*/
function hashRecoveryCodeLegacyV1(rawCode) {
	const clean = normalizeRecoveryCodeInput(rawCode);
	if (clean.length < 8) return "";
	const payload = `ilmizo_pin_recovery_v1:${clean}`;
	let h1 = 2166136261;
	let h2 = 16777619;
	for (let i = 0; i < payload.length; i += 1) {
		const ch = payload.charCodeAt(i);
		h1 ^= ch;
		h1 = Math.imul(h1, 16777619);
		h2 ^= ch + i * 31;
		h2 = Math.imul(h2, 2246822507);
	}
	return `ilmz_rc_v1_${(h1 >>> 0).toString(16).padStart(8, "0")}_${(h2 >>> 0).toString(16).padStart(8, "0")}`;
}
/**
* Computes a Web Crypto API PBKDF2-SHA256 hash (`pbkdf2_sha256_v2$100000$<saltHex>$<derivedHex>`)
* with a unique 16-byte random salt per recovery code.
*/
async function hashRecoveryCodeAsync(rawCode, customSaltHex, iterations = PBKDF2_ITERATIONS) {
	const clean = normalizeRecoveryCodeInput(rawCode);
	if (clean.length < 8) return "";
	const saltHex = customSaltHex || generateRandomSaltHex(16);
	return `pbkdf2_sha256_v2$${iterations}$${saltHex}$${await derivePbkdf2Sha256Hex(`ilmizo_recovery_code_v2:${clean}`, saltHex, iterations)}`;
}
/**
* Verifies a recovery code against either a Web Crypto PBKDF2-SHA256 hash (`pbkdf2_sha256_v2$...`)
* or a legacy v1 hash (`ilmz_rc_v1_...`).
*/
async function verifyRecoveryCodeHashAsync(enteredRecoveryCode, storedRecoveryHash) {
	if (!storedRecoveryHash || typeof storedRecoveryHash !== "string") return false;
	const clean = normalizeRecoveryCodeInput(enteredRecoveryCode);
	if (clean.length < 8) return false;
	if (storedRecoveryHash.startsWith("pbkdf2_sha256_v2$")) {
		const parts = storedRecoveryHash.split("$");
		if (parts.length !== 4) return false;
		const iterations = Number.parseInt(parts[1], 10) || 1e5;
		const saltHex = parts[2];
		return timingSafeEqualStr(await hashRecoveryCodeAsync(clean, saltHex, iterations), storedRecoveryHash);
	}
	if (storedRecoveryHash.startsWith("ilmz_rc_v1_")) {
		const candidate = hashRecoveryCodeLegacyV1(clean);
		return Boolean(candidate && timingSafeEqualStr(candidate, storedRecoveryHash));
	}
	return false;
}
function generateRecoveryCodeString() {
	const bytes = /* @__PURE__ */ new Uint8Array(8);
	if (typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.getRandomValues === "function") globalThis.crypto.getRandomValues(bytes);
	else for (let i = 0; i < 8; i += 1) bytes[i] = Math.floor(Math.random() * 256);
	let chars = "";
	for (let i = 0; i < 8; i += 1) chars += RECOVERY_ALPHABET[bytes[i] % 32];
	return `ILMZ-${chars.slice(0, 4)}-${chars.slice(4, 8)}`;
}
/**
* Generates a fresh human-readable local recovery code (`ILMZ-XXXX-XXXX`) and its stored hash.
* Note: For Web Crypto PBKDF2-SHA256 salted hashes, prefer `generateParentRecoveryCodeAsync()`.
*/
function generateParentRecoveryCode(_seedHint) {
	const formattedCode = generateRecoveryCodeString();
	return {
		recoveryCode: formattedCode,
		formattedCode,
		recoveryHash: hashRecoveryCodeLegacyV1(formattedCode)
	};
}
/**
* Generates a fresh human-readable local recovery code (`ILMZ-XXXX-XXXX`) and its
* Web Crypto PBKDF2-SHA256 salted hash (`pbkdf2_sha256_v2$100000$<saltHex>$<derivedHex>`).
*/
async function generateParentRecoveryCodeAsync() {
	const formattedCode = generateRecoveryCodeString();
	return {
		recoveryCode: formattedCode,
		formattedCode,
		recoveryHash: await hashRecoveryCodeAsync(formattedCode)
	};
}
/**
* Synchronous verification & single-use PIN reset helper.
* Consumes and invalidates `storedRecoveryHash` (`nextRecoveryHash: undefined`, `recoveryCodeInvalidated: true`)
* so a used recovery code can NEVER be reused.
*/
function verifyRecoveryCodeAndResetPin(params) {
	const { enteredRecoveryCode, storedRecoveryHash, newPin } = params;
	if (!storedRecoveryHash) return {
		ok: false,
		error: "No active recovery code is available on this device (or your previous recovery code was already used). Generate a new recovery code in Parent Hub or reset site data."
	};
	const candidateHash = hashRecoveryCodeLegacyV1(enteredRecoveryCode);
	if (!candidateHash || !timingSafeEqualStr(candidateHash, storedRecoveryHash)) return {
		ok: false,
		error: "Invalid recovery code. Please check your saved ILMZ-XXXX-XXXX recovery code."
	};
	if (!isValidParentPinFormat(newPin)) return {
		ok: false,
		error: "New PIN must be exactly 4 numeric digits (0–9)."
	};
	const cleanPin = newPin.trim();
	return {
		ok: true,
		updatedPin: cleanPin,
		newPin: cleanPin,
		nextPinVerifier: createParentPinVerifierSync(cleanPin),
		nextRecoveryHash: void 0,
		recoveryCodeInvalidated: true
	};
}
/**
* Asynchronous Web Crypto PBKDF2-SHA256 verification & single-use PIN reset.
* Supports both `pbkdf2_sha256_v2$...` and legacy `ilmz_rc_v1_...` hashes, and invalidates
* the recovery code upon successful reset so it cannot be reused.
*/
async function verifyRecoveryCodeAndResetPinAsync(params) {
	const { enteredRecoveryCode, storedRecoveryHash, newPin } = params;
	if (!storedRecoveryHash) return {
		ok: false,
		error: "No active recovery code is available on this device (or your previous recovery code was already used). Generate a new recovery code in Parent Hub or reset site data."
	};
	if (!await verifyRecoveryCodeHashAsync(enteredRecoveryCode, storedRecoveryHash)) return {
		ok: false,
		error: "Invalid recovery code. Please check your saved ILMZ-XXXX-XXXX recovery code."
	};
	if (!isValidParentPinFormat(newPin)) return {
		ok: false,
		error: "New PIN must be exactly 4 numeric digits (0–9)."
	};
	const cleanPin = newPin.trim();
	return {
		ok: true,
		updatedPin: cleanPin,
		newPin: cleanPin,
		nextPinVerifier: await createParentPinVerifierAsync(cleanPin),
		nextRecoveryHash: void 0,
		recoveryCodeInvalidated: true
	};
}
// src/engines/kidsLearningEngines.ts
function normalizeSurahCertificateTitle(rawTitle) {
	const trimmed = (rawTitle || "").trim();
	if (!trimmed) return "Surah Al-Ikhlas";
	const stripped = trimmed.replace(/^(surah\s+)+/i, "").trim();
	if (!stripped) return "Surah Al-Ikhlas";
	return `Surah ${stripped}`;
}
function getChildCertificateAchievements(completedSurahs) {
	if (Array.isArray(completedSurahs) && completedSurahs.length > 0) {
		const uniqueNormalized = Array.from(new Set(completedSurahs.filter(Boolean).map(normalizeSurahCertificateTitle)));
		if (uniqueNormalized.length > 0) return uniqueNormalized;
	}
	return [
		"Surah Al-Ikhlas",
		"Daily Sunnah Duas",
		"Salah Foundations"
	];
}
/**
* Evaluates a child profile's real recorded progress against the 6 Kids World badges
* and computes the highest unlocked adventure island node.
*/
function evaluateChildBadgesAndMilestones(child) {
	const existing = new Set(Array.isArray(child.earnedBadgeIds) ? child.earnedBadgeIds : []);
	const computed = new Set(existing);
	const confirmedDeedsCount = Array.isArray(child.goodDeeds) ? child.goodDeeds.filter((d) => d.parentConfirmed).length : 0;
	const completedSurahsCount = Array.isArray(child.completedSurahs) ? new Set(child.completedSurahs.filter(Boolean).map(normalizeSurahCertificateTitle)).size : 0;
	if (child.pillarProgress.quranLessons >= 1 || completedSurahsCount >= 1) computed.add("badge_quran");
	if (child.pillarProgress.duasPracticed >= 5) computed.add("badge_dua");
	if (child.pillarProgress.salahLessons >= 1) computed.add("badge_salah");
	if (child.pillarProgress.akhlaqDeeds >= 1 || confirmedDeedsCount >= 1) computed.add("badge_kind");
	if (completedSurahsCount >= 5) computed.add("badge_5surahs");
	if (child.streakDays >= 30 || child.stars >= 150) computed.add("badge_30day");
	const earnedBadgeIds = Array.from(computed);
	return {
		earnedBadgeIds,
		newlyUnlockedBadgeIds: earnedBadgeIds.filter((id) => !existing.has(id)),
		unlockedAdventureNode: child.stars >= 50 ? 6 : child.stars >= 40 ? 5 : child.stars >= 30 ? 4 : child.stars >= 20 ? 3 : child.stars >= 10 ? 2 : Math.max(1, child.unlockedAdventureNode || 1)
	};
}
/**
* Canonical daily rollover wrapper that delegates to `ensureChildUsagePeriodRollover`
* so midnight (`00:00`) never prematurely wipes usage or quest steps before `kidsDailyResetHour`.
*/
function ensureChildDailyRollover(child, todayDateKey = getLocalDateKey$1(), resetHour, now) {
	const effectiveResetHour = typeof resetHour === "number" && Number.isFinite(resetHour) ? Math.max(0, Math.min(23, Math.floor(resetHour))) : parseResetHourFromUsagePeriodKey(child.usagePeriodKey) ?? 0;
	let referenceDate;
	if (now instanceof Date && !Number.isNaN(now.getTime())) referenceDate = now;
	else if (todayDateKey === getLocalDateKey$1(/* @__PURE__ */ new Date())) referenceDate = /* @__PURE__ */ new Date();
	else {
		const parsed = /* @__PURE__ */ new Date(`${todayDateKey}T12:00:00`);
		referenceDate = Number.isNaN(parsed.getTime()) ? /* @__PURE__ */ new Date() : parsed;
	}
	return ensureChildUsagePeriodRollover(child, referenceDate, effectiveResetHour);
}
/**
* Pure state transition when a child completes a quest step or masters a Surah.
* Enforces idempotency / duplicate-reward prevention and respects `kidsDailyResetHour`.
*/
function applyChildQuestCompletion(child, step, title, completedSurahTitle, todayDateKey = getLocalDateKey$1(), resetHour, now) {
	const rolledChild = ensureChildDailyRollover(child, todayDateKey, resetHour, now);
	const alreadyDone = Boolean(rolledChild.questStepsCompleted[step]);
	const updatedSurahs = [...rolledChild.completedSurahs || []];
	let newSurahAdded = false;
	if (completedSurahTitle && completedSurahTitle.trim()) {
		const normalized = normalizeSurahCertificateTitle(completedSurahTitle);
		if (!updatedSurahs.includes(normalized)) {
			updatedSurahs.push(normalized);
			newSurahAdded = true;
		}
	}
	const starsAwarded = alreadyDone ? 0 : 5;
	const duplicatePrevented = alreadyDone && !newSurahAdded;
	const draftChild = {
		...rolledChild,
		lastActiveDateKey: rolledChild.lastActiveDateKey || todayDateKey,
		activeMinutesToday: rolledChild.activeMinutesToday,
		activeSecondsToday: rolledChild.activeSecondsToday,
		stars: rolledChild.stars + starsAwarded,
		questStepsCompleted: {
			...rolledChild.questStepsCompleted,
			[step]: true
		},
		completedSurahs: updatedSurahs,
		pillarProgress: {
			quranLessons: step === "quran" && !alreadyDone ? rolledChild.pillarProgress.quranLessons + 1 : rolledChild.pillarProgress.quranLessons,
			duasPracticed: step === "dua" && !alreadyDone ? rolledChild.pillarProgress.duasPracticed + 1 : rolledChild.pillarProgress.duasPracticed,
			salahLessons: step === "salah" && !alreadyDone ? rolledChild.pillarProgress.salahLessons + 1 : rolledChild.pillarProgress.salahLessons,
			akhlaqDeeds: step === "family" && !alreadyDone ? rolledChild.pillarProgress.akhlaqDeeds + 1 : rolledChild.pillarProgress.akhlaqDeeds
		},
		recentActivities: alreadyDone ? rolledChild.recentActivities : [{
			id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
			title,
			pillar: step === "dua" ? "duas" : step === "quiz" ? "quran" : step,
			timestamp: "Just now"
		}, ...(rolledChild.recentActivities || []).slice(0, 14)]
	};
	const badgeEval = evaluateChildBadgesAndMilestones(draftChild);
	return {
		updatedChild: {
			...draftChild,
			earnedBadgeIds: badgeEval.earnedBadgeIds,
			unlockedAdventureNode: badgeEval.unlockedAdventureNode
		},
		newlyUnlockedBadgeIds: badgeEval.newlyUnlockedBadgeIds,
		duplicatePrevented,
		starsAwarded
	};
}
/**
* Pure state transition when a child finishes reading a Kids Story.
* Enforces non-duplicate star rewards per story ID: reopening or rereading an already-completed
* story awards 0 extra stars while still allowing unlimited rereading.
*/
function applyChildStoryCompletion(child, storyId, storyTitle, todayDateKey = getLocalDateKey$1(), resetHour, now) {
	const rolledChild = ensureChildDailyRollover(child, todayDateKey, resetHour, now);
	const existingStories = Array.isArray(rolledChild.completedStoryIds) ? rolledChild.completedStoryIds : [];
	const cleanStoryId = (storyId || "").trim();
	if (Boolean(cleanStoryId && existingStories.includes(cleanStoryId))) return {
		updatedChild: {
			...rolledChild,
			completedStoryIds: existingStories
		},
		newlyUnlockedBadgeIds: [],
		alreadyCompleted: true,
		starsAwarded: 0
	};
	const nextCompletedStories = cleanStoryId ? [...existingStories, cleanStoryId] : existingStories;
	const starsAwarded = 5;
	const draftChild = {
		...rolledChild,
		lastActiveDateKey: rolledChild.lastActiveDateKey || todayDateKey,
		activeMinutesToday: Math.min(60, (rolledChild.activeMinutesToday || 0) + 2),
		stars: rolledChild.stars + starsAwarded,
		completedStoryIds: nextCompletedStories,
		questStepsCompleted: {
			...rolledChild.questStepsCompleted,
			family: true
		},
		pillarProgress: {
			...rolledChild.pillarProgress,
			akhlaqDeeds: rolledChild.pillarProgress.akhlaqDeeds + 1
		},
		recentActivities: [{
			id: `act_story_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
			title: `Story Completed: ${storyTitle}`,
			pillar: "akhlaq",
			timestamp: "Just now"
		}, ...(rolledChild.recentActivities || []).slice(0, 14)]
	};
	const badgeEval = evaluateChildBadgesAndMilestones(draftChild);
	return {
		updatedChild: {
			...draftChild,
			earnedBadgeIds: badgeEval.earnedBadgeIds,
			unlockedAdventureNode: badgeEval.unlockedAdventureNode
		},
		newlyUnlockedBadgeIds: badgeEval.newlyUnlockedBadgeIds,
		alreadyCompleted: false,
		starsAwarded
	};
}
/**
* Replaces the fake `rangeMultiplier` in Kids Progress with a real period-based
* aggregator driven by recorded `learningEvents` (filtered by `mode === 'kids'` and `child.id`)
* combined with the child's persisted baseline profile records.
*/
function aggregateKidsProgressByPeriod(params) {
	const { child, learningEvents, period, now = /* @__PURE__ */ new Date() } = params;
	const maxDays = period === "Week" ? 7 : period === "Month" ? 30 : 36500;
	const allowedDates = /* @__PURE__ */ new Set();
	if (period !== "All Time") for (let i = 0; i < maxDays; i++) {
		const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
		allowedDates.add(getLocalDateKey$1(d));
	}
	const childEvents = learningEvents.filter((ev) => ev.mode === "kids" && (!ev.childId || ev.childId === child.id) && (period === "All Time" || allowedDates.has(ev.dateKey)));
	const eventQuran = childEvents.filter((e) => e.type === "quran_ayah_read" || e.type === "lesson_completed" && e.referenceId.startsWith("kids_quran")).length;
	const eventDuas = childEvents.filter((e) => e.type === "dua_studied").length;
	const eventSalah = childEvents.filter((e) => e.type === "salah_logged").length;
	const eventAkhlaq = childEvents.filter((e) => e.type === "lesson_completed" && e.referenceId.startsWith("kids_deed")).length;
	const eventQuizzes = childEvents.filter((e) => e.type === "quiz_completed").length;
	const quranCount = period === "All Time" ? Math.max(child.pillarProgress.quranLessons, eventQuran) : eventQuran > 0 ? eventQuran : child.pillarProgress.quranLessons;
	const duasCount = period === "All Time" ? Math.max(child.pillarProgress.duasPracticed, eventDuas) : eventDuas > 0 ? eventDuas : child.pillarProgress.duasPracticed;
	const salahCount = period === "All Time" ? Math.max(child.pillarProgress.salahLessons, eventSalah) : eventSalah > 0 ? eventSalah : child.pillarProgress.salahLessons;
	const akhlaqCount = period === "All Time" ? Math.max(child.pillarProgress.akhlaqDeeds, eventAkhlaq) : eventAkhlaq > 0 ? eventAkhlaq : child.pillarProgress.akhlaqDeeds;
	const confirmedDeedsCount = (child.goodDeeds || []).filter((g) => g.parentConfirmed).length;
	const pendingDeedsCount = (child.goodDeeds || []).filter((g) => !g.parentConfirmed).length;
	const activeDaysInPeriod = Math.max(1, new Set(childEvents.map((e) => e.dateKey)).size);
	return {
		period,
		quranCount,
		duasCount,
		salahCount,
		akhlaqCount,
		quizzesCount: eventQuizzes,
		totalEventsInPeriod: childEvents.length,
		confirmedDeedsCount,
		pendingDeedsCount,
		activeDaysInPeriod,
		filteredEvents: childEvents
	};
}
function normalizeArabicTextForMatch(str) {
	return (str || "").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "").replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").trim();
}
/**
* Deterministic word-stem comparison between target Quranic Ayah and Web Speech transcript.
*/
function scoreKidsArabicRecitationMatch(targetArabic, spokenArabic) {
	const targetWords = normalizeArabicTextForMatch(targetArabic).split(/\s+/).filter(Boolean);
	const spokenNorm = normalizeArabicTextForMatch(spokenArabic);
	if (targetWords.length === 0 || spokenNorm.length === 0) return {
		percentage: 0,
		matchedWords: 0,
		totalWords: targetWords.length,
		ratingSuggestion: "practice"
	};
	const matchedWords = targetWords.filter((w) => {
		const stem = w.slice(0, Math.min(3, w.length));
		return stem.length > 0 && spokenNorm.includes(stem);
	}).length;
	const percentage = Math.min(100, Math.round(matchedWords / targetWords.length * 100));
	return {
		percentage,
		matchedWords,
		totalWords: targetWords.length,
		ratingSuggestion: percentage >= 65 ? "clear" : "practice"
	};
}
/**
* Evaluates Web Audio API AnalyserNode RMS samples (0..1) and recording duration so
* browsers without Web Speech API (iOS Safari, Firefox, WebViews) still get truthful
* microphone voice-activity feedback instead of a silent dead end.
*/
function assessVoiceActivityMetrics(rmsSamples, durationMs) {
	const safeDuration = Math.max(0, Math.round(durationMs));
	const peakLevel = rmsSamples.length > 0 ? Math.max(...rmsSamples) : 0;
	const voicedSamples = rmsSamples.filter((s) => s >= .025).length;
	const activeSpeechRatio = rmsSamples.length > 0 ? Math.round(voicedSamples / rmsSamples.length * 100) / 100 : 0;
	const hasClearVoiceActivity = safeDuration >= 700 && peakLevel >= .04 && activeSpeechRatio >= .15;
	let summary = "Tap \"Play My Voice\" and compare side-by-side with the Qari.";
	if (safeDuration < 700) summary = "Recording was very short (< 1s). Hold and recite the full Ayah clearly.";
	else if (peakLevel < .03) summary = "Very low microphone input detected. Check mic permission or speak closer.";
	else if (hasClearVoiceActivity) summary = `Clear voice detected (${(safeDuration / 1e3).toFixed(1)}s). Compare "Play My Voice" with "Listen to Qari"!`;
	return {
		durationMs: safeDuration,
		activeSpeechRatio,
		peakLevel,
		hasClearVoiceActivity,
		summary
	};
}
function supportsArabicSpeechRecognition() {
	if (typeof window === "undefined") return false;
	const w = window;
	return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
}
// src/services/familySyncEngine.ts
function validateBackupStructure(rawJson) {
	if (!rawJson || typeof rawJson !== "string" || !rawJson.trim()) return {
		valid: false,
		errors: ["Backup JSON payload is empty."]
	};
	let parsed;
	try {
		parsed = JSON.parse(rawJson);
	} catch {
		return {
			valid: false,
			errors: ["Invalid JSON backup payload."]
		};
	}
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {
		valid: false,
		errors: ["Backup root must be a JSON object."]
	};
	if (![
		"user",
		"childrenProfiles",
		"bookmarks",
		"hifzPlans",
		"salahRecords",
		"learningEvents"
	].some((k) => k in parsed)) return {
		valid: false,
		errors: ["Unrecognized Ilmizo backup structure."]
	};
	return {
		valid: true,
		errors: []
	};
}
var REDEEMED_VOUCHERS_STORAGE_KEY = "ilmizo_redeemed_vouchers_v1";
function bytesToBase64(bytes) {
	if (typeof Buffer !== "undefined") return Buffer.from(bytes).toString("base64");
	let binary = "";
	for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
	return btoa(binary);
}
function base64ToBytes(b64) {
	if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(b64, "base64"));
	const binary = atob(b64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
function getSubtleCrypto() {
	if (typeof globalThis.crypto !== "undefined" && globalThis.crypto.subtle) return globalThis.crypto.subtle;
	return null;
}
async function deriveAesKeyFromPassphrase(passphrase, salt, usages) {
	const subtle = getSubtleCrypto();
	if (!subtle) throw new Error("Web Crypto API is unavailable in this environment.");
	const enc = new TextEncoder();
	const baseKey = await subtle.importKey("raw", enc.encode(passphrase), { name: "PBKDF2" }, false, ["deriveKey"]);
	return subtle.deriveKey({
		name: "PBKDF2",
		salt,
		iterations: 1e5,
		hash: "SHA-256"
	}, baseKey, {
		name: "AES-GCM",
		length: 256
	}, false, usages);
}
/**
* Encrypts a verified Ilmizo JSON backup string using PBKDF2-SHA256 (100,000 iterations)
* + AES-256-GCM so families can safely transfer progress across devices via AirDrop,
* WhatsApp, USB, or local files without any cloud server.
*/
async function exportEncryptedSyncBundle(plainBackupJson, passphrase) {
	const trimmedPass = passphrase.trim();
	if (trimmedPass.length < 6) return {
		ok: false,
		error: "Sync passphrase must be at least 6 characters long."
	};
	const check = validateBackupStructure(plainBackupJson);
	if (!check.valid) return {
		ok: false,
		error: check.errors[0] || "Backup payload validation failed before encryption."
	};
	const subtle = getSubtleCrypto();
	if (!subtle || typeof globalThis.crypto?.getRandomValues !== "function") return {
		ok: false,
		error: "Web Crypto encryption is unavailable in this browser."
	};
	try {
		const salt = globalThis.crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16));
		const iv = globalThis.crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12));
		const aesKey = await deriveAesKeyFromPassphrase(trimmedPass, salt, ["encrypt"]);
		const encoded = new TextEncoder().encode(plainBackupJson);
		const cipherBuffer = await subtle.encrypt({
			name: "AES-GCM",
			iv
		}, aesKey, encoded);
		const envelope = {
			format: "ilmizo-encrypted-sync-v1",
			kdf: "PBKDF2-SHA256-100000",
			cipher: "AES-256-GCM",
			saltB64: bytesToBase64(salt),
			ivB64: bytesToBase64(iv),
			ciphertextB64: bytesToBase64(new Uint8Array(cipherBuffer)),
			exportedAtIso: (/* @__PURE__ */ new Date()).toISOString()
		};
		return {
			ok: true,
			encryptedContent: JSON.stringify(envelope, null, 2)
		};
	} catch {
		return {
			ok: false,
			error: "Failed to encrypt family sync package."
		};
	}
}
/**
* Decrypts an `.ilmizo-sync` file with the family passphrase and validates the inner
* Ilmizo backup schema before returning raw JSON for preview & safe restore.
*/
async function importEncryptedSyncBundle(rawSyncText, passphrase) {
	const trimmedPass = passphrase.trim();
	if (!trimmedPass) return {
		ok: false,
		error: "Please enter the sync passphrase."
	};
	let parsed;
	try {
		parsed = JSON.parse(rawSyncText);
	} catch {
		return {
			ok: false,
			error: "Selected sync file is not valid JSON."
		};
	}
	if (!parsed || parsed.format !== "ilmizo-encrypted-sync-v1" || parsed.cipher !== "AES-256-GCM" || !parsed.saltB64 || !parsed.ivB64 || !parsed.ciphertextB64) return {
		ok: false,
		error: "Unsupported or corrupted .ilmizo-sync file header."
	};
	const subtle = getSubtleCrypto();
	if (!subtle) return {
		ok: false,
		error: "Web Crypto decryption is unavailable in this browser."
	};
	try {
		const salt = base64ToBytes(parsed.saltB64);
		const iv = base64ToBytes(parsed.ivB64);
		const cipherBytes = base64ToBytes(parsed.ciphertextB64);
		const aesKey = await deriveAesKeyFromPassphrase(trimmedPass, salt, ["decrypt"]);
		const plainBuffer = await subtle.decrypt({
			name: "AES-GCM",
			iv
		}, aesKey, cipherBytes);
		const rawBackupJson = new TextDecoder().decode(plainBuffer);
		const check = validateBackupStructure(rawBackupJson);
		if (!check.valid) return {
			ok: false,
			error: check.errors[0] || "Decrypted sync payload failed schema validation."
		};
		return {
			ok: true,
			rawBackupJson
		};
	} catch {
		return {
			ok: false,
			error: "Incorrect sync passphrase or modified .ilmizo-sync file."
		};
	}
}
function mapActionToPrefix(action) {
	if (action === "grant_15m") return "15M";
	if (action === "unlock_today") return "DAY";
	return "10M";
}
function mapPrefixToAction(prefix) {
	if (prefix === "10M") return "grant_10m";
	if (prefix === "15M") return "grant_15m";
	if (prefix === "DAY") return "unlock_today";
	return null;
}
async function computeVoucherTagHex(params) {
	const payload = `ilmizo_voucher_v1|${params.signingKey}|${params.childId}|${params.prefix}|${params.nonce}`;
	const subtle = getSubtleCrypto();
	if (subtle) {
		const buf = await subtle.digest("SHA-256", new TextEncoder().encode(payload));
		return Array.from(new Uint8Array(buf)).slice(0, 4).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
	}
	let h = 2166136261;
	for (let i = 0; i < payload.length; i++) {
		h ^= payload.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return (h >>> 0).toString(16).padStart(8, "0").toUpperCase();
}
function generateRandomNonce6() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	const bytes = /* @__PURE__ */ new Uint8Array(6);
	if (typeof globalThis.crypto?.getRandomValues === "function") globalThis.crypto.getRandomValues(bytes);
	else for (let i = 0; i < 6; i++) bytes[i] = Math.floor(Math.random() * 256);
	return Array.from(bytes, (b) => alphabet[b % 32]).join("");
}
function loadRedeemedVoucherIds() {
	if (typeof localStorage === "undefined") return [];
	try {
		const raw = localStorage.getItem(REDEEMED_VOUCHERS_STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
	} catch {
		return [];
	}
}
function saveRedeemedVoucherIds(ids) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(REDEEMED_VOUCHERS_STORAGE_KEY, JSON.stringify(ids.slice(-100)));
	} catch {}
}
/**
* Generates a single-use, cryptographically tagged offline Parent Time Voucher
* (e.g. `ILMZ-10M-K9X2P4-A7F3C9D2`) bound to the family's non-plaintext `parentPinVerifier`
* and target child profile ID.
*/
async function issueParentTimeVoucher(params) {
	const key = params.signingKey?.trim();
	if (!key) return {
		ok: false,
		error: "Set up your 4-digit Parent PIN first before issuing signed time vouchers."
	};
	const prefix = mapActionToPrefix(params.action);
	const nonce = generateRandomNonce6();
	return {
		ok: true,
		code: `ILMZ-${prefix}-${nonce}-${await computeVoucherTagHex({
			signingKey: key,
			childId: params.childId,
			prefix,
			nonce
		})}`
	};
}
/**
* Verifies a Parent Time Voucher offline and enforces single-use anti-replay tracking.
*/
async function verifyAndRedeemParentTimeVoucher(params) {
	const key = params.signingKey?.trim();
	if (!key) return {
		ok: false,
		error: "Parent PIN verifier is not initialized on this device yet."
	};
	const match = params.code.trim().toUpperCase().replace(/\s+/g, "").match(/^ILMZ-(10M|15M|DAY)-([A-Z0-9]{6})-([0-9A-F]{8})$/);
	if (!match) return {
		ok: false,
		error: "Invalid voucher format. Expected ILMZ-10M-XXXXXX-YYYYYYYY."
	};
	const [, prefixRaw, nonce, providedTag] = match;
	const prefix = prefixRaw;
	const action = mapPrefixToAction(prefix);
	if (!action) return {
		ok: false,
		error: "Unsupported voucher action."
	};
	if (await computeVoucherTagHex({
		signingKey: key,
		childId: params.childId,
		prefix,
		nonce
	}) !== providedTag) return {
		ok: false,
		error: "Voucher signature mismatch for this child or family profile."
	};
	const voucherId = `${params.childId}:${prefix}:${nonce}:${providedTag}`;
	const usedList = params.usedVoucherIds ?? loadRedeemedVoucherIds();
	if (usedList.includes(voucherId)) return {
		ok: false,
		error: "This one-time Parent Voucher has already been redeemed."
	};
	const nextUsedVoucherIds = [...usedList, voucherId];
	if (!params.usedVoucherIds) saveRedeemedVoucherIds(nextUsedVoucherIds);
	return {
		ok: true,
		action,
		voucherId,
		nextUsedVoucherIds
	};
}
// src/engines/navigationHistoryEngine.ts
var INITIAL_NAVIGATION_HISTORY_STATE = {
	mode: "adult",
	previousNonParentMode: "adult",
	adultRoute: "home",
	adultHistory: [],
	kidsRoute: "kids_home",
	kidsHistory: [],
	parentHubUnlocked: false
};
/**
* Transitions between Adult Mode, Kids World, and Parent Hub.
* - Switching to or from 'parent' mode always resets `parentHubUnlocked: false` so back/forward
*   navigation cannot bypass the Parent Hub PIN security gate.
* - Preserves separate `adultHistory` and `kidsHistory` stacks.
*/
function transitionMode(state, nextMode) {
	if (state.mode === nextMode) return state;
	const nextPreviousNonParent = state.mode === "adult" || state.mode === "kids" ? state.mode : state.previousNonParentMode;
	return {
		...state,
		mode: nextMode,
		previousNonParentMode: nextPreviousNonParent,
		parentHubUnlocked: false
	};
}
/**
* Pushes a new Adult Mode route onto the Adult history stack.
* - Prevents duplicate consecutive entries.
* - Switches `mode` to `'adult'` if not already in Adult Mode.
*/
function pushAdultRoute(state, nextRoute) {
	const baseState = state.mode !== "adult" ? transitionMode(state, "adult") : state;
	if (baseState.adultRoute === nextRoute) return baseState;
	const nextHistory = [...baseState.adultHistory];
	if (nextHistory[nextHistory.length - 1] !== baseState.adultRoute) nextHistory.push(baseState.adultRoute);
	return {
		...baseState,
		adultRoute: nextRoute,
		adultHistory: nextHistory.slice(-32)
	};
}
/**
* Pushes a new Kids World route onto the Kids history stack.
* - Prevents duplicate consecutive entries.
* - Switches `mode` to `'kids'` if not already in Kids Mode.
*/
function pushKidsRoute(state, nextRoute) {
	const baseState = state.mode !== "kids" ? transitionMode(state, "kids") : state;
	if (baseState.kidsRoute === nextRoute) return baseState;
	const nextHistory = [...baseState.kidsHistory];
	if (nextHistory[nextHistory.length - 1] !== baseState.kidsRoute) nextHistory.push(baseState.kidsRoute);
	return {
		...baseState,
		kidsRoute: nextRoute,
		kidsHistory: nextHistory.slice(-32)
	};
}
/**
* Computes whether a back action is available in the current mode.
* Main Home screens ('home' in Adult Mode, 'kids_home' in Kids World) do not show a back button.
*/
function canNavigateBack(state, hasSubScreenBackHandler = false) {
	if (hasSubScreenBackHandler) return true;
	if (state.mode === "parent") return true;
	if (state.mode === "adult") return state.adultRoute !== "home";
	if (state.mode === "kids") return state.kidsRoute !== "kids_home";
	return false;
}
/**
* Navigates back to the actual previous screen in the active mode's history stack.
* - In 'parent' mode: always locks Parent Hub (`parentHubUnlocked: false`) and returns to `previousNonParentMode`.
* - In 'adult' mode: pops `adultHistory`; if stack is empty and not on 'home', falls back safely to 'home'.
* - In 'kids' mode: pops `kidsHistory`; if stack is empty and not on 'kids_home', falls back safely to 'kids_home'.
*/
function popNavigationHistory(state) {
	if (state.mode === "parent") return {
		...state,
		mode: state.previousNonParentMode,
		parentHubUnlocked: false
	};
	if (state.mode === "adult") {
		if (state.adultHistory.length > 0) {
			const nextHistory = [...state.adultHistory];
			let targetRoute = nextHistory.pop();
			while (targetRoute === state.adultRoute && nextHistory.length > 0) targetRoute = nextHistory.pop();
			if (targetRoute === state.adultRoute) targetRoute = "home";
			return {
				...state,
				adultRoute: targetRoute,
				adultHistory: nextHistory
			};
		}
		if (state.adultRoute !== "home") return {
			...state,
			adultRoute: "home",
			adultHistory: []
		};
		return state;
	}
	if (state.mode === "kids") {
		if (state.kidsHistory.length > 0) {
			const nextHistory = [...state.kidsHistory];
			let targetRoute = nextHistory.pop();
			while (targetRoute === state.kidsRoute && nextHistory.length > 0) targetRoute = nextHistory.pop();
			if (targetRoute === state.kidsRoute) targetRoute = "kids_home";
			return {
				...state,
				kidsRoute: targetRoute,
				kidsHistory: nextHistory
			};
		}
		if (state.kidsRoute !== "kids_home") return {
			...state,
			kidsRoute: "kids_home",
			kidsHistory: []
		};
		return state;
	}
	return state;
}
var SEVEN_DAY_TRIAL_MS = 6048e5;
var SEVEN_DAY_OFFLINE_GRACE_MS = 6048e5;
var ILMIZO_PLAN_CATALOG = [
	{
		id: "free",
		sku: null,
		priceInrLabel: "₹0",
		monthlyEquivalentLabel: "Free Forever",
		title: {
			en: "Free Forever Core",
			hi: "हमेशा मुफ़्त (कोर)",
			ur: "ہمیشہ مفت (بنیادی)",
			hinglish: "Free Forever Core",
			ar: "الباقة المجانية للأبد"
		},
		tagline: {
			en: "Essential worship tools never locked behind a paywall",
			hi: "क़ुरआन, नमाज़, दुआ और क़िबला हमेशा मुफ़्त",
			ur: "قرآن، نماز، دعا اور قبلہ ہمیشہ مفت",
			hinglish: "Quran, Namaz, Duas aur Qibla hamesha 100% Free",
			ar: "أدوات العبادة الأساسية مجانية دائماً"
		},
		features: {
			en: [
				"114 Surahs Uthmani Quran + Qari Audio",
				"Complete Salah, Wudu, Duas & 99 Names",
				"1 Child Profile + Qaida Lessons 1–3 + 6 Stories"
			],
			hi: [
				"सभी 114 सूरतें और क़ारी तिलावत",
				"पूरा नमाज़, वुज़ू, दुआ और 99 नाम गाइड",
				"1 बच्चे की प्रोफ़ाइल + 3 क़ायदा सबक़ + 6 कहानियाँ"
			],
			ur: [
				"مکمل 114 سورتیں اور قاری تلاوت",
				"نماز، وضو، دعائیں اور 99 نام گائیڈ",
				"1 بچے کی پروفائل + 3 قاعدہ اسباق + 6 کہانیاں"
			],
			hinglish: [
				"Full 114 Surahs Quran + Qari Audio",
				"Complete Salah, Wudu, Duas & 99 Names",
				"1 Child Profile + 3 Qaida Lessons + 6 Stories"
			],
			ar: [
				"المصحف الشريف كاملاً ١١٤ سورة مع التلاوة",
				"دليل الصلاة والوضوء والأدعية والأسماء الحسنى",
				"ملف طفل واحد + ٣ دروس قاعدة + ٦ قصص"
			]
		}
	},
	{
		id: "individual_99",
		sku: "ilmizo_individual_99",
		priceInrLabel: "₹99 / yr",
		monthlyEquivalentLabel: "~₹8 / mo",
		title: {
			en: "Adult Quran Plus",
			hi: "एडल्ट क़ुरआन प्लस",
			ur: "ایڈلٹ قرآن پلس",
			hinglish: "Adult Quran Plus",
			ar: "باقة القرآن للبالغين"
		},
		tagline: {
			en: "For individuals deepening Hifz & Quranic Arabic",
			hi: "हिफ़्ज़ और अरबी शब्दावली को मज़बूत करने के लिए",
			ur: "حفظ اور قرآنی الفاظ کی مضبوطی کے لیے",
			hinglish: "Hifz revision aur Quranic Arabic vocabulary ke liye",
			ar: "لتعزيز الحفظ ومفردات القرآن الكريم"
		},
		features: {
			en: [
				"Full 600+ Core Quranic Vocabulary Mastery Deck",
				"Word-by-Word Hifz Studio & Unlimited Custom Plans",
				"Unlimited Online AI Tajweed Checks + Offline Audio"
			],
			hi: [
				"600+ प्रमुख क़ुरआनी शब्दों का पूरा ख़ज़ाना",
				"वर्ड-बाय-वर्ड हिफ़्ज़ स्टूडियो और अनलिमिटेड प्लान",
				"अनलिमिटेड ऑनलाइन AI तजवीद चेक और ऑफ़लाइन ऑडियो"
			],
			ur: [
				"600+ بنیادی قرآنی الفاظ کا مکمل ذخیرہ",
				"لفظ بہ لفظ حفظ اسٹوڈیو اور لامحدود پلانز",
				"لامحدود آن لائن AI تجوید چیک اور آف لائن آڈیو"
			],
			hinglish: [
				"Full 600+ Core Quranic Words Mastery Deck",
				"Word-by-Word Hifz Studio & Custom Plans",
				"Unlimited Online AI Tajweed + Offline Audio"
			],
			ar: [
				"إتقان أكثر من ٦٠٠ كلمة قرآنية أساسية",
				"استوديو الحفظ كلمة بكلمة وخطط مخصصة",
				"تدقيق تجويد ذكي غير محدود وحزم صوت دون إنترنت"
			]
		}
	},
	{
		id: "family_199",
		sku: "ilmizo_family_199",
		priceInrLabel: "₹199 / yr",
		monthlyEquivalentLabel: "~₹16 / mo",
		title: {
			en: "Ilmizo Family Plus",
			hi: "इल्मीज़ो फ़ैमिली प्लस",
			ur: "علمیزو فیملی پلس",
			hinglish: "Ilmizo Family Plus (Best Value)",
			ar: "باقة العائلة بلس"
		},
		tagline: {
			en: "17-Lesson Interactive Noorani Qaida, Letter Tracing & 49 Multi-Scene Stories for 5 kids",
			hi: "5 बच्चों के लिए 17-सबक़ इंटरैक्टिव नूरानी क़ायदा, लेटर ट्रेसिंग और 49 कहानियाँ",
			ur: "5 بچوں کے لیے 17 اسباق کا انٹرایکٹو نورانی قاعدہ، لیٹر ٹریسنگ اور 49 کہانیاں",
			hinglish: "Sirf ₹16/month mein 5 bacchon ka Interactive Noorani Qaida, Tracing + 49 Storybooks!",
			ar: "القاعدة النورانية التفاعلية ١٧ درساً وكتابة الحروف و٤٩ قصة لخمسة أطفال"
		},
		badgeText: {
			en: "Best for Families · 7-Day Free Trial",
			hi: "सबसे लोकप्रिय · 7-दिन मुफ़्त ट्रायल",
			ur: "بہترین انتخاب · 7 دن مفت ٹرائل",
			hinglish: "Most Popular · 7-Day Free Trial",
			ar: "الأكثر مبيعاً · تجربة ٧ أيام مجاناً"
		},
		features: {
			en: [
				"Up to 5 Child Profiles + Daily 10-Min Guided Plan & Weekly Card",
				"17-Lesson Noorani Qaida + Letter Tracing + 5Q Audio Mastery Quiz",
				"All 49 Multi-Scene Interactive Storybooks + Qari Verses + Certificates"
			],
			hi: [
				"5 बच्चों की प्रोफ़ाइल + 10-मिनट डेली तरबियत प्लान और वीकली रिपोर्ट कार्ड",
				"पूरा 17-सबक़ नूरानी क़ायदा + लेटर ट्रेसिंग + ऑडियो मास्टरी क्विज़",
				"सभी 49 मल्टी-सीन इंटरैक्टिव कहानियाँ + क़ारी आयत + सर्टिफ़िकेट"
			],
			ur: [
				"5 بچوں کی پروفائل + روزانہ 10 منٹ کا تربیت پلان اور ہفتہ وار رپورٹ کارڈ",
				"مکمل 17 اسباق کا نورانی قاعدہ + لیٹر ٹریسنگ + آڈیو ماسٹری کوئز",
				"تمام 49 ملٹی سین انٹرایکٹو کہانیاں + قاری آیات + سرٹیفکیٹس"
			],
			hinglish: [
				"5 Kids Profiles + Daily 10-Min Tarbiyah Plan & Weekly WhatsApp Card",
				"Complete 17-Lesson Noorani Qaida + Letter Tracing + Audio Mastery Quiz",
				"All 49 Multi-Scene Interactive Storybooks + Printable Certificates"
			],
			ar: [
				"حتى ٥ ملفات أطفال مع خطة يومية ١٠ دقائق وتقرير أسبوعي",
				"القاعدة النورانية ١٧ درساً + تتبع الحروف + اختبار سمعي متدرج",
				"جميع القصص التفاعلية ٤٩ متعددة المشاهد وشهادات التقدير"
			]
		}
	},
	{
		id: "lifetime_499",
		sku: "ilmizo_lifetime_499",
		priceInrLabel: "₹499 once",
		monthlyEquivalentLabel: "Pay Once Forever",
		title: {
			en: "Lifetime Family Supporter",
			hi: "लाइफ़टाइम फ़ैमिली पास",
			ur: "لائف ٹائم فیملی پاس",
			hinglish: "Lifetime Family (No Renewal)",
			ar: "باقة العائلة مدى الحياة"
		},
		tagline: {
			en: "One-time payment — zero yearly renewals, every Family & Adult tool unlocked",
			hi: "एक बार का भुगतान, हमेशा के लिए सारे फ़ीचर्स अनलॉक",
			ur: "ایک بار ادائیگی، تمام فیچرز ہمیشہ کے لیے",
			hinglish: "Ek baar ₹499 — zero renewal, Family + Adult hamesha ke liye unlocked",
			ar: "دفعة واحدة فقط لجميع ميزات العائلة والبالغين دون تجديد سنوي"
		},
		features: {
			en: [
				"Everything in Family Plus + Adult Quran Plus Forever",
				"Zero Yearly Renewals · Verified Local Offline Entitlement",
				"Supports 100% Ad-Free Islamic Kids Education"
			],
			hi: [
				"फ़ैमिली और एडल्ट के सारे फ़ीचर्स हमेशा के लिए",
				"कोई सालाना रिन्यूअल नहीं · पूरा ऑफ़लाइन ऐक्सेस",
				"विज्ञापन-मुक्त इस्लामी शिक्षा को सपोर्ट"
			],
			ur: [
				"فیملی اور ایڈلٹ کے تمام فیچرز ہمیشہ کے لیے",
				"سالانہ تجدید سے آزاد · مکمل آف لائن رسائی",
				"بغیر اشتہارات اسلامی تعلیم کا تعاون"
			],
			hinglish: [
				"Family Plus + Adult Plus Hamesha ke Liye",
				"No Annual Renewal · Offline Access",
				"100% Ad-Free Kids Tarbiyah Mission ko Support"
			],
			ar: [
				"جميع ميزات العائلة والبالغين مدى الحياة",
				"دون تجديد سنوي مع عمل كامل دون إنترنت",
				"دعم التعليم الإسلامي الخالي من الإعلانات"
			]
		}
	}
];
function getTrialStatus(user, nowMs = Date.now()) {
	const hasUsedTrial = Boolean(user.trialStartedAtIso || user.trialEndsAtIso);
	if (!user.trialEndsAtIso) return {
		isTrialActive: false,
		hasUsedTrial,
		daysRemaining: 0,
		endsAtIso: null
	};
	const endMs = Date.parse(user.trialEndsAtIso);
	if (!Number.isFinite(endMs) || endMs <= nowMs) return {
		isTrialActive: false,
		hasUsedTrial: true,
		daysRemaining: 0,
		endsAtIso: user.trialEndsAtIso
	};
	return {
		isTrialActive: true,
		hasUsedTrial: true,
		daysRemaining: Math.max(1, Math.ceil((endMs - nowMs) / 864e5)),
		endsAtIso: user.trialEndsAtIso
	};
}
function computeEntitlementProofSync(params) {
	const canonical = [
		"ilmizo_ent_v1",
		params.entitlement,
		params.source || "none",
		params.sku || "",
		params.orderId || "",
		params.trialEndsAtIso || ""
	].join("|");
	let h1 = 2166136261 ^ canonical.length;
	let h2 = 2654435769 ^ canonical.length;
	for (let i = 0; i < canonical.length; i++) {
		const ch = canonical.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 16777619);
		h2 = Math.imul(h2 ^ ch, 2654435761);
	}
	return `ent_v1_${(h1 >>> 0).toString(16).padStart(8, "0")}${(h2 >>> 0).toString(16).padStart(8, "0")}`;
}
function isEntitlementProofValid(user) {
	if (!user.subscriptionProofToken) return true;
	const expected = computeEntitlementProofSync({
		entitlement: user.entitlement,
		source: user.subscriptionPurchaseSource,
		sku: user.subscriptionSku,
		orderId: user.subscriptionOrderId,
		trialEndsAtIso: user.trialEndsAtIso
	});
	return user.subscriptionProofToken === expected;
}
function getOfflineEntitlementGraceStatus(user, nowMs = Date.now(), isOnline = typeof navigator !== "undefined" ? navigator.onLine : true) {
	if (user.entitlement === "lifetime_499") return {
		inGracePeriod: false,
		isGraceExpired: false,
		daysRemaining: 7,
		unlimited: true
	};
	if (user.subscriptionPurchaseSource !== "google_play" || user.entitlement === "free") return {
		inGracePeriod: false,
		isGraceExpired: false,
		daysRemaining: 0,
		unlimited: false
	};
	const verifiedIso = user.subscriptionLastVerifiedAtIso || user.subscriptionUpdatedAtIso;
	if (!verifiedIso) return {
		inGracePeriod: !isOnline,
		isGraceExpired: false,
		daysRemaining: 7,
		unlimited: false
	};
	const verifiedMs = Date.parse(verifiedIso);
	if (Number.isNaN(verifiedMs)) return {
		inGracePeriod: !isOnline,
		isGraceExpired: false,
		daysRemaining: 7,
		unlimited: false
	};
	const graceEndsAtMs = verifiedMs + SEVEN_DAY_OFFLINE_GRACE_MS;
	const remainingMs = graceEndsAtMs - nowMs;
	if (remainingMs <= 0) return {
		inGracePeriod: false,
		isGraceExpired: !isOnline,
		daysRemaining: 0,
		graceEndsAtIso: new Date(graceEndsAtMs).toISOString(),
		unlimited: false
	};
	return {
		inGracePeriod: !isOnline,
		isGraceExpired: false,
		daysRemaining: Math.max(1, Math.ceil(remainingMs / 864e5)),
		graceEndsAtIso: new Date(graceEndsAtMs).toISOString(),
		unlimited: false
	};
}
function getEffectiveEntitlement(user, nowMs = Date.now(), isOnline = typeof navigator !== "undefined" ? navigator.onLine : true) {
	if (user.subscriptionPurchaseSource === "none") return getTrialStatus(user, nowMs).isTrialActive && (!user.subscriptionProofToken || isEntitlementProofValid(user)) ? "family_199" : "free";
	if (user.subscriptionProofToken && !isEntitlementProofValid(user)) return "free";
	if (user.entitlement === "lifetime_499") return "lifetime_499";
	if (!isOnline && user.subscriptionPurchaseSource === "google_play") {
		if (getOfflineEntitlementGraceStatus(user, nowMs, false).isGraceExpired) return "free";
	}
	if (user.entitlement === "family_199") {
		if (user.subscriptionPurchaseSource === "local_trial") return getTrialStatus(user, nowMs).isTrialActive ? "family_199" : "free";
		return "family_199";
	}
	if (getTrialStatus(user, nowMs).isTrialActive) return "family_199";
	return user.entitlement || "free";
}
function isFamilyPlusActive(user, nowMs = Date.now()) {
	const effective = getEffectiveEntitlement(user, nowMs);
	return effective === "family_199" || effective === "lifetime_499";
}
function isAdultPlusActive(user, nowMs = Date.now()) {
	return getEffectiveEntitlement(user, nowMs) !== "free";
}
function canAccessChildSlot(user, currentChildrenCount, nowMs = Date.now()) {
	if (isFamilyPlusActive(user, nowMs)) return currentChildrenCount < 5;
	return currentChildrenCount < 1;
}
function canAccessQaidaLesson(user, lessonNumber, nowMs = Date.now()) {
	if (lessonNumber <= 3) return true;
	return isFamilyPlusActive(user, nowMs);
}
function canAccessStoryIndex(user, storyIndex, nowMs = Date.now()) {
	if (storyIndex < 6) return true;
	return isFamilyPlusActive(user, nowMs);
}
function canAccessVocabIndex(user, vocabIndex, nowMs = Date.now()) {
	if (vocabIndex < 30) return true;
	return isAdultPlusActive(user, nowMs);
}
function canAccessWordByWordHifzStudio(user, nowMs = Date.now()) {
	return isAdultPlusActive(user, nowMs);
}
function canAddCustomHifzPlan(user, customPlanCount, nowMs = Date.now()) {
	if (customPlanCount < 1) return true;
	return isAdultPlusActive(user, nowMs);
}
function canRecordFamilyStoryVoice(user, nowMs = Date.now()) {
	return isFamilyPlusActive(user, nowMs);
}
function canDownloadTopStoriesAudioPack(user, nowMs = Date.now()) {
	return isFamilyPlusActive(user, nowMs);
}
function canDownloadFullStoryLibraryAudioPack(user, nowMs = Date.now()) {
	return isFamilyPlusActive(user, nowMs);
}
function canCacheSingleStoryOffline(user, storyIndex, nowMs = Date.now()) {
	return canAccessStoryIndex(user, storyIndex, nowMs);
}
function canUseAiTajweedCheck(user, dateKey, nowMs = Date.now()) {
	if (isAdultPlusActive(user, nowMs)) return {
		allowed: true,
		remaining: null,
		usedToday: 0,
		limit: null
	};
	const usedToday = user.aiTajweedUsage?.dateKey === dateKey ? Math.max(0, user.aiTajweedUsage.count || 0) : 0;
	const remaining = Math.max(0, 2 - usedToday);
	return {
		allowed: usedToday < 2,
		remaining,
		usedToday,
		limit: 2
	};
}
function recordAiTajweedUsagePatch(user, dateKey) {
	return { aiTajweedUsage: {
		dateKey,
		count: (user.aiTajweedUsage?.dateKey === dateKey ? Math.max(0, user.aiTajweedUsage.count || 0) : 0) + 1
	} };
}
function startLocalSevenDayTrialPatch(nowMs = Date.now()) {
	const startIso = new Date(nowMs).toISOString();
	const endIso = new Date(nowMs + SEVEN_DAY_TRIAL_MS).toISOString();
	return {
		entitlement: "family_199",
		trialStartedAtIso: startIso,
		trialEndsAtIso: endIso,
		subscriptionPurchaseSource: "local_trial",
		subscriptionSku: "ilmizo_family_199",
		subscriptionUpdatedAtIso: startIso,
		subscriptionLastVerifiedAtIso: startIso,
		subscriptionProofToken: computeEntitlementProofSync({
			entitlement: "family_199",
			source: "local_trial",
			sku: "ilmizo_family_199",
			trialEndsAtIso: endIso
		})
	};
}
var IlmizoBillingNative = registerPlugin("IlmizoBilling");
async function detectBillingEnvironment() {
	if (!(typeof window !== "undefined" && typeof Capacitor?.isNativePlatform === "function" && Capacitor.isNativePlatform())) return {
		status: "web_preview",
		canLaunchRealCheckout: false,
		message: "Web/PWA Preview: Start a free 7-day local trial to test all Family Plus features. Live INR/USD Google Play checkout activates automatically inside the Play Store Android build."
	};
	try {
		if ((await IlmizoBillingNative.isBillingAvailable())?.available) return {
			status: "android_play_billing_ready",
			canLaunchRealCheckout: true,
			message: "Google Play Billing Connected (Play Store Checkout Ready)."
		};
	} catch {}
	return {
		status: "android_bridge_unlinked",
		canLaunchRealCheckout: false,
		message: "Android APK detected: Link com.android.billingclient:billing in Android Studio before Play Store release, or activate the 7-day offline trial now."
	};
}
function mapSkuToEntitlement(sku) {
	if (sku === "ilmizo_lifetime_499") return "lifetime_499";
	if (sku === "ilmizo_family_199") return "family_199";
	if (sku === "ilmizo_individual_99") return "individual_99";
	return "free";
}
async function attemptPlayStorePurchase(planId) {
	if (planId === "free") return {
		ok: true,
		mode: "free",
		patch: {
			entitlement: "free",
			subscriptionPurchaseSource: "none",
			subscriptionSku: void 0,
			subscriptionOrderId: void 0,
			subscriptionProofToken: void 0,
			subscriptionAutoRenewing: false,
			subscriptionUpdatedAtIso: (/* @__PURE__ */ new Date()).toISOString()
		},
		message: "Switched to Free Forever Core access."
	};
	const plan = ILMIZO_PLAN_CATALOG.find((p) => p.id === planId);
	if (!plan?.sku) return {
		ok: false,
		mode: "preview_trial_available",
		message: "Invalid plan SKU."
	};
	if (typeof navigator !== "undefined" && navigator.onLine === false) return {
		ok: false,
		mode: "google_play",
		message: "Internet connection is required to complete or verify a new Google Play purchase. Existing offline entitlements remain active."
	};
	const env = await detectBillingEnvironment();
	if (env.canLaunchRealCheckout) try {
		const result = await IlmizoBillingNative.purchaseProduct({ sku: plan.sku });
		if (result.purchased) {
			const nowIso = (/* @__PURE__ */ new Date()).toISOString();
			const entitlement = mapSkuToEntitlement(result.sku || plan.sku);
			const sku = result.sku || plan.sku;
			const orderId = result.orderId || `gp_${Date.now()}`;
			return {
				ok: true,
				mode: "google_play",
				patch: {
					entitlement,
					subscriptionPurchaseSource: "google_play",
					subscriptionSku: sku,
					subscriptionOrderId: orderId,
					subscriptionUpdatedAtIso: nowIso,
					subscriptionLastVerifiedAtIso: nowIso,
					subscriptionAutoRenewing: Boolean(result.isAutoRenewing),
					subscriptionProofToken: computeEntitlementProofSync({
						entitlement,
						source: "google_play",
						sku,
						orderId
					})
				},
				message: `Verified Google Play purchase for ${plan.title.en}!`
			};
		}
		if (result.pending) return {
			ok: false,
			mode: "google_play",
			pending: true,
			message: result.error || "Purchase is pending payment confirmation in Google Play. Tap Restore Purchases once payment clears."
		};
		return {
			ok: false,
			mode: "google_play",
			message: result.error || "Purchase cancelled in Google Play."
		};
	} catch (err) {
		return {
			ok: false,
			mode: "preview_trial_available",
			message: err instanceof Error ? err.message : "Google Play Billing unavailable right now. You can use the 7-day free trial."
		};
	}
	return {
		ok: false,
		mode: "preview_trial_available",
		message: env.message
	};
}
/**
* Reconciles Google Play active purchases against local UserProfile.
* - Preserves legitimate offline premium access whenever offline or Play Billing cannot be queried.
* - Restores active SKUs if found on Play.
* - Downgrades previously Play-backed entitlements to 'free' if Play was queried online & reports empty activeSkus (expired/refunded).
*/
async function reconcileGooglePlayEntitlements(user, options) {
	if (!(typeof options?.isOnline === "boolean" ? options.isOnline : typeof navigator !== "undefined" ? navigator.onLine : true)) {
		const activeTier = getEffectiveEntitlement(user, Date.now(), false);
		const grace = getOfflineEntitlementGraceStatus(user, Date.now(), false);
		return {
			ok: true,
			message: activeTier !== "free" ? grace.unlimited ? "Offline Mode: verified Lifetime access preserved permanently." : `Offline Mode: verified local ${activeTier} access preserved (${grace.daysRemaining}d remaining in 7-day offline grace period).` : grace.isGraceExpired ? "7-day offline entitlement grace period elapsed. Reconnect once to re-verify your Google Play subscription—Free Forever worship tools remain unlocked." : "Offline Mode: Free Forever core worship & learning features active. Connect to internet to buy or restore plans."
		};
	}
	let bridge = options?.nativeBridge;
	if (!bridge) {
		if ((await detectBillingEnvironment()).canLaunchRealCheckout) bridge = IlmizoBillingNative;
	}
	if (bridge) try {
		const restored = await bridge.restorePurchases();
		if (restored.activeSkus?.length) {
			const prioritySku = restored.activeSkus.find((s) => s === "ilmizo_lifetime_499") || restored.activeSkus.find((s) => s === "ilmizo_family_199") || restored.activeSkus[0];
			const tier = mapSkuToEntitlement(prioritySku);
			const nowIso = (/* @__PURE__ */ new Date()).toISOString();
			const orderId = restored.orderId || user.subscriptionOrderId;
			return {
				ok: true,
				patch: {
					entitlement: tier,
					subscriptionPurchaseSource: "google_play",
					subscriptionSku: prioritySku,
					subscriptionOrderId: orderId,
					subscriptionUpdatedAtIso: nowIso,
					subscriptionLastVerifiedAtIso: nowIso,
					subscriptionAutoRenewing: restored.isAutoRenewing,
					subscriptionProofToken: computeEntitlementProofSync({
						entitlement: tier,
						source: "google_play",
						sku: prioritySku,
						orderId
					})
				},
				message: `Restored Google Play subscription (${prioritySku}).`
			};
		}
		if (restored.pendingSkus?.length) return {
			ok: false,
			message: "Your Google Play payment is still pending confirmation. Premium access unlocks automatically once Play confirms it."
		};
		if (restored.queriedSuccessfully !== false && user.subscriptionPurchaseSource === "google_play" && user.entitlement !== "free") {
			const nowIso = (/* @__PURE__ */ new Date()).toISOString();
			return {
				ok: false,
				downgraded: true,
				patch: {
					entitlement: "free",
					subscriptionPurchaseSource: "none",
					subscriptionSku: void 0,
					subscriptionOrderId: void 0,
					subscriptionProofToken: void 0,
					subscriptionAutoRenewing: false,
					subscriptionUpdatedAtIso: nowIso,
					subscriptionLastVerifiedAtIso: nowIso
				},
				message: "Your Google Play subscription is no longer active (expired or refunded). Reverted to Free Forever Core."
			};
		}
		return {
			ok: false,
			message: "No active Google Play subscriptions found on this Google account."
		};
	} catch {
		return {
			ok: false,
			message: "Could not reach Google Play Billing. Existing offline entitlements are preserved."
		};
	}
	const trial = getTrialStatus(user);
	if (trial.isTrialActive) return {
		ok: true,
		message: `Local 7-Day Family Trial active (${trial.daysRemaining} day(s) remaining).`
	};
	return {
		ok: true,
		message: `Local entitlements verified (${getEffectiveEntitlement(user)}). Live receipt sync runs on Google Play Android.`
	};
}
async function attemptPlayStoreRestore(user) {
	return reconcileGooglePlayEntitlements(user);
}
function createParentGateChallenge(seed = Date.now()) {
	const a = 4 + seed % 5;
	const b = 3 + Math.floor(seed / 7) % 6;
	return {
		a,
		b,
		question: `${a} × ${b}`,
		expectedAnswer: a * b
	};
}
function verifyParentGateAnswer(challenge, rawInput) {
	const parsed = Number.parseInt(rawInput.trim(), 10);
	return Number.isFinite(parsed) && parsed === challenge.expectedAnswer;
}
function resolvePlanText(map, lang) {
	return map[lang] ?? map.en;
}
/**
* Computes a stable identity key for a HifzPlan that distinguishes different Ayah ranges
* within the same Surah while deduplicating identical plans and supporting legacy plans.
*/
function getHifzPlanIdentityKey(plan) {
	const surahNum = Number(plan.surahNumber) || 0;
	const start = typeof plan.startAyah === "number" && Number.isFinite(plan.startAyah) && plan.startAyah > 0 ? Math.floor(plan.startAyah) : 1;
	return `${surahNum}:${start}-${typeof plan.endAyah === "number" && Number.isFinite(plan.endAyah) && plan.endAyah >= start ? Math.floor(plan.endAyah) : typeof plan.totalAyahs === "number" && plan.totalAyahs >= start ? Math.floor(plan.totalAyahs) : start}:${(plan.ayahRange || "").trim().toLowerCase()}`;
}
function deduplicateByKey(items, getKey) {
	const seen = /* @__PURE__ */ new Set();
	const unique = [];
	let duplicatesRemoved = 0;
	for (const item of items) {
		if (!item || typeof item !== "object") continue;
		const key = getKey(item);
		if (!key) continue;
		if (seen.has(key)) {
			duplicatesRemoved += 1;
			continue;
		}
		seen.add(key);
		unique.push(item);
	}
	return {
		unique,
		duplicatesRemoved
	};
}
function deduplicateStrings(items, normalizeFn) {
	const seen = /* @__PURE__ */ new Set();
	const unique = [];
	let duplicatesRemoved = 0;
	for (const raw of items) {
		if (typeof raw !== "string") continue;
		const trimmed = raw.trim();
		if (!trimmed) continue;
		const val = normalizeFn ? normalizeFn(trimmed) : trimmed;
		if (!val) continue;
		if (seen.has(val)) {
			duplicatesRemoved += 1;
			continue;
		}
		seen.add(val);
		unique.push(val);
	}
	return {
		unique,
		duplicatesRemoved
	};
}
function createBackupBundle(state) {
	const exportedAt = (/* @__PURE__ */ new Date()).toISOString();
	const salahDaysCount = Object.keys(state.salahRecords || {}).length;
	const childrenProfiles = state.childrenProfiles || [];
	const certificatesAndBadgesSummary = childrenProfiles.map((child) => {
		const normalizedSurahs = Array.isArray(child.completedSurahs) ? Array.from(new Set(child.completedSurahs.filter(Boolean).map(normalizeSurahCertificateTitle))) : [];
		const certificateAchievements = getChildCertificateAchievements(normalizedSurahs);
		return {
			childId: child.id,
			childName: child.name,
			stars: child.stars,
			activeMinutesToday: child.activeMinutesToday,
			activeSecondsToday: typeof child.activeSecondsToday === "number" ? child.activeSecondsToday : Math.max(0, Math.round((child.activeMinutesToday || 0) * 60)),
			dailyGoalMinutes: child.dailyGoalMinutes,
			earnedBadgeIds: Array.isArray(child.earnedBadgeIds) ? child.earnedBadgeIds : [],
			completedSurahs: normalizedSurahs,
			certificateAchievements
		};
	});
	const totalBadgesCount = certificatesAndBadgesSummary.reduce((sum, c) => sum + c.earnedBadgeIds.length, 0);
	const totalCertificatesCount = certificatesAndBadgesSummary.reduce((sum, c) => sum + c.certificateAchievements.length, 0);
	const { parentPin: rawPlainPin, ...userWithoutPlainPin } = state.user || {};
	const resolvedVerifier = userWithoutPlainPin.parentPinVerifier || (typeof rawPlainPin === "string" && rawPlainPin.trim() ? createParentPinVerifierSync(rawPlainPin) : void 0);
	const bundle = {
		schemaVersion: 2,
		exportedAt,
		app: "Ilmizo Local-First Islamic Learning Platform",
		storageArchitecture: "local_first_indexeddb_v2",
		cloudSyncStatus: "DEFERRED_LOCAL_ONLY",
		backupNotice: "Manual local JSON backup file. Keep this file safe to restore your family progress across browsers or devices.",
		recordCounts: {
			childProfiles: childrenProfiles.length,
			bookmarks: (state.bookmarks || []).length,
			personalNotes: (state.personalNotes || []).length,
			hifzPlans: (state.hifzPlans || []).length,
			revisionItems: (state.revisionItems || []).length,
			salahDays: salahDaysCount,
			learningEvents: (state.learningEvents || []).length,
			quizAttempts: (state.quizAttempts || []).length,
			tasks: (state.tasks || []).length,
			expenses: (state.expenses || []).length,
			badgesEarned: totalBadgesCount,
			certificatesUnlocked: totalCertificatesCount
		},
		parentSafetySettings: {
			kidsDailyResetHour: state.user?.kidsDailyResetHour ?? 0,
			hasRecoveryCodeConfigured: Boolean(state.user?.parentPinRecoveryHash),
			parentPinSetupCompleted: Boolean(state.user?.parentPinSetupCompleted || resolvedVerifier),
			lastBackupExportedAtIso: exportedAt
		},
		certificatesAndBadgesSummary,
		user: {
			...userWithoutPlainPin,
			...resolvedVerifier ? {
				parentPinVerifier: resolvedVerifier,
				parentPinSetupCompleted: true
			} : {},
			lastBackupExportedAtIso: exportedAt
		},
		dailyVerseActivity: state.dailyVerseActivity,
		learningEvents: state.learningEvents,
		studiedNames99Numbers: state.studiedNames99Numbers,
		recentlyOpenedSurahs: state.recentlyOpenedSurahs,
		bookmarks: state.bookmarks,
		personalNotes: state.personalNotes,
		hifzPlans: state.hifzPlans,
		revisionItems: state.revisionItems,
		salahRecords: state.salahRecords,
		favoriteDuaIds: state.favoriteDuaIds,
		seerahMilestoneIds: state.seerahMilestoneIds,
		completedLessonIds: state.completedLessonIds,
		masteredVocabIds: state.masteredVocabIds,
		quizAttempts: state.quizAttempts,
		tasks: state.tasks,
		expenses: state.expenses,
		childrenProfiles,
		activeChildId: state.activeChildId
	};
	return JSON.stringify(bundle, null, 2);
}
function validateAndPreviewBackupJson(rawJson, normalizeStateFn, options) {
	const errors = [];
	const warnings = [];
	if (!rawJson || typeof rawJson !== "string" || !rawJson.trim()) return {
		valid: false,
		errors: ["Backup file is empty. Please select a valid Ilmizo JSON backup file."],
		warnings: []
	};
	let parsed;
	try {
		parsed = JSON.parse(rawJson);
	} catch (err) {
		return {
			valid: false,
			errors: [`Invalid JSON format: ${err instanceof Error ? err.message : "Unable to parse file."}`],
			warnings: []
		};
	}
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {
		valid: false,
		errors: ["Backup root must be a JSON object."],
		warnings: []
	};
	if (![
		"user",
		"childrenProfiles",
		"bookmarks",
		"hifzPlans",
		"salahRecords",
		"learningEvents"
	].some((k) => k in parsed)) return {
		valid: false,
		errors: ["Unrecognized JSON structure. Missing Ilmizo profile, Quran, Hifz, Salah, or Kids records."],
		warnings: []
	};
	const rawVersion = typeof parsed.schemaVersion === "number" ? parsed.schemaVersion : 1;
	if (rawVersion <= 0 || !Number.isInteger(rawVersion)) return {
		valid: false,
		errors: [`Invalid schemaVersion (${String(parsed.schemaVersion)}). Expected a positive integer.`],
		warnings: []
	};
	if (rawVersion > 2) return {
		valid: false,
		errors: [`Unsupported future backup schemaVersion (${rawVersion}). Current app supports up to version 2.`],
		warnings: []
	};
	if (rawVersion < 2) warnings.push(`Legacy backup format (v${rawVersion}) detected — records will be automatically upgraded to Schema v2.`);
	if (parsed.user !== void 0 && (!parsed.user || typeof parsed.user !== "object" || Array.isArray(parsed.user))) errors.push("Invalid \"user\" profile field: expected an object.");
	if (parsed.salahRecords !== void 0 && (!parsed.salahRecords || typeof parsed.salahRecords !== "object" || Array.isArray(parsed.salahRecords))) errors.push("Invalid \"salahRecords\" field: expected a date-keyed object.");
	for (const field of [
		"childrenProfiles",
		"bookmarks",
		"personalNotes",
		"hifzPlans",
		"revisionItems",
		"learningEvents",
		"quizAttempts",
		"tasks",
		"expenses"
	]) if (parsed[field] !== void 0 && !Array.isArray(parsed[field])) errors.push(`Invalid "${field}" field: expected an array.`);
	if (errors.length > 0) return {
		valid: false,
		errors,
		warnings
	};
	const rawChildrenInput = Array.isArray(parsed.childrenProfiles) ? parsed.childrenProfiles : [];
	const rawChildDuplicatesById = /* @__PURE__ */ new Map();
	for (const rawChild of rawChildrenInput) {
		if (!rawChild || typeof rawChild !== "object" || typeof rawChild.id !== "string") continue;
		const surahDedup = deduplicateStrings(Array.isArray(rawChild.completedSurahs) ? rawChild.completedSurahs : [], normalizeSurahCertificateTitle);
		const storyDedup = deduplicateStrings(Array.isArray(rawChild.completedStoryIds) ? rawChild.completedStoryIds : []);
		const badgeDedup = deduplicateStrings(Array.isArray(rawChild.earnedBadgeIds) ? rawChild.earnedBadgeIds : []);
		const deedDedup = deduplicateByKey(Array.isArray(rawChild.goodDeeds) ? rawChild.goodDeeds : [], (d) => d.id || `${d.title}:${d.childReportedAt}`);
		const explicitProvenInflation = typeof rawChild.provenDuplicateStarInflation === "number" && rawChild.provenDuplicateStarInflation > 0 ? Math.floor(rawChild.provenDuplicateStarInflation) : 0;
		rawChildDuplicatesById.set(rawChild.id, {
			surahsRemoved: surahDedup.duplicatesRemoved,
			storiesRemoved: storyDedup.duplicatesRemoved,
			badgesRemoved: badgeDedup.duplicatesRemoved,
			deedsRemoved: deedDedup.duplicatesRemoved,
			provenDuplicateStarInflation: explicitProvenInflation
		});
	}
	const normalized = normalizeStateFn(parsed);
	let totalDuplicatesRemoved = 0;
	const dedupChildren = deduplicateByKey(normalized.childrenProfiles || [], (c) => c.id);
	if (dedupChildren.duplicatesRemoved > 0) {
		totalDuplicatesRemoved += dedupChildren.duplicatesRemoved;
		warnings.push(`Removed ${dedupChildren.duplicatesRemoved} duplicate child profile ID(s).`);
	}
	if (dedupChildren.unique.length > 5) {
		const allNames = dedupChildren.unique.map((c) => c.name || c.id).join(", ");
		const overflowNames = dedupChildren.unique.slice(5).map((c) => c.name || c.id).join(", ");
		return {
			valid: false,
			errors: [`Backup contains ${dedupChildren.unique.length} unique child profiles (${allNames}), which exceeds the maximum limit of 5 profiles per family device. Affected overflow profile(s) that would be lost: ${overflowNames}. Import rejected to prevent silent child data truncation.`],
			warnings
		};
	}
	const dedupBookmarks = deduplicateByKey(normalized.bookmarks || [], (b) => `${b.surahNumber}:${b.ayahNumber}`);
	if (dedupBookmarks.duplicatesRemoved > 0) {
		totalDuplicatesRemoved += dedupBookmarks.duplicatesRemoved;
		warnings.push(`Removed ${dedupBookmarks.duplicatesRemoved} duplicate Quran bookmark(s).`);
	}
	normalized.bookmarks = dedupBookmarks.unique;
	const dedupNotes = deduplicateByKey(normalized.personalNotes || [], (n) => n.id);
	totalDuplicatesRemoved += dedupNotes.duplicatesRemoved;
	normalized.personalNotes = dedupNotes.unique;
	const dedupHifz = deduplicateByKey(normalized.hifzPlans || [], (p) => getHifzPlanIdentityKey(p));
	if (dedupHifz.duplicatesRemoved > 0) {
		totalDuplicatesRemoved += dedupHifz.duplicatesRemoved;
		warnings.push(`Removed ${dedupHifz.duplicatesRemoved} identical duplicate Hifz plan(s).`);
	}
	normalized.hifzPlans = dedupHifz.unique;
	const dedupRevisions = deduplicateByKey(normalized.revisionItems || [], (r) => r.id);
	totalDuplicatesRemoved += dedupRevisions.duplicatesRemoved;
	normalized.revisionItems = dedupRevisions.unique;
	const provenInflatedStarsByChild = /* @__PURE__ */ new Map();
	const seenEventKeys = /* @__PURE__ */ new Set();
	const uniqueEvents = [];
	let duplicateEventsRemoved = 0;
	for (const ev of normalized.learningEvents || []) {
		if (!ev || typeof ev !== "object") continue;
		const key = `${ev.dateKey}:${ev.mode}:${ev.childId || "adult"}:${ev.type}:${ev.referenceId}`;
		if (!key) continue;
		if (seenEventKeys.has(key)) {
			duplicateEventsRemoved += 1;
			if (ev.mode === "kids" && ev.childId && ev.provenDuplicateStarInflation === true && typeof ev.value === "number" && ev.value > 0) provenInflatedStarsByChild.set(ev.childId, (provenInflatedStarsByChild.get(ev.childId) || 0) + ev.value);
			continue;
		}
		seenEventKeys.add(key);
		uniqueEvents.push(ev);
	}
	if (duplicateEventsRemoved > 0) {
		totalDuplicatesRemoved += duplicateEventsRemoved;
		warnings.push(`Deduplicated ${duplicateEventsRemoved} repeated learning event(s); preserved legitimate star balances.`);
	}
	normalized.learningEvents = uniqueEvents;
	normalized.childrenProfiles = dedupChildren.unique.map((child) => {
		const rawChildDups = rawChildDuplicatesById.get(child.id) || {
			surahsRemoved: 0,
			storiesRemoved: 0,
			badgesRemoved: 0,
			deedsRemoved: 0,
			provenDuplicateStarInflation: 0
		};
		const dedupSurahs = deduplicateStrings(Array.isArray(child.completedSurahs) ? child.completedSurahs : [], normalizeSurahCertificateTitle);
		const dedupStories = deduplicateStrings(Array.isArray(child.completedStoryIds) ? child.completedStoryIds : []);
		const dedupBadges = deduplicateStrings(Array.isArray(child.earnedBadgeIds) ? child.earnedBadgeIds : []);
		const dedupDeeds = deduplicateByKey(Array.isArray(child.goodDeeds) ? child.goodDeeds : [], (d) => d.id || `${d.title}:${d.childReportedAt}`);
		const dedupPractice = deduplicateByKey(Array.isArray(child.needsPractice) ? child.needsPractice : [], (np) => np.id || `${np.pillar}:${np.title}`);
		const surahsRemoved = Math.max(rawChildDups.surahsRemoved, dedupSurahs.duplicatesRemoved);
		const storiesRemoved = Math.max(rawChildDups.storiesRemoved, dedupStories.duplicatesRemoved);
		const badgesRemoved = Math.max(rawChildDups.badgesRemoved, dedupBadges.duplicatesRemoved);
		const deedsRemoved = Math.max(rawChildDups.deedsRemoved, dedupDeeds.duplicatesRemoved);
		const childDupsCount = surahsRemoved + storiesRemoved + badgesRemoved + deedsRemoved + dedupPractice.duplicatesRemoved;
		if (childDupsCount > 0) {
			totalDuplicatesRemoved += childDupsCount;
			warnings.push(`Cleaned ${childDupsCount} duplicate achievement/activity record(s) for ${child.name}; preserved legitimate star balances.`);
		}
		const provenInflation = (provenInflatedStarsByChild.get(child.id) || 0) + rawChildDups.provenDuplicateStarInflation;
		const adjustedStars = provenInflation > 0 ? Math.max(0, child.stars - provenInflation) : Math.max(0, child.stars);
		if (provenInflation > 0) warnings.push(`Adjusted ${child.name}'s stars by -${provenInflation} due to proven duplicate reward inflation.`);
		return {
			...child,
			stars: adjustedStars,
			completedSurahs: dedupSurahs.unique,
			completedStoryIds: dedupStories.unique,
			earnedBadgeIds: dedupBadges.unique,
			goodDeeds: dedupDeeds.unique,
			needsPractice: dedupPractice.unique
		};
	});
	const dedupQuizzes = deduplicateByKey(normalized.quizAttempts || [], (q) => q.id);
	totalDuplicatesRemoved += dedupQuizzes.duplicatesRemoved;
	normalized.quizAttempts = dedupQuizzes.unique;
	const dedupTasks = deduplicateByKey(normalized.tasks || [], (t) => t.id);
	totalDuplicatesRemoved += dedupTasks.duplicatesRemoved;
	normalized.tasks = dedupTasks.unique;
	const dedupExpenses = deduplicateByKey(normalized.expenses || [], (ex) => ex.id);
	totalDuplicatesRemoved += dedupExpenses.duplicatesRemoved;
	normalized.expenses = dedupExpenses.unique;
	if (normalized.childrenProfiles.length > 0 && !normalized.childrenProfiles.some((c) => c.id === normalized.activeChildId)) normalized.activeChildId = normalized.childrenProfiles[0].id;
	const rawUserClaimedPaid = Boolean(parsed.user?.entitlement && parsed.user.entitlement !== "free") || Boolean(parsed.user?.trialEndsAtIso || parsed.user?.trialStartedAtIso);
	if (options?.currentLocalUser) normalized.user = {
		...normalized.user,
		entitlement: options.currentLocalUser.entitlement,
		subscriptionPurchaseSource: options.currentLocalUser.subscriptionPurchaseSource,
		subscriptionSku: options.currentLocalUser.subscriptionSku,
		subscriptionOrderId: options.currentLocalUser.subscriptionOrderId,
		subscriptionUpdatedAtIso: options.currentLocalUser.subscriptionUpdatedAtIso,
		subscriptionLastVerifiedAtIso: options.currentLocalUser.subscriptionLastVerifiedAtIso,
		subscriptionProofToken: options.currentLocalUser.subscriptionProofToken,
		subscriptionAutoRenewing: options.currentLocalUser.subscriptionAutoRenewing,
		trialStartedAtIso: options.currentLocalUser.trialStartedAtIso,
		trialEndsAtIso: options.currentLocalUser.trialEndsAtIso
	};
	else normalized.user = {
		...normalized.user,
		entitlement: "free",
		subscriptionPurchaseSource: "none",
		subscriptionSku: void 0,
		subscriptionOrderId: void 0,
		subscriptionLastVerifiedAtIso: void 0,
		subscriptionProofToken: void 0,
		subscriptionAutoRenewing: false,
		trialStartedAtIso: void 0,
		trialEndsAtIso: void 0
	};
	if (rawUserClaimedPaid) warnings.push("Subscription & trial entitlements are Play Store / device-verified and are never elevated from backup files.");
	const totalBadgesCount = normalized.childrenProfiles.reduce((sum, c) => sum + (Array.isArray(c.earnedBadgeIds) ? c.earnedBadgeIds.length : 0), 0);
	const totalCertificatesCount = normalized.childrenProfiles.reduce((sum, c) => sum + getChildCertificateAchievements(c.completedSurahs).length, 0);
	return {
		valid: true,
		errors: [],
		warnings,
		preview: {
			schemaVersion: rawVersion,
			exportedAt: typeof parsed.exportedAt === "string" ? parsed.exportedAt : "Unknown timestamp",
			storageArchitecture: typeof parsed.storageArchitecture === "string" ? parsed.storageArchitecture : typeof parsed.storageMode === "string" ? parsed.storageMode : "local_device_storage",
			adultProfileName: normalized.user.name || "Aqib",
			adultCity: normalized.user.city || "Jamshedpur",
			childProfilesCount: normalized.childrenProfiles.length,
			childNames: normalized.childrenProfiles.map((c) => `${c.name} (${c.stars} ★)`),
			bookmarksCount: normalized.bookmarks.length,
			personalNotesCount: normalized.personalNotes.length,
			hifzPlansCount: normalized.hifzPlans.length,
			revisionItemsCount: normalized.revisionItems.length,
			salahDaysCount: Object.keys(normalized.salahRecords || {}).length,
			learningEventsCount: normalized.learningEvents.length,
			quizAttemptsCount: normalized.quizAttempts.length,
			tasksCount: normalized.tasks.length,
			expensesCount: normalized.expenses.length,
			certificatesCount: totalCertificatesCount,
			badgesCount: totalBadgesCount,
			duplicatesRemovedCount: totalDuplicatesRemoved,
			warnings
		},
		normalizedState: normalized
	};
}
async function applyValidatedImportWithRecovery(validatedState, currentState) {
	const snapshotRes = await saveRecoverySnapshot("pre_import_latest", currentState, "Automatic recovery snapshot created prior to JSON backup import");
	if (!snapshotRes.ok) return {
		ok: false,
		error: snapshotRes.error || "Could not create a pre-import recovery snapshot. Import aborted to protect existing data."
	};
	const safeStateToApply = {
		...validatedState,
		user: {
			...validatedState.user,
			entitlement: currentState.user?.entitlement || "free",
			subscriptionPurchaseSource: currentState.user?.subscriptionPurchaseSource || "none",
			subscriptionSku: currentState.user?.subscriptionSku,
			subscriptionOrderId: currentState.user?.subscriptionOrderId,
			subscriptionUpdatedAtIso: currentState.user?.subscriptionUpdatedAtIso,
			subscriptionLastVerifiedAtIso: currentState.user?.subscriptionLastVerifiedAtIso,
			subscriptionProofToken: currentState.user?.subscriptionProofToken,
			subscriptionAutoRenewing: currentState.user?.subscriptionAutoRenewing,
			trialStartedAtIso: currentState.user?.trialStartedAtIso,
			trialEndsAtIso: currentState.user?.trialEndsAtIso
		}
	};
	const writeRes = await saveMasterStateToLocalDb(safeStateToApply);
	if (!writeRes.ok) return {
		ok: false,
		error: writeRes.error || "Failed to write imported backup to local storage."
	};
	return {
		ok: true,
		recoveryCreatedAtIso: (await getRecoverySnapshot("pre_import_latest"))?.createdAtIso,
		appliedState: safeStateToApply
	};
}
async function restorePreImportRecoverySnapshot(normalizeStateFn) {
	const snap = await getRecoverySnapshot("pre_import_latest");
	if (!snap || !snap.state) return {
		ok: false,
		error: "No pre-import recovery snapshot found on this device."
	};
	const normalized = normalizeStateFn(snap.state);
	const saveRes = await saveMasterStateToLocalDb(normalized);
	if (!saveRes.ok) return {
		ok: false,
		error: saveRes.error || "Failed to restore recovery snapshot."
	};
	return {
		ok: true,
		restoredState: normalized
	};
}
// src/context/IlmizoContext.tsx
var getTodayKey = () => getLocalDateKey();
function readSavedField(key, fallback) {
	try {
		const parsed = readLegacyMasterStateSync();
		if (parsed && parsed[key] !== void 0 && parsed[key] !== null) return parsed[key];
	} catch {}
	return fallback;
}
var INITIAL_USER = {
	name: "Aqib",
	city: "Jamshedpur",
	country: "India",
	language: "en",
	darkMode: false,
	themeMode: "light",
	arabicFontScale: 2,
	parentPin: void 0,
	parentPinVerifier: void 0,
	parentPinSetupCompleted: false,
	entitlement: "free",
	subscriptionPurchaseSource: "none",
	streakDays: 14,
	lastRead: {
		surahNumber: 2,
		surahName: "Al-Baqarah",
		ayahNumber: 255
	},
	tasbihCount: 33,
	tasbihTarget: 33,
	tasbihTotal: 1420,
	activeDhikrIndex: 0,
	autoPlayRecitation: false,
	isMuted: false,
	reciterName: "Mishary Rashid Alafasy"
};
var INITIAL_CHILDREN = [{
	id: "child_ayaan",
	name: "Ayaan",
	age: 8,
	avatar: "Ayaan",
	dailyGoalMinutes: 10,
	activeMinutesToday: 8,
	stars: 45,
	streakDays: 7,
	questStepsCompleted: {
		quran: true,
		dua: true,
		quiz: true,
		salah: false,
		family: false
	},
	pillarProgress: {
		quranLessons: 12,
		duasPracticed: 8,
		salahLessons: 5,
		akhlaqDeeds: 6
	},
	unlockedAdventureNode: 6,
	needsPractice: [{
		id: "np_1",
		pillar: "quran",
		title: "Surah Al-Ikhlas — Ayah 4",
		prompt: "You had a small pause on \"Wa lam yakul-lahu kufuwan ahad\". Let’s practice this one more time!",
		arabic: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
		transliteration: "Wa lam yakul-lahu kufuwan ahad",
		targetRoute: "recitation_practice",
		mistakeCount: 1,
		lastAttemptAt: "Today",
		resolved: false
	}],
	goodDeeds: [{
		id: "gd_1",
		title: "Helped set the table for family meal",
		description: "Arranged plates and water glasses before Maghrib without being asked.",
		childReportedAt: "Today, 6:05 PM",
		parentConfirmed: true
	}, {
		id: "gd_2",
		title: "Shared toys with younger sister",
		description: "Shared building blocks and read a Prophet story together.",
		childReportedAt: "Today, 4:30 PM",
		parentConfirmed: false
	}],
	earnedBadgeIds: [
		"badge_quran",
		"badge_dua",
		"badge_salah",
		"badge_kind",
		"badge_5surahs",
		"badge_30day"
	],
	completedSurahs: [
		"Surah Al-Fatiha",
		"Surah Al-Ikhlas",
		"Surah Al-Kawthar",
		"Surah Al-Asr",
		"Surah An-Nas"
	],
	recentActivities: [
		{
			id: "ra_1",
			title: "Surah Al-Ikhlas",
			pillar: "quran",
			timestamp: "Today"
		},
		{
			id: "ra_2",
			title: "Dua Before Eating",
			pillar: "duas",
			timestamp: "Today"
		},
		{
			id: "ra_3",
			title: "Salah - Niyyah",
			pillar: "salah",
			timestamp: "Yesterday"
		},
		{
			id: "ra_4",
			title: "Family Challenge",
			pillar: "family",
			timestamp: "2 days ago"
		}
	]
}];
var INITIAL_HIFZ = [
	{
		surahNumber: 1,
		surahName: "Al-Fatiha",
		totalAyahs: 7,
		memorizedAyahs: 7,
		lastPracticedAt: "Today",
		status: "completed",
		dailyTargetAyahs: 3
	},
	{
		surahNumber: 2,
		surahName: "Al-Baqarah",
		totalAyahs: 286,
		memorizedAyahs: 12,
		lastPracticedAt: "Today",
		status: "in_progress",
		dailyTargetAyahs: 5
	},
	{
		surahNumber: 3,
		surahName: "Aal-Imran",
		totalAyahs: 200,
		memorizedAyahs: 0,
		lastPracticedAt: "Not started",
		status: "not_started",
		dailyTargetAyahs: 5
	},
	{
		surahNumber: 4,
		surahName: "An-Nisa",
		totalAyahs: 176,
		memorizedAyahs: 0,
		lastPracticedAt: "Not started",
		status: "not_started",
		dailyTargetAyahs: 5
	},
	{
		surahNumber: 67,
		surahName: "Al-Mulk",
		totalAyahs: 30,
		memorizedAyahs: 30,
		lastPracticedAt: "Yesterday",
		status: "completed",
		dailyTargetAyahs: 5
	},
	{
		surahNumber: 103,
		surahName: "Al-Asr",
		totalAyahs: 3,
		memorizedAyahs: 3,
		lastPracticedAt: "2 days ago",
		status: "completed",
		dailyTargetAyahs: 3
	},
	{
		surahNumber: 108,
		surahName: "Al-Kawthar",
		totalAyahs: 3,
		memorizedAyahs: 3,
		lastPracticedAt: "3 days ago",
		status: "completed",
		dailyTargetAyahs: 3
	},
	{
		surahNumber: 109,
		surahName: "Al-Kafirun",
		totalAyahs: 6,
		memorizedAyahs: 6,
		lastPracticedAt: "4 days ago",
		status: "completed",
		dailyTargetAyahs: 3
	},
	{
		surahNumber: 110,
		surahName: "An-Nasr",
		totalAyahs: 3,
		memorizedAyahs: 3,
		lastPracticedAt: "4 days ago",
		status: "completed",
		dailyTargetAyahs: 3
	},
	{
		surahNumber: 112,
		surahName: "Al-Ikhlas",
		totalAyahs: 4,
		memorizedAyahs: 4,
		lastPracticedAt: "Today",
		status: "completed",
		dailyTargetAyahs: 4
	},
	{
		surahNumber: 113,
		surahName: "Al-Falaq",
		totalAyahs: 5,
		memorizedAyahs: 5,
		lastPracticedAt: "Yesterday",
		status: "completed",
		dailyTargetAyahs: 5
	},
	{
		surahNumber: 114,
		surahName: "An-Nas",
		totalAyahs: 6,
		memorizedAyahs: 6,
		lastPracticedAt: "Yesterday",
		status: "completed",
		dailyTargetAyahs: 6
	}
];
var INITIAL_REVISIONS = [
	{
		id: "rev_1",
		surahNumber: 2,
		surahName: "Al-Baqarah",
		ayahRange: "Ayah 255 (Ayat al-Kursi)",
		dueStatus: "due_today",
		dueDate: "Due Today",
		intervalDays: 3,
		difficulty: "medium",
		attemptsCount: 6,
		lastSelfReport: "Good"
	},
	{
		id: "rev_2",
		surahNumber: 67,
		surahName: "Al-Mulk",
		ayahRange: "Ayahs 1 – 10",
		dueStatus: "overdue",
		dueDate: "Overdue by 1 day",
		intervalDays: 7,
		difficulty: "hard",
		attemptsCount: 4,
		lastSelfReport: "Needs Work"
	},
	{
		id: "rev_3",
		surahNumber: 112,
		surahName: "Al-Ikhlas",
		ayahRange: "Ayahs 1 – 4",
		dueStatus: "upcoming",
		dueDate: "In 3 days",
		intervalDays: 14,
		difficulty: "easy",
		attemptsCount: 12,
		lastSelfReport: "Fluent"
	}
];
var INITIAL_TASKS = [
	{
		id: "t1",
		title: "Read 10 Ayahs of Surah Al-Baqarah with reflection",
		category: "Deen",
		prayerAnchor: "Fajr",
		priority: "high",
		completed: true,
		dueDate: getTodayKey()
	},
	{
		id: "t2",
		title: "Listen to Ayaan’s Surah Al-Ikhlas recitation",
		category: "Family",
		prayerAnchor: "Maghrib",
		priority: "high",
		completed: false,
		dueDate: getTodayKey()
	},
	{
		id: "t3",
		title: "Set aside monthly Sadaqah for local food bank",
		category: "Deen",
		prayerAnchor: "Dhuhr",
		priority: "medium",
		completed: false,
		dueDate: getTodayKey()
	},
	{
		id: "t4",
		title: "Purchase groceries and fruit for family dinner",
		category: "Personal",
		prayerAnchor: "Asr",
		priority: "medium",
		completed: true,
		dueDate: getTodayKey()
	}
];
var INITIAL_EXPENSES = [
	{
		id: "ex1",
		title: "Monthly Salary / Halal Income",
		amount: 85e3,
		type: "income",
		category: "Salary",
		date: getTodayKey(),
		note: "Alhamdulillah"
	},
	{
		id: "ex2",
		title: "Friday Mosque & Orphanage Sadaqah",
		amount: 2500,
		type: "sadaqah",
		category: "Sadaqah",
		date: getTodayKey(),
		note: "Secret charity"
	},
	{
		id: "ex3",
		title: "Annual Zakat Installment",
		amount: 5e3,
		type: "zakat",
		category: "Zakat",
		date: getTodayKey(),
		note: "2.5% Nisab allocation"
	},
	{
		id: "ex4",
		title: "Family Groceries & Halal Provisions",
		amount: 6400,
		type: "expense",
		category: "Food",
		date: getTodayKey()
	},
	{
		id: "ex5",
		title: "Children Islamic Books & Stationery",
		amount: 1200,
		type: "expense",
		category: "Education",
		date: getTodayKey()
	}
];
var INITIAL_NOTES = [{
	id: "note_1",
	title: "Reflection on Ayat al-Kursi (2:255)",
	body: "Allah is Al-Hayy (The Ever-Living) and Al-Qayyum (The Sustainer of all existence). Reciting this after every obligatory prayer brings peace and protection.",
	surahReference: "Al-Baqarah 2:255",
	createdAt: "2026-10-26"
}];
var INITIAL_BOOKMARKS = [{
	id: "bm_1",
	surahNumber: 2,
	surahName: "Al-Baqarah",
	ayahNumber: 255,
	arabicSnippet: "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
	note: "Recite after every Fard prayer and before sleeping.",
	createdAt: "2026-10-25"
}, {
	id: "bm_2",
	surahNumber: 1,
	surahName: "Al-Fatiha",
	ayahNumber: 5,
	arabicSnippet: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
	note: "Core covenant between the servant and Allah.",
	createdAt: "2026-10-26"
}];
function normalizePersistedMasterState(raw, referenceNow = /* @__PURE__ */ new Date()) {
	const todayKey = getLocalDateKey(referenceNow);
	const savedUser = raw?.user;
	const legacyPlainPin = typeof savedUser?.parentPin === "string" && isValidParentPinFormat(savedUser.parentPin) ? savedUser.parentPin.trim() : void 0;
	const resolvedPinVerifier = savedUser?.parentPinVerifier || (legacyPlainPin ? createParentPinVerifierSync(legacyPlainPin) : void 0);
	const { parentPin: _omitPlainPin, ...restSavedUser } = savedUser && typeof savedUser === "object" ? savedUser : {};
	const user = {
		...INITIAL_USER,
		...restSavedUser,
		parentPin: void 0,
		parentPinVerifier: resolvedPinVerifier,
		parentPinSetupCompleted: Boolean(savedUser?.parentPinSetupCompleted || resolvedPinVerifier),
		autoPlayRecitation: false,
		isMuted: Boolean(savedUser?.isMuted),
		playbackRate: savedUser?.playbackRate || 1,
		prayerCalculationMethod: savedUser?.prayerCalculationMethod || 1,
		prayerAsrSchool: savedUser?.prayerAsrSchool ?? 1,
		hijriAdjustmentDays: savedUser?.hijriAdjustmentDays ?? 0,
		kidsDailyResetHour: typeof savedUser?.kidsDailyResetHour === "number" ? Math.max(0, Math.min(23, Math.floor(savedUser.kidsDailyResetHour))) : 0,
		parentPinRecoveryHash: savedUser?.parentPinRecoveryHash,
		parentPinRecoveryCreatedAtIso: savedUser?.parentPinRecoveryCreatedAtIso,
		recoveryCodeUsedAtIso: savedUser?.recoveryCodeUsedAtIso,
		lastBackupExportedAtIso: savedUser?.lastBackupExportedAtIso,
		calendarReminders: savedUser?.calendarReminders || {
			whiteDays: true,
			mondayThursday: true,
			ashura: true,
			ramadan: true,
			arafah: true
		}
	};
	const rawDaily = raw?.dailyVerseActivity;
	const dailyVerseActivity = rawDaily && rawDaily.dateKey === todayKey && Array.isArray(rawDaily.ayahKeys) ? rawDaily : {
		dateKey: todayKey,
		ayahKeys: []
	};
	const hifzPlans = (Array.isArray(raw?.hifzPlans) && raw.hifzPlans.length > 0 ? raw.hifzPlans : INITIAL_HIFZ).map((plan) => {
		const parsedRange = parseHifzAyahRange(plan.ayahRange, plan.totalAyahs);
		const startAyah = plan.startAyah || parsedRange.startAyah;
		const endAyah = plan.endAyah || parsedRange.endAyah;
		const ayahRange = plan.ayahRange || (plan.startAyah && plan.endAyah ? `Ayahs ${plan.startAyah}-${plan.endAyah}` : parsedRange.label);
		return {
			...plan,
			startAyah,
			endAyah,
			ayahRange,
			memorizationState: plan.memorizationState || deriveHifzPlanState(plan.memorizedAyahs, plan.totalAyahs, false, 7)
		};
	});
	const rawRevs = Array.isArray(raw?.revisionItems) && raw.revisionItems.length > 0 ? raw.revisionItems : INITIAL_REVISIONS;
	const revisionItems = refreshRevisionQueueDueStatuses(rawRevs.map((item) => {
		const meta = ALL_114_SURAHS.find((s) => s.number === item.surahNumber);
		const parsedRange = parseHifzAyahRange(item.ayahRange, meta?.ayahCount || 286);
		return {
			...item,
			startAyah: item.startAyah || parsedRange.startAyah,
			endAyah: item.endAyah || parsedRange.endAyah
		};
	}), todayKey);
	const rawChildren = Array.isArray(raw?.childrenProfiles) && raw.childrenProfiles.length > 0 ? raw.childrenProfiles : INITIAL_CHILDREN;
	const resetHour = user.kidsDailyResetHour ?? 0;
	const childrenProfiles = rawChildren.map((child) => {
		return ensureChildUsagePeriodRollover({
			...child,
			completedSurahs: Array.isArray(child.completedSurahs) ? Array.from(new Set(child.completedSurahs.filter(Boolean).map(normalizeSurahCertificateTitle))) : [],
			completedStoryIds: Array.isArray(child.completedStoryIds) ? Array.from(new Set(child.completedStoryIds.filter(Boolean))) : []
		}, referenceNow, resetHour);
	});
	const activeChildId = raw?.activeChildId && childrenProfiles.some((c) => c.id === raw.activeChildId) ? raw.activeChildId : childrenProfiles[0]?.id || "child_ayaan";
	return {
		schemaVersion: 2,
		user,
		dailyVerseActivity,
		learningEvents: Array.isArray(raw?.learningEvents) ? raw.learningEvents : [],
		studiedNames99Numbers: Array.isArray(raw?.studiedNames99Numbers) ? raw.studiedNames99Numbers : [
			1,
			2,
			3
		],
		recentlyOpenedSurahs: Array.isArray(raw?.recentlyOpenedSurahs) ? raw.recentlyOpenedSurahs : [
			2,
			1,
			36,
			67,
			112
		],
		bookmarks: Array.isArray(raw?.bookmarks) ? raw.bookmarks : INITIAL_BOOKMARKS,
		personalNotes: Array.isArray(raw?.personalNotes) ? raw.personalNotes : INITIAL_NOTES,
		hifzPlans,
		revisionItems,
		salahRecords: raw?.salahRecords && typeof raw.salahRecords === "object" ? raw.salahRecords : { [todayKey]: createEmptySalahDayRecord(todayKey) },
		favoriteDuaIds: Array.isArray(raw?.favoriteDuaIds) ? raw.favoriteDuaIds : [
			"dua_before_eating",
			"dua_morning_protection",
			"dua_parents"
		],
		seerahMilestoneIds: Array.isArray(raw?.seerahMilestoneIds) ? raw.seerahMilestoneIds : ["seerah_1", "seerah_2"],
		completedLessonIds: Array.isArray(raw?.completedLessonIds) ? raw.completedLessonIds : ["lesson_1", "lesson_2"],
		masteredVocabIds: Array.isArray(raw?.masteredVocabIds) ? raw.masteredVocabIds : [
			"v1",
			"v2",
			"v3"
		],
		quizAttempts: Array.isArray(raw?.quizAttempts) ? raw.quizAttempts : [{
			id: "qa_1",
			quizId: "quiz_quran_knowledge",
			quizTitle: "Quran Knowledge",
			score: 3,
			total: 3,
			completedAt: "Yesterday",
			mode: "adult"
		}],
		tasks: Array.isArray(raw?.tasks) ? raw.tasks : INITIAL_TASKS,
		expenses: Array.isArray(raw?.expenses) ? raw.expenses : INITIAL_EXPENSES,
		childrenProfiles,
		activeChildId
	};
}
var IlmizoContext = (0, import_react.createContext)(null);
var IlmizoProvider = ({ children }) => {
	const [navState, setNavState] = (0, import_react.useState)(INITIAL_NAVIGATION_HISTORY_STATE);
	const subScreenBackHandlerRef = (0, import_react.useRef)(null);
	const [hasSubScreenBack, setHasSubScreenBack] = (0, import_react.useState)(false);
	const isHandlingPopStateRef = (0, import_react.useRef)(false);
	const mode = navState.mode;
	const adultRoute = navState.adultRoute;
	const kidsRoute = navState.kidsRoute;
	const adultHistory = navState.adultHistory;
	const kidsHistory = navState.kidsHistory;
	const parentHubUnlocked = navState.parentHubUnlocked;
	const pushBrowserHistorySnapshot = (0, import_react.useCallback)((nextNav) => {
		if (isHandlingPopStateRef.current) return;
		if (typeof window !== "undefined" && window.history && typeof window.history.pushState === "function") try {
			window.history.pushState({
				ilmizoNav: true,
				mode: nextNav.mode,
				adultRoute: nextNav.adultRoute,
				kidsRoute: nextNav.kidsRoute
			}, "");
		} catch {}
	}, []);
	const setMode = (0, import_react.useCallback)((nextMode) => {
		audioManager.stopAll();
		setNavState((prev) => {
			const next = transitionMode(prev, nextMode);
			if (next !== prev) pushBrowserHistorySnapshot(next);
			return next;
		});
	}, [pushBrowserHistorySnapshot]);
	const setAdultRoute = (0, import_react.useCallback)((nextRoute) => {
		if (!audioManager.getState().quranSequence.mode) audioManager.stopAll();
		setNavState((prev) => {
			const next = pushAdultRoute(prev, nextRoute);
			if (next !== prev) pushBrowserHistorySnapshot(next);
			return next;
		});
	}, [pushBrowserHistorySnapshot]);
	const setKidsRoute = (0, import_react.useCallback)((nextRoute) => {
		audioManager.stopAll();
		setNavState((prev) => {
			const next = pushKidsRoute(prev, nextRoute);
			if (next !== prev) pushBrowserHistorySnapshot(next);
			return next;
		});
	}, [pushBrowserHistorySnapshot]);
	const setParentHubUnlocked = (0, import_react.useCallback)((unlocked) => {
		setNavState((prev) => ({
			...prev,
			parentHubUnlocked: Boolean(unlocked)
		}));
	}, []);
	const registerSubScreenBackHandler = (0, import_react.useCallback)((handler) => {
		subScreenBackHandlerRef.current = handler;
		setHasSubScreenBack(Boolean(handler));
	}, []);
	const isKidsScreenTimeLockedRef = (0, import_react.useRef)(false);
	const setKidsRouteGuarded = (0, import_react.useCallback)((nextRoute) => {
		if (isKidsScreenTimeLockedRef.current) {
			audioManager.stopAll();
			return;
		}
		setKidsRoute(nextRoute);
	}, [setKidsRoute]);
	const goBack = (0, import_react.useCallback)(() => {
		if (!(navState.mode === "adult" && Boolean(audioManager.getState().quranSequence.mode))) audioManager.stopAll();
		if (navState.mode === "kids" && isKidsScreenTimeLockedRef.current) return;
		if (subScreenBackHandlerRef.current) {
			if (subScreenBackHandlerRef.current()) return;
		}
		setNavState((prev) => popNavigationHistory(prev));
	}, [navState.mode]);
	const canGoBack = (0, import_react.useMemo)(() => navState.mode === "kids" && isKidsScreenTimeLockedRef.current ? false : canNavigateBack(navState, hasSubScreenBack), [navState, hasSubScreenBack]);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const handlePopState = () => {
			isHandlingPopStateRef.current = true;
			try {
				audioManager.stopAll();
				if (isKidsScreenTimeLockedRef.current) {
					pushBrowserHistorySnapshot(navState);
					return;
				}
				if (subScreenBackHandlerRef.current) {
					if (subScreenBackHandlerRef.current()) return;
				}
				setNavState((prev) => popNavigationHistory(prev));
			} finally {
				isHandlingPopStateRef.current = false;
			}
		};
		window.addEventListener("popstate", handlePopState);
		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [navState, pushBrowserHistorySnapshot]);
	const [user, setUser] = (0, import_react.useState)(() => {
		const saved = readSavedField("user", INITIAL_USER);
		const legacyPin = typeof saved?.parentPin === "string" && isValidParentPinFormat(saved.parentPin) ? saved.parentPin.trim() : void 0;
		const resolvedVerifier = saved?.parentPinVerifier || (legacyPin ? createParentPinVerifierSync(legacyPin) : void 0);
		const { parentPin: _omitPlainPin, ...restSaved } = saved || {};
		return {
			...INITIAL_USER,
			...restSaved,
			parentPin: void 0,
			parentPinVerifier: resolvedVerifier,
			parentPinSetupCompleted: Boolean(saved?.parentPinSetupCompleted || resolvedVerifier),
			autoPlayRecitation: false,
			isMuted: Boolean(saved?.isMuted),
			playbackRate: saved?.playbackRate || 1,
			prayerCalculationMethod: saved?.prayerCalculationMethod || 1,
			prayerAsrSchool: saved?.prayerAsrSchool ?? 1,
			hijriAdjustmentDays: saved?.hijriAdjustmentDays ?? 0,
			calendarReminders: saved?.calendarReminders || {
				whiteDays: true,
				mondayThursday: true,
				ashura: true,
				ramadan: true,
				arafah: true
			}
		};
	});
	const [selectedSurahNumber, setSelectedSurahNumber] = (0, import_react.useState)(() => user.lastRead?.surahNumber || 2);
	const [recentlyOpenedSurahs, setRecentlyOpenedSurahs] = (0, import_react.useState)(() => readSavedField("recentlyOpenedSurahs", [
		2,
		1,
		36,
		67,
		112
	]));
	const [dailyVerseActivity, setDailyVerseActivity] = (0, import_react.useState)(() => {
		const todayKey = getLocalDateKey();
		const saved = readSavedField("dailyVerseActivity", {
			dateKey: todayKey,
			ayahKeys: []
		});
		if (!saved || saved.dateKey !== todayKey || !Array.isArray(saved.ayahKeys)) return {
			dateKey: todayKey,
			ayahKeys: []
		};
		return saved;
	});
	const [learningEvents, setLearningEvents] = (0, import_react.useState)(() => readSavedField("learningEvents", []));
	const [studiedNames99Numbers, setStudiedNames99Numbers] = (0, import_react.useState)(() => readSavedField("studiedNames99Numbers", [
		1,
		2,
		3
	]));
	const [bookmarks, setBookmarks] = (0, import_react.useState)(() => readSavedField("bookmarks", [{
		id: "bm_1",
		surahNumber: 2,
		surahName: "Al-Baqarah",
		ayahNumber: 255,
		arabicSnippet: "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
		note: "Recite after every Fard prayer and before sleeping.",
		createdAt: "2026-10-25"
	}, {
		id: "bm_2",
		surahNumber: 1,
		surahName: "Al-Fatiha",
		ayahNumber: 5,
		arabicSnippet: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
		note: "Core covenant between the servant and Allah.",
		createdAt: "2026-10-26"
	}]));
	const [personalNotes, setPersonalNotes] = (0, import_react.useState)(() => readSavedField("personalNotes", INITIAL_NOTES));
	const [hifzPlans, setHifzPlans] = (0, import_react.useState)(() => {
		return readSavedField("hifzPlans", INITIAL_HIFZ).map((plan) => {
			const parsedRange = parseHifzAyahRange(plan.ayahRange, plan.totalAyahs);
			return {
				...plan,
				startAyah: plan.startAyah || parsedRange.startAyah,
				endAyah: plan.endAyah || parsedRange.endAyah,
				ayahRange: plan.ayahRange || parsedRange.label,
				memorizationState: plan.memorizationState || deriveHifzPlanState(plan.memorizedAyahs, plan.totalAyahs, false, 7)
			};
		});
	});
	const [revisionItems, setRevisionItems] = (0, import_react.useState)(() => {
		const raw = readSavedField("revisionItems", INITIAL_REVISIONS);
		return refreshRevisionQueueDueStatuses(raw.map((item) => {
			const meta = ALL_114_SURAHS.find((s) => s.number === item.surahNumber);
			const parsedRange = parseHifzAyahRange(item.ayahRange, meta?.ayahCount || 286);
			return {
				...item,
				startAyah: item.startAyah || parsedRange.startAyah,
				endAyah: item.endAyah || parsedRange.endAyah
			};
		}), getLocalDateKey());
	});
	const [hifzUndoSnapshot, setHifzUndoSnapshot] = (0, import_react.useState)(null);
	const [salahRecords, setSalahRecords] = (0, import_react.useState)(() => {
		const today = getTodayKey();
		return readSavedField("salahRecords", { [today]: createEmptySalahDayRecord(today) });
	});
	const [favoriteDuaIds, setFavoriteDuaIds] = (0, import_react.useState)(() => readSavedField("favoriteDuaIds", [
		"dua_before_eating",
		"dua_morning_protection",
		"dua_parents"
	]));
	const [seerahMilestoneIds, setSeerahMilestoneIds] = (0, import_react.useState)(() => readSavedField("seerahMilestoneIds", ["seerah_1", "seerah_2"]));
	const [completedLessonIds, setCompletedLessonIds] = (0, import_react.useState)(() => readSavedField("completedLessonIds", ["lesson_1", "lesson_2"]));
	const [masteredVocabIds, setMasteredVocabIds] = (0, import_react.useState)(() => readSavedField("masteredVocabIds", [
		"v1",
		"v2",
		"v3"
	]));
	const [quizAttempts, setQuizAttempts] = (0, import_react.useState)(() => readSavedField("quizAttempts", [{
		id: "qa_1",
		quizId: "quiz_quran_knowledge",
		quizTitle: "Quran Knowledge",
		score: 3,
		total: 3,
		completedAt: "Yesterday",
		mode: "adult"
	}]));
	const [tasks, setTasks] = (0, import_react.useState)(() => readSavedField("tasks", INITIAL_TASKS));
	const [expenses, setExpenses] = (0, import_react.useState)(() => readSavedField("expenses", INITIAL_EXPENSES));
	const [childrenProfiles, setChildrenProfiles] = (0, import_react.useState)(() => {
		const rawProfiles = readSavedField("childrenProfiles", INITIAL_CHILDREN);
		const resetHour = user.kidsDailyResetHour ?? 0;
		const nowDate = /* @__PURE__ */ new Date();
		return rawProfiles.map((child) => ensureChildUsagePeriodRollover({
			...child,
			completedSurahs: Array.isArray(child.completedSurahs) ? Array.from(new Set(child.completedSurahs.filter(Boolean).map(normalizeSurahCertificateTitle))) : [],
			completedStoryIds: Array.isArray(child.completedStoryIds) ? Array.from(new Set(child.completedStoryIds.filter(Boolean))) : []
		}, nowDate, resetHour));
	});
	const [activeChildId, setActiveChildId] = (0, import_react.useState)(() => readSavedField("activeChildId", "child_ayaan"));
	const [storageMetrics, setStorageMetrics] = (0, import_react.useState)({
		backend: "indexeddb",
		schemaVersion: 2,
		migratedFromLegacyV1: true,
		legacyBackupPreserved: true,
		estimatedUsedBytes: 0,
		estimatedQuotaBytes: null,
		downloadedSurahNumbers: [],
		cachedSurahNumbers: [],
		downloadedAudioKeys: [],
		learningEventsCount: 0,
		hasPreImportRecoverySnapshot: false,
		lastSavedAtIso: null,
		lastQuotaError: null
	});
	const refreshStorageMetrics = async () => {
		const metrics = await computeLocalStorageMetrics();
		setStorageMetrics(metrics);
	};
	const applyNormalizedMasterStateToReact = (normalized) => {
		setUser(normalized.user);
		setSelectedSurahNumber(normalized.user.lastRead?.surahNumber || 2);
		setDailyVerseActivity(normalized.dailyVerseActivity);
		setLearningEvents(normalized.learningEvents);
		setStudiedNames99Numbers(normalized.studiedNames99Numbers);
		setRecentlyOpenedSurahs(normalized.recentlyOpenedSurahs);
		setBookmarks(normalized.bookmarks);
		setPersonalNotes(normalized.personalNotes);
		setHifzPlans(normalized.hifzPlans);
		setRevisionItems(normalized.revisionItems);
		setSalahRecords(normalized.salahRecords);
		setFavoriteDuaIds(normalized.favoriteDuaIds);
		setSeerahMilestoneIds(normalized.seerahMilestoneIds);
		setCompletedLessonIds(normalized.completedLessonIds);
		setMasteredVocabIds(normalized.masteredVocabIds);
		setQuizAttempts(normalized.quizAttempts);
		setTasks(normalized.tasks);
		setExpenses(normalized.expenses);
		setChildrenProfiles(normalized.childrenProfiles);
		setActiveChildId(normalized.activeChildId);
	};
	const hasHydratedFromDbRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		requestPersistentLocalStorage();
		hydrateOrMigrateMasterState(normalizePersistedMasterState).then(async ({ state }) => {
			if (!active) return;
			hasHydratedFromDbRef.current = true;
			applyNormalizedMasterStateToReact(state);
			await refreshStorageMetrics();
			if (state.user.subscriptionPurchaseSource === "google_play") reconcileGooglePlayEntitlements(state.user).then((rec) => {
				if (!active) return;
				if (rec.patch) setUser((prev) => ({
					...prev,
					...rec.patch
				}));
			});
		});
		return () => {
			active = false;
		};
	}, []);
	const computedStreak = (0, import_react.useMemo)(() => computeLearningStreak({
		learningEvents,
		salahRecords,
		dailyVerseActivity
	}), [
		learningEvents,
		salahRecords,
		dailyVerseActivity
	]);
	const effectiveUser = (0, import_react.useMemo)(() => ({
		...user,
		streakDays: computedStreak.currentStreakDays
	}), [user, computedStreak.currentStreakDays]);
	const currentMasterStateSnapshot = (0, import_react.useMemo)(() => ({
		schemaVersion: 2,
		user: effectiveUser,
		dailyVerseActivity,
		learningEvents,
		studiedNames99Numbers,
		recentlyOpenedSurahs,
		bookmarks,
		personalNotes,
		hifzPlans,
		revisionItems,
		salahRecords,
		favoriteDuaIds,
		seerahMilestoneIds,
		completedLessonIds,
		masteredVocabIds,
		quizAttempts,
		tasks,
		expenses,
		childrenProfiles,
		activeChildId
	}), [
		effectiveUser,
		dailyVerseActivity,
		learningEvents,
		studiedNames99Numbers,
		recentlyOpenedSurahs,
		bookmarks,
		personalNotes,
		hifzPlans,
		revisionItems,
		salahRecords,
		favoriteDuaIds,
		seerahMilestoneIds,
		completedLessonIds,
		masteredVocabIds,
		quizAttempts,
		tasks,
		expenses,
		childrenProfiles,
		activeChildId
	]);
	(0, import_react.useEffect)(() => {
		if (!hasHydratedFromDbRef.current) return;
		saveMasterStateToLocalDb(currentMasterStateSnapshot).then(() => {
			refreshStorageMetrics();
		});
	}, [currentMasterStateSnapshot]);
	const activeChild = childrenProfiles.find((c) => c.id === activeChildId) || childrenProfiles[0];
	const isKidsScreenTimeLocked = (0, import_react.useMemo)(() => {
		if (!activeChild) return false;
		return isChildScreenTimeLimitReached(activeChild, /* @__PURE__ */ new Date(), user.kidsDailyResetHour ?? 0);
	}, [activeChild, user.kidsDailyResetHour]);
	isKidsScreenTimeLockedRef.current = mode === "kids" && isKidsScreenTimeLocked;
	(0, import_react.useEffect)(() => {
		if (mode === "kids" && isKidsScreenTimeLocked) audioManager.stopAll();
	}, [mode, isKidsScreenTimeLocked]);
	(0, import_react.useEffect)(() => {
		if (mode !== "kids" || !activeChild) return;
		if (typeof document === "undefined" || typeof window === "undefined") return;
		const getMonotonicNow = () => typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
		let lastMonotonicMs = getMonotonicNow();
		let isWindowFocused = typeof document.hasFocus === "function" ? document.hasFocus() : true;
		const handleVisibilityChange = () => {
			lastMonotonicMs = getMonotonicNow();
		};
		const handleFocus = () => {
			isWindowFocused = true;
			lastMonotonicMs = getMonotonicNow();
		};
		const handleBlur = () => {
			isWindowFocused = false;
			lastMonotonicMs = getMonotonicNow();
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("focus", handleFocus);
		window.addEventListener("blur", handleBlur);
		const intervalId = window.setInterval(() => {
			const nowMonotonicMs = getMonotonicNow();
			const elapsedMs = Math.max(0, nowMonotonicMs - lastMonotonicMs);
			lastMonotonicMs = nowMonotonicMs;
			const isForegroundAndVisible = document.visibilityState === "visible" && isWindowFocused;
			const wallClockNow = /* @__PURE__ */ new Date();
			setChildrenProfiles((prev) => prev.map((c) => {
				if (c.id !== activeChild.id) return c;
				const res = accumulateKidsForegroundUsage({
					child: c,
					elapsedMs,
					isForegroundAndVisible,
					now: wallClockNow,
					resetHour: user.kidsDailyResetHour ?? 0
				});
				if (res.limitReached) audioManager.stopAll();
				return res.updatedChild;
			}));
		}, 1e3);
		return () => {
			window.clearInterval(intervalId);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("focus", handleFocus);
			window.removeEventListener("blur", handleBlur);
		};
	}, [
		mode,
		activeChild?.id,
		user.kidsDailyResetHour
	]);
	const [systemPrefersDark, setSystemPrefersDark] = (0, import_react.useState)(() => getSystemPrefersDark());
	const themeMode = (0, import_react.useMemo)(() => {
		if (user.themeMode === "light" || user.themeMode === "dark" || user.themeMode === "system") return user.themeMode;
		return loadThemeMode(user.darkMode);
	}, [user.themeMode, user.darkMode]);
	const resolvedTheme = (0, import_react.useMemo)(() => resolveThemeMode(themeMode, systemPrefersDark), [themeMode, systemPrefersDark]);
	(0, import_react.useEffect)(() => {
		return subscribeSystemThemeChanges((prefersDark) => {
			setSystemPrefersDark(prefersDark);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		applyThemeToDocument(themeMode, systemPrefersDark);
		saveThemeMode(themeMode);
	}, [themeMode, systemPrefersDark]);
	const setThemeMode = (0, import_react.useCallback)((nextMode) => {
		const nextResolved = resolveThemeMode(nextMode, getSystemPrefersDark());
		saveThemeMode(nextMode);
		applyThemeToDocument(nextMode, getSystemPrefersDark());
		setUser((prev) => ({
			...prev,
			themeMode: nextMode,
			darkMode: nextResolved === "dark"
		}));
	}, []);
	const updateUser = (patch) => {
		setUser((prev) => {
			const next = {
				...prev,
				...patch
			};
			if (typeof patch.themeMode === "string") next.darkMode = resolveThemeMode(patch.themeMode, systemPrefersDark) === "dark";
			else if (typeof patch.darkMode === "boolean" && patch.themeMode === void 0) next.themeMode = patch.darkMode ? "dark" : "light";
			return next;
		});
	};
	const setLanguage = (lang) => {
		translationService.setLanguage(lang);
		updateUser({ language: lang });
	};
	(0, import_react.useEffect)(() => {
		translationService.setLanguage(user.language);
	}, [user.language]);
	const languageMeta = (0, import_react.useMemo)(() => translationService.getLanguageMetadata(user.language), [user.language]);
	const uiLabels = (0, import_react.useMemo)(() => translationService.loadDictionary(user.language), [user.language]);
	const translate = (key, params) => translationService.translate(key, user.language, params);
	const resolveText = (content, fallback = "") => translationService.resolveLocalizedContent(content, user.language, fallback);
	const isAudioMuted = Boolean(user.isMuted);
	const autoPlayRecitation = false;
	(0, import_react.useEffect)(() => {
		audioManager.setMuted(isAudioMuted);
	}, [isAudioMuted]);
	(0, import_react.useEffect)(() => {
		audioManager.setPlaybackRate(user.playbackRate || 1);
	}, [user.playbackRate]);
	const toggleAudioMute = (0, import_react.useCallback)(() => {
		setUser((prev) => {
			const nextMuted = !prev.isMuted;
			audioManager.setMuted(nextMuted);
			return {
				...prev,
				isMuted: nextMuted,
				autoPlayRecitation: false
			};
		});
	}, []);
	const toggleAutoPlayRecitation = toggleAudioMute;
	const logLearningEvent = (type, referenceId, title, eventMode = "adult", childId, value) => {
		setLearningEvents((prev) => appendLearningEvent(prev, {
			type,
			referenceId,
			title,
			mode: eventMode,
			childId,
			value
		}));
	};
	const markName99Studied = (nameNumber, transliteration) => {
		setStudiedNames99Numbers((prev) => prev.includes(nameNumber) ? prev : [...prev, nameNumber]);
		logLearningEvent("name99_studied", `name99_${nameNumber}`, `Studied ${transliteration} (#${nameNumber})`);
	};
	const recordVerseRead = (surahNumber, ayahNumber) => {
		const surahMeta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
		const surahName = surahMeta ? surahMeta.nameTranslit : `Surah ${surahNumber}`;
		setDailyVerseActivity((prev) => recordDailyVerseRead(prev, surahNumber, ayahNumber, getLocalDateKey()));
		logLearningEvent("quran_ayah_read", `${surahNumber}:${ayahNumber}`, `Read ${surahName} ${surahNumber}:${ayahNumber}`);
	};
	const openSurahForReading = (surahNumber, ayahNumber = 1) => {
		const surahMeta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
		const resolvedName = surahMeta ? surahMeta.nameTranslit : `Surah ${surahNumber}`;
		setSelectedSurahNumber(surahNumber);
		setAdultRoute("quran_read");
		setRecentlyOpenedSurahs((prev) => [surahNumber, ...prev.filter((n) => n !== surahNumber)].slice(0, 8));
		setUser((prev) => ({
			...prev,
			lastRead: {
				surahNumber,
				surahName: resolvedName,
				ayahNumber
			}
		}));
	};
	const toggleBookmark = (bm) => {
		setBookmarks((prev) => {
			const exists = prev.find((item) => item.surahNumber === bm.surahNumber && item.ayahNumber === bm.ayahNumber);
			if (exists) return prev.filter((item) => item.id !== exists.id);
			return [{
				...bm,
				id: `bm_${Date.now()}`,
				createdAt: getTodayKey()
			}, ...prev];
		});
	};
	const updateBookmarkMeta = (bookmarkId, patch) => {
		setBookmarks((prev) => prev.map((item) => item.id === bookmarkId ? {
			...item,
			...patch,
			updatedAt: getTodayKey()
		} : item));
	};
	const addPersonalNote = (title, body, surahReference, surahNumber, ayahNumber, extra) => {
		if (!title.trim() || !body.trim()) return;
		setPersonalNotes((prev) => [{
			id: `note_${Date.now()}`,
			title: title.trim(),
			body: body.trim(),
			surahReference: surahReference?.trim() || void 0,
			surahNumber,
			ayahNumber,
			tags: extra?.tags,
			tadabburPrompt: extra?.tadabburPrompt,
			noteType: extra?.noteType || "note",
			createdAt: getTodayKey(),
			updatedAt: getTodayKey()
		}, ...prev]);
	};
	const editPersonalNote = (noteId, patch) => {
		setPersonalNotes((prev) => prev.map((n) => n.id === noteId ? {
			...n,
			...patch,
			updatedAt: getTodayKey()
		} : n));
	};
	const deletePersonalNote = (noteId) => {
		setPersonalNotes((prev) => prev.filter((n) => n.id !== noteId));
	};
	const updateHifzProgress = (surahNumber, memorizedAyahs) => {
		setHifzUndoSnapshot({
			hifzPlans,
			revisionItems
		});
		const nowIso = (/* @__PURE__ */ new Date()).toISOString();
		setHifzPlans((prev) => prev.map((plan) => {
			if (plan.surahNumber !== surahNumber) return plan;
			const clamped = Math.max(0, Math.min(plan.totalAyahs, memorizedAyahs));
			const status = clamped >= plan.totalAyahs ? "completed" : clamped > 0 ? "in_progress" : "not_started";
			return {
				...plan,
				memorizedAyahs: clamped,
				lastPracticedAt: "Today",
				lastPracticedAtIso: nowIso,
				status,
				memorizationState: deriveHifzPlanState(clamped, plan.totalAyahs, false, 3)
			};
		}));
		logLearningEvent("hifz_progress", `hifz_${surahNumber}:${memorizedAyahs}`, `Updated Hifz progress for Surah ${surahNumber} (${memorizedAyahs} Ayahs)`);
	};
	const addHifzPlan = (surahNumber, dailyTargetAyahs, ayahRange) => {
		const surahMeta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
		if (!surahMeta) return;
		setHifzUndoSnapshot({
			hifzPlans,
			revisionItems
		});
		const parsedRange = parseHifzAyahRange(ayahRange, surahMeta.ayahCount);
		const nowIso = (/* @__PURE__ */ new Date()).toISOString();
		const todayKey = getLocalDateKey();
		setHifzPlans((prev) => {
			if (prev.find((p) => p.surahNumber === surahNumber)) return prev.map((p) => p.surahNumber === surahNumber ? {
				...p,
				dailyTargetAyahs,
				ayahRange: parsedRange.label,
				startAyah: parsedRange.startAyah,
				endAyah: parsedRange.endAyah,
				status: p.memorizedAyahs >= p.totalAyahs ? "completed" : "in_progress",
				memorizationState: deriveHifzPlanState(p.memorizedAyahs, p.totalAyahs, true, 1),
				lastPracticedAt: "Plan updated today",
				lastPracticedAtIso: nowIso
			} : p);
			return [{
				surahNumber: surahMeta.number,
				surahName: surahMeta.nameTranslit,
				totalAyahs: surahMeta.ayahCount,
				memorizedAyahs: 0,
				lastPracticedAt: "Created today",
				lastPracticedAtIso: nowIso,
				status: "in_progress",
				memorizationState: "learning",
				dailyTargetAyahs,
				ayahRange: parsedRange.label,
				startAyah: parsedRange.startAyah,
				endAyah: parsedRange.endAyah
			}, ...prev];
		});
		setRevisionItems((prev) => {
			if (prev.some((r) => r.surahNumber === surahNumber && r.ayahRange === parsedRange.label)) return prev;
			return [{
				id: `rev_${surahNumber}_${Date.now()}`,
				surahNumber: surahMeta.number,
				surahName: surahMeta.nameTranslit,
				ayahRange: parsedRange.label,
				startAyah: parsedRange.startAyah,
				endAyah: parsedRange.endAyah,
				dueStatus: "due_today",
				dueDate: "Due Today",
				nextReviewAt: todayKey,
				lastPracticedAt: nowIso,
				intervalDays: 1,
				difficulty: "medium",
				attemptsCount: 0,
				memorizationState: "revision_due"
			}, ...prev];
		});
	};
	const resetHifzPlan = (surahNumber) => {
		setHifzUndoSnapshot({
			hifzPlans,
			revisionItems
		});
		setHifzPlans((prev) => prev.map((p) => p.surahNumber === surahNumber ? {
			...p,
			memorizedAyahs: 0,
			status: "not_started",
			memorizationState: "not_started",
			lastPracticedAt: "Reset today"
		} : p));
	};
	const undoLastHifzAction = () => {
		if (!hifzUndoSnapshot) return;
		setHifzPlans(hifzUndoSnapshot.hifzPlans);
		setRevisionItems(hifzUndoSnapshot.revisionItems);
		setHifzUndoSnapshot(null);
	};
	const recordRevisionAttempt = (id, quality) => {
		setHifzUndoSnapshot({
			hifzPlans,
			revisionItems
		});
		const now = /* @__PURE__ */ new Date();
		setRevisionItems((prev) => prev.map((item) => {
			if (item.id !== id) return item;
			return scheduleHifzRevision(item, quality, now);
		}));
		logLearningEvent("hifz_revision", `${id}_${quality}`, `Logged Hifz revision (${quality})`);
	};
	const togglePrayerStatus = (date, prayer) => {
		setSalahRecords((prev) => {
			const existing = prev[date] || createEmptySalahDayRecord(date);
			const order = [
				"pending",
				"prayed_on_time",
				"prayed",
				"qaza"
			];
			const current = existing.prayers[prayer];
			const next = order[(order.indexOf(current) + 1) % order.length];
			if (next === "prayed_on_time" || next === "prayed") logLearningEvent("salah_logged", `${date}_${prayer}`, `Logged ${prayer} (${next})`);
			return {
				...prev,
				[date]: {
					...existing,
					updatedAtIso: (/* @__PURE__ */ new Date()).toISOString(),
					prayers: {
						...existing.prayers,
						[prayer]: next
					}
				}
			};
		});
	};
	const setPrayerStatusExplicit = (date, prayer, status) => {
		setSalahRecords((prev) => {
			const existing = prev[date] || createEmptySalahDayRecord(date);
			if (status === "prayed_on_time" || status === "prayed") logLearningEvent("salah_logged", `${date}_${prayer}`, `Logged ${prayer} (${status})`);
			return {
				...prev,
				[date]: {
					...existing,
					updatedAtIso: (/* @__PURE__ */ new Date()).toISOString(),
					prayers: {
						...existing.prayers,
						[prayer]: status
					}
				}
			};
		});
	};
	const toggleExcusedSalahDay = (dateKey, excused, note) => {
		setSalahRecords((prev) => {
			const existing = prev[dateKey] || createEmptySalahDayRecord(dateKey);
			return {
				...prev,
				[dateKey]: markDayAsExcused(existing, dateKey, excused, note)
			};
		});
	};
	const salahAnalytics = (0, import_react.useMemo)(() => computeSalahStatsWithExcusedBridge(salahRecords, getLocalDateKey()), [salahRecords]);
	const setUserMadhhab = (madhhab) => {
		updateUser({
			madhhab,
			prayerAsrSchool: madhhab === "Hanafi" ? 1 : 0
		});
	};
	const toggleExcusedPrayerMode = () => {
		setUser((prev) => ({
			...prev,
			excusedPrayerModeEnabled: !prev.excusedPrayerModeEnabled
		}));
	};
	const toggleFavoriteDua = (duaId) => {
		setFavoriteDuaIds((prev) => {
			const next = prev.includes(duaId) ? prev.filter((id) => id !== duaId) : [...prev, duaId];
			if (!prev.includes(duaId)) logLearningEvent("dua_studied", duaId, `Saved Dua ${duaId}`);
			return next;
		});
	};
	const toggleSeerahMilestone = (eventId) => {
		setSeerahMilestoneIds((prev) => {
			const isAdding = !prev.includes(eventId);
			if (isAdding) logLearningEvent("seerah_completed", eventId, `Completed Seerah milestone ${eventId}`);
			return isAdding ? [...prev, eventId] : prev.filter((id) => id !== eventId);
		});
	};
	const markLessonCompleted = (lessonId) => {
		setCompletedLessonIds((prev) => prev.includes(lessonId) ? prev : [...prev, lessonId]);
		logLearningEvent("lesson_completed", lessonId, `Completed lesson ${lessonId}`);
	};
	const toggleVocabMastered = (vocabId) => {
		setMasteredVocabIds((prev) => {
			const isAdding = !prev.includes(vocabId);
			if (isAdding) logLearningEvent("vocab_mastered", vocabId, `Mastered Quranic word ${vocabId}`);
			return isAdding ? [...prev, vocabId] : prev.filter((id) => id !== vocabId);
		});
	};
	const recordQuizAttempt = (attempt) => {
		const now = /* @__PURE__ */ new Date();
		const todayKey = getLocalDateKey(now);
		setQuizAttempts((prev) => [{
			...attempt,
			id: `qa_${now.getTime()}`,
			completedAt: "Today",
			completedAtIso: now.toISOString(),
			dateKey: todayKey
		}, ...prev]);
		logLearningEvent("quiz_completed", `${attempt.quizId}_${now.getTime()}`, `Completed ${attempt.quizTitle} (${attempt.score}/${attempt.total})`, attempt.mode, attempt.childId, attempt.score);
	};
	const addTask = (task) => {
		setTasks((prev) => [{
			...task,
			id: `task_${Date.now()}`,
			completed: false
		}, ...prev]);
	};
	const toggleTask = (taskId) => {
		setTasks((prev) => prev.map((t) => t.id === taskId ? {
			...t,
			completed: !t.completed
		} : t));
	};
	const deleteTask = (taskId) => {
		setTasks((prev) => prev.filter((t) => t.id !== taskId));
	};
	const addExpense = (entry) => {
		setExpenses((prev) => [{
			...entry,
			id: `exp_${Date.now()}`
		}, ...prev]);
	};
	const deleteExpense = (id) => {
		setExpenses((prev) => prev.filter((e) => e.id !== id));
	};
	const addChildProfile = (name, age, avatar, dailyGoalMinutes = 10) => {
		if (childrenProfiles.length >= 5) return;
		const newChild = {
			id: `child_${Date.now()}`,
			name,
			age,
			avatar,
			dailyGoalMinutes,
			activeMinutesToday: 0,
			stars: 10,
			streakDays: 1,
			questStepsCompleted: {
				quran: false,
				dua: false,
				quiz: false,
				salah: false,
				family: false
			},
			pillarProgress: {
				quranLessons: 1,
				duasPracticed: 1,
				salahLessons: 1,
				akhlaqDeeds: 1
			},
			unlockedAdventureNode: 2,
			needsPractice: [],
			goodDeeds: [],
			earnedBadgeIds: ["badge_quran"],
			completedSurahs: ["Surah Al-Ikhlas"],
			recentActivities: [{
				id: `ra_${Date.now()}`,
				title: "Joined Ilmizo Kids World",
				pillar: "quran",
				timestamp: "Just now"
			}]
		};
		setChildrenProfiles((prev) => [...prev, newChild]);
		setActiveChildId(newChild.id);
	};
	const updateChildProfile = (childId, patch) => {
		setChildrenProfiles((prev) => prev.map((c) => c.id === childId ? {
			...c,
			...patch
		} : c));
	};
	const deleteChildProfile = (childId) => {
		if (childrenProfiles.length <= 1) return;
		const remaining = childrenProfiles.filter((c) => c.id !== childId);
		setChildrenProfiles(remaining);
		if (activeChildId === childId && remaining.length > 0) setActiveChildId(remaining[0].id);
	};
	const completeKidsQuestStep = (step, title, completedSurahTitle) => {
		const nowDate = /* @__PURE__ */ new Date();
		const resetHour = user.kidsDailyResetHour ?? 0;
		setChildrenProfiles((prev) => prev.map((child) => {
			if (child.id !== activeChild.id) return child;
			const { updatedChild } = applyChildQuestCompletion(child, step, title, completedSurahTitle, getLocalDateKey(nowDate), resetHour, nowDate);
			return updatedChild;
		}));
		const eventType = step === "quran" ? "quran_ayah_read" : step === "dua" ? "dua_studied" : step === "salah" ? "salah_logged" : step === "quiz" ? "quiz_completed" : "lesson_completed";
		const stableReferenceId = completedSurahTitle ? `kids_${step}_${normalizeSurahCertificateTitle(completedSurahTitle).toLowerCase().replace(/\s+/g, "_")}` : `kids_quest_${step}`;
		logLearningEvent(eventType, stableReferenceId, title, "kids", activeChild.id);
	};
	const completeKidsStory = (storyId, storyTitle) => {
		const cleanId = (storyId || "").trim();
		const existingStories = Array.isArray(activeChild?.completedStoryIds) ? activeChild.completedStoryIds : [];
		const alreadyCompleted = Boolean(cleanId && existingStories.includes(cleanId));
		const nowDate = /* @__PURE__ */ new Date();
		const resetHour = user.kidsDailyResetHour ?? 0;
		setChildrenProfiles((prev) => prev.map((child) => {
			if (child.id !== activeChild.id) return child;
			const { updatedChild } = applyChildStoryCompletion(child, cleanId, storyTitle, getLocalDateKey(nowDate), resetHour, nowDate);
			return updatedChild;
		}));
		if (!alreadyCompleted && cleanId) {
			logLearningEvent("lesson_completed", `kids_story_${cleanId}`, `Story Completed: ${storyTitle}`, "kids", activeChild.id, 5);
			return {
				starsAwarded: 5,
				alreadyCompleted: false
			};
		}
		return {
			starsAwarded: 0,
			alreadyCompleted: true
		};
	};
	const completeQaidaLesson = (lessonId, lessonTitle, starsReward = 10, quizScorePct = 100) => {
		const cleanId = (lessonId || "").trim();
		const existing = Array.isArray(activeChild?.completedQaidaLessonIds) ? activeChild.completedQaidaLessonIds : [];
		const alreadyCompleted = Boolean(cleanId && existing.includes(cleanId));
		const awarded = alreadyCompleted ? 0 : Math.max(5, starsReward);
		setChildrenProfiles((prev) => prev.map((child) => {
			if (child.id !== activeChild.id) return child;
			const prevIds = Array.isArray(child.completedQaidaLessonIds) ? child.completedQaidaLessonIds : [];
			const nextIds = cleanId && !prevIds.includes(cleanId) ? [...prevIds, cleanId] : prevIds;
			const prevScores = child.qaidaQuizScores || {};
			const nextScores = cleanId ? {
				...prevScores,
				[cleanId]: Math.max(prevScores[cleanId] || 0, quizScorePct)
			} : prevScores;
			return {
				...child,
				stars: child.stars + awarded,
				completedQaidaLessonIds: nextIds,
				qaidaQuizScores: nextScores,
				pillarProgress: {
					...child.pillarProgress,
					quranLessons: child.pillarProgress.quranLessons + (alreadyCompleted ? 0 : 1)
				},
				recentActivities: [{
					id: `ra_qaida_${Date.now()}`,
					title: `Qaida: ${lessonTitle}`,
					pillar: "quran",
					timestamp: "Just now"
				}, ...child.recentActivities.slice(0, 9)]
			};
		}));
		if (!alreadyCompleted && cleanId) logLearningEvent("lesson_completed", `kids_qaida_${cleanId}`, `Noorani Qaida: ${lessonTitle}`, "kids", activeChild.id, awarded);
		return {
			starsAwarded: awarded,
			alreadyCompleted
		};
	};
	const addNeedsPracticeItem = (pillar, title, prompt, targetRoute) => {
		setChildrenProfiles((prev) => prev.map((child) => {
			if (child.id !== activeChild.id) return child;
			const existing = child.needsPractice.find((np) => np.title === title && !np.resolved);
			if (existing) return {
				...child,
				needsPractice: child.needsPractice.map((np) => np.id === existing.id ? {
					...np,
					mistakeCount: np.mistakeCount + 1,
					lastAttemptAt: "Just now"
				} : np)
			};
			return {
				...child,
				needsPractice: [{
					id: `np_${Date.now()}`,
					pillar,
					title,
					prompt,
					targetRoute,
					mistakeCount: 1,
					lastAttemptAt: "Just now",
					resolved: false
				}, ...child.needsPractice]
			};
		}));
	};
	const resolveNeedsPracticeItem = (itemId) => {
		let resolvedTitle = "Needs Practice Item";
		let wasUnresolved = false;
		setChildrenProfiles((prev) => prev.map((child) => {
			if (child.id !== activeChild.id) return child;
			const target = child.needsPractice.find((np) => np.id === itemId);
			if (!target || target.resolved) return child;
			wasUnresolved = true;
			resolvedTitle = target.title;
			const draft = {
				...child,
				stars: child.stars + 5,
				needsPractice: child.needsPractice.map((np) => np.id === itemId ? {
					...np,
					resolved: true
				} : np)
			};
			const badgeEval = evaluateChildBadgesAndMilestones(draft);
			return {
				...draft,
				earnedBadgeIds: badgeEval.earnedBadgeIds,
				unlockedAdventureNode: badgeEval.unlockedAdventureNode
			};
		}));
		if (wasUnresolved) logLearningEvent("lesson_completed", `kids_review_${itemId}`, `Reviewed & Resolved: ${resolvedTitle}`, "kids", activeChild.id);
	};
	const submitKidsGoodDeed = (title, description) => {
		const cleanTitle = title.trim();
		if (!cleanTitle) return;
		let added = false;
		setChildrenProfiles((prev) => prev.map((child) => {
			if (child.id !== activeChild.id) return child;
			if (child.goodDeeds.some((d) => !d.parentConfirmed && d.title.toLowerCase() === cleanTitle.toLowerCase())) return child;
			added = true;
			return {
				...child,
				goodDeeds: [{
					id: `gd_${Date.now()}`,
					title: cleanTitle,
					description,
					childReportedAt: "Just now (Awaiting Parent Confirmation)",
					parentConfirmed: false
				}, ...child.goodDeeds]
			};
		}));
		if (added) logLearningEvent("lesson_completed", `kids_deed_submitted_${cleanTitle.toLowerCase().replace(/\s+/g, "_")}`, `Reported Good Deed: ${cleanTitle}`, "kids", activeChild.id);
	};
	const confirmChildGoodDeed = (childId, deedId) => {
		let confirmedTitle = "Good Deed";
		let newlyConfirmed = false;
		setChildrenProfiles((prev) => prev.map((child) => {
			if (child.id !== childId) return child;
			const targetDeed = child.goodDeeds.find((d) => d.id === deedId);
			if (!targetDeed || targetDeed.parentConfirmed) return child;
			newlyConfirmed = true;
			confirmedTitle = targetDeed.title;
			const draft = {
				...child,
				stars: child.stars + 10,
				pillarProgress: {
					...child.pillarProgress,
					akhlaqDeeds: child.pillarProgress.akhlaqDeeds + 1
				},
				goodDeeds: child.goodDeeds.map((d) => d.id === deedId ? {
					...d,
					parentConfirmed: true
				} : d)
			};
			const badgeEval = evaluateChildBadgesAndMilestones(draft);
			return {
				...draft,
				earnedBadgeIds: badgeEval.earnedBadgeIds,
				unlockedAdventureNode: badgeEval.unlockedAdventureNode
			};
		}));
		if (newlyConfirmed) logLearningEvent("lesson_completed", `kids_deed_confirmed_${deedId}`, `Parent Verified Good Deed: ${confirmedTitle}`, "kids", childId);
	};
	const incrementTasbih = () => {
		setUser((prev) => {
			const nextCount = prev.tasbihCount + 1;
			const nextTotal = prev.tasbihTotal + 1;
			const key = String(prev.activeDhikrIndex || 0);
			const prevDhikrCounts = prev.dhikrCounts || {};
			if (nextCount % 33 === 0) logLearningEvent("tasbih_milestone", `dhikr_${key}_${nextTotal}`, `Completed 33 Dhikr cycle`);
			return {
				...prev,
				tasbihCount: nextCount,
				tasbihTotal: nextTotal,
				dhikrCounts: {
					...prevDhikrCounts,
					[key]: (prevDhikrCounts[key] || 0) + 1
				}
			};
		});
	};
	const resetTasbih = () => {
		setUser((prev) => ({
			...prev,
			tasbihCount: 0
		}));
	};
	const setActiveDhikr = (idx) => {
		setUser((prev) => ({
			...prev,
			activeDhikrIndex: idx,
			tasbihCount: 0
		}));
	};
	const exportAllDataJson = () => {
		const exportedAtIso = (/* @__PURE__ */ new Date()).toISOString();
		setUser((prev) => ({
			...prev,
			lastBackupExportedAtIso: exportedAtIso
		}));
		return createBackupBundle({
			...currentMasterStateSnapshot,
			user: {
				...currentMasterStateSnapshot.user,
				lastBackupExportedAtIso: exportedAtIso
			}
		});
	};
	const isParentPinConfigured = Boolean(user.parentPinSetupCompleted || user.parentPinVerifier || user.parentPin);
	const [pendingPinSetup, setPendingPinSetup] = (0, import_react.useState)(null);
	const verifyEnteredParentPin = async (enteredPin) => {
		const targetVerifier = user.parentPinVerifier || user.parentPin;
		if (!targetVerifier) return false;
		return verifyParentPinAsync(enteredPin, targetVerifier);
	};
	const unlockKidsScreenTime = (pin, action) => {
		if (!activeChild) return {
			ok: false,
			error: "No active child profile found."
		};
		const res = unlockChildScreenTimeWithPin({
			child: activeChild,
			enteredPin: pin,
			storedParentPin: user.parentPin,
			storedPinVerifier: user.parentPinVerifier,
			action,
			now: /* @__PURE__ */ new Date(),
			resetHour: user.kidsDailyResetHour ?? 0
		});
		if (!res.ok) return {
			ok: false,
			error: res.error
		};
		setChildrenProfiles((prev) => prev.map((c) => c.id === activeChild.id ? res.updatedChild : c));
		return { ok: true };
	};
	const unlockKidsScreenTimeAsync = async (pin, action) => {
		if (!activeChild) return {
			ok: false,
			error: "No active child profile found."
		};
		if (!await verifyEnteredParentPin(pin)) return {
			ok: false,
			error: "Incorrect Parent PIN. Please enter the 4-digit PIN set in Parent Hub."
		};
		const now = /* @__PURE__ */ new Date();
		const resetHour = user.kidsDailyResetHour ?? 0;
		const rolled = ensureChildUsagePeriodRollover(activeChild, now, resetHour);
		const updatedChild = action === "unlock_today" ? {
			...rolled,
			screenTimeUnlockedForPeriodKey: rolled.usagePeriodKey
		} : {
			...rolled,
			extraMinutesGrantedToday: (rolled.extraMinutesGrantedToday || 0) + (action === "grant_15m" ? 15 : 10)
		};
		setChildrenProfiles((prev) => prev.map((c) => c.id === activeChild.id ? updatedChild : c));
		return { ok: true };
	};
	const redeemParentTimeVoucherAsync = async (voucherCode) => {
		if (!activeChild) return {
			ok: false,
			error: "No active child profile found."
		};
		const check = await verifyAndRedeemParentTimeVoucher({
			code: voucherCode,
			childId: activeChild.id,
			signingKey: user.parentPinVerifier
		});
		if (!check.ok || !check.action) return {
			ok: false,
			error: check.error || "Voucher could not be verified."
		};
		const now = /* @__PURE__ */ new Date();
		const resetHour = user.kidsDailyResetHour ?? 0;
		const rolled = ensureChildUsagePeriodRollover(activeChild, now, resetHour);
		const updatedChild = check.action === "unlock_today" ? {
			...rolled,
			screenTimeUnlockedForPeriodKey: rolled.usagePeriodKey
		} : {
			...rolled,
			extraMinutesGrantedToday: (rolled.extraMinutesGrantedToday || 0) + (check.action === "grant_15m" ? 15 : 10)
		};
		setChildrenProfiles((prev) => prev.map((c) => c.id === activeChild.id ? updatedChild : c));
		return {
			ok: true,
			action: check.action
		};
	};
	const beginParentPinSetup = async (currentPin, newPin) => {
		if (isParentPinConfigured) {
			if (!await verifyEnteredParentPin(currentPin)) return {
				ok: false,
				error: "Current 4-digit Parent PIN is incorrect."
			};
		}
		if (!isValidParentPinFormat(newPin)) return {
			ok: false,
			error: "New Parent PIN must be exactly 4 digits (0-9)."
		};
		const pinVerifier = await createParentPinVerifierAsync(newPin.trim());
		const generated = await generateParentRecoveryCodeAsync();
		setPendingPinSetup({
			recoveryCode: generated.recoveryCode,
			recoveryHash: generated.recoveryHash,
			pinVerifier,
			mode: isParentPinConfigured ? "change_pin" : "initial_setup"
		});
		return {
			ok: true,
			recoveryCode: generated.recoveryCode
		};
	};
	const beginRecoveryCodeRegeneration = async (currentPin) => {
		if (!isParentPinConfigured) return {
			ok: false,
			error: "Please set up a 4-digit Parent PIN first."
		};
		if (!await verifyEnteredParentPin(currentPin)) return {
			ok: false,
			error: "Current 4-digit Parent PIN is incorrect."
		};
		const pinVerifier = user.parentPinVerifier && user.parentPinVerifier.startsWith("pin_pbkdf2_v2$") ? user.parentPinVerifier : await createParentPinVerifierAsync(currentPin.trim());
		const generated = await generateParentRecoveryCodeAsync();
		setPendingPinSetup({
			recoveryCode: generated.recoveryCode,
			recoveryHash: generated.recoveryHash,
			pinVerifier,
			mode: "regenerate_recovery"
		});
		return {
			ok: true,
			recoveryCode: generated.recoveryCode
		};
	};
	const confirmPendingParentPinSetup = () => {
		if (!pendingPinSetup) return {
			ok: false,
			error: "No pending Parent PIN or recovery code setup to confirm."
		};
		const nowIso = (/* @__PURE__ */ new Date()).toISOString();
		const committed = pendingPinSetup;
		setUser((prev) => ({
			...prev,
			parentPin: void 0,
			parentPinVerifier: committed.pinVerifier,
			parentPinSetupCompleted: true,
			parentPinRecoveryHash: committed.recoveryHash,
			parentPinRecoveryCreatedAtIso: nowIso,
			recoveryCodeUsedAtIso: void 0
		}));
		setPendingPinSetup(null);
		return { ok: true };
	};
	const cancelPendingParentPinSetup = () => {
		setPendingPinSetup(null);
	};
	const setupParentPinWithRecovery = (currentPin, newPin) => {
		if (isParentPinConfigured && !verifyParentPin(currentPin, user.parentPinVerifier || user.parentPin)) return {
			ok: false,
			error: "Current 4-digit Parent PIN is incorrect."
		};
		if (!isValidParentPinFormat(newPin)) return {
			ok: false,
			error: "New Parent PIN must be exactly 4 digits (0-9)."
		};
		const generated = generateParentRecoveryCode();
		const pinVerifier = createParentPinVerifierSync(newPin.trim());
		setPendingPinSetup({
			recoveryCode: generated.recoveryCode,
			recoveryHash: generated.recoveryHash,
			pinVerifier,
			mode: isParentPinConfigured ? "change_pin" : "initial_setup"
		});
		return {
			ok: true,
			recoveryCode: generated.recoveryCode
		};
	};
	const generateNewRecoveryCodeForCurrentPin = (currentPin) => {
		if (!verifyParentPin(currentPin, user.parentPinVerifier || user.parentPin)) return {
			ok: false,
			error: "Current 4-digit Parent PIN is incorrect."
		};
		const generated = generateParentRecoveryCode();
		const pinVerifier = user.parentPinVerifier || createParentPinVerifierSync(currentPin.trim());
		setPendingPinSetup({
			recoveryCode: generated.recoveryCode,
			recoveryHash: generated.recoveryHash,
			pinVerifier,
			mode: "regenerate_recovery"
		});
		return {
			ok: true,
			recoveryCode: generated.recoveryCode
		};
	};
	const resetParentPinWithRecoveryCode = (recoveryCode, newPin) => {
		const res = verifyRecoveryCodeAndResetPin({
			enteredRecoveryCode: recoveryCode,
			storedRecoveryHash: user.parentPinRecoveryHash,
			newPin
		});
		if (!res.ok || !res.nextPinVerifier) return {
			ok: false,
			error: res.error
		};
		const nowIso = (/* @__PURE__ */ new Date()).toISOString();
		setUser((prev) => ({
			...prev,
			parentPin: void 0,
			parentPinVerifier: res.nextPinVerifier,
			parentPinSetupCompleted: true,
			parentPinRecoveryHash: void 0,
			recoveryCodeUsedAtIso: nowIso
		}));
		return { ok: true };
	};
	const resetParentPinWithRecoveryCodeAsync = async (recoveryCode, newPin) => {
		const res = await verifyRecoveryCodeAndResetPinAsync({
			enteredRecoveryCode: recoveryCode,
			storedRecoveryHash: user.parentPinRecoveryHash,
			newPin
		});
		if (!res.ok || !res.nextPinVerifier) return {
			ok: false,
			error: res.error
		};
		const nowIso = (/* @__PURE__ */ new Date()).toISOString();
		setUser((prev) => ({
			...prev,
			parentPin: void 0,
			parentPinVerifier: res.nextPinVerifier,
			parentPinSetupCompleted: true,
			parentPinRecoveryHash: void 0,
			recoveryCodeUsedAtIso: nowIso
		}));
		return { ok: true };
	};
	const downloadSurahOffline = async (surahNumber) => {
		const res = await downloadSurahForOfflineUse(surahNumber, user.language, user.reciterName);
		await refreshStorageMetrics();
		return {
			ok: res.ok,
			error: res.error
		};
	};
	const deleteOfflineSurah = async (surahNumber) => {
		await removeDownloadedOfflineSurah(surahNumber);
		await refreshStorageMetrics();
	};
	const clearCachedOnlineData = async () => {
		const res = await clearNonDownloadedApiCache();
		await refreshStorageMetrics();
		return res;
	};
	const previewBackupImport = (rawJson) => {
		return validateAndPreviewBackupJson(rawJson, normalizePersistedMasterState, { currentLocalUser: user });
	};
	const applyBackupImport = async (rawJson) => {
		const validation = validateAndPreviewBackupJson(rawJson, normalizePersistedMasterState, { currentLocalUser: user });
		if (!validation.valid || !validation.normalizedState) return {
			ok: false,
			error: validation.errors.join(" ") || "Invalid backup file."
		};
		const res = await applyValidatedImportWithRecovery(validation.normalizedState, currentMasterStateSnapshot);
		if (!res.ok) {
			await refreshStorageMetrics();
			return res;
		}
		applyNormalizedMasterStateToReact(res.appliedState || validation.normalizedState);
		await refreshStorageMetrics();
		return res;
	};
	const restorePreImportBackup = async () => {
		const res = await restorePreImportRecoverySnapshot(normalizePersistedMasterState);
		if (!res.ok || !res.restoredState) return {
			ok: false,
			error: res.error
		};
		applyNormalizedMasterStateToReact(res.restoredState);
		await refreshStorageMetrics();
		return { ok: true };
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IlmizoContext.Provider, {
		value: {
			mode,
			setMode,
			adultRoute,
			setAdultRoute,
			kidsRoute,
			setKidsRoute: setKidsRouteGuarded,
			adultHistory,
			kidsHistory,
			canGoBack,
			goBack,
			registerSubScreenBackHandler,
			parentHubUnlocked,
			setParentHubUnlocked,
			selectedSurahNumber,
			openSurahForReading,
			dailyVerseActivity,
			recordVerseRead,
			learningEvents,
			logLearningEvent,
			studiedNames99Numbers,
			markName99Studied,
			recentlyOpenedSurahs,
			user: {
				...effectiveUser,
				darkMode: resolvedTheme === "dark",
				themeMode
			},
			updateUser,
			themeMode,
			resolvedTheme,
			setThemeMode,
			autoPlayRecitation,
			toggleAutoPlayRecitation,
			isAudioMuted,
			toggleAudioMute,
			setLanguage,
			languageMeta,
			uiLabels,
			translate,
			resolveText,
			bookmarks,
			toggleBookmark,
			updateBookmarkMeta,
			personalNotes,
			addPersonalNote,
			editPersonalNote,
			deletePersonalNote,
			hifzPlans,
			updateHifzProgress,
			addHifzPlan,
			resetHifzPlan,
			canUndoHifz: Boolean(hifzUndoSnapshot),
			undoLastHifzAction,
			revisionItems,
			recordRevisionAttempt,
			salahRecords,
			togglePrayerStatus,
			setPrayerStatusExplicit,
			toggleExcusedSalahDay,
			salahAnalytics,
			setUserMadhhab,
			toggleExcusedPrayerMode,
			favoriteDuaIds,
			toggleFavoriteDua,
			seerahMilestoneIds,
			toggleSeerahMilestone,
			completedLessonIds,
			markLessonCompleted,
			masteredVocabIds,
			toggleVocabMastered,
			quizAttempts,
			recordQuizAttempt,
			tasks,
			addTask,
			toggleTask,
			deleteTask,
			expenses,
			addExpense,
			deleteExpense,
			childrenProfiles,
			activeChildId,
			activeChild,
			setActiveChildId,
			addChildProfile,
			updateChildProfile,
			deleteChildProfile,
			completeKidsQuestStep,
			completeKidsStory,
			completeQaidaLesson,
			addNeedsPracticeItem,
			resolveNeedsPracticeItem,
			submitKidsGoodDeed,
			confirmChildGoodDeed,
			incrementTasbih,
			resetTasbih,
			setActiveDhikr,
			exportAllDataJson,
			isKidsScreenTimeLocked,
			isParentPinConfigured,
			verifyEnteredParentPin,
			unlockKidsScreenTime,
			unlockKidsScreenTimeAsync,
			redeemParentTimeVoucherAsync,
			pendingPinSetup,
			beginParentPinSetup,
			beginRecoveryCodeRegeneration,
			confirmPendingParentPinSetup,
			cancelPendingParentPinSetup,
			setupParentPinWithRecovery,
			generateNewRecoveryCodeForCurrentPin,
			resetParentPinWithRecoveryCode,
			resetParentPinWithRecoveryCodeAsync,
			storageMetrics,
			refreshStorageMetrics,
			downloadSurahOffline,
			deleteOfflineSurah,
			clearCachedOnlineData,
			previewBackupImport,
			applyBackupImport,
			restorePreImportBackup
		},
		children
	});
};
function useIlmizo() {
	const ctx = (0, import_react.useContext)(IlmizoContext);
	if (!ctx) throw new Error("useIlmizo must be used inside IlmizoProvider");
	return ctx;
}
function useTranslation() {
	const { user, setLanguage, languageMeta, uiLabels, translate, resolveText } = useIlmizo();
	return {
		language: user.language,
		setLanguage,
		languageMeta,
		isRTL: languageMeta.dir === "rtl",
		uiLabels,
		t: translate,
		translate,
		resolveText,
		supportedLanguages: translationService.getSupportedLanguages()
	};
}
// src/services/onboardingPlanEngine.ts
var ONBOARDING_STORAGE_KEY = "ilmizo_onboarding_profile_v1";
var DEFAULT_LOCAL_ONBOARDING_PROFILE = {
	schemaVersion: 1,
	status: "pending",
	primaryMode: "family",
	adultGoal: "daily_quran",
	adultDailyMinutes: 10,
	childAgeBand: "7-9",
	childFocus: "balanced",
	planPaused: false,
	completedAtIso: null,
	lastActiveDateKey: null
};
/**
* Checks whether an existing user already has saved local Ilmizo data.
* Existing upgraders should NEVER be forced through first-run onboarding.
*/
function hasExistingLocalUserHistory() {
	if (typeof localStorage === "undefined") return false;
	try {
		return Boolean(localStorage.getItem("ilmizo_master_state_v1") || localStorage.getItem("ilmizo_azan_notification_prefs_v1"));
	} catch {
		return false;
	}
}
function loadLocalOnboardingProfile() {
	if (typeof localStorage === "undefined") return { ...DEFAULT_LOCAL_ONBOARDING_PROFILE };
	try {
		const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY);
		if (!raw) {
			if (hasExistingLocalUserHistory()) return {
				...DEFAULT_LOCAL_ONBOARDING_PROFILE,
				status: "skipped"
			};
			return { ...DEFAULT_LOCAL_ONBOARDING_PROFILE };
		}
		const parsed = JSON.parse(raw);
		return {
			schemaVersion: 1,
			status: parsed.status === "completed" || parsed.status === "skipped" || parsed.status === "pending" ? parsed.status : "pending",
			primaryMode: parsed.primaryMode === "adult" || parsed.primaryMode === "kids" || parsed.primaryMode === "family" ? parsed.primaryMode : "family",
			adultGoal: parsed.adultGoal === "daily_quran" || parsed.adultGoal === "salah_consistency" || parsed.adultGoal === "hifz_revision" || parsed.adultGoal === "family_tarbiyah" ? parsed.adultGoal : "daily_quran",
			adultDailyMinutes: parsed.adultDailyMinutes === 5 || parsed.adultDailyMinutes === 10 || parsed.adultDailyMinutes === 15 ? parsed.adultDailyMinutes : 10,
			childAgeBand: parsed.childAgeBand === "4-6" || parsed.childAgeBand === "7-9" || parsed.childAgeBand === "10-12" ? parsed.childAgeBand : "7-9",
			childFocus: parsed.childFocus === "qaida_basics" || parsed.childFocus === "stories_manners" || parsed.childFocus === "daily_duas" || parsed.childFocus === "balanced" ? parsed.childFocus : "balanced",
			planPaused: Boolean(parsed.planPaused),
			completedAtIso: typeof parsed.completedAtIso === "string" ? parsed.completedAtIso : null,
			lastActiveDateKey: typeof parsed.lastActiveDateKey === "string" ? parsed.lastActiveDateKey : null
		};
	} catch {
		return { ...DEFAULT_LOCAL_ONBOARDING_PROFILE };
	}
}
function saveLocalOnboardingProfile(profile) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(profile));
	} catch {}
}
function inferAgeBandFromAge(age) {
	if (age <= 6) return "4-6";
	if (age <= 9) return "7-9";
	return "10-12";
}
/**
* Generates a realistic, calm 7-Day Personalized Local Plan based on user goals and child age band.
*/
function buildSevenDayLocalPlan(profile, language = "en") {
	const isHinglish = language === "hinglish" || language === "hi";
	const aMin = profile.adultDailyMinutes;
	const kMin = profile.childAgeBand === "4-6" ? 8 : profile.childAgeBand === "7-9" ? 10 : 12;
	const adultTemplates = {
		daily_quran: [
			{
				task: isHinglish ? "Surah Al-Fatihah + 5 Ayahs Mushaf reading" : "Read 5 Ayahs in Uthmani Mushaf Mode",
				route: "quran_read"
			},
			{
				task: isHinglish ? "Read 5 Ayahs + 1 short Tadabbur reflection" : "Read 5 Ayahs with 1 reflection note",
				route: "quran_read"
			},
			{
				task: isHinglish ? "Morning & Evening Adhkar + 5 Ayahs" : "Morning Adhkar + 5 Quran Ayahs",
				route: "duas"
			},
			{
				task: isHinglish ? "Study Mode: 3 Ayahs with brief Tafsir" : "Study Mode: 3 Ayahs with brief Tafsir",
				route: "quran_read"
			},
			{
				task: isHinglish ? "Jumuah Surah Al-Kahf key verses" : "Jumuah reflection & Surah Al-Kahf verses",
				route: "quran_read"
			},
			{
				task: isHinglish ? "1 short Islamic lesson + Quran review" : "1 concise Islamic lesson + Quran reading",
				route: "lessons"
			},
			{
				task: isHinglish ? "Weekly calm recap & Surah bookmark check" : "Calm weekly recitation recap",
				route: "quran_read"
			}
		],
		salah_consistency: [
			{
				task: "Log all 5 daily prayers & review Wudu steps",
				route: "salah"
			},
			{
				task: "Pray on time + learn 1 post-Salah Dua",
				route: "duas"
			},
			{
				task: "Salah Khushu reflection + 3 Quran Ayahs",
				route: "salah"
			},
			{
				task: "Review Tashahhud & Durood pronunciation",
				route: "salah"
			},
			{
				task: "Jumuah preparation + Sunnah prayers",
				route: "salah"
			},
			{
				task: "Log 5 prayers + 1 Fiqh lesson",
				route: "lessons"
			},
			{
				task: "Weekly Salah rhythm review (zero guilt)",
				route: "salah"
			}
		],
		hifz_revision: [
			{
				task: "Memorize 3 new Ayahs + 3x Qari repeat",
				route: "hifz"
			},
			{
				task: "Revise yesterday’s Ayahs in Word Reveal",
				route: "hifz"
			},
			{
				task: "Memorize 3 new Ayahs + link to previous",
				route: "hifz"
			},
			{
				task: "Due Hifz spaced-repetition check",
				route: "hifz"
			},
			{
				task: "Recite full week’s Ayahs in Mushaf Mode",
				route: "quran_read"
			},
			{
				task: "Strengthen weak Ayahs from Hifz queue",
				route: "hifz"
			},
			{
				task: "Light revision & dua for retention",
				route: "duas"
			}
		],
		family_tarbiyah: [
			{
				task: "Read 3 Ayahs together + guide child’s Qaida",
				route: "quran_read"
			},
			{
				task: "Practice 1 family Sunnah Dua at mealtime",
				route: "duas"
			},
			{
				task: "Pray Maghrib together & log in tracker",
				route: "salah"
			},
			{
				task: "Read 1 Prophet story & discuss its moral",
				route: "lessons"
			},
			{
				task: "Jumuah family Surah recitation",
				route: "quran_read"
			},
			{
				task: "Review child’s week & praise 1 good deed",
				route: "duas"
			},
			{
				task: "Optional Family WhatsApp Progress Card",
				route: "salah"
			}
		]
	};
	const kidsTemplates = {
		qaida_basics: [
			{
				task: "Trace 3 Arabic letters + hear human audio",
				route: "quran_learning"
			},
			{
				task: "Noorani Qaida sound drill & 5Q check",
				route: "quran_learning"
			},
			{
				task: "Storybook break + 1 kindness choice",
				route: "stories"
			},
			{
				task: "Trace 3 more letters & review mistakes",
				route: "quran_learning"
			},
			{
				task: "Listen & repeat 1 short Juz Amma ayah",
				route: "quran_learning"
			},
			{
				task: "Practice 1 daily Sunnah Dua",
				route: "duas_learning"
			},
			{
				task: "Fun weekend mini quiz with Mizo",
				route: "daily_quiz"
			}
		],
		stories_manners: [
			{
				task: "Read 6-scene Prophet story + moral dilemma",
				route: "stories"
			},
			{
				task: "Practice 1 polite Sunnah Dua with Ayla",
				route: "duas_learning"
			},
			{
				task: "Quick 3-min Qaida letter tracing",
				route: "quran_learning"
			},
			{
				task: "Companion storybook + reflection question",
				route: "stories"
			},
			{
				task: "Wudu & Salah gentle step practice",
				route: "salah_learning"
			},
			{
				task: "Storybook + 1 family good deed",
				route: "stories"
			},
			{
				task: "Playful weekend story quiz",
				route: "daily_quiz"
			}
		],
		daily_duas: [
			{
				task: "Learn Dua before eating + repeat audio",
				route: "duas_learning"
			},
			{
				task: "Learn Dua before sleeping + review",
				route: "duas_learning"
			},
			{
				task: "Quick Qaida tracing warm-up",
				route: "quran_learning"
			},
			{
				task: "Wudu & Salah steps with Ayaan",
				route: "salah_learning"
			},
			{
				task: "Bedtime interactive storybook",
				route: "stories"
			},
			{
				task: "Dua leaving home + kindness deed",
				route: "duas_learning"
			},
			{
				task: "Weekly Dua mastery quiz",
				route: "daily_quiz"
			}
		],
		balanced: [
			{
				task: "Qaida Letter Tracing + Audio Drill",
				route: "quran_learning"
			},
			{
				task: "6-Scene Interactive Storybook",
				route: "stories"
			},
			{
				task: "Daily Sunnah Dua with Ayla",
				route: "duas_learning"
			},
			{
				task: "Qaida 5-Question Mastery Check",
				route: "quran_learning"
			},
			{
				task: "Wudu & Salah Practice with Ayaan",
				route: "salah_learning"
			},
			{
				task: "Interactive Storybook + Good Deed",
				route: "stories"
			},
			{
				task: "Gentle Weekend Quiz & Celebration",
				route: "daily_quiz"
			}
		]
	};
	const adultSeq = adultTemplates[profile.adultGoal];
	const kidsSeq = kidsTemplates[profile.childFocus];
	return [
		1,
		2,
		3,
		4,
		5,
		6,
		7
	].map((dayNum, idx) => ({
		dayNumber: dayNum,
		label: `Day ${dayNum}`,
		adultTask: adultSeq[idx].task,
		adultMinutes: aMin,
		kidsTask: kidsSeq[idx].task,
		kidsMinutes: kMin,
		targetAdultRoute: adultSeq[idx].route,
		targetKidsRoute: kidsSeq[idx].route
	}));
}
/**
* Missed-day kindness logic: never shames or punishes users when a day is missed.
* Offers a gentle 3-minute restart option if the user has been away for 2+ days.
*/
function evaluateMissedDayKindness(params) {
	if (params.planPaused) return {
		missedDays: 0,
		showWelcomeBack: true,
		toneTitle: "Routine Paused — Take Your Time",
		toneMessage: "Your progress is safely saved on this device. Resume whenever your family is ready.",
		suggestedQuickMinutes: 3
	};
	if (!params.lastActiveDateKey) return {
		missedDays: 0,
		showWelcomeBack: false,
		toneTitle: "Bismillah — Fresh Start",
		toneMessage: "Small consistent steps are most beloved to Allah.",
		suggestedQuickMinutes: 10
	};
	const last = /* @__PURE__ */ new Date(`${params.lastActiveDateKey}T00:00:00`);
	const today = /* @__PURE__ */ new Date(`${params.todayDateKey}T00:00:00`);
	const diffDays = Math.max(0, Math.floor((today.getTime() - last.getTime()) / 864e5));
	if (diffDays >= 2) return {
		missedDays: diffDays,
		showWelcomeBack: true,
		toneTitle: `Welcome back${params.child?.name ? `, ${params.child.name}` : ""}! Every new day is a fresh mercy`,
		toneMessage: "No streak guilt here — pick a gentle 3-minute warm-up to ease back in at your own pace.",
		suggestedQuickMinutes: 3
	};
	return {
		missedDays: diffDays,
		showWelcomeBack: false,
		toneTitle: "Steady & Calm",
		toneMessage: "The most beloved deeds to Allah are those done consistently, even if small.",
		suggestedQuickMinutes: 10
	};
}
// src/components/shared/LivingMascot.tsx
var MASCOT_STATE_META = {
	idle: {
		label: "Ready",
		defaultSpeech: "Assalamu Alaikum! Ready for a calm 10-minute session?",
		accentColor: "#F59E0B",
		ringClass: "ring-amber-300/80"
	},
	blink: {
		label: "Attentive",
		defaultSpeech: "I am right here with you!",
		accentColor: "#22C55E",
		ringClass: "ring-emerald-300/85"
	},
	happy: {
		label: "Happy",
		defaultSpeech: "Alhamdulillah! You are doing so well!",
		accentColor: "#22C55E",
		ringClass: "ring-emerald-400"
	},
	thinking: {
		label: "Thinking",
		defaultSpeech: "Take your time — listen carefully and think!",
		accentColor: "#F59E0B",
		ringClass: "ring-amber-400"
	},
	encouraging: {
		label: "Encouraging",
		defaultSpeech: "Bismillah! You can do this — try one small step!",
		accentColor: "#22C55E",
		ringClass: "ring-emerald-400"
	},
	celebrating: {
		label: "Celebrating",
		defaultSpeech: "MashaAllah! Wonderful focus and effort!",
		accentColor: "#F59E0B",
		ringClass: "ring-amber-300"
	},
	gentle_disappointment: {
		label: "Gentle Retry",
		defaultSpeech: "That was close! Let us listen once more together.",
		accentColor: "#D97706",
		ringClass: "ring-amber-300/90"
	},
	listening: {
		label: "Listening",
		defaultSpeech: "I am listening carefully to your recitation...",
		accentColor: "#10B981",
		ringClass: "ring-emerald-300"
	},
	teaching: {
		label: "Teaching",
		defaultSpeech: "Notice the shape and sound — right to left!",
		accentColor: "#14532D",
		ringClass: "ring-amber-300"
	},
	resting: {
		label: "Resting",
		defaultSpeech: "Peaceful night! Rest well and see you tomorrow, InshaAllah.",
		accentColor: "#64748B",
		ringClass: "ring-slate-300/70"
	}
};
function inferAmbientMascotState(now = /* @__PURE__ */ new Date()) {
	const hr = now.getHours();
	if (hr >= 21 || hr < 5) return "resting";
	return "idle";
}
var CHARACTER_ASSETS = {
	Mizo: {
		src: "/assets/illustrations/avatar_mizo_3d.webp",
		gradient: "from-amber-200 via-amber-400 to-emerald-900"
	},
	Ayaan: {
		src: "/assets/illustrations/avatar_ayaan_3d.webp",
		gradient: "from-amber-200 via-emerald-600 to-emerald-950"
	},
	Ayla: {
		src: "/assets/illustrations/avatar_ayla_3d.webp",
		gradient: "from-amber-100 via-rose-400 to-emerald-900"
	}
};
var LivingMascot = ({ character, state = "idle", size = "md", speechText, showSpeechBubble = false, interactive = true, onTap, className = "" }) => {
	const prefersReducedMotion = useReducedMotion();
	const [isBlinking, setIsBlinking] = (0, import_react.useState)(false);
	const [tapActive, setTapActive] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (prefersReducedMotion) return;
		if (state !== "idle" && state !== "happy" && state !== "teaching" && state !== "blink") return;
		const interval = window.setInterval(() => {
			setIsBlinking(true);
			window.setTimeout(() => setIsBlinking(false), 180);
		}, 4200);
		return () => window.clearInterval(interval);
	}, [prefersReducedMotion, state]);
	const effectiveState = isBlinking || state === "blink" ? "blink" : state;
	const meta = MASCOT_STATE_META[effectiveState];
	const asset = CHARACTER_ASSETS[character];
	const dim = {
		sm: "w-11 h-11",
		md: "w-14 h-14",
		lg: "w-20 h-20",
		xl: "w-24 h-24"
	}[size];
	const motionTarget = prefersReducedMotion ? {} : effectiveState === "celebrating" ? {
		y: [
			0,
			-8,
			0
		],
		rotate: [
			0,
			-5,
			5,
			0
		],
		scale: [
			1,
			1.07,
			1
		]
	} : effectiveState === "listening" ? {
		scale: [
			1,
			1.05,
			1
		],
		y: [
			0,
			-2,
			0
		]
	} : effectiveState === "thinking" ? {
		rotate: [
			0,
			-4,
			2,
			0
		],
		y: [
			0,
			-2,
			0
		]
	} : effectiveState === "encouraging" ? {
		y: [
			0,
			-5,
			0
		],
		scale: [
			1,
			1.04,
			1
		]
	} : effectiveState === "gentle_disappointment" ? {
		y: [
			0,
			2,
			0
		],
		rotate: [
			0,
			-3,
			0
		]
	} : effectiveState === "teaching" ? {
		y: [
			0,
			-3,
			0
		],
		rotate: [
			0,
			3,
			-1,
			0
		]
	} : effectiveState === "resting" ? {
		y: [
			0,
			2,
			0
		],
		scale: [
			1,
			.98,
			1
		]
	} : effectiveState === "happy" ? {
		y: [
			0,
			-4,
			0
		],
		scale: [
			1,
			1.03,
			1
		]
	} : { y: [
		0,
		-3,
		0
	] };
	const duration = effectiveState === "celebrating" ? 1.15 : effectiveState === "listening" ? 1.4 : effectiveState === "resting" ? 4.2 : 3;
	const handleClick = () => {
		if (!interactive) return;
		triggerSelectionHaptic();
		setTapActive(true);
		window.setTimeout(() => setTapActive(false), 2400);
		onTap?.();
	};
	const bubbleContent = speechText || meta.defaultSpeech;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative inline-flex items-center gap-3 select-none ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative shrink-0",
			children: [
				effectiveState === "listening" && !prefersReducedMotion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					"aria-hidden": "true",
					animate: {
						scale: [
							1,
							1.32,
							1
						],
						opacity: [
							.55,
							0,
							.55
						]
					},
					transition: {
						duration: 1.5,
						repeat: Infinity,
						ease: "easeOut"
					},
					className: "absolute inset-0 rounded-full border-2 border-emerald-400 pointer-events-none"
				}),
				effectiveState === "celebrating" && !prefersReducedMotion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					"aria-hidden": "true",
					animate: {
						scale: [
							1,
							1.24,
							1
						],
						opacity: [
							.4,
							.8,
							.4
						]
					},
					transition: {
						duration: 1.4,
						repeat: Infinity,
						ease: "easeInOut"
					},
					className: "absolute -inset-1 rounded-full bg-amber-300/35 blur-sm pointer-events-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					type: "button",
					onClick: handleClick,
					disabled: !interactive,
					animate: motionTarget,
					transition: {
						duration,
						repeat: Infinity,
						ease: "easeInOut"
					},
					whileTap: interactive && !prefersReducedMotion ? { scale: .92 } : void 0,
					"aria-label": `${character} mascot (${meta.label})`,
					className: `${dim} relative rounded-full bg-gradient-to-b ${asset.gradient} p-0.5 ring-2 ${meta.ringClass} shadow-sm overflow-hidden flex items-center justify-center ${interactive ? "cursor-pointer" : "cursor-default"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: asset.src,
						alt: `${character} companion`,
						loading: "lazy",
						decoding: "async",
						className: `w-full h-full object-cover rounded-full transition-transform duration-150 ${effectiveState === "blink" ? "scale-y-[0.95]" : ""} ${effectiveState === "resting" ? "brightness-90 saturate-75" : ""}`
					}), effectiveState === "blink" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: "absolute inset-0 bg-white/15 pointer-events-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: "absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs flex items-center justify-center text-[11px]",
					children: effectiveState === "celebrating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 16 16",
						className: "w-3.5 h-3.5 text-amber-500",
						fill: "currentColor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 1.5l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11.4l-3.9 2.2.8-4.4-3.2-3.1 4.4-.6L8 1.5z" })
					}) : effectiveState === "thinking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 16 16",
						className: "w-3.5 h-3.5 text-amber-600",
						fill: "currentColor",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "4",
								cy: "9",
								r: "1.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "8",
								cy: "8",
								r: "1.7"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "12",
								cy: "7",
								r: "1.9"
							})
						]
					}) : effectiveState === "listening" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 16 16",
						className: "w-3.5 h-3.5 text-emerald-600",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M4 6v4M8 4v8M12 6v4",
							strokeLinecap: "round"
						})
					}) : effectiveState === "resting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 16 16",
						className: "w-3.5 h-3.5 text-slate-600 dark:text-emerald-200",
						fill: "currentColor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.8 9.8A4.8 4.8 0 0 1 6.2 3a4.8 4.8 0 1 0 6.8 6.8 4.9 4.9 0 0 1-2.2 0z" })
					}) : effectiveState === "teaching" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 16 16",
						className: "w-3.5 h-3.5 text-[#14532D] dark:text-emerald-300",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2.5 4.5C4.5 3.8 6.5 4 8 5c1.5-1 3.5-1.2 5.5-.5v7c-2-.7-4-.5-5.5.5-1.5-1-3.5-1.2-5.5-.5v-7z" })
					}) : effectiveState === "gentle_disappointment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 16 16",
						className: "w-3.5 h-3.5 text-amber-600",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 13s-4.5-2.8-4.5-6a2.6 2.6 0 0 1 4.5-1.7A2.6 2.6 0 0 1 12.5 7C12.5 10.2 8 13 8 13z" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 16 16",
						className: "w-3.5 h-3.5 text-emerald-600",
						fill: "currentColor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "8",
							cy: "8",
							r: "4"
						})
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: (showSpeechBubble || tapActive) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: prefersReducedMotion ? { opacity: 1 } : {
				opacity: 0,
				x: -6
			},
			animate: {
				opacity: 1,
				x: 0
			},
			exit: prefersReducedMotion ? { opacity: 0 } : {
				opacity: 0,
				x: -4
			},
			className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3 py-2 shadow-2xs max-w-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] font-extrabold text-[#14532D] dark:text-emerald-300 leading-tight",
				children: [
					character,
					" · ",
					meta.label
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-[var(--text-secondary)] leading-snug mt-0.5",
				children: bubbleContent
			})]
		}) })]
	});
};
// src/components/shared/FirstRunOnboardingModal.tsx
var ADULT_GOALS = [
	{
		id: "daily_quran",
		title: "Daily Quran Reading",
		subtitle: "Calm daily ayahs in Uthmani Mushaf view"
	},
	{
		id: "salah_consistency",
		title: "Salah Consistency",
		subtitle: "Prayer times, Wudu guide & gentle tracking"
	},
	{
		id: "hifz_revision",
		title: "Hifz & Revision",
		subtitle: "Spaced-repetition Juz Amma & Surah recall"
	},
	{
		id: "family_tarbiyah",
		title: "Family Tarbiyah",
		subtitle: "Learn together with kids in 10 min/day"
	}
];
var CHILD_AGE_BANDS = [
	{
		id: "4-6",
		label: "Ages 4–6",
		sampleAge: 5,
		desc: "Short letters, audio & picture stories"
	},
	{
		id: "7-9",
		label: "Ages 7–9",
		sampleAge: 8,
		desc: "Qaida tracing, Duas & 6-scene stories"
	},
	{
		id: "10-12",
		label: "Ages 10–12",
		sampleAge: 11,
		desc: "Tajweed drills, Salah & Seerah quizzes"
	}
];
var CHILD_FOCUSES = [
	{
		id: "balanced",
		label: "Balanced 10-Min Mix"
	},
	{
		id: "qaida_basics",
		label: "Noorani Qaida & Tracing"
	},
	{
		id: "stories_manners",
		label: "Prophet Stories & Manners"
	},
	{
		id: "daily_duas",
		label: "Daily Sunnah Duas"
	}
];
var FirstRunOnboardingModal = ({ open, initialProfile, defaultChildName = "", language, onComplete, onSkip }) => {
	const [step, setStep] = (0, import_react.useState)(1);
	const [primaryMode, setPrimaryMode] = (0, import_react.useState)(initialProfile?.primaryMode || DEFAULT_LOCAL_ONBOARDING_PROFILE.primaryMode);
	const [adultGoal, setAdultGoal] = (0, import_react.useState)(initialProfile?.adultGoal || DEFAULT_LOCAL_ONBOARDING_PROFILE.adultGoal);
	const [adultDailyMinutes, setAdultDailyMinutes] = (0, import_react.useState)(initialProfile?.adultDailyMinutes || 10);
	const [includeChild, setIncludeChild] = (0, import_react.useState)(primaryMode !== "adult");
	const [childName, setChildName] = (0, import_react.useState)(defaultChildName);
	const [childAgeBand, setChildAgeBand] = (0, import_react.useState)(initialProfile?.childAgeBand || "7-9");
	const [childFocus, setChildFocus] = (0, import_react.useState)(initialProfile?.childFocus || "balanced");
	const [childAvatar, setChildAvatar] = (0, import_react.useState)("Ayaan");
	const sevenDayPreview = (0, import_react.useMemo)(() => buildSevenDayLocalPlan({
		adultGoal,
		adultDailyMinutes,
		childAgeBand,
		childFocus
	}, language), [
		adultGoal,
		adultDailyMinutes,
		childAgeBand,
		childFocus,
		language
	]);
	if (!open) return null;
	const handleFinish = () => {
		const completedProfile = {
			schemaVersion: 1,
			status: "completed",
			primaryMode,
			adultGoal,
			adultDailyMinutes,
			childAgeBand,
			childFocus,
			planPaused: false,
			completedAtIso: (/* @__PURE__ */ new Date()).toISOString(),
			lastActiveDateKey: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		};
		saveLocalOnboardingProfile(completedProfile);
		triggerSuccessHaptic();
		const ageBandMeta = CHILD_AGE_BANDS.find((b) => b.id === childAgeBand) || CHILD_AGE_BANDS[1];
		onComplete({
			profile: completedProfile,
			childSetup: includeChild && childName.trim().length > 0 ? {
				name: childName.trim(),
				age: ageBandMeta.sampleAge,
				avatar: childAvatar,
				dailyMinutes: childAgeBand === "4-6" ? 8 : childAgeBand === "7-9" ? 10 : 12
			} : void 0
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Ilmizo 60-Second Calm Setup",
		className: "fixed inset-0 z-50 bg-[#061810]/90 backdrop-blur-md flex items-stretch sm:items-center justify-center sm:p-5 overflow-y-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full min-h-dvh sm:min-h-0 sm:max-w-lg sm:rounded-[30px] bg-[var(--bg-sheet)] text-[var(--text-primary)] sm:border sm:border-amber-400/25 shadow-2xl overflow-hidden flex flex-col my-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden bg-gradient-to-b from-[#0A291B] via-[#0F3826] to-[#14532D] text-white px-5 pt-safe pb-5 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/illustrations/adult_home_hero.webp",
							alt: "",
							"aria-hidden": "true",
							className: "absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity pointer-events-none select-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#0A291B]/75 via-[#0F3826]/85 to-[#0F3826]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 pt-3 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-9 h-9 rounded-2xl bg-gradient-to-br from-[#FDE68A] to-[#D97706] text-emerald-950 font-extrabold text-sm flex items-center justify-center shadow-md",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold tracking-tight text-amber-300 leading-none",
											children: "Ilmizo"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-emerald-100/80 font-semibold mt-0.5 tabular-nums",
											children: [
												"Step ",
												step,
												" of 3 · Learn · Pray · Grow"
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: onSkip,
										className: "min-h-[40px] px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-emerald-100 text-xs font-bold inline-flex items-center gap-1 shrink-0 transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Skip" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3.5 h-3.5" })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-extrabold tracking-tight leading-snug text-white",
									children: step === 1 ? "Assalamu Alaikum — Welcome to Ilmizo" : step === 2 ? "Parent Setup for Kids World" : "Your 7-Day Calm Family Routine"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-emerald-100/85 mt-1 leading-relaxed",
									children: step === 1 ? "A calm, ad-free Islamic companion for Quran, Salah, Duas, and Kids Tarbiyah — 100% offline." : step === 2 ? "Optional child profile stored privately on this device." : "Gentle daily guidance ready to begin right away."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-1.5 pt-0.5",
									children: [
										1,
										2,
										3
									].map((idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1.5 rounded-full transition-all ${idx <= step ? "bg-gradient-to-r from-[#FDE68A] to-[#F59E0B]" : "bg-white/20"}` }, idx))
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 space-y-4 flex-1 sm:max-h-[62vh] overflow-y-auto",
					children: [
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivingMascot, {
								character: "Mizo",
								state: "happy",
								size: "md",
								showSpeechBubble: true,
								speechText: "No account or login needed. Everything stays safely on your device!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
									children: "Who is learning today?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-2",
									children: [
										{
											id: "family",
											label: "Whole Family",
											icon: Sparkles
										},
										{
											id: "adult",
											label: "Just Me (Adult)",
											icon: User
										},
										{
											id: "kids",
											label: "My Child",
											icon: BookOpen
										}
									].map((opt) => {
										const Icon = opt.icon;
										const active = primaryMode === opt.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												triggerLightHaptic();
												setPrimaryMode(opt.id);
												setIncludeChild(opt.id !== "adult");
											},
											className: `min-h-[56px] p-2.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${active ? "bg-[#14532D] text-white border-[#14532D] dark:border-emerald-400 ring-2 ring-emerald-600/20 shadow-xs" : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-emerald-400"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `w-4 h-4 ${active ? "text-amber-300" : "text-[#14532D] dark:text-emerald-300"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-extrabold leading-tight",
												children: opt.label
											})]
										}, opt.id);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
									children: "Choose your primary focus"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
									children: ADULT_GOALS.map((g) => {
										const active = adultGoal === g.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												triggerLightHaptic();
												setAdultGoal(g.id);
											},
											className: `min-h-[56px] p-3 rounded-2xl border text-left transition ${active ? "bg-emerald-50 dark:bg-emerald-950/50 border-[#14532D] dark:border-emerald-400 ring-1 ring-emerald-600/25 shadow-2xs" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-amber-400"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
												children: g.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-[var(--text-secondary)] mt-0.5",
												children: g.subtitle
											})]
										}, g.id);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
									children: "Daily peaceful pace"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-2",
									children: [
										5,
										10,
										15
									].map((mins) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											triggerLightHaptic();
											setAdultDailyMinutes(mins);
										},
										className: `min-h-[48px] rounded-xl border text-xs font-extrabold tabular-nums transition flex items-center justify-center gap-1.5 ${adultDailyMinutes === mins ? "bg-amber-400 text-emerald-950 border-amber-500 shadow-2xs" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [mins, " min/day"] })]
									}, mins))
								})]
							})
						] }),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
								children: "Set up a Child Profile? (Parent Controlled)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-[var(--text-secondary)] mt-0.5",
								children: "Stored 100% locally. Never uploaded or shared."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								role: "switch",
								"aria-checked": includeChild,
								onClick: () => setIncludeChild((v) => !v),
								className: `min-w-[54px] min-h-[32px] rounded-full p-1 transition ${includeChild ? "bg-[#22C55E]" : "bg-slate-300 dark:bg-emerald-950"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block w-6 h-6 rounded-full bg-white shadow-xs transition-transform ${includeChild ? "translate-x-5" : "translate-x-0"}` })
							})]
						}), includeChild ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "ilmizo-onboard-child-name",
									className: "block text-xs font-extrabold text-[#14532D] dark:text-emerald-300 mb-1",
									children: "Child’s First Name or Nickname (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "ilmizo-onboard-child-name",
									type: "text",
									value: childName,
									onChange: (e) => setChildName(e.target.value),
									placeholder: "e.g. Ayaan, Ayla, Zayd",
									maxLength: 24,
									className: "ilmizo-input w-full min-h-[48px] px-3.5 rounded-2xl text-sm font-semibold"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
										children: "Age Range"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-3 gap-2",
										children: CHILD_AGE_BANDS.map((band) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setChildAgeBand(band.id),
											className: `min-h-[56px] p-2.5 rounded-2xl border text-left transition ${childAgeBand === band.id ? "bg-emerald-50 dark:bg-emerald-950/50 border-[#14532D] dark:border-emerald-400 ring-1 ring-emerald-600/25" : "bg-[var(--bg-surface)] border-[var(--border-subtle)]"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
												children: band.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-[var(--text-secondary)] mt-0.5 leading-snug",
												children: band.desc
											})]
										}, band.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
											children: "Pick Companion & Focus"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-2",
											children: [
												"Ayaan",
												"Ayla",
												"Mizo"
											].map((av) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setChildAvatar(av),
												className: `flex-1 min-h-[48px] px-2 py-2 rounded-2xl border text-xs font-extrabold transition ${childAvatar === av ? "bg-[#14532D] text-amber-300 border-[#14532D] dark:border-emerald-400 shadow-2xs" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
												children: av
											}, av))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-2 gap-2 pt-1",
											children: CHILD_FOCUSES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setChildFocus(f.id),
												className: `min-h-[44px] px-3 py-2 rounded-xl border text-xs font-bold transition ${childFocus === f.id ? "bg-amber-100 dark:bg-amber-400/20 border-amber-500 text-emerald-950 dark:text-amber-200" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)]"}`,
												children: f.label
											}, f.id))
										})
									]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 p-4 text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed",
							children: [
								"You can add or manage up to 5 child profiles anytime later inside the PIN-protected",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Parent Hub" }),
								"."
							]
						})] }),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivingMascot, {
								character: "Mizo",
								state: "celebrating",
								size: "md",
								showSpeechBubble: true,
								speechText: "Your 7-day calm offline routine is ready. Pause or edit anytime in Profile!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] divide-y divide-[var(--divider)]",
								children: sevenDayPreview.slice(0, 5).map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-extrabold text-amber-800 dark:text-amber-300",
												children: day.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold text-[var(--text-primary)] mt-0.5",
												children: day.adultTask
											}),
											includeChild && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5",
												children: [
													"Kids (",
													childAgeBand,
													"): ",
													day.kidsTask
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[11px] font-extrabold text-[var(--text-muted)] tabular-nums shrink-0",
										children: [day.adultMinutes, "m"]
									})]
								}, day.dayNumber))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-[11px] text-[var(--text-secondary)] px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-[#14532D] dark:text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "100% offline-ready · Zero ads · Zero login required · Stored only on this device." })]
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-4 bg-[var(--bg-surface)] border-t border-[var(--divider)] flex items-center justify-between gap-2",
					children: [step > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStep((s) => s === 3 ? 2 : 1),
						className: "min-h-[48px] px-4 rounded-2xl bg-[var(--bg-elevated)] hover:opacity-90 border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-extrabold transition",
						children: "Back"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onSkip,
						className: "min-h-[48px] px-4 rounded-2xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-bold transition",
						children: "Skip for now"
					}), step < 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							triggerLightHaptic();
							setStep((s) => s === 1 ? 2 : 3);
						},
						className: "min-h-[48px] px-5 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center gap-1.5 shadow-sm transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Continue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleFinish,
						className: "min-h-[48px] px-5 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center gap-1.5 shadow-sm transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Start My Calm Routine" })]
					})]
				})
			]
		})
	});
};
// src/components/design-system/IlmizoPrimitives.tsx
var ContentCard = ({ children, className = "", elevated = false }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: `rounded-3xl border border-[var(--border-subtle)] ${elevated ? "bg-[var(--bg-elevated)]" : "bg-[var(--bg-surface)]"} text-[var(--text-primary)] p-4 sm:p-5 shadow-2xs transition-colors ${className}`,
	children
});
var PrimaryButton = ({ fullWidth = false, className = "", children, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	type: "button",
	...props,
	className: `${fullWidth ? "w-full" : ""} min-h-[46px] px-5 py-2.5 rounded-2xl bg-[#14532D] hover:bg-[#0F3826] dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-sm font-extrabold inline-flex items-center justify-center gap-2 shadow-xs transition active:scale-[0.98] disabled:opacity-50 ${className}`,
	children
});
/**
* Grouped Settings Container & List Row (calm mobile settings language)
*/
var SettingsGroup = ({ title, subtitle, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
	className: "space-y-2",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xs font-extrabold tracking-wide text-[var(--text-secondary)]",
			children: title
		}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-[var(--text-muted)] mt-0.5",
			children: subtitle
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] divide-y divide-[var(--divider)] overflow-hidden shadow-2xs",
		children
	})]
});
var SettingsRow = ({ icon, title, subtitle, value, rightSlot, onClick, danger = false }) => {
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 min-w-0 flex-1",
		children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${danger ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400" : "bg-[var(--bg-elevated)] text-[#14532D] dark:text-amber-300"}`,
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `text-sm font-bold leading-snug truncate ${danger ? "text-rose-600 dark:text-rose-400" : "text-[var(--text-primary)]"}`,
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-[var(--text-secondary)] mt-0.5 leading-snug",
				children: subtitle
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 shrink-0",
		children: [
			value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-semibold text-[var(--text-secondary)] max-w-[130px] truncate",
				children: value
			}),
			rightSlot,
			onClick && !rightSlot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4 text-[var(--text-muted)] shrink-0" })
		]
	})] });
	if (onClick) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => {
			triggerSelectionHaptic();
			onClick();
		},
		className: "w-full min-h-[60px] px-4 py-3 flex items-center justify-between gap-3 hover:bg-[var(--bg-elevated)]/70 active:bg-[var(--bg-elevated)] transition text-left",
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full min-h-[60px] px-4 py-3 flex items-center justify-between gap-3",
		children: inner
	});
};
var SkeletonCard = ({ lines = 2, className = "" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"aria-hidden": "true",
	className: `rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 space-y-2.5 ${className}`,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-2/5 rounded-full bg-[var(--bg-elevated)] animate-pulse" }), Array.from({ length: lines }).map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-3 rounded-full bg-[var(--bg-elevated)] animate-pulse ${idx === lines - 1 ? "w-3/5" : "w-full"}` }, idx))]
});
var SkeletonList = ({ count = 4 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "space-y-3",
	"aria-busy": "true",
	"aria-label": "Loading content",
	children: Array.from({ length: count }).map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-11 h-11 rounded-2xl bg-[var(--bg-elevated)] animate-pulse shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-2/5 rounded-full bg-[var(--bg-elevated)] animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-3/4 rounded-full bg-[var(--bg-elevated)] animate-pulse" })]
		})]
	}, idx))
});
var ScreenSkeleton = ({ label = "Preparing your learning space…" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "flex-1 bg-[var(--bg-app)] text-[var(--text-primary)] pb-24",
	"aria-busy": "true",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-28 rounded-b-[28px] bg-[#0F3826]/90 p-5 flex flex-col justify-end gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-40 rounded-full bg-white/15 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-56 rounded-full bg-white/10 animate-pulse" })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 space-y-3 max-w-4xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonCard, { lines: 3 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonList, { count: 3 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold text-[var(--text-muted)] text-center pt-2",
				children: label
			})
		]
	})]
});
var InfoDisclosure = ({ label = "How this works", sheetTitle, sheetSubtitle, children, variant = "light" }) => {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => {
			triggerSelectionHaptic();
			setOpen(true);
		},
		"aria-label": label,
		title: label,
		className: `min-w-[40px] min-h-[40px] px-3 rounded-full inline-flex items-center justify-center gap-1.5 text-xs font-bold transition active:scale-95 ${variant === "dark" ? "bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/15" : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-3.5 h-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:inline",
			children: label
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
		open,
		onClose: () => setOpen(false),
		title: sheetTitle,
		subtitle: sheetSubtitle,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-[var(--text-secondary)] leading-relaxed space-y-2.5",
			children
		})
	})] });
};
var EmptyState = ({ icon, title, description, action }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContentCard, {
	className: "text-center py-8 px-5 space-y-3",
	children: [
		icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-300 mx-auto flex items-center justify-center",
			children: icon
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1 max-w-sm mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-extrabold text-[var(--text-primary)]",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-[var(--text-secondary)] leading-relaxed",
				children: description
			})]
		}),
		action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pt-1 flex justify-center",
			children: action
		})
	]
});
var ThemeModeSegmentedControl = ({ value, onChange, compact = false }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		"aria-label": "App Appearance Theme",
		className: "grid grid-cols-3 gap-1 p-1 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
		children: [
			{
				id: "light",
				label: "Light",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-3.5 h-3.5" })
			},
			{
				id: "dark",
				label: "Dark",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-3.5 h-3.5" })
			},
			{
				id: "system",
				label: "System",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "w-3.5 h-3.5" })
			}
		].map((opt) => {
			const active = value === opt.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "radio",
				"aria-checked": active,
				onClick: () => {
					triggerSelectionHaptic();
					onChange(opt.id);
				},
				className: `${compact ? "min-h-[38px] text-[11px]" : "min-h-[44px] text-xs"} px-2.5 rounded-xl font-extrabold flex items-center justify-center gap-1.5 transition active:scale-[0.98] ${active ? "bg-[#14532D] text-amber-300 shadow-xs" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`,
				children: [opt.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.label })]
			}, opt.id);
		})
	});
};
// src/services/sleepTimerService.ts
var SLEEP_TIMER_PRESET_MINUTES = [
	5,
	10,
	15,
	30,
	45
];
var SleepTimerController = class {
	constructor() {
		this.state = {
			mode: "off",
			totalSeconds: 0,
			remainingSeconds: 0,
			endsAtMs: null,
			lastCompletedAtMs: null
		};
		this.listeners = /* @__PURE__ */ new Set();
		this.intervalId = null;
		this.audioUnsubscribe = null;
		this.previousAudioSourceId = null;
	}
	getState() {
		return this.state;
	}
	subscribe(listener) {
		this.listeners.add(listener);
		listener(this.state);
		return () => {
			this.listeners.delete(listener);
		};
	}
	emit() {
		for (const listener of this.listeners) listener(this.state);
	}
	clearHandles() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
		if (this.audioUnsubscribe) {
			this.audioUnsubscribe();
			this.audioUnsubscribe = null;
		}
		this.previousAudioSourceId = null;
	}
	startMinutes(minutes) {
		const totalSeconds = Math.max(1, Math.min(180, Math.round(minutes))) * 60;
		const endsAtMs = Date.now() + totalSeconds * 1e3;
		this.clearHandles();
		this.state = {
			mode: "countdown",
			totalSeconds,
			remainingSeconds: totalSeconds,
			endsAtMs,
			lastCompletedAtMs: this.state.lastCompletedAtMs
		};
		this.emit();
		this.intervalId = setInterval(() => {
			this.tick();
		}, 1e3);
	}
	startEndOfTrack() {
		this.clearHandles();
		const currentAudio = audioManager.getState();
		this.previousAudioSourceId = currentAudio.activeTrackId;
		this.state = {
			mode: "end_of_track",
			totalSeconds: 0,
			remainingSeconds: 0,
			endsAtMs: null,
			lastCompletedAtMs: this.state.lastCompletedAtMs
		};
		this.emit();
		this.audioUnsubscribe = audioManager.subscribe((audioState) => {
			if (this.state.mode !== "end_of_track") return;
			if (this.previousAudioSourceId && audioState.activeTrackId && audioState.activeTrackId !== this.previousAudioSourceId || audioState.status === "idle") this.completeAndStopAudio();
			else if (!this.previousAudioSourceId && audioState.activeTrackId) this.previousAudioSourceId = audioState.activeTrackId;
		});
	}
	cancel() {
		this.clearHandles();
		this.state = {
			mode: "off",
			totalSeconds: 0,
			remainingSeconds: 0,
			endsAtMs: null,
			lastCompletedAtMs: this.state.lastCompletedAtMs
		};
		this.emit();
	}
	tick() {
		if (this.state.mode !== "countdown" || !this.state.endsAtMs) {
			this.clearHandles();
			return;
		}
		const remainingSeconds = Math.max(0, Math.ceil((this.state.endsAtMs - Date.now()) / 1e3));
		if (remainingSeconds <= 0) {
			this.completeAndStopAudio();
			return;
		}
		if (remainingSeconds !== this.state.remainingSeconds) {
			this.state = {
				...this.state,
				remainingSeconds
			};
			this.emit();
		}
	}
	completeAndStopAudio() {
		this.clearHandles();
		audioManager.stopAll();
		this.state = {
			mode: "off",
			totalSeconds: 0,
			remainingSeconds: 0,
			endsAtMs: null,
			lastCompletedAtMs: Date.now()
		};
		this.emit();
	}
};
var sleepTimerService = new SleepTimerController();
function formatSleepCountdown(seconds) {
	const safe = Math.max(0, Math.floor(seconds));
	return `${Math.floor(safe / 60)}:${(safe % 60).toString().padStart(2, "0")}`;
}
function useSleepTimer() {
	const [snapshot, setSnapshot] = (0, import_react.useState)(() => sleepTimerService.getState());
	(0, import_react.useEffect)(() => sleepTimerService.subscribe(setSnapshot), []);
	return snapshot;
}
// src/components/shared/SleepTimerSheet.tsx
var SleepTimerSheet = ({ open, onClose, title = "Sleep Timer" }) => {
	const timer = useSleepTimer();
	const handleSelectMinutes = (mins) => {
		triggerSelectionHaptic();
		sleepTimerService.startMinutes(mins);
		onClose();
	};
	const handleSelectEndOfTrack = () => {
		triggerSelectionHaptic();
		sleepTimerService.startEndOfTrack();
		onClose();
	};
	const handleTurnOff = () => {
		triggerLightHaptic();
		sleepTimerService.cancel();
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
		open,
		onClose,
		title,
		subtitle: "Automatically pause recitation or bedtime stories peacefully",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				timer.mode !== "off" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-700/50 p-3.5 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-xl bg-[#14532D] text-amber-300 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-extrabold text-[#14532D] dark:text-emerald-100",
								children: timer.mode === "end_of_track" ? "Stops after current track" : `Stopping in ${formatSleepCountdown(timer.remainingSeconds)}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--text-secondary)]",
								children: "Audio will pause automatically so you can rest"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleTurnOff,
						className: "min-h-[44px] px-3 rounded-xl bg-rose-600 text-white text-xs font-bold flex items-center gap-1 shrink-0 active:scale-95 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Turn Off" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2.5",
					children: [SLEEP_TIMER_PRESET_MINUTES.map((mins) => {
						const isSelected = timer.mode === "countdown" && timer.totalSeconds === mins * 60;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => handleSelectMinutes(mins),
							className: `min-h-[54px] rounded-2xl border px-3 py-2.5 text-center transition active:scale-[0.97] ${isSelected ? "bg-[#14532D] text-white border-[#14532D] shadow-sm" : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-emerald-600/40"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-base font-extrabold tabular-nums",
								children: [mins, "m"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-xs ${isSelected ? "text-emerald-100" : "text-[var(--text-secondary)]"}`,
								children: "Minutes"
							})]
						}, mins);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleSelectEndOfTrack,
						className: `min-h-[54px] rounded-2xl border px-3 py-2.5 text-center transition active:scale-[0.97] ${timer.mode === "end_of_track" ? "bg-[#14532D] text-white border-[#14532D] shadow-sm" : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-emerald-600/40"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-extrabold leading-tight flex items-center justify-center gap-1",
							children: [timer.mode === "end_of_track" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "End of" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-xs font-semibold ${timer.mode === "end_of_track" ? "text-emerald-100" : "text-[var(--text-secondary)]"}`,
							children: "Track"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-[var(--text-secondary)] text-center",
					children: "Works offline for Kids Bedtime Stories, Surah Recitation, and Car Drive Mode."
				})
			]
		})
	});
};
var SleepTimerTriggerButton = ({ onClick, variant = "light", compact = false }) => {
	const timer = useSleepTimer();
	const isActive = timer.mode !== "off";
	const label = timer.mode === "countdown" ? formatSleepCountdown(timer.remainingSeconds) : timer.mode === "end_of_track" ? "End" : "Sleep";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-label": "Open Sleep Timer",
		className: `min-h-[44px] ${compact ? "px-2.5" : "px-3.5"} rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition active:scale-95 ${isActive ? "bg-amber-400 text-emerald-950 border-amber-500 shadow-xs" : variant === "dark" ? "bg-white/10 text-emerald-100 border-white/15 hover:bg-white/20" : "bg-[var(--bg-surface)] text-[#14532D] dark:text-emerald-200 border-[var(--border-subtle)] hover:border-emerald-600/40"}`,
		children: [isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "w-4 h-4 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums",
			children: label
		})]
	});
};
// src/components/audio/FloatingAudioMiniPlayer.tsx
/**
* Persistent Floating Audio Mini-Player powered strictly by the single existing
* CentralizedAudioManager (`useAudioManager`). Allows Quran recitation to continue
* smoothly while browsing Adult screens, respects bottom navigation & safe areas,
* and shows honest offline/error feedback without ever creating a duplicate player.
*/
var FloatingAudioMiniPlayer = () => {
	const audio = useAudioManager();
	const { mode, adultRoute, kidsRoute, openSurahForReading } = useIlmizo();
	const prefersReducedMotion = useReducedMotion();
	const [minimized, setMinimized] = (0, import_react.useState)(false);
	const [sleepSheetOpen, setSleepSheetOpen] = (0, import_react.useState)(false);
	const sleepTimer = useSleepTimer();
	const hasQuranTrack = Boolean(audio.quranSequence.surahNumber && audio.quranSequence.surahName && audio.quranSequence.mode);
	if (!((audio.status === "playing" || audio.status === "paused" || audio.status === "loading" || audio.status === "error" && Boolean(audio.errorMessage)) && !(mode === "adult" && adultRoute === "quran_read" || mode === "kids" && (kidsRoute === "quran_learning" || kidsRoute === "recitation_practice" || kidsRoute === "stories")) && (hasQuranTrack || audio.activeTrackId !== null))) return null;
	const title = hasQuranTrack ? `Surah ${audio.quranSequence.surahName} · Ayah ${audio.quranSequence.currentAyah ?? 1}` : audio.activeKind === "speech" ? "Voice Reading Active" : "Recitation Audio";
	const subtitle = audio.status === "error" && audio.errorMessage ? audio.errorMessage : hasQuranTrack ? `${audio.quranSequence.reciterName}${audio.quranSequence.playbackSource === "offline_downloaded" ? " · Offline" : ""}` : audio.status === "loading" ? "Preparing audio…" : audio.status === "paused" ? "Paused" : "Playing";
	const progressPct = hasQuranTrack ? Math.max(0, Math.min(100, audio.quranSequence.progressPercent || 0)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.aside, {
		"aria-label": "Audio Mini Player",
		initial: prefersReducedMotion ? { opacity: 0 } : {
			opacity: 0,
			y: 20
		},
		animate: prefersReducedMotion ? { opacity: 1 } : {
			opacity: 1,
			y: 0
		},
		exit: prefersReducedMotion ? { opacity: 0 } : {
			opacity: 0,
			y: 20
		},
		transition: { duration: prefersReducedMotion ? .01 : .18 },
		className: "fixed left-3 right-3 lg:left-[20.5rem] lg:right-6 bottom-[76px] z-40 max-w-2xl mx-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `rounded-2xl border shadow-xl backdrop-blur-md overflow-hidden transition-all ${audio.status === "error" ? "bg-rose-950/95 border-rose-400/40 text-rose-50" : "bg-[#0C2C1E]/95 border-[#D4AF37]/45 text-white"}`,
			children: [hasQuranTrack && audio.status !== "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 w-full bg-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] transition-all duration-300",
					style: { width: `${Math.max(4, progressPct)}%` }
				})
			}), minimized ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-3 py-1.5 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMinimized(false),
					className: "flex items-center gap-2 min-w-0 flex-1 text-left min-h-[36px]",
					"aria-label": "Expand audio player",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-amber-300 animate-pulse shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-extrabold text-white truncate",
							children: title
						}),
						hasQuranTrack && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11px] font-bold text-amber-300 tabular-nums shrink-0",
							children: [progressPct, "%"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 shrink-0",
					children: [audio.status !== "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							triggerSelectionHaptic();
							if (audio.status === "playing") audio.pause();
							else audio.resume();
						},
						"aria-label": audio.status === "playing" ? "Pause audio" : "Resume audio",
						className: "w-8 h-8 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-emerald-950 flex items-center justify-center active:scale-95 transition",
						children: audio.status === "playing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-3.5 h-3.5 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3.5 h-3.5 fill-current ml-0.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMinimized(false),
						"aria-label": "Expand audio controls",
						title: "Expand player",
						className: "w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 flex items-center justify-center transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "w-4 h-4" })
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-3 py-2 flex items-center justify-between gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						if (hasQuranTrack && audio.quranSequence.surahNumber) {
							triggerSelectionHaptic();
							openSurahForReading(audio.quranSequence.surahNumber, audio.quranSequence.currentAyah || 1);
						}
					},
					className: "flex items-center gap-2.5 min-w-0 flex-1 text-left min-h-[44px]",
					title: hasQuranTrack ? "Open in Quran Reader" : title,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${audio.status === "error" ? "bg-rose-500/25 text-rose-200" : "bg-[#14532D] border border-amber-300/40 text-amber-300"}`,
						children: audio.status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : audio.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4" }) : hasQuranTrack ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold text-white truncate leading-tight",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-emerald-100/80 truncate mt-0.5 leading-tight",
							children: subtitle
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 shrink-0",
					children: [
						audio.status !== "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								triggerSelectionHaptic();
								if (audio.status === "playing") audio.pause();
								else audio.resume();
							},
							"aria-label": audio.status === "playing" ? "Pause audio" : "Resume audio",
							className: "min-w-[40px] min-h-[40px] rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-emerald-950 flex items-center justify-center shadow-xs active:scale-95 transition",
							children: audio.status === "playing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-4 h-4 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-4 h-4 fill-current ml-0.5" })
						}),
						hasQuranTrack && audio.status !== "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								triggerSelectionHaptic();
								audio.nextAyah();
							},
							"aria-label": "Next Ayah",
							title: "Next Ayah",
							className: "min-w-[38px] min-h-[38px] rounded-full bg-white/10 hover:bg-white/20 text-emerald-50 flex items-center justify-center active:scale-95 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								triggerSelectionHaptic();
								setSleepSheetOpen(true);
							},
							"aria-label": "Open Sleep Timer",
							title: "Sleep Timer",
							className: `min-w-[38px] min-h-[38px] px-2 rounded-full flex items-center justify-center gap-1 active:scale-95 transition ${sleepTimer.mode !== "off" ? "bg-amber-400 text-emerald-950 font-extrabold text-[11px]" : "bg-white/10 hover:bg-white/20 text-emerald-100"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-3.5 h-3.5 shrink-0" }), sleepTimer.mode === "countdown" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: formatSleepCountdown(sleepTimer.remainingSeconds)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMinimized(true),
							"aria-label": "Minimize audio player",
							title: "Minimize player",
							className: "min-w-[38px] min-h-[38px] rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 flex items-center justify-center active:scale-95 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								triggerSelectionHaptic();
								setMinimized(false);
								audio.stopAll();
							},
							"aria-label": "Stop and close audio player",
							title: "Stop audio",
							className: "min-w-[38px] min-h-[38px] rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 flex items-center justify-center active:scale-95 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})
					]
				})]
			})]
		})
	}, "ilmizo-floating-mini-player"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SleepTimerSheet, {
		open: sleepSheetOpen,
		onClose: () => setSleepSheetOpen(false)
	})] });
};
// src/App.tsx
/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/
var AdultModeView = (0, import_react.lazy)(() => __vitePreload(() => import("./AdultModeView-B1sEPexT.js").then((m) => ({ default: m.AdultModeView })), __vite__mapDeps([0,1,2,3,4,5,6,7,8])));
var KidsWorldView = (0, import_react.lazy)(() => __vitePreload(() => import("./KidsWorldView-lF1loSCa.js").then((m) => ({ default: m.KidsWorldView })), __vite__mapDeps([9,1,2,3,4,6,7,5,8,10,11])));
var ParentHubView = (0, import_react.lazy)(() => __vitePreload(() => import("./ParentHubView-B3pllX08.js").then((m) => ({ default: m.ParentHubView })), __vite__mapDeps([12,1,2,3,4,5,6,11,10])));
var ADULT_SIDEBAR_NAV = [
	{
		route: "home",
		label: "Home",
		group: "Core"
	},
	{
		route: "quran_list",
		label: "Quran & Mushaf",
		group: "Core"
	},
	{
		route: "quran_journal",
		label: "My Quran Journal",
		group: "Core"
	},
	{
		route: "salah",
		label: "Salah & Guides",
		group: "Worship"
	},
	{
		route: "hifz",
		label: "Hifz Studio",
		group: "Learn"
	},
	{
		route: "lessons",
		label: "Islamic Lessons",
		group: "Learn"
	},
	{
		route: "duas",
		label: "Duas & Adhkar",
		group: "Learn"
	},
	{
		route: "names99",
		label: "99 Names of Allah",
		group: "Learn"
	},
	{
		route: "seerah",
		label: "Seerah Library",
		group: "Learn"
	},
	{
		route: "quizzes",
		label: "Quizzes & Vocabulary",
		group: "Learn"
	},
	{
		route: "progress",
		label: "Progress & Streaks",
		group: "Learn"
	},
	{
		route: "qibla",
		label: "Qibla Compass",
		group: "Tools"
	},
	{
		route: "tasbih",
		label: "Tasbih Counter",
		group: "Tools"
	},
	{
		route: "calendar",
		label: "Islamic Calendar",
		group: "Tools"
	},
	{
		route: "tasks_expenses",
		label: "Tasks & Sadaqah",
		group: "Tools"
	},
	{
		route: "profile",
		label: "Profile",
		group: "Settings"
	},
	{
		route: "more",
		label: "More & Settings",
		group: "Settings"
	}
];
var KIDS_SIDEBAR_NAV = [
	{
		route: "kids_home",
		label: "Kids Home",
		group: "Explore"
	},
	{
		route: "todays_quest",
		label: "Today’s Quest",
		group: "Explore"
	},
	{
		route: "quran_learning",
		label: "Noorani Qaida & Quran",
		group: "Learn"
	},
	{
		route: "recitation_practice",
		label: "Recitation Practice",
		group: "Learn"
	},
	{
		route: "duas_learning",
		label: "Kids Duas",
		group: "Learn"
	},
	{
		route: "salah_learning",
		label: "Salah Steps",
		group: "Learn"
	},
	{
		route: "stories",
		label: `Stories (${KIDS_STORIES.length})`,
		group: "Stories & Play"
	},
	{
		route: "adventure_map",
		label: "Adventure Map",
		group: "Stories & Play"
	},
	{
		route: "daily_quiz",
		label: "Daily Quiz",
		group: "Stories & Play"
	},
	{
		route: "good_deed",
		label: "Good Deeds",
		group: "Stories & Play"
	},
	{
		route: "family_challenge",
		label: "Family Challenge",
		group: "Stories & Play"
	},
	{
		route: "kids_progress",
		label: "Stars & Progress",
		group: "Rewards"
	},
	{
		route: "needs_practice",
		label: "Needs Practice",
		group: "Rewards"
	},
	{
		route: "badges",
		label: "Badges & Certificates",
		group: "Rewards"
	}
];
var ADULT_ROUTE_ORDER = [
	"home",
	"quran_list",
	"quran_read",
	"quran_journal",
	"salah",
	"lessons",
	"hifz",
	"duas",
	"names99",
	"seerah",
	"quizzes",
	"progress",
	"qibla",
	"tasbih",
	"calendar",
	"tasks_expenses",
	"profile",
	"more"
];
var KIDS_ROUTE_ORDER = [
	"kids_home",
	"todays_quest",
	"quran_learning",
	"recitation_practice",
	"duas_learning",
	"salah_learning",
	"stories",
	"adventure_map",
	"daily_quiz",
	"good_deed",
	"family_challenge",
	"mission_complete",
	"kids_progress",
	"needs_practice",
	"badges",
	"certificate"
];
function getScreenPosition(mode, adultRoute, kidsRoute) {
	if (mode === "parent") return 100;
	if (mode === "adult") {
		const idx = ADULT_ROUTE_ORDER.indexOf(adultRoute);
		return idx >= 0 ? idx : 0;
	}
	const idx = KIDS_ROUTE_ORDER.indexOf(kidsRoute);
	return idx >= 0 ? idx : 0;
}
var screenSlideVariants = {
	enter: (direction) => ({
		x: direction >= 0 ? 24 : -24,
		opacity: 0
	}),
	center: {
		x: 0,
		opacity: 1
	},
	exit: (direction) => ({
		x: direction >= 0 ? -24 : 24,
		opacity: 0
	})
};
var IlmizoShell = () => {
	const { mode, setMode, adultRoute, setAdultRoute, kidsRoute, setKidsRoute, themeMode, setThemeMode, isAudioMuted, toggleAudioMute, activeChild, addChildProfile, updateChildProfile } = useIlmizo();
	const { language, setLanguage, supportedLanguages, languageMeta } = useTranslation();
	const prefersReducedMotion = useReducedMotion();
	const [onboardingProfile, setOnboardingProfile] = (0, import_react.useState)(() => loadLocalOnboardingProfile());
	const [showOnboarding, setShowOnboarding] = (0, import_react.useState)(() => loadLocalOnboardingProfile().status === "pending");
	(0, import_react.useEffect)(() => {
		const handleReplay = () => {
			setOnboardingProfile(loadLocalOnboardingProfile());
			setShowOnboarding(true);
		};
		window.addEventListener("ilmizo:open-onboarding", handleReplay);
		return () => window.removeEventListener("ilmizo:open-onboarding", handleReplay);
	}, []);
	const currentPos = getScreenPosition(mode, adultRoute, kidsRoute);
	const prevPosRef = (0, import_react.useRef)(currentPos);
	const prevModeRef = (0, import_react.useRef)(mode);
	const rawDirection = prevModeRef.current !== mode ? mode === "kids" ? 1 : -1 : currentPos >= prevPosRef.current ? 1 : -1;
	const slideDirection = languageMeta.dir === "rtl" ? -rawDirection : rawDirection;
	(0, import_react.useEffect)(() => {
		prevPosRef.current = currentPos;
		prevModeRef.current = mode;
	}, [currentPos, mode]);
	const activeScreenKey = mode;
	const sidebarItems = mode === "kids" ? KIDS_SIDEBAR_NAV : ADULT_SIDEBAR_NAV;
	const sidebarGroups = Array.from(new Set(sidebarItems.map((item) => item.group)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		dir: languageMeta.dir,
		className: "min-h-dvh w-full flex flex-col lg:flex-row bg-[var(--bg-app)] text-[var(--text-primary)] transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineIndicator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PWAInstallPromptBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FirstRunOnboardingModal, {
				open: showOnboarding,
				initialProfile: onboardingProfile,
				defaultChildName: activeChild?.name || "",
				language,
				onSkip: () => {
					const skipped = {
						...onboardingProfile,
						status: "skipped"
					};
					saveLocalOnboardingProfile(skipped);
					setOnboardingProfile(skipped);
					setShowOnboarding(false);
				},
				onComplete: ({ profile, childSetup }) => {
					setOnboardingProfile(profile);
					setShowOnboarding(false);
					if (childSetup) {
						if (activeChild && activeChild.name === "Ayaan" && childSetup.name !== "Ayaan") updateChildProfile(activeChild.id, {
							name: childSetup.name,
							age: childSetup.age,
							avatar: childSetup.avatar,
							dailyGoalMinutes: childSetup.dailyMinutes
						});
						else if (!activeChild || activeChild.name.toLowerCase() !== childSetup.name.toLowerCase()) addChildProfile(childSetup.name, childSetup.age, childSetup.avatar, childSetup.dailyMinutes);
					}
					if (profile.primaryMode === "kids") {
						setMode("kids");
						setKidsRoute("kids_home");
					} else {
						setMode("adult");
						setAdultRoute("home");
					}
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				"aria-label": "Primary Desktop Navigation",
				className: "hidden lg:flex lg:w-72 xl:w-80 shrink-0 flex-col justify-between bg-[#082016] text-white border-r border-amber-400/15 p-5 select-none sticky top-0 h-dvh",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5 min-h-0 flex flex-col flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 border-b border-white/10 pb-4 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-emerald-950 font-black flex items-center justify-center text-lg shadow-sm",
								children: "إ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-base font-extrabold tracking-tight text-amber-300 leading-tight",
								children: "Ilmizo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-emerald-100/75",
								children: "Family Islamic Learning"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-white/10 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMode("adult"),
									className: `min-h-[40px] px-2 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${mode === "adult" ? "bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] text-emerald-950 shadow-xs" : "text-emerald-100/90 hover:bg-white/10"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Adult" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMode("kids"),
									className: `min-h-[40px] px-2 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${mode === "kids" ? "bg-gradient-to-r from-[#4ADE80] to-[#22C55E] text-emerald-950 shadow-xs" : "text-emerald-100/90 hover:bg-white/10"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kids" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMode("parent"),
									className: `min-h-[40px] px-2 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${mode === "parent" ? "bg-amber-400 text-emerald-950 shadow-xs" : "text-emerald-100/90 hover:bg-white/10"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Parent" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							"aria-label": "Destination Navigation",
							className: "space-y-4 overflow-y-auto pr-1 flex-1 min-h-0",
							children: sidebarGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold text-emerald-200/65 px-2.5 pb-0.5",
									children: group
								}), sidebarItems.filter((item) => item.group === group).map((item) => {
									const isActive = mode === "kids" ? kidsRoute === item.route : mode === "adult" && (adultRoute === item.route || item.route === "quran_list" && adultRoute === "quran_read");
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											if (mode === "kids") setKidsRoute(item.route);
											else {
												setMode("adult");
												setAdultRoute(item.route);
											}
										},
										className: `w-full min-h-[40px] px-3 py-2 rounded-xl text-xs font-bold text-left transition flex items-center justify-between ${isActive ? "bg-[#14532D] text-amber-300 border border-amber-400/35 shadow-2xs" : "text-emerald-100/80 hover:bg-white/5 hover:text-white"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: item.label
										}), item.route === "quran_journal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "w-3.5 h-3.5 text-amber-300 shrink-0" })]
									}, item.route);
								})]
							}, group))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-4 border-t border-white/10 space-y-2.5 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeModeSegmentedControl, {
							value: themeMode,
							onChange: setThemeMode,
							compact: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: toggleAudioMute,
								"aria-pressed": isAudioMuted,
								className: `flex-1 min-h-[42px] px-3 py-2 rounded-xl text-xs font-extrabold border transition flex items-center justify-center gap-1.5 ${!isAudioMuted ? "bg-[#22C55E] text-emerald-950 border-emerald-300" : "bg-rose-500/20 text-rose-200 border-rose-400/40"}`,
								children: [!isAudioMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: !isAudioMuted ? "Sound On" : "Muted" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
								value: language,
								onChange: (val) => setLanguage(val),
								title: "Choose Language",
								subtitle: "Update app menus and translations",
								ariaLabel: "Select Language",
								variant: "dark-pill",
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3.5 h-3.5 text-amber-300" }),
								options: supportedLanguages.map((lang) => ({
									value: lang.code,
									label: lang.label
								}))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-emerald-200/70 text-center",
							children: "Saved on this device · Works offline"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col min-h-dvh w-full bg-[var(--bg-app)] text-[var(--text-primary)] relative overflow-x-hidden transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 flex flex-col w-full max-w-5xl mx-auto bg-[var(--bg-app)] text-[var(--text-primary)] overflow-x-hidden relative transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						initial: false,
						custom: prefersReducedMotion ? 0 : slideDirection,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							custom: prefersReducedMotion ? 0 : slideDirection,
							variants: prefersReducedMotion ? {
								enter: { opacity: 0 },
								center: { opacity: 1 },
								exit: { opacity: 0 }
							} : screenSlideVariants,
							initial: "enter",
							animate: "center",
							exit: "exit",
							transition: {
								x: {
									type: "spring",
									stiffness: 400,
									damping: 36,
									mass: .8
								},
								opacity: {
									duration: .14,
									ease: "easeOut"
								}
							},
							className: "flex-1 flex flex-col will-change-transform",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Suspense, {
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenSkeleton, {}),
								children: [
									mode === "adult" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultModeView, {}),
									mode === "kids" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KidsWorldView, {}),
									mode === "parent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full flex-1 flex flex-col",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentHubView, {})
									})
								]
							})
						}, activeScreenKey)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingAudioMiniPlayer, {})]
			})
		]
	});
};
function App() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IlmizoProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IlmizoShell, {}) });
}
// src/main.tsx
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}));
export { supportsArabicSpeechRecognition as $, canDownloadFullStoryLibraryAudioPack as A, COMPLETE_PRAYER_GUIDES as At, recordAiTajweedUsagePatch as B, canAccessChildSlot as C, validateSurahAyahRange as Ct, canAccessWordByWordHifzStudio as D, quranOfflineManager as Dt, canAccessVocabIndex as E, TOTAL_QURAN_AYAHS as Et, detectBillingEnvironment as F, importEncryptedSyncBundle as G, startLocalSevenDayTrialPatch as H, getEffectiveEntitlement as I, assessVoiceActivityMetrics as J, issueParentTimeVoucher as K, getTrialStatus as L, canRecordFamilyStoryVoice as M, canUseAiTajweedCheck as N, canAddCustomHifzPlan as O, searchOfflineQuran as Ot, createParentGateChallenge as P, scoreKidsArabicRecitationMatch as Q, isAdultPlusActive as R, attemptPlayStoreRestore as S, useAudioPlaybackClock as St, canAccessStoryIndex as T, OFFLINE_QURAN_PACKAGE_VERSION as Tt, verifyParentGateAnswer as U, resolvePlanText as V, exportEncryptedSyncBundle as W, getChildCertificateAchievements as X, evaluateChildBadgesAndMilestones as Y, normalizeSurahCertificateTitle as Z, saveLocalOnboardingProfile as _, ScreenBackButton as _t, PrimaryButton as a, formatRevisionReference as at, ILMIZO_PLAN_CATALOG as b, audioManager as bt, SettingsRow as c, isHapticsEnabled as ct, ThemeModeSegmentedControl as d, triggerSelectionHaptic as dt, AdultBottomNav as et, LivingMascot as f, triggerSuccessHaptic as ft, loadLocalOnboardingProfile as g, MobileStatusBar as gt, inferAgeBandFromAge as h, Kids3DMetallicBadge as ht, InfoDisclosure as i, computeNextPrayerState as it, canDownloadTopStoriesAudioPack as j, COMPLETE_SALAH_RECITATIONS as jt, canCacheSingleStoryOffline as k, verifyInstalledOfflineQuran as kt, SkeletonCard as l, setHapticsEnabled as lt, evaluateMissedDayKindness as m, CharacterAvatar as mt, SleepTimerTriggerButton as n, NextPrayerCard as nt, ScreenSkeleton as o, SelectSheetField as ot, inferAmbientMascotState as p, triggerVerseTransitionHaptic as pt, aggregateKidsProgressByPeriod as q, EmptyState as r, QuickAccessPillars as rt, SettingsGroup as s, BottomSheet as st, SleepTimerSheet as t, AdultHomeHeroSection as tt, SkeletonList as u, triggerLightHaptic as ut, useIlmizo as v, SyncStatusBadge as vt, canAccessQaidaLesson as w, audioDownloadManager as wt, attemptPlayStorePurchase as x, useAudioManager as xt, useTranslation as y, VerifiedSourceFooter as yt, isFamilyPlusActive as z };
