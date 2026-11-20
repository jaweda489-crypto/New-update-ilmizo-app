import { LanguageCode } from '../types/ilmizo';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  dir: 'ltr' | 'rtl';
  alquranEdition: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', dir: 'ltr', alquranEdition: 'en.sahih' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', dir: 'ltr', alquranEdition: 'hi.hindi' },
  { code: 'hinglish', label: 'Hinglish', nativeLabel: 'Hinglish (Roman)', dir: 'ltr', alquranEdition: 'en.sahih' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl', alquranEdition: 'ar.muyassar' },
  { code: 'ur', label: 'Urdu', nativeLabel: 'اردو', dir: 'rtl', alquranEdition: 'ur.jalandhry' },
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe', dir: 'ltr', alquranEdition: 'tr.diyanet' },
  { code: 'id', label: 'Indonesian', nativeLabel: 'Bahasa Indonesia', dir: 'ltr', alquranEdition: 'id.indonesian' },
  { code: 'bn', label: 'Bangla', nativeLabel: 'বাংলা', dir: 'ltr', alquranEdition: 'bn.bengali' },
  { code: 'fa', label: 'Persian', nativeLabel: 'فارسی', dir: 'rtl', alquranEdition: 'fa.makarem' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', dir: 'ltr', alquranEdition: 'fr.hamidullah' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', dir: 'ltr', alquranEdition: 'es.cortes' },
];

export type TranslationKey =
  // Global & Navigation
  | 'greeting'
  | 'subtitle_home'
  | 'todays_focus'
  | 'start_learning'
  | 'adult_mode'
  | 'kids_world'
  | 'parent_hub'
  | 'home'
  | 'quran'
  | 'hifz'
  | 'salah'
  | 'progress'
  | 'more'
  | 'duas'
  | 'stories'
  | 'adventure'
  | 'stars'
  | 'tasks_expenses'
  | 'next_prayer'
  | 'continue_quest'
  | 'todays_mission'
  // Adult Home & Modules
  | 'read_verses_reflection'
  | 'continue_surah'
  | 'explore_adult_modules'
  | 'settings_languages'
  | 'names_99'
  | 'seerah_timeline'
  | 'islamic_lessons'
  | 'quizzes'
  | 'qibla_compass'
  | 'tasbih_counter'
  | 'islamic_calendar'
  | 'my_profile'
  | 'open_tasks_finance'
  // Quran & Hifz
  | 'noble_quran_title'
  | 'verified_uthmani_free'
  | 'last_read'
  | 'search_surah_placeholder'
  | 'bookmarks'
  | 'juz'
  | 'surah'
  | 'audio'
  | 'repeat'
  | 'tafsir'
  | 'bookmark'
  | 'saved'
  | 'hifz_studio_title'
  | 'my_hifz'
  | 'revision'
  | 'stats'
  | 'progress_overview'
  | 'surahs_completed'
  | 'continue_hifz'
  | 'active_recall_tester'
  | 'hide_to_test'
  | 'reveal_text'
  // Salah & Duas
  | 'salah_tracker_title'
  | 'daily_tracker'
  | 'prayer_guide'
  | 'wudu_guide'
  | 'prayed_on_time'
  | 'tap_to_log'
  | 'authentic_duas_title'
  | 'categories'
  | 'daily'
  | 'favorites'
  // Kids World
  | 'ready_for_adventure'
  | 'activities_completed'
  | 'learn_and_explore'
  | 'open_adventure_map'
  | 'quran_garden'
  | 'dua_garden'
  | 'salah_space'
  | 'story_village'
  | 'recite_with_ayaan'
  | 'todays_good_deed'
  | 'family_challenge'
  | 'my_certificate'
  | 'mission_complete_title'
  | 'lets_practice'
  | 'my_badges';

export type TranslationDictionary = Record<TranslationKey, string>;

