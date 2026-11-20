import React, { useState } from 'react';
import { AlertCircle, ChevronRight, Info, Loader2, Monitor, Moon, Search, Sun } from 'lucide-react';
import { ScreenBackButton } from '../pwa/PWAComponents';
import { BottomSheet } from '../sheets/BottomSheet';
import { ThemeMode } from '../../types/ilmizo';
import { triggerSelectionHaptic } from '../../services/hapticsService';

export const AppScreen: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={`pb-24 min-h-full bg-[var(--bg-app)] text-[var(--text-primary)] transition-colors ${className}`}
  >
    {children}
  </div>
);

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
  bottomSlot?: React.ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  onBack,
  rightSlot,
  bottomSlot,
}) => (
  <header className="bg-gradient-to-b from-[#0F3826] to-[#14532D] dark:from-[#0A261A] dark:to-[#0F3525] text-white rounded-b-[28px] pt-safe pb-4 shadow-md border-b border-amber-400/15">
    <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-1.5">
      <div className="w-11 shrink-0 flex items-center justify-start">
        {showBack ? <ScreenBackButton variant="dark" onClick={onBack} /> : null}
      </div>
      <div className="flex-1 min-w-0 text-center">
        <h1 className="text-lg font-extrabold tracking-tight text-white truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-emerald-100/85 truncate mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="min-w-[44px] shrink-0 flex items-center justify-end">
        {rightSlot || null}
      </div>
    </div>
    {bottomSlot && <div className="px-4 pt-2">{bottomSlot}</div>}
  </header>
);

export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}> = ({ title, subtitle, action }) => (
  <div className="flex items-end justify-between gap-3 px-1">
    <div className="min-w-0">
      <h2 className="text-sm sm:text-base font-extrabold text-[var(--text-primary)] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{subtitle}</p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export const ContentCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}> = ({ children, className = '', elevated = false }) => (
  <div
    className={`rounded-3xl border border-[var(--border-subtle)] ${
      elevated ? 'bg-[var(--bg-elevated)]' : 'bg-[var(--bg-surface)]'
    } text-[var(--text-primary)] p-4 sm:p-5 shadow-2xs transition-colors ${className}`}
  >
    {children}
  </div>
);

export const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { fullWidth?: boolean }
> = ({ fullWidth = false, className = '', children, ...props }) => (
  <button
    type="button"
    {...props}
    className={`${
      fullWidth ? 'w-full' : ''
    } min-h-[46px] px-5 py-2.5 rounded-2xl bg-[#14532D] hover:bg-[#0F3826] dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-sm font-extrabold inline-flex items-center justify-center gap-2 shadow-xs transition active:scale-[0.98] disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

export const SecondaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { fullWidth?: boolean }
> = ({ fullWidth = false, className = '', children, ...props }) => (
  <button
    type="button"
    {...props}
    className={`${
      fullWidth ? 'w-full' : ''
    } min-h-[44px] px-4 py-2 rounded-2xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition active:scale-[0.98] disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

export const SearchField: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}> = ({
  value,
  onChange,
  placeholder = 'Search…',
  ariaLabel = 'Search',
  className = '',
}) => (
  <div className={`relative ${className}`}>
    <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className="w-full min-h-[46px] pl-10 pr-4 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#14532D] dark:focus:border-amber-400 transition"
    />
  </div>
);

/**
 * Grouped Settings Container & List Row (calm mobile settings language)
 */
export const SettingsGroup: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <section className="space-y-2">
    <div className="px-1">
      <h2 className="text-xs font-extrabold tracking-wide text-[var(--text-secondary)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs text-[var(--text-muted)] mt-0.5">{subtitle}</p>
      )}
    </div>
    <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] divide-y divide-[var(--divider)] overflow-hidden shadow-2xs">
      {children}
    </div>
  </section>
);

