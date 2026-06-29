'use client';

import { useSiteContent } from '@/lib/i18n/hooks';
import PopupModal from '@/components/ui/PopupModal';

export default function LocalizedPopup() {
  const content = useSiteContent();

  return (
    <PopupModal
      image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
      title={content.popup.title}
      description={content.popup.description}
      ctaText={content.popup.cta}
      ctaLink="/ofertas/escapada-maritima"
    />
  );
}
