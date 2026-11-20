import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, Sparkles, Volume2 } from 'lucide-react';
import {
  NOORANI_QAIDA_28_LETTERS,
  playQaidaLetterHumanAudio,
} from '../../services/humanDuaAndQaidaAudio';
import { playGentleCelebrationChime } from '../../services/celebrationEffects';
import {
  getArabicLetterStrokeGuide,
  loadChildQaidaMastery,
  saveChildLetterTracingProgress,
} from '../../services/qaidaTracingStore';
import { triggerLightHaptic, triggerSuccessHaptic } from '../../services/hapticsService';
import { LivingMascot, LivingMascotState } from '../shared/LivingMascot';

interface QaidaLetterTracingCanvasProps {
  childId?: string;
  initialLetterIdx?: number;
  onLetterTraced?: (letterName: string, coveragePercent: number) => void;
  onTriggerToast?: (msg: string) => void;
}

interface StrokePoint {
  x: number;
  y: number;
}

const CANVAS_W = 340;
const CANVAS_H = 230;
const PASS_COVERAGE_PERCENT = 42;

export const QaidaLetterTracingCanvas: React.FC<QaidaLetterTracingCanvasProps> = ({
  childId = 'default_child',
  initialLetterIdx = 0,
  onLetterTraced,
  onTriggerToast,
}) => {
  const [letterIdx, setLetterIdx] = useState<number>(initialLetterIdx);
  const [tracedLetterIds, setTracedLetterIds] = useState<string[]>(() => {
    const saved = loadChildQaidaMastery(childId);
    return Object.keys(saved.tracingByLetterId);
  });
  const [coveragePercent, setCoveragePercent] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>(
    'Start at the green dot (1) and trace smoothly right to left.'
  );
  const [mascotState, setMascotState] = useState<LivingMascotState>('teaching');
  const [strokeCount, setStrokeCount] = useState<number>(0);
  const [inkColor, setInkColor] = useState<'#14532D' | '#D97706'>('#14532D');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<StrokePoint[][]>([]);
  const isDrawingRef = useRef<boolean>(false);

  useEffect(() => {
    const saved = loadChildQaidaMastery(childId);
    setTracedLetterIds(Object.keys(saved.tracingByLetterId));
  }, [childId]);

  const activeLetter = NOORANI_QAIDA_28_LETTERS[letterIdx] || NOORANI_QAIDA_28_LETTERS[0];
  const strokeGuide = getArabicLetterStrokeGuide(activeLetter.letterArabic);
  const isCurrentLetterPassed =
    coveragePercent >= PASS_COVERAGE_PERCENT ||
    tracedLetterIds.includes(activeLetter.id);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Warm ivory writing slate
    ctx.fillStyle = '#FDFBF7';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Subtle calligraphy guidelines (baseline & midline)
    ctx.save();
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = 'rgba(20, 83, 45, 0.16)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(20, CANVAS_H * 0.68);
    ctx.lineTo(CANVAS_W - 20, CANVAS_H * 0.68);
    ctx.moveTo(20, CANVAS_H * 0.34);
    ctx.lineTo(CANVAS_W - 20, CANVAS_H * 0.34);
    ctx.stroke();
    ctx.restore();

    // Right-to-left Arabic guide hint at top right
    ctx.save();
    ctx.fillStyle = 'rgba(20, 83, 45, 0.78)';
    ctx.font = '700 11px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('← Start at Green Dot (1) · Right to Left', CANVAS_W - 14, 20);
    ctx.restore();

    // Soft stencil glyph to trace over
    ctx.save();
    ctx.font = '700 148px "Noto Naskh Arabic", "Amiri", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(20, 83, 45, 0.12)';
    ctx.fillText(activeLetter.letterArabic, CANVAS_W / 2, CANVAS_H * 0.53);

    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.45)';
    ctx.lineWidth = 2;
    ctx.strokeText(activeLetter.letterArabic, CANVAS_W / 2, CANVAS_H * 0.53);
    ctx.restore();

    // Directional Start -> End guide path
    const sx = strokeGuide.startX * CANVAS_W;
    const sy = strokeGuide.startY * CANVAS_H;
    const ex = strokeGuide.endX * CANVAS_W;
    const ey = strokeGuide.endY * CANVAS_H;

    ctx.save();
    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.65)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();

    // Start Dot (Emerald with "1")
    ctx.setLineDash([]);
    ctx.fillStyle = '#22C55E';
    ctx.beginPath();
    ctx.arc(sx, sy, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 10px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('1', sx, sy + 0.5);

    // End Dot (Warm Gold target)
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(ex, ey, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Render child's ink strokes
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 14;
    for (const stroke of strokesRef.current) {
      if (stroke.length === 0) continue;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      if (stroke.length === 1) {
        ctx.lineTo(stroke[0].x + 0.5, stroke[0].y + 0.5);
      } else {
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
      }
      ctx.stroke();
    }
    ctx.restore();
  }, [activeLetter.letterArabic, inkColor, strokeGuide]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const evaluateTracingCoverage = useCallback(() => {
    if (typeof document === 'undefined' || strokesRef.current.length === 0) {
      setCoveragePercent(0);
      return;
    }

    const refCanvas = document.createElement('canvas');
    refCanvas.width = CANVAS_W;
    refCanvas.height = CANVAS_H;
    const refCtx = refCanvas.getContext('2d');

    const userCanvas = document.createElement('canvas');
    userCanvas.width = CANVAS_W;
    userCanvas.height = CANVAS_H;
    const userCtx = userCanvas.getContext('2d');

    if (!refCtx || !userCtx) return;

    refCtx.font = '700 148px "Noto Naskh Arabic", "Amiri", serif';
    refCtx.textAlign = 'center';
    refCtx.textBaseline = 'middle';
    refCtx.fillStyle = '#000000';
    refCtx.fillText(activeLetter.letterArabic, CANVAS_W / 2, CANVAS_H * 0.53);

    userCtx.lineCap = 'round';
    userCtx.lineJoin = 'round';
    userCtx.strokeStyle = '#000000';
    userCtx.lineWidth = 22;
    for (const stroke of strokesRef.current) {
      if (stroke.length === 0) continue;
      userCtx.beginPath();
      userCtx.moveTo(stroke[0].x, stroke[0].y);
      if (stroke.length === 1) {
        userCtx.lineTo(stroke[0].x + 0.5, stroke[0].y + 0.5);
      } else {
        for (let i = 1; i < stroke.length; i++) {
          userCtx.lineTo(stroke[i].x, stroke[i].y);
        }
      }
      userCtx.stroke();
    }

    const refData = refCtx.getImageData(0, 0, CANVAS_W, CANVAS_H).data;
    const userData = userCtx.getImageData(0, 0, CANVAS_W, CANVAS_H).data;

    let targetPixels = 0;
    let coveredTargetPixels = 0;
    let offTargetPixels = 0;

    for (let i = 3; i < refData.length; i += 8) {
      const isTarget = refData[i] > 40;
      const isDrawn = userData[i] > 40;
      if (isTarget) {
        targetPixels += 1;
        if (isDrawn) coveredTargetPixels += 1;
      } else if (isDrawn) {
        offTargetPixels += 1;
      }
    }

    if (targetPixels === 0) return;

    const rawCoverage = coveredTargetPixels / targetPixels;
    const scribbleRatio = offTargetPixels / Math.max(targetPixels * 3.2, 1);
    const adjusted = Math.max(0, Math.min(1, rawCoverage - Math.max(0, scribbleRatio - 0.55) * 0.45));
    const pct = Math.round(adjusted * 100);
    setCoveragePercent(pct);

    if (pct >= PASS_COVERAGE_PERCENT) {
      setStatusMessage(`MashaAllah! Great tracing on ${activeLetter.nameEn} (${pct}% match)!`);
      setMascotState('celebrating');
      const updated = saveChildLetterTracingProgress({
        childId,
        letterId: activeLetter.id,
        letterArabic: activeLetter.letterArabic,
        letterName: activeLetter.nameEn,
        coveragePercent: pct,
      });
      setTracedLetterIds(Object.keys(updated.tracingByLetterId));
      void triggerSuccessHaptic();

      if (!tracedLetterIds.includes(activeLetter.id)) {
        playGentleCelebrationChime('star');
        onLetterTraced?.(activeLetter.nameEn, pct);
        playQaidaLetterHumanAudio({
          letter: activeLetter,
          mode: 'letter',
          onStatus: onTriggerToast,
        });
      }
    } else if (pct >= 20) {
      setMascotState('encouraging');
      setStatusMessage(`Almost there! Keep tracing ${activeLetter.nameEn} toward the gold dot (${pct}%).`);
    } else {
      setMascotState('gentle_disappointment');
      setStatusMessage('Start on the green dot (1) and follow the golden dotted outline.');
    }
  }, [activeLetter, childId, onLetterTraced, onTriggerToast, tracedLetterIds]);

  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement>): StrokePoint => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_W,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_H,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    setMascotState('listening');
    const pt = getPointerPos(e);
    strokesRef.current = [...strokesRef.current, [pt]];
    setStrokeCount(strokesRef.current.length);
    drawCanvas();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const pt = getPointerPos(e);
    const current = strokesRef.current[strokesRef.current.length - 1];
    if (current) {
      current.push(pt);
      drawCanvas();
    }
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    evaluateTracingCoverage();
  };

  const handleClear = () => {
    strokesRef.current = [];
    setStrokeCount(0);
    setCoveragePercent(0);
    setMascotState('teaching');
    setStatusMessage(strokeGuide.directionHint);
    void triggerLightHaptic();
    drawCanvas();
  };

  const handleSwitchLetter = (nextIdx: number) => {
    const wrapped =
      ((nextIdx % NOORANI_QAIDA_28_LETTERS.length) + NOORANI_QAIDA_28_LETTERS.length) %
      NOORANI_QAIDA_28_LETTERS.length;
    setLetterIdx(wrapped);
    strokesRef.current = [];
    setStrokeCount(0);
    setCoveragePercent(0);
    setMascotState('teaching');
    const nextLetter = NOORANI_QAIDA_28_LETTERS[wrapped] || NOORANI_QAIDA_28_LETTERS[0];
    setStatusMessage(getArabicLetterStrokeGuide(nextLetter.letterArabic).directionHint);
    void triggerLightHaptic();
  };

  return (
    <div className="space-y-3">
      {/* Header Row with Living Mizo Guide */}
      <div className="rounded-2xl bg-[#0F3826] text-white p-3.5 flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <LivingMascot character="Mizo" state={mascotState} size="sm" />
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-amber-300 tabular-nums">
              Letter {letterIdx + 1} of 28 · Saved {tracedLetterIds.length}/28
            </p>
            <h4 className="text-sm font-extrabold truncate">
              Trace {activeLetter.nameEn} ({activeLetter.letterArabic})
            </h4>
            <p className="text-[11px] text-emerald-100/85 line-clamp-1">
              {strokeGuide.directionHint}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setMascotState('listening');
            playQaidaLetterHumanAudio({
              letter: activeLetter,
              mode: 'letter',
              onStatus: onTriggerToast,
            });
          }}
          className="px-3.5 min-h-[48px] rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold inline-flex items-center gap-1.5 shrink-0 transition"
        >
          <Volume2 className="w-4 h-4" />
          <span>Hear {activeLetter.nameEn}</span>
        </button>
      </div>

      {/* Interactive Touch Tracing Canvas */}
      <div className="rounded-3xl bg-[var(--bg-surface)] border-2 border-amber-400/50 p-3 shadow-xs space-y-2.5">
        <div className="relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[#FFFDF8] touch-none select-none">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            aria-label={`Arabic tracing pad for letter ${activeLetter.nameEn}`}
            className="w-full h-[230px] block cursor-crosshair touch-none"
          />
          {isCurrentLetterPassed && (
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-emerald-700 text-white text-[11px] font-extrabold inline-flex items-center gap-1 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Saved Locally</span>
            </div>
          )}
        </div>

        {/* Live Coverage Meter & Feedback */}
        <div className="space-y-1.5 px-1">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className={isCurrentLetterPassed ? 'text-emerald-800 dark:text-emerald-300' : 'text-[var(--text-secondary)]'}>
              {statusMessage}
            </span>
            <span className="text-[#14532D] dark:text-emerald-300 tabular-nums shrink-0 ml-2">
              {coveragePercent}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-200 ${
                isCurrentLetterPassed ? 'bg-[#22C55E]' : 'bg-[#F59E0B]'
              }`}
              style={{ width: `${Math.min(100, coveragePercent)}%` }}
            />
          </div>
        </div>

        {/* Touch Action Bar (All >= 48px) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleClear}
              disabled={strokeCount === 0}
              className="px-3 min-h-[48px] rounded-xl bg-[var(--bg-elevated)] hover:opacity-90 border border-[var(--border-subtle)] disabled:opacity-45 text-[var(--text-primary)] text-xs font-extrabold inline-flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setInkColor((prev) => (prev === '#14532D' ? '#D97706' : '#14532D'))
              }
              className="px-3 min-h-[48px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-xs font-bold inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{inkColor === '#14532D' ? 'Emerald Ink' : 'Gold Ink'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleSwitchLetter(letterIdx - 1)}
              aria-label="Previous Arabic letter"
              className="px-3 min-h-[48px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:opacity-90 text-[var(--text-primary)] text-xs font-extrabold inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchLetter(letterIdx + 1)}
              aria-label="Next Arabic letter"
              className="px-3.5 min-h-[48px] rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center gap-1 transition"
            >
              <span>Next Letter</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick 28-Letter Jump Strip (RTL) */}
      <div
        dir="rtl"
        className="grid grid-cols-7 gap-1.5 bg-[var(--bg-surface)] p-2 rounded-2xl border border-[var(--border-subtle)]"
      >
        {NOORANI_QAIDA_28_LETTERS.map((item, idx) => {
          const selected = idx === letterIdx;
          const done = tracedLetterIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSwitchLetter(idx)}
              className={`min-h-[44px] rounded-xl font-arabic text-xl font-bold border transition relative ${
                selected
                  ? 'bg-[#14532D] text-amber-300 border-[#D4AF37] shadow-2xs'
                  : done
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-500/40'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-amber-400'
              }`}
            >
              {item.letterArabic}
            </button>
          );
        })}
      </div>
    </div>
  );
};
