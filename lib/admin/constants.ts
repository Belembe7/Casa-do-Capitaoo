import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  ConciergeBell,
  Tag,
  FileText,
  Images,
  Mail,
  Users,
  BarChart3,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import type { AdminRole } from '@/lib/supabase/types';

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badgeKey?: 'contacts' | 'bookings';
  roles?: AdminRole[];
}

export const ADMIN_NAV: AdminNavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/reservas', label: 'Reservas', icon: CalendarCheck, badgeKey: 'bookings', roles: ['super_admin', 'admin'] },
  { href: '/admin/quartos', label: 'Quartos', icon: BedDouble, roles: ['super_admin', 'admin'] },
  { href: '/admin/servicos', label: 'Serviços', icon: ConciergeBell },
  { href: '/admin/ofertas', label: 'Ofertas', icon: Tag },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/galeria', label: 'Galeria', icon: Images },
  { href: '/admin/contactos', label: 'Contactos', icon: Mail, badgeKey: 'contacts' },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Users, roles: ['super_admin', 'admin'] },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, roles: ['super_admin', 'admin'] },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings, roles: ['super_admin'] },
];

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmada',
  checked_in: 'Check-in',
  checked_out: 'Check-out',
  cancelled: 'Cancelada',
  no_show: 'No-show',
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  unpaid: 'Não pago',
  partial: 'Parcial',
  paid: 'Pago',
  refunded: 'Reembolsado',
};

export const AMENITIES = [
  'wifi', 'ac', 'minibar', 'tv', 'safe', 'balcony', 'jacuzzi', 'room_service',
];

export const AMENITY_LABELS: Record<string, string> = {
  wifi: 'WiFi',
  ac: 'Ar condicionado',
  minibar: 'Minibar',
  tv: 'TV',
  safe: 'Cofre',
  balcony: 'Varanda',
  jacuzzi: 'Jacuzzi',
  room_service: 'Room service',
};

export const GALLERY_CATEGORIES = [
  'rooms', 'restaurant', 'exterior', 'rooftop', 'pool', 'events',
];

export const GALLERY_CATEGORY_LABELS: Record<string, string> = {
  rooms: 'Quartos',
  restaurant: 'Restaurante',
  exterior: 'Exterior',
  rooftop: 'Rooftop',
  pool: 'Piscina',
  events: 'Eventos',
  all: 'Todos',
};
