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
    id: 'piscina-por-do-sol',
    src: '/images/instagram/vista-01.png',
    alt: 'Pôr do sol na piscina com palmeiras',
    category: 'piscina',
    width: 768,
    height: 1024,
  },
  {
    id: 'piscina-dia',
    src: '/images/instagram/vista-02.png',
    alt: 'Piscina do hotel com vista para o mar',
    category: 'piscina',
    width: 768,
    height: 1024,
  },
  {
    id: 'varanda-por-do-sol',
    src: '/images/instagram/vista-03.png',
    alt: 'Pôr do sol visto da varanda',
    category: 'hotel',
    width: 768,
    height: 1024,
  },
  {
    id: 'piscina-entardecer',
    src: '/images/instagram/vista-04.png',
    alt: 'Piscina iluminada ao entardecer',
    category: 'piscina',
    width: 1024,
    height: 768,
  },
  {
    id: 'area-exterior',
    src: '/images/instagram/vista-05.png',
    alt: 'Piscina e área exterior do hotel',
    category: 'areas-comuns',
    width: 1024,
    height: 990,
  },
  {
    id: 'piscina-panoramica',
    src: '/images/instagram/vista-06.png',
    alt: 'Vista panorâmica da piscina e baía',
    category: 'piscina',
    width: 768,
    height: 1024,
  },
  {
    id: 'pequeno-almoco',
    src: '/images/instagram/02-breakfast.png',
    alt: 'Pequeno-almoço à beira da piscina',
    category: 'restaurante',
    width: 1024,
    height: 349,
  },
  {
    id: 'sala-conferencias-1',
    src: '/images/conference-room/01.png',
    alt: 'Sala de conferências do hotel',
    category: 'areas-comuns',
    width: 1024,
    height: 768,
  },
  {
    id: 'sala-conferencias-2',
    src: '/images/conference-room/02.png',
    alt: 'Sala de conferências preparada para eventos',
    category: 'areas-comuns',
    width: 1024,
    height: 768,
  },
  {
    id: 'sala-conferencias-3',
    src: '/images/conference-room/03.png',
    alt: 'Palco da sala de eventos corporativos',
    category: 'areas-comuns',
    width: 1024,
    height: 768,
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
