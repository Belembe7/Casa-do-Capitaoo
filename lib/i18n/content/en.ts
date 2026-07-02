import type { SiteContent } from './types';

export const EN_CONTENT: SiteContent = {
  amenities: {
    rooftop: {
      label: 'Rooftop Bar',
      description:
        'Poolside breakfast with bay views and personalised five-star service.',
    },
    lobby: {
      label: 'Conference Room',
      description:
        'An elegant, fully equipped space for corporate meetings, presentations and business events with bay views.',
    },
    gym: {
      label: 'Salon',
      description:
        'A versatile hall for social events, celebrations and gatherings in a refined, welcoming setting.',
    },
  },
  rooms: {
    'suite-capitao': {
      name: 'Captain Suite',
      category: 'Suite',
      shortDescription: 'Exclusive suite with sea views and private terrace.',
      description:
        'Our most exclusive suite with panoramic views of the Indian Ocean. Inspired by Inhambane\'s maritime history, it combines colonial elegance with contemporary comfort. Private terrace, king-size bed and whirlpool bath.',
      view: 'Sea View',
      amenities: ['Wi-Fi', 'Air conditioning', 'Mini-bar', 'Safe', 'Private terrace', 'Bathtub', 'Room service'],
    },
    'quarto-vista-mar': {
      name: 'Sea View Room',
      category: 'Premium',
      shortDescription: 'Balcony with stunning sea views.',
      description:
        'Spacious room with a balcony facing the Indian Ocean. Decor inspired by the Portuguese navigators who docked in Inhambane. Queen-size bed and marble bathroom.',
      view: 'Sea View',
      amenities: ['Wi-Fi', 'Air conditioning', 'Mini-bar', 'Safe', 'Balcony'],
    },
    'quarto-jardim': {
      name: 'Garden Room',
      category: 'Standard',
      shortDescription: 'Views over the hotel\'s tropical garden.',
      description:
        'A cosy room overlooking our tropical garden. A serene, fresh atmosphere ideal for relaxing after a day at Tofo beach or Inhambane Bay.',
      view: 'Garden View',
      amenities: ['Wi-Fi', 'Air conditioning', 'Safe', 'Kettle'],
    },
    'quarto-familiar': {
      name: 'Family Room',
      category: 'Family',
      shortDescription: 'Ideal for families, with pool access.',
      description:
        'Spacious layout with two beds and a sitting area, perfect for families. Located on the ground floor with direct access to the pool and restaurant.',
      view: 'Pool View',
      amenities: ['Wi-Fi', 'Air conditioning', 'Mini-bar', 'Safe', 'Two beds', 'Sitting area'],
    },
    'quarto-economico': {
      name: 'Economy Room',
      category: 'Economy',
      shortDescription: 'Essential comfort at an accessible price.',
      description:
        'A comfortable, affordable option for travellers seeking quality without compromising their budget. Simple, elegant décor with all the essentials.',
      view: 'Interior View',
      amenities: ['Wi-Fi', 'Air conditioning', 'Safe'],
    },
    'quarto-historico': {
      name: 'Historic Room',
      category: 'Premium',
      shortDescription: 'Historic heritage with modern comfort.',
      description:
        'A tribute to Inhambane\'s rich maritime history. Restored period furniture, fine wood details and original tiles. A journey through time with every modern comfort.',
      view: 'City View',
      amenities: ['Wi-Fi', 'Air conditioning', 'Mini-bar', 'Safe', 'Historic décor'],
    },
  },
  offers: {
    'escapada-maritima': {
      title: 'Maritime Escape',
      description:
        'Three nights with breakfast included and a traditional dhow tour of Inhambane Bay. 20% off all restaurant meals.',
      badge: '-20%',
    },
    'romance-capitao': {
      title: 'Captain\'s Romance',
      description:
        'Romantic package for couples: candlelit dinner on the terrace, bottle of wine and free late check-out. Perfect for honeymoons or anniversaries.',
      badge: 'Couples',
    },
    'verao-inhambane': {
      title: 'Summer in Inhambane',
      description:
        'Extended stay: 4 nights for the price of 3. Includes airport transfer and free access to the pool and gym.',
      badge: '4=3',
    },
    'aventura-tofo': {
      title: 'Tofo Adventure',
      description:
        'Hotel + whale shark diving in Tofo. Includes transport, equipment and certified guide.',
      badge: 'Adventure',
    },
  },
  pages: {
    quartos: {
      title: 'Rooms',
      intro:
        'Every room tells a story. From the Captain Suite with panoramic views to the Historic Room with original tiles, find your perfect refuge in Inhambane.',
    },
    contacto: {
      title: 'Contact',
      addressLabel: 'Address',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      whatsapp: 'WhatsApp',
      sendMessage: 'Send message',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      namePlaceholder: 'Your name',
      subjectPlaceholder: 'Message subject',
      messagePlaceholder: 'Your message...',
    },
    oHotel: {
      title: 'The Hotel',
      intro:
        'More than a century ago, this was where the Harbour Captain watched over Inhambane Bay. Today, the pool, terrace and 270-degree view welcome travellers from around the world in a contemporary luxury experience.',
      sections: [
        {
          title: 'Poolside Breakfast',
          text: 'Start the day with breakfast served by the pool, overlooking Inhambane Bay. Our personalised five-star service turns every morning into a moment of calm, flavour and exclusivity.',
        },
        {
          title: 'Pool with Indian Ocean Views',
          text: 'Our pool stretches towards the Indian Ocean, surrounded by sun loungers, palm trees and natural light. An invitation to refresh body and mind while contemplating the serene rhythm of the bay.',
        },
        {
          title: 'Bay View',
          text: 'Inhambane Bay wraps around the hotel with a wide, luminous outlook. Among gardens, palm trees and the sea beyond, every space is designed for those who seek comfort, elegance and connection with the landscape.',
        },
      ],
      historyTitle: 'Our History',
      timeline: [
        { year: 'Before 1885', event: 'Official residence of the Harbour Captain, facing Inhambane Bay.' },
        { year: '1918', event: 'The building becomes the Comodoro Club, a gathering place for naval officers.' },
        { year: '2007', event: 'Heritage restoration begins, opening a new chapter in its history.' },
        { year: '2010', event: 'Hotel Casa do Capitão opens, preserving historic legacy with contemporary hospitality.' },
        { year: 'Today', event: 'One of Inhambane\'s landmark hotels, where history, comfort and the beauty of the bay meet.' },
      ],
      galleryCta: 'View Gallery',
    },
    rooftop: {
      title: 'Rooftop Bar',
      tagline: 'Where the horizon meets the glass',
      intro:
        'Sunset cocktails with panoramic views over Inhambane Bay. Our rooftop is the perfect place to celebrate the end of the day.',
      cta: 'Book a table',
    },
    galeria: {
      title: 'Gallery',
      intro: 'Moments captured at Casa do Capitão and the beautiful bay of Inhambane.',
    },
    ofertas: {
      title: 'Offers',
      intro: 'Special packages to make your stay even more memorable.',
    },
    servicos: {
      title: 'Services',
      intro: 'Everything you need for a comfortable and unforgettable stay.',
    },
    restaurante: {
      title: 'Restaurant',
      intro: 'Flavours of Mozambique with views of the Indian Ocean.',
    },
    sobreNos: {
      title: 'About Us',
      intro: 'Our mission is to share Mozambican hospitality with the world.',
    },
    blog: {
      title: 'Blog',
      intro: 'Stories, destinations and inspiration for your trip to Inhambane.',
    },
    faqs: {
      title: 'Frequently Asked Questions',
      intro: 'Answers to our guests\' most common questions.',
    },
    reservar: {
      title: 'Book',
      intro: 'Secure your stay at Casa do Capitão.',
    },
    cancelarReserva: {
      title: 'Cancel Booking',
      intro: 'Enter your booking details to request cancellation.',
    },
    pesquisa: {
      title: 'Search',
      intro: 'Results for your site search.',
    },
  },
  labels: {
    area: 'Area',
    view: 'View',
    capacity: 'Capacity',
    price: 'Price',
    perNight: '/ night',
    amenities: 'Amenities',
    people: 'people',
    unavailable: 'Unavailable',
    otherRooms: 'Other rooms',
    freeCancel: 'Free cancellation up to 48h before',
    validUntil: 'Valid until',
  },
  footer: {
    hotel: 'Hotel',
    bookings: 'Bookings',
    info: 'Information',
    whatsapp: 'WhatsApp',
    rooms: 'Rooms',
    theHotel: 'The Hotel',
    rooftop: 'Rooftop',
    gallery: 'Gallery',
    services: 'Services',
    book: 'Book',
    offers: 'Offers',
    restaurant: 'Restaurant',
    contact: 'Contact',
    blog: 'Blog',
    about: 'About Us',
    faqs: 'FAQs',
    legal: 'Legal Notice',
  },
  popup: {
    title: 'Maritime Escape',
    description:
      'Three nights with breakfast included and 20% off. Book by 31 August.',
    cta: 'View Offer',
  },
};
