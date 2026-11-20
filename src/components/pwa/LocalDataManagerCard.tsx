import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Database,
  Download,
  FileJson,
  HardDrive,
  Pause,
  Play,
  RotateCcw,
  Share2,
  ShieldCheck,
  Trash2,
  Upload,
  Volume2,
  XCircle,
} from 'lucide-react';
import { useIlmizo } from '../../context/IlmizoContext';
import {
  ALL_114_SURAHS,
  getSurahOfflineAvailability,
  VERIFIED_RECITER_EDITIONS,
} from '../../data/quranData';
import { BackupValidationResult } from '../../services/backupRestoreEngine';
import {
  exportEncryptedSyncBundle,
  importEncryptedSyncBundle,
} from '../../services/familySyncEngine';
import {
  FullQuranPackageIntegrityReport,
  OFFLINE_QURAN_PACKAGE_VERSION,
  OfflineQuranDownloadState,
  quranOfflineManager,
  TOTAL_QURAN_AYAHS,
  TOTAL_QURAN_SURAHS,
  verifyInstalledOfflineQuran,
} from '../../services/quranOfflineManager';
import {
  audioDownloadManager,
  QariAudioDownloadProgressState,
} from '../../services/audioDownloadManager';
import { VERIFIED_DUAS } from '../../data/islamicContent';
import {
  clearOfflineDuaAudioPack,
  downloadDuaOfflineAudioPack,
} from '../../services/humanDuaAndQaidaAudio';
import {
  buildUnifiedAudioManifest,
  UnifiedAudioManifestSnapshot,
} from '../../services/audioManifestService';
import { SelectSheetField } from '../sheets/SelectSheet';

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 KB';
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

