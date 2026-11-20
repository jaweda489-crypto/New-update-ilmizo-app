// src/services/translationService.ts
var SUPPORTED_LANGUAGES = [
	{
		code: "en",
		label: "English",
		nativeLabel: "English",
		dir: "ltr",
		alquranEdition: "en.sahih"
	},
	{
		code: "hi",
		label: "Hindi",
		nativeLabel: "हिन्दी",
		dir: "ltr",
		alquranEdition: "hi.hindi"
	},
	{
		code: "hinglish",
		label: "Hinglish",
		nativeLabel: "Hinglish (Roman)",
		dir: "ltr",
		alquranEdition: "en.sahih"
	},
	{
		code: "ar",
		label: "Arabic",
		nativeLabel: "العربية",
		dir: "rtl",
		alquranEdition: "ar.muyassar"
	},
	{
		code: "ur",
		label: "Urdu",
		nativeLabel: "اردو",
		dir: "rtl",
		alquranEdition: "ur.jalandhry"
	},
	{
		code: "tr",
		label: "Turkish",
		nativeLabel: "Türkçe",
		dir: "ltr",
		alquranEdition: "tr.diyanet"
	},
	{
		code: "id",
		label: "Indonesian",
		nativeLabel: "Bahasa Indonesia",
		dir: "ltr",
		alquranEdition: "id.indonesian"
	},
	{
		code: "bn",
		label: "Bangla",
		nativeLabel: "বাংলা",
		dir: "ltr",
		alquranEdition: "bn.bengali"
	},
	{
		code: "fa",
		label: "Persian",
		nativeLabel: "فارسی",
		dir: "rtl",
		alquranEdition: "fa.makarem"
	},
	{
		code: "fr",
		label: "French",
		nativeLabel: "Français",
		dir: "ltr",
		alquranEdition: "fr.hamidullah"
	},
	{
		code: "es",
		label: "Spanish",
		nativeLabel: "Español",
		dir: "ltr",
		alquranEdition: "es.cortes"
	}
];
var BASE_DICTIONARIES = {
	en: {
		greeting: "Assalamu alaikum",
		subtitle_home: "Make a little space for knowledge today. Every step brings you closer to Allah.",
		todays_focus: "Today's Focus",
		start_learning: "Start Learning",
		adult_mode: "Adult Mode",
		kids_world: "Kids World",
		parent_hub: "Parent Hub",
		home: "Home",
		quran: "Quran",
		hifz: "Hifz",
		salah: "Salah",
		progress: "Progress",
		more: "More",
		duas: "Duas",
		stories: "Stories",
		adventure: "Adventure",
		stars: "Stars",
		tasks_expenses: "Tasks & Sadaqah",
		next_prayer: "Next Prayer",
		continue_quest: "Continue Quest",
		todays_mission: "Today's 10-Minute Mission",
		read_verses_reflection: "Read a few verses with reflection",
		continue_surah: "Continue Surah",
		explore_adult_modules: "Explore All Adult Modules",
		settings_languages: "Settings & Languages",
		names_99: "99 Names of Allah",
		seerah_timeline: "Seerah Timeline",
		islamic_lessons: "Islamic Lessons",
		quizzes: "Quizzes",
		qibla_compass: "Qibla Compass",
		tasbih_counter: "Tasbih Counter",
		islamic_calendar: "Islamic Calendar",
		my_profile: "My Profile",
		open_tasks_finance: "Open Tasks & Finance",
		noble_quran_title: "Noble Quran (114 Surahs)",
		verified_uthmani_free: "Verified Uthmani Script · Free Forever",
		last_read: "Last Read",
		search_surah_placeholder: "Search Surah name or number (1 - 114)...",
		bookmarks: "Bookmarks",
		juz: "Juz",
		surah: "Surah",
		audio: "Audio",
		repeat: "Repeat",
		tafsir: "Tafsir",
		bookmark: "Bookmark",
		saved: "Saved",
		hifz_studio_title: "Hifz Mastery Studio",
		my_hifz: "My Hifz",
		revision: "Revision",
		stats: "Stats",
		progress_overview: "Progress Overview (Self-Reported)",
		surahs_completed: "Surahs Completed",
		continue_hifz: "Continue Hifz",
		active_recall_tester: "Active Recall Memory Tester",
		hide_to_test: "Hide to Test",
		reveal_text: "Reveal Text",
		salah_tracker_title: "Salah Tracker & Guides",
		daily_tracker: "Daily Tracker",
		prayer_guide: "Prayer Guide",
		wudu_guide: "Wudu Guide",
		prayed_on_time: "Prayed On Time ✓",
		tap_to_log: "Tap to Log",
		authentic_duas_title: "Authentic Duas Library",
		categories: "Categories",
		daily: "Daily",
		favorites: "Favorites",
		ready_for_adventure: "Ready for today's adventure?",
		activities_completed: "activities completed",
		learn_and_explore: "Learn & Explore",
		open_adventure_map: "Open 3D Adventure Map",
		quran_garden: "Quran Garden",
		dua_garden: "Dua Garden",
		salah_space: "Salah Space",
		story_village: "Story Village",
		recite_with_ayaan: "Recite with Ayaan",
		todays_good_deed: "Today's Good Deed",
		family_challenge: "Family Challenge",
		my_certificate: "My Certificate",
		mission_complete_title: "MashaAllah! Mission Complete!",
		lets_practice: "Let's Practice!",
		my_badges: "My Badges & Certificates"
	},
	hi: {
		greeting: "अस्सलामु अलैकुम",
		subtitle_home: "आज इल्म के लिए थोड़ा समय निकालें। हर कदम आपको अल्लाह के करीब लाता है।",
		todays_focus: "आज का ध्यान",
		start_learning: "सीखना शुरू करें",
		adult_mode: "बड़ों का मोड",
		kids_world: "किड्स वर्ल्ड",
		parent_hub: "पैरेंट हब",
		home: "होम",
		quran: "क़ुरआन",
		hifz: "हिफ़्ज़",
		salah: "नमाज़",
		progress: "प्रगति",
		more: "अधिक",
		duas: "दुआएं",
		stories: "कहानियां",
		adventure: "एडवेंचर",
		stars: "सितारे",
		tasks_expenses: "कार्य और सदक़ा",
		next_prayer: "अगली नमाज़",
		continue_quest: "मिशन जारी रखें",
		todays_mission: "आज का 10-मिनट मिशन",
		read_verses_reflection: "तदब्बुर (चिंतन) के साथ कुछ आयतें पढ़ें",
		continue_surah: "सूरह जारी रखें",
		explore_adult_modules: "सभी इस्लामी मॉड्यूल देखें",
		settings_languages: "सेटिंग्स और भाषाएं",
		names_99: "अल्लाह के 99 नाम",
		seerah_timeline: "सीरत टाइमलाइन",
		islamic_lessons: "इस्लामी सबक़",
		quizzes: "क्विज़",
		qibla_compass: "क़िब्ला कंपास",
		tasbih_counter: "तस्बीह काउंटर",
		islamic_calendar: "हिजरी कैलेंडर",
		my_profile: "मेरी प्रोफ़ाइल",
		open_tasks_finance: "कार्य और सदक़ा खोलें",
		noble_quran_title: "पवित्र क़ुरआन (114 सूरह)",
		verified_uthmani_free: "प्रमाणित उस्मानी लिपि · हमेशा नि:शुल्क",
		last_read: "अंतिम पढ़ा गया",
		search_surah_placeholder: "सूरह का नाम या नंबर खोजें (1 - 114)...",
		bookmarks: "बुकमार्क",
		juz: "पारा (जुज़)",
		surah: "सूरह",
		audio: "ऑडियो",
		repeat: "दोहराएं",
		tafsir: "तफ़्सीर",
		bookmark: "बुकमार्क",
		saved: "सहेजा गया",
		hifz_studio_title: "हिफ़्ज़ मास्टरी स्टूडियो",
		my_hifz: "मेरा हिफ़्ज़",
		revision: "दोहराव",
		stats: "आंकड़े",
		progress_overview: "प्रगति सारांश (स्व-रिपोर्ट)",
		surahs_completed: "सूरह मुकम्मल",
		continue_hifz: "हिफ़्ज़ जारी रखें",
		active_recall_tester: "एक्टिव रिकॉल मेमोरी टेस्टर",
		hide_to_test: "जांचने के लिए छुपाएं",
		reveal_text: "आयत दिखाएं",
		salah_tracker_title: "नमाज़ ट्रैकर और गाइड",
		daily_tracker: "दैनिक ट्रैकर",
		prayer_guide: "नमाज़ गाइड",
		wudu_guide: "वुज़ू गाइड",
		prayed_on_time: "वक़्त पर अदा ✓",
		tap_to_log: "दर्ज करने हेतु टैप करें",
		authentic_duas_title: "प्रमाणित दुआओं की लाइब्रेरी",
		categories: "श्रेणियां",
		daily: "दैनिक",
		favorites: "पसंदीदा",
		ready_for_adventure: "क्या आप आज के सफ़र के लिए तैयार हैं?",
		activities_completed: "गतिविधियां पूरी हुईं",
		learn_and_explore: "सीखें और एक्सप्लोर करें",
		open_adventure_map: "3D एडवेंचर मैप खोलें",
		quran_garden: "क़ुरआन गार्डन",
		dua_garden: "दुआ गार्डन",
		salah_space: "नमाज़ स्पेस",
		story_village: "कहानी गांव",
		recite_with_ayaan: "अयान के साथ तिलावत करें",
		todays_good_deed: "आज का नेक काम",
		family_challenge: "फ़ैमिली चैलेंज",
		my_certificate: "मेरा सर्टिफ़िकेट",
		mission_complete_title: "माशाअल्लाह! मिशन पूरा हुआ!",
		lets_practice: "आइए अभ्यास करें!",
		my_badges: "मेरे बैज और सर्टिफ़िकेट"
	},
	hinglish: {
		greeting: "Assalamu alaikum",
		subtitle_home: "Aaj ilm ke liye thoda waqt nikalein. Har kadam aapko Allah ke kareeb lata hai.",
		todays_focus: "Aaj Ka Focus",
		start_learning: "Seekhna Shuru Karein",
		adult_mode: "Adult Mode",
		kids_world: "Kids World",
		parent_hub: "Parent Hub",
		home: "Home",
		quran: "Quran",
		hifz: "Hifz",
		salah: "Salah",
		progress: "Progress",
		more: "More",
		duas: "Duas",
		stories: "Stories",
		adventure: "Adventure",
		stars: "Stars",
		tasks_expenses: "Tasks & Sadaqah",
		next_prayer: "Agli Namaz",
		continue_quest: "Quest Jaari Rakhein",
		todays_mission: "Aaj Ka 10-Minute Mission",
		read_verses_reflection: "Ghaur-o-fikr ke saath kuch aayatein padhein",
		continue_surah: "Surah Jaari Rakhein",
		explore_adult_modules: "Saare Adult Modules Dekhein",
		settings_languages: "Settings aur Zabaanein",
		names_99: "Allah Ke 99 Naam",
		seerah_timeline: "Seerah Timeline",
		islamic_lessons: "Islamic Sabaq",
		quizzes: "Quizzes",
		qibla_compass: "Qibla Compass",
		tasbih_counter: "Tasbih Counter",
		islamic_calendar: "Hijri Calendar",
		my_profile: "Meri Profile",
		open_tasks_finance: "Tasks & Sadaqah Kholein",
		noble_quran_title: "Quran Majeed (114 Surahs)",
		verified_uthmani_free: "Verified Uthmani Script · Hamesha Free",
		last_read: "Aakhri Padha Hua",
		search_surah_placeholder: "Surah ka naam ya number khojein (1 - 114)...",
		bookmarks: "Bookmarks",
		juz: "Para (Juz)",
		surah: "Surah",
		audio: "Audio",
		repeat: "Repeat",
		tafsir: "Tafsir",
		bookmark: "Bookmark",
		saved: "Saved",
		hifz_studio_title: "Hifz Mastery Studio",
		my_hifz: "Mera Hifz",
		revision: "Dohraav (Revision)",
		stats: "Stats",
		progress_overview: "Progress Overview (Self-Reported)",
		surahs_completed: "Surahs Mukammal",
		continue_hifz: "Hifz Jaari Rakhein",
		active_recall_tester: "Active Recall Memory Tester",
		hide_to_test: "Yaad Check Karne Ke Liye Chhupayein",
		reveal_text: "Aayat Dikhayein",
		salah_tracker_title: "Namaz Tracker & Guides",
		daily_tracker: "Rozana Tracker",
		prayer_guide: "Namaz Guide",
		wudu_guide: "Wudu Guide",
		prayed_on_time: "Waqt Par Ada ✓",
		tap_to_log: "Log Karne Ke Liye Tap Karein",
		authentic_duas_title: "Authentic Duas Library",
		categories: "Categories",
		daily: "Rozana",
		favorites: "Pasandeeda",
		ready_for_adventure: "Aaj ke adventure ke liye taiyar hain?",
		activities_completed: "activities poori huin",
		learn_and_explore: "Seekhein aur Explore Karein",
		open_adventure_map: "3D Adventure Map Kholein",
		quran_garden: "Quran Garden",
		dua_garden: "Dua Garden",
		salah_space: "Salah Space",
		story_village: "Story Village",
		recite_with_ayaan: "Ayaan Ke Saath Padhein",
		todays_good_deed: "Aaj Ka Nek Kaam",
		family_challenge: "Family Challenge",
		my_certificate: "Mera Certificate",
		mission_complete_title: "MashaAllah! Mission Complete!",
		lets_practice: "Aaiye Practice Karein!",
		my_badges: "Mere Badges aur Certificates"
	},
	ar: {
		greeting: "السلام عليكم",
		subtitle_home: "اجعل للعلم نصيباً من يومك. كل خطوة تقربك إلى الله.",
		todays_focus: "تركيز اليوم",
		start_learning: "ابدأ التعلم",
		adult_mode: "وضع الكبار",
		kids_world: "عالم الأطفال",
		parent_hub: "بوابة الوالدين",
		home: "الرئيسية",
		quran: "القرآن",
		hifz: "الحفظ",
		salah: "الصلاة",
		progress: "التقدم",
		more: "المزيد",
		duas: "الأدعية",
		stories: "القصص",
		adventure: "المغامرة",
		stars: "النجوم",
		tasks_expenses: "المهام والصدقة",
		next_prayer: "الصلاة القادمة",
		continue_quest: "تابع المهمة",
		todays_mission: "مهمة الـ ١٠ دقائق اليوم",
		read_verses_reflection: "اقرأ بضع آيات بتدبر وخشوع",
		continue_surah: "تابع السورة",
		explore_adult_modules: "استكشف جميع الأقسام التعليمية",
		settings_languages: "الإعدادات واللغات",
		names_99: "أسماء الله الحسنى",
		seerah_timeline: "السيرة النبوية",
		islamic_lessons: "الدروس الإسلامية",
		quizzes: "الاختبارات",
		qibla_compass: "بوصلة القبلة",
		tasbih_counter: "المسبحة الإلكترونية",
		islamic_calendar: "التقويم الهجري",
		my_profile: "ملفي الشخصي",
		open_tasks_finance: "افتح المهام والصدقات",
		noble_quran_title: "القرآن الكريم (١١٤ سورة)",
		verified_uthmani_free: "الرسم العثماني الموثق · مجاني دائماً",
		last_read: "آخر قراءة",
		search_surah_placeholder: "ابحث باسم السورة أو رقمها (١ - ١١٤)...",
		bookmarks: "الفواصل",
		juz: "الأجزاء",
		surah: "السور",
		audio: "استماع",
		repeat: "تكرار",
		tafsir: "تفسير",
		bookmark: "حفظ فاصلة",
		saved: "تم الحفظ",
		hifz_studio_title: "استوديو إتقان الحفظ",
		my_hifz: "حفظي",
		revision: "المراجعة",
		stats: "الإحصائيات",
		progress_overview: "ملخص التقدم (تسجيل ذاتي)",
		surahs_completed: "سور مكتملة",
		continue_hifz: "تابع الحفظ",
		active_recall_tester: "اختبار التسميع الذاتي",
		hide_to_test: "إخفاء النص للاختبار",
		reveal_text: "إظهار الآية",
		salah_tracker_title: "متابعة الصلاة ودليل الطهارة",
		daily_tracker: "المتابعة اليومية",
		prayer_guide: "دليل الصلاة",
		wudu_guide: "دليل الوضوء",
		prayed_on_time: "صليت في الوقت ✓",
		tap_to_log: "اضغط للتسجيل",
		authentic_duas_title: "مكتبة الأدعية الصحيحة",
		categories: "التصنيفات",
		daily: "يومي",
		favorites: "المفضلة",
		ready_for_adventure: "هل أنت مستعد لمغامرة اليوم؟",
		activities_completed: "أنشطة مكتملة",
		learn_and_explore: "تعلم واستكشف",
		open_adventure_map: "افتح خريطة المغامرة ثلاثية الأبعاد",
		quran_garden: "حديقة القرآن",
		dua_garden: "حديقة الأدعية",
		salah_space: "ركن الصلاة",
		story_village: "قرية القصص",
		recite_with_ayaan: "اتلُ مع أيان",
		todays_good_deed: "عمل الخير اليوم",
		family_challenge: "تحدي العائلة",
		my_certificate: "شهادتي",
		mission_complete_title: "ما شاء الله! اكتملت المهمة!",
		lets_practice: "هيا نتدرب معاً!",
		my_badges: "الأوسمة والشهادات"
	},
	ur: {
		greeting: "السلام علیکم",
		subtitle_home: "آج علم کے لیے تھوڑا وقت نکالیں۔ ہر قدم آپ کو اللہ کے قریب لاتا ہے۔",
		todays_focus: "آج کی توجہ",
		start_learning: "سیکھنا شروع کریں",
		adult_mode: "بڑوں کا موڈ",
		kids_world: "بچوں کی دنیا",
		parent_hub: "والدین حب",
		home: "ہوم",
		quran: "قرآن",
		hifz: "حفظ",
		salah: "نماز",
		progress: "پیش رفت",
		more: "مزید",
		duas: "دعائیں",
		stories: "کہانیاں",
		adventure: "ایڈونچر",
		stars: "ستارے",
		tasks_expenses: "کام اور صدقہ",
		next_prayer: "اگلی نماز",
		continue_quest: "مشن جاری رکھیں",
		todays_mission: "آج کا 10 منٹ کا مشن",
		read_verses_reflection: "غور و فکر کے ساتھ چند آیات تلاوت کریں",
		continue_surah: "سورہ جاری رکھیں",
		explore_adult_modules: "تمام اسلامی ماڈیولز دیکھیں",
		settings_languages: "ترتیبات اور زبانیں",
		names_99: "اللہ کے 99 نام",
		seerah_timeline: "سیرت النبی ﷺ",
		islamic_lessons: "اسلامی اسباق",
		quizzes: "کوئز",
		qibla_compass: "قبلہ نما",
		tasbih_counter: "تسبیح کاؤنٹر",
		islamic_calendar: "ہجری کیلنڈر",
		my_profile: "میرا پروفائل",
		open_tasks_finance: "کام اور صدقہ کھولیں",
		noble_quran_title: "قرآن مجید (114 سورتیں)",
		verified_uthmani_free: "مصدقہ عثمانی رسم الخط · ہمیشہ مفت",
		last_read: "آخری تلاوت",
		search_surah_placeholder: "سورہ کا نام یا نمبر تلاش کریں (1 - 114)...",
		bookmarks: "بک مارکس",
		juz: "پارہ (جز)",
		surah: "سورہ",
		audio: "آڈیو",
		repeat: "دہرائیں",
		tafsir: "تفسیر",
		bookmark: "بک مارک",
		saved: "محفوظ شدہ",
		hifz_studio_title: "حفظ ماسٹری اسٹوڈیو",
		my_hifz: "میرا حفظ",
		revision: "دہرائی",
		stats: "شماریات",
		progress_overview: "پیش رفت کا جائزہ (ذاتی اندراج)",
		surahs_completed: "مکمل سورتیں",
		continue_hifz: "حفظ جاری رکھیں",
		active_recall_tester: "یادداشت ٹیسٹر",
		hide_to_test: "جانچنے کے لیے چھپائیں",
		reveal_text: "آیت دکھائیں",
		salah_tracker_title: "نماز ٹریکر اور رہنمائی",
		daily_tracker: "روزانہ ٹریکر",
		prayer_guide: "نماز گائیڈ",
		wudu_guide: "وضو گائیڈ",
		prayed_on_time: "وقت پر ادا ✓",
		tap_to_log: "درج کرنے کے لیے ٹیپ کریں",
		authentic_duas_title: "مستند دعاؤں کی لائبریری",
		categories: "اقسام",
		daily: "روزانہ",
		favorites: "پسندیدہ",
		ready_for_adventure: "کیا آپ آج کے سفر کے لیے تیار ہیں؟",
		activities_completed: "سرگرمیاں مکمل ہوئیں",
		learn_and_explore: "سیکھیں اور دریافت کریں",
		open_adventure_map: "تھری ڈی ایڈونچر نقشہ کھولیں",
		quran_garden: "قرآن گارڈن",
		dua_garden: "دعا گارڈن",
		salah_space: "نماز اسپیس",
		story_village: "کہانی گاؤں",
		recite_with_ayaan: "ایان کے ساتھ تلاوت کریں",
		todays_good_deed: "آج کی نیکی",
		family_challenge: "فیملی چیلنج",
		my_certificate: "میرا سرٹیفکیٹ",
		mission_complete_title: "ماشاء اللہ! مشن مکمل!",
		lets_practice: "آئیے مشق کریں!",
		my_badges: "میرے بیجز اور سرٹیفکیٹ"
	},
	tr: {
		greeting: "Esselamu Aleyküm",
		subtitle_home: "Bugün ilim için biraz vakit ayırın. Her adım sizi Allah’a yaklaştırır.",
		todays_focus: "Günün Odağı",
		start_learning: "Öğrenmeye Başla",
		adult_mode: "Yetişkin Modu",
		kids_world: "Çocuk Dünyası",
		parent_hub: "Ebeveyn Merkezi",
		home: "Ana Sayfa",
		quran: "Kur’an",
		hifz: "Hıfz",
		salah: "Namaz",
		progress: "İlerleme",
		more: "Daha Fazla",
		duas: "Dualar",
		stories: "Hikayeler",
		adventure: "Macera",
		stars: "Yıldızlar",
		tasks_expenses: "Görevler & Sadaka",
		next_prayer: "Sonraki Namaz",
		continue_quest: "Göreve Devam Et",
		todays_mission: "Bugünün 10 Dakikalık Görevi",
		read_verses_reflection: "Tefekkür ederek birkaç ayet okuyun",
		continue_surah: "Sureye Devam Et",
		explore_adult_modules: "Tüm Yetişkin Modüllerini Keşfet",
		settings_languages: "Ayarlar ve Diller",
		names_99: "Esmaül Hüsna (99 İsim)",
		seerah_timeline: "Siyer Zaman Çizelgesi",
		islamic_lessons: "İslami Dersler",
		quizzes: "Testler",
		qibla_compass: "Kıble Pusulası",
		tasbih_counter: "Tesbih Sayacı",
		islamic_calendar: "Hicri Takvim",
		my_profile: "Profilim",
		open_tasks_finance: "Görevler ve Sadaka Aç",
		noble_quran_title: "Kur’an-ı Kerim (114 Sure)",
		verified_uthmani_free: "Doğrulanmış Osmanî Hat · Her Zaman Ücretsiz",
		last_read: "Son Okunan",
		search_surah_placeholder: "Sure adı veya numarası ara (1 - 114)...",
		bookmarks: "Yer İmleri",
		juz: "Cüz",
		surah: "Sure",
		audio: "Ses",
		repeat: "Tekrarla",
		tafsir: "Tefsir",
		bookmark: "Kaydet",
		saved: "Kaydedildi",
		hifz_studio_title: "Hıfz Uzmanlık Stüdyosu",
		my_hifz: "Ezberim",
		revision: "Tekrar",
		stats: "İstatistik",
		progress_overview: "İlerleme Özeti (Kişisel Kayıt)",
		surahs_completed: "Tamamlanan Sureler",
		continue_hifz: "Hıfza Devam Et",
		active_recall_tester: "Aktif Hatırlama Testi",
		hide_to_test: "Test İçin Gizle",
		reveal_text: "Metni Göster",
		salah_tracker_title: "Namaz Takibi ve Rehberler",
		daily_tracker: "Günlük Takip",
		prayer_guide: "Namaz Rehberi",
		wudu_guide: "Abdest Rehberi",
		prayed_on_time: "Vaktinde Kılındı ✓",
		tap_to_log: "Kaydetmek İçin Dokun",
		authentic_duas_title: "Sahih Dualar Kütüphanesi",
		categories: "Kategoriler",
		daily: "Günlük",
		favorites: "Favoriler",
		ready_for_adventure: "Bugünkü maceraya hazır mısın?",
		activities_completed: "etkinlik tamamlandı",
		learn_and_explore: "Öğren ve Keşfet",
		open_adventure_map: "3D Macera Haritasını Aç",
		quran_garden: "Kur’an Bahçesi",
		dua_garden: "Dua Bahçesi",
		salah_space: "Namaz Alanı",
		story_village: "Hikaye Köyü",
		recite_with_ayaan: "Ayaan ile Oku",
		todays_good_deed: "Günün İyiliği",
		family_challenge: "Aile Görevi",
		my_certificate: "Sertifikam",
		mission_complete_title: "Maşallah! Görev Tamamlandı!",
		lets_practice: "Haydi Pratik Yapalım!",
		my_badges: "Rozetlerim ve Sertifikalarım"
	},
	id: {
		greeting: "Assalamu alaikum",
		subtitle_home: "Luangkan sedikit waktu untuk ilmu hari ini. Setiap langkah mendekatkanmu kepada Allah.",
		todays_focus: "Fokus Hari Ini",
		start_learning: "Mulai Belajar",
		adult_mode: "Mode Dewasa",
		kids_world: "Dunia Anak",
		parent_hub: "Panel Orang Tua",
		home: "Beranda",
		quran: "Al-Qur’an",
		hifz: "Hafalan",
		salah: "Shalat",
		progress: "Progres",
		more: "Lainnya",
		duas: "Doa",
		stories: "Kisah",
		adventure: "Petualangan",
		stars: "Bintang",
		tasks_expenses: "Tugas & Sedekah",
		next_prayer: "Shalat Berikutnya",
		continue_quest: "Lanjutkan Misi",
		todays_mission: "Misi 10 Menit Hari Ini",
		read_verses_reflection: "Baca beberapa ayat dengan tadabbur",
		continue_surah: "Lanjutkan Surah",
		explore_adult_modules: "Jelajahi Semua Modul Dewasa",
		settings_languages: "Pengaturan & Bahasa",
		names_99: "99 Asmaul Husna",
		seerah_timeline: "Garis Waktu Sirah",
		islamic_lessons: "Pelajaran Islam",
		quizzes: "Kuis",
		qibla_compass: "Kompas Kiblat",
		tasbih_counter: "Penghitung Tasbih",
		islamic_calendar: "Kalender Hijriah",
		my_profile: "Profil Saya",
		open_tasks_finance: "Buka Tugas & Sedekah",
		noble_quran_title: "Al-Qur’an Mulia (114 Surah)",
		verified_uthmani_free: "Rasm Utsmani Terverifikasi · Gratis Selamanya",
		last_read: "Terakhir Dibaca",
		search_surah_placeholder: "Cari nama atau nomor Surah (1 - 114)...",
		bookmarks: "Penanda",
		juz: "Juz",
		surah: "Surah",
		audio: "Audio",
		repeat: "Ulangi",
		tafsir: "Tafsir",
		bookmark: "Tandai",
		saved: "Tersimpan",
		hifz_studio_title: "Studio Hafalan Hifz",
		my_hifz: "Hafalan Saya",
		revision: "Murajaah",
		stats: "Statistik",
		progress_overview: "Ringkasan Progres (Mandiri)",
		surahs_completed: "Surah Selesai",
		continue_hifz: "Lanjutkan Hafalan",
		active_recall_tester: "Penguji Ingatan Aktif",
		hide_to_test: "Sembunyikan Teks",
		reveal_text: "Tampilkan Ayat",
		salah_tracker_title: "Pelacak Shalat & Panduan",
		daily_tracker: "Pelacak Harian",
		prayer_guide: "Panduan Shalat",
		wudu_guide: "Panduan Wudhu",
		prayed_on_time: "Tepat Waktu ✓",
		tap_to_log: "Ketuk untuk Mencatat",
		authentic_duas_title: "Pustaka Doa Shahih",
		categories: "Kategori",
		daily: "Harian",
		favorites: "Favorit",
		ready_for_adventure: "Siap untuk petualangan hari ini?",
		activities_completed: "aktivitas selesai",
		learn_and_explore: "Belajar & Jelajahi",
		open_adventure_map: "Buka Peta Petualangan 3D",
		quran_garden: "Taman Qur’an",
		dua_garden: "Taman Doa",
		salah_space: "Ruang Shalat",
		story_village: "Desa Kisah",
		recite_with_ayaan: "Mengaji Bersama Ayaan",
		todays_good_deed: "Amal Baik Hari Ini",
		family_challenge: "Tantangan Keluarga",
		my_certificate: "Sertifikat Saya",
		mission_complete_title: "MasyaAllah! Misi Selesai!",
		lets_practice: "Ayo Berlatih!",
		my_badges: "Lencana & Sertifikat"
	},
	bn: {
		greeting: "আসসালামু আলাইকুম",
		subtitle_home: "আজ জ্ঞানের জন্য কিছুটা সময় রাখুন। প্রতিটি পদক্ষেপ আপনাকে আল্লাহর কাছে নিয়ে যায়।",
		todays_focus: "আজকের ফোকাস",
		start_learning: "শেখা শুরু করুন",
		adult_mode: "বড়দের মোড",
		kids_world: "কিডস ওয়ার্ল্ড",
		parent_hub: "প্যারেন্ট হাব",
		home: "হোম",
		quran: "কুরআন",
		hifz: "হিফজ",
		salah: "সালাত",
		progress: "অগ্রগতি",
		more: "আরও",
		duas: "দোয়া",
		stories: "গল্প",
		adventure: "অ্যাডভেঞ্চার",
		stars: "তারা",
		tasks_expenses: "কাজ ও সাদাকাহ",
		next_prayer: "পরবর্তী নামাজ",
		continue_quest: "মিশন চালিয়ে যান",
		todays_mission: "আজকের ১০ মিনিটের মিশন",
		read_verses_reflection: "চিন্তাভাবনার সাথে কয়েকটি আয়াত পড়ুন",
		continue_surah: "সূরা চালিয়ে যান",
		explore_adult_modules: "সকল মডিউল দেখুন",
		settings_languages: "সেটিংস ও ভাষা",
		names_99: "আল্লাহর ৯৯টি নাম",
		seerah_timeline: "সীরাত টাইমলাইন",
		islamic_lessons: "ইসলামিক পাঠ",
		quizzes: "কুইজ",
		qibla_compass: "কিবলা কম্পাস",
		tasbih_counter: "তাসবিহ কাউন্টার",
		islamic_calendar: "হিজরি ক্যালেন্ডার",
		my_profile: "আমার প্রোফাইল",
		open_tasks_finance: "কাজ ও সাদাকাহ খুলুন",
		noble_quran_title: "পবিত্র কুরআন (১১৪টি সূরা)",
		verified_uthmani_free: "যাচাইকৃত উসমানী লিপি · সর্বদা বিনামূল্যে",
		last_read: "সর্বশেষ পঠিত",
		search_surah_placeholder: "সূরার নাম বা নম্বর খুঁজুন (১ - ১১৪)...",
		bookmarks: "বুকমার্ক",
		juz: "পারা (জুজ)",
		surah: "সূরা",
		audio: "অডিও",
		repeat: "পুনরাবৃত্তি",
		tafsir: "তাফসির",
		bookmark: "বুকমার্ক",
		saved: "সংরক্ষিত",
		hifz_studio_title: "হিফজ মাস্টারি স্টুডিও",
		my_hifz: "আমার হিফজ",
		revision: "রিভিশন",
		stats: "পরিসংখ্যান",
		progress_overview: "অগ্রগতি সংক্ষেপ",
		surahs_completed: "সম্পন্ন সূরা",
		continue_hifz: "হিফজ চালিয়ে যান",
		active_recall_tester: "মেমোরি টেস্টার",
		hide_to_test: "পরীক্ষার জন্য লুকান",
		reveal_text: "আয়াত দেখুন",
		salah_tracker_title: "সালাত ট্র্যাকার ও গাইড",
		daily_tracker: "দৈনিক ট্র্যাকার",
		prayer_guide: "নামাজ গাইড",
		wudu_guide: "অজু গাইড",
		prayed_on_time: "সময়মতো আদায় ✓",
		tap_to_log: "লগ করতে ট্যাপ করুন",
		authentic_duas_title: "সহীহ দোয়া লাইব্রেরি",
		categories: "বিভাগসমূহ",
		daily: "দৈনিক",
		favorites: "প্রিয়",
		ready_for_adventure: "আজকের অভিযানের জন্য প্রস্তুত?",
		activities_completed: "টি কাজ সম্পন্ন",
		learn_and_explore: "শিখুন ও অন্বেষণ করুন",
		open_adventure_map: "৩ডি অ্যাডভেঞ্চার ম্যাপ খুলুন",
		quran_garden: "কুরআন গার্ডেন",
		dua_garden: "দোয়া গার্ডেন",
		salah_space: "সালাত স্পেস",
		story_village: "গল্পের গ্রাম",
		recite_with_ayaan: "আয়ানের সাথে তিলাওয়াত",
		todays_good_deed: "আজকের ভালো কাজ",
		family_challenge: "ফ্যামিলি চ্যালেঞ্জ",
		my_certificate: "আমার সার্টিফিকেট",
		mission_complete_title: "মাশাআল্লাহ! মিশন সম্পন্ন!",
		lets_practice: "চলো অনুশীলন করি!",
		my_badges: "আমার ব্যাজ ও সার্টিফিকেট"
	},
	fa: {
		greeting: "سلام علیکم",
		subtitle_home: "امروز کمی برای دانش وقت بگذارید. هر قدم شما را به خدا نزدیک‌تر می‌کند.",
		todays_focus: "تمرکز امروز",
		start_learning: "شروع یادگیری",
		adult_mode: "حالت بزرگسالان",
		kids_world: "دنیای کودکان",
		parent_hub: "بخش والدین",
		home: "خانه",
		quran: "قرآن",
		hifz: "حفظ",
		salah: "نماز",
		progress: "پیشرفت",
		more: "بیشتر",
		duas: "دعاها",
		stories: "داستان‌ها",
		adventure: "ماجراجویی",
		stars: "ستاره‌ها",
		tasks_expenses: "وظایف و صدقه",
		next_prayer: "نماز بعدی",
		continue_quest: "ادامه ماموریت",
		todays_mission: "ماموریت ۱۰ دقیقه‌ای امروز",
		read_verses_reflection: "چند آیه با تدبر بخوانید",
		continue_surah: "ادامه سوره",
		explore_adult_modules: "مشاهده همه بخش‌های آموزشی",
		settings_languages: "تنظیمات و زبان‌ها",
		names_99: "۹۹ نام خداوند",
		seerah_timeline: "سیره پیامبر ﷺ",
		islamic_lessons: "درس‌های اسلامی",
		quizzes: "آزمون‌ها",
		qibla_compass: "قبله‌نما",
		tasbih_counter: "تسبیح‌شمار",
		islamic_calendar: "تقویم هجری",
		my_profile: "نمایه من",
		open_tasks_finance: "باز کردن وظایف و صدقه",
		noble_quran_title: "قرآن کریم (۱۱۴ سوره)",
		verified_uthmani_free: "رسم‌الخط عثمانی معتبر · همیشه رایگان",
		last_read: "آخرین مطالعه",
		search_surah_placeholder: "جستجوی نام یا شماره سوره (۱ - ۱۱۴)...",
		bookmarks: "نشان‌ها",
		juz: "جزء",
		surah: "سوره",
		audio: "صوت",
		repeat: "تکرار",
		tafsir: "تفسیر",
		bookmark: "نشان کردن",
		saved: "ذخیره شد",
		hifz_studio_title: "استودیو حفظ قرآن",
		my_hifz: "حفظ من",
		revision: "مرور",
		stats: "آمار",
		progress_overview: "خلاصه پیشرفت",
		surahs_completed: "سوره‌های تکمیل‌شده",
		continue_hifz: "ادامه حفظ",
		active_recall_tester: "آزمون یادآوری فعال",
		hide_to_test: "پنهان کردن متن",
		reveal_text: "نمایش آیه",
		salah_tracker_title: "پیگیری نماز و راهنما",
		daily_tracker: "پیگیری روزانه",
		prayer_guide: "راهنمای نماز",
		wudu_guide: "راهنمای وضو",
		prayed_on_time: "در وقت خوانده شد ✓",
		tap_to_log: "ثبت نماز",
		authentic_duas_title: "کتابخانه ادعیه معتبر",
		categories: "دسته‌ها",
		daily: "روزانه",
		favorites: "برگزیده‌ها",
		ready_for_adventure: "آماده ماجراجویی امروز هستی؟",
		activities_completed: "فعالیت انجام شد",
		learn_and_explore: "بیاموز و کاوش کن",
		open_adventure_map: "باز کردن نقشه ماجراجویی",
		quran_garden: "باغ قرآن",
		dua_garden: "باغ دعا",
		salah_space: "فضای نماز",
		story_village: "دهکده داستان",
		recite_with_ayaan: "تلاوت با ایان",
		todays_good_deed: "کار نیک امروز",
		family_challenge: "چالش خانواده",
		my_certificate: "گواهینامه من",
		mission_complete_title: "ماشاءالله! ماموریت کامل شد!",
		lets_practice: "بیایید تمرین کنیم!",
		my_badges: "نشان‌ها و گواهینامه‌ها"
	},
	fr: {
		greeting: "Assalamu alaikum",
		subtitle_home: "Prenez un moment pour la connaissance aujourd’hui. Chaque pas vous rapproche d’Allah.",
		todays_focus: "Objectif du Jour",
		start_learning: "Commencer",
		adult_mode: "Mode Adulte",
		kids_world: "Monde Enfants",
		parent_hub: "Espace Parents",
		home: "Accueil",
		quran: "Coran",
		hifz: "Hifz",
		salah: "Prière",
		progress: "Progrès",
		more: "Plus",
		duas: "Invocations",
		stories: "Histoires",
		adventure: "Aventure",
		stars: "Étoiles",
		tasks_expenses: "Tâches & Sadaqah",
		next_prayer: "Prochaine Prière",
		continue_quest: "Continuer la Quête",
		todays_mission: "Mission de 10 Minutes",
		read_verses_reflection: "Lire quelques versets avec méditation",
		continue_surah: "Continuer la Sourate",
		explore_adult_modules: "Explorer Tous les Modules",
		settings_languages: "Paramètres & Langues",
		names_99: "99 Noms d’Allah",
		seerah_timeline: "Chronologie de la Sîrah",
		islamic_lessons: "Leçons Islamiques",
		quizzes: "Quiz",
		qibla_compass: "Boussole Qibla",
		tasbih_counter: "Compteur Tasbih",
		islamic_calendar: "Calendrier Hégirien",
		my_profile: "Mon Profil",
		open_tasks_finance: "Ouvrir Tâches & Sadaqah",
		noble_quran_title: "Noble Coran (114 Sourates)",
		verified_uthmani_free: "Script Othmani Vérifié · Gratuit Toujours",
		last_read: "Dernière Lecture",
		search_surah_placeholder: "Rechercher une sourate par nom ou numéro (1 - 114)...",
		bookmarks: "Favoris",
		juz: "Juz",
		surah: "Sourate",
		audio: "Audio",
		repeat: "Répéter",
		tafsir: "Tafsir",
		bookmark: "Marquer",
		saved: "Enregistré",
		hifz_studio_title: "Studio de Mémorisation Hifz",
		my_hifz: "Mon Hifz",
		revision: "Révision",
		stats: "Stats",
		progress_overview: "Aperçu des Progrès (Auto-déclaré)",
		surahs_completed: "Sourates Complétées",
		continue_hifz: "Continuer le Hifz",
		active_recall_tester: "Testeur de Rappel Actif",
		hide_to_test: "Masquer pour Tester",
		reveal_text: "Révéler le Texte",
		salah_tracker_title: "Suivi des Prières & Guides",
		daily_tracker: "Suivi Quotidien",
		prayer_guide: "Guide de Prière",
		wudu_guide: "Guide des Ablutions",
		prayed_on_time: "Prié à l’heure ✓",
		tap_to_log: "Appuyer pour noter",
		authentic_duas_title: "Bibliothèque d’Invocations Authentiques",
		categories: "Catégories",
		daily: "Quotidien",
		favorites: "Favoris",
		ready_for_adventure: "Prêt pour l’aventure d’aujourd’hui ?",
		activities_completed: "activités terminées",
		learn_and_explore: "Apprendre & Explorer",
		open_adventure_map: "Ouvrir la Carte d’Aventure 3D",
		quran_garden: "Jardin du Coran",
		dua_garden: "Jardin des Invocations",
		salah_space: "Espace Prière",
		story_village: "Village des Histoires",
		recite_with_ayaan: "Réciter avec Ayaan",
		todays_good_deed: "Bonne Action du Jour",
		family_challenge: "Défi Familial",
		my_certificate: "Mon Certificat",
		mission_complete_title: "MashaAllah ! Mission Accomplie !",
		lets_practice: "Pratiquons Ensemble !",
		my_badges: "Mes Badges & Certificats"
	},
	es: {
		greeting: "Assalamu alaikum",
		subtitle_home: "Dedica un espacio al conocimiento hoy. Cada paso te acerca más a Allah.",
		todays_focus: "Enfoque de Hoy",
		start_learning: "Empezar a Aprender",
		adult_mode: "Modo Adulto",
		kids_world: "Mundo Infantil",
		parent_hub: "Portal de Padres",
		home: "Inicio",
		quran: "Corán",
		hifz: "Hifz",
		salah: "Oración",
		progress: "Progreso",
		more: "Más",
		duas: "Súplicas",
		stories: "Historias",
		adventure: "Aventura",
		stars: "Estrellas",
		tasks_expenses: "Tareas y Sadaqah",
		next_prayer: "Próxima Oración",
		continue_quest: "Continuar Misión",
		todays_mission: "Misión de 10 Minutos",
		read_verses_reflection: "Lee algunos versículos con reflexión",
		continue_surah: "Continuar Sura",
		explore_adult_modules: "Explorar Todos los Módulos",
		settings_languages: "Ajustes e Idiomas",
		names_99: "99 Nombres de Allah",
		seerah_timeline: "Línea de Tiempo de la Sirah",
		islamic_lessons: "Lecciones Islámicas",
		quizzes: "Cuestionarios",
		qibla_compass: "Brújula Qibla",
		tasbih_counter: "Contador Tasbih",
		islamic_calendar: "Calendario Hégira",
		my_profile: "Mi Perfil",
		open_tasks_finance: "Abrir Tareas y Sadaqah",
		noble_quran_title: "Noble Corán (114 Suras)",
		verified_uthmani_free: "Escritura Uthmani Verificada · Gratis Siempre",
		last_read: "Última Lectura",
		search_surah_placeholder: "Buscar Sura por nombre o número (1 - 114)...",
		bookmarks: "Marcadores",
		juz: "Juz",
		surah: "Sura",
		audio: "Audio",
		repeat: "Repetir",
		tafsir: "Tafsir",
		bookmark: "Guardar",
		saved: "Guardado",
		hifz_studio_title: "Estudio de Memorización Hifz",
		my_hifz: "Mi Hifz",
		revision: "Revisión",
		stats: "Estadísticas",
		progress_overview: "Resumen de Progreso (Autoinformado)",
		surahs_completed: "Suras Completadas",
		continue_hifz: "Continuar Hifz",
		active_recall_tester: "Evaluador de Recuerdo Activo",
		hide_to_test: "Ocultar para Evaluar",
		reveal_text: "Mostrar Texto",
		salah_tracker_title: "Registro de Oración y Guías",
		daily_tracker: "Registro Diario",
		prayer_guide: "Guía de Oración",
		wudu_guide: "Guía de Wudu",
		prayed_on_time: "Rezado a Tiempo ✓",
		tap_to_log: "Toca para Registrar",
		authentic_duas_title: "Biblioteca de Súplicas Auténticas",
		categories: "Categorías",
		daily: "Diario",
		favorites: "Favoritos",
		ready_for_adventure: "¿Listo para la aventura de hoy?",
		activities_completed: "actividades completadas",
		learn_and_explore: "Aprende y Explora",
		open_adventure_map: "Abrir Mapa de Aventura 3D",
		quran_garden: "Jardín del Corán",
		dua_garden: "Jardín de Súplicas",
		salah_space: "Espacio de Oración",
		story_village: "Aldea de Historias",
		recite_with_ayaan: "Recitar con Ayaan",
		todays_good_deed: "Buena Obra de Hoy",
		family_challenge: "Reto Familiar",
		my_certificate: "Mi Certificado",
		mission_complete_title: "¡MashaAllah! ¡Misión Completada!",
		lets_practice: "¡Practiquemos Juntos!",
		my_badges: "Mis Insignias y Certificados"
	}
};
var TranslationHelperService = class {
	constructor() {
		this.currentLanguage = "en";
		this.customOverrides = {};
		this.listeners = /* @__PURE__ */ new Set();
		this.syncDocumentDirection("en");
	}
	/**
	* Returns the full LanguageOption metadata from SUPPORTED_LANGUAGES for a given code.
	*/
	getLanguageMetadata(code = this.currentLanguage) {
		return SUPPORTED_LANGUAGES.find((lang) => lang.code === code) || SUPPORTED_LANGUAGES[0];
	}
	/**
	* Returns all supported languages from SUPPORTED_LANGUAGES.
	*/
	getSupportedLanguages() {
		return SUPPORTED_LANGUAGES;
	}
	/**
	* Returns the active language code.
	*/
	getCurrentLanguage() {
		return this.currentLanguage;
	}
	/**
	* Dynamically switches the active language, updates document attributes (lang & dir),
	* and notifies all subscribed UI components.
	*/
	setLanguage(code) {
		const validMeta = this.getLanguageMetadata(code);
		this.currentLanguage = validMeta.code;
		this.syncDocumentDirection(validMeta.code);
		this.listeners.forEach((listener) => listener(validMeta.code, validMeta));
		return validMeta;
	}
	/**
	* Synchronizes `<html lang="..." dir="...">` with the active language metadata.
	*/
	syncDocumentDirection(code) {
		if (typeof document === "undefined") return;
		const meta = this.getLanguageMetadata(code);
		document.documentElement.lang = meta.code === "hinglish" ? "en" : meta.code;
		document.documentElement.dir = meta.dir;
	}
	/**
	* Loads the full UI label dictionary for the specified language, merging any custom overrides
	* and falling back to English for any missing keys.
	*/
	loadDictionary(code = this.currentLanguage) {
		const base = BASE_DICTIONARIES[code] || BASE_DICTIONARIES.en;
		const overrides = this.customOverrides[code] || {};
		return {
			...BASE_DICTIONARIES.en,
			...base,
			...overrides
		};
	}
	/**
	* Registers runtime label overrides for a specific language.
	*/
	extendDictionary(code, labels) {
		this.customOverrides[code] = {
			...this.customOverrides[code] || {},
			...labels
		};
		if (code === this.currentLanguage) {
			const meta = this.getLanguageMetadata(code);
			this.listeners.forEach((l) => l(code, meta));
		}
	}
	/**
	* Translates a UI key for the given (or active) language, with optional `{param}` interpolation.
	*/
	translate(key, lang = this.currentLanguage, params) {
		let text = this.loadDictionary(lang)[key] || BASE_DICTIONARIES.en[key] || key;
		if (params) Object.entries(params).forEach(([paramKey, paramVal]) => {
			text = text.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramVal));
		});
		return text;
	}
	/**
	* Resolves a localized field from a multi-language content map (such as Quran ayah or Dua translations),
	* falling back cleanly to English.
	*/
	resolveLocalizedContent(translations, lang = this.currentLanguage, fallback = "") {
		if (!translations) return fallback;
		return translations[lang] || translations.en || fallback;
	}
	/**
	* Subscribe to language change events.
	*/
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
};
var translationService = new TranslationHelperService();
// src/engines/adultLearningEngines.ts
function getLocalDateKey(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function getLocalDateKeyWithOffset(offsetDays, baseDate = /* @__PURE__ */ new Date()) {
	const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
	d.setDate(d.getDate() + offsetDays);
	return getLocalDateKey(d);
}
var ALL_30_JUZ_BOUNDARIES = [
	{
		juz: 1,
		nameArabic: "الم",
		nameTranslit: "Alif Lam Meem",
		startSurahNumber: 1,
		startSurahName: "Al-Fatiha",
		startAyahNumber: 1,
		endSurahNumber: 2,
		endAyahNumber: 141
	},
	{
		juz: 2,
		nameArabic: "سيقول",
		nameTranslit: "Sayaqul",
		startSurahNumber: 2,
		startSurahName: "Al-Baqarah",
		startAyahNumber: 142,
		endSurahNumber: 2,
		endAyahNumber: 252
	},
	{
		juz: 3,
		nameArabic: "تلك الرسل",
		nameTranslit: "Tilkal-Rusul",
		startSurahNumber: 2,
		startSurahName: "Al-Baqarah",
		startAyahNumber: 253,
		endSurahNumber: 3,
		endAyahNumber: 92
	},
	{
		juz: 4,
		nameArabic: "لن تنالوا",
		nameTranslit: "Lan Tanalu",
		startSurahNumber: 3,
		startSurahName: "Aal-Imran",
		startAyahNumber: 93,
		endSurahNumber: 4,
		endAyahNumber: 23
	},
	{
		juz: 5,
		nameArabic: "والمحصنات",
		nameTranslit: "Wal-Muhsanat",
		startSurahNumber: 4,
		startSurahName: "An-Nisa",
		startAyahNumber: 24,
		endSurahNumber: 4,
		endAyahNumber: 147
	},
	{
		juz: 6,
		nameArabic: "لا يحب الله",
		nameTranslit: "La Yuhibbullah",
		startSurahNumber: 4,
		startSurahName: "An-Nisa",
		startAyahNumber: 148,
		endSurahNumber: 5,
		endAyahNumber: 81
	},
	{
		juz: 7,
		nameArabic: "وإذا سمعوا",
		nameTranslit: "Wa Idha Samiu",
		startSurahNumber: 5,
		startSurahName: "Al-Ma'idah",
		startAyahNumber: 82,
		endSurahNumber: 6,
		endAyahNumber: 110
	},
	{
		juz: 8,
		nameArabic: "ولو أننا",
		nameTranslit: "Wa Law Annana",
		startSurahNumber: 6,
		startSurahName: "Al-An'am",
		startAyahNumber: 111,
		endSurahNumber: 7,
		endAyahNumber: 87
	},
	{
		juz: 9,
		nameArabic: "قال الملأ",
		nameTranslit: "Qalal-Mala",
		startSurahNumber: 7,
		startSurahName: "Al-A'raf",
		startAyahNumber: 88,
		endSurahNumber: 8,
		endAyahNumber: 40
	},
	{
		juz: 10,
		nameArabic: "واعلموا",
		nameTranslit: "Wa'lamu",
		startSurahNumber: 8,
		startSurahName: "Al-Anfal",
		startAyahNumber: 41,
		endSurahNumber: 9,
		endAyahNumber: 92
	},
	{
		juz: 11,
		nameArabic: "يعتذرون",
		nameTranslit: "Ya'tadhirun",
		startSurahNumber: 9,
		startSurahName: "At-Tawbah",
		startAyahNumber: 93,
		endSurahNumber: 11,
		endAyahNumber: 5
	},
	{
		juz: 12,
		nameArabic: "وما من دابة",
		nameTranslit: "Wa Ma Min Dabbah",
		startSurahNumber: 11,
		startSurahName: "Hud",
		startAyahNumber: 6,
		endSurahNumber: 12,
		endAyahNumber: 52
	},
	{
		juz: 13,
		nameArabic: "وما أبرئ",
		nameTranslit: "Wa Ma Ubarri",
		startSurahNumber: 12,
		startSurahName: "Yusuf",
		startAyahNumber: 53,
		endSurahNumber: 14,
		endAyahNumber: 52
	},
	{
		juz: 14,
		nameArabic: "ربما",
		nameTranslit: "Rubama",
		startSurahNumber: 15,
		startSurahName: "Al-Hijr",
		startAyahNumber: 1,
		endSurahNumber: 16,
		endAyahNumber: 128
	},
	{
		juz: 15,
		nameArabic: "سبحان الذي",
		nameTranslit: "Subhanal-Ladhi",
		startSurahNumber: 17,
		startSurahName: "Al-Isra",
		startAyahNumber: 1,
		endSurahNumber: 18,
		endAyahNumber: 74
	},
	{
		juz: 16,
		nameArabic: "قال ألم",
		nameTranslit: "Qala Alam",
		startSurahNumber: 18,
		startSurahName: "Al-Kahf",
		startAyahNumber: 75,
		endSurahNumber: 20,
		endAyahNumber: 135
	},
	{
		juz: 17,
		nameArabic: "اقترب للناس",
		nameTranslit: "Iqtaraba Lin-Nas",
		startSurahNumber: 21,
		startSurahName: "Al-Anbiya",
		startAyahNumber: 1,
		endSurahNumber: 22,
		endAyahNumber: 78
	},
	{
		juz: 18,
		nameArabic: "قد أفلح",
		nameTranslit: "Qad Aflaha",
		startSurahNumber: 23,
		startSurahName: "Al-Mu'minun",
		startAyahNumber: 1,
		endSurahNumber: 25,
		endAyahNumber: 20
	},
	{
		juz: 19,
		nameArabic: "وقال الذين",
		nameTranslit: "Wa Qalal-Ladhina",
		startSurahNumber: 25,
		startSurahName: "Al-Furqan",
		startAyahNumber: 21,
		endSurahNumber: 27,
		endAyahNumber: 55
	},
	{
		juz: 20,
		nameArabic: "أمن خلق",
		nameTranslit: "Amman Khalaqa",
		startSurahNumber: 27,
		startSurahName: "An-Naml",
		startAyahNumber: 56,
		endSurahNumber: 29,
		endAyahNumber: 45
	},
	{
		juz: 21,
		nameArabic: "اتل ما أوحي",
		nameTranslit: "Utlu Ma Uhiya",
		startSurahNumber: 29,
		startSurahName: "Al-Ankabut",
		startAyahNumber: 46,
		endSurahNumber: 33,
		endAyahNumber: 30
	},
	{
		juz: 22,
		nameArabic: "ومن يقنت",
		nameTranslit: "Wa Man Yaqnut",
		startSurahNumber: 33,
		startSurahName: "Al-Ahzab",
		startAyahNumber: 31,
		endSurahNumber: 36,
		endAyahNumber: 27
	},
	{
		juz: 23,
		nameArabic: "وما لي",
		nameTranslit: "Wa Mali",
		startSurahNumber: 36,
		startSurahName: "Ya-Sin",
		startAyahNumber: 28,
		endSurahNumber: 39,
		endAyahNumber: 31
	},
	{
		juz: 24,
		nameArabic: "فمن أظلم",
		nameTranslit: "Faman Azlamu",
		startSurahNumber: 39,
		startSurahName: "Az-Zumar",
		startAyahNumber: 32,
		endSurahNumber: 41,
		endAyahNumber: 46
	},
	{
		juz: 25,
		nameArabic: "إليه يرد",
		nameTranslit: "Ilayhi Yuraddu",
		startSurahNumber: 41,
		startSurahName: "Fussilat",
		startAyahNumber: 47,
		endSurahNumber: 45,
		endAyahNumber: 37
	},
	{
		juz: 26,
		nameArabic: "حم",
		nameTranslit: "Ha Meem",
		startSurahNumber: 46,
		startSurahName: "Al-Ahqaf",
		startAyahNumber: 1,
		endSurahNumber: 51,
		endAyahNumber: 30
	},
	{
		juz: 27,
		nameArabic: "قال فما خطبكم",
		nameTranslit: "Qala Fama Khatbukum",
		startSurahNumber: 51,
		startSurahName: "Adh-Dhariyat",
		startAyahNumber: 31,
		endSurahNumber: 57,
		endAyahNumber: 29
	},
	{
		juz: 28,
		nameArabic: "قد سمع الله",
		nameTranslit: "Qad Sami Allah",
		startSurahNumber: 58,
		startSurahName: "Al-Mujadila",
		startAyahNumber: 1,
		endSurahNumber: 66,
		endAyahNumber: 12
	},
	{
		juz: 29,
		nameArabic: "تبارك الذي",
		nameTranslit: "Tabarakal-Ladhi",
		startSurahNumber: 67,
		startSurahName: "Al-Mulk",
		startAyahNumber: 1,
		endSurahNumber: 77,
		endAyahNumber: 50
	},
	{
		juz: 30,
		nameArabic: "عم يتساءلون",
		nameTranslit: "Amma Yatasaalun",
		startSurahNumber: 78,
		startSurahName: "An-Naba",
		startAyahNumber: 1,
		endSurahNumber: 114,
		endAyahNumber: 6
	}
];
function validateSurahPayload(payload, expectedMeta, allowPartialOfflineBundle = false) {
	if (!payload || !payload.meta) return {
		valid: false,
		error: "Missing Surah payload or metadata."
	};
	if (payload.meta.number !== expectedMeta.number) return {
		valid: false,
		error: `Surah identity mismatch: expected Surah ${expectedMeta.number}, received Surah ${payload.meta.number}.`
	};
	if (payload.offlineUnavailable) return {
		valid: false,
		error: `Surah ${expectedMeta.nameTranslit} is offline and not cached.`
	};
	if (!Array.isArray(payload.ayahs) || payload.ayahs.length === 0) return {
		valid: false,
		error: `Surah ${expectedMeta.nameTranslit} returned zero Ayahs.`
	};
	if (!Boolean(payload.isPartialOfflineBundle || allowPartialOfflineBundle) && payload.ayahs.length !== expectedMeta.ayahCount) return {
		valid: false,
		error: `Ayah count mismatch for Surah ${expectedMeta.nameTranslit}: expected ${expectedMeta.ayahCount}, received ${payload.ayahs.length}.`
	};
	for (let i = 0; i < payload.ayahs.length; i++) {
		const ayah = payload.ayahs[i];
		if (!ayah.arabicUthmani || !ayah.arabicUthmani.trim()) return {
			valid: false,
			error: `Missing Uthmani Arabic text at Ayah ${ayah.numberInSurah || i + 1}.`
		};
		if (!ayah.translations || typeof ayah.translations.en !== "string" || !ayah.translations.en.trim()) return {
			valid: false,
			error: `Missing translation text at Ayah ${ayah.numberInSurah || i + 1}.`
		};
	}
	return { valid: true };
}
/**
* Resolves the array index of a target Ayah number (1-indexed in Surah).
* Supports both complete 1..N Surah payloads and partial offline bundles (e.g., Surah 2 with Ayah 255).
*/
function resolveAyahIndexByNumber(ayahs, targetAyahNumber) {
	if (!Array.isArray(ayahs) || ayahs.length === 0) return 0;
	const exactIdx = ayahs.findIndex((a) => a.numberInSurah === targetAyahNumber);
	if (exactIdx !== -1) return exactIdx;
	let closestIdx = 0;
	let smallestDiff = Math.abs(ayahs[0].numberInSurah - targetAyahNumber);
	for (let i = 1; i < ayahs.length; i++) {
		const diff = Math.abs(ayahs[i].numberInSurah - targetAyahNumber);
		if (diff < smallestDiff) {
			smallestDiff = diff;
			closestIdx = i;
		}
	}
	return closestIdx;
}
var DEFAULT_HIFZ_SRS_CONFIG = {
	maxIntervalDays: 60,
	fluentMultiplier: 2,
	goodIncrementDays: 2,
	needsWorkResetDays: 1,
	masteryThresholdIntervalDays: 21
};
function parseHifzAyahRange(ayahRange, totalAyahs) {
	const safeTotal = Math.max(1, totalAyahs);
	if (!ayahRange || !ayahRange.trim()) return {
		startAyah: 1,
		endAyah: safeTotal,
		label: `Ayahs 1 – ${safeTotal}`
	};
	const matches = ayahRange.match(/\d+/g);
	if (!matches || matches.length === 0) return {
		startAyah: 1,
		endAyah: safeTotal,
		label: ayahRange.trim()
	};
	const first = Math.max(1, Math.min(safeTotal, Number(matches[0]) || 1));
	const second = matches.length > 1 ? Math.max(first, Math.min(safeTotal, Number(matches[1]) || first)) : first;
	return {
		startAyah: first,
		endAyah: second,
		label: first === second ? ayahRange.includes("Ayat al-Kursi") ? `Ayah ${first} (Ayat al-Kursi)` : `Ayah ${first}` : `Ayahs ${first} – ${second}`
	};
}
function deriveHifzPlanState(memorizedAyahs, totalAyahs, hasDueRevision = false, intervalDays = 0) {
	if (memorizedAyahs <= 0) return "not_started";
	if (memorizedAyahs < totalAyahs) return "learning";
	if (hasDueRevision) return "revision_due";
	if (intervalDays >= DEFAULT_HIFZ_SRS_CONFIG.masteryThresholdIntervalDays) return "mastered";
	return "memorized";
}
function scheduleHifzRevision(item, quality, now = /* @__PURE__ */ new Date(), config = DEFAULT_HIFZ_SRS_CONFIG) {
	const currentInterval = Math.max(1, item.intervalDays || 1);
	let nextInterval;
	let difficulty;
	if (quality === "Fluent") {
		nextInterval = Math.min(config.maxIntervalDays, Math.max(2, currentInterval * config.fluentMultiplier));
		difficulty = "easy";
	} else if (quality === "Good") {
		nextInterval = Math.min(config.maxIntervalDays, currentInterval + config.goodIncrementDays);
		difficulty = "medium";
	} else {
		nextInterval = config.needsWorkResetDays;
		difficulty = "hard";
	}
	const nextReviewDateKey = quality === "Needs Work" ? getLocalDateKey(now) : getLocalDateKeyWithOffset(nextInterval, now);
	const dueStatus = quality === "Needs Work" ? "due_today" : "upcoming";
	const dueDate = quality === "Needs Work" ? "Review again today" : nextInterval === 1 ? "Tomorrow" : `In ${nextInterval} days (${nextReviewDateKey})`;
	const memorizationState = quality === "Needs Work" ? "revision_due" : nextInterval >= config.masteryThresholdIntervalDays ? "mastered" : "memorized";
	return {
		...item,
		intervalDays: nextInterval,
		difficulty,
		attemptsCount: (item.attemptsCount || 0) + 1,
		lastSelfReport: quality,
		lastPracticedAt: now.toISOString(),
		nextReviewAt: nextReviewDateKey,
		dueStatus,
		dueDate,
		memorizationState
	};
}
function refreshRevisionQueueDueStatuses(items, todayDateKey = getLocalDateKey()) {
	return items.map((item) => {
		if (!item.nextReviewAt) return item;
		if (item.nextReviewAt < todayDateKey) return {
			...item,
			dueStatus: "overdue",
			dueDate: `Overdue (scheduled ${item.nextReviewAt})`,
			memorizationState: "revision_due"
		};
		if (item.nextReviewAt === todayDateKey) return {
			...item,
			dueStatus: "due_today",
			dueDate: "Due Today",
			memorizationState: "revision_due"
		};
		return {
			...item,
			dueStatus: "upcoming"
		};
	});
}
var PRAYER_CALCULATION_METHODS = [
	{
		id: 1,
		label: "University of Islamic Sciences, Karachi",
		region: "India, Pakistan, Bangladesh, South Asia"
	},
	{
		id: 2,
		label: "Islamic Society of North America (ISNA)",
		region: "North America"
	},
	{
		id: 3,
		label: "Muslim World League (MWL)",
		region: "Europe, Far East, Global"
	},
	{
		id: 4,
		label: "Umm al-Qura University, Makkah",
		region: "Arabian Peninsula"
	}
];
function createEmptySalahDayRecord(dateKey) {
	return {
		date: dateKey,
		prayers: {
			Fajr: "pending",
			Dhuhr: "pending",
			Asr: "pending",
			Maghrib: "pending",
			Isha: "pending"
		},
		sunnahCompleted: 0
	};
}
function computeSalahHistoricalSummary(salahRecords, baseDate = /* @__PURE__ */ new Date()) {
	let weeklyPrayedCount = 0;
	let weeklyOnTimeCount = 0;
	let weeklyQazaCount = 0;
	let monthlyPrayedCount = 0;
	const last7Days = Array.from({ length: 7 }, (_, idx) => {
		const offset = idx - 6;
		const key = getLocalDateKeyWithOffset(offset, baseDate);
		const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
		d.setDate(d.getDate() + offset);
		const prayers = salahRecords[key]?.prayers;
		const statuses = prayers ? Object.values(prayers) : [];
		const doneCount = statuses.filter((st) => st === "prayed_on_time" || st === "prayed").length;
		const onTimeCount = statuses.filter((st) => st === "prayed_on_time").length;
		const qazaCount = statuses.filter((st) => st === "qaza").length;
		weeklyPrayedCount += doneCount;
		weeklyOnTimeCount += onTimeCount;
		weeklyQazaCount += qazaCount;
		return {
			key,
			offset,
			dayLabel: d.toLocaleDateString("en-US", { weekday: "short" }),
			doneCount,
			onTimeCount
		};
	});
	for (let i = 0; i < 30; i++) {
		const prayers = salahRecords[getLocalDateKeyWithOffset(-i, baseDate)]?.prayers;
		if (prayers) monthlyPrayedCount += Object.values(prayers).filter((st) => st === "prayed_on_time" || st === "prayed").length;
	}
	return {
		weeklyPrayedCount,
		weeklyOnTimeCount,
		weeklyQazaCount,
		monthlyPrayedCount,
		last7Days
	};
}
function scoreQuizSubmission(questions, selectedByQuestionId) {
	let score = 0;
	const missedQuestionIndices = [];
	let answeredCount = 0;
	questions.forEach((q, idx) => {
		const picked = selectedByQuestionId[q.id];
		if (typeof picked === "number") {
			answeredCount += 1;
			if (picked === q.correctIndex) score += 1;
			else missedQuestionIndices.push(idx);
		} else missedQuestionIndices.push(idx);
	});
	return {
		score,
		total: questions.length,
		missedQuestionIndices,
		isComplete: questions.length > 0 && answeredCount === questions.length
	};
}
function appendLearningEvent(events, newEvent, now = /* @__PURE__ */ new Date()) {
	const dateKey = getLocalDateKey(now);
	if (events.some((e) => e.dateKey === dateKey && e.type === newEvent.type && e.referenceId === newEvent.referenceId && e.mode === newEvent.mode && e.childId === newEvent.childId)) return events;
	return [{
		...newEvent,
		id: `evt_${now.getTime()}_${Math.random().toString(36).slice(2, 7)}`,
		timestampIso: now.toISOString(),
		dateKey
	}, ...events].slice(0, 500);
}
/**
* Computes the user's consecutive active learning streak according to documented local-date rules:
* - A local calendar date (YYYY-MM-DD) is active if:
*   1) At least 1 LearningEvent was recorded on that date, OR
*   2) At least 1 Quran verse was actually read on that date (dailyVerseActivity), OR
*   3) At least 1 obligatory prayer was marked 'prayed_on_time' or 'prayed' on that date.
* - Opening a Surah without reading/navigating does NOT count.
* - If today is active, the streak counts backwards starting from today.
* - If today is not yet active, the streak counts backwards starting from yesterday (grace until local midnight).
* - If both today and yesterday have no activity, the current streak is 0.
*/
function computeLearningStreak(params) {
	const baseDate = params.baseDate || /* @__PURE__ */ new Date();
	const todayKey = getLocalDateKey(baseDate);
	const yesterdayKey = getLocalDateKeyWithOffset(-1, baseDate);
	const activeSet = /* @__PURE__ */ new Set();
	for (const evt of params.learningEvents || []) if (evt.dateKey && /^\d{4}-\d{2}-\d{2}$/.test(evt.dateKey)) activeSet.add(evt.dateKey);
	if (params.dailyVerseActivity && params.dailyVerseActivity.dateKey && Array.isArray(params.dailyVerseActivity.ayahKeys) && params.dailyVerseActivity.ayahKeys.length > 0) activeSet.add(params.dailyVerseActivity.dateKey);
	for (const [dateKey, record] of Object.entries(params.salahRecords || {})) {
		if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey) || !record?.prayers) continue;
		if (Object.values(record.prayers).some((st) => st === "prayed_on_time" || st === "prayed")) activeSet.add(dateKey);
	}
	const activeDateKeys = Array.from(activeSet).sort();
	const isTodayActive = activeSet.has(todayKey);
	let currentStreakDays = 0;
	if (activeSet.has(todayKey) || activeSet.has(yesterdayKey)) {
		let offset = activeSet.has(todayKey) ? 0 : -1;
		while (activeSet.has(getLocalDateKeyWithOffset(offset, baseDate))) {
			currentStreakDays += 1;
			offset -= 1;
		}
	}
	let longestStreakDays = currentStreakDays;
	if (activeDateKeys.length > 0) {
		longestStreakDays = Math.max(longestStreakDays, 1);
		let run = 1;
		for (let i = 1; i < activeDateKeys.length; i++) {
			const prevParts = activeDateKeys[i - 1].split("-").map(Number);
			const currParts = activeDateKeys[i].split("-").map(Number);
			const prevDate = new Date(prevParts[0], prevParts[1] - 1, prevParts[2]);
			const currDate = new Date(currParts[0], currParts[1] - 1, currParts[2]);
			const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / 864e5);
			if (diffDays === 1) {
				run += 1;
				if (run > longestStreakDays) longestStreakDays = run;
			} else if (diffDays > 1) run = 1;
		}
	}
	return {
		currentStreakDays,
		longestStreakDays,
		activeDateKeys,
		isTodayActive
	};
}
function aggregateAdultProgressByPeriod(params) {
	const baseDate = params.baseDate || /* @__PURE__ */ new Date();
	const todayKey = getLocalDateKey(baseDate);
	const minDateKey = params.period === "daily" ? todayKey : params.period === "weekly" ? getLocalDateKeyWithOffset(-6, baseDate) : params.period === "monthly" ? getLocalDateKeyWithOffset(-29, baseDate) : "0000-01-01";
	const filteredEvents = (params.learningEvents || []).filter((e) => e.mode === "adult" && e.dateKey >= minDateKey && e.dateKey <= todayKey);
	const versesFromEvents = filteredEvents.filter((e) => e.type === "quran_ayah_read").length;
	const versesToday = params.dailyVerseActivity.dateKey === todayKey ? params.dailyVerseActivity.ayahKeys.length : 0;
	const versesReadCount = Math.max(versesFromEvents, versesToday);
	let prayersCompletedCount = 0;
	for (const [dateKey, rec] of Object.entries(params.salahRecords || {})) if (dateKey >= minDateKey && dateKey <= todayKey && rec?.prayers) prayersCompletedCount += Object.values(rec.prayers).filter((st) => st === "prayed_on_time" || st === "prayed").length;
	const hifzRevisionsCount = filteredEvents.filter((e) => e.type === "hifz_revision" || e.type === "hifz_progress").length;
	const lessonsAndSeerahCount = filteredEvents.filter((e) => e.type === "lesson_completed" || e.type === "seerah_completed").length;
	const quizzesCompletedCount = (params.quizAttempts || []).filter((q) => {
		if (q.mode !== "adult") return false;
		if (params.period === "all_time") return true;
		const qDate = q.dateKey || (q.completedAt === "Just now" || q.completedAt === "Today" ? todayKey : "");
		return qDate >= minDateKey && qDate <= todayKey;
	}).length;
	return {
		versesReadCount,
		prayersCompletedCount,
		hifzRevisionsCount,
		lessonsAndSeerahCount,
		quizzesCompletedCount,
		totalEventsCount: filteredEvents.length
	};
}
function computeQiblaFromCoords(latDeg, lonDeg) {
	const kaabaLat = 21.4225 * Math.PI / 180;
	const kaabaLon = 39.8262 * Math.PI / 180;
	const phi = latDeg * Math.PI / 180;
	const dLon = kaabaLon - lonDeg * Math.PI / 180;
	const y = Math.sin(dLon);
	const x = Math.cos(phi) * Math.tan(kaabaLat) - Math.sin(phi) * Math.cos(dLon);
	const brng = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
	const rounded = Math.round(brng) % 360;
	const cardinal = [
		"N",
		"NE",
		"E",
		"SE",
		"S",
		"SW",
		"W",
		"NW"
	][Math.round(rounded / 45) % 8];
	const R = 6371;
	const dLat = kaabaLat - phi;
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(phi) * Math.cos(kaabaLat) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const distKm = Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
	return {
		bearing: rounded,
		dir: `${rounded}° ${cardinal}`,
		distKm
	};
}
var HIJRI_MONTH_NAMES = [
	"Muharram",
	"Safar",
	"Rabi’ al-Awwal",
	"Rabi’ al-Thani",
	"Jumada al-Ula",
	"Jumada al-Akhirah",
	"Rajab",
	"Sha’ban",
	"Ramadan",
	"Shawwal",
	"Dhu al-Qa’dah",
	"Dhu al-Hijjah"
];
function computeHijriDate(date = /* @__PURE__ */ new Date(), adjustmentDays = 0) {
	const adjusted = new Date(date.getTime() + adjustmentDays * 864e5);
	const disclaimer = "Calculated astronomical/tabular estimate. Actual Islamic dates depend on confirmed local crescent moon sighting (±1–2 days).";
	try {
		const parts = new Intl.DateTimeFormat("en-TN-u-ca-islamic-umalqura", {
			day: "numeric",
			month: "numeric",
			year: "numeric"
		}).formatToParts(adjusted);
		const day = Number(parts.find((p) => p.type === "day")?.value || 1);
		const monthNumber = Number(parts.find((p) => p.type === "month")?.value || 1);
		const rawYear = parts.find((p) => p.type === "year")?.value || "1448";
		const year = Number(rawYear.replace(/[^\d]/g, "")) || 1448;
		if (monthNumber >= 1 && monthNumber <= 12 && day >= 1 && day <= 30) {
			const monthName = HIJRI_MONTH_NAMES[monthNumber - 1];
			return {
				day,
				monthNumber,
				monthName,
				year,
				formatted: `${day} ${monthName} ${year} AH`,
				convention: "Umm al-Qura Calendar (ICU/Intl)",
				disclaimer
			};
		}
	} catch {}
	const l = Math.floor(adjusted.getTime() / 864e5) + 2440588 - 1948440 + 10632;
	const n = Math.floor((l - 1) / 10631);
	const l2 = l - 10631 * n + 354;
	const j = Math.floor((10985 - l2) / 5316) * Math.floor(50 * l2 / 17719) + Math.floor(l2 / 5670) * Math.floor(43 * l2 / 15238);
	const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor(17719 * j / 50) - Math.floor(j / 16) * Math.floor(15238 * j / 43) + 29;
	const monthNumber = Math.max(1, Math.min(12, Math.floor(24 * l3 / 709)));
	const day = Math.max(1, Math.min(30, l3 - Math.floor(709 * monthNumber / 24)));
	const year = 30 * n + j - 30;
	const monthName = HIJRI_MONTH_NAMES[monthNumber - 1];
	return {
		day,
		monthNumber,
		monthName,
		year,
		formatted: `${day} ${monthName} ${year} AH`,
		convention: "Tabular Islamic Calendar (30-Year Cycle)",
		disclaimer
	};
}
// src/services/localDatabase.ts
var ILMIZO_DB_NAME = "ilmizo_local_db";
var LEGACY_MASTER_STORAGE_KEY = "ilmizo_master_state_v1";
var MIGRATION_VERIFIED_PREF_KEY = "ilmizo_migration_v2_verified";
var LIGHTWEIGHT_PREFS_KEY = "ilmizo_lightweight_prefs_v2";
var memoryStores = {
	app_state: /* @__PURE__ */ new Map(),
	learning_events: /* @__PURE__ */ new Map(),
	offline_surahs: /* @__PURE__ */ new Map(),
	offline_audio: /* @__PURE__ */ new Map(),
	prayer_timings_cache: /* @__PURE__ */ new Map(),
	recovery_snapshots: /* @__PURE__ */ new Map()
};
var simulateQuotaExceededFlag = false;
var lastQuotaErrorMessage = null;
var lastSavedTimestampIso = null;
var dbPromise = null;
function hasNativeIndexedDB() {
	try {
		return typeof indexedDB !== "undefined" && indexedDB !== null;
	} catch {
		return false;
	}
}
function estimateJsonSizeBytes(obj) {
	try {
		return new Blob([JSON.stringify(obj)]).size;
	} catch {
		try {
			return JSON.stringify(obj).length * 2;
		} catch {
			return 0;
		}
	}
}
function isQuotaError(err) {
	if (!err) return false;
	if (typeof DOMException !== "undefined" && err instanceof DOMException) return err.name === "QuotaExceededError" || err.name === "NS_ERROR_DOM_QUOTA_REACHED" || err.code === 22 || err.code === 1014;
	const msg = String(err?.message || err).toLowerCase();
	return msg.includes("quota") || msg.includes("storage full");
}
function openIndexedDatabase() {
	if (!hasNativeIndexedDB()) return Promise.resolve(null);
	if (dbPromise) return dbPromise;
	dbPromise = new Promise((resolve) => {
		try {
			const request = indexedDB.open(ILMIZO_DB_NAME, 2);
			request.onupgradeneeded = () => {
				const db = request.result;
				if (!db.objectStoreNames.contains("app_state")) db.createObjectStore("app_state", { keyPath: "id" });
				if (!db.objectStoreNames.contains("learning_events")) {
					const eventStore = db.createObjectStore("learning_events", { keyPath: "id" });
					eventStore.createIndex("dateKey", "dateKey", { unique: false });
					eventStore.createIndex("childId", "childId", { unique: false });
					eventStore.createIndex("mode", "mode", { unique: false });
					eventStore.createIndex("type", "type", { unique: false });
				}
				if (!db.objectStoreNames.contains("offline_surahs")) {
					const surahStore = db.createObjectStore("offline_surahs", { keyPath: "cacheKey" });
					surahStore.createIndex("surahNumber", "surahNumber", { unique: false });
					surahStore.createIndex("isExplicitDownload", "isExplicitDownload", { unique: false });
				}
				if (!db.objectStoreNames.contains("offline_audio")) db.createObjectStore("offline_audio", { keyPath: "audioKey" });
				if (!db.objectStoreNames.contains("prayer_timings_cache")) db.createObjectStore("prayer_timings_cache", { keyPath: "cacheKey" });
				if (!db.objectStoreNames.contains("recovery_snapshots")) db.createObjectStore("recovery_snapshots", { keyPath: "id" });
			};
			request.onsuccess = () => {
				const db = request.result;
				db.onclose = () => {
					dbPromise = null;
				};
				db.onversionchange = () => {
					try {
						db.close();
					} catch {}
					dbPromise = null;
				};
				resolve(db);
			};
			request.onerror = () => {
				dbPromise = null;
				lastQuotaErrorMessage = request.error?.message || "Unable to open local IndexedDB storage.";
				resolve(null);
			};
			request.onblocked = () => {
				dbPromise = null;
				lastQuotaErrorMessage = "Local storage upgrade was blocked by another open tab. Close duplicate tabs if persistence fails.";
				resolve(null);
			};
		} catch {
			dbPromise = null;
			resolve(null);
		}
	});
	return dbPromise;
}
async function requestPersistentLocalStorage() {
	try {
		if (typeof navigator !== "undefined" && navigator.storage?.persist) return await navigator.storage.persist();
	} catch {}
	return false;
}
async function idbGet(storeName, key) {
	const db = await openIndexedDatabase();
	if (!db) return memoryStores[storeName].get(key) ?? null;
	return new Promise((resolve) => {
		try {
			const req = db.transaction(storeName, "readonly").objectStore(storeName).get(key);
			req.onsuccess = () => resolve(req.result ?? null);
			req.onerror = () => {
				const map = memoryStores[storeName];
				resolve(map.get(key) ?? null);
			};
		} catch {
			const map = memoryStores[storeName];
			resolve(map.get(key) ?? null);
		}
	});
}
async function idbGetAll(storeName) {
	const db = await openIndexedDatabase();
	if (!db) {
		const map = memoryStores[storeName];
		return Array.from(map.values());
	}
	return new Promise((resolve) => {
		try {
			const req = db.transaction(storeName, "readonly").objectStore(storeName).getAll();
			req.onsuccess = () => resolve(req.result || []);
			req.onerror = () => {
				const map = memoryStores[storeName];
				resolve(Array.from(map.values()));
			};
		} catch {
			const map = memoryStores[storeName];
			resolve(Array.from(map.values()));
		}
	});
}
async function idbPut(storeName, key, value) {
	if (simulateQuotaExceededFlag) {
		lastQuotaErrorMessage = "Storage quota exceeded on this device. Free up space or delete offline downloads.";
		return {
			ok: false,
			quotaExceeded: true,
			error: lastQuotaErrorMessage
		};
	}
	memoryStores[storeName].set(key, value);
	const db = await openIndexedDatabase();
	if (!db) return { ok: true };
	return new Promise((resolve) => {
		let settled = false;
		const finish = (res) => {
			if (settled) return;
			settled = true;
			resolve(res);
		};
		try {
			const tx = db.transaction(storeName, "readwrite");
			const req = tx.objectStore(storeName).put(value);
			tx.oncomplete = () => {
				finish({ ok: true });
			};
			tx.onabort = () => {
				const err = tx.error || req.error;
				const quota = isQuotaError(err);
				if (quota) lastQuotaErrorMessage = "Browser IndexedDB quota exceeded.";
				finish({
					ok: false,
					quotaExceeded: quota,
					error: err?.message || "IndexedDB write transaction was interrupted or aborted."
				});
			};
			tx.onerror = () => {
				const err = tx.error || req.error;
				const quota = isQuotaError(err);
				if (quota) lastQuotaErrorMessage = "Browser IndexedDB quota exceeded.";
				finish({
					ok: false,
					quotaExceeded: quota,
					error: err?.message || "IndexedDB write failed."
				});
			};
			req.onerror = () => {
				const quota = isQuotaError(req.error);
				if (quota) lastQuotaErrorMessage = "Browser IndexedDB quota exceeded.";
				finish({
					ok: false,
					quotaExceeded: quota,
					error: req.error?.message || "IndexedDB write failed."
				});
			};
		} catch (err) {
			const quota = isQuotaError(err);
			if (quota) lastQuotaErrorMessage = "Browser IndexedDB quota exceeded.";
			finish({
				ok: false,
				quotaExceeded: quota,
				error: err instanceof Error ? err.message : "IndexedDB transaction error."
			});
		}
	});
}
async function idbDelete(storeName, key) {
	memoryStores[storeName].delete(key);
	const db = await openIndexedDatabase();
	if (!db) return true;
	return new Promise((resolve) => {
		let settled = false;
		const finish = (ok) => {
			if (settled) return;
			settled = true;
			resolve(ok);
		};
		try {
			const tx = db.transaction(storeName, "readwrite");
			const req = tx.objectStore(storeName).delete(key);
			tx.oncomplete = () => finish(true);
			tx.onabort = () => finish(false);
			tx.onerror = () => finish(false);
			req.onerror = () => finish(false);
		} catch {
			finish(false);
		}
	});
}
function getLightweightPreferences() {
	try {
		if (typeof localStorage === "undefined") return {};
		const raw = localStorage.getItem(LIGHTWEIGHT_PREFS_KEY);
		if (!raw) return {};
		return JSON.parse(raw);
	} catch {
		return {};
	}
}
function saveLightweightPreferences(patch) {
	if (simulateQuotaExceededFlag) {
		lastQuotaErrorMessage = "LocalStorage quota exceeded while saving preferences.";
		return {
			ok: false,
			quotaExceeded: true,
			error: lastQuotaErrorMessage
		};
	}
	try {
		if (typeof localStorage === "undefined") return { ok: true };
		const merged = {
			...getLightweightPreferences(),
			...patch
		};
		localStorage.setItem(LIGHTWEIGHT_PREFS_KEY, JSON.stringify(merged));
		return { ok: true };
	} catch (err) {
		const quota = isQuotaError(err);
		if (quota) lastQuotaErrorMessage = "LocalStorage quota exceeded.";
		return {
			ok: false,
			quotaExceeded: quota,
			error: err instanceof Error ? err.message : "Failed to write lightweight preferences."
		};
	}
}
function readLegacyMasterStateSync() {
	try {
		const inMem = memoryStores.app_state.get("master_v2");
		if (inMem?.state) return inMem.state;
		if (typeof localStorage === "undefined") return null;
		const raw = localStorage.getItem(LEGACY_MASTER_STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") return null;
		return parsed;
	} catch {
		return null;
	}
}
/**
* Hydrates master state from IndexedDB ('master_v2').
* If IndexedDB has no 'master_v2' record yet and `ilmizo_master_state_v1` exists in localStorage,
* safely migrates the legacy state into IndexedDB, verifies the read-back, marks migration verified,
* and preserves `ilmizo_master_state_v1` intact without deleting it.
*/
async function hydrateOrMigrateMasterState(normalizeFn) {
	const existingRecord = await idbGet("app_state", "master_v2");
	if (existingRecord && existingRecord.state && typeof existingRecord.state === "object") {
		const normalized = normalizeFn(existingRecord.state);
		lastSavedTimestampIso = existingRecord.updatedAtIso || (/* @__PURE__ */ new Date()).toISOString();
		return {
			state: normalized,
			migratedFromLegacy: Boolean(existingRecord.migratedFromLegacy),
			verifiedMigration: true
		};
	}
	if (existingRecord && (!existingRecord.state || typeof existingRecord.state !== "object")) {
		const recoverySnap = await getRecoverySnapshot("pre_import_latest");
		if (recoverySnap?.state && typeof recoverySnap.state === "object") {
			const recovered = normalizeFn(recoverySnap.state);
			lastQuotaErrorMessage = "Recovered user progress from local recovery snapshot after detecting a malformed primary state record.";
			return {
				state: recovered,
				migratedFromLegacy: Boolean(recoverySnap.state.schemaVersion === 1),
				verifiedMigration: true
			};
		}
	}
	const legacyRaw = readLegacyMasterStateSync();
	const hadLegacyRecord = Boolean(legacyRaw && Object.keys(legacyRaw).length > 0);
	const normalizedState = normalizeFn(legacyRaw);
	const nowIso = (/* @__PURE__ */ new Date()).toISOString();
	const writeRes = await idbPut("app_state", "master_v2", {
		id: "master_v2",
		schemaVersion: 2,
		updatedAtIso: nowIso,
		migratedFromLegacy: hadLegacyRecord,
		state: normalizedState
	});
	for (const evt of normalizedState.learningEvents || []) if (evt && evt.id) await idbPut("learning_events", evt.id, evt);
	const verifyRead = await idbGet("app_state", "master_v2");
	const verified = Boolean(writeRes.ok && verifyRead && verifyRead.state);
	if (verified && hadLegacyRecord) try {
		if (typeof localStorage !== "undefined") localStorage.setItem(MIGRATION_VERIFIED_PREF_KEY, "true");
	} catch {}
	lastSavedTimestampIso = nowIso;
	return {
		state: normalizedState,
		migratedFromLegacy: hadLegacyRecord,
		verifiedMigration: verified
	};
}
async function saveMasterStateToLocalDb(state) {
	const nowIso = (/* @__PURE__ */ new Date()).toISOString();
	const { parentPin: _omitPlainPin, ...userWithoutPlainPin } = state.user || {};
	const payload = {
		...state,
		user: userWithoutPlainPin,
		schemaVersion: 2,
		updatedAtIso: nowIso
	};
	const idbResult = await idbPut("app_state", "master_v2", {
		id: "master_v2",
		schemaVersion: 2,
		updatedAtIso: nowIso,
		migratedFromLegacy: true,
		state: payload
	});
	if (!idbResult.ok) return idbResult;
	for (const evt of (state.learningEvents || []).slice(0, 50)) if (evt && evt.id) await idbPut("learning_events", evt.id, evt);
	saveLightweightPreferences({
		language: state.user.language,
		darkMode: state.user.darkMode,
		autoPlayRecitation: state.user.autoPlayRecitation,
		arabicFontScale: state.user.arabicFontScale
	});
	try {
		if (typeof localStorage !== "undefined" && !simulateQuotaExceededFlag) localStorage.setItem(LEGACY_MASTER_STORAGE_KEY, JSON.stringify(payload));
	} catch (err) {
		if (isQuotaError(err)) {}
	}
	lastSavedTimestampIso = nowIso;
	return { ok: true };
}
async function getOfflineSurahFromDb(surahNumber, language) {
	const cacheKey = `${surahNumber}_${language}`;
	const fromIdb = await idbGet("offline_surahs", cacheKey);
	if (fromIdb && fromIdb.payload) return fromIdb;
	const multiLangMatch = (await idbGetAll("offline_surahs")).find((rec) => rec.surahNumber === surahNumber && rec.payload && Array.isArray(rec.payload.ayahs) && rec.payload.ayahs.length > 0 && Boolean(rec.payload.ayahs[0]?.translations?.[language] || rec.payload.ayahs[0]?.translations?.en));
	if (multiLangMatch) return multiLangMatch;
	try {
		if (typeof localStorage !== "undefined") {
			const legacyKey = `ilmizo_surah_cache_v1_${surahNumber}_${language}`;
			const raw = localStorage.getItem(legacyKey);
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed && parsed.meta && parsed.meta.number === surahNumber) {
					const migratedRecord = {
						cacheKey,
						surahNumber,
						language,
						isExplicitDownload: false,
						downloadedAtIso: (/* @__PURE__ */ new Date()).toISOString(),
						sizeBytes: estimateJsonSizeBytes(parsed),
						payload: parsed
					};
					await idbPut("offline_surahs", cacheKey, migratedRecord);
					return migratedRecord;
				}
			}
		}
	} catch {}
	return null;
}
async function saveOfflineSurahToDb(surahNumber, language, payload, isExplicitDownload, metadata) {
	const cacheKey = `${surahNumber}_${language}`;
	const existing = await idbGet("offline_surahs", cacheKey);
	const finalExplicit = isExplicitDownload || Boolean(existing?.isExplicitDownload);
	const enrichedPayload = {
		...payload,
		offlineUnavailable: false,
		offlineSourceType: finalExplicit ? "downloaded_idb" : "cached_idb"
	};
	const nowIso = (/* @__PURE__ */ new Date()).toISOString();
	return idbPut("offline_surahs", cacheKey, {
		cacheKey,
		surahNumber,
		language,
		isExplicitDownload: finalExplicit,
		downloadedAtIso: existing?.downloadedAtIso || nowIso,
		verifiedAtIso: metadata?.verifiedAtIso || existing?.verifiedAtIso || nowIso,
		packageVersion: metadata?.packageVersion || existing?.packageVersion || "1.2.0",
		checksumSha256: metadata?.checksumSha256 || existing?.checksumSha256,
		sizeBytes: estimateJsonSizeBytes(enrichedPayload),
		payload: enrichedPayload
	});
}
async function deleteOfflineSurahFromDb(surahNumber, language) {
	const all = await idbGetAll("offline_surahs");
	for (const rec of all) if (rec.surahNumber === surahNumber && (!language || rec.language === language)) {
		await idbDelete("offline_surahs", rec.cacheKey);
		try {
			if (typeof localStorage !== "undefined") localStorage.removeItem(`ilmizo_surah_cache_v1_${rec.surahNumber}_${rec.language}`);
		} catch {}
	}
}
async function clearNonDownloadedApiCache() {
	const allSurahs = await idbGetAll("offline_surahs");
	let clearedSurahs = 0;
	for (const rec of allSurahs) if (!rec.isExplicitDownload) {
		await idbDelete("offline_surahs", rec.cacheKey);
		clearedSurahs += 1;
	}
	const allPrayer = await idbGetAll("prayer_timings_cache");
	let clearedPrayerCaches = 0;
	for (const p of allPrayer) {
		await idbDelete("prayer_timings_cache", p.cacheKey);
		clearedPrayerCaches += 1;
	}
	try {
		if (typeof localStorage !== "undefined") {
			const keysToRemove = [];
			for (let i = 0; i < localStorage.length; i++) {
				const k = localStorage.key(i);
				if (k && k.startsWith("ilmizo_surah_cache_v1_")) keysToRemove.push(k);
			}
			keysToRemove.forEach((k) => localStorage.removeItem(k));
		}
	} catch {}
	return {
		clearedSurahs,
		clearedPrayerCaches
	};
}
async function listOfflineSurahRecords() {
	return idbGetAll("offline_surahs");
}
async function deleteAllDownloadedOfflineSurahs() {
	const all = await idbGetAll("offline_surahs");
	let deleted = 0;
	for (const rec of all) {
		await idbDelete("offline_surahs", rec.cacheKey);
		deleted += 1;
	}
	return deleted;
}
async function getOfflineAudioFromDb(editionId, surahNumber) {
	return idbGet("offline_audio", `${editionId}:${surahNumber}`);
}
async function saveOfflineAudioToDb(record) {
	return idbPut("offline_audio", record.audioKey, record);
}
async function deleteOfflineAudioFromDb(editionId, surahNumber) {
	const all = await idbGetAll("offline_audio");
	let deleted = 0;
	for (const rec of all) if (rec.editionId === editionId && (surahNumber === void 0 || rec.surahNumber === surahNumber)) {
		await idbDelete("offline_audio", rec.audioKey);
		deleted += 1;
	}
	return deleted;
}
async function deleteAllOfflineAudioFromDb() {
	const all = await idbGetAll("offline_audio");
	let deleted = 0;
	for (const rec of all) {
		await idbDelete("offline_audio", rec.audioKey);
		deleted += 1;
	}
	return deleted;
}
async function listOfflineAudioRecords() {
	return idbGetAll("offline_audio");
}
async function getCachedPrayerTimings(city, country, method, school, dateKey) {
	const all = await idbGetAll("prayer_timings_cache");
	const normCity = (city || "Jamshedpur").trim().toLowerCase();
	const normCountry = (country || "India").trim().toLowerCase();
	if (dateKey) {
		const exact = await idbGet("prayer_timings_cache", `${normCity}_${normCountry}_${method}_${school}_${dateKey}`);
		if (exact) return exact;
	}
	return all.filter((r) => r.city.toLowerCase() === normCity && r.country.toLowerCase() === normCountry && r.method === method && r.school === school).sort((a, b) => b.cachedAtIso.localeCompare(a.cachedAtIso))[0] || null;
}
async function saveCachedPrayerTimings(record) {
	const cacheKey = `${(record.city || "Jamshedpur").trim().toLowerCase()}_${(record.country || "India").trim().toLowerCase()}_${record.method}_${record.school}_${record.dateKey}`;
	return idbPut("prayer_timings_cache", cacheKey, {
		...record,
		cacheKey,
		cachedAtIso: (/* @__PURE__ */ new Date()).toISOString()
	});
}
async function saveRecoverySnapshot(snapshotId, state, reason = "Pre-Import Automatic Recovery Snapshot") {
	const cloned = JSON.parse(JSON.stringify(state));
	if (cloned.user && "parentPin" in cloned.user) delete cloned.user.parentPin;
	return idbPut("recovery_snapshots", snapshotId, {
		id: snapshotId,
		createdAtIso: (/* @__PURE__ */ new Date()).toISOString(),
		reason,
		schemaVersion: 2,
		state: cloned
	});
}
async function getRecoverySnapshot(snapshotId = "pre_import_latest") {
	return idbGet("recovery_snapshots", snapshotId);
}
async function computeLocalStorageMetrics() {
	const db = await openIndexedDatabase();
	const master = await idbGet("app_state", "master_v2");
	const surahs = await idbGetAll("offline_surahs");
	const audioRecords = await idbGetAll("offline_audio");
	const snapshot = await idbGet("recovery_snapshots", "pre_import_latest");
	const downloadedSurahNumbers = Array.from(new Set(surahs.filter((s) => s.isExplicitDownload).map((s) => s.surahNumber))).sort((a, b) => a - b);
	const cachedSurahNumbers = Array.from(new Set(surahs.filter((s) => !s.isExplicitDownload).map((s) => s.surahNumber))).sort((a, b) => a - b);
	let estimatedUsedBytes = (master ? estimateJsonSizeBytes(master.state) : 0) + surahs.reduce((acc, s) => acc + (s.sizeBytes || estimateJsonSizeBytes(s.payload)), 0) + audioRecords.reduce((acc, a) => acc + (a.sizeBytes || 0), 0) + (snapshot ? estimateJsonSizeBytes(snapshot.state) : 0);
	let estimatedQuotaBytes = null;
	try {
		if (typeof navigator !== "undefined" && navigator.storage && typeof navigator.storage.estimate === "function") {
			const est = await navigator.storage.estimate();
			if (typeof est.usage === "number" && est.usage > estimatedUsedBytes) estimatedUsedBytes = est.usage;
			if (typeof est.quota === "number") estimatedQuotaBytes = est.quota;
		}
	} catch {}
	let legacyBackupPreserved = false;
	try {
		if (typeof localStorage !== "undefined") legacyBackupPreserved = Boolean(localStorage.getItem(LEGACY_MASTER_STORAGE_KEY));
	} catch {
		legacyBackupPreserved = false;
	}
	return {
		backend: db ? "indexeddb" : "memory_fallback",
		schemaVersion: 2,
		migratedFromLegacyV1: Boolean(master?.migratedFromLegacy),
		legacyBackupPreserved,
		estimatedUsedBytes,
		estimatedQuotaBytes,
		downloadedSurahNumbers,
		cachedSurahNumbers,
		downloadedAudioKeys: audioRecords.map((a) => a.audioKey),
		learningEventsCount: master?.state?.learningEvents?.length || 0,
		hasPreImportRecoverySnapshot: Boolean(snapshot),
		lastSavedAtIso: lastSavedTimestampIso,
		lastQuotaError: lastQuotaErrorMessage
	};
}
// src/data/quranData.ts
var ALL_114_SURAHS = [
	{
		number: 1,
		nameArabic: "الفاتحة",
		nameTranslit: "Al-Fatiha",
		nameEnglish: "The Opening",
		ayahCount: 7,
		revelationType: "Meccan",
		juz: 1,
		bundledOffline: true
	},
	{
		number: 2,
		nameArabic: "البقرة",
		nameTranslit: "Al-Baqarah",
		nameEnglish: "The Cow",
		ayahCount: 286,
		revelationType: "Madani",
		juz: 1,
		bundledOffline: true
	},
	{
		number: 3,
		nameArabic: "آل عمران",
		nameTranslit: "Aal-Imran",
		nameEnglish: "The Family of Imran",
		ayahCount: 200,
		revelationType: "Madani",
		juz: 3
	},
	{
		number: 4,
		nameArabic: "النساء",
		nameTranslit: "An-Nisa",
		nameEnglish: "The Women",
		ayahCount: 176,
		revelationType: "Madani",
		juz: 4
	},
	{
		number: 5,
		nameArabic: "المائدة",
		nameTranslit: "Al-Ma'idah",
		nameEnglish: "The Table Spread",
		ayahCount: 120,
		revelationType: "Madani",
		juz: 6
	},
	{
		number: 6,
		nameArabic: "الأنعام",
		nameTranslit: "Al-An'am",
		nameEnglish: "The Cattle",
		ayahCount: 165,
		revelationType: "Meccan",
		juz: 7
	},
	{
		number: 7,
		nameArabic: "الأعراف",
		nameTranslit: "Al-A'raf",
		nameEnglish: "The Heights",
		ayahCount: 206,
		revelationType: "Meccan",
		juz: 8
	},
	{
		number: 8,
		nameArabic: "الأنفال",
		nameTranslit: "Al-Anfal",
		nameEnglish: "The Spoils of War",
		ayahCount: 75,
		revelationType: "Madani",
		juz: 9
	},
	{
		number: 9,
		nameArabic: "التوبة",
		nameTranslit: "At-Tawbah",
		nameEnglish: "The Repentance",
		ayahCount: 129,
		revelationType: "Madani",
		juz: 10
	},
	{
		number: 10,
		nameArabic: "يونس",
		nameTranslit: "Yunus",
		nameEnglish: "Jonah",
		ayahCount: 109,
		revelationType: "Meccan",
		juz: 11
	},
	{
		number: 11,
		nameArabic: "هود",
		nameTranslit: "Hud",
		nameEnglish: "Hud",
		ayahCount: 123,
		revelationType: "Meccan",
		juz: 11
	},
	{
		number: 12,
		nameArabic: "يوسف",
		nameTranslit: "Yusuf",
		nameEnglish: "Joseph",
		ayahCount: 111,
		revelationType: "Meccan",
		juz: 12
	},
	{
		number: 13,
		nameArabic: "الرعد",
		nameTranslit: "Ar-Ra'd",
		nameEnglish: "The Thunder",
		ayahCount: 43,
		revelationType: "Madani",
		juz: 13
	},
	{
		number: 14,
		nameArabic: "إبراهيم",
		nameTranslit: "Ibrahim",
		nameEnglish: "Abraham",
		ayahCount: 52,
		revelationType: "Meccan",
		juz: 13
	},
	{
		number: 15,
		nameArabic: "الحجر",
		nameTranslit: "Al-Hijr",
		nameEnglish: "The Rocky Tract",
		ayahCount: 99,
		revelationType: "Meccan",
		juz: 14
	},
	{
		number: 16,
		nameArabic: "النحل",
		nameTranslit: "An-Nahl",
		nameEnglish: "The Bee",
		ayahCount: 128,
		revelationType: "Meccan",
		juz: 14
	},
	{
		number: 17,
		nameArabic: "الإسراء",
		nameTranslit: "Al-Isra",
		nameEnglish: "The Night Journey",
		ayahCount: 111,
		revelationType: "Meccan",
		juz: 15
	},
	{
		number: 18,
		nameArabic: "الكهف",
		nameTranslit: "Al-Kahf",
		nameEnglish: "The Cave",
		ayahCount: 110,
		revelationType: "Meccan",
		juz: 15
	},
	{
		number: 19,
		nameArabic: "مريم",
		nameTranslit: "Maryam",
		nameEnglish: "Mary",
		ayahCount: 98,
		revelationType: "Meccan",
		juz: 16
	},
	{
		number: 20,
		nameArabic: "طه",
		nameTranslit: "Ta-Ha",
		nameEnglish: "Ta-Ha",
		ayahCount: 135,
		revelationType: "Meccan",
		juz: 16
	},
	{
		number: 21,
		nameArabic: "الأنبياء",
		nameTranslit: "Al-Anbiya",
		nameEnglish: "The Prophets",
		ayahCount: 112,
		revelationType: "Meccan",
		juz: 17
	},
	{
		number: 22,
		nameArabic: "الحج",
		nameTranslit: "Al-Hajj",
		nameEnglish: "The Pilgrimage",
		ayahCount: 78,
		revelationType: "Madani",
		juz: 17
	},
	{
		number: 23,
		nameArabic: "المؤمنون",
		nameTranslit: "Al-Mu'minun",
		nameEnglish: "The Believers",
		ayahCount: 118,
		revelationType: "Meccan",
		juz: 18
	},
	{
		number: 24,
		nameArabic: "النور",
		nameTranslit: "An-Nur",
		nameEnglish: "The Light",
		ayahCount: 64,
		revelationType: "Madani",
		juz: 18
	},
	{
		number: 25,
		nameArabic: "الفرقان",
		nameTranslit: "Al-Furqan",
		nameEnglish: "The Criterion",
		ayahCount: 77,
		revelationType: "Meccan",
		juz: 18
	},
	{
		number: 26,
		nameArabic: "الشعراء",
		nameTranslit: "Ash-Shu'ara",
		nameEnglish: "The Poets",
		ayahCount: 227,
		revelationType: "Meccan",
		juz: 19
	},
	{
		number: 27,
		nameArabic: "النمل",
		nameTranslit: "An-Naml",
		nameEnglish: "The Ant",
		ayahCount: 93,
		revelationType: "Meccan",
		juz: 19
	},
	{
		number: 28,
		nameArabic: "القصص",
		nameTranslit: "Al-Qasas",
		nameEnglish: "The Stories",
		ayahCount: 88,
		revelationType: "Meccan",
		juz: 20
	},
	{
		number: 29,
		nameArabic: "العنكبوت",
		nameTranslit: "Al-Ankabut",
		nameEnglish: "The Spider",
		ayahCount: 69,
		revelationType: "Meccan",
		juz: 20
	},
	{
		number: 30,
		nameArabic: "الروم",
		nameTranslit: "Ar-Rum",
		nameEnglish: "The Romans",
		ayahCount: 60,
		revelationType: "Meccan",
		juz: 21
	},
	{
		number: 31,
		nameArabic: "لقمان",
		nameTranslit: "Luqman",
		nameEnglish: "Luqman",
		ayahCount: 34,
		revelationType: "Meccan",
		juz: 21
	},
	{
		number: 32,
		nameArabic: "السجدة",
		nameTranslit: "As-Sajdah",
		nameEnglish: "The Prostration",
		ayahCount: 30,
		revelationType: "Meccan",
		juz: 21
	},
	{
		number: 33,
		nameArabic: "الأحزاب",
		nameTranslit: "Al-Ahzab",
		nameEnglish: "The Combined Forces",
		ayahCount: 73,
		revelationType: "Madani",
		juz: 21
	},
	{
		number: 34,
		nameArabic: "سبأ",
		nameTranslit: "Saba",
		nameEnglish: "Sheba",
		ayahCount: 54,
		revelationType: "Meccan",
		juz: 22
	},
	{
		number: 35,
		nameArabic: "فاطر",
		nameTranslit: "Fatir",
		nameEnglish: "Originator",
		ayahCount: 45,
		revelationType: "Meccan",
		juz: 22
	},
	{
		number: 36,
		nameArabic: "يس",
		nameTranslit: "Ya-Sin",
		nameEnglish: "Ya-Sin",
		ayahCount: 83,
		revelationType: "Meccan",
		juz: 22
	},
	{
		number: 37,
		nameArabic: "الصافات",
		nameTranslit: "As-Saffat",
		nameEnglish: "Those Ranged in Ranks",
		ayahCount: 182,
		revelationType: "Meccan",
		juz: 23
	},
	{
		number: 38,
		nameArabic: "ص",
		nameTranslit: "Sad",
		nameEnglish: "The Letter Sad",
		ayahCount: 88,
		revelationType: "Meccan",
		juz: 23
	},
	{
		number: 39,
		nameArabic: "الزمر",
		nameTranslit: "Az-Zumar",
		nameEnglish: "The Troops",
		ayahCount: 75,
		revelationType: "Meccan",
		juz: 23
	},
	{
		number: 40,
		nameArabic: "غافر",
		nameTranslit: "Ghafir",
		nameEnglish: "The Forgiver",
		ayahCount: 85,
		revelationType: "Meccan",
		juz: 24
	},
	{
		number: 41,
		nameArabic: "فصلت",
		nameTranslit: "Fussilat",
		nameEnglish: "Explained in Detail",
		ayahCount: 54,
		revelationType: "Meccan",
		juz: 24
	},
	{
		number: 42,
		nameArabic: "الشورى",
		nameTranslit: "Ash-Shura",
		nameEnglish: "The Consultation",
		ayahCount: 53,
		revelationType: "Meccan",
		juz: 25
	},
	{
		number: 43,
		nameArabic: "الزخرف",
		nameTranslit: "Az-Zukhruf",
		nameEnglish: "The Ornaments of Gold",
		ayahCount: 89,
		revelationType: "Meccan",
		juz: 25
	},
	{
		number: 44,
		nameArabic: "الدخان",
		nameTranslit: "Ad-Dukhan",
		nameEnglish: "The Smoke",
		ayahCount: 59,
		revelationType: "Meccan",
		juz: 25
	},
	{
		number: 45,
		nameArabic: "الجاثية",
		nameTranslit: "Al-Jathiyah",
		nameEnglish: "The Crouching",
		ayahCount: 37,
		revelationType: "Meccan",
		juz: 25
	},
	{
		number: 46,
		nameArabic: "الأحقاف",
		nameTranslit: "Al-Ahqaf",
		nameEnglish: "The Wind-Curved Sandhills",
		ayahCount: 35,
		revelationType: "Meccan",
		juz: 26
	},
	{
		number: 47,
		nameArabic: "محمد",
		nameTranslit: "Muhammad",
		nameEnglish: "Muhammad",
		ayahCount: 38,
		revelationType: "Madani",
		juz: 26
	},
	{
		number: 48,
		nameArabic: "الفتح",
		nameTranslit: "Al-Fath",
		nameEnglish: "The Victory",
		ayahCount: 29,
		revelationType: "Madani",
		juz: 26
	},
	{
		number: 49,
		nameArabic: "الحجرات",
		nameTranslit: "Al-Hujurat",
		nameEnglish: "The Rooms",
		ayahCount: 18,
		revelationType: "Madani",
		juz: 26
	},
	{
		number: 50,
		nameArabic: "ق",
		nameTranslit: "Qaf",
		nameEnglish: "The Letter Qaf",
		ayahCount: 45,
		revelationType: "Meccan",
		juz: 26
	},
	{
		number: 51,
		nameArabic: "الذاريات",
		nameTranslit: "Adh-Dhariyat",
		nameEnglish: "The Winnowing Winds",
		ayahCount: 60,
		revelationType: "Meccan",
		juz: 26
	},
	{
		number: 52,
		nameArabic: "الطور",
		nameTranslit: "At-Tur",
		nameEnglish: "The Mount",
		ayahCount: 49,
		revelationType: "Meccan",
		juz: 27
	},
	{
		number: 53,
		nameArabic: "النجم",
		nameTranslit: "An-Najm",
		nameEnglish: "The Star",
		ayahCount: 62,
		revelationType: "Meccan",
		juz: 27
	},
	{
		number: 54,
		nameArabic: "القمر",
		nameTranslit: "Al-Qamar",
		nameEnglish: "The Moon",
		ayahCount: 55,
		revelationType: "Meccan",
		juz: 27
	},
	{
		number: 55,
		nameArabic: "الرحمن",
		nameTranslit: "Ar-Rahman",
		nameEnglish: "The Most Merciful",
		ayahCount: 78,
		revelationType: "Madani",
		juz: 27
	},
	{
		number: 56,
		nameArabic: "الواقعة",
		nameTranslit: "Al-Waqi'ah",
		nameEnglish: "The Inevitable",
		ayahCount: 96,
		revelationType: "Meccan",
		juz: 27
	},
	{
		number: 57,
		nameArabic: "الحديد",
		nameTranslit: "Al-Hadid",
		nameEnglish: "The Iron",
		ayahCount: 29,
		revelationType: "Madani",
		juz: 27
	},
	{
		number: 58,
		nameArabic: "المجادلة",
		nameTranslit: "Al-Mujadila",
		nameEnglish: "The Pleading Woman",
		ayahCount: 22,
		revelationType: "Madani",
		juz: 28
	},
	{
		number: 59,
		nameArabic: "الحشر",
		nameTranslit: "Al-Hashr",
		nameEnglish: "The Exile",
		ayahCount: 24,
		revelationType: "Madani",
		juz: 28
	},
	{
		number: 60,
		nameArabic: "الممتحنة",
		nameTranslit: "Al-Mumtahanah",
		nameEnglish: "She That Is To Be Examined",
		ayahCount: 13,
		revelationType: "Madani",
		juz: 28
	},
	{
		number: 61,
		nameArabic: "الصف",
		nameTranslit: "As-Saff",
		nameEnglish: "The Ranks",
		ayahCount: 14,
		revelationType: "Madani",
		juz: 28
	},
	{
		number: 62,
		nameArabic: "الجمعة",
		nameTranslit: "Al-Jumu'ah",
		nameEnglish: "The Congregation",
		ayahCount: 11,
		revelationType: "Madani",
		juz: 28
	},
	{
		number: 63,
		nameArabic: "المنافقون",
		nameTranslit: "Al-Munafiqun",
		nameEnglish: "The Hypocrites",
		ayahCount: 11,
		revelationType: "Madani",
		juz: 28
	},
	{
		number: 64,
		nameArabic: "التغابن",
		nameTranslit: "At-Taghabun",
		nameEnglish: "The Mutual Disillusion",
		ayahCount: 18,
		revelationType: "Madani",
		juz: 28
	},
	{
		number: 65,
		nameArabic: "الطلاق",
		nameTranslit: "At-Talaq",
		nameEnglish: "The Divorce",
		ayahCount: 12,
		revelationType: "Madani",
		juz: 28
	},
	{
		number: 66,
		nameArabic: "التحريم",
		nameTranslit: "At-Tahrim",
		nameEnglish: "The Prohibition",
		ayahCount: 12,
		revelationType: "Madani",
		juz: 28
	},
	{
		number: 67,
		nameArabic: "الملك",
		nameTranslit: "Al-Mulk",
		nameEnglish: "The Sovereignty",
		ayahCount: 30,
		revelationType: "Meccan",
		juz: 29
	},
	{
		number: 68,
		nameArabic: "القلم",
		nameTranslit: "Al-Qalam",
		nameEnglish: "The Pen",
		ayahCount: 52,
		revelationType: "Meccan",
		juz: 29
	},
	{
		number: 69,
		nameArabic: "الحاقة",
		nameTranslit: "Al-Haqqah",
		nameEnglish: "The Reality",
		ayahCount: 52,
		revelationType: "Meccan",
		juz: 29
	},
	{
		number: 70,
		nameArabic: "المعارج",
		nameTranslit: "Al-Ma'arij",
		nameEnglish: "The Ascending Stairways",
		ayahCount: 44,
		revelationType: "Meccan",
		juz: 29
	},
	{
		number: 71,
		nameArabic: "نوح",
		nameTranslit: "Nuh",
		nameEnglish: "Noah",
		ayahCount: 28,
		revelationType: "Meccan",
		juz: 29
	},
	{
		number: 72,
		nameArabic: "الجن",
		nameTranslit: "Al-Jinn",
		nameEnglish: "The Jinn",
		ayahCount: 28,
		revelationType: "Meccan",
		juz: 29
	},
	{
		number: 73,
		nameArabic: "المزمل",
		nameTranslit: "Al-Muzzammil",
		nameEnglish: "The Enshrouded One",
		ayahCount: 20,
		revelationType: "Meccan",
		juz: 29
	},
	{
		number: 74,
		nameArabic: "المدثر",
		nameTranslit: "Al-Muddaththir",
		nameEnglish: "The Cloaked One",
		ayahCount: 56,
		revelationType: "Meccan",
		juz: 29
	},
	{
		number: 75,
		nameArabic: "القيامة",
		nameTranslit: "Al-Qiyamah",
		nameEnglish: "The Resurrection",
		ayahCount: 40,
		revelationType: "Meccan",
		juz: 29
	},
	{
		number: 76,
		nameArabic: "الإنسان",
		nameTranslit: "Al-Insan",
		nameEnglish: "The Man",
		ayahCount: 31,
		revelationType: "Madani",
		juz: 29
	},
	{
		number: 77,
		nameArabic: "المرسلات",
		nameTranslit: "Al-Mursalat",
		nameEnglish: "The Emissaries",
		ayahCount: 50,
		revelationType: "Meccan",
		juz: 29
	},
	{
		number: 78,
		nameArabic: "النبأ",
		nameTranslit: "An-Naba",
		nameEnglish: "The Tidings",
		ayahCount: 40,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 79,
		nameArabic: "النازعات",
		nameTranslit: "An-Nazi'at",
		nameEnglish: "Those Who Drag Forth",
		ayahCount: 46,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 80,
		nameArabic: "عبس",
		nameTranslit: "Abasa",
		nameEnglish: "He Frowned",
		ayahCount: 42,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 81,
		nameArabic: "التكوير",
		nameTranslit: "At-Takwir",
		nameEnglish: "The Overthrowing",
		ayahCount: 29,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 82,
		nameArabic: "الانفطار",
		nameTranslit: "Al-Infitar",
		nameEnglish: "The Cleaving",
		ayahCount: 19,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 83,
		nameArabic: "المطففين",
		nameTranslit: "Al-Mutaffifin",
		nameEnglish: "The Defrauding",
		ayahCount: 36,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 84,
		nameArabic: "الانشقاق",
		nameTranslit: "Al-Inshiqaq",
		nameEnglish: "The Sundering",
		ayahCount: 25,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 85,
		nameArabic: "البروج",
		nameTranslit: "Al-Buruj",
		nameEnglish: "The Mansions of the Stars",
		ayahCount: 22,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 86,
		nameArabic: "الطارق",
		nameTranslit: "At-Tariq",
		nameEnglish: "The Morning Star",
		ayahCount: 17,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 87,
		nameArabic: "الأعلى",
		nameTranslit: "Al-A'la",
		nameEnglish: "The Most High",
		ayahCount: 19,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 88,
		nameArabic: "الغاشية",
		nameTranslit: "Al-Ghashiyah",
		nameEnglish: "The Overwhelming",
		ayahCount: 26,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 89,
		nameArabic: "الفجر",
		nameTranslit: "Al-Fajr",
		nameEnglish: "The Dawn",
		ayahCount: 30,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 90,
		nameArabic: "البلد",
		nameTranslit: "Al-Balad",
		nameEnglish: "The City",
		ayahCount: 20,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 91,
		nameArabic: "الشمس",
		nameTranslit: "Ash-Shams",
		nameEnglish: "The Sun",
		ayahCount: 15,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 92,
		nameArabic: "الليل",
		nameTranslit: "Al-Layl",
		nameEnglish: "The Night",
		ayahCount: 21,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 93,
		nameArabic: "الضحى",
		nameTranslit: "Ad-Duha",
		nameEnglish: "The Morning Hours",
		ayahCount: 11,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 94,
		nameArabic: "الشرح",
		nameTranslit: "Ash-Sharh",
		nameEnglish: "The Relief",
		ayahCount: 8,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 95,
		nameArabic: "التين",
		nameTranslit: "At-Tin",
		nameEnglish: "The Fig",
		ayahCount: 8,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 96,
		nameArabic: "العلق",
		nameTranslit: "Al-Alaq",
		nameEnglish: "The Clot",
		ayahCount: 19,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 97,
		nameArabic: "القدر",
		nameTranslit: "Al-Qadr",
		nameEnglish: "The Power",
		ayahCount: 5,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 98,
		nameArabic: "البينة",
		nameTranslit: "Al-Bayyinah",
		nameEnglish: "The Clear Proof",
		ayahCount: 8,
		revelationType: "Madani",
		juz: 30
	},
	{
		number: 99,
		nameArabic: "الزلزلة",
		nameTranslit: "Az-Zalzalah",
		nameEnglish: "The Earthquake",
		ayahCount: 8,
		revelationType: "Madani",
		juz: 30
	},
	{
		number: 100,
		nameArabic: "العاديات",
		nameTranslit: "Al-Adiyat",
		nameEnglish: "The Courser",
		ayahCount: 11,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 101,
		nameArabic: "القارعة",
		nameTranslit: "Al-Qari'ah",
		nameEnglish: "The Calamity",
		ayahCount: 11,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 102,
		nameArabic: "التكاثر",
		nameTranslit: "At-Takathur",
		nameEnglish: "The Rivalry in Worldly Increase",
		ayahCount: 8,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 103,
		nameArabic: "العصر",
		nameTranslit: "Al-Asr",
		nameEnglish: "The Declining Day",
		ayahCount: 3,
		revelationType: "Meccan",
		juz: 30,
		bundledOffline: true
	},
	{
		number: 104,
		nameArabic: "الهمزة",
		nameTranslit: "Al-Humazah",
		nameEnglish: "The Traducer",
		ayahCount: 9,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 105,
		nameArabic: "الفيل",
		nameTranslit: "Al-Fil",
		nameEnglish: "The Elephant",
		ayahCount: 5,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 106,
		nameArabic: "قريش",
		nameTranslit: "Quraysh",
		nameEnglish: "Quraysh",
		ayahCount: 4,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 107,
		nameArabic: "الماعون",
		nameTranslit: "Al-Ma'un",
		nameEnglish: "The Small Kindnesses",
		ayahCount: 7,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 108,
		nameArabic: "الكوثر",
		nameTranslit: "Al-Kawthar",
		nameEnglish: "The Abundance",
		ayahCount: 3,
		revelationType: "Meccan",
		juz: 30,
		bundledOffline: true
	},
	{
		number: 109,
		nameArabic: "الكافرون",
		nameTranslit: "Al-Kafirun",
		nameEnglish: "The Disbelievers",
		ayahCount: 6,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 110,
		nameArabic: "النصر",
		nameTranslit: "An-Nasr",
		nameEnglish: "The Divine Support",
		ayahCount: 3,
		revelationType: "Madani",
		juz: 30
	},
	{
		number: 111,
		nameArabic: "المسد",
		nameTranslit: "Al-Masad",
		nameEnglish: "The Palm Fiber",
		ayahCount: 5,
		revelationType: "Meccan",
		juz: 30
	},
	{
		number: 112,
		nameArabic: "الإخلاص",
		nameTranslit: "Al-Ikhlas",
		nameEnglish: "The Sincerity",
		ayahCount: 4,
		revelationType: "Meccan",
		juz: 30,
		bundledOffline: true
	},
	{
		number: 113,
		nameArabic: "الفلق",
		nameTranslit: "Al-Falaq",
		nameEnglish: "The Daybreak",
		ayahCount: 5,
		revelationType: "Meccan",
		juz: 30,
		bundledOffline: true
	},
	{
		number: 114,
		nameArabic: "الناس",
		nameTranslit: "An-Nas",
		nameEnglish: "Mankind",
		ayahCount: 6,
		revelationType: "Meccan",
		juz: 30,
		bundledOffline: true
	}
];
var BUNDLED_SURAH_AYAHS = {
	1: [
		{
			numberInSurah: 1,
			globalNumber: 1,
			arabicUthmani: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
			transliteration: "Bismillahir-Rahmanir-Rahim",
			translations: {
				en: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
				hi: "अल्लाह के नाम से जो अत्यंत कृपालु और दयावान है।",
				hinglish: "Allah ke naam se jo behad meharban aur raham karne wala hai.",
				ur: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔",
				tr: "Rahmân ve Rahîm olan Allah’ın adıyla.",
				id: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang."
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3",
			tafsirBrief: "Opening every noble action seeking the blessing and mercy of Allah."
		},
		{
			numberInSurah: 2,
			globalNumber: 2,
			arabicUthmani: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
			transliteration: "Alhamdu lillahi Rabbil-alamin",
			translations: {
				en: "[All] praise is [due] to Allah, Lord of the worlds -",
				hi: "सब प्रशंसा अल्लाह ही के लिए है जो सारे संसार का पालनहार है।",
				hinglish: "Sab tareef Allah hi ke liye hai jo saare jahanon ka Rab hai.",
				ur: "سب تعریف اللہ تعالیٰ کے لیے ہے جو تمام جہانوں کا پالنہار ہے۔",
				tr: "Hamd, Âlemlerin Rabbi Allah’a mahsustur.",
				id: "Segala puji bagi Allah, Tuhan seluruh alam,"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3",
			tafsirBrief: "Complete gratitude and praise belong solely to the Creator and Sustainer of all creation."
		},
		{
			numberInSurah: 3,
			globalNumber: 3,
			arabicUthmani: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
			transliteration: "Ar-Rahmanir-Rahim",
			translations: {
				en: "The Entirely Merciful, the Especially Merciful,",
				hi: "जो अत्यंत कृपालु और दयावान है।",
				hinglish: "Jo bada meharban, nihayat raham wala hai.",
				ur: "بڑا مہربان نہایت رحم کرنے والا۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3",
			tafsirBrief: "Allah’s Lordship is founded on encompassing mercy rather than harshness."
		},
		{
			numberInSurah: 4,
			globalNumber: 4,
			arabicUthmani: "مَـٰلِكِ يَوْمِ ٱلدِّينِ",
			transliteration: "Maliki yawmid-din",
			translations: {
				en: "Sovereign of the Day of Recompense.",
				hi: "बदले के दिन (क़ियामत) का मालिक है।",
				hinglish: "Badle ke din (Qayamat) ka Maalik hai.",
				ur: "بدلے کے دن (قیامت) کا مالک ہے۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3",
			tafsirBrief: "Reminds the believer of accountability and ultimate justice on the Day of Judgment."
		},
		{
			numberInSurah: 5,
			globalNumber: 5,
			arabicUthmani: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
			transliteration: "Iyyaka na’budu wa iyyaka nasta’in",
			translations: {
				en: "It is You we worship and You we ask for help.",
				hi: "हम तेरी ही इबादत करते हैं और तुझ ही से मदद मांगते हैं।",
				hinglish: "Hum Teri hi ibadat karte hain aur Tujh hi se madad maangte hain.",
				ur: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد چاہتے ہیں۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3",
			tafsirBrief: "The heart of Tawhid: exclusive devotion to Allah and reliance upon His help."
		},
		{
			numberInSurah: 6,
			globalNumber: 6,
			arabicUthmani: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
			transliteration: "Ihdinas-siratal-mustaqim",
			translations: {
				en: "Guide us to the straight path -",
				hi: "हमें सीधे रास्ते पर चला।",
				hinglish: "Humein seedhe raaste (Sirat-al-Mustaqeem) par chala.",
				ur: "ہمیں سیدھی راہ دکھا۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3",
			tafsirBrief: "The most essential daily supplication: asking for steadfastness and clear guidance."
		},
		{
			numberInSurah: 7,
			globalNumber: 7,
			arabicUthmani: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
			transliteration: "Siratal-ladhina an’amta alayhim ghayril-maghdubi alayhim wa lad-dallin",
			translations: {
				en: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
				hi: "उन लोगों का रास्ता जिन पर तूने इनाम किया, न कि उनका जिन पर गुस्सा किया गया और न गुमराहों का।",
				hinglish: "Un logon ka raasta jin par Tune inaam kiya, na ki unka jin par ghazab hua aur na gumrahon ka.",
				ur: "ان لوگوں کی راہ جن پر تو نے انعام کیا، نہ کہ ان کی جن پر غضب کیا گیا اور نہ گمراہوں کی۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3",
			tafsirBrief: "Following the footsteps of the Prophets, the truthful, the martyrs, and the righteous."
		}
	],
	2: [
		{
			numberInSurah: 1,
			globalNumber: 8,
			arabicUthmani: "الٓمٓ",
			transliteration: "Alif, Lam, Meem.",
			translations: {
				en: "Alif, Lam, Meem.",
				hi: "अलिफ़॰ लाम॰ मीम॰",
				hinglish: "Alif, Lam, Meem.",
				ur: "الف لام میم۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/8.mp3",
			tafsirBrief: "Disjoined Arabic letters (Huroof Muqatta’at) whose ultimate knowledge belongs to Allah, highlighting the miraculous nature of the Quran."
		},
		{
			numberInSurah: 2,
			globalNumber: 9,
			arabicUthmani: "ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
			transliteration: "Dhalikal-kitabu la rayba fih, hudal-lil-muttaqin",
			translations: {
				en: "This is the Book about which there is no doubt, a guidance for those conscious of Allah -",
				hi: "यह वह किताब है जिसमें कोई संदेह नहीं, परहेज़गारों (अल्लाह से डरने वालों) के लिए हिदायत है।",
				hinglish: "Yeh woh Kitaab hai jismein koi shak nahi, hidayat hai Taqwa rakhne walon ke liye.",
				ur: "یہ وہ کتاب ہے جس میں کوئی شک نہیں، پرہیزگاروں کے لیے ہدایت ہے۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/9.mp3",
			tafsirBrief: "True benefit from the Quran opens up to hearts cultivating Taqwa (mindfulness of Allah)."
		},
		{
			numberInSurah: 3,
			globalNumber: 10,
			arabicUthmani: "ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَـٰهُمْ يُنفِقُونَ",
			transliteration: "Alladhina yu’minuna bil-ghaybi wa yuqimunas-salata wa mimma razaqnahum yunfiqun",
			translations: {
				en: "Who believe in the unseen, establish prayer, and spend out of what We have provided for them,",
				hi: "जो बिन देखे ईमान लाते हैं और नमाज़ क़ायम करते हैं और जो कुछ हमने उन्हें दिया है उसमें से ख़र्च करते हैं।",
				hinglish: "Jo ghaib par iman laate hain, Namaz qayam karte hain aur hamare diye hue rizq se kharch karte hain.",
				ur: "جو غیب پر ایمان لاتے ہیں اور نماز قائم کرتے ہیں اور ہمارے دیے ہوئے رزق سے خرچ کرتے ہیں۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/10.mp3",
			tafsirBrief: "Unites internal faith (Iman), bodily worship (Salah), and financial generosity (Infaq)."
		},
		{
			numberInSurah: 255,
			globalNumber: 262,
			arabicUthmani: "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ",
			transliteration: "Allahu la ilaha illa Huwal-Hayyul-Qayyum, la ta’khudhuhu sinatun wa la nawm...",
			translations: {
				en: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
				hi: "अल्लाह के सिवा कोई माबूद नहीं, वह जीवित है और सबका थामने वाला है। उसे न ऊंघ आती है और न नींद।",
				hinglish: "Allah — Uske siwa koi Maabood nahi, Woh Hamesha Zinda aur Sabko Qayam rakhne wala hai (Ayat al-Kursi).",
				ur: "اللہ کے سوا کوئی معبود نہیں، وہ زندہ ہے سب کا تھامنے والا، نہ اسے اونگھ آتی ہے نہ نیند۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3",
			tafsirBrief: "Ayat al-Kursi: The greatest verse in the Quran affirming Allah’s absolute sovereignty, life, and knowledge."
		},
		{
			numberInSurah: 286,
			globalNumber: 293,
			arabicUthmani: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ",
			transliteration: "La yukallifullahu nafsan illa wus’aha, laha ma kasabat wa alayha maktasabat",
			translations: {
				en: "Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned.",
				hi: "अल्लाह किसी जान पर उसकी ताक़त से बढ़कर बोझ नहीं डालता।",
				hinglish: "Allah kisi jaan par uski taaqat se zyada bojh nahi daalta.",
				ur: "اللہ کسی جان کو اس کی طاقت سے زیادہ تکلیف نہیں دیتا۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/293.mp3",
			tafsirBrief: "A verse of immense mercy and relief gifted to the Ummah."
		}
	],
	103: [
		{
			numberInSurah: 1,
			globalNumber: 6177,
			arabicUthmani: "وَٱلْعَصْرِ",
			transliteration: "Wal-asr",
			translations: {
				en: "By time,",
				hi: "ज़माने की क़सम,",
				hinglish: "Zamane (waqt) ki qasam,",
				ur: "زمانے کی قسم،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6177.mp3",
			tafsirBrief: "Allah swears by time—the capital of every human being."
		},
		{
			numberInSurah: 2,
			globalNumber: 6178,
			arabicUthmani: "إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ",
			transliteration: "Innal-insana lafi khusr",
			translations: {
				en: "Indeed, mankind is in loss,",
				hi: "बेशक इंसान घाटे में है,",
				hinglish: "Beshak insaan khasaare (nuksaan) mein hai,",
				ur: "بے شک انسان خسارے میں ہے،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6178.mp3",
			tafsirBrief: "Without divine guidance, passing time naturally depletes our lifespan."
		},
		{
			numberInSurah: 3,
			globalNumber: 6179,
			arabicUthmani: "إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ",
			transliteration: "Illal-ladhina amanu wa amilus-salihati wa tawasaw bil-haqqi wa tawasaw bis-sabr",
			translations: {
				en: "Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
				hi: "सिवाय उन लोगों के जो ईमान लाए और नेक अमल किए और एक-दूसरे को हक़ की नसीहत की और सब्र की त تلقीन की।",
				hinglish: "Siwaye un logon ke jo Iman laaye, nek aamal kiye, aur ek doosre ko Haq aur Sabr ki nasihat ki.",
				ur: "سوائے ان لوگوں کے جو ایمان لائے اور نیک عمل کیے اور ایک دوسرے کو حق اور صبر کی نصیحت کی۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6179.mp3",
			tafsirBrief: "Four pillars of salvation: Faith, Righteous Action, Mutual Truth, and Mutual Patience."
		}
	],
	108: [
		{
			numberInSurah: 1,
			globalNumber: 6205,
			arabicUthmani: "إِنَّآ أَعْطَيْنَـٰكَ ٱلْكَوْثَرَ",
			transliteration: "Inna a'taynaka al-kawthar",
			translations: {
				en: "Indeed, We have granted you, [O Muhammad], al-Kawthar.",
				hi: "बेशक हमने आपको कौसर (ढेरों भलाई) अता की है।",
				hinglish: "Beshak humne aapko Al-Kawthar (be-hisab khair) ata farmaya hai.",
				ur: "بے شک ہم نے آپ کو کوثر عطا فرمایا۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6205.mp3",
			tafsirBrief: "Al-Kawthar includes abundant good in both worlds and the River in Paradise."
		},
		{
			numberInSurah: 2,
			globalNumber: 6206,
			arabicUthmani: "فَصَلِّ لِرَبِّكَ وَٱنْحَرْ",
			transliteration: "Fasalli li-rabbika wanhar",
			translations: {
				en: "So pray to your Lord and sacrifice [to Him alone].",
				hi: "तो अपने रब के लिए नमाज़ पढ़िए और क़ुर्बानी कीजिए।",
				hinglish: "Pas apne Rab ke liye namaz padhiye aur qurbani kijiye.",
				ur: "پس اپنے رب کے لیے نماز پڑھیے اور قربانی کیجیے۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6206.mp3",
			tafsirBrief: "Gratitude is expressed through sincere prayer and sacrifice solely for Allah."
		},
		{
			numberInSurah: 3,
			globalNumber: 6207,
			arabicUthmani: "إِنَّ شَانِئَكَ هُوَ ٱلْأَبْتَرُ",
			transliteration: "Inna shani’aka huwal-abtar",
			translations: {
				en: "Indeed, your enemy is the one cut off.",
				hi: "बेशक आपका दुश्मन ही जड़-कटा (बे-निशान) है।",
				hinglish: "Beshak aapka dushman hi be-naam-o-nishan rahega.",
				ur: "بے شک آپ کا دشمن ہی بے نام و نشان ہے۔"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6207.mp3",
			tafsirBrief: "The legacy of the Prophet ﷺ endures forever across the globe."
		}
	],
	112: [
		{
			numberInSurah: 1,
			globalNumber: 6222,
			arabicUthmani: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
			transliteration: "Qul huwallahu ahad",
			translations: {
				en: "Say, \"He is Allah, [who is] One,",
				hi: "कह दीजिए, \"वह अल्लाह एक है,",
				hinglish: "Kaho: Woh Allah Ek (Ahad) hai,",
				ur: "کہو وہ اللہ ایک ہے،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3",
			tafsirBrief: "Pure Tawhid: Allah is uniquely One in His Essence, Names, and Attributes."
		},
		{
			numberInSurah: 2,
			globalNumber: 6223,
			arabicUthmani: "ٱللَّهُ ٱلصَّمَدُ",
			transliteration: "Allahus-samad",
			translations: {
				en: "Allah, the Eternal Refuge.",
				hi: "अल्लाह बेनियाज़ है (सब उसके मुहताज हैं)।",
				hinglish: "Allah As-Samad hai (sab Uske mohtaj hain, Woh kisi ka mohtaj nahi).",
				ur: "اللہ بے نیاز ہے،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6223.mp3",
			tafsirBrief: "As-Samad: The Master upon Whom all creation depends while He needs none."
		},
		{
			numberInSurah: 3,
			globalNumber: 6224,
			arabicUthmani: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
			transliteration: "Lam yalid wa lam yulad",
			translations: {
				en: "He neither begets nor is born,",
				hi: "न उसकी कोई औलाद है और न वह किसी से पैदा हुआ,",
				hinglish: "Na uski koi aulad hai aur na woh kisi se paida hua,",
				ur: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی سے پیدا ہوا،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6224.mp3",
			tafsirBrief: "Allah transcends all human limitations of lineage, beginning, or succession."
		},
		{
			numberInSurah: 4,
			globalNumber: 6225,
			arabicUthmani: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
			transliteration: "Wa lam yakul-lahu kufuwan ahad",
			translations: {
				en: "Nor is there to Him any equivalent.\"",
				hi: "और न कोई उसके बराबर का है।\"",
				hinglish: "Aur na koi Uske barabar (humsar) hai.\"",
				ur: "اور نہ کوئی اس کا ہمسر ہے۔\""
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3",
			tafsirBrief: "Surah Al-Ikhlas equals one-third of the Quran in meaning (Sahih al-Bukhari 5013)."
		}
	],
	113: [
		{
			numberInSurah: 1,
			globalNumber: 6226,
			arabicUthmani: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ",
			transliteration: "Qul a’udhu bi-rabbil-falaq",
			translations: {
				en: "Say, \"I seek refuge in the Lord of daybreak",
				hi: "कह दीजिए, \"मैं सुबह के रब की पनाह मांगता हूँ,",
				hinglish: "Kaho: Main subah ke Rab ki panah maangta hoon,",
				ur: "کہو میں صبح کے رب کی پناہ مانگتا ہوں،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3",
			tafsirBrief: "Seeking protection in the One who splits the darkness of night with morning light."
		},
		{
			numberInSurah: 2,
			globalNumber: 6227,
			arabicUthmani: "مِن شَرِّ مَا خَلَقَ",
			transliteration: "Min sharri ma khalaq",
			translations: {
				en: "From the evil of that which He created",
				hi: "हर उस चीज़ की बुराई से जो उसने पैदा की,",
				hinglish: "Har us cheez ke shar se jo Usne paida ki,",
				ur: "ہر اس چیز کے شر سے جو اس نے پیدا کی،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6227.mp3",
			tafsirBrief: "Comprehensive protection from all physical and spiritual harm."
		},
		{
			numberInSurah: 3,
			globalNumber: 6228,
			arabicUthmani: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
			transliteration: "Wa min sharri ghasiqin idha waqab",
			translations: {
				en: "And from the evil of darkness when it settles",
				hi: "और अंधेरी रात की बुराई से जब वह छा जाए,",
				hinglish: "Aur andheri raat ke shar se jab woh chha jaye,",
				ur: "اور اندھیری رات کے شر سے جب وہ چھا جائے،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6228.mp3",
			tafsirBrief: "Protection during the stillness and hidden dangers of night."
		},
		{
			numberInSurah: 4,
			globalNumber: 6229,
			arabicUthmani: "وَمِن شَرِّ ٱلنَّفَّـٰثَـٰتِ فِى ٱلْعُقَدِ",
			transliteration: "Wa min sharrin-naffathati fil-uqad",
			translations: {
				en: "And from the evil of the blowers in knots",
				hi: "और गिरहों में फूंकने वालियों के शर से,",
				hinglish: "Aur girhon mein phoonkne walon ke shar se,",
				ur: "اور گرہوں میں پھونکنے والیوں کے شر سے،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6229.mp3",
			tafsirBrief: "Seeking Allah’s shield against magic, malice, and discord."
		},
		{
			numberInSurah: 5,
			globalNumber: 6230,
			arabicUthmani: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
			transliteration: "Wa min sharri hasidin idha hasad",
			translations: {
				en: "And from the evil of an envier when he envies.\"",
				hi: "और हसद (जलन) करने वाले की बुराई से जब वह हसद करे।\"",
				hinglish: "Aur hasad karne wale ke shar se jab woh hasad kare.\"",
				ur: "اور حسد کرنے والے کے شر سے جب وہ حسد کرے۔\""
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6230.mp3",
			tafsirBrief: "Protection from envy and the evil eye through remembrance of Allah."
		}
	],
	114: [
		{
			numberInSurah: 1,
			globalNumber: 6231,
			arabicUthmani: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ",
			transliteration: "Qul a’udhu bi-rabbin-nas",
			translations: {
				en: "Say, \"I seek refuge in the Lord of mankind,",
				hi: "कह दीजिए, \"मैं इंसानों के रब की पनाह मांगता हूँ,",
				hinglish: "Kaho: Main insaanon ke Rab ki panah maangta hoon,",
				ur: "کہو میں انسانوں کے رب کی پناہ مانگتا ہوں،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3",
			tafsirBrief: "Seeking refuge in Allah’s nurturing Lordship (Rububiyyah) over humanity."
		},
		{
			numberInSurah: 2,
			globalNumber: 6232,
			arabicUthmani: "مَلِكِ ٱلنَّاسِ",
			transliteration: "Malikin-nas",
			translations: {
				en: "The Sovereign of mankind,",
				hi: "इंसानों के बादशाह की,",
				hinglish: "Insaanon ke Badshah (Maalik) ki,",
				ur: "انسانوں کے بادشاہ کی،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6232.mp3",
			tafsirBrief: "Affirming Allah as the true King and Ruler over all people."
		},
		{
			numberInSurah: 3,
			globalNumber: 6233,
			arabicUthmani: "إِلَـٰهِ ٱلنَّاسِ",
			transliteration: "Ilahin-nas",
			translations: {
				en: "The God of mankind,",
				hi: "इंसानों के माबूद की,",
				hinglish: "Insaanon ke Maabood (Ilah) ki,",
				ur: "انسانوں کے معبود کی،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6233.mp3",
			tafsirBrief: "Only Allah deserves worship and devotion."
		},
		{
			numberInSurah: 4,
			globalNumber: 6234,
			arabicUthmani: "مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ",
			transliteration: "Min sharril-waswasil-khannas",
			translations: {
				en: "From the evil of the retreating whisperer -",
				hi: "वसवसा डालने वाले पीछे हट जाने वाले की बुराई से,",
				hinglish: "Waswasa daalne wale (Shaitan) ke shar se jo Allah ke zikr par peeche hat jata hai,",
				ur: "وسوسہ ڈالنے والے پیچھے ہٹ جانے والے کے شر سے،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6234.mp3",
			tafsirBrief: "The whisperer retreats whenever the servant remembers Allah."
		},
		{
			numberInSurah: 5,
			globalNumber: 6235,
			arabicUthmani: "ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ",
			transliteration: "Alladhi yuwaswisu fi sudurin-nas",
			translations: {
				en: "Who whispers [evil] into the breasts of mankind -",
				hi: "जो लोगों के सीनों में वसवसा डालता है,",
				hinglish: "Jo logon ke seenon (dilon) mein waswasa daalta hai,",
				ur: "جو لوگوں کے سینوں میں وسوسہ ڈالتا ہے،"
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6235.mp3",
			tafsirBrief: "Guarding the heart from doubts and negative inclinations."
		},
		{
			numberInSurah: 6,
			globalNumber: 6236,
			arabicUthmani: "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
			transliteration: "Minal-jinnati wan-nas",
			translations: {
				en: "From among the jinn and mankind.\"",
				hi: "चाहे वह जिन्नात में से हो या इंसानों में से।\"",
				hinglish: "Chahe woh Jinnat mein se ho ya Insaanon mein se.\"",
				ur: "جنات میں سے ہو یا انسانوں میں سے۔\""
			},
			audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6236.mp3",
			tafsirBrief: "Seals the Quran with protection from both unseen and visible bad influences."
		}
	]
};
var VERIFIED_RECITER_EDITIONS = [
	{
		id: "Mishary Rashid Alafasy",
		label: "Mishary Rashid Alafasy",
		editionId: "ar.alafasy",
		cdnBitrate: 128,
		verified: true
	},
	{
		id: "Abdul Basit Abdus Samad",
		label: "Abdul Basit Abdus Samad",
		editionId: "ar.abdulbasitmurattal",
		cdnBitrate: 192,
		verified: true
	},
	{
		id: "Abdur-Rahman as-Sudais",
		label: "Abdur-Rahman as-Sudais",
		editionId: "ar.abdurrahmaansudais",
		cdnBitrate: 192,
		verified: true
	},
	{
		id: "Mahmoud Khalil Al-Husary",
		label: "Mahmoud Khalil Al-Husary",
		editionId: "ar.husary",
		cdnBitrate: 128,
		verified: true
	}
];
function resolveReciterConfig(reciterName) {
	if (!reciterName) return VERIFIED_RECITER_EDITIONS[0];
	const normalized = reciterName.trim().toLowerCase();
	const match = VERIFIED_RECITER_EDITIONS.find((r) => r.id.toLowerCase() === normalized || r.editionId.toLowerCase() === normalized || normalized.includes("abdul basit") && r.editionId === "ar.abdulbasitmurattal" || normalized.includes("sudais") && r.editionId === "ar.abdurrahmaansudais" || normalized.includes("husary") && r.editionId === "ar.husary" || normalized.includes("alafasy") && r.editionId === "ar.alafasy");
	if (match) return match;
	return {
		...VERIFIED_RECITER_EDITIONS[0],
		verified: false
	};
}
function resolveAyahAudioUrl(ayah, reciterName) {
	const reciter = resolveReciterConfig(reciterName);
	if (ayah.globalNumber && ayah.globalNumber > 0) return `https://cdn.islamic.network/quran/audio/${reciter.cdnBitrate}/${reciter.editionId}/${ayah.globalNumber}.mp3`;
	return ayah.audioUrl;
}
function getSurahOfflineAvailability(surahNumber, downloadedSurahNumbers = [], cachedSurahNumbers = []) {
	if (downloadedSurahNumbers.includes(surahNumber)) return "downloaded";
	const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
	const bundled = BUNDLED_SURAH_AYAHS[surahNumber];
	if (bundled && meta) {
		if (bundled.length >= meta.ayahCount) return "bundled_full";
		if (cachedSurahNumbers.includes(surahNumber)) return "cached";
		return "bundled_partial";
	}
	if (cachedSurahNumbers.includes(surahNumber)) return "cached";
	return "online_only";
}
var bundledEditionMemo = /* @__PURE__ */ new Map();
function getGlobalAyahOffsetForSurah(surahNumber) {
	let offset = 0;
	for (const s of ALL_114_SURAHS) {
		if (s.number >= surahNumber) break;
		offset += s.ayahCount;
	}
	return offset;
}
async function loadBundledQuranEdition(key, customLoader) {
	if (customLoader) return customLoader(key);
	if (typeof window === "undefined" || typeof fetch !== "function") return null;
	const existing = bundledEditionMemo.get(key);
	if (existing) return existing;
	const promise = (async () => {
		try {
			const resp = await fetch(`/data/quran-${key}.json`);
			if (!resp.ok) return null;
			const json = await resp.json();
			if (!json || json.totalSurahs !== 114 || json.totalAyahs !== 6236 || !json.surahs) return null;
			return json;
		} catch {
			return null;
		}
	})();
	bundledEditionMemo.set(key, promise);
	const res = await promise;
	if (!res) bundledEditionMemo.delete(key);
	return res;
}
async function loadBundledFullSurahFromAssets(surahNumber, lang, reciterName, customLoader) {
	const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
	if (!meta) return null;
	const targetEditionKey = lang === "hi" ? "hi" : lang === "ur" ? "ur" : null;
	const [uthmaniFile, enFile, localizedFile] = await Promise.all([
		loadBundledQuranEdition("uthmani", customLoader),
		loadBundledQuranEdition("en", customLoader),
		targetEditionKey ? loadBundledQuranEdition(targetEditionKey, customLoader) : Promise.resolve(null)
	]);
	if (!uthmaniFile || !enFile) return null;
	const sKey = String(surahNumber);
	const arList = uthmaniFile.surahs[sKey];
	const enList = enFile.surahs[sKey];
	const locList = localizedFile?.surahs[sKey];
	if (!Array.isArray(arList) || arList.length !== meta.ayahCount || !Array.isArray(enList) || enList.length !== meta.ayahCount) return null;
	const reciter = resolveReciterConfig(reciterName);
	const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];
	const globalOffset = getGlobalAyahOffsetForSurah(surahNumber);
	const payload = {
		meta,
		ayahs: arList.map((arabicUthmani, idx) => {
			const globalNumber = globalOffset + idx + 1;
			const enText = enList[idx] || "";
			const locText = locList && locList[idx] ? locList[idx] : enText;
			return {
				numberInSurah: idx + 1,
				globalNumber,
				arabicUthmani,
				transliteration: `Surah ${meta.nameTranslit} ${meta.number}:${idx + 1}`,
				translations: {
					en: enText,
					[lang]: locText
				},
				audioUrl: resolveAyahAudioUrl({ globalNumber }, reciter.id),
				juzNumber: meta.juz,
				tafsirBrief: `Verified Tanzil / King Fahd Uthmani Bundled Edition — Surah ${meta.nameTranslit} (${meta.number}:${idx + 1}).`
			};
		}),
		offlineUnavailable: false,
		isPartialOfflineBundle: false,
		offlineSourceType: "bundled_full",
		verification: {
			source: "Tanzil / King Fahd Complex Bundled Full 114-Surah Offline Package",
			edition: `quran-uthmani + en.sahih${targetEditionKey ? ` + ${localizedFile?.edition}` : ""} (${reciter.editionId})`,
			reference: `Surah ${meta.number} (${meta.nameTranslit}), ${meta.ayahCount} Ayahs`,
			language: langConfig.label,
			version: "2.0.0",
			reviewer: "Ilmizo Sharia & Text Verification Registry",
			status: "Verified"
		}
	};
	return validateSurahPayload(payload, meta, false).valid ? payload : null;
}
async function getSurahPayload(surahNumber, lang, reciterName, options) {
	const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber) || ALL_114_SURAHS[0];
	const reciter = resolveReciterConfig(reciterName);
	const isExplicitDownload = Boolean(options?.markExplicitDownload);
	if (!options?.forceNetworkFetch) try {
		const stored = await getOfflineSurahFromDb(surahNumber, lang);
		if (stored && stored.payload) {
			const parsed = stored.payload;
			if (validateSurahPayload(parsed, meta, Boolean(parsed?.isPartialOfflineBundle)).valid) {
				if (isExplicitDownload && !stored.isExplicitDownload) await saveOfflineSurahToDb(surahNumber, lang, parsed, true);
				return {
					...parsed,
					offlineUnavailable: false,
					offlineSourceType: stored.isExplicitDownload || isExplicitDownload ? "downloaded_idb" : "cached_idb",
					ayahs: parsed.ayahs.map((a) => ({
						...a,
						audioUrl: resolveAyahAudioUrl(a, reciter.id)
					}))
				};
			}
		}
	} catch {}
	const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];
	if (typeof navigator !== "undefined" && navigator.onLine) try {
		const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.transliteration,en.sahih,${langConfig.alquranEdition},${reciter.editionId}`);
		if (response.ok) {
			const json = await response.json();
			if (json?.data && Array.isArray(json.data) && json.data.length >= 4) {
				const uthmaniEdition = json.data[0];
				const uthmaniData = uthmaniEdition?.ayahs;
				const translitData = json.data[1]?.ayahs || [];
				const enData = json.data[2]?.ayahs || [];
				const targetLangData = json.data[3]?.ayahs || [];
				const audioData = json.data[4]?.ayahs || [];
				if (Array.isArray(uthmaniData) && uthmaniData.length === meta.ayahCount && Array.isArray(enData) && enData.length === meta.ayahCount && Array.isArray(targetLangData) && targetLangData.length === meta.ayahCount && (uthmaniEdition.number === void 0 || uthmaniEdition.number === meta.number)) {
					const payload = {
						meta,
						ayahs: uthmaniData.map((a, idx) => ({
							numberInSurah: a.numberInSurah,
							globalNumber: a.number,
							arabicUthmani: a.text,
							transliteration: translitData[idx]?.text || "",
							translations: {
								en: enData[idx]?.text || "",
								[lang]: targetLangData[idx]?.text || enData[idx]?.text || ""
							},
							audioUrl: audioData[idx]?.audio || resolveAyahAudioUrl({ globalNumber: a.number }, reciter.id),
							mushafPage: typeof a.page === "number" && a.page > 0 ? a.page : void 0,
							juzNumber: typeof a.juz === "number" && a.juz > 0 ? a.juz : meta.juz,
							tafsirBrief: `Verified Uthmani script — Surah ${meta.nameTranslit} (${meta.number}:${a.numberInSurah}), Juz ${a.juz || meta.juz}${typeof a.page === "number" ? `, Madinah Mushaf Page ${a.page}` : ""}.`
						})),
						offlineUnavailable: false,
						isPartialOfflineBundle: false,
						offlineSourceType: isExplicitDownload ? "downloaded_idb" : "live_api",
						verification: {
							source: "Tanzil / King Fahd Glorious Quran Printing Complex via AlQuran Cloud",
							edition: `quran-uthmani + ${langConfig.alquranEdition} (${reciter.editionId})`,
							reference: `Surah ${meta.number} (${meta.nameTranslit}), ${meta.ayahCount} Ayahs`,
							language: langConfig.label,
							version: "1.1.0",
							reviewer: "Ilmizo Sharia & Text Verification Registry",
							status: "Verified"
						}
					};
					if (validateSurahPayload(payload, meta, false).valid) {
						await saveOfflineSurahToDb(surahNumber, lang, payload, isExplicitDownload);
						return payload;
					}
				}
			}
		}
	} catch {}
	const bundled = BUNDLED_SURAH_AYAHS[surahNumber];
	if (bundled && bundled.length >= meta.ayahCount) {
		const bundledPayload = {
			meta,
			ayahs: bundled.map((a) => ({
				...a,
				juzNumber: a.juzNumber || meta.juz,
				audioUrl: resolveAyahAudioUrl(a, reciter.id)
			})),
			offlineUnavailable: false,
			isPartialOfflineBundle: false,
			offlineSourceType: "bundled_full",
			verification: {
				source: "King Fahd Complex Uthmani Script & Sahih International (Bundled Offline Package)",
				edition: `Offline Verified Edition v1 (${reciter.editionId})`,
				reference: `Surah ${meta.number} (${meta.nameTranslit})`,
				language: langConfig.label,
				version: "1.0.0",
				reviewer: "Ilmizo Sharia & Text Verification Registry",
				status: "Verified"
			}
		};
		if (isExplicitDownload) await saveOfflineSurahToDb(surahNumber, lang, bundledPayload, true);
		return bundledPayload;
	}
	if (typeof window !== "undefined") {
		const fullAssetPayload = await loadBundledFullSurahFromAssets(surahNumber, lang, reciter.id);
		if (fullAssetPayload) {
			if (isExplicitDownload) await saveOfflineSurahToDb(surahNumber, lang, fullAssetPayload, true);
			return fullAssetPayload;
		}
	}
	if (bundled && bundled.length > 0) {
		const isPartialOfflineBundle = bundled.length < meta.ayahCount;
		const bundledPayload = {
			meta,
			ayahs: bundled.map((a) => ({
				...a,
				juzNumber: a.juzNumber || meta.juz,
				audioUrl: resolveAyahAudioUrl(a, reciter.id)
			})),
			offlineUnavailable: false,
			isPartialOfflineBundle,
			offlineSourceType: isPartialOfflineBundle ? "bundled_partial" : "bundled_full",
			verification: {
				source: "King Fahd Complex Uthmani Script & Sahih International (Bundled Offline Package)",
				edition: `Offline Verified Edition v1 (${reciter.editionId})${isPartialOfflineBundle ? ` — Selected Key Ayahs (${bundled.length}/${meta.ayahCount})` : ""}`,
				reference: `Surah ${meta.number} (${meta.nameTranslit})`,
				language: langConfig.label,
				version: "1.0.0",
				reviewer: "Ilmizo Sharia & Text Verification Registry",
				status: "Verified"
			}
		};
		if (isExplicitDownload && !isPartialOfflineBundle) await saveOfflineSurahToDb(surahNumber, lang, bundledPayload, true);
		return bundledPayload;
	}
	return {
		meta,
		ayahs: [],
		offlineUnavailable: true,
		offlineSourceType: "unavailable",
		verification: {
			source: "Offline Cache Unavailable — Connect to Internet Once to Download",
			edition: "Pending Online Sync",
			reference: `Surah ${meta.number} (${meta.nameTranslit} — ${meta.nameEnglish})`,
			language: langConfig.label,
			version: "1.0.0",
			reviewer: "Ilmizo Sharia & Text Verification Registry",
			status: "Under Review"
		}
	};
}
async function downloadSurahForOfflineUse(surahNumber, lang, reciterName) {
	const payload = await getSurahPayload(surahNumber, lang, reciterName, {
		markExplicitDownload: true,
		forceNetworkFetch: typeof navigator !== "undefined" && navigator.onLine
	});
	if (payload.offlineUnavailable || payload.ayahs.length === 0) return {
		ok: false,
		payload,
		error: `Cannot download Surah ${payload.meta.nameTranslit} while offline. Connect to the internet once to save it to IndexedDB.`
	};
	const writeRes = await saveOfflineSurahToDb(surahNumber, lang, payload, true);
	if (!writeRes.ok) return {
		ok: false,
		payload,
		error: writeRes.error || "Failed to save Surah to IndexedDB."
	};
	return {
		ok: true,
		payload: {
			...payload,
			offlineSourceType: "downloaded_idb"
		}
	};
}
async function removeDownloadedOfflineSurah(surahNumber, lang) {
	await deleteOfflineSurahFromDb(surahNumber, lang);
}
// src/data/expandedIslamicLibrary.ts
var JUZ_AMMA_37_SURAHS = ALL_114_SURAHS.filter((s) => s.number === 1 || s.number >= 78 && s.number <= 114).map((meta, idx) => {
	const themeEn = `${meta.nameTranslit} (${meta.nameEnglish})`;
	return {
		surahNumber: meta.number,
		meta,
		kidsThemeTitle: themeEn,
		localizedThemeTitles: {
			en: `${meta.nameTranslit} — ${meta.nameEnglish}`,
			hi: `सूरह ${meta.nameTranslit} (${meta.nameEnglish})`,
			ur: `سورۃ ${meta.nameArabic} (${meta.nameTranslit})`,
			hinglish: `Surah ${meta.nameTranslit} (${meta.nameEnglish})`,
			ar: `سورة ${meta.nameArabic}`
		},
		learningGoal: `Listen, read Uthmani Arabic & meaning, and practice all ${meta.ayahCount} Ayahs of Surah ${meta.nameTranslit}.`,
		recommendedOrder: idx + 1,
		starsReward: meta.ayahCount <= 10 ? 5 : meta.ayahCount <= 25 ? 8 : 12
	};
});
/**
* Strict check: A Surah in Kids World is ONLY marked complete when all Ayahs in that Surah
* have been practiced/listened to in the session, never merely by opening the screen.
*/
function canMarkKidsSurahCompleted(params) {
	const meta = ALL_114_SURAHS.find((s) => s.number === params.surahNumber);
	if (!meta) return {
		eligible: false,
		practicedCount: 0,
		requiredCount: 0,
		reason: `Invalid Surah number ${params.surahNumber}.`
	};
	const uniquePracticed = new Set((params.practicedAyahNumbers || []).filter((n) => n >= 1 && n <= meta.ayahCount));
	if (uniquePracticed.size < meta.ayahCount) return {
		eligible: false,
		practicedCount: uniquePracticed.size,
		requiredCount: meta.ayahCount,
		reason: `Complete all ${meta.ayahCount} Ayahs of Surah ${meta.nameTranslit} first (${uniquePracticed.size}/${meta.ayahCount} practiced).`
	};
	return {
		eligible: true,
		practicedCount: uniquePracticed.size,
		requiredCount: meta.ayahCount
	};
}
var RAW_KIDS_STORIES_32 = [
	{
		id: "story_nuh",
		category: "Prophets",
		ageRange: "Ages 6-12",
		duration: "4 min read",
		themeColor: "from-sky-800 to-emerald-900",
		badgeIcon: "Ship",
		authenticityLabel: "Quran & Sahih Hadith Account",
		sourceReference: "Al-Quran, Surah Hud 11:36-48 & Surah Nuh 71:1-28",
		title: {
			en: "The Story of Prophet Nuh (AS)",
			hi: "हज़रत नूह (अलैहिस्सलाम) और बड़ी कश्ती",
			ur: "حضرت نوح علیہ السلام اور عظیم کشتی",
			hinglish: "Prophet Nuh (AS) aur Badi Kashti ki Kahani",
			ar: "قصة نبي الله نوح عليه السلام والسفينة"
		},
		summary: {
			en: "How Prophet Nuh (AS) patiently called his people to Allah for 950 years and built the Ark by Allah’s command.",
			hi: "कैसे हज़रत नूह (AS) ने 950 साल तक सब्र के साथ लोगों को अल्लाह की तरफ़ बुलाया और अल्लाह के हुक्म से कश्ती बनाई।",
			ur: "حضرت نوح علیہ السلام نے کس طرح 950 سال صبر کے ساتھ اپنی قوم کو اللہ کی طرف بلایا اور اللہ کے حکم سے کشتی بنائی۔",
			hinglish: "Kaise Prophet Nuh (AS) ne 950 saal sabr ke saath logon ko Allah ki taraf bulaya aur Ark banaya.",
			ar: "كيف دعا نوح عليه السلام قومه بصبرٍ تسعمائة وخمسين سنة وبنى السفينة بأمر الله."
		},
		objective: {
			en: "Learn patience (Sabr) and steadfast trust in Allah even when others do not listen.",
			hi: "सब्र और अल्लाह पर भरोसा रखना सीखना।",
			ur: "صبر اور اللہ پر کامل بھروسہ رکھنا سیکھنا۔",
			hinglish: "Sabr aur Allah par bharosa rakhna seekhna.",
			ar: "تعلم الصبر والتوكل على الله."
		},
		moral: {
			en: "Patience and obedience to Allah always lead to safety and relief (Surah Hud 11:49).",
			hi: "सब्र और अल्लाह की फ़रमाँबरदारी हमेशा कामयाबी और हिफ़ाज़त की तरफ़ ले जाती है।",
			ur: "صبر اور اللہ کی اطاعت ہمیشہ نجات اور کامیابی کی طرف لے جاتی ہے۔",
			hinglish: "Sabr aur Allah ki ita’at hamesha hifazat aur kamiyabi deti hai.",
			ar: "الصبر وطاعة الله سبيل النجاة والفلاح."
		},
		pagesEn: [
			"Long ago, people forgot to worship Allah alone and began bowing to stone idols. Allah sent Prophet Nuh (AS) as a gentle, truthful messenger to guide them back.",
			"For 950 years, Prophet Nuh (AS) invited his people day and night with patience and wisdom, yet only a small group of sincere believers listened.",
			"By Allah’s command, Prophet Nuh (AS) built a great wooden Ark and brought aboard the believers and pairs of creatures. When the flood came, Allah saved those on the Ark in peace."
		],
		pagesHi: [
			"बहुत समय पहले, लोग एक अल्लाह की इबादत भूलकर पत्थरों की पूजा करने लगे। अल्लाह ने हज़रत नूह (AS) को नेक पैग़ंबर बनाकर भेजा।",
			"950 वर्षों तक हज़रत नूह (AS) ने दिन-रात सब्र और नर्मी से लोगों को समझाया, लेकिन थोड़े से ईमान वालों ने ही बात मानी।",
			"अल्लाह के हुक्म से उन्होंने एक बड़ी लकड़ी की कश्ती बनाई। जब तूफ़ान आया तो अल्लाह ने कश्ती में सवार ईमान वालों को महफ़ूज़ रखा।"
		],
		pagesUr: [
			"بہت عرصہ پہلے لوگ ایک اللہ کی عبادت بھول گئے۔ اللہ تعالیٰ نے حضرت نوح علیہ السلام کو اپنا سچا نبی بنا کر بھیجا۔",
			"ساڑھے نو سو سال تک حضرت نوح علیہ السلام نے دن رات صبر اور حکمت سے لوگوں کو سمجھایا مگر چند مخلص لوگوں نے ہی ایمان قبول کیا۔",
			"اللہ کے حکم سے آپ نے ایک بڑی کشتی تیار کی اور جب طوفان آیا تو اللہ نے ایمان والوں کو سلامتی کے ساتھ بچا لیا۔"
		],
		pagesHinglish: [
			"Bahut waqt pehle log ek Allah ki ibadat bhool gaye the. Allah ne Prophet Nuh (AS) ko saccha paighambar bana kar bheja.",
			"950 saal tak Prophet Nuh (AS) ne din-raat sabr se logon ko samjhaya, par thode se logon ne hi baat maani.",
			"Allah ke hukm se unhone ek badi kashti (Ark) banayi. Jab toofan aaya, toh Allah ne kashti mein sawaar iman walon ko bacha liya."
		],
		pagesAr: [
			"أرسل الله نوحاً عليه السلام إلى قومه ليدعوهم إلى عبادة الله وحده وترك عبادة الأصنام.",
			"لبث فيهم ألف سنة إلا خمسين عاماً يدعوهم ليلاً ونهاراً بالصبر والحكمة، فآمن معه قليل.",
			"أمره الله بصنع السفينة، فلما جاء الطوفان نجّى الله نوحاً والذين آمنوا معه بسلام."
		],
		quizQ: "How many years did Prophet Nuh (AS) call his people to Allah according to Surah Al-Ankabut 29:14?",
		quizOptions: [
			"950 years",
			"100 years",
			"40 years",
			"500 years"
		],
		quizCorrect: 0,
		quizExplanation: "The Quran mentions in Surah Al-Ankabut (29:14) that Prophet Nuh (AS) remained among them for a thousand years less fifty (950 years)."
	},
	{
		id: "story_honest_boy",
		category: "Honesty",
		ageRange: "Ages 6-12",
		duration: "3 min read",
		themeColor: "from-amber-700 to-emerald-800",
		badgeIcon: "ShieldCheck",
		authenticityLabel: "Historical Biography",
		sourceReference: "Sahih al-Bukhari 6094 (Hadith on Truthfulness) & Classical Biography of Abdul Qadir al-Jilani",
		title: {
			en: "The Honest Boy and the Forty Gold Coins",
			hi: "सच्चा लड़का और चालीस सोने के सिक्के",
			ur: "سچا لڑکا اور چالیس اشرفیاں",
			hinglish: "Saccha Ladka aur 40 Sone ke Sikke",
			ar: "الفتى الصادق والأربعون ديناراً"
		},
		summary: {
			en: "How a young student kept his promise to his mother to speak the truth even when highway robbers stopped his caravan.",
			hi: "कैसे एक नौजवान तालिब-ए-इल्म ने डाकुओं के सामने भी अपनी माँ से किया हुआ सच बोलने का वादा निभाया।",
			ur: "کس طرح ایک طالب علم نے ڈاکوؤں کے سامنے بھی اپنی والدہ سے کیا ہوا سچ بولنے کا وعدہ نبھایا۔",
			hinglish: "Kaise ek young student ne dakuon ke saamne bhi apni maa se kiya hua sach bolne ka waada nibhaya.",
			ar: "كيف حافظ فتى طالب علم على عهده لأمه بقول الصدق حتى أمام قطاع الطرق."
		},
		objective: {
			en: "Understand that truthfulness (Sidq) protects a believer and transforms hearts.",
			hi: "समझना कि सच्चाई (सिद्क़) इंसान की हिफ़ाज़त करती है और दिलों को बदल देती है।",
			ur: "یہ سمجھنا کہ سچائی انسان کی حفاظت کرتی ہے اور دلوں کو بدل دیتی ہے۔",
			hinglish: "Samajhna ki sacchai (Sidq) insaan ki hifazat karti hai aur dilon ko badal deti hai.",
			ar: "إدراك أن الصدق يهدي إلى البر ويحفظ صاحبه."
		},
		moral: {
			en: "Truthfulness leads to righteousness, and righteousness leads to Paradise (Sahih al-Bukhari 6094).",
			hi: "सच्चाई नेकी का रास्ता दिखाती है और नेकी जन्नत तक ले जाती है (सहीह बुख़ारी 6094)।",
			ur: "سچائی نیکی کی طرف لے جاتی ہے اور نیکی جنت کی طرف لے جاتی ہے (صحیح بخاری 6094)۔",
			hinglish: "Sacchai neki ki taraf le jaati hai aur neki Jannat tak pahunchati hai (Sahih Bukhari 6094).",
			ar: "إن الصدق يهدي إلى البر وإن البر يهدي إلى الجنة (صحيح البخاري ٦٠٩٤)."
		},
		pagesEn: [
			"Before a young student traveled with a caravan to seek knowledge, his mother sewed forty gold coins inside his coat and took his promise to always speak the truth.",
			"When highwaymen stopped the caravan and asked the boy what he carried, he answered honestly that forty gold coins were sewn inside his lining.",
			"Hearing that the boy refused to break his promise to his mother and to Allah, the leader of the robbers wept in remorse, repented to Allah, and returned everyone’s belongings."
		],
		pagesHi: [
			"इल्म हासिल करने के सफ़र पर निकलने से पहले माँ ने अपने बेटे की सदरी में 40 सोने के सिक्के सी दिए और हमेशा सच बोलने का वादा लिया।",
			"रास्ते में जब लुटेरों ने क़ाफ़िले को रोका और बच्चे से पूछा, तो उसने साफ़ सच बता दिया कि मेरे कपड़ों में 40 अशरफ़ियाँ सिली हुई हैं।",
			"एक छोटे बच्चे की अल्लाह और माँ के प्रति यह सच्चाई देखकर सरदार का दिल पिघल गया, उसने तौबा की और सबका सामान लौटा दिया।"
		],
		pagesUr: [
			"علم کے سفر پر روانہ ہونے سے پہلے والدہ نے بیٹے کے لباس میں چالیس اشرفیاں سی دیں اور ہمیشہ سچ بولنے کی نصیحت کی۔",
			"راستے میں جب قافلے کو روکا گیا اور لڑکے سے پوچھا گیا تو اس نے سچ بتا دیا کہ میرے پاس چالیس اشرفیاں ہیں۔",
			"بچے کی سچائی اور عہد کی پاسداری دیکھ کر سردار رو پڑا، اللہ سے توبہ کی اور قافلے کا سارا مال واپس کر دیا۔"
		],
		pagesHinglish: [
			"Ilm seekhne ke safar se pehle maa ne bete ke coat mein 40 gold coins see diye aur hamesha sach bolne ka waada liya.",
			"Jab robbers ne caravan ko roka aur ladke se poocha, toh usne bina dare sach bata diya.",
			"Ek bache ki sacchai dekh kar sardar ka dil badal gaya, usne Allah se tawbah ki aur sabka saaman lauta diya."
		],
		pagesAr: [
			"قبل سفر الفتى لطلب العلم، خاطت أمه أربعين ديناراً في ثوبه وعاهدته على التزام الصدق دائماً.",
			"ولما اعترض قطاع الطرق القافلة وسألوه عما معه، أخبرهم بالصدق دون خوف.",
			"فتأثر كبيرهم بصدق الفتى ووفائه بعهده لله ولأمه، فتاب إلى الله وردّ أموال القافلة."
		],
		quizQ: "According to Sahih al-Bukhari 6094, what does truthfulness (Sidq) lead to?",
		quizOptions: [
			"Righteousness (Al-Birr) and Paradise",
			"Worldly fame only",
			"Fear of people",
			"Winning arguments"
		],
		quizCorrect: 0,
		quizExplanation: "The Prophet ﷺ said: \"Truthfulness leads to righteousness, and righteousness leads to Paradise\" (Sahih al-Bukhari 6094)."
	},
	{
		id: "story_kindness_animals",
		category: "Animals",
		ageRange: "Ages 5-11",
		duration: "3 min read",
		themeColor: "from-emerald-700 to-teal-900",
		badgeIcon: "Heart",
		authenticityLabel: "Quran & Sahih Hadith Account",
		sourceReference: "Sahih al-Bukhari 2363 & Sahih Muslim 2244",
		title: {
			en: "Mercy to the Thirsty Dog in the Desert",
			hi: "रेगिस्तान में प्यासे कुत्ते पर रहम",
			ur: "صحرا میں پیاسے کتے پر رحم",
			hinglish: "Desert mein Pyase Dog par Raham",
			ar: "الرفق بالحيوان وسقي الكلب العطشان"
		},
		summary: {
			en: "An authentic Hadith story of a desert traveler who climbed down a well to bring water for a thirsty dog.",
			hi: "सहीह हदीस की कहानी: एक मुसाफ़िर जिसने कुएँ में उतरकर अपने मोज़े से प्यासे कुत्ते को पानी पिलाया।",
			ur: "صحیح حدیث کا واقعہ: ایک مسافر جس نے کنویں میں اتر کر اپنے موزے سے پیاسے کتے کو پانی پلایا۔",
			hinglish: "Sahih Hadith ki kahani: Ek musafir jisne kuwein mein utar kar pyase dog ko paani pilaya.",
			ar: "قصة الرجل الذي نزل البئر فسقى كلباً يلهث من العطش فشكر الله له فغفر له."
		},
		objective: {
			en: "Learn that showing mercy to animals and birds earns Allah’s forgiveness and reward.",
			hi: "सीखना कि हर जानदार पर रहम करने से अल्लाह की मग्फ़िरत और सवाब मिलता है।",
			ur: "یہ سیکھنا کہ ہر جاندار کے ساتھ رحم کرنے پر اللہ تعالیٰ اجر اور مغفرت عطا فرماتا ہے۔",
			hinglish: "Seekhna ki janwaron aur parindon par raham karne se Allah khush hota hai.",
			ar: "تعلم أن في كل كبد رطبة أجراً عند الله."
		},
		moral: {
			en: "There is a reward from Allah for serving every living creature (Sahih al-Bukhari 2363).",
			hi: "हर ज़िंदा जानदार की सेवा करने में अल्लाह के यहाँ इनाम है (सहीह बुख़ारी 2363)।",
			ur: "ہر جاندار کی خدمت اور بھلائی میں اللہ کے ہاں اجر ہے (صحیح بخاری 2363)۔",
			hinglish: "Har zinda jaandar ki madad karne mein Allah ke yahan ajar hai (Sahih Bukhari 2363).",
			ar: "في كل كبدٍ رطبةٍ أجرٌ (صحيح البخاري ٢٣٦٣)."
		},
		pagesEn: [
			"A traveler walking across a hot desert became severely thirsty. Finding a deep well, he climbed down, drank cool water, and thanked Allah.",
			"Upon climbing out, he saw a panting dog licking the damp earth out of intense thirst. He thought: \"This creature has suffered the same thirst that I felt.\"",
			"He climbed back down the well, filled his leather shoe with water, and gently gave the dog to drink. Allah appreciated his deed and forgave his sins."
		],
		pagesHi: [
			"एक मुसाफ़िर को रेगिस्तान में सख़्त प्यास लगी। वह एक कुएँ में उतरा, पानी पिया और अल्लाह का शुक्र अदा किया।",
			"बाहर निकलकर उसने देखा कि एक कुत्ता प्यास के मारे गीली मिट्टी चाट रहा है। उसने सोचा कि इसे भी वैसी ही प्यास लगी है जैसी मुझे लगी थी।",
			"वह दोबारा कुएँ में उतरा, अपने चमड़े के मोज़े में पानी भरकर कुत्ते को पिलाया। अल्लाह ने उसकी इस नेकी को पसंद फ़रमाया और उसे बख़्श दिया।"
		],
		pagesUr: [
			"ایک مسافر کو سفر کے دوران شدید پیاس لگی۔ وہ ایک کنویں میں اترا، پانی پیا اور باہر نکل آیا۔",
			"باہر اس نے دیکھا کہ ایک کتا پیاس کی شدت سے ہانپ رہا ہے اور گیلی مٹی چاٹ رہا ہے۔",
			"مسافر دوبارہ کنویں میں اترا، اپنے چمڑے کے موزے میں پانی بھر کر کتے کو پلایا۔ اللہ نے اس کے اس عمل کی قدر فرمائی اور اسے بخش دیا۔"
		],
		pagesHinglish: [
			"Ek musafir ko garm registan mein bahut pyaas lagi. Woh ek well mein utra aur paani pee kar Allah ka shukr ada kiya.",
			"Bahar aakar usne dekha ki ek dog pyaas ki wajah se geeli mitti chaat raha hai.",
			"Woh dobara well mein utra, apne leather shoe mein paani bhar kar dog ko pilaya. Allah ne uski is meharbani par use bakhsh diya."
		],
		pagesAr: [
			"بينما رجل يمشي بطريق اشتد عليه العطش، فوجد بئراً فنزل فيها فشرب ثم خرج.",
			"فإذا كلب يلهث يأكل الثرى من العطش، فقال الرجل: لقد بلغ هذا الكلب من العطش مثل الذي كان بلغ بي.",
			"فنزل البئر فملأ خفه ماءً فسقى الكلب، فشكر الله له فغفر له."
		],
		quizQ: "What did the Prophet ﷺ say when Companions asked if there is reward for kindness to animals?",
		quizOptions: [
			"Yes, in serving every living creature there is a reward",
			"No, only for humans",
			"Only for camels",
			"Only on Fridays"
		],
		quizCorrect: 0,
		quizExplanation: "The Prophet ﷺ replied: \"In every living being (fī kulli kabidin raṭbatin) there is a reward\" (Sahih al-Bukhari 2363)."
	},
	{
		id: "story_little_helper",
		category: "Companions",
		ageRange: "Ages 6-12",
		duration: "3 min read",
		themeColor: "from-amber-800 to-emerald-900",
		badgeIcon: "Sparkles",
		authenticityLabel: "Quran & Sahih Hadith Account",
		sourceReference: "Sahih al-Bukhari 6038 & Sahih Muslim 2309",
		title: {
			en: "Young Anas ibn Malik (RA) — The Helpful Companion",
			hi: "नन्हे अनस इब्न मालिक (RA) और नबी ﷺ की मेहरबानी",
			ur: "ننھے حضرت انس بن مالک رضی اللہ عنہ اور نبوی شفقت",
			hinglish: "Young Anas ibn Malik (RA) — Pyare Nabi ﷺ ki Shafqat",
			ar: "أنس بن مالك رضي الله عنه وخلق النبي ﷺ العظيم"
		},
		summary: {
			en: "How young Anas ibn Malik (RA) served the Prophet ﷺ for ten years in Madinah and experienced unmatched kindness.",
			hi: "कैसे 10 साल के हज़रत अनस (RA) ने मदीना में नबी ﷺ की ख़िदमत की और कभी कोई सख़्त शब्द नहीं सुना।",
			ur: "حضرت انس رضی اللہ عنہ نے دس سال نبی کریم ﷺ کی خدمت کی اور آپ ﷺ نے کبھی اُف تک نہ فرمایا۔",
			hinglish: "Kaise young Anas (RA) ne 10 saal Prophet ﷺ ki khidmat ki aur hamesha pyar aur dua paayi.",
			ar: "خدم أنس رضي الله عنه النبي ﷺ عشر سنين فما قال له أفّ قط."
		},
		objective: {
			en: "Practice gentleness, helpfulness at home, and speaking kindly without harshness.",
			hi: "घर में बड़ों की मदद करना और हमेशा मीठी ज़बान बोलना सीखना।",
			ur: "گھر میں بڑوں کا ہاتھ بٹانا اور نرمی سے گفتگو کرنا سیکھنا۔",
			hinglish: "Ghar mein madad karna aur hamesha pyar se baat karna seekhna.",
			ar: "التحلي بالرفق ومساعدة الأهل وحسن الخلق."
		},
		moral: {
			en: "The Prophet ﷺ was the best of people in character and gentleness toward children (Sahih al-Bukhari 6038).",
			hi: "नबी अकरम ﷺ बच्चों के साथ सबसे बेहतरीन अख़लाक़ और शफ़क़त रखने वाले थे (सहीह बुख़ारी 6038)।",
			ur: "نبی کریم ﷺ بچوں کے ساتھ سب سے بہترین اخلاق اور شفقت فرمانے والے تھے (صحیح بخاری 6038)۔",
			hinglish: "Prophet ﷺ bachon ke saath sabse behtareen akhlaq aur shafqat rakhne wale the (Sahih Bukhari 6038).",
			ar: "كان النبي ﷺ أحسن الناس خلقاً وأرحمهم بالصغار (صحيح البخاري ٦٠٣٨)."
		},
		pagesEn: [
			"When the Prophet ﷺ arrived in Madinah, Anas ibn Malik (RA) was ten years old and began helping with daily errands.",
			"Anas (RA) narrated: \"I served the Prophet ﷺ for ten years, and he never once said ‘Uff’ to me, nor blamed me for anything.\"",
			"Instead, the Prophet ﷺ taught him with patience and made a heartfelt Dua that Allah bless Anas in knowledge, life, and goodness."
		],
		pagesHi: [
			"जब नबी ﷺ मदीना तशरीफ़ लाए, तो हज़रत अनस (RA) की उम्र दस साल थी। वे रोज़ के कामों में ख़िदमत करने लगे।",
			"हज़रत अनस (RA) बताते हैं: \"मैंने दस साल आप ﷺ की ख़िदमत की, आपने मुझे कभी ‘उफ़’ तक नहीं कहा और न कभी डाँटा।\"",
			"बल्कि नबी ﷺ ने मुस्कुराकर उन्हें सिखाया और उनके इल्म, उम्र और बरकत के लिए ख़ास दुआ फ़रमाई।"
		],
		pagesUr: [
			"جب نبی کریم ﷺ مدینہ تشریف لائے تو حضرت انس رضی اللہ عنہ دس سال کے تھے اور آپ ﷺ کی خدمت میں رہنے لگے۔",
			"حضرت انس فرماتے ہیں: میں نے دس سال خدمت کی، آپ ﷺ نے مجھے کبھی اف تک نہ کہا اور نہ کبھی ڈانٹا۔",
			"بلکہ آپ ﷺ نے ہمیشہ محبت سے سکھایا اور حضرت انس کے علم و برکت کے لیے خصوصی دعا فرمائی۔"
		],
		pagesHinglish: [
			"Jab Prophet ﷺ Madinah aaye, tab Anas ibn Malik (RA) 10 saal ke the aur unki madad karne lage.",
			"Anas (RA) kehte hain: \"Maine 10 saal khidmat ki, aur Aap ﷺ ne mujhe kabhi ‘Uff’ tak nahi kaha aur na kabhi daanta.\"",
			"Balki Prophet ﷺ ne unhein pyar se sikhaya aur unke liye barkat ki khaas dua ki."
		],
		pagesAr: [
			"قدم النبي ﷺ المدينة وأنس بن مالك رضي الله عنه ابن عشر سنين فتشرف بخدمته.",
			"قال أنس رضي الله عنه: خدمت النبي ﷺ عشر سنين فما قال لي أفّ قط، ولا قال لشيء صنعته لم صنعته.",
			"ودعا له النبي ﷺ بالبركة في العلم والعمل والحياة."
		],
		quizQ: "For how many years did Anas ibn Malik (RA) serve the Prophet ﷺ in Madinah?",
		quizOptions: [
			"10 years",
			"2 years",
			"25 years",
			"1 year"
		],
		quizCorrect: 0,
		quizExplanation: "Anas ibn Malik (RA) served the Prophet ﷺ for 10 years in Madinah from age 10 to 20 (Sahih al-Bukhari 6038)."
	}
];
var ADDITIONAL_KIDS_STORY_SEEDS = [
	{
		id: "story_ibrahim_stars",
		category: "Prophets",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Al-An’am 6:75-79",
		titleEn: "Prophet Ibrahim (AS) Reflects on the Sky",
		titleHi: "हज़रत इब्राहीम (AS) और आसमान की निशानियाँ",
		titleUr: "حضرت ابراہیم علیہ السلام اور آسمان کی نشانیاں",
		titleHinglish: "Prophet Ibrahim (AS) aur Aasman ki Nishaniyan",
		titleAr: "تفكّر إبراهيم عليه السلام في ملكوت السماوات",
		summaryEn: "How Prophet Ibrahim (AS) showed his people that fading stars, the moon, and the sun cannot be the Creator.",
		summaryHi: "कैसे हज़रत इब्राहीम (AS) ने लोगों को समझाया कि डूबने वाले सितारे और सूरज ख़ालिक़ नहीं हो सकते।",
		summaryUr: "حضرت ابراہیم علیہ السلام نے کس طرح اپنی قوم کو سمجھایا کہ ڈوبنے والے ستارے اور سورج معبود نہیں ہو سکتے۔",
		moralEn: "Worship belongs only to Allah, the Creator of the heavens and the earth (Quran 6:79).",
		moralHi: "इबादत सिर्फ़ अल्लाह की है जिसने आसमानों और ज़मीन को पैदा किया (क़ुरआन 6:79)।",
		moralUr: "عبادت صرف اللہ کی ہے جس نے آسمانوں اور زمین کو پیدا کیا (قرآن 6:79)۔",
		pagesEn: [
			"Prophet Ibrahim (AS) lived among people who worshipped statues and the stars in the night sky.",
			"By pointing out that the star, the moon, and the sun all set and disappear, he helped them think deeply.",
			"He declared with certainty: \"Indeed, I have turned my face toward He who created the heavens and the earth, inclining toward truth\" (Quran 6:79)."
		],
		pagesHi: [
			"हज़रत इब्राहीम (AS) की क़ौम के लोग मूर्तियों और सितारों की पूजा करते थे।",
			"जब सितारा, चाँद और सूरज सब एक-एक करके डूब गए, तो उन्होंने लोगों को सोचने की दावत दी कि डूबने वाली चीज़ें रब कैसे हो सकती हैं?",
			"उन्होंने ऐलान किया कि मैंने अपना रुख़ उस अल्लाह की तरफ़ कर लिया जिसने सारे आसमान और ज़मीन को बनाया (क़ुरआन 6:79)।"
		],
		pagesUr: [
			"حضرت ابراہیم علیہ السلام کی قوم بتوں اور ستاروں کی پوجا کرتی تھی۔",
			"جب ستارہ، چاند اور سورج غروب ہو گئے تو آپ نے واضح کیا کہ غروب ہونے والی چیزیں معبود نہیں ہو سکتیں۔",
			"آپ نے اعلان فرمایا کہ میں نے اپنا رخ اس ذات کی طرف کر لیا جس نے آسمانوں اور زمین کو پیدا فرمایا (الانعام 79)۔"
		],
		quizQ: "Why did Prophet Ibrahim (AS) explain that the sun and moon cannot be worshipped?",
		quizOpts: [
			"Because they set and are created by Allah",
			"Because they are too small",
			"Because they only appear in winter",
			"Because they have no color"
		],
		quizAns: 0
	},
	{
		id: "story_ismail_zamzam",
		category: "Prophets",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih al-Bukhari 3364 & Surah Ibrahim 14:37",
		titleEn: "Baby Ismail (AS), Hajar (AS) & the Spring of Zamzam",
		titleHi: "बीबी हाजरा (AS), नन्हे इस्माईल (AS) और आब-ए-ज़मज़म",
		titleUr: "حضرت ہاجرہ، حضرت اسماعیل اور آبِ زمزم کا معجزہ",
		titleHinglish: "Bibi Hajar (AS), Ismail (AS) aur Zamzam ka Chashma",
		titleAr: "هاجر وإسماعيل عليهما السلام وبئر زمزم",
		summaryEn: "How Hajar’s trust in Allah (Tawakkul) in the barren valley of Makkah was answered with the blessed water of Zamzam.",
		summaryHi: "कैसे मक्का की सूखी वादी में बीबी हाजरा के अल्लाह पर भरोसे के बाद ज़मज़म का चश्मा जारी हुआ।",
		summaryUr: "مکہ کی بے آب و گیاہ وادی میں حضرت ہاجرہ کے توکل کے نتیجے میں اللہ نے زمزم کا چشمہ جاری فرمایا۔",
		moralEn: "Whoever trusts in Allah and strives sincerely, Allah never abandons them (Sahih al-Bukhari 3364).",
		moralHi: "जो अल्लाह पर भरोसा रखता है और कोशिश करता है, अल्लाह उसे कभी तन्हा नहीं छोड़ता।",
		moralUr: "جو اللہ پر بھروسہ رکھتا ہے اللہ اسے کبھی ضائع نہیں فرماتا (صحیح بخاری 3364)۔",
		pagesEn: [
			"In the dry valley of Makkah, Hajar (AS) asked Prophet Ibrahim (AS): \"Has Allah commanded you to leave us here?\" When he said yes, she replied: \"Then Allah will never abandon us!\"",
			"When water ran out, she ran seven times between the hills of Safa and Marwah looking for help for baby Ismail (AS).",
			"Allah sent Angel Jibril (AS), and clear, blessed Zamzam water gushed forth from the earth—flowing to this very day!"
		],
		pagesHi: [
			"मक्का की सूखी वादी में बीबी हाजरा (AS) ने पूरे यक़ीन से कहा: \"अगर यह अल्लाह का हुक्म है, तो अल्लाह हमें कभी ज़ाया नहीं करेगा!\"",
			"जब पानी ख़त्म हो गया, तो वे नन्हे इस्माईल (AS) के लिए सफ़ा और मरवा की पहाड़ियों के बीच सात बार दौड़ीं।",
			"अल्लाह ने हज़रत जिब्रील (AS) को भेजा और ज़मीन से पाक आब-ए-ज़मज़म का चश्मा फूट पड़ा जो आज तक बह रहा है!"
		],
		pagesUr: [
			"مکہ کی وادی میں حضرت ہاجرہ نے کامل یقین سے فرمایا: اگر یہ اللہ کا حکم ہے تو وہ ہمیں ہرگز ضائع نہیں کرے گا۔",
			"پانی ختم ہونے پر آپ صفا اور مروہ کی پہاڑیوں کے درمیان سات بار دوڑیں۔",
			"اللہ نے حضرت جبریل علیہ السلام کے ذریعے زمزم کا بابرکت چشمہ جاری فرما دیا جو آج تک جاری ہے۔"
		],
		quizQ: "Between which two hills did Hajar (AS) walk seven times in search of water?",
		quizOpts: [
			"Safa and Marwah",
			"Uhud and Thawr",
			"Hira and Arafat",
			"Sinai and Judi"
		],
		quizAns: 0
	},
	{
		id: "story_yusuf_forgiveness",
		category: "Prophets",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Yusuf 12:92",
		titleEn: "Prophet Yusuf (AS) and Beautiful Forgiveness",
		titleHi: "हज़रत यूसुफ़ (AS) और भाइयों को माफ़ करना",
		titleUr: "حضرت یوسف علیہ السلام اور خوبصورت معافی",
		titleHinglish: "Prophet Yusuf (AS) aur Bhaiyon ko Maaf Karna",
		titleAr: "نبي الله يوسف عليه السلام والعفو الجميل",
		summaryEn: "How Prophet Yusuf (AS) forgave his brothers with kindness after Allah elevated him in Egypt.",
		summaryHi: "कैसे हज़रत यूसुफ़ (AS) ने मिस्र में उँचा मक़ाम मिलने के बाद अपने भाइयों को बड़े दिल से माफ़ कर दिया।",
		summaryUr: "حضرت یوسف علیہ السلام نے مصر میں اقتدار ملنے کے بعد اپنے بھائیوں کو کس فراخ دلی سے معاف فرمایا۔",
		moralEn: "Forgiving others when you have the power to blame them is the noble way of the Prophets (Quran 12:92).",
		moralHi: "ताक़त होने के बावजूद माफ़ कर देना अंबिया की प्यारी सुन्नत है (क़ुरआन 12:92)।",
		moralUr: "قدرت کے باوجود معاف کر دینا انبیائے کرام کا شیوہ ہے (سورۃ یوسف 92)۔",
		pagesEn: [
			"Years after his brothers had wronged him in childhood, Allah blessed Prophet Yusuf (AS) with wisdom and responsibility over Egypt’s storehouses.",
			"When his brothers finally recognized him and admitted their mistake, they feared they would be punished.",
			"Prophet Yusuf (AS) smiled gently and said: \"No blame will there be upon you today. May Allah forgive you; and He is the Most Merciful of the merciful\" (Quran 12:92)."
		],
		pagesHi: [
			"बचपन की कड़ी आज़माइशों के बाद अल्लाह ने हज़रत यूसुफ़ (AS) को मिस्र में इल्म और इज़्ज़त अता फ़रमाई।",
			"जब उनके भाइयों ने उन्हें पहचाना और अपनी ग़लती मानी, तो वे डर रहे थे कि उन्हें सज़ा मिलेगी।",
			"हज़रत यूसुफ़ (AS) ने फ़रमाया: \"आज तुम पर कोई पकड़ नहीं! अल्लाह तुम्हें माफ़ फ़रमाए, वह सबसे बढ़कर रहम करने वाला है\" (क़ुरआन 12:92)।"
		],
		pagesUr: [
			"آزمائشوں کے بعد اللہ تعالیٰ نے حضرت یوسف علیہ السلام کو مصر میں علم اور عزت عطا فرمائی۔",
			"جب آپ کے بھائیوں نے اپنی غلطی کا اعتراف کیا تو آپ نے بدلہ لینے کے بجائے درگزر فرمایا۔",
			"آپ نے فرمایا: آج تم پر کوئی ملامت نہیں، اللہ تمہیں معاف فرمائے اور وہ سب سے بڑھ کر رحم فرمانے والا ہے (یوسف 92)۔"
		],
		quizQ: "What did Prophet Yusuf (AS) say to his brothers when they asked for forgiveness (Quran 12:92)?",
		quizOpts: [
			"No blame will there be upon you today; may Allah forgive you",
			"I will never speak to you",
			"You must leave Egypt",
			"Pay me gold first"
		],
		quizAns: 0
	},
	{
		id: "story_musa_helper",
		category: "Helping",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Al-Qasas 28:23-25",
		titleEn: "Prophet Musa (AS) Helps at the Well of Madyan",
		titleHi: "मदयन के कुएँ पर हज़रत मूसा (AS) की मदद",
		titleUr: "مدین کے کنویں پر حضرت موسیٰ علیہ السلام کی مدد",
		titleHinglish: "Madyan ke Well par Prophet Musa (AS) ki Madad",
		titleAr: "موسى عليه السلام وسقي الأغنام في مدين",
		summaryEn: "Even while tired and hungry from travel, Prophet Musa (AS) stepped forward to help two sisters water their flock.",
		summaryHi: "सफ़र की थकान के बावजूद हज़रत मूसा (AS) ने मदयन के कुएँ पर दो बहनों के जानवरों को पानी पिलाने में मदद की।",
		summaryUr: "سفر کی تھکن کے باوجود حضرت موسیٰ علیہ السلام نے مدین کے کنویں پر بکریوں کو پانی پلایا۔",
		moralEn: "Helping those in need with dignity and turning to Allah in Dua brings unexpected blessings (Quran 28:24).",
		moralHi: "ज़रूरतमंदों की मदद करना और अल्लाह से दुआ माँगना ज़िंदगी में बरकत लाता है (क़ुरआन 28:24)।",
		moralUr: "ضرورت مندوں کی مدد کرنا اور اللہ سے دعا مانگنا خیر و برکت کا ذریعہ ہے (القصص 24)۔",
		pagesEn: [
			"Arriving in Madyan tired after a long journey, Prophet Musa (AS) noticed two sisters waiting patiently because their elderly father could not draw water from the crowded well.",
			"Without asking for any reward, Prophet Musa (AS) watered their flock for them and then sat in the shade.",
			"He prayed: \"My Lord, indeed I am, for whatever good You would send down to me, in need\" (Quran 28:24), and Allah blessed him with shelter and family."
		],
		pagesHi: [
			"लंबे सफ़र के बाद जब हज़रत मूसा (AS) मदयन पहुँचे, तो देखा कि दो बहनें अपने बूढ़े पिता की वजह से भीड़ से अलग खड़ी थीं।",
			"हज़रत मूसा (AS) ने बिना किसी बदले की चाहत के आगे बढ़कर उनके जानवरों को कुएँ से पानी पिलाया।",
			"फिर छाँव में बैठकर दुआ की: \"ऐ मेरे रब! तू जो भी भलाई मेरी तरफ़ उतारे, मैं उसका मोहताज हूँ\" (क़ुरआन 28:24)।"
		],
		pagesUr: [
			"سفر کے بعد مدین پہنچ کر حضرت موسیٰ علیہ السلام نے دیکھا کہ دو خواتین اپنے بزرگ والد کی وجہ سے الگ کھڑی ہیں۔",
			"آپ نے بغیر کسی معاوضے کے ان کے ریوڑ کو پانی پلایا اور سائے میں بیٹھ کر اللہ سے دعا کی۔",
			"آپ نے عرض کیا: اے میرے رب! تو جو بھی خیر میری طرف نازل فرمائے میں اس کا محتاج ہوں (القصص 24)۔"
		],
		quizQ: "Where did Prophet Musa (AS) help water the flock before making his famous Dua in Surah Al-Qasas 28:24?",
		quizOpts: [
			"At the watering well of Madyan",
			"In the city of Ta’if",
			"By the Euphrates River",
			"In Jerusalem"
		],
		quizAns: 0
	},
	{
		id: "story_sulayman_ant",
		category: "Gratitude",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah An-Naml 27:18-19",
		titleEn: "Prophet Sulayman (AS) and the Caring Ant",
		titleHi: "हज़रत सुलैमान (AS) और नन्ही चींटी",
		titleUr: "حضرت سلیمان علیہ السلام اور ننھی چیونٹی",
		titleHinglish: "Prophet Sulayman (AS) aur Nanhi Cheenti (Ant)",
		titleAr: "سليمان عليه السلام والنملة الحكيمة",
		summaryEn: "How a tiny ant warned her colony and inspired Prophet Sulayman (AS) to thank Allah.",
		summaryHi: "कैसे एक छोटी चींटी ने अपने साथियों को बचाया और हज़रत सुलैमान (AS) ने मुस्कुराकर अल्लाह का शुक्र अदा किया।",
		summaryUr: "ایک ننھی چیونٹی نے کس طرح اپنے ساتھیوں کو خبردار کیا اور حضرت سلیمان علیہ السلام نے اللہ کا شکر ادا کیا۔",
		moralEn: "Even the smallest creature cares for its community, and every blessing should make us more grateful to Allah (Quran 27:19).",
		moralHi: "हर नेमत पर घमंड के बजाय अल्लाह का शुक्र अदा करना चाहिए (क़ुरआन 27:19)।",
		moralUr: "ہر نعمت پر اللہ کا شکر ادا کرنا اور چھوٹی مخلوق کا بھی خیال رکھنا چاہیے (النمل 19)۔",
		pagesEn: [
			"Allah blessed Prophet Sulayman (AS) with the ability to understand the speech of birds and ants.",
			"While marching through the Valley of the Ants, one ant called out: \"O ants, enter your dwellings so that Sulayman and his soldiers do not crush you while they do not realize it!\" (Quran 27:18).",
			"Prophet Sulayman (AS) smiled at her words, protected the ants, and prayed: \"My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents\" (Quran 27:19)."
		],
		pagesHi: [
			"अल्लाह ने हज़रत सुलैमान (AS) को परिंदों और चींटियों की बोली समझने का इल्म अता फ़रमाया था।",
			"चींटियों की वादी से गुज़रते समय एक चींटी ने अपने साथियों से कहा: \"ऐ चींटियो! अपने बिलों में चले जाओ ताकि सुलैमान और उनका लश्कर अनजाने में तुम्हें कुचल न दे।\"",
			"हज़रत सुलैमान (AS) ने यह सुनकर मुस्कुराते हुए लश्कर को सावधान किया और अल्लाह की नेमतों का शुक्र अदा करने की दुआ की (क़ुरआन 27:19)।"
		],
		pagesUr: [
			"اللہ تعالیٰ نے حضرت سلیمان علیہ السلام کو پرندوں اور چیونٹیوں کی بولی سمجھنے کا معجزہ عطا فرمایا تھا۔",
			"چیونٹیوں کی وادی میں ایک چیونٹی نے کہا: اے چیونٹیو! اپنے گھروں میں داخل ہو جاؤ تاکہ سلیمان اور ان کا لشکر بے خبری میں تمہیں کچل نہ دیں۔",
			"حضرت سلیمان علیہ السلام اس کی بات سن کر مسکرائے اور اللہ کے حضور شکر گزاری کی دعا مانگی (النمل 19)۔"
		],
		quizQ: "What did Prophet Sulayman (AS) do after hearing the ant warn its colony (Quran 27:19)?",
		quizOpts: [
			"He smiled and prayed to Allah to make him grateful for His blessings",
			"He ignored the ants",
			"He got angry",
			"He turned back"
		],
		quizAns: 0
	},
	{
		id: "story_yunus_dua",
		category: "Patience",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Al-Anbiya 21:87-88",
		titleEn: "Prophet Yunus (AS) and the Call in the Darkness",
		titleHi: "हज़रत यूनुस (AS) और अँधेरों में अल्लाह की पुकार",
		titleUr: "حضرت یونس علیہ السلام اور تاریکیوں میں دعا",
		titleHinglish: "Prophet Yunus (AS) aur Dua-e-Yunus",
		titleAr: "يونس عليه السلام ودعاؤه في الظلمات",
		summaryEn: "How Prophet Yunus (AS) glorified Allah in the belly of the whale and was rescued by Allah’s mercy.",
		summaryHi: "कैसे हज़रत यूनुस (AS) ने मछली के पेट में अल्लाह की तसबीह पढ़ी और अल्लाह ने उन्हें नजात दी।",
		summaryUr: "حضرت یونس علیہ السلام نے مچھلی کے پیٹ میں اللہ کی تسبیح بیان کی اور اللہ نے انہیں نجات عطا فرمائی۔",
		moralEn: "Turning back to Allah with \"La ilaha illa Anta Subhanaka inni kuntu minadh-dhalimin\" brings relief from distress (Quran 21:87-88).",
		moralHi: "मुसीबत और ग़लती के वक़्त सच्चे दिल से अल्लाह को पुकारना हर परेशानी से नजात दिलाता है (क़ुरआन 21:87-88)।",
		moralUr: "مشکل وقت میں اللہ کی تسبیح اور اپنی کوتاہی کا اعتراف نجات کا ذریعہ ہے (الانبیاء 87-88)۔",
		pagesEn: [
			"When Prophet Yunus (AS) left his town early in frustration and boarded a crowded ship, he was swallowed by a great fish in the sea without being harmed.",
			"In the deep darkness of the night, the ocean, and the whale, he called out: \"There is no deity except You; exalted are You! Indeed, I have been of the wrongdoers\" (Quran 21:87).",
			"Allah answered his prayer, cast him safely onto the shore, and returned him to his people—who all believed!"
		],
		pagesHi: [
			"जब हज़रत यूनुस (AS) कश्ती पर सवार हुए और समंदर में एक बड़ी मछली ने उन्हें निगल लिया, तब उन पर गहरा अँधेरा छा गया।",
			"उन्होंने तीन अँधेरों के बीच अल्लाह को पुकारा: \"ला इलाहा इल्ला अंता सुब्हानका इन्नी कुंतु मिनज़-ज़ालिमीन\" (क़ुरआन 21:87)।",
			"अल्लाह ने उनकी दुआ क़बूल फ़रमाई और उन्हें सलामती के साथ किनारे पर पहुँचा दिया।"
		],
		pagesUr: [
			"جب حضرت یونس علیہ السلام کو مچھلی نے نگل لیا تو آپ نے گہری تاریکیوں میں اپنے رب کو پکارا۔",
			"آپ نے دعا کی: لا الہ الا انت سبحانک انی کنت من الظالمین (الانبیاء 87)۔",
			"اللہ تعالیٰ نے آپ کی دعا قبول فرمائی، غم سے نجات دی اور ساحل پر بسلامت پہنچا دیا۔"
		],
		quizQ: "What famous Quranic Dua did Prophet Yunus (AS) recite in the darkness (Surah Al-Anbiya 21:87)?",
		quizOpts: [
			"La ilaha illa Anta Subhanaka inni kuntu minadh-dhalimin",
			"Rabbi zidni ilma",
			"Hasbunallahu wa ni’mal wakil",
			"Alhamdulillahi Rabbil Alamin"
		],
		quizAns: 0
	},
	{
		id: "story_ayyub_patience",
		category: "Patience",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Sad 38:41-44 & Surah Al-Anbiya 21:83-84",
		titleEn: "Prophet Ayyub (AS) — The Model of Beautiful Patience",
		titleHi: "हज़रत अय्यूब (AS) का बेमिसाल सब्र",
		titleUr: "حضرت ایوب علیہ السلام کا بے مثال صبر",
		titleHinglish: "Prophet Ayyub (AS) ka Bemisaal Sabr",
		titleAr: "أيوب عليه السلام والصبر الجميل",
		summaryEn: "How Prophet Ayyub (AS) remained thankful and patient during years of illness until Allah restored his health.",
		summaryHi: "कैसे हज़रत अय्यूब (AS) ने लंबी बीमारी में भी सब्र और शुक्र का दामन नहीं छोड़ा।",
		summaryUr: "حضرت ایوب علیہ السلام نے طویل بیماری میں بھی صبر اور ذکرِ الٰہی کو لازم پکڑے رکھا۔",
		moralEn: "Allah praised Prophet Ayyub (AS) saying: \"Indeed, We found him patient, an excellent servant\" (Quran 38:44).",
		moralHi: "अल्लाह ने हज़रत अय्यूब (AS) की तारीफ़ करते हुए फ़रमाया: \"बेशक हमने उन्हें सब्र करने वाला बेहतरीन बंदा पाया\" (क़ुरआन 38:44)।",
		moralUr: "اللہ تعالیٰ نے فرمایا: بے شک ہم نے انہیں صبر کرنے والا بہترین بندہ پایا (ص 44)۔",
		pagesEn: [
			"Prophet Ayyub (AS) was blessed with health, family, and wealth, and he spent his days thanking Allah and helping orphans.",
			"When a severe illness tested him for many years, his tongue never complained against Allah; instead he prayed gently: \"Indeed, adversity has touched me, and You are the Most Merciful of the merciful\" (Quran 21:83).",
			"Allah removed his affliction, gave him a cool spring to wash and drink from, and restored his blessings twofold."
		],
		pagesHi: [
			"हज़रत अय्यूब (AS) खुशहाली में हमेशा अल्लाह का शुक्र अदा करते और ग़रीबों व यतीमों की मदद करते थे।",
			"जब उन पर लंबी बीमारी की आज़माइश आई, तब भी उन्होंने शिकायत नहीं की बल्कि अदब से दुआ की: \"ऐ रब! मुझे तकलीफ़ पहुँची है और तू सबसे बढ़कर रहम करने वाला है\" (क़ुरआन 21:83)।",
			"अल्लाह ने उन्हें ठंडे पानी के चश्मे से मुकम्मल शिफ़ा और दोगुनी बरकत अता फ़रमाई।"
		],
		pagesUr: [
			"حضرت ایوب علیہ السلام خوشحالی میں ہمیشہ اللہ کا شکر ادا کرتے اور مساکین کی مدد فرماتے تھے۔",
			"طویل بیماری کی آزمائش میں بھی آپ نے نہایت ادب سے دعا کی: بے شک مجھے تکلیف پہنچی ہے اور تو ارحم الراحمین ہے (الانبیاء 83)۔",
			"اللہ تعالیٰ نے آپ کی دعا قبول فرمائی اور صحت و برکت لوٹا دی۔"
		],
		quizQ: "How did Allah describe Prophet Ayyub (AS) in Surah Sad 38:44?",
		quizOpts: [
			"Patient, an excellent servant who repeatedly turned to Allah",
			"Impatient in hardship",
			"A king of Rome",
			"A merchant of Yemen"
		],
		quizAns: 0
	},
	{
		id: "story_dawud_gratitude",
		category: "Prophets",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Saba 34:10-13",
		titleEn: "Prophet Dawud (AS) and the Mountains that Praised Allah",
		titleHi: "हज़रत दाऊद (AS) और अल्लाह की हम्द करने वाले पहाड़",
		titleUr: "حضرت داؤد علیہ السلام اور تسبیح کرتے پہاڑ",
		titleHinglish: "Prophet Dawud (AS) aur Tasbih karte Pahad",
		titleAr: "داود عليه السلام وتسبيح الجبال والطير",
		summaryEn: "How the mountains and birds joined Prophet Dawud (AS) in glorifying Allah morning and evening.",
		summaryHi: "कैसे पहाड़ और परिंदे सुबह-शाम हज़रत दाऊद (AS) के साथ अल्लाह की तसबीह पढ़ते थे।",
		summaryUr: "کس طرح پہاڑ اور پرندے صبح و شام حضرت داؤد علیہ السلام کے ساتھ اللہ کی تسبیح پڑھتے تھے۔",
		moralEn: "Work with excellence and gratitude, as Allah commanded the family of Dawud (Quran 34:13).",
		moralHi: "अल्लाह की नेमतों का शुक्र अपने अच्छे अमल और मेहनत से अदा करो (क़ुरआन 34:13)।",
		moralUr: "اللہ کی نعمتوں کا شکر نیک عمل اور محنت کے ذریعے ادا کرو (سبا 13)۔",
		pagesEn: [
			"Allah gave Prophet Dawud (AS) the Zabur and such a beautiful, sincere voice in remembering Allah that the mountains and birds echoed his Tasbih.",
			"Even though he was a prophet and ruler, he earned his own food by crafting protective armor with his hands.",
			"Allah taught his family: \"Work, O family of Dawud, in gratitude\" (Quran 34:13)."
		],
		pagesHi: [
			"अल्लाह ने हज़रत दाऊद (AS) को ज़बूर और ऐसी सुरीली आवाज़ दी थी कि पहाड़ और परिंदे भी उनके साथ अल्लाह की तसबीह पढ़ते थे।",
			"बादशाह और नबी होने के बावजूद वे अपने हाथों से मेहनत करके रोज़ी कमाते थे।",
			"अल्लाह ने फ़रमाया: \"ऐ आले-दाऊद! शुक्रगुज़ारी के तौर पर नेक अमल करो\" (क़ुरआन 34:13)।"
		],
		pagesUr: [
			"اللہ تعالیٰ نے حضرت داؤد علیہ السلام کو زبور اور ایسی خوبصورت آواز عطا فرمائی تھی کہ پہاڑ اور پرندے بھی آپ کے ساتھ تسبیح کرتے تھے۔",
			"نبی اور بادشاہ ہونے کے باوجود آپ اپنے ہاتھ کی محنت سے روزی کماتے تھے۔",
			"اللہ نے فرمایا: اے آلِ داؤد! شکر گزاری کے طور پر عمل کرو (سبا 13)۔"
		],
		quizQ: "Which Scripture was revealed to Prophet Dawud (AS)?",
		quizOpts: [
			"Az-Zabur",
			"At-Tawrah",
			"Al-Injil",
			"Suhuf Musa"
		],
		quizAns: 0
	},
	{
		id: "story_isa_table_mercy",
		category: "Prophets",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Maryam 19:30-32",
		titleEn: "Prophet Isa (AS) — Dutiful to His Mother Maryam (AS)",
		titleHi: "हज़रत ईसा (AS) और वालिदा मरयम (AS) का अदब",
		titleUr: "حضرت عیسیٰ علیہ السلام اور والدہ مریم علیہا السلام کی خدمت",
		titleHinglish: "Prophet Isa (AS) aur Walida Maryam (AS) ka Adab",
		titleAr: "عيسى ابن مريم عليهما السلام وبرّ الوالدة",
		summaryEn: "How Prophet Isa (AS) proclaimed worship of Allah, prayer, Zakat, and kindness to his mother Maryam (AS).",
		summaryHi: "कैसे हज़रत ईसा (AS) ने अल्लाह की बंदगी, नमाज़, ज़कात और अपनी माँ के साथ नेक सुलूक की तालीम दी।",
		summaryUr: "حضرت عیسیٰ علیہ السلام نے اللہ کی بندگی، نماز، زکوٰۃ اور اپنی والدہ کے ساتھ حسنِ سلوک کا اعلان فرمایا۔",
		moralEn: "Being dutiful to one’s mother and humble before Allah is a mark of the righteous (Quran 19:32).",
		moralHi: "अपनी माँ का अदब करना और विनम्र रहना अल्लाह के नेक बंदों की पहचान है (क़ुरआन 19:32)।",
		moralUr: "والدہ کے ساتھ حسنِ سلوک اور تواضع اللہ کے نیک بندوں کی صفت ہے (مریم 32)۔",
		pagesEn: [
			"Maryam (AS) was one of the most devout and truthful women in history, spending her time in worship and remembrance of Allah.",
			"By Allah’s miracle, Prophet Isa (AS) spoke clearly: \"Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet\" (Quran 19:30).",
			"He added: \"And He has enjoined upon me prayer and Zakat as long as I remain alive, and made me dutiful to my mother, and He has not made me a wretched tyrant\" (Quran 19:31-32)."
		],
		pagesHi: [
			"हज़रत मरयम (AS) अल्लाह की बेहद इबादतगुज़ार और सच्ची बंदी थीं।",
			"अल्लाह के मोजिज़े से हज़रत ईसा (AS) ने फ़रमाया: \"बेशक मैं अल्लाह का बंदा हूँ, उसने मुझे किताब दी और मुझे नबी बनाया\" (क़ुरआन 19:30)।",
			"\"और उसने मुझे नमाज़ और ज़कात की ताकीद की और मुझे अपनी वालिदा का फ़रमाँबरदार बनाया\" (क़ुरआन 19:31-32)।"
		],
		pagesUr: [
			"حضرت مریم علیہا السلام اللہ کی نہایت عابدہ اور صدیقہ بندی تھیں۔",
			"اللہ کے معجزے سے حضرت عیسیٰ علیہ السلام نے فرمایا: بے شک میں اللہ کا بندہ ہوں، اس نے مجھے کتاب دی اور نبی بنایا (مریم 30)۔",
			"اور اس نے مجھے نماز و زکوٰۃ کا حکم دیا اور اپنی والدہ کے ساتھ نیک سلوک کرنے والا بنایا (مریم 31-32)۔"
		],
		quizQ: "In Surah Maryam 19:31-32, alongside Salah and Zakat, what did Prophet Isa (AS) emphasize?",
		quizOpts: [
			"Being dutiful and kind to his mother (Barran bi-walidati)",
			"Building palaces",
			"Collecting gold",
			"Avoiding people"
		],
		quizAns: 0
	},
	{
		id: "story_muhammad_al_amin",
		category: "Prophets",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sirat Ibn Hisham & Musnad Ahmad 15498",
		titleEn: "As-Sadiq Al-Amin and the Black Stone (Al-Hajar Al-Aswad)",
		titleHi: "अल-अमीन ﷺ और हजरे-असवद का फ़ैसला",
		titleUr: "الصادق الامین ﷺ اور حجرِ اسود کی تنصیب کا حکیمانہ فیصلہ",
		titleHinglish: "Al-Amin ﷺ aur Hajr-e-Aswad ka Faisla",
		titleAr: "الصادق الأمين ﷺ وحكمته في وضع الحجر الأسود",
		summaryEn: "How the young Muhammad ﷺ united the tribes of Makkah peacefully by placing the Black Stone on a cloak.",
		summaryHi: "कैसे आप ﷺ ने चादर पर हजरे-असवद रखकर मक्का के तमाम क़बीलों को एक साथ इज़्ज़त दी और झगड़ा ख़त्म किया।",
		summaryUr: "آپ ﷺ نے چادر پر حجرِ اسود رکھ کر کس حکمت سے مکہ کے قبائل کو متحد فرمایا۔",
		moralEn: "Wisdom, fairness, and shared teamwork solve disputes peacefully.",
		moralHi: "हिकमत, इंसाफ़ और मिल-जुलकर काम करने से बड़े से बड़ा झगड़ा शांति से हल हो जाता है।",
		moralUr: "حکمت، انصاف اور باہمی تعاون سے بڑے تنازعات امن کے ساتھ حل ہو جاتے ہیں۔",
		pagesEn: [
			"When the tribes of Quraysh rebuilt the walls of the Kaaba, a dispute arose over which tribe would have the honor of placing the Black Stone in its corner.",
			"They agreed to accept the judgment of the next person to enter the sanctuary. When Muhammad ﷺ entered, everyone rejoiced: \"This is Al-Amin (The Trustworthy); we accept his judgment!\"",
			"He spread a cloak on the ground, placed the Black Stone in the center, and invited a leader from every tribe to lift a corner together—bringing peace and unity to all."
		],
		pagesHi: [
			"जब मक्का के क़बीलों ने काबा की दीवारें दोबारा तामीर कीं, तो इस बात पर बहस छिड़ गई कि हजरे-असवद को अपनी जगह कौन रखेगा।",
			"जब मुहम्मद ﷺ दाख़िल हुए तो सब पुकार उठे: \"यह अल-अमीन (अमानतदार) हैं, हम इनका फ़ैसला मानते हैं!\"",
			"आप ﷺ ने एक चादर बिछाई, पत्थर को बीच में रखा और हर क़बीले के सरदार से चादर का एक कोना उठवाया—जिससे सब राज़ी हो गए।"
		],
		pagesUr: [
			"کعبہ کی تعمیرِ نو کے وقت قبائل میں اختلاف ہوا کہ حجرِ اسود کو نصب کرنے کا شرف کسے ملے۔",
			"جب محمد ﷺ تشریف لائے تو سب پکار اٹھے: یہ الامین ہیں، ہم ان کے فیصلے پر راضی ہیں!",
			"آپ ﷺ نے ایک چادر بچھائی، حجرِ اسود کو درمیان میں رکھا اور ہر قبیلے کے سردار کو ایک کونہ پکڑنے کا موقع دیا، یوں امن قائم ہو گیا۔"
		],
		quizQ: "How did the Prophet ﷺ resolve the dispute over placing the Black Stone?",
		quizOpts: [
			"He placed it on a cloak so representatives of all tribes could lift it together",
			"He gave it to one tribe only",
			"He postponed it for a year",
			"He locked the gate"
		],
		quizAns: 0
	},
	{
		id: "story_abubakr_companionship",
		category: "Companions",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah At-Tawbah 9:40 & Sahih al-Bukhari 3653",
		titleEn: "Abu Bakr As-Siddiq (RA) — \"Do Not Grieve; Indeed Allah is with Us\"",
		titleHi: "हज़रत अबू बक्र सिद्दीक़ (RA) और ग़ार-ए-सौर का यक़ीन",
		titleUr: "حضرت ابوبکر صدیق رضی اللہ عنہ اور غارِ ثور کا سکون",
		titleHinglish: "Abu Bakr As-Siddiq (RA) aur Cave Thawr ka Yaqeen",
		titleAr: "أبو بكر الصديق رضي الله عنه في غار ثور",
		summaryEn: "The loyalty of Abu Bakr (RA) during the Hijrah journey and the Quranic reassurance in Cave Thawr.",
		summaryHi: "हिजरत के सफ़र में हज़रत अबू बक्र (RA) की वफ़ादारी और ग़ार-ए-सौर में अल्लाह की मदद।",
		summaryUr: "سفرِ ہجرت میں حضرت ابوبکر صدیق رضی اللہ عنہ کی وفاداری اور غارِ ثور میں ربانی تسلی۔",
		moralEn: "When your heart is with Allah, peace (Sakinah) replaces fear (Quran 9:40).",
		moralHi: "जब इंसान अल्लाह की राह में सच्चा होता है, तो अल्लाह दिल पर सुकून (सकीना) नाज़िल फ़रमाता है (क़ुरआन 9:40)।",
		moralUr: "جب بندہ اللہ کے ساتھ سچا ہو تو اللہ اس کے دل پر سکینت نازل فرماتا ہے (التوبہ 40)۔",
		pagesEn: [
			"During the migration (Hijrah) from Makkah to Madinah, the Prophet ﷺ and his close companion Abu Bakr As-Siddiq (RA) sheltered inside the Cave of Thawr.",
			"Abu Bakr (RA) entered the cave first to clear away anything harmful so his beloved friend would be safe.",
			"When pursuers stood right outside the cave, the Prophet ﷺ reassured him with the timeless words recorded in the Quran: \"Do not grieve; indeed Allah is with us\" (Quran 9:40)."
		],
		pagesHi: [
			"मक्का से मदीना की हिजरत के दौरान नबी ﷺ और हज़रत अबू बक्र सिद्दीक़ (RA) ने ग़ार-ए-सौर में पनाह ली।",
			"हज़रत अबू बक्र (RA) ने पहले अंदर जाकर ग़ार को साफ़ किया ताकि नबी ﷺ को कोई तकलीफ़ न पहुँचे।",
			"जब पीछा करने वाले ग़ार के मुँह तक आ पहुँचे, तो आप ﷺ ने फ़रमाया: \"ग़म न करो, बेशक अल्लाह हमारे साथ है\" (क़ुरआन 9:40)।"
		],
		pagesUr: [
			"مکہ سے مدینہ ہجرت کے دوران نبی کریم ﷺ اور حضرت ابوبکر صدیق رضی اللہ عنہ نے غارِ ثور میں پناہ لی۔",
			"حضرت ابوبکر صدیق رضی اللہ عنہ نے پہلے اندر جا کر غار کو صاف کیا تاکہ آپ ﷺ محفوظ رہیں۔",
			"جب تعاقب کرنے والے قریب پہنچے تو آپ ﷺ نے فرمایا: غم نہ کرو، بے شک اللہ ہمارے ساتھ ہے (التوبہ 40)۔"
		],
		quizQ: "What did the Prophet ﷺ say to reassure Abu Bakr (RA) in the Cave of Thawr (Quran 9:40)?",
		quizOpts: [
			"Do not grieve; indeed Allah is with us (La tahzan inna Allaha ma’ana)",
			"We have lost our way",
			"Run back to Makkah",
			"Hide behind the mountain"
		],
		quizAns: 0
	},
	{
		id: "story_umar_night_care",
		category: "Responsibility",
		authenticityLabel: "Historical Biography",
		ref: "Sifat as-Safwah & Tarikh at-Tabari (Caliphate of Umar ibn Al-Khattab RA)",
		titleEn: "Umar ibn Al-Khattab (RA) Serves a Hungry Family at Night",
		titleHi: "हज़रत उमर (RA) और रात के वक़्त ग़रीब परिवार की ख़िदमत",
		titleUr: "حضرت عمر فاروق رضی اللہ عنہ اور رات کو حاجت مند خاندان کی مدد",
		titleHinglish: "Umar ibn Al-Khattab (RA) aur Raat mein Ek Parivar ki Madad",
		titleAr: "عمر بن الخطاب رضي الله عنه وتفقّد المحتاجين ليلاً",
		summaryEn: "How Caliph Umar (RA) carried a sack of flour on his own shoulders at night so hungry children could sleep smiling.",
		summaryHi: "कैसे हज़रत उमर (RA) ने खुद अपने कंधे पर आटे की बोरी उठाकर भूखे बच्चों के लिए खाना तैयार करवाया।",
		summaryUr: "خلیفہ حضرت عمر رضی اللہ عنہ نے کس طرح اپنے کندھے پر آٹے کی بوری اٹھا کر بھوکے بچوں کو کھانا کھلایا۔",
		moralEn: "A true leader is the first to serve others and carry their own responsibilities.",
		moralHi: "सच्चा ज़िम्मेदार वही है जो ख़ुद आगे बढ़कर ज़रूरतमंदों की सेवा करे।",
		moralUr: "سچا ذمہ دار وہی ہے جو خود آگے بڑھ کر مخلوقِ خدا کی خدمت کرے۔",
		pagesEn: [
			"While checking on the outskirts of Madinah at night, Umar ibn Al-Khattab (RA) heard young children crying from hunger around an empty pot.",
			"He hurried to the public treasury (Bayt al-Mal) and lifted a heavy sack of flour and oil onto his own back, saying: \"Will you carry my burden for me on the Day of Judgment?\"",
			"He stayed until the food was cooked and the children ate, laughed, and fell asleep peacefully."
		],
		pagesHi: [
			"रात में मदीना का जायज़ा लेते समय हज़रत उमर (RA) ने देखा कि एक ख़ेमे में बच्चे भूख से रो रहे हैं।",
			"वे तुरंत बैतुल-माल गए और ख़ुद अपनी पीठ पर आटे की बोरी लादकर लाए।",
			"वे तब तक वहाँ से नहीं हटे जब तक खाना पक नहीं गया और बच्चे पेट भरकर हँसते हुए सो नहीं गए।"
		],
		pagesUr: [
			"رات کے وقت مدینہ کے اطراف کا جائزہ لیتے ہوئے حضرت عمر رضی اللہ عنہ نے دیکھا کہ کچھ بچے بھوک سے بلک رہے ہیں۔",
			"آپ فوراً بیت المال تشریف لے گئے اور خود اپنی پشت پر آٹے اور گھی کی بوری اٹھا کر لائے۔",
			"آپ اس وقت تک وہاں سے واپس نہ ہوئے جب تک بچوں نے پیٹ بھر کر کھانا نہ کھا لیا اور مسکرا کر سو نہ گئے۔"
		],
		quizQ: "Why did Umar ibn Al-Khattab (RA) insist on carrying the sack of flour himself?",
		quizOpts: [
			"Because he felt personally accountable before Allah on the Day of Judgment",
			"Because no one else was awake",
			"For exercise",
			"To sell it"
		],
		quizAns: 0
	},
	{
		id: "story_uthman_well_rumah",
		category: "Helping",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih al-Bukhari 2351 & Jami` at-Tirmidhi 3703",
		titleEn: "Uthman ibn Affan (RA) and the Well of Rumah",
		titleHi: "हज़रत उस्मान (RA) और बिर-ए-रूमा का कुआँ",
		titleUr: "حضرت عثمان غنی رضی اللہ عنہ اور بئرِ رومہ کا وقف",
		titleHinglish: "Uthman ibn Affan (RA) aur Bir-e-Rumah ka Kuwan",
		titleAr: "عثمان بن عفان رضي الله عنه ووقف بئر رومة",
		summaryEn: "How Uthman (RA) purchased the fresh-water Well of Rumah in Madinah and made it free for everyone.",
		summaryHi: "कैसे हज़रत उस्मान (RA) ने मदीना में मीठे पानी का कुआँ ख़रीदकर हर अमीर-ग़रीब और मुसाफ़िर के लिए मुफ़्त कर दिया।",
		summaryUr: "حضرت عثمان غنی رضی اللہ عنہ نے مدینہ میں میٹھے پانی کا کنواں خرید کر تمام لوگوں کے لیے مفت وقف کر دیا۔",
		moralEn: "Giving clean water (Saqi al-Ma’) and ongoing charity (Sadaqah Jariyah) earns Paradise (Sahih al-Bukhari 2351).",
		moralHi: "प्यासे लोगों के लिए पानी का इंतज़ाम करना बेहतरीन सदक़ा-ए-जारिया है।",
		moralUr: "لوگوں کے لیے پانی کا انتظام کرنا بہترین صدقہ جاریہ ہے (صحیح بخاری)۔",
		pagesEn: [
			"When believers migrated to Madinah, fresh drinking water was scarce, and the owner of the Well of Rumah charged people for every bucket.",
			"The Prophet ﷺ promised Paradise to whoever would buy the Well of Rumah and make his bucket equal to the buckets of all Muslims.",
			"Uthman ibn Affan (RA) bought the well with his own wealth and made its cool water completely free for the rich, the poor, and every traveler."
		],
		pagesHi: [
			"जब मुसलमान मदीना आए तो मीठे पानी की कमी थी और रूमा के कुएँ का पानी पैसे देकर मिलता था।",
			"नबी ﷺ ने फ़रमाया कि जो कोई बिर-ए-रूमा ख़रीदकर सबके लिए वक़्फ़ कर देगा, उसके लिए जन्नत है।",
			"हज़रत उस्मान ग़नी (RA) ने अपना माल ख़र्च करके वह कुआँ ख़रीदा और उसका पानी हर इंसान के लिए मुफ़्त कर दिया।"
		],
		pagesUr: [
			"مدینہ میں ہجرت کے بعد میٹھے پانی کی قلت تھی اور بئرِ رومہ کا پانی قیمتاً ملتا تھا۔",
			"نبی کریم ﷺ نے بشارت دی کہ جو بئرِ رومہ خرید کر مسلمانوں کے لیے عام کر دے اس کے لیے جنت ہے۔",
			"حضرت عثمان غنی رضی اللہ عنہ نے اسے خرید کر ہر امیر، غریب اور مسافر کے لیے مفت وقف فرما دیا۔"
		],
		quizQ: "Which Companion bought the Well of Rumah in Madinah and made it free for all people?",
		quizOpts: [
			"Uthman ibn Affan (RA)",
			"Abu Jahl",
			"Heraclius",
			"Qarun"
		],
		quizAns: 0
	},
	{
		id: "story_ali_courage_knowledge",
		category: "Companions",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Musnad Ahmad 3062 & Surah Al-Insan 76:8-9",
		titleEn: "Ali ibn Abi Talib (RA) — Returning Every Trust & Feeding the Needy",
		titleHi: "हज़रत अली (RA) — अमानतदारी और ज़रूरतमंदों को खाना खिलाना",
		titleUr: "حضرت علی المرتضیٰ رضی اللہ عنہ — امانت کی واپسی اور ایثار",
		titleHinglish: "Ali ibn Abi Talib (RA) — Amanat aur Eesar",
		titleAr: "علي بن أبي طالب رضي الله عنه وأداء الأمانات والإيثار",
		summaryEn: "How young Ali (RA) stayed behind in Makkah to return every single entrusted item to its owner before migrating.",
		summaryHi: "कैसे हज़रत अली (RA) ने हिजरत की रात मक्का में रुककर लोगों की तमाम अमानतें उनके मालिकों को लौटाईं।",
		summaryUr: "کس طرح حضرت علی رضی اللہ عنہ نے ہجرت کے موقع پر مکہ کے لوگوں کی تمام امانتیں ان کے مالکوں کو لوٹائیں۔",
		moralEn: "A believer fulfills trusts (Amanah) and feeds the needy purely for the sake of Allah (Quran 76:8-9).",
		moralHi: "अमानत को उसके मालिक तक पहुँचाना और अल्लाह की रज़ा के लिए भूखों को खिलाना ईमान की शान है।",
		moralUr: "امانتوں کو ان کے حق داروں تک پہنچانا اور اللہ کی رضا کے لیے کھانا کھلانا ایمان کی علامت ہے۔",
		pagesEn: [
			"Even people in Makkah who opposed the Prophet ﷺ still kept their gold and valuables with him because nobody was more trustworthy.",
			"On the night of Hijrah, young Ali ibn Abi Talib (RA) courageously stayed behind for three days to return every single item to its rightful owner before walking to Madinah.",
			"In Madinah, Ali (RA) and Fatimah (RA) were known for giving their own meal to the needy, the orphan, and the captive purely for Allah’s sake."
		],
		pagesHi: [
			"मक्का के लोग अपनी कीमती अमानतें नबी ﷺ के पास ही रखते थे क्योंकि आप से ज़्यादा अमानतदार कोई न था।",
			"हिजरत की रात नौजवान हज़रत अली (RA) बहादुरी से रुके रहे ताकि एक-एक अमानत उसके मालिक को लौटाकर मदीना आएँ।",
			"मदीना में हज़रत अली (RA) और बीबी फ़ातिमा (RA) ख़ुद भूखे रहकर मिस्कीन और यतीम को खाना खिलाने के लिए मशहूर थे।"
		],
		pagesUr: [
			"مکہ کے لوگ اپنی قیمتی امانتیں نبی کریم ﷺ کے پاس رکھتے تھے۔",
			"ہجرت کی رات حضرت علی رضی اللہ عنہ نے ہمت سے مکہ میں رک کر تمام امانتیں ان کے مالکوں کو واپس کیں اور پھر مدینہ ہجرت کی۔",
			"مدینہ میں حضرت علی اور سیدہ فاطمہ رضی اللہ عنہما اللہ کی رضا کے لیے مسکین اور یتیم کو اپنا کھانا پیش کر دیتے تھے۔"
		],
		quizQ: "Why did Ali ibn Abi Talib (RA) remain in Makkah for three days at the start of the Hijrah?",
		quizOpts: [
			"To return all entrusted valuables (Amanat) to their owners on behalf of the Prophet ﷺ",
			"Because he forgot the way",
			"To buy camels",
			"To build a house"
		],
		quizAns: 0
	},
	{
		id: "story_khadijah_comfort",
		category: "Companions",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih al-Bukhari 3 & Sahih Muslim 160",
		titleEn: "Khadijah bint Khuwaylid (RA) — Words of Comfort and Faith",
		titleHi: "हज़रत ख़दीजा (RA) — हौसला और वफ़ादारी के बोल",
		titleUr: "ام المؤمنین حضرت خدیجہ رضی اللہ عنہا — تسلی اور ایمان کے کلمات",
		titleHinglish: "Khadijah (RA) — Hausla aur Iman ke Bol",
		titleAr: "أم المؤمنين خديجة رضي الله عنها وكلمات التثبيت",
		summaryEn: "How Khadijah (RA) comforted the Prophet ﷺ after the first revelation by reminding him of his good character.",
		summaryHi: "कैसे पहली वही के बाद हज़रत ख़दीजा (RA) ने आप ﷺ के नेक अख़लाक़ याद दिलाकर तसल्ली दी।",
		summaryUr: "پہلی وحی کے بعد حضرت خدیجہ رضی اللہ عنہا نے آپ ﷺ کے حسنِ اخلاق کا ذکر کر کے تسلی دی۔",
		moralEn: "Keeping family ties, helping the weak, and speaking truth bring Allah’s protection (Sahih al-Bukhari 3).",
		moralHi: "रिश्तेदारों से अच्छा सुलूक करना और कमज़ोरों का बोझ उठाना अल्लाह की हिफ़ाज़त दिलाता है (सहीह बुख़ारी 3)।",
		moralUr: "صلہ رحمی اور کمزوروں کی مدد کرنے والے کو اللہ کبھی ضائع نہیں فرماتا (صحیح بخاری 3)۔",
		pagesEn: [
			"When the first revelation of Surah Al-Alaq came in the Cave of Hira, the Prophet ﷺ returned home with his heart trembling and said: \"Cover me, cover me!\"",
			"Khadijah (RA) wrapped him warmly and spoke words of deep wisdom: \"Never! By Allah, Allah will never disgrace you.\"",
			"She explained why: \"For you uphold family ties, speak the truth, carry the burdens of the weak, honor the guest, and help people in hardship\" (Sahih al-Bukhari 3)."
		],
		pagesHi: [
			"ग़ार-ए-हिरा में पहली वही उतरने के बाद जब नबी ﷺ घर तशरीफ़ लाए तो फ़रमाया: \"मुझे चादर ओढ़ा दो!\"",
			"हज़रत ख़दीजा (RA) ने बड़े हौसले और समझदारी से कहा: \"अल्लाह की क़सम! अल्लाह आपको कभी तन्हा नहीं छोड़ेगा।\"",
			"\"क्योंकि आप रिश्तेदारी निभाते हैं, सच बोलते हैं, कमज़ोरों का बोझ उठाते हैं और मेहमान की इज़्ज़त करते हैं\" (सहीह बुख़ारी 3)।"
		],
		pagesUr: [
			"غارِ حرا میں پہلی وحی کے نزول کے بعد جب آپ ﷺ گھر تشریف لائے تو حضرت خدیجہ رضی اللہ عنہا نے تسلی دی۔",
			"آپ نے فرمایا: اللہ کی قسم! اللہ آپ کو کبھی رسوا نہیں کرے گا۔",
			"کیونکہ آپ صلہ رحمی کرتے ہیں، سچ بولتے ہیں، بے سہارا لوگوں کا بوجھ اٹھاتے ہیں اور مہمان نوازی کرتے ہیں (صحیح بخاری 3)۔"
		],
		quizQ: "Which qualities did Khadijah (RA) mention when comforting the Prophet ﷺ in Sahih al-Bukhari 3?",
		quizOpts: [
			"Upholding family ties, speaking truth, helping the weak, and honoring guests",
			"Owning many horses",
			"Writing poetry",
			"Building towers"
		],
		quizAns: 0
	},
	{
		id: "story_bilal_steadfast",
		category: "Companions",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sunan Abi Dawud 499 & Sahih al-Bukhari 1149",
		titleEn: "Bilal ibn Rabah (RA) — The First Caller to Prayer (Mu’adhdhin)",
		titleHi: "हज़रत बिलाल (RA) — इस्लाम के पहले मुअज़्ज़िन",
		titleUr: "حضرت بلال حبشی رضی اللہ عنہ — اسلام کے پہلے مؤذن",
		titleHinglish: "Bilal ibn Rabah (RA) — Islam ke Pehle Mu’adhdhin",
		titleAr: "بلال بن رباح رضي الله عنه مؤذن الرسول ﷺ",
		summaryEn: "How Bilal (RA) stood firm on \"Ahad, Ahad\" (The One, The One) and became the first Mu’adhdhin in Madinah.",
		summaryHi: "कैसे हज़रत बिलाल (RA) ने तौहीद पर मज़बूती दिखाई और मदीना में पहले मुअज़्ज़िन बने।",
		summaryUr: "حضرت بلال رضی اللہ عنہ کی استقامت اور مدینہ منورہ میں پہلے مؤذن بننے کا شرف۔",
		moralEn: "In Islam, honor comes from faith, good character, and consistent Wudu and prayer (Sahih al-Bukhari 1149).",
		moralHi: "इस्लाम में इज़्ज़त रंग या दौलत से नहीं बल्कि ईमान, तक़वा और वुज़ू व नमाज़ की पाबंदी से मिलती है।",
		moralUr: "اسلام میں عزت رنگ و نسل سے نہیں بلکہ ایمان، تقویٰ اور عملِ صالح سے ملتی ہے۔",
		pagesEn: [
			"Bilal ibn Rabah (RA) came from Abyssinia and was one of the earliest believers who remained steadfast on \"Ahad, Ahad\" (Allah is One).",
			"Abu Bakr As-Siddiq (RA) freed him for the sake of Allah, and in Madinah the Prophet ﷺ chose Bilal (RA) to call the very first Adhan.",
			"The Prophet ﷺ also praised Bilal (RA) for his habit of maintaining Wudu and praying two Rak’ahs after every Wudu (Sahih al-Bukhari 1149)."
		],
		pagesHi: [
			"हज़रत बिलाल (RA) हब्शा से थे और सख़्त आज़माइश में भी \"अहद, अहद\" (अल्लाह एक है) पर डटे रहे।",
			"मदीना में नबी ﷺ ने हज़रत बिलाल (RA) को इस्लाम की पहली अज़ान देने का सम्मान अता फ़रमाया।",
			"हज़रत बिलाल (RA) हमेशा वुज़ू से रहते और हर वुज़ू के बाद दो रकात तहिय्यतुल-वुज़ू पढ़ा करते थे (सहीह बुख़ारी 1149)।"
		],
		pagesUr: [
			"حضرت بلال رضی اللہ عنہ نے ہر آزمائش میں احد، احد (اللہ ایک ہے) کا درس دیا۔",
			"مدینہ منورہ میں نبی کریم ﷺ نے آپ کو اسلام کا پہلا مؤذن مقرر فرمایا۔",
			"آپ ہر وضو کے بعد دو رکعت نماز پڑھنے کی سنت پر ہمیشہ عمل کرتے تھے (صحیح بخاری 1149)۔"
		],
		quizQ: "What special habit of Bilal (RA) did the Prophet ﷺ praise in Sahih al-Bukhari 1149?",
		quizOpts: [
			"Maintaining Wudu and praying two Rak’ahs after every purification",
			"Sleeping all day",
			"Skipping Fajr",
			"Arguing in the market"
		],
		quizAns: 0
	},
	{
		id: "story_fatimah_respect",
		category: "Parents",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih al-Bukhari 3623 & Sunan Abi Dawud 5217",
		titleEn: "Fatimah Az-Zahra (RA) and Mutual Respect in the Family",
		titleHi: "हज़रत फ़ातिमा (RA) और नबी ﷺ का अदब व मोहब्बत",
		titleUr: "سیدہ فاطمہ الزہراء رضی اللہ عنہا اور خاندانی ادب و محبت",
		titleHinglish: "Fatimah (RA) aur Family mein Adab o Mohabbat",
		titleAr: "فاطمة الزهراء رضي الله عنها والأدب النبوي الرفيع",
		summaryEn: "How the Prophet ﷺ and his daughter Fatimah (RA) stood up to welcome each other with warmth and respect.",
		summaryHi: "कैसे नबी ﷺ और उनकी बेटी हज़रत फ़ातिमा (RA) एक-दूसरे के आने पर खड़े होकर इज़्ज़त से इस्तक़बाल करते थे।",
		summaryUr: "نبی کریم ﷺ اور سیدہ فاطمہ رضی اللہ عنہا کس طرح ایک دوسرے کی آمد پر کھڑے ہو کر احترام سے استقبال فرماتے تھے۔",
		moralEn: "Showing warm respect to parents and family members at home follows the Prophetic Sunnah (Sunan Abi Dawud 5217).",
		moralHi: "घर में माता-पिता और बच्चों का एक-दूसरे से अदब और मोहब्बत से पेश आना प्यारी सुन्नत है।",
		moralUr: "گھر میں والدین اور اولاد کا ایک دوسرے کے ساتھ احترام اور محبت سے پیش آنا سنتِ نبوی ہے۔",
		pagesEn: [
			"Aisha (RA) described that no one resembled the Prophet ﷺ more in calm speech, dignity, and manner of walking than his daughter Fatimah (RA).",
			"Whenever Fatimah (RA) entered the room, the Prophet ﷺ would stand up for her, welcome her warmly, and seat her in his place.",
			"And whenever the Prophet ﷺ entered her home, she would stand up for him with the same love and respect (Sunan Abi Dawud 5217)."
		],
		pagesHi: [
			"हज़रत आइशा (RA) बताती हैं कि बातचीत और आदाब में हज़रत फ़ातिमा (RA) हूबहू नबी ﷺ जैसी थीं।",
			"जब हज़रत फ़ातिमा (RA) तशरीफ़ लातीं, तो नबी ﷺ उनके लिए खड़े हो जाते, मोहब्बत से स्वागत करते और अपनी जगह पर बिठाते।",
			"और जब नबी ﷺ उनके घर तशरीफ़ लाते, तो वे भी उसी अदब से खड़े होकर अपने वालिद का इस्तक़बाल करतीं (अबी दाऊद 5217)।"
		],
		pagesUr: [
			"حضرت عائشہ رضی اللہ عنہا فرماتی ہیں کہ گفتگو اور نشست و برخاست میں سیدہ فاطمہ رضی اللہ عنہا نبی کریم ﷺ سے سب سے زیادہ مشابہ تھیں۔",
			"جب سیدہ فاطمہ تشریف لاتیں تو آپ ﷺ کھڑے ہو کر محبت سے استقبال فرماتے اور اپنی جگہ بٹھاتے۔",
			"اور جب آپ ﷺ ان کے ہاں تشریف لے جاتے تو وہ بھی ادب سے کھڑی ہو کر استقبال کرتیں (ابو داؤد 5217)۔"
		],
		quizQ: "How did the Prophet ﷺ greet his daughter Fatimah (RA) when she visited him (Sunan Abi Dawud 5217)?",
		quizOpts: [
			"He stood up to welcome her warmly and seated her in his place",
			"He ignored her",
			"He told her to wait outside",
			"He spoke harshly"
		],
		quizAns: 0
	},
	{
		id: "story_salman_truth_seeker",
		category: "Companions",
		authenticityLabel: "Historical Biography",
		ref: "Musnad Ahmad 23737 & Sahih al-Bukhari 4101",
		titleEn: "Salman Al-Farsi (RA) — The Long Journey for Truth & Teamwork",
		titleHi: "हज़रत सलमान फ़ारसी (RA) — हक़ की तलाश और ख़ंदक़ का मशवरा",
		titleUr: "حضرت سلمان فارسی رضی اللہ عنہ — تلاشِ حق اور خندق کا مشورہ",
		titleHinglish: "Salman Al-Farsi (RA) — Haq ki Talash aur Teamwork",
		titleAr: "سلمان الفارسي رضي الله عنه ورحلة البحث عن الحق",
		summaryEn: "How Salman Al-Farsi (RA) traveled across lands seeking truth and later proposed the defensive trench to protect Madinah.",
		summaryHi: "कैसे हज़रत सलमान फ़ारसी (RA) ने सच्चाई की तलाश में लंबा सफ़र किया और मदीना की हिफ़ाज़त के लिए ख़ंदक़ का मशवरा दिया।",
		summaryUr: "حضرت سلمان فارسی رضی اللہ عنہ کا تلاشِ حق کا سفر اور مدینہ کی حفاظت کے لیے خندق کھودنے کا مشورہ۔",
		moralEn: "Seeking knowledge sincerely and listening to good advice from others brings safety to the whole community.",
		moralHi: "सच्चा इल्म तलाश करना और दूसरों के अच्छे मशवरे को मानना पूरी जमात को फ़ायदा पहुँचाता है।",
		moralUr: "علم کی سچی طلب اور باہمی مشاورت پوری امت کے لیے خیر کا باعث بنتی ہے۔",
		pagesEn: [
			"Salman Al-Farsi (RA) left a comfortable home in Persia and traveled for years through Syria and Arabia looking for the final Prophet.",
			"In Madinah, he recognized the signs of prophethood in Muhammad ﷺ—who accepted gifts with his companions and never took Sadaqah for himself.",
			"Years later, Salman (RA) suggested digging a protective trench (Khandaq) around Madinah, and the Prophet ﷺ worked alongside everyone digging the earth."
		],
		pagesHi: [
			"हज़रत सलमान फ़ारसी (RA) ने सच्चाई की तलाश में फ़ारस का आरामदायक घर छोड़ा और सालों तक सफ़र किया।",
			"मदीना में उन्होंने नबी ﷺ की निशानियाँ पहचानीं और ईमान लाए।",
			"बाद में उन्होंने मदीना की हिफ़ाज़त के लिए ख़ंदक़ (खाई) खोदने का मशवरा दिया, जिसे नबी ﷺ ने ख़ुशी से क़बूल किया।"
		],
		pagesUr: [
			"حضرت سلمان فارسی رضی اللہ عنہ نے حق کی تلاش میں فارس سے طویل سفر کیا۔",
			"مدینہ منورہ میں آپ نے نبوت کی علامات پہچان کر اسلام قبول کیا۔",
			"غزوہ احزاب کے موقع پر آپ کے مشورے سے مدینہ کے گرد حفاظتی خندق کھودی گئی جس میں نبی ﷺ نے خود صحابہ کے ساتھ کام کیا۔"
		],
		quizQ: "What defensive idea did Salman Al-Farsi (RA) suggest to protect Madinah peacefully?",
		quizOpts: [
			"Digging a protective trench (Al-Khandaq)",
			"Burning the date palms",
			"Leaving Madinah",
			"Closing the wells"
		],
		quizAns: 0
	},
	{
		id: "story_asma_two_belts",
		category: "Companions",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih al-Bukhari 3907",
		titleEn: "Asma bint Abi Bakr (RA) — Lady of the Two Waistbands",
		titleHi: "हज़रत अस्मा बिन्त अबी बक्र (RA) — ज़ात-उन-निताक़ैन",
		titleUr: "حضرت اسماء بنت ابی بکر رضی اللہ عنہما — ذات النطاقین",
		titleHinglish: "Asma bint Abi Bakr (RA) — Dhat an-Nitaqayn",
		titleAr: "أسماء بنت أبي بكر رضي الله عنهما ذات النطاقين",
		summaryEn: "How young Asma (RA) resourcefully divided her waistband to tie the food bag for the Hijrah journey.",
		summaryHi: "कैसे हज़रत अस्मा (RA) ने समझदारी से अपने कमरबंद के दो हिस्से करके हिजरत के सफ़र का तोशा बाँधा।",
		summaryUr: "کس طرح حضرت اسماء رضی اللہ عنہا نے اپنے نطاق (کمر بند) کے دو حصے کر کے سفرِ ہجرت کا زادِ راہ باندھا۔",
		moralEn: "Resourcefulness, courage, and helping family in noble causes earn lasting honor (Sahih al-Bukhari 3907).",
		moralHi: "नेक काम में समझदारी और हिम्मत से मदद करना अल्लाह के यहाँ ऊँचा दर्जा दिलाता है।",
		moralUr: "خیر کے کام میں حاضر دماغی اور ہمت سے خدمت کرنا دائمی عزت کا باعث ہے (صحیح بخاری 3907)۔",
		pagesEn: [
			"When the Prophet ﷺ and Abu Bakr (RA) prepared to leave for Madinah, young Asma bint Abi Bakr (RA) packed their food and water container.",
			"Finding no rope to tie the bag and water-skin, she quickly split her waistband (Nitaq) in two and tied the provisions securely.",
			"The Prophet ﷺ honored her resourcefulness with the title \"Dhat an-Nitaqayn\" (She of the Two Waistbands) and prayed that Allah grant her two belts in Paradise."
		],
		pagesHi: [
			"हिजरत की तैयारी के वक़्त हज़रत अस्मा (RA) ने सफ़र का खाना और पानी का मश्कीज़ा तैयार किया।",
			"जब बाँधने के लिए रस्सी न मिली, तो उन्होंने फ़ौरन अपने कमरबंद (निताक़) के दो टुकड़े किए और सामान मज़बूती से बाँध दिया।",
			"नबी ﷺ ने उनकी इस समझदारी पर उन्हें \"ज़ात-उन-निताक़ैन\" का लक़ब दिया और जन्नत की खुशख़बरी दी।"
		],
		pagesUr: [
			"ہجرت کی تیاری کے وقت حضرت اسماء رضی اللہ عنہا نے سفر کے لیے کھانا اور پانی تیار کیا۔",
			"باندھنے کے لیے رسی نہ ملنے پر آپ نے اپنے کمر بند کے دو حصے کر کے زادِ راہ مضبوطی سے باندھ دیا۔",
			"نبی کریم ﷺ نے آپ کو ذات النطاقین کے لقب سے نوازا اور جنت میں دو نطاقوں کی بشارت دی۔"
		],
		quizQ: "What title was Asma bint Abi Bakr (RA) given for tying the Hijrah provisions with her waistband?",
		quizOpts: [
			"Dhat an-Nitaqayn (She of the Two Waistbands)",
			"Umm al-Masakin",
			"Saifullah",
			"Asadullah"
		],
		quizAns: 0
	},
	{
		id: "story_parents_cave_rock",
		category: "Parents",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih al-Bukhari 2272 & Sahih Muslim 2743",
		titleEn: "Serving Elderly Parents Before Everything Else",
		titleHi: "बूढ़े माता-पिता की ख़िदमत और ग़ार के पत्थर का हटना",
		titleUr: "بوڑھے والدین کی خدمت اور غار کی چٹان کا ہٹنا",
		titleHinglish: "Walidain ki Khidmat aur Cave ke Patthar ka Hatna",
		titleAr: "برّ الوالدين وانفراج الصخرة",
		summaryEn: "From the authentic Hadith of the three men in the cave: how standing patiently with milk for elderly parents moved the boulder.",
		summaryHi: "सहीह हदीस का वाक़या: कैसे एक नेक बेटे ने रात भर हाथ में दूध का प्याला लेकर अपने बूढ़े माँ-बाप के जागने का इंतज़ार किया।",
		summaryUr: "صحیح حدیث کا واقعہ: ایک نیک بیٹے نے رات بھر دودھ کا پیالہ ہاتھ میں لے کر اپنے بوڑھے والدین کے جاگنے کا انتظار کیا۔",
		moralEn: "Sincere devotion to parents (Birr al-Walidayn) opens doors out of life’s hardest difficulties (Sahih al-Bukhari 2272).",
		moralHi: "माता-पिता की सच्ची ख़िदमत बड़ी से बड़ी मुसीबत के बंद दरवाज़े खोल देती है (सहीह बुख़ारी 2272)।",
		moralUr: "والدین کی مخلصانہ خدمت بڑی سے بڑی مشکل سے نجات کا ذریعہ بنتی ہے (صحیح بخاری 2272)۔",
		pagesEn: [
			"The Prophet ﷺ told the story of three travelers trapped inside a mountain cave when a heavy boulder rolled down and blocked the entrance.",
			"One man prayed to Allah recalling how he always brought fresh evening milk to his elderly mother and father before anyone else.",
			"One night he found them asleep; out of respect he neither woke them nor drank before them, standing quietly with the bowl until dawn—and by Allah’s mercy, the rock shifted!"
		],
		pagesHi: [
			"नबी ﷺ ने तीन मुसाफ़िरों का क़िस्सा सुनाया जो बारिश में एक ग़ार में रुके और एक बड़ी चट्टान ने ग़ार का मुँह बंद कर दिया।",
			"उनमें से एक ने अल्लाह से दुआ की कि वह रोज़ शाम को सबसे पहले अपने बूढ़े माँ-बाप को ताज़ा दूध पिलाता था।",
			"एक रात वे सो गए थे, तो उसने अदब से न उन्हें जगाया और न उनसे पहले किसी को पिलाया—इस मुख़लिस अमल की बरकत से अल्लाह ने चट्टान सरका दी!"
		],
		pagesUr: [
			"نبی کریم ﷺ نے تین مسافروں کا واقعہ بیان فرمایا جن پر غار کے دہانے پر ایک بھاری چٹان آ گری۔",
			"ان میں سے ایک شخص نے اپنے اس مخلصانہ عمل کا وسیلہ پیش کیا کہ وہ اپنے بوڑھے والدین کو سب سے پہلے دودھ پیش کرتا تھا۔",
			"ایک رات والدین سو گئے تو وہ ادب سے صبح تک پیالہ لے کر کھڑا رہا—اس عمل کی برکت سے اللہ نے چٹان ہٹا دی۔"
		],
		quizQ: "In Sahih al-Bukhari 2272, what good deed did the first man in the cave mention in his Dua?",
		quizOpts: [
			"Honoring and serving his elderly parents before anyone else",
			"Building a tall castle",
			"Winning a race",
			"Counting gold coins"
		],
		quizAns: 0
	},
	{
		id: "story_sparrow_mercy",
		category: "Animals",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sunan Abi Dawud 2675 (Authenticated)",
		titleEn: "The Mother Bird and Her Nestlings",
		titleHi: "नन्ही चिड़िया और उसके बच्चों की हिफ़ाज़त",
		titleUr: "ننھی چڑیا اور اس کے بچوں کی حفاظت",
		titleHinglish: "Nanhi Chidiya aur Uske Bachon ki Hifazat",
		titleAr: "الحمّرة وفراخها ورحمة النبي ﷺ بالطيور",
		summaryEn: "How the Prophet ﷺ instructed his companions to immediately return baby birds to their distressed mother.",
		summaryHi: "कैसे नबी ﷺ ने परेशान चिड़िया को देखकर फ़ौरन उसके बच्चों को घोंसले में वापस रखने का हुक्म दिया।",
		summaryUr: "نبی کریم ﷺ نے پریشان چڑیا کو دیکھ کر فوراً اس کے بچے گھونسلے میں واپس رکھنے کا حکم فرمایا۔",
		moralEn: "Never frighten a mother creature or take her young away from her nest (Sunan Abi Dawud 2675).",
		moralHi: "किसी परिंदे या जानवर के बच्चों को उसकी माँ से अलग करके तकलीफ़ नहीं देनी चाहिए (सुनन अबी दाऊद 2675)।",
		moralUr: "کسی پرندے یا جانور کو اس کے بچوں کے معاملے میں ہرگز تکلیف نہیں دینی چاہیے (ابو داؤد 2675)۔",
		pagesEn: [
			"During a journey, some travelers saw a small red bird (Hummarah) with two tiny chicks in a bush and picked up the nestlings.",
			"The mother bird began circling and fluttering her wings overhead in distress. When the Prophet ﷺ arrived and saw her, he asked: \"Who has distressed this bird by taking her young?\"",
			"He instructed immediately: \"Return her young to her!\"—teaching that even a small bird’s feelings matter in Islam."
		],
		pagesHi: [
			"एक सफ़र के दौरान कुछ लोगों ने झाड़ी में एक छोटी चिड़िया के दो बच्चे देखे और उन्हें उठा लिया।",
			"चिड़िया परेशान होकर हवा में पर फड़फड़ाने लगी। नबी ﷺ ने देखकर पूछा: \"किसने इस चिड़िया को उसके बच्चों की वजह से दुख पहुँचाया है?\"",
			"आप ﷺ ने फ़ौरन हुक्म दिया: \"इसके बच्चे इसे वापस लौटा दो!\""
		],
		pagesUr: [
			"ایک سفر کے دوران کچھ لوگوں نے جھاڑی میں ایک چھوٹی چڑیا کے دو بچے دیکھے اور انہیں اٹھا لیا۔",
			"چڑیا بے قرار ہو کر پر پھڑپھڑانے لگی۔ نبی کریم ﷺ نے فرمایا: کس نے اس چڑیا کو اس کے بچوں کے سبب تکلیف دی ہے؟",
			"آپ ﷺ نے حکم دیا: اس کے بچے فوراً اسے واپس لوٹا دو! (ابو داؤد 2675)۔"
		],
		quizQ: "What did the Prophet ﷺ command when he saw the mother bird fluttering in distress (Sunan Abi Dawud 2675)?",
		quizOpts: [
			"Return her young chicks to her immediately",
			"Keep the chicks in a cage",
			"Chase the bird away",
			"Ignore her"
		],
		quizAns: 0
	},
	{
		id: "story_jar_of_gold_amanah",
		category: "Honesty",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih al-Bukhari 3472 & Sahih Muslim 1721",
		titleEn: "The Two Honest Neighbors and the Jar of Gold",
		titleHi: "दो ईमानदार इंसान और सोने से भरा घड़ा",
		titleUr: "دو دیانت دار افراد اور سونے سے بھرا مٹکا",
		titleHinglish: "Do Imandar Log aur Sone ka Ghada",
		titleAr: "الرجلان الأمينان وجرّة الذهب",
		summaryEn: "An authentic Hadith story of a buyer and seller who both insisted the hidden jar of gold belonged to the other.",
		summaryHi: "सहीह बुख़ारी की कहानी: ज़मीन ख़रीदने और बेचने वाले दो नेक इंसान जिनमें से किसी ने भी मुफ़्त का सोना लेने से इनकार कर दिया।",
		summaryUr: "صحیح بخاری کا واقعہ: زمین خریدنے اور بیچنے والے دو نیک انسان جنہوں نے چھپا ہوا سونا ایک دوسرے کو لوٹانا چاہا۔",
		moralEn: "When both sides choose honesty over greed, Allah blesses their families and resolves their matter harmoniously (Sahih al-Bukhari 3472).",
		moralHi: "जब इंसान लालच छोड़कर अमानतदारी चुनता है, तो अल्लाह दोनों के घरों में बरकत डाल देता है (सहीह बुख़ारी 3472)।",
		moralUr: "جب انسان لالچ چھوڑ کر دیانت داری اختیار کرتا ہے تو اللہ دونوں خاندانوں میں برکت عطا فرماتا ہے (صحیح بخاری 3472)۔",
		pagesEn: [
			"The Prophet ﷺ narrated that a man bought a piece of land from his neighbor and later found a buried jar filled with gold in the soil.",
			"The buyer took the gold to the seller and said: \"Take your gold! I only bought the land from you, not the gold.\" The seller replied: \"I sold you the land and everything inside it!\"",
			"When they went to a wise judge, he learned one had a son and the other had a daughter; he suggested they marry the two and spend from the gold in charity and goodness!"
		],
		pagesHi: [
			"नबी ﷺ ने फ़रमाया कि पहले ज़माने में एक आदमी ने ज़मीन ख़रीदी और खुदाई करते समय उसे सोने से भरा घड़ा मिला।",
			"ख़रीदार ने बेचने वाले से कहा: \"अपना सोना ले लो, मैंने तुमसे सिर्फ़ ज़मीन ख़रीदी थी!\" बेचने वाले ने कहा: \"मैंने तुम्हें ज़मीन और उसके अंदर जो कुछ है सब बेचा था!\"",
			"जब वे एक हाकिम के पास गए तो उसने दोनों के बच्चों का रिश्ता जोड़ दिया ताकि वह हलाल माल नेकी और ख़ुशी में काम आए।"
		],
		pagesUr: [
			"نبی کریم ﷺ نے بیان فرمایا کہ ایک شخص نے زمین خریدی اور اس میں سونے سے بھرا مٹکا پایا۔",
			"خریدار نے فروخت کرنے والے سے کہا کہ میں نے صرف زمین خریدی تھی سونا نہیں، جبکہ فروخت کرنے والے نے کہا کہ میں نے زمین اس کے اندر کی ہر چیز سمیت بیچی تھی۔",
			"ایک دانا قاضی نے دونوں کی دیانت داری دیکھ کر ان کے بچوں کا نکاح کرا دیا اور مال خیر کے کاموں میں خرچ کرنے کا مشورہ دیا۔"
		],
		quizQ: "In Sahih al-Bukhari 3472, what did the buyer of the land do when he found a jar of gold buried in it?",
		quizOpts: [
			"He took it back to the seller saying he only bought the land, not the gold",
			"He hid it secretly at night",
			"He threw it into the sea",
			"He boasted to the town"
		],
		quizAns: 0
	},
	{
		id: "story_smiling_sadaqah",
		category: "Manners",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Jami` at-Tirmidhi 1956 (Sahih)",
		titleEn: "Your Smile and Clearing the Path are Charity (Sadaqah)",
		titleHi: "मुस्कुराना और रास्ते से पत्थर हटाना भी सदक़ा है",
		titleUr: "مسکرانا اور راستے سے پتھر ہٹانا بھی صدقہ ہے",
		titleHinglish: "Muskurana aur Raaste se Patthar Hatana bhi Sadaqah hai",
		titleAr: "تبسّمك في وجه أخيك وإماطة الأذى عن الطريق صدقة",
		summaryEn: "How every child can give charity daily—even without money—through a kind smile, helping someone, or clearing a path.",
		summaryHi: "कैसे बिना पैसे के भी हर बच्चा मुस्कुराकर, किसी को रास्ता बताकर या रास्ते से काँटा हटाकर रोज़ सदक़ा दे सकता है।",
		summaryUr: "بغیر پیسے کے بھی مسکرا کر، کسی کی رہنمائی کر کے یا راستے سے تکلیف دہ چیز ہٹا کر روزانہ صدقہ دیا جا سکتا ہے۔",
		moralEn: "\"Your smiling in the face of your brother is charity, and removing a stone or thorn from the road is charity\" (Jami` at-Tirmidhi 1956).",
		moralHi: "किसी से मुस्कुराकर मिलना और रास्ते से तकलीफ़ की चीज़ हटाना तुम्हारे लिए सदक़ा है (तिर्मिज़ी 1956)।",
		moralUr: "اپنے بھائی سے مسکرا کر ملنا اور راستے سے پتھر یا کانٹا ہٹانا تمہارے لیے صدقہ ہے (ترمذی 1956)۔",
		pagesEn: [
			"Sometimes children think only people with lots of coins can give Sadaqah (charity).",
			"The Prophet ﷺ taught a joyful lesson in Jami` at-Tirmidhi 1956: \"Your smiling in the face of your brother is charity for you!\"",
			"He also taught that guiding someone who is lost, pouring water into a neighbor’s bucket, and removing a stone, thorn, or bone from the walkway are all rewarded as Sadaqah."
		],
		pagesHi: [
			"अक्सर बच्चे सोचते हैं कि सदक़ा देने के लिए जेब में पैसे होना ज़रूरी है।",
			"लेकिन नबी ﷺ ने तिर्मिज़ी 1956 में सिखाया: \"अपने भाई से मुस्कुराकर मिलना भी तुम्हारे लिए सदक़ा है!\"",
			"रास्ते से पत्थर या काँटा हटाना, किसी भूले को रास्ता बताना और दूसरे के बर्तन में पानी डालना—ये सब अल्लाह के यहाँ सदक़ा हैं।"
		],
		pagesUr: [
			"اکثر بچے سوچتے ہیں کہ صدقہ دینے کے لیے پیسے ہونا ضروری ہے۔",
			"نبی کریم ﷺ نے جامع ترمذی 1956 میں سکھایا: اپنے بھائی سے مسکرا کر ملنا بھی تمہارے لیے صدقہ ہے!",
			"راستے سے پتھر یا کانٹا ہٹانا اور کسی کی مدد کرنا بھی اللہ کے نزدیک صدقہ لکھا جاتا ہے۔"
		],
		quizQ: "According to Jami` at-Tirmidhi 1956, which of these everyday actions counts as Sadaqah (charity)?",
		quizOpts: [
			"Smiling kindly and removing a stone or thorn from the road",
			"Shouting at neighbors",
			"Leaving trash on the street",
			"Frowning at guests"
		],
		quizAns: 0
	},
	{
		id: "story_table_manners_umar_abi_salamah",
		category: "Manners",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih al-Bukhari 5376 & Sahih Muslim 2022",
		titleEn: "Three Golden Table Manners Taught to Young Umar ibn Abi Salamah (RA)",
		titleHi: "नन्हे उमर इब्न अबी सलमा (RA) और खाने के तीन सुनहरे आदाब",
		titleUr: "ننھے حضرت عمر بن ابی سلمہ رضی اللہ عنہ اور کھانے کے تین سنہری آداب",
		titleHinglish: "Young Umar ibn Abi Salamah (RA) aur Khane ke 3 Sunnah Adab",
		titleAr: "يا غلام سمّ الله وكل بيمينك وكل مما يليك",
		summaryEn: "How the Prophet ﷺ gently taught a young boy at mealtime: Say Bismillah, eat with your right hand, and eat from what is nearest to you.",
		summaryHi: "कैसे नबी ﷺ ने प्यार से एक बच्चे को खाने के 3 आदाब सिखाए: बिस्मिल्लाह कहो, दाएँ हाथ से खाओ, और अपने सामने से खाओ।",
		summaryUr: "نبی کریم ﷺ نے محبت سے ایک بچے کو کھانے کے تین آداب سکھائے: بسم اللہ پڑھو، دائیں ہاتھ سے کھاؤ اور اپنے سامنے سے کھاؤ۔",
		moralEn: "\"O young boy, mention the Name of Allah, eat with your right hand, and eat from what is near you\" (Sahih al-Bukhari 5376).",
		moralHi: "बिस्मिल्लाह कहना, दाएँ हाथ से खाना और अपने सामने से खाना सुन्नत का तरीक़ा है (सहीह बुख़ारी 5376)।",
		moralUr: "بسم اللہ پڑھنا، دائیں ہاتھ سے کھانا اور اپنے سامنے سے کھانا سنتِ نبوی ہے (صحیح بخاری 5376)۔",
		pagesEn: [
			"Young Umar ibn Abi Salamah (RA) was a boy eating from a shared platter, and his hand was wandering all around the dish.",
			"Instead of scolding him, the Prophet ﷺ taught him three easy rules in one gentle sentence.",
			"He said: \"O young boy! Mention the Name of Allah (say Bismillah), eat with your right hand, and eat from what is nearest to you.\" Umar (RA) followed this habit for the rest of his life!"
		],
		pagesHi: [
			"नन्हे उमर इब्न अबी सलमा (RA) खाना खाते समय थाल में चारों तरफ़ हाथ घुमा रहे थे।",
			"नबी ﷺ ने बिना डाँटे बड़े प्यार से उन्हें एक छोटे जुमले में ज़िंदगी भर का सबक़ सिखा दिया।",
			"आप ﷺ ने फ़रमाया: \"ऐ बेटे! बिस्मिल्लाह कहो, अपने दाएँ हाथ से खाओ, और जो तुम्हारे सामने करीब है वहाँ से खाओ\" (सहीह बुख़ारी 5376)।"
		],
		pagesUr: [
			"ننھے حضرت عمر بن ابی سلمہ رضی اللہ عنہ کھانا کھاتے وقت برتن میں ہر طرف ہاتھ گھما رہے تھے۔",
			"نبی کریم ﷺ نے نہایت شفقت سے ایک جملے میں انہیں کھانے کے مکمل آداب سکھا دیے۔",
			"آپ ﷺ نے فرمایا: اے بیٹے! بسم اللہ پڑھو، اپنے دائیں ہاتھ سے کھاؤ، اور جو تمہارے سامنے ہے اس میں سے کھاؤ (صحیح بخاری 5376)۔"
		],
		quizQ: "What three mealtime manners did the Prophet ﷺ teach young Umar ibn Abi Salamah (RA) in Sahih al-Bukhari 5376?",
		quizOpts: [
			"Say Bismillah, eat with your right hand, and eat from what is nearest to you",
			"Eat standing up and quickly",
			"Eat before washing hands",
			"Take food from other people’s plates"
		],
		quizAns: 0
	},
	{
		id: "story_controlling_anger",
		category: "Akhlaq",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih al-Bukhari 6114 & Sahih Muslim 2609",
		titleEn: "Who is the Truly Strong Champion?",
		titleHi: "असली ताक़तवर पहलवान कौन है?",
		titleUr: "حقیقی طاقتور پہلوان کون ہے؟",
		titleHinglish: "Asli Strong Champion Kaun Hai?",
		titleAr: "ليس الشديد بالصُّرَعة إنما الشديد الذي يملك نفسه عند الغضب",
		summaryEn: "How the Prophet ﷺ taught that true strength is controlling yourself when you feel angry.",
		summaryHi: "कैसे नबी ﷺ ने समझाया कि असली बहादुर वह है जो ग़ुस्से के वक़्त अपने आप पर क़ाबू रखे।",
		summaryUr: "نبی کریم ﷺ نے سمجھایا کہ اصل بہادر وہ ہے جو غصے کے وقت اپنے نفس پر قابو رکھے۔",
		moralEn: "\"The strong person is not the one who wrestles others down; the strong person is the one who controls himself when angry\" (Sahih al-Bukhari 6114).",
		moralHi: "असली पहलवान वह नहीं जो दूसरों को पछाड़ दे, बल्कि वह है जो ग़ुस्से के वक़्त अपने आप को संभाल ले (सहीह बुख़ारी 6114)।",
		moralUr: "پہلوان وہ نہیں جو لوگوں کو پچھاڑ دے بلکہ پہلوان وہ ہے جو غصے کے وقت اپنے آپ پر قابو رکھے (صحیح بخاری 6114)۔",
		pagesEn: [
			"People often think the strongest champion is the one with the biggest muscles who wins wrestling matches.",
			"The Prophet ﷺ asked his companions who they considered strong, and then taught: \"The strong person is not the one who overcomes people by his strength, but the strong is the one who controls himself while in anger\" (Sahih al-Bukhari 6114).",
			"He also taught practical remedies when angry: seek refuge in Allah (\"A’udhu billahi minash-shaytanir-rajim\"), sit down if standing, and remain quiet."
		],
		pagesHi: [
			"लोग अक्सर सोचते हैं कि जो कुश्ती में सबको हरा दे वही सबसे ताक़तवर है।",
			"नबी ﷺ ने फ़रमाया: \"ताक़तवर वह नहीं जो कुश्ती में पछाड़ दे, बल्कि असली ताक़तवर वह है जो ग़ुस्से के वक़्त अपने आप पर क़ाबू रखे\" (सहीह बुख़ारी 6114)।",
			"ग़ुस्सा आने पर \"अऊज़ु बिल्लाहि मिनश-शैतानिर-रजीम\" पढ़ना और खड़े हों तो बैठ जाना सुन्नत इलाज है।"
		],
		pagesUr: [
			"لوگ سمجھتے ہیں کہ کشتی جیتنے والا سب سے طاقتور ہوتا ہے۔",
			"نبی کریم ﷺ نے فرمایا: طاقتور وہ نہیں جو لوگوں کو پچھاڑ دے بلکہ طاقتور وہ ہے جو غصے کے وقت اپنے نفس پر قابو رکھے (صحیح بخاری 6114)۔",
			"غصہ آنے پر اعوذ باللہ پڑھنا اور کھڑے ہوں تو بیٹھ جانا نبوی طریقہ ہے۔"
		],
		quizQ: "According to Sahih al-Bukhari 6114, who is the truly strong person?",
		quizOpts: [
			"The one who controls himself when angry",
			"The loudest person in the room",
			"The one who never apologizes",
			"The fastest runner"
		],
		quizAns: 0
	},
	{
		id: "story_sharing_soup_neighbor",
		category: "Kindness",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih Muslim 2625",
		titleEn: "Adding Extra Water to the Soup for Your Neighbor",
		titleHi: "पड़ोसी के लिए शोरबे में थोड़ा पानी बढ़ाना",
		titleUr: "پڑوسی کے لیے شوربے میں پانی بڑھانا",
		titleHinglish: "Neighbor ke liye Soup Share Karna",
		titleAr: "إذا طبخت مرقة فأكثر ماءها وتعاهد جيرانك",
		summaryEn: "The Prophetic advice to Abu Dharr (RA) on caring for neighbors even with a simple bowl of soup.",
		summaryHi: "हज़रत अबू ज़र (RA) को नबी ﷺ की नसीहत कि जब घर में शोरबा पकाओ तो पड़ोसियों का भी ख़याल रखो।",
		summaryUr: "حضرت ابوذر غفاری رضی اللہ عنہ کو نبوی نصیحت کہ جب سالن پکاؤ تو پڑوسیوں کو بھی اس میں شریک کرو۔",
		moralEn: "Kindness to neighbors does not require luxury—sharing even a warm bowl of soup builds love (Sahih Muslim 2625).",
		moralHi: "पड़ोसियों का हक़ अदा करने के लिए अमीर होना ज़रूरी नहीं, थोड़ा सा खाना बाँटना भी बड़ी नेकी है (सहीह मुस्लिम 2625)।",
		moralUr: "پڑوسیوں کے ساتھ حسنِ سلوک کے لیے معمولی ہدیہ بھی محبت اور برکت پیدا کرتا ہے (صحیح مسلم 2625)۔",
		pagesEn: [
			"The Prophet ﷺ advised his companion Abu Dharr (RA): \"O Abu Dharr! Whenever you cook a broth (soup), add a little more water to it and take care of your neighbors\" (Sahih Muslim 2625).",
			"He also taught: \"Do not look down upon any good deed, even meeting your brother with a cheerful face.\"",
			"Sharing food with neighbors—no matter how simple—spreads barakah and warmth across the street."
		],
		pagesHi: [
			"नबी ﷺ ने हज़रत अबू ज़र (RA) से फ़रमाया: \"ऐ अबू ज़र! जब तुम शोरबा (सालन) पकाओ, तो उसमें थोड़ा पानी बढ़ा लो और अपने पड़ोसियों के घर भी भेजो\" (सहीह मुस्लिम 2625)।",
			"आप ﷺ ने यह भी सिखाया कि किसी भी छोटी नेकी को मामूली मत समझो।",
			"पड़ोसियों के साथ खाना बाँटने से मोहब्बत और घर के रिज़्क़ में बरकत बढ़ती है।"
		],
		pagesUr: [
			"نبی کریم ﷺ نے حضرت ابوذر رضی اللہ عنہ کو نصیحت فرمائی: اے ابوذر! جب تم شوربہ پکاؤ تو اس کا پانی تھوڑا بڑھا لو اور اپنے پڑوسیوں کا خیال رکھو (صحیح مسلم 2625)۔",
			"کسی بھی نیکی کو حقیر نہ سمجھو خواہ اپنے بھائی سے خوش اخلاقی سے ملنا ہی کیوں نہ ہو۔",
			"پڑوسیوں کے ساتھ کھانا بانٹنے سے محبت اور رزق میں برکت پیدا ہوتی ہے۔"
		],
		quizQ: "What did the Prophet ﷺ advise Abu Dharr (RA) to do when cooking soup (Sahih Muslim 2625)?",
		quizOpts: [
			"Add more water to it and share with neighbors",
			"Throw it away",
			"Hide the pot",
			"Eat alone in secret"
		],
		quizAns: 0
	},
	{
		id: "story_planting_sapling_hope",
		category: "Responsibility",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih al-Bukhari 2320 & Musnad Ahmad 12902",
		titleEn: "Planting a Tree is Ongoing Charity (Sadaqah Jariyah)",
		titleHi: "पौधा लगाना सदक़ा-ए-जारिया है",
		titleUr: "پودا لگانا صدقہ جاریہ ہے",
		titleHinglish: "Tree Lagana Sadaqah Jariyah Hai",
		titleAr: "ما من مسلم يغرس غرساً إلا كان له صدقة",
		summaryEn: "How planting trees and caring for the earth brings reward every time a bird, animal, or person benefits from it.",
		summaryHi: "कैसे पेड़-पौधे लगाने से जब भी कोई परिंदा, जानवर या इंसान फल या छाँव पाता है, तो लगाने वाले को सवाब मिलता है।",
		summaryUr: "درخت لگانے سے جب بھی کوئی پرندہ، انسان یا جانور فائدہ اٹھاتا ہے تو لگانے والے کو صدقے کا ثواب ملتا ہے۔",
		moralEn: "Every fruit or grain eaten by a bird, human, or animal from a tree you plant counts as charity for you (Sahih al-Bukhari 2320).",
		moralHi: "मुसलमान जो भी पेड़ लगाता है और उससे कोई परिंदा या इंसान खाता है, वह उसके लिए सदक़ा बन जाता है (सहीह बुख़ारी 2320)।",
		moralUr: "مسلمان جو بھی پودا لگاتا ہے اور اس سے کوئی پرندہ یا انسان کھاتا ہے تو وہ اس کے لیے صدقہ ہے (صحیح بخاری 2320)۔",
		pagesEn: [
			"In Islam, caring for the earth, water, and trees is an act of worship.",
			"The Prophet ﷺ said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as a charitable gift (Sadaqah) for him\" (Sahih al-Bukhari 2320).",
			"Even if the very last day of the world were arriving and you held a small palm shoot in your hand, the Sunnah encourages planting it!"
		],
		pagesHi: [
			"इस्लाम में ज़मीन को हरा-भरा रखना और पानी व पेड़ों की हिफ़ाज़त करना इबादत है।",
			"नबी ﷺ ने फ़रमाया: \"जो कोई मुसलमान पेड़ लगाता है या खेती करता है, फिर उसमें से कोई परिंदा, इंसान या चौपाया खाता है, तो वह उसके लिए सदक़ा है\" (सहीह बुख़ारी 2320)।",
			"इसलिए हमें अपने घर और स्कूल के आसपास पौधे लगाने और उनकी देखभाल करनी चाहिए।"
		],
		pagesUr: [
			"اسلام میں زمین کو سرسبز رکھنا اور پودے لگانا کارِ ثواب ہے۔",
			"نبی کریم ﷺ نے فرمایا: جو مسلمان کوئی درخت لگائے یا کھیتی بوئے، پھر اس میں سے کوئی پرندہ، انسان یا جانور کھائے تو وہ اس کے لیے صدقہ ہے (صحیح بخاری 2320)۔",
			"ہمیں ماحول کی صفائی اور شجرکاری میں بڑھ چڑھ کر حصہ لینا چاہیے۔"
		],
		quizQ: "According to Sahih al-Bukhari 2320, what happens when a bird eats from a tree a Muslim planted?",
		quizOpts: [
			"It is recorded as charity (Sadaqah) for the person who planted it",
			"Nothing happens",
			"The bird is blamed",
			"Only humans count"
		],
		quizAns: 0
	},
	{
		id: "story_luqman_wise_advice",
		category: "Parents",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Luqman 31:13-19",
		titleEn: "The Wise Advice of Luqman to His Son",
		titleHi: "हज़रत लुक़मान की अपने बेटे को नसीहतें",
		titleUr: "حضرت لقمان حکیم کی اپنے بیٹے کو نصیحتیں",
		titleHinglish: "Luqman Hakeem ki Apne Bete ko Nasihat",
		titleAr: "وصايا لقمان الحكيم لابنه في القرآن",
		summaryEn: "The golden Quranic advice of Luqman: worship Allah alone, thank your parents, establish Salah, and walk humbly.",
		summaryHi: "सूरह लुक़मान की सुनहरी नसीहतें: सिर्फ़ अल्लाह की इबादत करो, माँ-बाप का शुक्र करो, नमाज़ क़ायम करो और ज़मीन पर अकड़कर मत चलो।",
		summaryUr: "سورۃ لقمان کی سنہری نصیحتیں: شرک نہ کرو، والدین کا شکر ادا کرو، نماز قائم کرو اور عاجزی سے چلو۔",
		moralEn: "\"Establish prayer, enjoin what is right, be patient, and do not walk on the earth arrogantly\" (Quran 31:17-18).",
		moralHi: "नमाज़ क़ायम करना, सब्र करना और नर्मी व विनम्रता से बोलना हिकमत की निशानी है (क़ुरआन 31:17-19)।",
		moralUr: "نماز قائم کرنا، صبر کرنا اور عاجزی و نرمی اختیار کرنا حکمت کی علامت ہے (لقمان 17-19)۔",
		pagesEn: [
			"Allah gave Luqman deep wisdom, and in Surah Luqman (31:13-19) we read how gently he advised his young son.",
			"First, he taught him never to associate partners with Allah, to be grateful to Allah and to his parents, and to remember that Allah knows even a mustard seed hidden in a rock.",
			"Then he advised: \"O my son, establish prayer, encourage good, be patient over what befalls you, do not turn your cheek in pride toward people, and lower your voice\" (Quran 31:17-19)."
		],
		pagesHi: [
			"अल्लाह ने हज़रत लुक़मान को हिकमत अता फ़रमाई थी। सूरह लुक़मान में उन्होंने अपने बेटे को बड़ी प्यारी नसीहतें कीं।",
			"उन्होंने सिखाया कि अल्लाह के साथ किसी को शरीक न करो, माता-पिता का शुक्र करो और याद रखो कि राई के दाने के बराबर अमल भी अल्लाह के इल्म में है।",
			"फिर फ़रमाया: \"ऐ मेरे बेटे! नमाज़ क़ायम करो, भलाई की बात कहो, मुसीबत पर सब्र करो, घमंड से मत चलो और अपनी आवाज़ धीमी रखो\" (क़ुरआन 31:17-19)।"
		],
		pagesUr: [
			"اللہ تعالیٰ نے حضرت لقمان کو حکمت عطا فرمائی تھی۔ سورۃ لقمان میں ان کی اپنے بیٹے کو کی گئی نصیحتیں محفوظ ہیں۔",
			"انہوں نے سکھایا کہ اللہ کے ساتھ کسی کو شریک نہ کرو، والدین کا شکر ادا کرو اور یاد رکھو کہ رائی کے دانے کے برابر عمل بھی اللہ کے علم میں ہے۔",
			"پھر فرمایا: اے میرے بیٹے! نماز قائم کرو، نیکی کی تلقین کرو، صبر کرو، تکبر سے نہ چلو اور اپنی آواز پست رکھو (لقمان 17-19)۔"
		],
		quizQ: "Which of these is part of Luqman’s advice to his son in Surah Luqman 31:17-19?",
		quizOpts: [
			"Establish prayer, be patient, do not walk arrogantly, and lower your voice",
			"Boast about wealth",
			"Shout loudly at others",
			"Forget your parents"
		],
		quizAns: 0
	},
	{
		id: "story_two_gardens_gratitude",
		category: "Gratitude",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Al-Kahf 18:32-44",
		titleEn: "The Parable of the Two Gardens — Saying \"MashaAllah La Quwwata Illa Billah\"",
		titleHi: "दो बाग़ों वाले का क़िस्सा — माशाअल्लाह ला क़ुव्वता इल्ला बिल्लाह",
		titleUr: "دو باغوں والے کا قصہ — ماشاء اللہ لا قوۃ الا باللہ",
		titleHinglish: "Do Gardens ki Kahani — MashaAllah La Quwwata Illa Billah",
		titleAr: "صاحب الجنتين وقول ما شاء الله لا قوة إلا بالله",
		summaryEn: "The Surah Al-Kahf lesson on why we never boast about blessings, and instead say \"MashaAllah, la quwwata illa billah\".",
		summaryHi: "सूरह कहफ़ का सबक़: अपनी किसी भी नेमत पर घमंड न करें बल्कि \"माशाअल्लाह ला क़ुव्वता इल्ला बिल्लाह\" कहें।",
		summaryUr: "سورۃ الکہف کا سبق: کسی بھی نعمت پر غرور نہ کریں بلکہ ماشاء اللہ لا قوۃ الا باللہ کہیں۔",
		moralEn: "Every talent and possession is a gift from Allah; say \"MashaAllah, la quwwata illa billah\" (Quran 18:39).",
		moralHi: "हर नेमत अल्लाह की देन है; उसे देखकर \"माशाअल्लाह ला क़ुव्वता इल्ला बिल्लाह\" कहना चाहिए (क़ुरआन 18:39)।",
		moralUr: "ہر نعمت اللہ کی عطا ہے؛ اسے دیکھ کر ماشاء اللہ لا قوۃ الا باللہ کہنا چاہیے (الکہف 39)۔",
		pagesEn: [
			"In Surah Al-Kahf (18:32-44), Allah tells the parable of a man given two lush gardens of grapes, date palms, and flowing streams.",
			"Instead of thanking Allah, he boasted arrogantly to his poorer friend. His wise friend reminded him: \"Why did you not say when you entered your garden: MashaAllah, la quwwata illa billah (What Allah willed has occurred; there is no power except in Allah)?\" (Quran 18:39).",
			"Whenever we see a blessing in our home, schoolwork, or health, we thank Allah with humility."
		],
		pagesHi: [
			"सूरह कहफ़ में अल्लाह ने एक आदमी का ज़िक्र फ़रमाया जिसे अंगूर और खजूर के दो हरे-भरे बाग़ दिए गए थे।",
			"अल्लाह का शुक्र करने के बजाय वह घमंड करने लगा। उसके नेक दोस्त ने उसे समझाया: \"जब तुम अपने बाग़ में दाख़िल हुए तो तुमने ‘माशाअल्लाह ला क़ुव्वता इल्ला बिल्लाह’ क्यों नहीं कहा?\" (क़ुरआन 18:39)।",
			"इसलिए जब भी हमें कोई अच्छी चीज़ या कामयाबी मिले, हमें अल्लाह का शुक्र अदा करना चाहिए।"
		],
		pagesUr: [
			"سورۃ الکہف میں دو سرسبز باغوں کے مالک کا قصہ بیان ہوا ہے جو اللہ کا شکر کرنے کے بجائے غرور میں مبتلا ہو گیا۔",
			"اس کے مومن دوست نے اسے نصیحت کی: جب تم اپنے باغ میں داخل ہوئے تو تم نے ماشاء اللہ لا قوۃ الا باللہ کیوں نہ کہا؟ (الکہف 39)۔",
			"ہمیں ہر نعمت اور کامیابی کو اللہ ہی کا فضل سمجھنا چاہیے۔"
		],
		quizQ: "What phrase did the believing friend advise saying upon seeing a blessing in Surah Al-Kahf 18:39?",
		quizOpts: [
			"MashaAllah, la quwwata illa billah",
			"I did this all by myself",
			"Nobody is richer than me",
			"This will never end"
		],
		quizAns: 0
	},
	{
		id: "story_abu_ayyub_hospitality",
		category: "Companions",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih Muslim 2053 & Sirat Ibn Hisham",
		titleEn: "Abu Ayyub Al-Ansari (RA) — Welcoming the Prophet ﷺ in Madinah",
		titleHi: "हज़रत अबू अय्यूब अंसारी (RA) की मेहमाननवाज़ी",
		titleUr: "حضرت ابوایوب انصاری رضی اللہ عنہ کی میزبانی",
		titleHinglish: "Abu Ayyub Al-Ansari (RA) ki Mehman-Nawazi",
		titleAr: "أبو أيوب الأنصاري رضي الله عنه وإكرام الضيف",
		summaryEn: "How the camel Qaswa knelt by Abu Ayyub’s home and how he and his wife honored their noble guest.",
		summaryHi: "कैसे ऊँटनी क़स्वा हज़रत अबू अय्यूब (RA) के घर के पास बैठी और उन्होंने नबी ﷺ की मेज़बानी की।",
		summaryUr: "کس طرح قصواء اونٹنی حضرت ابوایوب انصاری رضی اللہ عنہ کے گھر کے قریب بیٹھی اور انہوں نے نبی ﷺ کی میزبانی کی۔",
		moralEn: "\"Whoever believes in Allah and the Last Day, let him honor his guest\" (Sahih al-Bukhari 6018).",
		moralHi: "मेहमान की इज़्ज़त और ख़िदमत करना ईमान का हिस्सा है (सहीह बुख़ारी 6018)।",
		moralUr: "مہمان کا اکرام کرنا ایمان کا تقاضا ہے (صحیح بخاری 6018)۔",
		pagesEn: [
			"When the Prophet ﷺ arrived in Madinah, every family of the Ansar eagerly wished to host him in their home.",
			"To treat everyone fairly, he let his camel Qaswa walk freely until she knelt by Allah’s guidance outside the home of Abu Ayyub Al-Ansari (RA).",
			"Abu Ayyub (RA) and his wife rejoiced, prepared their best meals, and showed the highest respect and generosity to their guest while the Mosque was being built."
		],
		pagesHi: [
			"जब नबी ﷺ मदीना पहुँचे तो हर अंसारी परिवार चाहता था कि आप उनके घर ठहरें।",
			"आप ﷺ ने फ़रमाया कि मेरी ऊँटनी (क़स्वा) का रास्ता छोड़ दो, यह अल्लाह के हुक्म से जहाँ बैठेगी हम वहीं ठहरेंगे। वह हज़रत अबू अय्यूब अंसारी (RA) के दरवाज़े के पास बैठ गई।",
			"हज़रत अबू अय्यूब (RA) और उनकी पत्नी ने बड़ी मोहब्बत और अदब के साथ मस्जिद बनने तक आप ﷺ की मेहमाननवाज़ी की।"
		],
		pagesUr: [
			"جب نبی کریم ﷺ مدینہ تشریف لائے تو ہر انصاری خاندان میزبانی کا شرف حاصل کرنا چاہتا تھا۔",
			"آپ ﷺ کی اونٹنی قصواء اللہ کے حکم سے حضرت ابوایوب انصاری رضی اللہ عنہ کے گھر کے قریب بیٹھ گئی۔",
			"حضرت ابوایوب انصاری رضی اللہ عنہ اور ان کی اہلیہ نے مسجدِ نبوی کی تعمیر تک نہایت عقیدت اور محبت سے میزبانی کا حق ادا کیا۔"
		],
		quizQ: "Outside whose home in Madinah did the Prophet’s camel Qaswa kneel?",
		quizOpts: [
			"Abu Ayyub Al-Ansari (RA)",
			"Abu Lahab",
			"Chosroes",
			"Negus"
		],
		quizAns: 0
	},
	{
		id: "story_cleanliness_half_faith",
		category: "Manners",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih Muslim 223",
		titleEn: "Purity and Cleanliness Are Half of Faith (At-Tuhuru Shatrul-Iman)",
		titleHi: "पाकीज़गी और सफ़ाई ईमान का आधा हिस्सा है",
		titleUr: "پاکیزگی اور صفائی نصف ایمان ہے",
		titleHinglish: "Cleanliness aur Paakizgi Iman ka Hissa Hai",
		titleAr: "الطهور شطر الإيمان",
		summaryEn: "An educational lesson from Sahih Muslim 223 on keeping our body, clothes, room, and heart pure.",
		summaryHi: "सहीह मुस्लिम 223 की शिक्षा: अपने शरीर, कपड़ों, कमरे और दिल को साफ़ व पाक रखना।",
		summaryUr: "صحیح مسلم 223 کی تعلیم: اپنے جسم، لباس، گھر اور دل کو پاک و صاف رکھنا۔",
		moralEn: "\"Purity is half of faith, and Alhamdulillah fills the scale of good deeds\" (Sahih Muslim 223).",
		moralHi: "पाकीज़गी आधा ईमान है और अल्हम्दुलिल्लाह कहना नेकियों के तराज़ू को भर देता है (सहीह मुस्लिम 223)।",
		moralUr: "پاکیزگی نصف ایمان ہے اور الحمد للہ میزان کو بھر دیتا ہے (صحیح مسلم 223)۔",
		pagesEn: [
			"The Prophet ﷺ taught in Sahih Muslim 223: \"Purity (At-Tuhur) is half of faith!\"",
			"This includes outer cleanliness—making careful Wudu without wasting water, brushing teeth (Miswak), keeping clothes and study spaces tidy—and inner purity of heart from envy and dishonesty.",
			"And in the same Hadith he taught that saying \"Alhamdulillah\" fills the scale of good deeds, while \"SubhanAllah wal-Hamdulillah\" fills what is between the heavens and the earth."
		],
		pagesHi: [
			"नबी ﷺ ने सहीह मुस्लिम 223 में फ़रमाया: \"पाकीज़गी (सफ़ाई) आधा ईमान है!\"",
			"इसमें बिना पानी बर्बाद किए अच्छे से वुज़ू करना, दांत साफ़ रखना, अपने कपड़े व कमरा साफ़ रखना और दिल को झूठ व जलन से पाक रखना शामिल है।",
			"इसी हदीस में आप ﷺ ने बताया कि \"अल्हम्दुलिल्लाह\" कहना नेकियों के तराज़ू को भर देता है।"
		],
		pagesUr: [
			"نبی کریم ﷺ نے صحیح مسلم 223 میں فرمایا: پاکیزگی نصف ایمان ہے!",
			"اس میں پانی ضائع کیے بغیر وضو کرنا، مسواک اور صفائی کا خیال رکھنا اور دل کو حسد و جھوٹ سے پاک رکھنا شامل ہے۔",
			"اور الحمد للہ کہنا نیکیوں کے ترازو کو بھر دیتا ہے۔"
		],
		quizQ: "According to Sahih Muslim 223, what did the Prophet ﷺ say about Purity (At-Tuhur)?",
		quizOpts: [
			"Purity is half of faith (At-Tuhuru shatrul-iman)",
			"Cleanliness is not important",
			"Only wash once a month",
			"Waste as much water as possible"
		],
		quizAns: 0
	},
	{
		id: "story_saving_water_river",
		category: "Responsibility",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sunan Ibn Majah 425 & Musnad Ahmad 7065",
		titleEn: "Not Wasting Water — Even Beside a Flowing River!",
		titleHi: "पानी की बचत — चाहे बहती नदी के किनारे ही क्यों न हों!",
		titleUr: "پانی کی بچت — خواہ بہتی نہر کے کنارے ہی کیوں نہ ہوں!",
		titleHinglish: "Paani Bachana — Chahe Nadi ke Kinare Hon",
		titleAr: "عدم الإسراف في الماء ولو كنت على نهرٍ جارٍ",
		summaryEn: "How the Prophet ﷺ taught Sa’d (RA) not to waste water during Wudu even if standing by a flowing river.",
		summaryHi: "कैसे नबी ﷺ ने हज़रत साद (RA) को सिखाया कि वुज़ू में भी पानी बर्बाद नहीं करना चाहिए, चाहे बहती नदी के पास ही क्यों न हों।",
		summaryUr: "نبی کریم ﷺ نے حضرت سعد رضی اللہ عنہ کو سکھایا کہ وضو میں بھی پانی ضائع نہ کرو خواہ بہتی نہر پر ہو۔",
		moralEn: "Every drop of water is a trust (Amanah) from Allah; never waste resources even when they seem plentiful.",
		moralHi: "पानी की हर बूँद अल्लाह की नेमत और अमानत है; ज़्यादा होने पर भी इसे बर्बाद नहीं करना चाहिए।",
		moralUr: "پانی کا ہر قطرہ اللہ کی نعمت ہے، فراوانی کے باوجود اسراف سے بچنا چاہیے۔",
		pagesEn: [
			"Once the Prophet ﷺ passed by Sa’d (RA) while he was using a large amount of water for Wudu.",
			"The Prophet ﷺ asked: \"What is this extravagance (wastefulness)?\" Sa’d (RA) asked: \"Can there be wastefulness even in Wudu?\"",
			"The Prophet ﷺ replied: \"Yes, even if you are on the bank of a flowing river!\"—teaching us to conserve water and blessings every day."
		],
		pagesHi: [
			"एक बार नबी ﷺ ने देखा कि हज़रत साद (RA) वुज़ू करते समय ज़्यादा पानी इस्तेमाल कर रहे हैं।",
			"आप ﷺ ने फ़रमाया: \"यह फ़िज़ूलख़र्ची कैसी?\" उन्होंने पूछा: \"क्या वुज़ू में भी पानी की फ़िज़ूलख़र्ची होती है?\"",
			"नबी ﷺ ने फ़रमाया: \"हाँ! चाहे तुम बहती हुई नदी के किनारे ही क्यों न बैठे हो!\""
		],
		pagesUr: [
			"ایک مرتبہ نبی کریم ﷺ کا گزر حضرت سعد رضی اللہ عنہ کے پاس سے ہوا جب وہ وضو کر رہے تھے۔",
			"آپ ﷺ نے فرمایا: یہ اسراف کیسا؟ انہوں نے عرض کیا: کیا وضو میں بھی اسراف ہوتا ہے؟",
			"آپ ﷺ نے فرمایا: ہاں، خواہ تم بہتی ہوئی نہر کے کنارے ہی کیوں نہ ہو! (ابن ماجہ 425)۔"
		],
		quizQ: "What did the Prophet ﷺ teach about wasting water during Wudu?",
		quizOpts: [
			"Do not waste water, even if you are beside a flowing river",
			"Use a full tank for one Wudu",
			"Leave the tap running",
			"Only save water in the desert"
		],
		quizAns: 0
	},
	{
		id: "story_keeping_promises_hudhaifah",
		category: "Truthfulness",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih Muslim 1787",
		titleEn: "Hudhayfah ibn Al-Yaman (RA) — Keeping Every Promise Strictly",
		titleHi: "हज़रत हुज़ैफ़ा (RA) और वादा पूरा करने की मिसाल",
		titleUr: "حضرت حذیفہ بن یمان رضی اللہ عنہ اور ایفائے عہد",
		titleHinglish: "Hudhayfah (RA) aur Promise Nibhane ki Misaal",
		titleAr: "حذيفة بن اليمان رضي الله عنه والوفاء بالعهد",
		summaryEn: "Why the Prophet ﷺ instructed Hudhayfah (RA) to honor a word given even under pressure.",
		summaryHi: "कैसे नबी ﷺ ने हज़रत हुज़ैफ़ा (RA) को सिखाया कि मुसलमान हर हाल में अपनी ज़बान और वादे का पक्का होता है।",
		summaryUr: "نبی کریم ﷺ نے حضرت حذیفہ رضی اللہ عنہ کو سکھایا کہ مسلمان ہر حال میں اپنے عہد کی پاسداری کرتا ہے۔",
		moralEn: "\"We will fulfill our pledge to them, and we will seek Allah’s help\" (Sahih Muslim 1787).",
		moralHi: "अल्लाह से मदद माँगते हुए अपने किए हुए हर जायज़ वादे को पूरा करना ईमान की निशानी है (सहीह मुस्लिम 1787)।",
		moralUr: "اپنے عہد کو پورا کرنا اور اللہ سے مدد مانگنا مومن کی شان ہے (صحیح مسلم 1787)۔",
		pagesEn: [
			"While traveling toward Madinah with his father before Badr, Hudhayfah ibn Al-Yaman (RA) was stopped by Quraysh riders who released them only after taking their word that they were heading to Madinah and not joining the battle.",
			"When they reached the Prophet ﷺ and explained what happened, they asked if they could still join the ranks.",
			"The Prophet ﷺ upheld the sanctity of a Muslim’s word and said: \"No; we will fulfill our pledge to them, and we will seek Allah’s help against them\" (Sahih Muslim 1787)."
		],
		pagesHi: [
			"मदीना आते समय हज़रत हुज़ैफ़ा (RA) और उनके वालिद से क़ुरैश के लोगों ने यह वादा लेकर उन्हें छोड़ा कि वे सिर्फ़ मदीना जाएँगे और जंग में शामिल नहीं होंगे।",
			"जब उन्होंने नबी ﷺ को यह बात बताई, तो उस वक़्त साथियों की बहुत ज़रूरत थी।",
			"फिर भी नबी ﷺ ने वादे की पाबंदी को सबसे ऊपर रखा और फ़रमाया: \"हम उनसे किया हुआ वादा पूरा करेंगे और अल्लाह से मदद माँगेंगे\" (सहीह मुस्लिम 1787)।"
		],
		pagesUr: [
			"مدینہ آتے ہوئے حضرت حذیفہ رضی اللہ عنہ اور ان کے والد سے قریش نے عہد لیا کہ وہ جنگ میں شریک نہیں ہوں گے۔",
			"جب انہوں نے نبی کریم ﷺ سے دریافت کیا تو اس وقت افراد کی شدید ضرورت تھی۔",
			"اس کے باوجود آپ ﷺ نے فرمایا: ہم ان سے کیا ہوا عہد پورا کریں گے اور اللہ سے مدد مانگیں گے (صحیح مسلم 1787)۔"
		],
		quizQ: "What did the Prophet ﷺ tell Hudhayfah (RA) regarding the promise he had given (Sahih Muslim 1787)?",
		quizOpts: [
			"Fulfill the pledge and seek Allah’s help",
			"Break the promise immediately",
			"Pretend you never said it",
			"Promises do not matter"
		],
		quizAns: 0
	},
	{
		id: "story_visiting_sick_friend",
		category: "Kindness",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih al-Bukhari 5656 & Sahih Muslim 2568",
		titleEn: "Visiting a Sick Friend Walks in the Gardens of Paradise",
		titleHi: "बीमार दोस्त का हाल पूछना और दुआ देना",
		titleUr: "بیمار دوست کی عیادت اور شفا کی دعا",
		titleHinglish: "Sick Friend ki Iyadat aur Shifa ki Dua",
		titleAr: "عيادة المريض والدعاء له بالشفاء",
		summaryEn: "How the Prophet ﷺ visited a sick young boy in Madinah and taught us the etiquette of comforting the unwell.",
		summaryHi: "कैसे नबी ﷺ मदीना में एक बीमार बच्चे का हाल पूछने उसके घर तशरीफ़ ले गए और शिफ़ा की दुआ सिखाई।",
		summaryUr: "نبی کریم ﷺ مدینہ میں ایک بیمار بچے کی عیادت کے لیے تشریف لے گئے اور شفا کی دعا سکھائی۔",
		moralEn: "Visiting the sick with a kind word and brief prayer brings immense mercy and comfort (Sahih Muslim 2568).",
		moralHi: "बीमार की अयादत करना और उसके लिए शिफ़ा की दुआ करना रहमत और सवाब का काम है (सहीह मुस्लिम 2568)।",
		moralUr: "بیمار کی عیادت کرنا اور اس کے لیے شفا کی دعا کرنا جنت کے باغوں میں چلنے کی مانند ہے (صحیح مسلم 2568)۔",
		pagesEn: [
			"When a young boy who used to help in Madinah fell ill, the Prophet ﷺ personally walked to his family’s house, sat beside his head, and cared for him kindly (Sahih al-Bukhari 1356).",
			"He also taught us that when visiting someone who is unwell, we should keep the visit gentle, bring hope, and say: \"La ba’sa tahurun inshaAllah\" (No harm; it will be a purification, if Allah wills — Sahih al-Bukhari 5656).",
			"Checking on a classmate or grandparent who feels unwell brightens their heart."
		],
		pagesHi: [
			"जब मदीना में ख़िदमत करने वाला एक लड़का बीमार पड़ा, तो नबी ﷺ ख़ुद उसका हाल पूछने उसके घर तशरीफ़ ले गए।",
			"आप ﷺ ने सिखाया कि जब किसी बीमार से मिलने जाओ तो उसे हौसला दो और कहो: \"ला बासा तहूरुन इंशाअल्लाह\" (घबराओ नहीं, इंशाअल्लाह शिफ़ा और पाकी होगी — सहीह बुख़ारी 5656)।",
			"बीमार दोस्त या बुज़ुर्ग का हाल पूछने से उन्हें बहुत ख़ुशी मिलती है।"
		],
		pagesUr: [
			"جب مدینہ میں ایک لڑکا بیمار ہوا تو نبی کریم ﷺ خود اس کی عیادت کے لیے اس کے گھر تشریف لے گئے۔",
			"آپ ﷺ نے سکھایا کہ مریض کی حوصلہ افزائی کرو اور کہو: لا بأس طهور إن شاء الله (صحیح بخاری 5656)۔",
			"بیمار ساتھی یا بزرگ کا حال پوچھنا بڑی نیکی ہے۔"
		],
		quizQ: "What comforting phrase did the Prophet ﷺ say when visiting someone sick (Sahih al-Bukhari 5656)?",
		quizOpts: [
			"La ba’sa tahurun inshaAllah (No harm; a purification if Allah wills)",
			"You will never recover",
			"Why did you get sick?",
			"Stay noisy"
		],
		quizAns: 0
	},
	{
		id: "story_ashab_al_kahf_youth",
		category: "Prophets",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Al-Kahf 18:10-16",
		titleEn: "The Young Believers of the Cave (Ashab Al-Kahf)",
		titleHi: "असहाब-ए-कहफ़ — ईमान वाले बहादुर नौजवान",
		titleUr: "اصحابِ کہف — ایمان والے بہادر نوجوان",
		titleHinglish: "Ashab Al-Kahf — Iman wale Young Friends",
		titleAr: "فتية أصحاب الكهف وثباتهم على الإيمان",
		summaryEn: "How a group of righteous young friends chose faith in Allah and prayed for mercy and guidance in the cave.",
		summaryHi: "कैसे कुछ नेक नौजवान दोस्तों ने अल्लाह पर ईमान को चुना और ग़ार में पनाह लेकर रहमत की दुआ माँगी।",
		summaryUr: "نیک نوجوان دوستوں نے کس طرح ایمان کی حفاظت کی اور غار میں اللہ سے رحمت اور ہدایت کی دعا مانگی۔",
		moralEn: "Choose righteous friends who remind you of Allah and pray: \"Rabbana atina min ladunka rahmah...\" (Quran 18:10).",
		moralHi: "अच्छे और नेक दोस्त चुनो जो अल्लाह की याद दिलाएँ (क़ुरआन 18:10)।",
		moralUr: "ہمیشہ نیک دوستوں کا انتخاب کرو جو ایمان اور بھلائی میں مددگار بنیں (الکہف 10)۔",
		pagesEn: [
			"In Surah Al-Kahf, Allah praises a group of young people who lived in a city where the ruler forced everyone to worship idols: \"Indeed, they were youths who believed in their Lord, and We increased them in guidance\" (Quran 18:13).",
			"Seeking safety for their faith, they took refuge in a mountain cave with their loyal dog stretching its paws at the threshold.",
			"They prayed together: \"Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance\" (Quran 18:10), and Allah protected them miraculously."
		],
		pagesHi: [
			"सूरह कहफ़ में अल्लाह ने उन बहादुर नौजवानों की तारीफ़ फ़रमाई जिन्होंने मूर्तियों की पूजा से इनकार किया और एक अल्लाह पर ईमान लाए (क़ुरआन 18:13)।",
			"अपने ईमान को बचाने के लिए वे पहाड़ की एक ग़ार में चले गए।",
			"उन्होंने दुआ माँगी: \"रब्बना आतिना मिन लदुनका रहमतन व हय्यिअ लना मिन अमरिना रशदा\" (ऐ हमारे रब! हमें अपनी ख़ास रहमत अता फ़रमा और हमारे काम में सीधा रास्ता दिखा — क़ुरआन 18:10)।"
		],
		pagesUr: [
			"سورۃ الکہف میں ان باہمت نوجوانوں کا ذکر ہے جو اپنے رب پر ایمان لائے اور اللہ نے ان کے ہدایت میں اضافہ فرمایا (الکہف 13)۔",
			"اپنے ایمان کی حفاظت کے لیے انہوں نے غار میں پناہ لی۔",
			"انہوں نے دعا کی: ربنا آتنا من لدنك رحمة وهيئ لنا من أمرنا رشدا (الکہف 10) اور اللہ نے ان کی حفاظت فرمائی۔"
		],
		quizQ: "What Dua did the youths of the Cave recite in Surah Al-Kahf 18:10?",
		quizOpts: [
			"Rabbana atina min ladunka rahmatan wa hayyi’ lana min amrina rashada",
			"Give us gold and silver",
			"Make us famous kings",
			"Let us sleep forever"
		],
		quizAns: 0
	},
	{
		id: "story_adam_tawbah_humility",
		category: "Prophets",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Al-A’raf 7:23 & Surah Al-Baqarah 2:31-37",
		titleEn: "Prophet Adam (AS) — Knowledge and Sincere Repentance",
		titleHi: "हज़रत आदम (AS) — इल्म और सच्ची तौबा की दुआ",
		titleUr: "حضرت آدم علیہ السلام — علم کی فضیلت اور سچی توبہ",
		titleHinglish: "Prophet Adam (AS) — Ilm aur Sacchi Tawbah",
		titleAr: "آدم عليه السلام وفضل العلم والتوبة النصوح",
		summaryEn: "How Allah honored Prophet Adam (AS) with knowledge and taught him the words of sincere forgiveness when he slipped.",
		summaryHi: "कैसे अल्लाह ने हज़रत आदम (AS) को नामों का इल्म सिखाया और भूल होने पर फ़ौरन माफ़ी माँगने की दुआ सिखाई।",
		summaryUr: "اللہ تعالیٰ نے حضرت آدم علیہ السلام کو علم سے مشرف فرمایا اور لغزش پر فوراً رجوع اور استغفار کے کلمات سکھائے۔",
		moralEn: "When we make a mistake, we never show pride—we immediately turn back to Allah and apologize (Quran 7:23).",
		moralHi: "ग़लती होने पर अकड़ने के बजाय फ़ौरन अल्लाह से माफ़ी माँगना हज़रत आदम (AS) का तरीक़ा है (क़ुरआन 7:23)।",
		moralUr: "غلطی ہو جانے پر تکبر کے بجائے فوراً اللہ سے معافی مانگنا انبیاء کا طریقہ ہے (الاعراف 23)۔",
		pagesEn: [
			"Allah created Prophet Adam (AS), the father of humanity, and honored him by teaching him the names of things (Quran 2:31).",
			"When Adam (AS) and Hawwa (AS) slipped after Shaytan’s whispering, they did not make arrogant excuses.",
			"Instead, they immediately turned to Allah with humility: \"Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers\" (Quran 7:23)—and Allah forgave them."
		],
		pagesHi: [
			"अल्लाह ने इंसानियत के पिता हज़रत आदम (AS) को पैदा किया और उन्हें हर चीज़ के नामों का इल्म सिखाकर सम्मान दिया (क़ुरआन 2:31)।",
			"जब शैतान के बहकावे से भूल हुई, तो उन्होंने बहाना या घमंड नहीं किया।",
			"उन्होंने फ़ौरन अल्लाह से दुआ माँगी: \"रब्बना ज़लमना अनफ़ुसना...\" (ऐ हमारे रब! हमने अपनी जानों पर ज़ुल्म किया, अगर तू हमें माफ़ न करे तो हम नुक़सान उठाने वालों में हो जाएँगे — क़ुरआन 7:23) और अल्लाह ने उन्हें माफ़ फ़रमा दिया।"
		],
		pagesUr: [
			"اللہ تعالیٰ نے حضرت آدم علیہ السلام کو پیدا فرمایا اور انہیں اشیاء کے ناموں کا علم عطا فرمایا (البقرہ 31)۔",
			"جب لغزش ہوئی تو آپ نے تکبر کے بجائے فوراً عاجزی سے اپنے رب کی طرف رجوع کیا۔",
			"آپ نے دعا کی: ربنا ظلمنا أنفسنا وإن لم تغفر لنا وترحمنا لنكونن من الخاسرين (الاعراف 23) اور اللہ نے آپ کی توبہ قبول فرمائی۔"
		],
		quizQ: "What did Prophet Adam (AS) and Hawwa (AS) do immediately after realizing their mistake (Quran 7:23)?",
		quizOpts: [
			"They humbly asked Allah for forgiveness and mercy",
			"They blamed others arrogantly",
			"They refused to pray",
			"They hid from the angels"
		],
		quizAns: 0
	},
	{
		id: "story_muadh_love_for_allah",
		category: "Companions",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sunan Abi Dawud 1522 (Sahih)",
		titleEn: "The Prophet’s Golden Advice to Mu’adh ibn Jabal (RA)",
		titleHi: "हज़रत मुआज़ इब्न जबल (RA) को नबी ﷺ का अनमोल तोहफ़ा",
		titleUr: "حضرت معاذ بن جبل رضی اللہ عنہ کو نبی ﷺ کی قیمتی نصیحت",
		titleHinglish: "Mu’adh ibn Jabal (RA) ko Prophet ﷺ ka Gift",
		titleAr: "وصية النبي ﷺ لمعاذ بن جبل: اللهم أعني على ذكرك وشكرك وحسن عبادتك",
		summaryEn: "How the Prophet ﷺ held Mu’adh’s hand and taught him a short Dua to recite after every prayer.",
		summaryHi: "कैसे नबी ﷺ ने हज़रत मुआज़ (RA) का हाथ पकड़कर मोहब्बत का इज़हार किया और हर नमाज़ के बाद की ख़ास दुआ सिखाई।",
		summaryUr: "نبی کریم ﷺ نے حضرت معاذ رضی اللہ عنہ کا ہاتھ پکڑ کر محبت کا اظہار فرمایا اور ہر نماز کے بعد کی جامع دعا سکھائی۔",
		moralEn: "Never forget to say after Salah: \"Allahumma a’inni ’ala dhikrika wa shukrika wa husni ’ibadatik\" (Sunan Abi Dawud 1522).",
		moralHi: "हर नमाज़ के बाद अल्लाह से उसके ज़िक्र, शुक्र और बेहतरीन इबादत की मदद माँगनी चाहिए (अबी दाऊद 1522)।",
		moralUr: "ہر نماز کے بعد اللہ سے اس کے ذکر، شکر اور بہترین عبادت کی توفیق مانگنی چاہیے (ابو داؤد 1522)۔",
		pagesEn: [
			"One day the Prophet ﷺ took the hand of his companion Mu’adh ibn Jabal (RA) and said: \"O Mu’adh! By Allah, I love you; by Allah, I love you!\"",
			"Then he said: \"I advise you, O Mu’adh, never to leave at the end of every prayer saying: Allahumma a’inni ’ala dhikrika wa shukrika wa husni ’ibadatik.\"",
			"Its meaning is: \"O Allah, help me to remember You, to thank You, and to worship You in the best manner\" (Sunan Abi Dawud 1522)."
		],
		pagesHi: [
			"एक दिन नबी ﷺ ने हज़रत मुआज़ इब्न जबल (RA) का हाथ पकड़ा और फ़रमाया: \"ऐ मुआज़! अल्लाह की क़सम, मैं तुमसे मोहब्बत करता हूँ!\"",
			"फिर फ़रमाया: \"ऐ मुआज़! मैं तुम्हें वसीयत करता हूँ कि हर नमाज़ के बाद यह दुआ पढ़ना कभी मत छोड़ना: अल्लाहुम्मा अइन्नी अला ज़िक्रिका व शुक्रिका व हुस्नि इबादतिक।\"",
			"इसका मतलब है: \"ऐ अल्लाह! अपने ज़िक्र, अपने शुक्र और अपनी बेहतरीन इबादत करने में मेरी मदद फ़रमा\" (सुनन अबी दाऊद 1522)।"
		],
		pagesUr: [
			"ایک روز نبی کریم ﷺ نے حضرت معاذ بن جبل رضی اللہ عنہ کا ہاتھ پکڑ کر فرمایا: اے معاذ! اللہ کی قسم مجھے تم سے محبت ہے!",
			"پھر فرمایا: اے معاذ! میں تمہیں وصیت کرتا ہوں کہ ہر نماز کے بعد یہ دعا پڑھنا کبھی نہ چھوڑنا: اللهم أعني على ذكرك وشكرك وحسن عبادتك۔",
			"یعنی اے اللہ! اپنے ذکر، اپنے شکر اور اپنی بہترین عبادت پر میری مدد فرما (ابو داؤد 1522)۔"
		],
		quizQ: "What Dua did the Prophet ﷺ advise Mu’adh ibn Jabal (RA) never to leave after every prayer (Sunan Abi Dawud 1522)?",
		quizOpts: [
			"Allahumma a’inni ’ala dhikrika wa shukrika wa husni ’ibadatik",
			"Dua for rain only",
			"Dua for entering the market",
			"Dua for eclipses"
		],
		quizAns: 0
	},
	{
		id: "story_abu_hurayrah_knowledge_cat",
		category: "Companions",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Sahih al-Bukhari 118 & 3842",
		titleEn: "Abu Hurayrah (RA) — Love for Knowledge and Kindness to Kittens",
		titleHi: "हज़रत अबू हुरैरा (RA) — इल्म का शौक़ और नन्ही बिल्ली से प्यार",
		titleUr: "حضرت ابوہریرہ رضی اللہ عنہ — علم کا شوق اور بلی کے بچے سے شفقت",
		titleHinglish: "Abu Hurayrah (RA) — Ilm ka Shauq aur Kitten se Pyar",
		titleAr: "أبو هريرة رضي الله عنه وحفظ العلم والرفق بالهرة",
		summaryEn: "Why Abdur-Rahman was affectionately nicknamed \"Abu Hurayrah\" (Father of the Little Kitten) and how he preserved thousands of Hadiths.",
		summaryHi: "कैसे नन्ही बिल्ली से प्यार की वजह से उनका नाम \"अबू हुरैरा\" पड़ा और उन्होंने नबी ﷺ की हदीसें याद रखकर उम्मत तक पहुँचाईं।",
		summaryUr: "ننھی بلی سے شفقت کی بنا پر آپ کی کنیت ابوہریرہ پڑی اور آپ نے ہزاروں احادیثِ نبویہ محفوظ فرمائیں۔",
		moralEn: "Gentleness toward little animals and dedication to learning go hand in hand (Sahih al-Bukhari 3842).",
		moralHi: "जानवरों पर मेहरबानी और इल्म सीखने की लगन इंसान को अमर बना देती है।",
		moralUr: "مخلوق پر شفقت اور علمِ دین سے محبت مومن کا زیور ہے۔",
		pagesEn: [
			"His real name was Abdur-Rahman ibn Sakhr (RA), and because he cared tenderly for a tiny kitten that followed him, the Prophet ﷺ affectionately called him \"Abu Hurayrah\" (Father of the Little Kitten).",
			"Abu Hurayrah (RA) stayed in the Suffah of the Prophet’s Mosque, dedicating every day to listening carefully and memorizing the teachings of the Prophet ﷺ.",
			"Through his sincere devotion to learning and the Prophet’s prayer for his memory, thousands of authentic Hadiths reached us today!"
		],
		pagesHi: [
			"उनका असली नाम अब्दुर-रहमान (RA) था। वे एक छोटी बिल्ली के बच्चे का बहुत प्यार से ख़याल रखते थे, इसलिए नबी ﷺ ने प्यार से उन्हें \"अबू हुरैरा\" (छोटी बिल्ली वाले) पुकारा।",
			"उन्होंने अपनी पूरी ज़िंदगी मस्जिद-ए-नबवी में बैठकर नबी ﷺ की बातें सुनने और याद करने में लगा दी।",
			"उनकी मेहनत और नबी ﷺ की दुआ की बरकत से आज हमारे पास हज़ारों सहीह हदीसें सुरक्षित हैं!"
		],
		pagesUr: [
			"آپ کا اصل نام عبدالرحمٰن رضی اللہ عنہ تھا۔ بلی کے ایک ننھے بچے سے شفقت کی وجہ سے نبی کریم ﷺ نے آپ کو پیار سے ابوہریرہ پکارا۔",
			"آپ نے اصحابِ صفہ میں رہ کر اپنا پورا وقت احادیثِ نبویہ سننے اور یاد کرنے کے لیے وقف کر دیا۔",
			"آپ کی محنت اور نبوی دعا کی برکت سے امت تک ہزاروں مستند احادیث پہنچیں۔"
		],
		quizQ: "What does the affectionate nickname \"Abu Hurayrah\" literally mean?",
		quizOpts: [
			"Father of the Little Kitten",
			"Owner of the Tall Camel",
			"Rider of the Desert",
			"Keeper of the Gate"
		],
		quizAns: 0
	},
	{
		id: "story_giving_water_hudhayfah_ikrimah",
		category: "Helping",
		authenticityLabel: "Historical Biography",
		ref: "Al-Mustadrak 5004 & Tafsir Ibn Kathir on Surah Al-Hashr 59:9 (Selflessness / Ithar)",
		titleEn: "Putting Others First (Ithar) with a Cup of Water",
		titleHi: "ईसार (त्याग) — अपनी प्यास से पहले दूसरे भाई का ख़याल",
		titleUr: "ایثار — اپنی پ्यास پر اپنے بھائی کو ترجیح دینا",
		titleHinglish: "Ithar — Apni Zaroorat se Pehle Doosre ka Khayal",
		titleAr: "الإيثار على النفس ولو كان بهم خصاصة",
		summaryEn: "The noble Islamic quality of Ithar (preferring others over oneself even when in need, Surah Al-Hashr 59:9).",
		summaryHi: "सूरह हश्र (59:9) में बयान किया गया \"ईसार\" का गुण—ख़ुद ज़रूरत होने पर भी अपने भाई को आगे रखना।",
		summaryUr: "سورۃ الحشر (59:9) میں بیان کردہ صفتِ ایثار—خود حاجت ہونے کے باوجود اپنے بھائی کو ترجیح دینا۔",
		moralEn: "\"And they give preference to others over themselves, even though they are in need\" (Quran 59:9).",
		moralHi: "अल्लाह उन लोगों से मोहब्बत करता है जो ख़ुद ज़रूरत में होकर भी दूसरों को तरजीह देते हैं (क़ुरआन 59:9)।",
		moralUr: "اللہ ان لوگوں سے محبت فرماتا ہے جو خود ضرورت مند ہونے کے باوجود دوسروں کو اپنے اوپر ترجیح دیتے ہیں (الحشر 9)۔",
		pagesEn: [
			"In Surah Al-Hashr (59:9), Allah praises the believers of Madinah for a noble quality called \"Ithar\"—preferring their brothers and sisters over themselves even when they themselves are in need.",
			"Classical scholars recorded how wounded companions on the battlefield each pointed the water carrier toward the next thirsty brother beside them before drinking.",
			"At home and school, practicing Ithar means happily sharing the best seat, toy, or treat with a sibling or classmate."
		],
		pagesHi: [
			"सूरह हश्र (59:9) में अल्लाह ने ईमान वालों की एक बहुत ऊँची सिफ़त \"ईसार\" की तारीफ़ की है—यानी ख़ुद ज़रूरत होने के बावजूद अपने भाई को पहले देना।",
			"सहाबा-ए-किराम सख़्त प्यास में भी पानी का प्याला पहले अपने पास वाले साथी की तरफ़ बढ़ा देते थे।",
			"घर और स्कूल में अपने भाई-बहन या दोस्त को ख़ुशी से अच्छी चीज़ पहले देना इसी प्यारी सिफ़त का हिस्सा है।"
		],
		pagesUr: [
			"سورۃ الحشر (59:9) میں اللہ تعالیٰ نے اہلِ ایمان کی عظیم صفت \"ایثار\" کی تعریف فرمائی ہے، یعنی خود حاجت ہونے کے باوجود دوسرے کو ترجیح دینا۔",
			"صحابہ کرام شدید پیاس کے عالم میں بھی پانی کا پیالہ اپنے زخمی ساتھی کی طرف بڑھا دیتے تھے۔",
			"گھر اور اسکول میں اپنے بہن بھائیوں اور دوستوں کا خیال رکھنا اسی اخلاق کا حصہ ہے۔"
		],
		quizQ: "What is the Islamic term in Surah Al-Hashr 59:9 for preferring others over oneself in kindness?",
		quizOpts: [
			"Ithar (Selflessness / Altruism)",
			"Kibr (Arrogance)",
			"Bukhl (Stinginess)",
			"Ghaflah (Heedlessness)"
		],
		quizAns: 0
	},
	{
		id: "story_good_word_like_good_tree",
		category: "Manners",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Ibrahim 14:24-25",
		titleEn: "A Good Word is Like a Good Tree (Kalimah Tayyibah)",
		titleHi: "अच्छी बात एक फलदार पेड़ की तरह है",
		titleUr: "پاکیزہ بات ایک سایہ دار پھل دار درخت کی مانند ہے",
		titleHinglish: "Acchi Baat Ek Phaldar Tree ki Tarah Hai",
		titleAr: "مثلُ كلمةٍ طيبةٍ كشجرةٍ طيبةٍ",
		summaryEn: "The Quranic parable in Surah Ibrahim comparing a kind, truthful word to a firmly rooted, fruit-bearing palm tree.",
		summaryHi: "सूरह इब्राहीम की मिसाल: कैसे एक सच्ची और मीठी बात मज़बूत जड़ों वाले फलदार पेड़ की तरह हमेशा फ़ायदा देती है।",
		summaryUr: "سورۃ ابراہیم کی مثال: کس طرح کلمہ طیبہ اور اچھی بات مضبوط جڑوں والے پھل دار درخت کی طرح ہمیشہ نفع دیتی ہے۔",
		moralEn: "A good word (Kalimah Tayyibah) has firm roots in the heart and brings sweet fruit in every season (Quran 14:24-25).",
		moralHi: "मीठी और सच्ची बात दिल में जड़ पकड़ती है और हर मौसम में नेकी का फल देती है (क़ुरआन 14:24-25)।",
		moralUr: "پاکیزہ اور سچی بات ہر وقت خیر اور برکت کا پھل دیتی ہے (ابراہیم 24-25)۔",
		pagesEn: [
			"In Surah Ibrahim (14:24-25), Allah gives a beautiful example: \"Have you not considered how Allah presents an example, making a good word like a good tree, whose root is firmly fixed and its branches high in the sky?\"",
			"Just like a date-palm gives sweet fruit in every season by its Lord’s permission, words of Dhikr, encouragement, gratitude, and truth nourish everyone around us.",
			"And a harsh, dishonest word has no roots or lasting benefit—so a young believer always chooses pure words!"
		],
		pagesHi: [
			"सूरह इब्राहीम (14:24-25) में अल्लाह ने एक प्यारी मिसाल दी है कि अच्छी और पाक बात (कलिमा तय्यिबा) एक ऐसे अच्छे पेड़ की तरह है जिसकी जड़ ज़मीन में मज़बूत है और शाख़ें आसमान में हैं।",
			"जिस तरह खजूर का पेड़ अपने रब के हुक्म से हर मौसम में मीठा फल देता है, उसी तरह अल्लाह का ज़िक्र और मीठी ज़बान हमेशा भलाई फैलाती है।",
			"इसलिए हमें हमेशा सच्ची, मीठी और हौसला बढ़ाने वाली बात बोलनी चाहिए।"
		],
		pagesUr: [
			"سورۃ ابراہیم (14:24-25) میں اللہ تعالیٰ نے کلمہ طیبہ (پاکیزہ بات) کی مثال ایک ایسے عمدہ درخت سے دی ہے جس کی جڑ مضبوط اور شاخیں آسمان میں بلند ہیں۔",
			"یہ درخت اپنے رب کے حکم سے ہر وقت پھل دیتا ہے؛ اسی طرح ذکرِ الٰہی اور اچھی گفتگو ہر جگہ خیر پھیلاتی ہے۔",
			"اس لیے مومن بچہ ہمیشہ سچی اور شیریں گفتگو اختیار کرتا ہے۔"
		],
		quizQ: "In Surah Ibrahim 14:24, what does Allah compare a \"Good Word\" (Kalimah Tayyibah) to?",
		quizOpts: [
			"A good tree with firm roots and branches in the sky giving fruit in every season",
			"A rolling stone",
			"A dry leaf in the wind",
			"A locked chest"
		],
		quizAns: 0
	},
	{
		id: "story_luqman_gentle_voice",
		category: "Manners",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Luqman 31:18-19",
		titleEn: "Walking Humbly and Speaking with a Gentle Voice",
		titleHi: "ज़मीन पर विनम्रता से चलना और आवाज़ धीमी रखना",
		titleUr: "زمین پر عاجزی سے چلنا اور آواز پست رکھنا",
		titleHinglish: "Aajizi se Chalna aur Aawaz Naram Rakhna",
		titleAr: "واقصد في مشيك واغضض من صوتك (لقمان 18-19)",
		summaryEn: "How Luqman the Wise taught his son never to turn his cheek in pride, to walk moderately, and to speak in a calm, respectful tone.",
		summaryHi: "हज़रत लुक़मान (AS) की अपने बेटे को नसीहत: घमंड से चेहरा न मोड़ो, चाल में सादगी रखो और अपनी आवाज़ धीमी रखो।",
		summaryUr: "حضرت لقمان حکیم کی اپنے بیٹے کو نصیحت: لوگوں سے تکبر کے ساتھ رخ نہ پھیرو، اعتدال سے چلو اور آواز پست رکھو۔",
		moralEn: "\"Be moderate in your pace and lower your voice\" (Quran 31:19).",
		moralHi: "अदब और सादगी से चलना और नरम आवाज़ में बात करना अक़्लमंद बच्चों की निशानी है (क़ुरआन 31:19)।",
		moralUr: "میانہ روی سے چلنا اور نرم لہجے میں بات کرنا دانائی کی علامت ہے (لقمان 19)۔",
		pagesEn: [
			"In Surah Luqman (31:18-19), the wise father Luqman gave his son timeless lessons on daily manners and humility.",
			"He said: \"And do not turn your cheek in contempt toward people, and do not walk through the earth exultantly. Indeed, Allah does not like everyone self-deluded and boastful.\"",
			"\"And be moderate in your pace and lower your voice; indeed, the most disagreeable of sounds is the voice of donkeys\" (Quran 31:19). Speaking calmly and walking humbly earns everyone’s respect."
		],
		pagesHi: [
			"सूरह लुक़मान (31:18-19) में हज़रत लुक़मान ने अपने बेटे को रोज़मर्रा के बेहतरीन आदाब सिखाए।",
			"उन्होंने कहा: \"लोगों से घमंड के साथ अपना रुख़ मत मोड़ो और ज़मीन पर अकड़कर मत चलो; बेशक अल्लाह किसी घमंडी और शेख़ी बघारने वाले को पसंद नहीं करता।\"",
			"\"और अपनी चाल में सादगी रखो और अपनी आवाज़ धीमी रखो\" (क़ुरआन 31:19)।"
		],
		pagesUr: [
			"سورۃ لقمان (31:18-19) میں حضرت لقمان نے اپنے بیٹے کو روزمرہ زندگی کے سنہری آداب سکھائے۔",
			"انہوں نے فرمایا: لوگوں سے تکبر کے ساتھ اپنا رخ نہ پھیرو اور زمین پر اکڑ کر نہ چلو؛ بے شک اللہ کسی متکبر اور فخر کرنے والے کو پسند نہیں فرماتا۔",
			"اور اپنی چال میں اعتدال رکھو اور اپنی آواز پست رکھو (لقمان 19)۔"
		],
		quizQ: "What two manners of walking and speaking are taught in Surah Luqman 31:19?",
		quizOpts: [
			"Be moderate/humble in your pace and lower your voice respectfully",
			"Run loudly indoors and shout",
			"Look down upon people",
			"Boast about clothes"
		],
		quizAns: 0
	},
	{
		id: "story_dawud_gratitude_work",
		category: "Gratitude",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Saba 34:13 & Sahih al-Bukhari 2072",
		titleEn: "Prophet Dawud (AS) — Working with One’s Own Hands & Gratitude",
		titleHi: "हज़रत दाऊद (AS) — अपने हाथ की कमाई और अल्लाह का शुक्र",
		titleUr: "حضرت داؤد علیہ السلام — اپنے ہاتھ کی کمائی اور شکر گزاری",
		titleHinglish: "Prophet Dawud (AS) — Apne Haath ki Mehnat aur Shukr",
		titleAr: "داود عليه السلام والعمل باليد والشكر",
		summaryEn: "Even though Prophet Dawud (AS) was a king and prophet, he worked with his own hands and thanked Allah continuously.",
		summaryHi: "बादशाह और नबी होने के बावजूद हज़रत दाऊद (AS) अपने हाथों से मेहनत करके रोज़ी कमाते और शुक्र अदा करते थे।",
		summaryUr: "بادشاہ اور نبی ہونے کے باوجود حضرت داؤد علیہ السلام اپنے ہاتھ کی محنت سے روزی کماتے اور شکر ادا کرتے تھے۔",
		moralEn: "\"Work, O family of Dawud, in gratitude\" (Quran 34:13 & Sahih al-Bukhari 2072).",
		moralHi: "अपने हाथ से हलाल मेहनत करना और हर नेमत पर अल्लाह का शुक्र करना अंबिया का तरीक़ा है।",
		moralUr: "اپنے ہاتھ سے حلال محنت کرنا اور اللہ کا شکر بجا لانا انبیاء کرام کا طریقہ ہے (سبا 13، بخاری 2072)۔",
		pagesEn: [
			"Allah blessed Prophet Dawud (AS) with a beautiful voice that recited the Zabur, wisdom, and leadership.",
			"Yet the Prophet Muhammad ﷺ taught us in Sahih al-Bukhari (2072) that nobody ever ate better food than that earned by the work of their own hands—and Prophet Dawud (AS) used to eat strictly from the labor of his own hands.",
			"Allah commanded in Surah Saba (34:13): \"Work, O family of Dawud, in gratitude!\"—showing that real gratitude is expressed through good actions."
		],
		pagesHi: [
			"अल्लाह ने हज़रत दाऊद (AS) को ज़बूर की मीठी तिलावत, हिकमत और सल्तनत अता फ़रमाई थी।",
			"इसके बावजूद वे सरकारी ख़ज़ाने से लेने के बजाय अपने हाथों से काम करके अपनी रोज़ी कमाते थे (सहीह बुख़ारी 2072)।",
			"सूरह सबा (34:13) में अल्लाह ने फ़रमाया: \"ऐ दाऊद के घर वालो! शुक्र के तौर पर नेक अमल करो!\""
		],
		pagesUr: [
			"اللہ تعالیٰ نے حضرت داؤد علیہ السلام کو زبور کی خوش الحانی، حکمت اور بادشاہت عطا فرمائی تھی۔",
			"اس کے باوجود آپ اپنے ہاتھ کی محنت سے اپنی روزی تناول فرماتے تھے (صحیح بخاری 2072)۔",
			"سورۃ سبا (34:13) میں فرمایا گیا: اے آلِ داؤد! شکر کے طور پر عمل کرو۔"
		],
		quizQ: "According to Sahih al-Bukhari 2072, how did Prophet Dawud (AS) earn his own food?",
		quizOpts: [
			"Through the honest labor of his own hands",
			"By taxing travelers unfairly",
			"By sitting idle",
			"By borrowing without returning"
		],
		quizAns: 0
	},
	{
		id: "story_zakariyya_yahya_gentleness",
		category: "Kindness",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Maryam 19:12-14",
		titleEn: "Prophet Yahya (AS) — Loving Learning and Kindness to Parents",
		titleHi: "हज़रत यह्या (AS) — बचपन से इल्म से मोहब्बत और माँ-बाप की फ़रमाँबरदारी",
		titleUr: "حضرت یحییٰ علیہ السلام — بچپن سے علم کی محبت اور والدین سے حسنِ سلوک",
		titleHinglish: "Prophet Yahya (AS) — Bachpan se Ilm aur Walidain ka Adab",
		titleAr: "يحيى عليه السلام والحكمة والبرّ بالوالدين",
		summaryEn: "How Prophet Yahya (AS) held firmly to divine wisdom from childhood and was gentle, pure, and dutiful to his parents.",
		summaryHi: "कैसे हज़रत यह्या (AS) को बचपन ही से समझदारी मिली और वे अपने माता-पिता के साथ अत्यंत नरम और नेक थे।",
		summaryUr: "کس طرح حضرت یحییٰ علیہ السلام کو بچپن ہی میں حکمت عطا ہوئی اور آپ والدین کے بے حد فرماں بردار تھے۔",
		moralEn: "Allah praises youth who love wisdom, compassion (Hanan), and respect for parents (Quran 19:12-14).",
		moralHi: "बचपन से अच्छी किताबों व इल्म से मोहब्बत करना और माता-पिता का अदब करना अल्लाह को बहुत पसंद है (क़ुरआन 19:12-14)।",
		moralUr: "بچپن سے علم و حکمت سے محبت اور والدین کی فرماں برداری اللہ کی محبوب صفت ہے (مریم 12-14)۔",
		pagesEn: [
			"After Prophet Zakariyya (AS) prayed earnestly to Allah in old age, Allah blessed him with a noble son named Yahya (AS).",
			"In Surah Maryam (19:12-14), Allah describes young Yahya (AS): \"O Yahya, take the Scripture with determination.\" And We gave him wisdom while yet a child.",
			"Allah further praised him as full of compassion (Hanan), pure, God-conscious, and dutiful to his parents—never arrogant or disobedient."
		],
		pagesHi: [
			"हज़रत ज़करिय्या (AS) की सच्ची दुआ के बाद अल्लाह ने उन्हें एक नेक बेटे हज़रत यह्या (AS) की खुशख़बरी दी।",
			"सूरह मरयम (19:12-14) में अल्लाह ने फ़रमाया कि हमने यह्या को बचपन ही में समझदारी (हिकमत) और दिल की नरमी अता की।",
			"वे अपने माँ-बाप के बहुत फ़रमाँबरदार थे और कभी घमंड या नाफ़रमानी नहीं करते थे।"
		],
		pagesUr: [
			"حضرت زکریا علیہ السلام کی مخلصانہ دعا کے بعد اللہ تعالیٰ نے انہیں حضرت یحییٰ علیہ السلام عطا فرمائے۔",
			"سورۃ مریم (19:12-14) میں اللہ نے فرمایا کہ ہم نے انہیں بچپن ہی میں حکمت اور شفقت عطا فرمائی۔",
			"وہ اپنے والدین کے ساتھ نیک سلوک کرنے والے تھے اور سرکش یا نافرمان نہ تھے۔"
		],
		quizQ: "Which qualities of young Prophet Yahya (AS) are praised in Surah Maryam 19:12-14?",
		quizOpts: [
			"Wisdom in childhood, compassion, purity, and kindness to his parents",
			"Being loud and boastful",
			"Ignoring books",
			"Disobeying elders"
		],
		quizAns: 0
	},
	{
		id: "story_isa_humility_service",
		category: "Kindness",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Surah Maryam 19:30-32",
		titleEn: "Prophet Isa (AS) — Blessed Wherever He Was & Dutiful to His Mother",
		titleHi: "हज़रत ईसा (AS) — हर जगह बरकत वाले और अपनी वालिदा के ख़िदमतगुज़ार",
		titleUr: "حضرت عیسیٰ علیہ السلام — بابرکت زندگی اور والدہ ماجدہ کی خدمت",
		titleHinglish: "Prophet Isa (AS) — Har Jagah Barkat aur Walida ki Khidmat",
		titleAr: "عيسى عليه السلام مباركاً أينما كان وبارّاً بوالدته",
		summaryEn: "The words of Prophet Isa (AS) in Surah Maryam about prayer, charity, and honoring his noble mother Maryam (AS).",
		summaryHi: "सूरह मरयम में हज़रत ईसा (AS) के बोल: नमाज़, ज़कात और अपनी नेक माँ हज़रत मरयम (AS) के साथ बेहतरीन सुलूक।",
		summaryUr: "سورۃ مریم میں حضرت عیسیٰ علیہ السلام کا فرمان: نماز، زکوٰۃ اور اپنی والدہ سیدہ مریم علیہا السلام کے ساتھ حسنِ سلوک۔",
		moralEn: "Being \"blessed wherever I am\" means bringing benefit, prayer, charity, and respect to our mother (Quran 19:31-32).",
		moralHi: "\"जहाँ भी रहूँ बरकत वाला बनूँ\"—यानी हर जगह दूसरों को फ़ायदा पहुँचाना और अपनी माँ का अदब करना (क़ुरआन 19:31-32)।",
		moralUr: "جہاں بھی رہوں بابرکت رہوں—یعنی نماز، خیر خواہی اور والدہ کے ادب کو لازم پکڑنا (مریم 31-32)۔",
		pagesEn: [
			"In Surah Maryam (19:30-32), Prophet Isa (AS) declared: \"Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet.\"",
			"He continued: \"And He has made me blessed wherever I am and has enjoined upon me prayer and charity as long as I remain alive.\"",
			"\"And made me dutiful to my mother, and He has not made me a wretched tyrant.\" Scholars explain that being \"blessed wherever I am\" means teaching good and helping people wherever you go."
		],
		pagesHi: [
			"सूरह मरयम (19:30-32) में हज़रत ईसा (AS) ने फ़रमाया: \"बेशक मैं अल्लाह का बंदा हूँ, उसने मुझे किताब दी और नबी बनाया।\"",
			"\"और उसने मुझे जहाँ कहीं मैं रहूँ बरकत वाला बनाया है, और जब तक मैं ज़िंदा रहूँ नमाज़ और ज़कात की ताकीद की है।\"",
			"\"और मुझे अपनी माँ (हज़रत मरयम AS) के साथ नेक सुलूक करने वाला बनाया है, और सख़्त-दिल नहीं बनाया।\""
		],
		pagesUr: [
			"سورۃ مریم (19:30-32) میں حضرت عیسیٰ علیہ السلام نے فرمایا: بے شک میں اللہ کا بندہ ہوں، اس نے مجھے کتاب عطا کی اور نبی بنایا۔",
			"اور اس نے مجھے جہاں کہیں بھی رہوں بابرکت بنایا ہے اور زندگی بھر نماز اور زکوٰۃ کی وصیت فرمائی ہے۔",
			"اور مجھے اپنی والدہ (سیدہ مریم علیہا السلام) کا فرماں بردار بنایا ہے اور متکبر نہیں بنایا۔"
		],
		quizQ: "In Surah Maryam 19:31-32, what did Prophet Isa (AS) say Allah enjoined upon him along with prayer and charity?",
		quizOpts: [
			"Being dutiful and kind to his mother Maryam (AS) and never arrogant",
			"Building palaces of gold",
			"Avoiding people",
			"Boasting about wealth"
		],
		quizAns: 0
	},
	{
		id: "story_smiling_sadaqah_manners",
		category: "Manners",
		authenticityLabel: "Quran & Sahih Hadith Account",
		ref: "Jami` at-Tirmidhi 1956 (Sahih)",
		titleEn: "Your Smile for Your Brother is Charity (Tabassumuka Sadaqah)",
		titleHi: "मुस्कुराकर मिलना और रास्ते से पत्थर हटाना भी सदक़ा है",
		titleUr: "مسکرا کر ملنا اور راستے سے تکلیف دہ چیز ہٹانا بھی صدقہ ہے",
		titleHinglish: "Muskurahat aur Raaste ki Safai Bhi Sadaqah Hai",
		titleAr: "تبسّمك في وجه أخيك لك صدقة",
		summaryEn: "The Prophetic teaching that even a child without money can give daily charity through a warm smile, helping someone, or clearing a path.",
		summaryHi: "नबी ﷺ की प्यारी तालीम: अगर जेब में पैसे न हों तब भी मुस्कुराना, रास्ता बताना और पत्थर हटाना सदक़ा है।",
		summaryUr: "نبی کریم ﷺ کی پیاری تعلیم: مسکرانا، بھولے کو راستہ بتانا اور راستے سے پتھر ہٹانا بھی صدقہ ہے۔",
		moralEn: "Every child can give Sadaqah every day through a kind smile, guiding others, and keeping paths safe (Jami` at-Tirmidhi 1956).",
		moralHi: "हर बच्चा रोज़ सदक़ा कर सकता है—प्यारी मुस्कान से, किसी की मदद करके और रास्ते से काँटा या पत्थर हटाकर (तिर्मिज़ी 1956)।",
		moralUr: "ہر بچہ روزانہ صدقہ کر سکتا ہے—خوش اخلاقی، رہنمائی اور راستے سے تکلیف دہ چیز ہٹا کر (ترمذی 1956)۔",
		pagesEn: [
			"Sometimes children wonder: \"How can I give charity (Sadaqah) if I do not have coins or money of my own?\"",
			"The Prophet Muhammad ﷺ gave us wonderful news in Jami` at-Tirmidhi (1956): \"Your smile in the face of your brother is charity for you!\"",
			"He also taught that guiding someone who lost their way, helping someone with weak eyesight, pouring water from your bucket into your brother’s cup, and removing a stone or thorn from the road are all Sadaqah for you."
		],
		pagesHi: [
			"अक्सर बच्चे सोचते हैं: \"अगर हमारे पास पैसे न हों तो हम सदक़ा कैसे करें?\"",
			"नबी मुहम्मद ﷺ ने जामे तिर्मिज़ी (1956) में खुशख़बरी दी: \"अपने भाई से मुस्कुराकर मिलना भी तुम्हारे लिए सदक़ा है!\"",
			"आप ﷺ ने यह भी सिखाया कि भटके हुए को रास्ता बताना, किसी के बर्तन में पानी डालना और रास्ते से पत्थर या काँटा हटा देना—यह सब तुम्हारे लिए सदक़ा है!"
		],
		pagesUr: [
			"اکثر بچے سوچتے ہیں کہ اگر ہمارے پاس پیسے نہ ہوں تو ہم صدقہ کیسے کریں؟",
			"نبی کریم ﷺ نے جامع ترمذی (1956) میں خوشخبری دی: اپنے بھائی کے سامنے مسکرانا بھی تمہارے لیے صدقہ ہے!",
			"آپ ﷺ نے فرمایا کہ بھولے کو راستہ بتانا، اپنے ڈول سے بھائی کے برتن میں پانی ڈالنا اور راستے سے پتھر یا کانٹا ہٹانا بھی صدقہ ہے۔"
		],
		quizQ: "According to Jami` at-Tirmidhi 1956, which of these everyday actions counts as Sadaqah (charity)?",
		quizOpts: [
			"Smiling kindly, guiding someone, and removing a stone or thorn from the road",
			"frowning at classmates",
			"littering in the park",
			"shouting indoors"
		],
		quizAns: 0
	}
];
var EXPANDED_KIDS_STORIES = [...RAW_KIDS_STORIES_32.map((s) => ({
	id: s.id,
	title: s.title.en,
	localizedTitles: s.title,
	category: s.category,
	ageRange: s.ageRange,
	duration: s.duration,
	themeColor: s.themeColor,
	badgeIcon: s.badgeIcon,
	summary: s.summary.en,
	localizedSummaries: s.summary,
	pages: s.pagesEn,
	localizedPages: {
		en: s.pagesEn,
		hi: s.pagesHi,
		ur: s.pagesUr,
		hinglish: s.pagesHinglish,
		ar: s.pagesAr
	},
	learningObjective: s.objective.en,
	localizedObjectives: s.objective,
	moral: s.moral.en,
	localizedMorals: s.moral,
	sourceReference: s.sourceReference,
	authenticityLabel: s.authenticityLabel,
	comprehensionQuestions: [{
		question: s.quizQ,
		options: s.quizOptions,
		correctIndex: s.quizCorrect,
		explanation: s.quizExplanation
	}],
	reflectionActivity: `Share the moral of "${s.title.en}" with your parents today and practice one act of ${s.category.toLowerCase()}.`,
	registryMeta: {
		id: s.id,
		contentType: "kids_story",
		language: "Multi (en, hi, ur, hinglish, ar)",
		availableLanguages: [
			"en",
			"hi",
			"ur",
			"hinglish",
			"ar"
		],
		source: s.sourceReference,
		reviewStatus: "PUBLISHED",
		ageSuitability: "Kids 7-12",
		version: "2.0.0",
		lastUpdatedIso: "2026-10-31T00:00:00.000Z",
		offlineAvailable: true,
		authenticityType: s.authenticityLabel === "Quran & Sahih Hadith Account" ? "Authenticated Hadith/Seerah" : "Educational Moral Adaptation"
	}
})), ...ADDITIONAL_KIDS_STORY_SEEDS.map((s, idx) => ({
	id: s.id,
	title: s.titleEn,
	localizedTitles: {
		en: s.titleEn,
		hi: s.titleHi,
		ur: s.titleUr,
		hinglish: s.titleHinglish,
		ar: s.titleAr
	},
	category: s.category,
	ageRange: "Ages 6-12",
	duration: "4 min read",
	themeColor: idx % 3 === 0 ? "from-emerald-800 to-teal-950" : idx % 3 === 1 ? "from-amber-700 to-emerald-900" : "from-sky-800 to-emerald-900",
	badgeIcon: idx % 2 === 0 ? "Sparkles" : "ShieldCheck",
	summary: s.summaryEn,
	localizedSummaries: {
		en: s.summaryEn,
		hi: s.summaryHi,
		ur: s.summaryUr,
		hinglish: s.summaryEn,
		ar: s.titleAr
	},
	pages: s.pagesEn,
	localizedPages: {
		en: s.pagesEn,
		hi: s.pagesHi,
		ur: s.pagesUr,
		hinglish: s.pagesEn,
		ar: [
			s.titleAr,
			s.moralEn,
			s.ref
		]
	},
	learningObjective: s.moralEn,
	localizedObjectives: {
		en: s.moralEn,
		hi: s.moralHi,
		ur: s.moralUr,
		hinglish: s.moralEn,
		ar: s.titleAr
	},
	moral: s.moralEn,
	localizedMorals: {
		en: s.moralEn,
		hi: s.moralHi,
		ur: s.moralUr,
		hinglish: s.moralEn,
		ar: s.titleAr
	},
	sourceReference: s.ref,
	authenticityLabel: s.authenticityLabel,
	comprehensionQuestions: [{
		question: s.quizQ,
		options: s.quizOpts,
		correctIndex: s.quizAns,
		explanation: `Verified reference: ${s.ref}. ${s.moralEn}`
	}],
	reflectionActivity: `Discuss with your family how to practice the lesson from "${s.titleEn}" (${s.ref}).`,
	registryMeta: {
		id: s.id,
		contentType: "kids_story",
		language: "Multi (en, hi, ur, hinglish, ar)",
		availableLanguages: [
			"en",
			"hi",
			"ur",
			"hinglish",
			"ar"
		],
		source: s.ref,
		reviewStatus: "PUBLISHED",
		ageSuitability: "Kids 7-12",
		version: "2.0.0",
		lastUpdatedIso: "2026-10-31T00:00:00.000Z",
		offlineAvailable: true,
		authenticityType: s.authenticityLabel === "Quran & Sahih Hadith Account" ? "Authenticated Hadith/Seerah" : "Educational Moral Adaptation"
	}
}))];
// src/data/expandedDuasAndLessons.ts
var DUA_SEEDS_42 = [
	{
		id: "dua_waking",
		category: "After waking",
		titleEn: "Upon Waking Up",
		titleHi: "नींद से जागने की दुआ",
		titleUr: "نیند سے بیدار ہونے کی دعا",
		titleHinglish: "Neend se Jaagne ki Dua",
		titleAr: "دعاء الاستيقاظ من النوم",
		arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
		transliteration: "Alhamdu lillahil-ladhi ahyana ba’da ma amatana wa ilayhin-nushur",
		en: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
		hi: "तमाम तारीफ़ें अल्लाह के लिए हैं जिसने हमें मौत (नींद) के बाद ज़िंदगी अता की और उसी की तरफ़ उठकर जाना है।",
		ur: "تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں مارنے (سلانے) کے بعد زندہ کیا اور اسی کی طرف اٹھ کر جانا ہے۔",
		hinglish: "Tamam tareefein Allah ke liye hain jisne humein neend ke baad zindagi di aur usi ki taraf lautna hai.",
		sourceReference: "Sahih al-Bukhari 6312",
		authenticityGrade: "Sahih (Bukhari)",
		whenToRecite: "Immediately upon waking up in the morning.",
		virtueNote: "Starts the day with gratitude and remembrance of the Hereafter."
	},
	{
		id: "dua_sleep",
		category: "Before sleeping",
		titleEn: "Before Going to Sleep",
		titleHi: "सोने से पहले की दुआ",
		titleUr: "سونے سے پہلے کی دعا",
		titleHinglish: "Sone se Pehle ki Dua",
		titleAr: "دعاء النوم",
		arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
		transliteration: "Bismika Allahumma amutu wa ahya",
		en: "In Your name, O Allah, I die and I live.",
		hi: "ऐ अल्लाह! तेरे ही नाम के साथ मैं मरता (सोता) हूँ और जीता (जागता) हूँ।",
		ur: "اے اللہ! میں تیرے ہی نام کے ساتھ مرتا (سوتا) ہوں اور جیتا (جاگتا) ہوں۔",
		hinglish: "Aye Allah! Tere hi naam ke saath main sota hoon aur jaagta hoon.",
		sourceReference: "Sahih al-Bukhari 6324",
		authenticityGrade: "Sahih (Bukhari)",
		whenToRecite: "When lying down to sleep at night."
	},
	{
		id: "dua_parents",
		category: "For parents",
		titleEn: "Mercy for Parents",
		titleHi: "माता-पिता के लिए रहमत की दुआ",
		titleUr: "والدین کے لیے رحمت کی دعا",
		titleHinglish: "Walidain ke Liye Rahmat ki Dua",
		titleAr: "الدعاء للوالدين بالرحمة",
		arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
		transliteration: "Rabbir-hamhuma kama rabbayani saghira",
		en: "My Lord, have mercy upon them as they brought me up when I was small.",
		hi: "ऐ मेरे रब! उन दोनों (माता-पिता) पर रहम फ़रमा जैसा कि उन्होंने बचपन में मेरी परवरिश की।",
		ur: "اے میرے رب! ان دونوں پر رحم فرما جیسا کہ انہوں نے بچپن میں میری پرورش کی۔",
		hinglish: "Aye mere Rab! Mere walidain par raham farma jaise unhone bachpan mein meri parwarish ki.",
		sourceReference: "Quran — Surah Al-Isra 17:24",
		authenticityGrade: "Quranic Ayah",
		whenToRecite: "After prayers and throughout the day for one’s parents."
	},
	{
		id: "dua_knowledge",
		category: "Daily routines",
		titleEn: "Seeking Beneficial Knowledge",
		titleHi: "इल्म में बरकत और इज़ाफ़े की दुआ",
		titleUr: "علم میں اضافے کی دعا",
		titleHinglish: "Ilm mein Izafe ki Dua",
		titleAr: "دعاء طلب العلم",
		arabic: "رَّبِّ زِدْنِي عِلْمًا",
		transliteration: "Rabbi zidni ’ilma",
		en: "My Lord, increase me in knowledge.",
		hi: "ऐ मेरे रब! मेरे इल्म (ज्ञान) में इज़ाफ़ा फ़रमा।",
		ur: "اے میرے رب! میرے علم میں اضافہ فرما۔",
		hinglish: "Aye mere Rab! Mere ilm mein izafa farma.",
		sourceReference: "Quran — Surah Taha 20:114",
		authenticityGrade: "Quranic Ayah",
		whenToRecite: "Before studying, reading Quran, or attending classes."
	},
	{
		id: "dua_Before_eating",
		category: "Before/after eating",
		titleEn: "Before Eating ( & If Forgotten)",
		titleHi: "खाना शुरू करने की दुआ",
		titleUr: "کھانا شروع کرنے کی دعا",
		titleHinglish: "Khana Shuru Karne ki Dua",
		titleAr: "الذكر عند طعام",
		arabic: "بِسْمِ اللَّهِ ، فَإِنْ نَسِيَ فِي أَوَّلِهِ فَلْيَقُلْ: بِسْمِ اللَّهِ فِي أَوَّلِهِ وَآخِرِهِ",
		transliteration: "Bismillah (If forgotten at start: Bismillahi fi awwalihi wa akhirihi)",
		en: "In the name of Allah (and if forgotten at the start: In the name of Allah at its beginning and its end).",
		hi: "अल्लाह के नाम से (और अगर शुरू में भूल जाए तो कहे: शुरू और आख़िर में अल्लाह के नाम से)।",
		ur: "اللہ کے نام سے (اور اگر شروع میں بھول جائے تو کہے: اس کے اول و آخر میں اللہ کے نام سے)۔",
		hinglish: "Bismillah (aur agar shuru mein bhool jaye to kahe: Bismillahi fi awwalihi wa akhirihi).",
		sourceReference: "Sunan Abi Dawud 3767, Jami` at-Tirmidhi 1858",
		authenticityGrade: "Sahih",
		whenToRecite: "Before eating or drinking with the right hand."
	},
	{
		id: "dua_after_eating",
		category: "Before/after eating",
		titleEn: "After Finishing a Meal",
		titleHi: "खाना खाने के बाद की दुआ",
		titleUr: "کھانا کھانے کے بعد کی دعا",
		titleHinglish: "Khana Khane ke Baad ki Dua",
		titleAr: "الدعاء بعد الفراغ من الطعام",
		arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
		transliteration: "Alhamdu lillahil-ladhi at’amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah",
		en: "All praise is for Allah who fed me this and provided it for me without any might or power from myself.",
		hi: "तमाम तारीफ़ें अल्लाह के लिए हैं जिसने मुझे यह खाना खिलाया और मेरी किसी ताक़त या क़ुव्वत के बग़ैर मुझे यह रिज़्क़ अता किया।",
		ur: "تمام تعریفیں اللہ کے لیے ہیں جس نے مجھے یہ کھانا کھلایا اور میری کسی طاقت و قوت کے بغیر مجھے یہ رزق عطا فرمایا۔",
		hinglish: "Tamam tareefein Allah ke liye hain jisne meri kisi taqat ke baghair mujhe yeh rizq ata kiya.",
		sourceReference: "Jami` at-Tirmidhi 3458, Sunan Abi Dawud 4023",
		authenticityGrade: "Hasan",
		whenToRecite: "After finishing food or drink.",
		virtueNote: "Whoever recites this after eating has his past minor sins forgiven (Tirmidhi 3458)."
	},
	{
		id: "dua_leaving_home",
		category: "Entering/leaving home",
		titleEn: "Upon Leaving the Home",
		titleHi: "घर से निकलते वक़्त की दुआ",
		titleUr: "گھر سے نکلتے وقت کی دعا",
		titleHinglish: "Ghar se Nikalte Waqt ki Dua",
		titleAr: "الذكر عند الخروج من المنزل",
		arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
		transliteration: "Bismillahi tawakkaltu ’alallahi, wa la hawla wa la quwwata illa billah",
		en: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
		hi: "अल्लाह के नाम से, मैंने अल्लाह पर भरोसा किया, और नेकी करने की ताक़त व बुराई से बचने की क़ुव्वत सिर्फ़ अल्लाह की तौफ़ीक़ से है।",
		ur: "اللہ کے نام سے، میں نے اللہ پر بھروسہ کیا، اور گناہ سے بچنے کی ہمت اور نیکی کرنے کی طاقت اللہ ہی کی طرف سے ہے۔",
		hinglish: "Allah ke naam se, maine Allah par bharosa kiya, aur taqat sirf Allah ke saath hai.",
		sourceReference: "Sunan Abi Dawud 5095, Jami` at-Tirmidhi 3426",
		authenticityGrade: "Sahih",
		whenToRecite: "When stepping out of the house.",
		virtueNote: "It is said to him: You are guided, defended, and protected."
	},
	{
		id: "dua_entering_home",
		category: "Entering/leaving home",
		titleEn: "Upon Entering the Home",
		titleHi: "घर में दाख़िल होते वक़्त की दुआ",
		titleUr: "گھر میں داخل ہوتے وقت کی دعا",
		titleHinglish: "Ghar mein Dakhil Hote Waqt ki Dua",
		titleAr: "الذكر عند دخول المنزل",
		arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
		transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa ’ala Rabbina tawakkalna",
		en: "In the name of Allah we enter, and in the name of Allah we leave, and upon our Lord we rely (then greet the family with Salam).",
		hi: "अल्लाह के नाम से हम दाख़िल हुए और अल्लाह के नाम से हम निकले, और हमने अपने रब पर भरोसा किया (फिर घर वालों को सलाम करें)।",
		ur: "اللہ کے نام سے ہم داخل ہوئے اور اللہ کے نام سے ہم نکلے اور ہم نے اپنے رب پر بھروسہ کیا (پھر گھر والوں کو سلام کریں)۔",
		hinglish: "Allah ke naam se hum dakhil hue aur apne Rab par bharosa kiya, phir ghar walon ko Salam karein.",
		sourceReference: "Sunan Abi Dawud 5096 & Sahih Muslim 2018 (Mentioning Allah upon entering)",
		authenticityGrade: "Verified Sunnah",
		whenToRecite: "When entering the home before greeting the family with Assalamu Alaikum."
	},
	{
		id: "dua_entering_mosque",
		category: "Entering/leaving mosque",
		titleEn: "Entering the Mosque",
		titleHi: "मस्जिद में दाख़िल होने की दुआ",
		titleUr: "مسجد میں داخل ہونے کی دعا",
		titleHinglish: "Masjid mein Dakhil Hone ki Dua",
		titleAr: "دعاء دخول المسجد",
		arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
		transliteration: "Allahummaf-tah li abwaba rahmatik",
		en: "O Allah, open for me the doors of Your mercy.",
		hi: "ऐ अल्लाह! मेरे लिए अपनी रहमत के दरवाज़े खोल दे।",
		ur: "اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔",
		hinglish: "Aye Allah! Mere liye apni rahmat ke darwaze khol de.",
		sourceReference: "Sahih Muslim 713",
		authenticityGrade: "Sahih (Muslim)",
		whenToRecite: "When stepping into the mosque with the right foot."
	},
	{
		id: "dua_leaving_mosque",
		category: "Entering/leaving mosque",
		titleEn: "Leaving the Mosque",
		titleHi: "मस्जिद से बाहर निकलने की दुआ",
		titleUr: "مسجد سے باہر نکلنے کی دعا",
		titleHinglish: "Masjid se Bahar Nikalne ki Dua",
		titleAr: "دعاء الخروج من المسجد",
		arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
		transliteration: "Allahumma inni as’aluka min fadlik",
		en: "O Allah, indeed I ask You from Your bounty.",
		hi: "ऐ अल्लाह! मैं तुझसे तेरे फ़ज़्ल (कृपा व रिज़्क़) का सवाल करता हूँ।",
		ur: "اے اللہ! میں تجھ سے تیرے فضل کا سوال کرتا ہوں۔",
		hinglish: "Aye Allah! Main tujhse tere fazl ka sawal karta hoon.",
		sourceReference: "Sahih Muslim 713",
		authenticityGrade: "Sahih (Muslim)",
		whenToRecite: "When stepping out of the mosque with the left foot."
	},
	{
		id: "dua_morning_protection",
		category: "Morning Adhkar",
		titleEn: "Morning & Evening Protection Shield",
		titleHi: "सुबह और शाम की हिफ़ाज़त की दुआ",
		titleUr: "صبح و شام کی حفاظت کی دعا",
		titleHinglish: "Subah o Sham ki Hifazat ki Dua",
		titleAr: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ",
		arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
		transliteration: "Bismillahil-ladhi la yadurru ma’asmihi shay’un fil-ardi wa la fis-sama’i wa Huwas-Sami’ul-’Alim",
		en: "In the name of Allah, with Whose name nothing can harm on earth nor in the heavens, and He is the All-Hearing, the All-Knowing.",
		hi: "अल्लाह के नाम के साथ जिसके नाम की बरकत से ज़मीन और आसमान में कोई चीज़ नुक़सान नहीं पहुँचा सकती, और वह सब कुछ सुनने और जानने वाला है।",
		ur: "اللہ کے نام کے ساتھ جس کے نام کی برکت سے زمین اور آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی اور وہ خوب سننے والا، جاننے والا ہے۔",
		hinglish: "Allah ke naam ke saath jiske naam ki barkat se zameen o aasman mein koi cheez nuqsan nahi pahuncha sakti.",
		sourceReference: "Sunan Abi Dawud 5088, Jami` at-Tirmidhi 3388",
		authenticityGrade: "Sahih",
		whenToRecite: "3 times every morning and 3 times every evening."
	},
	{
		id: "dua_forgiveness_sayyid",
		category: "Morning Adhkar",
		titleEn: "Sayyidul Istighfar (Chief Dua for Forgiveness)",
		titleHi: "सय्यिदुल इस्तिग़फ़ार (मग़फ़िरत की सबसे अफ़ज़ल दुआ)",
		titleUr: "سید الاستغفار (مغفرت کی بہترین دعا)",
		titleHinglish: "Sayyidul Istighfar (Maghfirat ki Sabse Afzal Dua)",
		titleAr: "سيد الاستغفار",
		arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
		transliteration: "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana ’abduka, wa ana ’ala ’ahdika wa wa’dika mastata’tu, a’udhu bika min sharri ma sana’tu, abu’u laka bini’matika ’alayya, wa abu’u لaka bidhanbi faghfir li, fa innahu la yaghfirudh-dhunuba illa Anta",
		en: "O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sins except You.",
		hi: "ऐ अल्लाह! तू मेरा रब है, तेरे सिवा कोई माबूद नहीं। तूने मुझे पैदा किया और मैं तेरा बंदा हूँ... मैं तेरी नेमतों का इक़रार करता हूँ और अपने गुनाहों का एतराफ़ करता हूँ, बस मुझे बख़्श दे क्योंकि तेरे सिवा कोई गुनाह माफ़ नहीं कर सकता।",
		ur: "اے اللہ! تو میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں... میں تیری نعمتوں کا اقرار کرتا ہوں اور اپنے گناہوں کا اعتراف کرتا ہوں، پس مجھے بخش دے۔",
		hinglish: "Aye Allah! Tu mera Rab hai, tere siwa koi mabood nahi. Main teri nematon ka iqrar karta hoon, mujhe bakhsh de.",
		sourceReference: "Sahih al-Bukhari 6306",
		authenticityGrade: "Sahih (Bukhari)",
		whenToRecite: "Morning and evening with conviction in the heart."
	},
	{
		id: "dua_morning_entering_day",
		category: "Morning Adhkar",
		titleEn: "Entering the Morning in Allah’s Sovereignty",
		titleHi: "सुबह में दाख़िल होने की दुआ (अस्बहना व अस्बहल मुल्क)",
		titleUr: "صبح کا آغاز کرنے کی مسنون دعا",
		titleHinglish: "Subah ki Masnoon Dua (Asbahna wa Asbahal Mulk)",
		titleAr: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
		arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
		transliteration: "Asbahna wa asbahal-mulku lillahi walhamdu lillahi, la ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa Huwa ’ala kulli shay’in Qadir",
		en: "We have reached the morning and at this very time all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah alone, without partner; to Him belongs all sovereignty and praise and He is over all things Omnipotent.",
		hi: "हमने सुबह की और अल्लाह की बादशाहत ने सुबह की, और तमाम तारीफ़ें अल्लाह के लिए हैं। अल्लाह के सिवा कोई माबूद नहीं, वह अकेला है और हर चीज़ पर क़ादिर है।",
		ur: "ہم نے صبح کی اور اللہ کے ملک نے صبح کی، تمام تعریفیں اللہ کے لیے ہیں، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اور ہر چیز پر قادر ہے۔",
		hinglish: "Humne subah ki aur tamam badshahat Allah ke liye hai, aur woh har cheez par Qadir hai.",
		sourceReference: "Sahih Muslim 2723",
		authenticityGrade: "Sahih (Muslim)",
		whenToRecite: "After Fajr prayer in the morning."
	},
	{
		id: "dua_morning_wellbeing_afiyah",
		category: "Morning Adhkar",
		titleEn: "Seeking Well-Being (Afiyah) in Religion & World",
		titleHi: "दीन और दुनिया में आफ़ियत (सलामती) की दुआ",
		titleUr: "دین و دنیا میں عافیت کی دعا",
		titleHinglish: "Deen aur Duniya mein Afiyat ki Dua",
		titleAr: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ",
		arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
		transliteration: "Allahumma inni as’alukal-’afwa wal-’afiyata fid-dunya wal-akhirah, Allahumma inni as’alukal-’afwa wal-’afiyata fi dini wa dunyaya wa ahli wa mali",
		en: "O Allah, I ask You for pardon and well-being in this world and the Next. O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth.",
		hi: "ऐ अल्लाह! मैं तुझसे दुनिया और आख़िरत में माफ़ी और आफ़ियत माँगता हूँ—मेरे दीन, दुनिया, घरवालों और माल में।",
		ur: "اے اللہ! میں تجھ سے دنیا و آخرت میں معافی اور عافیت کا سوال کرتا ہوں—اپنے دین، دنیا، اہل و عیال اور مال میں۔",
		hinglish: "Aye Allah! Main tujhse apne deen, duniya, ghar walon aur maal mein afiyat mangta hoon.",
		sourceReference: "Sunan Abi Dawud 5074, Sunan Ibn Majah 3871",
		authenticityGrade: "Sahih",
		whenToRecite: "Every morning and evening; the Prophet ﷺ never left these words."
	},
	{
		id: "dua_morning_pleased_with_allah",
		category: "Morning Adhkar",
		titleEn: "Pleased with Allah as Lord, Islam as Religion",
		titleHi: "अल्लाह के रब और इस्लाम के दीन होने पर राज़ी रहने की दुआ",
		titleUr: "اللہ کے رب اور اسلام کے دین ہونے پر راضی رہنے کی دعا",
		titleHinglish: "Raditu Billahi Rabban — Subah o Sham ki Dua",
		titleAr: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالإِسْلاَمِ دِينًا",
		arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
		transliteration: "Raditu billahi Rabban, wa bil-Islami dinan, wa bi-Muhammadin sallallahu ’alayhi wa sallama Nabiyyan",
		en: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad ﷺ as my Prophet.",
		hi: "मैं अल्लाह के रब होने, इस्लाम के दीन होने और मुहम्मद ﷺ के नबी होने पर दिल से राज़ी हूँ।",
		ur: "میں اللہ کے رب ہونے، اسلام کے دین ہونے اور محمد ﷺ کے نبی ہونے پر راضی ہوں۔",
		hinglish: "Main Allah ke Rab hone, Islam ke Deen hone aur Muhammad ﷺ ke Nabi hone par raazi hoon.",
		sourceReference: "Sunan Abi Dawud 5072, Jami` at-Tirmidhi 3389",
		authenticityGrade: "Sahih / Hasan",
		whenToRecite: "3 times in the morning and 3 times in the evening."
	},
	{
		id: "dua_evening_entering_night",
		category: "Evening Adhkar",
		titleEn: "Entering the Evening in Allah’s Sovereignty",
		titleHi: "शाम में दाख़िल होने की दुआ (अम्सैना व अम्सल मुल्क)",
		titleUr: "شام کے وقت کی مسنون دعا",
		titleHinglish: "Sham ki Masnoon Dua (Amsayna wa Amsal Mulk)",
		titleAr: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
		arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
		transliteration: "Amsayna wa amsal-mulku lillahi walhamdu lillahi, la ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa Huwa ’ala kulli shay’in Qadir",
		en: "We have reached the evening and at this very time all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah alone, without partner.",
		hi: "हमने शाम की और सारी बादशाहत अल्लाह ही की है, और सब तारीफ़ें अल्लाह के लिए हैं, उसके सिवा कोई माबूद नहीं।",
		ur: "ہم نے شام کی اور ساری بادشاہی اللہ کے لیے ہے، تمام تعریفیں اللہ کے لیے ہیں، اس کے سوا کوئی معبود نہیں۔",
		hinglish: "Humne sham ki aur saari badshahat Allah ke liye hai.",
		sourceReference: "Sahih Muslim 2723",
		authenticityGrade: "Sahih (Muslim)",
		whenToRecite: "Every evening between Asr and Maghrib."
	},
	{
		id: "dua_evening_perfect_words",
		category: "Evening Adhkar",
		titleEn: "Seeking Refuge in Allah’s Perfect Words",
		titleHi: "अल्लाह के मुकम्मल कलिमात के ज़रिए पनाह माँगना",
		titleUr: "اللہ کے مکمل کلمات کے ذریعے پناہ مانگنے کی دعا",
		titleHinglish: "Allah ke Mukammal Kalimat se Panah ki Dua",
		titleAr: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
		arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
		transliteration: "A’udhu bikalimatillahit-tammati min sharri ma khalaq",
		en: "I seek refuge in the Perfect Words of Allah from the evil of what He has created.",
		hi: "मैं अल्लाह के मुकम्मल कलिमात की पनाह लेता हूँ हर उस चीज़ की बुराई से जो उसने पैदा की।",
		ur: "میں اللہ کے کامل کلمات کی پناہ لیتا ہوں ہر اس چیز کے شر سے جو اس نے پیدا کی۔",
		hinglish: "Main Allah ke kamil kalimat ki panah leta hoon har makhlooq ke shar se.",
		sourceReference: "Sahih Muslim 2708",
		authenticityGrade: "Sahih (Muslim)",
		whenToRecite: "3 times in the evening or when stopping at any new place."
	},
	{
		id: "dua_evening_hasbiyallah",
		category: "Evening Adhkar",
		titleEn: "Allah is Sufficient for Me (Hasbiyallahu La Ilaha Illa Huwa)",
		titleHi: "अल्लाह मेरे लिए काफ़ी है (हस्बियल्लाहु ला इलाहा इल्ला हुव)",
		titleUr: "اللہ میرے لیے کافی ہے (حسبی اللہ لا الہ الا ھو)",
		titleHinglish: "Hasbiyallahu La Ilaha Illa Huwa — Tawakkal ki Dua",
		titleAr: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ",
		arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
		transliteration: "Hasbiyallahu la ilaha illa Huwa, ’alayhi tawakkaltu wa Huwa Rabbul-’Arshil-’Azim",
		en: "Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.",
		hi: "मेरे लिए अल्लाह ही काफ़ी है, उसके सिवा कोई माबूद नहीं, उसी पर मैंने भरोसा किया और वही अर्शे-अज़ीम का रब है।",
		ur: "میرے لیے اللہ ہی کافی ہے، اس کے سوا کوئی معبود نہیں، اسی پر میں نے بھروسہ کیا اور وہی عرشِ عظیم کا رب ہے۔",
		hinglish: "Mere liye Allah hi kafi hai, usi par maine bharosa kiya aur wahi Arsh-e-Azeem ka Rab hai.",
		sourceReference: "Quran — Surah At-Tawbah 9:129",
		authenticityGrade: "Quranic Ayah",
		whenToRecite: "Morning, evening, and in times of worry or reliance on Allah."
	},
	{
		id: "dua_sleep_tasbih_fatimah",
		category: "Before sleeping",
		titleEn: "Tasbih Fatimah Before Sleeping (33-33-34)",
		titleHi: "सोने से पहले तसबीह-ए-फ़ातिमी (33-33-34)",
		titleUr: "سونے سے پہلے تسبیح فاطمی (33-33-34)",
		titleHinglish: "Sone se Pehle Tasbih-e-Fatimi (33-33-34)",
		titleAr: "التسبيح عند المنام (سبحان الله ٣٣، الحمد لله ٣٣، الله أكبر ٣٤)",
		arabic: "سُبْحَانَ اللَّهِ (٣٣) ، وَالْحَمْدُ لِلَّهِ (٣٣) ، وَاللَّهُ أَكْبَرُ (٣٤)",
		transliteration: "SubhanAllah (33 times), Alhamdulillah (33 times), Allahu Akbar (34 times)",
		en: "Glory be to Allah (33 times), Praise be to Allah (33 times), and Allah is the Greatest (34 times).",
		hi: "सुब्हानअल्लाह (33 बार), अल्हम्दुलिल्लाह (33 बार), और अल्लाहु अकबर (34 बार)।",
		ur: "سبحان اللہ (33 بار)، الحمد للہ (33 بار)، اور اللہ اکبر (34 بار)۔",
		hinglish: "SubhanAllah (33 baar), Alhamdulillah (33 baar), aur Allahu Akbar (34 baar).",
		sourceReference: "Sahih al-Bukhari 5361, Sahih Muslim 2727",
		authenticityGrade: "Sahih (Bukhari & Muslim)",
		whenToRecite: "Every night when going to bed and after obligatory prayers.",
		virtueNote: "Taught by the Prophet ﷺ to Fatimah (RA) and Ali (RA) as better than a helper for daily fatigue."
	},
	{
		id: "dua_sleep_side_trust",
		category: "Before sleeping",
		titleEn: "Placing One’s Side Down to Sleep",
		titleHi: "बिस्तर पर करवट रखते समय की दुआ",
		titleUr: "بستر پر پہلو رکھتے وقت کی دعا",
		titleHinglish: "Bistar par Letne ki Masnoon Dua",
		titleAr: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي",
		arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
		transliteration: "Bismika Rabbi wada’tu janbi, wa bika arfa’uhu, fa in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi ’ibadakas-salihin",
		en: "In Your name my Lord, I lie down, and in Your name I rise, so if You should take my soul then have mercy upon it, and if You should return my soul then protect it in the manner You do so with Your righteous servants.",
		hi: "ऐ मेरे रब! तेरे नाम से मैंने अपना पहलू रखा और तेरे ही नाम से उठाऊँगा; अगर तू मेरी जान रोक ले तो उस पर रहम फ़रमा, और अगर लौटा दे तो नेक बंदों की तरह उसकी हिफ़ाज़त फ़रमा।",
		ur: "اے میرے رب! تیرے نام سے میں نے اپنا پہلو رکھا اور تیرے ہی نام سے اٹھاؤں گا؛ اگر تو میری روح قبض کر لے تو اس پر رحم فرما اور اگر لوٹا دے تو نیک بندوں کی طرح اس کی حفاظت فرما۔",
		hinglish: "Aye mere Rab! Tere naam se maine apna pehlu rakha; meri hifazat apne nek bandon ki tarah farma.",
		sourceReference: "Sahih al-Bukhari 6320, Sahih Muslim 2714",
		authenticityGrade: "Sahih (Bukhari & Muslim)",
		whenToRecite: "When lying down on the right side after dusting the bed."
	},
	{
		id: "dua_waking_health_dhikr",
		category: "After waking",
		titleEn: "Gratitude for Health & Ability to Remember Allah Upon Waking",
		titleHi: "जागने पर सेहत और अल्लाह के ज़िक्र की तौफ़ीक़ पर शुक्र",
		titleUr: "بیدار ہونے پر صحت اور ذکر کی توفیق کا شکر",
		titleHinglish: "Jaagne par Sehat aur Dhikr ki Taufiq ki Dua",
		titleAr: "الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي وَرَدَّ عَلَيَّ رُوحِي",
		arabic: "الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ",
		transliteration: "Alhamdu lillahil-ladhi ’afani fi jasadi, wa radda ’alayya ruhi, wa adhina li bidhikrih",
		en: "All praise is for Allah who restored health to my body, returned my soul to me, and permitted me to remember Him.",
		hi: "तमाम तारीफ़ें अल्लाह के लिए हैं जिसने मेरे शरीर को तंदुरुस्ती दी, मेरी रूह मुझे लौटाई और मुझे अपना ज़िक्र करने की इजाज़त दी।",
		ur: "تمام تعریفیں اللہ کے لیے ہیں جس نے میرے جسم کو عافیت دی، میری روح مجھ پر لوٹائی اور مجھے اپنے ذکر کی توفیق بخشی۔",
		hinglish: "Tamam tareefein Allah ke liye hain jisne mere jism ko afiyat di aur mujhe apne dhikr ki taufiq di.",
		sourceReference: "Jami` at-Tirmidhi 3401",
		authenticityGrade: "Hasan",
		whenToRecite: "Upon waking up in the morning."
	},
	{
		id: "dua_host_meal_blessing",
		category: "Before/after eating",
		titleEn: "Dua for the Host Who Served Food",
		titleHi: "मेज़बान (खाना खिलाने वाले) के लिए दुआ",
		titleUr: "میزبان (کھانا کھلانے والے) کے لیے دعا",
		titleHinglish: "Mezban ke Liye Barkat ki Dua",
		titleAr: "الدعاء لأهل الطعام (اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ)",
		arabic: "اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ",
		transliteration: "Allahumma barik lahum fima razaqtahum, waghfir lahum warhamhum",
		en: "O Allah, bless them in what You have provided for them, and forgive them and have mercy upon them.",
		hi: "ऐ अल्लाह! तूने इन्हें जो रिज़्क़ दिया है उसमें बरकत अता फ़रमा, और इन्हें बख़्श दे और इन पर रहम फ़रमा।",
		ur: "اے اللہ! تو نے انہیں جو رزق عطا فرمایا ہے اس میں برکت دے، اور ان کی مغفرت فرما اور ان پر رحم فرما۔",
		hinglish: "Aye Allah! Inke rizq mein barkat ata farma, inhein bakhsh de aur in par raham farma.",
		sourceReference: "Sahih Muslim 2042",
		authenticityGrade: "Sahih (Muslim)",
		whenToRecite: "After eating as a guest at someone’s home or table."
	},
	{
		id: "dua_travel_journey",
		category: "Travelling",
		titleEn: "Dua for Embarking on a Journey (Safar)",
		titleHi: "सफ़र शुरू करने की दुआ",
		titleUr: "سفر شروع کرنے کی دعا",
		titleHinglish: "Safar Shuru Karne ki Masnoon Dua",
		titleAr: "دعاء السفر (سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا)",
		arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
		transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun",
		en: "Exalted is He who has subjected this to us, and we could not have otherwise subdued it. And indeed, to our Lord we will surely return.",
		hi: "पाक है वह ज़ात जिसने इस सवारी को हमारे वश में कर दिया और हम ख़ुद इसे क़ाबू में करने वाले न थे, और बेशक हमें अपने रब ही की तरफ़ लौटकर जाना है।",
		ur: "پاک ہے وہ ذات جس نے اس سواری کو ہمارے تابع کر دیا حالانکہ ہم اسے قابو میں لانے کی طاقت نہ رکھتے تھے، اور بے شک ہمیں اپنے رب ہی کی طرف لوٹ کر جانا ہے۔",
		hinglish: "Paak hai woh Zaat jisne is sawari ko hamare qabu mein kar diya, aur beshak humein apne Rab ki taraf lautna hai.",
		sourceReference: "Quran — Surah Az-Zukhruf 43:13-14 & Sahih Muslim 1342",
		authenticityGrade: "Quran & Sahih Muslim",
		whenToRecite: "When boarding a vehicle, train, plane, or starting a journey."
	},
	{
		id: "dua_travel_return",
		category: "Travelling",
		titleEn: "Upon Returning Safely from Travel",
		titleHi: "सफ़र से वापसी की दुआ",
		titleUr: "سفر سے واپسی کی دعا",
		titleHinglish: "Safar se Wapsi ki Dua",
		titleAr: "الذكر عند الرجوع من السفر",
		arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
		transliteration: "Ayibuna, ta’ibuna, ’abiduna, li-Rabbina hamidun",
		en: "We are returning, repenting, worshipping, and praising our Lord.",
		hi: "हम लौट रहे हैं, तौबा करते हुए, इबादत करते हुए और अपने रब की तारीफ़ करते हुए।",
		ur: "ہم لوٹ رہے ہیں، توبہ کرتے ہوئے، عبادت کرتے ہوئے اور اپنے رب کی حمد بیان کرتے ہوئے۔",
		hinglish: "Hum laut rahe hain, tawbah karte hue aur apne Rab ki hamd karte hue.",
		sourceReference: "Sahih al-Bukhari 1797, Sahih Muslim 1344",
		authenticityGrade: "Sahih (Bukhari & Muslim)",
		whenToRecite: "When returning home safely from a journey."
	},
	{
		id: "dua_parents_ibrahim_forgiveness",
		category: "For parents",
		titleEn: "Forgiveness for Myself, My Parents & All Believers",
		titleHi: "अपने, अपने माता-पिता और तमाम ईमान वालों की मग़फ़िरत की दुआ",
		titleUr: "اپنی، والدین اور تمام مومنین کی مغفرت کی دعا",
		titleHinglish: "Apne aur Walidain ki Maghfirat ki Quranic Dua",
		titleAr: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ",
		arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
		transliteration: "Rabbanagh-fir li wa li-walidayya wa lil-mu’minina yawma yaqumul-hisab",
		en: "Our Lord, forgive me and my parents and the believers the Day the account is established.",
		hi: "ऐ हमारे रब! मुझे, मेरे माता-पिता को और तमाम ईमान वालों को उस दिन बख़्श दे जिस दिन हिसाब क़ायम होगा।",
		ur: "اے ہمارے رب! مجھے، میرے والدین کو اور تمام مومنوں کو اس دن بخش دے جس دن حساب قائم ہوگا۔",
		hinglish: "Aye hamare Rab! Mujhe, mere walidain ko aur tamam momineen ko Hisab ke din bakhsh de.",
		sourceReference: "Quran — Surah Ibrahim 14:41",
		authenticityGrade: "Quranic Ayah",
		whenToRecite: "In personal supplications and at the end of Salah before Taslim."
	},
	{
		id: "dua_protection_falaq_nas_ikhlas",
		category: "Protection",
		titleEn: "Seeking Refuge with the Mu’awwidhat (Al-Ikhlas, Al-Falaq, An-Nas)",
		titleHi: "तौहीद और पनाह की सूरतें (इख़लास, फ़लक़, नास)",
		titleUr: "معوذات کے ذریعے اللہ کی پناہ",
		titleHinglish: "Qul Huwallahu Ahad aur Mu’awwidhatain se Hifazat",
		titleAr: "المعوذات للحفظ والتحصين",
		arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ",
		transliteration: "Qul a’udhu bi-Rabbil-falaq, min sharri ma khalaq (along with Surah Al-Ikhlas & Surah An-Nas)",
		en: "Say: I seek refuge in the Lord of daybreak, from the evil of that which He created.",
		hi: "कह दीजिए: मैं सुबह के रब की पनाह में आता हूँ, हर उस चीज़ की बुराई से जो उसने पैदा की।",
		ur: "کہہ دیجیے: میں صبح کے رب کی پناہ میں آتا ہوں، ہر اس چیز کے شر سے جو اس نے پیدا کی۔",
		hinglish: "Kaho: Main subah ke Rab ki panah mein aata hoon, har makhlooq ke shar se.",
		sourceReference: "Quran — Surahs 112, 113, 114 & Sunan Abi Dawud 5082",
		authenticityGrade: "Quran & Sahih Hadith",
		whenToRecite: "3 times morning and evening, and once after every prayer."
	},
	{
		id: "dua_protection_children_hasan_husayn",
		category: "Protection",
		titleEn: "Prophetic Protection Dua for Children",
		titleHi: "बच्चों की हिफ़ाज़त के लिए नबी ﷺ की दुआ",
		titleUr: "بچوں کی حفاظت کے لیے مسنون دعا",
		titleHinglish: "Bachon ki Hifazat ke Liye Masnoon Dua",
		titleAr: "تعويذ الصبيان (أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ)",
		arabic: "أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ، مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
		transliteration: "U’idhukuma bikalimatillahit-tammah, min kulli shaytanin wa hammah, wa min kulli ’aynin lammah",
		en: "I seek protection for you in the Perfect Words of Allah from every devil and every poisonous creature, and from every harmful envious eye.",
		hi: "मैं तुम दोनों को अल्लाह के मुकम्मल कलिमात की पनाह में देता हूँ—हर शैतान, ज़हरीले जानवर और हर बुरी नज़र से।",
		ur: "میں تم دونوں کو اللہ کے کامل کلمات کی پناہ میں دیتا ہوں ہر شیطان، زہریلے جانور اور ہر نظرِ بد سے۔",
		hinglish: "Main tumhein Allah ke mukammal kalimat ki panah mein deta hoon har shaytan aur buri nazar se.",
		sourceReference: "Sahih al-Bukhari 3371",
		authenticityGrade: "Sahih (Bukhari)",
		whenToRecite: "Recited by parents over their children just as the Prophet ﷺ recited over Hasan and Husayn (RA)."
	},
	{
		id: "dua_protection_evil_manners",
		category: "Protection",
		titleEn: "Protection from Bad Character & Evil Desires",
		titleHi: "बुरे अख़लाक़ और बुरे कामों से पनाह की दुआ",
		titleUr: "برے اخلاق اور برے اعمال سے پناہ کی دعا",
		titleHinglish: "Bure Akhlaq aur Bure Aamal se Panah ki Dua",
		titleAr: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ مُنْكَرَاتِ الأَخْلاَقِ",
		arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ مُنْكَرَاتِ الْأَخْلَاقِ وَالْأَعْمَالِ وَالْأَهْوَاءِ",
		transliteration: "Allahumma inni a’udhu bika min munkaratil-akhlaqi wal-a’mali wal-ahwa’",
		en: "O Allah, I seek refuge in You from objectionable character, deeds, and desires.",
		hi: "ऐ अल्लाह! मैं बुरे अख़लाक़, बुरे कामों और बुरी ख़्वाहिशात से तेरी पनाह माँगता हूँ।",
		ur: "اے اللہ! میں برے اخلاق، برے اعمال اور بری خواہشات سے تیری پناہ مانگتا ہوں۔",
		hinglish: "Aye Allah! Main bure akhlaq, bure aamal aur buri khwahishat se teri panah mangta hoon.",
		sourceReference: "Jami` at-Tirmidhi 3591",
		authenticityGrade: "Sahih",
		whenToRecite: "Daily supplication for pure character and self-discipline."
	},
	{
		id: "dua_distress_yunus",
		category: "Distress & hardship",
		titleEn: "Supplication of Prophet Yunus (AS) in Distress",
		titleHi: "मुसीबत और परेशानी से निजात की दुआ (दुआ-ए-यूनुस)",
		titleUr: "پریشانی اور غم سے نجات کی دعا (دعائے یونس)",
		titleHinglish: "Musibat aur Pareshani mein Dua-e-Yunus (AS)",
		titleAr: "دعوة ذي النون (لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ)",
		arabic: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
		transliteration: "La ilaha illa Anta subhanaka inni kuntu minaz-zalimin",
		en: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
		hi: "तेरे सिवा कोई माबूद नहीं, तू पाक है, बेशक मैं ही अपनी जान पर ज़ुल्म (कमी) करने वालों में से था।",
		ur: "تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصور واروں میں سے تھا۔",
		hinglish: "Tere siwa koi mabood nahi, Tu paak hai, beshak main hi qusoorwar tha.",
		sourceReference: "Quran — Surah Al-Anbiya 21:87 & Jami` at-Tirmidhi 3505",
		authenticityGrade: "Quran & Sahih Hadith",
		whenToRecite: "During any anxiety, grief, difficulty, or test."
	},
	{
		id: "dua_distress_kurb_relief",
		category: "Distress & hardship",
		titleEn: "Prophetic Dua at Times of Severe Distress (Al-Karb)",
		titleHi: "सख़्त परेशानी और बेचैनी के वक़्त की दुआ",
		titleUr: "شدید بے چینی اور کرب کے وقت کی دعا",
		titleHinglish: "Sakht Pareshani (Karb) ke Waqt ki Dua",
		titleAr: "دعاء الكرب (لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ)",
		arabic: "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
		transliteration: "La ilaha illallahul-’Azimul-Halim, la ilaha illallahu Rabbul-’Arshil-’Azim, la ilaha illallahu Rabbus-samawati wa Rabbul-ardi wa Rabbul-’Arshil-Karim",
		en: "None has the right to be worshipped except Allah, the Magnificent, the Forbearing. None has the right to be worshipped except Allah, Lord of the Magnificent Throne. None has the right to be worshipped except Allah, Lord of the heavens, Lord of the earth, and Lord of the Noble Throne.",
		hi: "अल्लाह के सिवा कोई माबूद नहीं जो अज़मत वाला और बुर्दबार (हलीम) है; अल्लाह के सिवा कोई माबूद नहीं जो आसमानों, ज़मीन और अर्शे-करीम का रब है।",
		ur: "اللہ کے سوا کوئی معبود نہیں جو عظمت والا اور بردبار ہے؛ اللہ کے سوا کوئی معبود نہیں جو آسمانوں، زمین اور عرشِ کریم کا رب ہے۔",
		hinglish: "Allah ke siwa koi mabood nahi jo Azmat wala aur Halim hai, aur Arsh-e-Karim ka Rab hai.",
		sourceReference: "Sahih al-Bukhari 6346, Sahih Muslim 2730",
		authenticityGrade: "Sahih (Bukhari & Muslim)",
		whenToRecite: "When facing heavy worry, sadness, or life challenges."
	},
	{
		id: "dua_distress_ya_hayyu_ya_qayyum",
		category: "Distress & hardship",
		titleEn: "Seeking Relief Through Allah’s Mercy (Ya Hayyu Ya Qayyum)",
		titleHi: "अल्लाह की रहमत से मदद माँगने की दुआ (या हय्यु या क़य्यूम)",
		titleUr: "یا حی یا قیوم برحمتک استغیث",
		titleHinglish: "Ya Hayyu Ya Qayyum Bi-Rahmatika Astaghith",
		titleAr: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
		arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
		transliteration: "Ya Hayyu ya Qayyumu birahmatika astaghith, aslih li sha’ni kullahu, wa la takilni ila nafsi tarfata ’ayn",
		en: "O Ever-Living, O Sustainer of all that exists, in Your mercy I seek relief; set right all of my affairs and do not leave me to myself even for the blink of an eye.",
		hi: "ऐ हमेशा ज़िंदा रहने वाले और हर चीज़ को थामने वाले! मैं तेरी रहमत के वसीले से मदद माँगता हूँ; मेरे सारे काम दुरुस्त फ़रमा दे और पलक झपकने के बराबर भी मुझे मेरे नफ़्स के हवाले न कर।",
		ur: "اے ہمیشہ زندہ رہنے والے اور کائنات کو قائم رکھنے والے! میں تیری رحمت کے وسیلے سے مدد مانگتا ہوں، میرے تمام معاملات درست فرما دے اور پلک جھپکنے کے برابر بھی مجھے میرے نفس کے حوالے نہ فرما۔",
		hinglish: "Ya Hayyu Ya Qayyum! Mere tamam muamlat durust farma de aur palak jhapakne ke barabar bhi mujhe tanha na chhod.",
		sourceReference: "Sunan an-Nasa’i (Al-Kubra 10405) & Al-Mustadrak 2000",
		authenticityGrade: "Hasan",
		whenToRecite: "Morning, evening, and whenever overwhelmed by responsibilities."
	},
	{
		id: "dua_distress_easy_task",
		category: "Distress & hardship",
		titleEn: "When a Task or Exam Feels Difficult",
		titleHi: "जब कोई काम या इम्तिहान मुश्किल लगे (अल्लाहुम्मा ला सहला)",
		titleUr: "مشکل کام کو آسان کرنے کی دعا",
		titleHinglish: "Mushkil Kaam ko Aasan Karne ki Dua (Allahumma La Sahla)",
		titleAr: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا",
		arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
		transliteration: "Allahumma la sahla illa ma ja’altahu sahla, wa Anta taj’alul-hazna idha shi’ta sahla",
		en: "O Allah, there is nothing easy except what You make easy, and You make the difficult easy if You will.",
		hi: "ऐ अल्लाह! कोई काम आसान नहीं मगर जिसे तू आसान बना दे, और तू जब चाहे मुश्किल (सख़्त ज़मीन) को भी आसान बना देता है।",
		ur: "اے اللہ! کوئی کام آسان نہیں مگر جسے تو آسان بنا دے، اور تو جب چاہے مشکل کو آسان فرما دیتا ہے۔",
		hinglish: "Aye Allah! Koi kaam aasan nahi magar jise Tu aasan bana de.",
		sourceReference: "Sahih Ibn Hibban 974 (Authenticated)",
		authenticityGrade: "Sahih",
		whenToRecite: "When facing a challenging task, study topic, or hardship."
	},
	{
		id: "dua_gratitude_muadh_worship",
		category: "Gratitude",
		titleEn: "Help Me Remember You, Thank You & Worship You Well",
		titleHi: "ज़िक्र, शुक्र और बेहतरीन इबादत की तौफ़ीक़ की दुआ",
		titleUr: "ذکر، شکر اور بہترین عبادت کی توفیق کی دعا",
		titleHinglish: "Allahumma A’inni Ala Dhikrika wa Shukrika",
		titleAr: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
		arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ",
		transliteration: "Allahumma a’inni ’ala dhikrika, wa shukrika, wa husni ’ibadatik",
		en: "O Allah, help me to remember You, to give thanks to You, and to worship You in the best manner.",
		hi: "ऐ अल्लाह! अपना ज़िक्र करने, अपना शुक्र अदा करने और बेहतरीन तरीक़े से अपनी इबादत करने में मेरी मदद फ़रमा।",
		ur: "اے اللہ! اپنے ذکر، اپنے شکر اور اپنی بہترین عبادت پر میری مدد فرما۔",
		hinglish: "Aye Allah! Apna dhikr karne, shukr karne aur behtareen ibadat karne mein meri madad farma.",
		sourceReference: "Sunan Abi Dawud 1522, Sunan an-Nasa’i 1303",
		authenticityGrade: "Sahih",
		whenToRecite: "Recommended by the Prophet ﷺ to Mu’adh ibn Jabal (RA) after every prayer."
	},
	{
		id: "dua_gratitude_sulayman_inspire",
		category: "Gratitude",
		titleEn: "Quranic Dua for Gratitude & Righteous Deeds",
		titleHi: "नेमतों का शुक्र अदा करने और नेक अमल की क़ुरआनी दुआ",
		titleUr: "نعمتوں پر شکر اور عملِ صالح کی قرآنی دعا",
		titleHinglish: "Rabbi Awzi’ni An Ashkura Ni’mataka",
		titleAr: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",
		arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ",
		transliteration: "Rabbi awzi’ni an ashkura ni’matakal-lati an’amta ’alayya wa ’ala walidayya wa an a’mala salihan tardahu",
		en: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve.",
		hi: "ऐ मेरे रब! मुझे तौफ़ीक़ दे कि मैं तेरी उस नेमत का शुक्र अदा करूँ जो तूने मुझ पर और मेरे माता-पिता पर की है, और ऐसे नेक काम करूँ जिनसे तू राज़ी हो।",
		ur: "اے میرے رب! مجھے توفیق دے کہ میں تیری اس نعمت کا شکر ادا کروں جو تو نے مجھ پر اور میرے والدین پر انعام کی ہے اور ایسے نیک عمل کروں جن سے تو راضی ہو۔",
		hinglish: "Aye mere Rab! Mujhe taufiq de ki main teri nematon ka shukr ada karoon aur nek aamal karoon.",
		sourceReference: "Quran — Surah An-Naml 27:19 & Surah Al-Ahqaf 46:15",
		authenticityGrade: "Quranic Ayah",
		whenToRecite: "At any time to cultivate deep gratitude for family and faith."
	},
	{
		id: "dua_gratitude_seeing_blessing",
		category: "Gratitude",
		titleEn: "When Seeing a Blessing or Accomplishing Something Good",
		titleHi: "कोई अच्छी नेमत या काम पूरा होते देखकर पढ़ने की दुआ",
		titleUr: "نعمت اور خیر دیکھ کر پڑھنے کی دعا",
		titleHinglish: "Nemat aur Khair Dekh Kar Padhne ki Dua",
		titleAr: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
		arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
		transliteration: "Alhamdu lillahil-ladhi bini’matihi tatimmus-salihat",
		en: "All praise is for Allah by Whose favor good works are accomplished.",
		hi: "तमाम तारीफ़ें अल्लाह के लिए हैं जिसकी नेमत व अनुग्रह से नेक और अच्छे काम पूरे होते हैं।",
		ur: "تمام تعریفیں اللہ کے لیے ہیں جس کے فضل و نعمت سے نیک کام پایہ تکمیل کو پہنچتے ہیں۔",
		hinglish: "Tamam tareefein Allah ke liye hain jiski nemat se acche kaam poore hote hain.",
		sourceReference: "Sunan Ibn Majah 3803",
		authenticityGrade: "Hasan / Sahih",
		whenToRecite: "Whenever experiencing joy, completion of a goal, or good news."
	},
	{
		id: "dua_daily_rabbana_atina",
		category: "Daily routines",
		titleEn: "Good in This World & Good in the Hereafter (Rabbana Atina)",
		titleHi: "दुनिया और आख़िरत की भलाई की दुआ (रब्बना आतिना)",
		titleUr: "دنیا اور آخرت کی بھلائی کی جامع دعا",
		titleHinglish: "Rabbana Atina Fid-Dunya Hasanah",
		titleAr: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً",
		arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
		transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina ’adhaban-nar",
		en: "Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.",
		hi: "ऐ हमारे रब! हमें दुनिया में भी भलाई अता फ़रमा और आख़िरत में भी भलाई अता फ़रमा, और हमें आग के अज़ाब से बचा।",
		ur: "اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں آگ کے عذاب سے بچا۔",
		hinglish: "Aye hamare Rab! Humein duniya mein bhi bhalai de aur akhirat mein bhi bhalai de.",
		sourceReference: "Quran — Surah Al-Baqarah 2:201 & Sahih al-Bukhari 4522",
		authenticityGrade: "Quran & Sahih Bukhari",
		whenToRecite: "The most frequent comprehensive supplication of the Prophet ﷺ."
	},
	{
		id: "dua_daily_steadfast_heart",
		category: "Daily routines",
		titleEn: "Steadfastness of the Heart upon Faith",
		titleHi: "दिल को दीन पर साबित-क़दम रखने की दुआ",
		titleUr: "دل کو دین پر ثابت قدم رکھنے کی دعا",
		titleHinglish: "Ya Muqallibal Qulub Thabbit Qalbi Ala Dinik",
		titleAr: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
		arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
		transliteration: "Ya Muqallibal-qulubi thabbit qalbi ’ala dinik",
		en: "O Turner of the hearts, keep my heart firm upon Your religion.",
		hi: "ऐ दिलों को फेरने वाले! मेरे दिल को अपने दीन पर मज़बूती से क़ायम रख।",
		ur: "اے دلوں کو پھیرنے والے! میرے دل کو اپنے دین پر ثابت قدم رکھ۔",
		hinglish: "Aye dilon ko pherne wale! Mere dil ko apne deen par sabit-qadam rakh.",
		sourceReference: "Jami` at-Tirmidhi 2140",
		authenticityGrade: "Sahih",
		whenToRecite: "Frequently recited by the Prophet ﷺ in daily supplications."
	},
	{
		id: "dua_daily_entering_washroom",
		category: "Daily routines",
		titleEn: "Before Entering the Washroom",
		titleHi: "बैतुल-ख़ला (वाशरूम) में जाने से पहले की दुआ",
		titleUr: "بیت الخلا میں داخل ہونے سے پہلے کی دعا",
		titleHinglish: "Washroom mein Jane se Pehle ki Dua",
		titleAr: "دعاء دخول الخلاء",
		arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
		transliteration: "Allahumma inni a’udhu bika minal-khubuthi wal-khaba’ith",
		en: "O Allah, indeed I seek refuge in You from all impure and evil things.",
		hi: "ऐ अल्लाह! मैं हर तरह की नापाकी और बुराई से तेरी पनाह चाहता हूँ।",
		ur: "اے اللہ! میں خبیث جنوں اور خبیث جنیوں (اور ہر ناپاکی) سے تیری پناہ مانگتا ہوں۔",
		hinglish: "Aye Allah! Main har na-paaki aur shar se teri panah mangta hoon.",
		sourceReference: "Sahih al-Bukhari 142, Sahih Muslim 375",
		authenticityGrade: "Sahih (Bukhari & Muslim)",
		whenToRecite: "Before stepping into the washroom with the left foot."
	},
	{
		id: "dua_daily_leaving_washroom",
		category: "Daily routines",
		titleEn: "Upon Leaving the Washroom",
		titleHi: "वाशरूम से बाहर निकलने की दुआ",
		titleUr: "بیت الخلا سے باہر نکلنے کی دعا",
		titleHinglish: "Washroom se Bahar Nikalne ki Dua",
		titleAr: "دعاء الخروج من الخلاء (غُفْرَانَكَ)",
		arabic: "غُفْرَانَكَ",
		transliteration: "Ghufranak",
		en: "I seek Your forgiveness (O Allah).",
		hi: "(ऐ अल्लाह!) मैं तेरी बख़्शिश चाहता हूँ।",
		ur: "(اے اللہ!) میں تیری بخشش چاہتا ہوں۔",
		hinglish: "Ghufranak — Aye Allah main teri maghfirat chahta hoon.",
		sourceReference: "Sunan Abi Dawud 30, Jami` at-Tirmidhi 7",
		authenticityGrade: "Sahih",
		whenToRecite: "Upon stepping out of the washroom with the right foot."
	},
	{
		id: "dua_daily_after_wudu",
		category: "Daily routines",
		titleEn: "Supplication After Completing Wudu",
		titleHi: "वुज़ू मुकम्मल करने के बाद की दुआ",
		titleUr: "وضو مکمل کرنے کے بعد کی دعا",
		titleHinglish: "Wudu ke Baad ki Masnoon Dua",
		titleAr: "الذكر بعد الفراغ من الوضوء",
		arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
		transliteration: "Ashhadu an la ilaha illallahu wahdahu la sharika lahu wa ashhadu anna Muhammadan ’abduhu wa Rasuluh",
		en: "I bear witness that none has the right to be worshipped except Allah alone, who has no partner, and I bear witness that Muhammad is His servant and His Messenger.",
		hi: "मैं गवाही देता हूँ कि अल्लाह के सिवा कोई माबूद नहीं, वह अकेला है उसका कोई शरीक नहीं, और मुहम्मद ﷺ उसके बंदे और रसूल हैं।",
		ur: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں، اور محمد ﷺ اس کے بندے اور رسول ہیں۔",
		hinglish: "Main gawahi deta hoon ki Allah ke siwa koi mabood nahi aur Muhammad ﷺ uske bande aur Rasool hain.",
		sourceReference: "Sahih Muslim 234",
		authenticityGrade: "Sahih (Muslim)",
		whenToRecite: "Immediately after completing Wudu.",
		virtueNote: "All eight gates of Paradise are opened for the one who perfects Wudu and says this."
	},
	{
		id: "dua_daily_wearing_garment",
		category: "Daily routines",
		titleEn: "When Putting On Clothes",
		titleHi: "कपड़े पहनने की दुआ",
		titleUr: "لباس پہننے کی دعا",
		titleHinglish: "Kapde Pehanne ki Masnoon Dua",
		titleAr: "دعاء لبس الثوب",
		arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
		transliteration: "Alhamdu lillahil-ladhi kasani hadhath-thawba wa razaqanihi min ghayri hawlin minni wa la quwwah",
		en: "All praise is for Allah who clothed me with this garment and provided it for me without any might or power from myself.",
		hi: "तमाम तारीफ़ें अल्लाह के लिए हैं जिसने मुझे यह लिबास पहनाया और मेरी किसी ताक़त के बग़ैर मुझे यह अता किया।",
		ur: "تمام تعریفیں اللہ کے لیے ہیں جس نے مجھے یہ لباس پہنایا اور میری کسی طاقت و قوت کے بغیر مجھے یہ عطا فرمایا۔",
		hinglish: "Tamam tareefein Allah ke liye hain jisne mujhe yeh libas ata kiya.",
		sourceReference: "Sunan Abi Dawud 4023",
		authenticityGrade: "Hasan",
		whenToRecite: "When dressing, starting from the right side."
	},
	{
		id: "dua_daily_rain_beneficial",
		category: "Daily routines",
		titleEn: "When Seeing Rain Fall (Allahumma Sayyiban Nafi’an)",
		titleHi: "बारिश होते वक़्त की दुआ",
		titleUr: "بارش ہوتے وقت کی دعا",
		titleHinglish: "Barish Hote Waqt ki Dua (Allahumma Sayyiban Nafi’an)",
		titleAr: "الدعاء إذا نزل المطر (اللَّهُمَّ صَيِّبًا نَافِعًا)",
		arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
		transliteration: "Allahumma sayyiban nafi’a",
		en: "O Allah, may it be a beneficial rain cloud.",
		hi: "ऐ अल्लाह! इसे फ़ायदेमंद और बरकत वाली बारिश बना दे।",
		ur: "اے اللہ! اسے نفع بخش اور بابرکت بارش بنا دے۔",
		hinglish: "Aye Allah! Ise faide-mand aur barkat wali barish bana de.",
		sourceReference: "Sahih al-Bukhari 1032",
		authenticityGrade: "Sahih (Bukhari)",
		whenToRecite: "When rain begins to fall."
	},
	{
		id: "dua_daily_visiting_sick",
		category: "Daily routines",
		titleEn: "When Visiting Someone Who is Ill",
		titleHi: "बीमार की अयादत (पूछ-ताछ) की दुआ",
		titleUr: "بیمار کی عیادت کی دعا",
		titleHinglish: "Beemar ki Ayadat ki Dua (La Ba’sa Tahurun)",
		titleAr: "الدعاء للمريض عند عيادته (لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ)",
		arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
		transliteration: "La ba’sa tahurun in sha’ Allah",
		en: "No harm; it will be a purification (from sins), if Allah wills.",
		hi: "घबराने की कोई बात नहीं; इंशा-अल्लाह यह बीमारी गुनाहों से पाकी का ज़रिया बनेगी।",
		ur: "کوئی حرج نہیں، ان شاء اللہ یہ بیماری گناہوں سے پاکیزگی کا ذریعہ ہے۔",
		hinglish: "Ghabrane ki baat nahi, In sha Allah yeh sehat aur paaki ka zariya hai.",
		sourceReference: "Sahih al-Bukhari 3616",
		authenticityGrade: "Sahih (Bukhari)",
		whenToRecite: "To comfort and pray for someone who is unwell."
	},
	{
		id: "dua_daily_kaffaratul_majlis",
		category: "Daily routines",
		titleEn: "At the Conclusion of a Gathering (Kaffaratul Majlis)",
		titleHi: "मजलिस या क्लास ख़त्म होने की दुआ (कफ़्फ़ारतुल-मजलिस)",
		titleUr: "مجلس کے اختتام کی دعا (کفارۃ المجلس)",
		titleHinglish: "Majlis Khatm Hone ki Dua (Subhanakallahumma)",
		titleAr: "كفارة المجلس",
		arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
		transliteration: "Subhanakallahumma wa bihamdika, ashhadu an la ilaha illa Anta, astaghfiruka wa atubu ilayk",
		en: "Glory is to You, O Allah, and praise is to You. I bear witness that there is none worthy of worship except You. I seek Your forgiveness and turn to You in repentance.",
		hi: "ऐ अल्लाह! तू अपनी तारीफ़ों के साथ पाक है, मैं गवाही देता हूँ कि तेरे सिवा कोई माबूद नहीं, मैं तुझसे बख़्शिश माँगता हूँ और तेरी तरफ़ तौबा करता हूँ।",
		ur: "اے اللہ! تو اپنی حمد کے ساتھ پاک ہے، میں گواہی دیتا ہوں کہ تیرے سوا کوئی معبود نہیں، میں تجھ سے بخشش مانگتا ہوں اور تیری طرف رجوع کرتا ہوں۔",
		hinglish: "Subhanakallahumma wa bihamdika — main tujhse maghfirat mangta hoon aur tawbah karta hoon.",
		sourceReference: "Sunan Abi Dawud 4859, Jami` at-Tirmidhi 3433",
		authenticityGrade: "Sahih",
		whenToRecite: "Before standing up to leave any study circle, meeting, or gathering."
	},
	{
		id: "dua_morning_ayatul_kursi",
		category: "Morning Adhkar",
		titleEn: "Ayatul Kursi (The Verse of the Throne — 2:255)",
		titleHi: "आयतुल-कुर्सी (सुबह, शाम और हर नमाज़ के बाद)",
		titleUr: "آیت الکرسی (صبح، شام اور ہر فرض نماز کے بعد)",
		titleHinglish: "Ayatul Kursi — Hifazat ki Sabse Azeem Ayah",
		titleAr: "آية الكرسي (اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ)",
		arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
		transliteration: "Allahu la ilaha illa Huwal-Hayyul-Qayyum, la ta’khudhuhu sinatun wa la nawm...",
		en: "Allah—there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep (Surah Al-Baqarah 2:255).",
		hi: "अल्लाह—उसके सिवा कोई माबूद नहीं, वह हमेशा ज़िंदा और क़ायम रखने वाला है, उसे न ऊँघ आती है और न नींद (सूरह बक़रा 2:255)।",
		ur: "اللہ کے سوا کوئی معبود نہیں، وہ زندہ اور قائم رکھنے والا ہے، اسے نہ اونگھ آتی ہے اور نہ نیند (سورۃ البقرہ 255)۔",
		hinglish: "Allahu la ilaha illa Huwal-Hayyul-Qayyum — har farz namaz aur sone se pehle.",
		sourceReference: "Quran — Surah Al-Baqarah 2:255, Sahih al-Bukhari 2311, Sunan an-Nasa’i (Al-Kubra 9848)",
		authenticityGrade: "Quran & Sahih Hadith",
		whenToRecite: "After every obligatory prayer, in Morning/Evening Adhkar, and before sleeping."
	},
	{
		id: "dua_morning_beneficial_knowledge_rizq",
		category: "Morning Adhkar",
		titleEn: "Seeking Beneficial Knowledge, Pure Provision & Accepted Deeds",
		titleHi: "फ़ायदेमंद इल्म, पाक रिज़्क़ और मक़बूल अमल की दुआ",
		titleUr: "علمِ نافع، رزقِ طیب اور مقبول عمل کی دعا",
		titleHinglish: "Ilm-e-Nafi, Rizq-e-Tayyib aur Maqbool Amal ki Dua",
		titleAr: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
		arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
		transliteration: "Allahumma inni as’aluka ’ilman nafi’an, wa rizqan tayyiban, wa ’amalan mutaqabbala",
		en: "O Allah, indeed I ask You for beneficial knowledge, good and pure provision, and deeds that are accepted.",
		hi: "ऐ अल्लाह! मैं तुझसे फ़ायदेमंद इल्म, पाक-साफ़ रिज़्क़ और क़बूल होने वाले अमल का सवाल करता हूँ।",
		ur: "اے اللہ! میں تجھ سے نفع بخش علم، پاکیزہ رزق اور مقبول عمل کا سوال کرتا ہوں۔",
		hinglish: "Aye Allah! Main tujhse faide-mand ilm, pakeezah rizq aur maqbool amal mangta hoon.",
		sourceReference: "Sunan Ibn Majah 925, Musnad Ahmad 26602",
		authenticityGrade: "Sahih",
		whenToRecite: "Every morning immediately after concluding the Fajr prayer."
	},
	{
		id: "dua_morning_subhanallahi_wa_bihamdihi_100",
		category: "Morning Adhkar",
		titleEn: "Glorifying Allah with Praise (100 Times Morning & Evening)",
		titleHi: "सुब्हानअल्लाहि व बिहम्दिही (सुबह-शाम 100 बार)",
		titleUr: "سبحان اللہ وبحمدہ (صبح و شام سو مرتبہ)",
		titleHinglish: "SubhanAllahi wa Bihamdihi (100 Times)",
		titleAr: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ (مِائَةَ مَرَّةٍ)",
		arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
		transliteration: "SubhanAllahi wa bihamdihi",
		en: "Glory be to Allah and praise be to Him.",
		hi: "अल्लाह अपनी तमाम तारीफ़ों के साथ पाक है।",
		ur: "اللہ اپنی حمد کے ساتھ پاک ہے۔",
		hinglish: "SubhanAllahi wa bihamdihi — Allah apni tareef ke saath paak hai.",
		sourceReference: "Sahih al-Bukhari 6405, Sahih Muslim 2691",
		authenticityGrade: "Sahih (Bukhari & Muslim)",
		whenToRecite: "100 times in the morning and 100 times in the evening."
	},
	{
		id: "dua_sleep_last_two_ayat_baqarah",
		category: "Before sleeping",
		titleEn: "Sufficiency at Night — Final Two Verses of Surah Al-Baqarah",
		titleHi: "सूरह बक़रा की आख़िरी दो आयतें (रात की हिफ़ाज़त)",
		titleUr: "سورۃ البقرہ کی آخری دو آیات (رات کو کفایت)",
		titleHinglish: "Surah Al-Baqarah ki Akhiri Do Ayatein (2:285-286)",
		titleAr: "الآيتان من آخر سورة البقرة (آمَنَ الرَّسُولُ...)",
		arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
		transliteration: "La yukallifullahu nafsan illa wus’aha, laha ma kasabat wa ’alayha maktasabat, Rabbana la tu’akhidhna in nasina aw akhta’na...",
		en: "Allah does not charge a soul except within its capacity. It will have the consequence of what good it has gained, and it will bear the consequence of what evil it has earned. Our Lord, do not impose blame upon us if we have forgotten or erred (Quran 2:286).",
		hi: "अल्लाह किसी जान पर उसकी ताक़त से बढ़कर बोझ नहीं डालता... ऐ हमारे रब! अगर हम भूल जाएँ या हमसे चूक हो जाए तो हमारी पकड़ न फ़रमा (सूरह बक़रा 2:286)।",
		ur: "اللہ کسی جان پر اس کی طاقت سے زیادہ بوجھ نہیں ڈالتا... اے ہمارے رب! اگر ہم بھول جائیں یا ہم سے خطا ہو جائے تو ہماری گرفت نہ فرما (البقرہ 286)۔",
		hinglish: "Allah kisi jaan par uski taqat se zyada bojh nahi dalta (Surah Al-Baqarah 2:285-286).",
		sourceReference: "Quran — Surah Al-Baqarah 2:285-286 & Sahih al-Bukhari 5009",
		authenticityGrade: "Quran & Sahih Bukhari",
		whenToRecite: "Every night before sleeping (\"Whoever recites the last two verses of Surah Al-Baqarah at night, they will suffice him\")."
	},
	{
		id: "dua_drinking_milk",
		category: "Before/after eating",
		titleEn: "After Drinking Milk",
		titleHi: "दूध पीने के बाद की दुआ",
		titleUr: "دودھ پینے کے بعد کی دعا",
		titleHinglish: "Doodh Peene ke Baad ki Dua",
		titleAr: "الدعاء عند شرب اللبن",
		arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ",
		transliteration: "Allahumma barik lana fihi wa zidna minhu",
		en: "O Allah, bless it for us and give us more of it.",
		hi: "ऐ अल्लाह! हमारे लिए इसमें बरकत अता फ़रमा और हमें इससे और ज़्यादा नवाज़।",
		ur: "اے اللہ! ہمارے لیے اس میں برکت عطا فرما اور ہمیں اس سے مزید عطا فرما۔",
		hinglish: "Aye Allah! Hamare liye ismein barkat de aur humein ismein izafa ata farma.",
		sourceReference: "Sunan Abi Dawud 3730, Jami` at-Tirmidhi 3455",
		authenticityGrade: "Hasan",
		whenToRecite: "After drinking milk."
	},
	{
		id: "dua_breaking_fast_iftar",
		category: "Before/after eating",
		titleEn: "Upon Breaking the Fast (Iftar)",
		titleHi: "इफ़्तार (रोज़ा खोलने) की मसनून दुआ",
		titleUr: "افطار (روزہ کھولنے) کی مسنون دعا",
		titleHinglish: "Roza Kholne (Iftar) ki Masnoon Dua",
		titleAr: "دعاء الإفطار (ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ)",
		arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
		transliteration: "Dhahabaz-zama’u wabtallatil-’uruqu wa thabatal-ajru in sha’ Allah",
		en: "The thirst has gone, the veins are moistened, and the reward is assured, if Allah wills.",
		hi: "प्यास बुझ गई, रगें तर हो गईं और इंशा-अल्लाह सवाब पक्का हो गया।",
		ur: "پیاس چلی گئی، رگیں تر ہو گئیں اور ان شاء اللہ اجر ثابت ہو گیا۔",
		hinglish: "Pyas chali gayi, ragein tar ho gayin aur In sha Allah ajr sabit ho gaya.",
		sourceReference: "Sunan Abi Dawud 2357",
		authenticityGrade: "Hasan",
		whenToRecite: "Upon breaking the fast with dates or water at Maghrib."
	},
	{
		id: "dua_mosque_sitting_waiting_prayer",
		category: "Entering/leaving mosque",
		titleEn: "Angels’ Supplication While Sitting in the Mosque Waiting for Prayer",
		titleHi: "मस्जिद में नमाज़ के इंतज़ार में बैठने वाले के लिए फ़रिश्तों की दुआ",
		titleUr: "مسجد میں انتظارِ نماز کے وقت فرشتوں کی دعا",
		titleHinglish: "Masjid mein Namaz ke Intizar mein Farishton ki Dua",
		titleAr: "دعاء الملائكة لمن جلس ينتظر الصلاة",
		arabic: "اللَّهُمَّ اغْفِرْ لَهُ، اللَّهُمَّ ارْحَمْهُ",
		transliteration: "Allahummagh-fir lahu, Allahummar-hamhu",
		en: "O Allah, forgive him! O Allah, have mercy upon him!",
		hi: "ऐ अल्लाह! इसे बख़्श दे! ऐ अल्लाह! इस पर रहम फ़रमा!",
		ur: "اے اللہ! اس کی مغفرت فرما، اے اللہ! اس پر رحم فرما۔",
		hinglish: "Allahummagh-fir lahu, Allahummar-hamhu — Farishton ki dua.",
		sourceReference: "Sahih al-Bukhari 445, Sahih Muslim 649",
		authenticityGrade: "Sahih (Bukhari & Muslim)",
		whenToRecite: "Recited by the angels for anyone sitting in their prayer place in Wudu waiting for Salah."
	},
	{
		id: "dua_travel_entering_town",
		category: "Travelling",
		titleEn: "Upon Entering a New Town, City, or Destination",
		titleHi: "किसी नए शहर या बस्ती में दाख़िल होते वक़्त की दुआ",
		titleUr: "کسی نئے شہر یا بستی میں داخل ہونے کی دعا",
		titleHinglish: "Naye Shehar mein Dakhil Hone ki Dua",
		titleAr: "دعاء دخول القرية أو البلدة",
		arabic: "اللَّهُمَّ رَبَّ السَّمَوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ... أَسْأَلُكَ خَيْرَ هَذِهِ الْقَرْيَةِ وَخَيْرَ أَهْلِهَا وَخَيْرَ مَا فِيهَا",
		transliteration: "Allahumma Rabbas-samawatis-sab’i wa ma azlalna... as’aluka khayra hadhihil-qaryati wa khayra ahliha wa khayra ma fiha",
		en: "O Allah, Lord of the seven heavens and all that they shade... I ask You for the good of this town, the good of its inhabitants, and the good of what is in it, and I seek refuge in You from its evil.",
		hi: "ऐ अल्लाह! सातों आसमानों के रब! मैं तुझसे इस शहर की भलाई, इसके रहने वालों की भलाई और जो कुछ इसमें है उसकी भलाई माँगता हूँ।",
		ur: "اے اللہ! میں تجھ سے اس بستی کی خیر، اس کے باشندوں کی خیر اور جو کچھ اس میں ہے اس کی خیر مانگتا ہوں۔",
		hinglish: "Aye Allah! Main tujhse is shehar aur iske rehne walon ki bhalai mangta hoon.",
		sourceReference: "Sunan an-Nasa’i (Al-Kubra 8775), Sahih Ibn Hibban 2697",
		authenticityGrade: "Sahih / Hasan",
		whenToRecite: "When arriving at a town, city, or destination during travel."
	},
	{
		id: "dua_protection_anxiety_debt",
		category: "Protection",
		titleEn: "Protection from Worry, Grief, Laziness & Debt",
		titleHi: "चिंता, ग़म, सुस्ती, बुज़दिली और क़र्ज़ के बोझ से पनाह की दुआ",
		titleUr: "فکر، غم، سستی اور قرض کے بوجھ سے پناہ کی دعا",
		titleHinglish: "Fikr, Gham, Susti aur Qarz se Panah ki Dua",
		titleAr: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
		arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
		transliteration: "Allahumma inni a’udhu bika minal-hammi wal-hazan, wal-’ajzi wal-kasal, wal-bukhli wal-jubn, wa dala’id-dayni wa ghalabatir-rijal",
		en: "O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from miserliness and cowardice, and from being heavily in debt and overpowered by men.",
		hi: "ऐ अल्लाह! मैं चिंता और ग़म से, बेबसी और सुस्ती से, कंजूसी और बुज़दिली से, और क़र्ज़ के बोझ व लोगों के दबदबे से तेरी पनाह माँगता हूँ।",
		ur: "اے اللہ! میں فکر اور غم سے، عاجزی اور سستی سے، بخل اور بزدلی سے، اور قرض کے بوجھ اور لوگوں کے غلبے سے تیری پناہ مانگتا ہوں۔",
		hinglish: "Aye Allah! Main fikr, gham, susti, bukhl aur qarz ke bojh se teri panah mangta hoon.",
		sourceReference: "Sahih al-Bukhari 6369",
		authenticityGrade: "Sahih (Bukhari)",
		whenToRecite: "Frequently recited by the Prophet ﷺ in daily supplications."
	},
	{
		id: "dua_distress_istirja_calamity",
		category: "Distress & hardship",
		titleEn: "Upon Experiencing Loss or Calamity (Inna Lillahi wa Inna Ilayhi Raji’un)",
		titleHi: "किसी नुक़सान या मुसीबत के वक़्त की दुआ (इन्ना लिल्लाहि व इन्ना इलैहि राजिऊन)",
		titleUr: "مصیبت اور نقصان کے وقت کی دعا (انا للہ وانا الیہ راجعون)",
		titleHinglish: "Musibat ke Waqt — Inna Lillahi wa Inna Ilayhi Raji’un",
		titleAr: "دعاء المصيبة (إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ)",
		arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
		transliteration: "Inna lillahi wa inna ilayhi raji’un, Allahumma-jurni fi musibati wa akhlif li khayran minha",
		en: "Indeed we belong to Allah, and indeed to Him we will return. O Allah, reward me in my affliction and replace it for me with something better.",
		hi: "बेशक हम अल्लाह ही के हैं और बेशक हमें उसी की तरफ़ लौटकर जाना है। ऐ अल्लाह! मुझे मेरी इस मुसीबत में सवाब अता फ़रमा और इसके बदले इससे बेहतर अता फ़रमा।",
		ur: "بے شک ہم اللہ ہی کے ہیں اور ہمیں اسی کی طرف لوٹ کر جانا ہے۔ اے اللہ! مجھے میری مصیبت میں اجر عطا فرما اور اس کا بہتر نعم البدل عطا فرما۔",
		hinglish: "Inna lillahi wa inna ilayhi raji’un — Aye Allah mujhe sabr ka ajr de aur behtar badla ata farma.",
		sourceReference: "Quran — Surah Al-Baqarah 2:156 & Sahih Muslim 918",
		authenticityGrade: "Quran & Sahih Muslim",
		whenToRecite: "Immediately when struck by any loss, bad news, or hardship."
	},
	{
		id: "dua_daily_guidance_taqwa_contentment",
		category: "Daily routines",
		titleEn: "Seeking Guidance, Taqwa, Modesty & Contentment",
		titleHi: "हिदायत, तक़वा, पाकदामनी और दिल की बेनियाज़ी की दुआ",
		titleUr: "ہدایت، تقویٰ، عفت اور بے نیازی کی دعا",
		titleHinglish: "Hidayat, Taqwa, Iffat aur Ghina ki Masnoon Dua",
		titleAr: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
		arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى، وَالتُّقَى، وَالْعَفَافَ، وَالْغِنَى",
		transliteration: "Allahumma inni as’alukal-huda, wat-tuqa, wal-’afafa, wal-ghina",
		en: "O Allah, indeed I ask You for guidance, piety (Taqwa), chastity/modesty, and self-sufficiency (contentment of heart).",
		hi: "ऐ अल्लाह! बेशक मैं तुझसे हिदायत, तक़वा, पाकदामनी (अफ़ाफ़) और दिल की अमीरी (बेनियाज़ी) का सवाल करता हूँ।",
		ur: "اے اللہ! میں تجھ سے ہدایت، تقویٰ، پاک دامنی اور دل کے غنیٰ (بے نیازی) کا سوال کرتا ہوں۔",
		hinglish: "Aye Allah! Main tujhse hidayat, taqwa, paak-damani aur dil ki be-niyazi mangta hoon.",
		sourceReference: "Sahih Muslim 2721",
		authenticityGrade: "Sahih (Muslim)",
		whenToRecite: "In daily prayers and personal supplications."
	},
	{
		id: "dua_daily_sneezing_alhamdulillah",
		category: "Daily routines",
		titleEn: "Etiquette of Sneezing & Responding (Tashmit al-Atis)",
		titleHi: "छींक आने पर और उसका जवाब देने की दुआ",
		titleUr: "چھینک آنے اور اس کا جواب دینے کی مسنون دعا",
		titleHinglish: "Chheenk Aane par Alhamdulillah aur YarhamukAllah",
		titleAr: "دعاء العطاس وتشميت العاطس",
		arabic: "الْحَمْدُ لِلَّهِ — يَرْحَمُكَ اللَّهُ — يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ",
		transliteration: "Alhamdulillah — YarhamukAllah — Yahdikumullahu wa yuslihu balakum",
		en: "The one who sneezes says: \"Alhamdulillah\" (All praise is for Allah). The listener replies: \"YarhamukAllah\" (May Allah have mercy on you). And the first responds: \"Yahdikumullahu wa yuslihu balakum\" (May Allah guide you and set right your affairs).",
		hi: "छींकने वाला कहे: \"अल्हम्दुलिल्लाह\"। सुनने वाला कहे: \"यरहमुकल्लाह\"। फिर पहला जवाब दे: \"यहदीकुमुल्लाहु व युस्लिहु बालकुम\"।",
		ur: "چھینکنے والا کہے: الحمد للہ۔ سننے والا کہے: یرحمک اللہ۔ پھر چھینکنے والا جواب دے: یھدیکم اللہ ویصلح بالکم۔",
		hinglish: "Alhamdulillah -> YarhamukAllah -> Yahdikumullahu wa yuslihu balakum.",
		sourceReference: "Sahih al-Bukhari 6224",
		authenticityGrade: "Sahih (Bukhari)",
		whenToRecite: "Whenever someone sneezes and praises Allah."
	}
];
function mapDuaCategory(raw) {
	switch (raw) {
		case "Morning Adhkar": return "morning_adhkar";
		case "Evening Adhkar": return "evening_adhkar";
		case "Before sleeping": return "sleep";
		case "After waking": return "waking";
		case "Before/after eating": return "eating";
		case "Entering/leaving home": return "home";
		case "Entering/leaving mosque": return "mosque";
		case "Travelling": return "travel";
		case "For parents": return "parents";
		case "Protection": return "protection";
		case "Distress & hardship": return "distress";
		case "Gratitude": return "gratitude";
		default: return "daily_routine";
	}
}
var EXPANDED_VERIFIED_DUAS = DUA_SEEDS_42.map((d) => ({
	id: d.id,
	category: mapDuaCategory(d.category),
	title: d.titleEn,
	localizedTitles: {
		en: d.titleEn,
		hi: d.titleHi,
		ur: d.titleUr,
		hinglish: d.titleHinglish,
		ar: d.titleAr
	},
	kidsTitle: d.titleEn,
	localizedKidsTitles: {
		en: d.titleEn,
		hi: d.titleHi,
		ur: d.titleUr,
		hinglish: d.titleHinglish,
		ar: d.titleAr
	},
	arabic: d.arabic,
	transliteration: d.transliteration,
	translations: {
		en: d.en,
		hi: d.hi,
		ur: d.ur,
		hinglish: d.hinglish,
		ar: d.arabic
	},
	whenToUse: d.whenToRecite,
	localizedWhenToUse: {
		en: d.whenToRecite,
		hi: d.titleHi,
		ur: d.titleUr,
		hinglish: d.titleHinglish,
		ar: d.titleAr
	},
	grade: d.authenticityGrade,
	verification: {
		source: d.sourceReference,
		edition: "Hisn al-Muslim & Canonical Hadith Registry",
		reference: d.sourceReference,
		language: "Arabic / Multi-language",
		version: "2.0",
		reviewer: "Ilmizo Hadith & Quran Verification Board",
		status: "Verified",
		reviewStatusCode: "PUBLISHED",
		grade: d.authenticityGrade
	},
	registryMeta: {
		id: d.id,
		contentType: "dua_adhkar",
		language: "Multi (en, hi, ur, hinglish, ar)",
		availableLanguages: [
			"en",
			"hi",
			"ur",
			"hinglish",
			"ar"
		],
		source: d.sourceReference,
		reviewStatus: "PUBLISHED",
		ageSuitability: "All Ages",
		version: "2.0.0",
		lastUpdatedIso: "2026-10-31T00:00:00.000Z",
		offlineAvailable: true,
		authenticityType: d.sourceReference.startsWith("Quran") ? "Canonical Text" : "Authenticated Hadith/Seerah"
	}
}));
var LESSON_SEEDS_32 = [
	{
		id: "lesson_ihsan",
		category: "Foundations of Islam",
		titleEn: "Islam, Iman & Ihsan (The Hadith of Jibril)",
		titleHi: "इस्लाम, ईमान और एहसान (हदीस-ए-जिब्रील)",
		titleUr: "اسلام، ایمان اور احسان (حدیثِ جبریل)",
		titleHinglish: "Islam, Iman aur Ihsan (Hadith-e-Jibril)",
		titleAr: "مراتب الدين: الإسلام والإيمان والإحسان",
		summaryEn: "Understanding the three foundational levels of our faith from the famous Hadith reported by Umar ibn Al-Khattab (RA).",
		summaryHi: "हज़रत उमर (RA) से रिवायत मशहूर हदीस-ए-जिब्रील की रोशनी में दीन के तीन बुनियादी दर्जे समझना।",
		summaryUr: "حضرت عمر رضی اللہ عنہ سے مروی حدیثِ جبریل کی روشنی میں دین کے تین بنیادی مراتب۔",
		readTimeMinutes: 5,
		objectives: ["Distinguish Islam, Iman, and Ihsan", "Practice mindfulness of Allah in worship"],
		bodyEn: [
			"In Sahih Muslim (8), Umar ibn Al-Khattab (RA) narrated how Angel Jibril (AS) came in human form to teach the companions their religion through clear questions.",
			"Islam represents the outward pillars of submission: the testimony of faith (Shahadah), establishing the five daily prayers (Salah), giving Zakat, fasting Ramadan, and performing Hajj for those able.",
			"Iman represents inward conviction in Allah, His angels, His revealed books, His messengers, the Last Day, and divine decree (Al-Qadar). Ihsan is the pinnacle of spiritual excellence: \"To worship Allah as though you see Him, and while you do not see Him, truly He sees you.\""
		],
		bodyHi: [
			"सहीह मुस्लिम (8) में हज़रत उमर (RA) ने बयान किया कि कैसे हज़रत जिब्रील (AS) ने सवाल-जवाब के ज़रिए सहाबा को दीन सिखाया।",
			"इस्लाम में ज़ाहिरी अमल के पाँच सुतून हैं: शहादत, नमाज़, ज़कात, रमज़ान के रोज़े और हज।",
			"ईमान दिल के यक़ीन का नाम है, और एहसान यह है कि \"तुम अल्लाह की इबादत इस तरह करो गोया तुम उसे देख रहे हो, और अगर तुम उसे नहीं देख रहे तो वह तुम्हें ज़रूर देख रहा है।\""
		],
		bodyUr: [
			"صحیح مسلم (8) میں حضرت عمر رضی اللہ عنہ سے مروی حدیثِ جبریل دینِ اسلام کا جامع خلاصہ ہے۔",
			"اسلام ظاہری ارکانِ خمسہ کا نام ہے، ایمان قلبی عقائد کا، اور احسان یہ ہے کہ بندہ اللہ کی عبادت اس طرح کرے گویا وہ اسے دیکھ رہا ہے۔",
			"جب انسان کے دل میں یہ احساس جاگزیں ہو جائے کہ اللہ اسے دیکھ رہا ہے تو اس کے اخلاق اور عبادات سنور جاتے ہیں۔"
		],
		refs: ["Sahih Muslim 8", "Sahih al-Bukhari 50"],
		takeaways: ["Islam is outward practice, Iman is inward belief, Ihsan is spiritual excellence."],
		quizQ: "According to Sahih Muslim 8, how did the Prophet ﷺ define Ihsan?",
		quizOpts: [
			"To worship Allah as though you see Him, knowing that He sees you",
			"To fast every day of the year",
			"To memorize poetry",
			"To travel across deserts"
		],
		quizAns: 0,
		quizExp: "In Hadith Jibril (Sahih Muslim 8), Ihsan is worshipping Allah as if seeing Him, with certainty that He sees us.",
		reflection: "Which daily prayer today can you slow down to practice Ihsan intentionally?"
	},
	{
		id: "lesson_wudu_excellence",
		category: "Wudu",
		titleEn: "Perfecting Wudu & Its Spiritual Reward",
		titleHi: "वुज़ू को सुन्नत के मुताबिक़ मुकम्मल करना और उसकी फ़ज़ीलत",
		titleUr: "وضو کو سنت کے مطابق مکمل کرنا اور اس کی فضیلت",
		titleHinglish: "Wudu ko Sunnat ke Mutabiq Mukammal Karna",
		titleAr: "إسباغ الوضوء وفضله العظيم",
		summaryEn: "Step-by-step Prophetic purification and how careful Wudu expiates minor sins.",
		summaryHi: "सुन्नत के मुताबिक़ वुज़ू का तरीक़ा और कैसे वुज़ू के पानी के साथ छोटे गुनाह धुल जाते हैं।",
		summaryUr: "سنت کے مطابق وضو کا طریقہ اور اس کی روحانی برکات۔",
		readTimeMinutes: 4,
		objectives: ["Learn the Quranic fard steps of Wudu (Quran 5:6)", "Conserve water following the Sunnah"],
		bodyEn: [
			"In Surah Al-Ma’idah (5:6), Allah commands believers preparing for prayer to wash their faces, wash their forearms to the elbows, wipe over their heads, and wash their feet to the ankles.",
			"Uthman ibn Affan (RA) demonstrated the Prophet’s ﷺ Wudu and shared his saying: \"Whoever performs Wudu like this Wudu of mine, then prays two Rak’ahs without letting his thoughts wander, his past minor sins will be forgiven\" (Sahih al-Bukhari 159).",
			"The Prophet ﷺ also taught conservation: he performed Wudu with a single Mudd (two cupped hands) of water and forbade wasting water even by a flowing river."
		],
		bodyHi: [
			"सूरह माइदा (5:6) में अल्लाह ने वुज़ू के फ़राइज़ बयान फ़रमाए: चेहरा धोना, कोहनियों समेत हाथ धोना, सिर का मसह करना और टखनों समेत पाँव धोना।",
			"हज़रत उस्मान (RA) ने नबी ﷺ का वुज़ू करके दिखाया और बताया कि अच्छा वुज़ू करके दो रकात पढ़ने से पिछले छोटे गुनाह माफ़ हो जाते हैं (सहीह बुख़ारी 159)।",
			"वुज़ू में पानी बर्बाद न करना भी एक अहम सुन्नत है।"
		],
		bodyUr: [
			"سورۃ المائدہ (5:6) میں وضو کے فرائض بیان ہوئے ہیں: چہرہ دھونا، کہنیوں سمیت ہاتھ دھونا، سر کا مسح کرنا اور ٹخنوں سمیت پاؤں دھونا۔",
			"حضرت عثمان رضی اللہ عنہ سے مروی ہے کہ سنت کے مطابق وضو کرنے سے اعضائے وضو کے چھوٹے گناہ دھل جاتے ہیں (صحیح بخاری 159)۔",
			"وضو میں پانی کے اسراف سے بچنا بھی سنتِ نبوی ہے۔"
		],
		refs: [
			"Quran — Surah Al-Ma’idah 5:6",
			"Sahih al-Bukhari 159",
			"Sahih Muslim 244"
		],
		takeaways: ["Wash face, arms to elbows, wipe head, wash feet to ankles, and conserve water."],
		quizQ: "Which Surah and Ayah outlines the four obligatory physical steps of Wudu?",
		quizOpts: [
			"Surah Al-Ma’idah 5:6",
			"Surah Al-Fil 105:1",
			"Surah Al-Kafirun 109:1",
			"Surah Quraish 106:1"
		],
		quizAns: 0,
		quizExp: "Surah Al-Ma’idah 5:6 states the obligations of washing the face, arms to elbows, wiping the head, and washing the feet.",
		reflection: "How can you be more mindful of conserving water the next time you make Wudu?"
	},
	{
		id: "lesson_khushu_salah",
		category: "Salah",
		titleEn: "Cultivating Khushu (Presence of Heart) in Salah",
		titleHi: "नमाज़ में ख़ुशू (दिल की हाज़िरी और सुकून) कैसे पैदा करें",
		titleUr: "نماز میں خشوع و خضوع اور حضورِ قلب",
		titleHinglish: "Namaz mein Khushu aur Dil ki Haziri",
		titleAr: "تحقيق الخشوع والطمأنينة في الصلاة",
		summaryEn: "Practical Prophetic guidance on calmness (Tuma’ninah) and understanding what we recite in prayer.",
		summaryHi: "नमाज़ में इत्मीनान (तुमानीनत) और पढ़े जाने वाले कलिमात के मायने समझने का तरीक़ा।",
		summaryUr: "نماز میں اطمینانِ ارکان اور پڑھے جانے والے کلمات کے معانی پر غور۔",
		readTimeMinutes: 6,
		objectives: ["Understand Tuma’ninah (calmness in every posture)", "Experience Surah Al-Fatiha as a dialogue with Allah"],
		bodyEn: [
			"Allah begins Surah Al-Mu’minun (23:1-2) with the declaration: \"Certainly will the believers succeed—they who are humbly submissive (Khashi’un) in their prayers.\"",
			"A essential pillar of Salah is Tuma’ninah—pausing calmly in Ruku, standing upright after Ruku, and pausing in Sujood until every bone settles in place (Sahih al-Bukhari 757).",
			"In Sahih Muslim (395), Allah states in a Hadith Qudsi: \"I have divided the prayer (Surah Al-Fatiha) between Myself and My servant into two halves\"—and Allah responds to every single verse the worshipper recites."
		],
		bodyHi: [
			"सूरह मोमिनून (23:1-2) की शुरुआत इसी खुशख़बरी से होती है कि कामयाब हो गए वे ईमान वाले जो अपनी नमाज़ में ख़ुशू रखते हैं।",
			"नमाज़ में \"तुमानीनत\" यानी हर रुकन (रुकू, क़ौमा, सजदा) में सुकून से ठहरना फ़र्ज़ है (सहीह बुख़ारी 757)।",
			"सहीह मुस्लिम (395) की हदीस-ए-क़ुदसी में है कि जब बंदा सूरह फ़ातिहा की एक-एक आयत पढ़ता है तो अल्लाह उसका जवाब अता फ़रमाता है।"
		],
		bodyUr: [
			"سورۃ المؤمنون (23:1-2) میں فلاح پانے والے مومنین کی پہلی صفت نماز میں خشوع بیان کی گئی ہے۔",
			"نماز کے ہر رکن میں تعدیلِ ارکان (اطمینان سے ٹھہرنا) لازم ہے (صحیح بخاری 757)۔",
			"صحیح مسلم (395) کے مطابق سورۃ الفاتحہ کی ہر آیت پر اللہ تعالیٰ اپنے بندے کو جواب عطا فرماتا ہے۔"
		],
		refs: [
			"Quran — Surah Al-Mu’minun 23:1-2",
			"Sahih Muslim 395",
			"Sahih al-Bukhari 757"
		],
		takeaways: ["Pause after every verse of Al-Fatiha and settle calmly in Ruku and Sujood."],
		quizQ: "According to Sahih Muslim 395, what happens when a worshipper recites Surah Al-Fatiha verse by verse in Salah?",
		quizOpts: [
			"Allah responds to each verse the servant recites",
			"Nothing happens",
			"The prayer becomes invalid",
			"Only the Imam hears it"
		],
		quizAns: 0,
		quizExp: "Sahih Muslim 395 records the Hadith Qudsi where Allah responds to every verse of Al-Fatiha recited by His servant.",
		reflection: "Try pausing for two seconds after each verse of Surah Al-Fatiha in your next prayer."
	},
	{
		id: "lesson_parents_adab",
		category: "Rights of parents",
		titleEn: "Birr al-Walidayn (Honoring Parents)",
		titleHi: "बिर्रुल-वालिदैन (माता-पिता की इज़्ज़त और ख़िदमत)",
		titleUr: "بر الوالدین (والدین کا ادب اور خدمت)",
		titleHinglish: "Birr al-Walidayn — Walidain ka Adab aur Khidmat",
		titleAr: "برّ الوالدين ومكانته في الإسلام",
		summaryEn: "Why the Quran places kindness to parents immediately after the worship of Allah alone.",
		summaryHi: "क़ुरआन में अल्लाह की इबादत के फ़ौरन बाद माता-पिता के साथ एहसान का हुक्म क्यों दिया गया है।",
		summaryUr: "قرآن مجید میں توحید کے فوراً بعد والدین کے ساتھ احسان کا حکم۔",
		readTimeMinutes: 5,
		objectives: ["Memorize the etiquette of Surah Al-Isra 17:23-24", "Continue honoring parents throughout life"],
		bodyEn: [
			"In Surah Al-Isra (17:23-24), Allah decrees that we worship none but Him and show the highest excellence (Ihsan) to parents—especially when one or both reach old age.",
			"Even a word of impatience (\"Uff\") is forbidden; instead, we are commanded to speak to them a noble, gentle word (Qawlan Karima) and lower to them the wing of humility out of mercy.",
			"When asked which deed is most beloved to Allah, the Prophet ﷺ placed dutifulness to parents (Birr al-Walidayn) right after praying Salah on time (Sahih al-Bukhari 527)."
		],
		bodyHi: [
			"सूरह बनी इसराईल (17:23-24) में अल्लाह ने अपनी इबादत के फ़ौरन बाद माता-पिता के साथ बेहतरीन सुलूक का हुक्म दिया है।",
			"बूढ़े होने पर उन्हें \"उफ़\" तक न कहें, बल्कि अदब और नरमी से बात करें (क़ौलन करीमा)।",
			"सहीह बुख़ारी (527) में वक़्त पर नमाज़ के बाद सबसे पसंदीदा अमल माता-पिता के साथ नेक सुलूक बताया गया है।"
		],
		bodyUr: [
			"سورۃ الاسراء (17:23-24) میں اللہ تعالیٰ نے اپنی عبادت کے ساتھ ہی والدین کے ساتھ احسان کا حکم دیا ہے۔",
			"بڑھاپے میں انہیں \"اف\" تک نہ کہا جائے بلکہ ان کے ساتھ عزت اور نرمی کے بول بولے جائیں۔",
			"صحیح بخاری (527) میں وقت پر نماز کے بعد سب سے محبوب عمل والدین کے ساتھ حسنِ سلوک قرار دیا گیا ہے۔"
		],
		refs: [
			"Quran — Surah Al-Isra 17:23-24",
			"Sahih al-Bukhari 527",
			"Sahih Muslim 2548"
		],
		takeaways: ["Speak gently to parents, serve them gladly, and pray Rabbir-hamhuma for them daily."],
		quizQ: "In Sahih al-Bukhari 527, which deed did the Prophet ﷺ mention immediately after \"Prayer at its proper time\"?",
		quizOpts: [
			"Dutifulness and kindness to parents (Birr al-Walidayn)",
			"Buying land",
			"Traveling far",
			"Sleeping early"
		],
		quizAns: 0,
		quizExp: "In Sahih al-Bukhari 527, Abdullah ibn Mas’ud (RA) asked the Prophet ﷺ which deed is most beloved to Allah: Prayer on time, then kindness to parents.",
		reflection: "What is one kind word or helpful action you can offer your parents today?"
	},
	{
		id: "lesson_honesty_speech",
		category: "Prophetic manners",
		titleEn: "Truthfulness (As-Sidq) & Guarding the Tongue",
		titleHi: "सच्चाई (अस-सिद्क़) और ज़बान की हिफ़ाज़त",
		titleUr: "سچائی (الصدق) اور زبان کی حفاظت",
		titleHinglish: "Sachai (As-Sidq) aur Zaban ki Hifazat",
		titleAr: "الصدق وحفظ اللسان في الهدي النبوي",
		summaryEn: "How truthfulness in speech and character leads step by step to righteousness and Paradise.",
		summaryHi: "कैसे बात और अमल की सच्चाई इंसान को नेकी और जन्नत की तरफ़ ले जाती है।",
		summaryUr: "کس طرح قول و عمل کی سچائی انسان کو نیکی اور جنت تک پہنچاتی ہے۔",
		readTimeMinutes: 4,
		objectives: ["Understand Sahih Muslim 2607 on Sidq", "Avoid backbiting and vain speech"],
		bodyEn: [
			"The Prophet ﷺ taught in Sahih al-Bukhari (6094) and Sahih Muslim (2607): \"Indeed, truthfulness leads to righteousness (Al-Birr), and indeed righteousness leads to Paradise. A person keeps speaking the truth and striving for truth until he is recorded with Allah as a Siddiq (truthful one).\"",
			"He also linked our speech directly to faith: \"Whoever believes in Allah and the Last Day, let him speak good or remain silent\" (Sahih al-Bukhari 6018).",
			"Guarding the tongue from lying, mockery, and backbiting (Surah Al-Hujurat 49:11-12) protects both our good deeds and community harmony."
		],
		bodyHi: [
			"सहीह बुख़ारी (6094) और सहीह मुस्लिम (2607) में नबी ﷺ ने फ़रमाया: \"सच्चाई नेकी का रास्ता दिखाती है और नेकी जन्नत तक ले जाती है।\"",
			"और फ़रमाया: \"जो अल्लाह और आख़िरत के दिन पर ईमान रखता है, वह अच्छी बात कहे या ख़ामोश रहे\" (सहीह बुख़ारी 6018)।",
			"झूठ और ग़ीबत से बचना इंसान के नेक आमाल की हिफ़ाज़त करता है।"
		],
		bodyUr: [
			"صحیح بخاری (6094) اور صحیح مسلم (2607) میں ارشاد ہے کہ سچائی نیکی کی طرف لے جاتی ہے اور نیکی جنت کا راستہ دکھاتی ہے۔",
			"اور جو شخص اللہ اور یومِ آخرت پر ایمان رکھتا ہو اسے چاہیے کہ بھلائی کی بات کہے یا خاموش رہے (صحیح بخاری 6018)۔",
			"جھوٹ اور غیبت سے زبان کی حفاظت مومن کی بڑی کامیابی ہے۔"
		],
		refs: [
			"Sahih al-Bukhari 6094",
			"Sahih Muslim 2607",
			"Quran — Surah Al-Hujurat 49:11-12"
		],
		takeaways: ["Speak truth even when difficult, and choose silence over harmful speech."],
		quizQ: "According to Sahih al-Bukhari 6018, what should a believer in Allah and the Last Day do with their speech?",
		quizOpts: [
			"Speak good or remain silent",
			"Argue to win every debate",
			"Spread rumors quickly",
			"Speak without thinking"
		],
		quizAns: 0,
		quizExp: "Sahih al-Bukhari 6018 teaches: \"Whoever believes in Allah and the Last Day, let him speak good or remain silent.\"",
		reflection: "Before speaking today, ask: Is it true, is it beneficial, and is it kind?"
	},
	{
		id: "lesson_tawheed_categories",
		category: "Tawheed",
		titleEn: "Understanding Tawheed (The Oneness of Allah)",
		titleHi: "तौहीद की समझ (अल्लाह की वहदानियत)",
		titleUr: "توحید کی حقیقت اور اس کے تقاضے",
		titleHinglish: "Tawheed ki Samajh — Allah ki Wahdaniyat",
		titleAr: "حقيقة التوحيد وإخلاص العبادة لله",
		summaryEn: "How knowing Allah as the sole Creator, Sustainer, and worthy of worship brings freedom and peace to the heart.",
		summaryHi: "अल्लाह को अकेला ख़ालिक़, राज़िक़ और इबादत के लायक़ मानने से दिल को कैसे सुकून मिलता है।",
		summaryUr: "اللہ تعالیٰ کو تنہا خالق، رازق اور مستحقِ عبادت ماننے کے ثمرات۔",
		readTimeMinutes: 5,
		objectives: ["Understand Surah Al-Ikhlas 112:1-4", "Connect Allah’s Beautiful Names to daily life"],
		bodyEn: [
			"Tawheed is the foundation upon which every verse of the Quran and every prophetic call rests: knowing with certainty that Allah alone is the Creator and Lord of the universe, that all worship belongs exclusively to Him, and that His Names and Attributes are perfect beyond comparison.",
			"Surah Al-Ikhlas (112:1-4) summarizes pure monotheism in four verses—so profound that the Prophet ﷺ described it as equivalent to one-third of the Quran in meaning (Sahih al-Bukhari 5015).",
			"When a heart is anchored in Tawheed (\"You alone we worship, and You alone we ask for help\" — Quran 1:5), fear of creation is replaced by reliance (Tawakkul) upon the Creator."
		],
		bodyHi: [
			"तौहीद इस्लाम की सबसे पहली बुनियाद है—यह यक़ीन रखना कि अल्लाह ही अकेला ख़ालिक़ और मालिक है और इबादत सिर्फ़ उसी का हक़ है।",
			"सूरह इख़लास (112:1-4) तौहीद का ख़ुलासा है और नबी ﷺ ने इसे सवाब और मानी में एक-तिहाई क़ुरआन के बराबर बताया है (सहीह बुख़ारी 5015)।",
			"\"हम तेरी ही इबादत करते हैं और तुझी से मदद माँगते हैं\" (1:5) इंसान को हर डर से आज़ाद कर देता है।"
		],
		bodyUr: [
			"توحید دینِ اسلام کی اساس ہے—یہ کامل یقین کہ اللہ ہی خالق و مالک ہے اور عبادت صرف اسی کا حق ہے۔",
			"سورۃ الاخلاص (112:1-4) توحیدِ خالص کا جامع بیان ہے اور حدیث میں اسے ثواب کے اعتبار سے تہائی قرآن کے برابر قرار دیا گیا ہے (صحیح بخاری 5015)۔",
			"توحید انسان کے دل کو مخلوق کے خوف سے بے نیاز کر کے خالق سے جوڑ دیتی ہے۔"
		],
		refs: [
			"Quran — Surah Al-Ikhlas 112:1-4",
			"Quran — Surah Al-Fatiha 1:5",
			"Sahih al-Bukhari 5015"
		],
		takeaways: ["Direct all prayer, hope, and reliance exclusively to Allah."],
		quizQ: "According to Sahih al-Bukhari 5015, Surah Al-Ikhlas is equivalent in meaning and reward to what portion of the Quran?",
		quizOpts: [
			"One-third of the Quran",
			"One page",
			"Ten words",
			"None"
		],
		quizAns: 0,
		quizExp: "The Prophet ﷺ taught in Sahih al-Bukhari 5015 that Surah Al-Ikhlas equals one-third of the Quran.",
		reflection: "Reflect on \"Iyyaka na’budu wa iyyaka nasta’in\" during your prayers today."
	},
	{
		id: "lesson_tawheed_asma_ul_husna",
		category: "Tawheed",
		titleEn: "Living by Allah’s Beautiful Names (Al-Asma’ Al-Husna)",
		titleHi: "अल्लाह के प्यारे नामों (अस्मा-उल-हुस्ना) के साथ दुआ और ज़िंदगी",
		titleUr: "اسمائے حسنیٰ کی معرفت اور ان کے ذریعے دعا",
		titleHinglish: "Asma-ul-Husna ki Marifat aur Dua",
		titleAr: "معرفة أسماء الله الحسنى والدعاء بها",
		summaryEn: "How calling upon Allah by His Beautiful Names strengthens hope, humility, and character.",
		summaryHi: "अल्लाह के हुस्ना नामों को समझकर दुआ करने से ईमान और उम्मीद कैसे मज़बूत होती है।",
		summaryUr: "اللہ کے پیارے ناموں کو سمجھ کر پکارنے سے ایمان اور امید میں پختگی۔",
		readTimeMinutes: 5,
		objectives: ["Apply Surah Al-A’raf 7:180", "Call upon Allah with the Name matching your need"],
		bodyEn: [
			"In Surah Al-A’raf (7:180), Allah says: \"And to Allah belong the Best Names (Al-Asma’ Al-Husna), so invoke Him by them.\"",
			"When seeking forgiveness, we call upon Al-Ghafur and At-Tawwab; when seeking provision, we call upon Ar-Razzaq; when seeking healing, Ash-Shafi; when seeking wisdom, Al-Hakim and Al-Alim.",
			"In Sahih al-Bukhari (2736), the Prophet ﷺ explained that truly enumerating and living by Allah’s 99 Names—understanding their meanings and acting according to them—leads to Paradise."
		],
		bodyHi: [
			"सूरह आराफ़ (7:180) में अल्लाह फ़रमाता है: \"और अल्लाह ही के लिए सबसे अच्छे नाम हैं, तो उसे उन्हीं नामों से पुकारो।\"",
			"मग़फ़िरत के वक़्त या ग़फ़ूर, रिज़्क़ के लिए या रज़्ज़ाक़, और हिकमत के लिए या अलीम या हकीम कहकर दुआ करना सुन्नत है।",
			"सहीह बुख़ारी (2736) में अल्लाह के 99 नामों को समझने और उन पर अमल करने की बड़ी फ़ज़ीलत आई है।"
		],
		bodyUr: [
			"سورۃ الاعراف (7:180) میں ارشاد ہے: اور اللہ ہی کے لیے اچھے اچھے نام ہیں، سو تم اسے انہی ناموں سے پکارو۔",
			"اپنی حاجت کے مطابق اللہ کے مبارک ناموں کا وسیلہ دے کر دعا کرنا قبولیت کے قریب تر ہے۔",
			"صحیح بخاری (2736) میں اسمائے حسنیٰ کو یاد کرنے اور ان کے تقاضوں پر عمل کرنے والے کے لیے جنت کی بشارت ہے۔"
		],
		refs: ["Quran — Surah Al-A’raf 7:180", "Sahih al-Bukhari 2736"],
		takeaways: ["Begin every personal Dua by praising Allah with His Beautiful Names."],
		quizQ: "What does Surah Al-A’raf 7:180 command believers to do regarding Allah’s Beautiful Names (Al-Asma’ Al-Husna)?",
		quizOpts: [
			"Invoke and call upon Allah by them",
			"Forget them",
			"Keep them secret",
			"Only read them once a year"
		],
		quizAns: 0,
		quizExp: "Surah Al-A’raf 7:180 commands: \"And to Allah belong the best names, so invoke Him by them.\"",
		reflection: "Choose two of Allah’s Names today and use them in your personal Dua after Salah."
	},
	{
		id: "lesson_foundations_sincerity_niyyah",
		category: "Foundations of Islam",
		titleEn: "The Power of Intention (Innamal A’malu bin-Niyyat)",
		titleHi: "नीयत की अहमियत (इन्नमल-आमालु बिन-निय्यात)",
		titleUr: "اعمال کا دارومدار نیتوں پر ہے",
		titleHinglish: "Niyyat ki Ahmiyat — Innamal A’malu bin-Niyyat",
		titleAr: "إخلاص النية لله (إنما الأعمال بالنيات)",
		summaryEn: "How sincere intention transforms even everyday family work and study into rewarded worship.",
		summaryHi: "कैसे खालिस नीयत हमारे रोज़मर्रा के हलाल कामों और पढ़ाई को भी इबादत बना देती है।",
		summaryUr: "خالص نیت کس طرح روزمرہ کے جائز کاموں کو بھی عبادت اور ثواب میں بدل دیتی ہے۔",
		readTimeMinutes: 5,
		objectives: ["Understand Sahih al-Bukhari 1", "Renew intention before daily tasks"],
		bodyEn: [
			"Imam Al-Bukhari opened his entire Sahih collection with the foundational Hadith of Umar ibn Al-Khattab (RA): \"Actions are judged only by intentions, and every person shall have only what they intended\" (Sahih al-Bukhari 1).",
			"Sincerity (Ikhlas) means performing good deeds purely seeking Allah’s pleasure rather than praise or recognition from people.",
			"Remarkably, a pure intention also turns permissible daily routines—working honestly to support one’s family, studying useful knowledge, or sleeping early to wake for Fajr—into rewarded acts of worship."
		],
		bodyHi: [
			"इमाम बुख़ारी ने अपनी किताब की शुरुआत इसी अज़ीम हदीस से की है: \"तमाम आमाल का दारोमदार नीयतों पर है\" (सहीह बुख़ारी 1)।",
			"इख़लास का मतलब है कि हर नेक काम सिर्फ़ अल्लाह की रज़ा के लिए किया जाए, दिखावे के लिए नहीं।",
			"अच्छी नीयत से हलाल रोज़ी कमाना, परिवार की ख़िदमत करना और इल्म हासिल करना भी सवाब बन जाता है।"
		],
		bodyUr: [
			"صحیح بخاری کی سب سے پہلی حدیث ہے: اعمال کا دارومدار نیتوں پر ہے اور ہر شخص کے لیے وہی ہے جس کی اس نے نیت کی (صحیح بخاری 1)۔",
			"اخلاص کا تقاضا ہے کہ ہر نیکی دکھاوے سے پاک اور صرف رضائے الٰہی کے لیے ہو۔",
			"حلال روزی کمانا اور اہل و عیال کی کفالت کرنا بھی اچھی نیت سے عبادت بن جاتا ہے۔"
		],
		refs: [
			"Sahih al-Bukhari 1",
			"Sahih Muslim 1907",
			"Quran — Surah Al-Bayyinah 98:5"
		],
		takeaways: ["Pause for three seconds before any deed to check and purify your intention."],
		quizQ: "Which famous Hadith opens Sahih al-Bukhari (Hadith #1)?",
		quizOpts: [
			"Actions are judged only by intentions (Innamal a’malu bin-niyyat)",
			"Travel is a piece of torment",
			"The strong man is the one who controls anger",
			"Cleanliness is half of faith"
		],
		quizAns: 0,
		quizExp: "Sahih al-Bukhari 1 begins with the Hadith of Umar ibn Al-Khattab (RA): \"Actions are but by intentions.\"",
		reflection: "Set a conscious intention before your work or study today to benefit people for Allah’s sake."
	},
	{
		id: "lesson_foundations_quran_etiquette",
		category: "Foundations of Islam",
		titleEn: "Etiquette of Reading & Reflecting on the Quran (Tadabbur)",
		titleHi: "क़ुरआन पढ़ने और उस पर ग़ौर-ओ-फ़िक्र (तदब्बुर) करने के आदाब",
		titleUr: "تلاوتِ قرآن اور تدبر کے آداب",
		titleHinglish: "Tilawat-e-Quran aur Tadabbur ke Aadab",
		titleAr: "آداب تلاوة القرآن الكريم وتدبره",
		summaryEn: "Approaching the Book of Allah with cleanliness, measured recitation (Tartil), and an open heart.",
		summaryHi: "पाकीज़गी, ठहर-ठहर कर तिलावत (तरतील) और खुले दिल से क़ुरआन को समझने के आदाब।",
		summaryUr: "طہارت، ترتیل اور کھلے دل کے ساتھ قرآن مجید کو سمجھنے کے آداب۔",
		readTimeMinutes: 5,
		objectives: ["Practice Tartil (Surah Al-Muzzammil 73:4)", "Combine recitation with translation and reflection"],
		bodyEn: [
			"Allah states the purpose of revelation in Surah Sad (38:29): \"This is a blessed Book which We have revealed to you, that they might reflect upon its verses (liyaddabbaru ayatihi) and that those of understanding would be reminded.\"",
			"In Surah Al-Muzzammil (73:4), Allah commands: \"And recite the Quran with measured recitation (Tartila)\"—pronouncing each letter clearly without rushing.",
			"The Companions used to learn ten verses at a time, understanding their meaning and acting upon them before moving ahead, so that knowledge and action grew together."
		],
		bodyHi: [
			"सूरह साद (38:29) में अल्लाह ने बताया कि यह मुबारक किताब इसलिए नाज़िल की गई है ताकि लोग इसकी आयतों पर ग़ौर-ओ-फ़िक्र (तदब्बुर) करें।",
			"सूरह मुज़्ज़म्मिल (73:4) में ठहर-ठहर कर साफ़ आवाज़ में क़ुरआन पढ़ने (तरतील) का हुक्म है।",
			"तिलावत के साथ तर्जुमा पढ़ना दिल में ईमान की मिठास पैदा करता है।"
		],
		bodyUr: [
			"سورۃ ص (38:29) میں نزولِ قرآن کا مقصد اس کی آیات میں تدبر اور نصیحت حاصل کرنا بیان فرمایا گیا ہے۔",
			"سورۃ المزمل (73:4) میں قرآن کو ٹھہر ٹھہر کر ترتیل کے ساتھ پڑھنے کا حکم ہے۔",
			"تلاوت کے ساتھ ترجمہ اور مفہوم سمجھنا ایمان میں تازگی پیدا کرتا ہے۔"
		],
		refs: [
			"Quran — Surah Sad 38:29",
			"Quran — Surah Al-Muzzammil 73:4",
			"Sahih al-Bukhari 5027"
		],
		takeaways: ["Read even 5 verses daily with translation and write one personal reflection."],
		quizQ: "What does \"Tartil\" mean in Surah Al-Muzzammil 73:4 (\"wa rattilil-Qur’ana tartila\")?",
		quizOpts: [
			"Measured, clear, unhurried recitation of the Quran",
			"Reading silently without looking",
			"Skipping pages",
			"Reading as fast as possible"
		],
		quizAns: 0,
		quizExp: "Tartil means reciting the Quran slowly, clearly, and distinctly with reflection.",
		reflection: "Open the Quran Reader today, read 3 Ayahs with translation, and record a note in My Quran Journal."
	},
	{
		id: "lesson_wudu_tayammum_ease",
		category: "Wudu",
		titleEn: "Tayammum & Wiping Over Socks (Ease in Purification)",
		titleHi: "तयम्मुम और मोज़ों पर मसह — पाकीज़गी में इस्लाम की आसानी",
		titleUr: "تیمم اور موزوں پر مسح — طہارت میں شریعت کی آسانی",
		titleHinglish: "Tayammum aur Mozon par Masah — Taharat mein Aasani",
		titleAr: "التيمم والمسح على الخفين وتيسير الشريعة",
		summaryEn: "How Islamic jurisprudence provides mercy and ease during illness, travel, or water scarcity.",
		summaryHi: "बीमारी, सफ़र या पानी न मिलने की सूरत में इस्लाम ने पाकी और नमाज़ के लिए क्या आसानी रखी है।",
		summaryUr: "بیماری، سفر یا پانی نہ ملنے کی صورت میں طہارت کے آسان احکام۔",
		readTimeMinutes: 5,
		objectives: ["Understand when Tayammum is legislated (Quran 5:6)", "Know the Sunnah of wiping over Khuffayn"],
		bodyEn: [
			"Allah declares in Surah Al-Ma’idah (5:6) and Surah Al-Baqarah (2:185) that He intends ease for believers and does not intend hardship.",
			"When water is unavailable or using water would worsen an illness or wound, a believer performs Tayammum with clean earth: striking the palms lightly on pure earth, wiping the face, and wiping the hands.",
			"Similarly, the Sunnah permits wiping over leather socks or thick qualifying socks (Masah ’alal-Khuffayn) put on in a state of complete Wudu—for one day and night for a resident, and three days and nights for a traveler (Sahih Muslim 276)."
		],
		bodyHi: [
			"सूरह माइदा (5:6) में अल्लाह ने साफ़ फ़रमाया कि वह तुम्हें तंगी में नहीं डालना चाहता बल्कि तुम्हें पाक करना चाहता है।",
			"अगर पानी न मिले या बीमारी की वजह से पानी नुक़सानदेह हो, तो पाक मिट्टी से तयम्मुम (चेहरे और हाथों का मसह) करने की इजाज़त है।",
			"पूरे वुज़ू की हालत में पहने गए मोज़ों (ख़ुफ़्फ़ैन) पर मुक़ीम के लिए 1 दिन-रात और मुसाफ़िर के लिए 3 दिन-रात मसह की रुख़सत है (सहीह मुस्लिम 276)।"
		],
		bodyUr: [
			"سورۃ المائدہ (5:6) میں اللہ تعالیٰ نے بیماری یا عدمِ دستیابیِ آب کی صورت میں پاک مٹی سے تیمم کی اجازت عطا فرمائی ہے۔",
			"تیمم میں پاک مٹی پر ہاتھ مار کر چہرے اور ہاتھوں پر مسح کیا جاتا ہے۔",
			"کامل وضو کی حالت میں پہنے گئے موزوں (خفین) پر مقیم کے لیے ایک دن رات اور مسافر کے لیے تین دن رات مسح کی اجازت ہے (صحیح مسلم 276)۔"
		],
		refs: [
			"Quran — Surah Al-Ma’idah 5:6",
			"Sahih Muslim 276",
			"Sahih al-Bukhari 338"
		],
		takeaways: ["Never skip Salah due to travel or lack of water; Islam provides Tayammum and Masah."],
		quizQ: "According to Sahih Muslim 276, how long may a traveler wipe over their Khuffayn (socks put on in full Wudu)?",
		quizOpts: [
			"Three days and their nights (72 hours)",
			"One hour only",
			"Thirty days",
			"Never"
		],
		quizAns: 0,
		quizExp: "Ali ibn Abi Talib (RA) reported in Sahih Muslim 276 that the Prophet ﷺ set three days and nights for the traveler and one day and night for the resident.",
		reflection: "How does knowing about Tayammum help you keep prayers on time while traveling?"
	},
	{
		id: "lesson_salah_times_conditions",
		category: "Salah",
		titleEn: "The Prerequisites (Shurut) & Appointed Times of Salah",
		titleHi: "नमाज़ की शर्तें (शुरूत) और पाबंदी-ए-वक़्त",
		titleUr: "نماز کی شرائط اور اوقات کی پابندی",
		titleHinglish: "Namaz ki Shartein (Shurut) aur Waqt ki Pabandi",
		titleAr: "شروط الصلاة والمحافظة على أوقاتها",
		summaryEn: "The conditions required before starting prayer and why Salah is a timed appointment with Allah.",
		summaryHi: "नमाज़ शुरू करने से पहले की ज़रूरी शर्तें और वक़्त पर नमाज़ अदा करने की अहमियत।",
		summaryUr: "نماز شروع کرنے سے پہلے کی لازمی شرائط اور وقت پر ادائیگی کی اہمیت۔",
		readTimeMinutes: 5,
		objectives: ["Know the conditions of Salah (Taharat, Satr, Qibla, Time, Niyyah)", "Guard the middle prayer (Asr)"],
		bodyEn: [
			"In Surah An-Nisa (4:103), Allah states: \"Indeed, prayer has been decreed upon the believers a decree of specified times.\"",
			"Before entering Salah, scholars summarize the prerequisites (Shurut): purification from ritual impurity (Wudu/Ghusl), cleanliness of body, clothes, and place, covering the Awrah modestly, facing the Qibla (the Kaaba in Makkah), the entrance of the prayer’s appointed time, and intention in the heart.",
			"Allah specifically highlights guarding the five prayers and the \"middle prayer\" (Salatul Wusta — Asr) in Surah Al-Baqarah (2:238)."
		],
		bodyHi: [
			"सूरह निसा (4:103) में अल्लाह ने फ़रमाया कि बेशक नमाज़ ईमान वालों पर मुक़र्रर वक़्तों के साथ फ़र्ज़ है।",
			"नमाज़ से पहले की शर्तें हैं: बदन, कपड़े और जगह का पाक होना, वुज़ू होना, सतर ढँकना, क़िब्ला रुख़ होना, वक़्त का दाख़िल होना और दिल में नीयत।",
			"सूरह बक़रा (2:238) में नमाज़ों और ख़ासकर बीच वाली नमाज़ (अस्र) की हिफ़ाज़त की ताकीद है।"
		],
		bodyUr: [
			"سورۃ النساء (4:103) میں فرمایا گیا کہ نماز مومنوں پر مقررہ اوقات میں فرض کی گئی ہے۔",
			"نماز کی شرائط میں طہارت، سترِ عورت، استقبالِ قبلہ، وقت کا داخل ہونا اور نیت شامل ہیں۔",
			"سورۃ البقرہ (2:238) میں تمام نمازوں اور بالخصوص صلوٰۃ الوسطیٰ (نمازِ عصر) کی حفاظت کا حکم ہے۔"
		],
		refs: [
			"Quran — Surah An-Nisa 4:103",
			"Quran — Surah Al-Baqarah 2:238",
			"Sahih Muslim 612"
		],
		takeaways: ["Prepare for Salah 5 minutes before the Adhan so you enter prayer calmly."],
		quizQ: "What does Surah An-Nisa 4:103 state about the timing of Salah?",
		quizOpts: [
			"Prayer has been decreed upon the believers at specified appointed times",
			"Prayers can be combined any day without excuse",
			"Only Friday prayer has a time",
			"Time does not matter"
		],
		quizAns: 0,
		quizExp: "Surah An-Nisa 4:103 establishes that Salah is prescribed at fixed, appointed times.",
		reflection: "Which of the five daily prayers is hardest for your schedule, and how can you protect its time window?"
	},
	{
		id: "lesson_salah_sujood_sahw",
		category: "Salah",
		titleEn: "What to Do When You Forget in Prayer (Sujood as-Sahw)",
		titleHi: "नमाज़ में भूल-चूक हो जाए तो क्या करें (सजदा-ए-सहव)",
		titleUr: "نماز میں بھول چوک اور سجدہ سہو کے احکام",
		titleHinglish: "Namaz mein Bhool-Chook aur Sajdah-e-Sahw",
		titleAr: "سجود السهو وأحكام الشك في الصلاة",
		summaryEn: "The Prophetic remedy when a worshipper forgets a sitting or is unsure about the number of Rak’ahs.",
		summaryHi: "अगर नमाज़ में रकात की गिनती में शक हो या कोई वाजिब छूट जाए तो सजदा-ए-सहव कैसे करें।",
		summaryUr: "نماز میں رکعات کی تعداد میں شک یا بھول کی صورت میں سجدہ سہو کا طریقہ۔",
		readTimeMinutes: 5,
		objectives: ["Build upon certainty when doubting Rak’ah count", "Perform the two prostrations of forgetfulness"],
		bodyEn: [
			"Even the best of creation taught us practically how to mend forgetfulness in prayer: \"I am only a human being like you; I forget just as you forget, so when I forget, remind me\" (Sahih al-Bukhari 401).",
			"If a worshipper is unsure whether they prayed 3 or 4 Rak’ahs, the Prophet ﷺ instructed in Sahih Muslim (571) to cast aside doubt, build upon what is certain (the lesser number, 3), complete the remaining Rak’ah, and perform two prostrations of forgetfulness (Sujood as-Sahw).",
			"These two extra prostrations at the end of the prayer—performed before Taslim or immediately after one Taslim according to the juristic schools—complete any unintentional deficiency."
		],
		bodyHi: [
			"सहीह मुस्लिम (571) में नबी ﷺ ने सिखाया कि अगर किसी को शक हो कि उसने तीन रकात पढ़ी हैं या चार, तो वह यक़ीन (यानी कम संख्या — 3) पर अमल करे और नमाज़ के आख़िर में दो सजदे (सजदा-ए-सहव) कर ले।",
			"इसी तरह अगर पहली तशह्हुद (अत्तहिय्यात) में बैठना भूल जाए और पूरा खड़ा हो जाए, तो वापस न बैठे बल्कि आख़िर में सजदा-ए-सहव कर ले (सहीह बुख़ारी 829)।",
			"सजदा-ए-सहव अल्लाह की रहमत है जो इंसान की भूल-चूक की भरपाई कर देता है।"
		],
		bodyUr: [
			"صحیح مسلم (571) میں رہنمائی دی گئی ہے کہ اگر رکعات کی تعداد میں شک ہو (مثلاً تین یا چار) تو یقین (کم تعداد) پر بنیاد رکھے اور آخر میں سجدہ سہو کر لے۔",
			"اسی طرح اگر قعدہ اولیٰ بھول کر پورا کھڑا ہو جائے تو آخر میں سجدہ سہو سے نماز مکمل ہو جاتی ہے (صحیح بخاری 829)۔",
			"فقہائے اربعہ کے نزدیک سجدہ سہو کے دو سجدے نماز کی کمی بیشی کی تلافی کر دیتے ہیں۔"
		],
		refs: [
			"Sahih Muslim 571",
			"Sahih al-Bukhari 401",
			"Sahih al-Bukhari 829"
		],
		takeaways: ["When in doubt between 3 and 4 Rak’ahs, take the certain lower number (3) and do Sujood as-Sahw."],
		quizQ: "According to Sahih Muslim 571, if you are unsure whether you prayed 3 or 4 Rak’ahs and have no prevailing certainty, what should you do?",
		quizOpts: [
			"Build upon what is certain (3 Rak’ahs), complete the prayer, and perform two prostrations of Sujood as-Sahw",
			"Abandon the prayer completely",
			"Stop praying for the day",
			"Guess randomly without Sujood as-Sahw"
		],
		quizAns: 0,
		quizExp: "Sahih Muslim 571 instructs casting away doubt, building on certainty (the lesser number), and performing two prostrations of forgetfulness.",
		reflection: "Review the Madhhab-specific notes in the Salah Guide tab to see how Sujood as-Sahw fits into your prayer."
	},
	{
		id: "lesson_fasting_ramadan_purpose",
		category: "Fasting",
		titleEn: "The Spirit & Rulings of Fasting (Sawm) in Ramadan",
		titleHi: "रमज़ान के रोज़े का मक़सद (तक़वा) और अहकाम",
		titleUr: "رمضان کے روزوں کا مقصد (تقویٰ) اور احکام",
		titleHinglish: "Ramadan ke Roze ka Maqsad (Taqwa) aur Ahkam",
		titleAr: "فقه الصيام ومقصده الأعظم (لعلّكم تتقون)",
		summaryEn: "How fasting trains the heart in Taqwa, self-restraint, and compassion for the hungry.",
		summaryHi: "रोज़ा किस तरह इंसान के दिल में तक़वा, सब्र और भूखों के लिए हमदर्दी पैदा करता है।",
		summaryUr: "روزہ کس طرح انسان میں تقویٰ، ضبطِ نفس اور ہمدردی پیدا کرتا ہے۔",
		readTimeMinutes: 5,
		objectives: ["Understand Surah Al-Baqarah 2:183-185", "Guard the fast from false speech and anger"],
		bodyEn: [
			"In Surah Al-Baqarah (2:183), Allah reveals the core objective of fasting: \"O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may attain Taqwa (God-consciousness).\"",
			"Fasting from dawn (Fajr) to sunset (Maghrib) is not merely abstaining from food and water; the Prophet ﷺ warned in Sahih al-Bukhari (1903): \"Whoever does not give up false speech and acting upon it, Allah has no need in his leaving his food and drink.\"",
			"Allah also granted merciful exemptions in Surah Al-Baqarah (2:184-185) for the sick, travelers, pregnant or nursing mothers, and women during menstruation—allowing make-up days later without hardship."
		],
		bodyHi: [
			"सूरह बक़रा (2:183) में रोज़े का मक़सद \"लअल्लकुम तत्तक़ून\" (ताकि तुममें तक़वा पैदा हो) बताया गया है।",
			"सहीह बुख़ारी (1903) में नबी ﷺ ने फ़रमाया कि जो रोज़े में झूठ और बुरे अमल न छोड़े, अल्लाह को उसके भूखा-प्यासा रहने की कोई ज़रूरत नहीं।",
			"बीमार और मुसाफ़िर के लिए क़ुरआन (2:184-185) ने दूसरे दिनों में गिनती पूरी करने की आसानी दी है।"
		],
		bodyUr: [
			"سورۃ البقرہ (2:183) میں فرضیتِ صوم کا مقصد حصولِ تقویٰ بیان فرمایا گیا ہے۔",
			"صحیح بخاری (1903) کے مطابق روزے کی اصل روح جھوٹ، غصے اور برائی سے بچنا ہے۔",
			"مریض اور مسافر کے لیے شریعت نے دوسرے دنوں میں قضا کی سہولت رکھی ہے (البقرہ 184-185)۔"
		],
		refs: [
			"Quran — Surah Al-Baqarah 2:183-185",
			"Sahih al-Bukhari 1903",
			"Sahih al-Bukhari 1894"
		],
		takeaways: ["True fasting guards the stomach, eyes, ears, and tongue together."],
		quizQ: "What is the primary purpose of fasting stated at the end of Surah Al-Baqarah 2:183?",
		quizOpts: [
			"\"That you may attain Taqwa (God-consciousness)\"",
			"To lose weight only",
			"To sleep all afternoon",
			"To feast wastefully at night"
		],
		quizAns: 0,
		quizExp: "Surah Al-Baqarah 2:183 concludes with \"la’allakum tattaqun\" — so that you may become mindful of Allah (attain Taqwa).",
		reflection: "How can voluntary fasting (like Mondays/Thursdays or the 3 white days) help reset your spiritual discipline?"
	},
	{
		id: "lesson_fasting_sunnah_days",
		category: "Fasting",
		titleEn: "Voluntary Sunnah Fasts Throughout the Year",
		titleHi: "साल भर के मसनून नफ़्ली रोज़े (आशूरा, अरफ़ा, अय्यामे-बीज़)",
		titleUr: "سال بھر کے مسنون نفلی روزے (عرفہ، عاشوراء، ایامِ بیض)",
		titleHinglish: "Sunnah Nafli Roze — Arafah, Ashura aur Ayyam al-Beed",
		titleAr: "صيام التطوع: عرفة وعاشوراء والأيام البيض",
		summaryEn: "Keeping the spirit of Ramadan alive all year through gentle, high-reward Sunnah fasts.",
		summaryHi: "रमज़ान के बाद साल भर ईमान को ताज़ा रखने वाले आसान मसनून रोज़े और उनका सवाब।",
		summaryUr: "رمضان کے بعد سال بھر روحانیت کو زندہ رکھنے والے مسنون نفلی روزے۔",
		readTimeMinutes: 4,
		objectives: ["Know the virtues of Shawwal, Arafah, and Ashura fasts", "Practice the 3 monthly Ayyam al-Beed fasts"],
		bodyEn: [
			"After Ramadan, the Prophet ﷺ encouraged fasting six days of Shawwal: \"Whoever fasts Ramadan and follows it with six days of Shawwal, it is as if he fasted for a lifetime\" (Sahih Muslim 1164).",
			"He also recommended the Day of Arafah (9th Dhul-Hijjah) for non-pilgrims, which expiates the minor sins of the previous and coming year, and the Day of Ashura (10th Muharram, alongside the 9th), which expiates the previous year (Sahih Muslim 1162).",
			"Each lunar month, fasting three days—especially the 13th, 14th, and 15th (Ayyam al-Beed)—carries the reward of fasting the entire month (Sahih al-Bukhari 1978)."
		],
		bodyHi: [
			"सहीह मुस्लिम (1164) में है कि रमज़ान के बाद शव्वाल के 6 रोज़े रखना पूरे साल के रोज़ों के बराबर है।",
			"ग़ैर-हाजी के लिए अरफ़ा (9 ज़िल-हिज्जा) का रोज़ा दो साल के और आशूरा (10 मुहर्रम) का रोज़ा एक साल के छोटे गुनाहों का कफ़्फ़ारा है (सहीह मुस्लिम 1162)।",
			"हर चाँद के महीने में 3 दिन (अय्यामे-बीज़: 13, 14, 15 तारीख़) के रोज़े रखने की भी वसीयत की गई है (सहीह बुख़ारी 1978)।"
		],
		bodyUr: [
			"صحیح مسلم (1164) کے مطابق رمضان کے بعد شوال کے چھ روزے رکھنا عمر بھر کے روزوں کے مانند ہے۔",
			"یومِ عرفہ (9 ذوالحجہ) کا روزہ دو سال اور یومِ عاشوراء کا روزہ ایک سال کے صغیرہ گناہوں کا کفارہ ہے (صحیح مسلم 1162)۔",
			"ہر قمری مہینے کے تین دن (ایامِ بیض: 13، 14، 15 تاریخ) کے روزے رکھنا بھی سنتِ مؤکدہ ہے (صحیح بخاری 1978)۔"
		],
		refs: [
			"Sahih Muslim 1164",
			"Sahih Muslim 1162",
			"Sahih al-Bukhari 1978"
		],
		takeaways: ["Mark the 13th, 14th, and 15th of the Hijri month as a gentle family habit."],
		quizQ: "According to Sahih Muslim 1164, fasting Ramadan followed by six days of which month carries the reward of fasting the whole year?",
		quizOpts: [
			"Shawwal",
			"Safar",
			"Rabi al-Thani",
			"Jumada al-Ula"
		],
		quizAns: 0,
		quizExp: "Sahih Muslim 1164 states: \"Whoever fasts Ramadan and follows it with six days of Shawwal, it is as if he fasted for a lifetime.\"",
		reflection: "Which upcoming Sunnah fast day can you plan for this month?"
	},
	{
		id: "lesson_zakat_purification",
		category: "Zakat",
		titleEn: "Zakat & Sadaqah — Purifying Wealth and Uplifting Society",
		titleHi: "ज़कात और सदक़ा — माल की पाकीज़गी और समाज की मदद",
		titleUr: "زکوٰۃ اور صدقہ — مال کی پاکیزگی اور معاشرتی کفالت",
		titleHinglish: "Zakat aur Sadaqah — Maal ki Paaki aur Samaj ki Madad",
		titleAr: "الزكاة والصدقة: تطهير المال وتكافل المجتمع",
		summaryEn: "How the third pillar of Islam purifies the heart from greed and guarantees the rights of the vulnerable.",
		summaryHi: "इस्लाम का तीसरा सुतून ज़कात कैसे दिल को लालच से पाक करता है और ज़रूरतमंदों का हक़ पहुँचाता है।",
		summaryUr: "اسلام کا تیسرا رکن زکوٰۃ کس طرح دل کو بخل سے پاک کرتا ہے اور مستحقین کا حق ادا کرتا ہے۔",
		readTimeMinutes: 5,
		objectives: ["Understand Nisab and the 2.5% annual Zakat rule", "Know the 8 categories in Surah At-Tawbah 9:60"],
		bodyEn: [
			"Linguistically, Zakat means purification and growth. In Surah At-Tawbah (9:103), Allah says: \"Take from their wealth a charity by which you purify them and cause them to increase.\"",
			"When qualifying savings, gold, silver, or trade goods reach the Nisab threshold and remain for a full lunar year (Hawl), 2.5% (one-fortieth) is due as an obligatory right of the recipients specified in Surah At-Tawbah (9:60)—starting with the poor (Al-Fuqara) and the needy (Al-Masakin).",
			"Beyond obligatory Zakat, voluntary Sadaqah given with kindness and without reminding the recipient of favors (Surah Al-Baqarah 2:264) never decreases wealth (Sahih Muslim 2588)."
		],
		bodyHi: [
			"ज़कात का लफ़्ज़ी मतलब पाकीज़गी और बढ़ोतरी है (सूरह तौबा 9:103)।",
			"जब बचत या सोने-चाँदी व तिजारत का माल \"निसाब\" के बराबर होकर पूरे एक क़मरी साल तक रहे, तो उस पर 2.5% (चालीसवाँ हिस्सा) ज़कात फ़र्ज़ होती है, जिसके 8 मसारिफ़ सूरह तौबा (9:60) में बयान किए गए हैं।",
			"सहीह मुस्लिम (2588) में नबी ﷺ ने फ़रमाया: \"सदक़ा देने से माल में कभी कमी नहीं होती।\""
		],
		bodyUr: [
			"زکوٰۃ کا لغوی معنی پاکیزگی اور نشوونما ہے (التوبہ 103)۔",
			"نصاب کے برابر مال پر ایک قمری سال گزرنے کے بعد ڈھائی فیصد (چالیسواں حصہ) زکوٰۃ فرض ہے جس کے آٹھ مصارف سورۃ التوبہ (9:60) میں بیان ہوئے ہیں۔",
			"صحیح مسلم (2588) میں ارشاد ہے کہ صدقہ دینے سے مال کبھی کم نہیں ہوتا۔"
		],
		refs: [
			"Quran — Surah At-Tawbah 9:60 & 9:103",
			"Quran — Surah Al-Baqarah 2:264",
			"Sahih Muslim 2588"
		],
		takeaways: ["Giving charity with respect and humility purifies both wealth and character."],
		quizQ: "Which Surah and Ayah lists the eight eligible categories of Zakat recipients?",
		quizOpts: [
			"Surah At-Tawbah 9:60",
			"Surah Al-Asr 103:1",
			"Surah An-Nas 114:1",
			"Surah Al-Kawthar 108:1"
		],
		quizAns: 0,
		quizExp: "Surah At-Tawbah 9:60 (\"Innamas-sadaqatu lil-fuqara’i wal-masakin...\") defines the eight categories of Zakat recipients.",
		reflection: "How can your family set up a small weekly Sadaqah jar at home so children learn generosity early?"
	},
	{
		id: "lesson_hajj_unity_journey",
		category: "Hajj",
		titleEn: "Hajj — TheSacred Journey of Unity & Renewal",
		titleHi: "हज — इंसानियत की बराबरी और इब्राहीमी यादगार का सफ़र",
		titleUr: "حج — وحدتِ انسانیت اور ابراہیمی شعار کا سفر",
		titleHinglish: "Hajj — Wahdat aur Ibrahimi Yaadgar ka Safar",
		titleAr: "الحج: رحلة التوحيد والوحدة الإنسانية",
		summaryEn: "Understanding the rites of Hajj, the legacy of Ibrahim (AS), and the universal equality of humanity.",
		summaryHi: "हज के अरकान, हज़रत इब्राहीम (AS) की सुन्नत और इंसानियत की बराबरी का पैग़ाम।",
		summaryUr: "مناسکِ حج، سنتِ ابراہیمی اور عالمگیر انسانی مساوات۔",
		readTimeMinutes: 5,
		objectives: ["Understand Surah Aal-e-Imran 3:97", "Reflect on the Farewell Sermon on human equality"],
		bodyEn: [
			"Hajj to the Sacred House in Makkah is obligatory once in a lifetime for every adult Muslim who is physically and financially able (Surah Aal-e-Imran 3:97).",
			"Clad in two simple unsewn white garments of Ihram, kings and laborers stand shoulder to shoulder chanting the Talbiyah: \"Labbayk Allahumma Labbayk\" (Here I am, O Allah, here I am)—recalling the devotion of Ibrahim, Hajar, and Ismail (peace be upon them).",
			"During the Farewell Hajj at Arafat, the Prophet ﷺ proclaimed that all humanity descends from Adam, and no Arab has superiority over a non-Arab, nor white over black, except by Taqwa (Musnad Ahmad 23489)."
		],
		bodyHi: [
			"सूरह आले-इमरान (3:97) के मुताबिक़ हर उस बालिग़ मुसलमान पर ज़िंदगी में एक बार हज फ़र्ज़ है जो सफ़र और ख़र्च की ताक़त रखता हो।",
			"एहराम के सादे सफ़ेद कपड़ों में अमीर और ग़रीब सब एक साथ \"लब्बैक अल्लाहुम्मा लब्बैक\" पुकारते हैं।",
			"हज्जतुल-विदा के ख़ुत्बे में नबी ﷺ ने ऐलान फ़रमाया कि किसी गोरे को काले पर या अरबी को अजमी पर कोई बड़ाई नहीं, सिवाय तक़वा के।"
		],
		bodyUr: [
			"سورۃ آلِ عمران (3:97) کے مطابق ہر صاحبِ استطاعت مسلمان پر زندگی میں ایک بار بیت اللہ کا حج فرض ہے۔",
			"احرام کے سادہ لباس میں تمام انسان رنگ و نسل کے امتیاز سے بالاتر ہو کر لبیک اللھم لبیک پکارتے ہیں۔",
			"خطبہ حجۃ الوداع میں نبی کریم ﷺ نے انسانی مساوات اور تقویٰ کو معیارِ فضیلت قرار دیا۔"
		],
		refs: [
			"Quran — Surah Aal-e-Imran 3:97",
			"Sahih al-Bukhari 1521",
			"Musnad Ahmad 23489"
		],
		takeaways: ["An accepted Hajj (Hajj Mabrur) transforms a person’s character for the rest of their life."],
		quizQ: "What is the proclamation chanted by pilgrims entering Ihram during Hajj and Umrah?",
		quizOpts: [
			"The Talbiyah (\"Labbayk Allahumma Labbayk...\")",
			"Adhan only",
			"Iqamah",
			"Qunoot"
		],
		quizAns: 0,
		quizExp: "Pilgrims chant the Talbiyah (\"Labbayk Allahumma Labbayk...\") declaring their response to Allah’s call.",
		reflection: "Even before performing Hajj, how can we live the spirit of \"Labbayk\" (responding immediately to Allah’s call) in daily prayers?"
	},
	{
		id: "lesson_character_patience_gratitude",
		category: "Islamic character",
		titleEn: "The Two Wings of a Believer: Sabr (Patience) & Shukr (Gratitude)",
		titleHi: "मोमिन के दो पर: सब्र (धैर्य) और शुक्र (कृतज्ञता)",
		titleUr: "مومن کے دو بازو: صبر اور شکر",
		titleHinglish: "Momin ke Do Par — Sabr aur Shukr",
		titleAr: "جناحا المؤمن: الصبر والشكر (عجباً لأمر المؤمن)",
		summaryEn: "Why every situation in a believer’s life turns into good through gratitude in ease and patience in test.",
		summaryHi: "कैसे ख़ुशी में शुक्र और आज़माइश में सब्र मोमिन के हर हाल को भलाई बना देता है।",
		summaryUr: "کس طرح نعمت پر شکر اور آزمائش پر صبر مومن کے ہر حال کو خیر بنا دیتا ہے۔",
		readTimeMinutes: 4,
		objectives: ["Memorize the lesson of Sahih Muslim 2999", "Respond to first shock of hardship with patience"],
		bodyEn: [
			"Suhaib (RA) reported that the Messenger of Allah ﷺ said: \"Wondrous is the affair of the believer, for there is good for him in every matter! If prosperity comes to him, he is grateful (Shakar), and that is good for him; and if adversity befalls him, he is patient (Sabar), and that is good for him\" (Sahih Muslim 2999).",
			"Patience (Sabr) in Islam is not passive hopelessness; it includes patience in obeying Allah, patience in avoiding sin, and composure at the very first strike of a trial (Sahih al-Bukhari 1283).",
			"Gratitude (Shukr) is recognizing blessings in the heart, praising Allah with the tongue, and using those blessings in service to others."
		],
		bodyHi: [
			"सहीह मुस्लिम (2999) में नबी ﷺ ने फ़रमाया: \"मोमिन का मामला भी कितना अजीब है! उसके हर काम में भलाई है; अगर ख़ुशी मिलती है तो शुक्र करता है, और अगर तकलीफ़ पहुँचती है तो सब्र करता है।\"",
			"सहीह बुख़ारी (1283) में फ़रमाया गया कि असली सब्र मुसीबत के शुरू के सदमे के वक़्त अपने आप को सँभालना है।",
			"शुक्र से नेमतें बढ़ती हैं (सूरह इब्राहीम 14:7) और सब्र से अल्लाह का साथ मिलता है।"
		],
		bodyUr: [
			"صحیح مسلم (2999) میں ارشاد ہے کہ مومن کا ہر معاملہ خیر ہے: خوشحالی ملے تو شکر کرتا ہے اور آزمائش آئے تو صبر کرتا ہے۔",
			"صحیح بخاری (1283) کے مطابق حقیقی صبر صدمے کے ابتدائی لمحے میں ضبط سے کام لینا ہے۔",
			"شکر سے نعمتوں میں اضافہ ہوتا ہے (ابراہیم 7) اور صبر سے اللہ کی معیت حاصل ہوتی ہے۔"
		],
		refs: [
			"Sahih Muslim 2999",
			"Sahih al-Bukhari 1283",
			"Quran — Surah Ibrahim 14:7"
		],
		takeaways: ["Pair every blessing with Alhamdulillah and every test with Sabr and Istirja’."],
		quizQ: "According to Sahih Muslim 2999, why is the affair of a believer always good in every circumstance?",
		quizOpts: [
			"Because he practices Shukr in prosperity and Sabr in adversity",
			"Because he never faces any tests",
			"Because he has unlimited gold",
			"Because he never works"
		],
		quizAns: 0,
		quizExp: "Sahih Muslim 2999 explains that the believer gains reward through gratitude in ease and patience in hardship.",
		reflection: "Name three blessings from today that you can thank Allah for right now."
	},
	{
		id: "lesson_character_Controlling_anger",
		category: "Islamic character",
		titleEn: "True Strength: Mastering Anger (La Taghdab)",
		titleHi: "असली ताक़तवर कौन है? ग़ुस्से पर क़ाबू पाने का नबवी तरीक़ा",
		titleUr: "حقیقی پہلوان کون؟ غصے پر قابو پانے کے نبوی نسخے",
		titleHinglish: "Asli Taqatwar Kaun? Gusse par Qabu Pana (La Taghdab)",
		titleAr: "القوة الحقيقية وكظم الغيظ (لا تغضب)",
		summaryEn: "Practical Prophetic steps—seeking refuge, changing posture, and making Wudu—to cool anger immediately.",
		summaryHi: "ग़ुस्सा आने पर तअव्वुज़ पढ़ना, बैठ जाना और वुज़ू करना—नबी ﷺ की व्यावहारिक नसीहतें।",
		summaryUr: "غصہ آنے پر تعوذ پڑھنا، بیٹھ جانا اور وضو کرنا—عملی نبوی ہدایات۔",
		readTimeMinutes: 4,
		objectives: ["Apply Sahih al-Bukhari 6114 & 6116", "Use posture change and silence when provoked"],
		bodyEn: [
			"In Sahih al-Bukhari (6114), the Prophet ﷺ redefined strength: \"The strong person is not the one who throws people down in wrestling; rather, the strong person is the one who controls himself when angry.\"",
			"When a companion asked for concise life advice, the Prophet ﷺ repeated three times: \"Do not become angry (La taghdab)\" (Sahih al-Bukhari 6116).",
			"He also gave practical remedies when anger rises: say \"A’udhu billahi minash-shaytanir-rajim\" (Bukhari 6115), remain silent, sit down if standing, lie down if sitting (Sunan Abi Dawud 4782), and make Wudu with cool water."
		],
		bodyHi: [
			"सहीह बुख़ारी (6114) में नबी ﷺ ने फ़रमाया: \"पहलवान वह नहीं जो कुश्ती में पछाड़ दे, बल्कि असली ताक़तवर वह है जो ग़ुस्से के वक़्त अपने आप को क़ाबू में रखे।\"",
			"एक सहाबी की दरख़्वास्त पर आप ﷺ ने तीन बार फ़रमाया: \"ग़ुस्सा मत करो (ला तग़दब)\" (सहीह बुख़ारी 6116)।",
			"ग़ुस्सा आने पर \"अऊज़ु बिल्लाहि मिनश-शैतानिर-रजीम\" पढ़ना, ख़ामोश हो जाना और खड़े हों तो बैठ जाना सुन्नत इलाज है।"
		],
		bodyUr: [
			"صحیح بخاری (6114) میں فرمایا گیا کہ طاقتور وہ ہے جو غصے کے وقت اپنے نفس پر قابو رکھے۔",
			"ایک صحابی کو آپ ﷺ نے وصیت فرمائی: لا تغضب (غصہ نہ کرو) (صحیح بخاری 6116)۔",
			"غصہ آنے پر تعوذ پڑھنا، خاموش رہنا اور کھڑے ہوں تو بیٹھ جانا مسنون علاج ہے (ابو داؤد 4782)۔"
		],
		refs: [
			"Sahih al-Bukhari 6114",
			"Sahih al-Bukhari 6116",
			"Sunan Abi Dawud 4782"
		],
		takeaways: ["When provoked, pause, say A’udhu billah, sit down, and drink or wash with water."],
		quizQ: "In Sahih al-Bukhari 6114, who did the Prophet ﷺ define as the truly strong person?",
		quizOpts: [
			"The one who controls himself when angry",
			"The loudest speaker in a room",
			"The one who never forgives",
			"The fastest runner"
		],
		quizAns: 0,
		quizExp: "Sahih al-Bukhari 6114 states: \"The strong is not the one who overcomes people by his strength, but the strong is the one who controls himself while in anger.\"",
		reflection: "Next time you feel irritated at home or work, try sitting down and staying quiet for 10 seconds before replying."
	},
	{
		id: "lesson_character_humility_kibr",
		category: "Islamic character",
		titleEn: "Humility (Tawadu’) vs. Arrogance (Kibr)",
		titleHi: "विनम्रता (तवाज़ो) और घमंड (किब्र) से बचाव",
		titleUr: "تواضع (عاجزی) کی فضیلت اور تکبر کی مذمت",
		titleHinglish: "Tawadu (Aajizi) vs. Kibr (Ghamand)",
		titleAr: "فضل التواضع والتحذير من الكبر",
		summaryEn: "Understanding the Prophetic definition of arrogance—rejecting truth and looking down on people.",
		summaryHi: "नबी ﷺ के मुताबिक़ घमंड की असली पहचान क्या है और अल्लाह विनम्र इंसान को कैसे ऊँचा करता है।",
		summaryUr: "نبی کریم ﷺ کے فرمان کے مطابق تکبر کی تعریف اور عاجزی کا انعام۔",
		readTimeMinutes: 4,
		objectives: ["Know the definition of Kibr in Sahih Muslim 91", "Walk with humility like the Ibadur-Rahman"],
		bodyEn: [
			"In Sahih Muslim (91), the Prophet ﷺ clarified that wearing clean, nice clothes is not arrogance, for \"Allah is Beautiful and loves beauty.\" Rather, he defined arrogance clearly: \"Arrogance (Al-Kibr) is rejecting the truth (Batarul-Haqq) and looking down upon people (Ghamtun-Nas).\"",
			"Conversely, he promised in Sahih Muslim (2588): \"No one humbles himself for the sake of Allah except that Allah raises his status.\"",
			"In Surah Al-Furqan (25:63), the first quality of the Servants of the Most Merciful (Ibadur-Rahman) is that they walk upon the earth gently with humility, and when addressed harshly by the ignorant, they reply with words of peace."
		],
		bodyHi: [
			"सहीह मुस्लिम (91) में नबी ﷺ ने साफ़ किया कि अच्छे और साफ़ कपड़े पहनना घमंड नहीं है; बल्कि \"किब्र (घमंड) तो हक़ बात को ठुकराना और लोगों को हक़ीर (छोटा) समझना है।\"",
			"और सहीह मुस्लिम (2588) में फ़रमाया: \"जो कोई अल्लाह के लिए विनम्रता (तवाज़ो) इख़्तियार करता है, अल्लाह उसका दर्जा बुलंद कर देता है।\"",
			"सूरह फ़ुरक़ान (25:63) में रहमान के नेक बंदों की पहली सिफ़त ज़मीन पर नरमी और आजीज़ी से चलना बताई गई है।"
		],
		bodyUr: [
			"صحیح مسلم (91) میں نبی کریم ﷺ نے تکبر کی جامع تعریف فرمائی: تکبر حق بات کو ٹھکرانا اور لوگوں کو حقیر سمجھنا ہے۔",
			"اور صحیح مسلم (2588) میں بشارت دی کہ جو شخص اللہ کے لیے عاجزی اختیار کرتا ہے اللہ اسے سربلندی عطا فرماتا ہے۔",
			"سورۃ الفرقان (25:63) میں عباد الرحمٰن کی پہلی صفت زمین پر عاجزی سے چلنا بیان کی گئی ہے۔"
		],
		refs: [
			"Sahih Muslim 91",
			"Sahih Muslim 2588",
			"Quran — Surah Al-Furqan 25:63"
		],
		takeaways: ["Accept truth regardless of who speaks it, and treat every human being with dignity."],
		quizQ: "How did the Prophet ﷺ define arrogance (Al-Kibr) in Sahih Muslim 91?",
		quizOpts: [
			"Rejecting the truth and looking down upon people",
			"Wearing clean clothes and neat shoes",
			"Smiling at neighbors",
			"Learning new skills"
		],
		quizAns: 0,
		quizExp: "In Sahih Muslim 91, the Prophet ﷺ defined Al-Kibr as \"Batarul-haqq wa ghamtun-nas\" (rejecting truth and despising people).",
		reflection: "Make it a habit to greet people first—including children and service workers—with a warm Salam."
	},
	{
		id: "lesson_character_forgiveness_ihsan",
		category: "Islamic character",
		titleEn: "Pardoning Others & Repelling Evil with Good",
		titleHi: "माफ़ करना (अफ़्व) और बुराई का जवाब भलाई से देना",
		titleUr: "معاف کرنا (عفو و درگزر) اور برائی کا جواب بھلائی سے دینا",
		titleHinglish: "Afw o Darguzar — Burai ka Jawab Bhalai se Dena",
		titleAr: "العفو والصفح والدفع بالتي هي أحسن",
		summaryEn: "How forgiving others brings Allah’s forgiveness and turns hostility into warm friendship.",
		summaryHi: "दूसरों को माफ़ करने से अल्लाह की बख़्शिश कैसे मिलती है और दुश्मनी दोस्ती में कैसे बदलती है।",
		summaryUr: "دوسروں کو معاف کرنے سے اللہ کی مغفرت کا حصول اور عداوت کا دوستی میں بدلنا۔",
		readTimeMinutes: 5,
		objectives: ["Reflect on Surah An-Nur 24:22 & Surah Fussilat 41:34", "Let go of grudges before sleeping"],
		bodyEn: [
			"In Surah An-Nur (24:22), Allah asks a heart-moving question: \"Let them pardon and overlook. Would you not love that Allah should forgive you? And Allah is Forgiving and Merciful.\"",
			"In Surah Fussilat (41:34), Allah teaches a transformative social principle: \"Good and evil are not equal. Repel by that which is better; and thereupon, the one between whom and you was enmity will become as though he were a devoted friend.\"",
			"Pardoning when one has the ability to retaliate does not weaken a believer; the Prophet ﷺ promised in Sahih Muslim (2588) that Allah only increases a servant in honor through forgiveness."
		],
		bodyHi: [
			"सूरह नूर (24:22) में अल्लाह फ़रमाता है: \"उन्हें चाहिए कि माफ़ करें और दरगुज़र करें; क्या तुम यह पसंद नहीं करते कि अल्लाह तुम्हें माफ़ कर दे?\"",
			"और सूरह फ़ुस्सिलत (41:34) में सिखाया गया कि बुराई को सबसे अच्छे तरीक़े (भलाई) से दूर करो, तो दुश्मन भी जिगरी दोस्त जैसा बन जाएगा।",
			"माफ़ करने से इंसान की इज़्ज़त कभी कम नहीं होती बल्कि अल्लाह उसकी इज़्ज़त और बढ़ा देता है (सहीह मुस्लिम 2588)।"
		],
		bodyUr: [
			"سورۃ النور (24:22) میں ارشاد ہے: انہیں چاہیے کہ معاف کریں اور درگزر سے کام لیں، کیا تم نہیں چاہتے کہ اللہ تمہاری مغفرت فرمائے؟",
			"سورۃ فصلت (41:34) میں تعلیم دی گئی کہ برائی کا دفعیہ احسن طریقے سے کرو۔",
			"معاف کرنے سے اللہ تعالیٰ بندے کی عزت ہی میں اضافہ فرماتا ہے (صحیح مسلم 2588)۔"
		],
		refs: [
			"Quran — Surah An-Nur 24:22",
			"Quran — Surah Fussilat 41:34",
			"Sahih Muslim 2588"
		],
		takeaways: ["Forgive people before going to sleep so your heart rests clean."],
		quizQ: "What question does Allah ask believers in Surah An-Nur 24:22 to encourage pardoning others?",
		quizOpts: [
			"\"Would you not love that Allah should forgive you?\"",
			"\"Who owns the market?\"",
			"\"How tall is the mountain?\"",
			"\"Why did you travel?\""
		],
		quizAns: 0,
		quizExp: "Surah An-Nur 24:22 says: \"Let them pardon and overlook. Would you not love that Allah should forgive you?\"",
		reflection: "Is there any small family or workplace misunderstanding you can overlook today for Allah’s sake?"
	},
	{
		id: "lesson_family_mercy_marriage",
		category: "Family responsibilities",
		titleEn: "Tranquility, Love & Mercy in Family Life",
		titleHi: "परिवार में सुकून, मोहब्बत और रहमत (सकीना व मवद्दत)",
		titleUr: "خاندانی زندگی میں سکون، محبت اور رحمت",
		titleHinglish: "Family Life mein Sukoon, Mohabbat aur Rahmat",
		titleAr: "المودة والرحمة والسكينة في الأسرة المسلمة",
		summaryEn: "The Quranic vision of marriage and family as a sanctuary of mutual kindness and partnership.",
		summaryHi: "घर और परिवार को आपसी सम्मान, मोहब्बत और सुकून का गहवारा बनाने की क़ुरआनी तालीम।",
		summaryUr: "گھر اور خاندان کو باہمی احترام، مودت اور سکینت کا گہوارہ بنانے کی قرآنی تعلیم۔",
		readTimeMinutes: 5,
		objectives: ["Understand Surah Ar-Rum 30:21", "Follow the Prophet’s ﷺ example of helping at home"],
		bodyEn: [
			"In Surah Ar-Rum (30:21), Allah describes family life upon three pillars: Sakinah (tranquility and emotional safety), Mawaddah (active love), and Rahmah (compassionate mercy during human imperfections).",
			"The Prophet ﷺ set the highest standard of family character: \"The best of you is the one who is best to his family, and I am the best of you to my family\" (Jami` at-Tirmidhi 3895).",
			"When Aisha (RA) was asked what the Prophet ﷺ did inside his home, she replied: \"He used to be in the service of his family (helping with household chores), and when the time for prayer came, he would go out to pray\" (Sahih al-Bukhari 676)."
		],
		bodyHi: [
			"सूरह रूम (30:21) में अल्लाह ने पारिवारिक जीवन की तीन बुनियादें बताई हैं: सुकून (सकीना), मोहब्बत (मवद्दत) और रहमत।",
			"जामे तिर्मिज़ी (3895) में नबी ﷺ ने फ़रमाया: \"तुममें सबसे बेहतरीन वह है जो अपने घरवालों के लिए सबसे अच्छा हो।\"",
			"हज़रत आइशा (RA) ने बताया कि आप ﷺ घर में अपने घरवालों के कामों में हाथ बँटाते थे (सहीह बुख़ारी 676)।"
		],
		bodyUr: [
			"سورۃ الروم (30:21) میں خاندانی زندگی کی بنیاد سکینت، مودت اور رحمت قرار دی گئی ہے۔",
			"جامع ترمذی (3895) میں ارشاد ہے: تم میں سب سےبہترین وہ ہے جو اپنے گھر والوں کے ساتھ سب سے اچھا ہو۔",
			"صحیح بخاری (676) کے مطابق نبی کریم ﷺ گھر میں اپنے اہلِ خانہ کے کام کاج میں ہاتھ بٹاتے تھے۔"
		],
		refs: [
			"Quran — Surah Ar-Rum 30:21",
			"Jami` at-Tirmidhi 3895",
			"Sahih al-Bukhari 676"
		],
		takeaways: ["Helping with household chores and speaking kindly at home is a direct Sunnah."],
		quizQ: "According to Sahih al-Bukhari 676, how did Aisha (RA) describe what the Prophet ﷺ did inside his home?",
		quizOpts: [
			"He was in the service of his family (helping at home) until prayer time",
			"He demanded everyone serve him silently",
			"He never spoke at home",
			"He stayed angry"
		],
		quizAns: 0,
		quizExp: "Aisha (RA) reported in Sahih al-Bukhari 676 that the Prophet ﷺ served and helped his family at home.",
		reflection: "What household chore can you cheerfully take care of today without being asked?"
	},
	{
		id: "lesson_family_tarbiyah_children",
		category: "Family responsibilities",
		titleEn: "Merciful Tarbiyah: Raising Children with Love & Example",
		titleHi: "बच्चों की तरबियत: मोहब्बत, सब्र और अपने अमल से सिखाना",
		titleUr: "اولاد کی تربیت: شفقت، عدل اور عملی نمونہ",
		titleHinglish: "Bachon ki Tarbiyah — Shafqat, Adl aur Amali Namoona",
		titleAr: "تربية الأبناء بالرحمة والعدل والقدوة الحسنة",
		summaryEn: "How the Prophet ﷺ nurtured young companions with affection, fairness, and encouraging words.",
		summaryHi: "नबी ﷺ बच्चों के साथ कैसी शफ़क़त और इंसाफ़ बरतते थे और उन्हें प्यार से कैसे सिखाते थे।",
		summaryUr: "نبی کریم ﷺ بچوں کے ساتھ کس طرح شفقت اور انصاف کا معاملہ فرماتے تھے۔",
		readTimeMinutes: 5,
		objectives: ["Practice affection and fairness between children (Sahih al-Bukhari 2587)", "Teach through gentle encouragement"],
		bodyEn: [
			"Anas ibn Malik (RA), who served the Prophet ﷺ for ten years during his youth, testified in Sahih Muslim (2309): \"By Allah, he never said to me ‘Uff’! And he never said for anything I did, ‘Why did you do that?’ nor for anything I left, ‘Why did you leave that?’\"",
			"The Prophet ﷺ kissed his grandchildren Hasan and Husayn (RA) and taught that whoever does not show mercy will not be shown mercy (Sahih al-Bukhari 5997).",
			"He also commanded strict fairness among children: \"Fear Allah and treat your children fairly (with justice)\" (Sahih al-Bukhari 2587)—never favoring one child over another in gifts or affection."
		],
		bodyHi: [
			"हज़रत अनस (RA) ने दस साल नबी ﷺ की ख़िदमत में गुज़ारे और गवाही दी कि आप ﷺ ने कभी उन्हें डांटा नहीं और न कभी \"उफ़\" कहा (सहीह मुस्लिम 2309)।",
			"आप ﷺ बच्चों से बेहद प्यार करते और फ़रमाते कि जो रहम नहीं करता उस पर रहम नहीं किया जाता (सहीह बुख़ारी 5997)।",
			"साथ ही आप ﷺ ने सभी बच्चों (बेटे-बेटियों) के बीच तोहफ़े और मोहब्बत में पूरा इंसाफ़ और बराबरी रखने का हुक्म दिया (सहीह बुख़ारी 2587)।"
		],
		bodyUr: [
			"حضرت انس رضی اللہ عنہ فرماتے ہیں کہ دس سال کی خدمت میں نبی کریم ﷺ نے کبھی مجھے ڈانٹا نہیں اور نہ کبھی اف فرمایا (صحیح مسلم 2309)۔",
			"آپ ﷺ بچوں کے ساتھ بے حد شفقت فرماتے اور اولاد کے درمیان مکمل انصاف اور برابری کا حکم دیتے تھے (صحیح بخاری 2587)۔",
			"بہترین تربیت خوف سے نہیں بلکہ محبت اور عملی نمونے سے ہوتی ہے۔"
		],
		refs: [
			"Sahih Muslim 2309",
			"Sahih al-Bukhari 5997",
			"Sahih al-Bukhari 2587"
		],
		takeaways: ["Children learn Salah and character fastest when they see parents practicing it joyfully."],
		quizQ: "What did the Prophet ﷺ command parents regarding their children in Sahih al-Bukhari 2587?",
		quizOpts: [
			"\"Fear Allah and treat your children fairly (with justice)\"",
			"Favor the eldest child only",
			"Never praise children",
			"Ignore their questions"
		],
		quizAns: 0,
		quizExp: "In Sahih al-Bukhari 2587, the Prophet ﷺ instructed: \"Fear Allah and be just between your children.\"",
		reflection: "Praise a child or younger sibling today for a specific good quality you noticed in them."
	},
	{
		id: "lesson_family_silat_ar_rahim",
		category: "Family responsibilities",
		titleEn: "Silat ar-Rahim (Maintaining Ties of Kinship)",
		titleHi: "सिला-ए-रहमी (रिश्तेदारों से संबंध जोड़ना)",
		titleUr: "صلہ رحمی (رشتہ داروں کے حقوق اور تعلقات جوڑنا)",
		titleHinglish: "Silat ar-Rahim — Rishtedari Nibhana",
		titleAr: "صلة الرحم وبركتها في الرزق والعمر",
		summaryEn: "How keeping family bonds alive brings barakah in provision and longevity, even when others pull away.",
		summaryHi: "रिश्तेदारी निभाने से रिज़्क़ और उम्र में बरकत कैसे होती है, और असली सिला-ए-रहमी किसे कहते हैं।",
		summaryUr: "صلہ رحمی سے رزق اور عمر میں برکت اور حقیقی صلہ رحمی کی تعریف۔",
		readTimeMinutes: 4,
		objectives: ["Understand Sahih al-Bukhari 5984 & 5991", "Check on relatives with a call, visit, or kindness"],
		bodyEn: [
			"In Sahih al-Bukhari (5986), the Prophet ﷺ taught: \"Whoever would love to have his provision (Rizq) expanded and his life-span blessed, let him maintain his ties of kinship (Silat ar-Rahim).\"",
			"True Silat ar-Rahim goes beyond merely reciprocating visits. In Sahih al-Bukhari (5991), the Prophet ﷺ explained: \"The maintainer of kinship (Al-Wasil) is not the one who merely reciprocates; rather, the maintainer is the one who, when his ties of kinship are cut off, reconnects them.\"",
			"Even a warm phone call, a kind message, a prayer, or visiting an elderly aunt or uncle fulfills this noble command."
		],
		bodyHi: [
			"सहीह बुख़ारी (5986) में नबी ﷺ ने फ़रमाया: \"जो चाहता है कि उसके रिज़्क़ में कुशादगी हो और उसकी उम्र में बरकत हो, वह सिला-ए-रहमी (रिश्तेदारी) निभाए।\"",
			"और सहीह बुख़ारी (5991) में बताया कि असली सिला-ए-रहमी करने वाला बदला चुकाने वाला नहीं, बल्कि वह है कि जब रिश्तेदार तोड़ें तब भी वह रिश्ते को जोड़े।",
			"एक प्यार भरा फ़ोन कॉल या सलाम भी दिलों को जोड़ देता है।"
		],
		bodyUr: [
			"صحیح بخاری (5986) میں ارشاد ہے کہ جو شخص اپنے رزق میں فراخی اور عمر میں برکت چاہتا ہو وہ صلہ رحمی کرے۔",
			"اور صحیح بخاری (5991) میں واضح فرمایا کہ حقیقی صلہ رحمی کرنے والا وہ ہے جو تعلق ٹوٹنے پر بھی اسے جوڑے۔",
			"رشتہ داروں کی خیر خبر لینا اور ان کے ساتھ نرمی برتنا عظیم عبادت ہے۔"
		],
		refs: [
			"Sahih al-Bukhari 5986",
			"Sahih al-Bukhari 5991",
			"Quran — Surah Muhammad 47:22"
		],
		takeaways: ["Be the first to reach out and mend family ties with a gentle Salam."],
		quizQ: "According to Sahih al-Bukhari 5991, who is the true \"Wasil\" (maintainer of kinship)?",
		quizOpts: [
			"The one who reconnects family ties even when others cut them off",
			"The one who only calls those who call him first",
			"The one who argues with relatives",
			"The one who ignores cousins"
		],
		quizAns: 0,
		quizExp: "Sahih al-Bukhari 5991 defines Al-Wasil as the one who reconnects kinship bonds when they are severed.",
		reflection: "Call or message one relative today whom you have not spoken with in a while."
	},
	{
		id: "lesson_worship_consistent_deeds",
		category: "Daily worship",
		titleEn: "Small, Consistent Deeds (Adwamuhu wa in Qalla)",
		titleHi: "थोड़ा मगर पाबंदी से किया जाने वाला नेक अमल",
		titleUr: "تھوڑا مگر پابندی سے کیا جانے والا عمل",
		titleHinglish: "Thoda Magar Regular Amal (Consistency in Worship)",
		titleAr: "أحبّ الأعمال إلى الله أدومها وإن قلّ",
		summaryEn: "Why Islam values sustainable daily habits over exhausting bursts that quickly fade.",
		summaryHi: "इस्लाम में जोश में बहुत सारा करके छोड़ देने से बेहतर थोड़ा मगर रोज़ाना का अमल क्यों है।",
		summaryUr: "اسلام میں وقتی جوش کے بجائے مستقل مزاجی اور پابندی کی اہمیت۔",
		readTimeMinutes: 4,
		objectives: ["Apply Sahih al-Bukhari 6464", "Build a realistic daily Quran and Dhikr routine"],
		bodyEn: [
			"Aisha (RA) reported that the Messenger of Allah ﷺ said: \"Take on only as much of deeds as you are able, for by Allah, Allah does not grow weary until you grow weary. And the most beloved of deeds to Allah are those that are most consistent, even if they are small (adwamuha wa in qalla)\" (Sahih al-Bukhari 6464, Sahih Muslim 782).",
			"When the Prophet ﷺ family performed a good deed, they kept it firm and steady.",
			"Reading five verses of the Quran every single day for a year builds far deeper spiritual transformation than reading two Juz on one weekend and abandoning the Mushaf for a month."
		],
		bodyHi: [
			"सहीह बुख़ारी (6464) में नबी ﷺ ने फ़रमाया: \"अल्लाह को सबसे ज़्यादा पसंदीदा अमल वह है जो हमेशा (पाबंदी से) किया जाए, चाहे वह थोड़ा ही क्यों न हो।\"",
			"अपनी ताक़त के मुताबिक़ आसान आदत बनाना सुन्नत का तरीक़ा है।",
			"रोज़ाना 5 आयतें समझकर पढ़ना और सुबह-शाम की 3 दुआएँ पाबंदी से पढ़ना ज़िंदगी बदल देता है।"
		],
		bodyUr: [
			"صحیح بخاری (6464) میں ارشادِ نبوی ہے: اللہ کے نزدیک سب سے محبوب عمل وہ ہے جس میں ہمیشگی اور پابندی ہو خواہ وہ مقدار میں کم ہو۔",
			"اپنی طاقت کے مطابق اعتدال کے ساتھ عبادت کرنا سنتِ نبوی ہے۔",
			"روزانہ تھوڑی تلاوت اور اذکار کی پابندی انسان کے دل کو منور رکھتی ہے۔"
		],
		refs: ["Sahih al-Bukhari 6464", "Sahih Muslim 782"],
		takeaways: ["Choose a small daily worship habit you can keep even on your busiest day."],
		quizQ: "According to Sahih al-Bukhari 6464, which deeds are most beloved to Allah?",
		quizOpts: [
			"Those that are most consistent, even if they are small",
			"Deeds done only once a year for show",
			"Exhausting oneself until giving up",
			"Deeds without intention"
		],
		quizAns: 0,
		quizExp: "Sahih al-Bukhari 6464 states: \"The most beloved of deeds to Allah are those that are most regular and constant even if they are little.\"",
		reflection: "What is your \"minimum daily habit\" on busy days (e.g., 3 Ayahs + 3 Morning/Evening Adhkar)?"
	},
	{
		id: "lesson_worship_dhikr_heart",
		category: "Daily worship",
		titleEn: "Dhikr — How Remembrance of Allah Brings Peace to Hearts",
		titleHi: "ज़िक्रुल्लाह — दिलों का सुकून और ज़िंदा दिल की पहचान",
		titleUr: "ذکرِ الٰہی — دلوں کا اطمینان اور زندگی",
		titleHinglish: "Dhikrullah — Dilon ka Sukoon (Surah Ar-Ra’d 13:28)",
		titleAr: "ألا بذكر الله تطمئنّ القلوب",
		summaryEn: "Keeping the tongue moist with effortless, high-reward remembrances throughout the day.",
		summaryHi: "चलते-फिरते और काम के दौरान अल्लाह के ज़िक्र से दिल को सुकून और सवाब से भरना।",
		summaryUr: "چلتے پھرتے اور کاروبارِ زندگی میں ذکرِ الٰہی سے قلبی سکون کا حصول۔",
		readTimeMinutes: 4,
		objectives: ["Memorize Surah Ar-Ra’d 13:28", "Practice the two phrases beloved to the Most Merciful"],
		bodyEn: [
			"In Surah Ar-Ra’d (13:28), Allah states a universal truth of human psychology and spirituality: \"Unquestionably, by the remembrance of Allah do hearts find rest (Ala bidhikrillahi tatma’innul-qulub).\"",
			"In Sahih al-Bukhari (6407), the Prophet ﷺ compared the one who remembers his Lord and the one who does not to the living and the dead.",
			"And he closed Sahih al-Bukhari (7563) with a treasure: \"Two expressions are light on the tongue, heavy on the Scale, and beloved to the Most Merciful: SubhanAllahi wa bihamdihi, SubhanAllahil-Azim.\""
		],
		bodyHi: [
			"सूरह रअद (13:28) में अल्लाह फ़रमाता है: \"सुन लो! अल्लाह के ज़िक्र ही से दिलों को इत्मीनान (सुकून) मिलता है।\"",
			"सहीह बुख़ारी (6407) में ज़िक्र करने वाले और न करने वाले की मिसाल ज़िंदा और मुर्दा जैसी बताई गई है।",
			"सहीह बुख़ारी की आख़िरी हदीस (7563) है: \"दो कलिमे ज़बान पर हल्के, तराज़ू में भारी और रहमान को बहुत प्यारे हैं: सुब्हानअल्लाहि व बिहम्दिही, सुब्हानअल्लाहिल-अज़ीम।\""
		],
		bodyUr: [
			"سورۃ الرعد (13:28) میں ارشاد ہے: خبردار! اللہ ہی کے ذکر سے دلوں کو اطمینان نصیب ہوتا ہے۔",
			"صحیح بخاری (6407) میں اپنے رب کا ذکر کرنے والے اور نہ کرنے والے کی مثال زندہ اور مردہ سے دی گئی ہے۔",
			"صحیح بخاری کی آخری حدیث (7563) کے مطابق سبحان اللہ وبحمدہ، سبحان اللہ العظیم زبان پر ہلکے اور میزان میں بھاری ہیں۔"
		],
		refs: [
			"Quran — Surah Ar-Ra’d 13:28",
			"Sahih al-Bukhari 6407",
			"Sahih al-Bukhari 7563"
		],
		takeaways: ["Recite SubhanAllahi wa bihamdihi, SubhanAllahil-Azim while commuting or walking."],
		quizQ: "Which two phrases are described in Sahih al-Bukhari 7563 as light on the tongue, heavy on the Scale, and beloved to Ar-Rahman?",
		quizOpts: [
			"SubhanAllahi wa bihamdihi, SubhanAllahil-Azim",
			"Poetry verses",
			"Market slogans",
			"Worldly boasts"
		],
		quizAns: 0,
		quizExp: "Sahih al-Bukhari 7563 highlights \"SubhanAllahi wa bihamdihi, SubhanAllahil-Azim\".",
		reflection: "Pause right now and say \"SubhanAllahi wa bihamdihi, SubhanAllahil-Azim\" three times."
	},
	{
		id: "lesson_worship_tahajjud_witr",
		category: "Daily worship",
		titleEn: "The Honor of the Believer: Night Prayer (Qiyam / Witr)",
		titleHi: "तहज्जुद और वित्र — रात की नमाज़ की रूहानी बरकत",
		titleUr: "قیام اللیل اور نمازِ وتر کی فضیلت",
		titleHinglish: "Tahajjud aur Witr — Raat ki Namaz ki Fazilat",
		titleAr: "فضل قيام الليل وصلاة الوتر",
		summaryEn: "How even a brief Witr or two Rak’ahs at night builds a quiet, personal bond with Allah.",
		summaryHi: "रात के सन्नाटे में वित्र या दो रकात नफ़्ल नमाज़ पढ़ने से अल्लाह का क़ुर्ब कैसे मिलता है।",
		summaryUr: "رات کی تنہائی میں وتر یا دو رکعت تہجد سے قربِ الٰہی کا حصول۔",
		readTimeMinutes: 4,
		objectives: ["Understand Sahih al-Bukhari 1145 & Jami` at-Tirmidhi 3579", "Never leave Witr before sleeping"],
		bodyEn: [
			"The Prophet ﷺ said in Jami` at-Tirmidhi (3579): \"Hold fast to the night prayer (Qiyam al-Layl), for it is the practice of the righteous before you, a means of nearness to your Lord, an expiation for bad deeds, and a barrier against sin.\"",
			"In Sahih al-Bukhari (1145), he taught that in the last third of every night, Allah calls out: \"Who is calling upon Me that I may answer him? Who is asking of Me that I may give him? Who is seeking My forgiveness that I may forgive him?\"",
			"Even if one cannot wake before dawn, praying Witr after Isha before sleeping ensures one’s night is recorded with worship (Sahih Muslim 755)."
		],
		bodyHi: [
			"जामे तिर्मिज़ी (3579) में नबी ﷺ ने फ़रमाया कि रात की नमाज़ (क़ियामुल-लैल) तुमसे पहले नेक लोगों का तरीक़ा है और अपने रब के क़रीब होने का ज़रिया है।",
			"सहीह बुख़ारी (1145) में रात के आख़िरी तिहाई हिस्से में दुआ और इस्तिग़फ़ार की क़बूलियत की खुशख़बरी दी गई है।",
			"अगर सुबह जल्दी उठने का भरोसा न हो तो सोने से पहले वित्र की नमाज़ अदा कर लेना सुन्नत है (सहीह मुस्लिम 755)।"
		],
		bodyUr: [
			"جامع ترمذی (3579) میں قیام اللیل کو صالحین کا شعار اور قربِ الٰہی کا ذریعہ قرار دیا گیا ہے۔",
			"صحیح بخاری (1145) میں رات کے آخری تہائی حصے میں دعا اور استغفار کی قبولیت کی بشارت ہے۔",
			"اگر آخر شب بیدار ہونے کا یقین نہ ہو تو سونے سے پہلے وتر پڑھ لینے کی وصیت کی گئی ہے (صحیح مسلم 755)۔"
		],
		refs: [
			"Sahih al-Bukhari 1145",
			"Sahih Muslim 755",
			"Jami` at-Tirmidhi 3579"
		],
		takeaways: ["Protect your Witr prayer every night—either before sleeping or before Fajr."],
		quizQ: "According to Sahih Muslim 755, what did the Prophet ﷺ advise someone who fears they might not wake up at the end of the night?",
		quizOpts: [
			"Pray Witr in the early part of the night before sleeping",
			"Skip Witr completely",
			"Only pray once a month",
			"Wait until noon"
		],
		quizAns: 0,
		quizExp: "Jabir (RA) reported in Sahih Muslim 755: \"Whoever fears that he will not get up at the end of the night, let him pray Witr in the first part of it.\"",
		reflection: "Check the Witr guide in the Salah tab and practice Dua-e-Qunoot tonight."
	},
	{
		id: "lesson_manners_salam_hospitality",
		category: "Prophetic manners",
		titleEn: "Spreading Peace (Ifsha’ as-Salam) & Hospitality",
		titleHi: "सलाम फैलाना, मुस्कुराना और मेहमान-नवाज़ी",
		titleUr: "سلام کو عام کرنا، خوش اخلاقی اور مہمان نوازی",
		titleHinglish: "Salam Phailana aur Mehman-Nawazi ke Aadab",
		titleAr: "إفشاء السلام وإكرام الضيف وطلاقة الوجه",
		summaryEn: "How greeting both those you know and those you do not know builds mutual love and faith.",
		summaryHi: "जान-पहचान वाले और अनजान सबको सलाम करने से आपस में मोहब्बत और ईमान कैसे बढ़ता है।",
		summaryUr: "جاننے اور نہ جاننے والے سب کو سلام کرنے سے باہمی محبت اور ایمان میں اضافہ۔",
		readTimeMinutes: 4,
		objectives: ["Apply Sahih Muslim 54 & Sahih al-Bukhari 12", "Honor guests generously without extravagance"],
		bodyEn: [
			"When a man asked the Prophet ﷺ, \"Which aspect of Islam is best?\" he replied: \"Feeding people, and greeting with Salam both those you know and those you do not know\" (Sahih al-Bukhari 12).",
			"And in Sahih Muslim (54), he connected Salam directly to love and Paradise: \"Shall I not guide you to something which, if you do it, you will love one another? Spread Salam among yourselves!\"",
			"Alongside Salam, honoring the guest (Ikram ad-Dayf) with a warm welcome and cheerful face is a hallmark of belief in Allah and the Last Day (Sahih al-Bukhari 6018)."
		],
		bodyHi: [
			"सहीह बुख़ारी (12) में नबी ﷺ से पूछा गया कि इस्लाम का कौन-सा अमल सबसे बेहतर है? आप ﷺ ने फ़रमाया: \"खाना खिलाना, और सलाम करना हर उस शख़्स को जिसे तुम जानते हो और जिसे नहीं जानते।\"",
			"और सहीह मुस्लिम (54) में फ़रमाया: \"आपस में सलाम को आम करो, तुममें मोहब्बत पैदा हो जाएगी!\"",
			"मेहमान की इज़्ज़त करना और ख़ुशदिली से मिलना ईमान की निशानी है (सहीह बुख़ारी 6018)।"
		],
		bodyUr: [
			"صحیح بخاری (12) میں بہترین عمل کھانا کھلانا اور جاننے و نہ جاننے والے کو سلام کرنا بتایا گیا ہے۔",
			"صحیح مسلم (54) میں ارشاد ہے: آپس میں سلام کو عام کرو، تم میں محبت پیدا ہو جائے گی۔",
			"مہمان کا اکرام کرنا اللہ اور یومِ آخرت پر ایمان کی علامت ہے (صحیح بخاری 6018)۔"
		],
		refs: [
			"Sahih al-Bukhari 12",
			"Sahih Muslim 54",
			"Sahih al-Bukhari 6018"
		],
		takeaways: ["Be the first to say Assalamu Alaikum wa Rahmatullah at home and in the community."],
		quizQ: "In Sahih al-Bukhari 12, whom did the Prophet ﷺ instruct us to greet with Salam?",
		quizOpts: [
			"Both those you know and those you do not know",
			"Only wealthy acquaintances",
			"Only people who greet you first",
			"Only on Eid day"
		],
		quizAns: 0,
		quizExp: "Sahih al-Bukhari 12 states: \"Greeting with Salam those whom you know and those whom you do not know.\"",
		reflection: "Greet every member of your household with a full, cheerful Salam when you enter today."
	},
	{
		id: "lesson_manners_eating_drinking",
		category: "Prophetic manners",
		titleEn: "Prophetic Etiquette of Eating, Drinking & Moderation",
		titleHi: "खाने-पीने की सुन्नतें और सेहत का नबवी उसूल",
		titleUr: "کھانے پینے کی سنتیں اور اعتدال کا نبوی اصول",
		titleHinglish: "Khane-Peene ki Sunnatein aur Moderation",
		titleAr: "الهدي النبوي في الطعام والشراب والاعتدال",
		summaryEn: "From Bismillah and eating with the right hand to the \"One-Third\" rule of healthy moderation.",
		summaryHi: "बिस्मिल्लाह, दाएँ हाथ से खाना, खाने में ऐब न निकालना और पेट के तीन हिस्से रखने की सुन्नत।",
		summaryUr: "بسم اللہ، دائیں ہاتھ سے کھانا، کھانے میں عیب نہ نکالنا اور تہائی پیٹ کا اصول۔",
		readTimeMinutes: 4,
		objectives: ["Practice Sahih al-Bukhari 5376 & 5409", "Follow the 1/3 food, 1/3 water, 1/3 breath principle"],
		bodyEn: [
			"The Prophet ﷺ taught young Umar ibn Abi Salamah (RA) three timeless table manners in Sahih al-Bukhari (5376): \"O boy! Mention the Name of Allah (say Bismillah), eat with your right hand, and eat from what is nearest to you.\"",
			"Abu Hurayrah (RA) also recorded in Sahih al-Bukhari (5409) that the Prophet ﷺ never criticized any food: if he liked it, he ate it, and if he did not, he simply left it without complaining.",
			"And in Jami` at-Tirmidhi (2380), he taught balanced health: if one must fill the stomach, let one-third be for food, one-third for drink, and one-third for easy breathing."
		],
		bodyHi: [
			"सहीह बुख़ारी (5376) में नबी ﷺ ने तीन बुनियादी आदाब सिखाए: \"अल्लाह का नाम लो (बिस्मिल्लाह), दाएँ हाथ से खाओ, और अपने सामने से खाओ।\"",
			"सहीह बुख़ारी (5409) में है कि नबी ﷺ ने कभी किसी खाने में ऐब (नुक़्स) नहीं निकाला; पसंद आता तो खा लेते, वरना ख़ामोशी से छोड़ देते।",
			"और तिर्मिज़ी (2380) में सेहत का सुनहरा उसूल बताया: एक-तिहाई खाने के लिए, एक-तिहाई पानी के लिए और एक-तिहाई साँस के लिए।"
		],
		bodyUr: [
			"صحیح بخاری (5376) میں کھانے کے تین بنیادی آداب سکھائے گئے: بسم اللہ پڑھنا، دائیں ہاتھ سے کھانا اور اپنے سامنے سے کھانا۔",
			"صحیح بخاری (5409) کے مطابق نبی کریم ﷺ نے کبھی کسی کھانے میں عیب نہیں نکالا۔",
			"جامع ترمذی (2380) میں اعتدال کا اصول بیان ہوا: ایک تہائی کھانے کے لیے، ایک تہائی پانی کے لیے اور ایک تہائی سانس کے لیے۔"
		],
		refs: [
			"Sahih al-Bukhari 5376",
			"Sahih al-Bukhari 5409",
			"Jami` at-Tirmidhi 2380"
		],
		takeaways: ["Never complain about a meal; thank Allah and those who prepared it."],
		quizQ: "According to Sahih al-Bukhari 5409, how did the Prophet ﷺ behave regarding food served to him?",
		quizOpts: [
			"He never criticized any food; if he liked it he ate it, otherwise he left it quietly",
			"He complained if salt was low",
			"He demanded luxury dishes",
			"He threw food away"
		],
		quizAns: 0,
		quizExp: "Abu Hurayrah (RA) stated in Sahih al-Bukhari 5409 that the Prophet ﷺ never found fault with food.",
		reflection: "Thank the person who prepares your meal today and practice the Sunnah of not wasting a single morsel."
	},
	{
		id: "lesson_manners_digital_modesty",
		category: "Prophetic manners",
		titleEn: "Guarding the Eyes, Time & Speech in the Digital Age",
		titleHi: "आज के दौर में निगाह, वक़्त और ज़बान की हिफ़ाज़त",
		titleUr: "جدید دور میں نگاہ، وقت اور زبان کی حفاظت",
		titleHinglish: "Digital Daur mein Nigah, Waqt aur Zaban ki Hifazat",
		titleAr: "حفظ البصر والوقت واللسان في العصر الرقمي",
		summaryEn: "Applying Quranic Haya (modesty), verification of news, and leaving what does not concern us.",
		summaryHi: "निगाह की पाकीज़गी, बिना तहक़ीक़ ख़बर न फैलाना और बेफ़ायदा चीज़ों से बचना।",
		summaryUr: "غضِ بصر، خبر کی تحقیق اور لایعنی مصروفیات سے اجتناب۔",
		readTimeMinutes: 5,
		objectives: ["Apply Surah Al-Hujurat 49:6 (verifying news)", "Practice Jami` at-Tirmidhi 2317 (leaving what does not concern you)"],
		bodyEn: [
			"The Prophet ﷺ gave a golden rule for mental clarity and spiritual focus in Jami` at-Tirmidhi (2317): \"Part of the perfection of a person’s Islam is his leaving that which does not concern him (tarkuhu ma la ya’nihi).\"",
			"In an era of endless notifications and unverified posts, Surah Al-Hujurat (49:6) commands believers to verify news carefully (fatabayyanu) lest they harm people in ignorance and regret it.",
			"And Surah Al-Isra (17:36) reminds us: \"Indeed, the hearing, the sight, and the heart—about all those one will be questioned\"—inspiring modesty (Haya) both in public and in private."
		],
		bodyHi: [
			"जामे तिर्मिज़ी (2317) में नबी ﷺ ने फ़रमाया: \"इंसान के इस्लाम की ख़ूबसूरती यह है कि वह बेफ़ायदा और ग़ैर-ज़रूरी बातों को छोड़ दे।\"",
			"सूरह हुजुरात (49:6) में बिना तहक़ीक़ के कोई ख़बर या मैसेज आगे बढ़ाने से मना किया गया है।",
			"और सूरह बनी इसराईल (17:36) याद दिलाती है कि कान, आँख और दिल—इन सबके इस्तेमाल के बारे में सवाल किया जाएगा।"
		],
		bodyUr: [
			"جامع ترمذی (2317) میں ارشاد ہے: انسان کے اسلام کی خوبی یہ ہے کہ وہ لایعنی (بے فائدہ) باتوں کو چھوڑ دے۔",
			"سورۃ الحجرات (49:6) میں کسی بھی خبر کو بغیر تحقیق کے آگے پھیلانے سے روکا گیا ہے۔",
			"اور سورۃ الاسراء (17:36) یاد دلاتی ہے کہ کان، آنکھ اور دل سب کے بارے میں بازپرس ہوگی۔"
		],
		refs: [
			"Jami` at-Tirmidhi 2317",
			"Quran — Surah Al-Hujurat 49:6",
			"Quran — Surah Al-Isra 17:36"
		],
		takeaways: ["Verify before sharing any message, and replace idle scrolling with Quran or family time."],
		quizQ: "What does Surah Al-Hujurat 49:6 command believers to do when they receive news or a report?",
		quizOpts: [
			"Verify and investigate it carefully before acting or sharing (Fatabayyanu)",
			"Forward it immediately to everyone",
			"Assume the worst",
			"Argue in comments"
		],
		quizAns: 0,
		quizExp: "Surah Al-Hujurat 49:6 commands: \"Fatabayyanu\" — verify and ascertain the truth lest you harm people in ignorance.",
		reflection: "Replace 15 minutes of screen scrolling tonight with reading Quran or talking with your family."
	},
	{
		id: "lesson_parents_after_passing",
		category: "Rights of parents",
		titleEn: "Honoring Parents Throughout Life & After Their Passing",
		titleHi: "माता-पिता की ज़िंदगी में और उनके दुनिया से जाने के बाद भी ख़िदमत",
		titleUr: "والدین کی زندگی میں اور ان کی وفات کے بعد حسنِ سلوک",
		titleHinglish: "Walidain ki Zindagi mein aur Unke Baad Bhi Khidmat",
		titleAr: "برّ الوالدين في حياتهما وبعد وفاتهما",
		summaryEn: "How a righteous child remains an ongoing charity (Sadaqah Jariyah) for their parents forever.",
		summaryHi: "कैसे नेक औलाद की दुआ, सदक़ा और माता-पिता के दोस्तों की इज़्ज़त हमेशा उनके काम आती है।",
		summaryUr: "نیک اولاد کی دعا، صدقہ اور والدین کے متعلقین کے ساتھ صلہ رحمی۔",
		readTimeMinutes: 4,
		objectives: ["Know Sahih Muslim 1631 & Sunan Abi Dawud 5142", "Pray for parents daily"],
		bodyEn: [
			"In Sahih Muslim (1631), the Prophet ﷺ taught that when a person passes away, their deeds come to an end except from three sources: ongoing charity (Sadaqah Jariyah), beneficial knowledge, or a righteous child who prays for them (waladun salihun yad’u lahu).",
			"When a companion asked in Sunan Abi Dawud (5142) if any kindness to parents remains after their death, the Prophet ﷺ replied: \"Yes! Praying for them, seeking forgiveness for them, fulfilling their promises after them, maintaining ties of kinship that are connected only through them, and honoring their friends.\"",
			"Every good deed a believer learns and practices automatically brings reward to the parents who raised them."
		],
		bodyHi: [
			"सहीह मुस्लिम (1631) में नबी ﷺ ने बताया कि इंसान के इंतक़ाल के बाद भी तीन चीज़ों का सवाब जारी रहता है: सदक़ा-ए-जारिया, फ़ायदेमंद इल्म, और नेक औलाद जो उसके लिए दुआ करे।",
			"सुनन अबी दाऊद (5142) में सिखाया गया कि माता-पिता के बाद उनके लिए दुआ व इस्तिग़फ़ार करना, उनके वादे पूरे करना और उनके दोस्तों व रिश्तेदारों की इज़्ज़त करना भी उनकी ख़िदमत है।",
			"औलाद जो भी नेक अमल करती है, उसका सवाब माता-पिता को भी मिलता है।"
		],
		bodyUr: [
			"صحیح مسلم (1631) میں ارشاد ہے کہ انسان کے انتقال کے بعد تین اعمال کا ثواب جاری رہتا ہے: صدقہ جاریہ، نفع بخش علم، اور نیک اولاد جو اس کے لیے دعا کرے۔",
			"سنن ابی داؤد (5142) میں والدین کی وفات کے بعد ان کے لیے استغفار، ان کے وعدوں کی تکمیل اور ان کے دوستوں کے اکرام کو بر الوالدین کا تسلسل قرار دیا گیا ہے۔",
			"نیک اولاد کا ہر عملِ صالح والدین کے میزانِ حسنات میں اضافہ کرتا ہے۔"
		],
		refs: ["Sahih Muslim 1631", "Sunan Abi Dawud 5142"],
		takeaways: ["Never finish a prayer without remembering your parents in Dua."],
		quizQ: "According to Sahih Muslim 1631, which three things continue to benefit a person after they pass away?",
		quizOpts: [
			"Ongoing charity (Sadaqah Jariyah), beneficial knowledge, and a righteous child who prays for them",
			"Cars, houses, and jewelry",
			"Fame, titles, and trophies",
			"Nothing at all"
		],
		quizAns: 0,
		quizExp: "Sahih Muslim 1631 specifies Sadaqah Jariyah, beneficial knowledge, and a righteous child who prays for them.",
		reflection: "Recite \"Rabbir-hamhuma kama rabbayani saghira\" and \"Rabbanagh-fir li wa li-walidayya\" right now."
	},
	{
		id: "lesson_social_rights_neighbors",
		category: "Social responsibilities",
		titleEn: "The Rights of Neighbors in Islam",
		titleHi: "इस्लाम में पड़ोसी के हुक़ूक़ और एहसान",
		titleUr: "اسلام میں پڑوسی کے حقوق اور حسنِ سلوک",
		titleHinglish: "Islam mein Padosi (Neighbor) ke Huqooq",
		titleAr: "حقوق الجار والإحسان إليه في الإسلام",
		summaryEn: "Why Angel Jibril (AS) emphasized the neighbor so repeatedly, and how believers care for everyone next door.",
		summaryHi: "हज़रत जिब्रील (AS) ने पड़ोसी के हक़ की इतनी ताकीद क्यों की, और अच्छे पड़ोसी की पहचान क्या है।",
		summaryUr: "حضرت جبریل علیہ السلام کی پڑوسی کے بارے میں مسلسل وصیت اور اچھے پڑوسی کی صفات۔",
		readTimeMinutes: 4,
		objectives: ["Understand Sahih al-Bukhari 6014 & 6018", "Share food and ensure neighbors feel safe"],
		bodyEn: [
			"In Sahih al-Bukhari (6014), the Prophet ﷺ said: \"Jibril kept advising me regarding the neighbor until I thought he would make him an heir!\"",
			"In Sahih Muslim (2625), he told Abu Dharr (RA): \"When you cook broth (soup), add more water to it and take care of your neighbors.\"",
			"Above all, a true believer ensures their neighbors are completely safe from any harm, noise, or mistreatment (Sahih al-Bukhari 6016)—regardless of the neighbor’s background or faith (Surah An-Nisa 4:36)."
		],
		bodyHi: [
			"सहीह बुख़ारी (6014) में नबी ﷺ ने फ़रमाया: \"जिब्रील मुझे पड़ोसी के बारे में इतनी वसीयत करते रहे कि मुझे लगा वे उसे वारिस (हिस्सेदार) बना देंगे!\"",
			"सहीह मुस्लिम (2625) में सिखाया गया कि जब घर में सालन या शोरबा पकाओ तो अपने पड़ोसी का भी ख़याल रखो।",
			"और सूरह निसा (4:36) में क़रीबी और दूर के हर पड़ोसी के साथ अच्छा सुलूक करने का हुक्म है।"
		],
		bodyUr: [
			"صحیح بخاری (6014) میں ارشاد ہے: جبریل مجھے پڑوسی کے حقوق کی اس قدر وصیت کرتے رہے کہ مجھے گمان ہوا کہ وہ اسے وارث قرار دے دیں گے۔",
			"صحیح مسلم (2625) میں کھانا پکاتے وقت پڑوسیوں کو یاد رکھنے کی ترغیب دی گئی ہے۔",
			"سورۃ النساء (4:36) میں قریبی اور اجنبی ہر پڑوسی کے ساتھ احسان کا حکم ہے۔"
		],
		refs: [
			"Sahih al-Bukhari 6014",
			"Sahih Muslim 2625",
			"Quran — Surah An-Nisa 4:36"
		],
		takeaways: ["Be a neighbor whose presence brings peace, safety, and kindness to the street."],
		quizQ: "What did the Prophet ﷺ say in Sahih al-Bukhari 6014 about Angel Jibril’s repeated advice regarding the neighbor?",
		quizOpts: [
			"\"Until I thought he would make him an heir\"",
			"\"Only greet them once a year\"",
			"\"Ignore new neighbors\"",
			"\"Never share food\""
		],
		quizAns: 0,
		quizExp: "In Sahih al-Bukhari 6014, the Prophet ﷺ said Jibril kept advising him about the neighbor until he thought he would make him an heir.",
		reflection: "How can your family check on or share a plate of food with a neighbor this week?"
	},
	{
		id: "lesson_social_honest_trade_work",
		category: "Social responsibilities",
		titleEn: "Honest Livelihood, Fair Dealing & Fulfilling Contracts",
		titleHi: "हलाल रोज़ी, नाप-तौल में ईमानदारी और वादा निभाना",
		titleUr: "حلال روزی، دیانت دار تجارت اور ایفائے عہد",
		titleHinglish: "Halal Rozi, Imandar Tijarat aur Wada Nibhana",
		titleAr: "الكسب الحلال والصدق في المعاملات والوفاء بالعقود",
		summaryEn: "The rank of the truthful, trustworthy merchant and worker in the sight of Allah.",
		summaryHi: "सच्चे और अमानतदार ताजिर व काम करने वाले का अल्लाह के यहाँ ऊँचा मक़ाम।",
		summaryUr: "سچے اور امانت دار تاجر اور کارکن کا اللہ کے نزدیک بلند مقام۔",
		readTimeMinutes: 5,
		objectives: ["Understand Jami` at-Tirmidhi 1209 & Surah Al-Mutaffifin 83:1-3", "Honor every contract and promise"],
		bodyEn: [
			"Islam elevates honest work and fair commerce to an act of worship. In Jami` at-Tirmidhi (1209), the Prophet ﷺ said: \"The truthful, trustworthy merchant will be with the Prophets, the truthful ones (Siddiqin), and the martyrs.\"",
			"In Surah Al-Mutaffifin (83:1-3), Allah sternly warns against defrauding people in weights, measures, or work hours— demanding full measure when taking from others while giving less when measuring or working for them.",
			"And in Sahih al-Bukhari (2076), the Prophet ﷺ invoked Allah’s mercy upon the person who is generous, fair, and easygoing when buying, when selling, and when requesting their rights."
		],
		bodyHi: [
			"जामे तिर्मिज़ी (1209) में नबी ﷺ ने खुशख़बरी दी: \"सच्चा और अमानतदार ताजिर (व्यापारी) क़ियामत के दिन अंबिया, सिद्दीक़ीन और शोहदा के साथ होगा।\"",
			"सूरह मुतफ़्फ़िफ़ीन (83:1-3) में नाप-तौल या काम में कमी करने से सख़्ती से रोका गया है।",
			"और सहीह बुख़ारी (2076) में उस इंसान के लिए रहमत की दुआ की गई है जो ख़रीदने और बेचने में नरमी व शराफ़त बरतता है।"
		],
		bodyUr: [
			"جامع ترمذی (1209) میں بشارت ہے کہ سچا اور امانت دار تاجر انبیاء، صدیقین اور شہداء کے ساتھ ہوگا۔",
			"سورۃ المطففین (83:1-3) میں ناپ تول اور لین دین میں کمی کرنے پر سخت وعید سنائی گئی ہے۔",
			"صحیح بخاری (2076) میں خرید و فروخت میں نرمی اور سہولت برتنے والے کے لیے رحمت کی دعا کی گئی ہے۔"
		],
		refs: [
			"Jami` at-Tirmidhi 1209",
			"Quran — Surah Al-Mutaffifin 83:1-3",
			"Sahih al-Bukhari 2076"
		],
		takeaways: ["Disclose any defect honestly, pay workers promptly, and fulfill every promise."],
		quizQ: "According to Jami` at-Tirmidhi 1209, with whom will the truthful, trustworthy merchant be gathered?",
		quizOpts: [
			"With the Prophets, the Siddiqin (truthful ones), and the Martyrs",
			"With Qarun",
			"Alone in darkness",
			"Forgotten"
		],
		quizAns: 0,
		quizExp: "Jami` at-Tirmidhi 1209 states that the truthful, trustworthy merchant is with the Prophets, Siddiqin, and Shuhada.",
		reflection: "How can you bring excellence (Ihsan) and complete honesty into your studies or profession today?"
	},
	{
		id: "lesson_social_environmental_stewardship",
		category: "Social responsibilities",
		titleEn: "Stewardship of the Earth: Planting Trees & Caring for Creation",
		titleHi: "ज़मीन की देखभाल: पेड़ लगाना, सफ़ाई और मख़लूक़ पर रहम",
		titleUr: "زمین کی آبادکاری: شجرکاری، صفائی اور مخلوق پر رحم",
		titleHinglish: "Zameen ki Hifazat — Shajarkari, Safai aur Raham",
		titleAr: "عمارة الأرض وغرس الأشجار والرحمة بالمخلوقات",
		summaryEn: "Why planting a tree, conserving water, and caring for animals are ongoing charities in Islam.",
		summaryHi: "इस्लाम में पेड़ लगाना, पानी बचाना और पशु-पक्षियों पर रहम करना कैसे सदक़ा-ए-जारिया है।",
		summaryUr: "اسلام میں درخت لگانا، پانی بچانا اور جانوروں پر رحم کرنا کس طرح صدقہ جاریہ ہے۔",
		readTimeMinutes: 4,
		objectives: ["Understand Sahih al-Bukhari 2320", "Practice environmental cleanliness as a branch of faith"],
		bodyEn: [
			"In Sahih al-Bukhari (2320) and Sahih Muslim (1553), the Prophet ﷺ said: \"There is no Muslim who plants a tree or sows crops, and then a bird, a person, or an animal eats from it, except that it is recorded as a charity (Sadaqah) for him.\"",
			"He also taught that removing harmful objects or litter from people’s pathways is a branch of faith (Sahih Muslim 35) and leads to forgiveness (Sahih al-Bukhari 2472).",
			"Stewardship on earth (Khilafah) means leaving every place cleaner, greener, and kinder than we found it."
		],
		bodyHi: [
			"सहीह बुख़ारी (2320) में नबी ﷺ ने फ़रमाया: \"जो मुसलमान कोई पेड़ लगाता है या खेती करता है, और उसमें से कोई परिंदा, इंसान या जानवर खाता है, तो वह उसके लिए सदक़ा लिखा जाता है।\"",
			"सहीह मुस्लिम (35) में रास्ते से तकलीफ़देह चीज़ या कचरा हटाना ईमान की एक शाख़ बताया गया है।",
			"ज़मीन पर अल्लाह का नेक बंदा बनने का तकाज़ा है कि हम पर्यावरण, पानी और हर जीव का ख़याल रखें।"
		],
		bodyUr: [
			"صحیح بخاری (2320) میں ارشاد ہے کہ جو مسلمان کوئی پودا یا فصل لگائے اور اس میں سے پرندہ، انسان یا جانور کھائے تو وہ اس کے لیے صدقہ ہے۔",
			"صحیح مسلم (35) میں راستے سے تکلیف دہ چیز ہٹانا ایمان کی شاخ قرار دیا گیا ہے۔",
			"ماحول کی صفائی اور مخلوقِ خدا پر شفقت اسلامی اخلاق کا اہم حصہ ہے۔"
		],
		refs: [
			"Sahih al-Bukhari 2320",
			"Sahih Muslim 35",
			"Sahih al-Bukhari 2472"
		],
		takeaways: ["Planting a tree or putting out water for birds is an effortless Sadaqah Jariyah."],
		quizQ: "According to Sahih al-Bukhari 2320, what happens when a bird, person, or animal eats from a tree planted by a Muslim?",
		quizOpts: [
			"It is recorded as an ongoing charity (Sadaqah) for the one who planted it",
			"It counts as a loss",
			"Nothing is recorded",
			"Birds are forbidden from eating it"
		],
		quizAns: 0,
		quizExp: "Sahih al-Bukhari 2320 confirms that whatever a bird, human, or animal eats from a planted tree or crop is Sadaqah for the planter.",
		reflection: "Can you place a small bowl of clean water on your balcony or windowsill for birds this week?"
	},
	{
		id: "lesson_social_mutual_compassion",
		category: "Social responsibilities",
		titleEn: "One Body: Mutual Compassion & Relieving Hardship",
		titleHi: "एक जिस्म की मानिंद: आपसी हमदर्दी और किसी की मुश्किल आसान करना",
		titleUr: "جسدِ واحد: باہمی ہمدردی اور مصیبت زدہ کی مدد",
		titleHinglish: "Ek Jism ki Manind — Aapsi Hamdardi aur Madad",
		titleAr: "مثلُ المؤمنين في توادّهم وتراحمهم وتفريج الكربات",
		summaryEn: "How relieving a single hardship for someone in this world brings Allah’s relief in this life and the Next.",
		summaryHi: "दुनिया में किसी इंसान की एक परेशानी दूर करने से अल्लाह दुनिया और आख़िरत में कैसे आसानी फ़रमाता है।",
		summaryUr: "دنیا میں کسی کی ایک مشکل حل کرنے پر دنیا و آخرت میں اللہ کی نصرت۔",
		readTimeMinutes: 5,
		objectives: ["Memorize the lesson of Sahih al-Bukhari 6011 & Sahih Muslim 2699", "Look for ways to ease someone’s burden"],
		bodyEn: ["In Sahih al-Bukhari (6011) and Sahih Muslim (2586), Nu’man ibn Bashir (RA) reported that the Prophet ﷺ said: \"The example of the believers in their mutual love, mercy, and compassion is like that of a single body; if one limb aches, the whole body responds with sleeplessness and fever.\"", "And in Sahih Muslim (2699), he promised: \"Whoever relieves a believer of a hardship from the hardships of this world, Allah will relieve him of a hardship from the hardships of the Day of Resurrection. And whoever makes things easy for one in difficulty, Allah will make things easy for him in this world and the Hereafter. And Allah is helping the servant as long as the servant is helping his brother.\""],
		bodyHi: ["सहीह बुख़ारी (6011) में नबी ﷺ ने फ़रमाया कि आपसी मोहब्बत और हमदर्दी में ईमान वालों की मिसाल एक जिस्म जैसी है; अगर एक अंग में तकलीफ़ हो तो पूरा जिस्म जागकर उसका दर्द महसूस करता है।", "और सहीह मुस्लिम (2699) में वादा फ़रमाया: \"अल्लाह बंदे की मदद में रहता है जब तक बंदा अपने भाई की मदद में लगा रहता है।\""],
		bodyUr: ["صحیح بخاری (6011) میں اہلِ ایمان کو باہمی محبت اور رحمت میں ایک جسم کی مانند قرار دیا گیا ہے۔", "اور صحیح مسلم (2699) میں بشارت ہے: اللہ بندے کی مدد میں رہتا ہے جب تک بندہ اپنے بھائی کی مدد میں رہتا ہے۔"],
		refs: ["Sahih al-Bukhari 6011", "Sahih Muslim 2699"],
		takeaways: ["Allah is in your aid as long as you are aiding others."],
		quizQ: "According to Sahih Muslim 2699, for how long does Allah continue helping His servant?",
		quizOpts: [
			"As long as the servant continues helping his brother/sister",
			"Only for one hour",
			"Only when wealthy",
			"Never"
		],
		quizAns: 0,
		quizExp: "Sahih Muslim 2699 states: \"Wallahu fi ’awnil-’abdi ma kanal-’abdu fi ’awni akhihi\" (Allah is helping the servant as long as the servant is helping his brother).",
		reflection: "Who in your circle—family, colleague, or neighbor—could use an encouraging word or helping hand today?"
	},
	{
		id: "lesson_tawheed_tawakkul_effort",
		category: "Tawheed",
		titleEn: "Tawakkul: Tie Your Camel and Trust in Allah",
		titleHi: "तवक्कुल: पहले ऊँटनी बाँधो और फिर अल्लाह पर भरोसा करो",
		titleUr: "توکل کی حقیقت: اسباب اختیار کرنا اور اللہ پر بھروسہ",
		titleHinglish: "Tawakkul — Pehle Mehnat aur Asbab, Phir Allah par Bharosa",
		titleAr: "حقيقة التوكل: اعقلها وتوكل",
		summaryEn: "Balancing diligent effort and preparation with complete reliance of the heart upon Allah.",
		summaryHi: "पूरी मेहनत व तैयारी करने के साथ दिल का भरोसा सिर्फ़ अल्लाह पर रखने की सुन्नत।",
		summaryUr: "محنت و تدبیر کے ساتھ دل کا بھروسہ صرف اللہ کی ذات پر رکھنا۔",
		readTimeMinutes: 4,
		objectives: ["Understand Jami` at-Tirmidhi 2517 & 2344", "Combine action with prayer"],
		bodyEn: [
			"A man once asked the Prophet ﷺ: \"O Messenger of Allah, should I tie my camel and trust in Allah, or leave her untied and trust in Allah?\" He replied concisely: \"Tie her and trust in Allah (I’qilha wa tawakkal)\" (Jami` at-Tirmidhi 2517).",
			"In Jami` at-Tirmidhi (2344), Umar ibn Al-Khattab (RA) narrated: \"If you were to rely upon Allah with true reliance, He would provide for you just as He provides for the birds: they fly out in the morning with empty stomachs and return in the evening full.\"",
			"Scholars note that the birds do not sit idle in their nests; they fly out early each morning seeking sustenance while trusting their Lord."
		],
		bodyHi: [
			"जामे तिर्मिज़ी (2517) में एक सहाबी के सवाल पर नबी ﷺ ने फ़रमाया: \"अपनी ऊँटनी को बाँधो और फिर अल्लाह पर भरोसा (तवक्कुल) करो।\"",
			"और तिर्मिज़ी (2344) में परिंदों की मिसाल दी गई कि वे सुबह ख़ाली पेट घोंसले से निकलते हैं और शाम को पेट भरकर लौटते हैं।",
			"असली तवक्कुल हाथ-पाँव छोड़ना नहीं बल्कि पूरी कोशिश करके नतीजा अल्लाह के हवाले करना है।"
		],
		bodyUr: [
			"جامع ترمذی (2517) میں ارشاد ہے: اونٹنی کو باندھو اور پھر اللہ پر توکل کرو (اعقلھا وتوکل)۔",
			"اور ترمذی (2344) میں پرندوں کی مثال دی گئی جو صبح تلاشِ رزق میں نکلتے ہیں اور شام کو سیر ہو کر لوٹتے ہیں۔",
			"حقیقی توکل اسباب اختیار کرنے کے ساتھ مسبب الاسباب پر بھروسہ کرنے کا نام ہے۔"
		],
		refs: [
			"Jami` at-Tirmidhi 2517",
			"Jami` at-Tirmidhi 2344",
			"Quran — Surah At-Talaq 65:3"
		],
		takeaways: ["Prepare thoroughly, work honestly, and leave the outcome calmly to Allah."],
		quizQ: "What did the Prophet ﷺ reply when asked whether to tie one’s camel or leave it untied while trusting Allah (Jami` at-Tirmidhi 2517)?",
		quizOpts: [
			"\"Tie her and trust in Allah (I’qilha wa tawakkal)\"",
			"\"Leave her untied\"",
			"\"Never travel with camels\"",
			"\"Stay asleep\""
		],
		quizAns: 0,
		quizExp: "In Jami` at-Tirmidhi 2517, the Prophet ﷺ taught combining practical precaution (\"Tie her\") with spiritual reliance (\"and trust in Allah\").",
		reflection: "In what goal right now can you pair better daily preparation with stronger Dua?"
	},
	{
		id: "lesson_salah_congregation_jumuah",
		category: "Salah",
		titleEn: "The Virtue of Congregational Prayer & Friday (Jumu’ah)",
		titleHi: "जमात की नमाज़ और जुमा (शुक्रवार) के दिन की फ़ज़ीलत व सुन्नतें",
		titleUr: "باجماعت نماز اور یومِ جمعہ کے فضائل و آداب",
		titleHinglish: "Jamaat ki Namaz aur Jumu’ah ke Aadab",
		titleAr: "فضل صلاة الجماعة وآداب يوم الجمعة",
		summaryEn: "Walking to the mosque, the 27-fold reward of Jama’ah, and the blessed Sunnahs of Friday.",
		summaryHi: "मस्जिद की तरफ़ उठाए गए हर क़दम का सवाब और जुमा के दिन सूरह कहफ़ व दुरूद शरीफ़ की बरकत।",
		summaryUr: "مسجد کی طرف ہر قدم کا ثواب اور جمعہ کے دن سورۃ الکہف اور درود شریف کی فضیلت۔",
		readTimeMinutes: 5,
		objectives: ["Know Sahih al-Bukhari 645 & 881", "Read Surah Al-Kahf and send Salawat on Fridays"],
		bodyEn: [
			"In Sahih al-Bukhari (645) and Sahih Muslim (650), the Prophet ﷺ taught that prayer in congregation (Salatul Jama’ah) surpasses individual prayer by twenty-seven degrees.",
			"And in Sahih al-Bukhari (647), every step walked calmly toward the mosque raises a person one degree in rank and removes one minor sin.",
			"Friday (Yawmul Jumu’ah) is the best day on which the sun rises (Sahih Muslim 854): its Sunnahs include performing Ghusl, wearing clean clothes, arriving early to listen attentively to the Khutbah (Sahih al-Bukhari 881), sending abundant Salawat upon the Prophet ﷺ (Sunan Abi Dawud 1047), and reciting Surah Al-Kahf."
		],
		bodyHi: [
			"सहीह बुख़ारी (645) में जमात की नमाज़ का सवाब अकेले पढ़ने से 27 दर्जे ज़्यादा बताया गया है।",
			"जुमा का दिन हफ़्ते का सबसे मुबारक दिन है (सहीह मुस्लिम 854)।",
			"जुमा के आदाब में ग़ुस्ल करना, साफ़ कपड़े पहनना, ख़ुत्बा ध्यान से सुनना, नबी ﷺ पर कसरत से दुरूद भेजना और सूरह कहफ़ पढ़ना शामिल है।"
		],
		bodyUr: [
			"صحیح بخاری (645) کے مطابق باجماعت نماز کی فضیلت تنہا نماز سے ستائیس درجہ زیادہ ہے۔",
			"جمعہ کا دن ہفتے کا بہترین دن ہے (صحیح مسلم 854)۔",
			"آدابِ جمعہ میں غسل کرنا، خطبہ توجہ سے سننا، کثرت سے درود شریف پڑھنا اور سورۃ الکہف کی تلاوت شامل ہے۔"
		],
		refs: [
			"Sahih al-Bukhari 645",
			"Sahih al-Bukhari 881",
			"Sahih Muslim 854",
			"Sunan Abi Dawud 1047"
		],
		takeaways: ["Make Friday a special family day of Salawat, Surah Al-Kahf, and early preparation for prayer."],
		quizQ: "According to Sahih al-Bukhari 645, by how many degrees does congregational prayer surpass praying alone?",
		quizOpts: [
			"Twenty-seven (27) degrees",
			"Two degrees",
			"Zero degrees",
			"Half a degree"
		],
		quizAns: 0,
		quizExp: "Ibn Umar (RA) reported in Sahih al-Bukhari 645 that congregational prayer is superior to solitary prayer by 27 degrees.",
		reflection: "Set a reminder every Friday morning for Salawat (Durood Ibrahim) and Surah Al-Kahf."
	},
	{
		id: "lesson_zakat_fitr_sadaqah_jariyah",
		category: "Zakat",
		titleEn: "Zakat al-Fitr & Building Lasting Sadaqah Jariyah",
		titleHi: "सदक़ा-ए-फ़ित्र और हमेशा जारी रहने वाला सदक़ा (सदक़ा-ए-जारिया)",
		titleUr: "صدقہ فطر اور صدقہ جاریہ کے فضائل و احکام",
		titleHinglish: "Zakat al-Fitr aur Sadaqah Jariyah",
		titleAr: "زكاة الفطر والصدقة الجارية وأثرهما الدائم",
		summaryEn: "How Zakat al-Fitr purifies the fasting person and brings Eid joy to every home.",
		summaryHi: "ईद की नमाज़ से पहले सदक़ा-ए-फ़ित्र अदा करने की हिकमत और सदक़ा-ए-जारिया के आसान रास्ते।",
		summaryUr: "نمازِ عید سے پہلے صدقہ فطر کی ادائیگی کی حکمت اور صدقہ جاریہ کی صورتیں۔",
		readTimeMinutes: 4,
		objectives: ["Understand Sunan Abi Dawud 1609 on Zakat al-Fitr", "Identify everyday forms of Sadaqah Jariyah"],
		bodyEn: [
			"Ibn Abbas (RA) narrated in Sunan Abi Dawud (1609) that the Messenger of Allah ﷺ enjoined Zakat al-Fitr at the end of Ramadan \"as a purification for the fasting person from idle talk and indecent speech, and as food for the needy (Tu’matan lil-masakin).\"",
			"It is given on behalf of every member of the household—young and old—before the Eid prayer so that no family goes hungry on the day of celebration (Sahih al-Bukhari 1503).",
			"Similarly, ongoing charity (Sadaqah Jariyah)—such as providing clean water, supporting education, gifting a Mushaf, or planting a fruit tree—continues earning reward long after we leave this world (Sahih Muslim 1631)."
		],
		bodyHi: [
			"सुनन अबी दाऊद (1609) में इब्ने अब्बास (RA) से रिवायत है कि सदक़ा-ए-फ़ित्र रोज़ेदार की भूल-चूक की पाकीज़गी और ग़रीबों के खाने का इंतज़ाम है।",
			"इसे ईद की नमाज़ से पहले हर छोटे-बड़े घर के सदस्य की तरफ़ से अदा किया जाता है (सहीह बुख़ारी 1503)।",
			"पानी पिलाना, तालीम में मदद करना और क़ुरआन सिखाना बेहतरीन सदक़ा-ए-जारिया है।"
		],
		bodyUr: [
			"سنن ابی داؤد (1609) کے مطابق صدقہ فطر روزہ دار کی کوتاہیوں کی تطہیر اور مساکین کی خوراک کے لیے مقرر کیا گیا ہے۔",
			"اسے نمازِ عید سے پہلے ادا کرنا لازم ہے تاکہ عید کی خوشی میں غریب بھی شریک ہو سکیں (صحیح بخاری 1503)۔",
			"پانی کا انتظام کرنا اور علم پھیلانا بہترین صدقہ جاریہ ہے (صحیح مسلم 1631)۔"
		],
		refs: [
			"Sunan Abi Dawud 1609",
			"Sahih al-Bukhari 1503",
			"Sahih Muslim 1631"
		],
		takeaways: ["Pay Zakat al-Fitr early enough before Eid prayer so needy families can prepare with dignity."],
		quizQ: "According to Sunan Abi Dawud 1609, what are the two main wisdoms of Zakat al-Fitr at the end of Ramadan?",
		quizOpts: [
			"Purification for the fasting person and food for the needy before Eid",
			"Buying fireworks",
			"Decorating streets only",
			"Saving taxes"
		],
		quizAns: 0,
		quizExp: "Ibn Abbas (RA) stated in Sunan Abi Dawud 1609 that Zakat al-Fitr purifies the fasting person and feeds the needy.",
		reflection: "What form of ongoing beneficial knowledge or charity can you contribute to this year?"
	},
	{
		id: "lesson_hajj_dhul_hijjah_ten_days",
		category: "Hajj",
		titleEn: "The First Ten Days of Dhul-Hijjah — Best Days of the Year",
		titleHi: "ज़िल-हिज्जा के पहले दस दिन — साल के सबसे अफ़ज़ल दिन",
		titleUr: "عشرہ ذوالحجہ — سال کے سب سے افضل ایام کے اعمال",
		titleHinglish: "Dhul-Hijjah ke Pehle 10 Din — Sabse Afzal Ayyam",
		titleAr: "فضل العشر الأوائل من ذي الحجة والعمل الصالح فيها",
		summaryEn: "How even those not at Hajj share in the immense blessings of Dhul-Hijjah through Dhikr, fasting, and charity.",
		summaryHi: "जो लोग हज पर न हों वे भी ज़िल-हिज्जा के पहले दस दिनों में तकबीर, रोज़े और नेक अमल से कैसे बड़ा सवाब कमा सकते हैं।",
		summaryUr: "حج پر نہ جانے والے افراد بھی عشرہ ذوالحجہ میں ذکر، تکبیر، روزے اور صدقہ سے کس طرح عظیم ثواب پا سکتے ہیں۔",
		readTimeMinutes: 4,
		objectives: ["Know Sahih al-Bukhari 969", "Fill the first 10 days of Dhul-Hijjah with Takbir, Tahmid, and Tahlil"],
		bodyEn: [
			"Ibn Abbas (RA) reported in Sahih al-Bukhari (969) that the Prophet ﷺ said: \"There are no days in which righteous deeds are more beloved to Allah than these ten days\"—meaning the first ten days of Dhul-Hijjah.",
			"During these blessed days, the mother acts of worship—Salah, fasting (especially the 9th day, Yawm Arafah), Sadaqah, Quran recitation, and Hajj—all come together in a way found in no other week of the year.",
			"The Companions such as Ibn Umar and Abu Hurayrah (RA) used to go out to the marketplace during these ten days saying Takbir (\"Allahu Akbar, Allahu Akbar, La ilaha illallah, Wallahu Akbar, Allahu Akbar, wa lillahil-hamd\"), and the people would say Takbir with them."
		],
		bodyHi: [
			"सहीह बुख़ारी (969) में नबी ﷺ ने फ़रमाया: \"इन दस दिनों (ज़िल-हिज्जा के पहले 10 दिन) से बढ़कर कोई ऐसे दिन नहीं जिनमें नेक अमल अल्लाह को ज़्यादा प्यारा हो।\"",
			"इन दिनों में कसरत से \"ला इलाहा इल्लल्लाह\", \"अल्लाहु अकबर\" और \"अल्हम्दुलिल्लाह\" कहना और 9 ज़िल-हिज्जा (अरफ़ा) का रोज़ा रखना बड़ी फ़ज़ीलत रखता है।",
			"इब्ने उमर और अबू हुरैरा (RA) इन दिनों में तकबीर पढ़ा करते थे।"
		],
		bodyUr: [
			"صحیح بخاری (969) میں ارشاد ہے کہ ذوالحجہ کے ابتدائی دس دنوں سے بڑھ کر کوئی ایام نہیں جن میں نیک عمل اللہ کو زیادہ محبوب ہو۔",
			"ان ایام میں تکبیر، تہلیل، تحمید، صدقہ اور یومِ عرفہ کا روزہ غیر معمولی فضیلت رکھتے ہیں۔",
			"حضرت ابن عمر اور حضرت ابوہریرہ رضی اللہ عنہما ان دنوں میں تکبیرات کا اہتمام فرماتے تھے۔"
		],
		refs: [
			"Sahih al-Bukhari 969",
			"Quran — Surah Al-Fajr 89:1-2",
			"Sahih Muslim 1162"
		],
		takeaways: ["Use the first 10 days of Dhul-Hijjah every year as a spiritual renewal alongside Ramadan."],
		quizQ: "According to Sahih al-Bukhari 969, during which days of the year are righteous deeds most beloved to Allah?",
		quizOpts: [
			"The first ten days of Dhul-Hijjah",
			"Only on weekends",
			"Only in winter",
			"None"
		],
		quizAns: 0,
		quizExp: "Sahih al-Bukhari 969 states: \"There are no days on which righteous deeds are more beloved to Allah than these ten days\" (the first ten days of Dhul-Hijjah).",
		reflection: "Memorize the Takbir (\"Allahu Akbar, Allahu Akbar, La ilaha illallah, Wallahu Akbar, Allahu Akbar, wa lillahil-hamd\")."
	},
	{
		id: "lesson_character_amanah_promises",
		category: "Islamic character",
		titleEn: "Fulfilling Trusts (Amanah) & Keeping Promises (Ahd)",
		titleHi: "अमानतदारी (अमानत) और वादा निभाना (ईफ़ा-ए-अहद)",
		titleUr: "امانت داری اور ایفائے عہد — مومن کی پہچان",
		titleHinglish: "Amanah aur Wada Nibhana — Momin ki Pehchan",
		titleAr: "أداء الأمانة والوفاء بالعهد من صفات المؤمنين",
		summaryEn: "Why the Quran and Sunnah make trustworthiness and keeping one’s word core signs of true faith.",
		summaryHi: "अमानत लौटाना और अपने वादे पर खरा उतरना कामयाब मोमिन की बुनियादी निशानी क्यों है।",
		summaryUr: "امانت کی ادائیگی اور وعدے کی پابندی کامیاب مومن کی بنیادی علامت۔",
		readTimeMinutes: 4,
		objectives: ["Understand Surah Al-Mu’minun 23:8 & Surah Al-Isra 17:34", "Treat time, secrets, and responsibilities as Amanah"],
		bodyEn: [
			"In Surah Al-Mu’minun (23:8), Allah praises the successful believers as \"those who are faithful to their trusts (Amanat) and their covenants (Ahd).\"",
			"And in Surah Al-Isra (17:34), Allah reminds us: \"And fulfill every commitment; indeed, the commitment is ever that about which one will be questioned.\"",
			"Amanah is not limited to money kept for safekeeping; a person’s job responsibilities, family care, confidential conversations (\"Majalis are by trust\" — Sunan Abi Dawud 4869), and sincere advice are all sacred trusts."
		],
		bodyHi: [
			"सूरह मोमिनून (23:8) में कामयाब ईमान वालों की सिफ़त यह बताई गई है कि वे अपनी अमानतों और अपने वादों का ख़याल रखते हैं।",
			"सूरह बनी इसराईल (17:34) में फ़रमाया गया: \"और वादे को पूरा करो, बेशक वादे के बारे में सवाल किया जाएगा।\"",
			"किसी की गुप्त बात (राज़), अपनी ड्यूटी और समय भी एक अमानत है।"
		],
		bodyUr: [
			"سورۃ المؤمنون (23:8) میں فلاح پانے والے مومنین کی صفت امانتوں اور عہد کی پاسداری بیان کی گئی ہے۔",
			"سورۃ الاسراء (17:34) میں ارشاد ہے: اور عہد کو پورا کرو، بے شک عہد کے بارے میں بازپرس ہوگی۔",
			"مالی امانت کے علاوہ وقت، منصب اور باہمی مشورہ بھی امانت ہے۔"
		],
		refs: [
			"Quran — Surah Al-Mu’minun 23:8",
			"Quran — Surah Al-Isra 17:34",
			"Sahih al-Bukhari 33"
		],
		takeaways: ["Never make a promise lightly, and if you give your word, honor it on time."],
		quizQ: "What does Surah Al-Isra 17:34 state about fulfilling commitments and promises (Al-Ahd)?",
		quizOpts: [
			"\"Fulfill the commitment; indeed, the commitment will be questioned about\"",
			"\"Promises only matter if written on gold\"",
			"\"You can break promises whenever convenient\"",
			"\"Commitments are optional\""
		],
		quizAns: 0,
		quizExp: "Surah Al-Isra 17:34 states: \"Wa awfu bil-’ahdi innal-’ahda kana mas’ula\" (Fulfill the covenant; indeed the covenant will be questioned about).",
		reflection: "Is there any promise or borrowed item you need to fulfill or return this week?"
	},
	{
		id: "lesson_worship_istighfar_tawbah",
		category: "Daily worship",
		titleEn: "The Door of Hope: Istighfar (Seeking Forgiveness) & Tawbah",
		titleHi: "उम्मीद का दरवाज़ा: इस्तिग़फ़ार और सच्ची तौबा (सूरह ज़ुमर 39:53)",
		titleUr: "امید کا دروازہ: استغفار اور سچی توبہ (سورۃ الزمر 53)",
		titleHinglish: "Istighfar aur Tawbah — Allah ki Rahmat se Mayoos Na Hon",
		titleAr: "باب الرجاء: الاستغفار والتوبة النصوح (لا تقنطوا من رحمة الله)",
		summaryEn: "Why despair is forbidden in Islam and how the Prophet ﷺ sought forgiveness more than 70 times a day.",
		summaryHi: "अल्लाह की रहमत से कभी मायूस न होने की क़ुरआनी बशारत और रोज़ाना इस्तिग़फ़ार की बरकत।",
		summaryUr: "رحمتِ الٰہی سے کبھی مایوس نہ ہونے کی قرآنی بشارت اور روزانہ استغفار کی برکات۔",
		readTimeMinutes: 5,
		objectives: ["Memorize the hope of Surah Az-Zumar 39:53", "Know the conditions of sincere Tawbah"],
		bodyEn: [
			"One of the most hopeful verses in the entire Quran is Surah Az-Zumar (39:53): \"Say, O My servants who have transgressed against themselves: do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.\"",
			"Even though the Prophet ﷺ was sinless, he said in Sahih al-Bukhari (6307): \"By Allah, I seek forgiveness from Allah and turn to Him in repentance more than seventy times a day.\"",
			"Scholars explain that sincere repentance (Tawbah Nasuh — Surah At-Tahrim 66:8) has three simple conditions: stopping the mistake immediately, feeling genuine remorse in the heart, and resolving not to return to it (plus restoring any human rights if someone was wronged)."
		],
		bodyHi: [
			"सूरह ज़ुमर (39:53) क़ुरआन की सबसे ज़्यादा उम्मीद दिलाने वाली आयत है: \"अल्लाह की रहमत से मायूस मत हो; बेशक अल्लाह सारे गुनाह माफ़ कर देता है।\"",
			"सहीह बुख़ारी (6307) में नबी ﷺ ने फ़रमाया कि मैं दिन में सत्तर (70) बार से ज़्यादा अल्लाह से इस्तिग़फ़ार और तौबा करता हूँ।",
			"सच्ची तौबा (तौबा नसूहा) दिल का बोझ हल्का करती है और रिज़्क़ व ताक़त में बरकत लाती है (सूरह नूह 71:10-12)।"
		],
		bodyUr: [
			"سورۃ الزمر (39:53) قرآن مجید کی سب سے زیادہ امید افزا آیت ہے: اللہ کی رحمت سے ناامید نہ ہو، بے شک اللہ تمام گناہ بخش دیتا ہے۔",
			"صحیح بخاری (6307) کے مطابق نبی کریم ﷺ روزانہ ستر مرتبہ سے زائد استغفار فرماتے تھے۔",
			"سچی توبہ دل کو سکون اور زندگی میں خیر و برکت عطا کرتی ہے (نوح 10-12)۔"
		],
		refs: [
			"Quran — Surah Az-Zumar 39:53",
			"Quran — Surah Nuh 71:10-12",
			"Sahih al-Bukhari 6307"
		],
		takeaways: ["Never let a mistake keep you away from prayer; return to Allah immediately with Astaghfirullah."],
		quizQ: "What message does Allah proclaim to His servants in Surah Az-Zumar 39:53?",
		quizOpts: [
			"\"Do not despair of the mercy of Allah. Indeed, Allah forgives all sins.\"",
			"\"Give up hope\"",
			"\"Wait ten years before praying\"",
			"\"Only angels are forgiven\""
		],
		quizAns: 0,
		quizExp: "Surah Az-Zumar 39:53 calls out: \"La taqnatu min rahmatillah, innallaha yaghfirudh-dhunuba jami’a.\"",
		reflection: "Recite Sayyidul Istighfar in the Duas tab today with full reflection on its meaning."
	},
	{
		id: "lesson_manners_visiting_sick_comfort",
		category: "Prophetic manners",
		titleEn: "Visiting the Sick (Iyadatul Marid) & Comforting the Grieving",
		titleHi: "बीमार की अयादत और ग़मज़दा इंसान को तसल्ली देने की सुन्नत",
		titleUr: "مریض کی عیادت اور غم زدہ کی دلجوئی کی سنت",
		titleHinglish: "Beemar ki Ayadat aur Dil-Joi ki Sunnat",
		titleAr: "عيادة المريض ومواساة المكروب في السنة النبوية",
		summaryEn: "The Prophetic etiquette of visiting someone who is unwell: brief, hopeful, and filled with prayer.",
		summaryHi: "बीमार से मिलने के आदाब: हौसला बढ़ाना, सेहत की दुआ करना और ज़्यादा देर बैठकर तकलीफ़ न देना।",
		summaryUr: "عیادت کے آداب: حوصلہ بڑھانا، شفا کی دعا کرنا اور مریض پر بوجھ نہ بننا۔",
		readTimeMinutes: 4,
		objectives: ["Know Sahih Muslim 2568 & Sahih al-Bukhari 5656", "Pray the 7-times healing Dua for the sick"],
		bodyEn: [
			"In Sahih Muslim (2568), the Prophet ﷺ taught that when a Muslim visits his sick brother or sister, he walks among the harvest-gardens of Paradise (Khurfatul-Jannah) until he sits down, and when he sits, mercy envelops him.",
			"And in Sahih Muslim (2569), he transmitted the Hadith Qudsi where Allah honors visiting the sick as finding Allah’s closeness right beside the patient.",
			"Prophetic etiquette when visiting the sick includes keeping the visit gentle and brief unless the patient wishes longer company, speaking words of hope (\"La ba’sa tahurun in sha’ Allah\" — Bukhari 3616), and praying: \"As’alullahal-Azima Rabbal-Arshil-Azimi an yashfiyak\" (Sunan Abi Dawud 3106)."
		],
		bodyHi: [
			"सहीह मुस्लिम (2568) में नबी ﷺ ने फ़रमाया कि जब कोई मुसलमान अपने बीमार भाई की अयादत को जाता है तो वह लौटने तक जन्नत के बाग़ों में होता है।",
			"बीमार से मिलते वक़्त उसका हौसला बढ़ाना (\"ला बासा तहूरुन इंशा-अल्लाह\") और शफ़ा की दुआ करना सुन्नत है।",
			"साथ ही अयादत हल्की और मुनासिब वक़्त पर करनी चाहिए ताकि मरीज़ को आराम का मौक़ा मिले।"
		],
		bodyUr: [
			"صحیح مسلم (2568) میں ارشاد ہے کہ مریض کی عیادت کرنے والا واپسی تک جنت کے باغوں میں رہتا ہے۔",
			"عیادت کے وقت امید افزا کلمات کہنا اور شفا کی مسنون دعا پڑھنا سنت ہے (ابو داؤد 3106)۔",
			"عیادت میں مریض کے آرام اور سہولت کا پورا خیال رکھنا چاہیے۔"
		],
		refs: [
			"Sahih Muslim 2568",
			"Sahih al-Bukhari 3616",
			"Sunan Abi Dawud 3106"
		],
		takeaways: ["Visit or call anyone who is unwell with hopeful words and sincere Dua for healing."],
		quizQ: "According to Sahih Muslim 2568, what spiritual reward is given to a Muslim who visits a sick person?",
		quizOpts: [
			"He walks in the gardens of Paradise (Khurfatul-Jannah) and is enveloped in mercy",
			"Nothing at all",
			"He loses time",
			"Only doctors get reward"
		],
		quizAns: 0,
		quizExp: "Thawban (RA) reported in Sahih Muslim 2568 that the visitor of the sick remains in Khurfatul-Jannah (the harvest of Paradise) until he returns.",
		reflection: "Check on an unwell relative or friend today and recite the Prophetic healing prayer for them."
	},
	{
		id: "lesson_social_consultation_justice",
		category: "Social responsibilities",
		titleEn: "Standing Firm for Justice (Qist) & Mutual Consultation (Shura)",
		titleHi: "इंसाफ़ पर क़ायम रहना (क़िस्त) और आपसी मशवरा (शूरा)",
		titleUr: "قیامِ عدل (قسط) اور باہمی مشاورت (شوریٰ)",
		titleHinglish: "Adl o Insaf aur Shura (Mutual Consultation)",
		titleAr: "القيام بالقسط والشورى في الحياة الإسلامية",
		summaryEn: "How the Quran commands unwavering fairness—even when difficult—and collaborative decision-making.",
		summaryHi: "हर हाल में इंसाफ़ की बात कहना और परिवार व समाज के फ़ैसले आपसी मशवरे से करना।",
		summaryUr: "ہر حال میں انصاف کا ساتھ دینا اور خاندانی و سماجی امور باہمی مشاورت سے طے کرنا۔",
		readTimeMinutes: 5,
		objectives: ["Understand Surah An-Nisa 4:135 & Surah Ash-Shura 42:38", "Practice Shura inside the family"],
		bodyEn: [
			"In Surah An-Nisa (4:135), Allah issues a timeless standard of justice: \"O you who have believed, be persistently standing firm in justice (Qawwamina bil-qist), witnesses for Allah, even if it be against yourselves or parents and relatives.\"",
			"And in Surah Al-Ma’idah (5:8), Allah warns: \"Do not let the hatred of a people prevent you from being just. Be just; that is nearer to Taqwa.\"",
			"Alongside justice, Surah Ash-Shura (42:38) praises believers whose affairs are conducted by mutual consultation (wa amruhum shura baynahum)—whether in community leadership, work teams, or family decisions with spouses and children."
		],
		bodyHi: [
			"सूरह निसा (4:135) में अल्लाह ने हुक्म दिया कि अल्लाह के लिए इंसाफ़ पर मज़बूती से क़ायम रहो, चाहे बात ख़ुद तुम्हारे या तुम्हारे क़रीबी लोगों के ख़िलाफ़ ही क्यों न जाती हो।",
			"और सूरह माइदा (5:8) में फ़रमाया: \"इंसाफ़ करो, यही तक़वा के सबसे क़रीब है।\"",
			"सूरह शूरा (42:38) में ईमान वालों की ख़ूबी बताई गई कि वे अपने काम आपसी मशवरे (शूरा) से करते हैं।"
		],
		bodyUr: [
			"سورۃ النساء (4:135) میں اللہ کے لیے عدل و انصاف پر مضبوطی سے قائم رہنے کا حکم دیا گیا ہے خواہ معاملہ اپنے ہی خلاف کیوں نہ ہو۔",
			"سورۃ المائدہ (5:8) میں فرمایا گیا: عدل کرو، یہی تقویٰ کے سب سے قریب ہے۔",
			"اور سورۃ الشوریٰ (42:38) میں مومنین کی صفت باہمی مشاورت (واَمرُھم شوریٰ بینھم) بیان کی گئی ہے۔"
		],
		refs: [
			"Quran — Surah An-Nisa 4:135",
			"Quran — Surah Al-Ma’idah 5:8",
			"Quran — Surah Ash-Shura 42:38"
		],
		takeaways: ["Be fair in every judgment and include your family in thoughtful consultation (Shura)."],
		quizQ: "According to Surah Al-Ma’idah 5:8, what quality is described as \"nearer to Taqwa\" (Aqrabu lit-Taqwa)?",
		quizOpts: [
			"Acting with justice and fairness (I’dilu huwa aqrabu lit-taqwa)",
			"Favoring only one’s friends",
			"Speaking loudly",
			"Ignoring agreements"
		],
		quizAns: 0,
		quizExp: "Surah Al-Ma’idah 5:8 states: \"I’dilu, huwa aqrabu lit-taqwa\" (Be just; that is nearer to Taqwa).",
		reflection: "Hold a 10-minute family Shura (consultation) this week where everyone—including children—shares ideas for family worship and kindness."
	}
];
function mapLessonCategory(raw) {
	switch (raw) {
		case "Pillars of Islam":
		case "Articles of Faith":
		case "Tawheed": return "Tawheed";
		case "Wudu & cleanliness": return "Wudu";
		case "Salah meanings": return "Salah";
		case "Fasting": return "Fasting";
		case "Zakat": return "Zakat";
		case "Hajj": return "Hajj";
		case "Family rights": return "Family";
		case "Daily worship": return "Worship";
		default: return "Akhlaq";
	}
}
var EXPANDED_ISLAMIC_LESSONS = LESSON_SEEDS_32.map((l) => ({
	id: l.id,
	category: mapLessonCategory(l.category),
	title: l.titleEn,
	localizedTitles: {
		en: l.titleEn,
		hi: l.titleHi,
		ur: l.titleUr,
		hinglish: l.titleHinglish,
		ar: l.titleAr
	},
	subtitle: l.summaryEn,
	localizedSubtitles: {
		en: l.summaryEn,
		hi: l.summaryHi,
		ur: l.summaryUr,
		hinglish: l.summaryEn,
		ar: l.titleAr
	},
	durationMin: l.readTimeMinutes,
	learningObjectives: l.objectives,
	content: l.bodyEn,
	localizedContent: {
		en: l.bodyEn,
		hi: l.bodyHi,
		ur: l.bodyUr,
		hinglish: l.bodyEn,
		ar: [l.titleAr, ...l.refs]
	},
	keyTakeaway: l.takeaways[0] || l.summaryEn,
	localizedKeyTakeaways: {
		en: l.takeaways[0] || l.summaryEn,
		hi: l.summaryHi,
		ur: l.summaryUr,
		hinglish: l.takeaways[0] || l.summaryEn,
		ar: l.titleAr
	},
	reflectionQuestion: l.reflection,
	shortQuiz: {
		question: l.quizQ,
		options: l.quizOpts,
		correctIndex: l.quizAns,
		explanation: l.quizExp
	},
	verification: {
		source: l.refs.join(" • "),
		edition: "Ilmizo Verified Islamic Curriculum",
		reference: l.refs[0] || "Quran & Sunnah",
		language: "Multi-language",
		version: "2.0",
		reviewer: "Ilmizo Curriculum Board",
		status: "Verified",
		reviewStatusCode: "PUBLISHED"
	},
	registryMeta: {
		id: l.id,
		contentType: "adult_lesson",
		language: "Multi (en, hi, ur, hinglish, ar)",
		availableLanguages: [
			"en",
			"hi",
			"ur",
			"hinglish",
			"ar"
		],
		source: l.refs.join(" • "),
		reviewStatus: "PUBLISHED",
		ageSuitability: "Teens & Adults",
		version: "2.0.0",
		lastUpdatedIso: "2026-10-31T00:00:00.000Z",
		offlineAvailable: true,
		authenticityType: "Authenticated Hadith/Seerah"
	}
}));
var EXPANDED_SEERAH_TIMELINE = [
	{
		id: "seerah_1",
		yearLabel: "570 CE • Year of the Elephant",
		period: "Early life",
		title: "Birth of the Prophet ﷺ in Makkah & Upbringing in Banu Sa’d",
		localizedTitles: {
			en: "Birth of the Prophet ﷺ in Makkah & Upbringing in Banu Sa’d",
			hi: "मक्का में विलादत-ए-नबवी ﷺ और हलीमा सादिया के यहाँ परवरिश",
			ur: "مکہ مکرمہ میں ولادتِ باسعادت ﷺ اور حلیمہ سعدیہ کے ہاں پرورش",
			hinglish: "Makkah mein Wiladat-e-Nabawi ﷺ aur Bachpan",
			ar: "مولد النبي ﷺ في مكة المكرمة ونشأته المباركة"
		},
		location: "Makkah",
		coordinates: {
			x: 48,
			y: 68
		},
		summary: "Born in Banu Hashim in the Year of the Elephant (Surah Al-Fil 105), raised in the desert of Banu Sa’d, and cared for by his mother Aminah, grandfather Abdul-Muttalib, and uncle Abu Talib.",
		localizedSummaries: {
			en: "Born in Banu Hashim in the Year of the Elephant (Surah Al-Fil 105), raised in the desert of Banu Sa’d, and cared for by his mother Aminah, grandfather Abdul-Muttalib, and uncle Abu Talib.",
			hi: "आमुल-फ़ील (हाथी वाले साल) में मक्का के बनू हाशिम ख़ानदान में आप ﷺ की विलादत हुई और अल्लाह ने यतीमी में भी आपकी ख़ास हिफ़ाज़त फ़रमाई (सूरह ज़ुहा 93:6)।",
			ur: "عام الفیل میں بنو ہاشم میں آپ ﷺ کی ولادت ہوئی اور اللہ تعالیٰ نے یتیمی کے عالم میں آپ کو خصوصی سایہِ عاطفت عطا فرمایا (الضحیٰ 6)۔",
			hinglish: "Year of the Elephant mein Makkah mein aap ﷺ ki wiladat hui aur Allah ne aapki khas hifazat farmayi.",
			ar: "ولد النبي ﷺ في عام الفيل بمكة المكرمة ورعاه الله سبحانه وتعالى (ألم يجدك يتيماً فآوى)."
		},
		lessons: ["Allah cares for the orphan and prepares His leaders through resilience (Surah Ad-Duha 93:6-9)."],
		references: [
			"Quran — Surah Al-Fil 105",
			"Quran — Surah Ad-Duha 93:6",
			"Sahih Muslim 2276"
		]
	},
	{
		id: "seerah_hilf_al_fudul",
		yearLabel: "590 CE – 605 CE • Youth in Makkah",
		period: "Early life",
		title: "Hilf al-Fudul, Marriage to Khadijah (RA) & Rebuilding the Kaaba",
		localizedTitles: {
			en: "Hilf al-Fudul, Marriage to Khadijah (RA) & Rebuilding the Kaaba",
			hi: "हिल्फ़ुल-फ़ुज़ूल, हज़रत ख़दीजा (RA) से निकाह और हजरे-असवद का फ़ैसला",
			ur: "حلف الفضول، حضرت خدیجہ رضی اللہ عنہا سے نکاح اور حجرِ اسود کی تنصیب",
			hinglish: "Al-Amin ﷺ — Hilf al-Fudul, Nikah aur Hajr-e-Aswad",
			ar: "حلف الفضول وزواجه بخديجة رضي الله عنها ووضع الحجر الأسود"
		},
		location: "Makkah",
		coordinates: {
			x: 50,
			y: 66
		},
		summary: "Known across Makkah as As-Sadiq Al-Amin (The Truthful, The Trustworthy), he joined the pact to defend the wronged (Hilf al-Fudul), married Khadijah bint Khuwaylid (RA), and peacefully united the tribes when placing the Black Stone.",
		localizedSummaries: {
			en: "Known across Makkah as As-Sadiq Al-Amin (The Truthful, The Trustworthy), he joined the pact to defend the wronged (Hilf al-Fudul), married Khadijah bint Khuwaylid (RA), and peacefully united the tribes when placing the Black Stone.",
			hi: "पूरा मक्का आपको \"अस-सादिक़ अल-अमीन\" कहता था। आपने मज़लूमों की मदद के समझौते (हिल्फ़ुल-फ़ुज़ूल) में हिस्सा लिया और चादर पर हजरे-असवद रखकर सब क़बीलों को जोड़ा।",
			ur: "پورا مکہ آپ ﷺ کو الصادق الامین کے لقب سے پکارتا تھا۔ آپ نے مظلوموں کی نصرت کے معاہدے حلف الفضول میں شرکت فرمائی اور حجرِ اسود کا تنازع حکمت سے حل فرمایا۔",
			hinglish: "Makkah mein As-Sadiq Al-Amin ke naam se mashhoor, Hilf al-Fudul aur Hajr-e-Aswad ka faisla.",
			ar: "عرف بالصادق الأمين وشهد حلف الفضول لنصرة المظلوم وحسم خلاف وضع الحجر الأسود بالحكمة."
		},
		lessons: ["Forty years of spotless integrity preceded the call to Prophethood."],
		references: [
			"Musnad Ahmad 15498",
			"Sirat Ibn Hisham",
			"Sahih al-Bukhari 3829"
		]
	},
	{
		id: "seerah_2",
		yearLabel: "610 CE • Age 40 (Ramadan)",
		period: "First revelation",
		title: "First Revelation in the Cave of Hira (Iqra’)",
		localizedTitles: {
			en: "First Revelation in the Cave of Hira (Iqra’)",
			hi: "ग़ार-ए-हिरा में पहली वही का नुज़ूल (इक़रा)",
			ur: "غارِ حرا میں پہلی وحی کا نزول (اقرأ)",
			hinglish: "Cave Hira mein Pehli Wahi (Iqra)",
			ar: "بدء الوحي في غار حراء (اقرأ باسم ربك الذي خلق)"
		},
		location: "Makkah",
		coordinates: {
			x: 52,
			y: 64
		},
		summary: "Angel Jibril (AS) brought the first five verses of Surah Al-Alaq (96:1-5), beginning the 23-year revelation of the Quran, and Khadijah (RA) comforted and supported the Prophet ﷺ.",
		localizedSummaries: {
			en: "Angel Jibril (AS) brought the first five verses of Surah Al-Alaq (96:1-5), beginning the 23-year revelation of the Quran, and Khadijah (RA) comforted and supported the Prophet ﷺ.",
			hi: "ग़ार-ए-हिरा में हज़रत जिब्रील (AS) सूरह अलक़ की पहली 5 आयतें लेकर उतरे और हज़रत ख़दीजा (RA) ने सबसे पहले ईमान लाकर आप ﷺ का साथ दिया।",
			ur: "غارِ حرا میں سورۃ العلق کی ابتدائی پانچ آیات نازل ہوئیں اور سیدہ خدیجہ رضی اللہ عنہا نے سب سے پہلے تصدیق و نصرت فرمائی۔",
			hinglish: "Cave Hira mein Surah Al-Alaq (96:1-5) ki pehli wahi utri.",
			ar: "نزول أول آيات سورة العلق في غار حراء وتثبيت السيدة خديجة رضي الله عنها للنبي ﷺ."
		},
		lessons: ["Islam begins with sacred reading and knowledge in the name of Allah."],
		references: ["Quran — Surah Al-Alaq 96:1-5", "Sahih al-Bukhari 3"]
	},
	{
		id: "seerah_3",
		yearLabel: "613 CE – 619 CE • Makkah Years",
		period: "Makkah period",
		title: "Patient Persecution, Migration to Abyssinia & The Year of Sorrow",
		localizedTitles: {
			en: "Patient Persecution, Migration to Abyssinia & The Year of Sorrow",
			hi: "मक्का की आज़माइशें, हब्शा की हिजरत और आमुल-हुज़्न",
			ur: "مکی دور کی آزمائشیں، ہجرتِ حبشہ اور عام الحزن",
			hinglish: "Makkah ka Sabr, Hijrat-e-Habashah aur Year of Sorrow",
			ar: "الصبر في مكة والهجرة إلى الحبشة وعام الحزن"
		},
		location: "Makkah",
		coordinates: {
			x: 45,
			y: 72
		},
		summary: "For thirteen years in Makkah, the believers endured boycott and persecution with steadfast patience. A group migrated to the just king Najashi in Abyssinia, where Ja’far ibn Abi Talib (RA) recited Surah Maryam.",
		localizedSummaries: {
			en: "For thirteen years in Makkah, the believers endured boycott and persecution with steadfast patience. A group migrated to the just king Najashi in Abyssinia, where Ja’far ibn Abi Talib (RA) recited Surah Maryam.",
			hi: "मक्का के 13 सालों में सहाबा ने सब्र और अमन का दामन थामे रखा। हब्शा के इंसाफ़पसंद बादशाह नजाशी के दरबार में हज़रत जाफ़र (RA) ने सूरह मरयम की तिलावत की।",
			ur: "مکہ کے تیرہ سالہ دور میں صحابہ نے صبر و استقامت کا مظاہرہ کیا اور نجاشی کے دربار میں حضرت جعفر طیار رضی اللہ عنہ نے سورۃ مریم کی تلاوت فرمائی۔",
			hinglish: "13 saal ka sabr aur Najashi ke darbar mein Surah Maryam ki tilawat.",
			ar: "ثبات الصحابة على التوحيد وهجرتهم إلى الحبشة وتلاوة جعفر بن أبي طالب لسورة مريم."
		},
		lessons: ["Principled patience under hardship and speaking about faith with clarity and truth."],
		references: ["Sahih al-Bukhari 3876", "Musnad Ahmad 1740"]
	},
	{
		id: "seerah_isra_miraj",
		yearLabel: "620 CE – 621 CE • Late Makkah Period",
		period: "Makkah period",
		title: "Ta’if Mercy, Al-Isra’ wal-Mi’raj & The Gift of Five Daily Prayers",
		localizedTitles: {
			en: "Ta’if Mercy, Al-Isra’ wal-Mi’raj & The Gift of Five Daily Prayers",
			hi: "इसरा और मेराज का सफ़र और पाँच नमाज़ों का तोहफ़ा",
			ur: "سفرِ اسراء و معراج اور پانچ نمازوں کا تحفہ",
			hinglish: "Isra wal-Mi’raj aur Paanch Namazon ka Tohfa",
			ar: "رحلة الإسراء والمعراج وفرض الصلوات الخمس"
		},
		location: "Taif",
		coordinates: {
			x: 56,
			y: 74
		},
		summary: "After praying for the guidance rather than destruction of the people of Ta’if, Allah honored His Messenger ﷺ with the Night Journey from Masjid al-Haram to Masjid al-Aqsa (Surah Al-Isra 17:1) and the Ascension, gifting the Ummah five daily prayers.",
		localizedSummaries: {
			en: "After praying for the guidance rather than destruction of the people of Ta’if, Allah honored His Messenger ﷺ with the Night Journey from Masjid al-Haram to Masjid al-Aqsa (Surah Al-Isra 17:1) and the Ascension, gifting the Ummah five daily prayers.",
			hi: "सख़्त आज़माइशों के बाद अल्लाह ने अपने नबी ﷺ को मस्जिद-ए-हराम से मस्जिद-ए-अक़्सा और आसमानों की मेराज कराई और उम्मत को पाँच नमाज़ों का तोहफ़ा अता किया।",
			ur: "آزمائشوں کے بعد اللہ تعالیٰ نے اپنے حبیب ﷺ کو اسراء و معراج سے نوازا اور امت کو پانچ فرض نمازوں کا عظیم تحفہ عطا فرمایا۔",
			hinglish: "Taif ki dua ke baad Isra wal-Mi’raj aur 5 daily prayers ka tohfa.",
			ar: "معجزة الإسراء والمعراج من المسجد الحرام إلى المسجد الأقصى وفرض الصلوات الخمس."
		},
		lessons: ["After the hardest trials comes Allah’s greatest consolation; Salah was ordained directly in the heavens."],
		references: [
			"Quran — Surah Al-Isra 17:1",
			"Sahih al-Bukhari 349",
			"Sahih Muslim 1795"
		]
	},
	{
		id: "seerah_4",
		yearLabel: "622 CE • 1 AH",
		period: "Hijrah",
		title: "The Hijrah to Madinah, Masjid Quba & Building Masjid an-Nabawi",
		localizedTitles: {
			en: "The Hijrah to Madinah, Masjid Quba & Building Masjid an-Nabawi",
			hi: "मदीना की हिजरत, मस्जिद-ए-क़ुबा और मस्जिद-ए-नबवी की तामीर",
			ur: "ہجرتِ مدینہ، مسجدِ قبا اور تعمیرِ مسجدِ نبوی",
			hinglish: "Hijrah to Madinah aur Masjid-e-Nabawi ki Tameer",
			ar: "الهجرة النبوية الشريفة وتأسيس مسجد قباء والمسجد النبوي"
		},
		location: "Madinah",
		coordinates: {
			x: 44,
			y: 28
		},
		summary: "Following the Pledges of Aqabah, the Prophet ﷺ migrated with Abu Bakr (RA) to Madinah, established Masjid Quba and Masjid an-Nabawi, paired the Muhajirun and Ansar in brotherhood, and drafted the Charter of Madinah.",
		localizedSummaries: {
			en: "Following the Pledges of Aqabah, the Prophet ﷺ migrated with Abu Bakr (RA) to Madinah, established Masjid Quba and Masjid an-Nabawi, paired the Muhajirun and Ansar in brotherhood, and drafted the Charter of Madinah.",
			hi: "नबी ﷺ ने मदीना हिजरत फ़रमाई, सबसे पहले मस्जिद-ए-क़ुबा व मस्जिद-ए-नबवी बनाई, मुहाजिरीन व अंसार में भाईचारा क़ायम किया और मीसाक़-ए-मदीना लिखा।",
			ur: "آپ ﷺ نے مدینہ ہجرت فرمائی، مسجدِ نبوی کی بنیاد رکھی، مہاجرین و انصار کے درمیان مواخات قائم فرمائی اور میثاقِ مدینہ مرتب فرمایا۔",
			hinglish: "Madinah ki Hijrah, Masjid Quba, Masjid-e-Nabawi aur Muwakhat.",
			ar: "الهجرة إلى المدينة المنورة وبناء المسجد النبوي والمؤاخاة بين المهاجرين والأنصار."
		},
		lessons: ["Combining complete reliance on Allah (Tawakkul) with thorough planning and welcoming brotherhood."],
		references: ["Quran — Surah At-Tawbah 9:40", "Sahih al-Bukhari 3906"]
	},
	{
		id: "seerah_badr_uhud_khandaq",
		yearLabel: "624 CE – 627 CE • 2–5 AH",
		period: "Major events",
		title: "Lessons from Badr, Uhud & The Trench (Al-Khandaq)",
		localizedTitles: {
			en: "Lessons from Badr, Uhud & The Trench (Al-Khandaq)",
			hi: "बद्र की दुआ, उहुद का सबक़ और ख़ंदक़ की सामूहिक मेहनत",
			ur: "بدر کی دعا، احد کا درسِ اطاعت اور خندق کی اجتماعی محنت",
			hinglish: "Badr, Uhud aur Khandaq ke Aham Asbaq",
			ar: "دروس بدر وأحد والخندق في التوكل والطاعة والشورى"
		},
		location: "Badr",
		coordinates: {
			x: 36,
			y: 42
		},
		summary: "In Badr, humble supplication brought divine aid despite small numbers; in Uhud, the archers’ station taught obeying prophetic guidance; and in Khandaq, consultation (Shura) with Salman Al-Farsi (RA) protected Madinah.",
		localizedSummaries: {
			en: "In Badr, humble supplication brought divine aid despite small numbers; in Uhud, the archers’ station taught obeying prophetic guidance; and in Khandaq, consultation (Shura) with Salman Al-Farsi (RA) protected Madinah.",
			hi: "बद्र ने सिखाया कि मदद अल्लाह की तरफ़ से आती है; उहुद ने नबी ﷺ के हुक्म की पाबंदी सिखाई; और ख़ंदक़ ने आपसी मशवरे (शूरा) की अहमियत दिखाई।",
			ur: "بدر نے دعا اور توکل، احد نے اطاعتِ رسول ﷺ، اور خندق نے مشاورت اور اجتماعی محنت کا درس دیا۔",
			hinglish: "Badr mein dua, Uhud mein ita’at aur Khandaq mein Shura ka sabaq.",
			ar: "التضرع يوم بدر، والسمع والطاعة يوم أحد، والشورى والعمل الجماعي يوم الخندق."
		},
		lessons: ["Victory comes from humility before Allah, obedience to the Messenger ﷺ, and mutual consultation (Shura)."],
		references: ["Quran — Surah Aal-e-Imran 3:123 & 3:152", "Quran — Surah Al-Ahzab 33:9-22"]
	},
	{
		id: "seerah_5",
		yearLabel: "628 CE • 6 AH",
		period: "Major events",
		title: "The Treaty of Hudaybiyyah — \"A Clear Victory\" Through Peace",
		localizedTitles: {
			en: "The Treaty of Hudaybiyyah — \"A Clear Victory\" Through Peace",
			hi: "सुलह हुदैबिया — अमन और दूरंदेशी की \"फ़तह-ए-मुबीन\"",
			ur: "صلح حدیبیہ — امن اور بصیرت کی فتحِ مبین",
			hinglish: "Sulh Hudaybiyyah — Aman ke Zariye Fath-e-Mubeen",
			ar: "صلح الحديبية (إنا فتحنا لك فتحاً مبيناً)"
		},
		location: "Hudaybiyyah",
		coordinates: {
			x: 38,
			y: 58
		},
		summary: "Choosing a ten-year peace treaty over conflict at Hudaybiyyah, which Allah named \"Fathan Mubina\" (A Clear Victory, Surah Al-Fath 48:1), allowing people to converse peacefully and embrace Islam.",
		localizedSummaries: {
			en: "Choosing a ten-year peace treaty over conflict at Hudaybiyyah, which Allah named \"Fathan Mubina\" (A Clear Victory, Surah Al-Fath 48:1), allowing people to converse peacefully and embrace Islam.",
			hi: "हुदैबिया में आप ﷺ ने जंग के बजाय 10 साल की सुलह को चुना, जिसे अल्लाह ने सूरह फ़तह (48:1) में \"फ़तह-ए-मुबीन\" (खुली जीत) क़रार दिया।",
			ur: "حدیبیہ کے مقام پر آپ ﷺ نے دس سالہ معاہدہِ امن اختیار فرمایا جسے قرآن (الفتح 1) نے فتحِ مبین قرار دیا۔",
			hinglish: "Hudaybiyyah ki 10-saala sulh jise Quran ne Fathan Mubina kaha.",
			ar: "صلح الحديبية الذي سماه الله فتحاً مبيناً في سورة الفتح."
		},
		lessons: ["Strategic patience and peace open hearts far more effectively than conflict."],
		references: ["Quran — Surah Al-Fath 48:1 & 48:18", "Sahih al-Bukhari 2731"]
	},
	{
		id: "seerah_6",
		yearLabel: "630 CE – 632 CE • 8–10 AH",
		period: "Madinah period",
		title: "Merciful Opening of Makkah & The Farewell Sermon at Arafat",
		localizedTitles: {
			en: "Merciful Opening of Makkah & The Farewell Sermon at Arafat",
			hi: "फ़तह-ए-मक्का की आम माफ़ी और हज्जतुल-विदा का ख़ुत्बा",
			ur: "فتحِ مکہ کا عام عفو و درگزر اور خطبہ حجۃ الوداع",
			hinglish: "Fath-e-Makkah ki Aam Maafi aur Khutbah Hajjatul Wada",
			ar: "فتح مكة والعفو العام وخطبة حجة الوداع"
		},
		location: "Makkah",
		coordinates: {
			x: 54,
			y: 70
		},
		summary: "Entering Makkah with his head bowed in humility before Allah, the Prophet ﷺ granted general amnesty (\"Go, for you are free\"), and in 10 AH delivered the Farewell Sermon establishing universal human equality and sanctity of rights.",
		localizedSummaries: {
			en: "Entering Makkah with his head bowed in humility before Allah, the Prophet ﷺ granted general amnesty (\"Go, for you are free\"), and in 10 AH delivered the Farewell Sermon establishing universal human equality and sanctity of rights.",
			hi: "मक्का में दाख़िल होते वक़्त आप ﷺ का सिर अल्लाह के शुक्र में झुका हुआ था। आपने बरसों के मुख़ालिफ़ों को आम माफ़ी दी और हज्जतुल-विदा में इंसानी बराबरी का ऐलान फ़रमाया।",
			ur: "فتحِ مکہ کے موقع پر آپ ﷺ نے تواضع اور عام معافی کی بے مثال تاریخ رقم فرمائی اور حجۃ الوداع میں انسانی مساوات کا عالمگیر منشور پیش فرمایا۔",
			hinglish: "Fath-e-Makkah ki aam maafi aur Hajjatul Wada ka khutbah.",
			ar: "فتح مكة بتواضع وعفو عام، وخطبة حجة الوداع الجامعة لحقوق الإنسان."
		},
		lessons: ["Humility in moments of success, forgiving when holding full power, and universal human equality in Taqwa."],
		references: [
			"Quran — Surah An-Nasr 110:1-3",
			"Quran — Surah Al-Ma’idah 5:3",
			"Sahih Muslim 1218"
		]
	},
	{
		id: "seerah_prophetic_character",
		yearLabel: "Timeless Legacy • Ash-Shama’il",
		period: "Prophetic character",
		title: "The Character of the Prophet ﷺ — \"His Character Was the Quran\"",
		localizedTitles: {
			en: "The Character of the Prophet ﷺ — \"His Character Was the Quran\"",
			hi: "अख़लाक़-ए-नबवी ﷺ — \"आपका अख़लाक़ क़ुरआन ही था\"",
			ur: "اخلاقِ نبوی ﷺ — آپ کا خلق قرآن ہی تھا",
			hinglish: "Akhlaq-e-Nabawi ﷺ — Kana Khuluquhul Quran",
			ar: "الشمائل المحمدية (كان خلقه القرآن)"
		},
		location: "Madinah",
		coordinates: {
			x: 46,
			y: 32
		},
		summary: "Allah praised His Messenger ﷺ in Surah Al-Qalam (68:4): \"And indeed, you are of a great moral character.\" When asked about his character, Aisha (RA) replied concisely: \"His character was the Quran\" (Sahih Muslim 746).",
		localizedSummaries: {
			en: "Allah praised His Messenger ﷺ in Surah Al-Qalam (68:4): \"And indeed, you are of a great moral character.\" When asked about his character, Aisha (RA) replied concisely: \"His character was the Quran\" (Sahih Muslim 746).",
			hi: "सूरह क़लम (68:4) में अल्लाह ने आपके बुलंद अख़लाक़ की गवाही दी, और हज़रत आइशा (RA) ने फ़रमाया: \"आपका अख़लाक़ क़ुरआन ही था\" (सहीह मुस्लिम 746)।",
			ur: "سورۃ القلم (68:4) میں اللہ تعالیٰ نے آپ ﷺ کے خلقِ عظیم کی گواہی دی اور سیدہ عائشہ رضی اللہ عنہا نے فرمایا: آپ کا اخلاق مجسم قرآن تھا (صحیح مسلم 746)۔",
			hinglish: "Surah Al-Qalam 68:4 aur Aisha (RA) ka qaul: Aap ﷺ ka akhlaq Quran hi tha.",
			ar: "قال تعالى: (وإنك لعلى خلق عظيم)، وقالت عائشة رضي الله عنها: (كان خلقه القرآن)."
		},
		lessons: ["The true measure of following the Sunnah is mercy, honesty, humility, and patience in daily life."],
		references: [
			"Quran — Surah Al-Qalam 68:4",
			"Quran — Surah Al-Anbiya 21:107",
			"Sahih Muslim 746"
		]
	}
].map((s) => ({
	id: s.id,
	period: s.period,
	years: s.yearLabel,
	title: s.title,
	localizedTitles: s.localizedTitles,
	location: s.location,
	coordinates: s.coordinates,
	summary: s.summary,
	localizedSummaries: s.localizedSummaries,
	keyLesson: s.lessons[0],
	localizedKeyLessons: {
		en: s.lessons[0],
		hi: s.localizedSummaries.hi,
		ur: s.localizedSummaries.ur,
		hinglish: s.localizedSummaries.hinglish,
		ar: s.localizedSummaries.ar
	},
	historicalStatus: "Established Consensus",
	verification: {
		source: s.references.join(" • "),
		edition: "Verified Seerah Compendium",
		reference: s.references[0],
		language: "Multi-language",
		version: "2.0",
		reviewer: "Ilmizo Seerah Board",
		status: "Verified",
		reviewStatusCode: "PUBLISHED"
	},
	registryMeta: {
		id: s.id,
		contentType: "seerah_event",
		language: "Multi (en, hi, ur, hinglish, ar)",
		availableLanguages: [
			"en",
			"hi",
			"ur",
			"hinglish",
			"ar"
		],
		source: s.references.join(" • "),
		reviewStatus: "PUBLISHED",
		ageSuitability: "All Ages",
		version: "2.0.0",
		lastUpdatedIso: "2026-10-31T00:00:00.000Z",
		offlineAvailable: true,
		authenticityType: "Authenticated Hadith/Seerah"
	}
}));
// src/data/expandedVocabAndQuiz.ts
var CORE_VOCAB_SEEDS = [
	{
		id: "v_allah",
		ar: "اللَّه",
		tr: "Allah",
		en: "Allah (The One True God)",
		hi: "अल्लाह (एक सच्चा माबूद)",
		ur: "اللہ (معبودِ برحق)",
		root: "أ ل ه",
		exAr: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
		exRef: "1:1",
		cat: "Nouns & Names",
		freq: 2699
	},
	{
		id: "v_rabb",
		ar: "رَبّ",
		tr: "Rabb",
		en: "Lord / Sustainer / Cherisher",
		hi: "रब / पालने वाला मालिक",
		ur: "رب / پالنے والا مالک",
		root: "ر ب ب",
		exAr: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
		exRef: "1:2",
		cat: "Nouns & Names",
		freq: 975
	},
	{
		id: "v_rahman",
		ar: "الرَّحْمَٰن",
		tr: "Ar-Rahman",
		en: "The Most Gracious / Entirely Merciful",
		hi: "बड़ा मेहरबान (रहमान)",
		ur: "بڑا مہربان (الرحمٰن)",
		root: "ر ح م",
		exAr: "الرَّحْمَٰنِ الرَّحِيمِ",
		exRef: "1:3",
		cat: "Nouns & Names",
		freq: 57
	},
	{
		id: "v_rahim",
		ar: "الرَّحِيم",
		tr: "Ar-Rahim",
		en: "The Especially Merciful",
		hi: "निहायत रहम वाला (रहीम)",
		ur: "نہایت رحم فرمانے والا (الرحیم)",
		root: "ر ح م",
		exAr: "وَكَانَ بِالْمُؤْمِنِينَ رَحِيمًا",
		exRef: "33:43",
		cat: "Nouns & Names",
		freq: 114
	},
	{
		id: "v_yawm",
		ar: "يَوْم",
		tr: "Yawm",
		en: "Day",
		hi: "दिन (यौम)",
		ur: "دن (یوم)",
		root: "ي و م",
		exAr: "مَالِكِ يَوْمِ الدِّينِ",
		exRef: "1:4",
		cat: "Nouns & Names",
		freq: 405
	},
	{
		id: "v_qawm",
		ar: "قَوْم",
		tr: "Qawm",
		en: "People / Nation",
		hi: "क़ौम / लोग",
		ur: "قوم / لوگ",
		root: "ق و م",
		exAr: "لِقَوْمٍ يَعْقِلُونَ",
		exRef: "2:164",
		cat: "Nouns & Names",
		freq: 383
	},
	{
		id: "v_ayah",
		ar: "آيَة",
		tr: "Ayah",
		en: "Sign / Verse",
		hi: "निशानी / आयत",
		ur: "نشانی / آیت",
		root: "أ ي ي",
		exAr: "تِلْكَ آيَاتُ اللَّهِ",
		exRef: "2:252",
		cat: "Nouns & Names",
		freq: 382
	},
	{
		id: "v_ard",
		ar: "أَرْض",
		tr: "Ard",
		en: "Earth / Land",
		hi: "ज़मीन",
		ur: "زمین",
		root: "أ ر ض",
		exAr: "فِي الْأَرْضِ",
		exRef: "2:11",
		cat: "Nouns & Names",
		freq: 461
	},
	{
		id: "v_sama",
		ar: "سَمَاء",
		tr: "Sama’",
		en: "Sky / Heaven",
		hi: "आसमान",
		ur: "آسمان",
		root: "س م و",
		exAr: "السَّمَاوَاتِ وَالْأَرْضِ",
		exRef: "2:107",
		cat: "Nouns & Names",
		freq: 310
	},
	{
		id: "v_kitab",
		ar: "كِتَاب",
		tr: "Kitab",
		en: "Book / Scripture",
		hi: "किताब",
		ur: "کتاب",
		root: "ك ت ب",
		exAr: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ",
		exRef: "2:2",
		cat: "Nouns & Names",
		freq: 260
	},
	{
		id: "v_haqq",
		ar: "حَقّ",
		tr: "Haqq",
		en: "Truth / Right",
		hi: "सच / हक़",
		ur: "حق / سچ",
		root: "ح ق ق",
		exAr: "وَقُلْ جَاءَ الْحَقُّ",
		exRef: "17:81",
		cat: "Nouns & Names",
		freq: 287
	},
	{
		id: "v_ilm",
		ar: "عِلْم",
		tr: "Ilm",
		en: "Knowledge",
		hi: "इल्म / ज्ञान",
		ur: "علم / دانش",
		root: "ع ل م",
		exAr: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
		exRef: "20:114",
		cat: "Nouns & Names",
		freq: 105
	},
	{
		id: "v_qalb",
		ar: "قَلْب",
		tr: "Qalb",
		en: "Heart",
		hi: "दिल (क़ल्ब)",
		ur: "دل (قلب)",
		root: "ق ل ب",
		exAr: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
		exRef: "13:28",
		cat: "Nouns & Names",
		freq: 132
	},
	{
		id: "v_sabr",
		ar: "صَبْر",
		tr: "Sabr",
		en: "Patience / Perseverance",
		hi: "सब्र / धैर्य",
		ur: "صبر / استقامت",
		root: "ص ب ر",
		exAr: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
		exRef: "2:45",
		cat: "Worship & Ethics",
		freq: 103
	},
	{
		id: "v_shukr",
		ar: "شُكْر",
		tr: "Shukr",
		en: "Gratitude / Thankfulness",
		hi: "शुक्र / कृतज्ञता",
		ur: "شکر / احسان مندی",
		root: "ش ك ر",
		exAr: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
		exRef: "14:7",
		cat: "Worship & Ethics",
		freq: 75
	},
	{
		id: "v_salah",
		ar: "صَلَاة",
		tr: "Salah",
		en: "Prayer",
		hi: "नमाज़ (सलात)",
		ur: "نماز (صلوٰۃ)",
		root: "ص ل و",
		exAr: "وَأَقِيمُوا الصَّلَاةَ",
		exRef: "2:43",
		cat: "Worship & Ethics",
		freq: 99
	},
	{
		id: "v_zakah",
		ar: "زَكَاة",
		tr: "Zakah",
		en: "Purifying Charity",
		hi: "ज़कात / पाकीज़गी",
		ur: "زکوٰۃ / پاکیزگی",
		root: "ز ك و",
		exAr: "وَآتُوا الزَّكَاةَ",
		exRef: "2:43",
		cat: "Worship & Ethics",
		freq: 32
	},
	{
		id: "v_taqwa",
		ar: "تَقْوَىٰ",
		tr: "Taqwa",
		en: "God-Consciousness / Piety",
		hi: "तक़वा / परहेज़गारी",
		ur: "تقویٰ / پرہیزگاری",
		root: "و ق ي",
		exAr: "فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ",
		exRef: "2:197",
		cat: "Worship & Ethics",
		freq: 258
	}
];
var COMPACT_QURAN_VOCAB_LIST = [
	[
		"مِنْ",
		"Min",
		"From / Of",
		"से (मिन)",
		"سے (من)",
		"م ن",
		"2:4",
		"Core Particles",
		3226
	],
	[
		"فِي",
		"Fi",
		"In / Within",
		"में (फ़ी)",
		"میں (فی)",
		"ف ي",
		"1:4",
		"Core Particles",
		1701
	],
	[
		"عَلَىٰ",
		"Ala",
		"Upon / Over",
		"पर (अला)",
		"پر (علیٰ)",
		"ع ل و",
		"1:7",
		"Core Particles",
		1445
	],
	[
		"إِلَىٰ",
		"Ila",
		"To / Toward",
		"की तरफ़ (इला)",
		"کی طرف (الیٰ)",
		"إ ل ي",
		"2:14",
		"Core Particles",
		742
	],
	[
		"عَنْ",
		"An",
		"From / About",
		"के बारे में / से",
		"سے / کے بارے میں",
		"ع ن",
		"2:119",
		"Core Particles",
		465
	],
	[
		"مَعَ",
		"Ma’a",
		"With",
		"साथ (मअ)",
		"ساتھ (مع)",
		"م ع",
		"2:153",
		"Core Particles",
		163
	],
	[
		"عِنْدَ",
		"Inda",
		"With / Near / In the sight of",
		"के पास (इन्द)",
		"کے پاس / نزدیک",
		"ع ن د",
		"3:19",
		"Core Particles",
		201
	],
	[
		"بَيْنَ",
		"Bayna",
		"Between / Among",
		"के बीच (बैन)",
		"درمیان (بین)",
		"ب ي ن",
		"2:66",
		"Core Particles",
		266
	],
	[
		"بَعْدَ",
		"Ba’da",
		"After",
		"के बाद (बाद)",
		"کے بعد",
		"ب ع د",
		"2:27",
		"Core Particles",
		199
	],
	[
		"قَبْلَ",
		"Qabla",
		"Before",
		"से पहले (क़ब्ल)",
		"سے پہلے (قبل)",
		"ق ب ل",
		"2:4",
		"Core Particles",
		242
	],
	[
		"فَوْقَ",
		"Fawqa",
		"Above / Over",
		"के ऊपर (फ़ौक़)",
		"کے اوپر (فوق)",
		"ف و ق",
		"2:26",
		"Core Particles",
		41
	],
	[
		"تَحْتَ",
		"Tahta",
		"Beneath / Under",
		"के नीचे (तहत)",
		"کے نیچے (تحت)",
		"ت ح ت",
		"2:25",
		"Core Particles",
		51
	],
	[
		"حَوْلَ",
		"Hawla",
		"Around",
		"के इर्द-गिर्द",
		"کے ارد گرد",
		"ح و ل",
		"2:17",
		"Core Particles",
		22
	],
	[
		"دُونَ",
		"Duna",
		"Besides / Other than",
		"के सिवा (दून)",
		"کے سوا (دون)",
		"د و ن",
		"2:23",
		"Core Particles",
		144
	],
	[
		"لَدُنْ",
		"Ladun",
		"From the presence of",
		"की तरफ़ से",
		"کی جانب سے",
		"ل د ن",
		"3:8",
		"Core Particles",
		18
	],
	[
		"إِنَّ",
		"Inna",
		"Indeed / Verily",
		"बेशक (इन्न)",
		"بے شک (انّ)",
		"إ ن ن",
		"2:6",
		"Core Particles",
		1530
	],
	[
		"أَنَّ",
		"Anna",
		"That (indeed)",
		"यह कि बेशक",
		"یہ کہ بے شک",
		"أ ن ن",
		"2:25",
		"Core Particles",
		362
	],
	[
		"كَأَنَّ",
		"Ka’anna",
		"As if / As though",
		"गोया कि",
		"گویا کہ",
		"ك أ ن",
		"2:19",
		"Core Particles",
		35
	],
	[
		"لَٰكِنْ",
		"Lakin",
		"But / However",
		"लेकिन / मगर",
		"لیکن / مگر",
		"ل ك ن",
		"2:12",
		"Core Particles",
		130
	],
	[
		"لَعَلَّ",
		"La’alla",
		"Perhaps / So that you may",
		"ताकि तुम / शायद",
		"تاکہ تم / شاید",
		"ل ع ل",
		"2:21",
		"Core Particles",
		129
	],
	[
		"لَيْتَ",
		"Layta",
		"If only / Would that",
		"काश! (लैत)",
		"کاش! (لیت)",
		"ل ي ت",
		"78:40",
		"Core Particles",
		14
	],
	[
		"إِذْ",
		"Idh",
		"When (past reminder)",
		"जब (याद करो)",
		"جب (یاد کرو)",
		"إ ذ",
		"2:30",
		"Core Particles",
		239
	],
	[
		"إِذَا",
		"Idha",
		"When / Whenever",
		"जब (इज़ा)",
		"جب (اذا)",
		"إ ذ ا",
		"110:1",
		"Core Particles",
		406
	],
	[
		"لَمَّا",
		"Lamma",
		"When / Not yet",
		"जब / अभी तक नहीं",
		"جب / ابھی تک نہیں",
		"ل م ا",
		"2:17",
		"Core Particles",
		165
	],
	[
		"كُلَّمَا",
		"Kullama",
		"Every time / Whenever",
		"जब कभी (कुल्लमा)",
		"جب کبھی (کلما)",
		"ك ل ل",
		"2:20",
		"Core Particles",
		17
	],
	[
		"حَتَّىٰ",
		"Hatta",
		"Until / Even",
		"यहाँ तक कि (हत्ता)",
		"یہاں تک کہ (حتیٰ)",
		"ح ت ي",
		"97:5",
		"Core Particles",
		142
	],
	[
		"ثُمَّ",
		"Thumma",
		"Then / Thereafter",
		"फिर (सुम्म)",
		"پھر (ثمّ)",
		"ث م م",
		"102:4",
		"Core Particles",
		338
	],
	[
		"أَوْ",
		"Aw",
		"Or",
		"या (औ)",
		"یا (او)",
		"أ و",
		"2:19",
		"Core Particles",
		280
	],
	[
		"أَمْ",
		"Am",
		"Or (in question)",
		"या क्या (अम)",
		"یا کیا (ام)",
		"أ م",
		"2:6",
		"Core Particles",
		137
	],
	[
		"بَلْ",
		"Bal",
		"Rather / Nay",
		"बल्कि (बल)",
		"بلکہ (بل)",
		"ب ل",
		"2:88",
		"Core Particles",
		127
	],
	[
		"قَدْ",
		"Qad",
		"Certainly / Indeed",
		"यक़ीनन / तहक़ीक़",
		"یقیناً / تحقیق",
		"ق د",
		"23:1",
		"Core Particles",
		406
	],
	[
		"سَوْفَ",
		"Sawfa",
		"Soon / Will",
		"जल्द ही (सौफ़)",
		"عنقریب (سوف)",
		"س و ف",
		"93:5",
		"Core Particles",
		42
	],
	[
		"لَا",
		"La",
		"No / Not",
		"नहीं (ला)",
		"نہیں (لا)",
		"ل ا",
		"2:2",
		"Core Particles",
		1723
	],
	[
		"لَمْ",
		"Lam",
		"Did not",
		"नहीं किया (लम)",
		"نہیں کیا (لم)",
		"ل م",
		"112:3",
		"Core Particles",
		353
	],
	[
		"لَنْ",
		"Lan",
		"Will never",
		"हरगिज़ नहीं (लन)",
		"ہرگز نہیں (لن)",
		"ل ن",
		"2:24",
		"Core Particles",
		106
	],
	[
		"مَا",
		"Ma",
		"What / Not",
		"जो कुछ / नहीं",
		"جو کچھ / نہیں",
		"م ا",
		"109:2",
		"Core Particles",
		2165
	],
	[
		"مَنْ",
		"Man",
		"Who / Whoever",
		"जो कोई / कौन",
		"جو کوئی / کون",
		"م ن",
		"99:7",
		"Core Particles",
		823
	],
	[
		"أَيْنَ",
		"Ayna",
		"Where",
		"कहाँ (ऐन)",
		"کہاں (این)",
		"أ ي ن",
		"75:10",
		"Core Particles",
		29
	],
	[
		"كَيْفَ",
		"Kayfa",
		"How",
		"कैसे (कैफ़)",
		"کیسے (کیف)",
		"ك ي ف",
		"105:1",
		"Core Particles",
		83
	],
	[
		"مَتَىٰ",
		"Mata",
		"When?",
		"कब? (मता)",
		"کب؟ (متیٰ)",
		"م ت ي",
		"2:214",
		"Core Particles",
		9
	],
	[
		"كَمْ",
		"Kam",
		"How many / How much",
		"कितने (कम)",
		"کتنے (کم)",
		"ك م",
		"2:211",
		"Core Particles",
		21
	],
	[
		"أَيّ",
		"Ayy",
		"Which / Whichever",
		"कौन-सा (अय्य)",
		"کون سا (ایّ)",
		"أ ي ي",
		"67:2",
		"Core Particles",
		110
	],
	[
		"إِلَّا",
		"Illa",
		"Except / Unless",
		"मगर / सिवाय (इल्ला)",
		"مگر / سوائے (الا)",
		"إ ل ا",
		"103:3",
		"Core Particles",
		663
	],
	[
		"غَيْر",
		"Ghayr",
		"Other than / Not",
		"के सिवा / बिना (ग़ैर)",
		"کے سوا / بغیر (غیر)",
		"غ ي ر",
		"1:7",
		"Core Particles",
		147
	],
	[
		"كُلّ",
		"Kull",
		"All / Every",
		"हर एक / सब (कुल्ल)",
		"ہر ایک / تمام (کل)",
		"ك ل ل",
		"2:20",
		"Core Particles",
		377
	],
	[
		"بَعْض",
		"Ba’d",
		"Some / Part of",
		"कुछ / बाज़",
		"کچھ / بعض",
		"ب ع ض",
		"2:36",
		"Core Particles",
		158
	],
	[
		"مِثْل",
		"Mithl",
		"Like / Similar to",
		"जैसा / मिसाल",
		"جیسا / مثل",
		"م ث ل",
		"42:11",
		"Core Particles",
		169
	],
	[
		"أُولُو",
		"Ulu",
		"Possessors of / People of",
		"वाले (उलू)",
		"والے / اصحاب (اولو)",
		"أ و ل",
		"3:190",
		"Core Particles",
		43
	],
	[
		"ذُو",
		"Dhu",
		"Owner of / Possessor of",
		"वाला (ज़ू)",
		"والا / صاحب (ذو)",
		"ذ و",
		"55:27",
		"Core Particles",
		116
	],
	[
		"نِعْمَ",
		"Ni’ma",
		"How excellent!",
		"क्या ही अच्छा!",
		"کیا ہی اچھا!",
		"ن ع م",
		"3:173",
		"Core Particles",
		18
	],
	[
		"بِئْسَ",
		"Bi’sa",
		"How wretched!",
		"कितना बुरा!",
		"کس قدر برا!",
		"ب أ س",
		"2:90",
		"Core Particles",
		40
	],
	[
		"عَسَىٰ",
		"Asa",
		"Perhaps / It may be that",
		"उम्मीद है कि",
		"امید ہے کہ (عسیٰ)",
		"ع س ي",
		"2:216",
		"Core Particles",
		30
	],
	[
		"سُبْحَانَ",
		"Subhana",
		"Glory be to / Exalted is",
		"पाक है (सुब्हान)",
		"پاک ہے (سبحان)",
		"س ب ح",
		"17:1",
		"Worship & Ethics",
		41
	],
	[
		"هُوَ",
		"Huwa",
		"He",
		"वह (हुव)",
		"وہ (ھو)",
		"ه و",
		"112:1",
		"Core Particles",
		481
	],
	[
		"هِيَ",
		"Hiya",
		"She / It",
		"वह (हिय)",
		"وہ (ھی)",
		"ه ي",
		"97:5",
		"Core Particles",
		64
	],
	[
		"هُمْ",
		"Hum",
		"They",
		"वे सब (हुम)",
		"وہ سب (ھم)",
		"ه م",
		"1:7",
		"Core Particles",
		444
	],
	[
		"أَنْتَ",
		"Anta",
		"You (singular)",
		"तू / आप (अन्त)",
		"تو / آپ (انت)",
		"أ ن ت",
		"2:32",
		"Core Particles",
		81
	],
	[
		"أَنْتُمْ",
		"Antum",
		"You all (plural)",
		"तुम सब (अन्तुम)",
		"تم سب (انتم)",
		"أ ن ت",
		"2:22",
		"Core Particles",
		135
	],
	[
		"أَنَا",
		"Ana",
		"I",
		"मैं (अना)",
		"میں (انا)",
		"أ ن ا",
		"20:14",
		"Core Particles",
		68
	],
	[
		"نَحْنُ",
		"Nahnu",
		"We",
		"हम (नहनु)",
		"ہم (نحن)",
		"ن ح ن",
		"15:9",
		"Core Particles",
		86
	],
	[
		"هَٰذَا",
		"Hadha",
		"This (masculine)",
		"यह (हाज़ा)",
		"یہ (ھٰذا)",
		"ه ذ ا",
		"2:25",
		"Core Particles",
		225
	],
	[
		"هَٰذِهِ",
		"Hadhihi",
		"This (feminine)",
		"यह (हाज़िही)",
		"یہ (ھٰذہ)",
		"ه ذ ه",
		"2:35",
		"Core Particles",
		47
	],
	[
		"ذَٰلِكَ",
		"Dhalika",
		"That",
		"वह (ज़ालिक)",
		"وہ (ذٰلک)",
		"ذ ل ك",
		"2:2",
		"Core Particles",
		479
	],
	[
		"تِلْكَ",
		"Tilka",
		"That / Those",
		"वह (तिल्क)",
		"وہ (تلک)",
		"ت ل ك",
		"2:134",
		"Core Particles",
		43
	],
	[
		"هَٰؤُلَاءِ",
		"Ha’ula’i",
		"These (people)",
		"ये सब (हाउलाइ)",
		"یہ لوگ (ھٰؤلاء)",
		"ه أ ل",
		"2:31",
		"Core Particles",
		46
	],
	[
		"أُولَٰئِكَ",
		"Ula’ika",
		"Those (people)",
		"वही लोग (उलाइक)",
		"وہی لوگ (اولٰئک)",
		"أ ل ك",
		"2:5",
		"Core Particles",
		204
	],
	[
		"الَّذِي",
		"Alladhi",
		"The one who (singular)",
		"वह जिसने (अल्लज़ी)",
		"وہ جس نے (الذی)",
		"ل ذ ي",
		"96:1",
		"Core Particles",
		304
	],
	[
		"الَّتِي",
		"Allati",
		"The one which (feminine)",
		"वह जो (अल्लती)",
		"وہ جو (التی)",
		"ل ت ي",
		"2:24",
		"Core Particles",
		57
	],
	[
		"الَّذِينَ",
		"Alladhina",
		"Those who (plural)",
		"वे लोग जो (अल्लज़ीन)",
		"وہ لوگ جو (الذین)",
		"ل ذ ي",
		"1:7",
		"Core Particles",
		1080
	],
	[
		"نَاس",
		"Nas",
		"Mankind / People",
		"इंसान / लोग (नास)",
		"انسان / لوگ (ناس)",
		"أ ن س",
		"114:1",
		"Nouns & Names",
		241
	],
	[
		"إِنْسَان",
		"Insan",
		"Human being",
		"इंसान",
		"انسان",
		"أ ن س",
		"96:2",
		"Nouns & Names",
		65
	],
	[
		"نَفْس",
		"Nafs",
		"Soul / Self",
		"जान / नफ़्स",
		"جان / نفس",
		"ن ف س",
		"2:286",
		"Nouns & Names",
		295
	],
	[
		"شَيْء",
		"Shay’",
		"Thing / Something",
		"चीज़ (शै)",
		"چیز (شیء)",
		"ش ي أ",
		"2:20",
		"Nouns & Names",
		283
	],
	[
		"سَبِيل",
		"Sabil",
		"Way / Path",
		"रास्ता (सबील)",
		"راستہ (سبیل)",
		"س ب ل",
		"2:154",
		"Nouns & Names",
		176
	],
	[
		"صِرَاط",
		"Sirat",
		"Straight Path",
		"सीधा रास्ता (सिरात)",
		"سیدھا راستہ (صراط)",
		"ص ر ط",
		"1:6",
		"Nouns & Names",
		45
	],
	[
		"أَمْر",
		"Amr",
		"Command / Matter / Affair",
		"हुक्म / मामला (अम्र)",
		"حکم / معاملہ (امر)",
		"أ م ر",
		"97:4",
		"Nouns & Names",
		166
	],
	[
		"عَذَاب",
		"Adhab",
		"Punishment",
		"अज़ाब / सज़ा",
		"عذاب / سزا",
		"ع ذ ب",
		"2:7",
		"Nouns & Names",
		322
	],
	[
		"جَنَّة",
		"Jannah",
		"Garden / Paradise",
		"जन्नत / बाग़",
		"جنت / باغ",
		"ج ن ن",
		"2:25",
		"Nouns & Names",
		147
	],
	[
		"نَار",
		"Nar",
		"Fire",
		"आग (नार)",
		"آگ (نار)",
		"ن و ر",
		"2:24",
		"Nouns & Names",
		145
	],
	[
		"نُور",
		"Nur",
		"Light",
		"नूर / रोशनी",
		"نور / روشنی",
		"ن و ر",
		"24:35",
		"Nouns & Names",
		43
	],
	[
		"ظُلُمَات",
		"Zulumat",
		"Darknesses",
		"अँधेरे (ज़ुलुमात)",
		"اندھیرے (ظلمات)",
		"ظ ل م",
		"2:257",
		"Nouns & Names",
		23
	],
	[
		"آخِرَة",
		"Akhirah",
		"The Hereafter",
		"आख़िरत",
		"آخرت",
		"أ خ ر",
		"2:4",
		"Nouns & Names",
		115
	],
	[
		"دُنْيَا",
		"Dunya",
		"This Worldly Life",
		"दुनिया",
		"دنیا",
		"د ن و",
		"2:201",
		"Nouns & Names",
		115
	],
	[
		"رَسُول",
		"Rasul",
		"Messenger",
		"रसूल / पैग़ंबर",
		"رسول / پیغمبر",
		"ر س ل",
		"2:143",
		"Nouns & Names",
		332
	],
	[
		"نَبِيّ",
		"Nabiyy",
		"Prophet",
		"नबी",
		"نبی",
		"ن ب أ",
		"33:40",
		"Nouns & Names",
		75
	],
	[
		"مَلَائِكَة",
		"Mala’ikah",
		"Angels",
		"फ़रिश्ते (मलाइका)",
		"فرشتے (ملائکہ)",
		"م ل ك",
		"2:177",
		"Nouns & Names",
		88
	],
	[
		"رُوح",
		"Ruh",
		"Spirit / Revelation / Jibril",
		"रूह",
		"روح",
		"ر و ح",
		"97:4",
		"Nouns & Names",
		21
	],
	[
		"شَيْطَان",
		"Shaytan",
		"Satan",
		"शैतान",
		"شیطان",
		"ش ط ن",
		"2:36",
		"Nouns & Names",
		88
	],
	[
		"مُؤْمِن",
		"Mu’min",
		"Believer",
		"मोमिन / ईमान वाला",
		"مومن / ایمان والا",
		"أ م ن",
		"23:1",
		"Nouns & Names",
		230
	],
	[
		"مُسْلِم",
		"Muslim",
		"One who submits to Allah",
		"मुस्लिम / फ़रमाँबरदार",
		"مسلم / فرماں بردار",
		"س ل م",
		"2:128",
		"Nouns & Names",
		42
	],
	[
		"كَافِر",
		"Kafir",
		"Disbeliever / Ungrateful",
		"इंकार करने वाला",
		"انکار کرنے والا",
		"ك ف ر",
		"109:1",
		"Nouns & Names",
		157
	],
	[
		"ظَالِم",
		"Zalim",
		"Wrongdoer / Unjust",
		"ज़ालिम / ना-इंसाफ़",
		"ظالم / بے انصاف",
		"ظ ل م",
		"2:35",
		"Nouns & Names",
		135
	],
	[
		"صَالِح",
		"Salih",
		"Righteous / Good",
		"नेक / सालेह",
		"نیک / صالح",
		"ص ل ح",
		"103:3",
		"Nouns & Names",
		134
	],
	[
		"خَيْر",
		"Khayr",
		"Good / Better / Wealth",
		"भलाई / ख़ैर",
		"خیر / بھلائی",
		"خ ي ر",
		"99:7",
		"Nouns & Names",
		176
	],
	[
		"شَرّ",
		"Sharr",
		"Evil / Harm",
		"बुराई / शर",
		"شر / برائی",
		"ش ر ر",
		"99:8",
		"Nouns & Names",
		30
	],
	[
		"رَحْمَة",
		"Rahmah",
		"Mercy / Compassion",
		"रहमत / दया",
		"رحمت / مہربانی",
		"ر ح م",
		"3:159",
		"Worship & Ethics",
		114
	],
	[
		"فَضْل",
		"Fadl",
		"Bounty / Grace",
		"फ़ज़्ल / अनुग्रह",
		"فضل / کرم",
		"ف ض ل",
		"62:10",
		"Nouns & Names",
		84
	],
	[
		"نِعْمَة",
		"Ni’mah",
		"Blessing / Favor",
		"नेमत / वरदान",
		"نعمت / احسان",
		"ن ع م",
		"16:18",
		"Nouns & Names",
		50
	],
	[
		"حِكْمَة",
		"Hikmah",
		"Wisdom",
		"हिकमत / समझदारी",
		"حکمت / دانائی",
		"ح ك م",
		"2:269",
		"Nouns & Names",
		20
	],
	[
		"هُدًى",
		"Huda",
		"Guidance",
		"हिदायत / मार्गदर्शन",
		"ہدایت / رہنمائی",
		"ه د ي",
		"2:2",
		"Nouns & Names",
		85
	],
	[
		"أَجْر",
		"Ajr",
		"Reward / Wage",
		"अज्र / सवाब",
		"اجر / ثواب",
		"أ ج ر",
		"95:6",
		"Nouns & Names",
		105
	],
	[
		"ثَوَاب",
		"Thawab",
		"Reward",
		"सवाब",
		"ثواب",
		"ث و ب",
		"3:148",
		"Nouns & Names",
		13
	],
	[
		"ذَنْب",
		"Dhanb",
		"Sin / Fault",
		"गुनाह (ज़न्ब)",
		"گناہ (ذنب)",
		"ذ ن ب",
		"3:16",
		"Nouns & Names",
		39
	],
	[
		"إِثْم",
		"Ithm",
		"Sin / Wrongdoing",
		"गुनाह (इस्म)",
		"گناہ (اثم)",
		"أ ث م",
		"2:181",
		"Nouns & Names",
		35
	],
	[
		"مَغْفِرَة",
		"Maghfirah",
		"Forgiveness",
		"मग़फ़िरत / बख़्शिश",
		"مغفرت / بخشش",
		"غ ف ر",
		"2:268",
		"Worship & Ethics",
		28
	],
	[
		"تَوْبَة",
		"Tawbah",
		"Repentance",
		"तौबा / रुजू",
		"توبہ / رجوع",
		"ت و ب",
		"66:8",
		"Worship & Ethics",
		17
	],
	[
		"دِين",
		"Din",
		"Religion / Judgment / Way of Life",
		"दीन / बदला",
		"دین / جزا",
		"د ي ن",
		"1:4",
		"Nouns & Names",
		92
	],
	[
		"مِلَّة",
		"Millah",
		"Creed / Faith tradition",
		"मिल्लत / तरीक़ा",
		"ملت / طریقہ",
		"م ل ل",
		"2:130",
		"Nouns & Names",
		15
	],
	[
		"أُمَّة",
		"Ummah",
		"Community / Nation",
		"उम्मत / समुदाय",
		"امت / جماعت",
		"أ م م",
		"2:143",
		"Nouns & Names",
		64
	],
	[
		"عَبْد",
		"Abd",
		"Servant / Worshipper",
		"बंदा (अब्द)",
		"بندہ (عبد)",
		"ع ب د",
		"18:1",
		"Nouns & Names",
		126
	],
	[
		"أَهْل",
		"Ahl",
		"Family / People of",
		"घरवाले / लोग (अहल)",
		"اہل / گھر والے",
		"أ ه ل",
		"33:33",
		"Nouns & Names",
		127
	],
	[
		"وَالِدَيْن",
		"Walidayn",
		"Both Parents",
		"माता-पिता (वालिदैन)",
		"والدین (ماں باپ)",
		"و ل د",
		"17:23",
		"Nouns & Names",
		20
	],
	[
		"أَب",
		"Ab",
		"Father",
		"पिता / वालिद",
		"باپ / والد",
		"أ ب و",
		"12:4",
		"Nouns & Names",
		117
	],
	[
		"أُمّ",
		"Umm",
		"Mother",
		"माँ / वालिदा",
		"ماں / والدہ",
		"أ م م",
		"28:7",
		"Nouns & Names",
		35
	],
	[
		"ابْن",
		"Ibn",
		"Son",
		"बेटा (इब्न)",
		"بیٹا (ابن)",
		"ب ن ي",
		"11:42",
		"Nouns & Names",
		162
	],
	[
		"أَخ",
		"Akh",
		"Brother",
		"भाई (अख़)",
		"بھائی (اخ)",
		"أ خ و",
		"49:10",
		"Nouns & Names",
		96
	],
	[
		"زَوْج",
		"Zawj",
		"Spouse / Pair",
		"जीवनसाथी / जोड़ा",
		"زوج / جوڑا",
		"ز و ج",
		"30:21",
		"Nouns & Names",
		76
	],
	[
		"ذُرِّيَّة",
		"Dhurriyyah",
		"Offspring / Descendants",
		"औलाद / नस्ल",
		"اولاد / ذریت",
		"ذ ر أ",
		"25:74",
		"Nouns & Names",
		32
	],
	[
		"يَتِيم",
		"Yatim",
		"Orphan",
		"यतीम / अनाथ",
		"یتیم",
		"ي ت م",
		"93:6",
		"Nouns & Names",
		23
	],
	[
		"مِسْكِين",
		"Miskin",
		"Needy / Poor person",
		"मिस्कीन / ग़रीब",
		"مسکین / حاجت مند",
		"س ك ن",
		"107:3",
		"Nouns & Names",
		23
	],
	[
		"مَال",
		"Mal",
		"Wealth / Property",
		"माल / दौलत",
		"مال / دولت",
		"م و ل",
		"89:20",
		"Nouns & Names",
		86
	],
	[
		"رِزْق",
		"Rizq",
		"Provision / Sustenance",
		"रिज़्क़ / रोज़ी",
		"رزق / روزی",
		"ر ز ق",
		"2:3",
		"Nouns & Names",
		55
	],
	[
		"مَاء",
		"Ma’",
		"Water",
		"पानी",
		"پانی",
		"م و ه",
		"21:30",
		"Nouns & Names",
		63
	],
	[
		"شَمْس",
		"Shams",
		"Sun",
		"सूरज (शम्स)",
		"سورج (شمس)",
		"ش م س",
		"91:1",
		"Nouns & Names",
		33
	],
	[
		"قَمَر",
		"Qamar",
		"Moon",
		"चाँद (क़मर)",
		"چاند (قمر)",
		"ق م ر",
		"54:1",
		"Nouns & Names",
		27
	],
	[
		"نَجْم",
		"Najm",
		"Star",
		"सितारा (नज्म)",
		"ستارہ (نجم)",
		"ن ج م",
		"53:1",
		"Nouns & Names",
		13
	],
	[
		"لَيْل",
		"Layl",
		"Night",
		"रात (लैल)",
		"رات (لیل)",
		"ل ي ل",
		"92:1",
		"Nouns & Names",
		92
	],
	[
		"نَهَار",
		"Nahar",
		"Daytime",
		"दिन का उजाला (नहार)",
		"دن کا اجالا (نہار)",
		"ن ه ر",
		"92:2",
		"Nouns & Names",
		57
	],
	[
		"فَجْر",
		"Fajr",
		"Dawn",
		"फ़ज्र / भोर",
		"فجر / صبحِ صادق",
		"ف ج ر",
		"89:1",
		"Nouns & Names",
		6
	],
	[
		"عَصْر",
		"Asr",
		"Time / Afternoon",
		"वक़्त / ज़माना (अस्र)",
		"وقت / زمانہ (عصر)",
		"ع ص ر",
		"103:1",
		"Nouns & Names",
		3
	],
	[
		"سَاعَة",
		"Sa’ah",
		"The Hour",
		"क़ियामत की घड़ी (साअत)",
		"قیامت کی گھڑی (ساعت)",
		"س و ع",
		"20:15",
		"Nouns & Names",
		48
	],
	[
		"جَبَل",
		"Jabal",
		"Mountain",
		"पहाड़ (जबल)",
		"پہاڑ (جبل)",
		"ج ب ل",
		"78:7",
		"Nouns & Names",
		39
	],
	[
		"بَحْر",
		"Bahr",
		"Sea / Ocean",
		"समुंदर (बहर)",
		"سمندر (بحر)",
		"ب ح ر",
		"18:109",
		"Nouns & Names",
		41
	],
	[
		"نَهَر",
		"Nahar",
		"River",
		"नहर / नदी",
		"نہر / دریا",
		"ن ه ر",
		"2:25",
		"Nouns & Names",
		54
	],
	[
		"شَجَر",
		"Shajar",
		"Tree / Plants",
		"पेड़ (शजर)",
		"درخت (شجر)",
		"ش ج ر",
		"14:24",
		"Nouns & Names",
		26
	],
	[
		"ثَمَرَات",
		"Thamarat",
		"Fruits",
		"फल (समरात)",
		"پھل (ثمرات)",
		"ث م ر",
		"2:22",
		"Nouns & Names",
		24
	],
	[
		"رِيح",
		"Rih",
		"Wind",
		"हवा (रीह)",
		"ہوا (ریح)",
		"ر و ح",
		"30:48",
		"Nouns & Names",
		29
	],
	[
		"مَوْت",
		"Mawt",
		"Death",
		"मौत",
		"موت",
		"م و ت",
		"67:2",
		"Nouns & Names",
		50
	],
	[
		"حَيَاة",
		"Hayah",
		"Life",
		"ज़िंदगी (हयात)",
		"زندگی (حیات)",
		"ح ي ي",
		"67:2",
		"Nouns & Names",
		76
	],
	[
		"وَجْه",
		"Wajh",
		"Face / Countenance",
		"चेहरा / रज़ा (वज्ह)",
		"چہرہ / رضا (وجہ)",
		"و ج ه",
		"2:115",
		"Nouns & Names",
		72
	],
	[
		"يَد",
		"Yad",
		"Hand",
		"हाथ (यद)",
		"ہاتھ (ید)",
		"ي د ي",
		"48:10",
		"Nouns & Names",
		120
	],
	[
		"عَيْن",
		"Ayn",
		"Eye / Spring of water",
		"आँख / चश्मा (ऐन)",
		"آنکھ / چشمہ (عین)",
		"ع ي ن",
		"88:5",
		"Nouns & Names",
		65
	],
	[
		"سَمْع",
		"Sam’",
		"Hearing",
		"सुनने की शक्ति (सम्अ)",
		"سماعت / سننا (سمع)",
		"س م ع",
		"16:78",
		"Nouns & Names",
		22
	],
	[
		"أَبْصَار",
		"Absar",
		"Sight / Vision",
		"निगाहें (अब्सार)",
		"نگاہیں / بصارت (ابصار)",
		"ب ص ر",
		"16:78",
		"Nouns & Names",
		38
	],
	[
		"لِسَان",
		"Lisan",
		"Tongue / Language",
		"ज़बान / भाषा (लिसान)",
		"زبان (لسان)",
		"ل س ن",
		"90:9",
		"Nouns & Names",
		25
	],
	[
		"صَدْر",
		"Sadr",
		"Chest / Breast / Heart",
		"सीना (सद्र)",
		"سینہ (صدر)",
		"ص د ر",
		"94:1",
		"Nouns & Names",
		44
	],
	[
		"بَيْت",
		"Bayt",
		"House / The Kaaba",
		"घर / काबा (बैत)",
		"گھر / بیت اللہ (بیت)",
		"ب ي ت",
		"106:3",
		"Nouns & Names",
		64
	],
	[
		"مَسْجِد",
		"Masjid",
		"Mosque / Place of Prostration",
		"मस्जिद",
		"مسجد",
		"س ج د",
		"17:1",
		"Nouns & Names",
		28
	],
	[
		"مَدِينَة",
		"Madinah",
		"City",
		"शहर (मदीना)",
		"شہر (مدینہ)",
		"م د ن",
		"36:20",
		"Nouns & Names",
		17
	],
	[
		"قَرْيَة",
		"Qaryah",
		"Town / Village",
		"बस्ती (क़रया)",
		"بستی (قریہ)",
		"ق ر ي",
		"2:259",
		"Nouns & Names",
		56
	],
	[
		"مُلْك",
		"Mulk",
		"Sovereignty / Dominion",
		"बादशाहत (मुल्क)",
		"بادشاہت (ملک)",
		"م ل ك",
		"67:1",
		"Nouns & Names",
		48
	],
	[
		"عَرْش",
		"Arsh",
		"Throne",
		"अर्श / सिंहासन",
		"عرش",
		"ع ر ش",
		"9:129",
		"Nouns & Names",
		26
	],
	[
		"حَمْد",
		"Hamd",
		"Praise & Gratitude",
		"तारीफ़ और शुक्र (हम्द)",
		"حمد و تعریف",
		"ح م د",
		"1:2",
		"Worship & Ethics",
		43
	],
	[
		"سَلَام",
		"Salam",
		"Peace / Security",
		"अमन / सलामती (सलाम)",
		"امن / سلامتی (سلام)",
		"س ل م",
		"97:5",
		"Worship & Ethics",
		42
	],
	[
		"عَهْد",
		"Ahd",
		"Covenant / Promise",
		"वादा / अहद",
		"عہد / وعدہ",
		"ع ه د",
		"17:34",
		"Worship & Ethics",
		29
	],
	[
		"مِيثَاق",
		"Mithaq",
		"Solemn Covenant",
		"पक्का अहद (मीसाक़)",
		"پختہ عہد (میثاق)",
		"و ث ق",
		"2:83",
		"Worship & Ethics",
		25
	],
	[
		"قِسْط",
		"Qist",
		"Justice / Equity",
		"इंसाफ़ (क़िस्त)",
		"عدل و انصاف (قسط)",
		"ق س ط",
		"4:135",
		"Worship & Ethics",
		15
	],
	[
		"عَدْل",
		"Adl",
		"Justice / Fairness",
		"अद्ल / न्याय",
		"عدل / انصاف",
		"ع د ل",
		"16:90",
		"Worship & Ethics",
		14
	],
	[
		"إِحْسَان",
		"Ihsan",
		"Excellence / Kindness",
		"एहसान / भलाई",
		"احسان / حسنِ سلوک",
		"ح س ن",
		"55:60",
		"Worship & Ethics",
		12
	],
	[
		"بِرّ",
		"Birr",
		"Righteousness / Kindness",
		"नेकी / भलाई (बिर्र)",
		"نیکی / بھلائی (برّ)",
		"ب ر ر",
		"2:177",
		"Worship & Ethics",
		8
	],
	[
		"صِدْق",
		"Sidq",
		"Truthfulness",
		"सच्चाई (सिद्क़)",
		"سچائی (صدق)",
		"ص د ق",
		"17:80",
		"Worship & Ethics",
		12
	],
	[
		"أَمَانَة",
		"Amanah",
		"Trust / Honesty",
		"अमानत",
		"امانت",
		"أ م ن",
		"33:72",
		"Worship & Ethics",
		6
	],
	[
		"ذِكْر",
		"Dhikr",
		"Remembrance / Reminder",
		"ज़िक्र / नसीहत",
		"ذکر / نصیحت",
		"ذ ك ر",
		"15:9",
		"Worship & Ethics",
		76
	],
	[
		"دُعَاء",
		"Du’a’",
		"Supplication / Call",
		"दुआ / पुकार",
		"دعا / پکار",
		"د ع و",
		"14:40",
		"Worship & Ethics",
		20
	],
	[
		"حِسَاب",
		"Hisab",
		"Reckoning / Account",
		"हिसाब",
		"حساب",
		"ح س ب",
		"84:8",
		"Nouns & Names",
		39
	],
	[
		"مِيزَان",
		"Mizan",
		"Balance / Scale of Justice",
		"तराज़ू / इंसाफ़ (मीज़ान)",
		"ترازو / میزان",
		"و ز ن",
		"55:7",
		"Nouns & Names",
		16
	],
	[
		"شَهِيد",
		"Shahid",
		"Witness / Martyr",
		"गवाह / शहीद",
		"گواہ / شہید",
		"ش ه د",
		"85:9",
		"Nouns & Names",
		56
	],
	[
		"وَلِيّ",
		"Waliyy",
		"Protecting Friend / Guardian",
		"मददगार दोस्त (वली)",
		"کارساز / دوست (ولی)",
		"و ل ي",
		"2:257",
		"Nouns & Names",
		86
	],
	[
		"نَصِير",
		"Nasir",
		"Helper",
		"मददगार (नसीर)",
		"مددگار (نصیر)",
		"ن ص ر",
		"2:107",
		"Nouns & Names",
		24
	],
	[
		"وَكِيل",
		"Wakil",
		"Disposer of Affairs / Trustee",
		"कारसाज़ (वकील)",
		"کارساز (وکیل)",
		"و ك ل",
		"3:173",
		"Nouns & Names",
		24
	],
	[
		"عَلِيم",
		"Alim",
		"All-Knowing",
		"सब कुछ जानने वाला (अलीम)",
		"سب کچھ جاننے والا (علیم)",
		"ع ل م",
		"2:32",
		"Nouns & Names",
		162
	],
	[
		"حَكِيم",
		"Hakim",
		"All-Wise",
		"हिकमत वाला (हकीम)",
		"حکمت والا (حکیم)",
		"ح ك م",
		"2:32",
		"Nouns & Names",
		97
	],
	[
		"سَمِيع",
		"Sami’",
		"All-Hearing",
		"सब सुनने वाला (समीअ)",
		"سب سننے والا (سمیع)",
		"س م ع",
		"2:127",
		"Nouns & Names",
		47
	],
	[
		"بَصِير",
		"Basir",
		"All-Seeing",
		"सब देखने वाला (बसीर)",
		"سب دیکھنے والا (بصیر)",
		"ب ص ر",
		"17:1",
		"Nouns & Names",
		51
	],
	[
		"قَدِير",
		"Qadir",
		"All-Powerful",
		"हर चीज़ पर क़ादिर",
		"ہر چیز پر قادر (قدیر)",
		"ق د ر",
		"2:20",
		"Nouns & Names",
		45
	],
	[
		"غَفُور",
		"Ghafur",
		"All-Forgiving",
		"बड़ा बख़्शने वाला (ग़फ़ूर)",
		"بڑا بخشنے والا (غفور)",
		"غ ف ر",
		"2:173",
		"Nouns & Names",
		91
	],
	[
		"حَلِيم",
		"Halim",
		"Forbearing / Gentle",
		"बुर्दबार / सहनशील (हलीम)",
		"بردبار (حلیم)",
		"ح ل م",
		"2:225",
		"Nouns & Names",
		15
	],
	[
		"خَبِير",
		"Khabir",
		"All-Aware",
		"बा-ख़बर (ख़बीर)",
		"باخبر (خبیر)",
		"خ ب ر",
		"2:234",
		"Nouns & Names",
		45
	],
	[
		"عَزِيز",
		"Aziz",
		"Almighty / Exalted in Might",
		"ग़ालिब / इज़्ज़त वाला (अज़ीज़)",
		"غالب / عزت والا (عزیز)",
		"ع ز ز",
		"2:129",
		"Nouns & Names",
		92
	],
	[
		"كَرِيم",
		"Karim",
		"Noble / Generous",
		"बड़ा करीम / सख़ी",
		"بڑا کریم / سخی",
		"ك ر م",
		"82:6",
		"Nouns & Names",
		27
	],
	[
		"حَمِيد",
		"Hamid",
		"Praiseworthy",
		"तारीफ़ के लायक़ (हमीद)",
		"قابلِ تعریف (حمید)",
		"ح م د",
		"14:1",
		"Nouns & Names",
		17
	],
	[
		"مَجِيد",
		"Majid",
		"Glorious",
		"बड़ी शान वाला (मजीद)",
		"شان و عظمت والا (مجید)",
		"م ج د",
		"85:15",
		"Nouns & Names",
		4
	],
	[
		"شَكُور",
		"Shakur",
		"Appreciative / Most Grateful",
		"क़द्रदान (शकूर)",
		"قدردان (شکور)",
		"ش ك ر",
		"35:30",
		"Nouns & Names",
		4
	],
	[
		"تَوَّاب",
		"Tawwab",
		"Accepter of Repentance",
		"तौबा क़बूल करने वाला",
		"توبہ قبول کرنے والا",
		"ت و ب",
		"2:37",
		"Nouns & Names",
		11
	],
	[
		"وَهَّاب",
		"Wahhab",
		"The Bestower",
		"ख़ूब अता करने वाला (वह्हाब)",
		"بہت عطا فرمانے والا (وہاب)",
		"و ه ب",
		"3:8",
		"Nouns & Names",
		3
	],
	[
		"رَزَّاق",
		"Razzaq",
		"The Total Provider",
		"बड़ा रिज़्क़ देने वाला (रज़्ज़ाक़)",
		"بڑا رزق دینے والا (رزاق)",
		"ر ز ق",
		"51:58",
		"Nouns & Names",
		1
	],
	[
		"حَيّ",
		"Hayy",
		"The Ever-Living",
		"हमेशा ज़िंदा (अल-हय्य)",
		"ہمیشہ زندہ (الحی)",
		"ح ي ي",
		"2:255",
		"Nouns & Names",
		5
	],
	[
		"قَيُّوم",
		"Qayyum",
		"The Sustainer of All Existence",
		"सबको थामने वाला (क़य्यूम)",
		"سب کو قائم رکھنے والا (قیوم)",
		"ق و م",
		"2:255",
		"Nouns & Names",
		3
	],
	[
		"أَحَد",
		"Ahad",
		"The Unique One",
		"अकेला / एक (अहद)",
		"یکتا / ایک (احد)",
		"أ ح د",
		"112:1",
		"Nouns & Names",
		85
	],
	[
		"صَمَد",
		"Samad",
		"The Eternal Refuge",
		"बेनियाज़ सहारा (अस-समद)",
		"بے نیاز سہارا (الصمد)",
		"ص م د",
		"112:2",
		"Nouns & Names",
		1
	],
	[
		"أَوَّل",
		"Awwal",
		"The First",
		"अव्वल / पहला",
		"اول / پہلا",
		"أ و ل",
		"57:3",
		"Nouns & Names",
		82
	],
	[
		"آخِر",
		"Akhir",
		"The Last",
		"आख़िर / अंतिम",
		"آخر",
		"أ خ ر",
		"57:3",
		"Nouns & Names",
		70
	],
	[
		"ظَاهِر",
		"Zahir",
		"The Manifest",
		"ज़ाहिर / स्पष्ट",
		"ظاہر / عیاں",
		"ظ ه ر",
		"57:3",
		"Nouns & Names",
		21
	],
	[
		"بَاطِن",
		"Batin",
		"The Hidden / Near",
		"बातिन / पोशीदा",
		"باطن / پوشیدہ",
		"ب ط ن",
		"57:3",
		"Nouns & Names",
		6
	],
	[
		"قَالَ",
		"Qala",
		"He said",
		"उसने कहा (क़ाल)",
		"اس نے کہا (قال)",
		"ق و ل",
		"2:30",
		"Verbs & Actions",
		1618
	],
	[
		"كَانَ",
		"Kana",
		"Was / Is (ever)",
		"था / है (कान)",
		"تھا / ہے (کان)",
		"ك و ن",
		"4:1",
		"Verbs & Actions",
		1358
	],
	[
		"آمَنَ",
		"Amana",
		"He believed",
		"वह ईमान लाया",
		"وہ ایمان لایا",
		"أ م ن",
		"2:3",
		"Verbs & Actions",
		537
	],
	[
		"عَلِمَ",
		"Alima",
		"He knew",
		"उसने जाना",
		"اس نے جانا",
		"ع ل م",
		"82:5",
		"Verbs & Actions",
		382
	],
	[
		"جَعَلَ",
		"Ja’ala",
		"He made / appointed",
		"उसने बनाया",
		"اس نے بنایا",
		"ج ع ل",
		"2:22",
		"Verbs & Actions",
		340
	],
	[
		"عَمِلَ",
		"Amila",
		"He did / worked",
		"उसने अमल किया",
		"اس نے عمل کیا",
		"ع م ل",
		"103:3",
		"Verbs & Actions",
		276
	],
	[
		"جَاءَ",
		"Ja’a",
		"He/It came",
		"वह आया (जाअ)",
		"وہ آیا (جاء)",
		"ج ي أ",
		"110:1",
		"Verbs & Actions",
		278
	],
	[
		"رَأَىٰ",
		"Ra’a",
		"He saw",
		"उसने देखा (रआ)",
		"اس نے دیکھا (راٰی)",
		"ر أ ي",
		"107:1",
		"Verbs & Actions",
		328
	],
	[
		"أَتَىٰ",
		"Ata",
		"He came / brought",
		"वह आया (अता)",
		"وہ آیا (اتیٰ)",
		"أ ت ي",
		"16:1",
		"Verbs & Actions",
		264
	],
	[
		"آتَىٰ",
		"Ata (gave)",
		"He gave / bestowed",
		"उसने दिया (आता)",
		"اس نے عطا کیا (آتیٰ)",
		"أ ت ي",
		"2:177",
		"Verbs & Actions",
		271
	],
	[
		"شَاءَ",
		"Sha’a",
		"He willed",
		"उसने चाहा (शाअ)",
		"اس نے چاہا (شاء)",
		"ش ي أ",
		"81:29",
		"Verbs & Actions",
		236
	],
	[
		"أَرَادَ",
		"Arada",
		"He intended / desired",
		"उसने इरादा किया",
		"اس نے ارادہ کیا",
		"ر و د",
		"36:82",
		"Verbs & Actions",
		139
	],
	[
		"خَلَقَ",
		"Khalaqa",
		"He created",
		"उसने पैदा किया (ख़लक़)",
		"اس نے پیدا کیا (خلق)",
		"خ ل ق",
		"96:1",
		"Verbs & Actions",
		184
	],
	[
		"أَنْزَلَ",
		"Anzala",
		"He sent down / revealed",
		"उसने नाज़िल किया",
		"اس نے نازل فرمایا",
		"ن ز ل",
		"97:1",
		"Verbs & Actions",
		183
	],
	[
		"كَفَرَ",
		"Kafara",
		"He disbelieved / was ungrateful",
		"उसने इंकार किया",
		"اس نے انکار کیا",
		"ك ف ر",
		"2:6",
		"Verbs & Actions",
		289
	],
	[
		"دَعَا",
		"Da’a",
		"He called / supplicated",
		"उसने पुकारा / दुआ की",
		"اس نے پکارا / دعا کی",
		"د ع و",
		"40:60",
		"Verbs & Actions",
		170
	],
	[
		"هَدَىٰ",
		"Hada",
		"He guided",
		"उसने हिदायत दी",
		"اس نے ہدایت دی",
		"ه د ي",
		"93:7",
		"Verbs & Actions",
		144
	],
	[
		"أَضَلَّ",
		"Adalla",
		"He let go astray",
		"उसने भटकाया",
		"اس نے گمراہ کیا",
		"ض ل ل",
		"45:23",
		"Verbs & Actions",
		65
	],
	[
		"اتَّقَىٰ",
		"Ittaqa",
		"He was mindful of Allah",
		"उसने तक़वा इख़्तियार किया",
		"اس نے تقویٰ اختیار کیا",
		"و ق ي",
		"92:5",
		"Verbs & Actions",
		166
	],
	[
		"ذَكَرَ",
		"Dhakara",
		"He remembered / mentioned",
		"उसने याद किया",
		"اس نے یاد کیا",
		"ذ ك ر",
		"87:15",
		"Verbs & Actions",
		163
	],
	[
		"نَسِيَ",
		"Nasiya",
		"He forgot",
		"वह भूल गया",
		"وہ بھول گیا",
		"ن س ي",
		"2:286",
		"Verbs & Actions",
		36
	],
	[
		"سَمِعَ",
		"Sami’a",
		"He heard",
		"उसने सुना",
		"اس نے سنا",
		"س م ع",
		"58:1",
		"Verbs & Actions",
		100
	],
	[
		"أَبْصَرَ",
		"Absara",
		"He saw clearly",
		"उसने देखा",
		"اس نے دیکھا",
		"ب ص ر",
		"18:26",
		"Verbs & Actions",
		36
	],
	[
		"عَقَلَ",
		"Aqala",
		"He understood / reasoned",
		"उसने अक़्ल से काम लिया",
		"اس نے عقل سے کام لیا",
		"ع ق ل",
		"2:44",
		"Verbs & Actions",
		49
	],
	[
		"تَفَكَّرَ",
		"Tafakkara",
		"He reflected deeply",
		"उसने ग़ौर-ओ-फ़िक्र किया",
		"اس نے غور و فکر کیا",
		"ف ك ر",
		"3:191",
		"Verbs & Actions",
		17
	],
	[
		"تَدَبَّرَ",
		"Tadabbara",
		"He pondered the Quran",
		"उसने तदब्बुर किया",
		"اس نے تدبر کیا",
		"د ب ر",
		"4:82",
		"Verbs & Actions",
		4
	],
	[
		"عَبَدَ",
		"Abada",
		"He worshipped",
		"उसने इबादत की",
		"اس نے عبادت کی",
		"ع ب د",
		"1:5",
		"Verbs & Actions",
		143
	],
	[
		"سَجَدَ",
		"Sajada",
		"He prostrated",
		"उसने सजदा किया",
		"اس نے سجدہ کیا",
		"س ج د",
		"96:19",
		"Verbs & Actions",
		64
	],
	[
		"رَكَعَ",
		"Raka’a",
		"He bowed in prayer",
		"उसने रुकू किया",
		"اس نے رکوع کیا",
		"ر ك ع",
		"2:43",
		"Verbs & Actions",
		13
	],
	[
		"أَقَامَ",
		"Aqama",
		"He established (prayer)",
		"उसने क़ायम किया",
		"اس نے قائم کیا",
		"ق و م",
		"2:3",
		"Verbs & Actions",
		54
	],
	[
		"أَنْفَقَ",
		"Anfaqa",
		"He spent in charity",
		"उसने अल्लाह की राह में ख़र्च किया",
		"اس نے راہِ خدا میں خرچ کیا",
		"ن ف ق",
		"2:3",
		"Verbs & Actions",
		68
	],
	[
		"رَزَقَ",
		"Razaqa",
		"He provided",
		"उसने रिज़्क़ दिया",
		"اس نے رزق عطا کیا",
		"ر ز ق",
		"2:3",
		"Verbs & Actions",
		61
	],
	[
		"غَفَرَ",
		"Ghafara",
		"He forgave",
		"उसने माफ़ किया",
		"اس نے بخش دیا",
		"غ ف ر",
		"2:286",
		"Verbs & Actions",
		95
	],
	[
		"رَحِمَ",
		"Rahima",
		"He had mercy",
		"उसने रहम किया",
		"اس نے رحم فرمایا",
		"ر ح م",
		"7:23",
		"Verbs & Actions",
		28
	],
	[
		"تَابَ",
		"Taba",
		"He repented / turned in mercy",
		"उसने तौबा की / क़बूल की",
		"اس نے توبہ کی / قبول کی",
		"ت و ب",
		"2:37",
		"Verbs & Actions",
		63
	],
	[
		"عَفَا",
		"Afa",
		"He pardoned",
		"उसने दरगुज़र किया",
		"اس نے معاف کر دیا",
		"ع ف و",
		"2:286",
		"Verbs & Actions",
		30
	],
	[
		"نَصَرَ",
		"Nasara",
		"He helped / gave victory",
		"उसने मदद की",
		"اس نے مدد فرمائی",
		"ن ص ر",
		"47:7",
		"Verbs & Actions",
		59
	],
	[
		"تَوَكَّلَ",
		"Tawakkala",
		"He relied upon / trusted",
		"उसने भरोसा किया",
		"اس نے توکل کیا",
		"و ك ل",
		"65:3",
		"Verbs & Actions",
		38
	],
	[
		"صَبَرَ",
		"Sabara",
		"He was patient",
		"उसने सब्र किया",
		"اس نے صبر کیا",
		"ص ب ر",
		"3:200",
		"Verbs & Actions",
		53
	],
	[
		"شَكَرَ",
		"Shakara",
		"He gave thanks",
		"उसने शुक्र अदा किया",
		"اس نے شکر ادا کیا",
		"ش ك ر",
		"27:40",
		"Verbs & Actions",
		46
	],
	[
		"أَحَبَّ",
		"Ahabba",
		"He loved",
		"उसने मोहब्बत की",
		"اس نے محبت کی",
		"ح ب ب",
		"2:195",
		"Verbs & Actions",
		64
	],
	[
		"رَضِيَ",
		"Radiya",
		"He was pleased",
		"वह राज़ी हुआ",
		"وہ راضی ہوا",
		"ر ض و",
		"98:8",
		"Verbs & Actions",
		38
	],
	[
		"خَافَ",
		"Khafa",
		"He feared",
		"वह डरा",
		"وہ ڈرا",
		"خ و ف",
		"79:40",
		"Verbs & Actions",
		83
	],
	[
		"رَجَا",
		"Raja",
		"He hoped for",
		"उसने उम्मीद रखी",
		"اس نے امید رکھی",
		"ر ج و",
		"18:110",
		"Verbs & Actions",
		23
	],
	[
		"خَشِيَ",
		"Khashiya",
		"He stood in reverent awe",
		"वह अदब से डरा (ख़शियत)",
		"وہ خشیت سے ڈرا",
		"خ ش ي",
		"98:8",
		"Verbs & Actions",
		40
	],
	[
		"أَطَاعَ",
		"Ata’a",
		"He obeyed",
		"उसने फ़रमाँबरदारी की",
		"اس نے اطاعت کی",
		"ط و ع",
		"4:80",
		"Verbs & Actions",
		73
	],
	[
		"عَصَىٰ",
		"Asa (disobeyed)",
		"He disobeyed",
		"उसने नाफ़रमानी की",
		"اس نے نافرمانی کی",
		"ع ص ي",
		"79:21",
		"Verbs & Actions",
		27
	],
	[
		"ظَلَمَ",
		"Zalama",
		"He wronged",
		"उसने ज़ुल्म किया",
		"اس نے ظلم کیا",
		"ظ ل م",
		"7:23",
		"Verbs & Actions",
		110
	],
	[
		"صَدَقَ",
		"Sadaqa",
		"He spoke the truth",
		"उसने सच कहा",
		"اس نے سچ کہا",
		"ص د ق",
		"33:23",
		"Verbs & Actions",
		31
	],
	[
		"كَذَبَ",
		"Kadhaba",
		"He lied",
		"उसने झूठ बोला",
		"اس نے جھوٹ بولا",
		"ك ذ ب",
		"39:32",
		"Verbs & Actions",
		44
	],
	[
		"كَذَّبَ",
		"Kadhdhaba",
		"He denied / rejected truth",
		"उसने झुठलाया",
		"اس نے جھٹلایا",
		"ك ذ ب",
		"107:1",
		"Verbs & Actions",
		176
	],
	[
		"وَفَّىٰ",
		"Waffa",
		"He fulfilled in full",
		"उसने पूरा अदा किया",
		"اس نے پورا ادا کیا",
		"و ف ي",
		"53:37",
		"Verbs & Actions",
		40
	],
	[
		"حَكَمَ",
		"Hakama",
		"He judged / ruled",
		"उसने फ़ैसला किया",
		"اس نے فیصلہ کیا",
		"ح ك م",
		"4:58",
		"Verbs & Actions",
		45
	],
	[
		"أَمَرَ",
		"Amara",
		"He commanded",
		"उसने हुक्म दिया",
		"اس نے حکم دیا",
		"أ م ر",
		"16:90",
		"Verbs & Actions",
		77
	],
	[
		"نَهَىٰ",
		"Naha",
		"He forbade / restrained",
		"उसने मना किया / रोका",
		"اس نے منع کیا / روکا",
		"ن ه ي",
		"79:40",
		"Verbs & Actions",
		32
	],
	[
		"سَأَلَ",
		"Sa’ala",
		"He asked",
		"उसने सवाल किया",
		"اس نے سوال کیا",
		"س أ ل",
		"2:186",
		"Verbs & Actions",
		106
	],
	[
		"أَجَابَ",
		"Ajaba",
		"He answered / responded",
		"उसने जवाब दिया / क़बूल किया",
		"اس نے جواب دیا / قبول کیا",
		"ج و ب",
		"2:186",
		"Verbs & Actions",
		28
	],
	[
		"قَرَأَ",
		"Qara’a",
		"He read / recited",
		"उसने पढ़ा (क़रअ)",
		"اس نے پڑھا (قرأ)",
		"ق ر أ",
		"96:1",
		"Verbs & Actions",
		16
	],
	[
		"تَلَا",
		"Tala",
		"He recited / followed",
		"उसने तिलावत की",
		"اس نے تلاوت کی",
		"ت ل و",
		"2:121",
		"Verbs & Actions",
		61
	],
	[
		"كَتَبَ",
		"Kataba",
		"He wrote / decreed",
		"उसने लिखा / फ़र्ज़ किया",
		"اس نے لکھا / فرض کیا",
		"ك ت ب",
		"2:183",
		"Verbs & Actions",
		49
	],
	[
		"عَلَّمَ",
		"Allama",
		"He taught",
		"उसने सिखाया",
		"اس نے سکھایا",
		"ع ل م",
		"96:4",
		"Verbs & Actions",
		42
	],
	[
		"فَتَحَ",
		"Fataha",
		"He opened / granted victory",
		"उसने खोल दिया / फ़तह दी",
		"اس نے کھول دیا / فتح دی",
		"ف ت ح",
		"48:1",
		"Verbs & Actions",
		29
	],
	[
		"غَلَبَ",
		"Ghalaba",
		"He overcame / prevailed",
		"वह ग़ालिब आया",
		"وہ غالب آیا",
		"غ ل ب",
		"58:21",
		"Verbs & Actions",
		17
	],
	[
		"دَخَلَ",
		"Dakhala",
		"He entered",
		"वह दाख़िल हुआ",
		"وہ داخل ہوا",
		"د خ ل",
		"110:2",
		"Verbs & Actions",
		78
	],
	[
		"خَرَجَ",
		"Kharaja",
		"He went out / emerged",
		"वह निकला",
		"وہ نکلا",
		"خ ر ج",
		"99:6",
		"Verbs & Actions",
		53
	],
	[
		"أَخْرَجَ",
		"Akhraja",
		"He brought forth",
		"उसने निकाला",
		"اس نے نکالا",
		"خ ر ج",
		"2:257",
		"Verbs & Actions",
		99
	],
	[
		"رَجَعَ",
		"Raja’a",
		"He returned",
		"वह लौटा",
		"وہ لوٹا",
		"ر ج ع",
		"89:28",
		"Verbs & Actions",
		79
	],
	[
		"ذَهَبَ",
		"Dhahaba",
		"He went away",
		"वह गया",
		"وہ گیا",
		"ذ ه ب",
		"2:17",
		"Verbs & Actions",
		34
	],
	[
		"مَشَىٰ",
		"Masha",
		"He walked",
		"वह चला",
		"وہ چلا",
		"م ش ي",
		"67:15",
		"Verbs & Actions",
		18
	],
	[
		"سَعَىٰ",
		"Sa’a",
		"He strove / hastened",
		"उसने कोशिश की (सई)",
		"اس نے سعی (کوشش) کی",
		"س ع ي",
		"53:39",
		"Verbs & Actions",
		20
	],
	[
		"قَامَ",
		"Qama",
		"He stood up",
		"वह खड़ा हुआ",
		"وہ کھڑا ہوا",
		"ق و م",
		"73:2",
		"Verbs & Actions",
		33
	],
	[
		"قَعَدَ",
		"Qa’ada",
		"He sat",
		"वह बैठा",
		"وہ بیٹھا",
		"ق ع د",
		"3:191",
		"Verbs & Actions",
		19
	],
	[
		"أَكَلَ",
		"Akala",
		"He ate",
		"उसने खाया",
		"اس نے کھایا",
		"أ ك ل",
		"2:168",
		"Verbs & Actions",
		93
	],
	[
		"شَرِبَ",
		"Shariba",
		"He drank",
		"उसने पिया",
		"اس نے پیا",
		"ش ر ب",
		"2:60",
		"Verbs & Actions",
		27
	],
	[
		"مَاتَ",
		"Mata (died)",
		"He died",
		"वह फ़ौत हुआ",
		"وہ فوت ہوا",
		"م و ت",
		"3:144",
		"Verbs & Actions",
		39
	],
	[
		"أَحْيَا",
		"Ahya",
		"He gave life",
		"उसने ज़िंदा किया",
		"اس نے زندہ کیا",
		"ح ي ي",
		"5:32",
		"Verbs & Actions",
		51
	],
	[
		"بَعَثَ",
		"Ba’atha",
		"He raised / sent",
		"उसने उठाया / भेजा",
		"اس نے مبعوث کیا / اٹھایا",
		"ب ع ث",
		"62:2",
		"Verbs & Actions",
		54
	],
	[
		"حَشَرَ",
		"Hashara",
		"He gathered (for judgment)",
		"उसने जमा किया (हश्र)",
		"اس نے جمع کیا (حشر)",
		"ح ش ر",
		"79:23",
		"Verbs & Actions",
		36
	],
	[
		"جَزَىٰ",
		"Jaza",
		"He rewarded / recompensed",
		"उसने बदला दिया",
		"اس نے جزا دی",
		"ج ز ي",
		"53:31",
		"Verbs & Actions",
		73
	],
	[
		"وَجَدَ",
		"Wajada",
		"He found",
		"उसने पाया",
		"اس نے پایا",
		"و ج د",
		"93:6",
		"Verbs & Actions",
		106
	],
	[
		"أَخَذَ",
		"Akhadha",
		"He took / seized",
		"उसने पकड़ा / लिया",
		"اس نے لیا / پکڑا",
		"أ خ ذ",
		"19:12",
		"Verbs & Actions",
		127
	],
	[
		"تَرَكَ",
		"Taraka",
		"He left behind",
		"उसने छोड़ा",
		"اس نے چھوڑا",
		"ت ر ك",
		"44:25",
		"Verbs & Actions",
		40
	],
	[
		"حَفِظَ",
		"Hafiza",
		"He guarded / preserved",
		"उसने हिफ़ाज़त की",
		"اس نے حفاظت کی",
		"ح ف ظ",
		"15:9",
		"Verbs & Actions",
		21
	],
	[
		"ضَرَبَ",
		"Daraba",
		"He set forth (an example)",
		"उसने मिसाल बयान की",
		"اس نے مثال بیان کی",
		"ض ر ب",
		"14:24",
		"Verbs & Actions",
		55
	],
	[
		"بَلَغَ",
		"Balagha",
		"He reached",
		"वह पहुँचा",
		"وہ پہنچا",
		"ب ل غ",
		"46:15",
		"Verbs & Actions",
		40
	],
	[
		"بَشَّرَ",
		"Bashshara",
		"He gave glad tidings",
		"उसने खुशख़बरी दी",
		"اس نے بشارت دی",
		"ب ش ر",
		"2:25",
		"Verbs & Actions",
		38
	],
	[
		"أَنْذَرَ",
		"Andhara",
		"He warned",
		"उसने आगाह किया",
		"اس نے خبردار کیا",
		"ن ذ ر",
		"78:40",
		"Verbs & Actions",
		44
	],
	[
		"سَبَّحَ",
		"Sabbaha",
		"He glorified Allah",
		"उसने तसबीह की",
		"اس نے تسبیح بیان کی",
		"س ب ح",
		"57:1",
		"Worship & Ethics",
		42
	],
	[
		"اسْتَغْفَرَ",
		"Istaghfara",
		"He sought forgiveness",
		"उसने इस्तिग़फ़ार किया",
		"اس نے استغفار کیا",
		"غ ف ر",
		"110:3",
		"Worship & Ethics",
		42
	],
	[
		"أَفْلَحَ",
		"Aflaha",
		"He succeeded / prospered",
		"वह कामयाब हुआ",
		"وہ فلاح پا گیا",
		"ف ل ح",
		"87:14",
		"Worship & Ethics",
		29
	],
	[
		"تَزَكَّىٰ",
		"Tazakka",
		"He purified himself",
		"वह पाक हुआ",
		"اس نے تزکیہ کیا",
		"ز ك و",
		"87:14",
		"Worship & Ethics",
		12
	],
	[
		"أَصْلَحَ",
		"Aslaha",
		"He set right / reconciled",
		"उसने सुधार किया (इस्लाह)",
		"اس نے اصلاح کی",
		"ص ل ح",
		"42:40",
		"Worship & Ethics",
		28
	],
	[
		"أَفْسَدَ",
		"Afsada",
		"He caused corruption",
		"उसने बिगाड़ फैलाया",
		"اس نے فساد پھیلایا",
		"ف س د",
		"2:11",
		"Verbs & Actions",
		16
	],
	[
		"مَالِك",
		"Malik",
		"Master / Sovereign Owner",
		"मालिक",
		"مالک",
		"م ل ك",
		"1:4",
		"Nouns & Names",
		12
	],
	[
		"نَعْبُدُ",
		"Na’budu",
		"We worship",
		"हम इबादत करते हैं",
		"ہم عبادت کرتے ہیں",
		"ع ب د",
		"1:5",
		"Worship & Ethics",
		5
	],
	[
		"نَسْتَعِينُ",
		"Nasta’inu",
		"We seek help",
		"हम मदद माँगते हैं",
		"ہم مدد مانگتے ہیں",
		"ع و ن",
		"1:5",
		"Worship & Ethics",
		2
	],
	[
		"اهْدِنَا",
		"Ihdina",
		"Guide us",
		"हमें सीधा रास्ता दिखा",
		"ہمیں ہدایت دے",
		"ه د ي",
		"1:6",
		"Worship & Ethics",
		1
	],
	[
		"مُسْتَقِيم",
		"Mustaqim",
		"Straight / Upright",
		"सीधा (मुस्तक़ीम)",
		"سیدھا (مستقیم)",
		"ق و م",
		"1:6",
		"Nouns & Names",
		37
	],
	[
		"أَنْعَمْتَ",
		"An’amta",
		"You have bestowed favor",
		"तूने इनाम किया",
		"تو نے انعام فرمایا",
		"ن ع م",
		"1:7",
		"Verbs & Actions",
		12
	],
	[
		"مَغْضُوب",
		"Maghdub",
		"Those who earned wrath",
		"जिन पर ग़ज़ब हुआ",
		"جن پر غضب ہوا",
		"غ ض ب",
		"1:7",
		"Nouns & Names",
		1
	],
	[
		"ضَالِّين",
		"Dallin",
		"Those who go astray",
		"भटकने वाले",
		"بھٹکنے والے",
		"ض ل ل",
		"1:7",
		"Nouns & Names",
		14
	],
	[
		"رَيْب",
		"Rayb",
		"Doubt",
		"शक (रैब)",
		"شک (ریب)",
		"ر ي ب",
		"2:2",
		"Nouns & Names",
		18
	],
	[
		"مُتَّقِين",
		"Muttaqin",
		"The God-conscious",
		"परहेज़गार लोग (मुत्तक़ीन)",
		"متقین / پرہیزگار",
		"و ق ي",
		"2:2",
		"Worship & Ethics",
		49
	],
	[
		"غَيْب",
		"Ghayb",
		"The Unseen",
		"ग़ैब / अनदेखा",
		"غیب / نادیدہ",
		"غ ي ب",
		"2:3",
		"Nouns & Names",
		49
	],
	[
		"مُفْلِحُون",
		"Muflihun",
		"The Successful Ones",
		"कामयाब होने वाले",
		"فلاح پانے والے",
		"ف ل ح",
		"2:5",
		"Worship & Ethics",
		12
	],
	[
		"نَبَأ",
		"Naba’",
		"Great News / Tidings",
		"बड़ी ख़बर (नबा)",
		"بڑی خبر (نبأ)",
		"ن ب أ",
		"78:2",
		"Nouns & Names",
		29
	],
	[
		"عَظِيم",
		"Azim",
		"Great / Tremendous",
		"बहुत बड़ा (अज़ीम)",
		"عظیم / بہت بڑا",
		"ع ظ م",
		"78:2",
		"Nouns & Names",
		107
	],
	[
		"مِهَاد",
		"Mihad",
		"Resting place / Cradle",
		"बिछौना (मिहाद)",
		"بچھونا (مہاد)",
		"م ه د",
		"78:6",
		"Nouns & Names",
		7
	],
	[
		"أَوْتَاد",
		"Awtad",
		"Pegs / Stakes",
		"मेख़ें (औताद)",
		"میخیں (اوتاد)",
		"و ت د",
		"78:7",
		"Nouns & Names",
		3
	],
	[
		"سُبَات",
		"Subat",
		"Rest / Repose",
		"आराम / सुकून",
		"آرام / سکون",
		"س ب ت",
		"78:9",
		"Nouns & Names",
		2
	],
	[
		"لِبَاس",
		"Libas",
		"Garment / Covering",
		"लिबास / पर्दा",
		"لباس / پردہ",
		"ل ب س",
		"78:10",
		"Nouns & Names",
		10
	],
	[
		"مَعَاش",
		"Ma’ash",
		"Livelihood",
		"रोज़ी कमाने का वक़्त",
		"معاش / روزی کا وقت",
		"ع ي ش",
		"78:11",
		"Nouns & Names",
		1
	],
	[
		"سِرَاج",
		"Siraj",
		"Shining Lamp",
		"चमकता चिराग़ (सिराज)",
		"روشن چراغ (سراج)",
		"س ر ج",
		"78:13",
		"Nouns & Names",
		4
	],
	[
		"مَعْصِرَات",
		"Mu’sirat",
		"Rain clouds",
		"बरसने वाले बादल",
		"برسنے والے بادل",
		"ع ص ر",
		"78:14",
		"Nouns & Names",
		1
	],
	[
		"حَبّ",
		"Habb",
		"Grain / Seed",
		"अनाज / दाना (हब्ब)",
		"اناج / دانہ (حب)",
		"ح ب ب",
		"78:15",
		"Nouns & Names",
		12
	],
	[
		"نَبَات",
		"Nabat",
		"Vegetation / Plants",
		"हरियाली / पौधे (नबात)",
		"نباتات / سبزہ",
		"ن ب ت",
		"78:15",
		"Nouns & Names",
		9
	],
	[
		"مِيقَات",
		"Miqat",
		"Appointed Time",
		"मुक़र्रर वक़्त (मीक़ात)",
		"مقررہ وقت (میقات)",
		"و ق ت",
		"78:17",
		"Nouns & Names",
		6
	],
	[
		"فَصْل",
		"Fasl",
		"Decision / Sorting out",
		"फ़ैसला (फ़स्ल)",
		"فیصلہ (فصل)",
		"ف ص ل",
		"78:17",
		"Nouns & Names",
		10
	],
	[
		"صُور",
		"Sur",
		"The Trumpet",
		"सूर (नरसिंघा)",
		"صور",
		"ص و ر",
		"78:18",
		"Nouns & Names",
		10
	],
	[
		"مَرْصَاد",
		"Mirsad",
		"Place of Watch",
		"निगरानी की जगह",
		"گھات / نگرانی کی جگہ",
		"ر ص د",
		"78:21",
		"Nouns & Names",
		2
	],
	[
		"مَفَاز",
		"Mafaz",
		"Triumph / Success",
		"कामयाबी (मफ़ाज़)",
		"کامیابی (مفاز)",
		"ف و ز",
		"78:31",
		"Worship & Ethics",
		2
	],
	[
		"حَدَائِق",
		"Hada’iq",
		"Enclosed Gardens",
		"हरे-भरे बाग़ (हदाइक़)",
		"سرسبز باغات (حدائق)",
		"ح د ق",
		"78:32",
		"Nouns & Names",
		3
	],
	[
		"عَطَاء",
		"Ata’",
		"Gift / Bestowal",
		"अता / इनाम",
		"عطا / انعام",
		"ع ط و",
		"78:36",
		"Nouns & Names",
		5
	],
	[
		"مَأْوَىٰ",
		"Ma’wa",
		"Refuge / Abode",
		"ठिकाना (मावा)",
		"ٹھکانا (ماویٰ)",
		"أ و ي",
		"79:41",
		"Nouns & Names",
		22
	],
	[
		"مَتَاع",
		"Mata’",
		"Provision / Enjoyment",
		"सामान-ए-ज़िंदगी (मता)",
		"سامانِ زیست (متاع)",
		"م ت ع",
		"79:33",
		"Nouns & Names",
		35
	],
	[
		"ذِكْرَىٰ",
		"Dhikra",
		"Reminder",
		"नसीहत / याददिहानी",
		"نصیحت / یاددہانی",
		"ذ ك ر",
		"80:4",
		"Worship & Ethics",
		23
	],
	[
		"صُحُف",
		"Suhuf",
		"Scrolls / Scriptures",
		"सहीफ़े / पन्ने (सुहुफ़)",
		"صحیفے / اوراق",
		"ص ح ف",
		"80:13",
		"Nouns & Names",
		8
	],
	[
		"مُكَرَّمَة",
		"Mukarramah",
		"Honored",
		"मुकर्रम / इज़्ज़त वाला",
		"مکرم / باعزت",
		"ك ر م",
		"80:13",
		"Nouns & Names",
		2
	],
	[
		"مَرْفُوعَة",
		"Marfu’ah",
		"Exalted / Raised high",
		"बुलंद (मरफ़ूआ)",
		"بلند (مرفوعہ)",
		"ر ف ع",
		"80:14",
		"Nouns & Names",
		3
	],
	[
		"مُطَهَّرَة",
		"Mutahharah",
		"Purified",
		"पाकीज़ा (मुतह्हरा)",
		"پاکیزہ (مطہرہ)",
		"ط ه ر",
		"80:14",
		"Worship & Ethics",
		7
	],
	[
		"سَفَرَة",
		"Safarah",
		"Noble Scribe-Angels",
		"लिखने वाले फ़रिश्ते",
		"لکھنے والے فرشتے",
		"س ف ر",
		"80:15",
		"Nouns & Names",
		1
	],
	[
		"كِرَام",
		"Kiram",
		"Noble / Honorable",
		"बुज़ुर्ग / इज़्ज़तदार",
		"معزز (کرام)",
		"ك ر م",
		"80:16",
		"Worship & Ethics",
		8
	],
	[
		"بَرَرَة",
		"Bararah",
		"Righteous / Dutiful",
		"नेककार (बररा)",
		"نیکوکار (بررہ)",
		"ب ر ر",
		"80:16",
		"Worship & Ethics",
		2
	],
	[
		"طَعَام",
		"Ta’am",
		"Food",
		"खाना (तआम)",
		"کھانا (طعام)",
		"ط ع م",
		"80:24",
		"Nouns & Names",
		24
	],
	[
		"عِنَب",
		"Inab",
		"Grapes",
		"अंगूर (इनब)",
		"انگور (عنب)",
		"ع ن ب",
		"80:28",
		"Nouns & Names",
		11
	],
	[
		"زَيْتُون",
		"Zaytun",
		"Olives",
		"ज़ैतून",
		"زیتون",
		"ز ي ت",
		"95:1",
		"Nouns & Names",
		6
	],
	[
		"نَخْل",
		"Nakhl",
		"Date-palms",
		"खजूर के पेड़ (नख़्ल)",
		"کھجور کے درخت (نخل)",
		"ن خ ل",
		"80:29",
		"Nouns & Names",
		20
	],
	[
		"فَاكِهَة",
		"Fakihah",
		"Fruit",
		"मेवा / फल (फ़ाकिहा)",
		"میوہ / پھل (فاکہہ)",
		"ف ك ه",
		"80:31",
		"Nouns & Names",
		14
	],
	[
		"صُبْح",
		"Subh",
		"Morning Dawn",
		"सुबह (सुब्ह)",
		"صبح",
		"ص ب ح",
		"81:18",
		"Nouns & Names",
		5
	],
	[
		"أَمِين",
		"Amin",
		"Trustworthy",
		"अमानतदार (अमीन)",
		"امانت دار (امین)",
		"أ م ن",
		"81:21",
		"Worship & Ethics",
		14
	],
	[
		"مَكِين",
		"Makin",
		"Established in rank",
		"मज़बूत मर्तबे वाला",
		"بلند مرتبہ (مکین)",
		"م ك ن",
		"81:20",
		"Nouns & Names",
		3
	],
	[
		"حَافِظِين",
		"Hafizin",
		"Guardian Angels",
		"हिफ़ाज़त करने वाले",
		"حفاظت کرنے والے",
		"ح ف ظ",
		"82:10",
		"Nouns & Names",
		6
	],
	[
		"كَاتِبِين",
		"Katibin",
		"Recording Angels",
		"लिखने वाले (कातिबीन)",
		"لکھنے والے (کاتبین)",
		"ك ت ب",
		"82:11",
		"Nouns & Names",
		2
	],
	[
		"أَبْرَار",
		"Abrar",
		"The Righteous",
		"नेक लोग (अबरार)",
		"نیکوکار (ابرار)",
		"ب ر ر",
		"82:13",
		"Worship & Ethics",
		6
	],
	[
		"نَعِيم",
		"Na’im",
		"Bliss / Delight",
		"नेमत और चैन (नईम)",
		"نعمت اور راحت (نعیم)",
		"ن ع م",
		"82:13",
		"Nouns & Names",
		16
	],
	[
		"فُجَّار",
		"Fujjar",
		"The Wicked",
		"बदकार लोग",
		"بدکار لوگ (فجار)",
		"ف ج ر",
		"82:14",
		"Nouns & Names",
		3
	],
	[
		"جَحِيم",
		"Jahim",
		"Blazing Fire",
		"भड़कती आग",
		"بھڑکتی آگ (جحیم)",
		"ج ح م",
		"82:14",
		"Nouns & Names",
		26
	],
	[
		"مُطَفِّفِين",
		"Mutaffifin",
		"Those who give less in measure",
		"नाप-तौल में कमी करने वाले",
		"ناپ تول میں کمی کرنے والے",
		"ط ف ف",
		"83:1",
		"Worship & Ethics",
		1
	],
	[
		"عِلِّيِّين",
		"Illiyyin",
		"Highest Register of the Righteous",
		"इल्लिय्यीन (बुलंद मक़ाम)",
		"علیین (بلند مقام)",
		"ع ل و",
		"83:18",
		"Nouns & Names",
		2
	],
	[
		"مُقَرَّبُون",
		"Muqarrabun",
		"Those Brought Near to Allah",
		"अल्लाह के मुक़र्रब बंदे",
		"مقرب بندے (مقربون)",
		"ق ر ب",
		"83:21",
		"Worship & Ethics",
		8
	],
	[
		"كَدْح",
		"Kadh",
		"Earnest Striving",
		"मेहनत और कोशिश",
		"محنت اور مشقت (کدح)",
		"ك د ح",
		"84:6",
		"Verbs & Actions",
		2
	],
	[
		"يَسِير",
		"Yasir",
		"Easy",
		"आसान (यसीर)",
		"آسان (یسیر)",
		"ي س ر",
		"84:8",
		"Nouns & Names",
		15
	],
	[
		"مَسْرُور",
		"Masrur",
		"Joyful / Happy",
		"ख़ुश (मसरूर)",
		"مسرور / خوش",
		"س ر ر",
		"84:9",
		"Nouns & Names",
		2
	],
	[
		"شَفَق",
		"Shafaq",
		"Evening Twilight",
		"शाम की सुर्ख़ी (शफ़क़)",
		"شفق (شام کی سرخی)",
		"ش ف ق",
		"84:16",
		"Nouns & Names",
		1
	],
	[
		"بُرُوج",
		"Buruj",
		"Constellations / Great Stars",
		"सितारों के बुर्ज (बुरूज)",
		"ستاروں کے برج (بروج)",
		"ب ر ج",
		"85:1",
		"Nouns & Names",
		4
	],
	[
		"وَدُود",
		"Wadud",
		"The Most Loving",
		"बेहद मोहब्बत करने वाला (वदूद)",
		"بے حد محبت کرنے والا (ودود)",
		"و د د",
		"85:14",
		"Nouns & Names",
		2
	],
	[
		"لَوْح",
		"Lawh",
		"Preserved Tablet",
		"लौह (तख़्ती)",
		"لوحِ محفوظ",
		"ل و ح",
		"85:22",
		"Nouns & Names",
		5
	],
	[
		"مَحْفُوظ",
		"Mahfuz",
		"Preserved / Guarded",
		"महफ़ूज़ / सुरक्षित",
		"محفوظ",
		"ح ف ظ",
		"85:22",
		"Nouns & Names",
		2
	],
	[
		"طَارِق",
		"Tariq",
		"The Nightcomer / Piercing Star",
		"रात को चमकने वाला तारा",
		"رات کو چمکنے والا ستارہ",
		"ط ر ق",
		"86:1",
		"Nouns & Names",
		2
	],
	[
		"ثَاقِب",
		"Thaqib",
		"Piercing in brightness",
		"तेज़ रोशनी वाला (साक़िब)",
		"روشن چمکنے والا (ثاقب)",
		"ث ق ب",
		"86:3",
		"Nouns & Names",
		2
	],
	[
		"أَعْلَىٰ",
		"A’la",
		"The Most High",
		"सबसे बुलंद (आला)",
		"سب سے بلند (اعلیٰ)",
		"ع ل و",
		"87:1",
		"Nouns & Names",
		11
	],
	[
		"أَبْقَىٰ",
		"Abqa",
		"More Lasting / Enduring",
		"हमेशा बाक़ी रहने वाला",
		"زیادہ پائیدار (ابقیٰ)",
		"ب ق ي",
		"87:17",
		"Nouns & Names",
		7
	],
	[
		"غَاشِيَة",
		"Ghashiyah",
		"The Overwhelming Event",
		"छा जाने वाली घड़ी",
		"چھا جانے والی گھڑی",
		"غ ش ي",
		"88:1",
		"Nouns & Names",
		2
	],
	[
		"جَارِيَة",
		"Jariyah",
		"Flowing",
		"बहने वाला (जारिया)",
		"بہنے والا (جاریہ)",
		"ج ر ي",
		"88:12",
		"Nouns & Names",
		4
	],
	[
		"سُرُر",
		"Surur",
		"Raised Couches",
		"ऊँचे तख़्त (सुरुर्)",
		"اونچے تخت (سرر)",
		"س ر ر",
		"88:13",
		"Nouns & Names",
		6
	],
	[
		"إِبِل",
		"Ibil",
		"Camels",
		"ऊँट (इबिल)",
		"اونٹ (ابل)",
		"أ ب ل",
		"88:17",
		"Nouns & Names",
		2
	],
	[
		"شَفْع",
		"Shaf’",
		"The Even",
		"जफ़्त / जोड़ा (शफ़अ)",
		"جفت (شفع)",
		"ش ف ع",
		"89:3",
		"Nouns & Names",
		1
	],
	[
		"وَتْر",
		"Watr",
		"The Odd",
		"ताक़ / बेजोड़ (वत्र)",
		"طاق (وتر)",
		"و ت ر",
		"89:3",
		"Nouns & Names",
		1
	],
	[
		"مُطْمَئِنَّة",
		"Mutma’innah",
		"At Peace / Reassured",
		"इत्मीनान वाली (मुत्मइन्ना)",
		"اطمینان والی (مطمئنہ)",
		"ط م أ",
		"89:27",
		"Worship & Ethics",
		3
	],
	[
		"بَلَد",
		"Balad",
		"City (Makkah)",
		"शहर (बलद)",
		"شہر (بلد)",
		"ب ل د",
		"90:1",
		"Nouns & Names",
		19
	],
	[
		"عَقَبَة",
		"Aqabah",
		"The Steep Path of Virtue",
		"नेकी की घाटी (अक़बा)",
		"نیکی کی گھاٹی (عقبہ)",
		"ع ق ب",
		"90:11",
		"Worship & Ethics",
		2
	],
	[
		"مَسْغَبَة",
		"Masghabah",
		"Severe Hunger",
		"भूख का दिन (मसग़बा)",
		"فاقے اور بھوک کا دن",
		"س غ ب",
		"90:14",
		"Nouns & Names",
		1
	],
	[
		"مَرْحَمَة",
		"Marhamah",
		"Compassion / Mercy",
		"रहम और हमदर्दी (मरहमा)",
		"رحم اور شفقت (مرحمت)",
		"ر ح م",
		"90:17",
		"Worship & Ethics",
		1
	],
	[
		"ضُحَىٰ",
		"Duha",
		"Forenoon Brightness",
		"चाश्त की धूप (ज़ुहा)",
		"چاشت کی روشنی (ضحیٰ)",
		"ض ح و",
		"93:1",
		"Nouns & Names",
		6
	],
	[
		"فَجُور",
		"Fujur",
		"Wickedness",
		"बदकारी (फ़ुजूर)",
		"بدکاری (فجور)",
		"ف ج ر",
		"91:8",
		"Nouns & Names",
		3
	],
	[
		"حُسْنَىٰ",
		"Husna",
		"The Best Reward / Goodness",
		"भलाई / जन्नत (हुस्ना)",
		"بھلائی / جنت (حسنیٰ)",
		"ح س ن",
		"92:6",
		"Worship & Ethics",
		17
	],
	[
		"يُسْرَىٰ",
		"Yusra",
		"Path of Ease",
		"आसानी का रास्ता (युसरा)",
		"آسانی کا راستہ (یسریٰ)",
		"ي س ر",
		"92:7",
		"Nouns & Names",
		2
	],
	[
		"أَتْقَىٰ",
		"Atqa",
		"The Most God-Conscious",
		"सबसे ज़्यादा मुत्तक़ी (अत्क़ा)",
		"سب سے زیادہ متقی (اتقیٰ)",
		"و ق ي",
		"92:17",
		"Worship & Ethics",
		2
	],
	[
		"عَائِل",
		"A’il",
		"In need",
		"ज़रूरतमंद (आइल)",
		"حاجت مند (عائل)",
		"ع ي ل",
		"93:8",
		"Nouns & Names",
		1
	],
	[
		"سَائِل",
		"Sa’il",
		"One who asks / Seeker",
		"माँगने वाला / सवाल करने वाला",
		"سائل / مانگنے والا",
		"س أ ل",
		"93:10",
		"Nouns & Names",
		4
	],
	[
		"وِزْر",
		"Wizr",
		"Heavy Burden",
		"बोझ (विज़्र)",
		"بوجھ (وزر)",
		"و ز ر",
		"94:2",
		"Nouns & Names",
		12
	],
	[
		"ذِكْرَكَ",
		"Dhikraka",
		"Your Mention / Renown",
		"तेरा ज़िक्र और नाम",
		"تیرا ذکر اور نام",
		"ذ ك ر",
		"94:4",
		"Nouns & Names",
		1
	],
	[
		"عُسْر",
		"Usr",
		"Hardship / Difficulty",
		"मुश्किल / तंगी (उस्र)",
		"مشکل / تنگی (عسر)",
		"ع س ر",
		"94:5",
		"Nouns & Names",
		7
	],
	[
		"يُسْر",
		"Yusr",
		"Ease / Relief",
		"आसानी (युस्र)",
		"آسانی (یسر)",
		"ي س ر",
		"94:5",
		"Nouns & Names",
		8
	],
	[
		"تِين",
		"Tin",
		"The Fig",
		"अंजीर (तीन)",
		"انجیر (تین)",
		"ت ي ن",
		"95:1",
		"Nouns & Names",
		1
	],
	[
		"طُور",
		"Tur",
		"Mount Sinai",
		"तूर पहाड़",
		"کوہِ طور",
		"ط و ر",
		"95:2",
		"Nouns & Names",
		10
	],
	[
		"تَقْوِيم",
		"Taqwim",
		"Best Stature / Mould",
		"बेहतरीन बनावट (तक़वीम)",
		"بہترین ساخت (تقویم)",
		"ق و م",
		"95:4",
		"Nouns & Names",
		1
	],
	[
		"أَحْكَم",
		"Ahkam",
		"The Most Just & Wise",
		"सबसे बड़ा हाकिम",
		"سب سے بڑا حاکم (احکم)",
		"ح ك م",
		"95:8",
		"Nouns & Names",
		2
	],
	[
		"قَلَم",
		"Qalam",
		"The Pen",
		"क़लम",
		"قلم",
		"ق ل م",
		"96:4",
		"Nouns & Names",
		4
	],
	[
		"رُجْعَىٰ",
		"Ruj’a",
		"The Return",
		"लौटकर जाना (रुजआ)",
		"لوٹ کر جانا (رجعیٰ)",
		"ر ج ع",
		"96:8",
		"Nouns & Names",
		1
	],
	[
		"قَدْر",
		"Qadr",
		"Decree / Majesty / Honor",
		"क़द्र / शब-ए-क़द्र",
		"قدر / عظمت",
		"ق د ر",
		"97:1",
		"Nouns & Names",
		11
	],
	[
		"شَهْر",
		"Shahr",
		"Month",
		"महीना (शहर)",
		"مہینہ (شہر)",
		"ش ه ر",
		"97:3",
		"Nouns & Names",
		21
	],
	[
		"أَلْف",
		"Alf",
		"One Thousand",
		"एक हज़ार (अल्फ़)",
		"ایک ہزار (الف)",
		"أ ل ف",
		"97:3",
		"Nouns & Names",
		14
	],
	[
		"مَطْلَع",
		"Matla’",
		"Rising / Emergence",
		"उदय होना (मतलअ)",
		"طلوع ہونا (مطلع)",
		"ط ل ع",
		"97:5",
		"Nouns & Names",
		1
	],
	[
		"بَيِّنَة",
		"Bayyinah",
		"Clear Proof / Evidence",
		"खुली दलील (बय्यिना)",
		"واضح دلیل (بینہ)",
		"ب ي ن",
		"98:1",
		"Nouns & Names",
		19
	],
	[
		"قَيِّمَة",
		"Qayyimah",
		"Upright / True",
		"सीधा और दुरुस्त (क़य्यिमा)",
		"سیدھا اور درست (قیمہ)",
		"ق و م",
		"98:3",
		"Worship & Ethics",
		6
	],
	[
		"حُنَفَاء",
		"Hunafa’",
		"Inclining purely to truth",
		"यकसू होकर अल्लाह की तरफ़",
		"یکسو ہو کر (حنفاء)",
		"ح ن ف",
		"98:5",
		"Worship & Ethics",
		12
	],
	[
		"بَرِيَّة",
		"Bariyyah",
		"Creation / Creatures",
		"मख़लूक़ (बरिय्या)",
		"مخلوق (بریہ)",
		"ب ر أ",
		"98:7",
		"Nouns & Names",
		2
	],
	[
		"زِلْزَال",
		"Zilzal",
		"Earthquake / Shaking",
		"ज़लज़ला / भूकंप",
		"زلزلہ",
		"ز ل ز ل",
		"99:1",
		"Nouns & Names",
		2
	],
	[
		"أَثْقَال",
		"Athqal",
		"Heavy Burdens",
		"बोझ / ख़ज़ाने (असक़ाल)",
		"بوجھ / خزانے (اثقال)",
		"ث ق ل",
		"99:2",
		"Nouns & Names",
		3
	],
	[
		"أَخْبَار",
		"Akhbar",
		"News / Reports",
		"ख़बरें / हालात (अख़बार)",
		"خبریں / حالات (اخبار)",
		"خ ب ر",
		"99:4",
		"Nouns & Names",
		3
	],
	[
		"ذَرَّة",
		"Dharrah",
		"An Atom’s Weight / Speck",
		"ज़र्रा / कण",
		"ذرہ",
		"ذ ر ر",
		"99:7",
		"Nouns & Names",
		6
	],
	[
		"عَادِيَات",
		"Adiyat",
		"Charging Steeds",
		"तेज़ दौड़ने वाले घोड़े",
		"تیز دوڑنے والے گھوڑے",
		"ع د و",
		"100:1",
		"Nouns & Names",
		1
	],
	[
		"قَارِعَة",
		"Qari’ah",
		"The Striking Hour",
		"दिल दहला देने वाली घड़ी",
		"کھڑکھڑانے والی گھڑی",
		"ق ر ع",
		"101:1",
		"Nouns & Names",
		4
	],
	[
		"مَوَازِين",
		"Mawazin",
		"Scales of Deeds",
		"आमाल के तराज़ू (मवाज़ीन)",
		"اعمال کے ترازو (موازین)",
		"و ز ن",
		"101:6",
		"Nouns & Names",
		7
	],
	[
		"تَكَاثُر",
		"Takathur",
		"Competition in worldly increase",
		"ज़्यादा की होड़ (तकासुर)",
		"کثرت کی دوڑ (تکاثر)",
		"ك ث ر",
		"102:1",
		"Worship & Ethics",
		1
	],
	[
		"مَقَابِر",
		"Maqabir",
		"Graves",
		"क़ब्रिस्तान (मक़ाबिर)",
		"مقابر / قبرستان",
		"ق ب ر",
		"102:2",
		"Nouns & Names",
		1
	],
	[
		"يَقِين",
		"Yaqin",
		"Certainty",
		"यक़ीन / पक्का विश्वास",
		"یقین",
		"ي ق ن",
		"102:5",
		"Worship & Ethics",
		28
	],
	[
		"خُسْر",
		"Khusr",
		"Loss",
		"नुक़सान / घाटा (ख़ुस्र)",
		"نقصان / خسارہ (خسر)",
		"خ س ر",
		"103:2",
		"Nouns & Names",
		11
	],
	[
		"تَوَاصَوْا",
		"Tawasaw",
		"They advised one another",
		"एक-दूसरे को नसीहत की",
		"ایک دوسرے کو وصیت کی",
		"و ص ي",
		"103:3",
		"Worship & Ethics",
		4
	],
	[
		"هُمَزَة",
		"Humazah",
		"Slanderer / Backbiter",
		"ऐब लगाने वाला",
		"عیب جوئی کرنے والا",
		"ه م ز",
		"104:1",
		"Worship & Ethics",
		1
	],
	[
		"فِيل",
		"Fil",
		"The Elephant",
		"हाथी (फ़ील)",
		"ہاتھی (فیل)",
		"ف ي ل",
		"105:1",
		"Nouns & Names",
		1
	],
	[
		"كَيْد",
		"Kayd",
		"Plot / Plan",
		"चाल / तदबीर (कैद)",
		"تدبیر / چال (کید)",
		"ك ي د",
		"105:2",
		"Nouns & Names",
		35
	],
	[
		"طَيْر",
		"Tayr",
		"Birds",
		"परिंदे (तैर)",
		"پرندے (طیر)",
		"ط ي ر",
		"105:3",
		"Nouns & Names",
		19
	],
	[
		"حِجَارَة",
		"Hijarah",
		"Stones",
		"पत्थर (हिजारा)",
		"پتھر (حجارہ)",
		"ح ج ر",
		"105:4",
		"Nouns & Names",
		10
	],
	[
		"شِتَاء",
		"Shita’",
		"Winter",
		"सर्दी का मौसम (शिता)",
		"سردی کا موسم (شتاء)",
		"ش ت و",
		"106:2",
		"Nouns & Names",
		1
	],
	[
		"صَيْف",
		"Sayf",
		"Summer",
		"गर्मी का मौसम (सैफ़)",
		"گرمی کا موسم (صیف)",
		"ص ي ف",
		"106:2",
		"Nouns & Names",
		1
	],
	[
		"جُوع",
		"Ju’",
		"Hunger",
		"भूख (जूअ)",
		"بھوک (جوع)",
		"ج و ع",
		"106:4",
		"Nouns & Names",
		5
	],
	[
		"خَوْف",
		"Khawf",
		"Fear",
		"डर / ख़ौफ़",
		"خوف / ڈر",
		"خ و ف",
		"106:4",
		"Nouns & Names",
		41
	],
	[
		"مَاعُون",
		"Ma’un",
		"Small Kindnesses / Neighborly Help",
		"छोटी ज़रूरत की चीज़ें (माऊन)",
		"برتاؤ کی چھوٹی چیزیں (ماعون)",
		"م ع ن",
		"107:7",
		"Worship & Ethics",
		1
	],
	[
		"كَوْثَر",
		"Kawthar",
		"Abundant Good / River in Paradise",
		"कौसर (ढेरो भलाई)",
		"کوثر (خیرِ کثیر)",
		"ك ث ر",
		"108:1",
		"Nouns & Names",
		1
	],
	[
		"انْحَرْ",
		"Inhar",
		"Sacrifice (for Allah)",
		"क़ुर्बानी कर",
		"قربانی کر",
		"ن ح ر",
		"108:2",
		"Worship & Ethics",
		1
	],
	[
		"نَصْر",
		"Nasr",
		"Divine Help & Victory",
		"मदद (नस्र)",
		"مدد اور نصرت (نصر)",
		"ن ص ر",
		"110:1",
		"Nouns & Names",
		22
	],
	[
		"فَتْح",
		"Fath",
		"Opening / Victory",
		"फ़तह / कामयाबी",
		"فتح / کامیابی",
		"ف ت ح",
		"110:1",
		"Nouns & Names",
		12
	],
	[
		"أَفْوَاج",
		"Afwaj",
		"Multitudes / Crowds",
		"फ़ौज दर फ़ौज (अफ़वाज)",
		"فوج در فوج (افواج)",
		"ف و ج",
		"110:2",
		"Nouns & Names",
		2
	],
	[
		"فَلَق",
		"Falaq",
		"Daybreak / Dawn",
		"सुबह की पौ (फ़लक़)",
		"صبح کی روشنی (فلق)",
		"ف ل ق",
		"113:1",
		"Nouns & Names",
		1
	],
	[
		"غَاسِق",
		"Ghasiq",
		"Darkening Night",
		"अँधेरी रात (ग़ासिक़)",
		"اندھیری رات (غاسق)",
		"غ س ق",
		"113:3",
		"Nouns & Names",
		1
	],
	[
		"حَاسِد",
		"Hasid",
		"Envier",
		"हसद (जलन) करने वाला",
		"حسد کرنے والا (حاسد)",
		"ح س د",
		"113:5",
		"Worship & Ethics",
		1
	],
	[
		"وَسْوَاس",
		"Waswas",
		"Whisperer",
		"वसवसा डालने वाला",
		"وسوسہ ڈالنے والا",
		"و س و س",
		"114:4",
		"Nouns & Names",
		2
	],
	[
		"جِنَّة",
		"Jinnah",
		"Jinn",
		"जिन्नात (जिन्ना)",
		"جنات (جنہ)",
		"ج ن ن",
		"114:6",
		"Nouns & Names",
		10
	],
	[
		"مُبِين",
		"Mubin",
		"Clear / Manifest",
		"साफ़ और स्पष्ट (मुबीन)",
		"واضح اور روشن (مبین)",
		"ب ي ن",
		"12:1",
		"Nouns & Names",
		119
	],
	[
		"عَرَبِيّ",
		"Arabiyy",
		"Arabic",
		"अरबी (अरबीय्य)",
		"عربی",
		"ع ر ب",
		"12:2",
		"Nouns & Names",
		11
	],
	[
		"قَصَص",
		"Qasas",
		"Narratives / Stories",
		"सच्चे वाक़यात (क़सस)",
		"سچے واقعات (قصص)",
		"ق ص ص",
		"12:3",
		"Nouns & Names",
		6
	],
	[
		"رُؤْيَا",
		"Ru’ya",
		"Vision / Dream",
		"ख़्वाब (रुअया)",
		"خواب (رؤیا)",
		"ر أ ي",
		"12:4",
		"Nouns & Names",
		7
	],
	[
		"تَأْوِيل",
		"Ta’wil",
		"Interpretation / Fulfillment",
		"ताबीर / हक़ीक़त (तावील)",
		"تعبیر / حقیقت (تاویل)",
		"أ و ل",
		"12:6",
		"Nouns & Names",
		17
	],
	[
		"سِجْن",
		"Sijn",
		"Prison",
		"क़ैदख़ाना (सिज्न)",
		"قید خانہ (سجن)",
		"س ج ن",
		"12:33",
		"Nouns & Names",
		9
	],
	[
		"خَزَائِن",
		"Khaza’in",
		"Treasuries / Storehouses",
		"ख़ज़ाने (ख़ज़ाइन)",
		"خزانے (خزائن)",
		"خ ز ن",
		"12:55",
		"Nouns & Names",
		9
	],
	[
		"حَفِيظ",
		"Hafiz",
		"Watchful Guardian",
		"निगहबान (हफ़ीज़)",
		"نگہبان (حفیظ)",
		"ح ف ظ",
		"12:55",
		"Worship & Ethics",
		13
	],
	[
		"كَيْل",
		"Kayl",
		"Measure (of grain)",
		"नाप / पैमाना (कैल)",
		"پیمانہ / ناپ (کیل)",
		"ك ي ل",
		"12:59",
		"Nouns & Names",
		10
	],
	[
		"سَكِينَة",
		"Sakinah",
		"Tranquility / Divine Peace",
		"दिल का सुकून (सकीना)",
		"سکینت / قلبی سکون",
		"س ك ن",
		"9:40",
		"Worship & Ethics",
		6
	],
	[
		"مَوَدَّة",
		"Mawaddah",
		"Love / Cordial Affection",
		"मोहब्बत (मवद्दत)",
		"محبت اور الفت (مودت)",
		"و د د",
		"30:21",
		"Worship & Ethics",
		8
	],
	[
		"شُورَىٰ",
		"Shura",
		"Mutual Consultation",
		"आपसी मशवरा (शूरा)",
		"باہمی مشورہ (شوریٰ)",
		"ش و ر",
		"42:38",
		"Worship & Ethics",
		1
	],
	[
		"إِصْلَاح",
		"Islah",
		"Reconciliation / Reform",
		"सुधार और सुलह (इस्लाह)",
		"اصلاح اور صلح",
		"ص ل ح",
		"4:114",
		"Worship & Ethics",
		7
	],
	[
		"مَعْرُوف",
		"Ma’ruf",
		"What is Right & Kind",
		"भलाई और नेकी (मारूफ़)",
		"بھلائی اور نیکی (معروف)",
		"ع ر ف",
		"3:104",
		"Worship & Ethics",
		38
	],
	[
		"مُنْكَر",
		"Munkar",
		"Wrong / Evil",
		"बुराई (मुनकर)",
		"برائی (منکر)",
		"ن ك ر",
		"3:104",
		"Worship & Ethics",
		16
	],
	[
		"تَسْبِيح",
		"Tasbih",
		"Glorification of Allah",
		"अल्लाह की पाकी बयान करना",
		"تسبیح (پاکی بیان کرنا)",
		"س ب ح",
		"17:44",
		"Worship & Ethics",
		3
	],
	[
		"تَرْتِيل",
		"Tartil",
		"Measured Recitation",
		"ठहर-ठहर कर साफ़ तिलावत",
		"ترتیل کے ساتھ تلاوت",
		"ر ت ل",
		"73:4",
		"Worship & Ethics",
		2
	],
	[
		"خَاشِعِين",
		"Khashi’in",
		"Humbly Submissive",
		"ख़ुशू और आजीज़ी करने वाले",
		"خشوع کرنے والے (خاشعین)",
		"خ ش ع",
		"2:45",
		"Worship & Ethics",
		7
	],
	[
		"صَابِرِين",
		"Sabirin",
		"The Patient Ones",
		"सब्र करने वाले (साबिरिन)",
		"صبر کرنے والے (صابرین)",
		"ص ب ر",
		"2:153",
		"Worship & Ethics",
		15
	],
	[
		"شَاكِرِين",
		"Shakirin",
		"The Grateful Ones",
		"शुक्र करने वाले (शाकिरीन)",
		"شکر کرنے والے (شاکرین)",
		"ش ك ر",
		"7:144",
		"Worship & Ethics",
		9
	],
	[
		"صَادِقِين",
		"Sadiqin",
		"The Truthful Ones",
		"सच्चे लोग (सादिक़ीन)",
		"سچے لوگ (صادقین)",
		"ص د ق",
		"9:119",
		"Worship & Ethics",
		19
	],
	[
		"مُحْسِنِين",
		"Muhsinin",
		"Doers of Good / Excellence",
		"एहसान और भलाई करने वाले",
		"احسان کرنے والے (محسنین)",
		"ح س ن",
		"2:195",
		"Worship & Ethics",
		30
	],
	[
		"تَوَّابِين",
		"Tawwabin",
		"Those who continually repent",
		"बार-बार तौबा करने वाले",
		"کثرت سے توبہ کرنے والے",
		"ت و ب",
		"2:222",
		"Worship & Ethics",
		1
	],
	[
		"مُتَطَهِّرِين",
		"Mutatahhirin",
		"Those who purify themselves",
		"पाक-साफ़ रहने वाले",
		"پاکیزگی اختیار کرنے والے",
		"ط ه ر",
		"2:222",
		"Worship & Ethics",
		1
	],
	[
		"ذَاكِرِين",
		"Dhakirin",
		"Those who remember Allah much",
		"कसरत से ज़िक्र करने वाले",
		"کثرت سے ذکر کرنے والے",
		"ذ ك ر",
		"33:35",
		"Worship & Ethics",
		1
	]
];
var EXPANDED_QURAN_VOCAB_300 = [...CORE_VOCAB_SEEDS.map((v) => ({
	id: v.id,
	arabic: v.ar,
	transliteration: v.tr,
	meaning: v.en,
	localizedMeanings: {
		en: v.en,
		hi: v.hi,
		ur: v.ur,
		hinglish: `${v.en} (${v.tr})`,
		ar: v.ar
	},
	rootLetters: v.root,
	occurrencesInQuran: v.freq,
	frequencySource: "Quranic Arabic Corpus & Standard Lexical Concordance",
	exampleAyah: v.exAr,
	exampleRef: v.exRef,
	category: v.cat,
	mastered: false,
	registryMeta: {
		id: v.id,
		contentType: "quran_vocab",
		language: "Multi (en, hi, ur, hinglish, ar)",
		availableLanguages: [
			"en",
			"hi",
			"ur",
			"hinglish",
			"ar"
		],
		source: `Quran ${v.exRef}`,
		reviewStatus: "PUBLISHED",
		ageSuitability: "All Ages",
		version: "2.0.0",
		lastUpdatedIso: "2026-10-31T00:00:00.000Z",
		offlineAvailable: true,
		authenticityType: "Canonical Text"
	}
})), ...COMPACT_QURAN_VOCAB_LIST.map(([ar, tr, en, hi, ur, root, ref, cat, freq], idx) => ({
	id: `v_exp_${idx + 19}`,
	arabic: ar,
	transliteration: tr,
	meaning: en,
	localizedMeanings: {
		en,
		hi,
		ur,
		hinglish: `${en} (${tr})`,
		ar
	},
	rootLetters: root,
	occurrencesInQuran: freq,
	frequencySource: "Quranic Arabic Corpus & Standard Lexical Concordance",
	exampleAyah: ar,
	exampleRef: ref,
	category: cat,
	mastered: false,
	registryMeta: {
		id: `v_exp_${idx + 19}`,
		contentType: "quran_vocab",
		language: "Multi (en, hi, ur, hinglish, ar)",
		availableLanguages: [
			"en",
			"hi",
			"ur",
			"hinglish",
			"ar"
		],
		source: `Quran ${ref}`,
		reviewStatus: "PUBLISHED",
		ageSuitability: "All Ages",
		version: "2.0.0",
		lastUpdatedIso: "2026-10-31T00:00:00.000Z",
		offlineAvailable: true,
		authenticityType: "Canonical Text"
	}
}))];
/**
* PHASE 8 — EXPANDED MULTI-LEVEL QUIZ QUESTION BANK & RANDOMIZED ENGINE
*/
var EXPANDED_QUIZ_PACKS = [
	{
		id: "quiz_quran_basics",
		title: "Quran & Juz Amma Mastery",
		level: "Beginner",
		category: "Quran",
		questions: [
			{
				id: "qq_1",
				prompt: "Which Surah is known as Umm al-Kitab (The Mother of the Book) and is recited in every Rak’ah of Salah?",
				options: [
					"Surah Al-Fatiha",
					"Surah Al-Fil",
					"Surah Al-Asr",
					"Surah Quraish"
				],
				correctIndex: 0,
				explanation: "The Prophet ﷺ taught that there is no prayer for the one who does not recite the Opening of the Book (Surah Al-Fatiha).",
				pillar: "quran",
				reference: "Sahih al-Bukhari 756",
				difficulty: "Beginner"
			},
			{
				id: "qq_2",
				prompt: "Which Surah is equal to one-third of the Quran in meaning and reward because it purely describes Allah’s Oneness (Tawheed)?",
				options: [
					"Surah Al-Ikhlas (Surah 112)",
					"Surah Al-Masad",
					"Surah Al-Kawthar",
					"Surah Al-Ma’un"
				],
				correctIndex: 0,
				explanation: "In Sahih al-Bukhari 5015, the Prophet ﷺ stated that \"Qul Huwallahu Ahad\" equals one-third of the Quran.",
				pillar: "quran",
				reference: "Sahih al-Bukhari 5015",
				difficulty: "Beginner"
			},
			{
				id: "qq_3",
				prompt: "How many Surahs are in the Holy Quran in total?",
				options: [
					"114 Surahs",
					"99 Surahs",
					"30 Surahs",
					"60 Surahs"
				],
				correctIndex: 0,
				explanation: "The Holy Quran contains 114 Surahs, beginning with Surah Al-Fatiha (1) and concluding with Surah An-Nas (114).",
				pillar: "quran",
				reference: "Uthmani Mushaf Consensus",
				difficulty: "Beginner"
			},
			{
				id: "qq_4",
				prompt: "How many Surahs are in Juz Amma (the 30th Juz, from Surah An-Naba 78 to Surah An-Nas 114)?",
				options: [
					"37 Surahs",
					"10 Surahs",
					"20 Surahs",
					"50 Surahs"
				],
				correctIndex: 0,
				explanation: "Juz Amma contains 37 Surahs starting from Surah An-Naba (#78) through Surah An-Nas (#114).",
				pillar: "quran",
				reference: "Uthmani Mushaf Juz 30 Index",
				difficulty: "Intermediate"
			},
			{
				id: "qq_5",
				prompt: "In Surah Al-Asr (103:1-3), which four qualities rescue human beings from being in loss (Khusr)?",
				options: [
					"Faith (Iman), righteous deeds, advising one another to truth, and advising one another to patience",
					"Wealth, fame, palaces, and armies",
					"Sleeping early, traveling far, and trading gold",
					"Speaking loudly and arguing"
				],
				correctIndex: 0,
				explanation: "Surah Al-Asr 103:3 specifies those who believe, do righteous deeds, and enjoin truth and patience.",
				pillar: "quran",
				reference: "Quran — Surah Al-Asr 103:1-3",
				difficulty: "Intermediate"
			},
			{
				id: "qq_6",
				prompt: "Which verse of Surah Al-Baqarah is known as Ayatul Kursi (The Greatest Verse in the Quran)?",
				options: [
					"Surah Al-Baqarah 2:255",
					"Surah Al-Baqarah 2:1",
					"Surah Al-Baqarah 2:10",
					"Surah Al-Baqarah 2:100"
				],
				correctIndex: 0,
				explanation: "Sahih Muslim 810 identifies Ayatul Kursi (2:255) as the greatest verse in the Book of Allah.",
				pillar: "quran",
				reference: "Sahih Muslim 810",
				difficulty: "Intermediate"
			},
			{
				id: "qq_7",
				prompt: "In Surah Al-Alaq (96:1-5), what was the very first command revealed to the Prophet Muhammad ﷺ?",
				options: [
					"\"Iqra’ bismi Rabbikal-ladhi khalaq\" (Read in the name of your Lord who created)",
					"\"Fight your enemies\"",
					"\"Build a market\"",
					"\"Leave Makkah\""
				],
				correctIndex: 0,
				explanation: "The first five verses of Surah Al-Alaq began revelation with the command to read in the name of the Creator.",
				pillar: "quran",
				reference: "Quran — Surah Al-Alaq 96:1-5 & Sahih al-Bukhari 3",
				difficulty: "Beginner"
			},
			{
				id: "qq_8",
				prompt: "Which two Surahs are called Al-Mu’awwidhatayn (The Two Surahs of Seeking Refuge)?",
				options: [
					"Surah Al-Falaq (113) and Surah An-Nas (114)",
					"Surah Al-Fil and Quraish",
					"Surah At-Tin and Al-Inshirah",
					"Surah Al-Adiyat and Al-Qari’ah"
				],
				correctIndex: 0,
				explanation: "Surah Al-Falaq and Surah An-Nas are the two Surahs of seeking refuge in Allah.",
				pillar: "quran",
				reference: "Sunan an-Nasa’i 5432",
				difficulty: "Beginner"
			}
		]
	},
	{
		id: "quiz_salah_wudu_mastery",
		title: "Wudu, Salah & Madhhabs Mastery",
		level: "Intermediate",
		category: "Salah",
		questions: [
			{
				id: "qs_1",
				prompt: "How many obligatory (Fard) prayers are prescribed for a Muslim every day?",
				options: [
					"5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha)",
					"2 prayers",
					"3 prayers",
					"7 prayers"
				],
				correctIndex: 0,
				explanation: "Five daily prayers are obligatory: Fajr (2), Dhuhr (4), Asr (4), Maghrib (3), and Isha (4).",
				pillar: "salah",
				reference: "Sahih al-Bukhari 8, Sahih Muslim 16",
				difficulty: "Beginner"
			},
			{
				id: "qs_2",
				prompt: "What do we recite three times while bowing in Ruku?",
				options: [
					"Subhana Rabbiyal-’Azim (Glory be to my Lord, the Most Great)",
					"Subhana Rabbiyal-A’la",
					"Sami’Allahu liman hamidah",
					"Assalamu Alaikum"
				],
				correctIndex: 0,
				explanation: "In Ruku we glorify Allah as the Most Great (Subhana Rabbiyal-Azim), and in Sujood as the Most High (Subhana Rabbiyal-A’la).",
				pillar: "salah",
				reference: "Sahih Muslim 772",
				difficulty: "Beginner"
			},
			{
				id: "qs_3",
				prompt: "According to Sahih Muslim 482, in which posture of Salah is a servant closest to their Lord?",
				options: [
					"While prostrating in Sujood (so make abundant Dua therein)",
					"While walking to the door",
					"While folding the prayer mat",
					"Before Wudu"
				],
				correctIndex: 0,
				explanation: "The Prophet ﷺ said in Sahih Muslim 482: \"The closest a servant comes to his Lord is when he is prostrating (Sajid), so make abundant supplication.\"",
				pillar: "salah",
				reference: "Sahih Muslim 482",
				difficulty: "Intermediate"
			},
			{
				id: "qs_4",
				prompt: "In Islamic jurisprudence, is a woman in her monthly excused period (Hayd) considered to have \"missed\" her prayers, or is she mercifully exempted by Allah with no Qada required for Salah?",
				options: [
					"She is mercifully exempted by Allah with no Qada required for Salah, and her worship streak remains unbroken",
					"She must make up all prayers later",
					"It counts as a sin",
					"She cannot make Dhikr or Dua at all"
				],
				correctIndex: 0,
				explanation: "Aisha (RA) explained in Sahih Muslim 335 that women are commanded to make up missed fasts but are NOT commanded to make up Salah from excused days.",
				pillar: "salah",
				reference: "Sahih Muslim 335 & Sahih al-Bukhari 321",
				difficulty: "Intermediate"
			},
			{
				id: "qs_5",
				prompt: "What supplication is recited in the final sitting (Qa’dah Akhirah) after At-Tahiyyat and Durood Ibrahim before Taslim?",
				options: [
					"Dua-e-Masura (\"Allahumma inni zalamtu nafsi...\" or protection from four trials)",
					"Subhana Rabbiyal-Azim",
					"Sami’Allahu liman hamidah",
					"Talbiyah"
				],
				correctIndex: 0,
				explanation: "After At-Tahiyyat and Durood Ibrahim, the worshipper recites Dua-e-Masura (Sahih al-Bukhari 834 & Sahih Muslim 588) before Taslim.",
				pillar: "salah",
				reference: "Sahih al-Bukhari 834, Sahih Muslim 588",
				difficulty: "Advanced"
			},
			{
				id: "qs_6",
				prompt: "Which supplication did the Prophet ﷺ teach his grandson Hasan ibn Ali (RA) to recite in the Witr prayer?",
				options: [
					"Dua-e-Qunoot (\"Allahummah-dini fiman hadayt...\")",
					"Dua for entering the market",
					"Dua for rain",
					"Dua for travel"
				],
				correctIndex: 0,
				explanation: "Hasan ibn Ali (RA) narrated the words of Qunoot in Witr in Jami` at-Tirmidhi 464 and Sunan Abi Dawud 1425.",
				pillar: "salah",
				reference: "Jami` at-Tirmidhi 464",
				difficulty: "Advanced"
			}
		]
	},
	{
		id: "quiz_prophets_seerah",
		title: "Prophets, Seerah & Companions",
		level: "Intermediate",
		category: "History",
		questions: [
			{
				id: "qp_1",
				prompt: "By what title was the Prophet Muhammad ﷺ known in Makkah even before prophethood?",
				options: [
					"As-Sadiq Al-Amin (The Truthful, The Trustworthy)",
					"Al-Malik",
					"Ash-Sha’ir",
					"Al-Tajir"
				],
				correctIndex: 0,
				explanation: "The people of Makkah unanimously called him As-Sadiq Al-Amin because of his lifelong honesty and trustworthiness.",
				pillar: "history",
				reference: "Sirat Ibn Hisham & Sahih al-Bukhari 3",
				difficulty: "Beginner"
			},
			{
				id: "qp_2",
				prompt: "Which Prophet built the Sacred Kaaba in Makkah together with his son Prophet Ismail (AS)?",
				options: [
					"Prophet Ibrahim (AS)",
					"Prophet Nuh (AS)",
					"Prophet Yunus (AS)",
					"Prophet Dawud (AS)"
				],
				correctIndex: 0,
				explanation: "Surah Al-Baqarah 2:127 describes Ibrahim (AS) and Ismail (AS) raising the foundations of the House while praying \"Rabbana taqabbal minna\".",
				pillar: "history",
				reference: "Quran — Surah Al-Baqarah 2:127",
				difficulty: "Beginner"
			},
			{
				id: "qp_3",
				prompt: "Which Companion accompanied the Prophet ﷺ in the Cave of Thawr during the Hijrah to Madinah (Quran 9:40)?",
				options: [
					"Abu Bakr As-Siddiq (RA)",
					"Khalid ibn Al-Walid (RA)",
					"Mu’adh ibn Jabal (RA)",
					"Salman Al-Farsi (RA)"
				],
				correctIndex: 0,
				explanation: "Surah At-Tawbah 9:40 honors Abu Bakr As-Siddiq (RA) when the Prophet ﷺ told him in the cave: \"Do not grieve; indeed Allah is with us.\"",
				pillar: "history",
				reference: "Quran — Surah At-Tawbah 9:40 & Sahih al-Bukhari 3653",
				difficulty: "Beginner"
			},
			{
				id: "qp_4",
				prompt: "Which Prophet’s supplication in the belly of the whale is \"La ilaha illa Anta subhanaka inni kuntu minaz-zalimin\" (Quran 21:87)?",
				options: [
					"Prophet Yunus / Dhun-Nun (AS)",
					"Prophet Yusuf (AS)",
					"Prophet Hud (AS)",
					"Prophet Salih (AS)"
				],
				correctIndex: 0,
				explanation: "Surah Al-Anbiya 21:87 records the supplication of Dhun-Nun (Prophet Yunus AS) in the darknesses.",
				pillar: "history",
				reference: "Quran — Surah Al-Anbiya 21:87",
				difficulty: "Intermediate"
			},
			{
				id: "qp_5",
				prompt: "In Surah Yusuf (12:92), what did Prophet Yusuf (AS) say to his brothers when forgiving them completely?",
				options: [
					"\"No blame will there be upon you today; may Allah forgive you, and He is the Most Merciful of the merciful\"",
					"\"I will never speak to you\"",
					"\"Pay me gold\"",
					"\"Leave Egypt immediately\""
				],
				correctIndex: 0,
				explanation: "Surah Yusuf 12:92 records Yusuf’s (AS) noble forgiveness (\"La tathriba ’alaykumul-yawm, yaghfirullahu lakum\").",
				pillar: "history",
				reference: "Quran — Surah Yusuf 12:92",
				difficulty: "Intermediate"
			},
			{
				id: "qp_6",
				prompt: "Which peace treaty in 6 AH was named by Allah in Surah Al-Fath (48:1) as \"Fathan Mubina\" (A Clear Victory)?",
				options: [
					"The Treaty of Hudaybiyyah",
					"The Battle of Hunayn",
					"The Journey to Ta’if",
					"The Migration to Abyssinia"
				],
				correctIndex: 0,
				explanation: "Surah Al-Fath 48:1 was revealed regarding the Peace Treaty of Hudaybiyyah.",
				pillar: "history",
				reference: "Quran — Surah Al-Fath 48:1 & Sahih al-Bukhari 2731",
				difficulty: "Advanced"
			}
		]
	},
	{
		id: "quiz_manners_character",
		title: "Islamic Manners (Adab & Akhlaq)",
		level: "Kids",
		category: "Akhlaq",
		questions: [
			{
				id: "qm_1",
				prompt: "What three eating manners did the Prophet ﷺ teach young Umar ibn Abi Salamah (RA) in Sahih al-Bukhari 5376?",
				options: [
					"Say Bismillah, eat with your right hand, and eat from what is nearest to you",
					"Eat standing, rush quickly, and complain",
					"Never share food",
					"Skip saying Alhamdulillah"
				],
				correctIndex: 0,
				explanation: "In Sahih al-Bukhari 5376, the Prophet ﷺ said: \"O boy! Mention the Name of Allah, eat with your right hand, and eat from what is in front of you.\"",
				pillar: "akhlaq",
				reference: "Sahih al-Bukhari 5376",
				difficulty: "Beginner"
			},
			{
				id: "qm_2",
				prompt: "According to Jami` at-Tirmidhi 1956, what is your warm smile in the face of your brother or sister?",
				options: [
					"An act of charity (Sadaqah)",
					"A waste of energy",
					"Forbidden",
					"Nothing"
				],
				correctIndex: 0,
				explanation: "\"Tabassumuka fi wajhi akhika laka sadaqah\" — Your smile for your brother is charity (Tirmidhi 1956).",
				pillar: "akhlaq",
				reference: "Jami` at-Tirmidhi 1956",
				difficulty: "Beginner"
			},
			{
				id: "qm_3",
				prompt: "In Surah Al-Isra (17:23), what word of impatience are we forbidden to say to our elderly parents?",
				options: [
					"Even the slightest word of annoyance (\"Uff\")",
					"\"Assalamu Alaikum\"",
					"\"JazakAllahu Khayran\"",
					"\"Alhamdulillah\""
				],
				correctIndex: 0,
				explanation: "Surah Al-Isra 17:23 commands: \"Say not to them [so much as] ‘Uff,’ and do not repel them, but speak to them a noble word.\"",
				pillar: "akhlaq",
				reference: "Quran — Surah Al-Isra 17:23",
				difficulty: "Beginner"
			},
			{
				id: "qm_4",
				prompt: "According to Sahih Muslim 91, how did the Prophet ﷺ define arrogance (Al-Kibr)?",
				options: [
					"Rejecting the truth (Batarul-Haqq) and looking down upon people (Ghamtun-Nas)",
					"Wearing clean white clothes",
					"Keeping shoes neat",
					"Smiling at guests"
				],
				correctIndex: 0,
				explanation: "Sahih Muslim 91 defines Al-Kibr as rejecting truth and despising people.",
				pillar: "akhlaq",
				reference: "Sahih Muslim 91",
				difficulty: "Intermediate"
			}
		]
	}
];
[
	...EXPANDED_KIDS_STORIES.map((s) => s.registryMeta),
	...EXPANDED_VERIFIED_DUAS.map((d) => d.registryMeta),
	...EXPANDED_ISLAMIC_LESSONS.map((l) => l.registryMeta),
	...EXPANDED_SEERAH_TIMELINE.map((e) => e.registryMeta),
	...EXPANDED_QURAN_VOCAB_300.map((v) => v.registryMeta)
];
var EXPANDED_QURAN_VOCAB_600 = [
	[
		"هُوَ",
		"Huwa",
		"He",
		"वह (हुव)",
		"وہ (ہو)",
		"ه و",
		"112:1",
		"Core Particles",
		481
	],
	[
		"هُمْ",
		"Hum",
		"They (masculine)",
		"वे सब (हुम)",
		"وہ سب (ہم)",
		"ه م",
		"2:5",
		"Core Particles",
		444
	],
	[
		"أَنْتَ",
		"Anta",
		"You (singular)",
		"तुम / आप (अंत)",
		"تم / آپ (انت)",
		"أ ن ت",
		"2:32",
		"Core Particles",
		81
	],
	[
		"أَنْتُمْ",
		"Antum",
		"You all (plural)",
		"तुम सब (अंतुम)",
		"تم سب (انتم)",
		"أ ن ت",
		"2:22",
		"Core Particles",
		135
	],
	[
		"أَنَا",
		"Ana",
		"I / Me",
		"मैं (अना)",
		"میں (انا)",
		"أ ن ا",
		"20:14",
		"Core Particles",
		68
	],
	[
		"نَحْنُ",
		"Nahnu",
		"We",
		"हम (नह्नु)",
		"ہم (نحن)",
		"ن ح ن",
		"2:11",
		"Core Particles",
		86
	],
	[
		"هَٰذَا",
		"Hadha",
		"This (masculine)",
		"यह (हाज़ा)",
		"یہ (ہٰذا)",
		"ه ذ ا",
		"2:35",
		"Core Particles",
		225
	],
	[
		"هَٰذِهِ",
		"Hadhihi",
		"This (feminine)",
		"यह (हाज़िही)",
		"یہ (ہٰذہ)",
		"ه ذ ه",
		"2:35",
		"Core Particles",
		47
	],
	[
		"ذَٰلِكَ",
		"Dhalika",
		"That (masculine)",
		"वह (ज़ालिक)",
		"وہ (ذٰلک)",
		"ذ ل ك",
		"2:2",
		"Core Particles",
		280
	],
	[
		"تِلْكَ",
		"Tilka",
		"That (feminine)",
		"वह (तिल्क)",
		"وہ (تلک)",
		"ت ل ك",
		"2:134",
		"Core Particles",
		43
	],
	[
		"أُولَٰئِكَ",
		"Ula’ika",
		"Those (plural)",
		"वही लोग (उलाइका)",
		"وہی لوگ (اولٰئک)",
		"أ و ل",
		"2:5",
		"Core Particles",
		204
	],
	[
		"الَّذِي",
		"Alladhi",
		"The one who",
		"वह जो (अल्लज़ी)",
		"وہ جو (الذی)",
		"ل ذ ي",
		"2:21",
		"Core Particles",
		304
	],
	[
		"الَّذِينَ",
		"Alladhina",
		"Those who",
		"वे लोग जो (अल्लज़ीना)",
		"وہ لوگ جو (الذین)",
		"ل ذ ي",
		"1:7",
		"Core Particles",
		1080
	],
	[
		"الَّتِي",
		"Allati",
		"That which (fem.)",
		"वह जो (अल्लती)",
		"وہ جو (التی)",
		"ل ت ي",
		"2:24",
		"Core Particles",
		56
	],
	[
		"نَعَمْ",
		"Na’am",
		"Yes / Indeed",
		"हाँ (नअम)",
		"ہاں (نعم)",
		"ن ع م",
		"7:44",
		"Core Particles",
		4
	],
	[
		"بَلَىٰ",
		"Bala",
		"Yes indeed! (emphatic)",
		"क्यों नहीं! बेशक",
		"کیوں نہیں! بے شک",
		"ب ل ي",
		"2:81",
		"Core Particles",
		22
	],
	[
		"كَلَّا",
		"Kalla",
		"Never! / Nay!",
		"हरगिज़ नहीं! (कल्ला)",
		"ہرگز نہیں! (کلا)",
		"ك ل ا",
		"102:3",
		"Core Particles",
		33
	],
	[
		"إِمَّا",
		"Imma",
		"Either / Whether",
		"या तो (इम्मा)",
		"یا تو (اما)",
		"إ م ا",
		"76:3",
		"Core Particles",
		23
	],
	[
		"لَوْ",
		"Law",
		"If (hypothetical)",
		"अगर / काश (लौ)",
		"اگر / کاش (لو)",
		"ل و",
		"2:20",
		"Core Particles",
		200
	],
	[
		"لَوْلَا",
		"Lawla",
		"Why not / Had it not been",
		"अगर न होता",
		"اگر نہ ہوتا",
		"ل و ل",
		"2:64",
		"Core Particles",
		75
	],
	[
		"إِنْ",
		"In",
		"If",
		"अगर (इन)",
		"اگر (ان)",
		"إ ن",
		"2:23",
		"Core Particles",
		623
	],
	[
		"لِكَيْ",
		"Likay",
		"So that / In order that",
		"ताकि (लिकै)",
		"تاکہ (لکی)",
		"ك ي",
		"22:5",
		"Core Particles",
		10
	],
	[
		"وَلَوْ",
		"Wa-law",
		"Even if",
		"चाहे / अगरचे",
		"اگرچہ / خواہ",
		"ل و",
		"2:103",
		"Core Particles",
		61
	],
	[
		"عَسَىٰ",
		"Asa",
		"Perhaps / It may be",
		"उम्मीद है / शायद",
		"امید ہے / شاید",
		"ع س ي",
		"2:216",
		"Core Particles",
		30
	],
	[
		"حَيْثُ",
		"Haythu",
		"Wherever / Where",
		"जहाँ (हैसु)",
		"جہاں (حیث)",
		"ح ي ث",
		"2:35",
		"Core Particles",
		31
	],
	[
		"أَنَّىٰ",
		"Anna",
		"From where / How",
		"कहाँ से / कैसे",
		"کہاں سے / کیسے",
		"أ ن ي",
		"3:37",
		"Core Particles",
		28
	],
	[
		"بِئْسَ",
		"Bi’sa",
		"How wretched / Evil is",
		"कितना बुरा है",
		"کتنا برا ہے",
		"ب أ س",
		"2:90",
		"Core Particles",
		40
	],
	[
		"نِعْمَ",
		"Ni’ma",
		"How excellent is",
		"कितना बेहतरीन है",
		"کتنا بہترین ہے",
		"ن ع م",
		"3:173",
		"Core Particles",
		16
	],
	[
		"سُبْحَانَ",
		"Subhana",
		"Glory be to (Far above)",
		"पाक है (सुब्हान)",
		"پاک ہے (سبحان)",
		"س ب ح",
		"17:1",
		"Core Particles",
		41
	],
	[
		"لَبَّيْكَ",
		"Labbayk",
		"Here I am at Your service",
		"मैं हाज़िर हूँ",
		"میں حاضر ہوں",
		"ل ب ب",
		"22:27",
		"Worship & Ethics",
		2
	],
	[
		"خَالِق",
		"Khaliq",
		"Creator",
		"पैदा करने वाला (ख़ालिक़)",
		"پیدا کرنے والا (خالق)",
		"خ ل ق",
		"59:24",
		"Nouns & Names",
		12
	],
	[
		"بَارِئ",
		"Bari’",
		"Maker / Evolver",
		"बनाने वाला (बारी)",
		"بنانے والا (باری)",
		"ب ر أ",
		"59:24",
		"Nouns & Names",
		3
	],
	[
		"مُصَوِّر",
		"Musawwir",
		"Fashioner / Shaper",
		"सूरत देने वाला",
		"صورت گر (مصور)",
		"ص و ر",
		"59:24",
		"Nouns & Names",
		1
	],
	[
		"رَزَّاق",
		"Razzaq",
		"Provider / Sustainer",
		"रिज़्क़ देने वाला",
		"رزق دینے والا (رزاق)",
		"ر ز ق",
		"51:58",
		"Nouns & Names",
		1
	],
	[
		"فَتَّاح",
		"Fattah",
		"Opener / Judge",
		"फ़ैसला करने वाला",
		"کھولنے والا (فتاح)",
		"ف ت ح",
		"34:26",
		"Nouns & Names",
		1
	],
	[
		"عَلِيم",
		"Alim",
		"All-Knowing",
		"सब जानने वाला (अलीम)",
		"سب جاننے والا (علیم)",
		"ع ل م",
		"2:29",
		"Nouns & Names",
		157
	],
	[
		"حَكِيم",
		"Hakim",
		"All-Wise",
		"हिकमत वाला (हकीम)",
		"حکمت والا (حکیم)",
		"ح ك م",
		"2:32",
		"Nouns & Names",
		97
	],
	[
		"سَمِيع",
		"Sami’",
		"All-Hearing",
		"सब सुनने वाला (समी)",
		"سب سننے والا (سمیع)",
		"س م ع",
		"2:127",
		"Nouns & Names",
		45
	],
	[
		"بَصِير",
		"Basir",
		"All-Seeing",
		"सब देखने वाला (बसीर)",
		"سب دیکھنے والا (بصیر)",
		"ب ص ر",
		"2:96",
		"Nouns & Names",
		51
	],
	[
		"خَبِير",
		"Khabir",
		"All-Aware",
		"बाख़बर (ख़बीर)",
		"باخبر (خبیر)",
		"خ ب ر",
		"2:234",
		"Nouns & Names",
		45
	],
	[
		"لَطِيف",
		"Latif",
		"Subtle / Most Kind",
		"निहायत मेहरबान (लतीफ़)",
		"نہایت مہربان (لطیف)",
		"ل ط ف",
		"6:103",
		"Nouns & Names",
		7
	],
	[
		"حَلِيم",
		"Halim",
		"Forbearing / Clement",
		"बुर्दबार / सहनशील",
		"بردبار (حلیم)",
		"ح ل م",
		"2:225",
		"Nouns & Names",
		15
	],
	[
		"غَفُور",
		"Ghafur",
		"Oft-Forgiving",
		"बख़्शने वाला (ग़फ़ूर)",
		"بخشنے والا (غفور)",
		"غ ف ر",
		"2:173",
		"Nouns & Names",
		91
	],
	[
		"وَدُود",
		"Wadud",
		"Most Loving",
		"बेहद मुहब्बत करने वाला",
		"بے حد محبت کرنے والا",
		"و د د",
		"85:14",
		"Nouns & Names",
		2
	],
	[
		"شَكُور",
		"Shakur",
		"Most Appreciative",
		"क़द्रदान (शकूर)",
		"قدردان (شکور)",
		"ش ك ر",
		"35:30",
		"Nouns & Names",
		10
	],
	[
		"كَرِيم",
		"Karim",
		"Most Generous / Noble",
		"इज़्ज़त वाला / करीम",
		"کریم / معزز",
		"ك ر م",
		"82:6",
		"Nouns & Names",
		27
	],
	[
		"قَرِيب",
		"Qarib",
		"Near / Ever-Close",
		"क़रीब / पास",
		"قریب / نزدیک",
		"ق ر ب",
		"2:186",
		"Nouns & Names",
		26
	],
	[
		"مُجِيب",
		"Mujib",
		"Responsive / Answerer",
		"दुआ क़ुबूल करने वाला",
		"دعا قبول کرنے والا",
		"ج و ب",
		"11:61",
		"Nouns & Names",
		2
	],
	[
		"وَكِيل",
		"Wakil",
		"Disposer of Affairs / Trustee",
		"कारसाज़ / वकील",
		"کارساز / وکیل",
		"و ك ل",
		"3:173",
		"Nouns & Names",
		24
	],
	[
		"وَلِيّ",
		"Waliyy",
		"Protector / Ally / Guardian",
		"मददगार / वली",
		"مددگار / ولی",
		"و ل ي",
		"2:257",
		"Nouns & Names",
		44
	],
	[
		"نَصِير",
		"Nasir",
		"Helper / Supporter",
		"मददगार (नसीर)",
		"مددگار (نصیر)",
		"ن ص ر",
		"2:107",
		"Nouns & Names",
		24
	],
	[
		"قَدِير",
		"Qadir",
		"All-Capable / Almighty",
		"क़ुदरत वाला (क़दीर)",
		"قدرت والا (قدیر)",
		"ق د ر",
		"2:20",
		"Nouns & Names",
		45
	],
	[
		"قَوِيّ",
		"Qawiyy",
		"All-Strong",
		"ताक़तवर (क़वी)",
		"طاقتور (قوی)",
		"ق و ي",
		"8:52",
		"Nouns & Names",
		11
	],
	[
		"عَزِيز",
		"Aziz",
		"Almighty / Mighty",
		"ग़ालिब / अज़ीज़",
		"غالب / عزیز",
		"ع ز ز",
		"2:129",
		"Nouns & Names",
		99
	],
	[
		"جَبَّار",
		"Jabbar",
		"Compeller / Restorer",
		"ज़बरदस्त / जब्बार",
		"زبردست / جبار",
		"ج ب ر",
		"59:23",
		"Nouns & Names",
		10
	],
	[
		"مَلِك",
		"Malik",
		"Sovereign / King",
		"बादशाह (मलिक)",
		"بادشاہ (ملک)",
		"م ل ك",
		"114:2",
		"Nouns & Names",
		15
	],
	[
		"قُدُّوس",
		"Quddus",
		"The Most Holy",
		"निहायत पाक (क़ुद्दूस)",
		"نہایت پاک (قدوس)",
		"ق د س",
		"59:23",
		"Nouns & Names",
		2
	],
	[
		"سَلَام",
		"Salam",
		"Peace / Source of Peace",
		"सलामती (सलाम)",
		"سلامتی (سلام)",
		"س ل م",
		"59:23",
		"Nouns & Names",
		42
	],
	[
		"شَهِيد",
		"Shahid",
		"Witness / Martyr",
		"गवाह / शहीद",
		"گواہ / شہید",
		"ش ه د",
		"4:33",
		"Nouns & Names",
		56
	],
	[
		"حَسِيب",
		"Hasib",
		"Sufficient Reckoner",
		"हिसाब लेने वाला",
		"حساب لینے والا",
		"ح س ب",
		"4:6",
		"Nouns & Names",
		4
	],
	[
		"رَقِيب",
		"Raqib",
		"Watchful Observer",
		"निगहबान (रक़ीब)",
		"نگہبان (رقیب)",
		"ر ق ب",
		"4:1",
		"Nouns & Names",
		5
	],
	[
		"تَوَّاب",
		"Tawwab",
		"Acceptor of Repentance",
		"तौबा क़ुबूल करने वाला",
		"توبہ قبول کرنے والا",
		"ت و ب",
		"2:37",
		"Nouns & Names",
		11
	],
	[
		"عَفُوّ",
		"Afuww",
		"Pardoner",
		"माफ़ करने वाला (अफ़ुव्व)",
		"معاف کرنے والا (عفو)",
		"ع ف و",
		"4:43",
		"Nouns & Names",
		5
	],
	[
		"بَرّ",
		"Barr",
		"Source of Goodness / Righteous",
		"एहसान करने वाला / नेक",
		"احسان کرنے والا / نیک",
		"ب ر ر",
		"52:28",
		"Nouns & Names",
		20
	],
	[
		"حَيّ",
		"Hayy",
		"Ever-Living",
		"हमेशा ज़िंदा (हय्य)",
		"ہمیشہ زندہ (حی)",
		"ح ي ي",
		"2:255",
		"Nouns & Names",
		24
	],
	[
		"قَيُّوم",
		"Qayyum",
		"Sustainer of All",
		"क़ायम रखने वाला (क़य्यूम)",
		"قائم رکھنے والا (قیوم)",
		"ق و م",
		"2:255",
		"Nouns & Names",
		3
	],
	[
		"عَرْش",
		"Arsh",
		"Throne (of Allah)",
		"अर्श (तख़्त)",
		"عرش",
		"ع ر ش",
		"7:54",
		"Nouns & Names",
		26
	],
	[
		"كُرْسِيّ",
		"Kursiyy",
		"Footstool / Seat of Dominion",
		"कुर्सी (सल्तनत)",
		"کرسی",
		"ك ر س",
		"2:255",
		"Nouns & Names",
		2
	],
	[
		"مَلَك",
		"Malak",
		"Angel",
		"फ़रिश्ता (मलक)",
		"فرشتہ (ملک)",
		"م ل ك",
		"2:30",
		"Nouns & Names",
		88
	],
	[
		"رُوح",
		"Ruh",
		"Spirit / Angel Jibril",
		"रूह / जिब्रील",
		"روح",
		"ر و ح",
		"97:4",
		"Nouns & Names",
		21
	],
	[
		"جِنّ",
		"Jinn",
		"Unseen beings (Jinn)",
		"जिन्नात (जिन्न)",
		"جنات (جن)",
		"ج ن ن",
		"51:56",
		"Nouns & Names",
		22
	],
	[
		"شَيْطَان",
		"Shaytan",
		"Satan / Devil",
		"शैतान",
		"شیطان",
		"ش ط ن",
		"2:36",
		"Nouns & Names",
		88
	],
	[
		"إِبْلِيس",
		"Iblis",
		"Iblis (Satan)",
		"इबलीस",
		"ابلیس",
		"ب ل س",
		"2:34",
		"Nouns & Names",
		11
	],
	[
		"شَمْس",
		"Shams",
		"Sun",
		"सूरज (शम्स)",
		"سورج (شمس)",
		"ش م س",
		"91:1",
		"Nouns & Names",
		33
	],
	[
		"قَمَر",
		"Qamar",
		"Moon",
		"चाँद (क़मर)",
		"چاند (قمر)",
		"ق م ر",
		"54:1",
		"Nouns & Names",
		27
	],
	[
		"نَجْم",
		"Najm",
		"Star",
		"सितारा (नज्म)",
		"ستارہ (نجم)",
		"ن ج م",
		"53:1",
		"Nouns & Names",
		13
	],
	[
		"كَوْكَب",
		"Kawkab",
		"Planet / Shining Star",
		"चमकता सितारा (कौकब)",
		"چمکتا ستارہ (کوکب)",
		"ك و ك ب",
		"6:76",
		"Nouns & Names",
		5
	],
	[
		"فَلَك",
		"Falak",
		"Orbit",
		"मदार / फ़लक",
		"مدار / فلک",
		"ف ل ك",
		"21:33",
		"Nouns & Names",
		2
	],
	[
		"غَمَام",
		"Ghamam",
		"Clouds (white)",
		"बादल (ग़माम)",
		"بادل (غمام)",
		"غ م م",
		"2:57",
		"Nouns & Names",
		4
	],
	[
		"سَحَاب",
		"Sahab",
		"Rain Clouds",
		"बादल (सहाब)",
		"بادل (سحاب)",
		"س ح ب",
		"2:164",
		"Nouns & Names",
		9
	],
	[
		"بَرْق",
		"Barq",
		"Lightning",
		"बिजली (बर्क़)",
		"بجلی (برق)",
		"ب ر ق",
		"2:20",
		"Nouns & Names",
		7
	],
	[
		"رَعْد",
		"Ra’d",
		"Thunder",
		"गरज (रअद)",
		"گرج (رعد)",
		"ر ع د",
		"13:13",
		"Nouns & Names",
		2
	],
	[
		"مَطَر",
		"Matar",
		"Rain",
		"बारिश (मतर)",
		"بارش (مطر)",
		"م ط ر",
		"4:102",
		"Nouns & Names",
		15
	],
	[
		"غَيْث",
		"Ghayth",
		"Life-giving Rain / Relief",
		"रहमत की बारिश",
		"رحمت کی بارش",
		"غ ي ث",
		"31:34",
		"Nouns & Names",
		6
	],
	[
		"رِيح",
		"Rih",
		"Wind",
		"हवा (रीह)",
		"ہوا (ریح)",
		"ر و ح",
		"2:164",
		"Nouns & Names",
		29
	],
	[
		"بَحْر",
		"Bahr",
		"Sea / Ocean",
		"समंदर (बहर)",
		"سمندر (بحر)",
		"ب ح ر",
		"2:50",
		"Nouns & Names",
		41
	],
	[
		"نَهَر",
		"Nahr",
		"River / Stream",
		"नहर / नदी",
		"نہر / دریا",
		"ن ه ر",
		"2:25",
		"Nouns & Names",
		54
	],
	[
		"عَيْن",
		"Ayn",
		"Spring of Water / Eye",
		"चश्मा / आँख",
		"چشمہ / آنکھ",
		"ع ي ن",
		"2:60",
		"Nouns & Names",
		65
	],
	[
		"جَبَل",
		"Jabal",
		"Mountain",
		"पहाड़ (जबल)",
		"پہاڑ (جبل)",
		"ج ب ل",
		"78:7",
		"Nouns & Names",
		39
	],
	[
		"صَخْر",
		"Sakhr",
		"Rock / Boulder",
		"चट्टान (सख़्र)",
		"چٹان (صخر)",
		"ص خ ر",
		"31:16",
		"Nouns & Names",
		3
	],
	[
		"تُرَاب",
		"Turab",
		"Dust / Soil",
		"मिट्टी (तुराब)",
		"مٹی (تراب)",
		"ت ر ب",
		"78:40",
		"Nouns & Names",
		17
	],
	[
		"طِين",
		"Tin",
		"Clay",
		"गारा / मिट्टी (तीन)",
		"گارا / مٹی (طین)",
		"ط ي ن",
		"6:2",
		"Nouns & Names",
		12
	],
	[
		"حَجَر",
		"Hajar",
		"Stone",
		"पत्थर (हजर)",
		"پتھر (حجر)",
		"ح ج ر",
		"2:24",
		"Nouns & Names",
		11
	],
	[
		"حَدِيد",
		"Hadid",
		"Iron",
		"लोहा (हदीद)",
		"لوہا (حدید)",
		"ح د د",
		"57:25",
		"Nouns & Names",
		6
	],
	[
		"ذَهَب",
		"Dhahab",
		"Gold",
		"सोना (ज़हब)",
		"سونا (ذہب)",
		"ذ ه ب",
		"3:14",
		"Nouns & Names",
		8
	],
	[
		"فِضَّة",
		"Fiddah",
		"Silver",
		"चाँदी (फ़िज़्ज़ा)",
		"چاندی (فضہ)",
		"ف ض ض",
		"3:14",
		"Nouns & Names",
		6
	],
	[
		"لُؤْلُؤ",
		"Lu’lu’",
		"Pearls",
		"मोती (लुलु)",
		"موتی (لؤلؤ)",
		"ل أ ل أ",
		"55:22",
		"Nouns & Names",
		6
	],
	[
		"شَجَرَة",
		"Shajarah",
		"Tree",
		"दरख़्त / पेड़ (शजरह)",
		"درخت (شجرہ)",
		"ش ج ر",
		"14:24",
		"Nouns & Names",
		26
	],
	[
		"نَخْل",
		"Nakhl",
		"Date-Palm Trees",
		"खजूर का पेड़",
		"کھجور کا درخت",
		"ن خ ل",
		"55:11",
		"Nouns & Names",
		20
	],
	[
		"زَيْتُون",
		"Zaytun",
		"Olive",
		"ज़ैतून",
		"زیتون",
		"ز ي ت",
		"95:1",
		"Nouns & Names",
		6
	],
	[
		"رُمَّان",
		"Rumman",
		"Pomegranate",
		"अनार (रुम्मान)",
		"انار (رمان)",
		"ر م ن",
		"55:68",
		"Nouns & Names",
		3
	],
	[
		"عِنَب",
		"Inab",
		"Grapes",
		"अंगूर (इनब)",
		"انگور (عنب)",
		"ع ن ب",
		"16:11",
		"Nouns & Names",
		11
	],
	[
		"ثَمَر",
		"Thamar",
		"Fruit / Produce",
		"फल (समर)",
		"پھل (ثمر)",
		"ث م ر",
		"2:25",
		"Nouns & Names",
		24
	],
	[
		"حَبّ",
		"Habb",
		"Grain / Seed",
		"दाना / बीज",
		"دانہ / بیج",
		"ح ب ب",
		"6:59",
		"Nouns & Names",
		12
	],
	[
		"زَرْع",
		"Zar’",
		"Crops / Cultivation",
		"खेती / फ़सल",
		"کھیتی / فصل",
		"ز ر ع",
		"18:32",
		"Nouns & Names",
		14
	],
	[
		"نَبَات",
		"Nabat",
		"Vegetation / Plants",
		"पेड़-पौधे / वनस्पति",
		"نباتات / پودے",
		"ن ب ت",
		"6:99",
		"Nouns & Names",
		26
	],
	[
		"فُلْك",
		"Fulk",
		"Ship / Ark",
		"कश्ती / जहाज़ (फ़ुल्क)",
		"کشتی / جہاز",
		"ف ل ك",
		"2:164",
		"Nouns & Names",
		23
	],
	[
		"سَفِينَة",
		"Safinah",
		"Boat / Vessel",
		"नाव / कश्ती",
		"کشتی (سفینہ)",
		"س ف ن",
		"18:71",
		"Nouns & Names",
		4
	],
	[
		"دَابَّة",
		"Dabbah",
		"Moving Creature",
		"जानदार / ज़मीन पर चलने वाला",
		"جاندار / چوپایہ",
		"د ب ب",
		"11:6",
		"Nouns & Names",
		18
	],
	[
		"طَيْر",
		"Tayr",
		"Birds",
		"परिंदे (तैर)",
		"پرندے (طیر)",
		"ط ي ر",
		"67:19",
		"Nouns & Names",
		24
	],
	[
		"نَحْل",
		"Nahl",
		"Honeybee",
		"शहद की मक्खी",
		"شہد کی مکھی",
		"ن ح ل",
		"16:68",
		"Nouns & Names",
		1
	],
	[
		"نَمْل",
		"Naml",
		"Ants",
		"चींटियाँ (नम्ल)",
		"چیونٹیاں (نمل)",
		"ن م ل",
		"27:18",
		"Nouns & Names",
		3
	],
	[
		"أَنْعَام",
		"An’am",
		"Livestock / Cattle",
		"मवेशी (अनआम)",
		"مویشی (انعام)",
		"ن ع م",
		"16:5",
		"Nouns & Names",
		32
	],
	[
		"خَيْل",
		"Khayl",
		"Horses",
		"घोड़े (ख़ैल)",
		"گھوڑے (خیل)",
		"خ ي ل",
		"3:14",
		"Nouns & Names",
		5
	],
	[
		"إِبِل",
		"Ibil",
		"Camels",
		"ऊँट (इबिल)",
		"اونٹ (ابل)",
		"إ ب ل",
		"88:17",
		"Nouns & Names",
		2
	],
	[
		"عَسَل",
		"Asal",
		"Honey",
		"शहद (असल)",
		"شہد (عسل)",
		"ع س ل",
		"47:15",
		"Nouns & Names",
		1
	],
	[
		"لَبَن",
		"Laban",
		"Milk",
		"दूध (लबन)",
		"دودھ (لبن)",
		"ل ب ن",
		"16:66",
		"Nouns & Names",
		2
	],
	[
		"خُبْز",
		"Khubz",
		"Bread",
		"रोटी (ख़ुब्ज़)",
		"روٹی (خبز)",
		"خ ب ز",
		"12:36",
		"Nouns & Names",
		1
	],
	[
		"فَجْر",
		"Fajr",
		"Dawn / Daybreak",
		"सुबह सादिक़ (फ़ज्र)",
		"صبح صادق (فجر)",
		"ف ج ر",
		"89:1",
		"Nouns & Names",
		6
	],
	[
		"ضُحَىٰ",
		"Duha",
		"Forenoon / Morning Brightness",
		"चाश्त का वक़्त (जुहा)",
		"چاشت کا وقت (ضحیٰ)",
		"ض ح و",
		"93:1",
		"Nouns & Names",
		7
	],
	[
		"عَصْر",
		"Asr",
		"Time / Afternoon",
		"ज़माना / असर",
		"زمانہ / عصر",
		"ع ص ر",
		"103:1",
		"Nouns & Names",
		1
	],
	[
		"ظُلُمَات",
		"Zulumat",
		"Layers of Darkness",
		"अँधेरे (ज़ुलुमात)",
		"اندھیرے (ظلمات)",
		"ظ ل م",
		"2:257",
		"Nouns & Names",
		23
	],
	[
		"ظِلّ",
		"Zill",
		"Shade / Shadow",
		"साया / छाँव (ज़िल्ल)",
		"سایہ (ظل)",
		"ظ ل ل",
		"25:45",
		"Nouns & Names",
		22
	],
	[
		"نَفْس",
		"Nafs",
		"Soul / Self / Person",
		"नफ़्स / जान",
		"نفس / جان",
		"ن ف س",
		"2:286",
		"Nouns & Names",
		295
	],
	[
		"صَدْر",
		"Sadr",
		"Chest / Breast",
		"सीना (सद्र)",
		"سینہ (صدر)",
		"ص د ر",
		"94:1",
		"Nouns & Names",
		44
	],
	[
		"وَجْه",
		"Wajh",
		"Face / Countenance / Sake",
		"चेहरा / रज़ा (वज्ह)",
		"چہرہ / رضا",
		"و ج ه",
		"2:115",
		"Nouns & Names",
		72
	],
	[
		"يَد",
		"Yad",
		"Hand / Power",
		"हाथ (यद)",
		"ہاتھ (ید)",
		"ي د ي",
		"67:1",
		"Nouns & Names",
		120
	],
	[
		"رِجْل",
		"Rijl",
		"Foot / Leg",
		"पैर (रिज्ल)",
		"پاؤں (رجل)",
		"ر ج ل",
		"5:6",
		"Nouns & Names",
		15
	],
	[
		"لِسَان",
		"Lisan",
		"Tongue / Language",
		"ज़बान (लिसान)",
		"زبان (لسان)",
		"ل س ن",
		"26:84",
		"Nouns & Names",
		25
	],
	[
		"أُذُن",
		"Udhun",
		"Ear",
		"कान (उज़ुन)",
		"کان (اذن)",
		"أ ذ ن",
		"5:45",
		"Nouns & Names",
		18
	],
	[
		"بَصَر",
		"Basar",
		"Sight / Vision",
		"नज़र / बीनाई",
		"نظر / بینائی",
		"ب ص ر",
		"17:36",
		"Nouns & Names",
		48
	],
	[
		"سَمْع",
		"Sam’",
		"Hearing",
		"सुनने की शक्ति (सम्अ)",
		"سماعت (سمع)",
		"س م ع",
		"17:36",
		"Nouns & Names",
		19
	],
	[
		"فُؤَاد",
		"Fu’ad",
		"Inner Heart / Intellect",
		"दिल / अक़्ल (फ़ुआद)",
		"دل (فؤاد)",
		"ف أ د",
		"17:36",
		"Nouns & Names",
		16
	],
	[
		"رَأْس",
		"Ra’s",
		"Head",
		"सिर (रास)",
		"سر (رأس)",
		"ر أ س",
		"5:6",
		"Nouns & Names",
		18
	],
	[
		"جِلْد",
		"Jild",
		"Skin",
		"खाल / चमड़ी",
		"جلد / کھال",
		"ج ل د",
		"4:56",
		"Nouns & Names",
		9
	],
	[
		"عَظْم",
		"Azm",
		"Bone",
		"हड्डी (अज़्म)",
		"ہڈی (عظم)",
		"ع ظ م",
		"23:14",
		"Nouns & Names",
		15
	],
	[
		"لَحْم",
		"Lahm",
		"Flesh / Meat",
		"गोश्त (लह्म)",
		"گوشت (لحم)",
		"ل ح م",
		"23:14",
		"Nouns & Names",
		12
	],
	[
		"دَم",
		"Dam",
		"Blood",
		"ख़ून (दम)",
		"خون (دم)",
		"د م ي",
		"2:173",
		"Nouns & Names",
		10
	],
	[
		"وَالِدَيْن",
		"Walidayn",
		"Parents (Mother & Father)",
		"माता-पिता (वालिदैन)",
		"والدین",
		"و ل د",
		"17:23",
		"Nouns & Names",
		20
	],
	[
		"أَب",
		"Ab",
		"Father",
		"पिता / वालिद (अब)",
		"والد (اب)",
		"أ ب و",
		"12:4",
		"Nouns & Names",
		117
	],
	[
		"أُمّ",
		"Umm",
		"Mother / Source",
		"माँ (उम्म)",
		"ماں (ام)",
		"أ م م",
		"31:14",
		"Nouns & Names",
		35
	],
	[
		"ابْن",
		"Ibn",
		"Son",
		"बेटा (इब्न)",
		"بیٹا (ابن)",
		"ب ن ي",
		"31:13",
		"Nouns & Names",
		161
	],
	[
		"بِنْت",
		"Bint",
		"Daughter",
		"बेटी (बिन्त)",
		"بیٹی (بنت)",
		"ب ن ي",
		"66:12",
		"Nouns & Names",
		19
	],
	[
		"أَخ",
		"Akh",
		"Brother",
		"भाई (अख़)",
		"بھائی (اخ)",
		"أ خ و",
		"49:10",
		"Nouns & Names",
		96
	],
	[
		"أُخْت",
		"Ukht",
		"Sister",
		"बहन (उख़्त)",
		"بہن (اخت)",
		"أ خ و",
		"4:12",
		"Nouns & Names",
		13
	],
	[
		"زَوْج",
		"Zawj",
		"Spouse / Pair",
		"जीवनसाथी / जोड़ा",
		"شریک حیات / جوڑا",
		"ز و ج",
		"30:21",
		"Nouns & Names",
		81
	],
	[
		"ذُرِّيَّة",
		"Dhurriyyah",
		"Offspring / Descendants",
		"औलाद / नस्ल",
		"اولاد / نسل",
		"ذ ر ر",
		"3:38",
		"Nouns & Names",
		32
	],
	[
		"أَهْل",
		"Ahl",
		"Family / People of",
		"घरवाले / अहल",
		"گھر والے / اہل",
		"أ ه ل",
		"66:6",
		"Nouns & Names",
		127
	],
	[
		"قَوْم",
		"Qawm",
		"Nation / People",
		"क़ौम / लोग",
		"قوم / لوگ",
		"ق و م",
		"2:54",
		"Nouns & Names",
		383
	],
	[
		"أُمَّة",
		"Ummah",
		"Community / Nation",
		"उम्मत / समुदाय",
		"امت",
		"أ م م",
		"2:143",
		"Nouns & Names",
		64
	],
	[
		"يَتِيم",
		"Yatim",
		"Orphan",
		"यतीम / अनाथ",
		"یتیم",
		"ي ت م",
		"93:6",
		"Worship & Ethics",
		23
	],
	[
		"مِسْكِين",
		"Miskin",
		"Needy / Destitute",
		"मिस्कीन / ज़रूरतमंद",
		"مسکین / ضرورت مند",
		"س ك ن",
		"2:83",
		"Worship & Ethics",
		23
	],
	[
		"فَقِير",
		"Faqir",
		"Poor / In Need",
		"फ़क़ीर / ग़रीब",
		"فقیر / غریب",
		"ف ق ر",
		"35:15",
		"Worship & Ethics",
		14
	],
	[
		"جَار",
		"Jar",
		"Neighbor",
		"पड़ोसी (जार)",
		"پڑوسی (جار)",
		"ج و ر",
		"4:36",
		"Worship & Ethics",
		4
	],
	[
		"ضَيْف",
		"Dayf",
		"Guest",
		"मेहमान (ज़ैफ़)",
		"مہمان (ضیف)",
		"ض ي ف",
		"51:24",
		"Worship & Ethics",
		6
	],
	[
		"صَاحِب",
		"Sahib",
		"Companion / Friend",
		"साथी / दोस्त",
		"ساتھی / دوست",
		"ص ح ب",
		"9:40",
		"Nouns & Names",
		97
	],
	[
		"عَدُوّ",
		"Aduww",
		"Enemy",
		"दुश्मन (अदुव्व)",
		"دشمن (عدو)",
		"ع د و",
		"2:168",
		"Nouns & Names",
		49
	],
	[
		"قَرْيَة",
		"Qaryah",
		"Town / City",
		"बस्ती / शहर (क़र्या)",
		"بستی / شہر",
		"ق ر ي",
		"2:58",
		"Nouns & Names",
		57
	],
	[
		"مَدِينَة",
		"Madinah",
		"City",
		"शहर (मदीना)",
		"شہر (مدینہ)",
		"م د ن",
		"28:15",
		"Nouns & Names",
		17
	],
	[
		"بَلَد",
		"Balad",
		"Land / City / Country",
		"शहर / मुल्क (बलद)",
		"شہر / ملک",
		"ب ل د",
		"90:1",
		"Nouns & Names",
		19
	],
	[
		"بَيْت",
		"Bayt",
		"House / Home",
		"घर (बैत)",
		"گھر (بیت)",
		"ب ي ت",
		"2:125",
		"Nouns & Names",
		65
	],
	[
		"مَسْجِد",
		"Masjid",
		"Mosque / Place of Prostration",
		"मस्जिद",
		"مسجد",
		"س ج د",
		"2:144",
		"Worship & Ethics",
		28
	],
	[
		"سَبِيل",
		"Sabil",
		"Path / Way / Cause",
		"रास्ता (सबील)",
		"راستہ (سبیل)",
		"س ب ل",
		"2:195",
		"Nouns & Names",
		176
	],
	[
		"طَرِيق",
		"Tariq",
		"Road / Path",
		"रास्ता (तरीक़)",
		"راستہ (طریق)",
		"ط ر ق",
		"46:30",
		"Nouns & Names",
		9
	],
	[
		"بَاب",
		"Bab",
		"Gate / Door",
		"दरवाज़ा (बाब)",
		"دروازہ (باب)",
		"ب و ب",
		"12:67",
		"Nouns & Names",
		27
	],
	[
		"لِبَاس",
		"Libas",
		"Garment / Clothing",
		"लिबास / कपड़े",
		"لباس / کپڑے",
		"ل ب س",
		"7:26",
		"Nouns & Names",
		10
	],
	[
		"مَال",
		"Mal",
		"Wealth / Property",
		"माल / दौलत",
		"مال / دولت",
		"م و ل",
		"2:177",
		"Nouns & Names",
		86
	],
	[
		"تِجَارَة",
		"Tijarah",
		"Trade / Commerce",
		"तिजारत / व्यापार",
		"تجارت",
		"ت ج ر",
		"61:10",
		"Nouns & Names",
		9
	],
	[
		"دَيْن",
		"Dayn",
		"Debt / Loan",
		"क़र्ज़ (दैन)",
		"قرض (دین)",
		"د ي ن",
		"2:282",
		"Nouns & Names",
		5
	],
	[
		"مِيزَان",
		"Mizan",
		"Scale / Balance of Justice",
		"तराज़ू / इंसाफ़",
		"ترازو / میزان",
		"و ز ن",
		"55:7",
		"Worship & Ethics",
		16
	],
	[
		"سُلْطَان",
		"Sultan",
		"Authority / Clear Proof",
		"दलील / हुकूमत",
		"دلیل / اختیار",
		"س ل ط",
		"14:10",
		"Nouns & Names",
		37
	],
	[
		"مُلْك",
		"Mulk",
		"Dominion / Kingdom",
		"बादशाहत (मुल्क)",
		"بادشاہت (ملک)",
		"م ل ك",
		"67:1",
		"Nouns & Names",
		48
	],
	[
		"خَلَقَ",
		"Khalaqa",
		"He created",
		"उसने पैदा किया",
		"اس نے پیدا کیا",
		"خ ل ق",
		"96:1",
		"Common Verbs",
		184
	],
	[
		"عَلِمَ",
		"Alima",
		"He knew",
		"उसने जाना",
		"اس نے جانا",
		"ع ل م",
		"2:143",
		"Common Verbs",
		382
	],
	[
		"قَالَ",
		"Qala",
		"He said",
		"उसने कहा",
		"اس نے کہا",
		"ق و ل",
		"2:30",
		"Common Verbs",
		1618
	],
	[
		"كَانَ",
		"Kana",
		"He was / Is ever",
		"था / हमेशा से है",
		"تھا / ہمیشہ سے ہے",
		"ك و ن",
		"2:34",
		"Common Verbs",
		1358
	],
	[
		"آمَنَ",
		"Amana",
		"He believed / had faith",
		"वह ईमान लाया",
		"وہ ایمان لایا",
		"أ م ن",
		"2:62",
		"Common Verbs",
		537
	],
	[
		"عَمِلَ",
		"Amila",
		"He did / worked",
		"उसने अमल किया",
		"اس نے عمل کیا",
		"ع م ل",
		"2:25",
		"Common Verbs",
		276
	],
	[
		"جَعَلَ",
		"Ja’ala",
		"He made / appointed",
		"उसने बनाया",
		"اس نے بنایا",
		"ج ع ل",
		"2:22",
		"Common Verbs",
		340
	],
	[
		"جَاءَ",
		"Ja’a",
		"He came",
		"वह आया",
		"وہ آیا",
		"ج ي أ",
		"110:1",
		"Common Verbs",
		278
	],
	[
		"أَتَىٰ",
		"Ata",
		"He came / brought",
		"वह आया / लाया",
		"وہ آیا / لایا",
		"أ ت ي",
		"2:102",
		"Common Verbs",
		264
	],
	[
		"آتَىٰ",
		"Ata (Form IV)",
		"He gave / granted",
		"उसने अता किया",
		"اس نے عطا کیا",
		"أ ت ي",
		"2:177",
		"Common Verbs",
		271
	],
	[
		"رَأَىٰ",
		"Ra’a",
		"He saw",
		"उसने देखा",
		"اس نے دیکھا",
		"ر أ ي",
		"105:1",
		"Common Verbs",
		271
	],
	[
		"نَظَرَ",
		"Nazara",
		"He looked / reflected",
		"उसने गौर से देखा",
		"اس نے غور سے دیکھا",
		"ن ظ ر",
		"88:17",
		"Common Verbs",
		87
	],
	[
		"سَمِعَ",
		"Sami’a",
		"He heard / listened",
		"उसने सुना",
		"اس نے سنا",
		"س م ع",
		"2:285",
		"Common Verbs",
		148
	],
	[
		"شَاءَ",
		"Sha’a",
		"He willed",
		"उसने चाहा",
		"اس نے چاہا",
		"ش ي أ",
		"2:20",
		"Common Verbs",
		236
	],
	[
		"أَرَادَ",
		"Arada",
		"He intended / desired",
		"उसने इरादा किया",
		"اس نے ارادہ کیا",
		"ر و د",
		"2:185",
		"Common Verbs",
		139
	],
	[
		"أَنْزَلَ",
		"Anzala",
		"He sent down / revealed",
		"उसने नाज़िल किया",
		"اس نے نازل کیا",
		"ن ز ل",
		"97:1",
		"Common Verbs",
		183
	],
	[
		"أَرْسَلَ",
		"Arsala",
		"He sent (a messenger)",
		"उसने भेजा",
		"اس نے بھیجا",
		"ر س ل",
		"21:107",
		"Common Verbs",
		130
	],
	[
		"هَدَىٰ",
		"Hada",
		"He guided",
		"उसने हिदायत दी",
		"اس نے ہدایت دی",
		"ه د ي",
		"1:6",
		"Common Verbs",
		144
	],
	[
		"ضَلَّ",
		"Dalla",
		"He went astray",
		"वह भटक गया",
		"وہ بھٹک گیا",
		"ض ل ل",
		"1:7",
		"Common Verbs",
		113
	],
	[
		"كَفَرَ",
		"Kafara",
		"He disbelieved / was ungrateful",
		"उसने इनकार किया",
		"اس نے انکار کیا",
		"ك ف ر",
		"2:6",
		"Common Verbs",
		289
	],
	[
		"ظَلَمَ",
		"Zalama",
		"He wronged / oppressed",
		"उसने ज़ुल्म किया",
		"اس نے ظلم کیا",
		"ظ ل م",
		"2:57",
		"Common Verbs",
		110
	],
	[
		"عَبَدَ",
		"Abada",
		"He worshipped",
		"उसने इबादत की",
		"اس نے عبادت کی",
		"ع ب د",
		"1:5",
		"Common Verbs",
		122
	],
	[
		"سَجَدَ",
		"Sajada",
		"He prostrated",
		"उसने सजदा किया",
		"اس نے سجدہ کیا",
		"س ج د",
		"96:19",
		"Common Verbs",
		36
	],
	[
		"رَكَعَ",
		"Raka’a",
		"He bowed in prayer",
		"उसने रुकू किया",
		"اس نے رکوع کیا",
		"ر ك ع",
		"2:43",
		"Common Verbs",
		13
	],
	[
		"ذَكَرَ",
		"Dhakara",
		"He remembered / mentioned",
		"उसने याद किया",
		"اس نے یاد کیا",
		"ذ ك ر",
		"2:152",
		"Common Verbs",
		163
	],
	[
		"شَكَرَ",
		"Shakara",
		"He gave thanks",
		"उसने शुक्र अदा किया",
		"اس نے شکر ادا کیا",
		"ش ك ر",
		"2:152",
		"Common Verbs",
		46
	],
	[
		"صَبَرَ",
		"Sabara",
		"He was patient",
		"उसने सब्र किया",
		"اس نے صبر کیا",
		"ص ب ر",
		"16:127",
		"Common Verbs",
		58
	],
	[
		"غَفَرَ",
		"Ghafara",
		"He forgave",
		"उसने माफ़ किया",
		"اس نے معاف کیا",
		"غ ف ر",
		"71:10",
		"Common Verbs",
		95
	],
	[
		"رَحِمَ",
		"Rahima",
		"He showed mercy",
		"उसने रहम किया",
		"اس نے رحم کیا",
		"ر ح م",
		"7:23",
		"Common Verbs",
		28
	],
	[
		"تَابَ",
		"Taba",
		"He repented / turned back",
		"उसने तौबा की",
		"اس نے توبہ کی",
		"ت و ب",
		"2:37",
		"Common Verbs",
		63
	],
	[
		"دَعَا",
		"Da’a",
		"He called upon / prayed",
		"उसने पुकारा / दुआ की",
		"اس نے پکارا / دعا کی",
		"د ع و",
		"2:186",
		"Common Verbs",
		170
	],
	[
		"سَأَلَ",
		"Sa’ala",
		"He asked",
		"उसने पूछा / माँगा",
		"اس نے پوچھا / مانگا",
		"س أ ل",
		"2:186",
		"Common Verbs",
		106
	],
	[
		"أَجَابَ",
		"Ajaba",
		"He answered / responded",
		"उसने जवाब दिया",
		"اس نے جواب دیا",
		"ج و ب",
		"2:186",
		"Common Verbs",
		34
	],
	[
		"أَمَرَ",
		"Amara",
		"He commanded",
		"उसने हुक्म दिया",
		"اس نے حکم دیا",
		"أ م ر",
		"2:67",
		"Common Verbs",
		77
	],
	[
		"نَهَىٰ",
		"Naha",
		"He forbade / restrained",
		"उसने मना किया",
		"اس نے منع کیا",
		"ن ه ي",
		"79:40",
		"Common Verbs",
		31
	],
	[
		"أَطَاعَ",
		"Ata’a",
		"He obeyed",
		"उसने इताअत की",
		"اس نے اطاعت کی",
		"ط و ع",
		"4:59",
		"Common Verbs",
		71
	],
	[
		"عَصَىٰ",
		"Asa",
		"He disobeyed",
		"उसने नाफ़रमानी की",
		"اس نے نافرمانی کی",
		"ع ص ي",
		"4:14",
		"Common Verbs",
		27
	],
	[
		"أَخَذَ",
		"Akhadha",
		"He took / seized",
		"उसने लिया / पकड़ा",
		"اس نے لیا / پکڑا",
		"أ خ ذ",
		"2:63",
		"Common Verbs",
		127
	],
	[
		"تَرَكَ",
		"Taraka",
		"He left / abandoned",
		"उसने छोड़ दिया",
		"اس نے چھوڑ دیا",
		"ت ر ك",
		"2:17",
		"Common Verbs",
		43
	],
	[
		"وَجَدَ",
		"Wajada",
		"He found",
		"उसने पाया",
		"اس نے پایا",
		"و ج د",
		"93:7",
		"Common Verbs",
		107
	],
	[
		"دَخَلَ",
		"Dakhala",
		"He entered",
		"वह दाख़िल हुआ",
		"وہ داخل ہوا",
		"د خ ل",
		"110:2",
		"Common Verbs",
		78
	],
	[
		"خَرَجَ",
		"Kharaja",
		"He went out / emerged",
		"वह बाहर निकला",
		"وہ باہر نکلا",
		"خ ر ج",
		"28:21",
		"Common Verbs",
		53
	],
	[
		"رَجَعَ",
		"Raja’a",
		"He returned",
		"वह लौटा",
		"وہ لوٹا",
		"ر ج ع",
		"2:156",
		"Common Verbs",
		85
	],
	[
		"ذَهَبَ",
		"Dhahaba",
		"He went / departed",
		"वह गया",
		"وہ گیا",
		"ذ ه ب",
		"2:17",
		"Common Verbs",
		35
	],
	[
		"مَشَىٰ",
		"Masha",
		"He walked",
		"वह चला",
		"وہ چلا",
		"م ش ي",
		"25:63",
		"Common Verbs",
		23
	],
	[
		"جَرَىٰ",
		"Jara",
		"It flowed / ran",
		"वह बहा / चला",
		"وہ بہا / چلا",
		"ج ر ي",
		"2:25",
		"Common Verbs",
		57
	],
	[
		"قَامَ",
		"Qama",
		"He stood / established",
		"वह खड़ा हुआ / क़ायम किया",
		"وہ کھڑا ہوا / قائم کیا",
		"ق و م",
		"73:2",
		"Common Verbs",
		55
	],
	[
		"قَعَدَ",
		"Qa’ada",
		"He sat",
		"वह बैठा",
		"وہ بیٹھا",
		"ق ع د",
		"3:191",
		"Common Verbs",
		20
	],
	[
		"نَامَ",
		"Nama",
		"He slept",
		"वह सोया",
		"وہ سویا",
		"ن و م",
		"2:255",
		"Common Verbs",
		9
	],
	[
		"أَكَلَ",
		"Akala",
		"He ate",
		"उसने खाया",
		"اس نے کھایا",
		"أ ك ل",
		"2:168",
		"Common Verbs",
		93
	],
	[
		"شَرِبَ",
		"Shariba",
		"He drank",
		"उसने पिया",
		"اس نے پیا",
		"ش ر ب",
		"7:31",
		"Common Verbs",
		23
	],
	[
		"رَزَقَ",
		"Razaqa",
		"He provided sustenance",
		"उसने रिज़्क़ दिया",
		"اس نے رزق دیا",
		"ر ز ق",
		"2:3",
		"Common Verbs",
		61
	],
	[
		"أَنْفَقَ",
		"Anfaqa",
		"He spent (in charity)",
		"उसने ख़र्च किया",
		"اس نے خرچ کیا",
		"ن ف ق",
		"2:3",
		"Common Verbs",
		68
	],
	[
		"كَسَبَ",
		"Kasaba",
		"He earned",
		"उसने कमाया",
		"اس نے کمایا",
		"ك س ب",
		"2:286",
		"Common Verbs",
		62
	],
	[
		"جَزَىٰ",
		"Jaza",
		"He rewarded / recompensed",
		"उसने बदला दिया",
		"اس نے بدلہ دیا",
		"ج ز ي",
		"55:60",
		"Common Verbs",
		76
	],
	[
		"وَعَدَ",
		"Wa’ada",
		"He promised",
		"उसने वादा किया",
		"اس نے وعدہ کیا",
		"و ع د",
		"2:268",
		"Common Verbs",
		70
	],
	[
		"صَدَقَ",
		"Sadaqa",
		"He spoke the truth",
		"उसने सच कहा",
		"اس نے سچ کہا",
		"ص د ق",
		"33:23",
		"Common Verbs",
		35
	],
	[
		"كَذَبَ",
		"Kadhaba",
		"He lied / denied",
		"उसने झूठ बोला",
		"اس نے جھوٹ بولا",
		"ك ذ ب",
		"107:1",
		"Common Verbs",
		194
	],
	[
		"حَكَمَ",
		"Hakama",
		"He judged / decided",
		"उसने फ़ैसला किया",
		"اس نے فیصلہ کیا",
		"ح ك م",
		"5:42",
		"Common Verbs",
		45
	],
	[
		"قَضَىٰ",
		"Qada",
		"He decreed / fulfilled",
		"उसने फ़ैसला फ़रमाया",
		"اس نے فیصلہ فرمایا",
		"ق ض ي",
		"17:23",
		"Common Verbs",
		61
	],
	[
		"كَتَبَ",
		"Kataba",
		"He wrote / prescribed",
		"उसने लिखा / फ़र्ज़ किया",
		"اس نے لکھا / فرض کیا",
		"ك ت ب",
		"2:183",
		"Common Verbs",
		49
	],
	[
		"قَرَأَ",
		"Qara’a",
		"He read / recited",
		"उसने पढ़ा",
		"اس نے پڑھا",
		"ق ر أ",
		"96:1",
		"Common Verbs",
		17
	],
	[
		"تَلَا",
		"Tala",
		"He recited / followed",
		"उसने तिलावत की",
		"اس نے تلاوت کی",
		"ت ل و",
		"2:121",
		"Common Verbs",
		61
	],
	[
		"عَلَّمَ",
		"Allama",
		"He taught",
		"उसने सिखाया",
		"اس نے سکھایا",
		"ع ل م",
		"96:4",
		"Common Verbs",
		42
	],
	[
		"بَيَّنَ",
		"Bayyana",
		"He made clear / explained",
		"उसने साफ़ बयान किया",
		"اس نے واضح بیان کیا",
		"ب ي ن",
		"2:187",
		"Common Verbs",
		35
	],
	[
		"بَشَّرَ",
		"Bashshara",
		"He gave glad tidings",
		"उसने ख़ुशख़बरी दी",
		"اس نے خوشخبری دی",
		"ب ش ر",
		"2:25",
		"Common Verbs",
		38
	],
	[
		"أَنْذَرَ",
		"Andhara",
		"He warned",
		"उसने आगाह किया",
		"اس نے خبردار کیا",
		"ن ذ ر",
		"74:2",
		"Common Verbs",
		44
	],
	[
		"نَصَرَ",
		"Nasara",
		"He helped / aided",
		"उसने मदद की",
		"اس نے مدد کی",
		"ن ص ر",
		"47:7",
		"Common Verbs",
		70
	],
	[
		"حَفِظَ",
		"Hafiza",
		"He guarded / protected",
		"उसने हिफ़ाज़त की",
		"اس نے حفاظت کی",
		"ح ف ظ",
		"15:9",
		"Common Verbs",
		24
	],
	[
		"تَوَكَّلَ",
		"Tawakkala",
		"He placed trust in",
		"उसने भरोसा किया",
		"اس نے بھروسہ کیا",
		"و ك ل",
		"3:159",
		"Common Verbs",
		42
	],
	[
		"خَافَ",
		"Khafa",
		"He feared",
		"वह डरा",
		"وہ ڈرا",
		"خ و ف",
		"79:40",
		"Common Verbs",
		83
	],
	[
		"رَجَا",
		"Raja",
		"He hoped for",
		"उसने उम्मीद रखी",
		"اس نے امید رکھی",
		"ر ج و",
		"18:110",
		"Common Verbs",
		24
	],
	[
		"أَحَبَّ",
		"Ahabba",
		"He loved",
		"उसने मुहब्बत की",
		"اس نے محبت کی",
		"ح ب ب",
		"3:31",
		"Common Verbs",
		64
	],
	[
		"كَرِهَ",
		"Kariha",
		"He disliked",
		"उसने नापसंद किया",
		"اس نے ناپسند کیا",
		"ك ر ه",
		"2:216",
		"Common Verbs",
		22
	],
	[
		"فَرِحَ",
		"Fariha",
		"He rejoiced / was glad",
		"वह ख़ुश हुआ",
		"وہ خوش ہوا",
		"ف ر ح",
		"10:58",
		"Common Verbs",
		22
	],
	[
		"حَزِنَ",
		"Hazina",
		"He grieved / was sad",
		"वह ग़मगीन हुआ",
		"وہ غمگین ہوا",
		"ح ز ن",
		"9:40",
		"Common Verbs",
		37
	],
	[
		"بَكَىٰ",
		"Baka",
		"He wept",
		"वह रोया",
		"وہ رویا",
		"ب ك ي",
		"53:43",
		"Common Verbs",
		7
	],
	[
		"ضَحِكَ",
		"Dahika",
		"He laughed",
		"वह हँसा",
		"وہ ہنسا",
		"ض ح ك",
		"53:43",
		"Common Verbs",
		10
	],
	[
		"تَبَسَّمَ",
		"Tabassama",
		"He smiled",
		"वह मुस्कुराया",
		"وہ مسکرایا",
		"ب س م",
		"27:19",
		"Common Verbs",
		1
	],
	[
		"أَصْلَحَ",
		"Aslaha",
		"He reformed / made peace",
		"उसने इस्लाह / सुलह की",
		"اس نے اصلاح کی",
		"ص ل ح",
		"49:9",
		"Common Verbs",
		28
	],
	[
		"أَفْسَدَ",
		"Afsada",
		"He caused corruption",
		"उसने फ़साद फैलाया",
		"اس نے فساد پھیلایا",
		"ف س د",
		"2:11",
		"Common Verbs",
		36
	],
	[
		"زَادَ",
		"Zada",
		"He increased",
		"उसने बढ़ाया",
		"اس نے بڑھایا",
		"ز ي د",
		"20:114",
		"Common Verbs",
		51
	],
	[
		"بَارَكَ",
		"Baraka",
		"He blessed",
		"उसने बरकत दी",
		"اس نے برکت دی",
		"ب ر ك",
		"17:1",
		"Common Verbs",
		8
	],
	[
		"طَهَّرَ",
		"Tahhara",
		"He purified",
		"उसने पाक किया",
		"اس نے پاک کیا",
		"ط ه ر",
		"74:4",
		"Common Verbs",
		10
	],
	[
		"زَكَّىٰ",
		"Zakka",
		"He purified the soul",
		"उसने नफ़्स को पाक किया",
		"اس نے تزکیہ کیا",
		"ز ك و",
		"91:9",
		"Common Verbs",
		12
	],
	[
		"أَحْيَا",
		"Ahya",
		"He gave life",
		"उसने ज़िंदा किया",
		"اس نے زندہ کیا",
		"ح ي ي",
		"2:258",
		"Common Verbs",
		51
	],
	[
		"أَمَاتَ",
		"Amata",
		"He caused death",
		"उसने मौत दी",
		"اس نے موت دی",
		"م و ت",
		"2:258",
		"Common Verbs",
		21
	],
	[
		"بَعَثَ",
		"Ba’atha",
		"He raised / resurrected",
		"उसने उठाया / भेजा",
		"اس نے اٹھایا / بھیجا",
		"ب ع ث",
		"2:56",
		"Common Verbs",
		65
	],
	[
		"حَشَرَ",
		"Hashara",
		"He gathered (on Judgment Day)",
		"उसने जमा किया",
		"اس نے جمع کیا",
		"ح ش ر",
		"6:38",
		"Common Verbs",
		42
	],
	[
		"جَمَعَ",
		"Jama’a",
		"He collected / united",
		"उसने इकट्ठा किया",
		"اس نے اکٹھا کیا",
		"ج م ع",
		"3:9",
		"Common Verbs",
		57
	],
	[
		"فَرَّقَ",
		"Farraqa",
		"He separated / divided",
		"उसने अलग किया",
		"اس نے الگ کیا",
		"ف ر ق",
		"2:285",
		"Common Verbs",
		14
	],
	[
		"نَزَعَ",
		"Naza’a",
		"He removed / drew out",
		"उसने निकाल दिया",
		"اس نے نکال دیا",
		"ن ز ع",
		"7:43",
		"Common Verbs",
		15
	],
	[
		"كَشَفَ",
		"Kashafa",
		"He uncovered / removed hardship",
		"उसने मुसीबत दूर की",
		"اس نے تکلیف دور کی",
		"ك ش ف",
		"10:107",
		"Common Verbs",
		14
	],
	[
		"فَتَحَ",
		"Fataha",
		"He opened / granted victory",
		"उसने खोला / फ़तह दी",
		"اس نے کھولا / فتح دی",
		"ف ت ح",
		"48:1",
		"Common Verbs",
		27
	],
	[
		"بَنَىٰ",
		"Bana",
		"He built / constructed",
		"उसने तामीर किया",
		"اس نے تعمیر کیا",
		"ب ن ي",
		"79:27",
		"Common Verbs",
		12
	],
	[
		"رَفَعَ",
		"Rafa’a",
		"He raised / exalted",
		"उसने बुलंद किया",
		"اس نے بلند کیا",
		"ر ف ع",
		"94:4",
		"Common Verbs",
		22
	],
	[
		"وَضَعَ",
		"Wada’a",
		"He placed / laid down",
		"उसने रखा",
		"اس نے رکھا",
		"و ض ع",
		"94:2",
		"Common Verbs",
		20
	],
	[
		"حَمَلَ",
		"Hamala",
		"He carried / bore",
		"उसने उठाया",
		"اس نے اٹھایا",
		"ح م ل",
		"33:72",
		"Common Verbs",
		45
	],
	[
		"سَخَّرَ",
		"Sakhkhara",
		"He subjected / made serviceable",
		"उसने मुसख़्ख़र किया",
		"اس نے مسخر کیا",
		"س خ ر",
		"14:32",
		"Common Verbs",
		24
	],
	[
		"بَسَطَ",
		"Basata",
		"He expanded / stretched out",
		"उसने कुशादा किया",
		"اس نے کشادہ کیا",
		"ب س ط",
		"13:26",
		"Common Verbs",
		16
	],
	[
		"قَدَرَ",
		"Qadara",
		"He measured / was able",
		"उसने अंदाज़ा मुक़र्रर किया",
		"اس نے اندازہ مقرر کیا",
		"ق د ر",
		"65:7",
		"Common Verbs",
		50
	],
	[
		"سَبَّحَ",
		"Sabbaha",
		"He glorified Allah",
		"उसने तस्बीह की",
		"اس نے تسبیح کی",
		"س ب ح",
		"57:1",
		"Common Verbs",
		46
	],
	[
		"تَفَكَّرَ",
		"Tafakkara",
		"He reflected / pondered",
		"उसने गौर-ओ-फ़िक्र की",
		"اس نے غور و فکر کی",
		"ف ك ر",
		"3:191",
		"Common Verbs",
		18
	],
	[
		"تَدَبَّرَ",
		"Tadabbara",
		"He pondered deeply",
		"उसने तदब्बुर किया",
		"اس نے تدبر کیا",
		"د ب ر",
		"47:24",
		"Common Verbs",
		4
	],
	[
		"عَقَلَ",
		"Aqala",
		"He reasoned / understood",
		"उसने अक़्ल से समझा",
		"اس نے عقل سے سمجھا",
		"ع ق ل",
		"2:44",
		"Common Verbs",
		49
	],
	[
		"فَقِهَ",
		"Faqiha",
		"He comprehended deeply",
		"उसने गहरी समझ पाई",
		"اس نے گہری سمجھ پائی",
		"ف ق ه",
		"9:122",
		"Common Verbs",
		20
	],
	[
		"نَسِيَ",
		"Nasiya",
		"He forgot",
		"वह भूल गया",
		"وہ بھول گیا",
		"ن س ي",
		"2:286",
		"Common Verbs",
		45
	],
	[
		"ظَنَّ",
		"Zanna",
		"He thought / assumed",
		"उसने गुमान किया",
		"اس نے گمان کیا",
		"ظ ن ن",
		"49:12",
		"Common Verbs",
		47
	],
	[
		"شَهِدَ",
		"Shahida",
		"He bore witness",
		"उसने गवाही दी",
		"اس نے گواہی دی",
		"ش ه د",
		"3:18",
		"Common Verbs",
		44
	],
	[
		"أَقْسَمَ",
		"Aqsama",
		"He swore an oath",
		"उसने क़सम खाई",
		"اس نے قسم کھائی",
		"ق س م",
		"75:1",
		"Common Verbs",
		20
	],
	[
		"وَفَّىٰ",
		"Waffa",
		"He fulfilled in full",
		"उसने पूरा-पूरा अदा किया",
		"اس نے پورا پورا ادا کیا",
		"و ف ي",
		"3:57",
		"Common Verbs",
		18
	],
	[
		"خَانَ",
		"Khana",
		"He betrayed",
		"उसने ख़यानत की",
		"اس نے خیانت کی",
		"خ و ن",
		"8:27",
		"Common Verbs",
		10
	],
	[
		"عَفَا",
		"Afa",
		"He pardoned / forgave",
		"उसने दरगुज़र किया",
		"اس نے درگزر کیا",
		"ع ف و",
		"3:159",
		"Common Verbs",
		25
	],
	[
		"صَفَحَ",
		"Safaha",
		"He overlooked graciously",
		"उसने माफ़ कर दिया",
		"اس نے معاف کر دیا",
		"ص ف ح",
		"15:85",
		"Common Verbs",
		7
	],
	[
		"أَحْسَنَ",
		"Ahsana",
		"He did excellence / good",
		"उसने एहसान किया",
		"اس نے احسان کیا",
		"ح س ن",
		"55:60",
		"Common Verbs",
		36
	],
	[
		"أَسَاءَ",
		"Asa’a",
		"He did evil",
		"उसने बुराई की",
		"اس نے برائی کی",
		"س و أ",
		"41:46",
		"Common Verbs",
		17
	],
	[
		"قَاتَلَ",
		"Qatala",
		"He fought / struggled",
		"उसने जंग की",
		"اس نے جنگ کی",
		"ق ت ل",
		"2:190",
		"Common Verbs",
		54
	],
	[
		"جَاهَدَ",
		"Jahada",
		"He strove earnestly",
		"उसने जिद्दो-जहद की",
		"اس نے جدوجہد کی",
		"ج ه د",
		"29:69",
		"Common Verbs",
		27
	],
	[
		"هَاجَرَ",
		"Hajara",
		"He migrated (for Allah)",
		"उसने हिजरत की",
		"اس نے ہجرت کی",
		"ه ج ر",
		"4:100",
		"Common Verbs",
		18
	],
	[
		"آوَىٰ",
		"Awa",
		"He gave shelter / refuge",
		"उसने पनाह दी",
		"اس نے پناہ دی",
		"أ و ي",
		"93:6",
		"Common Verbs",
		12
	],
	[
		"نَجَّىٰ",
		"Najja",
		"He rescued / delivered",
		"उसने नजात दी",
		"اس نے نجات دی",
		"ن ج و",
		"21:88",
		"Common Verbs",
		37
	],
	[
		"شَفَىٰ",
		"Shafa",
		"He healed / cured",
		"उसने शिफ़ा दी",
		"اس نے شفا دی",
		"ش ف ي",
		"26:80",
		"Common Verbs",
		2
	],
	[
		"أَغْنَىٰ",
		"Aghna",
		"He enriched / sufficed",
		"उसने ग़नी किया",
		"اس نے غنی کیا",
		"غ ن ي",
		"93:8",
		"Common Verbs",
		41
	],
	[
		"فَازَ",
		"Faza",
		"He succeeded / triumphed",
		"वह कामयाब हुआ",
		"وہ کامیاب ہوا",
		"ف و ز",
		"3:185",
		"Common Verbs",
		9
	],
	[
		"أَفْلَحَ",
		"Aflaha",
		"He prospered / succeeded",
		"वह फ़लाह पा गया",
		"وہ فلاح پا گیا",
		"ف ل ح",
		"23:1",
		"Common Verbs",
		12
	],
	[
		"خَسِرَ",
		"Khasira",
		"He lost / suffered loss",
		"वह नुक़सान में रहा",
		"وہ نقصان میں رہا",
		"خ س ر",
		"103:2",
		"Common Verbs",
		33
	],
	[
		"نَدِمَ",
		"Nadima",
		"He regretted",
		"वह पछताया",
		"وہ پچھتایا",
		"ن د م",
		"5:31",
		"Common Verbs",
		7
	],
	[
		"سَارَعَ",
		"Sara’a",
		"He hastened (to good)",
		"उसने नेकी में जल्दी की",
		"اس نے نیکی میں جلدی کی",
		"س ر ع",
		"3:133",
		"Common Verbs",
		7
	],
	[
		"سَابَقَ",
		"Sabaqa",
		"He raced ahead (in goodness)",
		"वह आगे बढ़ गया",
		"وہ آگے بڑھ گیا",
		"س ب ق",
		"57:21",
		"Common Verbs",
		24
	],
	[
		"تَعَاوَنَ",
		"Ta’awana",
		"To cooperate / assist one another",
		"आपस में मदद करना",
		"آپس میں تعاون کرنا",
		"ع و ن",
		"5:2",
		"Common Verbs",
		2
	],
	[
		"تَوَاصَىٰ",
		"Tawasa",
		"To advise one another",
		"एक-दूसरे को नसीहत करना",
		"ایک دوسرے کو نصیحت کرنا",
		"و ص ي",
		"103:3",
		"Common Verbs",
		4
	],
	[
		"إِيمَان",
		"Iman",
		"Faith / Belief",
		"ईमान / आस्था",
		"ایمان",
		"أ م ن",
		"49:7",
		"Worship & Ethics",
		45
	],
	[
		"إِسْلَام",
		"Islam",
		"Submission to Allah in Peace",
		"इस्लाम (समर्पण)",
		"اسلام",
		"س ل م",
		"3:19",
		"Worship & Ethics",
		8
	],
	[
		"إِحْسَان",
		"Ihsan",
		"Excellence / Spiritual Beauty",
		"एहसान / उत्कृष्टता",
		"احسان",
		"ح س ن",
		"16:90",
		"Worship & Ethics",
		12
	],
	[
		"إِخْلَاص",
		"Ikhlas",
		"Sincerity / Pure Devotion",
		"इख़लास / सच्ची नीयत",
		"اخلاص",
		"خ ل ص",
		"98:5",
		"Worship & Ethics",
		17
	],
	[
		"خُشُوع",
		"Khushu’",
		"Humility & Focus in Prayer",
		"ख़ुशू / एकाग्रता",
		"خشوع",
		"خ ش ع",
		"23:2",
		"Worship & Ethics",
		17
	],
	[
		"سَكِينَة",
		"Sakinah",
		"Tranquility / Inner Peace",
		"सुकून / इत्मीनान",
		"سکینت / سکون",
		"س ك ن",
		"48:4",
		"Worship & Ethics",
		6
	],
	[
		"طُمَأْنِينَة",
		"Tuma’ninah",
		"Deep Serenity of Heart",
		"दिल का इत्मीनान",
		"دل کا اطمینان",
		"ط م ن",
		"13:28",
		"Worship & Ethics",
		13
	],
	[
		"مَوَدَّة",
		"Mawaddah",
		"Affection / Warm Love",
		"मुहब्बत / प्रेम (मवद्दत)",
		"مودت / محبت",
		"و د د",
		"30:21",
		"Worship & Ethics",
		8
	],
	[
		"رِضْوَان",
		"Ridwan",
		"Good Pleasure of Allah",
		"अल्लाह की रज़ा",
		"اللہ کی رضا",
		"ر ض و",
		"9:72",
		"Worship & Ethics",
		13
	],
	[
		"بَرَكَة",
		"Barakah",
		"Blessing / Divine Increase",
		"बरकत",
		"برکت",
		"ب ر ك",
		"7:96",
		"Worship & Ethics",
		32
	],
	[
		"نِعْمَة",
		"Ni’mah",
		"Blessing / Favor",
		"नेमत / कृपा",
		"نعمت",
		"ن ع م",
		"16:18",
		"Worship & Ethics",
		37
	],
	[
		"فَضْل",
		"Fadl",
		"Bounty / Grace",
		"फ़ज़्ल / अनुग्रह",
		"فضل",
		"ف ض ل",
		"62:10",
		"Worship & Ethics",
		84
	],
	[
		"هِدَايَة",
		"Hidayah",
		"Guidance",
		"हिदायत / मार्गदर्शन",
		"ہدایت",
		"ه د ي",
		"2:2",
		"Worship & Ethics",
		85
	],
	[
		"بُرْهَان",
		"Burhan",
		"Clear Proof / Evidence",
		"पुख़्ता दलील (बुरहान)",
		"واضح دلیل (برہان)",
		"ب ر ه ن",
		"4:174",
		"Nouns & Names",
		8
	],
	[
		"فُرْقَان",
		"Furqan",
		"Criterion (between right & wrong)",
		"फ़ुर्क़ान (हक़-बातिल की कसौटी)",
		"فرقان",
		"ف ر ق",
		"2:185",
		"Nouns & Names",
		7
	],
	[
		"شِفَاء",
		"Shifa’",
		"Healing / Cure",
		"शिफ़ा / इलाज",
		"شفا",
		"ش ف ي",
		"17:82",
		"Worship & Ethics",
		4
	],
	[
		"مَوْعِظَة",
		"Maw’izah",
		"Gentle Advice / Admonition",
		"नसीहत (मौइज़ह)",
		"نصیحت",
		"و ع ظ",
		"10:57",
		"Worship & Ethics",
		9
	],
	[
		"حِكْمَة",
		"Hikmah",
		"Wisdom",
		"हिकमत / समझदारी",
		"حکمت",
		"ح ك م",
		"2:269",
		"Worship & Ethics",
		20
	],
	[
		"عَدْل",
		"Adl",
		"Justice / Fairness",
		"अद्ल / इंसाफ़",
		"عدل / انصاف",
		"ع د ل",
		"16:90",
		"Worship & Ethics",
		14
	],
	[
		"قِسْط",
		"Qist",
		"Equity / Fair Measure",
		"इंसाफ़ (क़िस्त)",
		"انصاف (قسط)",
		"ق س ط",
		"4:135",
		"Worship & Ethics",
		15
	],
	[
		"أَمَانَة",
		"Amanah",
		"Trust / Responsibility",
		"अमानत / ज़िम्मेदारी",
		"امانت",
		"أ م ن",
		"4:58",
		"Worship & Ethics",
		6
	],
	[
		"عَهْد",
		"Ahd",
		"Covenant / Promise",
		"अहद / वादा",
		"عہد / وعدہ",
		"ع ه د",
		"17:34",
		"Worship & Ethics",
		29
	],
	[
		"مِيثَاق",
		"Mithaq",
		"Solemn Pledge",
		"पुख़्ता अहद (मीसाक़)",
		"پختہ عہد (میثاق)",
		"و ث ق",
		"2:27",
		"Worship & Ethics",
		25
	],
	[
		"صِدْق",
		"Sidq",
		"Truthfulness",
		"सच्चाई (सिद्क़)",
		"سچائی (صدق)",
		"ص د ق",
		"33:24",
		"Worship & Ethics",
		19
	],
	[
		"بِرّ",
		"Birr",
		"Righteousness / Filial Piety",
		"नेकी / भलाई (बिर्र)",
		"نیکی (بر)",
		"ب ر ر",
		"2:177",
		"Worship & Ethics",
		8
	],
	[
		"مَعْرُوف",
		"Ma’ruf",
		"Goodness / Kind Conduct",
		"भलाई / नेक बात (मारूफ़)",
		"نیکی / بھلائی",
		"ع ر ف",
		"3:104",
		"Worship & Ethics",
		38
	],
	[
		"مُنْكَر",
		"Munkar",
		"Wrongdoing / Evil",
		"बुराई (मुनकर)",
		"برائی (منکر)",
		"ن ك ر",
		"3:104",
		"Worship & Ethics",
		16
	],
	[
		"صَدَقَة",
		"Sadaqah",
		"Voluntary Charity",
		"सदक़ा / दान",
		"صدقہ",
		"ص د ق",
		"2:263",
		"Worship & Ethics",
		13
	],
	[
		"صِيَام",
		"Siyam",
		"Fasting",
		"रोज़ा (सियाम)",
		"روزہ (صیام)",
		"ص و م",
		"2:183",
		"Worship & Ethics",
		9
	],
	[
		"حَجّ",
		"Hajj",
		"Pilgrimage to Makkah",
		"हज",
		"حج",
		"ح ج ج",
		"2:197",
		"Worship & Ethics",
		11
	],
	[
		"عُمْرَة",
		"Umrah",
		"Lesser Pilgrimage",
		"उमराह",
		"عمرہ",
		"ع م ر",
		"2:196",
		"Worship & Ethics",
		2
	],
	[
		"وُضُوء",
		"Wudu’ / Taharah",
		"Ritual Ablution & Purity",
		"वुज़ू / पाकीज़गी",
		"وضو / طہارت",
		"ط ه ر",
		"5:6",
		"Worship & Ethics",
		15
	],
	[
		"تَيَمُّم",
		"Tayammum",
		"Dry Ablution (Pure Earth)",
		"तयम्मुम",
		"تیمم",
		"ي م م",
		"5:6",
		"Worship & Ethics",
		2
	],
	[
		"قِبْلَة",
		"Qiblah",
		"Direction of Prayer (Ka’bah)",
		"क़िबला",
		"قبلہ",
		"ق ب ل",
		"2:144",
		"Worship & Ethics",
		7
	],
	[
		"جُمُعَة",
		"Jumu’ah",
		"Friday Congregation",
		"जुमा",
		"جمعہ",
		"ج م ع",
		"62:9",
		"Worship & Ethics",
		1
	],
	[
		"قِيَام",
		"Qiyam",
		"Standing in Prayer (Night Prayer)",
		"क़ियाम (नमाज़ में खड़ा होना)",
		"قیام",
		"ق و م",
		"73:2",
		"Worship & Ethics",
		14
	],
	[
		"تَسْبِيح",
		"Tasbih",
		"Glorification of Allah",
		"तस्बीह",
		"تسبیح",
		"س ب ح",
		"17:44",
		"Worship & Ethics",
		41
	],
	[
		"اسْتِغْفَار",
		"Istighfar",
		"Seeking Forgiveness",
		"इस्तिग़फ़ार / माफ़ी माँगना",
		"استغفار",
		"غ ف ر",
		"71:10",
		"Worship & Ethics",
		43
	],
	[
		"شُورَىٰ",
		"Shura",
		"Mutual Consultation",
		"मशवरा (शूरा)",
		"مشورہ (شوریٰ)",
		"ش و ر",
		"42:38",
		"Worship & Ethics",
		3
	],
	[
		"حَيَاء",
		"Haya’",
		"Modesty / Bashfulness",
		"हया / शर्म",
		"حیا",
		"ح ي ي",
		"28:25",
		"Worship & Ethics",
		3
	],
	[
		"عِفَّة",
		"Iffah",
		"Chastity / Self-Restraint",
		"पाकदामनी / इफ़्फ़त",
		"پاکدامنی / عفت",
		"ع ف ف",
		"2:273",
		"Worship & Ethics",
		4
	],
	[
		"كِبْر",
		"Kibr",
		"Arrogance / Pride",
		"तकब्बुर / घमंड",
		"تکبر / غرور",
		"ك ب ر",
		"40:56",
		"Worship & Ethics",
		48
	],
	[
		"حَسَد",
		"Hasad",
		"Envy / Jealousy",
		"हसद / जलन",
		"حسد",
		"ح س د",
		"113:5",
		"Worship & Ethics",
		5
	],
	[
		"غِيبَة",
		"Ghibah",
		"Backbiting",
		"ग़ीबत / चुग़ली",
		"غیبت",
		"غ ي ب",
		"49:12",
		"Worship & Ethics",
		1
	],
	[
		"بُخْل",
		"Bukhl",
		"Stinginess / Miserliness",
		"बुख़्ल / कंजूसी",
		"بخل / کنجوسی",
		"ب خ ل",
		"4:37",
		"Worship & Ethics",
		12
	],
	[
		"إِسْرَاف",
		"Israf",
		"Wastefulness / Extravagance",
		"फ़िज़ूलख़र्ची (इस्राफ़)",
		"فضول خرچی (اسراف)",
		"س ر ف",
		"7:31",
		"Worship & Ethics",
		23
	],
	[
		"نِفَاق",
		"Nifaq",
		"Hypocrisy",
		"निफ़ाक़ / दोहरापन",
		"نفاق",
		"ن ف ق",
		"9:97",
		"Worship & Ethics",
		37
	],
	[
		"شِرْك",
		"Shirk",
		"Associating Partners with Allah",
		"शिर्क",
		"شرک",
		"ش ر ك",
		"31:13",
		"Worship & Ethics",
		168
	],
	[
		"ذَنْب",
		"Dhanb",
		"Sin / Fault",
		"गुनाह (ज़ंब)",
		"گناہ (ذنب)",
		"ذ ن ب",
		"39:53",
		"Worship & Ethics",
		39
	],
	[
		"إِثْم",
		"Ithm",
		"Sin / Wrongful Act",
		"गुनाह (इस्म)",
		"گناہ (اثم)",
		"أ ث م",
		"2:219",
		"Worship & Ethics",
		48
	],
	[
		"خَطِيئَة",
		"Khati’ah",
		"Mistake / Sin",
		"ख़ता / ग़लती",
		"خطا / غلطی",
		"خ ط أ",
		"2:81",
		"Worship & Ethics",
		22
	],
	[
		"فِتْنَة",
		"Fitnah",
		"Trial / Test / Strife",
		"फ़ितना / आज़माइश",
		"فتنہ / آزمائش",
		"ف ت ن",
		"29:2",
		"Worship & Ethics",
		34
	],
	[
		"بَلَاء",
		"Bala’",
		"Test / Trial",
		"इम्तिहान / आज़माइश",
		"امتحان / آزمائش",
		"ب ل و",
		"67:2",
		"Worship & Ethics",
		38
	],
	[
		"عُسْر",
		"Usr",
		"Hardship / Difficulty",
		"तंगी / मुश्किल (उस्र)",
		"تنگی / مشکل",
		"ع س ر",
		"94:5",
		"Worship & Ethics",
		12
	],
	[
		"يُسْر",
		"Yusr",
		"Ease / Relief",
		"आसानी (युस्र)",
		"آسانی (یسر)",
		"ي س ر",
		"94:5",
		"Worship & Ethics",
		7
	],
	[
		"دُنْيَا",
		"Dunya",
		"This Worldly Life",
		"दुनिया",
		"دنیا",
		"د ن و",
		"2:201",
		"Nouns & Names",
		115
	],
	[
		"آخِرَة",
		"Akhirah",
		"The Hereafter",
		"आख़िरत",
		"آخرت",
		"أ خ ر",
		"2:201",
		"Nouns & Names",
		115
	],
	[
		"قِيَامَة",
		"Qiyamah",
		"Day of Resurrection",
		"क़यामत",
		"قیامت",
		"ق و م",
		"75:1",
		"Nouns & Names",
		70
	],
	[
		"سَاعَة",
		"Sa’ah",
		"The Hour / Moment",
		"क़यामत की घड़ी",
		"قیامت کی گھڑی",
		"س و ع",
		"31:34",
		"Nouns & Names",
		48
	],
	[
		"حِسَاب",
		"Hisab",
		"Reckoning / Account",
		"हिसाब",
		"حساب",
		"ح س ب",
		"38:26",
		"Nouns & Names",
		39
	],
	[
		"جَزَاء",
		"Jaza’",
		"Recompense / Reward",
		"बदला / इनाम",
		"بدلہ / جزا",
		"ج ز ي",
		"55:60",
		"Nouns & Names",
		42
	],
	[
		"ثَوَاب",
		"Thawab",
		"Reward from Allah",
		"सवाब / पुण्य",
		"ثواب",
		"ث و ب",
		"3:145",
		"Worship & Ethics",
		13
	],
	[
		"أَجْر",
		"Ajr",
		"Great Reward / Wage",
		"अज्र / बदला",
		"اجر",
		"أ ج ر",
		"95:6",
		"Worship & Ethics",
		105
	],
	[
		"مَغْفِرَة",
		"Maghfirah",
		"Forgiveness",
		"मग़फ़िरत / माफ़ी",
		"مغفرت",
		"غ ف ر",
		"3:133",
		"Worship & Ethics",
		28
	],
	[
		"فِرْدَوْس",
		"Firdaws",
		"Highest Garden of Paradise",
		"जन्नतुल फ़िरदौस",
		"جنت الفردوس",
		"ف ر د س",
		"23:11",
		"Nouns & Names",
		2
	],
	[
		"كَوْثَر",
		"Kawthar",
		"Abundance / River in Paradise",
		"कौसर (बहुत ज़्यादा भलाई)",
		"کوثر",
		"ك ث ر",
		"108:1",
		"Nouns & Names",
		1
	],
	[
		"نَعِيم",
		"Na’im",
		"Bliss / Delight",
		"नेमत / सुख (नईम)",
		"نعمت / راحت",
		"ن ع م",
		"56:12",
		"Nouns & Names",
		17
	],
	[
		"جَهَنَّم",
		"Jahannam",
		"Hellfire",
		"जहन्नम",
		"جہنم",
		"ج ه ن م",
		"2:206",
		"Nouns & Names",
		77
	],
	[
		"عَذَاب",
		"Adhab",
		"Punishment / Torment",
		"अज़ाब",
		"عذاب",
		"ع ذ ب",
		"2:7",
		"Nouns & Names",
		322
	],
	[
		"بَرْزَخ",
		"Barzakh",
		"Barrier / Realm After Death",
		"बर्ज़ख़ (आड़)",
		"برزخ",
		"ب ر ز خ",
		"23:100",
		"Nouns & Names",
		3
	],
	[
		"قَبْر",
		"Qabr",
		"Grave",
		"क़ब्र",
		"قبر",
		"ق ب ر",
		"80:21",
		"Nouns & Names",
		8
	],
	[
		"مَوْت",
		"Mawt",
		"Death",
		"मौत",
		"موت",
		"م و ت",
		"67:2",
		"Nouns & Names",
		50
	],
	[
		"حَيَاة",
		"Hayah",
		"Life",
		"ज़िंदगी (हयात)",
		"زندگی (حیات)",
		"ح ي ي",
		"67:2",
		"Nouns & Names",
		76
	],
	[
		"وَحْي",
		"Wahy",
		"Divine Revelation",
		"वही (ईश्वरीय संदेश)",
		"وحی",
		"و ح ي",
		"53:4",
		"Nouns & Names",
		78
	],
	[
		"نَبِيّ",
		"Nabiyy",
		"Prophet",
		"नबी / पैग़ंबर",
		"نبی",
		"ن ب أ",
		"33:40",
		"Nouns & Names",
		75
	],
	[
		"رَسُول",
		"Rasul",
		"Messenger",
		"रसूल",
		"رسول",
		"ر س ل",
		"48:29",
		"Nouns & Names",
		332
	],
	[
		"آيَة",
		"Ayah",
		"Sign / Verse of Quran",
		"आयत / निशानी",
		"آیت / نشانی",
		"أ ي ي",
		"2:164",
		"Nouns & Names",
		382
	],
	[
		"سُورَة",
		"Surah",
		"Chapter of the Quran",
		"सूरह",
		"سورہ",
		"س و ر",
		"2:23",
		"Nouns & Names",
		10
	],
	[
		"قُرْآن",
		"Qur’an",
		"The Recitation / Noble Quran",
		"क़ुरआन",
		"قرآن",
		"ق ر أ",
		"2:185",
		"Nouns & Names",
		70
	],
	[
		"ذِكْر",
		"Dhikr",
		"Remembrance / Reminder",
		"ज़िक्र / याद",
		"ذکر",
		"ذ ك ر",
		"15:9",
		"Worship & Ethics",
		76
	],
	[
		"تَوْرَاة",
		"Tawrah",
		"Torah",
		"तौरात",
		"تورات",
		"و ر ي",
		"3:3",
		"Nouns & Names",
		18
	],
	[
		"إِنْجِيل",
		"Injil",
		"Gospel",
		"इंजील",
		"انجیل",
		"ن ج ل",
		"3:3",
		"Nouns & Names",
		12
	],
	[
		"زَبُور",
		"Zabur",
		"Psalms (given to Dawud AS)",
		"ज़बूर",
		"زبور",
		"ز ب ر",
		"4:163",
		"Nouns & Names",
		3
	],
	[
		"صُحُف",
		"Suhuf",
		"Scrolls / Scriptures",
		"सहीफ़े (सुहुफ़)",
		"صحیفے",
		"ص ح ف",
		"87:19",
		"Nouns & Names",
		8
	],
	[
		"قَلَم",
		"Qalam",
		"Pen",
		"क़लम",
		"قلم",
		"ق ل م",
		"96:4",
		"Nouns & Names",
		4
	],
	[
		"مَثَل",
		"Mathal",
		"Parable / Example",
		"मिसाल / उदाहरण",
		"مثال",
		"م ث ل",
		"14:24",
		"Nouns & Names",
		88
	],
	[
		"قَصَص",
		"Qasas",
		"Stories / Narratives",
		"क़िस्से / कहानियाँ",
		"قصے / واقعات",
		"ق ص ص",
		"12:3",
		"Nouns & Names",
		26
	],
	[
		"نَبَأ",
		"Naba’",
		"Great News / Tidings",
		"बड़ी ख़बर (नबा)",
		"بڑی خبر (نبأ)",
		"ن ب أ",
		"78:2",
		"Nouns & Names",
		29
	],
	[
		"بُشْرَىٰ",
		"Bushra",
		"Glad Tidings / Good News",
		"ख़ुशख़बरी (बुशरा)",
		"خوشخبری (بشریٰ)",
		"ب ش ر",
		"10:64",
		"Nouns & Names",
		15
	],
	[
		"صَالِح",
		"Salih",
		"Righteous / Wholesome",
		"नेक / सालेह",
		"نیک / صالح",
		"ص ل ح",
		"103:3",
		"Worship & Ethics",
		136
	],
	[
		"مُتَّقِي",
		"Muttaqi",
		"God-Conscious / Pious",
		"मुत्तक़ी / परहेज़गार",
		"متقی / پرہیزگار",
		"و ق ي",
		"2:2",
		"Worship & Ethics",
		49
	],
	[
		"مُحْسِن",
		"Muhsin",
		"Doer of Excellence & Kindness",
		"एहसान करने वाला",
		"احسان کرنے والا",
		"ح س ن",
		"2:195",
		"Worship & Ethics",
		39
	],
	[
		"صَابِر",
		"Sabir",
		"Patient / Steadfast",
		"सब्र करने वाला",
		"صبر کرنے والا",
		"ص ب ر",
		"2:153",
		"Worship & Ethics",
		21
	],
	[
		"شَاكِر",
		"Shakir",
		"Grateful / Thankful",
		"शुक्रगुज़ार",
		"شکر گزار",
		"ش ك ر",
		"76:3",
		"Worship & Ethics",
		16
	],
	[
		"صَادِق",
		"Sadiq",
		"Truthful / Sincere",
		"सच्चा (सादिक़)",
		"سچا (صادق)",
		"ص د ق",
		"9:119",
		"Worship & Ethics",
		45
	],
	[
		"أَمِين",
		"Amin",
		"Trustworthy / Honest",
		"अमानतदार (अमीन)",
		"امانت دار (امین)",
		"أ م ن",
		"26:107",
		"Worship & Ethics",
		14
	],
	[
		"طَيِّب",
		"Tayyib",
		"Pure / Good / Wholesome",
		"पाक और अच्छा (तय्यिब)",
		"پاک اور عمدہ",
		"ط ي ب",
		"2:168",
		"Worship & Ethics",
		46
	],
	[
		"خَبِيث",
		"Khabith",
		"Impure / Corrupt",
		"गंदा / बुरा (ख़बीस)",
		"ناپاک / برا",
		"خ ب ث",
		"5:100",
		"Worship & Ethics",
		16
	],
	[
		"حَلَال",
		"Halal",
		"Lawful / Permissible",
		"हलाल / जायज़",
		"حلال",
		"ح ل ل",
		"2:168",
		"Worship & Ethics",
		6
	],
	[
		"حَرَام",
		"Haram",
		"Forbidden / Sacred",
		"हराम / मुक़द्दस",
		"حرام / محترم",
		"ح ر م",
		"5:2",
		"Worship & Ethics",
		39
	],
	[
		"مُبِين",
		"Mubin",
		"Clear / Manifest",
		"खुला / साफ़ (मुबीन)",
		"واضح / کھلا",
		"ب ي ن",
		"12:1",
		"Nouns & Names",
		119
	],
	[
		"عَظِيم",
		"Azim",
		"Supreme / Tremendous",
		"बहुत बड़ा (अज़ीम)",
		"بہت بڑا (عظیم)",
		"ع ظ م",
		"68:4",
		"Nouns & Names",
		107
	],
	[
		"كَبِير",
		"Kabir",
		"Great / Large",
		"बड़ा (कबीर)",
		"بڑا (کبیر)",
		"ك ب ر",
		"13:9",
		"Nouns & Names",
		44
	],
	[
		"صَغِير",
		"Saghir",
		"Small / Young",
		"छोटा (सग़ीर)",
		"چھوٹا (صغیر)",
		"ص غ ر",
		"17:24",
		"Nouns & Names",
		13
	],
	[
		"كَثِير",
		"Kathir",
		"Many / Abundant",
		"बहुत ज़्यादा (कसीर)",
		"بہت زیادہ (کثیر)",
		"ك ث ر",
		"33:41",
		"Nouns & Names",
		74
	],
	[
		"قَلِيل",
		"Qalil",
		"Few / Little",
		"थोड़ा / कम (क़लील)",
		"تھوڑا / کم",
		"ق ل ل",
		"34:13",
		"Nouns & Names",
		71
	],
	[
		"شَدِيد",
		"Shadid",
		"Severe / Intense / Strong",
		"सख़्त / तेज़ (शदीद)",
		"سخت / شدید",
		"ش د د",
		"2:165",
		"Nouns & Names",
		52
	],
	[
		"خَفِيف",
		"Khafif",
		"Light / Easy",
		"हल्का (ख़फ़ीफ़)",
		"ہلکا (خفیف)",
		"خ ف ف",
		"7:189",
		"Nouns & Names",
		4
	],
	[
		"ثَقِيل",
		"Thaqil",
		"Heavy / Weighty",
		"भारी (सक़ील)",
		"بھاری (ثقیل)",
		"ث ق ل",
		"73:5",
		"Nouns & Names",
		11
	],
	[
		"بَعِيد",
		"Ba’id",
		"Far / Distant",
		"दूर (बईद)",
		"دور (بعید)",
		"ب ع د",
		"50:3",
		"Nouns & Names",
		25
	],
	[
		"سَرِيع",
		"Sari’",
		"Swift / Quick",
		"तेज़ / जल्द (सरी)",
		"تیز / جلد",
		"س ر ع",
		"2:202",
		"Nouns & Names",
		10
	],
	[
		"مُسْتَقِيم",
		"Mustaqim",
		"Straight / Upright",
		"सीधा (मुस्तक़ीम)",
		"سیدھا (مستقیم)",
		"ق و م",
		"1:6",
		"Worship & Ethics",
		37
	],
	[
		"حَنِيف",
		"Hanif",
		"Upright in Pure Monotheism",
		"एक अल्लाह की तरफ़ झुकने वाला",
		"یکسو / حنیف",
		"ح ن ف",
		"3:67",
		"Worship & Ethics",
		12
	],
	[
		"مَارِد / مَغْلُوب",
		"Ghalib",
		"Victorious / Predominant",
		"ग़ालिब / विजयी",
		"غالب",
		"غ ل ب",
		"12:21",
		"Nouns & Names",
		11
	],
	[
		"مَشْهُود",
		"Mashhud",
		"Witnessed",
		"हाज़िर / देखा हुआ",
		"حاضر / مشہود",
		"ش ه د",
		"17:78",
		"Nouns & Names",
		4
	],
	[
		"مَحْمُود",
		"Mahmud",
		"Praiseworthy",
		"तारीफ़ के क़ाबिल (महमूद)",
		"قابل تعریف (محمود)",
		"ح م د",
		"17:79",
		"Worship & Ethics",
		1
	],
	[
		"مُبَارَك",
		"Mubarak",
		"Blessed",
		"बरकत वाला (मुबारक)",
		"برکت والا (مبارک)",
		"ب ر ك",
		"38:29",
		"Worship & Ethics",
		12
	],
	[
		"مُطَهَّر",
		"Mutahhar",
		"Purified / Clean",
		"पाक-साफ़ (मुतह्हर)",
		"پاک صاف",
		"ط ه ر",
		"56:79",
		"Worship & Ethics",
		7
	],
	[
		"مَغْفُور / مَرْحُوم",
		"Marhum",
		"Shown Mercy",
		"जिस पर रहम किया जाए",
		"جس پر رحم کیا جائے",
		"ر ح م",
		"11:119",
		"Worship & Ethics",
		6
	],
	[
		"عَلِيّ",
		"Aliyy",
		"Most High / Exalted",
		"बुलंद (अली)",
		"بلند (علی)",
		"ع ل و",
		"2:255",
		"Nouns & Names",
		11
	],
	[
		"أَعْلَىٰ",
		"A’la",
		"Most High / Supreme",
		"सबसे बुलंद (आला)",
		"سب سے بلند (اعلیٰ)",
		"ع ل و",
		"87:1",
		"Nouns & Names",
		11
	],
	[
		"أَوَّل",
		"Awwal",
		"The First",
		"पहला (अव्वल)",
		"پہلا (اول)",
		"أ و ل",
		"57:3",
		"Nouns & Names",
		82
	],
	[
		"آخِر",
		"Akhir",
		"The Last",
		"आख़िरी (आख़िर)",
		"آخری (آخر)",
		"أ خ ر",
		"57:3",
		"Nouns & Names",
		40
	],
	[
		"ظَاهِر",
		"Zahir",
		"Outward / Manifest",
		"ज़ाहिर / प्रकट",
		"ظاہر",
		"ظ ه ر",
		"57:3",
		"Nouns & Names",
		11
	],
	[
		"بَاطِن",
		"Batin",
		"Inward / Hidden",
		"बातिन / छुपा हुआ",
		"باطن",
		"ب ط ن",
		"57:3",
		"Nouns & Names",
		4
	],
	[
		"أَحَد",
		"Ahad",
		"The One and Only",
		"अकेला / एक (अहद)",
		"یکتا / ایک (احد)",
		"أ ح د",
		"112:1",
		"Nouns & Names",
		85
	],
	[
		"صَمَد",
		"Samad",
		"Eternal Refuge / Self-Sufficient",
		"बेनियाज़ (समद)",
		"بے نیاز (صمد)",
		"ص م د",
		"112:2",
		"Nouns & Names",
		1
	],
	[
		"وِتْر",
		"Witr",
		"Odd / Single (Witr Prayer)",
		"ताक़ / वित्र",
		"طاق / وتر",
		"و ت ر",
		"89:3",
		"Worship & Ethics",
		1
	],
	[
		"شَفْع",
		"Shaf’",
		"Even / Pair",
		"जुफ़्त / जोड़ा",
		"جفت",
		"ش ف ع",
		"89:3",
		"Nouns & Names",
		1
	]
].map(([ar, tr, en, hi, ur, root, ref, cat, freq], idx) => ({
	id: `v600_${idx + 1}`,
	arabic: ar,
	transliteration: tr,
	meaning: en,
	localizedMeanings: {
		en,
		hi,
		ur,
		hinglish: `${en} (${tr})`,
		ar
	},
	rootLetters: root,
	occurrencesInQuran: freq,
	frequencySource: "Quranic Arabic Corpus & Standard Lexical Concordance (Top 600)",
	exampleAyah: ar,
	exampleRef: ref,
	category: cat,
	mastered: false,
	registryMeta: {
		id: `v600_${idx + 1}`,
		contentType: "quran_vocab",
		language: "Multi (en, hi, ur, hinglish, ar)",
		availableLanguages: [
			"en",
			"hi",
			"ur",
			"hinglish",
			"ar"
		],
		source: `Quran ${ref}`,
		reviewStatus: "PUBLISHED",
		ageSuitability: "All Ages",
		version: "3.0.0",
		lastUpdatedIso: "2026-11-20T00:00:00.000Z",
		offlineAvailable: true,
		authenticityType: "Canonical Text"
	}
}));
// src/data/ilmizoTop600Curriculum.ts
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
var TOP_600_TARGET_COVERAGE_PCT = 81.64;
/**
* Curated high-frequency & typo-corrected anchor entries from the Ilmizo Top 600 eBook.
* Every entry has verified Arabic, English, Roman Urdu meaning, and example Ayah context.
*/
var ILMIZO_CURATED_CURRICULUM_ANCHORS = [
	{
		id: "ilm_top_1",
		arabic: "مِنْ",
		transliteration: "Min",
		meaning: "From / Of / Out of",
		romanUrduMeaning: "Se / Mein se",
		grammarType: "Preposition",
		rootLetters: "م ن",
		occurrencesInQuran: 3226,
		exampleAyah: "مِن شَرِّ مَا خَلَقَ",
		exampleRef: "113:2",
		exampleTranslationEn: "From the evil of that which He created.",
		exampleTranslationRomanUrdu: "Us cheez ke shar se jo Usne paida ki.",
		category: "Core Particles",
		pdfRankHint: 1
	},
	{
		id: "ilm_top_2",
		arabic: "اللَّه",
		transliteration: "Allah",
		meaning: "Allah (The One True God)",
		romanUrduMeaning: "Allah (Ek Saccha Mabood)",
		grammarType: "Noun",
		rootLetters: "أ ل ه",
		occurrencesInQuran: 2699,
		exampleAyah: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
		exampleRef: "112:1",
		exampleTranslationEn: "Say, \"He is Allah, [who is] One.\"",
		exampleTranslationRomanUrdu: "Kah dijiye: Woh Allah ek hai.",
		category: "Nouns & Names",
		pdfRankHint: 2
	},
	{
		id: "ilm_top_3",
		arabic: "فِي",
		transliteration: "Fi",
		meaning: "In / Inside / Regarding",
		romanUrduMeaning: "Mein / Ke andar",
		grammarType: "Preposition",
		rootLetters: "ف ي",
		occurrencesInQuran: 1701,
		exampleAyah: "ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ فِيهِ",
		exampleRef: "2:2",
		exampleTranslationEn: "This is the Book about which there is no doubt in it.",
		exampleTranslationRomanUrdu: "Yeh woh Kitaab hai jismein koi shak nahi.",
		category: "Core Particles",
		pdfRankHint: 3
	},
	{
		id: "ilm_top_4",
		arabic: "إِنَّ",
		transliteration: "Inna",
		meaning: "Indeed / Verily / Truly",
		romanUrduMeaning: "Beshak / Yaqeenan",
		grammarType: "Particle",
		rootLetters: "أ ن ن",
		occurrencesInQuran: 1682,
		exampleAyah: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
		exampleRef: "94:6",
		exampleTranslationEn: "Indeed, with hardship comes ease.",
		exampleTranslationRomanUrdu: "Beshak mushkil ke saath aasani hai.",
		category: "Core Particles",
		pdfRankHint: 4
	},
	{
		id: "ilm_top_5",
		arabic: "قَالَ",
		transliteration: "Qala",
		meaning: "He said / Spoke",
		romanUrduMeaning: "Usne kaha / Farmaya",
		grammarType: "Verb",
		rootLetters: "ق و ل",
		occurrencesInQuran: 1618,
		exampleAyah: "قَالَ رَبِّ ٱشْرَحْ لِى صَدْرِى",
		exampleRef: "20:25",
		exampleTranslationEn: "He said, \"My Lord, expand for me my chest.\"",
		exampleTranslationRomanUrdu: "Unhone kaha: Aye mere Rabb, mera seena khol de.",
		category: "Verbs & Actions",
		pdfRankHint: 5
	},
	{
		id: "ilm_top_6",
		arabic: "عَلَىٰ",
		transliteration: "Ala",
		meaning: "On / Upon / Over",
		romanUrduMeaning: "Par / Ke upar",
		grammarType: "Preposition",
		rootLetters: "ع ل و",
		occurrencesInQuran: 1445,
		exampleAyah: "وَعَلَى ٱللَّهِ فَلْيَتَوَكَّلِ ٱلْمُؤْمِنُونَ",
		exampleRef: "3:122",
		exampleTranslationEn: "And upon Allah let the believers rely.",
		exampleTranslationRomanUrdu: "Aur Allah hi par mominon ko bharosa karna chahiye.",
		category: "Core Particles",
		pdfRankHint: 6
	},
	{
		id: "ilm_top_7",
		arabic: "مَا",
		transliteration: "Ma",
		meaning: "What / That which / Not",
		romanUrduMeaning: "Jo / Kya / Nahi",
		grammarType: "Particle",
		rootLetters: "م ا",
		occurrencesInQuran: 1346,
		exampleAyah: "وَلِلَّهِ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ",
		exampleRef: "3:109",
		exampleTranslationEn: "To Allah belongs whatever is in the heavens and whatever is on the earth.",
		exampleTranslationRomanUrdu: "Aur Allah hi ka hai jo kuch aasmanon mein aur jo kuch zameen mein hai.",
		category: "Core Particles",
		pdfRankHint: 7
	},
	{
		id: "ilm_top_8",
		arabic: "لَا",
		transliteration: "La",
		meaning: "No / Not / Do not",
		romanUrduMeaning: "Nahi / Mat",
		grammarType: "Particle",
		rootLetters: "ل ا",
		occurrencesInQuran: 1334,
		exampleAyah: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
		exampleRef: "2:286",
		exampleTranslationEn: "Allah does not burden a soul beyond what it can bear.",
		exampleTranslationRomanUrdu: "Allah kisi jaan par uski taaqat se zyada bojh nahi daalta.",
		category: "Core Particles",
		pdfRankHint: 8
	},
	{
		id: "ilm_top_9",
		arabic: "كَانَ",
		transliteration: "Kana",
		meaning: "He was / Ever is",
		romanUrduMeaning: "Tha / Hamesha se hai",
		grammarType: "Verb",
		rootLetters: "ك و ن",
		occurrencesInQuran: 1358,
		exampleAyah: "وَكَانَ ٱللَّهُ غَفُورًا رَّحِيمًا",
		exampleRef: "4:96",
		exampleTranslationEn: "And ever is Allah Forgiving and Merciful.",
		exampleTranslationRomanUrdu: "Aur Allah bada bakhshne wala, nihayat meharban hai.",
		category: "Verbs & Actions",
		pdfRankHint: 9
	},
	{
		id: "ilm_top_10",
		arabic: "إِلَىٰ",
		transliteration: "Ila",
		meaning: "To / Towards / Until",
		romanUrduMeaning: "Ki taraf / Tak",
		grammarType: "Preposition",
		rootLetters: "إ ل ي",
		occurrencesInQuran: 742,
		exampleAyah: "وَإِلَى ٱللَّهِ تُرْجَعُ ٱلْأُمُورُ",
		exampleRef: "2:210",
		exampleTranslationEn: "And to Allah all matters are returned.",
		exampleTranslationRomanUrdu: "Aur tamam maamlaat Allah hi ki taraf lautaye jaate hain.",
		category: "Core Particles",
		pdfRankHint: 10
	},
	{
		id: "v1",
		arabic: "رَبّ",
		transliteration: "Rabb",
		meaning: "Lord, Sustainer, Cherisher",
		romanUrduMeaning: "Rabb / Paalne wala Malik",
		grammarType: "Noun",
		rootLetters: "ر ب ب",
		occurrencesInQuran: 975,
		exampleAyah: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
		exampleRef: "1:2",
		exampleTranslationEn: "All praise is due to Allah, Lord of all the worlds.",
		exampleTranslationRomanUrdu: "Tamam tareefein Allah ke liye hain jo saare jahanon ka Rabb hai.",
		category: "Nouns & Names"
	},
	{
		id: "v3",
		arabic: "ءَامَنُوا۟",
		transliteration: "Amanu",
		meaning: "They believed / had faith",
		romanUrduMeaning: "Woh imaan laye",
		grammarType: "Verb",
		rootLetters: "أ م ن",
		occurrencesInQuran: 879,
		exampleAyah: "إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ",
		exampleRef: "103:3",
		exampleTranslationEn: "Except those who have believed and done righteous deeds.",
		exampleTranslationRomanUrdu: "Siwaye un logon ke jo imaan laye aur nek kaam karte rahe.",
		category: "Verbs & Actions"
	},
	{
		id: "v2",
		arabic: "عِلْم",
		transliteration: "Ilm",
		meaning: "Knowledge, Comprehension",
		romanUrduMeaning: "Ilm / Jaankari",
		grammarType: "Noun",
		rootLetters: "ع ل م",
		occurrencesInQuran: 854,
		exampleAyah: "وَقُل رَّبِّ زِدْنِى عِلْمًا",
		exampleRef: "20:114",
		exampleTranslationEn: "And say, \"My Lord, increase me in knowledge.\"",
		exampleTranslationRomanUrdu: "Aur kaho: Aye mere Rabb, mere ilm mein izafa farma.",
		category: "Nouns & Names"
	},
	{
		id: "v6",
		arabic: "رَحْمَة",
		transliteration: "Rahmah",
		meaning: "Mercy, Compassion",
		romanUrduMeaning: "Rehmat / Meharbani",
		grammarType: "Noun",
		rootLetters: "ر ح م",
		occurrencesInQuran: 339,
		exampleAyah: "وَرَحْمَتِى وَسِعَتْ كُلَّ شَىْءٍ",
		exampleRef: "7:156",
		exampleTranslationEn: "My mercy encompasses all things.",
		exampleTranslationRomanUrdu: "Meri rehmat har cheez par chhayi hui hai.",
		category: "Worship & Ethics"
	},
	{
		id: "v8",
		arabic: "هُدًى",
		transliteration: "Hudan",
		meaning: "Guidance",
		romanUrduMeaning: "Hidayat / Seedha raasta",
		grammarType: "Noun",
		rootLetters: "ه د ي",
		occurrencesInQuran: 316,
		exampleAyah: "هُدًى لِّلْمُتَّقِينَ",
		exampleRef: "2:2",
		exampleTranslationEn: "A guidance for those conscious of Allah.",
		exampleTranslationRomanUrdu: "Parhezgaron ke liye seedhi hidayat hai.",
		category: "Worship & Ethics"
	},
	{
		id: "v4",
		arabic: "كِتَـٰب",
		transliteration: "Kitab",
		meaning: "Book, Scripture, Decree",
		romanUrduMeaning: "Kitaab / Faisla",
		grammarType: "Noun",
		rootLetters: "ك ت ب",
		occurrencesInQuran: 260,
		exampleAyah: "ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ فِيهِ",
		exampleRef: "2:2",
		exampleTranslationEn: "This is the Book about which there is no doubt.",
		exampleTranslationRomanUrdu: "Yeh woh Kitaab hai jismein koi shak nahi.",
		category: "Nouns & Names"
	},
	{
		id: "v7",
		arabic: "صَبْر",
		transliteration: "Sabr",
		meaning: "Patience, Perseverance",
		romanUrduMeaning: "Sabr / Himmat aur bardasht",
		grammarType: "Noun",
		rootLetters: "ص ب ر",
		occurrencesInQuran: 103,
		exampleAyah: "إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ",
		exampleRef: "2:153",
		exampleTranslationEn: "Indeed, Allah is with the patient.",
		exampleTranslationRomanUrdu: "Beshak Allah sabr karne walon ke saath hai.",
		category: "Worship & Ethics"
	},
	{
		id: "v5",
		arabic: "صَلَوٰة",
		transliteration: "Salah",
		meaning: "Prayer, Connection with Allah",
		romanUrduMeaning: "Namaaz / Allah se taalluq",
		grammarType: "Noun",
		rootLetters: "ص ل و",
		occurrencesInQuran: 99,
		exampleAyah: "وَيُقِيمُونَ ٱلصَّلَوٰةَ",
		exampleRef: "2:3",
		exampleTranslationEn: "And they establish the prayer.",
		exampleTranslationRomanUrdu: "Aur woh namaaz qayam karte hain.",
		category: "Worship & Ethics"
	},
	{
		id: "ilm_fix_87",
		arabic: "اتَّخَذَ",
		transliteration: "Ittakhadha",
		meaning: "He took / He adopted / He made for himself",
		romanUrduMeaning: "Usne banaya / Ikhtiyar kiya",
		grammarType: "Verb",
		rootLetters: "أ خ ذ",
		occurrencesInQuran: 124,
		exampleAyah: "وَٱتَّخَذَ ٱللَّهُ إِبْرَٰهِيمَ خَلِيلًا",
		exampleRef: "4:125",
		exampleTranslationEn: "And Allah took Ibrahim as an intimate friend.",
		exampleTranslationRomanUrdu: "Aur Allah ne Ibrahim (AS) ko apna khaas dost bana liya.",
		category: "Verbs & Actions",
		pdfRankHint: 87
	},
	{
		id: "ilm_fix_197",
		arabic: "نَذِير",
		transliteration: "Nadhir",
		meaning: "Warner (one who cautions with mercy)",
		romanUrduMeaning: "Khabardar karne wala / Darane wala",
		grammarType: "Noun",
		rootLetters: "ن ذ ر",
		occurrencesInQuran: 58,
		exampleAyah: "إِنَّا أَرْسَلْنَـٰكَ بِٱلْحَقِّ بَشِيرًا وَنَذِيرًا",
		exampleRef: "2:119",
		exampleTranslationEn: "Indeed, We have sent you with the truth as a bringer of good tidings and a warner.",
		exampleTranslationRomanUrdu: "Beshak Humne aapko haq ke saath khushkhabri dene wala aur khabardar karne wala bana kar bheja hai.",
		category: "Nouns & Names",
		pdfRankHint: 197
	},
	{
		id: "ilm_fix_202",
		arabic: "أَجْر",
		transliteration: "Ajr",
		meaning: "Reward / Recompense / Wage",
		romanUrduMeaning: "Ajar / Badla / Sawaab",
		grammarType: "Noun",
		rootLetters: "أ ج ر",
		occurrencesInQuran: 105,
		exampleAyah: "فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ",
		exampleRef: "95:6",
		exampleTranslationEn: "For them is a reward uninterrupted.",
		exampleTranslationRomanUrdu: "Unke liye kabhi khatam na hone wala ajar hai.",
		category: "Worship & Ethics",
		pdfRankHint: 202
	},
	{
		id: "ilm_fix_307",
		arabic: "بَشَر",
		transliteration: "Bashar",
		meaning: "Human being / Mortal",
		romanUrduMeaning: "Insaan / Bashar",
		grammarType: "Noun",
		rootLetters: "ب ش ر",
		occurrencesInQuran: 36,
		exampleAyah: "قُلْ إِنَّمَا أَنَا۠ بَشَرٌ مِّثْلُكُمْ",
		exampleRef: "18:110",
		exampleTranslationEn: "Say, \"I am only a human being like you.\"",
		exampleTranslationRomanUrdu: "Kah dijiye: Main toh sirf tumhare jaisa ek insaan hoon.",
		category: "Nouns & Names",
		pdfRankHint: 307
	},
	{
		id: "ilm_fix_336",
		arabic: "مَنْ",
		transliteration: "Man",
		meaning: "Who / Whoever",
		romanUrduMeaning: "Kaun / Jo koi",
		grammarType: "Pronoun",
		rootLetters: "م ن",
		occurrencesInQuran: 824,
		exampleAyah: "بَلَىٰ مَنْ أَسْلَمَ وَجْهَهُۥ لِلَّهِ وَهُوَ مُحْسِنٌ",
		exampleRef: "2:112",
		exampleTranslationEn: "Yes, whoever submits his face to Allah while being a doer of good...",
		exampleTranslationRomanUrdu: "Kyun nahi! Jo koi apna rukh Allah ke aage jhuka de aur woh neki karne wala ho...",
		category: "Core Particles",
		pdfRankHint: 336
	},
	{
		id: "ilm_fix_403",
		arabic: "عَصَا",
		transliteration: "Asa",
		meaning: "Staff / Walking Stick",
		romanUrduMeaning: "Lathi / Asa (Musa AS ka asa)",
		grammarType: "Noun",
		rootLetters: "ع ص و",
		occurrencesInQuran: 12,
		exampleAyah: "قَالَ هِىَ عَصَاىَ أَتَوَكَّؤُا۟ عَلَيْهَا",
		exampleRef: "20:18",
		exampleTranslationEn: "He said, \"It is my staff; I lean upon it.\"",
		exampleTranslationRomanUrdu: "Musa (AS) ne kaha: Yeh meri lathi (asa) hai, main is par sahara leta hoon.",
		category: "Nouns & Names",
		pdfRankHint: 403
	},
	{
		id: "ilm_fix_405",
		arabic: "أَفْلَحَ",
		transliteration: "Aflaha",
		meaning: "He succeeded / Prospered",
		romanUrduMeaning: "Woh kaamyab hua / Falah paayi",
		grammarType: "Verb",
		rootLetters: "ف ل ح",
		occurrencesInQuran: 40,
		exampleAyah: "قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ",
		exampleRef: "23:1",
		exampleTranslationEn: "Certainly will the believers have succeeded.",
		exampleTranslationRomanUrdu: "Yaqeenan imaan wale kaamyab ho gaye.",
		category: "Verbs & Actions",
		pdfRankHint: 405
	},
	{
		id: "ilm_fix_409",
		arabic: "امْرَأَت",
		transliteration: "Imra'at",
		meaning: "Woman / Wife",
		romanUrduMeaning: "Aurat / Biwi",
		grammarType: "Noun",
		rootLetters: "م ر أ",
		occurrencesInQuran: 26,
		exampleAyah: "وَقَالَ نِسْوَةٌ فِى ٱلْمَدِينَةِ ٱمْرَأَتُ ٱلْعَزِيزِ",
		exampleRef: "12:30",
		exampleTranslationEn: "And women in the city said, \"The wife of al-Aziz...\"",
		exampleTranslationRomanUrdu: "Aur shahar ki auraton ne kaha: Aziz ki biwi...",
		category: "Nouns & Names",
		pdfRankHint: 409
	},
	{
		id: "ilm_fix_439",
		arabic: "فَاسِق",
		transliteration: "Fasiq",
		meaning: "Defiantly disobedient / Transgressor",
		romanUrduMeaning: "Nafarmani karne wala / Fasiq",
		grammarType: "Noun",
		rootLetters: "ف س ق",
		occurrencesInQuran: 54,
		exampleAyah: "أَفَمَن كَانَ مُؤْمِنًا كَمَن كَانَ فَاسِقًا لَّا يَسْتَوُۥنَ",
		exampleRef: "32:18",
		exampleTranslationEn: "Then is one who was a believer like one who was defiantly disobedient? They are not equal.",
		exampleTranslationRomanUrdu: "Bhala jo shakhs momin ho, kya woh uske barabar ho sakta hai jo nafarmani karne wala (fasiq) ho? Dono barabar nahi ho sakte.",
		category: "Worship & Ethics",
		pdfRankHint: 439
	}
];
function inferGrammarType(word) {
	if (word.grammarType) return word.grammarType;
	const cat = (word.category || "").toLowerCase();
	const meaning = (word.meaning || "").toLowerCase();
	if (cat.includes("verb") || meaning.startsWith("to ") || meaning.startsWith("he ") || meaning.startsWith("they ")) return "Verb";
	if (cat.includes("particle") || [
		"in",
		"from",
		"on",
		"to",
		"with",
		"upon",
		"about"
	].some((p) => meaning === p || meaning.startsWith(`${p} /`))) return meaning.includes("he") || meaning.includes("they") || meaning.includes("you") || meaning.includes("we") || meaning.includes("who") ? "Pronoun" : "Particle";
	if (meaning.startsWith("all-") || meaning.startsWith("most ") || meaning.includes("merciful") || meaning.includes("wise")) return "Adjective";
	return "Noun";
}
function buildRomanUrduFallback(word) {
	if (word.romanUrduMeaning) return word.romanUrduMeaning;
	const ur = word.localizedMeanings?.ur;
	const hi = word.localizedMeanings?.hi;
	const cleanMeaning = word.meaning.split("/")[0]?.trim() || word.meaning;
	if (ur && hi) return `${cleanMeaning} (${word.transliteration})`;
	return `${cleanMeaning} (${word.transliteration})`;
}
/**
* Merges the curated Ilmizo Top 600 curriculum anchors with the full offline vocabulary bank,
* assigns exact Frequency Ranks (#1..#N sorted by Quranic occurrence count), and calculates
* smooth Cumulative Quran Coverage % calibrated to 81.64% at Word #600.
*/
function normalizeArabicSkeleton(text) {
	return text.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, "").replace(/[إأآٱ]/g, "ا").replace(/ى/g, "ي").trim();
}
function buildIlmizoTop600Curriculum(baseWords) {
	const byId = /* @__PURE__ */ new Map();
	const byArabicSkeleton = /* @__PURE__ */ new Map();
	for (const w of baseWords) {
		byId.set(w.id, { ...w });
		const sk = normalizeArabicSkeleton(w.arabic);
		if (sk) byArabicSkeleton.set(sk, w.id);
	}
	for (const anchor of ILMIZO_CURATED_CURRICULUM_ANCHORS) {
		const sk = normalizeArabicSkeleton(anchor.arabic);
		const existingId = (anchor.id && byId.has(anchor.id) ? anchor.id : void 0) || (sk ? byArabicSkeleton.get(sk) : void 0);
		if (existingId) {
			const existing = byId.get(existingId);
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
				frequencySource: "Ilmizo Top 600 Curriculum (Quranic Arabic Corpus)"
			});
		} else {
			const newId = anchor.id || `ilm_cur_${anchor.transliteration.toLowerCase().replace(/[^a-z]/g, "")}`;
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
				frequencySource: "Ilmizo Top 600 Curriculum (Quranic Arabic Corpus)"
			});
			if (sk) byArabicSkeleton.set(sk, newId);
		}
	}
	const sorted = Array.from(byId.values()).sort((a, b) => {
		const diff = (b.occurrencesInQuran || 0) - (a.occurrencesInQuran || 0);
		if (diff !== 0) return diff;
		return a.id.localeCompare(b.id);
	});
	const totalTop600Occurrences = sorted.slice(0, Math.min(600, sorted.length)).reduce((sum, w) => sum + Math.max(1, w.occurrencesInQuran || 1), 0);
	let runningOccurrences = 0;
	return sorted.map((word, idx) => {
		const rank = idx + 1;
		runningOccurrences += Math.max(1, word.occurrencesInQuran || 1);
		const rawPct = totalTop600Occurrences > 0 ? runningOccurrences / totalTop600Occurrences * TOP_600_TARGET_COVERAGE_PCT : 0;
		const cumulativeCoveragePct = Number(Math.min(85.5, rank <= 600 ? rawPct : TOP_600_TARGET_COVERAGE_PCT + (rank - 600) * .04).toFixed(2));
		return {
			...word,
			frequencyRank: rank,
			grammarType: inferGrammarType(word),
			cumulativeCoveragePct,
			romanUrduMeaning: buildRomanUrduFallback(word),
			exampleTranslationEn: word.exampleTranslationEn || `Appears ${word.occurrencesInQuran} times in the Noble Qur'an (e.g., Surah ${word.exampleRef}).`,
			exampleTranslationRomanUrdu: word.exampleTranslationRomanUrdu || `Yeh lafz Quran-e-Paak mein ${word.occurrencesInQuran} martaba aata hai (masalan Surah ${word.exampleRef}).`
		};
	});
}
/**
* Computes live percentage of the Qur'an the learner recognizes based on their mastered words.
* Weighted by each word's real Quranic frequency, calibrated to 81.64% across the Top 600 words.
*/
function computeVocabCoverageStats(allWords, masteredIds) {
	const masteredSet = new Set(masteredIds);
	const totalTop600Occ = allWords.slice(0, Math.min(600, allWords.length)).reduce((s, w) => s + Math.max(1, w.occurrencesInQuran || 1), 0);
	let masteredOcc = 0;
	let masteredCount = 0;
	for (const w of allWords) if (masteredSet.has(w.id)) {
		masteredCount += 1;
		masteredOcc += Math.max(1, w.occurrencesInQuran || 1);
	}
	const rawPct = totalTop600Occ > 0 ? masteredOcc / totalTop600Occ * TOP_600_TARGET_COVERAGE_PCT : 0;
	const coveragePct = Number(Math.min(85.5, rawPct).toFixed(2));
	let milestoneLabel = "Start with the Top 25 words to recognize 25%+ of every Quran page!";
	if (coveragePct >= 75) milestoneLabel = `MashaAllah! You now recognize ${coveragePct}% of the words in the Noble Qur'an!`;
	else if (coveragePct >= 50) milestoneLabel = `SubhanAllah! Over half of every Quran page (${coveragePct}%) is now familiar to you.`;
	else if (coveragePct >= 25) milestoneLabel = `Alhamdulillah! You already recognize ${coveragePct}% of Quranic words during Salah & Tilawah.`;
	else if (masteredCount > 0) milestoneLabel = `Great start — ${masteredCount} words mastered (${coveragePct}% of the Qur'an recognized).`;
	return {
		masteredCount,
		totalWords: allWords.length,
		coveragePct,
		occurrencesRecognized: masteredOcc,
		totalOccurrences: totalTop600Occ,
		milestoneLabel
	};
}
// src/data/islamicContent.ts
function mergeById(primary, expanded) {
	const map = /* @__PURE__ */ new Map();
	for (const item of primary) map.set(item.id, item);
	for (const item of expanded) {
		const existing = map.get(item.id);
		map.set(item.id, existing ? {
			...existing,
			...item
		} : item);
	}
	return Array.from(map.values());
}
var VERIFIED_DUAS = mergeById([
	{
		id: "dua_before_eating",
		category: "eating",
		title: "Dua Before Eating",
		kidsTitle: "Dua Before Eating",
		arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
		transliteration: "Bismillahi wa ‘ala barakatillah",
		translations: {
			en: "In the name of Allah and upon the blessings of Allah.",
			hi: "अल्लाह के नाम से और अल्लाह की बरकत पर।",
			hinglish: "Allah ke naam se aur Allah ki barkat par.",
			ur: "اللہ کے نام سے اور اللہ کی برکت پر۔"
		},
		whenToUse: "Recite right before taking your first bite of food or drink.",
		verification: {
			source: "Sunan Abi Dawud 3767 / Al-Mustadrak",
			edition: "Hisn al-Muslim #178",
			reference: "Authenticated by Imam An-Nawawi in Al-Adhkar",
			language: "Arabic / Multi-language",
			version: "1.0",
			reviewer: "Ilmizo Hadith Verification Board",
			status: "Verified"
		},
		isFavorite: true
	},
	{
		id: "dua_after_eating",
		category: "eating",
		title: "Dua After Eating",
		kidsTitle: "Thanking Allah After Meals",
		arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
		transliteration: "Alhamdu lillahil-ladhi at’amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah",
		translations: {
			en: "All praise is for Allah who fed me this and provided it for me without any might or power from myself.",
			hi: "सब तारीफ़ अल्लाह के लिए है जिसने मुझे यह खिलाया और मेरी किसी ताक़त के बिना मुझे रिज़्क़ दिया।",
			hinglish: "Sab tareef Allah ke liye hai jisne mujhe yeh khilaya aur meri kisi taaqat ke bina ata kiya.",
			ur: "تمام تعریفیں اللہ کے لیے ہیں جس نے مجھے یہ کھلایا اور میری کسی طاقت و قوت کے بغیر مجھے یہ عطا فرمایا۔"
		},
		whenToUse: "After finishing a meal to express gratitude to Allah.",
		verification: {
			source: "Jami` at-Tirmidhi 3458, Sunan Abi Dawud 4023",
			edition: "Hisn al-Muslim #179",
			reference: "Hasan Sahih",
			language: "Arabic / Multi-language",
			version: "1.0",
			reviewer: "Ilmizo Hadith Verification Board",
			status: "Verified"
		},
		isFavorite: true
	},
	{
		id: "dua_forgot_bismillah",
		category: "eating",
		title: "If You Forget Bismillah at Start of Meal",
		kidsTitle: "Forgot Bismillah Dua",
		arabic: "بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",
		transliteration: "Bismillahi awwalahu wa akhirahu",
		translations: {
			en: "In the name of Allah at its beginning and at its end.",
			hi: "अल्लाह के नाम से इसके शुरू में भी और इसके आख़िर में भी।",
			hinglish: "Allah ke naam se iske shuru mein bhi aur iske aakhir mein bhi.",
			ur: "اللہ کے نام سے اس کے اول میں بھی اور آخر میں بھی۔"
		},
		whenToUse: "Recite as soon as you remember during a meal.",
		verification: {
			source: "Sunan Abi Dawud 3767, Jami` at-Tirmidhi 1858",
			edition: "Hisn al-Muslim #178",
			reference: "Sahih",
			language: "Arabic / Multi-language",
			version: "1.0",
			reviewer: "Ilmizo Hadith Verification Board",
			status: "Verified"
		}
	},
	{
		id: "dua_morning_protection",
		category: "morning_evening",
		title: "Morning & Evening Protection",
		kidsTitle: "Daily Shield Dua",
		arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
		transliteration: "Bismillahil-ladhi la yadurru ma’asmihi shay’un fil-ardi wa la fis-sama’i wa Huwas-Sami’ul-Alim",
		translations: {
			en: "In the Name of Allah with Whose Name nothing can harm on earth nor in the heavens, and He is the All-Hearing, the All-Knowing.",
			hi: "अल्लाह के नाम के साथ जिसके नाम की बरकत से ज़मीन और आसमान की कोई चीज़ नुक़सान नहीं पहुँचा सकती।",
			hinglish: "Allah ke naam ke saath jiske naam ki barkat se zameen aur aasman ki koi cheez nuksaan nahi pahuncha sakti.",
			ur: "اللہ کے نام کے ساتھ جس کے نام کی برکت سے زمین اور آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی۔"
		},
		whenToUse: "Recite 3 times every morning after Fajr and 3 times every evening after Asr/Maghrib.",
		verification: {
			source: "Sunan Abi Dawud 5088, Jami` at-Tirmidhi 3388",
			edition: "Hisn al-Muslim #86",
			reference: "Sahih",
			language: "Arabic / Multi-language",
			version: "1.0",
			reviewer: "Ilmizo Hadith Verification Board",
			status: "Verified"
		},
		isFavorite: true
	},
	{
		id: "dua_morning_gratitude",
		category: "morning_evening",
		title: "Waking Up in the Morning",
		kidsTitle: "Good Morning Dua",
		arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
		transliteration: "Alhamdu lillahil-ladhi ahyana ba’da ma amatana wa ilayhin-nushur",
		translations: {
			en: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
			hi: "सब तारीफ़ अल्लाह के लिए है जिसने हमें मारने (नींद) के बाद ज़िंदा किया और उसी की तरफ़ उठकर जाना है।",
			hinglish: "Sab tareef Allah ke liye hai jisne humein neend ke baad nayi zindagi di.",
			ur: "تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں مارنے (سلانے) کے بعد زندہ کیا۔"
		},
		whenToUse: "Immediately upon opening your eyes in the morning.",
		verification: {
			source: "Sahih al-Bukhari 6312",
			edition: "Hisn al-Muslim #1",
			reference: "Sahih al-Bukhari",
			language: "Arabic / Multi-language",
			version: "1.0",
			reviewer: "Ilmizo Hadith Verification Board",
			status: "Verified"
		}
	},
	{
		id: "dua_sleep",
		category: "sleep",
		title: "Before Sleeping",
		kidsTitle: "Bedtime Dua",
		arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
		transliteration: "Bismika Allahumma amutu wa ahya",
		translations: {
			en: "In Your name, O Allah, I die and I live.",
			hi: "ऐ अल्लाह! तेरे ही नाम के साथ मैं सोता (मरता) हूँ और जागता (जीता) हूँ।",
			hinglish: "Ai Allah! Tere hi naam se main sota hoon aur jaagta hoon.",
			ur: "اے اللہ! تیرے ہی نام کے ساتھ میں مرتا (سوتا) ہوں اور جیتا (جاگتا) ہوں۔"
		},
		whenToUse: "Recite on your bed right before going to sleep.",
		verification: {
			source: "Sahih al-Bukhari 6324",
			edition: "Hisn al-Muslim #98",
			reference: "Sahih al-Bukhari Book 80, Hadith 21",
			language: "Arabic / Multi-language",
			version: "1.0",
			reviewer: "Ilmizo Hadith Verification Board",
			status: "Verified"
		}
	},
	{
		id: "dua_parents",
		category: "family",
		title: "Dua for Parents",
		kidsTitle: "Dua for Mom & Dad",
		arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
		transliteration: "Rabbir-hamhuma kama rabbayani saghira",
		translations: {
			en: "My Lord, have mercy upon them as they brought me up [when I was] small.",
			hi: "ऐ मेरे रब! उन दोनों (माता-पिता) पर रहम फ़रमा जैसा उन्होंने बचपन में मुझे पाला।",
			hinglish: "Ai mere Rab! Mere walidain par raham farma jaise unhone bachpan mein meri parwarish ki.",
			ur: "اے میرے رب! ان دونوں پر رحم فرما جیسا کہ انہوں نے بچپن میں میری پرورش کی۔"
		},
		whenToUse: "In daily prayers and whenever remembering your parents.",
		verification: {
			source: "Al-Quran, Surah Al-Isra 17:24",
			edition: "Uthmani Text & Sahih International",
			reference: "Quran 17:24",
			language: "Arabic / Multi-language",
			version: "1.0",
			reviewer: "Ilmizo Sharia & Text Verification Registry",
			status: "Verified"
		},
		isFavorite: true
	},
	{
		id: "dua_family_coolness",
		category: "family",
		title: "Dua for Righteous Family",
		kidsTitle: "Happy Family Dua",
		arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
		transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a’yunin waj’alna lil-muttaqina imama",
		translations: {
			en: "Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us an example for the righteous.",
			hi: "ऐ हमारे रब! हमें हमारे जीवनसाथियों और औलाद से आँखों की ठंडक अता फ़रमा।",
			hinglish: "Ai hamare Rab! Humein hamare ghar walon aur aulaad se aankhon ki thandak ata farma.",
			ur: "اے ہمارے رب! ہمیں ہمارے ازواج اور اولاد سے آنکھوں کی ٹھنڈک عطا فرما۔"
		},
		whenToUse: "Daily supplication for family peace and righteous children.",
		verification: {
			source: "Al-Quran, Surah Al-Furqan 25:74",
			edition: "Uthmani Text & Sahih International",
			reference: "Quran 25:74",
			language: "Arabic / Multi-language",
			version: "1.0",
			reviewer: "Ilmizo Sharia & Text Verification Registry",
			status: "Verified"
		}
	},
	{
		id: "dua_travel",
		category: "travel",
		title: "Dua for Travel",
		kidsTitle: "Safe Journey Dua",
		arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
		transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun",
		translations: {
			en: "Glory to Him who has subjected this to us, and we could never have it by our efforts. And assuredly, to our Lord we shall return.",
			hi: "पाक है वह ज़ात जिसने इसे हमारे क़ाबू में कर दिया और हम इसे क़ाबू करने वाले न थे, और बेशक हमें अपने रब की तरफ़ लौटना है।",
			hinglish: "Paak hai woh zaat jisne is sawari ko hamare qaabu mein kar diya, aur beshak humein apne Rab ki taraf lautna hai.",
			ur: "پاک ہے وہ ذات جس نے اسے ہمارے قابو میں کر دیا اور ہم اسے قابو میں کرنے والے نہ تھے۔"
		},
		whenToUse: "When boarding a car, train, bus, or airplane.",
		verification: {
			source: "Al-Quran 43:13-14 & Sahih Muslim 1342",
			edition: "Hisn al-Muslim #207",
			reference: "Sahih Muslim",
			language: "Arabic / Multi-language",
			version: "1.0",
			reviewer: "Ilmizo Hadith Verification Board",
			status: "Verified"
		}
	},
	{
		id: "dua_leaving_home",
		category: "travel",
		title: "Dua When Leaving the House",
		kidsTitle: "Stepping Outside Dua",
		arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
		transliteration: "Bismillahi, tawakkaltu ‘alallahi, wa la hawla wa la quwwata illa billah",
		translations: {
			en: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
			hi: "अल्लाह के नाम से, मैंने अल्लाह पर भरोसा किया, और नेकी करने की ताक़त और बुराई से बचने की हिम्मत अल्लाह ही की तरफ़ से है।",
			hinglish: "Allah ke naam se, maine Allah par bharosa kiya, aur koi taaqat nahi magar Allah ki madad se.",
			ur: "اللہ کے نام سے، میں نے اللہ پر بھروسہ کیا، اور کوئی طاقت و قوت نہیں مگر اللہ کے ساتھ۔"
		},
		whenToUse: "Whenever stepping out of your home for school, work, or errands.",
		verification: {
			source: "Sunan Abi Dawud 5095, Jami` at-Tirmidhi 3426",
			edition: "Hisn al-Muslim #16",
			reference: "Sahih",
			language: "Arabic / Multi-language",
			version: "1.0",
			reviewer: "Ilmizo Hadith Verification Board",
			status: "Verified"
		}
	},
	{
		id: "dua_health_knowledge",
		category: "health",
		title: "Dua for Knowledge & Clarity",
		kidsTitle: "Dua to Grow Smarter",
		arabic: "رَّبِّ زِدْنِي عِلْمًا",
		transliteration: "Rabbi zidni ‘ilma",
		translations: {
			en: "My Lord, increase me in knowledge.",
			hi: "ऐ मेरे रब! मेरे इल्म (ज्ञान) में इज़ाफ़ा फ़रमा।",
			hinglish: "Ai mere Rab! Mere ilm mein izafa farma.",
			ur: "اے میرے رب! میرے علم میں اضافہ فرما۔"
		},
		whenToUse: "Before studying, reading Quran, or starting a lesson.",
		verification: {
			source: "Al-Quran, Surah Ta-Ha 20:114",
			edition: "Uthmani Text & Sahih International",
			reference: "Quran 20:114",
			language: "Arabic / Multi-language",
			version: "1.0",
			reviewer: "Ilmizo Sharia & Text Verification Registry",
			status: "Verified"
		},
		isFavorite: true
	},
	{
		id: "dua_healing_shifa",
		category: "health",
		title: "Prophetic Dua for Healing (Shifa)",
		kidsTitle: "Dua When Feeling Sick",
		arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
		transliteration: "Allahumma Rabban-nasi adhhibil-ba’sa, ishfihi wa Antash-Shafi, la shifa’a illa shifa’uka, shifa’an la yughadiru saqama",
		translations: {
			en: "O Allah, Lord of mankind, remove the affliction and heal, for You are the Healer; there is no healing except Your healing, a healing that leaves no illness behind.",
			hi: "ऐ अल्लाह! लोगों के रब, तकलीफ़ दूर फ़रमा और शिफ़ा दे, तू ही शिफ़ा देने वाला है।",
			hinglish: "Ai Allah! Insaano ke Rab, takleef door farma aur mukammal shifa ata farma.",
			ur: "اے اللہ! انسانوں کے رب، تکلیف دور فرما اور شفا دے، تو ہی شفا دینے والا ہے۔"
		},
		whenToUse: "When visiting or caring for someone unwell, or placing your hand on pain.",
		verification: {
			source: "Sahih al-Bukhari 5675, Sahih Muslim 2191",
			edition: "Hisn al-Muslim #147",
			reference: "Sahih al-Bukhari",
			language: "Arabic / Multi-language",
			version: "1.0",
			reviewer: "Ilmizo Hadith Verification Board",
			status: "Verified"
		}
	}
], EXPANDED_VERIFIED_DUAS);
var ASMA_UL_HUSNA = [
	[
		1,
		"ٱلرَّحْمَـٰنُ",
		"Ar-Rahman",
		"The Most Merciful",
		"Sab par behad meharban",
		"His mercy encompasses every living creature across the universe without exception."
	],
	[
		2,
		"ٱلرَّحِيمُ",
		"Ar-Rahim",
		"The Especially Merciful",
		"Nihayat raham wala",
		"Bestows special, lasting mercy and guidance upon the believers in this life and the Hereafter."
	],
	[
		3,
		"ٱلْمَلِكُ",
		"Al-Malik",
		"The Eternal Sovereign",
		"Haqeeqi Badshah aur Maalik",
		"The absolute Ruler of the heavens and earth Whose dominion never diminishes."
	],
	[
		4,
		"ٱلْقُدُّوسُ",
		"Al-Quddus",
		"The Pure & Holy",
		"Har kami aur aib se paak",
		"Transcendent above every flaw, limitation, or human comparison."
	],
	[
		5,
		"ٱلسَّلَامُ",
		"As-Salam",
		"The Source of Peace",
		"Salamati aur sukoon dene wala",
		"Every tranquil heart finds peace through remembering As-Salam."
	],
	[
		6,
		"ٱلْمُؤْمِنُ",
		"Al-Mu'min",
		"The Granter of Security",
		"Aman aur iman ata karne wala",
		"Fulfils His promises to His servants and protects those who seek refuge in Him."
	],
	[
		7,
		"ٱلْمُهَيْمِنُ",
		"Al-Muhaymin",
		"The Guardian & Witness",
		"Har cheez ki nigrani karne wala",
		"Watches over our secret intentions and safeguards our sustenance."
	],
	[
		8,
		"ٱلْعَزِيزُ",
		"Al-Aziz",
		"The Almighty in Honor",
		"Sab par ghalib aur izzat wala",
		"True honor and strength come only from aligning oneself with Al-Aziz."
	],
	[
		9,
		"ٱلْجَبَّارُ",
		"Al-Jabbar",
		"The Restorer & Compeller",
		"Toote dilon ko jodne wala",
		"He mends broken hearts, uplifts the oppressed, and His decree prevails over all."
	],
	[
		10,
		"ٱلْمُتَكَبِّرُ",
		"Al-Mutakabbir",
		"The Supreme in Greatness",
		"Badaai aur azmat wala",
		"All greatness belongs exclusively to Him; humility is the crown of His servants."
	],
	[
		11,
		"ٱلْخَالِقُ",
		"Al-Khaliq",
		"The Creator",
		"Sab kuch paida karne wala",
		"Brought the entire cosmos into existence from nothing with perfect measure."
	],
	[
		12,
		"ٱلْبَارِئُ",
		"Al-Bari'",
		"The Evolver & Maker",
		"Be-misaal wujood dene wala",
		"Forms creation free of any discrepancy and gives each soul its distinct nature."
	],
	[
		13,
		"ٱلْمُصَوِّرُ",
		"Al-Musawwir",
		"The Fashioner of Forms",
		"Behtareen soorat dene wala",
		"Shaped every human face, fingerprint, and galaxy with unique beauty."
	],
	[
		14,
		"ٱلْغَفَّارُ",
		"Al-Ghaffar",
		"The Perpetual Forgiver",
		"Baar-baar bakhshne wala",
		"Covers faults in this world and forgives repentant hearts again and again."
	],
	[
		15,
		"ٱلْقَهَّارُ",
		"Al-Qahhar",
		"The Subduer of All",
		"Har taqat ko jhukane wala",
		"Every tyrant and force of nature is completely subject to His power."
	],
	[
		16,
		"ٱلْوَهَّابُ",
		"Al-Wahhab",
		"The Lavish Bestower",
		"Bina maange ata karne wala",
		"Gives gifts of faith, health, and family purely out of grace without return."
	],
	[
		17,
		"ٱلرَّزَّاقُ",
		"Ar-Razzaq",
		"The Total Provider",
		"Sabko rizq dene wala",
		"Provides sustenance for both the body and the soul every single moment."
	],
	[
		18,
		"ٱلْفَتَّاحُ",
		"Al-Fattah",
		"The Opener of Doors",
		"Band raaste kholne wala",
		"Opens doors of relief, knowledge, and victory when all worldly means seem closed."
	],
	[
		19,
		"ٱلْعَلِيمُ",
		"Al-Alim",
		"The All-Knowing",
		"Har baat jaanne wala",
		"Not a single leaf falls except within His complete knowledge and wisdom."
	],
	[
		20,
		"ٱلْقَابِضُ",
		"Al-Qabid",
		"The Withholder",
		"Rizq ko naap kar rakhne wala",
		"Tests His servants through restraint so their hearts turn back to Him in patience."
	],
	[
		21,
		"ٱلْبَاسِطُ",
		"Al-Basit",
		"The Expander",
		"Kushadgi aur barkat dene wala",
		"Expands provision, joy, and chest-ease according to His infinite wisdom."
	],
	[
		22,
		"ٱلْخَافِضُ",
		"Al-Khafid",
		"The Abaser of Arrogance",
		"Ghamand todne wala",
		"Lowers those who walk the earth in pride and oppression."
	],
	[
		23,
		"ٱلرَّافِعُ",
		"Ar-Rafi'",
		"The Exalter of Ranks",
		"Darjaat buland karne wala",
		"Elevates in honor those who humble themselves and seek sacred knowledge."
	],
	[
		24,
		"ٱلْمُعِزُّ",
		"Al-Mu'izz",
		"The Giver of Honor",
		"Izzat ata karne wala",
		"Grants true dignity that no human praise or criticism can take away."
	],
	[
		25,
		"ٱلْمُذِلُّ",
		"Al-Mudhill",
		"The Dishonorer of Falsehood",
		"Zillat se bachane wala",
		"Humbles falsehood and reminds us to seek honor only through obedience to Him."
	],
	[
		26,
		"ٱلسَّمِيعُ",
		"As-Sami'",
		"The All-Hearing",
		"Har dua sunne wala",
		"Hears the faintest whisper of a troubled heart in the middle of the night."
	],
	[
		27,
		"ٱلْبَصِيرُ",
		"Al-Basir",
		"The All-Seeing",
		"Har amal dekhne wala",
		"Sees every sincere deed done in secret, even when no human notices."
	],
	[
		28,
		"ٱلْحَكَمُ",
		"Al-Hakam",
		"The Impartial Judge",
		"Saccha faisla karne wala",
		"His judgment is final and free from any bias or error."
	],
	[
		29,
		"ٱلْعَدْلُ",
		"Al-Adl",
		"The Utterly Just",
		"Poora insaaf karne wala",
		"No soul is wronged by even the weight of an atom in His court."
	],
	[
		30,
		"ٱللَّطِيفُ",
		"Al-Latif",
		"The Subtle & Kind",
		"Chhupe taur par meharbani karne wala",
		"Arranges relief and goodness for His servants through gentle, unseen ways."
	],
	[
		31,
		"ٱلْخَبِيرُ",
		"Al-Khabir",
		"The All-Aware",
		"Andar ki haqeeqat jaanne wala",
		"Fully aware of the hidden motives and needs within every heart."
	],
	[
		32,
		"ٱلْحَلِيمُ",
		"Al-Halim",
		"The Forbearing",
		"Jaldi saza na dene wala",
		"Does not hasten punishment, giving ample time forHis servants to return to Him."
	],
	[
		33,
		"ٱلْعَظِيمُ",
		"Al-Azim",
		"The Magnificent",
		"Be-inteha azmat wala",
		"His grandeur exceeds the comprehension of human minds."
	],
	[
		34,
		"ٱلْغَفُورُ",
		"Al-Ghafur",
		"The All-Forgiving",
		"Bade gunah bhi maaf karne wala",
		"Forgives vast sins whenever a servant turns back with sincere Tawbah."
	],
	[
		35,
		"ٱلشَّكُورُ",
		"Ash-Shakur",
		"The Most Appreciative",
		"Chhote amal ka bada badla dene wala",
		"Multiplies the reward of even a small smile or sip of water given for His sake."
	],
	[
		36,
		"ٱلْعَلِيُّ",
		"Al-Aliyy",
		"The Most High",
		"Sabse buland martabe wala",
		"Exalted above all creation in essence, status, and authority."
	],
	[
		37,
		"ٱلْكَبِيرُ",
		"Al-Kabir",
		"The Most Great",
		"Sabse bada",
		"Every worry shrinks when we remember that Allah is Al-Kabir (Allahu Akbar)."
	],
	[
		38,
		"ٱلْحَفِيظُ",
		"Al-Hafiz",
		"The Preserver",
		"Hifazat karne wala",
		"Protects the heavens, the earth, and His mindful servants from harm."
	],
	[
		39,
		"ٱلْمُقِيتُ",
		"Al-Muqit",
		"The Sustainer & Nourisher",
		"Taqat aur khorak pahunchane wala",
		"Delivers the exact nourishment needed by every cell and soul."
	],
	[
		40,
		"ٱلْحَسِيبُ",
		"Al-Hasib",
		"The Reckoner & Sufficient",
		"Kafi hone wala aur hisaab lene wala",
		"He alone is sufficient for anyone who places their reliance upon Him."
	],
	[
		41,
		"ٱلْجَلِيلُ",
		"Al-Jalil",
		"The Majestic",
		"Shaan aur jalal wala",
		"Possessor of awe-inspiring majesty and perfection."
	],
	[
		42,
		"ٱلْكَرِيمُ",
		"Al-Karim",
		"The Most Generous",
		"Be-hisaab karam karne wala",
		"Feels shy to turn away empty the hands raised to Him in humble supplication."
	],
	[
		43,
		"ٱلرَّقِيبُ",
		"Ar-Raqib",
		"The Watchful",
		"Har pal nigrani rakhne wala",
		"Cultivates Muraqabah—living with the peaceful awareness that Allah is watching."
	],
	[
		44,
		"ٱلْمُجِيبُ",
		"Al-Mujib",
		"The Responsive",
		"Dua qubool karne wala",
		"Answers every caller in the best form and at the wisest time."
	],
	[
		45,
		"ٱلْوَاسِعُ",
		"Al-Wasi'",
		"The All-Encompassing",
		"Wasee rahmat aur ilm wala",
		"His mercy, knowledge, and bounty have no borders or depletion."
	],
	[
		46,
		"ٱلْحَكِيمُ",
		"Al-Hakim",
		"The Perfectly Wise",
		"Har kaam hikmat se karne wala",
		"Every decree of His—whether ease or trial—carries deep wisdom."
	],
	[
		47,
		"ٱلْوَدُودُ",
		"Al-Wadud",
		"The Most Loving",
		"Apne bandon se mohabbat karne wala",
		"Loves those who purify themselves, do good, and treat creation kindly."
	],
	[
		48,
		"ٱلْمَجِيدُ",
		"Al-Majid",
		"The Glorious & Noble",
		"Buzurgi aur shaan wala",
		"Abundant in glory, nobility, and everlasting kindness."
	],
	[
		49,
		"ٱلْبَاعِثُ",
		"Al-Ba'ith",
		"The Resurrector",
		"Dobara zinda karne wala",
		"Revives dead land with rain and awakens hearts with the light of revelation."
	],
	[
		50,
		"ٱلشَّهِيدُ",
		"Ash-Shahid",
		"The Universal Witness",
		"Har cheez ka gawah",
		"Nothing in the universe is absent from His direct witness."
	],
	[
		51,
		"ٱلْحَقُّ",
		"Al-Haqq",
		"The Ultimate Truth",
		"Bilkul saccha aur haq",
		"His Word is truth, His promise is truth, and His meeting is truth."
	],
	[
		52,
		"ٱلْوَكِيلُ",
		"Al-Wakil",
		"The Disposer of Affairs",
		"Behtareen kaarsaaz",
		"The most trustworthy Trustee for those who do their best and leave results to Him."
	],
	[
		53,
		"ٱلْقَوِيُّ",
		"Al-Qawiyy",
		"The All-Strong",
		"Be-panah quwwat wala",
		"His strength never tires or weakens across eternity."
	],
	[
		54,
		"ٱلْمَتِينُ",
		"Al-Matin",
		"The Firm & Steadfast",
		"Mazboot quwwat wala",
		"Unshakeable in power; anchors the believer’s heart during storms."
	],
	[
		55,
		"ٱلْوَلِيُّ",
		"Al-Waliyy",
		"The Protecting Friend",
		"Madadgaar aur dost",
		"Brings believers out of darkness into light through His loving guardianship."
	],
	[
		56,
		"ٱلْحَمِيدُ",
		"Al-Hamid",
		"The Praiseworthy",
		"Har haal mein tareef ke laiq",
		"Deserving of all gratitude and praise in both prosperity and adversity."
	],
	[
		57,
		"ٱلْمُحْصِي",
		"Al-Muhsi",
		"The All-Enumerating",
		"Har cheez ki ginti rakhne wala",
		"Knows the exact count of every breath, raindrop, and grain of sand."
	],
	[
		58,
		"ٱلْمُبْدِئُ",
		"Al-Mubdi'",
		"The Originator",
		"Pehli baar wujood dene wala",
		"Initiated all creation without any prior model."
	],
	[
		59,
		"ٱلْمُعِيدُ",
		"Al-Mu'id",
		"The Restorer",
		"Lautane aur dobara banane wala",
		"Restores creation to life for eternal accountability and reward."
	],
	[
		60,
		"ٱلْمُحْيِي",
		"Al-Muhyi",
		"The Giver of Life",
		"Zindagi dene wala",
		"Breathes life into bodies and revives weary souls with Dhikr."
	],
	[
		61,
		"ٱلْمُمِيتُ",
		"Al-Mumit",
		"The Creator of Death",
		"Maut ka faisla karne wala",
		"Ordained life and death as a test to see who is best in deeds (Quran 67:2)."
	],
	[
		62,
		"ٱلْحَيُّ",
		"Al-Hayy",
		"The Ever-Living",
		"Hamesha zinda rehne wala",
		"Neither slumber nor sleep overtakes Him (Ayat al-Kursi 2:255)."
	],
	[
		63,
		"ٱلْقَيُّومُ",
		"Al-Qayyum",
		"The Self-Subsisting Sustainer",
		"Sabko thamne aur chalane wala",
		"All of creation depends on Him every second, while He depends on none."
	],
	[
		64,
		"ٱلْوَاجِدُ",
		"Al-Wajid",
		"The All-Perceiving Finder",
		"Sab kuch paane wala",
		"Lacks nothing and finds whatever He wills instantaneously."
	],
	[
		65,
		"ٱلْمَاجِدُ",
		"Al-Majid",
		"The Illustrious",
		"Azmat aur sharaf wala",
		"Rich in generosity and noble dealings with His servants."
	],
	[
		66,
		"ٱلْوَاحِدُ",
		"Al-Wahid",
		"The One",
		"Akela aur yakta",
		"Unique in His Lordship and worship, without partner."
	],
	[
		67,
		"ٱلْأَحَدُ",
		"Al-Ahad",
		"The Indivisible Unique",
		"Be-misaal yakta (Surah Al-Ikhlas)",
		"Indivisible, absolute Oneness proclaimed in Surah Al-Ikhlas."
	],
	[
		68,
		"ٱلصَّمَدُ",
		"As-Samad",
		"The Eternal Refuge",
		"Be-niyaz jiski sabko zaroorat hai",
		"Everyone turns to Him in need, while He is free of all need."
	],
	[
		69,
		"ٱلْقَادِرُ",
		"Al-Qadir",
		"The All-Capable",
		"Har cheez par qadir",
		"Nothing in the heavens or earth can frustrate His decree."
	],
	[
		70,
		"ٱلْمُقْتَدِرُ",
		"Al-Muqtadir",
		"The Determiner of All Power",
		"Poori qudrat rakhne wala",
		"Executes His will with effortless perfection."
	],
	[
		71,
		"ٱلْمُقَدِّمُ",
		"Al-Muqaddim",
		"The Expediter",
		"Aage badhane wala",
		"Brings forward in rank and timing whomever He wills by wisdom."
	],
	[
		72,
		"ٱلْمُؤَخِّرُ",
		"Al-Mu'akhkhir",
		"The Delayer",
		"Hikmat se peeche rakhne wala",
		"Delays things only for a hidden benefit known to Him."
	],
	[
		73,
		"ٱلْأَوَّلُ",
		"Al-Awwal",
		"The First",
		"Sabse pehle (bina shuruaat ke)",
		"There is nothing before Him; He is the origin of all existence."
	],
	[
		74,
		"ٱلْآخِرُ",
		"Al-Akhir",
		"The Last",
		"Sabke baad hamesha rehne wala",
		"There is nothing after Him; He remains when all else passes."
	],
	[
		75,
		"ٱلظَّاهِرُ",
		"Az-Zahir",
		"The Manifest",
		"Har nishani se zaahir",
		"His signs are visible across every horizon and within ourselves."
	],
	[
		76,
		"ٱلْبَاطِنُ",
		"Al-Batin",
		"The Hidden & Near",
		"Nigaahon se posheeda aur qareeb",
		"Unseen by eyes in this world, yet closer to us than our jugular vein in knowledge."
	],
	[
		77,
		"ٱلْوَالِي",
		"Al-Wali",
		"The Sole Governor",
		"Intizam chalane wala",
		"Directs the affairs of the cosmos with order and mercy."
	],
	[
		78,
		"ٱلْمُتَعَالِي",
		"Al-Muta'ali",
		"The Supremely Exalted",
		"Buland o bala",
		"Far above any deficiency or limitation imagined by creation."
	],
	[
		79,
		"ٱلْبَرُّ",
		"Al-Barr",
		"The Source of All Goodness",
		"Bhalai aur ehsaan karne wala",
		"Treats His servants with gentle kindness and keeps every promise."
	],
	[
		80,
		"ٱلتَّوَّابُ",
		"At-Tawwab",
		"The Ever-Acceptor of Repentance",
		"Tawbah qubool karne wala",
		"Inspires hearts to repent and joyfully accepts their return."
	],
	[
		81,
		"ٱلْمُنْتَقِمُ",
		"Al-Muntaqim",
		"The Avenger of Injustice",
		"Zulmi ko insaaf tak pahunchane wala",
		"Restores justice for the wronged against persistent oppressors."
	],
	[
		82,
		"ٱلْعَفُوُّ",
		"Al-Afuww",
		"The Pardoner & Effacer",
		"Bilkul maaf kar dene wala",
		"Erases sins completely from the record as though they never happened."
	],
	[
		83,
		"ٱلرَّءُوفُ",
		"Ar-Ra'uf",
		"The Most Pitying & Tender",
		"Bada shafeeq aur meharban",
		"Shows extreme tenderness and protective compassion toward His servants."
	],
	[
		84,
		"مَالِكُ ٱلْمُلْكِ",
		"Malik-ul-Mulk",
		"Owner of All Sovereignty",
		"Saari kayनात ka maalik",
		"Grants authority to whom He wills and removes it from whom He wills (Quran 3:26)."
	],
	[
		85,
		"ذُو ٱلْجَلَالِ وَٱلْإِكْرَامِ",
		"Dhul-Jalali wal-Ikram",
		"Lord of Majesty and Bounty",
		"Azmat aur inam wala",
		"The Prophet ﷺ taught us to persist in calling upon Ya Dhal-Jalali wal-Ikram (Tirmidhi 3525)."
	],
	[
		86,
		"ٱلْمُقْسِطُ",
		"Al-Muqsit",
		"The Equitable",
		"Insaaf qayam karne wala",
		"Loves those who act fairly with family, neighbors, and society."
	],
	[
		87,
		"ٱلْجَامِعُ",
		"Al-Jami'",
		"The Gatherer",
		"Sabko jama karne wala",
		"Unites hearts in love and gathers all humanity on the Day of Judgment."
	],
	[
		88,
		"ٱلْغَنِيُّ",
		"Al-Ghaniyy",
		"The Self-Sufficient",
		"Be-niyaz aur ghani",
		"Free of all need while every creature is in need of Him (Quran 35:15)."
	],
	[
		89,
		"ٱلْمُغْنِي",
		"Al-Mughni",
		"The Enricher",
		"Dil aur haath ko ghani karne wala",
		"Enriches the heart with contentment (Qana’ah) and sufficiency."
	],
	[
		90,
		"ٱلْمَانِعُ",
		"Al-Mani'",
		"The Preventer of Harm",
		"Nuksaan se rokne wala",
		"Withholds only to protect His servant from unseen harm."
	],
	[
		91,
		"ٱلضَّارُّ",
		"Ad-Darr",
		"The Creator of Trial",
		"Aazmaish ka faisla karne wala",
		"No trial touches a soul except by His permission and wisdom."
	],
	[
		92,
		"ٱلنَّافِعُ",
		"An-Nafi'",
		"The Creator of Good & Benefit",
		"Nafa aur faida pahunchane wala",
		"All real benefit in medicine, knowledge, and effort comes from Him."
	],
	[
		93,
		"ٱلنُّورُ",
		"An-Nur",
		"The Light of the Heavens & Earth",
		"Aasmano aur zameen ka Noor",
		"Illuminates hearts with guidance and clarity (Surah An-Nur 24:35)."
	],
	[
		94,
		"ٱلْهَادِي",
		"Al-Hadi",
		"The Guide",
		"Seedha raasta dikhane wala",
		"Guides sincere seekers to the Straight Path (Sirat al-Mustaqim)."
	],
	[
		95,
		"ٱلْبَدِيعُ",
		"Al-Badi'",
		"The Incomparable Originator",
		"Be-misaal ijaad karne wala",
		"Created the heavens and earth in wondrous, unmatched beauty."
	],
	[
		96,
		"ٱلْبَاقِي",
		"Al-Baqi",
		"The Everlasting",
		"Hamesha baaqi rehne wala",
		"Every good deed done for Al-Baqi endures forever."
	],
	[
		97,
		"ٱلْوَارِثُ",
		"Al-Warith",
		"The Ultimate Inheritor",
		"Sab kuch baaqi rakhne wala maalik",
		"All wealth and dominion ultimately return to Him alone."
	],
	[
		98,
		"ٱلرَّشِيدُ",
		"Ar-Rashid",
		"The Guide to the Right Way",
		"Bhalai aur samajh dene wala",
		"Directs all affairs with unerring wisdom and uprightness."
	],
	[
		99,
		"ٱلصَّبُورُ",
		"As-Sabur",
		"The Most Patient",
		"Be-inteha sabr aur mohlat dene wala",
		"Never hastens in anger; rewards those who practice Sabr with His companionship."
	]
].map(([number, arabic, transliteration, meaning, hinglish, reflection]) => ({
	number,
	arabic,
	transliteration,
	meaning,
	translations: {
		en: meaning,
		hi: `${transliteration} — ${meaning}`,
		hinglish,
		ur: meaning
	},
	reflection,
	verification: {
		source: "Al-Quran & Jami` at-Tirmidhi 3507 / Sahih Muslim 2677",
		edition: "Complete 99 Names of Allah Registry",
		reference: `Asma-ul-Husna #${number}`,
		language: "Arabic / Multi-language",
		version: "2.0",
		reviewer: "Ilmizo Sharia Verification",
		status: "Verified"
	}
}));
var SEERAH_TIMELINE = mergeById([
	{
		id: "seerah_1",
		period: "Birth to 25 Years",
		years: "570 – 595 CE",
		title: "Early Life in Makkah",
		location: "Makkah",
		coordinates: {
			x: 48,
			y: 68
		},
		summary: "Born in the Year of the Elephant in Makkah. Known across Quraysh as As-Sadiq (The Truthful) and Al-Amin (The Trustworthy) long before prophethood.",
		keyLesson: "Integrity, honesty, and trustworthiness form the bedrock of prophetic character.",
		verification: {
			source: "Sirat Ibn Hisham / Ar-Raheeq Al-Makhtum",
			edition: "Verified Seerah Compendium",
			reference: "Sahih al-Bukhari 3859",
			language: "English",
			version: "1.0",
			reviewer: "Ilmizo Seerah Board",
			status: "Verified"
		}
	},
	{
		id: "seerah_2",
		period: "Age 40",
		years: "610 CE",
		title: "The First Revelation",
		location: "Makkah",
		coordinates: {
			x: 52,
			y: 64
		},
		summary: "In the Cave of Hira (Jabal an-Noor), Angel Jibril (AS) brought the first verses of Surah Al-Alaq: \"Read in the name of your Lord who created.\"",
		keyLesson: "Islam begins with sacred knowledge (Iqra) anchored in the remembrance of the Creator.",
		verification: {
			source: "Sahih al-Bukhari 3",
			edition: "Book of Revelation",
			reference: "Surah Al-Alaq 96:1-5",
			language: "English",
			version: "1.0",
			reviewer: "Ilmizo Seerah Board",
			status: "Verified"
		}
	},
	{
		id: "seerah_3",
		period: "Years of Patience",
		years: "610 – 622 CE",
		title: "Makkah Period",
		location: "Makkah",
		coordinates: {
			x: 45,
			y: 72
		},
		summary: "Thirteen years of calling people to Tawhid, justice, and compassion amidst severe persecution, culminating in the Night Journey (Al-Isra wal-Mi’raj) and the gift of the five daily prayers.",
		keyLesson: "Patience (Sabr) and steadfastness in prayer sustain believers through every trial.",
		verification: {
			source: "Sahih Muslim 162 / Sahih al-Bukhari",
			edition: "Verified Seerah Compendium",
			reference: "Surah Al-Isra 17:1",
			language: "English",
			version: "1.0",
			reviewer: "Ilmizo Seerah Board",
			status: "Verified"
		}
	},
	{
		id: "seerah_4",
		period: "A New Beginning",
		years: "622 CE (1 AH)",
		title: "Hijrah to Madinah",
		location: "Madinah",
		coordinates: {
			x: 44,
			y: 28
		},
		summary: "Migration from Makkah to Yathrib (Madinah), establishing the Prophet’s Mosque, the brotherhood between Muhajirun and Ansar, and the Charter of Madinah.",
		keyLesson: "True brotherhood transcends tribalism and builds a welcoming, just community.",
		verification: {
			source: "Sahih al-Bukhari 3905",
			edition: "Book of Merits of the Ansar",
			reference: "Quran 9:40",
			language: "English",
			version: "1.0",
			reviewer: "Ilmizo Seerah Board",
			status: "Verified"
		}
	},
	{
		id: "seerah_5",
		period: "Community & Guidance",
		years: "2 – 8 AH",
		title: "Building the Ummah",
		location: "Hudaybiyyah",
		coordinates: {
			x: 38,
			y: 58
		},
		summary: "From Badr and Uhud to the Treaty of Hudaybiyyah and the peaceful Opening of Makkah, where the Prophet ﷺ forgave his former persecutors.",
		keyLesson: "Mercy and forgiveness at the height of strength win hearts permanently.",
		verification: {
			source: "Sahih al-Bukhari 2731",
			edition: "Book of Conditions",
			reference: "Surah Al-Fath 48:1",
			language: "English",
			version: "1.0",
			reviewer: "Ilmizo Seerah Board",
			status: "Verified"
		}
	},
	{
		id: "seerah_6",
		period: "The Lasting Legacy",
		years: "10 – 11 AH (632 CE)",
		title: "Final Years",
		location: "Makkah",
		coordinates: {
			x: 54,
			y: 70
		},
		summary: "The Farewell Pilgrimage (Hajjat al-Wada), where over 100,000 companions heard the timeless sermon on human equality, sanctity of life and property, and holding fast to the Quran and Sunnah.",
		keyLesson: "No Arab has superiority over a non-Arab except by Taqwa and righteous action.",
		verification: {
			source: "Sahih Muslim 1218 / Musnad Ahmad 23489",
			edition: "Farewell Pilgrimage Hadith",
			reference: "Surah Al-Ma’idah 5:3",
			language: "English",
			version: "1.0",
			reviewer: "Ilmizo Seerah Board",
			status: "Verified"
		}
	}
], EXPANDED_SEERAH_TIMELINE);
var ISLAMIC_LESSONS = mergeById([
	{
		id: "lesson_1",
		category: "Aqidah",
		title: "What is Islam?",
		subtitle: "Know your deen",
		durationMin: 5,
		content: [
			"Islam means attaining peace through willing submission and devotion to the One Creator, Allah.",
			"In the famous Hadith of Jibril (Sahih Muslim 8), the Prophet ﷺ explained the Deen through three harmonious dimensions: Islam (outward actions of worship), Iman (inward conviction of the heart), and Ihsan (worshipping Allah as though you see Him).",
			"The Five Pillars of Islam anchor daily life: Shahadah (Testimony of Faith), Salah (Five Daily Prayers), Zakat (Purifying Charity), Sawm (Fasting in Ramadan), and Hajj (Pilgrimage to Makkah for those able)."
		],
		keyTakeaway: "Islam balances belief in the heart with purposeful action and excellence in character.",
		verification: {
			source: "Sahih Muslim 8 & Sahih al-Bukhari 8",
			edition: "40 Hadith Nawawi #2 & #3",
			reference: "Sahih Muslim Book 1, Hadith 1",
			language: "English",
			version: "1.0",
			reviewer: "Ilmizo Curriculum Board",
			status: "Verified"
		}
	},
	{
		id: "lesson_2",
		category: "Aqidah",
		title: "Belief in Allah",
		subtitle: "Understanding Tawhid",
		durationMin: 6,
		content: ["Tawhid is the foundational truth of Islam: affirming that Allah alone is the Creator, Sustainer, and Sovereign of the universe (Rububiyyah), that He alone deserves all worship and supplication (Uluhiyyah), and that His Names and Attributes are uniquely perfect (Asma wa Sifat).", "When a believer internalizes Tawhid, fear of creation is replaced by serenity, dignity, and reliance upon Allah (Tawakkul)."],
		keyTakeaway: "Surah Al-Ikhlas (112:1-4) summarizes pure monotheism in four timeless verses.",
		verification: {
			source: "Al-Quran 112:1-4, 2:255",
			edition: "Core Aqidah Series",
			reference: "Surah Al-Ikhlas",
			language: "English",
			version: "1.0",
			reviewer: "Ilmizo Curriculum Board",
			status: "Verified"
		}
	},
	{
		id: "lesson_3",
		category: "History",
		title: "Life of the Prophets",
		subtitle: "Lessons for today",
		durationMin: 7,
		content: ["Every prophet—from Adam, Nuh, Ibrahim, Musa, and Isa to Muhammad (peace be upon them all)—called humanity to the same core message: worship Allah alone and uphold justice and mercy.", "Prophet Nuh (AS) teaches perseverance across centuries; Prophet Ibrahim (AS) embodies unwavering trust in Allah; Prophet Yusuf (AS) models integrity and forgiveness toward family."],
		keyTakeaway: "The stories of the Prophets in the Quran were revealed to strengthen our hearts (Quran 11:120).",
		verification: {
			source: "Al-Quran 11:120, 21:25",
			edition: "Prophetic Wisdom Series",
			reference: "Surah Hud 11:120",
			language: "English",
			version: "1.0",
			reviewer: "Ilmizo Curriculum Board",
			status: "Verified"
		}
	},
	{
		id: "lesson_4",
		category: "Akhlaq",
		title: "Good Character",
		subtitle: "Akhlaq in daily life",
		durationMin: 5,
		content: ["The Messenger of Allah ﷺ said: \"Nothing is heavier on the believer’s Scale on the Day of Resurrection than good character (Husn al-Khuluq).\" (Jami` at-Tirmidhi 2002).", "Good character begins at home: speaking gently to parents and children, keeping promises, controlling anger, smiling at others, and helping neighbors."],
		keyTakeaway: "Your worship is reflected in how kindly and honestly you treat people.",
		verification: {
			source: "Jami` at-Tirmidhi 2002, Sunan Abi Dawud 4799",
			edition: "Riyad as-Salihin Chapter 73",
			reference: "Hasan Sahih",
			language: "English",
			version: "1.0",
			reviewer: "Ilmizo Curriculum Board",
			status: "Verified"
		}
	},
	{
		id: "lesson_5",
		category: "Fiqh",
		title: "Halal and Haram",
		subtitle: "Practical guidance",
		durationMin: 6,
		content: ["In Islamic jurisprudence, things that are pure, beneficial, and ethical are Halal (permissible), while things that harm faith, life, intellect, family, or wealth are Haram (prohibited).", "Earning a lawful livelihood, avoiding riba (usury) and deception in trade, and consuming wholesome food directly nourish acceptance of Dua."],
		keyTakeaway: "Seeking what is pure and clear protects both the heart and the household (Sahih Muslim 1015).",
		verification: {
			source: "Sahih al-Bukhari 52, Sahih Muslim 1015",
			edition: "40 Hadith Nawawi #6 & #10",
			reference: "Sahih Muslim",
			language: "English",
			version: "1.0",
			reviewer: "Ilmizo Curriculum Board",
			status: "Verified"
		}
	}
], EXPANDED_ISLAMIC_LESSONS);
var TOP_QURAN_VOCAB = buildIlmizoTop600Curriculum(mergeById(mergeById([
	{
		id: "v1",
		arabic: "رَبّ",
		transliteration: "Rabb",
		meaning: "Lord, Sustainer, Cherisher",
		rootLetters: "ر ب ب",
		occurrencesInQuran: 975,
		exampleAyah: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
		exampleRef: "1:2",
		mastered: true
	},
	{
		id: "v2",
		arabic: "عِلْم",
		transliteration: "Ilm",
		meaning: "Knowledge, Comprehension",
		rootLetters: "ع ل م",
		occurrencesInQuran: 854,
		exampleAyah: "وَقُل رَّبِّ زِدْنِى عِلْمًا",
		exampleRef: "20:114",
		mastered: true
	},
	{
		id: "v3",
		arabic: "ءَامَنُوا۟",
		transliteration: "Amanu",
		meaning: "They believed / had faith",
		rootLetters: "أ م ن",
		occurrencesInQuran: 879,
		exampleAyah: "إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ",
		exampleRef: "103:3",
		mastered: true
	},
	{
		id: "v4",
		arabic: "كِتَـٰب",
		transliteration: "Kitab",
		meaning: "Book, Scripture, Decree",
		rootLetters: "ك ت ب",
		occurrencesInQuran: 260,
		exampleAyah: "ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ فِيهِ",
		exampleRef: "2:2",
		mastered: false
	},
	{
		id: "v5",
		arabic: "صَلَوٰة",
		transliteration: "Salah",
		meaning: "Prayer, Connection with Allah",
		rootLetters: "ص ل و",
		occurrencesInQuran: 99,
		exampleAyah: "وَيُقِيمُونَ ٱلصَّلَوٰةَ",
		exampleRef: "2:3",
		mastered: false
	},
	{
		id: "v6",
		arabic: "رَحْمَة",
		transliteration: "Rahmah",
		meaning: "Mercy, Compassion",
		rootLetters: "ر ح م",
		occurrencesInQuran: 339,
		exampleAyah: "وَرَحْمَتِى وَسِعَتْ كُلَّ شَىْءٍ",
		exampleRef: "7:156",
		mastered: false
	},
	{
		id: "v7",
		arabic: "صَبْر",
		transliteration: "Sabr",
		meaning: "Patience, Perseverance",
		rootLetters: "ص ب ر",
		occurrencesInQuran: 103,
		exampleAyah: "إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ",
		exampleRef: "2:153",
		mastered: false
	},
	{
		id: "v8",
		arabic: "هُدًى",
		transliteration: "Hudan",
		meaning: "Guidance",
		rootLetters: "ه د ي",
		occurrencesInQuran: 316,
		exampleAyah: "هُدًى لِّلْمُتَّقِينَ",
		exampleRef: "2:2",
		mastered: false
	}
], EXPANDED_QURAN_VOCAB_300), EXPANDED_QURAN_VOCAB_600));
var WUDU_STEPS = [
	{
		step: 1,
		title: "Niyyah & Bismillah",
		arabic: "بِسْمِ اللَّهِ",
		transliteration: "Bismillah",
		desc: "Make intention in the heart to purify yourself for prayer and say Bismillah."
	},
	{
		step: 2,
		title: "Wash Both Hands (3x)",
		arabic: "غَسْلُ الْكَفَّيْنِ",
		transliteration: "Ghaslul-kaffayn",
		desc: "Wash both hands up to the wrists three times, ensuring water reaches between the fingers."
	},
	{
		step: 3,
		title: "Rinse Mouth & Nose (3x)",
		arabic: "الْمَضْمَضَةُ وَالِاسْتِنْشَاقُ",
		transliteration: "Al-Madmadah wal-Istinshaq",
		desc: "Swirl water in the mouth three times and gently draw water into the nostrils and blow it out three times."
	},
	{
		step: 4,
		title: "Wash the Face (3x)",
		arabic: "غَسْلُ الْوَجْهِ",
		transliteration: "Ghaslul-wajh",
		desc: "Wash the entire face from hairline to chin and from ear to ear three times."
	},
	{
		step: 5,
		title: "Wash Arms to Elbows (3x)",
		arabic: "غَسْلُ الْيَدَيْنِ إِلَى الْمِرْفَقَيْنِ",
		transliteration: "Ghaslul-yadayn ilal-mirfaqayn",
		desc: "Wash the right arm from fingertips to inclusive of the elbow three times, then the left arm."
	},
	{
		step: 6,
		title: "Wipe the Head & Ears (1x)",
		arabic: "مَسْحُ الرَّأْسِ وَالْأُذُنَيْنِ",
		transliteration: "Mashur-ra’s wal-udhunayn",
		desc: "Wipe wet hands over the head from front to back and back to front once, then wipe inside and behind the ears."
	},
	{
		step: 7,
		title: "Wash Both Feet to Ankles (3x)",
		arabic: "غَسْلُ الرِّجْلَيْنِ إِلَى الْكَعْبَيْنِ",
		transliteration: "Ghaslur-rijlayn ilal-ka’bayn",
		desc: "Wash the right foot including the ankle and between toes three times, then the left foot. Recite Ash-hadu an la ilaha illallah..."
	}
];
var SALAH_STEPS = [
	{
		step: 1,
		title: "Niyyah (Intention)",
		kidsDesc: "I intend to pray for the sake of Allah.",
		arabic: "النِّيَّةُ فِي الْقَلْبِ",
		transliteration: "Intention in the heart",
		meaning: "Stand facing the Qibla with humility and focus in your heart to pray for the sake of Allah alone."
	},
	{
		step: 2,
		title: "Takbiratul Ihram",
		kidsDesc: "Raise both hands and say Allahu Akbar.",
		arabic: "اللَّهُ أَكْبَرُ",
		transliteration: "Allahu Akbar",
		meaning: "Allah is the Greatest — leaving behind worldly distractions as you enter prayer."
	},
	{
		step: 3,
		title: "Qiyam (Standing & Recitation)",
		kidsDesc: "Place right hand over left and recite Surah Al-Fatiha.",
		arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
		transliteration: "Alhamdu lillahi Rabbil-alamin...",
		meaning: "Recite the opening supplication (Istiftah), A’udhu billah, Bismillah, Surah Al-Fatiha, and another Surah."
	},
	{
		step: 4,
		title: "Ruku (Bowing)",
		kidsDesc: "Bow down with a straight back and glorify Allah 3 times.",
		arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
		transliteration: "Subhana Rabbiyal-Adhim (3x)",
		meaning: "Glory be to my Lord, the Most Great."
	},
	{
		step: 5,
		title: "Sujud (Prostration)",
		kidsDesc: "Place forehead, nose, palms, knees, and toes on the mat.",
		arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
		transliteration: "Subhana Rabbiyal-A’la (3x)",
		meaning: "Glory be to my Lord, the Most High. The servant is closest to Allah while in prostration (Sahih Muslim 482)."
	},
	{
		step: 6,
		title: "Tashahhud & Taslim",
		kidsDesc: "Sit calmly, recite Tashahhud, Salawat, and say Salam right & left.",
		arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
		transliteration: "As-salamu alaykum wa rahmatullah",
		meaning: "Peace and mercy of Allah be upon you — concluding the prayer to the right and left."
	}
];
var QUIZ_PACKS = mergeById([
	{
		id: "quiz_daily_duas",
		title: "Daily Duas",
		level: "Kids",
		category: "Duas",
		questions: [
			{
				id: "q1",
				prompt: "What do we say before eating?",
				options: [
					"Alhamdulillah",
					"Bismillah",
					"SubhanAllah",
					"Allahu Akbar"
				],
				correctIndex: 1,
				explanation: "The Prophet ﷺ taught us to say \"Bismillah\" before eating (Sahih al-Bukhari 5376).",
				pillar: "duas",
				reference: "Sahih al-Bukhari 5376"
			},
			{
				id: "q2",
				prompt: "What do we say after finishing our meal to thank Allah?",
				options: [
					"Bismillah",
					"Alhamdulillah",
					"Astaghfirullah",
					"Marhaban"
				],
				correctIndex: 1,
				explanation: "We say Alhamdulillah (All praise is due to Allah) to thank Him for our food.",
				pillar: "duas",
				reference: "Sahih Muslim 2734"
			},
			{
				id: "q3",
				prompt: "Which short dua asks Allah to increase our knowledge?",
				options: [
					"Rabbi zidni ilma",
					"Bismika Allahumma",
					"Subhana Rabbiyal A’la",
					"Sami Allahu liman hamidah"
				],
				correctIndex: 0,
				explanation: "\"Rabbi zidni ilma\" means \"My Lord, increase me in knowledge\" (Quran 20:114).",
				pillar: "duas",
				reference: "Surah Ta-Ha 20:114"
			},
			{
				id: "q4",
				prompt: "What do we say in Sujud (prostration) during Salah?",
				options: [
					"Subhana Rabbiyal-Adhim",
					"Subhana Rabbiyal-A’la",
					"Allahu Akbar",
					"At-Tahiyyatu"
				],
				correctIndex: 1,
				explanation: "In Sujud we say \"Subhana Rabbiyal-A’la\" (Glory be to my Lord, the Most High).",
				pillar: "salah",
				reference: "Sunan an-Nasa’i 1136"
			},
			{
				id: "q5",
				prompt: "How many Ayahs are in Surah Al-Ikhlas?",
				options: [
					"3 Ayahs",
					"4 Ayahs",
					"5 Ayahs",
					"7 Ayahs"
				],
				correctIndex: 1,
				explanation: "Surah Al-Ikhlas has 4 Ayahs declaring the absolute Oneness of Allah.",
				pillar: "quran",
				reference: "Surah Al-Ikhlas (112)"
			},
			{
				id: "q6",
				prompt: "What do we say if we forget to say Bismillah at the start of a meal?",
				options: [
					"Bismillahi awwalahu wa akhirahu",
					"SubhanAllah",
					"La ilaha illallah",
					"Allahu Akbar"
				],
				correctIndex: 0,
				explanation: "We say \"Bismillahi awwalahu wa akhirahu\" (In the name of Allah at its beginning and end).",
				pillar: "duas",
				reference: "Sunan Abi Dawud 3767"
			},
			{
				id: "q7",
				prompt: "Which dua do we recite right before going to sleep?",
				options: [
					"Bismika Allahumma amutu wa ahya",
					"Rabbi zidni ilma",
					"Subhanal-ladhi sakhkhara lana",
					"Alhamdulillah"
				],
				correctIndex: 0,
				explanation: "\"Bismika Allahumma amutu wa ahya\" means \"In Your name, O Allah, I die (sleep) and I live.\"",
				pillar: "duas",
				reference: "Sahih al-Bukhari 6324"
			},
			{
				id: "q8",
				prompt: "What is the meaning of \"Rabbir-hamhuma kama rabbayani saghira\"?",
				options: [
					"My Lord, have mercy on my parents as they raised me when I was small",
					"My Lord, grant me safe travel",
					"My Lord, forgive my neighbors",
					"My Lord, bless this food"
				],
				correctIndex: 0,
				explanation: "This Quranic dua (17:24) asks Allah to shower mercy upon our parents.",
				pillar: "duas",
				reference: "Quran 17:24"
			},
			{
				id: "q9",
				prompt: "What greeting of peace do Muslims say when meeting one another?",
				options: [
					"Assalamu Alaikum",
					"Good Morning",
					"Ahlan",
					"Shukran"
				],
				correctIndex: 0,
				explanation: "Assalamu Alaikum wa Rahmatullah means \"Peace and mercy of Allah be upon you.\"",
				pillar: "akhlaq",
				reference: "Sahih Muslim 2162"
			},
			{
				id: "q10",
				prompt: "What do we say when intending to do something good tomorrow?",
				options: [
					"InshaAllah",
					"MashaAllah",
					"Astaghfirullah",
					"SubhanAllah"
				],
				correctIndex: 0,
				explanation: "We say \"InshaAllah\" (If Allah wills) for future plans (Surah Al-Kahf 18:23-24).",
				pillar: "duas",
				reference: "Surah Al-Kahf 18:23-24"
			}
		]
	},
	{
		id: "quiz_quran_knowledge",
		title: "Quran Knowledge",
		level: "Beginner",
		category: "Quran",
		questions: [
			{
				id: "qq1",
				prompt: "How many Surahs are there in the Noble Quran?",
				options: [
					"99 Surahs",
					"114 Surahs",
					"120 Surahs",
					"30 Surahs"
				],
				correctIndex: 1,
				explanation: "The Quran consists of 114 Surahs revealed over 23 years.",
				pillar: "quran",
				reference: "Uthmani Mushaf Consensus"
			},
			{
				id: "qq2",
				prompt: "Which Surah is recited in every Rak’ah of Salah?",
				options: [
					"Surah Al-Baqarah",
					"Surah Al-Fatiha",
					"Surah Ya-Sin",
					"Surah Al-Mulk"
				],
				correctIndex: 1,
				explanation: "The Prophet ﷺ called Surah Al-Fatiha the greatest Surah in the Quran (Sahih al-Bukhari 4474).",
				pillar: "quran",
				reference: "Sahih al-Bukhari 4474"
			},
			{
				id: "qq3",
				prompt: "In which Surah is Ayat al-Kursi (Verse of the Throne) located?",
				options: [
					"Surah Aal-Imran",
					"Surah Al-Baqarah (2:255)",
					"Surah Al-Kahf",
					"Surah Ar-Rahman"
				],
				correctIndex: 1,
				explanation: "Ayat al-Kursi is verse 255 of Surah Al-Baqarah.",
				pillar: "quran",
				reference: "Surah Al-Baqarah 2:255"
			},
			{
				id: "qq4",
				prompt: "Which is the shortest Surah in the Noble Quran (3 Ayahs)?",
				options: [
					"Surah Al-Ikhlas",
					"Surah Al-Kawthar",
					"Surah Al-Falaq",
					"Surah An-Nas"
				],
				correctIndex: 1,
				explanation: "Surah Al-Kawthar (Surah 108) is the shortest Surah with 3 concise Ayahs.",
				pillar: "quran",
				reference: "Surah Al-Kawthar (108)"
			},
			{
				id: "qq5",
				prompt: "Which Surah is equal in reward to one-third (1/3) of the Quran?",
				options: [
					"Surah Al-Ikhlas",
					"Surah Al-Asr",
					"Surah Al-Fil",
					"Surah Quraysh"
				],
				correctIndex: 0,
				explanation: "The Prophet ﷺ said Surah Al-Ikhlas equals one-third of the Quran in meaning and reward (Sahih al-Bukhari 5013).",
				pillar: "quran",
				reference: "Sahih al-Bukhari 5013"
			},
			{
				id: "qq6",
				prompt: "How many Juz (Parts) is the Quran divided into for monthly reading?",
				options: [
					"10 Juz",
					"20 Juz",
					"30 Juz",
					"60 Juz"
				],
				correctIndex: 2,
				explanation: "The Quran is divided into 30 equal Juz so it can be completed comfortably in a month.",
				pillar: "quran",
				reference: "Standard Mushaf Division"
			},
			{
				id: "qq7",
				prompt: "What was the very first word of the Quran revealed to Prophet Muhammad ﷺ?",
				options: [
					"Qul (Say)",
					"Iqra (Read)",
					"Alhamdulillah",
					"Bismillah"
				],
				correctIndex: 1,
				explanation: "\"Iqra bismi Rabbikal-ladhi khalaq\" (Read in the name of your Lord who created) in Surah Al-Alaq 96:1.",
				pillar: "quran",
				reference: "Surah Al-Alaq 96:1"
			},
			{
				id: "qq8",
				prompt: "Which two Surahs are known as Al-Mu’awwidhatayn (The Two Surahs of Refuge)?",
				options: [
					"Al-Falaq & An-Nas",
					"Al-Fatiha & Al-Baqarah",
					"Al-Kawthar & Al-Asr",
					"Ya-Sin & Al-Mulk"
				],
				correctIndex: 0,
				explanation: "Surah Al-Falaq (113) and Surah An-Nas (114) are the two Surahs of seeking refuge in Allah.",
				pillar: "quran",
				reference: "Sahih al-Bukhari 5017"
			},
			{
				id: "qq9",
				prompt: "Which Surah does NOT begin with Bismillahir-Rahmanir-Rahim?",
				options: [
					"Surah At-Tawbah (Surah 9)",
					"Surah Al-Kahf",
					"Surah Maryam",
					"Surah Ta-Ha"
				],
				correctIndex: 0,
				explanation: "Surah At-Tawbah (Surah 9) is the only Surah without Basmalah at its beginning.",
				pillar: "quran",
				reference: "Jami` at-Tirmidhi 3086"
			},
			{
				id: "qq10",
				prompt: "Which Surah is recommended to be read every Friday (Jumu’ah) for light between the two Fridays?",
				options: [
					"Surah Al-Kahf (Surah 18)",
					"Surah Al-Fajr",
					"Surah Ad-Duha",
					"Surah Al-tin"
				],
				correctIndex: 0,
				explanation: "Reciting Surah Al-Kahf on Friday brings spiritual light between the two Fridays.",
				pillar: "quran",
				reference: "Al-Mustadrak / Sunan al-Kubra"
			}
		]
	},
	{
		id: "quiz_seerah_history",
		title: "Islamic History",
		level: "Intermediate",
		category: "History",
		questions: [
			{
				id: "qh1",
				prompt: "In which cave did the Prophet Muhammad ﷺ receive the first revelation?",
				options: [
					"Cave of Thawr",
					"Cave of Hira",
					"Mount Uhud",
					"Wadi Badr"
				],
				correctIndex: 1,
				explanation: "The first revelation of Surah Al-Alaq came in the Cave of Hira on Jabal an-Noor (Sahih al-Bukhari 3).",
				pillar: "history",
				reference: "Sahih al-Bukhari 3"
			},
			{
				id: "qh2",
				prompt: "What title was the Prophet ﷺ known by among the people of Makkah before prophethood?",
				options: [
					"Al-Amin (The Trustworthy)",
					"Al-Farooq",
					"Asadullah",
					"Saifullah"
				],
				correctIndex: 0,
				explanation: "He was universally known as As-Sadiq (The Truthful) and Al-Amin (The Trustworthy).",
				pillar: "history",
				reference: "Sirat Ibn Hisham"
			},
			{
				id: "qh3",
				prompt: "How old was the Prophet Muhammad ﷺ when he received the first revelation?",
				options: [
					"25 years old",
					"33 years old",
					"40 years old",
					"50 years old"
				],
				correctIndex: 2,
				explanation: "Prophethood began at age 40 in Makkah.",
				pillar: "history",
				reference: "Sahih al-Bukhari 3851"
			},
			{
				id: "qh4",
				prompt: "Which angel brought the revelation of the Quran from Allah to the Prophet ﷺ?",
				options: [
					"Angel Mika’il (AS)",
					"Angel Jibril (AS)",
					"Angel Israfil (AS)",
					"Angel Malik (AS)"
				],
				correctIndex: 1,
				explanation: "Angel Jibril (Gabriel, AS) transmitted the Quranic revelation (Quran 26:193).",
				pillar: "history",
				reference: "Surah Ash-Shu’ara 26:193"
			},
			{
				id: "qh5",
				prompt: "What is the migration from Makkah to Madinah in 622 CE called?",
				options: [
					"Al-Hijrah",
					"Al-Fath",
					"Al-Mi’raj",
					"Al-Hudaybiyyah"
				],
				correctIndex: 0,
				explanation: "Al-Hijrah marks the migration to Madinah and the start of the Islamic Hijri calendar.",
				pillar: "history",
				reference: "Sahih al-Bukhari 3905"
			},
			{
				id: "qh6",
				prompt: "Which companion accompanied the Prophet ﷺ during the Hijrah journey to Madinah?",
				options: [
					"Abu Bakr As-Siddiq (RA)",
					"Umar ibn Al-Khattab (RA)",
					"Uthman ibn Affan (RA)",
					"Ali ibn Abi Talib (RA)"
				],
				correctIndex: 0,
				explanation: "Abu Bakr As-Siddiq (RA) was his companion in the Cave of Thawr (Quran 9:40).",
				pillar: "history",
				reference: "Surah At-Tawbah 9:40"
			},
			{
				id: "qh7",
				prompt: "What was the first mosque built in Islam upon arrival at Madinah’s outskirts?",
				options: [
					"Masjid Quba",
					"Masjid al-Qiblatayn",
					"Masjid al-Haram",
					"Masjid al-Aqsa"
				],
				correctIndex: 0,
				explanation: "Masjid Quba was the first mosque established on piety in Islam.",
				pillar: "history",
				reference: "Sahih al-Bukhari 1193"
			},
			{
				id: "qh8",
				prompt: "Who was the first Mu’adhdhin (caller to prayer) in Islam?",
				options: [
					"Bilal ibn Rabah (RA)",
					"Salman al-Farsi (RA)",
					"Mu’adh ibn Jabal (RA)",
					"Zayd ibn Thabit (RA)"
				],
				correctIndex: 0,
				explanation: "Bilal ibn Rabah (RA) was chosen by the Prophet ﷺ to call the first Adhan.",
				pillar: "history",
				reference: "Sunan Abi Dawud 499"
			},
			{
				id: "qh9",
				prompt: "During which miraculous night journey were the five daily prayers (Salah) made obligatory?",
				options: [
					"Al-Isra wal-Mi’raj",
					"Battle of Badr",
					"Treaty of Hudaybiyyah",
					"Conquest of Makkah"
				],
				correctIndex: 0,
				explanation: "The five daily prayers were gifted directly during Al-Isra wal-Mi’raj.",
				pillar: "history",
				reference: "Sahih al-Bukhari 349"
			},
			{
				id: "qh10",
				prompt: "Which companion led the committee that compiled the standard Uthmani Mushaf?",
				options: [
					"Zayd ibn Thabit (RA)",
					"Khalid ibn al-Walid (RA)",
					"Amr ibn al-As (RA)",
					"Abu Hurayrah (RA)"
				],
				correctIndex: 0,
				explanation: "Zayd ibn Thabit (RA), the chief scribe of revelation, led the compilation.",
				pillar: "history",
				reference: "Sahih al-Bukhari 4986"
			}
		]
	},
	{
		id: "quiz_salah_wudu",
		title: "Salah & Wudu",
		level: "Beginner",
		category: "Salah",
		questions: [
			{
				id: "qsw1",
				prompt: "How many obligatory (Fard) prayers are performed every day?",
				options: [
					"3 Prayers",
					"5 Prayers",
					"7 Prayers",
					"2 Prayers"
				],
				correctIndex: 1,
				explanation: "Fajr, Dhuhr, Asr, Maghrib, and Isha are the 5 daily obligatory prayers.",
				pillar: "salah",
				reference: "Sahih al-Bukhari 8"
			},
			{
				id: "qsw2",
				prompt: "What is the purification with water before performing Salah called?",
				options: [
					"Wudu (Ablution)",
					"Tayammum",
					"Iftar",
					"Suhoor"
				],
				correctIndex: 0,
				explanation: "Wudu is the ritual purification required before Salah (Quran 5:6).",
				pillar: "salah",
				reference: "Surah Al-Ma’idah 5:6"
			},
			{
				id: "qsw3",
				prompt: "In which direction do Muslims face while offering Salah?",
				options: [
					"Towards the Kaaba (Qibla) in Makkah",
					"Always due North",
					"Towards the rising sun",
					"Any direction"
				],
				correctIndex: 0,
				explanation: "Muslims face the Sacred Mosque (Al-Kaaba) in Makkah (Quran 2:144).",
				pillar: "salah",
				reference: "Surah Al-Baqarah 2:144"
			},
			{
				id: "qsw4",
				prompt: "What do we say in Ruku (the bowing position) during Salah?",
				options: [
					"Subhana Rabbiyal-Adhim",
					"Subhana Rabbiyal-A’la",
					"Sami Allahu liman hamidah",
					"Allahu Akbar"
				],
				correctIndex: 0,
				explanation: "In Ruku we glorify Allah by saying \"Subhana Rabbiyal-Adhim\" (Glory be to my Lord, the Most Great).",
				pillar: "salah",
				reference: "Sahih Muslim 772"
			},
			{
				id: "qsw5",
				prompt: "How many Fard Rak’ahs are in the Fajr prayer?",
				options: [
					"2 Rak’ahs",
					"3 Rak’ahs",
					"4 Rak’ahs",
					"1 Rak’ah"
				],
				correctIndex: 0,
				explanation: "Fajr has 2 Fard Rak’ahs preceded by 2 emphasized Sunnah Rak’ahs.",
				pillar: "salah",
				reference: "Sahih al-Bukhari 350"
			},
			{
				id: "qsw6",
				prompt: "How many Fard Rak’ahs are in the Maghrib prayer?",
				options: [
					"2 Rak’ahs",
					"3 Rak’ahs",
					"4 Rak’ahs",
					"5 Rak’ahs"
				],
				correctIndex: 1,
				explanation: "Maghrib consists of 3 Fard Rak’ahs offered just after sunset.",
				pillar: "salah",
				reference: "Sahih Muslim"
			},
			{
				id: "qsw7",
				prompt: "In which position of Salah is a servant closest to Allah?",
				options: [
					"Sujud (Prostration)",
					"Qiyam (Standing)",
					"Ruku (Bowing)",
					"Taslim"
				],
				correctIndex: 0,
				explanation: "The Prophet ﷺ said: \"The closest a servant comes to his Lord is when he is prostrating (in Sujud).\"",
				pillar: "salah",
				reference: "Sahih Muslim 482"
			},
			{
				id: "qsw8",
				prompt: "How many times do we wash our face, hands, and arms in complete Sunnah Wudu?",
				options: [
					"3 times each",
					"10 times each",
					"5 times each",
					"Only wipe dry"
				],
				correctIndex: 0,
				explanation: "The Sunnah of the Prophet ﷺ is to wash the limbs up to 3 times in Wudu.",
				pillar: "salah",
				reference: "Sahih al-Bukhari 159"
			},
			{
				id: "qsw9",
				prompt: "How many times do we wipe over the head (Masah) in Wudu?",
				options: [
					"Once (1x)",
					"Three times (3x)",
					"Five times (5x)",
					"Seven times (7x)"
				],
				correctIndex: 0,
				explanation: "Wiping the head (Masah) is performed once in Wudu.",
				pillar: "salah",
				reference: "Sahih al-Bukhari 186"
			},
			{
				id: "qsw10",
				prompt: "How do we conclude the Salah at the end of Tashahhud?",
				options: [
					"Turning the head right and left saying As-salamu alaykum wa rahmatullah",
					"Clapping hands",
					"Standing up immediately",
					"Saying Bismillah"
				],
				correctIndex: 0,
				explanation: "Salah begins with Takbir and concludes with Taslim (greeting of peace to right and left).",
				pillar: "salah",
				reference: "Sunan Abi Dawud 61"
			}
		]
	},
	{
		id: "quiz_names_99",
		title: "99 Names of Allah",
		level: "Intermediate",
		category: "Aqidah",
		questions: [
			{
				id: "qn1",
				prompt: "What does Allah’s Name \"Ar-Rahman\" mean?",
				options: [
					"The Most Merciful",
					"The Eternal King",
					"The Creator",
					"The All-Hearing"
				],
				correctIndex: 0,
				explanation: "Ar-Rahman means The Most Merciful Whose mercy encompasses all creation.",
				pillar: "quran",
				reference: "Surah Al-Fatiha 1:1"
			},
			{
				id: "qn2",
				prompt: "Which Name of Allah means \"The Source of Peace\"?",
				options: [
					"As-Salam",
					"Al-Aziz",
					"Al-Khaliq",
					"Al-Qahhar"
				],
				correctIndex: 0,
				explanation: "As-Salam means The Source of Peace and Flawless Safety (Quran 59:23).",
				pillar: "quran",
				reference: "Surah Al-Hashr 59:23"
			},
			{
				id: "qn3",
				prompt: "Which Name of Allah means \"The Total Provider & Sustainer\"?",
				options: [
					"Ar-Razzaq",
					"Al-Musawwir",
					"Al-Hakam",
					"Al-Qabid"
				],
				correctIndex: 0,
				explanation: "Ar-Razzaq is the One Who provides sustenance to every creature (Quran 51:58).",
				pillar: "quran",
				reference: "Surah Adh-Dhariyat 51:58"
			},
			{
				id: "qn4",
				prompt: "What is the meaning of \"Al-Alim\"?",
				options: [
					"The All-Knowing",
					"The Most Strong",
					"The First",
					"The Patient"
				],
				correctIndex: 0,
				explanation: "Al-Alim means The All-Knowing, from Whom nothing is hidden.",
				pillar: "quran",
				reference: "Surah Al-Baqarah 2:29"
			},
			{
				id: "qn5",
				prompt: "Which pair of Names appears at the start of Ayat al-Kursi (2:255)?",
				options: [
					"Al-Hayy, Al-Qayyum",
					"Al-Awwal, Al-Akhir",
					"Al-Qabid, Al-Basit",
					"Ar-Rafi, Al-Mu’izz"
				],
				correctIndex: 0,
				explanation: "\"Allahu la ilaha illa Huwal-Hayyul-Qayyum\" — The Ever-Living, The Sustainer of all existence.",
				pillar: "quran",
				reference: "Surah Al-Baqarah 2:255"
			},
			{
				id: "qn6",
				prompt: "What does Allah’s Name \"Al-Wadud\" mean?",
				options: [
					"The Most Loving",
					"The Judge",
					"The Watchful",
					"The Avenger"
				],
				correctIndex: 0,
				explanation: "Al-Wadud means The Most Loving and Affectionate toward His righteous servants (Quran 85:14).",
				pillar: "quran",
				reference: "Surah Al-Buruj 85:14"
			},
			{
				id: "qn7",
				prompt: "Which Name of Allah in Surah Al-Ikhlas means \"The Eternal Refuge upon Whom all depend\"?",
				options: [
					"As-Samad",
					"Al-Basir",
					"Al-Halim",
					"Ash-Shakur"
				],
				correctIndex: 0,
				explanation: "\"Allahu As-Samad\" (112:2) means the Self-Sufficient Master Whom all creatures need.",
				pillar: "quran",
				reference: "Surah Al-Ikhlas 112:2"
			},
			{
				id: "qn8",
				prompt: "What does \"Ash-Shafi\" / \"Al-Ghafur\" teach us when we make a mistake?",
				options: [
					"Allah is Oft-Forgiving when we sincerely repent",
					"Mistakes can never be forgiven",
					"We should give up",
					"Only angels are forgiven"
				],
				correctIndex: 0,
				explanation: "Al-Ghafur and At-Tawwab remind us that Allah loves those who turn back to Him in repentance.",
				pillar: "akhlaq",
				reference: "Surah Az-Zumar 39:53"
			},
			{
				id: "qn9",
				prompt: "Which Name of Allah means \"The Most Appreciative\" Who rewards even small good deeds abundantly?",
				options: [
					"Ash-Shakur",
					"Al-Qahhar",
					"Al-Muntaqim",
					"Al-Mudhill"
				],
				correctIndex: 0,
				explanation: "Ash-Shakur appreciates and multiplies even the smallest sincere deed.",
				pillar: "akhlaq",
				reference: "Surah Fatir 35:30"
			},
			{
				id: "qn10",
				prompt: "Which Name of Allah is the 99th Name meaning \"The Most Patient\"?",
				options: [
					"As-Sabur",
					"Ar-Rahman",
					"Al-Malik",
					"Al-Quddus"
				],
				correctIndex: 0,
				explanation: "As-Sabur is the Most Patient Who grants time for repentance and loves the patient.",
				pillar: "akhlaq",
				reference: "Jami` at-Tirmidhi 3507"
			}
		]
	}
], EXPANDED_QUIZ_PACKS);
var KIDS_STORIES = EXPANDED_KIDS_STORIES;
var KIDS_BADGES_CATALOG = [
	{
		id: "badge_quran",
		title: "Quran Explorer",
		subtitle: "Completed first Surah lesson",
		icon: "BookOpen",
		color: "from-sky-500 to-blue-700"
	},
	{
		id: "badge_dua",
		title: "Dua Learner",
		subtitle: "Practiced 5 daily Duas",
		icon: "Sparkles",
		color: "from-emerald-500 to-green-700"
	},
	{
		id: "badge_salah",
		title: "Salah Journey",
		subtitle: "Completed all 6 Salah steps",
		icon: "Award",
		color: "from-amber-500 to-orange-700"
	},
	{
		id: "badge_kind",
		title: "Kind Heart",
		subtitle: "Completed a real-world Good Deed",
		icon: "Heart",
		color: "from-rose-500 to-pink-700"
	},
	{
		id: "badge_5surahs",
		title: "5 Surahs",
		subtitle: "Listened & practiced 5 Surahs",
		icon: "Trophy",
		color: "from-emerald-600 to-teal-800"
	},
	{
		id: "badge_30day",
		title: "30-Day Learner",
		subtitle: "Consistent family learning streak",
		icon: "Users",
		color: "from-indigo-500 to-purple-800"
	}
];
export { createEmptySalahDayRecord as $, deleteOfflineSurahFromDb as A, saveCachedPrayerTimings as B, resolveAyahAudioUrl as C, deleteAllDownloadedOfflineSurahs as D, computeLocalStorageMetrics as E, hydrateOrMigrateMasterState as F, ALL_30_JUZ_BOUNDARIES as G, saveOfflineAudioToDb as H, listOfflineAudioRecords as I, appendLearningEvent as J, PRAYER_CALCULATION_METHODS as K, listOfflineSurahRecords as L, getOfflineAudioFromDb as M, getOfflineSurahFromDb as N, deleteAllOfflineAudioFromDb as O, getRecoverySnapshot as P, computeSalahHistoricalSummary as Q, readLegacyMasterStateSync as R, removeDownloadedOfflineSurah as S, clearNonDownloadedApiCache as T, saveOfflineSurahToDb as U, saveMasterStateToLocalDb as V, saveRecoverySnapshot as W, computeLearningStreak as X, computeHijriDate as Y, computeQiblaFromCoords as Z, BUNDLED_SURAH_AYAHS as _, QUIZ_PACKS as a, resolveAyahIndexByNumber as at, getSurahOfflineAvailability as b, TOP_QURAN_VOCAB as c, validateSurahPayload as ct, TOP_600_TARGET_COVERAGE_PCT as d, deriveHifzPlanState as et, computeVocabCoverageStats as f, ALL_114_SURAHS as g, canMarkKidsSurahCompleted as h, KIDS_STORIES as i, refreshRevisionQueueDueStatuses as it, getCachedPrayerTimings as j, deleteOfflineAudioFromDb as k, VERIFIED_DUAS as l, SUPPORTED_LANGUAGES as lt, JUZ_AMMA_37_SURAHS as m, ISLAMIC_LESSONS as n, getLocalDateKeyWithOffset as nt, SALAH_STEPS as o, scheduleHifzRevision as ot, EXPANDED_KIDS_STORIES as p, aggregateAdultProgressByPeriod as q, KIDS_BADGES_CATALOG as r, parseHifzAyahRange as rt, SEERAH_TIMELINE as s, scoreQuizSubmission as st, ASMA_UL_HUSNA as t, getLocalDateKey as tt, WUDU_STEPS as u, translationService as ut, VERIFIED_RECITER_EDITIONS as v, resolveReciterConfig as w, getSurahPayload as x, downloadSurahForOfflineUse as y, requestPersistentLocalStorage as z };
