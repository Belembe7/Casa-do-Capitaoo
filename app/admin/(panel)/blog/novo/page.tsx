'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/admin/ui/RichTextEditor';
import ImageUpload from '@/components/admin/ui/ImageUpload';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function NovoArtigoPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [saving, setSaving] = useState(false);

  const save = async (publish: boolean) => {
    setSaving(true);
    const postSlug = slug || slugify(title);

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { error } = await supabase.from('blog_posts').insert({
        title, slug: postSlug, excerpt, content, category,
        cover_image: images[0] || null,
        status: publish ? 'published' : 'draft',
        published_at: publish ? new Date().toISOString() : null,
        seo_title: seoTitle || title,
        seo_description: seoDesc || excerpt,
        tags: [],
      });
      if (error) { toast.error('Erro ao guardar'); setSaving(false); return; }
    }

    toast.success(publish ? 'Artigo publicado!' : 'Rascunho guardado');
    router.push('/admin/blog');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-xl font-semibold">Novo Artigo</h2>
      <div className="admin-card p-6 space-y-4">
        <div>
          <label className="admin-label">Título</label>
          <input className="admin-input" value={title} onChange={(e) => { setTitle(e.target.value); setSlug(slugify(e.target.value)); }} />
        </div>
        <div>
          <label className="admin-label">Slug</label>
          <input className="admin-input" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>
        <div>
          <label className="admin-label">Categoria</label>
          <input className="admin-input" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label className="admin-label">Excerto</label>
          <textarea className="admin-input" rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>
        <div>
          <label className="admin-label">Conteúdo</label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>
        <div>
          <label className="admin-label">Imagem de capa</label>
          <ImageUpload images={images} onChange={setImages} bucket="blog" maxImages={1} />
        </div>
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">SEO</h3>
          <div className="space-y-3">
            <input className="admin-input" placeholder="Meta título" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
            <textarea className="admin-input" rows={2} placeholder="Meta descrição" value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={() => router.back()} className="admin-btn-secondary">Cancelar</button>
        <button type="button" onClick={() => save(false)} disabled={saving} className="admin-btn-secondary">Guardar rascunho</button>
        <button type="button" onClick={() => save(true)} disabled={saving} className="admin-btn-primary">Publicar agora</button>
      </div>
    </div>
  );
}
