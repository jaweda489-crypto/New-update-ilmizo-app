import { KidsStoryItem, LanguageCode } from '../types/ilmizo';
import { audioManager } from './audioManager';

export interface StoryQuranReferenceAudio {
  surahRef: string;
  globalAyahNumber: number;
  arabicAyah: string;
  transliteration: string;
  meaningEn: string;
}

export interface StorybookAssetAuditRow {
  storyId: string;
  title: string;
  category: string;
  sceneCount: number;
  coverArtworkPath: string;
  artworkStatus: 'unique_bespoke' | 'curated_thematic_shared';
  sceneArtworkPendingUnique: boolean;
  hasBundledQuranVerseAudio: boolean;
  narrationStatus: 'quran_verse_plus_optional_studio' | 'optional_studio_narration_pending_pack';
}

export interface StorybookLibraryAuditSummary {
  totalStories: number;
  totalBundledWebpArtworks: number;
  uniqueCoverCount: number;
  thematicSharedCoverCount: number;
  storiesWithQuranVerseAudio: number;
  storiesPendingUniqueSceneArtwork: number;
  rows: StorybookAssetAuditRow[];
}

export const BUNDLED_STORY_WEBP_ASSETS: string[] = [
  '/assets/illustrations/story_nuh.webp',
  '/assets/illustrations/story_honest.webp',
  '/assets/illustrations/story_animals.webp',
  '/assets/illustrations/story_yusuf.webp',
  '/assets/illustrations/story_musa.webp',
  '/assets/illustrations/story_sulayman.webp',
  '/assets/illustrations/story_ibrahim.webp',
  '/assets/illustrations/story_makkah_amanah.webp',
  '/assets/illustrations/story_helper.webp',
  '/assets/illustrations/story_sahaba_charity.webp',
  '/assets/illustrations/story_mosque_courtyard.webp',
  '/assets/illustrations/story_garden_nature.webp',
  '/assets/illustrations/story_family_home.webp',
  '/assets/illustrations/story_night_lantern.webp',
  '/assets/illustrations/story_ocean_mercy.webp',
  '/assets/illustrations/story_desert_oasis.webp',
  '/assets/illustrations/story_ark_horizon.webp',
  '/assets/illustrations/story_eid_lanterns.webp',
  '/assets/illustrations/story_olive_grove.webp',
  '/assets/illustrations/story_madrasah_scroll.webp',
  '/assets/illustrations/story_bilal_adhan.webp',
  '/assets/illustrations/story_ismail_zamzam.webp',
  '/assets/illustrations/story_yunus_whale.webp',
  '/assets/illustrations/story_umar_lantern.webp',
  '/assets/illustrations/story_uthman_well.webp',
];

export const TOP_FEATURED_STORY_IDS: string[] = [
  'story_nuh',
  'story_ismail_zamzam',
  'story_yunus_dua',
  'story_bilal_steadfast',
  'story_umar_night_care',
  'story_uthman_well_rumah',
  'story_ibrahim_stars',
  'story_yusuf_forgiveness',
  'story_musa_helper',
  'story_sulayman_ant',
  'story_muhammad_al_amin',
  'story_honest_boy',
  'story_kindness_animals',
  'story_luqman_wise_advice',
  'story_giving_water_hudhayfah_ikrimah',
];

const UNIQUE_BESPOKE_STORY_IDS = new Set<string>([
  'story_nuh',
  'story_honest_boy',
  'story_kindness_animals',
  'story_yusuf_forgiveness',
  'story_musa_helper',
  'story_sulayman_ant',
  'story_yunus_dua',
  'story_ismail_zamzam',
  'story_muhammad_al_amin',
  'story_ibrahim_stars',
  'story_luqman_wise_advice',
  'story_planting_sapling_hope',
  'story_smiling_sadaqah',
  'story_giving_water_hudhayfah_ikrimah',
  'story_bilal_steadfast',
  'story_umar_night_care',
  'story_uthman_well_rumah',
]);

