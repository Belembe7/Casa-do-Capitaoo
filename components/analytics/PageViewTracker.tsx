'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && !pathname.startsWith('/admin')) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return null;
}
