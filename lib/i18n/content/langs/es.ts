import type { SiteContent } from '../types';
import { mergeContent } from './merge';

const room = (
  name: string,
  category: string,
  shortDescription: string,
  description: string,
  view: string,
  amenities: string[]
) => ({ name, category, shortDescription, description, view, amenities });

export const ES_CONTENT: SiteContent = mergeContent({
  amenities: {
    rooftop: { label: 'Rooftop Bar', description: 'Cócteles al atardecer con vista panorámica a la bahía de Inhambane.' },
    lobby: { label: 'Lobby Bar', description: 'Ambiente acogedor con vinos seleccionados y aperitivos de la casa.' },
    gym: { label: 'Gimnasio', description: 'Equipamiento moderno con vista al jardín tropical.' },
  },
  rooms: {
    'suite-capitao': room('Suite Capitán', 'Suite', 'Suite exclusiva con vista al mar y terraza privada.', 'Nuestra suite más exclusiva con vista panorámica al Océano Índico. Inspirada en la historia marítima de Inhambane, combina elegancia colonial con confort contemporáneo. Terraza privada, cama king-size y bañera de hidromasaje.', 'Vista al Mar', ['Wi-Fi', 'Aire acondicionado', 'Mini-bar', 'Caja fuerte', 'Terraza privada', 'Bañera', 'Room service']),
    'quarto-vista-mar': room('Habitación Vista Mar', 'Premium', 'Balcón con vista deslumbrante al mar.', 'Habitación espaciosa con balcón al Océano Índico. Decoración inspirada en los navegantes portugueses. Cama queen-size y baño de mármol.', 'Vista al Mar', ['Wi-Fi', 'Aire acondicionado', 'Mini-bar', 'Caja fuerte', 'Balcón']),
    'quarto-jardim': room('Habitación Jardín', 'Estándar', 'Vista al jardín tropical del hotel.', 'Habitación acogedora con vista a nuestro jardín tropical. Ambiente sereno, ideal tras un día en la playa de Tofo o la bahía de Inhambane.', 'Vista Jardín', ['Wi-Fi', 'Aire acondicionado', 'Caja fuerte', 'Hervidor']),
    'quarto-familiar': room('Habitación Familiar', 'Familia', 'Ideal para familias, con acceso a la piscina.', 'Espacio amplio con dos camas y zona de estar, perfecto para familias. Planta baja con acceso directo a la piscina y restaurante.', 'Vista Piscina', ['Wi-Fi', 'Aire acondicionado', 'Mini-bar', 'Caja fuerte', 'Dos camas', 'Zona de estar']),
    'quarto-economico': room('Habitación Económica', 'Económico', 'Confort esencial a precio accesible.', 'Opción cómoda y asequible para viajeros que buscan calidad sin comprometer el presupuesto.', 'Vista Interior', ['Wi-Fi', 'Aire acondicionado', 'Caja fuerte']),
    'quarto-historico': room('Habitación Histórica', 'Premium', 'Patrimonio histórico con confort moderno.', 'Homenaje a la rica historia marítima de Inhambane. Mobiliario de época restaurado, madera noble y azulejos originales.', 'Vista Ciudad', ['Wi-Fi', 'Aire acondicionado', 'Mini-bar', 'Caja fuerte', 'Decoración histórica']),
  },
  offers: {
    'escapada-maritima': { title: 'Escapada Marítima', description: 'Tres noches con desayuno incluido y paseo en dhow tradicional por la bahía. 20% de descuento en el restaurante.', badge: '-20%' },
    'romance-capitao': { title: 'Romance del Capitán', description: 'Paquete romántico: cena a la luz de las velas, botella de vino y late check-out gratuito.', badge: 'Parejas' },
    'verao-inhambane': { title: 'Verano en Inhambane', description: 'Estancia prolongada: 4 noches por el precio de 3. Incluye traslado del aeropuerto y acceso a piscina y gimnasio.', badge: '4=3' },
    'aventura-tofo': { title: 'Aventura Tofo', description: 'Hotel + buceo con tiburones ballena en Tofo. Incluye transporte, equipo y guía certificado.', badge: 'Aventura' },
  },
  pages: {
    quartos: { title: 'Habitaciones', intro: 'Cada habitación cuenta una historia. Desde la Suite Capitán hasta la Habitación Histórica, encuentre su refugio perfecto en Inhambane.' },
    contacto: { title: 'Contacto', addressLabel: 'Dirección', emailLabel: 'Email', phoneLabel: 'Teléfono', whatsapp: 'WhatsApp', sendMessage: 'Enviar mensaje', name: 'Nombre', email: 'Email', subject: 'Asunto', message: 'Mensaje', namePlaceholder: 'Su nombre', subjectPlaceholder: 'Asunto del mensaje', messagePlaceholder: 'Su mensaje...' },
    oHotel: { title: 'El Hotel', intro: 'En la bahía donde los dhows ancestrales cruzan el horizonte, Casa do Capitão es un refugio que deja hablar al mar.', historyTitle: 'Nuestra Historia', galleryCta: 'Ver Galería', sections: [{ title: 'Una Herencia Marítima', text: 'Casa do Capitão nació de la rica historia marítima de Inhambane. El edificio fue la residencia de un capitán de mar.' }, { title: 'Arquitectura y Alma', text: 'Cada detalle honra la memoria de esta tierra: azulejos originales y vigas de madera de dhows tradicionales.' }, { title: 'El Jardín Tropical', text: 'Nuestro jardín es un oasis de palmeras, flores tropicales y el sonido lejano de las olas.' }], timeline: [{ year: '1534', event: 'Los navegantes portugueses llegan a Inhambane' }, { year: '1854', event: 'Construcción de la residencia que hoy es el hotel' }, { year: '2018', event: 'Restauración y apertura de Casa do Capitão' }, { year: '2024', event: 'Expansión del Rooftop Bar y nuevas suites' }] },
    rooftop: { title: 'Rooftop Bar', tagline: 'Donde el horizonte encuentra la copa', intro: 'Cócteles al atardecer con vista panorámica a la bahía de Inhambane.', cta: 'Reservar mesa' },
    galeria: { title: 'Galería', intro: 'Momentos capturados en Casa do Capitão y la bella bahía de Inhambane.' },
    ofertas: { title: 'Ofertas', intro: 'Paquetes especiales para hacer su estancia aún más memorable.' },
    servicos: { title: 'Servicios', intro: 'Todo lo que necesita para una estancia cómoda e inolvidable.' },
    restaurante: { title: 'Restaurante', intro: 'Sabores de Mozambique con vista al Índico.' },
    sobreNos: { title: 'Sobre Nosotros', intro: 'Nuestra misión es compartir la hospitalidad mozambiqueña con el mundo.' },
    blog: { title: 'Blog', intro: 'Historias, destinos e inspiración para su viaje a Inhambane.' },
    faqs: { title: 'Preguntas Frecuentes', intro: 'Respuestas a las dudas más comunes de nuestros huéspedes.' },
    reservar: { title: 'Reservar', intro: 'Asegure su estancia en Casa do Capitão.' },
    cancelarReserva: { title: 'Cancelar Reserva', intro: 'Introduzca los datos de su reserva para solicitar la cancelación.' },
    pesquisa: { title: 'Búsqueda', intro: 'Resultados de su búsqueda en el sitio.' },
  },
  labels: { area: 'Área', view: 'Vista', capacity: 'Capacidad', price: 'Precio', perNight: '/ noche', amenities: 'Comodidades', people: 'personas', unavailable: 'No disponible', otherRooms: 'Otras habitaciones', freeCancel: 'Cancelación gratuita hasta 48h antes', validUntil: 'Válido hasta' },
  footer: { hotel: 'Hotel', bookings: 'Reservas', info: 'Información', whatsapp: 'WhatsApp', rooms: 'Habitaciones', theHotel: 'El Hotel', rooftop: 'Rooftop', gallery: 'Galería', services: 'Servicios', book: 'Reservar', offers: 'Ofertas', restaurant: 'Restaurante', contact: 'Contacto', blog: 'Blog', about: 'Sobre Nosotros', faqs: 'FAQs', legal: 'Aviso Legal' },
  popup: { title: 'Escapada Marítima', description: 'Tres noches con desayuno incluido y 20% de descuento. Reserve hasta el 31 de agosto.', cta: 'Ver Oferta' },
});
