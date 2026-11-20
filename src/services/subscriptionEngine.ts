import { Capacitor, registerPlugin } from '@capacitor/core';
import { CoreSupportedLanguage, EntitlementTier, LanguageCode, UserProfile } from '../types/ilmizo';

export const FREE_CHILD_PROFILE_LIMIT = 1;
export const FAMILY_CHILD_PROFILE_LIMIT = 5;
export const FREE_QAIDA_LESSON_LIMIT = 3;
export const FREE_KIDS_STORY_LIMIT = 6;
export const FREE_VOCAB_LIMIT = 30;
export const FREE_CUSTOM_HIFZ_LIMIT = 1;
export const FREE_DAILY_AI_TAJWEED_LIMIT = 2;
export const TOP_STORIES_PACK_COUNT = 10;
export const ALL_STORIES_PACK_COUNT = 49;
export const SEVEN_DAY_TRIAL_MS = 7 * 24 * 60 * 60 * 1000;
export const SEVEN_DAY_OFFLINE_GRACE_MS = 7 * 24 * 60 * 60 * 1000;

export type GooglePlaySku =
  | 'ilmizo_individual_99'
  | 'ilmizo_family_199'
  | 'ilmizo_lifetime_499';

export interface IlmizoPlanSpec {
  id: EntitlementTier;
  sku: GooglePlaySku | null;
  priceInrLabel: string;
  monthlyEquivalentLabel: string;
  title: Record<CoreSupportedLanguage, string>;
  tagline: Record<CoreSupportedLanguage, string>;
  badgeText?: Record<CoreSupportedLanguage, string>;
  features: Record<CoreSupportedLanguage, string[]>;
}

