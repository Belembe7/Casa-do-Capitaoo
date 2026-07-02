'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryImage } from '@/lib/data/content';

interface LightboxProps {
  image: GalleryImage | null;
  index: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Lightbox({
  image,
  index,
  total,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [image?.id]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 px-4 py-6 md:px-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de imagens"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar galeria"
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X size={22} />
          </button>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
                aria-label="Imagem anterior"
                className="absolute left-3 md:left-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                aria-label="Próxima imagem"
                className="absolute right-3 md:right-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[85vh] w-full max-w-6xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{
                aspectRatio: `${image.width} / ${image.height}`,
                maxHeight: '75vh',
              }}
            >
              {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-white/10" aria-hidden />
              )}
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className={`mx-auto block h-auto max-h-[75vh] w-full object-contain transition-opacity duration-300 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="100vw"
                priority
                onLoad={() => setLoaded(true)}
              />
            </div>
            <p className="mt-5 text-center text-sm text-white/85 md:text-base">{image.alt}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">
              {index + 1} / {total}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
