import { DuaItem } from '../types/ilmizo';
import { LocalizedText } from '../engines/tajweedAndWordMeaningEngine';
import { audioManager } from './audioManager';
import { verifyAudioBlobIntegrity } from './storyAudioPrefetchService';

export const HUMAN_DUA_QAIDA_CACHE_NAME = 'ilmizo-human-dua-qaida-audio-v1';

export interface HumanAudioDescriptor {
  id: string;
  reciterName: string;
  mp3Url: string;
  quranReference?: string;
  isHumanRecording: true;
}

export interface QaidaLetterItem {
  number: number;
  id: string;
  letterArabic: string;
  nameEn: string;
  nameAr: string;
  harakatForms: {
    fatha: string;
    kasra: string;
    damma: string;
    phonetic: string;
  };
  makhrajTip: LocalizedText;
  quranExampleWord: string;
  quranExampleTranslit: string;
  quranExampleMeaning: LocalizedText;
  quranAyahRef: string;
  letterAudioMp3Url: string;
  humanAudioMp3Url: string;
  reciterName: string;
}

const hisnChapterUrl = (chapterNum: number): string =>
  `https://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_${String(chapterNum).padStart(3, '0')}.mp3`;

/**
 * Authentic human MP3 recordings:
 * - Quranic Duas use Sheikh Mishary Rashid Alafasy's exact Ayah MP3 matching that verse.
 * - Prophetic / Masnoon Hadith Duas use authentic Hisn al-Muslim chapter human Arabic MP3s.
 */
