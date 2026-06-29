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

const instagramImages = [
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', tall: true },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', wide: false },
  { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', wide: false },
  { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', wide: true },
  { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80', tall: false },
  { src: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&q=80', wide: false },
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
        className="masonry-grid"
        variants={staggerContainerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {instagramImages.map((img, i) => (
          <motion.div
            key={i}
            variants={staggerItemVariants(i)}
            className={`group relative overflow-hidden ${
              img.tall ? 'masonry-item-tall' : img.wide ? 'masonry-item-wide' : ''
            } ${i === 2 ? 'aspect-square' : 'min-h-[200px]'}`}
          >
            <Link
              href={HOTEL_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 block"
            >
              <Image
                src={img.src}
                alt={`Instagram ${i + 1}`}
                fill
                priority={i < 3}
                fetchPriority={i < 3 ? 'high' : undefined}
                className="object-cover transition-transform duration-slow group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-base flex items-center justify-center">
                <Instagram
                  size={32}
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