export const LocalDataManagerCard: React.FC<{
  compact?: boolean;
}> = ({ compact = false }) => {
  const {
    user,
    storageMetrics,
    exportAllDataJson,
    downloadSurahOffline,
    deleteOfflineSurah,
    clearCachedOnlineData,
    previewBackupImport,
    applyBackupImport,
    restorePreImportBackup,
  } = useIlmizo();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedSurahToDownload, setSelectedSurahToDownload] = useState<number>(36); // Ya-Sin default
  const [selectedJuzToDownload, setSelectedJuzToDownload] = useState<number>(30); // Juz Amma default
  const [selectedQariForDownload, setSelectedQariForDownload] = useState<string>(
    user.reciterName || 'Mishary Rashid Alafasy'
  );
  const [selectedAudioSurah, setSelectedAudioSurah] = useState<number>(1);
  const [quranDlState, setQuranDlState] = useState<OfflineQuranDownloadState>(
    quranOfflineManager.getState()
  );
  const [integrityReport, setIntegrityReport] = useState<FullQuranPackageIntegrityReport | null>(
    null
  );
  const [audioDlState, setAudioDlState] = useState<QariAudioDownloadProgressState>(
    audioDownloadManager.getState()
  );
  const [installedAudioSummary, setInstalledAudioSummary] = useState<{
    totalBytes: number;
    byReciter: Record<string, { surahNumbers: number[]; totalBytes: number }>;
  }>({ totalBytes: 0, byReciter: {} });
  const [manifestSnapshot, setManifestSnapshot] = useState<UnifiedAudioManifestSnapshot | null>(null);
  const [duaDlProgress, setDuaDlProgress] = useState<{
    active: boolean;
    completed: number;
    total: number;
  } | null>(null);
  const duaAbortRef = useRef<AbortController | null>(null);

  const [busyMessage, setBusyMessage] = useState<string | null>(null);
  const [statusBanner, setStatusBanner] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [activeHubTab, setActiveHubTab] = useState<'quran' | 'audio' | 'backup'>(
    compact ? 'backup' : 'quran'
  );

  const refreshManifest = () => {
    void buildUnifiedAudioManifest({ language: user.language }).then(setManifestSnapshot);
  };

  useEffect(() => {
    const unsubQuran = quranOfflineManager.subscribe(setQuranDlState);
    const unsubAudio = audioDownloadManager.subscribe(setAudioDlState);
    void verifyInstalledOfflineQuran().then(setIntegrityReport);
    void audioDownloadManager.getInstalledAudioSummary().then(setInstalledAudioSummary);
    refreshManifest();
    return () => {
      unsubQuran();
      unsubAudio();
    };
  }, [storageMetrics.downloadedSurahNumbers.length, storageMetrics.downloadedAudioKeys.length, user.language]);

  // Import preview state
  const [pendingRawJson, setPendingRawJson] = useState<string | null>(null);
  const [importValidation, setImportValidation] = useState<BackupValidationResult | null>(null);
  const [showPasteJsonBox, setShowPasteJsonBox] = useState(false);
  const [pastedJsonText, setPastedJsonText] = useState('');
  const [showEncryptedSyncBox, setShowEncryptedSyncBox] = useState(false);
  const [syncPassphrase, setSyncPassphrase] = useState('');
  const [pastedSyncCode, setPastedSyncCode] = useState('');
  const syncFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCopyEncryptedSyncCode = async () => {
    const jsonStr = exportAllDataJson();
    const res = await exportEncryptedSyncBundle(jsonStr, syncPassphrase);
    if (!res.ok || !res.encryptedContent) {
      setStatusBanner({
        type: 'error',
        text: res.error || 'Could not generate encrypted sync code.',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(res.encryptedContent);
      setStatusBanner({
        type: 'success',
        text: 'Encrypted Sync Code copied! Paste it into WhatsApp or on your child’s tablet with the same passphrase.',
      });
    } catch {
      setPastedSyncCode(res.encryptedContent);
      setStatusBanner({
        type: 'info',
        text: 'Clipboard blocked — your encrypted Sync Code is shown below so you can select and copy it manually.',
      });
    }
  };

  const handleDecryptPastedSyncCode = async () => {
    if (!pastedSyncCode.trim()) return;
    const decrypted = await importEncryptedSyncBundle(pastedSyncCode, syncPassphrase);
    if (!decrypted.ok || !decrypted.rawBackupJson) {
      setStatusBanner({
        type: 'error',
        text: decrypted.error || 'Failed to decrypt pasted sync code.',
      });
      return;
    }
    const validation = previewBackupImport(decrypted.rawBackupJson);
    setPendingRawJson(decrypted.rawBackupJson);
    setImportValidation(validation);
    if (!validation.valid) {
      setStatusBanner({
        type: 'error',
        text: validation.errors.join(' '),
      });
    } else {
      setStatusBanner({
        type: 'success',
        text: 'Encrypted Sync Code decrypted & verified! Review the preview below before confirming restore.',
      });
    }
  };

  const handleExportEncryptedSync = async () => {
    const jsonStr = exportAllDataJson();
    const res = await exportEncryptedSyncBundle(jsonStr, syncPassphrase);
    if (!res.ok || !res.encryptedContent) {
      setStatusBanner({
        type: 'error',
        text: res.error || 'Could not encrypt sync package.',
      });
      return;
    }
    const fileName = `ilmizo-family-${new Date().toISOString().slice(0, 10)}.ilmizo-sync`;
    const blob = new Blob([res.encryptedContent], { type: 'application/json' });

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        const shareFile = new File([blob], fileName, { type: 'application/json' });
        const canShareFile =
          typeof navigator.canShare === 'function'
            ? navigator.canShare({ files: [shareFile] })
            : true;
        if (canShareFile) {
          await navigator.share({
            title: 'Ilmizo Encrypted Family Sync',
            text: 'Import this .ilmizo-sync file on your other phone/tablet using your Family Sync Passphrase.',
            files: [shareFile],
          });
          setStatusBanner({
            type: 'success',
            text: 'Encrypted .ilmizo-sync shared! Open it on your second device and enter the same passphrase to restore.',
          });
          return;
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        // Fall through to standard file download
      }
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusBanner({
      type: 'success',
      text: 'AES-256-GCM Encrypted .ilmizo-sync package downloaded! Send it to your second device via WhatsApp, AirDrop, or USB.',
    });
  };

  const handleEncryptedSyncFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const decrypted = await importEncryptedSyncBundle(text, syncPassphrase);
      if (!decrypted.ok || !decrypted.rawBackupJson) {
        setStatusBanner({
          type: 'error',
          text: decrypted.error || 'Failed to decrypt .ilmizo-sync file.',
        });
        return;
      }
      const validation = previewBackupImport(decrypted.rawBackupJson);
      setPendingRawJson(decrypted.rawBackupJson);
      setImportValidation(validation);
      if (!validation.valid) {
        setStatusBanner({
          type: 'error',
          text: validation.errors.join(' '),
        });
      } else {
        setStatusBanner({
          type: 'success',
          text: 'Encrypted .ilmizo-sync decrypted & verified! Review the preview below before confirming restore.',
        });
      }
    } catch {
      setStatusBanner({
        type: 'error',
        text: 'Could not read selected .ilmizo-sync file.',
      });
    } finally {
      if (syncFileInputRef.current) {
        syncFileInputRef.current.value = '';
      }
    }
  };

  const handleExportJson = () => {
    const jsonStr = exportAllDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ilmizo-local-backup-v${storageMetrics.schemaVersion}-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusBanner({
      type: 'success',
      text: 'Full local JSON backup exported. Store this file safely to restore on any device.',
    });
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const validation = previewBackupImport(text);
      setPendingRawJson(text);
      setImportValidation(validation);
      if (!validation.valid) {
        setStatusBanner({
          type: 'error',
          text: validation.errors.join(' '),
        });
      } else {
        setStatusBanner(null);
      }
    } catch {
      setStatusBanner({
        type: 'error',
        text: 'Could not read the selected JSON file.',
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePreviewPastedJson = () => {
    if (!pastedJsonText.trim()) return;
    const validation = previewBackupImport(pastedJsonText);
    setPendingRawJson(pastedJsonText);
    setImportValidation(validation);
    if (!validation.valid) {
      setStatusBanner({
        type: 'error',
        text: validation.errors.join(' '),
      });
    } else {
      setStatusBanner(null);
    }
  };

  const handleConfirmImport = async () => {
    if (!pendingRawJson || !importValidation?.valid) return;
    setBusyMessage('Creating Pre-Import Recovery Snapshot & restoring backup...');
    const res = await applyBackupImport(pendingRawJson);
    setBusyMessage(null);
    if (res.ok) {
      setPendingRawJson(null);
      setImportValidation(null);
      setShowPasteJsonBox(false);
      setPastedJsonText('');
      setStatusBanner({
        type: 'success',
        text: 'Backup restored on this device! A Pre-Import Recovery Snapshot was saved automatically.',
      });
    } else {
      setStatusBanner({
        type: 'error',
        text: res.error || 'Import failed.',
      });
    }
  };

  const handleRestoreRecoverySnapshot = async () => {
    setBusyMessage('Restoring Pre-Import Recovery Snapshot...');
    const res = await restorePreImportBackup();
    setBusyMessage(null);
    if (res.ok) {
      setStatusBanner({
        type: 'success',
        text: 'Pre-Import Recovery Snapshot restored! Your previous local state is active again.',
      });
    } else {
      setStatusBanner({
        type: 'error',
        text: res.error || 'Could not restore recovery snapshot.',
      });
    }
  };

  const handleDownloadSingleSurah = async () => {
    const meta = ALL_114_SURAHS.find((s) => s.number === selectedSurahToDownload);
    setBusyMessage(`Downloading Surah ${meta?.nameTranslit || selectedSurahToDownload} for offline reading...`);
    const res = await downloadSurahOffline(selectedSurahToDownload);
    const rep = await verifyInstalledOfflineQuran();
    setIntegrityReport(rep);
    setBusyMessage(null);
    if (res.ok) {
      setStatusBanner({
        type: 'success',
        text: `Surah ${meta?.nameTranslit} (#${selectedSurahToDownload}) verified and saved on this device for offline reading.`,
      });
    } else {
      setStatusBanner({
        type: 'error',
        text: res.error || 'Could not download Surah offline.',
      });
    }
  };

  const handleDownloadFullQuran114 = async () => {
    const res = await quranOfflineManager.downloadFullOfflineQuran({
      language: user.language,
      reciterName: user.reciterName,
    });
    setIntegrityReport(res.report);
    if (res.ok) {
      setStatusBanner({
        type: 'success',
        text: `Complete Offline Quran (${res.completedSurahs}/114 Surahs · ${res.completedAyahs}/6,236 Ayahs) verified and saved on this device!`,
      });
    } else if (res.error) {
      setStatusBanner({
        type: 'error',
        text: res.error,
      });
    }
  };

  const handleDownloadJuzPack = async () => {
    const res = await quranOfflineManager.downloadJuzOffline(
      selectedJuzToDownload,
      user.language,
      user.reciterName
    );
    setIntegrityReport(res.report);
    if (res.ok) {
      setStatusBanner({
        type: 'success',
        text: `Juz ${selectedJuzToDownload} (${res.completedSurahs} Surahs · ${res.completedAyahs} Ayahs) verified and saved offline.`,
      });
    } else if (res.error) {
      setStatusBanner({
        type: 'error',
        text: res.error,
      });
    }
  };

  const handleVerifyOfflineQuranIntegrity = async () => {
    setBusyMessage('Verifying SHA-256 checksums across all installed offline Surahs...');
    const rep = await verifyInstalledOfflineQuran();
    setIntegrityReport(rep);
    setBusyMessage(null);
    if (rep.corruptedSurahNumbers.length > 0) {
      setStatusBanner({
        type: 'error',
        text: `Integrity check found ${rep.corruptedSurahNumbers.length} corrupted Surah(s): #${rep.corruptedSurahNumbers.join(', ')}. Re-download to repair.`,
      });
    } else {
      setStatusBanner({
        type: 'success',
        text: `SHA-256 Integrity Verified: ${rep.totalSurahsVerified}/${TOTAL_QURAN_SURAHS} full Surahs (${rep.totalAyahsVerified}/${TOTAL_QURAN_AYAHS} Ayahs) intact.`,
      });
    }
  };

  const handleDeleteAllOfflineQuran = async () => {
    const count = await quranOfflineManager.deleteAllOfflineQuran();
    const rep = await verifyInstalledOfflineQuran();
    setIntegrityReport(rep);
    setStatusBanner({
      type: 'info',
      text: `Deleted ${count} downloaded Surah record(s) from this device. Bundled offline Surahs remain available.`,
    });
  };

  const handleDownloadQariSurahAudio = async () => {
    const meta = ALL_114_SURAHS.find((s) => s.number === selectedAudioSurah);
    const res = await audioDownloadManager.downloadSurahQariAudio({
      surahNumber: selectedAudioSurah,
      reciterName: selectedQariForDownload,
    });
    const summary = await audioDownloadManager.getInstalledAudioSummary();
    setInstalledAudioSummary(summary);
    if (res.ok) {
      setStatusBanner({
        type: 'success',
        text: `Downloaded & verified Qari ${selectedQariForDownload} audio for Surah ${meta?.nameTranslit} (${meta?.ayahCount} Ayahs).`,
      });
    } else if (res.error) {
      setStatusBanner({
        type: 'error',
        text: res.error,
      });
    }
  };

  const handleDeleteQariSurahAudio = async (reciterName: string, surahNumber: number) => {
    await audioDownloadManager.deleteSurahQariAudio(surahNumber, reciterName);
    const summary = await audioDownloadManager.getInstalledAudioSummary();
    setInstalledAudioSummary(summary);
    setStatusBanner({
      type: 'info',
      text: `Removed offline Qari audio for Surah #${surahNumber} (${reciterName}).`,
    });
  };

  const handleDeleteAllQariAudio = async () => {
    const deleted = await audioDownloadManager.deleteAllQariAudio();
    const summary = await audioDownloadManager.getInstalledAudioSummary();
    setInstalledAudioSummary(summary);
    refreshManifest();
    setStatusBanner({
      type: 'info',
      text: `Deleted ${deleted} offline Qari audio package(s).`,
    });
  };

  const handleDownloadDuaPack = async () => {
    duaAbortRef.current?.abort();
    const controller = new AbortController();
    duaAbortRef.current = controller;
    setDuaDlProgress({ active: true, completed: 0, total: VERIFIED_DUAS.length });
    const res = await downloadDuaOfflineAudioPack({
      duas: VERIFIED_DUAS,
      signal: controller.signal,
      onProgress: (p) => setDuaDlProgress({ active: true, completed: p.completed, total: p.total }),
    });
    setDuaDlProgress(null);
    refreshManifest();
    if (res.ok) {
      setStatusBanner({
        type: 'success',
        text: `Downloaded & verified ${res.completed}/${res.total} authentic human Dua recordings for offline playback!`,
      });
    } else if (res.error) {
      setStatusBanner({
        type: 'error',
        text: res.error,
      });
    }
  };

  const handleDeleteDuaPack = async () => {
    await clearOfflineDuaAudioPack();
    refreshManifest();
    setStatusBanner({
      type: 'info',
      text: 'Removed downloaded Duas Audio Pack from browser cache. Personal bookmarks & progress are untouched.',
    });
  };

  const handleDownloadEssentialPack = async () => {
    const essentialSurahs = [1, 18, 36, 67, 103, 108, 112, 113, 114];
    setBusyMessage('Saving Essential Offline Surah Pack on this device...');
    let successCount = 0;
    for (const sNum of essentialSurahs) {
      const res = await downloadSurahOffline(sNum);
      if (res.ok) successCount += 1;
    }
    const rep = await verifyInstalledOfflineQuran();
    setIntegrityReport(rep);
    setBusyMessage(null);
    setStatusBanner({
      type: 'info',
      text: `Saved ${successCount}/${essentialSurahs.length} essential Surahs for offline reading.`,
    });
  };

  const handleClearCache = async () => {
    setBusyMessage('Clearing temporary API cache...');
    const res = await clearCachedOnlineData();
    const rep = await verifyInstalledOfflineQuran();
    setIntegrityReport(rep);
    setBusyMessage(null);
    setStatusBanner({
      type: 'info',
      text: `Cleared ${res.clearedSurahs} cached Surah(s) and ${res.clearedPrayerCaches} prayer timing cache(s). Explicit downloads & learning data were preserved.`,
    });
  };

  return (
    <div className="rounded-3xl bg-[var(--bg-surface)] p-4 sm:p-5 shadow-xs border border-[var(--border-subtle)] space-y-4">
      {/* Header & Architecture Status */}
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[var(--divider)] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-amber-300 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                Device Storage & Backup Hub
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold">
                Saved on Device
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 text-[11px] font-extrabold">
                Works Offline · Private
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              100% private on-device storage · Zero tracking · Manual backup anytime
            </p>
          </div>
        </div>
      </div>

      {/* Status / Error Banner */}
      {(statusBanner || storageMetrics.lastQuotaError || busyMessage) && (
        <div
          className={`rounded-2xl p-3 text-xs font-semibold flex items-start justify-between gap-2 border ${
            busyMessage
              ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-500/30 text-sky-900 dark:text-sky-200'
              : storageMetrics.lastQuotaError || statusBanner?.type === 'error'
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-500/30 text-rose-900 dark:text-rose-200'
              : statusBanner?.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/45 border-emerald-200 dark:border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
              : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-500/30 text-amber-950 dark:text-amber-200'
          }`}
        >
          <div className="flex items-start gap-2">
            {storageMetrics.lastQuotaError || statusBanner?.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            )}
            <span>{busyMessage || storageMetrics.lastQuotaError || statusBanner?.text}</span>
          </div>
          {statusBanner && !busyMessage && (
            <button
              type="button"
              onClick={() => setStatusBanner(null)}
              className="text-[11px] font-bold underline shrink-0"
            >
              Dismiss
            </button>
          )}
        </div>
      )}

      {/* Storage Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-2.5">
          <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
            {formatBytes(storageMetrics.estimatedUsedBytes)}
          </p>
          <p className="text-[11px] text-[var(--text-secondary)]">Storage Used</p>
        </div>
        <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-2.5">
          <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
            114 Bundled + {storageMetrics.downloadedSurahNumbers.length} Saved
          </p>
          <p className="text-[11px] text-[var(--text-secondary)]">Offline Surahs</p>
        </div>
        <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-2.5">
          <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
            {storageMetrics.cachedSurahNumbers.length} Cached
          </p>
          <p className="text-[11px] text-[var(--text-secondary)]">Temporary Cache</p>
        </div>
        <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-2.5">
          <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300 tabular-nums">
            {storageMetrics.learningEventsCount} Events
          </p>
          <p className="text-[11px] text-[var(--text-secondary)]">Recorded History</p>
        </div>
      </div>

      {/* Clean 3-Tab Sub-Navigation (Offline Quran | Audio Packs | Backup) */}
      {!compact && (
        <div
          role="tablist"
          aria-label="Storage and Backup Sections"
          className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
        >
          {(
            [
              { id: 'quran', label: 'Offline Quran' },
              { id: 'audio', label: 'Audio Packs' },
              { id: 'backup', label: 'Backup' },
            ] as const
          ).map((tab) => {
            const active = activeHubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveHubTab(tab.id)}
                className={`min-h-[40px] rounded-xl text-xs font-extrabold transition ${
                  active
                    ? 'bg-[#14532D] text-white shadow-2xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Offline Quran Text (114 Surahs / 6,236 Ayahs) & Qari Audio Manager */}
      {!compact && (activeHubTab === 'quran' || activeHubTab === 'audio') && (
        <div className="space-y-3">
          {activeHubTab === 'quran' && (
          <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-[#14532D] dark:text-emerald-400" />
                  <span>Complete Offline Quran Manager (114 Surahs · 6,236 Ayahs)</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-200 text-[11px] font-extrabold">
                    v{OFFLINE_QURAN_PACKAGE_VERSION}
                  </span>
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Verified Uthmani Arabic with English, Hindi & Urdu translations.{' '}
                  {integrityReport
                    ? `${integrityReport.totalSurahsVerified}/${TOTAL_QURAN_SURAHS} Full Surahs (${integrityReport.totalAyahsVerified}/${TOTAL_QURAN_AYAHS} Ayahs) verified on device (${formatBytes(integrityReport.totalSizeBytes)}).`
                    : ''}
                </p>
                {integrityReport?.packageChecksumSha256 && (
                  <p className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">
                    Checksum: {integrityReport.packageChecksumSha256.slice(0, 18)}… · Verified:{' '}
                    {new Date(integrityReport.verifiedAtIso).toLocaleTimeString()}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleVerifyOfflineQuranIntegrity}
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/35 text-[#14532D] dark:text-emerald-200 hover:opacity-90 text-[11px] font-bold flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verify SHA-256</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearCache}
                  className="px-2.5 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-primary)] hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-300 text-[11px] font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear API Cache</span>
                </button>
              </div>
            </div>

            {/* Full 114-Surah Download & Pause/Resume/Cancel Progress Bar */}
            <div className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-bold text-[var(--text-primary)]">
                  {quranDlState.status === 'downloading' || quranDlState.status === 'paused' ? (
                    <span>
                      {quranDlState.status === 'paused' ? 'Paused: ' : 'Downloading: '}
                      Surah #{quranDlState.currentSurahNumber} ({quranDlState.currentSurahName}) —{' '}
                      {quranDlState.completedSurahs}/{quranDlState.totalSurahs} Surahs ·{' '}
                      {quranDlState.completedAyahs}/{quranDlState.totalAyahs} Ayahs (
                      {quranDlState.progressPercent}%)
                    </span>
                  ) : integrityReport?.isComplete114 ? (
                    <span className="text-emerald-800 dark:text-emerald-300">
                      ✓ All 114 Surahs (6,236 Ayahs) Downloaded & Verified Offline
                    </span>
                  ) : (
                    <span>
                      Download Complete Quran (All 114 Surahs · 6,236 Ayahs) or by Juz / Surah
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  {quranDlState.status !== 'downloading' && quranDlState.status !== 'paused' ? (
                    <button
                      type="button"
                      onClick={handleDownloadFullQuran114}
                      className="px-3 py-1.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-[11px] font-extrabold flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-300" />
                      <span>Download All 114 Surahs</span>
                    </button>
                  ) : (
                    <>
                      {quranDlState.status === 'downloading' ? (
                        <button
                          type="button"
                          onClick={() => quranOfflineManager.pauseDownload()}
                          className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 text-[11px] font-extrabold flex items-center gap-1"
                        >
                          <Pause className="w-3 h-3" />
                          <span>Pause</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => quranOfflineManager.resumeDownload()}
                          className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-950 text-[11px] font-extrabold flex items-center gap-1"
                        >
                          <Play className="w-3 h-3" />
                          <span>Resume</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => quranOfflineManager.cancelDownload()}
                        className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 text-[11px] font-extrabold flex items-center gap-1"
                      >
                        <XCircle className="w-3 h-3" />
                        <span>Cancel</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {(quranDlState.status === 'downloading' || quranDlState.status === 'paused') && (
                <div className="w-full h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                  <div
                    className="h-full bg-[#14532D] transition-all duration-200"
                    style={{ width: `${Math.max(2, quranDlState.progressPercent)}%` }}
                  />
                </div>
              )}
            </div>

            {/* Individual Surah & Juz Download Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <SelectSheetField
                title="Select Surah to Save Offline"
                ariaLabel="Select Surah to download offline"
                variant="compact"
                searchable
                searchPlaceholder="Search Surah…"
                className="flex-1 min-w-[180px]"
                value={String(selectedSurahToDownload)}
                onChange={(val) => setSelectedSurahToDownload(Number(val))}
                options={ALL_114_SURAHS.map((s) => {
                  const avail = getSurahOfflineAvailability(
                    s.number,
                    storageMetrics.downloadedSurahNumbers,
                    storageMetrics.cachedSurahNumbers
                  );
                  const statusTag =
                    avail === 'downloaded'
                      ? 'Downloaded'
                      : avail === 'bundled_full'
                      ? 'Bundled Full'
                      : avail === 'bundled_partial'
                      ? 'Key Ayahs'
                      : avail === 'cached'
                      ? 'Cached'
                      : 'Online-Only';
                  return {
                    value: String(s.number),
                    label: `${s.number}. ${s.nameTranslit}`,
                    subtitle: `${s.ayahCount} ayahs`,
                    badge: statusTag,
                  };
                })}
              />
              <button
                type="button"
                onClick={handleDownloadSingleSurah}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Surah</span>
              </button>

              <SelectSheetField
                title="Select Juz to Save Offline"
                ariaLabel="Select Juz to download offline"
                variant="compact"
                searchable
                searchPlaceholder="Search Juz 1–30…"
                value={String(selectedJuzToDownload)}
                onChange={(val) => setSelectedJuzToDownload(Number(val))}
                options={Array.from({ length: 30 }, (_, idx) => ({
                  value: String(idx + 1),
                  label: `Juz ${idx + 1}`,
                }))}
              />
              <button
                type="button"
                onClick={handleDownloadJuzPack}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-amber-100 dark:bg-amber-400/20 hover:opacity-90 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-500/40 text-xs font-extrabold"
              >
                Save Juz {selectedJuzToDownload}
              </button>
              <button
                type="button"
                onClick={handleDownloadEssentialPack}
                className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:opacity-90 text-[#14532D] dark:text-emerald-200 border border-emerald-200 dark:border-emerald-500/35 text-xs font-extrabold"
              >
                Save Essential Pack
              </button>
            </div>

            {/* Explicitly Downloaded Surahs List with Delete Controls */}
            {storageMetrics.downloadedSurahNumbers.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-[var(--text-secondary)]">
                    Explicitly Downloaded Surahs ({storageMetrics.downloadedSurahNumbers.length}):
                  </p>
                  <button
                    type="button"
                    onClick={handleDeleteAllOfflineQuran}
                    className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    Delete All Downloaded Surahs
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                  {storageMetrics.downloadedSurahNumbers.map((sNum) => {
                    const meta = ALL_114_SURAHS.find((s) => s.number === sNum);
                    return (
                      <span
                        key={sNum}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/35 text-emerald-950 dark:text-emerald-200 text-[11px] font-bold"
                      >
                        <span>
                          {sNum}. {meta?.nameTranslit || `Surah ${sNum}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteOfflineSurah(sNum)}
                          className="text-rose-600 dark:text-rose-400 hover:text-rose-800 font-black"
                          title={`Delete offline download for Surah ${meta?.nameTranslit}`}
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          )}

          {/* Phase 5B: Offline Qari Audio Download Manager */}
          {activeHubTab === 'audio' && (
          <>
          <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#14532D] dark:text-emerald-400" />
                  <span>Offline Qari Audio Manager</span>
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Download verified Qari recitations per Surah for offline listening on this device. Installed Qari audio:{' '}
                  <strong>{formatBytes(installedAudioSummary.totalBytes)}</strong>.
                </p>
              </div>
              {installedAudioSummary.totalBytes > 0 && (
                <button
                  type="button"
                  onClick={handleDeleteAllQariAudio}
                  className="px-2.5 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-rose-200 dark:border-rose-500/35 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[11px] font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete All Audio</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <SelectSheetField
                title="Choose Qari Reciter"
                subtitle="Select reciter for offline audio download"
                ariaLabel="Select Qari Reciter for offline audio download"
                variant="compact"
                className="flex-1 min-w-[180px]"
                value={selectedQariForDownload}
                onChange={(val) => setSelectedQariForDownload(val)}
                options={VERIFIED_RECITER_EDITIONS.map((rec) => ({
                  value: rec.id,
                  label: rec.label,
                  subtitle: `${rec.cdnBitrate}kbps authentic audio`,
                }))}
              />

              <SelectSheetField
                title="Choose Surah for Audio"
                ariaLabel="Select Surah for Qari audio download"
                variant="compact"
                searchable
                searchPlaceholder="Search Surah…"
                className="flex-1 min-w-[160px]"
                value={String(selectedAudioSurah)}
                onChange={(val) => setSelectedAudioSurah(Number(val))}
                options={ALL_114_SURAHS.map((s) => ({
                  value: String(s.number),
                  label: `${s.number}. ${s.nameTranslit}`,
                  badge: `${s.ayahCount} Ayahs`,
                }))}
              />

              {audioDlState.status !== 'downloading' && audioDlState.status !== 'paused' ? (
                <button
                  type="button"
                  onClick={handleDownloadQariSurahAudio}
                  className="min-h-[42px] px-3.5 py-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>Download Qari Audio</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  {audioDlState.status === 'downloading' ? (
                    <button
                      type="button"
                      onClick={() => audioDownloadManager.pauseDownload()}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-100 text-amber-950 text-[11px] font-extrabold flex items-center gap-1"
                    >
                      <Pause className="w-3 h-3" />
                      <span>Pause</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => audioDownloadManager.resumeDownload()}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-100 text-emerald-950 text-[11px] font-extrabold flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" />
                      <span>Resume</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => audioDownloadManager.cancelDownload()}
                    className="px-2.5 py-1.5 rounded-lg bg-rose-100 text-rose-800 text-[11px] font-extrabold flex items-center gap-1"
                  >
                    <XCircle className="w-3 h-3" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {(audioDlState.status === 'downloading' || audioDlState.status === 'paused') && (
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-[var(--text-primary)]">
                  {audioDlState.status === 'paused' ? 'Paused: ' : 'Downloading '}
                  {audioDlState.reciterName} — Surah {audioDlState.surahName} (Ayah{' '}
                  {audioDlState.completedAyahs}/{audioDlState.totalAyahs} ·{' '}
                  {audioDlState.progressPercent}% · {formatBytes(audioDlState.downloadedBytes)})
                </p>
                <div className="w-full h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-200"
                    style={{ width: `${Math.max(2, audioDlState.progressPercent)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Installed Qari Audio List */}
            {Object.keys(installedAudioSummary.byReciter).length > 0 && (
              <div className="space-y-1.5 pt-1">
                {VERIFIED_RECITER_EDITIONS.map((rec) => {
                  const recSummary = installedAudioSummary.byReciter[rec.editionId];
                  if (!recSummary || recSummary.surahNumbers.length === 0) return null;
                  return (
                    <div key={rec.editionId} className="space-y-1">
                      <p className="text-[11px] font-bold text-[var(--text-secondary)]">
                        {rec.label} ({formatBytes(recSummary.totalBytes)}):
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {recSummary.surahNumbers.map((sNum) => {
                          const meta = ALL_114_SURAHS.find((s) => s.number === sNum);
                          return (
                            <span
                              key={`${rec.editionId}_${sNum}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/35 text-amber-950 dark:text-amber-200 text-[11px] font-bold"
                            >
                              <span>
                                {sNum}. {meta?.nameTranslit || `Surah ${sNum}`}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDeleteQariSurahAudio(rec.id, sNum)}
                                className="text-rose-600 dark:text-rose-400 hover:text-rose-800 font-black"
                                title="Delete offline Qari audio for this Surah"
                              >
                                ×
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Unified Learning Audio Manifest & Offline Duas Pack */}
          <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3.5 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#14532D] dark:text-emerald-400" />
                  <span>Unified Offline Audio Manifest & Packs</span>
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Bundled Qaida Letters: <strong>{manifestSnapshot?.summary.bundledQaidaLetters ?? 28}/28</strong> · Qari Surahs:{' '}
                  <strong>{manifestSnapshot?.summary.downloadedQariSurahs ?? 0}</strong> · Story Pages Cached:{' '}
                  <strong>
                    {manifestSnapshot?.summary.cachedStoryPages ?? 0}/{manifestSnapshot?.summary.totalStoryPages ?? 147}
                  </strong>{' '}
                  · Qaida Word Clips:{' '}
                  <strong>
                    {manifestSnapshot?.summary.cachedQaidaWbwClips ?? 0}/{manifestSnapshot?.summary.totalQaidaWbwClips ?? 0}
                  </strong>
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-extrabold text-[var(--text-primary)]">
                  Duas & Adhkar Human Audio Pack ({manifestSnapshot?.summary.cachedDuaTracks ?? 0}/
                  {manifestSnapshot?.summary.totalUniqueDuaTracks ?? 0} Tracks Offline)
                </p>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Hisn al-Muslim & Mishary Alafasy Quranic Duas (~4 MB). Plays 100% offline once downloaded.
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {duaDlProgress?.active ? (
                  <button
                    type="button"
                    onClick={() => duaAbortRef.current?.abort()}
                    className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 text-xs font-extrabold min-h-[38px]"
                  >
                    Cancel ({duaDlProgress.completed}/{duaDlProgress.total})
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleDownloadDuaPack}
                    className="px-3 py-1.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold flex items-center gap-1.5 min-h-[38px]"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-300" />
                    <span>Download Duas Pack</span>
                  </button>
                )}
                {(manifestSnapshot?.summary.cachedDuaTracks ?? 0) > 0 && (
                  <button
                    type="button"
                    onClick={handleDeleteDuaPack}
                    className="px-2.5 py-1.5 rounded-xl bg-[var(--bg-elevated)] border border-rose-200 dark:border-rose-500/35 text-rose-700 dark:text-rose-300 text-xs font-bold min-h-[38px]"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      )}

      {/* Manual JSON Export / Import / Pre-Import Recovery Controls */}
      {(compact || activeHubTab === 'backup') && (
      <div className="space-y-3">
        <div className="rounded-2xl bg-amber-50/80 dark:bg-amber-950/35 border border-amber-300/80 dark:border-amber-500/30 px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="text-amber-950 dark:text-amber-200 font-semibold">
            <strong>Backup Reminder:</strong> Export a local JSON backup regularly so your family’s Quran, Hifz, Salah, and Kids records stay protected if browser data is cleared.
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] border border-amber-300/60 text-[11px] font-bold text-amber-900 dark:text-amber-200">
            {user.lastBackupExportedAtIso
              ? `Last Backup: ${new Date(user.lastBackupExportedAtIso).toLocaleDateString()}`
              : 'Never Exported Yet'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExportJson}
            className="flex-1 min-w-[160px] py-2.5 px-3.5 rounded-xl bg-[#0F3826] hover:bg-emerald-900 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Export Full JSON Backup</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelected}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 min-w-[160px] py-2.5 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <Upload className="w-4 h-4" />
            <span>Import JSON Backup File</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPasteJsonBox((prev) => !prev)}
            className="py-2.5 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs flex items-center gap-1"
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>{showPasteJsonBox ? 'Hide Paste' : 'Paste JSON'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowEncryptedSyncBox((prev) => !prev)}
            className="py-2.5 px-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 hover:opacity-90 text-[#14532D] dark:text-emerald-200 font-extrabold text-xs flex items-center gap-1 border border-emerald-300 dark:border-emerald-500/35"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{showEncryptedSyncBox ? 'Hide Transfer' : 'Encrypted .ilmizo-sync Transfer'}</span>
          </button>
        </div>

        {showEncryptedSyncBox && (
          <div className="rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/35 border border-emerald-300 dark:border-emerald-500/35 p-3.5 space-y-2.5">
            <div>
              <p className="text-xs font-extrabold text-emerald-950 dark:text-emerald-200">
                Manual Encrypted Transfer (No Cloud Account)
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                Exports your family progress, Hifz plans, Parent PIN settings, and child profiles into a passphrase-encrypted file so you can move a copy to another device via WhatsApp, AirDrop, Nearby Share, or USB. No automatic background cloud sync is performed.
              </p>
            </div>
            <input
              type="password"
              value={syncPassphrase}
              onChange={(e) => setSyncPassphrase(e.target.value)}
              placeholder="Family Sync Passphrase (min 6 chars)"
              className="ilmizo-input w-full rounded-xl px-3 py-2 text-xs font-semibold"
            />
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleExportEncryptedSync}
                className="flex-1 min-w-[150px] min-h-[42px] py-2 px-3 rounded-xl bg-[#14532D] text-white text-xs font-extrabold flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Share .ilmizo-sync File</span>
              </button>
              <button
                type="button"
                onClick={handleCopyEncryptedSyncCode}
                className="flex-1 min-w-[150px] min-h-[42px] py-2 px-3 rounded-xl bg-[var(--bg-surface)] border border-emerald-400/60 text-[#14532D] dark:text-emerald-200 text-xs font-extrabold flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Sync Code</span>
              </button>
              <input
                ref={syncFileInputRef}
                type="file"
                accept=".ilmizo-sync,.json,application/json"
                onChange={handleEncryptedSyncFileSelected}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => syncFileInputRef.current?.click()}
                className="flex-1 min-w-[150px] min-h-[42px] py-2 px-3 rounded-xl bg-amber-400 text-emerald-950 text-xs font-extrabold"
              >
                Import .ilmizo-sync File
              </button>
            </div>
            <div className="space-y-1.5 pt-1">
              <textarea
                rows={2}
                value={pastedSyncCode}
                onChange={(e) => setPastedSyncCode(e.target.value)}
                placeholder="Or paste an encrypted Sync Code sent from your other device..."
                className="ilmizo-input w-full rounded-xl p-2 text-[11px] font-mono"
              />
              {pastedSyncCode.trim().length > 0 && (
                <button
                  type="button"
                  onClick={handleDecryptPastedSyncCode}
                  className="px-3.5 min-h-[40px] rounded-xl bg-[#14532D] text-white text-xs font-extrabold"
                >
                  Decrypt & Preview Sync Code
                </button>
              )}
            </div>
          </div>
        )}

        {/* Paste JSON Box for environments where file picker is inconvenient */}
        {showPasteJsonBox && (
          <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 space-y-2">
            <textarea
              rows={3}
              value={pastedJsonText}
              onChange={(e) => setPastedJsonText(e.target.value)}
              placeholder='Paste exported Ilmizo JSON backup content here...'
              className="ilmizo-input w-full rounded-xl p-2.5 text-xs font-mono"
            />
            <button
              type="button"
              onClick={handlePreviewPastedJson}
              className="px-4 py-2 rounded-xl bg-[#14532D] text-white text-xs font-extrabold"
            >
              Validate & Preview Backup
            </button>
          </div>
        )}

        {/* Interactive Import Preview Confirmation Card (Never overwrites without explicit confirmation) */}
        {importValidation && importValidation.valid && importValidation.preview && (
          <div className="rounded-2xl bg-amber-50/90 dark:bg-amber-950/35 border-2 border-amber-400 p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200 dark:bg-amber-400/25 text-amber-950 dark:text-amber-200 text-[11px] font-extrabold uppercase">
                  Import Preview — Confirmation Required
                </span>
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] mt-1">
                  Ready to Restore Backup (Schema v{importValidation.preview.schemaVersion})
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Exported: {importValidation.preview.exportedAt}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPendingRawJson(null);
                  setImportValidation(null);
                }}
                className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-[var(--bg-surface)] rounded-xl p-3 border border-[var(--border-subtle)]">
              <div>
                <span className="text-[11px] text-[var(--text-secondary)] block">Adult Profile</span>
                <strong className="text-[var(--text-primary)]">
                  {importValidation.preview.adultProfileName} ({importValidation.preview.adultCity})
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[var(--text-secondary)] block">Child Profiles</span>
                <strong className="text-[var(--text-primary)]">
                  {importValidation.preview.childProfilesCount} ({importValidation.preview.childNames.join(', ')})
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[var(--text-secondary)] block">Bookmarks & Notes</span>
                <strong className="text-[var(--text-primary)]">
                  {importValidation.preview.bookmarksCount} bm · {importValidation.preview.personalNotesCount} notes
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[var(--text-secondary)] block">Hifz & Revisions</span>
                <strong className="text-[var(--text-primary)]">
                  {importValidation.preview.hifzPlansCount} plans · {importValidation.preview.revisionItemsCount} queue
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[var(--text-secondary)] block">Salah History</span>
                <strong className="text-[var(--text-primary)]">
                  {importValidation.preview.salahDaysCount} day(s) logged
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[var(--text-secondary)] block">Events & Quizzes</span>
                <strong className="text-[var(--text-primary)]">
                  {importValidation.preview.learningEventsCount} events · {importValidation.preview.quizAttemptsCount} quizzes
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[var(--text-secondary)] block">Badges & Certificates</span>
                <strong className="text-[var(--text-primary)]">
                  {importValidation.preview.badgesCount ?? 0} badges · {importValidation.preview.certificatesCount ?? 0} certs
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[var(--text-secondary)] block">Tasks & Expenses</span>
                <strong className="text-[var(--text-primary)]">
                  {importValidation.preview.tasksCount} tasks · {importValidation.preview.expensesCount} expenses
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[var(--text-secondary)] block">Duplicate Cleanup</span>
                <strong className="text-[var(--text-primary)]">
                  {importValidation.preview.duplicatesRemovedCount ?? 0} duplicate(s) removed
                </strong>
              </div>
            </div>

            {importValidation.preview.warnings.length > 0 && (
              <div className="text-[11px] text-amber-900 dark:text-amber-200 bg-amber-100/80 dark:bg-amber-950/50 rounded-xl p-2.5 space-y-1">
                {importValidation.preview.warnings.map((w, idx) => (
                  <p key={idx}>• {w}</p>
                ))}
              </div>
            )}

            <p className="text-[11px] text-[var(--text-secondary)]">
              <strong>Safety Guarantee:</strong> Before applying this import, Ilmizo will automatically save a{' '}
              <strong>Pre-Import Recovery Snapshot</strong> of your current data on this device so you can undo in 1 click.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleConfirmImport}
                className="flex-1 py-2.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-extrabold text-xs"
              >
                Confirm & Overwrite Local Data
              </button>
              <button
                type="button"
                onClick={() => {
                  setPendingRawJson(null);
                  setImportValidation(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-primary)] font-bold text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* 1-Click Pre-Import Recovery Snapshot Restore Button */}
        {storageMetrics.hasPreImportRecoverySnapshot && (
          <div className="rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/45 border border-emerald-200 dark:border-emerald-500/35 p-3 flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-emerald-950 dark:text-emerald-200">
              <strong>Pre-Import Recovery Snapshot Available:</strong> You can revert to the state saved immediately before your last JSON import.
            </div>
            <button
              type="button"
              onClick={handleRestoreRecoverySnapshot}
              className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-emerald-400/60 text-[#14532D] dark:text-emerald-200 font-extrabold text-xs flex items-center gap-1.5 hover:opacity-90"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Pre-Import Snapshot</span>
            </button>
          </div>
        )}
      </div>
      )}

      {/* Honest Local-First, Data-Loss & Security Disclosure */}
      {(compact || activeHubTab === 'backup') && (
      <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 text-[11px] text-[var(--text-secondary)] space-y-1 leading-relaxed">
        <p className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
          <span>On-Device Privacy, Backup & Security Notice</span>
        </p>
        <p>
          • <strong>On-Device Storage & Backups:</strong> All family progress is saved privately on this device with no cloud account. Clearing browser or app storage without exporting a backup file will erase local data.
        </p>
        <p>
          • <strong>Parent PIN Scope:</strong> The 4-digit Parent PIN is a local family guardrail to prevent accidental child edits on this device.
        </p>
        <p>
          • <strong>Network Policy:</strong> Personal learning records are never transmitted to any external server. Internet access is only used when you choose to fetch Quran editions, prayer times, or audio recitations.
        </p>
      </div>
      )}
    </div>
  );
};
