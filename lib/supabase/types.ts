export type AdminRole = 'super_admin' | 'admin' | 'editor';

export interface AdminProfile {
  id: string;
  name: string;
  role: AdminRole;
  avatar_url: string | null;
  created_at: string;
}

export interface DbRoom {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  size_sqm: number | null;
  max_guests: number;
  bed_type: string | null;
  view_type: string | null;
  price_per_night: number | null;
  currency: string;
  amenities: string[];
  images: string[];
  cover_image: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbBooking {
  id: string;
  booking_ref: string;
  room_id: string | null;
  guest_name: string;
  guest_email: string;
  guest_phone: string | null;
  guest_nationality: string | null;
  guest_document: string | null;
  check_in: string;
  check_out: string;
  num_adults: number;
  num_children: number;
  total_amount: number | null;
  currency: string;
  status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show';
  payment_status: 'unpaid' | 'partial' | 'paid' | 'refunded';
  payment_method: string | null;
  source: string;
  special_requests: string | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
  rooms?: DbRoom;
}

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  category: string | null;
  tags: string[];
  author_id: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface DbOffer {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  cover_image: string | null;
  badge: string | null;
  promo_code: string | null;
  discount_percent: number | null;
  valid_from: string | null;
  valid_until: string | null;
  applicable_rooms: string[];
  is_active: boolean;
  is_featured: boolean;
  booking_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbService {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  description: string | null;
  images: string[];
  cover_image: string | null;
  price_from: number | null;
  is_active: boolean;
  display_order: number;
  opening_hours: Record<string, string> | null;
  created_at: string;
  updated_at: string;
}

export interface DbGalleryImage {
  id: string;
  url: string;
  alt_text: string | null;
  category: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface DbContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  replied_at: string | null;
  created_at: string;
}

export interface DbNewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  is_active: boolean;
  source: string;
  subscribed_at: string;
}

export interface DbRoomAvailability {
  id: string;
  room_id: string;
  date: string;
  is_available: boolean;
  price_override: number | null;
  notes: string | null;
}

export interface DbPageView {
  id: string;
  page: string;
  referrer: string | null;
  country: string | null;
  device: string | null;
  session_id: string | null;
  viewed_at: string;
}

export interface DbSiteSetting {
  key: string;
  value: unknown;
  updated_at: string;
}
