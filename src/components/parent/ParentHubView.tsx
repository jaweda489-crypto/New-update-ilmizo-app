import React, { Suspense, lazy, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Edit3,
  Heart,
  KeyRound,
  Lock,
  Play,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { useIlmizo } from '../../context/IlmizoContext';
import { CharacterAvatar, SyncStatusBadge } from '../pwa/PWAComponents';
import { ChildProfile, EntitlementTier } from '../../types/ilmizo';

const LocalDataManagerCard = lazy(() =>
  import('../pwa/LocalDataManagerCard').then((m) => ({ default: m.LocalDataManagerCard }))
);
import { KIDS_BADGES_CATALOG } from '../../data/islamicContent';
import { evaluateChildBadgesAndMilestones } from '../../engines/kidsLearningEngines';
import { issueParentTimeVoucher, ParentVoucherAction } from '../../services/familySyncEngine';
import {
  attemptPlayStoreRestore,
  canAccessChildSlot,
  detectBillingEnvironment,
  getEffectiveEntitlement,
  getTrialStatus,
  ILMIZO_PLAN_CATALOG,
  isFamilyPlusActive,
  resolvePlanText,
  startLocalSevenDayTrialPatch,
} from '../../services/subscriptionEngine';
import { FamilyPlusPaywallModal } from '../shared/FamilyPlusPaywallModal';
import { WeeklyProgressCard } from './WeeklyProgressCard';
import { playGentleCelebrationChime } from '../../services/celebrationEffects';
import { InfoDisclosure, SkeletonCard } from '../design-system/IlmizoPrimitives';
import { SelectSheetField } from '../sheets/SelectSheet';

export const ParentHubView: React.FC = () => {
  const {
    user,
    updateUser,
    setMode,
    setKidsRoute,
    goBack,
    parentHubUnlocked: unlocked,
    setParentHubUnlocked: setUnlocked,
    childrenProfiles,
    activeChildId,
    activeChild,
    setActiveChildId,
    addChildProfile,
    updateChildProfile,
    deleteChildProfile,
    confirmChildGoodDeed,
    resolveNeedsPracticeItem,
    quizAttempts,
    logLearningEvent,
    exportAllDataJson,
    isParentPinConfigured,
    verifyEnteredParentPin,
    pendingPinSetup,
    beginParentPinSetup,
    beginRecoveryCodeRegeneration,
    confirmPendingParentPinSetup,
    cancelPendingParentPinSetup,
    resetParentPinWithRecoveryCodeAsync,
    isKidsScreenTimeLocked,
  } = useIlmizo();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [firstTimePinInput, setFirstTimePinInput] = useState('');
  const [firstTimeRecoveryConfirmed, setFirstTimeRecoveryConfirmed] = useState(false);

  // PIN Gate Recovery Code Reset state
  const [showGateRecovery, setShowGateRecovery] = useState(false);
  const [gateRecoveryCode, setGateRecoveryCode] = useState('');
  const [gateRecoveryNewPin, setGateRecoveryNewPin] = useState('');
  const [gateRecoveryStatus, setGateRecoveryStatus] = useState<{ ok: boolean; text: string } | null>(
    null
  );

  // Add Child state
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState(7);
  const [newChildAvatar, setNewChildAvatar] = useState<'Ayaan' | 'Ayla' | 'Mizo'>('Ayaan');
  const [newChildGoal, setNewChildGoal] = useState(10);

  // Edit Child state
  const [editingChildId, setEditingChildId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState(7);
  const [editAvatar, setEditAvatar] = useState<'Ayaan' | 'Ayla' | 'Mizo'>('Ayaan');
  const [editDailyGoal, setEditDailyGoal] = useState(10);

  // Delete Child confirmation state (no window.confirm)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Parent PIN & Recovery Code update state (Never displays stored PIN in plain text)
  const [currentPinVerify, setCurrentPinVerify] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinUpdateFeedback, setPinUpdateFeedback] = useState<{ ok: boolean; text: string } | null>(
    null
  );
  const [recoverySavedConfirmed, setRecoverySavedConfirmed] = useState(false);

  // Discard any unconfirmed pending PIN/recovery setup if the parent leaves Parent Hub
  React.useEffect(() => {
    return () => {
      cancelPendingParentPinSetup();
    };
  }, [cancelPendingParentPinSetup]);

  // Parent-awarded Good Deed state
  const [parentDeedTitle, setParentDeedTitle] = useState('');
  const [deedAwardedToast, setDeedAwardedToast] = useState(false);

  // Entitlement restore & Family Plus Paywall modal state
  const [restoreToast, setRestoreToast] = useState(false);
  const [restoreStatusMsg, setRestoreStatusMsg] = useState<string | null>(null);
  const [billingEnvLabel, setBillingEnvLabel] = useState<string>('Checking Play Billing...');
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState<string | undefined>(undefined);
  const [activeParentTab, setActiveParentTab] = useState<'overview' | 'profiles' | 'safety'>(
    'overview'
  );

  React.useEffect(() => {
    void detectBillingEnvironment().then((env) => setBillingEnvLabel(env.message));
  }, []);

  const startEditingChild = (child: ChildProfile, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChildId(child.id);
    setEditName(child.name);
    setEditAge(child.age);
    setEditAvatar(child.avatar);
    setEditDailyGoal(child.dailyGoalMinutes || 10);
    setConfirmDeleteId(null);
  };

  const handleSaveChildEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChildId || !editName.trim()) return;
    updateChildProfile(editingChildId, {
      name: editName.trim(),
      age: editAge,
      avatar: editAvatar,
      dailyGoalMinutes: editDailyGoal,
    });
    setEditingChildId(null);
  };

  const handleAwardParentDeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentDeedTitle.trim() || !activeChild) return;
    const deedTitle = parentDeedTitle.trim();
    const newDeed = {
      id: `gd_parent_${Date.now()}`,
      title: deedTitle,
      description: 'Directly verified and awarded by Parent in Parent Hub.',
      childReportedAt: 'Verified Today by Parent',
      parentConfirmed: true,
    };
    const draftChild: ChildProfile = {
      ...activeChild,
      stars: activeChild.stars + 10,
      pillarProgress: {
        ...activeChild.pillarProgress,
        akhlaqDeeds: activeChild.pillarProgress.akhlaqDeeds + 1,
      },
      goodDeeds: [newDeed, ...activeChild.goodDeeds],
      recentActivities: [
        {
          id: `act_p_${Date.now()}`,
          title: `Parent Verified: ${deedTitle}`,
          pillar: 'family',
          timestamp: 'Just now',
        },
        ...activeChild.recentActivities.slice(0, 9),
      ],
    };
    const badgeEval = evaluateChildBadgesAndMilestones(draftChild);
    updateChildProfile(activeChild.id, {
      ...draftChild,
      earnedBadgeIds: badgeEval.earnedBadgeIds,
      unlockedAdventureNode: badgeEval.unlockedAdventureNode,
    });
    logLearningEvent(
      'lesson_completed',
      `kids_deed_parent_${newDeed.id}`,
      `Parent Awarded Good Deed: ${deedTitle}`,
      'kids',
      activeChild.id
    );
    setParentDeedTitle('');
    setDeedAwardedToast(true);
    setTimeout(() => setDeedAwardedToast(false), 3000);
  };

  const handleDownloadBackup = () => {
    const json = exportAllDataJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ilmizo-family-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto my-6 rounded-3xl bg-[var(--bg-surface)] text-[var(--text-primary)] p-6 sm:p-8 shadow-lg border border-[var(--border-subtle)] text-center space-y-5 relative transition-colors">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[var(--bg-elevated)] hover:opacity-90 text-[var(--text-primary)] border border-[var(--border-subtle)] flex items-center justify-center transition active:scale-95"
            aria-label="Go Back"
            title="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200/70 dark:border-emerald-700/40 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" />
            Child-Safe Parental Gate
          </span>
          <InfoDisclosure
            label="Security"
            sheetTitle="Local Family Guardrail"
            sheetSubtitle="Salted on-device PIN verification"
          >
            <p>
              Parent PIN verification is a local family guardrail to prevent accidental child edits on this device; it is stored as a salted on-device hash and never exported in plain text.
            </p>
            <p>
              Because Ilmizo is 100% local-first without cloud accounts, losing both your PIN and your single-use Recovery Code requires clearing local browser storage.
            </p>
          </InfoDisclosure>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F3826] to-[#14532D] text-amber-300 flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-8 h-8" />
        </div>

        {!isParentPinConfigured ? (
          <div className="space-y-4 text-left">
            <div className="text-center">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">
                First-Time Parent PIN Setup
              </h1>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                For your family’s security, Ilmizo does not use a default PIN. Choose a 4-digit Parent PIN and save your single-use Recovery Code to activate Parent Hub & Screen-Time controls.
              </p>
            </div>

            {!pendingPinSetup ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setPinUpdateFeedback(null);
                  const res = await beginParentPinSetup('', firstTimePinInput);
                  if (!res.ok) {
                    setPinUpdateFeedback({
                      ok: false,
                      text: res.error || 'Please enter a valid 4-digit PIN.',
                    });
                    return;
                  }
                  setFirstTimeRecoveryConfirmed(false);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1 text-center">
                    Choose Your 4-Digit Parent PIN
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    value={firstTimePinInput}
                    onChange={(e) =>
                      setFirstTimePinInput(e.target.value.replace(/\D/g, '').slice(0, 4))
                    }
                    placeholder="••••"
                    className="w-full text-center text-2xl tracking-[0.4em] font-bold rounded-2xl ilmizo-input py-3 tabular-nums"
                  />
                </div>
                {pinUpdateFeedback && (
                  <p className="text-xs font-bold text-rose-600 dark:text-rose-400 text-center">
                    {pinUpdateFeedback.text}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={firstTimePinInput.length !== 4}
                  className="w-full min-h-[48px] rounded-2xl bg-[#14532D] disabled:opacity-40 text-white font-bold text-xs hover:bg-emerald-800 transition shadow-sm"
                >
                  Generate Recovery Code & Continue
                </button>
              </form>
            ) : (
              <div className="rounded-2xl bg-amber-50 dark:bg-amber-500/15 border-2 border-amber-400 p-4 space-y-3">
                <p className="text-xs font-extrabold text-amber-950 dark:text-amber-200 uppercase tracking-wider">
                  Step 2: Save Your Single-Use Recovery Code
                </p>
                <div className="rounded-xl bg-[var(--bg-surface)] border border-amber-300 dark:border-amber-400/40 py-3 px-4 text-center font-mono text-lg font-extrabold tracking-wider text-[var(--text-primary)] select-all">
                  {pendingPinSetup.recoveryCode}
                </div>
                <p className="text-xs text-amber-950 dark:text-amber-100 leading-relaxed">
                  Your PIN is <strong>not saved yet</strong>. Write down this recovery code first. If you refresh or cancel before confirming, your PIN setup will be discarded.
                </p>
                <label className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={firstTimeRecoveryConfirmed}
                    onChange={(e) => setFirstTimeRecoveryConfirmed(e.target.checked)}
                    className="rounded border-amber-400 text-emerald-800"
                  />
                  <span>I have saved this recovery code in a safe place</span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      cancelPendingParentPinSetup();
                      setFirstTimePinInput('');
                      setFirstTimeRecoveryConfirmed(false);
                    }}
                    className="flex-1 min-h-[42px] py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!firstTimeRecoveryConfirmed}
                    onClick={() => {
                      const res = confirmPendingParentPinSetup();
                      if (res.ok) {
                        setFirstTimePinInput('');
                        setFirstTimeRecoveryConfirmed(false);
                        setUnlocked(true);
                      }
                    }}
                    className="flex-1 min-h-[42px] py-2.5 rounded-xl bg-[#14532D] disabled:opacity-40 text-white font-bold text-xs"
                  >
                    Confirm & Save PIN
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">Parent Hub Security Gate</h1>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                Enter your 4-digit Parent PIN to manage up to 5 child profiles, verify real-world Good Deeds, and inspect authentic learning evidence.
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const ok = await verifyEnteredParentPin(pinInput);
                if (ok) {
                  setUnlocked(true);
                  setPinError(false);
                  setPinInput('');
                } else {
                  setPinError(true);
                }
              }}
              className="space-y-4"
            >
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="••••"
                className="w-44 text-center text-2xl tracking-[0.4em] font-bold rounded-2xl ilmizo-input py-3.5 tabular-nums"
              />

              {/* Quick-tap PIN Keypad */}
              <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => {
                      setPinInput((prev) => (prev.length < 4 ? prev + digit : prev));
                      setPinError(false);
                    }}
                    className="h-12 rounded-xl bg-[var(--bg-elevated)] hover:border-emerald-600/40 border border-[var(--border-subtle)] font-bold text-sm text-[var(--text-primary)] active:scale-95 transition"
                  >
                    {digit}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setPinInput('');
                    setPinError(false);
                  }}
                  className="h-12 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-700/40 font-bold text-xs text-rose-700 dark:text-rose-300"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPinInput((prev) => (prev.length < 4 ? prev + '0' : prev));
                    setPinError(false);
                  }}
                  className="h-12 rounded-xl bg-[var(--bg-elevated)] hover:border-emerald-600/40 border border-[var(--border-subtle)] font-bold text-sm text-[var(--text-primary)] active:scale-95 transition"
                >
                  0
                </button>
                <button
                  type="button"
                  aria-label="Backspace"
                  onClick={() => {
                    setPinInput((prev) => prev.slice(0, -1));
                    setPinError(false);
                  }}
                  className="h-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-bold text-xs text-[var(--text-secondary)]"
                >
                  ⌫
                </button>
              </div>

              {pinError && (
                <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                  Incorrect PIN. Please try again or use your saved Recovery Code below.
                </p>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex-1 min-h-[48px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-semibold text-xs transition"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  className="flex-1 min-h-[48px] rounded-2xl bg-[#14532D] text-white font-bold text-xs hover:bg-emerald-800 transition shadow-sm"
                >
                  Unlock Parent Hub
                </button>
              </div>
            </form>

            {/* Parent PIN Recovery Code Reset Flow */}
            <div className="pt-2 border-t border-[var(--divider)] space-y-3">
              <button
                type="button"
                onClick={() => {
                  setShowGateRecovery((v) => !v);
                  setGateRecoveryStatus(null);
                }}
                className="text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline"
              >
                {showGateRecovery
                  ? 'Hide Recovery Code Reset'
                  : 'Forgot Parent PIN? Reset with Recovery Code'}
              </button>

              {gateRecoveryStatus && (
                <div
                  className={`rounded-2xl p-3 text-xs font-semibold ${
                    gateRecoveryStatus.ok
                      ? 'bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/40 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 text-rose-800 dark:text-rose-200'
                  }`}
                >
                  {gateRecoveryStatus.text}
                </div>
              )}

              {showGateRecovery && (
                <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 text-left space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" />
                      <span>Single-Use Verified Recovery Code Reset</span>
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Enter the recovery code (<span className="font-mono font-bold">ILMZ-XXXX-XXXX</span>) generated when you set up your Parent PIN. Each code is single-use.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={gateRecoveryCode}
                      onChange={(e) => setGateRecoveryCode(e.target.value.toUpperCase())}
                      placeholder="Recovery Code (ILMZ-XXXX-XXXX)"
                      className="w-full rounded-xl ilmizo-input px-3 py-2.5 text-xs font-mono font-bold"
                    />
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={gateRecoveryNewPin}
                      onChange={(e) =>
                        setGateRecoveryNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))
                      }
                      placeholder="New 4-Digit Parent PIN"
                      className="w-full rounded-xl ilmizo-input px-3 py-2.5 text-xs font-bold tracking-widest tabular-nums"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        const res = await resetParentPinWithRecoveryCodeAsync(
                          gateRecoveryCode,
                          gateRecoveryNewPin
                        );
                        if (!res.ok) {
                          setGateRecoveryStatus({
                            ok: false,
                            text: res.error || 'Recovery verification failed.',
                          });
                          return;
                        }
                        setGateRecoveryStatus({
                          ok: true,
                          text: 'Parent PIN reset! Your single-use recovery code has now been consumed. Enter your new 4-digit PIN above to unlock and generate a fresh recovery code.',
                        });
                        setGateRecoveryCode('');
                        setGateRecoveryNewPin('');
                        setShowGateRecovery(false);
                      }}
                      className="w-full min-h-[44px] py-2.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs transition"
                    >
                      Verify Recovery Code & Reset PIN
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  const unresolvedPractice = activeChild ? activeChild.needsPractice.filter((np) => !np.resolved) : [];
  const pendingDeeds = activeChild ? activeChild.goodDeeds.filter((d) => !d.parentConfirmed) : [];
  const confirmedDeeds = activeChild ? activeChild.goodDeeds.filter((d) => d.parentConfirmed) : [];
  const kidsQuizAttempts = quizAttempts.filter(
    (q) => q.mode === 'kids' && (!q.childId || q.childId === activeChild?.id)
  );
  const completedQuestCount = activeChild
    ? Object.values(activeChild.questStepsCompleted).filter(Boolean).length
    : 0;

  return (
    <div className="space-y-6 pb-24">
      {/* Top Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0F3826] via-[#14532D] to-emerald-900 p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4 border border-amber-400/20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition active:scale-95"
            aria-label="Go Back"
            title="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold">Parent Hub & Family Tarbiyah</h1>
              <SyncStatusBadge />
            </div>
            <p className="text-xs text-emerald-200 mt-0.5">
              {childrenProfiles.length} / 5 Child Profiles Active · Zero Child Ad-Tracking · Real Recorded Evidence Only
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setUnlocked(false)}
            className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs min-h-[44px] flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Gate</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('kids')}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs min-h-[44px] shadow-sm transition"
          >
            Launch Kids World ({activeChild?.name}) →
          </button>
        </div>
      </div>

      {/* 3-Tab Parent Hub Navigation: Overview | Profiles | Safety */}
      <div
        role="tablist"
        aria-label="Parent Hub Sections"
        className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xs"
      >
        {(
          [
            {
              id: 'overview',
              label: 'Overview',
              badge: pendingDeeds.length > 0 ? String(pendingDeeds.length) : undefined,
            },
            { id: 'profiles', label: 'Profiles', badge: `${childrenProfiles.length}/5` },
            { id: 'safety', label: 'Safety' },
          ] as const
        ).map((tab) => {
          const isActive = activeParentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveParentTab(tab.id)}
              className={`min-h-[44px] rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${
                isActive
                  ? 'bg-[#14532D] text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>{tab.label}</span>
              {'badge' in tab && tab.badge && (
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold tabular-nums ${
                    isActive
                      ? 'bg-amber-400 text-emerald-950'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Child Selector Strip (visible across Overview & Safety when >1 child) */}
      {activeParentTab !== 'profiles' && childrenProfiles.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
          {childrenProfiles.map((child) => {
            const isSelected = child.id === activeChildId;
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => setActiveChildId(child.id)}
                className={`min-h-[42px] px-3 py-1.5 rounded-2xl border text-xs font-bold flex items-center gap-2 shrink-0 transition ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-900/40 border-[#14532D] dark:border-amber-400 text-[#14532D] dark:text-amber-200'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                <CharacterAvatar character={child.avatar} size="sm" />
                <span>{child.name}</span>
                <span className="text-[11px] opacity-75 tabular-nums">{child.stars}★</span>
              </button>
            );
          })}
        </div>
      )}

      {/* TAB 1: OVERVIEW — Weekly Report + Smart Backup Reminder + Learning Evidence & Good Deeds */}
      {activeParentTab === 'overview' && (
        <>
      {/* Smart Local Backup Reminder Banner (only appears when never exported or >7 days old) */}
      {(!user.lastBackupExportedAtIso ||
        Date.now() - new Date(user.lastBackupExportedAtIso).getTime() > 7 * 24 * 60 * 60 * 1000) && (
      <div className="rounded-3xl bg-amber-50/90 dark:bg-amber-500/15 border border-amber-300/80 dark:border-amber-400/35 p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/25 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-950 dark:text-amber-300">
            <Download className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xs sm:text-sm font-extrabold text-amber-950 dark:text-amber-200">
                Weekly Backup Recommended
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[var(--bg-surface)] border border-amber-300/70 dark:border-amber-400/35 text-[11px] font-bold text-amber-900 dark:text-amber-200">
                {user.lastBackupExportedAtIso
                  ? `Last saved: ${new Date(user.lastBackupExportedAtIso).toLocaleDateString()}`
                  : 'Not backed up yet'}
              </span>
            </div>
            <p className="text-xs text-amber-900/90 dark:text-amber-100/85 leading-relaxed max-w-xl">
              Your family progress stays 100% private on this device. Save a quick backup copy anytime.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDownloadBackup}
          className="min-h-[42px] px-4 py-2 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span>Save Backup</span>
        </button>
      </div>
      )}

      {/* Weekly Family Tarbiyah Report Card */}
      {activeChild && (
        <WeeklyProgressCard
          child={activeChild}
          onStatusMessage={(msg) => {
            setRestoreStatusMsg(msg);
            setRestoreToast(true);
            window.setTimeout(() => setRestoreToast(false), 3200);
          }}
        />
      )}
        </>
      )}

      {/* TAB 2: PROFILES — Child Profiles Roster */}
      {activeParentTab === 'profiles' && (
      <div className="rounded-3xl bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xs border border-[var(--border-subtle)] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
              <span>Family Child Profiles ({childrenProfiles.length} / 5)</span>
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Select a child card to view their detailed learning evidence, or edit/manage profiles below.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/40 px-3 py-1 rounded-full">
            Active Child: {activeChild?.name}
          </span>
        </div>

        {/* Child Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {childrenProfiles.map((child) => {
            const isSelected = child.id === activeChildId;
            const childPendingDeeds = child.goodDeeds.filter((d) => !d.parentConfirmed);
            const childUnresolved = child.needsPractice.filter((np) => !np.resolved);

            return (
              <div
                key={child.id}
                onClick={() => setActiveChildId(child.id)}
                className={`cursor-pointer rounded-2xl p-4 border-2 transition space-y-3 ${
                  isSelected
                    ? 'border-emerald-700 dark:border-emerald-400 bg-emerald-50/40 dark:bg-emerald-900/25 shadow-sm'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-emerald-600/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <CharacterAvatar character={child.avatar} size="md" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-[var(--text-primary)]">{child.name}</h3>
                        <span className="text-xs font-medium text-[var(--text-secondary)]">Age {child.age}</span>
                        {isSelected && (
                          <span className="text-[11px] font-bold text-emerald-950 bg-amber-300 px-2 py-0.5 rounded-md">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold tabular-nums mt-0.5">
                        {child.stars} ★ · {child.streakDays}-Day Streak · {child.activeMinutesToday}/{child.dailyGoalMinutes}m goal
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Companion Mascot: <strong className="text-[var(--text-primary)]">{child.avatar}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Edit & Delete Controls */}
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={(e) => startEditingChild(child, e)}
                      className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
                      title={`Edit ${child.name}`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    {childrenProfiles.length > 1 && (
                      <>
                        {confirmDeleteId === child.id ? (
                          <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-700/40 rounded-xl px-2 py-1">
                            <button
                              type="button"
                              onClick={() => {
                                deleteChildProfile(child.id);
                                setConfirmDeleteId(null);
                              }}
                              className="text-xs font-bold text-rose-700 dark:text-rose-300 hover:underline px-1"
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="text-xs text-[var(--text-muted)] px-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(child.id)}
                            className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                            title={`Remove ${child.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* 4 Pillar Metrics */}
                <div className="grid grid-cols-4 gap-2 text-center pt-1">
                  <div className="rounded-xl bg-[var(--bg-surface)] p-2 border border-[var(--border-subtle)]">
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 tabular-nums">{child.pillarProgress.quranLessons}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">Quran</p>
                  </div>
                  <div className="rounded-xl bg-[var(--bg-surface)] p-2 border border-[var(--border-subtle)]">
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 tabular-nums">{child.pillarProgress.duasPracticed}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">Duas</p>
                  </div>
                  <div className="rounded-xl bg-[var(--bg-surface)] p-2 border border-[var(--border-subtle)]">
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 tabular-nums">{child.pillarProgress.salahLessons}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">Salah</p>
                  </div>
                  <div className="rounded-xl bg-[var(--bg-surface)] p-2 border border-[var(--border-subtle)]">
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 tabular-nums">{child.pillarProgress.akhlaqDeeds}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">Akhlaq</p>
                  </div>
                </div>

                {/* Quick Alerts */}
                {(childPendingDeeds.length > 0 || childUnresolved.length > 0) && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {childPendingDeeds.length > 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-950 dark:text-amber-200 text-xs font-bold">
                        <Sparkles className="w-3 h-3 text-amber-700 dark:text-amber-300" />
                        {childPendingDeeds.length} Good Deed{childPendingDeeds.length > 1 ? 's' : ''} to Confirm
                      </span>
                    )}
                    {childUnresolved.length > 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 text-rose-800 dark:text-rose-200 text-xs font-semibold">
                        <AlertCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                        {childUnresolved.length} Needs Practice
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Inline Edit Child Form */}
        {editingChildId && (
          <form
            onSubmit={handleSaveChildEdit}
            className="rounded-2xl bg-[var(--bg-elevated)] p-4 border-2 border-emerald-700/40 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                Editing Child Profile
              </h3>
              <button
                type="button"
                onClick={() => setEditingChildId(null)}
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold"
              >
                Cancel
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Child Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl ilmizo-input px-3 py-2 text-xs font-semibold"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Age</label>
                <SelectSheetField
                  title="Select Child Age"
                  ariaLabel="Child age"
                  variant="compact"
                  className="w-full"
                  value={String(editAge)}
                  onChange={(val) => setEditAge(Number(val))}
                  options={[4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((a) => ({
                    value: String(a),
                    label: `Age ${a}`,
                  }))}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Companion Mascot</label>
                <SelectSheetField
                  title="Choose Companion Guide"
                  ariaLabel="Companion mascot"
                  variant="compact"
                  className="w-full"
                  value={editAvatar}
                  onChange={(val) => setEditAvatar(val as 'Ayaan' | 'Ayla' | 'Mizo')}
                  options={[
                    { value: 'Ayaan', label: 'Ayaan', subtitle: 'Boy Guide' },
                    { value: 'Ayla', label: 'Ayla', subtitle: 'Girl Guide' },
                    { value: 'Mizo', label: 'Mizo', subtitle: 'Star Companion' },
                  ]}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Daily Goal</label>
                <SelectSheetField
                  title="Daily Learning Goal"
                  ariaLabel="Daily learning goal"
                  variant="compact"
                  className="w-full"
                  value={String(editDailyGoal)}
                  onChange={(val) => setEditDailyGoal(Number(val))}
                  options={[
                    { value: '5', label: '5 mins / day' },
                    { value: '10', label: '10 mins / day', badge: 'Recommended' },
                    { value: '15', label: '15 mins / day' },
                    { value: '20', label: '20 mins / day' },
                  ]}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#14532D] text-white font-bold text-xs min-h-[42px]"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        )}

        {/* Add Child Profile Form */}
        {childrenProfiles.length < 5 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newChildName.trim()) return;
              if (!canAccessChildSlot(user, childrenProfiles.length)) {
                setPaywallReason(
                  'Your Free plan supports 1 new child profile. Upgrade to Family Plus (₹199/yr · 7-Day Free Trial) to manage up to 5 children independently.'
                );
                setPaywallOpen(true);
                return;
              }
              addChildProfile(newChildName.trim(), newChildAge, newChildAvatar, newChildGoal);
              setNewChildName('');
            }}
            className="rounded-2xl bg-[var(--bg-elevated)] p-4 border border-[var(--border-subtle)] flex flex-wrap items-center gap-3"
          >
            <input
              type="text"
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              placeholder="Add child name (up to 5 children)..."
              className="flex-1 min-w-[180px] rounded-xl ilmizo-input px-3.5 py-2.5 text-xs font-medium"
            />
            <SelectSheetField
              title="Select Child Age"
              ariaLabel="New child age"
              variant="compact"
              value={String(newChildAge)}
              onChange={(val) => setNewChildAge(Number(val))}
              options={[4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((a) => ({
                value: String(a),
                label: `Age ${a}`,
              }))}
            />
            <SelectSheetField
              title="Choose Companion Guide"
              ariaLabel="New child mascot"
              variant="compact"
              value={newChildAvatar}
              onChange={(val) => setNewChildAvatar(val as 'Ayaan' | 'Ayla' | 'Mizo')}
              options={[
                { value: 'Ayaan', label: 'Mascot: Ayaan', subtitle: 'Boy Guide' },
                { value: 'Ayla', label: 'Mascot: Ayla', subtitle: 'Girl Guide' },
                { value: 'Mizo', label: 'Mascot: Mizo', subtitle: 'Star Companion' },
              ]}
            />
            <SelectSheetField
              title="Daily Learning Goal"
              ariaLabel="New child daily goal"
              variant="compact"
              value={String(newChildGoal)}
              onChange={(val) => setNewChildGoal(Number(val))}
              options={[
                { value: '10', label: 'Goal: 10m/day', badge: 'Recommended' },
                { value: '15', label: 'Goal: 15m/day' },
                { value: '20', label: 'Goal: 20m/day' },
              ]}
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 min-h-[42px] transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Child ({childrenProfiles.length}/5)</span>
            </button>
          </form>
        ) : (
          <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/35 p-3 text-xs text-amber-950 dark:text-amber-200 font-medium flex items-center justify-between">
            <span>Maximum of 5 child profiles reached for this Family account.</span>
            <span className="font-bold">5 / 5 Active</span>
          </div>
        )}
      </div>
      )}

      {/* Section 2: Selected Child Learning Evidence & Tarbiyah Inspector (Overview Tab) */}
      {activeParentTab === 'overview' && activeChild && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Mission Progress, Surahs & Needs Practice Queue */}
          <div className="rounded-3xl bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xs border border-[var(--border-subtle)] space-y-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <CharacterAvatar character={activeChild.avatar} size="md" />
                <div>
                  <h2 className="text-base font-bold text-[var(--text-primary)]">
                    {activeChild.name}’s Learning Evidence
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Learn → Practice → Demonstrate → Review Loop
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateChildProfile(activeChild.id, {
                    questStepsCompleted: {
                      quran: false,
                      dua: false,
                      quiz: false,
                      salah: false,
                      family: false,
                    },
                  });
                }}
                className="px-3 py-1.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-semibold text-xs flex items-center gap-1"
                title="Reset today's 5 quest steps for a fresh daily loop"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Quest</span>
              </button>
            </div>

            {/* Today's 5 Quest Steps Status */}
            <div className="rounded-2xl bg-[var(--bg-elevated)] p-4 border border-[var(--border-subtle)] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--text-primary)]">Today’s 10-Minute Mission</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                  {completedQuestCount} / 5 Completed
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {(
                  [
                    { key: 'quran', label: 'Quran' },
                    { key: 'dua', label: 'Dua' },
                    { key: 'quiz', label: 'Quiz' },
                    { key: 'salah', label: 'Salah' },
                    { key: 'family', label: 'Family' },
                  ] as const
                ).map((step) => {
                  const done = activeChild.questStepsCompleted[step.key];
                  return (
                    <div
                      key={step.key}
                      className={`rounded-xl p-2 text-center border text-[11px] font-bold ${
                        done
                          ? 'bg-emerald-100/80 dark:bg-emerald-900/50 border-emerald-400 dark:border-emerald-600/60 text-emerald-950 dark:text-emerald-100'
                          : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)]'
                      }`}
                    >
                      <p>{step.label}</p>
                      <p className="text-[11px] mt-0.5">{done ? '✓ Done' : 'Pending'}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Completed Surahs */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Completed Surahs ({activeChild.completedSurahs.length})
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeChild.completedSurahs.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/40 text-emerald-900 dark:text-emerald-200 font-semibold text-xs flex items-center gap-1"
                  >
                    <BookOpen className="w-3 h-3 text-emerald-700 dark:text-emerald-300" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Needs Practice Queue */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Needs Practice Queue ({unresolvedPractice.length})
                </h3>
                {unresolvedPractice.length > 0 && (
                  <span className="text-xs text-rose-700 dark:text-rose-300 font-semibold">
                    Flagged during recitation or quiz
                  </span>
                )}
              </div>

              {unresolvedPractice.length === 0 ? (
                <div className="rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/25 border border-emerald-200 dark:border-emerald-700/40 p-4 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-300 shrink-0" />
                  <span>
                    All clear! {activeChild.name} has reviewed all flagged ayahs and quiz questions.
                  </span>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {unresolvedPractice.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-700/40 p-3.5 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200">
                            {item.pillar}
                          </span>
                          <h4 className="text-xs font-bold text-[var(--text-primary)] mt-1">{item.title}</h4>
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.prompt}</p>
                        </div>
                        <span className="text-[11px] font-semibold text-[var(--text-muted)] shrink-0">
                          {item.lastAttemptAt}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setKidsRoute(item.targetRoute);
                            setMode('kids');
                          }}
                          className="min-h-[36px] px-3 py-1.5 rounded-xl bg-[#14532D] text-white font-bold text-xs flex items-center gap-1"
                        >
                          <Play className="w-3 h-3" />
                          <span>Practice Together</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => resolveNeedsPracticeItem(item.id)}
                          className="min-h-[36px] px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold text-xs"
                        >
                          Mark Reviewed (+5 ★)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity Log & Quiz Attempts */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Recent Recorded Activities
              </h3>
              <div className="divide-y divide-[var(--divider)] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] overflow-hidden">
                {activeChild.recentActivities.slice(0, 5).map((act) => (
                  <div key={act.id} className="px-3.5 py-2.5 flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
                      <span className="font-semibold text-[var(--text-primary)] truncate">{act.title}</span>
                      <span className="text-[11px] uppercase px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] font-bold shrink-0">
                        {act.pillar}
                      </span>
                    </div>
                    <span className="text-[11px] text-[var(--text-muted)] shrink-0">{act.timestamp}</span>
                  </div>
                ))}
              </div>
              {kidsQuizAttempts.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs font-bold text-[var(--text-secondary)] mb-1.5">
                    Latest Quiz Scores ({kidsQuizAttempts.length} recorded):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {kidsQuizAttempts.slice(0, 4).map((qa) => (
                      <span
                        key={qa.id}
                        className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-400/35 text-amber-950 dark:text-amber-200 text-xs font-bold tabular-nums"
                      >
                        {qa.quizTitle}: {qa.score}/{qa.total}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Parent Good Deed Verification Queue & Direct Award */}
          <div className="rounded-3xl bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xs border border-[var(--border-subtle)] space-y-5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  <span>Akhlaq & Real-World Good Deeds ({activeChild.name})</span>
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Confirm self-reported deeds or award bonus stars for kindness at home.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-950 dark:text-amber-200 font-bold text-xs tabular-nums shrink-0">
                {activeChild.pillarProgress.akhlaqDeeds} Verified
              </span>
            </div>

            {/* Pending Parent Confirmation Queue */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Awaiting Parent Verification ({pendingDeeds.length})
              </h3>
              {pendingDeeds.length === 0 ? (
                <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 text-xs text-[var(--text-secondary)]">
                  No unconfirmed deeds waiting in {activeChild.name}’s queue right now.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {pendingDeeds.map((deed) => (
                    <div
                      key={deed.id}
                      className="rounded-2xl bg-amber-50/90 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-400/35 p-4 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-[var(--text-primary)]">{deed.title}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{deed.description}</p>
                        <p className="text-[11px] text-amber-800 dark:text-amber-300 font-semibold">{deed.childReportedAt}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => confirmChildGoodDeed(activeChild.id, deed.id)}
                        className="min-h-[40px] px-3.5 py-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs shrink-0 shadow-xs transition"
                      >
                        Confirm & Award +10 ★
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Parent Direct Good Deed Award Form */}
            <form
              onSubmit={handleAwardParentDeed}
              className="rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/40 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[var(--text-primary)]">
                  Award a Verified Good Deed to {activeChild.name}
                </h3>
                {deedAwardedToast && (
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    +10 Stars Awarded MashaAllah! ✓
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={parentDeedTitle}
                  onChange={(e) => setParentDeedTitle(e.target.value)}
                  placeholder="e.g., Prayed Maghrib with family, Helped younger sibling..."
                  className="flex-1 min-w-[200px] rounded-xl ilmizo-input px-3 py-2 text-xs font-medium"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#14532D] text-white font-bold text-xs min-h-[40px]"
                >
                  Award +10 ★
                </button>
              </div>
            </form>

            {/* Confirmed Good Deeds History */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Confirmed Good Deeds Log ({confirmedDeeds.length})
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {confirmedDeeds.map((deed) => (
                  <div
                    key={deed.id}
                    className="rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 flex items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">{deed.title}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{deed.description}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 font-bold text-[11px] shrink-0">
                      Verified ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Earned Badges Summary */}
            <div className="space-y-2 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Earned Badges ({activeChild.earnedBadgeIds.length} / {KIDS_BADGES_CATALOG.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {KIDS_BADGES_CATALOG.map((badge) => {
                  const earned = activeChild.earnedBadgeIds.includes(badge.id);
                  return (
                    <span
                      key={badge.id}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${
                        earned
                          ? 'bg-amber-50 dark:bg-amber-500/20 border-amber-300 dark:border-amber-400/40 text-amber-950 dark:text-amber-200'
                          : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]'
                      }`}
                    >
                      {badge.icon} {badge.title}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SAFETY — Screen-Time Enforcement, PIN Recovery & Local Backup Hub */}
      {activeParentTab === 'safety' && (
      <div className="space-y-4">
        {/* Harder Parent Screen-Time Enforcement Card */}
        {activeChild && (
          <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                  <span>Kids World Screen-Time Enforcement ({activeChild.name})</span>
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Tracks real foreground active time in Kids World and locks Kids World when the daily limit is reached.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <InfoDisclosure
                  label="Browser Scope"
                  sheetTitle="Screen-Time Enforcement Scope"
                  sheetSubtitle="How web/PWA locking works alongside OS controls"
                >
                  <p>
                    Ilmizo tracks foreground usage and locks Kids World inside this browser/PWA across refreshes and internal navigation, pausing automatically when the tab/app is hidden.
                  </p>
                  <p>
                    Because web applications cannot lock the operating system or prevent switching to other apps, combine this with Apple Screen Time (iOS) or Google Family Link (Android) for OS-level enforcement.
                  </p>
                </InfoDisclosure>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    isKidsScreenTimeLocked
                      ? 'bg-rose-100 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-700/40 text-rose-900 dark:text-rose-200'
                      : 'bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-700/40 text-emerald-900 dark:text-emerald-200'
                  }`}
                >
                  {isKidsScreenTimeLocked ? 'Locked' : 'Within Limit'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 space-y-1">
                <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase">
                  Foreground Usage Today
                </p>
                <p className="text-xl font-extrabold text-[var(--text-primary)] tabular-nums">
                  {Math.floor((activeChild.activeSecondsToday ?? activeChild.activeMinutesToday * 60) / 60)}m{' '}
                  {(activeChild.activeSecondsToday ?? activeChild.activeMinutesToday * 60) % 60}s{' '}
                  <span className="text-xs font-bold text-[var(--text-muted)]">
                    / {activeChild.dailyGoalMinutes + (activeChild.extraMinutesGrantedToday || 0)}m limit
                  </span>
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Base limit: {activeChild.dailyGoalMinutes}m
                  {activeChild.extraMinutesGrantedToday
                    ? ` (+${activeChild.extraMinutesGrantedToday}m bonus today)`
                    : ''}
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 space-y-2">
                <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase">
                  Daily Screen-Time Limit
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[5, 10, 15, 20, 30, 45].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() =>
                        updateChildProfile(activeChild.id, { dailyGoalMinutes: mins })
                      }
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition ${
                        activeChild.dailyGoalMinutes === mins
                          ? 'bg-[#14532D] text-white'
                          : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)]'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 space-y-2">
                <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase">
                  Local Daily Reset Time
                </p>
                <SelectSheetField
                  title="Daily Screen-Time Reset Time"
                  ariaLabel="Local daily reset time"
                  variant="compact"
                  className="w-full"
                  value={String(user.kidsDailyResetHour ?? 0)}
                  onChange={(val) => updateUser({ kidsDailyResetHour: Number(val) })}
                  options={[
                    { value: '0', label: '12:00 AM', subtitle: 'Local Midnight' },
                    { value: '4', label: '4:00 AM', subtitle: 'Before Fajr' },
                    { value: '5', label: '5:00 AM', subtitle: 'Early Morning' },
                    { value: '6', label: '6:00 AM', subtitle: 'Sunrise' },
                  ]}
                />
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      updateChildProfile(activeChild.id, {
                        extraMinutesGrantedToday: (activeChild.extraMinutesGrantedToday || 0) + 10,
                      })
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-950 dark:text-emerald-200 text-xs font-bold"
                  >
                    +10m Today
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateChildProfile(activeChild.id, {
                        activeSecondsToday: 0,
                        activeMinutesToday: 0,
                        extraMinutesGrantedToday: 0,
                        screenTimeUnlockedForPeriodKey: undefined,
                      })
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-xs font-bold"
                  >
                    Reset Today’s Timer
                  </button>
                </div>
              </div>
            </div>

            <ParentTimeVoucherGeneratorCard
              childId={activeChild.id}
              childName={activeChild.name}
              signingKey={user.parentPinVerifier}
            />
          </div>
        )}

        <Suspense fallback={<SkeletonCard lines={4} />}>
          <LocalDataManagerCard />
        </Suspense>

        {/* Update 4-Digit Parent PIN & Recovery Code Card */}
        <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Parent PIN & Local Recovery Code Security
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                user.parentPinRecoveryHash
                  ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700/40'
                  : 'bg-amber-100 dark:bg-amber-500/20 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-400/35'
              }`}
            >
              {user.parentPinRecoveryHash
                ? 'Recovery Code Configured ✓'
                : 'No Recovery Code Saved Yet'}
            </span>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Your 4-digit Parent PIN is <strong>never stored or exported in plain text</strong> (protected with salted on-device encryption). Updating your PIN creates a single-use recovery code (<span className="font-mono font-bold">ILMZ-XXXX-XXXX</span>) in pending state until confirmed.
          </p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setPinUpdateFeedback(null);
              const res = await beginParentPinSetup(currentPinVerify, newPin);
              if (!res.ok) {
                setPinUpdateFeedback({
                  ok: false,
                  text: res.error || 'Could not initiate Parent PIN update.',
                });
                return;
              }
              setCurrentPinVerify('');
              setNewPin('');
              setRecoverySavedConfirmed(false);
              setPinUpdateFeedback({
                ok: true,
                text: 'Pending Recovery Code generated below! Your previous PIN remains active until you check the box and click "Confirm & Save PIN + Recovery Code".',
              });
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end"
          >
            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1">
                Current 4-Digit PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={currentPinVerify}
                onChange={(e) =>
                  setCurrentPinVerify(e.target.value.replace(/\D/g, '').slice(0, 4))
                }
                placeholder="••••"
                className="w-full rounded-xl ilmizo-input px-3 py-2.5 text-xs font-bold tracking-widest tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1">
                New 4-Digit PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="New 4-digit PIN"
                className="w-full rounded-xl ilmizo-input px-3 py-2.5 text-xs font-bold tracking-widest tabular-nums"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={currentPinVerify.length !== 4 || newPin.length !== 4}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#14532D] disabled:opacity-40 text-white font-bold text-xs min-h-[42px]"
              >
                Update PIN
              </button>
              <button
                type="button"
                disabled={currentPinVerify.length !== 4}
                onClick={async () => {
                  setPinUpdateFeedback(null);
                  const res = await beginRecoveryCodeRegeneration(currentPinVerify);
                  if (!res.ok) {
                    setPinUpdateFeedback({
                      ok: false,
                      text: res.error || 'Enter your current 4-digit PIN first.',
                    });
                    return;
                  }
                  setCurrentPinVerify('');
                  setRecoverySavedConfirmed(false);
                  setPinUpdateFeedback({
                    ok: true,
                    text: 'Pending Recovery Code generated below! Your previous recovery code remains active until you confirm and save.',
                  });
                }}
                className="px-3.5 py-2.5 rounded-xl bg-amber-100 dark:bg-amber-500/20 disabled:opacity-40 text-amber-950 dark:text-amber-200 font-bold text-xs min-h-[42px]"
              >
                New Recovery Code
              </button>
            </div>
          </form>

          {pinUpdateFeedback && (
            <div
              className={`rounded-2xl p-3 text-xs font-bold ${
                pinUpdateFeedback.ok
                  ? 'bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/40 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 text-rose-800 dark:text-rose-200'
              }`}
            >
              {pinUpdateFeedback.text}
            </div>
          )}

          {pendingPinSetup && (
            <div className="rounded-2xl bg-amber-50 dark:bg-amber-500/15 border-2 border-amber-400 p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-extrabold text-amber-950 dark:text-amber-200 uppercase tracking-wider">
                  Pending Confirmation — Save Recovery Code Before Committing
                </p>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-500/30 text-amber-950 dark:text-amber-100 text-[11px] font-bold">
                  Single-Use · Encrypted
                </span>
              </div>
              <div className="rounded-xl bg-[var(--bg-surface)] border border-amber-300 dark:border-amber-400/40 py-3 px-4 text-center font-mono text-lg font-extrabold tracking-wider text-[var(--text-primary)] select-all">
                {pendingPinSetup.recoveryCode}
              </div>
              <p className="text-xs text-amber-950 dark:text-amber-100 leading-relaxed">
                Write this recovery code down or store it in your password manager. <strong>Nothing has been overwritten in storage yet</strong> — if you refresh or cancel now, your previous PIN remains unchanged.
              </p>
              <label className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={recoverySavedConfirmed}
                  onChange={(e) => setRecoverySavedConfirmed(e.target.checked)}
                  className="rounded border-amber-400 text-emerald-800"
                />
                <span>I have saved this recovery code in a safe place</span>
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    cancelPendingParentPinSetup();
                    setRecoverySavedConfirmed(false);
                    setPinUpdateFeedback({
                      ok: false,
                      text: 'Pending PIN / Recovery Code update discarded. Previous security settings preserved.',
                    });
                  }}
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-bold text-xs"
                >
                  Cancel & Discard
                </button>
                <button
                  type="button"
                  disabled={!recoverySavedConfirmed}
                  onClick={() => {
                    const res = confirmPendingParentPinSetup();
                    if (res.ok) {
                      setRecoverySavedConfirmed(false);
                      setPinUpdateFeedback({
                        ok: true,
                        text: 'Confirmed & saved! Your new Parent PIN verifier and single-use Recovery Code hash are now active on this device.',
                      });
                    }
                  }}
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-[#14532D] disabled:opacity-40 text-white font-bold text-xs"
                >
                  Confirm & Save PIN + Recovery Code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      )}

      {/* Section 4: Ilmizo Family Plus & Google Play Billing (Profiles Tab) */}
      {activeParentTab === 'profiles' && (() => {
        const effectiveTier = getEffectiveEntitlement(user);
        const trial = getTrialStatus(user);
        const familyUnlocked = isFamilyPlusActive(user);

        return (
          <div className="rounded-3xl bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xs border border-[var(--border-subtle)] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  {trial.isTrialActive
                    ? `7-Day Free Trial Active · ${trial.daysRemaining} day(s) left`
                    : familyUnlocked
                    ? 'Family Plus Unlocked · Ad-Free'
                    : 'Free Core Plan · Upgrade for ~₹16 / month'}
                </p>
                <h2 className="text-base font-bold text-[var(--text-primary)] mt-0.5">
                  Membership Plans & Google Play Billing
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Core 114-Surah Quran, Salah/Wudu guides, Duas, Qibla, and Tasbih are always 100% Free Forever.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {!familyUnlocked && !trial.hasUsedTrial && (
                  <button
                    type="button"
                    onClick={() => {
                      updateUser(startLocalSevenDayTrialPatch());
                      playGentleCelebrationChime('lesson_complete');
                      setRestoreStatusMsg('7-Day Free Family Plus Trial activated!');
                      setRestoreToast(true);
                      window.setTimeout(() => setRestoreToast(false), 3500);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold min-h-[40px] shadow-xs transition"
                  >
                    Start 7-Day Free Trial
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    void attemptPlayStoreRestore(user).then((res) => {
                      if (res.patch) updateUser(res.patch);
                      setRestoreStatusMsg(res.message);
                      setRestoreToast(true);
                      window.setTimeout(() => setRestoreToast(false), 3500);
                    });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-bold min-h-[40px]"
                >
                  {restoreToast ? 'Verified ✓' : 'Restore Purchases'}
                </button>
              </div>
            </div>

            {restoreStatusMsg && (
              <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/40 px-3.5 py-2 text-xs font-bold text-emerald-950 dark:text-emerald-200">
                {restoreStatusMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {ILMIZO_PLAN_CATALOG.map((tier) => {
                const active = effectiveTier === tier.id;
                const isBest = tier.id === 'family_199';
                const title = resolvePlanText(tier.title, user.language);
                const tagline = resolvePlanText(tier.tagline, user.language);
                const features = resolvePlanText(tier.features, user.language);
                return (
                  <div
                    key={tier.id}
                    className={`rounded-2xl p-4 border-2 flex flex-col justify-between space-y-3 transition ${
                      active
                        ? 'border-emerald-700 dark:border-emerald-400 bg-emerald-50/40 dark:bg-emerald-900/25'
                        : isBest
                        ? 'border-amber-400 bg-[var(--bg-elevated)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)]'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300 tabular-nums">
                        {tier.monthlyEquivalentLabel}
                      </p>
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">{title}</h3>
                      <p className="text-xl font-extrabold text-[var(--text-primary)] tabular-nums">
                        {tier.priceInrLabel}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] leading-snug">{tagline}</p>
                      <ul className="space-y-1.5 pt-2 border-t border-[var(--divider)] text-xs text-[var(--text-secondary)]">
                        {features.map((f) => (
                          <li key={f} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (tier.id === 'free') {
                          updateUser({ entitlement: 'free', subscriptionPurchaseSource: 'none' });
                          return;
                        }
                        setPaywallReason(undefined);
                        setPaywallOpen(true);
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition min-h-[42px] ${
                        active
                          ? 'bg-emerald-900 text-white'
                          : isBest
                          ? 'bg-[#14532D] hover:bg-emerald-800 text-white'
                          : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)]'
                      }`}
                    >
                      {active
                        ? trial.isTrialActive && tier.id === 'family_199'
                          ? `Trial Active (${trial.daysRemaining}d)`
                          : 'Active Plan ✓'
                        : tier.id === 'free'
                        ? 'Use Free Core'
                        : 'Unlock / Manage Plan →'}
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {billingEnvLabel}
            </p>
          </div>
        );
      })()}

      <FamilyPlusPaywallModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        triggerReason={paywallReason}
        skipParentGate
        onUnlocked={(msg) => {
          setRestoreStatusMsg(msg);
          setRestoreToast(true);
        }}
      />
    </div>
  );
};

const ParentTimeVoucherGeneratorCard: React.FC<{
  childId: string;
  childName: string;
  signingKey?: string;
}> = ({ childId, childName, signingKey }) => {
  const [selectedAction, setSelectedAction] = useState<ParentVoucherAction>('grant_10m');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setErrorMsg(null);
    setCopied(false);
    const res = await issueParentTimeVoucher({
      action: selectedAction,
      childId,
      signingKey,
    });
    if (!res.ok || !res.code) {
      setGeneratedCode(null);
      setErrorMsg(res.error || 'Could not generate Parent Time Voucher.');
      return;
    }
    setGeneratedCode(res.code);
  };

  const handleCopy = async () => {
    if (!generatedCode) return;
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-500/15 border border-amber-300/70 dark:border-amber-400/35 p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-amber-800 dark:text-amber-300" />
          <h4 className="text-xs font-extrabold text-[var(--text-primary)]">
            Single-Use Offline Time Voucher for {childName}
          </h4>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-amber-200/70 dark:bg-amber-500/30 text-amber-950 dark:text-amber-100 text-[11px] font-bold">
          Zero-Cloud · Single-Use
        </span>
      </div>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
        Generate a cryptographically tagged one-time code (<span className="font-mono font-bold">ILMZ-...</span>) you can hand to {childName} to redeem on the Kids Lock Screen without sharing your 4-digit Parent PIN.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'grant_10m' as const, label: '+10 Mins' },
          { id: 'grant_15m' as const, label: '+15 Mins' },
          { id: 'unlock_today' as const, label: 'Unlock Today' },
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => {
              setSelectedAction(opt.id);
              setGeneratedCode(null);
              setErrorMsg(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedAction === opt.id
                ? 'bg-[#14532D] text-white shadow-2xs'
                : 'bg-[var(--bg-surface)] border border-amber-300/70 dark:border-amber-400/35 text-[var(--text-primary)]'
            }`}
          >
            {opt.label}
          </button>
        ))}
        <button
          type="button"
          onClick={handleGenerate}
          className="ml-auto min-h-[38px] px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold transition"
        >
          Generate Code
        </button>
      </div>

      {errorMsg && (
        <div className="rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 px-3 py-2 text-xs font-bold text-rose-800 dark:text-rose-200 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {generatedCode && (
        <div className="rounded-xl bg-[var(--bg-surface)] border border-amber-300 dark:border-amber-400/40 p-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              One-Time Code (Bound to {childName})
            </p>
            <p className="font-mono text-sm font-extrabold text-[var(--text-primary)] select-all">
              {generatedCode}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-emerald-900 text-white text-xs font-bold flex items-center gap-1"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied ✓' : 'Copy Code'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

