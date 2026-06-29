'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import SearchInput from '@/components/admin/ui/SearchInput';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { getLocalBlogPosts } from '@/lib/admin/local-data';
import toast from 'react-hot-toast';
import type { DbBlogPost } from '@/lib/supabase/types';
import { formatDate } from '@/lib/utils';

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<DbBlogPost[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      setPosts((data || []) as DbBlogPost[]);
    } else {
      setPosts(getLocalBlogPosts());
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const togglePublish = async (post: DbBlogPost) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from('blog_posts').update({
        status: newStatus,
        published_at: newStatus === 'published' ? new Date().toISOString() : null,
      }).eq('id', post.id);
    }
    setPosts(posts.map((p) => p.id === post.id ? { ...p, status: newStatus as DbBlogPost['status'] } : p));
    toast.success(newStatus === 'published' ? 'Artigo publicado' : 'Artigo despublicado');
  };

  const filtered = posts.filter((p) => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Blog</h2>
        <Link href="/admin/blog/novo" className="admin-btn-primary"><Plus size={16} /> Novo artigo</Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', 'published', 'draft', 'archived'].map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs rounded-full border ${filter === f ? 'bg-[var(--admin-primary)] text-white border-transparent' : 'border-[var(--admin-border)]'}`}>
            {f === 'all' ? 'Todos' : f === 'published' ? 'Publicados' : f === 'draft' ? 'Rascunhos' : 'Arquivados'}
          </button>
        ))}
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Pesquisar artigos..." />

      <div className="admin-card overflow-x-auto">
        <table className="admin-table w-full">
          <thead>
            <tr><th>Título</th><th>Categoria</th><th>Status</th><th>Views</th><th>Data</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td className="font-medium">{p.title}</td>
                <td>{p.category || '—'}</td>
                <td><StatusBadge status={p.status} /></td>
                <td>{p.view_count}</td>
                <td>{p.published_at ? formatDate(p.published_at) : '—'}</td>
                <td className="flex gap-2">
                  <button type="button" onClick={() => togglePublish(p)} className="text-xs text-[var(--admin-primary)] hover:underline">
                    {p.status === 'published' ? 'Despublicar' : 'Publicar'}
                  </button>
                  <Link href={`/admin/blog/${p.id}/editar`} className="p-1 hover:bg-slate-100 rounded"><Pencil size={14} /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
