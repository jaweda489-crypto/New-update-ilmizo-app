import {
  LanguageCode,
  MadhhabCode,
  PrayerName,
  PrayerStatus,
  SalahDayRecord,
} from '../types/ilmizo';

export interface SalahRecitationItem {
  id: string;
  stepOrder: number;
  title: string;
  localizedTitles: Partial<Record<LanguageCode, string>> & { en: string };
  stage:
    | 'opening'
    | 'qiyam'
    | 'ruku'
    | 'qawmah'
    | 'sujood'
    | 'jalsa'
    | 'tashahhud'
    | 'durood'
    | 'dua_masura'
    | 'qunoot'
    | 'salam';
  arabic: string;
  transliteration: string;
  translations: Partial<Record<LanguageCode, string>> & { en: string };
  whenRecited: string;
  localizedWhenRecited: Partial<Record<LanguageCode, string>> & { en: string };
  madhhabNotes: Record<MadhhabCode, string>;
  sourceReference: string;
}

export interface PrayerRakahGuide {
  id: 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha' | 'Witr';
  name: string;
  localizedNames: Partial<Record<LanguageCode, string>> & { en: string };
  timeWindowDesc: string;
  fardRakahs: number;
  sunnahMuakkadahBefore: number;
  sunnahMuakkadahAfter: number;
  recitationAudibility: 'Audible (Jahri) in Fard' | 'Silent (Sirri) in Fard' | 'First 2 Audible, Remaining Silent';
  stepByStepSummary: string[];
  localizedStepByStep?: Partial<Record<LanguageCode, string[]>>;
  commonBeginnerMistakes: string[];
  madhhabSpecifics: Record<MadhhabCode, string>;
  sourceReference: string;
}

