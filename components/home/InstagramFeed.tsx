'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useI18n } from '@/lib/i18n/context';
import { HOTEL_INFO } from '@/lib/utils';
import {
  staggerContainerVariants,
  staggerInViewOptions,
  staggerItemVariants,
} from '@/lib/animations/staggeredEntry';

const galleryImages = [
  {
    src: '/images/instagram/02-breakfast.png',
    width: 1024,
    height: 349,
    alt: 'Pequeno-almoço à beira da piscina',
    span: 'full' as const,
  },
  {
    src: '/images/instagram/03-seafood.png',
    width: 1024,
    height: 681,
    alt: 'Jantar de marisco ao pôr do sol',
  },
  {
    src: '/images/instagram/04-restaurant.png',
    width: 1024,
    height: 678,
    alt: 'Restaurante com vista para o mar',
  },
  {
    src: '/images/instagram/05-pool-day.png',
    width: 1024,
    height: 667,
    alt: 'Piscina do hotel',
  },
  {
    src: '/images/instagram/06-pool-aerial.png',
    width: 1024,
    height: 768,
    alt: 'Vista da piscina e baía',
  },
];

export default function InstagramFeed() {
  const { t } = useI18n();
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, staggerInViewOptions);

  return (
    <section className="py-section section-padding">
      <ScrollReveal className="mb-12 max-w-xl">
        <h2 className="font-display text-3xl md:text-4xl mb-4 leading-tight">
          {t.home.instagramTitle}
        </h2>
        <p className="text-text-light leading-relaxed">
          {t.home.instagramSubtitle}
        </p>
      </ScrollReveal>

      <motion.div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
        variants={staggerContainerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.src}
            variants={staggerItemVariants(i)}
            className={img.span === 'full' ? 'md:col-span-2' : undefined}
          >
            <Link
              href={HOTEL_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                priority={i < 2}
                fetchPriority={i < 2 ? 'high' : undefined}
                className="w-full h-auto block"
                sizes={
                  img.span === 'full'
                    ? '100vw'
                    : '(max-width: 768px) 100vw, 50vw'
                }
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-base flex items-center justify-center">
                <Instagram
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-base"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <ScrollReveal className="text-center mt-8" delay={0.5}>
        <a
          href={HOTEL_INFO.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-xs"
        >
          {t.home.instagramCta}
        </a>
      </ScrollReveal>
    </section>
  );
}
