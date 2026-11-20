import { AyahItem, LanguageCode, OfflineSurahAvailability, SurahMeta, SurahPayload } from '../types/ilmizo';
import { SUPPORTED_LANGUAGES } from './i18n';
import { validateSurahPayload } from '../engines/adultLearningEngines';
import {
  deleteOfflineSurahFromDb,
  getOfflineSurahFromDb,
  saveOfflineSurahToDb,
} from '../services/localDatabase';

export const ALL_114_SURAHS: SurahMeta[] = [
  { number: 1, nameArabic: 'الفاتحة', nameTranslit: 'Al-Fatiha', nameEnglish: 'The Opening', ayahCount: 7, revelationType: 'Meccan', juz: 1, bundledOffline: true },
  { number: 2, nameArabic: 'البقرة', nameTranslit: 'Al-Baqarah', nameEnglish: 'The Cow', ayahCount: 286, revelationType: 'Madani', juz: 1, bundledOffline: true },
  { number: 3, nameArabic: 'آل عمران', nameTranslit: 'Aal-Imran', nameEnglish: 'The Family of Imran', ayahCount: 200, revelationType: 'Madani', juz: 3 },
  { number: 4, nameArabic: 'النساء', nameTranslit: 'An-Nisa', nameEnglish: 'The Women', ayahCount: 176, revelationType: 'Madani', juz: 4 },
  { number: 5, nameArabic: 'المائدة', nameTranslit: "Al-Ma'idah", nameEnglish: 'The Table Spread', ayahCount: 120, revelationType: 'Madani', juz: 6 },
  { number: 6, nameArabic: 'الأنعام', nameTranslit: "Al-An'am", nameEnglish: 'The Cattle', ayahCount: 165, revelationType: 'Meccan', juz: 7 },
  { number: 7, nameArabic: 'الأعراف', nameTranslit: "Al-A'raf", nameEnglish: 'The Heights', ayahCount: 206, revelationType: 'Meccan', juz: 8 },
  { number: 8, nameArabic: 'الأنفال', nameTranslit: 'Al-Anfal', nameEnglish: 'The Spoils of War', ayahCount: 75, revelationType: 'Madani', juz: 9 },
  { number: 9, nameArabic: 'التوبة', nameTranslit: 'At-Tawbah', nameEnglish: 'The Repentance', ayahCount: 129, revelationType: 'Madani', juz: 10 },
  { number: 10, nameArabic: 'يونس', nameTranslit: 'Yunus', nameEnglish: 'Jonah', ayahCount: 109, revelationType: 'Meccan', juz: 11 },
  { number: 11, nameArabic: 'هود', nameTranslit: 'Hud', nameEnglish: 'Hud', ayahCount: 123, revelationType: 'Meccan', juz: 11 },
  { number: 12, nameArabic: 'يوسف', nameTranslit: 'Yusuf', nameEnglish: 'Joseph', ayahCount: 111, revelationType: 'Meccan', juz: 12 },
  { number: 13, nameArabic: 'الرعد', nameTranslit: "Ar-Ra'd", nameEnglish: 'The Thunder', ayahCount: 43, revelationType: 'Madani', juz: 13 },
  { number: 14, nameArabic: 'إبراهيم', nameTranslit: 'Ibrahim', nameEnglish: 'Abraham', ayahCount: 52, revelationType: 'Meccan', juz: 13 },
  { number: 15, nameArabic: 'الحجر', nameTranslit: 'Al-Hijr', nameEnglish: 'The Rocky Tract', ayahCount: 99, revelationType: 'Meccan', juz: 14 },
  { number: 16, nameArabic: 'النحل', nameTranslit: 'An-Nahl', nameEnglish: 'The Bee', ayahCount: 128, revelationType: 'Meccan', juz: 14 },
  { number: 17, nameArabic: 'الإسراء', nameTranslit: 'Al-Isra', nameEnglish: 'The Night Journey', ayahCount: 111, revelationType: 'Meccan', juz: 15 },
  { number: 18, nameArabic: 'الكهف', nameTranslit: 'Al-Kahf', nameEnglish: 'The Cave', ayahCount: 110, revelationType: 'Meccan', juz: 15 },
  { number: 19, nameArabic: 'مريم', nameTranslit: 'Maryam', nameEnglish: 'Mary', ayahCount: 98, revelationType: 'Meccan', juz: 16 },
  { number: 20, nameArabic: 'طه', nameTranslit: 'Ta-Ha', nameEnglish: 'Ta-Ha', ayahCount: 135, revelationType: 'Meccan', juz: 16 },
  { number: 21, nameArabic: 'الأنبياء', nameTranslit: 'Al-Anbiya', nameEnglish: 'The Prophets', ayahCount: 112, revelationType: 'Meccan', juz: 17 },
  { number: 22, nameArabic: 'الحج', nameTranslit: 'Al-Hajj', nameEnglish: 'The Pilgrimage', ayahCount: 78, revelationType: 'Madani', juz: 17 },
  { number: 23, nameArabic: 'المؤمنون', nameTranslit: "Al-Mu'minun", nameEnglish: 'The Believers', ayahCount: 118, revelationType: 'Meccan', juz: 18 },
  { number: 24, nameArabic: 'النور', nameTranslit: 'An-Nur', nameEnglish: 'The Light', ayahCount: 64, revelationType: 'Madani', juz: 18 },
  { number: 25, nameArabic: 'الفرقان', nameTranslit: 'Al-Furqan', nameEnglish: 'The Criterion', ayahCount: 77, revelationType: 'Meccan', juz: 18 },
  { number: 26, nameArabic: 'الشعراء', nameTranslit: "Ash-Shu'ara", nameEnglish: 'The Poets', ayahCount: 227, revelationType: 'Meccan', juz: 19 },
  { number: 27, nameArabic: 'النمل', nameTranslit: 'An-Naml', nameEnglish: 'The Ant', ayahCount: 93, revelationType: 'Meccan', juz: 19 },
  { number: 28, nameArabic: 'القصص', nameTranslit: 'Al-Qasas', nameEnglish: 'The Stories', ayahCount: 88, revelationType: 'Meccan', juz: 20 },
  { number: 29, nameArabic: 'العنكبوت', nameTranslit: 'Al-Ankabut', nameEnglish: 'The Spider', ayahCount: 69, revelationType: 'Meccan', juz: 20 },
  { number: 30, nameArabic: 'الروم', nameTranslit: 'Ar-Rum', nameEnglish: 'The Romans', ayahCount: 60, revelationType: 'Meccan', juz: 21 },
  { number: 31, nameArabic: 'لقمان', nameTranslit: 'Luqman', nameEnglish: 'Luqman', ayahCount: 34, revelationType: 'Meccan', juz: 21 },
  { number: 32, nameArabic: 'السجدة', nameTranslit: 'As-Sajdah', nameEnglish: 'The Prostration', ayahCount: 30, revelationType: 'Meccan', juz: 21 },
  { number: 33, nameArabic: 'الأحزاب', nameTranslit: 'Al-Ahzab', nameEnglish: 'The Combined Forces', ayahCount: 73, revelationType: 'Madani', juz: 21 },
  { number: 34, nameArabic: 'سبأ', nameTranslit: 'Saba', nameEnglish: 'Sheba', ayahCount: 54, revelationType: 'Meccan', juz: 22 },
  { number: 35, nameArabic: 'فاطر', nameTranslit: 'Fatir', nameEnglish: 'Originator', ayahCount: 45, revelationType: 'Meccan', juz: 22 },
  { number: 36, nameArabic: 'يس', nameTranslit: 'Ya-Sin', nameEnglish: 'Ya-Sin', ayahCount: 83, revelationType: 'Meccan', juz: 22 },
  { number: 37, nameArabic: 'الصافات', nameTranslit: 'As-Saffat', nameEnglish: 'Those Ranged in Ranks', ayahCount: 182, revelationType: 'Meccan', juz: 23 },
  { number: 38, nameArabic: 'ص', nameTranslit: 'Sad', nameEnglish: 'The Letter Sad', ayahCount: 88, revelationType: 'Meccan', juz: 23 },
  { number: 39, nameArabic: 'الزمر', nameTranslit: 'Az-Zumar', nameEnglish: 'The Troops', ayahCount: 75, revelationType: 'Meccan', juz: 23 },
  { number: 40, nameArabic: 'غافر', nameTranslit: 'Ghafir', nameEnglish: 'The Forgiver', ayahCount: 85, revelationType: 'Meccan', juz: 24 },
  { number: 41, nameArabic: 'فصلت', nameTranslit: 'Fussilat', nameEnglish: 'Explained in Detail', ayahCount: 54, revelationType: 'Meccan', juz: 24 },
  { number: 42, nameArabic: 'الشورى', nameTranslit: 'Ash-Shura', nameEnglish: 'The Consultation', ayahCount: 53, revelationType: 'Meccan', juz: 25 },
  { number: 43, nameArabic: 'الزخرف', nameTranslit: 'Az-Zukhruf', nameEnglish: 'The Ornaments of Gold', ayahCount: 89, revelationType: 'Meccan', juz: 25 },
  { number: 44, nameArabic: 'الدخان', nameTranslit: 'Ad-Dukhan', nameEnglish: 'The Smoke', ayahCount: 59, revelationType: 'Meccan', juz: 25 },
  { number: 45, nameArabic: 'الجاثية', nameTranslit: 'Al-Jathiyah', nameEnglish: 'The Crouching', ayahCount: 37, revelationType: 'Meccan', juz: 25 },
  { number: 46, nameArabic: 'الأحقاف', nameTranslit: 'Al-Ahqaf', nameEnglish: 'The Wind-Curved Sandhills', ayahCount: 35, revelationType: 'Meccan', juz: 26 },
  { number: 47, nameArabic: 'محمد', nameTranslit: 'Muhammad', nameEnglish: 'Muhammad', ayahCount: 38, revelationType: 'Madani', juz: 26 },
  { number: 48, nameArabic: 'الفتح', nameTranslit: 'Al-Fath', nameEnglish: 'The Victory', ayahCount: 29, revelationType: 'Madani', juz: 26 },
  { number: 49, nameArabic: 'الحجرات', nameTranslit: 'Al-Hujurat', nameEnglish: 'The Rooms', ayahCount: 18, revelationType: 'Madani', juz: 26 },
  { number: 50, nameArabic: 'ق', nameTranslit: 'Qaf', nameEnglish: 'The Letter Qaf', ayahCount: 45, revelationType: 'Meccan', juz: 26 },
  { number: 51, nameArabic: 'الذاريات', nameTranslit: 'Adh-Dhariyat', nameEnglish: 'The Winnowing Winds', ayahCount: 60, revelationType: 'Meccan', juz: 26 },
  { number: 52, nameArabic: 'الطور', nameTranslit: 'At-Tur', nameEnglish: 'The Mount', ayahCount: 49, revelationType: 'Meccan', juz: 27 },
  { number: 53, nameArabic: 'النجم', nameTranslit: 'An-Najm', nameEnglish: 'The Star', ayahCount: 62, revelationType: 'Meccan', juz: 27 },
  { number: 54, nameArabic: 'القمر', nameTranslit: 'Al-Qamar', nameEnglish: 'The Moon', ayahCount: 55, revelationType: 'Meccan', juz: 27 },
  { number: 55, nameArabic: 'الرحمن', nameTranslit: 'Ar-Rahman', nameEnglish: 'The Most Merciful', ayahCount: 78, revelationType: 'Madani', juz: 27 },
  { number: 56, nameArabic: 'الواقعة', nameTranslit: "Al-Waqi'ah", nameEnglish: 'The Inevitable', ayahCount: 96, revelationType: 'Meccan', juz: 27 },
  { number: 57, nameArabic: 'الحديد', nameTranslit: 'Al-Hadid', nameEnglish: 'The Iron', ayahCount: 29, revelationType: 'Madani', juz: 27 },
  { number: 58, nameArabic: 'المجادلة', nameTranslit: 'Al-Mujadila', nameEnglish: 'The Pleading Woman', ayahCount: 22, revelationType: 'Madani', juz: 28 },
  { number: 59, nameArabic: 'الحشر', nameTranslit: 'Al-Hashr', nameEnglish: 'The Exile', ayahCount: 24, revelationType: 'Madani', juz: 28 },
  { number: 60, nameArabic: 'الممتحنة', nameTranslit: 'Al-Mumtahanah', nameEnglish: 'She That Is To Be Examined', ayahCount: 13, revelationType: 'Madani', juz: 28 },
  { number: 61, nameArabic: 'الصف', nameTranslit: 'As-Saff', nameEnglish: 'The Ranks', ayahCount: 14, revelationType: 'Madani', juz: 28 },
  { number: 62, nameArabic: 'الجمعة', nameTranslit: "Al-Jumu'ah", nameEnglish: 'The Congregation', ayahCount: 11, revelationType: 'Madani', juz: 28 },
  { number: 63, nameArabic: 'المنافقون', nameTranslit: 'Al-Munafiqun', nameEnglish: 'The Hypocrites', ayahCount: 11, revelationType: 'Madani', juz: 28 },
  { number: 64, nameArabic: 'التغابن', nameTranslit: 'At-Taghabun', nameEnglish: 'The Mutual Disillusion', ayahCount: 18, revelationType: 'Madani', juz: 28 },
  { number: 65, nameArabic: 'الطلاق', nameTranslit: 'At-Talaq', nameEnglish: 'The Divorce', ayahCount: 12, revelationType: 'Madani', juz: 28 },
  { number: 66, nameArabic: 'التحريم', nameTranslit: 'At-Tahrim', nameEnglish: 'The Prohibition', ayahCount: 12, revelationType: 'Madani', juz: 28 },
  { number: 67, nameArabic: 'الملك', nameTranslit: 'Al-Mulk', nameEnglish: 'The Sovereignty', ayahCount: 30, revelationType: 'Meccan', juz: 29 },
  { number: 68, nameArabic: 'القلم', nameTranslit: 'Al-Qalam', nameEnglish: 'The Pen', ayahCount: 52, revelationType: 'Meccan', juz: 29 },
  { number: 69, nameArabic: 'الحاقة', nameTranslit: 'Al-Haqqah', nameEnglish: 'The Reality', ayahCount: 52, revelationType: 'Meccan', juz: 29 },
  { number: 70, nameArabic: 'المعارج', nameTranslit: "Al-Ma'arij", nameEnglish: 'The Ascending Stairways', ayahCount: 44, revelationType: 'Meccan', juz: 29 },
  { number: 71, nameArabic: 'نوح', nameTranslit: 'Nuh', nameEnglish: 'Noah', ayahCount: 28, revelationType: 'Meccan', juz: 29 },
  { number: 72, nameArabic: 'الجن', nameTranslit: 'Al-Jinn', nameEnglish: 'The Jinn', ayahCount: 28, revelationType: 'Meccan', juz: 29 },
  { number: 73, nameArabic: 'المزمل', nameTranslit: 'Al-Muzzammil', nameEnglish: 'The Enshrouded One', ayahCount: 20, revelationType: 'Meccan', juz: 29 },
  { number: 74, nameArabic: 'المدثر', nameTranslit: 'Al-Muddaththir', nameEnglish: 'The Cloaked One', ayahCount: 56, revelationType: 'Meccan', juz: 29 },
  { number: 75, nameArabic: 'القيامة', nameTranslit: 'Al-Qiyamah', nameEnglish: 'The Resurrection', ayahCount: 40, revelationType: 'Meccan', juz: 29 },
  { number: 76, nameArabic: 'الإنسان', nameTranslit: 'Al-Insan', nameEnglish: 'The Man', ayahCount: 31, revelationType: 'Madani', juz: 29 },
  { number: 77, nameArabic: 'المرسلات', nameTranslit: 'Al-Mursalat', nameEnglish: 'The Emissaries', ayahCount: 50, revelationType: 'Meccan', juz: 29 },
  { number: 78, nameArabic: 'النبأ', nameTranslit: 'An-Naba', nameEnglish: 'The Tidings', ayahCount: 40, revelationType: 'Meccan', juz: 30 },
  { number: 79, nameArabic: 'النازعات', nameTranslit: "An-Nazi'at", nameEnglish: 'Those Who Drag Forth', ayahCount: 46, revelationType: 'Meccan', juz: 30 },
  { number: 80, nameArabic: 'عبس', nameTranslit: 'Abasa', nameEnglish: 'He Frowned', ayahCount: 42, revelationType: 'Meccan', juz: 30 },
  { number: 81, nameArabic: 'التكوير', nameTranslit: 'At-Takwir', nameEnglish: 'The Overthrowing', ayahCount: 29, revelationType: 'Meccan', juz: 30 },
  { number: 82, nameArabic: 'الانفطار', nameTranslit: 'Al-Infitar', nameEnglish: 'The Cleaving', ayahCount: 19, revelationType: 'Meccan', juz: 30 },
  { number: 83, nameArabic: 'المطففين', nameTranslit: 'Al-Mutaffifin', nameEnglish: 'The Defrauding', ayahCount: 36, revelationType: 'Meccan', juz: 30 },
  { number: 84, nameArabic: 'الانشقاق', nameTranslit: 'Al-Inshiqaq', nameEnglish: 'The Sundering', ayahCount: 25, revelationType: 'Meccan', juz: 30 },
  { number: 85, nameArabic: 'البروج', nameTranslit: 'Al-Buruj', nameEnglish: 'The Mansions of the Stars', ayahCount: 22, revelationType: 'Meccan', juz: 30 },
  { number: 86, nameArabic: 'الطارق', nameTranslit: 'At-Tariq', nameEnglish: 'The Morning Star', ayahCount: 17, revelationType: 'Meccan', juz: 30 },
  { number: 87, nameArabic: 'الأعلى', nameTranslit: "Al-A'la", nameEnglish: 'The Most High', ayahCount: 19, revelationType: 'Meccan', juz: 30 },
  { number: 88, nameArabic: 'الغاشية', nameTranslit: 'Al-Ghashiyah', nameEnglish: 'The Overwhelming', ayahCount: 26, revelationType: 'Meccan', juz: 30 },
  { number: 89, nameArabic: 'الفجر', nameTranslit: 'Al-Fajr', nameEnglish: 'The Dawn', ayahCount: 30, revelationType: 'Meccan', juz: 30 },
  { number: 90, nameArabic: 'البلد', nameTranslit: 'Al-Balad', nameEnglish: 'The City', ayahCount: 20, revelationType: 'Meccan', juz: 30 },
  { number: 91, nameArabic: 'الشمس', nameTranslit: 'Ash-Shams', nameEnglish: 'The Sun', ayahCount: 15, revelationType: 'Meccan', juz: 30 },
  { number: 92, nameArabic: 'الليل', nameTranslit: 'Al-Layl', nameEnglish: 'The Night', ayahCount: 21, revelationType: 'Meccan', juz: 30 },
  { number: 93, nameArabic: 'الضحى', nameTranslit: 'Ad-Duha', nameEnglish: 'The Morning Hours', ayahCount: 11, revelationType: 'Meccan', juz: 30 },
  { number: 94, nameArabic: 'الشرح', nameTranslit: 'Ash-Sharh', nameEnglish: 'The Relief', ayahCount: 8, revelationType: 'Meccan', juz: 30 },
  { number: 95, nameArabic: 'التين', nameTranslit: 'At-Tin', nameEnglish: 'The Fig', ayahCount: 8, revelationType: 'Meccan', juz: 30 },
  { number: 96, nameArabic: 'العلق', nameTranslit: 'Al-Alaq', nameEnglish: 'The Clot', ayahCount: 19, revelationType: 'Meccan', juz: 30 },
  { number: 97, nameArabic: 'القدر', nameTranslit: 'Al-Qadr', nameEnglish: 'The Power', ayahCount: 5, revelationType: 'Meccan', juz: 30 },
  { number: 98, nameArabic: 'البينة', nameTranslit: 'Al-Bayyinah', nameEnglish: 'The Clear Proof', ayahCount: 8, revelationType: 'Madani', juz: 30 },
  { number: 99, nameArabic: 'الزلزلة', nameTranslit: 'Az-Zalzalah', nameEnglish: 'The Earthquake', ayahCount: 8, revelationType: 'Madani', juz: 30 },
  { number: 100, nameArabic: 'العاديات', nameTranslit: 'Al-Adiyat', nameEnglish: 'The Courser', ayahCount: 11, revelationType: 'Meccan', juz: 30 },
  { number: 101, nameArabic: 'القارعة', nameTranslit: "Al-Qari'ah", nameEnglish: 'The Calamity', ayahCount: 11, revelationType: 'Meccan', juz: 30 },
  { number: 102, nameArabic: 'التكاثر', nameTranslit: 'At-Takathur', nameEnglish: 'The Rivalry in Worldly Increase', ayahCount: 8, revelationType: 'Meccan', juz: 30 },
  { number: 103, nameArabic: 'العصر', nameTranslit: 'Al-Asr', nameEnglish: 'The Declining Day', ayahCount: 3, revelationType: 'Meccan', juz: 30, bundledOffline: true },
  { number: 104, nameArabic: 'الهمزة', nameTranslit: 'Al-Humazah', nameEnglish: 'The Traducer', ayahCount: 9, revelationType: 'Meccan', juz: 30 },
  { number: 105, nameArabic: 'الفيل', nameTranslit: 'Al-Fil', nameEnglish: 'The Elephant', ayahCount: 5, revelationType: 'Meccan', juz: 30 },
  { number: 106, nameArabic: 'قريش', nameTranslit: 'Quraysh', nameEnglish: 'Quraysh', ayahCount: 4, revelationType: 'Meccan', juz: 30 },
  { number: 107, nameArabic: 'الماعون', nameTranslit: "Al-Ma'un", nameEnglish: 'The Small Kindnesses', ayahCount: 7, revelationType: 'Meccan', juz: 30 },
  { number: 108, nameArabic: 'الكوثر', nameTranslit: 'Al-Kawthar', nameEnglish: 'The Abundance', ayahCount: 3, revelationType: 'Meccan', juz: 30, bundledOffline: true },
  { number: 109, nameArabic: 'الكافرون', nameTranslit: 'Al-Kafirun', nameEnglish: 'The Disbelievers', ayahCount: 6, revelationType: 'Meccan', juz: 30 },
  { number: 110, nameArabic: 'النصر', nameTranslit: 'An-Nasr', nameEnglish: 'The Divine Support', ayahCount: 3, revelationType: 'Madani', juz: 30 },
  { number: 111, nameArabic: 'المسد', nameTranslit: 'Al-Masad', nameEnglish: 'The Palm Fiber', ayahCount: 5, revelationType: 'Meccan', juz: 30 },
  { number: 112, nameArabic: 'الإخلاص', nameTranslit: 'Al-Ikhlas', nameEnglish: 'The Sincerity', ayahCount: 4, revelationType: 'Meccan', juz: 30, bundledOffline: true },
  { number: 113, nameArabic: 'الفلق', nameTranslit: 'Al-Falaq', nameEnglish: 'The Daybreak', ayahCount: 5, revelationType: 'Meccan', juz: 30, bundledOffline: true },
  { number: 114, nameArabic: 'الناس', nameTranslit: 'An-Nas', nameEnglish: 'Mankind', ayahCount: 6, revelationType: 'Meccan', juz: 30, bundledOffline: true },
];