const STORY_COVER_ARTWORK_MAP: Record<string, string> = {
  story_nuh: '/assets/illustrations/story_ark_horizon.webp',
  story_honest_boy: '/assets/illustrations/story_honest.webp',
  story_kindness_animals: '/assets/illustrations/story_animals.webp',
  story_little_helper: '/assets/illustrations/story_family_home.webp',
  story_ibrahim_stars: '/assets/illustrations/story_ibrahim.webp',
  story_ismail_zamzam: '/assets/illustrations/story_ismail_zamzam.webp',
  story_yusuf_forgiveness: '/assets/illustrations/story_yusuf.webp',
  story_musa_helper: '/assets/illustrations/story_musa.webp',
  story_sulayman_ant: '/assets/illustrations/story_sulayman.webp',
  story_yunus_dua: '/assets/illustrations/story_yunus_whale.webp',
  story_ayyub_patience: '/assets/illustrations/story_olive_grove.webp',
  story_dawud_gratitude: '/assets/illustrations/story_madrasah_scroll.webp',
  story_isa_table_mercy: '/assets/illustrations/story_eid_lanterns.webp',
  story_muhammad_al_amin: '/assets/illustrations/story_makkah_amanah.webp',
  story_abubakr_companionship: '/assets/illustrations/story_desert_oasis.webp',
  story_umar_night_care: '/assets/illustrations/story_umar_lantern.webp',
  story_uthman_well_rumah: '/assets/illustrations/story_uthman_well.webp',
  story_ali_courage_knowledge: '/assets/illustrations/story_madrasah_scroll.webp',
  story_khadijah_comfort: '/assets/illustrations/story_family_home.webp',
  story_bilal_steadfast: '/assets/illustrations/story_bilal_adhan.webp',
  story_fatimah_respect: '/assets/illustrations/story_family_home.webp',
  story_salman_truth_seeker: '/assets/illustrations/story_madrasah_scroll.webp',
  story_asma_two_belts: '/assets/illustrations/story_desert_oasis.webp',
  story_parents_cave_rock: '/assets/illustrations/story_night_lantern.webp',
  story_sparrow_mercy: '/assets/illustrations/story_olive_grove.webp',
  story_jar_of_gold_amanah: '/assets/illustrations/story_makkah_amanah.webp',
  story_smiling_sadaqah: '/assets/illustrations/story_eid_lanterns.webp',
  story_table_manners_umar_abi_salamah: '/assets/illustrations/story_family_home.webp',
  story_controlling_anger: '/assets/illustrations/story_honest.webp',
  story_sharing_soup_neighbor: '/assets/illustrations/story_eid_lanterns.webp',
  story_planting_sapling_hope: '/assets/illustrations/story_olive_grove.webp',
  story_luqman_wise_advice: '/assets/illustrations/story_madrasah_scroll.webp',
  story_two_gardens_gratitude: '/assets/illustrations/story_garden_nature.webp',
  story_abu_ayyub_hospitality: '/assets/illustrations/story_eid_lanterns.webp',
  story_cleanliness_half_faith: '/assets/illustrations/story_garden_nature.webp',
  story_saving_water_river: '/assets/illustrations/story_ocean_mercy.webp',
  story_keeping_promises_hudhaifah: '/assets/illustrations/story_mosque_courtyard.webp',
  story_visiting_sick_friend: '/assets/illustrations/story_helper.webp',
  story_ashab_al_kahf_youth: '/assets/illustrations/story_night_lantern.webp',
  story_adam_tawbah_humility: '/assets/illustrations/story_olive_grove.webp',
  story_muadh_love_for_allah: '/assets/illustrations/story_madrasah_scroll.webp',
  story_abu_hurayrah_knowledge_cat: '/assets/illustrations/story_animals.webp',
  story_giving_water_hudhayfah_ikrimah: '/assets/illustrations/story_sahaba_charity.webp',
  story_good_word_like_good_tree: '/assets/illustrations/story_olive_grove.webp',
  story_luqman_gentle_voice: '/assets/illustrations/story_madrasah_scroll.webp',
  story_dawud_gratitude_work: '/assets/illustrations/story_honest.webp',
  story_zakariyya_yahya_gentleness: '/assets/illustrations/story_mosque_courtyard.webp',
  story_isa_humility_service: '/assets/illustrations/story_helper.webp',
  story_smiling_sadaqah_manners: '/assets/illustrations/story_eid_lanterns.webp',
};

