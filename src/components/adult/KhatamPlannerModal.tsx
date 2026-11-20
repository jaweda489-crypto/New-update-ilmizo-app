import React, { useState } from 'react';
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Flame,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { BottomSheet } from '../sheets/BottomSheet';
import {
  KhatamPresetDays,
  useKhatamPlanner,
} from '../../services/khatamPlannerService';
import { MUSHAF_TOTAL_PAGES } from '../../data/mushafPageMap';
import {
  triggerLightHaptic,
  triggerSelectionHaptic,
  triggerSuccessHaptic,
} from '../../services/hapticsService';

interface KhatamPlannerCardProps {
  onOpenTodayInMushaf: (surahNumber: number, ayahNumber: number, targetPage: number) => void;
  onToast?: (msg: string) => void;
  compact?: boolean;
}

const PRESETS: Array<{ days: KhatamPresetDays; label: string; desc: string }> = [
  { days: 30, label: '30 Days', desc: '1 Juz / day (~20 pages)' },
  { days: 60, label: '60 Days', desc: '½ Juz / day (~10 pages)' },
  { days: 90, label: '90 Days', desc: 'Steady (~7 pages / day)' },
  { days: 180, label: '180 Days', desc: 'Gentle (~4 pages / day)' },
];

export const KhatamPlannerCard: React.FC<KhatamPlannerCardProps> = ({
  onOpenTodayInMushaf,
  onToast,
  compact = false,
}) => {
  const { state, target, setGoalDays, completeTodayPortion, resetPlan } = useKhatamPlanner();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [customDays, setCustomDays] = useState<number>(state.targetDays);

  const handleMarkDone = () => {
    void triggerSuccessHaptic();
    completeTodayPortion();
    onToast?.(
      `MashaAllah! Logged Pages ${target.startPage}–${target.endPage} (${target.pagesTargetToday} pages) toward your Khatam.`
    );
  };

  return (
    <>
      <div className="rounded-[24px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 shadow-2xs space-y-3">
        {/* Top Row: Title + Streak + Configure */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#14532D] dark:text-amber-300">
              <CalendarDays className="w-3.5 h-3.5 shrink-0" />
              <span>Khatam-ul-Qur&apos;an Planner · {state.targetDays}-Day Goal</span>
            </div>
            <h3 className="text-sm font-extrabold text-[var(--text-primary)] mt-0.5">
              {target.isComplete
                ? 'Alhamdulillah! Full 604-Page Khatam Completed'
                : `Today’s Portion: Pages ${target.startPage}–${target.endPage} (${target.pagesTargetToday}p)`}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 tabular-nums">
              {target.isComplete
                ? 'Tap Goal to begin a fresh Khatam journey.'
                : `Juz ${target.startMeta.juz} · Surah ${target.startMeta.primarySurahName} · ~${target.estimatedMinutes} min`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              void triggerLightHaptic();
              setCustomDays(state.targetDays);
              setSheetOpen(true);
            }}
            className="min-h-[38px] px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-extrabold text-[#14532D] dark:text-emerald-200 inline-flex items-center gap-1 shrink-0 active:scale-95 transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Goal</span>
          </button>
        </div>

        {/* Overall 604-Page Progress Bar */}
        <div className="space-y-1">
          <div className="h-2.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#14532D] via-[#22C55E] to-[#F59E0B] transition-all duration-500"
              style={{ width: `${Math.max(state.completedPages.length > 0 ? 2 : 0, target.progressPct)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-bold text-[var(--text-muted)] tabular-nums">
            <span>
              {state.completedPages.length}/{MUSHAF_TOTAL_PAGES} pages ({target.progressPct}%)
            </span>
            <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300">
              {target.streakDays > 0 && (
                <>
                  <Flame className="w-3 h-3" />
                  <span>{target.streakDays}d</span>
                  <span>·</span>
                </>
              )}
              <span>Est. {target.projectedFinishDateLabel}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons (48px Touch Targets) */}
        {!target.isComplete && (
          <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'} gap-2`}>
            <button
              type="button"
              onClick={() => {
                void triggerSelectionHaptic();
                onOpenTodayInMushaf(
                  target.startMeta.startSurah,
                  target.startMeta.startAyah,
                  target.startPage
                );
              }}
              className="min-h-[46px] px-3.5 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition"
            >
              <BookOpen className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Read Today in Mushaf</span>
            </button>
            <button
              type="button"
              onClick={handleMarkDone}
              className={`min-h-[46px] px-3.5 rounded-2xl text-xs font-extrabold inline-flex items-center justify-center gap-1.5 border transition active:scale-95 ${
                target.todayCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-200 border-emerald-400/60'
                  : 'bg-amber-400 hover:bg-amber-300 text-emerald-950 border-amber-400'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                {target.todayCompleted
                  ? `Log Next ${target.pagesTargetToday} Pages`
                  : `Mark Today Done (${target.pagesTargetToday}p)`}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Khatam Planner Configuration BottomSheet */}
      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Khatam-ul-Qur'an Goal Planner"
        subtitle="Set a realistic pace — Ilmizo auto-adjusts guilt-free if you ever miss a day."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            {PRESETS.map((preset) => {
              const active = state.targetDays === preset.days;
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
                  <p className={`text-[11px] mt-0.5 ${active ? 'text-emerald-100' : 'text-[var(--text-secondary)]'}`}>
                    {preset.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Custom Day Target Slider */}
          <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[var(--text-primary)]">Custom Khatam Timeline</span>
              <span className="text-[#14532D] dark:text-amber-300 tabular-nums">
                {customDays} Days (~{Math.max(1, Math.ceil(target.pagesRemainingTotal / Math.max(1, customDays)))} pages/day)
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
                setSheetOpen(false);
              }}
              className="w-full min-h-[44px] rounded-xl bg-[#14532D] text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Save {customDays}-Day Goal</span>
            </button>
          </div>

          {/* Guilt-Free Auto-Pace Explainer & Reset */}
          <div className="rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 p-3 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
            <strong>Guilt-Free Catch-Up:</strong> {target.pagesRemainingTotal} pages remain across{' '}
            {target.daysRemaining} days — your daily target automatically stays balanced at{' '}
            <strong className="tabular-nums">{target.recalculatedPagesPerDay} pages/day</strong>.
          </div>

          <button
            type="button"
            onClick={() => {
              void triggerLightHaptic();
              resetPlan(state.targetDays);
              onToast?.('Started a fresh 604-page Khatam from Page 1.');
              setSheetOpen(false);
            }}
            className="w-full min-h-[44px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)] inline-flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Fresh Khatam from Page 1</span>
          </button>
        </div>
      </BottomSheet>
    </>
  );
};
