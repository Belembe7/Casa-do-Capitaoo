import type { SiteContent } from './types';

export const PT_CONTENT: SiteContent = {
  amenities: {
    rooftop: {
      label: 'Rooftop Bar',
      description:
        'Pequeno-almoço à beira da piscina com vista para a baía e serviço personalizado de estilo "5 estrelas".',
    },
    lobby: {
      label: 'Sala de Conferências',
      description:
        'Espaço elegante e equipado para reuniões corporativas, apresentações e eventos de negócios com vista para a baía.',
    },
    gym: {
      label: 'Salão',
      description:
        'Salão versátil para eventos sociais, celebrações e encontros num ambiente refinado e acolhedor.',
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
        'Há mais de um século, este era o lugar de onde o Capitão do Porto observava a Baía de Inhambane e orientava as embarcações que chegavam à cidade. Hoje, esse mesmo cenário recebe viajantes de todo o mundo, preservando a sua herança marítima enquanto oferece uma experiência de hospitalidade contemporânea.',
      sections: [
        {
          title: 'Pequeno-almoço à Beira da Piscina',
          text: 'Comece o dia com um pequeno-almoço servido à beira da piscina, com vista para a baía de Inhambane. O nosso serviço personalizado de estilo "5 estrelas" transforma cada manhã num momento de calma, sabor e exclusividade.',
        },
        {
          title: 'Restaurante com Vista para o Mar',
          text: 'O Restaurante Capitão convida a saborear a cozinha moçambicana num ambiente elegante e luminoso. Mesas postas com vista para o Oceano Índico, luz natural abundante e o ritmo sereno da baía como pano de fundo de cada refeição.',
        },
        {
          title: 'Vista da Baía de Inhambane',
          text: 'A Baía de Inhambane revela-se em todo o seu esplendor diante do hotel: um panorama amplo, luminoso e sereno, onde o mar e o céu se encontram num dos cenários mais emblemáticos de Moçambique.',
        },
      ],
      historyTitle: 'A Nossa História',
      timeline: [
        { year: 'Antes de 1885', event: 'Residência oficial do Capitão do Porto, voltada para a Baía de Inhambane.' },
        { year: '1918', event: 'O edifício torna-se o Clube Comodoro, espaço de convívio para oficiais da marinha.' },
        { year: '2007', event: 'Inicia-se a reabilitação do património para um novo capítulo da sua história.' },
        { year: '2010', event: 'Nasce o Hotel Casa do Capitão, preservando o legado histórico com hospitalidade contemporânea.' },
        { year: 'Hoje', event: 'Um dos hotéis de referência em Inhambane, onde história, conforto e a beleza da baía se encontram.' },
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
