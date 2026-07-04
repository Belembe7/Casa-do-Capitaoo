'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Images, ImageOff } from 'lucide-react';
import type { GalleryImage } from '@/lib/data/content';
import { galleryCategories } from '@/lib/data/content';
import styles from '@/styles/gallery.module.css';

const BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=';

const categoryLabels = Object.fromEntries(
  galleryCategories.filter((c) => c.slug !== 'todos').map((c) => [c.slug, c.label])
);

interface GalleryEditorialProps {
  images: GalleryImage[];
  onOpenLightbox: (index: number) => void;
}

interface EditorialCardProps {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
}

function EditorialCard({ image, index, onOpen }: EditorialCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const staggerClass = index % 2 === 0 ? styles.editorialCardEven : styles.editorialCardOdd;

  return (
    <article className={`${styles.editorialCard} ${staggerClass}`}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Ver imagem: ${image.alt}`}
        className={styles.editorialCardButton}
      >
        {!loaded && !error && <div className={`absolute inset-0 ${styles.skeleton}`} aria-hidden />}

        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#eceae6] text-text-light">
            <ImageOff size={28} strokeWidth={1.5} aria-hidden />
            <span className="px-4 text-center text-xs">Imagem indisponível</span>
          </div>
        ) : (
          <>
            <div className={styles.editorialImageWrap}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 58vw, 260px"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className={`${styles.editorialImage} ${loaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
              />
            </div>

            <div className={styles.editorialGradient} aria-hidden />

            <div className={styles.editorialContent}>
              <span className={styles.editorialCategory}>
                {categoryLabels[image.category] ?? image.category}
              </span>
              <h2 className={styles.editorialTitle}>{image.alt}</h2>
              <span className={styles.editorialCta}>
                Ver imagem
                <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
              </span>
            </div>
          </>
        )}
      </button>
    </article>
  );
}

function GalleryEditorial({ images, onOpenLightbox }: GalleryEditorialProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[18px] border border-dashed border-gray-200 bg-white/60 px-8 py-20 text-center backdrop-blur-sm">
        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary/40">
          <Images size={32} strokeWidth={1.25} aria-hidden />
        </span>
        <p className="mb-2 font-display text-2xl text-primary">Não existem fotografias disponíveis.</p>
        <p className="max-w-md text-sm text-text-light">
          Selecione outra categoria ou volte mais tarde para descobrir novos momentos do hotel.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.editorialScroller}>
      <div className={styles.editorialTrack}>
        {images.map((image, index) => (
          <EditorialCard key={image.id} image={image} index={index} onOpen={onOpenLightbox} />
        ))}
      </div>
    </div>
  );
}

export default memo(GalleryEditorial);
