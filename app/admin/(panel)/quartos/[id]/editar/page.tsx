'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import RichTextEditor from '@/components/admin/ui/RichTextEditor';
import ImageUpload from '@/components/admin/ui/ImageUpload';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';
import { AMENITIES, AMENITY_LABELS } from '@/lib/admin/constants';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { getLocalRooms } from '@/lib/admin/local-data';
import toast from 'react-hot-toast';
import type { DbRoom } from '@/lib/supabase/types';

export default function EditarQuartoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<DbRoom>>({});

  useEffect(() => {
    async function load() {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { data } = await supabase.from('rooms').select('*').eq('id', id).single();
        if (data) setForm(data as DbRoom);
      } else {
        const room = getLocalRooms().find((r) => r.id === id);
        if (room) setForm(room);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const update = (key: keyof DbRoom, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAmenity = (a: string) => {
    const current = form.amenities || [];
    update('amenities', current.includes(a) ? current.filter((x) => x !== a) : [...current, a]);
  };

  const handleSave = async () => {
    setSaving(true);
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { error } = await supabase.from('rooms').update({
        name: form.name,
        slug: form.slug,
        short_description: form.short_description,
        description: form.description,
        size_sqm: form.size_sqm,
        max_guests: form.max_guests,
        bed_type: form.bed_type,
        view_type: form.view_type,
        price_per_night: form.price_per_night,
        amenities: form.amenities,
        images: form.images,
        cover_image: form.images?.[0] || form.cover_image,
        is_active: form.is_active,
      }).eq('id', id);
      if (error) toast.error('Erro ao guardar');
      else toast.success('Quarto actualizado — site actualizado em tempo real');
    } else {
      toast.success('Modo local — configure Supabase para persistir alterações');
    }
    setSaving(false);
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-xl font-semibold">Editar Quarto — {form.name}</h2>

      <div className="admin-card p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Nome</label>
            <input className="admin-input" value={form.name || ''} onChange={(e) => update('name', e.target.value)} />
          </div>
          <div>
            <label className="admin-label">Slug</label>
            <input className="admin-input" value={form.slug || ''} onChange={(e) => update('slug', e.target.value)} />
          </div>
          <div>
            <label className="admin-label">Preço/noite (MZN)</label>
            <input type="number" className="admin-input" value={form.price_per_night || ''} onChange={(e) => update('price_per_night', Number(e.target.value))} />
          </div>
          <div>
            <label className="admin-label">Tamanho (m²)</label>
            <input type="number" className="admin-input" value={form.size_sqm || ''} onChange={(e) => update('size_sqm', Number(e.target.value))} />
          </div>
          <div>
            <label className="admin-label">Hóspedes máx.</label>
            <input type="number" className="admin-input" value={form.max_guests || ''} onChange={(e) => update('max_guests', Number(e.target.value))} />
          </div>
          <div>
            <label className="admin-label">Tipo de cama</label>
            <select className="admin-input" value={form.bed_type || ''} onChange={(e) => update('bed_type', e.target.value)}>
              <option value="double">Double</option>
              <option value="twin">Twin</option>
              <option value="king">King</option>
              <option value="suite">Suite</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Vista</label>
            <select className="admin-input" value={form.view_type || ''} onChange={(e) => update('view_type', e.target.value)}>
              <option value="bay">Baía</option>
              <option value="garden">Jardim</option>
              <option value="city">Cidade</option>
              <option value="pool">Piscina</option>
            </select>
          </div>
        </div>

        <div>
          <label className="admin-label">Descrição curta</label>
          <textarea className="admin-input" rows={2} maxLength={150} value={form.short_description || ''} onChange={(e) => update('short_description', e.target.value)} />
        </div>

        <div>
          <label className="admin-label">Descrição completa</label>
          <RichTextEditor content={form.description || ''} onChange={(html) => update('description', html)} />
        </div>

        <div>
          <label className="admin-label">Comodidades</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            {AMENITIES.map((a) => (
              <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={(form.amenities || []).includes(a)} onChange={() => toggleAmenity(a)} />
                {AMENITY_LABELS[a] || a}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="admin-label">Imagens</label>
          <ImageUpload images={form.images || []} onChange={(imgs) => update('images', imgs)} bucket="rooms" />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_active !== false} onChange={(e) => update('is_active', e.target.checked)} />
          Quarto activo no site público
        </label>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={() => router.back()} className="admin-btn-secondary">Cancelar</button>
        <button type="button" onClick={handleSave} disabled={saving} className="admin-btn-primary">
          {saving ? 'A guardar...' : 'Guardar'}
        </button>
      </div>
    </div>
  );
}