export const HUMAN_DUA_AUDIO_MAP: Record<string, HumanAudioDescriptor> = {
  dua_waking: {
    id: 'dua_waking',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(2),
    quranReference: 'Hisn al-Muslim Ch. 1 (Waking Up)',
    isHumanRecording: true,
  },
  dua_waking_health_dhikr: {
    id: 'dua_waking_health_dhikr',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(2),
    quranReference: 'Hisn al-Muslim Ch. 1 (Health & Spirit Restored)',
    isHumanRecording: true,
  },
  dua_before_eating: {
    id: 'dua_before_eating',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(69),
    quranReference: 'Hisn al-Muslim Ch. 69 (Before Eating)',
    isHumanRecording: true,
  },
  dua_Before_eating: {
    id: 'dua_Before_eating',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(69),
    quranReference: 'Hisn al-Muslim Ch. 69 (Before Eating)',
    isHumanRecording: true,
  },
  dua_forgot_bismillah: {
    id: 'dua_forgot_bismillah',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(69),
    quranReference: 'Hisn al-Muslim Ch. 69 (If Bismillah Was Forgotten)',
    isHumanRecording: true,
  },
  dua_after_eating: {
    id: 'dua_after_eating',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(70),
    quranReference: 'Hisn al-Muslim Ch. 70 (After Eating)',
    isHumanRecording: true,
  },
  dua_drinking_milk: {
    id: 'dua_drinking_milk',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(72),
    quranReference: 'Hisn al-Muslim Ch. 72 (Drinking / Offered Drink)',
    isHumanRecording: true,
  },
  dua_host_meal_blessing: {
    id: 'dua_host_meal_blessing',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(71),
    quranReference: 'Hisn al-Muslim Ch. 71 (Dua for the Host)',
    isHumanRecording: true,
  },
  dua_breaking_fast_iftar: {
    id: 'dua_breaking_fast_iftar',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(68),
    quranReference: 'Hisn al-Muslim Ch. 68 (Breaking Fast / Iftar)',
    isHumanRecording: true,
  },
  dua_sleep: {
    id: 'dua_sleep',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(29),
    quranReference: 'Hisn al-Muslim Ch. 28 (Before Sleeping)',
    isHumanRecording: true,
  },
  dua_sleep_tasbih_fatimah: {
    id: 'dua_sleep_tasbih_fatimah',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(29),
    quranReference: 'Hisn al-Muslim Ch. 28 (Before Sleeping — Tasbih Fatimah)',
    isHumanRecording: true,
  },
  dua_sleep_side_trust: {
    id: 'dua_sleep_side_trust',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(29),
    quranReference: 'Hisn al-Muslim Ch. 28 (Sleeping on Right Side)',
    isHumanRecording: true,
  },
  dua_sleep_last_two_ayat_baqarah: {
    id: 'dua_sleep_last_two_ayat_baqarah',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/292.mp3',
    quranReference: 'Quran 2:285 (Last Two Ayat of Al-Baqarah)',
    isHumanRecording: true,
  },
  dua_morning_ayatul_kursi: {
    id: 'dua_morning_ayatul_kursi',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3',
    quranReference: 'Quran 2:255 (Ayat al-Kursi)',
    isHumanRecording: true,
  },
  dua_knowledge: {
    id: 'dua_knowledge',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2462.mp3',
    quranReference: 'Quran 20:114 (Rabbi Zidni Ilma)',
    isHumanRecording: true,
  },
  dua_parents: {
    id: 'dua_parents',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2053.mp3',
    quranReference: 'Quran 17:24 (Rabbirhamhuma kama rabbayani saghira)',
    isHumanRecording: true,
  },
  dua_parents_ibrahim_forgiveness: {
    id: 'dua_parents_ibrahim_forgiveness',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1791.mp3',
    quranReference: 'Quran 14:41 (Rabbana-ghfir li wa li-walidayya)',
    isHumanRecording: true,
  },
  dua_family_coolness: {
    id: 'dua_family_coolness',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2929.mp3',
    quranReference: 'Quran 25:74 (Rabbana hab lana min azwajina)',
    isHumanRecording: true,
  },
  dua_rabbana_atina: {
    id: 'dua_rabbana_atina',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/208.mp3',
    quranReference: 'Quran 2:201 (Rabbana atina fid-dunya hasanah)',
    isHumanRecording: true,
  },
  dua_daily_rabbana_atina: {
    id: 'dua_daily_rabbana_atina',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/208.mp3',
    quranReference: 'Quran 2:201 (Rabbana atina fid-dunya hasanah)',
    isHumanRecording: true,
  },
  dua_daily_steadfast_heart: {
    id: 'dua_daily_steadfast_heart',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/301.mp3',
    quranReference: 'Quran 3:8 (Rabbana la tuzigh qulubana)',
    isHumanRecording: true,
  },
  dua_gratitude_sulayman_inspire: {
    id: 'dua_gratitude_sulayman_inspire',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3178.mp3',
    quranReference: 'Quran 27:19 (Rabbi awzi‘ni an ashkura ni‘matak)',
    isHumanRecording: true,
  },
  dua_travel: {
    id: 'dua_travel',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4338.mp3',
    quranReference: 'Quran 43:13 (Subhanalladhi sakhkhara lana hadha)',
    isHumanRecording: true,
  },
  dua_travel_journey: {
    id: 'dua_travel_journey',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(95),
    quranReference: 'Hisn al-Muslim Ch. 95 (Riding & Travel)',
    isHumanRecording: true,
  },
  dua_travel_return: {
    id: 'dua_travel_return',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(105),
    quranReference: 'Hisn al-Muslim Ch. 105 (Returning from Journey)',
    isHumanRecording: true,
  },
  dua_travel_entering_town: {
    id: 'dua_travel_entering_town',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(97),
    quranReference: 'Hisn al-Muslim Ch. 97 (Entering a Town)',
    isHumanRecording: true,
  },
  dua_leaving_home: {
    id: 'dua_leaving_home',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(11),
    quranReference: 'Hisn al-Muslim Ch. 10 (Leaving Home)',
    isHumanRecording: true,
  },
  dua_entering_home: {
    id: 'dua_entering_home',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(12),
    quranReference: 'Hisn al-Muslim Ch. 11 (Entering Home)',
    isHumanRecording: true,
  },
  dua_entering_mosque: {
    id: 'dua_entering_mosque',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(14),
    quranReference: 'Hisn al-Muslim Ch. 13 (Entering the Mosque)',
    isHumanRecording: true,
  },
  dua_leaving_mosque: {
    id: 'dua_leaving_mosque',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(15),
    quranReference: 'Hisn al-Muslim Ch. 14 (Leaving the Mosque)',
    isHumanRecording: true,
  },
  dua_mosque_sitting_waiting_prayer: {
    id: 'dua_mosque_sitting_waiting_prayer',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(13),
    quranReference: 'Hisn al-Muslim Ch. 12 (Going to the Mosque)',
    isHumanRecording: true,
  },
  dua_daily_entering_washroom: {
    id: 'dua_daily_entering_washroom',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(7),
    quranReference: 'Hisn al-Muslim Ch. 6 (Entering Restroom)',
    isHumanRecording: true,
  },
  dua_daily_leaving_washroom: {
    id: 'dua_daily_leaving_washroom',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(8),
    quranReference: 'Hisn al-Muslim Ch. 7 (Leaving Restroom — Ghufranaka)',
    isHumanRecording: true,
  },
  dua_daily_after_wudu: {
    id: 'dua_daily_after_wudu',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(10),
    quranReference: 'Hisn al-Muslim Ch. 9 (After Completing Wudu)',
    isHumanRecording: true,
  },
  dua_daily_wearing_garment: {
    id: 'dua_daily_wearing_garment',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(3),
    quranReference: 'Hisn al-Muslim Ch. 2 (Getting Dressed)',
    isHumanRecording: true,
  },
  dua_daily_sneezing_alhamdulillah: {
    id: 'dua_daily_sneezing_alhamdulillah',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(77),
    quranReference: 'Hisn al-Muslim Ch. 77 (Sneezing Etiquette)',
    isHumanRecording: true,
  },
  dua_daily_kaffaratul_majlis: {
    id: 'dua_daily_kaffaratul_majlis',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(85),
    quranReference: 'Hisn al-Muslim Ch. 85 (Kaffaratul-Majlis)',
    isHumanRecording: true,
  },
  dua_daily_rain_beneficial: {
    id: 'dua_daily_rain_beneficial',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(64),
    quranReference: 'Hisn al-Muslim Ch. 64 (When It Rains)',
    isHumanRecording: true,
  },
  dua_daily_visiting_sick: {
    id: 'dua_daily_visiting_sick',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(49),
    quranReference: 'Hisn al-Muslim Ch. 49 (Visiting the Sick)',
    isHumanRecording: true,
  },
  dua_health_knowledge: {
    id: 'dua_health_knowledge',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(28),
    quranReference: 'Hisn al-Muslim Ch. 27 (Beneficial Knowledge & Provision)',
    isHumanRecording: true,
  },
  dua_healing_shifa: {
    id: 'dua_healing_shifa',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(124),
    quranReference: 'Hisn al-Muslim Ch. 124 (Pain & Healing)',
    isHumanRecording: true,
  },
  dua_morning_protection: {
    id: 'dua_morning_protection',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(28),
    quranReference: 'Hisn al-Muslim Ch. 27 (Morning & Evening Remembrance)',
    isHumanRecording: true,
  },
  dua_morning_gratitude: {
    id: 'dua_morning_gratitude',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(28),
    quranReference: 'Hisn al-Muslim Ch. 27 (Morning Gratitude)',
    isHumanRecording: true,
  },
  dua_forgiveness_sayyid: {
    id: 'dua_forgiveness_sayyid',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(28),
    quranReference: 'Hisn al-Muslim Ch. 27 (Sayyidul-Istighfar)',
    isHumanRecording: true,
  },
  dua_morning_entering_day: {
    id: 'dua_morning_entering_day',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(28),
    quranReference: 'Hisn al-Muslim Ch. 27 (Asbahna wa Asbahal-Mulk)',
    isHumanRecording: true,
  },
  dua_morning_wellbeing_afiyah: {
    id: 'dua_morning_wellbeing_afiyah',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(28),
    quranReference: 'Hisn al-Muslim Ch. 27 (Asking Allah for Afiyah)',
    isHumanRecording: true,
  },
  dua_morning_pleased_with_allah: {
    id: 'dua_morning_pleased_with_allah',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(28),
    quranReference: 'Hisn al-Muslim Ch. 27 (Raditu Billahi Rabba)',
    isHumanRecording: true,
  },
  dua_morning_beneficial_knowledge_rizq: {
    id: 'dua_morning_beneficial_knowledge_rizq',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(28),
    quranReference: 'Hisn al-Muslim Ch. 27 (After Fajr — Ilman Nafi‘an)',
    isHumanRecording: true,
  },
  dua_morning_subhanallahi_wa_bihamdihi_100: {
    id: 'dua_morning_subhanallahi_wa_bihamdihi_100',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(130),
    quranReference: 'Hisn al-Muslim Ch. 130 (Excellence of Dhikr)',
    isHumanRecording: true,
  },
  dua_evening_entering_night: {
    id: 'dua_evening_entering_night',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(28),
    quranReference: 'Hisn al-Muslim Ch. 27 (Evening Remembrance)',
    isHumanRecording: true,
  },
  dua_evening_perfect_words: {
    id: 'dua_evening_perfect_words',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(28),
    quranReference: 'Hisn al-Muslim Ch. 27 (A‘udhu bi-Kalimatillahit-Tammat)',
    isHumanRecording: true,
  },
  dua_evening_hasbiyallah: {
    id: 'dua_evening_hasbiyallah',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(28),
    quranReference: 'Hisn al-Muslim Ch. 27 (Hasbiyallahu La Ilaha Illa Huwa)',
    isHumanRecording: true,
  },
  dua_evening_peace: {
    id: 'dua_evening_peace',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3',
    quranReference: 'Surah An-Nas 114:1',
    isHumanRecording: true,
  },
  dua_protection_falaq_nas_ikhlas: {
    id: 'dua_protection_falaq_nas_ikhlas',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3',
    quranReference: 'Surah Al-Ikhlas 112:1 (Mu‘awwidhat)',
    isHumanRecording: true,
  },
  dua_protection_children_hasan_husayn: {
    id: 'dua_protection_children_hasan_husayn',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(48),
    quranReference: 'Hisn al-Muslim Ch. 48 (Protection for Children)',
    isHumanRecording: true,
  },
  dua_protection_evil_manners: {
    id: 'dua_protection_evil_manners',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(35),
    quranReference: 'Hisn al-Muslim Ch. 34 (Refuge from Hardship & Evil)',
    isHumanRecording: true,
  },
  dua_protection_anxiety_debt: {
    id: 'dua_protection_anxiety_debt',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(35),
    quranReference: 'Hisn al-Muslim Ch. 34 (Refuge from Anxiety & Debt)',
    isHumanRecording: true,
  },
  dua_distress_yunus: {
    id: 'dua_distress_yunus',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2570.mp3',
    quranReference: 'Quran 21:87 (Supplication of Prophet Yunus)',
    isHumanRecording: true,
  },
  dua_distress_kurb_relief: {
    id: 'dua_distress_kurb_relief',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(36),
    quranReference: 'Hisn al-Muslim Ch. 35 (Invocation for Anguish)',
    isHumanRecording: true,
  },
  dua_distress_ya_hayyu_ya_qayyum: {
    id: 'dua_distress_ya_hayyu_ya_qayyum',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(35),
    quranReference: 'Hisn al-Muslim Ch. 34 (Ya Hayyu Ya Qayyum)',
    isHumanRecording: true,
  },
  dua_distress_easy_task: {
    id: 'dua_distress_easy_task',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(43),
    quranReference: 'Hisn al-Muslim Ch. 43 (When a Task Is Difficult)',
    isHumanRecording: true,
  },
  dua_distress_istirja_calamity: {
    id: 'dua_distress_istirja_calamity',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(53),
    quranReference: 'Hisn al-Muslim Ch. 53 (When Tragedy Strikes)',
    isHumanRecording: true,
  },
  dua_gratitude_muadh_worship: {
    id: 'dua_gratitude_muadh_worship',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(25),
    quranReference: 'Hisn al-Muslim Ch. 24 (Allahumma A‘inni ‘ala Dhikrika)',
    isHumanRecording: true,
  },
  dua_gratitude_seeing_blessing: {
    id: 'dua_gratitude_seeing_blessing',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(123),
    quranReference: 'Hisn al-Muslim Ch. 123 (When Pleased with a Blessing)',
    isHumanRecording: true,
  },
  dua_daily_guidance_taqwa_contentment: {
    id: 'dua_daily_guidance_taqwa_contentment',
    reciterName: 'Hisn al-Muslim Human Audio',
    mp3Url: hisnChapterUrl(129),
    quranReference: 'Hisn al-Muslim Ch. 129 (Seeking Guidance, Taqwa & Forgiveness)',
    isHumanRecording: true,
  },
  dua_forgiveness: {
    id: 'dua_forgiveness',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/293.mp3',
    quranReference: 'Quran 2:286 (Rabbana waghfir lana warhamna)',
    isHumanRecording: true,
  },
  dua_health_healing: {
    id: 'dua_health_healing',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
    mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2566.mp3',
    quranReference: 'Quran 21:83 (Prophet Ayyub’s Supplication for Healing)',
    isHumanRecording: true,
  },
};

/**
 * Resolves the best authentic human MP3 recording for any DuaItem in the library.
 * Uses exact Dua ID match first, then Quranic verse text patterns, then matching
 * Hisn al-Muslim chapter MP3s — never substituting unrelated Surah Al-Fatiha for Hadith Duas.
 */
