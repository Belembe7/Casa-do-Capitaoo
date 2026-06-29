'use client';

import { useEffect, useState } from 'react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { HOTEL_INFO } from '@/lib/utils';
import toast from 'react-hot-toast';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';

const TABS = ['geral', 'social', 'reservas', 'popup', 'seo', 'manutencao'] as const;
type Tab = typeof TABS[number];

const TAB_LABELS: Record<Tab, string> = {
  geral: 'Geral',
  social: 'Redes Sociais',
  reservas: 'Motor de Reservas',
  popup: 'Popup Promocional',
  seo: 'SEO & Meta',
  manutencao: 'Manutenção',
};

export default function ConfiguracoesPage() {
  const [tab, setTab] = useState<Tab>('geral');
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Record<string, unknown>>({
    hotel_info: {
      name: HOTEL_INFO.name,
      tagline: 'Na marginal da Baía de Inhambane',
      phone: HOTEL_INFO.phone,
      email: HOTEL_INFO.email,
      address: HOTEL_INFO.address,
    },
    social_links: { facebook: '', instagram: '', whatsapp: HOTEL_INFO.whatsapp || '' },
    homepage_popup: { enabled: false, title: '', message: '', image: '', cta_text: '', cta_url: '', delay: 3 },
    booking_engine_url: HOTEL_INFO.bookingEngineUrl || '',
    maintenance_mode: false,
    seo: { title: '', description: '', ga_id: '', maps_key: '' },
  });

  useEffect(() => {
    async function load() {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { data } = await supabase.from('site_settings').select('*');
        if (data) {
          const merged = { ...settings };
          data.forEach((row: { key: string; value: unknown }) => {
            merged[row.key] = row.value;
          });
          setSettings(merged);
        }
      }
      setLoading(false);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async (key: string, value: unknown) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() });
    }
    setSettings((prev) => ({ ...prev, [key]: value }));
    toast.success('Configurações guardadas — site actualizado em tempo real');
  };

  const hotelInfo = settings.hotel_info as Record<string, string>;
  const social = settings.social_links as Record<string, string>;
  const popup = settings.homepage_popup as Record<string, unknown>;
  const seo = settings.seo as Record<string, string>;

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-xl font-semibold">Configurações do Site</h2>

      <div className="flex flex-wrap gap-2 border-b border-[var(--admin-border)] pb-4">
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`px-3 py-1.5 text-sm rounded-md ${tab === t ? 'bg-[var(--admin-primary)] text-white' : 'hover:bg-slate-100'}`}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {tab === 'geral' && (
        <div className="admin-card p-6 space-y-4">
          {['name', 'tagline', 'phone', 'email', 'address'].map((field) => (
            <div key={field}>
              <label className="admin-label capitalize">{field}</label>
              <input
                className="admin-input"
                value={hotelInfo[field] || ''}
                onChange={(e) => setSettings({ ...settings, hotel_info: { ...hotelInfo, [field]: e.target.value } })}
              />
            </div>
          ))}
          <button type="button" onClick={() => save('hotel_info', settings.hotel_info)} className="admin-btn-primary">Guardar</button>
        </div>
      )}

      {tab === 'social' && (
        <div className="admin-card p-6 space-y-4">
          {['facebook', 'instagram', 'whatsapp', 'tiktok', 'youtube'].map((field) => (
            <div key={field}>
              <label className="admin-label capitalize">{field}</label>
              <input
                className="admin-input"
                value={social[field] || ''}
                onChange={(e) => setSettings({ ...settings, social_links: { ...social, [field]: e.target.value } })}
              />
            </div>
          ))}
          <button type="button" onClick={() => save('social_links', settings.social_links)} className="admin-btn-primary">Guardar</button>
        </div>
      )}

      {tab === 'reservas' && (
        <div className="admin-card p-6 space-y-4">
          <div>
            <label className="admin-label">URL do motor de reservas</label>
            <input
              className="admin-input"
              value={String(settings.booking_engine_url || '')}
              onChange={(e) => setSettings({ ...settings, booking_engine_url: e.target.value })}
            />
          </div>
          <button type="button" onClick={() => save('booking_engine_url', settings.booking_engine_url)} className="admin-btn-primary">Guardar</button>
        </div>
      )}

      {tab === 'popup' && (
        <div className="admin-card p-6 space-y-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!popup.enabled} onChange={(e) => setSettings({ ...settings, homepage_popup: { ...popup, enabled: e.target.checked } })} />
            Activar popup na homepage
          </label>
          {['title', 'message', 'image', 'cta_text', 'cta_url'].map((field) => (
            <div key={field}>
              <label className="admin-label">{field}</label>
              <input
                className="admin-input"
                value={String(popup[field] || '')}
                onChange={(e) => setSettings({ ...settings, homepage_popup: { ...popup, [field]: e.target.value } })}
              />
            </div>
          ))}
          <div>
            <label className="admin-label">Delay (segundos)</label>
            <input type="number" className="admin-input w-24" value={Number(popup.delay) || 3} onChange={(e) => setSettings({ ...settings, homepage_popup: { ...popup, delay: Number(e.target.value) } })} />
          </div>
          <button type="button" onClick={() => save('homepage_popup', settings.homepage_popup)} className="admin-btn-primary">Guardar</button>
        </div>
      )}

      {tab === 'seo' && (
        <div className="admin-card p-6 space-y-4">
          <div>
            <label className="admin-label">Meta título padrão</label>
            <input className="admin-input" value={seo?.title || ''} onChange={(e) => setSettings({ ...settings, seo: { ...seo, title: e.target.value } })} />
          </div>
          <div>
            <label className="admin-label">Meta descrição</label>
            <textarea className="admin-input" rows={3} value={seo?.description || ''} onChange={(e) => setSettings({ ...settings, seo: { ...seo, description: e.target.value } })} />
          </div>
          <div>
            <label className="admin-label">Google Analytics ID</label>
            <input className="admin-input" placeholder="G-XXXXXXXX" value={seo?.ga_id || ''} onChange={(e) => setSettings({ ...settings, seo: { ...seo, ga_id: e.target.value } })} />
          </div>
          <button type="button" onClick={() => save('seo', settings.seo)} className="admin-btn-primary">Guardar</button>
        </div>
      )}

      {tab === 'manutencao' && (
        <div className="admin-card p-6 space-y-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!settings.maintenance_mode}
              onChange={(e) => setSettings({ ...settings, maintenance_mode: e.target.checked })}
            />
            Activar modo de manutenção (mostra página &quot;Em breve&quot; no site público)
          </label>
          <button type="button" onClick={() => save('maintenance_mode', settings.maintenance_mode)} className="admin-btn-primary">Guardar</button>
        </div>
      )}
    </div>
  );
}
