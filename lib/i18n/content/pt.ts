import type { SiteContent } from './types';

export const PT_CONTENT: SiteContent = {
  amenities: {
    rooftop: {
      label: 'Rooftop Bar',
      description: 'Cocktails ao pôr do sol com vista panorâmica para a baía de Inhambane.',
    },
    lobby: {
      label: 'Lobby Bar',
      description: 'Ambiente acolhedor com vinhos selecionados e petiscos da casa.',
    },
    gym: {
      label: 'Ginásio',
      description: 'Equipamento moderno com vista para o jardim tropical.',
    },
  },
  rooms: {
    'suite-capitao': {
      name: 'Suite Capitão',
      category: 'Suite',
      shortDescription: 'Suite exclusiva com vista para o mar e terraço privado.',
      description:
        'A nossa suite mais exclusiva, com vista panorâmica para o Oceano Índico. Inspirada na história marítima de Inhambane, combina elegância colonial com conforto contemporâneo. Terraço privado, cama king-size e banheira de hidromassagem.',
      view: 'Vista Mar',
      amenities: ['Wi-Fi', 'Ar condicionado', 'Mini-bar', 'Cofre', 'Terraço privado', 'Banheira', 'Room service'],
    },
    'quarto-vista-mar': {
      name: 'Quarto Vista Mar',
      category: 'Premium',
      shortDescription: 'Varanda com vista deslumbrante para o mar.',
      description:
        'Quarto espaçoso com varanda voltada para o Oceano Índico. Decoração inspirada nos navegadores portugueses que atracaram em Inhambane. Cama queen-size e casa de banho em mármore.',
      view: 'Vista Mar',
      amenities: ['Wi-Fi', 'Ar condicionado', 'Mini-bar', 'Cofre', 'Varanda'],
    },
    'quarto-jardim': {
      name: 'Quarto Jardim',
      category: 'Standard',
      shortDescription: 'Vista para o jardim tropical do hotel.',
      description:
        'Quarto acolhedor com vista para o nosso jardim tropical. Ambiente sereno e fresco, ideal para quem procura tranquilidade após um dia na praia de Tofo ou na baía de Inhambane.',
      view: 'Vista Jardim',
      amenities: ['Wi-Fi', 'Ar condicionado', 'Cofre', 'Chaleira'],
    },
    'quarto-familiar': {
      name: 'Quarto Familiar',
      category: 'Família',
      shortDescription: 'Ideal para famílias, com acesso à piscina.',
      description:
        'Espaço amplo com duas camas e área de estar, perfeito para famílias. Localizado no piso térreo com acesso direto à piscina e ao restaurante.',
      view: 'Vista Piscina',
      amenities: ['Wi-Fi', 'Ar condicionado', 'Mini-bar', 'Cofre', 'Duas camas', 'Área de estar'],
    },
    'quarto-economico': {
      name: 'Quarto Económico',
      category: 'Económico',
      shortDescription: 'Conforto essencial a preço acessível.',
      description:
        'Opção confortável e acessível para viajantes que procuram qualidade sem comprometer o orçamento. Decoração simples e elegante com todos os essenciais.',
      view: 'Vista Interior',
      amenities: ['Wi-Fi', 'Ar condicionado', 'Cofre'],
    },
    'quarto-historico': {
      name: 'Quarto Histórico',
      category: 'Premium',
      shortDescription: 'Património histórico com conforto moderno.',
      description:
        'Homenagem à rica história marítima de Inhambane. Mobiliário de época restaurado, detalhes em madeira nobre e azulejos originais. Uma viagem no tempo com todo o conforto moderno.',
      view: 'Vista Cidade',
      amenities: ['Wi-Fi', 'Ar condicionado', 'Mini-bar', 'Cofre', 'Decoração histórica'],
    },
  },
  offers: {
    'escapada-maritima': {
      title: 'Escapada Marítima',
      description:
        'Três noites com pequeno-almoço incluído e passeio de dhow tradicional pela baía de Inhambane. Desconto de 20% em todas as refeições no restaurante.',
      badge: '-20%',
    },
    'romance-capitao': {
      title: 'Romance do Capitão',
      description:
        'Pacote romântico para casais: jantar à luz de velas no terraço, garrafa de vinho e late check-out gratuito. Perfeito para lua de mel ou aniversário.',
      badge: 'Casais',
    },
    'verao-inhambane': {
      title: 'Verão em Inhambane',
      description:
        'Estadia prolongada com 4 noites pelo preço de 3. Inclui transfer do aeroporto e acesso gratuito à piscina e ginásio.',
      badge: '4=3',
    },
    'aventura-tofo': {
      title: 'Aventura Tofo',
      description:
        'Combinação hotel + mergulho com tubarões-baleia em Tofo. Inclui transporte, equipamento e guia certificado.',
      badge: 'Aventura',
    },
  },
  pages: {
    quartos: {
      title: 'Quartos',
      intro:
        'Cada quarto conta uma história. Da Suite Capitão com vista panorâmica ao Quarto Histórico com azulejos originais, encontre o seu refúgio perfeito em Inhambane.',
    },
    contacto: {
      title: 'Contacto',
      addressLabel: 'Morada',
      emailLabel: 'Email',
      phoneLabel: 'Telefone',
      whatsapp: 'WhatsApp',
      sendMessage: 'Enviar mensagem',
      name: 'Nome',
      email: 'Email',
      subject: 'Assunto',
      message: 'Mensagem',
      namePlaceholder: 'O seu nome',
      subjectPlaceholder: 'Assunto da mensagem',
      messagePlaceholder: 'A sua mensagem...',
    },
    oHotel: {
      title: 'O Hotel',
      intro:
        'Na baía onde os dhows ancestrais ainda cruzam o horizonte, a Casa do Capitão é um refúgio que não procura chamar a atenção. Deixa que fale o mar.',
      sections: [
        {
          title: 'Uma Herança Marítima',
          text: 'A Casa do Capitão nasceu da rica história marítima de Inhambane. O edifício que hoje abriga o nosso hotel foi outrora a residência de um capitão de mar que comandava as embarcações que cruzavam o Índico entre África, Ásia e Europa.',
        },
        {
          title: 'Arquitectura e Alma',
          text: 'Cada detalhe honra a memória desta terra: dos azulejos originais às vigas de madeira recuperadas dos dhows tradicionais. Combinamos património histórico com conforto contemporâneo para criar um refúgio único na baía de Inhambane.',
        },
        {
          title: 'O Jardim Tropical',
          text: 'O nosso jardim é um oásis de palmeiras, flores tropicais e o som distante das ondas. Um espaço para contemplar, ler um livro à sombra ou simplesmente deixar o tempo passar.',
        },
      ],
      historyTitle: 'A Nossa História',
      timeline: [
        { year: '1534', event: 'Navegadores portugueses chegam a Inhambane' },
        { year: '1854', event: 'Construção da residência que hoje é o hotel' },
        { year: '2018', event: 'Restauração e abertura da Casa do Capitão' },
        { year: '2024', event: 'Expansão do Rooftop Bar e novas suites' },
      ],
      galleryCta: 'Ver Galeria',
    },
    rooftop: {
      title: 'Rooftop Bar',
      tagline: 'Onde o horizonte encontra o copo',
      intro:
        'Cocktails ao pôr do sol com vista panorâmica para a baía de Inhambane. O nosso rooftop é o lugar perfeito para celebrar o fim do dia.',
      cta: 'Reservar mesa',
    },
    galeria: {
      title: 'Galeria',
      intro: 'Momentos capturados na Casa do Capitão e na bela baía de Inhambane.',
    },
    ofertas: {
      title: 'Ofertas',
      intro: 'Pacotes especiais para tornar a sua estadia ainda mais memorável.',
    },
    servicos: {
      title: 'Serviços',
      intro: 'Tudo o que precisa para uma estadia confortável e inesquecível.',
    },
    restaurante: {
      title: 'Restaurante',
      intro: 'Sabores de Moçambique com vista para o Índico.',
    },
    sobreNos: {
      title: 'Sobre Nós',
      intro: 'A nossa missão é partilhar a hospitalidade moçambicana com o mundo.',
    },
    blog: {
      title: 'Blog',
      intro: 'Histórias, destinos e inspiração para a sua viagem a Inhambane.',
    },
    faqs: {
      title: 'Perguntas Frequentes',
      intro: 'Respostas às dúvidas mais comuns dos nossos hóspedes.',
    },
    reservar: {
      title: 'Reservar',
      intro: 'Garanta a sua estadia na Casa do Capitão.',
    },
    cancelarReserva: {
      title: 'Cancelar Reserva',
      intro: 'Introduza os dados da sua reserva para solicitar o cancelamento.',
    },
    pesquisa: {
      title: 'Pesquisa',
      intro: 'Resultados da sua pesquisa no site.',
    },
  },
  labels: {
    area: 'Área',
    view: 'Vista',
    capacity: 'Capacidade',
    price: 'Preço',
    perNight: '/ noite',
    amenities: 'Comodidades',
    people: 'pessoas',
    unavailable: 'Indisponível',
    otherRooms: 'Outros quartos',
    freeCancel: 'Cancelamento gratuito até 48h antes',
    validUntil: 'Válido até',
  },
  footer: {
    hotel: 'Hotel',
    bookings: 'Reservas',
    info: 'Informação',
    whatsapp: 'WhatsApp',
    rooms: 'Quartos',
    theHotel: 'O Hotel',
    rooftop: 'Rooftop',
    gallery: 'Galeria',
    services: 'Serviços',
    book: 'Reservar',
    offers: 'Ofertas',
    restaurant: 'Restaurante',
    contact: 'Contacto',
    blog: 'Blog',
    about: 'Sobre Nós',
    faqs: 'FAQs',
    legal: 'Aviso Legal',
  },
  popup: {
    title: 'Escapada Marítima',
    description:
      'Três noites com pequeno-almoço incluído e 20% de desconto. Reserve até 31 de Agosto.',
    cta: 'Ver Oferta',
  },
};
