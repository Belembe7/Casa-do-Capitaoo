'use client';

import { useI18n } from '@/lib/i18n/context';
import { Check } from 'lucide-react';

export default function BenefitsTicker() {
  const { t } = useI18n();
  const benefits = t.hero.benefits;

  const items = [...benefits, ...benefits, ...benefits];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-sm py-3 overflow-hidden z-10">
      <div className="ticker-track">
        {items.map((benefit, i) => (
          <span
            key={`${benefit}-${i}`}
            className="flex items-center gap-2 px-8 text-xs uppercase tracking-[0.15em] text-white whitespace-nowrap"
          >
            <Check size={14} className="text-secondary flex-shrink-0" />
            {benefit}
            <span className="text-white/30 mx-2">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