export const ILMIZO_PLAN_CATALOG: IlmizoPlanSpec[] = [
  {
    id: 'free',
    sku: null,
    priceInrLabel: '₹0',
    monthlyEquivalentLabel: 'Free Forever',
    title: {
      en: 'Free Forever Core',
      hi: 'हमेशा मुफ़्त (कोर)',
      ur: 'ہمیشہ مفت (بنیادی)',
      hinglish: 'Free Forever Core',
      ar: 'الباقة المجانية للأبد',
    },
    tagline: {
      en: 'Essential worship tools never locked behind a paywall',
      hi: 'क़ुरआन, नमाज़, दुआ और क़िबला हमेशा मुफ़्त',
      ur: 'قرآن، نماز، دعا اور قبلہ ہمیشہ مفت',
      hinglish: 'Quran, Namaz, Duas aur Qibla hamesha 100% Free',
      ar: 'أدوات العبادة الأساسية مجانية دائماً',
    },
    features: {
      en: [
        '114 Surahs Uthmani Quran + Qari Audio',
        'Complete Salah, Wudu, Duas & 99 Names',
        '1 Child Profile + Qaida Lessons 1–3 + 6 Stories',
      ],
      hi: [
        'सभी 114 सूरतें और क़ारी तिलावत',
        'पूरा नमाज़, वुज़ू, दुआ और 99 नाम गाइड',
        '1 बच्चे की प्रोफ़ाइल + 3 क़ायदा सबक़ + 6 कहानियाँ',
      ],
      ur: [
        'مکمل 114 سورتیں اور قاری تلاوت',
        'نماز، وضو، دعائیں اور 99 نام گائیڈ',
        '1 بچے کی پروفائل + 3 قاعدہ اسباق + 6 کہانیاں',
      ],
      hinglish: [
        'Full 114 Surahs Quran + Qari Audio',
        'Complete Salah, Wudu, Duas & 99 Names',
        '1 Child Profile + 3 Qaida Lessons + 6 Stories',
      ],
      ar: [
        'المصحف الشريف كاملاً ١١٤ سورة مع التلاوة',
        'دليل الصلاة والوضوء والأدعية والأسماء الحسنى',
        'ملف طفل واحد + ٣ دروس قاعدة + ٦ قصص',
      ],
    },
  },
  {
    id: 'individual_99',
    sku: 'ilmizo_individual_99',
    priceInrLabel: '₹99 / yr',
    monthlyEquivalentLabel: '~₹8 / mo',
    title: {
      en: 'Adult Quran Plus',
      hi: 'एडल्ट क़ुरआन प्लस',
      ur: 'ایڈلٹ قرآن پلس',
      hinglish: 'Adult Quran Plus',
      ar: 'باقة القرآن للبالغين',
    },
    tagline: {
      en: 'For individuals deepening Hifz & Quranic Arabic',
      hi: 'हिफ़्ज़ और अरबी शब्दावली को मज़बूत करने के लिए',
      ur: 'حفظ اور قرآنی الفاظ کی مضبوطی کے لیے',
      hinglish: 'Hifz revision aur Quranic Arabic vocabulary ke liye',
      ar: 'لتعزيز الحفظ ومفردات القرآن الكريم',
    },
    features: {
      en: [
        'Full 600+ Core Quranic Vocabulary Mastery Deck',
        'Word-by-Word Hifz Studio & Unlimited Custom Plans',
        'Unlimited Online AI Tajweed Checks + Offline Audio',
      ],
      hi: [
        '600+ प्रमुख क़ुरआनी शब्दों का पूरा ख़ज़ाना',
        'वर्ड-बाय-वर्ड हिफ़्ज़ स्टूडियो और अनलिमिटेड प्लान',
        'अनलिमिटेड ऑनलाइन AI तजवीद चेक और ऑफ़लाइन ऑडियो',
      ],
      ur: [
        '600+ بنیادی قرآنی الفاظ کا مکمل ذخیرہ',
        'لفظ بہ لفظ حفظ اسٹوڈیو اور لامحدود پلانز',
        'لامحدود آن لائن AI تجوید چیک اور آف لائن آڈیو',
      ],
      hinglish: [
        'Full 600+ Core Quranic Words Mastery Deck',
        'Word-by-Word Hifz Studio & Custom Plans',
        'Unlimited Online AI Tajweed + Offline Audio',
      ],
      ar: [
        'إتقان أكثر من ٦٠٠ كلمة قرآنية أساسية',
        'استوديو الحفظ كلمة بكلمة وخطط مخصصة',
        'تدقيق تجويد ذكي غير محدود وحزم صوت دون إنترنت',
      ],
    },
  },
  {
    id: 'family_199',
    sku: 'ilmizo_family_199',
    priceInrLabel: '₹199 / yr',
    monthlyEquivalentLabel: '~₹16 / mo',
    title: {
      en: 'Ilmizo Family Plus',
      hi: 'इल्मीज़ो फ़ैमिली प्लस',
      ur: 'علمیزو فیملی پلس',
      hinglish: 'Ilmizo Family Plus (Best Value)',
      ar: 'باقة العائلة بلس',
    },
    tagline: {
      en: '17-Lesson Interactive Noorani Qaida, Letter Tracing & 49 Multi-Scene Stories for 5 kids',
      hi: '5 बच्चों के लिए 17-सबक़ इंटरैक्टिव नूरानी क़ायदा, लेटर ट्रेसिंग और 49 कहानियाँ',
      ur: '5 بچوں کے لیے 17 اسباق کا انٹرایکٹو نورانی قاعدہ، لیٹر ٹریسنگ اور 49 کہانیاں',
      hinglish: 'Sirf ₹16/month mein 5 bacchon ka Interactive Noorani Qaida, Tracing + 49 Storybooks!',
      ar: 'القاعدة النورانية التفاعلية ١٧ درساً وكتابة الحروف و٤٩ قصة لخمسة أطفال',
    },
    badgeText: {
      en: 'Best for Families · 7-Day Free Trial',
      hi: 'सबसे लोकप्रिय · 7-दिन मुफ़्त ट्रायल',
      ur: 'بہترین انتخاب · 7 دن مفت ٹرائل',
      hinglish: 'Most Popular · 7-Day Free Trial',
      ar: 'الأكثر مبيعاً · تجربة ٧ أيام مجاناً',
    },
    features: {
      en: [
        'Up to 5 Child Profiles + Daily 10-Min Guided Plan & Weekly Card',
        '17-Lesson Noorani Qaida + Letter Tracing + 5Q Audio Mastery Quiz',
        'All 49 Multi-Scene Interactive Storybooks + Qari Verses + Certificates',
      ],
      hi: [
        '5 बच्चों की प्रोफ़ाइल + 10-मिनट डेली तरबियत प्लान और वीकली रिपोर्ट कार्ड',
        'पूरा 17-सबक़ नूरानी क़ायदा + लेटर ट्रेसिंग + ऑडियो मास्टरी क्विज़',
        'सभी 49 मल्टी-सीन इंटरैक्टिव कहानियाँ + क़ारी आयत + सर्टिफ़िकेट',
      ],
      ur: [
        '5 بچوں کی پروفائل + روزانہ 10 منٹ کا تربیت پلان اور ہفتہ وار رپورٹ کارڈ',
        'مکمل 17 اسباق کا نورانی قاعدہ + لیٹر ٹریسنگ + آڈیو ماسٹری کوئز',
        'تمام 49 ملٹی سین انٹرایکٹو کہانیاں + قاری آیات + سرٹیفکیٹس',
      ],
      hinglish: [
        '5 Kids Profiles + Daily 10-Min Tarbiyah Plan & Weekly WhatsApp Card',
        'Complete 17-Lesson Noorani Qaida + Letter Tracing + Audio Mastery Quiz',
        'All 49 Multi-Scene Interactive Storybooks + Printable Certificates',
      ],
      ar: [
        'حتى ٥ ملفات أطفال مع خطة يومية ١٠ دقائق وتقرير أسبوعي',
        'القاعدة النورانية ١٧ درساً + تتبع الحروف + اختبار سمعي متدرج',
        'جميع القصص التفاعلية ٤٩ متعددة المشاهد وشهادات التقدير',
      ],
    },
  },
  {
    id: 'lifetime_499',
    sku: 'ilmizo_lifetime_499',
    priceInrLabel: '₹499 once',
    monthlyEquivalentLabel: 'Pay Once Forever',
    title: {
      en: 'Lifetime Family Supporter',
      hi: 'लाइफ़टाइम फ़ैमिली पास',
      ur: 'لائف ٹائم فیملی پاس',
      hinglish: 'Lifetime Family (No Renewal)',
      ar: 'باقة العائلة مدى الحياة',
    },
    tagline: {
      en: 'One-time payment — zero yearly renewals, every Family & Adult tool unlocked',
      hi: 'एक बार का भुगतान, हमेशा के लिए सारे फ़ीचर्स अनलॉक',
      ur: 'ایک بار ادائیگی، تمام فیچرز ہمیشہ کے لیے',
      hinglish: 'Ek baar ₹499 — zero renewal, Family + Adult hamesha ke liye unlocked',
      ar: 'دفعة واحدة فقط لجميع ميزات العائلة والبالغين دون تجديد سنوي',
    },
    features: {
      en: [
        'Everything in Family Plus + Adult Quran Plus Forever',
        'Zero Yearly Renewals · Verified Local Offline Entitlement',
        'Supports 100% Ad-Free Islamic Kids Education',
      ],
      hi: [
        'फ़ैमिली और एडल्ट के सारे फ़ीचर्स हमेशा के लिए',
        'कोई सालाना रिन्यूअल नहीं · पूरा ऑफ़लाइन ऐक्सेस',
        'विज्ञापन-मुक्त इस्लामी शिक्षा को सपोर्ट',
      ],
      ur: [
        'فیملی اور ایڈلٹ کے تمام فیچرز ہمیشہ کے لیے',
        'سالانہ تجدید سے آزاد · مکمل آف لائن رسائی',
        'بغیر اشتہارات اسلامی تعلیم کا تعاون',
      ],
      hinglish: [
        'Family Plus + Adult Plus Hamesha ke Liye',
        'No Annual Renewal · Offline Access',
        '100% Ad-Free Kids Tarbiyah Mission ko Support',
      ],
      ar: [
        'جميع ميزات العائلة والبالغين مدى الحياة',
        'دون تجديد سنوي مع عمل كامل دون إنترنت',
        'دعم التعليم الإسلامي الخالي من الإعلانات',
      ],
    },
  },
];

