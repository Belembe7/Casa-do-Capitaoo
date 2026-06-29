'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pencil, Calendar, GripVertical } from 'lucide-react';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';
import EmptyState from '@/components/admin/ui/EmptyState';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { getLocalRooms } from '@/lib/admin/local-data';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';
import type { DbRoom } from '@/lib/supabase/types';

export default function QuartosPage() {
  const [rooms, setRooms] = useState<DbRoom[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { data } = await supabase.from('rooms').select('*').order('display_order');
      setRooms((data || []) as DbRoom[]);
    } else {
      setRooms(getLocalRooms());
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleActive = async (room: DbRoom) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from('rooms').update({ is_active: !room.is_active }).eq('id', room.id);
    }
    setRooms(rooms.map((r) => r.id === room.id ? { ...r, is_active: !r.is_active } : r));
    toast.success(room.is_active ? 'Quarto desactivado' : 'Quarto activado');
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Gestão de Quartos</h2>
        <div className="flex gap-3">
          <Link href="/admin/quartos/disponibilidade" className="admin-btn-secondary">
            <Calendar size={16} /> Disponibilidade
          </Link>
        </div>
      </div>

      {rooms.length === 0 ? (
        <EmptyState title="Nenhum quarto" description="Adicione quartos no Supabase ou configure a base de dados." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div key={room.id} className="admin-card overflow-hidden">
              <div className="aspect-video bg-slate-200 relative">
                {room.cover_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={room.cover_image} alt={room.name} className="w-full h-full object-cover" />
                )}
                <span className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full ${room.is_active ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>
                  {room.is_active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{room.name}</h3>
                    <p className="text-sm text-[var(--admin-text-muted)]">{formatCurrency(room.price_per_night || 0)}/noite</p>
                  </div>
                  <GripVertical size={16} className="text-slate-300" />
                </div>
                <p className="text-xs text-[var(--admin-text-muted)] mt-2 line-clamp-2">{room.short_description}</p>
                <div className="flex items-center justify-between mt-4">
                  <button type="button" onClick={() => toggleActive(room)} className="text-xs text-[var(--admin-primary)] hover:underline">
                    {room.is_active ? 'Desactivar' : 'Activar'}
                  </button>
                  <Link href={`/admin/quartos/${room.id}/editar`} className="admin-btn-secondary text-xs py-1.5">
                    <Pencil size={14} /> Editar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