export const SettingsRow: React.FC<{
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  value?: string;
  rightSlot?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}> = ({ icon, title, subtitle, value, rightSlot, onClick, danger = false }) => {
  const inner = (
    <>
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {icon && (
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              danger
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
                : 'bg-[var(--bg-elevated)] text-[#14532D] dark:text-amber-300'
            }`}
          >
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1 text-left">
          <p
            className={`text-sm font-bold leading-snug truncate ${
              danger ? 'text-rose-600 dark:text-rose-400' : 'text-[var(--text-primary)]'
            }`}
          >
            {title}
          </p>
          {subtitle && (
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-snug">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {value && (
          <span className="text-xs font-semibold text-[var(--text-secondary)] max-w-[130px] truncate">
            {value}
          </span>
        )}
        {rightSlot}
        {onClick && !rightSlot && (
          <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
        )}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={() => {
          void triggerSelectionHaptic();
          onClick();
        }}
        className="w-full min-h-[60px] px-4 py-3 flex items-center justify-between gap-3 hover:bg-[var(--bg-elevated)]/70 active:bg-[var(--bg-elevated)] transition text-left"
      >
        {inner}
      </button>
    );
  }

  return (
    <div className="w-full min-h-[60px] px-4 py-3 flex items-center justify-between gap-3">
      {inner}
    </div>
  );
};

export const SkeletonCard: React.FC<{ lines?: number; className?: string }> = ({
  lines = 2,
  className = '',
}) => (
  <div
    aria-hidden="true"
    className={`rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 space-y-2.5 ${className}`}
  >
    <div className="h-4 w-2/5 rounded-full bg-[var(--bg-elevated)] animate-pulse" />
    {Array.from({ length: lines }).map((_, idx) => (
      <div
        key={idx}
        className={`h-3 rounded-full bg-[var(--bg-elevated)] animate-pulse ${
          idx === lines - 1 ? 'w-3/5' : 'w-full'
        }`}
      />
    ))}
  </div>
);

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <div className="space-y-3" aria-busy="true" aria-label="Loading content">
    {Array.from({ length: count }).map((_, idx) => (
      <div
        key={idx}
        className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 flex items-center gap-3"
      >
        <div className="w-11 h-11 rounded-2xl bg-[var(--bg-elevated)] animate-pulse shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-2/5 rounded-full bg-[var(--bg-elevated)] animate-pulse" />
          <div className="h-3 w-3/4 rounded-full bg-[var(--bg-elevated)] animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

export const ScreenSkeleton: React.FC<{ label?: string }> = ({
  label = 'Preparing your learning space…',
}) => (
  <div className="flex-1 bg-[var(--bg-app)] text-[var(--text-primary)] pb-24" aria-busy="true">
    <div className="h-28 rounded-b-[28px] bg-[#0F3826]/90 p-5 flex flex-col justify-end gap-2">
      <div className="h-5 w-40 rounded-full bg-white/15 animate-pulse" />
      <div className="h-3 w-56 rounded-full bg-white/10 animate-pulse" />
    </div>
    <div className="p-4 space-y-3 max-w-4xl mx-auto">
      <SkeletonCard lines={3} />
      <SkeletonList count={3} />
      <p className="text-xs font-semibold text-[var(--text-muted)] text-center pt-2">
        {label}
      </p>
    </div>
  </div>
);

export const InfoDisclosure: React.FC<{
  label?: string;
  sheetTitle: string;
  sheetSubtitle?: string;
  children: React.ReactNode;
  variant?: 'light' | 'dark';
}> = ({
  label = 'How this works',
  sheetTitle,
  sheetSubtitle,
  children,
  variant = 'light',
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          void triggerSelectionHaptic();
          setOpen(true);
        }}
        aria-label={label}
        title={label}
        className={`min-w-[40px] min-h-[40px] px-3 rounded-full inline-flex items-center justify-center gap-1.5 text-xs font-bold transition active:scale-95 ${
          variant === 'dark'
            ? 'bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/15'
            : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
        }`}
      >
        <Info className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">{label}</span>
      </button>
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title={sheetTitle}
        subtitle={sheetSubtitle}
      >
        <div className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-2.5">
          {children}
        </div>
      </BottomSheet>
    </>
  );
};

export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}> = ({ icon, title, description, action }) => (
  <ContentCard className="text-center py-8 px-5 space-y-3">
    {icon && (
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 text-[#14532D] dark:text-emerald-300 mx-auto flex items-center justify-center">
        {icon}
      </div>
    )}
    <div className="space-y-1 max-w-sm mx-auto">
      <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{title}</h3>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{description}</p>
    </div>
    {action && <div className="pt-1 flex justify-center">{action}</div>}
  </ContentCard>
);

export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Loading…',
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-3">
    <Loader2 className="w-7 h-7 animate-spin text-[#14532D] dark:text-amber-300" />
    <p className="text-xs font-bold text-[var(--text-secondary)]">{message}</p>
  </div>
);

export const ErrorState: React.FC<{
  title: string;
  message: string;
  onRetry?: () => void;
}> = ({ title, message, onRetry }) => (
  <ContentCard className="border-rose-500/30 bg-rose-50/70 dark:bg-rose-950/30 space-y-2.5">
    <div className="flex items-start gap-2.5">
      <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <h3 className="text-sm font-extrabold text-rose-900 dark:text-rose-200">{title}</h3>
        <p className="text-xs text-rose-800/90 dark:text-rose-200/80 leading-relaxed">{message}</p>
      </div>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="min-h-[44px] px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition active:scale-[0.98]"
      >
        Try Again
      </button>
    )}
  </ContentCard>
);

export const ThemeModeSegmentedControl: React.FC<{
  value: ThemeMode;
  onChange: (mode: ThemeMode) => void;
  compact?: boolean;
}> = ({ value, onChange, compact = false }) => {
  const options: Array<{ id: ThemeMode; label: string; icon: React.ReactNode }> = [
    { id: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
    { id: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> },
    { id: 'system', label: 'System', icon: <Monitor className="w-3.5 h-3.5" /> },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="App Appearance Theme"
      className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
    >
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => {
              void triggerSelectionHaptic();
              onChange(opt.id);
            }}
            className={`${
              compact ? 'min-h-[38px] text-[11px]' : 'min-h-[44px] text-xs'
            } px-2.5 rounded-xl font-extrabold flex items-center justify-center gap-1.5 transition active:scale-[0.98] ${
              active
                ? 'bg-[#14532D] text-amber-300 shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};
