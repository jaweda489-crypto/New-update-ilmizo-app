import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Check, Clock, ShieldCheck, Sparkles, User, X } from 'lucide-react';
import {
  AdultPrimaryGoal,
  buildSevenDayLocalPlan,
  ChildAgeBand,
  ChildLearningFocus,
  DEFAULT_LOCAL_ONBOARDING_PROFILE,
  LocalOnboardingProfile,
  saveLocalOnboardingProfile,
} from '../../services/onboardingPlanEngine';
import { LivingMascot } from './LivingMascot';
import { triggerLightHaptic, triggerSuccessHaptic } from '../../services/hapticsService';
import { LanguageCode } from '../../types/ilmizo';

interface FirstRunOnboardingModalProps {
  open: boolean;
  initialProfile?: LocalOnboardingProfile;
  defaultChildName?: string;
  language: LanguageCode;
  onComplete: (result: {
    profile: LocalOnboardingProfile;
    childSetup?: { name: string; age: number; avatar: 'Ayaan' | 'Ayla' | 'Mizo'; dailyMinutes: number };
  }) => void;
  onSkip: () => void;
}

const ADULT_GOALS: Array<{ id: AdultPrimaryGoal; title: string; subtitle: string }> = [
  { id: 'daily_quran', title: 'Daily Quran Reading', subtitle: 'Calm daily ayahs in Uthmani Mushaf view' },
  { id: 'salah_consistency', title: 'Salah Consistency', subtitle: 'Prayer times, Wudu guide & gentle tracking' },
  { id: 'hifz_revision', title: 'Hifz & Revision', subtitle: 'Spaced-repetition Juz Amma & Surah recall' },
  { id: 'family_tarbiyah', title: 'Family Tarbiyah', subtitle: 'Learn together with kids in 10 min/day' },
];

const CHILD_AGE_BANDS: Array<{ id: ChildAgeBand; label: string; sampleAge: number; desc: string }> = [
  { id: '4-6', label: 'Ages 4–6', sampleAge: 5, desc: 'Short letters, audio & picture stories' },
  { id: '7-9', label: 'Ages 7–9', sampleAge: 8, desc: 'Qaida tracing, Duas & 6-scene stories' },
  { id: '10-12', label: 'Ages 10–12', sampleAge: 11, desc: 'Tajweed drills, Salah & Seerah quizzes' },
];

const CHILD_FOCUSES: Array<{ id: ChildLearningFocus; label: string }> = [
  { id: 'balanced', label: 'Balanced 10-Min Mix' },
  { id: 'qaida_basics', label: 'Noorani Qaida & Tracing' },
  { id: 'stories_manners', label: 'Prophet Stories & Manners' },
  { id: 'daily_duas', label: 'Daily Sunnah Duas' },
];

