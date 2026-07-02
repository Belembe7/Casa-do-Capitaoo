'use client';

import { Images } from 'lucide-react';
import type { GalleryImage } from '@/lib/data/content';
import GalleryItem from './GalleryItem';
import styles from '@/styles/gallery.module.css';

interface GalleryMasonryProps {
  images: GalleryImage[];
  onOpenLightbox: (index: number) => void;
}

const tilePattern = [
  'tileWide',
  'tileTall',
  'tileTall',
  'tileWide',
  'tileSquare',
  'tileSquare',
  'tileWide',
  'tileSquare',
];

export default function GalleryMasonry({ images, onOpenLightbox }: GalleryMasonryProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[18px] border border-dashed border-gray-200 bg-white/60 px-8 py-20 text-center backdrop-blur-sm">
        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary/40">
          <Images size={32} strokeWidth={1.25} aria-hidden />
        </span>
        <p className="font-display text-2xl text-primary mb-2">Não existem fotografias disponíveis.</p>
        <p className="text-sm text-text-light max-w-md">
          Selecione outra categoria ou volte mais tarde para descobrir novos momentos do hotel.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.magazineGrid}>
      {images.map((image, index) => (
        <GalleryItem
          key={image.id}
          image={image}
          index={index}
          onOpen={onOpenLightbox}
          tileClassName={styles[tilePattern[index % tilePattern.length]]}
        />
      ))}
    </div>
  );
}