export interface TrialStatusInfo {
  isTrialActive: boolean;
  hasUsedTrial: boolean;
  daysRemaining: number;
  endsAtIso: string | null;
}

export function getTrialStatus(user: UserProfile, nowMs = Date.now()): TrialStatusInfo {
  const hasUsedTrial = Boolean(user.trialStartedAtIso || user.trialEndsAtIso);
  if (!user.trialEndsAtIso) {
    return { isTrialActive: false, hasUsedTrial, daysRemaining: 0, endsAtIso: null };
  }
  const endMs = Date.parse(user.trialEndsAtIso);
  if (!Number.isFinite(endMs) || endMs <= nowMs) {
    return {
      isTrialActive: false,
      hasUsedTrial: true,
      daysRemaining: 0,
      endsAtIso: user.trialEndsAtIso,
    };
  }
  const daysRemaining = Math.max(1, Math.ceil((endMs - nowMs) / (24 * 60 * 60 * 1000)));
  return {
    isTrialActive: true,
    hasUsedTrial: true,
    daysRemaining,
    endsAtIso: user.trialEndsAtIso,
  };
}

export function computeEntitlementProofSync(params: {
  entitlement: EntitlementTier;
  source?: 'none' | 'local_trial' | 'google_play';
  sku?: string;
  orderId?: string;
  trialEndsAtIso?: string;
}): string {
  const canonical = [
    'ilmizo_ent_v1',
    params.entitlement,
    params.source || 'none',
    params.sku || '',
    params.orderId || '',
    params.trialEndsAtIso || '',
  ].join('|');
  let h1 = 0x811c9dc5 ^ canonical.length;
  let h2 = 0x9e3779b9 ^ canonical.length;
  for (let i = 0; i < canonical.length; i++) {
    const ch = canonical.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 16777619);
    h2 = Math.imul(h2 ^ ch, 2654435761);
  }
  return `ent_v1_${(h1 >>> 0).toString(16).padStart(8, '0')}${(h2 >>> 0)
    .toString(16)
    .padStart(8, '0')}`;
}