export const COMPLETE_SALAH_RECITATIONS: SalahRecitationItem[] = [
  {
    id: 'rec_thana',
    stepOrder: 1,
    title: 'Opening Supplication (Thana / Istiftah)',
    localizedTitles: {
      en: 'Opening Supplication (Thana / Istiftah)',
      hi: 'सना (नमाज़ की शुरुआती दुआ)',
      ur: 'ثناء (نماز کی ابتدائی دعا)',
      hinglish: 'Thana (Namaz ki shuruati dua)',
      ar: 'دعاء الاستفتاح (الثناء)',
    },
    stage: 'opening',
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
    transliteration: 'Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta‘ala jadduka, wa la ilaha ghayruk.',
    translations: {
      en: 'Glory be to You, O Allah, and praise be to You; blessed is Your Name, exalted is Your Majesty, and there is no deity worthy of worship besides You.',
      hi: 'ऐ अल्लाह! तू पाक है अपनी तमाम तारीफ़ों के साथ, तेरा नाम बरकत वाला है, तेरी शान बुलंद है, और तेरे सिवा कोई माबूद नहीं।',
      ur: 'اے اللہ! تو اپنی حمد کے ساتھ پاک ہے، تیرا نام بابرکت ہے، تیری شان بلند ہے، اور تیرے سوا کوئی معبود نہیں۔',
      hinglish: 'Ai Allah! Tu apni tareef ke saath paak hai, Tera naam barkat wala hai, Teri shaan buland hai, aur Tere siwa koi mabood nahi.',
      ar: 'تنزيهٌ لله تعالى وثناءٌ عليه بصفاته العلى في مطلع الصلاة.',
    },
    whenRecited: 'Recited silently in the 1st Rak’ah immediately after Takbiratul Ihram (Allahu Akbar).',
    localizedWhenRecited: {
      en: 'Recited silently in the 1st Rak’ah immediately after Takbiratul Ihram (Allahu Akbar).',
      hi: 'पहली रकात में तकबीर-ए-तहरीमा (अल्लाहु अकबर) के तुरंत बाद आहिस्ता पढ़ी जाती है।',
      ur: 'پہلی رکعت میں تکبیر تحریمہ کے فوراً بعد آہستہ پڑھی جاتی ہے۔',
      hinglish: 'Pehli rakat mein Takbir-e-Tahrima ke turant baad aahista padhi jaati hai.',
      ar: 'يُقرأ سرّاً في الركعة الأولى بعد تكبيرة الإحرام.',
    },
    madhhabNotes: {
      Hanafi: 'Sunnah Mu’akkadah to recite Subhanaka Allahumma silently before Ta’awwudh.',
      Shafii: 'Recommended (Sunnah) after Takbir; Wajjahtu wajhiya or Subhanaka Allahumma are both authentic options.',
      Maliki: 'In the Maliki school, one proceeds directly to Al-Fatiha in obligatory prayers (opening Istiftah is optional in Nafl).',
      Hanbali: 'Sunnah to recite Subhanaka Allahumma after Takbiratul Ihram.',
    },
    sourceReference: 'Sunan Abi Dawud 775, Jami` at-Tirmidhi 243',
  },
  {
    id: 'rec_fatiha',
    stepOrder: 2,
    title: 'Surah Al-Fatiha (The Opening)',
    localizedTitles: {
      en: 'Surah Al-Fatiha (The Opening)',
      hi: 'सूरह अल-फ़ातिहा',
      ur: 'سورۃ الفاتحہ',
      hinglish: 'Surah Al-Fatiha',
      ar: 'سورة الفاتحة',
    },
    stage: 'qiyam',
    arabic:
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration:
      'Bismillahir-Rahmanir-Rahim. Alhamdu lillahi Rabbil-‘alamin. Ar-Rahmanir-Rahim. Maliki yawmid-din. Iyyaka na‘budu wa iyyaka nasta‘in. Ihdinas-Siratal-Mustaqim. Siratal-ladhina an‘amta ‘alayhim ghayril-maghdubi ‘alayhim wa lad-dallin. (Amin)',
    translations: {
      en: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is [due] to Allah, Lord of the worlds — The Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path — The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
      hi: 'अल्लाह के नाम से जो बड़ा मेहरबान, निहायत रहम वाला है। सब तारीफ़ अल्लाह के लिए है जो सारे जहानों का रब है। बड़ा मेहरबान, निहायत रहम वाला। बदले के दिन का मालिक। हम तेरी ही इबादत करते हैं और तुझी से मदद माँगते हैं। हमें सीधे रास्ते पर चला। उन लोगों के रास्ते पर जिन पर तूने इनाम किया।',
      ur: 'اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ سب تعریف اللہ کے لیے ہے جو تمام جہانوں کا رب ہے۔ بڑا مہربان نہایت رحم والا۔ روزِ جزا کا مالک۔ ہم تیری ہی عبادت کرتے ہیں اور تجھی سے مدد مانگتے ہیں۔ ہمیں سیدھا راستہ دکھا۔ ان لوگوں کا راستہ جن پر تو نے انعام فرمایا۔',
      hinglish: 'Allah ke naam se jo bada Meharban, nihayat Raham wala hai. Sab tareef Allah ke liye hai jo saare jahano ka Rab hai. Bada Meharban, nihayat Raham wala. Badle ke din ka Maalik. Hum Teri hi ibadat karte hain aur Tujhi se madad maangte hain. Humein seedha raasta dikha.',
      ar: 'أمّ القرآن والسبع المثاني التي تُقرأ في كل ركعة من الصلاة.',
    },
    whenRecited: 'Recited while standing (Qiyam) in every Rak’ah of prayer, followed by an additional Surah or verses in the first two Rak’ahs.',
    localizedWhenRecited: {
      en: 'Recited while standing (Qiyam) in every Rak’ah of prayer.',
      hi: 'नमाज़ की हर रकात में क़ियाम (खड़े होने की हालत) में पढ़ी जाती है।',
      ur: 'نماز کی ہر رکعت میں قیام کی حالت میں پڑھی جاتی ہے۔',
      hinglish: 'Namaz ki har rakat mein Qiyam (khade hone ki haalat) mein padhi jaati hai.',
      ar: 'تُقرأ في القيام في كل ركعة من ركعات الصلاة.',
    },
    madhhabNotes: {
      Hanafi: 'Wajib in prayer; Bismillah is recited silently before Al-Fatiha, and Amin is said silently.',
      Shafii: 'Pillar (Rukn) in every Rak’ah for both Imam and follower; Bismillah is counted as a verse of Al-Fatiha and Amin is said audibly in audible prayers.',
      Maliki: 'Pillar (Rukn) for the individual and Imam; behind an Imam in audible prayers, the follower listens attentively.',
      Hanbali: 'Pillar (Rukn) of prayer; Bismillah is recited silently and Amin is said audibly in audible prayers.',
    },
    sourceReference: 'Surah Al-Fatiha 1:1-7 · Sahih al-Bukhari 756',
  },
  {
    id: 'rec_ruku_qawmah',
    stepOrder: 3,
    title: 'Ruku (Bowing) & Rising (Qawmah)',
    localizedTitles: {
      en: 'Ruku (Bowing) & Rising (Qawmah)',
      hi: 'रुकू और क़ौमा (रुकू से उठने) की तसबीह',
      ur: 'رکوع اور قومہ کی تسبیح',
      hinglish: 'Ruku aur Qawmah ki Tasbih',
      ar: 'أذكار الركوع والرفع منه (القومة)',
    },
    stage: 'ruku',
    arabic:
      'سُبْحَانَ رَبِّيَ الْعَظِيمِ (٣ مرات) — سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ — رَبَّنَا وَلَكَ الْحَمْدُ',
    transliteration:
      'Subhana Rabbiyal-‘Adhim (3x) — [While rising:] Sami‘Allahu liman hamidah — [Standing upright:] Rabbana wa lakal-hamd.',
    translations: {
      en: 'Glory be to my Lord, the Most Great (3 times). — Allah hears the one who praises Him. — Our Lord, to You belongs all praise.',
      hi: 'पाक है मेरा रब जो सबसे अज़मत वाला है (3 बार)। — अल्लाह ने उसकी बात सुन ली जिसने उसकी तारीफ़ की। — ऐ हमारे रब! तेरे ही लिए सब तारीफ़ है।',
      ur: 'پاک ہے میرا رب جو بڑی عظمت والا ہے (3 بار)۔ — اللہ نے اس کی سن لی جس نے اس کی تعریف کی۔ — اے ہمارے رب! تیرے ہی لیے تمام تعریف ہے۔',
      hinglish: 'Paak hai mera Rab jo sabse azmat wala hai (3x). — Allah ne uski sun li jisne Uski tareef ki. — Ai hamare Rab! Tere hi liye sab tareef hai.',
      ar: 'تعظيم الله في الركوع وحمده عند الاعتدال قائماً.',
    },
    whenRecited: 'Say Subhana Rabbiyal-Adhim 3 times in Ruku; say Sami Allahu liman hamidah while rising, and Rabbana wa lakal-hamd when standing straight.',
    localizedWhenRecited: {
      en: 'In Ruku (3x) and upon rising upright with composure (Tuma’ninah).',
      hi: 'रुकू में कम से कम 3 बार और रुकू से सीधे खड़े होते समय इत्मीनान के साथ।',
      ur: 'رکوع میں کم از کم 3 بار اور رکوع سے سیدھے کھڑے ہوتے وقت اطمینان کے ساتھ۔',
      hinglish: 'Ruku mein 3 baar aur Ruku se seedhe khade hote waqt itminan ke saath.',
      ar: 'في الركوع ثلاثاً وعند الاعتدال قائماً بطمأنينة.',
    },
    madhhabNotes: {
      Hanafi: 'Saying Subhana Rabbiyal-Adhim 3 times is Sunnah; calm composure in Ruku and Qawmah is Wajib.',
      Shafii: 'Calm stillness (Tuma’ninah) in both Ruku and standing upright (I’tidal) is an essential Pillar (Rukn).',
      Maliki: 'Stillness (Tuma’ninah) in Ruku and rising is obligatory (Fard).',
      Hanbali: 'Saying Subhana Rabbiyal-Adhim at least once in Ruku and Sami Allahu liman hamidah / Rabbana wa lakal-hamd is Wajib.',
    },
    sourceReference: 'Sahih Muslim 772, Sahih al-Bukhari 796',
  },
  {
    id: 'rec_sujood_jalsa',
    stepOrder: 4,
    title: 'Sujood (Prostration) & Sitting Between Two Prostrations (Jalsa)',
    localizedTitles: {
      en: 'Sujood (Prostration) & Jalsa (Sitting Between Prostrations)',
      hi: 'सज्दा और जलसा (दो सज्दों के बीच बैठने की दुआ)',
      ur: 'سجدہ اور جلسہ (دو سجدوں کے درمیان کی دعا)',
      hinglish: 'Sujood aur Jalsa (Do sajdon ke beech ki dua)',
      ar: 'أذكار السجود والجلوس بين السجدتين',
    },
    stage: 'sujood',
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى (٣ مرات) — رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي',
    transliteration: 'Subhana Rabbiyal-A‘la (3x in each Sujood) — [Between the two prostrations:] Rabbighfir li, Rabbighfir li.',
    translations: {
      en: 'Glory be to my Lord, the Most High (3 times). — [Sitting between the two prostrations:] My Lord, forgive me; my Lord, forgive me.',
      hi: 'पाक है मेरा रब जो सबसे बुलंद है (3 बार)। — (दोनों सज्दों के बीच बैठकर:) ऐ मेरे रब! मुझे बख़्श दे, ऐ मेरे रब! मुझे बख़्श दे।',
      ur: 'پاک ہے میرا رب جو سب سے بلند ہے (3 بار)۔ — (دونوں سجدوں کے درمیان بیٹھ کر:) اے میرے رب! مجھے بخش دے، اے میرے رب! مجھے بخش دے۔',
      hinglish: 'Paak hai mera Rab jo sabse buland hai (3x). — (Dono sajdon ke beech:) Ai mere Rab! Mujhe bakhsh de.',
      ar: 'تسبيح الله الأعلى في السجود وسؤاله المغفرة في الجلسة بين السجدتين.',
    },
    whenRecited: 'Recite Subhana Rabbiyal-A’la 3 times in the 1st Sujood, sit calmly for Jalsa saying Rabbighfir li, then perform the 2nd Sujood.',
    localizedWhenRecited: {
      en: 'In both prostrations (3x each) and while sitting calmly between them.',
      hi: 'दोनों सज्दों में 3-3 बार और दोनों सज्दों के बीच सीधा बैठकर।',
      ur: 'دونوں سجدوں میں تین تین بار اور دونوں سجدوں کے درمیان اطمینان سے بیٹھ کر۔',
      hinglish: 'Dono sajdon mein 3-3 baar aur dono ke beech aaram se baith kar.',
      ar: 'في السجدتين وفي الجلسة المطمئنة بينهما.',
    },
    madhhabNotes: {
      Hanafi: 'Forehead, nose, both palms, both knees, and toes of both feet touch the ground cleanly.',
      Shafii: 'Seven bones (forehead, both palms, both knees, and undersides of toes of both feet) must rest on the ground.',
      Maliki: 'Resting on the seven limbs with stillness between the two prostrations.',
      Hanbali: 'Resting all seven limbs on the ground and saying Rabbighfir li between the two prostrations is Wajib.',
    },
    sourceReference: 'Sunan an-Nasa’i 1136, Sunan Abi Dawud 874',
  },
  {
    id: 'rec_tashahhud',
    stepOrder: 5,
    title: 'At-Tahiyyat (Tashahhud)',
    localizedTitles: {
      en: 'At-Tahiyyat (Tashahhud in Sitting Position)',
      hi: 'अत्तहिय्यात (तशह्हुद)',
      ur: 'التحیات (تشہد)',
      hinglish: 'At-Tahiyyat (Tashahhud)',
      ar: 'التحيات (التشهد)',
    },
    stage: 'tashahhud',
    arabic:
      'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration:
      'At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu ‘alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. As-salamu ‘alayna wa ‘ala ‘ibadillahis-salihin. Ash-hadu an la ilaha illallahu wa ash-hadu anna Muhammadan ‘abduhu wa rasuluh.',
    translations: {
      en: 'All compliments, prayers, and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity worthy of worship except Allah, and I bear witness that Muhammad is His servant and Messenger.',
      hi: 'तमाम ज़बानी, बदनी और माली इबादतें अल्लाह ही के लिए हैं। ऐ नबी ﷺ! आप पर सलाम हो और अल्लाह की रहमत और उसकी बरकतें हों। सलाम हो हम पर और अल्लाह के तमाम नेक बंदों पर। मैं गवाही देता हूँ कि अल्लाह के सिवा कोई माबूद नहीं और मैं गवाही देता हूँ कि मुहम्मद ﷺ उसके बंदे और रसूल हैं।',
      ur: 'تمام قولی، بدنی اور مالی عبادتیں اللہ ہی کے لیے ہیں۔ اے نبی ﷺ! آپ پر سلام ہو اور اللہ کی رحمت اور اس کی برکتیں ہوں۔ سلام ہو ہم پر اور اللہ کے نیک بندوں پر۔ میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور میں گواہی دیتا ہوں کہ محمد ﷺ اس کے بندے اور رسول ہیں۔',
      hinglish: 'Tamam ibadatein aur paak kalmaat Allah ke liye hain. Ai Nabi ﷺ! Aap par salam ho aur Allah ki rahmat aur barkatein hon. Salam ho hum par aur Allah ke nek bandon par. Main gawahi deta hoon ki Allah ke siwa koi mabood nahi aur Muhammad ﷺ Uske bande aur Rasool hain.',
      ar: 'التشهد المأثور عن ابن مسعود رضي الله عنه في القعود الأوسط والأخير.',
    },
    whenRecited: 'Recited while sitting after the 2nd Rak’ah (middle sitting) and in the final sitting (Qa’dah Akhirah) of every prayer.',
    localizedWhenRecited: {
      en: 'Recited in the sitting position after the 2nd Rak’ah and in the final sitting of every prayer.',
      hi: 'दूसरी रकात के बाद बैठने में और हर नमाज़ की आख़िरी बैठक (क़ादा अख़ीरा) में पढ़ी जाती है।',
      ur: 'دوسری رکعت کے بعد قعدہ اولیٰ میں اور ہر نماز کے قعدہ اخیرہ میں پڑھی جاتی ہے۔',
      hinglish: 'Doosri rakat ke baad aur har namaz ki aakhiri baithak mein padhi jaati hai.',
      ar: 'يُقرأ في التشهد الأول والتشهد الأخير من كل صلاة.',
    },
    madhhabNotes: {
      Hanafi: 'Tashahhud of Ibn Mas’ud (RA) shown above is Wajib in both middle and final sittings.',
      Shafii: 'Tashahhud of Ibn Abbas (At-tahiyyatul-mubarakatus-salawatut-tayyibatu lillah...) or Ibn Mas’ud are both valid; final Tashahhud is a Pillar (Rukn).',
      Maliki: 'Tashahhud of Umar ibn Al-Khattab (RA) or Ibn Mas’ud (RA) is recited.',
      Hanbali: 'Tashahhud of Ibn Mas’ud (RA) is Wajib in the first sitting and a Pillar (Rukn) in the final sitting.',
    },
    sourceReference: 'Sahih al-Bukhari 831, Sahih Muslim 402',
  },
  {
    id: 'rec_durood_ibrahim',
    stepOrder: 6,
    title: 'Durood Ibrahim (As-Salatu al-Ibrahimiyyah)',
    localizedTitles: {
      en: 'Durood Ibrahim (Salawat upon the Prophet ﷺ)',
      hi: 'दुरूद-ए-इब्राहीमी',
      ur: 'درودِ ابراہیمی',
      hinglish: 'Durood-e-Ibrahimi',
      ar: 'الصلاة الإبراهيمية',
    },
    stage: 'durood',
    arabic:
      'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration:
      'Allahumma salli ‘ala Muhammadin wa ‘ala ali Muhammadin kama sallayta ‘ala Ibrahima wa ‘ala ali Ibrahima innaka Hamidum-Majid. Allahumma barik ‘ala Muhammadin wa ‘ala ali Muhammadin kama barakta ‘ala Ibrahima wa ‘ala ali Ibrahima innaka Hamidum-Majid.',
    translations: {
      en: 'O Allah, send grace and honor upon Muhammad and upon the family of Muhammad, just as You sent grace and honor upon Ibrahim and upon the family of Ibrahim; indeed, You are Praiseworthy, Glorious. O Allah, bless Muhammad and the family of Muhammad, just as You blessed Ibrahim and the family of Ibrahim; indeed, You are Praiseworthy, Glorious.',
      hi: 'ऐ अल्लाह! रहमत नाज़िल फ़रमा मुहम्मद ﷺ पर और मुहम्मद ﷺ की आल (परिवार) पर, जैसा कि तूने रहमत नाज़िल फ़रमाई इब्राहीम (अलैहिस्सलाम) पर और इब्राहीम की आल पर, बेशक तू तारीफ़ के लायक़, बड़ी बुज़ुर्गी वाला है। ऐ अल्लाह! बरकत नाज़िल फ़रमा मुहम्मद ﷺ पर और मुहम्मद ﷺ की आल पर, जैसा कि तूने बरकत नाज़िल फ़रमाई इब्राहीम और उनकी आल पर, बेशक तू तारीफ़ के लायक़, बड़ी बुज़ुर्गी वाला है।',
      ur: 'اے اللہ! رحمت نازل فرما محمد ﷺ پر اور آلِ محمد ﷺ پر، جس طرح تو نے رحمت نازل فرمائی ابراہیم علیہ السلام پر اور آلِ ابراہیم پر، بے شک تو تعریف والا، بزرگی والا ہے۔ اے اللہ! برکت نازل فرما محمد ﷺ پر اور آلِ محمد ﷺ پر، جس طرح تو نے برکت نازل فرمائی ابراہیم علیہ السلام پر اور آلِ ابراہیم پر، بے شک تو تعریف والا، بزرگی والا ہے۔',
      hinglish: 'Ai Allah! Rahmat aur barkat nazil farma Muhammad ﷺ par aur Aapki aal par, jis tarah Tune Ibrahim (AS) aur unki aal par rahmat aur barkat nazil farmayi, beshak Tu tareef ke laiq aur buzurgi wala hai.',
      ar: 'الصلاة على النبي ﷺ في التشهد الأخير بعد الشهادتين.',
    },
    whenRecited: 'Recited in the final sitting (Qa’dah Akhirah) immediately after At-Tahiyyat.',
    localizedWhenRecited: {
      en: 'Recited in the final sitting immediately after At-Tahiyyat.',
      hi: 'नमाज़ की आख़िरी बैठक में अत्तहिय्यात के तुरंत बाद पढ़ा जाता है।',
      ur: 'نماز کے آخری قعدہ میں التحیات کے فوراً بعد پڑھا جاتا ہے۔',
      hinglish: 'Namaz ki aakhiri baithak mein At-Tahiyyat ke baad padha jaata hai.',
      ar: 'تُقرأ في القعود الأخير بعد التشهد.',
    },
    madhhabNotes: {
      Hanafi: 'Sunnah Mu’akkadah in the final sitting after Tashahhud.',
      Shafii: 'Sending Salawat upon the Prophet ﷺ in the final sitting is a Pillar (Rukn) of prayer.',
      Maliki: 'Sunnah Mu’akkadah in the final sitting.',
      Hanbali: 'Pillar (Rukn) in the final sitting of prayer.',
    },
    sourceReference: 'Sahih al-Bukhari 3370, Sahih Muslim 406',
  },
  {
    id: 'rec_dua_masura',
    stepOrder: 7,
    title: 'Dua After Durood Before Salam (Dua-e-Masura)',
    localizedTitles: {
      en: 'Prophetic Dua Before Salam (Dua-e-Masura)',
      hi: 'दुआ-ए-मासूरा (सलाम फेरने से पहले की दुआ)',
      ur: 'دعائے ماثورہ (سلام پھیرنے سے پہلے کی دعا)',
      hinglish: 'Dua-e-Masura (Salam se pehle ki dua)',
      ar: 'الدعاء بعد التشهد الأخير قبل السلام',
    },
    stage: 'dua_masura',
    arabic:
      'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
    transliteration:
      'Allahumma inni dhalamtu nafsi dhulman kathiran, wa la yaghfirudh-dhunuba illa Anta, faghfir li maghfiratan min ‘indika warhamni, innaka Antal-Ghafurur-Rahim.',
    translations: {
      en: 'O Allah, I have wronged myself greatly, and none forgives sins except You; so grant me forgiveness from Yourself and have mercy on me. Indeed, You are the Oft-Forgiving, the Most Merciful.',
      hi: 'ऐ अल्लाह! बेशक मैंने अपनी जान पर बहुत ज़ुल्म (कमी) किया, और तेरे सिवा कोई गुनाहों को नहीं बख़्श सकता, बस अपनी ख़ास मग्फ़िरत से मुझे बख़्श दे और मुझ पर रहम फ़रमा, बेशक तू ही बख़्शने वाला, रहम करने वाला है।',
      ur: 'اے اللہ! بے شک میں نے اپنی جان پر بہت ظلم کیا اور تیرے سوا گناہوں کو کوئی نہیں بخش سکتا، پس اپنی خاص بخشش سے مجھے بخش دے اور مجھ پر رحم فرما، بے شک تو ہی بخشنے والا مہربان ہے۔',
      hinglish: 'Ai Allah! Maine apni jaan par bahut kami ki, aur Tere siwa koi gunahon ko maaf nahi kar sakta, pas apni khaas maghfirat se mujhe bakhsh de aur mujh par raham farma, beshak Tu Ghafurur-Rahim hai.',
      ar: 'الدعاء الذي علّمه النبي ﷺ أبا بكر الصديق رضي الله عنه ليقوله في صلاته.',
    },
    whenRecited: 'Recited in the final sitting after Durood Ibrahim and right before turning the head for Salam.',
    localizedWhenRecited: {
      en: 'Recited after Durood Ibrahim right before Salam.',
      hi: 'दुरूद-ए-इब्राहीमी के बाद और सलाम फेरने से ठीक पहले पढ़ी जाती है।',
      ur: 'درودِ ابراہیمی کے بعد اور سلام پھیرنے سے پہلے پڑھی جاتی ہے۔',
      hinglish: 'Durood-e-Ibrahimi ke baad aur Salam pherne se theek pehle padhi jaati hai.',
      ar: 'يُقرأ بعد الصلاة الإبراهيمية وقبل التسليم.',
    },
    madhhabNotes: {
      Hanafi: 'Sunnah to recite Quranic/Hadith Duas (such as Allahumma inni dhalamtu nafsi or Rabbana atina fid-dunya) before Salam.',
      Shafii: 'Sunnah to seek refuge from four trials (Allahumma inni a’udhu bika min ‘adhabi jahannam...) and make supplication before Salam.',
      Maliki: 'Recommended to supplicate with authentic Duas before Taslim.',
      Hanbali: 'Emphasized Sunnah to seek refuge from the four trials and supplicate before Salam.',
    },
    sourceReference: 'Sahih al-Bukhari 834, Sahih Muslim 2705 (Taught to Abu Bakr As-Siddiq RA)',
  },
  {
    id: 'rec_dua_qunoot',
    stepOrder: 8,
    title: 'Dua-e-Qunoot (Recited in Witr Prayer)',
    localizedTitles: {
      en: 'Dua-e-Qunoot (Supplication in Witr Prayer)',
      hi: 'दुआ-ए-क़ुनूत (वित्र की नमाज़ के लिए)',
      ur: 'دعائے قنوت (نمازِ وتر کے لیے)',
      hinglish: 'Dua-e-Qunoot (Witr ki namaz ke liye)',
      ar: 'دعاء القنوت في الوتر',
    },
    stage: 'qunoot',
    arabic:
      'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',
    transliteration:
      'Allahummah-dini fiman hadayt, wa ‘afini fiman ‘afayt, wa tawallani fiman tawallayt, wa barik li fima a‘tayt, wa qini sharra ma qadayt, fa innaka taqdi wa la yuqda ‘alayk, wa innahu la yadhillu man walayt, tabarakta Rabbana wa ta‘alayt.',
    translations: {
      en: 'O Allah, guide me among those You have guided, grant me well-being among those You have granted well-being, take me into Your charge among those You have taken into Your charge, bless me in what You have given, and protect me from the evil of what You have decreed; for indeed You decree and none can decree over You, and none whom You befriend is ever humiliated. Blessed are You, our Lord, and Exalted.',
      hi: 'ऐ अल्लाह! मुझे हिदायत दे उन लोगों में जिन्हें तूने हिदायत दी, और मुझे आफ़ियत दे उन लोगों में जिन्हें तूने आफ़ियत दी, और मेरी कारसाज़ी फ़रमा उन लोगों में जिनकी तूने कारसाज़ी फ़रमाई, और जो कुछ तूने मुझे दिया उसमें बरकत दे, और जिस चीज़ का तूने फ़ैसला किया है उसकी बुराई से मुझे बचा।',
      ur: 'اے اللہ! مجھے ہدایت دے ان لوگوں میں جنہیں تو نے ہدایت دی، اور مجھے عافیت دے ان لوگوں میں جنہیں تو نے عافیت دی، اور میری کارسازی فرما ان لوگوں میں جن کی تو نے کارسازی فرمائی، اور جو کچھ تو نے مجھے عطا کیا اس میں برکت دے۔',
      hinglish: 'Ai Allah! Mujhe hidayat de un logon mein jinhein Tune hidayat di, aur mujhe aafiyat de, aur jo kuch Tune mujhe ata kiya usmein barkat de, aur bure faisle ke shar se meri hifazat farma.',
      ar: 'دعاء القنوت الذي علّمه النبي ﷺ الحسن بن علي رضي الله عنهما ليقوله في الوتر.',
    },
    whenRecited: 'Recited in the final Rak’ah of Witr prayer (after Surah recitation before Ruku in Hanafi school, or after rising from Ruku in Shafi’i/Hanbali schools).',
    localizedWhenRecited: {
      en: 'Recited in the final Rak’ah of Witr prayer.',
      hi: 'ईशा के बाद वित्र की नमाज़ की तीसरी/आख़िरी रकात में पढ़ी जाती है।',
      ur: 'عشاء کے بعد نمازِ وتر کی آخری رکعت میں پڑھی جاتی ہے۔',
      hinglish: 'Isha ke baad Witr ki namaz ki aakhiri rakat mein padhi jaati hai.',
      ar: 'يُقرأ في الركعة الأخيرة من صلاة الوتر.',
    },
    madhhabNotes: {
      Hanafi: 'Witr is 3 Rak’ahs Wajib; Qunoot (Allahumma inna nasta’inuka... or Allahummah-dini...) is recited in the 3rd Rak’ah after the Surah and Takbir, BEFORE going into Ruku.',
      Shafii: 'Recited after rising from Ruku in the final Rak’ah of Witr (especially in the second half of Ramadan) and in Fajr.',
      Maliki: 'Qunoot is recited silently before Ruku in the 2nd Rak’ah of Fajr prayer.',
      Hanbali: 'Recited in Witr after rising from Ruku (or before Ruku, both being permissible).',
    },
    sourceReference: 'Sunan Abi Dawud 1425, Jami` at-Tirmidhi 464 (Sahih)',
  },
  {
    id: 'rec_salam',
    stepOrder: 9,
    title: 'Taslim (Concluding Salam Right & Left)',
    localizedTitles: {
      en: 'Taslim (Concluding Salam Right & Left)',
      hi: 'तस्लीम (दाएँ और बाएँ सलाम फेरना)',
      ur: 'تسلیم (دائیں اور بائیں سلام پھیرنا)',
      hinglish: 'Taslim (Daayein aur baayein Salam pherna)',
      ar: 'التسليم لختام الصلاة',
    },
    stage: 'salam',
    arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ — أَسْتَغْفِرُ اللَّهَ (٣ مرات) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    transliteration:
      'As-salamu ‘alaykum wa rahmatullah (turning right, then left). — [After Salam:] Astaghfirullah (3x), Allahumma Antas-Salamu wa minkas-salamu, tabarakta ya Dhal-Jalali wal-Ikram.',
    translations: {
      en: 'Peace and mercy of Allah be upon you (right & left). — [After finishing:] I seek forgiveness from Allah (3x). O Allah, You are Peace and from You comes peace; blessed are You, O Possessor of Majesty and Honor.',
      hi: 'तुम पर सलाम हो और अल्लाह की रहमत हो (दाएँ और बाएँ)। — (सलाम के बाद:) अस्तग़फ़िरुल्लाह (3 बार), ऐ अल्लाह! तू ही सलामती देने वाला है और तुझी से सलामती है, तू बड़ा बरकत वाला है ऐ अजमत और इज़्ज़त वाले।',
      ur: 'تم پر سلامتی ہو اور اللہ کی رحمت ہو (دائیں اور بائیں)۔ — (سلام کے بعد:) استغفر اللہ (3 بار)، اے اللہ! تو ہی سلامتی والا ہے اور تجھی سے سلامتی ہے، تو بابرکت ہے اے جلال اور عزت والے۔',
      hinglish: 'As-salamu alaykum wa rahmatullah (daayein aur baayein). — Salam ke baad 3 baar Astaghfirullah aur Allahumma Antas-Salam padhein.',
      ar: 'ختام الصلاة بالتسليم يميناً ويساراً ثم الاستغفار والذكر المأثور.',
    },
    whenRecited: 'Turn your head to the right shoulder saying As-salamu alaykum wa rahmatullah, then to the left shoulder.',
    localizedWhenRecited: {
      en: 'Turn head to the right shoulder, then to the left shoulder to conclude the prayer.',
      hi: 'पहले दाएँ कंधे की तरफ़ चेहरा करके सलाम कहें, फिर बाएँ कंधे की तरफ़।',
      ur: 'پہلے دائیں کندھے کی طرف رخ کر کے سلام کہیں، پھر بائیں کندھے کی طرف۔',
      hinglish: 'Pehle daayein kandhe ki taraf chehra karke salam kahein, phir baayein taraf.',
      ar: 'الالتفات يميناً ثم يساراً بالتسليم لختام الصلاة.',
    },
    madhhabNotes: {
      Hanafi: 'Turning right and left saying As-salamu alaykum wa rahmatullah exits the state of prayer.',
      Shafii: 'The first Taslim to the right is a Pillar (Rukn); the second to the left is Sunnah.',
      Maliki: 'One Taslim is obligatory for the Imam and solo worshipper.',
      Hanbali: 'Both Taslims (right and left) are Pillars (Arkan) of obligatory prayers.',
    },
    sourceReference: 'Sahih Muslim 582, Sahih Muslim 591',
  },
];

