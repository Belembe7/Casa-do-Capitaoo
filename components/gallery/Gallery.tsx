'use client';

import GalleryFilter from './GalleryFilter';
import GalleryEditorial from './GalleryEditorial';
import Lightbox from './Lightbox';
import { useGallery } from '@/hooks/useGallery';

export default function Gallery() {
  const {
    filter,
    setFilter,
    filteredImages,
    lightboxIndex,
    openLightbox,
    closeLightbox,
  } = useGallery();

  return (
    <section className="bg-background pb-20 pt-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 xl:px-20">
        <header className="mb-10 md:mb-12">
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-secondary">
            Hotel Casa do Capitão
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
            Galeria
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-light">
            Um olhar sobre a elegância, o conforto e a paisagem única da baía de Inhambane.
          </p>
        </header>

        <div className="mb-10 md:mb-12">
          <GalleryFilter activeFilter={filter} onFilterChange={setFilter} />
        </div>

        <GalleryEditorial images={filteredImages} onOpenLightbox={openLightbox} />
      </div>

      <Lightbox images={filteredImages} index={lightboxIndex} onClose={closeLightbox} />
    </section>
  );
}
