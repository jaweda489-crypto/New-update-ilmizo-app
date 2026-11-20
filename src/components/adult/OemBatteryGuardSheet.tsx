import React, { useMemo, useState } from 'react';
import {
  BatteryCharging,
  BellRing,
  Check,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Volume2,
} from 'lucide-react';
import { BottomSheet } from '../sheets/BottomSheet';
import {
  triggerLightHaptic,
  triggerSelectionHaptic,
  triggerSuccessHaptic,
} from '../../services/hapticsService';

/**
 * OEM Battery-Guard Setup Wizard
 *
 * Solves the #1 real-world Android Adhan failure (Xiaomi MIUI/HyperOS, Samsung OneUI,
 * Vivo, Oppo/Realme, OnePlus killing background alarms after 2-3 days).
 */

export type AndroidOemId =
  | 'xiaomi'
  | 'samsung'
  | 'vivo'
  | 'oppo_realme'
  | 'oneplus'
  | 'stock';

export interface OemBatteryGuide {
  id: AndroidOemId;
  brandLabel: string;
  osName: string;
  severityNote: string;
  steps: Array<{ id: string; title: string; path: string }>;
}

export const OEM_BATTERY_GUIDES: OemBatteryGuide[] = [
  {
    id: 'xiaomi',
    brandLabel: 'Xiaomi / Redmi / Poco',
    osName: 'MIUI & HyperOS',
    severityNote: 'Xiaomi aggressively stops background Adhan alarms after 2–3 days unless Autostart & No Restrictions are set.',
    steps: [
      {
        id: 'mi_autostart',
        title: 'Enable Background Autostart',
        path: 'Settings → Apps → Manage Apps → Ilmizo → Autostart → Turn ON',
      },
      {
        id: 'mi_battery',
        title: 'Set Battery Saver to "No Restrictions"',
        path: 'App Info → Battery Saver → Select "No restrictions" (not MIUI Battery Saver)',
      },
      {
        id: 'mi_alarms',
        title: 'Allow Exact Alarms & Lock-Screen Alerts',
        path: 'App Info → Notifications → Enable Sound, Floating & Lock Screen Notifications',
      },
      {
        id: 'mi_lock',
        title: 'Lock Ilmizo in Recent Apps',
        path: 'Open Recent Apps → Long-press Ilmizo card → Tap the Padlock icon',
      },
    ],
  },
  {
    id: 'samsung',
    brandLabel: 'Samsung Galaxy',
    osName: 'OneUI',
    severityNote: 'Samsung Sleeping Apps puts unused apps to deep sleep and delays Fajr Adhan.',
    steps: [
      {
        id: 'sam_battery',
        title: 'Set Battery to Unrestricted',
        path: 'Settings → Apps → Ilmizo → Battery → Select "Unrestricted"',
      },
      {
        id: 'sam_never_sleep',
        title: 'Add Ilmizo to "Never auto sleeping apps"',
        path: 'Settings → Battery → Background usage limits → Never auto sleeping apps → Add Ilmizo',
      },
      {
        id: 'sam_exact',
        title: 'Allow Alarms & Reminders',
        path: 'Settings → Apps → Ilmizo → Alarms & reminders → Turn ON',
      },
    ],
  },
  {
    id: 'vivo',
    brandLabel: 'Vivo / iQOO',
    osName: 'Funtouch OS / OriginOS',
    severityNote: 'Vivo stops scheduled Fajr alarms overnight unless High Background Power is allowed.',
    steps: [
      {
        id: 'vivo_bg',
        title: 'Allow High Background Power Consumption',
        path: 'Settings → Battery → Background power consumption management → Ilmizo → Don’t restrict',
      },
      {
        id: 'vivo_autostart',
        title: 'Enable Autostart Permission',
        path: 'iManager → App Manager → Autostart Manager → Enable Ilmizo',
      },
      {
        id: 'vivo_lock',
        title: 'Lock Ilmizo in Multitasking',
        path: 'Recent Apps → Tap dropdown on Ilmizo → Tap "Lock"',
      },
    ],
  },
  {
    id: 'oppo_realme',
    brandLabel: 'Oppo / Realme',
    osName: 'ColorOS / Realme UI',
    severityNote: 'ColorOS freezes background wake-ups at night unless Auto-Launch is enabled.',
    steps: [
      {
        id: 'oppo_auto',
        title: 'Allow Auto-Launch & Background Activity',
        path: 'Settings → Apps → App Management → Ilmizo → Battery Usage → Enable "Allow background activity" & "Allow auto-launch"',
      },
      {
        id: 'oppo_sleep',
        title: 'Disable Sleep Standby Optimization',
        path: 'Settings → Battery → More settings → Sleep standby optimization → Keep Ilmizo excluded',
      },
      {
        id: 'oppo_lock',
        title: 'Lock in Recent Tasks',
        path: 'Recent Apps → Tap 3-dots on Ilmizo → Lock',
      },
    ],
  },
  {
    id: 'oneplus',
    brandLabel: 'OnePlus',
    osName: 'OxygenOS',
    severityNote: 'OxygenOS deep optimization can delay Fajr & Maghrib notifications by 10–30 minutes.',
    steps: [
      {
        id: 'op_battery',
        title: 'Allow Background Activity & Auto-Launch',
        path: 'Settings → Apps → Ilmizo → Battery usage → Allow foreground + background + auto-launch',
      },
      {
        id: 'op_alarm',
        title: 'Allow Exact Alarms',
        path: 'Settings → Apps → Special app access → Alarms & reminders → Ilmizo ON',
      },
    ],
  },
  {
    id: 'stock',
    brandLabel: 'Pixel / Stock Android',
    osName: 'Android 12–15',
    severityNote: 'Ensure Android Exact Alarms and Unrestricted Battery are enabled for on-the-minute Adhan.',
    steps: [
      {
        id: 'stock_battery',
        title: 'Set App Battery Usage to Unrestricted',
        path: 'Settings → Apps → Ilmizo → App battery usage → Unrestricted',
      },
      {
        id: 'stock_alarms',
        title: 'Enable Alarms & Reminders',
        path: 'Settings → Apps → Ilmizo → Alarms & reminders → Allow setting alarms and reminders',
      },
    ],
  },
];

