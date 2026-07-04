'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { galleryImages } from '@/lib/data/content';

export function useGallery(initialFilter = 'todos') {
  const [filter, setFilter] = useState(initialFilter);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (filter === 'todos') return galleryImages;
    return galleryImages.filter((img) => img.category === filter);
  }, [filter]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= filteredImages.length) {
      setLightboxIndex(filteredImages.length > 0 ? 0 : null);
    }
  }, [filteredImages.length, lightboxIndex]);

  return {
    filter,
    setFilter,
    filteredImages,
    lightboxIndex,
    openLightbox,
    closeLightbox,
  };
}
