import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Lock,
  Search,
  Sparkles,
} from 'lucide-react';
import { QuranVocabWord } from '../../types/ilmizo';
import {
  computeVocabCoverageStats,
  TOP_600_TARGET_COVERAGE_PCT,
} from '../../data/ilmizoTop600Curriculum';
import { triggerLightHaptic, triggerSelectionHaptic } from '../../services/hapticsService';

interface QuranVocabMasteryViewProps {
  words: QuranVocabWord[];
  masteredVocabIds: string[];
  onToggleMastered: (wordId: string) => void;
  freeVocabLimit: number;
  adultPlusUnlocked: boolean;
  onOpenPaywall: () => void;
}

type TierFilter = 'all' | 'top100' | 'mid200' | 'high300' | 'mastered';
type GrammarFilter = 'All' | 'Verb' | 'Noun' | 'Preposition' | 'Particle' | 'Pronoun';

export const QuranVocabMasteryView: React.FC<QuranVocabMasteryViewProps> = ({
  words,
  masteredVocabIds,
  onToggleMastered,
  freeVocabLimit,
  adultPlusUnlocked,
  onOpenPaywall,
}) => {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [grammarFilter, setGrammarFilter] = useState<GrammarFilter>('All');
  const [expandedWordId, setExpandedWordId] = useState<string | null>(words[0]?.id ?? null);
  const [visibleCount, setVisibleCount] = useState<number>(40);

  const stats = useMemo(
    () => computeVocabCoverageStats(words, masteredVocabIds),
    [words, masteredVocabIds]
  );

  const masteredSet = useMemo(() => new Set(masteredVocabIds), [masteredVocabIds]);

  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    return words
      .map((word, index) => ({ word, index }))
      .filter(({ word, index }) => {
        const rank = word.frequencyRank ?? index + 1;
        if (tierFilter === 'top100' && rank > 100) return false;
        if (tierFilter === 'mid200' && (rank < 101 || rank > 300)) return false;
        if (tierFilter === 'high300' && (rank < 301 || rank > 600)) return false;
        if (tierFilter === 'mastered' && !masteredSet.has(word.id)) return false;

        if (grammarFilter !== 'All' && (word.grammarType || 'Noun') !== grammarFilter) {
          return false;
        }

        if (!q) return true;
        return (
          word.arabic.includes(q) ||
          word.transliteration.toLowerCase().includes(q) ||
          word.meaning.toLowerCase().includes(q) ||
          (word.romanUrduMeaning || '').toLowerCase().includes(q) ||
          word.rootLetters.toLowerCase().includes(q) ||
          String(rank) === q
        );
      });
  }, [words, search, tierFilter, grammarFilter, masteredSet]);

  const unlockedEntries = useMemo(
    () =>
      filteredEntries.filter(({ index }) => adultPlusUnlocked || index < freeVocabLimit),
    [filteredEntries, adultPlusUnlocked, freeVocabLimit]
  );

  const lockedCount = filteredEntries.length - unlockedEntries.length;
  const displayedEntries = unlockedEntries.slice(0, visibleCount);
  const meterRatio = Math.min(100, (stats.coveragePct / TOP_600_TARGET_COVERAGE_PCT) * 100);

  return (
    <div className="space-y-3.5">
      {/* Live 0.00% -> 81.64% Cumulative Quran Coverage Meter Hero */}
      <div className="rounded-[24px] bg-gradient-to-br from-[#0F3826] via-[#14532D] to-[#0B2A19] text-white p-5 shadow-md border border-amber-400/35 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ilmizo Top 600 Quran Curriculum</span>
            </p>
            <h2 className="text-lg font-extrabold mt-0.5 leading-snug">
              Quran You Understand
            </h2>
          </div>
          <div className="text-right shrink-0">
            <p className="text-3xl font-black text-amber-300 tabular-nums leading-none">
              {stats.coveragePct.toFixed(2)}%
            </p>
            <p className="text-[11px] text-emerald-200 tabular-nums mt-1">
              of {TOP_600_TARGET_COVERAGE_PCT}% Top-600 Goal
            </p>
          </div>
        </div>

        {/* Smooth Emerald-Gold Cumulative Progress Bar */}
        <div className="space-y-1.5">
          <div className="h-3 rounded-full bg-black/30 border border-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#22C55E] via-amber-300 to-[#F59E0B] transition-all duration-500"
              style={{ width: `${Math.max(stats.masteredCount > 0 ? 3 : 0, meterRatio)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-100/90 tabular-nums">
            <span>
              {stats.masteredCount} / {words.length} Words Mastered
            </span>
            <span>
              {stats.occurrencesRecognized.toLocaleString()} Quran occurrences
            </span>
          </div>
        </div>

        <p className="text-xs text-emerald-100/95 leading-relaxed bg-white/10 border border-white/15 rounded-2xl px-3.5 py-2.5">
          {stats.milestoneLabel}
        </p>
      </div>

      {/* Frequency Tier Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
        {(
          [
            { id: 'all', label: `All (${words.length})` },
            { id: 'top100', label: 'Top #1–100' },
            { id: 'mid200', label: '#101–300' },
            { id: 'high300', label: '#301–600' },
            { id: 'mastered', label: `Mastered (${stats.masteredCount})` },
          ] as const
        ).map((tier) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => {
              void triggerSelectionHaptic();
              setTierFilter(tier.id);
              setVisibleCount(40);
            }}
            className={`min-h-[40px] px-3.5 rounded-2xl text-xs font-extrabold whitespace-nowrap shrink-0 border transition ${
              tierFilter === tier.id
                ? 'bg-[#14532D] text-amber-300 border-[#14532D]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
            }`}
          >
            {tier.label}
          </button>
        ))}
      </div>

      {/* Grammar Category Pills + Search */}
      <div className="space-y-2">
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {(['All', 'Verb', 'Noun', 'Preposition', 'Particle', 'Pronoun'] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => {
                void triggerLightHaptic();
                setGrammarFilter(g);
                setVisibleCount(40);
              }}
              className={`min-h-[34px] px-3 rounded-xl text-[11px] font-bold whitespace-nowrap shrink-0 border transition ${
                grammarFilter === g
                  ? 'bg-amber-400/25 text-amber-900 dark:text-amber-200 border-amber-400/60'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
            >
              {g === 'All' ? 'All Grammar' : g}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(40);
            }}
            placeholder="Search Arabic, English, Roman Urdu, root, or #rank..."
            className="w-full rounded-full ilmizo-input pl-10 pr-4 py-2.5 text-xs font-medium shadow-2xs"
          />
        </div>
      </div>

      {/* Ranked Curriculum Word Cards */}
      <div className="space-y-2.5">
        {displayedEntries.length === 0 ? (
          <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 text-center space-y-1.5">
            <BookOpen className="w-6 h-6 text-emerald-700 dark:text-emerald-300 mx-auto opacity-75" />
            <p className="text-sm font-extrabold text-[var(--text-primary)]">
              No matching words in this filter
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Try clearing your search or switching back to All Words.
            </p>
          </div>
        ) : (
          displayedEntries.map(({ word, index }) => {
            const rank = word.frequencyRank ?? index + 1;
            const isMastered = masteredSet.has(word.id);
            const isExpanded = expandedWordId === word.id;

            return (
              <div
                key={word.id}
                className={`rounded-[20px] bg-[var(--bg-surface)] border shadow-2xs transition ${
                  isMastered
                    ? 'border-emerald-400/70 dark:border-emerald-500/50'
                    : 'border-[var(--border-subtle)]'
                }`}
              >
                <div className="p-3.5 flex items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      void triggerLightHaptic();
                      setExpandedWordId(isExpanded ? null : word.id);
                    }}
                    className="flex-1 min-w-0 text-left space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg bg-[#14532D] text-amber-300 text-[11px] font-black tabular-nums">
                        #{rank}
                      </span>
                      <span
                        dir="rtl"
                        className="font-arabic-uthmani text-2xl text-[var(--text-primary)] font-bold leading-none"
                      >
                        {word.arabic}
                      </span>
                      <span className="text-sm font-extrabold text-[var(--text-primary)]">
                        {word.transliteration}
                      </span>
                      {word.grammarType && (
                        <span className="px-2 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200 text-[11px] font-extrabold">
                          {word.grammarType}
                        </span>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-xs font-extrabold text-[#14532D] dark:text-emerald-300">
                        {word.meaning}
                      </p>
                      {word.romanUrduMeaning && (
                        <p className="text-xs font-semibold text-amber-800 dark:text-amber-300/90">
                          Roman Urdu: {word.romanUrduMeaning}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-[var(--text-muted)] tabular-nums">
                      <span>Repeats {word.occurrencesInQuran.toLocaleString()}x</span>
                      <span>·</span>
                      <span>Root: {word.rootLetters}</span>
                      {typeof word.cumulativeCoveragePct === 'number' && (
                        <>
                          <span>·</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-300">
                            Cumulative {word.cumulativeCoveragePct.toFixed(2)}%
                          </span>
                        </>
                      )}
                      <span className="inline-flex items-center gap-0.5 text-[#14532D] dark:text-amber-300 font-bold">
                        {isExpanded ? (
                          <>
                            Hide Ayah <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            Ayah {word.exampleRef} <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      void triggerSelectionHaptic();
                      onToggleMastered(word.id);
                    }}
                    aria-pressed={isMastered}
                    className={`min-h-[42px] px-3.5 py-2 rounded-2xl text-xs font-extrabold shrink-0 inline-flex items-center gap-1 transition active:scale-95 ${
                      isMastered
                        ? 'bg-[#22C55E] text-emerald-950 shadow-2xs'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#14532D]/50'
                    }`}
                  >
                    {isMastered && <Check className="w-3.5 h-3.5" />}
                    <span>{isMastered ? 'Mastered' : 'Learn'}</span>
                  </button>
                </div>

                {/* Highlighted Example Ayah Context (Arabic + English + Roman Urdu) */}
                {isExpanded && (
                  <div className="px-3.5 pb-3.5 pt-2.5 border-t border-[var(--border-subtle)]">
                    <div className="rounded-2xl bg-[#FDFBF7] dark:bg-emerald-950/60 border border-amber-200/80 dark:border-emerald-700/40 p-3.5 space-y-2">
                      <div className="flex items-center justify-between gap-2 text-[11px] font-extrabold text-amber-800 dark:text-amber-300">
                        <span>Qur&apos;an Example Verse</span>
                        <span className="tabular-nums">Surah {word.exampleRef}</span>
                      </div>
                      <p
                        dir="rtl"
                        className="font-arabic-uthmani text-xl sm:text-2xl text-[#14532D] dark:text-amber-100 leading-loose text-right"
                      >
                        {word.exampleAyah}
                      </p>
                      {word.exampleTranslationEn && (
                        <p className="text-xs font-semibold text-slate-800 dark:text-emerald-50 leading-relaxed">
                          “{word.exampleTranslationEn}”
                        </p>
                      )}
                      {word.exampleTranslationRomanUrdu && (
                        <p className="text-xs italic text-emerald-900/90 dark:text-amber-200/90 leading-relaxed">
                          Roman Urdu: “{word.exampleTranslationRomanUrdu}”
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Load More Pagination for Snappy Scroll Performance */}
        {unlockedEntries.length > visibleCount && (
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + 40)}
            className="w-full min-h-[46px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-extrabold text-[#14532D] dark:text-emerald-200 hover:border-[#14532D]/50 transition"
          >
            Load More Words ({unlockedEntries.length - visibleCount} remaining)
          </button>
        )}

        {/* Existing Honest Paywall Card (Unchanged Prices) */}
        {!adultPlusUnlocked && lockedCount > 0 && (
          <div className="rounded-3xl bg-gradient-to-br from-[#0F3826] to-[#14532D] text-white p-4 shadow-md border border-amber-400/40 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                  Adult Quran Plus · ₹99/yr (~₹8/mo)
                </p>
                <h3 className="text-sm font-extrabold">
                  Unlock All {words.length} Words (Reach {TOP_600_TARGET_COVERAGE_PCT}% Qur&apos;an Coverage)
                </h3>
              </div>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Top {freeVocabLimit} high-frequency words are Free Forever. Unlock the remaining{' '}
              {lockedCount} words with Roman Urdu Ayah context, Word-by-Word Hifz Studio & retention analytics with a 7-Day Free Trial.
            </p>
            <button
              type="button"
              onClick={onOpenPaywall}
              className="w-full min-h-[46px] rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs transition active:scale-95"
            >
              Start 7-Day Free Trial · Unlock Full 600-Word Curriculum
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
