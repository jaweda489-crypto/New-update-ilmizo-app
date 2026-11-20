import { p as EXPANDED_KIDS_STORIES } from "./data-islamic-content-DVwdNHPG.js";
import { g as loadLocalOnboardingProfile, h as inferAgeBandFromAge, m as evaluateMissedDayKindness } from "./index-Dy1fifCC.js";
import { n as NOORANI_QAIDA_COURSE_LESSONS } from "./nooraniQaidaCourse-DdAqOF7e.js";
// src/services/qaidaTracingStore.ts
var QAIDA_MASTERY_STORE_KEY = "ilmizo_qaida_local_mastery_v1";
function readAllMasteryMap() {
	if (typeof localStorage === "undefined") return {};
	try {
		const raw = localStorage.getItem(QAIDA_MASTERY_STORE_KEY);
		if (!raw) return {};
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" ? parsed : {};
	} catch {
		return {};
	}
}
function writeAllMasteryMap(map) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(QAIDA_MASTERY_STORE_KEY, JSON.stringify(map));
	} catch {}
}
function loadChildQaidaMastery(childId) {
	const entry = readAllMasteryMap()[childId];
	if (!entry) return {
		tracingByLetterId: {},
		mistakes: []
	};
	return {
		tracingByLetterId: entry.tracingByLetterId || {},
		mistakes: Array.isArray(entry.mistakes) ? entry.mistakes : []
	};
}
function saveChildLetterTracingProgress(params) {
	const all = readAllMasteryMap();
	const current = all[params.childId] || {
		tracingByLetterId: {},
		mistakes: []
	};
	const existing = current.tracingByLetterId[params.letterId];
	current.tracingByLetterId[params.letterId] = {
		letterId: params.letterId,
		letterArabic: params.letterArabic,
		letterName: params.letterName,
		tracedCount: (existing?.tracedCount || 0) + 1,
		bestCoveragePercent: Math.max(existing?.bestCoveragePercent || 0, params.coveragePercent),
		lastTracedIso: (/* @__PURE__ */ new Date()).toISOString()
	};
	all[params.childId] = current;
	writeAllMasteryMap(all);
	return current;
}
function recordChildQaidaMistake(params) {
	const all = readAllMasteryMap();
	const current = all[params.childId] || {
		tracingByLetterId: {},
		mistakes: []
	};
	const mistakeId = `${params.lessonId}::${params.arabicText}`;
	const existingIdx = current.mistakes.findIndex((m) => m.id === mistakeId);
	if (existingIdx >= 0) {
		const prev = current.mistakes[existingIdx];
		current.mistakes[existingIdx] = {
			...prev,
			missCount: prev.missCount + 1,
			lastMissedIso: (/* @__PURE__ */ new Date()).toISOString(),
			resolved: false
		};
	} else current.mistakes.unshift({
		id: mistakeId,
		lessonId: params.lessonId,
		lessonNumber: params.lessonNumber,
		arabicText: params.arabicText,
		label: params.label,
		missCount: 1,
		lastMissedIso: (/* @__PURE__ */ new Date()).toISOString(),
		resolved: false
	});
	current.mistakes = current.mistakes.slice(0, 24);
	all[params.childId] = current;
	writeAllMasteryMap(all);
	return current;
}
function markChildQaidaMistakeResolved(childId, mistakeId) {
	const all = readAllMasteryMap();
	const current = all[childId] || {
		tracingByLetterId: {},
		mistakes: []
	};
	current.mistakes = current.mistakes.map((m) => m.id === mistakeId ? {
		...m,
		resolved: true
	} : m);
	all[childId] = current;
	writeAllMasteryMap(all);
	return current;
}
function getActiveQaidaRevisionRecommendations(childId, limit = 4) {
	return loadChildQaidaMastery(childId).mistakes.filter((m) => !m.resolved).sort((a, b) => b.missCount - a.missCount).slice(0, limit);
}
/**
* Provides clear RTL calligraphy start & end anchor guidance for Arabic letters
* so young learners learn proper top-to-bottom / right-to-left writing direction.
*/
function getArabicLetterStrokeGuide(letterArabic) {
	const verticalTopDown = /* @__PURE__ */ new Set([
		"ا",
		"ل",
		"ط",
		"ظ",
		"ك"
	]);
	const rightBowls = /* @__PURE__ */ new Set([
		"ب",
		"ت",
		"ث",
		"ن",
		"ف",
		"ق",
		"س",
		"ش",
		"ص",
		"ض",
		"ي"
	]);
	const archRightToLeft = /* @__PURE__ */ new Set([
		"ج",
		"ح",
		"خ",
		"ع",
		"غ"
	]);
	const curvedDescenders = /* @__PURE__ */ new Set([
		"د",
		"ذ",
		"ر",
		"ز",
		"و",
		"م",
		"ه"
	]);
	if (verticalTopDown.has(letterArabic)) return {
		startX: .52,
		startY: .24,
		endX: .48,
		endY: .72,
		directionHint: "Start at the top dot and glide straight down"
	};
	if (rightBowls.has(letterArabic)) return {
		startX: .66,
		startY: .46,
		endX: .34,
		endY: .52,
		directionHint: "Start on the right dot and sweep smoothly to the left"
	};
	if (archRightToLeft.has(letterArabic)) return {
		startX: .58,
		startY: .34,
		endX: .44,
		endY: .72,
		directionHint: "Trace the top crest right-to-left, then curve gently down"
	};
	if (curvedDescenders.has(letterArabic)) return {
		startX: .58,
		startY: .38,
		endX: .38,
		endY: .68,
		directionHint: "Start upper-right and curve smoothly down toward the left"
	};
	return {
		startX: .62,
		startY: .4,
		endX: .38,
		endY: .62,
		directionHint: "Start at the emerald dot (1) and trace smoothly right to left"
	};
}
// src/services/dailyTarbiyahPlanEngine.ts
/**
* Adaptive Daily 10-Minute Guided Tarbiyah Plan (3 focused blocks):
* - Adapts minutes & pacing to Child age band (4-6: 8m, 7-9: 10m, 10-12: 12m)
* - Surfaces mistake-driven Qaida revision automatically when quiz misses exist
* - Respects Pause/Resume and Missed-Day Kindness (zero harsh streak punishment)
*/
function buildDailyTarbiyahPlan(params) {
	const { child, language, dateKey, hasFamilyPlus } = params;
	const isHinglish = language === "hinglish" || language === "hi";
	const onboarding = loadLocalOnboardingProfile();
	const ageBand = inferAgeBandFromAge(child.age || 8);
	const focus = onboarding.childFocus || "balanced";
	const mistakeRevisions = getActiveQaidaRevisionRecommendations(child.id, 3);
	const kindnessState = evaluateMissedDayKindness({
		lastActiveDateKey: onboarding.lastActiveDateKey,
		todayDateKey: dateKey,
		planPaused: onboarding.planPaused,
		child
	});
	const completedQaidaIds = new Set(child.completedQaidaLessonIds || []);
	const nextQaidaLesson = NOORANI_QAIDA_COURSE_LESSONS.find((l) => !completedQaidaIds.has(l.id)) || NOORANI_QAIDA_COURSE_LESSONS[0];
	const completedStoryIds = new Set(child.completedStoryIds || []);
	const unlockedStories = EXPANDED_KIDS_STORIES.filter((_, idx) => hasFamilyPlus ? true : idx < 6);
	const nextStory = unlockedStories.find((s) => !completedStoryIds.has(s.id)) || unlockedStories[0];
	const qaidaDone = Boolean(child.questStepsCompleted?.quran);
	const storyOrDuaDone = Boolean(child.questStepsCompleted?.dua) || Boolean(nextStory && completedStoryIds.has(nextStory.id) && completedStoryIds.size > 0);
	const quizDeedDone = Boolean(child.questStepsCompleted?.quiz) || Boolean(child.questStepsCompleted?.family);
	const qaidaMin = ageBand === "4-6" ? 2 : ageBand === "10-12" ? 4 : 3;
	const storyMin = ageBand === "4-6" ? 4 : ageBand === "10-12" ? 4 : 4;
	const quizMin = ageBand === "4-6" ? 2 : ageBand === "10-12" ? 4 : 3;
	const qaidaSubtitle = mistakeRevisions.length > 0 ? `Review ${mistakeRevisions.map((m) => m.arabicText).join(" · ")} + ${nextQaidaLesson.title.en}` : nextQaidaLesson.title.en;
	const steps = [
		{
			id: "qaida",
			stepNumber: 1,
			minutes: qaidaMin,
			title: mistakeRevisions.length > 0 ? isHinglish ? `Qaida Revision (${mistakeRevisions.length} harf)` : `Qaida Gentle Review (${mistakeRevisions.length} to practice)` : isHinglish ? `Qaida Lesson ${nextQaidaLesson.lessonNumber} · Trace & Suno` : `Qaida Lesson ${nextQaidaLesson.lessonNumber} · Trace & Listen`,
			subtitle: qaidaSubtitle,
			completed: qaidaDone,
			targetRoute: "quran_learning",
			recommendedItemId: nextQaidaLesson.id
		},
		{
			id: "story",
			stepNumber: 2,
			minutes: storyMin,
			title: focus === "daily_duas" ? "Sunnah Story & Dua Time" : isHinglish ? "Interactive Storybook" : "Interactive Storybook",
			subtitle: nextStory?.localizedTitles?.[language] || nextStory?.title || "Prophet Nuh (AS)",
			completed: storyOrDuaDone,
			targetRoute: "stories",
			recommendedItemId: nextStory?.id
		},
		{
			id: "quiz_deed",
			stepNumber: 3,
			minutes: quizMin,
			title: isHinglish ? "Quick Quiz + Aaj Ka Nek Amal" : "Quick Quiz & Good Deed",
			subtitle: isHinglish ? "2-min Deen quiz aur 1 Sunnah good deed log karo" : "Answer today’s mini quiz or log 1 Sunnah good deed",
			completed: quizDeedDone,
			targetRoute: child.questStepsCompleted?.quiz ? "good_deed" : "daily_quiz"
		}
	];
	const completedCount = steps.filter((s) => s.completed).length;
	const totalMinutes = steps.reduce((sum, s) => sum + s.minutes, 0);
	const remainingMinutes = steps.filter((s) => !s.completed).reduce((sum, s) => sum + s.minutes, 0);
	return {
		childName: child.name,
		ageBand,
		focus,
		dateKey,
		totalMinutes,
		completedCount,
		remainingMinutes,
		isComplete: completedCount === steps.length,
		isPaused: onboarding.planPaused,
		kindnessState,
		mistakeRevisions,
		steps
	};
}
function buildWeeklyTarbiyahReport(child) {
	const qaidaCompletedCount = (child.completedQaidaLessonIds || []).length;
	const qaidaTotalCount = NOORANI_QAIDA_COURSE_LESSONS.length;
	const storiesCompletedCount = (child.completedStoryIds || []).length;
	const storiesTotalCount = EXPANDED_KIDS_STORIES.length;
	const duasMasteredCount = Math.max(0, child.pillarProgress?.duasPracticed || 0);
	const goodDeedsCount = (child.goodDeeds || []).length;
	const streakDays = Math.max(0, child.streakDays || 0);
	const starsEarned = Math.max(0, child.stars || 0);
	const hasActivityThisWeek = qaidaCompletedCount > 0 || storiesCompletedCount > 0 || duasMasteredCount > 0 || goodDeedsCount > 0 || starsEarned > 0;
	const weeklyMinutesEstimate = hasActivityThisWeek ? Math.max(10, Math.min(7, Math.max(1, streakDays)) * 10 + qaidaCompletedCount * 5) : 0;
	const headline = hasActivityThisWeek ? `MashaAllah! ${child.name} completed ${qaidaCompletedCount}/${qaidaTotalCount} Qaida lessons & ${storiesCompletedCount} stories` : `${child.name} hasn’t logged learning activity yet — complete 1 lesson to unlock your shareable card`;
	const whatsappShareText = [
		`🌙 *Ilmizo Weekly Tarbiyah Summary — ${child.name}*`,
		`━━━━━━━━━━━━━━━━━━`,
		`📖 Noorani Qaida: ${qaidaCompletedCount} / ${qaidaTotalCount} lessons`,
		`📚 Interactive Stories: ${storiesCompletedCount} / ${storiesTotalCount} read`,
		`🤲 Duas Practiced: ${duasMasteredCount}`,
		`💛 Sunnah Good Deeds: ${goodDeedsCount}`,
		`⭐ Stars Earned: ${starsEarned} · ${streakDays} active day(s)`,
		`━━━━━━━━━━━━━━━━━━`,
		`Shared voluntarily by parents from Ilmizo — Ad-Free, Offline-First Islamic Learning.`
	].join("\n");
	return {
		childName: child.name,
		streakDays,
		starsEarned,
		qaidaCompletedCount,
		qaidaTotalCount,
		storiesCompletedCount,
		storiesTotalCount,
		duasMasteredCount,
		goodDeedsCount,
		weeklyMinutesEstimate,
		hasActivityThisWeek,
		headline,
		whatsappShareText
	};
}
function escapeXml(raw) {
	return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
/**
* Generates a clean, privacy-safe self-contained SVG Weekly Progress Card
* (first name / nickname only, zero location/email/device IDs, 100% offline).
*/
function generateWeeklyProgressCardSvg(report) {
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="540" viewBox="0 0 900 540">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0F3826"/>
      <stop offset="100%" stop-color="#14532D"/>
    </linearGradient>
  </defs>
  <rect width="900" height="540" rx="32" fill="url(#bg)"/>
  <rect x="24" y="24" width="852" height="492" rx="24" fill="none" stroke="#F59E0B" stroke-opacity="0.45" stroke-width="2"/>
  <text x="56" y="78" fill="#FCD34D" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" letter-spacing="2">ILMIZO FAMILY TARBIYAH · WEEKLY SUMMARY</text>
  <text x="56" y="132" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800">MashaAllah, ${escapeXml(report.childName)}!</text>
  <text x="56" y="168" fill="#D1FAE5" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="600">${escapeXml(report.headline)}</text>

  <g transform="translate(56, 210)">
    <rect width="184" height="136" rx="20" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="20" y="54" fill="#FCD34D" font-family="system-ui, sans-serif" font-size="36" font-weight="800">${report.qaidaCompletedCount}/${report.qaidaTotalCount}</text>
    <text x="20" y="90" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="700">Noorani Qaida</text>
    <text x="20" y="114" fill="#A7F3D0" font-family="system-ui, sans-serif" font-size="13">Lessons Mastered</text>
  </g>

  <g transform="translate(258, 210)">
    <rect width="184" height="136" rx="20" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="20" y="54" fill="#FCD34D" font-family="system-ui, sans-serif" font-size="36" font-weight="800">${report.storiesCompletedCount}/${report.storiesTotalCount}</text>
    <text x="20" y="90" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="700">Storybooks</text>
    <text x="20" y="114" fill="#A7F3D0" font-family="system-ui, sans-serif" font-size="13">Stories Finished</text>
  </g>

  <g transform="translate(460, 210)">
    <rect width="184" height="136" rx="20" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="20" y="54" fill="#FCD34D" font-family="system-ui, sans-serif" font-size="36" font-weight="800">${report.duasMasteredCount}</text>
    <text x="20" y="90" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="700">Sunnah Duas</text>
    <text x="20" y="114" fill="#A7F3D0" font-family="system-ui, sans-serif" font-size="13">&amp; ${report.goodDeedsCount} Good Deeds</text>
  </g>

  <g transform="translate(662, 210)">
    <rect width="182" height="136" rx="20" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="20" y="54" fill="#FCD34D" font-family="system-ui, sans-serif" font-size="36" font-weight="800">${report.starsEarned} ★</text>
    <text x="20" y="90" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="700">${report.streakDays} Active Day(s)</text>
    <text x="20" y="114" fill="#A7F3D0" font-family="system-ui, sans-serif" font-size="13">~${report.weeklyMinutesEstimate} min learned</text>
  </g>

  <rect x="56" y="392" width="788" height="84" rx="20" fill="#FDFBF7"/>
  <text x="84" y="429" fill="#14532D" font-family="system-ui, sans-serif" font-size="18" font-weight="800">Ad-Free, Offline-First Islamic Learning for the Whole Family</text>
  <text x="84" y="456" fill="#475569" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Generated privately on-device · No child tracking · No ads</text>
</svg>`;
}
export { getArabicLetterStrokeGuide as a, recordChildQaidaMistake as c, getActiveQaidaRevisionRecommendations as i, saveChildLetterTracingProgress as l, buildWeeklyTarbiyahReport as n, loadChildQaidaMastery as o, generateWeeklyProgressCardSvg as r, markChildQaidaMistakeResolved as s, buildDailyTarbiyahPlan as t };
