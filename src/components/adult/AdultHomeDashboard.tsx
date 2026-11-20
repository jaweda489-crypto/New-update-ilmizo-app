import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Car,
  Check,
  CheckCircle2,
  ChevronRight,
  Flame,
  GitBranch,
  Image as ImageIcon,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Sun,
} from 'lucide-react';
import {
  AdultRoute,
  AppMode,
  DailyVerseActivity,
  HifzPlan,
  PrayerName,
  PrayerStatus,
  UserProfile,
} from '../../types/ilmizo';
import { CharacterAvatar } from '../pwa/PWAComponents';
import {
  computeDailyFocusProgress,
  computeNextPrayerState,
  getLocalDateKey,
  Islamic3DIcon,
  IslamicIconVariant,
} from './AdultDesignSystem';
import { SpecialModuleId } from './SpecialModulesHub';
import {
  KhatamPresetDays,
  useKhatamPlanner,
} from '../../services/khatamPlannerService';
import { MUSHAF_TOTAL_PAGES } from '../../data/mushafPageMap';
import { BottomSheet } from '../sheets/BottomSheet';
import {
  triggerLightHaptic,
  triggerSelectionHaptic,
  triggerSuccessHaptic,
} from '../../services/hapticsService';

export interface AdultHomeDashboardProps {
  user: UserProfile;
  hijriLabel: string;
  prayerTimings: Record<PrayerName, string>;
  activeSalahPrayers: Record<PrayerName, PrayerStatus>;
  isLiveTimingsSynced: boolean;
  activeHifzPlan?: HifzPlan;
  dailyVerseActivity?: DailyVerseActivity;
  onSelectMode: (mode: AppMode) => void;
  onSelectRoute: (route: AdultRoute) => void;
  onOpenTop600: () => void;
  onContinueReading: () => void;
  onOpenTodayInMushaf: (surahNumber: number, ayahNumber: number, targetPage: number) => void;
  onOpenSpecialModule: (moduleId: SpecialModuleId) => void;
  onOpenProfile: () => void;
  onOpenProgress: () => void;
  onToast?: (msg: string) => void;
  t: (key: any) => string;
}

const KHATAM_PRESETS: Array<{ days: KhatamPresetDays; label: string; desc: string }> = [
  { days: 30, label: '30 Days', desc: '1 Juz / day (~20 pages)' },
  { days: 60, label: '60 Days', desc: '½ Juz / day (~10 pages)' },
  { days: 90, label: '90 Days', desc: 'Steady (~7 pages / day)' },
  { days: 180, label: '180 Days', desc: 'Gentle (~4 pages / day)' },
];

function getFirstName(fullName: string): string {
  const trimmed = (fullName || '').trim();
  if (!trimmed) return 'Friend';
  return trimmed.split(/\s+/)[0];
}

function resolveDisplayHijriDate(rawHijriLabel: string, now: Date): string {
  const cleaned = (rawHijriLabel || '').trim();
  if (cleaned && cleaned.length > 8) {
    return cleaned;
  }
  try {
    const formatted = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(now);
    return formatted.replace(/\s*AH$/i, '') + ' AH';
  } catch {
    return cleaned || '1448 AH';
  }
}

/**
 * Dedicated crisp SVG emblem for Top 600 Quran Words shortcut
 */
const Top600ShortcutIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
    <defs>
      <linearGradient id="top600Bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#14532D" />
        <stop offset="100%" stopColor="#0B2B1D" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="24" fill="#FEF3C7" opacity="0.55" />
    <rect
      x="12"
      y="14"
      width="40"
      height="36"
      rx="10"
      fill="url(#top600Bg)"
      stroke="#D4AF37"
      strokeWidth="1.8"
    />
    <text
      x="32"
      y="31"
      textAnchor="middle"
      fontSize="15"
      fontWeight="800"
      fill="#FDE68A"
      fontFamily="serif"
    >
      ٦٠٠
    </text>
    <line x1="20" y1="38" x2="44" y2="38" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
    <line x1="24" y1="43" x2="40" y2="43" stroke="#A7F3D0" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
  </svg>
);

