'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { galleryImages } from '@/lib/data/content';
import styles from '@/styles/gallery.module.css';

const AUTO_PLAY_MS = 3200;

export default function GalleryShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const slides = useMemo(() => galleryImages.slice(0, 6), []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <section
      className="mb-10 md:mb-12"
      aria-label="Apresentação visual da galeria"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.showcaseFrame}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1.02 }}
              animate={{ scale: shouldReduceMotion ? 1 : 1.08 }}
              transition={{ duration: shouldReduceMotion ? 0 : AUTO_PLAY_MS / 1000, ease: 'linear' }}
              className="h-full w-full"
            >
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                priority={index < 2}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className={styles.showcaseOverlay} aria-hidden />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
          {slides.map((slide, dotIndex) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(dotIndex)}
              className={styles.showcaseDot}
              data-active={dotIndex === index}
              aria-label={`Mostrar slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
