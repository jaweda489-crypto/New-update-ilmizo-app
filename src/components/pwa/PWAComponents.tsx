import React, { useEffect, useState } from 'react';
import { ArrowLeft, WifiOff, ShieldCheck, HardDrive, Sparkles } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useIlmizo } from '../../context/IlmizoContext';
import { audioManager } from '../../services/audioManager';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-2xl bg-[#D97706] px-4 py-2 text-xs font-bold text-white shadow-lg"
    >
      <WifiOff className="w-3.5 h-3.5 shrink-0" />
      <span>Offline Mode — Saved Surahs and progress are ready</span>
    </div>
  );
};

export const SyncStatusBadge: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const isOnline = useOnlineStatus();
  return (
    <div
      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
        compact ? 'text-emerald-100/90' : 'text-[var(--text-secondary)]'
      }`}
      title="Your progress is saved privately on this device and works offline."
    >
      <HardDrive className="w-3.5 h-3.5 text-amber-500 shrink-0" />
      <span>
        {compact
          ? 'Saved on device'
          : isOnline
          ? 'Saved on this device · Works offline'
          : 'Offline · Saved on this device'}
      </span>
    </div>
  );
};

export const PWAInstallPromptBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState<boolean>(false);

  useEffect(() => {
    try {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;
      setIsStandalone(standalone);
    } catch {
      // ignore
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (isStandalone || dismissed) return null;

  const isIOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as any).MSStream;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice.catch(() => {});
      setDeferredPrompt(null);
    } else {
      setShowInstructionsModal(true);
    }
  };

  if (!deferredPrompt && !showInstructionsModal) {
    return null;
  }

  return (
    <>
      {deferredPrompt && (
        <div className="bg-[#0F3826] text-white px-3.5 py-2 border-b border-amber-400/30 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <HardDrive className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="font-semibold">Install Ilmizo for faster offline access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-2.5 py-1 rounded-lg bg-amber-400 text-emerald-950 font-extrabold text-[11px]"
            >
              Install App
            </button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="px-1.5 py-1 text-emerald-200 hover:text-white text-[11px]"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {showInstructionsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-sm w-full rounded-3xl bg-[var(--bg-sheet)] border border-[var(--border-subtle)] p-5 space-y-3 text-[var(--text-primary)] shadow-xl">
            <h3 className="text-sm font-extrabold text-[#14532D] dark:text-emerald-300">
              Install Ilmizo as an Offline App
            </h3>
            {isIOS ? (
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                On iPhone/iPad Safari, tap the <strong>Share</strong> button in the bottom bar and select{' '}
                <strong>Add to Home Screen</strong>.
              </p>
            ) : (
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Open Ilmizo in a standalone browser tab and select <strong>Install App</strong> or{' '}
                <strong>Add to Home Screen</strong> from your browser menu.
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowInstructionsModal(false)}
              className="w-full py-2.5 min-h-[44px] rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-extrabold text-xs"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const MobileStatusBar: React.FC<{ time?: string; light?: boolean }> = () => (
  <div className="h-1.5 w-full select-none pointer-events-none" aria-hidden="true" />
);

const MASCOT_CHEER_PHRASES: Record<'Ayaan' | 'Ayla' | 'Mizo' | 'Aqib', string[]> = {
  Ayaan: ['Assalamu Alaikum!', 'Bismillah! Let’s learn!', 'MashaAllah, great job!', 'SubhanAllah!'],
  Ayla: ['You’re doing amazing!', 'Alhamdulillah!', 'Let’s practice together!', 'Allah loves kindness!'],
  Mizo: ['✨ Shine bright with Iman!', '🌟 +1 Sparkle of Ilm!', 'MashaAllah, star learner!', 'Keep glowing! ✨'],
  Aqib: ['Assalamu Alaikum', 'BarakAllahu Feek', 'Keep up your daily wird'],
};

export const CharacterAvatar: React.FC<{
  character: 'Ayaan' | 'Ayla' | 'Mizo' | 'Aqib';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  interactive?: boolean;
  mood?: 'idle' | 'happy' | 'listening' | 'celebrating';
}> = ({
  character,
  size = 'md',
  className = '',
  interactive = true,
  mood = 'idle',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [cheerIndex, setCheerIndex] = useState<number | null>(null);
  const [burstKey, setBurstKey] = useState(0);

  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  }[size];

  // Distinct Framer Motion idle animations for Ayaan, Ayla, and Mizo
  const idleAnimation = prefersReducedMotion
    ? {}
    : mood === 'celebrating'
    ? {
        y: [0, -10, 0],
        rotate: [0, -6, 6, -4, 4, 0],
        scale: [1, 1.08, 1],
      }
    : mood === 'listening'
    ? {
        scale: [1, 1.06, 1],
        rotate: [0, 2, -2, 0],
      }
    : character === 'Ayaan'
    ? {
        y: [0, -4, 0],
        rotate: [0, 1.8, -1.8, 0],
        scale: [1, 1.02, 1],
      }
    : character === 'Ayla'
    ? {
        y: [0, -5, 0],
        rotate: [0, -2.5, 2.5, 0],
        scale: [1, 1.03, 1],
      }
    : character === 'Mizo'
    ? {
        y: [0, -7, 0],
        rotate: [-4, 4, -4],
        scale: [1, 1.06, 1],
      }
    : {
        y: [0, -2, 0],
      };

  const idleTransition = {
    duration:
      mood === 'celebrating'
        ? 1.2
        : mood === 'listening'
        ? 1.5
        : character === 'Mizo'
        ? 2.6
        : character === 'Ayla'
        ? 3.4
        : 3.1,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  };

  const handleTap = (e: React.MouseEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    const phrases = MASCOT_CHEER_PHRASES[character];
    const nextIdx = cheerIndex === null ? 0 : (cheerIndex + 1) % phrases.length;
    setCheerIndex(nextIdx);
    setBurstKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (cheerIndex === null) return;
    const timer = setTimeout(() => setCheerIndex(null), 2200);
    return () => clearTimeout(timer);
  }, [cheerIndex, burstKey]);

  const gradientClass =
    character === 'Ayaan'
      ? 'from-amber-300 via-emerald-600 to-emerald-950 ring-amber-300/85'
      : character === 'Ayla'
      ? 'from-pink-200 via-rose-500 to-emerald-900 ring-pink-300/85'
      : character === 'Mizo'
      ? 'from-amber-200 via-amber-400 to-emerald-900 ring-amber-300'
      : 'from-amber-200 to-emerald-900 ring-amber-300/80';

  const imgSrc =
    character === 'Ayaan'
      ? '/assets/illustrations/avatar_ayaan_3d.webp'
      : character === 'Ayla'
      ? '/assets/illustrations/avatar_ayla_3d.webp'
      : character === 'Mizo'
      ? '/assets/illustrations/avatar_mizo_3d.webp'
      : '/assets/illustrations/avatar_aqib_3d.webp';

  return (
    <div className="relative inline-flex items-center justify-center shrink-0 select-none">
      {/* Interactive Cheer Bubble on Tap */}
      <AnimatePresence>
        {cheerIndex !== null && (
          <motion.div
            key={`cheer-${burstKey}`}
            initial={{ opacity: 0, y: 8, scale: 0.75 }}
            animate={{ opacity: 1, y: -6, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-2xl bg-gradient-to-r from-[#0F3826] to-[#14532D] px-3 py-1 text-[11px] font-extrabold text-amber-300 shadow-lg border border-amber-300/50 pointer-events-none flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
            <span>{MASCOT_CHEER_PHRASES[character][cheerIndex]}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Halo for Mizo */}
      {character === 'Mizo' && !prefersReducedMotion && (
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-amber-400/35 blur-md pointer-events-none"
        />
      )}

      <motion.div
        onClick={handleTap}
        animate={idleAnimation}
        transition={idleTransition}
        whileHover={
          interactive && !prefersReducedMotion
            ? {
                scale: 1.1,
                rotate: character === 'Ayla' ? -5 : 5,
                transition: { type: 'spring', stiffness: 400, damping: 16 },
              }
            : undefined
        }
        whileTap={
          interactive && !prefersReducedMotion
            ? {
                scale: 0.88,
                rotate: character === 'Mizo' ? 14 : -10,
                transition: { type: 'spring', stiffness: 500, damping: 15 },
              }
            : undefined
        }
        className={`${dimensions} ${className} relative rounded-full bg-gradient-to-b ${gradientClass} p-0.5 shadow-md overflow-hidden flex items-center justify-center ring-2 ${
          interactive ? 'cursor-pointer' : ''
        }`}
        title={`${character} — Tap to interact!`}
      >
        <img
          src={imgSrc}
          alt={character}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover rounded-full"
        />
      </motion.div>

      {/* Corner Sparkle Badge for Kids Characters */}
      {character !== 'Aqib' && size !== 'sm' && (
        <motion.span
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.25, 1],
                  rotate: [0, 15, -15, 0],
                }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center text-[11px] font-black shadow-xs border border-white pointer-events-none"
        >
          ★
        </motion.span>
      )}
    </div>
  );
};

export const Kids3DMetallicBadge: React.FC<{
  badgeId: string;
  title: string;
  earned: boolean;
  selected?: boolean;
  onClick?: () => void;
}> = ({ badgeId, title, earned, selected = false, onClick }) => {
  const prefersReducedMotion = useReducedMotion();

  const themeMap: Record<
    string,
    {
      outerRing: string;
      innerCore: string;
      ribbon: string;
      emblemSvg: React.ReactNode;
    }
  > = {
    badge_quran: {
      outerRing: 'from-amber-200 via-amber-400 to-amber-700',
      innerCore: 'from-sky-400 via-blue-600 to-indigo-950',
      ribbon: 'from-sky-500 to-blue-800',
      emblemSvg: (
        <svg viewBox="0 0 48 48" className="w-9 h-9 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]">
          <path
            d="M8 14c6-2 12-1 16 2 4-3 10-4 16-2v20c-6-2-12-1-16 2-4-3-10-4-16-2V14z"
            fill="url(#goldGrad)"
            stroke="#FEF3C7"
            strokeWidth="1.8"
          />
          <path d="M24 16v18" stroke="#78350F" strokeWidth="1.5" />
          <circle cx="24" cy="10" r="3" fill="#FDE68A" />
        </svg>
      ),
    },
    badge_dua: {
      outerRing: 'from-amber-200 via-amber-400 to-amber-700',
      innerCore: 'from-emerald-400 via-emerald-600 to-emerald-950',
      ribbon: 'from-emerald-500 to-emerald-800',
      emblemSvg: (
        <svg viewBox="0 0 48 48" className="w-9 h-9 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]">
          <path
            d="M14 28c0-6 4-12 10-16 6 4 10 10 10 16a10 10 0 01-20 0z"
            fill="url(#goldGrad)"
            stroke="#FEF3C7"
            strokeWidth="1.8"
          />
          <circle cx="24" cy="25" r="4" fill="#FFFBEB" />
        </svg>
      ),
    },
    badge_salah: {
      outerRing: 'from-amber-200 via-amber-400 to-amber-700',
      innerCore: 'from-amber-400 via-orange-600 to-amber-950',
      ribbon: 'from-amber-500 to-orange-800',
      emblemSvg: (
        <svg viewBox="0 0 48 48" className="w-9 h-9 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]">
          <path
            d="M24 10c-6 5-9 10-9 16v10h18V26c0-6-3-11-9-16z"
            fill="url(#goldGrad)"
            stroke="#FEF3C7"
            strokeWidth="1.8"
          />
          <path d="M20 36v-7a4 4 0 018 0v7" fill="#0F3826" />
          <circle cx="24" cy="7" r="2" fill="#FEF08A" />
        </svg>
      ),
    },
    badge_kind: {
      outerRing: 'from-amber-200 via-amber-400 to-amber-700',
      innerCore: 'from-rose-400 via-pink-600 to-rose-950',
      ribbon: 'from-rose-500 to-pink-800',
      emblemSvg: (
        <svg viewBox="0 0 48 48" className="w-9 h-9 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]">
          <path
            d="M24 38s-13-8.2-13-17a7.5 7.5 0 0113-4.8A7.5 7.5 0 0137 21c0 8.8-13 17-13 17z"
            fill="url(#roseGrad)"
            stroke="#FFE4E6"
            strokeWidth="1.8"
          />
        </svg>
      ),
    },
    badge_5surahs: {
      outerRing: 'from-amber-200 via-amber-400 to-amber-700',
      innerCore: 'from-teal-400 via-emerald-700 to-emerald-950',
      ribbon: 'from-teal-500 to-emerald-800',
      emblemSvg: (
        <svg viewBox="0 0 48 48" className="w-9 h-9 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]">
          <polygon
            points="24,8 28.5,18 39.5,19.2 31.2,26.8 33.5,37.8 24,32.2 14.5,37.8 16.8,26.8 8.5,19.2 19.5,18"
            fill="url(#goldGrad)"
            stroke="#FEF3C7"
            strokeWidth="1.8"
          />
          <text x="24" y="27" textAnchor="middle" fill="#0F3826" fontSize="11" fontWeight="900">
            5
          </text>
        </svg>
      ),
    },
    badge_30day: {
      outerRing: 'from-amber-200 via-amber-400 to-amber-700',
      innerCore: 'from-indigo-400 via-purple-700 to-indigo-950',
      ribbon: 'from-indigo-500 to-purple-800',
      emblemSvg: (
        <svg viewBox="0 0 48 48" className="w-9 h-9 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]">
          <path
            d="M14 14h20v8c0 6-4.5 11-10 11s-10-5-10-11v-8z"
            fill="url(#goldGrad)"
            stroke="#FEF3C7"
            strokeWidth="1.8"
          />
          <path d="M19 33h10v5H19z" fill="#FDE68A" />
          <text x="24" y="24" textAnchor="middle" fill="#0F3826" fontSize="9.5" fontWeight="900">
            30d
          </text>
        </svg>
      ),
    },
  };

  const theme = themeMap[badgeId] || themeMap.badge_quran;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      animate={
        earned && !prefersReducedMotion
          ? {
              y: [0, -4, 0],
            }
          : {}
      }
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.06, rotate: 2 }}
      whileTap={{ scale: 0.94 }}
      className={`group relative flex flex-col items-center text-center p-2.5 rounded-3xl transition ${
        selected
          ? 'bg-emerald-950/10 dark:bg-emerald-500/20 ring-2 ring-[#14532D] dark:ring-emerald-400'
          : 'hover:bg-amber-50/60 dark:hover:bg-white/5'
      } ${earned ? '' : 'opacity-50 grayscale-[45%]'}`}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="50%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3D Metallic Shield Medallion */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Bottom Ribbon Tails */}
        <div
          className={`absolute -bottom-1 w-12 h-5 bg-gradient-to-b ${theme.ribbon} rounded-b-lg shadow-md border-x border-b border-amber-300/60`}
        />
        {/* Outer 3D Gold Bevel Shield */}
        <div
          className={`relative w-[72px] h-[72px] rounded-[24px] rotate-45 bg-gradient-to-br ${theme.outerRing} p-[5px] shadow-[0_10px_20px_rgba(15,56,38,0.28),inset_0_2px_4px_rgba(255,255,255,0.85)] border border-amber-100`}
        >
          {/* Inner 3D Jewel Core */}
          <div
            className={`w-full h-full rounded-[19px] bg-gradient-to-br ${theme.innerCore} flex items-center justify-center shadow-[inset_0_4px_8px_rgba(0,0,0,0.45)] border border-amber-200/60`}
          >
            {/* Un-rotate inner emblem */}
            <div className="-rotate-45 flex items-center justify-center">
              {theme.emblemSvg}
            </div>
          </div>
        </div>
        {/* Specular Top-Left Shine */}
        <div className="absolute top-2 left-4 w-5 h-2 rounded-full bg-white/60 rotate-[-25deg] blur-[0.5px] pointer-events-none" />
        {earned && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-emerald-950 text-[11px] font-black flex items-center justify-center shadow-sm border border-white">
            ✓
          </span>
        )}
      </div>

      <p className="text-xs font-extrabold text-[var(--text-primary)] mt-2 leading-tight">{title}</p>
      <span
        className={`text-[11px] font-bold mt-0.5 ${
          earned
            ? 'text-emerald-700 dark:text-emerald-300'
            : 'text-[var(--text-muted)]'
        }`}
      >
        {earned ? 'Unlocked' : 'Locked'}
      </span>
    </motion.button>
  );
};

export const VerifiedSourceFooter: React.FC<{
  source: string;
  reference: string;
  reviewer?: string;
}> = ({ source, reference, reviewer = 'Ilmizo Sharia & Text Verification Registry' }) => (
  <div className="mt-3 pt-2.5 border-t border-[var(--divider)] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-secondary)]">
    <div className="flex items-center gap-1.5">
      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
      <span>Verified · {source} · {reference}</span>
    </div>
    <span className="text-[var(--text-muted)]">{reviewer}</span>
  </div>
);

export interface ScreenBackButtonProps {
  onClick?: () => void;
  variant?: 'dark' | 'light' | 'kids';
  label?: string;
  className?: string;
}

/**
 * Global 44x44px touch-target Back Button for all secondary screens across Adult Mode,
 * Kids World, and Parent Hub. Stops any active audio immediately and pops the navigation history stack.
 */
export const ScreenBackButton: React.FC<ScreenBackButtonProps> = ({
  onClick,
  variant = 'dark',
  label = 'Go Back',
  className = '',
}) => {
  const { mode, goBack } = useIlmizo();

  const handlePress = () => {
    const audioState = audioManager.getState();
    const keepQuranPlaying =
      mode === 'adult' && Boolean(audioState.quranSequence.mode);
    if (!keepQuranPlaying) {
      audioManager.stopAll();
    }
    if (onClick) {
      onClick();
    } else {
      goBack();
    }
  };

  const variantClasses =
    variant === 'light'
      ? 'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[#0F3826] dark:text-emerald-200 border border-[var(--border-subtle)] shadow-2xs'
      : variant === 'kids'
      ? 'bg-white/20 hover:bg-white/30 text-white border border-white/25 backdrop-blur-xs shadow-2xs'
      : 'bg-black/30 hover:bg-black/45 text-white border border-white/20 backdrop-blur-xs shadow-2xs';

  return (
    <button
      type="button"
      onClick={handlePress}
      aria-label={label}
      title={label}
      className={`min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center transition active:scale-95 shrink-0 ${variantClasses} ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
};

