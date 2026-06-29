'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Eye, Check, X } from 'lucide-react';
import SearchInput from '@/components/admin/ui/SearchInput';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';
import EmptyState from '@/components/admin/ui/EmptyState';
import ConfirmModal from '@/components/admin/ui/ConfirmModal';
import { BOOKING_STATUS_LABELS } from '@/lib/admin/constants';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { fetchLocalBookings } from '@/lib/admin/local-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import type { DbBooking } from '@/lib/supabase/types';

const STATUS_FILTERS = ['all', 'pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'];

export default function ReservasPage() {
  const [bookings, setBookings] = useState<DbBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [cancelId, setCancelId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { data } = await supabase.from('bookings').select('*, rooms(name)').order('created_at', { ascending: false });
      setBookings((data || []) as DbBooking[]);
    } else {
      const local = await fetchLocalBookings();
      setBookings(local);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: string, bookingRef?: string) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from('bookings').update({ status }).eq('id', id);
    } else if (bookingRef) {
      await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingNumber: bookingRef, status: status === 'confirmed' ? 'confirmed' : status }),
      });
    }
    toast.success('Status atualizado');
    load();
  };

  const filtered = bookings.filter((b) => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return b.guest_name.toLowerCase().includes(q) || b.booking_ref.toLowerCase().includes(q);
    }
    return true;
  });

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Gestão de Reservas</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
              filter === s ? 'bg-[var(--admin-primary)] text-white border-transparent' : 'border-[var(--admin-border)] hover:bg-slate-50'
            }`}
          >
            {s === 'all' ? 'Todas' : BOOKING_STATUS_LABELS[s] || s}
          </button>
        ))}
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Pesquisar hóspede ou referência..." />

      {filtered.length === 0 ? (
        <EmptyState title="Nenhuma reserva encontrada" />
      ) : (
        <div className="admin-card overflow-x-auto">
          <table className="admin-table w-full">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Hóspede</th>
                <th>Quarto</th>
                <th>Datas</th>
                <th>Valor</th>
                <th>Fonte</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td className="font-mono text-xs">{b.booking_ref}</td>
                  <td>
                    <p className="font-medium">{b.guest_name}</p>
                    <p className="text-xs text-[var(--admin-text-muted)]">{b.guest_email}</p>
                  </td>
                  <td>{(b.rooms as { name?: string })?.name || '—'}</td>
                  <td className="text-xs">
                    {formatDate(b.check_in)} — {formatDate(b.check_out)}
                  </td>
                  <td>{formatCurrency(b.total_amount || 0)}</td>
                  <td className="capitalize text-xs">{b.source}</td>
                  <td><StatusBadge status={b.status} label={BOOKING_STATUS_LABELS[b.status]} /></td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Link href={`/admin/reservas/${b.id}`} className="p-1.5 hover:bg-slate-100 rounded" title="Ver">
                        <Eye size={16} />
                      </Link>
                      {b.status === 'pending' && (
                        <button type="button" onClick={() => updateStatus(b.id, 'confirmed', b.booking_ref)} className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded" title="Confirmar">
                          <Check size={16} />
                        </button>
                      )}
                      {b.status !== 'cancelled' && (
                        <button type="button" onClick={() => setCancelId(b.id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded" title="Cancelar">
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        open={!!cancelId}
        title="Cancelar reserva"
        message="Tem a certeza que deseja cancelar esta reserva?"
        confirmLabel="Cancelar reserva"
        destructive
        onCancel={() => setCancelId(null)}
        onConfirm={() => {
          const b = bookings.find((x) => x.id === cancelId);
          if (b) updateStatus(b.id, 'cancelled', b.booking_ref);
          setCancelId(null);
        }}
      />
    </div>
  );
}
