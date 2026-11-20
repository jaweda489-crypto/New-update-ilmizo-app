import React, { useEffect } from 'react';
import { AnimatePresence, motion, PanInfo, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { triggerSelectionHaptic } from '../../services/hapticsService';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Set true on destructive/critical confirmation flows so accidental taps/drags don't dismiss */
  preventBackdropDismiss?: boolean;
  maxHeightClassName?: string;
}

/**
 * Reusable Native-Style Bottom Sheet (Mobile) & Calm Centered Dialog (Desktop md+).
 * Supports spring open/close, drag-to-dismiss on mobile, Escape key, reduced-motion,
 * safe-area padding, and full Light/Dark semantic theme tokens.
 */
export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  preventBackdropDismiss = false,
  maxHeightClassName = 'max-h-[85vh]',
}) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !preventBackdropDismiss) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, preventBackdropDismiss]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (preventBackdropDismiss) return;
    if (info.offset.y > 90 || info.velocity.y > 450) {
      void triggerSelectionHaptic();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.18 }}
            onClick={() => {
              if (!preventBackdropDismiss) {
                onClose();
              }
            }}
            className="fixed inset-0 bg-black/55 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Sheet / Dialog Surface */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 44, scale: 0.98 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 40, scale: 0.98 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { type: 'spring', stiffness: 390, damping: 34, mass: 0.85 }
            }
            drag={preventBackdropDismiss || prefersReducedMotion ? false : 'y'}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0.35 }}
            onDragEnd={handleDragEnd}
            className={`relative z-10 w-full md:max-w-lg rounded-t-[28px] md:rounded-3xl bg-[var(--bg-sheet)] text-[var(--text-primary)] border-t md:border border-[var(--border-subtle)] shadow-2xl flex flex-col overflow-hidden pb-safe ${maxHeightClassName}`}
          >
            {/* Mobile Drag Handle */}
            <div className="md:hidden pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1.5 rounded-full bg-slate-300 dark:bg-emerald-200/25" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-3 px-5 pt-3 md:pt-5 pb-3 border-b border-[var(--divider)]">
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-extrabold text-[var(--text-primary)] leading-snug">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="min-w-[40px] min-h-[40px] rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center shrink-0 transition active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="px-5 py-4 overflow-y-auto flex-1 space-y-3">
              {children}
            </div>

            {/* Optional Sticky Footer */}
            {footer && (
              <div className="px-5 py-3.5 border-t border-[var(--divider)] bg-[var(--bg-sheet)]">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
