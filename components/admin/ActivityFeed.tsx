'use client';

import { useEffect, useState } from 'react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import RealtimeBadge from './ui/RealtimeBadge';

interface ActivityItem {
  id: string;
  icon: string;
  message: string;
  time: string;
}

export default function ActivityFeed() {
  const [items, setItems] = useState<ActivityItem[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setItems([
        { id: '1', icon: '🟢', message: 'Sistema em modo local (configure Supabase)', time: new Date().toISOString() },
      ]);
      return;
    }

    const supabase = createClient();

    const loadRecent = async () => {
      const [bookings, contacts] = await Promise.all([
        supabase.from('bookings').select('id, guest_name, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('contact_messages').select('id, name, created_at').order('created_at', { ascending: false }).limit(3),
      ]);

      const activity: ActivityItem[] = [
        ...(bookings.data || []).map((b) => ({
          id: b.id,
          icon: '🟢',
          message: `Nova reserva — ${b.guest_name}`,
          time: b.created_at,
        })),
        ...(contacts.data || []).map((c) => ({
          id: c.id,
          icon: '📧',
          message: `Mensagem de contacto — ${c.name}`,
          time: c.created_at,
        })),
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 8);

      setItems(activity);
    };

    loadRecent();

    const channel = supabase
      .channel('realtime-activity')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, (payload) => {
        const b = payload.new as { id: string; guest_name: string; created_at: string };
        setItems((prev) => [{
          id: b.id,
          icon: '🟢',
          message: `Nova reserva — ${b.guest_name}`,
          time: b.created_at || new Date().toISOString(),
        }, ...prev].slice(0, 8));
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'contact_messages' }, (payload) => {
        const c = payload.new as { id: string; name: string; created_at: string };
        setItems((prev) => [{
          id: c.id,
          icon: '📧',
          message: `Mensagem — ${c.name}`,
          time: c.created_at || new Date().toISOString(),
        }, ...prev].slice(0, 8));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="admin-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Actividade em tempo real</h3>
        <RealtimeBadge />
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id + item.time} className="flex gap-3 text-sm">
            <span>{item.icon}</span>
            <div>
              <p>{item.message}</p>
              <p className="text-xs text-[var(--admin-text-muted)]">
                {formatDistanceToNow(new Date(item.time), { addSuffix: true, locale: pt })}
              </p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-[var(--admin-text-muted)]">Sem actividade recente</p>
        )}
      </div>
    </div>
  );
}
