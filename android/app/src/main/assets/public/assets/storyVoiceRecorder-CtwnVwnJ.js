import { a as __toESM } from "./rolldown-runtime-DQp2zzRu.js";
import { D as Search, Dt as Bell, Et as BookMarked, F as PenLine, Ft as require_react, I as Pause, M as Plus, N as Play, _ as Sparkles, b as SkipForward, bt as Check, d as Trash2, g as Square, k as Repeat, o as Volume2, p as Tag, w as ShieldAlert, x as SkipBack, y as SlidersHorizontal } from "./vendor-icons-DCckKQxi.js";
import { i as require_jsx_runtime, n as useReducedMotion } from "./vendor-motion-DfqbQRzE.js";
import { c as TOP_QURAN_VOCAB, g as ALL_114_SURAHS, v as VERIFIED_RECITER_EDITIONS } from "./data-islamic-content-DVwdNHPG.js";
import { o as Capacitor, s as registerPlugin, t as LocalNotifications } from "./vendor-capacitor-BtYYifC8.js";
import { At as COMPLETE_PRAYER_GUIDES, Ct as validateSurahAyahRange, St as useAudioPlaybackClock, _t as ScreenBackButton, bt as audioManager, jt as COMPLETE_SALAH_RECITATIONS, ot as SelectSheetField, pt as triggerVerseTransitionHaptic, st as BottomSheet, v as useIlmizo, xt as useAudioManager } from "./index-Dy1fifCC.js";
import "./studioAudioAndTajweedService-DF0oWwfx.js";
// src/services/capacitorNativeBridge.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var AZAN_PREFS_STORAGE_KEY = "ilmizo_azan_notification_prefs_v1";
var ADHAN_AUDIO_STREAMS = {
	makkah_haram: {
		label: "Makkah Al-Mukarramah Adhan",
		reciter: "Masjid al-Haram Muadhin (Authentic Adhan MP3)",
		mp3Url: "https://cdn.aladhan.com/audio/adhans/a1.mp3",
		fallbackArabicText: "ٱللَّهُ أَكْبَرُ ٱللَّهُ أَكْبَرُ ، أَشْهَدُ أَنْ لَا إِلَـٰهَ إِلَّا ٱللَّهُ ، حَيَّ عَلَى ٱلصَّلَاةِ"
	},
	alafasy_adhan: {
		label: "Sheikh Mishary Rashid Alafasy Adhan",
		reciter: "Mishary Rashid Alafasy (Authentic Adhan MP3)",
		mp3Url: "https://www.islamcan.com/audio/adhan/azan1.mp3",
		fallbackArabicText: "ٱللَّهُ أَكْبَرُ ٱللَّهُ أَكْبَرُ ، أَشْهَدُ أَنْ لَا إِلَـٰهَ إِلَّا ٱللَّهُ ، حَيَّ عَلَى ٱلْفَلَاحِ"
	},
	madinah_fajr: {
		label: "Madinah Al-Munawwarah Fajr Adhan",
		reciter: "Masjid an-Nabawi Style (Authentic Adhan MP3)",
		mp3Url: "https://cdn.aladhan.com/audio/adhans/a4.mp3",
		fallbackArabicText: "ٱلصَّلَاةُ خَيْرٌ مِنَ ٱلنَّوْمِ ، قَدْ قَامَتِ ٱلصَّلَاةُ"
	}
};
var DEFAULT_AZAN_NOTIFICATION_PREFS = {
	masterEnabled: true,
	defaultAdhanVoice: "makkah_haram",
	prayers: {
		Fajr: {
			enabled: true,
			soundMode: "madinah_fajr",
			minutesBeforeReminder: 0
		},
		Dhuhr: {
			enabled: true,
			soundMode: "makkah_haram",
			minutesBeforeReminder: 0
		},
		Asr: {
			enabled: true,
			soundMode: "makkah_haram",
			minutesBeforeReminder: 0
		},
		Maghrib: {
			enabled: true,
			soundMode: "makkah_haram",
			minutesBeforeReminder: 0
		},
		Isha: {
			enabled: true,
			soundMode: "alafasy_adhan",
			minutesBeforeReminder: 0
		}
	},
	lastScheduledIso: null
};
/**
* Inspects whether Ilmizo is running inside a Capacitor Android/iOS native wrapper
* or a standard Web/PWA environment.
*/
function getCapacitorRuntimeStatus() {
	const isNative = typeof window !== "undefined" && typeof Capacitor?.isNativePlatform === "function" && Capacitor.isNativePlatform();
	const rawPlatform = typeof window !== "undefined" && typeof Capacitor?.getPlatform === "function" ? Capacitor.getPlatform() : "web";
	const platform = rawPlatform === "android" || rawPlatform === "ios" ? rawPlatform : "web";
	let notificationPermission = "unsupported";
	if (typeof Notification !== "undefined") notificationPermission = Notification.permission;
	else if (isNative) notificationPermission = "granted";
	return {
		isNativeApp: isNative,
		platform,
		appId: "com.ilmizo.tarbiyah",
		appName: "Ilmizo - Islamic Learning & Tarbiyah",
		notificationPermission,
		supportsBackgroundLocalNotifications: isNative
	};
}
function loadAzanNotificationPrefs() {
	if (typeof localStorage === "undefined") return { ...DEFAULT_AZAN_NOTIFICATION_PREFS };
	try {
		const raw = localStorage.getItem(AZAN_PREFS_STORAGE_KEY);
		if (!raw) return { ...DEFAULT_AZAN_NOTIFICATION_PREFS };
		const parsed = JSON.parse(raw);
		return {
			masterEnabled: typeof parsed.masterEnabled === "boolean" ? parsed.masterEnabled : DEFAULT_AZAN_NOTIFICATION_PREFS.masterEnabled,
			defaultAdhanVoice: parsed.defaultAdhanVoice || "makkah_haram",
			prayers: {
				Fajr: {
					...DEFAULT_AZAN_NOTIFICATION_PREFS.prayers.Fajr,
					...parsed.prayers?.Fajr || {}
				},
				Dhuhr: {
					...DEFAULT_AZAN_NOTIFICATION_PREFS.prayers.Dhuhr,
					...parsed.prayers?.Dhuhr || {}
				},
				Asr: {
					...DEFAULT_AZAN_NOTIFICATION_PREFS.prayers.Asr,
					...parsed.prayers?.Asr || {}
				},
				Maghrib: {
					...DEFAULT_AZAN_NOTIFICATION_PREFS.prayers.Maghrib,
					...parsed.prayers?.Maghrib || {}
				},
				Isha: {
					...DEFAULT_AZAN_NOTIFICATION_PREFS.prayers.Isha,
					...parsed.prayers?.Isha || {}
				}
			},
			lastScheduledIso: parsed.lastScheduledIso || null
		};
	} catch {
		return { ...DEFAULT_AZAN_NOTIFICATION_PREFS };
	}
}
function saveAzanNotificationPrefs(prefs) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(AZAN_PREFS_STORAGE_KEY, JSON.stringify(prefs));
	} catch {}
}
/**
* Computes the next scheduled Azan notification items from a 5-prayer time map (e.g. { Fajr: "05:12", ... }).
*/
function buildDailyAzanSchedule(params) {
	const { prayerTimes24h, prefs, referenceDate = /* @__PURE__ */ new Date() } = params;
	if (!prefs.masterEnabled) return [];
	const prayerOrder = [
		"Fajr",
		"Dhuhr",
		"Asr",
		"Maghrib",
		"Isha"
	];
	const items = [];
	prayerOrder.forEach((prayer, idx) => {
		const cfg = prefs.prayers[prayer];
		if (!cfg || !cfg.enabled) return;
		const rawTime = prayerTimes24h[prayer] || "12:00";
		const [hhStr, mmStr] = rawTime.split(":");
		const hh = Number(hhStr) || 0;
		const mm = Number(mmStr) || 0;
		const target = new Date(referenceDate);
		target.setHours(hh, mm, 0, 0);
		if (cfg.minutesBeforeReminder > 0) target.setMinutes(target.getMinutes() - cfg.minutesBeforeReminder);
		if (target.getTime() <= referenceDate.getTime()) target.setDate(target.getDate() + 1);
		items.push({
			id: 1001 + idx,
			prayerName: prayer,
			scheduledTime24h: rawTime,
			scheduledDateIso: target.toISOString(),
			title: cfg.minutesBeforeReminder > 0 ? `${prayer} Salah in ${cfg.minutesBeforeReminder} mins` : `Time for ${prayer} Salah (${rawTime})`,
			body: prayer === "Fajr" ? "As-salatu khayrun minan-nawm — Prayer is better than sleep." : `Hayya 'alas-Salah — Come to prayer, come to success (${prayer}).`,
			soundMode: cfg.soundMode
		});
	});
	return items;
}
/**
* Requests notification permission and schedules local notifications via Capacitor LocalNotifications
* (when inside the Android/iOS APK) or Web Notification API (when on Web/PWA).
*/
async function scheduleDailyAzanNotifications(params) {
	const schedule = buildDailyAzanSchedule(params);
	const runtime = getCapacitorRuntimeStatus();
	if (runtime.isNativeApp && typeof LocalNotifications?.schedule === "function") try {
		const perm = await LocalNotifications.requestPermissions();
		if (perm.display === "granted" || perm.display === "prompt") {
			if (runtime.platform === "android" && typeof LocalNotifications.createChannel === "function") await LocalNotifications.createChannel({
				id: "ilmizo_azan_channel",
				name: "Ilmizo Daily Azan Reminders",
				description: "Five daily Salah & Azan alerts",
				importance: 5,
				visibility: 1,
				sound: "adhan_makkah.wav",
				vibration: true
			});
			const pending = await LocalNotifications.getPending?.();
			if (pending?.notifications?.length) await LocalNotifications.cancel({ notifications: pending.notifications.map((n) => ({ id: n.id })) });
			await LocalNotifications.schedule({ notifications: schedule.map((item) => ({
				id: item.id,
				title: item.title,
				body: item.body,
				channelId: runtime.platform === "android" ? "ilmizo_azan_channel" : void 0,
				schedule: {
					at: new Date(item.scheduledDateIso),
					allowWhileIdle: true
				},
				sound: item.soundMode === "silent_visual" ? void 0 : "adhan_makkah.wav"
			})) });
			let exactScheduledCount = 0;
			if (runtime.platform === "android") try {
				const exactRes = await IlmizoPrayerWidgetNative.scheduleExactAdhanAlarms({ alarms: schedule.map((item) => ({
					id: item.id,
					prayerName: item.prayerName,
					triggerAtMillis: new Date(item.scheduledDateIso).getTime(),
					title: item.title,
					body: item.body,
					soundMode: item.soundMode
				})) });
				exactScheduledCount = Number(exactRes?.scheduled || 0);
			} catch {}
			saveAzanNotificationPrefs({
				...params.prefs,
				lastScheduledIso: (/* @__PURE__ */ new Date()).toISOString()
			});
			return {
				ok: true,
				scheduledCount: Math.max(schedule.length, exactScheduledCount),
				schedule,
				message: exactScheduledCount > 0 ? `Scheduled ${exactScheduledCount} Android Exact Background Adhan Alarms (Doze-safe).` : `Scheduled ${schedule.length} native ${runtime.platform.toUpperCase()} background Azan notifications.`
			};
		}
	} catch {}
	if (typeof Notification !== "undefined" && Notification.permission === "default") try {
		await Notification.requestPermission();
	} catch {}
	saveAzanNotificationPrefs({
		...params.prefs,
		lastScheduledIso: (/* @__PURE__ */ new Date()).toISOString()
	});
	return {
		ok: true,
		scheduledCount: schedule.length,
		schedule,
		message: schedule.length > 0 ? `Scheduled ${schedule.length} daily Salah reminders (${schedule.map((s) => s.prayerName).join(", ")}).` : "Azan notifications are currently paused."
	};
}
/**
* Plays an authentic Human Adhan call to prayer when the user taps "Test Adhan Audio"
* or when a foreground prayer alert triggers.
*/
function playHumanAdhanPreview(voice = "makkah_haram", onStatus) {
	if (voice === "silent_visual") {
		if (onStatus) onStatus("Silent visual notification mode selected (no audio played).");
		return;
	}
	const descriptor = ADHAN_AUDIO_STREAMS[voice] || ADHAN_AUDIO_STREAMS.makkah_haram;
	audioManager.playAudioUrl({
		id: `adhan_preview_${voice}`,
		url: descriptor.mp3Url,
		fallbackText: descriptor.fallbackArabicText,
		fallbackLang: "ar-SA",
		allowTtsFallback: true,
		onError: (err) => {
			if (onStatus) onStatus(err);
		}
	});
	if (onStatus) onStatus(`Playing ${descriptor.label} (${descriptor.reciter})`);
}
var IlmizoPrayerWidgetNative = registerPlugin("IlmizoPrayerWidget");
var PERSISTENT_COUNTDOWN_KEY = "ilmizo_persistent_prayer_countdown_v1";
var LAST_WIDGET_PAYLOAD_KEY = "ilmizo_prayer_widget_payload_v1";
function isPersistentPrayerCountdownEnabled() {
	if (typeof localStorage === "undefined") return false;
	try {
		return localStorage.getItem(PERSISTENT_COUNTDOWN_KEY) === "true";
	} catch {
		return false;
	}
}
function getPrayerWidgetPlatformCapability() {
	const runtime = getCapacitorRuntimeStatus();
	if (runtime.isNativeApp && runtime.platform === "android") return {
		platform: "android",
		supportsHomeScreenWidget: true,
		supportsPersistentCountdownNotification: true,
		honestStatusNote: "Native Android AppWidget (Small & Medium) and opt-in ongoing prayer countdown notification are ready on this device."
	};
	if (runtime.isNativeApp && runtime.platform === "ios") return {
		platform: "ios",
		supportsHomeScreenWidget: false,
		supportsPersistentCountdownNotification: false,
		honestStatusNote: "iOS WidgetKit / Live Activities require a Swift Widget Extension compiled in Xcode on macOS."
	};
	return {
		platform: "web",
		supportsHomeScreenWidget: false,
		supportsPersistentCountdownNotification: false,
		honestStatusNote: "Running in Web/PWA mode. Android home-screen widgets & ongoing countdown notifications activate automatically inside the installed Android APK."
	};
}
/**
* Resolves which of the 5 daily prayers is next based on 12-hour or 24-hour time strings.
*/
function resolveNextPrayerForWidget(prayerTimes, now = /* @__PURE__ */ new Date()) {
	const order = [
		"Fajr",
		"Dhuhr",
		"Asr",
		"Maghrib",
		"Isha"
	];
	const nowMinutes = now.getHours() * 60 + now.getMinutes();
	const parseToMinutes = (raw) => {
		if (!raw) return null;
		const match = raw.trim().match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?/i);
		if (!match) return null;
		let h = Number(match[1]);
		const m = Number(match[2]);
		const meridiem = match[3]?.toUpperCase();
		if (meridiem === "PM" && h < 12) h += 12;
		if (meridiem === "AM" && h === 12) h = 0;
		return h * 60 + m;
	};
	for (const name of order) {
		const mins = parseToMinutes(prayerTimes[name]);
		if (mins !== null && mins > nowMinutes) return {
			name,
			time: prayerTimes[name]
		};
	}
	return {
		name: "Fajr",
		time: prayerTimes.Fajr || "5:00 AM"
	};
}
/**
* Persists the latest prayer timings locally and pushes them to the native Android
* AppWidgetProvider & optional ongoing countdown notification when running inside the APK.
*/
async function syncNativePrayerWidget(params) {
	const next = resolveNextPrayerForWidget(params.prayerTimes);
	const countdownEnabled = typeof params.persistentCountdownEnabled === "boolean" ? params.persistentCountdownEnabled : isPersistentPrayerCountdownEnabled();
	const payload = {
		city: params.city || "Jamshedpur",
		hijriDate: params.hijriDate || "1448 AH",
		nextPrayerName: next.name,
		nextPrayerTime: next.time,
		fajr: params.prayerTimes.Fajr,
		dhuhr: params.prayerTimes.Dhuhr,
		asr: params.prayerTimes.Asr,
		maghrib: params.prayerTimes.Maghrib,
		isha: params.prayerTimes.Isha,
		persistentCountdownEnabled: countdownEnabled,
		updatedAtIso: (/* @__PURE__ */ new Date()).toISOString()
	};
	if (typeof localStorage !== "undefined") try {
		localStorage.setItem(LAST_WIDGET_PAYLOAD_KEY, JSON.stringify(payload));
	} catch {}
	const runtime = getCapacitorRuntimeStatus();
	if (runtime.isNativeApp && runtime.platform === "android") try {
		const res = await IlmizoPrayerWidgetNative.syncPrayerSchedule(payload);
		return {
			syncedNative: Boolean(res?.synced),
			widgetsUpdated: Number(res?.widgetsUpdated || 0),
			countdownActive: Boolean(res?.countdownActive),
			payload
		};
	} catch {
		return {
			syncedNative: false,
			widgetsUpdated: 0,
			countdownActive: false,
			payload
		};
	}
	return {
		syncedNative: false,
		widgetsUpdated: 0,
		countdownActive: false,
		payload
	};
}
async function setPersistentPrayerCountdownEnabled(enabled) {
	if (typeof localStorage !== "undefined") try {
		localStorage.setItem(PERSISTENT_COUNTDOWN_KEY, enabled ? "true" : "false");
	} catch {}
	const runtime = getCapacitorRuntimeStatus();
	if (runtime.isNativeApp && runtime.platform === "android") try {
		const res = await IlmizoPrayerWidgetNative.setPersistentCountdown({ enabled });
		return {
			enabled: Boolean(res?.enabled ?? enabled),
			syncedNative: true,
			countdownActive: Boolean(res?.countdownActive)
		};
	} catch {
		return {
			enabled,
			syncedNative: false,
			countdownActive: false
		};
	}
	return {
		enabled,
		syncedNative: false,
		countdownActive: false
	};
}
/**
* Triggers Android 8+ native AppWidgetManager.requestPinAppWidget() so users can add
* the Compact (2x1) or Full 5-Prayer (4x2) Salah Widget to their home screen in 1 tap.
*/
async function requestPinNativePrayerWidget(size = "medium") {
	const runtime = getCapacitorRuntimeStatus();
	if (runtime.isNativeApp && runtime.platform === "android") try {
		const res = await IlmizoPrayerWidgetNative.requestPinPrayerWidget({ size });
		if (res?.requested) return {
			requested: true,
			supported: true,
			message: size === "medium" ? "Pin request sent! Tap \"Add\" on your Android Home Screen for the 5-Prayer Widget." : "Pin request sent! Tap \"Add\" on your Android Home Screen for the Compact Prayer Widget."
		};
		return {
			requested: false,
			supported: Boolean(res?.supported),
			message: res?.reason || "Long-press your Android Home Screen -> Widgets -> Ilmizo to add the Prayer Widget."
		};
	} catch {
		return {
			requested: false,
			supported: false,
			message: "Long-press your Android Home Screen -> Widgets -> Ilmizo to place the Salah Widget."
		};
	}
	return {
		requested: false,
		supported: false,
		message: "Install the Ilmizo Android APK to pin the live Salah Widget directly to your phone Home Screen."
	};
}
// src/hooks/useQuranAudioSync.ts
/**
* Unified Quran audio synchronization hook shared by Adult (Card, Mushaf & Study views)
* and Kids Quran learning screens. Monitors centralized audioManager events to keep:
* - active verse index auto-advancing cleanly,
* - subtle @capacitor/haptics feedback on verse transitions,
* - smooth auto-scrolling onto the reciting Ayah, and
* - consistent playback progress tracking & verse highlight state.
*/
function useQuranAudioSync({ surahNumber, ayahs, activeAyahIdx, onAyahIndexChange, onVerseAdvance, enabled = true, enableHaptics = true, autoScroll = true }) {
	const audioState = useAudioManager();
	const prefersReducedMotion = useReducedMotion();
	const ayahElementMapRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const lastTrackedTransitionRef = (0, import_react.useRef)(null);
	const lastScrolledKeyRef = (0, import_react.useRef)(null);
	const onAyahIndexChangeRef = (0, import_react.useRef)(onAyahIndexChange);
	const onVerseAdvanceRef = (0, import_react.useRef)(onVerseAdvance);
	onAyahIndexChangeRef.current = onAyahIndexChange;
	onVerseAdvanceRef.current = onVerseAdvance;
	const seq = audioState.quranSequence;
	const isSameSurah = seq.surahNumber === surahNumber;
	const isPlayingThisSurah = isSameSurah && (audioState.status === "playing" || audioState.status === "loading");
	const isPausedThisSurah = isSameSurah && audioState.status === "paused";
	const isActiveThisSurah = isPlayingThisSurah || isPausedThisSurah;
	const playingAyahNumber = isActiveThisSurah && typeof seq.currentAyah === "number" ? seq.currentAyah : null;
	const registerAyahElement = (0, import_react.useCallback)((ayahNumberInSurah) => {
		return (el) => {
			if (el) ayahElementMapRef.current.set(ayahNumberInSurah, el);
			else ayahElementMapRef.current.delete(ayahNumberInSurah);
		};
	}, []);
	const scrollToAyah = (0, import_react.useCallback)((ayahNumberInSurah) => {
		if (typeof window === "undefined") return;
		const runScroll = () => {
			const target = ayahElementMapRef.current.get(ayahNumberInSurah);
			if (!target || typeof target.scrollIntoView !== "function") return;
			try {
				target.scrollIntoView({
					behavior: prefersReducedMotion ? "auto" : "smooth",
					block: "center",
					inline: "nearest"
				});
			} catch {
				target.scrollIntoView();
			}
		};
		if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(runScroll);
		else runScroll();
	}, [prefersReducedMotion]);
	(0, import_react.useEffect)(() => {
		if (!isActiveThisSurah) {
			lastTrackedTransitionRef.current = null;
			lastScrolledKeyRef.current = null;
		}
	}, [isActiveThisSurah, surahNumber]);
	(0, import_react.useEffect)(() => {
		if (!enabled || !isActiveThisSurah || playingAyahNumber === null) return;
		const targetIdx = ayahs.findIndex((a) => a.numberInSurah === playingAyahNumber);
		if (targetIdx >= 0 && targetIdx !== activeAyahIdx) onAyahIndexChangeRef.current(targetIdx);
		const transitionKey = `${surahNumber}:${playingAyahNumber}:r${seq.currentRepetition}`;
		const prevKey = lastTrackedTransitionRef.current;
		if (prevKey !== transitionKey) {
			lastTrackedTransitionRef.current = transitionKey;
			if (prevKey !== null && enableHaptics && audioState.status === "playing") triggerVerseTransitionHaptic();
			if (prevKey !== null) onVerseAdvanceRef.current?.(playingAyahNumber);
		}
		if (autoScroll && lastScrolledKeyRef.current !== transitionKey) {
			lastScrolledKeyRef.current = transitionKey;
			scrollToAyah(playingAyahNumber);
		}
	}, [
		enabled,
		isActiveThisSurah,
		playingAyahNumber,
		surahNumber,
		ayahs,
		activeAyahIdx,
		seq.currentRepetition,
		audioState.status,
		enableHaptics,
		autoScroll,
		scrollToAyah
	]);
	return {
		audioState,
		isPlayingThisSurah,
		isPausedThisSurah,
		isActiveThisSurah,
		playingAyahNumber,
		progressPercent: (0, import_react.useMemo)(() => {
			if (isActiveThisSurah && playingAyahNumber !== null) {
				const start = seq.startAyah ?? 1;
				const end = seq.endAyah ?? Math.max(1, ayahs.length);
				const span = Math.max(1, end - start + 1);
				const position = Math.max(1, playingAyahNumber - start + 1);
				return Math.min(100, Math.round(position / span * 100));
			}
			if (ayahs.length === 0) return 0;
			return Math.min(100, Math.round((activeAyahIdx + 1) / ayahs.length * 100));
		}, [
			isActiveThisSurah,
			playingAyahNumber,
			seq.startAyah,
			seq.endAyah,
			ayahs.length,
			activeAyahIdx
		]),
		isAyahHighlighted: (0, import_react.useCallback)((ayahNumberInSurah) => isPlayingThisSurah && playingAyahNumber === ayahNumberInSurah, [isPlayingThisSurah, playingAyahNumber]),
		registerAyahElement,
		scrollToAyah
	};
}
// src/hooks/useSwipeNavigation.ts
var ADULT_ROUTE_ORDER = [
	"home",
	"quran_list",
	"quran_read",
	"hifz",
	"salah",
	"duas",
	"names99",
	"seerah",
	"lessons",
	"quizzes",
	"progress",
	"qibla",
	"tasbih",
	"calendar",
	"more",
	"profile",
	"tasks_expenses"
];
var KIDS_ROUTE_ORDER = [
	"kids_home",
	"todays_quest",
	"quran_learning",
	"recitation_practice",
	"duas_learning",
	"salah_learning",
	"stories",
	"adventure_map",
	"daily_quiz",
	"good_deed",
	"family_challenge",
	"mission_complete",
	"kids_progress",
	"needs_practice",
	"badges",
	"certificate"
];
function isInsideInteractiveOrScrollableElement(target) {
	if (!(target instanceof HTMLElement)) return false;
	return Boolean(target.closest("input, textarea, select, [data-no-swipe=\"true\"], .overflow-x-auto"));
}
function useSwipeNavigation({ routes, activeRoute, onSelectRoute, isRTL = false, minSwipeDistance = 52, maxSwipeTimeMs = 700, enabled = true }) {
	const touchStartRef = (0, import_react.useRef)(null);
	const [feedback, setFeedback] = (0, import_react.useState)({
		direction: null,
		offsetX: 0,
		swiping: false
	});
	const currentIndex = Math.max(0, routes.indexOf(activeRoute));
	const goToNext = (0, import_react.useCallback)(() => {
		if (!enabled || routes.length === 0) return;
		const nextIdx = (currentIndex + 1) % routes.length;
		setFeedback({
			direction: "next",
			offsetX: 0,
			swiping: false
		});
		onSelectRoute(routes[nextIdx]);
	}, [
		currentIndex,
		enabled,
		onSelectRoute,
		routes
	]);
	const goToPrev = (0, import_react.useCallback)(() => {
		if (!enabled || routes.length === 0) return;
		const prevIdx = (currentIndex - 1 + routes.length) % routes.length;
		setFeedback({
			direction: "prev",
			offsetX: 0,
			swiping: false
		});
		onSelectRoute(routes[prevIdx]);
	}, [
		currentIndex,
		enabled,
		onSelectRoute,
		routes
	]);
	const onTouchStart = (0, import_react.useCallback)((e) => {
		if (!enabled || e.touches.length !== 1) return;
		const touch = e.touches[0];
		touchStartRef.current = {
			x: touch.clientX,
			y: touch.clientY,
			time: Date.now(),
			ignore: isInsideInteractiveOrScrollableElement(e.target)
		};
	}, [enabled]);
	const onTouchMove = (0, import_react.useCallback)((e) => {
		const start = touchStartRef.current;
		if (!enabled || !start || start.ignore || e.touches.length !== 1) return;
		const touch = e.touches[0];
		const deltaX = touch.clientX - start.x;
		const deltaY = touch.clientY - start.y;
		if (Math.abs(deltaX) > 18 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) {
			const dampedOffset = Math.max(-48, Math.min(48, deltaX * .25));
			setFeedback((prev) => ({
				...prev,
				offsetX: dampedOffset,
				swiping: true
			}));
		}
	}, [enabled]);
	const onTouchEnd = (0, import_react.useCallback)((e) => {
		const start = touchStartRef.current;
		touchStartRef.current = null;
		if (!enabled || !start || start.ignore || e.changedTouches.length === 0) {
			setFeedback((prev) => prev.swiping ? {
				...prev,
				offsetX: 0,
				swiping: false
			} : prev);
			return;
		}
		const touch = e.changedTouches[0];
		const deltaX = touch.clientX - start.x;
		const deltaY = touch.clientY - start.y;
		if (!(Date.now() - start.time <= maxSwipeTimeMs && Math.abs(deltaX) >= minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY) * 1.35)) {
			setFeedback({
				direction: null,
				offsetX: 0,
				swiping: false
			});
			return;
		}
		const swipedLeft = deltaX < 0;
		if (isRTL) {
			if (swipedLeft) goToPrev();
			else goToNext();
		} else if (swipedLeft) goToNext();
		else goToPrev();
	}, [
		enabled,
		goToNext,
		goToPrev,
		isRTL,
		maxSwipeTimeMs,
		minSwipeDistance
	]);
	const onTouchCancel = (0, import_react.useCallback)(() => {
		touchStartRef.current = null;
		setFeedback({
			direction: null,
			offsetX: 0,
			swiping: false
		});
	}, []);
	return {
		currentIndex,
		totalRoutes: routes.length,
		goToNext,
		goToPrev,
		feedback,
		swipeHandlers: {
			onTouchStart,
			onTouchMove,
			onTouchEnd,
			onTouchCancel
		}
	};
}
// src/services/quranScriptEngine.ts
var SCRIPT_STORAGE_KEY = "ilmizo_quran_script_style_v1";
var SCRIPT_CHANGE_EVENT = "ilmizo-quran-script-change";
function loadQuranScriptStyle() {
	if (typeof localStorage === "undefined") return "uthmani";
	try {
		return localStorage.getItem(SCRIPT_STORAGE_KEY) === "indopak" ? "indopak" : "uthmani";
	} catch {
		return "uthmani";
	}
}
function saveQuranScriptStyle(style) {
	const safeStyle = style === "indopak" ? "indopak" : "uthmani";
	if (typeof localStorage !== "undefined") try {
		localStorage.setItem(SCRIPT_STORAGE_KEY, safeStyle);
	} catch {}
	if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") window.dispatchEvent(new CustomEvent(SCRIPT_CHANGE_EVENT, { detail: safeStyle }));
}
/**
* Shared React hook keeping Madani (Uthmani) vs South Asian IndoPak (15-Line) script
* preference synchronized instantly across Adult Card, Mushaf, Study, and Kids Quran screens.
*/
function useQuranScriptStyle() {
	const [scriptStyle, setScriptStyleState] = (0, import_react.useState)(() => loadQuranScriptStyle());
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const onChange = (ev) => {
			const detail = ev.detail;
			if (detail === "indopak" || detail === "uthmani") setScriptStyleState(detail);
			else setScriptStyleState(loadQuranScriptStyle());
		};
		window.addEventListener(SCRIPT_CHANGE_EVENT, onChange);
		return () => window.removeEventListener(SCRIPT_CHANGE_EVENT, onChange);
	}, []);
	return [scriptStyle, (0, import_react.useCallback)((next) => {
		saveQuranScriptStyle(next);
		setScriptStyleState(next);
	}, [])];
}
function getArabicScriptFontClass(style) {
	return style === "indopak" ? "font-arabic-indopak" : "font-arabic-uthmani";
}
/**
* Renders verified Quran text tailored for either Madani (Uthmani) or South Asian IndoPak readability.
* Preserves every Arabic word and Tajweed vowel faithfully while adapting Uthmani-only symbols
* (such as Alef Wasla ٱ and Uthmani small high rounded zero ۟) into crisp South Asian Mushaf forms.
*/
function formatAyahTextForScript(arabicUthmani, style) {
	if (!arabicUthmani) return "";
	if (style === "uthmani") return arabicUthmani;
	return arabicUthmani.replace(/\u0671/g, "ا").replace(/\u06DF/g, "ْ").replace(/\u06E0/g, "ْ").replace(/\u06E1/g, "ْ").replace(/\u06CC/g, "ي").replace(/\u0640+/g, "");
}
/**
* Estimates syllable/tajweed-weighted timing boundaries [startRatio, endRatio) for each Arabic word
* in an Ayah so Word-by-Word Live Highlighting smoothly tracks Qari recitation even without
* external server-side millisecond word-timestamp files.
*
* Weights reflect real recitation acoustics:
* - Madd (elongation ٓ / ٰ / long vowels ا و ي) adds duration
* - Shaddah (ّ) adds doubled-consonant hold duration
* - Base Arabic letters contribute proportional articulation duration
*/
function computeWordTimingRanges(words) {
	if (!words || words.length === 0) return [];
	const weights = words.map((rawWord) => {
		const word = rawWord || "";
		let w = 1.2;
		for (let i = 0; i < word.length; i++) {
			const code = word.charCodeAt(i);
			if (code === 1619 || code === 1648) w += 2.2;
			else if (code === 1617) w += 1.35;
			else if (code === 1575 || code === 1608 || code === 1610 || code === 1609 || code === 1649) w += .95;
			else if (code >= 1569 && code <= 1610) w += .8;
			else if (code >= 1611 && code <= 1616) w += .25;
		}
		return Math.max(1.5, w);
	});
	const totalWeight = weights.reduce((acc, v) => acc + v, 0) || 1;
	let cursor = 0;
	return words.map((word, index) => {
		const startRatio = cursor / totalWeight;
		cursor += weights[index];
		return {
			index,
			word,
			startRatio,
			endRatio: index === words.length - 1 ? 1 : cursor / totalWeight
		};
	});
}
/**
* Resolves the 0-based active Arabic word index for a given playback progress ratio (0..1).
* Returns -1 when playback is inactive or progress is out of bounds.
*/
function getActiveWordIndexAtProgress(words, progressRatio) {
	if (!words || words.length === 0) return -1;
	if (!Number.isFinite(progressRatio) || progressRatio < 0) return -1;
	const clamped = Math.max(0, Math.min(.9999, progressRatio));
	const ranges = computeWordTimingRanges(words);
	for (let i = 0; i < ranges.length; i++) if (clamped >= ranges[i].startRatio && clamped < ranges[i].endRatio) return i;
	return ranges.length - 1;
}
// src/engines/quranJournalAndWordEngine.ts
var TADABBUR_DISCLAIMER = {
	en: "Personal Tadabbur reflection is for self-accountability and spiritual contemplation; it is not scholarly Tafsir.",
	hi: "व्यक्तिगत तदब्बुर (चिंतन) आत्म-सुधार के लिए है; यह आलिमों की आधिकारिक तफ़्सीर नहीं है।",
	ur: "ذاتی تدبر اور غور و فکر اپنی اصلاح کے لیے ہے؛ یہ مستند علمی تفسیر کا متبادل نہیں ہے۔",
	hinglish: "Personal Tadabbur reflection apni islah ke liye hai; yeh scholarly Tafsir nahi hai.",
	ar: "التدبر الشخصي هو للتأمل ومحاسبة النفس، وليس تفسيراً علمياً معتمداً للآية."
};
var TADABBUR_REFLECTION_PROMPTS = [
	{
		id: "tadabbur_learn",
		prompt: "What did I learn from this Ayah?",
		localizedPrompts: {
			en: "What did I learn from this Ayah?",
			hi: "इस आयत से मैंने क्या सीखा?",
			ur: "اس آیت سے میں نے کیا سیکھا؟",
			hinglish: "Is Ayah se maine kya seekha?",
			ar: "ماذا تعلمت من هذه الآية؟"
		}
	},
	{
		id: "tadabbur_improve",
		prompt: "What should I improve in my character or worship?",
		localizedPrompts: {
			en: "What should I improve in my character or worship?",
			hi: "मुझे अपने अख़लाक़ या इबादत में क्या सुधारना चाहिए?",
			ur: "مجھے اپنے اخلاق یا عبادت میں کیا بہتری لانی چاہیے؟",
			hinglish: "Mujhe apne akhlaq ya ibadat mein kya behtar karna chahiye?",
			ar: "ما الذي ينبغي أن أحسّنه في خُلقي أو عبادتي؟"
		}
	},
	{
		id: "tadabbur_apply",
		prompt: "How can I apply this Ayah today?",
		localizedPrompts: {
			en: "How can I apply this Ayah today?",
			hi: "मैं आज इस आयत पर कैसे अमल कर सकता/सकती हूँ?",
			ur: "میں آج اس آیت پر کیسے عمل کر سکتا/سکتی ہوں؟",
			hinglish: "Main aaj is Ayah par kaise amal kar sakta hoon?",
			ar: "كيف يمكنني تطبيق هذه الآية في يومي؟"
		}
	},
	{
		id: "tadabbur_explore",
		prompt: "What question do I want to explore in verified Tafsir?",
		localizedPrompts: {
			en: "What question do I want to explore in verified Tafsir?",
			hi: "मैं प्रामाणिक तफ़्सीर में कौन-सा सवाल और गहराई से समझना चाहता/चाहती हूँ?",
			ur: "میں مستند تفسیر میں کون سا نکتہ مزید تلاش کرنا چاہتا/چاہتی ہوں؟",
			hinglish: "Main verified Tafsir mein kaun sa sawal aur samajhna chahta hoon?",
			ar: "ما السؤال الذي أودّ البحث عنه في كتب التفسير المعتمدة؟"
		}
	}
];
function buildUnifiedQuranJournalEntries(params) {
	const entries = [];
	for (const bm of params.bookmarks || []) entries.push({
		id: `bm_${bm.id}`,
		kind: "bookmark",
		surahNumber: bm.surahNumber,
		surahName: bm.surahName,
		ayahNumber: bm.ayahNumber,
		referenceLabel: `${bm.surahName} (${bm.surahNumber}:${bm.ayahNumber})`,
		title: bm.customLabel || `Bookmark · ${bm.surahName} ${bm.surahNumber}:${bm.ayahNumber}`,
		body: bm.note || "",
		arabicSnippet: bm.arabicSnippet,
		tags: bm.folder ? [bm.folder] : [],
		folder: bm.folder || "General Bookmarks",
		readingList: bm.readingList,
		createdAt: bm.createdAt,
		updatedAt: bm.updatedAt || bm.createdAt
	});
	for (const note of params.personalNotes || []) {
		const sNum = note.surahNumber || 1;
		const aNum = note.ayahNumber || 1;
		const isTadabbur = Boolean(note.tadabburPrompt) || note.noteType === "tadabbur";
		const kind = note.noteType === "hifz_note" ? "hifz_note" : isTadabbur ? "tadabbur" : "note";
		entries.push({
			id: note.id,
			kind,
			surahNumber: sNum,
			surahName: note.surahReference || `Surah ${sNum}`,
			ayahNumber: aNum,
			referenceLabel: note.surahReference || `${sNum}:${aNum}`,
			title: note.title,
			body: note.body,
			tags: Array.isArray(note.tags) ? note.tags : [],
			tadabburPrompt: note.tadabburPrompt,
			createdAt: note.createdAt,
			updatedAt: note.updatedAt || note.createdAt
		});
	}
	for (const rev of params.revisionItems || []) if (rev.personalNotes && rev.personalNotes.trim()) entries.push({
		id: `hifz_${rev.id}`,
		kind: "hifz_note",
		surahNumber: rev.surahNumber,
		surahName: rev.surahName,
		ayahNumber: rev.startAyah || 1,
		referenceLabel: `${rev.surahName} (${rev.ayahRange})`,
		title: `Hifz Revision Note · ${rev.surahName} ${rev.ayahRange}`,
		body: rev.personalNotes.trim(),
		tags: ["Hifz", rev.difficulty],
		createdAt: rev.lastPracticedAt || rev.dueDate,
		updatedAt: rev.lastPracticedAt || rev.dueDate
	});
	return entries;
}
function queryQuranJournalEntries(entries, options = {}) {
	const { kindFilter = "all", surahFilter = null, tagFilter = null, folderFilter = null, searchQuery = "", dateFrom, dateTo, sortOrder = "newest" } = options;
	const q = searchQuery.trim().toLowerCase();
	return entries.filter((entry) => {
		if (kindFilter !== "all" && entry.kind !== kindFilter) return false;
		if (surahFilter !== null && surahFilter > 0 && entry.surahNumber !== surahFilter) return false;
		if (tagFilter && tagFilter.trim()) {
			const targetTag = tagFilter.trim().toLowerCase();
			if (!entry.tags.some((t) => t.toLowerCase() === targetTag)) return false;
		}
		if (folderFilter && folderFilter.trim()) {
			if ((entry.folder || "").toLowerCase() !== folderFilter.trim().toLowerCase()) return false;
		}
		if (dateFrom && entry.createdAt < dateFrom) return false;
		if (dateTo && entry.createdAt > dateTo) return false;
		if (q) {
			if (![
				entry.title,
				entry.body,
				entry.referenceLabel,
				entry.arabicSnippet || "",
				entry.tadabburPrompt || "",
				entry.folder || "",
				entry.readingList || "",
				`${entry.surahNumber}:${entry.ayahNumber}`,
				...entry.tags
			].join(" ").toLowerCase().includes(q)) return false;
		}
		return true;
	}).sort((a, b) => {
		if (sortOrder === "surah_asc") return a.surahNumber !== b.surahNumber ? a.surahNumber - b.surahNumber : a.ayahNumber - b.ayahNumber;
		if (sortOrder === "surah_desc") return a.surahNumber !== b.surahNumber ? b.surahNumber - a.surahNumber : b.ayahNumber - a.ayahNumber;
		if (sortOrder === "oldest") return a.createdAt.localeCompare(b.createdAt);
		return b.createdAt.localeCompare(a.createdAt);
	});
}
/**
* Splits an Uthmani Arabic Ayah into individual words while keeping standalone Quranic
* pause marks (Waqf symbols like ۖ ۗ ۘ ۙ ۚ ۛ ۜ ۝) attached to the preceding word so
* word-by-word reveal never lands on a bare punctuation mark.
*/
function tokenizeArabicAyahWords(arabicText) {
	const rawTokens = (arabicText || "").trim().split(/\s+/).filter(Boolean);
	const mergedWords = [];
	const waqfOnlyRegex = /^[\u06D6-\u06ED\u06DD\u06DE\u06E9\uFD3E\uFD3F٠-٩0-9]+$/;
	for (const token of rawTokens) if (waqfOnlyRegex.test(token) && mergedWords.length > 0) mergedWords[mergedWords.length - 1] = `${mergedWords[mergedWords.length - 1]} ${token}`;
	else mergedWords.push(token);
	return mergedWords;
}
function createWordByWordSession(surahNumber, ayahNumber, arabicText, initialRevealedCount = 0) {
	const words = tokenizeArabicAyahWords(arabicText);
	const clamped = Math.max(0, Math.min(words.length, initialRevealedCount));
	return {
		surahNumber,
		ayahNumber,
		originalArabicText: arabicText,
		words,
		totalWords: words.length,
		revealedCount: clamped,
		isFullyRevealed: clamped >= words.length && words.length > 0
	};
}
function revealNextWord(state) {
	const nextCount = Math.min(state.totalWords, state.revealedCount + 1);
	return {
		...state,
		revealedCount: nextCount,
		isFullyRevealed: nextCount >= state.totalWords && state.totalWords > 0
	};
}
function revealPreviousWord(state) {
	const prevCount = Math.max(0, state.revealedCount - 1);
	return {
		...state,
		revealedCount: prevCount,
		isFullyRevealed: prevCount >= state.totalWords && state.totalWords > 0
	};
}
function revealCompleteAyah(state) {
	return {
		...state,
		revealedCount: state.totalWords,
		isFullyRevealed: true
	};
}
function resetWordByWordSession(state) {
	return {
		...state,
		revealedCount: 0,
		isFullyRevealed: false
	};
}
// src/engines/tajweedAndWordMeaningEngine.ts
var TAJWEED_RULES_META = {
	ghunnah: {
		id: "ghunnah",
		label: "Ghunnah (Nasalization - 2 Beats)",
		shortLabel: "Ghunnah",
		colorHex: "#16A34A",
		darkColorHex: "#4ADE80",
		bgClass: "bg-emerald-100 border-emerald-400 text-emerald-950",
		textClass: "text-[#15803D]",
		darkTextClass: "text-[#4ADE80]",
		description: {
			en: "Nasal sound held for 2 counts on Noon Mushaddadah (نّ) or Meem Mushaddadah (مّ).",
			hi: "नून मुशद्दद (نّ) या मीम मुशद्दद (مّ) पर नाक में 2 हरकत तक आवाज़ ठहराना (ग़ुन्ना)।",
			ur: "نون مشدد (نّ) یا میم مشدد (مّ) پر ناک میں دو حرکت تک آواز ٹھہرانا (غنہ)۔",
			hinglish: "Noon Mushaddadah (نّ) ya Meem Mushaddadah (مّ) par naak se 2 counts tak aawaz rokna (Ghunnah).",
			ar: "غُنَّة بمقدار حركتين عند النون والميم المشددتين."
		}
	},
	qalqalah: {
		id: "qalqalah",
		label: "Qalqalah (Echoing Bounce)",
		shortLabel: "Qalqalah",
		colorHex: "#2563EB",
		darkColorHex: "#60A5FA",
		bgClass: "bg-blue-100 border-blue-400 text-blue-950",
		textClass: "text-[#1D4ED8]",
		darkTextClass: "text-[#60A5FA]",
		description: {
			en: "Slight echoing bounce when pronouncing Qaf, Ta, Ba, Jeem, or Dal (قطب جد) with Sukoon.",
			hi: "क़ाफ़, ता, बा, जीम या दाल (قطب جد) पर सुकून होने पर हल्की गूंज (क़लक़ला) के साथ पढ़ना।",
			ur: "ق، ط، ب، ج، د (قطب جد) ساکن ہونے پر ہلکی گونج (قلقلہ) کے ساتھ ادا کرنا۔",
			hinglish: "Qaf, Ta, Ba, Jeem ya Dal (قطب جد) par sukoon ho toh halka bounce/echo (Qalqalah) karna.",
			ar: "قلقلة الحرف الساكن من حروف (قطب جد)اضطراباً خفيفاً في المخرج."
		}
	},
	madd: {
		id: "madd",
		label: "Madd (Vowel Elongation - 2 to 6 Beats)",
		shortLabel: "Madd",
		colorHex: "#DC2626",
		darkColorHex: "#F87171",
		bgClass: "bg-rose-100 border-rose-400 text-rose-950",
		textClass: "text-[#B91C1C]",
		darkTextClass: "text-[#FCA5A5]",
		description: {
			en: "Stretch and elongate the long vowel sound smoothly for 2 to 4/6 beats.",
			hi: "मद्द के निशान या अलिफ़/वाव/या मद्दाह पर आवाज़ को 2 से 4/6 हरकत तक खींच कर पढ़ना।",
			ur: "مد کی علامت یا حروفِ مدہ پر آواز کو 2 سے 6 حرکت تک کھینچ کر پڑھنا۔",
			hinglish: "Madd sign ya long vowel par aawaz ko 2 se 4/6 counts tak lamba kheench kar padhna.",
			ar: "إطالة الصوت بحرف المد من حركتين إلى ست حركات حسب نوع المد."
		}
	},
	idgham_ikhfa: {
		id: "idgham_ikhfa",
		label: "Noon Sakinah / Tanween Rule (Idgham / Ikhfa)",
		shortLabel: "Tanween / Noon",
		colorHex: "#D97706",
		darkColorHex: "#FBBF24",
		bgClass: "bg-amber-100 border-amber-400 text-amber-950",
		textClass: "text-[#B45309]",
		darkTextClass: "text-[#FCD34D]",
		description: {
			en: "Apply Noon Sakinah or Tanween blending (Idgham) or soft nasal hiding (Ikhfa) into the following letter.",
			hi: "नून साकिन या तनवीन (ً ٍ ٌ) को अगले हर्फ़ के साथ मिलाकर (इदग़ाम) या छुपाकर (इख़्फ़ा) पढ़ना।",
			ur: "نون ساکن یا تنوین کو اگلے حرف کے ساتھ ملا کر (ادغام) یا چھپا کر (اخفاء) پڑھنا۔",
			hinglish: "Noon Sakinah ya Tanween ko agle harf ke saath blend (Idgham) ya soft nasal (Ikhfa) ke saath padhna.",
			ar: "أحكام النون الساكنة والتنوين من إدغام أو إخفاء أو إقلاب."
		}
	},
	tafkheem_allah: {
		id: "tafkheem_allah",
		label: "Tafkheem / Lafzatullah (Full-Mouth Heavy Sound)",
		shortLabel: "Tafkheem",
		colorHex: "#7C3AED",
		darkColorHex: "#C084FC",
		bgClass: "bg-purple-100 border-purple-400 text-purple-950",
		textClass: "text-[#6D28D9]",
		darkTextClass: "text-[#C4B5FD]",
		description: {
			en: "Pronounce with a resonant, full-mouth heavy tone (Tafkheem) on the Divine Name or elevated letters (خص ضغط قظ).",
			hi: "अल्लाह के नाम या मोटे हुरूफ़ (خص ضغط قظ) को मुंह भर कर भारी आवाज़ (तफ़ख़ीम) से अदा करना।",
			ur: "لفظِ اللّٰہ یا حروفِ مستعلیہ (خص ضغط قظ) کو پر (موٹا) کر کے پڑھنا۔",
			hinglish: "Lafz-e-Allah ya heavy letters (خص ضغط قظ) ko full-mouth heavy tone (Tafkheem) se padhna.",
			ar: "تفخيم لفظ الجلالة أو حروف الاستعلاء (خص ضغط قظ)."
		}
	},
	normal: {
		id: "normal",
		label: "Standard Uthmani Articulation (Tarqeeq)",
		shortLabel: "Clear Reading",
		colorHex: "#0F172A",
		darkColorHex: "#F8FAFC",
		bgClass: "bg-slate-100 border-slate-300 text-slate-900",
		textClass: "text-slate-900",
		darkTextClass: "text-white",
		description: {
			en: "Clear, natural Arabic articulation (Tarqeeq) giving each letter its proper Makhraj and Harakah.",
			hi: "हर हर्फ़ को उसके सही मख़रज और हरकत के साथ साफ़ और स्पष्ट पढ़ना।",
			ur: "ہر حرف کو اس کے درست مخرج اور حرکت کے ساتھ صاف ادا کرنا۔",
			hinglish: "Har Arabic letter ko uske sahi makhraj aur harakah ke saath saaf padhna.",
			ar: "النطق الفصيح الواضح بالحرف مع إعطاء كل حرف حقه ومستحقه."
		}
	}
};
/**
* Strips Arabic diacritics and Uthmani signs for dictionary lookup while keeping root letters.
*/
function normalizeArabicWordForLookup(word) {
	return word.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, "").replace(/[ٱأإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").trim();
}
var COMBINING_ARABIC_RE = /^[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]$/u;
var QALQALAH_LETTERS = /* @__PURE__ */ new Set([
	"ق",
	"ط",
	"ب",
	"ج",
	"د"
]);
var TAFKHEEM_LETTERS = /* @__PURE__ */ new Set([
	"خ",
	"ص",
	"ض",
	"غ",
	"ط",
	"ق",
	"ظ"
]);
var THROAT_IZHAR_LETTERS = /* @__PURE__ */ new Set([
	"ء",
	"أ",
	"إ",
	"آ",
	"ؤ",
	"ئ",
	"ه",
	"ع",
	"ح",
	"غ",
	"خ"
]);
var IDGHAM_GHUNNAH_LETTERS = /* @__PURE__ */ new Set([
	"ي",
	"ن",
	"م",
	"و"
]);
var IDGHAM_BILA_GHUNNAH_LETTERS = /* @__PURE__ */ new Set(["ل", "ر"]);
var MADD_TRIGGER_SIGNS = /[\u0653\u0670آ]/u;
function splitWordIntoGraphemeClusters(word) {
	const clusters = [];
	for (const ch of Array.from(word)) if (COMBINING_ARABIC_RE.test(ch) && clusters.length > 0) clusters[clusters.length - 1] += ch;
	else clusters.push(ch);
	return clusters;
}
function getBaseLetter(cluster) {
	for (const ch of Array.from(cluster)) if (!COMBINING_ARABIC_RE.test(ch)) return ch;
	return "";
}
function classifyNoonOrTanweenFollowLetter(nextBase) {
	if (!nextBase) return { ruleId: "normal" };
	if (THROAT_IZHAR_LETTERS.has(nextBase)) return {
		ruleId: "normal",
		note: "Izhar (clear Noon/Tanween before throat letter)"
	};
	if (nextBase === "ب") return {
		ruleId: "idgham_ikhfa",
		note: "Iqlab (Noon/Tanween turns into hidden Meem before ب)"
	};
	if (IDGHAM_GHUNNAH_LETTERS.has(nextBase)) return {
		ruleId: "idgham_ikhfa",
		note: "Idgham ma‘al-Ghunnah (merge with 2-beat nasalization)"
	};
	if (IDGHAM_BILA_GHUNNAH_LETTERS.has(nextBase)) return {
		ruleId: "idgham_ikhfa",
		note: "Idgham bila Ghunnah (complete merge without nasalization)"
	};
	return {
		ruleId: "idgham_ikhfa",
		note: "Ikhfa (soft nasal hiding for 2 beats)"
	};
}
/**
* Segments an array of Arabic words in an Ayah into character-cluster Tajweed spans,
* evaluating both intra-word rules (Ghunnah, Qalqalah, Madd, Tafkheem, Lafzatullah)
* and cross-word Noon Sakinah / Tanween rules (Iqlab, Idgham, Ikhfa, Izhar).
*/
function segmentArabicWordsWithTajweed(words) {
	return words.map((rawWord, wordIdx) => {
		const w = rawWord.trim();
		if (!w) return [];
		const clusters = splitWordIntoGraphemeClusters(w);
		const normWord = normalizeArabicWordForLookup(w);
		const isLafzatullah = normWord === "الله" || normWord === "لله" || normWord === "بالله" || normWord === "والله" || normWord === "تالله" || normWord === "فالله" || normWord === "اللهم";
		const nextWord = words[wordIdx + 1]?.trim() || "";
		const nextWordClusters = nextWord ? splitWordIntoGraphemeClusters(nextWord) : [];
		const firstNextLetter = (() => {
			for (const c of nextWordClusters) {
				const b = getBaseLetter(c);
				if (b && b !== "ٱ") return b;
			}
			return "";
		})();
		const clusterRules = clusters.map((cluster, cIdx) => {
			const base = getBaseLetter(cluster);
			const hasShaddah = cluster.includes("ّ");
			const hasSukoon = cluster.includes("ْ") || cluster.includes("ۡ");
			const hasTanween = /[\u064B\u064C\u064D]/u.test(cluster);
			const hasFatha = cluster.includes("َ");
			const hasDamma = cluster.includes("ُ");
			const nextClusterInWord = clusters[cIdx + 1] || "";
			const nextBaseInWord = getBaseLetter(nextClusterInWord);
			if ((base === "ن" || base === "م") && hasShaddah) return {
				text: cluster,
				ruleId: "ghunnah",
				note: "Ghunnah (2-beat nasal sound)"
			};
			const isNoonSakinah = base === "ن" && (hasSukoon || !/[\u064E\u064F\u0650\u0651]/u.test(cluster) && cIdx > 0);
			if (hasTanween || isNoonSakinah) {
				let targetFollow = nextBaseInWord;
				if (!targetFollow || hasTanween && nextBaseInWord === "ا" && cIdx === clusters.length - 2) targetFollow = firstNextLetter;
				const classified = classifyNoonOrTanweenFollowLetter(targetFollow);
				if (classified.ruleId !== "normal") return {
					text: cluster,
					ruleId: classified.ruleId,
					note: classified.note
				};
			}
			if (MADD_TRIGGER_SIGNS.test(cluster)) return {
				text: cluster,
				ruleId: "madd",
				note: "Madd (4–6 beat elongation)"
			};
			if ((base === "ا" || base === "و" || base === "ي") && !hasSukoon && !hasFatha && !hasDamma && !cluster.includes("ِ")) {
				if ([
					"ء",
					"أ",
					"إ",
					"ئ",
					"ؤ"
				].includes(nextBaseInWord) || cIdx === clusters.length - 1 && [
					"ء",
					"أ",
					"إ"
				].includes(firstNextLetter)) return {
					text: cluster,
					ruleId: "madd",
					note: "Madd Muttasil / Munfasil (4–5 beats before Hamzah)"
				};
				if (nextClusterInWord.includes("ّ")) return {
					text: cluster,
					ruleId: "madd",
					note: "Madd Lazim (6 beats before Shaddah)"
				};
			}
			if (QALQALAH_LETTERS.has(base) && (hasSukoon || wordIdx === words.length - 1 && cIdx === clusters.length - 1)) return {
				text: cluster,
				ruleId: "qalqalah",
				note: "Qalqalah (echoing bounce)"
			};
			if (isLafzatullah && (base === "ل" || base === "ه")) return {
				text: cluster,
				ruleId: "tafkheem_allah",
				note: "Lafzatullah (Tafkheem)"
			};
			if (TAFKHEEM_LETTERS.has(base) || base === "ر" && (hasFatha || hasDamma)) return {
				text: cluster,
				ruleId: "tafkheem_allah",
				note: "Tafkheem (full-mouth heavy letter)"
			};
			return {
				text: cluster,
				ruleId: "normal"
			};
		});
		const merged = [];
		for (const seg of clusterRules) {
			const prev = merged[merged.length - 1];
			if (prev && prev.ruleId === seg.ruleId && prev.ruleNote === seg.note) prev.text += seg.text;
			else merged.push({
				text: seg.text,
				ruleId: seg.ruleId,
				...seg.note ? { ruleNote: seg.note } : {}
			});
		}
		return merged;
	});
}
/**
* Curated high-frequency word-by-word dictionary covering Al-Fatiha, Juz Amma, Ayat al-Kursi,
* and common Quranic particles/nouns/verbs, augmented by TOP_QURAN_VOCAB (315 words).
*/
var CURATED_WORD_DICTIONARY = {
	بسم: {
		transliteration: "Bismi",
		meanings: {
			en: "In the Name of",
			hi: "के नाम से (शुरू करता हूँ)",
			ur: "کے نام سے (شروع کرتا ہوں)",
			hinglish: "Ke naam se (shuru karta hoon)",
			ar: "بِاسْمِ (أبتدئ)"
		},
		grammarHint: "Preposition (بِ) + Noun (اسْم)"
	},
	الله: {
		transliteration: "Allahi",
		meanings: {
			en: "Allah (The One True Creator)",
			hi: "अल्लाह (एकमात्र सच्चा रब)",
			ur: "اللّٰہ (ایک سچا معبود)",
			hinglish: "Allah (Ek Sacha Ma’bood)",
			ar: "اللهُ جل جلاله"
		},
		grammarHint: "Proper Divine Name (Lafzatullah)"
	},
	الرحمن: {
		transliteration: "Ar-Rahmani",
		meanings: {
			en: "The Entirely Merciful",
			hi: "बेहद रहम करने वाला",
			ur: "بڑا مہربان",
			hinglish: "Bada Meherbaan (Sab par reham karne wala)",
			ar: "ذو الرحمة الواسعة لجميع الخلق"
		},
		grammarHint: "Divine Attribute (Intensive Form فَعْلان)"
	},
	الرحيم: {
		transliteration: "Ar-Raheem",
		meanings: {
			en: "The Especially Merciful",
			hi: "निहायत रहम वाला (लगातार कृपा करने वाला)",
			ur: "نہایت رحم والا",
			hinglish: "Nihayat Reham Wala",
			ar: "الدائم الرحمة بالمؤمنين"
		},
		grammarHint: "Divine Attribute (Permanent Form فَعِيل)"
	},
	الحمد: {
		transliteration: "Al-Hamdu",
		meanings: {
			en: "All Praise and Gratitude",
			hi: "तमाम तारीफ़ और शुक्र",
			ur: "تمام تعریف اور شکر",
			hinglish: "Tamaam tareef aur shukr",
			ar: "الثناء الكامل والشكر"
		},
		grammarHint: "Definite Noun (Subject / Mubtada)"
	},
	لله: {
		transliteration: "Lillahi",
		meanings: {
			en: "Belongs to Allah alone",
			hi: "अल्लाह ही के लिए है",
			ur: "اللّٰہ ہی کے لیے ہے",
			hinglish: "Sirf Allah hi ke liye hai",
			ar: "مستحق لله وحده"
		},
		grammarHint: "Preposition (لِ) + Divine Name"
	},
	رب: {
		transliteration: "Rabbi",
		meanings: {
			en: "Lord, Cherisher & Sustainer",
			hi: "पालनहार और मालिक (रब)",
			ur: "پالنے والا اور مالک (رب)",
			hinglish: "Paalne wala aur Maalik (Rabb)",
			ar: "المالك والمدبر والمربي"
		},
		grammarHint: "Noun (Mudhaf / Possessive)"
	},
	العلمين: {
		transliteration: "Al-'Aalameen",
		meanings: {
			en: "Of all the worlds / universe",
			hi: "सारे जहानों का",
			ur: "سارے جہانوں کا",
			hinglish: "Saare jahanon (worlds) ka",
			ar: "جميع المخلوقات والعوالم"
		},
		grammarHint: "Sound Masculine Plural Noun"
	},
	العالمين: {
		transliteration: "Al-'Aalameen",
		meanings: {
			en: "Of all the worlds / universe",
			hi: "सारे जहानों का",
			ur: "سارے جہانوں کا",
			hinglish: "Saare jahanon (worlds) ka",
			ar: "جميع المخلوقات والعوالم"
		},
		grammarHint: "Sound Masculine Plural Noun"
	},
	ملك: {
		transliteration: "Maliki",
		meanings: {
			en: "Sovereign Master / King",
			hi: "मालिक और बादशाह",
			ur: "مالک اور بادشاہ",
			hinglish: "Maalik aur Badshah",
			ar: "المتصرف المطلق وصاحب الملك"
		},
		grammarHint: "Active Participle / Noun"
	},
	يوم: {
		transliteration: "Yawmi",
		meanings: {
			en: "Of the Day",
			hi: "उस दिन का",
			ur: "اس دن کا",
			hinglish: "Us din (Day) ka",
			ar: "وقت وزمان"
		},
		grammarHint: "Noun of Time"
	},
	الدين: {
		transliteration: "Ad-Deen",
		meanings: {
			en: "Of Judgment & Recompense (or Faith)",
			hi: "बदले और इंसाफ़ (या दीन)",
			ur: "بدلے اور جزا (یا دین)",
			hinglish: "Hisab aur Badle (Judgement) ke",
			ar: "الجزاء والحساب"
		},
		grammarHint: "Definite Noun"
	},
	اياك: {
		transliteration: "Iyyaka",
		meanings: {
			en: "You Alone",
			hi: "तुझ ही को (सिर्फ़ तेरी)",
			ur: "تجھ ہی کو (صرف تیری)",
			hinglish: "Sirf Tujh hi ko (You alone)",
			ar: "نخصك وحدك"
		},
		grammarHint: "Detached Object Pronoun (for exclusivity)"
	},
	نعبد: {
		transliteration: "Na'budu",
		meanings: {
			en: "We worship",
			hi: "हम इबादत करते हैं",
			ur: "ہم عبادت کرتے ہیں",
			hinglish: "Hum ibadat karte hain",
			ar: "نطيع ونخضع بغاية المحبة"
		},
		grammarHint: "Present Tense Verb (1st Person Plural)"
	},
	واياك: {
		transliteration: "Wa-iyyaka",
		meanings: {
			en: "And You Alone",
			hi: "और तुझ ही से",
			ur: "اور تجھ ہی سے",
			hinglish: "Aur sirf Tujh hi se",
			ar: "وبك وحدك"
		},
		grammarHint: "Conjunction (وَ) + Pronoun"
	},
	نستعين: {
		transliteration: "Nasta'een",
		meanings: {
			en: "We ask for help",
			hi: "हम मदद मांगते हैं",
			ur: "ہم مدد مانگتے ہیں",
			hinglish: "Hum madad maangte hain",
			ar: "نطلب المعونة والتوفيق"
		},
		grammarHint: "Present Tense Verb (Form X - Seeking)"
	},
	اهدنا: {
		transliteration: "Ihdina",
		meanings: {
			en: "Guide us",
			hi: "हमें हिदायत दे (रास्ता दिखा)",
			ur: "ہمیں ہدایت دے (راستہ دکھا)",
			hinglish: "Humein seedha raasta dikha (Guide us)",
			ar: "دلّنا وأرشدنا وثبتنا"
		},
		grammarHint: "Imperative/Supplication Verb + Pronoun (نا)"
	},
	الصرط: {
		transliteration: "As-Sirata",
		meanings: {
			en: "The Path / Way",
			hi: "रास्ता",
			ur: "راستہ",
			hinglish: "Raasta (Path)",
			ar: "الطريق الواضح"
		},
		grammarHint: "Definite Noun"
	},
	المستقيم: {
		transliteration: "Al-Mustaqeem",
		meanings: {
			en: "The Straight & Upright",
			hi: "सीधा और सच्चा",
			ur: "سیدھا اور سچا",
			hinglish: "Seedha aur sacha (Straight)",
			ar: "المعتدل الذي لا اعوجاج فيه"
		},
		grammarHint: "Adjective (Active Participle)"
	},
	صرط: {
		transliteration: "Sirata",
		meanings: {
			en: "The Path of",
			hi: "रास्ता (उनका)",
			ur: "راستہ (ان کا)",
			hinglish: "Raasta un logon ka",
			ar: "طريق ومنهج"
		},
		grammarHint: "Noun in Apposition (Badal)"
	},
	الذين: {
		transliteration: "Alladheena",
		meanings: {
			en: "Those who",
			hi: "वो लोग जिन",
			ur: "وہ لوگ جن",
			hinglish: "Woh log jin",
			ar: "اسم موصول للجمع"
		},
		grammarHint: "Relative Pronoun (Plural)"
	},
	انعمت: {
		transliteration: "An'amta",
		meanings: {
			en: "You have bestowed favor / grace",
			hi: "तूने इनाम और नेमत अता की",
			ur: "تو نے انعام فرمایا",
			hinglish: "Tu ne in’aam aur barkat ata ki",
			ar: "مننتَ عليهم بالهدى والتوفيق"
		},
		grammarHint: "Past Tense Verb (2nd Person Singular)"
	},
	عليهم: {
		transliteration: "'Alayhim",
		meanings: {
			en: "Upon them",
			hi: "उन पर",
			ur: "ان پر",
			hinglish: "Un par (Upon them)",
			ar: "عليهم"
		},
		grammarHint: "Preposition (عَلَى) + Pronoun (هُمْ)"
	},
	غير: {
		transliteration: "Ghayri",
		meanings: {
			en: "Not of / Other than",
			hi: "न कि (उनके सिवा)",
			ur: "نہ کہ (ان کے سوا)",
			hinglish: "Na ki unke",
			ar: "سوى / ليس"
		},
		grammarHint: "Noun of Negation/Exclusion"
	},
	المغضوب: {
		transliteration: "Al-Maghdoobi",
		meanings: {
			en: "Those who earned anger/wrath",
			hi: "जिन पर ग़ज़ब (नाराज़गी) हुआ",
			ur: "جن پر غضب ہوا",
			hinglish: "Jin par naraazgi hui",
			ar: "من عرفوا الحق وتركوه"
		},
		grammarHint: "Passive Participle (مَفْعُول)"
	},
	ولا: {
		transliteration: "Wa-la",
		meanings: {
			en: "And not / Nor",
			hi: "और न ही",
			ur: "اور نہ ہی",
			hinglish: "Aur na hi",
			ar: "وليس أيضاً"
		},
		grammarHint: "Conjunction + Negative Particle"
	},
	الضالين: {
		transliteration: "Ad-Daalleen",
		meanings: {
			en: "Those who went astray",
			hi: "जो भटक गए (गुमराह हुए)",
			ur: "جو بھٹک گئے (گمراہ ہوئے)",
			hinglish: "Jo raaste se bhatak gaye",
			ar: "التائهين عن طريق الحق"
		},
		grammarHint: "Active Participle Plural (Madd Lazim 6 counts)"
	},
	قل: {
		transliteration: "Qul",
		meanings: {
			en: "Say / Declare (O Prophet)",
			hi: "कह दीजिए (ऐ नबी ﷺ)",
			ur: "کہہ دیجیے (اے نبی ﷺ)",
			hinglish: "Keh dijiye (Say!)",
			ar: "قُلْ بلسانك موقناً بقلبك"
		},
		grammarHint: "Imperative Verb (أمر)"
	},
	هو: {
		transliteration: "Huwa",
		meanings: {
			en: "He is",
			hi: "वह (अल्लाह) है",
			ur: "وہ (اللّٰہ) ہے",
			hinglish: "Woh (Allah) hai",
			ar: "ضمير الشأن لله تعالى"
		},
		grammarHint: "3rd Person Singular Pronoun"
	},
	احد: {
		transliteration: "Ahad",
		meanings: {
			en: "One and Unique (Indivisible)",
			hi: "एक और बेमिसाल (अकेला)",
			ur: "ایک اور بے مثال (یکتا)",
			hinglish: "Ek aur Bemisaal (Unique One)",
			ar: "الواحد الأحد الذي لا نظير له"
		},
		grammarHint: "Attribute of Absolute Oneness"
	},
	الصمد: {
		transliteration: "As-Samad",
		meanings: {
			en: "The Eternal Refuge (Self-Sufficient Master needed by all)",
			hi: "बेनियाज़ मालिक (जिसके सब मोहताज हैं और वह किसी का मोहताज नहीं)",
			ur: "بے نیاز آقا (جس کے سب محتاج ہیں)",
			hinglish: "Be-niyaz Maalik (Jiski sabko zaroorat hai)",
			ar: "السيد المقصود في جميع الحوائج المستغني عن كل أحد"
		},
		grammarHint: "Definite Divine Attribute"
	},
	لم: {
		transliteration: "Lam",
		meanings: {
			en: "Did not / Never",
			hi: "नहीं (कभी नहीं)",
			ur: "نہیں (کبھی نہیں)",
			hinglish: "Kabhi nahi",
			ar: "حرف نفي وجزم وقلب"
		},
		grammarHint: "Negative Particle (Jazim)"
	},
	يلد: {
		transliteration: "Yalid",
		meanings: {
			en: "He begets / gives birth",
			hi: "उसने किसी को जना (औलाद)",
			ur: "اس نے کسی کو جنا",
			hinglish: "Usne kisi ko paida kiya (as child)",
			ar: "لم يخرج منه ولد"
		},
		grammarHint: "Jussive Verb (Majzoom)"
	},
	ولم: {
		transliteration: "Wa-lam",
		meanings: {
			en: "And never",
			hi: "और न ही",
			ur: "اور نہ ہی",
			hinglish: "Aur na hi kabhi",
			ar: "وحرف عطف ونفي"
		},
		grammarHint: "Conjunction + Negative Particle"
	},
	يولد: {
		transliteration: "Yoolad",
		meanings: {
			en: "Was He begotten / born",
			hi: "वह किसी से पैदा हुआ",
			ur: "وہ کسی سے پیدا ہوا",
			hinglish: "Woh kisi se paida hua",
			ar: "لم يولد من أب أو أم"
		},
		grammarHint: "Passive Jussive Verb"
	},
	يكن: {
		transliteration: "Yakun",
		meanings: {
			en: "Is / Has ever been",
			hi: "है / हुआ",
			ur: "ہے / ہوا",
			hinglish: "Hai / raha hai",
			ar: "فعل مضارع مجزوم"
		},
		grammarHint: "Jussive Verb (from كان)"
	},
	له: {
		transliteration: "Lahu",
		meanings: {
			en: "Unto Him / For Him",
			hi: "उसके लिए",
			ur: "اس کے لیے",
			hinglish: "Uske barabar / liye",
			ar: "لله تعالى"
		},
		grammarHint: "Preposition + Pronoun"
	},
	كفوا: {
		transliteration: "Kufuwan",
		meanings: {
			en: "Comparable / Equivalent",
			hi: "बराबर या हमसर (मुक़ाबले का)",
			ur: "برابر یا ہمسر",
			hinglish: "Barabar ya hamsar (Equal)",
			ar: "مكافئاً أو مماثلاً أو شبيهاً"
		},
		grammarHint: "Predicate Noun"
	},
	اعوذ: {
		transliteration: "A'oodhu",
		meanings: {
			en: "I seek refuge and protection",
			hi: "मैं पनाह मांगता हूँ",
			ur: "میں پناہ مانگتا ہوں",
			hinglish: "Main panaah (protection) maangta hoon",
			ar: "ألتجئ وأعتصم وأتحصن"
		},
		grammarHint: "Present Tense Verb (1st Person Singular)"
	},
	برب: {
		transliteration: "Bi-Rabbi",
		meanings: {
			en: "In the Lord of",
			hi: "रब (मालिक) की पनाह में",
			ur: "رب (مالک) کی پناہ میں",
			hinglish: "Rabb (Maalik) ki",
			ar: "بخالق ومالك"
		},
		grammarHint: "Preposition (بِ) + Noun (رَبّ)"
	},
	الفلق: {
		transliteration: "Al-Falaq",
		meanings: {
			en: "The Daybreak / Dawn",
			hi: "सुबह की पौ (सवेरा)",
			ur: "صبح کی روشنی",
			hinglish: "Subah ki roshni (Dawn)",
			ar: "الصبح الذي ينفلق عن الليل"
		},
		grammarHint: "Definite Noun (with Qalqalah on stopping)"
	},
	الناس: {
		transliteration: "An-Naas",
		meanings: {
			en: "Mankind / Humanity",
			hi: "इंसानों (लोगों)",
			ur: "انسانوں (لوگوں)",
			hinglish: "Insanon (Mankind)",
			ar: "البشر جميعاً"
		},
		grammarHint: "Definite Collective Noun (with Ghunnah on نّ)"
	},
	من: {
		transliteration: "Min",
		meanings: {
			en: "From / Of",
			hi: "से",
			ur: "سے",
			hinglish: "Se (From)",
			ar: "حرف جر لابتداء الغاية"
		},
		grammarHint: "Preposition (Harf Jarr)"
	},
	شر: {
		transliteration: "Sharri",
		meanings: {
			en: "The evil / harm of",
			hi: "बुराई और नुकसान से",
			ur: "شر اور برائی سے",
			hinglish: "Buraayi aur nuqsan se",
			ar: "أذى وسوء وفساد"
		},
		grammarHint: "Noun"
	},
	ما: {
		transliteration: "Maa",
		meanings: {
			en: "What / That which",
			hi: "जो कुछ",
			ur: "جو کچھ",
			hinglish: "Jo kuch",
			ar: "اسم موصول بمعنى الذي"
		},
		grammarHint: "Relative Particle"
	},
	خلق: {
		transliteration: "Khalaq",
		meanings: {
			en: "He created",
			hi: "उसने पैदा किया",
			ur: "اس نے پیدا کیا",
			hinglish: "Usne paida kiya (Created)",
			ar: "أوجد وأبدع من العدم"
		},
		grammarHint: "Past Tense Verb"
	},
	في: {
		transliteration: "Fee",
		meanings: {
			en: "In / Within",
			hi: "में",
			ur: "میں",
			hinglish: "Mein (In)",
			ar: "حرف جر للظرفية"
		},
		grammarHint: "Preposition"
	},
	على: {
		transliteration: "'Alaa",
		meanings: {
			en: "Upon / Over",
			hi: "पर / के ऊपर",
			ur: "پر / کے اوپر",
			hinglish: "Par (Upon)",
			ar: "حرف جر للاستعلاء"
		},
		grammarHint: "Preposition"
	},
	ان: {
		transliteration: "Inna",
		meanings: {
			en: "Indeed / Verily",
			hi: "बेशक / निश्चय ही",
			ur: "بے شک / یقیناً",
			hinglish: "Beshak (Indeed)",
			ar: "حرف توكيد ونصب"
		},
		grammarHint: "Particle of Emphasis (Harf Tawkeed)"
	},
	اعطيناك: {
		transliteration: "A'taynaaka",
		meanings: {
			en: "We have granted you",
			hi: "हमने आपको अता किया",
			ur: "ہم نے آپ کو عطا کیا",
			hinglish: "Humne aapko ata kiya",
			ar: "وهبناك ومنحناك"
		},
		grammarHint: "Past Tense Verb + Subject (نا) + Object (كَ)"
	},
	الكوثر: {
		transliteration: "Al-Kawthar",
		meanings: {
			en: "Abundant Good & The River of Al-Kawthar in Paradise",
			hi: "ढेर सारी भलाई और जन्नत की हौज़-ए-कौसर",
			ur: "خیرِ کثیر اور جنت کا حوضِ کوثر",
			hinglish: "Beshumaar khair aur Jannat ka Hauz-e-Kawthar",
			ar: "الخير الكثير ونهر الكوثر في الجنة"
		},
		grammarHint: "Definite Noun"
	},
	فصل: {
		transliteration: "Fa-salli",
		meanings: {
			en: "So pray / establish Salah",
			hi: "तो नमाज़ पढ़िए",
			ur: "پس نماز پڑھیے",
			hinglish: "Toh Namaz padhiye",
			ar: "أخلص صلاتك المفروضة والنافلة"
		},
		grammarHint: "Conjunction (فَ) + Imperative Verb"
	},
	لربك: {
		transliteration: "Li-Rabbika",
		meanings: {
			en: "To your Lord alone",
			hi: "अपने रब के लिए",
			ur: "اپنے رب کے لیے",
			hinglish: "Apne Rabb ke liye",
			ar: "لمولاك وخالقك وحده"
		},
		grammarHint: "Preposition + Noun + Pronoun"
	},
	وانحر: {
		transliteration: "Wanhar",
		meanings: {
			en: "And sacrifice (for His sake)",
			hi: "और क़ुर्बानी कीजिए",
			ur: "اور قربانی کیجیے",
			hinglish: "Aur qurbani kijiye",
			ar: "واذبح نسكك على اسمه وحده"
		},
		grammarHint: "Conjunction + Imperative Verb"
	},
	والعصر: {
		transliteration: "Wal-'Asr",
		meanings: {
			en: "By Time (through the ages)",
			hi: "ज़माने (वक्त) की क़सम",
			ur: "زمانے (وقت) کی قسم",
			hinglish: "Waqt (Time) ki qasam",
			ar: "أقسم الله بالدهر والزمان"
		},
		grammarHint: "Oath Particle (وَ) + Definite Noun"
	},
	الانسن: {
		transliteration: "Al-Insaana",
		meanings: {
			en: "Mankind / The human being",
			hi: "इंसान",
			ur: "انسان",
			hinglish: "Insaan (Human being)",
			ar: "جنس الإنسان"
		},
		grammarHint: "Definite Noun"
	},
	الانسان: {
		transliteration: "Al-Insaana",
		meanings: {
			en: "Mankind / The human being",
			hi: "इंसान",
			ur: "انسان",
			hinglish: "Insaan (Human being)",
			ar: "جنس الإنسان"
		},
		grammarHint: "Definite Noun"
	},
	لفي: {
		transliteration: "La-fee",
		meanings: {
			en: "Is surely in",
			hi: "यक़ीनन में है",
			ur: "یقیناً میں ہے",
			hinglish: "Yaqeenan mein hai",
			ar: "اللام للتوكيد وفي للظرفية"
		},
		grammarHint: "Emphatic Lam + Preposition"
	},
	خسر: {
		transliteration: "Khusr",
		meanings: {
			en: "Loss and ruin",
			hi: "घाटे और नुक़सान में",
			ur: "خسارے اور نقصان میں",
			hinglish: "Khasare aur nuqsan (Loss) mein",
			ar: "نقصان وهلاك وغبن"
		},
		grammarHint: "Indefinite Noun for Emphasis"
	},
	الا: {
		transliteration: "Illaa",
		meanings: {
			en: "Except / Save for",
			hi: "सिवाय (मगर)",
			ur: "سوائے (مگر)",
			hinglish: "Siwaye (Except)",
			ar: "أداة استثناء"
		},
		grammarHint: "Particle of Exception"
	},
	ءامنوا: {
		transliteration: "Aamanoo",
		meanings: {
			en: "Believed with true faith",
			hi: "ईमान लाए",
			ur: "ایمان لائے",
			hinglish: "Emaan laaye (Believed)",
			ar: "صدقوا بالله ورسوله"
		},
		grammarHint: "Past Tense Verb (3rd Person Plural)"
	},
	وعملوا: {
		transliteration: "Wa-'amiloo",
		meanings: {
			en: "And did / performed",
			hi: "और उन्होंने अमल किए",
			ur: "اور انہوں نے عمل کیے",
			hinglish: "Aur unhone amal kiye",
			ar: "وفعلوا وأدّوا"
		},
		grammarHint: "Conjunction + Past Tense Verb"
	},
	الصلحت: {
		transliteration: "As-Saalihaat",
		meanings: {
			en: "Righteous good deeds",
			hi: "नेक और भले काम",
			ur: "نیک اور صالح اعمال",
			hinglish: "Nek aur acche aamaal (Good deeds)",
			ar: "الأعمال الصالحة المرضية لله"
		},
		grammarHint: "Sound Feminine Plural Noun"
	},
	وتواصوا: {
		transliteration: "Wa-tawaasaw",
		meanings: {
			en: "And advised/encouraged one another",
			hi: "और एक-दूसरे को नसीहत की",
			ur: "اور ایک دوسرے کو نصیحت کی",
			hinglish: "Aur ek doosre ko naseehat/encourage kiya",
			ar: "أوصى بعضهم بعضاً"
		},
		grammarHint: "Reciprocal Past Verb (Form VI)"
	},
	بالحق: {
		transliteration: "Bil-Haqqi",
		meanings: {
			en: "To the Truth",
			hi: "हक़ और सच्चाई की",
			ur: "حق اور سچائی کی",
			hinglish: "Haq aur sachaayi (Truth) ki",
			ar: "بالثبات على الإيمان والخير"
		},
		grammarHint: "Preposition + Definite Noun"
	},
	بالصبر: {
		transliteration: "Bis-Sabr",
		meanings: {
			en: "To Patience & Perseverance",
			hi: "सब्र और हौसले की",
			ur: "صبر اور استقامت کی",
			hinglish: "Sabr aur himmat (Patience) ki",
			ar: "بالصبر على الطاعة وعن المعصية وعلى الأقدار"
		},
		grammarHint: "Preposition + Definite Noun"
	}
};
var VOCAB_LOOKUP_INDEX = /* @__PURE__ */ new Map();
for (const item of TOP_QURAN_VOCAB) {
	const key = normalizeArabicWordForLookup(item.arabic);
	if (key && !VOCAB_LOOKUP_INDEX.has(key)) VOCAB_LOOKUP_INDEX.set(key, {
		transliteration: item.transliteration,
		meanings: {
			en: item.meaning,
			...item.localizedMeanings || {}
		},
		grammarHint: `Quranic Vocabulary (${item.category || "Core"} · ${item.occurrencesInQuran}+ occurrences · Root: ${item.rootLetters})`
	});
}
var WBW_CACHE_NAME = "ilmizo-wbw-dictionary-v1";
var surahWbwMemoryCache = /* @__PURE__ */ new Map();
var coreWbwBundlePromise = null;
async function loadCoreWbwBundle() {
	if (typeof window === "undefined" || typeof fetch !== "function") return null;
	if (!coreWbwBundlePromise) coreWbwBundlePromise = (async () => {
		try {
			const resp = await fetch("/data/quran-wbw-core.json");
			if (!resp.ok) return null;
			return await resp.json();
		} catch {
			return null;
		}
	})();
	const bundle = await coreWbwBundlePromise;
	if (!bundle) coreWbwBundlePromise = null;
	return bundle;
}
function resolveWbwWordAudioUrl(relativeAudioUrl) {
	if (!relativeAudioUrl) return void 0;
	if (relativeAudioUrl.startsWith("http://") || relativeAudioUrl.startsWith("https://")) return relativeAudioUrl;
	return `https://audio.qurancdn.com/${relativeAudioUrl.replace(/^\/+/, "")}`;
}
/**
* Loads exact Word-by-Word meanings, transliteration & human word audio URLs for any Surah (1..114).
* Resolution order:
* 1. In-memory cache
* 2. Bundled offline core WBW pack (/data/quran-wbw-core.json — Fatiha, Ya-Sin, Al-Mulk, all Juz Amma)
* 3. Persistent CacheStorage ('ilmizo-wbw-dictionary-v1')
* 4. Live Quran.com v4 API (words=true), cached into CacheStorage for future offline use
*/
async function fetchAndCacheSurahWbw(surahNumber) {
	if (surahWbwMemoryCache.has(surahNumber)) return surahWbwMemoryCache.get(surahNumber) || null;
	const coreBundle = await loadCoreWbwBundle();
	if (coreBundle && coreBundle[String(surahNumber)]) {
		const parsed = coreBundle[String(surahNumber)];
		surahWbwMemoryCache.set(surahNumber, parsed);
		return parsed;
	}
	const cacheKey = `/__ilmizo_wbw_surah_${surahNumber}.json`;
	if (typeof caches !== "undefined") try {
		const cachedResp = await (await caches.open(WBW_CACHE_NAME)).match(cacheKey);
		if (cachedResp) {
			const parsed = await cachedResp.json();
			surahWbwMemoryCache.set(surahNumber, parsed);
			return parsed;
		}
	} catch {}
	if (typeof navigator !== "undefined" && navigator.onLine && typeof fetch === "function") try {
		let page = 1;
		const verses = {};
		while (true) {
			const url = `https://api.quran.com/api/v4/verses/by_chapter/${surahNumber}?words=true&per_page=50&page=${page}&word_fields=text_uthmani,transliteration,translation`;
			const resp = await fetch(url);
			if (!resp.ok) break;
			const json = await resp.json();
			for (const v of json.verses || []) {
				const ayahNum = Number(String(v.verse_key).split(":")[1]);
				if (!ayahNum) continue;
				verses[ayahNum] = (v.words || []).filter((w) => w.char_type_name === "word").map((w) => [
					w.text_uthmani || w.text || "",
					w.transliteration?.text || "",
					w.translation?.text || "",
					w.audio_url || ""
				]);
			}
			if (!json.pagination?.next_page) break;
			page = json.pagination.next_page;
		}
		if (Object.keys(verses).length > 0) {
			surahWbwMemoryCache.set(surahNumber, verses);
			if (typeof caches !== "undefined" && typeof Response !== "undefined") try {
				await (await caches.open(WBW_CACHE_NAME)).put(cacheKey, new Response(JSON.stringify(verses), { headers: { "Content-Type": "application/json" } }));
			} catch {}
			return verses;
		}
	} catch {}
	return null;
}
/**
* Resolves meaning, transliteration, letter-cluster Tajweed, and optional WBW audio
* for a single Arabic word inside an Ayah.
* Zero guesswork / translation slicing: returns explicit `isExactDictionaryMatch: false`
* if neither WBW data nor verified dictionary has the word.
*/
function resolveArabicWordTooltip(params) {
	const { arabicWord, wordIndex, totalWords, ayahTransliteration, wbwWord, precomputedSegments } = params;
	const normalizedKey = normalizeArabicWordForLookup(arabicWord);
	const segments = precomputedSegments || segmentArabicWordsWithTajweed([arabicWord])[0] || [];
	const priorityOrder = [
		"ghunnah",
		"qalqalah",
		"madd",
		"idgham_ikhfa",
		"tafkheem_allah"
	];
	let tajweedRule = TAJWEED_RULES_META.normal;
	for (const rId of priorityOrder) if (segments.some((s) => s.ruleId === rId)) {
		tajweedRule = TAJWEED_RULES_META[rId];
		break;
	}
	const candidates = [
		normalizedKey,
		normalizedKey.replace(/^[وفبل]/, ""),
		normalizedKey.replace(/^ال/, ""),
		normalizedKey.replace(/^[وف]ال/, "ال")
	];
	let dictHit;
	for (const key of candidates) {
		if (CURATED_WORD_DICTIONARY[key]) {
			dictHit = CURATED_WORD_DICTIONARY[key];
			break;
		}
		const vocabHit = VOCAB_LOOKUP_INDEX.get(key);
		if (vocabHit) {
			dictHit = vocabHit;
			break;
		}
	}
	const wbwTranslit = wbwWord?.[1]?.trim();
	const wbwMeaningEn = wbwWord?.[2]?.trim();
	const wordAudioUrl = resolveWbwWordAudioUrl(wbwWord?.[3]);
	if (wbwWord && wbwMeaningEn) return {
		index: wordIndex,
		arabicWord,
		normalizedKey,
		transliteration: wbwTranslit || dictHit?.transliteration || arabicWord,
		meanings: {
			en: wbwMeaningEn,
			hi: dictHit?.meanings.hi || wbwMeaningEn,
			ur: dictHit?.meanings.ur || wbwMeaningEn,
			hinglish: dictHit?.meanings.hinglish || wbwMeaningEn,
			ar: arabicWord
		},
		tajweedRule,
		segments,
		grammarHint: dictHit?.grammarHint || `Verified Quran Word-by-Word Corpus (Word ${wordIndex + 1} of ${totalWords})`,
		wordAudioUrl,
		isExactDictionaryMatch: true
	};
	if (dictHit) return {
		index: wordIndex,
		arabicWord,
		normalizedKey,
		transliteration: dictHit.transliteration,
		meanings: dictHit.meanings,
		tajweedRule,
		segments,
		grammarHint: dictHit.grammarHint,
		wordAudioUrl,
		isExactDictionaryMatch: true
	};
	const translitTokens = (ayahTransliteration || "").split(/\s+/).map((t) => t.trim()).filter(Boolean);
	return {
		index: wordIndex,
		arabicWord,
		normalizedKey,
		transliteration: translitTokens[wordIndex] || (translitTokens.length > 0 && !ayahTransliteration?.startsWith("Surah ") ? translitTokens[Math.min(translitTokens.length - 1, Math.floor(wordIndex / Math.max(1, totalWords) * translitTokens.length))] : "") || arabicWord,
		meanings: {
			en: "Connect once to load exact Word-by-Word meaning for this word.",
			hi: "इस लफ़्ज़ का सटीक शब्द-दर-शब्द मतलब लोड करने के लिए एक बार इंटरनेट से जुड़ें।",
			ur: "اس لفظ کا درست لفظ بہ لفظ ترجمہ لوڈ کرنے کے لیے ایک بار انٹرنیٹ سے منسلک ہوں۔",
			hinglish: "Is lafz ka exact word-by-word meaning load karne ke liye ek baar online connect karein.",
			ar: arabicWord
		},
		tajweedRule,
		segments,
		grammarHint: `Uthmani Word ${wordIndex + 1} of ${totalWords} (Tap when online once to cache full Surah WBW dictionary)`,
		wordAudioUrl,
		isExactDictionaryMatch: false
	};
}
/**
* Tokenizes a complete Arabic Uthmani Ayah into interactive word tokens with
* letter-cluster Tajweed segments, cross-word rules, and authentic WBW meanings.
*/
function tokenizeAyahWithTajweedAndMeanings(params) {
	const { wbwAyahWords } = params;
	const rawTokens = params.arabicUthmani.split(/\s+/).map((w) => w.trim()).filter((w) => w.length > 0 && !/^[\u06DD\u06D6-\u06DC\u06DF-\u06E4\d٠-٩]+$/u.test(w));
	const wordsForRendering = wbwAyahWords && wbwAyahWords.length > 0 ? wbwAyahWords.map((tuple, idx) => tuple[0] || rawTokens[idx] || "").filter(Boolean) : rawTokens;
	const segmentedPerWord = segmentArabicWordsWithTajweed(wordsForRendering);
	return wordsForRendering.map((word, idx) => resolveArabicWordTooltip({
		arabicWord: word,
		wordIndex: idx,
		totalWords: wordsForRendering.length,
		ayahTransliteration: params.transliteration,
		ayahTranslations: params.translations,
		wbwWord: wbwAyahWords?.[idx],
		precomputedSegments: segmentedPerWord[idx]
	}));
}
/**
* Helper to resolve localized word meaning for the active user language.
*/
function getLocalizedWordMeaning(analysis, language) {
	return analysis.meanings[language] || analysis.meanings.en;
}
// src/components/adult/Phase7To11Widgets.tsx
var import_jsx_runtime = require_jsx_runtime();
var QuranAdvancedAudioPlayerBar = ({ surahPayload, activeAyahIdx, onSelectAyahIdx, onTriggerToast }) => {
	const { user, updateUser, setAdultRoute } = useIlmizo();
	const { audioState, isActiveThisSurah, progressPercent: liveRecitationProgress } = useQuranAudioSync({
		surahNumber: surahPayload.meta.number,
		ayahs: surahPayload.ayahs,
		activeAyahIdx,
		onAyahIndexChange: onSelectAyahIdx,
		enableHaptics: false,
		autoScroll: false
	});
	const currentAyah = surahPayload.ayahs[activeAyahIdx] || surahPayload.ayahs[0];
	const [selectedMode, setSelectedMode] = (0, import_react.useState)(audioState.quranSequence.mode || "full_surah");
	const [rangeStart, setRangeStart] = (0, import_react.useState)(1);
	const [rangeEnd, setRangeEnd] = (0, import_react.useState)(Math.min(surahPayload.meta.ayahCount, Math.max(1, surahPayload.ayahs.length)));
	const [repeatOpt, setRepeatOpt] = (0, import_react.useState)(audioState.quranSequence.repeatOption || 1);
	const [optionsSheetOpen, setOptionsSheetOpen] = (0, import_react.useState)(false);
	const handleStartPlayback = () => {
		if (!currentAyah) return;
		const rate = user.playbackRate || 1;
		const reciterName = user.reciterName;
		if (selectedMode === "single_ayah") {
			audioManager.playQariRecitationAyah({
				id: `quran_${surahPayload.meta.number}_${currentAyah.numberInSurah}`,
				surahNumber: surahPayload.meta.number,
				ayahNumberInSurah: currentAyah.numberInSurah,
				globalAyahNumber: currentAyah.globalNumber,
				reciterName,
				rate,
				repeatOption: repeatOpt,
				onError: (msg) => onTriggerToast(msg)
			});
			return;
		}
		if (selectedMode === "full_surah") {
			audioManager.playFullSurah({
				surahNumber: surahPayload.meta.number,
				startFromAyah: currentAyah.numberInSurah,
				reciterName,
				rate,
				repeatOption: repeatOpt,
				onAyahChange: (_surahNum, ayahNum) => {
					const idx = surahPayload.ayahs.findIndex((a) => a.numberInSurah === ayahNum);
					if (idx >= 0) onSelectAyahIdx(idx);
				},
				onError: (msg) => onTriggerToast(msg)
			});
			return;
		}
		const validation = validateSurahAyahRange(surahPayload.meta.number, rangeStart, rangeEnd);
		if (!validation.valid) {
			onTriggerToast(validation.error || "Invalid Ayah range");
			return;
		}
		audioManager.playAyahRange({
			surahNumber: surahPayload.meta.number,
			startAyah: rangeStart,
			endAyah: rangeEnd,
			reciterName,
			rate,
			repeatOption: repeatOpt,
			onAyahChange: (_surahNum, ayahNum) => {
				const idx = surahPayload.ayahs.findIndex((a) => a.numberInSurah === ayahNum);
				if (idx >= 0) onSelectAyahIdx(idx);
			},
			onError: (msg) => onTriggerToast(msg)
		});
	};
	const repeatOptions = [
		{
			value: 1,
			label: "1x"
		},
		{
			value: 2,
			label: "2x"
		},
		{
			value: 5,
			label: "5x"
		},
		{
			value: 10,
			label: "10x"
		},
		{
			value: "infinite",
			label: "∞ Loop"
		}
	];
	const modeSummaryLabel = selectedMode === "full_surah" ? "Full Surah" : selectedMode === "ayah_range" ? `Ayahs ${rangeStart}–${rangeEnd}` : `Ayah ${currentAyah?.numberInSurah || 1}`;
	const repeatLabel = repeatOpt === "infinite" ? "∞ Loop" : `${repeatOpt}x`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border px-3.5 py-2.5 bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)] shadow-2xs space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void audioManager.previousAyah(),
							disabled: audioState.status === "idle",
							"aria-label": "Previous Ayah in Queue",
							className: "w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] disabled:opacity-35 flex items-center justify-center transition active:scale-95",
							title: "Previous Ayah",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { className: "w-4 h-4" })
						}),
						audioState.status === "playing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => audioManager.pause(),
							className: "px-4 h-10 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs whitespace-nowrap shrink-0 active:scale-95 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pause" })]
						}) : audioState.status === "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => audioManager.resume(),
							className: "px-4 h-10 rounded-full bg-[#22C55E] text-emerald-950 font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs whitespace-nowrap shrink-0 active:scale-95 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Resume" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleStartPlayback,
							className: "px-4 h-10 rounded-full bg-[#14532D] text-white font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs hover:bg-emerald-800 whitespace-nowrap shrink-0 active:scale-95 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedMode === "full_surah" ? "Play Surah" : selectedMode === "ayah_range" ? `Play ${rangeStart}–${rangeEnd}` : "Play Ayah" })]
						}),
						audioState.status !== "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => audioManager.stopAll(),
							"aria-label": "Stop Audio Playback",
							className: "w-9 h-9 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700/40 flex items-center justify-center transition active:scale-95",
							title: "Stop Playback",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "w-3.5 h-3.5 fill-current" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void audioManager.nextAyah(),
							disabled: audioState.status === "idle",
							"aria-label": "Next Ayah in Queue",
							className: "w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] disabled:opacity-35 flex items-center justify-center transition active:scale-95",
							title: "Next Ayah",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "w-4 h-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOptionsSheetOpen(true),
						"aria-label": "Audio Playback Options",
						className: "min-h-[38px] px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[11px] font-bold inline-flex items-center gap-1.5 hover:border-emerald-700/40 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "w-3.5 h-3.5 text-[#14532D] dark:text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: repeatLabel })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setAdultRoute("quran_journal"),
						"aria-label": "Open My Quran Journal",
						title: "My Quran Journal",
						className: "w-9 h-9 rounded-full bg-amber-100/80 dark:bg-amber-400/15 text-amber-950 dark:text-amber-200 border border-amber-300/70 dark:border-amber-500/35 flex items-center justify-center hover:opacity-90 transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "w-4 h-4" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 text-[11px] text-[var(--text-secondary)] pt-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "truncate font-semibold flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5 text-[#14532D] dark:text-amber-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: user.reciterName || VERIFIED_RECITER_EDITIONS[0]?.label || "Mishary Rashid Alafasy"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums font-bold shrink-0 text-[#14532D] dark:text-amber-300",
					children: audioState.status !== "idle" ? `Ayah ${audioState.quranSequence.currentAyah || currentAyah?.numberInSurah} · Rep ${audioState.quranSequence.currentRepetition}/${audioState.quranSequence.repeatOption === "infinite" ? "∞" : audioState.quranSequence.repeatOption}` : modeSummaryLabel
				})]
			}),
			isActiveThisSurah && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-gradient-to-r from-[#14532D] via-[#22C55E] to-[#F59E0B] transition-all duration-300",
					style: { width: `${Math.max(4, liveRecitationProgress)}%` }
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
		open: optionsSheetOpen,
		onClose: () => setOptionsSheetOpen(false),
		title: "Recitation Controls",
		subtitle: "Choose playback scope, reciter, and repeat count.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-extrabold text-[var(--text-secondary)]",
						children: "Playback Scope"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-1.5 bg-[var(--bg-elevated)] p-1 rounded-2xl border border-[var(--border-subtle)]",
						children: [
							{
								id: "single_ayah",
								label: "Single Ayah"
							},
							{
								id: "full_surah",
								label: "Full Surah"
							},
							{
								id: "ayah_range",
								label: "Ayah Range"
							}
						].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSelectedMode(m.id),
							className: `min-h-[40px] rounded-xl text-xs font-extrabold transition ${selectedMode === m.id ? "bg-[#14532D] text-white shadow-2xs" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`,
							children: m.label
						}, m.id))
					})]
				}),
				selectedMode === "ayah_range" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2.5 bg-[var(--bg-elevated)] p-3 rounded-2xl border border-[var(--border-subtle)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-bold text-[var(--text-secondary)] space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Start Ayah" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							max: surahPayload.meta.ayahCount,
							value: rangeStart,
							onChange: (e) => setRangeStart(Math.max(1, Number(e.target.value))),
							className: "ilmizo-input w-full min-h-[42px] rounded-xl px-3 py-1.5 text-sm font-extrabold tabular-nums"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs font-bold text-[var(--text-secondary)] space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "End Ayah" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: rangeStart,
							max: surahPayload.meta.ayahCount,
							value: rangeEnd,
							onChange: (e) => setRangeEnd(Math.min(surahPayload.meta.ayahCount, Math.max(rangeStart, Number(e.target.value)))),
							className: "ilmizo-input w-full min-h-[42px] rounded-xl px-3 py-1.5 text-sm font-extrabold tabular-nums"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-extrabold text-[var(--text-secondary)]",
						children: "Qari Reciter"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
						title: "Choose Qari Reciter",
						subtitle: "Verified authentic human Quran recitations",
						ariaLabel: "Select Qari Reciter",
						variant: "default",
						leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4 text-emerald-700 dark:text-amber-300" }),
						value: user.reciterName || VERIFIED_RECITER_EDITIONS[0]?.label || "Mishary Rashid Alafasy",
						onChange: (nextQari) => {
							updateUser({ reciterName: nextQari });
							audioManager.setReciter(nextQari);
							onTriggerToast(`Reciter set to ${nextQari}`);
						},
						options: VERIFIED_RECITER_EDITIONS.map((q) => ({
							value: q.label,
							label: q.label,
							subtitle: `${q.cdnBitrate}kbps authentic audio`
						}))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-extrabold text-[var(--text-secondary)] flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "w-3.5 h-3.5 text-[#14532D] dark:text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Repeat Count" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-5 gap-1.5",
						children: repeatOptions.map((ro) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setRepeatOpt(ro.value);
								audioManager.setRepeatOption(ro.value);
								onTriggerToast(`Repeat set to ${ro.label}`);
							},
							className: `min-h-[42px] rounded-xl text-xs font-extrabold border transition ${repeatOpt === ro.value ? "bg-[#14532D] text-white border-[#14532D]" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)]"}`,
							children: ro.label
						}, String(ro.value)))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setOptionsSheetOpen(false);
						handleStartPlayback();
					},
					className: "w-full min-h-[48px] rounded-2xl bg-[#14532D] hover:bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-4 h-4 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Start Recitation (",
						modeSummaryLabel,
						")"
					] })]
				})
			]
		})
	})] });
};
var QuranJournalScreen = ({ onTriggerToast }) => {
	const { bookmarks, personalNotes, revisionItems, addPersonalNote, editPersonalNote, deletePersonalNote, toggleBookmark, openSurahForReading } = useIlmizo();
	const [filter, setFilter] = (0, import_react.useState)({
		searchQuery: "",
		kindFilter: "all",
		surahFilter: null,
		tagFilter: null,
		folderFilter: null,
		sortOrder: "newest"
	});
	const [showCreateForm, setShowCreateForm] = (0, import_react.useState)(false);
	const [noteSurahNum, setNoteSurahNum] = (0, import_react.useState)(1);
	const [noteAyahNum, setNoteAyahNum] = (0, import_react.useState)(1);
	const [noteType, setNoteType] = (0, import_react.useState)("tadabbur");
	const [selectedPromptId, setSelectedPromptId] = (0, import_react.useState)(TADABBUR_REFLECTION_PROMPTS[0].id);
	const [noteTitle, setNoteTitle] = (0, import_react.useState)("");
	const [noteBody, setNoteBody] = (0, import_react.useState)("");
	const [noteTagsInput, setNoteTagsInput] = (0, import_react.useState)("faith, gratitude");
	const [editingNoteId, setEditingNoteId] = (0, import_react.useState)(null);
	const [editBody, setEditBody] = (0, import_react.useState)("");
	const [editTags, setEditTags] = (0, import_react.useState)("");
	const [confirmDeleteId, setConfirmDeleteId] = (0, import_react.useState)(null);
	const allEntries = (0, import_react.useMemo)(() => buildUnifiedQuranJournalEntries({
		bookmarks,
		personalNotes,
		revisionItems
	}), [
		bookmarks,
		personalNotes,
		revisionItems
	]);
	const filteredEntries = (0, import_react.useMemo)(() => queryQuranJournalEntries(allEntries, filter), [allEntries, filter]);
	const allAvailableTags = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		allEntries.forEach((e) => e.tags.forEach((t) => set.add(t)));
		return Array.from(set);
	}, [allEntries]);
	const handleSaveNewNote = (e) => {
		e.preventDefault();
		if (!noteBody.trim()) return;
		const refLabel = `${ALL_114_SURAHS.find((s) => s.number === noteSurahNum)?.nameTranslit || `Surah ${noteSurahNum}`} ${noteSurahNum}:${noteAyahNum}`;
		const tags = noteTagsInput.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
		const promptObj = TADABBUR_REFLECTION_PROMPTS.find((p) => p.id === selectedPromptId);
		addPersonalNote(noteTitle.trim() || refLabel, noteBody.trim(), refLabel, noteSurahNum, noteAyahNum, {
			tags,
			noteType: noteType === "personal" ? "note" : noteType,
			tadabburPrompt: noteType === "tadabbur" ? promptObj?.prompt : void 0
		});
		setNoteTitle("");
		setNoteBody("");
		setShowCreateForm(false);
		onTriggerToast(`Saved ${noteType.replace("_", " ")} for ${refLabel}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24 bg-[var(--bg-app)] text-[var(--text-primary)] min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-gradient-to-b from-[#0F3826] to-[#14532D] text-white rounded-b-[28px] pb-4 pt-3 px-4 shadow-md space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBackButton, { variant: "dark" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-extrabold",
							children: "My Quran Journal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-emerald-200",
							children: "Bookmarks, Personal Notes, Tadabbur & Hifz Reflections"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setShowCreateForm(!showCreateForm),
						className: "min-w-[44px] min-h-[44px] px-3 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-xs flex items-center gap-1 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "New" })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-5 gap-1 bg-black/25 p-1 rounded-full text-[11px] font-extrabold",
				children: [
					{
						id: "all",
						label: `All (${allEntries.length})`
					},
					{
						id: "bookmark",
						label: "Bookmarks"
					},
					{
						id: "note",
						label: "Notes"
					},
					{
						id: "tadabbur",
						label: "Tadabbur"
					},
					{
						id: "hifz_note",
						label: "Hifz"
					}
				].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter((prev) => ({
						...prev,
						kindFilter: tab.id
					})),
					className: `py-1.5 rounded-full transition truncate px-1 ${filter.kindFilter === tab.id ? "bg-amber-400 text-emerald-950 shadow-2xs" : "text-emerald-100 hover:bg-white/10"}`,
					children: tab.label
				}, tab.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-4 space-y-4 max-w-3xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-500/30 px-3.5 py-2.5 text-[11px] text-amber-950 dark:text-amber-200 flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: TADABBUR_DISCLAIMER.en })]
				}),
				showCreateForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSaveNewNote,
					className: "rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-sm space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-extrabold text-[#14532D] dark:text-emerald-300",
								children: "Add Quran Note or Tadabbur Reflection"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowCreateForm(false),
								className: "text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
								children: "Close"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[11px] font-bold text-[var(--text-secondary)] mb-1",
									children: "Entry Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
									title: "Journal Entry Type",
									ariaLabel: "Entry Type",
									variant: "compact",
									className: "w-full",
									value: noteType,
									onChange: (val) => setNoteType(val),
									options: [
										{
											value: "tadabbur",
											label: "Tadabbur Reflection",
											subtitle: "Guided verse reflection"
										},
										{
											value: "personal",
											label: "Personal Study Note",
											subtitle: "Your own study notes"
										},
										{
											value: "hifz_note",
											label: "Hifz Memorization Note",
											subtitle: "Memorization cues & reminders"
										}
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[11px] font-bold text-[var(--text-secondary)] mb-1",
									children: "Surah"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
									title: "Select Surah",
									ariaLabel: "Journal Surah",
									variant: "compact",
									searchable: true,
									searchPlaceholder: "Search Surah…",
									className: "w-full",
									value: String(noteSurahNum),
									onChange: (val) => {
										setNoteSurahNum(Number(val));
										setNoteAyahNum(1);
									},
									options: ALL_114_SURAHS.map((s) => ({
										value: String(s.number),
										label: `${s.number}. ${s.nameTranslit}`,
										subtitle: s.nameEnglish,
										badge: `${s.ayahCount} ayahs`
									}))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-[11px] font-bold text-[var(--text-secondary)]",
									children: ["Ayah Number", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 1,
										max: ALL_114_SURAHS.find((s) => s.number === noteSurahNum)?.ayahCount || 286,
										value: noteAyahNum,
										onChange: (e) => setNoteAyahNum(Math.max(1, Number(e.target.value))),
										className: "ilmizo-input mt-1 w-full min-h-[42px] rounded-xl px-2.5 py-1.5 text-xs font-bold tabular-nums"
									})]
								})
							]
						}),
						noteType === "tadabbur" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[11px] font-bold text-[var(--text-secondary)] mb-1",
							children: "Guided Tadabbur Reflection Prompt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
							title: "Tadabbur Reflection Prompt",
							ariaLabel: "Guided Tadabbur Reflection Prompt",
							variant: "compact",
							className: "w-full",
							value: selectedPromptId,
							onChange: (val) => setSelectedPromptId(val),
							options: TADABBUR_REFLECTION_PROMPTS.map((p) => ({
								value: p.id,
								label: p.prompt
							}))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: noteTitle,
								onChange: (e) => setNoteTitle(e.target.value),
								placeholder: "Optional custom title...",
								className: "ilmizo-input rounded-xl px-3 py-1.5 text-xs font-semibold"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: noteTagsInput,
								onChange: (e) => setNoteTagsInput(e.target.value),
								placeholder: "Tags (comma-separated: patience, dua, hifz)",
								className: "ilmizo-input rounded-xl px-3 py-1.5 text-xs font-semibold"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: noteBody,
							onChange: (e) => setNoteBody(e.target.value),
							placeholder: "Write your reflection, action step, or memorization note...",
							className: "ilmizo-input w-full rounded-xl p-3 text-xs",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "w-full py-2.5 rounded-xl bg-[#14532D] text-white font-extrabold text-xs hover:bg-emerald-800 transition",
							children: "Save to My Quran Journal"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-[var(--bg-surface)] p-3 border border-[var(--border-subtle)] shadow-2xs space-y-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: filter.searchQuery || "",
									onChange: (e) => setFilter((prev) => ({
										...prev,
										searchQuery: e.target.value
									})),
									placeholder: "Search notes, bookmarks, tags, or Surah 2:255...",
									className: "ilmizo-input w-full rounded-full pl-10 pr-4 py-2 text-xs font-medium"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
								title: "Filter by Surah",
								ariaLabel: "Filter by Surah",
								variant: "compact",
								searchable: true,
								searchPlaceholder: "Search Surah…",
								value: filter.surahFilter ? String(filter.surahFilter) : "",
								onChange: (val) => setFilter((prev) => ({
									...prev,
									surahFilter: val ? Number(val) : null
								})),
								options: [{
									value: "",
									label: "All Surahs"
								}, ...ALL_114_SURAHS.map((s) => ({
									value: String(s.number),
									label: `${s.number}. ${s.nameTranslit}`,
									subtitle: s.nameEnglish
								}))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
								title: "Sort Journal Entries",
								ariaLabel: "Sort Journal Entries",
								variant: "compact",
								value: filter.sortOrder || "newest",
								onChange: (val) => setFilter((prev) => ({
									...prev,
									sortOrder: val
								})),
								options: [
									{
										value: "newest",
										label: "Newest First"
									},
									{
										value: "oldest",
										label: "Oldest First"
									},
									{
										value: "surah_asc",
										label: "Surah Order (1 → 114)"
									},
									{
										value: "surah_desc",
										label: "Surah Order (114 → 1)"
									}
								]
							})
						]
					}), allAvailableTags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 overflow-x-auto pb-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setFilter((prev) => ({
									...prev,
									tagFilter: null
								})),
								className: `px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${filter.tagFilter === null ? "bg-[#14532D] text-white" : "bg-[var(--bg-subtle)] text-[var(--text-secondary)]"}`,
								children: "All Tags"
							}),
							allAvailableTags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setFilter((prev) => ({
									...prev,
									tagFilter: prev.tagFilter === tag ? null : tag
								})),
								className: `px-2.5 py-0.5 rounded-full text-[11px] font-extrabold whitespace-nowrap ${filter.tagFilter === tag ? "bg-amber-400 text-emerald-950" : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200"}`,
								children: ["#", tag]
							}, tag))
						]
					})]
				}),
				filteredEntries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-[var(--bg-surface)] p-8 text-center border border-[var(--border-subtle)] space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "w-8 h-8 text-emerald-800 dark:text-emerald-400 mx-auto opacity-60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-extrabold text-[var(--text-primary)]",
							children: "No matching Quran Journal entries"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-secondary)]",
							children: "Bookmark any Ayah while reading or tap “+ New” above to record a Tadabbur reflection."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: filteredEntries.map((entry) => {
						const isBookmark = entry.kind === "bookmark";
						const rawId = entry.id.replace(/^(bm_|note_)/, "");
						const isEditing = editingNoteId === rawId;
						const isConfirmingDelete = confirmDeleteId === entry.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full ${isBookmark ? "bg-amber-100 dark:bg-amber-400/20 text-amber-900 dark:text-amber-200" : entry.kind === "tadabbur" ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200" : entry.kind === "hifz_note" ? "bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200" : "bg-sky-100 dark:bg-sky-950/60 text-sky-900 dark:text-sky-200"}`,
												children: entry.kind.replace("_", " ")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => openSurahForReading(entry.surahNumber, entry.ayahNumber),
												className: "text-sm font-extrabold text-[#14532D] dark:text-emerald-300 hover:underline",
												children: [
													entry.surahName,
													" · Ayah ",
													entry.ayahNumber
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[11px] text-[var(--text-muted)]",
												children: ["· ", entry.createdAt]
											})
										]
									}), entry.tadabburPrompt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-semibold text-amber-800 dark:text-amber-300 mt-1",
										children: ["Prompt: ", entry.tadabburPrompt]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 shrink-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => openSurahForReading(entry.surahNumber, entry.ayahNumber),
												className: "px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold hover:opacity-90",
												children: "Open Ayah"
											}),
											!isBookmark && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													setEditingNoteId(rawId);
													setEditBody(entry.body);
													setEditTags(entry.tags.join(", "));
												},
												className: "p-1.5 rounded-full text-[var(--text-muted)] hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-[var(--bg-subtle)]",
												title: "Edit Note",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-3.5 h-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setConfirmDeleteId(entry.id),
												className: "p-1.5 rounded-full text-[var(--text-muted)] hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40",
												title: "Delete Entry",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
											})
										]
									})]
								}),
								entry.arabicSnippet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-arabic text-xl text-[var(--text-primary)] text-right bg-[var(--bg-elevated)] p-2.5 rounded-2xl border border-[var(--border-subtle)]",
									dir: "rtl",
									children: entry.arabicSnippet
								}),
								isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 pt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 3,
											value: editBody,
											onChange: (e) => setEditBody(e.target.value),
											className: "ilmizo-input w-full rounded-xl p-2.5 text-xs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: editTags,
											onChange: (e) => setEditTags(e.target.value),
											placeholder: "Tags (comma-separated)",
											className: "ilmizo-input w-full rounded-xl px-2.5 py-1.5 text-xs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													editPersonalNote(rawId, {
														body: editBody.trim(),
														tags: editTags.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
													});
													setEditingNoteId(null);
													onTriggerToast("Updated journal note");
												},
												className: "px-3 py-1.5 rounded-xl bg-[#14532D] text-white text-xs font-extrabold",
												children: "Save Changes"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setEditingNoteId(null),
												className: "px-3 py-1.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-secondary)] text-xs font-bold",
												children: "Cancel"
											})]
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[var(--text-secondary)] leading-relaxed",
									children: entry.body
								}),
								entry.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1 pt-0.5",
									children: entry.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200",
										children: ["#", t]
									}, t))
								}),
								isConfirmingDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-rose-50 dark:bg-rose-950/45 border border-rose-200 dark:border-rose-500/35 p-2.5 flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-rose-900 dark:text-rose-200",
										children: "Confirm permanent deletion of this entry?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												if (isBookmark) toggleBookmark({
													surahNumber: entry.surahNumber,
													surahName: entry.surahName,
													ayahNumber: entry.ayahNumber,
													arabicSnippet: entry.arabicSnippet || ""
												});
												else deletePersonalNote(rawId);
												setConfirmDeleteId(null);
												onTriggerToast("Deleted entry from My Quran Journal");
											},
											className: "px-2.5 py-1 rounded-lg bg-rose-600 text-white font-extrabold text-[11px]",
											children: "Confirm Delete"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setConfirmDeleteId(null),
											className: "px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] text-[var(--text-secondary)] font-bold text-[11px]",
											children: "Cancel"
										})]
									})]
								})
							]
						}, entry.id);
					})
				})
			]
		})]
	});
};
var WordByWordHifzRevealPanel = ({ surahPayload }) => {
	const sampleAyah = surahPayload?.ayahs[0] || {
		numberInSurah: 1,
		arabicUthmani: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
	};
	const [selectedAyahNum, setSelectedAyahNum] = (0, import_react.useState)(sampleAyah.numberInSurah);
	const activeAyahObj = surahPayload?.ayahs.find((a) => a.numberInSurah === selectedAyahNum) || sampleAyah;
	const [session, setSession] = (0, import_react.useState)(() => createWordByWordSession(surahPayload?.meta.number || 1, activeAyahObj.numberInSurah, activeAyahObj.arabicUthmani));
	const handleSwitchAyah = (ayahNum) => {
		setSelectedAyahNum(ayahNum);
		const found = surahPayload?.ayahs.find((a) => a.numberInSurah === ayahNum) || sampleAyah;
		setSession(createWordByWordSession(surahPayload?.meta.number || 1, found.numberInSurah, found.arabicUthmani));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-xs space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300 uppercase tracking-wider",
					children: "Word-by-Word Hifz Active Recall"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-[var(--text-secondary)]",
					children: "Recite each Arabic word from memory, then reveal one word at a time"
				})] }), surahPayload && surahPayload.ayahs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
					title: "Choose Ayah to Practice",
					subtitle: surahPayload.meta.nameTranslit,
					ariaLabel: "Select Ayah for Word-by-Word Hifz",
					variant: "inline",
					searchable: surahPayload.ayahs.length >= 10,
					searchPlaceholder: "Search Ayah number…",
					value: String(selectedAyahNum),
					onChange: (val) => handleSwitchAyah(Number(val)),
					options: surahPayload.ayahs.map((a) => ({
						value: String(a.numberInSurah),
						label: `${surahPayload.meta.nameTranslit} · Ayah ${a.numberInSurah}`
					}))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				dir: "rtl",
				className: "rounded-2xl bg-[#0F3826] text-white p-4 min-h-[96px] flex flex-wrap items-center justify-center gap-2.5",
				children: session.words.map((word, idx) => {
					const isRevealed = idx < session.revealedCount;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `font-arabic text-2xl px-2.5 py-1 rounded-xl border transition ${isRevealed ? "bg-amber-400/20 border-amber-300 text-amber-200 font-bold" : "bg-white/10 border-white/15 text-transparent select-none blur-xs"}`,
						children: word
					}, `${idx}_${word}`);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[11px] font-extrabold text-[var(--text-secondary)] tabular-nums",
					children: [
						"Revealed ",
						session.revealedCount,
						" / ",
						session.words.length,
						" words"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSession((s) => revealPreviousWord(s)),
							disabled: session.revealedCount === 0,
							className: "px-2.5 py-1.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-primary)] disabled:opacity-40 text-xs font-bold",
							children: "Hide Last"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSession((s) => revealNextWord(s)),
							disabled: session.isFullyRevealed,
							className: "px-3 py-1.5 rounded-xl bg-[#14532D] text-white disabled:opacity-40 text-xs font-extrabold",
							children: "Reveal Next Word"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSession((s) => revealCompleteAyah(s)),
							disabled: session.isFullyRevealed,
							className: "px-2.5 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-400/20 text-amber-950 dark:text-amber-200 disabled:opacity-40 text-xs font-extrabold",
							children: "Reveal Full Ayah"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSession((s) => resetWordByWordSession(s)),
							className: "px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/45 text-rose-800 dark:text-rose-200 text-xs font-bold",
							children: "Reset"
						})
					]
				})]
			})
		]
	});
};
var SalahCompleteGuideAndExcusedPanel = ({ activeDateKey, onTriggerToast }) => {
	const { user, salahRecords, salahAnalytics, setUserMadhhab, toggleExcusedPrayerMode, toggleExcusedSalahDay } = useIlmizo();
	const [selectedGuidePrayer, setSelectedGuidePrayer] = (0, import_react.useState)("Fajr");
	const [showFullRecitations, setShowFullRecitations] = (0, import_react.useState)(false);
	const isDayExcused = Boolean(salahRecords[activeDateKey]?.isExcusedDay);
	const activeGuide = COMPLETE_PRAYER_GUIDES.find((g) => g.id === selectedGuidePrayer) || COMPLETE_PRAYER_GUIDES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 pt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
					children: "Fiqh School (Madhhab) & Streak Protection"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-[var(--text-secondary)]",
					children: [
						"Active Streak: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [salahAnalytics.consecutiveWorshipStreakDays, " days"] }),
						" (Excused days:",
						" ",
						salahAnalytics.excusedDaysCount,
						" · Never counted as missed/Qada)"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
					title: "Select Fiqh School (Madhhab)",
					ariaLabel: "Select Fiqh Madhhab",
					variant: "compact",
					value: user.madhhab || "Hanafi",
					onChange: (val) => {
						const nextM = val;
						setUserMadhhab(nextM);
						onTriggerToast(`Fiqh Madhhab updated to ${nextM}`);
					},
					options: [
						"Hanafi",
						"Shafii",
						"Maliki",
						"Hanbali"
					].map((m) => ({
						value: m,
						label: `${m} School`
					}))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-extrabold text-[var(--text-primary)]",
						children: "Women’s Excused Prayer Mode (Private & Local-Only)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-[var(--text-secondary)]",
						children: "Exempt days preserve your worship streak and are never marked as missed or Qada."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							toggleExcusedPrayerMode();
							onTriggerToast(!user.excusedPrayerModeEnabled ? "Enabled Women’s Excused Prayer Mode" : "Hidden Women’s Excused Prayer Mode");
						},
						className: `px-3 py-1.5 rounded-full text-[11px] font-extrabold transition ${user.excusedPrayerModeEnabled ? "bg-[#14532D] text-amber-300" : "bg-[var(--bg-subtle)] text-[var(--text-secondary)]"}`,
						children: user.excusedPrayerModeEnabled ? "Enabled" : "Enable"
					})]
				}), user.excusedPrayerModeEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-2 border-t border-[var(--divider)] flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-bold text-[var(--text-primary)]",
						children: [
							"Status for ",
							activeDateKey,
							":",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: isDayExcused ? "text-purple-700 dark:text-purple-300" : "text-[var(--text-secondary)]",
								children: isDayExcused ? "EXCUSED (Streak Protected)" : "Standard Prayer Day"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							toggleExcusedSalahDay(activeDateKey, !isDayExcused);
							onTriggerToast(!isDayExcused ? `Marked ${activeDateKey} as Excused — streak preserved` : `Restored ${activeDateKey} to standard tracking`);
						},
						className: `px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${isDayExcused ? "bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-500/40" : "bg-emerald-50 dark:bg-emerald-950/50 text-[#14532D] dark:text-emerald-200 border border-emerald-200 dark:border-emerald-500/35"}`,
						children: isDayExcused ? "Unmark Excused Day" : "Mark Day as Excused"
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
					children: "Complete Prayer Rak’ah Guides & Full Recitations"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setShowFullRecitations(!showFullRecitations),
					className: "px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-950 dark:text-amber-200 text-[11px] font-extrabold shrink-0",
					children: showFullRecitations ? "Show Rak’ah Breakdown" : "Full Arabic Recitations (9)"
				})]
			}), !showFullRecitations ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1.5 overflow-x-auto pb-1",
					children: COMPLETE_PRAYER_GUIDES.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSelectedGuidePrayer(g.id),
						className: `px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap ${selectedGuidePrayer === g.id ? "bg-[#14532D] text-white" : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200"}`,
						children: [
							g.id,
							" (",
							g.fardRakahs,
							" Fard)"
						]
					}, g.id))
				}), activeGuide && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)] space-y-1.5 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-extrabold text-[#14532D] dark:text-emerald-300",
							children: [
								activeGuide.name,
								" · ",
								activeGuide.timeWindowDesc
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[var(--text-secondary)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Fard:" }),
								" ",
								activeGuide.fardRakahs,
								" Rak’ahs ·",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sunnah Mu’akkadah:" }),
								" ",
								activeGuide.sunnahMuakkadahBefore,
								" before,",
								" ",
								activeGuide.sunnahMuakkadahAfter,
								" after"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1 text-[var(--text-primary)]",
							children: activeGuide.stepByStepSummary.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line }, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl border border-amber-200 dark:border-amber-500/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [user.madhhab || "Hanafi", " Note:"] }),
								" ",
								activeGuide.madhhabSpecifics[user.madhhab || "Hanafi"]
							]
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2.5 max-h-96 overflow-y-auto pr-1",
				children: COMPLETE_SALAH_RECITATIONS.map((rec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)] space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300",
								children: [
									rec.title,
									" (",
									rec.stage,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-bold text-[var(--text-muted)]",
								children: rec.sourceReference
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-arabic text-xl text-[var(--text-primary)] text-right leading-loose",
							dir: "rtl",
							children: rec.arabic
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 italic",
							children: rec.transliteration
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-secondary)]",
							children: rec.translations.en
						})
					]
				}, rec.id))
			})]
		})]
	});
};
var InteractiveTajweedAyahView = ({ ayah, surahNumber, fontScaleClass = "text-3xl", darkMode = false, onPlayAyahAudio }) => {
	const { user } = useIlmizo();
	const [tajweedColorsEnabled, setTajweedColorsEnabled] = (0, import_react.useState)(true);
	const [showTajweedLegend, setShowTajweedLegend] = (0, import_react.useState)(false);
	const [selectedWordIdx, setSelectedWordIdx] = (0, import_react.useState)(null);
	const [surahWbwDict, setSurahWbwDict] = (0, import_react.useState)(null);
	import_react.useEffect(() => {
		let active = true;
		setSurahWbwDict(null);
		fetchAndCacheSurahWbw(surahNumber).then((dict) => {
			if (active && dict) setSurahWbwDict(dict);
		});
		return () => {
			active = false;
		};
	}, [surahNumber]);
	const wbwAyahWords = surahWbwDict?.[ayah.numberInSurah];
	const wordTokens = (0, import_react.useMemo)(() => tokenizeAyahWithTajweedAndMeanings({
		arabicUthmani: ayah.arabicUthmani,
		transliteration: ayah.transliteration,
		translations: ayah.translations,
		wbwAyahWords
	}), [
		ayah.arabicUthmani,
		ayah.transliteration,
		ayah.translations,
		wbwAyahWords
	]);
	import_react.useEffect(() => {
		setSelectedWordIdx(null);
	}, [surahNumber, ayah.numberInSurah]);
	const [scriptStyle, setScriptStyle] = useQuranScriptStyle();
	const audioState = useAudioManager();
	const playbackClock = useAudioPlaybackClock();
	const isThisAyahReciting = (audioState.status === "playing" || audioState.status === "loading") && audioState.quranSequence.surahNumber === surahNumber && audioState.quranSequence.currentAyah === ayah.numberInSurah;
	const liveWordIdx = (0, import_react.useMemo)(() => {
		if (!isThisAyahReciting || wordTokens.length === 0) return -1;
		return getActiveWordIndexAtProgress(wordTokens.map((t) => t.arabicWord), playbackClock.ratio);
	}, [
		isThisAyahReciting,
		wordTokens,
		playbackClock.ratio
	]);
	const liveSpokenWord = liveWordIdx >= 0 && wordTokens[liveWordIdx] ? wordTokens[liveWordIdx] : null;
	const scriptFontClass = getArabicScriptFontClass(scriptStyle);
	const activeWord = selectedWordIdx !== null && wordTokens[selectedWordIdx] ? wordTokens[selectedWordIdx] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-2 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							role: "group",
							"aria-label": "Quran Script Font",
							className: "inline-flex items-center p-0.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)]",
							children: [{
								id: "uthmani",
								label: "Madani"
							}, {
								id: "indopak",
								label: "IndoPak"
							}].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": scriptStyle === opt.id,
								onClick: () => setScriptStyle(opt.id),
								className: `px-2.5 py-1 rounded-full text-[11px] font-extrabold whitespace-nowrap transition ${scriptStyle === opt.id ? "bg-[#14532D] text-amber-300 shadow-2xs" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`,
								children: opt.label
							}, opt.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setTajweedColorsEnabled((v) => !v),
							className: `px-3 py-1.5 rounded-full text-[11px] font-extrabold border whitespace-nowrap inline-flex items-center gap-1 transition ${tajweedColorsEnabled ? "bg-[#14532D] text-amber-300 border-amber-400/50 shadow-2xs" : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
							children: [tajweedColorsEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3 shrink-0" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tajweedColorsEnabled ? "Tajweed: ON" : "Tajweed: OFF" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowTajweedLegend((v) => !v),
							className: `px-3 py-1.5 rounded-full text-[11px] font-extrabold border whitespace-nowrap transition ${showTajweedLegend ? "bg-amber-400 text-emerald-950 border-amber-500" : "bg-amber-50 dark:bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-400/35"}`,
							children: showTajweedLegend ? "Hide Guide" : "Tajweed Guide"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[11px] font-semibold text-[var(--text-secondary)] inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isThisAyahReciting && liveSpokenWord ? `Live Word ${liveSpokenWord.index + 1}/${wordTokens.length}: ${liveSpokenWord.transliteration} — ${getLocalizedWordMeaning(liveSpokenWord, user.language)}` : "Tap any Arabic word for meaning & Tajweed rule" })]
				})]
			}),
			showTajweedLegend && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `rounded-2xl border p-3 text-left space-y-2 ${darkMode ? "bg-[#092318] border-amber-400/30 text-white" : "bg-white/95 border-amber-300 text-slate-900"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-300",
					children: "Color-Coded Tajweed Guide"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-1.5",
					children: [
						"ghunnah",
						"qalqalah",
						"madd",
						"idgham_ikhfa",
						"tafkheem_allah"
					].map((ruleKey) => {
						const meta = TAJWEED_RULES_META[ruleKey];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2 rounded-xl p-2 bg-emerald-950/5 dark:bg-black/25",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-3.5 h-3.5 rounded-full shrink-0 mt-0.5 border border-black/15",
								style: { backgroundColor: meta.colorHex }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] leading-snug",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-extrabold",
									children: meta.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: darkMode ? "text-emerald-100/80" : "text-slate-600",
									children: meta.description[user.language] || meta.description.en
								})]
							})]
						}, meta.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				dir: "rtl",
				lang: "ar",
				className: `${scriptFontClass} ${fontScaleClass} font-bold tracking-normal text-center flex flex-wrap items-center justify-center gap-x-2 gap-y-2 px-1`,
				children: [wordTokens.map((token) => {
					const isSelected = selectedWordIdx === token.index;
					const isLiveWord = isThisAyahReciting && liveWordIdx === token.index;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-live-word": isLiveWord ? "true" : void 0,
						onClick: () => setSelectedWordIdx((prev) => prev === token.index ? null : token.index),
						className: `inline-block px-2 py-0.5 rounded-xl transition cursor-pointer select-none ${isLiveWord ? "ilmizo-word-live font-bold" : isSelected ? "ring-2 ring-[#D4AF37] bg-amber-400/25 scale-105 shadow-xs" : "hover:bg-amber-400/15"} ${darkMode ? "text-white" : "text-slate-900"}`,
						title: `${token.transliteration} — ${getLocalizedWordMeaning(token, user.language)} (${token.tajweedRule.shortLabel})`,
						children: tajweedColorsEnabled && token.segments?.length > 0 ? token.segments.map((seg, segIdx) => {
							const ruleMeta = TAJWEED_RULES_META[seg.ruleId];
							const segStyle = seg.ruleId !== "normal" ? { color: darkMode ? ruleMeta.darkColorHex : ruleMeta.colorHex } : void 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: segStyle,
								children: formatAyahTextForScript(seg.text, scriptStyle)
							}, segIdx);
						}) : formatAyahTextForScript(token.arabicWord, scriptStyle)
					}, `${ayah.numberInSurah}_${token.index}_${token.arabicWord}`);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#D4AF37] bg-amber-50 dark:bg-amber-500/20 text-xs font-sans text-amber-950 dark:text-amber-200 tabular-nums mx-1 shadow-2xs align-middle",
					children: ayah.numberInSurah
				})]
			}),
			activeWord && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border-2 border-[#D4AF37] p-3.5 text-left shadow-md space-y-2 transition-all bg-[var(--bg-surface)] text-[var(--text-primary)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-950 dark:text-amber-200 text-[11px] font-extrabold",
										children: [
											"Word ",
											activeWord.index + 1,
											" of ",
											wordTokens.length
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-2.5 py-0.5 rounded-full text-[11px] font-extrabold text-white",
										style: { backgroundColor: activeWord.tajweedRule.colorHex },
										children: ["Tajweed: ", activeWord.tajweedRule.shortLabel]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `px-2 py-0.5 rounded-full text-[11px] font-extrabold ${activeWord.isExactDictionaryMatch ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200" : "bg-[var(--bg-subtle)] text-[var(--text-secondary)]"}`,
										children: activeWord.isExactDictionaryMatch ? "✓ Exact WBW Dictionary" : "Offline WBW Pending"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-extrabold mt-1.5 text-[#14532D] dark:text-amber-300",
								children: [
									activeWord.transliteration,
									" —",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[var(--text-primary)]",
										children: getLocalizedWordMeaning(activeWord, user.language)
									})
								]
							}),
							user.language !== "hinglish" && activeWord.meanings.hinglish && activeWord.isExactDictionaryMatch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-[var(--text-secondary)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Hinglish:" }),
									" ",
									activeWord.meanings.hinglish
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-arabic text-3xl font-bold px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-emerald-950 dark:text-amber-200 border border-amber-200 dark:border-amber-500/35",
								children: activeWord.arabicWord
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl p-2.5 text-[11px] space-y-1 bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									style: { color: activeWord.tajweedRule.colorHex },
									children: [activeWord.tajweedRule.label, ":"]
								}),
								" ",
								activeWord.tajweedRule.description[user.language] || activeWord.tajweedRule.description.en
							] }),
							activeWord.segments?.some((s) => s.ruleNote) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-amber-700 dark:text-amber-300 font-semibold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Letter-Cluster Rules:" }),
									" ",
									activeWord.segments.filter((s) => s.ruleNote).map((s) => `${s.text} (${s.ruleNote})`).join(" · ")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] opacity-80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Corpus / Grammar:" }),
									" ",
									activeWord.grammarHint
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [activeWord.wordAudioUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									audioManager.playAudioUrl({
										id: `wbw_${surahNumber}_${ayah.numberInSurah}_${activeWord.index}`,
										url: activeWord.wordAudioUrl,
										fallbackText: activeWord.arabicWord,
										fallbackLang: "ar-SA",
										allowTtsFallback: true,
										rate: user.playbackRate || 1
									});
								},
								className: "px-3 py-1.5 rounded-xl bg-amber-400 text-emerald-950 text-[11px] font-extrabold inline-flex items-center gap-1.5 shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Play Word Audio" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									if (onPlayAyahAudio) onPlayAyahAudio();
									else audioManager.playQariRecitationAyah({
										id: `word_ayah_${surahNumber}_${ayah.numberInSurah}`,
										surahNumber,
										ayahNumberInSurah: ayah.numberInSurah,
										globalAyahNumber: ayah.globalNumber,
										reciterName: user.reciterName,
										rate: user.playbackRate || 1
									});
								},
								className: "px-3 py-1.5 rounded-xl bg-[#14532D] text-white text-[11px] font-extrabold inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Listen to Qari Recite Ayah" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSelectedWordIdx(null),
							className: "px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:text-emerald-200",
							children: "Close Tooltip ✕"
						})]
					})
				]
			})
		]
	});
};
var NativeApkAndAzanNotificationStudio = ({ prayerTimes24h = {
	Fajr: "05:15",
	Dhuhr: "12:30",
	Asr: "15:45",
	Maghrib: "18:15",
	Isha: "19:45"
}, city = "Jamshedpur", hijriDate = "1448 AH", onTriggerToast }) => {
	const [prefs, setPrefs] = (0, import_react.useState)(() => loadAzanNotificationPrefs());
	const [widgetSize, setWidgetSize] = (0, import_react.useState)("medium");
	const [countdownBarOn, setCountdownBarOn] = (0, import_react.useState)(() => isPersistentPrayerCountdownEnabled());
	(0, import_react.useMemo)(() => getCapacitorRuntimeStatus(), []);
	const widgetCapability = (0, import_react.useMemo)(() => getPrayerWidgetPlatformCapability(), []);
	const nextPrayerPreview = (0, import_react.useMemo)(() => resolveNextPrayerForWidget(prayerTimes24h), [prayerTimes24h]);
	const handleUpdatePrefs = (next) => {
		setPrefs(next);
		saveAzanNotificationPrefs(next);
	};
	const handleTogglePrayerAlert = (prayer) => {
		const current = prefs.prayers[prayer];
		const next = {
			...prefs,
			prayers: {
				...prefs.prayers,
				[prayer]: {
					...current,
					enabled: !current.enabled
				}
			}
		};
		handleUpdatePrefs(next);
	};
	const handleChangeVoice = (voice) => {
		const next = {
			...prefs,
			defaultAdhanVoice: voice,
			prayers: {
				Fajr: {
					...prefs.prayers.Fajr,
					soundMode: voice === "makkah_haram" ? "madinah_fajr" : voice
				},
				Dhuhr: {
					...prefs.prayers.Dhuhr,
					soundMode: voice
				},
				Asr: {
					...prefs.prayers.Asr,
					soundMode: voice
				},
				Maghrib: {
					...prefs.prayers.Maghrib,
					soundMode: voice
				},
				Isha: {
					...prefs.prayers.Isha,
					soundMode: voice
				}
			}
		};
		handleUpdatePrefs(next);
		onTriggerToast(`Default Azan Voice set to ${voice}`);
	};
	const handleSaveAndScheduleAzan = async () => {
		const res = await scheduleDailyAzanNotifications({
			prayerTimes24h,
			prefs
		});
		await syncNativePrayerWidget({
			city,
			hijriDate,
			prayerTimes: prayerTimes24h,
			persistentCountdownEnabled: countdownBarOn
		});
		onTriggerToast(res.message);
	};
	const handlePinWidget = async () => {
		await syncNativePrayerWidget({
			city,
			hijriDate,
			prayerTimes: prayerTimes24h,
			persistentCountdownEnabled: countdownBarOn
		});
		onTriggerToast((await requestPinNativePrayerWidget(widgetSize)).message);
	};
	const handleTogglePersistentCountdown = async () => {
		const next = !countdownBarOn;
		setCountdownBarOn(next);
		await setPersistentPrayerCountdownEnabled(next);
		await syncNativePrayerWidget({
			city,
			hijriDate,
			prayerTimes: prayerTimes24h,
			persistentCountdownEnabled: next
		});
		onTriggerToast(next ? "Lock-screen & notification bar live Salah countdown enabled." : "Persistent Salah countdown notification turned off.");
	};
	const enabledAlertsCount = [
		"Fajr",
		"Dhuhr",
		"Asr",
		"Maghrib",
		"Isha"
	].filter((p) => prefs.prayers[p].enabled).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-[var(--bg-surface)] p-4 border border-[var(--border-subtle)] shadow-2xs space-y-4 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-amber-300 flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-extrabold text-[var(--text-primary)] truncate",
							children: "Exact Adhan Alarms & Home-Screen Widget"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-secondary)]",
							children: "Doze-safe exact Salah alerts, live widget & lock-screen countdown"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums shrink-0",
					children: [enabledAlertsCount, "/5 On"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-[var(--text-secondary)]",
							children: "Adhan Sound"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
							title: "Choose Adhan Sound",
							subtitle: "Used for daily exact background prayer alarms",
							ariaLabel: "Select Adhan Voice",
							variant: "compact",
							value: prefs.defaultAdhanVoice,
							onChange: (val) => handleChangeVoice(val),
							options: [
								{
									value: "makkah_haram",
									label: "Makkah Al-Haram Adhan",
									subtitle: "Authentic human recording"
								},
								{
									value: "alafasy_adhan",
									label: "Sheikh Mishary Alafasy",
									subtitle: "Authentic human recording"
								},
								{
									value: "madinah_fajr",
									label: "Madinah Fajr Style",
									subtitle: "Authentic human recording"
								},
								{
									value: "silent_visual",
									label: "Silent Visual Notification",
									subtitle: "No sound"
								}
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-5 gap-1.5",
						children: [
							"Fajr",
							"Dhuhr",
							"Asr",
							"Maghrib",
							"Isha"
						].map((pName) => {
							const pCfg = prefs.prayers[pName];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": pCfg.enabled,
								onClick: () => handleTogglePrayerAlert(pName),
								className: `min-h-[60px] rounded-xl py-2 px-1 text-center border transition flex flex-col items-center justify-center gap-0.5 ${pCfg.enabled ? "bg-[#14532D] text-white border-[#14532D] dark:border-emerald-400 shadow-2xs" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-extrabold",
										children: pName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] opacity-85 tabular-nums",
										children: prayerTimes24h[pName] || "--:--"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[11px] font-bold ${pCfg.enabled ? "text-amber-300" : "text-[var(--text-muted)]"}`,
										children: pCfg.enabled ? "On" : "Off"
									})
								]
							}, pName);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 pt-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => playHumanAdhanPreview(prefs.defaultAdhanVoice, (msg) => onTriggerToast(msg)),
							className: "flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-2xs transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preview Adhan" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleSaveAndScheduleAzan,
							className: "flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold shadow-2xs transition",
							children: "Schedule Exact Alarms"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold text-[var(--text-primary)]",
							children: "Home-Screen Salah Widget"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-[var(--text-secondary)]",
							children: [
								"Live preview synced with ",
								city,
								" · ",
								hijriDate
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex items-center rounded-xl bg-[var(--bg-surface)] p-0.5 border border-[var(--border-subtle)]",
							children: [{
								id: "small",
								label: "2×1 Compact"
							}, {
								id: "medium",
								label: "4×2 Full"
							}].map((sz) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": widgetSize === sz.id,
								onClick: () => setWidgetSize(sz.id),
								className: `min-h-[34px] px-2.5 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition ${widgetSize === sz.id ? "bg-[#14532D] text-amber-300" : "text-[var(--text-secondary)]"}`,
								children: sz.label
							}, sz.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"aria-label": "Android Home-Screen Salah Widget Preview",
						className: "rounded-2xl bg-gradient-to-br from-[#0F3826] via-[#14532D] to-[#0B2A1C] text-white p-3.5 border border-amber-400/35 shadow-sm space-y-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] font-semibold text-emerald-200/85 truncate",
									children: ["Ilmizo · ", city]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-extrabold text-white",
									children: ["Next: ", nextPrayerPreview.name]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg font-extrabold text-amber-300 tabular-nums leading-tight",
									children: nextPrayerPreview.time
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-emerald-200/80",
									children: hijriDate
								})]
							})]
						}), widgetSize === "medium" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-5 gap-1 pt-2 border-t border-white/10 text-center",
							children: [
								"Fajr",
								"Dhuhr",
								"Asr",
								"Maghrib",
								"Isha"
							].map((p) => {
								const isNext = nextPrayerPreview.name === p;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `rounded-lg py-1 px-0.5 ${isNext ? "bg-amber-400/20 text-amber-200" : "text-emerald-100/80"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-bold",
										children: p
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-extrabold tabular-nums",
										children: (prayerTimes24h[p] || "--:--").replace(/\s*(AM|PM)/i, "")
									})]
								}, p);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handlePinWidget,
							className: "flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold transition",
							children: "Add Widget to Home Screen"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "switch",
							"aria-checked": countdownBarOn,
							onClick: handleTogglePersistentCountdown,
							className: `min-h-[44px] px-3 py-2 rounded-xl border text-xs font-extrabold transition whitespace-nowrap ${countdownBarOn ? "bg-amber-400 text-emerald-950 border-amber-500" : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)]"}`,
							children: countdownBarOn ? "Countdown Bar: On" : "Countdown Bar: Off"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-[var(--text-muted)] leading-snug",
						children: widgetCapability.honestStatusNote
					})
				]
			})
		]
	});
};
// src/services/storyVoiceRecorder.ts
var DB_NAME = "ilmizo_story_voices_db";
var DB_VERSION = 1;
var STORE_NAME = "recordings";
function openVoiceDb() {
	return new Promise((resolve, reject) => {
		if (typeof indexedDB === "undefined") {
			reject(/* @__PURE__ */ new Error("IndexedDB unavailable"));
			return;
		}
		const req = indexedDB.open(DB_NAME, DB_VERSION);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: "key" });
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error || /* @__PURE__ */ new Error("Failed to open voice database"));
	});
}
function buildStoryVoiceKey(storyId, pageIndex) {
	return `${storyId}:${pageIndex}`;
}
async function saveStoryVoiceRecording(record) {
	try {
		const db = await openVoiceDb();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE_NAME, "readwrite");
			tx.objectStore(STORE_NAME).put(record);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
		db.close();
		return { ok: true };
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Unable to save family voice recording."
		};
	}
}
async function getStoryVoiceRecording(storyId, pageIndex) {
	try {
		const db = await openVoiceDb();
		const key = buildStoryVoiceKey(storyId, pageIndex);
		const result = await new Promise((resolve, reject) => {
			const req = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get(key);
			req.onsuccess = () => resolve(req.result || null);
			req.onerror = () => reject(req.error);
		});
		db.close();
		return result;
	} catch {
		return null;
	}
}
async function deleteStoryVoiceRecording(storyId, pageIndex) {
	try {
		const db = await openVoiceDb();
		const key = buildStoryVoiceKey(storyId, pageIndex);
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE_NAME, "readwrite");
			tx.objectStore(STORE_NAME).delete(key);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
		db.close();
		return true;
	} catch {
		return false;
	}
}
function isVoiceRecorderSupported() {
	return typeof window !== "undefined" && typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia) && typeof MediaRecorder !== "undefined";
}
function pickSupportedAudioMimeType() {
	if (typeof MediaRecorder === "undefined") return "audio/webm";
	for (const type of [
		"audio/webm;codecs=opus",
		"audio/webm",
		"audio/mp4",
		"audio/ogg;codecs=opus"
	]) if (typeof MediaRecorder.isTypeSupported === "function" && MediaRecorder.isTypeSupported(type)) return type;
	return "";
}
export { syncNativePrayerWidget as C, setPersistentPrayerCountdownEnabled as S, KIDS_ROUTE_ORDER as _, saveStoryVoiceRecording as a, getPrayerWidgetPlatformCapability as b, QuranAdvancedAudioPlayerBar as c, WordByWordHifzRevealPanel as d, formatAyahTextForScript as f, ADULT_ROUTE_ORDER as g, useQuranScriptStyle as h, pickSupportedAudioMimeType as i, QuranJournalScreen as l, getArabicScriptFontClass as m, getStoryVoiceRecording as n, InteractiveTajweedAyahView as o, getActiveWordIndexAtProgress as p, isVoiceRecorderSupported as r, NativeApkAndAzanNotificationStudio as s, deleteStoryVoiceRecording as t, SalahCompleteGuideAndExcusedPanel as u, useSwipeNavigation as v, isPersistentPrayerCountdownEnabled as x, useQuranAudioSync as y };
