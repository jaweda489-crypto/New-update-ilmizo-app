import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { triggerSelectionHaptic } from '../../services/hapticsService';

export type LivingMascotCharacter = 'Mizo' | 'Ayaan' | 'Ayla';

export type LivingMascotState =
  | 'idle'
  | 'blink'
  | 'happy'
  | 'thinking'
  | 'encouraging'
  | 'celebrating'
  | 'gentle_disappointment'
  | 'listening'
  | 'teaching'
  | 'resting';

export const ALL_LIVING_MASCOT_STATES: readonly LivingMascotState[] = [
  'idle',
  'blink',
  'happy',
  'thinking',
  'encouraging',
  'celebrating',
  'gentle_disappointment',
  'listening',
  'teaching',
  'resting',
] as const;

export interface MascotStateMeta {
  label: string;
  defaultSpeech: string;
  accentColor: string;
  ringClass: string;
}

export const MASCOT_STATE_META: Record<LivingMascotState, MascotStateMeta> = {
  idle: {
    label: 'Ready',
    defaultSpeech: 'Assalamu Alaikum! Ready for a calm 10-minute session?',
    accentColor: '#F59E0B',
    ringClass: 'ring-amber-300/80',
  },
  blink: {
    label: 'Attentive',
    defaultSpeech: 'I am right here with you!',
    accentColor: '#22C55E',
    ringClass: 'ring-emerald-300/85',
  },
  happy: {
    label: 'Happy',
    defaultSpeech: 'Alhamdulillah! You are doing so well!',
    accentColor: '#22C55E',
    ringClass: 'ring-emerald-400',
  },
  thinking: {
    label: 'Thinking',
    defaultSpeech: 'Take your time — listen carefully and think!',
    accentColor: '#F59E0B',
    ringClass: 'ring-amber-400',
  },
  encouraging: {
    label: 'Encouraging',
    defaultSpeech: 'Bismillah! You can do this — try one small step!',
    accentColor: '#22C55E',
    ringClass: 'ring-emerald-400',
  },
  celebrating: {
    label: 'Celebrating',
    defaultSpeech: 'MashaAllah! Wonderful focus and effort!',
    accentColor: '#F59E0B',
    ringClass: 'ring-amber-300',
  },
  gentle_disappointment: {
    label: 'Gentle Retry',
    defaultSpeech: 'That was close! Let us listen once more together.',
    accentColor: '#D97706',
    ringClass: 'ring-amber-300/90',
  },
  listening: {
    label: 'Listening',
    defaultSpeech: 'I am listening carefully to your recitation...',
    accentColor: '#10B981',
    ringClass: 'ring-emerald-300',
  },
  teaching: {
    label: 'Teaching',
    defaultSpeech: 'Notice the shape and sound — right to left!',
    accentColor: '#14532D',
    ringClass: 'ring-amber-300',
  },
  resting: {
    label: 'Resting',
    defaultSpeech: 'Peaceful night! Rest well and see you tomorrow, InshaAllah.',
    accentColor: '#64748B',
    ringClass: 'ring-slate-300/70',
  },
};

export function inferAmbientMascotState(now: Date = new Date()): LivingMascotState {
  const hr = now.getHours();
  if (hr >= 21 || hr < 5) return 'resting';
  return 'idle';
}

interface LivingMascotProps {
  character: LivingMascotCharacter;
  state?: LivingMascotState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speechText?: string;
  showSpeechBubble?: boolean;
  interactive?: boolean;
  onTap?: () => void;
  className?: string;
}

const CHARACTER_ASSETS: Record<LivingMascotCharacter, { src: string; gradient: string }> = {
  Mizo: {
    src: '/assets/illustrations/avatar_mizo_3d.webp',
    gradient: 'from-amber-200 via-amber-400 to-emerald-900',
  },
  Ayaan: {
    src: '/assets/illustrations/avatar_ayaan_3d.webp',
    gradient: 'from-amber-200 via-emerald-600 to-emerald-950',
  },
  Ayla: {
    src: '/assets/illustrations/avatar_ayla_3d.webp',
    gradient: 'from-amber-100 via-rose-400 to-emerald-900',
  },
};