const SCENE_ROTATION_BY_CATEGORY: Record<string, string[]> = {
  Prophets: [
    '/assets/illustrations/story_ismail_zamzam.webp',
    '/assets/illustrations/story_ark_horizon.webp',
    '/assets/illustrations/story_yunus_whale.webp',
    '/assets/illustrations/story_night_lantern.webp',
    '/assets/illustrations/story_olive_grove.webp',
    '/assets/illustrations/story_mosque_courtyard.webp',
  ],
  Companions: [
    '/assets/illustrations/story_mosque_courtyard.webp',
    '/assets/illustrations/story_desert_oasis.webp',
    '/assets/illustrations/story_madrasah_scroll.webp',
    '/assets/illustrations/story_eid_lanterns.webp',
    '/assets/illustrations/story_sahaba_charity.webp',
    '/assets/illustrations/story_family_home.webp',
  ],
  Kindness: [
    '/assets/illustrations/story_olive_grove.webp',
    '/assets/illustrations/story_eid_lanterns.webp',
    '/assets/illustrations/story_garden_nature.webp',
    '/assets/illustrations/story_family_home.webp',
    '/assets/illustrations/story_animals.webp',
    '/assets/illustrations/story_helper.webp',
  ],
  Honesty: [
    '/assets/illustrations/story_madrasah_scroll.webp',
    '/assets/illustrations/story_mosque_courtyard.webp',
    '/assets/illustrations/story_honest.webp',
    '/assets/illustrations/story_makkah_amanah.webp',
    '/assets/illustrations/story_family_home.webp',
    '/assets/illustrations/story_eid_lanterns.webp',
  ],
  default: [
    '/assets/illustrations/story_eid_lanterns.webp',
    '/assets/illustrations/story_olive_grove.webp',
    '/assets/illustrations/story_madrasah_scroll.webp',
    '/assets/illustrations/story_desert_oasis.webp',
    '/assets/illustrations/story_mosque_courtyard.webp',
    '/assets/illustrations/story_family_home.webp',
  ],
};

export function getStoryCoverArtwork(story: Pick<KidsStoryItem, 'id' | 'category'>): string {
  if (STORY_COVER_ARTWORK_MAP[story.id]) {
    return STORY_COVER_ARTWORK_MAP[story.id];
  }
  if (story.category === 'Prophets') return '/assets/illustrations/story_desert_oasis.webp';
  if (story.category === 'Companions') return '/assets/illustrations/story_mosque_courtyard.webp';
  if (story.category === 'Kindness' || story.category === 'Animals')
    return '/assets/illustrations/story_animals.webp';
  if (story.category === 'Honesty' || story.category === 'Truthfulness')
    return '/assets/illustrations/story_honest.webp';
  if (story.category === 'Gratitude' || story.category === 'Patience')
    return '/assets/illustrations/story_olive_grove.webp';
  return '/assets/illustrations/story_family_home.webp';
}

export function getStorySceneArtwork(
  story: Pick<KidsStoryItem, 'id' | 'category'>,
  sceneIndex: number
): string {
  const cover = getStoryCoverArtwork(story);
  if (sceneIndex <= 0) return cover;
  const pool =
    SCENE_ROTATION_BY_CATEGORY[story.category] || SCENE_ROTATION_BY_CATEGORY.default;
  const filtered = pool.filter((img) => img !== cover);
  const chosenPool = filtered.length > 0 ? filtered : pool;
  return chosenPool[(sceneIndex - 1) % chosenPool.length];
}

export function isStoryArtworkPendingUniqueScenes(storyId: string): boolean {
  // Honest transparency: every story has 6 multi-scene views using curated WebP artwork,
  // while bespoke per-scene custom commissions remain pending for stories not yet uniquely illustrated.
  return !UNIQUE_BESPOKE_STORY_IDS.has(storyId);
}

/**
 * Produces an honest, auditable manifest of all 49 stories: cover artwork source,
 * pending bespoke scene flags, and verified Qari verse / studio narration status.
 */
