import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Award,
  Bell,
  Bookmark,
  BookOpen,
  ChevronRight,
  Flame,
  Globe,
  GraduationCap,
  Home,
  Lock,
  Moon,
  MoreHorizontal,
  Play,
  Sparkles,
  User,
} from 'lucide-react';
import {
  AdultRoute,
  AppMode,
  DailyVerseActivity,
  HifzPlan,
  IslamicLesson,
  LanguageCode,
  PrayerName,
  PrayerStatus,
  RevisionItem,
  UserProfile,
} from '../../types/ilmizo';
import { LanguageOption } from '../../data/i18n';
import { CharacterAvatar, MobileStatusBar } from '../pwa/PWAComponents';
import { SelectSheetField } from '../sheets/SelectSheet';

/**
 * Centralized Ilmizo Design Tokens matching the supplied Reference Specification
 */
export const ILMIZO_TOKENS = {
  colors: {
    deepEmerald: '#0F3826',
    forestEmerald: '#14532D',
    darkHeroEmerald: '#09261A',
    brightGreen: '#22C55E',
    warmIvory: '#FDFBF7',
    softCream: '#FEF3C7',
    cardCream: '#FAF6EE',
    goldPrimary: '#D97706',
    warmGold: '#F59E0B',
    champagneGold: '#FDE68A',
    borderGold: '#D4AF37',
    slateText: '#334155',
  },
  radii: {
    card: 'rounded-[22px]',
    pill: 'rounded-full',
    tile: 'rounded-[18px]',
  },
} as const;

export type IslamicIconVariant =
  | 'quran_rehal'
  | 'hifz_mushaf'
  | 'hifz_medal'
  | 'kaaba'
  | 'mosque_dome'
  | 'dua_hands'
  | 'allah_calligraphy'
  | 'seerah_mosque'
  | 'lessons_books'
  | 'quizzes_trophy'
  | 'qibla_compass'
  | 'tasbih_beads'
  | 'hijri_calendar';

/**
 * Helper to format Hifz Revision references cleanly without duplicate "Ayahs Ayah" text.
 * Example output: "Ayat al-Kursi · Al-Baqarah 2:255" or "Al-Mulk · Ayahs 1-10"
 */
export function formatRevisionReference(rev?: RevisionItem): string {
  if (!rev) return 'Schedule a Surah revision';
  const raw = rev.ayahRange.trim();
  if (rev.surahNumber === 2 && raw.includes('255')) {
    return 'Ayat al-Kursi · Al-Baqarah 2:255';
  }
  if (/^ayahs?\s+/i.test(raw)) {
    const cleaned = raw.replace(/^ayahs?\s+/i, '');
    return `${rev.surahName} ${rev.surahNumber}:${cleaned}`;
  }
  return `${rev.surahName} · Ayahs ${raw}`;
}

/**
 * Unified Premium 3D-Style Emerald & Champagne-Gold Islamic Icon Set
 */
