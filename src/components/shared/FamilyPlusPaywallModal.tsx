import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Check,
  Crown,
  Lock,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { EntitlementTier } from '../../types/ilmizo';
import { useIlmizo, useTranslation } from '../../context/IlmizoContext';
import {
  attemptPlayStorePurchase,
  attemptPlayStoreRestore,
  BillingEnvironmentStatus,
  createParentGateChallenge,
  detectBillingEnvironment,
  getEffectiveEntitlement,
  getTrialStatus,
  ILMIZO_PLAN_CATALOG,
  resolvePlanText,
  startLocalSevenDayTrialPatch,
  verifyParentGateAnswer,
} from '../../services/subscriptionEngine';
import { playGentleCelebrationChime } from '../../services/celebrationEffects';

interface FamilyPlusPaywallModalProps {
  open: boolean;
  onClose: () => void;
  /** Context headline explaining why the modal opened (e.g. locked Qaida lesson or Story #12) */
  triggerReason?: string;
  /** Set true when opened from inside already-unlocked Parent Hub */
  skipParentGate?: boolean;
  onUnlocked?: (msg: string) => void;
}

export const FamilyPlusPaywallModal: React.FC<FamilyPlusPaywallModalProps> = ({
  open,
  onClose,
  triggerReason,
  skipParentGate = false,
  onUnlocked,
}) => {
  const { user, activeChild, updateUser, isParentPinConfigured, verifyEnteredParentPin } = useIlmizo();
  const { language } = useTranslation();
  const prefersReduced = useReducedMotion();

  const [gatePassed, setGatePassed] = useState<boolean>(skipParentGate);
  const [challengeSeed, setChallengeSeed] = useState<number>(() => Date.now());
  const [mathAnswer, setMathAnswer] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [gateError, setGateError] = useState<string | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<EntitlementTier>('family_199');
  const [billingStatus, setBillingStatus] = useState<{
    status: BillingEnvironmentStatus;
    canLaunchRealCheckout: boolean;
    message: string;
  } | null>(null);
  const [actionStatus, setActionStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const challenge = useMemo(() => createParentGateChallenge(challengeSeed), [challengeSeed]);
  const trialStatus = useMemo(() => getTrialStatus(user), [user]);
  const effectiveTier = useMemo(() => getEffectiveEntitlement(user), [user]);

  useEffect(() => {
    if (!open) return;
    setGatePassed(skipParentGate);
    setChallengeSeed(Date.now());
    setMathAnswer('');
    setPinInput('');
    setGateError(null);
    setActionStatus(null);
    void detectBillingEnvironment().then(setBillingStatus);
  }, [open, skipParentGate]);

  const handleParentGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateError(null);

    if (isParentPinConfigured && pinInput.trim().length > 0) {
      const ok = await verifyEnteredParentPin(pinInput.trim());
      if (ok) {
        setGatePassed(true);
        return;
      }
      setGateError('Incorrect Parent PIN. Or solve the multiplication problem below.');
      return;
    }

    if (verifyParentGateAnswer(challenge, mathAnswer)) {
      setGatePassed(true);
      return;
    }
    setGateError('Please enter the correct answer so only a parent continues.');
  };

  const handleStartSevenDayTrial = () => {
    const patch = startLocalSevenDayTrialPatch();
    updateUser(patch);
    playGentleCelebrationChime('lesson_complete');
    const msg =
      language === 'hinglish' || language === 'hi'
        ? 'MashaAllah! 7-Day Free Family Plus Trial shuru ho gaya!'
        : 'MashaAllah! Your 7-Day Free Family Plus Trial is now active!';
    setActionStatus({ ok: true, text: msg });
    onUnlocked?.(msg);
    window.setTimeout(() => {
      onClose();
    }, 900);
  };

  const handlePurchasePlan = async () => {
    setBusy(true);
    setActionStatus(null);
    const res = await attemptPlayStorePurchase(selectedPlan);
    setBusy(false);

    if (res.ok && res.patch) {
      updateUser(res.patch);
      playGentleCelebrationChime('lesson_complete');
      setActionStatus({ ok: true, text: res.message });
      onUnlocked?.(res.message);
      window.setTimeout(() => onClose(), 900);
      return;
    }

    // Honest fallback when running on Web Preview or unlinked Android dev shell
    setActionStatus({ ok: false, text: res.message });
  };

  const handleRestore = async () => {
    setBusy(true);
    const res = await attemptPlayStoreRestore(user);
    setBusy(false);
    if (res.patch) {
      updateUser(res.patch);
      if (res.ok) {
        playGentleCelebrationChime('star');
      }
    }
    setActionStatus({ ok: res.ok, text: res.message });
  };

  const localizedPitch = useMemo(() => {
    if (language === 'hi') {
      return {
        eyebrow: 'अभिभावकों के लिए सुरक्षित अनलॉक',
        title: 'इल्मीज़ो फ़ैमिली प्लस — ₹16 / महीना',
        sub: 'बिना किसी विज्ञापन के 5 बच्चों के लिए 17-सबक़ इंटरैक्टिव नूरानी क़ायदा, लेटर ट्रेसिंग और 49 मल्टी-सीन कहानियाँ।',
        trialBtn: '7 दिन मुफ़्त ट्रायल शुरू करें (₹0 अभी)',
      };
    }
    if (language === 'ur') {
      return {
        eyebrow: 'والدین کے لیے محفوظ ان لاک',
        title: 'علمیزو فیملی پلس — صرف ₹16 / ماہ',
        sub: 'بغیر اشتہارات کے 5 بچوں کے لیے 17 اسباق کا انٹرایکٹو نورانی قاعدہ، لیٹر ٹریسنگ اور 49 ملٹی سین کہانیاں۔',
        trialBtn: '7 دن کا مفت ٹرائل شروع کریں (₹0 ابھی)',
      };
    }
    if (language === 'hinglish') {
      return {
        eyebrow: 'Parent-Gated Family Unlock',
        title: 'Ilmizo Family Plus — Sirf ₹16 / mahina',
        sub: 'Zero Ads · 5 Kids Profiles · Interactive 17-Lesson Noorani Qaida + Tracing + 49 Multi-Scene Storybooks.',
        trialBtn: 'Start 7-Day Free Family Trial (₹0 Now)',
      };
    }
    if (language === 'ar') {
      return {
        eyebrow: 'بوابة الوالدين الآمنة',
        title: 'علميزو للعائلة بلس',
        sub: 'دون إعلانات · حتى ٥ أطفال · القاعدة النورانية ١٧ درساً وتتبع الحروف و٤٩ قصة تفاعلية.',
        trialBtn: 'ابدأ تجربة مجانية لمدة ٧ أيام',
      };
    }
    return {
      eyebrow: 'Parent-Verified Family Plan',
      title: 'Ilmizo Family Plus — ~₹16 / month',
      sub: 'Zero Ads · Up to 5 Kids Profiles · Interactive 17-Lesson Noorani Qaida + Letter Tracing + 49 Multi-Scene Storybooks.',
      trialBtn: 'Start 7-Day Free Family Trial (₹0 Now)',
    };
  }, [language]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Ilmizo Family Plus"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0.05 : 0.2 }}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
        >
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: prefersReduced ? 0.05 : 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg rounded-t-[28px] sm:rounded-[28px] bg-[var(--bg-sheet)] text-[var(--text-primary)] shadow-2xl border border-amber-400/35 overflow-hidden max-h-[92vh] flex flex-col"
          >
            {/* Deep Emerald & Gold Flagship Showcase Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0A291B] via-[#14532D] to-[#082216] text-white p-5">
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-amber-400/15 blur-2xl pointer-events-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Family Plus dialog"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FDE68A] to-[#D97706] text-emerald-950 flex items-center justify-center shadow-sm">
                    <Crown className="w-4 h-4" />
                  </span>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                    {localizedPitch.eyebrow}
                  </p>
                </div>
                <h2 className="text-xl font-extrabold pr-10 leading-snug">
                  {localizedPitch.title}
                </h2>
                <p className="text-xs text-emerald-100/90 mt-1.5 leading-relaxed">
                  {triggerReason || localizedPitch.sub}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {['114 Surahs Free', '100% Offline', 'Zero Ads'].map((badge) => (
                    <span
                      key={badge}
                      className="px-2.5 py-1 rounded-full bg-white/10 border border-amber-300/25 text-[11px] font-bold text-amber-200"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {!gatePassed ? (
                /* Play Families Policy Parent Gate */
                <form onSubmit={handleParentGateSubmit} className="space-y-4">
                  <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-500/30 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-amber-950 dark:text-amber-200">
                      <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
                      <h3 className="text-sm font-extrabold">Ask a Parent to Continue</h3>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      To protect children from accidental purchases (Google Play Families Policy), please verify you are a parent before viewing plans or activating the free trial.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[var(--text-secondary)]">
                        Quick Parent Check: What is
                      </span>
                      <span className="text-lg font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
                        {challenge.question} = ?
                      </span>
                    </div>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={mathAnswer}
                      onChange={(e) => setMathAnswer(e.target.value)}
                      placeholder="Enter answer..."
                      aria-label="Parent math verification answer"
                      className="ilmizo-input w-full rounded-xl px-3.5 py-2.5 text-sm font-bold"
                    />

                    {isParentPinConfigured && (
                      <div className="pt-2 border-t border-[var(--divider)] space-y-1.5">
                        <label className="block text-[11px] font-bold text-[var(--text-secondary)]">
                          Or enter your 4-digit Parent PIN
                        </label>
                        <input
                          type="password"
                          inputMode="numeric"
                          maxLength={4}
                          value={pinInput}
                          onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="••••"
                          aria-label="4-digit Parent PIN"
                          className="ilmizo-input w-full rounded-xl px-3.5 py-2.5 text-sm font-bold tracking-widest"
                        />
                      </div>
                    )}
                  </div>

                  {gateError && (
                    <p className="text-xs font-bold text-rose-700 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 rounded-xl px-3 py-2">
                      {gateError}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-3 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-xs font-bold text-[var(--text-primary)] min-h-[44px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold min-h-[44px] transition"
                    >
                      Verify Parent & Continue →
                    </button>
                  </div>
                </form>
              ) : (
                /* Conversion Plan Selection + Instant 7-Day Trial */
                <div className="space-y-4">
                  {/* Concrete Child Progress Value Proof Banner */}
                  {activeChild && (
                    <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 space-y-1">
                      <p className="text-[11px] font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
                        {activeChild.name}’s Verified Local Progress · {(activeChild.completedQaidaLessonIds || []).length}/17 Qaida · {(activeChild.completedStoryIds || []).length}/49 Stories · {activeChild.stars || 0} ★
                      </p>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                        {trialStatus.isTrialActive
                          ? `Keep ${activeChild.name}’s ${activeChild.streakDays || 1}-day learning habit going after your trial ends — zero ads, 100% offline.`
                          : `Unlock Lessons 4–17 of Noorani Qaida, all 49 multi-scene storybooks, and up to 5 child profiles with zero ads.`}
                      </p>
                    </div>
                  )}

                  {/* Immediate 7-Day Free Trial Card */}
                  {!trialStatus.isTrialActive && effectiveTier === 'free' && (
                    <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/40 dark:to-emerald-950/40 border border-[#D4AF37]/70 p-4 space-y-2.5 shadow-xs">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-extrabold text-[#14532D] dark:text-amber-300 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>Try Everything Free for 7 Days — No Card Required</span>
                          </p>
                          <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                            Unlock all 17 Noorani Qaida lessons with Letter Tracing & 5Q Audio Quizzes, all 49 multi-scene stories, and 5 child slots immediately.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleStartSevenDayTrial}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] hover:brightness-105 text-emerald-950 font-extrabold text-xs shadow-sm min-h-[44px] transition"
                      >
                        {localizedPitch.trialBtn}
                      </button>
                    </div>
                  )}

                  {trialStatus.isTrialActive && (
                    <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/35 p-3 flex items-center justify-between text-xs">
                      <span className="font-extrabold text-emerald-950 dark:text-emerald-200">
                        7-Day Free Family Trial Active
                      </span>
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 tabular-nums">
                        {trialStatus.daysRemaining} day(s) left
                      </span>
                    </div>
                  )}

                  {/* Selectable Plan Options */}
                  <div className="space-y-2.5">
                    {ILMIZO_PLAN_CATALOG.filter((p) => p.id !== 'free').map((plan) => {
                      const isSelected = selectedPlan === plan.id;
                      const isPopular = plan.id === 'family_199';
                      const planTitle = resolvePlanText(plan.title, language);
                      const planTagline = resolvePlanText(plan.tagline, language);
                      const features = resolvePlanText(plan.features, language);

                      return (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`w-full text-left rounded-2xl p-4 border transition space-y-2 ${
                            isSelected
                              ? 'border-[#14532D] dark:border-emerald-400 ring-2 ring-[#14532D]/20 dark:ring-emerald-400/25 bg-[var(--bg-surface)] shadow-sm'
                              : isPopular
                              ? 'border-amber-400/70 dark:border-amber-500/45 bg-[var(--bg-surface)] hover:border-amber-400'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[11px] font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wide">
                                {plan.id === 'family_199'
                                  ? 'Most Popular · Best Value'
                                  : plan.id === 'lifetime_499'
                                  ? 'One-Time Forever'
                                  : 'Adult Focus'}
                              </p>
                              <h3 className="text-sm font-extrabold text-[var(--text-primary)] mt-0.5 flex items-center gap-1.5">
                                {isPopular && <Crown className="w-4 h-4 text-amber-500 shrink-0" />}
                                <span>{planTitle}</span>
                              </h3>
                              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{planTagline}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-base font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
                                {plan.priceInrLabel}
                              </p>
                              <p className="text-[11px] font-semibold text-[var(--text-muted)] tabular-nums">
                                {plan.monthlyEquivalentLabel}
                              </p>
                            </div>
                          </div>

                          <ul className="space-y-1 pt-1 border-t border-[var(--divider)] text-[11px] text-[var(--text-secondary)]">
                            {features.map((feat) => (
                              <li key={feat} className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </button>
                      );
                    })}
                  </div>

                  {actionStatus && (
                    <div
                      className={`rounded-xl p-3 text-xs font-bold border ${
                        actionStatus.ok
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/35 text-emerald-950 dark:text-emerald-200'
                          : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-500/35 text-amber-950 dark:text-amber-200'
                      }`}
                    >
                      {actionStatus.text}
                    </div>
                  )}

                  {/* Billing CTA & Restore */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void handlePurchasePlan()}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#14532D] to-[#16A34A] hover:brightness-105 disabled:opacity-60 text-white font-extrabold text-xs shadow-md min-h-[48px] flex items-center justify-center gap-2 transition"
                    >
                      <Lock className="w-4 h-4" />
                      <span>
                        {busy
                          ? 'Connecting to Google Play...'
                          : billingStatus?.canLaunchRealCheckout
                          ? `Subscribe via Google Play (${
                              ILMIZO_PLAN_CATALOG.find((p) => p.id === selectedPlan)?.priceInrLabel
                            })`
                          : `Continue with ${
                              ILMIZO_PLAN_CATALOG.find((p) => p.id === selectedPlan)?.title.en
                            } (Play Store / Preview)`}
                      </span>
                    </button>

                    <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--text-secondary)] pt-1">
                      <button
                        type="button"
                        onClick={() => void handleRestore()}
                        className="font-bold text-emerald-800 dark:text-emerald-300 hover:underline py-1.5"
                      >
                        Restore Purchases
                      </button>
                      <span className="truncate max-w-[260px]">
                        {billingStatus?.status === 'android_play_billing_ready'
                          ? 'Google Play Billing Verified'
                          : 'Web/Offline Preview · No Card Charged'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
