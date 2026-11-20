import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Award, Sparkles, Star } from 'lucide-react';

interface CelebrationBurstProps {
  visible: boolean;
  title?: string;
  subtitle?: string;
}

const CONFETTI_OFFSETS = [
  { x: -72, y: -56, rotate: -25, color: 'text-amber-300', delay: 0.02 },
  { x: 68, y: -62, rotate: 28, color: 'text-emerald-300', delay: 0.04 },
  { x: -92, y: 8, rotate: -40, color: 'text-amber-400', delay: 0.06 },
  { x: 88, y: 12, rotate: 35, color: 'text-emerald-200', delay: 0.05 },
  { x: -46, y: -88, rotate: -14, color: 'text-yellow-300', delay: 0.03 },
  { x: 52, y: -90, rotate: 18, color: 'text-amber-200', delay: 0.07 },
];

export const CelebrationBurst: React.FC<CelebrationBurstProps> = ({
  visible,
  title = 'MashaAllah!',
  subtitle,
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.92 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="relative rounded-3xl bg-[#0F3826]/95 border-2 border-[#D4AF37] px-6 py-4 text-center text-white shadow-2xl backdrop-blur-xs max-w-xs w-full">
            {!prefersReduced &&
              CONFETTI_OFFSETS.map((item, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: item.x,
                    y: item.y,
                    scale: [0.5, 1.15, 0.7],
                    rotate: item.rotate,
                  }}
                  transition={{ duration: 0.9, delay: item.delay, ease: 'easeOut' }}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${item.color}`}
                >
                  {idx % 2 === 0 ? (
                    <Star className="w-5 h-5 fill-current" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </motion.span>
              ))}

            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center mx-auto mb-2 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <p className="text-base font-extrabold text-amber-300">{title}</p>
            {subtitle && (
              <p className="text-xs font-semibold text-emerald-50/90 mt-1 leading-snug">
                {subtitle}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
