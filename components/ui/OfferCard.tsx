'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import type { Offer } from '@/lib/data/offers';

interface OfferCardProps {
  offer: Offer;
  index?: number;
  priority?: boolean;
}

export default function OfferCard({ offer, index = 0, priority = false }: OfferCardProps) {
  const { t } = useI18n();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <Link href={`/ofertas/${offer.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden mb-4">
          <Image
            src={offer.image}
            alt={offer.title}
            fill
            priority={priority}
            fetchPriority={priority ? 'high' : undefined}
            className="object-cover transition-transform duration-slow group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute top-4 left-4 bg-secondary text-white text-xs px-3 py-1 uppercase tracking-wider">
            {offer.badge}
          </span>
        </div>
        <h3 className="font-display text-xl mb-2 group-hover:text-secondary transition-colors">
          {offer.title}
        </h3>
        <p className="text-sm text-text-light line-clamp-2 mb-4">
          {offer.description}
        </p>
        <span className="btn-outline text-xs px-4 py-2 inline-flex">
          {t.common.seeMore}
        </span>
      </Link>
    </motion.article>
  );
}
