import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Droplets, Sparkles, Star, BookOpen, X } from 'lucide-react';
import { ChildProfile } from '../../types/ilmizo';
import { triggerLightHaptic, triggerSuccessHaptic } from '../../services/hapticsService';

interface QuranGardenViewProps {
  child: ChildProfile;
  completedStoryCount: number;
  practicedSurahCount: number;
  qaidaCompletedCount: number;
  onClose?: () => void;
  onOpenQuran?: () => void;
}

interface GardenPlantItem {
  id: string;
  label: string;
  sourceLabel: string;
  kind: 'palm' | 'olive' | 'flower' | 'lantern';
  xPct: number;
  yPct: number;
  unlocked: boolean;
}

export const QuranGardenView: React.FC<QuranGardenViewProps> = ({
  child,
  completedStoryCount,
  practicedSurahCount,
  qaidaCompletedCount,
  onClose,
  onOpenQuran,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [wateredToday, setWateredToday] = useState<boolean>(() => {
    try {
      const todayKey = new Date().toISOString().slice(0, 10);
      return localStorage.getItem(`ilmizo_garden_water_${child.id}_${todayKey}`) === '1';
    } catch {
      return false;
    }
  });
  const [selectedPlant, setSelectedPlant] = useState<GardenPlantItem | null>(null);

  const growthScore = useMemo(
    () =>
      child.stars +
      practicedSurahCount * 15 +
      completedStoryCount * 10 +
      qaidaCompletedCount * 12,
    [child.stars, practicedSurahCount, completedStoryCount, qaidaCompletedCount]
  );

  const stage = useMemo(() => {
    if (growthScore >= 260) return { level: 5, name: 'Jannah Paradise Garden', nextTarget: 400 };
    if (growthScore >= 160) return { level: 4, name: 'Golden Orchard', nextTarget: 260 };
    if (growthScore >= 90) return { level: 3, name: 'Blooming Oasis', nextTarget: 160 };
    if (growthScore >= 35) return { level: 2, name: 'Sprouting Meadow', nextTarget: 90 };
    return { level: 1, name: 'Little Seedling', nextTarget: 35 };
  }, [growthScore]);

  const plants: GardenPlantItem[] = useMemo(
    () => [
      {
        id: 'plant_fatiha',
        label: 'Date Palm of Al-Fatiha',
        sourceLabel: 'Grown from opening Quran recitation',
        kind: 'palm',
        xPct: 18,
        yPct: 58,
        unlocked: true,
      },
      {
        id: 'plant_ikhlas',
        label: 'Olive Tree of Sincerity',
        sourceLabel: 'Unlocks at 1+ practiced Surah or 20 Stars',
        kind: 'olive',
        xPct: 78,
        yPct: 56,
        unlocked: practicedSurahCount >= 1 || child.stars >= 20,
      },
      {
        id: 'plant_qaida',
        label: 'Jasmine of Noorani Qaida',
        sourceLabel: 'Unlocks when you practice Qaida letters',
        kind: 'flower',
        xPct: 35,
        yPct: 72,
        unlocked: qaidaCompletedCount >= 1 || child.stars >= 10,
      },
      {
        id: 'plant_story',
        label: 'Golden Lantern of Stories',
        sourceLabel: 'Unlocks after finishing 1+ Islamic Story',
        kind: 'lantern',
        xPct: 50,
        yPct: 48,
        unlocked: completedStoryCount >= 1 || child.stars >= 25,
      },
      {
        id: 'plant_salah',
        label: 'Lotus Blossom of Salah',
        sourceLabel: 'Unlocks at 45+ Jannah Stars',
        kind: 'flower',
        xPct: 65,
        yPct: 74,
        unlocked: child.stars >= 45 || practicedSurahCount >= 2,
      },
      {
        id: 'plant_hifz',
        label: 'Royal Orchard Palm',
        sourceLabel: 'Unlocks at 100+ Jannah Stars or 3 Surahs',
        kind: 'palm',
        xPct: 86,
        yPct: 70,
        unlocked: child.stars >= 100 || practicedSurahCount >= 3,
      },
    ],
    [child.stars, practicedSurahCount, qaidaCompletedCount, completedStoryCount]
  );

  const unlockedCount = plants.filter((p) => p.unlocked).length;

  const handleWaterGarden = () => {
    void triggerSuccessHaptic();
    setWateredToday(true);
    try {
      const todayKey = new Date().toISOString().slice(0, 10);
      localStorage.setItem(`ilmizo_garden_water_${child.id}_${todayKey}`, '1');
    } catch {
      // ignore storage errors
    }
  };

  return (
    <div className="rounded-3xl bg-[var(--bg-surface)] border border-emerald-200/80 dark:border-emerald-700/40 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-4 py-3.5 bg-gradient-to-r from-[#14532D] to-[#1E6B3A] text-white flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-amber-300">
            Stage {stage.level} of 5 · {stage.name}
          </p>
          <h3 className="text-base font-extrabold tracking-tight">
            {child.name}’s Quran Garden
          </h3>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Quran Garden"
            className="min-w-[44px] min-h-[44px] rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Interactive Handcrafted Garden Canvas */}
      <div className="relative h-64 sm:h-72 bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-200 dark:from-[#0B2D24] dark:via-[#114232] dark:to-[#0D3324] overflow-hidden select-none">
        {/* Sun & Crescent glow */}
        <div
          aria-hidden="true"
          className="absolute top-4 right-6 w-12 h-12 rounded-full bg-amber-300/90 shadow-[0_0_32px_rgba(251,191,36,0.65)]"
        />

        {/* Soft rolling hills SVG */}
        <svg
          viewBox="0 0 400 220"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <path
            d="M0,135 Q110,95 215,128 T400,118 L400,220 L0,220 Z"
            fill="#15803D"
            opacity="0.35"
          />
          <path
            d="M0,152 Q145,125 265,152 T400,145 L400,220 L0,220 Z"
            fill="#16A34A"
            opacity="0.55"
          />
          <path
            d="M0,175 Q180,155 400,176 L400,220 L0,220 Z"
            fill="#14532D"
            opacity="0.82"
          />
          {/* Garden Sparkling Stream */}
          <path
            d="M175,220 Q200,178 210,148 Q216,136 226,148 Q240,180 255,220 Z"
            fill="#38BDF8"
            opacity="0.55"
          />
        </svg>

        {/* Interactive Plants & Lanterns */}
        {plants.map((plant) => (
          <motion.button
            key={plant.id}
            type="button"
            onClick={() => {
              void triggerLightHaptic();
              setSelectedPlant(plant);
            }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
            animate={
              prefersReducedMotion || !plant.unlocked
                ? undefined
                : { y: [0, -3, 0] }
            }
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ left: `${plant.xPct}%`, top: `${plant.yPct}%` }}
            aria-label={`${plant.label} (${plant.unlocked ? 'Blooming' : 'Seedling locked'})`}
            className={`absolute -translate-x-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center transition ${
              plant.unlocked
                ? 'bg-white/85 dark:bg-emerald-950/85 border-2 border-amber-400 shadow-md'
                : 'bg-white/40 dark:bg-black/30 border border-dashed border-emerald-900/35 dark:border-white/25 opacity-65'
            }`}
          >
            {plant.kind === 'palm' && (
              <svg viewBox="0 0 36 36" className="w-8 h-8" aria-hidden="true">
                <rect x="16" y="16" width="4" height="15" rx="2" fill="#92400E" />
                <path d="M18,16 C12,10 6,12 4,16 C10,16 14,17 18,16 Z" fill="#15803D" />
                <path d="M18,16 C24,10 30,12 32,16 C26,16 22,17 18,16 Z" fill="#16A34A" />
                <path d="M18,15 C14,7 19,5 22,8 C20,11 19,13 18,15 Z" fill="#22C55E" />
                <circle cx="15" cy="17" r="2" fill="#F59E0B" />
                <circle cx="21" cy="17" r="2" fill="#F59E0B" />
              </svg>
            )}
            {plant.kind === 'olive' && (
              <svg viewBox="0 0 36 36" className="w-8 h-8" aria-hidden="true">
                <rect x="16" y="19" width="4" height="12" rx="2" fill="#78350F" />
                <circle cx="18" cy="14" r="9" fill="#15803D" />
                <circle cx="13" cy="15" r="5" fill="#22C55E" />
                <circle cx="23" cy="15" r="5" fill="#16A34A" />
              </svg>
            )}
            {plant.kind === 'flower' && (
              <svg viewBox="0 0 36 36" className="w-7 h-7" aria-hidden="true">
                <rect x="17" y="18" width="2.5" height="12" rx="1" fill="#15803D" />
                <circle cx="18" cy="12" r="4" fill="#F59E0B" />
                <circle cx="13" cy="15" r="3.5" fill="#FDE68A" />
                <circle cx="23" cy="15" r="3.5" fill="#FDE68A" />
                <circle cx="18" cy="15" r="3" fill="#B45309" />
              </svg>
            )}
            {plant.kind === 'lantern' && (
              <svg viewBox="0 0 36 36" className="w-7 h-7" aria-hidden="true">
                <path d="M18,5 L24,13 L22,26 L14,26 L12,13 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
                <circle cx="18" cy="18" r="3.5" fill="#FEF3C7" />
              </svg>
            )}
          </motion.button>
        ))}

        {/* Watering sparkle overlay when watered */}
        {wateredToday && (
          <div className="absolute bottom-2.5 left-3 right-3 rounded-xl bg-black/45 backdrop-blur-xs px-3 py-1.5 text-xs font-bold text-amber-200 flex items-center justify-between">
            <span>Garden watered with Bismillah today</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          </div>
        )}
      </div>

      {/* Interactive Details & Controls */}
      <div className="p-4 space-y-3.5">
        <div className="flex items-center justify-between gap-2 text-xs text-[var(--text-secondary)]">
          <span className="font-bold text-[var(--text-primary)] tabular-nums">
            {unlockedCount}/{plants.length} Trees & Blossoms Blooming
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-300 tabular-nums">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            {child.stars} Jannah Stars
          </span>
        </div>

        {/* Selected Plant Detail */}
        {selectedPlant ? (
          <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-[var(--text-primary)]">
                {selectedPlant.label}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                {selectedPlant.unlocked
                  ? `Blooming · ${selectedPlant.sourceLabel}`
                  : `Seedling · ${selectedPlant.sourceLabel}`}
              </p>
            </div>
            <span
              className={`text-xs font-extrabold whitespace-nowrap ${
                selectedPlant.unlocked
                  ? 'text-emerald-700 dark:text-emerald-300'
                  : 'text-amber-700 dark:text-amber-300'
              }`}
            >
              {selectedPlant.unlocked ? 'Blooming' : 'Growing'}
            </span>
          </div>
        ) : (
          <p className="text-xs text-[var(--text-secondary)]">
            Tap any tree, flower, or lantern above to see how your Quran recitation and stories grow your garden.
          </p>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleWaterGarden}
            className={`min-h-[46px] rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition active:scale-95 ${
              wateredToday
                ? 'bg-emerald-100 dark:bg-emerald-900/50 text-[#14532D] dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700/50'
                : 'bg-[#14532D] text-white shadow-xs'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>{wateredToday ? 'Watered Today ✓' : 'Water Garden'}</span>
          </button>
          {onOpenQuran && (
            <button
              type="button"
              onClick={onOpenQuran}
              className="min-h-[46px] rounded-2xl bg-amber-400 text-emerald-950 text-xs font-extrabold flex items-center justify-center gap-2 active:scale-95 transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>Plant More Surahs</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
