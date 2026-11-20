const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdultExtraScreens-JKsGDYrs.js","assets/rolldown-runtime-DQp2zzRu.js","assets/vendor-icons-DCckKQxi.js","assets/vendor-motion-DfqbQRzE.js","assets/data-islamic-content-DVwdNHPG.js","assets/vendor-capacitor-BtYYifC8.js","assets/index-Dy1fifCC.js","assets/vendor-react-CoNEUsWJ.js","assets/index-Bo1dxC-b.css","assets/FamilyPlusPaywallModal-B_X5oIMT.js","assets/storyVoiceRecorder-CtwnVwnJ.js","assets/studioAudioAndTajweedService-DF0oWwfx.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./rolldown-runtime-DQp2zzRu.js";
import { $ as Flame, At as Award, B as MapPin, C as ShieldCheck, Ct as CalendarDays, D as Search, E as Settings, Ft as require_react, I as Pause, J as Heart, L as Moon, M as Plus, Mt as ArrowRight, N as Play, Nt as ArrowLeft, O as RotateCcw, Ot as BellRing, Pt as ArrowDown, Q as GitBranch, S as Shuffle, T as Share2, Tt as BookOpen, U as LoaderCircle, V as Lock, W as ListMusic, Y as HardDrive, _ as Sparkles, _t as ChevronRight, a as VolumeX, b as SkipForward, bt as Check, c as User, d as Trash2, dt as Clock, et as FileText, g as Square, ht as CircleAlert, jt as ArrowUp, k as Repeat, kt as BatteryCharging, lt as Copy, m as Sun, mt as CircleCheck, nt as Eye, o as Volume2, ot as Download, rt as EyeOff, t as X, ut as Compass, v as Smartphone, vt as ChevronLeft, wt as Bookmark, x as SkipBack, xt as Car, y as SlidersHorizontal, z as Mic } from "./vendor-icons-DCckKQxi.js";
import { i as require_jsx_runtime, n as useReducedMotion, r as AnimatePresence, t as motion } from "./vendor-motion-DfqbQRzE.js";
import { $ as createEmptySalahDayRecord, B as saveCachedPrayerTimings, G as ALL_30_JUZ_BOUNDARIES, K as PRAYER_CALCULATION_METHODS, Q as computeSalahHistoricalSummary, at as resolveAyahIndexByNumber, b as getSurahOfflineAvailability, g as ALL_114_SURAHS, j as getCachedPrayerTimings, l as VERIFIED_DUAS, n as ISLAMIC_LESSONS, nt as getLocalDateKeyWithOffset, o as SALAH_STEPS, rt as parseHifzAyahRange, s as SEERAH_TIMELINE, t as ASMA_UL_HUSNA, u as WUDU_STEPS, w as resolveReciterConfig, x as getSurahPayload } from "./data-islamic-content-DVwdNHPG.js";
import { r as __vitePreload } from "./vendor-capacitor-BtYYifC8.js";
import { B as recordAiTajweedUsagePatch, D as canAccessWordByWordHifzStudio, N as canUseAiTajweedCheck, O as canAddCustomHifzPlan, Ot as searchOfflineQuran, R as isAdultPlusActive, St as useAudioPlaybackClock, _t as ScreenBackButton, at as formatRevisionReference, bt as audioManager, d as ThemeModeSegmentedControl, dt as triggerSelectionHaptic, et as AdultBottomNav, ft as triggerSuccessHaptic, gt as MobileStatusBar, i as InfoDisclosure, it as computeNextPrayerState, n as SleepTimerTriggerButton, nt as NextPrayerCard, o as ScreenSkeleton, ot as SelectSheetField, rt as QuickAccessPillars, st as BottomSheet, t as SleepTimerSheet, tt as AdultHomeHeroSection, u as SkeletonList, ut as triggerLightHaptic, v as useIlmizo, wt as audioDownloadManager, xt as useAudioManager, y as useTranslation, yt as VerifiedSourceFooter } from "./index-Dy1fifCC.js";
import { t as FamilyPlusPaywallModal } from "./FamilyPlusPaywallModal-B_X5oIMT.js";
import { C as syncNativePrayerWidget, c as QuranAdvancedAudioPlayerBar, d as WordByWordHifzRevealPanel, f as formatAyahTextForScript, g as ADULT_ROUTE_ORDER, h as useQuranScriptStyle, i as pickSupportedAudioMimeType, l as QuranJournalScreen, m as getArabicScriptFontClass, o as InteractiveTajweedAyahView, p as getActiveWordIndexAtProgress, s as NativeApkAndAzanNotificationStudio, u as SalahCompleteGuideAndExcusedPanel, v as useSwipeNavigation, y as useQuranAudioSync } from "./storyVoiceRecorder-CtwnVwnJ.js";
import { d as playHumanDuaAudio, p as resolveDuaHumanAudio, t as analyzeRecitationWithAiTajweed } from "./studioAudioAndTajweedService-DF0oWwfx.js";
// src/components/adult/OemBatteryGuardSheet.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var OEM_BATTERY_GUIDES = [
	{
		id: "xiaomi",
		brandLabel: "Xiaomi / Redmi / Poco",
		osName: "MIUI & HyperOS",
		severityNote: "Xiaomi aggressively stops background Adhan alarms after 2–3 days unless Autostart & No Restrictions are set.",
		steps: [
			{
				id: "mi_autostart",
				title: "Enable Background Autostart",
				path: "Settings → Apps → Manage Apps → Ilmizo → Autostart → Turn ON"
			},
			{
				id: "mi_battery",
				title: "Set Battery Saver to \"No Restrictions\"",
				path: "App Info → Battery Saver → Select \"No restrictions\" (not MIUI Battery Saver)"
			},
			{
				id: "mi_alarms",
				title: "Allow Exact Alarms & Lock-Screen Alerts",
				path: "App Info → Notifications → Enable Sound, Floating & Lock Screen Notifications"
			},
			{
				id: "mi_lock",
				title: "Lock Ilmizo in Recent Apps",
				path: "Open Recent Apps → Long-press Ilmizo card → Tap the Padlock icon"
			}
		]
	},
	{
		id: "samsung",
		brandLabel: "Samsung Galaxy",
		osName: "OneUI",
		severityNote: "Samsung Sleeping Apps puts unused apps to deep sleep and delays Fajr Adhan.",
		steps: [
			{
				id: "sam_battery",
				title: "Set Battery to Unrestricted",
				path: "Settings → Apps → Ilmizo → Battery → Select \"Unrestricted\""
			},
			{
				id: "sam_never_sleep",
				title: "Add Ilmizo to \"Never auto sleeping apps\"",
				path: "Settings → Battery → Background usage limits → Never auto sleeping apps → Add Ilmizo"
			},
			{
				id: "sam_exact",
				title: "Allow Alarms & Reminders",
				path: "Settings → Apps → Ilmizo → Alarms & reminders → Turn ON"
			}
		]
	},
	{
		id: "vivo",
		brandLabel: "Vivo / iQOO",
		osName: "Funtouch OS / OriginOS",
		severityNote: "Vivo stops scheduled Fajr alarms overnight unless High Background Power is allowed.",
		steps: [
			{
				id: "vivo_bg",
				title: "Allow High Background Power Consumption",
				path: "Settings → Battery → Background power consumption management → Ilmizo → Don’t restrict"
			},
			{
				id: "vivo_autostart",
				title: "Enable Autostart Permission",
				path: "iManager → App Manager → Autostart Manager → Enable Ilmizo"
			},
			{
				id: "vivo_lock",
				title: "Lock Ilmizo in Multitasking",
				path: "Recent Apps → Tap dropdown on Ilmizo → Tap \"Lock\""
			}
		]
	},
	{
		id: "oppo_realme",
		brandLabel: "Oppo / Realme",
		osName: "ColorOS / Realme UI",
		severityNote: "ColorOS freezes background wake-ups at night unless Auto-Launch is enabled.",
		steps: [
			{
				id: "oppo_auto",
				title: "Allow Auto-Launch & Background Activity",
				path: "Settings → Apps → App Management → Ilmizo → Battery Usage → Enable \"Allow background activity\" & \"Allow auto-launch\""
			},
			{
				id: "oppo_sleep",
				title: "Disable Sleep Standby Optimization",
				path: "Settings → Battery → More settings → Sleep standby optimization → Keep Ilmizo excluded"
			},
			{
				id: "oppo_lock",
				title: "Lock in Recent Tasks",
				path: "Recent Apps → Tap 3-dots on Ilmizo → Lock"
			}
		]
	},
	{
		id: "oneplus",
		brandLabel: "OnePlus",
		osName: "OxygenOS",
		severityNote: "OxygenOS deep optimization can delay Fajr & Maghrib notifications by 10–30 minutes.",
		steps: [{
			id: "op_battery",
			title: "Allow Background Activity & Auto-Launch",
			path: "Settings → Apps → Ilmizo → Battery usage → Allow foreground + background + auto-launch"
		}, {
			id: "op_alarm",
			title: "Allow Exact Alarms",
			path: "Settings → Apps → Special app access → Alarms & reminders → Ilmizo ON"
		}]
	},
	{
		id: "stock",
		brandLabel: "Pixel / Stock Android",
		osName: "Android 12–15",
		severityNote: "Ensure Android Exact Alarms and Unrestricted Battery are enabled for on-the-minute Adhan.",
		steps: [{
			id: "stock_battery",
			title: "Set App Battery Usage to Unrestricted",
			path: "Settings → Apps → Ilmizo → App battery usage → Unrestricted"
		}, {
			id: "stock_alarms",
			title: "Enable Alarms & Reminders",
			path: "Settings → Apps → Ilmizo → Alarms & reminders → Allow setting alarms and reminders"
		}]
	}
];
var STORAGE_KEY$2 = "ilmizo_oem_battery_guard_v1";
function loadGuardState() {
	if (typeof localStorage === "undefined") return {
		oemId: "xiaomi",
		checkedStepIds: []
	};
	try {
		const raw = localStorage.getItem(STORAGE_KEY$2);
		if (!raw) return {
			oemId: "xiaomi",
			checkedStepIds: []
		};
		const parsed = JSON.parse(raw);
		return {
			oemId: OEM_BATTERY_GUIDES.some((g) => g.id === parsed.oemId) ? parsed.oemId : "xiaomi",
			checkedStepIds: Array.isArray(parsed.checkedStepIds) ? parsed.checkedStepIds : []
		};
	} catch {
		return {
			oemId: "xiaomi",
			checkedStepIds: []
		};
	}
}
function playGentleAdhanTestChime() {
	if (typeof window === "undefined") return false;
	try {
		const AudioCtx = window.AudioContext || window.webkitAudioContext;
		if (!AudioCtx) return false;
		const ctx = new AudioCtx();
		[
			440,
			554.37,
			659.25,
			880
		].forEach((freq, i) => {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "sine";
			osc.frequency.value = freq;
			const start = ctx.currentTime + i * .16;
			gain.gain.setValueAtTime(.001, start);
			gain.gain.exponentialRampToValueAtTime(.14, start + .04);
			gain.gain.exponentialRampToValueAtTime(.001, start + .55);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start(start);
			osc.stop(start + .58);
		});
		return true;
	} catch {
		return false;
	}
}
var OemBatteryGuardSheet = ({ open, onClose, onToast }) => {
	const [state, setState] = (0, import_react.useState)(() => loadGuardState());
	const activeGuide = (0, import_react.useMemo)(() => OEM_BATTERY_GUIDES.find((g) => g.id === state.oemId) || OEM_BATTERY_GUIDES[0], [state.oemId]);
	const persist = (next) => {
		setState(next);
		try {
			localStorage.setItem(STORAGE_KEY$2, JSON.stringify(next));
		} catch {}
	};
	const completedInGuide = activeGuide.steps.filter((s) => state.checkedStepIds.includes(s.id)).length;
	const isProtected = completedInGuide === activeGuide.steps.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
		open,
		onClose,
		title: "Adhan Battery-Guard Wizard",
		subtitle: "Stop Xiaomi, Samsung, Vivo & Oppo from silencing Fajr & daily Adhan alarms.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-2xl p-3.5 border flex items-start gap-3 ${isProtected ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400/60" : "bg-amber-50 dark:bg-amber-500/10 border-amber-300/70"}`,
					children: [isProtected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatteryCharging, { className: "w-5 h-5 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold text-[var(--text-primary)]",
							children: isProtected ? `${activeGuide.brandLabel} Adhan Protection Active (${completedInGuide}/${activeGuide.steps.length})` : `Step-by-Step Fix for ${activeGuide.brandLabel} (${completedInGuide}/${activeGuide.steps.length})`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed",
							children: activeGuide.severityNote
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-extrabold text-[var(--text-secondary)] flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Select Your Phone Brand" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
						children: OEM_BATTERY_GUIDES.map((guide) => {
							const selected = guide.id === state.oemId;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									triggerSelectionHaptic();
									persist({
										...state,
										oemId: guide.id
									});
								},
								className: `min-h-[48px] px-3 py-2 rounded-2xl border text-left transition ${selected ? "bg-[#14532D] text-white border-[#D4AF37]" : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)]"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold truncate",
									children: guide.brandLabel
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-[11px] truncate ${selected ? "text-emerald-200" : "text-[var(--text-muted)]"}`,
									children: guide.osName
								})]
							}, guide.id);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: activeGuide.steps.map((step, idx) => {
						const done = state.checkedStepIds.includes(step.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								const nextIds = done ? state.checkedStepIds.filter((id) => id !== step.id) : [...state.checkedStepIds, step.id];
								if (!done) triggerSuccessHaptic();
								else triggerLightHaptic();
								persist({
									...state,
									checkedStepIds: nextIds
								});
							},
							className: `w-full rounded-2xl border p-3.5 text-left flex items-start gap-3 transition active:scale-[0.99] ${done ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400/70" : "bg-[var(--bg-surface)] border-[var(--border-subtle)]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 ${done ? "bg-[#14532D] border-[#14532D] text-white" : "border-slate-300 dark:border-emerald-700"}`,
								children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-black text-[var(--text-muted)]",
									children: idx + 1
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold text-[var(--text-primary)]",
									children: step.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed",
									children: step.path
								})]
							})]
						}, step.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2.5 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							triggerLightHaptic();
							const played = playGentleAdhanTestChime();
							onToast?.(played ? "Test Adhan chime played! Your device audio is ready." : "Ensure phone volume is unmuted to hear Adhan alerts.");
						},
						className: "min-h-[46px] rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 active:scale-95 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Test Adhan Sound" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							triggerSuccessHaptic();
							onClose();
						},
						className: "min-h-[46px] rounded-2xl bg-[#14532D] text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5 active:scale-95 transition",
						children: [isProtected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-amber-300" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, { className: "w-4 h-4 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isProtected ? "All Protected ✓" : "Save Progress" })]
					})]
				})
			]
		})
	});
};
// src/services/seniorModeService.ts
/**
* Senior / Minimal Mode Service (Local-First)
*
* Designed for elders, parents, and users who prefer a calm, ultra-readable,
* distraction-free 4-tile daily worship home screen with oversized 76px+ buttons
* (Read Quran, Prayer Times, Daily Duas, Tasbih Counter).
*/
var STORAGE_KEY$1 = "ilmizo_senior_minimal_mode_v1";
var SYNC_EVENT$1 = "ilmizo:senior-mode-updated";
function loadSeniorMinimalMode() {
	if (typeof localStorage === "undefined") return false;
	try {
		return localStorage.getItem(STORAGE_KEY$1) === "true";
	} catch {
		return false;
	}
}
function saveSeniorMinimalMode(enabled) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY$1, enabled ? "true" : "false");
		if (typeof window !== "undefined") window.dispatchEvent(new Event(SYNC_EVENT$1));
	} catch {}
}
function useSeniorMinimalMode() {
	const [enabled, setEnabledState] = (0, import_react.useState)(() => loadSeniorMinimalMode());
	(0, import_react.useEffect)(() => {
		const sync = () => setEnabledState(loadSeniorMinimalMode());
		window.addEventListener(SYNC_EVENT$1, sync);
		return () => window.removeEventListener(SYNC_EVENT$1, sync);
	}, []);
	return [enabled, (0, import_react.useCallback)((next) => {
		saveSeniorMinimalMode(next);
		setEnabledState(next);
	}, [])];
}
// src/components/feedback/AdultMicroInteractions.tsx
/**
* Calm tactile Salah completion button with subtle spring checkmark bloom & optional haptic.
*/
var SalahStatusButton = ({ active, label, activeClassName, inactiveClassName = "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-emerald-700/30", onClick, ariaLabel }) => {
	const prefersReducedMotion = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
		type: "button",
		"aria-label": ariaLabel || label,
		"aria-pressed": active,
		whileTap: prefersReducedMotion ? void 0 : { scale: .94 },
		transition: { duration: .12 },
		onClick: () => {
			if (!active) triggerSuccessHaptic();
			else triggerSelectionHaptic();
			onClick();
		},
		className: `min-h-[40px] px-2.5 py-1.5 rounded-xl text-xs font-extrabold border transition flex items-center justify-center gap-1 ${active ? activeClassName : inactiveClassName}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "wait",
			initial: false,
			children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				initial: prefersReducedMotion ? { opacity: 1 } : {
					scale: .4,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				exit: prefersReducedMotion ? { opacity: 0 } : {
					scale: .4,
					opacity: 0
				},
				transition: {
					type: "spring",
					stiffness: 460,
					damping: 24
				},
				className: "inline-flex items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 stroke-[3]" })
			}, "check")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
};
/**
* Subtle tactile Tasbih counter ring with expanding emerald/gold ripple & smooth count tick.
*/
var TasbihTapRing = ({ count, target, onTap }) => {
	const prefersReducedMotion = useReducedMotion();
	const [rippleKey, setRippleKey] = (0, import_react.useState)(0);
	const handlePress = () => {
		setRippleKey((k) => k + 1);
		if (target > 0 && (count + 1) % target === 0) triggerSuccessHaptic();
		else triggerLightHaptic();
		onTap();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: !prefersReducedMotion && rippleKey > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			initial: {
				scale: .92,
				opacity: .45
			},
			animate: {
				scale: 1.24,
				opacity: 0
			},
			exit: { opacity: 0 },
			transition: {
				duration: .36,
				ease: "easeOut"
			},
			className: "pointer-events-none absolute w-48 h-48 rounded-full border-2 border-amber-400/70",
			"aria-hidden": "true"
		}, rippleKey) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
			type: "button",
			onClick: handlePress,
			whileTap: prefersReducedMotion ? void 0 : { scale: .96 },
			transition: {
				type: "spring",
				stiffness: 460,
				damping: 28
			},
			"aria-label": `Increment Tasbih counter, current count ${count}`,
			className: "relative w-48 h-48 rounded-full bg-gradient-to-b from-[#14532D] via-[#0F3826] to-[#0A261A] text-white border-[5px] border-amber-400/80 shadow-xl flex flex-col items-center justify-center select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/60",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-bold uppercase tracking-widest text-emerald-200/85",
					children: "Tap to Count"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					initial: prefersReducedMotion ? false : {
						scale: 1.12,
						opacity: .7
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					transition: { duration: .14 },
					className: "text-5xl font-black tabular-nums text-amber-300 mt-1",
					children: count
				}, count),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-bold text-emerald-100/80 mt-1 tabular-nums",
					children: ["Goal ", target]
				})
			]
		})]
	});
};
/**
* Tactile Bookmark button with restrained pop feedback and accessible pressed state.
*/
var BookmarkPopButton = ({ saved, onToggle, label, className = "" }) => {
	const prefersReducedMotion = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
		type: "button",
		"aria-pressed": saved,
		"aria-label": label || (saved ? "Remove bookmark" : "Save bookmark"),
		whileTap: prefersReducedMotion ? void 0 : { scale: .88 },
		onClick: () => {
			triggerSelectionHaptic();
			onToggle();
		},
		className: `min-w-[40px] min-h-[40px] px-2.5 rounded-xl border transition inline-flex items-center justify-center gap-1.5 text-xs font-bold ${saved ? "bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-400/40" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]"} ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			initial: prefersReducedMotion ? false : { scale: .75 },
			animate: { scale: 1 },
			transition: {
				type: "spring",
				stiffness: 500,
				damping: 22
			},
			className: "inline-flex",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: `w-4 h-4 ${saved ? "fill-amber-500 text-amber-500" : ""}` })
		}, saved ? "saved" : "unsaved"), label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
};
// src/data/specialModulesData.ts
var PROPHETS_FAMILY_TREE = [
	{
		id: "adam",
		order: 1,
		name: "Prophet Adam (AS)",
		arabicName: "آدَم",
		title: "Safiyyullah · Father of Humanity",
		era: "Beginning of Mankind",
		branch: "Foundations",
		quranMentions: 25,
		keySurahs: "Al-Baqarah 2:30–38, Al-A’raf 7:11–25",
		miracleOrSign: "Taught the names of all things directly by Allah",
		coreLesson: "True nobility lies in immediate repentance (Tawbah) and humility."
	},
	{
		id: "idris",
		order: 2,
		name: "Prophet Idris (AS)",
		arabicName: "إِدْرِيس",
		title: "Siddiq · Truthful Prophet",
		era: "Early Generations",
		branch: "Foundations",
		parentId: "adam",
		quranMentions: 2,
		keySurahs: "Maryam 19:56–57, Al-Anbiya 21:85",
		miracleOrSign: "Raised by Allah to an exalted station",
		coreLesson: "Steadfast devotion, patience, and seeking beneficial knowledge."
	},
	{
		id: "nuh",
		order: 3,
		name: "Prophet Nuh (AS)",
		arabicName: "نُوح",
		title: "Naji-Allah · First Messenger (Ulul-Azm)",
		era: "950 Years of Da’wah",
		branch: "Foundations",
		parentId: "idris",
		quranMentions: 43,
		keySurahs: "Nuh 71:1–28, Hud 11:25–49",
		miracleOrSign: "Built the Ark under divine guidance and saved the believers",
		coreLesson: "Never despair in calling others to good with patience and sincerity."
	},
	{
		id: "hud",
		order: 4,
		name: "Prophet Hud (AS)",
		arabicName: "هُود",
		title: "Messenger to the People of ‘Ad",
		era: "Post-Flood Arabia (Al-Ahqaf)",
		branch: "Arabian & Ancient Nations",
		parentId: "nuh",
		quranMentions: 7,
		keySurahs: "Hud 11:50–60, Al-Ahqaf 46:21–26",
		miracleOrSign: "Saved along with the believers from the fierce wind",
		coreLesson: "Material strength and towering monuments mean nothing without Taqwa."
	},
	{
		id: "salih",
		order: 5,
		name: "Prophet Salih (AS)",
		arabicName: "صَالِح",
		title: "Messenger to Thamud",
		era: "Al-Hijr (Northern Arabia)",
		branch: "Arabian & Ancient Nations",
		parentId: "hud",
		quranMentions: 9,
		keySurahs: "Al-A’raf 7:73–79, Ash-Shams 91:11–15",
		miracleOrSign: "The miraculous She-Camel sent as a clear sign from Allah",
		coreLesson: "Honor the sacred limits and signs of Allah with gratitude."
	},
	{
		id: "ibrahim",
		order: 6,
		name: "Prophet Ibrahim (AS)",
		arabicName: "إِبْرَاهِيم",
		title: "Khalilullah · Friend of Allah (Ulul-Azm)",
		era: "Ur, Sham & Makkah",
		branch: "Foundations",
		parentId: "nuh",
		quranMentions: 69,
		keySurahs: "Al-Baqarah 2:124–132, Ibrahim 14:35–41",
		miracleOrSign: "Fire turned cool and peaceful for him; rebuilt the Holy Ka’bah",
		coreLesson: "Unwavering monotheism (Tawhid), hospitality, and complete trust in Allah."
	},
	{
		id: "lut",
		order: 7,
		name: "Prophet Lut (AS)",
		arabicName: "لُوط",
		title: "Nephew of Ibrahim (AS)",
		era: "Cities of the Plain",
		branch: "Arabian & Ancient Nations",
		parentId: "ibrahim",
		quranMentions: 27,
		keySurahs: "Hud 11:77–83, Al-Hijr 15:57–77",
		miracleOrSign: "Angels came as guests to rescue him and his believing family",
		coreLesson: "Stand firm for moral purity even when surrounded by pressure."
	},
	{
		id: "ismail",
		order: 8,
		name: "Prophet Ismail (AS)",
		arabicName: "إِسْمَاعِيل",
		title: "Dhabihullah · Ancestor of the Arabs",
		era: "Makkah · Eldest Son of Ibrahim (AS)",
		branch: "Branch of Ismail (AS)",
		parentId: "ibrahim",
		quranMentions: 12,
		keySurahs: "As-Saffat 37:102–107, Maryam 19:54–55",
		miracleOrSign: "The blessed Zamzam spring gushed beneath his feet; built the Ka’bah",
		coreLesson: "True to his promise, patient in hardship, and devoted to family Salah."
	},
	{
		id: "ishaq",
		order: 9,
		name: "Prophet Ishaq (AS)",
		arabicName: "إِسْحَاق",
		title: "Blessed Son of Ibrahim & Sarah",
		era: "Palestine / Canaan",
		branch: "Branch of Ishaq (AS)",
		parentId: "ibrahim",
		quranMentions: 17,
		keySurahs: "Hud 11:71, As-Saffat 37:112–113",
		miracleOrSign: "Glad tidings given by angels to elderly parents Ibrahim & Sarah",
		coreLesson: "Allah’s mercy transcends human limits—never stop making Du’a."
	},
	{
		id: "yaqub",
		order: 10,
		name: "Prophet Yaqub (AS)",
		arabicName: "يَعْقُوب",
		title: "Isra’il · Father of the Twelve Tribes",
		era: "Canaan & Egypt",
		branch: "Branch of Ishaq (AS)",
		parentId: "ishaq",
		quranMentions: 16,
		keySurahs: "Yusuf 12:4–100, Al-Baqarah 2:132–133",
		miracleOrSign: "Eyesight restored when Prophet Yusuf’s shirt was placed on his face",
		coreLesson: "Sabr Jamil (beautiful patience): complain of sorrow only to Allah."
	},
	{
		id: "yusuf",
		order: 11,
		name: "Prophet Yusuf (AS)",
		arabicName: "يُوسُف",
		title: "As-Siddiq · Best of Stories",
		era: "Canaan & Egypt",
		branch: "Branch of Ishaq (AS)",
		parentId: "yaqub",
		quranMentions: 27,
		keySurahs: "Surah Yusuf 12:1–111",
		miracleOrSign: "Divinely granted interpretation of dreams; saved Egypt from 7-year famine",
		coreLesson: "Chastity, forgiveness without resentment, and trusting Allah’s hidden plan."
	},
	{
		id: "ayyub",
		order: 12,
		name: "Prophet Ayyub (AS)",
		arabicName: "أَيُّوب",
		title: "Imam of Patience",
		era: "Levant (Descendant of Ishaq AS)",
		branch: "Branch of Ishaq (AS)",
		parentId: "ishaq",
		quranMentions: 4,
		keySurahs: "Al-Anbiya 21:83–84, Sad 38:41–44",
		miracleOrSign: "A cool spring gushed forth at his foot, restoring health and family",
		coreLesson: "Gratitude in ease and dignified Du’a in prolonged illness."
	},
	{
		id: "shuayb",
		order: 13,
		name: "Prophet Shu’ayb (AS)",
		arabicName: "شُعَيْب",
		title: "Khatib al-Anbiya · Eloquent Speaker",
		era: "Madyan (Midian)",
		branch: "Arabian & Ancient Nations",
		parentId: "ibrahim",
		quranMentions: 11,
		keySurahs: "Hud 11:84–95, Ash-Shu’ara 26:176–191",
		miracleOrSign: "Called a wealthy trading city to honest weights and economic justice",
		coreLesson: "Honesty in trade and fair weights are core acts of worship."
	},
	{
		id: "musa",
		order: 14,
		name: "Prophet Musa (AS)",
		arabicName: "مُوسَىٰ",
		title: "Kalimullah · One Who Spoke to Allah (Ulul-Azm)",
		era: "Egypt & Sinai",
		branch: "Branch of Ishaq (AS)",
		parentId: "yaqub",
		quranMentions: 136,
		keySurahs: "Taha 20:9–99, Al-Qasas 28:3–43",
		miracleOrSign: "Parted the Red Sea, the staff, shining hand, and received the Torah",
		coreLesson: "Courage before tyranny and reliance on Allah: \"Indeed, my Lord is with me.\""
	},
	{
		id: "harun",
		order: 15,
		name: "Prophet Harun (AS)",
		arabicName: "هَارُون",
		title: "Brother & Vizier of Musa (AS)",
		era: "Egypt & Sinai",
		branch: "Branch of Ishaq (AS)",
		parentId: "yaqub",
		quranMentions: 20,
		keySurahs: "Taha 20:29–36, Al-A’raf 7:142",
		miracleOrSign: "Appointed by Allah in answer to Musa’s Du’a to support his mission",
		coreLesson: "Brotherhood, gentle eloquence, and preserving unity in the community."
	},
	{
		id: "dhulkifl",
		order: 16,
		name: "Prophet Dhul-Kifl (AS)",
		arabicName: "ذُو الْكِفْل",
		title: "The Steadfast & Just",
		era: "Levant",
		branch: "Branch of Ishaq (AS)",
		parentId: "ayyub",
		quranMentions: 2,
		keySurahs: "Al-Anbiya 21:85–86, Sad 38:48",
		miracleOrSign: "Praised by Allah among the chosen, patient, and righteous",
		coreLesson: "Keep every covenant, control anger, and uphold daily worship."
	},
	{
		id: "dawud",
		order: 17,
		name: "Prophet Dawud (AS)",
		arabicName: "دَاوُود",
		title: "Prophet-King · Recipient of the Zabur",
		era: "Jerusalem",
		branch: "Branch of Ishaq (AS)",
		parentId: "yaqub",
		quranMentions: 16,
		keySurahs: "Sad 38:17–26, Saba 34:10–11",
		miracleOrSign: "Mountains and birds joined his Tasbih; iron softened in his hands",
		coreLesson: "Turn constantly to Allah in gratitude and earn through honest work."
	},
	{
		id: "sulayman",
		order: 18,
		name: "Prophet Sulayman (AS)",
		arabicName: "سُلَيْمَان",
		title: "Wise Prophet-King",
		era: "Jerusalem · Son of Dawud (AS)",
		branch: "Branch of Ishaq (AS)",
		parentId: "dawud",
		quranMentions: 17,
		keySurahs: "An-Naml 27:15–44, Saba 34:12–14",
		miracleOrSign: "Understood the speech of birds and ants; commanded the wind by Allah’s leave",
		coreLesson: "Power and knowledge are a test—respond with humility and Shukr."
	},
	{
		id: "ilyas",
		order: 19,
		name: "Prophet Ilyas (AS)",
		arabicName: "إِلْيَاس",
		title: "Caller to Pure Tawhid",
		era: "Baalbek / Northern Levant",
		branch: "Branch of Ishaq (AS)",
		parentId: "harun",
		quranMentions: 3,
		keySurahs: "As-Saffat 37:123–132, Al-An’am 6:85",
		miracleOrSign: "Fearlessly challenged idol worship of Ba’l with clear truth",
		coreLesson: "Speak truth clearly even when the majority turns away."
	},
	{
		id: "alyasa",
		order: 20,
		name: "Prophet Al-Yasa’ (AS)",
		arabicName: "الْيَسَع",
		title: "Successor to Ilyas (AS)",
		era: "Levant",
		branch: "Branch of Ishaq (AS)",
		parentId: "ilyas",
		quranMentions: 2,
		keySurahs: "Al-An’am 6:86, Sad 38:48",
		miracleOrSign: "Honored by Allah above the worlds for steadfast guidance",
		coreLesson: "Carry forward the legacy of righteous teachers with faithfulness."
	},
	{
		id: "yunus",
		order: 21,
		name: "Prophet Yunus (AS)",
		arabicName: "يُونُس",
		title: "Dhun-Nun · Companion of the Whale",
		era: "Nineveh (Iraq)",
		branch: "Branch of Ishaq (AS)",
		parentId: "yaqub",
		quranMentions: 4,
		keySurahs: "Al-Anbiya 21:87–88, As-Saffat 37:139–148",
		miracleOrSign: "Saved from three layers of darkness by his famous Du’a of Tasbih",
		coreLesson: "In your darkest moment, turn back to Allah—over 100,000 of his people believed."
	},
	{
		id: "zakariyya",
		order: 22,
		name: "Prophet Zakariyya (AS)",
		arabicName: "زَكَرِيَّا",
		title: "Guardian of Maryam (AS)",
		era: "Jerusalem (Line of Sulayman AS)",
		branch: "Branch of Ishaq (AS)",
		parentId: "sulayman",
		quranMentions: 7,
		keySurahs: "Maryam 19:2–11, Aal-Imran 3:37–41",
		miracleOrSign: "Granted Prophet Yahya in old age after whispering a heartfelt secret Du’a",
		coreLesson: "Call upon Allah softly and persistently—He never disappoints sincere Du’a."
	},
	{
		id: "yahya",
		order: 23,
		name: "Prophet Yahya (AS)",
		arabicName: "يَحْيَىٰ",
		title: "Compassionate & Pure from Childhood",
		era: "Jerusalem · Son of Zakariyya (AS)",
		branch: "Branch of Ishaq (AS)",
		parentId: "zakariyya",
		quranMentions: 5,
		keySurahs: "Maryam 19:12–15, Aal-Imran 3:39",
		miracleOrSign: "Given wisdom (Hukm), compassion, and purity while still a child",
		coreLesson: "Be dutiful to parents, gentle in heart, and earnest in holding onto the Book."
	},
	{
		id: "isa",
		order: 24,
		name: "Prophet Isa (AS)",
		arabicName: "عِيسَىٰ",
		title: "Al-Masih · Word from Allah (Ulul-Azm)",
		era: "Palestine · Son of Maryam (AS)",
		branch: "Branch of Ishaq (AS)",
		parentId: "dawud",
		quranMentions: 25,
		keySurahs: "Maryam 19:16–36, Aal-Imran 3:45–55",
		miracleOrSign: "Miraculous birth, spoke in the cradle, healed the blind, received the Injil",
		coreLesson: "Humility, service to the poor, and pure worship of One God."
	},
	{
		id: "muhammad",
		order: 25,
		name: "Prophet Muhammad ﷺ",
		arabicName: "مُحَمَّد ﷺ",
		title: "Khatam an-Nabiyyin · Mercy to All Worlds (Ulul-Azm)",
		era: "Makkah & Madinah (570–632 CE)",
		branch: "Branch of Ismail (AS)",
		parentId: "ismail",
		quranMentions: 4,
		keySurahs: "Al-Ahzab 33:40, Al-Anbiya 21:107, Al-Fath 48:29",
		miracleOrSign: "The Eternal Noble Quran, Isra & Mi’raj, perfected character",
		coreLesson: "Mercy, honesty (Al-Amin), forgiveness, and living Islam as a complete way of life."
	}
];
var NEW_MUSLIM_PATHWAY_STAGES = [
	{
		id: "stage_1_shahadah",
		stageNumber: 1,
		title: "The Shahadah & Six Articles of Faith",
		subtitle: "Understanding your direct relationship with Allah",
		estimatedMinutes: 8,
		summary: "Islam begins with a calm, direct bond with the One Creator—no intermediaries. Take it gently, one step at a time.",
		keyArabic: {
			arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
			transliteration: "Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadar Rasulullah",
			meaning: "I bear witness that none has the right to be worshipped except Allah, and Muhammad is His Messenger."
		},
		actionSteps: [
			"Reflect on the 6 Articles of Iman: Allah, Angels, Books, Messengers, Last Day, and Divine Decree.",
			"Learn 3 beautiful Names of Allah today: Ar-Rahman (Most Merciful), Al-Ghafur (Forgiving), Al-Wadud (Most Loving).",
			"Remember: Allah loves small, consistent steps more than overwhelming haste."
		],
		recommendedRoute: "names99",
		recommendedRouteLabel: "Explore 99 Names of Allah"
	},
	{
		id: "stage_2_wudu",
		stageNumber: 2,
		title: "Purification & Step-by-Step Wudu",
		subtitle: "Washing away stress before standing in prayer",
		estimatedMinutes: 6,
		summary: "Wudu is a simple 2-minute washing ritual using clean water that refreshes both body and mind before Salah.",
		keyArabic: {
			arabic: "بِسْمِ اللَّهِ",
			transliteration: "Bismillah",
			meaning: "In the Name of Allah (said quietly before beginning Wudu)."
		},
		actionSteps: [
			"Wash hands (3x), rinse mouth (3x), rinse nose gently (3x), and wash face (3x).",
			"Wash right arm then left arm up to elbows (3x), wipe head & ears once, wash right then left foot (3x).",
			"Practice once using Ilmizo’s interactive Wudu Visual Coach."
		],
		recommendedRoute: "salah",
		recommendedRouteLabel: "Open Wudu & Salah Guide"
	},
	{
		id: "stage_3_first_salah",
		stageNumber: 3,
		title: "Your First 2-Rak’ah Prayer (Fajr)",
		subtitle: "Learn the postures without pressure",
		estimatedMinutes: 10,
		summary: "Start by mastering a simple 2-unit prayer (like Fajr). It is completely okay to read transliteration from a card while learning.",
		keyArabic: {
			arabic: "اللَّهُ أَكْبَرُ · سُبْحَانَ رَبِّيَ الْعَظِيمِ · سُبْحَانَ رَبِّيَ الْأَعْلَىٰ",
			transliteration: "Allahu Akbar · Subhana Rabbiyal-Azim · Subhana Rabbiyal-A’la",
			meaning: "Allah is Greatest · Glory to my Lord the Supreme (Ruku) · Glory to my Lord the Most High (Sujud)."
		},
		actionSteps: [
			"Face the Qibla direction using the Qibla Compass.",
			"Practice the 4 core postures: Standing (Qiyam), Bowing (Ruku), Prostrating (Sujud), and Sitting (Tashahhud).",
			"Log your first prayed Salah in the Salah Tracker to build a joyful habit."
		],
		recommendedRoute: "qibla",
		recommendedRouteLabel: "Find Qibla Direction"
	},
	{
		id: "stage_4_fatiha",
		stageNumber: 4,
		title: "Memorize Surah Al-Fatiha & Al-Ikhlas",
		subtitle: "The 7 essential verses recited in every prayer",
		estimatedMinutes: 12,
		summary: "Surah Al-Fatiha is a warm conversation between you and Allah. Listen to 1 Ayah at a time with Word-by-Word highlight.",
		keyArabic: {
			arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
			transliteration: "Alhamdu lillahi Rabbil-Alamin",
			meaning: "All praise and gratitude belong to Allah, Lord of all worlds."
		},
		actionSteps: [
			"Play Surah Al-Fatiha (Surah 1) with continuous audio + Word-by-Word highlight.",
			"Listen to Surah Al-Ikhlas (Surah 112 — just 4 short verses) to recite after Al-Fatiha.",
			"Use Hifz Studio to practice one verse per day for one week."
		],
		recommendedRoute: "quran_read",
		recommendedRouteLabel: "Open Quran Reader"
	},
	{
		id: "stage_5_daily_adhkar",
		stageNumber: 5,
		title: "Everyday Prophetic Phrases & Du’a",
		subtitle: "Bringing remembrance into ordinary moments",
		estimatedMinutes: 5,
		summary: "Islam turns daily moments—eating, waking up, driving, thanking someone—into acts of peace and worship.",
		keyArabic: {
			arabic: "بِسْمِ اللَّهِ · الْحَمْدُ لِلَّهِ · سُبْحَانَ اللَّهِ · أَسْتَغْفِرُ اللَّهَ",
			transliteration: "Bismillah · Alhamdulillah · SubhanAllah · Astaghfirullah",
			meaning: "In Allah’s Name · Praise Allah · Glory to Allah · I seek Allah’s forgiveness."
		},
		actionSteps: [
			"Say Bismillah before meals and Alhamdulillah after finishing.",
			"Speak to Allah in your own native language in Du’a—He understands every heart.",
			"Try 33 SubhanAllah, 33 Alhamdulillah, 33 Allahu Akbar on the Tasbih Counter."
		],
		recommendedRoute: "duas",
		recommendedRouteLabel: "Browse Daily Duas"
	},
	{
		id: "stage_6_lifestyle",
		stageNumber: 6,
		title: "Halal Living, Character & Kindness",
		subtitle: "Mercy to parents, neighbors, and yourself",
		estimatedMinutes: 8,
		summary: "Being Muslim strengthens your kindness toward family and neighbors—regardless of their background.",
		actionSteps: [
			"Learn the simple Halal food basics (wholesome foods, no pork or intoxicants).",
			"Honor your parents and stay warm and patient with family questions.",
			"Read 1 short chapter from the Prophet’s Seerah to see how gently he treated people."
		],
		recommendedRoute: "seerah",
		recommendedRouteLabel: "Read Prophetic Seerah"
	},
	{
		id: "stage_7_growth",
		stageNumber: 7,
		title: "Sustainable Weekly Growth Rhythm",
		subtitle: "Friday Jummah, learning circles & steady habits",
		estimatedMinutes: 7,
		summary: "Avoid burnout. Anchor your week with Friday prayer (Jummah), one short lesson, and 5 minutes of Quran daily.",
		actionSteps: [
			"Explore the Friday (Jummah) Hub every Friday morning.",
			"Learn 5 words a week from the Top 600 Quran Vocabulary deck.",
			"Celebrate every milestone—Allah sees every effort you make."
		],
		recommendedRoute: "lessons",
		recommendedRouteLabel: "Explore Islamic Lessons"
	}
];
var FRIDAY_SUNNAH_CHECKLIST = [
	{
		id: "jummah_ghusl",
		title: "Take Ghusl (Friday Bath) & Clean Attire",
		subtitle: "Purify yourself, use Miswak/toothbrush, and apply gentle fragrance (for men).",
		source: "Sahih al-Bukhari 883"
	},
	{
		id: "jummah_kahf",
		title: "Read or Listen to Surah Al-Kahf (Surah 18)",
		subtitle: "Illuminates a spiritual light between this Friday and the next.",
		source: "Al-Mustadrak / Sahih al-Jami 6470",
		actionType: "open_kahf"
	},
	{
		id: "jummah_salawat",
		title: "Send Abundant Salawat upon Prophet Muhammad ﷺ",
		subtitle: "“Allahumma salli ‘ala Muhammadin wa ‘ala ali Muhammad.”",
		source: "Sunan Abi Dawud 1047 (Sahih)",
		actionType: "salawat_tap"
	},
	{
		id: "jummah_early",
		title: "Arrive Early for Jummah Khutbah & Listen Attentively",
		subtitle: "Angels record early arrivals at the Masjid doors before the Imam ascends.",
		source: "Sahih al-Bukhari 881"
	},
	{
		id: "jummah_sadaqah",
		title: "Give Friday Sadaqah or Do a Kind Deed",
		subtitle: "Even a smile, feeding someone, or a small secret charity carries immense barakah.",
		source: "Sahih Muslim 1009"
	},
	{
		id: "jummah_dua_hour",
		title: "Make Heartfelt Du’a in the Last Hour Before Maghrib",
		subtitle: "There is an hour on Friday when Allah answers every sincere believer’s Du’a.",
		source: "Sahih al-Bukhari 935 & Sunan Abi Dawud 1048"
	}
];
var ISLAMIC_REMINDER_CARDS = [
	{
		id: "rem_ease_1",
		category: "Ease & Patience",
		arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
		transliteration: "Fa inna ma’al-usri yusra. Inna ma’al-usri yusra.",
		translation: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
		source: "Surah Ash-Sharh 94:5–6"
	},
	{
		id: "rem_ease_2",
		category: "Ease & Patience",
		arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
		transliteration: "La yukallifullahu nafsan illa wus’aha.",
		translation: "Allah does not burden any soul beyond that which it can bear.",
		source: "Surah Al-Baqarah 2:286"
	},
	{
		id: "rem_ease_3",
		category: "Ease & Patience",
		arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
		transliteration: "Innallaha ma’as-sabirin.",
		translation: "Indeed, Allah is with those who remain patient.",
		source: "Surah Al-Baqarah 2:153"
	},
	{
		id: "rem_gratitude_1",
		category: "Gratitude",
		arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
		transliteration: "La’in shakartum la-azidannakum.",
		translation: "If you are grateful, I will surely increase you in favor.",
		source: "Surah Ibrahim 14:7"
	},
	{
		id: "rem_gratitude_2",
		category: "Gratitude",
		arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
		transliteration: "Fadhkuruni adhkurkum washkuru li wa la takfurun.",
		translation: "So remember Me; I will remember you. Be grateful to Me and do not deny Me.",
		source: "Surah Al-Baqarah 2:152"
	},
	{
		id: "rem_tawakkul_1",
		category: "Trust in Allah",
		arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
		transliteration: "Wa man yatawakkal ‘alallahi fahuwa hasbuh.",
		translation: "And whoever puts their trust in Allah — then He is sufficient for them.",
		source: "Surah At-Talaq 65:3"
	},
	{
		id: "rem_tawakkul_2",
		category: "Trust in Allah",
		arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
		transliteration: "Hasbunallahu wa ni’mal-wakil.",
		translation: "Sufficient for us is Allah, and He is the best Disposer of affairs.",
		source: "Surah Aal-Imran 3:173"
	},
	{
		id: "rem_tawakkul_3",
		category: "Trust in Allah",
		arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
		transliteration: "Ala bi-dhikrillahi tatma’innul-qulub.",
		translation: "Unquestionably, by the remembrance of Allah do hearts find tranquility.",
		source: "Surah Ar-Ra’d 13:28"
	},
	{
		id: "rem_mercy_1",
		category: "Mercy",
		arabic: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ",
		transliteration: "Wa rahmati wasi’at kulla shay’.",
		translation: "My mercy encompasses all things.",
		source: "Surah Al-A’raf 7:156"
	},
	{
		id: "rem_mercy_2",
		category: "Mercy",
		arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَٰنُ",
		transliteration: "Ar-rahimuna yarhamuhumur-Rahman.",
		translation: "Those who are merciful will be shown mercy by the Most Merciful.",
		source: "Sunan Abi Dawud 4941 (Sahih)"
	},
	{
		id: "rem_mercy_3",
		category: "Mercy",
		arabic: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
		transliteration: "La taqnatu min rahmatillah.",
		translation: "Never despair of the mercy of Allah.",
		source: "Surah Az-Zumar 39:53"
	},
	{
		id: "rem_family_1",
		category: "Family",
		arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
		transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a’yun.",
		translation: "Our Lord, grant us from among our spouses and offspring comfort to our eyes.",
		source: "Surah Al-Furqan 25:74"
	},
	{
		id: "rem_family_2",
		category: "Family",
		arabic: "خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ",
		transliteration: "Khayrukum khayrukum li-ahlih.",
		translation: "The best of you are those who are best to their families.",
		source: "Jami’ at-Tirmidhi 3895 (Sahih)"
	},
	{
		id: "rem_knowledge_1",
		category: "Knowledge",
		arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
		transliteration: "Wa qul Rabbi zidni ‘ilma.",
		translation: "And say: My Lord, increase me in knowledge.",
		source: "Surah Taha 20:114"
	},
	{
		id: "rem_knowledge_2",
		category: "Knowledge",
		arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
		transliteration: "Khayrukum man ta’allamal-Qur’ana wa ‘allamah.",
		translation: "The best among you are those who learn the Quran and teach it.",
		source: "Sahih al-Bukhari 5027"
	}
];
var CAR_DRIVE_PRESET_SURAHS = [
	{
		number: 1,
		name: "Al-Fatiha",
		arabic: "الفاتحة",
		ayahs: 7,
		tag: "Opening"
	},
	{
		number: 18,
		name: "Al-Kahf",
		arabic: "الكهف",
		ayahs: 110,
		tag: "Friday Light"
	},
	{
		number: 36,
		name: "Ya-Sin",
		arabic: "يس",
		ayahs: 83,
		tag: "Heart of Quran"
	},
	{
		number: 55,
		name: "Ar-Rahman",
		arabic: "الرحمن",
		ayahs: 78,
		tag: "Most Merciful"
	},
	{
		number: 67,
		name: "Al-Mulk",
		arabic: "الملك",
		ayahs: 30,
		tag: "Night Shield"
	},
	{
		number: 112,
		name: "Al-Ikhlas",
		arabic: "الإخلاص",
		ayahs: 4,
		tag: "Pure Tawhid"
	}
];
// src/components/adult/SpecialModulesHub.tsx
var CAR_DRIVE_QUEUE_KEY = "ilmizo_car_drive_queue_v1";
var DEFAULT_DRIVE_QUEUE = [
	18,
	36,
	55,
	56,
	67,
	112
];
function loadCustomDriveQueue() {
	if (typeof localStorage === "undefined") return DEFAULT_DRIVE_QUEUE;
	try {
		const raw = localStorage.getItem(CAR_DRIVE_QUEUE_KEY);
		if (!raw) return DEFAULT_DRIVE_QUEUE;
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return DEFAULT_DRIVE_QUEUE;
		const valid = parsed.map((n) => Number(n)).filter((n) => Number.isInteger(n) && n >= 1 && n <= 114);
		return valid.length > 0 ? Array.from(new Set(valid)) : DEFAULT_DRIVE_QUEUE;
	} catch {
		return DEFAULT_DRIVE_QUEUE;
	}
}
var NEW_MUSLIM_STORAGE_KEY = "ilmizo_new_muslim_pathway_done_v1";
var FRIDAY_HUB_STORAGE_KEY = "ilmizo_friday_hub_state_v1";
function getCurrentFridayWeekKey() {
	const now = /* @__PURE__ */ new Date();
	const yearStart = new Date(now.getFullYear(), 0, 1);
	const weekNum = Math.ceil(((now.getTime() - yearStart.getTime()) / 864e5 + yearStart.getDay() + 1) / 7);
	return `${now.getFullYear()}-W${weekNum}`;
}
var SpecialModulesHub = ({ activeModule, onClose, onNavigateAdultRoute, onOpenSurahInReader, reciterName = "Mishary Rashid Alafasy", language = "en", initialCustomAyah = null }) => {
	const [treeBranchFilter, setTreeBranchFilter] = (0, import_react.useState)("All");
	const [selectedProphet, setSelectedProphet] = (0, import_react.useState)(PROPHETS_FAMILY_TREE[0]);
	const [completedStages, setCompletedStages] = (0, import_react.useState)(() => {
		try {
			const raw = localStorage.getItem(NEW_MUSLIM_STORAGE_KEY);
			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	});
	const [expandedStageId, setExpandedStageId] = (0, import_react.useState)(NEW_MUSLIM_PATHWAY_STAGES[0].id);
	const weekKey = (0, import_react.useMemo)(() => getCurrentFridayWeekKey(), []);
	const [fridayCheckedIds, setFridayCheckedIds] = (0, import_react.useState)(() => {
		try {
			const raw = localStorage.getItem(FRIDAY_HUB_STORAGE_KEY);
			const parsed = raw ? JSON.parse(raw) : null;
			return parsed && parsed.weekKey === weekKey && Array.isArray(parsed.checkedIds) ? parsed.checkedIds : [];
		} catch {
			return [];
		}
	});
	const [salawatCount, setSalawatCount] = (0, import_react.useState)(() => {
		try {
			const raw = localStorage.getItem(FRIDAY_HUB_STORAGE_KEY);
			const parsed = raw ? JSON.parse(raw) : null;
			return parsed && parsed.weekKey === weekKey && typeof parsed.salawatCount === "number" ? parsed.salawatCount : 0;
		} catch {
			return 0;
		}
	});
	const audioState = useAudioManager();
	const [driveQueue, setDriveQueue] = (0, import_react.useState)(() => loadCustomDriveQueue());
	const [driveSurahNumber, setDriveSurahNumber] = (0, import_react.useState)(() => loadCustomDriveQueue()[0] || 18);
	const [driveSpeed, setDriveSpeed] = (0, import_react.useState)(1);
	const [autoAdvanceQueue, setAutoAdvanceQueue] = (0, import_react.useState)(true);
	const [queueEditorOpen, setQueueEditorOpen] = (0, import_react.useState)(false);
	const [queueAddSurahVal, setQueueAddSurahVal] = (0, import_react.useState)("2");
	const [sleepSheetOpen, setSleepSheetOpen] = (0, import_react.useState)(false);
	const prevAudioStatusRef = (0, import_react.useRef)(audioState.status);
	const [reminderMode, setReminderMode] = (0, import_react.useState)(initialCustomAyah ? "any_ayah" : "curated");
	const [reminderCategory, setReminderCategory] = (0, import_react.useState)("All");
	const [reminderTheme, setReminderTheme] = (0, import_react.useState)("emerald");
	const [activeReminderIndex, setActiveReminderIndex] = (0, import_react.useState)(0);
	const [pickerSurahNum, setPickerSurahNum] = (0, import_react.useState)(initialCustomAyah?.surahNumber || 1);
	const [pickerAyahNum, setPickerAyahNum] = (0, import_react.useState)(initialCustomAyah?.ayahNumber || 1);
	const [customAyahCard, setCustomAyahCard] = (0, import_react.useState)(() => initialCustomAyah ? {
		id: `ayah_${initialCustomAyah.surahNumber}_${initialCustomAyah.ayahNumber}`,
		category: "Trust in Allah",
		arabic: initialCustomAyah.arabic,
		transliteration: initialCustomAyah.transliteration || "",
		translation: initialCustomAyah.translation,
		source: `Qur'an · Surah ${initialCustomAyah.surahName} (${initialCustomAyah.surahNumber}:${initialCustomAyah.ayahNumber})`
	} : null);
	const [loadingCustomAyah, setLoadingCustomAyah] = (0, import_react.useState)(false);
	const [shareToast, setShareToast] = (0, import_react.useState)(null);
	const toastTimerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		return () => {
			if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (initialCustomAyah) {
			setReminderMode("any_ayah");
			setPickerSurahNum(initialCustomAyah.surahNumber);
			setPickerAyahNum(initialCustomAyah.ayahNumber);
			setCustomAyahCard({
				id: `ayah_${initialCustomAyah.surahNumber}_${initialCustomAyah.ayahNumber}`,
				category: "Trust in Allah",
				arabic: initialCustomAyah.arabic,
				transliteration: initialCustomAyah.transliteration || "",
				translation: initialCustomAyah.translation,
				source: `Qur'an · Surah ${initialCustomAyah.surahName} (${initialCustomAyah.surahNumber}:${initialCustomAyah.ayahNumber})`
			});
		}
	}, [initialCustomAyah]);
	(0, import_react.useEffect)(() => {
		if (activeModule !== "reminder_cards" || reminderMode !== "any_ayah") return;
		if (initialCustomAyah && initialCustomAyah.surahNumber === pickerSurahNum && initialCustomAyah.ayahNumber === pickerAyahNum && customAyahCard?.id === `ayah_${pickerSurahNum}_${pickerAyahNum}`) return;
		let cancelled = false;
		setLoadingCustomAyah(true);
		getSurahPayload(pickerSurahNum, language, reciterName).then((payload) => {
			if (cancelled) return;
			const meta = ALL_114_SURAHS[pickerSurahNum - 1];
			const safeAyahNum = Math.max(1, Math.min(meta?.ayahCount || 7, pickerAyahNum));
			const match = payload.ayahs.find((a) => a.numberInSurah === safeAyahNum) || payload.ayahs[0];
			if (match) {
				const translated = match.translations[language] || match.translations.en;
				setCustomAyahCard({
					id: `ayah_${pickerSurahNum}_${match.numberInSurah}`,
					category: "Trust in Allah",
					arabic: match.arabicUthmani,
					transliteration: match.transliteration || "",
					translation: translated,
					source: `Qur'an · Surah ${payload.meta.nameTranslit} (${payload.meta.number}:${match.numberInSurah})`
				});
			}
		}).catch(() => {}).finally(() => {
			if (!cancelled) setLoadingCustomAyah(false);
		});
		return () => {
			cancelled = true;
		};
	}, [
		activeModule,
		reminderMode,
		pickerSurahNum,
		pickerAyahNum,
		language,
		reciterName
	]);
	(0, import_react.useEffect)(() => {
		const prev = prevAudioStatusRef.current;
		prevAudioStatusRef.current = audioState.status;
		if (activeModule === "car_drive" && autoAdvanceQueue && prev === "playing" && audioState.status === "idle" && audioState.quranSequence.surahNumber === driveSurahNumber && (audioState.quranSequence.endAyah ?? 0) > 0 && (audioState.quranSequence.currentAyah ?? 0) >= (audioState.quranSequence.endAyah ?? 0)) {
			const idx = driveQueue.indexOf(driveSurahNumber);
			if (idx >= 0 && driveQueue.length > 1) {
				const nextSurah = driveQueue[(idx + 1) % driveQueue.length];
				setDriveSurahNumber(nextSurah);
				audioManager.playFullSurah({
					surahNumber: nextSurah,
					startFromAyah: 1,
					reciterName,
					rate: driveSpeed
				});
			}
		}
	}, [
		activeModule,
		autoAdvanceQueue,
		audioState.status,
		audioState.quranSequence.surahNumber,
		audioState.quranSequence.currentAyah,
		audioState.quranSequence.endAyah,
		driveSurahNumber,
		driveQueue,
		reciterName,
		driveSpeed
	]);
	if (!activeModule) return null;
	const showToast = (msg) => {
		setShareToast(msg);
		if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
		toastTimerRef.current = window.setTimeout(() => setShareToast(null), 2600);
	};
	const toggleNewMuslimStage = (stageId) => {
		triggerSuccessHaptic();
		setCompletedStages((prev) => {
			const next = prev.includes(stageId) ? prev.filter((id) => id !== stageId) : [...prev, stageId];
			try {
				localStorage.setItem(NEW_MUSLIM_STORAGE_KEY, JSON.stringify(next));
			} catch {}
			return next;
		});
	};
	const saveFridayState = (checkedIds, count) => {
		try {
			localStorage.setItem(FRIDAY_HUB_STORAGE_KEY, JSON.stringify({
				weekKey,
				checkedIds,
				salawatCount: count
			}));
		} catch {}
	};
	const toggleFridaySunnah = (id) => {
		triggerSelectionHaptic();
		const next = fridayCheckedIds.includes(id) ? fridayCheckedIds.filter((item) => item !== id) : [...fridayCheckedIds, id];
		setFridayCheckedIds(next);
		saveFridayState(next, salawatCount);
	};
	const incrementSalawat = () => {
		triggerLightHaptic();
		const nextCount = salawatCount + 1;
		setSalawatCount(nextCount);
		const nextChecked = nextCount >= 10 && !fridayCheckedIds.includes("jummah_salawat") ? [...fridayCheckedIds, "jummah_salawat"] : fridayCheckedIds;
		setFridayCheckedIds(nextChecked);
		saveFridayState(nextChecked, nextCount);
	};
	const persistDriveQueue = (nextQueue) => {
		const clean = nextQueue.length > 0 ? nextQueue : DEFAULT_DRIVE_QUEUE;
		setDriveQueue(clean);
		try {
			localStorage.setItem(CAR_DRIVE_QUEUE_KEY, JSON.stringify(clean));
		} catch {}
	};
	const resolveDriveSurahInfo = (num) => {
		const preset = CAR_DRIVE_PRESET_SURAHS.find((s) => s.number === num);
		if (preset) return preset;
		const meta = ALL_114_SURAHS[num - 1] || ALL_114_SURAHS[0];
		return {
			number: meta.number,
			name: meta.nameTranslit,
			arabic: meta.nameArabic,
			ayahs: meta.ayahCount,
			tag: meta.revelationType
		};
	};
	const drivePreset = resolveDriveSurahInfo(driveSurahNumber);
	const handleDrivePlaySurah = (surahNum) => {
		triggerSelectionHaptic();
		setDriveSurahNumber(surahNum);
		const target = resolveDriveSurahInfo(surahNum);
		audioManager.playFullSurah({
			surahNumber: target.number,
			startFromAyah: 1,
			reciterName,
			rate: driveSpeed
		});
	};
	const handleDriveNextQueueSurah = () => {
		const idx = driveQueue.indexOf(driveSurahNumber);
		const nextNum = driveQueue[(idx + 1 + driveQueue.length) % driveQueue.length] || driveQueue[0];
		handleDrivePlaySurah(nextNum);
	};
	const handleDriveTogglePlay = () => {
		triggerLightHaptic();
		if (audioState.status === "playing") audioManager.pause();
		else if (audioState.status === "paused") audioManager.resume();
		else handleDrivePlaySurah(driveSurahNumber);
	};
	const handleDriveStepAyah = (delta) => {
		triggerLightHaptic();
		const currentSurah = audioState.quranSequence.surahNumber || drivePreset.number;
		const currentTotal = audioState.quranSequence.endAyah || drivePreset.ayahs;
		const currentAyah = audioState.quranSequence.currentAyah || 1;
		const nextAyah = Math.max(1, Math.min(currentTotal, currentAyah + delta));
		audioManager.playFullSurah({
			surahNumber: currentSurah,
			startFromAyah: nextAyah,
			reciterName,
			rate: driveSpeed
		});
	};
	const handleDriveCycleSpeed = () => {
		triggerLightHaptic();
		const speeds = [
			.75,
			1,
			1.25
		];
		const nextSpeed = speeds[(speeds.indexOf(driveSpeed) + 1) % speeds.length];
		setDriveSpeed(nextSpeed);
		audioManager.setPlaybackRate(nextSpeed);
	};
	const filteredReminders = reminderCategory === "All" ? ISLAMIC_REMINDER_CARDS : ISLAMIC_REMINDER_CARDS.filter((c) => c.category === reminderCategory);
	const currentReminder = reminderMode === "any_ayah" && customAyahCard ? customAyahCard : filteredReminders[activeReminderIndex % Math.max(1, filteredReminders.length)] || ISLAMIC_REMINDER_CARDS[0];
	const activeThemeStyle = {
		emerald: {
			bg: "bg-gradient-to-br from-[#0F3D24] via-[#14532D] to-[#0B2A19]",
			border: "border-amber-400/40",
			arabic: "text-amber-200",
			body: "text-emerald-50",
			accent: "text-amber-300",
			canvasBg: "#14532D",
			canvasFg: "#FDFBF7",
			canvasGold: "#F59E0B"
		},
		ivory: {
			bg: "bg-gradient-to-br from-[#FDFBF7] via-[#FAF3E0] to-[#F5EBD0]",
			border: "border-amber-300/80",
			arabic: "text-[#14532D]",
			body: "text-slate-800",
			accent: "text-amber-700",
			canvasBg: "#FDFBF7",
			canvasFg: "#14532D",
			canvasGold: "#B45309"
		},
		gold: {
			bg: "bg-gradient-to-br from-[#78350F] via-[#92400E] to-[#451A03]",
			border: "border-amber-300/50",
			arabic: "text-amber-100",
			body: "text-amber-50",
			accent: "text-amber-300",
			canvasBg: "#78350F",
			canvasFg: "#FFFBEB",
			canvasGold: "#FDE68A"
		},
		midnight: {
			bg: "bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#020617]",
			border: "border-emerald-400/35",
			arabic: "text-emerald-200",
			body: "text-slate-100",
			accent: "text-amber-300",
			canvasBg: "#0F172A",
			canvasFg: "#F8FAFC",
			canvasGold: "#F59E0B"
		}
	}[reminderTheme];
	const handleDownloadReminderCard = () => {
		triggerSuccessHaptic();
		try {
			const canvas = document.createElement("canvas");
			canvas.width = 1080;
			canvas.height = 1080;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			ctx.fillStyle = activeThemeStyle.canvasBg;
			ctx.fillRect(0, 0, 1080, 1080);
			ctx.strokeStyle = activeThemeStyle.canvasGold;
			ctx.lineWidth = 4;
			ctx.strokeRect(48, 48, 984, 984);
			ctx.fillStyle = activeThemeStyle.canvasGold;
			ctx.font = "bold 28px sans-serif";
			ctx.textAlign = "center";
			ctx.fillText(currentReminder.category.toUpperCase(), 540, 150);
			ctx.fillStyle = activeThemeStyle.canvasGold;
			ctx.font = "bold 56px serif";
			ctx.fillText(currentReminder.arabic, 540, 390, 880);
			ctx.fillStyle = activeThemeStyle.canvasFg;
			ctx.font = "italic 30px sans-serif";
			ctx.fillText(currentReminder.transliteration, 540, 510, 880);
			ctx.font = "bold 36px sans-serif";
			const words = currentReminder.translation.split(" ");
			let line = "";
			let y = 630;
			for (const word of words) {
				const test = line ? `${line} ${word}` : word;
				if (ctx.measureText(test).width > 840) {
					ctx.fillText(line, 540, y);
					line = word;
					y += 50;
				} else line = test;
			}
			if (line) ctx.fillText(line, 540, y);
			ctx.fillStyle = activeThemeStyle.canvasGold;
			ctx.font = "bold 28px sans-serif";
			ctx.fillText(currentReminder.source, 540, 890);
			ctx.fillStyle = activeThemeStyle.canvasFg;
			ctx.globalAlpha = .7;
			ctx.font = "24px sans-serif";
			ctx.fillText("Ilmizo · Learn • Pray • Grow", 540, 965);
			const url = canvas.toDataURL("image/png");
			const a = document.createElement("a");
			a.href = url;
			a.download = `ilmizo-reminder-${currentReminder.id}.png`;
			a.click();
			showToast("Reminder card saved as PNG");
		} catch {
			showToast("Could not generate image on this browser");
		}
	};
	const handleShareReminder = async () => {
		triggerLightHaptic();
		const shareText = `${currentReminder.arabic}\n\n“${currentReminder.translation}”\n— ${currentReminder.source}\n\nShared via Ilmizo`;
		try {
			if (navigator.share) {
				await navigator.share({
					title: "Ilmizo Islamic Reminder",
					text: shareText
				});
				return;
			}
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(shareText);
				showToast("Reminder copied to clipboard");
			}
		} catch {}
	};
	const visibleProphets = treeBranchFilter === "All" ? PROPHETS_FAMILY_TREE : PROPHETS_FAMILY_TREE.filter((p) => p.branch === treeBranchFilter);
	const isFridayToday = (/* @__PURE__ */ new Date()).getDay() === 5;
	const moduleTitles = {
		prophets_tree: {
			title: "Prophets Family Tree",
			subtitle: "All 25 Prophets mentioned by name in the Noble Quran"
		},
		new_muslim: {
			title: "New Muslim Pathway",
			subtitle: "Calm 7-stage offline companion for your first steps in Islam"
		},
		friday_hub: {
			title: "Friday (Jummah) Hub",
			subtitle: "Sunnah checklist, Surah Al-Kahf & Salawat counter"
		},
		car_drive: {
			title: "Car Drive Mode",
			subtitle: "Hands-free high-contrast Quran listening cockpit"
		},
		reminder_cards: {
			title: "Islamic Reminder Cards",
			subtitle: "Verified Quran & Hadith cards ready to save or share offline"
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": moduleTitles[activeModule].title,
		className: `fixed inset-0 z-50 flex flex-col ${activeModule === "car_drive" ? "bg-[#071811] text-white" : "bg-[var(--bg-canvas)] text-[var(--text-primary)]"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `shrink-0 px-4 py-3 flex items-center justify-between gap-3 border-b ${activeModule === "car_drive" ? "bg-[#0B2319] border-emerald-800/60 text-white" : "bg-[#14532D] border-emerald-900/40 text-white"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Back",
						className: "min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-extrabold truncate",
							children: moduleTitles[activeModule].title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-emerald-100/80 truncate",
							children: moduleTitles[activeModule].subtitle
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Close",
						className: "min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto px-4 py-5 pb-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto space-y-5",
					children: [
						activeModule === "prophets_tree" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-gradient-to-br from-[#14532D] to-[#0D3820] text-white p-5 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-amber-300 text-xs font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sacred Prophetic Lineage · Adam (AS) to Muhammad ﷺ" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-emerald-50 leading-relaxed",
										children: "All 25 Prophets mentioned in the Quran carried one unbroken message of Tawhid. Tap any Prophet below to trace their lineage, Quranic Surahs, and timeless lesson."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2.5 pt-1 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl bg-white/10 border border-white/15 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-extrabold text-amber-300",
												children: "Branch of Ismail (AS)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-emerald-100/85 mt-0.5",
												children: "Ibrahim (AS) → Ismail (AS) → Prophet Muhammad ﷺ"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl bg-white/10 border border-white/15 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-extrabold text-emerald-200",
												children: "Branch of Ishaq (AS)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-emerald-100/85 mt-0.5",
												children: "Ibrahim → Ishaq → Yaqub → Yusuf, Musa, Dawud, Isa (AS)"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2 overflow-x-auto pb-1",
								children: [
									"All",
									"Foundations",
									"Branch of Ismail (AS)",
									"Branch of Ishaq (AS)",
									"Arabian & Ancient Nations"
								].map((branch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										triggerLightHaptic();
										setTreeBranchFilter(branch);
									},
									className: `min-h-[42px] px-3.5 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 border transition ${treeBranchFilter === branch ? "bg-[#14532D] text-white border-[#14532D]" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
									children: branch
								}, branch))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-[var(--bg-surface)] border border-amber-300/70 dark:border-amber-400/35 p-5 shadow-xs space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-bold text-amber-700 dark:text-amber-300",
											children: [
												"#",
												selectedProphet.order,
												" · ",
												selectedProphet.branch
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-xl font-extrabold text-[var(--text-primary)] mt-0.5",
											children: selectedProphet.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-semibold text-[var(--text-secondary)]",
											children: [
												selectedProphet.title,
												" · ",
												selectedProphet.era
											]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-arabic-uthmani text-3xl text-[#14532D] dark:text-amber-300 shrink-0",
										children: selectedProphet.arabicName
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-elevated)] p-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-bold text-[var(--text-secondary)]",
											children: [
												"Miracle & Sign · Mentioned ",
												selectedProphet.quranMentions,
												"x in Quran"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold text-[var(--text-primary)] mt-1",
											children: selectedProphet.miracleOrSign
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-elevated)] p-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-bold text-[var(--text-secondary)]",
											children: ["Core Life Lesson · ", selectedProphet.keySurahs]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold text-[var(--text-primary)] mt-1",
											children: selectedProphet.coreLesson
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
								children: visibleProphets.map((prophet) => {
									const isSelected = selectedProphet.id === prophet.id;
									const parentNode = prophet.parentId ? PROPHETS_FAMILY_TREE.find((p) => p.id === prophet.parentId) : null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											triggerLightHaptic();
											setSelectedProphet(prophet);
										},
										className: `min-h-[72px] rounded-2xl border p-3.5 text-left flex items-center justify-between gap-3 transition active:scale-[0.98] ${isSelected ? "bg-[#14532D] text-white border-[#14532D] shadow-sm" : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-emerald-600/40"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: `text-xs font-bold tabular-nums ${isSelected ? "text-amber-300" : "text-[var(--text-secondary)]"}`,
													children: [
														prophet.order,
														". ",
														parentNode ? `Line of ${parentNode.name.replace("Prophet ", "")}` : "Origin"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-extrabold truncate mt-0.5",
													children: prophet.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `text-xs truncate ${isSelected ? "text-emerald-100/85" : "text-[var(--text-secondary)]"}`,
													children: prophet.keySurahs
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `font-arabic-uthmani text-2xl shrink-0 ${isSelected ? "text-amber-200" : "text-[#14532D] dark:text-emerald-200"}`,
											children: prophet.arabicName
										})]
									}, prophet.id);
								})
							})
						] }),
						activeModule === "new_muslim" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl bg-gradient-to-br from-[#14532D] to-[#1A6338] text-white p-5 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-amber-300 text-xs font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Welcome Home · Step-by-Step Companion" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-extrabold tabular-nums text-emerald-100",
										children: [
											completedStages.length,
											"/",
											NEW_MUSLIM_PATHWAY_STAGES.length,
											" Completed"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-emerald-50 leading-relaxed",
									children: "Take Islam at a peaceful, sustainable pace. Complete each stage offline and jump directly into Wudu, Qibla, Quran, or Duas whenever you are ready."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 rounded-full bg-white/20 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-amber-300 transition-all duration-300",
										style: { width: `${Math.round(completedStages.length / NEW_MUSLIM_PATHWAY_STAGES.length * 100)}%` }
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: NEW_MUSLIM_PATHWAY_STAGES.map((stage) => {
								const isDone = completedStages.includes(stage.id);
								const isExpanded = expandedStageId === stage.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											triggerLightHaptic();
											setExpandedStageId(isExpanded ? "" : stage.id);
										},
										className: "w-full p-4 text-left flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 ${isDone ? "bg-[#22C55E] text-emerald-950" : "bg-emerald-50 dark:bg-emerald-900/50 text-[#14532D] dark:text-emerald-200"}`,
												children: isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-5 h-5" }) : stage.stageNumber
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-extrabold text-[var(--text-primary)]",
													children: stage.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-[var(--text-secondary)]",
													children: [
														stage.subtitle,
														" · ",
														stage.estimatedMinutes,
														" min"
													]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-[#14532D] dark:text-emerald-300 shrink-0",
											children: isExpanded ? "Hide" : "Open"
										})]
									}), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "px-4 pb-4 pt-1 border-t border-[var(--border-subtle)] space-y-3.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-[var(--text-secondary)] leading-relaxed",
												children: stage.summary
											}),
											stage.keyArabic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl bg-[#FDFBF7] dark:bg-emerald-950/60 border border-amber-200/80 dark:border-emerald-700/40 p-4 text-center space-y-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														dir: "rtl",
														className: "font-arabic-uthmani text-2xl text-[#14532D] dark:text-amber-200 leading-loose",
														children: stage.keyArabic.arabic
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-[var(--text-primary)]",
														children: stage.keyArabic.transliteration
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-[var(--text-secondary)]",
														children: stage.keyArabic.meaning
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "space-y-2",
												children: stage.actionSteps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "text-xs text-[var(--text-primary)] flex items-start gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-extrabold text-emerald-700 dark:text-emerald-300 tabular-nums",
														children: [i + 1, "."]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step })]
												}, i))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap gap-2 pt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => toggleNewMuslimStage(stage.id),
													className: `min-h-[44px] px-4 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition active:scale-95 ${isDone ? "bg-emerald-100 dark:bg-emerald-900/60 text-[#14532D] dark:text-emerald-100" : "bg-[#14532D] text-white"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isDone ? "Completed" : "Mark Stage Complete" })]
												}), stage.recommendedRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														onClose();
														onNavigateAdultRoute(stage.recommendedRoute);
													},
													className: "min-h-[44px] px-4 rounded-2xl bg-amber-400 text-emerald-950 text-xs font-extrabold active:scale-95 transition",
													children: stage.recommendedRouteLabel
												})]
											})
										]
									})]
								}, stage.id);
							})
						})] }),
						activeModule === "friday_hub" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-gradient-to-br from-[#14532D] via-[#176135] to-[#0E3B20] text-white p-5 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-amber-300 text-xs font-bold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isFridayToday ? "Jumu’ah Mubarak Today" : "Weekly Friday Sunnah Prep" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-extrabold tabular-nums text-emerald-100",
											children: [
												fridayCheckedIds.length,
												"/",
												FRIDAY_SUNNAH_CHECKLIST.length,
												" Sunnahs"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-extrabold",
										children: "The Best Day the Sun Rises Upon"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-emerald-100/90 leading-relaxed",
										children: "Revive the blessed Friday Sunnahs—read Surah Al-Kahf, send abundant Salawat upon Prophet Muhammad ﷺ, and guard the golden hour of Du’a before Maghrib."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2.5 pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												onClose();
												onOpenSurahInReader(18);
											},
											className: "min-h-[48px] rounded-2xl bg-amber-400 text-emerald-950 font-extrabold text-xs px-3 flex items-center justify-center gap-2 active:scale-95 transition",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Surah Al-Kahf" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: incrementSalawat,
											className: "min-h-[48px] rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-extrabold text-xs px-3 flex items-center justify-center gap-2 active:scale-95 transition tabular-nums",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-4 h-4 text-amber-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Salawat (",
												salawatCount,
												")"
											] })]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-[var(--bg-surface)] border border-amber-200 dark:border-amber-500/30 p-4 text-center space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-amber-700 dark:text-amber-300",
										children: "Durood / Salawat upon Prophet Muhammad ﷺ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										dir: "rtl",
										className: "font-arabic-uthmani text-2xl text-[#14532D] dark:text-emerald-100",
										children: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[var(--text-secondary)]",
										children: "Tap the Salawat button above to count your Durood this Friday (auto-checks at 10+)."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2.5",
								children: FRIDAY_SUNNAH_CHECKLIST.map((item) => {
									const checked = fridayCheckedIds.includes(item.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => toggleFridaySunnah(item.id),
										className: `w-full rounded-2xl border p-4 text-left flex items-start gap-3 transition active:scale-[0.99] ${checked ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400/70" : "bg-[var(--bg-surface)] border-[var(--border-subtle)]"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 ${checked ? "bg-[#14532D] border-[#14532D] text-white" : "border-slate-300 dark:border-emerald-700"}`,
											children: checked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-extrabold text-[var(--text-primary)]",
													children: item.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-[var(--text-secondary)] mt-0.5",
													children: item.subtitle
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-semibold text-amber-700 dark:text-amber-300 mt-1",
													children: item.source
												})
											]
										})]
									}, item.id);
								})
							})
						] }),
						activeModule === "car_drive" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-[#0F2C20] border border-emerald-700/60 p-6 text-center space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 text-xs font-bold text-emerald-200",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, { className: "w-4 h-4 text-amber-300" }), "Eyes-On-Road Mode"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SleepTimerTriggerButton, {
											variant: "dark",
											compact: true,
											onClick: () => setSleepSheetOpen(true)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "py-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-arabic-uthmani text-4xl text-amber-300",
												children: drivePreset.arabic
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
												className: "text-2xl font-black text-white mt-2",
												children: ["Surah ", drivePreset.name]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-emerald-200/85 mt-1 tabular-nums",
												children: audioState.status === "playing" || audioState.status === "paused" ? `Ayah ${audioState.quranSequence.currentAyah || 1} of ${audioState.quranSequence.endAyah || drivePreset.ayahs} · ${audioState.status === "playing" ? "Reciting" : "Paused"}` : `${drivePreset.ayahs} Ayahs · Tap Play for Continuous Recitation`
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-3 gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => handleDriveStepAyah(-1),
												"aria-label": "Previous Ayah",
												className: "min-h-[80px] rounded-3xl bg-white/10 hover:bg-white/20 border border-white/15 flex flex-col items-center justify-center gap-1 active:scale-95 transition",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { className: "w-7 h-7 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-emerald-100",
													children: "Previous"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: handleDriveTogglePlay,
												"aria-label": audioState.status === "playing" ? "Pause Recitation" : "Play Recitation",
												className: "min-h-[80px] rounded-3xl bg-amber-400 hover:bg-amber-300 text-emerald-950 flex flex-col items-center justify-center gap-1 shadow-lg active:scale-95 transition",
												children: [audioState.status === "playing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-9 h-9 fill-emerald-950" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-9 h-9 fill-emerald-950 ml-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-black",
													children: audioState.status === "playing" ? "Pause" : "Play"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => handleDriveStepAyah(1),
												"aria-label": "Next Ayah",
												className: "min-h-[80px] rounded-3xl bg-white/10 hover:bg-white/20 border border-white/15 flex flex-col items-center justify-center gap-1 active:scale-95 transition",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "w-7 h-7 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-emerald-100",
													children: "Next"
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: handleDriveCycleSpeed,
											className: "min-h-[54px] rounded-2xl bg-white/10 border border-white/15 text-xs sm:text-sm font-extrabold text-amber-200 active:scale-[0.98] transition tabular-nums",
											children: [
												"Speed: ",
												driveSpeed,
												"x"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleDriveNextQueueSurah,
											className: "min-h-[54px] rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-xs sm:text-sm font-extrabold text-emerald-100 active:scale-[0.98] transition",
											children: "Next Surah in Queue →"
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-extrabold text-white",
										children: [
											"Your Custom Drive Playlist (",
											driveQueue.length,
											" Surahs)"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-emerald-200/75",
										children: "Add any of the 114 Surahs · Lock-screen controls ready"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												triggerSelectionHaptic();
												setAutoAdvanceQueue((v) => !v);
											},
											className: `min-h-[38px] px-3 rounded-xl text-[11px] font-extrabold border transition ${autoAdvanceQueue ? "bg-emerald-500 text-emerald-950 border-emerald-300" : "bg-white/10 text-emerald-100 border-white/15"}`,
											children: ["Auto-Next: ", autoAdvanceQueue ? "ON" : "OFF"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												triggerLightHaptic();
												setQueueEditorOpen(true);
											},
											className: "min-h-[38px] px-3 rounded-xl bg-amber-400 text-emerald-950 text-[11px] font-extrabold inline-flex items-center gap-1 active:scale-95 transition",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListMusic, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Edit Queue" })]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-3",
									children: driveQueue.map((surahNum, queueIdx) => {
										const info = resolveDriveSurahInfo(surahNum);
										const active = driveSurahNumber === info.number;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleDrivePlaySurah(info.number),
											className: `min-h-[78px] rounded-3xl border p-4 text-left flex flex-col justify-between transition active:scale-95 ${active ? "bg-emerald-500 text-emerald-950 border-emerald-300" : "bg-[#0F2C20] text-white border-emerald-800/80 hover:border-emerald-500/60"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-sm sm:text-base font-black truncate",
													children: [
														queueIdx + 1,
														". ",
														info.name
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-arabic-uthmani text-lg shrink-0",
													children: info.arabic
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `text-xs font-semibold tabular-nums ${active ? "text-emerald-950/80" : "text-emerald-200/75"}`,
												children: [
													info.tag,
													" · ",
													info.ayahs,
													" Ayahs"
												]
											})]
										}, `${info.number}-${queueIdx}`);
									})
								})]
							})]
						}),
						activeModule === "reminder_cards" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										triggerSelectionHaptic();
										setReminderMode("curated");
									},
									className: `min-h-[42px] rounded-xl text-xs font-extrabold transition ${reminderMode === "curated" ? "bg-[#14532D] text-amber-300 shadow-2xs" : "text-[var(--text-secondary)]"}`,
									children: [
										"Curated Cards (",
										ISLAMIC_REMINDER_CARDS.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										triggerSelectionHaptic();
										setReminderMode("any_ayah");
									},
									className: `min-h-[42px] rounded-xl text-xs font-extrabold transition ${reminderMode === "any_ayah" ? "bg-[#14532D] text-amber-300 shadow-2xs" : "text-[var(--text-secondary)]"}`,
									children: "Any Qur'an Ayah (6,236)"
								})]
							}),
							reminderMode === "curated" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2 overflow-x-auto pb-1",
								children: [
									"All",
									"Ease & Patience",
									"Gratitude",
									"Trust in Allah",
									"Mercy",
									"Family",
									"Knowledge"
								].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										triggerLightHaptic();
										setReminderCategory(cat);
										setActiveReminderIndex(0);
									},
									className: `min-h-[42px] px-3.5 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 border transition ${reminderCategory === cat ? "bg-[#14532D] text-white border-[#14532D]" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
									children: cat
								}, cat))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 space-y-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
										title: "Choose Any Surah (1–114)",
										subtitle: "Turn any verse of the Qur'an into a shareable card",
										ariaLabel: "Select Surah for Reminder Card",
										searchable: true,
										searchPlaceholder: "Search Surah name or number…",
										value: String(pickerSurahNum),
										onChange: (val) => {
											setPickerSurahNum(Number(val));
											setPickerAyahNum(1);
										},
										options: ALL_114_SURAHS.map((s) => ({
											value: String(s.number),
											label: `${s.number}. ${s.nameTranslit}`,
											subtitle: `${s.nameEnglish} · ${s.nameArabic}`,
											badge: `${s.ayahCount} ayahs`
										}))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-3 py-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-extrabold text-[var(--text-secondary)]",
											children: "Ayah"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setPickerAyahNum((a) => Math.max(1, a - 1)),
													className: "min-w-[36px] min-h-[36px] rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm font-black text-[var(--text-primary)]",
													children: "−"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													min: 1,
													max: ALL_114_SURAHS[pickerSurahNum - 1]?.ayahCount || 7,
													value: pickerAyahNum,
													onChange: (e) => {
														const max = ALL_114_SURAHS[pickerSurahNum - 1]?.ayahCount || 7;
														setPickerAyahNum(Math.max(1, Math.min(max, Number(e.target.value) || 1)));
													},
													className: "w-16 text-center text-xs font-black text-[var(--text-primary)] bg-transparent tabular-nums"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														const max = ALL_114_SURAHS[pickerSurahNum - 1]?.ayahCount || 7;
														setPickerAyahNum((a) => Math.min(max, a + 1));
													},
													className: "min-w-[36px] min-h-[36px] rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm font-black text-[var(--text-primary)]",
													children: "+"
												})
											]
										})]
									})]
								}), loadingCustomAyah && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold text-amber-700 dark:text-amber-300",
									children: "Loading verified Ayah text…"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-3xl border p-6 sm:p-8 text-center space-y-4 shadow-md transition-colors ${activeThemeStyle.bg} ${activeThemeStyle.border}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-xs font-extrabold tracking-wide ${activeThemeStyle.accent}`,
										children: reminderMode === "any_ayah" ? "Noble Qur’an · Custom Ayah Card" : `${currentReminder.category} · ${activeReminderIndex + 1} of ${filteredReminders.length}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										dir: "rtl",
										className: `font-arabic-uthmani text-2xl sm:text-3xl leading-loose ${activeThemeStyle.arabic}`,
										children: currentReminder.arabic
									}),
									currentReminder.transliteration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-xs italic opacity-85 ${activeThemeStyle.body}`,
										children: currentReminder.transliteration
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: `text-base sm:text-lg font-bold leading-relaxed max-w-xl mx-auto ${activeThemeStyle.body}`,
										children: [
											"“",
											currentReminder.translation,
											"”"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-xs font-extrabold pt-2 ${activeThemeStyle.accent}`,
										children: currentReminder.source
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[var(--text-secondary)]",
									children: "Card Style"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: [
										{
											id: "emerald",
											label: "Emerald"
										},
										{
											id: "ivory",
											label: "Ivory"
										},
										{
											id: "gold",
											label: "Gold"
										},
										{
											id: "midnight",
											label: "Night"
										}
									].map((th) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											triggerLightHaptic();
											setReminderTheme(th.id);
										},
										className: `min-h-[38px] px-3 rounded-xl text-xs font-bold transition ${reminderTheme === th.id ? "bg-[#14532D] text-white" : "bg-[var(--bg-elevated)] text-[var(--text-secondary)]"}`,
										children: th.label
									}, th.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5",
								children: [
									reminderMode === "curated" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											triggerLightHaptic();
											setActiveReminderIndex((i) => (i - 1 + filteredReminders.length) % filteredReminders.length);
										},
										className: "min-h-[46px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] active:scale-95 transition",
										children: "Previous Card"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											triggerLightHaptic();
											setActiveReminderIndex((i) => (i + 1) % filteredReminders.length);
										},
										className: "min-h-[46px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] active:scale-95 transition",
										children: "Next Card"
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											triggerLightHaptic();
											setPickerAyahNum((a) => Math.max(1, a - 1));
										},
										className: "min-h-[46px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] active:scale-95 transition",
										children: "Prev Ayah"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											triggerLightHaptic();
											const max = ALL_114_SURAHS[pickerSurahNum - 1]?.ayahCount || 7;
											setPickerAyahNum((a) => Math.min(max, a + 1));
										},
										className: "min-h-[46px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] active:scale-95 transition",
										children: "Next Ayah"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleDownloadReminderCard,
										className: "min-h-[46px] rounded-2xl bg-[#14532D] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 active:scale-95 transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save PNG" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => void handleShareReminder(),
										className: "min-h-[46px] rounded-2xl bg-amber-400 text-emerald-950 text-xs font-extrabold flex items-center justify-center gap-1.5 active:scale-95 transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Share" })]
									})
								]
							}),
							shareToast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-bold text-center text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shareToast })]
							})
						] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
				open: queueEditorOpen,
				onClose: () => setQueueEditorOpen(false),
				title: "Custom Car Drive Playlist",
				subtitle: "Add any of the 114 Surahs and reorder your hands-free listening queue.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
								title: "Add Surah to Drive Queue",
								subtitle: "Choose from all 114 Surahs",
								ariaLabel: "Add Surah to Drive Queue",
								searchable: true,
								searchPlaceholder: "Search Surah name or number…",
								value: queueAddSurahVal,
								onChange: (val) => setQueueAddSurahVal(val),
								options: ALL_114_SURAHS.map((s) => ({
									value: String(s.number),
									label: `${s.number}. ${s.nameTranslit}`,
									subtitle: `${s.nameEnglish} · ${s.nameArabic}`,
									badge: `${s.ayahCount} ayahs`
								}))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								const num = Number(queueAddSurahVal);
								if (!driveQueue.includes(num)) {
									triggerSuccessHaptic();
									persistDriveQueue([...driveQueue, num]);
								} else triggerLightHaptic();
							},
							className: "min-h-[44px] px-4 rounded-2xl bg-[#14532D] text-white text-xs font-extrabold inline-flex items-center gap-1 shrink-0 active:scale-95 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 max-h-[48vh] overflow-y-auto pr-1",
						children: driveQueue.map((num, idx) => {
							const info = resolveDriveSurahInfo(num);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-3.5 py-2.5 flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-extrabold text-[var(--text-primary)] truncate",
										children: [
											idx + 1,
											". Surah ",
											info.name,
											" (",
											info.number,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-[var(--text-secondary)]",
										children: [
											info.arabic,
											" · ",
											info.ayahs,
											" Ayahs"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 shrink-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: idx === 0,
											onClick: () => {
												const copy = [...driveQueue];
												[copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
												persistDriveQueue(copy);
											},
											className: "w-8 h-8 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center disabled:opacity-30",
											"aria-label": "Move Up",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "w-3.5 h-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: idx === driveQueue.length - 1,
											onClick: () => {
												const copy = [...driveQueue];
												[copy[idx + 1], copy[idx]] = [copy[idx], copy[idx + 1]];
												persistDriveQueue(copy);
											},
											className: "w-8 h-8 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center disabled:opacity-30",
											"aria-label": "Move Down",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "w-3.5 h-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: driveQueue.length <= 1,
											onClick: () => {
												persistDriveQueue(driveQueue.filter((s) => s !== num));
											},
											className: "w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-300 flex items-center justify-center disabled:opacity-30",
											"aria-label": "Remove Surah",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
										})
									]
								})]
							}, `${num}-${idx}`);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SleepTimerSheet, {
				open: sleepSheetOpen,
				onClose: () => setSleepSheetOpen(false),
				title: "Drive Sleep Timer"
			})
		]
	});
};
// src/components/adult/SurahMemorizationCheckCard.tsx
var SurahMemorizationCheckCard = ({ defaultSurahNumber = 112, reciterName = "Mishary Rashid Alafasy", onCompleteCheck }) => {
	const [scriptStyle] = useQuranScriptStyle();
	const [selectedSurah, setSelectedSurah] = (0, import_react.useState)(defaultSurahNumber);
	const [difficulty, setDifficulty] = (0, import_react.useState)("key_words");
	const [ayahs, setAyahs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [offlineNote, setOfflineNote] = (0, import_react.useState)(null);
	const [activeIdx, setActiveIdx] = (0, import_react.useState)(0);
	const [revealedWordIndices, setRevealedWordIndices] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [revealFullAyah, setRevealFullAyah] = (0, import_react.useState)(false);
	const [grades, setGrades] = (0, import_react.useState)({});
	const [sessionFinished, setSessionFinished] = (0, import_react.useState)(false);
	const surahMeta = (0, import_react.useMemo)(() => ALL_114_SURAHS.find((s) => s.number === selectedSurah) || ALL_114_SURAHS[111], [selectedSurah]);
	const surahOptions = (0, import_react.useMemo)(() => ALL_114_SURAHS.map((s) => ({
		value: String(s.number),
		label: `${s.number}. ${s.nameTranslit} (${s.ayahCount} Ayahs)`,
		subtitle: `${s.nameEnglish} · ${s.nameArabic}`
	})), []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoading(true);
		setOfflineNote(null);
		setActiveIdx(0);
		setRevealedWordIndices(/* @__PURE__ */ new Set());
		setRevealFullAyah(false);
		setGrades({});
		setSessionFinished(false);
		getSurahPayload(selectedSurah, "en", reciterName).then((res) => {
			if (cancelled) return;
			setAyahs(res.ayahs.slice(0, 15));
			if (res.offlineUnavailable || res.ayahs.length === 0) setOfflineNote("Download this Surah in Offline Storage to run Memorization Check without internet.");
			setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [selectedSurah, reciterName]);
	const currentAyah = ayahs[activeIdx];
	const words = (0, import_react.useMemo)(() => {
		if (!currentAyah) return [];
		return formatAyahTextForScript(currentAyah.arabicUthmani, scriptStyle).trim().split(/\s+/).filter(Boolean);
	}, [currentAyah, scriptStyle]);
	const isWordHiddenByDefault = (idx) => {
		if (revealFullAyah || revealedWordIndices.has(idx)) return false;
		if (difficulty === "full_blind") return true;
		if (difficulty === "first_word") return idx > 0;
		return idx > 0 && idx % 2 === 1;
	};
	const toggleRevealWord = (idx) => {
		triggerLightHaptic();
		setRevealedWordIndices((prev) => {
			const next = new Set(prev);
			next.add(idx);
			return next;
		});
	};
	const handlePlayVerificationAudio = () => {
		if (!currentAyah) return;
		triggerLightHaptic();
		audioManager.playAyahRange({
			surahNumber: selectedSurah,
			startAyah: currentAyah.numberInSurah,
			endAyah: currentAyah.numberInSurah,
			reciterName
		});
	};
	const handleGrade = (grade) => {
		if (!currentAyah) return;
		const nextGrades = {
			...grades,
			[currentAyah.numberInSurah]: grade
		};
		setGrades(nextGrades);
		grade === "solid" ? triggerSuccessHaptic() : triggerLightHaptic();
		if (activeIdx + 1 < ayahs.length) {
			setActiveIdx((i) => i + 1);
			setRevealedWordIndices(/* @__PURE__ */ new Set());
			setRevealFullAyah(false);
		} else {
			setSessionFinished(true);
			const totalChecked = ayahs.length;
			const solidCount = Object.values(nextGrades).filter((g) => g === "solid").length;
			const hesitatedCount = Object.values(nextGrades).filter((g) => g === "hesitated").length;
			const accuracyPct = totalChecked > 0 ? Math.round((solidCount + hesitatedCount * .5) / totalChecked * 100) : 0;
			onCompleteCheck?.({
				surahNumber: selectedSurah,
				surahName: surahMeta.nameTranslit,
				accuracyPct,
				solidCount,
				totalChecked
			});
		}
	};
	const handleRestart = () => {
		triggerLightHaptic();
		setActiveIdx(0);
		setRevealedWordIndices(/* @__PURE__ */ new Set());
		setRevealFullAyah(false);
		setGrades({});
		setSessionFinished(false);
	};
	const summaryStats = (0, import_react.useMemo)(() => {
		const vals = Object.values(grades);
		const solid = vals.filter((g) => g === "solid").length;
		const hesitated = vals.filter((g) => g === "hesitated").length;
		const forgot = vals.filter((g) => g === "forgot").length;
		const total = ayahs.length || 1;
		return {
			solid,
			hesitated,
			forgot,
			total,
			scorePct: Math.round((solid + hesitated * .5) / total * 100)
		};
	}, [grades, ayahs.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 sm:p-5 shadow-xs space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-amber-600 dark:text-amber-300",
						children: "Memory Verification Drill"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-extrabold text-[var(--text-primary)]",
						children: "Surah Memorization Check"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-[var(--text-secondary)] mt-0.5",
						children: "Recite from memory, tap masked blanks to peek, and score each Ayah honestly."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleRestart,
					"aria-label": "Restart memorization check",
					className: "min-w-[44px] min-h-[44px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[#14532D] dark:hover:text-emerald-200 flex items-center justify-center shrink-0 transition active:scale-95",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-4 h-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-[var(--text-secondary)]",
						children: "Surah to Test"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
						title: "Select Surah to Test",
						value: String(selectedSurah),
						options: surahOptions,
						onChange: (val) => setSelectedSurah(Number(val)),
						searchable: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-[var(--text-secondary)]",
						children: "Recall Mode"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-1 p-1 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
						children: [
							{
								id: "key_words",
								label: "Blanks"
							},
							{
								id: "first_word",
								label: "1st Word"
							},
							{
								id: "full_blind",
								label: "Full Blind"
							}
						].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								triggerLightHaptic();
								setDifficulty(opt.id);
								setRevealedWordIndices(/* @__PURE__ */ new Set());
								setRevealFullAyah(false);
							},
							className: `min-h-[40px] rounded-xl text-xs font-bold whitespace-nowrap transition ${difficulty === opt.id ? "bg-[#14532D] text-white shadow-2xs" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`,
							children: opt.label
						}, opt.id))
					})]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-10 text-center text-xs font-semibold text-[var(--text-secondary)]",
				children: [
					"Loading ",
					surahMeta.nameTranslit,
					" verses…"
				]
			}) : offlineNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-700/40 p-4 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: offlineNote })]
			}) : sessionFinished ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/40 p-5 text-center space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-2xl bg-[#14532D] text-amber-300 mx-auto flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-6 h-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-bold text-emerald-700 dark:text-emerald-300",
							children: [surahMeta.nameTranslit, " · Check Complete"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-3xl font-black text-[#14532D] dark:text-emerald-100 tabular-nums mt-1",
							children: [summaryStats.scorePct, "% Accuracy"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-[var(--text-secondary)] mt-1 tabular-nums",
							children: [
								summaryStats.solid,
								" Solid · ",
								summaryStats.hesitated,
								" Hesitated ·",
								" ",
								summaryStats.forgot,
								" Needs Review"
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleRestart,
						className: "min-h-[44px] px-5 rounded-2xl bg-[#14532D] text-white text-xs font-extrabold inline-flex items-center gap-2 active:scale-95 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Retest ", surahMeta.nameTranslit] })]
					})
				]
			}) : currentAyah ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-[var(--text-secondary)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold tabular-nums",
							children: [
								"Ayah ",
								activeIdx + 1,
								" of ",
								ayahs.length,
								" · ",
								surahMeta.nameTranslit
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [Object.keys(grades).length, " checked"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 rounded-full bg-slate-200 dark:bg-emerald-950 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-gradient-to-r from-[#14532D] to-[#22C55E] transition-all duration-300",
							style: { width: `${Math.round((activeIdx + 1) / ayahs.length * 100)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						dir: "rtl",
						className: "rounded-2xl bg-[#FDFBF7] dark:bg-emerald-950/60 border border-amber-200/80 dark:border-emerald-700/40 p-5 min-h-[120px] flex flex-wrap items-center justify-center gap-x-2.5 gap-y-3",
						children: words.map((word, idx) => {
							const hidden = isWordHiddenByDefault(idx);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggleRevealWord(idx),
								"aria-label": hidden ? `Reveal hidden word ${idx + 1}` : word,
								className: `min-h-[44px] px-3 py-1.5 rounded-xl transition active:scale-95 ${hidden ? "bg-emerald-900/10 dark:bg-emerald-400/15 border border-dashed border-emerald-700/40 dark:border-emerald-300/40 text-transparent select-none min-w-[68px]" : `${getArabicScriptFontClass(scriptStyle)} text-2xl sm:text-3xl text-[#14532D] dark:text-emerald-50`}`,
								children: hidden ? "••••" : word
							}, `${currentAyah.numberInSurah}_${idx}`);
						})
					}),
					revealFullAyah && currentAyah.translations?.en && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-[var(--text-secondary)] text-center leading-relaxed px-2",
						children: [
							"“",
							currentAyah.translations.en,
							"”"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								triggerLightHaptic();
								setRevealFullAyah((v) => !v);
							},
							className: "min-h-[46px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-2 active:scale-[0.98] transition",
							children: [revealFullAyah ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: revealFullAyah ? "Hide Ayah" : "Reveal Full Ayah" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handlePlayVerificationAudio,
							className: "min-h-[46px] rounded-2xl bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-400/40 text-xs font-extrabold text-amber-950 dark:text-amber-100 flex items-center justify-center gap-2 active:scale-[0.98] transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verify Audio" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-semibold text-[var(--text-secondary)] text-center",
							children: [
								"How well did you recite Ayah ",
								currentAyah.numberInSurah,
								" from memory?"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleGrade("forgot"),
									className: "min-h-[48px] rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 text-rose-800 dark:text-rose-200 text-xs font-extrabold active:scale-95 transition",
									children: "Forgot"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleGrade("hesitated"),
									className: "min-h-[48px] rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/40 text-amber-900 dark:text-amber-200 text-xs font-extrabold active:scale-95 transition",
									children: "Hesitated"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => handleGrade("solid"),
									className: "min-h-[48px] rounded-2xl bg-[#14532D] text-white text-xs font-extrabold flex items-center justify-center gap-1 active:scale-95 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Solid" })]
								})
							]
						})]
					})
				]
			}) : null
		]
	});
};
// src/services/mushafPaginationEngine.ts
var READER_PREFS_KEY = "ilmizo_quran_reader_prefs_v1";
var ARABIC_INDIC_DIGITS = [
	"٠",
	"١",
	"٢",
	"٣",
	"٤",
	"٥",
	"٦",
	"٧",
	"٨",
	"٩"
];
function toArabicIndicNumber(num) {
	return String(Math.max(0, Math.floor(num))).split("").map((ch) => ARABIC_INDIC_DIGITS[Number(ch)] ?? ch).join("");
}
function formatOrnamentalAyahMarker(ayahNumber) {
	return `﴿${toArabicIndicNumber(ayahNumber)}﴾`;
}
function loadQuranReaderPreferences() {
	if (typeof localStorage === "undefined") return {
		viewMode: "card",
		mushafParchmentTheme: "ivory",
		quranScriptStyle: "uthmani",
		lastPageBySurah: {},
		bookmarkedPages: []
	};
	try {
		const raw = localStorage.getItem(READER_PREFS_KEY);
		if (!raw) return {
			viewMode: "card",
			mushafParchmentTheme: "ivory",
			quranScriptStyle: "uthmani",
			lastPageBySurah: {},
			bookmarkedPages: []
		};
		const parsed = JSON.parse(raw);
		return {
			viewMode: parsed.viewMode === "mushaf" || parsed.viewMode === "study" || parsed.viewMode === "card" ? parsed.viewMode : "card",
			mushafParchmentTheme: parsed.mushafParchmentTheme === "sepia" || parsed.mushafParchmentTheme === "night" || parsed.mushafParchmentTheme === "ivory" ? parsed.mushafParchmentTheme : "ivory",
			quranScriptStyle: parsed.quranScriptStyle === "indopak" ? "indopak" : "uthmani",
			lastPageBySurah: parsed.lastPageBySurah && typeof parsed.lastPageBySurah === "object" ? parsed.lastPageBySurah : {},
			bookmarkedPages: Array.isArray(parsed.bookmarkedPages) ? parsed.bookmarkedPages : []
		};
	} catch {
		return {
			viewMode: "card",
			mushafParchmentTheme: "ivory",
			quranScriptStyle: "uthmani",
			lastPageBySurah: {},
			bookmarkedPages: []
		};
	}
}
function saveQuranReaderPreferences(prefs) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(READER_PREFS_KEY, JSON.stringify(prefs));
	} catch {}
}
/**
* Groups Surah Ayahs into calm, distraction-free Reflowable Uthmani Mushaf pages.
* - Uses authentic `ayah.mushafPage` grouping whenever present.
* - Falls back cleanly to balanced ~650-char / max-8-ayah reflowable pages when page metadata is absent.
* Never claims to be a scanned 15-line printed Mushaf.
*/
function buildReflowableMushafPages(ayahs) {
	if (!ayahs || ayahs.length === 0) return [];
	if (ayahs.every((a) => typeof a.mushafPage === "number" && Number.isFinite(a.mushafPage) && a.mushafPage > 0)) {
		const grouped = /* @__PURE__ */ new Map();
		for (const ayah of ayahs) {
			const pageNum = ayah.mushafPage;
			const list = grouped.get(pageNum) || [];
			list.push(ayah);
			grouped.set(pageNum, list);
		}
		return Array.from(grouped.entries()).map(([pageNum, list], idx) => ({
			pageIndex: idx,
			displayPageNumber: pageNum,
			isStandardMushafPageNumber: true,
			ayahs: list
		}));
	}
	const pages = [];
	let currentBucket = [];
	let charBudget = 0;
	for (const ayah of ayahs) {
		const len = (ayah.arabicUthmani || "").length;
		if (currentBucket.length > 0 && (charBudget + len > 680 || currentBucket.length >= 8)) {
			pages.push({
				pageIndex: pages.length,
				displayPageNumber: pages.length + 1,
				isStandardMushafPageNumber: false,
				ayahs: currentBucket
			});
			currentBucket = [];
			charBudget = 0;
		}
		currentBucket.push(ayah);
		charBudget += len;
	}
	if (currentBucket.length > 0) pages.push({
		pageIndex: pages.length,
		displayPageNumber: pages.length + 1,
		isStandardMushafPageNumber: false,
		ayahs: currentBucket
	});
	return pages;
}
/**
* Authentic 30 Juz starting pages in the standard 604-page Madani Mushaf.
*/
var JUZ_30_BOUNDARIES = [
	{
		juz: 1,
		nameArabic: "آلم",
		nameTranslit: "Alif Lam Mim",
		startPage: 1,
		endPage: 21,
		startSurah: 1,
		startAyah: 1
	},
	{
		juz: 2,
		nameArabic: "سَيَقُولُ",
		nameTranslit: "Sayaqul",
		startPage: 22,
		endPage: 41,
		startSurah: 2,
		startAyah: 142
	},
	{
		juz: 3,
		nameArabic: "تِلْكَ الرُّسُلُ",
		nameTranslit: "Tilkar Rusul",
		startPage: 42,
		endPage: 61,
		startSurah: 2,
		startAyah: 253
	},
	{
		juz: 4,
		nameArabic: "لَنْ تَنَالُوا",
		nameTranslit: "Lan Tanalu",
		startPage: 62,
		endPage: 81,
		startSurah: 3,
		startAyah: 93
	},
	{
		juz: 5,
		nameArabic: "وَالْمُحْصَنَاتُ",
		nameTranslit: "Wal Muhsanat",
		startPage: 82,
		endPage: 101,
		startSurah: 4,
		startAyah: 24
	},
	{
		juz: 6,
		nameArabic: "لَا يُحِبُّ اللَّهُ",
		nameTranslit: "La Yuhibbullah",
		startPage: 102,
		endPage: 121,
		startSurah: 4,
		startAyah: 148
	},
	{
		juz: 7,
		nameArabic: "وَإِذَا سَمِعُوا",
		nameTranslit: "Wa Idha Sami’u",
		startPage: 122,
		endPage: 141,
		startSurah: 5,
		startAyah: 82
	},
	{
		juz: 8,
		nameArabic: "وَلَوْ أَنَّنَا",
		nameTranslit: "Wa Law Annana",
		startPage: 142,
		endPage: 161,
		startSurah: 6,
		startAyah: 111
	},
	{
		juz: 9,
		nameArabic: "قَالَ الْمَلَأُ",
		nameTranslit: "Qalal Mala’u",
		startPage: 162,
		endPage: 181,
		startSurah: 7,
		startAyah: 88
	},
	{
		juz: 10,
		nameArabic: "وَاعْلَمُوا",
		nameTranslit: "Wa’lamu",
		startPage: 182,
		endPage: 201,
		startSurah: 8,
		startAyah: 41
	},
	{
		juz: 11,
		nameArabic: "يَعْتَذِرُونَ",
		nameTranslit: "Ya’tadhirun",
		startPage: 202,
		endPage: 221,
		startSurah: 9,
		startAyah: 93
	},
	{
		juz: 12,
		nameArabic: "وَمَا مِنْ دَابَّةٍ",
		nameTranslit: "Wa Ma Min Dabbah",
		startPage: 222,
		endPage: 241,
		startSurah: 11,
		startAyah: 6
	},
	{
		juz: 13,
		nameArabic: "وَمَا أُبَرِّئُ",
		nameTranslit: "Wa Ma Ubarri’u",
		startPage: 242,
		endPage: 261,
		startSurah: 12,
		startAyah: 53
	},
	{
		juz: 14,
		nameArabic: "رُبَمَا",
		nameTranslit: "Rubama",
		startPage: 262,
		endPage: 281,
		startSurah: 15,
		startAyah: 1
	},
	{
		juz: 15,
		nameArabic: "سُبْحَانَ الَّذِي",
		nameTranslit: "Subhanalladhi",
		startPage: 282,
		endPage: 301,
		startSurah: 17,
		startAyah: 1
	},
	{
		juz: 16,
		nameArabic: "قَالَ أَلَمْ",
		nameTranslit: "Qala Alam",
		startPage: 302,
		endPage: 321,
		startSurah: 18,
		startAyah: 75
	},
	{
		juz: 17,
		nameArabic: "اقْتَرَبَ لِلنَّاسِ",
		nameTranslit: "Iqtaraba lin-Nas",
		startPage: 322,
		endPage: 341,
		startSurah: 21,
		startAyah: 1
	},
	{
		juz: 18,
		nameArabic: "قَدْ أَفْلَحَ",
		nameTranslit: "Qad Aflaha",
		startPage: 342,
		endPage: 361,
		startSurah: 23,
		startAyah: 1
	},
	{
		juz: 19,
		nameArabic: "وَقَالَ الَّذِينَ",
		nameTranslit: "Wa Qalalladhina",
		startPage: 362,
		endPage: 381,
		startSurah: 25,
		startAyah: 21
	},
	{
		juz: 20,
		nameArabic: "أَمَّنْ خَلَقَ",
		nameTranslit: "Amman Khalaqa",
		startPage: 382,
		endPage: 401,
		startSurah: 27,
		startAyah: 56
	},
	{
		juz: 21,
		nameArabic: "اتْلُ مَا أُوحِيَ",
		nameTranslit: "Utlu Ma Uhiya",
		startPage: 402,
		endPage: 421,
		startSurah: 29,
		startAyah: 46
	},
	{
		juz: 22,
		nameArabic: "وَمَنْ يَقْنُتْ",
		nameTranslit: "Wa Man Yaqnut",
		startPage: 422,
		endPage: 441,
		startSurah: 33,
		startAyah: 31
	},
	{
		juz: 23,
		nameArabic: "وَمَا لِيَ",
		nameTranslit: "Wa Ma Liya",
		startPage: 442,
		endPage: 461,
		startSurah: 36,
		startAyah: 28
	},
	{
		juz: 24,
		nameArabic: "فَمَنْ أَظْلَمُ",
		nameTranslit: "Faman Azlamu",
		startPage: 462,
		endPage: 481,
		startSurah: 39,
		startAyah: 32
	},
	{
		juz: 25,
		nameArabic: "إِلَيْهِ يُرَدُّ",
		nameTranslit: "Ilayhi Yuraddu",
		startPage: 482,
		endPage: 501,
		startSurah: 41,
		startAyah: 47
	},
	{
		juz: 26,
		nameArabic: "حم",
		nameTranslit: "Ha Mim",
		startPage: 502,
		endPage: 521,
		startSurah: 46,
		startAyah: 1
	},
	{
		juz: 27,
		nameArabic: "قَالَ فَمَا خَطْبُكُمْ",
		nameTranslit: "Qala Fama Khatbukum",
		startPage: 522,
		endPage: 541,
		startSurah: 51,
		startAyah: 31
	},
	{
		juz: 28,
		nameArabic: "قَدْ سَمِعَ اللَّهُ",
		nameTranslit: "Qad Sami’allah",
		startPage: 542,
		endPage: 561,
		startSurah: 58,
		startAyah: 1
	},
	{
		juz: 29,
		nameArabic: "تَبَارَكَ الَّذِي",
		nameTranslit: "Tabarakalladhi",
		startPage: 562,
		endPage: 581,
		startSurah: 67,
		startAyah: 1
	},
	{
		juz: 30,
		nameArabic: "عَمَّ",
		nameTranslit: "Amma (Juz Amma)",
		startPage: 582,
		endPage: 604,
		startSurah: 78,
		startAyah: 1
	}
];
/**
* Exact starting Madani Mushaf page (1..604) for each of the 114 Surahs (index 0 = Surah 1).
* Verified against the King Fahd Complex 604-page Madani Mushaf.
*/
var SURAH_START_PAGES = [
	1,
	2,
	50,
	77,
	106,
	128,
	151,
	177,
	187,
	208,
	221,
	235,
	249,
	255,
	262,
	267,
	282,
	293,
	305,
	312,
	322,
	332,
	342,
	350,
	359,
	367,
	377,
	385,
	396,
	404,
	411,
	415,
	418,
	428,
	434,
	440,
	446,
	453,
	458,
	467,
	477,
	483,
	489,
	496,
	499,
	502,
	507,
	511,
	515,
	518,
	520,
	523,
	526,
	528,
	531,
	534,
	537,
	542,
	545,
	549,
	551,
	553,
	554,
	556,
	558,
	560,
	562,
	564,
	566,
	568,
	570,
	572,
	574,
	575,
	577,
	578,
	580,
	582,
	583,
	585,
	586,
	587,
	587,
	589,
	590,
	591,
	591,
	592,
	593,
	594,
	595,
	595,
	596,
	596,
	597,
	597,
	598,
	598,
	599,
	599,
	600,
	600,
	601,
	601,
	601,
	602,
	602,
	602,
	603,
	603,
	603,
	604,
	604,
	604
];
function getJuzForMushafPage(page) {
	const clamped = Math.max(1, Math.min(604, Math.floor(page)));
	for (let i = JUZ_30_BOUNDARIES.length - 1; i >= 0; i--) if (clamped >= JUZ_30_BOUNDARIES[i].startPage) return JUZ_30_BOUNDARIES[i].juz;
	return 1;
}
function buildCanonical604Pages() {
	const pages = [];
	for (let page = 1; page <= 604; page++) {
		const juz = getJuzForMushafPage(page);
		const surahsOnPage = [];
		for (let s = 1; s <= 114; s++) {
			const startP = SURAH_START_PAGES[s - 1];
			const nextStartP = s < 114 ? SURAH_START_PAGES[s] : 604;
			const endP = s === 114 ? 604 : Math.max(startP, nextStartP - (nextStartP > startP ? 1 : 0));
			if (page >= startP && page <= endP) surahsOnPage.push(s);
		}
		if (surahsOnPage.length === 0) {
			let fallbackSurah = 1;
			for (let s = 1; s <= 114; s++) if (SURAH_START_PAGES[s - 1] <= page) fallbackSurah = s;
			surahsOnPage.push(fallbackSurah);
		}
		const startSurah = surahsOnPage[0];
		const endSurah = surahsOnPage[surahsOnPage.length - 1];
		const startMeta = ALL_114_SURAHS[startSurah - 1];
		const endMeta = ALL_114_SURAHS[endSurah - 1];
		const surahStartP = SURAH_START_PAGES[startSurah - 1];
		const nextSurahStartP = startSurah < 114 ? SURAH_START_PAGES[startSurah] : 605;
		const surahSpanPages = Math.max(1, nextSurahStartP - surahStartP);
		let startAyah = 1;
		let endAyah = endMeta.ayahCount;
		if (startSurah === endSurah && surahSpanPages > 1) {
			const offset = page - surahStartP;
			startAyah = Math.max(1, Math.floor(offset * startMeta.ayahCount / surahSpanPages) + 1);
			endAyah = offset === surahSpanPages - 1 ? startMeta.ayahCount : Math.max(startAyah, Math.floor((offset + 1) * startMeta.ayahCount / surahSpanPages));
		}
		pages.push({
			page,
			juz,
			startSurah,
			startAyah,
			endSurah,
			endAyah,
			surahNumbers: surahsOnPage,
			primarySurahName: startMeta.nameTranslit,
			primarySurahArabic: startMeta.nameArabic
		});
	}
	return pages;
}
var MUSHAF_604_PAGES = buildCanonical604Pages();
function getMushafPageMeta(page) {
	return MUSHAF_604_PAGES[Math.max(0, Math.min(603, Math.floor(page) - 1))];
}
function getMushafPageForSurahAyah(surahNumber, ayahNumber) {
	const s = Math.max(1, Math.min(114, Math.floor(surahNumber)));
	const startP = SURAH_START_PAGES[s - 1];
	const nextStartP = s < 114 ? SURAH_START_PAGES[s] : 605;
	const span = Math.max(1, nextStartP - startP);
	const meta = ALL_114_SURAHS[s - 1];
	if (span <= 1 || !meta || meta.ayahCount <= 1) return startP;
	const ratio = Math.max(0, Math.min(.999, (Math.max(1, ayahNumber) - 1) / meta.ayahCount));
	return Math.min(604, startP + Math.floor(ratio * span));
}
// src/services/khatamPlannerService.ts
var STORAGE_KEY = "ilmizo_khatam_planner_v1";
var SYNC_EVENT = "ilmizo:khatam-planner-updated";
function toLocalIsoDate(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function createDefaultKhatamState(targetDays = 90) {
	return {
		active: true,
		targetDays: Math.max(7, Math.min(365, Math.round(targetDays))),
		startDateIso: toLocalIsoDate(),
		completedPages: [],
		completedDayDates: [],
		lastReadPage: 1
	};
}
function loadKhatamPlanState() {
	if (typeof localStorage === "undefined") return createDefaultKhatamState(90);
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return createDefaultKhatamState(90);
		const parsed = JSON.parse(raw);
		const rawPages = Array.isArray(parsed.completedPages) ? parsed.completedPages.map((n) => Number(n)).filter((n) => Number.isFinite(n) && n >= 1 && n <= 604) : [];
		const pages = Array.from(new Set(rawPages)).sort((a, b) => a - b);
		return {
			active: typeof parsed.active === "boolean" ? parsed.active : true,
			targetDays: Math.max(7, Math.min(365, Number(parsed.targetDays) || 90)),
			startDateIso: typeof parsed.startDateIso === "string" ? parsed.startDateIso : toLocalIsoDate(),
			completedPages: pages,
			completedDayDates: Array.isArray(parsed.completedDayDates) ? parsed.completedDayDates : [],
			lastReadPage: Math.max(1, Math.min(604, Number(parsed.lastReadPage) || 1))
		};
	} catch {
		return createDefaultKhatamState(90);
	}
}
function saveKhatamPlanState(state) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		if (typeof window !== "undefined") window.dispatchEvent(new Event(SYNC_EVENT));
	} catch {}
}
function computeDateStreak(dates, todayIso) {
	if (dates.length === 0) return 0;
	const set = new Set(dates);
	let streak = 0;
	const cursor = /* @__PURE__ */ new Date(`${todayIso}T12:00:00`);
	if (!set.has(toLocalIsoDate(cursor))) cursor.setDate(cursor.getDate() - 1);
	while (set.has(toLocalIsoDate(cursor))) {
		streak += 1;
		cursor.setDate(cursor.getDate() - 1);
	}
	return streak;
}
/**
* Pure computation of today's Khatam target, guilt-free recalculated pace, and finish date.
*/
function computeKhatamTodayTarget(state, now = /* @__PURE__ */ new Date()) {
	const todayIso = toLocalIsoDate(now);
	const completedSet = new Set(state.completedPages);
	const completedCount = completedSet.size;
	const pagesRemainingTotal = Math.max(0, 604 - completedCount);
	const isComplete = pagesRemainingTotal === 0;
	let nextUnreadPage = 1;
	for (let p = 1; p <= 604; p++) if (!completedSet.has(p)) {
		nextUnreadPage = p;
		break;
	}
	const startMs = (/* @__PURE__ */ new Date(`${state.startDateIso}T12:00:00`)).getTime();
	const todayMs = (/* @__PURE__ */ new Date(`${todayIso}T12:00:00`)).getTime();
	const elapsedDays = Number.isFinite(startMs) ? Math.max(0, Math.floor((todayMs - startMs) / 864e5)) : 0;
	const daysRemaining = Math.max(1, state.targetDays - elapsedDays);
	const recalculatedPagesPerDay = isComplete ? 0 : Math.max(1, Math.ceil(pagesRemainingTotal / daysRemaining));
	const startPage = isComplete ? 604 : nextUnreadPage;
	const endPage = isComplete ? 604 : Math.min(604, startPage + recalculatedPagesPerDay - 1);
	const pagesTargetToday = isComplete ? 0 : endPage - startPage + 1;
	const estimatedMinutes = Math.max(2, Math.round(pagesTargetToday * 2.2));
	const projectedDaysNeeded = isComplete ? 0 : Math.ceil(pagesRemainingTotal / Math.max(1, recalculatedPagesPerDay));
	const projectedFinishDateLabel = new Date(now.getTime() + projectedDaysNeeded * 864e5).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
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
		progressPct: Number((completedCount / 604 * 100).toFixed(1)),
		isComplete,
		todayCompleted: state.completedDayDates.includes(todayIso),
		projectedFinishDateLabel,
		streakDays: computeDateStreak(state.completedDayDates, todayIso)
	};
}
function markKhatamPageRead(page) {
	const clamped = Math.max(1, Math.min(604, Math.floor(page)));
	const current = loadKhatamPlanState();
	const todayIso = toLocalIsoDate();
	const nextPages = current.completedPages.includes(clamped) ? current.completedPages : [...current.completedPages, clamped].sort((a, b) => a - b);
	const nextDates = current.completedDayDates.includes(todayIso) ? current.completedDayDates : [...current.completedDayDates, todayIso];
	const next = {
		...current,
		completedPages: nextPages,
		completedDayDates: nextDates,
		lastReadPage: clamped
	};
	saveKhatamPlanState(next);
	return next;
}
function markKhatamTodayComplete() {
	const current = loadKhatamPlanState();
	const target = computeKhatamTodayTarget(current);
	const todayIso = toLocalIsoDate();
	const pageSet = new Set(current.completedPages);
	for (let p = target.startPage; p <= target.endPage; p++) pageSet.add(p);
	const nextDates = current.completedDayDates.includes(todayIso) ? current.completedDayDates : [...current.completedDayDates, todayIso];
	const next = {
		...current,
		completedPages: Array.from(pageSet).sort((a, b) => a - b),
		completedDayDates: nextDates,
		lastReadPage: target.endPage
	};
	saveKhatamPlanState(next);
	return next;
}
function useKhatamPlanner() {
	const [state, setState] = (0, import_react.useState)(() => loadKhatamPlanState());
	(0, import_react.useEffect)(() => {
		const sync = () => setState(loadKhatamPlanState());
		window.addEventListener(SYNC_EVENT, sync);
		return () => window.removeEventListener(SYNC_EVENT, sync);
	}, []);
	return {
		state,
		target: computeKhatamTodayTarget(state),
		setGoalDays: (0, import_react.useCallback)((days, resetProgress = false) => {
			const clamped = Math.max(7, Math.min(365, Math.round(days)));
			const prev = loadKhatamPlanState();
			const next = resetProgress ? createDefaultKhatamState(clamped) : {
				...prev,
				active: true,
				targetDays: clamped,
				startDateIso: toLocalIsoDate()
			};
			saveKhatamPlanState(next);
			setState(next);
		}, []),
		completePage: (0, import_react.useCallback)((page) => {
			setState(markKhatamPageRead(page));
		}, []),
		completeTodayPortion: (0, import_react.useCallback)(() => {
			setState(markKhatamTodayComplete());
		}, []),
		resetPlan: (0, import_react.useCallback)((days) => {
			const next = createDefaultKhatamState(days ?? loadKhatamPlanState().targetDays);
			saveKhatamPlanState(next);
			setState(next);
		}, [])
	};
}
// src/components/adult/QuranMushafView.tsx
var QuranMushafView = ({ surahPayload, activeAyahNumber, arabicFontScale, darkMode, onSelectAyah, onPlayAyahAudio, onToggleBookmarkAyah, isAyahBookmarked, onNavigateToSurahAyah, onCreateReminderCard, onToast }) => {
	const pages = (0, import_react.useMemo)(() => buildReflowableMushafPages(surahPayload.ayahs), [surahPayload.ayahs]);
	const [prefs, setPrefs] = (0, import_react.useState)(() => loadQuranReaderPreferences());
	const [pageIdx, setPageIdx] = (0, import_react.useState)(() => {
		const found = pages.findIndex((p) => p.ayahs.some((a) => a.numberInSurah === activeAyahNumber));
		if (found >= 0) return found;
		const saved = loadQuranReaderPreferences().lastPageBySurah[surahPayload.meta.number];
		if (typeof saved === "number" && saved >= 0 && saved < pages.length) return saved;
		return 0;
	});
	const [jumpSheetOpen, setJumpSheetOpen] = (0, import_react.useState)(false);
	const [jumpTab, setJumpTab] = (0, import_react.useState)("page");
	const [jumpPageInput, setJumpPageInput] = (0, import_react.useState)(1);
	const { state: khatamState, completePage: markKhatamPageComplete } = useKhatamPlanner();
	const activeAyahIdx = (0, import_react.useMemo)(() => {
		const idx = surahPayload.ayahs.findIndex((a) => a.numberInSurah === activeAyahNumber);
		return idx >= 0 ? idx : 0;
	}, [surahPayload.ayahs, activeAyahNumber]);
	const { isAyahHighlighted, registerAyahElement } = useQuranAudioSync({
		surahNumber: surahPayload.meta.number,
		ayahs: surahPayload.ayahs,
		activeAyahIdx,
		onAyahIndexChange: (nextIdx) => {
			const nextAyah = surahPayload.ayahs[nextIdx];
			if (nextAyah) onSelectAyah(nextAyah.numberInSurah);
		},
		enableHaptics: false,
		autoScroll: true
	});
	const [scriptStyle, setScriptStyle] = useQuranScriptStyle();
	const playbackClock = useAudioPlaybackClock();
	const scriptFontClass = getArabicScriptFontClass(scriptStyle);
	(0, import_react.useEffect)(() => {
		const found = pages.findIndex((p) => p.ayahs.some((a) => a.numberInSurah === activeAyahNumber));
		if (found >= 0) setPageIdx(found);
		else if (pages.length > 0) setPageIdx(0);
	}, [
		surahPayload.meta.number,
		pages.length,
		activeAyahNumber
	]);
	const currentPage = pages[pageIdx] || pages[0];
	const canonicalMushafPage = (0, import_react.useMemo)(() => {
		if (!currentPage) return 1;
		if (currentPage.isStandardMushafPageNumber && currentPage.displayPageNumber <= 604) return currentPage.displayPageNumber;
		const firstAyah = currentPage.ayahs[0]?.numberInSurah || 1;
		return getMushafPageForSurahAyah(surahPayload.meta.number, firstAyah);
	}, [currentPage, surahPayload.meta.number]);
	const canonicalPageMeta = (0, import_react.useMemo)(() => getMushafPageMeta(canonicalMushafPage), [canonicalMushafPage]);
	const isCurrentPageLoggedKhatam = khatamState.completedPages.includes(canonicalMushafPage);
	const persistPageIndex = (nextIdx) => {
		const clamped = Math.max(0, Math.min(pages.length - 1, nextIdx));
		setPageIdx(clamped);
		const nextPrefs = {
			...prefs,
			lastPageBySurah: {
				...prefs.lastPageBySurah,
				[surahPayload.meta.number]: clamped
			}
		};
		setPrefs(nextPrefs);
		saveQuranReaderPreferences(nextPrefs);
		const firstAyah = pages[clamped]?.ayahs[0];
		if (firstAyah) onSelectAyah(firstAyah.numberInSurah);
		triggerSelectionHaptic();
	};
	const handleGoToMushafPage = (targetPage) => {
		const clampedPage = Math.max(1, Math.min(604, Math.floor(targetPage)));
		const meta = getMushafPageMeta(clampedPage);
		triggerSelectionHaptic();
		if (meta.startSurah === surahPayload.meta.number) {
			const matchIdx = pages.findIndex((p) => p.isStandardMushafPageNumber && p.displayPageNumber === clampedPage || p.ayahs.some((a) => a.numberInSurah >= meta.startAyah));
			if (matchIdx >= 0) {
				persistPageIndex(matchIdx);
				setJumpSheetOpen(false);
				return;
			}
		}
		onNavigateToSurahAyah?.(meta.startSurah, meta.startAyah);
		onToast?.(`Opened Mushaf Page ${clampedPage} · Juz ${meta.juz} (${meta.primarySurahName})`);
		setJumpSheetOpen(false);
	};
	const handleStepPage = (delta) => {
		if (delta === -1) {
			if (pageIdx > 0) persistPageIndex(pageIdx - 1);
			else if (canonicalMushafPage > 1 && onNavigateToSurahAyah) handleGoToMushafPage(canonicalMushafPage - 1);
			return;
		}
		if (pageIdx < pages.length - 1) persistPageIndex(pageIdx + 1);
		else if (canonicalMushafPage < 604 && onNavigateToSurahAyah) handleGoToMushafPage(canonicalMushafPage + 1);
	};
	const handleTogglePageBookmark = () => {
		if (!currentPage) return;
		const exists = prefs.bookmarkedPages.some((b) => b.surahNumber === surahPayload.meta.number && b.pageIndex === currentPage.pageIndex);
		const nextBookmarks = exists ? prefs.bookmarkedPages.filter((b) => !(b.surahNumber === surahPayload.meta.number && b.pageIndex === currentPage.pageIndex)) : [{
			surahNumber: surahPayload.meta.number,
			surahName: surahPayload.meta.nameTranslit,
			pageIndex: currentPage.pageIndex,
			displayPageNumber: canonicalMushafPage,
			firstAyahNumber: currentPage.ayahs[0]?.numberInSurah || 1,
			savedAtIso: (/* @__PURE__ */ new Date()).toISOString()
		}, ...prefs.bookmarkedPages].slice(0, 40);
		const nextPrefs = {
			...prefs,
			bookmarkedPages: nextBookmarks
		};
		setPrefs(nextPrefs);
		saveQuranReaderPreferences(nextPrefs);
		triggerLightHaptic();
		onToast?.(exists ? `Removed bookmark for Mushaf Page ${canonicalMushafPage}` : `Bookmarked ${surahPayload.meta.nameTranslit} · Mushaf Page ${canonicalMushafPage}`);
	};
	const handleThemeChange = (theme) => {
		const nextPrefs = {
			...prefs,
			mushafParchmentTheme: theme
		};
		setPrefs(nextPrefs);
		saveQuranReaderPreferences(nextPrefs);
	};
	if (!currentPage) return null;
	const effectiveTheme = darkMode ? "night" : prefs.mushafParchmentTheme;
	const isPageBookmarked = prefs.bookmarkedPages.some((b) => b.surahNumber === surahPayload.meta.number && b.pageIndex === currentPage.pageIndex);
	const fontSizeClass = arabicFontScale <= 1 ? "text-[22px] leading-[2.35]" : arabicFontScale === 2 ? "text-[27px] leading-[2.4]" : arabicFontScale === 3 ? "text-[32px] leading-[2.45]" : "text-[36px] leading-[2.5]";
	const surfaceClasses = effectiveTheme === "night" ? "bg-[#081F15] text-amber-50 border-amber-400/35" : effectiveTheme === "sepia" ? "bg-[#F8F0DF] text-[#1C1917] border-[#D4AF37]/60" : "bg-[#FFFDF8] text-[#0F291E] border-[#D4AF37]/55";
	const selectedAyahObj = currentPage.ayahs.find((a) => a.numberInSurah === activeAyahNumber) || currentPage.ayahs[0];
	const canGoPrev = pageIdx > 0 || Boolean(onNavigateToSurahAyah) && canonicalMushafPage > 1;
	const canGoNext = pageIdx < pages.length - 1 || Boolean(onNavigateToSurahAyah) && canonicalMushafPage < 604;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300 flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-3.5 h-3.5 text-amber-600 dark:text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: scriptStyle === "indopak" ? "IndoPak (15-Line) · 604-Page Mushaf" : "Madani (Uthmani) · 604-Page Mushaf" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-[var(--text-secondary)]",
					children: "Live word highlight · Tap any Ayah to listen, bookmark or create card"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							role: "group",
							"aria-label": "Quran Script Style",
							className: "flex items-center bg-[var(--bg-subtle)] rounded-xl p-0.5 border border-[var(--border-subtle)]",
							children: [{
								id: "uthmani",
								label: "Madani"
							}, {
								id: "indopak",
								label: "IndoPak"
							}].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": scriptStyle === opt.id,
								onClick: () => {
									setScriptStyle(opt.id);
									triggerSelectionHaptic();
								},
								className: `min-h-[34px] px-2.5 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition ${scriptStyle === opt.id ? "bg-[#14532D] text-amber-300 shadow-2xs" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`,
								children: opt.label
							}, opt.id))
						}),
						!darkMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center bg-[var(--bg-subtle)] rounded-xl p-0.5",
							children: [
								"ivory",
								"sepia",
								"night"
							].map((theme) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleThemeChange(theme),
								className: `min-h-[34px] px-2.5 rounded-lg text-[11px] font-extrabold capitalize transition ${prefs.mushafParchmentTheme === theme ? "bg-[#14532D] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`,
								children: theme === "night" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-3.5 h-3.5 inline" }) : theme === "ivory" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-3.5 h-3.5 inline" }) : "Warm"
							}, theme))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								triggerLightHaptic();
								setJumpPageInput(canonicalMushafPage);
								setJumpSheetOpen(true);
							},
							className: "min-h-[38px] px-3 rounded-xl bg-[#14532D] text-amber-300 text-xs font-extrabold inline-flex items-center gap-1 tabular-nums transition active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"p. ",
								canonicalMushafPage,
								"/604"
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								triggerSuccessHaptic();
								markKhatamPageComplete(canonicalMushafPage);
								onToast?.(`Logged Mushaf Page ${canonicalMushafPage} toward your Khatam-ul-Qur'an goal!`);
							},
							"aria-pressed": isCurrentPageLoggedKhatam,
							className: `min-h-[38px] px-3 rounded-xl border text-xs font-extrabold inline-flex items-center gap-1 transition ${isCurrentPageLoggedKhatam ? "bg-[#22C55E] text-emerald-950 border-emerald-500" : "bg-[var(--bg-elevated)] text-[#14532D] dark:text-emerald-200 border-[var(--border-subtle)]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isCurrentPageLoggedKhatam ? "Page Read ✓" : "Mark Read" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleTogglePageBookmark,
							"aria-pressed": isPageBookmarked,
							className: `min-h-[38px] px-3 rounded-xl border text-xs font-extrabold inline-flex items-center gap-1 transition ${isPageBookmarked ? "bg-amber-400 text-emerald-950 border-amber-500" : "bg-[var(--bg-elevated)] text-[#14532D] dark:text-emerald-200 border-[var(--border-subtle)] hover:border-emerald-500/40"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: `w-3.5 h-3.5 ${isPageBookmarked ? "fill-current" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isPageBookmarked ? "Saved" : "Save" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				"aria-label": `Surah ${surahPayload.meta.nameTranslit} Mushaf Page ${canonicalMushafPage} of 604`,
				className: `rounded-[24px] border-2 p-5 sm:p-7 shadow-sm space-y-5 transition-colors ${surfaceClasses}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-amber-500/25 pb-3 text-xs font-extrabold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums opacity-85",
								children: ["Juz ", currentPage.ayahs[0]?.juzNumber || canonicalPageMeta.juz]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-arabic text-xl font-bold tracking-normal",
								children: surahPayload.meta.nameArabic
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums opacity-85",
								children: [
									"Page ",
									canonicalMushafPage,
									" / ",
									604
								]
							})
						]
					}),
					currentPage.pageIndex === 0 && surahPayload.meta.number !== 9 && surahPayload.meta.number !== 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `${scriptFontClass} text-2xl sm:text-3xl font-bold text-center opacity-95`,
						children: formatAyahTextForScript("بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", scriptStyle)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						dir: "rtl",
						lang: "ar",
						className: `${scriptFontClass} text-justify ${fontSizeClass} select-text`,
						children: currentPage.ayahs.map((ayah) => {
							const isSelected = ayah.numberInSurah === activeAyahNumber;
							const isReciting = isAyahHighlighted(ayah.numberInSurah);
							const bookmarked = isAyahBookmarked(ayah.numberInSurah);
							const displayText = formatAyahTextForScript(ayah.arabicUthmani, scriptStyle);
							const words = isReciting ? displayText.split(/\s+/).filter(Boolean) : [];
							const liveWordIdx = isReciting ? getActiveWordIndexAtProgress(words, playbackClock.ratio) : -1;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								ref: registerAyahElement(ayah.numberInSurah),
								"data-mushaf-ayah": ayah.numberInSurah,
								onClick: () => {
									onSelectAyah(ayah.numberInSurah);
									triggerSelectionHaptic();
								},
								role: "button",
								tabIndex: 0,
								onKeyDown: (e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										onSelectAyah(ayah.numberInSurah);
									}
								},
								className: `inline rounded-xl px-1.5 py-0.5 cursor-pointer transition-all duration-300 ${isReciting ? effectiveTheme === "night" ? "ilmizo-ayah-span-playing text-amber-100" : "ilmizo-ayah-span-playing text-[#0F3826]" : isSelected ? effectiveTheme === "night" ? "bg-amber-400/20 text-amber-100" : "bg-amber-200/55 text-[#0F3826]" : "hover:bg-amber-300/20"}`,
								children: [
									isReciting && words.length > 0 ? words.map((word, wIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-live-word": wIdx === liveWordIdx ? "true" : void 0,
										className: wIdx === liveWordIdx ? "inline-block rounded-lg px-1 bg-amber-400/45 dark:bg-amber-400/35 text-[#0F3826] dark:text-amber-100 font-bold shadow-2xs transition-colors duration-150" : void 0,
										children: word
									}), " "] }, `${ayah.numberInSurah}-w-${wIdx}`)) : `${displayText} `,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `inline-block mx-1 text-[0.72em] font-bold tabular-nums ${bookmarked ? "text-emerald-600" : effectiveTheme === "night" ? "text-amber-300" : "text-amber-700"}`,
										title: `Ayah ${ayah.numberInSurah}${bookmarked ? " (Bookmarked)" : ""}`,
										children: formatOrnamentalAyahMarker(ayah.numberInSurah)
									}),
									" "
								]
							}, ayah.numberInSurah);
						})
					}),
					selectedAyahObj && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl p-3 border flex flex-wrap items-center justify-between gap-2 text-xs ${effectiveTheme === "night" ? "bg-white/5 border-white/10 text-emerald-100" : "bg-white/80 border-emerald-950/10 text-slate-800"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-extrabold tabular-nums",
								children: [
									"Selected: ",
									surahPayload.meta.nameTranslit,
									" ",
									surahPayload.meta.number,
									":",
									selectedAyahObj.numberInSurah
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] opacity-80 line-clamp-2 mt-0.5",
								children: selectedAyahObj.translations.en
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-1.5 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => onPlayAyahAudio(selectedAyahObj),
									className: "min-h-[40px] px-3 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center gap-1.5 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recite" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => onToggleBookmarkAyah(selectedAyahObj),
									className: "min-h-[40px] px-3 rounded-xl border border-amber-400/60 bg-amber-50 dark:bg-amber-500/20 text-emerald-950 dark:text-amber-200 text-xs font-extrabold inline-flex items-center gap-1 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: `w-3.5 h-3.5 ${isAyahBookmarked(selectedAyahObj.numberInSurah) ? "fill-current" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isAyahBookmarked(selectedAyahObj.numberInSurah) ? "Saved" : "Bookmark" })]
								}),
								onCreateReminderCard && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => onCreateReminderCard(selectedAyahObj),
									className: "min-h-[40px] px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold inline-flex items-center gap-1 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Card" })]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: !canGoPrev,
						onClick: () => handleStepPage(-1),
						className: "min-h-[48px] px-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[#14532D] dark:text-emerald-200 disabled:opacity-40 text-xs font-extrabold inline-flex items-center gap-1.5 shadow-2xs active:scale-95 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Previous Page" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							triggerLightHaptic();
							setJumpPageInput(canonicalMushafPage);
							setJumpSheetOpen(true);
						},
						className: "min-h-[42px] px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-extrabold text-[var(--text-primary)] tabular-nums",
						children: [
							"Page ",
							canonicalMushafPage,
							" / ",
							604
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: !canGoNext,
						onClick: () => handleStepPage(1),
						className: "min-h-[48px] px-4 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white disabled:opacity-40 text-xs font-extrabold inline-flex items-center gap-1.5 shadow-2xs active:scale-95 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Next Page" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
				open: jumpSheetOpen,
				onClose: () => setJumpSheetOpen(false),
				title: "Jump in 604-Page Mushaf",
				subtitle: "Navigate directly to any Madani Mushaf page (1–604) or Juz (1–30).",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[var(--bg-subtle)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setJumpTab("page"),
							className: `min-h-[40px] rounded-xl text-xs font-extrabold transition ${jumpTab === "page" ? "bg-[#14532D] text-amber-300" : "text-[var(--text-secondary)]"}`,
							children: "By Page (1–604)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setJumpTab("juz"),
							className: `min-h-[40px] rounded-xl text-xs font-extrabold transition ${jumpTab === "juz" ? "bg-[#14532D] text-amber-300" : "text-[var(--text-secondary)]"}`,
							children: "By Juz (1–30)"
						})]
					}), jumpTab === "page" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [(() => {
							const previewMeta = getMushafPageMeta(jumpPageInput);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 text-center space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-extrabold text-amber-700 dark:text-amber-300 tabular-nums",
										children: [
											"Page ",
											previewMeta.page,
											" of ",
											604,
											" · Juz ",
											previewMeta.juz
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-arabic-uthmani text-2xl text-[var(--text-primary)]",
										children: previewMeta.primarySurahArabic
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-extrabold text-[var(--text-primary)]",
										children: [
											"Surah ",
											previewMeta.primarySurahName,
											" (",
											previewMeta.startSurah,
											":",
											previewMeta.startAyah,
											")"
										]
									})
								]
							});
						})(), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 1,
								max: 604,
								value: jumpPageInput,
								onChange: (e) => setJumpPageInput(Number(e.target.value)),
								className: "w-full accent-[#14532D]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 1,
									max: 604,
									value: jumpPageInput,
									onChange: (e) => setJumpPageInput(Math.max(1, Math.min(604, Number(e.target.value) || 1))),
									className: "w-28 rounded-2xl ilmizo-input px-3 py-2.5 text-sm font-extrabold text-center tabular-nums"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => handleGoToMushafPage(jumpPageInput),
									className: "flex-1 min-h-[46px] rounded-2xl bg-[#14532D] text-white text-xs font-extrabold active:scale-95 transition",
									children: ["Open Mushaf Page ", jumpPageInput]
								})]
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2 max-h-[52vh] overflow-y-auto pr-1",
						children: JUZ_30_BOUNDARIES.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => handleGoToMushafPage(j.startPage),
							className: "min-h-[58px] p-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[#14532D]/50 text-left transition active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-black text-[#14532D] dark:text-amber-300 tabular-nums",
									children: ["Juz ", j.juz]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] text-[var(--text-muted)] tabular-nums",
									children: ["p. ", j.startPage]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-[var(--text-primary)] truncate mt-0.5",
								children: j.nameTranslit
							})]
						}, j.juz))
					})]
				})
			})
		]
	});
};
// src/components/adult/KhatamPlannerModal.tsx
var PRESETS = [
	{
		days: 30,
		label: "30 Days",
		desc: "1 Juz / day (~20 pages)"
	},
	{
		days: 60,
		label: "60 Days",
		desc: "½ Juz / day (~10 pages)"
	},
	{
		days: 90,
		label: "90 Days",
		desc: "Steady (~7 pages / day)"
	},
	{
		days: 180,
		label: "180 Days",
		desc: "Gentle (~4 pages / day)"
	}
];
var KhatamPlannerCard = ({ onOpenTodayInMushaf, onToast, compact = false }) => {
	const { state, target, setGoalDays, completeTodayPortion, resetPlan } = useKhatamPlanner();
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	const [customDays, setCustomDays] = (0, import_react.useState)(state.targetDays);
	const handleMarkDone = () => {
		triggerSuccessHaptic();
		completeTodayPortion();
		onToast?.(`MashaAllah! Logged Pages ${target.startPage}–${target.endPage} (${target.pagesTargetToday} pages) toward your Khatam.`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[24px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 shadow-2xs space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-[11px] font-extrabold text-[#14532D] dark:text-amber-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "w-3.5 h-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Khatam-ul-Qur'an Planner · ",
								state.targetDays,
								"-Day Goal"
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-extrabold text-[var(--text-primary)] mt-0.5",
							children: target.isComplete ? "Alhamdulillah! Full 604-Page Khatam Completed" : `Today’s Portion: Pages ${target.startPage}–${target.endPage} (${target.pagesTargetToday}p)`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-secondary)] mt-0.5 tabular-nums",
							children: target.isComplete ? "Tap Goal to begin a fresh Khatam journey." : `Juz ${target.startMeta.juz} · Surah ${target.startMeta.primarySurahName} · ~${target.estimatedMinutes} min`
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						triggerLightHaptic();
						setCustomDays(state.targetDays);
						setSheetOpen(true);
					},
					className: "min-h-[38px] px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-extrabold text-[#14532D] dark:text-emerald-200 inline-flex items-center gap-1 shrink-0 active:scale-95 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Goal" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-gradient-to-r from-[#14532D] via-[#22C55E] to-[#F59E0B] transition-all duration-500",
						style: { width: `${Math.max(state.completedPages.length > 0 ? 2 : 0, target.progressPct)}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-[11px] font-bold text-[var(--text-muted)] tabular-nums",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						state.completedPages.length,
						"/",
						604,
						" pages (",
						target.progressPct,
						"%)"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 text-amber-700 dark:text-amber-300",
						children: [target.streakDays > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-3 h-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [target.streakDays, "d"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Est. ", target.projectedFinishDateLabel] })]
					})]
				})]
			}),
			!target.isComplete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `grid ${compact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"} gap-2`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						triggerSelectionHaptic();
						onOpenTodayInMushaf(target.startMeta.startSurah, target.startMeta.startAyah, target.startPage);
					},
					className: "min-h-[46px] px-3.5 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4 text-amber-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Read Today in Mushaf" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleMarkDone,
					className: `min-h-[46px] px-3.5 rounded-2xl text-xs font-extrabold inline-flex items-center justify-center gap-1.5 border transition active:scale-95 ${target.todayCompleted ? "bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-200 border-emerald-400/60" : "bg-amber-400 hover:bg-amber-300 text-emerald-950 border-amber-400"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: target.todayCompleted ? `Log Next ${target.pagesTargetToday} Pages` : `Mark Today Done (${target.pagesTargetToday}p)` })]
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
		open: sheetOpen,
		onClose: () => setSheetOpen(false),
		title: "Khatam-ul-Qur'an Goal Planner",
		subtitle: "Set a realistic pace — Ilmizo auto-adjusts guilt-free if you ever miss a day.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2.5",
					children: PRESETS.map((preset) => {
						const active = state.targetDays === preset.days;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								triggerSelectionHaptic();
								setCustomDays(preset.days);
								setGoalDays(preset.days, false);
								onToast?.(`Khatam goal updated to ${preset.days} days`);
							},
							className: `min-h-[64px] p-3.5 rounded-2xl border text-left transition active:scale-95 ${active ? "bg-[#14532D] text-white border-[#D4AF37]" : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-extrabold",
								children: preset.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-[11px] mt-0.5 ${active ? "text-emerald-100" : "text-[var(--text-secondary)]"}`,
								children: preset.desc
							})]
						}, preset.days);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs font-extrabold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[var(--text-primary)]",
								children: "Custom Khatam Timeline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[#14532D] dark:text-amber-300 tabular-nums",
								children: [
									customDays,
									" Days (~",
									Math.max(1, Math.ceil(target.pagesRemainingTotal / Math.max(1, customDays))),
									" pages/day)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 15,
							max: 365,
							step: 5,
							value: customDays,
							onChange: (e) => setCustomDays(Number(e.target.value)),
							className: "w-full accent-[#14532D]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								triggerSuccessHaptic();
								setGoalDays(customDays, false);
								onToast?.(`Custom ${customDays}-day Khatam pace saved!`);
								setSheetOpen(false);
							},
							className: "w-full min-h-[44px] rounded-xl bg-[#14532D] text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Save ",
								customDays,
								"-Day Goal"
							] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 p-3 text-xs text-amber-950 dark:text-amber-200 leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Guilt-Free Catch-Up:" }),
						" ",
						target.pagesRemainingTotal,
						" pages remain across",
						" ",
						target.daysRemaining,
						" days — your daily target automatically stays balanced at",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
							className: "tabular-nums",
							children: [target.recalculatedPagesPerDay, " pages/day"]
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						triggerLightHaptic();
						resetPlan(state.targetDays);
						onToast?.("Started a fresh 604-page Khatam from Page 1.");
						setSheetOpen(false);
					},
					className: "w-full min-h-[44px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)] inline-flex items-center justify-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Start Fresh Khatam from Page 1" })]
				})
			]
		})
	})] });
};
// src/components/adult/AdultModeView.tsx
var AdultCalendarScreen = (0, import_react.lazy)(() => __vitePreload(() => import("./AdultExtraScreens-JKsGDYrs.js").then((m) => ({ default: m.AdultCalendarScreen })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])));
var AdultLessonsScreen = (0, import_react.lazy)(() => __vitePreload(() => import("./AdultExtraScreens-JKsGDYrs.js").then((m) => ({ default: m.AdultLessonsScreen })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])));
var AdultMoreSettingsScreen = (0, import_react.lazy)(() => __vitePreload(() => import("./AdultExtraScreens-JKsGDYrs.js").then((m) => ({ default: m.AdultMoreSettingsScreen })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])));
var AdultProfileScreen = (0, import_react.lazy)(() => __vitePreload(() => import("./AdultExtraScreens-JKsGDYrs.js").then((m) => ({ default: m.AdultProfileScreen })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])));
var AdultProgressScreen = (0, import_react.lazy)(() => __vitePreload(() => import("./AdultExtraScreens-JKsGDYrs.js").then((m) => ({ default: m.AdultProgressScreen })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])));
var AdultQiblaScreen = (0, import_react.lazy)(() => __vitePreload(() => import("./AdultExtraScreens-JKsGDYrs.js").then((m) => ({ default: m.AdultQiblaScreen })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])));
var AdultQuizzesScreen = (0, import_react.lazy)(() => __vitePreload(() => import("./AdultExtraScreens-JKsGDYrs.js").then((m) => ({ default: m.AdultQuizzesScreen })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])));
var AdultTasbihScreen = (0, import_react.lazy)(() => __vitePreload(() => import("./AdultExtraScreens-JKsGDYrs.js").then((m) => ({ default: m.AdultTasbihScreen })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])));
var AdultTasksAndExpensesScreen = (0, import_react.lazy)(() => __vitePreload(() => import("./AdultExtraScreens-JKsGDYrs.js").then((m) => ({ default: m.AdultTasksAndExpensesScreen })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])));
function build99NamesQuizQuestion(allNames, targetIdx, randomFn) {
	const safeList = allNames.length > 0 ? allNames : ASMA_UL_HUSNA;
	const normalizedIdx = (targetIdx % safeList.length + safeList.length) % safeList.length;
	const target = safeList[normalizedIdx];
	const pool = safeList.filter((item) => item.number !== target.number && item.meaning !== target.meaning);
	const distractors = [];
	const usedMeanings = /* @__PURE__ */ new Set([target.meaning]);
	const usedNumbers = /* @__PURE__ */ new Set([target.number]);
	if (randomFn) {
		const candidates = [...pool];
		while (distractors.length < 3 && candidates.length > 0) {
			const pickIdx = Math.floor(randomFn() * candidates.length) % candidates.length;
			const picked = candidates.splice(pickIdx, 1)[0];
			if (!usedMeanings.has(picked.meaning) && !usedNumbers.has(picked.number)) {
				distractors.push(picked);
				usedMeanings.add(picked.meaning);
				usedNumbers.add(picked.number);
			}
		}
	} else {
		for (const off of [
			17,
			41,
			67,
			29,
			53,
			83
		]) {
			if (distractors.length >= 3) break;
			const candidate = pool[(normalizedIdx * 13 + off) % pool.length];
			if (candidate && !usedMeanings.has(candidate.meaning) && !usedNumbers.has(candidate.number)) {
				distractors.push(candidate);
				usedMeanings.add(candidate.meaning);
				usedNumbers.add(candidate.number);
			}
		}
		for (const candidate of pool) {
			if (distractors.length >= 3) break;
			if (!usedMeanings.has(candidate.meaning) && !usedNumbers.has(candidate.number)) {
				distractors.push(candidate);
				usedMeanings.add(candidate.meaning);
				usedNumbers.add(candidate.number);
			}
		}
	}
	const options = [...[{
		number: target.number,
		transliteration: target.transliteration,
		meaning: target.meaning,
		isCorrect: true
	}, ...distractors.map((d) => ({
		number: d.number,
		transliteration: d.transliteration,
		meaning: d.meaning,
		isCorrect: false
	}))]];
	if (randomFn) for (let i = options.length - 1; i > 0; i--) {
		const j = Math.floor(randomFn() * (i + 1)) % (i + 1);
		[options[i], options[j]] = [options[j], options[i]];
	}
	else {
		const targetSlot = (normalizedIdx * 3 + 1) % options.length;
		const correctOpt = options[0];
		options.splice(0, 1);
		options.splice(targetSlot, 0, correctOpt);
	}
	return {
		target,
		options
	};
}
function validate99NamesQuizAnswer(target, selectedOption) {
	if (!selectedOption) return false;
	return selectedOption.number === target.number && selectedOption.meaning === target.meaning;
}
var AdultModeView = () => {
	const shouldReduceMotion = useReducedMotion();
	const { mode, adultRoute, setAdultRoute, setMode, user, themeMode, setThemeMode, updateUser, autoPlayRecitation, toggleAutoPlayRecitation, openSurahForReading, dailyVerseActivity, recordVerseRead, selectedSurahNumber, bookmarks, toggleBookmark, recentlyOpenedSurahs, hifzPlans, updateHifzProgress, addHifzPlan, resetHifzPlan, canUndoHifz, undoLastHifzAction, revisionItems, recordRevisionAttempt, salahRecords, togglePrayerStatus, setPrayerStatusExplicit, favoriteDuaIds, toggleFavoriteDua, seerahMilestoneIds, toggleSeerahMilestone, completedLessonIds, recordQuizAttempt, personalNotes, addPersonalNote, deletePersonalNote, studiedNames99Numbers, markName99Studied, storageMetrics, downloadSurahOffline, deleteOfflineSurah, isAudioMuted, toggleAudioMute, registerSubScreenBackHandler } = useIlmizo();
	const { t, resolveText, isRTL, language, setLanguage, supportedLanguages } = useTranslation();
	const { feedback: swipeFeedback, swipeHandlers } = useSwipeNavigation({
		routes: ADULT_ROUTE_ORDER,
		activeRoute: adultRoute,
		onSelectRoute: setAdultRoute,
		isRTL
	});
	const [toastMsg, setToastMsg] = (0, import_react.useState)(null);
	const triggerToast = (msg) => {
		setToastMsg(msg);
		window.setTimeout(() => {
			setToastMsg((prev) => prev === msg ? null : prev);
		}, 2600);
	};
	const [adultPaywallOpen, setAdultPaywallOpen] = (0, import_react.useState)(false);
	const [adultPaywallReason, setAdultPaywallReason] = (0, import_react.useState)(void 0);
	const openAdultPaywall = (reason) => {
		setAdultPaywallReason(reason);
		setAdultPaywallOpen(true);
	};
	const [quranTab, setQuranTab] = (0, import_react.useState)("Surah");
	const [readerViewMode, setReaderViewMode] = (0, import_react.useState)(() => loadQuranReaderPreferences().viewMode);
	const [adultScriptStyle, setAdultScriptStyle] = useQuranScriptStyle();
	const [activeSpecialModule, setActiveSpecialModule] = (0, import_react.useState)(null);
	const [customReminderAyah, setCustomReminderAyah] = (0, import_react.useState)(null);
	const [seniorMinimalMode, setSeniorMinimalMode] = useSeniorMinimalMode();
	const [batteryGuardOpen, setBatteryGuardOpen] = (0, import_react.useState)(false);
	const openAyahInReminderStudio = (ayah, surahMeta) => {
		triggerSelectionHaptic();
		setCustomReminderAyah({
			surahNumber: surahMeta.number,
			surahName: surahMeta.nameTranslit,
			ayahNumber: ayah.numberInSurah,
			arabic: ayah.arabicUthmani,
			transliteration: ayah.transliteration,
			translation: resolveText(ayah.translations, ayah.translations.en)
		});
		setActiveSpecialModule("reminder_cards");
	};
	(0, import_react.useEffect)(() => {
		const onOpenSpecial = (e) => {
			const custom = e;
			if (custom.detail) {
				if (custom.detail !== "reminder_cards") setCustomReminderAyah(null);
				setActiveSpecialModule(custom.detail);
			}
		};
		window.addEventListener("ilmizo:open-special-module", onOpenSpecial);
		return () => {
			window.removeEventListener("ilmizo:open-special-module", onOpenSpecial);
		};
	}, []);
	const handleChangeReaderViewMode = (nextMode) => {
		setReaderViewMode(nextMode);
		saveQuranReaderPreferences({
			...loadQuranReaderPreferences(),
			viewMode: nextMode
		});
		triggerSelectionHaptic();
	};
	const openTodayInMushaf = (surahNumber, ayahNumber) => {
		handleChangeReaderViewMode("mushaf");
		openSurahForReading(surahNumber, ayahNumber);
	};
	const [surahSearch, setSurahSearch] = (0, import_react.useState)("");
	const [offlineVerseMatches, setOfflineVerseMatches] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		let active = true;
		if (surahSearch.trim().length < 2) {
			setOfflineVerseMatches([]);
			return;
		}
		searchOfflineQuran(surahSearch, user.language, 12).then((res) => {
			if (active) setOfflineVerseMatches(res);
		}).catch(() => {
			if (active) setOfflineVerseMatches([]);
		});
		return () => {
			active = false;
		};
	}, [surahSearch, user.language]);
	const [surahPayload, setSurahPayload] = (0, import_react.useState)(null);
	const [loadingSurah, setLoadingSurah] = (0, import_react.useState)(false);
	const [activeAyahIdx, setActiveAyahIdx] = (0, import_react.useState)(0);
	const [repeatAyah, setRepeatAyah] = (0, import_react.useState)(false);
	const [showTafsir, setShowTafsir] = (0, import_react.useState)(false);
	const [showVerseNotes, setShowVerseNotes] = (0, import_react.useState)(false);
	const [newVerseNoteBody, setNewVerseNoteBody] = (0, import_react.useState)("");
	const showTranslation = user.showTranslation ?? true;
	const setShowTranslation = (next) => updateUser({ showTranslation: next });
	const [showReaderControls, setShowReaderControls] = (0, import_react.useState)(false);
	const [downloadingQariSurah, setDownloadingQariSurah] = (0, import_react.useState)(false);
	const [showAdultTajweedCoach, setShowAdultTajweedCoach] = (0, import_react.useState)(false);
	const [adultMicActive, setAdultMicActive] = (0, import_react.useState)(false);
	const [adultRecUrl, setAdultRecUrl] = (0, import_react.useState)(null);
	const [adultHasBlob, setAdultHasBlob] = (0, import_react.useState)(false);
	const [adultTajweedLoading, setAdultTajweedLoading] = (0, import_react.useState)(false);
	const [adultTajweedError, setAdultTajweedError] = (0, import_react.useState)(null);
	const [adultTajweedResult, setAdultTajweedResult] = (0, import_react.useState)(null);
	const adultMediaRecorderRef = (0, import_react.useRef)(null);
	const adultMediaStreamRef = (0, import_react.useRef)(null);
	const adultAudioChunksRef = (0, import_react.useRef)([]);
	const adultRecBlobRef = (0, import_react.useRef)(null);
	const adultRecUrlRef = (0, import_react.useRef)(null);
	const audioState = useAudioManager();
	const isPlayingAudio = audioState.status === "playing" || audioState.status === "loading";
	const isPausedAudio = audioState.status === "paused";
	(0, import_react.useEffect)(() => {
		setAdultTajweedResult(null);
		setAdultTajweedError(null);
		setAdultHasBlob(false);
		adultRecBlobRef.current = null;
		if (adultRecUrlRef.current) {
			try {
				URL.revokeObjectURL(adultRecUrlRef.current);
			} catch {}
			adultRecUrlRef.current = null;
		}
		setAdultRecUrl(null);
	}, [selectedSurahNumber, activeAyahIdx]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (adultMediaRecorderRef.current && adultMediaRecorderRef.current.state !== "inactive") try {
				adultMediaRecorderRef.current.stop();
			} catch {}
			if (adultMediaStreamRef.current) adultMediaStreamRef.current.getTracks().forEach((tr) => tr.stop());
			if (adultRecUrlRef.current) try {
				URL.revokeObjectURL(adultRecUrlRef.current);
			} catch {}
		};
	}, []);
	const handleToggleAdultMic = async () => {
		if (adultMicActive) {
			if (adultMediaRecorderRef.current && adultMediaRecorderRef.current.state !== "inactive") try {
				adultMediaRecorderRef.current.stop();
			} catch {}
			if (adultMediaStreamRef.current) {
				adultMediaStreamRef.current.getTracks().forEach((tr) => tr.stop());
				adultMediaStreamRef.current = null;
			}
			setAdultMicActive(false);
			return;
		}
		if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
			triggerToast("Microphone recording is not supported on this browser.");
			return;
		}
		audioManager.stopAll();
		setAdultTajweedError(null);
		setAdultTajweedResult(null);
		adultRecBlobRef.current = null;
		setAdultHasBlob(false);
		if (adultRecUrlRef.current) {
			try {
				URL.revokeObjectURL(adultRecUrlRef.current);
			} catch {}
			adultRecUrlRef.current = null;
		}
		setAdultRecUrl(null);
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			adultMediaStreamRef.current = stream;
			const mimeType = pickSupportedAudioMimeType();
			const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
			adultAudioChunksRef.current = [];
			recorder.ondataavailable = (ev) => {
				if (ev.data && ev.data.size > 0) adultAudioChunksRef.current.push(ev.data);
			};
			recorder.onstop = () => {
				const finalType = recorder.mimeType || mimeType || "audio/webm";
				const blob = new Blob(adultAudioChunksRef.current, { type: finalType });
				adultAudioChunksRef.current = [];
				if (blob.size > 0) {
					adultRecBlobRef.current = blob;
					setAdultHasBlob(true);
					const url = URL.createObjectURL(blob);
					adultRecUrlRef.current = url;
					setAdultRecUrl(url);
				}
				stream.getTracks().forEach((tr) => tr.stop());
			};
			adultMediaRecorderRef.current = recorder;
			recorder.start();
			setAdultMicActive(true);
		} catch {
			triggerToast("Microphone permission denied. Allow mic access to check Tajweed.");
		}
	};
	const handleRunAdultAiTajweed = async (arabicText, translit) => {
		const blob = adultRecBlobRef.current;
		if (!blob || blob.size < 256) {
			triggerToast("Record your Ayah recitation first!");
			return;
		}
		const todayKey = getLocalDateKeyWithOffset(0, /* @__PURE__ */ new Date());
		if (!canUseAiTajweedCheck(user, todayKey).allowed) {
			openAdultPaywall("You used all 2 Free daily AI Tajweed checks today. Upgrade to Adult Quran Plus (₹99/yr) or Family Plus (₹199/yr) for unlimited Harakat & Makhraj feedback!");
			return;
		}
		setAdultTajweedLoading(true);
		setAdultTajweedError(null);
		const res = await analyzeRecitationWithAiTajweed({
			audioBlob: blob,
			targetArabic: arabicText,
			targetTransliteration: translit,
			uiLanguage: user.language,
			mode: "adult"
		});
		setAdultTajweedLoading(false);
		if (res.ok && res.result) {
			updateUser(recordAiTajweedUsagePatch(user, todayKey));
			setAdultTajweedResult(res.result);
		} else setAdultTajweedError(res.error || "AI Tajweed Coach unavailable.");
	};
	const [hifzTab, setHifzTab] = (0, import_react.useState)("My Hifz");
	const [activeRecallBlur, setActiveRecallBlur] = (0, import_react.useState)(false);
	const [revealedCardIds, setRevealedCardIds] = (0, import_react.useState)([]);
	const [showNewHifzForm, setShowNewHifzForm] = (0, import_react.useState)(false);
	const [newHifzSurahNum, setNewHifzSurahNum] = (0, import_react.useState)(67);
	const [newHifzDailyTarget, setNewHifzDailyTarget] = (0, import_react.useState)(5);
	const [newHifzStartAyah, setNewHifzStartAyah] = (0, import_react.useState)(1);
	const [newHifzEndAyah, setNewHifzEndAyah] = (0, import_react.useState)(30);
	const [confirmResetSurahNum, setConfirmResetSurahNum] = (0, import_react.useState)(null);
	const [salahSubView, setSalahSubView] = (0, import_react.useState)("tracker");
	const [showSalahCalcConfig, setShowSalahCalcConfig] = (0, import_react.useState)(false);
	const [salahDayOffset, setSalahDayOffset] = (0, import_react.useState)(0);
	const [prayerTimings, setPrayerTimings] = (0, import_react.useState)({
		Fajr: "4:52 AM",
		Dhuhr: "12:08 PM",
		Asr: "3:35 PM",
		Maghrib: "5:52 PM",
		Isha: "7:08 PM"
	});
	const [hijriLabel, setHijriLabel] = (0, import_react.useState)("1448 AH");
	const [isLiveTimingsSynced, setIsLiveTimingsSynced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		const formatTo12Hr = (raw24) => {
			const [hStr, mStr] = raw24.split(" ")[0].split(":");
			const h = Number(hStr);
			const m = Number(mStr);
			if (Number.isNaN(h) || Number.isNaN(m)) return raw24;
			const suffix = h >= 12 ? "PM" : "AM";
			return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${suffix}`;
		};
		const rawCity = user.city || "Jamshedpur";
		const rawCountry = user.country || "India";
		const city = encodeURIComponent(rawCity);
		const country = encodeURIComponent(rawCountry);
		const method = user.prayerCalculationMethod || 1;
		const school = user.prayerAsrSchool ?? 1;
		const todayDateKey = getLocalDateKeyWithOffset(0, /* @__PURE__ */ new Date());
		getCachedPrayerTimings(rawCity, rawCountry, method, school, todayDateKey).then((cached) => {
			if (!active || !cached) return;
			setPrayerTimings(cached.timings);
			if (cached.hijriLabel) setHijriLabel(cached.hijriLabel);
			setIsLiveTimingsSynced(true);
		}).catch(() => {});
		fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}&school=${school}`).then((res) => res.json()).then((json) => {
			if (!active || !json?.data?.timings) return;
			const tData = json.data.timings;
			const nextTimings = {
				Fajr: formatTo12Hr(tData.Fajr || "05:12"),
				Dhuhr: formatTo12Hr(tData.Dhuhr || "12:28"),
				Asr: formatTo12Hr(tData.Asr || "16:01"),
				Maghrib: formatTo12Hr(tData.Maghrib || "18:18"),
				Isha: formatTo12Hr(tData.Isha || "19:46")
			};
			setPrayerTimings(nextTimings);
			let computedHijri = hijriLabel;
			if (json.data?.date?.hijri) {
				const hj = json.data.date.hijri;
				computedHijri = `${hj.day} ${hj.month?.en || ""} ${hj.year} AH`;
				setHijriLabel(computedHijri);
			}
			setIsLiveTimingsSynced(true);
			saveCachedPrayerTimings({
				city: rawCity,
				country: rawCountry,
				method,
				school,
				dateKey: todayDateKey,
				timings: nextTimings,
				hijriLabel: computedHijri
			}).catch(() => {});
		}).catch(() => {});
		return () => {
			active = false;
		};
	}, [
		user.city,
		user.country,
		user.prayerCalculationMethod,
		user.prayerAsrSchool
	]);
	(0, import_react.useEffect)(() => {
		syncNativePrayerWidget({
			city: user.city || "Jamshedpur",
			hijriDate: hijriLabel,
			prayerTimes: prayerTimings
		});
	}, [
		user.city,
		hijriLabel,
		prayerTimings
	]);
	const [duaTab, setDuaTab] = (0, import_react.useState)("Categories");
	const [selectedDuaCategory, setSelectedDuaCategory] = (0, import_react.useState)(null);
	const [duaSearch, setDuaSearch] = (0, import_react.useState)("");
	const [nameIdx, setNameIdx] = (0, import_react.useState)(0);
	const [namesViewMode, setNamesViewMode] = (0, import_react.useState)("card");
	const [namesSearch, setNamesSearch] = (0, import_react.useState)("");
	const [namesQuizIdx, setNamesQuizIdx] = (0, import_react.useState)(0);
	const [namesQuizSelected, setNamesQuizSelected] = (0, import_react.useState)(null);
	const [namesQuizScore, setNamesQuizScore] = (0, import_react.useState)(0);
	const [namesQuizDone, setNamesQuizDone] = (0, import_react.useState)(false);
	const [seerahTab, setSeerahTab] = (0, import_react.useState)("Timeline");
	const [selectedSeerahId, setSelectedSeerahId] = (0, import_react.useState)(SEERAH_TIMELINE[0]?.id || "seerah_1");
	const [seerahSearch, setSeerahSearch] = (0, import_react.useState)("");
	const [seerahLocationFilter, setSeerahLocationFilter] = (0, import_react.useState)("All");
	(0, import_react.useEffect)(() => {
		if (adultRoute === "salah" && salahSubView !== "tracker") {
			registerSubScreenBackHandler(() => {
				setSalahSubView("tracker");
				return true;
			});
			return () => registerSubScreenBackHandler(null);
		}
		if (adultRoute === "duas" && selectedDuaCategory !== null) {
			registerSubScreenBackHandler(() => {
				setSelectedDuaCategory(null);
				setDuaSearch("");
				return true;
			});
			return () => registerSubScreenBackHandler(null);
		}
		registerSubScreenBackHandler(null);
		return () => registerSubScreenBackHandler(null);
	}, [
		adultRoute,
		salahSubView,
		selectedDuaCategory,
		registerSubScreenBackHandler
	]);
	const startPlayback = (audioUrl, arabicText, trackId = "adult_audio") => {
		const rate = user.playbackRate || 1;
		audioManager.playAudioUrl({
			id: trackId,
			url: audioUrl,
			fallbackText: arabicText,
			fallbackLang: "ar-SA",
			rate,
			repeat: repeatAyah,
			onError: (msg) => triggerToast(msg)
		});
	};
	(0, import_react.useEffect)(() => {
		audioManager.setRepeatEnabled(repeatAyah);
	}, [repeatAyah]);
	const [surahReloadTick, setSurahReloadTick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		setLoadingSurah(true);
		audioManager.stopAll();
		getSurahPayload(selectedSurahNumber, user.language, user.reciterName).then((payload) => {
			if (mounted) {
				setSurahPayload(payload);
				const targetAyahNum = user.lastRead.surahNumber === selectedSurahNumber ? user.lastRead.ayahNumber : 1;
				const initialIdx = resolveAyahIndexByNumber(payload.ayahs, targetAyahNum);
				setActiveAyahIdx(initialIdx);
				setLoadingSurah(false);
				if (adultRoute === "quran_read" && payload.ayahs.length > 0 && !payload.offlineUnavailable) {
					const firstAyah = payload.ayahs[initialIdx] || payload.ayahs[0];
					recordVerseRead(payload.meta.number, firstAyah.numberInSurah);
				}
			}
		});
		return () => {
			mounted = false;
		};
	}, [
		selectedSurahNumber,
		user.language,
		user.reciterName,
		surahReloadTick
	]);
	const speakArabicOrPlayAudio = (audioUrl, arabicText, trackId = "adult_audio") => {
		if (audioState.status === "playing" && (!trackId || audioState.activeTrackId === trackId)) {
			audioManager.pause();
			return;
		}
		if (audioState.status === "paused" && audioState.activeTrackId === trackId) {
			audioManager.resume();
			return;
		}
		startPlayback(audioUrl, arabicText, trackId);
	};
	const playQuranAyahAudio = (surahNumber, ayahNumberInSurah, globalAyahNumber) => {
		const trackId = `quran_${surahNumber}_${ayahNumberInSurah}`;
		const isSameSurahActive = audioState.activeTrackId === trackId || audioState.quranSequence.surahNumber === surahNumber && audioState.quranSequence.currentAyah === ayahNumberInSurah;
		if (audioState.status === "playing" && isSameSurahActive) {
			audioManager.pause();
			return;
		}
		if (audioState.status === "paused" && isSameSurahActive) {
			audioManager.resume();
			return;
		}
		if (repeatAyah) {
			audioManager.playQariRecitationAyah({
				id: trackId,
				surahNumber,
				ayahNumberInSurah,
				globalAyahNumber,
				reciterName: user.reciterName,
				rate: user.playbackRate || 1,
				repeat: true,
				repeatOption: "infinite",
				onError: (msg) => triggerToast(msg)
			});
			return;
		}
		audioManager.playFullSurah({
			surahNumber,
			startFromAyah: ayahNumberInSurah,
			reciterName: user.reciterName,
			rate: user.playbackRate || 1,
			repeatOption: 1,
			onAyahChange: (_sNum, nextAyahNum) => {
				if (!surahPayload || surahPayload.meta.number !== surahNumber) return;
				const nextIdx = surahPayload.ayahs.findIndex((a) => a.numberInSurah === nextAyahNum);
				if (nextIdx >= 0) setActiveAyahIdx(nextIdx);
			},
			onError: (msg) => triggerToast(msg)
		});
	};
	const { isAyahHighlighted: isAdultAyahHighlighted, registerAyahElement: registerAdultAyahElement } = useQuranAudioSync({
		surahNumber: surahPayload?.meta.number || selectedSurahNumber,
		ayahs: surahPayload?.ayahs || [],
		activeAyahIdx,
		onAyahIndexChange: setActiveAyahIdx,
		enabled: adultRoute === "quran_read",
		enableHaptics: true,
		autoScroll: true
	});
	const getDateKeyWithOffset = (offsetDays) => {
		return getLocalDateKeyWithOffset(offsetDays, /* @__PURE__ */ new Date());
	};
	const activeSalahDateKey = getDateKeyWithOffset(salahDayOffset);
	const activeSalahDateLabel = (() => {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() + salahDayOffset);
		return d.toLocaleDateString("en-US", {
			weekday: "short",
			day: "numeric",
			month: "short",
			year: "numeric"
		});
	})();
	const activeSalahPrayers = salahRecords[activeSalahDateKey]?.prayers || createEmptySalahDayRecord(activeSalahDateKey).prayers;
	const fontScaleClass = {
		1: "text-2xl",
		2: "text-3xl",
		3: "text-4xl",
		4: "text-5xl"
	}[user.arabicFontScale] || "text-3xl";
	const handleCopyText = (text, label) => {
		if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
		triggerToast(label);
	};
	const renderScreen = () => {
		switch (adultRoute) {
			case "home": {
				ISLAMIC_LESSONS.find((l) => !completedLessonIds.includes(l.id)) || ISLAMIC_LESSONS[0];
				const activeHifzPlan = hifzPlans.find((p) => p.surahNumber === user.lastRead.surahNumber) || hifzPlans.find((p) => p.status !== "completed") || hifzPlans[0];
				hifzPlans.reduce((acc, p) => acc + p.memorizedAyahs, 0);
				if (seniorMinimalMode) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] px-5 pt-safe pb-6 shadow-md space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
								time: "9:41",
								light: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-bold text-amber-300",
								children: ["Assalamu Alaikum, ", user.name]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-black tracking-tight",
								children: "Daily Worship Essentials"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-emerald-100/90 tabular-nums",
								children: [
									user.city,
									" · Fajr ",
									prayerTimings.Fajr,
									" · Maghrib ",
									prayerTimings.Maghrib
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pt-5 space-y-4 max-w-xl mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => openTodayInMushaf(user.lastRead.surahNumber, user.lastRead.ayahNumber),
									className: "min-h-[108px] rounded-[24px] bg-[#14532D] text-white p-5 text-left shadow-md flex flex-col justify-between active:scale-[0.98] transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-8 h-8 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xl font-black",
										children: "Read Qur'an"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-emerald-100 mt-0.5",
										children: [
											"Continue Surah ",
											user.lastRead.surahNumber,
											" · Large Mushaf"
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setAdultRoute("salah"),
									className: "min-h-[108px] rounded-[24px] bg-[var(--bg-surface)] border-2 border-[#14532D]/30 p-5 text-left shadow-xs flex flex-col justify-between active:scale-[0.98] transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-8 h-8 text-[#14532D] dark:text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xl font-black text-[var(--text-primary)]",
										children: "Prayer Times"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-[var(--text-secondary)] mt-0.5",
										children: "5 Daily Salah & Adhan Guard"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setAdultRoute("duas"),
									className: "min-h-[108px] rounded-[24px] bg-[var(--bg-surface)] border-2 border-amber-400/50 p-5 text-left shadow-xs flex flex-col justify-between active:scale-[0.98] transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-8 h-8 text-amber-600 dark:text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xl font-black text-[var(--text-primary)]",
										children: "Daily Duas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-[var(--text-secondary)] mt-0.5",
										children: "Morning, Evening & Healing Adhkar"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setAdultRoute("tasbih"),
									className: "min-h-[108px] rounded-[24px] bg-[var(--bg-surface)] border-2 border-emerald-500/40 p-5 text-left shadow-xs flex flex-col justify-between active:scale-[0.98] transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-8 h-8 text-emerald-700 dark:text-emerald-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xl font-black text-[var(--text-primary)]",
										children: "Tasbih Counter"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-[var(--text-secondary)] mt-0.5",
										children: "SubhanAllah · Alhamdulillah · Allahu Akbar"
									})] })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								triggerSelectionHaptic();
								setSeniorMinimalMode(false);
								triggerToast("Switched back to Full Ilmizo Mode");
							},
							className: "w-full min-h-[54px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm font-extrabold text-[#14532D] dark:text-emerald-200 active:scale-[0.98] transition",
							children: "Switch Back to Full Ilmizo Mode"
						})]
					})]
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-20 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultHomeHeroSection, {
						user,
						mode,
						onSelectMode: setMode,
						language,
						supportedLanguages,
						onSelectLanguage: setLanguage,
						activeHifzPlan,
						dailyVerseActivity,
						recentlyOpenedCount: recentlyOpenedSurahs.length,
						onStartLearning: () => openSurahForReading(user.lastRead.surahNumber, user.lastRead.ayahNumber),
						onOpenProfile: () => setAdultRoute("profile"),
						onOpenStreak: () => setAdultRoute("progress"),
						onOpenNotifications: () => {
							triggerToast(`Prayer & Hifz reminders active for ${user.city} (${prayerTimings.Dhuhr} Dhuhr)`);
						},
						t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3.5 pt-4 space-y-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextPrayerCard, {
								city: user.city,
								prayerTimings,
								activeSalahPrayers,
								isLiveTimingsSynced,
								onOpenSalah: () => setAdultRoute("salah"),
								t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAccessPillars, {
								onSelectRoute: setAdultRoute,
								t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KhatamPlannerCard, {
								compact: true,
								onOpenTodayInMushaf: (surahNum, ayahNum) => openTodayInMushaf(surahNum, ayahNum),
								onToast: triggerToast
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setAdultRoute("more"),
									className: "min-h-[60px] rounded-[20px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#14532D]/50 dark:hover:border-amber-400/45 px-4 py-3 shadow-2xs flex items-center justify-between gap-3 text-left transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-extrabold text-[#14532D] dark:text-amber-300",
										children: "Explore Islamic Tools"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[var(--text-secondary)] mt-0.5",
										children: "99 Names · Seerah · Qibla · Tasbih · Lessons · Calendar"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4 text-[#14532D] dark:text-amber-300 shrink-0" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMode("kids"),
									className: "min-h-[60px] rounded-[20px] bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A]/80 dark:from-amber-500/20 dark:to-amber-600/15 border border-amber-300/80 dark:border-amber-400/35 px-4 py-3 shadow-2xs flex items-center justify-between gap-3 text-left transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-extrabold text-[#0F3826] dark:text-amber-200",
										children: "Ilmizo Kids World"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-amber-950/85 dark:text-amber-100/80 mt-0.5",
										children: "10-Min Tarbiyah Plan · Noorani Qaida · 49 Stories"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4 text-[#0F3826] dark:text-amber-300 shrink-0" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between px-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-extrabold text-[var(--text-secondary)]",
										children: "Special Companions"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-[var(--text-muted)]",
										children: "Offline Ready"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar",
									children: [
										{
											id: "friday_hub",
											label: "Friday Hub"
										},
										{
											id: "car_drive",
											label: "Car Drive"
										},
										{
											id: "prophets_tree",
											label: "Prophets Tree"
										},
										{
											id: "reminder_cards",
											label: "Reminder Cards"
										},
										{
											id: "new_muslim",
											label: "New Muslim"
										}
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											triggerSelectionHaptic();
											setActiveSpecialModule(item.id);
										},
										className: "min-h-[44px] px-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#14532D]/50 text-xs font-extrabold text-[#14532D] dark:text-emerald-200 whitespace-nowrap shrink-0 shadow-2xs active:scale-95 transition",
										children: item.label
									}, item.id))
								})]
							}),
							false,
							false
						]
					})]
				});
			}
			case "quran_list": {
				const filteredSurahs = ALL_114_SURAHS.filter((s) => s.nameTranslit.toLowerCase().includes(surahSearch.toLowerCase()) || s.nameEnglish.toLowerCase().includes(surahSearch.toLowerCase()) || String(s.number).includes(surahSearch));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
								time: "9:41",
								light: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-4 pt-1 pb-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-lg font-extrabold tracking-tight",
										children: t("quran")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => openSurahForReading(user.lastRead.surahNumber, user.lastRead.ayahNumber),
										className: "min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-amber-400/20 border border-amber-300/50 flex items-center justify-center text-amber-300 transition active:scale-95",
										title: "Resume Last Read",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full",
								children: [
									{
										id: "Surah",
										label: t("surah")
									},
									{
										id: "Juz",
										label: t("juz")
									},
									{
										id: "Bookmarks",
										label: `${t("bookmarks")} (${bookmarks.length})`
									}
								].map((tabItem) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setQuranTab(tabItem.id),
									className: `min-h-[38px] py-1.5 rounded-full text-xs font-extrabold transition ${quranTab === tabItem.id ? "bg-amber-400 text-emerald-950 shadow-xs" : "text-emerald-100 hover:bg-white/10"}`,
									children: tabItem.label
								}, tabItem.id))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pt-3 space-y-3",
						children: [
							quranTab === "Surah" && !surahSearch.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KhatamPlannerCard, {
								onOpenTodayInMushaf: (surahNum, ayahNum) => openTodayInMushaf(surahNum, ayahNum),
								onToast: triggerToast
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: surahSearch,
									onChange: (e) => setSurahSearch(e.target.value),
									placeholder: "Search Surah, 2:255 ref, Arabic, or translation...",
									className: "w-full min-h-[44px] rounded-full ilmizo-input pl-10 pr-4 py-2.5 text-xs font-medium shadow-2xs"
								})]
							}),
							surahSearch.trim().length >= 2 && offlineVerseMatches.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 space-y-2 shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-extrabold text-[#14532D] dark:text-amber-300 uppercase tracking-wider",
									children: [
										"Matching Verses in Offline Quran (",
										offlineVerseMatches.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "divide-y divide-[var(--divider)] max-h-56 overflow-y-auto",
									children: offlineVerseMatches.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => openSurahForReading(m.surahNumber, m.ayahNumberInSurah),
										className: "w-full py-2.5 text-left hover:bg-[var(--bg-elevated)] px-2 rounded-xl transition space-y-0.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-xs font-bold text-[var(--text-primary)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													m.surahNumber,
													". ",
													m.surahNameTranslit,
													" · Ayah ",
													m.ayahNumberInSurah,
													" (Juz",
													" ",
													m.juzNumber,
													")"
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-semibold text-amber-700 dark:text-amber-300",
													children: m.matchedField
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-arabic text-base text-[var(--text-primary)] text-right",
												dir: "rtl",
												children: m.arabicUthmani
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[var(--text-secondary)] line-clamp-2",
												children: m.translationSnippet
											})
										]
									}, `${m.surahNumber}_${m.ayahNumberInSurah}`))
								})]
							}),
							quranTab === "Surah" && !surahSearch && recentlyOpenedSurahs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2 overflow-x-auto pb-1",
								children: recentlyOpenedSurahs.map((sNum) => {
									const sMeta = ALL_114_SURAHS.find((s) => s.number === sNum);
									if (!sMeta) return null;
									const isLastRead = user.lastRead.surahNumber === sNum;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => openSurahForReading(sNum, isLastRead ? user.lastRead.ayahNumber : 1),
										className: `min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap border transition flex items-center gap-1.5 ${isLastRead ? "bg-[#14532D] text-amber-200 border-[#14532D] dark:border-amber-400/40 shadow-2xs" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-emerald-700"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											sMeta.number,
											". ",
											sMeta.nameTranslit
										] }), isLastRead && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] text-amber-300 font-bold",
											children: ["· Ayah ", user.lastRead.ayahNumber]
										})]
									}, sNum);
								})
							}),
							quranTab === "Bookmarks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: bookmarks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-3xl bg-[var(--bg-surface)] p-8 text-center border border-[var(--border-subtle)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-[var(--text-secondary)]",
										children: "No verses bookmarked yet. Tap the Bookmark icon while reading any Surah."
									})
								}) : bookmarks.map((bm) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full text-left rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => openSurahForReading(bm.surahNumber, bm.ayahNumber),
										className: "flex-1 text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm font-bold text-[var(--text-primary)]",
											children: [
												bm.surahName,
												" · Ayah ",
												bm.ayahNumber
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-arabic text-lg text-[var(--text-secondary)] mt-0.5",
											children: bm.arabicSnippet
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkPopButton, {
										saved: true,
										onToggle: () => toggleBookmark({
											surahNumber: bm.surahNumber,
											surahName: bm.surahName,
											ayahNumber: bm.ayahNumber,
											arabicSnippet: bm.arabicSnippet
										})
									})]
								}, bm.id))
							}) : quranTab === "Juz" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2.5",
								children: ALL_30_JUZ_BOUNDARIES.map((juzInfo) => {
									const endSurahMeta = ALL_114_SURAHS.find((s) => s.number === juzInfo.endSurahNumber);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => openSurahForReading(juzInfo.startSurahNumber, juzInfo.startAyahNumber),
										className: "rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] hover:border-emerald-700 dark:hover:border-amber-400/50 text-left transition",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-sm font-bold text-[var(--text-primary)] tabular-nums",
													children: ["Juz ", juzInfo.juz]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-arabic text-sm text-amber-700 dark:text-amber-300 font-bold",
													children: juzInfo.nameArabic
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-[var(--text-secondary)] font-semibold mt-0.5",
												children: [
													juzInfo.startSurahName,
													" · Ayah ",
													juzInfo.startAyahNumber
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-[var(--text-muted)]",
												children: [
													"Ends: ",
													endSurahMeta?.nameTranslit || `Surah ${juzInfo.endSurahNumber}`,
													" ",
													juzInfo.endAyahNumber
												]
											})
										]
									}, juzInfo.juz);
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)] divide-y divide-[var(--divider)] shadow-xs overflow-hidden",
								children: filteredSurahs.map((surah) => {
									const hasBookmark = bookmarks.some((b) => b.surahNumber === surah.number);
									const isLastRead = user.lastRead.surahNumber === surah.number;
									const offlineState = getSurahOfflineAvailability(surah.number, storageMetrics.downloadedSurahNumbers, storageMetrics.cachedSurahNumbers);
									const isDownloadedIdb = storageMetrics.downloadedSurahNumbers.includes(surah.number);
									const offlineStatusLabel = offlineState === "bundled_full" ? "Bundled Offline" : offlineState === "downloaded" ? "Saved Offline" : offlineState === "bundled_partial" ? "Key Verses Offline" : offlineState === "cached" ? "Cached" : "";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-full px-4 py-3 hover:bg-[var(--bg-elevated)] transition flex items-center justify-between gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => openSurahForReading(surah.number, isLastRead ? user.lastRead.ayahNumber : 1),
											className: "flex items-center gap-3 flex-1 text-left min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-6 text-xs font-bold text-[var(--text-muted)] tabular-nums shrink-0",
													children: surah.number
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-arabic text-xl text-[#14532D] dark:text-amber-300 font-bold w-16 text-center shrink-0",
													children: surah.nameArabic
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex flex-wrap items-center gap-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-sm font-extrabold text-[var(--text-primary)]",
																children: surah.nameTranslit
															}), isLastRead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[11px] font-extrabold text-[#14532D] dark:text-amber-300",
																children: "· Last Read"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-xs text-[var(--text-secondary)] truncate",
															children: surah.nameEnglish
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[11px] text-[var(--text-muted)] tabular-nums",
															children: [
																surah.ayahCount,
																" ayahs · ",
																surah.revelationType,
																offlineStatusLabel ? ` · ${offlineStatusLabel}` : ""
															]
														})
													]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 shrink-0",
											children: [offlineState !== "bundled_full" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: async () => {
													if (isDownloadedIdb) {
														await deleteOfflineSurah(surah.number);
														triggerToast(`Removed offline download for ${surah.nameTranslit}`);
													} else {
														const res = await downloadSurahOffline(surah.number);
														triggerToast(res.ok ? `Saved ${surah.nameTranslit} on this device for offline reading` : res.error || "Unable to download Surah while offline");
													}
												},
												className: `min-w-[40px] min-h-[40px] rounded-xl border flex items-center justify-center transition ${isDownloadedIdb ? "bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/50" : "bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[#14532D] dark:hover:text-amber-300"}`,
												title: isDownloadedIdb ? `Saved offline (${surah.nameTranslit}) — Tap to remove download` : `Download ${surah.nameTranslit} for offline reading`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkPopButton, {
												saved: hasBookmark,
												onToggle: () => {
													toggleBookmark({
														surahNumber: surah.number,
														surahName: surah.nameTranslit,
														ayahNumber: 1,
														arabicSnippet: surah.nameArabic
													});
													triggerToast(hasBookmark ? `Removed ${surah.nameTranslit} bookmark` : `Bookmarked ${surah.nameTranslit}`);
												}
											})]
										})]
									}, surah.number);
								})
							})
						]
					})]
				});
			}
			case "quran_read": {
				const currentAyah = surahPayload?.ayahs[activeAyahIdx] || surahPayload?.ayahs[0];
				const isBookmarked = currentAyah && bookmarks.some((b) => b.surahNumber === selectedSurahNumber && b.ayahNumber === currentAyah.numberInSurah);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 min-h-full transition-colors bg-[var(--bg-app)] text-[var(--text-primary)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white pb-3 shadow-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
								time: "9:31",
								light: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 px-3.5 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center justify-center gap-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
												title: "Select Surah",
												subtitle: "Jump to any of the 114 Surahs",
												ariaLabel: "Switch Surah",
												variant: "dark-pill",
												searchable: true,
												searchPlaceholder: "Search Surah name or number…",
												className: "max-w-[185px] sm:max-w-[225px]",
												value: String(selectedSurahNumber),
												onChange: (val) => {
													audioManager.stopAll();
													openSurahForReading(Number(val), 1);
												},
												options: ALL_114_SURAHS.map((s) => ({
													value: String(s.number),
													label: `${s.number}. ${s.nameTranslit}`,
													subtitle: `${s.nameEnglish} · ${s.nameArabic}`,
													badge: `${s.ayahCount} ayahs`
												}))
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-emerald-200 tabular-nums truncate",
											children: [
												currentAyah?.mushafPage ? `Page ${currentAyah.mushafPage} · ` : "",
												"Juz ",
												currentAyah?.juzNumber || surahPayload?.meta.juz || 1,
												surahPayload?.offlineSourceType === "bundled_full" ? " · Bundled" : surahPayload?.offlineSourceType === "downloaded_idb" ? " · Saved Offline" : surahPayload?.offlineSourceType === "cached_idb" ? " · Cached" : surahPayload?.isPartialOfflineBundle ? " · Key Verses" : ""
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 shrink-0",
										children: [
											surahPayload && surahPayload.offlineSourceType !== "bundled_full" && surahPayload.offlineSourceType !== "downloaded_idb" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: async () => {
													const res = await downloadSurahOffline(selectedSurahNumber);
													triggerToast(res.ok ? `Saved Surah ${selectedSurahNumber} on this device for offline reading` : res.error || "Unable to download Surah while offline");
													if (res.ok) setSurahReloadTick((t) => t + 1);
												},
												className: "w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-amber-300 transition",
												title: "Save full Surah on this device for offline reading",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: "w-4 h-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: toggleAudioMute,
												"aria-pressed": isAudioMuted,
												className: `px-2.5 h-10 rounded-full flex items-center gap-1 text-xs font-extrabold border transition ${!isAudioMuted ? "bg-white/15 text-emerald-100 border-white/20 hover:bg-white/25" : "bg-rose-500/25 text-rose-200 border-rose-400/40"}`,
												title: isAudioMuted ? "Audio is Muted — Tap to Unmute" : "Audio Sound On — Tap to Mute",
												children: [!isAudioMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5 text-amber-300" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-3.5 h-3.5 text-rose-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hidden xs:inline",
													children: !isAudioMuted ? "Sound" : "Muted"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowReaderControls(true),
												className: "w-10 h-10 flex items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20 transition",
												title: "Reader Settings, Qari Reciter & Appearance",
												"aria-label": "Open Reader Settings and Reciter Selector",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "w-4 h-4" })
											})
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
							open: showReaderControls,
							onClose: () => setShowReaderControls(false),
							title: "Reader Settings & Reciter",
							subtitle: "Customize Arabic script size, Qari audio, playback speed, and appearance.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-[var(--text-secondary)]",
											children: "Appearance"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeModeSegmentedControl, {
											value: themeMode,
											onChange: setThemeMode,
											compact: true
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-extrabold text-[var(--text-primary)]",
											children: "Arabic Script Size"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1.5",
											children: [
												1,
												2,
												3,
												4
											].map((scale) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => updateUser({ arabicFontScale: scale }),
												className: `min-w-[40px] min-h-[38px] px-2.5 rounded-xl font-extrabold text-xs border transition ${user.arabicFontScale === scale ? "bg-[#14532D] text-amber-300 border-[#14532D]" : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
												children: scale === 1 ? "A-" : scale === 4 ? "A+" : `${scale}x`
											}, scale))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-extrabold text-[var(--text-primary)]",
											children: "Audio Speed"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1.5",
											children: [
												.75,
												1,
												1.25,
												1.5
											].map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => updateUser({ playbackRate: rate }),
												className: `min-h-[38px] px-2.5 rounded-xl font-extrabold text-xs tabular-nums border transition ${(user.playbackRate || 1) === rate ? "bg-[#14532D] text-amber-300 border-[#14532D]" : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
												children: [rate, "x"]
											}, rate))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-[var(--text-primary)]",
											children: "Qari Reciter"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-1.5",
											children: [
												{
													id: "Mishary Rashid Alafasy",
													edition: "ar.alafasy",
													style: "Murattal · Balanced pace"
												},
												{
													id: "Abdul Basit Abdus Samad",
													edition: "ar.abdulbasitmurattal",
													style: "Classic Murattal"
												},
												{
													id: "Abdur-Rahman as-Sudais",
													edition: "ar.abdurrahmaansudais",
													style: "Haramain · Clear articulation"
												},
												{
													id: "Mahmoud Khalil Al-Husary",
													edition: "ar.husary",
													style: "Tajweed teacher pace"
												}
											].map((qari) => {
												const selected = (user.reciterName || "Mishary Rashid Alafasy") === qari.id;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => {
														updateUser({ reciterName: qari.id });
														triggerToast(`Reciter switched to ${qari.id}`);
													},
													className: `w-full min-h-[48px] px-3.5 py-2.5 rounded-2xl border text-left flex items-center justify-between gap-2 transition ${selected ? "bg-[#14532D] text-white border-[#D4AF37]" : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[#14532D]/50"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-extrabold",
														children: qari.id
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: `text-[11px] ${selected ? "text-emerald-200" : "text-[var(--text-muted)]"}`,
														children: qari.style
													})] }), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-amber-300 shrink-0" })]
												}, qari.id);
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 pt-2 border-t border-[var(--divider)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-[var(--text-primary)]",
											children: "Offline Qari Audio"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-[var(--text-muted)]",
											children: [
												"Save Surah ",
												selectedSurahNumber,
												" on device"
											]
										})] }), (() => {
											const activeReciterCfg = resolveReciterConfig(user.reciterName);
											const audioKey = `${activeReciterCfg.editionId}:${selectedSurahNumber}`;
											return storageMetrics.downloadedAudioKeys.includes(audioKey) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-700 dark:text-emerald-300 font-bold text-xs",
												children: "Saved Offline"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												disabled: downloadingQariSurah,
												onClick: async () => {
													setDownloadingQariSurah(true);
													triggerToast(`Downloading ${activeReciterCfg.label} audio for Surah ${selectedSurahNumber}...`);
													const res = await audioDownloadManager.downloadSurahQariAudio({
														surahNumber: selectedSurahNumber,
														reciterName: activeReciterCfg.id
													});
													setDownloadingQariSurah(false);
													triggerToast(res.ok ? `Saved ${activeReciterCfg.label} audio for Surah ${selectedSurahNumber} offline!` : res.error || "Could not download Qari audio.");
												},
												className: "min-h-[40px] px-3.5 rounded-xl bg-amber-400 text-emerald-950 font-extrabold text-xs flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: downloadingQariSurah ? "Downloading…" : "Download" })]
											});
										})()]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 pt-2 border-t border-[var(--divider)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-extrabold text-[var(--text-primary)]",
											children: "Translation Display"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowTranslation(!showTranslation),
											className: `min-h-[40px] px-3.5 rounded-xl font-extrabold text-xs border transition ${showTranslation ? "bg-[#14532D] text-amber-200 border-[#14532D]" : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
											children: showTranslation ? "Shown" : "Hidden"
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3.5",
							children: loadingSurah ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								"aria-busy": "true",
								"aria-label": "Loading Surah",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonList, { count: 4 })
							}) : surahPayload && (surahPayload.offlineUnavailable || surahPayload.ayahs.length === 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-3xl border-2 border-[#D4AF37] p-6 text-center shadow-md space-y-4 ${user.darkMode ? "bg-[#0B291C] text-white" : "bg-[#FFFDF7] text-slate-900"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 rounded-2xl bg-amber-400/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-amber-500",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-6 h-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-block px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-[11px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-300",
												children: "Offline Mode — Not Saved on Device"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
												className: "text-lg font-extrabold",
												children: [
													"Surah ",
													surahPayload.meta.number,
													": ",
													surahPayload.meta.nameTranslit,
													" (",
													surahPayload.meta.nameEnglish,
													")"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: `text-xs leading-relaxed max-w-xs mx-auto ${user.darkMode ? "text-emerald-100/90" : "text-slate-600"}`,
												children: [
													"Surah ",
													surahPayload.meta.nameTranslit,
													" (",
													surahPayload.meta.ayahCount,
													" Ayahs) has not been downloaded to your offline storage yet. Connect to the internet once to cache its verified Uthmani text and audio."
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row gap-2 justify-center pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSurahReloadTick((t) => t + 1),
											className: "px-4 py-2.5 rounded-xl bg-[#14532D] text-white text-xs font-extrabold shadow-xs hover:bg-emerald-800 transition",
											children: "Retry Connection"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setAdultRoute("quran_list"),
											className: "px-4 py-2.5 rounded-xl bg-amber-400 text-emerald-950 text-xs font-extrabold shadow-xs hover:bg-amber-300 transition",
											children: "Browse Offline-Ready Surahs"
										})]
									})
								]
							}) : surahPayload && currentAyah && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									role: "tablist",
									"aria-label": "Quran Reading Mode",
									className: "grid grid-cols-3 gap-1.5 p-1 rounded-2xl border bg-[var(--bg-surface)] border-[var(--border-subtle)] shadow-2xs",
									children: [
										{
											id: "card",
											label: "Card View"
										},
										{
											id: "mushaf",
											label: "Mushaf Mode"
										},
										{
											id: "study",
											label: "Study View"
										}
									].map((tab) => {
										const active = readerViewMode === tab.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											role: "tab",
											"aria-selected": active,
											onClick: () => handleChangeReaderViewMode(tab.id),
											className: `min-h-[44px] rounded-xl text-xs font-extrabold transition ${active ? "bg-[#14532D] text-amber-300 shadow-2xs" : "text-[var(--text-secondary)] hover:bg-emerald-500/10"}`,
											children: tab.label
										}, tab.id);
									})
								}), readerViewMode === "mushaf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuranMushafView, {
									surahPayload,
									activeAyahNumber: currentAyah.numberInSurah,
									arabicFontScale: user.arabicFontScale || 2,
									darkMode: user.darkMode,
									language,
									onSelectAyah: (ayahNum) => {
										const idx = surahPayload.ayahs.findIndex((a) => a.numberInSurah === ayahNum);
										if (idx >= 0) setActiveAyahIdx(idx);
										recordVerseRead(surahPayload.meta.number, ayahNum);
									},
									onPlayAyahAudio: (ayah) => playQuranAyahAudio(surahPayload.meta.number, ayah.numberInSurah, ayah.globalNumber),
									onToggleBookmarkAyah: (ayah) => {
										toggleBookmark({
											surahNumber: surahPayload.meta.number,
											surahName: surahPayload.meta.nameTranslit,
											ayahNumber: ayah.numberInSurah,
											arabicSnippet: ayah.arabicUthmani.slice(0, 64)
										});
										triggerToast(`Updated bookmark for ${surahPayload.meta.nameTranslit} ${surahPayload.meta.number}:${ayah.numberInSurah}`);
									},
									isAyahBookmarked: (ayahNum) => bookmarks.some((b) => b.surahNumber === surahPayload.meta.number && b.ayahNumber === ayahNum),
									onNavigateToSurahAyah: (nextSurah, nextAyah) => openSurahForReading(nextSurah, nextAyah),
									onCreateReminderCard: (ayah) => openAyahInReminderStudio(ayah, surahPayload.meta),
									onToast: triggerToast
								}) : readerViewMode === "study" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 flex flex-wrap items-center justify-between gap-2 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-extrabold text-[#14532D] dark:text-amber-300",
											children: [
												"Study View · ",
												surahPayload.meta.nameTranslit,
												" (",
												surahPayload.ayahs.length,
												" Ayahs)"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1 bg-[var(--bg-subtle)] p-0.5 rounded-xl border border-[var(--border-subtle)]",
											children: [{
												id: "uthmani",
												label: "Madani"
											}, {
												id: "indopak",
												label: "IndoPak"
											}].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-pressed": adultScriptStyle === opt.id,
												onClick: () => setAdultScriptStyle(opt.id),
												className: `min-h-[32px] px-2.5 rounded-lg text-[11px] font-extrabold transition ${adultScriptStyle === opt.id ? "bg-[#14532D] text-amber-300" : "text-[var(--text-secondary)]"}`,
												children: opt.label
											}, opt.id))
										})]
									}), surahPayload.ayahs.slice(0, Math.max(40, activeAyahIdx + 12)).map((ayah) => {
										const saved = bookmarks.some((b) => b.surahNumber === surahPayload.meta.number && b.ayahNumber === ayah.numberInSurah);
										const isReciting = isAdultAyahHighlighted(ayah.numberInSurah);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											ref: registerAdultAyahElement(ayah.numberInSurah),
											"data-study-ayah": ayah.numberInSurah,
											className: `rounded-3xl border p-4 space-y-2.5 shadow-2xs transition-all duration-300 ${isReciting ? "ilmizo-ayah-playing bg-amber-50/70 dark:bg-emerald-950/70 text-[var(--text-primary)]" : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs font-extrabold text-amber-700 dark:text-amber-300 tabular-nums",
															children: [
																surahPayload.meta.number,
																":",
																ayah.numberInSurah
															]
														}), isReciting && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "px-2 py-0.5 rounded-full bg-amber-400/25 border border-amber-400/60 text-[11px] font-extrabold text-amber-900 dark:text-amber-200 inline-flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reciting" })]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															onClick: () => playQuranAyahAudio(surahPayload.meta.number, ayah.numberInSurah, ayah.globalNumber),
															className: `min-h-[40px] px-3 rounded-xl text-xs font-extrabold inline-flex items-center gap-1 transition ${isReciting ? "bg-amber-400 text-emerald-950" : "bg-[#14532D] text-white"}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: `w-3.5 h-3.5 ${isReciting ? "text-emerald-950" : "text-amber-300"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isReciting ? "Playing" : "Play" })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkPopButton, {
															saved,
															onToggle: () => toggleBookmark({
																surahNumber: surahPayload.meta.number,
																surahName: surahPayload.meta.nameTranslit,
																ayahNumber: ayah.numberInSurah,
																arabicSnippet: ayah.arabicUthmani.slice(0, 64)
															})
														})]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													dir: "rtl",
													lang: "ar",
													className: `${getArabicScriptFontClass(adultScriptStyle)} text-2xl sm:text-3xl text-right`,
													children: formatAyahTextForScript(ayah.arabicUthmani, adultScriptStyle)
												}),
												ayah.transliteration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs italic text-emerald-800 dark:text-emerald-200",
													children: ayah.transliteration
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm leading-relaxed",
													children: resolveText(ayah.translations, ayah.translations.en)
												}),
												ayah.tafsirBrief && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-slate-600 dark:text-emerald-100/80 border-t border-slate-100 dark:border-white/10 pt-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Brief Tafsir:" }),
														" ",
														ayah.tafsirBrief
													]
												})
											]
										}, ayah.numberInSurah);
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									ref: registerAdultAyahElement(currentAyah.numberInSurah),
									"data-card-ayah": currentAyah.numberInSurah,
									className: `rounded-3xl border-[3px] border-[#D4AF37] p-4 shadow-md space-y-4 relative overflow-hidden transition-all duration-300 ${isAdultAyahHighlighted(currentAyah.numberInSurah) ? "ilmizo-ayah-playing" : ""} ${user.darkMode ? "bg-[#0B291C] text-white" : "bg-[#FFFDF7] text-slate-900"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `relative rounded-2xl border-2 border-[#D4AF37] pt-2 pb-4 px-3 text-center shadow-inner overflow-hidden ${user.darkMode ? "bg-gradient-to-b from-[#133E2B] via-[#0B291C] to-[#081F15]" : "bg-gradient-to-b from-[#E6C687]/45 via-[#FEF3C7]/60 to-[#FFFDF7]"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative -mx-3 -mt-2 mb-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
														viewBox: "0 0 360 66",
														className: "w-full h-14 block",
														preserveAspectRatio: "none",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
																id: "mushafGoldGrad",
																x1: "0",
																y1: "0",
																x2: "1",
																y2: "0",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																		offset: "0%",
																		stopColor: "#B45309"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																		offset: "25%",
																		stopColor: "#FDE68A"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																		offset: "50%",
																		stopColor: "#D97706"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																		offset: "75%",
																		stopColor: "#FDE68A"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																		offset: "100%",
																		stopColor: "#B45309"
																	})
																]
															}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
																d: "M0,0 L360,0 L360,64 C305,64 275,20 180,10 C85,20 55,64 0,64 Z",
																fill: "#0F3826"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
																d: "M0,62 C55,62 85,20 180,10 C275,20 305,62 360,62",
																fill: "none",
																stroke: "url(#mushafGoldGrad)",
																strokeWidth: "3.5"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
																d: "M0,56 C60,56 90,26 180,16 C270,26 300,56 360,56",
																fill: "none",
																stroke: "#FDE68A",
																strokeWidth: "1",
																strokeDasharray: "4 3",
																opacity: "0.8"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
																cx: "26",
																cy: "22",
																r: "10",
																fill: "none",
																stroke: "#FDE68A",
																strokeWidth: "1.5"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
																cx: "26",
																cy: "22",
																r: "4",
																fill: "#F59E0B"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
																cx: "334",
																cy: "22",
																r: "10",
																fill: "none",
																stroke: "#FDE68A",
																strokeWidth: "1.5"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
																cx: "334",
																cy: "22",
																r: "4",
																fill: "#F59E0B"
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute inset-x-0 top-1.5 flex items-center justify-center",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "px-3 py-0.5 rounded-full bg-[#0A261A]/90 border border-[#D4AF37] text-[11px] font-extrabold tracking-widest uppercase text-amber-200 shadow-2xs",
															children: [
																"Surah ",
																surahPayload.meta.number,
																" · Juz ",
																surahPayload.meta.juz
															]
														})
													})]
												}),
												surahPayload.meta.number !== 9 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `font-arabic text-2xl font-bold pt-1 ${user.darkMode ? "text-amber-200" : "text-emerald-950"}`,
													children: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-3.5 space-y-3 px-1",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveTajweedAyahView, {
														ayah: currentAyah,
														surahNumber: surahPayload.meta.number,
														fontScaleClass,
														darkMode: user.darkMode,
														onPlayAyahAudio: () => playQuranAyahAudio(surahPayload.meta.number, currentAyah.numberInSurah, currentAyah.globalNumber)
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-2 flex justify-center gap-1.5 text-amber-600/80 text-xs",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "❖" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦" })
													]
												})
											]
										}),
										showTranslation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "px-1 space-y-2.5 text-left",
											children: [currentAyah.transliteration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `rounded-xl px-3 py-2 border-l-2 border-[#D4AF37] ${user.darkMode ? "bg-white/5" : "bg-emerald-950/5"}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `text-xs font-semibold italic leading-relaxed ${user.darkMode ? "text-emerald-200" : "text-emerald-900"}`,
													children: currentAyah.transliteration
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-2.5 px-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: `text-sm leading-relaxed flex-1 ${user.darkMode ? "text-emerald-50" : "text-slate-800"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
														className: "tabular-nums mr-1.5 text-[#14532D] dark:text-amber-300",
														children: [currentAyah.numberInSurah, "."]
													}), resolveText(currentAyah.translations, currentAyah.translations.en)]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5 shrink-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => openAyahInReminderStudio(currentAyah, surahPayload.meta),
														title: "Create Shareable Reminder Card from this Ayah",
														className: "min-h-[38px] px-2.5 rounded-full bg-amber-400/25 hover:bg-amber-400/40 text-amber-900 dark:text-amber-200 border border-amber-400/50 text-[11px] font-extrabold inline-flex items-center gap-1 transition",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Card" })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => handleCopyText(`${currentAyah.arabicUthmani}\n"${resolveText(currentAyah.translations, currentAyah.translations.en)}"\n— Quran ${surahPayload.meta.nameTranslit} (${surahPayload.meta.number}:${currentAyah.numberInSurah})`, `Copied ${surahPayload.meta.nameTranslit} ${surahPayload.meta.number}:${currentAyah.numberInSurah}`),
														title: "Share / Copy Ayah with Verified Attribution",
														className: "min-w-[38px] min-h-[38px] p-2 rounded-full bg-emerald-950/10 hover:bg-emerald-950/20 text-[#14532D] dark:bg-white/10 dark:text-amber-200 flex items-center justify-center shrink-0",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-3.5 h-3.5" })
													})]
												})]
											})]
										}),
										showTafsir && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `rounded-2xl border p-3 text-xs space-y-1 ${user.darkMode ? "bg-black/30 border-emerald-700/40 text-emerald-100" : "bg-emerald-950/5 border-emerald-900/15 text-slate-700"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-amber-500",
												children: "Tafsir & Reflection"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: currentAyah.tafsirBrief })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between px-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setShowVerseNotes(!showVerseNotes),
												className: "text-xs font-extrabold text-[#14532D] dark:text-amber-300 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"Verse Notes (",
													personalNotes.filter((n) => n.surahNumber === surahPayload.meta.number && n.ayahNumber === currentAyah.numberInSurah || n.surahReference?.includes(`${surahPayload.meta.number}:${currentAyah.numberInSurah}`)).length,
													")"
												] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[11px] font-bold text-[var(--text-muted)] tabular-nums",
												children: [
													user.playbackRate || 1,
													"x · ",
													(user.reciterName || "Mishary").split(" ")[0]
												]
											})]
										}),
										showVerseNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-3 text-xs space-y-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
												onSubmit: (e) => {
													e.preventDefault();
													if (!newVerseNoteBody.trim()) return;
													addPersonalNote(`${surahPayload.meta.nameTranslit} ${surahPayload.meta.number}:${currentAyah.numberInSurah}`, newVerseNoteBody.trim(), `${surahPayload.meta.nameTranslit} ${surahPayload.meta.number}:${currentAyah.numberInSurah}`, surahPayload.meta.number, currentAyah.numberInSurah);
													setNewVerseNoteBody("");
													triggerToast("Saved reflection note for this Ayah");
												},
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: newVerseNoteBody,
													onChange: (e) => setNewVerseNoteBody(e.target.value),
													placeholder: `Write a personal reflection on ${surahPayload.meta.nameTranslit} ${surahPayload.meta.number}:${currentAyah.numberInSurah}...`,
													className: "flex-1 rounded-xl ilmizo-input px-3 py-2 text-xs"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "submit",
													className: "px-3.5 py-2 rounded-xl bg-[#14532D] text-white font-extrabold text-xs shrink-0",
													children: "Save"
												})]
											}), personalNotes.filter((n) => n.surahNumber === surahPayload.meta.number && n.ayahNumber === currentAyah.numberInSurah || n.surahReference?.includes(`${surahPayload.meta.number}:${currentAyah.numberInSurah}`)).map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-2.5 flex items-start justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "font-bold text-[#14532D] dark:text-amber-300 text-[11px]",
													children: [
														note.surahReference || note.title,
														" · ",
														note.createdAt
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[var(--text-secondary)] mt-0.5",
													children: note.body
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => deletePersonalNote(note.id),
													className: "text-[var(--text-muted)] hover:text-rose-500 p-1",
													title: "Delete Note",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
												})]
											}, note.id))]
										}),
										(audioState.status !== "idle" || audioState.errorMessage) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `rounded-2xl px-3.5 py-2 border flex items-center justify-between gap-2 text-xs ${audioState.status === "error" ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-700/40 text-rose-800 dark:text-rose-200" : "bg-amber-50/90 dark:bg-amber-500/15 border-amber-300/70 dark:border-amber-400/35 text-emerald-950 dark:text-amber-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4 shrink-0 text-[#14532D] dark:text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold truncate",
													children: audioState.status === "loading" ? "Loading recitation audio..." : audioState.status === "playing" ? `Playing Ayah ${currentAyah.numberInSurah}${repeatAyah ? " (Repeat ON)" : ""}` : audioState.status === "paused" ? `Paused Ayah ${currentAyah.numberInSurah}` : audioState.errorMessage || "Audio stopped"
												})]
											}), (audioState.status === "playing" || audioState.status === "paused" || audioState.status === "loading") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => audioManager.stopAll(),
												className: "px-2.5 py-1 rounded-full bg-rose-600 text-white text-[11px] font-extrabold shrink-0 hover:bg-rose-700 transition",
												children: "Stop"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuranAdvancedAudioPlayerBar, {
											surahPayload,
											activeAyahIdx,
											onSelectAyahIdx: (idx) => setActiveAyahIdx(idx),
											onTriggerToast: triggerToast
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-4 gap-2 pt-1",
											children: [
												{
													label: audioState.status === "loading" ? "Loading..." : isPlayingAudio ? "Pause" : isPausedAudio ? "Resume" : t("audio"),
													icon: isPlayingAudio ? Pause : Play,
													active: isPlayingAudio || isPausedAudio,
													onClick: () => playQuranAyahAudio(surahPayload.meta.number, currentAyah.numberInSurah, currentAyah.globalNumber)
												},
												{
													label: t("repeat"),
													icon: Repeat,
													active: repeatAyah,
													onClick: () => {
														const nextRepeat = !repeatAyah;
														setRepeatAyah(nextRepeat);
														audioManager.setRepeatEnabled(nextRepeat);
														triggerToast(nextRepeat ? "Repeat Ayah: ON" : "Repeat Ayah: OFF");
													}
												},
												{
													label: t("tafsir"),
													icon: BookOpen,
													active: showTafsir,
													onClick: () => setShowTafsir(!showTafsir)
												},
												{
													label: isBookmarked ? t("saved") : t("bookmark"),
													icon: Bookmark,
													active: Boolean(isBookmarked),
													onClick: () => {
														toggleBookmark({
															surahNumber: surahPayload.meta.number,
															surahName: surahPayload.meta.nameTranslit,
															ayahNumber: currentAyah.numberInSurah,
															arabicSnippet: currentAyah.arabicUthmani
														});
														triggerToast(isBookmarked ? "Removed verse bookmark" : `Bookmarked ${surahPayload.meta.nameTranslit} ${surahPayload.meta.number}:${currentAyah.numberInSurah}`);
													}
												}
											].map((btn) => {
												const Icon = btn.icon;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: btn.onClick,
													className: "flex flex-col items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: `w-11 h-11 rounded-full flex items-center justify-center shadow-sm transition active:scale-95 ${btn.active ? "bg-amber-400 text-emerald-950" : "bg-[#14532D] text-white hover:bg-emerald-800"}`,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-5 h-5" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `text-[11px] font-bold ${user.darkMode ? "text-emerald-100" : "text-slate-700"}`,
														children: btn.label
													})]
												}, btn.label);
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2 space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														disabled: activeAyahIdx === 0,
														"aria-label": "Previous Ayah",
														onClick: () => {
															audioManager.stopAll();
															const nextIdx = Math.max(0, activeAyahIdx - 1);
															setActiveAyahIdx(nextIdx);
															const nextAyah = surahPayload.ayahs[nextIdx];
															if (nextAyah) {
																recordVerseRead(surahPayload.meta.number, nextAyah.numberInSurah);
																updateUser({ lastRead: {
																	surahNumber: surahPayload.meta.number,
																	surahName: surahPayload.meta.nameTranslit,
																	ayahNumber: nextAyah.numberInSurah
																} });
															}
														},
														className: "min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-emerald-950/10 hover:bg-emerald-950/15 dark:bg-white/10 dark:text-white disabled:opacity-30 flex items-center justify-center text-emerald-950 transition active:scale-95",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex-1 h-2 rounded-full bg-emerald-100 dark:bg-white/15 overflow-hidden",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-full bg-[#14532D] dark:bg-amber-400 rounded-full transition-all",
															style: { width: `${(activeAyahIdx + 1) / surahPayload.ayahs.length * 100}%` }
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														disabled: activeAyahIdx >= surahPayload.ayahs.length - 1,
														"aria-label": "Next Ayah",
														onClick: () => {
															audioManager.stopAll();
															const nextIdx = Math.min(surahPayload.ayahs.length - 1, activeAyahIdx + 1);
															setActiveAyahIdx(nextIdx);
															const nextAyah = surahPayload.ayahs[nextIdx];
															if (nextAyah) {
																recordVerseRead(surahPayload.meta.number, nextAyah.numberInSurah);
																updateUser({ lastRead: {
																	surahNumber: surahPayload.meta.number,
																	surahName: surahPayload.meta.nameTranslit,
																	ayahNumber: nextAyah.numberInSurah
																} });
															}
														},
														className: "min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-emerald-950/10 hover:bg-emerald-950/15 dark:bg-white/10 dark:text-white disabled:opacity-30 flex items-center justify-center text-emerald-950 transition active:scale-95",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: `text-center text-[11px] font-bold tabular-nums ${user.darkMode ? "text-emerald-200" : "text-slate-600"}`,
												children: [
													"Ayah ",
													currentAyah.numberInSurah,
													" of ",
													surahPayload.meta.ayahCount,
													" (Loaded:",
													" ",
													surahPayload.ayahs.length,
													")"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border p-3 space-y-2.5 bg-[var(--bg-elevated)] border-[var(--border-subtle)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `text-xs font-extrabold ${user.darkMode ? "text-white" : "text-slate-900"}`,
													children: "AI Tajweed & Harakat Coach"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `text-[11px] tabular-nums ${user.darkMode ? "text-emerald-200" : "text-slate-600"}`,
													children: (() => {
														const q = canUseAiTajweedCheck(user, getLocalDateKeyWithOffset(0, /* @__PURE__ */ new Date()));
														return q.limit === null ? "Unlimited Ayah checks active" : `${q.remaining}/${q.limit} free checks left today`;
													})()
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => setShowAdultTajweedCoach((prev) => !prev),
													className: "px-3 min-h-[40px] rounded-xl bg-[#14532D] text-white text-xs font-extrabold flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showAdultTajweedCoach ? "Hide Mic" : "Check Recitation" })]
												})]
											}), showAdultTajweedCoach && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2.5 pt-1 border-t border-emerald-950/10",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap items-center gap-2",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => void handleToggleAdultMic(),
																className: `px-3.5 min-h-[44px] rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition ${adultMicActive ? "bg-rose-600 text-white" : "bg-[#22C55E] text-emerald-950"}`,
																children: adultMicActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "w-3.5 h-3.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Stop Recording" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recite Ayah" })] })
															}),
															adultRecUrl && !adultMicActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => audioManager.playAudioUrl({
																	id: `adult-rec-${currentAyah.numberInSurah}`,
																	url: adultRecUrl
																}),
																className: "px-3 min-h-[44px] rounded-xl bg-amber-100 text-amber-950 text-xs font-extrabold flex items-center gap-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Play Mine" })]
															}),
															adultHasBlob && !adultMicActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																disabled: adultTajweedLoading,
																onClick: () => void handleRunAdultAiTajweed(currentAyah.arabicUthmani, currentAyah.transliteration),
																className: "px-3.5 min-h-[44px] rounded-xl bg-[#14532D] hover:bg-emerald-800 disabled:opacity-60 text-white text-xs font-extrabold flex items-center gap-1.5",
																children: adultTajweedLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Analyzing…" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Analyze Tajweed" })] })
															})
														]
													}),
													adultTajweedError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-semibold text-rose-600",
														children: adultTajweedError
													}),
													adultTajweedResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-xl bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] p-3 space-y-2.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs font-extrabold text-[#14532D] dark:text-amber-300",
																	children: adultTajweedResult.accuracyLabel
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-sm font-black tabular-nums text-[#14532D] dark:text-emerald-300",
																	children: [adultTajweedResult.overallScore, "%"]
																})]
															}),
															adultTajweedResult.wordFeedback.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																dir: "rtl",
																className: "flex flex-wrap gap-1.5",
																children: adultTajweedResult.wordFeedback.map((wf, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: `rounded-xl border px-2 py-1 text-center ${wf.status === "correct" ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100" : wf.status === "harakat_issue" ? "bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-100" : "bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																		className: "font-arabic text-lg font-bold",
																		children: wf.word
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																		dir: "ltr",
																		className: "text-[11px] font-semibold",
																		children: wf.note
																	})]
																}, `${wf.word}-${idx}`))
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xs font-semibold text-[var(--text-primary)]",
																children: adultTajweedResult.feedbackSummary
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-xs font-bold text-[#14532D] dark:text-emerald-300",
																children: ["Makhraj Tip: ", adultTajweedResult.makhrajTip]
															})
														]
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedSourceFooter, {
											source: surahPayload.verification.source,
											reference: surahPayload.verification.reference,
											reviewer: surahPayload.verification.reviewer
										})
									]
								})]
							})
						})
					]
				});
			}
			case "hifz": {
				const completedCount = hifzPlans.filter((p) => p.status === "completed").length;
				const pct = Math.round(completedCount / 114 * 100);
				const totalMemorizedAyahs = hifzPlans.reduce((acc, p) => acc + p.memorizedAyahs, 0);
				const totalRevisionsLogged = revisionItems.reduce((acc, r) => acc + r.attemptsCount, 0);
				const adultPlusUnlocked = isAdultPlusActive(user);
				const wordByWordUnlocked = canAccessWordByWordHifzStudio(user);
				const defaultHifzSurahs = /* @__PURE__ */ new Set([
					1,
					2,
					3,
					4,
					67,
					103,
					108,
					109,
					110,
					112,
					113,
					114
				]);
				const customHifzCount = hifzPlans.filter((p) => !defaultHifzSurahs.has(p.surahNumber)).length;
				const toggleRevealCard = (id) => {
					setRevealedCardIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
				};
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
								time: "9:31",
								light: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-4 pt-1 pb-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-lg font-extrabold",
										children: "Hifz Mastery"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setActiveRecallBlur(!activeRecallBlur);
											setRevealedCardIds([]);
											triggerToast(!activeRecallBlur ? "Active Recall Blur ON: Tap blurred Arabic to test memory" : "Active Recall Blur OFF");
										},
										className: `px-3 h-9 rounded-full flex items-center gap-1 text-xs font-extrabold border transition ${activeRecallBlur ? "bg-amber-400 text-emerald-950 border-amber-300" : "bg-white/10 text-amber-300 border-white/15"}`,
										title: "Toggle Active Recall Blur",
										children: [activeRecallBlur ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activeRecallBlur ? "Blur ON" : "Recall" })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full",
								children: [
									"My Hifz",
									"Revision",
									"Stats"
								].map((tName) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setHifzTab(tName),
									className: `min-h-[38px] py-1.5 rounded-full text-xs font-extrabold transition ${hifzTab === tName ? "bg-amber-400 text-emerald-950 shadow-xs" : "text-emerald-100 hover:bg-white/10"}`,
									children: tName
								}, tName))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-[var(--bg-surface)] p-4 shadow-xs border border-[var(--border-subtle)] space-y-3.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-extrabold text-[var(--text-primary)]",
													children: "Progress Overview"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-[var(--text-secondary)]",
													children: "Spaced-repetition review schedule"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoDisclosure, {
												label: "SRS Info",
												sheetTitle: "How Hifz Spaced Repetition Works",
												sheetSubtitle: "Honest self-assessment scheduling stored privately on your device.",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ilmizo uses a self-assessment spaced-repetition schedule (not automated AI recitation grading). After reciting from memory, rate your own fluency:" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
														className: "list-disc pl-5 space-y-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Needs Work:" }), " Reschedules review in 1 day."] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Good:" }), " Expands interval by ×1.8."] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Fluent:" }), " Expands interval by ×2.5."] })
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "All Hifz plans and revision attempts stay 100% private on this device with zero cloud tracking." })
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 shrink-0",
											children: [canUndoHifz && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													undoLastHifzAction();
													triggerToast("Undid last Hifz change");
												},
												className: "min-h-[36px] text-xs font-extrabold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-400/40 px-2.5 py-1 rounded-full flex items-center gap-1",
												title: "Undo last Hifz action",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Undo" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setShowNewHifzForm(!showNewHifzForm),
												className: "min-h-[36px] text-xs font-extrabold text-[#14532D] dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/50 px-3 py-1 rounded-full flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showNewHifzForm ? "Close" : "Add Plan" })]
											})]
										})]
									}),
									showNewHifzForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: (e) => {
											e.preventDefault();
											if (!hifzPlans.some((p) => p.surahNumber === newHifzSurahNum) && !canAddCustomHifzPlan(user, customHifzCount)) {
												openAdultPaywall(`Free plan includes 12 starter Surahs + 1 custom Surah plan. Unlock unlimited custom Hifz targets across all 114 Surahs with Adult Quran Plus (₹99/yr).`);
												return;
											}
											addHifzPlan(newHifzSurahNum, newHifzDailyTarget, `Ayahs ${newHifzStartAyah}-${newHifzEndAyah}`);
											setShowNewHifzForm(false);
											const sMeta = ALL_114_SURAHS.find((s) => s.number === newHifzSurahNum);
											triggerToast(`Saved ${sMeta?.nameTranslit || "Surah"} (Ayahs ${newHifzStartAyah}-${newHifzEndAyah}) to Hifz Plan`);
										},
										className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-extrabold text-[var(--text-primary)]",
												children: "Create / Update Surah & Ayah Range Target"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
													title: "Select Surah for Hifz Plan",
													ariaLabel: "Hifz Surah",
													variant: "compact",
													searchable: true,
													searchPlaceholder: "Search Surah…",
													className: "w-full",
													value: String(newHifzSurahNum),
													onChange: (val) => {
														const sNum = Number(val);
														setNewHifzSurahNum(sNum);
														const meta = ALL_114_SURAHS.find((s) => s.number === sNum);
														setNewHifzStartAyah(1);
														setNewHifzEndAyah(meta?.ayahCount || 7);
													},
													options: ALL_114_SURAHS.map((s) => ({
														value: String(s.number),
														label: `${s.number}. ${s.nameTranslit}`,
														subtitle: s.nameEnglish,
														badge: `${s.ayahCount} ayahs`
													}))
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
													title: "Daily Memorization Target",
													ariaLabel: "Daily Ayah target",
													variant: "compact",
													className: "w-full",
													value: String(newHifzDailyTarget),
													onChange: (val) => setNewHifzDailyTarget(Number(val)),
													options: [
														{
															value: "3",
															label: "3 Ayahs / day",
															subtitle: "Gentle steady pace"
														},
														{
															value: "5",
															label: "5 Ayahs / day",
															badge: "Recommended"
														},
														{
															value: "10",
															label: "10 Ayahs / day",
															subtitle: "Focused study"
														},
														{
															value: "15",
															label: "15 Ayahs / day",
															subtitle: "Intensive revision"
														}
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "text-xs font-bold text-[var(--text-secondary)]",
													children: ["Start Ayah", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "number",
														min: 1,
														value: newHifzStartAyah,
														onChange: (e) => setNewHifzStartAyah(Math.max(1, Number(e.target.value))),
														className: "mt-1 w-full min-h-[40px] rounded-xl ilmizo-input px-2.5 py-1.5 text-xs font-bold tabular-nums"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "text-xs font-bold text-[var(--text-secondary)]",
													children: ["End Ayah", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "number",
														min: newHifzStartAyah,
														value: newHifzEndAyah,
														onChange: (e) => setNewHifzEndAyah(Math.max(newHifzStartAyah, Number(e.target.value))),
														className: "mt-1 w-full min-h-[40px] rounded-xl ilmizo-input px-2.5 py-1.5 text-xs font-bold tabular-nums"
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												className: "w-full min-h-[44px] py-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold transition",
												children: "Save Hifz Plan"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-3xl font-extrabold text-[var(--text-primary)] tabular-nums",
											children: [completedCount, " / 114"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-[var(--text-secondary)] mt-0.5",
											children: t("surahs_completed")
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-16 h-16 rounded-full border-[5px] border-amber-400 flex items-center justify-center font-extrabold text-sm text-[var(--text-primary)] tabular-nums shadow-inner",
											children: [pct, "%"]
										})]
									}),
									(() => {
										const dueRev = revisionItems.find((r) => r.dueStatus === "overdue") || revisionItems.find((r) => r.dueStatus === "due_today") || revisionItems[0];
										const targetSurah = dueRev?.surahNumber || 2;
										const parsedRange = dueRev ? parseHifzAyahRange(dueRev.ayahRange, ALL_114_SURAHS.find((s) => s.number === targetSurah)?.ayahCount || 286) : {
											startAyah: 255,
											endAyah: 255
										};
										const targetAyah = dueRev?.startAyah || parsedRange.startAyah;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => openSurahForReading(targetSurah, targetAyah),
											className: "w-full min-h-[56px] rounded-2xl bg-[#14532D] text-white p-3.5 flex items-center justify-between hover:bg-emerald-800 transition shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-5 h-5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-sm font-extrabold",
													children: ["Practice Loop · ", t("continue_hifz")]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-emerald-200",
													children: dueRev ? formatRevisionReference(dueRev) : "Al-Baqarah · Ayah 255"
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5 text-white" })]
										});
									})()
								]
							}),
							wordByWordUnlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordByWordHifzRevealPanel, { surahPayload }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-[var(--bg-surface)] border border-amber-400/50 p-4 shadow-xs space-y-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center justify-between gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Adult Quran Plus · ₹99/yr" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-extrabold text-[var(--text-primary)] mt-0.5",
											children: "Word-by-Word Hifz Active Recall Studio"
										})] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[var(--text-secondary)] leading-relaxed",
										children: "Hide and reveal Arabic words one by one inside any Ayah to test exact word-order memorization. Included with Adult Quran Plus (₹99/yr) & Family Plus (₹199/yr)."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => openAdultPaywall("Unlock Word-by-Word Hifz Studio, unlimited custom Surah plans, 600+ Core Quranic words, and retention analytics with Adult Quran Plus (₹99/yr · 7-Day Free Trial)."),
										className: "w-full min-h-[44px] rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold transition",
										children: "Start 7-Day Free Trial · Unlock Hifz Studio"
									})
								]
							}),
							hifzTab === "Revision" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5",
								children: [activeRecallBlur && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-400/35 px-3.5 py-2.5 text-xs font-bold text-amber-950 dark:text-amber-200",
									children: "Active Recall Mode is ON. Recite from memory, tap the blurred verse to verify, then grade yourself honestly."
								}), revisionItems.map((rev) => {
									const surahMeta = ALL_114_SURAHS.find((s) => s.number === rev.surahNumber);
									const isBlurred = activeRecallBlur && !revealedCardIds.includes(rev.id);
									const parsedRange = parseHifzAyahRange(rev.ayahRange, surahMeta?.ayahCount || 286);
									const targetStartAyah = rev.startAyah || parsedRange.startAyah;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-surface)] p-4 shadow-xs border border-[var(--border-subtle)] space-y-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-sm font-bold text-[var(--text-primary)]",
													children: formatRevisionReference(rev)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-[var(--text-secondary)]",
													children: [
														rev.dueDate,
														" · ",
														rev.attemptsCount,
														" logged · ",
														rev.dueStatus.replace("_", " ")
													]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => openSurahForReading(rev.surahNumber, targetStartAyah),
													className: "min-h-[36px] text-xs font-extrabold text-[#14532D] dark:text-amber-300 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/50 px-3 py-1 rounded-full hover:brightness-95 transition shrink-0",
													children: "Practice"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => toggleRevealCard(rev.id),
												className: "w-full rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-[var(--text-muted)]",
													children: isBlurred ? "Tap to reveal Surah prompt" : "Surah Calligraphic Prompt"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `font-arabic text-xl font-bold text-[#14532D] dark:text-amber-300 transition ${isBlurred ? "blur-xs select-none" : ""}`,
													children: surahMeta?.nameArabic || "سورة"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-3 gap-2",
												children: [
													"Needs Work",
													"Good",
													"Fluent"
												].map((rating) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														recordRevisionAttempt(rev.id, rating);
														triggerToast(`Self-assessed "${rating}" for ${rev.surahName}`);
													},
													className: "min-h-[40px] py-2 rounded-xl bg-[var(--bg-elevated)] hover:bg-[#14532D] hover:text-white border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] transition",
													children: rating
												}, rating))
											})
										]
									}, rev.id);
								})]
							}) : hifzTab === "Stats" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold text-[var(--text-secondary)]",
												children: "Memorized Ayahs"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-2xl font-extrabold text-[var(--text-primary)] tabular-nums mt-1",
												children: totalMemorizedAyahs
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-[var(--text-muted)] mt-0.5",
												children: [
													"Across ",
													hifzPlans.length,
													" tracked Surahs"
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold text-[var(--text-secondary)]",
												children: "Revision Sessions"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-2xl font-extrabold text-[var(--text-primary)] tabular-nums mt-1",
												children: totalRevisionsLogged
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-[var(--text-muted)] mt-0.5",
												children: "Recorded self-assessments"
											})
										]
									})]
								}), adultPlusUnlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs font-extrabold text-[var(--text-primary)]",
										children: "Retention Strength Breakdown (Self-Reported)"
									}), [
										"Fluent",
										"Good",
										"Needs Work"
									].map((strength) => {
										const count = revisionItems.filter((r) => r.lastSelfReport === strength).length;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-[var(--text-secondary)]",
												children: strength
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-extrabold text-[#14532D] dark:text-amber-300 tabular-nums",
												children: [count, " Surahs"]
											})]
										}, strength);
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl bg-gradient-to-br from-[#0F3826] to-[#14532D] text-white p-4 shadow-md border border-amber-400/40 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Adult Quran Plus · ₹99/yr" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-extrabold",
											children: "Retention Strength & Weak-Surah Analytics"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-emerald-100 leading-relaxed",
											children: "See which Surahs are Fluent vs. Needs Work across your spaced-repetition history with Adult Quran Plus (₹99/yr · 7-Day Free Trial)."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => openAdultPaywall("Unlock Retention Strength Analytics, Word-by-Word Hifz Studio, and Full 600+ Core Quranic Vocabulary with Adult Quran Plus (₹99/yr)."),
											className: "w-full min-h-[44px] rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold transition",
											children: "Unlock Hifz Analytics · 7-Day Free Trial"
										})
									]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between px-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-extrabold text-[var(--text-primary)]",
										children: "Surah Progress"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-[var(--text-muted)]",
										children: "Tap +1 to log memorized Ayah"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)] divide-y divide-[var(--divider)] shadow-xs overflow-hidden",
									children: hifzPlans.map((plan) => {
										const surahMeta = ALL_114_SURAHS.find((s) => s.number === plan.surahNumber);
										const isBlurred = activeRecallBlur && !revealedCardIds.includes(`plan_${plan.surahNumber}`);
										const isConfirmingReset = confirmResetSurahNum === plan.surahNumber;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3.5 flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => toggleRevealCard(`plan_${plan.surahNumber}`),
													className: `font-arabic text-lg text-[#14532D] dark:text-amber-300 font-bold w-12 text-center transition shrink-0 ${isBlurred ? "blur-xs select-none" : ""}`,
													children: surahMeta?.nameArabic || "سورة"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "text-sm font-extrabold text-[var(--text-primary)] truncate",
														children: plan.surahName
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs text-[var(--text-secondary)] tabular-nums",
														children: [
															plan.memorizedAyahs,
															"/",
															plan.totalAyahs,
															" Ayahs · Range",
															" ",
															plan.startAyah || 1,
															"-",
															plan.endAyah || plan.totalAyahs,
															" ·",
															" ",
															(plan.memorizationState || plan.status).replace("_", " ")
														]
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center gap-1.5 shrink-0",
												children: isConfirmingReset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														resetHifzPlan(plan.surahNumber);
														setConfirmResetSurahNum(null);
														triggerToast(`Reset ${plan.surahName} progress to 0`);
													},
													className: "min-h-[34px] px-2.5 rounded-lg bg-rose-600 text-white text-xs font-extrabold",
													children: "Reset"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setConfirmResetSurahNum(null),
													className: "min-h-[34px] px-2.5 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-xs font-bold",
													children: "Cancel"
												})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [plan.memorizedAyahs > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setConfirmResetSurahNum(plan.surahNumber),
													title: "Reset Surah Hifz Progress",
													className: "w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-3.5 h-3.5" })
												}), plan.status === "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs font-bold text-[var(--text-secondary)] tabular-nums",
														children: [
															plan.memorizedAyahs,
															"/",
															plan.totalAyahs
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-7 h-7 rounded-full bg-[#14532D] text-white flex items-center justify-center",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5" })
													})]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => updateHifzProgress(plan.surahNumber, plan.memorizedAyahs + 1),
													className: "min-h-[36px] flex items-center gap-1.5 text-xs font-extrabold text-[#14532D] dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700/60 px-3 py-1 rounded-full tabular-nums active:scale-95 transition",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
														plan.memorizedAyahs,
														"/",
														plan.totalAyahs
													] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-emerald-700 dark:text-amber-300",
														children: "+1"
													})]
												})] })
											})]
										}, plan.surahNumber);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurahMemorizationCheckCard, {
								defaultSurahNumber: user.lastRead.surahNumber || 112,
								reciterName: user.reciterName || "Mishary Rashid Alafasy",
								onCompleteCheck: (summary) => {
									triggerToast(`${summary.surahName} Check: ${summary.accuracyPct}% (${summary.solidCount}/${summary.totalChecked} solid)`);
								}
							})
						]
					})]
				});
			}
			case "salah": {
				const salahHistory = computeSalahHistoricalSummary(salahRecords, /* @__PURE__ */ new Date());
				const last7Days = salahHistory.last7Days;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 shadow-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
									time: "9:31",
									light: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between px-4 pt-1 pb-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
												className: "text-lg font-extrabold",
												children: t("salah")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-emerald-200",
												children: [
													user.city,
													", ",
													user.country,
													" · ",
													hijriLabel
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowSalahCalcConfig(true),
											className: "min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition",
											title: "Calculation Method & Asr School Settings",
											"aria-label": "Open Prayer Calculation Method Settings",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-4 h-4 text-amber-300" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-6 mt-1 flex items-center justify-between text-xs font-semibold text-emerald-100 bg-black/20 rounded-full px-3 py-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSalahDayOffset((d) => d - 1),
											className: "p-1 rounded-full hover:bg-white/10",
											"aria-label": "Previous Day",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums",
											children: activeSalahDateLabel
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: salahDayOffset >= 0,
											onClick: () => setSalahDayOffset((d) => Math.min(0, d + 1)),
											className: "p-1 rounded-full hover:bg-white/10 disabled:opacity-30",
											"aria-label": "Next Day",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
							open: showSalahCalcConfig,
							onClose: () => setShowSalahCalcConfig(false),
							title: "Prayer Timing Method & Madhhab",
							subtitle: `Timings for ${user.city}, ${user.country} · ${isLiveTimingsSynced ? "Aladhan Live Sync" : "Offline Preset"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-extrabold text-[var(--text-primary)]",
										children: "Calculation Convention"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5",
										children: PRAYER_CALCULATION_METHODS.map((m) => {
											const active = (user.prayerCalculationMethod || 1) === m.id;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													updateUser({ prayerCalculationMethod: m.id });
													triggerToast(`Prayer method set to ${m.label}`);
												},
												className: `w-full min-h-[46px] px-3.5 py-2.5 rounded-2xl border text-left flex items-center justify-between gap-2 text-xs font-extrabold transition ${active ? "bg-[#14532D] text-white border-[#D4AF37]" : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)]"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.label }), active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-amber-300 shrink-0" })]
											}, m.id);
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 pt-2 border-t border-[var(--divider)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-extrabold text-[var(--text-primary)]",
										children: "Asr Juristic School"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-2",
										children: [{
											id: 0,
											label: "Standard",
											desc: "Shafi, Maliki, Hanbali"
										}, {
											id: 1,
											label: "Hanafi",
											desc: "Later shadow ratio"
										}].map((sch) => {
											const active = (user.prayerAsrSchool ?? 1) === sch.id;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													updateUser({ prayerAsrSchool: sch.id });
													triggerToast(`Asr school set to ${sch.label}`);
												},
												className: `min-h-[54px] p-3 rounded-2xl border text-left transition ${active ? "bg-[#14532D] text-white border-[#D4AF37]" : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)]"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold",
													children: sch.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `text-[11px] ${active ? "text-emerald-200" : "text-[var(--text-muted)]"}`,
													children: sch.desc
												})]
											}, sch.id);
										})
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 pt-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									triggerSelectionHaptic();
									setBatteryGuardOpen(true);
								},
								className: "w-full min-h-[54px] rounded-2xl bg-[var(--bg-surface)] border border-amber-300/70 dark:border-amber-500/35 px-3.5 py-2.5 flex items-center justify-between gap-2.5 text-left shadow-2xs active:scale-[0.99] transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-extrabold text-[#14532D] dark:text-amber-300",
										children: "Adhan Alarm Battery-Guard Wizard"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-[var(--text-secondary)] truncate",
										children: "Prevent Xiaomi, Samsung, Vivo & Oppo from silencing Fajr alerts"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2.5 py-1 rounded-xl bg-amber-400 text-emerald-950 text-[11px] font-extrabold shrink-0",
									children: "Fix Alerts"
								})]
							}), salahSubView === "tracker" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[var(--bg-surface)] px-3.5 py-3 shadow-2xs border border-[var(--border-subtle)] space-y-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-extrabold text-[var(--text-primary)]",
											children: "7-Day Log"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-[var(--text-secondary)] ml-2 tabular-nums",
											children: [
												salahHistory.weeklyPrayedCount,
												"/35 week · ",
												salahHistory.monthlyPrayedCount,
												"/150 in 30d"
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoDisclosure, {
											label: "Method",
											sheetTitle: "Prayer Timings & Local Log",
											sheetSubtitle: `${user.city}, ${user.country}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"Timings are calculated for ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: user.city }),
												" using",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: PRAYER_CALCULATION_METHODS.find((m) => m.id === (user.prayerCalculationMethod || 1))?.label || "Karachi" }),
												" ",
												"(",
												(user.prayerAsrSchool ?? 1) === 1 ? "Hanafi Asr" : "Standard Asr",
												")."
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your self-reported prayer log and excused-day entries are stored privately on your device and never leave your phone." })]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center justify-between gap-1",
										children: last7Days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setSalahDayOffset(d.offset),
											className: `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition ${salahDayOffset === d.offset ? "bg-emerald-50 dark:bg-emerald-900/45 ring-1 ring-[#14532D] dark:ring-amber-400/60" : ""}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-bold text-[var(--text-muted)]",
												children: d.dayLabel
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `w-6 h-6 rounded-full text-[11px] font-extrabold flex items-center justify-center tabular-nums ${d.doneCount === 5 ? "bg-[#14532D] text-white" : d.doneCount > 0 ? "bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200" : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"}`,
												children: d.doneCount
											})]
										}, d.key))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2.5",
									children: (() => {
										const nextPrayerState = computeNextPrayerState(prayerTimings, /* @__PURE__ */ new Date(), activeSalahPrayers);
										return [
											{
												name: "Fajr",
												time: prayerTimings.Fajr,
												icon: "crescent"
											},
											{
												name: "Dhuhr",
												time: prayerTimings.Dhuhr,
												icon: "sun"
											},
											{
												name: "Asr",
												time: prayerTimings.Asr,
												icon: "sun"
											},
											{
												name: "Maghrib",
												time: prayerTimings.Maghrib,
												icon: "crescent"
											},
											{
												name: "Isha",
												time: prayerTimings.Isha,
												icon: "moon"
											}
										].map((p) => {
											const status = activeSalahPrayers[p.name] || "pending";
											const isDone = status === "prayed_on_time" || status === "prayed";
											const statusLabel = status === "prayed_on_time" ? "On Time" : status === "prayed" ? "Prayed" : status === "qaza" ? "Qaza" : status === "excused" ? "Excused" : "Log";
											const isNextPendingToday = salahDayOffset === 0 && !nextPrayerState.isRolloverToTomorrow && nextPrayerState.nextPrayer === p.name && status === "pending";
											const isNextTomorrowRollover = salahDayOffset === 0 && nextPrayerState.isRolloverToTomorrow && p.name === "Fajr";
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "w-full rounded-2xl bg-[var(--bg-surface)] px-4 py-3 shadow-2xs border border-[var(--border-subtle)] flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => togglePrayerStatus(activeSalahDateKey, p.name),
													className: "flex items-center gap-3.5 text-left flex-1 min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-10 h-10 rounded-full bg-[#FEF3C7] dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0",
														children: p.icon === "sun" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-5 h-5" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-sm font-extrabold text-[var(--text-primary)]",
															children: p.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-xs text-[var(--text-secondary)] tabular-nums",
															children: [
																p.time,
																isNextPendingToday ? ` · ${nextPrayerState.countdownLabel}` : "",
																isNextTomorrowRollover ? ` · Tomorrow` : ""
															]
														})]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 shrink-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
														title: `${p.name} Prayer Status`,
														subtitle: `Update status for ${activeSalahDateKey}`,
														ariaLabel: `${p.name} status`,
														variant: "inline",
														value: status,
														onChange: (val) => setPrayerStatusExplicit(activeSalahDateKey, p.name, val),
														options: [
															{
																value: "pending",
																label: "Pending",
																subtitle: "Not logged yet"
															},
															{
																value: "prayed_on_time",
																label: "On Time",
																subtitle: "Prayed within its time"
															},
															{
																value: "prayed",
																label: "Prayed",
																subtitle: "Completed"
															},
															{
																value: "qaza",
																label: "Qaza",
																subtitle: "Made up after time"
															},
															{
																value: "excused",
																label: "Excused",
																subtitle: "Exempt (streak protected)"
															}
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalahStatusButton, {
														active: isDone || status === "qaza" || status === "excused",
														label: statusLabel,
														ariaLabel: `Toggle ${p.name} (${statusLabel})`,
														activeClassName: isDone ? "bg-[#14532D] border-[#14532D] text-white" : status === "qaza" ? "bg-amber-500 border-amber-500 text-emerald-950" : "bg-purple-600 border-purple-600 text-white",
														onClick: () => togglePrayerStatus(activeSalahDateKey, p.name)
													})]
												})]
											}, p.name);
										});
									})()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalahCompleteGuideAndExcusedPanel, {
									activeDateKey: activeSalahDateKey,
									onTriggerToast: triggerToast
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeApkAndAzanNotificationStudio, {
									prayerTimes24h: prayerTimings,
									city: user.city || "Jamshedpur",
									hijriDate: hijriLabel,
									onTriggerToast: triggerToast
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2.5 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSalahSubView("prayer_guide"),
										className: "rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] shadow-2xs text-left flex items-center gap-2.5 hover:border-[#14532D]/50 transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-200 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-5 h-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-[var(--text-primary)]",
											children: t("prayer_guide")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-[var(--text-secondary)]",
											children: "Step by step + Audio"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSalahSubView("wudu_guide"),
										className: "rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] shadow-2xs text-left flex items-center gap-2.5 hover:border-[#14532D]/50 transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-200 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-[var(--text-primary)]",
											children: t("wudu_guide")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-[var(--text-secondary)]",
											children: "With illustrations"
										})] })]
									})]
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSalahSubView("tracker"),
										className: "min-h-[40px] text-xs font-extrabold text-[#14532D] dark:text-amber-300 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Daily Salah Tracker" })]
									}),
									(salahSubView === "prayer_guide" ? SALAH_STEPS : WUDU_STEPS).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-surface)] p-4 shadow-2xs border border-[var(--border-subtle)] space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-extrabold text-[#14532D] dark:text-amber-300",
													children: [
														"Step ",
														s.step,
														" · ",
														s.title
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-arabic text-lg text-[var(--text-primary)] font-bold",
														children: s.arabic
													}), s.arabic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => {
															speakArabicOrPlayAudio(void 0, s.arabic);
															triggerToast("Playing Arabic pronunciation");
														},
														className: "w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-amber-300 flex items-center justify-center",
														title: "Listen to Arabic pronunciation",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5" })
													})]
												})]
											}),
											s.transliteration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold text-emerald-700 dark:text-emerald-300 italic",
												children: s.transliteration
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[var(--text-secondary)]",
												children: s.meaning || s.desc
											})
										]
									}, s.step)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedSourceFooter, {
										source: salahSubView === "prayer_guide" ? "Sahih al-Bukhari (Book of Adhan / Sifat as-Salah) & Sahih Muslim" : "Quran 5:6 & Sahih al-Bukhari 159 (Hadith of Humran on Prophetic Wudu)",
										reference: "Verified Sunni Fiqh & Hadith Compendium"
									})
								]
							})]
						})
					]
				});
			}
			case "duas": {
				const categories = [
					{
						id: "morning_evening",
						title: "Morning & Evening",
						sub: "Daily protection",
						color: "from-[#F59E0B] to-[#D97706] text-white",
						icon: Sun
					},
					{
						id: "eating",
						title: "Before Eating",
						sub: "Blessed meals",
						color: "from-[#9333EA] to-[#7E22CE] text-white",
						icon: Heart
					},
					{
						id: "after_eating",
						title: "After Eating",
						sub: "Gratitude to Allah",
						color: "from-[#65A30D] to-[#4D7C0F] text-white",
						icon: Sparkles
					},
					{
						id: "travel",
						title: "Travel",
						sub: "Safe journey",
						color: "from-[#38BDF8] to-[#0284C7] text-white",
						icon: Compass
					},
					{
						id: "sleep",
						title: "Sleep",
						sub: "Peaceful rest",
						color: "from-[#6366F1] to-[#4338CA] text-white",
						icon: Moon
					},
					{
						id: "family",
						title: "Family",
						sub: "For loved ones",
						color: "from-[#FBBF24] to-[#D97706] text-amber-950",
						icon: User
					},
					{
						id: "health",
						title: "Health",
						sub: "Healing & strength",
						color: "from-[#6EE7B7] to-[#10B981] text-emerald-950",
						icon: Heart
					},
					{
						id: "all",
						title: "All Duas",
						sub: "Browse all",
						color: "from-[#64748B] to-[#475569] text-white",
						icon: BookOpen
					}
				];
				const displayedDuas = VERIFIED_DUAS.filter((d) => {
					if (duaTab === "Favorites" && !favoriteDuaIds.includes(d.id)) return false;
					if (selectedDuaCategory && selectedDuaCategory !== "all") {
						if (selectedDuaCategory === "after_eating") {
							if (d.id !== "dua_after_eating" && d.category !== "eating") return false;
						} else if (selectedDuaCategory === "eating") {
							if (d.category !== "eating") return false;
						} else if (d.category !== selectedDuaCategory) return false;
					}
					if (duaSearch.trim()) {
						const q = duaSearch.toLowerCase();
						return d.title.toLowerCase().includes(q) || d.transliteration.toLowerCase().includes(q) || d.translations.en.toLowerCase().includes(q);
					}
					return true;
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
								time: "9:31",
								light: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-4 pt-1 pb-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-lg font-extrabold",
										children: t("duas")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setDuaTab("Favorites"),
										className: "min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-amber-300 transition",
										title: "Saved Duas",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full",
								children: [
									"Categories",
									"Daily",
									"Favorites"
								].map((tName) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setDuaTab(tName);
										if (tName !== "Categories") setSelectedDuaCategory(null);
									},
									className: `min-h-[38px] py-1.5 rounded-full text-xs font-extrabold transition ${duaTab === tName ? "bg-amber-400 text-emerald-950 shadow-xs" : "text-emerald-100 hover:bg-white/10"}`,
									children: tName === "Favorites" ? `Favorites (${favoriteDuaIds.length})` : tName
								}, tName))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: duaSearch,
									onChange: (e) => {
										setDuaSearch(e.target.value);
										if (e.target.value.trim() && duaTab === "Categories" && !selectedDuaCategory) setSelectedDuaCategory("all");
									},
									placeholder: "Search Duas by topic, meaning or transliteration...",
									className: "w-full min-h-[44px] rounded-full ilmizo-input pl-10 pr-4 py-2.5 text-xs font-medium shadow-2xs"
								})]
							}),
							duaTab === "Categories" && !selectedDuaCategory && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-3",
								children: categories.map((cat) => {
									const Icon = cat.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSelectedDuaCategory(cat.id),
										className: `rounded-2xl bg-gradient-to-br ${cat.color} p-4 text-center shadow-sm hover:scale-[1.01] transition min-h-[104px] flex flex-col items-center justify-center gap-1.5`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-5 h-5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-extrabold leading-tight",
												children: cat.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs opacity-90",
												children: cat.sub
											})
										]
									}, cat.id);
								})
							}),
							(selectedDuaCategory || duaTab !== "Categories") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [selectedDuaCategory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setSelectedDuaCategory(null);
										setDuaSearch("");
									},
									className: "min-h-[38px] text-xs font-extrabold text-[#14532D] dark:text-amber-300 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Categories Grid" })]
								}), displayedDuas.map((dua) => {
									const isFav = favoriteDuaIds.includes(dua.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-3xl bg-[var(--bg-surface)] p-4 shadow-xs border border-[var(--border-subtle)] space-y-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-sm font-extrabold text-[var(--text-primary)]",
														children: dua.title
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] font-semibold text-[#14532D] dark:text-emerald-300 mt-0.5",
														children: [
															dua.verification.status === "Verified" ? "Verified" : "Review",
															" ·",
															" ",
															resolveDuaHumanAudio(dua).reciterName
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5 shrink-0",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															onClick: () => {
																playHumanDuaAudio({
																	dua,
																	rate: user.playbackRate || 1,
																	onStatus: (msg) => triggerToast(msg)
																});
															},
															className: "px-3 h-9 rounded-full bg-[#14532D] text-amber-200 flex items-center gap-1 text-xs font-extrabold shadow-2xs hover:bg-emerald-800 transition",
															title: "Listen to Real Human Qari Audio (MP3)",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Audio" })]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => handleCopyText(`${dua.title}\n${dua.arabic}\n${dua.transliteration}\n"${resolveText(dua.translations, dua.translations.en)}"\nSource: ${dua.verification.source}`, `Copied "${dua.title}" with verified source`),
															className: "w-9 h-9 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center",
															title: "Share / Copy Dua",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => toggleFavoriteDua(dua.id),
															className: `w-9 h-9 rounded-full flex items-center justify-center transition active:scale-90 ${isFav ? "bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300" : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"}`,
															title: "Save to Favorites",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-4 h-4 fill-current" })
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-arabic text-2xl text-[var(--text-primary)] text-right leading-[2.05]",
												dir: "rtl",
												lang: "ar",
												children: dua.arabic
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold text-[#14532D] dark:text-emerald-300 italic",
												children: dua.transliteration
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-[var(--text-secondary)] leading-relaxed",
												children: resolveText(dua.translations, dua.translations.en)
											}),
											dua.whenToUse && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/30 rounded-xl px-3 py-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "When to recite:" }),
													" ",
													dua.whenToUse
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedSourceFooter, {
												source: dua.verification.source,
												reference: dua.verification.reference
											})
										]
									}, dua.id);
								})]
							})
						]
					})]
				});
			}
			case "names99": {
				const currentName = ASMA_UL_HUSNA[nameIdx] || ASMA_UL_HUSNA[0];
				const filteredNames = ASMA_UL_HUSNA.filter((n) => n.transliteration.toLowerCase().includes(namesSearch.toLowerCase()) || n.meaning.toLowerCase().includes(namesSearch.toLowerCase()) || String(n.number).includes(namesSearch));
				const quizQuestion = build99NamesQuizQuestion(ASMA_UL_HUSNA, namesQuizIdx);
				const quizTarget = quizQuestion.target;
				const quizOptions = quizQuestion.options;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-3.5 shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
								time: "9:31",
								light: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-4 pt-1 pb-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-base font-extrabold",
										children: t("names_99")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoDisclosure, {
										label: "Sources",
										variant: "dark",
										sheetTitle: "Scholarly Note on the 99 Names",
										sheetSubtitle: "Enumeration & Educational Reflections",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"The virtue of learning and living by Allah’s 99 Names is established in",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sahih al-Bukhari (2736)" }),
											" and",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sahih Muslim (2677)" }),
											"."
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"The widely taught 99-Name listing follows the narration of Al-Walid ibn Muslim in ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Jami` at-Tirmidhi (3507)" }),
											". Reflections shown alongside each Name are educational Tadabbur and not normative fiqh rulings."
										] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full",
								children: [
									{
										id: "card",
										label: "Scenic Card"
									},
									{
										id: "list",
										label: "Browse List"
									},
									{
										id: "quiz",
										label: "Recall Quiz"
									}
								].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setNamesViewMode(m.id),
									className: `min-h-[38px] py-1 rounded-full text-xs font-extrabold transition ${namesViewMode === m.id ? "bg-amber-400 text-emerald-950 shadow-xs" : "text-emerald-100 hover:bg-white/10"}`,
									children: m.label
								}, m.id))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pt-4 space-y-4",
						children: [
							namesViewMode === "card" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative rounded-[28px] border border-[#D4AF37]/60 bg-gradient-to-b from-[#072217] via-[#0D3323] to-[#0B2E1F] text-center text-white shadow-xl overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"aria-hidden": "true",
											className: "pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-amber-400/15 blur-3xl"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-7 pb-5 px-5 relative z-10 flex flex-col items-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/15 border border-amber-300/35 text-[11px] font-bold text-amber-200 tabular-nums mb-3",
													children: [
														"Name #",
														currentName.number,
														" of 99"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-36 h-36 rounded-full bg-gradient-to-b from-amber-300/20 via-emerald-950/60 to-emerald-950/90 border border-[#D4AF37]/70 shadow-[0_0_32px_rgba(212,175,55,0.22)] flex items-center justify-center px-3 mb-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-arabic text-4xl sm:text-5xl text-[#FDE68A] font-bold drop-shadow-md leading-tight",
														children: currentName.arabic
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-xl font-extrabold tracking-tight",
													children: currentName.transliteration
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-emerald-100/95 font-medium mt-0.5",
													children: resolveText(currentName.translations, currentName.meaning)
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative h-48 w-full overflow-hidden",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: "/assets/illustrations/adult_99names_scenic.webp",
													alt: "Paradise Garden",
													loading: "lazy",
													decoding: "async",
													className: "w-full h-full object-cover"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-[#0B2E1F]" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "absolute bottom-3.5 inset-x-4 flex flex-col items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs text-emerald-50 line-clamp-2 max-w-sm leading-relaxed",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																className: "text-amber-200",
																children: "Reflection:"
															}),
															" ",
															currentName.reflection
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex items-center gap-2 text-xs font-bold text-amber-200 bg-black/45 border border-white/10 px-3 py-1 rounded-full backdrop-blur-xs tabular-nums",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [studiedNames99Numbers.length, " / 99 Studied"] })
													})]
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-center gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setNameIdx(Math.floor(Math.random() * ASMA_UL_HUSNA.length)),
											className: "w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] flex items-center justify-center",
											title: "Random Name",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "w-4 h-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setNameIdx((i) => i > 0 ? i - 1 : ASMA_UL_HUSNA.length - 1),
											className: "w-11 h-11 rounded-full bg-[#14532D] text-white flex items-center justify-center shadow-xs active:scale-95 transition",
											title: "Previous Name",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-5 h-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												markName99Studied(currentName.number, currentName.transliteration);
												speakArabicOrPlayAudio(void 0, currentName.arabic);
												triggerToast(`Studied ${currentName.transliteration}`);
											},
											className: "w-14 h-14 rounded-full bg-[#14532D] text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-900/20 dark:ring-amber-400/25 active:scale-95 transition",
											title: "Play Pronunciation & Mark Studied",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-6 h-6 ml-0.5 fill-current" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												markName99Studied(currentName.number, currentName.transliteration);
												setNameIdx((i) => (i + 1) % ASMA_UL_HUSNA.length);
											},
											className: "w-11 h-11 rounded-full bg-[#14532D] text-white flex items-center justify-center shadow-xs active:scale-95 transition",
											title: "Next Name",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-5 h-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => speakArabicOrPlayAudio(void 0, currentName.arabic),
											className: "w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] flex items-center justify-center",
											title: "Repeat Audio",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "w-4 h-4" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedSourceFooter, {
									source: currentName.verification.source,
									reference: currentName.verification.reference
								})
							] }),
							namesViewMode === "list" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: namesSearch,
										onChange: (e) => setNamesSearch(e.target.value),
										placeholder: "Search Name of Allah or meaning...",
										className: "w-full min-h-[44px] rounded-full ilmizo-input pl-10 pr-4 py-2.5 text-xs font-medium shadow-2xs"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: filteredNames.map((item) => {
										const idxInFull = ASMA_UL_HUSNA.findIndex((n) => n.number === item.number);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												setNameIdx(Math.max(0, idxInFull));
												setNamesViewMode("card");
											},
											className: "w-full text-left rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] hover:border-[#14532D]/50 shadow-2xs flex items-center justify-between gap-3 transition",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-amber-300 font-extrabold text-xs flex items-center justify-center tabular-nums shrink-0",
													children: item.number
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-sm font-extrabold text-[var(--text-primary)]",
													children: item.transliteration
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-[var(--text-secondary)]",
													children: resolveText(item.translations, item.meaning)
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-arabic text-2xl font-bold text-[#14532D] dark:text-amber-300",
												children: item.arabic
											})]
										}, item.number);
									})
								})]
							}),
							namesViewMode === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-3xl bg-[var(--bg-surface)] p-5 border border-[var(--border-subtle)] shadow-xs space-y-4",
								children: namesQuizDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-7 h-7" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-extrabold text-[var(--text-primary)]",
											children: "Asma ul-Husna Recall Complete!"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-[var(--text-secondary)]",
											children: [
												"You scored",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
													className: "text-[#14532D] dark:text-amber-300 tabular-nums",
													children: [
														namesQuizScore,
														" / ",
														ASMA_UL_HUSNA.length
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setNamesQuizIdx(0);
												setNamesQuizScore(0);
												setNamesQuizSelected(null);
												setNamesQuizDone(false);
											},
											className: "w-full min-h-[44px] py-2.5 rounded-2xl bg-[#14532D] text-white text-xs font-extrabold",
											children: "Practice Again"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs font-bold text-[var(--text-secondary)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Match the Divine Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "tabular-nums",
											children: [
												namesQuizIdx + 1,
												" / ",
												ASMA_UL_HUSNA.length
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[#0F3826] text-white p-4 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-arabic text-4xl text-amber-300 font-bold",
											children: quizTarget.arabic
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-base font-extrabold mt-1",
											children: quizTarget.transliteration
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-2",
										children: quizOptions.map((opt) => {
											const isCorrect = validate99NamesQuizAnswer(quizTarget, opt);
											const isPicked = namesQuizSelected !== null && namesQuizSelected.number === opt.number && namesQuizSelected.meaning === opt.meaning;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												disabled: namesQuizSelected !== null,
												onClick: () => {
													setNamesQuizSelected(opt);
													if (validate99NamesQuizAnswer(quizTarget, opt)) setNamesQuizScore((s) => s + 1);
												},
												className: `w-full min-h-[46px] text-left p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-between ${namesQuizSelected !== null ? isCorrect ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-600 text-emerald-950 dark:text-emerald-100" : isPicked ? "bg-rose-50 dark:bg-rose-900/40 border-rose-500 text-rose-900 dark:text-rose-100" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[#14532D]"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.meaning }), namesQuizSelected !== null && isCorrect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" })]
											}, `${opt.number}_${opt.meaning}`);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: namesQuizSelected === null,
										onClick: () => {
											if (namesQuizIdx + 1 < ASMA_UL_HUSNA.length) {
												setNamesQuizIdx((i) => i + 1);
												setNamesQuizSelected(null);
											} else {
												recordQuizAttempt({
													quizId: "quiz_names_99_recall",
													quizTitle: "99 Names of Allah Recall",
													score: namesQuizScore,
													total: ASMA_UL_HUSNA.length,
													mode: "adult"
												});
												setNamesQuizDone(true);
											}
										},
										className: "w-full min-h-[44px] py-2.5 rounded-2xl bg-[#14532D] disabled:opacity-40 text-white text-xs font-extrabold",
										children: namesQuizIdx + 1 < ASMA_UL_HUSNA.length ? "Next Name" : "Finish Quiz"
									})
								] })
							})
						]
					})]
				});
			}
			case "seerah": {
				const activeSeerah = SEERAH_TIMELINE.find((ev) => ev.id === selectedSeerahId) || SEERAH_TIMELINE[0];
				const thumbs = [
					"/assets/illustrations/adult_mosque_banner.webp",
					"/assets/illustrations/adult_calendar_mosque.webp",
					"/assets/illustrations/adult_99names_scenic.webp"
				];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
								time: "9:31",
								light: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-4 pt-1 pb-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-lg font-extrabold",
										children: "Seerah"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSeerahTab(seerahTab === "Map" ? "Timeline" : "Map"),
										className: "min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-amber-300 transition",
										title: "Toggle Hijaz Map View",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-4 grid grid-cols-4 gap-1 bg-black/25 p-1 rounded-full",
								children: [
									"Timeline",
									"Stories",
									"Lessons",
									"Map"
								].map((tName) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSeerahTab(tName),
									className: `min-h-[38px] py-1.5 rounded-full text-xs font-extrabold transition ${seerahTab === tName ? "bg-amber-400 text-emerald-950 shadow-xs" : "text-emerald-100 hover:bg-white/10"}`,
									children: tName
								}, tName))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pt-4 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: seerahSearch,
									onChange: (e) => setSeerahSearch(e.target.value),
									placeholder: "Search Seerah events, years or lessons...",
									className: "w-full min-h-[42px] rounded-full ilmizo-input pl-10 pr-4 py-2 text-xs font-medium shadow-2xs"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1.5",
								children: [
									"All",
									"Makkah",
									"Madinah"
								].map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSeerahLocationFilter(loc),
									className: `min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-extrabold transition ${seerahLocationFilter === loc ? "bg-[#14532D] text-white" : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"}`,
									children: loc
								}, loc))
							})]
						}), seerahTab === "Map" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-[#0F3826] text-white p-4 border-2 border-[#D4AF37] shadow-md space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] uppercase tracking-wider text-amber-300 font-extrabold",
											children: "Interactive Seerah Atlas"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-sm font-extrabold",
											children: "Makkah, Cave Hira & Al-Madinah Route"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "w-5 h-5 text-amber-300" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative rounded-2xl bg-[#092418] border border-emerald-700/50 p-4 space-y-2.5",
										children: SEERAH_TIMELINE.map((ev, i) => {
											const isSelected = ev.id === activeSeerah?.id;
											const isSaved = seerahMilestoneIds.includes(ev.id);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setSelectedSeerahId(ev.id),
												className: `w-full text-left rounded-xl p-2.5 border transition flex items-center justify-between ${isSelected ? "bg-amber-400/20 border-amber-300 text-white" : "bg-white/5 border-white/10 text-emerald-100 hover:bg-white/10"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "w-6 h-6 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-xs flex items-center justify-center tabular-nums",
														children: i + 1
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-extrabold",
														children: ev.location
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] text-emerald-200",
														children: [
															ev.title,
															" (",
															ev.years,
															")"
														]
													})] })]
												}), isSaved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "w-3.5 h-3.5 text-amber-300 fill-current" })]
											}, ev.id);
										})
									}),
									activeSeerah && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-surface)] text-[var(--text-primary)] p-3.5 space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-sm font-extrabold text-[var(--text-primary)]",
													children: activeSeerah.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-amber-700 dark:text-amber-300",
													children: activeSeerah.years
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-[var(--text-secondary)] leading-relaxed",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Historical Summary:" }),
													" ",
													activeSeerah.summary
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs font-semibold text-[#14532D] dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/35 p-2.5 rounded-xl",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Educational Reflection:" }),
													" ",
													activeSeerah.keyLesson
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedSourceFooter, {
												source: activeSeerah.verification.source,
												reference: activeSeerah.verification.reference
											})
										]
									})
								]
							})
						}) : SEERAH_TIMELINE.filter((ev) => {
							if (seerahLocationFilter !== "All" && !ev.location.toLowerCase().includes(seerahLocationFilter.toLowerCase())) return false;
							if (seerahSearch.trim()) {
								const q = seerahSearch.toLowerCase();
								return ev.title.toLowerCase().includes(q) || ev.summary.toLowerCase().includes(q) || ev.keyLesson.toLowerCase().includes(q) || ev.years.toLowerCase().includes(q);
							}
							return true;
						}).map((ev, idx) => {
							const isExpanded = selectedSeerahId === ev.id;
							const isSaved = seerahMilestoneIds.includes(ev.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSelectedSeerahId(isExpanded ? "" : ev.id),
										className: "flex items-center gap-3 text-left flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: thumbs[idx % thumbs.length],
											alt: ev.title,
											loading: "lazy",
											decoding: "async",
											className: "w-14 h-14 rounded-xl object-cover shrink-0 border border-amber-300/40"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-extrabold text-[var(--text-primary)]",
												children: ev.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-[var(--text-secondary)] mt-0.5",
												children: [
													ev.years,
													" · ",
													ev.location,
													" ·",
													" ",
													ev.verification.status === "Verified" ? "Verified" : "Review"
												]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkPopButton, {
											saved: isSaved,
											onToggle: () => {
												toggleSeerahMilestone(ev.id);
												triggerToast(isSaved ? `Removed "${ev.title}" from studied milestones` : `Marked "${ev.title}" studied & saved`);
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `w-4 h-4 text-[var(--text-muted)] transition-transform ${isExpanded ? "rotate-90" : ""}` })]
									})]
								}), (seerahTab !== "Timeline" || isExpanded) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 border-t border-[var(--divider)] space-y-2 text-xs text-[var(--text-secondary)]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "leading-relaxed",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-[var(--text-primary)]",
													children: "Verified Historical Account:"
												}),
												" ",
												seerahTab === "Lessons" ? ev.keyLesson : ev.summary
											]
										}),
										seerahTab !== "Lessons" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-semibold text-[#14532D] dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/35 p-2.5 rounded-xl",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Educational Reflection:" }),
												" ",
												ev.keyLesson
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedSourceFooter, {
											source: ev.verification.source,
											reference: ev.verification.reference
										})
									]
								})]
							}, ev.id);
						})]
					})]
				});
			}
			case "quran_journal": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuranJournalScreen, { onTriggerToast: triggerToast });
			case "lessons": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultLessonsScreen, {});
			case "quizzes": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultQuizzesScreen, {});
			case "progress": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultProgressScreen, {});
			case "qibla": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultQiblaScreen, {});
			case "tasbih": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultTasbihScreen, {});
			case "calendar": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultCalendarScreen, {});
			case "tasks_expenses": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultTasksAndExpensesScreen, {});
			case "more": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultMoreSettingsScreen, {});
			case "profile": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultProfileScreen, {});
			default: return null;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		...swipeHandlers,
		className: "relative min-h-dvh flex-1 flex flex-col bg-[var(--bg-app)] text-[var(--text-primary)] touch-pan-y transition-colors",
		children: [
			toastMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#0F3826] text-amber-200 border border-amber-400/50 px-4 py-2 rounded-full shadow-lg text-xs font-extrabold flex items-center gap-2 max-w-[90vw]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-amber-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: toastMsg
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 will-change-transform",
				style: {
					transform: swipeFeedback.offsetX ? `translateX(${swipeFeedback.offsetX}px)` : void 0,
					transition: swipeFeedback.swiping ? "none" : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenSkeleton, {}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						initial: false,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: shouldReduceMotion ? false : {
								opacity: 0,
								y: 6
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: shouldReduceMotion ? void 0 : {
								opacity: 0,
								y: -4
							},
							transition: {
								duration: .17,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "min-h-full",
							children: renderScreen()
						}, adultRoute)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultBottomNav, {
				activeRoute: adultRoute,
				onSelectRoute: setAdultRoute,
				t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyPlusPaywallModal, {
				open: adultPaywallOpen,
				onClose: () => setAdultPaywallOpen(false),
				triggerReason: adultPaywallReason,
				skipParentGate: true,
				onUnlocked: (msg) => triggerToast(msg)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecialModulesHub, {
				activeModule: activeSpecialModule,
				onClose: () => {
					setActiveSpecialModule(null);
					setCustomReminderAyah(null);
				},
				onNavigateAdultRoute: (route) => setAdultRoute(route),
				onOpenSurahInReader: (surahNum) => openSurahForReading(surahNum, 1),
				reciterName: user.reciterName || "Mishary Rashid Alafasy",
				language,
				initialCustomAyah: customReminderAyah
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OemBatteryGuardSheet, {
				open: batteryGuardOpen,
				onClose: () => setBatteryGuardOpen(false),
				onToast: triggerToast
			})
		]
	});
};
export { AdultModeView, useSeniorMinimalMode as n, OemBatteryGuardSheet as r, TasbihTapRing as t };