const BASE_DICTIONARIES: Record<LanguageCode, TranslationDictionary> = {
  en: {
    greeting: 'Assalamu alaikum',
    subtitle_home: 'Make a little space for knowledge today. Every step brings you closer to Allah.',
    todays_focus: "Today's Focus",
    start_learning: 'Start Learning',
    adult_mode: 'Adult Mode',
    kids_world: 'Kids World',
    parent_hub: 'Parent Hub',
    home: 'Home',
    quran: 'Quran',
    hifz: 'Hifz',
    salah: 'Salah',
    progress: 'Progress',
    more: 'More',
    duas: 'Duas',
    stories: 'Stories',
    adventure: 'Adventure',
    stars: 'Stars',
    tasks_expenses: 'Tasks & Sadaqah',
    next_prayer: 'Next Prayer',
    continue_quest: 'Continue Quest',
    todays_mission: "Today's 10-Minute Mission",
    read_verses_reflection: 'Read a few verses with reflection',
    continue_surah: 'Continue Surah',
    explore_adult_modules: 'Explore All Adult Modules',
    settings_languages: 'Settings & Languages',
    names_99: '99 Names of Allah',
    seerah_timeline: 'Seerah Timeline',
    islamic_lessons: 'Islamic Lessons',
    quizzes: 'Quizzes',
    qibla_compass: 'Qibla Compass',
    tasbih_counter: 'Tasbih Counter',
    islamic_calendar: 'Islamic Calendar',
    my_profile: 'My Profile',
    open_tasks_finance: 'Open Tasks & Finance',
    noble_quran_title: 'Noble Quran (114 Surahs)',
    verified_uthmani_free: 'Verified Uthmani Script · Free Forever',
    last_read: 'Last Read',
    search_surah_placeholder: 'Search Surah name or number (1 - 114)...',
    bookmarks: 'Bookmarks',
    juz: 'Juz',
    surah: 'Surah',
    audio: 'Audio',
    repeat: 'Repeat',
    tafsir: 'Tafsir',
    bookmark: 'Bookmark',
    saved: 'Saved',
    hifz_studio_title: 'Hifz Mastery Studio',
    my_hifz: 'My Hifz',
    revision: 'Revision',
    stats: 'Stats',
    progress_overview: 'Progress Overview (Self-Reported)',
    surahs_completed: 'Surahs Completed',
    continue_hifz: 'Continue Hifz',
    active_recall_tester: 'Active Recall Memory Tester',
    hide_to_test: 'Hide to Test',
    reveal_text: 'Reveal Text',
    salah_tracker_title: 'Salah Tracker & Guides',
    daily_tracker: 'Daily Tracker',
    prayer_guide: 'Prayer Guide',
    wudu_guide: 'Wudu Guide',
    prayed_on_time: 'Prayed On Time ✓',
    tap_to_log: 'Tap to Log',
    authentic_duas_title: 'Authentic Duas Library',
    categories: 'Categories',
    daily: 'Daily',
    favorites: 'Favorites',
    ready_for_adventure: "Ready for today's adventure?",
    activities_completed: 'activities completed',
    learn_and_explore: 'Learn & Explore',
    open_adventure_map: 'Open 3D Adventure Map',
    quran_garden: 'Quran Garden',
    dua_garden: 'Dua Garden',
    salah_space: 'Salah Space',
    story_village: 'Story Village',
    recite_with_ayaan: 'Recite with Ayaan',
    todays_good_deed: "Today's Good Deed",
    family_challenge: 'Family Challenge',
    my_certificate: 'My Certificate',
    mission_complete_title: 'MashaAllah! Mission Complete!',
    lets_practice: "Let's Practice!",
    my_badges: 'My Badges & Certificates',
  },
  hi: {
    greeting: 'अस्सलामु अलैकुम',
    subtitle_home: 'आज इल्म के लिए थोड़ा समय निकालें। हर कदम आपको अल्लाह के करीब लाता है।',
    todays_focus: 'आज का ध्यान',
    start_learning: 'सीखना शुरू करें',
    adult_mode: 'बड़ों का मोड',
    kids_world: 'किड्स वर्ल्ड',
    parent_hub: 'पैरेंट हब',
    home: 'होम',
    quran: 'क़ुरआन',
    hifz: 'हिफ़्ज़',
    salah: 'नमाज़',
    progress: 'प्रगति',
    more: 'अधिक',
    duas: 'दुआएं',
    stories: 'कहानियां',
    adventure: 'एडवेंचर',
    stars: 'सितारे',
    tasks_expenses: 'कार्य और सदक़ा',
    next_prayer: 'अगली नमाज़',
    continue_quest: 'मिशन जारी रखें',
    todays_mission: 'आज का 10-मिनट मिशन',
    read_verses_reflection: 'तदब्बुर (चिंतन) के साथ कुछ आयतें पढ़ें',
    continue_surah: 'सूरह जारी रखें',
    explore_adult_modules: 'सभी इस्लामी मॉड्यूल देखें',
    settings_languages: 'सेटिंग्स और भाषाएं',
    names_99: 'अल्लाह के 99 नाम',
    seerah_timeline: 'सीरत टाइमलाइन',
    islamic_lessons: 'इस्लामी सबक़',
    quizzes: 'क्विज़',
    qibla_compass: 'क़िब्ला कंपास',
    tasbih_counter: 'तस्बीह काउंटर',
    islamic_calendar: 'हिजरी कैलेंडर',
    my_profile: 'मेरी प्रोफ़ाइल',
    open_tasks_finance: 'कार्य और सदक़ा खोलें',
    noble_quran_title: 'पवित्र क़ुरआन (114 सूरह)',
    verified_uthmani_free: 'प्रमाणित उस्मानी लिपि · हमेशा नि:शुल्क',
    last_read: 'अंतिम पढ़ा गया',
    search_surah_placeholder: 'सूरह का नाम या नंबर खोजें (1 - 114)...',
    bookmarks: 'बुकमार्क',
    juz: 'पारा (जुज़)',
    surah: 'सूरह',
    audio: 'ऑडियो',
    repeat: 'दोहराएं',
    tafsir: 'तफ़्सीर',
    bookmark: 'बुकमार्क',
    saved: 'सहेजा गया',
    hifz_studio_title: 'हिफ़्ज़ मास्टरी स्टूडियो',
    my_hifz: 'मेरा हिफ़्ज़',
    revision: 'दोहराव',
    stats: 'आंकड़े',
    progress_overview: 'प्रगति सारांश (स्व-रिपोर्ट)',
    surahs_completed: 'सूरह मुकम्मल',
    continue_hifz: 'हिफ़्ज़ जारी रखें',
    active_recall_tester: 'एक्टिव रिकॉल मेमोरी टेस्टर',
    hide_to_test: 'जांचने के लिए छुपाएं',
    reveal_text: 'आयत दिखाएं',
    salah_tracker_title: 'नमाज़ ट्रैकर और गाइड',
    daily_tracker: 'दैनिक ट्रैकर',
    prayer_guide: 'नमाज़ गाइड',
    wudu_guide: 'वुज़ू गाइड',
    prayed_on_time: 'वक़्त पर अदा ✓',
    tap_to_log: 'दर्ज करने हेतु टैप करें',
    authentic_duas_title: 'प्रमाणित दुआओं की लाइब्रेरी',
    categories: 'श्रेणियां',
    daily: 'दैनिक',
    favorites: 'पसंदीदा',
    ready_for_adventure: 'क्या आप आज के सफ़र के लिए तैयार हैं?',
    activities_completed: 'गतिविधियां पूरी हुईं',
    learn_and_explore: 'सीखें और एक्सप्लोर करें',
    open_adventure_map: '3D एडवेंचर मैप खोलें',
    quran_garden: 'क़ुरआन गार्डन',
    dua_garden: 'दुआ गार्डन',
    salah_space: 'नमाज़ स्पेस',
    story_village: 'कहानी गांव',
    recite_with_ayaan: 'अयान के साथ तिलावत करें',
    todays_good_deed: 'आज का नेक काम',
    family_challenge: 'फ़ैमिली चैलेंज',
    my_certificate: 'मेरा सर्टिफ़िकेट',
    mission_complete_title: 'माशाअल्लाह! मिशन पूरा हुआ!',
    lets_practice: 'आइए अभ्यास करें!',
    my_badges: 'मेरे बैज और सर्टिफ़िकेट',
  },
  hinglish: {
    greeting: 'Assalamu alaikum',
    subtitle_home: 'Aaj ilm ke liye thoda waqt nikalein. Har kadam aapko Allah ke kareeb lata hai.',
    todays_focus: 'Aaj Ka Focus',
    start_learning: 'Seekhna Shuru Karein',
    adult_mode: 'Adult Mode',
    kids_world: 'Kids World',
    parent_hub: 'Parent Hub',
    home: 'Home',
    quran: 'Quran',
    hifz: 'Hifz',
    salah: 'Salah',
    progress: 'Progress',
    more: 'More',
    duas: 'Duas',
    stories: 'Stories',
    adventure: 'Adventure',
    stars: 'Stars',
    tasks_expenses: 'Tasks & Sadaqah',
    next_prayer: 'Agli Namaz',
    continue_quest: 'Quest Jaari Rakhein',
    todays_mission: 'Aaj Ka 10-Minute Mission',
    read_verses_reflection: 'Ghaur-o-fikr ke saath kuch aayatein padhein',
    continue_surah: 'Surah Jaari Rakhein',
    explore_adult_modules: 'Saare Adult Modules Dekhein',
    settings_languages: 'Settings aur Zabaanein',
    names_99: 'Allah Ke 99 Naam',
    seerah_timeline: 'Seerah Timeline',
    islamic_lessons: 'Islamic Sabaq',
    quizzes: 'Quizzes',
    qibla_compass: 'Qibla Compass',
    tasbih_counter: 'Tasbih Counter',
    islamic_calendar: 'Hijri Calendar',
    my_profile: 'Meri Profile',
    open_tasks_finance: 'Tasks & Sadaqah Kholein',
    noble_quran_title: 'Quran Majeed (114 Surahs)',
    verified_uthmani_free: 'Verified Uthmani Script · Hamesha Free',
    last_read: 'Aakhri Padha Hua',
    search_surah_placeholder: 'Surah ka naam ya number khojein (1 - 114)...',
    bookmarks: 'Bookmarks',
    juz: 'Para (Juz)',
    surah: 'Surah',
    audio: 'Audio',
    repeat: 'Repeat',
    tafsir: 'Tafsir',
    bookmark: 'Bookmark',
    saved: 'Saved',
    hifz_studio_title: 'Hifz Mastery Studio',
    my_hifz: 'Mera Hifz',
    revision: 'Dohraav (Revision)',
    stats: 'Stats',
    progress_overview: 'Progress Overview (Self-Reported)',
    surahs_completed: 'Surahs Mukammal',
    continue_hifz: 'Hifz Jaari Rakhein',
    active_recall_tester: 'Active Recall Memory Tester',
    hide_to_test: 'Yaad Check Karne Ke Liye Chhupayein',
    reveal_text: 'Aayat Dikhayein',
    salah_tracker_title: 'Namaz Tracker & Guides',
    daily_tracker: 'Rozana Tracker',
    prayer_guide: 'Namaz Guide',
    wudu_guide: 'Wudu Guide',
    prayed_on_time: 'Waqt Par Ada ✓',
    tap_to_log: 'Log Karne Ke Liye Tap Karein',
    authentic_duas_title: 'Authentic Duas Library',
    categories: 'Categories',
    daily: 'Rozana',
    favorites: 'Pasandeeda',
    ready_for_adventure: 'Aaj ke adventure ke liye taiyar hain?',
    activities_completed: 'activities poori huin',
    learn_and_explore: 'Seekhein aur Explore Karein',
    open_adventure_map: '3D Adventure Map Kholein',
    quran_garden: 'Quran Garden',
    dua_garden: 'Dua Garden',
    salah_space: 'Salah Space',
    story_village: 'Story Village',
    recite_with_ayaan: 'Ayaan Ke Saath Padhein',
    todays_good_deed: 'Aaj Ka Nek Kaam',
    family_challenge: 'Family Challenge',
    my_certificate: 'Mera Certificate',
    mission_complete_title: 'MashaAllah! Mission Complete!',
    lets_practice: 'Aaiye Practice Karein!',
    my_badges: 'Mere Badges aur Certificates',
  },
  ar: {
    greeting: 'السلام عليكم',
    subtitle_home: 'اجعل للعلم نصيباً من يومك. كل خطوة تقربك إلى الله.',
    todays_focus: 'تركيز اليوم',
    start_learning: 'ابدأ التعلم',
    adult_mode: 'وضع الكبار',
    kids_world: 'عالم الأطفال',
    parent_hub: 'بوابة الوالدين',
    home: 'الرئيسية',
    quran: 'القرآن',
    hifz: 'الحفظ',
    salah: 'الصلاة',
    progress: 'التقدم',
    more: 'المزيد',
    duas: 'الأدعية',
    stories: 'القصص',
    adventure: 'المغامرة',
    stars: 'النجوم',
    tasks_expenses: 'المهام والصدقة',
    next_prayer: 'الصلاة القادمة',
    continue_quest: 'تابع المهمة',
    todays_mission: 'مهمة الـ ١٠ دقائق اليوم',
    read_verses_reflection: 'اقرأ بضع آيات بتدبر وخشوع',
    continue_surah: 'تابع السورة',
    explore_adult_modules: 'استكشف جميع الأقسام التعليمية',
    settings_languages: 'الإعدادات واللغات',
    names_99: 'أسماء الله الحسنى',
    seerah_timeline: 'السيرة النبوية',
    islamic_lessons: 'الدروس الإسلامية',
    quizzes: 'الاختبارات',
    qibla_compass: 'بوصلة القبلة',
    tasbih_counter: 'المسبحة الإلكترونية',
    islamic_calendar: 'التقويم الهجري',
    my_profile: 'ملفي الشخصي',
    open_tasks_finance: 'افتح المهام والصدقات',
    noble_quran_title: 'القرآن الكريم (١١٤ سورة)',
    verified_uthmani_free: 'الرسم العثماني الموثق · مجاني دائماً',
    last_read: 'آخر قراءة',
    search_surah_placeholder: 'ابحث باسم السورة أو رقمها (١ - ١١٤)...',
    bookmarks: 'الفواصل',
    juz: 'الأجزاء',
    surah: 'السور',
    audio: 'استماع',
    repeat: 'تكرار',
    tafsir: 'تفسير',
    bookmark: 'حفظ فاصلة',
    saved: 'تم الحفظ',
    hifz_studio_title: 'استوديو إتقان الحفظ',
    my_hifz: 'حفظي',
    revision: 'المراجعة',
    stats: 'الإحصائيات',
    progress_overview: 'ملخص التقدم (تسجيل ذاتي)',
    surahs_completed: 'سور مكتملة',
    continue_hifz: 'تابع الحفظ',
    active_recall_tester: 'اختبار التسميع الذاتي',
    hide_to_test: 'إخفاء النص للاختبار',
    reveal_text: 'إظهار الآية',
    salah_tracker_title: 'متابعة الصلاة ودليل الطهارة',
    daily_tracker: 'المتابعة اليومية',
    prayer_guide: 'دليل الصلاة',
    wudu_guide: 'دليل الوضوء',
    prayed_on_time: 'صليت في الوقت ✓',
    tap_to_log: 'اضغط للتسجيل',
    authentic_duas_title: 'مكتبة الأدعية الصحيحة',
    categories: 'التصنيفات',
    daily: 'يومي',
    favorites: 'المفضلة',
    ready_for_adventure: 'هل أنت مستعد لمغامرة اليوم؟',
    activities_completed: 'أنشطة مكتملة',
    learn_and_explore: 'تعلم واستكشف',
    open_adventure_map: 'افتح خريطة المغامرة ثلاثية الأبعاد',
    quran_garden: 'حديقة القرآن',
    dua_garden: 'حديقة الأدعية',
    salah_space: 'ركن الصلاة',
    story_village: 'قرية القصص',
    recite_with_ayaan: 'اتلُ مع أيان',
    todays_good_deed: 'عمل الخير اليوم',
    family_challenge: 'تحدي العائلة',
    my_certificate: 'شهادتي',
    mission_complete_title: 'ما شاء الله! اكتملت المهمة!',
    lets_practice: 'هيا نتدرب معاً!',
    my_badges: 'الأوسمة والشهادات',
  },
  ur: {
    greeting: 'السلام علیکم',
    subtitle_home: 'آج علم کے لیے تھوڑا وقت نکالیں۔ ہر قدم آپ کو اللہ کے قریب لاتا ہے۔',
    todays_focus: 'آج کی توجہ',
    start_learning: 'سیکھنا شروع کریں',
    adult_mode: 'بڑوں کا موڈ',
    kids_world: 'بچوں کی دنیا',
    parent_hub: 'والدین حب',
    home: 'ہوم',
    quran: 'قرآن',
    hifz: 'حفظ',
    salah: 'نماز',
    progress: 'پیش رفت',
    more: 'مزید',
    duas: 'دعائیں',
    stories: 'کہانیاں',
    adventure: 'ایڈونچر',
    stars: 'ستارے',
    tasks_expenses: 'کام اور صدقہ',
    next_prayer: 'اگلی نماز',
    continue_quest: 'مشن جاری رکھیں',
    todays_mission: 'آج کا 10 منٹ کا مشن',
    read_verses_reflection: 'غور و فکر کے ساتھ چند آیات تلاوت کریں',
    continue_surah: 'سورہ جاری رکھیں',
    explore_adult_modules: 'تمام اسلامی ماڈیولز دیکھیں',
    settings_languages: 'ترتیبات اور زبانیں',
    names_99: 'اللہ کے 99 نام',
    seerah_timeline: 'سیرت النبی ﷺ',
    islamic_lessons: 'اسلامی اسباق',
    quizzes: 'کوئز',
    qibla_compass: 'قبلہ نما',
    tasbih_counter: 'تسبیح کاؤنٹر',
    islamic_calendar: 'ہجری کیلنڈر',
    my_profile: 'میرا پروفائل',
    open_tasks_finance: 'کام اور صدقہ کھولیں',
    noble_quran_title: 'قرآن مجید (114 سورتیں)',
    verified_uthmani_free: 'مصدقہ عثمانی رسم الخط · ہمیشہ مفت',
    last_read: 'آخری تلاوت',
    search_surah_placeholder: 'سورہ کا نام یا نمبر تلاش کریں (1 - 114)...',
    bookmarks: 'بک مارکس',
    juz: 'پارہ (جز)',
    surah: 'سورہ',
    audio: 'آڈیو',
    repeat: 'دہرائیں',
    tafsir: 'تفسیر',
    bookmark: 'بک مارک',
    saved: 'محفوظ شدہ',
    hifz_studio_title: 'حفظ ماسٹری اسٹوڈیو',
    my_hifz: 'میرا حفظ',
    revision: 'دہرائی',
    stats: 'شماریات',
    progress_overview: 'پیش رفت کا جائزہ (ذاتی اندراج)',
    surahs_completed: 'مکمل سورتیں',
    continue_hifz: 'حفظ جاری رکھیں',
    active_recall_tester: 'یادداشت ٹیسٹر',
    hide_to_test: 'جانچنے کے لیے چھپائیں',
    reveal_text: 'آیت دکھائیں',
    salah_tracker_title: 'نماز ٹریکر اور رہنمائی',
    daily_tracker: 'روزانہ ٹریکر',
    prayer_guide: 'نماز گائیڈ',
    wudu_guide: 'وضو گائیڈ',
    prayed_on_time: 'وقت پر ادا ✓',
    tap_to_log: 'درج کرنے کے لیے ٹیپ کریں',
    authentic_duas_title: 'مستند دعاؤں کی لائبریری',
    categories: 'اقسام',
    daily: 'روزانہ',
    favorites: 'پسندیدہ',
    ready_for_adventure: 'کیا آپ آج کے سفر کے لیے تیار ہیں؟',
    activities_completed: 'سرگرمیاں مکمل ہوئیں',
    learn_and_explore: 'سیکھیں اور دریافت کریں',
    open_adventure_map: 'تھری ڈی ایڈونچر نقشہ کھولیں',
    quran_garden: 'قرآن گارڈن',
    dua_garden: 'دعا گارڈن',
    salah_space: 'نماز اسپیس',
    story_village: 'کہانی گاؤں',
    recite_with_ayaan: 'ایان کے ساتھ تلاوت کریں',
    todays_good_deed: 'آج کی نیکی',
    family_challenge: 'فیملی چیلنج',
    my_certificate: 'میرا سرٹیفکیٹ',
    mission_complete_title: 'ماشاء اللہ! مشن مکمل!',
    lets_practice: 'آئیے مشق کریں!',
    my_badges: 'میرے بیجز اور سرٹیفکیٹ',
  },
  tr: {
    greeting: 'Esselamu Aleyküm',
    subtitle_home: 'Bugün ilim için biraz vakit ayırın. Her adım sizi Allah’a yaklaştırır.',
    todays_focus: 'Günün Odağı',
    start_learning: 'Öğrenmeye Başla',
    adult_mode: 'Yetişkin Modu',
    kids_world: 'Çocuk Dünyası',
    parent_hub: 'Ebeveyn Merkezi',
    home: 'Ana Sayfa',
    quran: 'Kur’an',
    hifz: 'Hıfz',
    salah: 'Namaz',
    progress: 'İlerleme',
    more: 'Daha Fazla',
    duas: 'Dualar',
    stories: 'Hikayeler',
    adventure: 'Macera',
    stars: 'Yıldızlar',
    tasks_expenses: 'Görevler & Sadaka',
    next_prayer: 'Sonraki Namaz',
    continue_quest: 'Göreve Devam Et',
    todays_mission: 'Bugünün 10 Dakikalık Görevi',
    read_verses_reflection: 'Tefekkür ederek birkaç ayet okuyun',
    continue_surah: 'Sureye Devam Et',
    explore_adult_modules: 'Tüm Yetişkin Modüllerini Keşfet',
    settings_languages: 'Ayarlar ve Diller',
    names_99: 'Esmaül Hüsna (99 İsim)',
    seerah_timeline: 'Siyer Zaman Çizelgesi',
    islamic_lessons: 'İslami Dersler',
    quizzes: 'Testler',
    qibla_compass: 'Kıble Pusulası',
    tasbih_counter: 'Tesbih Sayacı',
    islamic_calendar: 'Hicri Takvim',
    my_profile: 'Profilim',
    open_tasks_finance: 'Görevler ve Sadaka Aç',
    noble_quran_title: 'Kur’an-ı Kerim (114 Sure)',
    verified_uthmani_free: 'Doğrulanmış Osmanî Hat · Her Zaman Ücretsiz',
    last_read: 'Son Okunan',
    search_surah_placeholder: 'Sure adı veya numarası ara (1 - 114)...',
    bookmarks: 'Yer İmleri',
    juz: 'Cüz',
    surah: 'Sure',
    audio: 'Ses',
    repeat: 'Tekrarla',
    tafsir: 'Tefsir',
    bookmark: 'Kaydet',
    saved: 'Kaydedildi',
    hifz_studio_title: 'Hıfz Uzmanlık Stüdyosu',
    my_hifz: 'Ezberim',
    revision: 'Tekrar',
    stats: 'İstatistik',
    progress_overview: 'İlerleme Özeti (Kişisel Kayıt)',
    surahs_completed: 'Tamamlanan Sureler',
    continue_hifz: 'Hıfza Devam Et',
    active_recall_tester: 'Aktif Hatırlama Testi',
    hide_to_test: 'Test İçin Gizle',
    reveal_text: 'Metni Göster',
    salah_tracker_title: 'Namaz Takibi ve Rehberler',
    daily_tracker: 'Günlük Takip',
    prayer_guide: 'Namaz Rehberi',
    wudu_guide: 'Abdest Rehberi',
    prayed_on_time: 'Vaktinde Kılındı ✓',
    tap_to_log: 'Kaydetmek İçin Dokun',
    authentic_duas_title: 'Sahih Dualar Kütüphanesi',
    categories: 'Kategoriler',
    daily: 'Günlük',
    favorites: 'Favoriler',
    ready_for_adventure: 'Bugünkü maceraya hazır mısın?',
    activities_completed: 'etkinlik tamamlandı',
    learn_and_explore: 'Öğren ve Keşfet',
    open_adventure_map: '3D Macera Haritasını Aç',
    quran_garden: 'Kur’an Bahçesi',
    dua_garden: 'Dua Bahçesi',
    salah_space: 'Namaz Alanı',
    story_village: 'Hikaye Köyü',
    recite_with_ayaan: 'Ayaan ile Oku',
    todays_good_deed: 'Günün İyiliği',
    family_challenge: 'Aile Görevi',
    my_certificate: 'Sertifikam',
    mission_complete_title: 'Maşallah! Görev Tamamlandı!',
    lets_practice: 'Haydi Pratik Yapalım!',
    my_badges: 'Rozetlerim ve Sertifikalarım',
  },
  id: {
    greeting: 'Assalamu alaikum',
    subtitle_home: 'Luangkan sedikit waktu untuk ilmu hari ini. Setiap langkah mendekatkanmu kepada Allah.',
    todays_focus: 'Fokus Hari Ini',
    start_learning: 'Mulai Belajar',
    adult_mode: 'Mode Dewasa',
    kids_world: 'Dunia Anak',
    parent_hub: 'Panel Orang Tua',
    home: 'Beranda',
    quran: 'Al-Qur’an',
    hifz: 'Hafalan',
    salah: 'Shalat',
    progress: 'Progres',
    more: 'Lainnya',
    duas: 'Doa',
    stories: 'Kisah',
    adventure: 'Petualangan',
    stars: 'Bintang',
    tasks_expenses: 'Tugas & Sedekah',
    next_prayer: 'Shalat Berikutnya',
    continue_quest: 'Lanjutkan Misi',
    todays_mission: 'Misi 10 Menit Hari Ini',
    read_verses_reflection: 'Baca beberapa ayat dengan tadabbur',
    continue_surah: 'Lanjutkan Surah',
    explore_adult_modules: 'Jelajahi Semua Modul Dewasa',
    settings_languages: 'Pengaturan & Bahasa',
    names_99: '99 Asmaul Husna',
    seerah_timeline: 'Garis Waktu Sirah',
    islamic_lessons: 'Pelajaran Islam',
    quizzes: 'Kuis',
    qibla_compass: 'Kompas Kiblat',
    tasbih_counter: 'Penghitung Tasbih',
    islamic_calendar: 'Kalender Hijriah',
    my_profile: 'Profil Saya',
    open_tasks_finance: 'Buka Tugas & Sedekah',
    noble_quran_title: 'Al-Qur’an Mulia (114 Surah)',
    verified_uthmani_free: 'Rasm Utsmani Terverifikasi · Gratis Selamanya',
    last_read: 'Terakhir Dibaca',
    search_surah_placeholder: 'Cari nama atau nomor Surah (1 - 114)...',
    bookmarks: 'Penanda',
    juz: 'Juz',
    surah: 'Surah',
    audio: 'Audio',
    repeat: 'Ulangi',
    tafsir: 'Tafsir',
    bookmark: 'Tandai',
    saved: 'Tersimpan',
    hifz_studio_title: 'Studio Hafalan Hifz',
    my_hifz: 'Hafalan Saya',
    revision: 'Murajaah',
    stats: 'Statistik',
    progress_overview: 'Ringkasan Progres (Mandiri)',
    surahs_completed: 'Surah Selesai',
    continue_hifz: 'Lanjutkan Hafalan',
    active_recall_tester: 'Penguji Ingatan Aktif',
    hide_to_test: 'Sembunyikan Teks',
    reveal_text: 'Tampilkan Ayat',
    salah_tracker_title: 'Pelacak Shalat & Panduan',
    daily_tracker: 'Pelacak Harian',
    prayer_guide: 'Panduan Shalat',
    wudu_guide: 'Panduan Wudhu',
    prayed_on_time: 'Tepat Waktu ✓',
    tap_to_log: 'Ketuk untuk Mencatat',
    authentic_duas_title: 'Pustaka Doa Shahih',
    categories: 'Kategori',
    daily: 'Harian',
    favorites: 'Favorit',
    ready_for_adventure: 'Siap untuk petualangan hari ini?',
    activities_completed: 'aktivitas selesai',
    learn_and_explore: 'Belajar & Jelajahi',
    open_adventure_map: 'Buka Peta Petualangan 3D',
    quran_garden: 'Taman Qur’an',
    dua_garden: 'Taman Doa',
    salah_space: 'Ruang Shalat',
    story_village: 'Desa Kisah',
    recite_with_ayaan: 'Mengaji Bersama Ayaan',
    todays_good_deed: 'Amal Baik Hari Ini',
    family_challenge: 'Tantangan Keluarga',
    my_certificate: 'Sertifikat Saya',
    mission_complete_title: 'MasyaAllah! Misi Selesai!',
    lets_practice: 'Ayo Berlatih!',
    my_badges: 'Lencana & Sertifikat',
  },
  bn: {
    greeting: 'আসসালামু আলাইকুম',
    subtitle_home: 'আজ জ্ঞানের জন্য কিছুটা সময় রাখুন। প্রতিটি পদক্ষেপ আপনাকে আল্লাহর কাছে নিয়ে যায়।',
    todays_focus: 'আজকের ফোকাস',
    start_learning: 'শেখা শুরু করুন',
    adult_mode: 'বড়দের মোড',
    kids_world: 'কিডস ওয়ার্ল্ড',
    parent_hub: 'প্যারেন্ট হাব',
    home: 'হোম',
    quran: 'কুরআন',
    hifz: 'হিফজ',
    salah: 'সালাত',
    progress: 'অগ্রগতি',
    more: 'আরও',
    duas: 'দোয়া',
    stories: 'গল্প',
    adventure: 'অ্যাডভেঞ্চার',
    stars: 'তারা',
    tasks_expenses: 'কাজ ও সাদাকাহ',
    next_prayer: 'পরবর্তী নামাজ',
    continue_quest: 'মিশন চালিয়ে যান',
    todays_mission: 'আজকের ১০ মিনিটের মিশন',
    read_verses_reflection: 'চিন্তাভাবনার সাথে কয়েকটি আয়াত পড়ুন',
    continue_surah: 'সূরা চালিয়ে যান',
    explore_adult_modules: 'সকল মডিউল দেখুন',
    settings_languages: 'সেটিংস ও ভাষা',
    names_99: 'আল্লাহর ৯৯টি নাম',
    seerah_timeline: 'সীরাত টাইমলাইন',
    islamic_lessons: 'ইসলামিক পাঠ',
    quizzes: 'কুইজ',
    qibla_compass: 'কিবলা কম্পাস',
    tasbih_counter: 'তাসবিহ কাউন্টার',
    islamic_calendar: 'হিজরি ক্যালেন্ডার',
    my_profile: 'আমার প্রোফাইল',
    open_tasks_finance: 'কাজ ও সাদাকাহ খুলুন',
    noble_quran_title: 'পবিত্র কুরআন (১১৪টি সূরা)',
    verified_uthmani_free: 'যাচাইকৃত উসমানী লিপি · সর্বদা বিনামূল্যে',
    last_read: 'সর্বশেষ পঠিত',
    search_surah_placeholder: 'সূরার নাম বা নম্বর খুঁজুন (১ - ১১৪)...',
    bookmarks: 'বুকমার্ক',
    juz: 'পারা (জুজ)',
    surah: 'সূরা',
    audio: 'অডিও',
    repeat: 'পুনরাবৃত্তি',
    tafsir: 'তাফসির',
    bookmark: 'বুকমার্ক',
    saved: 'সংরক্ষিত',
    hifz_studio_title: 'হিফজ মাস্টারি স্টুডিও',
    my_hifz: 'আমার হিফজ',
    revision: 'রিভিশন',
    stats: 'পরিসংখ্যান',
    progress_overview: 'অগ্রগতি সংক্ষেপ',
    surahs_completed: 'সম্পন্ন সূরা',
    continue_hifz: 'হিফজ চালিয়ে যান',
    active_recall_tester: 'মেমোরি টেস্টার',
    hide_to_test: 'পরীক্ষার জন্য লুকান',
    reveal_text: 'আয়াত দেখুন',
    salah_tracker_title: 'সালাত ট্র্যাকার ও গাইড',
    daily_tracker: 'দৈনিক ট্র্যাকার',
    prayer_guide: 'নামাজ গাইড',
    wudu_guide: 'অজু গাইড',
    prayed_on_time: 'সময়মতো আদায় ✓',
    tap_to_log: 'লগ করতে ট্যাপ করুন',
    authentic_duas_title: 'সহীহ দোয়া লাইব্রেরি',
    categories: 'বিভাগসমূহ',
    daily: 'দৈনিক',
    favorites: 'প্রিয়',
    ready_for_adventure: 'আজকের অভিযানের জন্য প্রস্তুত?',
    activities_completed: 'টি কাজ সম্পন্ন',
    learn_and_explore: 'শিখুন ও অন্বেষণ করুন',
    open_adventure_map: '৩ডি অ্যাডভেঞ্চার ম্যাপ খুলুন',
    quran_garden: 'কুরআন গার্ডেন',
    dua_garden: 'দোয়া গার্ডেন',
    salah_space: 'সালাত স্পেস',
    story_village: 'গল্পের গ্রাম',
    recite_with_ayaan: 'আয়ানের সাথে তিলাওয়াত',
    todays_good_deed: 'আজকের ভালো কাজ',
    family_challenge: 'ফ্যামিলি চ্যালেঞ্জ',
    my_certificate: 'আমার সার্টিফিকেট',
    mission_complete_title: 'মাশাআল্লাহ! মিশন সম্পন্ন!',
    lets_practice: 'চলো অনুশীলন করি!',
    my_badges: 'আমার ব্যাজ ও সার্টিফিকেট',
  },
  fa: {
    greeting: 'سلام علیکم',
    subtitle_home: 'امروز کمی برای دانش وقت بگذارید. هر قدم شما را به خدا نزدیک‌تر می‌کند.',
    todays_focus: 'تمرکز امروز',
    start_learning: 'شروع یادگیری',
    adult_mode: 'حالت بزرگسالان',
    kids_world: 'دنیای کودکان',
    parent_hub: 'بخش والدین',
    home: 'خانه',
    quran: 'قرآن',
    hifz: 'حفظ',
    salah: 'نماز',
    progress: 'پیشرفت',
    more: 'بیشتر',
    duas: 'دعاها',
    stories: 'داستان‌ها',
    adventure: 'ماجراجویی',
    stars: 'ستاره‌ها',
    tasks_expenses: 'وظایف و صدقه',
    next_prayer: 'نماز بعدی',
    continue_quest: 'ادامه ماموریت',
    todays_mission: 'ماموریت ۱۰ دقیقه‌ای امروز',
    read_verses_reflection: 'چند آیه با تدبر بخوانید',
    continue_surah: 'ادامه سوره',
    explore_adult_modules: 'مشاهده همه بخش‌های آموزشی',
    settings_languages: 'تنظیمات و زبان‌ها',
    names_99: '۹۹ نام خداوند',
    seerah_timeline: 'سیره پیامبر ﷺ',
    islamic_lessons: 'درس‌های اسلامی',
    quizzes: 'آزمون‌ها',
    qibla_compass: 'قبله‌نما',
    tasbih_counter: 'تسبیح‌شمار',
    islamic_calendar: 'تقویم هجری',
    my_profile: 'نمایه من',
    open_tasks_finance: 'باز کردن وظایف و صدقه',
    noble_quran_title: 'قرآن کریم (۱۱۴ سوره)',
    verified_uthmani_free: 'رسم‌الخط عثمانی معتبر · همیشه رایگان',
    last_read: 'آخرین مطالعه',
    search_surah_placeholder: 'جستجوی نام یا شماره سوره (۱ - ۱۱۴)...',
    bookmarks: 'نشان‌ها',
    juz: 'جزء',
    surah: 'سوره',
    audio: 'صوت',
    repeat: 'تکرار',
    tafsir: 'تفسیر',
    bookmark: 'نشان کردن',
    saved: 'ذخیره شد',
    hifz_studio_title: 'استودیو حفظ قرآن',
    my_hifz: 'حفظ من',
    revision: 'مرور',
    stats: 'آمار',
    progress_overview: 'خلاصه پیشرفت',
    surahs_completed: 'سوره‌های تکمیل‌شده',
    continue_hifz: 'ادامه حفظ',
    active_recall_tester: 'آزمون یادآوری فعال',
    hide_to_test: 'پنهان کردن متن',
    reveal_text: 'نمایش آیه',
    salah_tracker_title: 'پیگیری نماز و راهنما',
    daily_tracker: 'پیگیری روزانه',
    prayer_guide: 'راهنمای نماز',
    wudu_guide: 'راهنمای وضو',
    prayed_on_time: 'در وقت خوانده شد ✓',
    tap_to_log: 'ثبت نماز',
    authentic_duas_title: 'کتابخانه ادعیه معتبر',
    categories: 'دسته‌ها',
    daily: 'روزانه',
    favorites: 'برگزیده‌ها',
    ready_for_adventure: 'آماده ماجراجویی امروز هستی؟',
    activities_completed: 'فعالیت انجام شد',
    learn_and_explore: 'بیاموز و کاوش کن',
    open_adventure_map: 'باز کردن نقشه ماجراجویی',
    quran_garden: 'باغ قرآن',
    dua_garden: 'باغ دعا',
    salah_space: 'فضای نماز',
    story_village: 'دهکده داستان',
    recite_with_ayaan: 'تلاوت با ایان',
    todays_good_deed: 'کار نیک امروز',
    family_challenge: 'چالش خانواده',
    my_certificate: 'گواهینامه من',
    mission_complete_title: 'ماشاءالله! ماموریت کامل شد!',
    lets_practice: 'بیایید تمرین کنیم!',
    my_badges: 'نشان‌ها و گواهینامه‌ها',
  },
  fr: {
    greeting: 'Assalamu alaikum',
    subtitle_home: 'Prenez un moment pour la connaissance aujourd’hui. Chaque pas vous rapproche d’Allah.',
    todays_focus: 'Objectif du Jour',
    start_learning: 'Commencer',
    adult_mode: 'Mode Adulte',
    kids_world: 'Monde Enfants',
    parent_hub: 'Espace Parents',
    home: 'Accueil',
    quran: 'Coran',
    hifz: 'Hifz',
    salah: 'Prière',
    progress: 'Progrès',
    more: 'Plus',
    duas: 'Invocations',
    stories: 'Histoires',
    adventure: 'Aventure',
    stars: 'Étoiles',
    tasks_expenses: 'Tâches & Sadaqah',
    next_prayer: 'Prochaine Prière',
    continue_quest: 'Continuer la Quête',
    todays_mission: 'Mission de 10 Minutes',
    read_verses_reflection: 'Lire quelques versets avec méditation',
    continue_surah: 'Continuer la Sourate',
    explore_adult_modules: 'Explorer Tous les Modules',
    settings_languages: 'Paramètres & Langues',
    names_99: '99 Noms d’Allah',
    seerah_timeline: 'Chronologie de la Sîrah',
    islamic_lessons: 'Leçons Islamiques',
    quizzes: 'Quiz',
    qibla_compass: 'Boussole Qibla',
    tasbih_counter: 'Compteur Tasbih',
    islamic_calendar: 'Calendrier Hégirien',
    my_profile: 'Mon Profil',
    open_tasks_finance: 'Ouvrir Tâches & Sadaqah',
    noble_quran_title: 'Noble Coran (114 Sourates)',
    verified_uthmani_free: 'Script Othmani Vérifié · Gratuit Toujours',
    last_read: 'Dernière Lecture',
    search_surah_placeholder: 'Rechercher une sourate par nom ou numéro (1 - 114)...',
    bookmarks: 'Favoris',
    juz: 'Juz',
    surah: 'Sourate',
    audio: 'Audio',
    repeat: 'Répéter',
    tafsir: 'Tafsir',
    bookmark: 'Marquer',
    saved: 'Enregistré',
    hifz_studio_title: 'Studio de Mémorisation Hifz',
    my_hifz: 'Mon Hifz',
    revision: 'Révision',
    stats: 'Stats',
    progress_overview: 'Aperçu des Progrès (Auto-déclaré)',
    surahs_completed: 'Sourates Complétées',
    continue_hifz: 'Continuer le Hifz',
    active_recall_tester: 'Testeur de Rappel Actif',
    hide_to_test: 'Masquer pour Tester',
    reveal_text: 'Révéler le Texte',
    salah_tracker_title: 'Suivi des Prières & Guides',
    daily_tracker: 'Suivi Quotidien',
    prayer_guide: 'Guide de Prière',
    wudu_guide: 'Guide des Ablutions',
    prayed_on_time: 'Prié à l’heure ✓',
    tap_to_log: 'Appuyer pour noter',
    authentic_duas_title: 'Bibliothèque d’Invocations Authentiques',
    categories: 'Catégories',
    daily: 'Quotidien',
    favorites: 'Favoris',
    ready_for_adventure: 'Prêt pour l’aventure d’aujourd’hui ?',
    activities_completed: 'activités terminées',
    learn_and_explore: 'Apprendre & Explorer',
    open_adventure_map: 'Ouvrir la Carte d’Aventure 3D',
    quran_garden: 'Jardin du Coran',
    dua_garden: 'Jardin des Invocations',
    salah_space: 'Espace Prière',
    story_village: 'Village des Histoires',
    recite_with_ayaan: 'Réciter avec Ayaan',
    todays_good_deed: 'Bonne Action du Jour',
    family_challenge: 'Défi Familial',
    my_certificate: 'Mon Certificat',
    mission_complete_title: 'MashaAllah ! Mission Accomplie !',
    lets_practice: 'Pratiquons Ensemble !',
    my_badges: 'Mes Badges & Certificats',
  },
  es: {
    greeting: 'Assalamu alaikum',
    subtitle_home: 'Dedica un espacio al conocimiento hoy. Cada paso te acerca más a Allah.',
    todays_focus: 'Enfoque de Hoy',
    start_learning: 'Empezar a Aprender',
    adult_mode: 'Modo Adulto',
    kids_world: 'Mundo Infantil',
    parent_hub: 'Portal de Padres',
    home: 'Inicio',
    quran: 'Corán',
    hifz: 'Hifz',
    salah: 'Oración',
    progress: 'Progreso',
    more: 'Más',
    duas: 'Súplicas',
    stories: 'Historias',
    adventure: 'Aventura',
    stars: 'Estrellas',
    tasks_expenses: 'Tareas y Sadaqah',
    next_prayer: 'Próxima Oración',
    continue_quest: 'Continuar Misión',
    todays_mission: 'Misión de 10 Minutos',
    read_verses_reflection: 'Lee algunos versículos con reflexión',
    continue_surah: 'Continuar Sura',
    explore_adult_modules: 'Explorar Todos los Módulos',
    settings_languages: 'Ajustes e Idiomas',
    names_99: '99 Nombres de Allah',
    seerah_timeline: 'Línea de Tiempo de la Sirah',
    islamic_lessons: 'Lecciones Islámicas',
    quizzes: 'Cuestionarios',
    qibla_compass: 'Brújula Qibla',
    tasbih_counter: 'Contador Tasbih',
    islamic_calendar: 'Calendario Hégira',
    my_profile: 'Mi Perfil',
    open_tasks_finance: 'Abrir Tareas y Sadaqah',
    noble_quran_title: 'Noble Corán (114 Suras)',
    verified_uthmani_free: 'Escritura Uthmani Verificada · Gratis Siempre',
    last_read: 'Última Lectura',
    search_surah_placeholder: 'Buscar Sura por nombre o número (1 - 114)...',
    bookmarks: 'Marcadores',
    juz: 'Juz',
    surah: 'Sura',
    audio: 'Audio',
    repeat: 'Repetir',
    tafsir: 'Tafsir',
    bookmark: 'Guardar',
    saved: 'Guardado',
    hifz_studio_title: 'Estudio de Memorización Hifz',
    my_hifz: 'Mi Hifz',
    revision: 'Revisión',
    stats: 'Estadísticas',
    progress_overview: 'Resumen de Progreso (Autoinformado)',
    surahs_completed: 'Suras Completadas',
    continue_hifz: 'Continuar Hifz',
    active_recall_tester: 'Evaluador de Recuerdo Activo',
    hide_to_test: 'Ocultar para Evaluar',
    reveal_text: 'Mostrar Texto',
    salah_tracker_title: 'Registro de Oración y Guías',
    daily_tracker: 'Registro Diario',
    prayer_guide: 'Guía de Oración',
    wudu_guide: 'Guía de Wudu',
    prayed_on_time: 'Rezado a Tiempo ✓',
    tap_to_log: 'Toca para Registrar',
    authentic_duas_title: 'Biblioteca de Súplicas Auténticas',
    categories: 'Categorías',
    daily: 'Diario',
    favorites: 'Favoritos',
    ready_for_adventure: '¿Listo para la aventura de hoy?',
    activities_completed: 'actividades completadas',
    learn_and_explore: 'Aprende y Explora',
    open_adventure_map: 'Abrir Mapa de Aventura 3D',
    quran_garden: 'Jardín del Corán',
    dua_garden: 'Jardín de Súplicas',
    salah_space: 'Espacio de Oración',
    story_village: 'Aldea de Historias',
    recite_with_ayaan: 'Recitar con Ayaan',
    todays_good_deed: 'Buena Obra de Hoy',
    family_challenge: 'Reto Familiar',
    my_certificate: 'Mi Certificado',
    mission_complete_title: '¡MashaAllah! ¡Misión Completada!',
    lets_practice: '¡Practiquemos Juntos!',
    my_badges: 'Mis Insignias y Certificados',
  },
};

