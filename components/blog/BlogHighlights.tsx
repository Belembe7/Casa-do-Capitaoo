'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import BlogSectionHeader from './BlogSectionHeader';
import {
  staggerContainerVariants,
  staggerItemVariants,
} from '@/lib/animations/staggeredEntry';

const HIGHLIGHT_IMAGE =
  'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80';
const VIDEO_THUMB =
  'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80';

interface BlogHighlightsProps {
  animate: boolean;
}

export default function BlogHighlights({ animate }: BlogHighlightsProps) {
  const { t } = useI18n();

  return (
    <div className="pt-12 md:pt-16 border-t border-gray-200">
      <BlogSectionHeader title={t.home.blogHighlightsTitle} />

      <motion.div
        className="grid gap-8 lg:grid-cols-3 lg:gap-10"
        variants={staggerContainerVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
      >
        {/* Testimonial */}
        <motion.div
          variants={staggerItemVariants(0)}
          className="flex flex-col justify-between rounded-3xl bg-gray-50 p-6 md:p-8"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">
                  {t.home.blogReviewName}
                </p>
                <p className="text-xs text-text-light">{t.home.blogReviewHandle}</p>
              </div>
            </div>
            <div className="mb-4 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                  aria-hidden
                />
              ))}
            </div>
            <h3 className="font-display text-xl font-semibold leading-snug text-primary mb-3">
              {t.home.blogReviewTitle}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {t.home.blogReviewText}
            </p>
          </div>
        </motion.div>

        {/* Portrait image */}
        <motion.div
          variants={staggerItemVariants(1)}
          className="relative min-h-[320px] overflow-hidden rounded-3xl lg:min-h-[420px]"
        >
          <Image
            src={HIGHLIGHT_IMAGE}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </motion.div>

        {/* Video + CTA */}
        <motion.div
          variants={staggerItemVariants(2)}
          className="flex flex-col justify-between gap-6"
        >
          <Link href="/o-hotel" className="group block">
            <div className="relative mb-4 aspect-square overflow-hidden rounded-3xl">
              <Image
                src={VIDEO_THUMB}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg">
                  <Play className="ml-1 h-6 w-6 fill-primary text-primary" aria-hidden />
                </span>
              </div>
            </div>
            <p className="font-display text-lg font-semibold leading-snug text-primary">
              {t.home.blogVideoCaption}
            </p>
          </Link>

          <Link
            href="/galeria"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:border-gray-300 hover:bg-gray-50"
          >
            {t.home.blogExploreHighlights}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
