import React, { useMemo, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { triggerSelectionHaptic } from '../../services/hapticsService';

export interface SelectSheetOption {
  value: string;
  label: string;
  subtitle?: string;
  badge?: string;
  disabled?: boolean;
}

export interface SelectSheetFieldProps {
  value: string;
  options: SelectSheetOption[];
  onChange: (value: string) => void;
  title: string;
  subtitle?: string;
  ariaLabel?: string;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  leftIcon?: React.ReactNode;
  variant?: 'default' | 'compact' | 'dark-pill' | 'inline';
  className?: string;
  disabled?: boolean;
}

/**
 * Mobile-native BottomSheet picker built on top of the shared BottomSheet primitive.
 * Replaces native browser HTML <select> controls across Ilmizo with accessible,
 * touch-friendly, searchable, Light/Dark-themed selection sheets.
 */
export const SelectSheetField: React.FC<SelectSheetFieldProps> = ({
  value,
  options,
  onChange,
  title,
  subtitle,
  ariaLabel,
  placeholder = 'Select an option',
  searchable,
  searchPlaceholder = 'Search options…',
  leftIcon,
  variant = 'default',
  className = '',
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value) || null,
    [options, value]
  );

  const showSearch = searchable ?? options.length >= 8;

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        (opt.subtitle && opt.subtitle.toLowerCase().includes(q)) ||
        opt.value.toLowerCase().includes(q)
    );
  }, [options, query]);

  const handleOpen = () => {
    if (disabled) return;
    void triggerSelectionHaptic();
    setQuery('');
    setOpen(true);
  };

  const handleSelect = (nextVal: string) => {
    void triggerSelectionHaptic();
    onChange(nextVal);
    setOpen(false);
    setQuery('');
  };

  const triggerStyles =
    variant === 'dark-pill'
      ? 'min-h-[40px] px-3 py-1.5 rounded-full bg-[#071F15]/85 backdrop-blur-md border border-[#D4AF37]/45 text-amber-100 hover:bg-white/15 text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0'
      : variant === 'compact'
      ? 'min-h-[42px] px-3 py-2 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--border-strong)] text-xs font-bold inline-flex items-center justify-between gap-2'
      : variant === 'inline'
      ? 'min-h-[40px] px-3 py-1.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--border-strong)] text-xs font-bold inline-flex items-center justify-between gap-2'
      : 'w-full min-h-[46px] px-3.5 py-2.5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--border-strong)] text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 text-left';

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={handleOpen}
        aria-label={ariaLabel || title}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${triggerStyles} ${className}`}
      >
        <span className="flex items-center gap-2 min-w-0">
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </span>
        <ChevronDown className="w-4 h-4 shrink-0 opacity-70" />
      </button>

      <BottomSheet
        open={open}
        onClose={() => {
          setOpen(false);
          setQuery('');
        }}
        title={title}
        subtitle={subtitle}
      >
        {showSearch && (
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="w-full min-h-[44px] pl-10 pr-3.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#14532D] dark:focus:border-amber-400"
            />
          </div>
        )}

        <div role="listbox" aria-label={title} className="space-y-1.5">
          {filteredOptions.length === 0 ? (
            <p className="py-6 text-center text-xs text-[var(--text-secondary)]">
              No matching options found.
            </p>
          ) : (
            filteredOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={opt.disabled}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full min-h-[48px] px-4 py-2.5 rounded-2xl border text-left transition flex items-center justify-between gap-3 active:scale-[0.99] disabled:opacity-45 ${
                    isSelected
                      ? 'bg-[#14532D]/10 dark:bg-emerald-500/20 border-[#14532D] dark:border-amber-400/70 text-[var(--text-primary)]'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm truncate ${
                          isSelected
                            ? 'font-extrabold text-[#14532D] dark:text-amber-300'
                            : 'font-semibold text-[var(--text-primary)]'
                        }`}
                      >
                        {opt.label}
                      </span>
                      {opt.badge && (
                        <span className="text-[11px] font-bold text-[var(--text-muted)] shrink-0">
                          · {opt.badge}
                        </span>
                      )}
                    </div>
                    {opt.subtitle && (
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-snug">
                        {opt.subtitle}
                      </p>
                    )}
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition ${
                      isSelected
                        ? 'bg-[#14532D] dark:bg-amber-400 text-white dark:text-emerald-950'
                        : 'border border-[var(--border-strong)]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </BottomSheet>
    </>
  );
};
