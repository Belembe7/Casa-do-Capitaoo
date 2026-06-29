'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bell } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { useAdmin } from './AdminProvider';
import RealtimeBadge from './ui/RealtimeBadge';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';

interface Notification {
  id: string;
  type: string;
  message: string;
  link: string;
  createdAt: string;
}

export default function NotificationBell() {
  const { profile } = useAdmin();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((n: Notification) => {
    setNotifications((prev) => [n, ...prev].slice(0, 20));
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const supabase = createClient();
    const channel = supabase
      .channel('admin-notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, (payload) => {
        const b = payload.new as { id: string; guest_name: string };
        const n: Notification = {
          id: b.id,
          type: 'booking',
          message: `Nova reserva de ${b.guest_name}`,
          link: `/admin/reservas/${b.id}`,
          createdAt: new Date().toISOString(),
        };
        addNotification(n);
        toast.success(n.message);
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'contact_messages' }, (payload) => {
        const c = payload.new as { id: string; name: string; subject: string | null };
        const n: Notification = {
          id: c.id,
          type: 'contact',
          message: `Mensagem de ${c.name}: ${c.subject || 'Sem assunto'}`,
          link: '/admin/contactos',
          createdAt: new Date().toISOString(),
        };
        addNotification(n);
        toast(n.message, { icon: '📧' });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [addNotification]);

  const unread = notifications.length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-md hover:bg-slate-100 transition-colors"
      >
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 admin-card shadow-xl z-50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--admin-border)]">
              <span className="font-medium text-sm">Notificações</span>
              <RealtimeBadge />
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-sm text-[var(--admin-text-muted)] p-4 text-center">Sem notificações</p>
              ) : (
                notifications.map((n) => (
                  <Link
                    key={n.id + n.createdAt}
                    href={n.link}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 hover:bg-slate-50 border-b border-[var(--admin-border)] last:border-0"
                  >
                    <p className="text-sm">{n.message}</p>
                    <p className="text-xs text-[var(--admin-text-muted)] mt-1">
                      {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true, locale: pt })}
                    </p>
                  </Link>
                ))
              )}
            </div>
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={() => setNotifications([])}
                className="w-full text-xs text-center py-2 text-[var(--admin-primary)] hover:bg-slate-50 border-t border-[var(--admin-border)]"
              >
                Marcar todas como lidas
              </button>
            )}
          </div>
        </>
      )}

      {profile && (
        <span className="sr-only">Notificações para {profile.name}</span>
      )}
    </div>
  );
}
