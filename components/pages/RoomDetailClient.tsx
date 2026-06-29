'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Wifi, Wind, Coffee, Shield, Users, Maximize, Eye, Bed } from 'lucide-react';
import RoomsCarousel from '@/components/home/RoomsCarousel';
import { formatCurrency } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/context';
import { useLocalizedRoom, useSiteContent } from '@/lib/i18n/hooks';

const amenityIcons: Record<string, React.ReactNode> = {
  'Wi-Fi': <Wifi size={18} />,
  'Ar condicionado': <Wind size={18} />,
  'Mini-bar': <Coffee size={18} />,
  Cofre: <Shield size={18} />,
};

export default function RoomDetailClient({ slug }: { slug: string }) {
  const { t } = useI18n();
  const content = useSiteContent();
  const room = useLocalizedRoom(slug);

  if (!room) notFound();

  return (
    <>
      <section className="pt-20 section-padding">
        <div className="grid lg:grid-cols-3 gap-4 mb-12">
          <div className="lg:col-span-2 relative aspect-[16/10] overflow-hidden">
            <Image
              src={room.images[0]}
              alt={room.name}
              fill
              className="object-cover"
              priority
              sizes="66vw"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {room.images.slice(1, 3).map((img, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img}
                  alt={`${room.name} ${i + 2}`}
                  fill
                  priority
                  fetchPriority="high"
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-widest text-secondary">
              {room.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl mt-2 mb-6">
              {room.name}
            </h1>
            <p className="text-text-light leading-relaxed mb-8">
              {room.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 py-6 border-y border-gray-200">
              <div className="flex items-center gap-3">
                <Maximize size={20} className="text-secondary" />
                <div>
                  <p className="text-xs text-text-light">{content.labels.area}</p>
                  <p className="font-medium">{room.size} m²</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Eye size={20} className="text-secondary" />
                <div>
                  <p className="text-xs text-text-light">{content.labels.view}</p>
                  <p className="font-medium">{room.view}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users size={20} className="text-secondary" />
                <div>
                  <p className="text-xs text-text-light">{content.labels.capacity}</p>
                  <p className="font-medium">{room.capacity} {content.labels.people}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bed size={20} className="text-secondary" />
                <div>
                  <p className="text-xs text-text-light">{content.labels.price}</p>
                  <p className="font-medium">
                    {formatCurrency(room.pricePerNight)}{content.labels.perNight}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-display text-xl mb-4">{content.labels.amenities}</h3>
            <div className="grid grid-cols-2 gap-3">
              {room.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-sm">
                  {amenityIcons[amenity] || <Shield size={18} className="text-secondary" />}
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 h-fit bg-white border border-gray-200 p-8">
            <p className="font-display text-3xl mb-2">
              {formatCurrency(room.pricePerNight)}
            </p>
            <p className="text-sm text-text-light mb-6">
              {content.labels.perNight.replace(/^\s*\/\s*/, '')}
            </p>
            <Link href={`/reservar?room=${room.slug}`} className="btn-primary w-full text-center mb-4">
              {t.common.bookNow}
            </Link>
            <p className="text-xs text-text-light text-center">
              {content.labels.freeCancel}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200">
        <div className="section-padding pt-section">
          <h2 className="font-display text-3xl mb-8">{content.labels.otherRooms}</h2>
        </div>
        <RoomsCarousel />
      </section>
    </>
  );
}
