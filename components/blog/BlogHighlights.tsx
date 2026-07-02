'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import BlogSectionHeader from './BlogSectionHeader';
import {
  staggerContainerVariants,
  staggerItemVariants,
} from '@/lib/animations/staggeredEntry';

const highlightImages = [
  {
    src: '/images/highlights/01-pool-night.png',
    alt: 'Piscina iluminada à noite',
  },
  {
    src: '/images/highlights/02-balcony-view.png',
    alt: 'Varanda com vista para a baía',
  },
  {
    src: '/images/highlights/03-resort-bay.png',
    alt: 'Terraço e baía de Inhambane',
  },
];

interface BlogHighlightsProps {
  animate: boolean;
}

export default function BlogHighlights({ animate }: BlogHighlightsProps) {
  const { t } = useI18n();

  return (
    <div className="pt-12 md:pt-16 border-t border-gray-200">
      <BlogSectionHeader title={t.home.blogHighlightsTitle} />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5"
        variants={staggerContainerVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
      >
        {highlightImages.map((img, i) => (
          <motion.div
            key={img.src}
            variants={staggerItemVariants(i)}
            className="relative aspect-[16/9] overflow-hidden rounded-2xl"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
