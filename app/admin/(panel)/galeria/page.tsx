'use client';

import { useEffect, useState } from 'react';
import { GALLERY_CATEGORIES, GALLERY_CATEGORY_LABELS } from '@/lib/admin/constants';
import ImageUpload from '@/components/admin/ui/ImageUpload';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { galleryImages as staticGallery } from '@/lib/data/content';
import toast from 'react-hot-toast';
import type { DbGalleryImage } from '@/lib/supabase/types';

export default function GaleriaPage() {
  const [images, setImages] = useState<DbGalleryImage[]>([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { data } = await supabase.from('gallery_images').select('*').order('display_order');
      setImages((data || []) as DbGalleryImage[]);
    } else {
      setImages(staticGallery.map((g, i) => ({
        id: String(i),
        url: g.src,
        alt_text: g.alt,
        category: g.category,
        display_order: i,
        is_active: true,
        created_at: '',
      })));
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = category === 'all' ? images : images.filter((i) => i.category === category);

  const handleUpload = async (urls: string[]) => {
    if (!isSupabaseConfigured()) {
      toast('Modo local — configure Supabase para upload persistente');
      return;
    }
    const supabase = createClient();
    for (const url of urls) {
      await supabase.from('gallery_images').insert({
        url,
        category: category === 'all' ? 'exterior' : category,
        alt_text: '',
        is_active: true,
      });
    }
    toast.success('Imagens adicionadas');
    load();
  };

  const toggleActive = async (img: DbGalleryImage) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from('gallery_images').update({ is_active: !img.is_active }).eq('id', img.id);
    }
    setImages(images.map((i) => i.id === img.id ? { ...i, is_active: !i.is_active } : i));
    toast.success('Imagem actualizada');
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Galeria</h2>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setCategory('all')} className={`px-3 py-1.5 text-xs rounded-full border ${category === 'all' ? 'bg-[var(--admin-primary)] text-white' : ''}`}>Todos</button>
        {GALLERY_CATEGORIES.map((c) => (
          <button key={c} type="button" onClick={() => setCategory(c)} className={`px-3 py-1.5 text-xs rounded-full border ${category === c ? 'bg-[var(--admin-primary)] text-white' : ''}`}>
            {GALLERY_CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <ImageUpload images={[]} onChange={handleUpload} bucket="gallery" folder={category === 'all' ? 'uploads' : category} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((img) => (
          <div key={img.id} className={`relative aspect-square rounded overflow-hidden group ${!img.is_active ? 'opacity-50' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.alt_text || ''} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button type="button" onClick={() => toggleActive(img)} className="text-white text-xs bg-white/20 px-2 py-1 rounded">
                {img.is_active ? 'Desactivar' : 'Activar'}
              </button>
            </div>
            <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">
              {GALLERY_CATEGORY_LABELS[img.category || ''] || img.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
