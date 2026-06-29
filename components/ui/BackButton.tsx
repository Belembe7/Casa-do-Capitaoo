'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

function getFallbackHref(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length <= 1) return '/';
  return `/${parts.slice(0, -1).join('/')}`;
}

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18n();

  if (!pathname || pathname === '/') return null;

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(getFallbackHref(pathname));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t.common.back}
      className="fixed top-[4.5rem] md:top-24 start-4 md:start-8 z-40 inline-flex items-center gap-2 text-xs uppercase tracking-widest bg-white/95 backdrop-blur-sm px-4 py-2.5 shadow-md border border-gray-100 text-primary hover:bg-white hover:text-secondary transition-colors rtl:flex-row-reverse"
    >
      <ArrowLeft size={16} aria-hidden />
      {t.common.back}
    </button>
  );
}