export const LivingMascot: React.FC<LivingMascotProps> = ({
  character,
  state = 'idle',
  size = 'md',
  speechText,
  showSpeechBubble = false,
  interactive = true,
  onTap,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isBlinking, setIsBlinking] = useState(false);
  const [tapActive, setTapActive] = useState(false);

  // Periodic natural blink cadence for idle/happy/teaching states
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (state !== 'idle' && state !== 'happy' && state !== 'teaching' && state !== 'blink') {
      return;
    }
    const interval = window.setInterval(() => {
      setIsBlinking(true);
      window.setTimeout(() => setIsBlinking(false), 180);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, state]);

  const effectiveState: LivingMascotState = isBlinking || state === 'blink' ? 'blink' : state;
  const meta = MASCOT_STATE_META[effectiveState];
  const asset = CHARACTER_ASSETS[character];

  const dim = {
    sm: 'w-11 h-11',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
  }[size];

  const motionTarget = prefersReducedMotion
    ? {}
    : effectiveState === 'celebrating'
    ? { y: [0, -8, 0], rotate: [0, -5, 5, 0], scale: [1, 1.07, 1] }
    : effectiveState === 'listening'
    ? { scale: [1, 1.05, 1], y: [0, -2, 0] }
    : effectiveState === 'thinking'
    ? { rotate: [0, -4, 2, 0], y: [0, -2, 0] }
    : effectiveState === 'encouraging'
    ? { y: [0, -5, 0], scale: [1, 1.04, 1] }
    : effectiveState === 'gentle_disappointment'
    ? { y: [0, 2, 0], rotate: [0, -3, 0] }
    : effectiveState === 'teaching'
    ? { y: [0, -3, 0], rotate: [0, 3, -1, 0] }
    : effectiveState === 'resting'
    ? { y: [0, 2, 0], scale: [1, 0.98, 1] }
    : effectiveState === 'happy'
    ? { y: [0, -4, 0], scale: [1, 1.03, 1] }
    : { y: [0, -3, 0] };

  const duration =
    effectiveState === 'celebrating'
      ? 1.15
      : effectiveState === 'listening'
      ? 1.4
      : effectiveState === 'resting'
      ? 4.2
      : 3.0;

  const handleClick = () => {
    if (!interactive) return;
    void triggerSelectionHaptic();
    setTapActive(true);
    window.setTimeout(() => setTapActive(false), 2400);
    onTap?.();
  };

  const bubbleContent = speechText || meta.defaultSpeech;

  return (
    <div className={`relative inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative shrink-0">
        {/* Listening acoustic wave ring */}
        {effectiveState === 'listening' && !prefersReducedMotion && (
          <motion.span
            aria-hidden="true"
            animate={{ scale: [1, 1.32, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border-2 border-emerald-400 pointer-events-none"
          />
        )}

        {/* Celebrating golden shimmer */}
        {effectiveState === 'celebrating' && !prefersReducedMotion && (
          <motion.span
            aria-hidden="true"
            animate={{ scale: [1, 1.24, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-1 rounded-full bg-amber-300/35 blur-sm pointer-events-none"
          />
        )}

        <motion.button
          type="button"
          onClick={handleClick}
          disabled={!interactive}
          animate={motionTarget}
          transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
          whileTap={interactive && !prefersReducedMotion ? { scale: 0.92 } : undefined}
          aria-label={`${character} mascot (${meta.label})`}
          className={`${dim} relative rounded-full bg-gradient-to-b ${asset.gradient} p-0.5 ring-2 ${meta.ringClass} shadow-sm overflow-hidden flex items-center justify-center ${
            interactive ? 'cursor-pointer' : 'cursor-default'
          }`}
        >
          <img
            src={asset.src}
            alt={`${character} companion`}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover rounded-full transition-transform duration-150 ${
              effectiveState === 'blink' ? 'scale-y-[0.95]' : ''
            } ${effectiveState === 'resting' ? 'brightness-90 saturate-75' : ''}`}
          />
          {/* Subtle blink sheen overlay */}
          {effectiveState === 'blink' && (
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-white/15 pointer-events-none"
            />
          )}
        </motion.button>

        {/* Lightweight local SVG state emblem (never decorative pill spam) */}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs flex items-center justify-center text-[11px]"
        >
          {effectiveState === 'celebrating' ? (
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-amber-500" fill="currentColor">
              <path d="M8 1.5l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11.4l-3.9 2.2.8-4.4-3.2-3.1 4.4-.6L8 1.5z" />
            </svg>
          ) : effectiveState === 'thinking' ? (
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-amber-600" fill="currentColor">
              <circle cx="4" cy="9" r="1.5" />
              <circle cx="8" cy="8" r="1.7" />
              <circle cx="12" cy="7" r="1.9" />
            </svg>
          ) : effectiveState === 'listening' ? (
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 6v4M8 4v8M12 6v4" strokeLinecap="round" />
            </svg>
          ) : effectiveState === 'resting' ? (
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-slate-600 dark:text-emerald-200" fill="currentColor">
              <path d="M10.8 9.8A4.8 4.8 0 0 1 6.2 3a4.8 4.8 0 1 0 6.8 6.8 4.9 4.9 0 0 1-2.2 0z" />
            </svg>
          ) : effectiveState === 'teaching' ? (
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#14532D] dark:text-emerald-300" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M2.5 4.5C4.5 3.8 6.5 4 8 5c1.5-1 3.5-1.2 5.5-.5v7c-2-.7-4-.5-5.5.5-1.5-1-3.5-1.2-5.5-.5v-7z" />
            </svg>
          ) : effectiveState === 'gentle_disappointment' ? (
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M8 13s-4.5-2.8-4.5-6a2.6 2.6 0 0 1 4.5-1.7A2.6 2.6 0 0 1 12.5 7C12.5 10.2 8 13 8 13z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-emerald-600" fill="currentColor">
              <circle cx="8" cy="8" r="4" />
            </svg>
          )}
        </span>
      </div>

      {/* Optional Calm Speech Callout */}
      <AnimatePresence>
        {(showSpeechBubble || tapActive) && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -4 }}
            className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3 py-2 shadow-2xs max-w-xs"
          >
            <p className="text-[11px] font-extrabold text-[#14532D] dark:text-emerald-300 leading-tight">
              {character} · {meta.label}
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-snug mt-0.5">{bubbleContent}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
