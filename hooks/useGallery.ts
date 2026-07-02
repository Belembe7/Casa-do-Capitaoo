'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { galleryImages, type GalleryImage } from '@/lib/data/content';

export function useGallery(initialFilter = 'todos') {
  const [filter, setFilter] = useState(initialFilter);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (filter === 'todos') return galleryImages;
    return galleryImages.filter((img) => img.category === filter);
  }, [filter]);

  const activeImage: GalleryImage | null =
    lightboxIndex !== null ? filteredImages[lightboxIndex] ?? null : null;

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || filteredImages.length === 0) return null;
      return (current - 1 + filteredImages.length) % filteredImages.length;
    });
  }, [filteredImages.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || filteredImages.length === 0) return null;
      return (current + 1) % filteredImages.length;
    });
  }, [filteredImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, showPrevious, showNext]);

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
    activeImage,
    openLightbox,
    closeLightbox,
    showPrevious,
    showNext,
  };
}