export const Islamic3DIcon: React.FC<{
  variant: IslamicIconVariant;
  size?: 'sm' | 'md' | 'lg';
}> = ({ variant, size = 'md' }) => {
  const dim = size === 'lg' ? 'w-12 h-12' : size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';

  switch (variant) {
    case 'quran_rehal':
      return (
        <svg viewBox="0 0 64 64" className={dim} aria-hidden="true">
          <defs>
            <linearGradient id="rehalWood" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="quranPage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
            <linearGradient id="emeraldCover" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#0F3826" />
            </linearGradient>
          </defs>
          {/* Soft Warm Halo */}
          <circle cx="32" cy="32" r="24" fill="#FEF3C7" opacity="0.55" />
          {/* Wooden X-Stand (Rehal) */}
          <path d="M14 48 L32 35 L50 48 L46 53 L32 42 L18 53 Z" fill="url(#rehalWood)" />
          <path d="M19 37 L45 53 M45 37 L19 53" stroke="#78350F" strokeWidth="3.2" strokeLinecap="round" />
          {/* Emerald & Gold Book Cover Base */}
          <path d="M9 23 L32 30 L55 23 L51 39 L32 45 L13 39 Z" fill="url(#emeraldCover)" stroke="#D97706" strokeWidth="1.5" />
          {/* Open Illuminated Pages */}
          <path d="M11 20 Q21 18 32 26 Q43 18 53 20 L50 36 Q41 34 32 41 Q23 34 14 36 Z" fill="url(#quranPage)" stroke="#D97706" strokeWidth="1.5" />
          <line x1="32" y1="25" x2="32" y2="41" stroke="#B45309" strokeWidth="1.5" />
          {/* Ornate Gold Medallions on Pages */}
          <circle cx="22" cy="28" r="2.8" fill="#D97706" opacity="0.75" />
          <circle cx="42" cy="28" r="2.8" fill="#D97706" opacity="0.75" />
        </svg>
      );

    case 'hifz_mushaf':
      return (
        <svg viewBox="0 0 64 64" className={dim} aria-hidden="true">
          <defs>
            <linearGradient id="mushafEmerald" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#0F3826" />
            </linearGradient>
            <linearGradient id="mushafGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Soft Warm Halo */}
          <circle cx="32" cy="32" r="24" fill="#FEF3C7" opacity="0.55" />
          {/* 3D Tilted Mushaf Pages (Bottom Edge) */}
          <path d="M12 35 L32 46 L52 35 L52 41 L32 52 L12 41 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.4" />
          {/* Deep Emerald Ornate Mushaf Cover */}
          <path d="M12 25 L32 14 L52 25 L32 36 Z" fill="url(#mushafEmerald)" stroke="#F59E0B" strokeWidth="1.6" />
          {/* Inner Gold Filigree Frame */}
          <path d="M17 25 L32 17 L47 25 L32 33 Z" fill="none" stroke="#FDE68A" strokeWidth="1" opacity="0.85" />
          {/* Center Gold Rosette Emblem */}
          <circle cx="32" cy="25" r="4.5" fill="url(#mushafGold)" />
          {/* Golden Bookmark Tassel */}
          <path d="M32 46 L32 54 L29 52" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'hifz_medal':
      return (
        <svg viewBox="0 0 64 64" className={dim} aria-hidden="true">
          <defs>
            <linearGradient id="hifzGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="44" height="44" rx="14" fill="#0F3826" stroke="#D4AF37" strokeWidth="2" />
          <path d="M25 38 L21 50 L27 47 L30 51 L32 39" fill="#D97706" />
          <path d="M39 38 L43 50 L37 47 L34 51 L32 39" fill="#B45309" />
          <circle cx="32" cy="26" r="12" fill="url(#hifzGold)" stroke="#FFFBEB" strokeWidth="1.5" />
          <circle cx="32" cy="26" r="8" fill="none" stroke="#78350F" strokeWidth="1.2" strokeDasharray="2 2" />
          <path d="M32 20 L33.8 24 L38 24.4 L34.8 27.2 L35.8 31.4 L32 29.1 L28.2 31.4 L29.2 27.2 L26 24.4 L30.2 24 Z" fill="#78350F" />
        </svg>
      );

    case 'kaaba':
      return (
        <svg viewBox="0 0 64 64" className={dim} aria-hidden="true">
          <circle cx="32" cy="32" r="24" fill="#FEF3C7" opacity="0.55" />
          <ellipse cx="32" cy="50" rx="20" ry="5" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
          <path d="M15 21 L32 28 L32 49 L15 42 Z" fill="#1E293B" />
          <path d="M32 28 L49 21 L49 42 L32 49 Z" fill="#0F172A" />
          <path d="M15 21 L32 15 L49 21 L32 28 Z" fill="#334155" />
          <path d="M15 27 L32 34 L49 27 L49 31 L32 38 L15 31 Z" fill="#F59E0B" />
          <rect x="36" y="34" width="4.5" height="8.5" rx="1" fill="#FDE68A" stroke="#D97706" strokeWidth="0.8" transform="skewY(-18)" />
        </svg>
      );

    case 'mosque_dome':
      return (
        <svg viewBox="0 0 64 64" className={dim} aria-hidden="true">
          <defs>
            <linearGradient id="domeEmerald" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#0F3826" />
            </linearGradient>
            <linearGradient id="wallCream" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
          </defs>
          {/* Soft Warm Halo */}
          <circle cx="32" cy="32" r="24" fill="#FEF3C7" opacity="0.55" />
          {/* Minaret */}
          <rect x="45" y="18" width="6" height="32" rx="2" fill="url(#wallCream)" stroke="#D97706" strokeWidth="1.4" />
          <path d="M44 18 L48 11 L52 18 Z" fill="url(#domeEmerald)" stroke="#D97706" strokeWidth="1" />
          {/* Main Emerald Dome */}
          <path d="M13 35 C13 20 41 20 41 35 Z" fill="url(#domeEmerald)" stroke="#D97706" strokeWidth="1.5" />
          {/* Golden Crescent Finial */}
          <path d="M27 15 L27 20" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="27" cy="14" r="2.2" fill="#F59E0B" />
          {/* Sanctuary Facade */}
          <rect x="11" y="35" width="32" height="15" rx="2.5" fill="url(#wallCream)" stroke="#D97706" strokeWidth="1.4" />
          {/* Golden Mihrab Archway Door */}
          <path d="M22 50 L22 41 C22 37 32 37 32 41 L32 50 Z" fill="#0F3826" stroke="#D97706" strokeWidth="1" />
        </svg>
      );

    case 'dua_hands':
      return (
        <svg viewBox="0 0 64 64" className={dim} aria-hidden="true">
          <defs>
            <linearGradient id="skinWarm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* Soft Warm Halo */}
          <circle cx="32" cy="32" r="24" fill="#FEF3C7" opacity="0.55" />
          {/* Left Palm */}
          <path
            d="M15 36 C13 26 18 17 23 17 C26 17 29 22 30 30 L30 45 C22 45 17 41 15 36 Z"
            fill="url(#skinWarm)"
            stroke="#B45309"
            strokeWidth="1.4"
          />
          {/* Right Palm */}
          <path
            d="M49 36 C51 26 46 17 41 17 C38 17 35 22 34 30 L34 45 C42 45 47 41 49 36 Z"
            fill="url(#skinWarm)"
            stroke="#B45309"
            strokeWidth="1.4"
          />
          {/* Finger Details */}
          <path d="M21 21 L23 32 M25 19 L26 32 M43 21 L41 32 M39 19 L38 32" stroke="#92400E" strokeWidth="1.1" opacity="0.55" strokeLinecap="round" />
          {/* Deep Emerald & Gold Cuffs */}
          <rect x="18" y="44" width="11" height="6.5" rx="2" fill="#0F3826" stroke="#D97706" strokeWidth="1.2" />
          <rect x="35" y="44" width="11" height="6.5" rx="2" fill="#0F3826" stroke="#D97706" strokeWidth="1.2" />
        </svg>
      );

    case 'allah_calligraphy':
      return (
        <div className={`${dim} rounded-xl bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A] border border-amber-300/80 flex items-center justify-center shadow-2xs`}>
          <span className="font-arabic text-xl font-bold text-[#0F3826] leading-none select-none">
            ٱللَّٰه
          </span>
        </div>
      );

    case 'seerah_mosque':
      return (
        <svg viewBox="0 0 64 64" className={dim} aria-hidden="true">
          <path d="M14 38 C14 21 40 21 40 38 Z" fill="#15803D" stroke="#0F3826" strokeWidth="1.4" />
          <path d="M27 17 L27 23" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          <rect x="44" y="14" width="6" height="36" rx="1.5" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.2" />
          <path d="M44 14 L47 8 L50 14 Z" fill="#D97706" />
          <rect x="11" y="38" width="32" height="12" rx="2" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.2" />
          <path d="M23 50 L23 42 C23 39 31 39 31 42 L31 50 Z" fill="#0F3826" />
        </svg>
      );

    case 'lessons_books':
      return (
        <svg viewBox="0 0 64 64" className={dim} aria-hidden="true">
          <rect x="12" y="38" width="40" height="10" rx="3" fill="#0F3826" stroke="#D4AF37" strokeWidth="1.2" />
          <rect x="15" y="40" width="34" height="6" rx="1.5" fill="#FFFBEB" />
          <rect x="14" y="27" width="36" height="10" rx="3" fill="#B45309" stroke="#FDE68A" strokeWidth="1.2" />
          <rect x="17" y="29" width="30" height="6" rx="1.5" fill="#FEF3C7" />
          <rect x="16" y="16" width="32" height="10" rx="3" fill="#15803D" stroke="#FDE68A" strokeWidth="1.2" />
          <rect x="19" y="18" width="26" height="6" rx="1.5" fill="#FFFBEB" />
          <path d="M36 22 L36 32 L33 29 L30 32 L30 22 Z" fill="#D97706" />
        </svg>
      );

    case 'quizzes_trophy':
      return (
        <svg viewBox="0 0 64 64" className={dim} aria-hidden="true">
          <path d="M18 20 H12 C12 30 16 34 22 34" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <path d="M46 20 H52 C52 30 48 34 42 34" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 14 H46 V28 C46 37 39 42 32 42 C25 42 18 37 18 28 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <rect x="29" y="42" width="6" height="7" fill="#D97706" />
          <rect x="21" y="49" width="22" height="6" rx="2" fill="#0F3826" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="32" cy="26" r="6" fill="#FFFBEB" />
          <text x="32" y="30" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F3826">?</text>
        </svg>
      );

    case 'qibla_compass':
      return (
        <svg viewBox="0 0 64 64" className={dim} aria-hidden="true">
          <circle cx="32" cy="32" r="21" fill="#0F3826" stroke="#F59E0B" strokeWidth="3" />
          <circle cx="32" cy="32" r="17" fill="none" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 3" />
          <polygon points="32,14 37,32 32,29 27,32" fill="#F59E0B" />
          <polygon points="32,50 37,32 32,35 27,32" fill="#94A3B8" />
          <circle cx="32" cy="32" r="3" fill="#FFFBEB" />
        </svg>
      );

    case 'tasbih_beads':
      return (
        <svg viewBox="0 0 64 64" className={dim} aria-hidden="true">
          {[
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
            [18, 22],
          ].map(([cx, cy], idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r="4.2"
              fill={idx % 3 === 0 ? '#15803D' : '#0F3826'}
              stroke="#FDE68A"
              strokeWidth="0.8"
            />
          ))}
          <rect x="30" y="44" width="4" height="6" rx="1.5" fill="#D97706" />
          <path d="M32 50 L28 57 H36 Z" fill="#F59E0B" />
        </svg>
      );

    case 'hijri_calendar':
      return (
        <svg viewBox="0 0 64 64" className={dim} aria-hidden="true">
          <rect x="12" y="16" width="40" height="36" rx="6" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
          <path d="M12 22 C12 18 15 16 18 16 H46 C49 16 52 18 52 22 V26 H12 Z" fill="#0F3826" />
          <rect x="21" y="12" width="3" height="7" rx="1.5" fill="#D97706" />
          <rect x="40" y="12" width="3" height="7" rx="1.5" fill="#D97706" />
          <path
            d="M35 32 A7 7 0 1 0 35 45 A5.5 5.5 0 1 1 35 32 Z"
            fill="#F59E0B"
          />
          <circle cx="38" cy="36" r="1.5" fill="#D97706" />
        </svg>
      );
  }
};

/**
 * Reusable Ilmizo Brand Emblem & Title matching the Reference Header
 */
export const IlmizoBrandLogo: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div className="flex items-center gap-2.5">
      {/* Golden Circular Open-Quran Emblem */}
      <div
        className={`${
          compact ? 'w-9 h-9' : 'w-11 h-11'
        } rounded-full bg-gradient-to-b from-[#174932] to-[#0A261A] border-2 border-[#EAB308] shadow-[0_0_15px_rgba(234,179,8,0.32)] flex items-center justify-center shrink-0 relative`}
      >
        <svg viewBox="0 0 40 40" className={compact ? 'w-5 h-5' : 'w-6 h-6'} aria-hidden="true">
          <path
            d="M7 13 Q13.5 11 20 16 Q26.5 11 33 13 V27 Q26.5 25 20 30 Q13.5 25 7 27 Z"
            fill="none"
            stroke="#FDE68A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <line x1="20" y1="16" x2="20" y2="30" stroke="#FDE68A" strokeWidth="2" />
          <path d="M12 10 L20 6 L28 10" fill="none" stroke="#F59E0B" strokeWidth="1.4" opacity="0.8" />
        </svg>
      </div>
      <div className="leading-tight">
        <span
          className={`${
            compact ? 'text-xl' : 'text-[26px]'
          } font-serif font-extrabold tracking-tight bg-gradient-to-r from-[#FFFBEB] via-[#FDE68A] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-xs block`}
        >
          Ilmizo
        </span>
        {!compact && (
          <span className="text-[10.5px] font-medium text-emerald-50/95 tracking-wide block drop-shadow-xs">
            A Complete Islamic Learning Journey
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Local Calendar Date Key & Real Daily Verse Activity Helpers
 */
export function getLocalDateKey(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function recordDailyVerseRead(
  current: DailyVerseActivity | undefined,
  surahNumber: number,
  ayahNumber: number,
  todayKey: string = getLocalDateKey()
): DailyVerseActivity {
  const verseKey = `${surahNumber}:${ayahNumber}`;
  if (!current || current.dateKey !== todayKey || !Array.isArray(current.ayahKeys)) {
    return {
      dateKey: todayKey,
      ayahKeys: [verseKey],
    };
  }
  if (current.ayahKeys.includes(verseKey)) {
    return current;
  }
  return {
    dateKey: todayKey,
    ayahKeys: [...current.ayahKeys, verseKey],
  };
}

export interface DailyFocusProgress {
  dailyGoal: number;
  rawTodayVerses: number;
  dailyCompleted: number;
  focusProgressPct: number;
  isDailyGoalMet: boolean;
}

export function computeDailyFocusProgress(
  activity: DailyVerseActivity | undefined,
  dailyGoalInput: number = 5,
  todayKey: string = getLocalDateKey()
): DailyFocusProgress {
  const dailyGoal = Math.max(1, dailyGoalInput || 5);
  const rawTodayVerses =
    activity && activity.dateKey === todayKey && Array.isArray(activity.ayahKeys)
      ? activity.ayahKeys.length
      : 0;
  const dailyCompleted = Math.min(dailyGoal, Math.max(0, rawTodayVerses));
  const focusProgressPct = Math.min(
    100,
    Math.round((dailyCompleted / dailyGoal) * 100)
  );
  const isDailyGoalMet = rawTodayVerses >= dailyGoal;

  return {
    dailyGoal,
    rawTodayVerses,
    dailyCompleted,
    focusProgressPct,
    isDailyGoalMet,
  };
}

/**
 * Real-time Prayer Countdown & Next Prayer Calculator
 */
export interface ComputedNextPrayer {
  nextPrayer: PrayerName;
  nextTimeLabel: string;
  countdownLabel: string;
  isRolloverToTomorrow: boolean;
  timeline: {
    name: PrayerName;
    time: string;
    state: 'passed' | 'next' | 'upcoming';
  }[];
}

export function parse12HrToMinutes(timeStr: string): number | null {
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function computeNextPrayerState(
  timings: Record<PrayerName, string>,
  now: Date,
  activeSalahPrayers?: Partial<Record<PrayerName, PrayerStatus>>
): ComputedNextPrayer {
  const order: PrayerName[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  let foundNext: PrayerName | null = null;
  let minutesUntilNext = 0;
  let isRolloverToTomorrow = false;

  const parsedMap: Record<PrayerName, number> = {
    Fajr: parse12HrToMinutes(timings.Fajr) ?? 292,
    Dhuhr: parse12HrToMinutes(timings.Dhuhr) ?? 728,
    Asr: parse12HrToMinutes(timings.Asr) ?? 935,
    Maghrib: parse12HrToMinutes(timings.Maghrib) ?? 1072,
    Isha: parse12HrToMinutes(timings.Isha) ?? 1148,
  };

  const isPrayerCompleted = (p: PrayerName): boolean => {
    const status = activeSalahPrayers?.[p];
    return status === 'prayed_on_time' || status === 'prayed';
  };

  for (const p of order) {
    const pMin = parsedMap[p];
    if (pMin > nowMinutes && !isPrayerCompleted(p)) {
      foundNext = p;
      minutesUntilNext = pMin - nowMinutes;
      break;
    }
  }

  // If all remaining prayers for today have passed or been completed, roll over to tomorrow's Fajr
  if (!foundNext) {
    foundNext = 'Fajr';
    isRolloverToTomorrow = true;
    minutesUntilNext =
      nowMinutes >= parsedMap.Fajr
        ? 24 * 60 - nowMinutes + parsedMap.Fajr
        : parsedMap.Fajr - nowMinutes;
  }

  const hrs = Math.floor(minutesUntilNext / 60);
  const mins = minutesUntilNext % 60;
  const countdownLabel =
    hrs > 0 ? `${hrs}h ${mins}m left` : `${Math.max(1, mins)}m left`;

  const timeline = order.map((name) => {
    const pMin = parsedMap[name];
    let state: 'passed' | 'next' | 'upcoming' = 'upcoming';
    if (!isRolloverToTomorrow && name === foundNext) {
      state = 'next';
    } else if (isRolloverToTomorrow && name === 'Fajr' && !isPrayerCompleted('Fajr')) {
      state = 'next';
    } else if (pMin <= nowMinutes || isPrayerCompleted(name)) {
      state = 'passed';
    }
    return {
      name,
      time: timings[name],
      state,
    };
  });

  return {
    nextPrayer: foundNext,
    nextTimeLabel: timings[foundNext],
    countdownLabel,
    isRolloverToTomorrow,
    timeline,
  };
}

/**
 * 1 & 2. Premium Adult Home Hero Section + Balanced Branding + Today's Focus Card
 */
export const AdultHomeHeroSection: React.FC<{
  user: UserProfile;
  mode: AppMode;
  onSelectMode: (m: AppMode) => void;
  language: LanguageCode;
  supportedLanguages: LanguageOption[];
  onSelectLanguage: (l: LanguageCode) => void;
  activeHifzPlan?: HifzPlan;
  dailyVerseActivity?: DailyVerseActivity;
  recentlyOpenedCount?: number;
  onStartLearning: () => void;
  onOpenProfile: () => void;
  onOpenStreak: () => void;
  onOpenNotifications: () => void;
  t: (key: any) => string;
}> = ({
  user,
  mode,
  onSelectMode,
  language,
  supportedLanguages,
  onSelectLanguage,
  activeHifzPlan,
  dailyVerseActivity,
  onStartLearning,
  onOpenProfile,
  onOpenStreak,
  onOpenNotifications,
  t,
}) => {
  // Accurate Daily Goal vs Cumulative Surah Progress calculation (strictly from real dailyVerseActivity)
  const targetGoal = activeHifzPlan?.dailyTargetAyahs ?? 5;
  const totalMemorizedInSurah = activeHifzPlan?.memorizedAyahs ?? 12;
  const totalSurahAyahs = activeHifzPlan?.totalAyahs ?? 286;

  const {
    dailyGoal,
    dailyCompleted,
    focusProgressPct,
    isDailyGoalMet,
  } = computeDailyFocusProgress(dailyVerseActivity, targetGoal, getLocalDateKey());

  return (
    <div className="relative overflow-hidden rounded-b-[30px] bg-[#0B2B1D] text-white shadow-lg">
      {/* Golden Mosque Courtyard Artwork — Positioned to showcase the dome & courtyard arches on the right */}
      <img
        src="/assets/illustrations/adult_home_hero.webp"
        alt="Golden Mosque Courtyard at Sunrise"
        decoding="async"
        className="absolute inset-0 w-full h-[380px] object-cover object-center brightness-105 contrast-105"
      />
      {/* Directional Readability Scrim — darkens left text zone gently while keeping right-side mosque architecture bright */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,25,17,0.72) 0%, rgba(9,36,24,0.20) 34%, rgba(8,33,22,0.56) 68%, #0B2B1D 93%), linear-gradient(90deg, rgba(6,25,17,0.62) 0%, rgba(6,25,17,0.18) 58%, rgba(6,25,17,0.05) 100%)',
        }}
      />

      <div className="relative z-10">
        <MobileStatusBar time="9:41" light />

        {/* Row 1: Compact Mode Switcher (Adult Mode | Kids World) + Language + Notifications + Parent Hub */}
        <div className="px-3.5 pt-1 flex items-center justify-between gap-1.5">
          {/* Segmented Adult / Kids Switcher */}
          <div className="flex items-center bg-[#071F15]/85 backdrop-blur-md p-0.5 rounded-full border border-[#D4AF37]/45 shadow-sm">
            <button
              type="button"
              onClick={() => onSelectMode('adult')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition flex items-center gap-1 ${
                mode === 'adult'
                  ? 'bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] text-emerald-950 shadow-2xs'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              <User className="w-3 h-3" />
              <span>Adult Mode</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectMode('kids')}
              className="pl-2 pr-1.5 py-0.5 rounded-full text-[11px] font-extrabold text-emerald-50 hover:bg-white/10 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Kids World</span>
              <img
                src="/assets/illustrations/kids_hero_duo.webp"
                alt="Ayaan and Ayla"
                loading="lazy"
                decoding="async"
                className="w-5 h-5 rounded-full object-cover border border-amber-300/70"
              />
            </button>
          </div>

          {/* Right Top Controls: Language Sheet + Notifications + Parent Hub */}
          <div className="flex items-center gap-1.5">
            <SelectSheetField
              value={language}
              onChange={(val) => onSelectLanguage(val as LanguageCode)}
              title="Choose Language"
              subtitle="Update menus and translations across Ilmizo"
              ariaLabel="Select Language"
              variant="dark-pill"
              leftIcon={<Globe className="w-3.5 h-3.5 text-amber-300" />}
              className="min-h-[40px] max-w-[110px]"
              options={supportedLanguages.map((lang) => ({
                value: lang.code,
                label: lang.label,
              }))}
            />

            <button
              type="button"
              onClick={onOpenNotifications}
              title="Prayer & Hifz Reminders"
              aria-label="Notifications"
              className="min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-[#071F15]/85 backdrop-blur-md border border-[#D4AF37]/45 flex items-center justify-center text-amber-200 hover:bg-white/15 transition active:scale-95"
            >
              <Bell className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onSelectMode('parent')}
              title="Parent Hub"
              aria-label="Open Parent Hub"
              className="min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-[#071F15]/85 backdrop-blur-md border border-[#D4AF37]/45 flex items-center justify-center text-amber-200 hover:bg-white/15 transition active:scale-95"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Row 2: Brand Logo & Tagline on Left + Gold-Rimmed User Profile Avatar on Right (matching Reference) */}
        <div className="px-4 pt-2.5 flex items-center justify-between gap-2">
          <IlmizoBrandLogo />
          <button
            type="button"
            onClick={onOpenProfile}
            aria-label="Open Aqib Profile"
            title="Open My Profile"
            className="rounded-full ring-2 ring-[#EAB308] shadow-[0_0_14px_rgba(234,179,8,0.4)] hover:scale-105 transition shrink-0"
          >
            <CharacterAvatar character="Aqib" size="md" />
          </button>
        </div>

        {/* Row 3: Welcome Message & User Name with Open Right Courtyard View */}
        <div className="px-4 pt-3 pb-3.5">
          <div className="max-w-[245px] space-y-0.5">
            <p className="text-xs font-extrabold text-[#FDE68A] flex items-center gap-1.5 drop-shadow-xs">
              <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#F59E0B] fill-current shrink-0" aria-hidden="true">
                <path d="M14.5 12.5A6.5 6.5 0 0 1 7.5 2.5a6.5 6.5 0 1 0 7 10z" />
              </svg>
              <span>{t('greeting')}</span>
            </p>
            <h1 className="text-[30px] font-extrabold tracking-tight text-white drop-shadow-sm leading-none pt-0.5">
              {user.name}
            </h1>
            <p className="text-[11.5px] text-emerald-50/95 leading-snug pt-1 drop-shadow-xs font-medium">
              {t('subtitle_home')}
            </p>
          </div>
        </div>

        {/* Row 4: Today's Focus Card with Gold Border, Streak Pill, Accurate Daily Goal & Start Learning CTA */}
        <div className="mx-3.5 mb-3.5 rounded-[22px] bg-gradient-to-r from-[#082418]/95 via-[#0D3524]/95 to-[#12422D]/95 border-[1.5px] border-[#D4AF37] p-3.5 shadow-[0_10px_28px_rgba(0,0,0,0.45)] relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />

          {/* Card Header: Today's Focus + Clickable Real Streak Pill */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-xs font-extrabold tracking-wide text-[#FDE68A]">
              {t('todays_focus')}
            </span>
            <button
              type="button"
              onClick={onOpenStreak}
              className="px-2.5 py-0.5 rounded-full bg-[#071F15]/90 border border-[#D4AF37]/65 flex items-center gap-1 text-[11px] font-extrabold text-amber-200 hover:border-amber-300 transition shadow-2xs"
              title="View Learning Streak & Progress"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="tabular-nums">Streak: {user.streakDays}d</span>
            </button>
          </div>

          {/* Card Body: Golden Quran Emblem + Recommended Surah/Ayah + Progress Bar + Start Learning Button */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#174E36] to-[#092418] border-2 border-[#D4AF37] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <Islamic3DIcon variant="quran_rehal" size="lg" />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-[14px] font-extrabold text-white leading-snug">
                {t('read_verses_reflection')}
              </h2>
              <p className="text-xs font-semibold text-[#FDE68A] mt-0.5">
                {user.lastRead.surahName} · Ayah {user.lastRead.ayahNumber}
              </p>

              {/* Progress Bar */}
              <div className="mt-2 w-full h-1.5 rounded-full bg-emerald-950/90 border border-emerald-700/40 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#22C55E] via-[#34D399] to-[#F59E0B] transition-all duration-300"
                  style={{ width: `${focusProgressPct === 0 ? 0 : Math.max(12, focusProgressPct)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card Footer: Honest Daily Goal vs Cumulative Surah Progress + Start Learning CTA */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold text-emerald-100 tabular-nums">
                {isDailyGoalMet
                  ? `${dailyGoal} / ${dailyGoal} verses · Daily goal complete`
                  : `${dailyCompleted} / ${dailyGoal} verses daily goal`}
              </p>
              <p className="text-[11px] text-emerald-200/80 font-medium tabular-nums">
                Surah Hifz: {totalMemorizedInSurah} of {totalSurahAyahs} ayahs memorized
              </p>
            </div>

            <button
              type="button"
              onClick={onStartLearning}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] text-emerald-950 font-extrabold text-xs shadow-md hover:brightness-105 active:scale-98 transition inline-flex items-center gap-1.5 shrink-0"
            >
              <span>{t('start_learning')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 4. Quick Access — 4 Primary Shortcuts with Unified Premium Icon Medallions
 */
export const QuickAccessPillars: React.FC<{
  onSelectRoute: (route: AdultRoute) => void;
  t: (key: any) => string;
}> = ({ onSelectRoute, t }) => {
  const pillars: {
    route: AdultRoute;
    label: string;
    icon: IslamicIconVariant;
  }[] = [
    {
      route: 'quran_list',
      label: t('quran'),
      icon: 'quran_rehal',
    },
    {
      route: 'hifz',
      label: t('hifz'),
      icon: 'hifz_mushaf',
    },
    {
      route: 'salah',
      label: t('salah'),
      icon: 'mosque_dome',
    },
    {
      route: 'duas',
      label: t('duas'),
      icon: 'dua_hands',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {pillars.map((item) => (
        <button
          key={item.route}
          type="button"
          onClick={() => onSelectRoute(item.route)}
          className="group rounded-[20px] bg-gradient-to-b from-[#FFFDF9] to-[#F5EFE0] dark:from-[#102B20] dark:to-[#0B2118] border border-[#D4AF37]/40 dark:border-amber-400/20 p-2.5 shadow-2xs hover:border-[#14532D]/60 dark:hover:border-amber-400/45 hover:shadow-sm active:scale-98 transition flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#FFFDF7] to-[#FEF3C7]/75 dark:from-[#153628] dark:to-[#0E281D] border border-[#D4AF37]/45 dark:border-amber-400/25 flex items-center justify-center shadow-inner group-hover:scale-105 transition">
            <Islamic3DIcon variant={item.icon} size="md" />
          </div>
          <span className="text-xs font-extrabold text-[#0F3826] dark:text-emerald-50 mt-1.5 leading-tight">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

/**
 * 3. Next Prayer Card with Verified Jamshedpur Timings, Live Countdown & 5-Prayer Daily Timeline
 */
export const NextPrayerCard: React.FC<{
  city: string;
  prayerTimings: Record<PrayerName, string>;
  activeSalahPrayers: Record<PrayerName, PrayerStatus>;
  isLiveTimingsSynced: boolean;
  onOpenSalah: () => void;
  t: (key: any) => string;
}> = ({
  city,
  prayerTimings,
  activeSalahPrayers,
  isLiveTimingsSynced,
  onOpenSalah,
  t,
}) => {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const computed = computeNextPrayerState(prayerTimings, now, activeSalahPrayers);

  return (
    <button
      type="button"
      onClick={onOpenSalah}
      className="w-full rounded-[22px] bg-gradient-to-r from-[#FFFDF9] via-[#FAF5E8] to-[#F5EBD6] dark:from-[#0E291E] dark:via-[#102E22] dark:to-[#133426] p-3.5 shadow-xs border border-[#D4AF37]/40 dark:border-amber-400/25 hover:border-[#14532D]/50 dark:hover:border-amber-400/50 transition text-left relative overflow-hidden"
    >
      {/* Subtle Decorative Mosque Silhouette on Right */}
      <svg
        viewBox="0 0 120 80"
        className="w-28 h-20 absolute right-0 top-0 opacity-15 dark:opacity-10 pointer-events-none text-[#B45309] dark:text-amber-300"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M85 10 L88 22 L88 75 L82 75 L82 22 Z" />
        <path d="M35 45 C35 24 75 24 75 45 L75 75 L35 75 Z" />
        <path d="M10 55 C10 42 32 42 32 55 L32 75 L10 75 Z" />
      </svg>

      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] dark:bg-amber-400/15 border border-[#D4AF37]/65 dark:border-amber-400/35 flex items-center justify-center shrink-0 shadow-2xs">
            <Islamic3DIcon variant="mosque_dome" size="md" />
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-emerald-200/80 font-semibold flex items-center gap-1.5 flex-wrap">
              <span>
                {t('next_prayer')} · {city}
              </span>
              <span className="text-[11px] text-[#14532D] dark:text-amber-300 font-bold">
                · {isLiveTimingsSynced ? 'Aladhan' : 'Karachi Calc'}
              </span>
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-extrabold text-[#0F3826] dark:text-white leading-tight">
                {computed.nextPrayer}
              </span>
              <span className="text-xs font-extrabold text-slate-800 dark:text-amber-200 tabular-nums">
                {computed.nextTimeLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <span className="px-2.5 py-1 rounded-full bg-[#0F3826]/10 dark:bg-amber-400/15 border border-[#0F3826]/15 dark:border-amber-400/30 text-[#0F3826] dark:text-amber-200 text-xs font-extrabold tabular-nums">
            {computed.countdownLabel}
          </span>
          <ChevronRight className="w-4 h-4 text-slate-500 dark:text-emerald-200/60" />
        </div>
      </div>

      {/* 5-Prayer Daily Schedule Strip */}
      <div className="relative z-10 mt-3 pt-2.5 border-t border-amber-900/10 dark:border-emerald-200/10 grid grid-cols-5 gap-1">
        {computed.timeline.map((item) => {
          const status = activeSalahPrayers[item.name] || 'pending';
          const isPrayed = status === 'prayed_on_time' || status === 'prayed';
          const isNext = item.state === 'next';

          return (
            <div key={item.name} className="flex flex-col items-center text-center">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[11px] font-extrabold mb-1 ${
                  isPrayed
                    ? 'bg-[#14532D] dark:bg-emerald-500 text-white dark:text-emerald-950'
                    : isNext
                    ? 'bg-amber-400 text-emerald-950 ring-2 ring-amber-200 dark:ring-amber-400/35'
                    : 'bg-slate-200 dark:bg-emerald-900/60 text-slate-600 dark:text-emerald-200/70'
                }`}
              >
                {isPrayed ? '✓' : isNext ? '☀' : '•'}
              </div>
              <span
                className={`text-[11px] font-extrabold leading-tight ${
                  isNext
                    ? 'text-[#0F3826] dark:text-amber-300'
                    : 'text-slate-700 dark:text-emerald-100/85'
                }`}
              >
                {item.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-600 dark:text-emerald-200/65 tabular-nums leading-tight mt-0.5">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </button>
  );
};

/**
 * 4. Hifz Queue & Next Lesson Cards (Corrected Reference Text & Real Schedule Data)
 */
export const HifzAndLessonCards: React.FC<{
  revisionItems: RevisionItem[];
  nextRecommendedLesson: IslamicLesson;
  onOpenHifzQueue: () => void;
  onOpenNextLesson: () => void;
}> = ({
  revisionItems,
  nextRecommendedLesson,
  onOpenHifzQueue,
  onOpenNextLesson,
}) => {
  const dueRevisions = revisionItems.filter((r) => r.dueStatus !== 'upcoming');
  const dueCount = dueRevisions.length;
  const primaryRevision = dueRevisions[0] || revisionItems[0];
  const formattedReference = formatRevisionReference(primaryRevision);

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {/* Hifz Queue Card */}
      <button
        type="button"
        onClick={onOpenHifzQueue}
        className="rounded-[20px] bg-gradient-to-br from-[#FFFDF9] to-[#FAF3E3] dark:from-[#102B20] dark:to-[#0C2118] p-3.5 shadow-2xs border border-[#D4AF37]/40 dark:border-amber-400/25 hover:border-[#14532D]/60 dark:hover:border-amber-400/50 text-left transition flex flex-col justify-between gap-2 relative overflow-hidden group"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] dark:bg-amber-400/15 border border-amber-300/80 dark:border-amber-400/30 flex items-center justify-center text-amber-800 dark:text-amber-300 shrink-0">
            <Bookmark className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-300">
            Hifz Queue
          </span>
        </div>

        <div>
          <p className="text-[15px] font-extrabold text-slate-900 dark:text-white tabular-nums leading-tight">
            {dueCount > 0 ? `${dueCount} Due Today` : 'All Caught Up'}
          </p>
          <p className="text-xs font-semibold text-slate-700 dark:text-emerald-100/80 leading-snug mt-1">
            {formattedReference}
          </p>
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[11px] font-extrabold text-amber-900 dark:text-amber-300">
            Review now
          </span>
          <span className="w-6 h-6 rounded-full bg-amber-400/30 dark:bg-amber-400/20 text-amber-950 dark:text-amber-200 flex items-center justify-center group-hover:translate-x-0.5 transition">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </button>

      {/* Next Lesson Card */}
      <button
        type="button"
        onClick={onOpenNextLesson}
        className="rounded-[20px] bg-gradient-to-br from-[#FFFDF9] to-[#EFF8F2] dark:from-[#102B20] dark:to-[#0D261C] p-3.5 shadow-2xs border border-emerald-900/15 dark:border-emerald-400/20 hover:border-[#14532D]/60 dark:hover:border-emerald-400/45 text-left transition flex flex-col justify-between gap-2 relative overflow-hidden group"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100/90 dark:bg-emerald-500/15 border border-emerald-300/70 dark:border-emerald-400/25 flex items-center justify-center text-[#14532D] dark:text-emerald-300 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#14532D] dark:text-emerald-300">
            Next Lesson
          </span>
        </div>

        <div>
          <p className="text-[15px] font-extrabold text-slate-900 dark:text-white leading-tight">
            {nextRecommendedLesson.title}
          </p>
          <p className="text-xs font-semibold text-slate-600 dark:text-emerald-100/75 leading-snug mt-1">
            {nextRecommendedLesson.category} · {nextRecommendedLesson.durationMin} min
          </p>
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[11px] font-extrabold text-[#14532D] dark:text-emerald-300">
            Start lesson
          </span>
          <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-[#14532D] dark:text-emerald-300 flex items-center justify-center group-hover:translate-x-0.5 transition">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </button>
    </div>
  );
};

/**
 * 6 & 7. Explore Deen & Daily Tools Grid (Zero Truncated Titles) + Real Continue Learning & Progress
 */
export const ExploreDeenSection: React.FC<{
  user: UserProfile;
  completedLessonsCount: number;
  totalMemorizedAyahs?: number;
  onSelectRoute: (route: AdultRoute) => void;
  onSwitchToKids: () => void;
  onContinueReading: () => void;
}> = ({
  user,
  completedLessonsCount,
  totalMemorizedAyahs = 19,
  onSelectRoute,
  onSwitchToKids,
  onContinueReading,
}) => {
  const tools: {
    label: string;
    subtitle: string;
    route: AdultRoute;
    icon: IslamicIconVariant;
  }[] = [
    { label: '99 Names', subtitle: 'of Allah', route: 'names99', icon: 'allah_calligraphy' },
    { label: 'Seerah', subtitle: 'Timeline', route: 'seerah', icon: 'seerah_mosque' },
    { label: 'Lessons', subtitle: 'Knowledge', route: 'lessons', icon: 'lessons_books' },
    { label: 'Quizzes', subtitle: 'Practice', route: 'quizzes', icon: 'quizzes_trophy' },
    { label: 'Qibla', subtitle: 'Compass', route: 'qibla', icon: 'qibla_compass' },
    { label: 'Tasbih', subtitle: 'Counter', route: 'tasbih', icon: 'tasbih_beads' },
    { label: 'Calendar', subtitle: 'Hijri Dates', route: 'calendar', icon: 'hijri_calendar' },
  ];

  return (
    <div className="space-y-3">
      {/* Main Explore Deen Card */}
      <div className="rounded-[24px] bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-xs font-extrabold text-[var(--text-primary)] tracking-tight">
            Explore Deen & Daily Tools
          </h3>
          <button
            type="button"
            onClick={() => onSelectRoute('more')}
            className="text-xs font-extrabold text-[#14532D] dark:text-amber-300 hover:underline flex items-center gap-0.5"
          >
            <span>See All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {tools.map((tool) => (
            <button
              key={tool.route}
              type="button"
              onClick={() => onSelectRoute(tool.route)}
              className="rounded-2xl bg-[var(--bg-elevated)] hover:brightness-97 dark:hover:brightness-110 border border-[var(--border-subtle)] px-1.5 py-2.5 transition flex flex-col items-center text-center group"
            >
              <div className="w-9 h-9 flex items-center justify-center group-hover:scale-105 transition">
                <Islamic3DIcon variant={tool.icon} size="sm" />
              </div>
              <span className="text-[11px] font-extrabold text-[var(--text-primary)] mt-1.5 leading-tight">
                {tool.label}
              </span>
              <span className="text-[11px] font-medium text-[var(--text-muted)] leading-tight mt-0.5">
                {tool.subtitle}
              </span>
            </button>
          ))}

          {/* 8th Slot: Dedicated Kids World Card with Ayaan & Ayla Artwork */}
          <button
            type="button"
            onClick={onSwitchToKids}
            className="rounded-2xl bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A] dark:from-amber-500/25 dark:to-amber-600/20 border border-amber-400/80 dark:border-amber-400/40 px-1.5 py-2.5 transition flex flex-col items-center text-center group shadow-2xs"
          >
            <img
              src="/assets/illustrations/kids_hero_duo.webp"
              alt="Kids World - Ayaan & Ayla"
              loading="lazy"
              decoding="async"
              className="w-9 h-9 rounded-xl object-cover border border-white dark:border-amber-300/60 shadow-2xs group-hover:scale-105 transition"
            />
            <span className="text-[11px] font-extrabold text-emerald-950 dark:text-amber-200 mt-1.5 leading-tight">
              Kids World
            </span>
            <span className="text-[11px] font-semibold text-amber-900 dark:text-amber-300/85 leading-tight mt-0.5">
              For Kids
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Summary Strip: Continue Learning & My Progress (Real Saved Records) */}
      <div className="grid grid-cols-12 gap-2.5">
        <button
          type="button"
          onClick={onContinueReading}
          className="col-span-7 rounded-2xl bg-[var(--bg-surface)] p-3 shadow-2xs border border-[var(--border-subtle)] hover:border-[#14532D]/50 dark:hover:border-amber-400/40 transition flex items-center justify-between gap-2 text-left"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#0F3826] border border-[#D4AF37]/60 flex items-center justify-center shrink-0">
              <Islamic3DIcon variant="quran_rehal" size="sm" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-[#14532D] dark:text-amber-300">
                Continue Learning
              </p>
              <p className="text-[11px] font-semibold text-[var(--text-secondary)] leading-tight mt-0.5 truncate">
                {user.lastRead.surahName} · Ayah {user.lastRead.ayahNumber}
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#0F3826] text-amber-300 flex items-center justify-center shrink-0 shadow-2xs">
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectRoute('progress')}
          className="col-span-5 rounded-2xl bg-[var(--bg-surface)] p-3 shadow-2xs border border-[var(--border-subtle)] hover:border-[#14532D]/50 dark:hover:border-amber-400/40 transition flex items-center justify-between gap-1.5 text-left"
        >
          <div>
            <p className="text-[11px] font-extrabold text-[var(--text-muted)]">My Progress</p>
            <p className="text-sm font-extrabold text-[var(--text-primary)] tabular-nums leading-tight mt-0.5">
              {completedLessonsCount} Lessons
            </p>
            <p className="text-[11px] font-semibold text-[var(--text-secondary)] tabular-nums leading-tight mt-0.5">
              {totalMemorizedAyahs} Ayahs Hifz
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
        </button>
      </div>
    </div>
  );
};

/**
 * 8. Clean 5-Tab Deep-Emerald Adult Bottom Navigation Bar (Home · Quran · Salah · Learn · More)
 */
export const AdultBottomNav: React.FC<{
  activeRoute: AdultRoute;
  onSelectRoute: (route: AdultRoute) => void;
  t: (key: any) => string;
}> = ({ activeRoute, onSelectRoute, t }) => {
  const navItems: {
    id: AdultRoute;
    label: string;
    icon: React.FC<{ className?: string }>;
    match: AdultRoute[];
  }[] = [
    { id: 'home', label: t('home'), icon: Home, match: ['home'] },
    {
      id: 'quran_list',
      label: t('quran'),
      icon: BookOpen,
      match: ['quran_list', 'quran_read', 'quran_journal'],
    },
    {
      id: 'salah',
      label: t('salah'),
      icon: Moon,
      match: ['salah', 'qibla', 'tasbih', 'calendar'],
    },
    {
      id: 'lessons',
      label: 'Learn',
      icon: GraduationCap,
      match: ['lessons', 'hifz', 'duas', 'names99', 'seerah', 'quizzes', 'progress'],
    },
    {
      id: 'more',
      label: t('more'),
      icon: MoreHorizontal,
      match: ['more', 'profile', 'tasks_expenses'],
    },
  ];

  return (
    <nav
      aria-label="Adult Mode Navigation"
      className="sticky bottom-0 left-0 right-0 z-30 bg-[#09261A]/95 backdrop-blur-md text-emerald-100/85 border-t border-[#D4AF37]/25 px-2 pt-1.5 pb-safe shadow-[0_-8px_24px_rgba(0,0,0,0.24)]"
    >
      <div className="grid grid-cols-5 items-center max-w-2xl mx-auto">
        {navItems.map((navItem) => {
          const Icon = navItem.icon;
          const active = navItem.match.includes(activeRoute);
          return (
            <button
              key={navItem.id}
              type="button"
              onClick={() => onSelectRoute(navItem.id)}
              aria-current={active ? 'page' : undefined}
              className="flex flex-col items-center justify-center py-0.5 min-h-[52px] transition active:scale-95"
            >
              <div
                className={`px-3.5 py-1.5 rounded-2xl flex flex-col items-center justify-center transition ${
                  active
                    ? 'bg-[#14532D] border border-[#D4AF37]/75 text-[#FDE68A] shadow-sm'
                    : 'text-emerald-100/75 hover:text-white'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                <span
                  className={`text-[11px] mt-0.5 whitespace-nowrap leading-none ${
                    active ? 'font-extrabold text-[#FDE68A]' : 'font-semibold'
                  }`}
                >
                  {navItem.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
