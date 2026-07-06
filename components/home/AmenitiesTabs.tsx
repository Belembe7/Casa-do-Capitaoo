'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ImageOff } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useI18n } from '@/lib/i18n/context';
import { useSiteContent } from '@/lib/i18n/hooks';

const conferenceRoomImages = [
  '/images/conference-room/01.png',
  '/images/conference-room/02.png',
] as const;

const amenityImages: Record<(typeof amenityIds)[number], readonly string[] | null> = {
  lobby: conferenceRoomImages,
  gym: ['/images/amenity-balcao.png'],
};

const SLIDESHOW_INTERVAL_MS = 5000;

function ImageSlideshow({ images, alt }: { images: readonly string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, SLIDESHOW_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <motion.div
          key={src}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[#eceae6]"
          aria-hidden={i !== index}
        >
          <Image
            src={src}
            alt={i === index ? alt : ''}
            fill
            priority={i === 0}
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      ))}
    </>
  );
}

const amenityIds = ['lobby', 'gym'] as const;

export default function AmenitiesTabs() {
  const { t } = useI18n();
  const content = useSiteContent();
  const amenities = amenityIds.map((id) => ({
    id,
    image: amenityImages[id],
    ...content.amenities[id],
  }));
  const [active, setActive] = useState(amenities[0].id);
  const activeAmenity = amenities.find((a) => a.id === active) || amenities[0];

  return (
    <section className="py-section section-padding">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl mb-4 leading-tight">
            {t.home.amenitiesTitle}
          </h2>
          <p className="text-text-light leading-relaxed mb-8 max-w-md">
            {t.home.amenitiesSubtitle}
          </p>

          {/* Desktop vertical tabs */}
          <div className="hidden md:flex flex-col gap-4">
            {amenities.map((amenity) => (
              <button
                key={amenity.id}
                onClick={() => setActive(amenity.id)}
                className={`text-left py-3 border-l-2 pl-4 transition-all duration-base ${
                  active === amenity.id
                    ? 'border-secondary text-primary font-medium'
                    : 'border-transparent text-text-light hover:text-primary'
                }`}
              >
                <span className="font-display text-xl">{amenity.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile horizontal pills */}
          <div className="flex md:hidden gap-2 flex-wrap mb-6">
            {amenities.map((amenity) => (
              <button
                key={amenity.id}
                onClick={() => setActive(amenity.id)}
                className={`px-4 py-2 text-sm uppercase tracking-wider border transition-all ${
                  active === amenity.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 text-text-light'
                }`}
              >
                {amenity.label}
              </button>
            ))}
          </div>

          <Link
            href="/o-hotel"
            className="inline-block mt-8 text-sm uppercase tracking-widest link-underline"
          >
            {t.home.amenitiesCta}
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAmenity.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {activeAmenity.image ? (
                  <>
                    {activeAmenity.image.length > 1 ? (
                      <ImageSlideshow images={activeAmenity.image} alt={activeAmenity.label} />
                    ) : (
                      <Image
                        src={activeAmenity.image[0]}
                        alt={activeAmenity.label}
                        fill
                        priority={activeAmenity.id === amenities[0].id}
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <p className="absolute bottom-6 left-6 right-6 z-10 text-white text-sm">
                      {activeAmenity.description}
                    </p>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#eceae6] px-6 text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 text-text-light shadow-sm">
                      <ImageOff size={26} strokeWidth={1.5} aria-hidden />
                    </span>
                    <p className="text-sm font-medium text-primary">Fotografia indisponível</p>
                    <p className="max-w-xs text-xs leading-relaxed text-text-light">
                      {activeAmenity.description}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