export const AdultHomeDashboard: React.FC<AdultHomeDashboardProps> = ({
  user,
  hijriLabel,
  prayerTimings,
  activeSalahPrayers,
  isLiveTimingsSynced,
  activeHifzPlan,
  dailyVerseActivity,
  onSelectMode,
  onSelectRoute,
  onOpenTop600,
  onContinueReading,
  onOpenTodayInMushaf,
  onOpenSpecialModule,
  onOpenProfile,
  onOpenProgress,
  onToast,
  t,
}) => {
  // Live clock ticking every 15s + immediate refresh on resume/visibility change
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const syncNow = () => setNow(new Date());
    const timer = window.setInterval(syncNow, 15000);
    const onVisibility = () => {
      if (document.visibilityState === 'visible') syncNow();
    };
    window.addEventListener('focus', syncNow);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', syncNow);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const firstName = useMemo(() => getFirstName(user.name), [user.name]);
  const displayHijri = useMemo(
    () => resolveDisplayHijriDate(hijriLabel, now),
    [hijriLabel, now]
  );
  const isFriday = now.getDay() === 5;

  // Prayer Hero state
  const computedPrayer = useMemo(
    () => computeNextPrayerState(prayerTimings, now, activeSalahPrayers),
    [prayerTimings, now, activeSalahPrayers]
  );

  const prayerOrder: PrayerName[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const prayedTodayCount = prayerOrder.filter((p) => {
    const st = activeSalahPrayers[p];
    return st === 'prayed_on_time' || st === 'prayed';
  }).length;
  const excusedTodayCount = prayerOrder.filter(
    (p) => activeSalahPrayers[p] === 'excused'
  ).length;

  // Unified Today's Qur'an state (Khatam 604-Page Planner + Daily Verse Focus + Surah Hifz)
  const { state: khatamState, target: khatamTarget, setGoalDays, completeTodayPortion, resetPlan } =
    useKhatamPlanner();
  const [goalSheetOpen, setGoalSheetOpen] = useState(false);
  const [customDays, setCustomDays] = useState<number>(khatamState.targetDays);

  const dailyFocus = useMemo(
    () =>
      computeDailyFocusProgress(
        dailyVerseActivity,
        activeHifzPlan?.dailyTargetAyahs ?? 5,
        getLocalDateKey(now)
      ),
    [dailyVerseActivity, activeHifzPlan?.dailyTargetAyahs, now]
  );

  const totalMemorizedInSurah = activeHifzPlan?.memorizedAyahs ?? 0;
  const totalSurahAyahs = activeHifzPlan?.totalAyahs ?? 286;

  const handleMarkKhatamPortionDone = () => {
    void triggerSuccessHaptic();
    completeTodayPortion();
    onToast?.(
      `MashaAllah! Logged Pages ${khatamTarget.startPage}–${khatamTarget.endPage} (${khatamTarget.pagesTargetToday}p) toward your Khatam.`
    );
  };

  // Core 8 Shortcuts (Row 1: Daily Worship · Row 2: Daily Growth)
  const coreShortcuts: Array<{
    id: string;
    label: string;
    icon?: IslamicIconVariant;
    customIcon?: React.ReactNode;
    onClick: () => void;
  }> = [
    {
      id: 'quran',
      label: t('quran') || 'Quran',
      icon: 'quran_rehal',
      onClick: () => onSelectRoute('quran_list'),
    },
    {
      id: 'salah',
      label: t('salah') || 'Salah',
      icon: 'mosque_dome',
      onClick: () => onSelectRoute('salah'),
    },
    {
      id: 'qibla',
      label: 'Qibla',
      icon: 'qibla_compass',
      onClick: () => onSelectRoute('qibla'),
    },
    {
      id: 'duas',
      label: t('duas') || 'Duas',
      icon: 'dua_hands',
      onClick: () => onSelectRoute('duas'),
    },
    {
      id: 'hifz',
      label: t('hifz') || 'Hifz',
      icon: 'hifz_mushaf',
      onClick: () => onSelectRoute('hifz'),
    },
    {
      id: 'tasbih',
      label: 'Tasbih',
      icon: 'tasbih_beads',
      onClick: () => onSelectRoute('tasbih'),
    },
    {
      id: 'top600',
      label: 'Top 600',
      customIcon: <Top600ShortcutIcon />,
      onClick: onOpenTop600,
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: 'hijri_calendar',
      onClick: () => onSelectRoute('calendar'),
    },
  ];

  // Compact Islamic Companions Strip
  const companions: Array<{
    id: string;
    title: string;
    subtitle: string;
    highlight?: boolean;
    icon: React.ReactNode;
    onClick: () => void;
  }> = [
    {
      id: 'friday_hub',
      title: 'Friday Hub',
      subtitle: isFriday ? 'Jummah Today' : 'Surah Kahf & Sunnah',
      highlight: isFriday,
      icon: <Sun className="w-4 h-4 text-amber-600 dark:text-amber-300" />,
      onClick: () => onOpenSpecialModule('friday_hub'),
    },
    {
      id: 'car_drive',
      title: 'Car Drive',
      subtitle: 'Hands-free Surah queue',
      icon: <Car className="w-4 h-4 text-[#14532D] dark:text-emerald-300" />,
      onClick: () => onOpenSpecialModule('car_drive'),
    },
    {
      id: 'reminder_cards',
      title: 'Reminder Cards',
      subtitle: 'Create & share Ayahs',
      icon: <ImageIcon className="w-4 h-4 text-amber-700 dark:text-amber-300" />,
      onClick: () => onOpenSpecialModule('reminder_cards'),
    },
    {
      id: 'names99',
      title: '99 Names',
      subtitle: 'Asma ul-Husna',
      icon: (
        <span className="font-arabic text-sm font-bold text-[#14532D] dark:text-amber-300 leading-none">
          ٱللَّٰه
        </span>
      ),
      onClick: () => onSelectRoute('names99'),
    },
    {
      id: 'seerah',
      title: 'Seerah',
      subtitle: "Prophet's ﷺ timeline",
      icon: <BookOpen className="w-4 h-4 text-[#14532D] dark:text-emerald-300" />,
      onClick: () => onSelectRoute('seerah'),
    },
    {
      id: 'prophets_tree',
      title: 'Prophets Tree',
      subtitle: '25 Quranic Prophets',
      icon: <GitBranch className="w-4 h-4 text-[#14532D] dark:text-emerald-300" />,
      onClick: () => onOpenSpecialModule('prophets_tree'),
    },
  ];

  return (
    <div className="pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors">
      {/* Compact Calm Header (~64px) — Greeting + Hijri Date on Left, Kids Mode + Avatar on Right */}
      <header className="px-4 pt-safe pb-2 max-w-5xl mx-auto">
        <div className="min-h-[60px] flex items-center justify-between gap-3 pt-2">
          <div className="min-w-0">
            <h1 className="text-[19px] sm:text-xl font-extrabold tracking-tight text-[var(--text-primary)] truncate leading-tight">
              Assalamu Alaikum, {firstName}
            </h1>
            <p className="text-xs font-medium text-[var(--text-secondary)] truncate mt-0.5">
              <span>{displayHijri}</span>
              <span aria-hidden="true" className="mx-1.5 text-[var(--text-muted)]">
                ·
              </span>
              <span>{user.city || 'Jamshedpur'}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                void triggerSelectionHaptic();
                onSelectMode('kids');
              }}
              aria-label="Switch to Kids World"
              className="min-h-[44px] px-3.5 rounded-full bg-[var(--bg-surface)] border border-[#D4AF37]/55 dark:border-amber-400/35 text-[#14532D] dark:text-amber-200 text-xs font-extrabold inline-flex items-center gap-1.5 hover:border-[#14532D] dark:hover:border-amber-300 active:scale-95 transition whitespace-nowrap shrink-0 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300 shrink-0" />
              <span>Kids</span>
            </button>

            <button
              type="button"
              onClick={() => {
                void triggerLightHaptic();
                onOpenProfile();
              }}
              aria-label={`Open ${firstName}'s Profile`}
              title="Profile"
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center ring-2 ring-[#D4AF37]/70 dark:ring-amber-400/50 hover:scale-105 active:scale-95 transition shrink-0"
            >
              <CharacterAvatar character="Aqib" size="sm" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="px-4 pt-1.5 space-y-4 max-w-5xl mx-auto">
        {/* Desktop 2-Column Top Grid: Prayer-First Hero + Unified Today's Qur'an */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* SECTION 1: Prayer-First Hero Card (Immediately Visible Without Scrolling) */}
          <section aria-label="Next Prayer and Daily Schedule" className="lg:col-span-7 flex">
            <button
              type="button"
              onClick={() => {
                void triggerLightHaptic();
                onSelectRoute('salah');
              }}
              className="w-full rounded-[24px] bg-gradient-to-br from-[#0F3826] via-[#13462F] to-[#0B2A1C] text-white border border-[#D4AF37]/40 p-4 sm:p-5 shadow-md text-left relative overflow-hidden flex flex-col justify-between gap-4 active:scale-[0.99] transition group"
            >
              {/* Restrained Architectural Mosque Silhouette */}
              <svg
                viewBox="0 0 180 110"
                className="w-40 h-24 absolute -right-2 top-0 opacity-[0.09] pointer-events-none text-amber-200"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M138 8 L142 26 L142 105 L134 105 L134 26 Z" />
                <path d="M62 56 C62 28 118 28 118 56 L118 105 L62 105 Z" />
                <path d="M24 72 C24 54 54 54 54 72 L54 105 L24 105 Z" />
              </svg>

              {/* Top Row: Next Prayer Info + Live Countdown */}
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-emerald-100/85">
                    <span>{t('next_prayer') || 'Next Prayer'}</span>
                    <span aria-hidden="true" className="mx-1.5 text-emerald-300/50">
                      ·
                    </span>
                    <span className="text-amber-200/95">
                      {isLiveTimingsSynced ? 'Aladhan' : 'Karachi Calc'}
                    </span>
                  </p>

                  <div className="flex items-baseline gap-2.5 mt-1 flex-wrap">
                    <h2 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-white leading-none">
                      {computedPrayer.nextPrayer}
                    </h2>
                    <span className="text-base font-bold text-[#FDE68A] tabular-nums">
                      {computedPrayer.nextTimeLabel}
                    </span>
                  </div>

                  <p className="text-xs text-emerald-100/80 font-medium mt-1.5 tabular-nums">
                    {excusedTodayCount === 5
                      ? 'Excused day logged · Streak protected'
                      : `${prayedTodayCount} of 5 prayers logged today`}
                    {computedPrayer.isRolloverToTomorrow ? ' · Tomorrow’s Fajr next' : ''}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-sm sm:text-base font-extrabold text-[#FDE68A] tabular-nums whitespace-nowrap">
                    {computedPrayer.countdownLabel}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-100/80 inline-flex items-center gap-0.5 group-hover:text-white transition whitespace-nowrap">
                    <span>Salah Tracker</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* 5-Prayer Daily Timeline Strip */}
              <div className="relative z-10 pt-3 border-t border-white/15 grid grid-cols-5 gap-1">
                {computedPrayer.timeline.map((item) => {
                  const status = activeSalahPrayers[item.name] || 'pending';
                  const isPrayed = status === 'prayed_on_time' || status === 'prayed';
                  const isExcused = status === 'excused';
                  const isNext = item.state === 'next';

                  return (
                    <div
                      key={item.name}
                      className={`rounded-2xl py-2 px-1 flex flex-col items-center text-center transition ${
                        isNext
                          ? 'bg-white/12 border border-[#FDE68A]/45'
                          : 'border border-transparent'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold mb-1 ${
                          isPrayed
                            ? 'bg-[#22C55E] text-emerald-950'
                            : isExcused
                            ? 'bg-emerald-300/25 text-emerald-100'
                            : isNext
                            ? 'bg-[#F59E0B] text-emerald-950'
                            : 'bg-white/12 text-emerald-100/70'
                        }`}
                        aria-label={`${item.name}: ${
                          isPrayed
                            ? 'Prayed'
                            : isExcused
                            ? 'Excused'
                            : isNext
                            ? 'Next'
                            : 'Upcoming'
                        }`}
                      >
                        {isPrayed ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : isExcused ? (
                          '~'
                        ) : isNext ? (
                          '•'
                        ) : (
                          '·'
                        )}
                      </div>

                      <span
                        className={`text-[11px] font-extrabold leading-tight ${
                          isNext ? 'text-[#FDE68A]' : 'text-white/95'
                        }`}
                      >
                        {item.name}
                      </span>
                      <span className="text-[11px] font-medium text-emerald-100/75 tabular-nums leading-tight mt-0.5 whitespace-nowrap">
                        {item.time.replace(/\s?(AM|PM)$/i, '')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </button>
          </section>

          {/* SECTION 2 (Mobile: Above Unified Qur'an; Desktop: Right Column holds Unified Qur'an, Core 8 sits full width below) */}
          {/* Core 8 Quick Actions Grid on Mobile right below Prayer Hero for 1-thumb instant reach */}
          <section aria-label="Core Islamic Shortcuts" className="lg:hidden">
            <div className="grid grid-cols-4 gap-2.5">
              {coreShortcuts.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    void triggerSelectionHaptic();
                    item.onClick();
                  }}
                  className="min-h-[84px] rounded-[20px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#14532D]/45 dark:hover:border-amber-400/40 px-1.5 py-2.5 shadow-2xs flex flex-col items-center justify-center gap-1.5 text-center active:scale-95 transition group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center group-hover:scale-105 transition">
                    {item.customIcon ? (
                      item.customIcon
                    ) : (
                      <Islamic3DIcon variant={item.icon!} size="sm" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-[var(--text-primary)] leading-tight whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* SECTION 3: Unified Today's Qur'an Card (Merges Last Read + Khatam 604-Page Planner + Daily Focus/Hifz) */}
          <section
            aria-label="Today's Quran Reading and Khatam Plan"
            className="lg:col-span-5 flex"
          >
            <div className="w-full rounded-[24px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 sm:p-5 shadow-2xs flex flex-col justify-between gap-3.5">
              {/* Header: Kicker + Streak + Goal Button */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] flex-wrap">
                    <span className="font-extrabold text-[#14532D] dark:text-amber-300">
                      Today&apos;s Qur&apos;an
                    </span>
                    <span aria-hidden="true" className="text-[var(--text-muted)]">
                      ·
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        void triggerLightHaptic();
                        onOpenProgress();
                      }}
                      className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300 font-bold hover:underline tabular-nums"
                    >
                      <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{user.streakDays}d streak</span>
                    </button>
                  </div>

                  <h2 className="text-base sm:text-lg font-extrabold text-[var(--text-primary)] leading-snug mt-0.5 truncate">
                    {user.lastRead.surahName} · Ayah {user.lastRead.ayahNumber}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    void triggerLightHaptic();
                    setCustomDays(khatamState.targetDays);
                    setGoalSheetOpen(true);
                  }}
                  aria-label="Configure Khatam Goal"
                  className="min-h-[44px] px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-extrabold text-[#14532D] dark:text-emerald-200 inline-flex items-center gap-1.5 shrink-0 hover:border-[#14532D]/40 active:scale-95 transition whitespace-nowrap"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{khatamState.targetDays}d Goal</span>
                </button>
              </div>

              {/* Khatam 604-Page Daily Portion & Progress */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-2 text-xs">
                  <span className="font-bold text-[var(--text-primary)] truncate">
                    {khatamTarget.isComplete
                      ? 'Full 604-Page Khatam Complete'
                      : `Khatam: Pages ${khatamTarget.startPage}–${khatamTarget.endPage} (${khatamTarget.pagesTargetToday}p)`}
                  </span>
                  <span className="text-[11px] font-semibold text-[var(--text-secondary)] tabular-nums whitespace-nowrap shrink-0">
                    {khatamState.completedPages.length}/{MUSHAF_TOTAL_PAGES}p ({khatamTarget.progressPct}%)
                  </span>
                </div>

                <div className="h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#14532D] via-[#22C55E] to-[#F59E0B] transition-all duration-500"
                    style={{
                      width: `${Math.max(
                        khatamState.completedPages.length > 0 ? 3 : 0,
                        khatamTarget.progressPct
                      )}%`,
                    }}
                  />
                </div>

                {/* Quiet Unboxed Sub-Metrics: Daily Verses + Hifz (Zero confusion between pages & verses) */}
                <div className="pt-1 flex items-center justify-between gap-2 text-[11px] font-semibold text-[var(--text-secondary)] tabular-nums flex-wrap">
                  <span>
                    Daily focus: {dailyFocus.dailyCompleted}/{dailyFocus.dailyGoal} verses
                    {dailyFocus.isDailyGoalMet ? ' ✓' : ''}
                  </span>
                  <span>
                    Hifz: {totalMemorizedInSurah}/{totalSurahAyahs} ayahs
                  </span>
                </div>
              </div>

              {/* Action Row (48px Touch Targets) */}
              <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    void triggerSelectionHaptic();
                    onContinueReading();
                  }}
                  className="min-h-[48px] px-3.5 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4 text-[#FDE68A] shrink-0" />
                  <span>Continue Reading</span>
                </button>

                {khatamTarget.isComplete ? (
                  <button
                    type="button"
                    onClick={() => {
                      void triggerLightHaptic();
                      setCustomDays(khatamState.targetDays);
                      setGoalSheetOpen(true);
                    }}
                    className="min-h-[48px] px-3.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[#14532D] dark:text-amber-300 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 active:scale-95 transition whitespace-nowrap"
                  >
                    <RotateCcw className="w-4 h-4 shrink-0" />
                    <span>New Khatam</span>
                  </button>
                ) : khatamTarget.todayCompleted ? (
                  <button
                    type="button"
                    onClick={() => {
                      void triggerSelectionHaptic();
                      onOpenTodayInMushaf(
                        khatamTarget.startMeta.startSurah,
                        khatamTarget.startMeta.startAyah,
                        khatamTarget.startPage
                      );
                    }}
                    className="min-h-[48px] px-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/35 border border-emerald-400/50 text-[#14532D] dark:text-emerald-200 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 active:scale-95 transition whitespace-nowrap"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Open Mushaf</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleMarkKhatamPortionDone}
                    className="min-h-[48px] px-3.5 rounded-2xl bg-[var(--bg-elevated)] hover:bg-amber-50 dark:hover:bg-amber-500/15 border border-[#D4AF37]/55 dark:border-amber-400/35 text-[#0F3826] dark:text-amber-200 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 active:scale-95 transition whitespace-nowrap"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-300 shrink-0" />
                    <span>Mark {khatamTarget.pagesTargetToday}p Done</span>
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Core 8 Quick Actions Grid on Desktop (Full-width balanced 8-column or 4x2 strip) */}
        <section aria-label="Core Islamic Shortcuts Desktop" className="hidden lg:block">
          <div className="grid grid-cols-8 gap-3">
            {coreShortcuts.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  void triggerSelectionHaptic();
                  item.onClick();
                }}
                className="min-h-[92px] rounded-[20px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#14532D]/45 dark:hover:border-amber-400/40 px-2 py-3 shadow-2xs flex flex-col items-center justify-center gap-2 text-center active:scale-95 transition group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center group-hover:scale-105 transition">
                  {item.customIcon ? (
                    item.customIcon
                  ) : (
                    <Islamic3DIcon variant={item.icon!} size="sm" />
                  )}
                </div>
                <span className="text-xs font-bold text-[var(--text-primary)] leading-tight whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* SECTION 4: Compact Islamic Companions Strip */}
        <section aria-label="Islamic Companions" className="space-y-2.5 pt-0.5">
          <div className="flex items-center justify-between px-0.5">
            <h2 className="text-sm font-extrabold text-[var(--text-primary)] tracking-tight">
              Islamic Companions
            </h2>
            <button
              type="button"
              onClick={() => {
                void triggerLightHaptic();
                onSelectRoute('lessons');
              }}
              className="min-h-[44px] px-1 text-xs font-bold text-[#14532D] dark:text-amber-300 inline-flex items-center gap-1 hover:underline whitespace-nowrap"
            >
              <span>Explore Learn</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-stretch gap-2.5 overflow-x-auto pb-1.5 no-scrollbar lg:grid lg:grid-cols-6 lg:overflow-visible">
            {companions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  void triggerSelectionHaptic();
                  item.onClick();
                }}
                className={`min-h-[68px] min-w-[146px] lg:min-w-0 rounded-[20px] px-3.5 py-3 border text-left flex items-center gap-3 shrink-0 active:scale-95 transition shadow-2xs ${
                  item.highlight
                    ? 'bg-amber-50/90 dark:bg-amber-500/15 border-[#D4AF37]/70 dark:border-amber-400/45'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[#14532D]/45 dark:hover:border-amber-400/40'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.highlight
                      ? 'bg-amber-400/25 border border-amber-400/45'
                      : 'bg-[var(--bg-elevated)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-[var(--text-primary)] leading-tight whitespace-nowrap truncate">
                    {item.title}
                  </p>
                  <p className="text-[11px] font-medium text-[var(--text-secondary)] leading-tight mt-0.5 truncate">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Khatam Goal Configuration BottomSheet */}
      <BottomSheet
        open={goalSheetOpen}
        onClose={() => setGoalSheetOpen(false)}
        title="Khatam-ul-Qur'an Goal Planner"
        subtitle="Set a realistic pace — Ilmizo auto-adjusts guilt-free if you ever miss a day."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            {KHATAM_PRESETS.map((preset) => {
              const active = khatamState.targetDays === preset.days;
              return (
                <button
                  key={preset.days}
                  type="button"
                  onClick={() => {
                    void triggerSelectionHaptic();
                    setCustomDays(preset.days);
                    setGoalDays(preset.days, false);
                    onToast?.(`Khatam goal updated to ${preset.days} days`);
                  }}
                  className={`min-h-[64px] p-3.5 rounded-2xl border text-left transition active:scale-95 ${
                    active
                      ? 'bg-[#14532D] text-white border-[#D4AF37]'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)]'
                  }`}
                >
                  <p className="text-sm font-extrabold">{preset.label}</p>
                  <p
                    className={`text-[11px] mt-0.5 ${
                      active ? 'text-emerald-100' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    {preset.desc}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[var(--text-primary)]">Custom Khatam Timeline</span>
              <span className="text-[#14532D] dark:text-amber-300 tabular-nums">
                {customDays} Days (~
                {Math.max(
                  1,
                  Math.ceil(khatamTarget.pagesRemainingTotal / Math.max(1, customDays))
                )}{' '}
                pages/day)
              </span>
            </div>
            <input
              type="range"
              min={15}
              max={365}
              step={5}
              value={customDays}
              onChange={(e) => setCustomDays(Number(e.target.value))}
              className="w-full accent-[#14532D]"
            />
            <button
              type="button"
              onClick={() => {
                void triggerSuccessHaptic();
                setGoalDays(customDays, false);
                onToast?.(`Custom ${customDays}-day Khatam pace saved!`);
                setGoalSheetOpen(false);
              }}
              className="w-full min-h-[46px] rounded-xl bg-[#14532D] text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Save {customDays}-Day Goal</span>
            </button>
          </div>

          <div className="rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 p-3 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
            <strong>Guilt-Free Catch-Up:</strong> {khatamTarget.pagesRemainingTotal} pages remain
            across {khatamTarget.daysRemaining} days — your daily target automatically stays
            balanced at{' '}
            <strong className="tabular-nums">
              {khatamTarget.recalculatedPagesPerDay} pages/day
            </strong>
            .
          </div>

          <button
            type="button"
            onClick={() => {
              void triggerLightHaptic();
              resetPlan(khatamState.targetDays);
              onToast?.('Started a fresh 604-page Khatam from Page 1.');
              setGoalSheetOpen(false);
            }}
            className="w-full min-h-[44px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)] inline-flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Fresh Khatam from Page 1</span>
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};
