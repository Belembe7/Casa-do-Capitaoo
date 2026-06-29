'use client';

import { useAdmin } from './AdminProvider';
import NotificationBell from './NotificationBell';

export default function AdminHeader({ title }: { title?: string }) {
  const { profile } = useAdmin();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[var(--admin-border)] px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-[var(--admin-text)]">{title || 'Painel de Administração'}</h1>
      <div className="flex items-center gap-4">
        <NotificationBell />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--admin-primary)] text-white flex items-center justify-center text-sm font-medium">
            {profile?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{profile?.name || 'Admin'}</p>
            <p className="text-xs text-[var(--admin-text-muted)] capitalize">{profile?.role?.replace('_', ' ') || 'admin'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
