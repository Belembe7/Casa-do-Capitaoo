'use client';

import { useEffect, useState } from 'react';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { getLocalOffers } from '@/lib/admin/local-data';
import toast from 'react-hot-toast';
import type { DbOffer } from '@/lib/supabase/types';
import { formatDate } from '@/lib/utils';

export default function OfertasPage() {
  const [offers, setOffers] = useState<DbOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { data } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
        setOffers((data || []) as DbOffer[]);
      } else {
        setOffers(getLocalOffers());
      }
      setLoading(false);
    }
    load();
  }, []);

  const toggleActive = async (offer: DbOffer) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from('offers').update({ is_active: !offer.is_active }).eq('id', offer.id);
    }
    setOffers(offers.map((o) => o.id === offer.id ? { ...o, is_active: !o.is_active } : o));
    toast.success('Oferta actualizada');
  };

  const getOfferState = (o: DbOffer) => {
    const now = new Date();
    if (!o.is_active) return 'inactive';
    if (o.valid_until && new Date(o.valid_until) < now) return 'expired';
    if (o.valid_from && new Date(o.valid_from) > now) return 'scheduled';
    return 'active';
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Gestão de Ofertas</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {offers.map((o) => (
          <div key={o.id} className="admin-card overflow-hidden">
            {o.cover_image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={o.cover_image} alt={o.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{o.title}</h3>
                {o.badge && <span className="text-xs bg-[var(--admin-accent)] text-white px-2 py-0.5 rounded">{o.badge}</span>}
              </div>
              <p className="text-sm text-[var(--admin-text-muted)] mt-1">{o.subtitle}</p>
              <div className="flex items-center gap-2 mt-3">
                <StatusBadge status={getOfferState(o)} label={getOfferState(o) === 'active' ? 'Activa' : getOfferState(o) === 'expired' ? 'Expirada' : getOfferState(o) === 'scheduled' ? 'Agendada' : 'Inactiva'} />
                {o.valid_from && <span className="text-xs text-[var(--admin-text-muted)]">{formatDate(o.valid_from)} — {o.valid_until ? formatDate(o.valid_until) : '∞'}</span>}
              </div>
              <button type="button" onClick={() => toggleActive(o)} className="text-sm text-[var(--admin-primary)] mt-3 hover:underline">
                {o.is_active ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
