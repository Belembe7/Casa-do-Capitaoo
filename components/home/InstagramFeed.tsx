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
  staggerItemVariants,
} from '@/lib/animations/staggeredEntry';

const instagramInViewOptions = {
  once: true as const,
  margin: '0px 0px -80px 0px' as const,
  amount: 0 as const,
};

const galleryImages = [
  {
    src: '/images/instagram/02-breakfast.png',
    width: 1024,
    height: 349,
    alt: 'Pequeno-almoço à beira da piscina',
    span: 'full' as const,
  },
  {
    src: '/images/instagram/vista-01.png',
    width: 768,
    height: 1024,
    alt: 'Pôr do sol na piscina com palmeiras',
  },
  {
    src: '/images/instagram/vista-02.png',
    width: 768,
    height: 1024,
    alt: 'Piscina do hotel com vista para o mar',
  },
  {
    src: '/images/instagram/vista-03.png',
    width: 768,
    height: 1024,
    alt: 'Pôr do sol visto da varanda',
  },
  {
    src: '/images/instagram/vista-04.png',
    width: 1024,
    height: 768,
    alt: 'Piscina iluminada ao entardecer',
  },
  {
    src: '/images/instagram/vista-05.png',
    width: 1024,
    height: 990,
    alt: 'Piscina e área exterior do hotel',
  },
  {
    src: '/images/instagram/vista-06.png',
    width: 768,
    height: 1024,
    alt: 'Vista panorâmica da piscina e baía',
  },
];

export default function InstagramFeed() {
  const { t } = useI18n();
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, instagramInViewOptions);

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

      <div ref={gridRef} className="h-px w-full" aria-hidden />

      <motion.div
        className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4"
        variants={staggerContainerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.src}
            variants={staggerItemVariants(i)}
            className={img.span === 'full' ? 'col-span-2 lg:col-span-3' : undefined}
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
                priority={i < 3}
                className="w-full h-auto block"
                sizes={
                  img.span === 'full'
                    ? '100vw'
                    : '(max-width: 1024px) 50vw, 33vw'
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
