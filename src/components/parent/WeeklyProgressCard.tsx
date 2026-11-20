import React, { useMemo, useState } from 'react';
import { Check, Copy, Download, ShieldCheck, Share2 } from 'lucide-react';
import { ChildProfile } from '../../types/ilmizo';
import {
  buildWeeklyTarbiyahReport,
  generateWeeklyProgressCardSvg,
} from '../../services/dailyTarbiyahPlanEngine';
import { triggerLightHaptic, triggerSuccessHaptic } from '../../services/hapticsService';

interface WeeklyProgressCardProps {
  child: ChildProfile;
  onStatusMessage?: (msg: string) => void;
}

export const WeeklyProgressCard: React.FC<WeeklyProgressCardProps> = ({
  child,
  onStatusMessage,
}) => {
  const [copied, setCopied] = useState(false);

  const report = useMemo(() => buildWeeklyTarbiyahReport(child), [child]);
  const supportsNativeShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const handleNativeShare = async () => {
    if (!supportsNativeShare) {
      await handleCopyWhatsAppText();
      return;
    }
    try {
      void triggerLightHaptic();
      await navigator.share({
        title: `Ilmizo Weekly Tarbiyah — ${child.name}`,
        text: report.whatsappShareText,
      });
      void triggerSuccessHaptic();
      onStatusMessage?.(`Shared ${child.name}’s voluntary weekly summary!`);
    } catch {
      // User dismissed share sheet — no error needed
    }
  };

  const handleCopyWhatsAppText = async () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(report.whatsappShareText);
      }
      setCopied(true);
      void triggerSuccessHaptic();
      onStatusMessage?.(`Copied ${child.name}’s WhatsApp progress summary!`);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      onStatusMessage?.('Clipboard unavailable — you can download the SVG card instead.');
    }
  };

  const handleDownloadCardSvg = () => {
    const svg = generateWeeklyProgressCardSvg(report);
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ilmizo-weekly-report-${child.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    void triggerSuccessHaptic();
    onStatusMessage?.(`Downloaded ${child.name}’s Weekly Tarbiyah Card!`);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#0F3826] via-[#14532D] to-[#0B2E1E] text-white p-5 shadow-sm border border-amber-300/35 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-bold text-amber-300 tabular-nums">
            Voluntary Parent Share Card ·{' '}
            {report.hasActivityThisWeek
              ? `${report.streakDays} active day(s) · ~${report.weeklyMinutesEstimate} min`
              : 'Waiting for first activity'}
          </p>
          <h3 className="text-base font-extrabold mt-0.5">{report.headline}</h3>
        </div>
        <Share2 className="w-5 h-5 text-amber-300 shrink-0" />
      </div>

      {!report.hasActivityThisWeek ? (
        <div className="rounded-2xl bg-white/10 border border-white/15 p-4 text-xs text-emerald-100 leading-relaxed space-y-1">
          <p className="font-extrabold text-amber-200">Honest Empty State — Ready When You Are</p>
          <p>
            Once {child.name} completes a Qaida lesson, storybook, or daily Dua, real numbers will
            appear here so you can voluntarily share a proud family milestone on WhatsApp.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-lg font-extrabold text-amber-300 tabular-nums">
                {report.qaidaCompletedCount}/{report.qaidaTotalCount}
              </p>
              <p className="text-[11px] font-bold text-emerald-100 mt-0.5">Qaida Lessons</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-lg font-extrabold text-amber-300 tabular-nums">
                {report.storiesCompletedCount}/{report.storiesTotalCount}
              </p>
              <p className="text-[11px] font-bold text-emerald-100 mt-0.5">Storybooks</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-lg font-extrabold text-amber-300 tabular-nums">
                {report.duasMasteredCount}
              </p>
              <p className="text-[11px] font-bold text-emerald-100 mt-0.5">
                Duas · {report.goodDeedsCount} Deeds
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-lg font-extrabold text-amber-300 tabular-nums">
                {report.starsEarned} ★
              </p>
              <p className="text-[11px] font-bold text-emerald-100 mt-0.5">Total Stars</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {supportsNativeShare && (
              <button
                type="button"
                onClick={() => void handleNativeShare()}
                className="flex-1 min-w-[140px] min-h-[48px] px-4 py-2.5 rounded-xl bg-[#22C55E] hover:bg-emerald-400 text-emerald-950 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition"
              >
                <Share2 className="w-4 h-4" />
                <span>Share via WhatsApp / Sheet</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => void handleCopyWhatsAppText()}
              className="flex-1 min-w-[140px] min-h-[48px] px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied for WhatsApp!' : 'Copy WhatsApp Text'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadCardSvg}
              className="flex-1 min-w-[140px] min-h-[48px] px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Save Card (SVG)</span>
            </button>
          </div>
        </>
      )}

      <p className="text-[11px] text-emerald-100/80 flex items-center gap-1.5 pt-1 border-t border-white/10">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
        <span>
          Parent-only voluntary share · Includes only first name & summary counts · Zero tracking.
        </span>
      </p>
    </div>
  );
};
