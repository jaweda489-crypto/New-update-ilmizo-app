import { bt as audioManager } from "./index-Dy1fifCC.js";
// src/services/storyAudioPrefetchService.ts
var STUDIO_AUDIO_DB_NAME = "ilmizo_studio_audio_db";
var STORE_STORY_AUDIO = "story_audio";
var STORE_QAIDA_AUDIO = "qaida_audio";
var STORE_WBW_AUDIO = "wbw_audio";
function resolveApiEndpoint(apiPath) {
	return apiPath.startsWith("/") ? apiPath : `/${apiPath}`;
}
function buildStoryAudioCacheKey(storyId, pageIndex, language, voiceStyle) {
	return `story:${storyId}:p${pageIndex}:${language}:${voiceStyle}`;
}
function parseStoryAudioCacheKey(key) {
	const match = /^story:([^:]+):p(\d+):([^:]+):(storyteller|teacher)$/.exec(key);
	if (!match) return null;
	return {
		storyId: match[1],
		pageIndex: Number(match[2]),
		language: match[3],
		voiceStyle: match[4]
	};
}
function base64ToAudioBlob(base64, mimeType = "audio/wav") {
	const clean = base64.includes(",") ? base64.split(",")[1] : base64;
	const binary = atob(clean);
	const len = binary.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
	return new Blob([bytes], { type: mimeType });
}
function formatAudioCacheSizeMb(bytes) {
	if (!Number.isFinite(bytes) || bytes <= 0) return "0.0 MB";
	const mb = bytes / 1048576;
	if (mb < .1) return "<0.1 MB";
	return `${mb.toFixed(1)} MB`;
}
async function computeBytesSha256Hex(bytes) {
	try {
		if (typeof crypto !== "undefined" && crypto.subtle?.digest) {
			const digest = await crypto.subtle.digest("SHA-256", bytes.buffer);
			return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
		}
	} catch {}
	let h1 = 2166136261 ^ bytes.length;
	for (let i = 0; i < bytes.length; i++) h1 = Math.imul(h1 ^ bytes[i], 16777619);
	return `fnv_${(h1 >>> 0).toString(16).padStart(8, "0")}`;
}
/**
* Verifies downloaded or cached audio blobs are real non-empty audio containers (WAV/MP3/OGG/WebM/AAC)
* rather than truncated fragments, empty payloads, or disguised HTML/JSON error pages.
*/
async function verifyAudioBlobIntegrity(blob, expectedChecksum) {
	if (!blob || blob.size < 44) return {
		valid: false,
		reason: `Audio file is empty or truncated (${blob?.size ?? 0} bytes).`
	};
	let bytes;
	try {
		const ab = await blob.arrayBuffer();
		bytes = new Uint8Array(ab);
	} catch {
		return {
			valid: false,
			reason: "Unable to read audio bytes from storage."
		};
	}
	if (bytes.length < 44) return {
		valid: false,
		reason: "Audio payload shorter than valid media header."
	};
	const asciiHead = String.fromCharCode(...Array.from(bytes.slice(0, 32))).trimStart().toLowerCase();
	if (asciiHead.startsWith("<!doctype") || asciiHead.startsWith("<html") || asciiHead.startsWith("{\"ok\":false") || asciiHead.startsWith("{\"error\"")) return {
		valid: false,
		reason: "Corrupted payload: server HTML/JSON error saved instead of audio."
	};
	const isRiffWave = bytes[0] === 82 && bytes[1] === 73 && bytes[2] === 70 && bytes[3] === 70 && bytes[8] === 87 && bytes[9] === 65 && bytes[10] === 86 && bytes[11] === 69;
	const isId3 = bytes[0] === 73 && bytes[1] === 68 && bytes[2] === 51;
	const isMp3Sync = bytes[0] === 255 && (bytes[1] & 224) === 224;
	const isOgg = bytes[0] === 79 && bytes[1] === 103 && bytes[2] === 103 && bytes[3] === 83;
	const isFlac = bytes[0] === 102 && bytes[1] === 76 && bytes[2] === 97 && bytes[3] === 67;
	const isWebm = bytes[0] === 26 && bytes[1] === 69 && bytes[2] === 223 && bytes[3] === 163;
	const isMp4Audio = bytes[4] === 102 && bytes[5] === 116 && bytes[6] === 121 && bytes[7] === 112;
	if (!isRiffWave && !isId3 && !isMp3Sync && !isOgg && !isFlac && !isWebm && !isMp4Audio) return {
		valid: false,
		reason: "Unrecognized or corrupted audio container signature."
	};
	const checksumSha256 = await computeBytesSha256Hex(bytes);
	if (expectedChecksum && expectedChecksum !== checksumSha256) return {
		valid: false,
		reason: "Audio SHA-256 checksum mismatch (file corrupted on disk)."
	};
	return {
		valid: true,
		checksumSha256
	};
}
var persistentRequested = false;
async function requestPersistentAudioStorage() {
	if (persistentRequested) return true;
	persistentRequested = true;
	try {
		if (typeof navigator !== "undefined" && navigator.storage?.persist) return await navigator.storage.persist();
	} catch {}
	return false;
}
function openStudioAudioDatabase() {
	return new Promise((resolve, reject) => {
		if (typeof indexedDB === "undefined") {
			reject(/* @__PURE__ */ new Error("IndexedDB unavailable"));
			return;
		}
		const req = indexedDB.open(STUDIO_AUDIO_DB_NAME, 1);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains("story_audio")) db.createObjectStore(STORE_STORY_AUDIO, { keyPath: "key" });
			if (!db.objectStoreNames.contains("qaida_audio")) db.createObjectStore(STORE_QAIDA_AUDIO, { keyPath: "key" });
			if (!db.objectStoreNames.contains("wbw_audio")) db.createObjectStore(STORE_WBW_AUDIO, { keyPath: "key" });
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error || /* @__PURE__ */ new Error("Failed to open studio audio DB"));
	});
}
async function getCachedStoryAudioRecord(key) {
	try {
		const db = await openStudioAudioDatabase();
		const rec = await new Promise((resolve, reject) => {
			const req = db.transaction(STORE_STORY_AUDIO, "readonly").objectStore(STORE_STORY_AUDIO).get(key);
			req.onsuccess = () => resolve(req.result || null);
			req.onerror = () => reject(req.error);
		});
		db.close();
		if (!rec?.blob) return null;
		if (!(await verifyAudioBlobIntegrity(rec.blob, rec.checksumSha256)).valid) {
			await deleteStoryAudioFromCache(key);
			return null;
		}
		return rec;
	} catch {
		return null;
	}
}
async function putCachedStoryAudioRecord(key, blob) {
	try {
		const integrity = await verifyAudioBlobIntegrity(blob);
		if (!integrity.valid) return false;
		const db = await openStudioAudioDatabase();
		const record = {
			key,
			mimeType: blob.type || "audio/wav",
			blob,
			savedAtIso: (/* @__PURE__ */ new Date()).toISOString(),
			bytes: blob.size,
			checksumSha256: integrity.checksumSha256,
			contentVersion: "v1"
		};
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE_STORY_AUDIO, "readwrite");
			tx.objectStore(STORE_STORY_AUDIO).put(record);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
			tx.onabort = () => reject(tx.error || /* @__PURE__ */ new Error("Audio cache write aborted"));
		});
		db.close();
		return true;
	} catch {
		return false;
	}
}
async function deleteStoryAudioFromCache(key) {
	try {
		const db = await openStudioAudioDatabase();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE_STORY_AUDIO, "readwrite");
			tx.objectStore(STORE_STORY_AUDIO).delete(key);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
		db.close();
	} catch {}
}
async function clearAllCachedStoryAudio() {
	try {
		const db = await openStudioAudioDatabase();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE_STORY_AUDIO, "readwrite");
			tx.objectStore(STORE_STORY_AUDIO).clear();
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
		db.close();
	} catch {}
}
async function listAllCachedStoryAudioMetadata() {
	try {
		const db = await openStudioAudioDatabase();
		const items = await new Promise((resolve, reject) => {
			const result = [];
			const req = db.transaction(STORE_STORY_AUDIO, "readonly").objectStore(STORE_STORY_AUDIO).openCursor();
			req.onsuccess = () => {
				const cursor = req.result;
				if (!cursor) {
					resolve(result);
					return;
				}
				const rec = cursor.value;
				const parsed = parseStoryAudioCacheKey(String(rec?.key || ""));
				if (parsed && rec?.blob && rec.blob.size >= 44) result.push({
					key: rec.key,
					storyId: parsed.storyId,
					pageIndex: parsed.pageIndex,
					language: parsed.language,
					voiceStyle: parsed.voiceStyle,
					bytes: Number(rec.bytes) || rec.blob.size,
					savedAtIso: rec.savedAtIso || "",
					checksumSha256: rec.checksumSha256,
					contentVersion: rec.contentVersion || "v1"
				});
				cursor.continue();
			};
			req.onerror = () => reject(req.error);
		});
		db.close();
		return items;
	} catch {
		return [];
	}
}
async function getStoryLibraryCacheSummary(params) {
	const metadata = await listAllCachedStoryAudioMetadata();
	const cachedByExactKey = /* @__PURE__ */ new Map();
	let totalBytes = 0;
	for (const item of metadata) {
		totalBytes += item.bytes;
		if (item.language === params.language && item.voiceStyle === params.voiceStyle) cachedByExactKey.set(item.key, item.bytes);
	}
	let totalPages = 0;
	let cachedPagesCount = 0;
	let cachedStoriesCount = 0;
	let partiallyCachedStoriesCount = 0;
	const storyStatusMap = {};
	for (const story of params.stories) {
		const pageCount = (story.localizedPages?.[params.language] || story.pages).length;
		let storyCachedPages = 0;
		for (let idx = 0; idx < pageCount; idx++) {
			totalPages += 1;
			const key = buildStoryAudioCacheKey(story.id, idx, params.language, params.voiceStyle);
			if (cachedByExactKey.has(key)) {
				cachedPagesCount += 1;
				storyCachedPages += 1;
			}
		}
		const isFullyCached = pageCount > 0 && storyCachedPages >= pageCount;
		if (isFullyCached) cachedStoriesCount += 1;
		else if (storyCachedPages > 0) partiallyCachedStoriesCount += 1;
		storyStatusMap[story.id] = {
			cachedPages: storyCachedPages,
			totalPages: pageCount,
			isFullyCached
		};
	}
	return {
		totalStories: params.stories.length,
		totalPages,
		cachedStoriesCount,
		partiallyCachedStoriesCount,
		cachedPagesCount,
		totalBytes,
		storyStatusMap
	};
}
function sleepWithAbort(ms, signal) {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) {
			reject(Object.assign(/* @__PURE__ */ new Error("Aborted"), { name: "AbortError" }));
			return;
		}
		const timer = setTimeout(() => {
			signal?.removeEventListener("abort", onAbort);
			resolve();
		}, ms);
		const onAbort = () => {
			clearTimeout(timer);
			reject(Object.assign(/* @__PURE__ */ new Error("Aborted"), { name: "AbortError" }));
		};
		signal?.addEventListener("abort", onAbort, { once: true });
	});
}
/**
* Resolves human-voice WAV audio for a story page strictly via IndexedDB + /api/ai/story-audio.
* NEVER triggers or falls back to window.speechSynthesis TTS.
*/
async function resolveStoryPageHumanAudio(params) {
	const primaryKey = buildStoryAudioCacheKey(params.storyId, params.pageIndex, params.language, params.voiceStyle);
	const cachedPrimary = await getCachedStoryAudioRecord(primaryKey);
	if (cachedPrimary?.blob && cachedPrimary.blob.size > 0) return {
		ok: true,
		blobUrl: params.skipBlobUrl ? void 0 : URL.createObjectURL(cachedPrimary.blob),
		fromCache: true,
		voiceStyleUsed: params.voiceStyle
	};
	const alternatePersona = params.voiceStyle === "storyteller" ? "teacher" : "storyteller";
	const cachedAlternate = await getCachedStoryAudioRecord(buildStoryAudioCacheKey(params.storyId, params.pageIndex, params.language, alternatePersona));
	if (cachedAlternate?.blob && cachedAlternate.blob.size > 0) return {
		ok: true,
		blobUrl: params.skipBlobUrl ? void 0 : URL.createObjectURL(cachedAlternate.blob),
		fromCache: true,
		voiceStyleUsed: alternatePersona
	};
	if (typeof navigator !== "undefined" && navigator.onLine === false) return {
		ok: false,
		offlineUncached: true,
		error: "You are offline and this story page has not been saved yet. Connect once and tap \"Save Offline\" to hear the human storyteller offline."
	};
	const endpoint = resolveApiEndpoint("/api/ai/story-audio");
	const maxAttempts = 3;
	let lastError = "Studio Storyteller audio is temporarily unavailable.";
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		if (params.signal?.aborted) return {
			ok: false,
			error: "Cancelled"
		};
		try {
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				signal: params.signal,
				body: JSON.stringify({
					storyId: params.storyId,
					pageIndex: params.pageIndex,
					text: params.text,
					language: params.language,
					voiceStyle: params.voiceStyle
				})
			});
			const data = await res.json().catch(() => ({}));
			if (res.ok && data.ok && data.base64Audio) {
				const wavBlob = base64ToAudioBlob(data.base64Audio, data.mimeType || "audio/wav");
				const check = await verifyAudioBlobIntegrity(wavBlob);
				if (check.valid) {
					await requestPersistentAudioStorage();
					await putCachedStoryAudioRecord(primaryKey, wavBlob);
					return {
						ok: true,
						blobUrl: params.skipBlobUrl ? void 0 : URL.createObjectURL(wavBlob),
						fromCache: false,
						voiceStyleUsed: params.voiceStyle
					};
				}
				return {
					ok: false,
					offlineUncached: false,
					error: check.reason || "Downloaded story audio failed integrity verification."
				};
			}
			lastError = data.error || `Story audio server returned ${res.status}.`;
			if (!(res.status === 429 || res.status >= 500) || attempt === 2) return {
				ok: false,
				offlineUncached: false,
				error: lastError
			};
			await sleepWithAbort(attempt === 0 ? 550 : 1400, params.signal);
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") return {
				ok: false,
				error: "Cancelled"
			};
			lastError = "Unable to reach Studio voice service. Connect to internet once to save this story offline.";
			if (attempt === 2) return {
				ok: false,
				offlineUncached: true,
				error: lastError
			};
			try {
				await sleepWithAbort(attempt === 0 ? 550 : 1400, params.signal);
			} catch {
				return {
					ok: false,
					error: "Cancelled"
				};
			}
		}
	}
	return {
		ok: false,
		offlineUncached: true,
		error: lastError
	};
}
function buildStoryPrefetchTasks(params) {
	const tasks = [];
	for (const story of params.stories) {
		const pages = story.localizedPages?.[params.language] || story.pages;
		const title = story.localizedTitles?.[params.language] || story.title;
		pages.forEach((text, pageIndex) => {
			tasks.push({
				storyId: story.id,
				storyTitle: title,
				pageIndex,
				text,
				language: params.language,
				voiceStyle: params.voiceStyle,
				cacheKey: buildStoryAudioCacheKey(story.id, pageIndex, params.language, params.voiceStyle)
			});
		});
	}
	return tasks;
}
var PREFETCH_CONCURRENCY = 2;
var StoryAudioPrefetchManager = class {
	constructor() {
		this.state = {
			status: "idle",
			scope: null,
			language: null,
			voiceStyle: null,
			totalTasks: 0,
			completedTasks: 0,
			skippedCachedTasks: 0,
			failedTasks: 0,
			currentStoryTitle: "",
			currentPageIndex: 0,
			lastError: null
		};
		this.listeners = /* @__PURE__ */ new Set();
		this.abortController = null;
		this.isPaused = false;
		this.pauseWaiters = [];
		this.activeRunId = 0;
	}
	getState() {
		return { ...this.state };
	}
	subscribe(listener) {
		this.listeners.add(listener);
		listener(this.getState());
		return () => {
			this.listeners.delete(listener);
		};
	}
	emit(patch) {
		this.state = {
			...this.state,
			...patch
		};
		const snapshot = this.getState();
		this.listeners.forEach((fn) => fn(snapshot));
	}
	pausePrefetch() {
		if (this.state.status !== "running") return;
		this.isPaused = true;
		this.emit({ status: "paused" });
	}
	resumePrefetch() {
		if (this.state.status !== "paused") return;
		this.isPaused = false;
		this.emit({
			status: "running",
			lastError: null
		});
		this.pauseWaiters.splice(0).forEach((wake) => wake());
	}
	cancelPrefetch() {
		this.activeRunId += 1;
		this.isPaused = false;
		this.abortController?.abort();
		this.abortController = null;
		this.pauseWaiters.splice(0).forEach((wake) => wake());
		this.emit({ status: "cancelled" });
	}
	async waitIfPaused(runId) {
		while (this.isPaused && runId === this.activeRunId) await new Promise((resolve) => {
			this.pauseWaiters.push(resolve);
		});
		return runId === this.activeRunId;
	}
	async startPrefetch(params) {
		this.cancelPrefetch();
		const runId = ++this.activeRunId;
		this.isPaused = false;
		const controller = new AbortController();
		this.abortController = controller;
		await requestPersistentAudioStorage();
		const allTasks = buildStoryPrefetchTasks({
			stories: params.stories,
			language: params.language,
			voiceStyle: params.voiceStyle
		});
		const cachedRecords = await listAllCachedStoryAudioMetadata();
		const existingKeys = new Set(cachedRecords.map((r) => r.key));
		const pendingTasks = [];
		let skippedCachedTasks = 0;
		for (const task of allTasks) if (existingKeys.has(task.cacheKey)) skippedCachedTasks += 1;
		else pendingTasks.push(task);
		this.emit({
			status: pendingTasks.length === 0 ? "completed" : "running",
			scope: params.scope,
			language: params.language,
			voiceStyle: params.voiceStyle,
			totalTasks: allTasks.length,
			completedTasks: skippedCachedTasks,
			skippedCachedTasks,
			failedTasks: 0,
			currentStoryTitle: pendingTasks[0]?.storyTitle || allTasks[0]?.storyTitle || "",
			currentPageIndex: pendingTasks[0]?.pageIndex || 0,
			lastError: null
		});
		if (pendingTasks.length === 0) return this.getState();
		if (typeof navigator !== "undefined" && navigator.onLine === false) {
			this.emit({
				status: "error",
				lastError: "You are offline. Connect to Wi-Fi or mobile data once to save remaining stories."
			});
			return this.getState();
		}
		let cursor = 0;
		const worker = async () => {
			while (runId === this.activeRunId && !controller.signal.aborted) {
				if (!await this.waitIfPaused(runId) || controller.signal.aborted) return;
				const nextIdx = cursor++;
				if (nextIdx >= pendingTasks.length) return;
				const task = pendingTasks[nextIdx];
				this.emit({
					currentStoryTitle: task.storyTitle,
					currentPageIndex: task.pageIndex
				});
				const res = await resolveStoryPageHumanAudio({
					storyId: task.storyId,
					pageIndex: task.pageIndex,
					text: task.text,
					language: task.language,
					voiceStyle: task.voiceStyle,
					signal: controller.signal,
					skipBlobUrl: true
				});
				if (runId !== this.activeRunId || controller.signal.aborted) return;
				if (res.ok) this.emit({ completedTasks: this.state.completedTasks + 1 });
				else {
					this.emit({
						failedTasks: this.state.failedTasks + 1,
						lastError: res.error || "Some pages could not be saved right now."
					});
					if (res.offlineUncached && typeof navigator !== "undefined" && navigator.onLine === false) {
						this.isPaused = true;
						this.emit({
							status: "paused",
							lastError: "Connection lost. Paused automatically — resume when online."
						});
					}
				}
				try {
					await sleepWithAbort(120, controller.signal);
				} catch {
					return;
				}
			}
		};
		const workers = Array.from({ length: Math.min(PREFETCH_CONCURRENCY, pendingTasks.length) }, () => worker());
		await Promise.all(workers);
		if (runId !== this.activeRunId) return this.getState();
		if (controller.signal.aborted) this.emit({ status: "cancelled" });
		else if (this.state.failedTasks > 0 && this.state.completedTasks < this.state.totalTasks) this.emit({ status: "error" });
		else this.emit({
			status: "completed",
			lastError: null
		});
		this.abortController = null;
		return this.getState();
	}
};
var storyAudioPrefetchManager = new StoryAudioPrefetchManager();
var inFlightLookaheadKeys = /* @__PURE__ */ new Set();
function isLookaheadPermitted() {
	if (typeof navigator === "undefined") return false;
	if (navigator.onLine === false) return false;
	if (navigator.connection?.saveData === true) return false;
	return true;
}
async function warmStoryPageSilently(params) {
	if (!isLookaheadPermitted()) return;
	const text = (params.story.localizedPages?.[params.language] || params.story.pages)[params.pageIndex];
	if (!text?.trim()) return;
	const key = buildStoryAudioCacheKey(params.story.id, params.pageIndex, params.language, params.voiceStyle);
	if (inFlightLookaheadKeys.has(key)) return;
	const existing = await getCachedStoryAudioRecord(key);
	if (existing?.blob && existing.blob.size > 0) return;
	inFlightLookaheadKeys.add(key);
	try {
		await resolveStoryPageHumanAudio({
			storyId: params.story.id,
			pageIndex: params.pageIndex,
			text,
			language: params.language,
			voiceStyle: params.voiceStyle,
			skipBlobUrl: true
		});
	} finally {
		inFlightLookaheadKeys.delete(key);
	}
}
function scheduleStoryReaderLookahead(params) {
	if (!isLookaheadPermitted()) return () => {};
	let cancelled = false;
	const storyIdx = params.stories.findIndex((s) => s.id === params.currentStoryId);
	if (storyIdx < 0) return () => {};
	const currentStory = params.stories[storyIdx];
	const currentPages = currentStory.localizedPages?.[params.language] || currentStory.pages;
	const queue = [];
	if (params.currentPageIndex + 1 < currentPages.length) queue.push({
		story: currentStory,
		pageIndex: params.currentPageIndex + 1
	});
	if (params.currentPageIndex + 2 < currentPages.length) queue.push({
		story: currentStory,
		pageIndex: params.currentPageIndex + 2
	});
	const nextStory = params.stories[storyIdx + 1];
	if (nextStory) queue.push({
		story: nextStory,
		pageIndex: 0
	});
	const timer = setTimeout(() => {
		(async () => {
			for (const item of queue) {
				if (cancelled || !isLookaheadPermitted()) return;
				await warmStoryPageSilently({
					story: item.story,
					pageIndex: item.pageIndex,
					language: params.language,
					voiceStyle: params.voiceStyle
				});
				if (!cancelled) params.onCachedUpdated?.();
			}
		})();
	}, 450);
	return () => {
		cancelled = true;
		clearTimeout(timer);
	};
}
function scheduleStarterStoriesWarmup(params) {
	if (!isLookaheadPermitted()) return () => {};
	let cancelled = false;
	const starterCount = Math.min(params.count ?? 2, params.stories.length);
	const targets = params.stories.slice(0, starterCount);
	const timer = setTimeout(() => {
		(async () => {
			for (const story of targets) {
				if (cancelled || !isLookaheadPermitted()) return;
				await warmStoryPageSilently({
					story,
					pageIndex: 0,
					language: params.language,
					voiceStyle: params.voiceStyle
				});
				if (!cancelled) params.onCachedUpdated?.();
			}
		})();
	}, 600);
	return () => {
		cancelled = true;
		clearTimeout(timer);
	};
}
// src/services/humanDuaAndQaidaAudio.ts
var HUMAN_DUA_QAIDA_CACHE_NAME = "ilmizo-human-dua-qaida-audio-v1";
var hisnChapterUrl = (chapterNum) => `https://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_${String(chapterNum).padStart(3, "0")}.mp3`;
/**
* Authentic human MP3 recordings:
* - Quranic Duas use Sheikh Mishary Rashid Alafasy's exact Ayah MP3 matching that verse.
* - Prophetic / Masnoon Hadith Duas use authentic Hisn al-Muslim chapter human Arabic MP3s.
*/
var HUMAN_DUA_AUDIO_MAP = {
	dua_waking: {
		id: "dua_waking",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(2),
		quranReference: "Hisn al-Muslim Ch. 1 (Waking Up)",
		isHumanRecording: true
	},
	dua_waking_health_dhikr: {
		id: "dua_waking_health_dhikr",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(2),
		quranReference: "Hisn al-Muslim Ch. 1 (Health & Spirit Restored)",
		isHumanRecording: true
	},
	dua_before_eating: {
		id: "dua_before_eating",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(69),
		quranReference: "Hisn al-Muslim Ch. 69 (Before Eating)",
		isHumanRecording: true
	},
	dua_Before_eating: {
		id: "dua_Before_eating",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(69),
		quranReference: "Hisn al-Muslim Ch. 69 (Before Eating)",
		isHumanRecording: true
	},
	dua_forgot_bismillah: {
		id: "dua_forgot_bismillah",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(69),
		quranReference: "Hisn al-Muslim Ch. 69 (If Bismillah Was Forgotten)",
		isHumanRecording: true
	},
	dua_after_eating: {
		id: "dua_after_eating",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(70),
		quranReference: "Hisn al-Muslim Ch. 70 (After Eating)",
		isHumanRecording: true
	},
	dua_drinking_milk: {
		id: "dua_drinking_milk",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(72),
		quranReference: "Hisn al-Muslim Ch. 72 (Drinking / Offered Drink)",
		isHumanRecording: true
	},
	dua_host_meal_blessing: {
		id: "dua_host_meal_blessing",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(71),
		quranReference: "Hisn al-Muslim Ch. 71 (Dua for the Host)",
		isHumanRecording: true
	},
	dua_breaking_fast_iftar: {
		id: "dua_breaking_fast_iftar",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(68),
		quranReference: "Hisn al-Muslim Ch. 68 (Breaking Fast / Iftar)",
		isHumanRecording: true
	},
	dua_sleep: {
		id: "dua_sleep",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(29),
		quranReference: "Hisn al-Muslim Ch. 28 (Before Sleeping)",
		isHumanRecording: true
	},
	dua_sleep_tasbih_fatimah: {
		id: "dua_sleep_tasbih_fatimah",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(29),
		quranReference: "Hisn al-Muslim Ch. 28 (Before Sleeping — Tasbih Fatimah)",
		isHumanRecording: true
	},
	dua_sleep_side_trust: {
		id: "dua_sleep_side_trust",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(29),
		quranReference: "Hisn al-Muslim Ch. 28 (Sleeping on Right Side)",
		isHumanRecording: true
	},
	dua_sleep_last_two_ayat_baqarah: {
		id: "dua_sleep_last_two_ayat_baqarah",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/292.mp3",
		quranReference: "Quran 2:285 (Last Two Ayat of Al-Baqarah)",
		isHumanRecording: true
	},
	dua_morning_ayatul_kursi: {
		id: "dua_morning_ayatul_kursi",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3",
		quranReference: "Quran 2:255 (Ayat al-Kursi)",
		isHumanRecording: true
	},
	dua_knowledge: {
		id: "dua_knowledge",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2462.mp3",
		quranReference: "Quran 20:114 (Rabbi Zidni Ilma)",
		isHumanRecording: true
	},
	dua_parents: {
		id: "dua_parents",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2053.mp3",
		quranReference: "Quran 17:24 (Rabbirhamhuma kama rabbayani saghira)",
		isHumanRecording: true
	},
	dua_parents_ibrahim_forgiveness: {
		id: "dua_parents_ibrahim_forgiveness",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1791.mp3",
		quranReference: "Quran 14:41 (Rabbana-ghfir li wa li-walidayya)",
		isHumanRecording: true
	},
	dua_family_coolness: {
		id: "dua_family_coolness",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2929.mp3",
		quranReference: "Quran 25:74 (Rabbana hab lana min azwajina)",
		isHumanRecording: true
	},
	dua_rabbana_atina: {
		id: "dua_rabbana_atina",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/208.mp3",
		quranReference: "Quran 2:201 (Rabbana atina fid-dunya hasanah)",
		isHumanRecording: true
	},
	dua_daily_rabbana_atina: {
		id: "dua_daily_rabbana_atina",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/208.mp3",
		quranReference: "Quran 2:201 (Rabbana atina fid-dunya hasanah)",
		isHumanRecording: true
	},
	dua_daily_steadfast_heart: {
		id: "dua_daily_steadfast_heart",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/301.mp3",
		quranReference: "Quran 3:8 (Rabbana la tuzigh qulubana)",
		isHumanRecording: true
	},
	dua_gratitude_sulayman_inspire: {
		id: "dua_gratitude_sulayman_inspire",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/3178.mp3",
		quranReference: "Quran 27:19 (Rabbi awzi‘ni an ashkura ni‘matak)",
		isHumanRecording: true
	},
	dua_travel: {
		id: "dua_travel",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/4338.mp3",
		quranReference: "Quran 43:13 (Subhanalladhi sakhkhara lana hadha)",
		isHumanRecording: true
	},
	dua_travel_journey: {
		id: "dua_travel_journey",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(95),
		quranReference: "Hisn al-Muslim Ch. 95 (Riding & Travel)",
		isHumanRecording: true
	},
	dua_travel_return: {
		id: "dua_travel_return",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(105),
		quranReference: "Hisn al-Muslim Ch. 105 (Returning from Journey)",
		isHumanRecording: true
	},
	dua_travel_entering_town: {
		id: "dua_travel_entering_town",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(97),
		quranReference: "Hisn al-Muslim Ch. 97 (Entering a Town)",
		isHumanRecording: true
	},
	dua_leaving_home: {
		id: "dua_leaving_home",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(11),
		quranReference: "Hisn al-Muslim Ch. 10 (Leaving Home)",
		isHumanRecording: true
	},
	dua_entering_home: {
		id: "dua_entering_home",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(12),
		quranReference: "Hisn al-Muslim Ch. 11 (Entering Home)",
		isHumanRecording: true
	},
	dua_entering_mosque: {
		id: "dua_entering_mosque",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(14),
		quranReference: "Hisn al-Muslim Ch. 13 (Entering the Mosque)",
		isHumanRecording: true
	},
	dua_leaving_mosque: {
		id: "dua_leaving_mosque",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(15),
		quranReference: "Hisn al-Muslim Ch. 14 (Leaving the Mosque)",
		isHumanRecording: true
	},
	dua_mosque_sitting_waiting_prayer: {
		id: "dua_mosque_sitting_waiting_prayer",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(13),
		quranReference: "Hisn al-Muslim Ch. 12 (Going to the Mosque)",
		isHumanRecording: true
	},
	dua_daily_entering_washroom: {
		id: "dua_daily_entering_washroom",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(7),
		quranReference: "Hisn al-Muslim Ch. 6 (Entering Restroom)",
		isHumanRecording: true
	},
	dua_daily_leaving_washroom: {
		id: "dua_daily_leaving_washroom",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(8),
		quranReference: "Hisn al-Muslim Ch. 7 (Leaving Restroom — Ghufranaka)",
		isHumanRecording: true
	},
	dua_daily_after_wudu: {
		id: "dua_daily_after_wudu",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(10),
		quranReference: "Hisn al-Muslim Ch. 9 (After Completing Wudu)",
		isHumanRecording: true
	},
	dua_daily_wearing_garment: {
		id: "dua_daily_wearing_garment",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(3),
		quranReference: "Hisn al-Muslim Ch. 2 (Getting Dressed)",
		isHumanRecording: true
	},
	dua_daily_sneezing_alhamdulillah: {
		id: "dua_daily_sneezing_alhamdulillah",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(77),
		quranReference: "Hisn al-Muslim Ch. 77 (Sneezing Etiquette)",
		isHumanRecording: true
	},
	dua_daily_kaffaratul_majlis: {
		id: "dua_daily_kaffaratul_majlis",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(85),
		quranReference: "Hisn al-Muslim Ch. 85 (Kaffaratul-Majlis)",
		isHumanRecording: true
	},
	dua_daily_rain_beneficial: {
		id: "dua_daily_rain_beneficial",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(64),
		quranReference: "Hisn al-Muslim Ch. 64 (When It Rains)",
		isHumanRecording: true
	},
	dua_daily_visiting_sick: {
		id: "dua_daily_visiting_sick",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(49),
		quranReference: "Hisn al-Muslim Ch. 49 (Visiting the Sick)",
		isHumanRecording: true
	},
	dua_health_knowledge: {
		id: "dua_health_knowledge",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(28),
		quranReference: "Hisn al-Muslim Ch. 27 (Beneficial Knowledge & Provision)",
		isHumanRecording: true
	},
	dua_healing_shifa: {
		id: "dua_healing_shifa",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(124),
		quranReference: "Hisn al-Muslim Ch. 124 (Pain & Healing)",
		isHumanRecording: true
	},
	dua_morning_protection: {
		id: "dua_morning_protection",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(28),
		quranReference: "Hisn al-Muslim Ch. 27 (Morning & Evening Remembrance)",
		isHumanRecording: true
	},
	dua_morning_gratitude: {
		id: "dua_morning_gratitude",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(28),
		quranReference: "Hisn al-Muslim Ch. 27 (Morning Gratitude)",
		isHumanRecording: true
	},
	dua_forgiveness_sayyid: {
		id: "dua_forgiveness_sayyid",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(28),
		quranReference: "Hisn al-Muslim Ch. 27 (Sayyidul-Istighfar)",
		isHumanRecording: true
	},
	dua_morning_entering_day: {
		id: "dua_morning_entering_day",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(28),
		quranReference: "Hisn al-Muslim Ch. 27 (Asbahna wa Asbahal-Mulk)",
		isHumanRecording: true
	},
	dua_morning_wellbeing_afiyah: {
		id: "dua_morning_wellbeing_afiyah",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(28),
		quranReference: "Hisn al-Muslim Ch. 27 (Asking Allah for Afiyah)",
		isHumanRecording: true
	},
	dua_morning_pleased_with_allah: {
		id: "dua_morning_pleased_with_allah",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(28),
		quranReference: "Hisn al-Muslim Ch. 27 (Raditu Billahi Rabba)",
		isHumanRecording: true
	},
	dua_morning_beneficial_knowledge_rizq: {
		id: "dua_morning_beneficial_knowledge_rizq",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(28),
		quranReference: "Hisn al-Muslim Ch. 27 (After Fajr — Ilman Nafi‘an)",
		isHumanRecording: true
	},
	dua_morning_subhanallahi_wa_bihamdihi_100: {
		id: "dua_morning_subhanallahi_wa_bihamdihi_100",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(130),
		quranReference: "Hisn al-Muslim Ch. 130 (Excellence of Dhikr)",
		isHumanRecording: true
	},
	dua_evening_entering_night: {
		id: "dua_evening_entering_night",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(28),
		quranReference: "Hisn al-Muslim Ch. 27 (Evening Remembrance)",
		isHumanRecording: true
	},
	dua_evening_perfect_words: {
		id: "dua_evening_perfect_words",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(28),
		quranReference: "Hisn al-Muslim Ch. 27 (A‘udhu bi-Kalimatillahit-Tammat)",
		isHumanRecording: true
	},
	dua_evening_hasbiyallah: {
		id: "dua_evening_hasbiyallah",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(28),
		quranReference: "Hisn al-Muslim Ch. 27 (Hasbiyallahu La Ilaha Illa Huwa)",
		isHumanRecording: true
	},
	dua_evening_peace: {
		id: "dua_evening_peace",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3",
		quranReference: "Surah An-Nas 114:1",
		isHumanRecording: true
	},
	dua_protection_falaq_nas_ikhlas: {
		id: "dua_protection_falaq_nas_ikhlas",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3",
		quranReference: "Surah Al-Ikhlas 112:1 (Mu‘awwidhat)",
		isHumanRecording: true
	},
	dua_protection_children_hasan_husayn: {
		id: "dua_protection_children_hasan_husayn",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(48),
		quranReference: "Hisn al-Muslim Ch. 48 (Protection for Children)",
		isHumanRecording: true
	},
	dua_protection_evil_manners: {
		id: "dua_protection_evil_manners",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(35),
		quranReference: "Hisn al-Muslim Ch. 34 (Refuge from Hardship & Evil)",
		isHumanRecording: true
	},
	dua_protection_anxiety_debt: {
		id: "dua_protection_anxiety_debt",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(35),
		quranReference: "Hisn al-Muslim Ch. 34 (Refuge from Anxiety & Debt)",
		isHumanRecording: true
	},
	dua_distress_yunus: {
		id: "dua_distress_yunus",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2570.mp3",
		quranReference: "Quran 21:87 (Supplication of Prophet Yunus)",
		isHumanRecording: true
	},
	dua_distress_kurb_relief: {
		id: "dua_distress_kurb_relief",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(36),
		quranReference: "Hisn al-Muslim Ch. 35 (Invocation for Anguish)",
		isHumanRecording: true
	},
	dua_distress_ya_hayyu_ya_qayyum: {
		id: "dua_distress_ya_hayyu_ya_qayyum",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(35),
		quranReference: "Hisn al-Muslim Ch. 34 (Ya Hayyu Ya Qayyum)",
		isHumanRecording: true
	},
	dua_distress_easy_task: {
		id: "dua_distress_easy_task",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(43),
		quranReference: "Hisn al-Muslim Ch. 43 (When a Task Is Difficult)",
		isHumanRecording: true
	},
	dua_distress_istirja_calamity: {
		id: "dua_distress_istirja_calamity",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(53),
		quranReference: "Hisn al-Muslim Ch. 53 (When Tragedy Strikes)",
		isHumanRecording: true
	},
	dua_gratitude_muadh_worship: {
		id: "dua_gratitude_muadh_worship",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(25),
		quranReference: "Hisn al-Muslim Ch. 24 (Allahumma A‘inni ‘ala Dhikrika)",
		isHumanRecording: true
	},
	dua_gratitude_seeing_blessing: {
		id: "dua_gratitude_seeing_blessing",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(123),
		quranReference: "Hisn al-Muslim Ch. 123 (When Pleased with a Blessing)",
		isHumanRecording: true
	},
	dua_daily_guidance_taqwa_contentment: {
		id: "dua_daily_guidance_taqwa_contentment",
		reciterName: "Hisn al-Muslim Human Audio",
		mp3Url: hisnChapterUrl(129),
		quranReference: "Hisn al-Muslim Ch. 129 (Seeking Guidance, Taqwa & Forgiveness)",
		isHumanRecording: true
	},
	dua_forgiveness: {
		id: "dua_forgiveness",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/293.mp3",
		quranReference: "Quran 2:286 (Rabbana waghfir lana warhamna)",
		isHumanRecording: true
	},
	dua_health_healing: {
		id: "dua_health_healing",
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2566.mp3",
		quranReference: "Quran 21:83 (Prophet Ayyub’s Supplication for Healing)",
		isHumanRecording: true
	}
};
/**
* Resolves the best authentic human MP3 recording for any DuaItem in the library.
* Uses exact Dua ID match first, then Quranic verse text patterns, then matching
* Hisn al-Muslim chapter MP3s — never substituting unrelated Surah Al-Fatiha for Hadith Duas.
*/
function resolveDuaHumanAudio(dua) {
	if (dua.audioUrl) return {
		id: dua.id,
		reciterName: "Verified Human Recording",
		mp3Url: dua.audioUrl,
		isHumanRecording: true
	};
	if (HUMAN_DUA_AUDIO_MAP[dua.id]) return HUMAN_DUA_AUDIO_MAP[dua.id];
	const ar = dua.arabic || "";
	if (ar.includes("زِدْنِى عِلْمًا") || ar.includes("زِدْنِي عِلْمًا")) return HUMAN_DUA_AUDIO_MAP.dua_knowledge;
	if (ar.includes("ٱرْحَمْهُمَا") || ar.includes("ارْحَمْهُمَا")) return HUMAN_DUA_AUDIO_MAP.dua_parents;
	if (ar.includes("ءَاتِنَا فِى ٱلدُّنْيَا") || ar.includes("آتِنَا فِي الدُّنْيَا")) return HUMAN_DUA_AUDIO_MAP.dua_rabbana_atina;
	if (ar.includes("سَخَّرَ لَنَا")) return HUMAN_DUA_AUDIO_MAP.dua_travel;
	if (ar.includes("أَنْتَ سُبْحَـٰنَكَ") || ar.includes("سُبْحَانَكَ إِنِّي كُنْتُ")) return HUMAN_DUA_AUDIO_MAP.dua_distress_yunus;
	if (ar.includes("ٱشْرَحْ لِى صَدْرِى") || ar.includes("اشْرَحْ لِي صَدْرِي")) return {
		id: dua.id,
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2373.mp3",
		quranReference: "Quran 20:25 (Supplication of Prophet Musa)",
		isHumanRecording: true
	};
	if (ar.includes("لَا تُزِغْ قُلُوبَنَا")) return HUMAN_DUA_AUDIO_MAP.dua_daily_steadfast_heart;
	if (ar.includes("هَبْ لَنَا مِنْ أَزْوَٰجِنَا") || ar.includes("مِنْ أَزْوَاجِنَا")) return HUMAN_DUA_AUDIO_MAP.dua_family_coolness;
	if (ar.includes("حَسْبُنَا ٱللَّهُ") || ar.includes("حَسْبِيَ اللَّهُ")) return {
		id: dua.id,
		reciterName: "Sheikh Mishary Rashid Alafasy",
		mp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/466.mp3",
		quranReference: "Quran 3:173 (Hasbunallahu Wa Ni’mal Wakeel)",
		isHumanRecording: true
	};
	switch (dua.category) {
		case "eating": return HUMAN_DUA_AUDIO_MAP.dua_before_eating;
		case "travel": return HUMAN_DUA_AUDIO_MAP.dua_travel_journey;
		case "sleep": return HUMAN_DUA_AUDIO_MAP.dua_sleep;
		case "waking": return HUMAN_DUA_AUDIO_MAP.dua_waking;
		case "family": return HUMAN_DUA_AUDIO_MAP.dua_parents;
		case "health": return HUMAN_DUA_AUDIO_MAP.dua_healing_shifa;
		case "mosque": return HUMAN_DUA_AUDIO_MAP.dua_entering_mosque;
		case "protection": return HUMAN_DUA_AUDIO_MAP.dua_protection_children_hasan_husayn;
		case "distress": return HUMAN_DUA_AUDIO_MAP.dua_distress_kurb_relief;
		case "gratitude": return HUMAN_DUA_AUDIO_MAP.dua_gratitude_muadh_worship;
		case "forgiveness": return HUMAN_DUA_AUDIO_MAP.dua_forgiveness_sayyid;
		case "morning_evening": return HUMAN_DUA_AUDIO_MAP.dua_morning_protection;
		default: return HUMAN_DUA_AUDIO_MAP.dua_daily_guidance_taqwa_contentment;
	}
}
async function getOfflineDuaAudioStatus(duas) {
	const uniqueUrls = Array.from(new Set(duas.map((d) => resolveDuaHumanAudio(d).mp3Url).filter(Boolean)));
	if (typeof caches === "undefined") return {
		uniqueTrackCount: uniqueUrls.length,
		cachedTrackCount: 0,
		totalBytes: 0
	};
	try {
		const cache = await caches.open(HUMAN_DUA_QAIDA_CACHE_NAME);
		let cachedTrackCount = 0;
		let totalBytes = 0;
		for (const url of uniqueUrls) {
			const match = await cache.match(url);
			if (match) {
				const blob = await match.blob();
				if (blob.size >= 44) {
					cachedTrackCount += 1;
					totalBytes += blob.size;
				}
			}
		}
		return {
			uniqueTrackCount: uniqueUrls.length,
			cachedTrackCount,
			totalBytes
		};
	} catch {
		return {
			uniqueTrackCount: uniqueUrls.length,
			cachedTrackCount: 0,
			totalBytes: 0
		};
	}
}
async function downloadDuaOfflineAudioPack(params) {
	if (typeof caches === "undefined") return {
		ok: false,
		completed: 0,
		total: 0,
		error: "Cache Storage unavailable on this browser."
	};
	if (typeof navigator !== "undefined" && navigator.onLine === false) return {
		ok: false,
		completed: 0,
		total: 0,
		error: "Connect to the internet once to download the offline Duas Audio Pack."
	};
	const uniqueUrls = Array.from(new Set(params.duas.map((d) => resolveDuaHumanAudio(d).mp3Url).filter(Boolean)));
	const cache = await caches.open(HUMAN_DUA_QAIDA_CACHE_NAME);
	let completed = 0;
	const total = uniqueUrls.length;
	for (const mp3Url of uniqueUrls) {
		if (params.signal?.aborted) return {
			ok: false,
			completed,
			total,
			error: "Download cancelled."
		};
		const existing = await cache.match(mp3Url);
		if (existing) {
			if ((await verifyAudioBlobIntegrity(await existing.blob())).valid) {
				completed += 1;
				params.onProgress?.({
					completed,
					total
				});
				continue;
			}
			await cache.delete(mp3Url);
		}
		try {
			const response = await fetch(mp3Url, { signal: params.signal });
			if (!response.ok) return {
				ok: false,
				completed,
				total,
				error: `Could not download verified Dua audio (${response.status}).`
			};
			const blob = await response.blob();
			const integrity = await verifyAudioBlobIntegrity(blob);
			if (!integrity.valid) return {
				ok: false,
				completed,
				total,
				error: integrity.reason || "Downloaded Dua audio failed integrity verification."
			};
			await cache.put(mp3Url, new Response(blob, { headers: {
				"Content-Type": blob.type || "audio/mpeg",
				"X-Ilmizo-Audio-Version": "v1"
			} }));
			completed += 1;
			params.onProgress?.({
				completed,
				total
			});
		} catch {
			return {
				ok: false,
				completed,
				total,
				error: "Network interrupted while downloading Duas Audio Pack. Tap Download again to resume."
			};
		}
	}
	return {
		ok: true,
		completed,
		total
	};
}
async function clearOfflineDuaAudioPack() {
	if (typeof caches === "undefined") return;
	try {
		await caches.delete(HUMAN_DUA_QAIDA_CACHE_NAME);
	} catch {}
}
/**
* Plays a Dua with authentic human Qari / Hisn al-Muslim MP3 audio (Cache Storage first).
* Never substitutes robotic TTS when offline & uncached — surfaces honest offline unavailable guidance instead.
*/
async function playHumanDuaAudio(params) {
	const descriptor = resolveDuaHumanAudio(params.dua);
	let resolvedUrl = descriptor.mp3Url;
	let fromOfflineCache = false;
	if (typeof caches !== "undefined") try {
		const cache = await caches.open(HUMAN_DUA_QAIDA_CACHE_NAME);
		const cachedResp = await cache.match(descriptor.mp3Url);
		if (cachedResp) {
			const blob = await cachedResp.blob();
			const integrity = await verifyAudioBlobIntegrity(blob);
			if (integrity.valid && typeof URL !== "undefined" && URL.createObjectURL) {
				resolvedUrl = URL.createObjectURL(blob);
				fromOfflineCache = true;
			} else if (!integrity.valid) await cache.delete(descriptor.mp3Url);
		}
	} catch {}
	const isOffline = typeof navigator !== "undefined" && navigator.onLine === false;
	if (!fromOfflineCache && isOffline) resolvedUrl = void 0;
	audioManager.playAudioUrl({
		id: `human_dua_${params.dua.id}`,
		url: resolvedUrl,
		allowTtsFallback: false,
		offlineUnavailableMessage: "This Dua audio is not downloaded yet. Connect once or download the Duas Audio Pack in Storage Hub.",
		rate: params.rate || 1,
		onError: (err) => {
			if (params.onStatus) params.onStatus(err);
		}
	});
	if (params.onStatus && (fromOfflineCache || !isOffline)) params.onStatus(fromOfflineCache ? `Playing Offline Dua Audio (${descriptor.reciterName})` : `Playing Human Qari Audio (${descriptor.reciterName})`);
	return descriptor;
}
/**
* Complete 28-Letter Noorani Qaida & Arabic Alphabet with Harakat, Makharij tips,
* and Real Human Qari MP3 Audio (Sheikh Mishary Rashid Alafasy).
*/
var RAW_NOORANI_QAIDA_28_LETTERS = [
	{
		number: 1,
		id: "qaida_01_alif",
		letterArabic: "أ / ا",
		nameEn: "Alif",
		nameAr: "أَلِف",
		harakatForms: {
			fatha: "أَ (A)",
			kasra: "إِ (I)",
			damma: "أُ (U)",
			phonetic: "a / i / u"
		},
		makhrajTip: {
			en: "Pronounced clearly from the lower throat (Hamzah) or open mouth cavity (Alif Madd).",
			hi: "गले के निचले हिस्से से साफ़ अदा करें (अलिफ़ / हम्ज़ा)।",
			ur: "حلق کے نچلے حصے سے صاف ادا کریں (الف / ہمزہ)۔",
			hinglish: "Throat ke lower part se clear aawaz mein padhein (Alif / Hamzah).",
			ar: "مخرج الهمزة من أقصى الحلق والألف المدية من الجوف."
		},
		quranExampleWord: "ٱللَّهُ أَحَدٌ",
		quranExampleTranslit: "Allahu Ahad",
		quranExampleMeaning: {
			en: "Allah, the One (Surah Al-Ikhlas 112:1)",
			hi: "अल्लाह एक है (सूरह अल-इख़लास 112:1)",
			ur: "اللّٰہ ایک ہے (سورۃ الاخلاص 112:1)",
			hinglish: "Allah Ek hai (Surah Al-Ikhlas 112:1)",
			ar: "اللَّهُ أَحَدٌ"
		},
		quranAyahRef: "112:1",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 2,
		id: "qaida_02_baa",
		letterArabic: "ب",
		nameEn: "Baa",
		nameAr: "بَاء",
		harakatForms: {
			fatha: "بَ (Ba)",
			kasra: "بِ (Bi)",
			damma: "بُ (Bu)",
			phonetic: "ba / bi / bu"
		},
		makhrajTip: {
			en: "Press both lips together gently; has a Qalqalah bounce when silent (بْ).",
			hi: "दोनों होंठों को मिलाकर अदा करें; साकिन होने पर क़लक़ला (गूंज) होता है।",
			ur: "دونوں ہونٹوں کے تر حصے کو ملا کر ادا کریں۔",
			hinglish: "Dono lips ko mila kar padhein; sukoon par Qalqalah bounce hota hai.",
			ar: "من انطباق الشفتين مع القلقلة عند السكون."
		},
		quranExampleWord: "بِسْمِ ٱللَّهِ",
		quranExampleTranslit: "Bismillahi",
		quranExampleMeaning: {
			en: "In the Name of Allah (1:1)",
			hi: "अल्लाह के नाम से (1:1)",
			ur: "اللّٰہ کے نام سے (1:1)",
			hinglish: "Allah ke naam se (1:1)",
			ar: "بِسْمِ اللَّهِ"
		},
		quranAyahRef: "1:1",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 3,
		id: "qaida_03_taa",
		letterArabic: "ت",
		nameEn: "Taa",
		nameAr: "تَاء",
		harakatForms: {
			fatha: "تَ (Ta)",
			kasra: "تِ (Ti)",
			damma: "تُ (Tu)",
			phonetic: "ta / ti / tu"
		},
		makhrajTip: {
			en: "Touch the tip of the tongue softly to the base of the upper front teeth.",
			hi: "ज़ुबान की नोक को ऊपर के सामने वाले दांतों की जड़ से लगाएं।",
			ur: "زبان کی نوک کو اوپر کے سامنے والے دانتوں کی جڑ سے لگائیں۔",
			hinglish: "Tongue ki tip ko upper front teeth ke base se softly touch karein.",
			ar: "من طرف اللسان مع أصول الثنايا العليا."
		},
		quranExampleWord: "تَبَّتْ يَدَا",
		quranExampleTranslit: "Tabbat Yadaa",
		quranExampleMeaning: {
			en: "Perished are the hands (111:1)",
			hi: "टूट गए दोनों हाथ (111:1)",
			ur: "ٹوٹ گئے دونوں ہاتھ (111:1)",
			hinglish: "Tabah ho gaye dono haath (111:1)",
			ar: "تَبَّتْ يَدَا"
		},
		quranAyahRef: "111:1",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6217.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 4,
		id: "qaida_04_thaa",
		letterArabic: "ث",
		nameEn: "Thaa",
		nameAr: "ثَاء",
		harakatForms: {
			fatha: "ثَ (Tha)",
			kasra: "ثِ (Thi)",
			damma: "ثُ (Thu)",
			phonetic: "tha / thi / thu"
		},
		makhrajTip: {
			en: "Touch the tip of the tongue gently to the edges of the upper front teeth (soft \"th\" as in \"think\").",
			hi: "ज़ुबान की नोक को ऊपर के दांतों के किनारे से नरमी के साथ लगाएं (सीटी न बजे)।",
			ur: "زبان کی نوک کو اوپر کے دانتوں کے کنارے سے نرمی سے لگائیں۔",
			hinglish: "Tongue ki tip ko upper teeth ke edge par rakhein (soft \"th\" jaise \"thank\").",
			ar: "من طرف اللسان مع أطراف الثنايا العليا برفق."
		},
		quranExampleWord: "ٱلْكَوْثَرَ",
		quranExampleTranslit: "Al-Kawthar",
		quranExampleMeaning: {
			en: "Abundant Good / River of Al-Kawthar (108:1)",
			hi: "हौज़-ए-कौसर और ढेर सारी भलाई (108:1)",
			ur: "حوضِ کوثر اور خیرِ کثیر (108:1)",
			hinglish: "Al-Kawthar (Abundant Good - 108:1)",
			ar: "الْكَوْثَرَ"
		},
		quranAyahRef: "108:1",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6205.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 5,
		id: "qaida_05_jeem",
		letterArabic: "ج",
		nameEn: "Jeem",
		nameAr: "جِيم",
		harakatForms: {
			fatha: "جَ (Ja)",
			kasra: "جِ (Ji)",
			damma: "جُ (Ju)",
			phonetic: "ja / ji / ju"
		},
		makhrajTip: {
			en: "Middle of the tongue rises to the roof of the palate; Qalqalah letter when silent.",
			hi: "ज़ुबान के बीच के हिस्से को तालू से मिलाकर मज़बूती से अदा करें।",
			ur: "زبان کے درمیان کو تالو سے ملا کر ادا کریں۔",
			hinglish: "Middle of tongue ko roof of mouth se touch karein.",
			ar: "من وسط اللسان مع ما يحاذيه من الحنك الأعلى."
		},
		quranExampleWord: "إِذَا جَآءَ نَصْرُ ٱللَّهِ",
		quranExampleTranslit: "Idha Jaa-a Nasrullahi",
		quranExampleMeaning: {
			en: "When the victory of Allah comes (110:1)",
			hi: "जब अल्लाह की मदद आ जाए (110:1)",
			ur: "جب اللّٰہ کی مدد آ جائے (110:1)",
			hinglish: "Jab Allah ki madad aa jaye (110:1)",
			ar: "إِذَا جَاءَ نَصْرُ اللَّهِ"
		},
		quranAyahRef: "110:1",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6214.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 6,
		id: "qaida_06_haa_sharp",
		letterArabic: "ح",
		nameEn: "Haa (Sharp Throat)",
		nameAr: "حَاء",
		harakatForms: {
			fatha: "حَ (Ha)",
			kasra: "حِ (Hi)",
			damma: "حُ (Hu)",
			phonetic: "ha / hi / hu"
		},
		makhrajTip: {
			en: "Smooth, airy whisper from the middle of the throat.",
			hi: "गले के बीच के हिस्से से साफ़ और नरम आवाज़ निकालें (बड़ा हा)।",
			ur: "حلق کے درمیانی حصے سے صاف آواز نکالیں (حائے حطی)۔",
			hinglish: "Middle throat se smooth breathy sound nikalein.",
			ar: "من وسط الحلق بصوت صافٍ غير مخدوش."
		},
		quranExampleWord: "ٱلْحَمْدُ لِلَّهِ",
		quranExampleTranslit: "Al-Hamdu Lillahi",
		quranExampleMeaning: {
			en: "All praise belongs to Allah (1:2)",
			hi: "तमाम तारीफ़ अल्लाह के लिए है (1:2)",
			ur: "تمام تعریف اللّٰہ کے لیے ہے (1:2)",
			hinglish: "Sab tareef Allah ke liye hai (1:2)",
			ar: "الْحَمْدُ لِلَّهِ"
		},
		quranAyahRef: "1:2",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 7,
		id: "qaida_07_khaa",
		letterArabic: "خ",
		nameEn: "Khaa",
		nameAr: "خَاء",
		harakatForms: {
			fatha: "خَ (Kha)",
			kasra: "خِ (Khi)",
			damma: "خُ (Khu)",
			phonetic: "kha / khi / khu"
		},
		makhrajTip: {
			en: "Upper throat with heavy Tafkheem resonance.",
			hi: "गले के ऊपरी हिस्से से मोटी आवाज़ में अदा करें।",
			ur: "حلق کے اوپری حصے سے پر (موٹا) کر کے ادا کریں۔",
			hinglish: "Upper throat se heavy sound ke saath padhein.",
			ar: "من أدنى الحلق مع التفخيم."
		},
		quranExampleWord: "مِن شَرِّ مَا خَلَقَ",
		quranExampleTranslit: "Min sharri maa khalaq",
		quranExampleMeaning: {
			en: "From the evil of what He created (113:2)",
			hi: "हर उस चीज़ की बुराई से जो उसने पैदा की (113:2)",
			ur: "ہر اس چیز کے شر سے جو اس نے پیدا کی (113:2)",
			hinglish: "Har us cheez ke shar se jo Usne paida ki (113:2)",
			ar: "مِنْ شَرِّ مَا خَلَقَ"
		},
		quranAyahRef: "113:2",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6227.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 8,
		id: "qaida_08_daal",
		letterArabic: "د",
		nameEn: "Daal",
		nameAr: "دَال",
		harakatForms: {
			fatha: "دَ (Da)",
			kasra: "دِ (Di)",
			damma: "دُ (Du)",
			phonetic: "da / di / du"
		},
		makhrajTip: {
			en: "Tip of the tongue against the base of the upper front teeth; Qalqalah letter.",
			hi: "ज़ुबान की नोक को ऊपर के दांतों की जड़ से लगाएं; साकिन होने पर क़लक़ला करें।",
			ur: "زبان کی نوک کو اوپر کے دانتوں کی جڑ سے لگائیں۔",
			hinglish: "Tongue tip at upper teeth base; Qalqalah bounce when silent.",
			ar: "من طرف اللسان مع أصول الثنايا العليا."
		},
		quranExampleWord: "مَـٰلِكِ يَوْمِ ٱلدِّينِ",
		quranExampleTranslit: "Maliki Yawmid-Deen",
		quranExampleMeaning: {
			en: "Master of the Day of Judgment (1:4)",
			hi: "बदले के दिन का मालिक (1:4)",
			ur: "روزِ جزا کا مالک (1:4)",
			hinglish: "Roz-e-Jaza ka Maalik (1:4)",
			ar: "مَالِكِ يَوْمِ الدِّينِ"
		},
		quranAyahRef: "1:4",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 9,
		id: "qaida_09_dhaal",
		letterArabic: "ذ",
		nameEn: "Dhaal",
		nameAr: "ذَال",
		harakatForms: {
			fatha: "ذَ (Dha)",
			kasra: "ذِ (Dhi)",
			damma: "ذُ (Dhu)",
			phonetic: "dha / dhi / dhu"
		},
		makhrajTip: {
			en: "Tip of the tongue gently touching the edge of upper front teeth (like \"this\" in English).",
			hi: "ज़ुबान की नोक को ऊपर के दांतों के किनारे से नरमी से लगाएं (ज़ की तरह सीटी न बजे)।",
			ur: "زبان کی نوک کو اوپر کے دانتوں کے کنارے سے نرمی سے لگائیں۔",
			hinglish: "Tongue tip ko upper teeth edge se softly touch karein (jaise English \"this\").",
			ar: "من طرف اللسان مع أطراف الثنايا العليا بدون صفير."
		},
		quranExampleWord: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ",
		quranExampleTranslit: "Qul A'oodhu Bi-Rabbil-Falaq",
		quranExampleMeaning: {
			en: "Say: I seek refuge in the Lord of Daybreak (113:1)",
			hi: "कहिए: मैं सुबह के रब की पनाह मांगता हूँ (113:1)",
			ur: "کہیے: میں صبح کے رب کی پناہ مانگتا ہوں (113:1)",
			hinglish: "Kahiye: Main subah ke Rabb ki panaah maangta hoon (113:1)",
			ar: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ"
		},
		quranAyahRef: "113:1",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 10,
		id: "qaida_10_raa",
		letterArabic: "ر",
		nameEn: "Raa",
		nameAr: "رَاء",
		harakatForms: {
			fatha: "رَ (Ra)",
			kasra: "رِ (Ri)",
			damma: "رُ (Ru)",
			phonetic: "ra / ri / ru"
		},
		makhrajTip: {
			en: "Tip of the tongue against the front gums; heavy with Fatha/Damma, light with Kasra.",
			hi: "ज़ुबान की नोक को मसूड़ों से लगाएं; ज़बर/पेश पर मोटा और ज़ेर पर बारीक पढ़ें।",
			ur: "زبان کی نوک کو مسوڑھوں سے لگائیں؛ زبر/پیش پر موٹا اور زیر پر باریک پڑھیں۔",
			hinglish: "Fatha/Damma par heavy (pur) aur Kasra par light (bareek) padhein.",
			ar: "من طرف اللسان مع لثة الثنايا العليا."
		},
		quranExampleWord: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
		quranExampleTranslit: "Ar-Rahmanir-Raheem",
		quranExampleMeaning: {
			en: "The Most Gracious, the Most Merciful (1:3)",
			hi: "बेहद रहम करने वाला, निहायत मेहरबान (1:3)",
			ur: "بڑا مہربان، نہایت رحم والا (1:3)",
			hinglish: "Bada Meherbaan, Nihayat Reham Wala (1:3)",
			ar: "الرَّحْمَٰنِ الرَّحِيمِ"
		},
		quranAyahRef: "1:3",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 11,
		id: "qaida_11_zaay",
		letterArabic: "ز",
		nameEn: "Zaay",
		nameAr: "زَاي",
		harakatForms: {
			fatha: "زَ (Za)",
			kasra: "زِ (Zi)",
			damma: "زُ (Zu)",
			phonetic: "za / zi / zu"
		},
		makhrajTip: {
			en: "Crisp buzzing sound with the tip of the tongue near the lower front teeth.",
			hi: "ज़ुबान की नोक को दांतों के क़रीब रखकर साफ़ भनभनाहट (सफ़ीर) के साथ अदा करें।",
			ur: "زبان کی نوک سے صاف سیٹی دار آواز (صفیر) کے ساتھ ادا کریں۔",
			hinglish: "Crisp buzzing \"Z\" sound ke saath padhein.",
			ar: "من طرف اللسان مع الصفير الواضح."
		},
		quranExampleWord: "إِذَا زُلْزِلَتِ ٱلْأَرْضُ",
		quranExampleTranslit: "Idha Zulzilatil-Ardu",
		quranExampleMeaning: {
			en: "When the earth is shaken with its earthquake (99:1)",
			hi: "जब ज़मीन अपने ज़लज़ले से हिला दी जाएगी (99:1)",
			ur: "جب زمین اپنے زلزلے سے ہلا دی جائے گی (99:1)",
			hinglish: "Jab zameen apne zalzale se hila di jayegi (99:1)",
			ar: "إِذَا زُلْزِلَتِ الْأَرْضُ"
		},
		quranAyahRef: "99:1",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6139.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 12,
		id: "qaida_12_seen",
		letterArabic: "س",
		nameEn: "Seen",
		nameAr: "سِين",
		harakatForms: {
			fatha: "سَ (Sa)",
			kasra: "سِ (Si)",
			damma: "سُ (Su)",
			phonetic: "sa / si / su"
		},
		makhrajTip: {
			en: "Light, clear whistling \"s\" sound from the tip of the tongue.",
			hi: "ज़ुबान की नोक से बारीक और साफ़ \"स\" की आवाज़ निकालें।",
			ur: "زبان کی نوک سے باریک اور صاف سین ادا کریں۔",
			hinglish: "Light aur clear \"S\" sound ke saath padhein.",
			ar: "من طرف اللسان مع الترقيق والصفير."
		},
		quranExampleWord: "بِرَبِّ ٱلنَّاسِ",
		quranExampleTranslit: "Bi-Rabbin-Naas",
		quranExampleMeaning: {
			en: "In the Lord of Mankind (114:1)",
			hi: "इंसानों के रब की पनाह में (114:1)",
			ur: "انسانوں کے رب کی پناہ میں (114:1)",
			hinglish: "Insanon ke Rabb ki panaah mein (114:1)",
			ar: "بِرَبِّ النَّاسِ"
		},
		quranAyahRef: "114:1",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 13,
		id: "qaida_13_sheen",
		letterArabic: "ش",
		nameEn: "Sheen",
		nameAr: "شِين",
		harakatForms: {
			fatha: "شَ (Sha)",
			kasra: "شِ (Shi)",
			damma: "شُ (Shu)",
			phonetic: "sha / shi / shu"
		},
		makhrajTip: {
			en: "Middle of the tongue with a soft spreading breath (Tafasshi - \"sh\").",
			hi: "ज़ुबान के बीच से हवा फैलने की नरम आवाज़ (\"श\") के साथ पढ़ें।",
			ur: "زبان کے درمیان سے ہوا پھیلنے کی صفت (تفشی) کے ساتھ ادا کریں۔",
			hinglish: "Middle tongue se soft spreading \"Sh\" sound nikalein.",
			ar: "من وسط اللسان مع صفة التفشي."
		},
		quranExampleWord: "وَٱلشَّمْسِ وَضُحَىٰهَا",
		quranExampleTranslit: "Wash-shamsi wa duhaaha",
		quranExampleMeaning: {
			en: "By the sun and its brightness (91:1)",
			hi: "सूरज और उसकी धूप की क़सम (91:1)",
			ur: "سورج اور اس کی دھوپ کی قسم (91:1)",
			hinglish: "Suraj aur uski roshni ki qasam (91:1)",
			ar: "وَالشَّمْسِ وَضُحَاهَا"
		},
		quranAyahRef: "91:1",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6044.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 14,
		id: "qaida_14_saad",
		letterArabic: "ص",
		nameEn: "Saad",
		nameAr: "صَاد",
		harakatForms: {
			fatha: "صَ (Saa)",
			kasra: "صِ (Sii)",
			damma: "صُ (Suu)",
			phonetic: "heavy s"
		},
		makhrajTip: {
			en: "Heavy, full-mouth \"S\" sound with raised back of the tongue (Tafkheem).",
			hi: "मुंह भर कर मोटी आवाज़ में \"स़ाद\" अदा करें (सीन से अलग)।",
			ur: "منہ بھر کر پر (موٹی) آواز میں صاد ادا کریں۔",
			hinglish: "Full-mouth heavy \"Saad\" sound ke saath padhein.",
			ar: "من طرف اللسان مع الاستعلاء والإطباق والصفير."
		},
		quranExampleWord: "ٱللَّهُ ٱلصَّمَدُ",
		quranExampleTranslit: "Allahus-Samad",
		quranExampleMeaning: {
			en: "Allah, the Eternal Refuge (112:2)",
			hi: "अल्लाह बेनियाज़ है (112:2)",
			ur: "اللّٰہ بے نیاز ہے (112:2)",
			hinglish: "Allah Be-niyaz Maalik hai (112:2)",
			ar: "اللَّهُ الصَّمَدُ"
		},
		quranAyahRef: "112:2",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6223.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 15,
		id: "qaida_15_daad",
		letterArabic: "ض",
		nameEn: "Daad",
		nameAr: "ضَاد",
		harakatForms: {
			fatha: "ضَ (Daa)",
			kasra: "ضِ (Dii)",
			damma: "ضُ (Duu)",
			phonetic: "heavy d"
		},
		makhrajTip: {
			en: "Side of the tongue pressing against the upper molars with heavy resonance.",
			hi: "ज़ुबान की करवट (किनारे) को ऊपर की दाढ़ों से लगाकर मोटा पढ़ें।",
			ur: "زبان کی کروٹ کو اوپر کی داڑھوں سے لگا کر پر پڑھیں۔",
			hinglish: "Side of tongue ko upper molars se touch karke heavy sound nikalein.",
			ar: "من حافة اللسان مع ما يحاذيها من الأضراس العليا."
		},
		quranExampleWord: "وَلَا ٱلضَّآلِّينَ",
		quranExampleTranslit: "Wa-lad-Daalleen",
		quranExampleMeaning: {
			en: "Nor of those who went astray (1:7)",
			hi: "और न ही गुमराह होने वालों का (1:7)",
			ur: "اور نہ ہی گمراہ ہونے والوں کا (1:7)",
			hinglish: "Aur na hi bhatakne walon ka (1:7)",
			ar: "وَلَا الضَّالِّينَ"
		},
		quranAyahRef: "1:7",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 16,
		id: "qaida_16_taa_heavy",
		letterArabic: "ط",
		nameEn: "Taa (Heavy)",
		nameAr: "طَاء",
		harakatForms: {
			fatha: "طَ (Taa)",
			kasra: "طِ (Tii)",
			damma: "طُ (Tuu)",
			phonetic: "heavy t"
		},
		makhrajTip: {
			en: "Strongest heavy letter (Tafkheem) with Qalqalah when silent.",
			hi: "ज़ुबान की नोक और ऊपर के दांतों की जड़ से बहुत मोटी आवाज़ में अदा करें।",
			ur: "سب سے قوی تفخیم والا حرف؛ ساکن ہونے پر قلقلہ کریں۔",
			hinglish: "Full-mouth heavy \"T\" sound; sukoon par Qalqalah karein.",
			ar: "أقوى الحروف تفخيماً وإطباقاً مع القلقلة عند السكون."
		},
		quranExampleWord: "ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
		quranExampleTranslit: "As-Siraatal-Mustaqeem",
		quranExampleMeaning: {
			en: "The Straight Path (1:6)",
			hi: "सीधा और सच्चा रास्ता (1:6)",
			ur: "سیدھا اور سچا راستہ (1:6)",
			hinglish: "Seedha aur sacha raasta (1:6)",
			ar: "الصِّرَاطَ الْمُسْتَقِيمَ"
		},
		quranAyahRef: "1:6",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 17,
		id: "qaida_17_zaa_heavy",
		letterArabic: "ظ",
		nameEn: "Zaa (Heavy)",
		nameAr: "ظَاء",
		harakatForms: {
			fatha: "ظَ (Zaa)",
			kasra: "ظِ (Zii)",
			damma: "ظُ (Zuu)",
			phonetic: "heavy dh"
		},
		makhrajTip: {
			en: "Tip of the tongue at upper teeth edge like Dhaal, but pronounced heavy and full-mouth.",
			hi: "ज़ुबान की नोक को दांतों के किनारे से लगाकर मोटी आवाज़ में अदा करें।",
			ur: "زبان کی نوک کو دانتوں کے کنارے سے لگا کر پر (موٹا) پڑھیں۔",
			hinglish: "Tongue tip at upper teeth edge with full-mouth heavy tone.",
			ar: "من طرف اللسان مع أطراف الثنايا العليا مع التفخيم والإطباق."
		},
		quranExampleWord: "أَنقَضَ ظَهْرَكَ",
		quranExampleTranslit: "Anqada Zahrak",
		quranExampleMeaning: {
			en: "Which weighed heavily on your back (94:3)",
			hi: "जिसने आपकी कमर पर बोझ डाल रखा था (94:3)",
			ur: "جس نے آپ کی کمر پر بوجھ ڈال رکھا تھا (94:3)",
			hinglish: "Jisne aapki kamar par bojh daal rakha tha (94:3)",
			ar: "أَنْقَضَ ظَهْرَكَ"
		},
		quranAyahRef: "94:3",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6093.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 18,
		id: "qaida_18_ayn",
		letterArabic: "ع",
		nameEn: "Ayn",
		nameAr: "عَيْن",
		harakatForms: {
			fatha: "عَ ('A)",
			kasra: "عِ ('I)",
			damma: "عُ ('U)",
			phonetic: "'a / 'i / 'u"
		},
		makhrajTip: {
			en: "Deep, resonant sound from the middle of the throat.",
			hi: "गले के बीच के हिस्से को हल्का दबाकर साफ़ \"ऐन\" अदा करें।",
			ur: "حلق کے درمیانی حصے سے واضح عین ادا کریں۔",
			hinglish: "Middle throat se deep clear \"Ayn\" sound nikalein.",
			ar: "من وسط الحلق مع التوسط والبيان."
		},
		quranExampleWord: "إِيَّاكَ نَعْبُدُ",
		quranExampleTranslit: "Iyyaka Na'budu",
		quranExampleMeaning: {
			en: "You alone we worship (1:5)",
			hi: "हम सिर्फ़ तेरी ही इबादत करते हैं (1:5)",
			ur: "ہم صرف تیری ہی عبادت کرتے ہیں (1:5)",
			hinglish: "Hum sirf Teri hi ibadat karte hain (1:5)",
			ar: "إِيَّاكَ نَعْبُدُ"
		},
		quranAyahRef: "1:5",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 19,
		id: "qaida_19_ghayn",
		letterArabic: "غ",
		nameEn: "Ghayn",
		nameAr: "غَيْن",
		harakatForms: {
			fatha: "غَ (Gha)",
			kasra: "غِ (Ghi)",
			damma: "غُ (Ghu)",
			phonetic: "gha / ghi / ghu"
		},
		makhrajTip: {
			en: "Smooth, heavy sound from the upper throat.",
			hi: "गले के ऊपरी हिस्से से मोटी और नरम आवाज़ में \"ग़ैन\" अदा करें।",
			ur: "حلق کے اوپری حصے سے پر (موٹا) کر کے غین ادا کریں۔",
			hinglish: "Upper throat se smooth heavy \"Gh\" sound nikalein.",
			ar: "من أدنى الحلق مع الرخاوة والتفخيم."
		},
		quranExampleWord: "غَيْرِ ٱلْمَغْضُوبِ",
		quranExampleTranslit: "Ghayril-Maghdoobi",
		quranExampleMeaning: {
			en: "Not of those who earned wrath (1:7)",
			hi: "न कि उन लोगों का जिन पर ग़ज़ब हुआ (1:7)",
			ur: "نہ کہ ان لوگوں کا جن پر غضب ہوا (1:7)",
			hinglish: "Na ki un logon ka jin par naraazgi hui (1:7)",
			ar: "غَيْرِ الْمَغْضُوبِ"
		},
		quranAyahRef: "1:7",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 20,
		id: "qaida_20_faa",
		letterArabic: "ف",
		nameEn: "Faa",
		nameAr: "فَاء",
		harakatForms: {
			fatha: "فَ (Fa)",
			kasra: "فِ (Fi)",
			damma: "فُ (Fu)",
			phonetic: "fa / fi / fu"
		},
		makhrajTip: {
			en: "Edges of upper front teeth lightly touching the inside of the lower lip.",
			hi: "ऊपर के दांतों के किनारे को नीचे के होंठ के अंदरूनी हिस्से से लगाएं।",
			ur: "اوپر کے دانتوں کے کنارے کو نیچے کے ہونٹ کے اندرونی حصے سے لگائیں۔",
			hinglish: "Upper teeth edge ko lower lip ke andar touch karein.",
			ar: "من أطراف الثنايا العليا مع بطن الشفة السفلى."
		},
		quranExampleWord: "فَصَلِّ لِرَبِّكَ",
		quranExampleTranslit: "Fa-salli Li-Rabbika",
		quranExampleMeaning: {
			en: "So pray to your Lord (108:2)",
			hi: "तो अपने रब के लिए नमाज़ पढ़िए (108:2)",
			ur: "پس اپنے رب کے لیے نماز پڑھیے (108:2)",
			hinglish: "Toh apne Rabb ke liye Namaz padhiye (108:2)",
			ar: "فَصَلِّ لِرَبِّكَ"
		},
		quranAyahRef: "108:2",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6206.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 21,
		id: "qaida_21_qaaf",
		letterArabic: "ق",
		nameEn: "Qaaf",
		nameAr: "قَاف",
		harakatForms: {
			fatha: "قَ (Qa)",
			kasra: "قِ (Qi)",
			damma: "قُ (Qu)",
			phonetic: "deep q"
		},
		makhrajTip: {
			en: "Deepest back of the tongue touching the soft palate; heavy with Qalqalah when silent.",
			hi: "ज़ुबान की जड़ को नरम तालू से लगाकर मोटा \"क़ाफ़\" पढ़ें (क़लक़ला के साथ)।",
			ur: "زبان کی جڑ کو نرم تالو سے لگا کر موٹا قاف ادا کریں۔",
			hinglish: "Back of tongue se deep heavy \"Qaaf\" padhein; Qalqalah letter.",
			ar: "من أقصى اللسان مع الحنك اللحمي مع التفخيم والقلقلة."
		},
		quranExampleWord: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
		quranExampleTranslit: "Qul Huwallahu Ahad",
		quranExampleMeaning: {
			en: "Say: He is Allah, the One (112:1)",
			hi: "कहिए: वह अल्लाह एक है (112:1)",
			ur: "کہیے: وہ اللّٰہ ایک ہے (112:1)",
			hinglish: "Kahiye: Woh Allah Ek hai (112:1)",
			ar: "قُلْ هُوَ اللَّهُ أَحَدٌ"
		},
		quranAyahRef: "112:1",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 22,
		id: "qaida_22_kaaf",
		letterArabic: "ك",
		nameEn: "Kaaf",
		nameAr: "كَاف",
		harakatForms: {
			fatha: "كَ (Ka)",
			kasra: "كِ (Ki)",
			damma: "كُ (Ku)",
			phonetic: "ka / ki / ku"
		},
		makhrajTip: {
			en: "Light \"k\" sound slightly forward from Qaaf, with a gentle breath release (Hams).",
			hi: "क़ाफ़ से थोड़ा आगे तालू से बारीक और साफ़ \"काफ़\" अदा करें।",
			ur: "قاف سے ذرا آگے تالو سے باریک کاف ادا کریں۔",
			hinglish: "Light \"K\" sound (Qaaf se halka aur aage).",
			ar: "من أقصى اللسان أسفل مخرج القاف قليلاً مع الترقيق والهمس."
		},
		quranExampleWord: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ",
		quranExampleTranslit: "Wa-lam yakul-lahu kufuwan ahad",
		quranExampleMeaning: {
			en: "And there is none comparable to Him (112:4)",
			hi: "और कोई उसके बराबर नहीं है (112:4)",
			ur: "اور کوئی اس کے برابر نہیں ہے (112:4)",
			hinglish: "Aur koi Uske barabar nahi hai (112:4)",
			ar: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ"
		},
		quranAyahRef: "112:4",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 23,
		id: "qaida_23_laam",
		letterArabic: "ل",
		nameEn: "Laam",
		nameAr: "لَام",
		harakatForms: {
			fatha: "لَ (La)",
			kasra: "لِ (Li)",
			damma: "لُ (Lu)",
			phonetic: "la / li / lu"
		},
		makhrajTip: {
			en: "Front edge of the tongue touching the upper gums.",
			hi: "ज़ुबान के अगले किनारे को ऊपर के मसूड़ों से लगाकर अदा करें।",
			ur: "زبان کے اگلے کنارے کو اوپر کے مسوڑھوں سے لگائیں۔",
			hinglish: "Front edge of tongue touching upper gums.",
			ar: "من أدنى حافتي اللسان إلى منتهى طرفه مع اللثة العليا."
		},
		quranExampleWord: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
		quranExampleTranslit: "Lam yalid wa-lam yoolad",
		quranExampleMeaning: {
			en: "He neither begets nor is born (112:3)",
			hi: "न उसने किसी को जना और न वह जना गया (112:3)",
			ur: "نہ اس نے کسی کو جنا اور نہ وہ جنا گیا (112:3)",
			hinglish: "Na Usne kisi ko jana aur na Woh paida hua (112:3)",
			ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ"
		},
		quranAyahRef: "112:3",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6224.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 24,
		id: "qaida_24_meem",
		letterArabic: "م",
		nameEn: "Meem",
		nameAr: "مِيم",
		harakatForms: {
			fatha: "مَ (Ma)",
			kasra: "مِ (Mi)",
			damma: "مُ (Mu)",
			phonetic: "ma / mi / mu"
		},
		makhrajTip: {
			en: "Close both lips gently; hold nasal Ghunnah for 2 beats when Meem has Shaddah (مّ).",
			hi: "दोनों होंठ मिलाकर पढ़ें; तश्दीद (مّ) होने पर 2 हरकत ग़ुन्ना करें।",
			ur: "دونوں ہونٹ ملا کر پڑھیں؛ تشدید (مّ) پر دو حرکت غنہ کریں۔",
			hinglish: "Both lips close karein; Meem Mushaddadah (مّ) par 2 beats Ghunnah karein.",
			ar: "من انطباق الشفتين مع الغنة في الخيشوم."
		},
		quranExampleWord: "مَلِكِ ٱلنَّاسِ",
		quranExampleTranslit: "Malikin-Naas",
		quranExampleMeaning: {
			en: "The Sovereign King of Mankind (114:2)",
			hi: "इंसानों का बादशाह (114:2)",
			ur: "انسانوں کا بادشاہ (114:2)",
			hinglish: "Insanon ka Badshah (114:2)",
			ar: "مَلِكِ النَّاسِ"
		},
		quranAyahRef: "114:2",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6232.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 25,
		id: "qaida_25_noon",
		letterArabic: "ن",
		nameEn: "Noon",
		nameAr: "نُون",
		harakatForms: {
			fatha: "نَ (Na)",
			kasra: "نِ (Ni)",
			damma: "نُ (Nu)",
			phonetic: "na / ni / nu"
		},
		makhrajTip: {
			en: "Tip of the tongue against upper gums with natural nasal resonance; 2 beats Ghunnah on نّ.",
			hi: "ज़ुबान की नोक को मसूड़ों से लगाएं; नून मुशद्दद (نّ) पर 2 हरकत ग़ुन्ना करें।",
			ur: "زبان کی نوک کو مسوڑھوں سے لگائیں؛ نون مشدد (نّ) پر دو حرکت غنہ کریں۔",
			hinglish: "Tongue tip at upper gums; Noon Mushaddadah (نّ) par 2 beats Ghunnah karein.",
			ar: "من طرف اللسان مع اللثة العليا ومصاحبة الغنة من الخيشوم."
		},
		quranExampleWord: "إِنَّآ أَعْطَيْنَـٰكَ ٱلْكَوْثَرَ",
		quranExampleTranslit: "Innaa A'taynaakal-Kawthar",
		quranExampleMeaning: {
			en: "Indeed, We have granted you Al-Kawthar (108:1)",
			hi: "बेशक हमने आपको कौसर अता किया (108:1)",
			ur: "بے شک ہم نے آپ کو کوثر عطا کیا (108:1)",
			hinglish: "Beshak Humne aapko Al-Kawthar ata kiya (108:1)",
			ar: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ"
		},
		quranAyahRef: "108:1",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6205.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 26,
		id: "qaida_26_haa_soft",
		letterArabic: "ه",
		nameEn: "Haa (Deep Chest)",
		nameAr: "هَاء",
		harakatForms: {
			fatha: "هَ (Ha)",
			kasra: "هِ (Hi)",
			damma: "هُ (Hu)",
			phonetic: "soft ha"
		},
		makhrajTip: {
			en: "Gentle breath from the lowest part of the throat near the chest.",
			hi: "सीने की तरफ़ गले के सबसे निचले हिस्से से नरम \"हा\" अदा करें।",
			ur: "حلق کے سب سے نچلے حصے (سینے کی طرف) سے ہاء ادا کریں۔",
			hinglish: "Lowest throat (chest ke paas) se soft \"H\" sound nikalein.",
			ar: "من أقصى الحلق مما يلي الصدر."
		},
		quranExampleWord: "إِلَـٰهِ ٱلنَّاسِ",
		quranExampleTranslit: "Ilaahin-Naas",
		quranExampleMeaning: {
			en: "The God of Mankind (114:3)",
			hi: "इंसानों का माबूद (114:3)",
			ur: "انسانوں کا معبود (114:3)",
			hinglish: "Insanon ka سچا Ma’bood (114:3)",
			ar: "إِلَٰهِ النَّاسِ"
		},
		quranAyahRef: "114:3",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6233.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 27,
		id: "qaida_27_waaw",
		letterArabic: "و",
		nameEn: "Waaw",
		nameAr: "وَاو",
		harakatForms: {
			fatha: "وَ (Wa)",
			kasra: "وِ (Wi)",
			damma: "وُ (Wu)",
			phonetic: "wa / wi / wu"
		},
		makhrajTip: {
			en: "Round both lips into a circle without biting the lower lip.",
			hi: "दोनों होंठों को गोल करके \"वाव\" अदा करें (दांत होंठ पर न लगें)।",
			ur: "دونوں ہونٹوں کو گول کر کے واو ادا کریں۔",
			hinglish: "Dono lips ko round circle bana kar \"Waaw\" padhein.",
			ar: "بانضمام الشفتين إلى الأمام مع بقاء فرجة يمر منها الصوت."
		},
		quranExampleWord: "وَٱلْعَصْرِ",
		quranExampleTranslit: "Wal-'Asr",
		quranExampleMeaning: {
			en: "By Time (Surah Al-Asr 103:1)",
			hi: "ज़माने (वक्त) की क़सम (103:1)",
			ur: "زمانے (وقت) کی قسم (103:1)",
			hinglish: "Waqt (Time) ki qasam (103:1)",
			ar: "وَالْعَصْرِ"
		},
		quranAyahRef: "103:1",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6177.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	},
	{
		number: 28,
		id: "qaida_28_yaa",
		letterArabic: "ي",
		nameEn: "Yaa",
		nameAr: "يَاء",
		harakatForms: {
			fatha: "يَ (Ya)",
			kasra: "يِ (Yi)",
			damma: "يُ (Yu)",
			phonetic: "ya / yi / yu"
		},
		makhrajTip: {
			en: "Middle of the tongue gently raised toward the roof of the mouth.",
			hi: "ज़ुबान के बीच के हिस्से को तालू की तरफ़ उठाकर नरमी से \"या\" पढ़ें।",
			ur: "زبان کے درمیانی حصے سے نرمی کے ساتھ یاء ادا کریں۔",
			hinglish: "Middle of tongue ko roof of mouth ke paas raise karke padhein.",
			ar: "من وسط اللسان مع ما يحاذيه من الحنك الأعلى."
		},
		quranExampleWord: "يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا",
		quranExampleTranslit: "Yawma-idhin tuhaddithu akhbaarahaa",
		quranExampleMeaning: {
			en: "That Day it will report its news (99:4)",
			hi: "उस दिन ज़मीन अपनी सारी ख़बरें बयान कर देगी (99:4)",
			ur: "اس دن زمین اپنی ساری خبریں بیان کر دے گی (99:4)",
			hinglish: "Us din zameen apni saari khabrein bayan kar degi (99:4)",
			ar: "يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا"
		},
		quranAyahRef: "99:4",
		humanAudioMp3Url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6142.mp3",
		reciterName: "Sheikh Mishary Rashid Alafasy"
	}
];
/**
* Map of isolated offline letter pronunciation MP3 paths bundled under /public/assets/audio/qaida/
*/
var QAIDA_ISOLATED_LETTER_AUDIO_SLUG = {
	qaida_01_alif: "alif",
	qaida_02_baa: "ba",
	qaida_03_taa: "ta",
	qaida_04_thaa: "tha",
	qaida_05_jeem: "jeem",
	qaida_06_haa_sharp: "haa",
	qaida_07_khaa: "kha",
	qaida_08_daal: "dal",
	qaida_09_dhaal: "dhal",
	qaida_10_raa: "ra",
	qaida_11_zaay: "zay",
	qaida_12_seen: "seen",
	qaida_13_sheen: "sheen",
	qaida_14_saad: "sad",
	qaida_15_daad: "dad",
	qaida_16_taa_heavy: "tah",
	qaida_17_zaa_heavy: "zah",
	qaida_18_ayn: "ayn",
	qaida_19_ghayn: "ghayn",
	qaida_20_faa: "fa",
	qaida_21_qaaf: "qaf",
	qaida_22_kaaf: "kaf",
	qaida_23_laam: "lam",
	qaida_24_meem: "meem",
	qaida_25_noon: "noon",
	qaida_26_haa_soft: "ha",
	qaida_27_waaw: "waw",
	qaida_28_yaa: "ya"
};
var NOORANI_QAIDA_28_LETTERS = RAW_NOORANI_QAIDA_28_LETTERS.map((item) => {
	const slug = QAIDA_ISOLATED_LETTER_AUDIO_SLUG[item.id] || "alif";
	return {
		...item,
		letterAudioMp3Url: `/assets/audio/qaida/${slug}.mp3`
	};
});
/**
* Plays a Noorani Qaida letter using either:
* - 'letter' (default): The genuine isolated Arabic letter pronunciation MP3 (/assets/audio/qaida/<letter>.mp3)
* - 'quran_example': Sheikh Mishary Rashid Alafasy reciting the Quranic example Ayah
*/
function playQaidaLetterHumanAudio(params) {
	const mode = params.mode || "letter";
	const isOffline = typeof navigator !== "undefined" && navigator.onLine === false;
	const targetUrl = mode === "quran_example" ? isOffline ? void 0 : params.letter.humanAudioMp3Url : params.letter.letterAudioMp3Url;
	audioManager.playAudioUrl({
		id: `qaida_human_${mode}_${params.letter.id}`,
		url: targetUrl,
		allowTtsFallback: false,
		offlineUnavailableMessage: mode === "quran_example" ? "Quran example audio requires internet or downloading the Surah in Storage Hub." : "Offline letter audio asset unavailable.",
		rate: params.rate || 1,
		onError: (msg) => {
			if (params.onStatus) params.onStatus(msg);
		}
	});
	if (params.onStatus && (mode === "letter" || !isOffline)) params.onStatus(mode === "quran_example" ? `Playing Quran Word Example (${params.letter.quranAyahRef}) — ${params.letter.reciterName}` : `Playing Arabic Letter Pronunciation: ${params.letter.nameEn} (${params.letter.nameAr})`);
}
// src/services/studioAudioAndTajweedService.ts
function buildQaidaSyllableCacheKey(arabicText) {
	return `qaida_syl:${arabicText.trim()}`;
}
function buildWbwAudioCacheKey(wbwWordPath) {
	return `wbw:${wbwWordPath.trim()}`;
}
function collectAllQaidaWbwPaths(lessons) {
	const seen = /* @__PURE__ */ new Set();
	const paths = [];
	for (const lesson of lessons) for (const tile of lesson.tiles) if (tile.wbwWordPath && !seen.has(tile.wbwWordPath)) {
		seen.add(tile.wbwWordPath);
		paths.push(tile.wbwWordPath);
	}
	return paths;
}
function base64ToBlob(base64, mimeType = "audio/wav") {
	return base64ToAudioBlob(base64, mimeType);
}
function blobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const result = typeof reader.result === "string" ? reader.result : "";
			const commaIdx = result.indexOf(",");
			resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
		};
		reader.onerror = () => reject(reader.error || /* @__PURE__ */ new Error("Failed to encode audio blob"));
		reader.readAsDataURL(blob);
	});
}
async function deleteRecordFromStore(storeName, key) {
	try {
		const db = await openStudioAudioDatabase();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(storeName, "readwrite");
			tx.objectStore(storeName).delete(key);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
		db.close();
	} catch {}
}
async function getRecordFromStore(storeName, key) {
	try {
		const db = await openStudioAudioDatabase();
		const record = await new Promise((resolve, reject) => {
			const req = db.transaction(storeName, "readonly").objectStore(storeName).get(key);
			req.onsuccess = () => resolve(req.result || null);
			req.onerror = () => reject(req.error);
		});
		db.close();
		if (!record?.blob) return null;
		if (!(await verifyAudioBlobIntegrity(record.blob, record.checksumSha256)).valid) {
			await deleteRecordFromStore(storeName, key);
			return null;
		}
		return record;
	} catch {
		return null;
	}
}
async function putRecordInStore(storeName, key, blob) {
	try {
		const integrity = await verifyAudioBlobIntegrity(blob);
		if (!integrity.valid) return false;
		const db = await openStudioAudioDatabase();
		const record = {
			key,
			mimeType: blob.type || "audio/wav",
			blob,
			savedAtIso: (/* @__PURE__ */ new Date()).toISOString(),
			bytes: blob.size,
			checksumSha256: integrity.checksumSha256,
			contentVersion: "v1"
		};
		await new Promise((resolve, reject) => {
			const tx = db.transaction(storeName, "readwrite");
			tx.objectStore(storeName).put(record);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
			tx.onabort = () => reject(tx.error || /* @__PURE__ */ new Error("Audio write aborted"));
		});
		db.close();
		return true;
	} catch {
		return false;
	}
}
async function listKeysInStore(storeName) {
	try {
		const db = await openStudioAudioDatabase();
		const keys = await new Promise((resolve, reject) => {
			const req = db.transaction(storeName, "readonly").objectStore(storeName).getAllKeys();
			req.onsuccess = () => resolve(Array.isArray(req.result) ? req.result.map((k) => String(k)) : []);
			req.onerror = () => reject(req.error);
		});
		db.close();
		return keys;
	} catch {
		return [];
	}
}
async function fetchOrGetCachedQaidaSyllable(params) {
	const key = buildQaidaSyllableCacheKey(params.arabicText);
	const cached = await getRecordFromStore(STORE_QAIDA_AUDIO, key);
	if (cached?.blob && cached.blob.size > 0) return {
		ok: true,
		blobUrl: URL.createObjectURL(cached.blob),
		fromCache: true
	};
	if (typeof navigator !== "undefined" && navigator.onLine === false) return {
		ok: false,
		error: "Offline — connect to the internet once to save Ustad Qaida syllable audio."
	};
	try {
		const res = await fetch(resolveApiEndpoint("/api/ai/qaida-syllable"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				arabicText: params.arabicText,
				label: params.label || ""
			})
		});
		const data = await res.json().catch(() => ({}));
		if (!res.ok || !data.ok || !data.base64Audio) return {
			ok: false,
			error: data.error || "Qaida Studio syllable audio unavailable."
		};
		const wavBlob = base64ToBlob(data.base64Audio, data.mimeType || "audio/wav");
		if (!await putRecordInStore("qaida_audio", key, wavBlob)) return {
			ok: false,
			error: "Downloaded Qaida audio failed integrity check."
		};
		return {
			ok: true,
			blobUrl: URL.createObjectURL(wavBlob),
			fromCache: false
		};
	} catch {
		return {
			ok: false,
			error: "Offline — Qaida syllable not cached yet."
		};
	}
}
async function getOfflineQaidaWbwStatus(wbwPaths) {
	const existingKeys = new Set(await listKeysInStore(STORE_WBW_AUDIO));
	let cachedCount = 0;
	for (const path of wbwPaths) if (existingKeys.has(buildWbwAudioCacheKey(path))) cachedCount += 1;
	return {
		cachedCount,
		totalCount: wbwPaths.length
	};
}
async function resolveWbwAudioUrlOrCached(wbwWordPath) {
	const cached = await getRecordFromStore(STORE_WBW_AUDIO, buildWbwAudioCacheKey(wbwWordPath));
	if (cached?.blob && cached.blob.size > 0) return {
		url: URL.createObjectURL(cached.blob),
		isOfflineCached: true
	};
	if (typeof navigator !== "undefined" && navigator.onLine === false) return {
		url: "",
		isOfflineCached: false,
		offlineUncached: true,
		error: "Offline — download the Qaida Word-by-Word Audio Pack to listen without internet."
	};
	return {
		url: `https://audio.qurancdn.com/${wbwWordPath}`,
		isOfflineCached: false
	};
}
async function downloadQaidaOfflineWbwPack(params) {
	const existingKeys = new Set(await listKeysInStore(STORE_WBW_AUDIO));
	let completed = 0;
	const total = params.wbwPaths.length;
	for (const wbwPath of params.wbwPaths) {
		if (params.signal?.aborted) return {
			ok: false,
			completed,
			total,
			error: "Download cancelled."
		};
		const key = buildWbwAudioCacheKey(wbwPath);
		if (existingKeys.has(key)) {
			completed += 1;
			params.onProgress?.({
				completed,
				total
			});
			continue;
		}
		try {
			const response = await fetch(`https://audio.qurancdn.com/${wbwPath}`, { signal: params.signal });
			if (!response.ok) return {
				ok: false,
				completed,
				total,
				error: `Could not fetch Qari word clip (${response.status}).`
			};
			if (!await putRecordInStore("wbw_audio", key, await response.blob())) return {
				ok: false,
				completed,
				total,
				error: `Downloaded Qari word clip failed integrity check (${wbwPath}).`
			};
			completed += 1;
			params.onProgress?.({
				completed,
				total
			});
		} catch {
			return {
				ok: false,
				completed,
				total,
				error: "Network error while saving offline Qaida Qari word audio."
			};
		}
	}
	return {
		ok: true,
		completed,
		total
	};
}
async function analyzeRecitationWithAiTajweed(params) {
	if (typeof navigator !== "undefined" && navigator.onLine === false) return {
		ok: false,
		error: "You appear to be offline. Live AI Tajweed & Harakat analysis requires an internet connection."
	};
	if (!params.audioBlob || params.audioBlob.size < 256) return {
		ok: false,
		error: "Recording is too short. Please hold/record your recitation clearly for at least 1 second."
	};
	try {
		const audioBase64 = await blobToBase64(params.audioBlob);
		const res = await fetch(resolveApiEndpoint("/api/ai/tajweed-check"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				audioBase64,
				mimeType: params.audioBlob.type || "audio/webm",
				targetArabic: params.targetArabic,
				targetTransliteration: params.targetTransliteration || "",
				uiLanguage: params.uiLanguage,
				mode: params.mode
			})
		});
		const data = await res.json().catch(() => ({}));
		if (!res.ok || !data.ok || !data.result) return {
			ok: false,
			error: data.error || "AI Tajweed Coach is unavailable right now. Check your internet connection."
		};
		const r = data.result;
		return {
			ok: true,
			result: {
				overallScore: Math.max(0, Math.min(100, Math.round(Number(r.overallScore) || 0))),
				accuracyLabel: String(r.accuracyLabel || "Reviewed"),
				transcriptArabic: String(r.transcriptArabic || ""),
				feedbackSummary: String(r.feedbackSummary || ""),
				makhrajTip: String(r.makhrajTip || ""),
				wordFeedback: Array.isArray(r.wordFeedback) ? r.wordFeedback.map((w) => ({
					word: String(w.word || ""),
					status: w.status === "correct" || w.status === "harakat_issue" || w.status === "makhraj_issue" || w.status === "missed" ? w.status : "correct",
					note: String(w.note || "")
				})) : []
			}
		};
	} catch {
		return {
			ok: false,
			error: "You appear to be offline. Live AI Tajweed & Harakat analysis requires internet."
		};
	}
}
export { scheduleStarterStoriesWarmup as C, resolveStoryPageHumanAudio as S, storyAudioPrefetchManager as T, clearAllCachedStoryAudio as _, getOfflineQaidaWbwStatus as a, listAllCachedStoryAudioMetadata as b, clearOfflineDuaAudioPack as c, playHumanDuaAudio as d, playQaidaLetterHumanAudio as f, buildStoryAudioCacheKey as g, STORE_WBW_AUDIO as h, fetchOrGetCachedQaidaSyllable as i, downloadDuaOfflineAudioPack as l, STORE_QAIDA_AUDIO as m, collectAllQaidaWbwPaths as n, resolveWbwAudioUrlOrCached as o, resolveDuaHumanAudio as p, downloadQaidaOfflineWbwPack as r, NOORANI_QAIDA_28_LETTERS as s, analyzeRecitationWithAiTajweed as t, getOfflineDuaAudioStatus as u, formatAudioCacheSizeMb as v, scheduleStoryReaderLookahead as w, openStudioAudioDatabase as x, getStoryLibraryCacheSummary as y };
