import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Heart,
  Pause,
  Play,
  Sparkles,
  Star,
} from 'lucide-react';
import { DailyTarbiyahPlan, DailyTarbiyahStep } from '../../services/dailyTarbiyahPlanEngine';
import {
  loadLocalOnboardingProfile,
  saveLocalOnboardingProfile,
} from '../../services/onboardingPlanEngine';
import { triggerLightHaptic } from '../../services/hapticsService';

interface DailyTarbiyahPlanCardProps {
  plan: DailyTarbiyahPlan;
  onLaunchStep: (step: DailyTarbiyahStep) => void;
}

export const DailyTarbiyahPlanCard: React.FC<DailyTarbiyahPlanCardProps> = ({
  plan,
  onLaunchStep,
}) => {
  const [paused, setPaused] = useState<boolean>(plan.isPaused);
  const nextStep = plan.steps.find((s) => !s.completed) || plan.steps[0];

  const handleTogglePause = () => {
    const nextPaused = !paused;
    setPaused(nextPaused);
    const current = loadLocalOnboardingProfile();
    saveLocalOnboardingProfile({
      ...current,
      planPaused: nextPaused,
      lastActiveDateKey: plan.dateKey,
    });
    void triggerLightHaptic();
  };

  return (
    <section
      aria-label="Adaptive Daily Guided Tarbiyah Plan"
      className="rounded-3xl bg-[var(--bg-surface)] p-4 shadow-sm border border-[var(--border-subtle)] space-y-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300 tabular-nums">
            {paused
              ? 'Routine Paused · Progress Safe'
              : `Ages ${plan.ageBand} · ${plan.totalMinutes}-Min Adaptive Plan · ${plan.completedCount}/3 Done`}
            {!paused && plan.remainingMinutes > 0 ? ` · ${plan.remainingMinutes} min left` : ''}
          </p>
          <h2 className="text-base font-extrabold text-[#14532D] dark:text-emerald-300 mt-0.5 leading-snug">
            {paused
              ? `${plan.childName}’s Plan Is Resting`
              : plan.isComplete
              ? `MashaAllah, ${plan.childName}! Today’s Tarbiyah Complete`
              : `${plan.childName}’s Calm Daily Routine`}
          </h2>
        </div>

        <button
          type="button"
          onClick={handleTogglePause}
          aria-label={paused ? 'Resume daily routine' : 'Pause daily routine'}
          title={paused ? 'Resume Routine' : 'Pause Routine'}
          className="min-h-[40px] px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[#14532D] dark:hover:border-emerald-400 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold inline-flex items-center gap-1 shrink-0 transition"
        >
          {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          <span>{paused ? 'Resume' : 'Pause'}</span>
        </button>
      </div>

      {/* Gentle Missed-Day / Pause Kindness Banner (Zero Streak Shaming) */}
      {(paused || plan.kindnessState.showWelcomeBack) && (
        <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200/80 dark:border-amber-500/30 p-3 flex items-start gap-2.5">
          <Heart className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-xs font-extrabold text-amber-950 dark:text-amber-200">
              {paused ? 'Routine Paused — Take Your Time' : plan.kindnessState.toneTitle}
            </p>
            <p className="text-[11px] text-amber-900/90 dark:text-amber-200/80 leading-snug mt-0.5">
              {paused
                ? 'Your child’s stars, stories, and Qaida mastery stay saved locally. Tap Resume anytime.'
                : plan.kindnessState.toneMessage}
            </p>
          </div>
        </div>
      )}

      {!paused && (
        <>
          <div className="space-y-2">
            {plan.steps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  void triggerLightHaptic();
                  onLaunchStep(step);
                }}
                className={`w-full text-left rounded-2xl p-3 border transition flex items-center justify-between gap-3 min-h-[56px] ${
                  step.completed
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/45 border-emerald-200 dark:border-emerald-500/35'
                    : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-extrabold tabular-nums ${
                      step.completed
                        ? 'bg-[#22C55E] text-white'
                        : 'bg-[#14532D] text-amber-300'
                    }`}
                  >
                    {step.completed ? <Check className="w-4 h-4 stroke-[3]" /> : step.stepNumber}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-[var(--text-primary)] truncate">
                      {step.title}
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)] truncate">{step.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 text-[11px] font-bold text-[var(--text-secondary)] tabular-nums">
                  <Clock className="w-3 h-3 text-[var(--text-muted)]" />
                  <span>{step.minutes}m</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#14532D] dark:text-emerald-400" />
                </div>
              </button>
            ))}
          </div>

          {!plan.isComplete && nextStep && (
            <button
              type="button"
              onClick={() => {
                void triggerLightHaptic();
                onLaunchStep(nextStep);
              }}
              className="w-full min-h-[48px] py-3 px-4 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition"
            >
              {nextStep.id === 'qaida' ? (
                <BookOpen className="w-4 h-4 text-amber-300" />
              ) : (
                <Sparkles className="w-4 h-4 text-amber-300" />
              )}
              <span>
                Start Step {nextStep.stepNumber}: {nextStep.title}
              </span>
            </button>
          )}

          {plan.isComplete && (
            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/45 border border-emerald-200 dark:border-emerald-500/35 px-3.5 py-2.5 flex items-center justify-between text-xs font-extrabold text-[#14532D] dark:text-emerald-200">
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                Alhamdulillah! Today’s {plan.totalMinutes}-minute routine is complete.
              </span>
            </div>
          )}
        </>
      )}
    </section>
  );
};
