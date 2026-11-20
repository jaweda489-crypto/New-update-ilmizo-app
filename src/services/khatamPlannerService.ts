import { useCallback, useEffect, useState } from 'react';
import { getMushafPageMeta, MUSHAF_TOTAL_PAGES, MushafPageMeta } from '../data/mushafPageMap';

/**
 * Custom Khatam-ul-Quran Goal Planner Service (Local-First)
 *
 * Gives readers a concrete, sustainable daily Quran habit loop so reading never feels aimless:
 * - Presets: 30 Days (Ramadan / 20p/day), 60 Days (10p/day), 90 Days (~7p/day), 180 Days (~4p/day), or Custom (7..365 days)
 * - Automatic guilt-free pace recalculation if a reader misses a day
 * - Tracks completed Mushaf pages (1..604), daily streak, and projected finish date
 */

export type KhatamPresetDays = 30 | 60 | 90 | 180;

export interface KhatamPlanState {
  active: boolean;
  targetDays: number;
  startDateIso: string; // YYYY-MM-DD
  completedPages: number[]; // sorted unique 1..604
  completedDayDates: string[]; // YYYY-MM-DD dates when user completed reading
  lastReadPage: number;
}

export interface KhatamTodayTarget {
  startPage: number;
  endPage: number;
  pagesTargetToday: number;
  pagesRemainingTotal: number;
  daysRemaining: number;
  recalculatedPagesPerDay: number;
  estimatedMinutes: number;
  startMeta: MushafPageMeta;
  endMeta: MushafPageMeta;
  progressPct: number;
  isComplete: boolean;
  todayCompleted: boolean;
  projectedFinishDateLabel: string;
  streakDays: number;
}

const STORAGE_KEY = 'ilmizo_khatam_planner_v1';
const SYNC_EVENT = 'ilmizo:khatam-planner-updated';

function toLocalIsoDate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function createDefaultKhatamState(targetDays: number = 90): KhatamPlanState {
  const clampedDays = Math.max(7, Math.min(365, Math.round(targetDays)));
  return {
    active: true,
    targetDays: clampedDays,
    startDateIso: toLocalIsoDate(),
    completedPages: [],
    completedDayDates: [],
    lastReadPage: 1,
  };
}

export function loadKhatamPlanState(): KhatamPlanState {
  if (typeof localStorage === 'undefined') return createDefaultKhatamState(90);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultKhatamState(90);
    const parsed = JSON.parse(raw);
    const rawPages: number[] = Array.isArray(parsed.completedPages)
      ? (parsed.completedPages as unknown[])
          .map((n) => Number(n))
          .filter((n) => Number.isFinite(n) && n >= 1 && n <= MUSHAF_TOTAL_PAGES)
      : [];
    const pages: number[] = Array.from(new Set<number>(rawPages)).sort((a, b) => a - b);
    return {
      active: typeof parsed.active === 'boolean' ? parsed.active : true,
      targetDays: Math.max(7, Math.min(365, Number(parsed.targetDays) || 90)),
      startDateIso: typeof parsed.startDateIso === 'string' ? parsed.startDateIso : toLocalIsoDate(),
      completedPages: pages,
      completedDayDates: Array.isArray(parsed.completedDayDates) ? parsed.completedDayDates : [],
      lastReadPage: Math.max(1, Math.min(MUSHAF_TOTAL_PAGES, Number(parsed.lastReadPage) || 1)),
    };
  } catch {
    return createDefaultKhatamState(90);
  }
}

export function saveKhatamPlanState(state: KhatamPlanState): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(SYNC_EVENT));
    }
  } catch {
    // ignore storage quota errors
  }
}

