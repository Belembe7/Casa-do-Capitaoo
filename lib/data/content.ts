export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'fachada-hotel',
    src: '/images/hotel-intro-bg.png',
    alt: 'Fachada do Hotel Casa do Capitão',
    category: 'hotel',
    width: 1024,
    height: 699,
  },
  {
    id: 'piscina-por-do-sol-panoramica',
    src: '/images/o-hotel/hero-pool-sunset.png',
    alt: 'Piscina do hotel ao pôr do sol',
    category: 'piscina',
    width: 1024,
    height: 349,
  },
  {
    id: 'gastronomia-marisco',
    src: '/images/gallery-gastronomia.png',
    alt: 'Marisco fresco servido à beira da piscina',
    category: 'restaurante',
    width: 1024,
    height: 683,
  },
  {
    id: 'piscina-noite',
    src: '/images/highlights/01-pool-night.png',
    alt: 'Piscina iluminada à noite',
    category: 'piscina',
    width: 1024,
    height: 1024,
  },
  {
    id: 'piscina-dia',
    src: '/images/instagram/05-pool-day.png',
    alt: 'Piscina com vista para o Oceano Índico',
    category: 'piscina',
    width: 1024,
    height: 667,
  },
  {
    id: 'piscina-vista',
    src: '/images/instagram/06-pool-aerial.png',
    alt: 'Área da piscina e baía de Inhambane',
    category: 'piscina',
    width: 1024,
    height: 768,
  },
  {
    id: 'pequeno-almoco',
    src: '/images/amenity-pool-breakfast.png',
    alt: 'Pequeno-almoço servido à beira da piscina',
    category: 'restaurante',
    width: 1024,
    height: 681,
  },
  {
    id: 'restaurante-vista-mar',
    src: '/images/instagram/04-restaurant.png',
    alt: 'Restaurante com vista para o mar',
    category: 'restaurante',
    width: 1024,
    height: 678,
  },
  {
    id: 'varanda-baia',
    src: '/images/highlights/02-balcony-view.png',
    alt: 'Varanda com vista para a baía',
    category: 'hotel',
    width: 1024,
    height: 759,
  },
  {
    id: 'terraco-baia',
    src: '/images/highlights/03-resort-bay.png',
    alt: 'Terraço do hotel com vista para a baía',
    category: 'areas-comuns',
    width: 1024,
    height: 577,
  },
];

export const galleryCategories = [
  { slug: 'todos', label: 'Todos' },
  { slug: 'hotel', label: 'Hotel' },
  { slug: 'restaurante', label: 'Restaurante' },
  { slug: 'piscina', label: 'Piscina' },
  { slug: 'areas-comuns', label: 'Áreas Comuns' },
];

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

export const videos: Video[] = [
  {
    id: '1',
    title: 'Casa do Capitão — Vídeo Institucional',
    url: 'https://player.vimeo.com/video/76979871?autoplay=0',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  },
  {
    id: '2',
    title: 'Inhambane Vista Aérea',
    url: 'https://player.vimeo.com/video/76979871?autoplay=0',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
];

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  { icon: 'Waves', title: 'Piscina', description: 'Piscina exterior com vista para o jardim tropical.' },
  { icon: 'Wifi', title: 'Wi-Fi Gratuito', description: 'Internet de alta velocidade em todo o hotel.' },
  { icon: 'UtensilsCrossed', title: 'Restaurante', description: 'Cozinha moçambicana e internacional.' },
  { icon: 'Wine', title: 'Bar Rooftop', description: 'Cocktails e vinhos com vista para o mar.' },
  { icon: 'Car', title: 'Estacionamento', description: 'Estacionamento gratuito e seguro.' },
  { icon: 'Shirt', title: 'Lavandaria', description: 'Serviço de lavandaria e engomadoria.' },
  { icon: 'Plane', title: 'Transfer', description: 'Transfer do/para o aeroporto de Inhambane.' },
  { icon: 'Users', title: 'Sala de Reuniões', description: 'Espaço equipado para eventos corporativos.' },
];

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Qual é a política de cancelamento?',
    answer: 'Cancelamento gratuito até 48 horas antes do check-in. Cancelamentos com menos de 48 horas estão sujeitos a cobrança de uma noite.',
  },
  {
    id: '2',
    question: 'O hotel oferece transfer do aeroporto?',
    answer: 'Sim, oferecemos serviço de transfer do Aeroporto de Inhambane. Contacte-nos para reservar.',
  },
  {
    id: '3',
    question: 'Aceitam animais de estimação?',
    answer: 'Infelizmente não aceitamos animais de estimação, exceto cães-guia devidamente identificados.',
  },
  {
    id: '4',
    question: 'Qual é o horário de check-in e check-out?',
    answer: 'Check-in a partir das 14h00. Check-out até às 11h00. Late check-out disponível mediante disponibilidade.',
  },
];
