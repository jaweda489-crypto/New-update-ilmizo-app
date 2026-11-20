import { a as __toESM } from "./rolldown-runtime-DQp2zzRu.js";
import { A as RefreshCw, At as Award, C as ShieldCheck, Ft as require_react, I as Pause, J as Heart, Mt as ArrowRight, N as Play, Nt as ArrowLeft, O as RotateCcw, P as PenTool, T as Share2, Tt as BookOpen, U as LoaderCircle, V as Lock, _ as Sparkles, _t as ChevronRight, a as VolumeX, at as Droplets, bt as Check, d as Trash2, dt as Clock, g as Square, h as Star, j as Printer, k as Repeat, mt as CircleCheck, o as Volume2, ot as Download, q as House, r as WandSparkles, t as X, u as Trophy, ut as Compass, vt as ChevronLeft, z as Mic } from "./vendor-icons-DCckKQxi.js";
import { i as require_jsx_runtime, n as useReducedMotion, r as AnimatePresence, t as motion } from "./vendor-motion-DfqbQRzE.js";
import { _ as BUNDLED_SURAH_AYAHS, a as QUIZ_PACKS, g as ALL_114_SURAHS, h as canMarkKidsSurahCompleted, i as KIDS_STORIES, l as VERIFIED_DUAS, m as JUZ_AMMA_37_SURAHS, nt as getLocalDateKeyWithOffset, o as SALAH_STEPS, r as KIDS_BADGES_CATALOG, x as getSurahPayload } from "./data-islamic-content-DVwdNHPG.js";
import { $ as supportsArabicSpeechRecognition, A as canDownloadFullStoryLibraryAudioPack, B as recordAiTajweedUsagePatch, J as assessVoiceActivityMetrics, M as canRecordFamilyStoryVoice, N as canUseAiTajweedCheck, Q as scoreKidsArabicRecitationMatch, T as canAccessStoryIndex, X as getChildCertificateAchievements, _ as saveLocalOnboardingProfile, _t as ScreenBackButton, bt as audioManager, f as LivingMascot, ft as triggerSuccessHaptic, g as loadLocalOnboardingProfile, gt as MobileStatusBar, ht as Kids3DMetallicBadge, j as canDownloadTopStoriesAudioPack, k as canCacheSingleStoryOffline, mt as CharacterAvatar, n as SleepTimerTriggerButton, ot as SelectSheetField, p as inferAmbientMascotState, q as aggregateKidsProgressByPeriod, t as SleepTimerSheet, ut as triggerLightHaptic, v as useIlmizo, vt as SyncStatusBadge, w as canAccessQaidaLesson, xt as useAudioManager, y as useTranslation, z as isFamilyPlusActive } from "./index-Dy1fifCC.js";
import { n as playGentleCelebrationChime, t as FamilyPlusPaywallModal } from "./FamilyPlusPaywallModal-B_X5oIMT.js";
import { _ as KIDS_ROUTE_ORDER, a as saveStoryVoiceRecording, i as pickSupportedAudioMimeType, n as getStoryVoiceRecording, o as InteractiveTajweedAyahView, r as isVoiceRecorderSupported, t as deleteStoryVoiceRecording, v as useSwipeNavigation, y as useQuranAudioSync } from "./storyVoiceRecorder-CtwnVwnJ.js";
import { C as scheduleStarterStoriesWarmup, S as resolveStoryPageHumanAudio, T as storyAudioPrefetchManager, _ as clearAllCachedStoryAudio, a as getOfflineQaidaWbwStatus, d as playHumanDuaAudio, f as playQaidaLetterHumanAudio, i as fetchOrGetCachedQaidaSyllable, n as collectAllQaidaWbwPaths, o as resolveWbwAudioUrlOrCached, p as resolveDuaHumanAudio, r as downloadQaidaOfflineWbwPack, s as NOORANI_QAIDA_28_LETTERS, t as analyzeRecitationWithAiTajweed, v as formatAudioCacheSizeMb, w as scheduleStoryReaderLookahead, y as getStoryLibraryCacheSummary } from "./studioAudioAndTajweedService-DF0oWwfx.js";
import { a as resolveQaidaText, i as buildArabicLetterJoinPreview, n as NOORANI_QAIDA_COURSE_LESSONS, r as QAIDA_MODULES, t as ARABIC_LETTER_JOIN_FORMS } from "./nooraniQaidaCourse-DdAqOF7e.js";
import { a as getArabicLetterStrokeGuide, c as recordChildQaidaMistake, i as getActiveQaidaRevisionRecommendations, l as saveChildLetterTracingProgress, o as loadChildQaidaMastery, s as markChildQaidaMistakeResolved, t as buildDailyTarbiyahPlan } from "./dailyTarbiyahPlanEngine-BDxia3dk.js";
// src/components/shared/CelebrationBurst.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var CONFETTI_OFFSETS = [
	{
		x: -72,
		y: -56,
		rotate: -25,
		color: "text-amber-300",
		delay: .02
	},
	{
		x: 68,
		y: -62,
		rotate: 28,
		color: "text-emerald-300",
		delay: .04
	},
	{
		x: -92,
		y: 8,
		rotate: -40,
		color: "text-amber-400",
		delay: .06
	},
	{
		x: 88,
		y: 12,
		rotate: 35,
		color: "text-emerald-200",
		delay: .05
	},
	{
		x: -46,
		y: -88,
		rotate: -14,
		color: "text-yellow-300",
		delay: .03
	},
	{
		x: 52,
		y: -90,
		rotate: 18,
		color: "text-amber-200",
		delay: .07
	}
];
var CelebrationBurst = ({ visible, title = "MashaAllah!", subtitle }) => {
	const prefersReduced = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: visible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		role: "status",
		"aria-live": "polite",
		initial: {
			opacity: 0,
			scale: prefersReduced ? 1 : .88
		},
		animate: {
			opacity: 1,
			scale: 1
		},
		exit: {
			opacity: 0,
			scale: prefersReduced ? 1 : .92
		},
		transition: {
			duration: .22,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		className: "pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative rounded-3xl bg-[#0F3826]/95 border-2 border-[#D4AF37] px-6 py-4 text-center text-white shadow-2xl backdrop-blur-xs max-w-xs w-full",
			children: [
				!prefersReduced && CONFETTI_OFFSETS.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					initial: {
						opacity: 0,
						x: 0,
						y: 0,
						scale: .4,
						rotate: 0
					},
					animate: {
						opacity: [
							0,
							1,
							0
						],
						x: item.x,
						y: item.y,
						scale: [
							.5,
							1.15,
							.7
						],
						rotate: item.rotate
					},
					transition: {
						duration: .9,
						delay: item.delay,
						ease: "easeOut"
					},
					className: `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${item.color}`,
					children: idx % 2 === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-5 h-5 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" })
				}, idx)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center mx-auto mb-2 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-6 h-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base font-extrabold text-amber-300",
					children: title
				}),
				subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold text-emerald-50/90 mt-1 leading-snug",
					children: subtitle
				})
			]
		})
	}) });
};
// src/components/kids/QaidaLetterTracingCanvas.tsx
var CANVAS_W = 340;
var CANVAS_H = 230;
var PASS_COVERAGE_PERCENT = 42;
var QaidaLetterTracingCanvas = ({ childId = "default_child", initialLetterIdx = 0, onLetterTraced, onTriggerToast }) => {
	const [letterIdx, setLetterIdx] = (0, import_react.useState)(initialLetterIdx);
	const [tracedLetterIds, setTracedLetterIds] = (0, import_react.useState)(() => {
		const saved = loadChildQaidaMastery(childId);
		return Object.keys(saved.tracingByLetterId);
	});
	const [coveragePercent, setCoveragePercent] = (0, import_react.useState)(0);
	const [statusMessage, setStatusMessage] = (0, import_react.useState)("Start at the green dot (1) and trace smoothly right to left.");
	const [mascotState, setMascotState] = (0, import_react.useState)("teaching");
	const [strokeCount, setStrokeCount] = (0, import_react.useState)(0);
	const [inkColor, setInkColor] = (0, import_react.useState)("#14532D");
	const canvasRef = (0, import_react.useRef)(null);
	const strokesRef = (0, import_react.useRef)([]);
	const isDrawingRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const saved = loadChildQaidaMastery(childId);
		setTracedLetterIds(Object.keys(saved.tracingByLetterId));
	}, [childId]);
	const activeLetter = NOORANI_QAIDA_28_LETTERS[letterIdx] || NOORANI_QAIDA_28_LETTERS[0];
	const strokeGuide = getArabicLetterStrokeGuide(activeLetter.letterArabic);
	const isCurrentLetterPassed = coveragePercent >= PASS_COVERAGE_PERCENT || tracedLetterIds.includes(activeLetter.id);
	const drawCanvas = (0, import_react.useCallback)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
		ctx.fillStyle = "#FDFBF7";
		ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
		ctx.save();
		ctx.setLineDash([6, 6]);
		ctx.strokeStyle = "rgba(20, 83, 45, 0.16)";
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.moveTo(20, CANVAS_H * .68);
		ctx.lineTo(320, CANVAS_H * .68);
		ctx.moveTo(20, CANVAS_H * .34);
		ctx.lineTo(320, CANVAS_H * .34);
		ctx.stroke();
		ctx.restore();
		ctx.save();
		ctx.fillStyle = "rgba(20, 83, 45, 0.78)";
		ctx.font = "700 11px \"Plus Jakarta Sans\", system-ui, sans-serif";
		ctx.textAlign = "right";
		ctx.fillText("← Start at Green Dot (1) · Right to Left", 326, 20);
		ctx.restore();
		ctx.save();
		ctx.font = "700 148px \"Noto Naskh Arabic\", \"Amiri\", serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "rgba(20, 83, 45, 0.12)";
		ctx.fillText(activeLetter.letterArabic, CANVAS_W / 2, CANVAS_H * .53);
		ctx.setLineDash([4, 4]);
		ctx.strokeStyle = "rgba(217, 119, 6, 0.45)";
		ctx.lineWidth = 2;
		ctx.strokeText(activeLetter.letterArabic, CANVAS_W / 2, CANVAS_H * .53);
		ctx.restore();
		const sx = strokeGuide.startX * CANVAS_W;
		const sy = strokeGuide.startY * CANVAS_H;
		const ex = strokeGuide.endX * CANVAS_W;
		const ey = strokeGuide.endY * CANVAS_H;
		ctx.save();
		ctx.setLineDash([4, 5]);
		ctx.strokeStyle = "rgba(34, 197, 94, 0.65)";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.lineTo(ex, ey);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.fillStyle = "#22C55E";
		ctx.beginPath();
		ctx.arc(sx, sy, 10, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = "#FFFFFF";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "800 10px \"Plus Jakarta Sans\", system-ui, sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("1", sx, sy + .5);
		ctx.fillStyle = "#F59E0B";
		ctx.beginPath();
		ctx.arc(ex, ey, 6, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = "#FFFFFF";
		ctx.lineWidth = 1.5;
		ctx.stroke();
		ctx.restore();
		ctx.save();
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.strokeStyle = inkColor;
		ctx.lineWidth = 14;
		for (const stroke of strokesRef.current) {
			if (stroke.length === 0) continue;
			ctx.beginPath();
			ctx.moveTo(stroke[0].x, stroke[0].y);
			if (stroke.length === 1) ctx.lineTo(stroke[0].x + .5, stroke[0].y + .5);
			else for (let i = 1; i < stroke.length; i++) ctx.lineTo(stroke[i].x, stroke[i].y);
			ctx.stroke();
		}
		ctx.restore();
	}, [
		activeLetter.letterArabic,
		inkColor,
		strokeGuide
	]);
	(0, import_react.useEffect)(() => {
		drawCanvas();
	}, [drawCanvas]);
	const evaluateTracingCoverage = (0, import_react.useCallback)(() => {
		if (typeof document === "undefined" || strokesRef.current.length === 0) {
			setCoveragePercent(0);
			return;
		}
		const refCanvas = document.createElement("canvas");
		refCanvas.width = CANVAS_W;
		refCanvas.height = CANVAS_H;
		const refCtx = refCanvas.getContext("2d");
		const userCanvas = document.createElement("canvas");
		userCanvas.width = CANVAS_W;
		userCanvas.height = CANVAS_H;
		const userCtx = userCanvas.getContext("2d");
		if (!refCtx || !userCtx) return;
		refCtx.font = "700 148px \"Noto Naskh Arabic\", \"Amiri\", serif";
		refCtx.textAlign = "center";
		refCtx.textBaseline = "middle";
		refCtx.fillStyle = "#000000";
		refCtx.fillText(activeLetter.letterArabic, CANVAS_W / 2, CANVAS_H * .53);
		userCtx.lineCap = "round";
		userCtx.lineJoin = "round";
		userCtx.strokeStyle = "#000000";
		userCtx.lineWidth = 22;
		for (const stroke of strokesRef.current) {
			if (stroke.length === 0) continue;
			userCtx.beginPath();
			userCtx.moveTo(stroke[0].x, stroke[0].y);
			if (stroke.length === 1) userCtx.lineTo(stroke[0].x + .5, stroke[0].y + .5);
			else for (let i = 1; i < stroke.length; i++) userCtx.lineTo(stroke[i].x, stroke[i].y);
			userCtx.stroke();
		}
		const refData = refCtx.getImageData(0, 0, CANVAS_W, CANVAS_H).data;
		const userData = userCtx.getImageData(0, 0, CANVAS_W, CANVAS_H).data;
		let targetPixels = 0;
		let coveredTargetPixels = 0;
		let offTargetPixels = 0;
		for (let i = 3; i < refData.length; i += 8) {
			const isTarget = refData[i] > 40;
			const isDrawn = userData[i] > 40;
			if (isTarget) {
				targetPixels += 1;
				if (isDrawn) coveredTargetPixels += 1;
			} else if (isDrawn) offTargetPixels += 1;
		}
		if (targetPixels === 0) return;
		const rawCoverage = coveredTargetPixels / targetPixels;
		const scribbleRatio = offTargetPixels / Math.max(targetPixels * 3.2, 1);
		const adjusted = Math.max(0, Math.min(1, rawCoverage - Math.max(0, scribbleRatio - .55) * .45));
		const pct = Math.round(adjusted * 100);
		setCoveragePercent(pct);
		if (pct >= PASS_COVERAGE_PERCENT) {
			setStatusMessage(`MashaAllah! Great tracing on ${activeLetter.nameEn} (${pct}% match)!`);
			setMascotState("celebrating");
			const updated = saveChildLetterTracingProgress({
				childId,
				letterId: activeLetter.id,
				letterArabic: activeLetter.letterArabic,
				letterName: activeLetter.nameEn,
				coveragePercent: pct
			});
			setTracedLetterIds(Object.keys(updated.tracingByLetterId));
			triggerSuccessHaptic();
			if (!tracedLetterIds.includes(activeLetter.id)) {
				playGentleCelebrationChime("star");
				onLetterTraced?.(activeLetter.nameEn, pct);
				playQaidaLetterHumanAudio({
					letter: activeLetter,
					mode: "letter",
					onStatus: onTriggerToast
				});
			}
		} else if (pct >= 20) {
			setMascotState("encouraging");
			setStatusMessage(`Almost there! Keep tracing ${activeLetter.nameEn} toward the gold dot (${pct}%).`);
		} else {
			setMascotState("gentle_disappointment");
			setStatusMessage("Start on the green dot (1) and follow the golden dotted outline.");
		}
	}, [
		activeLetter,
		childId,
		onLetterTraced,
		onTriggerToast,
		tracedLetterIds
	]);
	const getPointerPos = (e) => {
		const canvas = canvasRef.current;
		if (!canvas) return {
			x: 0,
			y: 0
		};
		const rect = canvas.getBoundingClientRect();
		return {
			x: (e.clientX - rect.left) / rect.width * CANVAS_W,
			y: (e.clientY - rect.top) / rect.height * CANVAS_H
		};
	};
	const handlePointerDown = (e) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		isDrawingRef.current = true;
		setMascotState("listening");
		const pt = getPointerPos(e);
		strokesRef.current = [...strokesRef.current, [pt]];
		setStrokeCount(strokesRef.current.length);
		drawCanvas();
	};
	const handlePointerMove = (e) => {
		if (!isDrawingRef.current) return;
		const pt = getPointerPos(e);
		const current = strokesRef.current[strokesRef.current.length - 1];
		if (current) {
			current.push(pt);
			drawCanvas();
		}
	};
	const handlePointerUp = () => {
		if (!isDrawingRef.current) return;
		isDrawingRef.current = false;
		evaluateTracingCoverage();
	};
	const handleClear = () => {
		strokesRef.current = [];
		setStrokeCount(0);
		setCoveragePercent(0);
		setMascotState("teaching");
		setStatusMessage(strokeGuide.directionHint);
		triggerLightHaptic();
		drawCanvas();
	};
	const handleSwitchLetter = (nextIdx) => {
		const wrapped = (nextIdx % NOORANI_QAIDA_28_LETTERS.length + NOORANI_QAIDA_28_LETTERS.length) % NOORANI_QAIDA_28_LETTERS.length;
		setLetterIdx(wrapped);
		strokesRef.current = [];
		setStrokeCount(0);
		setCoveragePercent(0);
		setMascotState("teaching");
		const nextLetter = NOORANI_QAIDA_28_LETTERS[wrapped] || NOORANI_QAIDA_28_LETTERS[0];
		setStatusMessage(getArabicLetterStrokeGuide(nextLetter.letterArabic).directionHint);
		triggerLightHaptic();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-[#0F3826] text-white p-3.5 flex items-center justify-between gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivingMascot, {
						character: "Mizo",
						state: mascotState,
						size: "sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] font-bold text-amber-300 tabular-nums",
								children: [
									"Letter ",
									letterIdx + 1,
									" of 28 · Saved ",
									tracedLetterIds.length,
									"/28"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "text-sm font-extrabold truncate",
								children: [
									"Trace ",
									activeLetter.nameEn,
									" (",
									activeLetter.letterArabic,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-emerald-100/85 line-clamp-1",
								children: strokeGuide.directionHint
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setMascotState("listening");
						playQaidaLetterHumanAudio({
							letter: activeLetter,
							mode: "letter",
							onStatus: onTriggerToast
						});
					},
					className: "px-3.5 min-h-[48px] rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold inline-flex items-center gap-1.5 shrink-0 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Hear ", activeLetter.nameEn] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-[var(--bg-surface)] border-2 border-amber-400/50 p-3 shadow-xs space-y-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[#FFFDF8] touch-none select-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
							ref: canvasRef,
							width: CANVAS_W,
							height: CANVAS_H,
							onPointerDown: handlePointerDown,
							onPointerMove: handlePointerMove,
							onPointerUp: handlePointerUp,
							onPointerCancel: handlePointerUp,
							"aria-label": `Arabic tracing pad for letter ${activeLetter.nameEn}`,
							className: "w-full h-[230px] block cursor-crosshair touch-none"
						}), isCurrentLetterPassed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-emerald-700 text-white text-[11px] font-extrabold inline-flex items-center gap-1 shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Saved Locally" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-[11px] font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: isCurrentLetterPassed ? "text-emerald-800 dark:text-emerald-300" : "text-[var(--text-secondary)]",
								children: statusMessage
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[#14532D] dark:text-emerald-300 tabular-nums shrink-0 ml-2",
								children: [coveragePercent, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-full rounded-full transition-all duration-200 ${isCurrentLetterPassed ? "bg-[#22C55E]" : "bg-[#F59E0B]"}`,
								style: { width: `${Math.min(100, coveragePercent)}%` }
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleClear,
								disabled: strokeCount === 0,
								className: "px-3 min-h-[48px] rounded-xl bg-[var(--bg-elevated)] hover:opacity-90 border border-[var(--border-subtle)] disabled:opacity-45 text-[var(--text-primary)] text-xs font-extrabold inline-flex items-center gap-1.5 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Clear" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setInkColor((prev) => prev === "#14532D" ? "#D97706" : "#14532D"),
								className: "px-3 min-h-[48px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-xs font-bold inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inkColor === "#14532D" ? "Emerald Ink" : "Gold Ink" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => handleSwitchLetter(letterIdx - 1),
								"aria-label": "Previous Arabic letter",
								className: "px-3 min-h-[48px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:opacity-90 text-[var(--text-primary)] text-xs font-extrabold inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Prev" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => handleSwitchLetter(letterIdx + 1),
								"aria-label": "Next Arabic letter",
								className: "px-3.5 min-h-[48px] rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center gap-1 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Next Letter" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				dir: "rtl",
				className: "grid grid-cols-7 gap-1.5 bg-[var(--bg-surface)] p-2 rounded-2xl border border-[var(--border-subtle)]",
				children: NOORANI_QAIDA_28_LETTERS.map((item, idx) => {
					const selected = idx === letterIdx;
					const done = tracedLetterIds.includes(item.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => handleSwitchLetter(idx),
						className: `min-h-[44px] rounded-xl font-arabic text-xl font-bold border transition relative ${selected ? "bg-[#14532D] text-amber-300 border-[#D4AF37] shadow-2xs" : done ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-500/40" : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-amber-400"}`,
						children: item.letterArabic
					}, item.id);
				})
			})
		]
	});
};
function seededShuffle(items, seed) {
	const copy = [...items];
	let s = Math.abs(seed | 0) || 1;
	for (let i = copy.length - 1; i > 0; i--) {
		s = Math.imul(s, 1664525) + 1013904223 >>> 0;
		const j = s % (i + 1);
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}
function extractLetterAudioSlug(mp3Url) {
	const match = mp3Url.match(/\/([^/]+)\.mp3$/i);
	return match ? match[1] : "alif";
}
/**
* Generates a deterministic 5-question Duolingo-style Audio Recognition & Drill Mastery Quiz
* for any Noorani Qaida lesson (Lessons 1–17).
* - Lesson 1: 4 pure Audio-First Letter Recognition questions (using bundled real human MP3s) + 1 Rule check.
* - Lessons 2–17: 4 Drill Audio/Visual Recognition questions from the lesson's real tiles + 1 Rule check.
*/
function buildQaidaMasteryQuiz(lessonOrNumber, seed = 42) {
	const lesson = typeof lessonOrNumber === "number" ? NOORANI_QAIDA_COURSE_LESSONS.find((l) => l.lessonNumber === lessonOrNumber) || NOORANI_QAIDA_COURSE_LESSONS[0] : lessonOrNumber;
	const questions = [];
	if (lesson.lessonNumber === 1) seededShuffle(NOORANI_QAIDA_28_LETTERS, seed + 17).slice(0, 4).forEach((target, qIdx) => {
		const distractors = seededShuffle(NOORANI_QAIDA_28_LETTERS.filter((l) => l.id !== target.id), seed + (qIdx + 1) * 97).slice(0, 3);
		const shuffled = seededShuffle([{
			option: {
				id: `opt_${target.id}`,
				arabic: target.letterArabic,
				label: target.nameEn,
				sublabel: target.makhrajTip.en
			},
			isCorrect: true
		}, ...distractors.map((d) => ({
			option: {
				id: `opt_${d.id}`,
				arabic: d.letterArabic,
				label: d.nameEn,
				sublabel: d.makhrajTip.en
			},
			isCorrect: false
		}))], seed + (qIdx + 3) * 31);
		const correctIndex = shuffled.findIndex((item) => item.isCorrect);
		questions.push({
			id: `${lesson.id}_q_${qIdx + 1}`,
			questionIndex: qIdx,
			kind: "audio_recognition",
			promptEn: "Listen carefully and tap the Arabic letter you hear!",
			promptHinglish: "Dhyan se suno aur jo Arabic harf suna us par tap karo!",
			audio: {
				letterAudioSlug: extractLetterAudioSlug(target.letterAudioMp3Url),
				arabicText: target.letterArabic,
				spokenLabel: target.nameEn
			},
			options: shuffled.map((item) => item.option),
			correctIndex,
			explanationEn: `That sound is "${target.nameEn}" (${target.letterArabic}) — ${target.makhrajTip.en}`
		});
	});
	else {
		const lessonTiles = lesson.tiles || [];
		const fallbackTiles = NOORANI_QAIDA_COURSE_LESSONS.flatMap((l) => l.tiles || []);
		const primaryPool = lessonTiles.length >= 4 ? lessonTiles : [...lessonTiles, ...fallbackTiles];
		const ownPicked = seededShuffle(lessonTiles, seed + lesson.lessonNumber * 29).slice(0, 4);
		const padNeeded = Math.max(0, 4 - ownPicked.length);
		const padTiles = padNeeded > 0 ? seededShuffle(fallbackTiles.filter((ft) => !ownPicked.some((ot) => ot.arabic === ft.arabic)), seed + lesson.lessonNumber * 61).slice(0, padNeeded) : [];
		[...ownPicked, ...padTiles].forEach((tile, qIdx) => {
			const hasAudioSource = Boolean(tile.letterAudioSlug || tile.wbwWordPath || tile.globalAyahNumber);
			const distractors = seededShuffle(primaryPool.filter((d) => d.arabic !== tile.arabic && d.transliteration !== tile.transliteration), seed + lesson.lessonNumber * 53 + qIdx * 19).slice(0, 3);
			const isAudioFirst = hasAudioSource && qIdx % 2 === 0;
			const shuffled = seededShuffle([{
				option: {
					id: `opt_${tile.id}`,
					arabic: tile.arabic,
					label: isAudioFirst ? "Tap to choose" : tile.transliteration,
					sublabel: tile.tajweedRuleNote.en
				},
				isCorrect: true
			}, ...distractors.map((d, dIdx) => ({
				option: {
					id: `opt_${d.id}_${dIdx}`,
					arabic: d.arabic,
					label: isAudioFirst ? "Tap to choose" : d.transliteration,
					sublabel: d.tajweedRuleNote.en
				},
				isCorrect: false
			}))], seed + qIdx * 43 + lesson.lessonNumber * 11);
			const correctIndex = shuffled.findIndex((item) => item.isCorrect);
			questions.push({
				id: `${lesson.id}_q_${qIdx + 1}`,
				questionIndex: qIdx,
				kind: isAudioFirst ? "audio_recognition" : "drill_recognition",
				promptEn: isAudioFirst ? "Tap Play, listen to the pronunciation, and pick the matching Arabic drill!" : `Which Arabic drill matches "${tile.transliteration}"?`,
				promptHinglish: isAudioFirst ? "Play dabao, awaaz suno aur sahi Arabic lafz chuno!" : `"${tile.transliteration}" ke liye sahi Arabic lafz chuno!`,
				audio: {
					letterAudioSlug: tile.letterAudioSlug,
					wbwWordPath: tile.wbwWordPath,
					globalAyahNumber: tile.globalAyahNumber,
					arabicText: tile.arabic,
					spokenLabel: tile.transliteration
				},
				options: shuffled.map((item) => item.option),
				correctIndex,
				explanationEn: `${tile.arabic} is read as "${tile.transliteration}" — ${tile.tajweedRuleNote.en}`
			});
		});
	}
	const shuffledRuleOptions = seededShuffle(lesson.quiz.options.map((opt, idx) => ({
		option: {
			id: `rule_opt_${idx}`,
			arabic: opt.arabic,
			label: opt.label
		},
		isCorrect: idx === lesson.quiz.correctIndex
	})), seed + lesson.lessonNumber * 71);
	const ruleCorrectIndex = shuffledRuleOptions.findIndex((item) => item.isCorrect);
	questions.push({
		id: `${lesson.id}_q_5`,
		questionIndex: questions.length,
		kind: "rule_check",
		promptEn: lesson.quiz.prompt.en,
		promptHinglish: lesson.quiz.prompt.hinglish || lesson.quiz.prompt.en,
		audio: {
			arabicText: lesson.quiz.arabicTarget,
			spokenLabel: lesson.title.en,
			wbwWordPath: lesson.tiles?.[0]?.wbwWordPath,
			letterAudioSlug: lesson.tiles?.[0]?.letterAudioSlug,
			globalAyahNumber: lesson.tiles?.[0]?.globalAyahNumber
		},
		visibleTargetArabic: lesson.quiz.arabicTarget,
		options: shuffledRuleOptions.map((item) => item.option),
		correctIndex: ruleCorrectIndex,
		explanationEn: lesson.quiz.explanation.en
	});
	return {
		lessonId: lesson.id,
		lessonNumber: lesson.lessonNumber,
		passingScorePercent: 80,
		questions
	};
}
function evaluateQaidaMasteryResult(params) {
	const total = Math.max(1, params.totalQuestions);
	const correct = Math.max(0, Math.min(total, params.correctCount));
	const scorePercent = Math.round(correct / total * 100);
	const passed = scorePercent >= 80;
	return {
		scorePercent,
		passed,
		starsEarned: passed ? scorePercent === 100 ? 15 : 10 : 0
	};
}
// src/components/kids/NooraniQaidaCourseView.tsx
var HARAKAT_MARKS = [
	{
		id: "fatha",
		label: "Zabar (Fatha)",
		mark: "َ",
		vowelSound: "a"
	},
	{
		id: "kasra",
		label: "Zer (Kasra)",
		mark: "ِ",
		vowelSound: "i"
	},
	{
		id: "damma",
		label: "Pesh (Damma)",
		mark: "ُ",
		vowelSound: "u"
	},
	{
		id: "tanween_an",
		label: "Do-Zabar (-an)",
		mark: "ً",
		vowelSound: "an"
	},
	{
		id: "sukoon",
		label: "Sukoon (Jazm)",
		mark: "ْ",
		vowelSound: "stop"
	},
	{
		id: "shaddah",
		label: "Shaddah (Double)",
		mark: "َّ",
		vowelSound: "double"
	}
];
var NooraniQaidaCourseView = ({ onOpenPaywall, onTriggerToast }) => {
	const { user, activeChild, completeQaidaLesson } = useIlmizo();
	const { language } = useTranslation();
	const prefersReduced = useReducedMotion();
	const [activeLessonId, setActiveLessonId] = (0, import_react.useState)(NOORANI_QAIDA_COURSE_LESSONS[0].id);
	const [subTab, setSubTab] = (0, import_react.useState)("drills");
	const [selected28Idx, setSelected28Idx] = (0, import_react.useState)(0);
	const [builderLetters, setBuilderLetters] = (0, import_react.useState)([
		"ب",
		"س",
		"م"
	]);
	const [playgroundLetterIdx, setPlaygroundLetterIdx] = (0, import_react.useState)(1);
	const [playgroundHarakatId, setPlaygroundHarakatId] = (0, import_react.useState)("fatha");
	const [quizSeed, setQuizSeed] = (0, import_react.useState)(101);
	const [quizStepIdx, setQuizStepIdx] = (0, import_react.useState)(0);
	const [quizAnswerIdx, setQuizAnswerIdx] = (0, import_react.useState)(null);
	const [quizCorrectCount, setQuizCorrectCount] = (0, import_react.useState)(0);
	const [quizFinished, setQuizFinished] = (0, import_react.useState)(false);
	const [showCelebration, setShowCelebration] = (0, import_react.useState)(false);
	const [revisionItems, setRevisionItems] = (0, import_react.useState)(() => getActiveQaidaRevisionRecommendations(activeChild.id, 4));
	const allWbwPaths = (0, import_react.useMemo)(() => collectAllQaidaWbwPaths(NOORANI_QAIDA_COURSE_LESSONS), []);
	const [wbwCachedCount, setWbwCachedCount] = (0, import_react.useState)(0);
	const [isDownloadingWbw, setIsDownloadingWbw] = (0, import_react.useState)(false);
	const [wbwProgress, setWbwProgress] = (0, import_react.useState)({
		completed: 0,
		total: allWbwPaths.length
	});
	const [loadingStudioSyllable, setLoadingStudioSyllable] = (0, import_react.useState)(null);
	const activeBlobUrlRef = (0, import_react.useRef)(null);
	const wbwAbortRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		getOfflineQaidaWbwStatus(allWbwPaths).then((st) => {
			if (active) setWbwCachedCount(st.cachedCount);
		});
		return () => {
			active = false;
			wbwAbortRef.current?.abort();
			if (activeBlobUrlRef.current) {
				try {
					URL.revokeObjectURL(activeBlobUrlRef.current);
				} catch {}
				activeBlobUrlRef.current = null;
			}
		};
	}, [allWbwPaths]);
	const completedIds = activeChild.completedQaidaLessonIds || [];
	const familyPlus = isFamilyPlusActive(user);
	const activeLesson = (0, import_react.useMemo)(() => NOORANI_QAIDA_COURSE_LESSONS.find((l) => l.id === activeLessonId) || NOORANI_QAIDA_COURSE_LESSONS[0], [activeLessonId]);
	const joinPreview = (0, import_react.useMemo)(() => buildArabicLetterJoinPreview(builderLetters), [builderLetters]);
	const activePlaygroundLetter = ARABIC_LETTER_JOIN_FORMS[playgroundLetterIdx] || ARABIC_LETTER_JOIN_FORMS[1];
	const activePlaygroundMark = HARAKAT_MARKS.find((h) => h.id === playgroundHarakatId) || HARAKAT_MARKS[0];
	const handleDownloadQaidaOfflinePack = async () => {
		if (isDownloadingWbw) {
			wbwAbortRef.current?.abort();
			setIsDownloadingWbw(false);
			return;
		}
		const controller = new AbortController();
		wbwAbortRef.current = controller;
		setIsDownloadingWbw(true);
		setWbwProgress({
			completed: wbwCachedCount,
			total: allWbwPaths.length
		});
		const res = await downloadQaidaOfflineWbwPack({
			wbwPaths: allWbwPaths,
			signal: controller.signal,
			onProgress: (p) => {
				setWbwProgress(p);
				setWbwCachedCount(p.completed);
			}
		});
		setIsDownloadingWbw(false);
		wbwAbortRef.current = null;
		if (res.ok) {
			setWbwCachedCount(res.completed);
			onTriggerToast?.(`Saved all ${res.completed} Qari single-word clips offline for Lessons 3–14!`);
		} else if (res.error && res.error !== "Download cancelled.") onTriggerToast?.(res.error);
	};
	const masteryQuiz = (0, import_react.useMemo)(() => buildQaidaMasteryQuiz(activeLesson, quizSeed), [activeLesson, quizSeed]);
	const resetMasteryQuiz = (bumpSeed = false) => {
		setQuizStepIdx(0);
		setQuizAnswerIdx(null);
		setQuizCorrectCount(0);
		setQuizFinished(false);
		if (bumpSeed) setQuizSeed((s) => s + 17);
	};
	const handleSelectLesson = (lesson) => {
		if (!canAccessQaidaLesson(user, lesson.lessonNumber)) {
			onOpenPaywall(`Unlock "${resolveQaidaText(lesson.title, language)}" and all 17 interactive Noorani Qaida lessons with Family Plus (₹199/yr · 7-Day Free Trial).`);
			return;
		}
		setActiveLessonId(lesson.id);
		resetMasteryQuiz(false);
		if (lesson.hasJoinBuilder) setSubTab("joiner");
		else if (lesson.hasVowelPlayground) setSubTab("vowels");
		else setSubTab("drills");
		playGentleCelebrationChime("tap");
	};
	const playManagedBlobUrl = (trackId, blobUrl) => {
		if (activeBlobUrlRef.current && activeBlobUrlRef.current !== blobUrl) try {
			URL.revokeObjectURL(activeBlobUrlRef.current);
		} catch {}
		activeBlobUrlRef.current = blobUrl;
		audioManager.playAudioUrl({
			id: trackId,
			url: blobUrl,
			allowTtsFallback: false,
			rate: .95,
			onError: (msg) => onTriggerToast?.(msg)
		});
	};
	const playDrillAudio = (params) => {
		if (params.letterAudioSlug) {
			audioManager.playAudioUrl({
				id: `qaida_course_${params.id}`,
				url: `/assets/audio/qaida/${params.letterAudioSlug}.mp3`,
				allowTtsFallback: false,
				offlineUnavailableMessage: "Letter audio clip unavailable.",
				rate: .95,
				onError: (msg) => onTriggerToast?.(msg)
			});
			onTriggerToast?.(`Playing ${params.label}`);
			return;
		}
		if (params.wbwWordPath) {
			const wbwPath = params.wbwWordPath;
			resolveWbwAudioUrlOrCached(wbwPath).then((resolved) => {
				if (resolved.offlineUncached || !resolved.url) {
					onTriggerToast?.(resolved.error || "Offline — download the Qaida Word-by-Word Audio Pack to listen without internet.");
					return;
				}
				if (resolved.isOfflineCached) {
					playManagedBlobUrl(`qaida_wbw_${params.id}`, resolved.url);
					onTriggerToast?.(`Offline Qari Word — ${params.label}`);
				} else {
					audioManager.playAudioUrl({
						id: `qaida_wbw_${params.id}`,
						url: resolved.url,
						allowTtsFallback: false,
						offlineUnavailableMessage: "Offline — download the Qaida Word-by-Word Audio Pack to listen without internet.",
						rate: .95,
						onError: (msg) => onTriggerToast?.(msg)
					});
					onTriggerToast?.(`Single-Word Qari — ${params.label}`);
				}
			});
			return;
		}
		if (params.globalAyahNumber) {
			const isOffline = typeof navigator !== "undefined" && navigator.onLine === false;
			audioManager.playAudioUrl({
				id: `qaida_qari_${params.id}`,
				url: isOffline ? void 0 : `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${params.globalAyahNumber}.mp3`,
				allowTtsFallback: false,
				offlineUnavailableMessage: "Qari Ayah example is not cached offline. Connect to internet to listen.",
				rate: .95,
				onError: (msg) => onTriggerToast?.(msg)
			});
			if (!isOffline) onTriggerToast?.(`Sheikh Mishary Alafasy — ${params.label}`);
			return;
		}
		setLoadingStudioSyllable(params.id);
		fetchOrGetCachedQaidaSyllable({
			arabicText: params.arabic,
			label: params.label
		}).then((res) => {
			setLoadingStudioSyllable((prev) => prev === params.id ? null : prev);
			if (res.ok && res.blobUrl) {
				playManagedBlobUrl(`qaida_studio_${params.id}`, res.blobUrl);
				onTriggerToast?.(res.fromCache ? `Offline Ustad Voice — ${params.label}` : `Studio Ustad — ${params.label}`);
				return;
			}
			onTriggerToast?.(res.error || "Offline — connect to the internet once to save Ustad Qaida audio.");
		});
	};
	const playJoinedLettersSequence = (letters) => {
		const slugs = letters.map((ch) => ARABIC_LETTER_JOIN_FORMS.find((f) => f.letter === ch)?.audioSlug).filter((s) => Boolean(s));
		if (slugs.length === 0) return;
		const playAt = (idx) => {
			if (idx >= slugs.length) return;
			audioManager.playAudioUrl({
				id: `qaida_join_seq_${idx}_${slugs[idx]}`,
				url: `/assets/audio/qaida/${slugs[idx]}.mp3`,
				allowTtsFallback: false,
				rate: 1,
				onEnded: () => playAt(idx + 1),
				onError: (msg) => onTriggerToast?.(msg)
			});
		};
		playAt(0);
		onTriggerToast?.(`Playing ${letters.length} isolated letters sequentially`);
	};
	const handleCompleteLesson = (scorePct = 100) => {
		const res = completeQaidaLesson(activeLesson.id, resolveQaidaText(activeLesson.title, language), activeLesson.starsReward, scorePct);
		playGentleCelebrationChime("lesson_complete");
		setShowCelebration(true);
		window.setTimeout(() => setShowCelebration(false), 1800);
		onTriggerToast?.(res.alreadyCompleted ? `Practiced ${resolveQaidaText(activeLesson.title, language)} again!` : `MashaAllah! Completed Lesson ${activeLesson.lessonNumber} (+${res.starsAwarded} ★)`);
	};
	const active28Letter = NOORANI_QAIDA_28_LETTERS[selected28Idx] || NOORANI_QAIDA_28_LETTERS[0];
	const progressPct = Math.round(completedIds.length / NOORANI_QAIDA_COURSE_LESSONS.length * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CelebrationBurst, {
				visible: showCelebration,
				title: `Lesson ${activeLesson.lessonNumber} Complete!`,
				subtitle: `MashaAllah ${activeChild.name}! Keep going toward your Noorani Qaida Certificate.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-[var(--bg-surface)] border-2 border-[#D4AF37]/70 p-4 shadow-sm space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300",
								children: [
									"Complete Curriculum · ",
									completedIds.length,
									"/",
									NOORANI_QAIDA_COURSE_LESSONS.length,
									" Lessons Done"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-extrabold text-[var(--text-primary)] mt-0.5",
								children: "Interactive Noorani Qaida Course"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--text-secondary)] mt-0.5",
								children: "Alphabet · Letter Joining · Harakat · Tanween · Qalqalah · Madd & Tashdeed"
							})
						] }), !familyPlus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onOpenPaywall("Unlock all 17 interactive Noorani Qaida lessons (Harakat, Joining, Madd, Shaddah & Certificate) for just ₹199/year."),
							className: "px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold min-h-[40px] flex items-center gap-1.5 shadow-xs transition shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Unlock Full Course" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2.5 w-full rounded-full bg-[var(--bg-subtle)] overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								className: "h-full rounded-full bg-gradient-to-r from-[#14532D] to-[#22C55E]",
								initial: false,
								animate: { width: `${Math.max(6, progressPct)}%` },
								transition: {
									duration: prefersReduced ? .05 : .4,
									ease: [
										.16,
										1,
										.3,
										1
									]
								}
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-[11px] font-bold text-[var(--text-secondary)] tabular-nums",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [progressPct, "% Qaida Mastery"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lessons 1–3 Free · 4–17 Family Plus" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 flex flex-wrap items-center justify-between gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold text-[var(--text-primary)]",
								children: "Offline Qaida Qari Audio (Lessons 3–14)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold text-[var(--text-secondary)] tabular-nums",
								children: isDownloadingWbw ? `Saving Qari clips offline (${wbwProgress.completed}/${wbwProgress.total})…` : wbwCachedCount >= allWbwPaths.length && allWbwPaths.length > 0 ? `All ${allWbwPaths.length}/${allWbwPaths.length} Qari word clips saved offline` : `${wbwCachedCount}/${allWbwPaths.length} Qari word clips cached · L1–2 already bundled`
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleDownloadQaidaOfflinePack,
							className: `px-3.5 min-h-[44px] rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition shrink-0 ${wbwCachedCount >= allWbwPaths.length && allWbwPaths.length > 0 ? "bg-emerald-100 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-200" : "bg-[#14532D] text-white hover:bg-emerald-800"}`,
							children: isDownloadingWbw ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cancel" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: wbwCachedCount >= allWbwPaths.length && allWbwPaths.length > 0 ? "Saved Offline ✓" : "Save Offline" })] })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 pt-1",
						children: QAIDA_MODULES.map((mod) => {
							const modLessons = NOORANI_QAIDA_COURSE_LESSONS.filter((l) => l.moduleId === mod.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-extrabold text-[var(--text-secondary)]",
									children: resolveQaidaText(mod.title, language)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2 overflow-x-auto pb-1",
									children: modLessons.map((lesson) => {
										const isSelected = lesson.id === activeLesson.id;
										const isDone = completedIds.includes(lesson.id);
										const unlocked = canAccessQaidaLesson(user, lesson.lessonNumber);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleSelectLesson(lesson),
											className: `shrink-0 min-w-[155px] max-w-[190px] rounded-2xl p-2.5 border text-left transition min-h-[56px] flex items-center justify-between gap-2 ${isSelected ? "bg-[#14532D] text-white border-[#D4AF37] shadow-sm" : isDone ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-500/40" : unlocked ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-amber-400" : "bg-[var(--bg-subtle)] text-[var(--text-muted)] border-[var(--border-subtle)]"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: `text-[11px] font-extrabold tabular-nums ${isSelected ? "text-amber-300" : "text-emerald-800 dark:text-emerald-300"}`,
													children: [
														"L",
														lesson.lessonNumber,
														" · +",
														lesson.starsReward,
														" ★"
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold truncate",
													children: resolveQaidaText(lesson.title, language).replace(/^Lesson \d+:\s*|^सबक़ \d+:\s*|^سبق \d+:\s*/, "")
												})]
											}), isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: `w-4 h-4 shrink-0 ${isSelected ? "text-amber-300" : "text-emerald-600 dark:text-emerald-400"}` }) : !unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4 shrink-0 opacity-60" })]
										}, lesson.id);
									})
								})]
							}, mod.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: prefersReduced ? false : {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: prefersReduced ? .05 : .24,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				className: "rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 shadow-sm space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 tabular-nums",
									children: [
										"Lesson ",
										activeLesson.lessonNumber,
										" of 17 · ",
										activeLesson.estimatedMinutes,
										" min"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300",
									children: completedIds.includes(activeLesson.id) ? "Completed ★" : `+${activeLesson.starsReward} ★ Reward`
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-base font-extrabold text-[#14532D] dark:text-emerald-300",
								children: resolveQaidaText(activeLesson.title, language)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--text-secondary)] leading-relaxed",
								children: resolveQaidaText(activeLesson.ruleExplanation, language)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1.5 bg-[var(--bg-subtle)] p-1 rounded-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSubTab("drills"),
								className: `flex-1 min-w-[82px] py-2 px-2.5 rounded-xl text-xs font-extrabold transition min-h-[40px] ${subTab === "drills" ? "bg-[#14532D] text-white shadow-2xs" : "text-[var(--text-secondary)]"}`,
								children: "Drills"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSubTab("trace"),
								className: `flex-1 min-w-[92px] py-2 px-2.5 rounded-xl text-xs font-extrabold transition min-h-[40px] flex items-center justify-center gap-1 ${subTab === "trace" ? "bg-[#14532D] text-white shadow-2xs" : "text-[var(--text-secondary)]"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Trace Pad" })]
							}),
							activeLesson.lessonNumber === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSubTab("alphabet28"),
								className: `flex-1 min-w-[92px] py-2 px-2.5 rounded-xl text-xs font-extrabold transition min-h-[40px] ${subTab === "alphabet28" ? "bg-[#14532D] text-white shadow-2xs" : "text-[var(--text-secondary)]"}`,
								children: "28 Letters"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSubTab("joiner"),
								className: `flex-1 min-w-[88px] py-2 px-2.5 rounded-xl text-xs font-extrabold transition min-h-[40px] flex items-center justify-center gap-1 ${subTab === "joiner" ? "bg-[#14532D] text-white shadow-2xs" : "text-[var(--text-secondary)]"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Joiner" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSubTab("vowels"),
								className: `flex-1 min-w-[86px] py-2 px-2.5 rounded-xl text-xs font-extrabold transition min-h-[40px] ${subTab === "vowels" ? "bg-[#14532D] text-white shadow-2xs" : "text-[var(--text-secondary)]"}`,
								children: "Vowels"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									resetMasteryQuiz(false);
									setSubTab("quiz");
								},
								className: `flex-1 min-w-[100px] py-2 px-2.5 rounded-xl text-xs font-extrabold transition min-h-[40px] ${subTab === "quiz" ? "bg-amber-500 text-emerald-950 shadow-2xs" : "text-[var(--text-secondary)]"}`,
								children: "Mastery Quiz (5Q)"
							})
						]
					}),
					subTab === "trace" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QaidaLetterTracingCanvas, {
						childId: activeChild.id,
						initialLetterIdx: selected28Idx,
						onLetterTraced: (letterName, pct) => {
							onTriggerToast?.(`MashaAllah! Traced ${letterName} (${pct}% match)`);
						},
						onTriggerToast
					}),
					subTab === "drills" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
							children: activeLesson.tiles.map((tile) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								whileTap: prefersReduced ? void 0 : { scale: .98 },
								className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 flex flex-col justify-between gap-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-extrabold text-[var(--text-primary)]",
												children: tile.transliteration
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-[var(--text-secondary)] mt-0.5",
												children: resolveQaidaText(tile.meaning, language)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											dir: "rtl",
											className: "px-3 py-1.5 rounded-xl bg-[#0F3826] text-amber-300 font-arabic text-2xl font-bold shrink-0 shadow-xs",
											children: tile.arabic
										})]
									}),
									tile.breakupLetters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										dir: "rtl",
										className: "flex items-center gap-1 text-xs font-arabic",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-sans font-bold text-[var(--text-muted)] ml-1",
											dir: "ltr",
											children: "Letters:"
										}), tile.breakupLetters.map((ch, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-7 h-7 rounded-lg bg-[var(--bg-surface)] border border-amber-400/40 flex items-center justify-center font-bold text-[var(--text-primary)]",
											children: ch
										}, i))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-semibold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 rounded-xl px-2.5 py-1.5",
										children: resolveQaidaText(tile.tajweedRuleNote, language)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => playDrillAudio({
											id: tile.id,
											arabic: tile.arabic,
											globalAyahNumber: tile.globalAyahNumber,
											letterAudioSlug: tile.letterAudioSlug,
											wbwWordPath: tile.wbwWordPath,
											label: `${tile.transliteration} (${tile.quranAyahRef})`
										}),
										className: "w-full py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 min-h-[42px] transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tile.letterAudioSlug ? `Hear Isolated Letter (${tile.transliteration})` : tile.wbwWordPath ? `Hear Exact Word (${tile.transliteration})` : `Hear Qari Ayah (${tile.quranAyahRef})` })]
									})
								]
							}, tile.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setQuizAnswerIdx(null);
									setSubTab("quiz");
								},
								className: "flex-1 py-3 rounded-xl bg-[#14532D] text-white text-xs font-extrabold min-h-[44px]",
								children: [
									"Take Lesson ",
									activeLesson.lessonNumber,
									" Quiz →"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => handleCompleteLesson(100),
								className: "px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold min-h-[44px]",
								children: [
									"Mark Practiced (+",
									activeLesson.starsReward,
									" ★)"
								]
							})]
						})]
					}),
					subTab === "alphabet28" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							dir: "rtl",
							className: "grid grid-cols-7 gap-1.5 bg-[var(--bg-elevated)] p-2.5 rounded-2xl border border-[var(--border-subtle)]",
							children: NOORANI_QAIDA_28_LETTERS.map((item, idx) => {
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setSelected28Idx(idx);
										playQaidaLetterHumanAudio({
											letter: item,
											mode: "letter",
											onStatus: onTriggerToast
										});
									},
									className: `h-11 rounded-xl font-arabic text-xl font-bold flex items-center justify-center border transition ${idx === selected28Idx ? "bg-[#14532D] text-amber-300 border-[#D4AF37] scale-105" : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-amber-400"}`,
									children: item.letterArabic
								}, item.id);
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[var(--bg-elevated)] border border-amber-400/40 p-3.5 space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-extrabold text-amber-800 dark:text-amber-300",
										children: [
											"Letter ",
											active28Letter.number,
											" of 28 · Isolated MP3 + Makhraj"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
										className: "text-base font-extrabold text-[var(--text-primary)]",
										children: [
											active28Letter.nameEn,
											" (",
											active28Letter.nameAr,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[var(--text-secondary)] mt-0.5",
										children: active28Letter.makhrajTip[language] || active28Letter.makhrajTip.en
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-14 h-14 rounded-2xl bg-[#0F3826] text-amber-300 flex items-center justify-center font-arabic text-3xl font-bold shrink-0",
									children: active28Letter.letterArabic
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => playQaidaLetterHumanAudio({
										letter: active28Letter,
										mode: "letter",
										onStatus: onTriggerToast
									}),
									className: "flex-1 py-2.5 px-3 rounded-xl bg-amber-400 text-emerald-950 text-xs font-extrabold min-h-[42px] flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Hear Letter (",
										active28Letter.nameEn,
										")"
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => playQaidaLetterHumanAudio({
										letter: active28Letter,
										mode: "quran_example",
										onStatus: onTriggerToast
									}),
									className: "flex-1 py-2.5 px-3 rounded-xl bg-[#16A34A] text-white text-xs font-extrabold min-h-[42px] flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Quran Ayah (",
										active28Letter.quranAyahRef,
										")"
									] })]
								})]
							})]
						})]
					}),
					subTab === "joiner" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[#0F3826] text-white p-4 text-center space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold text-amber-300 uppercase tracking-wider",
									children: "Live Arabic Letter Joiner (Tap letters below to connect up to 4)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: prefersReduced ? false : {
										scale: .92,
										opacity: .7
									},
									animate: {
										scale: 1,
										opacity: 1
									},
									transition: { duration: .18 },
									dir: "rtl",
									className: "font-arabic text-5xl font-bold text-amber-300 py-2 min-h-[68px] flex items-center justify-center",
									children: joinPreview.joinedWord || "—"
								}, joinPreview.joinedWord),
								joinPreview.slots.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									dir: "rtl",
									className: "grid grid-cols-2 sm:grid-cols-4 gap-2 text-center",
									children: joinPreview.slots.map((slot, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl bg-white/10 border border-white/15 p-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-arabic text-2xl font-bold text-white",
												children: slot.contextualGlyph
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] font-bold text-emerald-100 capitalize",
												dir: "ltr",
												children: [
													slot.name,
													" · ",
													slot.position
												]
											}),
											!slot.connectsLeft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-extrabold text-amber-300",
												dir: "ltr",
												children: "Non-connector"
											})
										]
									}, `${slot.letter}-${i}`))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-center gap-2 pt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setBuilderLetters([]),
											className: "px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold min-h-[38px]",
											children: "Clear"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setBuilderLetters([
												"ب",
												"س",
												"م"
											]),
											className: "px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold min-h-[38px]",
											children: "Try: ب س م"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setBuilderLetters([
												"ر",
												"س",
												"و",
												"ل"
											]),
											className: "px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold min-h-[38px]",
											children: "Try: ر س و ل"
										}),
										joinPreview.joinedWord && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => playJoinedLettersSequence(builderLetters),
											className: "px-3.5 py-2 rounded-xl bg-amber-400 text-emerald-950 text-xs font-extrabold min-h-[38px] inline-flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hear Letters (MP3)" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => playDrillAudio({
												id: `joiner_${joinPreview.joinedWord}`,
												arabic: joinPreview.joinedWord,
												label: `Joined word ${joinPreview.joinedWord}`
											}),
											className: "px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold min-h-[38px] inline-flex items-center gap-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Blend" })
										})] })
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							dir: "rtl",
							className: "grid grid-cols-7 gap-1.5 bg-[var(--bg-elevated)] p-2.5 rounded-2xl border border-[var(--border-subtle)]",
							children: ARABIC_LETTER_JOIN_FORMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setBuilderLetters((prev) => prev.length >= 4 ? [
										prev[1],
										prev[2],
										prev[3],
										item.letter
									] : [...prev, item.letter]);
									playGentleCelebrationChime("tap");
								},
								className: "h-10 rounded-xl bg-[var(--bg-surface)] hover:border-amber-400 border border-[var(--border-subtle)] font-arabic text-xl font-bold text-[var(--text-primary)] flex items-center justify-center transition",
								children: item.letter
							}, item.letter))
						})]
					}),
					subTab === "vowels" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[var(--bg-elevated)] border-2 border-amber-400/50 p-4 text-center space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] font-extrabold text-amber-800 dark:text-amber-300 uppercase",
									children: ["Tap Any Harakat Below & Hear How It Transforms ", activePlaygroundLetter.name]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: prefersReduced ? false : {
										scale: .9,
										opacity: .6
									},
									animate: {
										scale: 1,
										opacity: 1
									},
									className: "w-24 h-24 rounded-3xl bg-[#0F3826] text-amber-300 flex items-center justify-center font-arabic text-5xl font-bold mx-auto shadow-md",
									children: activePlaygroundMark.id === "sukoon" ? `أَ${activePlaygroundLetter.letter}${activePlaygroundMark.mark}` : `${activePlaygroundLetter.letter}${activePlaygroundMark.mark}`
								}, `${activePlaygroundLetter.letter}-${activePlaygroundMark.id}`),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-extrabold text-[var(--text-primary)]",
									children: [
										activePlaygroundLetter.name,
										" + ",
										activePlaygroundMark.label,
										loadingStudioSyllable?.startsWith("vowel_") ? " · Loading Ustad voice…" : ""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 sm:grid-cols-3 gap-1.5",
									children: HARAKAT_MARKS.map((mark) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setPlaygroundHarakatId(mark.id);
											const vocalized = mark.id === "sukoon" ? `أَ${activePlaygroundLetter.letter}${mark.mark}` : `${activePlaygroundLetter.letter}${mark.mark}`;
											playDrillAudio({
												id: `vowel_${activePlaygroundLetter.letter}_${mark.id}`,
												arabic: vocalized,
												label: `${activePlaygroundLetter.name} with ${mark.label}`
											});
										},
										className: `py-2 px-2.5 rounded-xl border text-xs font-extrabold min-h-[44px] transition ${playgroundHarakatId === mark.id ? "bg-[#14532D] text-white border-[#14532D] dark:border-emerald-400" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
										children: mark.label
									}, mark.id))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							dir: "rtl",
							className: "grid grid-cols-7 gap-1.5 bg-[var(--bg-elevated)] p-2 rounded-2xl border border-[var(--border-subtle)]",
							children: ARABIC_LETTER_JOIN_FORMS.slice(0, 28).map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPlaygroundLetterIdx(idx),
								className: `h-10 rounded-xl font-arabic text-lg font-bold border transition ${idx === playgroundLetterIdx ? "bg-amber-400 text-emerald-950 border-amber-500" : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)]"}`,
								children: item.letter
							}, item.letter))
						})]
					}),
					subTab === "quiz" && (() => {
						const currentQ = masteryQuiz.questions[quizStepIdx] || masteryQuiz.questions[0];
						const totalQ = masteryQuiz.questions.length;
						const result = evaluateQaidaMasteryResult({
							correctCount: quizCorrectCount,
							totalQuestions: totalQ
						});
						const nextLesson = NOORANI_QAIDA_COURSE_LESSONS.find((l) => l.lessonNumber === activeLesson.lessonNumber + 1);
						const nextLessonUnlocked = nextLesson ? canAccessQaidaLesson(user, nextLesson.lessonNumber) : false;
						if (quizFinished) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[var(--bg-elevated)] border-2 border-amber-400/50 p-5 space-y-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivingMascot, {
										character: "Mizo",
										state: result.passed ? "celebrating" : "encouraging",
										size: "md",
										showSpeechBubble: true,
										speechText: result.passed ? `MashaAllah ${activeChild.name}! You mastered Lesson ${activeLesson.lessonNumber}!` : "Great effort! Let us review the tricky letters gently and try again."
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 tabular-nums",
									children: [
										"Lesson ",
										activeLesson.lessonNumber,
										" Mastery Result · ",
										quizCorrectCount,
										"/",
										totalQ,
										" Correct"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xl font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums",
									children: result.passed ? `MashaAllah! ${result.scorePercent}% Mastered ★` : `${result.scorePercent}% — Need ${masteryQuiz.passingScorePercent}% to Master`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto",
									children: result.passed ? `Wonderful listening and recognition! Lesson ${activeLesson.lessonNumber} is marked mastered for ${activeChild.name}.` : "Almost there! Review the audio drill cards or try a fresh 5-question round to reach 4/5."
								}),
								revisionItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 text-left space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
										children: "Recommended Revision Based on Recent Answers"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
										children: revisionItems.map((rev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-2.5 flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-arabic text-xl font-bold text-[#14532D] dark:text-amber-300 leading-tight",
													children: rev.arabicText
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px] font-bold text-[var(--text-secondary)] truncate",
													children: [
														rev.label,
														" · Lesson ",
														rev.lessonNumber
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													markChildQaidaMistakeResolved(activeChild.id, rev.id);
													setRevisionItems(getActiveQaidaRevisionRecommendations(activeChild.id, 4));
													triggerLightHaptic();
												},
												className: "min-h-[36px] px-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold shrink-0",
												children: "Practiced"
											})]
										}, rev.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-center gap-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => resetMasteryQuiz(true),
										className: "px-4 min-h-[44px] rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-extrabold inline-flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "New 5Q Round" })]
									}), result.passed && nextLesson && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleSelectLesson(nextLesson),
										className: "px-4 min-h-[44px] rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center gap-1.5 shadow-sm transition",
										children: nextLessonUnlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Continue to Lesson ", nextLesson.lessonNumber] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Unlock Lesson ",
											nextLesson.lessonNumber,
											" (Family Plus)"
										] })] })
									})]
								}),
								completedIds.length >= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-emerald-950 text-amber-200 p-3 flex items-center justify-center gap-2 text-xs font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-4 h-4 text-amber-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: completedIds.length >= 17 ? "MashaAllah! All 17 Qaida Lessons mastered — view your Certificate in Badges!" : `${17 - completedIds.length} lesson(s) remaining for Noorani Qaida Graduation!` })]
								})
							]
						});
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 space-y-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-[11px] font-extrabold text-amber-900 dark:text-amber-300 tabular-nums",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Lesson ",
											activeLesson.lessonNumber,
											" Mastery Check · Question ",
											quizStepIdx + 1,
											" of ",
											totalQ
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-emerald-800 dark:text-emerald-300",
											children: [
												"Score: ",
												quizCorrectCount,
												"/",
												totalQ
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-[#22C55E] transition-all duration-200",
											style: { width: `${(quizStepIdx + (quizAnswerIdx !== null ? 1 : 0)) / totalQ * 100}%` }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[#0F3826] text-white p-4 flex flex-wrap items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1 flex-1 min-w-[180px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] font-bold text-amber-300",
											children: currentQ.kind === "audio_recognition" ? "Audio Recognition Challenge" : currentQ.kind === "rule_check" ? "Qaida Rule Mastery" : "Drill Recognition"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-extrabold leading-snug",
											children: language === "hinglish" || language === "hi" ? currentQ.promptHinglish : currentQ.promptEn
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 shrink-0",
										children: [currentQ.visibleTargetArabic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "px-3.5 py-2 rounded-xl bg-white/10 text-amber-300 font-arabic text-2xl font-bold",
											children: currentQ.visibleTargetArabic
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => playDrillAudio({
												id: currentQ.id,
												arabic: currentQ.audio.arabicText,
												letterAudioSlug: currentQ.audio.letterAudioSlug,
												wbwWordPath: currentQ.audio.wbwWordPath,
												globalAyahNumber: currentQ.audio.globalAyahNumber,
												label: currentQ.kind === "audio_recognition" ? "Audio question clip" : currentQ.audio.spokenLabel
											}),
											className: "px-4 min-h-[48px] rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold inline-flex items-center gap-1.5 shadow-sm transition",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hear Sound" })]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2.5",
									children: currentQ.options.map((opt, idx) => {
										const picked = quizAnswerIdx === idx;
										const answered = quizAnswerIdx !== null;
										const isCorrect = idx === currentQ.correctIndex;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											disabled: answered,
											onClick: () => {
												setQuizAnswerIdx(idx);
												if (isCorrect) {
													setQuizCorrectCount((c) => c + 1);
													playGentleCelebrationChime("star");
													triggerSuccessHaptic();
												} else {
													playGentleCelebrationChime("tap");
													triggerLightHaptic();
													recordChildQaidaMistake({
														childId: activeChild.id,
														lessonId: activeLesson.id,
														lessonNumber: activeLesson.lessonNumber,
														arabicText: currentQ.audio.arabicText,
														label: currentQ.audio.spokenLabel
													});
													setRevisionItems(getActiveQaidaRevisionRecommendations(activeChild.id, 4));
												}
											},
											className: `p-3.5 rounded-2xl border-2 text-center flex flex-col items-center justify-center gap-1 min-h-[76px] transition ${answered && isCorrect ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 dark:border-emerald-400 text-emerald-950 dark:text-emerald-100" : picked && !isCorrect ? "bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-amber-400 text-[var(--text-primary)]"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-arabic text-3xl font-bold text-[#14532D] dark:text-amber-300",
												children: opt.arabic
											}), (answered || currentQ.kind !== "audio_recognition") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-extrabold text-[var(--text-secondary)]",
												children: opt.label
											})]
										}, opt.id);
									})
								}),
								quizAnswerIdx !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `rounded-xl p-3 text-xs font-bold border ${quizAnswerIdx === currentQ.correctIndex ? "bg-emerald-50 dark:bg-emerald-950/45 border-emerald-300 dark:border-emerald-500/35 text-emerald-950 dark:text-emerald-200" : "bg-amber-50 dark:bg-amber-950/45 border-amber-300 dark:border-amber-500/35 text-amber-950 dark:text-amber-200"}`,
										children: [quizAnswerIdx === currentQ.correctIndex ? "✓ MashaAllah! " : "Keep practicing: ", currentQ.explanationEn]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											if (quizStepIdx + 1 < totalQ) {
												setQuizStepIdx((s) => s + 1);
												setQuizAnswerIdx(null);
											} else {
												const finalScore = evaluateQaidaMasteryResult({
													correctCount: quizCorrectCount,
													totalQuestions: totalQ
												});
												setQuizFinished(true);
												if (finalScore.passed) handleCompleteLesson(finalScore.scorePercent);
											}
										},
										className: "w-full min-h-[48px] py-3 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: quizStepIdx + 1 < totalQ ? "Next Question →" : "See Mastery Result ★" })
									})]
								})
							]
						});
					})()
				]
			}, activeLesson.id)
		]
	});
};
// src/components/kids/DailyTarbiyahPlanCard.tsx
var DailyTarbiyahPlanCard = ({ plan, onLaunchStep }) => {
	const [paused, setPaused] = (0, import_react.useState)(plan.isPaused);
	const nextStep = plan.steps.find((s) => !s.completed) || plan.steps[0];
	const handleTogglePause = () => {
		const nextPaused = !paused;
		setPaused(nextPaused);
		const current = loadLocalOnboardingProfile();
		saveLocalOnboardingProfile({
			...current,
			planPaused: nextPaused,
			lastActiveDateKey: plan.dateKey
		});
		triggerLightHaptic();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Adaptive Daily Guided Tarbiyah Plan",
		className: "rounded-3xl bg-[var(--bg-surface)] p-4 shadow-sm border border-[var(--border-subtle)] space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] font-bold text-amber-800 dark:text-amber-300 tabular-nums",
						children: [paused ? "Routine Paused · Progress Safe" : `Ages ${plan.ageBand} · ${plan.totalMinutes}-Min Adaptive Plan · ${plan.completedCount}/3 Done`, !paused && plan.remainingMinutes > 0 ? ` · ${plan.remainingMinutes} min left` : ""]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-extrabold text-[#14532D] dark:text-emerald-300 mt-0.5 leading-snug",
						children: paused ? `${plan.childName}’s Plan Is Resting` : plan.isComplete ? `MashaAllah, ${plan.childName}! Today’s Tarbiyah Complete` : `${plan.childName}’s Calm Daily Routine`
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleTogglePause,
					"aria-label": paused ? "Resume daily routine" : "Pause daily routine",
					title: paused ? "Resume Routine" : "Pause Routine",
					className: "min-h-[40px] px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[#14532D] dark:hover:border-emerald-400 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold inline-flex items-center gap-1 shrink-0 transition",
					children: [paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: paused ? "Resume" : "Pause" })]
				})]
			}),
			(paused || plan.kindnessState.showWelcomeBack) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200/80 dark:border-amber-500/30 p-3 flex items-start gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-extrabold text-amber-950 dark:text-amber-200",
						children: paused ? "Routine Paused — Take Your Time" : plan.kindnessState.toneTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-amber-900/90 dark:text-amber-200/80 leading-snug mt-0.5",
						children: paused ? "Your child’s stars, stories, and Qaida mastery stay saved locally. Tap Resume anytime." : plan.kindnessState.toneMessage
					})]
				})]
			}),
			!paused && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: plan.steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							triggerLightHaptic();
							onLaunchStep(step);
						},
						className: `w-full text-left rounded-2xl p-3 border transition flex items-center justify-between gap-3 min-h-[56px] ${step.completed ? "bg-emerald-50/70 dark:bg-emerald-950/45 border-emerald-200 dark:border-emerald-500/35" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] hover:border-emerald-400"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-extrabold tabular-nums ${step.completed ? "bg-[#22C55E] text-white" : "bg-[#14532D] text-amber-300"}`,
								children: step.completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 stroke-[3]" }) : step.stepNumber
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold text-[var(--text-primary)] truncate",
									children: step.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[var(--text-secondary)] truncate",
									children: step.subtitle
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 shrink-0 text-[11px] font-bold text-[var(--text-secondary)] tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3 text-[var(--text-muted)]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [step.minutes, "m"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5 text-[#14532D] dark:text-emerald-400" })
							]
						})]
					}, step.id))
				}),
				!plan.isComplete && nextStep && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						triggerLightHaptic();
						onLaunchStep(nextStep);
					},
					className: "w-full min-h-[48px] py-3 px-4 rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition",
					children: [nextStep.id === "qaida" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4 text-amber-300" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Start Step ",
						nextStep.stepNumber,
						": ",
						nextStep.title
					] })]
				}),
				plan.isComplete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl bg-emerald-50 dark:bg-emerald-950/45 border border-emerald-200 dark:border-emerald-500/35 px-3.5 py-2.5 flex items-center justify-between text-xs font-extrabold text-[#14532D] dark:text-emerald-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-4 h-4 text-amber-500 fill-amber-400" }),
							"Alhamdulillah! Today’s ",
							plan.totalMinutes,
							"-minute routine is complete."
						]
					})
				})
			] })
		]
	});
};
// src/components/kids/QuranGardenView.tsx
var QuranGardenView = ({ child, completedStoryCount, practicedSurahCount, qaidaCompletedCount, onClose, onOpenQuran }) => {
	const prefersReducedMotion = useReducedMotion();
	const [wateredToday, setWateredToday] = (0, import_react.useState)(() => {
		try {
			const todayKey = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			return localStorage.getItem(`ilmizo_garden_water_${child.id}_${todayKey}`) === "1";
		} catch {
			return false;
		}
	});
	const [selectedPlant, setSelectedPlant] = (0, import_react.useState)(null);
	const growthScore = (0, import_react.useMemo)(() => child.stars + practicedSurahCount * 15 + completedStoryCount * 10 + qaidaCompletedCount * 12, [
		child.stars,
		practicedSurahCount,
		completedStoryCount,
		qaidaCompletedCount
	]);
	const stage = (0, import_react.useMemo)(() => {
		if (growthScore >= 260) return {
			level: 5,
			name: "Jannah Paradise Garden",
			nextTarget: 400
		};
		if (growthScore >= 160) return {
			level: 4,
			name: "Golden Orchard",
			nextTarget: 260
		};
		if (growthScore >= 90) return {
			level: 3,
			name: "Blooming Oasis",
			nextTarget: 160
		};
		if (growthScore >= 35) return {
			level: 2,
			name: "Sprouting Meadow",
			nextTarget: 90
		};
		return {
			level: 1,
			name: "Little Seedling",
			nextTarget: 35
		};
	}, [growthScore]);
	const plants = (0, import_react.useMemo)(() => [
		{
			id: "plant_fatiha",
			label: "Date Palm of Al-Fatiha",
			sourceLabel: "Grown from opening Quran recitation",
			kind: "palm",
			xPct: 18,
			yPct: 58,
			unlocked: true
		},
		{
			id: "plant_ikhlas",
			label: "Olive Tree of Sincerity",
			sourceLabel: "Unlocks at 1+ practiced Surah or 20 Stars",
			kind: "olive",
			xPct: 78,
			yPct: 56,
			unlocked: practicedSurahCount >= 1 || child.stars >= 20
		},
		{
			id: "plant_qaida",
			label: "Jasmine of Noorani Qaida",
			sourceLabel: "Unlocks when you practice Qaida letters",
			kind: "flower",
			xPct: 35,
			yPct: 72,
			unlocked: qaidaCompletedCount >= 1 || child.stars >= 10
		},
		{
			id: "plant_story",
			label: "Golden Lantern of Stories",
			sourceLabel: "Unlocks after finishing 1+ Islamic Story",
			kind: "lantern",
			xPct: 50,
			yPct: 48,
			unlocked: completedStoryCount >= 1 || child.stars >= 25
		},
		{
			id: "plant_salah",
			label: "Lotus Blossom of Salah",
			sourceLabel: "Unlocks at 45+ Jannah Stars",
			kind: "flower",
			xPct: 65,
			yPct: 74,
			unlocked: child.stars >= 45 || practicedSurahCount >= 2
		},
		{
			id: "plant_hifz",
			label: "Royal Orchard Palm",
			sourceLabel: "Unlocks at 100+ Jannah Stars or 3 Surahs",
			kind: "palm",
			xPct: 86,
			yPct: 70,
			unlocked: child.stars >= 100 || practicedSurahCount >= 3
		}
	], [
		child.stars,
		practicedSurahCount,
		qaidaCompletedCount,
		completedStoryCount
	]);
	const unlockedCount = plants.filter((p) => p.unlocked).length;
	const handleWaterGarden = () => {
		triggerSuccessHaptic();
		setWateredToday(true);
		try {
			const todayKey = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			localStorage.setItem(`ilmizo_garden_water_${child.id}_${todayKey}`, "1");
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-[var(--bg-surface)] border border-emerald-200/80 dark:border-emerald-700/40 overflow-hidden shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-3.5 bg-gradient-to-r from-[#14532D] to-[#1E6B3A] text-white flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-semibold text-amber-300",
					children: [
						"Stage ",
						stage.level,
						" of 5 · ",
						stage.name
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-base font-extrabold tracking-tight",
					children: [child.name, "’s Quran Garden"]
				})] }), onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "Close Quran Garden",
					className: "min-w-[44px] min-h-[44px] rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-64 sm:h-72 bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-200 dark:from-[#0B2D24] dark:via-[#114232] dark:to-[#0D3324] overflow-hidden select-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "absolute top-4 right-6 w-12 h-12 rounded-full bg-amber-300/90 shadow-[0_0_32px_rgba(251,191,36,0.65)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 400 220",
						preserveAspectRatio: "none",
						className: "absolute inset-0 w-full h-full pointer-events-none",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M0,135 Q110,95 215,128 T400,118 L400,220 L0,220 Z",
								fill: "#15803D",
								opacity: "0.35"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M0,152 Q145,125 265,152 T400,145 L400,220 L0,220 Z",
								fill: "#16A34A",
								opacity: "0.55"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M0,175 Q180,155 400,176 L400,220 L0,220 Z",
								fill: "#14532D",
								opacity: "0.82"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M175,220 Q200,178 210,148 Q216,136 226,148 Q240,180 255,220 Z",
								fill: "#38BDF8",
								opacity: "0.55"
							})
						]
					}),
					plants.map((plant) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						type: "button",
						onClick: () => {
							triggerLightHaptic();
							setSelectedPlant(plant);
						},
						whileTap: prefersReducedMotion ? void 0 : { scale: .92 },
						animate: prefersReducedMotion || !plant.unlocked ? void 0 : { y: [
							0,
							-3,
							0
						] },
						transition: {
							duration: 3.2,
							repeat: Infinity,
							ease: "easeInOut"
						},
						style: {
							left: `${plant.xPct}%`,
							top: `${plant.yPct}%`
						},
						"aria-label": `${plant.label} (${plant.unlocked ? "Blooming" : "Seedling locked"})`,
						className: `absolute -translate-x-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center transition ${plant.unlocked ? "bg-white/85 dark:bg-emerald-950/85 border-2 border-amber-400 shadow-md" : "bg-white/40 dark:bg-black/30 border border-dashed border-emerald-900/35 dark:border-white/25 opacity-65"}`,
						children: [
							plant.kind === "palm" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 36 36",
								className: "w-8 h-8",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "16",
										y: "16",
										width: "4",
										height: "15",
										rx: "2",
										fill: "#92400E"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M18,16 C12,10 6,12 4,16 C10,16 14,17 18,16 Z",
										fill: "#15803D"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M18,16 C24,10 30,12 32,16 C26,16 22,17 18,16 Z",
										fill: "#16A34A"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M18,15 C14,7 19,5 22,8 C20,11 19,13 18,15 Z",
										fill: "#22C55E"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "15",
										cy: "17",
										r: "2",
										fill: "#F59E0B"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "21",
										cy: "17",
										r: "2",
										fill: "#F59E0B"
									})
								]
							}),
							plant.kind === "olive" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 36 36",
								className: "w-8 h-8",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "16",
										y: "19",
										width: "4",
										height: "12",
										rx: "2",
										fill: "#78350F"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "18",
										cy: "14",
										r: "9",
										fill: "#15803D"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "13",
										cy: "15",
										r: "5",
										fill: "#22C55E"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "23",
										cy: "15",
										r: "5",
										fill: "#16A34A"
									})
								]
							}),
							plant.kind === "flower" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 36 36",
								className: "w-7 h-7",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "17",
										y: "18",
										width: "2.5",
										height: "12",
										rx: "1",
										fill: "#15803D"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "18",
										cy: "12",
										r: "4",
										fill: "#F59E0B"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "13",
										cy: "15",
										r: "3.5",
										fill: "#FDE68A"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "23",
										cy: "15",
										r: "3.5",
										fill: "#FDE68A"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "18",
										cy: "15",
										r: "3",
										fill: "#B45309"
									})
								]
							}),
							plant.kind === "lantern" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 36 36",
								className: "w-7 h-7",
								"aria-hidden": "true",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M18,5 L24,13 L22,26 L14,26 L12,13 Z",
									fill: "#F59E0B",
									stroke: "#78350F",
									strokeWidth: "1.5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "18",
									cy: "18",
									r: "3.5",
									fill: "#FEF3C7"
								})]
							})
						]
					}, plant.id)),
					wateredToday && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-2.5 left-3 right-3 rounded-xl bg-black/45 backdrop-blur-xs px-3 py-1.5 text-xs font-bold text-amber-200 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Garden watered with Bismillah today" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-amber-300 shrink-0" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 space-y-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 text-xs text-[var(--text-secondary)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold text-[var(--text-primary)] tabular-nums",
							children: [
								unlockedCount,
								"/",
								plants.length,
								" Trees & Blossoms Blooming"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-300 tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3.5 h-3.5 fill-amber-400 text-amber-500" }),
								child.stars,
								" Jannah Stars"
							]
						})]
					}),
					selectedPlant ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-extrabold text-[var(--text-primary)]",
							children: selectedPlant.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-secondary)]",
							children: selectedPlant.unlocked ? `Blooming · ${selectedPlant.sourceLabel}` : `Seedling · ${selectedPlant.sourceLabel}`
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-xs font-extrabold whitespace-nowrap ${selectedPlant.unlocked ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`,
							children: selectedPlant.unlocked ? "Blooming" : "Growing"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-[var(--text-secondary)]",
						children: "Tap any tree, flower, or lantern above to see how your Quran recitation and stories grow your garden."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleWaterGarden,
							className: `min-h-[46px] rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition active:scale-95 ${wateredToday ? "bg-emerald-100 dark:bg-emerald-900/50 text-[#14532D] dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700/50" : "bg-[#14532D] text-white shadow-xs"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: wateredToday ? "Watered Today ✓" : "Water Garden" })]
						}), onOpenQuran && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onOpenQuran,
							className: "min-h-[46px] rounded-2xl bg-amber-400 text-emerald-950 text-xs font-extrabold flex items-center justify-center gap-2 active:scale-95 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Plant More Surahs" })]
						})]
					})
				]
			})
		]
	});
};
// src/services/storyArtworkAndAudio.ts
var TOP_FEATURED_STORY_IDS = [
	"story_nuh",
	"story_ismail_zamzam",
	"story_yunus_dua",
	"story_bilal_steadfast",
	"story_umar_night_care",
	"story_uthman_well_rumah",
	"story_ibrahim_stars",
	"story_yusuf_forgiveness",
	"story_musa_helper",
	"story_sulayman_ant",
	"story_muhammad_al_amin",
	"story_honest_boy",
	"story_kindness_animals",
	"story_luqman_wise_advice",
	"story_giving_water_hudhayfah_ikrimah"
];
var STORY_COVER_ARTWORK_MAP = {
	story_nuh: "/assets/illustrations/story_ark_horizon.webp",
	story_honest_boy: "/assets/illustrations/story_honest.webp",
	story_kindness_animals: "/assets/illustrations/story_animals.webp",
	story_little_helper: "/assets/illustrations/story_family_home.webp",
	story_ibrahim_stars: "/assets/illustrations/story_ibrahim.webp",
	story_ismail_zamzam: "/assets/illustrations/story_ismail_zamzam.webp",
	story_yusuf_forgiveness: "/assets/illustrations/story_yusuf.webp",
	story_musa_helper: "/assets/illustrations/story_musa.webp",
	story_sulayman_ant: "/assets/illustrations/story_sulayman.webp",
	story_yunus_dua: "/assets/illustrations/story_yunus_whale.webp",
	story_ayyub_patience: "/assets/illustrations/story_olive_grove.webp",
	story_dawud_gratitude: "/assets/illustrations/story_madrasah_scroll.webp",
	story_isa_table_mercy: "/assets/illustrations/story_eid_lanterns.webp",
	story_muhammad_al_amin: "/assets/illustrations/story_makkah_amanah.webp",
	story_abubakr_companionship: "/assets/illustrations/story_desert_oasis.webp",
	story_umar_night_care: "/assets/illustrations/story_umar_lantern.webp",
	story_uthman_well_rumah: "/assets/illustrations/story_uthman_well.webp",
	story_ali_courage_knowledge: "/assets/illustrations/story_madrasah_scroll.webp",
	story_khadijah_comfort: "/assets/illustrations/story_family_home.webp",
	story_bilal_steadfast: "/assets/illustrations/story_bilal_adhan.webp",
	story_fatimah_respect: "/assets/illustrations/story_family_home.webp",
	story_salman_truth_seeker: "/assets/illustrations/story_madrasah_scroll.webp",
	story_asma_two_belts: "/assets/illustrations/story_desert_oasis.webp",
	story_parents_cave_rock: "/assets/illustrations/story_night_lantern.webp",
	story_sparrow_mercy: "/assets/illustrations/story_olive_grove.webp",
	story_jar_of_gold_amanah: "/assets/illustrations/story_makkah_amanah.webp",
	story_smiling_sadaqah: "/assets/illustrations/story_eid_lanterns.webp",
	story_table_manners_umar_abi_salamah: "/assets/illustrations/story_family_home.webp",
	story_controlling_anger: "/assets/illustrations/story_honest.webp",
	story_sharing_soup_neighbor: "/assets/illustrations/story_eid_lanterns.webp",
	story_planting_sapling_hope: "/assets/illustrations/story_olive_grove.webp",
	story_luqman_wise_advice: "/assets/illustrations/story_madrasah_scroll.webp",
	story_two_gardens_gratitude: "/assets/illustrations/story_garden_nature.webp",
	story_abu_ayyub_hospitality: "/assets/illustrations/story_eid_lanterns.webp",
	story_cleanliness_half_faith: "/assets/illustrations/story_garden_nature.webp",
	story_saving_water_river: "/assets/illustrations/story_ocean_mercy.webp",
	story_keeping_promises_hudhaifah: "/assets/illustrations/story_mosque_courtyard.webp",
	story_visiting_sick_friend: "/assets/illustrations/story_helper.webp",
	story_ashab_al_kahf_youth: "/assets/illustrations/story_night_lantern.webp",
	story_adam_tawbah_humility: "/assets/illustrations/story_olive_grove.webp",
	story_muadh_love_for_allah: "/assets/illustrations/story_madrasah_scroll.webp",
	story_abu_hurayrah_knowledge_cat: "/assets/illustrations/story_animals.webp",
	story_giving_water_hudhayfah_ikrimah: "/assets/illustrations/story_sahaba_charity.webp",
	story_good_word_like_good_tree: "/assets/illustrations/story_olive_grove.webp",
	story_luqman_gentle_voice: "/assets/illustrations/story_madrasah_scroll.webp",
	story_dawud_gratitude_work: "/assets/illustrations/story_honest.webp",
	story_zakariyya_yahya_gentleness: "/assets/illustrations/story_mosque_courtyard.webp",
	story_isa_humility_service: "/assets/illustrations/story_helper.webp",
	story_smiling_sadaqah_manners: "/assets/illustrations/story_eid_lanterns.webp"
};
var SCENE_ROTATION_BY_CATEGORY = {
	Prophets: [
		"/assets/illustrations/story_ismail_zamzam.webp",
		"/assets/illustrations/story_ark_horizon.webp",
		"/assets/illustrations/story_yunus_whale.webp",
		"/assets/illustrations/story_night_lantern.webp",
		"/assets/illustrations/story_olive_grove.webp",
		"/assets/illustrations/story_mosque_courtyard.webp"
	],
	Companions: [
		"/assets/illustrations/story_mosque_courtyard.webp",
		"/assets/illustrations/story_desert_oasis.webp",
		"/assets/illustrations/story_madrasah_scroll.webp",
		"/assets/illustrations/story_eid_lanterns.webp",
		"/assets/illustrations/story_sahaba_charity.webp",
		"/assets/illustrations/story_family_home.webp"
	],
	Kindness: [
		"/assets/illustrations/story_olive_grove.webp",
		"/assets/illustrations/story_eid_lanterns.webp",
		"/assets/illustrations/story_garden_nature.webp",
		"/assets/illustrations/story_family_home.webp",
		"/assets/illustrations/story_animals.webp",
		"/assets/illustrations/story_helper.webp"
	],
	Honesty: [
		"/assets/illustrations/story_madrasah_scroll.webp",
		"/assets/illustrations/story_mosque_courtyard.webp",
		"/assets/illustrations/story_honest.webp",
		"/assets/illustrations/story_makkah_amanah.webp",
		"/assets/illustrations/story_family_home.webp",
		"/assets/illustrations/story_eid_lanterns.webp"
	],
	default: [
		"/assets/illustrations/story_eid_lanterns.webp",
		"/assets/illustrations/story_olive_grove.webp",
		"/assets/illustrations/story_madrasah_scroll.webp",
		"/assets/illustrations/story_desert_oasis.webp",
		"/assets/illustrations/story_mosque_courtyard.webp",
		"/assets/illustrations/story_family_home.webp"
	]
};
function getStoryCoverArtwork(story) {
	if (STORY_COVER_ARTWORK_MAP[story.id]) return STORY_COVER_ARTWORK_MAP[story.id];
	if (story.category === "Prophets") return "/assets/illustrations/story_desert_oasis.webp";
	if (story.category === "Companions") return "/assets/illustrations/story_mosque_courtyard.webp";
	if (story.category === "Kindness" || story.category === "Animals") return "/assets/illustrations/story_animals.webp";
	if (story.category === "Honesty" || story.category === "Truthfulness") return "/assets/illustrations/story_honest.webp";
	if (story.category === "Gratitude" || story.category === "Patience") return "/assets/illustrations/story_olive_grove.webp";
	return "/assets/illustrations/story_family_home.webp";
}
function getStorySceneArtwork(story, sceneIndex) {
	const cover = getStoryCoverArtwork(story);
	if (sceneIndex <= 0) return cover;
	const pool = SCENE_ROTATION_BY_CATEGORY[story.category] || SCENE_ROTATION_BY_CATEGORY.default;
	const filtered = pool.filter((img) => img !== cover);
	const chosenPool = filtered.length > 0 ? filtered : pool;
	return chosenPool[(sceneIndex - 1) % chosenPool.length];
}
var STORY_QURAN_VERSES_MAP = {
	story_nuh: {
		surahRef: "Surah Hud 11:41",
		globalAyahNumber: 1514,
		arabicAyah: "۞ وَقَالَ ٱرْكَبُوا۟ فِيهَا بِسْمِ ٱللَّهِ مَجْر۪ىٰهَا وَمُرْسَىٰهَآ ۚ إِنَّ رَبِّى لَغَفُورٌ رَّحِيمٌ",
		transliteration: "Wa qaalar-kaboo feehaa bismillaahi majreehaa wa mursaahaa",
		meaningEn: "Board the Ark! In the Name of Allah is its sailing and its anchoring."
	},
	story_ibrahim_stars: {
		surahRef: "Surah Al-An’am 6:79",
		globalAyahNumber: 868,
		arabicAyah: "إِنِّى وَجَّهْتُ وَجْهِىَ لِلَّذِى فَطَرَ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ حَنِيفًا",
		transliteration: "Innee wajjahtu wajhiya lilladhee fataras-samaawaati wal-ard",
		meaningEn: "Indeed, I have turned my face purely toward Him who created the heavens and the earth."
	},
	story_yusuf_forgiveness: {
		surahRef: "Surah Yusuf 12:92",
		globalAyahNumber: 1688,
		arabicAyah: "قَالَ لَا تَثْرِيبَ عَلَيْكُمُ ٱلْيَوْمَ ۖ يَغْفِرُ ٱللَّهُ لَكُمْ ۖ وَهُوَ أَرْحَمُ ٱلرَّٰحِمِينَ",
		transliteration: "Qaala laa tathreeba ‘alaykumul-yawma yaghfirullaahu lakum",
		meaningEn: "He said: No blame will there be upon you today. Allah will forgive you!"
	},
	story_musa_helper: {
		surahRef: "Surah Al-Qasas 28:24",
		globalAyahNumber: 3276,
		arabicAyah: "فَسَقَىٰ لَهُمَا ثُمَّ تَوَلَّىٰٓ إِلَى ٱلظِّلِّ فَقَالَ رَبِّ إِنِّى لِمَآ أَنزَلْتَ إِلَىَّ مِنْ خَيْرٍ فَقِيرٌ",
		transliteration: "Fasaqaa lahumaa thumma tawallaa ilaz-zilli faqaala Rabbi innee limaa anzalta ilayya min khayrin faqeer",
		meaningEn: "So he watered their flock for them, then turned to the shade and prayed: My Lord, I am in need of any good You send me."
	},
	story_sulayman_ant: {
		surahRef: "Surah An-Naml 27:19",
		globalAyahNumber: 3178,
		arabicAyah: "فَتَبَسَّمَ ضَاحِكًا مِّن قَوْلِهَا وَقَالَ رَبِّ أَوْزِعْنِىٓ أَنْ أَشْكُرَ نِعْمَتَكَ",
		transliteration: "Fatabassama daahikam-min qawlihaa wa qaala Rabbi awzi‘nee an ashkura ni‘matak",
		meaningEn: "So Sulayman smiled, amused at her words, and prayed: My Lord, enable me to be grateful for Your favor!"
	},
	story_yunus_dua: {
		surahRef: "Surah Al-Anbiya 21:87",
		globalAyahNumber: 2570,
		arabicAyah: "لَّآ إِلَـٰهَ إِلَّآ أَنتَ سُبْحَـٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّـٰلِمِينَ",
		transliteration: "Laa ilaaha illaa Anta Subhaanaka innee kuntu minaz-zaalimeen",
		meaningEn: "There is no deity except You; exalted are You! Indeed, I have been of the wrongdoers."
	},
	story_luqman_wise_advice: {
		surahRef: "Surah Luqman 31:13",
		globalAyahNumber: 3482,
		arabicAyah: "يَـٰبُنَىَّ لَا تُشْرِكْ بِٱللَّهِ ۖ إِنَّ ٱلشِّرْكَ لَظُلْمٌ عَظِيمٌ",
		transliteration: "Yaa bunayya laa tushrik billaah",
		meaningEn: "O my dear son, do not associate anything with Allah."
	},
	story_ashab_al_kahf_youth: {
		surahRef: "Surah Al-Kahf 18:10",
		globalAyahNumber: 2150,
		arabicAyah: "رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
		transliteration: "Rabbanaa aatinaa mil-ladunka rahmatan wa hayyi’ lanaa min amrinaa rashadaa",
		meaningEn: "Our Lord, grant us mercy from Yourself and prepare for us right guidance in our affair."
	},
	story_good_word_like_good_tree: {
		surahRef: "Surah Ibrahim 14:24",
		globalAyahNumber: 1774,
		arabicAyah: "أَلَمْ تَرَ كَيْفَ ضَرَبَ ٱللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ",
		transliteration: "Kalimatan tayyibatan kashajaratin tayyibatin asluhaa thaabitun wa far‘uhaa fis-samaa’",
		meaningEn: "A good word is like a good tree whose root is firm and whose branches reach the sky."
	}
};
function splitStoryPageIntoSentences(pageText) {
	const clean = (pageText || "").trim();
	if (!clean) return [];
	const parts = clean.split(/(?<=[.!?।۔])\s+/).map((s) => s.trim()).filter(Boolean);
	return parts.length > 0 ? parts : [clean];
}
function getSpeechLangForUiLanguage(lang) {
	switch (lang) {
		case "hi": return "hi-IN";
		case "ur": return "ur-PK";
		case "ar": return "ar-SA";
		case "hinglish": return "en-IN";
		default: return "en-US";
	}
}
function playStoryQuranVerse(ref, onStatus) {
	const match = /(\d+)\s*:\s*(\d+)/.exec(ref.surahRef);
	if (match) {
		const surahNumber = Number(match[1]);
		const ayahNumberInSurah = Number(match[2]);
		audioManager.playQariRecitationAyah({
			id: `story-quran-${ref.globalAyahNumber}`,
			surahNumber,
			ayahNumberInSurah,
			globalAyahNumber: ref.globalAyahNumber,
			reciterName: "Mishary Rashid Alafasy",
			onError: (msg) => onStatus?.(msg)
		}).then((res) => {
			if (res.ok) onStatus?.(`Reciting ${ref.surahRef} — Sheikh Mishary Rashid Alafasy`);
		});
		return;
	}
	const isOffline = typeof navigator !== "undefined" && navigator.onLine === false;
	const url = isOffline ? void 0 : `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ref.globalAyahNumber}.mp3`;
	audioManager.playAudioUrl({
		id: `story-quran-${ref.globalAyahNumber}`,
		url,
		allowTtsFallback: false,
		offlineUnavailableMessage: "Quran Ayah audio is not downloaded yet. Connect to internet or download the Surah in Storage Hub.",
		rate: .95,
		onError: (msg) => onStatus?.(msg)
	});
	if (!isOffline) onStatus?.(`Reciting ${ref.surahRef} — Sheikh Mishary Rashid Alafasy`);
}
// src/services/interactiveStorybookEngine.ts
function getCategoryMoralChoice(story, lang) {
	const isHinglish = lang === "hinglish" || lang === "hi";
	const category = story.category;
	if (category === "Honesty" || category === "Truthfulness") return {
		question: isHinglish ? "Socho: Agar tumse galti se koi cheez toot jaye aur koi dekh nahi raha ho, toh tum kya karoge?" : "What would you do if you accidentally broke something when nobody was watching?",
		options: [{
			label: isHinglish ? "Sach bol do aur maafi maang lo — Allah hamesha dekh raha hai" : "Tell the truth honestly and apologize — Allah always sees us",
			isBestChoice: true,
			feedback: isHinglish ? "MashaAllah! Sachai aur amanat par Allah bahut khush hote hain aur dil sukoon se bhar jata hai." : "MashaAllah! Honesty pleases Allah and builds real courage and trust."
		}, {
			label: isHinglish ? "Chhupa do aur kisi aur par ilzaam laga do" : "Hide it quickly and blame someone else",
			isBestChoice: false,
			feedback: isHinglish ? "Jhooth bolne se chhoti galti badi ban jati hai. Allah sach bolne walon ka saath deta hai!" : "Hiding the truth turns a small mistake into a bigger worry. Try choosing honesty!"
		}]
	};
	if (category === "Kindness" || category === "Animals" || category === "Helping") return {
		question: isHinglish ? "Socho: Agar raaste mein koi pyaasa parinda ya pareshan dost mile, toh sabse pehle kya karoge?" : "If you see a thirsty animal or a friend struggling nearby, what will you choose?",
		options: [{
			label: isHinglish ? "Ruk kar madad karo aur pyaar se pesh aao — yeh Sadaqah hai" : "Pause to help gently with kindness — every act of mercy is Sadaqah",
			isBestChoice: true,
			feedback: isHinglish ? "SubhanAllah! Allah un logon par reham karta hai jo doosron par reham karte hain." : "SubhanAllah! Allah shows mercy to those who are merciful to every creature."
		}, {
			label: isHinglish ? "Nazar-andaaz karke apne khel mein lag jao" : "Ignore them and keep playing right away",
			isBestChoice: false,
			feedback: isHinglish ? "Thoda waqt nikaal kar madad karne se khel se bhi zyada khushi aur sawab milta hai!" : "Taking a moment to help brings far more joy and reward from Allah."
		}]
	};
	if (category === "Parents" || category === "Manners") return {
		question: isHinglish ? "Socho: Jab Ammi ya Abbu aapko kisi kaam ke liye bulayein jab aap khel rahe hon, toh aap kya karoge?" : "When your parents call you while you are busy playing, how should you respond?",
		options: [{
			label: isHinglish ? "Muskurakar foran \"Ji Ammi / Ji Abbu\" bol kar suno" : "Smile, reply gently right away, and help with love",
			isBestChoice: true,
			feedback: isHinglish ? "MashaAllah! Maa-baap ki izzat aur narmi se baat karna Allah ko sabse zyada pasand hai." : "MashaAllah! Speaking gently and obeying parents brings great barakah into our home."
		}, {
			label: isHinglish ? "Gusse se bolo \"Abhi nahi, baad mein!\"" : "Complain loudly and say \"Not right now!\"",
			isBestChoice: false,
			feedback: isHinglish ? "Quran humein sikhata hai ki parents se hamesha narmi aur adab se baat karni chahiye." : "The Quran teaches us to speak to our parents with gentleness and respect."
		}]
	};
	if (category === "Patience" || category === "Gratitude") return {
		question: isHinglish ? "Socho: Jab koi kaam mushkil lage ya cheez aapki marzi se na ho, toh sabse achha jawab kya hai?" : "When something feels difficult or does not go your way, what helps the most?",
		options: [{
			label: isHinglish ? "Sabr karo, \"Alhamdulillah\" kaho aur Allah se dua maango" : "Stay patient, say \"Alhamdulillah\", and ask Allah for help in Dua",
			isBestChoice: true,
			feedback: isHinglish ? "MashaAllah! Sabr aur shukr karne walon ke saath Allah hamesha hota hai." : "MashaAllah! Allah is always with the patient and increases blessings for the grateful."
		}, {
			label: isHinglish ? "Himmat haar kar gussa karo aur shikayat karo" : "Give up right away and complain angrily",
			isBestChoice: false,
			feedback: isHinglish ? "Gusse se mushkil kam nahi hoti — ek gehri saans lo, Bismillah kaho, aur dobara koshish karo!" : "Anger never solves a challenge — take a calm breath, make Dua, and try again with patience."
		}]
	};
	return {
		question: isHinglish ? "Socho: Is kisse se seekh kar aaj aap apni zindagi mein kaunsa nek kaam karoge?" : "Inspired by this story, which choice reflects the best Islamic character today?",
		options: [{
			label: isHinglish ? "Allah par bharosa rakhna, sabr karna aur doosron ke kaam aana" : "Trust Allah, stay steadfast in goodness, and help someone around me",
			isBestChoice: true,
			feedback: isHinglish ? "MashaAllah! Ambiya aur Sahaba ke kisse humein rozana nek amal karne ki himmat dete hain." : "MashaAllah! Stories of the Prophets and Companions guide us to live with courage and kindness."
		}, {
			label: isHinglish ? "Sirf kahani sun kar bhool jana" : "Just finish reading without practicing the lesson",
			isBestChoice: false,
			feedback: isHinglish ? "Asli maza tab hai jab hum ek chhota sa achha amal aaj hi practice karein!" : "A story shines brightest when we put even one small good deed into action today!"
		}]
	};
}
/**
* Expands any KidsStoryItem into a rich 6-Scene Interactive Storybook while preserving
* 100% compatibility with existing localizedPages and offline Studio Voice caching.
*/
function buildInteractiveStorybook(story, lang = "en") {
	const isHinglish = lang === "hinglish" || lang === "hi";
	const rawPages = story.localizedPages?.[lang] || story.pages || [];
	const summary = story.localizedSummaries?.[lang] || story.summary;
	const objective = story.localizedObjectives?.[lang] || story.learningObjective || "Grow closer to Allah with strong character and kindness.";
	const moral = story.localizedMorals?.[lang] || story.moral;
	const reflection = story.localizedReflectionActivities?.[lang] || story.reflectionActivity || `Share the lesson of "${story.localizedTitles?.[lang] || story.title}" with your parents today.`;
	const p0 = rawPages[0] || summary;
	const p1 = rawPages[1] || rawPages[0] || summary;
	const p2 = rawPages[2] || rawPages[rawPages.length - 1] || moral;
	const coverImg = getStoryCoverArtwork(story);
	const sceneImg2 = getStorySceneArtwork(story, 1);
	const sceneImg3 = getStorySceneArtwork(story, 2);
	const sceneImg4 = getStorySceneArtwork(story, 3);
	const sceneImg5 = getStorySceneArtwork(story, 4);
	const scenes = [
		{
			sceneIndex: 0,
			sceneLabel: isHinglish ? "Scene 1 · Shuruaat" : "Scene 1 · Opening",
			chapterTitle: isHinglish ? "Kahani Ki Shuruaat" : "Setting the Scene",
			illustrationUrl: coverImg,
			imageFocalClass: "object-center",
			narrationParagraphs: [p0, summary !== p0 ? summary : objective],
			calloutBadge: isHinglish ? "Aaj Kya Seekhenge" : "Today’s Discovery",
			calloutText: objective
		},
		{
			sceneIndex: 1,
			sceneLabel: isHinglish ? "Scene 2 · Safar" : "Scene 2 · The Journey",
			chapterTitle: isHinglish ? "Imtihan Aur Koshish" : "Walking Through the Test",
			illustrationUrl: sceneImg2,
			imageFocalClass: "object-left-top",
			narrationParagraphs: [p1, isHinglish ? "Gaur se sochiye: mushkil waqt mein bhi sahi raasta chunna asli bahaduri hoti hai." : "Pause and imagine being right there — choosing what pleases Allah takes real courage."]
		},
		{
			sceneIndex: 2,
			sceneLabel: isHinglish ? "Scene 3 · Aapka Faisla" : "Scene 3 · Your Choice",
			chapterTitle: isHinglish ? "Agar Aap Wahan Hote?" : "What Would You Do?",
			illustrationUrl: sceneImg3,
			imageFocalClass: "object-right-bottom",
			narrationParagraphs: [isHinglish ? "Kahani ke is mod par, ek pal ruk kar apna faisla chuniye:" : "At this turning point in the story, pause and choose what you would do:"],
			interactiveChoice: getCategoryMoralChoice(story, lang)
		},
		{
			sceneIndex: 3,
			sceneLabel: isHinglish ? "Scene 4 · Khaas Mod" : "Scene 4 · Turning Point",
			chapterTitle: isHinglish ? "Allah Ki Madad Aur Anjaam" : "Allah’s Guidance Shines",
			illustrationUrl: sceneImg4,
			imageFocalClass: "object-center",
			narrationParagraphs: [p2],
			calloutBadge: story.sourceReference ? "Authentic Source" : "Story Wisdom",
			calloutText: story.sourceReference ? `${story.authenticityLabel || "Verified Source"} — ${story.sourceReference}` : moral
		},
		{
			sceneIndex: 4,
			sceneLabel: isHinglish ? "Scene 5 · Aaj Ka Amal" : "Scene 5 · Action Challenge",
			chapterTitle: isHinglish ? "Dil Ki Baat & Sunnah Challenge" : "Heart Lesson & Sunnah Action",
			illustrationUrl: sceneImg5,
			imageFocalClass: "object-bottom",
			narrationParagraphs: [moral, reflection],
			calloutBadge: isHinglish ? "Family Talk Prompt" : "Talk With Parents",
			calloutText: isHinglish ? "Raat ke khane par Ammi ya Abbu ko is kahani ka sabse achha hissa sunaiye!" : "Tell your parents your favorite moment from this story at dinner tonight!"
		},
		{
			sceneIndex: 5,
			sceneLabel: isHinglish ? "Scene 6 · Quiz & Star" : "Scene 6 · Quiz & Reward",
			chapterTitle: isHinglish ? "Kahani Quiz & Waada" : "Story Check & Sunnah Promise",
			illustrationUrl: coverImg,
			imageFocalClass: "object-center",
			narrationParagraphs: [isHinglish ? "Shabash! Aapne poori kahani dhyaan se padh li. Neeche diye gaye sawaal ka jawab dein aur +5 ★ jeetein!" : "Well done! You explored every scene of the story. Answer the quick check below to earn +5 ★!"],
			isFinalQuizScene: true
		}
	];
	return {
		storyId: story.id,
		estimatedMinutes: 4,
		totalScenes: scenes.length,
		scenes
	};
}
// src/components/kids/KidsWorldView.tsx
var KIDS_SURAH_OPTIONS = [...JUZ_AMMA_37_SURAHS.slice().reverse().map((s) => ({
	number: s.surahNumber,
	title: `${s.surahNumber}. Surah ${s.meta.nameTranslit} (${s.meta.ayahCount} Ayahs)`
}))];
var KidsWorldView = () => {
	const { kidsRoute, setKidsRoute, setMode, activeChild, childrenProfiles, setActiveChildId, completeKidsQuestStep, completeKidsStory, addNeedsPracticeItem, resolveNeedsPracticeItem, submitKidsGoodDeed, recordQuizAttempt, learningEvents, isAudioMuted, toggleAudioMute, registerSubScreenBackHandler, isKidsScreenTimeLocked, unlockKidsScreenTime, unlockKidsScreenTimeAsync, redeemParentTimeVoucherAsync, resetParentPinWithRecoveryCode, resetParentPinWithRecoveryCodeAsync, user, updateUser, resolvedTheme } = useIlmizo();
	const audioState = useAudioManager();
	const { t, resolveText, isRTL } = useTranslation();
	const { feedback: kidsSwipeFeedback, swipeHandlers: kidsSwipeHandlers } = useSwipeNavigation({
		routes: KIDS_ROUTE_ORDER,
		activeRoute: kidsRoute,
		onSelectRoute: setKidsRoute,
		isRTL
	});
	const [kidsToast, setKidsToast] = (0, import_react.useState)(null);
	const showKidsToast = (msg) => {
		setKidsToast(msg);
		window.setTimeout(() => {
			setKidsToast((prev) => prev === msg ? null : prev);
		}, 2600);
	};
	const [lockPinDigits, setLockPinDigits] = (0, import_react.useState)("");
	const [lockUnlockAction, setLockUnlockAction] = (0, import_react.useState)("grant_10m");
	const [lockErrorMsg, setLockErrorMsg] = (0, import_react.useState)(null);
	const [showLockRecovery, setShowLockRecovery] = (0, import_react.useState)(false);
	const [lockRecoveryCodeInput, setLockRecoveryCodeInput] = (0, import_react.useState)("");
	const [lockRecoveryNewPin, setLockRecoveryNewPin] = (0, import_react.useState)("");
	const [lockRecoveryMsg, setLockRecoveryMsg] = (0, import_react.useState)(null);
	const [showLockVoucher, setShowLockVoucher] = (0, import_react.useState)(false);
	const [lockVoucherInput, setLockVoucherInput] = (0, import_react.useState)("");
	const [lockVoucherMsg, setLockVoucherMsg] = (0, import_react.useState)(null);
	const [kidsSurahNum, setKidsSurahNum] = (0, import_react.useState)(112);
	const [kidsAyahIdx, setKidsAyahIdx] = (0, import_react.useState)(0);
	const [quranModeTab, setQuranModeTab] = (0, import_react.useState)("Learn");
	const [playbackSpeed, setPlaybackSpeed] = (0, import_react.useState)(1);
	const [wordPracticeAnswered, setWordPracticeAnswered] = (0, import_react.useState)(null);
	const prefersReducedMotion = useReducedMotion();
	const isPlayingKidsAudio = audioState.status === "playing" || audioState.status === "loading";
	const [isRecordingMic, setIsRecordingMic] = (0, import_react.useState)(false);
	const [micDone, setMicDone] = (0, import_react.useState)(false);
	const [recordedAudioUrl, setRecordedAudioUrl] = (0, import_react.useState)(null);
	const [recognizedArabic, setRecognizedArabic] = (0, import_react.useState)("");
	const [speechMatchScore, setSpeechMatchScore] = (0, import_react.useState)(null);
	const [voiceBands, setVoiceBands] = (0, import_react.useState)([
		8,
		16,
		24,
		14,
		28,
		20,
		12,
		26,
		18,
		10,
		22,
		14,
		8
	]);
	const [voiceAssessment, setVoiceAssessment] = (0, import_react.useState)(null);
	const [micPermissionError, setMicPermissionError] = (0, import_react.useState)(null);
	const [recitationSelfRating, setRecitationSelfRating] = (0, import_react.useState)(null);
	const [ayaanTapCheer, setAyaanTapCheer] = (0, import_react.useState)(null);
	const hasSpeechRecognition = import_react.useMemo(() => supportsArabicSpeechRecognition(), []);
	const mediaRecorderRef = (0, import_react.useRef)(null);
	const mediaStreamRef = (0, import_react.useRef)(null);
	const speechRecRef = (0, import_react.useRef)(null);
	const audioChunksRef = (0, import_react.useRef)([]);
	const audioCtxRef = (0, import_react.useRef)(null);
	const analyserRef = (0, import_react.useRef)(null);
	const rafIdRef = (0, import_react.useRef)(null);
	const rmsSamplesRef = (0, import_react.useRef)([]);
	const recordingStartRef = (0, import_react.useRef)(0);
	const recordedAudioBlobRef = (0, import_react.useRef)(null);
	const [hasRecordedBlob, setHasRecordedBlob] = (0, import_react.useState)(false);
	const [aiTajweedLoading, setAiTajweedLoading] = (0, import_react.useState)(false);
	const [aiTajweedError, setAiTajweedError] = (0, import_react.useState)(null);
	const [aiTajweedResult, setAiTajweedResult] = (0, import_react.useState)(null);
	const [kidsDuaIdx, setKidsDuaIdx] = (0, import_react.useState)(0);
	const [duaPracticeMode, setDuaPracticeMode] = (0, import_react.useState)("card");
	const [duaQuizPicked, setDuaQuizPicked] = (0, import_react.useState)(null);
	const [salahStepIdx, setSalahStepIdx] = (0, import_react.useState)(0);
	const [salahQuizPicked, setSalahQuizPicked] = (0, import_react.useState)(null);
	const [storyCat, setStoryCat] = (0, import_react.useState)("All");
	const [activeStoryId, setActiveStoryId] = (0, import_react.useState)(null);
	const [storyPageIdx, setStoryPageIdx] = (0, import_react.useState)(0);
	const [storyMoralChecked, setStoryMoralChecked] = (0, import_react.useState)(false);
	const [storyChoicePicked, setStoryChoicePicked] = (0, import_react.useState)(null);
	const [storySpeed, setStorySpeed] = (0, import_react.useState)(.85);
	const [storyActiveSentenceIdx, setStoryActiveSentenceIdx] = (0, import_react.useState)(null);
	const [storyQuizPicked, setStoryQuizPicked] = (0, import_react.useState)(null);
	const [storyVoiceMode, setStoryVoiceMode] = (0, import_react.useState)("studio");
	const [storyVoicePersona, setStoryVoicePersona] = (0, import_react.useState)("storyteller");
	const [loadingStudioStoryAudio, setLoadingStudioStoryAudio] = (0, import_react.useState)(false);
	const [studioOfflineNotice, setStudioOfflineNotice] = (0, import_react.useState)(null);
	const [storyLibrarySummary, setStoryLibrarySummary] = (0, import_react.useState)({
		totalStories: KIDS_STORIES.length,
		totalPages: KIDS_STORIES.reduce((sum, s) => sum + (s.localizedPages?.[user.language]?.length ?? s.pages.length), 0),
		cachedStoriesCount: 0,
		partiallyCachedStoriesCount: 0,
		cachedPagesCount: 0,
		totalBytes: 0,
		storyStatusMap: {}
	});
	const [prefetchState, setPrefetchState] = (0, import_react.useState)(() => storyAudioPrefetchManager.getState());
	const studioStoryBlobUrlRef = (0, import_react.useRef)(null);
	const [storyCelebration, setStoryCelebration] = (0, import_react.useState)({
		visible: false,
		title: "",
		subtitle: ""
	});
	const storyNarrationTokenRef = (0, import_react.useRef)(0);
	const [customStoryVoiceUrl, setCustomStoryVoiceUrl] = (0, import_react.useState)(null);
	const [customStoryVoiceDuration, setCustomStoryVoiceDuration] = (0, import_react.useState)(0);
	const [isRecordingStoryVoice, setIsRecordingStoryVoice] = (0, import_react.useState)(false);
	const storyVoiceRecorderRef = (0, import_react.useRef)(null);
	const storyVoiceStreamRef = (0, import_react.useRef)(null);
	const storyVoiceChunksRef = (0, import_react.useRef)([]);
	const storyVoiceStartRef = (0, import_react.useRef)(0);
	const customStoryVoiceUrlRef = (0, import_react.useRef)(null);
	const refreshStoryLibrarySummary = import_react.useCallback(() => {
		getStoryLibraryCacheSummary({
			stories: KIDS_STORIES,
			language: user.language,
			voiceStyle: storyVoicePersona
		}).then((summary) => {
			setStoryLibrarySummary(summary);
		});
	}, [user.language, storyVoicePersona]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = storyAudioPrefetchManager.subscribe((nextState) => {
			setPrefetchState(nextState);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		refreshStoryLibrarySummary();
	}, [
		refreshStoryLibrarySummary,
		prefetchState.completedTasks,
		prefetchState.status,
		activeStoryId,
		storyPageIdx
	]);
	(0, import_react.useEffect)(() => {
		setStudioOfflineNotice(null);
	}, [
		activeStoryId,
		storyPageIdx,
		storyVoiceMode,
		storyVoicePersona
	]);
	(0, import_react.useEffect)(() => {
		if (kidsRoute !== "stories") return;
		if (!activeStoryId) {
			const featuredFirst = [...TOP_FEATURED_STORY_IDS.map((id) => KIDS_STORIES.find((s) => s.id === id)).filter((s) => Boolean(s)), ...KIDS_STORIES.filter((s) => !TOP_FEATURED_STORY_IDS.includes(s.id))];
			return scheduleStarterStoriesWarmup({
				stories: featuredFirst,
				language: user.language,
				voiceStyle: storyVoicePersona,
				count: 10,
				onCachedUpdated: refreshStoryLibrarySummary
			});
		}
		return scheduleStoryReaderLookahead({
			stories: KIDS_STORIES,
			currentStoryId: activeStoryId,
			currentPageIndex: storyPageIdx,
			language: user.language,
			voiceStyle: storyVoicePersona,
			onCachedUpdated: refreshStoryLibrarySummary
		});
	}, [
		kidsRoute,
		activeStoryId,
		storyPageIdx,
		user.language,
		storyVoicePersona,
		refreshStoryLibrarySummary
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			storyAudioPrefetchManager.cancelPrefetch();
			if (studioStoryBlobUrlRef.current) {
				try {
					URL.revokeObjectURL(studioStoryBlobUrlRef.current);
				} catch {}
				studioStoryBlobUrlRef.current = null;
			}
		};
	}, []);
	const stopActiveStoryVoiceCapture = (discard) => {
		const rec = storyVoiceRecorderRef.current;
		if (rec && rec.state !== "inactive") {
			if (discard) rec.onstop = null;
			try {
				rec.stop();
			} catch {}
		}
		storyVoiceRecorderRef.current = null;
		if (storyVoiceStreamRef.current) {
			storyVoiceStreamRef.current.getTracks().forEach((tr) => tr.stop());
			storyVoiceStreamRef.current = null;
		}
		setIsRecordingStoryVoice(false);
	};
	(0, import_react.useEffect)(() => {
		let active = true;
		stopActiveStoryVoiceCapture(true);
		if (customStoryVoiceUrlRef.current) {
			URL.revokeObjectURL(customStoryVoiceUrlRef.current);
			customStoryVoiceUrlRef.current = null;
		}
		setCustomStoryVoiceUrl(null);
		setCustomStoryVoiceDuration(0);
		if (!activeStoryId) return () => {
			active = false;
		};
		getStoryVoiceRecording(activeStoryId, storyPageIdx).then((rec) => {
			if (!active || !rec?.blob) return;
			const objUrl = URL.createObjectURL(rec.blob);
			customStoryVoiceUrlRef.current = objUrl;
			setCustomStoryVoiceUrl(objUrl);
			setCustomStoryVoiceDuration(rec.durationSec || 1);
		});
		return () => {
			active = false;
			stopActiveStoryVoiceCapture(true);
			if (customStoryVoiceUrlRef.current) {
				URL.revokeObjectURL(customStoryVoiceUrlRef.current);
				customStoryVoiceUrlRef.current = null;
			}
		};
	}, [activeStoryId, storyPageIdx]);
	const [kidsPaywallOpen, setKidsPaywallOpen] = (0, import_react.useState)(false);
	const [kidsPaywallReason, setKidsPaywallReason] = (0, import_react.useState)(void 0);
	const openKidsPaywall = (reason) => {
		setKidsPaywallReason(reason);
		setKidsPaywallOpen(true);
	};
	const [selectedIslandNum, setSelectedIslandNum] = (0, import_react.useState)(null);
	const [quizQIdx, setQuizQIdx] = (0, import_react.useState)(0);
	const [quizSelected, setQuizSelected] = (0, import_react.useState)(null);
	const [kidsQuizScore, setKidsQuizScore] = (0, import_react.useState)(0);
	const [selectedDeedIdx, setSelectedDeedIdx] = (0, import_react.useState)(0);
	const [selectedFamilyIdx, setSelectedFamilyIdx] = (0, import_react.useState)(0);
	const [progressRange, setProgressRange] = (0, import_react.useState)("Week");
	const [badgeTab, setBadgeTab] = (0, import_react.useState)("Badges");
	const [selectedBadgeId, setSelectedBadgeId] = (0, import_react.useState)(null);
	const [certAchievementIdx, setCertAchievementIdx] = (0, import_react.useState)(0);
	const [showQuranGarden, setShowQuranGarden] = (0, import_react.useState)(false);
	const [kidsSleepSheetOpen, setKidsSleepSheetOpen] = (0, import_react.useState)(false);
	const [dynamicKidsAyahs, setDynamicKidsAyahs] = (0, import_react.useState)({});
	const [practicedAyahsBySurah, setPracticedAyahsBySurah] = (0, import_react.useState)({});
	const practicedAyahsBySurahRef = (0, import_react.useRef)({});
	import_react.useEffect(() => {
		if (BUNDLED_SURAH_AYAHS[kidsSurahNum] || dynamicKidsAyahs[kidsSurahNum]) return;
		let active = true;
		getSurahPayload(kidsSurahNum, user.language, user.reciterName).then((payload) => {
			if (active && payload.ayahs.length > 0) setDynamicKidsAyahs((prev) => ({
				...prev,
				[kidsSurahNum]: payload.ayahs
			}));
		}).catch(() => {});
		return () => {
			active = false;
		};
	}, [
		kidsSurahNum,
		user.language,
		user.reciterName,
		dynamicKidsAyahs
	]);
	const kidsSurahAyahs = BUNDLED_SURAH_AYAHS[kidsSurahNum] || dynamicKidsAyahs[kidsSurahNum] || BUNDLED_SURAH_AYAHS[112];
	const currentKidsAyah = kidsSurahAyahs[kidsAyahIdx] || kidsSurahAyahs[0];
	const currentSurahMeta = ALL_114_SURAHS.find((s) => s.number === kidsSurahNum) || ALL_114_SURAHS[111];
	const stopRecordingPractice = import_react.useCallback(() => {
		setIsRecordingMic(false);
		if (rafIdRef.current !== null) {
			cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = null;
		}
		if (recordingStartRef.current > 0) {
			const durationMs = Date.now() - recordingStartRef.current;
			recordingStartRef.current = 0;
			const assessment = assessVoiceActivityMetrics(rmsSamplesRef.current, durationMs);
			setVoiceAssessment(assessment);
		}
		setVoiceBands([
			8,
			16,
			24,
			14,
			28,
			20,
			12,
			26,
			18,
			10,
			22,
			14,
			8
		]);
		if (audioCtxRef.current) {
			try {
				audioCtxRef.current.close();
			} catch {}
			audioCtxRef.current = null;
		}
		analyserRef.current = null;
		if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") try {
			mediaRecorderRef.current.stop();
		} catch {}
		if (mediaStreamRef.current) {
			mediaStreamRef.current.getTracks().forEach((track) => track.stop());
			mediaStreamRef.current = null;
		}
		if (speechRecRef.current) {
			try {
				speechRecRef.current.stop();
			} catch {}
			speechRecRef.current = null;
		}
	}, []);
	import_react.useEffect(() => {
		const unregister = audioManager.registerExternalCleanup(stopRecordingPractice);
		return () => {
			unregister();
			stopRecordingPractice();
		};
	}, [stopRecordingPractice]);
	import_react.useEffect(() => {
		if (isKidsScreenTimeLocked) {
			stopRecordingPractice();
			audioManager.stopAll();
		}
	}, [isKidsScreenTimeLocked, stopRecordingPractice]);
	import_react.useEffect(() => {
		if (kidsRoute !== "stories" || !activeStoryId) {
			registerSubScreenBackHandler(null);
			return;
		}
		registerSubScreenBackHandler(() => {
			audioManager.stopAll();
			setActiveStoryId(null);
			setStoryMoralChecked(false);
			return true;
		});
		return () => registerSubScreenBackHandler(null);
	}, [
		kidsRoute,
		activeStoryId,
		registerSubScreenBackHandler
	]);
	const speakArabic = (text, audioUrl, trackId, _title) => {
		if (isAudioMuted) {
			showKidsToast("Sound is muted. Tap Sound to unmute.");
			return;
		}
		audioManager.setPlaybackRate(playbackSpeed);
		if (audioUrl) {
			audioManager.playAudioUrl({
				id: trackId || `kids-arabic-${kidsSurahNum}-${kidsAyahIdx}`,
				url: audioUrl,
				fallbackText: text,
				fallbackLang: "ar-SA",
				rate: playbackSpeed
			});
			return;
		}
		audioManager.speakText({
			id: trackId || `kids-arabic-tts-${text.slice(0, 16)}`,
			text,
			lang: "ar-SA",
			rate: playbackSpeed
		});
	};
	const markKidsAyahPracticed = (ayahNumberInSurah) => {
		const prevPracticed = practicedAyahsBySurahRef.current[kidsSurahNum] || [];
		const nextPracticed = prevPracticed.includes(ayahNumberInSurah) ? prevPracticed : [...prevPracticed, ayahNumberInSurah];
		practicedAyahsBySurahRef.current = {
			...practicedAyahsBySurahRef.current,
			[kidsSurahNum]: nextPracticed
		};
		setPracticedAyahsBySurah((prev) => ({
			...prev,
			[kidsSurahNum]: nextPracticed
		}));
		const isSurahFullyPracticed = canMarkKidsSurahCompleted({
			surahNumber: kidsSurahNum,
			practicedAyahNumbers: nextPracticed
		}).eligible;
		completeKidsQuestStep("quran", `${currentSurahMeta.nameTranslit} Ayah ${ayahNumberInSurah}`, isSurahFullyPracticed ? currentSurahMeta.nameTranslit : void 0);
	};
	const { isAyahHighlighted: isKidsAyahHighlighted, registerAyahElement: registerKidsAyahElement } = useQuranAudioSync({
		surahNumber: kidsSurahNum,
		ayahs: kidsSurahAyahs,
		activeAyahIdx: kidsAyahIdx,
		onAyahIndexChange: setKidsAyahIdx,
		onVerseAdvance: markKidsAyahPracticed,
		enabled: kidsRoute === "quran_learning",
		enableHaptics: true,
		autoScroll: true
	});
	const playKidsSurahContinuous = () => {
		if (isAudioMuted) {
			showKidsToast("Sound is muted. Tap Sound to unmute.");
			return;
		}
		audioManager.setPlaybackRate(playbackSpeed);
		markKidsAyahPracticed(currentKidsAyah.numberInSurah);
		audioManager.playFullSurah({
			surahNumber: kidsSurahNum,
			startFromAyah: currentKidsAyah.numberInSurah,
			reciterName: user.reciterName,
			rate: playbackSpeed,
			repeatOption: 1,
			onAyahChange: (_sNum, nextAyahNum) => {
				const nextIdx = kidsSurahAyahs.findIndex((a) => a.numberInSurah === nextAyahNum);
				if (nextIdx >= 0) setKidsAyahIdx(nextIdx);
			},
			onSequenceComplete: () => {
				showKidsToast(`MashaAllah! Finished ${currentSurahMeta.nameTranslit}`);
			},
			onError: (msg) => showKidsToast(msg)
		});
	};
	const speakEnglishText = (text, trackId, _title) => {
		if (isAudioMuted) {
			showKidsToast("Sound is muted. Tap Sound to unmute.");
			return;
		}
		audioManager.speakText({
			id: trackId || `kids-en-${text.slice(0, 20)}`,
			text,
			lang: "en-US",
			rate: .95
		});
	};
	const handleToggleMicRecording = async () => {
		if (isRecordingMic) {
			setMicDone(true);
			stopRecordingPractice();
			return;
		}
		audioManager.stopAll();
		setRecitationSelfRating(null);
		setRecognizedArabic("");
		setSpeechMatchScore(null);
		setVoiceAssessment(null);
		setMicPermissionError(null);
		setAiTajweedError(null);
		setAiTajweedResult(null);
		recordedAudioBlobRef.current = null;
		setHasRecordedBlob(false);
		if (recordedAudioUrl) {
			try {
				URL.revokeObjectURL(recordedAudioUrl);
			} catch {}
			setRecordedAudioUrl(null);
		}
		rmsSamplesRef.current = [];
		recordingStartRef.current = Date.now();
		setIsRecordingMic(true);
		setMicDone(false);
		const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (SpeechRecognitionCtor) try {
			const recognition = new SpeechRecognitionCtor();
			recognition.lang = "ar-SA";
			recognition.interimResults = true;
			recognition.continuous = false;
			recognition.onresult = (event) => {
				const transcript = Array.from(event.results).map((r) => r[0]?.transcript || "").join(" ");
				setRecognizedArabic(transcript);
				const matchResult = scoreKidsArabicRecitationMatch(currentKidsAyah.arabicUthmani, transcript);
				if (matchResult.totalWords > 0 && transcript.trim().length > 0) setSpeechMatchScore(matchResult.percentage);
			};
			recognition.start();
			speechRecRef.current = recognition;
		} catch {}
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaStreamRef.current = stream;
			const AudioCtx = window.AudioContext || window.webkitAudioContext;
			if (AudioCtx) try {
				const audioCtx = new AudioCtx();
				audioCtxRef.current = audioCtx;
				const source = audioCtx.createMediaStreamSource(stream);
				const analyser = audioCtx.createAnalyser();
				analyser.fftSize = 256;
				source.connect(analyser);
				analyserRef.current = analyser;
				const timeDomain = new Uint8Array(analyser.fftSize);
				const freqData = new Uint8Array(analyser.frequencyBinCount);
				const tickMeter = () => {
					if (!analyserRef.current) return;
					analyserRef.current.getByteTimeDomainData(timeDomain);
					let sumSq = 0;
					for (let i = 0; i < timeDomain.length; i++) {
						const centered = (timeDomain[i] - 128) / 128;
						sumSq += centered * centered;
					}
					const rms = Math.sqrt(sumSq / timeDomain.length);
					rmsSamplesRef.current.push(rms);
					analyserRef.current.getByteFrequencyData(freqData);
					const step = Math.max(1, Math.floor(freqData.length / 13));
					const nextBands = Array.from({ length: 13 }, (_, idx) => {
						const binVal = freqData[Math.min(freqData.length - 1, idx * step)] || 0;
						return Math.max(6, Math.min(32, Math.round(6 + binVal / 255 * 26)));
					});
					setVoiceBands(nextBands);
					rafIdRef.current = requestAnimationFrame(tickMeter);
				};
				rafIdRef.current = requestAnimationFrame(tickMeter);
			} catch {}
			if (typeof MediaRecorder !== "undefined") {
				const recorder = new MediaRecorder(stream);
				audioChunksRef.current = [];
				recorder.ondataavailable = (ev) => {
					if (ev.data.size > 0) audioChunksRef.current.push(ev.data);
				};
				recorder.onstop = () => {
					const mimeType = recorder.mimeType || "audio/webm";
					const blob = new Blob(audioChunksRef.current, { type: mimeType });
					if (blob.size > 0) {
						recordedAudioBlobRef.current = blob;
						setHasRecordedBlob(true);
						const url = URL.createObjectURL(blob);
						setRecordedAudioUrl(url);
					}
					stream.getTracks().forEach((track) => track.stop());
				};
				mediaRecorderRef.current = recorder;
				recorder.start();
			}
		} catch {
			setMicPermissionError("Microphone permission was denied or unavailable on this device. Tap \"Listen to Qari\" to practice along aloud.");
			stopRecordingPractice();
		}
		else {
			setMicPermissionError("Microphone capture is not supported in this browser context. Tap \"Listen to Qari\" to practice along aloud.");
			stopRecordingPractice();
		}
	};
	const handleRunKidsAiTajweed = async () => {
		const blob = recordedAudioBlobRef.current;
		if (!blob || blob.size < 256) {
			showKidsToast("Record your recitation with the mic first!");
			return;
		}
		const todayKey = getLocalDateKeyWithOffset(0, /* @__PURE__ */ new Date());
		if (!canUseAiTajweedCheck(user, todayKey).allowed) {
			openKidsPaywall("You used all 2 Free daily AI Tajweed checks today. Upgrade to Adult Quran Plus (₹99/yr) or Family Plus (₹199/yr) for unlimited Harakat & Makhraj AI feedback!");
			return;
		}
		setAiTajweedLoading(true);
		setAiTajweedError(null);
		const res = await analyzeRecitationWithAiTajweed({
			audioBlob: blob,
			targetArabic: currentKidsAyah.arabicUthmani,
			targetTransliteration: currentKidsAyah.transliteration,
			uiLanguage: user.language,
			mode: "kids"
		});
		setAiTajweedLoading(false);
		if (res.ok && res.result) {
			updateUser(recordAiTajweedUsagePatch(user, todayKey));
			setAiTajweedResult(res.result);
			if (res.result.overallScore >= 80) playGentleCelebrationChime("star");
		} else setAiTajweedError(res.error || "AI Tajweed check unavailable.");
	};
	const triggerAyaanInteraction = (phrase) => {
		setAyaanTapCheer(phrase);
		speakEnglishText(phrase, "ayaan-cheer", "Ayaan Helper");
		window.setTimeout(() => {
			setAyaanTapCheer((prev) => prev === phrase ? null : prev);
		}, 2400);
	};
	const handleSwitchKidsSurah = (nextSurahNum) => {
		audioManager.stopAll();
		setKidsSurahNum(nextSurahNum);
		setKidsAyahIdx(0);
		setWordPracticeAnswered(null);
		setAiTajweedResult(null);
		setAiTajweedError(null);
		recordedAudioBlobRef.current = null;
		setHasRecordedBlob(false);
	};
	const handleDownloadCertificateSvg = (achievementTitle) => {
		const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560" viewBox="0 0 800 560">
      <rect width="800" height="560" rx="32" fill="#FFFDF7" stroke="#D4AF37" stroke-width="14"/>
      <rect x="28" y="28" width="744" height="504" rx="20" fill="none" stroke="#14532D" stroke-width="3" stroke-dasharray="8 6"/>
      <text x="400" y="95" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="800" fill="#14532D">iLMiZO KIDS</text>
      <text x="400" y="145" text-anchor="middle" font-family="serif" font-size="34" font-weight="bold" fill="#0F3826">Certificate of Achievement</text>
      <text x="400" y="195" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#64748B">This is to celebrate that</text>
      <text x="400" y="255" text-anchor="middle" font-family="sans-serif" font-size="44" font-weight="800" fill="#14532D">${activeChild.name}</text>
      <text x="400" y="300" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#64748B">has completed</text>
      <text x="400" y="350" text-anchor="middle" font-family="sans-serif" font-size="30" font-weight="800" fill="#0F172A">${achievementTitle}</text>
      <text x="400" y="405" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#475569">With effort, sincerity and love for Allah. May Allah increase you in knowledge and Iman.</text>
      <text x="400" y="475" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#B45309">Stars Earned: ${activeChild.stars} ★ · Verified Ilmizo Seal · ${(/* @__PURE__ */ new Date()).toLocaleDateString()}</text>
    </svg>`;
		const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `ilmizo-certificate-${activeChild.name.toLowerCase()}.svg`;
		a.click();
		URL.revokeObjectURL(url);
		showKidsToast(`Downloaded ${activeChild.name}'s Certificate!`);
	};
	const completedStepsCount = Object.values(activeChild.questStepsCompleted).filter(Boolean).length;
	const unresolvedPracticeItems = activeChild.needsPractice.filter((np) => !np.resolved);
	const getNextIncompleteQuestRoute = () => {
		if (!activeChild.questStepsCompleted.quran) return "quran_learning";
		if (!activeChild.questStepsCompleted.dua) return "duas_learning";
		if (!activeChild.questStepsCompleted.quiz) return "daily_quiz";
		if (!activeChild.questStepsCompleted.salah) return "salah_learning";
		if (!activeChild.questStepsCompleted.family) return "family_challenge";
		return "mission_complete";
	};
	const renderKidsScreen = () => {
		switch (kidsRoute) {
			case "kids_home": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pb-20 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-b-[32px] bg-[#0F3826] text-white shadow-lg h-56",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/illustrations/kids_home_banner.webp",
							alt: "Ayaan in Islamic Garden",
							decoding: "async",
							className: "absolute inset-0 w-full h-full object-cover object-center"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-[#0A2E1D]/90 via-[#0F3826]/45 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/50 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 h-full flex flex-col justify-between pb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, { light: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-4 flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "max-w-[70%] space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivingMascot, {
												character: activeChild.avatar,
												state: completedStepsCount >= 5 ? "celebrating" : inferAmbientMascotState(),
												size: "sm"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] font-extrabold text-amber-200 drop-shadow-xs",
												children: [t("greeting"), ","]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
												className: "text-2xl font-extrabold tracking-tight leading-none drop-shadow-sm",
												children: [activeChild.name, "!"]
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-white/95 pt-1 drop-shadow-xs",
											children: t("ready_for_adventure")
										}),
										childrenProfiles.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1 pt-1 flex-wrap",
											children: childrenProfiles.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setActiveChildId(c.id),
												className: `px-2.5 py-0.5 rounded-full text-[11px] font-extrabold transition ${c.id === activeChild.id ? "bg-amber-400 text-emerald-950 shadow-2xs" : "bg-black/40 text-white"}`,
												children: c.name
											}, c.id))
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setKidsRoute("badges"),
											"aria-label": `${activeChild.stars} Stars earned`,
											className: "min-h-[40px] px-3 py-1 rounded-2xl bg-black/45 border border-amber-300/60 backdrop-blur-xs flex items-center gap-1 text-amber-300 text-xs font-extrabold tabular-nums active:scale-95 transition",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3.5 h-3.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activeChild.stars })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setMode("parent"),
											"aria-label": "Open Parent Hub",
											title: "Parent Hub",
											className: "min-w-[40px] min-h-[40px] rounded-2xl bg-black/45 border border-white/25 backdrop-blur-xs flex items-center justify-center text-white hover:bg-black/60 active:scale-95 transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 text-amber-200" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setMode("adult"),
											"aria-label": "Switch to Adult Mode",
											title: "Switch to Adult Mode",
											className: "min-h-[40px] px-2.5 rounded-2xl bg-black/45 border border-white/25 backdrop-blur-xs text-[11px] font-extrabold text-emerald-100 hover:bg-black/60 active:scale-95 transition",
											children: "Adult"
										})
									]
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 -mt-5 relative z-20 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyTarbiyahPlanCard, {
							plan: buildDailyTarbiyahPlan({
								child: activeChild,
								language: user.language,
								dateKey: getLocalDateKeyWithOffset(0, /* @__PURE__ */ new Date()),
								hasFamilyPlus: isFamilyPlusActive(user)
							}),
							onLaunchStep: (step) => {
								if (step.targetRoute === "stories" && step.recommendedItemId) {
									setActiveStoryId(step.recommendedItemId);
									setStoryPageIdx(0);
									setStoryChoicePicked(null);
									setStoryQuizPicked(null);
									setStoryMoralChecked(false);
								}
								setKidsRoute(step.targetRoute);
							}
						}),
						showQuranGarden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuranGardenView, {
							child: activeChild,
							completedStoryCount: activeChild.completedStoryIds?.length || 0,
							practicedSurahCount: Object.keys(practicedAyahsBySurah).length,
							qaidaCompletedCount: activeChild.completedQaidaLessonIds?.length || 0,
							onClose: () => setShowQuranGarden(false),
							onOpenQuran: () => {
								setShowQuranGarden(false);
								setKidsRoute("quran_learning");
							}
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setShowQuranGarden(true),
							className: "w-full min-h-[68px] rounded-3xl bg-gradient-to-r from-[#14532D] to-[#1E6B3A] text-white p-4 shadow-xs flex items-center justify-between gap-3 text-left active:scale-[0.99] transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-amber-300",
										children: "Interactive Visual Garden"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-extrabold truncate",
										children: [
											"Visit ",
											activeChild.name,
											"’s Quran Garden"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-emerald-100/85 truncate",
										children: [activeChild.stars, " Jannah Stars growing trees, flowers & golden lanterns"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-h-[40px] px-3.5 rounded-2xl bg-amber-400 text-emerald-950 text-xs font-extrabold flex items-center shrink-0",
								children: "Open Garden"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 shadow-2xs flex items-center justify-between gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivingMascot, {
									character: "Mizo",
									state: unresolvedPracticeItems.length > 0 ? "encouraging" : "happy",
									size: "sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums",
										children: [
											t("todays_mission"),
											": ",
											completedStepsCount,
											"/5 Done"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-[var(--text-secondary)] truncate",
										children: unresolvedPracticeItems.length > 0 ? `${unresolvedPracticeItems.length} gentle review item(s) waiting` : "Tap to open Today’s Quest or log a Good Deed"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setKidsRoute(unresolvedPracticeItems.length > 0 ? "needs_practice" : "todays_quest"),
									className: "min-h-[44px] px-3.5 rounded-xl bg-[#14532D] dark:bg-emerald-600 text-white text-xs font-extrabold shrink-0",
									children: unresolvedPracticeItems.length > 0 ? "Review" : "Quest"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-extrabold text-[var(--text-primary)]",
									children: t("learn_and_explore")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setKidsRoute("adventure_map"),
									className: "text-xs font-bold text-[#14532D] dark:text-emerald-300",
									children: "See All"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2.5",
								children: [
									{
										title: t("quran"),
										sub: "Learn & Recite",
										route: "quran_learning",
										img: "/assets/illustrations/tile_kids_quran.webp"
									},
									{
										title: t("duas"),
										sub: "Daily Duas",
										route: "duas_learning",
										img: "/assets/illustrations/tile_kids_duas.webp"
									},
									{
										title: t("salah"),
										sub: "Learn & Practice",
										route: "salah_learning",
										img: "/assets/illustrations/tile_kids_salah.webp"
									},
									{
										title: t("stories"),
										sub: "Islamic Stories",
										route: "stories",
										img: "/assets/illustrations/tile_kids_stories.webp"
									}
								].map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setKidsRoute(card.route),
									className: "relative overflow-hidden rounded-2xl h-28 text-left shadow-sm border border-emerald-950/10 group",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: card.img,
											alt: card.title,
											loading: "lazy",
											decoding: "async",
											className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative z-10 h-full p-3 flex flex-col justify-end text-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-extrabold leading-tight",
												children: card.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-emerald-100",
												children: card.sub
											})]
										})
									]
								}, card.route))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 rounded-2xl bg-gradient-to-r from-[#0F3826] to-[#14532D] text-white p-3.5 flex items-center justify-between gap-3 shadow-sm border border-[#D4AF37]/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] font-extrabold uppercase tracking-wider text-amber-300 tabular-nums",
											children: [(activeChild.completedQaidaLessonIds || []).length, "/17 Lessons · Interactive Joiner"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-xs font-extrabold mt-0.5 truncate",
											children: "Complete Noorani Qaida Course"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-emerald-100/85 truncate",
											children: "Alphabet · Harakat · Joining · Madd & Certificate"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setKidsRoute("quran_learning"),
										className: "px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold min-h-[38px] transition",
										children: "Open Qaida"
									}), !isFamilyPlusActive(user) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => openKidsPaywall("Start your 7-Day Free Family Trial (then ₹199/yr · ~₹16/mo) to unlock all 17 Noorani Qaida lessons with Tracing, 49 multi-scene storybooks, and 5 child profiles!"),
										className: "px-2.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-amber-200 text-[11px] font-bold min-h-[38px]",
										children: "Plus"
									})]
								})]
							})
						] })
					]
				})]
			});
			case "todays_quest": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-b-[32px] bg-[#0F3826] text-white shadow-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
							time: "9:41",
							light: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 pt-1 pb-2 relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
									variant: "light",
									label: "Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-base font-extrabold",
										children: "Today’s Quest"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-amber-300 font-bold",
										children: "10-Minute Mission"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-11 h-11 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 text-xs font-extrabold tabular-nums",
									children: [completedStepsCount, "/5"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-44 w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/assets/illustrations/kids_quest_ayaan.webp",
									alt: "Ayaan Today's Quest",
									loading: "lazy",
									decoding: "async",
									className: "w-full h-full object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0F3826] via-transparent to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "absolute bottom-2.5 inset-x-4 text-center text-xs font-bold text-white drop-shadow-xs",
									children: "Let’s complete 5 activities today and grow closer to Allah!"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 pt-3.5 space-y-2.5",
					children: [[
						{
							key: "quran",
							title: "Quran",
							sub: "Read or listen",
							time: "3 min",
							route: "quran_learning",
							tint: "bg-emerald-100 text-emerald-800"
						},
						{
							key: "dua",
							title: "Dua",
							sub: "Learn a new dua",
							time: "2 min",
							route: "duas_learning",
							tint: "bg-amber-100 text-amber-800"
						},
						{
							key: "quiz",
							title: "Quiz",
							sub: "Answer a few questions",
							time: "2 min",
							route: "daily_quiz",
							tint: "bg-rose-100 text-rose-800"
						},
						{
							key: "salah",
							title: "Salah",
							sub: "Learn a simple step",
							time: "2 min",
							route: "salah_learning",
							tint: "bg-purple-100 text-purple-800"
						},
						{
							key: "family",
							title: "Family Challenge",
							sub: "Do a good deed",
							time: "1 min",
							route: "family_challenge",
							tint: "bg-orange-100 text-orange-800"
						}
					].map((step) => {
						const done = activeChild.questStepsCompleted[step.key];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setKidsRoute(step.route),
							className: "w-full rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-10 h-10 rounded-xl ${step.tint} flex items-center justify-center font-extrabold text-xs`,
									children: step.title[0]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-extrabold text-[var(--text-primary)]",
									children: step.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[var(--text-secondary)]",
									children: step.sub
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[var(--text-muted)] tabular-nums",
									children: step.time
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-6 h-6 rounded-full flex items-center justify-center ${done ? "bg-[#22C55E] text-white" : "border-2 border-[var(--border-strong)]"}`,
									children: done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 stroke-[3]" })
								})]
							})]
						}, step.key);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setKidsRoute(getNextIncompleteQuestRoute()),
						className: "w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md mt-2",
						children: completedStepsCount === 5 ? "View Mission Complete! ★" : `Continue Mission (${5 - completedStepsCount} left)`
					})]
				})]
			});
			case "quran_learning": {
				const arabicWords = currentKidsAyah.arabicUthmani.split(" ");
				const targetWord = arabicWords[arabicWords.length - 1] || arabicWords[0];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-3.5 shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
							time: "9:41",
							light: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 pt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
									variant: "light",
									label: "Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
										value: String(kidsSurahNum),
										onChange: (val) => handleSwitchKidsSurah(Number(val)),
										title: "Choose a Surah",
										subtitle: "Juz Amma Surahs for kids learning",
										ariaLabel: "Select Kids Surah",
										variant: "dark-pill",
										searchable: true,
										searchPlaceholder: "Search Juz Amma Surah…",
										className: "max-w-[200px]",
										options: KIDS_SURAH_OPTIONS.map((opt) => ({
											value: String(opt.number),
											label: opt.title
										}))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-amber-300 font-bold tabular-nums mt-1",
										children: [
											kidsAyahIdx + 1,
											" of ",
											kidsSurahAyahs.length,
											" Ayahs"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: toggleAudioMute,
										"aria-pressed": !isAudioMuted,
										className: `px-2.5 min-h-[38px] rounded-full flex items-center gap-1 text-[11px] font-extrabold border transition ${!isAudioMuted ? "bg-amber-400 text-emerald-950 border-amber-300 shadow-2xs" : "bg-rose-500/80 text-white border-rose-300/60"}`,
										children: [!isAudioMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: !isAudioMuted ? "Sound" : "Muted" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setKidsRoute("recitation_practice"),
										className: "w-9 h-9 rounded-full bg-white/15 text-amber-300 flex items-center justify-center",
										title: "Recite with Mic",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-4 h-4" })
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pt-3 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							ref: registerKidsAyahElement(currentKidsAyah.numberInSurah),
							"data-kids-ayah": currentKidsAyah.numberInSurah,
							className: `rounded-3xl bg-[#FFFDF7] dark:bg-[var(--bg-surface)] border border-[#D4AF37]/50 dark:border-amber-500/35 p-4 text-center shadow-md space-y-3.5 relative overflow-hidden transition-all duration-300 ${isKidsAyahHighlighted(currentKidsAyah.numberInSurah) ? "ilmizo-ayah-playing" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative rounded-t-2xl bg-gradient-to-b from-[#FDE68A]/50 via-[#FEF3C7]/30 to-transparent dark:from-amber-500/15 dark:via-amber-500/5 dark:to-transparent border-t-2 border-x-2 border-[#D4AF37]/70 dark:border-amber-500/35 pt-3 pb-2 px-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-center gap-2 text-amber-700/80 dark:text-amber-300/80 text-xs font-bold mb-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "❁" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isKidsAyahHighlighted(currentKidsAyah.numberInSurah) ? `Reciting Ayah ${currentKidsAyah.numberInSurah}` : "─── ❖ ───" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "❁" })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveTajweedAyahView, {
										ayah: currentKidsAyah,
										surahNumber: kidsSurahNum,
										fontScaleClass: "text-3xl sm:text-4xl",
										darkMode: resolvedTheme === "dark",
										onPlayAyahAudio: () => playKidsSurahContinuous()
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-extrabold text-[var(--text-primary)]",
									children: currentKidsAyah.transliteration
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[var(--text-secondary)]",
									children: resolveText(currentKidsAyah.translations, currentKidsAyah.translations.en)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-center gap-3 pt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												const nextSpeed = playbackSpeed === 1 ? .75 : 1;
												setPlaybackSpeed(nextSpeed);
												audioManager.setPlaybackRate(nextSpeed);
											},
											className: "w-11 h-11 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-extrabold text-xs tabular-nums shadow-2xs",
											children: [playbackSpeed, "x"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												if (isPlayingKidsAudio) {
													audioManager.pause();
													return;
												}
												if (audioState.status === "paused") {
													audioManager.resume();
													return;
												}
												playKidsSurahContinuous();
											},
											"aria-label": isPlayingKidsAudio ? "Pause Surah Recitation" : "Play Surah",
											className: "w-14 h-14 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-100 dark:ring-emerald-900/50 active:scale-95 transition",
											children: isPlayingKidsAudio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-6 h-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-6 h-6 ml-0.5 fill-current" })
										}),
										(isPlayingKidsAudio || audioState.status === "paused") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => audioManager.stopAll(),
											"aria-label": "Stop Audio",
											className: "w-11 h-11 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-700/40 text-rose-700 dark:text-rose-300 flex items-center justify-center shadow-2xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "w-4 h-4 fill-current" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												if (isAudioMuted) {
													showKidsToast("Sound is muted. Tap Sound to unmute.");
													return;
												}
												audioManager.playQariRecitationAyah({
													id: `kids-quran-repeat-${kidsSurahNum}-${currentKidsAyah.numberInSurah}`,
													surahNumber: kidsSurahNum,
													ayahNumberInSurah: currentKidsAyah.numberInSurah,
													globalAyahNumber: currentKidsAyah.globalNumber,
													reciterName: user.reciterName,
													rate: playbackSpeed,
													repeat: true,
													repeatOption: "infinite",
													onError: (msg) => showKidsToast(msg)
												});
												showKidsToast(`Repeating Ayah ${currentKidsAyah.numberInSurah}`);
											},
											"aria-label": "Repeat Current Ayah",
											title: "Repeat Current Ayah",
											className: "w-11 h-11 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] flex items-center justify-center shadow-2xs active:scale-95 transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "w-4 h-4" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-4 gap-1 bg-[var(--bg-subtle)] p-1 rounded-full",
									children: [
										"Learn",
										"Practice",
										"Recite",
										"Meaning"
									].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setQuranModeTab(m);
											setWordPracticeAnswered(null);
											if (m === "Recite") setKidsRoute("recitation_practice");
										},
										className: `py-1.5 rounded-full text-[11px] font-extrabold transition ${quranModeTab === m ? "bg-[#14532D] dark:bg-emerald-600 text-white shadow-2xs" : "text-[var(--text-secondary)]"}`,
										children: m
									}, m))
								}),
								quranModeTab === "Practice" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-700/40 p-3 text-left space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-emerald-950 dark:text-emerald-200",
											children: "Practice Stage: Tap the final Arabic word of this Ayah!"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-2 gap-2",
											children: [targetWord, "ٱلْعَـٰلَمِينَ"].map((w, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													if (w === targetWord) {
														setWordPracticeAnswered("correct");
														completeKidsQuestStep("quran", `Practiced ${currentSurahMeta.nameTranslit}`, currentSurahMeta.nameTranslit);
														showKidsToast("MashaAllah! Correct word!");
													} else {
														setWordPracticeAnswered("wrong");
														addNeedsPracticeItem("quran", `${currentSurahMeta.nameTranslit} Ayah ${currentKidsAyah.numberInSurah}`, currentKidsAyah.transliteration, "quran_learning");
													}
												},
												className: "py-2 px-3 rounded-xl bg-[var(--bg-surface)] border border-emerald-300 dark:border-emerald-700/50 font-arabic text-2xl font-bold text-emerald-950 dark:text-emerald-100 text-center",
												children: w
											}, idx))
										}),
										wordPracticeAnswered === "correct" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] font-bold text-emerald-800 dark:text-emerald-300",
											children: "★ Awesome job! Now tap Recite to practice with Ayaan."
										}),
										wordPracticeAnswered === "wrong" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] font-bold text-amber-800 dark:text-amber-300",
											children: "Added to Ayla’s Practice Queue so we can review it together!"
										})
									]
								}),
								quranModeTab === "Meaning" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[#FEF3C7]/90 dark:bg-amber-950/35 border border-amber-300 dark:border-amber-700/40 p-3 flex items-center gap-3 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
										character: "Mizo",
										size: "md"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-amber-950 dark:text-amber-200",
											children: "What Allah Teaches Us Here:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-amber-900 dark:text-amber-100/90 leading-relaxed",
											children: currentKidsAyah.tafsirBrief
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										onClick: () => triggerAyaanInteraction("MashaAllah! Listen carefully and repeat with me!"),
										animate: isPlayingKidsAudio ? {
											y: [
												0,
												-7,
												0
											],
											rotate: [
												0,
												3,
												-3,
												0
											],
											scale: [
												1,
												1.06,
												1
											]
										} : {
											y: [
												0,
												-4,
												0
											],
											rotate: [
												0,
												1.5,
												-1.5,
												0
											]
										},
										transition: {
											duration: isPlayingKidsAudio ? 1.4 : 3,
											repeat: Infinity,
											ease: "easeInOut"
										},
										whileHover: {
											scale: 1.08,
											rotate: 4
										},
										whileTap: {
											scale: .9,
											rotate: -8
										},
										className: "relative cursor-pointer shrink-0 -ml-1 select-none",
										title: "Tap Ayaan for encouragement!",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "/assets/illustrations/avatar_ayaan_3d.webp",
											alt: "Ayaan",
											loading: "lazy",
											decoding: "async",
											className: "w-24 h-24 object-contain rounded-2xl drop-shadow-md"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 text-[11px] font-black shadow-2xs",
											children: "Tap me!"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: .7,
											scale: .96
										},
										animate: {
											opacity: 1,
											scale: 1
										},
										className: "relative flex-1 rounded-2xl bg-[var(--bg-elevated)] border border-amber-200 dark:border-amber-700/40 p-3 text-left shadow-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-[var(--text-primary)] leading-snug",
											children: ayaanTapCheer ? ayaanTapCheer : quranModeTab === "Practice" ? "Can you spot the right Arabic word from this verse?" : quranModeTab === "Meaning" ? "Reflecting on the meaning helps our hearts love Allah!" : "Listen and repeat after me!"
										})
									}, ayaanTapCheer || quranModeTab)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between pt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: kidsAyahIdx === 0,
											onClick: () => {
												audioManager.stopAll();
												setKidsAyahIdx((i) => Math.max(0, i - 1));
												setWordPracticeAnswered(null);
											},
											className: "w-11 h-11 rounded-full bg-[#16A34A] disabled:opacity-30 text-white flex items-center justify-center shadow-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-extrabold text-[var(--text-secondary)] tabular-nums",
											children: [
												kidsAyahIdx + 1,
												" / ",
												kidsSurahAyahs.length
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: kidsAyahIdx >= kidsSurahAyahs.length - 1,
											onClick: () => {
												audioManager.stopAll();
												setKidsAyahIdx((i) => Math.min(kidsSurahAyahs.length - 1, i + 1));
												setWordPracticeAnswered(null);
											},
											className: "w-11 h-11 rounded-full bg-[#16A34A] disabled:opacity-30 text-white flex items-center justify-center shadow-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NooraniQaidaCourseView, {
							onOpenPaywall: openKidsPaywall,
							onTriggerToast: showKidsToast
						})]
					})]
				});
			}
			case "recitation_practice": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[var(--bg-app)] text-[var(--text-primary)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
						time: "9:41",
						light: resolvedTheme === "dark"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 pt-1 pb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
								variant: "kids",
								label: "Back"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-base font-extrabold text-[var(--text-primary)]",
									children: t("recite_with_ayaan")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
									value: String(kidsSurahNum),
									onChange: (val) => handleSwitchKidsSurah(Number(val)),
									title: "Choose Surah to Recite",
									subtitle: "Practice verse by verse with Ayaan",
									ariaLabel: "Switch Recitation Surah",
									variant: "inline",
									searchable: true,
									searchPlaceholder: "Search Juz Amma Surah…",
									className: "max-w-[190px]",
									options: KIDS_SURAH_OPTIONS.map((opt) => ({
										value: String(opt.number),
										label: opt.title
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: toggleAudioMute,
								"aria-pressed": !isAudioMuted,
								className: `px-2.5 min-h-[38px] rounded-full flex items-center gap-1 text-[11px] font-extrabold border transition ${!isAudioMuted ? "bg-[#16A34A] text-white border-[#15803D] shadow-2xs" : "bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-700/50"}`,
								children: [!isAudioMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: !isAudioMuted ? "Sound" : "Muted" })]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 pt-2 text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-[var(--text-secondary)]",
							children: isRecordingMic ? "Listening to your voice — tap mic again when finished" : "Tap the mic and recite this ayah"
						}),
						!hasSpeechRecognition && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-700/40 px-3 py-2 text-[11px] font-semibold text-amber-950 dark:text-amber-200",
							children: "Voice Activity & Qari Comparison Mode — Live mic waveform & playback work offline; automatic Arabic transcript is not supported in this browser."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl bg-[var(--bg-surface)] border border-amber-200 dark:border-amber-700/40 p-5 shadow-xs space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-arabic text-4xl text-[var(--text-primary)] font-bold",
								children: currentKidsAyah.arabicUthmani
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-emerald-800 dark:text-emerald-300",
								children: currentKidsAyah.transliteration
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-1 flex flex-col items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleToggleMicRecording,
									className: `w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition ${isRecordingMic ? "bg-[#22C55E] ring-8 ring-emerald-200 dark:ring-emerald-800/60 scale-105 text-white" : "bg-gradient-to-b from-[#4ADE80] to-[#16A34A] text-white ring-8 ring-emerald-100 dark:ring-emerald-900/50"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-12 h-12" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-center gap-1 h-8",
									children: voiceBands.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-1.5 rounded-full bg-[#22C55E] transition-all duration-75",
										style: { height: `${isRecordingMic ? h : Math.max(6, Math.round(h * .45))}px` }
									}, i))
								}),
								micPermissionError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold text-rose-700 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 rounded-xl px-3 py-2 max-w-sm",
									children: micPermissionError
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-center gap-2 flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => speakArabic(currentKidsAyah.arabicUthmani, currentKidsAyah.audioUrl),
											className: "px-3.5 min-h-[44px] py-2 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-extrabold text-[var(--text-primary)] flex items-center gap-1.5 shadow-2xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5 text-[#16A34A]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Listen to Qari" })]
										}),
										recordedAudioUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												audioManager.playAudioUrl({
													id: "kids-recorded-voice",
													url: recordedAudioUrl
												});
											},
											className: "px-3.5 min-h-[44px] py-2 rounded-full bg-amber-100 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700/50 text-xs font-extrabold text-amber-950 dark:text-amber-200 flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Play My Voice" })]
										}),
										hasRecordedBlob && !isRecordingMic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: aiTajweedLoading,
											onClick: handleRunKidsAiTajweed,
											className: "px-4 min-h-[44px] py-2 rounded-full bg-[#14532D] hover:bg-emerald-800 disabled:opacity-60 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition",
											children: aiTajweedLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Checking Tajweed…" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI Tajweed Check" })] })
										})
									]
								}),
								hasRecordedBlob && !isRecordingMic && (() => {
									const quota = canUseAiTajweedCheck(user, getLocalDateKeyWithOffset(0, /* @__PURE__ */ new Date()));
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-bold text-[var(--text-muted)] tabular-nums",
										children: quota.limit === null ? "AI Harakat & Makhraj Coach · Unlimited active" : `AI Harakat & Makhraj Coach · ${quota.remaining}/${quota.limit} free checks left today`
									});
								})()
							]
						}),
						(aiTajweedResult || aiTajweedError) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 space-y-3 text-left shadow-xs",
							children: aiTajweedError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-rose-700 dark:text-rose-300",
								children: aiTajweedError
							}) : aiTajweedResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300",
										children: "AI Tajweed & Harakat Review"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-extrabold text-slate-900",
										children: aiTajweedResult.accuracyLabel
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `text-lg font-black tabular-nums ${aiTajweedResult.overallScore >= 80 ? "text-[#14532D]" : aiTajweedResult.overallScore >= 55 ? "text-amber-600" : "text-rose-600"}`,
										children: [aiTajweedResult.overallScore, "%"]
									})]
								}),
								aiTajweedResult.wordFeedback.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									dir: "rtl",
									className: "flex flex-wrap gap-1.5 pt-0.5",
									children: aiTajweedResult.wordFeedback.map((wf, idx) => {
										const toneClass = wf.status === "correct" ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/50 text-emerald-950 dark:text-emerald-200" : wf.status === "harakat_issue" ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/50 text-amber-950 dark:text-amber-200" : "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700/50 text-rose-900 dark:text-rose-200";
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `rounded-xl border px-2.5 py-1.5 text-center ${toneClass}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-arabic text-xl font-bold leading-snug",
												children: wf.word
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												dir: "ltr",
												className: "text-[11px] font-semibold leading-tight mt-0.5",
												children: wf.note
											})]
										}, `${wf.word}-${idx}`);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 text-xs text-[var(--text-secondary)] bg-[var(--bg-subtle)] rounded-xl p-2.5 border border-amber-200/70 dark:border-amber-700/40",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-[var(--text-primary)]",
											children: aiTajweedResult.feedbackSummary
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] font-semibold text-emerald-900 dark:text-emerald-300",
											children: ["Makhraj Tip: ", aiTajweedResult.makhrajTip]
										}),
										aiTajweedResult.transcriptArabic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-[var(--text-muted)]",
											children: [
												"Heard:",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													dir: "rtl",
													className: "font-arabic text-sm font-bold text-[var(--text-primary)]",
													children: aiTajweedResult.transcriptArabic
												})
											]
										})
									]
								})
							] }) : null
						}),
						(micDone || recognizedArabic || voiceAssessment) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 space-y-2.5 text-left",
							children: [
								voiceAssessment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `rounded-xl border p-2.5 text-xs ${voiceAssessment.hasClearVoiceActivity ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-700/40 text-emerald-950 dark:text-emerald-200" : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-700/40 text-amber-950 dark:text-amber-200"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 mb-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-extrabold uppercase tracking-wider",
											children: "Microphone Voice Activity Check"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] font-bold tabular-nums",
											children: [
												(voiceAssessment.durationMs / 1e3).toFixed(1),
												"s · Peak",
												" ",
												Math.round(voiceAssessment.peakLevel * 100),
												"%"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-[11px]",
										children: voiceAssessment.summary
									})]
								}),
								recognizedArabic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-700/40 p-2.5 flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-extrabold uppercase text-emerald-800 dark:text-emerald-300",
										children: "Live Arabic Voice Check"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-arabic text-lg font-bold text-[var(--text-primary)]",
										children: recognizedArabic
									})] }), speechMatchScore !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-2.5 py-1 rounded-full bg-[#16A34A] text-white text-xs font-extrabold tabular-nums",
										children: [speechMatchScore, "% Match"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold text-[var(--text-primary)] text-center",
									children: "How did your recitation sound compared to the Qari?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setRecitationSelfRating("clear"),
										className: `py-2 rounded-xl text-xs font-extrabold border inline-flex items-center justify-center gap-1.5 transition ${recitationSelfRating === "clear" ? "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-500 text-emerald-950 dark:text-emerald-100" : "bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-secondary)]"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3.5 h-3.5 text-amber-500 fill-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Clear & Smooth!" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setRecitationSelfRating("practice");
											addNeedsPracticeItem("quran", `Recite ${currentSurahMeta.nameTranslit} Ayah ${currentKidsAyah.numberInSurah}`, currentKidsAyah.transliteration, "recitation_practice");
										},
										className: `py-2 rounded-xl text-xs font-extrabold border inline-flex items-center justify-center gap-1.5 transition ${recitationSelfRating === "practice" ? "bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-950 dark:text-amber-100" : "bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-secondary)]"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Practice Again Later" })]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 px-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								onClick: () => triggerAyaanInteraction("Bismillah! Take a deep breath and recite clearly!"),
								animate: isRecordingMic ? {
									scale: [
										1,
										1.08,
										1
									],
									rotate: [
										0,
										3,
										-3,
										0
									],
									y: [
										0,
										-6,
										0
									]
								} : {
									y: [
										0,
										-5,
										0
									],
									rotate: [
										0,
										1.5,
										-1.5,
										0
									]
								},
								transition: {
									duration: isRecordingMic ? 1.2 : 2.8,
									repeat: Infinity,
									ease: "easeInOut"
								},
								whileHover: { scale: 1.08 },
								whileTap: {
									scale: .9,
									rotate: -8
								},
								className: "relative cursor-pointer shrink-0 select-none",
								title: "Tap Ayaan!",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/assets/illustrations/avatar_ayaan_3d.webp",
									alt: "Ayaan",
									loading: "lazy",
									decoding: "async",
									className: "w-24 h-24 object-contain rounded-2xl drop-shadow-md"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 rounded-2xl bg-[var(--bg-surface)] border border-amber-200 dark:border-amber-700/40 p-3.5 text-left shadow-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold text-[var(--text-primary)] leading-snug",
									children: ayaanTapCheer ? ayaanTapCheer : isRecordingMic ? "I’m listening closely... Take your time!" : micDone ? "MashaAllah! Listening to the Qari and repeating builds strong Tajweed!" : "Tap the green mic or tap me for a tip!"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								completeKidsQuestStep("quran", `Recited ${currentSurahMeta.nameTranslit}`, currentSurahMeta.nameTranslit);
								showKidsToast(`Completed ${currentSurahMeta.nameTranslit} recitation!`);
								setKidsRoute("todays_quest");
							},
							className: "w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md",
							children: "Finish Recitation"
						})
					]
				})]
			});
			case "duas_learning": {
				const activeDua = VERIFIED_DUAS[kidsDuaIdx] || VERIFIED_DUAS[0];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[var(--bg-app)] text-[var(--text-primary)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
							time: "9:41",
							light: resolvedTheme === "dark"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 pt-1 pb-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
									variant: "kids",
									label: "Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-base font-extrabold text-[var(--text-primary)]",
										children: activeDua.kidsTitle || activeDua.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-bold text-emerald-700 dark:text-emerald-300 tabular-nums",
										children: [
											"Dua ",
											kidsDuaIdx + 1,
											" of ",
											VERIFIED_DUAS.length
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										audioManager.stopAll();
										setKidsDuaIdx((i) => (i + 1) % VERIFIED_DUAS.length);
										setDuaPracticeMode("card");
										setDuaQuizPicked(null);
									},
									className: "w-11 h-11 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 flex items-center justify-center",
									title: "Next Dua",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" })
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 space-y-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl overflow-hidden border border-amber-200 dark:border-amber-700/40 shadow-sm h-44 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/assets/illustrations/kids_dua_ayla.webp",
									alt: "Ayla Dua Before Eating",
									loading: "lazy",
									decoding: "async",
									className: "w-full h-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-2 right-2 bg-black/55 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full backdrop-blur-xs",
									children: activeDua.verification.source
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-[var(--bg-surface)] border border-amber-200 dark:border-amber-700/40 p-4 text-center shadow-xs space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/40 text-[#14532D] dark:text-emerald-300 text-[11px] font-extrabold",
										children: [
											"✓ Real Human Qari Audio (",
											resolveDuaHumanAudio(activeDua).reciterName,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-arabic text-3xl text-[var(--text-primary)] font-bold leading-[1.9]",
										children: activeDua.arabic
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-extrabold text-[var(--text-primary)]",
										children: activeDua.transliteration
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[var(--text-secondary)]",
										children: resolveText(activeDua.translations, activeDua.translations.en)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-2 flex items-center justify-center gap-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setPlaybackSpeed(playbackSpeed === 1 ? .75 : 1),
												className: "w-9 h-9 rounded-full bg-[var(--bg-subtle)] text-[var(--text-primary)] font-extrabold text-xs flex items-center justify-center tabular-nums",
												children: [playbackSpeed, "x"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													playHumanDuaAudio({
														dua: activeDua,
														rate: playbackSpeed,
														onStatus: (msg) => showKidsToast(msg)
													});
													completeKidsQuestStep("dua", activeDua.title);
												},
												className: "w-12 h-12 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-md",
												title: "Play Human Qari Audio",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-5 h-5 ml-0.5 fill-current" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													playHumanDuaAudio({
														dua: activeDua,
														rate: playbackSpeed,
														onStatus: (msg) => showKidsToast(msg)
													});
												},
												className: "w-9 h-9 rounded-full bg-[var(--bg-subtle)] text-[var(--text-primary)] flex items-center justify-center",
												title: "Repeat Human Qari Audio",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "w-4 h-4" })
											})
										]
									})
								]
							}),
							duaPracticeMode === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-700/40 p-3.5 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-extrabold text-emerald-950 dark:text-emerald-200",
									children: [
										"When do we recite \"",
										activeDua.kidsTitle || activeDua.title,
										"\"?"
									]
								}), [activeDua.whenToUse, "Only once a year on Eid morning."].map((opt, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setDuaQuizPicked(idx);
										if (idx === 0) {
											completeKidsQuestStep("dua", `Mastered ${activeDua.title}`);
											showKidsToast("MashaAllah! You know when to use this Dua!");
										}
									},
									className: `w-full text-left p-2.5 rounded-xl border text-xs font-bold ${duaQuizPicked === idx ? idx === 0 ? "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-600 text-emerald-950 dark:text-emerald-100" : "bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)]"}`,
									children: opt
								}, idx))]
							}),
							duaPracticeMode === "use_it" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[#FEF3C7] dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/40 p-3.5 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-extrabold text-amber-950 dark:text-amber-200",
									children: ["Real-Life Action: ", activeDua.whenToUse]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										completeKidsQuestStep("dua", `Used ${activeDua.title}`);
										showKidsToast("★ Star awarded for practicing this Sunnah Dua!");
										setDuaPracticeMode("card");
									},
									className: "w-full py-2 rounded-xl bg-[#16A34A] text-white text-xs font-extrabold",
									children: "I Said This Dua Today! ✓"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold text-[var(--text-primary)] mb-2",
								children: "Practice"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 gap-2",
								children: [
									{
										label: "Listen",
										action: () => void playHumanDuaAudio({
											dua: activeDua,
											rate: playbackSpeed,
											onStatus: (msg) => showKidsToast(msg)
										}),
										bg: "bg-orange-100 text-orange-900"
									},
									{
										label: "Repeat",
										action: () => void playHumanDuaAudio({
											dua: activeDua,
											rate: playbackSpeed,
											onStatus: (msg) => showKidsToast(msg)
										}),
										bg: "bg-sky-100 text-sky-900"
									},
									{
										label: "Quiz",
										action: () => setDuaPracticeMode(duaPracticeMode === "quiz" ? "card" : "quiz"),
										bg: "bg-emerald-100 text-emerald-900"
									},
									{
										label: "Use It",
										action: () => setDuaPracticeMode(duaPracticeMode === "use_it" ? "card" : "use_it"),
										bg: "bg-amber-100 text-amber-900"
									}
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: item.action,
									className: `rounded-2xl ${item.bg} py-2.5 px-2 font-extrabold text-[11px] flex flex-col items-center justify-center gap-1 shadow-2xs`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
								}, item.label))
							})] })
						]
					})]
				});
			}
			case "salah_learning": {
				const currentSalahStep = SALAH_STEPS[salahStepIdx] || SALAH_STEPS[0];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[24px] pb-3 shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
							time: "9:41",
							light: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 pt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
									variant: "light",
									label: "Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-base font-extrabold",
									children: "Salah Learning"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-11 h-11 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 text-xs font-extrabold tabular-nums",
									children: [
										currentSalahStep.step,
										"/",
										SALAH_STEPS.length
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pt-3 space-y-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl overflow-hidden border border-amber-300/60 dark:border-amber-400/30 shadow-md h-60 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/assets/illustrations/kids_salah_ayaan.webp",
									alt: "Ayaan Salah Learning",
									loading: "lazy",
									decoding: "async",
									className: "w-full h-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => speakArabic(currentSalahStep.arabic),
									className: "absolute bottom-3 right-3 px-3.5 py-2 rounded-full bg-[#16A34A] text-white text-xs font-extrabold shadow-md flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Listen" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-[var(--bg-surface)] p-4 shadow-xs border border-[var(--border-subtle)] text-center space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-extrabold text-emerald-800 dark:text-emerald-300",
										children: [
											"Step ",
											currentSalahStep.step,
											": ",
											currentSalahStep.title
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-extrabold text-[var(--text-primary)] leading-snug",
										children: currentSalahStep.kidsDesc
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-arabic text-2xl text-emerald-950 dark:text-emerald-100 font-bold",
										children: currentSalahStep.arabic
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-emerald-700 dark:text-emerald-300 italic",
										children: currentSalahStep.transliteration
									})
								]
							}),
							salahStepIdx === SALAH_STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-700/40 p-3.5 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold text-emerald-950 dark:text-emerald-200",
									children: "Quick Salah Check: What do we say when bowing in Ruku?"
								}), ["Subhana Rabbiyal-Azim (Glory to my Lord, the Most Great)", "Subhana Rabbiyal-A’la"].map((opt, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSalahQuizPicked(idx),
									className: `w-full text-left p-2.5 rounded-xl border text-xs font-bold ${salahQuizPicked === idx ? idx === 0 ? "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-600 text-emerald-950 dark:text-emerald-100" : "bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)]"}`,
									children: opt
								}, idx))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: salahStepIdx === 0,
										onClick: () => {
											audioManager.stopAll();
											setSalahStepIdx((i) => Math.max(0, i - 1));
										},
										className: "px-4 py-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] disabled:opacity-40 text-[var(--text-primary)] font-extrabold text-xs min-h-[44px]",
										children: "Previous"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-extrabold text-[var(--text-secondary)] tabular-nums",
										children: [
											salahStepIdx + 1,
											" / ",
											SALAH_STEPS.length
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											audioManager.stopAll();
											if (salahStepIdx + 1 < SALAH_STEPS.length) setSalahStepIdx((i) => i + 1);
											else {
												completeKidsQuestStep("salah", "Completed Salah Steps");
												showKidsToast("MashaAllah! Completed all 6 Salah steps!");
												setKidsRoute("todays_quest");
											}
										},
										className: "px-5 py-2.5 rounded-full bg-[#16A34A] text-white font-extrabold text-xs shadow-sm min-h-[44px]",
										children: salahStepIdx + 1 < SALAH_STEPS.length ? "Next ›" : "Finish ✓"
									})
								]
							})
						]
					})]
				});
			}
			case "stories": {
				const activeStory = KIDS_STORIES.find((s) => s.id === activeStoryId);
				const filteredStories = storyCat === "Featured" ? TOP_FEATURED_STORY_IDS.map((id) => KIDS_STORIES.find((s) => s.id === id)).filter((s) => Boolean(s)) : KIDS_STORIES.filter((s) => storyCat === "All" ? true : s.category === storyCat);
				const familyUnlocked = isFamilyPlusActive(user);
				const activeLocalizedTitle = activeStory ? activeStory.localizedTitles?.[user.language] || activeStory.title : t("stories");
				const activeLocalizedPages = activeStory ? activeStory.localizedPages?.[user.language] || activeStory.pages : [];
				const activeStorybook = activeStory ? buildInteractiveStorybook(activeStory, user.language) : null;
				const activeScenes = activeStorybook ? activeStorybook.scenes : [];
				const currentScene = activeScenes[storyPageIdx] || activeScenes[0] || null;
				const activeLocalizedMoral = activeStory ? activeStory.localizedMorals?.[user.language] || activeStory.moral : "";
				const currentPageText = currentScene ? currentScene.narrationParagraphs.join(" ") : activeLocalizedPages[storyPageIdx] || "";
				const pageSentences = splitStoryPageIntoSentences(currentPageText);
				const mappedAudioPageIdx = storyPageIdx === 0 ? 0 : storyPageIdx === 1 ? Math.min(1, Math.max(0, activeLocalizedPages.length - 1)) : storyPageIdx === 3 ? Math.min(2, Math.max(0, activeLocalizedPages.length - 1)) : storyPageIdx;
				const relatedQuranRef = activeStory ? STORY_QURAN_VERSES_MAP[activeStory.id] : void 0;
				const activeQuiz = activeStory?.comprehensionQuestions?.[0];
				const currentStoryTrackPrefix = activeStory ? `story-${activeStory.id}-p${storyPageIdx}` : "";
				const isCurrentStorySpeaking = Boolean(activeStory) && Boolean(audioState.activeTrackId?.startsWith(currentStoryTrackPrefix)) && (audioState.status === "playing" || audioState.status === "loading");
				const isCurrentStoryPaused = Boolean(activeStory) && Boolean(audioState.activeTrackId?.startsWith(currentStoryTrackPrefix)) && audioState.status === "paused";
				const isActiveStoryAlreadyCompleted = Boolean(activeStory && activeChild.completedStoryIds?.includes(activeStory.id));
				const speakKaraokeFromSentence = (startIdx, tokenAtStart) => {
					if (!activeStory || tokenAtStart !== storyNarrationTokenRef.current) return;
					if (startIdx >= pageSentences.length) {
						setStoryActiveSentenceIdx(null);
						return;
					}
					setStoryActiveSentenceIdx(startIdx);
					audioManager.speakText({
						id: `${currentStoryTrackPrefix}-s${startIdx}`,
						text: pageSentences[startIdx],
						lang: getSpeechLangForUiLanguage(user.language),
						rate: storySpeed,
						pitch: 1.04,
						onEnded: () => {
							if (tokenAtStart !== storyNarrationTokenRef.current) return;
							speakKaraokeFromSentence(startIdx + 1, tokenAtStart);
						},
						onError: (msg) => {
							setStoryActiveSentenceIdx(null);
							showKidsToast(msg);
						}
					});
				};
				const isPrefetchActive = prefetchState.status === "running" || prefetchState.status === "paused";
				const top10Stories = KIDS_STORIES.slice(0, 10);
				const top10CachedCount = top10Stories.filter((st) => storyLibrarySummary.storyStatusMap[st.id]?.isFullyCached).length;
				const all49Cached = KIDS_STORIES.length > 0 && storyLibrarySummary.cachedStoriesCount >= KIDS_STORIES.length;
				const handlePrefetchSingleStory = async (story, storyGlobalIdx) => {
					const title = story.localizedTitles?.[user.language] || story.title;
					if (!canCacheSingleStoryOffline(user, storyGlobalIdx)) {
						openKidsPaywall(`Unlock "${title}" and offline human storytelling for all ${KIDS_STORIES.length} stories with Family Plus (₹199/yr · 7-Day Free Trial).`);
						return;
					}
					const finalState = await storyAudioPrefetchManager.startPrefetch({
						stories: [story],
						scope: "single_story",
						language: user.language,
						voiceStyle: storyVoicePersona
					});
					refreshStoryLibrarySummary();
					if (finalState.status === "completed") {
						setStudioOfflineNotice(null);
						showKidsToast(`Saved "${title}" (${finalState.totalTasks} pages) offline!`);
					} else if (finalState.lastError) showKidsToast(finalState.lastError);
				};
				const handleDownloadTop10Pack = async () => {
					if (!canDownloadTopStoriesAudioPack(user)) {
						openKidsPaywall("Save Top 10 Prophet & Companion stories human-voice audio offline with Family Plus (₹199/yr · 7-Day Free Trial).");
						return;
					}
					const finalState = await storyAudioPrefetchManager.startPrefetch({
						stories: top10Stories,
						scope: "top_10",
						language: user.language,
						voiceStyle: storyVoicePersona
					});
					refreshStoryLibrarySummary();
					if (finalState.status === "completed") showKidsToast(`Saved Top 10 Stories (${finalState.completedTasks} pages) offline!`);
					else if (finalState.lastError) showKidsToast(finalState.lastError);
				};
				const handleDownloadAllStoriesPack = async () => {
					if (!canDownloadFullStoryLibraryAudioPack(user)) {
						openKidsPaywall(`Download warm Studio Storyteller human voice for all 49 stories (${storyLibrarySummary.totalPages} pages) offline with Family Plus (₹199/yr · 7-Day Free Trial).`);
						return;
					}
					const finalState = await storyAudioPrefetchManager.startPrefetch({
						stories: KIDS_STORIES,
						scope: "all_49",
						language: user.language,
						voiceStyle: storyVoicePersona
					});
					refreshStoryLibrarySummary();
					if (finalState.status === "completed") showKidsToast(`Saved all ${KIDS_STORIES.length} stories (${finalState.completedTasks} pages) for offline listening!`);
					else if (finalState.lastError) showKidsToast(finalState.lastError);
				};
				const handleClearOfflineStoryCache = async () => {
					storyAudioPrefetchManager.cancelPrefetch();
					await clearAllCachedStoryAudio();
					refreshStoryLibrarySummary();
					showKidsToast("Cleared saved offline story audio cache.");
				};
				const handleToggleStoryNarration = async () => {
					if (isCurrentStorySpeaking) {
						audioManager.pause();
						return;
					}
					if (isCurrentStoryPaused) {
						audioManager.resume();
						return;
					}
					if (!activeStory || !currentPageText.trim()) return;
					if (storyVoiceMode === "studio") {
						setLoadingStudioStoryAudio(true);
						setStudioOfflineNotice(null);
						setStoryActiveSentenceIdx(null);
						const res = await resolveStoryPageHumanAudio({
							storyId: activeStory.id,
							pageIndex: mappedAudioPageIdx,
							text: currentPageText,
							language: user.language,
							voiceStyle: storyVoicePersona
						});
						setLoadingStudioStoryAudio(false);
						if (res.ok && res.blobUrl) {
							if (studioStoryBlobUrlRef.current && studioStoryBlobUrlRef.current !== res.blobUrl) try {
								URL.revokeObjectURL(studioStoryBlobUrlRef.current);
							} catch {}
							studioStoryBlobUrlRef.current = res.blobUrl;
							audioManager.playAudioUrl({
								id: `${currentStoryTrackPrefix}-studio-${res.voiceStyleUsed || storyVoicePersona}`,
								url: res.blobUrl,
								rate: storySpeed,
								allowTtsFallback: false,
								onError: (msg) => {
									setStudioOfflineNotice({
										storyId: activeStory.id,
										pageIndex: storyPageIdx,
										message: msg,
										isOfflineUncached: false
									});
								}
							});
							refreshStoryLibrarySummary();
							const label = (res.voiceStyleUsed || storyVoicePersona) === "teacher" ? "Teacher" : "Storyteller";
							showKidsToast(res.fromCache ? `Playing offline Studio ${label} voice` : `Playing Studio ${label} voice (saved offline)`);
							return;
						}
						setStudioOfflineNotice({
							storyId: activeStory.id,
							pageIndex: storyPageIdx,
							message: res.error || "Human Studio narration for this page is not saved offline yet.",
							isOfflineUncached: Boolean(res.offlineUncached)
						});
						return;
					}
					storyNarrationTokenRef.current += 1;
					speakKaraokeFromSentence(0, storyNarrationTokenRef.current);
				};
				const handleStopStoryNarration = () => {
					storyNarrationTokenRef.current += 1;
					setStoryActiveSentenceIdx(null);
					setLoadingStudioStoryAudio(false);
					audioManager.stopAll();
				};
				const totalStoryScenes = activeScenes.length || activeLocalizedPages.length;
				const isLastStoryPage = Boolean(activeStory && storyPageIdx + 1 >= totalStoryScenes);
				const canCompleteStoryNow = !activeQuiz || storyQuizPicked === activeQuiz.correctIndex;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[var(--bg-app)] text-[var(--text-primary)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
							time: "9:41",
							light: resolvedTheme === "dark"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 pt-1 pb-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
									variant: "kids",
									label: activeStory ? "Back to Stories" : "Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center max-w-[60%]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-base font-extrabold text-[var(--text-primary)] truncate",
										children: activeLocalizedTitle
									}), activeStory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-bold text-emerald-700 dark:text-emerald-300 tabular-nums",
										children: [
											currentScene?.sceneLabel || `Scene ${storyPageIdx + 1}`,
											" · ",
											storyPageIdx + 1,
											"/",
											totalStoryScenes
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SleepTimerTriggerButton, {
									compact: true,
									onClick: () => setKidsSleepSheetOpen(true)
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 space-y-3",
						children: [!activeStory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar",
								children: [
									"Featured",
									"All",
									"Prophets",
									"Companions",
									"Akhlaq"
								].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setStoryCat(cat),
									className: `px-3.5 py-2 rounded-full text-xs font-extrabold transition whitespace-nowrap min-h-[40px] ${storyCat === cat ? "bg-[#14532D] dark:bg-emerald-600 text-white shadow-2xs" : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)]"}`,
									children: cat === "Featured" ? "Illustrated Top 15" : cat
								}, cat))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 shadow-2xs space-y-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs font-extrabold text-[var(--text-primary)]",
												children: [
													"Offline Human Storyteller Audio (",
													KIDS_STORIES.length,
													" Stories)"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] font-semibold text-[var(--text-secondary)] tabular-nums mt-0.5",
												children: [
													storyLibrarySummary.cachedStoriesCount,
													"/",
													storyLibrarySummary.totalStories,
													" stories",
													" · ",
													storyLibrarySummary.cachedPagesCount,
													"/",
													storyLibrarySummary.totalPages,
													" pages",
													" · ",
													formatAudioCacheSizeMb(storyLibrarySummary.totalBytes),
													" saved"
												]
											})]
										}), storyLibrarySummary.totalBytes > 0 && !isPrefetchActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => void handleClearOfflineStoryCache(),
											className: "px-2.5 min-h-[36px] rounded-xl text-[11px] font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] flex items-center gap-1 shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Clear Cache" })]
										})]
									}),
									isPrefetchActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2 text-[11px] font-bold text-emerald-900 dark:text-emerald-200",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "truncate",
													children: [prefetchState.status === "paused" ? "Paused: " : "Saving offline: ", prefetchState.currentStoryTitle]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "tabular-nums shrink-0",
													children: [
														prefetchState.completedTasks,
														"/",
														prefetchState.totalTasks,
														" pages"
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-full h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-full bg-[#22C55E] transition-all duration-200",
													style: { width: `${prefetchState.totalTasks > 0 ? Math.max(5, Math.round(prefetchState.completedTasks / prefetchState.totalTasks * 100)) : 0}%` }
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => prefetchState.status === "paused" ? storyAudioPrefetchManager.resumePrefetch() : storyAudioPrefetchManager.pausePrefetch(),
													className: "flex-1 min-h-[44px] rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/40 text-[#14532D] dark:text-emerald-200 text-xs font-extrabold flex items-center justify-center gap-1.5",
													children: prefetchState.status === "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3.5 h-3.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Resume" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pause" })] })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => storyAudioPrefetchManager.cancelPrefetch(),
													className: "px-4 min-h-[44px] rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 text-rose-700 dark:text-rose-200 text-xs font-extrabold",
													children: "Cancel"
												})]
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => void handleDownloadTop10Pack(),
											className: `min-h-[44px] px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${top10CachedCount >= 10 ? "bg-emerald-100 dark:bg-emerald-900/50 text-[#14532D] dark:text-emerald-200" : "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-700/40 text-[#14532D] dark:text-emerald-200"}`,
											children: [!canDownloadTopStoriesAudioPack(user) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3.5 h-3.5 text-amber-600 dark:text-amber-300 shrink-0" }) : top10CachedCount >= 10 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: top10CachedCount >= 10 ? "Top 10 Saved" : `Save Top 10`
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => void handleDownloadAllStoriesPack(),
											className: `min-h-[44px] px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${all49Cached ? "bg-emerald-100 dark:bg-emerald-900/50 text-[#14532D] dark:text-emerald-200" : "bg-[#14532D] dark:bg-emerald-600 text-white hover:bg-emerald-800"}`,
											children: [!canDownloadFullStoryLibraryAudioPack(user) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3.5 h-3.5 text-amber-300 shrink-0" }) : all49Cached ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5 text-amber-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: all49Cached ? `All ${KIDS_STORIES.length} Saved` : `Save All ${KIDS_STORIES.length}`
											})]
										})]
									}),
									prefetchState.status === "error" && prefetchState.lastError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-semibold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 rounded-xl px-2.5 py-2",
										children: prefetchState.lastError
									})
								]
							}),
							!familyUnlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-300 dark:border-amber-700/40 p-3 flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] font-bold text-amber-950 dark:text-amber-200",
									children: [
										"First 6 stories are Free Forever · Unlock all ",
										KIDS_STORIES.length,
										" illustrated stories with 7-Day Free Trial"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => openKidsPaywall(`Unlock all ${KIDS_STORIES.length} illustrated Prophet & Companion stories with Family Plus (₹199/yr · 7-Day Free Trial).`),
									className: "px-3 py-1.5 rounded-xl bg-[#14532D] dark:bg-emerald-600 text-white text-[11px] font-extrabold shrink-0",
									children: "Unlock"
								})]
							})
						] }), activeStory ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: .75,
								y: 6
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .2 },
							className: "rounded-3xl bg-[var(--bg-surface)] p-4 sm:p-5 shadow-md border border-[var(--border-subtle)] space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1.5",
									"aria-label": "Story scene progress",
									children: activeScenes.map((sc, sIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											handleStopStoryNarration();
											setStoryPageIdx(sIdx);
										},
										"aria-label": `Jump to ${sc.sceneLabel}`,
										className: `h-2 flex-1 rounded-full transition ${sIdx === storyPageIdx ? "bg-[#14532D] dark:bg-emerald-400" : sIdx < storyPageIdx ? "bg-[#22C55E]" : "bg-[var(--bg-subtle)]"}`
									}, sc.sceneIndex))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative rounded-2xl overflow-hidden bg-emerald-950",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: currentScene?.illustrationUrl || getStoryCoverArtwork(activeStory),
											alt: `${activeLocalizedTitle} — ${currentScene?.chapterTitle || ""}`,
											loading: "lazy",
											decoding: "async",
											referrerPolicy: "no-referrer",
											className: `w-full h-48 object-cover ${currentScene?.imageFocalClass || "object-center"} transition duration-300`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/65 to-transparent pointer-events-none" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute top-2.5 left-3 right-3 flex items-center justify-between text-white pointer-events-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-extrabold text-amber-200 drop-shadow-xs",
												children: currentScene?.chapterTitle
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[11px] font-bold text-white/90 tabular-nums",
												children: [
													storyPageIdx + 1,
													"/",
													totalStoryScenes
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute bottom-2.5 right-2.5 flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setStorySpeed((prev) => prev === .85 ? 1 : .85),
													className: "px-2.5 min-h-[40px] rounded-full bg-black/65 text-amber-200 text-[11px] font-extrabold backdrop-blur-xs tabular-nums",
													title: "Toggle narration speed",
													children: storySpeed === .85 ? "0.85x Kids" : "1.0x"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													disabled: loadingStudioStoryAudio,
													onClick: () => void handleToggleStoryNarration(),
													className: "px-3.5 min-h-[40px] rounded-full bg-[#16A34A] text-white text-xs font-extrabold shadow-md flex items-center gap-1.5",
													children: loadingStudioStoryAudio ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loading Voice…" })] }) : isCurrentStorySpeaking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pause" })] }) : isCurrentStoryPaused ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3.5 h-3.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Resume" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: storyVoiceMode === "studio" ? "Studio Read" : "Read Aloud" })] })
												}),
												(isCurrentStorySpeaking || isCurrentStoryPaused) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: handleStopStoryNarration,
													"aria-label": "Stop Read Aloud",
													className: "w-10 h-10 rounded-full bg-rose-600 text-white shadow-md flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "w-3.5 h-3.5 fill-current" })
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												handleStopStoryNarration();
												setStoryVoiceMode("studio");
												setStoryVoicePersona("storyteller");
											},
											className: `px-2.5 min-h-[40px] rounded-xl text-[11px] font-extrabold transition ${storyVoiceMode === "studio" && storyVoicePersona === "storyteller" ? "bg-[#14532D] dark:bg-emerald-600 text-white" : "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)]"}`,
											children: "Storyteller"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												handleStopStoryNarration();
												setStoryVoiceMode("studio");
												setStoryVoicePersona("teacher");
											},
											className: `px-2.5 min-h-[40px] rounded-xl text-[11px] font-extrabold transition ${storyVoiceMode === "studio" && storyVoicePersona === "teacher" ? "bg-[#14532D] dark:bg-emerald-600 text-white" : "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)]"}`,
											children: "Gentle Teacher"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [(() => {
											const activeStatus = storyLibrarySummary.storyStatusMap[activeStory.id];
											const activeIdx = KIDS_STORIES.findIndex((s) => s.id === activeStory.id);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												disabled: isPrefetchActive,
												onClick: () => void handlePrefetchSingleStory(activeStory, activeIdx),
												className: `px-2.5 min-h-[40px] rounded-xl text-[11px] font-extrabold flex items-center gap-1 transition ${activeStatus?.isFullyCached ? "bg-emerald-100 dark:bg-emerald-900/50 text-[#14532D] dark:text-emerald-200" : "bg-[var(--bg-surface)] text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700/40"}`,
												children: activeStatus?.isFullyCached ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Saved Offline" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Story" })] })
											});
										})(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												handleStopStoryNarration();
												setStoryVoiceMode("device");
											},
											className: `px-2.5 min-h-[40px] rounded-xl text-[11px] font-bold transition ${storyVoiceMode === "device" ? "bg-amber-400 text-emerald-950 font-extrabold" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"}`,
											children: "Device Voice"
										})]
									})]
								}),
								studioOfflineNotice && studioOfflineNotice.storyId === activeStory.id && studioOfflineNotice.pageIndex === storyPageIdx && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/40 p-3 space-y-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-amber-950 dark:text-amber-200 leading-snug",
										children: studioOfflineNotice.message
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												const activeIdx = KIDS_STORIES.findIndex((s) => s.id === activeStory.id);
												handlePrefetchSingleStory(activeStory, activeIdx);
											},
											className: "px-3.5 min-h-[44px] rounded-xl bg-[#14532D] dark:bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Story Offline" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setStudioOfflineNotice(null);
												setStoryVoiceMode("device");
												storyNarrationTokenRef.current += 1;
												speakKaraokeFromSentence(0, storyNarrationTokenRef.current);
											},
											className: "px-3 min-h-[44px] rounded-xl bg-[var(--bg-surface)] border border-amber-300 dark:border-amber-700/50 text-amber-950 dark:text-amber-200 text-xs font-bold",
											children: "Switch to Device Voice"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-bold text-emerald-700 dark:text-emerald-300 tabular-nums",
										children: [
											activeStory.category,
											" · ",
											activeStory.duration || "4 min",
											" · ",
											currentScene?.sceneLabel || `Scene ${storyPageIdx + 1}`,
											storyLibrarySummary.storyStatusMap[activeStory.id]?.isFullyCached ? " · Ready Offline" : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-extrabold text-[var(--text-primary)] mt-0.5",
										children: activeLocalizedTitle
									}),
									activeStory.sourceReference && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-semibold text-[var(--text-muted)] mt-0.5",
										children: ["Source: ", activeStory.sourceReference]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-1.5 text-sm text-[var(--text-primary)] leading-relaxed",
									children: pageSentences.map((sentence, sIdx) => {
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												if (storyVoiceMode === "studio") {
													handleToggleStoryNarration();
													return;
												}
												storyNarrationTokenRef.current += 1;
												speakKaraokeFromSentence(sIdx, storyNarrationTokenRef.current);
											},
											className: `block w-full text-left rounded-xl px-2.5 py-1.5 transition ${storyActiveSentenceIdx === sIdx && isCurrentStorySpeaking ? "bg-amber-100 dark:bg-amber-900/50 text-emerald-950 dark:text-amber-100 font-semibold shadow-2xs" : "hover:bg-[var(--bg-subtle)]"}`,
											children: sentence
										}, sIdx);
									})
								}),
								currentScene?.calloutText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[var(--bg-subtle)] border border-amber-300/70 dark:border-amber-700/40 p-3.5 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-extrabold text-amber-800 dark:text-amber-300",
										children: currentScene.calloutBadge
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-[var(--text-primary)] leading-relaxed",
										children: currentScene.calloutText
									})]
								}),
								currentScene?.interactiveChoice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-700/40 p-4 space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
											children: currentScene.interactiveChoice.question
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2",
											children: currentScene.interactiveChoice.options.map((choiceOpt, cIdx) => {
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														setStoryChoicePicked(cIdx);
														playGentleCelebrationChime(choiceOpt.isBestChoice ? "star" : "tap");
													},
													className: `w-full text-left p-3 rounded-xl border-2 text-xs font-bold min-h-[48px] transition ${storyChoicePicked === cIdx ? choiceOpt.isBestChoice ? "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-600 text-emerald-950 dark:text-emerald-100" : "bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-950 dark:text-amber-200" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-emerald-400 text-[var(--text-primary)]"}`,
													children: choiceOpt.label
												}, choiceOpt.label);
											})
										}),
										storyChoicePicked !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-[#14532D] dark:text-emerald-200 bg-[var(--bg-surface)] rounded-xl p-3 border border-emerald-200 dark:border-emerald-700/40",
											children: currentScene.interactiveChoice.options[storyChoicePicked]?.feedback
										})
									]
								}),
								relatedQuranRef && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[#0F3826] text-white p-3.5 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[11px] font-extrabold uppercase tracking-wider text-amber-300",
												children: ["Quran Ayah in This Story · ", relatedQuranRef.surahRef]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => playStoryQuranVerse(relatedQuranRef, showKidsToast),
												className: "px-3 py-1.5 rounded-xl bg-amber-400 text-emerald-950 text-[11px] font-extrabold flex items-center gap-1 min-h-[34px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hear Qari" })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											dir: "rtl",
											className: "font-arabic text-xl font-bold text-amber-100 leading-loose text-right",
											children: relatedQuranRef.arabicAyah
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-emerald-100/90 leading-snug",
											children: relatedQuranRef.meaningEn
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-700/40 p-3 space-y-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] font-extrabold uppercase tracking-wider text-[#14532D] dark:text-emerald-300 flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mama / Papa Story Voice" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-[var(--text-secondary)]",
											children: isRecordingStoryVoice ? "Recording your voice for this page… Tap Stop & Save when ready." : customStoryVoiceUrl ? `Saved human family voice note (${customStoryVoiceDuration}s) for Page ${storyPageIdx + 1}` : "Record your own warm voice for bedtime reading on this page"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [customStoryVoiceUrl && !isRecordingStoryVoice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													const trackId = `story-custom-${activeStory.id}-p${storyPageIdx}`;
													if (audioState.activeTrackId === trackId && audioState.status === "playing") {
														audioManager.stopAll();
														return;
													}
													storyNarrationTokenRef.current += 1;
													setStoryActiveSentenceIdx(null);
													audioManager.playAudioUrl({
														id: trackId,
														url: customStoryVoiceUrl,
														rate: 1,
														onError: (msg) => showKidsToast(msg)
													});
												},
												className: "px-3 min-h-[38px] rounded-xl bg-[#14532D] text-white text-[11px] font-extrabold flex items-center gap-1.5",
												children: audioState.activeTrackId === `story-custom-${activeStory.id}-p${storyPageIdx}` && audioState.status === "playing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "w-3 h-3 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Stop" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3 h-3 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Play Mama/Papa" })] })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": "Delete Mama/Papa Voice Recording",
												onClick: async () => {
													audioManager.stopAll();
													await deleteStoryVoiceRecording(activeStory.id, storyPageIdx);
													if (customStoryVoiceUrlRef.current) {
														URL.revokeObjectURL(customStoryVoiceUrlRef.current);
														customStoryVoiceUrlRef.current = null;
													}
													setCustomStoryVoiceUrl(null);
													setCustomStoryVoiceDuration(0);
													showKidsToast("Deleted voice note for this page");
												},
												className: "w-9 h-9 rounded-xl bg-[var(--bg-surface)] border border-rose-200 dark:border-rose-700/50 text-rose-600 dark:text-rose-300 flex items-center justify-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: async () => {
													if (isRecordingStoryVoice) {
														stopActiveStoryVoiceCapture(false);
														return;
													}
													if (!canRecordFamilyStoryVoice(user)) {
														openKidsPaywall("Record custom Mama/Papa bedtime voices for every story page with Family Plus (₹199/yr · 7-Day Free Trial).");
														return;
													}
													if (!isVoiceRecorderSupported()) {
														showKidsToast("Voice recording is not supported on this device browser.");
														return;
													}
													handleStopStoryNarration();
													try {
														const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
														storyVoiceStreamRef.current = stream;
														const mimeType = pickSupportedAudioMimeType();
														const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
														storyVoiceChunksRef.current = [];
														storyVoiceStartRef.current = Date.now();
														const capturedStoryId = activeStory.id;
														const capturedPageIdx = storyPageIdx;
														recorder.ondataavailable = (ev) => {
															if (ev.data && ev.data.size > 0) storyVoiceChunksRef.current.push(ev.data);
														};
														recorder.onstop = async () => {
															if (storyVoiceStreamRef.current) {
																storyVoiceStreamRef.current.getTracks().forEach((tr) => tr.stop());
																storyVoiceStreamRef.current = null;
															}
															setIsRecordingStoryVoice(false);
															const finalType = recorder.mimeType || mimeType || "audio/webm";
															const blob = new Blob(storyVoiceChunksRef.current, { type: finalType });
															storyVoiceChunksRef.current = [];
															if (blob.size < 256) {
																showKidsToast("Recording too short. Hold and read a sentence aloud.");
																return;
															}
															const durationSec = Math.max(1, Math.round((Date.now() - storyVoiceStartRef.current) / 1e3));
															const saved = await saveStoryVoiceRecording({
																key: `${capturedStoryId}:${capturedPageIdx}`,
																storyId: capturedStoryId,
																pageIndex: capturedPageIdx,
																mimeType: finalType,
																blob,
																durationSec,
																recordedAtIso: (/* @__PURE__ */ new Date()).toISOString()
															});
															if (saved.ok) {
																if (customStoryVoiceUrlRef.current) URL.revokeObjectURL(customStoryVoiceUrlRef.current);
																const nextUrl = URL.createObjectURL(blob);
																customStoryVoiceUrlRef.current = nextUrl;
																setCustomStoryVoiceUrl(nextUrl);
																setCustomStoryVoiceDuration(durationSec);
																showKidsToast(`Saved Mama/Papa voice note (${durationSec}s) offline!`);
															} else showKidsToast(saved.error || "Could not save voice recording.");
														};
														storyVoiceRecorderRef.current = recorder;
														recorder.start();
														setIsRecordingStoryVoice(true);
													} catch {
														showKidsToast("Microphone permission denied. Allow mic access to record your voice.");
													}
												},
												className: `px-3 min-h-[38px] rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 transition ${isRecordingStoryVoice ? "bg-rose-600 text-white animate-pulse" : canRecordFamilyStoryVoice(user) ? "bg-amber-400 text-emerald-950 hover:bg-amber-300" : "bg-[var(--bg-surface)] border border-amber-300 dark:border-amber-700/50 text-amber-950 dark:text-amber-200"}`,
												children: isRecordingStoryVoice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "w-3 h-3 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Stop & Save" })] }) : canRecordFamilyStoryVoice(user) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: customStoryVoiceUrl ? "Re-record" : "Record Voice" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3 h-3 text-amber-700 dark:text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Record Voice" })] })
											})]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[#FEF3C7] dark:bg-amber-950/40 p-3.5 text-xs text-amber-950 dark:text-amber-200 flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
										character: "Mizo",
										size: "sm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Moral Lesson:" }),
										" ",
										activeLocalizedMoral
									] })]
								}),
								isLastStoryPage && activeQuiz && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-3.5 space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300",
											children: "Quick Story Check (Earn +5 ★)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-[var(--text-primary)]",
											children: activeQuiz.question
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-1.5",
											children: activeQuiz.options.map((opt, idx) => {
												const isPicked = storyQuizPicked === idx;
												const isCorrect = idx === activeQuiz.correctIndex;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														setStoryQuizPicked(idx);
														if (isCorrect) playGentleCelebrationChime("star");
														else playGentleCelebrationChime("tap");
													},
													className: `w-full text-left px-3 py-2.5 rounded-xl border text-xs font-bold min-h-[42px] transition ${isPicked ? isCorrect ? "bg-emerald-50 dark:bg-emerald-900/50 border-emerald-600 text-emerald-950 dark:text-emerald-100" : "bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-amber-300"}`,
													children: opt
												}, opt);
											})
										}),
										storyQuizPicked !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] font-semibold text-emerald-900 dark:text-emerald-300",
											children: [storyQuizPicked === activeQuiz.correctIndex ? "✓ " : "Hint: ", activeQuiz.explanation]
										})
									]
								}),
								isLastStoryPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setStoryMoralChecked(true);
										playGentleCelebrationChime("tap");
									},
									className: `w-full py-3 rounded-xl border text-xs font-extrabold transition min-h-[44px] ${storyMoralChecked ? "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-500 text-emerald-950 dark:text-emerald-100" : "bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-primary)]"}`,
									children: storyMoralChecked ? "★ Moral Understood! Ready to Finish" : "Tap to Promise: I Will Practice This Lesson Today!"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between pt-1 gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: storyPageIdx === 0,
											onClick: () => {
												handleStopStoryNarration();
												setStoryPageIdx((p) => Math.max(0, p - 1));
											},
											className: "px-4 py-2.5 min-h-[44px] rounded-full bg-[var(--bg-subtle)] disabled:opacity-40 text-xs font-extrabold text-[var(--text-primary)]",
											children: "Previous"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-extrabold text-[var(--text-secondary)] tabular-nums",
											children: [
												"Scene ",
												storyPageIdx + 1,
												" of ",
												totalStoryScenes
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: isLastStoryPage && !canCompleteStoryNow,
											onClick: () => {
												handleStopStoryNarration();
												if (storyPageIdx + 1 < totalStoryScenes) setStoryPageIdx((p) => p + 1);
												else {
													const completion = completeKidsStory(activeStory.id, activeLocalizedTitle);
													playGentleCelebrationChime("lesson_complete");
													setStoryCelebration({
														visible: true,
														title: "Story Completed!",
														subtitle: completion.alreadyCompleted ? `Finished rereading "${activeLocalizedTitle}"!` : `MashaAllah ${activeChild.name}! Earned +${completion.starsAwarded} ★`
													});
													window.setTimeout(() => {
														setStoryCelebration((prev) => ({
															...prev,
															visible: false
														}));
													}, 1800);
													showKidsToast(completion.alreadyCompleted ? `Finished rereading "${activeLocalizedTitle}"!` : `Finished "${activeLocalizedTitle}"! (+${completion.starsAwarded} ★)`);
													setActiveStoryId(null);
													setStoryMoralChecked(false);
													setStoryChoicePicked(null);
													setStoryQuizPicked(null);
												}
											},
											className: "px-4 py-2.5 min-h-[44px] rounded-full bg-[#16A34A] disabled:opacity-45 text-white text-xs font-extrabold shadow-xs",
											children: !isLastStoryPage ? "Next Scene →" : !canCompleteStoryNow ? "Answer Quiz Above" : isActiveStoryAlreadyCompleted ? "Finish Replay ✓" : "Complete (+5 ★)"
										})
									]
								})
							]
						}, `${activeStory.id}-${storyPageIdx}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2.5",
							children: filteredStories.map((story) => {
								const globalIdx = KIDS_STORIES.findIndex((item) => item.id === story.id);
								const unlocked = canAccessStoryIndex(user, globalIdx);
								const isCompleted = Boolean(activeChild.completedStoryIds?.includes(story.id));
								const displayTitle = story.localizedTitles?.[user.language] || story.title;
								const cacheStatus = storyLibrarySummary.storyStatusMap[story.id];
								const isStoryFullyCached = Boolean(cacheStatus?.isFullyCached);
								const partialCachedPages = cacheStatus?.cachedPages ?? 0;
								const totalStoryPages = cacheStatus?.totalPages ?? story.pages.length;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full h-28 rounded-2xl overflow-hidden shadow-md group border border-emerald-950/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											handleStopStoryNarration();
											if (!unlocked) {
												openKidsPaywall(`Unlock "${displayTitle}" and all ${KIDS_STORIES.length} illustrated Prophet & Companion stories with Family Plus (₹199/yr · 7-Day Free Trial).`);
												return;
											}
											setActiveStoryId(story.id);
											setStoryPageIdx(0);
											setStoryMoralChecked(false);
											setStoryQuizPicked(null);
										},
										className: "w-full h-full text-left relative block",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: getStoryCoverArtwork(story),
												alt: displayTitle,
												loading: "lazy",
												decoding: "async",
												className: `absolute inset-0 w-full h-full object-cover transition duration-300 ${unlocked ? "group-hover:scale-105" : "grayscale-[40%] opacity-85"}`
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/15" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "relative z-10 h-full p-4 pr-20 flex items-end justify-between text-white",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px] font-bold text-amber-300 tabular-nums",
													children: [
														story.category,
														STORY_QURAN_VERSES_MAP[story.id] ? " · Quran Verse" : "",
														isCompleted ? " · Completed ★" : "",
														unlocked ? isStoryFullyCached ? " · Offline Voice Ready" : partialCachedPages > 0 ? ` · ${partialCachedPages}/${totalStoryPages} Cached` : "" : " · Family Plus"
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-sm font-extrabold leading-tight max-w-[235px] mt-0.5",
													children: displayTitle
												})] })
											})
										]
									}), unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: isPrefetchActive,
										onClick: () => void handlePrefetchSingleStory(story, globalIdx),
										"aria-label": isStoryFullyCached ? `${displayTitle} saved offline` : `Save ${displayTitle} offline`,
										className: `absolute right-3 bottom-3 z-20 min-w-[44px] min-h-[44px] px-2.5 rounded-xl flex items-center justify-center gap-1 text-[11px] font-extrabold backdrop-blur-xs transition ${isStoryFullyCached ? "bg-emerald-500/90 text-white" : "bg-black/60 text-amber-200 hover:bg-black/80"}`,
										children: isStoryFullyCached ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Saved" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save" })] })
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute right-4 bottom-4 z-20 pointer-events-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 text-amber-300" })
									})]
								}, story.id);
							})
						})]
					})]
				});
			}
			case "adventure_map": {
				const islandPins = [
					{
						num: 8,
						title: "Stars & Night Journey",
						desc: "Earn badges & certificates under the night sky",
						route: "badges",
						top: "18%",
						left: "58%",
						pinBg: "from-amber-300 to-amber-500 text-emerald-950",
						requiredStars: 15
					},
					{
						num: 7,
						title: "Story Village",
						desc: "Prophet stories & noble character adventures",
						route: "stories",
						top: "33%",
						left: "28%",
						pinBg: "from-amber-300 to-amber-500 text-emerald-950",
						requiredStars: 10
					},
					{
						num: 5,
						title: "Salah Garden",
						desc: "Step-by-step Wudu & prayer with Ayaan",
						route: "salah_learning",
						top: "47%",
						left: "64%",
						pinBg: "from-emerald-400 to-emerald-600 text-white",
						requiredStars: 5
					},
					{
						num: 3,
						title: "Dua Garden",
						desc: "Daily Sunnah Duas with Ayla",
						route: "duas_learning",
						top: "60%",
						left: "30%",
						pinBg: "from-amber-300 to-amber-500 text-emerald-950",
						requiredStars: 0
					},
					{
						num: 2,
						title: "Quran Valley",
						desc: "Learn & recite short Surahs with Ayaan",
						route: "quran_learning",
						top: "73%",
						left: "66%",
						pinBg: "from-amber-300 to-amber-500 text-emerald-950",
						requiredStars: 0
					},
					{
						num: 1,
						title: "Ilmizo Home",
						desc: "Your daily 10-minute quest basecamp",
						route: "kids_home",
						top: "87%",
						left: "42%",
						pinBg: "from-amber-300 to-amber-500 text-emerald-950",
						requiredStars: 0
					}
				];
				const activeIsland = islandPins.find((p) => p.num === selectedIslandNum);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0B2838] min-h-[700px] text-white relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/illustrations/kids_adventure_map.webp",
							alt: "Ilmizo Adventure World",
							loading: "lazy",
							decoding: "async",
							className: "absolute inset-0 w-full h-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07182E]/90 via-[#07182E]/50 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
								time: "9:41",
								light: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-4 pt-1 pb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
										variant: "light",
										label: "Back"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "text-base font-extrabold drop-shadow-md",
											children: "Ilmizo Adventure"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-sky-100 font-semibold drop-shadow-xs",
											children: "Explore, learn and unlock new worlds!"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "px-2.5 py-1 rounded-full bg-black/40 border border-amber-300/50 text-amber-300 text-xs font-extrabold flex items-center gap-1 tabular-nums",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3.5 h-3.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activeChild.stars })]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 h-[590px] w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									viewBox: "0 0 100 100",
									preserveAspectRatio: "none",
									className: "absolute inset-0 w-full h-full pointer-events-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "adventurePathGrad",
										x1: "0%",
										y1: "100%",
										x2: "0%",
										y2: "0%",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "#FDE68A"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "50%",
												stopColor: "#4ADE80"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "#F59E0B"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
										d: "M 42 87 C 68 82, 72 76, 66 73 C 54 68, 22 65, 30 60 C 38 54, 72 52, 64 47 C 54 41, 20 39, 28 33 C 36 27, 62 24, 58 18",
										fill: "none",
										stroke: "url(#adventurePathGrad)",
										strokeWidth: "1.2",
										strokeDasharray: "2.5 2",
										strokeLinecap: "round",
										initial: {
											pathLength: 0,
											opacity: .4
										},
										animate: {
											pathLength: 1,
											opacity: .95
										},
										transition: {
											duration: 1.6,
											ease: "easeOut"
										}
									})]
								}),
								islandPins.map((pin, idx) => {
									const isUnlocked = activeChild.stars >= pin.requiredStars;
									const isSelectedPin = selectedIslandNum === pin.num;
									const mascotForPin = pin.num === 3 ? "Ayla" : pin.num === 8 || pin.num === 7 ? "Mizo" : "Ayaan";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
										type: "button",
										onClick: () => setSelectedIslandNum(pin.num),
										style: {
											top: pin.top,
											left: pin.left
										},
										animate: { y: [
											0,
											-5,
											0
										] },
										transition: {
											duration: 2.6 + idx * .25,
											repeat: Infinity,
											ease: "easeInOut"
										},
										whileHover: { scale: 1.1 },
										whileTap: { scale: .92 },
										className: "absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 group z-20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `w-9 h-9 rounded-full bg-gradient-to-b ${pin.pinBg} border-2 ${isSelectedPin ? "border-amber-200 ring-4 ring-amber-400/60" : "border-white"} font-extrabold text-xs flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.5)] tabular-nums shrink-0`,
											children: isUnlocked ? pin.num : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3.5 h-3.5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-3 py-1 rounded-full bg-[#091E3A]/90 border border-amber-300/75 text-white text-[11px] font-extrabold whitespace-nowrap shadow-lg backdrop-blur-xs flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pin.title }), isSelectedPin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
												character: mascotForPin,
												size: "sm",
												interactive: false
											})]
										})]
									}, pin.num);
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: activeIsland && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 20,
										scale: .95
									},
									animate: {
										opacity: 1,
										y: 0,
										scale: 1
									},
									exit: {
										opacity: 0,
										y: 20,
										scale: .95
									},
									className: "absolute bottom-4 inset-x-4 rounded-3xl bg-[#091E3A]/95 border-2 border-amber-300 p-4 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 z-30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
											character: activeIsland.num === 3 ? "Ayla" : "Mizo",
											size: "md",
											mood: "happy"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-extrabold text-amber-300",
												children: activeIsland.title
											}), activeChild.stars < activeIsland.requiredStars && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300 text-amber-200 text-[11px] font-extrabold",
												children: [
													"Requires ",
													activeIsland.requiredStars,
													" ★"
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-sky-100",
											children: activeIsland.desc
										})] })]
									}), activeChild.stars >= activeIsland.requiredStars ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setKidsRoute(activeIsland.route),
										className: "px-4 py-2 rounded-full bg-[#22C55E] text-emerald-950 font-extrabold text-xs shrink-0 shadow-md",
										children: "Enter →"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											showKidsToast(`Earn ${activeIsland.requiredStars - activeChild.stars} more ★ in Today's Quest to unlock ${activeIsland.title}!`);
											setKidsRoute("todays_quest");
										},
										className: "px-3.5 py-2 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-xs shrink-0 shadow-md",
										children: "Earn ★ →"
									})]
								}, activeIsland.num) })
							]
						})
					]
				});
			}
			case "daily_quiz": {
				const kidsQuiz = QUIZ_PACKS[0];
				const currentQ = kidsQuiz.questions[quizQIdx] || kidsQuiz.questions[0];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
							time: "9:41",
							light: resolvedTheme === "dark"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 pt-1 pb-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
									variant: "kids",
									label: "Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-base font-extrabold text-[var(--text-primary)]",
									children: "Daily Quiz"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-extrabold text-[var(--text-muted)] tabular-nums",
									children: [
										quizQIdx + 1,
										"/",
										kidsQuiz.questions.length
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-[#16A34A] transition-all",
										style: { width: `${(quizQIdx + 1) / kidsQuiz.questions.length * 100}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-extrabold text-[var(--text-primary)] pt-1",
									children: currentQ.prompt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2.5",
									children: currentQ.options.map((opt, idx) => {
										const isSelected = quizSelected === idx;
										const isCorrect = idx === currentQ.correctIndex;
										const optionLetters = [
											"A",
											"B",
											"C",
											"D"
										];
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											disabled: quizSelected !== null,
											onClick: () => {
												setQuizSelected(idx);
												if (isCorrect) setKidsQuizScore((s) => s + 1);
												else addNeedsPracticeItem(currentQ.pillar === "history" ? "quran" : currentQ.pillar, `Quiz Review: ${currentQ.prompt}`, currentQ.explanation, "daily_quiz");
											},
											className: `w-full rounded-2xl p-3.5 border text-left font-extrabold text-sm flex items-center justify-between shadow-2xs transition ${quizSelected !== null ? isCorrect ? "bg-[#DCFCE7] dark:bg-emerald-900/50 border-[#22C55E] ring-1 ring-[#22C55E]/40 text-emerald-950 dark:text-emerald-100" : isSelected ? "bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)]" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-emerald-500/40"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-300/60 dark:border-amber-400/35 text-amber-900 dark:text-amber-200 flex items-center justify-center text-xs font-extrabold shrink-0",
													children: optionLetters[idx % optionLetters.length]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt })]
											}), quizSelected !== null && isCorrect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 stroke-[3]" })
											})]
										}, idx);
									})
								}),
								quizSelected !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[#FEF3C7] dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/40 p-3 flex items-center gap-2.5 text-xs text-amber-950 dark:text-amber-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
										character: "Mizo",
										size: "sm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold",
										children: currentQ.explanation
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: quizSelected === null,
									onClick: () => {
										if (quizQIdx + 1 < kidsQuiz.questions.length) {
											setQuizQIdx((i) => i + 1);
											setQuizSelected(null);
										} else {
											recordQuizAttempt({
												quizId: kidsQuiz.id,
												quizTitle: kidsQuiz.title,
												score: kidsQuizScore,
												total: kidsQuiz.questions.length,
												mode: "kids",
												childId: activeChild.id
											});
											completeKidsQuestStep("quiz", "Daily Quiz Completed");
											setQuizQIdx(0);
											setQuizSelected(null);
											setKidsQuizScore(0);
											setKidsRoute("mission_complete");
										}
									},
									className: "w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] disabled:opacity-40 text-white font-extrabold text-sm shadow-md mt-2",
									children: quizQIdx + 1 < kidsQuiz.questions.length ? "Next Question" : "Finish Quiz"
								})
							]
						})
					]
				});
			}
			case "good_deed": {
				const deedPrompts = [
					"Help someone at home today without being asked.",
					"Water a plant or feed birds with kindness.",
					"Put away your toys and books neatly with a smile."
				];
				const activeDeedPrompt = deedPrompts[selectedDeedIdx] || deedPrompts[0];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-b-[28px] bg-[#92400E] text-white shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
								time: "9:41",
								light: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-4 pt-1 pb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
										variant: "light",
										label: "Back"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-base font-extrabold",
										children: t("todays_good_deed")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSelectedDeedIdx((i) => (i + 1) % deedPrompts.length),
										className: "w-11 h-11 rounded-full bg-black/20 flex items-center justify-center text-amber-200",
										title: "Another Good Deed Idea",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-56 w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/assets/illustrations/kids_good_deed.webp",
									alt: "Ayaan Watering Plant",
									loading: "lazy",
									decoding: "async",
									className: "w-full h-full object-cover"
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 pt-5 text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-extrabold text-[var(--text-primary)] leading-snug max-w-[260px] mx-auto",
								children: activeDeedPrompt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-700/40 rounded-xl px-3 py-1.5",
								children: "Parent Hub Verification: Mom or Dad can confirm your Good Deed in Parent Hub!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										submitKidsGoodDeed(activeDeedPrompt, "Completed Today’s Good Deed mission.");
										completeKidsQuestStep("family", "Today’s Good Deed");
										showKidsToast("Good Deed sent to Parent Hub for confirmation!");
										setKidsRoute("mission_complete");
									},
									className: "w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md",
									children: "Mark as Done"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setKidsRoute("kids_home"),
									className: "w-full py-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-extrabold text-xs",
									children: "Maybe Later"
								})]
							})
						]
					})]
				});
			}
			case "family_challenge": {
				const familyPrompts = [
					"Help set the table for today’s meal.",
					"Recite Dua Before Eating together with your family.",
					"Say Assalamu Alaikum first to everyone at home."
				];
				const activeFamilyPrompt = familyPrompts[selectedFamilyIdx] || familyPrompts[0];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-b-[28px] bg-sky-800 text-white shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
								time: "9:41",
								light: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-4 pt-1 pb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
										variant: "light",
										label: "Back"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-base font-extrabold",
										children: t("family_challenge")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSelectedFamilyIdx((i) => (i + 1) % familyPrompts.length),
										className: "w-11 h-11 rounded-full bg-black/20 flex items-center justify-center text-amber-200",
										title: "Switch Family Challenge",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-56 w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/assets/illustrations/kids_family_challenge.webp",
									alt: "Family Challenge",
									loading: "lazy",
									decoding: "async",
									className: "w-full h-full object-cover"
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 pt-6 text-center space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-extrabold text-[var(--text-primary)] leading-snug max-w-[250px] mx-auto",
								children: activeFamilyPrompt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									submitKidsGoodDeed(`Family Challenge: ${activeFamilyPrompt}`, "Completed with family");
									completeKidsQuestStep("family", "Family Challenge");
									showKidsToast("MashaAllah! Family Challenge recorded!");
									setKidsRoute("mission_complete");
								},
								className: "w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md",
								children: "I Did It!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[#FEF3C7] dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/40 p-3.5 text-xs text-amber-950 dark:text-amber-200 font-bold flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-4 h-4 text-amber-600 dark:text-amber-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Tip:" }), " A small act of kindness can make a big difference."] })]
							})
						]
					})]
				});
			}
			case "mission_complete": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-b-[32px] bg-[#0F3826] text-white shadow-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
							time: "9:41",
							light: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 pt-1 pb-2 relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
									variant: "light",
									label: "Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-base font-extrabold",
									children: "Mission Complete"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-11 h-11" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-56 w-full relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/illustrations/kids_mission_complete.webp",
								alt: "Mission Complete",
								loading: "lazy",
								decoding: "async",
								className: "w-full h-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[var(--bg-app)] via-transparent to-transparent" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 pt-2 text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-3 -mt-8 relative z-20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
									character: "Ayaan",
									size: "md",
									mood: "celebrating"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
									character: "Mizo",
									size: "lg",
									mood: "celebrating"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
									character: "Ayla",
									size: "md",
									mood: "celebrating"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								scale: .92
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							transition: {
								type: "spring",
								stiffness: 320,
								damping: 20
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-extrabold text-[#14532D] dark:text-emerald-300",
									children: "MashaAllah!"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-extrabold text-[var(--text-primary)]",
									children: "Mission Complete!"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-[var(--text-secondary)] mt-1",
									children: [
										"You completed ",
										completedStepsCount,
										" of 5 learning activities today (",
										activeChild.stars,
										" ★ total)."
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-3 rounded-2xl bg-[var(--bg-surface)] border border-amber-200 dark:border-amber-700/40 px-5 py-3 shadow-2xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-7 h-7 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-base font-extrabold text-[var(--text-primary)] tabular-nums",
									children: [activeChild.activeMinutesToday, " min"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[var(--text-secondary)]",
									children: "active learning"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2.5 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setKidsRoute("kids_progress"),
								className: "w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md",
								children: "See What I Learned →"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setKidsRoute("kids_home"),
								className: "w-full py-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-extrabold text-xs",
								children: "Keep Exploring"
							})]
						})
					]
				})]
			});
			case "kids_progress": {
				const periodStats = aggregateKidsProgressByPeriod({
					child: activeChild,
					learningEvents,
					period: progressRange
				});
				const confirmedDeedsCount = periodStats.confirmedDeedsCount;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
							time: "9:41",
							light: resolvedTheme === "dark"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 pt-1 pb-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
									variant: "kids",
									label: "Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-base font-extrabold text-[var(--text-primary)]",
									children: "My Progress"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setKidsRoute("needs_practice"),
									className: "w-11 h-11 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center",
									title: "Needs Practice",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4 text-[var(--text-secondary)]" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-1 bg-[var(--bg-subtle)] p-1 rounded-full",
									children: [
										"Week",
										"Month",
										"All Time"
									].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setProgressRange(r),
										className: `py-1.5 rounded-full text-xs font-extrabold transition ${progressRange === r ? "bg-[#16A34A] text-white shadow-2xs" : "text-[var(--text-secondary)]"}`,
										children: r
									}, r))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-2.5 text-center pt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-16 h-16 rounded-full bg-gradient-to-b from-sky-200 to-sky-400 border-2 border-amber-300 shadow-sm flex items-center justify-center text-sky-950",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-7 h-7" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold text-[var(--text-primary)] mt-1.5",
													children: "Quran"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px] text-[var(--text-secondary)] tabular-nums",
													children: [periodStats.quranCount, " lessons"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-16 h-16 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 border-2 border-amber-300 shadow-sm flex items-center justify-center text-amber-950",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-7 h-7" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold text-[var(--text-primary)] mt-1.5",
													children: "Duas"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px] text-[var(--text-secondary)] tabular-nums",
													children: [periodStats.duasCount, " practiced"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-16 h-16 rounded-full bg-gradient-to-b from-emerald-200 to-emerald-400 border-2 border-amber-300 shadow-sm flex items-center justify-center text-emerald-950",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-7 h-7" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold text-[var(--text-primary)] mt-1.5",
													children: "Salah"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px] text-[var(--text-secondary)] tabular-nums",
													children: [periodStats.salahCount, " lessons"]
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-extrabold text-[var(--text-primary)]",
										children: [
											"Good Deeds Confirmed by Parent: ",
											confirmedDeedsCount,
											"/",
											activeChild.goodDeeds.length
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-[var(--text-secondary)]",
										children: [
											"Streak: ",
											activeChild.streakDays,
											" days · Total Stars: ",
											activeChild.stars,
											" ★ · ",
											periodStats.activeDaysInPeriod,
											" active day(s) in ",
											progressRange
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncStatusBadge, {})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs font-extrabold text-[var(--text-primary)]",
										children: "Recent Activity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)] divide-y divide-[var(--divider)] shadow-2xs overflow-hidden",
										children: activeChild.recentActivities.map((act, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
													character: idx % 3 === 0 ? "Ayaan" : idx % 3 === 1 ? "Ayla" : "Mizo",
													size: "sm"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold text-[var(--text-primary)]",
													children: act.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-[var(--text-muted)] capitalize",
													children: act.pillar
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] text-[var(--text-muted)] font-bold",
												children: act.timestamp
											})]
										}, act.id))
									})]
								})
							]
						})
					]
				});
			}
			case "needs_practice": {
				const unresolved = activeChild.needsPractice.filter((np) => !np.resolved);
				const firstItem = unresolved[0];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
							time: "9:41",
							light: resolvedTheme === "dark"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 pt-1 pb-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
									variant: "kids",
									label: "Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-base font-extrabold text-[var(--text-primary)]",
									children: t("lets_practice")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 text-xs font-extrabold tabular-nums",
									children: unresolved.length
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 pt-2 text-center space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								onClick: () => triggerAyaanInteraction("Every time we practice a tricky verse, Allah gives us double reward!"),
								animate: { y: [
									0,
									-4,
									0
								] },
								transition: {
									duration: 3.2,
									repeat: Infinity,
									ease: "easeInOut"
								},
								whileHover: { scale: 1.02 },
								whileTap: { scale: .97 },
								className: "relative rounded-3xl overflow-hidden border border-pink-200/80 dark:border-pink-800/45 shadow-sm h-52 cursor-pointer",
								title: "Tap Ayla for encouragement!",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/assets/illustrations/kids_needs_practice_ayla.webp",
									alt: "Ayla Let's Practice",
									loading: "lazy",
									decoding: "async",
									className: "w-full h-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-[var(--bg-surface)]/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-sm border border-pink-200 dark:border-pink-800/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
										character: "Ayla",
										size: "sm",
										mood: "happy"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-extrabold text-rose-900 dark:text-rose-200",
										children: "Tap Ayla for a tip!"
									})]
								})]
							}), firstItem ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-extrabold text-[var(--text-primary)] max-w-[260px] mx-auto leading-relaxed",
									children: [
										"You had some mistakes in ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: firstItem.title }),
										". Let’s practice this one more time!"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2 text-left",
									children: unresolved.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-surface)] p-3 border border-amber-200 dark:border-amber-700/40 flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-extrabold text-[var(--text-primary)]",
											children: item.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-[var(--text-secondary)]",
											children: item.prompt
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												resolveNeedsPracticeItem(item.id);
												setKidsRoute(item.targetRoute);
											},
											className: "px-3 py-1.5 rounded-xl bg-[#16A34A] text-white text-xs font-extrabold shrink-0",
											children: "Practice"
										})]
									}, item.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2.5 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											resolveNeedsPracticeItem(firstItem.id);
											setKidsRoute(firstItem.targetRoute);
										},
										className: "w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md",
										children: "Practice Now"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setKidsRoute("kids_home"),
										className: "w-full py-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-extrabold text-xs",
										children: "Maybe Later"
									})]
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-extrabold text-emerald-950 dark:text-emerald-200",
								children: "MashaAllah! You practiced all your tricky items. Let’s review Surah Al-Ikhlas together!"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setKidsRoute("quran_learning"),
									className: "w-full py-3.5 rounded-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-extrabold text-sm shadow-md",
									children: "Practice Now"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setKidsRoute("kids_home"),
									className: "w-full py-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-extrabold text-xs",
									children: "Maybe Later"
								})]
							})] })]
						})
					]
				});
			}
			case "badges": {
				const inspectedBadge = KIDS_BADGES_CATALOG.find((b) => b.id === selectedBadgeId) || KIDS_BADGES_CATALOG[0];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
										variant: "light",
										label: "Back"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-base font-extrabold",
										children: t("my_badges")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-5 h-5 text-amber-300" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-4 grid grid-cols-2 gap-1.5 bg-black/25 p-1 rounded-full",
								children: ["Badges", "Certificates"].map((tabName) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setBadgeTab(tabName);
										if (tabName === "Certificates") setKidsRoute("certificate");
									},
									className: `py-1.5 rounded-full text-xs font-extrabold transition ${badgeTab === tabName ? "bg-amber-400 text-emerald-950 shadow-2xs" : "text-emerald-100/85 hover:text-white"}`,
									children: tabName
								}, tabName))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pt-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2.5",
								children: KIDS_BADGES_CATALOG.map((badge) => {
									const earned = activeChild.earnedBadgeIds.includes(badge.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kids3DMetallicBadge, {
										badgeId: badge.id,
										title: badge.title,
										earned,
										selected: selectedBadgeId === badge.id,
										onClick: () => setSelectedBadgeId(badge.id)
									}, badge.id);
								})
							}),
							inspectedBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 flex items-center justify-between gap-3 shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
										character: "Mizo",
										size: "sm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-extrabold text-[var(--text-primary)]",
										children: inspectedBadge.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-[var(--text-secondary)]",
										children: inspectedBadge.subtitle
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 shrink-0",
									children: activeChild.earnedBadgeIds.includes(inspectedBadge.id) ? "Unlocked ★" : "Keep Learning"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setKidsRoute("certificate"),
									className: "py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "My Certificate" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMode("parent"),
									className: "py-3.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[#14532D] dark:text-emerald-300 font-extrabold text-xs shadow-2xs flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Parent Hub" })]
								})]
							})
						]
					})]
				});
			}
			case "certificate": {
				const achievementsList = getChildCertificateAchievements(activeChild.completedSurahs);
				const activeCertTitle = achievementsList[certAchievementIdx % achievementsList.length] || "Surah Al-Ikhlas";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-24 bg-[#0F3826] min-h-full text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
							time: "9:41",
							light: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 pt-1 pb-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, {
									variant: "light",
									label: "Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-base font-extrabold",
									children: "Certificate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCertAchievementIdx((i) => i + 1),
									className: "px-3.5 py-2 min-h-[40px] rounded-full border border-white/40 text-xs font-bold",
									children: "Switch"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 pt-1 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-[#FFFDF7] border-[5px] border-[#D4AF37] p-5 text-center text-slate-900 shadow-2xl space-y-2.5 relative overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-block text-sm font-extrabold text-[#14532D] tracking-wider",
										children: ["iLMiZO ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-amber-500",
											children: "KIDS"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-base font-extrabold text-slate-900",
										children: "Certificate of Achievement"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-500",
										children: "This is to celebrate that"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-extrabold text-[#14532D]",
										children: activeChild.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-500",
										children: "has completed"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg font-extrabold text-slate-900",
										children: activeCertTitle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-slate-600 max-w-[230px] mx-auto leading-relaxed",
										children: "With effort, sincerity and love for Allah. May Allah accept and increase you in knowledge and Iman."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-end justify-between pt-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
											character: activeChild.avatar,
											size: "lg"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] font-bold text-slate-600",
												children: ["Date: ", (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
													day: "numeric",
													month: "short",
													year: "numeric"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-amber-700 font-bold inline-flex items-center gap-1 justify-end",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-700 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"Verified Ilmizo Seal (",
													activeChild.stars,
													" ★)"
												] })]
											})]
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											if (navigator.share) navigator.share({
												title: `${activeChild.name}'s Ilmizo Certificate`,
												text: `MashaAllah! ${activeChild.name} completed ${activeCertTitle} on Ilmizo Kids!`
											}).catch(() => {});
											else showKidsToast(`Copied ${activeChild.name}'s certificate summary!`);
										},
										className: "py-2.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] border border-white/15 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-3.5 h-3.5 text-[#14532D] dark:text-emerald-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Share" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => handleDownloadCertificateSvg(activeCertTitle),
										className: "py-2.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] border border-white/15 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5 text-[#14532D] dark:text-emerald-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => window.print(),
										className: "py-2.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] border border-white/15 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "w-3.5 h-3.5 text-[#14532D] dark:text-emerald-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Print" })]
									})
								]
							})]
						})
					]
				});
			}
			default: return null;
		}
	};
	if (isKidsScreenTimeLocked) {
		const effectiveLimitMinutes = Math.max(1, activeChild.dailyGoalMinutes || 10) + Math.max(0, activeChild.extraMinutesGrantedToday || 0);
		const usedSeconds = typeof activeChild.activeSecondsToday === "number" ? activeChild.activeSecondsToday : Math.round((activeChild.activeMinutesToday || 0) * 60);
		const usedMins = Math.floor(usedSeconds / 60);
		const resetHour = user.kidsDailyResetHour ?? 0;
		const resetTimeLabel = resetHour === 0 ? "12:00 AM (Midnight)" : resetHour < 12 ? `${resetHour}:00 AM` : resetHour === 12 ? "12:00 PM (Noon)" : `${resetHour - 12}:00 PM`;
		const handleLockPinDigit = (digit) => {
			setLockErrorMsg(null);
			if (lockPinDigits.length >= 4) return;
			const nextPin = lockPinDigits + digit;
			setLockPinDigits(nextPin);
			if (nextPin.length === 4) unlockKidsScreenTimeAsync(nextPin, lockUnlockAction).then((res) => {
				if (res.ok) {
					setLockPinDigits("");
					setLockErrorMsg(null);
					showKidsToast(lockUnlockAction === "grant_10m" ? "Parent unlocked +10 extra minutes!" : lockUnlockAction === "grant_15m" ? "Parent unlocked +15 extra minutes!" : "Parent unlocked Kids World for today!");
				} else {
					setLockErrorMsg(res.error || "Incorrect Parent PIN.");
					window.setTimeout(() => setLockPinDigits(""), 320);
				}
			});
		};
		const handleLockRecoveryReset = () => {
			setLockRecoveryMsg(null);
			resetParentPinWithRecoveryCodeAsync(lockRecoveryCodeInput, lockRecoveryNewPin).then((res) => {
				if (!res.ok) {
					setLockRecoveryMsg({
						ok: false,
						text: res.error || "Recovery verification failed."
					});
					return;
				}
				setLockRecoveryMsg({
					ok: true,
					text: "Parent PIN reset! Enter your new 4-digit PIN above to unlock."
				});
				setLockRecoveryCodeInput("");
				setLockRecoveryNewPin("");
				setShowLockRecovery(false);
			});
		};
		const handleRedeemVoucher = () => {
			setLockVoucherMsg(null);
			redeemParentTimeVoucherAsync(lockVoucherInput).then((res) => {
				if (!res.ok) {
					setLockVoucherMsg({
						ok: false,
						text: res.error || "Could not redeem time voucher."
					});
					return;
				}
				setLockVoucherInput("");
				setShowLockVoucher(false);
				showKidsToast(res.action === "grant_10m" ? "Time Voucher redeemed: +10 extra minutes!" : res.action === "grant_15m" ? "Time Voucher redeemed: +15 extra minutes!" : "Time Voucher redeemed: Unlocked for today!");
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "kids-screen-time-lock-title",
			className: "min-h-dvh flex-1 flex flex-col justify-between bg-[#0F3826] text-white p-5 select-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
					time: "9:41",
					light: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 my-auto py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-16 h-16 rounded-3xl bg-amber-400/20 border-2 border-amber-300/60 flex items-center justify-center mx-auto shadow-lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-8 h-8 text-amber-300" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-[11px] font-extrabold text-amber-200 uppercase tracking-wider",
									children: "Parent Screen-Time Lock Active"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									id: "kids-screen-time-lock-title",
									className: "text-xl font-extrabold text-white",
									children: [
										"Great Job Today, ",
										activeChild.name,
										"!"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-emerald-100/90 leading-relaxed max-w-xs mx-auto",
									children: [
										"You have reached today’s Kids World learning time limit (",
										usedMins,
										"m / ",
										effectiveLimitMinutes,
										"m used). Time to rest your eyes, play offline, or ask a parent to unlock more time."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-amber-200/90 font-semibold",
									children: ["Automatically resets daily at ", resetTimeLabel]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-white/10 border border-white/15 p-3 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold text-emerald-100 text-center",
									children: "Parent: Choose action & enter 4-digit Parent PIN"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-1.5",
									children: [
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
											setLockUnlockAction(opt.id);
											setLockErrorMsg(null);
										},
										className: `py-2 px-2 rounded-xl text-xs font-extrabold transition ${lockUnlockAction === opt.id ? "bg-amber-400 text-slate-950 shadow-xs" : "bg-white/10 text-white hover:bg-white/15"}`,
										children: opt.label
									}, opt.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-center gap-3 py-2",
									children: [
										0,
										1,
										2,
										3
									].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-4 h-4 rounded-full border-2 transition ${lockPinDigits.length > i ? "bg-amber-300 border-amber-300 scale-110" : "border-white/50 bg-transparent"}` }, i))
								}),
								lockErrorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-rose-300 text-center bg-rose-950/50 border border-rose-400/30 rounded-xl py-1.5 px-2",
									children: lockErrorMsg
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-2 pt-1 max-w-[250px] mx-auto",
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
											onClick: () => handleLockPinDigit(digit),
											className: "h-11 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-base font-extrabold text-white transition",
											children: digit
										}, digit)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setLockPinDigits("");
												setLockErrorMsg(null);
											},
											className: "h-11 rounded-2xl bg-white/10 hover:bg-white/20 text-[11px] font-bold text-emerald-100",
											children: "Clear"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleLockPinDigit("0"),
											className: "h-11 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-base font-extrabold text-white transition",
											children: "0"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setLockPinDigits((p) => p.slice(0, -1)),
											className: "h-11 rounded-2xl bg-white/10 hover:bg-white/20 text-[11px] font-bold text-emerald-100",
											children: "⌫"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setShowLockRecovery((v) => !v);
									setLockRecoveryMsg(null);
								},
								className: "text-xs font-bold text-amber-200 underline underline-offset-2",
								children: showLockRecovery ? "Hide Recovery Code Reset" : "Forgot Parent PIN? Use Recovery Code"
							})
						}),
						lockRecoveryMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `rounded-xl p-2.5 text-xs font-bold text-center ${lockRecoveryMsg.ok ? "bg-emerald-900/70 border border-emerald-400/40 text-emerald-100" : "bg-rose-950/70 border border-rose-400/40 text-rose-200"}`,
							children: lockRecoveryMsg.text
						}),
						showLockRecovery && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-white/10 border border-white/20 p-3.5 space-y-2.5 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold text-amber-200",
									children: "Reset Parent PIN with Saved Recovery Code"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-emerald-100/90 leading-relaxed",
									children: [
										"Enter the recovery code (e.g. ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono",
											children: "ILMZ-XXXX-XXXX"
										}),
										") saved when configuring your Parent PIN. Without either the PIN or recovery code, a local browser storage reset is required."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: lockRecoveryCodeInput,
									onChange: (e) => setLockRecoveryCodeInput(e.target.value.toUpperCase()),
									placeholder: "ILMZ-XXXX-XXXX",
									className: "w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/25 text-xs font-mono text-white placeholder:text-slate-400"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									inputMode: "numeric",
									maxLength: 4,
									value: lockRecoveryNewPin,
									onChange: (e) => setLockRecoveryNewPin(e.target.value.replace(/\D/g, "").slice(0, 4)),
									placeholder: "New 4-digit PIN",
									className: "w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/25 text-xs font-mono text-white placeholder:text-slate-400"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleLockRecoveryReset,
									className: "w-full py-2.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs",
									children: "Verify Recovery Code & Reset PIN"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center pt-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setShowLockVoucher((v) => !v);
									setLockVoucherMsg(null);
								},
								className: "text-xs font-bold text-emerald-200 underline underline-offset-2",
								children: showLockVoucher ? "Hide Parent Time Voucher" : "Have a Parent Time Voucher Code?"
							})
						}),
						lockVoucherMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `rounded-xl p-2.5 text-xs font-bold text-center ${lockVoucherMsg.ok ? "bg-emerald-900/70 border border-emerald-400/40 text-emerald-100" : "bg-rose-950/70 border border-rose-400/40 text-rose-200"}`,
							children: lockVoucherMsg.text
						}),
						showLockVoucher && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-white/10 border border-white/20 p-3.5 space-y-2.5 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold text-emerald-200",
									children: "Redeem Single-Use Parent Time Voucher"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-emerald-100/90 leading-relaxed",
									children: [
										"Enter the one-time code issued from Parent Hub (e.g.",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono",
											children: "ILMZ-10M-XXXXXX-YYYYYYYY"
										}),
										") to grant extra time for ",
										activeChild.name,
										"."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: lockVoucherInput,
									onChange: (e) => setLockVoucherInput(e.target.value.toUpperCase()),
									placeholder: "ILMZ-10M-XXXXXX-YYYYYYYY",
									className: "w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/25 text-xs font-mono text-white placeholder:text-slate-400"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleRedeemVoucher,
									disabled: !lockVoucherInput.trim(),
									className: "w-full py-2.5 rounded-xl bg-emerald-400 disabled:opacity-40 text-slate-950 font-extrabold text-xs",
									children: "Verify & Redeem Time Voucher"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2.5 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMode("adult"),
						className: "w-full py-3 rounded-2xl bg-[var(--bg-surface)] text-[#14532D] dark:text-emerald-300 border border-white/15 font-extrabold text-xs shadow-md flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Exit Kids World to Adult Mode" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-emerald-200/80 text-center leading-relaxed",
						children: "App usage controls: enforces daily time limits inside Ilmizo. For full device-level locking, pair with iOS Screen Time or Android Family Link."
					})]
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		...kidsSwipeHandlers,
		className: "relative min-h-dvh flex-1 flex flex-col bg-[var(--bg-app)] text-[var(--text-primary)] touch-pan-y",
		children: [
			kidsToast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#14532D] text-amber-200 border border-amber-300 px-4 py-2 rounded-full shadow-lg text-xs font-extrabold flex items-center gap-2 max-w-[90vw]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-amber-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: kidsToast
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 will-change-transform",
				style: {
					transform: kidsSwipeFeedback.offsetX ? `translateX(${kidsSwipeFeedback.offsetX}px)` : void 0,
					transition: kidsSwipeFeedback.swiping ? "none" : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					initial: false,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: prefersReducedMotion ? { opacity: 0 } : {
							opacity: 0,
							y: 8
						},
						animate: prefersReducedMotion ? { opacity: 1 } : {
							opacity: 1,
							y: 0
						},
						exit: prefersReducedMotion ? { opacity: 0 } : {
							opacity: 0,
							y: -4
						},
						transition: {
							duration: prefersReducedMotion ? .01 : .17,
							ease: "easeOut"
						},
						className: "flex-1 flex flex-col",
						children: renderKidsScreen()
					}, kidsRoute)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Kids World Navigation",
				className: "sticky bottom-0 left-0 right-0 z-30 bg-[var(--bg-surface)]/95 backdrop-blur-md border-t border-[var(--border-subtle)] px-2 pt-1.5 pb-safe shadow-[0_-6px_20px_rgba(0,0,0,0.08)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-5 items-center max-w-2xl mx-auto",
					children: [
						{
							id: "kids_home",
							label: t("home"),
							icon: House,
							match: [
								"kids_home",
								"todays_quest",
								"good_deed",
								"family_challenge",
								"mission_complete"
							]
						},
						{
							id: "quran_learning",
							label: "Qaida",
							icon: BookOpen,
							match: [
								"quran_learning",
								"recitation_practice",
								"duas_learning",
								"salah_learning"
							]
						},
						{
							id: "stories",
							label: "Stories",
							icon: Sparkles,
							match: ["stories"]
						},
						{
							id: "adventure_map",
							label: "Map",
							icon: Compass,
							match: ["adventure_map"]
						},
						{
							id: "kids_progress",
							label: "Stars",
							icon: Trophy,
							match: [
								"kids_progress",
								"needs_practice",
								"daily_quiz",
								"badges",
								"certificate"
							]
						}
					].map((nav) => {
						const Icon = nav.icon;
						const active = nav.match.includes(kidsRoute);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setKidsRoute(nav.id),
							"aria-current": active ? "page" : void 0,
							className: "flex flex-col items-center justify-center py-0.5 min-h-[52px] transition active:scale-95",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `px-3.5 py-1.5 rounded-2xl flex flex-col items-center justify-center transition ${active ? "bg-[#16A34A]/15 dark:bg-emerald-500/20 text-[#15803D] dark:text-emerald-300 font-extrabold" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-[18px] h-[18px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold mt-0.5 whitespace-nowrap leading-none",
									children: nav.label
								})]
							})
						}, nav.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CelebrationBurst, {
				visible: storyCelebration.visible,
				title: storyCelebration.title,
				subtitle: storyCelebration.subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyPlusPaywallModal, {
				open: kidsPaywallOpen,
				onClose: () => setKidsPaywallOpen(false),
				triggerReason: kidsPaywallReason,
				onUnlocked: (msg) => showKidsToast(msg)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SleepTimerSheet, {
				open: kidsSleepSheetOpen,
				onClose: () => setKidsSleepSheetOpen(false),
				title: "Bedtime Sleep Timer"
			})
		]
	});
};
export { KidsWorldView };