export const BUNDLED_SURAH_AYAHS: Record<number, AyahItem[]> = {
  1: [
    {
      numberInSurah: 1,
      globalNumber: 1,
      arabicUthmani: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
      transliteration: 'Bismillahir-Rahmanir-Rahim',
      translations: {
        en: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        hi: 'अल्लाह के नाम से जो अत्यंत कृपालु और दयावान है।',
        hinglish: 'Allah ke naam se jo behad meharban aur raham karne wala hai.',
        ur: 'شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔',
        tr: 'Rahmân ve Rahîm olan Allah’ın adıyla.',
        id: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
      tafsirBrief: 'Opening every noble action seeking the blessing and mercy of Allah.',
    },
    {
      numberInSurah: 2,
      globalNumber: 2,
      arabicUthmani: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
      transliteration: 'Alhamdu lillahi Rabbil-alamin',
      translations: {
        en: '[All] praise is [due] to Allah, Lord of the worlds -',
        hi: 'सब प्रशंसा अल्लाह ही के लिए है जो सारे संसार का पालनहार है।',
        hinglish: 'Sab tareef Allah hi ke liye hai jo saare jahanon ka Rab hai.',
        ur: 'سب تعریف اللہ تعالیٰ کے لیے ہے جو تمام جہانوں کا پالنہار ہے۔',
        tr: 'Hamd, Âlemlerin Rabbi Allah’a mahsustur.',
        id: 'Segala puji bagi Allah, Tuhan seluruh alam,',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3',
      tafsirBrief: 'Complete gratitude and praise belong solely to the Creator and Sustainer of all creation.',
    },
    {
      numberInSurah: 3,
      globalNumber: 3,
      arabicUthmani: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
      transliteration: 'Ar-Rahmanir-Rahim',
      translations: {
        en: 'The Entirely Merciful, the Especially Merciful,',
        hi: 'जो अत्यंत कृपालु और दयावान है।',
        hinglish: 'Jo bada meharban, nihayat raham wala hai.',
        ur: 'بڑا مہربان نہایت رحم کرنے والا۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3',
      tafsirBrief: 'Allah’s Lordship is founded on encompassing mercy rather than harshness.',
    },
    {
      numberInSurah: 4,
      globalNumber: 4,
      arabicUthmani: 'مَـٰلِكِ يَوْمِ ٱلدِّينِ',
      transliteration: 'Maliki yawmid-din',
      translations: {
        en: 'Sovereign of the Day of Recompense.',
        hi: 'बदले के दिन (क़ियामत) का मालिक है।',
        hinglish: 'Badle ke din (Qayamat) ka Maalik hai.',
        ur: 'بدلے کے دن (قیامت) کا مالک ہے۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3',
      tafsirBrief: 'Reminds the believer of accountability and ultimate justice on the Day of Judgment.',
    },
    {
      numberInSurah: 5,
      globalNumber: 5,
      arabicUthmani: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      transliteration: 'Iyyaka na’budu wa iyyaka nasta’in',
      translations: {
        en: 'It is You we worship and You we ask for help.',
        hi: 'हम तेरी ही इबादत करते हैं और तुझ ही से मदद मांगते हैं।',
        hinglish: 'Hum Teri hi ibadat karte hain aur Tujh hi se madad maangte hain.',
        ur: 'ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد چاہتے ہیں۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3',
      tafsirBrief: 'The heart of Tawhid: exclusive devotion to Allah and reliance upon His help.',
    },
    {
      numberInSurah: 6,
      globalNumber: 6,
      arabicUthmani: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
      transliteration: 'Ihdinas-siratal-mustaqim',
      translations: {
        en: 'Guide us to the straight path -',
        hi: 'हमें सीधे रास्ते पर चला।',
        hinglish: 'Humein seedhe raaste (Sirat-al-Mustaqeem) par chala.',
        ur: 'ہمیں سیدھی راہ دکھا۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3',
      tafsirBrief: 'The most essential daily supplication: asking for steadfastness and clear guidance.',
    },
    {
      numberInSurah: 7,
      globalNumber: 7,
      arabicUthmani: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
      transliteration: 'Siratal-ladhina an’amta alayhim ghayril-maghdubi alayhim wa lad-dallin',
      translations: {
        en: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
        hi: 'उन लोगों का रास्ता जिन पर तूने इनाम किया, न कि उनका जिन पर गुस्सा किया गया और न गुमराहों का।',
        hinglish: 'Un logon ka raasta jin par Tune inaam kiya, na ki unka jin par ghazab hua aur na gumrahon ka.',
        ur: 'ان لوگوں کی راہ جن پر تو نے انعام کیا، نہ کہ ان کی جن پر غضب کیا گیا اور نہ گمراہوں کی۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3',
      tafsirBrief: 'Following the footsteps of the Prophets, the truthful, the martyrs, and the righteous.',
    },
  ],
  2: [
    {
      numberInSurah: 1,
      globalNumber: 8,
      arabicUthmani: 'الٓمٓ',
      transliteration: 'Alif, Lam, Meem.',
      translations: {
        en: 'Alif, Lam, Meem.',
        hi: 'अलिफ़॰ लाम॰ मीम॰',
        hinglish: 'Alif, Lam, Meem.',
        ur: 'الف لام میم۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/8.mp3',
      tafsirBrief: 'Disjoined Arabic letters (Huroof Muqatta’at) whose ultimate knowledge belongs to Allah, highlighting the miraculous nature of the Quran.',
    },
    {
      numberInSurah: 2,
      globalNumber: 9,
      arabicUthmani: 'ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
      transliteration: 'Dhalikal-kitabu la rayba fih, hudal-lil-muttaqin',
      translations: {
        en: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah -',
        hi: 'यह वह किताब है जिसमें कोई संदेह नहीं, परहेज़गारों (अल्लाह से डरने वालों) के लिए हिदायत है।',
        hinglish: 'Yeh woh Kitaab hai jismein koi shak nahi, hidayat hai Taqwa rakhne walon ke liye.',
        ur: 'یہ وہ کتاب ہے جس میں کوئی شک نہیں، پرہیزگاروں کے لیے ہدایت ہے۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/9.mp3',
      tafsirBrief: 'True benefit from the Quran opens up to hearts cultivating Taqwa (mindfulness of Allah).',
    },
    {
      numberInSurah: 3,
      globalNumber: 10,
      arabicUthmani: 'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَـٰهُمْ يُنفِقُونَ',
      transliteration: 'Alladhina yu’minuna bil-ghaybi wa yuqimunas-salata wa mimma razaqnahum yunfiqun',
      translations: {
        en: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them,',
        hi: 'जो बिन देखे ईमान लाते हैं और नमाज़ क़ायम करते हैं और जो कुछ हमने उन्हें दिया है उसमें से ख़र्च करते हैं।',
        hinglish: 'Jo ghaib par iman laate hain, Namaz qayam karte hain aur hamare diye hue rizq se kharch karte hain.',
        ur: 'جو غیب پر ایمان لاتے ہیں اور نماز قائم کرتے ہیں اور ہمارے دیے ہوئے رزق سے خرچ کرتے ہیں۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/10.mp3',
      tafsirBrief: 'Unites internal faith (Iman), bodily worship (Salah), and financial generosity (Infaq).',
    },
    {
      numberInSurah: 255,
      globalNumber: 262,
      arabicUthmani: 'ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ',
      transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum, la ta’khudhuhu sinatun wa la nawm...',
      translations: {
        en: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.',
        hi: 'अल्लाह के सिवा कोई माबूद नहीं, वह जीवित है और सबका थामने वाला है। उसे न ऊंघ आती है और न नींद।',
        hinglish: 'Allah — Uske siwa koi Maabood nahi, Woh Hamesha Zinda aur Sabko Qayam rakhne wala hai (Ayat al-Kursi).',
        ur: 'اللہ کے سوا کوئی معبود نہیں، وہ زندہ ہے سب کا تھامنے والا، نہ اسے اونگھ آتی ہے نہ نیند۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3',
      tafsirBrief: 'Ayat al-Kursi: The greatest verse in the Quran affirming Allah’s absolute sovereignty, life, and knowledge.',
    },
    {
      numberInSurah: 286,
      globalNumber: 293,
      arabicUthmani: 'لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ',
      transliteration: 'La yukallifullahu nafsan illa wus’aha, laha ma kasabat wa alayha maktasabat',
      translations: {
        en: 'Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned.',
        hi: 'अल्लाह किसी जान पर उसकी ताक़त से बढ़कर बोझ नहीं डालता।',
        hinglish: 'Allah kisi jaan par uski taaqat se zyada bojh nahi daalta.',
        ur: 'اللہ کسی جان کو اس کی طاقت سے زیادہ تکلیف نہیں دیتا۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/293.mp3',
      tafsirBrief: 'A verse of immense mercy and relief gifted to the Ummah.',
    },
  ],
  103: [
    {
      numberInSurah: 1,
      globalNumber: 6177,
      arabicUthmani: 'وَٱلْعَصْرِ',
      transliteration: 'Wal-asr',
      translations: {
        en: 'By time,',
        hi: 'ज़माने की क़सम,',
        hinglish: 'Zamane (waqt) ki qasam,',
        ur: 'زمانے کی قسم،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6177.mp3',
      tafsirBrief: 'Allah swears by time—the capital of every human being.',
    },
    {
      numberInSurah: 2,
      globalNumber: 6178,
      arabicUthmani: 'إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ',
      transliteration: 'Innal-insana lafi khusr',
      translations: {
        en: 'Indeed, mankind is in loss,',
        hi: 'बेशक इंसान घाटे में है,',
        hinglish: 'Beshak insaan khasaare (nuksaan) mein hai,',
        ur: 'بے شک انسان خسارے میں ہے،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6178.mp3',
      tafsirBrief: 'Without divine guidance, passing time naturally depletes our lifespan.',
    },
    {
      numberInSurah: 3,
      globalNumber: 6179,
      arabicUthmani: 'إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ',
      transliteration: 'Illal-ladhina amanu wa amilus-salihati wa tawasaw bil-haqqi wa tawasaw bis-sabr',
      translations: {
        en: 'Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.',
        hi: 'सिवाय उन लोगों के जो ईमान लाए और नेक अमल किए और एक-दूसरे को हक़ की नसीहत की और सब्र की त تلقीन की।',
        hinglish: 'Siwaye un logon ke jo Iman laaye, nek aamal kiye, aur ek doosre ko Haq aur Sabr ki nasihat ki.',
        ur: 'سوائے ان لوگوں کے جو ایمان لائے اور نیک عمل کیے اور ایک دوسرے کو حق اور صبر کی نصیحت کی۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6179.mp3',
      tafsirBrief: 'Four pillars of salvation: Faith, Righteous Action, Mutual Truth, and Mutual Patience.',
    },
  ],
  108: [
    {
      numberInSurah: 1,
      globalNumber: 6205,
      arabicUthmani: 'إِنَّآ أَعْطَيْنَـٰكَ ٱلْكَوْثَرَ',
      transliteration: "Inna a'taynaka al-kawthar",
      translations: {
        en: 'Indeed, We have granted you, [O Muhammad], al-Kawthar.',
        hi: 'बेशक हमने आपको कौसर (ढेरों भलाई) अता की है।',
        hinglish: 'Beshak humne aapko Al-Kawthar (be-hisab khair) ata farmaya hai.',
        ur: 'بے شک ہم نے آپ کو کوثر عطا فرمایا۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6205.mp3',
      tafsirBrief: 'Al-Kawthar includes abundant good in both worlds and the River in Paradise.',
    },
    {
      numberInSurah: 2,
      globalNumber: 6206,
      arabicUthmani: 'فَصَلِّ لِرَبِّكَ وَٱنْحَرْ',
      transliteration: 'Fasalli li-rabbika wanhar',
      translations: {
        en: 'So pray to your Lord and sacrifice [to Him alone].',
        hi: 'तो अपने रब के लिए नमाज़ पढ़िए और क़ुर्बानी कीजिए।',
        hinglish: 'Pas apne Rab ke liye namaz padhiye aur qurbani kijiye.',
        ur: 'پس اپنے رب کے لیے نماز پڑھیے اور قربانی کیجیے۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6206.mp3',
      tafsirBrief: 'Gratitude is expressed through sincere prayer and sacrifice solely for Allah.',
    },
    {
      numberInSurah: 3,
      globalNumber: 6207,
      arabicUthmani: 'إِنَّ شَانِئَكَ هُوَ ٱلْأَبْتَرُ',
      transliteration: 'Inna shani’aka huwal-abtar',
      translations: {
        en: 'Indeed, your enemy is the one cut off.',
        hi: 'बेशक आपका दुश्मन ही जड़-कटा (बे-निशान) है।',
        hinglish: 'Beshak aapka dushman hi be-naam-o-nishan rahega.',
        ur: 'بے شک آپ کا دشمن ہی بے نام و نشان ہے۔',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6207.mp3',
      tafsirBrief: 'The legacy of the Prophet ﷺ endures forever across the globe.',
    },
  ],
  112: [
    {
      numberInSurah: 1,
      globalNumber: 6222,
      arabicUthmani: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
      transliteration: 'Qul huwallahu ahad',
      translations: {
        en: 'Say, "He is Allah, [who is] One,',
        hi: 'कह दीजिए, "वह अल्लाह एक है,',
        hinglish: 'Kaho: Woh Allah Ek (Ahad) hai,',
        ur: 'کہو وہ اللہ ایک ہے،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3',
      tafsirBrief: 'Pure Tawhid: Allah is uniquely One in His Essence, Names, and Attributes.',
    },
    {
      numberInSurah: 2,
      globalNumber: 6223,
      arabicUthmani: 'ٱللَّهُ ٱلصَّمَدُ',
      transliteration: 'Allahus-samad',
      translations: {
        en: 'Allah, the Eternal Refuge.',
        hi: 'अल्लाह बेनियाज़ है (सब उसके मुहताज हैं)।',
        hinglish: 'Allah As-Samad hai (sab Uske mohtaj hain, Woh kisi ka mohtaj nahi).',
        ur: 'اللہ بے نیاز ہے،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6223.mp3',
      tafsirBrief: 'As-Samad: The Master upon Whom all creation depends while He needs none.',
    },
    {
      numberInSurah: 3,
      globalNumber: 6224,
      arabicUthmani: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
      transliteration: 'Lam yalid wa lam yulad',
      translations: {
        en: 'He neither begets nor is born,',
        hi: 'न उसकी कोई औलाद है और न वह किसी से पैदा हुआ,',
        hinglish: 'Na uski koi aulad hai aur na woh kisi se paida hua,',
        ur: 'نہ اس کی کوئی اولاد ہے اور نہ وہ کسی سے پیدا ہوا،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6224.mp3',
      tafsirBrief: 'Allah transcends all human limitations of lineage, beginning, or succession.',
    },
    {
      numberInSurah: 4,
      globalNumber: 6225,
      arabicUthmani: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ',
      transliteration: 'Wa lam yakul-lahu kufuwan ahad',
      translations: {
        en: 'Nor is there to Him any equivalent."',
        hi: 'और न कोई उसके बराबर का है।"',
        hinglish: 'Aur na koi Uske barabar (humsar) hai."',
        ur: 'اور نہ کوئی اس کا ہمسر ہے۔"',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3',
      tafsirBrief: 'Surah Al-Ikhlas equals one-third of the Quran in meaning (Sahih al-Bukhari 5013).',
    },
  ],
  113: [
    {
      numberInSurah: 1,
      globalNumber: 6226,
      arabicUthmani: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ',
      transliteration: 'Qul a’udhu bi-rabbil-falaq',
      translations: {
        en: 'Say, "I seek refuge in the Lord of daybreak',
        hi: 'कह दीजिए, "मैं सुबह के रब की पनाह मांगता हूँ,',
        hinglish: 'Kaho: Main subah ke Rab ki panah maangta hoon,',
        ur: 'کہو میں صبح کے رب کی پناہ مانگتا ہوں،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3',
      tafsirBrief: 'Seeking protection in the One who splits the darkness of night with morning light.',
    },
    {
      numberInSurah: 2,
      globalNumber: 6227,
      arabicUthmani: 'مِن شَرِّ مَا خَلَقَ',
      transliteration: 'Min sharri ma khalaq',
      translations: {
        en: 'From the evil of that which He created',
        hi: 'हर उस चीज़ की बुराई से जो उसने पैदा की,',
        hinglish: 'Har us cheez ke shar se jo Usne paida ki,',
        ur: 'ہر اس چیز کے شر سے جو اس نے پیدا کی،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6227.mp3',
      tafsirBrief: 'Comprehensive protection from all physical and spiritual harm.',
    },
    {
      numberInSurah: 3,
      globalNumber: 6228,
      arabicUthmani: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
      transliteration: 'Wa min sharri ghasiqin idha waqab',
      translations: {
        en: 'And from the evil of darkness when it settles',
        hi: 'और अंधेरी रात की बुराई से जब वह छा जाए,',
        hinglish: 'Aur andheri raat ke shar se jab woh chha jaye,',
        ur: 'اور اندھیری رات کے شر سے جب وہ چھا جائے،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6228.mp3',
      tafsirBrief: 'Protection during the stillness and hidden dangers of night.',
    },
    {
      numberInSurah: 4,
      globalNumber: 6229,
      arabicUthmani: 'وَمِن شَرِّ ٱلنَّفَّـٰثَـٰتِ فِى ٱلْعُقَدِ',
      transliteration: 'Wa min sharrin-naffathati fil-uqad',
      translations: {
        en: 'And from the evil of the blowers in knots',
        hi: 'और गिरहों में फूंकने वालियों के शर से,',
        hinglish: 'Aur girhon mein phoonkne walon ke shar se,',
        ur: 'اور گرہوں میں پھونکنے والیوں کے شر سے،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6229.mp3',
      tafsirBrief: 'Seeking Allah’s shield against magic, malice, and discord.',
    },
    {
      numberInSurah: 5,
      globalNumber: 6230,
      arabicUthmani: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
      transliteration: 'Wa min sharri hasidin idha hasad',
      translations: {
        en: 'And from the evil of an envier when he envies."',
        hi: 'और हसद (जलन) करने वाले की बुराई से जब वह हसद करे।"',
        hinglish: 'Aur hasad karne wale ke shar se jab woh hasad kare."',
        ur: 'اور حسد کرنے والے کے شر سے جب وہ حسد کرے۔"',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6230.mp3',
      tafsirBrief: 'Protection from envy and the evil eye through remembrance of Allah.',
    },
  ],
  114: [
    {
      numberInSurah: 1,
      globalNumber: 6231,
      arabicUthmani: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ',
      transliteration: 'Qul a’udhu bi-rabbin-nas',
      translations: {
        en: 'Say, "I seek refuge in the Lord of mankind,',
        hi: 'कह दीजिए, "मैं इंसानों के रब की पनाह मांगता हूँ,',
        hinglish: 'Kaho: Main insaanon ke Rab ki panah maangta hoon,',
        ur: 'کہو میں انسانوں کے رب کی پناہ مانگتا ہوں،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3',
      tafsirBrief: 'Seeking refuge in Allah’s nurturing Lordship (Rububiyyah) over humanity.',
    },
    {
      numberInSurah: 2,
      globalNumber: 6232,
      arabicUthmani: 'مَلِكِ ٱلنَّاسِ',
      transliteration: 'Malikin-nas',
      translations: {
        en: 'The Sovereign of mankind,',
        hi: 'इंसानों के बादशाह की,',
        hinglish: 'Insaanon ke Badshah (Maalik) ki,',
        ur: 'انسانوں کے بادشاہ کی،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6232.mp3',
      tafsirBrief: 'Affirming Allah as the true King and Ruler over all people.',
    },
    {
      numberInSurah: 3,
      globalNumber: 6233,
      arabicUthmani: 'إِلَـٰهِ ٱلنَّاسِ',
      transliteration: 'Ilahin-nas',
      translations: {
        en: 'The God of mankind,',
        hi: 'इंसानों के माबूद की,',
        hinglish: 'Insaanon ke Maabood (Ilah) ki,',
        ur: 'انسانوں کے معبود کی،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6233.mp3',
      tafsirBrief: 'Only Allah deserves worship and devotion.',
    },
    {
      numberInSurah: 4,
      globalNumber: 6234,
      arabicUthmani: 'مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ',
      transliteration: 'Min sharril-waswasil-khannas',
      translations: {
        en: 'From the evil of the retreating whisperer -',
        hi: 'वसवसा डालने वाले पीछे हट जाने वाले की बुराई से,',
        hinglish: 'Waswasa daalne wale (Shaitan) ke shar se jo Allah ke zikr par peeche hat jata hai,',
        ur: 'وسوسہ ڈالنے والے پیچھے ہٹ جانے والے کے شر سے،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6234.mp3',
      tafsirBrief: 'The whisperer retreats whenever the servant remembers Allah.',
    },
    {
      numberInSurah: 5,
      globalNumber: 6235,
      arabicUthmani: 'ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ',
      transliteration: 'Alladhi yuwaswisu fi sudurin-nas',
      translations: {
        en: 'Who whispers [evil] into the breasts of mankind -',
        hi: 'जो लोगों के सीनों में वसवसा डालता है,',
        hinglish: 'Jo logon ke seenon (dilon) mein waswasa daalta hai,',
        ur: 'جو لوگوں کے سینوں میں وسوسہ ڈالتا ہے،',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6235.mp3',
      tafsirBrief: 'Guarding the heart from doubts and negative inclinations.',
    },
    {
      numberInSurah: 6,
      globalNumber: 6236,
      arabicUthmani: 'مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ',
      transliteration: 'Minal-jinnati wan-nas',
      translations: {
        en: 'From among the jinn and mankind."',
        hi: 'चाहे वह जिन्नात में से हो या इंसानों में से।"',
        hinglish: 'Chahe woh Jinnat mein se ho ya Insaanon mein se."',
        ur: 'جنات میں سے ہو یا انسانوں میں سے۔"',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6236.mp3',
      tafsirBrief: 'Seals the Quran with protection from both unseen and visible bad influences.',
    },
  ],
};

const CACHE_PREFIX = 'ilmizo_surah_cache_v1_';

export interface VerifiedReciterConfig {
  id: string;
  label: string;
  editionId: 'ar.alafasy' | 'ar.abdulbasitmurattal' | 'ar.abdurrahmaansudais' | 'ar.husary';
  cdnBitrate: 128 | 192;
  verified: boolean;
}

export const VERIFIED_RECITER_EDITIONS: VerifiedReciterConfig[] = [
  {
    id: 'Mishary Rashid Alafasy',
    label: 'Mishary Rashid Alafasy',
    editionId: 'ar.alafasy',
    cdnBitrate: 128,
    verified: true,
  },
  {
    id: 'Abdul Basit Abdus Samad',
    label: 'Abdul Basit Abdus Samad',
    editionId: 'ar.abdulbasitmurattal',
    cdnBitrate: 192,
    verified: true,
  },
  {
    id: 'Abdur-Rahman as-Sudais',
    label: 'Abdur-Rahman as-Sudais',
    editionId: 'ar.abdurrahmaansudais',
    cdnBitrate: 192,
    verified: true,
  },
  {
    id: 'Mahmoud Khalil Al-Husary',
    label: 'Mahmoud Khalil Al-Husary',
    editionId: 'ar.husary',
    cdnBitrate: 128,
    verified: true,
  },
];

export function resolveReciterConfig(reciterName?: string): VerifiedReciterConfig {
  if (!reciterName) return VERIFIED_RECITER_EDITIONS[0];
  const normalized = reciterName.trim().toLowerCase();
  const match = VERIFIED_RECITER_EDITIONS.find(
    (r) =>
      r.id.toLowerCase() === normalized ||
      r.editionId.toLowerCase() === normalized ||
      (normalized.includes('abdul basit') && r.editionId === 'ar.abdulbasitmurattal') ||
      (normalized.includes('sudais') && r.editionId === 'ar.abdurrahmaansudais') ||
      (normalized.includes('husary') && r.editionId === 'ar.husary') ||
      (normalized.includes('alafasy') && r.editionId === 'ar.alafasy')
  );
  if (match) return match;
  return {
    ...VERIFIED_RECITER_EDITIONS[0],
    verified: false,
  };
}

export function resolveAyahAudioUrl(ayah: Pick<AyahItem, 'globalNumber' | 'audioUrl'>, reciterName?: string): string | undefined {
  const reciter = resolveReciterConfig(reciterName);
  if (ayah.globalNumber && ayah.globalNumber > 0) {
    return `https://cdn.islamic.network/quran/audio/${reciter.cdnBitrate}/${reciter.editionId}/${ayah.globalNumber}.mp3`;
  }
  return ayah.audioUrl;
}

export function getSurahOfflineAvailability(
  surahNumber: number,
  downloadedSurahNumbers: number[] = [],
  cachedSurahNumbers: number[] = []
): OfflineSurahAvailability {
  if (downloadedSurahNumbers.includes(surahNumber)) {
    return 'downloaded';
  }
  const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
  const bundled = BUNDLED_SURAH_AYAHS[surahNumber];
  if (bundled && meta) {
    if (bundled.length >= meta.ayahCount) {
      return 'bundled_full';
    }
    if (cachedSurahNumbers.includes(surahNumber)) {
      return 'cached';
    }
    return 'bundled_partial';
  }
  if (cachedSurahNumbers.includes(surahNumber)) {
    return 'cached';
  }
  return 'online_only';
}

export interface BundledQuranEditionFile {
  edition: string;
  totalSurahs: number;
  totalAyahs: number;
  surahs: Record<string, string[]>;
}

export type BundledEditionKey = 'uthmani' | 'en' | 'hi' | 'ur';

const bundledEditionMemo = new Map<BundledEditionKey, Promise<BundledQuranEditionFile | null>>();

export function getGlobalAyahOffsetForSurah(surahNumber: number): number {
  let offset = 0;
  for (const s of ALL_114_SURAHS) {
    if (s.number >= surahNumber) break;
    offset += s.ayahCount;
  }
  return offset;
}

export async function loadBundledQuranEdition(
  key: BundledEditionKey,
  customLoader?: (k: BundledEditionKey) => Promise<BundledQuranEditionFile | null>
): Promise<BundledQuranEditionFile | null> {
  if (customLoader) {
    return customLoader(key);
  }
  if (typeof window === 'undefined' || typeof fetch !== 'function') {
    return null;
  }
  const existing = bundledEditionMemo.get(key);
  if (existing) return existing;

  const promise = (async () => {
    try {
      const resp = await fetch(`/data/quran-${key}.json`);
      if (!resp.ok) return null;
      const json = (await resp.json()) as BundledQuranEditionFile;
      if (!json || json.totalSurahs !== 114 || json.totalAyahs !== 6236 || !json.surahs) {
        return null;
      }
      return json;
    } catch {
      return null;
    }
  })();

  bundledEditionMemo.set(key, promise);
  const res = await promise;
  if (!res) {
    bundledEditionMemo.delete(key);
  }
  return res;
}

export async function loadBundledFullSurahFromAssets(
  surahNumber: number,
  lang: LanguageCode,
  reciterName?: string,
  customLoader?: (k: BundledEditionKey) => Promise<BundledQuranEditionFile | null>
): Promise<SurahPayload | null> {
  const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
  if (!meta) return null;

  const targetEditionKey: BundledEditionKey | null =
    lang === 'hi' ? 'hi' : lang === 'ur' ? 'ur' : null;

  const [uthmaniFile, enFile, localizedFile] = await Promise.all([
    loadBundledQuranEdition('uthmani', customLoader),
    loadBundledQuranEdition('en', customLoader),
    targetEditionKey ? loadBundledQuranEdition(targetEditionKey, customLoader) : Promise.resolve(null),
  ]);

  if (!uthmaniFile || !enFile) return null;

  const sKey = String(surahNumber);
  const arList = uthmaniFile.surahs[sKey];
  const enList = enFile.surahs[sKey];
  const locList = localizedFile?.surahs[sKey];

  if (
    !Array.isArray(arList) ||
    arList.length !== meta.ayahCount ||
    !Array.isArray(enList) ||
    enList.length !== meta.ayahCount
  ) {
    return null;
  }

  const reciter = resolveReciterConfig(reciterName);
  const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];
  const globalOffset = getGlobalAyahOffsetForSurah(surahNumber);

  const ayahs: AyahItem[] = arList.map((arabicUthmani, idx) => {
    const globalNumber = globalOffset + idx + 1;
    const enText = enList[idx] || '';
    const locText = locList && locList[idx] ? locList[idx] : enText;
    return {
      numberInSurah: idx + 1,
      globalNumber,
      arabicUthmani,
      transliteration: `Surah ${meta.nameTranslit} ${meta.number}:${idx + 1}`,
      translations: {
        en: enText,
        [lang]: locText,
      },
      audioUrl: resolveAyahAudioUrl({ globalNumber }, reciter.id),
      juzNumber: meta.juz,
      tafsirBrief: `Verified Tanzil / King Fahd Uthmani Bundled Edition — Surah ${meta.nameTranslit} (${meta.number}:${idx + 1}).`,
    };
  });

  const payload: SurahPayload = {
    meta,
    ayahs,
    offlineUnavailable: false,
    isPartialOfflineBundle: false,
    offlineSourceType: 'bundled_full',
    verification: {
      source: 'Tanzil / King Fahd Complex Bundled Full 114-Surah Offline Package',
      edition: `quran-uthmani + en.sahih${targetEditionKey ? ` + ${localizedFile?.edition}` : ''} (${reciter.editionId})`,
      reference: `Surah ${meta.number} (${meta.nameTranslit}), ${meta.ayahCount} Ayahs`,
      language: langConfig.label,
      version: '2.0.0',
      reviewer: 'Ilmizo Sharia & Text Verification Registry',
      status: 'Verified',
    },
  };

  const validation = validateSurahPayload(payload, meta, false);
  return validation.valid ? payload : null;
}

export async function getSurahPayload(
  surahNumber: number,
  lang: LanguageCode,
  reciterName?: string,
  options?: { markExplicitDownload?: boolean; forceNetworkFetch?: boolean }
): Promise<SurahPayload> {
  const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber) || ALL_114_SURAHS[0];
  const reciter = resolveReciterConfig(reciterName);
  const isExplicitDownload = Boolean(options?.markExplicitDownload);

  // 1. Check Local-First Database (IndexedDB + migrated cache) first unless forceNetworkFetch is requested
  if (!options?.forceNetworkFetch) {
    try {
      const stored = await getOfflineSurahFromDb(surahNumber, lang);
      if (stored && stored.payload) {
        const parsed = stored.payload;
        const validation = validateSurahPayload(
          parsed,
          meta,
          Boolean(parsed?.isPartialOfflineBundle)
        );
        if (validation.valid) {
          if (isExplicitDownload && !stored.isExplicitDownload) {
            await saveOfflineSurahToDb(surahNumber, lang, parsed, true);
          }
          return {
            ...parsed,
            offlineUnavailable: false,
            offlineSourceType:
              stored.isExplicitDownload || isExplicitDownload ? 'downloaded_idb' : 'cached_idb',
            ayahs: parsed.ayahs.map((a) => ({
              ...a,
              audioUrl: resolveAyahAudioUrl(a, reciter.id),
            })),
          };
        }
      }
    } catch {
      // ignore storage read error
    }
  }

  // 2. Try live verified AlQuran Cloud API if online
  const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];
  if (typeof navigator !== 'undefined' && navigator.onLine) {
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.transliteration,en.sahih,${langConfig.alquranEdition},${reciter.editionId}`
      );
      if (response.ok) {
        const json = await response.json();
        if (json?.data && Array.isArray(json.data) && json.data.length >= 4) {
          const uthmaniEdition = json.data[0];
          const uthmaniData = uthmaniEdition?.ayahs;
          const translitData = json.data[1]?.ayahs || [];
          const enData = json.data[2]?.ayahs || [];
          const targetLangData = json.data[3]?.ayahs || [];
          const audioData = json.data[4]?.ayahs || [];

          // Validate Surah number and Arabic + translation Ayah counts before constructing payload
          if (
            Array.isArray(uthmaniData) &&
            uthmaniData.length === meta.ayahCount &&
            Array.isArray(enData) &&
            enData.length === meta.ayahCount &&
            Array.isArray(targetLangData) &&
            targetLangData.length === meta.ayahCount &&
            (uthmaniEdition.number === undefined || uthmaniEdition.number === meta.number)
          ) {
            const ayahs: AyahItem[] = uthmaniData.map((a: any, idx: number) => ({
              numberInSurah: a.numberInSurah,
              globalNumber: a.number,
              arabicUthmani: a.text,
              transliteration: translitData[idx]?.text || '',
              translations: {
                en: enData[idx]?.text || '',
                [lang]: targetLangData[idx]?.text || enData[idx]?.text || '',
              },
              audioUrl:
                audioData[idx]?.audio ||
                resolveAyahAudioUrl({ globalNumber: a.number }, reciter.id),
              mushafPage: typeof a.page === 'number' && a.page > 0 ? a.page : undefined,
              juzNumber: typeof a.juz === 'number' && a.juz > 0 ? a.juz : meta.juz,
              tafsirBrief: `Verified Uthmani script — Surah ${meta.nameTranslit} (${meta.number}:${a.numberInSurah}), Juz ${a.juz || meta.juz}${
                typeof a.page === 'number' ? `, Madinah Mushaf Page ${a.page}` : ''
              }.`,
            }));

            const payload: SurahPayload = {
              meta,
              ayahs,
              offlineUnavailable: false,
              isPartialOfflineBundle: false,
              offlineSourceType: isExplicitDownload ? 'downloaded_idb' : 'live_api',
              verification: {
                source: 'Tanzil / King Fahd Glorious Quran Printing Complex via AlQuran Cloud',
                edition: `quran-uthmani + ${langConfig.alquranEdition} (${reciter.editionId})`,
                reference: `Surah ${meta.number} (${meta.nameTranslit}), ${meta.ayahCount} Ayahs`,
                language: langConfig.label,
                version: '1.1.0',
                reviewer: 'Ilmizo Sharia & Text Verification Registry',
                status: 'Verified',
              },
            };

            const validation = validateSurahPayload(payload, meta, false);
            if (validation.valid) {
              await saveOfflineSurahToDb(surahNumber, lang, payload, isExplicitDownload);
              return payload;
            }
          }
        }
      }
    } catch {
      // network error, fall back to bundled offline if available for this exact Surah
    }
  }

  // 3a. Hand-curated full bundled offline Surahs (includes Hinglish & Tafsir notes)
  const bundled = BUNDLED_SURAH_AYAHS[surahNumber];
  if (bundled && bundled.length >= meta.ayahCount) {
    const bundledPayload: SurahPayload = {
      meta,
      ayahs: bundled.map((a) => ({
        ...a,
        juzNumber: a.juzNumber || meta.juz,
        audioUrl: resolveAyahAudioUrl(a, reciter.id),
      })),
      offlineUnavailable: false,
      isPartialOfflineBundle: false,
      offlineSourceType: 'bundled_full',
      verification: {
        source: 'King Fahd Complex Uthmani Script & Sahih International (Bundled Offline Package)',
        edition: `Offline Verified Edition v1 (${reciter.editionId})`,
        reference: `Surah ${meta.number} (${meta.nameTranslit})`,
        language: langConfig.label,
        version: '1.0.0',
        reviewer: 'Ilmizo Sharia & Text Verification Registry',
        status: 'Verified',
      },
    };
    if (isExplicitDownload) {
      await saveOfflineSurahToDb(surahNumber, lang, bundledPayload, true);
    }
    return bundledPayload;
  }

  // 3b. Complete 114-Surah / 6,236-Ayah PWA precached static bundle (/data/quran-*.json)
  if (typeof window !== 'undefined') {
    const fullAssetPayload = await loadBundledFullSurahFromAssets(
      surahNumber,
      lang,
      reciter.id
    );
    if (fullAssetPayload) {
      if (isExplicitDownload) {
        await saveOfflineSurahToDb(surahNumber, lang, fullAssetPayload, true);
      }
      return fullAssetPayload;
    }
  }

  // 3c. Partial bundled fallback if full static assets are unavailable
  if (bundled && bundled.length > 0) {
    const isPartialOfflineBundle = bundled.length < meta.ayahCount;
    const bundledPayload: SurahPayload = {
      meta,
      ayahs: bundled.map((a) => ({
        ...a,
        juzNumber: a.juzNumber || meta.juz,
        audioUrl: resolveAyahAudioUrl(a, reciter.id),
      })),
      offlineUnavailable: false,
      isPartialOfflineBundle,
      offlineSourceType: isPartialOfflineBundle ? 'bundled_partial' : 'bundled_full',
      verification: {
        source: 'King Fahd Complex Uthmani Script & Sahih International (Bundled Offline Package)',
        edition: `Offline Verified Edition v1 (${reciter.editionId})${
          isPartialOfflineBundle ? ` — Selected Key Ayahs (${bundled.length}/${meta.ayahCount})` : ''
        }`,
        reference: `Surah ${meta.number} (${meta.nameTranslit})`,
        language: langConfig.label,
        version: '1.0.0',
        reviewer: 'Ilmizo Sharia & Text Verification Registry',
        status: 'Verified',
      },
    };
    if (isExplicitDownload && !isPartialOfflineBundle) {
      await saveOfflineSurahToDb(surahNumber, lang, bundledPayload, true);
    }
    return bundledPayload;
  }

  // 4. Explicit offline-unavailable state when neither IndexedDB, network, nor static assets are reachable
  return {
    meta,
    ayahs: [],
    offlineUnavailable: true,
    offlineSourceType: 'unavailable',
    verification: {
      source: 'Offline Cache Unavailable — Connect to Internet Once to Download',
      edition: 'Pending Online Sync',
      reference: `Surah ${meta.number} (${meta.nameTranslit} — ${meta.nameEnglish})`,
      language: langConfig.label,
      version: '1.0.0',
      reviewer: 'Ilmizo Sharia & Text Verification Registry',
      status: 'Under Review',
    },
  };
}

export async function downloadSurahForOfflineUse(
  surahNumber: number,
  lang: LanguageCode,
  reciterName?: string
): Promise<{ ok: boolean; payload: SurahPayload; error?: string }> {
  const payload = await getSurahPayload(surahNumber, lang, reciterName, {
    markExplicitDownload: true,
    forceNetworkFetch: typeof navigator !== 'undefined' && navigator.onLine,
  });

  if (payload.offlineUnavailable || payload.ayahs.length === 0) {
    return {
      ok: false,
      payload,
      error: `Cannot download Surah ${payload.meta.nameTranslit} while offline. Connect to the internet once to save it to IndexedDB.`,
    };
  }

  const writeRes = await saveOfflineSurahToDb(surahNumber, lang, payload, true);
  if (!writeRes.ok) {
    return {
      ok: false,
      payload,
      error: writeRes.error || 'Failed to save Surah to IndexedDB.',
    };
  }

  return {
    ok: true,
    payload: {
      ...payload,
      offlineSourceType: 'downloaded_idb',
    },
  };
}

export async function removeDownloadedOfflineSurah(
  surahNumber: number,
  lang?: LanguageCode
): Promise<void> {
  await deleteOfflineSurahFromDb(surahNumber, lang);
}

