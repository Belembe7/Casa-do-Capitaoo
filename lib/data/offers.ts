export interface Offer {
  slug: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  bookingUrl: string;
  validUntil?: string;
}

export const offers: Offer[] = [
  {
    slug: 'escapada-maritima',
    title: 'Escapada Marítima',
    description:
      'Três noites com pequeno-almoço incluído e passeio de dhow tradicional pela baía de Inhambane. Desconto de 20% em todas as refeições no restaurante.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    badge: '-20%',
    bookingUrl: '/reservar?oferta=escapada-maritima',
    validUntil: '2026-08-31',
  },
  {
    slug: 'romance-capitao',
    title: 'Romance do Capitão',
    description:
      'Pacote romântico para casais: jantar à luz de velas no terraço, garrafa de vinho e late check-out gratuito. Perfeito para lua de mel ou aniversário.',
    image: '/images/offer-casais.png',
    badge: 'Casais',
    bookingUrl: '/reservar?oferta=romance-capitao',
    validUntil: '2026-12-31',
  },
  {
    slug: 'verao-inhambane',
    title: 'Verão em Inhambane',
    description:
      'Estadia prolongada com 4 noites pelo preço de 3. Inclui transfer do aeroporto e acesso gratuito à piscina e ginásio.',
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80',
    badge: '4=3',
    bookingUrl: '/reservar?oferta=verao-inhambane',
    validUntil: '2026-03-31',
  },
];

export function getOfferBySlug(slug: string): Offer | undefined {
  return offers.find((o) => o.slug === slug);
}
