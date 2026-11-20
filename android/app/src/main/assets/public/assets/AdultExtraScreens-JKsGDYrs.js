const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LocalDataManagerCard-DOnUkM8q.js","assets/rolldown-runtime-DQp2zzRu.js","assets/vendor-icons-DCckKQxi.js","assets/vendor-motion-DfqbQRzE.js","assets/data-islamic-content-DVwdNHPG.js","assets/index-Dy1fifCC.js","assets/vendor-react-CoNEUsWJ.js","assets/vendor-capacitor-BtYYifC8.js","assets/index-Bo1dxC-b.css","assets/studioAudioAndTajweedService-DF0oWwfx.js","assets/nooraniQaidaCourse-DdAqOF7e.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./rolldown-runtime-DQp2zzRu.js";
import { At as Award, C as ShieldCheck, D as Search, Dt as Bell, E as Settings, Ft as require_react, H as LocateFixed, M as Plus, Mt as ArrowRight, O as RotateCcw, St as Calendar, Tt as BookOpen, V as Lock, X as Globe, _ as Sparkles, _t as ChevronRight, bt as Check, c as User, d as Trash2, dt as Clock, et as FileText, gt as ChevronUp, h as Star, i as Wallet, mt as CircleCheck, o as Volume2, ot as Download, pt as CircleQuestionMark, ut as Compass, vt as ChevronLeft, wt as Bookmark, yt as ChevronDown } from "./vendor-icons-DCckKQxi.js";
import { i as require_jsx_runtime, n as useReducedMotion, t as motion } from "./vendor-motion-DfqbQRzE.js";
import { X as computeLearningStreak, Y as computeHijriDate, Z as computeQiblaFromCoords, a as QUIZ_PACKS, c as TOP_QURAN_VOCAB, d as TOP_600_TARGET_COVERAGE_PCT, f as computeVocabCoverageStats, g as ALL_114_SURAHS, n as ISLAMIC_LESSONS, nt as getLocalDateKeyWithOffset, q as aggregateAdultProgressByPeriod, st as scoreQuizSubmission } from "./data-islamic-content-DVwdNHPG.js";
import { r as __vitePreload } from "./vendor-capacitor-BtYYifC8.js";
import { E as canAccessVocabIndex, R as isAdultPlusActive, _t as ScreenBackButton, a as PrimaryButton, c as SettingsRow, ct as isHapticsEnabled, d as ThemeModeSegmentedControl, dt as triggerSelectionHaptic, gt as MobileStatusBar, i as InfoDisclosure, lt as setHapticsEnabled, mt as CharacterAvatar, ot as SelectSheetField, r as EmptyState, s as SettingsGroup, st as BottomSheet, ut as triggerLightHaptic, v as useIlmizo, vt as SyncStatusBadge, xt as useAudioManager, y as useTranslation, yt as VerifiedSourceFooter } from "./index-Dy1fifCC.js";
import { t as FamilyPlusPaywallModal } from "./FamilyPlusPaywallModal-B_X5oIMT.js";
import { S as setPersistentPrayerCountdownEnabled, b as getPrayerWidgetPlatformCapability, x as isPersistentPrayerCountdownEnabled } from "./storyVoiceRecorder-CtwnVwnJ.js";
import { n as useSeniorMinimalMode, r as OemBatteryGuardSheet, t as TasbihTapRing } from "./AdultModeView-B1sEPexT.js";
// src/components/adult/QuranVocabMasteryView.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var QuranVocabMasteryView = ({ words, masteredVocabIds, onToggleMastered, freeVocabLimit, adultPlusUnlocked, onOpenPaywall }) => {
	const [search, setSearch] = (0, import_react.useState)("");
	const [tierFilter, setTierFilter] = (0, import_react.useState)("all");
	const [grammarFilter, setGrammarFilter] = (0, import_react.useState)("All");
	const [expandedWordId, setExpandedWordId] = (0, import_react.useState)(words[0]?.id ?? null);
	const [visibleCount, setVisibleCount] = (0, import_react.useState)(40);
	const stats = (0, import_react.useMemo)(() => computeVocabCoverageStats(words, masteredVocabIds), [words, masteredVocabIds]);
	const masteredSet = (0, import_react.useMemo)(() => new Set(masteredVocabIds), [masteredVocabIds]);
	const filteredEntries = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return words.map((word, index) => ({
			word,
			index
		})).filter(({ word, index }) => {
			const rank = word.frequencyRank ?? index + 1;
			if (tierFilter === "top100" && rank > 100) return false;
			if (tierFilter === "mid200" && (rank < 101 || rank > 300)) return false;
			if (tierFilter === "high300" && (rank < 301 || rank > 600)) return false;
			if (tierFilter === "mastered" && !masteredSet.has(word.id)) return false;
			if (grammarFilter !== "All" && (word.grammarType || "Noun") !== grammarFilter) return false;
			if (!q) return true;
			return word.arabic.includes(q) || word.transliteration.toLowerCase().includes(q) || word.meaning.toLowerCase().includes(q) || (word.romanUrduMeaning || "").toLowerCase().includes(q) || word.rootLetters.toLowerCase().includes(q) || String(rank) === q;
		});
	}, [
		words,
		search,
		tierFilter,
		grammarFilter,
		masteredSet
	]);
	const unlockedEntries = (0, import_react.useMemo)(() => filteredEntries.filter(({ index }) => adultPlusUnlocked || index < freeVocabLimit), [
		filteredEntries,
		adultPlusUnlocked,
		freeVocabLimit
	]);
	const lockedCount = filteredEntries.length - unlockedEntries.length;
	const displayedEntries = unlockedEntries.slice(0, visibleCount);
	const meterRatio = Math.min(100, stats.coveragePct / TOP_600_TARGET_COVERAGE_PCT * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[24px] bg-gradient-to-br from-[#0F3826] via-[#14532D] to-[#0B2A19] text-white p-5 shadow-md border border-amber-400/35 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ilmizo Top 600 Quran Curriculum" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-extrabold mt-0.5 leading-snug",
							children: "Quran You Understand"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-3xl font-black text-amber-300 tabular-nums leading-none",
								children: [stats.coveragePct.toFixed(2), "%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-emerald-200 tabular-nums mt-1",
								children: [
									"of ",
									TOP_600_TARGET_COVERAGE_PCT,
									"% Top-600 Goal"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-3 rounded-full bg-black/30 border border-white/10 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-gradient-to-r from-[#22C55E] via-amber-300 to-[#F59E0B] transition-all duration-500",
								style: { width: `${Math.max(stats.masteredCount > 0 ? 3 : 0, meterRatio)}%` }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-[11px] font-bold text-emerald-100/90 tabular-nums",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								stats.masteredCount,
								" / ",
								words.length,
								" Words Mastered"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [stats.occurrencesRecognized.toLocaleString(), " Quran occurrences"] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-emerald-100/95 leading-relaxed bg-white/10 border border-white/15 rounded-2xl px-3.5 py-2.5",
						children: stats.milestoneLabel
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar",
				children: [
					{
						id: "all",
						label: `All (${words.length})`
					},
					{
						id: "top100",
						label: "Top #1–100"
					},
					{
						id: "mid200",
						label: "#101–300"
					},
					{
						id: "high300",
						label: "#301–600"
					},
					{
						id: "mastered",
						label: `Mastered (${stats.masteredCount})`
					}
				].map((tier) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						triggerSelectionHaptic();
						setTierFilter(tier.id);
						setVisibleCount(40);
					},
					className: `min-h-[40px] px-3.5 rounded-2xl text-xs font-extrabold whitespace-nowrap shrink-0 border transition ${tierFilter === tier.id ? "bg-[#14532D] text-amber-300 border-[#14532D]" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
					children: tier.label
				}, tier.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar",
					children: [
						"All",
						"Verb",
						"Noun",
						"Preposition",
						"Particle",
						"Pronoun"
					].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							triggerLightHaptic();
							setGrammarFilter(g);
							setVisibleCount(40);
						},
						className: `min-h-[34px] px-3 rounded-xl text-[11px] font-bold whitespace-nowrap shrink-0 border transition ${grammarFilter === g ? "bg-amber-400/25 text-amber-900 dark:text-amber-200 border-amber-400/60" : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
						children: g === "All" ? "All Grammar" : g
					}, g))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: search,
						onChange: (e) => {
							setSearch(e.target.value);
							setVisibleCount(40);
						},
						placeholder: "Search Arabic, English, Roman Urdu, root, or #rank...",
						className: "w-full rounded-full ilmizo-input pl-10 pr-4 py-2.5 text-xs font-medium shadow-2xs"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2.5",
				children: [
					displayedEntries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 text-center space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-6 h-6 text-emerald-700 dark:text-emerald-300 mx-auto opacity-75" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-extrabold text-[var(--text-primary)]",
								children: "No matching words in this filter"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--text-secondary)]",
								children: "Try clearing your search or switching back to All Words."
							})
						]
					}) : displayedEntries.map(({ word, index }) => {
						const rank = word.frequencyRank ?? index + 1;
						const isMastered = masteredSet.has(word.id);
						const isExpanded = expandedWordId === word.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-[20px] bg-[var(--bg-surface)] border shadow-2xs transition ${isMastered ? "border-emerald-400/70 dark:border-emerald-500/50" : "border-[var(--border-subtle)]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3.5 flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										triggerLightHaptic();
										setExpandedWordId(isExpanded ? null : word.id);
									},
									className: "flex-1 min-w-0 text-left space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "px-2 py-0.5 rounded-lg bg-[#14532D] text-amber-300 text-[11px] font-black tabular-nums",
													children: ["#", rank]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													dir: "rtl",
													className: "font-arabic-uthmani text-2xl text-[var(--text-primary)] font-bold leading-none",
													children: word.arabic
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-extrabold text-[var(--text-primary)]",
													children: word.transliteration
												}),
												word.grammarType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-2 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200 text-[11px] font-extrabold",
													children: word.grammarType
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
												children: word.meaning
											}), word.romanUrduMeaning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs font-semibold text-amber-800 dark:text-amber-300/90",
												children: ["Roman Urdu: ", word.romanUrduMeaning]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-[var(--text-muted)] tabular-nums",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"Repeats ",
													word.occurrencesInQuran.toLocaleString(),
													"x"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Root: ", word.rootLetters] }),
												typeof word.cumulativeCoveragePct === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-bold text-emerald-700 dark:text-emerald-300",
													children: [
														"Cumulative ",
														word.cumulativeCoveragePct.toFixed(2),
														"%"
													]
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "inline-flex items-center gap-0.5 text-[#14532D] dark:text-amber-300 font-bold",
													children: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Hide Ayah ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "w-3.5 h-3.5" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
														"Ayah ",
														word.exampleRef,
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-3.5 h-3.5" })
													] })
												})
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										triggerSelectionHaptic();
										onToggleMastered(word.id);
									},
									"aria-pressed": isMastered,
									className: `min-h-[42px] px-3.5 py-2 rounded-2xl text-xs font-extrabold shrink-0 inline-flex items-center gap-1 transition active:scale-95 ${isMastered ? "bg-[#22C55E] text-emerald-950 shadow-2xs" : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#14532D]/50"}`,
									children: [isMastered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isMastered ? "Mastered" : "Learn" })]
								})]
							}), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-3.5 pb-3.5 pt-2.5 border-t border-[var(--border-subtle)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[#FDFBF7] dark:bg-emerald-950/60 border border-amber-200/80 dark:border-emerald-700/40 p-3.5 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2 text-[11px] font-extrabold text-amber-800 dark:text-amber-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Qur'an Example Verse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "tabular-nums",
												children: ["Surah ", word.exampleRef]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											dir: "rtl",
											className: "font-arabic-uthmani text-xl sm:text-2xl text-[#14532D] dark:text-amber-100 leading-loose text-right",
											children: word.exampleAyah
										}),
										word.exampleTranslationEn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-semibold text-slate-800 dark:text-emerald-50 leading-relaxed",
											children: [
												"“",
												word.exampleTranslationEn,
												"”"
											]
										}),
										word.exampleTranslationRomanUrdu && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs italic text-emerald-900/90 dark:text-amber-200/90 leading-relaxed",
											children: [
												"Roman Urdu: “",
												word.exampleTranslationRomanUrdu,
												"”"
											]
										})
									]
								})
							})]
						}, word.id);
					}),
					unlockedEntries.length > visibleCount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setVisibleCount((c) => c + 40),
						className: "w-full min-h-[46px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-extrabold text-[#14532D] dark:text-emerald-200 hover:border-[#14532D]/50 transition",
						children: [
							"Load More Words (",
							unlockedEntries.length - visibleCount,
							" remaining)"
						]
					}),
					!adultPlusUnlocked && lockedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-gradient-to-br from-[#0F3826] to-[#14532D] text-white p-4 shadow-md border border-amber-400/40 space-y-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-extrabold uppercase tracking-wider text-amber-300",
									children: "Adult Quran Plus · ₹99/yr (~₹8/mo)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-extrabold",
									children: [
										"Unlock All ",
										words.length,
										" Words (Reach ",
										81.64,
										"% Qur'an Coverage)"
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-emerald-100 leading-relaxed",
								children: [
									"Top ",
									freeVocabLimit,
									" high-frequency words are Free Forever. Unlock the remaining",
									" ",
									lockedCount,
									" words with Roman Urdu Ayah context, Word-by-Word Hifz Studio & retention analytics with a 7-Day Free Trial."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onOpenPaywall,
								className: "w-full min-h-[46px] rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs transition active:scale-95",
								children: "Start 7-Day Free Trial · Unlock Full 600-Word Curriculum"
							})
						]
					})
				]
			})
		]
	});
};
// src/components/adult/AdultExtraScreens.tsx
var LocalDataManagerCard = (0, import_react.lazy)(() => __vitePreload(() => import("./LocalDataManagerCard-DOnUkM8q.js").then((m) => ({ default: m.LocalDataManagerCard })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])));
var AdultLessonsScreen = () => {
	const { user, setAdultRoute, completedLessonIds, markLessonCompleted, masteredVocabIds, toggleVocabMastered, registerSubScreenBackHandler } = useIlmizo();
	const { t } = useTranslation();
	const prefersReducedMotion = useReducedMotion();
	const audioState = useAudioManager();
	const [tab, setTab] = (0, import_react.useState)("All");
	const [activeLessonId, setActiveLessonId] = (0, import_react.useState)(null);
	const [lessonSearch, setLessonSearch] = (0, import_react.useState)("");
	const [vocabSearch, setVocabSearch] = (0, import_react.useState)("");
	const [checkSelected, setCheckSelected] = (0, import_react.useState)(null);
	const [vocabPaywallOpen, setVocabPaywallOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (activeLessonId) {
			registerSubScreenBackHandler(() => {
				setActiveLessonId(null);
				setCheckSelected(null);
				return true;
			});
			return () => registerSubScreenBackHandler(null);
		}
		registerSubScreenBackHandler(null);
		return () => registerSubScreenBackHandler(null);
	}, [activeLessonId, registerSubScreenBackHandler]);
	const filteredLessons = ISLAMIC_LESSONS.filter((l) => {
		if (tab !== "All" && l.category !== tab) return false;
		if (lessonSearch.trim()) {
			const q = lessonSearch.toLowerCase();
			return l.title.toLowerCase().includes(q) || l.subtitle.toLowerCase().includes(q) || l.keyTakeaway.toLowerCase().includes(q);
		}
		return true;
	});
	const activeLesson = ISLAMIC_LESSONS.find((l) => l.id === activeLessonId);
	const filteredVocab = TOP_QURAN_VOCAB.map((word, originalIdx) => ({
		word,
		originalIdx
	})).filter(({ word }) => word.transliteration.toLowerCase().includes(vocabSearch.toLowerCase()) || word.meaning.toLowerCase().includes(vocabSearch.toLowerCase()) || word.arabic.includes(vocabSearch));
	const adultPlusUnlocked = isAdultPlusActive(user);
	filteredVocab.filter(({ originalIdx }) => canAccessVocabIndex(user, originalIdx));
	Math.max(0, TOP_QURAN_VOCAB.length - 30);
	const iconStyles = [
		"bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-400/30",
		"bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-400/30",
		"bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-400/30",
		"bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-400/30",
		"bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-400/30"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pb-4 shadow-md border-b border-amber-400/15",
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
								children: t("islamic_lessons")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-[44px] h-9 px-2.5 rounded-full bg-white/10 flex items-center justify-center text-amber-300 text-xs font-bold tabular-nums",
								children: [
									completedLessonIds.length,
									"/",
									ISLAMIC_LESSONS.length
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 pb-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar",
						children: [
							{
								id: "lessons",
								label: "Lessons",
								active: true
							},
							{
								id: "hifz",
								label: "Hifz Studio",
								active: false
							},
							{
								id: "duas",
								label: "Duas",
								active: false
							},
							{
								id: "names99",
								label: "99 Names",
								active: false
							},
							{
								id: "seerah",
								label: "Seerah",
								active: false
							},
							{
								id: "quizzes",
								label: "Quizzes",
								active: false
							},
							{
								id: "progress",
								label: "Progress",
								active: false
							}
						].map((hubItem) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								if (!hubItem.active) {
									triggerLightHaptic();
									setAdultRoute(hubItem.id);
								}
							},
							className: `min-h-[36px] px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition active:scale-95 ${hubItem.active ? "bg-amber-400 text-emerald-950 shadow-2xs" : "bg-white/10 text-emerald-50 hover:bg-white/20 border border-white/15"}`,
							children: hubItem.label
						}, hubItem.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-4 flex items-center gap-1.5 overflow-x-auto bg-black/25 p-1 rounded-full",
						children: [
							"All",
							"Aqidah",
							"Akhlaq",
							"Fiqh",
							"Vocab600"
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setTab(item);
								setActiveLessonId(null);
								setCheckSelected(null);
							},
							className: `px-3 py-1.5 rounded-full text-xs font-extrabold transition whitespace-nowrap flex-1 ${tab === item ? "bg-amber-400 text-emerald-950 shadow-xs" : "text-emerald-100 hover:bg-white/10"}`,
							children: item === "Vocab600" ? "600 Words" : item
						}, item))
					})
				]
			}),
			(() => {
				const curriculumPct = Math.round(completedLessonIds.length / Math.max(1, ISLAMIC_LESSONS.length) * 100);
				const hasLiveAudio = audioState.status !== "idle" && Boolean(audioState.quranSequence.surahName);
				const liveAudioPct = Math.max(4, audioState.quranSequence.progressPercent || 0);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"aria-label": "Persistent Learning Progress",
					className: "sticky top-0 z-20 bg-[var(--bg-app)]/92 backdrop-blur-md border-b border-[var(--border-subtle)] px-4 py-2 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 text-[11px] font-extrabold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[#14532D] dark:text-emerald-300 tabular-nums",
							children: [
								"Curriculum: ",
								completedLessonIds.length,
								"/",
								ISLAMIC_LESSONS.length,
								" (",
								curriculumPct,
								"%)"
							]
						}), hasLiveAudio ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 text-amber-800 dark:text-amber-300 tabular-nums truncate max-w-[55%]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "truncate",
								children: [
									audioState.quranSequence.surahName,
									" · Ayah",
									" ",
									audioState.quranSequence.currentAyah || 1,
									" (",
									liveAudioPct,
									"%)"
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[var(--text-muted)] tabular-nums",
							children: [masteredVocabIds.length, " words mastered"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-gradient-to-r from-[#14532D] via-[#22C55E] to-[#F59E0B] transition-all duration-300",
							style: { width: `${Math.max(3, curriculumPct)}%` }
						})
					})]
				});
			})(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pt-4",
				children: activeLesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-[var(--bg-surface)] p-5 shadow-xs border border-[var(--border-subtle)] space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									activeLesson.category,
									" · ",
									activeLesson.durationMin,
									" min read"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700/40",
									children: activeLesson.verification.status === "Verified" ? "✓ Verified" : "Under Review"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setActiveLessonId(null);
									setCheckSelected(null);
								},
								className: "underline",
								children: "← Back"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-extrabold text-[var(--text-primary)]",
							children: activeLesson.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-secondary)]",
							children: activeLesson.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-2.5 text-sm text-[var(--text-primary)] leading-relaxed",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-extrabold uppercase tracking-wider text-[#14532D] dark:text-emerald-300",
								children: "Verified Textual Summary"
							}), activeLesson.content.map((para, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: para }, i))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-400/30 p-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold text-amber-900 dark:text-amber-300",
								children: "Educational Takeaway & Personal Reflection"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-amber-950 dark:text-amber-100 mt-1",
								children: activeLesson.keyTakeaway
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-extrabold text-[var(--text-primary)]",
								children: [
									"Quick Reflection Check: What is the primary focus of \"",
									activeLesson.title,
									"\"?"
								]
							}), [activeLesson.keyTakeaway, "Skipping daily reflection and rushing through worship without presence of heart."].map((opt, idx) => {
								const isPicked = checkSelected === idx;
								const isCorrect = idx === 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setCheckSelected(idx),
									className: `w-full text-left p-2.5 rounded-xl border text-xs font-semibold transition flex items-center justify-between gap-2 ${isPicked ? isCorrect ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-600 text-emerald-950 dark:text-emerald-100 font-bold" : "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200" : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "line-clamp-2",
										children: opt
									}), isPicked && isCorrect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" })]
								}, idx);
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedSourceFooter, {
							source: activeLesson.verification.source,
							reference: activeLesson.verification.reference
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								markLessonCompleted(activeLesson.id);
								setActiveLessonId(null);
								setCheckSelected(null);
							},
							className: "w-full min-h-[46px] rounded-2xl bg-[#14532D] text-white font-extrabold text-xs hover:bg-emerald-800 transition flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: completedLessonIds.includes(activeLesson.id) ? "Completed ✓ (Tap to Return)" : "Mark Lesson Complete" })]
						})
					]
				}) : tab === "Vocab600" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuranVocabMasteryView, {
					words: TOP_QURAN_VOCAB,
					masteredVocabIds,
					onToggleMastered: toggleVocabMastered,
					freeVocabLimit: 30,
					adultPlusUnlocked,
					onOpenPaywall: () => setVocabPaywallOpen(true)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						(() => {
							const nextIncomplete = ISLAMIC_LESSONS.find((l) => !completedLessonIds.includes(l.id)) || ISLAMIC_LESSONS[0];
							const pct = Math.round(completedLessonIds.length / Math.max(1, ISLAMIC_LESSONS.length) * 100);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-gradient-to-br from-[#0F3826] via-[#14532D] to-[#0B2D1E] text-white p-4 shadow-md border border-amber-400/25 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-extrabold uppercase tracking-wider text-amber-300",
												children: "Structured Islamic Curriculum"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-base font-extrabold leading-snug mt-0.5 truncate",
												children: nextIncomplete ? nextIncomplete.title : "All Lessons Completed"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-emerald-100/80 mt-0.5",
												children: [
													completedLessonIds.length,
													" of ",
													ISLAMIC_LESSONS.length,
													" lessons completed · ",
													pct,
													"% mastery"
												]
											})
										]
									}), nextIncomplete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setActiveLessonId(nextIncomplete.id);
											setCheckSelected(null);
										},
										className: "min-h-[40px] px-3.5 py-2 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-emerald-950 font-extrabold text-xs shrink-0 shadow-sm active:scale-95 transition",
										children: completedLessonIds.length > 0 ? "Continue" : "Start"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 rounded-full bg-black/30 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-gradient-to-r from-[#4ADE80] via-[#FDE68A] to-[#F59E0B] transition-all duration-300",
										style: { width: `${Math.max(4, pct)}%` }
									})
								})]
							});
						})(),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: lessonSearch,
								onChange: (e) => setLessonSearch(e.target.value),
								placeholder: "Search lessons by title, topic or takeaway...",
								className: "w-full rounded-full ilmizo-input pl-10 pr-4 py-2.5 text-xs font-medium shadow-2xs"
							})]
						}),
						filteredLessons.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[var(--bg-surface)] p-6 text-center border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]",
							children: [
								"No lessons match \"",
								lessonSearch,
								"\". Try clearing your search filter."
							]
						}) : filteredLessons.map((lesson, idx) => {
							const done = completedLessonIds.includes(lesson.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								type: "button",
								initial: prefersReducedMotion ? { opacity: 0 } : {
									opacity: 0,
									y: 12
								},
								animate: prefersReducedMotion ? { opacity: 1 } : {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: prefersReducedMotion ? .01 : .22,
									delay: prefersReducedMotion ? 0 : Math.min(idx * .03, .24),
									ease: "easeOut"
								},
								onClick: () => {
									setActiveLessonId(lesson.id);
									setCheckSelected(null);
								},
								className: "w-full text-left rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] hover:border-emerald-700/40 active:scale-[0.99] transition flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${iconStyles[idx % iconStyles.length]}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-5 h-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-extrabold text-[var(--text-primary)]",
											children: lesson.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] font-bold text-[var(--text-muted)]",
											children: [
												"· ",
												lesson.durationMin,
												"m"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[var(--text-secondary)] mt-0.5",
										children: lesson.subtitle
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 shrink-0",
									children: [done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4 text-[var(--text-muted)]" })]
								})]
							}, lesson.id);
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyPlusPaywallModal, {
				open: vocabPaywallOpen,
				onClose: () => setVocabPaywallOpen(false),
				skipParentGate: true,
				triggerReason: "Unlock all High-Frequency Quranic Words, Word-by-Word Hifz Studio, and Retention Analytics with Adult Quran Plus (₹99/yr) or Family Plus (₹199/yr)."
			})
		]
	});
};
var ADULT_QUIZ_CARDS = [
	{
		id: "quiz_quran_knowledge",
		title: "Quran Knowledge",
		count: "10 Questions",
		level: "Beginner",
		tint: "bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300"
	},
	{
		id: "quiz_seerah_history",
		title: "Islamic History",
		count: "10 Questions",
		level: "Intermediate",
		tint: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300"
	},
	{
		id: "quiz_daily_duas",
		title: "Daily Duas",
		count: "10 Questions",
		level: "Beginner",
		tint: "bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300"
	},
	{
		id: "quiz_salah_wudu",
		title: "Salah & Wudu",
		count: "10 Questions",
		level: "Beginner",
		tint: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300"
	},
	{
		id: "quiz_names_99",
		title: "99 Names of Allah",
		count: "10 Questions",
		level: "Intermediate",
		tint: "bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300"
	}
];
var AdultQuizzesScreen = () => {
	const { quizAttempts, recordQuizAttempt, registerSubScreenBackHandler } = useIlmizo();
	const { t } = useTranslation();
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [activePackId, setActivePackId] = (0, import_react.useState)(null);
	const [qIndex, setQIndex] = (0, import_react.useState)(0);
	const [selectedOpt, setSelectedOpt] = (0, import_react.useState)(null);
	const [selectedByQuestionId, setSelectedByQuestionId] = (0, import_react.useState)({});
	const [score, setScore] = (0, import_react.useState)(0);
	const [finished, setFinished] = (0, import_react.useState)(false);
	const [hasSubmittedAttempt, setHasSubmittedAttempt] = (0, import_react.useState)(false);
	const [missedQuestionIndices, setMissedQuestionIndices] = (0, import_react.useState)([]);
	const [retryOnlyMissed, setRetryOnlyMissed] = (0, import_react.useState)(false);
	const activePack = QUIZ_PACKS.find((p) => p.id === activePackId);
	(0, import_react.useEffect)(() => {
		if (activePackId) {
			registerSubScreenBackHandler(() => {
				setActivePackId(null);
				return true;
			});
			return () => registerSubScreenBackHandler(null);
		}
		registerSubScreenBackHandler(null);
		return () => registerSubScreenBackHandler(null);
	}, [activePackId, registerSubScreenBackHandler]);
	const activeQuestions = activePack && retryOnlyMissed && missedQuestionIndices.length > 0 ? activePack.questions.filter((_, i) => missedQuestionIndices.includes(i)) : activePack?.questions || [];
	const startQuiz = (id) => {
		setActivePackId(id);
		setQIndex(0);
		setSelectedOpt(null);
		setSelectedByQuestionId({});
		setScore(0);
		setFinished(false);
		setHasSubmittedAttempt(false);
		setMissedQuestionIndices([]);
		setRetryOnlyMissed(false);
	};
	const extraQuizCards = ADULT_QUIZ_CARDS.filter((c) => filter === "All" ? true : c.level === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pb-4 shadow-md border-b border-amber-400/15",
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
							children: t("quizzes")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-[44px] h-9 px-2.5 rounded-full bg-white/10 flex items-center justify-center text-xs font-extrabold text-amber-300 tabular-nums",
							children: quizAttempts.length
						})
					]
				}),
				!activePack && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full",
					children: [
						"All",
						"Beginner",
						"Intermediate"
					].map((lvl) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(lvl),
						className: `py-1.5 rounded-full text-xs font-extrabold transition ${filter === lvl ? "bg-amber-400 text-emerald-950 shadow-xs" : "text-emerald-100 hover:bg-white/10"}`,
						children: lvl
					}, lvl))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 pt-4 space-y-4",
			children: activePack && activeQuestions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-[var(--bg-surface)] p-6 shadow-xs border border-[var(--border-subtle)] text-center space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-extrabold text-[var(--text-primary)]",
					children: "No questions available in this quiz pack."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActivePackId(null),
					className: "px-4 py-2 rounded-xl bg-[#14532D] text-white text-xs font-extrabold",
					children: "Back to All Quizzes"
				})]
			}) : activePack && activeQuestions.length > 0 ? finished ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-[var(--bg-surface)] p-6 shadow-xs border border-[var(--border-subtle)] text-center space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center justify-center mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-8 h-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-extrabold text-[var(--text-primary)]",
						children: "MashaAllah! Quiz Completed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-[var(--text-secondary)]",
						children: [
							"You scored",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-emerald-700 dark:text-emerald-300 tabular-nums",
								children: [
									score,
									" / ",
									activeQuestions.length
								]
							}),
							" ",
							"in ",
							activePack.title,
							"."
						]
					}),
					missedQuestionIndices.length > 0 && !retryOnlyMissed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setRetryOnlyMissed(true);
							setQIndex(0);
							setSelectedOpt(null);
							setSelectedByQuestionId({});
							setScore(0);
							setFinished(false);
							setHasSubmittedAttempt(false);
						},
						className: "w-full min-h-[44px] rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-400/30 font-extrabold text-xs",
						children: [
							"Retry ",
							missedQuestionIndices.length,
							" Missed Question(s)"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActivePackId(null),
						className: "w-full min-h-[46px] rounded-2xl bg-[#14532D] text-white font-extrabold text-xs",
						children: "Back to All Quizzes"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-[var(--bg-surface)] p-5 shadow-xs border border-[var(--border-subtle)] space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs font-bold text-[var(--text-secondary)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							activePack.title,
							" ",
							retryOnlyMissed ? "(Retry Missed)" : ""
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								qIndex + 1,
								"/",
								activeQuestions.length
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full h-2 rounded-full bg-emerald-100 dark:bg-emerald-950 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-[#14532D] dark:bg-emerald-400 transition-all",
							style: { width: `${(qIndex + 1) / activeQuestions.length * 100}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-extrabold text-[var(--text-primary)]",
						children: activeQuestions[qIndex].prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: activeQuestions[qIndex].options.map((opt, idx) => {
							const isSelected = selectedOpt === idx;
							const isCorrect = idx === activeQuestions[qIndex].correctIndex;
							let style = "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)]";
							if (selectedOpt !== null) {
								if (isCorrect) style = "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-600 text-emerald-950 dark:text-emerald-100 font-bold";
								else if (isSelected) style = "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200";
							}
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: selectedOpt !== null,
								onClick: () => {
									const currentQ = activeQuestions[qIndex];
									setSelectedOpt(idx);
									const nextMap = {
										...selectedByQuestionId,
										[currentQ.id]: idx
									};
									setSelectedByQuestionId(nextMap);
									if (isCorrect) setScore((s) => s + 1);
									else setMissedQuestionIndices((prev) => prev.includes(qIndex) ? prev : [...prev, qIndex]);
								},
								className: `w-full text-left p-3.5 rounded-2xl border text-xs font-semibold transition flex items-center justify-between ${style}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt }), selectedOpt !== null && isCorrect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" })]
							}, idx);
						})
					}),
					selectedOpt !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 text-xs text-[var(--text-secondary)] space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-[var(--text-primary)]",
							children: activeQuestions[qIndex].explanation
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-[var(--text-muted)]",
							children: ["Ref: ", activeQuestions[qIndex].reference]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: selectedOpt === null || hasSubmittedAttempt,
						onClick: () => {
							if (qIndex + 1 < activeQuestions.length) {
								setQIndex((i) => i + 1);
								setSelectedOpt(null);
							} else if (!hasSubmittedAttempt) {
								setHasSubmittedAttempt(true);
								const scored = scoreQuizSubmission(activeQuestions, selectedByQuestionId);
								setScore(scored.score);
								recordQuizAttempt({
									quizId: activePack.id,
									quizTitle: activePack.title,
									score: scored.score,
									total: scored.total,
									mode: "adult"
								});
								setFinished(true);
							}
						},
						className: "w-full min-h-[46px] rounded-2xl bg-[#14532D] disabled:opacity-40 text-white font-extrabold text-xs",
						children: qIndex + 1 < activeQuestions.length ? "Next Question" : "Complete Quiz"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2.5",
				children: extraQuizCards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => startQuiz(card.targetId || card.id),
					className: "w-full text-left rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)] hover:border-emerald-700/40 transition flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `w-11 h-11 rounded-2xl ${card.tint} flex items-center justify-center shrink-0`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-extrabold text-[var(--text-primary)]",
							children: card.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-[var(--text-secondary)] mt-0.5",
							children: [
								card.count,
								" · ",
								card.level
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-5 h-5 text-amber-400 fill-current shrink-0" })]
				}, card.id))
			}), quizAttempts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-extrabold text-[var(--text-primary)]",
					children: "Recent Recorded Quiz Attempts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-[var(--divider)]",
					children: quizAttempts.slice(0, 5).map((att) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-2 flex items-center justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-[var(--text-primary)]",
							children: att.quizTitle
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[var(--text-muted)]",
							children: att.completedAt
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-200 font-extrabold tabular-nums",
							children: [
								att.score,
								"/",
								att.total
							]
						})]
					}, att.id))
				})]
			})] })
		})]
	});
};
var AdultProgressScreen = () => {
	const { hifzPlans, favoriteDuaIds, quizAttempts, completedLessonIds, masteredVocabIds, recentlyOpenedSurahs, salahRecords, bookmarks, learningEvents, dailyVerseActivity } = useIlmizo();
	const [tab, setTab] = (0, import_react.useState)("Overview");
	const [period, setPeriod] = (0, import_react.useState)("weekly");
	const completedSurahsCount = hifzPlans.filter((p) => p.status === "completed").length;
	const realLessonsCount = completedLessonIds.length;
	const realDuasSavedCount = favoriteDuaIds.length;
	const realQuizzesCount = quizAttempts.length;
	const periodStats = aggregateAdultProgressByPeriod({
		period,
		learningEvents,
		salahRecords,
		dailyVerseActivity,
		quizAttempts,
		baseDate: /* @__PURE__ */ new Date()
	});
	const streakDetails = computeLearningStreak({
		learningEvents,
		salahRecords,
		dailyVerseActivity,
		baseDate: /* @__PURE__ */ new Date()
	});
	const weeklyBars = Array.from({ length: 7 }, (_, idx) => {
		const offset = idx - 6;
		const key = getLocalDateKeyWithOffset(offset, /* @__PURE__ */ new Date());
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() + offset);
		const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });
		const prayers = salahRecords[key]?.prayers;
		const prayedCount = prayers ? Object.values(prayers).filter((s) => s === "prayed_on_time" || s === "prayed").length : 0;
		const eventsOnDay = learningEvents.filter((e) => e.dateKey === key).length;
		const totalActivityUnits = prayedCount + eventsOnDay;
		return {
			key,
			day: dayLabel,
			h: totalActivityUnits > 0 ? Math.min(60, 12 + totalActivityUnits * 8) : 6,
			prayedCount,
			eventsOnDay
		};
	});
	const adultAchievements = [
		{
			id: "ach_quran_reader",
			title: "Consistent Quran Reader",
			desc: `Read ${periodStats.versesReadCount} verses (${period}) & saved ${bookmarks.length} bookmarks`,
			unlocked: periodStats.versesReadCount >= 1 || bookmarks.length >= 1
		},
		{
			id: "ach_hifz_guardian",
			title: "Hifz Guardian (Juz Amma)",
			desc: `${completedSurahsCount} Surahs completed in Hifz Tracker`,
			unlocked: completedSurahsCount >= 5
		},
		{
			id: "ach_seeker_ilm",
			title: "Seeker of Sacred Knowledge",
			desc: `Completed ${realLessonsCount} Islamic lessons & ${masteredVocabIds.length} Quranic words`,
			unlocked: realLessonsCount >= 1 || masteredVocabIds.length >= 3
		},
		{
			id: "ach_dua_memorizer",
			title: "Hisn al-Muslim Companion",
			desc: `${realDuasSavedCount} verified Duas saved to favorites`,
			unlocked: realDuasSavedCount >= 3
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pb-4 shadow-md border-b border-amber-400/15",
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
							children: "My Progress"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncStatusBadge, { compact: true })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full",
					children: [
						"Overview",
						"Streak",
						"Achievements"
					].map((tName) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab(tName),
						className: `py-1.5 rounded-full text-xs font-extrabold transition ${tab === tName ? "bg-amber-400 text-emerald-950 shadow-xs" : "text-emerald-100 hover:bg-white/10"}`,
						children: tName
					}, tName))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-4 space-y-3.5",
			children: [
				tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-1 bg-[var(--bg-surface)] p-1 rounded-full border border-[var(--border-subtle)] shadow-2xs",
						children: [
							{
								id: "daily",
								label: "Daily"
							},
							{
								id: "weekly",
								label: "Weekly"
							},
							{
								id: "monthly",
								label: "Monthly"
							},
							{
								id: "all_time",
								label: "All-Time"
							}
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPeriod(p.id),
							className: `py-1.5 rounded-full text-[11px] font-extrabold transition ${period === p.id ? "bg-[#14532D] text-white shadow-2xs" : "text-[var(--text-secondary)]"}`,
							children: p.label
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-[var(--bg-surface)] p-5 shadow-xs border border-[var(--border-subtle)] space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-extrabold text-[var(--text-primary)]",
									children: "Your Learning Journey"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/40 px-2.5 py-0.5 rounded-full",
									children: [streakDetails.activeDateKeys.length, " Active Day(s)"]
								})]
							}),
							(() => {
								const pct = Math.min(100, Math.round(realLessonsCount / Math.max(1, ISLAMIC_LESSONS.length) * 100));
								const radius = 56;
								const circumference = 2 * Math.PI * radius;
								const dashOffset = circumference - circumference * Math.max(pct, 3) / 100;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row items-center justify-center gap-5 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative w-36 h-36 flex items-center justify-center shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											className: "w-36 h-36 -rotate-90",
											viewBox: "0 0 132 132",
											"aria-hidden": "true",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
													id: "ilmizoProgressGrad",
													x1: "0%",
													y1: "0%",
													x2: "100%",
													y2: "100%",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
															offset: "0%",
															stopColor: "#14532D"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
															offset: "55%",
															stopColor: "#22C55E"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
															offset: "100%",
															stopColor: "#F59E0B"
														})
													]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "66",
													cy: "66",
													r: radius,
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "11",
													className: "text-emerald-950/10 dark:text-white/10"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "66",
													cy: "66",
													r: radius,
													fill: "none",
													stroke: "url(#ilmizoProgressGrad)",
													strokeWidth: "11",
													strokeLinecap: "round",
													strokeDasharray: circumference,
													strokeDashoffset: dashOffset,
													className: "transition-all duration-500"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute inset-0 flex flex-col items-center justify-center text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-2xl font-extrabold text-[var(--text-primary)] tabular-nums leading-none",
												children: [pct, "%"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-bold text-[var(--text-secondary)] mt-1",
												children: "Overall"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center sm:text-left space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-extrabold text-[#14532D] dark:text-amber-300 uppercase tracking-wider",
												children: "Curriculum Progress"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-base font-extrabold text-[var(--text-primary)] tabular-nums",
												children: [
													realLessonsCount,
													" of ",
													ISLAMIC_LESSONS.length,
													" Lessons Completed"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-[var(--text-secondary)]",
												children: [
													streakDetails.currentStreakDays,
													"-day active streak · ",
													masteredVocabIds.length,
													" Quranic words mastered"
												]
											})
										]
									})]
								});
							})(),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2 text-center bg-[var(--bg-elevated)] rounded-2xl p-2.5 border border-[var(--border-subtle)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums",
										children: periodStats.versesReadCount
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-bold text-[var(--text-secondary)]",
										children: "Verses Read"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums",
										children: periodStats.hifzRevisionsCount
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-bold text-[var(--text-secondary)]",
										children: "Hifz Reviews"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums",
										children: periodStats.prayersCompletedCount
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-bold text-[var(--text-secondary)]",
										children: "Prayers Logged"
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-[var(--text-primary)]",
									children: "Last 7 Days (Recorded Activity)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-[var(--text-muted)]",
									children: ["Quran words mastered: ", masteredVocabIds.length]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-7 gap-2 items-end h-24 pt-2 px-2",
								children: weeklyBars.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `w-4 rounded-md transition-all ${b.prayedCount + b.eventsOnDay > 0 ? "bg-[#14532D] dark:bg-emerald-400" : "bg-slate-200 dark:bg-emerald-950"}`,
										style: { height: `${b.h}px` },
										title: `${b.day}: ${b.prayedCount} prayers, ${b.eventsOnDay} learning events`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold text-[var(--text-muted)]",
										children: b.day
									})]
								}, b.key))
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2.5 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-extrabold text-[var(--text-primary)] tabular-nums",
										children: completedSurahsCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-[var(--text-secondary)] mt-0.5",
										children: "Surahs"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-[var(--text-muted)]",
										children: [
											"Memorized (",
											recentlyOpenedSurahs.length,
											" opened)"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-extrabold text-[var(--text-primary)] tabular-nums",
										children: realDuasSavedCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-[var(--text-secondary)] mt-0.5",
										children: "Duas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-[var(--text-muted)]",
										children: "Saved"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[var(--bg-surface)] p-3.5 shadow-2xs border border-[var(--border-subtle)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-extrabold text-[var(--text-primary)] tabular-nums",
										children: realQuizzesCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-[var(--text-secondary)] mt-0.5",
										children: "Quizzes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-[var(--text-muted)]",
										children: "Completed"
									})
								]
							})
						]
					})
				] }),
				tab === "Streak" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-[var(--bg-surface)] p-5 shadow-xs border border-[var(--border-subtle)] space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-[var(--text-secondary)]",
								children: "Current Learning Streak"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-3xl font-extrabold text-[var(--text-primary)] tabular-nums mt-0.5",
								children: [
									streakDetails.currentStreakDays,
									" Day",
									streakDetails.currentStreakDays === 1 ? "" : "s"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-[var(--text-secondary)] mt-0.5",
								children: [
									"Longest Streak: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-[var(--text-primary)]",
										children: [streakDetails.longestStreakDays, "d"]
									}),
									" · Today:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-emerald-700 dark:text-emerald-300",
										children: streakDetails.isTodayActive ? "Active ✓" : "Not yet logged"
									})
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoDisclosure, {
								label: "Streak Rule",
								sheetTitle: "Streak & Local Timezone Rule",
								sheetSubtitle: "How Ilmizo records your daily consistency",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"A calendar day (",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "YYYY-MM-DD" }),
									" in your local device timezone) counts as active when you read a Quran verse, complete a Hifz revision, log a Salah prayer, finish a lesson, or submit a quiz."
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Merely opening a Surah list or browsing without reading does not count. Missing a full local calendar day resets the current streak to 0." })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5" })
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-7 gap-1.5 pt-1",
						children: weeklyBars.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-2 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-bold text-[var(--text-muted)]",
								children: b.day
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300 mt-1 tabular-nums",
								children: [b.prayedCount, "/5"]
							})]
						}, b.key))
					})]
				}),
				tab === "Achievements" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2.5",
					children: adultAchievements.map((ach) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl p-4 border flex items-center justify-between gap-3 ${ach.unlocked ? "bg-[var(--bg-surface)] border-[var(--border-subtle)] shadow-2xs" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] opacity-75"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${ach.unlocked ? "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300" : "bg-slate-200 dark:bg-emerald-950 text-[var(--text-muted)]"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-5 h-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-extrabold text-[var(--text-primary)]",
								children: ach.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--text-secondary)] mt-0.5",
								children: ach.desc
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-[11px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${ach.unlocked ? "bg-emerald-100 dark:bg-emerald-900/50 text-[#14532D] dark:text-emerald-200" : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]"}`,
							children: ach.unlocked ? "Earned" : "In Progress"
						})]
					}, ach.id))
				})
			]
		})]
	});
};
var AdultQiblaScreen = () => {
	const { setAdultRoute, user, updateUser } = useIlmizo();
	const [selectedCity, setSelectedCity] = (0, import_react.useState)(user.city || "Jamshedpur");
	const [gpsStatus, setGpsStatus] = (0, import_react.useState)(null);
	const [liveBearing, setLiveBearing] = (0, import_react.useState)(null);
	const [deviceHeading, setDeviceHeading] = (0, import_react.useState)(0);
	const [sensorActive, setSensorActive] = (0, import_react.useState)(false);
	const [showAlignmentDetails, setShowAlignmentDetails] = (0, import_react.useState)(false);
	const cityBearings = {
		Jamshedpur: {
			bearing: 278,
			dir: "278° WNW",
			distKm: 4720,
			lat: 22.8046,
			lon: 86.2029
		},
		NewDelhi: {
			bearing: 266,
			dir: "266° W",
			distKm: 3815,
			lat: 28.6139,
			lon: 77.209
		},
		Mumbai: {
			bearing: 280,
			dir: "280° WNW",
			distKm: 3520,
			lat: 19.076,
			lon: 72.8777
		},
		London: {
			bearing: 119,
			dir: "119° ESE",
			distKm: 4790,
			lat: 51.5072,
			lon: -.1276
		},
		Istanbul: {
			bearing: 151,
			dir: "151° SSE",
			distKm: 2400,
			lat: 41.0082,
			lon: 28.9784
		}
	};
	(0, import_react.useEffect)(() => {
		const handleOrientation = (e) => {
			const webkitCompass = e.webkitCompassHeading;
			if (typeof webkitCompass === "number") {
				setDeviceHeading(Math.round(webkitCompass));
				setSensorActive(true);
			} else if (typeof e.alpha === "number") {
				setDeviceHeading(Math.round((360 - e.alpha) % 360));
				setSensorActive(true);
			}
		};
		window.addEventListener("deviceorientation", handleOrientation, true);
		return () => {
			window.removeEventListener("deviceorientation", handleOrientation, true);
		};
	}, []);
	const requestCompassSensor = async () => {
		const DOEvent = window.DeviceOrientationEvent;
		if (DOEvent && typeof DOEvent.requestPermission === "function") try {
			if (await DOEvent.requestPermission() === "granted") setGpsStatus("Compass permission granted. Rotate your device to receive live heading events.");
			else setGpsStatus("Compass permission denied; use interactive dial slider below.");
		} catch {
			setGpsStatus("Compass sensor permission denied; use interactive dial slider below.");
		}
		else setGpsStatus("Rotate your phone (if equipped with a magnetometer) or drag the compass heading slider below.");
	};
	const handleUseLiveGps = () => {
		if (!("geolocation" in navigator)) {
			setGpsStatus("Geolocation is not supported by this browser. Using selected city preset.");
			return;
		}
		setGpsStatus("Requesting GPS coordinates...");
		navigator.geolocation.getCurrentPosition((pos) => {
			const res = computeQiblaFromCoords(pos.coords.latitude, pos.coords.longitude);
			setLiveBearing(res);
			setSelectedCity("Live GPS");
			setGpsStatus(`Calibrated from live GPS (${pos.coords.latitude.toFixed(2)}°, ${pos.coords.longitude.toFixed(2)}°)`);
		}, () => {
			setGpsStatus("Location permission declined or unavailable. Using selected city preset.");
		}, { timeout: 6e3 });
	};
	const info = liveBearing || cityBearings[selectedCity] || {
		bearing: 142,
		dir: "142° SE",
		distKm: 4720
	};
	const relativeNeedleRotation = (info.bearing - deviceHeading + 360) % 360;
	const isAlignedWithQibla = Math.min(Math.abs(info.bearing - deviceHeading), 360 - Math.abs(info.bearing - deviceHeading)) <= 6;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-20 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden bg-[#0F3826] text-white rounded-b-[32px] shadow-lg h-[410px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/assets/illustrations/adult_qibla_compass.webp",
					alt: "3D Kaaba Qibla Compass",
					loading: "lazy",
					decoding: "async",
					className: "absolute inset-0 w-full h-full object-cover object-center"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#071F15]/90 via-[#071F15]/45 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-app)] to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center pointer-events-none pt-14",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `w-60 h-60 rounded-full border-2 transition-all duration-300 flex items-center justify-center relative ${isAlignedWithQibla ? "border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.75)]" : "border-amber-300/40"}`,
						style: { transform: `rotate(${relativeNeedleRotation}deg)` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `px-2 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md border ${isAlignedWithQibla ? "bg-emerald-500 text-emerald-950 border-white" : "bg-amber-400 text-emerald-950 border-amber-100"}`,
								children: isAlignedWithQibla ? "🕋 Aligned" : "🕋 Qibla"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] ${isAlignedWithQibla ? "border-b-emerald-400" : "border-b-amber-400"}` })]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
						time: "9:31",
						light: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-lg font-extrabold text-amber-200 drop-shadow-md",
								children: "Qibla"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleUseLiveGps,
								className: "min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-black/35 backdrop-blur-xs flex items-center justify-center border border-amber-300/40 text-amber-300 transition active:scale-95",
								title: "Calibrate from Live GPS",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, { className: "w-4 h-4" })
							})
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 pt-2 text-center space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-3xl font-extrabold text-[var(--text-primary)] tabular-nums",
							children: info.dir
						}), isAlignedWithQibla && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-600/50 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold",
							children: "Facing Kaaba ✓"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-semibold text-[var(--text-secondary)] mt-0.5",
						children: [
							"From your location (",
							selectedCity,
							") · ",
							info.distKm.toLocaleString(),
							" km to Makkah"
						]
					}),
					gpsStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/40 rounded-xl px-3 py-1.5 mt-1.5",
						children: gpsStatus
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-[var(--bg-surface)] px-3.5 py-2.5 border border-[var(--border-subtle)] shadow-2xs space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs font-bold text-[var(--text-secondary)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Phone Heading:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-[var(--text-primary)] tabular-nums",
								children: [deviceHeading, "°"]
							}),
							sensorActive ? " (Sensor Live)" : ""
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setDeviceHeading(info.bearing),
							className: "text-xs font-extrabold text-[#14532D] dark:text-amber-300 underline",
							children: [
								"Snap to Qibla (",
								info.bearing,
								"°)"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 359,
						value: deviceHeading,
						onChange: (e) => setDeviceHeading(Number(e.target.value)),
						"aria-label": "Rotate Compass Heading",
						className: "w-full accent-[#14532D] dark:accent-amber-400 cursor-pointer h-1.5"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap justify-center gap-1.5",
					children: Object.keys(cityBearings).map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setLiveBearing(null);
							setSelectedCity(city);
							updateUser({ city });
							setGpsStatus(null);
						},
						className: `min-h-[36px] px-3.5 py-1 rounded-full text-xs font-bold transition ${selectedCity === city ? "bg-[#14532D] text-white shadow-2xs" : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"}`,
						children: city
					}, city))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							handleUseLiveGps();
							requestCompassSensor();
						},
						className: "min-h-[44px] px-4 py-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[#14532D] dark:text-emerald-300 font-extrabold text-xs shadow-2xs inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Use GPS & Compass" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setShowAlignmentDetails(!showAlignmentDetails),
						className: "min-h-[44px] px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] text-emerald-950 font-extrabold text-xs shadow-md inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showAlignmentDetails ? "Hide Map Info" : "View Map" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
					})]
				}),
				showAlignmentDetails && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] text-left text-xs space-y-2 shadow-2xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-extrabold text-[var(--text-primary)]",
							children: "Great-Circle Qibla Vector to Al-Masjid al-Haram"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[var(--text-secondary)]",
							children: [
								"Target: Holy Kaaba (21.4225° N, 39.8262° E) · Bearing:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "tabular-nums text-[var(--text-primary)]",
									children: [info.bearing, "°"]
								}),
								" clockwise from True North."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-[var(--text-muted)]",
							children: [
								"Sensor Mode:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-[var(--text-primary)]",
									children: sensorActive ? "Live Hardware Magnetometer Active" : "Manual Heading Dial / Static Bearing"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://www.google.com/maps/dir/?api=1&destination=21.4225,39.8262",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center gap-1.5 text-xs font-extrabold text-[#14532D] dark:text-amber-300 underline pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Holy Kaaba in External Google Maps" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })]
						})
					]
				})
			]
		})]
	});
};
var AdultTasbihScreen = () => {
	const { setAdultRoute, user, incrementTasbih, resetTasbih, setActiveDhikr } = useIlmizo();
	const [tab, setTab] = (0, import_react.useState)("Counter");
	const [targetGoal, setTargetGoal] = (0, import_react.useState)(33);
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	const dhikrList = [
		{
			arabic: "سُبْحَانَ اللَّهِ",
			translit: "SubhanAllah",
			meaning: "Glory be to Allah",
			target: 33
		},
		{
			arabic: "الْحَمْدُ لِلَّهِ",
			translit: "Alhamdulillah",
			meaning: "All praise is due to Allah",
			target: 33
		},
		{
			arabic: "اللَّهُ أَكْبَرُ",
			translit: "Allahu Akbar",
			meaning: "Allah is the Greatest",
			target: 34
		}
	];
	const activeDhikr = dhikrList[user.activeDhikrIndex] || dhikrList[0];
	const handleTapCounter = () => {
		setConfirmReset(false);
		if ("vibrate" in navigator) try {
			navigator.vibrate(18);
		} catch {}
		const nextVal = user.tasbihCount + 1;
		incrementTasbih();
		if (tab === "Guided" && nextVal >= activeDhikr.target) {
			const nextIdx = (user.activeDhikrIndex + 1) % dhikrList.length;
			setActiveDhikr(nextIdx);
			resetTasbih();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pb-4 shadow-md border-b border-amber-400/15",
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
							children: "Tasbih"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-2.5 py-1 rounded-full bg-white/10 text-xs font-extrabold text-amber-300 tabular-nums",
							children: ["Total: ", user.tasbihTotal]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-full",
					children: [
						"Counter",
						"Guided",
						"Benefits"
					].map((tName) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab(tName),
						className: `py-1.5 rounded-full text-xs font-extrabold transition ${tab === tName ? "bg-amber-400 text-emerald-950 shadow-xs" : "text-emerald-100 hover:bg-white/10"}`,
						children: tName
					}, tName))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 pt-5 text-center space-y-4",
			children: tab === "Benefits" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-[var(--bg-surface)] p-5 shadow-xs border border-[var(--border-subtle)] text-left space-y-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-extrabold text-[var(--text-primary)]",
						children: "Virtues of Tasbihat Fatima"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-[var(--text-secondary)] leading-relaxed",
						children: "Glorifying Allah 33 times (SubhanAllah), praising Him 33 times (Alhamdulillah), and magnifying Him 34 times (Allahu Akbar) after every obligatory prayer brings forgiveness of sins even if they are like the foam of the sea."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedSourceFooter, {
						source: "Sahih Muslim 597",
						reference: "Book of Prayer"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B2E1F] via-[#14532D] to-[#0F3826] border border-[#D4AF37]/45 px-5 py-4 text-white shadow-md space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": "true",
							className: "pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-amber-400/15 blur-2xl"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-arabic text-3xl text-[#FDE68A] font-bold drop-shadow-xs relative",
							children: activeDhikr.arabic
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-extrabold text-white relative",
							children: activeDhikr.translit
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-emerald-100/85 relative",
							children: activeDhikr.meaning
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center gap-1.5 flex-wrap",
					children: [
						33,
						99,
						100,
						1e3
					].map((goal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTargetGoal(goal),
						className: `min-h-[34px] px-3 py-1 rounded-full text-xs font-extrabold tabular-nums transition ${targetGoal === goal ? "bg-[#14532D] text-white" : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"}`,
						children: ["Target: ", goal]
					}, goal))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-1 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TasbihTapRing, {
						count: user.tasbihCount,
						target: tab === "Guided" ? activeDhikr.target : targetGoal,
						onTap: handleTapCounter
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center gap-2",
					children: confirmReset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							resetTasbih();
							setConfirmReset(false);
						},
						className: "min-h-[40px] px-5 py-2 rounded-full bg-rose-600 text-white font-extrabold text-xs shadow-xs",
						children: "Confirm Reset to 0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setConfirmReset(false),
						className: "min-h-[40px] px-4 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-extrabold text-xs",
						children: "Cancel"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setConfirmReset(true),
						className: "min-h-[42px] px-8 py-2 rounded-full bg-amber-200 dark:bg-amber-500/25 border border-amber-400/70 text-amber-950 dark:text-amber-200 font-extrabold text-xs shadow-xs inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2.5 pt-1",
					children: dhikrList.map((d, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setActiveDhikr(idx);
							setTargetGoal(d.target);
						},
						className: `rounded-2xl p-3 border text-center transition ${user.activeDhikrIndex === idx ? "bg-[var(--bg-surface)] border-amber-400 ring-2 ring-amber-400/40 shadow-xs" : "bg-[var(--bg-surface)] border-[var(--border-subtle)]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base font-extrabold text-[var(--text-primary)] tabular-nums",
							children: d.target
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold text-[var(--text-secondary)] truncate mt-0.5",
							children: d.translit
						})]
					}, d.translit))
				})
			] })
		})]
	});
};
var AdultCalendarScreen = () => {
	const { setAdultRoute, user, updateUser } = useIlmizo();
	const [selectedSection, setSelectedSection] = (0, import_react.useState)("events");
	const hijriToday = computeHijriDate(/* @__PURE__ */ new Date(), user.hijriAdjustmentDays || 0);
	const [monthIdx, setMonthIdx] = (0, import_react.useState)(() => Math.max(0, Math.min(11, hijriToday.monthNumber - 1)));
	const [selectedHijriDay, setSelectedHijriDay] = (0, import_react.useState)(hijriToday.day);
	const hijriMonths = [
		{
			name: `Muharram ${hijriToday.year} AH`,
			greg: "Month 1 · Sacred Month",
			event: "1st Muharram (Islamic New Year) & 10th Muharram (Day of Ashura)"
		},
		{
			name: `Safar ${hijriToday.year} AH`,
			greg: "Month 2",
			event: "Ayyam al-Beed (13th, 14th, 15th White Days Fasting)"
		},
		{
			name: `Rabi’ al-Awwal ${hijriToday.year} AH`,
			greg: "Month 3",
			event: "Prophetic Seerah Reflections & Hijrah Arrival in Madinah"
		},
		{
			name: `Rabi’ al-Thani ${hijriToday.year} AH`,
			greg: "Month 4",
			event: "Ayyam al-Beed Sunnah Fasting (13th–15th Rabi’ al-Thani)"
		},
		{
			name: `Jumada al-Ula ${hijriToday.year} AH`,
			greg: "Month 5",
			event: "White Days & Monday/Thursday Sunnah Fasts"
		},
		{
			name: `Jumada al-Akhirah ${hijriToday.year} AH`,
			greg: "Month 6",
			event: "Mid-Year Hijri Reflection & Hifz Review"
		},
		{
			name: `Rajab ${hijriToday.year} AH`,
			greg: "Month 7 · Sacred Month",
			event: "Sacred Month of Allah · Preparation for Ramadan"
		},
		{
			name: `Sha’ban ${hijriToday.year} AH`,
			greg: "Month 8",
			event: "Increased Sunnah Fasting ahead of Blessed Ramadan"
		},
		{
			name: `Ramadan ${hijriToday.year} AH`,
			greg: "Month 9 · Fasting",
			event: "Month of Obligatory Fasting, Quran Revelation & Laylat al-Qadr"
		},
		{
			name: `Shawwal ${hijriToday.year} AH`,
			greg: "Month 10",
			event: "1st Shawwal: Eid al-Fitr & 6 Days of Shawwal Fasting"
		},
		{
			name: `Dhu al-Qa’dah ${hijriToday.year} AH`,
			greg: "Month 11 · Sacred Month",
			event: "Sacred Month · Preparation for Hajj"
		},
		{
			name: `Dhu al-Hijjah ${hijriToday.year} AH`,
			greg: "Month 12 · Sacred Month",
			event: "9th Day of Arafah & 10th Eid al-Adha"
		}
	];
	const activeMonth = hijriMonths[monthIdx] || hijriMonths[0];
	const reminders = user.calendarReminders || {
		whiteDays: true,
		mondayThursday: false,
		ashura: true,
		ramadan: true,
		arafah: true
	};
	const rows = [
		{
			id: "events",
			label: "Islamic Events",
			sub: `${activeMonth.name}: ${activeMonth.event}`
		},
		{
			id: "dates",
			label: "Important Dates (Estimated vs Confirmed)",
			sub: "10th Muharram (Ashura), 1st–30th Ramadan, 1st Shawwal (Eid al-Fitr), 9th Dhu al-Hijjah (Arafah), 10th Dhu al-Hijjah (Eid al-Adha). All future Islamic dates are astronomical/tabular estimates until confirmed by local crescent sighting."
		},
		{
			id: "months",
			label: "Learn about Months",
			sub: "The 4 Sacred Months (Al-Ashhur al-Hurum) are Muharram, Rajab, Dhu al-Qa’dah, and Dhu al-Hijjah (Quran 9:36)."
		},
		{
			id: "reminders",
			label: "In-App Observing Preferences",
			sub: "Toggle your personal observance reminders below (persisted locally on this device; does not schedule background OS push notifications)."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden bg-[#0F3826] text-white rounded-b-[28px] shadow-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
					time: "9:31",
					light: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 pt-1 pb-3 relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-base font-extrabold",
							children: "Islamic Calendar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoDisclosure, {
							variant: "dark",
							label: "Hijri Note",
							sheetTitle: "Hijri Lunar Date Convention",
							sheetSubtitle: "Umm al-Qura / Tabular Islamic Estimate",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Hijri lunar dates are calculated using the Umm al-Qura / Tabular Islamic convention and may vary by ±1–2 days depending on local crescent moon sighting." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use the Moon-Sighting Offset controls (-2d to +2d) to match your local Islamic authority." })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-40 w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/assets/illustrations/adult_calendar_mosque.webp",
						alt: "Hijri Mosque",
						loading: "lazy",
						decoding: "async",
						className: "w-full h-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[var(--bg-app)] via-transparent to-black/20" })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-2 text-center space-y-3.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-extrabold text-[var(--text-primary)]",
							children: hijriToday.formatted
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-[var(--text-secondary)]",
							children: ["Gregorian: ", (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
								weekday: "short",
								day: "numeric",
								month: "short",
								year: "numeric"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-1.5 pt-1 flex-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-bold text-[var(--text-muted)]",
								children: "Moon-Sighting Offset:"
							}), [
								-2,
								-1,
								0,
								1,
								2
							].map((adj) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => updateUser({ hijriAdjustmentDays: adj }),
								className: `min-h-[30px] px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold tabular-nums transition ${(user.hijriAdjustmentDays || 0) === adj ? "bg-[#14532D] text-white" : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"}`,
								children: adj > 0 ? `+${adj}d` : `${adj}d`
							}, adj))]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xs p-4 space-y-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMonthIdx((i) => i > 0 ? i - 1 : hijriMonths.length - 1);
									setSelectedHijriDay(1);
								},
								className: "w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-200 flex items-center justify-center active:scale-95 transition",
								"aria-label": "Previous Hijri Month",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-extrabold text-[var(--text-primary)]",
								children: activeMonth.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-[var(--text-secondary)] mt-0.5",
								children: activeMonth.greg
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMonthIdx((i) => (i + 1) % hijriMonths.length);
									setSelectedHijriDay(1);
								},
								className: "w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-200 flex items-center justify-center active:scale-95 transition",
								"aria-label": "Next Hijri Month",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })
							})
						]
					}), (() => {
						const viewedMonthNumber = monthIdx + 1;
						const daysInMonth = viewedMonthNumber % 2 === 1 ? 30 : 29;
						const todayWeekday = (/* @__PURE__ */ new Date()).getDay();
						const isCurrentHijriMonth = viewedMonthNumber === hijriToday.monthNumber;
						const firstDayOffset = isCurrentHijriMonth ? ((todayWeekday - (hijriToday.day - 1) % 7) % 7 + 7) % 7 : (monthIdx * 2 + 1) % 7;
						const specialDayLabels = {
							13: "Ayyam al-Beed (White Day Fast)",
							14: "Ayyam al-Beed (White Day Fast)",
							15: "Ayyam al-Beed (White Day Fast)"
						};
						if (viewedMonthNumber === 1) {
							specialDayLabels[1] = "Islamic New Year (1st Muharram)";
							specialDayLabels[10] = "Day of Ashura (10th Muharram)";
						} else if (viewedMonthNumber === 9) {
							specialDayLabels[1] = "Beginning of Blessed Ramadan";
							specialDayLabels[27] = "27th Night of Ramadan (Seek Laylat al-Qadr)";
						} else if (viewedMonthNumber === 10) specialDayLabels[1] = "Eid al-Fitr (1st Shawwal)";
						else if (viewedMonthNumber === 12) {
							specialDayLabels[9] = "Day of Arafah (9th Dhu al-Hijjah)";
							specialDayLabels[10] = "Eid al-Adha (10th Dhu al-Hijjah)";
						}
						const cells = [...Array.from({ length: firstDayOffset }, () => null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
						const activeDayNote = specialDayLabels[selectedHijriDay];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-7 gap-1 text-[11px] font-bold text-[var(--text-muted)]",
									children: [
										"Sun",
										"Mon",
										"Tue",
										"Wed",
										"Thu",
										"Fri",
										"Sat"
									].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `py-1 ${d === "Fri" ? "text-[#14532D] dark:text-amber-300" : ""}`,
										children: d
									}, d))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-7 gap-1",
									children: cells.map((dayNum, idx) => {
										if (dayNum === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10" }, `empty-${idx}`);
										const isTodayCell = isCurrentHijriMonth && dayNum === hijriToday.day;
										const isSelectedCell = dayNum === selectedHijriDay;
										const hasSpecialEvent = Boolean(specialDayLabels[dayNum]);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setSelectedHijriDay(dayNum),
											className: `h-10 rounded-xl flex flex-col items-center justify-center relative text-xs font-extrabold tabular-nums transition ${isTodayCell ? "bg-gradient-to-br from-[#14532D] to-[#16A34A] text-white ring-2 ring-amber-400 shadow-xs" : isSelectedCell ? "bg-amber-100 dark:bg-amber-500/20 text-emerald-950 dark:text-amber-200 border border-amber-400/70" : "text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dayNum }), hasSpecialEvent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full mt-0.5 ${isTodayCell ? "bg-amber-300" : "bg-[#F59E0B]"}` })]
										}, dayNum);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-3.5 py-2.5 text-left flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-extrabold text-[var(--text-primary)] tabular-nums",
											children: [
												selectedHijriDay,
												" ",
												activeMonth.name
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-[var(--text-secondary)] truncate mt-0.5",
											children: activeDayNote || "Lunar calendar estimate · Confirm with local crescent sighting"
										})]
									}), activeDayNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200 text-[11px] font-extrabold shrink-0",
										children: "Notable"
									})]
								})
							]
						});
					})()]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2.5 text-left",
					children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xs overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSelectedSection(selectedSection === r.id ? null : r.id),
							className: "w-full p-3.5 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-9 h-9 rounded-xl bg-emerald-950/5 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-300 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-extrabold text-[var(--text-primary)]",
									children: r.label
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `w-4 h-4 text-[var(--text-muted)] transition-transform ${selectedSection === r.id ? "rotate-90" : ""}` })]
						}), selectedSection === r.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 pb-3.5 text-xs text-[var(--text-secondary)] border-t border-[var(--divider)] pt-2.5 leading-relaxed space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: r.sub }), r.id === "reminders" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2 pt-1",
								children: [
									{
										key: "ashura",
										label: "10th Muharram (Ashura)"
									},
									{
										key: "whiteDays",
										label: "Ayyam al-Beed (13-15th)"
									},
									{
										key: "ramadan",
										label: "Ramadan Moon Sighting"
									},
									{
										key: "arafah",
										label: "9th Dhu al-Hijjah (Arafah)"
									}
								].map((item) => {
									const enabled = reminders[item.key];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => updateUser({ calendarReminders: {
											...reminders,
											[item.key]: !enabled
										} }),
										className: `p-2.5 rounded-xl border text-left text-[11px] font-bold flex items-center justify-between ${enabled ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700/50 text-[#14532D] dark:text-emerald-200" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: enabled ? "ON" : "OFF" })]
									}, item.key);
								})
							})]
						})]
					}, r.id))
				})
			]
		})]
	});
};
var AdultTasksAndExpensesScreen = () => {
	const { tasks, addTask, toggleTask, deleteTask, expenses, addExpense, deleteExpense } = useIlmizo();
	const [tab, setTab] = (0, import_react.useState)("tasks");
	const [addTaskSheetOpen, setAddTaskSheetOpen] = (0, import_react.useState)(false);
	const [addEntrySheetOpen, setAddEntrySheetOpen] = (0, import_react.useState)(false);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const [newTaskTitle, setNewTaskTitle] = (0, import_react.useState)("");
	const [newTaskCategory, setNewTaskCategory] = (0, import_react.useState)("Deen");
	const [newTaskPrayer, setNewTaskPrayer] = (0, import_react.useState)("Fajr");
	const [expTitle, setExpTitle] = (0, import_react.useState)("");
	const [expAmount, setExpAmount] = (0, import_react.useState)("");
	const [expType, setExpType] = (0, import_react.useState)("sadaqah");
	const [expCategory, setExpCategory] = (0, import_react.useState)("Sadaqah");
	const [zakatableSavings, setZakatableSavings] = (0, import_react.useState)(25e4);
	const openTasksCount = tasks.filter((t) => !t.completed).length;
	const completedTasksCount = tasks.filter((t) => t.completed).length;
	const totalIncome = expenses.filter((e) => e.type === "income").reduce((acc, e) => acc + e.amount, 0);
	const totalOutflow = expenses.filter((e) => e.type === "expense").reduce((acc, e) => acc + e.amount, 0);
	const totalCharity = expenses.filter((e) => e.type === "sadaqah" || e.type === "zakat").reduce((acc, e) => acc + e.amount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-28 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pt-safe pb-4 shadow-md border-b border-amber-400/15",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 pt-3 pb-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-lg font-extrabold tracking-tight",
								children: "Tasks & Sadaqah"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-emerald-100/80",
								children: [
									completedTasksCount,
									" of ",
									tasks.length,
									" tasks done · ₹",
									totalCharity.toLocaleString(),
									" charity"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								triggerLightHaptic();
								if (tab === "expenses") setAddEntrySheetOpen(true);
								else setAddTaskSheetOpen(true);
							},
							"aria-label": tab === "expenses" ? "Log Sadaqah or Expense" : "Add New Task",
							className: "min-w-[44px] min-h-[44px] rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shadow-xs active:scale-95 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-5 h-5" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-4 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-2xl",
					children: [
						{
							id: "tasks",
							label: `Tasks (${openTasksCount})`
						},
						{
							id: "expenses",
							label: "Sadaqah & Log"
						},
						{
							id: "zakat",
							label: "Zakat 2.5%"
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab(item.id),
						className: `min-h-[38px] py-1.5 rounded-xl text-xs font-extrabold transition ${tab === item.id ? "bg-amber-400 text-emerald-950 shadow-xs" : "text-emerald-100 hover:bg-white/10"}`,
						children: item.label
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pt-4 space-y-4 max-w-2xl mx-auto",
				children: [
					tab === "tasks" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-extrabold text-[var(--text-primary)]",
								children: "Today’s Deeds & Tasks"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--text-secondary)]",
								children: "Anchored around your five daily prayers"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
								onClick: () => setAddTaskSheetOpen(true),
								className: "min-h-[40px] px-4 py-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add Task" })]
							})]
						}), tasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-6 h-6" }),
							title: "No tasks scheduled yet",
							description: "Add a simple daily goal like reading Surah Al-Mulk after Isha or calling your parents.",
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
								onClick: () => setAddTaskSheetOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add Your First Task" })]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] divide-y divide-[var(--divider)] overflow-hidden shadow-2xs",
							children: tasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-4 py-3.5 flex items-center justify-between gap-3 hover:bg-[var(--bg-elevated)]/50 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										triggerLightHaptic();
										toggleTask(task.id);
									},
									className: "flex items-center gap-3.5 text-left flex-1 min-h-[44px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition ${task.completed ? "bg-[#14532D] border-[#14532D] text-white" : "border-[var(--border-strong)] bg-[var(--bg-elevated)]"}`,
										children: task.completed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 stroke-[2.5]" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `text-sm font-bold leading-snug ${task.completed ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"}`,
											children: task.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-[var(--text-secondary)] mt-0.5",
											children: [
												task.category,
												" · ",
												task.prayerAnchor === "Anytime" ? "Anytime" : `After ${task.prayerAnchor}`
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setPendingDelete({
										kind: "task",
										id: task.id,
										title: task.title
									}),
									className: "min-w-[40px] min-h-[40px] rounded-xl text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition",
									"aria-label": `Delete task ${task.title}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
								})]
							}, task.id))
						})]
					}),
					tab === "expenses" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] shadow-2xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-[var(--text-secondary)] font-semibold",
											children: "Income"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-base font-extrabold text-emerald-700 dark:text-emerald-300 tabular-nums mt-0.5",
											children: ["₹", totalIncome.toLocaleString()]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-[var(--bg-surface)] p-3.5 border border-[var(--border-subtle)] shadow-2xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-[var(--text-secondary)] font-semibold",
											children: "Expenses"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-base font-extrabold text-[var(--text-primary)] tabular-nums mt-0.5",
											children: ["₹", totalOutflow.toLocaleString()]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-amber-50 dark:bg-amber-500/15 p-3.5 border border-amber-300/80 dark:border-amber-400/35 shadow-2xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-amber-900 dark:text-amber-300 font-bold",
											children: "Sadaqah"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-base font-extrabold text-amber-950 dark:text-amber-100 tabular-nums mt-0.5",
											children: ["₹", totalCharity.toLocaleString()]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-extrabold text-[var(--text-primary)]",
									children: "Charity & Expense History"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
									onClick: () => setAddEntrySheetOpen(true),
									className: "min-h-[40px] px-4 py-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Log Entry" })]
								})]
							}),
							expenses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "w-6 h-6" }),
								title: "No entries logged yet",
								description: "Track your Sadaqah, Zakat, and household spending privately on this device.",
								action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
									onClick: () => setAddEntrySheetOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Log First Entry" })]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] divide-y divide-[var(--divider)] overflow-hidden shadow-2xs",
								children: expenses.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-4 py-3.5 flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-bold text-[var(--text-primary)] truncate",
											children: item.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-[var(--text-secondary)] mt-0.5",
											children: [
												item.category,
												" · ",
												item.type.charAt(0).toUpperCase() + item.type.slice(1),
												" · ",
												item.date
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `text-sm font-extrabold tabular-nums ${item.type === "income" ? "text-emerald-700 dark:text-emerald-300" : item.type === "sadaqah" || item.type === "zakat" ? "text-amber-700 dark:text-amber-300" : "text-[var(--text-primary)]"}`,
											children: [
												item.type === "income" ? "+" : "-",
												"₹",
												item.amount.toLocaleString()
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setPendingDelete({
												kind: "expense",
												id: item.id,
												title: item.title
											}),
											className: "min-w-[40px] min-h-[40px] rounded-xl text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition",
											"aria-label": `Delete entry ${item.title}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
										})]
									})]
								}, item.id))
							})
						]
					}),
					tab === "zakat" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-[var(--bg-surface)] p-5 shadow-2xs border border-[var(--border-subtle)] space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-extrabold text-[var(--text-primary)]",
								children: "Annual Zakat (2.5%) Calculator"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--text-secondary)] mt-0.5",
								children: "Enter your net Zakatable savings held for one lunar year above Nisab."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "zakat-savings-input",
									className: "text-xs font-bold text-[var(--text-secondary)] block",
									children: "Zakatable Savings (₹)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "zakat-savings-input",
									type: "number",
									value: zakatableSavings,
									onChange: (e) => setZakatableSavings(Math.max(0, Number(e.target.value))),
									className: "w-full min-h-[48px] rounded-2xl ilmizo-input px-4 py-3 text-base font-extrabold tabular-nums"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[#0F3826] text-white p-4 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-emerald-200",
									children: "Obligatory Zakat (2.5%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-2xl font-extrabold text-amber-300 tabular-nums mt-0.5",
									children: ["₹", Math.round(zakatableSavings * .025).toLocaleString()]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										addExpense({
											title: "Zakat Payment Logged",
											amount: Math.round(zakatableSavings * .025),
											type: "zakat",
											category: "Zakat",
											date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
										});
										setTab("expenses");
									},
									className: "min-h-[44px] px-4 py-2 rounded-xl bg-amber-400 text-emerald-950 font-extrabold text-xs shrink-0 active:scale-95 transition",
									children: "Log Zakat"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
				open: addTaskSheetOpen,
				onClose: () => setAddTaskSheetOpen(false),
				title: "Add Daily Task",
				subtitle: "Anchor a beneficial deed or reminder to a daily prayer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						if (!newTaskTitle.trim()) return;
						addTask({
							title: newTaskTitle.trim(),
							category: newTaskCategory,
							prayerAnchor: newTaskPrayer,
							priority: "high",
							dueDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
						});
						setNewTaskTitle("");
						setAddTaskSheetOpen(false);
					},
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[var(--text-secondary)] block",
								children: "Task Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: newTaskTitle,
								onChange: (e) => setNewTaskTitle(e.target.value),
								placeholder: "e.g., Read Surah Al-Mulk after Isha",
								className: "w-full min-h-[46px] rounded-2xl ilmizo-input px-4 py-2.5 text-sm",
								autoFocus: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[var(--text-secondary)] block",
									children: "Category"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
									value: newTaskCategory,
									onChange: (val) => setNewTaskCategory(val),
									title: "Task Category",
									options: [
										{
											value: "Deen",
											label: "Deen"
										},
										{
											value: "Family",
											label: "Family"
										},
										{
											value: "Work",
											label: "Work"
										},
										{
											value: "Personal",
											label: "Personal"
										}
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[var(--text-secondary)] block",
									children: "Prayer Anchor"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
									value: newTaskPrayer,
									onChange: (val) => setNewTaskPrayer(val),
									title: "Prayer Anchor",
									options: [
										{
											value: "Fajr",
											label: "After Fajr"
										},
										{
											value: "Dhuhr",
											label: "After Dhuhr"
										},
										{
											value: "Asr",
											label: "After Asr"
										},
										{
											value: "Maghrib",
											label: "After Maghrib"
										},
										{
											value: "Isha",
											label: "After Isha"
										},
										{
											value: "Anytime",
											label: "Anytime"
										}
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
							type: "submit",
							fullWidth: true,
							disabled: !newTaskTitle.trim(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Task" })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
				open: addEntrySheetOpen,
				onClose: () => setAddEntrySheetOpen(false),
				title: "Log Sadaqah or Expense",
				subtitle: "Saved privately on this device",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						const num = Number(expAmount);
						if (!expTitle.trim() || !num || num <= 0) return;
						addExpense({
							title: expTitle.trim(),
							amount: num,
							type: expType,
							category: expCategory,
							date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
						});
						setExpTitle("");
						setExpAmount("");
						setAddEntrySheetOpen(false);
					},
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[var(--text-secondary)] block",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: expTitle,
								onChange: (e) => setExpTitle(e.target.value),
								placeholder: "e.g., Friday Masjid Sadaqah",
								className: "w-full min-h-[46px] rounded-2xl ilmizo-input px-4 py-2.5 text-sm",
								autoFocus: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-[var(--text-secondary)] block",
									children: "Amount (₹)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: expAmount,
									onChange: (e) => setExpAmount(e.target.value),
									placeholder: "500",
									className: "w-full min-h-[46px] rounded-2xl ilmizo-input px-4 py-2.5 text-sm font-bold tabular-nums"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[var(--text-secondary)] block",
									children: "Entry Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
									value: expType,
									onChange: (val) => {
										const next = val;
										setExpType(next);
										if (next === "sadaqah") setExpCategory("Sadaqah");
										else if (next === "zakat") setExpCategory("Zakat");
										else if (next === "income") setExpCategory("Salary");
										else setExpCategory("Household");
									},
									title: "Entry Type",
									options: [
										{
											value: "sadaqah",
											label: "Sadaqah"
										},
										{
											value: "zakat",
											label: "Zakat"
										},
										{
											value: "expense",
											label: "Expense"
										},
										{
											value: "income",
											label: "Income"
										}
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-[var(--text-secondary)] block",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
								value: expCategory,
								onChange: (val) => setExpCategory(val),
								title: "Expense Category",
								options: [
									{
										value: "Sadaqah",
										label: "Sadaqah"
									},
									{
										value: "Zakat",
										label: "Zakat"
									},
									{
										value: "Household",
										label: "Household"
									},
									{
										value: "Food",
										label: "Food"
									},
									{
										value: "Education",
										label: "Education"
									},
									{
										value: "Salary",
										label: "Salary"
									},
									{
										value: "Other",
										label: "Other"
									}
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
							type: "submit",
							fullWidth: true,
							disabled: !expTitle.trim() || !Number(expAmount) || Number(expAmount) <= 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Entry" })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BottomSheet, {
				open: pendingDelete !== null,
				onClose: () => setPendingDelete(null),
				title: "Confirm Removal",
				subtitle: pendingDelete?.title,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-[var(--text-secondary)]",
					children: [
						"Remove this ",
						pendingDelete?.kind === "task" ? "task" : "entry",
						" from your device?"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2.5 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPendingDelete(null),
						className: "min-h-[46px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm font-bold text-[var(--text-primary)]",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							if (pendingDelete) {
								if (pendingDelete.kind === "task") deleteTask(pendingDelete.id);
								else deleteExpense(pendingDelete.id);
							}
							setPendingDelete(null);
						},
						className: "min-h-[46px] rounded-2xl bg-rose-600 text-white text-sm font-extrabold",
						children: "Remove"
					})]
				})]
			})
		]
	});
};
var AdultMoreSettingsScreen = () => {
	const { user, updateUser, setAdultRoute, setMode, isAudioMuted, toggleAudioMute, themeMode, setThemeMode } = useIlmizo();
	const { language, setLanguage, supportedLanguages } = useTranslation();
	const [activeSheetRow, setActiveSheetRow] = (0, import_react.useState)(null);
	const [hapticsOn, setHapticsOn] = (0, import_react.useState)(() => isHapticsEnabled());
	const [persistentCountdownOn, setPersistentCountdownOn] = (0, import_react.useState)(() => isPersistentPrayerCountdownEnabled());
	const [seniorModeOn, setSeniorModeOn] = useSeniorMinimalMode();
	const [batteryGuardOpen, setBatteryGuardOpen] = (0, import_react.useState)(false);
	const widgetCapability = getPrayerWidgetPlatformCapability();
	const currentLangLabel = supportedLanguages.find((l) => l.code === language)?.label || language.toUpperCase();
	const sheetMetaMap = {
		quran_settings: {
			label: "Quran Reading Preferences",
			sub: `Arabic size ${user.arabicFontScale}x`
		},
		language: {
			label: "Language & Translation",
			sub: currentLangLabel
		},
		audio: {
			label: "Audio & Reciter",
			sub: isAudioMuted ? "Muted" : user.reciterName || "Alafasy"
		},
		offline: {
			label: "Downloads & Local Backup",
			sub: "Saved privately on this device"
		},
		notifications: {
			label: "Reminders & Prayer Bar",
			sub: persistentCountdownOn ? "Active" : "Opt-in"
		},
		appearance: {
			label: "Appearance & Haptics",
			sub: `${themeMode} theme`
		},
		help: {
			label: "About Ilmizo & Privacy",
			sub: "Verified sources · Zero ads"
		}
	};
	const activeRowMeta = activeSheetRow ? sheetMetaMap[activeSheetRow] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-28 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pt-safe pb-4 shadow-md border-b border-amber-400/15",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 pt-3 pb-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-extrabold tracking-tight",
							children: "Settings & More"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setAdultRoute("profile"),
							className: "min-w-[44px] min-h-[44px] px-3 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-amber-300 flex items-center justify-center transition",
							children: "Profile"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pt-4 space-y-5 max-w-2xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMode("kids"),
							className: "min-h-[52px] rounded-2xl bg-[#22C55E] text-emerald-950 px-4 py-3 font-extrabold text-xs flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98] transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Kids World" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMode("parent"),
							className: "min-h-[52px] rounded-2xl bg-amber-400 text-emerald-950 px-4 py-3 font-extrabold text-xs flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98] transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Parent Hub" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsGroup, {
						title: "Account & Daily Tools",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4" }),
								title: user.name,
								subtitle: `${user.city}, ${user.country} · ${user.streakDays}-day streak`,
								value: "Profile",
								onClick: () => setAdultRoute("profile")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "w-4 h-4" }),
								title: "Tasks & Sadaqah",
								subtitle: "Daily prayer-anchored deeds, charity log & Zakat",
								onClick: () => setAdultRoute("tasks_expenses")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "w-4 h-4" }),
								title: "My Quran Journal",
								subtitle: "Saved verses, bookmarks & reflections",
								onClick: () => setAdultRoute("quran_journal")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" }),
								title: "Personalize 7-Day Plan",
								subtitle: "Update daily goals and reading focus",
								onClick: () => window.dispatchEvent(new Event("ilmizo:open-onboarding"))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsGroup, {
						title: "App Appearance",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 space-y-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold text-[var(--text-primary)]",
										children: "Theme"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[var(--text-secondary)]",
										children: "Applies across Adult, Kids & Parent Hub"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncStatusBadge, { compact: true })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeModeSegmentedControl, {
									value: themeMode,
									onChange: setThemeMode
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4" }),
								title: "Language",
								subtitle: "Menus, stories & translations",
								value: currentLangLabel,
								onClick: () => setActiveSheetRow("language")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" }),
								title: "Haptics & Motion",
								subtitle: "Tactile feedback on Tasbih & checkoffs",
								value: hapticsOn ? "On" : "Off",
								onClick: () => setActiveSheetRow("appearance")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4" }),
								title: "Senior / Minimal Mode",
								subtitle: "Calm 4-tile large-text Home (Quran, Salah, Duas, Tasbih)",
								value: seniorModeOn ? "On" : "Off",
								onClick: () => {
									triggerLightHaptic();
									setSeniorModeOn(!seniorModeOn);
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsGroup, {
						title: "Worship & Learning",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4" }),
								title: "Quran Reader Settings",
								subtitle: "Arabic script scale & translation visibility",
								value: `${user.arabicFontScale}x`,
								onClick: () => setActiveSheetRow("quran_settings")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-4 h-4" }),
								title: "Prayer Reminders & Bar",
								subtitle: "Daily Salah alerts & Android status bar",
								value: persistentCountdownOn ? "On" : "Opt-in",
								onClick: () => setActiveSheetRow("notifications")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4" }),
								title: "Adhan Battery-Guard Wizard",
								subtitle: "Fix Xiaomi, Samsung, Vivo & Oppo killing Fajr alarms",
								value: "Setup",
								onClick: () => {
									triggerLightHaptic();
									setBatteryGuardOpen(true);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "w-4 h-4" }),
								title: "Qibla, Tasbih & Calendar",
								subtitle: "Jump to worship tools",
								onClick: () => setAdultRoute("qibla")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsGroup, {
						title: "Special Learning Modules",
						children: [
							{
								id: "prophets_tree",
								title: "Prophets Family Tree",
								subtitle: "Interactive lineage of all 25 Quranic Prophets"
							},
							{
								id: "new_muslim",
								title: "New Muslim Pathway",
								subtitle: "7-stage beginner guide to faith, Wudu & Salah"
							},
							{
								id: "friday_hub",
								title: "Friday (Jummah) Hub",
								subtitle: "Sunnah checklist, Surah Al-Kahf & Salawat counter"
							},
							{
								id: "car_drive",
								title: "Car Drive Mode",
								subtitle: "Hands-free high-contrast Quran listening view"
							},
							{
								id: "reminder_cards",
								title: "Islamic Reminder Cards",
								subtitle: "Save & share verified Quran and Hadith cards offline"
							}
						].map((mod) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" }),
							title: mod.title,
							subtitle: mod.subtitle,
							value: "Open",
							onClick: () => {
								triggerLightHaptic();
								window.dispatchEvent(new CustomEvent("ilmizo:open-special-module", { detail: mod.id }));
							}
						}, mod.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsGroup, {
						title: "Audio & Storage",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" }),
							title: "Reciter & Sound",
							subtitle: user.reciterName || "Mishary Rashid Alafasy",
							value: isAudioMuted ? "Muted" : "On",
							onClick: () => setActiveSheetRow("audio")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4" }),
							title: "Offline Downloads & Backup",
							subtitle: "Manage Surahs, audio & encrypted backup files",
							value: "On Device",
							onClick: () => setActiveSheetRow("offline")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsGroup, {
						title: "Quick Access",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3.5 grid grid-cols-3 gap-2",
							children: [
								{
									id: "hifz",
									label: "Hifz Studio"
								},
								{
									id: "duas",
									label: "Duas"
								},
								{
									id: "names99",
									label: "99 Names"
								},
								{
									id: "seerah",
									label: "Seerah"
								},
								{
									id: "quizzes",
									label: "Quizzes"
								},
								{
									id: "progress",
									label: "Progress"
								},
								{
									id: "tasbih",
									label: "Tasbih"
								},
								{
									id: "calendar",
									label: "Calendar"
								},
								{
									id: "lessons",
									label: "Lessons"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									triggerLightHaptic();
									setAdultRoute(item.id);
								},
								className: "min-h-[44px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-2.5 py-2 text-xs font-bold text-[#14532D] dark:text-emerald-200 hover:border-emerald-600/40 transition text-center truncate active:scale-95",
								children: item.label
							}, item.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsGroup, {
						title: "About Ilmizo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "w-4 h-4" }),
							title: "Verified Sources & Privacy",
							subtitle: "Zero ads · Zero cloud tracking · Offline-first",
							onClick: () => setActiveSheetRow("help")
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BottomSheet, {
				open: activeSheetRow !== null,
				onClose: () => setActiveSheetRow(null),
				title: activeRowMeta?.label || "Settings",
				subtitle: activeRowMeta?.sub,
				children: [
					activeSheetRow === "language" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2.5",
						children: supportedLanguages.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setLanguage(lang.code),
							className: `min-h-[54px] p-3 rounded-2xl border text-left text-xs transition active:scale-[0.98] ${language === lang.code ? "bg-[#14532D] text-white border-[#14532D] font-bold" : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-sm",
								children: lang.nativeLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs opacity-80",
								children: lang.label
							})]
						}, lang.code))
					}),
					activeSheetRow === "quran_settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-[var(--text-primary)]",
								children: "Arabic Font Scale"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1.5",
								children: [
									1,
									2,
									3,
									4
								].map((scale) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => updateUser({ arabicFontScale: scale }),
									className: `min-w-[44px] min-h-[44px] rounded-xl text-xs font-bold transition ${user.arabicFontScale === scale ? "bg-[#14532D] text-white" : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)]"}`,
									children: [scale, "x"]
								}, scale))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pt-3 border-t border-[var(--divider)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-[var(--text-primary)]",
								children: "Show Translation in Reader"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => updateUser({ showTranslation: !user.showTranslation }),
								className: `min-h-[42px] px-4 rounded-xl text-xs font-extrabold ${user.showTranslation ? "bg-[#14532D] text-white" : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"}`,
								children: user.showTranslation ? "Visible" : "Hidden"
							})]
						})]
					}),
					activeSheetRow === "audio" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-[var(--text-primary)] block",
								children: "App Audio & Voice"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-[var(--text-secondary)]",
								children: "Plays only when you tap Play or Read Aloud"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: toggleAudioMute,
								className: `min-h-[44px] px-4 py-1.5 rounded-xl text-xs font-extrabold shrink-0 ${!isAudioMuted ? "bg-[#14532D] text-white" : "bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-700/50"}`,
								children: !isAudioMuted ? "Sound On" : "Muted"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 pt-3 border-t border-[var(--divider)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-[var(--text-primary)] block",
								children: "Preferred Reciter"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
								value: user.reciterName || "Mishary Rashid Alafasy",
								onChange: (val) => updateUser({ reciterName: val }),
								title: "Choose Preferred Reciter",
								subtitle: "Used across Quran Reader and Hifz Studio",
								options: [
									{
										value: "Mishary Rashid Alafasy",
										label: "Mishary Rashid Alafasy"
									},
									{
										value: "Abdul Basit Abdus Samad",
										label: "Abdul Basit Abdus Samad"
									},
									{
										value: "Abdur-Rahman as-Sudais",
										label: "Abdur-Rahman as-Sudais"
									},
									{
										value: "Mahmoud Khalil Al-Husary",
										label: "Mahmoud Khalil Al-Husary"
									}
								]
							})]
						})]
					}),
					activeSheetRow === "appearance" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-[var(--text-primary)] block",
								children: "Theme Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeModeSegmentedControl, {
								value: themeMode,
								onChange: setThemeMode
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-[var(--divider)] pt-3 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-[var(--text-primary)] block",
								children: "Subtle Haptics"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-[var(--text-secondary)]",
								children: "Gentle tactile feedback on Tasbih, Salah & tabs"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								role: "switch",
								"aria-checked": hapticsOn,
								onClick: () => {
									const next = !hapticsOn;
									setHapticsOn(next);
									setHapticsEnabled(next);
									if (next) triggerLightHaptic();
								},
								className: `min-h-[44px] px-4 py-1.5 rounded-xl text-xs font-extrabold shrink-0 ${hapticsOn ? "bg-[#14532D] text-white" : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"}`,
								children: hapticsOn ? "Haptics On" : "Off"
							})]
						})]
					}),
					activeSheetRow === "offline" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 text-xs text-[var(--text-secondary)]",
							children: "Loading offline tools…"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalDataManagerCard, { compact: true })
					}),
					activeSheetRow === "help" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2.5 text-xs text-[var(--text-secondary)] leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-extrabold text-[var(--text-primary)]",
								children: "Ilmizo Verified Content & Privacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Quran Arabic: Tanzil / King Fahd Glorious Quran Printing Complex Uthmani Script." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Duas & Adhkar: Hisn al-Muslim, Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud & Jami` at-Tirmidhi." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Seerah: Ar-Raheeq Al-Makhtum & Sahih Hadith Compendiums." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 flex items-center justify-between border-t border-[var(--divider)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-emerald-800 dark:text-emerald-300",
									children: "Saved on this device · Zero ads"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/privacy-policy.html",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "min-h-[40px] px-4 inline-flex items-center rounded-full bg-[#14532D] text-white text-xs font-extrabold hover:brightness-110",
									children: "Privacy Policy"
								})]
							})
						]
					}),
					activeSheetRow === "notifications" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 text-xs text-[var(--text-secondary)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "leading-relaxed",
							children: [
								"Daily Salah & Hifz reminders configured for",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-[var(--text-primary)]",
									children: user.name
								}),
								" (",
								user.city,
								")."
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-bold text-[var(--text-primary)]",
									children: "Persistent Next-Prayer Bar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[var(--text-secondary)]",
									children: "Silent ongoing status notification showing your next Salah time on Android."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: async () => {
										const next = !persistentCountdownOn;
										setPersistentCountdownOn(next);
										triggerLightHaptic();
										await setPersistentPrayerCountdownEnabled(next);
									},
									className: `min-h-[42px] px-3.5 rounded-xl text-xs font-extrabold border shrink-0 transition ${persistentCountdownOn ? "bg-[#14532D] text-white border-[#14532D]" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
									children: persistentCountdownOn ? "Enabled" : "Off"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-emerald-50/70 dark:bg-emerald-900/30 border border-emerald-900/15 dark:border-emerald-500/20 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
									children: [
										"Home-Screen Prayer Widgets (",
										widgetCapability.platform.toUpperCase(),
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed",
									children: widgetCapability.honestStatusNote
								})]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OemBatteryGuardSheet, {
				open: batteryGuardOpen,
				onClose: () => setBatteryGuardOpen(false)
			})
		]
	});
};
var AdultProfileScreen = () => {
	const { user, updateUser, bookmarks, openSurahForReading, personalNotes, addPersonalNote, deletePersonalNote, recentlyOpenedSurahs, quizAttempts, completedLessonIds, hifzPlans } = useIlmizo();
	const [activeSheet, setActiveSheet] = (0, import_react.useState)(null);
	const [noteTitle, setNoteTitle] = (0, import_react.useState)("");
	const [noteBody, setNoteBody] = (0, import_react.useState)("");
	const [noteRef, setNoteRef] = (0, import_react.useState)("");
	const [editName, setEditName] = (0, import_react.useState)(user.name);
	const [editCity, setEditCity] = (0, import_react.useState)(user.city);
	const profileRows = [
		{
			id: "bookmarks",
			label: `My Bookmarks (${bookmarks.length})`,
			icon: Bookmark
		},
		{
			id: "notes",
			label: `My Notes (${personalNotes.length})`,
			icon: FileText
		},
		{
			id: "achievements",
			label: "My Achievements",
			icon: Award
		},
		{
			id: "history",
			label: "Learning History",
			icon: Clock
		},
		{
			id: "account",
			label: "Account Settings & Backup",
			icon: Settings
		}
	];
	const activeRowMeta = profileRows.find((r) => r.id === activeSheet);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pb-4 shadow-md border-b border-amber-400/15",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStatusBar, {
					time: "9:31",
					light: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 pt-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-extrabold",
							children: "My Profile"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncStatusBadge, { compact: true })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pt-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterAvatar, {
								character: "Aqib",
								size: "xl"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-extrabold text-[var(--text-primary)] mt-2.5",
								children: user.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-[var(--text-secondary)]",
								children: [
									user.city,
									", ",
									user.country,
									" · Streak: ",
									user.streakDays,
									" days"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-400/35 p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3.5 min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-11 h-11 rounded-2xl bg-amber-400/30 flex items-center justify-center text-amber-900 dark:text-amber-300 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-6 h-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-extrabold text-[var(--text-primary)]",
								children: "Your Calm Daily Routine"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--text-secondary)] leading-relaxed mt-0.5",
								children: "Adjust your personal goals, child age band, or 7-day plan anytime — stored locally."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => window.dispatchEvent(new Event("ilmizo:open-onboarding")),
							className: "min-h-[44px] px-4 rounded-xl bg-[#14532D] text-white text-xs font-extrabold shrink-0",
							children: "Edit 7-Day Plan"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-3xl bg-[var(--bg-surface)] divide-y divide-[var(--divider)] shadow-xs border border-[var(--border-subtle)] overflow-hidden",
						children: profileRows.map((row) => {
							const Icon = row.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									triggerLightHaptic();
									setActiveSheet(row.id);
								},
								className: "w-full min-h-[54px] px-4 py-3.5 flex items-center justify-between hover:bg-[var(--bg-elevated)] transition text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-300 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-bold text-[var(--text-primary)]",
										children: row.label
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4 text-[var(--text-muted)]" })]
							}, row.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BottomSheet, {
				open: activeSheet !== null,
				onClose: () => setActiveSheet(null),
				title: activeRowMeta?.label || "Profile",
				children: [
					activeSheet === "bookmarks" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: bookmarks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-secondary)] py-4 text-center",
							children: "No bookmarks saved yet. Tap the bookmark icon on any Quran verse to save it here."
						}) : bookmarks.map((bm) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setActiveSheet(null);
								openSurahForReading(bm.surahNumber, bm.ayahNumber);
							},
							className: "w-full text-left rounded-2xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)] text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-[var(--text-primary)]",
								children: [
									bm.surahName,
									" · Ayah ",
									bm.ayahNumber
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-arabic text-lg text-[var(--text-primary)] mt-1",
								children: bm.arabicSnippet
							})]
						}, bm.id))
					}),
					activeSheet === "notes" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								if (!noteTitle.trim() || !noteBody.trim()) return;
								addPersonalNote(noteTitle.trim(), noteBody.trim(), noteRef.trim() || void 0);
								setNoteTitle("");
								setNoteBody("");
								setNoteRef("");
							},
							className: "space-y-2 rounded-2xl bg-[var(--bg-elevated)] p-3.5 border border-[var(--border-subtle)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold text-[var(--text-primary)]",
									children: "Add Reflection Note"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: noteTitle,
									onChange: (e) => setNoteTitle(e.target.value),
									placeholder: "Note title (e.g., Ayat al-Kursi reflection)...",
									className: "w-full rounded-xl ilmizo-input px-3 py-2 text-xs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: noteRef,
									onChange: (e) => setNoteRef(e.target.value),
									placeholder: "Reference (optional, e.g. Al-Baqarah 2:255)...",
									className: "w-full rounded-xl ilmizo-input px-3 py-2 text-xs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 2,
									value: noteBody,
									onChange: (e) => setNoteBody(e.target.value),
									placeholder: "Write your reflection...",
									className: "w-full rounded-xl ilmizo-input px-3 py-2 text-xs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "w-full min-h-[42px] py-2 rounded-xl bg-[#14532D] text-white text-xs font-extrabold",
									children: "Save Note"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: personalNotes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)] text-xs flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-extrabold text-[var(--text-primary)]",
										children: note.title
									}),
									note.surahReference && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-bold text-emerald-700 dark:text-emerald-300",
										children: [
											note.surahReference,
											" · ",
											note.createdAt
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[var(--text-secondary)] mt-1",
										children: note.body
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => deletePersonalNote(note.id),
									className: "text-[var(--text-muted)] hover:text-rose-500 p-1",
									"aria-label": "Delete note",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
								})]
							}, note.id))
						})]
					}),
					activeSheet === "achievements" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)] flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-[var(--text-primary)]",
								children: "Hifz Surahs Completed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums",
								children: [hifzPlans.filter((p) => p.status === "completed").length, " / 114"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)] flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-[var(--text-primary)]",
								children: "Lessons Completed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums",
								children: [
									completedLessonIds.length,
									" / ",
									ISLAMIC_LESSONS.length
								]
							})]
						})]
					}),
					activeSheet === "history" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2.5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-[var(--text-primary)]",
								children: "Recently Opened Surahs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: recentlyOpenedSurahs.map((sNum) => {
									const sMeta = ALL_114_SURAHS.find((s) => s.number === sNum);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setActiveSheet(null);
											openSurahForReading(sNum, 1);
										},
										className: "px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[#14532D] dark:text-emerald-300",
										children: [
											sNum,
											". ",
											sMeta?.nameTranslit
										]
									}, sNum);
								})
							}),
							quizAttempts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-[var(--text-secondary)] pt-1",
								children: [
									"Last Quiz: ",
									quizAttempts[0].quizTitle,
									" (",
									quizAttempts[0].score,
									"/",
									quizAttempts[0].total,
									")"
								]
							})
						]
					}),
					activeSheet === "account" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: editName,
									onChange: (e) => setEditName(e.target.value),
									placeholder: "Your Name",
									className: "rounded-xl ilmizo-input px-3 py-2 text-xs font-bold"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: editCity,
									onChange: (e) => setEditCity(e.target.value),
									placeholder: "Your City",
									className: "rounded-xl ilmizo-input px-3 py-2 text-xs font-bold"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									updateUser({
										name: editName.trim() || user.name,
										city: editCity.trim() || user.city
									});
									setActiveSheet(null);
								},
								className: "w-full min-h-[42px] py-2 rounded-xl bg-amber-400 text-emerald-950 text-xs font-extrabold",
								children: "Save Profile Details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-3 text-xs text-[var(--text-secondary)]",
									children: "Loading backup tools..."
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalDataManagerCard, { compact: true })
							})
						]
					})
				]
			})
		]
	});
};
export { AdultCalendarScreen, AdultLessonsScreen, AdultMoreSettingsScreen, AdultProfileScreen, AdultProgressScreen, AdultQiblaScreen, AdultQuizzesScreen, AdultTasbihScreen, AdultTasksAndExpensesScreen };