type LanguageChangeListener = (lang: LanguageCode, metadata: LanguageOption) => void;

class TranslationHelperService {
  private currentLanguage: LanguageCode = 'en';
  private customOverrides: Partial<Record<LanguageCode, Partial<TranslationDictionary>>> = {};
  private listeners: Set<LanguageChangeListener> = new Set();

  constructor() {
    this.syncDocumentDirection('en');
  }

  /**
   * Returns the full LanguageOption metadata from SUPPORTED_LANGUAGES for a given code.
   */
  public getLanguageMetadata(code: LanguageCode = this.currentLanguage): LanguageOption {
    return (
      SUPPORTED_LANGUAGES.find((lang) => lang.code === code) ||
      SUPPORTED_LANGUAGES[0]
    );
  }

  /**
   * Returns all supported languages from SUPPORTED_LANGUAGES.
   */
  public getSupportedLanguages(): LanguageOption[] {
    return SUPPORTED_LANGUAGES;
  }

  /**
   * Returns the active language code.
   */
  public getCurrentLanguage(): LanguageCode {
    return this.currentLanguage;
  }

  /**
   * Dynamically switches the active language, updates document attributes (lang & dir),
   * and notifies all subscribed UI components.
   */
  public setLanguage(code: LanguageCode): LanguageOption {
    const validMeta = this.getLanguageMetadata(code);
    this.currentLanguage = validMeta.code;
    this.syncDocumentDirection(validMeta.code);
    this.listeners.forEach((listener) => listener(validMeta.code, validMeta));
    return validMeta;
  }

