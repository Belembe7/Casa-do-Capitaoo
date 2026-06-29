-- Casa do Capitão — Supabase Schema
-- Execute no SQL Editor do Supabase: https://supabase.com/dashboard

-- ==============================================
-- PERFIS DE ADMIN
-- ==============================================
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- QUARTOS
-- ==============================================
CREATE TABLE IF NOT EXISTS rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  size_sqm INTEGER,
  max_guests INTEGER DEFAULT 2,
  bed_type TEXT,
  view_type TEXT,
  price_per_night DECIMAL(10,2),
  currency TEXT DEFAULT 'MZN',
  amenities TEXT[],
  images TEXT[],
  cover_image TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- DISPONIBILIDADE
-- ==============================================
CREATE TABLE IF NOT EXISTS room_availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  price_override DECIMAL(10,2),
  notes TEXT,
  UNIQUE(room_id, date)
);

-- ==============================================
-- RESERVAS
-- ==============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_ref TEXT UNIQUE NOT NULL,
  room_id UUID REFERENCES rooms(id),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  guest_nationality TEXT,
  guest_document TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  num_adults INTEGER DEFAULT 1,
  num_children INTEGER DEFAULT 0,
  total_amount DECIMAL(10,2),
  currency TEXT DEFAULT 'MZN',
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending','confirmed','checked_in','checked_out','cancelled','no_show')),
  payment_status TEXT DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid','partial','paid','refunded')),
  payment_method TEXT,
  source TEXT DEFAULT 'direct'
    CHECK (source IN ('direct','booking.com','expedia','phone','email','walk_in')),
  special_requests TEXT,
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- SERVIÇOS
-- ==============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  images TEXT[],
  cover_image TEXT,
  price_from DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  opening_hours JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- OFERTAS
-- ==============================================
CREATE TABLE IF NOT EXISTS offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cover_image TEXT,
  badge TEXT,
  promo_code TEXT,
  discount_percent INTEGER,
  valid_from DATE,
  valid_until DATE,
  applicable_rooms UUID[],
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  booking_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- BLOG
-- ==============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT,
  tags TEXT[],
  author_id UUID REFERENCES admin_profiles(id),
  status TEXT DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- GALERIA
-- ==============================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt_text TEXT,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- CONTACTOS
-- ==============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread'
    CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- NEWSLETTER
-- ==============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  source TEXT DEFAULT 'website',
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- ANALYTICS
-- ==============================================
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  referrer TEXT,
  country TEXT,
  device TEXT,
  session_id TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversion_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  room_id UUID REFERENCES rooms(id),
  offer_id UUID REFERENCES offers(id),
  source TEXT,
  session_id TEXT,
  occurred_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- CONFIGURAÇÕES
-- ==============================================
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO site_settings (key, value) VALUES
  ('hotel_info', '{"name":"Hotel Casa do Capitão","tagline":"Na marginal da Baía de Inhambane","phone":"+258 ...","email":"info@casadocapitao.com","address":"Inhambane, Moçambique"}'),
  ('social_links', '{"facebook":"","instagram":"","whatsapp":""}'),
  ('homepage_popup', '{"enabled":false,"title":"","message":"","image":"","cta_text":"","cta_url":"","delay":3}'),
  ('booking_engine_url', '"https://reservations.casadocapitao.com"'),
  ('maintenance_mode', 'false')
ON CONFLICT (key) DO NOTHING;

-- ==============================================
-- TRIGGERS updated_at
-- ==============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_rooms_updated BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_bookings_updated BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_blog_updated BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_services_updated BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_offers_updated BEFORE UPDATE ON offers FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ==============================================
-- ROW LEVEL SECURITY
-- ==============================================
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;

-- Leitura pública
CREATE POLICY "public_read_rooms" ON rooms FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_blog" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "public_read_gallery" ON gallery_images FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_services" ON services FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_offers" ON offers FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_availability" ON room_availability FOR SELECT USING (TRUE);

-- Inserção pública (formulários)
CREATE POLICY "public_insert_bookings" ON bookings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "public_insert_contacts" ON contact_messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "public_insert_newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "public_insert_pageviews" ON page_views FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "public_insert_conversions" ON conversion_events FOR INSERT WITH CHECK (TRUE);

-- Admin full access
CREATE POLICY "admin_all_rooms" ON rooms FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_blog" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_gallery" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_offers" ON offers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_availability" ON room_availability FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_contacts" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_newsletter" ON newsletter_subscribers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_pageviews" ON page_views FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_conversions" ON conversion_events FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================
-- STORAGE BUCKETS (criar no dashboard ou via API)
-- Buckets: rooms, blog, gallery
-- ==============================================

-- Após criar utilizador em Auth, inserir perfil:
-- INSERT INTO admin_profiles (id, name, role) VALUES ('USER_UUID', 'Admin', 'super_admin');