export function resolveDuaHumanAudio(dua: Pick<DuaItem, 'id' | 'arabic' | 'category' | 'audioUrl'>): HumanAudioDescriptor {
  if (dua.audioUrl) {
    return {
      id: dua.id,
      reciterName: 'Verified Human Recording',
      mp3Url: dua.audioUrl,
      isHumanRecording: true,
    };
  }

  if (HUMAN_DUA_AUDIO_MAP[dua.id]) {
    return HUMAN_DUA_AUDIO_MAP[dua.id];
  }

  const ar = dua.arabic || '';
  if (ar.includes('زِدْنِى عِلْمًا') || ar.includes('زِدْنِي عِلْمًا')) {
    return HUMAN_DUA_AUDIO_MAP.dua_knowledge;
  }
  if (ar.includes('ٱرْحَمْهُمَا') || ar.includes('ارْحَمْهُمَا')) {
    return HUMAN_DUA_AUDIO_MAP.dua_parents;
  }
  if (ar.includes('ءَاتِنَا فِى ٱلدُّنْيَا') || ar.includes('آتِنَا فِي الدُّنْيَا')) {
    return HUMAN_DUA_AUDIO_MAP.dua_rabbana_atina;
  }
  if (ar.includes('سَخَّرَ لَنَا')) {
    return HUMAN_DUA_AUDIO_MAP.dua_travel;
  }
  if (ar.includes('أَنْتَ سُبْحَـٰنَكَ') || ar.includes('سُبْحَانَكَ إِنِّي كُنْتُ')) {
    return HUMAN_DUA_AUDIO_MAP.dua_distress_yunus;
  }
  if (ar.includes('ٱشْرَحْ لِى صَدْرِى') || ar.includes('اشْرَحْ لِي صَدْرِي')) {
    return {
      id: dua.id,
      reciterName: 'Sheikh Mishary Rashid Alafasy',
      mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2373.mp3',
      quranReference: 'Quran 20:25 (Supplication of Prophet Musa)',
      isHumanRecording: true,
    };
  }
  if (ar.includes('لَا تُزِغْ قُلُوبَنَا')) {
    return HUMAN_DUA_AUDIO_MAP.dua_daily_steadfast_heart;
  }
  if (ar.includes('هَبْ لَنَا مِنْ أَزْوَٰجِنَا') || ar.includes('مِنْ أَزْوَاجِنَا')) {
    return HUMAN_DUA_AUDIO_MAP.dua_family_coolness;
  }
  if (ar.includes('حَسْبُنَا ٱللَّهُ') || ar.includes('حَسْبِيَ اللَّهُ')) {
    return {
      id: dua.id,
      reciterName: 'Sheikh Mishary Rashid Alafasy',
      mp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/466.mp3',
      quranReference: 'Quran 3:173 (Hasbunallahu Wa Ni’mal Wakeel)',
      isHumanRecording: true,
    };
  }

  // Category-matched authentic Hisn al-Muslim human chapter MP3s
  switch (dua.category) {
    case 'eating':
      return HUMAN_DUA_AUDIO_MAP.dua_before_eating;
    case 'travel':
      return HUMAN_DUA_AUDIO_MAP.dua_travel_journey;
    case 'sleep':
      return HUMAN_DUA_AUDIO_MAP.dua_sleep;
    case 'waking':
      return HUMAN_DUA_AUDIO_MAP.dua_waking;
    case 'family':
      return HUMAN_DUA_AUDIO_MAP.dua_parents;
    case 'health':
      return HUMAN_DUA_AUDIO_MAP.dua_healing_shifa;
    case 'mosque':
      return HUMAN_DUA_AUDIO_MAP.dua_entering_mosque;
    case 'protection':
      return HUMAN_DUA_AUDIO_MAP.dua_protection_children_hasan_husayn;
    case 'distress':
      return HUMAN_DUA_AUDIO_MAP.dua_distress_kurb_relief;
    case 'gratitude':
      return HUMAN_DUA_AUDIO_MAP.dua_gratitude_muadh_worship;
    case 'forgiveness':
      return HUMAN_DUA_AUDIO_MAP.dua_forgiveness_sayyid;
    case 'morning_evening':
      return HUMAN_DUA_AUDIO_MAP.dua_morning_protection;
    default:
      return HUMAN_DUA_AUDIO_MAP.dua_daily_guidance_taqwa_contentment;
  }
}

export interface OfflineDuaAudioPackStatus {
  uniqueTrackCount: number;
  cachedTrackCount: number;
  totalBytes: number;
}

export async function getOfflineDuaAudioStatus(
  duas: Pick<DuaItem, 'id' | 'arabic' | 'category' | 'audioUrl'>[]
): Promise<OfflineDuaAudioPackStatus> {
  const uniqueUrls = Array.from(new Set(duas.map((d) => resolveDuaHumanAudio(d).mp3Url).filter(Boolean)));
  if (typeof caches === 'undefined') {
    return { uniqueTrackCount: uniqueUrls.length, cachedTrackCount: 0, totalBytes: 0 };
  }
  try {
    const cache = await caches.open(HUMAN_DUA_QAIDA_CACHE_NAME);
    let cachedTrackCount = 0;
    let totalBytes = 0;
    for (const url of uniqueUrls) {
      const match = await cache.match(url);
      if (match) {
        const blob = await match.blob();
        if (blob.size >= 44) {
          cachedTrackCount += 1;
          totalBytes += blob.size;
        }
      }
    }
    return { uniqueTrackCount: uniqueUrls.length, cachedTrackCount, totalBytes };
  } catch {
    return { uniqueTrackCount: uniqueUrls.length, cachedTrackCount: 0, totalBytes: 0 };
  }
}

export async function downloadDuaOfflineAudioPack(params: {
  duas: Pick<DuaItem, 'id' | 'arabic' | 'category' | 'audioUrl'>[];
  signal?: AbortSignal;
  onProgress?: (progress: { completed: number; total: number }) => void;
}): Promise<{ ok: boolean; completed: number; total: number; error?: string }> {
  if (typeof caches === 'undefined') {
    return { ok: false, completed: 0, total: 0, error: 'Cache Storage unavailable on this browser.' };
  }
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return {
      ok: false,
      completed: 0,
      total: 0,
      error: 'Connect to the internet once to download the offline Duas Audio Pack.',
    };
  }

  const uniqueUrls = Array.from(
    new Set(params.duas.map((d) => resolveDuaHumanAudio(d).mp3Url).filter(Boolean))
  );
  const cache = await caches.open(HUMAN_DUA_QAIDA_CACHE_NAME);
  let completed = 0;
  const total = uniqueUrls.length;

  for (const mp3Url of uniqueUrls) {
    if (params.signal?.aborted) {
      return { ok: false, completed, total, error: 'Download cancelled.' };
    }
    const existing = await cache.match(mp3Url);
    if (existing) {
      const existingBlob = await existing.blob();
      const validExisting = await verifyAudioBlobIntegrity(existingBlob);
      if (validExisting.valid) {
        completed += 1;
        params.onProgress?.({ completed, total });
        continue;
      }
      await cache.delete(mp3Url);
    }

    try {
      const response = await fetch(mp3Url, { signal: params.signal });
      if (!response.ok) {
        return {
          ok: false,
          completed,
          total,
          error: `Could not download verified Dua audio (${response.status}).`,
        };
      }
      const blob = await response.blob();
      const integrity = await verifyAudioBlobIntegrity(blob);
      if (!integrity.valid) {
        return {
          ok: false,
          completed,
          total,
          error: integrity.reason || 'Downloaded Dua audio failed integrity verification.',
        };
      }
      await cache.put(
        mp3Url,
        new Response(blob, {
          headers: {
            'Content-Type': blob.type || 'audio/mpeg',
            'X-Ilmizo-Audio-Version': 'v1',
          },
        })
      );
      completed += 1;
      params.onProgress?.({ completed, total });
    } catch {
      return {
        ok: false,
        completed,
        total,
        error: 'Network interrupted while downloading Duas Audio Pack. Tap Download again to resume.',
      };
    }
  }

  return { ok: true, completed, total };
}

export async function clearOfflineDuaAudioPack(): Promise<void> {
  if (typeof caches === 'undefined') return;
  try {
    await caches.delete(HUMAN_DUA_QAIDA_CACHE_NAME);
  } catch {
    // ignore clear failure
  }
}

/**
 * Plays a Dua with authentic human Qari / Hisn al-Muslim MP3 audio (Cache Storage first).
 * Never substitutes robotic TTS when offline & uncached — surfaces honest offline unavailable guidance instead.
 */
export async function playHumanDuaAudio(params: {
  dua: Pick<DuaItem, 'id' | 'arabic' | 'category' | 'audioUrl'>;
  rate?: number;
  onStatus?: (msg: string) => void;
}): Promise<HumanAudioDescriptor> {
  const descriptor = resolveDuaHumanAudio(params.dua);
  let resolvedUrl: string | undefined = descriptor.mp3Url;
  let fromOfflineCache = false;

  if (typeof caches !== 'undefined') {
    try {
      const cache = await caches.open(HUMAN_DUA_QAIDA_CACHE_NAME);
      const cachedResp = await cache.match(descriptor.mp3Url);
      if (cachedResp) {
        const blob = await cachedResp.blob();
        const integrity = await verifyAudioBlobIntegrity(blob);
        if (integrity.valid && typeof URL !== 'undefined' && URL.createObjectURL) {
          resolvedUrl = URL.createObjectURL(blob);
          fromOfflineCache = true;
        } else if (!integrity.valid) {
          await cache.delete(descriptor.mp3Url);
        }
      }
    } catch {
      // Fallback to direct CDN check below
    }
  }

  const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
  if (!fromOfflineCache && isOffline) {
    resolvedUrl = undefined;
  }

  const offlineMsg =
    'This Dua audio is not downloaded yet. Connect once or download the Duas Audio Pack in Storage Hub.';

  audioManager.playAudioUrl({
    id: `human_dua_${params.dua.id}`,
    url: resolvedUrl,
    allowTtsFallback: false,
    offlineUnavailableMessage: offlineMsg,
    rate: params.rate || 1,
    onError: (err) => {
      if (params.onStatus) params.onStatus(err);
    },
  });

  if (params.onStatus && (fromOfflineCache || !isOffline)) {
    params.onStatus(
      fromOfflineCache
        ? `Playing Offline Dua Audio (${descriptor.reciterName})`
        : `Playing Human Qari Audio (${descriptor.reciterName})`
    );
  }

  return descriptor;
}

