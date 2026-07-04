'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryImage } from '@/lib/data/content';
import styles from '@/styles/gallery.module.css';

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 50;

function buildExtendedSlides(images: GalleryImage[]): GalleryImage[] {
  if (images.length <= 1) return images;
  return [images[images.length - 1], ...images, images[0]];
}

function LightboxSlide({
  image,
  isActive,
  eager,
}: {
  image: GalleryImage;
  isActive: boolean;
  eager: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [image.id]);

  if (!eager) {
    return <div className={styles.lightboxImageFrame} aria-hidden />;
  }

  return (
    <div className={styles.lightboxImageFrame}>
      {!loaded && <div className="absolute inset-0 animate-pulse rounded-xl bg-white/10" aria-hidden />}
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={`max-h-[75vh] w-auto max-w-full object-contain transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="100vw"
        priority={isActive}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function Lightbox({ images, index, onClose }: LightboxProps) {
  const isOpen = index !== null && images.length > 0;
  const loopEnabled = images.length > 1;
  const extendedSlides = useMemo(() => buildExtendedSlides(images), [images]);

  const [slidePos, setSlidePos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const realIndex = useMemo(() => {
    if (!loopEnabled) return slidePos;
    if (slidePos === 0) return images.length - 1;
    if (slidePos === extendedSlides.length - 1) return 0;
    return slidePos - 1;
  }, [loopEnabled, slidePos, extendedSlides.length, images.length]);

  useEffect(() => {
    if (index === null) return;
    setAnimate(false);
    setSlidePos(loopEnabled ? index + 1 : index);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });
  }, [index, loopEnabled]);

  const jumpWithoutAnimation = useCallback((nextPos: number) => {
    setAnimate(false);
    setSlidePos(nextPos);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });
  }, []);

  const goTo = useCallback(
    (direction: 1 | -1) => {
      if (!loopEnabled) {
        setSlidePos((current) => {
          const next = current + direction;
          if (next < 0 || next >= images.length) return current;
          return next;
        });
        return;
      }

      setSlidePos((current) => current + direction);
    },
    [images.length, loopEnabled]
  );

  const handleTransitionEnd = useCallback(() => {
    if (!loopEnabled) return;

    if (slidePos === extendedSlides.length - 1) {
      jumpWithoutAnimation(1);
    } else if (slidePos === 0) {
      jumpWithoutAnimation(extendedSlides.length - 2);
    }
  }, [extendedSlides.length, jumpWithoutAnimation, loopEnabled, slidePos]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') goTo(-1);
      if (event.key === 'ArrowRight') goTo(1);
    };

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [goTo, isOpen, onClose]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta > 0 ? -1 : 1);
  };

  if (!isOpen || index === null) return null;

  const activePos = loopEnabled ? slidePos : index;

  return (
    <div
      className={styles.lightboxBackdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de imagens"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar galeria"
        className={styles.lightboxClose}
      >
        <X size={22} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(-1);
            }}
            aria-label="Imagem anterior"
            className={`${styles.lightboxNav} ${styles.lightboxNavLeft}`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(1);
            }}
            aria-label="Próxima imagem"
            className={`${styles.lightboxNav} ${styles.lightboxNavRight}`}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div className={styles.lightboxStage} onClick={(e) => e.stopPropagation()}>
        <div
          ref={viewportRef}
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={`${styles.lightboxTrack} ${animate ? styles.lightboxTrackAnimated : ''}`}
            style={{ transform: `translateX(-${activePos * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((image, slideIndex) => {
              const shouldLoad =
                Math.abs(slideIndex - activePos) <= 1 ||
                (!loopEnabled && slideIndex === activePos);

              return (
                <div key={`${image.id}-${slideIndex}`} className={styles.lightboxSlide}>
                  <LightboxSlide
                    image={image}
                    isActive={slideIndex === activePos}
                    eager={shouldLoad}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-5 text-center text-sm text-white/85 md:text-base">
          {images[realIndex]?.alt}
        </p>
        <p className="mt-1 text-center text-xs uppercase tracking-[0.2em] text-white/50">
          {realIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}
