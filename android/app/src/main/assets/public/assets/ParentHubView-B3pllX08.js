const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LocalDataManagerCard-DOnUkM8q.js","assets/rolldown-runtime-DQp2zzRu.js","assets/vendor-icons-DCckKQxi.js","assets/vendor-motion-DfqbQRzE.js","assets/data-islamic-content-DVwdNHPG.js","assets/index-Dy1fifCC.js","assets/vendor-react-CoNEUsWJ.js","assets/vendor-capacitor-BtYYifC8.js","assets/index-Bo1dxC-b.css","assets/studioAudioAndTajweedService-DF0oWwfx.js","assets/nooraniQaidaCourse-DdAqOF7e.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./rolldown-runtime-DQp2zzRu.js";
import { A as RefreshCw, C as ShieldCheck, F as PenLine, Ft as require_react, G as KeyRound, J as Heart, M as Plus, N as Play, Nt as ArrowLeft, T as Share2, Tt as BookOpen, V as Lock, _ as Sparkles, bt as Check, d as Trash2, dt as Clock, ht as CircleAlert, lt as Copy, mt as CircleCheck, ot as Download, s as Users, t as X } from "./vendor-icons-DCckKQxi.js";
import { i as require_jsx_runtime } from "./vendor-motion-DfqbQRzE.js";
import { r as KIDS_BADGES_CATALOG } from "./data-islamic-content-DVwdNHPG.js";
import { r as __vitePreload } from "./vendor-capacitor-BtYYifC8.js";
import { C as canAccessChildSlot, F as detectBillingEnvironment, H as startLocalSevenDayTrialPatch, I as getEffectiveEntitlement, K as issueParentTimeVoucher, L as getTrialStatus, S as attemptPlayStoreRestore, V as resolvePlanText, Y as evaluateChildBadgesAndMilestones, b as ILMIZO_PLAN_CATALOG, ft as triggerSuccessHaptic, i as InfoDisclosure, l as SkeletonCard, mt as CharacterAvatar, ot as SelectSheetField, ut as triggerLightHaptic, v as useIlmizo, vt as SyncStatusBadge, z as isFamilyPlusActive } from "./index-Dy1fifCC.js";
import { n as playGentleCelebrationChime, t as FamilyPlusPaywallModal } from "./FamilyPlusPaywallModal-B_X5oIMT.js";
import { n as buildWeeklyTarbiyahReport, r as generateWeeklyProgressCardSvg } from "./dailyTarbiyahPlanEngine-BDxia3dk.js";
// src/components/parent/WeeklyProgressCard.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var WeeklyProgressCard = ({ child, onStatusMessage }) => {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const report = (0, import_react.useMemo)(() => buildWeeklyTarbiyahReport(child), [child]);
	const supportsNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
	const handleNativeShare = async () => {
		if (!supportsNativeShare) {
			await handleCopyWhatsAppText();
			return;
		}
		try {
			triggerLightHaptic();
			await navigator.share({
				title: `Ilmizo Weekly Tarbiyah — ${child.name}`,
				text: report.whatsappShareText
			});
			triggerSuccessHaptic();
			onStatusMessage?.(`Shared ${child.name}’s voluntary weekly summary!`);
		} catch {}
	};
	const handleCopyWhatsAppText = async () => {
		try {
			if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") await navigator.clipboard.writeText(report.whatsappShareText);
			setCopied(true);
			triggerSuccessHaptic();
			onStatusMessage?.(`Copied ${child.name}’s WhatsApp progress summary!`);
			window.setTimeout(() => setCopied(false), 2400);
		} catch {
			onStatusMessage?.("Clipboard unavailable — you can download the SVG card instead.");
		}
	};
	const handleDownloadCardSvg = () => {
		const svg = generateWeeklyProgressCardSvg(report);
		const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `ilmizo-weekly-report-${child.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
		triggerSuccessHaptic();
		onStatusMessage?.(`Downloaded ${child.name}’s Weekly Tarbiyah Card!`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-gradient-to-br from-[#0F3826] via-[#14532D] to-[#0B2E1E] text-white p-5 shadow-sm border border-amber-300/35 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] font-bold text-amber-300 tabular-nums",
					children: [
						"Voluntary Parent Share Card ·",
						" ",
						report.hasActivityThisWeek ? `${report.streakDays} active day(s) · ~${report.weeklyMinutesEstimate} min` : "Waiting for first activity"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-extrabold mt-0.5",
					children: report.headline
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-5 h-5 text-amber-300 shrink-0" })]
			}),
			!report.hasActivityThisWeek ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-white/10 border border-white/15 p-4 text-xs text-emerald-100 leading-relaxed space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-extrabold text-amber-200",
					children: "Honest Empty State — Ready When You Are"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Once ",
					child.name,
					" completes a Qaida lesson, storybook, or daily Dua, real numbers will appear here so you can voluntarily share a proud family milestone on WhatsApp."
				] })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-white/10 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-lg font-extrabold text-amber-300 tabular-nums",
							children: [
								report.qaidaCompletedCount,
								"/",
								report.qaidaTotalCount
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold text-emerald-100 mt-0.5",
							children: "Qaida Lessons"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-white/10 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-lg font-extrabold text-amber-300 tabular-nums",
							children: [
								report.storiesCompletedCount,
								"/",
								report.storiesTotalCount
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold text-emerald-100 mt-0.5",
							children: "Storybooks"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-white/10 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-extrabold text-amber-300 tabular-nums",
							children: report.duasMasteredCount
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] font-bold text-emerald-100 mt-0.5",
							children: [
								"Duas · ",
								report.goodDeedsCount,
								" Deeds"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-white/10 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-lg font-extrabold text-amber-300 tabular-nums",
							children: [report.starsEarned, " ★"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold text-emerald-100 mt-0.5",
							children: "Total Stars"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 pt-1",
				children: [
					supportsNativeShare && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void handleNativeShare(),
						className: "flex-1 min-w-[140px] min-h-[48px] px-4 py-2.5 rounded-xl bg-[#22C55E] hover:bg-emerald-400 text-emerald-950 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Share via WhatsApp / Sheet" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void handleCopyWhatsAppText(),
						className: "flex-1 min-w-[140px] min-h-[48px] px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copied ? "Copied for WhatsApp!" : "Copy WhatsApp Text" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleDownloadCardSvg,
						className: "flex-1 min-w-[140px] min-h-[48px] px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Card (SVG)" })]
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] text-emerald-100/80 flex items-center gap-1.5 pt-1 border-t border-white/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-amber-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Parent-only voluntary share · Includes only first name & summary counts · Zero tracking." })]
			})
		]
	});
};
// src/components/parent/ParentHubView.tsx
var LocalDataManagerCard = (0, import_react.lazy)(() => __vitePreload(() => import("./LocalDataManagerCard-DOnUkM8q.js").then((m) => ({ default: m.LocalDataManagerCard })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])));
var ParentHubView = () => {
	const { user, updateUser, setMode, setKidsRoute, goBack, parentHubUnlocked: unlocked, setParentHubUnlocked: setUnlocked, childrenProfiles, activeChildId, activeChild, setActiveChildId, addChildProfile, updateChildProfile, deleteChildProfile, confirmChildGoodDeed, resolveNeedsPracticeItem, quizAttempts, logLearningEvent, exportAllDataJson, isParentPinConfigured, verifyEnteredParentPin, pendingPinSetup, beginParentPinSetup, beginRecoveryCodeRegeneration, confirmPendingParentPinSetup, cancelPendingParentPinSetup, resetParentPinWithRecoveryCodeAsync, isKidsScreenTimeLocked } = useIlmizo();
	const [pinInput, setPinInput] = (0, import_react.useState)("");
	const [pinError, setPinError] = (0, import_react.useState)(false);
	const [firstTimePinInput, setFirstTimePinInput] = (0, import_react.useState)("");
	const [firstTimeRecoveryConfirmed, setFirstTimeRecoveryConfirmed] = (0, import_react.useState)(false);
	const [showGateRecovery, setShowGateRecovery] = (0, import_react.useState)(false);
	const [gateRecoveryCode, setGateRecoveryCode] = (0, import_react.useState)("");
	const [gateRecoveryNewPin, setGateRecoveryNewPin] = (0, import_react.useState)("");
	const [gateRecoveryStatus, setGateRecoveryStatus] = (0, import_react.useState)(null);
	const [newChildName, setNewChildName] = (0, import_react.useState)("");
	const [newChildAge, setNewChildAge] = (0, import_react.useState)(7);
	const [newChildAvatar, setNewChildAvatar] = (0, import_react.useState)("Ayaan");
	const [newChildGoal, setNewChildGoal] = (0, import_react.useState)(10);
	const [editingChildId, setEditingChildId] = (0, import_react.useState)(null);
	const [editName, setEditName] = (0, import_react.useState)("");
	const [editAge, setEditAge] = (0, import_react.useState)(7);
	const [editAvatar, setEditAvatar] = (0, import_react.useState)("Ayaan");
	const [editDailyGoal, setEditDailyGoal] = (0, import_react.useState)(10);
	const [confirmDeleteId, setConfirmDeleteId] = (0, import_react.useState)(null);
	const [currentPinVerify, setCurrentPinVerify] = (0, import_react.useState)("");
	const [newPin, setNewPin] = (0, import_react.useState)("");
	const [pinUpdateFeedback, setPinUpdateFeedback] = (0, import_react.useState)(null);
	const [recoverySavedConfirmed, setRecoverySavedConfirmed] = (0, import_react.useState)(false);
	import_react.useEffect(() => {
		return () => {
			cancelPendingParentPinSetup();
		};
	}, [cancelPendingParentPinSetup]);
	const [parentDeedTitle, setParentDeedTitle] = (0, import_react.useState)("");
	const [deedAwardedToast, setDeedAwardedToast] = (0, import_react.useState)(false);
	const [restoreToast, setRestoreToast] = (0, import_react.useState)(false);
	const [restoreStatusMsg, setRestoreStatusMsg] = (0, import_react.useState)(null);
	const [billingEnvLabel, setBillingEnvLabel] = (0, import_react.useState)("Checking Play Billing...");
	const [paywallOpen, setPaywallOpen] = (0, import_react.useState)(false);
	const [paywallReason, setPaywallReason] = (0, import_react.useState)(void 0);
	const [activeParentTab, setActiveParentTab] = (0, import_react.useState)("overview");
	import_react.useEffect(() => {
		detectBillingEnvironment().then((env) => setBillingEnvLabel(env.message));
	}, []);
	const startEditingChild = (child, e) => {
		e.stopPropagation();
		setEditingChildId(child.id);
		setEditName(child.name);
		setEditAge(child.age);
		setEditAvatar(child.avatar);
		setEditDailyGoal(child.dailyGoalMinutes || 10);
		setConfirmDeleteId(null);
	};
	const handleSaveChildEdit = (e) => {
		e.preventDefault();
		if (!editingChildId || !editName.trim()) return;
		updateChildProfile(editingChildId, {
			name: editName.trim(),
			age: editAge,
			avatar: editAvatar,
			dailyGoalMinutes: editDailyGoal
		});
		setEditingChildId(null);
	};
	const handleAwardParentDeed = (e) => {
		e.preventDefault();
		if (!parentDeedTitle.trim() || !activeChild) return;
		const deedTitle = parentDeedTitle.trim();
		const newDeed = {
			id: `gd_parent_${Date.now()}`,
			title: deedTitle,
			description: "Directly verified and awarded by Parent in Parent Hub.",
			childReportedAt: "Verified Today by Parent",
			parentConfirmed: true
		};
		const draftChild = {
			...activeChild,
			stars: activeChild.stars + 10,
			pillarProgress: {
				...activeChild.pillarProgress,
				akhlaqDeeds: activeChild.pillarProgress.akhlaqDeeds + 1
			},
			goodDeeds: [newDeed, ...activeChild.goodDeeds],
			recentActivities: [{
				id: `act_p_${Date.now()}`,
				title: `Parent Verified: ${deedTitle}`,
				pillar: "family",
				timestamp: "Just now"
			}, ...activeChild.recentActivities.slice(0, 9)]
		};
		const badgeEval = evaluateChildBadgesAndMilestones(draftChild);
		updateChildProfile(activeChild.id, {
			...draftChild,
			earnedBadgeIds: badgeEval.earnedBadgeIds,
			unlockedAdventureNode: badgeEval.unlockedAdventureNode
		});
		logLearningEvent("lesson_completed", `kids_deed_parent_${newDeed.id}`, `Parent Awarded Good Deed: ${deedTitle}`, "kids", activeChild.id);
		setParentDeedTitle("");
		setDeedAwardedToast(true);
		setTimeout(() => setDeedAwardedToast(false), 3e3);
	};
	const handleDownloadBackup = () => {
		const json = exportAllDataJson();
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `ilmizo-family-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};
	if (!unlocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-md mx-auto my-6 rounded-3xl bg-[var(--bg-surface)] text-[var(--text-primary)] p-6 sm:p-8 shadow-lg border border-[var(--border-subtle)] text-center space-y-5 relative transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: goBack,
						className: "min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[var(--bg-elevated)] hover:opacity-90 text-[var(--text-primary)] border border-[var(--border-subtle)] flex items-center justify-center transition active:scale-95",
						"aria-label": "Go Back",
						title: "Go Back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200/70 dark:border-emerald-700/40 text-[11px] font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" }), "Child-Safe Parental Gate"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoDisclosure, {
						label: "Security",
						sheetTitle: "Local Family Guardrail",
						sheetSubtitle: "Salted on-device PIN verification",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Parent PIN verification is a local family guardrail to prevent accidental child edits on this device; it is stored as a salted on-device hash and never exported in plain text." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Because Ilmizo is 100% local-first without cloud accounts, losing both your PIN and your single-use Recovery Code requires clearing local browser storage." })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F3826] to-[#14532D] text-amber-300 flex items-center justify-center mx-auto shadow-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-8 h-8" })
			}),
			!isParentPinConfigured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold text-[var(--text-primary)]",
						children: "First-Time Parent PIN Setup"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-[var(--text-secondary)] mt-1 leading-relaxed",
						children: "For your family’s security, Ilmizo does not use a default PIN. Choose a 4-digit Parent PIN and save your single-use Recovery Code to activate Parent Hub & Screen-Time controls."
					})]
				}), !pendingPinSetup ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: async (e) => {
						e.preventDefault();
						setPinUpdateFeedback(null);
						const res = await beginParentPinSetup("", firstTimePinInput);
						if (!res.ok) {
							setPinUpdateFeedback({
								ok: false,
								text: res.error || "Please enter a valid 4-digit PIN."
							});
							return;
						}
						setFirstTimeRecoveryConfirmed(false);
					},
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-bold text-[var(--text-secondary)] mb-1 text-center",
							children: "Choose Your 4-Digit Parent PIN"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							inputMode: "numeric",
							maxLength: 4,
							value: firstTimePinInput,
							onChange: (e) => setFirstTimePinInput(e.target.value.replace(/\D/g, "").slice(0, 4)),
							placeholder: "••••",
							className: "w-full text-center text-2xl tracking-[0.4em] font-bold rounded-2xl ilmizo-input py-3 tabular-nums"
						})] }),
						pinUpdateFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-rose-600 dark:text-rose-400 text-center",
							children: pinUpdateFeedback.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: firstTimePinInput.length !== 4,
							className: "w-full min-h-[48px] rounded-2xl bg-[#14532D] disabled:opacity-40 text-white font-bold text-xs hover:bg-emerald-800 transition shadow-sm",
							children: "Generate Recovery Code & Continue"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-amber-50 dark:bg-amber-500/15 border-2 border-amber-400 p-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold text-amber-950 dark:text-amber-200 uppercase tracking-wider",
							children: "Step 2: Save Your Single-Use Recovery Code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-[var(--bg-surface)] border border-amber-300 dark:border-amber-400/40 py-3 px-4 text-center font-mono text-lg font-extrabold tracking-wider text-[var(--text-primary)] select-all",
							children: pendingPinSetup.recoveryCode
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-amber-950 dark:text-amber-100 leading-relaxed",
							children: [
								"Your PIN is ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "not saved yet" }),
								". Write down this recovery code first. If you refresh or cancel before confirming, your PIN setup will be discarded."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: firstTimeRecoveryConfirmed,
								onChange: (e) => setFirstTimeRecoveryConfirmed(e.target.checked),
								className: "rounded border-amber-400 text-emerald-800"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I have saved this recovery code in a safe place" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									cancelPendingParentPinSetup();
									setFirstTimePinInput("");
									setFirstTimeRecoveryConfirmed(false);
								},
								className: "flex-1 min-h-[42px] py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-bold text-xs",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: !firstTimeRecoveryConfirmed,
								onClick: () => {
									if (confirmPendingParentPinSetup().ok) {
										setFirstTimePinInput("");
										setFirstTimeRecoveryConfirmed(false);
										setUnlocked(true);
									}
								},
								className: "flex-1 min-h-[42px] py-2.5 rounded-xl bg-[#14532D] disabled:opacity-40 text-white font-bold text-xs",
								children: "Confirm & Save PIN"
							})]
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold text-[var(--text-primary)]",
					children: "Parent Hub Security Gate"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-[var(--text-secondary)] mt-1 leading-relaxed",
					children: "Enter your 4-digit Parent PIN to manage up to 5 child profiles, verify real-world Good Deeds, and inspect authentic learning evidence."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: async (e) => {
						e.preventDefault();
						if (await verifyEnteredParentPin(pinInput)) {
							setUnlocked(true);
							setPinError(false);
							setPinInput("");
						} else setPinError(true);
					},
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							inputMode: "numeric",
							maxLength: 4,
							value: pinInput,
							onChange: (e) => {
								setPinInput(e.target.value);
								setPinError(false);
							},
							placeholder: "••••",
							className: "w-44 text-center text-2xl tracking-[0.4em] font-bold rounded-2xl ilmizo-input py-3.5 tabular-nums"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2 max-w-[240px] mx-auto",
							children: [
								[
									"1",
									"2",
									"3",
									"4",
									"5",
									"6",
									"7",
									"8",
									"9"
								].map((digit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setPinInput((prev) => prev.length < 4 ? prev + digit : prev);
										setPinError(false);
									},
									className: "h-12 rounded-xl bg-[var(--bg-elevated)] hover:border-emerald-600/40 border border-[var(--border-subtle)] font-bold text-sm text-[var(--text-primary)] active:scale-95 transition",
									children: digit
								}, digit)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setPinInput("");
										setPinError(false);
									},
									className: "h-12 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-700/40 font-bold text-xs text-rose-700 dark:text-rose-300",
									children: "Clear"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setPinInput((prev) => prev.length < 4 ? prev + "0" : prev);
										setPinError(false);
									},
									className: "h-12 rounded-xl bg-[var(--bg-elevated)] hover:border-emerald-600/40 border border-[var(--border-subtle)] font-bold text-sm text-[var(--text-primary)] active:scale-95 transition",
									children: "0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Backspace",
									onClick: () => {
										setPinInput((prev) => prev.slice(0, -1));
										setPinError(false);
									},
									className: "h-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-bold text-xs text-[var(--text-secondary)]",
									children: "⌫"
								})
							]
						}),
						pinError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-rose-600 dark:text-rose-400 font-semibold",
							children: "Incorrect PIN. Please try again or use your saved Recovery Code below."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: goBack,
								className: "flex-1 min-h-[48px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-semibold text-xs transition",
								children: "Go Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "flex-1 min-h-[48px] rounded-2xl bg-[#14532D] text-white font-bold text-xs hover:bg-emerald-800 transition shadow-sm",
								children: "Unlock Parent Hub"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-2 border-t border-[var(--divider)] space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setShowGateRecovery((v) => !v);
								setGateRecoveryStatus(null);
							},
							className: "text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline",
							children: showGateRecovery ? "Hide Recovery Code Reset" : "Forgot Parent PIN? Reset with Recovery Code"
						}),
						gateRecoveryStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `rounded-2xl p-3 text-xs font-semibold ${gateRecoveryStatus.ok ? "bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/40 text-emerald-900 dark:text-emerald-200" : "bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 text-rose-800 dark:text-rose-200"}`,
							children: gateRecoveryStatus.text
						}),
						showGateRecovery && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 text-left space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Single-Use Verified Recovery Code Reset" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-[var(--text-secondary)] leading-relaxed",
									children: [
										"Enter the recovery code (",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold",
											children: "ILMZ-XXXX-XXXX"
										}),
										") generated when you set up your Parent PIN. Each code is single-use."
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: gateRecoveryCode,
										onChange: (e) => setGateRecoveryCode(e.target.value.toUpperCase()),
										placeholder: "Recovery Code (ILMZ-XXXX-XXXX)",
										className: "w-full rounded-xl ilmizo-input px-3 py-2.5 text-xs font-mono font-bold"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										inputMode: "numeric",
										maxLength: 4,
										value: gateRecoveryNewPin,
										onChange: (e) => setGateRecoveryNewPin(e.target.value.replace(/\D/g, "").slice(0, 4)),
										placeholder: "New 4-Digit Parent PIN",
										className: "w-full rounded-xl ilmizo-input px-3 py-2.5 text-xs font-bold tracking-widest tabular-nums"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: async () => {
											const res = await resetParentPinWithRecoveryCodeAsync(gateRecoveryCode, gateRecoveryNewPin);
											if (!res.ok) {
												setGateRecoveryStatus({
													ok: false,
													text: res.error || "Recovery verification failed."
												});
												return;
											}
											setGateRecoveryStatus({
												ok: true,
												text: "Parent PIN reset! Your single-use recovery code has now been consumed. Enter your new 4-digit PIN above to unlock and generate a fresh recovery code."
											});
											setGateRecoveryCode("");
											setGateRecoveryNewPin("");
											setShowGateRecovery(false);
										},
										className: "w-full min-h-[44px] py-2.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs transition",
										children: "Verify Recovery Code & Reset PIN"
									})
								]
							})]
						})
					]
				})
			] })
		]
	});
	const unresolvedPractice = activeChild ? activeChild.needsPractice.filter((np) => !np.resolved) : [];
	const pendingDeeds = activeChild ? activeChild.goodDeeds.filter((d) => !d.parentConfirmed) : [];
	const confirmedDeeds = activeChild ? activeChild.goodDeeds.filter((d) => d.parentConfirmed) : [];
	const kidsQuizAttempts = quizAttempts.filter((q) => q.mode === "kids" && (!q.childId || q.childId === activeChild?.id));
	const completedQuestCount = activeChild ? Object.values(activeChild.questStepsCompleted).filter(Boolean).length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-gradient-to-br from-[#0F3826] via-[#14532D] to-emerald-900 p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4 border border-amber-400/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: goBack,
						className: "min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition active:scale-95",
						"aria-label": "Go Back",
						title: "Go Back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-bold",
							children: "Parent Hub & Family Tarbiyah"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncStatusBadge, {})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-emerald-200 mt-0.5",
						children: [childrenProfiles.length, " / 5 Child Profiles Active · Zero Child Ad-Tracking · Real Recorded Evidence Only"]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setUnlocked(false),
						className: "px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs min-h-[44px] flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lock Gate" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMode("kids"),
						className: "px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs min-h-[44px] shadow-sm transition",
						children: [
							"Launch Kids World (",
							activeChild?.name,
							") →"
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tablist",
				"aria-label": "Parent Hub Sections",
				className: "grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xs",
				children: [
					{
						id: "overview",
						label: "Overview",
						badge: pendingDeeds.length > 0 ? String(pendingDeeds.length) : void 0
					},
					{
						id: "profiles",
						label: "Profiles",
						badge: `${childrenProfiles.length}/5`
					},
					{
						id: "safety",
						label: "Safety"
					}
				].map((tab) => {
					const isActive = activeParentTab === tab.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						"aria-selected": isActive,
						onClick: () => setActiveParentTab(tab.id),
						className: `min-h-[44px] rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${isActive ? "bg-[#14532D] text-white shadow-xs" : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label }), "badge" in tab && tab.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `px-1.5 py-0.5 rounded-md text-[11px] font-bold tabular-nums ${isActive ? "bg-amber-400 text-emerald-950" : "bg-[var(--bg-elevated)] text-[var(--text-secondary)]"}`,
							children: tab.badge
						})]
					}, tab.id);
				})
			}),
			activeParentTab !== "profiles" && childrenProfiles.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2 overflow-x-auto pb-0.5",
				children: childrenProfiles.map((child) => {
					const isSelected = child.id === activeChildId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveChildId(child.id),
						className: `min-h-[42px] px-3 py-1.5 rounded-2xl border text-xs font-bold flex items-center gap-2 shrink-0 transition ${isSelected ? "bg-emerald-50 dark:bg-emerald-900/40 border-[#14532D] dark:border-amber-400 text-[#14532D] dark:text-amber-200" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)]"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
								character: child.avatar,
								size: "sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: child.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] opacity-75 tabular-nums",
								children: [child.stars, "★"]
							})
						]
					}, child.id);
				})
			}),
			activeParentTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(!user.lastBackupExportedAtIso || Date.now() - new Date(user.lastBackupExportedAtIso).getTime() > 6048e5) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-amber-50/90 dark:bg-amber-500/15 border border-amber-300/80 dark:border-amber-400/35 p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-10 h-10 rounded-2xl bg-amber-400/25 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-950 dark:text-amber-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs sm:text-sm font-extrabold text-amber-950 dark:text-amber-200",
								children: "Weekly Backup Recommended"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-2 py-0.5 rounded-full bg-[var(--bg-surface)] border border-amber-300/70 dark:border-amber-400/35 text-[11px] font-bold text-amber-900 dark:text-amber-200",
								children: user.lastBackupExportedAtIso ? `Last saved: ${new Date(user.lastBackupExportedAtIso).toLocaleDateString()}` : "Not backed up yet"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-amber-900/90 dark:text-amber-100/85 leading-relaxed max-w-xl",
							children: "Your family progress stays 100% private on this device. Save a quick backup copy anytime."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleDownloadBackup,
					className: "min-h-[42px] px-4 py-2 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Backup" })]
				})]
			}), activeChild && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeeklyProgressCard, {
				child: activeChild,
				onStatusMessage: (msg) => {
					setRestoreStatusMsg(msg);
					setRestoreToast(true);
					window.setTimeout(() => setRestoreToast(false), 3200);
				}
			})] }),
			activeParentTab === "profiles" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xs border border-[var(--border-subtle)] space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-base font-bold text-[var(--text-primary)] flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-5 h-5 text-emerald-700 dark:text-emerald-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Family Child Profiles (",
								childrenProfiles.length,
								" / 5)"
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-secondary)]",
							children: "Select a child card to view their detailed learning evidence, or edit/manage profiles below."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/40 px-3 py-1 rounded-full",
							children: ["Active Child: ", activeChild?.name]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-4",
						children: childrenProfiles.map((child) => {
							const isSelected = child.id === activeChildId;
							const childPendingDeeds = child.goodDeeds.filter((d) => !d.parentConfirmed);
							const childUnresolved = child.needsPractice.filter((np) => !np.resolved);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setActiveChildId(child.id),
								className: `cursor-pointer rounded-2xl p-4 border-2 transition space-y-3 ${isSelected ? "border-emerald-700 dark:border-emerald-400 bg-emerald-50/40 dark:bg-emerald-900/25 shadow-sm" : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-emerald-600/50"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
												character: child.avatar,
												size: "md"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 flex-wrap",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "text-base font-bold text-[var(--text-primary)]",
															children: child.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs font-medium text-[var(--text-secondary)]",
															children: ["Age ", child.age]
														}),
														isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] font-bold text-emerald-950 bg-amber-300 px-2 py-0.5 rounded-md",
															children: "Selected"
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-emerald-800 dark:text-emerald-300 font-semibold tabular-nums mt-0.5",
													children: [
														child.stars,
														" ★ · ",
														child.streakDays,
														"-Day Streak · ",
														child.activeMinutesToday,
														"/",
														child.dailyGoalMinutes,
														"m goal"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-[var(--text-muted)] mt-0.5",
													children: ["Companion Mascot: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-[var(--text-primary)]",
														children: child.avatar
													})]
												})
											] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											onClick: (e) => e.stopPropagation(),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: (e) => startEditingChild(child, e),
												className: "p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition",
												title: `Edit ${child.name}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-3.5 h-3.5" })
											}), childrenProfiles.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: confirmDeleteId === child.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-700/40 rounded-xl px-2 py-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														deleteChildProfile(child.id);
														setConfirmDeleteId(null);
													},
													className: "text-xs font-bold text-rose-700 dark:text-rose-300 hover:underline px-1",
													children: "Delete"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setConfirmDeleteId(null),
													className: "text-xs text-[var(--text-muted)] px-1",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3 h-3" })
												})]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setConfirmDeleteId(child.id),
												className: "p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition",
												title: `Remove ${child.name}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
											}) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-4 gap-2 text-center pt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl bg-[var(--bg-surface)] p-2 border border-[var(--border-subtle)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-bold text-emerald-800 dark:text-emerald-300 tabular-nums",
													children: child.pillarProgress.quranLessons
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-[var(--text-muted)]",
													children: "Quran"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl bg-[var(--bg-surface)] p-2 border border-[var(--border-subtle)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-bold text-emerald-800 dark:text-emerald-300 tabular-nums",
													children: child.pillarProgress.duasPracticed
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-[var(--text-muted)]",
													children: "Duas"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl bg-[var(--bg-surface)] p-2 border border-[var(--border-subtle)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-bold text-emerald-800 dark:text-emerald-300 tabular-nums",
													children: child.pillarProgress.salahLessons
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-[var(--text-muted)]",
													children: "Salah"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl bg-[var(--bg-surface)] p-2 border border-[var(--border-subtle)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-bold text-emerald-800 dark:text-emerald-300 tabular-nums",
													children: child.pillarProgress.akhlaqDeeds
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-[var(--text-muted)]",
													children: "Akhlaq"
												})]
											})
										]
									}),
									(childPendingDeeds.length > 0 || childUnresolved.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2 pt-1",
										children: [childPendingDeeds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-950 dark:text-amber-200 text-xs font-bold",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3 text-amber-700 dark:text-amber-300" }),
												childPendingDeeds.length,
												" Good Deed",
												childPendingDeeds.length > 1 ? "s" : "",
												" to Confirm"
											]
										}), childUnresolved.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 text-rose-800 dark:text-rose-200 text-xs font-semibold",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-3 h-3 text-rose-600 dark:text-rose-400" }),
												childUnresolved.length,
												" Needs Practice"
											]
										})]
									})
								]
							}, child.id);
						})
					}),
					editingChildId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveChildEdit,
						className: "rounded-2xl bg-[var(--bg-elevated)] p-4 border-2 border-emerald-700/40 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]",
									children: "Editing Child Profile"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEditingChildId(null),
									className: "text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold",
									children: "Cancel"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-4 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-[var(--text-secondary)] mb-1",
										children: "Child Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: editName,
										onChange: (e) => setEditName(e.target.value),
										className: "w-full rounded-xl ilmizo-input px-3 py-2 text-xs font-semibold",
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-[var(--text-secondary)] mb-1",
										children: "Age"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
										title: "Select Child Age",
										ariaLabel: "Child age",
										variant: "compact",
										className: "w-full",
										value: String(editAge),
										onChange: (val) => setEditAge(Number(val)),
										options: [
											4,
											5,
											6,
											7,
											8,
											9,
											10,
											11,
											12,
											13
										].map((a) => ({
											value: String(a),
											label: `Age ${a}`
										}))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-[var(--text-secondary)] mb-1",
										children: "Companion Mascot"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
										title: "Choose Companion Guide",
										ariaLabel: "Companion mascot",
										variant: "compact",
										className: "w-full",
										value: editAvatar,
										onChange: (val) => setEditAvatar(val),
										options: [
											{
												value: "Ayaan",
												label: "Ayaan",
												subtitle: "Boy Guide"
											},
											{
												value: "Ayla",
												label: "Ayla",
												subtitle: "Girl Guide"
											},
											{
												value: "Mizo",
												label: "Mizo",
												subtitle: "Star Companion"
											}
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-[var(--text-secondary)] mb-1",
										children: "Daily Goal"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
										title: "Daily Learning Goal",
										ariaLabel: "Daily learning goal",
										variant: "compact",
										className: "w-full",
										value: String(editDailyGoal),
										onChange: (val) => setEditDailyGoal(Number(val)),
										options: [
											{
												value: "5",
												label: "5 mins / day"
											},
											{
												value: "10",
												label: "10 mins / day",
												badge: "Recommended"
											},
											{
												value: "15",
												label: "15 mins / day"
											},
											{
												value: "20",
												label: "20 mins / day"
											}
										]
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 rounded-xl bg-[#14532D] text-white font-bold text-xs min-h-[42px]",
									children: "Save Profile Changes"
								})
							})
						]
					}),
					childrenProfiles.length < 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!newChildName.trim()) return;
							if (!canAccessChildSlot(user, childrenProfiles.length)) {
								setPaywallReason("Your Free plan supports 1 new child profile. Upgrade to Family Plus (₹199/yr · 7-Day Free Trial) to manage up to 5 children independently.");
								setPaywallOpen(true);
								return;
							}
							addChildProfile(newChildName.trim(), newChildAge, newChildAvatar, newChildGoal);
							setNewChildName("");
						},
						className: "rounded-2xl bg-[var(--bg-elevated)] p-4 border border-[var(--border-subtle)] flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: newChildName,
								onChange: (e) => setNewChildName(e.target.value),
								placeholder: "Add child name (up to 5 children)...",
								className: "flex-1 min-w-[180px] rounded-xl ilmizo-input px-3.5 py-2.5 text-xs font-medium"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
								title: "Select Child Age",
								ariaLabel: "New child age",
								variant: "compact",
								value: String(newChildAge),
								onChange: (val) => setNewChildAge(Number(val)),
								options: [
									4,
									5,
									6,
									7,
									8,
									9,
									10,
									11,
									12,
									13
								].map((a) => ({
									value: String(a),
									label: `Age ${a}`
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
								title: "Choose Companion Guide",
								ariaLabel: "New child mascot",
								variant: "compact",
								value: newChildAvatar,
								onChange: (val) => setNewChildAvatar(val),
								options: [
									{
										value: "Ayaan",
										label: "Mascot: Ayaan",
										subtitle: "Boy Guide"
									},
									{
										value: "Ayla",
										label: "Mascot: Ayla",
										subtitle: "Girl Guide"
									},
									{
										value: "Mizo",
										label: "Mascot: Mizo",
										subtitle: "Star Companion"
									}
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
								title: "Daily Learning Goal",
								ariaLabel: "New child daily goal",
								variant: "compact",
								value: String(newChildGoal),
								onChange: (val) => setNewChildGoal(Number(val)),
								options: [
									{
										value: "10",
										label: "Goal: 10m/day",
										badge: "Recommended"
									},
									{
										value: "15",
										label: "Goal: 15m/day"
									},
									{
										value: "20",
										label: "Goal: 20m/day"
									}
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "px-4 py-2.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 min-h-[42px] transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Add Child (",
									childrenProfiles.length,
									"/5)"
								] })]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-amber-50/70 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/35 p-3 text-xs text-amber-950 dark:text-amber-200 font-medium flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Maximum of 5 child profiles reached for this Family account." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold",
							children: "5 / 5 Active"
						})]
					})
				]
			}),
			activeParentTab === "overview" && activeChild && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xs border border-[var(--border-subtle)] space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
									character: activeChild.avatar,
									size: "md"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-base font-bold text-[var(--text-primary)]",
									children: [activeChild.name, "’s Learning Evidence"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[var(--text-secondary)]",
									children: "Learn → Practice → Demonstrate → Review Loop"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									updateChildProfile(activeChild.id, { questStepsCompleted: {
										quran: false,
										dua: false,
										quiz: false,
										salah: false,
										family: false
									} });
								},
								className: "px-3 py-1.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-semibold text-xs flex items-center gap-1",
								title: "Reset today's 5 quest steps for a fresh daily loop",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset Quest" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[var(--bg-elevated)] p-4 border border-[var(--border-subtle)] space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-[var(--text-primary)]",
									children: "Today’s 10-Minute Mission"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-emerald-700 dark:text-emerald-300 tabular-nums",
									children: [completedQuestCount, " / 5 Completed"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-5 gap-2",
								children: [
									{
										key: "quran",
										label: "Quran"
									},
									{
										key: "dua",
										label: "Dua"
									},
									{
										key: "quiz",
										label: "Quiz"
									},
									{
										key: "salah",
										label: "Salah"
									},
									{
										key: "family",
										label: "Family"
									}
								].map((step) => {
									const done = activeChild.questStepsCompleted[step.key];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `rounded-xl p-2 text-center border text-[11px] font-bold ${done ? "bg-emerald-100/80 dark:bg-emerald-900/50 border-emerald-400 dark:border-emerald-600/60 text-emerald-950 dark:text-emerald-100" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)]"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: step.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] mt-0.5",
											children: done ? "✓ Done" : "Pending"
										})]
									}, step.key);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]",
								children: [
									"Completed Surahs (",
									activeChild.completedSurahs.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: activeChild.completedSurahs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/40 text-emerald-900 dark:text-emerald-200 font-semibold text-xs flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-3 h-3 text-emerald-700 dark:text-emerald-300" }), s]
								}, s))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]",
									children: [
										"Needs Practice Queue (",
										unresolvedPractice.length,
										")"
									]
								}), unresolvedPractice.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-rose-700 dark:text-rose-300 font-semibold",
									children: "Flagged during recitation or quiz"
								})]
							}), unresolvedPractice.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/25 border border-emerald-200 dark:border-emerald-700/40 p-4 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-700 dark:text-emerald-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"All clear! ",
									activeChild.name,
									" has reviewed all flagged ayahs and quiz questions."
								] })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2.5",
								children: unresolvedPractice.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-700/40 p-3.5 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200",
												children: item.pillar
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-xs font-bold text-[var(--text-primary)] mt-1",
												children: item.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[var(--text-secondary)] mt-0.5",
												children: item.prompt
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-semibold text-[var(--text-muted)] shrink-0",
											children: item.lastAttemptAt
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												setKidsRoute(item.targetRoute);
												setMode("kids");
											},
											className: "min-h-[36px] px-3 py-1.5 rounded-xl bg-[#14532D] text-white font-bold text-xs flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Practice Together" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => resolveNeedsPracticeItem(item.id),
											className: "min-h-[36px] px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold text-xs",
											children: "Mark Reviewed (+5 ★)"
										})]
									})]
								}, item.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]",
									children: "Recent Recorded Activities"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "divide-y divide-[var(--divider)] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] overflow-hidden",
									children: activeChild.recentActivities.slice(0, 5).map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "px-3.5 py-2.5 flex items-center justify-between text-xs gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-[var(--text-primary)] truncate",
													children: act.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] uppercase px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] font-bold shrink-0",
													children: act.pillar
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-[var(--text-muted)] shrink-0",
											children: act.timestamp
										})]
									}, act.id))
								}),
								kidsQuizAttempts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-bold text-[var(--text-secondary)] mb-1.5",
										children: [
											"Latest Quiz Scores (",
											kidsQuizAttempts.length,
											" recorded):"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: kidsQuizAttempts.slice(0, 4).map((qa) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-400/35 text-amber-950 dark:text-amber-200 text-xs font-bold tabular-nums",
											children: [
												qa.quizTitle,
												": ",
												qa.score,
												"/",
												qa.total
											]
										}, qa.id))
									})]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xs border border-[var(--border-subtle)] space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-base font-bold text-[var(--text-primary)] flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-5 h-5 text-rose-600 dark:text-rose-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Akhlaq & Real-World Good Deeds (",
									activeChild.name,
									")"
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--text-secondary)]",
								children: "Confirm self-reported deeds or award bonus stars for kindness at home."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-950 dark:text-amber-200 font-bold text-xs tabular-nums shrink-0",
								children: [activeChild.pillarProgress.akhlaqDeeds, " Verified"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300",
								children: [
									"Awaiting Parent Verification (",
									pendingDeeds.length,
									")"
								]
							}), pendingDeeds.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 text-xs text-[var(--text-secondary)]",
								children: [
									"No unconfirmed deeds waiting in ",
									activeChild.name,
									"’s queue right now."
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2.5",
								children: pendingDeeds.map((deed) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-amber-50/90 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-400/35 p-4 flex flex-wrap items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-0.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold text-[var(--text-primary)]",
												children: deed.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[var(--text-secondary)]",
												children: deed.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-amber-800 dark:text-amber-300 font-semibold",
												children: deed.childReportedAt
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => confirmChildGoodDeed(activeChild.id, deed.id),
										className: "min-h-[40px] px-3.5 py-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs shrink-0 shadow-xs transition",
										children: "Confirm & Award +10 ★"
									})]
								}, deed.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleAwardParentDeed,
							className: "rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/40 p-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-xs font-bold text-[var(--text-primary)]",
									children: ["Award a Verified Good Deed to ", activeChild.name]
								}), deedAwardedToast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-emerald-700 dark:text-emerald-300",
									children: "+10 Stars Awarded MashaAllah! ✓"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: parentDeedTitle,
									onChange: (e) => setParentDeedTitle(e.target.value),
									placeholder: "e.g., Prayed Maghrib with family, Helped younger sibling...",
									className: "flex-1 min-w-[200px] rounded-xl ilmizo-input px-3 py-2 text-xs font-medium"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 rounded-xl bg-[#14532D] text-white font-bold text-xs min-h-[40px]",
									children: "Award +10 ★"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]",
								children: [
									"Confirmed Good Deeds Log (",
									confirmedDeeds.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 max-h-48 overflow-y-auto pr-1",
								children: confirmedDeeds.map((deed) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 flex items-center justify-between gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-[var(--text-primary)]",
										children: deed.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[var(--text-secondary)]",
										children: deed.description
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 font-bold text-[11px] shrink-0",
										children: "Verified ✓"
									})]
								}, deed.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]",
								children: [
									"Earned Badges (",
									activeChild.earnedBadgeIds.length,
									" / ",
									KIDS_BADGES_CATALOG.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: KIDS_BADGES_CATALOG.map((badge) => {
									const earned = activeChild.earnedBadgeIds.includes(badge.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `px-2.5 py-1 rounded-xl text-xs font-bold border ${earned ? "bg-amber-50 dark:bg-amber-500/20 border-amber-300 dark:border-amber-400/40 text-amber-950 dark:text-amber-200" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]"}`,
										children: [
											badge.icon,
											" ",
											badge.title
										]
									}, badge.id);
								})
							})]
						})
					]
				})]
			}),
			activeParentTab === "safety" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					activeChild && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-5 sm:p-6 shadow-xs space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-base font-bold text-[var(--text-primary)] flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-5 h-5 text-emerald-700 dark:text-emerald-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Kids World Screen-Time Enforcement (",
										activeChild.name,
										")"
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[var(--text-secondary)] mt-0.5",
									children: "Tracks real foreground active time in Kids World and locks Kids World when the daily limit is reached."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoDisclosure, {
										label: "Browser Scope",
										sheetTitle: "Screen-Time Enforcement Scope",
										sheetSubtitle: "How web/PWA locking works alongside OS controls",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ilmizo tracks foreground usage and locks Kids World inside this browser/PWA across refreshes and internal navigation, pausing automatically when the tab/app is hidden." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Because web applications cannot lock the operating system or prevent switching to other apps, combine this with Apple Screen Time (iOS) or Google Family Link (Android) for OS-level enforcement." })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `px-3 py-1 rounded-full text-xs font-extrabold ${isKidsScreenTimeLocked ? "bg-rose-100 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-700/40 text-rose-900 dark:text-rose-200" : "bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-700/40 text-emerald-900 dark:text-emerald-200"}`,
										children: isKidsScreenTimeLocked ? "Locked" : "Within Limit"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-3 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-bold text-[var(--text-muted)] uppercase",
												children: "Foreground Usage Today"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xl font-extrabold text-[var(--text-primary)] tabular-nums",
												children: [
													Math.floor((activeChild.activeSecondsToday ?? activeChild.activeMinutesToday * 60) / 60),
													"m",
													" ",
													(activeChild.activeSecondsToday ?? activeChild.activeMinutesToday * 60) % 60,
													"s",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs font-bold text-[var(--text-muted)]",
														children: [
															"/ ",
															activeChild.dailyGoalMinutes + (activeChild.extraMinutesGrantedToday || 0),
															"m limit"
														]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-[var(--text-secondary)]",
												children: [
													"Base limit: ",
													activeChild.dailyGoalMinutes,
													"m",
													activeChild.extraMinutesGrantedToday ? ` (+${activeChild.extraMinutesGrantedToday}m bonus today)` : ""
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] font-bold text-[var(--text-muted)] uppercase",
											children: "Daily Screen-Time Limit"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-1.5",
											children: [
												5,
												10,
												15,
												20,
												30,
												45
											].map((mins) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => updateChildProfile(activeChild.id, { dailyGoalMinutes: mins }),
												className: `px-2.5 py-1.5 rounded-xl text-xs font-bold transition ${activeChild.dailyGoalMinutes === mins ? "bg-[#14532D] text-white" : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)]"}`,
												children: [mins, "m"]
											}, mins))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-bold text-[var(--text-muted)] uppercase",
												children: "Local Daily Reset Time"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
												title: "Daily Screen-Time Reset Time",
												ariaLabel: "Local daily reset time",
												variant: "compact",
												className: "w-full",
												value: String(user.kidsDailyResetHour ?? 0),
												onChange: (val) => updateUser({ kidsDailyResetHour: Number(val) }),
												options: [
													{
														value: "0",
														label: "12:00 AM",
														subtitle: "Local Midnight"
													},
													{
														value: "4",
														label: "4:00 AM",
														subtitle: "Before Fajr"
													},
													{
														value: "5",
														label: "5:00 AM",
														subtitle: "Early Morning"
													},
													{
														value: "6",
														label: "6:00 AM",
														subtitle: "Sunrise"
													}
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 pt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => updateChildProfile(activeChild.id, { extraMinutesGrantedToday: (activeChild.extraMinutesGrantedToday || 0) + 10 }),
													className: "px-2.5 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-950 dark:text-emerald-200 text-xs font-bold",
													children: "+10m Today"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => updateChildProfile(activeChild.id, {
														activeSecondsToday: 0,
														activeMinutesToday: 0,
														extraMinutesGrantedToday: 0,
														screenTimeUnlockedForPeriodKey: void 0
													}),
													className: "px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-xs font-bold",
													children: "Reset Today’s Timer"
												})]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentTimeVoucherGeneratorCard, {
								childId: activeChild.id,
								childName: activeChild.name,
								signingKey: user.parentPinVerifier
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonCard, { lines: 4 }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalDataManagerCard, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-5 sm:p-6 shadow-xs space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-5 h-5 text-emerald-700 dark:text-emerald-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-bold text-[var(--text-primary)]",
										children: "Parent PIN & Local Recovery Code Security"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `px-3 py-1 rounded-full text-xs font-bold ${user.parentPinRecoveryHash ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700/40" : "bg-amber-100 dark:bg-amber-500/20 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-400/35"}`,
									children: user.parentPinRecoveryHash ? "Recovery Code Configured ✓" : "No Recovery Code Saved Yet"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-[var(--text-secondary)] leading-relaxed",
								children: [
									"Your 4-digit Parent PIN is ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "never stored or exported in plain text" }),
									" (protected with salted on-device encryption). Updating your PIN creates a single-use recovery code (",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold",
										children: "ILMZ-XXXX-XXXX"
									}),
									") in pending state until confirmed."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: async (e) => {
									e.preventDefault();
									setPinUpdateFeedback(null);
									const res = await beginParentPinSetup(currentPinVerify, newPin);
									if (!res.ok) {
										setPinUpdateFeedback({
											ok: false,
											text: res.error || "Could not initiate Parent PIN update."
										});
										return;
									}
									setCurrentPinVerify("");
									setNewPin("");
									setRecoverySavedConfirmed(false);
									setPinUpdateFeedback({
										ok: true,
										text: "Pending Recovery Code generated below! Your previous PIN remains active until you check the box and click \"Confirm & Save PIN + Recovery Code\"."
									});
								},
								className: "grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[var(--text-secondary)] mb-1",
										children: "Current 4-Digit PIN"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										inputMode: "numeric",
										maxLength: 4,
										value: currentPinVerify,
										onChange: (e) => setCurrentPinVerify(e.target.value.replace(/\D/g, "").slice(0, 4)),
										placeholder: "••••",
										className: "w-full rounded-xl ilmizo-input px-3 py-2.5 text-xs font-bold tracking-widest tabular-nums"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[var(--text-secondary)] mb-1",
										children: "New 4-Digit PIN"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										inputMode: "numeric",
										maxLength: 4,
										value: newPin,
										onChange: (e) => setNewPin(e.target.value.replace(/\D/g, "").slice(0, 4)),
										placeholder: "New 4-digit PIN",
										className: "w-full rounded-xl ilmizo-input px-3 py-2.5 text-xs font-bold tracking-widest tabular-nums"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: currentPinVerify.length !== 4 || newPin.length !== 4,
											className: "flex-1 px-4 py-2.5 rounded-xl bg-[#14532D] disabled:opacity-40 text-white font-bold text-xs min-h-[42px]",
											children: "Update PIN"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: currentPinVerify.length !== 4,
											onClick: async () => {
												setPinUpdateFeedback(null);
												const res = await beginRecoveryCodeRegeneration(currentPinVerify);
												if (!res.ok) {
													setPinUpdateFeedback({
														ok: false,
														text: res.error || "Enter your current 4-digit PIN first."
													});
													return;
												}
												setCurrentPinVerify("");
												setRecoverySavedConfirmed(false);
												setPinUpdateFeedback({
													ok: true,
													text: "Pending Recovery Code generated below! Your previous recovery code remains active until you confirm and save."
												});
											},
											className: "px-3.5 py-2.5 rounded-xl bg-amber-100 dark:bg-amber-500/20 disabled:opacity-40 text-amber-950 dark:text-amber-200 font-bold text-xs min-h-[42px]",
											children: "New Recovery Code"
										})]
									})
								]
							}),
							pinUpdateFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `rounded-2xl p-3 text-xs font-bold ${pinUpdateFeedback.ok ? "bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/40 text-emerald-900 dark:text-emerald-200" : "bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 text-rose-800 dark:text-rose-200"}`,
								children: pinUpdateFeedback.text
							}),
							pendingPinSetup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-amber-50 dark:bg-amber-500/15 border-2 border-amber-400 p-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-amber-950 dark:text-amber-200 uppercase tracking-wider",
											children: "Pending Confirmation — Save Recovery Code Before Committing"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2.5 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-500/30 text-amber-950 dark:text-amber-100 text-[11px] font-bold",
											children: "Single-Use · Encrypted"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-xl bg-[var(--bg-surface)] border border-amber-300 dark:border-amber-400/40 py-3 px-4 text-center font-mono text-lg font-extrabold tracking-wider text-[var(--text-primary)] select-all",
										children: pendingPinSetup.recoveryCode
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-amber-950 dark:text-amber-100 leading-relaxed",
										children: [
											"Write this recovery code down or store it in your password manager. ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Nothing has been overwritten in storage yet" }),
											" — if you refresh or cancel now, your previous PIN remains unchanged."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: recoverySavedConfirmed,
											onChange: (e) => setRecoverySavedConfirmed(e.target.checked),
											className: "rounded border-amber-400 text-emerald-800"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I have saved this recovery code in a safe place" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												cancelPendingParentPinSetup();
												setRecoverySavedConfirmed(false);
												setPinUpdateFeedback({
													ok: false,
													text: "Pending PIN / Recovery Code update discarded. Previous security settings preserved."
												});
											},
											className: "min-h-[40px] px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-bold text-xs",
											children: "Cancel & Discard"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: !recoverySavedConfirmed,
											onClick: () => {
												if (confirmPendingParentPinSetup().ok) {
													setRecoverySavedConfirmed(false);
													setPinUpdateFeedback({
														ok: true,
														text: "Confirmed & saved! Your new Parent PIN verifier and single-use Recovery Code hash are now active on this device."
													});
												}
											},
											className: "min-h-[40px] px-4 py-2 rounded-xl bg-[#14532D] disabled:opacity-40 text-white font-bold text-xs",
											children: "Confirm & Save PIN + Recovery Code"
										})]
									})
								]
							})
						]
					})
				]
			}),
			activeParentTab === "profiles" && (() => {
				const effectiveTier = getEffectiveEntitlement(user);
				const trial = getTrialStatus(user);
				const familyUnlocked = isFamilyPlusActive(user);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xs border border-[var(--border-subtle)] space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300",
									children: trial.isTrialActive ? `7-Day Free Trial Active · ${trial.daysRemaining} day(s) left` : familyUnlocked ? "Family Plus Unlocked · Ad-Free" : "Free Core Plan · Upgrade for ~₹16 / month"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-[var(--text-primary)] mt-0.5",
									children: "Membership Plans & Google Play Billing"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[var(--text-secondary)] mt-0.5",
									children: "Core 114-Surah Quran, Salah/Wudu guides, Duas, Qibla, and Tasbih are always 100% Free Forever."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [!familyUnlocked && !trial.hasUsedTrial && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										updateUser(startLocalSevenDayTrialPatch());
										playGentleCelebrationChime("lesson_complete");
										setRestoreStatusMsg("7-Day Free Family Plus Trial activated!");
										setRestoreToast(true);
										window.setTimeout(() => setRestoreToast(false), 3500);
									},
									className: "px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold min-h-[40px] shadow-xs transition",
									children: "Start 7-Day Free Trial"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										attemptPlayStoreRestore(user).then((res) => {
											if (res.patch) updateUser(res.patch);
											setRestoreStatusMsg(res.message);
											setRestoreToast(true);
											window.setTimeout(() => setRestoreToast(false), 3500);
										});
									},
									className: "px-3.5 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-bold min-h-[40px]",
									children: restoreToast ? "Verified ✓" : "Restore Purchases"
								})]
							})]
						}),
						restoreStatusMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/40 px-3.5 py-2 text-xs font-bold text-emerald-950 dark:text-emerald-200",
							children: restoreStatusMsg
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
							children: ILMIZO_PLAN_CATALOG.map((tier) => {
								const active = effectiveTier === tier.id;
								const isBest = tier.id === "family_199";
								const title = resolvePlanText(tier.title, user.language);
								const tagline = resolvePlanText(tier.tagline, user.language);
								const features = resolvePlanText(tier.features, user.language);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `rounded-2xl p-4 border-2 flex flex-col justify-between space-y-3 transition ${active ? "border-emerald-700 dark:border-emerald-400 bg-emerald-50/40 dark:bg-emerald-900/25" : isBest ? "border-amber-400 bg-[var(--bg-elevated)]" : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300 tabular-nums",
												children: tier.monthlyEquivalentLabel
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-bold text-[var(--text-primary)]",
												children: title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xl font-extrabold text-[var(--text-primary)] tabular-nums",
												children: tier.priceInrLabel
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[var(--text-secondary)] leading-snug",
												children: tagline
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "space-y-1.5 pt-2 border-t border-[var(--divider)] text-xs text-[var(--text-secondary)]",
												children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-start gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
												}, f))
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											if (tier.id === "free") {
												updateUser({
													entitlement: "free",
													subscriptionPurchaseSource: "none"
												});
												return;
											}
											setPaywallReason(void 0);
											setPaywallOpen(true);
										},
										className: `w-full py-2.5 rounded-xl text-xs font-bold transition min-h-[42px] ${active ? "bg-emerald-900 text-white" : isBest ? "bg-[#14532D] hover:bg-emerald-800 text-white" : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)]"}`,
										children: active ? trial.isTrialActive && tier.id === "family_199" ? `Trial Active (${trial.daysRemaining}d)` : "Active Plan ✓" : tier.id === "free" ? "Use Free Core" : "Unlock / Manage Plan →"
									})]
								}, tier.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-muted)] leading-relaxed",
							children: billingEnvLabel
						})
					]
				});
			})(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyPlusPaywallModal, {
				open: paywallOpen,
				onClose: () => setPaywallOpen(false),
				triggerReason: paywallReason,
				skipParentGate: true,
				onUnlocked: (msg) => {
					setRestoreStatusMsg(msg);
					setRestoreToast(true);
				}
			})
		]
	});
};
var ParentTimeVoucherGeneratorCard = ({ childId, childName, signingKey }) => {
	const [selectedAction, setSelectedAction] = (0, import_react.useState)("grant_10m");
	const [generatedCode, setGeneratedCode] = (0, import_react.useState)(null);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleGenerate = async () => {
		setErrorMsg(null);
		setCopied(false);
		const res = await issueParentTimeVoucher({
			action: selectedAction,
			childId,
			signingKey
		});
		if (!res.ok || !res.code) {
			setGeneratedCode(null);
			setErrorMsg(res.error || "Could not generate Parent Time Voucher.");
			return;
		}
		setGeneratedCode(res.code);
	};
	const handleCopy = async () => {
		if (!generatedCode) return;
		try {
			await navigator.clipboard.writeText(generatedCode);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2e3);
		} catch {
			setCopied(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-amber-50/70 dark:bg-amber-500/15 border border-amber-300/70 dark:border-amber-400/35 p-4 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-4 h-4 text-amber-800 dark:text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-xs font-extrabold text-[var(--text-primary)]",
						children: ["Single-Use Offline Time Voucher for ", childName]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "px-2 py-0.5 rounded-full bg-amber-200/70 dark:bg-amber-500/30 text-amber-950 dark:text-amber-100 text-[11px] font-bold",
					children: "Zero-Cloud · Single-Use"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-[var(--text-secondary)] leading-relaxed",
				children: [
					"Generate a cryptographically tagged one-time code (",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono font-bold",
						children: "ILMZ-..."
					}),
					") you can hand to ",
					childName,
					" to redeem on the Kids Lock Screen without sharing your 4-digit Parent PIN."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [[
					{
						id: "grant_10m",
						label: "+10 Mins"
					},
					{
						id: "grant_15m",
						label: "+15 Mins"
					},
					{
						id: "unlock_today",
						label: "Unlock Today"
					}
				].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setSelectedAction(opt.id);
						setGeneratedCode(null);
						setErrorMsg(null);
					},
					className: `px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedAction === opt.id ? "bg-[#14532D] text-white shadow-2xs" : "bg-[var(--bg-surface)] border border-amber-300/70 dark:border-amber-400/35 text-[var(--text-primary)]"}`,
					children: opt.label
				}, opt.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleGenerate,
					className: "ml-auto min-h-[38px] px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold transition",
					children: "Generate Code"
				})]
			}),
			errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 px-3 py-2 text-xs font-bold text-rose-800 dark:text-rose-200 flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-3.5 h-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: errorMsg })]
			}),
			generatedCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-[var(--bg-surface)] border border-amber-300 dark:border-amber-400/40 p-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300",
					children: [
						"One-Time Code (Bound to ",
						childName,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-sm font-extrabold text-[var(--text-primary)] select-all",
					children: generatedCode
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleCopy,
					className: "px-3 py-1.5 rounded-lg bg-emerald-900 text-white text-xs font-bold flex items-center gap-1",
					children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copied ? "Copied ✓" : "Copy Code" })]
				})]
			})
		]
	});
};
export { ParentHubView };