const STORAGE_KEY = 'ilmizo_oem_battery_guard_v1';

interface SavedGuardState {
  oemId: AndroidOemId;
  checkedStepIds: string[];
}

function loadGuardState(): SavedGuardState {
  if (typeof localStorage === 'undefined') {
    return { oemId: 'xiaomi', checkedStepIds: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { oemId: 'xiaomi', checkedStepIds: [] };
    const parsed = JSON.parse(raw);
    return {
      oemId: OEM_BATTERY_GUIDES.some((g) => g.id === parsed.oemId) ? parsed.oemId : 'xiaomi',
      checkedStepIds: Array.isArray(parsed.checkedStepIds) ? parsed.checkedStepIds : [],
    };
  } catch {
    return { oemId: 'xiaomi', checkedStepIds: [] };
  }
}

function playGentleAdhanTestChime(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const AudioCtx =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return false;
    const ctx = new AudioCtx();
    const notes = [440, 554.37, 659.25, 880]; // peaceful Hijaz-inspired chime triad
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * 0.16;
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.14, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.55);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.58);
    });
    return true;
  } catch {
    return false;
  }
}

interface OemBatteryGuardSheetProps {
  open: boolean;
  onClose: () => void;
  onToast?: (msg: string) => void;
}

export const OemBatteryGuardSheet: React.FC<OemBatteryGuardSheetProps> = ({
  open,
  onClose,
  onToast,
}) => {
  const [state, setState] = useState<SavedGuardState>(() => loadGuardState());

  const activeGuide = useMemo(
    () => OEM_BATTERY_GUIDES.find((g) => g.id === state.oemId) || OEM_BATTERY_GUIDES[0],
    [state.oemId]
  );

  const persist = (next: SavedGuardState) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const completedInGuide = activeGuide.steps.filter((s) =>
    state.checkedStepIds.includes(s.id)
  ).length;
  const isProtected = completedInGuide === activeGuide.steps.length;

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Adhan Battery-Guard Wizard"
      subtitle="Stop Xiaomi, Samsung, Vivo & Oppo from silencing Fajr & daily Adhan alarms."
    >
      <div className="space-y-4">
        {/* Status Banner */}
        <div
          className={`rounded-2xl p-3.5 border flex items-start gap-3 ${
            isProtected
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400/60'
              : 'bg-amber-50 dark:bg-amber-500/10 border-amber-300/70'
          }`}
        >
          {isProtected ? (
            <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5" />
          ) : (
            <BatteryCharging className="w-5 h-5 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5" />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-extrabold text-[var(--text-primary)]">
              {isProtected
                ? `${activeGuide.brandLabel} Adhan Protection Active (${completedInGuide}/${activeGuide.steps.length})`
                : `Step-by-Step Fix for ${activeGuide.brandLabel} (${completedInGuide}/${activeGuide.steps.length})`}
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
              {activeGuide.severityNote}
            </p>
          </div>
        </div>

        {/* Phone Brand Picker */}
        <div className="space-y-1.5">
          <p className="text-xs font-extrabold text-[var(--text-secondary)] flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Select Your Phone Brand</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {OEM_BATTERY_GUIDES.map((guide) => {
              const selected = guide.id === state.oemId;
              return (
                <button
                  key={guide.id}
                  type="button"
                  onClick={() => {
                    void triggerSelectionHaptic();
                    persist({ ...state, oemId: guide.id });
                  }}
                  className={`min-h-[48px] px-3 py-2 rounded-2xl border text-left transition ${
                    selected
                      ? 'bg-[#14532D] text-white border-[#D4AF37]'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)]'
                  }`}
                >
                  <p className="text-xs font-extrabold truncate">{guide.brandLabel}</p>
                  <p className={`text-[11px] truncate ${selected ? 'text-emerald-200' : 'text-[var(--text-muted)]'}`}>
                    {guide.osName}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Checklist */}
        <div className="space-y-2">
          {activeGuide.steps.map((step, idx) => {
            const done = state.checkedStepIds.includes(step.id);
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  const nextIds = done
                    ? state.checkedStepIds.filter((id) => id !== step.id)
                    : [...state.checkedStepIds, step.id];
                  if (!done) void triggerSuccessHaptic();
                  else void triggerLightHaptic();
                  persist({ ...state, checkedStepIds: nextIds });
                }}
                className={`w-full rounded-2xl border p-3.5 text-left flex items-start gap-3 transition active:scale-[0.99] ${
                  done
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400/70'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    done
                      ? 'bg-[#14532D] border-[#14532D] text-white'
                      : 'border-slate-300 dark:border-emerald-700'
                  }`}
                >
                  {done ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-[11px] font-black text-[var(--text-muted)]">{idx + 1}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold text-[var(--text-primary)]">{step.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                    {step.path}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Test Adhan Chime & Done Actions */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => {
              void triggerLightHaptic();
              const played = playGentleAdhanTestChime();
              onToast?.(
                played
                  ? 'Test Adhan chime played! Your device audio is ready.'
                  : 'Ensure phone volume is unmuted to hear Adhan alerts.'
              );
            }}
            className="min-h-[46px] rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 active:scale-95 transition"
          >
            <Volume2 className="w-4 h-4" />
            <span>Test Adhan Sound</span>
          </button>
          <button
            type="button"
            onClick={() => {
              void triggerSuccessHaptic();
              onClose();
            }}
            className="min-h-[46px] rounded-2xl bg-[#14532D] text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5 active:scale-95 transition"
          >
            {isProtected ? <CheckCircle2 className="w-4 h-4 text-amber-300" /> : <BellRing className="w-4 h-4 text-amber-300" />}
            <span>{isProtected ? 'All Protected ✓' : 'Save Progress'}</span>
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};
