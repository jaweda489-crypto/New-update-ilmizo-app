import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Bookmark, Check } from 'lucide-react';
import { triggerLightHaptic, triggerSelectionHaptic, triggerSuccessHaptic } from '../../services/hapticsService';

/**
 * Calm tactile Salah completion button with subtle spring checkmark bloom & optional haptic.
 */
export const SalahStatusButton: React.FC<{
  active: boolean;
  label: string;
  activeClassName: string;
  inactiveClassName?: string;
  onClick: () => void;
  ariaLabel?: string;
}> = ({
  active,
  label,
  activeClassName,
  inactiveClassName = 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-emerald-700/30',
  onClick,
  ariaLabel,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel || label}
      aria-pressed={active}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
      transition={{ duration: 0.12 }}
      onClick={() => {
        if (!active) {
          void triggerSuccessHaptic();
        } else {
          void triggerSelectionHaptic();
        }
        onClick();
      }}
      className={`min-h-[40px] px-2.5 py-1.5 rounded-xl text-xs font-extrabold border transition flex items-center justify-center gap-1 ${
        active ? activeClassName : inactiveClassName
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {active && (
          <motion.span
            key="check"
            initial={prefersReducedMotion ? { opacity: 1 } : { scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 460, damping: 24 }}
            className="inline-flex items-center"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </motion.span>
        )}
      </AnimatePresence>
      <span>{label}</span>
    </motion.button>
  );
};

/**
 * Subtle tactile Tasbih counter ring with expanding emerald/gold ripple & smooth count tick.
 */
export const TasbihTapRing: React.FC<{
  count: number;
  target: number;
  onTap: () => void;
}> = ({ count, target, onTap }) => {
  const prefersReducedMotion = useReducedMotion();
  const [rippleKey, setRippleKey] = useState(0);

  const handlePress = () => {
    setRippleKey((k) => k + 1);
    if (target > 0 && (count + 1) % target === 0) {
      void triggerSuccessHaptic();
    } else {
      void triggerLightHaptic();
    }
    onTap();
  };

  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence>
        {!prefersReducedMotion && rippleKey > 0 && (
          <motion.span
            key={rippleKey}
            initial={{ scale: 0.92, opacity: 0.45 }}
            animate={{ scale: 1.24, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.36, ease: 'easeOut' }}
            className="pointer-events-none absolute w-48 h-48 rounded-full border-2 border-amber-400/70"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handlePress}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 460, damping: 28 }}
        aria-label={`Increment Tasbih counter, current count ${count}`}
        className="relative w-48 h-48 rounded-full bg-gradient-to-b from-[#14532D] via-[#0F3826] to-[#0A261A] text-white border-[5px] border-amber-400/80 shadow-xl flex flex-col items-center justify-center select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/60"
      >
        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-200/85">
          Tap to Count
        </span>
        <motion.span
          key={count}
          initial={prefersReducedMotion ? false : { scale: 1.12, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.14 }}
          className="text-5xl font-black tabular-nums text-amber-300 mt-1"
        >
          {count}
        </motion.span>
        <span className="text-xs font-bold text-emerald-100/80 mt-1 tabular-nums">
          Goal {target}
        </span>
      </motion.button>
    </div>
  );
};

/**
 * Tactile Bookmark button with restrained pop feedback and accessible pressed state.
 */
export const BookmarkPopButton: React.FC<{
  saved: boolean;
  onToggle: () => void;
  label?: string;
  className?: string;
}> = ({ saved, onToggle, label, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-pressed={saved}
      aria-label={label || (saved ? 'Remove bookmark' : 'Save bookmark')}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.88 }}
      onClick={() => {
        void triggerSelectionHaptic();
        onToggle();
      }}
      className={`min-w-[40px] min-h-[40px] px-2.5 rounded-xl border transition inline-flex items-center justify-center gap-1.5 text-xs font-bold ${
        saved
          ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-400/40'
          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
      } ${className}`}
    >
      <motion.span
        key={saved ? 'saved' : 'unsaved'}
        initial={prefersReducedMotion ? false : { scale: 0.75 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 22 }}
        className="inline-flex"
      >
        <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-500 text-amber-500' : ''}`} />
      </motion.span>
      {label && <span>{label}</span>}
    </motion.button>
  );
};
