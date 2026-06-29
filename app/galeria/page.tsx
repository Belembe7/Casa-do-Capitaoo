'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages, galleryCategories } from '@/lib/data/content';

export default function GaleriaPage() {
  const [filter, setFilter] = useState('todos');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    filter === 'todos'
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  const activeImage = galleryImages.find((img) => img.id === lightbox);

  return (
    <>
      <section className="pt-32 pb-12 section-padding">
        <h1 className="font-display text-4xl md:text-6xl mb-8">Galeria</h1>

        <div className="flex flex-wrap gap-2 mb-12">
          {galleryCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setFilter(cat.slug)}
              className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all ${
                filter === cat.slug
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 text-text-light hover:border-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="masonry-grid">
          {filtered.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setLightbox(img.id)}
              className={`relative overflow-hidden min-h-[200px] cursor-pointer group ${
                i % 5 === 0 ? 'masonry-item-tall' : i % 3 === 0 ? 'masonry-item-wide' : ''
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-slow group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 lightbox-overlay flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white z-10"
              onClick={() => setLightbox(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full aspect-[16/10]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
              />
              <p className="text-white text-center mt-4 text-sm">{activeImage.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
