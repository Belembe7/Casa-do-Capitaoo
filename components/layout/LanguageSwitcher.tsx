'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { LOCALES, getLocaleMeta, type Locale } from '@/lib/i18n/locales';
import FlagIcon from '@/components/ui/FlagIcon';

interface LanguageSwitcherProps {
  textColor?: string;
  variant?: 'dropdown' | 'list';
  onSelect?: () => void;
}

export default function LanguageSwitcher({
  textColor = 'text-primary',
  variant = 'dropdown',
  onSelect,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const current = getLocaleMeta(locale);

  const select = (code: Locale) => {
    setLocale(code);
    setOpen(false);
    onSelect?.();
  };

  if (variant === 'list') {
    return (
      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
        {LOCALES.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => select(l.code)}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded text-left transition-colors ${
              locale === l.code
                ? 'bg-secondary/20 text-secondary font-medium'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <FlagIcon countryCode={l.flagCode} size={22} />
            <span className="truncate">{l.name}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-xs uppercase tracking-widest ${textColor}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <FlagIcon countryCode={current.flagCode} size={20} />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown size={14} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40"
              aria-label="Close languages"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              role="listbox"
              className="absolute top-full right-0 mt-2 bg-white shadow-lg py-2 min-w-[220px] max-h-[320px] overflow-y-auto z-50"
            >
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  role="option"
                  aria-selected={locale === l.code}
                  onClick={() => select(l.code)}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                    locale === l.code ? 'text-secondary font-medium bg-gray-50' : 'text-primary'
                  }`}
                >
                  <FlagIcon countryCode={l.flagCode} size={22} />
                  <span>{l.name}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
