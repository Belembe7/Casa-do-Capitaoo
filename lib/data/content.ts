export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', alt: 'Fachada do hotel', category: 'hotel' },
  { id: '2', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', alt: 'Suite Capitão', category: 'quartos' },
  { id: '3', src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', alt: 'Piscina', category: 'piscina' },
  { id: '4', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Restaurante', category: 'restaurante' },
  { id: '5', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', alt: 'Praia de Inhambane', category: 'praia' },
  { id: '6', src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', alt: 'Evento no terraço', category: 'eventos' },
  { id: '7', src: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80', alt: 'Quarto Vista Mar', category: 'quartos' },
  { id: '8', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', alt: 'Pratos do restaurante', category: 'restaurante' },
  { id: '9', src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', alt: 'Bar Rooftop', category: 'hotel' },
  { id: '10', src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80', alt: 'Área comum', category: 'areas-comuns' },
  { id: '11', src: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80', alt: 'Pôr do sol', category: 'praia' },
  { id: '12', src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', alt: 'Jardim tropical', category: 'areas-comuns' },
];

export const galleryCategories = [
  { slug: 'todos', label: 'Todos' },
  { slug: 'hotel', label: 'Hotel' },
  { slug: 'quartos', label: 'Quartos' },
  { slug: 'restaurante', label: 'Restaurante' },
  { slug: 'piscina', label: 'Piscina' },
  { slug: 'eventos', label: 'Eventos' },
  { slug: 'praia', label: 'Praia' },
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
