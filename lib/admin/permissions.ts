import type { AdminRole } from '@/lib/supabase/types';
import { ADMIN_NAV } from './constants';

export function canAccess(role: AdminRole | null, required?: AdminRole[]) {
  if (!required || required.length === 0) return true;
  if (!role) return false;
  if (role === 'super_admin') return true;
  return required.includes(role);
}

export function getNavForRole(role: AdminRole | null) {
  return ADMIN_NAV.filter((item) => canAccess(role, item.roles));
}
