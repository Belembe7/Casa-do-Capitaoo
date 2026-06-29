'use client';

import { useEffect, useState } from 'react';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import type { DbService } from '@/lib/supabase/types';
import { services as staticServices } from '@/lib/data/content';

export default function ServicosPage() {
  const [services, setServices] = useState<DbService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { data } = await supabase.from('services').select('*').order('display_order');
        setServices((data || []) as DbService[]);
      } else {
        setServices(staticServices.map((s, i) => ({
          id: s.title.toLowerCase().replace(/\s+/g, '-'),
          slug: s.title.toLowerCase().replace(/\s+/g, '-'),
          name: s.title,
          category: 'other',
          description: s.description,
          images: [],
          cover_image: null,
          price_from: null,
          is_active: true,
          display_order: i,
          opening_hours: null,
          created_at: '',
          updated_at: '',
        })));
      }
      setLoading(false);
    }
    load();
  }, []);

  const toggleActive = async (svc: DbService) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from('services').update({ is_active: !svc.is_active }).eq('id', svc.id);
    }
    setServices(services.map((s) => s.id === svc.id ? { ...s, is_active: !s.is_active } : s));
    toast.success('Serviço actualizado');
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Gestão de Serviços</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.id} className="admin-card p-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-wider text-[var(--admin-text-muted)]">{s.category}</span>
                <h3 className="font-medium mt-1">{s.name}</h3>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${s.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {s.is_active ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <p className="text-sm text-[var(--admin-text-muted)] mt-2 line-clamp-2">{s.description}</p>
            <button type="button" onClick={() => toggleActive(s)} className="text-sm text-[var(--admin-primary)] mt-3 hover:underline">
              {s.is_active ? 'Desactivar' : 'Activar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