function computeDateStreak(dates: string[], todayIso: string): number {
  if (dates.length === 0) return 0;
  const set = new Set(dates);
  let streak = 0;
  const cursor = new Date(`${todayIso}T12:00:00`);
  // If user hasn't read today yet, allow streak from yesterday
  if (!set.has(toLocalIsoDate(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (set.has(toLocalIsoDate(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/**
 * Pure computation of today's Khatam target, guilt-free recalculated pace, and finish date.
 */
export function computeKhatamTodayTarget(
  state: KhatamPlanState,
  now: Date = new Date()
): KhatamTodayTarget {
  const todayIso = toLocalIsoDate(now);
  const completedSet = new Set(state.completedPages);
  const completedCount = completedSet.size;
  const pagesRemainingTotal = Math.max(0, MUSHAF_TOTAL_PAGES - completedCount);
  const isComplete = pagesRemainingTotal === 0;

  // Next unread page sequentially
  let nextUnreadPage = 1;
  for (let p = 1; p <= MUSHAF_TOTAL_PAGES; p++) {
    if (!completedSet.has(p)) {
      nextUnreadPage = p;
      break;
    }
  }

  // Days elapsed since startDateIso
  const startMs = new Date(`${state.startDateIso}T12:00:00`).getTime();
  const todayMs = new Date(`${todayIso}T12:00:00`).getTime();
  const elapsedDays = Number.isFinite(startMs)
    ? Math.max(0, Math.floor((todayMs - startMs) / 86400000))
    : 0;
  const daysRemaining = Math.max(1, state.targetDays - elapsedDays);

  // Guilt-free recalculated pace: evenly distribute remaining pages over remaining days
  const recalculatedPagesPerDay = isComplete
    ? 0
    : Math.max(1, Math.ceil(pagesRemainingTotal / daysRemaining));

  const startPage = isComplete ? MUSHAF_TOTAL_PAGES : nextUnreadPage;
  const endPage = isComplete
    ? MUSHAF_TOTAL_PAGES
    : Math.min(MUSHAF_TOTAL_PAGES, startPage + recalculatedPagesPerDay - 1);
  const pagesTargetToday = isComplete ? 0 : endPage - startPage + 1;

  // Average ~2.2 minutes per standard 15-line Mushaf page
  const estimatedMinutes = Math.max(2, Math.round(pagesTargetToday * 2.2));

  const projectedDaysNeeded = isComplete
    ? 0
    : Math.ceil(pagesRemainingTotal / Math.max(1, recalculatedPagesPerDay));
  const finishDate = new Date(now.getTime() + projectedDaysNeeded * 86400000);
  const projectedFinishDateLabel = finishDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    startPage,
    endPage,
    pagesTargetToday,
    pagesRemainingTotal,
    daysRemaining,
    recalculatedPagesPerDay,
    estimatedMinutes,
    startMeta: getMushafPageMeta(startPage),
    endMeta: getMushafPageMeta(endPage),
    progressPct: Number(((completedCount / MUSHAF_TOTAL_PAGES) * 100).toFixed(1)),
    isComplete,
    todayCompleted: state.completedDayDates.includes(todayIso),
    projectedFinishDateLabel,
    streakDays: computeDateStreak(state.completedDayDates, todayIso),
  };
}

export function markKhatamPageRead(page: number): KhatamPlanState {
  const clamped = Math.max(1, Math.min(MUSHAF_TOTAL_PAGES, Math.floor(page)));
  const current = loadKhatamPlanState();
  const todayIso = toLocalIsoDate();
  const nextPages = current.completedPages.includes(clamped)
    ? current.completedPages
    : [...current.completedPages, clamped].sort((a, b) => a - b);
  const nextDates = current.completedDayDates.includes(todayIso)
    ? current.completedDayDates
    : [...current.completedDayDates, todayIso];
  const next: KhatamPlanState = {
    ...current,
    completedPages: nextPages,
    completedDayDates: nextDates,
    lastReadPage: clamped,
  };
  saveKhatamPlanState(next);
  return next;
}

export function markKhatamTodayComplete(): KhatamPlanState {
  const current = loadKhatamPlanState();
  const target = computeKhatamTodayTarget(current);
  const todayIso = toLocalIsoDate();
  const pageSet = new Set(current.completedPages);
  for (let p = target.startPage; p <= target.endPage; p++) {
    pageSet.add(p);
  }
  const nextDates = current.completedDayDates.includes(todayIso)
    ? current.completedDayDates
    : [...current.completedDayDates, todayIso];
  const next: KhatamPlanState = {
    ...current,
    completedPages: Array.from(pageSet).sort((a, b) => a - b),
    completedDayDates: nextDates,
    lastReadPage: target.endPage,
  };
  saveKhatamPlanState(next);
  return next;
}

export function useKhatamPlanner() {
  const [state, setState] = useState<KhatamPlanState>(() => loadKhatamPlanState());

  useEffect(() => {
    const sync = () => setState(loadKhatamPlanState());
    window.addEventListener(SYNC_EVENT, sync);
    return () => window.removeEventListener(SYNC_EVENT, sync);
  }, []);

  const target = computeKhatamTodayTarget(state);

  const setGoalDays = useCallback((days: number, resetProgress = false) => {
    const clamped = Math.max(7, Math.min(365, Math.round(days)));
    const prev = loadKhatamPlanState();
    const next: KhatamPlanState = resetProgress
      ? createDefaultKhatamState(clamped)
      : {
          ...prev,
          active: true,
          targetDays: clamped,
          startDateIso: toLocalIsoDate(),
        };
    saveKhatamPlanState(next);
    setState(next);
  }, []);

  const completePage = useCallback((page: number) => {
    setState(markKhatamPageRead(page));
  }, []);

  const completeTodayPortion = useCallback(() => {
    setState(markKhatamTodayComplete());
  }, []);

  const resetPlan = useCallback((days?: number) => {
    const next = createDefaultKhatamState(days ?? loadKhatamPlanState().targetDays);
    saveKhatamPlanState(next);
    setState(next);
  }, []);

  return {
    state,
    target,
    setGoalDays,
    completePage,
    completeTodayPortion,
    resetPlan,
  };
}
