'use client';

import { useEffect } from 'react';
import { rooms } from '@/lib/data/rooms';
import { offers } from '@/lib/data/offers';

const AMENITY_IMAGES = [
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=80',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
];

export const HERO_POSTER =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80';

function preloadImage(url: string) {
  const img = new window.Image();
  img.src = url;
}

export default function MediaWarmup() {
  useEffect(() => {
    const urls = new Set<string>([
      HERO_POSTER,
      ...rooms.flatMap((r) => r.images),
      ...offers.map((o) => o.image),
      ...AMENITY_IMAGES,
    ]);

    urls.forEach(preloadImage);
  }, []);

  return null;
}