export function isEntitlementProofValid(user: UserProfile): boolean {
  if (!user.subscriptionProofToken) {
    return true;
  }
  const expected = computeEntitlementProofSync({
    entitlement: user.entitlement,
    source: user.subscriptionPurchaseSource,
    sku: user.subscriptionSku,
    orderId: user.subscriptionOrderId,
    trialEndsAtIso: user.trialEndsAtIso,
  });
  return user.subscriptionProofToken === expected;
}

export interface OfflineEntitlementGraceStatus {
  inGracePeriod: boolean;
  isGraceExpired: boolean;
  daysRemaining: number;
  graceEndsAtIso?: string;
  unlimited: boolean;
}

export function getOfflineEntitlementGraceStatus(
  user: UserProfile,
  nowMs = Date.now(),
  isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true
): OfflineEntitlementGraceStatus {
  if (user.entitlement === 'lifetime_499') {
    return { inGracePeriod: false, isGraceExpired: false, daysRemaining: 7, unlimited: true };
  }
  if (user.subscriptionPurchaseSource !== 'google_play' || user.entitlement === 'free') {
    return { inGracePeriod: false, isGraceExpired: false, daysRemaining: 0, unlimited: false };
  }
  const verifiedIso = user.subscriptionLastVerifiedAtIso || user.subscriptionUpdatedAtIso;
  if (!verifiedIso) {
    return { inGracePeriod: !isOnline, isGraceExpired: false, daysRemaining: 7, unlimited: false };
  }
  const verifiedMs = Date.parse(verifiedIso);
  if (Number.isNaN(verifiedMs)) {
    return { inGracePeriod: !isOnline, isGraceExpired: false, daysRemaining: 7, unlimited: false };
  }
  const graceEndsAtMs = verifiedMs + SEVEN_DAY_OFFLINE_GRACE_MS;
  const remainingMs = graceEndsAtMs - nowMs;
  if (remainingMs <= 0) {
    return {
      inGracePeriod: false,
      isGraceExpired: !isOnline,
      daysRemaining: 0,
      graceEndsAtIso: new Date(graceEndsAtMs).toISOString(),
      unlimited: false,
    };
  }
  return {
    inGracePeriod: !isOnline,
    isGraceExpired: false,
    daysRemaining: Math.max(1, Math.ceil(remainingMs / (24 * 60 * 60 * 1000))),
    graceEndsAtIso: new Date(graceEndsAtMs).toISOString(),
    unlimited: false,
  };
}

