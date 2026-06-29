'use client';

import { useMemo } from 'react';
import { useI18n } from './context';
import { getSiteContent } from './content';
import { rooms, type Room } from '@/lib/data/rooms';
import { offers, type Offer } from '@/lib/data/offers';
import type { RoomSlug, OfferSlug } from './content/types';

export function useSiteContent() {
  const { locale } = useI18n();
  return useMemo(() => getSiteContent(locale), [locale]);
}

export function useLocalizedRooms(): Room[] {
  const content = useSiteContent();
  return useMemo(
    () =>
      rooms.map((room) => {
        const localized = content.rooms[room.slug as RoomSlug];
        return localized ? { ...room, ...localized } : room;
      }),
    [content]
  );
}

export function useLocalizedRoom(slug: string): Room | undefined {
  const content = useSiteContent();
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return undefined;
  const localized = content.rooms[slug as RoomSlug];
  return localized ? { ...room, ...localized } : room;
}

export function useLocalizedOffers(): Offer[] {
  const content = useSiteContent();
  return useMemo(
    () =>
      offers.map((offer) => {
        const localized = content.offers[offer.slug as OfferSlug];
        return localized ? { ...offer, ...localized } : offer;
      }),
    [content]
  );
}

export function useLocalizedOffer(slug: string): Offer | undefined {
  const content = useSiteContent();
  const offer = offers.find((o) => o.slug === slug);
  if (!offer) return undefined;
  const localized = content.offers[slug as OfferSlug];
  return localized ? { ...offer, ...localized } : offer;
}
