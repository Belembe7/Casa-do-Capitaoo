export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number, locale = 'pt-MZ'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'MZN',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date, locale = 'pt-PT'): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function generateBookingNumber(): string {
  const prefix = 'CC';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const HOTEL_INFO = {
  name: 'Casa do Capitão',
  tagline: 'Hotel Boutique em Inhambane',
  address: 'Av. Maguiguane, Bairro Balane 1, Inhambane, Moçambique',
  email: 'reservations@hotelcasadocapitao.co.mz',
  reservationsEmail: 'reservations@hotelcasadocapitao.co.mz',
  landline: '+258 29321408/9',
  landlineTel: '+25829321408',
  phone: '+258 840262302',
  phoneTel: '+258840262302',
  whatsapp: '258840262302',
  coordinates: { lat: -23.865, lng: 35.383 },
  mapsUrl:
    'https://maps.google.com/?q=Av.+Maguiguane,+Bairro+Balane+1,+Inhambane,+Mo%C3%A7ambique',
  bookingEngineUrl: 'https://booking.casadocapitao.co.mz',
  social: {
    facebook: 'https://facebook.com/casadocapitao',
    instagram: 'https://instagram.com/casadocapitao',
    linkedin: 'https://linkedin.com/company/casadocapitao',
    youtube: 'https://youtube.com/casadocapitao',
    tiktok: 'https://tiktok.com/@casadocapitao',
  },
  shopUrl: 'https://loja.casadocapitao.co.mz',
};