export function getEffectiveEntitlement(
  user: UserProfile,
  nowMs = Date.now(),
  isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true
): EntitlementTier {
  // Never trust a bare boolean/string entitlement when purchase source is explicitly 'none'
  if (user.subscriptionPurchaseSource === 'none') {
    return getTrialStatus(user, nowMs).isTrialActive &&
      (!user.subscriptionProofToken || isEntitlementProofValid(user))
      ? 'family_199'
      : 'free';
  }

  // Reject tampered proof tokens where stored tier/SKU disagrees with signed proof
  if (user.subscriptionProofToken && !isEntitlementProofValid(user)) {
    return 'free';
  }

  if (user.entitlement === 'lifetime_499') return 'lifetime_499';

  // Enforce 7-Day Offline Entitlement Grace Period for recurring subscriptions when offline
  if (!isOnline && user.subscriptionPurchaseSource === 'google_play') {
    const grace = getOfflineEntitlementGraceStatus(user, nowMs, false);
    if (grace.isGraceExpired) {
      return 'free';
    }
  }

  if (user.entitlement === 'family_199') {
    if (user.subscriptionPurchaseSource === 'local_trial') {
      return getTrialStatus(user, nowMs).isTrialActive ? 'family_199' : 'free';
    }
    return 'family_199';
  }
  if (getTrialStatus(user, nowMs).isTrialActive) {
    return 'family_199';
  }
  return user.entitlement || 'free';
}

export function isFamilyPlusActive(user: UserProfile, nowMs = Date.now()): boolean {
  const effective = getEffectiveEntitlement(user, nowMs);
  return effective === 'family_199' || effective === 'lifetime_499';
}

export function isAdultPlusActive(user: UserProfile, nowMs = Date.now()): boolean {
  const effective = getEffectiveEntitlement(user, nowMs);
  return effective !== 'free';
}

export function isCoreWorshipFeatureAlwaysFree(): boolean {
  return true;
}

export function canAccessChildSlot(
  user: UserProfile,
  currentChildrenCount: number,
  nowMs = Date.now()
): boolean {
  if (isFamilyPlusActive(user, nowMs)) {
    return currentChildrenCount < FAMILY_CHILD_PROFILE_LIMIT;
  }
  return currentChildrenCount < FREE_CHILD_PROFILE_LIMIT;
}

export function canAccessQaidaLesson(
  user: UserProfile,
  lessonNumber: number,
  nowMs = Date.now()
): boolean {
  if (lessonNumber <= FREE_QAIDA_LESSON_LIMIT) return true;
  return isFamilyPlusActive(user, nowMs);
}

export function canAccessStoryIndex(
  user: UserProfile,
  storyIndex: number,
  nowMs = Date.now()
): boolean {
  if (storyIndex < FREE_KIDS_STORY_LIMIT) return true;
  return isFamilyPlusActive(user, nowMs);
}

export function canDownloadHighResCertificate(user: UserProfile, nowMs = Date.now()): boolean {
  return isFamilyPlusActive(user, nowMs);
}

export function canAccessVocabIndex(
  user: UserProfile,
  vocabIndex: number,
  nowMs = Date.now()
): boolean {
  if (vocabIndex < FREE_VOCAB_LIMIT) return true;
  return isAdultPlusActive(user, nowMs);
}

export function canAccessWordByWordHifzStudio(
  user: UserProfile,
  nowMs = Date.now()
): boolean {
  return isAdultPlusActive(user, nowMs);
}

export function canAddCustomHifzPlan(
  user: UserProfile,
  customPlanCount: number,
  nowMs = Date.now()
): boolean {
  if (customPlanCount < FREE_CUSTOM_HIFZ_LIMIT) return true;
  return isAdultPlusActive(user, nowMs);
}

export function canRecordFamilyStoryVoice(
  user: UserProfile,
  nowMs = Date.now()
): boolean {
  return isFamilyPlusActive(user, nowMs);
}

export function canDownloadTopStoriesAudioPack(
  user: UserProfile,
  nowMs = Date.now()
): boolean {
  return isFamilyPlusActive(user, nowMs);
}

export function canDownloadFullStoryLibraryAudioPack(
  user: UserProfile,
  nowMs = Date.now()
): boolean {
  return isFamilyPlusActive(user, nowMs);
}

export function canCacheSingleStoryOffline(
  user: UserProfile,
  storyIndex: number,
  nowMs = Date.now()
): boolean {
  return canAccessStoryIndex(user, storyIndex, nowMs);
}

export function canUseAiTajweedCheck(
  user: UserProfile,
  dateKey: string,
  nowMs = Date.now()
): { allowed: boolean; remaining: number | null; usedToday: number; limit: number | null } {
  if (isAdultPlusActive(user, nowMs)) {
    return { allowed: true, remaining: null, usedToday: 0, limit: null };
  }
  const usedToday =
    user.aiTajweedUsage?.dateKey === dateKey ? Math.max(0, user.aiTajweedUsage.count || 0) : 0;
  const remaining = Math.max(0, FREE_DAILY_AI_TAJWEED_LIMIT - usedToday);
  return {
    allowed: usedToday < FREE_DAILY_AI_TAJWEED_LIMIT,
    remaining,
    usedToday,
    limit: FREE_DAILY_AI_TAJWEED_LIMIT,
  };
}

