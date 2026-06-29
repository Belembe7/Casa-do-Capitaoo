'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import RichTextEditor from '@/components/admin/ui/RichTextEditor';
import ImageUpload from '@/components/admin/ui/ImageUpload';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { getLocalBlogPosts } from '@/lib/admin/local-data';
import toast from 'react-hot-toast';
import type { DbBlogPost } from '@/lib/supabase/types';

export default function EditarArtigoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<DbBlogPost | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single();
        if (data) {
          setPost(data as DbBlogPost);
          setImages(data.cover_image ? [data.cover_image] : []);
        }
      } else {
        const found = getLocalBlogPosts().find((p) => p.id === id);
        if (found) { setPost(found); setImages(found.cover_image ? [found.cover_image] : []); }
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const update = (key: keyof DbBlogPost, value: unknown) => {
    if (post) setPost({ ...post, [key]: value });
  };

  const save = async (publish?: boolean) => {
    if (!post) return;
    const status = publish ? 'published' : post.status;
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from('blog_posts').update({
        title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content,
        category: post.category, cover_image: images[0] || null, status,
        published_at: publish ? new Date().toISOString() : post.published_at,
        seo_title: post.seo_title, seo_description: post.seo_description,
      }).eq('id', id);
    }
    toast.success('Artigo actualizado');
    router.push('/admin/blog');
  };

  if (loading || !post) return <LoadingSkeleton />;

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-xl font-semibold">Editar — {post.title}</h2>
      <div className="admin-card p-6 space-y-4">
        <input className="admin-input" value={post.title} onChange={(e) => update('title', e.target.value)} placeholder="Título" />
        <input className="admin-input" value={post.slug} onChange={(e) => update('slug', e.target.value)} placeholder="Slug" />
        <input className="admin-input" value={post.category || ''} onChange={(e) => update('category', e.target.value)} placeholder="Categoria" />
        <textarea className="admin-input" rows={2} value={post.excerpt || ''} onChange={(e) => update('excerpt', e.target.value)} placeholder="Excerto" />
        <RichTextEditor content={post.content || ''} onChange={(html) => update('content', html)} />
        <ImageUpload images={images} onChange={setImages} bucket="blog" maxImages={1} />
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={() => router.back()} className="admin-btn-secondary">Cancelar</button>
        <button type="button" onClick={() => save(false)} className="admin-btn-secondary">Guardar</button>
        <button type="button" onClick={() => save(true)} className="admin-btn-primary">Publicar</button>
      </div>
    </div>
  );
}
