'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Expand, ImageOff } from 'lucide-react';
import type { GalleryImage } from '@/lib/data/content';
import { useMasonryRowSpan } from '@/hooks/useMasonrySpan';
import styles from '@/styles/gallery.module.css';

const BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=';

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
}

function GalleryItem({ image, index, onOpen }: GalleryItemProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ref, style } = useMasonryRowSpan(image.width, image.height);

  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.28), ease: [0.22, 1, 0.36, 1] }}
      className={styles.masonryItem}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Expandir imagem: ${image.alt}`}
        className={styles.masonryButton}
      >
        {!loaded && !error && <div className={`absolute inset-0 ${styles.skeleton}`} aria-hidden />}

        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#f0eeea] text-text-light">
            <ImageOff size={28} strokeWidth={1.5} aria-hidden />
            <span className="px-4 text-center text-xs">Imagem indisponível</span>
          </div>
        ) : (
          <>
            <div className={styles.masonryImageWrap}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 800px"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className={`${styles.masonryImage} h-full w-full ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
              />
            </div>
            <div className={styles.masonryOverlay} aria-hidden />
            <div className={styles.masonryExpand} aria-hidden>
              <span className={styles.masonryExpandIcon}>
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
