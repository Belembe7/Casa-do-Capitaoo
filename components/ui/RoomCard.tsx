'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { useSiteContent } from '@/lib/i18n/hooks';
import type { Room } from '@/lib/data/rooms';

interface RoomCardProps {
  room: Room;
  index?: number;
  priority?: boolean;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80';

export default function RoomCard({ room, index = 0, priority = false }: RoomCardProps) {
  const { t } = useI18n();
  const content = useSiteContent();
  const [imgSrc, setImgSrc] = useState(room.images[0] || FALLBACK_IMAGE);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group flex-shrink-0 w-[280px] md:w-[320px]"
    >
      <Link href={`/quartos/${room.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden mb-4">
          <Image
            src={imgSrc}
            alt={room.name}
            fill
            priority={priority}
            fetchPriority={priority ? 'high' : undefined}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="object-cover transition-transform duration-slow group-hover:scale-105"
            sizes="(max-width: 768px) 280px, 320px"
          />
          {!room.available && (
            <span className="absolute top-4 left-4 bg-primary/80 text-white text-xs px-3 py-1 uppercase tracking-wider">
              {content.labels.unavailable}
            </span>
          )}
        </div>
      </Link>
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-widest text-text-light">
          {room.category}
        </span>
        <h3 className="font-display text-xl">{room.name}</h3>
        <p className="text-sm text-text-light line-clamp-2">
          {room.shortDescription}
        </p>
        <div className="flex gap-3 pt-2">
          <Link href="/reservar" className="btn-primary text-xs px-4 py-2">
            {t.common.bookNow}
          </Link>
          <Link
            href={`/quartos/${room.slug}`}
            className="btn-outline text-xs px-4 py-2"
          >
            {t.common.seeMore}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