export function recordAiTajweedUsagePatch(
  user: UserProfile,
  dateKey: string
): Partial<UserProfile> {
  const prevCount =
    user.aiTajweedUsage?.dateKey === dateKey ? Math.max(0, user.aiTajweedUsage.count || 0) : 0;
  return {
    aiTajweedUsage: {
      dateKey,
      count: prevCount + 1,
    },
  };
}

export function startLocalSevenDayTrialPatch(nowMs = Date.now()): Partial<UserProfile> {
  const startIso = new Date(nowMs).toISOString();
  const endIso = new Date(nowMs + SEVEN_DAY_TRIAL_MS).toISOString();
  return {
    entitlement: 'family_199',
    trialStartedAtIso: startIso,
    trialEndsAtIso: endIso,
    subscriptionPurchaseSource: 'local_trial',
    subscriptionSku: 'ilmizo_family_199',
    subscriptionUpdatedAtIso: startIso,
    subscriptionLastVerifiedAtIso: startIso,
    subscriptionProofToken: computeEntitlementProofSync({
      entitlement: 'family_199',
      source: 'local_trial',
      sku: 'ilmizo_family_199',
      trialEndsAtIso: endIso,
    }),
  };
}

// ============================================================================
// GOOGLE PLAY BILLING BRIDGE (Capacitor Android Plugin + Honest Web Status)
// ============================================================================

export interface RestorePurchasesNativeResult {
  activeSkus: GooglePlaySku[];
  pendingSkus?: GooglePlaySku[];
  queriedSuccessfully?: boolean;
  orderId?: string;
  isAutoRenewing?: boolean;
  purchaseTimeMs?: number;
  error?: string;
}

interface IlmizoBillingPlugin {
  isBillingAvailable(): Promise<{ available: boolean; reason?: string }>;
  purchaseProduct(options: { sku: GooglePlaySku }): Promise<{
    purchased: boolean;
    pending?: boolean;
    sku?: GooglePlaySku;
    orderId?: string;
    purchaseToken?: string;
    isAutoRenewing?: boolean;
    error?: string;
  }>;
  restorePurchases(): Promise<RestorePurchasesNativeResult>;
}

const IlmizoBillingNative = registerPlugin<IlmizoBillingPlugin>('IlmizoBilling');

export type BillingEnvironmentStatus =
  | 'android_play_billing_ready'
  | 'android_bridge_unlinked'
  | 'web_preview';

export async function detectBillingEnvironment(): Promise<{
  status: BillingEnvironmentStatus;
  canLaunchRealCheckout: boolean;
  message: string;
}> {
  const isNative =
    typeof window !== 'undefined' &&
    typeof Capacitor?.isNativePlatform === 'function' &&
    Capacitor.isNativePlatform();

  if (!isNative) {
    return {
      status: 'web_preview',
      canLaunchRealCheckout: false,
      message:
        'Web/PWA Preview: Start a free 7-day local trial to test all Family Plus features. Live INR/USD Google Play checkout activates automatically inside the Play Store Android build.',
    };
  }

  try {
    const res = await IlmizoBillingNative.isBillingAvailable();
    if (res?.available) {
      return {
        status: 'android_play_billing_ready',
        canLaunchRealCheckout: true,
        message: 'Google Play Billing Connected (Play Store Checkout Ready).',
      };
    }
  } catch {
    // Native plugin not linked yet in Java shell
  }

  return {
    status: 'android_bridge_unlinked',
    canLaunchRealCheckout: false,
    message:
      'Android APK detected: Link com.android.billingclient:billing in Android Studio before Play Store release, or activate the 7-day offline trial now.',
  };
}

export function mapSkuToEntitlement(sku?: string | null): EntitlementTier {
  if (sku === 'ilmizo_lifetime_499') return 'lifetime_499';
  if (sku === 'ilmizo_family_199') return 'family_199';
  if (sku === 'ilmizo_individual_99') return 'individual_99';
  return 'free';
}