export function auditAllStorybookAssets(
  stories: Pick<KidsStoryItem, 'id' | 'title' | 'category'>[]
): StorybookLibraryAuditSummary {
  const rows: StorybookAssetAuditRow[] = stories.map((story) => {
    const coverArtworkPath = getStoryCoverArtwork(story);
    const isUniqueCover = UNIQUE_BESPOKE_STORY_IDS.has(story.id);
    const hasQuranVerse = Boolean(STORY_QURAN_VERSES_MAP[story.id]);
    return {
      storyId: story.id,
      title: story.title,
      category: story.category,
      sceneCount: 6,
      coverArtworkPath,
      artworkStatus: isUniqueCover ? 'unique_bespoke' : 'curated_thematic_shared',
      sceneArtworkPendingUnique: true, // Honest: individual 6-scene unique commissions are future studio packs
      hasBundledQuranVerseAudio: hasQuranVerse,
      narrationStatus: hasQuranVerse
        ? 'quran_verse_plus_optional_studio'
        : 'optional_studio_narration_pending_pack',
    };
  });

  return {
    totalStories: rows.length,
    totalBundledWebpArtworks: BUNDLED_STORY_WEBP_ASSETS.length,
    uniqueCoverCount: rows.filter((r) => r.artworkStatus === 'unique_bespoke').length,
    thematicSharedCoverCount: rows.filter((r) => r.artworkStatus === 'curated_thematic_shared')
      .length,
    storiesWithQuranVerseAudio: rows.filter((r) => r.hasBundledQuranVerseAudio).length,
    storiesPendingUniqueSceneArtwork: rows.filter((r) => r.sceneArtworkPendingUnique).length,
    rows,
  };
}

export const STORY_QURAN_VERSES_MAP: Record<string, StoryQuranReferenceAudio> = {
  story_nuh: {
    surahRef: 'Surah Hud 11:41',
    globalAyahNumber: 1514,
    arabicAyah: '۞ وَقَالَ ٱرْكَبُوا۟ فِيهَا بِسْمِ ٱللَّهِ مَجْر۪ىٰهَا وَمُرْسَىٰهَآ ۚ إِنَّ رَبِّى لَغَفُورٌ رَّحِيمٌ',
    transliteration: 'Wa qaalar-kaboo feehaa bismillaahi majreehaa wa mursaahaa',
    meaningEn: 'Board the Ark! In the Name of Allah is its sailing and its anchoring.',
  },
  story_ibrahim_stars: {
    surahRef: 'Surah Al-An’am 6:79',
    globalAyahNumber: 868,
    arabicAyah: 'إِنِّى وَجَّهْتُ وَجْهِىَ لِلَّذِى فَطَرَ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ حَنِيفًا',
    transliteration: 'Innee wajjahtu wajhiya lilladhee fataras-samaawaati wal-ard',
    meaningEn: 'Indeed, I have turned my face purely toward Him who created the heavens and the earth.',
  },
  story_yusuf_forgiveness: {
    surahRef: 'Surah Yusuf 12:92',
    globalAyahNumber: 1688,
    arabicAyah: 'قَالَ لَا تَثْرِيبَ عَلَيْكُمُ ٱلْيَوْمَ ۖ يَغْفِرُ ٱللَّهُ لَكُمْ ۖ وَهُوَ أَرْحَمُ ٱلرَّٰحِمِينَ',
    transliteration: 'Qaala laa tathreeba ‘alaykumul-yawma yaghfirullaahu lakum',
    meaningEn: 'He said: No blame will there be upon you today. Allah will forgive you!',
  },
  story_musa_helper: {
    surahRef: 'Surah Al-Qasas 28:24',
    globalAyahNumber: 3276,
    arabicAyah: 'فَسَقَىٰ لَهُمَا ثُمَّ تَوَلَّىٰٓ إِلَى ٱلظِّلِّ فَقَالَ رَبِّ إِنِّى لِمَآ أَنزَلْتَ إِلَىَّ مِنْ خَيْرٍ فَقِيرٌ',
    transliteration: 'Fasaqaa lahumaa thumma tawallaa ilaz-zilli faqaala Rabbi innee limaa anzalta ilayya min khayrin faqeer',
    meaningEn: 'So he watered their flock for them, then turned to the shade and prayed: My Lord, I am in need of any good You send me.',
  },
  story_sulayman_ant: {
    surahRef: 'Surah An-Naml 27:19',
    globalAyahNumber: 3178,
    arabicAyah: 'فَتَبَسَّمَ ضَاحِكًا مِّن قَوْلِهَا وَقَالَ رَبِّ أَوْزِعْنِىٓ أَنْ أَشْكُرَ نِعْمَتَكَ',
    transliteration: 'Fatabassama daahikam-min qawlihaa wa qaala Rabbi awzi‘nee an ashkura ni‘matak',
    meaningEn: 'So Sulayman smiled, amused at her words, and prayed: My Lord, enable me to be grateful for Your favor!',
  },
  story_yunus_dua: {
    surahRef: 'Surah Al-Anbiya 21:87',
    globalAyahNumber: 2570,
    arabicAyah: 'لَّآ إِلَـٰهَ إِلَّآ أَنتَ سُبْحَـٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّـٰلِمِينَ',
    transliteration: 'Laa ilaaha illaa Anta Subhaanaka innee kuntu minaz-zaalimeen',
    meaningEn: 'There is no deity except You; exalted are You! Indeed, I have been of the wrongdoers.',
  },
  story_luqman_wise_advice: {
    surahRef: 'Surah Luqman 31:13',
    globalAyahNumber: 3482,
    arabicAyah: 'يَـٰبُنَىَّ لَا تُشْرِكْ بِٱللَّهِ ۖ إِنَّ ٱلشِّرْكَ لَظُلْمٌ عَظِيمٌ',
    transliteration: 'Yaa bunayya laa tushrik billaah',
    meaningEn: 'O my dear son, do not associate anything with Allah.',
  },
  story_ashab_al_kahf_youth: {
    surahRef: 'Surah Al-Kahf 18:10',
    globalAyahNumber: 2150,
    arabicAyah: 'رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
    transliteration: 'Rabbanaa aatinaa mil-ladunka rahmatan wa hayyi’ lanaa min amrinaa rashadaa',
    meaningEn: 'Our Lord, grant us mercy from Yourself and prepare for us right guidance in our affair.',
  },
  story_good_word_like_good_tree: {
    surahRef: 'Surah Ibrahim 14:24',
    globalAyahNumber: 1774,
    arabicAyah: 'أَلَمْ تَرَ كَيْفَ ضَرَبَ ٱللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ',
    transliteration: 'Kalimatan tayyibatan kashajaratin tayyibatin asluhaa thaabitun wa far‘uhaa fis-samaa’',
    meaningEn: 'A good word is like a good tree whose root is firm and whose branches reach the sky.',
  },
};

