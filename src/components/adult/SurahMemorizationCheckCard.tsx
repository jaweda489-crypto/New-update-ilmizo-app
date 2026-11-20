import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  RotateCcw,
  Volume2,
  Award,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { ALL_114_SURAHS, getSurahPayload } from '../../data/quranData';
import { AyahItem } from '../../types/ilmizo';
import { SelectSheetField } from '../sheets/SelectSheet';
import { audioManager } from '../../services/audioManager';
import {
  formatAyahTextForScript,
  getArabicScriptFontClass,
  useQuranScriptStyle,
} from '../../services/quranScriptEngine';
import { triggerLightHaptic, triggerSuccessHaptic } from '../../services/hapticsService';

type MemorizationDifficulty = 'key_words' | 'first_word' | 'full_blind';
type RecallGrade = 'solid' | 'hesitated' | 'forgot';

interface SurahMemorizationCheckCardProps {
  defaultSurahNumber?: number;
  reciterName?: string;
  onCompleteCheck?: (summary: {
    surahNumber: number;
    surahName: string;
    accuracyPct: number;
    solidCount: number;
    totalChecked: number;
  }) => void;
}

export const SurahMemorizationCheckCard: React.FC<SurahMemorizationCheckCardProps> = ({
  defaultSurahNumber = 112,
  reciterName = 'Mishary Rashid Alafasy',
  onCompleteCheck,
}) => {
  const [scriptStyle] = useQuranScriptStyle();
  const [selectedSurah, setSelectedSurah] = useState<number>(defaultSurahNumber);
  const [difficulty, setDifficulty] = useState<MemorizationDifficulty>('key_words');
  const [ayahs, setAyahs] = useState<AyahItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offlineNote, setOfflineNote] = useState<string | null>(null);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [revealedWordIndices, setRevealedWordIndices] = useState<Set<number>>(new Set());
  const [revealFullAyah, setRevealFullAyah] = useState<boolean>(false);
  const [grades, setGrades] = useState<Record<number, RecallGrade>>({});
  const [sessionFinished, setSessionFinished] = useState<boolean>(false);

  const surahMeta = useMemo(
    () => ALL_114_SURAHS.find((s) => s.number === selectedSurah) || ALL_114_SURAHS[111],
    [selectedSurah]
  );

  const surahOptions = useMemo(
    () =>
      ALL_114_SURAHS.map((s) => ({
        value: String(s.number),
        label: `${s.number}. ${s.nameTranslit} (${s.ayahCount} Ayahs)`,
        subtitle: `${s.nameEnglish} · ${s.nameArabic}`,
      })),
    []
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setOfflineNote(null);
    setActiveIdx(0);
    setRevealedWordIndices(new Set());
    setRevealFullAyah(false);
    setGrades({});
    setSessionFinished(false);

    void getSurahPayload(selectedSurah, 'en', reciterName).then((res) => {
      if (cancelled) return;
      setAyahs(res.ayahs.slice(0, 15)); // Focus session up to 15 Ayahs per check drill
      if (res.offlineUnavailable || res.ayahs.length === 0) {
        setOfflineNote(
          'Download this Surah in Offline Storage to run Memorization Check without internet.'
        );
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [selectedSurah, reciterName]);

  const currentAyah = ayahs[activeIdx];
  const words = useMemo(() => {
    if (!currentAyah) return [];
    return formatAyahTextForScript(currentAyah.arabicUthmani, scriptStyle)
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }, [currentAyah, scriptStyle]);

  const isWordHiddenByDefault = (idx: number): boolean => {
    if (revealFullAyah || revealedWordIndices.has(idx)) return false;
    if (difficulty === 'full_blind') return true;
    if (difficulty === 'first_word') return idx > 0;
    // key_words: hide every alternate word after the first
    return idx > 0 && idx % 2 === 1;
  };

  const toggleRevealWord = (idx: number) => {
    void triggerLightHaptic();
    setRevealedWordIndices((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  };

  const handlePlayVerificationAudio = () => {
    if (!currentAyah) return;
    void triggerLightHaptic();
    void audioManager.playAyahRange({
      surahNumber: selectedSurah,
      startAyah: currentAyah.numberInSurah,
      endAyah: currentAyah.numberInSurah,
      reciterName,
    });
  };

  const handleGrade = (grade: RecallGrade) => {
    if (!currentAyah) return;
    const nextGrades = { ...grades, [currentAyah.numberInSurah]: grade };
    setGrades(nextGrades);
    void (grade === 'solid' ? triggerSuccessHaptic() : triggerLightHaptic());

    if (activeIdx + 1 < ayahs.length) {
      setActiveIdx((i) => i + 1);
      setRevealedWordIndices(new Set());
      setRevealFullAyah(false);
    } else {
      setSessionFinished(true);
      const totalChecked = ayahs.length;
      const solidCount = Object.values(nextGrades).filter((g) => g === 'solid').length;
      const hesitatedCount = Object.values(nextGrades).filter((g) => g === 'hesitated').length;
      const accuracyPct =
        totalChecked > 0
          ? Math.round(((solidCount + hesitatedCount * 0.5) / totalChecked) * 100)
          : 0;
      onCompleteCheck?.({
        surahNumber: selectedSurah,
        surahName: surahMeta.nameTranslit,
        accuracyPct,
        solidCount,
        totalChecked,
      });
    }
  };

  const handleRestart = () => {
    void triggerLightHaptic();
    setActiveIdx(0);
    setRevealedWordIndices(new Set());
    setRevealFullAyah(false);
    setGrades({});
    setSessionFinished(false);
  };

  const summaryStats = useMemo(() => {
    const vals = Object.values(grades);
    const solid = vals.filter((g) => g === 'solid').length;
    const hesitated = vals.filter((g) => g === 'hesitated').length;
    const forgot = vals.filter((g) => g === 'forgot').length;
    const total = ayahs.length || 1;
    const scorePct = Math.round(((solid + hesitated * 0.5) / total) * 100);
    return { solid, hesitated, forgot, total, scorePct };
  }, [grades, ayahs.length]);

  return (
    <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 sm:p-5 shadow-xs space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-amber-600 dark:text-amber-300">
            Memory Verification Drill
          </p>
          <h3 className="text-base font-extrabold text-[var(--text-primary)]">
            Surah Memorization Check
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Recite from memory, tap masked blanks to peek, and score each Ayah honestly.
          </p>
        </div>
        <button
          type="button"
          onClick={handleRestart}
          aria-label="Restart memorization check"
          className="min-w-[44px] min-h-[44px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[#14532D] dark:hover:text-emerald-200 flex items-center justify-center shrink-0 transition active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Surah Picker + Difficulty Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <p className="text-xs font-bold text-[var(--text-secondary)]">Surah to Test</p>
          <SelectSheetField
            title="Select Surah to Test"
            value={String(selectedSurah)}
            options={surahOptions}
            onChange={(val) => setSelectedSurah(Number(val))}
            searchable
          />
        </div>
        <div className="space-y-1.5">
          <p className="text-xs font-bold text-[var(--text-secondary)]">Recall Mode</p>
          <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
            {(
              [
                { id: 'key_words', label: 'Blanks' },
                { id: 'first_word', label: '1st Word' },
                { id: 'full_blind', label: 'Full Blind' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  void triggerLightHaptic();
                  setDifficulty(opt.id);
                  setRevealedWordIndices(new Set());
                  setRevealFullAyah(false);
                }}
                className={`min-h-[40px] rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  difficulty === opt.id
                    ? 'bg-[#14532D] text-white shadow-2xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-10 text-center text-xs font-semibold text-[var(--text-secondary)]">
          Loading {surahMeta.nameTranslit} verses…
        </div>
      ) : offlineNote ? (
        <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-700/40 p-4 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{offlineNote}</p>
        </div>
      ) : sessionFinished ? (
        <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/40 p-5 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#14532D] text-amber-300 mx-auto flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
              {surahMeta.nameTranslit} · Check Complete
            </p>
            <p className="text-3xl font-black text-[#14532D] dark:text-emerald-100 tabular-nums mt-1">
              {summaryStats.scorePct}% Accuracy
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-1 tabular-nums">
              {summaryStats.solid} Solid · {summaryStats.hesitated} Hesitated ·{' '}
              {summaryStats.forgot} Needs Review
            </p>
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className="min-h-[44px] px-5 rounded-2xl bg-[#14532D] text-white text-xs font-extrabold inline-flex items-center gap-2 active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retest {surahMeta.nameTranslit}</span>
          </button>
        </div>
      ) : currentAyah ? (
        <div className="space-y-4">
          {/* Progress header */}
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span className="font-bold tabular-nums">
              Ayah {activeIdx + 1} of {ayahs.length} · {surahMeta.nameTranslit}
            </span>
            <span className="tabular-nums">
              {Object.keys(grades).length} checked
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-emerald-950 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#14532D] to-[#22C55E] transition-all duration-300"
              style={{ width: `${Math.round(((activeIdx + 1) / ayahs.length) * 100)}%` }}
            />
          </div>

          {/* Interactive Masked Arabic Ayah Box */}
          <div
            dir="rtl"
            className="rounded-2xl bg-[#FDFBF7] dark:bg-emerald-950/60 border border-amber-200/80 dark:border-emerald-700/40 p-5 min-h-[120px] flex flex-wrap items-center justify-center gap-x-2.5 gap-y-3"
          >
            {words.map((word, idx) => {
              const hidden = isWordHiddenByDefault(idx);
              return (
                <button
                  key={`${currentAyah.numberInSurah}_${idx}`}
                  type="button"
                  onClick={() => toggleRevealWord(idx)}
                  aria-label={hidden ? `Reveal hidden word ${idx + 1}` : word}
                  className={`min-h-[44px] px-3 py-1.5 rounded-xl transition active:scale-95 ${
                    hidden
                      ? 'bg-emerald-900/10 dark:bg-emerald-400/15 border border-dashed border-emerald-700/40 dark:border-emerald-300/40 text-transparent select-none min-w-[68px]'
                      : `${getArabicScriptFontClass(scriptStyle)} text-2xl sm:text-3xl text-[#14532D] dark:text-emerald-50`
                  }`}
                >
                  {hidden ? '••••' : word}
                </button>
              );
            })}
          </div>

          {revealFullAyah && currentAyah.translations?.en && (
            <p className="text-xs text-[var(--text-secondary)] text-center leading-relaxed px-2">
              “{currentAyah.translations.en}”
            </p>
          )}

          {/* Peek & Listen Controls */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                void triggerLightHaptic();
                setRevealFullAyah((v) => !v);
              }}
              className="min-h-[46px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-2 active:scale-[0.98] transition"
            >
              {revealFullAyah ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{revealFullAyah ? 'Hide Ayah' : 'Reveal Full Ayah'}</span>
            </button>
            <button
              type="button"
              onClick={handlePlayVerificationAudio}
              className="min-h-[46px] rounded-2xl bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-400/40 text-xs font-extrabold text-amber-950 dark:text-amber-100 flex items-center justify-center gap-2 active:scale-[0.98] transition"
            >
              <Volume2 className="w-4 h-4" />
              <span>Verify Audio</span>
            </button>
          </div>

          {/* Honest Self-Grading Buttons */}
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[var(--text-secondary)] text-center">
              How well did you recite Ayah {currentAyah.numberInSurah} from memory?
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleGrade('forgot')}
                className="min-h-[48px] rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 text-rose-800 dark:text-rose-200 text-xs font-extrabold active:scale-95 transition"
              >
                Forgot
              </button>
              <button
                type="button"
                onClick={() => handleGrade('hesitated')}
                className="min-h-[48px] rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/40 text-amber-900 dark:text-amber-200 text-xs font-extrabold active:scale-95 transition"
              >
                Hesitated
              </button>
              <button
                type="button"
                onClick={() => handleGrade('solid')}
                className="min-h-[48px] rounded-2xl bg-[#14532D] text-white text-xs font-extrabold flex items-center justify-center gap-1 active:scale-95 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Solid</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
