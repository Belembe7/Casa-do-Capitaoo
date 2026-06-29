export type RoomSlug =
  | 'suite-capitao'
  | 'quarto-vista-mar'
  | 'quarto-jardim'
  | 'quarto-familiar'
  | 'quarto-economico'
  | 'quarto-historico';

export type OfferSlug =
  | 'escapada-maritima'
  | 'romance-capitao'
  | 'verao-inhambane'
  | 'aventura-tofo';

export interface RoomContent {
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  view: string;
  amenities: string[];
}

export interface OfferContent {
  title: string;
  description: string;
  badge: string;
}

export interface SiteContent {
  amenities: {
    rooftop: { label: string; description: string };
    lobby: { label: string; description: string };
    gym: { label: string; description: string };
  };
  rooms: Record<RoomSlug, RoomContent>;
  offers: Record<OfferSlug, OfferContent>;
  pages: {
    quartos: { title: string; intro: string };
    contacto: {
      title: string;
      addressLabel: string;
      emailLabel: string;
      phoneLabel: string;
      whatsapp: string;
      sendMessage: string;
      name: string;
      email: string;
      subject: string;
      message: string;
      namePlaceholder: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
    };
    oHotel: {
      title: string;
      intro: string;
      sections: { title: string; text: string }[];
      historyTitle: string;
      timeline: { year: string; event: string }[];
      galleryCta: string;
    };
    rooftop: { title: string; tagline: string; intro: string; cta: string };
    galeria: { title: string; intro: string };
    ofertas: { title: string; intro: string };
    servicos: { title: string; intro: string };
    restaurante: { title: string; intro: string };
    sobreNos: { title: string; intro: string };
    blog: { title: string; intro: string };
    faqs: { title: string; intro: string };
    reservar: { title: string; intro: string };
    cancelarReserva: { title: string; intro: string };
    pesquisa: { title: string; intro: string };
  };
  labels: {
    area: string;
    view: string;
    capacity: string;
    price: string;
    perNight: string;
    amenities: string;
    people: string;
    unavailable: string;
    otherRooms: string;
    freeCancel: string;
    validUntil: string;
  };
  footer: {
    hotel: string;
    bookings: string;
    info: string;
    whatsapp: string;
    rooms: string;
    theHotel: string;
    rooftop: string;
    gallery: string;
    services: string;
    book: string;
    offers: string;
    restaurant: string;
    contact: string;
    blog: string;
    about: string;
    faqs: string;
    legal: string;
  };
  popup: { title: string; description: string; cta: string };
}