export const COMPLETE_PRAYER_GUIDES: PrayerRakahGuide[] = [
  {
    id: 'Fajr',
    name: 'Fajr (Dawn Prayer)',
    localizedNames: {
      en: 'Fajr (Dawn Prayer — 2 Fard Rak’ahs)',
      hi: 'फ़ज्र की नमाज़ (2 सुन्नत + 2 फ़र्ज़)',
      ur: 'نمازِ فجر (2 سنت مؤکدہ + 2 فرض)',
      hinglish: 'Fajr ki Namaz (2 Sunnah + 2 Fard)',
      ar: 'صلاة الفجر (ركعتا سنة + ركعتا فرض)',
    },
    timeWindowDesc: 'From true dawn (Subh Sadiq) until just before sunrise.',
    fardRakahs: 2,
    sunnahMuakkadahBefore: 2,
    sunnahMuakkadahAfter: 0,
    recitationAudibility: 'Audible (Jahri) in Fard',
    stepByStepSummary: [
      '1. Offer 2 Rak’ahs of emphasized Sunnah (Sunnah Mu’akkadah) quietly before the Fard prayer.',
      '2. For the 2 Rak’ahs Fard: Stand facing Qibla, make intention in the heart, raise hands and say "Allahu Akbar".',
      '3. Recite opening Thana silently, then Surah Al-Fatiha and an additional Surah in the 1st Rak’ah.',
      '4. Perform Ruku (Subhana Rabbiyal-Adhim 3x), rise upright (Sami Allahu liman hamidah / Rabbana wa lakal-hamd), and perform two Sujoods with a calm sitting (Jalsa) between them.',
      '5. Stand for the 2nd Rak’ah: recite Surah Al-Fatiha and another Surah, then complete Ruku and two Sujoods.',
      '6. Sit for the final sitting: recite At-Tahiyyat, Durood Ibrahim, and Dua-e-Masura, then conclude with Salam to the right and left.',
    ],
    localizedStepByStep: {
      hi: [
        '1. पहले 2 रकात सुन्नत-ए-मुअक्कदा अदा करें।',
        '2. 2 रकात फ़र्ज़ के लिए क़िब्ला रुख़ खड़े होकर दिल में नियत करें और "अल्लाहु अकबर" कहकर हाथ बाँधें।',
        '3. पहली रकात में सना, सूरह फ़ातिहा और कोई एक सूरह पढ़ें, फिर रुकू और दो सज्दे पूरे करें।',
        '4. दूसरी रकात में सूरह फ़ातिहा और एक सूरह पढ़ें, फिर रुकू और दो सज्दे करें।',
        '5. आख़िरी बैठक में अत्तहिय्यात, दुरूद-ए-इब्राहीमी और दुआ-ए-मासूरा पढ़कर दाएँ और बाएँ सलाम फेरें।',
      ],
      ur: [
        '1. پہلے 2 رکعت سنت مؤکدہ ادا کریں۔',
        '2. 2 رکعت فرض کے لیے قبلہ رخ کھڑے ہو کر نیت کریں اور اللہ اکبر کہہ کر ہاتھ باندھیں۔',
        '3. پہلی رکعت میں ثناء، سورۃ الفاتحہ اور کوئی سورت پڑھیں، پھر رکوع اور دو سجدے کریں۔',
        '4. دوسری رکعت میں سورۃ الفاتحہ اور سورت پڑھ کر رکوع اور دو سجدے مکمل کریں۔',
        '5. قعدہ اخیرہ میں التحیات، درودِ ابراہیمی اور دعائے ماثورہ پڑھ کر دائیں اور بائیں سلام پھیریں۔',
      ],
    },
    commonBeginnerMistakes: [
      'Rushing through Ruku and Sujood without pausing calmly (Tuma’ninah).',
      'Delaying Fajr past sunrise time without a valid excuse.',
      'Lifting the feet or toes off the prayer mat during Sujood.',
    ],
    madhhabSpecifics: {
      Hanafi: '2 Sunnah Mu’akkadah strongly emphasized before 2 Fard; no Nafl after Fajr until after sunrise.',
      Shafii: 'Qunoot supplication is Sunnah in the 2nd Rak’ah of Fajr after rising from Ruku.',
      Maliki: '2 Rak’ahs Raghibah before 2 Fard; Qunoot recited silently before Ruku in the 2nd Rak’ah.',
      Hanbali: '2 Sunnah Rawatib before 2 Fard; Qunoot in Fajr is only during times of calamity (Qunoot an-Nawazil).',
    },
    sourceReference: 'Sahih al-Bukhari 350, Sahih Muslim 724',
  },
  {
    id: 'Dhuhr',
    name: 'Dhuhr (Midday Prayer)',
    localizedNames: {
      en: 'Dhuhr (Midday Prayer — 4 Fard Rak’ahs)',
      hi: 'ज़ुहर की नमाज़ (4 सुन्नत + 4 फ़र्ज़ + 2 सुन्नत)',
      ur: 'نمازِ ظہر (4 سنت + 4 فرض + 2 سنت)',
      hinglish: 'Dhuhr ki Namaz (4 Sunnah + 4 Fard + 2 Sunnah)',
      ar: 'صلاة الظهر (٤ فرض)',
    },
    timeWindowDesc: 'Starts just after the sun passes its zenith (Zawal) until Asr time begins.',
    fardRakahs: 4,
    sunnahMuakkadahBefore: 4,
    sunnahMuakkadahAfter: 2,
    recitationAudibility: 'Silent (Sirri) in Fard',
    stepByStepSummary: [
      '1. All recitation in the 4 Fard Rak’ahs of Dhuhr is done silently (moving the lips/tongue softly without loud voice).',
      '2. In Rak’ahs 1 & 2: Recite Surah Al-Fatiha followed by another Surah/verses, then perform Ruku and two Sujoods.',
      '3. After the 2nd Rak’ah, sit for the Middle Sitting (Qa’dah Ula) and recite ONLY At-Tahiyyat, then stand up for the 3rd Rak’ah saying Allahu Akbar.',
      '4. In Rak’ahs 3 & 4: Recite ONLY Surah Al-Fatiha while standing, followed by Ruku and two Sujoods.',
      '5. After the 4th Rak’ah, sit for the Final Sitting: recite At-Tahiyyat, Durood Ibrahim, and Dua-e-Masura, then conclude with Salam.',
    ],
    commonBeginnerMistakes: [
      'Accidentally reciting Durood Ibrahim in the middle (2nd Rak’ah) sitting instead of standing up right after At-Tahiyyat.',
      'Thinking silently in the mind without moving the lips and tongue during silent prayers.',
    ],
    madhhabSpecifics: {
      Hanafi: '4 Sunnah Mu’akkadah (prayed as one unit of 4) before 4 Fard, and 2 Sunnah Mu’akkadah after.',
      Shafii: '2 or 4 Sunnah Rawatib (prayed in units of 2+2) before 4 Fard, and 2 Sunnah after.',
      Maliki: 'Sunnah prayers before and after Dhuhr are strongly recommended in units of 2.',
      Hanbali: '2+2 Sunnah Rawatib before 4 Fard, and 2 Sunnah Rawatib after.',
    },
    sourceReference: 'Sahih al-Bukhari 541, Jami` at-Tirmidhi 424',
  },
  {
    id: 'Asr',
    name: 'Asr (Afternoon Prayer)',
    localizedNames: {
      en: 'Asr (Afternoon Prayer — 4 Fard Rak’ahs)',
      hi: 'असर की नमाज़ (4 फ़र्ज़)',
      ur: 'نمازِ عصر (4 فرض)',
      hinglish: 'Asr ki Namaz (4 Fard)',
      ar: 'صلاة العصر (٤ فرض)',
    },
    timeWindowDesc: 'Late afternoon until before sunset (when shadow reaches 1x object length in Shafi’i/Maliki/Hanbali, or 2x in Hanafi).',
    fardRakahs: 4,
    sunnahMuakkadahBefore: 0,
    sunnahMuakkadahAfter: 0,
    recitationAudibility: 'Silent (Sirri) in Fard',
    stepByStepSummary: [
      '1. The 4 Fard Rak’ahs of Asr are prayed exactly like the 4 Fard Rak’ahs of Dhuhr (all recitation is silent).',
      '2. Rak’ahs 1 & 2 include Surah Al-Fatiha + another Surah, followed by the middle sitting (At-Tahiyyat only).',
      '3. Rak’ahs 3 & 4 include Surah Al-Fatiha only, followed by the final sitting (At-Tahiyyat + Durood Ibrahim + Dua + Salam).',
      '4. No voluntary (Nafl/Sunnah) prayer is offered after Asr Fard until Maghrib.',
    ],
    commonBeginnerMistakes: [
      'Delaying Asr until the sun turns pale/orange just before sunset.',
      'Praying extra Sunnah Rak’ahs after Asr during the restricted time.',
    ],
    madhhabSpecifics: {
      Hanafi: 'Asr window begins when an object’s shadow equals twice (2x) its height plus noon shadow; 4 Sunnah Ghayr Mu’akkadah before Asr are rewarding.',
      Shafii: 'Asr window begins when an object’s shadow equals 1x its height plus noon shadow.',
      Maliki: 'Asr window begins at 1x shadow length.',
      Hanbali: 'Asr window begins at 1x shadow length.',
    },
    sourceReference: 'Sahih al-Bukhari 553, Sunan Abi Dawud 1271',
  },
  {
    id: 'Maghrib',
    name: 'Maghrib (Sunset Prayer)',
    localizedNames: {
      en: 'Maghrib (Sunset Prayer — 3 Fard Rak’ahs)',
      hi: 'मग़रिब की नमाज़ (3 फ़र्ज़ + 2 सुन्नत)',
      ur: 'نمازِ مغرب (3 فرض + 2 سنت)',
      hinglish: 'Maghrib ki Namaz (3 Fard + 2 Sunnah)',
      ar: 'صلاة المغرب (٣ فرض + ركعتا سنة)',
    },
    timeWindowDesc: 'Immediately after sunset until the red/white twilight disappears.',
    fardRakahs: 3,
    sunnahMuakkadahBefore: 0,
    sunnahMuakkadahAfter: 2,
    recitationAudibility: 'First 2 Audible, Remaining Silent',
    stepByStepSummary: [
      '1. Maghrib Fard has 3 Rak’ahs.',
      '2. In Rak’ahs 1 & 2: Recite Surah Al-Fatiha + another Surah (audibly if Imam/solo), complete Ruku and two Sujoods, and sit after the 2nd Rak’ah for At-Tahiyyat only.',
      '3. Stand for the 3rd Rak’ah: Recite ONLY Surah Al-Fatiha silently, then perform Ruku and two Sujoods.',
      '4. Sit after the 3rd Rak’ah for the Final Sitting: recite At-Tahiyyat, Durood Ibrahim, and Dua-e-Masura, then conclude with Salam.',
      '5. Offer 2 Rak’ahs of Sunnah Mu’akkadah after the Fard prayer.',
    ],
    commonBeginnerMistakes: [
      'Reciting an extra Surah after Al-Fatiha in the 3rd Rak’ah of Maghrib.',
      'Standing up for a 4th Rak’ah out of habit instead of sitting for final Tashahhud after the 3rd Rak’ah.',
    ],
    madhhabSpecifics: {
      Hanafi: '3 Fard immediately after sunset, followed by 2 Sunnah Mu’akkadah.',
      Shafii: '2 light Rak’ahs before Maghrib are recommended, then 3 Fard, then 2 Sunnah Mu’akkadah.',
      Maliki: '3 Fard offered promptly after sunset, followed by 2 Sunnah.',
      Hanbali: '3 Fard followed by 2 Sunnah Rawatib.',
    },
    sourceReference: 'Sahih al-Bukhari 559, Sahih Muslim 637',
  },
  {
    id: 'Isha',
    name: 'Isha (Night Prayer)',
    localizedNames: {
      en: 'Isha (Night Prayer — 4 Fard Rak’ahs)',
      hi: 'ईशा की नमाज़ (4 फ़र्ज़ + 2 सुन्नत)',
      ur: 'نمازِ عشاء (4 فرض + 2 سنت)',
      hinglish: 'Isha ki Namaz (4 Fard + 2 Sunnah)',
      ar: 'صلاة العشاء (٤ فرض + ركعتا سنة)',
    },
    timeWindowDesc: 'Starts after twilight vanishes until the middle of the night (and before true dawn).',
    fardRakahs: 4,
    sunnahMuakkadahBefore: 0,
    sunnahMuakkadahAfter: 2,
    recitationAudibility: 'First 2 Audible, Remaining Silent',
    stepByStepSummary: [
      '1. Offer 4 Rak’ahs of Isha Fard.',
      '2. Rak’ahs 1 & 2: Recite Surah Al-Fatiha + another Surah (audibly if Imam/solo), then sit after the 2nd Rak’ah for At-Tahiyyat only.',
      '3. Rak’ahs 3 & 4: Recite ONLY Surah Al-Fatiha silently, then sit after the 4th Rak’ah for At-Tahiyyat, Durood Ibrahim, Dua-e-Masura, and Salam.',
      '4. Offer 2 Rak’ahs of Sunnah Mu’akkadah after Isha Fard, followed by Witr prayer.',
    ],
    commonBeginnerMistakes: [
      'Falling asleep without praying Isha or setting a reliable alarm.',
      'Forgetting that Rak’ahs 3 and 4 only require Surah Al-Fatiha silently.',
    ],
    madhhabSpecifics: {
      Hanafi: '4 Fard + 2 Sunnah Mu’akkadah + 3 Wajib Witr.',
      Shafii: '4 Fard + 2 Sunnah Mu’akkadah + Witr (1 to 11 Rak’ahs, commonly 3).',
      Maliki: '4 Fard + 2 Shafa’ + 1 Witr.',
      Hanbali: '4 Fard + 2 Sunnah Rawatib + Witr.',
    },
    sourceReference: 'Sahih al-Bukhari 565, Sahih Muslim 647',
  },
  {
    id: 'Witr',
    name: 'Witr (Night Concluding Prayer)',
    localizedNames: {
      en: 'Witr Prayer (1 or 3 Rak’ahs after Isha)',
      hi: 'वित्र की नमाज़ (ईशा के बाद 3 या 1 रकात)',
      ur: 'نمازِ وتر (عشاء کے بعد 3 یا 1 رکعت)',
      hinglish: 'Witr ki Namaz (Isha ke baad 3 ya 1 rakat)',
      ar: 'صلاة الوتر',
    },
    timeWindowDesc: 'Offered after the Isha Fard & Sunnah prayers until true dawn (Fajr).',
    fardRakahs: 3,
    sunnahMuakkadahBefore: 0,
    sunnahMuakkadahAfter: 0,
    recitationAudibility: 'Silent (Sirri) in Fard',
    stepByStepSummary: [
      '1. Witr is the final odd-numbered night prayer after Isha.',
      '2. In all Rak’ahs of Witr (unlike 3rd Rak’ah of Maghrib), an additional Surah IS recited after Surah Al-Fatiha (commonly Surah Al-A’la in 1st, Al-Kafirun in 2nd, and Al-Ikhlas in 3rd).',
      '3. In the final Rak’ah, recite Dua-e-Qunoot (either after the Surah before Ruku in Hanafi practice, or after rising from Ruku in Shafi’i/Hanbali practice).',
      '4. Complete the two Sujoods and final sitting (At-Tahiyyat + Durood Ibrahim + Dua + Salam).',
    ],
    commonBeginnerMistakes: [
      'Omitting the additional Surah in the 3rd Rak’ah of Witr.',
      'Confusing the Madhhab methods instead of consistently following one learned method.',
    ],
    madhhabSpecifics: {
      Hanafi: 'Witr is Wajib (necessary) and prayed as 3 continuous Rak’ahs with one Salam at the end; in the 3rd Rak’ah after the Surah, raise hands with Takbir and recite Dua-e-Qunoot before Ruku.',
      Shafii: 'Witr is Sunnah Mu’akkadah; commonly prayed as 2 Rak’ahs (Shafa’) with Salam followed by 1 separate Rak’ah of Witr.',
      Maliki: 'Witr is Sunnah Mu’akkadah; prayed as 2 Rak’ahs of Shafa’ followed by 1 separate Rak’ah of Witr.',
      Hanbali: 'Witr is Sunnah Mu’akkadah; may be prayed as 2+1 Rak’ahs or 3 continuous Rak’ahs without sitting in the 2nd.',
    },
    sourceReference: 'Sunan an-Nasa’i 1729, Sunan Abi Dawud 1422',
  },
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
const ALL_FIVE_PRAYERS: PrayerName[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export function markDayAsExcused(
  existingRecord: SalahDayRecord | undefined,
  dateKey: string,
  excused: boolean,
  note?: string
): SalahDayRecord {
  const nowIso = new Date().toISOString();
  if (excused) {
    return {
      date: dateKey,
      prayers: {
        Fajr: 'excused',
        Dhuhr: 'excused',
        Asr: 'excused',
        Maghrib: 'excused',
        Isha: 'excused',
      },
      sunnahCompleted: existingRecord?.sunnahCompleted ?? 0,
      isExcusedDay: true,
      excusedNote: note,
      updatedAtIso: nowIso,
    };
  }

  return {
    date: dateKey,
    prayers: {
      Fajr: existingRecord?.prayers.Fajr === 'excused' ? 'pending' : existingRecord?.prayers.Fajr || 'pending',
      Dhuhr: existingRecord?.prayers.Dhuhr === 'excused' ? 'pending' : existingRecord?.prayers.Dhuhr || 'pending',
      Asr: existingRecord?.prayers.Asr === 'excused' ? 'pending' : existingRecord?.prayers.Asr || 'pending',
      Maghrib: existingRecord?.prayers.Maghrib === 'excused' ? 'pending' : existingRecord?.prayers.Maghrib || 'pending',
      Isha: existingRecord?.prayers.Isha === 'excused' ? 'pending' : existingRecord?.prayers.Isha || 'pending',
    },
    sunnahCompleted: existingRecord?.sunnahCompleted ?? 0,
    isExcusedDay: false,
    excusedNote: undefined,
    updatedAtIso: nowIso,
  };
}

export interface SalahAnalyticsWithExcusedSupport {
  completedCount: number;
  onTimeCount: number;
  qadaCount: number;
  pendingCount: number;
  excusedCount: number;
  excusedDaysCount: number;
  applicablePrayersCount: number;
  completionRatePercent: number;
  consecutiveWorshipStreakDays: number;
}

/**
 * Computes Salah statistics and consecutive streak across a date history, bridging
 * over excused days without counting them as missed/Qada or breaking the streak.
 */
export function computeSalahStatsWithExcusedBridge(
  salahRecords: Record<string, SalahDayRecord>,
  todayDateKey: string
): SalahAnalyticsWithExcusedSupport {
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
      const status: PrayerStatus = rec.prayers[p] || 'pending';
      if (status === 'prayed_on_time') {
        completedCount += 1;
        onTimeCount += 1;
      } else if (status === 'prayed') {
        completedCount += 1;
      } else if (status === 'qaza') {
        qadaCount += 1;
      } else if (status === 'excused') {
        excusedCount += 1;
        dayHasExcused = true;
      } else {
        pendingCount += 1;
      }
    }
    if (dayHasExcused) {
      excusedDaysCount += 1;
    }
  }

  const applicablePrayersCount = completedCount + qadaCount + pendingCount;
  const completionRatePercent =
    applicablePrayersCount > 0
      ? Math.round((completedCount / applicablePrayersCount) * 100)
      : 100;

  // Compute consecutive worship streak walking backward from todayDateKey.
  // Excused days do NOT break the streak (they bridge between active completed days).
  let streak = 0;
  const [y, m, d] = todayDateKey.split('-').map(Number);
  const cursor = new Date(y, (m || 1) - 1, d || 1, 12, 0, 0);

  for (let i = 0; i < 366; i += 1) {
    const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(
      cursor.getDate()
    ).padStart(2, '0')}`;
    const rec = salahRecords[key];

    if (!rec) {
      // If today has not been logged yet, allow checking yesterday before breaking
      if (i === 0) {
        cursor.setDate(cursor.getDate() - 1);
        continue;
      }
      break;
    }

    const statuses = ALL_FIVE_PRAYERS.map((p) => rec.prayers[p] || 'pending');
    const allExcused =
      rec.isExcusedDay || statuses.every((s) => s === 'excused');
    const anyCompleted = statuses.some((s) => s === 'prayed_on_time' || s === 'prayed');
    const anyExcusedAndRestCompleted =
      statuses.some((s) => s === 'excused') &&
      statuses.every((s) => s === 'excused' || s === 'prayed_on_time' || s === 'prayed');

    if (allExcused) {
      // Bridge across excused day without breaking the streak
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    if (anyCompleted || anyExcusedAndRestCompleted) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    // If today is still pending (0 prayers logged yet today), check yesterday
    if (i === 0 && statuses.every((s) => s === 'pending')) {
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
    consecutiveWorshipStreakDays: streak,
  };
}
