'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Expand, ImageOff } from 'lucide-react';
import type { GalleryImage } from '@/lib/data/content';
import styles from '@/styles/gallery.module.css';

const BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=';

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
  tileClassName?: string;
}

function GalleryItem({ image, index, onOpen, tileClassName }: GalleryItemProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.36), ease: [0.22, 1, 0.36, 1] }}
      className={`${styles.item} ${tileClassName ?? ''}`}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Expandir imagem: ${image.alt}`}
        className="group relative block h-full w-full overflow-hidden rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      >
        {!loaded && !error && (
          <div
            className={`absolute inset-0 ${styles.skeleton}`}
            aria-hidden
          />
        )}

        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#f0eeea] text-text-light">
            <ImageOff size={28} strokeWidth={1.5} aria-hidden />
            <span className="text-xs px-4 text-center">Imagem indisponível</span>
          </div>
        ) : (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className={`block h-full w-full object-cover transition-all duration-300 ease-out group-hover:scale-105 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg backdrop-blur-sm">
                <Expand size={20} strokeWidth={1.75} />
              </span>
            </div>
          </>
        )}
      </button>
    </motion.div>
  );
}

export default memo(GalleryItem);