  /**
   * Synchronizes `<html lang="..." dir="...">` with the active language metadata.
   */
  public syncDocumentDirection(code: LanguageCode): void {
    if (typeof document === 'undefined') return;
    const meta = this.getLanguageMetadata(code);
    document.documentElement.lang = meta.code === 'hinglish' ? 'en' : meta.code;
    document.documentElement.dir = meta.dir;
  }

  /**
   * Loads the full UI label dictionary for the specified language, merging any custom overrides
   * and falling back to English for any missing keys.
   */
  public loadDictionary(code: LanguageCode = this.currentLanguage): TranslationDictionary {
    const base = BASE_DICTIONARIES[code] || BASE_DICTIONARIES.en;
    const overrides = this.customOverrides[code] || {};
    return {
      ...BASE_DICTIONARIES.en,
      ...base,
      ...overrides,
    };
  }

  /**
   * Registers runtime label overrides for a specific language.
   */
  public extendDictionary(code: LanguageCode, labels: Partial<TranslationDictionary>): void {
    this.customOverrides[code] = {
      ...(this.customOverrides[code] || {}),
      ...labels,
    };
    if (code === this.currentLanguage) {
      const meta = this.getLanguageMetadata(code);
      this.listeners.forEach((l) => l(code, meta));
    }
  }

  /**
   * Translates a UI key for the given (or active) language, with optional `{param}` interpolation.
   */
  public translate(
    key: TranslationKey,
    lang: LanguageCode = this.currentLanguage,
    params?: Record<string, string | number>
  ): string {
    const dict = this.loadDictionary(lang);
    let text = dict[key] || BASE_DICTIONARIES.en[key] || key;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
      });
    }
    return text;
  }

  /**
   * Resolves a localized field from a multi-language content map (such as Quran ayah or Dua translations),
   * falling back cleanly to English.
   */
  public resolveLocalizedContent(
    translations: Partial<Record<LanguageCode, string>> | undefined,
    lang: LanguageCode = this.currentLanguage,
    fallback = ''
  ): string {
    if (!translations) return fallback;
    return translations[lang] || translations.en || fallback;
  }

  /**
   * Subscribe to language change events.
   */
  public subscribe(listener: LanguageChangeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const translationService = new TranslationHelperService();