/**
 * Complete 28-Letter Noorani Qaida & Arabic Alphabet with Harakat, Makharij tips,
 * and Real Human Qari MP3 Audio (Sheikh Mishary Rashid Alafasy).
 */
const RAW_NOORANI_QAIDA_28_LETTERS: Omit<QaidaLetterItem, 'letterAudioMp3Url'>[] = [
  {
    number: 1,
    id: 'qaida_01_alif',
    letterArabic: 'أ / ا',
    nameEn: 'Alif',
    nameAr: 'أَلِف',
    harakatForms: { fatha: 'أَ (A)', kasra: 'إِ (I)', damma: 'أُ (U)', phonetic: 'a / i / u' },
    makhrajTip: {
      en: 'Pronounced clearly from the lower throat (Hamzah) or open mouth cavity (Alif Madd).',
      hi: 'गले के निचले हिस्से से साफ़ अदा करें (अलिफ़ / हम्ज़ा)।',
      ur: 'حلق کے نچلے حصے سے صاف ادا کریں (الف / ہمزہ)۔',
      hinglish: 'Throat ke lower part se clear aawaz mein padhein (Alif / Hamzah).',
      ar: 'مخرج الهمزة من أقصى الحلق والألف المدية من الجوف.',
    },
    quranExampleWord: 'ٱللَّهُ أَحَدٌ',
    quranExampleTranslit: 'Allahu Ahad',
    quranExampleMeaning: {
      en: 'Allah, the One (Surah Al-Ikhlas 112:1)',
      hi: 'अल्लाह एक है (सूरह अल-इख़लास 112:1)',
      ur: 'اللّٰہ ایک ہے (سورۃ الاخلاص 112:1)',
      hinglish: 'Allah Ek hai (Surah Al-Ikhlas 112:1)',
      ar: 'اللَّهُ أَحَدٌ',
    },
    quranAyahRef: '112:1',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 2,
    id: 'qaida_02_baa',
    letterArabic: 'ب',
    nameEn: 'Baa',
    nameAr: 'بَاء',
    harakatForms: { fatha: 'بَ (Ba)', kasra: 'بِ (Bi)', damma: 'بُ (Bu)', phonetic: 'ba / bi / bu' },
    makhrajTip: {
      en: 'Press both lips together gently; has a Qalqalah bounce when silent (بْ).',
      hi: 'दोनों होंठों को मिलाकर अदा करें; साकिन होने पर क़लक़ला (गूंज) होता है।',
      ur: 'دونوں ہونٹوں کے تر حصے کو ملا کر ادا کریں۔',
      hinglish: 'Dono lips ko mila kar padhein; sukoon par Qalqalah bounce hota hai.',
      ar: 'من انطباق الشفتين مع القلقلة عند السكون.',
    },
    quranExampleWord: 'بِسْمِ ٱللَّهِ',
    quranExampleTranslit: 'Bismillahi',
    quranExampleMeaning: {
      en: 'In the Name of Allah (1:1)',
      hi: 'अल्लाह के नाम से (1:1)',
      ur: 'اللّٰہ کے نام سے (1:1)',
      hinglish: 'Allah ke naam se (1:1)',
      ar: 'بِسْمِ اللَّهِ',
    },
    quranAyahRef: '1:1',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 3,
    id: 'qaida_03_taa',
    letterArabic: 'ت',
    nameEn: 'Taa',
    nameAr: 'تَاء',
    harakatForms: { fatha: 'تَ (Ta)', kasra: 'تِ (Ti)', damma: 'تُ (Tu)', phonetic: 'ta / ti / tu' },
    makhrajTip: {
      en: 'Touch the tip of the tongue softly to the base of the upper front teeth.',
      hi: 'ज़ुबान की नोक को ऊपर के सामने वाले दांतों की जड़ से लगाएं।',
      ur: 'زبان کی نوک کو اوپر کے سامنے والے دانتوں کی جڑ سے لگائیں۔',
      hinglish: 'Tongue ki tip ko upper front teeth ke base se softly touch karein.',
      ar: 'من طرف اللسان مع أصول الثنايا العليا.',
    },
    quranExampleWord: 'تَبَّتْ يَدَا',
    quranExampleTranslit: 'Tabbat Yadaa',
    quranExampleMeaning: {
      en: 'Perished are the hands (111:1)',
      hi: 'टूट गए दोनों हाथ (111:1)',
      ur: 'ٹوٹ گئے دونوں ہاتھ (111:1)',
      hinglish: 'Tabah ho gaye dono haath (111:1)',
      ar: 'تَبَّتْ يَدَا',
    },
    quranAyahRef: '111:1',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6217.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 4,
    id: 'qaida_04_thaa',
    letterArabic: 'ث',
    nameEn: 'Thaa',
    nameAr: 'ثَاء',
    harakatForms: { fatha: 'ثَ (Tha)', kasra: 'ثِ (Thi)', damma: 'ثُ (Thu)', phonetic: 'tha / thi / thu' },
    makhrajTip: {
      en: 'Touch the tip of the tongue gently to the edges of the upper front teeth (soft "th" as in "think").',
      hi: 'ज़ुबान की नोक को ऊपर के दांतों के किनारे से नरमी के साथ लगाएं (सीटी न बजे)।',
      ur: 'زبان کی نوک کو اوپر کے دانتوں کے کنارے سے نرمی سے لگائیں۔',
      hinglish: 'Tongue ki tip ko upper teeth ke edge par rakhein (soft "th" jaise "thank").',
      ar: 'من طرف اللسان مع أطراف الثنايا العليا برفق.',
    },
    quranExampleWord: 'ٱلْكَوْثَرَ',
    quranExampleTranslit: 'Al-Kawthar',
    quranExampleMeaning: {
      en: 'Abundant Good / River of Al-Kawthar (108:1)',
      hi: 'हौज़-ए-कौसर और ढेर सारी भलाई (108:1)',
      ur: 'حوضِ کوثر اور خیرِ کثیر (108:1)',
      hinglish: 'Al-Kawthar (Abundant Good - 108:1)',
      ar: 'الْكَوْثَرَ',
    },
    quranAyahRef: '108:1',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6205.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 5,
    id: 'qaida_05_jeem',
    letterArabic: 'ج',
    nameEn: 'Jeem',
    nameAr: 'جِيم',
    harakatForms: { fatha: 'جَ (Ja)', kasra: 'جِ (Ji)', damma: 'جُ (Ju)', phonetic: 'ja / ji / ju' },
    makhrajTip: {
      en: 'Middle of the tongue rises to the roof of the palate; Qalqalah letter when silent.',
      hi: 'ज़ुबान के बीच के हिस्से को तालू से मिलाकर मज़बूती से अदा करें।',
      ur: 'زبان کے درمیان کو تالو سے ملا کر ادا کریں۔',
      hinglish: 'Middle of tongue ko roof of mouth se touch karein.',
      ar: 'من وسط اللسان مع ما يحاذيه من الحنك الأعلى.',
    },
    quranExampleWord: 'إِذَا جَآءَ نَصْرُ ٱللَّهِ',
    quranExampleTranslit: 'Idha Jaa-a Nasrullahi',
    quranExampleMeaning: {
      en: 'When the victory of Allah comes (110:1)',
      hi: 'जब अल्लाह की मदद आ जाए (110:1)',
      ur: 'جب اللّٰہ کی مدد آ جائے (110:1)',
      hinglish: 'Jab Allah ki madad aa jaye (110:1)',
      ar: 'إِذَا جَاءَ نَصْرُ اللَّهِ',
    },
    quranAyahRef: '110:1',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6214.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 6,
    id: 'qaida_06_haa_sharp',
    letterArabic: 'ح',
    nameEn: 'Haa (Sharp Throat)',
    nameAr: 'حَاء',
    harakatForms: { fatha: 'حَ (Ha)', kasra: 'حِ (Hi)', damma: 'حُ (Hu)', phonetic: 'ha / hi / hu' },
    makhrajTip: {
      en: 'Smooth, airy whisper from the middle of the throat.',
      hi: 'गले के बीच के हिस्से से साफ़ और नरम आवाज़ निकालें (बड़ा हा)।',
      ur: 'حلق کے درمیانی حصے سے صاف آواز نکالیں (حائے حطی)۔',
      hinglish: 'Middle throat se smooth breathy sound nikalein.',
      ar: 'من وسط الحلق بصوت صافٍ غير مخدوش.',
    },
    quranExampleWord: 'ٱلْحَمْدُ لِلَّهِ',
    quranExampleTranslit: 'Al-Hamdu Lillahi',
    quranExampleMeaning: {
      en: 'All praise belongs to Allah (1:2)',
      hi: 'तमाम तारीफ़ अल्लाह के लिए है (1:2)',
      ur: 'تمام تعریف اللّٰہ کے لیے ہے (1:2)',
      hinglish: 'Sab tareef Allah ke liye hai (1:2)',
      ar: 'الْحَمْدُ لِلَّهِ',
    },
    quranAyahRef: '1:2',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 7,
    id: 'qaida_07_khaa',
    letterArabic: 'خ',
    nameEn: 'Khaa',
    nameAr: 'خَاء',
    harakatForms: { fatha: 'خَ (Kha)', kasra: 'خِ (Khi)', damma: 'خُ (Khu)', phonetic: 'kha / khi / khu' },
    makhrajTip: {
      en: 'Upper throat with heavy Tafkheem resonance.',
      hi: 'गले के ऊपरी हिस्से से मोटी आवाज़ में अदा करें।',
      ur: 'حلق کے اوپری حصے سے پر (موٹا) کر کے ادا کریں۔',
      hinglish: 'Upper throat se heavy sound ke saath padhein.',
      ar: 'من أدنى الحلق مع التفخيم.',
    },
    quranExampleWord: 'مِن شَرِّ مَا خَلَقَ',
    quranExampleTranslit: 'Min sharri maa khalaq',
    quranExampleMeaning: {
      en: 'From the evil of what He created (113:2)',
      hi: 'हर उस चीज़ की बुराई से जो उसने पैदा की (113:2)',
      ur: 'ہر اس چیز کے شر سے جو اس نے پیدا کی (113:2)',
      hinglish: 'Har us cheez ke shar se jo Usne paida ki (113:2)',
      ar: 'مِنْ شَرِّ مَا خَلَقَ',
    },
    quranAyahRef: '113:2',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6227.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 8,
    id: 'qaida_08_daal',
    letterArabic: 'د',
    nameEn: 'Daal',
    nameAr: 'دَال',
    harakatForms: { fatha: 'دَ (Da)', kasra: 'دِ (Di)', damma: 'دُ (Du)', phonetic: 'da / di / du' },
    makhrajTip: {
      en: 'Tip of the tongue against the base of the upper front teeth; Qalqalah letter.',
      hi: 'ज़ुबान की नोक को ऊपर के दांतों की जड़ से लगाएं; साकिन होने पर क़लक़ला करें।',
      ur: 'زبان کی نوک کو اوپر کے دانتوں کی جڑ سے لگائیں۔',
      hinglish: 'Tongue tip at upper teeth base; Qalqalah bounce when silent.',
      ar: 'من طرف اللسان مع أصول الثنايا العليا.',
    },
    quranExampleWord: 'مَـٰلِكِ يَوْمِ ٱلدِّينِ',
    quranExampleTranslit: 'Maliki Yawmid-Deen',
    quranExampleMeaning: {
      en: 'Master of the Day of Judgment (1:4)',
      hi: 'बदले के दिन का मालिक (1:4)',
      ur: 'روزِ جزا کا مالک (1:4)',
      hinglish: 'Roz-e-Jaza ka Maalik (1:4)',
      ar: 'مَالِكِ يَوْمِ الدِّينِ',
    },
    quranAyahRef: '1:4',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 9,
    id: 'qaida_09_dhaal',
    letterArabic: 'ذ',
    nameEn: 'Dhaal',
    nameAr: 'ذَال',
    harakatForms: { fatha: 'ذَ (Dha)', kasra: 'ذِ (Dhi)', damma: 'ذُ (Dhu)', phonetic: 'dha / dhi / dhu' },
    makhrajTip: {
      en: 'Tip of the tongue gently touching the edge of upper front teeth (like "this" in English).',
      hi: 'ज़ुबान की नोक को ऊपर के दांतों के किनारे से नरमी से लगाएं (ज़ की तरह सीटी न बजे)।',
      ur: 'زبان کی نوک کو اوپر کے دانتوں کے کنارے سے نرمی سے لگائیں۔',
      hinglish: 'Tongue tip ko upper teeth edge se softly touch karein (jaise English "this").',
      ar: 'من طرف اللسان مع أطراف الثنايا العليا بدون صفير.',
    },
    quranExampleWord: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ',
    quranExampleTranslit: "Qul A'oodhu Bi-Rabbil-Falaq",
    quranExampleMeaning: {
      en: 'Say: I seek refuge in the Lord of Daybreak (113:1)',
      hi: 'कहिए: मैं सुबह के रब की पनाह मांगता हूँ (113:1)',
      ur: 'کہیے: میں صبح کے رب کی پناہ مانگتا ہوں (113:1)',
      hinglish: 'Kahiye: Main subah ke Rabb ki panaah maangta hoon (113:1)',
      ar: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
    },
    quranAyahRef: '113:1',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 10,
    id: 'qaida_10_raa',
    letterArabic: 'ر',
    nameEn: 'Raa',
    nameAr: 'رَاء',
    harakatForms: { fatha: 'رَ (Ra)', kasra: 'رِ (Ri)', damma: 'رُ (Ru)', phonetic: 'ra / ri / ru' },
    makhrajTip: {
      en: 'Tip of the tongue against the front gums; heavy with Fatha/Damma, light with Kasra.',
      hi: 'ज़ुबान की नोक को मसूड़ों से लगाएं; ज़बर/पेश पर मोटा और ज़ेर पर बारीक पढ़ें।',
      ur: 'زبان کی نوک کو مسوڑھوں سے لگائیں؛ زبر/پیش پر موٹا اور زیر پر باریک پڑھیں۔',
      hinglish: 'Fatha/Damma par heavy (pur) aur Kasra par light (bareek) padhein.',
      ar: 'من طرف اللسان مع لثة الثنايا العليا.',
    },
    quranExampleWord: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
    quranExampleTranslit: 'Ar-Rahmanir-Raheem',
    quranExampleMeaning: {
      en: 'The Most Gracious, the Most Merciful (1:3)',
      hi: 'बेहद रहम करने वाला, निहायत मेहरबान (1:3)',
      ur: 'بڑا مہربان، نہایت رحم والا (1:3)',
      hinglish: 'Bada Meherbaan, Nihayat Reham Wala (1:3)',
      ar: 'الرَّحْمَٰنِ الرَّحِيمِ',
    },
    quranAyahRef: '1:3',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 11,
    id: 'qaida_11_zaay',
    letterArabic: 'ز',
    nameEn: 'Zaay',
    nameAr: 'زَاي',
    harakatForms: { fatha: 'زَ (Za)', kasra: 'زِ (Zi)', damma: 'زُ (Zu)', phonetic: 'za / zi / zu' },
    makhrajTip: {
      en: 'Crisp buzzing sound with the tip of the tongue near the lower front teeth.',
      hi: 'ज़ुबान की नोक को दांतों के क़रीब रखकर साफ़ भनभनाहट (सफ़ीर) के साथ अदा करें।',
      ur: 'زبان کی نوک سے صاف سیٹی دار آواز (صفیر) کے ساتھ ادا کریں۔',
      hinglish: 'Crisp buzzing "Z" sound ke saath padhein.',
      ar: 'من طرف اللسان مع الصفير الواضح.',
    },
    quranExampleWord: 'إِذَا زُلْزِلَتِ ٱلْأَرْضُ',
    quranExampleTranslit: 'Idha Zulzilatil-Ardu',
    quranExampleMeaning: {
      en: 'When the earth is shaken with its earthquake (99:1)',
      hi: 'जब ज़मीन अपने ज़लज़ले से हिला दी जाएगी (99:1)',
      ur: 'جب زمین اپنے زلزلے سے ہلا دی جائے گی (99:1)',
      hinglish: 'Jab zameen apne zalzale se hila di jayegi (99:1)',
      ar: 'إِذَا زُلْزِلَتِ الْأَرْضُ',
    },
    quranAyahRef: '99:1',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6139.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 12,
    id: 'qaida_12_seen',
    letterArabic: 'س',
    nameEn: 'Seen',
    nameAr: 'سِين',
    harakatForms: { fatha: 'سَ (Sa)', kasra: 'سِ (Si)', damma: 'سُ (Su)', phonetic: 'sa / si / su' },
    makhrajTip: {
      en: 'Light, clear whistling "s" sound from the tip of the tongue.',
      hi: 'ज़ुबान की नोक से बारीक और साफ़ "स" की आवाज़ निकालें।',
      ur: 'زبان کی نوک سے باریک اور صاف سین ادا کریں۔',
      hinglish: 'Light aur clear "S" sound ke saath padhein.',
      ar: 'من طرف اللسان مع الترقيق والصفير.',
    },
    quranExampleWord: 'بِرَبِّ ٱلنَّاسِ',
    quranExampleTranslit: 'Bi-Rabbin-Naas',
    quranExampleMeaning: {
      en: 'In the Lord of Mankind (114:1)',
      hi: 'इंसानों के रब की पनाह में (114:1)',
      ur: 'انسانوں کے رب کی پناہ میں (114:1)',
      hinglish: 'Insanon ke Rabb ki panaah mein (114:1)',
      ar: 'بِرَبِّ النَّاسِ',
    },
    quranAyahRef: '114:1',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 13,
    id: 'qaida_13_sheen',
    letterArabic: 'ش',
    nameEn: 'Sheen',
    nameAr: 'شِين',
    harakatForms: { fatha: 'شَ (Sha)', kasra: 'شِ (Shi)', damma: 'شُ (Shu)', phonetic: 'sha / shi / shu' },
    makhrajTip: {
      en: 'Middle of the tongue with a soft spreading breath (Tafasshi - "sh").',
      hi: 'ज़ुबान के बीच से हवा फैलने की नरम आवाज़ ("श") के साथ पढ़ें।',
      ur: 'زبان کے درمیان سے ہوا پھیلنے کی صفت (تفشی) کے ساتھ ادا کریں۔',
      hinglish: 'Middle tongue se soft spreading "Sh" sound nikalein.',
      ar: 'من وسط اللسان مع صفة التفشي.',
    },
    quranExampleWord: 'وَٱلشَّمْسِ وَضُحَىٰهَا',
    quranExampleTranslit: 'Wash-shamsi wa duhaaha',
    quranExampleMeaning: {
      en: 'By the sun and its brightness (91:1)',
      hi: 'सूरज और उसकी धूप की क़सम (91:1)',
      ur: 'سورج اور اس کی دھوپ کی قسم (91:1)',
      hinglish: 'Suraj aur uski roshni ki qasam (91:1)',
      ar: 'وَالشَّمْسِ وَضُحَاهَا',
    },
    quranAyahRef: '91:1',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6044.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 14,
    id: 'qaida_14_saad',
    letterArabic: 'ص',
    nameEn: 'Saad',
    nameAr: 'صَاد',
    harakatForms: { fatha: 'صَ (Saa)', kasra: 'صِ (Sii)', damma: 'صُ (Suu)', phonetic: 'heavy s' },
    makhrajTip: {
      en: 'Heavy, full-mouth "S" sound with raised back of the tongue (Tafkheem).',
      hi: 'मुंह भर कर मोटी आवाज़ में "स़ाद" अदा करें (सीन से अलग)।',
      ur: 'منہ بھر کر پر (موٹی) آواز میں صاد ادا کریں۔',
      hinglish: 'Full-mouth heavy "Saad" sound ke saath padhein.',
      ar: 'من طرف اللسان مع الاستعلاء والإطباق والصفير.',
    },
    quranExampleWord: 'ٱللَّهُ ٱلصَّمَدُ',
    quranExampleTranslit: 'Allahus-Samad',
    quranExampleMeaning: {
      en: 'Allah, the Eternal Refuge (112:2)',
      hi: 'अल्लाह बेनियाज़ है (112:2)',
      ur: 'اللّٰہ بے نیاز ہے (112:2)',
      hinglish: 'Allah Be-niyaz Maalik hai (112:2)',
      ar: 'اللَّهُ الصَّمَدُ',
    },
    quranAyahRef: '112:2',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6223.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 15,
    id: 'qaida_15_daad',
    letterArabic: 'ض',
    nameEn: 'Daad',
    nameAr: 'ضَاد',
    harakatForms: { fatha: 'ضَ (Daa)', kasra: 'ضِ (Dii)', damma: 'ضُ (Duu)', phonetic: 'heavy d' },
    makhrajTip: {
      en: 'Side of the tongue pressing against the upper molars with heavy resonance.',
      hi: 'ज़ुबान की करवट (किनारे) को ऊपर की दाढ़ों से लगाकर मोटा पढ़ें।',
      ur: 'زبان کی کروٹ کو اوپر کی داڑھوں سے لگا کر پر پڑھیں۔',
      hinglish: 'Side of tongue ko upper molars se touch karke heavy sound nikalein.',
      ar: 'من حافة اللسان مع ما يحاذيها من الأضراس العليا.',
    },
    quranExampleWord: 'وَلَا ٱلضَّآلِّينَ',
    quranExampleTranslit: 'Wa-lad-Daalleen',
    quranExampleMeaning: {
      en: 'Nor of those who went astray (1:7)',
      hi: 'और न ही गुमराह होने वालों का (1:7)',
      ur: 'اور نہ ہی گمراہ ہونے والوں کا (1:7)',
      hinglish: 'Aur na hi bhatakne walon ka (1:7)',
      ar: 'وَلَا الضَّالِّينَ',
    },
    quranAyahRef: '1:7',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 16,
    id: 'qaida_16_taa_heavy',
    letterArabic: 'ط',
    nameEn: 'Taa (Heavy)',
    nameAr: 'طَاء',
    harakatForms: { fatha: 'طَ (Taa)', kasra: 'طِ (Tii)', damma: 'طُ (Tuu)', phonetic: 'heavy t' },
    makhrajTip: {
      en: 'Strongest heavy letter (Tafkheem) with Qalqalah when silent.',
      hi: 'ज़ुबान की नोक और ऊपर के दांतों की जड़ से बहुत मोटी आवाज़ में अदा करें।',
      ur: 'سب سے قوی تفخیم والا حرف؛ ساکن ہونے پر قلقلہ کریں۔',
      hinglish: 'Full-mouth heavy "T" sound; sukoon par Qalqalah karein.',
      ar: 'أقوى الحروف تفخيماً وإطباقاً مع القلقلة عند السكون.',
    },
    quranExampleWord: 'ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
    quranExampleTranslit: 'As-Siraatal-Mustaqeem',
    quranExampleMeaning: {
      en: 'The Straight Path (1:6)',
      hi: 'सीधा और सच्चा रास्ता (1:6)',
      ur: 'سیدھا اور سچا راستہ (1:6)',
      hinglish: 'Seedha aur sacha raasta (1:6)',
      ar: 'الصِّرَاطَ الْمُسْتَقِيمَ',
    },
    quranAyahRef: '1:6',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 17,
    id: 'qaida_17_zaa_heavy',
    letterArabic: 'ظ',
    nameEn: 'Zaa (Heavy)',
    nameAr: 'ظَاء',
    harakatForms: { fatha: 'ظَ (Zaa)', kasra: 'ظِ (Zii)', damma: 'ظُ (Zuu)', phonetic: 'heavy dh' },
    makhrajTip: {
      en: 'Tip of the tongue at upper teeth edge like Dhaal, but pronounced heavy and full-mouth.',
      hi: 'ज़ुबान की नोक को दांतों के किनारे से लगाकर मोटी आवाज़ में अदा करें।',
      ur: 'زبان کی نوک کو دانتوں کے کنارے سے لگا کر پر (موٹا) پڑھیں۔',
      hinglish: 'Tongue tip at upper teeth edge with full-mouth heavy tone.',
      ar: 'من طرف اللسان مع أطراف الثنايا العليا مع التفخيم والإطباق.',
    },
    quranExampleWord: 'أَنقَضَ ظَهْرَكَ',
    quranExampleTranslit: 'Anqada Zahrak',
    quranExampleMeaning: {
      en: 'Which weighed heavily on your back (94:3)',
      hi: 'जिसने आपकी कमर पर बोझ डाल रखा था (94:3)',
      ur: 'جس نے آپ کی کمر پر بوجھ ڈال رکھا تھا (94:3)',
      hinglish: 'Jisne aapki kamar par bojh daal rakha tha (94:3)',
      ar: 'أَنْقَضَ ظَهْرَكَ',
    },
    quranAyahRef: '94:3',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6093.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 18,
    id: 'qaida_18_ayn',
    letterArabic: 'ع',
    nameEn: 'Ayn',
    nameAr: 'عَيْن',
    harakatForms: { fatha: 'عَ (\'A)', kasra: 'عِ (\'I)', damma: 'عُ (\'U)', phonetic: '\'a / \'i / \'u' },
    makhrajTip: {
      en: 'Deep, resonant sound from the middle of the throat.',
      hi: 'गले के बीच के हिस्से को हल्का दबाकर साफ़ "ऐन" अदा करें।',
      ur: 'حلق کے درمیانی حصے سے واضح عین ادا کریں۔',
      hinglish: 'Middle throat se deep clear "Ayn" sound nikalein.',
      ar: 'من وسط الحلق مع التوسط والبيان.',
    },
    quranExampleWord: 'إِيَّاكَ نَعْبُدُ',
    quranExampleTranslit: "Iyyaka Na'budu",
    quranExampleMeaning: {
      en: 'You alone we worship (1:5)',
      hi: 'हम सिर्फ़ तेरी ही इबादत करते हैं (1:5)',
      ur: 'ہم صرف تیری ہی عبادت کرتے ہیں (1:5)',
      hinglish: 'Hum sirf Teri hi ibadat karte hain (1:5)',
      ar: 'إِيَّاكَ نَعْبُدُ',
    },
    quranAyahRef: '1:5',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 19,
    id: 'qaida_19_ghayn',
    letterArabic: 'غ',
    nameEn: 'Ghayn',
    nameAr: 'غَيْن',
    harakatForms: { fatha: 'غَ (Gha)', kasra: 'غِ (Ghi)', damma: 'غُ (Ghu)', phonetic: 'gha / ghi / ghu' },
    makhrajTip: {
      en: 'Smooth, heavy sound from the upper throat.',
      hi: 'गले के ऊपरी हिस्से से मोटी और नरम आवाज़ में "ग़ैन" अदा करें।',
      ur: 'حلق کے اوپری حصے سے پر (موٹا) کر کے غین ادا کریں۔',
      hinglish: 'Upper throat se smooth heavy "Gh" sound nikalein.',
      ar: 'من أدنى الحلق مع الرخاوة والتفخيم.',
    },
    quranExampleWord: 'غَيْرِ ٱلْمَغْضُوبِ',
    quranExampleTranslit: 'Ghayril-Maghdoobi',
    quranExampleMeaning: {
      en: 'Not of those who earned wrath (1:7)',
      hi: 'न कि उन लोगों का जिन पर ग़ज़ब हुआ (1:7)',
      ur: 'نہ کہ ان لوگوں کا جن پر غضب ہوا (1:7)',
      hinglish: 'Na ki un logon ka jin par naraazgi hui (1:7)',
      ar: 'غَيْرِ الْمَغْضُوبِ',
    },
    quranAyahRef: '1:7',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 20,
    id: 'qaida_20_faa',
    letterArabic: 'ف',
    nameEn: 'Faa',
    nameAr: 'فَاء',
    harakatForms: { fatha: 'فَ (Fa)', kasra: 'فِ (Fi)', damma: 'فُ (Fu)', phonetic: 'fa / fi / fu' },
    makhrajTip: {
      en: 'Edges of upper front teeth lightly touching the inside of the lower lip.',
      hi: 'ऊपर के दांतों के किनारे को नीचे के होंठ के अंदरूनी हिस्से से लगाएं।',
      ur: 'اوپر کے دانتوں کے کنارے کو نیچے کے ہونٹ کے اندرونی حصے سے لگائیں۔',
      hinglish: 'Upper teeth edge ko lower lip ke andar touch karein.',
      ar: 'من أطراف الثنايا العليا مع بطن الشفة السفلى.',
    },
    quranExampleWord: 'فَصَلِّ لِرَبِّكَ',
    quranExampleTranslit: 'Fa-salli Li-Rabbika',
    quranExampleMeaning: {
      en: 'So pray to your Lord (108:2)',
      hi: 'तो अपने रब के लिए नमाज़ पढ़िए (108:2)',
      ur: 'پس اپنے رب کے لیے نماز پڑھیے (108:2)',
      hinglish: 'Toh apne Rabb ke liye Namaz padhiye (108:2)',
      ar: 'فَصَلِّ لِرَبِّكَ',
    },
    quranAyahRef: '108:2',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6206.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 21,
    id: 'qaida_21_qaaf',
    letterArabic: 'ق',
    nameEn: 'Qaaf',
    nameAr: 'قَاف',
    harakatForms: { fatha: 'قَ (Qa)', kasra: 'قِ (Qi)', damma: 'قُ (Qu)', phonetic: 'deep q' },
    makhrajTip: {
      en: 'Deepest back of the tongue touching the soft palate; heavy with Qalqalah when silent.',
      hi: 'ज़ुबान की जड़ को नरम तालू से लगाकर मोटा "क़ाफ़" पढ़ें (क़लक़ला के साथ)।',
      ur: 'زبان کی جڑ کو نرم تالو سے لگا کر موٹا قاف ادا کریں۔',
      hinglish: 'Back of tongue se deep heavy "Qaaf" padhein; Qalqalah letter.',
      ar: 'من أقصى اللسان مع الحنك اللحمي مع التفخيم والقلقلة.',
    },
    quranExampleWord: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
    quranExampleTranslit: 'Qul Huwallahu Ahad',
    quranExampleMeaning: {
      en: 'Say: He is Allah, the One (112:1)',
      hi: 'कहिए: वह अल्लाह एक है (112:1)',
      ur: 'کہیے: وہ اللّٰہ ایک ہے (112:1)',
      hinglish: 'Kahiye: Woh Allah Ek hai (112:1)',
      ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    },
    quranAyahRef: '112:1',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 22,
    id: 'qaida_22_kaaf',
    letterArabic: 'ك',
    nameEn: 'Kaaf',
    nameAr: 'كَاف',
    harakatForms: { fatha: 'كَ (Ka)', kasra: 'كِ (Ki)', damma: 'كُ (Ku)', phonetic: 'ka / ki / ku' },
    makhrajTip: {
      en: 'Light "k" sound slightly forward from Qaaf, with a gentle breath release (Hams).',
      hi: 'क़ाफ़ से थोड़ा आगे तालू से बारीक और साफ़ "काफ़" अदा करें।',
      ur: 'قاف سے ذرا آگے تالو سے باریک کاف ادا کریں۔',
      hinglish: 'Light "K" sound (Qaaf se halka aur aage).',
      ar: 'من أقصى اللسان أسفل مخرج القاف قليلاً مع الترقيق والهمس.',
    },
    quranExampleWord: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ',
    quranExampleTranslit: 'Wa-lam yakul-lahu kufuwan ahad',
    quranExampleMeaning: {
      en: 'And there is none comparable to Him (112:4)',
      hi: 'और कोई उसके बराबर नहीं है (112:4)',
      ur: 'اور کوئی اس کے برابر نہیں ہے (112:4)',
      hinglish: 'Aur koi Uske barabar nahi hai (112:4)',
      ar: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
    },
    quranAyahRef: '112:4',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 23,
    id: 'qaida_23_laam',
    letterArabic: 'ل',
    nameEn: 'Laam',
    nameAr: 'لَام',
    harakatForms: { fatha: 'لَ (La)', kasra: 'لِ (Li)', damma: 'لُ (Lu)', phonetic: 'la / li / lu' },
    makhrajTip: {
      en: 'Front edge of the tongue touching the upper gums.',
      hi: 'ज़ुबान के अगले किनारे को ऊपर के मसूड़ों से लगाकर अदा करें।',
      ur: 'زبان کے اگلے کنارے کو اوپر کے مسوڑھوں سے لگائیں۔',
      hinglish: 'Front edge of tongue touching upper gums.',
      ar: 'من أدنى حافتي اللسان إلى منتهى طرفه مع اللثة العليا.',
    },
    quranExampleWord: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
    quranExampleTranslit: 'Lam yalid wa-lam yoolad',
    quranExampleMeaning: {
      en: 'He neither begets nor is born (112:3)',
      hi: 'न उसने किसी को जना और न वह जना गया (112:3)',
      ur: 'نہ اس نے کسی کو جنا اور نہ وہ جنا گیا (112:3)',
      hinglish: 'Na Usne kisi ko jana aur na Woh paida hua (112:3)',
      ar: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
    },
    quranAyahRef: '112:3',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6224.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 24,
    id: 'qaida_24_meem',
    letterArabic: 'م',
    nameEn: 'Meem',
    nameAr: 'مِيم',
    harakatForms: { fatha: 'مَ (Ma)', kasra: 'مِ (Mi)', damma: 'مُ (Mu)', phonetic: 'ma / mi / mu' },
    makhrajTip: {
      en: 'Close both lips gently; hold nasal Ghunnah for 2 beats when Meem has Shaddah (مّ).',
      hi: 'दोनों होंठ मिलाकर पढ़ें; तश्दीद (مّ) होने पर 2 हरकत ग़ुन्ना करें।',
      ur: 'دونوں ہونٹ ملا کر پڑھیں؛ تشدید (مّ) پر دو حرکت غنہ کریں۔',
      hinglish: 'Both lips close karein; Meem Mushaddadah (مّ) par 2 beats Ghunnah karein.',
      ar: 'من انطباق الشفتين مع الغنة في الخيشوم.',
    },
    quranExampleWord: 'مَلِكِ ٱلنَّاسِ',
    quranExampleTranslit: 'Malikin-Naas',
    quranExampleMeaning: {
      en: 'The Sovereign King of Mankind (114:2)',
      hi: 'इंसानों का बादशाह (114:2)',
      ur: 'انسانوں کا بادشاہ (114:2)',
      hinglish: 'Insanon ka Badshah (114:2)',
      ar: 'مَلِكِ النَّاسِ',
    },
    quranAyahRef: '114:2',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6232.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 25,
    id: 'qaida_25_noon',
    letterArabic: 'ن',
    nameEn: 'Noon',
    nameAr: 'نُون',
    harakatForms: { fatha: 'نَ (Na)', kasra: 'نِ (Ni)', damma: 'نُ (Nu)', phonetic: 'na / ni / nu' },
    makhrajTip: {
      en: 'Tip of the tongue against upper gums with natural nasal resonance; 2 beats Ghunnah on نّ.',
      hi: 'ज़ुबान की नोक को मसूड़ों से लगाएं; नून मुशद्दद (نّ) पर 2 हरकत ग़ुन्ना करें।',
      ur: 'زبان کی نوک کو مسوڑھوں سے لگائیں؛ نون مشدد (نّ) پر دو حرکت غنہ کریں۔',
      hinglish: 'Tongue tip at upper gums; Noon Mushaddadah (نّ) par 2 beats Ghunnah karein.',
      ar: 'من طرف اللسان مع اللثة العليا ومصاحبة الغنة من الخيشوم.',
    },
    quranExampleWord: 'إِنَّآ أَعْطَيْنَـٰكَ ٱلْكَوْثَرَ',
    quranExampleTranslit: "Innaa A'taynaakal-Kawthar",
    quranExampleMeaning: {
      en: 'Indeed, We have granted you Al-Kawthar (108:1)',
      hi: 'बेशक हमने आपको कौसर अता किया (108:1)',
      ur: 'بے شک ہم نے آپ کو کوثر عطا کیا (108:1)',
      hinglish: 'Beshak Humne aapko Al-Kawthar ata kiya (108:1)',
      ar: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
    },
    quranAyahRef: '108:1',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6205.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 26,
    id: 'qaida_26_haa_soft',
    letterArabic: 'ه',
    nameEn: 'Haa (Deep Chest)',
    nameAr: 'هَاء',
    harakatForms: { fatha: 'هَ (Ha)', kasra: 'هِ (Hi)', damma: 'هُ (Hu)', phonetic: 'soft ha' },
    makhrajTip: {
      en: 'Gentle breath from the lowest part of the throat near the chest.',
      hi: 'सीने की तरफ़ गले के सबसे निचले हिस्से से नरम "हा" अदा करें।',
      ur: 'حلق کے سب سے نچلے حصے (سینے کی طرف) سے ہاء ادا کریں۔',
      hinglish: 'Lowest throat (chest ke paas) se soft "H" sound nikalein.',
      ar: 'من أقصى الحلق مما يلي الصدر.',
    },
    quranExampleWord: 'إِلَـٰهِ ٱلنَّاسِ',
    quranExampleTranslit: 'Ilaahin-Naas',
    quranExampleMeaning: {
      en: 'The God of Mankind (114:3)',
      hi: 'इंसानों का माबूद (114:3)',
      ur: 'انسانوں کا معبود (114:3)',
      hinglish: 'Insanon ka سچا Ma’bood (114:3)',
      ar: 'إِلَٰهِ النَّاسِ',
    },
    quranAyahRef: '114:3',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6233.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 27,
    id: 'qaida_27_waaw',
    letterArabic: 'و',
    nameEn: 'Waaw',
    nameAr: 'وَاو',
    harakatForms: { fatha: 'وَ (Wa)', kasra: 'وِ (Wi)', damma: 'وُ (Wu)', phonetic: 'wa / wi / wu' },
    makhrajTip: {
      en: 'Round both lips into a circle without biting the lower lip.',
      hi: 'दोनों होंठों को गोल करके "वाव" अदा करें (दांत होंठ पर न लगें)।',
      ur: 'دونوں ہونٹوں کو گول کر کے واو ادا کریں۔',
      hinglish: 'Dono lips ko round circle bana kar "Waaw" padhein.',
      ar: 'بانضمام الشفتين إلى الأمام مع بقاء فرجة يمر منها الصوت.',
    },
    quranExampleWord: 'وَٱلْعَصْرِ',
    quranExampleTranslit: "Wal-'Asr",
    quranExampleMeaning: {
      en: 'By Time (Surah Al-Asr 103:1)',
      hi: 'ज़माने (वक्त) की क़सम (103:1)',
      ur: 'زمانے (وقت) کی قسم (103:1)',
      hinglish: 'Waqt (Time) ki qasam (103:1)',
      ar: 'وَالْعَصْرِ',
    },
    quranAyahRef: '103:1',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6177.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
  {
    number: 28,
    id: 'qaida_28_yaa',
    letterArabic: 'ي',
    nameEn: 'Yaa',
    nameAr: 'يَاء',
    harakatForms: { fatha: 'يَ (Ya)', kasra: 'يِ (Yi)', damma: 'يُ (Yu)', phonetic: 'ya / yi / yu' },
    makhrajTip: {
      en: 'Middle of the tongue gently raised toward the roof of the mouth.',
      hi: 'ज़ुबान के बीच के हिस्से को तालू की तरफ़ उठाकर नरमी से "या" पढ़ें।',
      ur: 'زبان کے درمیانی حصے سے نرمی کے ساتھ یاء ادا کریں۔',
      hinglish: 'Middle of tongue ko roof of mouth ke paas raise karke padhein.',
      ar: 'من وسط اللسان مع ما يحاذيه من الحنك الأعلى.',
    },
    quranExampleWord: 'يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا',
    quranExampleTranslit: 'Yawma-idhin tuhaddithu akhbaarahaa',
    quranExampleMeaning: {
      en: 'That Day it will report its news (99:4)',
      hi: 'उस दिन ज़मीन अपनी सारी ख़बरें बयान कर देगी (99:4)',
      ur: 'اس دن زمین اپنی ساری خبریں بیان کر دے گی (99:4)',
      hinglish: 'Us din zameen apni saari khabrein bayan kar degi (99:4)',
      ar: 'يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا',
    },
    quranAyahRef: '99:4',
    humanAudioMp3Url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6142.mp3',
    reciterName: 'Sheikh Mishary Rashid Alafasy',
  },
];

/**
 * Map of isolated offline letter pronunciation MP3 paths bundled under /public/assets/audio/qaida/
 */
const QAIDA_ISOLATED_LETTER_AUDIO_SLUG: Record<string, string> = {
  qaida_01_alif: 'alif',
  qaida_02_baa: 'ba',
  qaida_03_taa: 'ta',
  qaida_04_thaa: 'tha',
  qaida_05_jeem: 'jeem',
  qaida_06_haa_sharp: 'haa',
  qaida_07_khaa: 'kha',
  qaida_08_daal: 'dal',
  qaida_09_dhaal: 'dhal',
  qaida_10_raa: 'ra',
  qaida_11_zaay: 'zay',
  qaida_12_seen: 'seen',
  qaida_13_sheen: 'sheen',
  qaida_14_saad: 'sad',
  qaida_15_daad: 'dad',
  qaida_16_taa_heavy: 'tah',
  qaida_17_zaa_heavy: 'zah',
  qaida_18_ayn: 'ayn',
  qaida_19_ghayn: 'ghayn',
  qaida_20_faa: 'fa',
  qaida_21_qaaf: 'qaf',
  qaida_22_kaaf: 'kaf',
  qaida_23_laam: 'lam',
  qaida_24_meem: 'meem',
  qaida_25_noon: 'noon',
  qaida_26_haa_soft: 'ha',
  qaida_27_waaw: 'waw',
  qaida_28_yaa: 'ya',
};

export const NOORANI_QAIDA_28_LETTERS: QaidaLetterItem[] = RAW_NOORANI_QAIDA_28_LETTERS.map((item) => {
  const slug = QAIDA_ISOLATED_LETTER_AUDIO_SLUG[item.id] || 'alif';
  return {
    ...item,
    letterAudioMp3Url: `/assets/audio/qaida/${slug}.mp3`,
  };
});

/**
 * Plays a Noorani Qaida letter using either:
 * - 'letter' (default): The genuine isolated Arabic letter pronunciation MP3 (/assets/audio/qaida/<letter>.mp3)
 * - 'quran_example': Sheikh Mishary Rashid Alafasy reciting the Quranic example Ayah
 */
export function playQaidaLetterHumanAudio(params: {
  letter: QaidaLetterItem;
  mode?: 'letter' | 'quran_example';
  rate?: number;
  onStatus?: (msg: string) => void;
}): void {
  const mode = params.mode || 'letter';
  const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
  const targetUrl =
    mode === 'quran_example'
      ? isOffline
        ? undefined
        : params.letter.humanAudioMp3Url
      : params.letter.letterAudioMp3Url;

  audioManager.playAudioUrl({
    id: `qaida_human_${mode}_${params.letter.id}`,
    url: targetUrl,
    allowTtsFallback: false,
    offlineUnavailableMessage:
      mode === 'quran_example'
        ? 'Quran example audio requires internet or downloading the Surah in Storage Hub.'
        : 'Offline letter audio asset unavailable.',
    rate: params.rate || 1,
    onError: (msg) => {
      if (params.onStatus) params.onStatus(msg);
    },
  });

  if (params.onStatus && (mode === 'letter' || !isOffline)) {
    params.onStatus(
      mode === 'quran_example'
        ? `Playing Quran Word Example (${params.letter.quranAyahRef}) — ${params.letter.reciterName}`
        : `Playing Arabic Letter Pronunciation: ${params.letter.nameEn} (${params.letter.nameAr})`
    );
  }
}
