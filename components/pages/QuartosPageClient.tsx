'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useI18n } from '@/lib/i18n/context';
import { useLocalizedRooms, useSiteContent } from '@/lib/i18n/hooks';

export default function QuartosPageClient() {
  const { t } = useI18n();
  const content = useSiteContent();
  const localizedRooms = useLocalizedRooms();

  return (
    <>
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80"
          alt={content.pages.quartos.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 section-padding pb-12">
          <h1 className="font-display text-4xl md:text-6xl text-white">
            {content.pages.quartos.title}
          </h1>
        </div>
      </section>

      <section className="py-section section-padding">
        <ScrollReveal>
          <p className="text-text-light max-w-2xl mb-12 leading-relaxed">
            {content.pages.quartos.intro}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {localizedRooms.map((room, i) => (
            <div key={room.slug} className="group">
              <Link href={`/quartos/${room.slug}`}>
                <div className="relative aspect-[16/10] overflow-hidden mb-6">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    priority={i < 4}
                    fetchPriority={i < 4 ? 'high' : undefined}
                    className="object-cover transition-transform duration-slow group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </Link>
              <span className="text-xs uppercase tracking-widest text-secondary">
                {room.category}
              </span>
              <h2 className="font-display text-2xl mt-2 mb-3">{room.name}</h2>
              <p className="text-text-light text-sm mb-4">{room.shortDescription}</p>
              <div className="flex gap-3">
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
          ))}
        </div>
      </section>
    </>
  );
}