export const FirstRunOnboardingModal: React.FC<FirstRunOnboardingModalProps> = ({
  open,
  initialProfile,
  defaultChildName = '',
  language,
  onComplete,
  onSkip,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [primaryMode, setPrimaryMode] = useState<'adult' | 'kids' | 'family'>(
    initialProfile?.primaryMode || DEFAULT_LOCAL_ONBOARDING_PROFILE.primaryMode
  );
  const [adultGoal, setAdultGoal] = useState<AdultPrimaryGoal>(
    initialProfile?.adultGoal || DEFAULT_LOCAL_ONBOARDING_PROFILE.adultGoal
  );
  const [adultDailyMinutes, setAdultDailyMinutes] = useState<5 | 10 | 15>(
    initialProfile?.adultDailyMinutes || 10
  );
  const [includeChild, setIncludeChild] = useState<boolean>(primaryMode !== 'adult');
  const [childName, setChildName] = useState<string>(defaultChildName);
  const [childAgeBand, setChildAgeBand] = useState<ChildAgeBand>(
    initialProfile?.childAgeBand || '7-9'
  );
  const [childFocus, setChildFocus] = useState<ChildLearningFocus>(
    initialProfile?.childFocus || 'balanced'
  );
  const [childAvatar, setChildAvatar] = useState<'Ayaan' | 'Ayla' | 'Mizo'>('Ayaan');

  const sevenDayPreview = useMemo(
    () =>
      buildSevenDayLocalPlan(
        {
          adultGoal,
          adultDailyMinutes,
          childAgeBand,
          childFocus,
        },
        language
      ),
    [adultGoal, adultDailyMinutes, childAgeBand, childFocus, language]
  );

  if (!open) return null;

  const handleFinish = () => {
    const completedProfile: LocalOnboardingProfile = {
      schemaVersion: 1,
      status: 'completed',
      primaryMode,
      adultGoal,
      adultDailyMinutes,
      childAgeBand,
      childFocus,
      planPaused: false,
      completedAtIso: new Date().toISOString(),
      lastActiveDateKey: new Date().toISOString().slice(0, 10),
    };
    saveLocalOnboardingProfile(completedProfile);
    void triggerSuccessHaptic();

    const ageBandMeta = CHILD_AGE_BANDS.find((b) => b.id === childAgeBand) || CHILD_AGE_BANDS[1];
    onComplete({
      profile: completedProfile,
      childSetup:
        includeChild && childName.trim().length > 0
          ? {
              name: childName.trim(),
              age: ageBandMeta.sampleAge,
              avatar: childAvatar,
              dailyMinutes: childAgeBand === '4-6' ? 8 : childAgeBand === '7-9' ? 10 : 12,
            }
          : undefined,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ilmizo 60-Second Calm Setup"
      className="fixed inset-0 z-50 bg-[#061810]/90 backdrop-blur-md flex items-stretch sm:items-center justify-center sm:p-5 overflow-y-auto"
    >
      <div className="w-full min-h-dvh sm:min-h-0 sm:max-w-lg sm:rounded-[30px] bg-[var(--bg-sheet)] text-[var(--text-primary)] sm:border sm:border-amber-400/25 shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Scenic Deep Emerald & Warm Gold Welcome Hero */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#0A291B] via-[#0F3826] to-[#14532D] text-white px-5 pt-safe pb-5 shrink-0">
          <img
            src="/assets/illustrations/adult_home_hero.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A291B]/75 via-[#0F3826]/85 to-[#0F3826]" />

          <div className="relative z-10 pt-3 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#FDE68A] to-[#D97706] text-emerald-950 font-extrabold text-sm flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-extrabold tracking-tight text-amber-300 leading-none">
                    Ilmizo
                  </p>
                  <p className="text-[11px] text-emerald-100/80 font-semibold mt-0.5 tabular-nums">
                    Step {step} of 3 · Learn · Pray · Grow
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onSkip}
                className="min-h-[40px] px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-emerald-100 text-xs font-bold inline-flex items-center gap-1 shrink-0 transition"
              >
                <span>Skip</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-extrabold tracking-tight leading-snug text-white">
                {step === 1
                  ? 'Assalamu Alaikum — Welcome to Ilmizo'
                  : step === 2
                  ? 'Parent Setup for Kids World'
                  : 'Your 7-Day Calm Family Routine'}
              </h2>
              <p className="text-xs text-emerald-100/85 mt-1 leading-relaxed">
                {step === 1
                  ? 'A calm, ad-free Islamic companion for Quran, Salah, Duas, and Kids Tarbiyah — 100% offline.'
                  : step === 2
                  ? 'Optional child profile stored privately on this device.'
                  : 'Gentle daily guidance ready to begin right away.'}
              </p>
            </div>

            {/* 3-Step Visual Progress Bar */}
            <div className="grid grid-cols-3 gap-1.5 pt-0.5">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx <= step ? 'bg-gradient-to-r from-[#FDE68A] to-[#F59E0B]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 flex-1 sm:max-h-[62vh] overflow-y-auto">
          {step === 1 && (
            <>
              <LivingMascot
                character="Mizo"
                state="happy"
                size="md"
                showSpeechBubble
                speechText="No account or login needed. Everything stays safely on your device!"
              />

              <div className="space-y-2">
                <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">Who is learning today?</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'family' as const, label: 'Whole Family', icon: Sparkles },
                    { id: 'adult' as const, label: 'Just Me (Adult)', icon: User },
                    { id: 'kids' as const, label: 'My Child', icon: BookOpen },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const active = primaryMode === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          void triggerLightHaptic();
                          setPrimaryMode(opt.id);
                          setIncludeChild(opt.id !== 'adult');
                        }}
                        className={`min-h-[56px] p-2.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                          active
                            ? 'bg-[#14532D] text-white border-[#14532D] dark:border-emerald-400 ring-2 ring-emerald-600/20 shadow-xs'
                            : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-emerald-400'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${active ? 'text-amber-300' : 'text-[#14532D] dark:text-emerald-300'}`} />
                        <span className="text-xs font-extrabold leading-tight">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">Choose your primary focus</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ADULT_GOALS.map((g) => {
                    const active = adultGoal === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          void triggerLightHaptic();
                          setAdultGoal(g.id);
                        }}
                        className={`min-h-[56px] p-3 rounded-2xl border text-left transition ${
                          active
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 border-[#14532D] dark:border-emerald-400 ring-1 ring-emerald-600/25 shadow-2xs'
                            : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-amber-400'
                        }`}
                      >
                        <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">{g.title}</p>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{g.subtitle}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">Daily peaceful pace</p>
                <div className="grid grid-cols-3 gap-2">
                  {([5, 10, 15] as const).map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => {
                        void triggerLightHaptic();
                        setAdultDailyMinutes(mins);
                      }}
                      className={`min-h-[48px] rounded-xl border text-xs font-extrabold tabular-nums transition flex items-center justify-center gap-1.5 ${
                        adultDailyMinutes === mins
                          ? 'bg-amber-400 text-emerald-950 border-amber-500 shadow-2xs'
                          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{mins} min/day</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">
                    Set up a Child Profile? (Parent Controlled)
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                    Stored 100% locally. Never uploaded or shared.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={includeChild}
                  onClick={() => setIncludeChild((v) => !v)}
                  className={`min-w-[54px] min-h-[32px] rounded-full p-1 transition ${
                    includeChild ? 'bg-[#22C55E]' : 'bg-slate-300 dark:bg-emerald-950'
                  }`}
                >
                  <span
                    className={`block w-6 h-6 rounded-full bg-white shadow-xs transition-transform ${
                      includeChild ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {includeChild ? (
                <div className="space-y-3.5">
                  <div>
                    <label
                      htmlFor="ilmizo-onboard-child-name"
                      className="block text-xs font-extrabold text-[#14532D] dark:text-emerald-300 mb-1"
                    >
                      Child’s First Name or Nickname (optional)
                    </label>
                    <input
                      id="ilmizo-onboard-child-name"
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="e.g. Ayaan, Ayla, Zayd"
                      maxLength={24}
                      className="ilmizo-input w-full min-h-[48px] px-3.5 rounded-2xl text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">Age Range</p>
                    <div className="grid grid-cols-3 gap-2">
                      {CHILD_AGE_BANDS.map((band) => (
                        <button
                          key={band.id}
                          type="button"
                          onClick={() => setChildAgeBand(band.id)}
                          className={`min-h-[56px] p-2.5 rounded-2xl border text-left transition ${
                            childAgeBand === band.id
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-[#14532D] dark:border-emerald-400 ring-1 ring-emerald-600/25'
                              : 'bg-[var(--bg-surface)] border-[var(--border-subtle)]'
                          }`}
                        >
                          <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">{band.label}</p>
                          <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-snug">
                            {band.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">Pick Companion & Focus</p>
                    <div className="flex items-center gap-2">
                      {(['Ayaan', 'Ayla', 'Mizo'] as const).map((av) => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => setChildAvatar(av)}
                          className={`flex-1 min-h-[48px] px-2 py-2 rounded-2xl border text-xs font-extrabold transition ${
                            childAvatar === av
                              ? 'bg-[#14532D] text-amber-300 border-[#14532D] dark:border-emerald-400 shadow-2xs'
                              : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {CHILD_FOCUSES.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setChildFocus(f.id)}
                          className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs font-bold transition ${
                            childFocus === f.id
                              ? 'bg-amber-100 dark:bg-amber-400/20 border-amber-500 text-emerald-950 dark:text-amber-200'
                              : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 p-4 text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
                  You can add or manage up to 5 child profiles anytime later inside the PIN-protected{' '}
                  <strong>Parent Hub</strong>.
                </div>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <LivingMascot
                character="Mizo"
                state="celebrating"
                size="md"
                showSpeechBubble
                speechText="Your 7-day calm offline routine is ready. Pause or edit anytime in Profile!"
              />
              <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] divide-y divide-[var(--divider)]">
                {sevenDayPreview.slice(0, 5).map((day) => (
                  <div key={day.dayNumber} className="p-3 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[11px] font-extrabold text-amber-800 dark:text-amber-300">{day.label}</p>
                      <p className="text-xs font-bold text-[var(--text-primary)] mt-0.5">{day.adultTask}</p>
                      {includeChild && (
                        <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5">
                          Kids ({childAgeBand}): {day.kidsTask}
                        </p>
                      )}
                    </div>
                    <span className="text-[11px] font-extrabold text-[var(--text-muted)] tabular-nums shrink-0">
                      {day.adultMinutes}m
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] px-1">
                <ShieldCheck className="w-4 h-4 text-[#14532D] dark:text-emerald-400 shrink-0" />
                <span>
                  100% offline-ready · Zero ads · Zero login required · Stored only on this device.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="px-5 py-4 bg-[var(--bg-surface)] border-t border-[var(--divider)] flex items-center justify-between gap-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s === 3 ? 2 : 1))}
              className="min-h-[48px] px-4 rounded-2xl bg-[var(--bg-elevated)] hover:opacity-90 border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-extrabold transition"
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onSkip}
              className="min-h-[48px] px-4 rounded-2xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-bold transition"
            >
              Skip for now
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => {
                void triggerLightHaptic();
                setStep((s) => (s === 1 ? 2 : 3));
              }}
              className="min-h-[48px] px-5 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center gap-1.5 shadow-sm transition"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="min-h-[48px] px-5 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center gap-1.5 shadow-sm transition"
            >
              <Check className="w-4 h-4 text-amber-300" />
              <span>Start My Calm Routine</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
