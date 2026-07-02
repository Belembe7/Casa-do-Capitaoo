import type { Locale } from './locales';
export { defaultLocale } from './locales';
export type { Locale } from './locales';
export type { Translation, TranslationKey } from './translations/types';

import type { Translation } from './translations/types';
import {
  es, fr, de, zh, hi, ar, ru, ja, ko, it, tr, vi, pl, nl, bn,
} from './translations/extra-locales';

const pt: Translation = {
  nav: {
    rooms: 'Quartos',
    hotel: 'O Hotel',
    rooftop: 'Rooftop',
    gallery: 'Galeria',
    offers: 'Ofertas',
    shop: 'Loja',
    contact: 'Contacto',
    blog: 'Blog',
    about: 'Sobre Nós',
    menu: 'Menu',
    book: 'Reservar',
  },
  hero: {
    benefits: [
      'Melhor Preço Garantido',
      'Cancelamento gratuito 48h',
      'Late Check-out gratuito',
    ],
  },
  home: {
    introTitle: '',
    introSubtitle:
      'Há mais de um século, este era o lugar de onde o Capitão do Porto observava a Baía de Inhambane e orientava as embarcações que chegavam à cidade. Hoje, esse mesmo cenário recebe viajantes de todo o mundo, preservando a sua herança marítima enquanto oferece uma experiência de hospitalidade contemporânea.',
    introCta: 'Sobre o Hotel',
    roomsTitle: 'Quartos com vista para o Índico ou o abrigo do vento',
    roomsCta: 'Todos os quartos',
    amenitiesTitle: 'Experiências que elevam a sua estadia',
    amenitiesSubtitle:
      'Do pequeno-almoço servido à beira da piscina às salas para eventos corporativos, cada espaço do Hotel Casa Do Capitão foi pensado para quem exige o melhor.',
    amenitiesCta: 'Mais sobre o hotel',
    instagramTitle: 'Viajar é uma forma de estar.',
    instagramSubtitle:
      'Descobre os pequenos instantes que farás teus se nos visitares',
    instagramCta: 'Ver mais no Instagram',
    blogTitle: 'Blog da Casa do Capitão',
    blogSubtitle:
      'Histórias, lugares e momentos que inspiram uma forma de viver Inhambane com calma, beleza e verdade.',
    blogCta: 'Ver mais histórias',
    blogLatestTitle: 'Últimas Histórias',
    blogHighlightsTitle: 'Destaques da Casa do Capitão',
    blogExploreHighlights: 'Explorar destaques',
    blogReviewName: 'Maria Santos',
    blogReviewHandle: '@maria_santos_mz',
    blogReviewTitle: 'Uma estadia que ficou na memória',
    blogReviewText:
      'Acordar com vista para a baía de Inhambane, tomar café no terraço e sentir que o tempo desacelera. A Casa do Capitão é exactamente o refúgio que procurávamos.',
    blogVideoCaption: 'Conheça a história e a alma do nosso hotel boutique',
  },
  booking: {
    checkIn: 'Entrada',
    checkOut: 'Saída',
    guests: 'Hóspedes',
    adults: 'Adultos',
    rooms: 'Quartos',
    book: 'Reservar',
    search: 'Pesquisar disponibilidade',
  },
  footer: {
    newsletter: 'Subscreve a Newsletter',
    subscribe: 'Subscrever',
    terms: 'Aceito os termos e condições de uso',
    copyright: 'Todos os direitos reservados.',
    legal: 'Aviso Legal',
    cookies: 'Política de Cookies',
    openMaps: 'Abrir no Google Maps',
  },
  common: {
    bookNow: 'Reservar agora',
    seeMore: 'Ver mais',
    learnMore: 'Saber mais',
    back: 'Voltar',
    loading: 'A carregar...',
    search: 'Pesquisar',
    send: 'Enviar',
    close: 'Fechar',
    minRead: 'min de leitura',
  },
};

const en: Translation = {
  nav: {
    rooms: 'Rooms',
    hotel: 'The Hotel',
    rooftop: 'Rooftop',
    gallery: 'Gallery',
    offers: 'Offers',
    shop: 'Shop',
    contact: 'Contact',
    blog: 'Blog',
    about: 'About Us',
    menu: 'Menu',
    book: 'Book',
  },
  hero: {
    benefits: [
      'Best Price Guaranteed',
      'Free cancellation 48h',
      'Free late check-out',
    ],
  },
  home: {
    introTitle: '',
    introSubtitle:
      'More than a century ago, this was where the Harbour Captain watched over Inhambane Bay and guided the vessels arriving in the city. Today, the same setting welcomes travellers from around the world, preserving its maritime heritage while offering a contemporary hospitality experience.',
    introCta: 'About the Hotel',
    roomsTitle: 'Rooms facing the Indian Ocean or sheltered from the wind',
    roomsCta: 'All rooms',
    amenitiesTitle: 'Experiences that elevate your stay',
    amenitiesSubtitle:
      'From poolside breakfast to corporate event spaces, every corner of Hotel Casa Do Capitão is designed for those who expect the very best.',
    amenitiesCta: 'More about the hotel',
    instagramTitle: 'Traveling is a way of being.',
    instagramSubtitle:
      'Discover the small moments you will make your own if you visit us',
    instagramCta: 'See more on Instagram',
    blogTitle: 'Casa do Capitão Blog',
    blogSubtitle:
      'Stories, places and moments that inspire a way of living Inhambane with calm, beauty and truth.',
    blogCta: 'See more stories',
    blogLatestTitle: 'Latest Stories',
    blogHighlightsTitle: 'Casa do Capitão Highlights',
    blogExploreHighlights: 'Explore highlights',
    blogReviewName: 'Maria Santos',
    blogReviewHandle: '@maria_santos_mz',
    blogReviewTitle: 'A stay that stayed with us',
    blogReviewText:
      'Waking up to views over Inhambane Bay, coffee on the terrace, and feeling time slow down. Casa do Capitão is exactly the refuge we were looking for.',
    blogVideoCaption: 'Discover the story and soul of our boutique hotel',
  },
  booking: {
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    adults: 'Adults',
    rooms: 'Rooms',
    book: 'Book',
    search: 'Search availability',
  },
  footer: {
    newsletter: 'Subscribe to Newsletter',
    subscribe: 'Subscribe',
    terms: 'I accept the terms and conditions',
    copyright: 'All rights reserved.',
    legal: 'Legal Notice',
    cookies: 'Cookie Policy',
    openMaps: 'Open in Google Maps',
  },
  common: {
    bookNow: 'Book now',
    seeMore: 'See more',
    learnMore: 'Learn more',
    back: 'Back',
    loading: 'Loading...',
    search: 'Search',
    send: 'Send',
    close: 'Close',
    minRead: 'min read',
  },
};

export const translations: Record<Locale, Translation> = {
  pt,
  en,
  es,
  fr,
  de,
  zh,
  hi,
  ar,
  ru,
  ja,
  ko,
  it,
  tr,
  vi,
  pl,
  nl,
  bn,
};