export async function attemptPlayStorePurchase(planId: EntitlementTier): Promise<{
  ok: boolean;
  mode: 'google_play' | 'preview_trial_available' | 'free';
  pending?: boolean;
  patch?: Partial<UserProfile>;
  message: string;
}> {
  if (planId === 'free') {
    const nowIso = new Date().toISOString();
    return {
      ok: true,
      mode: 'free',
      patch: {
        entitlement: 'free',
        subscriptionPurchaseSource: 'none',
        subscriptionSku: undefined,
        subscriptionOrderId: undefined,
        subscriptionProofToken: undefined,
        subscriptionAutoRenewing: false,
        subscriptionUpdatedAtIso: nowIso,
      },
      message: 'Switched to Free Forever Core access.',
    };
  }

  const plan = ILMIZO_PLAN_CATALOG.find((p) => p.id === planId);
  if (!plan?.sku) {
    return { ok: false, mode: 'preview_trial_available', message: 'Invalid plan SKU.' };
  }

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return {
      ok: false,
      mode: 'google_play',
      message:
        'Internet connection is required to complete or verify a new Google Play purchase. Existing offline entitlements remain active.',
    };
  }

  const env = await detectBillingEnvironment();
  if (env.canLaunchRealCheckout) {
    try {
      const result = await IlmizoBillingNative.purchaseProduct({ sku: plan.sku });
      if (result.purchased) {
        const nowIso = new Date().toISOString();
        const entitlement = mapSkuToEntitlement(result.sku || plan.sku);
        const sku = result.sku || plan.sku;
        const orderId = result.orderId || `gp_${Date.now()}`;
        return {
          ok: true,
          mode: 'google_play',
          patch: {
            entitlement,
            subscriptionPurchaseSource: 'google_play',
            subscriptionSku: sku,
            subscriptionOrderId: orderId,
            subscriptionUpdatedAtIso: nowIso,
            subscriptionLastVerifiedAtIso: nowIso,
            subscriptionAutoRenewing: Boolean(result.isAutoRenewing),
            subscriptionProofToken: computeEntitlementProofSync({
              entitlement,
              source: 'google_play',
              sku,
              orderId,
            }),
          },
          message: `Verified Google Play purchase for ${plan.title.en}!`,
        };
      }
      if (result.pending) {
        return {
          ok: false,
          mode: 'google_play',
          pending: true,
          message:
            result.error ||
            'Purchase is pending payment confirmation in Google Play. Tap Restore Purchases once payment clears.',
        };
      }
      return {
        ok: false,
        mode: 'google_play',
        message: result.error || 'Purchase cancelled in Google Play.',
      };
    } catch (err) {
      return {
        ok: false,
        mode: 'preview_trial_available',
        message:
          err instanceof Error
            ? err.message
            : 'Google Play Billing unavailable right now. You can use the 7-day free trial.',
      };
    }
  }

  return {
    ok: false,
    mode: 'preview_trial_available',
    message: env.message,
  };
}

/**
 * Reconciles Google Play active purchases against local UserProfile.
 * - Preserves legitimate offline premium access whenever offline or Play Billing cannot be queried.
 * - Restores active SKUs if found on Play.
 * - Downgrades previously Play-backed entitlements to 'free' if Play was queried online & reports empty activeSkus (expired/refunded).
 */
