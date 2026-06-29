'use client';

import { useEffect, useState } from 'react';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import SearchInput from '@/components/admin/ui/SearchInput';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { fetchLocalContacts } from '@/lib/admin/local-data';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import type { DbContactMessage } from '@/lib/supabase/types';

export default function ContactosPage() {
  const [messages, setMessages] = useState<DbContactMessage[]>([]);
  const [selected, setSelected] = useState<DbContactMessage | null>(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      setMessages((data || []) as DbContactMessage[]);
    } else {
      setMessages(await fetchLocalContacts());
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markAsRead = async (msg: DbContactMessage) => {
    setSelected(msg);
    if (msg.status === 'unread') {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        await supabase.from('contact_messages').update({ status: 'read' }).eq('id', msg.id);
      }
      setMessages(messages.map((m) => m.id === msg.id ? { ...m, status: 'read' as const } : m));
    }
  };

  const replyByEmail = (msg: DbContactMessage) => {
    window.location.href = `mailto:${msg.email}?subject=Re: ${msg.subject || 'Contacto Casa do Capitão'}`;
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      supabase.from('contact_messages').update({ status: 'replied', replied_at: new Date().toISOString() }).eq('id', msg.id);
    }
    toast.success('Cliente de email aberto');
  };

  const filtered = messages.filter((m) => {
    if (filter !== 'all' && m.status !== filter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Mensagens de Contacto</h2>

      <div className="flex flex-wrap gap-2">
        {['all', 'unread', 'read', 'replied', 'archived'].map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs rounded-full border ${filter === f ? 'bg-[var(--admin-primary)] text-white' : ''}`}>
            {f === 'all' ? 'Todas' : f === 'unread' ? 'Não lidas' : f === 'read' ? 'Lidas' : f === 'replied' ? 'Respondidas' : 'Arquivadas'}
          </button>
        ))}
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Pesquisar..." />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="admin-card overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="admin-table w-full">
            <thead><tr><th>Nome</th><th>Assunto</th><th>Data</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className={`cursor-pointer ${selected?.id === m.id ? 'bg-blue-50' : ''} ${m.status === 'unread' ? 'font-medium' : ''}`} onClick={() => markAsRead(m)}>
                  <td>{m.name}</td>
                  <td className="truncate max-w-[120px]">{m.subject || '—'}</td>
                  <td className="text-xs">{formatDate(m.created_at)}</td>
                  <td><StatusBadge status={m.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected ? (
          <div className="admin-card p-6">
            <h3 className="font-medium text-lg">{selected.name}</h3>
            <p className="text-sm text-[var(--admin-text-muted)]">{selected.email} {selected.phone && `· ${selected.phone}`}</p>
            <p className="text-sm mt-4 font-medium">{selected.subject}</p>
            <p className="text-sm mt-2 whitespace-pre-wrap">{selected.message}</p>
            <p className="text-xs text-[var(--admin-text-muted)] mt-4">{formatDate(selected.created_at)}</p>
            <button type="button" onClick={() => replyByEmail(selected)} className="admin-btn-primary mt-4">Responder por email</button>
          </div>
        ) : (
          <div className="admin-card p-6 flex items-center justify-center text-[var(--admin-text-muted)]">
            Seleccione uma mensagem
          </div>
        )}
      </div>
    </div>
  );
}
