export interface Room {
  slug: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  images: string[];
  size: number;
  view: string;
  amenities: string[];
  capacity: number;
  pricePerNight: number;
  available: boolean;
  bookingUrl: string;
}

export const rooms: Room[] = [
  {
    slug: 'suite-capitao',
    name: 'Suite Capitão',
    category: 'Suite',
    description:
      'A nossa suite mais exclusiva, com vista panorâmica para o Oceano Índico. Inspirada na história marítima de Inhambane, combina elegância colonial com conforto contemporâneo. Terraço privado, cama king-size e banheira de hidromassagem.',
    shortDescription: 'Suite exclusiva com vista para o mar e terraço privado.',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a784e6838e?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    ],
    size: 55,
    view: 'Vista Mar',
    amenities: ['Wi-Fi', 'Ar condicionado', 'Mini-bar', 'Cofre', 'Terraço privado', 'Banheira', 'Room service'],
    capacity: 2,
    pricePerNight: 18500,
    available: true,
    bookingUrl: '/reservar?suite=capitao',
  },
  {
    slug: 'quarto-vista-mar',
    name: 'Quarto Vista Mar',
    category: 'Premium',
    description:
      'Quarto espaçoso com varanda voltada para o Oceano Índico. Decoração inspirada nos navegadores portugueses que atracaram em Inhambane. Cama queen-size e casa de banho em mármore.',
    shortDescription: 'Varanda com vista deslumbrante para o mar.',
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
    ],
    size: 35,
    view: 'Vista Mar',
    amenities: ['Wi-Fi', 'Ar condicionado', 'Mini-bar', 'Cofre', 'Varanda'],
    capacity: 2,
    pricePerNight: 12500,
    available: true,
    bookingUrl: '/reservar?quarto=vista-mar',
  },
  {
    slug: 'quarto-familiar',
    name: 'Quarto Familiar',
    category: 'Família',
    description:
      'Espaço amplo com duas camas e área de estar, perfeito para famílias. Localizado no piso térreo com acesso direto à piscina e ao restaurante.',
    shortDescription: 'Ideal para famílias, com acesso à piscina.',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    ],
    size: 42,
    view: 'Vista Piscina',
    amenities: ['Wi-Fi', 'Ar condicionado', 'Mini-bar', 'Cofre', 'Duas camas', 'Área de estar'],
    capacity: 4,
    pricePerNight: 15000,
    available: true,
    bookingUrl: '/reservar?quarto=familiar',
  },
  {
    slug: 'quarto-economico',
    name: 'Quarto Económico',
    category: 'Económico',
    description:
      'Opção confortável e acessível para viajantes que procuram qualidade sem comprometer o orçamento. Decoração simples e elegante com todos os essenciais.',
    shortDescription: 'Conforto essencial a preço acessível.',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    ],
    size: 22,
    view: 'Vista Interior',
    amenities: ['Wi-Fi', 'Ar condicionado', 'Cofre'],
    capacity: 2,
    pricePerNight: 6500,
    available: true,
    bookingUrl: '/reservar?quarto=economico',
  },
  {
    slug: 'quarto-historico',
    name: 'Quarto Histórico',
    category: 'Premium',
    description:
      'Homenagem à rica história marítima de Inhambane. Mobiliário de época restaurado, detalhes em madeira nobre e azulejos originais. Uma viagem no tempo com todo o conforto moderno.',
    shortDescription: 'Património histórico com conforto moderno.',
    images: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    ],
    size: 32,
    view: 'Vista Cidade',
    amenities: ['Wi-Fi', 'Ar condicionado', 'Mini-bar', 'Cofre', 'Decoração histórica'],
    capacity: 2,
    pricePerNight: 11000,
    available: true,
    bookingUrl: '/reservar?quarto=historico',
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}

export function getAvailableRooms(
  checkIn?: string,
  checkOut?: string,
  guests?: number
): Room[] {
  let filtered = rooms.filter((r) => r.available);
  if (guests) {
    filtered = filtered.filter((r) => r.capacity >= guests);
  }
  return filtered;
}
