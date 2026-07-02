'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import RoomCard from '@/components/ui/RoomCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useLocalizedRooms, useLocalizedOffers } from '@/lib/i18n/hooks';
import { useI18n } from '@/lib/i18n/context';
import OfferCard from '@/components/ui/OfferCard';

export default function RoomsCarousel() {
  const { t } = useI18n();
  const rooms = useLocalizedRooms();
  const offers = useLocalizedOffers();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  const featuredOffer = offers.find((offer) => offer.slug !== 'escapada-maritima');

  const carouselItems = [
    ...rooms.slice(0, 4).map((r) => ({ type: 'room' as const, data: r })),
    ...(featuredOffer ? [{ type: 'offer' as const, data: featuredOffer }] : []),
    ...rooms.slice(4).map((r) => ({ type: 'room' as const, data: r })),
  ];

  return (
    <section className="py-section section-padding overflow-hidden">
      <ScrollReveal className="mb-12">
        <h2 className="font-display text-3xl md:text-4xl max-w-2xl leading-tight">
          {t.home.roomsTitle}
        </h2>
        <Link
          href="/quartos"
          className="inline-block mt-4 text-sm uppercase tracking-widest link-underline"
        >
          {t.home.roomsCta}
        </Link>
      </ScrollReveal>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {carouselItems.map((item, i) =>
              item.type === 'room' ? (
                <RoomCard key={item.data.slug} room={item.data} index={i} priority={i < 5} />
              ) : (
                <div key={item.data.slug} className="flex-shrink-0 w-[280px] md:w-[320px]">
                  <OfferCard offer={item.data} index={i} priority={i < 5} />
                </div>
              )
            )}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          disabled={!canPrev}
          className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white shadow-lg hover:bg-secondary hover:text-white transition-colors disabled:opacity-30 hidden md:block"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canNext}
          className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white shadow-lg hover:bg-secondary hover:text-white transition-colors disabled:opacity-30 hidden md:block"
          aria-label="Seguinte"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
