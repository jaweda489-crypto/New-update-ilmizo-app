import { a as __toESM } from "./rolldown-runtime-DQp2zzRu.js";
import { C as ShieldCheck, Ft as require_react, I as Pause, N as Play, O as RotateCcw, T as Share2, Y as HardDrive, d as Trash2, ft as CircleX, ht as CircleAlert, l as Upload, lt as Copy, mt as CircleCheck, o as Volume2, ot as Download, st as Database, tt as FileJson } from "./vendor-icons-DCckKQxi.js";
import { i as require_jsx_runtime } from "./vendor-motion-DfqbQRzE.js";
import { I as listOfflineAudioRecords, b as getSurahOfflineAvailability, g as ALL_114_SURAHS, i as KIDS_STORIES, l as VERIFIED_DUAS, v as VERIFIED_RECITER_EDITIONS } from "./data-islamic-content-DVwdNHPG.js";
import { Dt as quranOfflineManager, Et as TOTAL_QURAN_AYAHS, G as importEncryptedSyncBundle, W as exportEncryptedSyncBundle, kt as verifyInstalledOfflineQuran, ot as SelectSheetField, v as useIlmizo, wt as audioDownloadManager } from "./index-Dy1fifCC.js";
import { b as listAllCachedStoryAudioMetadata, c as clearOfflineDuaAudioPack, g as buildStoryAudioCacheKey, h as STORE_WBW_AUDIO, l as downloadDuaOfflineAudioPack, m as STORE_QAIDA_AUDIO, n as collectAllQaidaWbwPaths, p as resolveDuaHumanAudio, s as NOORANI_QAIDA_28_LETTERS, u as getOfflineDuaAudioStatus, x as openStudioAudioDatabase } from "./studioAudioAndTajweedService-DF0oWwfx.js";
import { n as NOORANI_QAIDA_COURSE_LESSONS } from "./nooraniQaidaCourse-DdAqOF7e.js";
// src/services/audioManifestService.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
async function listStoreMetadataKeys(storeName) {
	const result = /* @__PURE__ */ new Map();
	try {
		const db = await openStudioAudioDatabase();
		await new Promise((resolve, reject) => {
			const req = db.transaction(storeName, "readonly").objectStore(storeName).openCursor();
			req.onsuccess = () => {
				const cursor = req.result;
				if (!cursor) {
					resolve();
					return;
				}
				const rec = cursor.value;
				if (rec?.key && rec?.blob && rec.blob.size >= 44) result.set(String(rec.key), {
					bytes: Number(rec.bytes) || rec.blob.size,
					checksumSha256: rec.checksumSha256,
					contentVersion: rec.contentVersion || "v1"
				});
				cursor.continue();
			};
			req.onerror = () => reject(req.error);
		});
		db.close();
	} catch {}
	return result;
}
async function buildUnifiedAudioManifest(params) {
	const language = params?.language || "en";
	const voiceStyle = params?.voiceStyle || "storyteller";
	const includeUninstalled = params?.includeUninstalled !== false;
	const entries = [];
	let estimatedAudioBytes = 0;
	for (const letter of NOORANI_QAIDA_28_LETTERS) entries.push({
		contentId: `qaida_letter_${letter.id}`,
		contentType: "qaida_letter",
		language: "ar",
		voiceOrReciter: "Bundled Arabic Makharij Recording",
		fileIdentifier: letter.letterAudioMp3Url,
		durationSec: 2,
		downloadStatus: "bundled",
		verificationStatus: "verified",
		contentVersion: "v1"
	});
	const qariRecords = await listOfflineAudioRecords();
	const downloadedQariSet = /* @__PURE__ */ new Set();
	for (const rec of qariRecords) {
		const meta = ALL_114_SURAHS.find((s) => s.number === rec.surahNumber);
		const bytes = Number(rec.sizeBytes) || 0;
		estimatedAudioBytes += bytes;
		downloadedQariSet.add(rec.audioKey);
		entries.push({
			contentId: `quran_${rec.editionId}_surah_${rec.surahNumber}`,
			contentType: "quran_recitation",
			language: "ar",
			voiceOrReciter: rec.reciterName || rec.editionId,
			fileIdentifier: `idb://ilmizo_local_db/offline_audio/${rec.audioKey}`,
			durationSec: meta ? meta.ayahCount * 6 : null,
			downloadStatus: "downloaded",
			verificationStatus: rec.checksumSha256 ? "verified" : "unverified",
			contentVersion: "v1",
			sizeBytes: bytes,
			checksumSha256: rec.checksumSha256
		});
	}
	const duaStatus = await getOfflineDuaAudioStatus(VERIFIED_DUAS);
	estimatedAudioBytes += duaStatus.totalBytes;
	const cachedDuaUrls = /* @__PURE__ */ new Set();
	if (typeof caches !== "undefined") try {
		const cache = await caches.open("ilmizo-human-dua-qaida-audio-v1");
		for (const dua of VERIFIED_DUAS) {
			const desc = resolveDuaHumanAudio(dua);
			if (await cache.match(desc.mp3Url)) cachedDuaUrls.add(desc.mp3Url);
		}
	} catch {}
	const seenDuaIds = /* @__PURE__ */ new Set();
	for (const dua of VERIFIED_DUAS) {
		if (seenDuaIds.has(dua.id)) continue;
		seenDuaIds.add(dua.id);
		const desc = resolveDuaHumanAudio(dua);
		const isCached = cachedDuaUrls.has(desc.mp3Url);
		if (!includeUninstalled && !isCached) continue;
		entries.push({
			contentId: `dua_${dua.id}`,
			contentType: "dua_audio",
			language: "ar",
			voiceOrReciter: desc.reciterName,
			fileIdentifier: desc.mp3Url,
			durationSec: null,
			downloadStatus: isCached ? "downloaded" : "not_downloaded",
			verificationStatus: isCached ? "verified" : "unverified",
			contentVersion: "v1"
		});
	}
	const cachedStoryMeta = await listAllCachedStoryAudioMetadata();
	const cachedStoryMap = new Map(cachedStoryMeta.map((m) => [m.key, m]));
	let totalStoryPages = 0;
	let cachedStoryPagesForLang = 0;
	for (const item of cachedStoryMeta) estimatedAudioBytes += item.bytes;
	for (const story of KIDS_STORIES) {
		const pages = story.localizedPages?.[language] || story.pages;
		for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
			totalStoryPages += 1;
			const cacheKey = buildStoryAudioCacheKey(story.id, pageIndex, language, voiceStyle);
			const hit = cachedStoryMap.get(cacheKey);
			if (hit) cachedStoryPagesForLang += 1;
			if (!includeUninstalled && !hit) continue;
			entries.push({
				contentId: cacheKey,
				contentType: "kids_story",
				language,
				voiceOrReciter: voiceStyle === "teacher" ? "Studio Teacher (Zephyr)" : "Studio Storyteller (Kore)",
				fileIdentifier: `idb://ilmizo_studio_audio_db/story_audio/${cacheKey}`,
				durationSec: null,
				downloadStatus: hit ? "downloaded" : "not_downloaded",
				verificationStatus: hit ? "verified" : "unverified",
				contentVersion: hit?.contentVersion || "v1",
				sizeBytes: hit?.bytes,
				checksumSha256: hit?.checksumSha256
			});
		}
	}
	const wbwPaths = collectAllQaidaWbwPaths(NOORANI_QAIDA_COURSE_LESSONS);
	const wbwMeta = await listStoreMetadataKeys(STORE_WBW_AUDIO);
	const qaidaSylMeta = await listStoreMetadataKeys(STORE_QAIDA_AUDIO);
	let cachedWbwCount = 0;
	for (const [, v] of wbwMeta) estimatedAudioBytes += v.bytes;
	for (const [, v] of qaidaSylMeta) estimatedAudioBytes += v.bytes;
	for (const path of wbwPaths) {
		const key = `wbw:${path}`;
		const hit = wbwMeta.get(key);
		if (hit) cachedWbwCount += 1;
		if (!includeUninstalled && !hit) continue;
		entries.push({
			contentId: key,
			contentType: "qaida_wbw",
			language: "ar",
			voiceOrReciter: "Quran.com Word-by-Word Qari",
			fileIdentifier: `https://audio.qurancdn.com/${path}`,
			durationSec: 2,
			downloadStatus: hit ? "downloaded" : "not_downloaded",
			verificationStatus: hit ? "verified" : "unverified",
			contentVersion: hit?.contentVersion || "v1",
			sizeBytes: hit?.bytes,
			checksumSha256: hit?.checksumSha256
		});
	}
	for (const [key, meta] of qaidaSylMeta) entries.push({
		contentId: key,
		contentType: "qaida_syllable",
		language: "ar",
		voiceOrReciter: "Studio Arabic Ustad (Charon)",
		fileIdentifier: `idb://ilmizo_studio_audio_db/qaida_audio/${key}`,
		durationSec: 2,
		downloadStatus: "downloaded",
		verificationStatus: "verified",
		contentVersion: meta.contentVersion || "v1",
		sizeBytes: meta.bytes,
		checksumSha256: meta.checksumSha256
	});
	return {
		generatedAtIso: (/* @__PURE__ */ new Date()).toISOString(),
		contentVersion: "v1",
		summary: {
			bundledQaidaLetters: NOORANI_QAIDA_28_LETTERS.length,
			downloadedQariSurahs: downloadedQariSet.size,
			cachedDuaTracks: duaStatus.cachedTrackCount,
			totalUniqueDuaTracks: duaStatus.uniqueTrackCount,
			cachedStoryPages: cachedStoryPagesForLang,
			totalStoryPages,
			cachedQaidaWbwClips: cachedWbwCount,
			totalQaidaWbwClips: wbwPaths.length,
			cachedQaidaSyllables: qaidaSylMeta.size,
			estimatedAudioBytes
		},
		entries
	};
}
// src/components/pwa/LocalDataManagerCard.tsx
var import_jsx_runtime = require_jsx_runtime();
function formatBytes(bytes) {
	if (!bytes || bytes <= 0) return "0 KB";
	if (bytes < 1024) return `${bytes} B`;
	const kb = bytes / 1024;
	if (kb < 1024) return `${kb.toFixed(1)} KB`;
	return `${(kb / 1024).toFixed(2)} MB`;
}
var LocalDataManagerCard = ({ compact = false }) => {
	const { user, storageMetrics, exportAllDataJson, downloadSurahOffline, deleteOfflineSurah, clearCachedOnlineData, previewBackupImport, applyBackupImport, restorePreImportBackup } = useIlmizo();
	const fileInputRef = (0, import_react.useRef)(null);
	const [selectedSurahToDownload, setSelectedSurahToDownload] = (0, import_react.useState)(36);
	const [selectedJuzToDownload, setSelectedJuzToDownload] = (0, import_react.useState)(30);
	const [selectedQariForDownload, setSelectedQariForDownload] = (0, import_react.useState)(user.reciterName || "Mishary Rashid Alafasy");
	const [selectedAudioSurah, setSelectedAudioSurah] = (0, import_react.useState)(1);
	const [quranDlState, setQuranDlState] = (0, import_react.useState)(quranOfflineManager.getState());
	const [integrityReport, setIntegrityReport] = (0, import_react.useState)(null);
	const [audioDlState, setAudioDlState] = (0, import_react.useState)(audioDownloadManager.getState());
	const [installedAudioSummary, setInstalledAudioSummary] = (0, import_react.useState)({
		totalBytes: 0,
		byReciter: {}
	});
	const [manifestSnapshot, setManifestSnapshot] = (0, import_react.useState)(null);
	const [duaDlProgress, setDuaDlProgress] = (0, import_react.useState)(null);
	const duaAbortRef = (0, import_react.useRef)(null);
	const [busyMessage, setBusyMessage] = (0, import_react.useState)(null);
	const [statusBanner, setStatusBanner] = (0, import_react.useState)(null);
	const [activeHubTab, setActiveHubTab] = (0, import_react.useState)(compact ? "backup" : "quran");
	const refreshManifest = () => {
		buildUnifiedAudioManifest({ language: user.language }).then(setManifestSnapshot);
	};
	(0, import_react.useEffect)(() => {
		const unsubQuran = quranOfflineManager.subscribe(setQuranDlState);
		const unsubAudio = audioDownloadManager.subscribe(setAudioDlState);
		verifyInstalledOfflineQuran().then(setIntegrityReport);
		audioDownloadManager.getInstalledAudioSummary().then(setInstalledAudioSummary);
		refreshManifest();
		return () => {
			unsubQuran();
			unsubAudio();
		};
	}, [
		storageMetrics.downloadedSurahNumbers.length,
		storageMetrics.downloadedAudioKeys.length,
		user.language
	]);
	const [pendingRawJson, setPendingRawJson] = (0, import_react.useState)(null);
	const [importValidation, setImportValidation] = (0, import_react.useState)(null);
	const [showPasteJsonBox, setShowPasteJsonBox] = (0, import_react.useState)(false);
	const [pastedJsonText, setPastedJsonText] = (0, import_react.useState)("");
	const [showEncryptedSyncBox, setShowEncryptedSyncBox] = (0, import_react.useState)(false);
	const [syncPassphrase, setSyncPassphrase] = (0, import_react.useState)("");
	const [pastedSyncCode, setPastedSyncCode] = (0, import_react.useState)("");
	const syncFileInputRef = (0, import_react.useRef)(null);
	const handleCopyEncryptedSyncCode = async () => {
		const jsonStr = exportAllDataJson();
		const res = await exportEncryptedSyncBundle(jsonStr, syncPassphrase);
		if (!res.ok || !res.encryptedContent) {
			setStatusBanner({
				type: "error",
				text: res.error || "Could not generate encrypted sync code."
			});
			return;
		}
		try {
			await navigator.clipboard.writeText(res.encryptedContent);
			setStatusBanner({
				type: "success",
				text: "Encrypted Sync Code copied! Paste it into WhatsApp or on your child’s tablet with the same passphrase."
			});
		} catch {
			setPastedSyncCode(res.encryptedContent);
			setStatusBanner({
				type: "info",
				text: "Clipboard blocked — your encrypted Sync Code is shown below so you can select and copy it manually."
			});
		}
	};
	const handleDecryptPastedSyncCode = async () => {
		if (!pastedSyncCode.trim()) return;
		const decrypted = await importEncryptedSyncBundle(pastedSyncCode, syncPassphrase);
		if (!decrypted.ok || !decrypted.rawBackupJson) {
			setStatusBanner({
				type: "error",
				text: decrypted.error || "Failed to decrypt pasted sync code."
			});
			return;
		}
		const validation = previewBackupImport(decrypted.rawBackupJson);
		setPendingRawJson(decrypted.rawBackupJson);
		setImportValidation(validation);
		if (!validation.valid) setStatusBanner({
			type: "error",
			text: validation.errors.join(" ")
		});
		else setStatusBanner({
			type: "success",
			text: "Encrypted Sync Code decrypted & verified! Review the preview below before confirming restore."
		});
	};
	const handleExportEncryptedSync = async () => {
		const jsonStr = exportAllDataJson();
		const res = await exportEncryptedSyncBundle(jsonStr, syncPassphrase);
		if (!res.ok || !res.encryptedContent) {
			setStatusBanner({
				type: "error",
				text: res.error || "Could not encrypt sync package."
			});
			return;
		}
		const fileName = `ilmizo-family-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.ilmizo-sync`;
		const blob = new Blob([res.encryptedContent], { type: "application/json" });
		if (typeof navigator !== "undefined" && typeof navigator.share === "function") try {
			const shareFile = new File([blob], fileName, { type: "application/json" });
			if (typeof navigator.canShare === "function" ? navigator.canShare({ files: [shareFile] }) : true) {
				await navigator.share({
					title: "Ilmizo Encrypted Family Sync",
					text: "Import this .ilmizo-sync file on your other phone/tablet using your Family Sync Passphrase.",
					files: [shareFile]
				});
				setStatusBanner({
					type: "success",
					text: "Encrypted .ilmizo-sync shared! Open it on your second device and enter the same passphrase to restore."
				});
				return;
			}
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") return;
		}
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		setStatusBanner({
			type: "success",
			text: "AES-256-GCM Encrypted .ilmizo-sync package downloaded! Send it to your second device via WhatsApp, AirDrop, or USB."
		});
	};
	const handleEncryptedSyncFileSelected = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			const text = await file.text();
			const decrypted = await importEncryptedSyncBundle(text, syncPassphrase);
			if (!decrypted.ok || !decrypted.rawBackupJson) {
				setStatusBanner({
					type: "error",
					text: decrypted.error || "Failed to decrypt .ilmizo-sync file."
				});
				return;
			}
			const validation = previewBackupImport(decrypted.rawBackupJson);
			setPendingRawJson(decrypted.rawBackupJson);
			setImportValidation(validation);
			if (!validation.valid) setStatusBanner({
				type: "error",
				text: validation.errors.join(" ")
			});
			else setStatusBanner({
				type: "success",
				text: "Encrypted .ilmizo-sync decrypted & verified! Review the preview below before confirming restore."
			});
		} catch {
			setStatusBanner({
				type: "error",
				text: "Could not read selected .ilmizo-sync file."
			});
		} finally {
			if (syncFileInputRef.current) syncFileInputRef.current.value = "";
		}
	};
	const handleExportJson = () => {
		const jsonStr = exportAllDataJson();
		const blob = new Blob([jsonStr], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `ilmizo-local-backup-v${storageMetrics.schemaVersion}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		setStatusBanner({
			type: "success",
			text: "Full local JSON backup exported. Store this file safely to restore on any device."
		});
	};
	const handleFileSelected = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			const text = await file.text();
			const validation = previewBackupImport(text);
			setPendingRawJson(text);
			setImportValidation(validation);
			if (!validation.valid) setStatusBanner({
				type: "error",
				text: validation.errors.join(" ")
			});
			else setStatusBanner(null);
		} catch {
			setStatusBanner({
				type: "error",
				text: "Could not read the selected JSON file."
			});
		} finally {
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};
	const handlePreviewPastedJson = () => {
		if (!pastedJsonText.trim()) return;
		const validation = previewBackupImport(pastedJsonText);
		setPendingRawJson(pastedJsonText);
		setImportValidation(validation);
		if (!validation.valid) setStatusBanner({
			type: "error",
			text: validation.errors.join(" ")
		});
		else setStatusBanner(null);
	};
	const handleConfirmImport = async () => {
		if (!pendingRawJson || !importValidation?.valid) return;
		setBusyMessage("Creating Pre-Import Recovery Snapshot & restoring backup...");
		const res = await applyBackupImport(pendingRawJson);
		setBusyMessage(null);
		if (res.ok) {
			setPendingRawJson(null);
			setImportValidation(null);
			setShowPasteJsonBox(false);
			setPastedJsonText("");
			setStatusBanner({
				type: "success",
				text: "Backup restored on this device! A Pre-Import Recovery Snapshot was saved automatically."
			});
		} else setStatusBanner({
			type: "error",
			text: res.error || "Import failed."
		});
	};
	const handleRestoreRecoverySnapshot = async () => {
		setBusyMessage("Restoring Pre-Import Recovery Snapshot...");
		const res = await restorePreImportBackup();
		setBusyMessage(null);
		if (res.ok) setStatusBanner({
			type: "success",
			text: "Pre-Import Recovery Snapshot restored! Your previous local state is active again."
		});
		else setStatusBanner({
			type: "error",
			text: res.error || "Could not restore recovery snapshot."
		});
	};
	const handleDownloadSingleSurah = async () => {
		const meta = ALL_114_SURAHS.find((s) => s.number === selectedSurahToDownload);
		setBusyMessage(`Downloading Surah ${meta?.nameTranslit || selectedSurahToDownload} for offline reading...`);
		const res = await downloadSurahOffline(selectedSurahToDownload);
		const rep = await verifyInstalledOfflineQuran();
		setIntegrityReport(rep);
		setBusyMessage(null);
		if (res.ok) setStatusBanner({
			type: "success",
			text: `Surah ${meta?.nameTranslit} (#${selectedSurahToDownload}) verified and saved on this device for offline reading.`
		});
		else setStatusBanner({
			type: "error",
			text: res.error || "Could not download Surah offline."
		});
	};
	const handleDownloadFullQuran114 = async () => {
		const res = await quranOfflineManager.downloadFullOfflineQuran({
			language: user.language,
			reciterName: user.reciterName
		});
		setIntegrityReport(res.report);
		if (res.ok) setStatusBanner({
			type: "success",
			text: `Complete Offline Quran (${res.completedSurahs}/114 Surahs · ${res.completedAyahs}/6,236 Ayahs) verified and saved on this device!`
		});
		else if (res.error) setStatusBanner({
			type: "error",
			text: res.error
		});
	};
	const handleDownloadJuzPack = async () => {
		const res = await quranOfflineManager.downloadJuzOffline(selectedJuzToDownload, user.language, user.reciterName);
		setIntegrityReport(res.report);
		if (res.ok) setStatusBanner({
			type: "success",
			text: `Juz ${selectedJuzToDownload} (${res.completedSurahs} Surahs · ${res.completedAyahs} Ayahs) verified and saved offline.`
		});
		else if (res.error) setStatusBanner({
			type: "error",
			text: res.error
		});
	};
	const handleVerifyOfflineQuranIntegrity = async () => {
		setBusyMessage("Verifying SHA-256 checksums across all installed offline Surahs...");
		const rep = await verifyInstalledOfflineQuran();
		setIntegrityReport(rep);
		setBusyMessage(null);
		if (rep.corruptedSurahNumbers.length > 0) setStatusBanner({
			type: "error",
			text: `Integrity check found ${rep.corruptedSurahNumbers.length} corrupted Surah(s): #${rep.corruptedSurahNumbers.join(", ")}. Re-download to repair.`
		});
		else setStatusBanner({
			type: "success",
			text: `SHA-256 Integrity Verified: ${rep.totalSurahsVerified}/114 full Surahs (${rep.totalAyahsVerified}/${TOTAL_QURAN_AYAHS} Ayahs) intact.`
		});
	};
	const handleDeleteAllOfflineQuran = async () => {
		const count = await quranOfflineManager.deleteAllOfflineQuran();
		const rep = await verifyInstalledOfflineQuran();
		setIntegrityReport(rep);
		setStatusBanner({
			type: "info",
			text: `Deleted ${count} downloaded Surah record(s) from this device. Bundled offline Surahs remain available.`
		});
	};
	const handleDownloadQariSurahAudio = async () => {
		const meta = ALL_114_SURAHS.find((s) => s.number === selectedAudioSurah);
		const res = await audioDownloadManager.downloadSurahQariAudio({
			surahNumber: selectedAudioSurah,
			reciterName: selectedQariForDownload
		});
		const summary = await audioDownloadManager.getInstalledAudioSummary();
		setInstalledAudioSummary(summary);
		if (res.ok) setStatusBanner({
			type: "success",
			text: `Downloaded & verified Qari ${selectedQariForDownload} audio for Surah ${meta?.nameTranslit} (${meta?.ayahCount} Ayahs).`
		});
		else if (res.error) setStatusBanner({
			type: "error",
			text: res.error
		});
	};
	const handleDeleteQariSurahAudio = async (reciterName, surahNumber) => {
		await audioDownloadManager.deleteSurahQariAudio(surahNumber, reciterName);
		const summary = await audioDownloadManager.getInstalledAudioSummary();
		setInstalledAudioSummary(summary);
		setStatusBanner({
			type: "info",
			text: `Removed offline Qari audio for Surah #${surahNumber} (${reciterName}).`
		});
	};
	const handleDeleteAllQariAudio = async () => {
		const deleted = await audioDownloadManager.deleteAllQariAudio();
		const summary = await audioDownloadManager.getInstalledAudioSummary();
		setInstalledAudioSummary(summary);
		refreshManifest();
		setStatusBanner({
			type: "info",
			text: `Deleted ${deleted} offline Qari audio package(s).`
		});
	};
	const handleDownloadDuaPack = async () => {
		duaAbortRef.current?.abort();
		const controller = new AbortController();
		duaAbortRef.current = controller;
		setDuaDlProgress({
			active: true,
			completed: 0,
			total: VERIFIED_DUAS.length
		});
		const res = await downloadDuaOfflineAudioPack({
			duas: VERIFIED_DUAS,
			signal: controller.signal,
			onProgress: (p) => setDuaDlProgress({
				active: true,
				completed: p.completed,
				total: p.total
			})
		});
		setDuaDlProgress(null);
		refreshManifest();
		if (res.ok) setStatusBanner({
			type: "success",
			text: `Downloaded & verified ${res.completed}/${res.total} authentic human Dua recordings for offline playback!`
		});
		else if (res.error) setStatusBanner({
			type: "error",
			text: res.error
		});
	};
	const handleDeleteDuaPack = async () => {
		await clearOfflineDuaAudioPack();
		refreshManifest();
		setStatusBanner({
			type: "info",
			text: "Removed downloaded Duas Audio Pack from browser cache. Personal bookmarks & progress are untouched."
		});
	};
	const handleDownloadEssentialPack = async () => {
		const essentialSurahs = [
			1,
			18,
			36,
			67,
			103,
			108,
			112,
			113,
			114
		];
		setBusyMessage("Saving Essential Offline Surah Pack on this device...");
		let successCount = 0;
		for (const sNum of essentialSurahs) if ((await downloadSurahOffline(sNum)).ok) successCount += 1;
		const rep = await verifyInstalledOfflineQuran();
		setIntegrityReport(rep);
		setBusyMessage(null);
		setStatusBanner({
			type: "info",
			text: `Saved ${successCount}/${essentialSurahs.length} essential Surahs for offline reading.`
		});
	};
	const handleClearCache = async () => {
		setBusyMessage("Clearing temporary API cache...");
		const res = await clearCachedOnlineData();
		const rep = await verifyInstalledOfflineQuran();
		setIntegrityReport(rep);
		setBusyMessage(null);
		setStatusBanner({
			type: "info",
			text: `Cleared ${res.clearedSurahs} cached Surah(s) and ${res.clearedPrayerCaches} prayer timing cache(s). Explicit downloads & learning data were preserved.`
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-[var(--bg-surface)] p-4 sm:p-5 shadow-xs border border-[var(--border-subtle)] space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-start justify-between gap-2 border-b border-[var(--divider)] pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-10 h-10 rounded-2xl bg-emerald-950 text-amber-300 flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-extrabold text-[var(--text-primary)]",
								children: "Device Storage & Backup Hub"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold",
								children: "Saved on Device"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 text-[11px] font-extrabold",
								children: "Works Offline · Private"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-[var(--text-secondary)] mt-0.5",
						children: "100% private on-device storage · Zero tracking · Manual backup anytime"
					})] })]
				})
			}),
			(statusBanner || storageMetrics.lastQuotaError || busyMessage) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `rounded-2xl p-3 text-xs font-semibold flex items-start justify-between gap-2 border ${busyMessage ? "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-500/30 text-sky-900 dark:text-sky-200" : storageMetrics.lastQuotaError || statusBanner?.type === "error" ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-500/30 text-rose-900 dark:text-rose-200" : statusBanner?.type === "success" ? "bg-emerald-50 dark:bg-emerald-950/45 border-emerald-200 dark:border-emerald-500/30 text-emerald-950 dark:text-emerald-200" : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-500/30 text-amber-950 dark:text-amber-200"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2",
					children: [storageMetrics.lastQuotaError || statusBanner?.type === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: busyMessage || storageMetrics.lastQuotaError || statusBanner?.text })]
				}), statusBanner && !busyMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setStatusBanner(null),
					className: "text-[11px] font-bold underline shrink-0",
					children: "Dismiss"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-2 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums",
							children: formatBytes(storageMetrics.estimatedUsedBytes)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[var(--text-secondary)]",
							children: "Storage Used"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums",
							children: [
								"114 Bundled + ",
								storageMetrics.downloadedSurahNumbers.length,
								" Saved"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[var(--text-secondary)]",
							children: "Offline Surahs"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums",
							children: [storageMetrics.cachedSurahNumbers.length, " Cached"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[var(--text-secondary)]",
							children: "Temporary Cache"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums",
							children: [storageMetrics.learningEventsCount, " Events"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[var(--text-secondary)]",
							children: "Recorded History"
						})]
					})
				]
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tablist",
				"aria-label": "Storage and Backup Sections",
				className: "grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
				children: [
					{
						id: "quran",
						label: "Offline Quran"
					},
					{
						id: "audio",
						label: "Audio Packs"
					},
					{
						id: "backup",
						label: "Backup"
					}
				].map((tab) => {
					const active = activeHubTab === tab.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": active,
						onClick: () => setActiveHubTab(tab.id),
						className: `min-h-[40px] rounded-xl text-xs font-extrabold transition ${active ? "bg-[#14532D] text-white shadow-2xs" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`,
						children: tab.label
					}, tab.id);
				})
			}),
			!compact && (activeHubTab === "quran" || activeHubTab === "audio") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [activeHubTab === "quran" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-xs font-extrabold text-[var(--text-primary)] flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: "w-3.5 h-3.5 text-[#14532D] dark:text-emerald-400" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Complete Offline Quran Manager (114 Surahs · 6,236 Ayahs)" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold",
											children: ["v", "1.2.0"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-[var(--text-secondary)]",
									children: [
										"Verified Uthmani Arabic with English, Hindi & Urdu translations.",
										" ",
										integrityReport ? `${integrityReport.totalSurahsVerified}/114 Full Surahs (${integrityReport.totalAyahsVerified}/6236 Ayahs) verified on device (${formatBytes(integrityReport.totalSizeBytes)}).` : ""
									]
								}),
								integrityReport?.packageChecksumSha256 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-[var(--text-muted)] font-mono mt-0.5",
									children: [
										"Checksum: ",
										integrityReport.packageChecksumSha256.slice(0, 18),
										"… · Verified:",
										" ",
										new Date(integrityReport.verifiedAtIso).toLocaleTimeString()
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleVerifyOfflineQuranIntegrity,
									className: "px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/35 text-[#14532D] dark:text-emerald-200 hover:opacity-90 text-[11px] font-bold flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verify SHA-256" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleClearCache,
									className: "px-2.5 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-primary)] hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-300 text-[11px] font-bold flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Clear API Cache" })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold text-[var(--text-primary)]",
									children: quranDlState.status === "downloading" || quranDlState.status === "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										quranDlState.status === "paused" ? "Paused: " : "Downloading: ",
										"Surah #",
										quranDlState.currentSurahNumber,
										" (",
										quranDlState.currentSurahName,
										") —",
										" ",
										quranDlState.completedSurahs,
										"/",
										quranDlState.totalSurahs,
										" Surahs ·",
										" ",
										quranDlState.completedAyahs,
										"/",
										quranDlState.totalAyahs,
										" Ayahs (",
										quranDlState.progressPercent,
										"%)"
									] }) : integrityReport?.isComplete114 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-800 dark:text-emerald-300",
										children: "✓ All 114 Surahs (6,236 Ayahs) Downloaded & Verified Offline"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download Complete Quran (All 114 Surahs · 6,236 Ayahs) or by Juz / Surah" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1.5",
									children: quranDlState.status !== "downloading" && quranDlState.status !== "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleDownloadFullQuran114,
										className: "px-3 py-1.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-[11px] font-extrabold flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download All 114 Surahs" })]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [quranDlState.status === "downloading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => quranOfflineManager.pauseDownload(),
										className: "px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 text-[11px] font-extrabold flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pause" })]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => quranOfflineManager.resumeDownload(),
										className: "px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-950 text-[11px] font-extrabold flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Resume" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => quranOfflineManager.cancelDownload(),
										className: "px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 text-[11px] font-extrabold flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cancel" })]
									})] })
								})]
							}), (quranDlState.status === "downloading" || quranDlState.status === "paused") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-[#14532D] transition-all duration-200",
									style: { width: `${Math.max(2, quranDlState.progressPercent)}%` }
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
									title: "Select Surah to Save Offline",
									ariaLabel: "Select Surah to download offline",
									variant: "compact",
									searchable: true,
									searchPlaceholder: "Search Surah…",
									className: "flex-1 min-w-[180px]",
									value: String(selectedSurahToDownload),
									onChange: (val) => setSelectedSurahToDownload(Number(val)),
									options: ALL_114_SURAHS.map((s) => {
										const avail = getSurahOfflineAvailability(s.number, storageMetrics.downloadedSurahNumbers, storageMetrics.cachedSurahNumbers);
										const statusTag = avail === "downloaded" ? "Downloaded" : avail === "bundled_full" ? "Bundled Full" : avail === "bundled_partial" ? "Key Ayahs" : avail === "cached" ? "Cached" : "Online-Only";
										return {
											value: String(s.number),
											label: `${s.number}. ${s.nameTranslit}`,
											subtitle: `${s.ayahCount} ayahs`,
											badge: statusTag
										};
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleDownloadSingleSurah,
									className: "min-h-[42px] px-3 py-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Surah" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
									title: "Select Juz to Save Offline",
									ariaLabel: "Select Juz to download offline",
									variant: "compact",
									searchable: true,
									searchPlaceholder: "Search Juz 1–30…",
									value: String(selectedJuzToDownload),
									onChange: (val) => setSelectedJuzToDownload(Number(val)),
									options: Array.from({ length: 30 }, (_, idx) => ({
										value: String(idx + 1),
										label: `Juz ${idx + 1}`
									}))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleDownloadJuzPack,
									className: "min-h-[42px] px-3 py-2 rounded-xl bg-amber-100 dark:bg-amber-400/20 hover:opacity-90 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-500/40 text-xs font-extrabold",
									children: ["Save Juz ", selectedJuzToDownload]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleDownloadEssentialPack,
									className: "px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:opacity-90 text-[#14532D] dark:text-emerald-200 border border-emerald-200 dark:border-emerald-500/35 text-xs font-extrabold",
									children: "Save Essential Pack"
								})
							]
						}),
						storageMetrics.downloadedSurahNumbers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] font-bold text-[var(--text-secondary)]",
									children: [
										"Explicitly Downloaded Surahs (",
										storageMetrics.downloadedSurahNumbers.length,
										"):"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleDeleteAllOfflineQuran,
									className: "text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline",
									children: "Delete All Downloaded Surahs"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5 max-h-28 overflow-y-auto",
								children: storageMetrics.downloadedSurahNumbers.map((sNum) => {
									const meta = ALL_114_SURAHS.find((s) => s.number === sNum);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/35 text-emerald-950 dark:text-emerald-200 text-[11px] font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											sNum,
											". ",
											meta?.nameTranslit || `Surah ${sNum}`
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => deleteOfflineSurah(sNum),
											className: "text-rose-600 dark:text-rose-400 hover:text-rose-800 font-black",
											title: `Delete offline download for Surah ${meta?.nameTranslit}`,
											children: "×"
										})]
									}, sNum);
								})
							})]
						})
					]
				}), activeHubTab === "audio" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "text-xs font-extrabold text-[var(--text-primary)] flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5 text-[#14532D] dark:text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Offline Qari Audio Manager" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-[var(--text-secondary)]",
								children: [
									"Download verified Qari recitations per Surah for offline listening on this device. Installed Qari audio:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBytes(installedAudioSummary.totalBytes) }),
									"."
								]
							})] }), installedAudioSummary.totalBytes > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleDeleteAllQariAudio,
								className: "px-2.5 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-rose-200 dark:border-rose-500/35 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[11px] font-bold flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delete All Audio" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
									title: "Choose Qari Reciter",
									subtitle: "Select reciter for offline audio download",
									ariaLabel: "Select Qari Reciter for offline audio download",
									variant: "compact",
									className: "flex-1 min-w-[180px]",
									value: selectedQariForDownload,
									onChange: (val) => setSelectedQariForDownload(val),
									options: VERIFIED_RECITER_EDITIONS.map((rec) => ({
										value: rec.id,
										label: rec.label,
										subtitle: `${rec.cdnBitrate}kbps authentic audio`
									}))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetField, {
									title: "Choose Surah for Audio",
									ariaLabel: "Select Surah for Qari audio download",
									variant: "compact",
									searchable: true,
									searchPlaceholder: "Search Surah…",
									className: "flex-1 min-w-[160px]",
									value: String(selectedAudioSurah),
									onChange: (val) => setSelectedAudioSurah(Number(val)),
									options: ALL_114_SURAHS.map((s) => ({
										value: String(s.number),
										label: `${s.number}. ${s.nameTranslit}`,
										badge: `${s.ayahCount} Ayahs`
									}))
								}),
								audioDlState.status !== "downloading" && audioDlState.status !== "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleDownloadQariSurahAudio,
									className: "min-h-[42px] px-3.5 py-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download Qari Audio" })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [audioDlState.status === "downloading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => audioDownloadManager.pauseDownload(),
										className: "px-2.5 py-1.5 rounded-lg bg-amber-100 text-amber-950 text-[11px] font-extrabold flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pause" })]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => audioDownloadManager.resumeDownload(),
										className: "px-2.5 py-1.5 rounded-lg bg-emerald-100 text-emerald-950 text-[11px] font-extrabold flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Resume" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => audioDownloadManager.cancelDownload(),
										className: "px-2.5 py-1.5 rounded-lg bg-rose-100 text-rose-800 text-[11px] font-extrabold flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cancel" })]
									})]
								})
							]
						}),
						(audioDlState.status === "downloading" || audioDlState.status === "paused") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] font-bold text-[var(--text-primary)]",
								children: [
									audioDlState.status === "paused" ? "Paused: " : "Downloading ",
									audioDlState.reciterName,
									" — Surah ",
									audioDlState.surahName,
									" (Ayah",
									" ",
									audioDlState.completedAyahs,
									"/",
									audioDlState.totalAyahs,
									" ·",
									" ",
									audioDlState.progressPercent,
									"% · ",
									formatBytes(audioDlState.downloadedBytes),
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-amber-500 transition-all duration-200",
									style: { width: `${Math.max(2, audioDlState.progressPercent)}%` }
								})
							})]
						}),
						Object.keys(installedAudioSummary.byReciter).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1.5 pt-1",
							children: VERIFIED_RECITER_EDITIONS.map((rec) => {
								const recSummary = installedAudioSummary.byReciter[rec.editionId];
								if (!recSummary || recSummary.surahNumbers.length === 0) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-bold text-[var(--text-secondary)]",
										children: [
											rec.label,
											" (",
											formatBytes(recSummary.totalBytes),
											"):"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1.5",
										children: recSummary.surahNumbers.map((sNum) => {
											const meta = ALL_114_SURAHS.find((s) => s.number === sNum);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/35 text-amber-950 dark:text-amber-200 text-[11px] font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													sNum,
													". ",
													meta?.nameTranslit || `Surah ${sNum}`
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => handleDeleteQariSurahAudio(rec.id, sNum),
													className: "text-rose-600 dark:text-rose-400 hover:text-rose-800 font-black",
													title: "Delete offline Qari audio for this Surah",
													children: "×"
												})]
											}, `${rec.editionId}_${sNum}`);
										})
									})]
								}, rec.editionId);
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-xs font-extrabold text-[var(--text-primary)] flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-[#14532D] dark:text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Unified Offline Audio Manifest & Packs" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-[var(--text-secondary)]",
							children: [
								"Bundled Qaida Letters: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [manifestSnapshot?.summary.bundledQaidaLetters ?? 28, "/28"] }),
								" · Qari Surahs:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: manifestSnapshot?.summary.downloadedQariSurahs ?? 0 }),
								" · Story Pages Cached:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									manifestSnapshot?.summary.cachedStoryPages ?? 0,
									"/",
									manifestSnapshot?.summary.totalStoryPages ?? 147
								] }),
								" ",
								"· Qaida Word Clips:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									manifestSnapshot?.summary.cachedQaidaWbwClips ?? 0,
									"/",
									manifestSnapshot?.summary.totalQaidaWbwClips ?? 0
								] })
							]
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-extrabold text-[var(--text-primary)]",
							children: [
								"Duas & Adhkar Human Audio Pack (",
								manifestSnapshot?.summary.cachedDuaTracks ?? 0,
								"/",
								manifestSnapshot?.summary.totalUniqueDuaTracks ?? 0,
								" Tracks Offline)"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[var(--text-secondary)]",
							children: "Hisn al-Muslim & Mishary Alafasy Quranic Duas (~4 MB). Plays 100% offline once downloaded."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [duaDlProgress?.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => duaAbortRef.current?.abort(),
								className: "px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 text-xs font-extrabold min-h-[38px]",
								children: [
									"Cancel (",
									duaDlProgress.completed,
									"/",
									duaDlProgress.total,
									")"
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleDownloadDuaPack,
								className: "px-3 py-1.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold flex items-center gap-1.5 min-h-[38px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download Duas Pack" })]
							}), (manifestSnapshot?.summary.cachedDuaTracks ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleDeleteDuaPack,
								className: "px-2.5 py-1.5 rounded-xl bg-[var(--bg-elevated)] border border-rose-200 dark:border-rose-500/35 text-rose-700 dark:text-rose-300 text-xs font-bold min-h-[38px]",
								children: "Remove"
							})]
						})]
					})]
				})] })]
			}),
			(compact || activeHubTab === "backup") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-amber-50/80 dark:bg-amber-950/35 border border-amber-300/80 dark:border-amber-500/30 px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-amber-950 dark:text-amber-200 font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Backup Reminder:" }), " Export a local JSON backup regularly so your family’s Quran, Hifz, Salah, and Kids records stay protected if browser data is cleared."]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] border border-amber-300/60 text-[11px] font-bold text-amber-900 dark:text-amber-200",
							children: user.lastBackupExportedAtIso ? `Last Backup: ${new Date(user.lastBackupExportedAtIso).toLocaleDateString()}` : "Never Exported Yet"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleExportJson,
								className: "flex-1 min-w-[160px] py-2.5 px-3.5 rounded-xl bg-[#0F3826] hover:bg-emerald-900 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Export Full JSON Backup" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileInputRef,
								type: "file",
								accept: ".json,application/json",
								onChange: handleFileSelected,
								className: "hidden"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => fileInputRef.current?.click(),
								className: "flex-1 min-w-[160px] py-2.5 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Import JSON Backup File" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setShowPasteJsonBox((prev) => !prev),
								className: "py-2.5 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileJson, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showPasteJsonBox ? "Hide Paste" : "Paste JSON" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setShowEncryptedSyncBox((prev) => !prev),
								className: "py-2.5 px-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 hover:opacity-90 text-[#14532D] dark:text-emerald-200 font-extrabold text-xs flex items-center gap-1 border border-emerald-300 dark:border-emerald-500/35",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showEncryptedSyncBox ? "Hide Transfer" : "Encrypted .ilmizo-sync Transfer" })]
							})
						]
					}),
					showEncryptedSyncBox && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/35 border border-emerald-300 dark:border-emerald-500/35 p-3.5 space-y-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold text-emerald-950 dark:text-emerald-200",
								children: "Manual Encrypted Transfer (No Cloud Account)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-[var(--text-secondary)] mt-0.5",
								children: "Exports your family progress, Hifz plans, Parent PIN settings, and child profiles into a passphrase-encrypted file so you can move a copy to another device via WhatsApp, AirDrop, Nearby Share, or USB. No automatic background cloud sync is performed."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: syncPassphrase,
								onChange: (e) => setSyncPassphrase(e.target.value),
								placeholder: "Family Sync Passphrase (min 6 chars)",
								className: "ilmizo-input w-full rounded-xl px-3 py-2 text-xs font-semibold"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleExportEncryptedSync,
										className: "flex-1 min-w-[150px] min-h-[42px] py-2 px-3 rounded-xl bg-[#14532D] text-white text-xs font-extrabold flex items-center justify-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Share .ilmizo-sync File" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleCopyEncryptedSyncCode,
										className: "flex-1 min-w-[150px] min-h-[42px] py-2 px-3 rounded-xl bg-[var(--bg-surface)] border border-emerald-400/60 text-[#14532D] dark:text-emerald-200 text-xs font-extrabold flex items-center justify-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copy Sync Code" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: syncFileInputRef,
										type: "file",
										accept: ".ilmizo-sync,.json,application/json",
										onChange: handleEncryptedSyncFileSelected,
										className: "hidden"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => syncFileInputRef.current?.click(),
										className: "flex-1 min-w-[150px] min-h-[42px] py-2 px-3 rounded-xl bg-amber-400 text-emerald-950 text-xs font-extrabold",
										children: "Import .ilmizo-sync File"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 2,
									value: pastedSyncCode,
									onChange: (e) => setPastedSyncCode(e.target.value),
									placeholder: "Or paste an encrypted Sync Code sent from your other device...",
									className: "ilmizo-input w-full rounded-xl p-2 text-[11px] font-mono"
								}), pastedSyncCode.trim().length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleDecryptPastedSyncCode,
									className: "px-3.5 min-h-[40px] rounded-xl bg-[#14532D] text-white text-xs font-extrabold",
									children: "Decrypt & Preview Sync Code"
								})]
							})
						]
					}),
					showPasteJsonBox && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: pastedJsonText,
							onChange: (e) => setPastedJsonText(e.target.value),
							placeholder: "Paste exported Ilmizo JSON backup content here...",
							className: "ilmizo-input w-full rounded-xl p-2.5 text-xs font-mono"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handlePreviewPastedJson,
							className: "px-4 py-2 rounded-xl bg-[#14532D] text-white text-xs font-extrabold",
							children: "Validate & Preview Backup"
						})]
					}),
					importValidation && importValidation.valid && importValidation.preview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-amber-50/90 dark:bg-amber-950/35 border-2 border-amber-400 p-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-block px-2 py-0.5 rounded-md bg-amber-200 dark:bg-amber-400/25 text-amber-950 dark:text-amber-200 text-[11px] font-extrabold uppercase",
										children: "Import Preview — Confirmation Required"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-xs font-extrabold text-[var(--text-primary)] mt-1",
										children: [
											"Ready to Restore Backup (Schema v",
											importValidation.preview.schemaVersion,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-[var(--text-secondary)]",
										children: ["Exported: ", importValidation.preview.exportedAt]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setPendingRawJson(null);
										setImportValidation(null);
									},
									className: "text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
									children: "Cancel"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-[var(--bg-surface)] rounded-xl p-3 border border-[var(--border-subtle)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[var(--text-secondary)] block",
										children: "Adult Profile"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-[var(--text-primary)]",
										children: [
											importValidation.preview.adultProfileName,
											" (",
											importValidation.preview.adultCity,
											")"
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[var(--text-secondary)] block",
										children: "Child Profiles"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-[var(--text-primary)]",
										children: [
											importValidation.preview.childProfilesCount,
											" (",
											importValidation.preview.childNames.join(", "),
											")"
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[var(--text-secondary)] block",
										children: "Bookmarks & Notes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-[var(--text-primary)]",
										children: [
											importValidation.preview.bookmarksCount,
											" bm · ",
											importValidation.preview.personalNotesCount,
											" notes"
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[var(--text-secondary)] block",
										children: "Hifz & Revisions"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-[var(--text-primary)]",
										children: [
											importValidation.preview.hifzPlansCount,
											" plans · ",
											importValidation.preview.revisionItemsCount,
											" queue"
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[var(--text-secondary)] block",
										children: "Salah History"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-[var(--text-primary)]",
										children: [importValidation.preview.salahDaysCount, " day(s) logged"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[var(--text-secondary)] block",
										children: "Events & Quizzes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-[var(--text-primary)]",
										children: [
											importValidation.preview.learningEventsCount,
											" events · ",
											importValidation.preview.quizAttemptsCount,
											" quizzes"
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[var(--text-secondary)] block",
										children: "Badges & Certificates"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-[var(--text-primary)]",
										children: [
											importValidation.preview.badgesCount ?? 0,
											" badges · ",
											importValidation.preview.certificatesCount ?? 0,
											" certs"
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[var(--text-secondary)] block",
										children: "Tasks & Expenses"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-[var(--text-primary)]",
										children: [
											importValidation.preview.tasksCount,
											" tasks · ",
											importValidation.preview.expensesCount,
											" expenses"
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[var(--text-secondary)] block",
										children: "Duplicate Cleanup"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-[var(--text-primary)]",
										children: [importValidation.preview.duplicatesRemovedCount ?? 0, " duplicate(s) removed"]
									})] })
								]
							}),
							importValidation.preview.warnings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-amber-900 dark:text-amber-200 bg-amber-100/80 dark:bg-amber-950/50 rounded-xl p-2.5 space-y-1",
								children: importValidation.preview.warnings.map((w, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["• ", w] }, idx))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-[var(--text-secondary)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Safety Guarantee:" }),
									" Before applying this import, Ilmizo will automatically save a",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pre-Import Recovery Snapshot" }),
									" of your current data on this device so you can undo in 1 click."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleConfirmImport,
									className: "flex-1 py-2.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-extrabold text-xs",
									children: "Confirm & Overwrite Local Data"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setPendingRawJson(null);
										setImportValidation(null);
									},
									className: "px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-primary)] font-bold text-xs",
									children: "Cancel"
								})]
							})
						]
					}),
					storageMetrics.hasPreImportRecoverySnapshot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/45 border border-emerald-200 dark:border-emerald-500/35 p-3 flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-emerald-950 dark:text-emerald-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pre-Import Recovery Snapshot Available:" }), " You can revert to the state saved immediately before your last JSON import."]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleRestoreRecoverySnapshot,
							className: "px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-emerald-400/60 text-[#14532D] dark:text-emerald-200 font-extrabold text-xs flex items-center gap-1.5 hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Restore Pre-Import Snapshot" })]
						})]
					})
				]
			}),
			(compact || activeHubTab === "backup") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 text-[11px] text-[var(--text-secondary)] space-y-1 leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-bold text-[var(--text-primary)] flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "On-Device Privacy, Backup & Security Notice" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"• ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "On-Device Storage & Backups:" }),
						" All family progress is saved privately on this device with no cloud account. Clearing browser or app storage without exporting a backup file will erase local data."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"• ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Parent PIN Scope:" }),
						" The 4-digit Parent PIN is a local family guardrail to prevent accidental child edits on this device."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"• ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Network Policy:" }),
						" Personal learning records are never transmitted to any external server. Internet access is only used when you choose to fetch Quran editions, prayer times, or audio recitations."
					] })
				]
			})
		]
	});
};
export { LocalDataManagerCard };