export async function reconcileGooglePlayEntitlements(
  user: UserProfile,
  options?: {
    isOnline?: boolean;
    nativeBridge?: Pick<IlmizoBillingPlugin, 'restorePurchases'>;
  }
): Promise<{
  ok: boolean;
  downgraded?: boolean;
  patch?: Partial<UserProfile>;
  message: string;
}> {
  const isOnline =
    typeof options?.isOnline === 'boolean'
      ? options.isOnline
      : typeof navigator !== 'undefined'
      ? navigator.onLine
      : true;

  if (!isOnline) {
    const activeTier = getEffectiveEntitlement(user, Date.now(), false);
    const grace = getOfflineEntitlementGraceStatus(user, Date.now(), false);
    return {
      ok: true,
      message:
        activeTier !== 'free'
          ? grace.unlimited
            ? 'Offline Mode: verified Lifetime access preserved permanently.'
            : `Offline Mode: verified local ${activeTier} access preserved (${grace.daysRemaining}d remaining in 7-day offline grace period).`
          : grace.isGraceExpired
          ? '7-day offline entitlement grace period elapsed. Reconnect once to re-verify your Google Play subscription—Free Forever worship tools remain unlocked.'
          : 'Offline Mode: Free Forever core worship & learning features active. Connect to internet to buy or restore plans.',
    };
  }

  let bridge = options?.nativeBridge;
  if (!bridge) {
    const env = await detectBillingEnvironment();
    if (env.canLaunchRealCheckout) {
      bridge = IlmizoBillingNative;
    }
  }

  if (bridge) {
    try {
      const restored = await bridge.restorePurchases();
      if (restored.activeSkus?.length) {
        const prioritySku =
          restored.activeSkus.find((s) => s === 'ilmizo_lifetime_499') ||
          restored.activeSkus.find((s) => s === 'ilmizo_family_199') ||
          restored.activeSkus[0];
        const tier = mapSkuToEntitlement(prioritySku);
        const nowIso = new Date().toISOString();
        const orderId = restored.orderId || user.subscriptionOrderId;
        return {
          ok: true,
          patch: {
            entitlement: tier,
            subscriptionPurchaseSource: 'google_play',
            subscriptionSku: prioritySku,
            subscriptionOrderId: orderId,
            subscriptionUpdatedAtIso: nowIso,
            subscriptionLastVerifiedAtIso: nowIso,
            subscriptionAutoRenewing: restored.isAutoRenewing,
            subscriptionProofToken: computeEntitlementProofSync({
              entitlement: tier,
              source: 'google_play',
              sku: prioritySku,
              orderId,
            }),
          },
          message: `Restored Google Play subscription (${prioritySku}).`,
        };
      }

      if (restored.pendingSkus?.length) {
        return {
          ok: false,
          message:
            'Your Google Play payment is still pending confirmation. Premium access unlocks automatically once Play confirms it.',
        };
      }

      if (
        restored.queriedSuccessfully !== false &&
        user.subscriptionPurchaseSource === 'google_play' &&
        user.entitlement !== 'free'
      ) {
        const nowIso = new Date().toISOString();
        return {
          ok: false,
          downgraded: true,
          patch: {
            entitlement: 'free',
            subscriptionPurchaseSource: 'none',
            subscriptionSku: undefined,
            subscriptionOrderId: undefined,
            subscriptionProofToken: undefined,
            subscriptionAutoRenewing: false,
            subscriptionUpdatedAtIso: nowIso,
            subscriptionLastVerifiedAtIso: nowIso,
          },
          message:
            'Your Google Play subscription is no longer active (expired or refunded). Reverted to Free Forever Core.',
        };
      }

      return {
        ok: false,
        message: 'No active Google Play subscriptions found on this Google account.',
      };
    } catch {
      return {
        ok: false,
        message: 'Could not reach Google Play Billing. Existing offline entitlements are preserved.',
      };
    }
  }

  const trial = getTrialStatus(user);
  if (trial.isTrialActive) {
    return {
      ok: true,
      message: `Local 7-Day Family Trial active (${trial.daysRemaining} day(s) remaining).`,
    };
  }

  return {
    ok: true,
    message: `Local entitlements verified (${getEffectiveEntitlement(user)}). Live receipt sync runs on Google Play Android.`,
  };
}

export async function attemptPlayStoreRestore(user: UserProfile): Promise<{
  ok: boolean;
  downgraded?: boolean;
  patch?: Partial<UserProfile>;
  message: string;
}> {
  return reconcileGooglePlayEntitlements(user);
}

// ============================================================================
// GOOGLE PLAY FAMILIES POLICY PARENT GATE
// ============================================================================

export interface ParentGateChallenge {
  a: number;
  b: number;
  question: string;
  expectedAnswer: number;
}

export function createParentGateChallenge(seed = Date.now()): ParentGateChallenge {
  const a = 4 + (seed % 5); // 4..8
  const b = 3 + (Math.floor(seed / 7) % 6); // 3..8
  return {
    a,
    b,
    question: `${a} × ${b}`,
    expectedAnswer: a * b,
  };
}

export function verifyParentGateAnswer(challenge: ParentGateChallenge, rawInput: string): boolean {
  const parsed = Number.parseInt(rawInput.trim(), 10);
  return Number.isFinite(parsed) && parsed === challenge.expectedAnswer;
}

export function resolvePlanText<T>(
  map: Partial<Record<CoreSupportedLanguage, T>>,
  lang: LanguageCode
): T {
  return (map[lang as CoreSupportedLanguage] ?? map.en) as T;
}