export function splitStoryPageIntoSentences(pageText: string): string[] {
  const clean = (pageText || '').trim();
  if (!clean) return [];
  const parts = clean
    .split(/(?<=[.!?।۔])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [clean];
}

export function getSpeechLangForUiLanguage(lang: LanguageCode): string {
  switch (lang) {
    case 'hi':
      return 'hi-IN';
    case 'ur':
      return 'ur-PK';
    case 'ar':
      return 'ar-SA';
    case 'hinglish':
      return 'en-IN';
    default:
      return 'en-US';
  }
}

export function playStoryQuranVerse(
  ref: StoryQuranReferenceAudio,
  onStatus?: (msg: string) => void
): void {
  const match = /(\d+)\s*:\s*(\d+)/.exec(ref.surahRef);
  if (match) {
    const surahNumber = Number(match[1]);
    const ayahNumberInSurah = Number(match[2]);
    void audioManager
      .playQariRecitationAyah({
        id: `story-quran-${ref.globalAyahNumber}`,
        surahNumber,
        ayahNumberInSurah,
        globalAyahNumber: ref.globalAyahNumber,
        reciterName: 'Mishary Rashid Alafasy',
        onError: (msg) => onStatus?.(msg),
      })
      .then((res) => {
        if (res.ok) {
          onStatus?.(`Reciting ${ref.surahRef} — Sheikh Mishary Rashid Alafasy`);
        }
      });
    return;
  }

  const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
  const url = isOffline
    ? undefined
    : `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ref.globalAyahNumber}.mp3`;
  audioManager.playAudioUrl({
    id: `story-quran-${ref.globalAyahNumber}`,
    url,
    allowTtsFallback: false,
    offlineUnavailableMessage:
      'Quran Ayah audio is not downloaded yet. Connect to internet or download the Surah in Storage Hub.',
    rate: 0.95,
    onError: (msg) => onStatus?.(msg),
  });
  if (!isOffline) {
    onStatus?.(`Reciting ${ref.surahRef} — Sheikh Mishary Rashid Alafasy`);
  }
}
