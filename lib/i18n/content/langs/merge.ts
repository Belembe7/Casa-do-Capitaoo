import type { SiteContent } from '../types';
import { EN_CONTENT } from '../en';

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type PartialContent = DeepPartial<SiteContent>;

export function mergeContent(overrides: PartialContent): SiteContent {
  const pages = overrides.pages ?? {};
  return {
    amenities: {
      rooftop: { ...EN_CONTENT.amenities.rooftop, ...overrides.amenities?.rooftop },
      lobby: { ...EN_CONTENT.amenities.lobby, ...overrides.amenities?.lobby },
      gym: { ...EN_CONTENT.amenities.gym, ...overrides.amenities?.gym },
    },
    rooms: { ...EN_CONTENT.rooms, ...overrides.rooms },
    offers: { ...EN_CONTENT.offers, ...overrides.offers },
    pages: {
      quartos: { ...EN_CONTENT.pages.quartos, ...pages.quartos },
      contacto: { ...EN_CONTENT.pages.contacto, ...pages.contacto },
      oHotel: {
        ...EN_CONTENT.pages.oHotel,
        ...pages.oHotel,
        sections: pages.oHotel?.sections ?? EN_CONTENT.pages.oHotel.sections,
        timeline: pages.oHotel?.timeline ?? EN_CONTENT.pages.oHotel.timeline,
      },
      rooftop: { ...EN_CONTENT.pages.rooftop, ...pages.rooftop },
      galeria: { ...EN_CONTENT.pages.galeria, ...pages.galeria },
      ofertas: { ...EN_CONTENT.pages.ofertas, ...pages.ofertas },
      servicos: { ...EN_CONTENT.pages.servicos, ...pages.servicos },
      restaurante: { ...EN_CONTENT.pages.restaurante, ...pages.restaurante },
      sobreNos: { ...EN_CONTENT.pages.sobreNos, ...pages.sobreNos },
      blog: { ...EN_CONTENT.pages.blog, ...pages.blog },
      faqs: { ...EN_CONTENT.pages.faqs, ...pages.faqs },
      reservar: { ...EN_CONTENT.pages.reservar, ...pages.reservar },
      cancelarReserva: { ...EN_CONTENT.pages.cancelarReserva, ...pages.cancelarReserva },
      pesquisa: { ...EN_CONTENT.pages.pesquisa, ...pages.pesquisa },
    },
    labels: { ...EN_CONTENT.labels, ...overrides.labels },
    footer: { ...EN_CONTENT.footer, ...overrides.footer },
    popup: { ...EN_CONTENT.popup, ...overrides.popup },
  } as SiteContent;
}
