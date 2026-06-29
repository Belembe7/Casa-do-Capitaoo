'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';
import { BOOKING_STATUS_LABELS, PAYMENT_STATUS_LABELS } from '@/lib/admin/constants';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { fetchLocalBookings } from '@/lib/admin/local-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import type { DbBooking } from '@/lib/supabase/types';

export default function ReservaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [booking, setBooking] = useState<DbBooking | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { data } = await supabase.from('bookings').select('*, rooms(name)').eq('id', id).single();
        if (data) {
          setBooking(data as DbBooking);
          setNotes(data.internal_notes || '');
        }
      } else {
        const local = await fetchLocalBookings();
        const found = local.find((b) => b.id === id || b.booking_ref === id);
        if (found) setBooking(found);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const updateStatus = async (status: string) => {
    if (!booking) return;
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from('bookings').update({ status }).eq('id', booking.id);
    } else {
      await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingNumber: booking.booking_ref, status }),
      });
    }
    setBooking({ ...booking, status: status as DbBooking['status'] });
    toast.success('Status atualizado');
  };

  const saveNotes = async () => {
    if (!booking || !isSupabaseConfigured()) {
      toast.success('Notas guardadas');
      return;
    }
    const supabase = createClient();
    await supabase.from('bookings').update({ internal_notes: notes }).eq('id', booking.id);
    toast.success('Notas guardadas');
  };

  if (loading) return <LoadingSkeleton />;
  if (!booking) return <p>Reserva não encontrada</p>;

  const roomName = (booking.rooms as { name?: string })?.name || '—';
  const nights = Math.ceil((new Date(booking.check_out).getTime() - new Date(booking.check_in).getTime()) / 86400000);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">Reserva #{booking.booking_ref}</h2>
          <p className="text-sm text-[var(--admin-text-muted)] mt-1">Criada em {formatDate(booking.created_at)}</p>
        </div>
        <StatusBadge status={booking.status} label={BOOKING_STATUS_LABELS[booking.status]} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="admin-card p-5 space-y-3">
          <h3 className="font-medium text-sm uppercase tracking-wider text-[var(--admin-text-muted)]">Hóspede</h3>
          <p className="font-medium text-lg">{booking.guest_name}</p>
          <p className="text-sm">{booking.guest_email}</p>
          <p className="text-sm">{booking.guest_phone || '—'}</p>
          {booking.guest_document && <p className="text-sm">Doc: {booking.guest_document}</p>}
        </div>

        <div className="admin-card p-5 space-y-3">
          <h3 className="font-medium text-sm uppercase tracking-wider text-[var(--admin-text-muted)]">Estadia</h3>
          <p><strong>Check-in:</strong> {formatDate(booking.check_in)}</p>
          <p><strong>Check-out:</strong> {formatDate(booking.check_out)}</p>
          <p>{nights} noite(s) · {booking.num_adults} adulto(s){booking.num_children ? ` · ${booking.num_children} criança(s)` : ''}</p>
          <p><strong>Quarto:</strong> {roomName}</p>
        </div>

        <div className="admin-card p-5 space-y-3">
          <h3 className="font-medium text-sm uppercase tracking-wider text-[var(--admin-text-muted)]">Pagamento</h3>
          <p><strong>Total:</strong> {formatCurrency(booking.total_amount || 0)}</p>
          <p><StatusBadge status={booking.payment_status} label={PAYMENT_STATUS_LABELS[booking.payment_status]} /></p>
          <p className="text-sm capitalize">Método: {booking.payment_method || '—'}</p>
        </div>

        <div className="admin-card p-5 space-y-3">
          <h3 className="font-medium text-sm uppercase tracking-wider text-[var(--admin-text-muted)]">Histórico</h3>
          <p className="text-sm">{formatDate(booking.created_at)} — Reserva recebida</p>
          {booking.status !== 'pending' && (
            <p className="text-sm">{formatDate(booking.updated_at)} — Status: {BOOKING_STATUS_LABELS[booking.status]}</p>
          )}
        </div>
      </div>

      {booking.special_requests && (
        <div className="admin-card p-5">
          <h3 className="font-medium mb-2">Pedidos especiais</h3>
          <p className="text-sm">{booking.special_requests}</p>
        </div>
      )}

      <div className="admin-card p-5">
        <h3 className="font-medium mb-2">Notas internas</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="admin-input"
          placeholder="Notas visíveis apenas para a equipa..."
        />
        <button type="button" onClick={saveNotes} className="admin-btn-primary mt-3">Guardar notas</button>
      </div>

      <div className="flex flex-wrap gap-3">
        {booking.status === 'pending' && (
          <button type="button" onClick={() => updateStatus('confirmed')} className="admin-btn-primary">Confirmar</button>
        )}
        {booking.status === 'confirmed' && (
          <button type="button" onClick={() => updateStatus('checked_in')} className="admin-btn-primary">Check-in</button>
        )}
        {booking.status === 'checked_in' && (
          <button type="button" onClick={() => updateStatus('checked_out')} className="admin-btn-secondary">Check-out</button>
        )}
        {booking.status !== 'cancelled' && (
          <button type="button" onClick={() => updateStatus('cancelled')} className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50">
            Cancelar
          </button>
        )}
        <button type="button" onClick={() => router.push('/admin/reservas')} className="admin-btn-secondary">Voltar</button>
      </div>
    </div>
  );
}
