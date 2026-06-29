import { rooms as staticRooms } from '@/lib/data/rooms';
import { blogPosts } from '@/lib/data/blog-posts';
import { offers as staticOffers } from '@/lib/data/offers';
import type { DbRoom, DbBlogPost, DbOffer, DbBooking } from '@/lib/supabase/types';

interface LocalBooking {
  id: string;
  bookingNumber: string;
  name: string;
  email: string;
  phone: string;
  roomSlug: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  specialRequests?: string;
  createdAt: string;
}

export function getLocalRooms() {
  return staticRooms.map((r, i) => ({
    id: r.slug,
    slug: r.slug,
    name: r.name,
    short_description: r.shortDescription,
    description: r.description,
    size_sqm: r.size,
    max_guests: r.capacity,
    bed_type: 'double',
    view_type: r.view,
    price_per_night: r.pricePerNight,
    currency: 'MZN',
    amenities: r.amenities,
    images: r.images,
    cover_image: r.images[0],
    is_active: r.available,
    display_order: i,
    created_at: '',
    updated_at: '',
  })) as DbRoom[];
}

export function getLocalBlogPosts() {
  return blogPosts.map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    cover_image: p.coverImage,
    category: p.category,
    tags: [] as string[],
    author_id: null,
    status: 'published' as const,
    published_at: p.publishedAt,
    seo_title: p.title,
    seo_description: p.excerpt,
    view_count: 0,
    created_at: p.publishedAt,
    updated_at: p.publishedAt,
  })) as DbBlogPost[];
}

export function getLocalOffers() {
  return staticOffers.map((o) => ({
    id: o.slug,
    slug: o.slug,
    title: o.title,
    subtitle: null,
    description: o.description,
    cover_image: o.image,
    badge: o.badge,
    promo_code: null,
    discount_percent: null,
    valid_from: null,
    valid_until: o.validUntil || null,
    applicable_rooms: [] as string[],
    is_active: true,
    is_featured: false,
    booking_url: o.bookingUrl,
    created_at: '',
    updated_at: '',
  })) as DbOffer[];
}

export function mapLocalBooking(b: LocalBooking): DbBooking {
  return {
    id: b.id,
    booking_ref: b.bookingNumber,
    room_id: b.roomSlug,
    guest_name: b.name,
    guest_email: b.email,
    guest_phone: b.phone,
    guest_nationality: null,
    guest_document: null,
    check_in: b.checkIn,
    check_out: b.checkOut,
    num_adults: b.guests,
    num_children: 0,
    total_amount: b.totalAmount,
    currency: 'MZN',
    status: b.status === 'paid' ? 'confirmed' : b.status === 'cancelled' ? 'cancelled' : b.status as DbBooking['status'],
    payment_status: b.status === 'paid' ? 'paid' : 'unpaid',
    payment_method: b.paymentMethod,
    source: 'direct',
    special_requests: b.specialRequests || null,
    internal_notes: null,
    created_at: b.createdAt,
    updated_at: b.createdAt,
    rooms: { name: b.roomName } as DbRoom,
  };
}

export async function fetchLocalBookings(): Promise<DbBooking[]> {
  const res = await fetch('/api/bookings');
  const data = await res.json();
  const list = Array.isArray(data) ? data : data.bookings || [];
  return list.map((b: LocalBooking) => mapLocalBooking(b));
}

export async function fetchLocalContacts() {
  const res = await fetch('/api/admin/contacts');
  if (!res.ok) return [];
  return res.json();
}

export async function fetchLocalNewsletter() {
  const res = await fetch('/api/admin/newsletter');
  if (!res.ok) return [];
  return res.json();
}
