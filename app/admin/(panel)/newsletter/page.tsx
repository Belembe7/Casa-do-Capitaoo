'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import LoadingSkeleton from '@/components/admin/ui/LoadingSkeleton';
import StatsCard from '@/components/admin/ui/StatsCard';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { fetchLocalNewsletter } from '@/lib/admin/local-data';
import { formatDate } from '@/lib/utils';
import type { DbNewsletterSubscriber } from '@/lib/supabase/types';
import Papa from 'papaparse';

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<DbNewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { data } = await supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false });
        setSubscribers((data || []) as DbNewsletterSubscriber[]);
      } else {
        setSubscribers(await fetchLocalNewsletter());
      }
      setLoading(false);
    }
    load();
  }, []);

  const exportCsv = () => {
    const csv = Papa.unparse(subscribers.map((s) => ({ email: s.email, nome: s.name, data: s.subscribed_at })));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
  };

  const active = subscribers.filter((s) => s.is_active).length;
  const thisMonth = subscribers.filter((s) => {
    const d = new Date(s.subscribed_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const growthData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const count = subscribers.filter((s) => {
      const sd = new Date(s.subscribed_at);
      return sd.getMonth() === d.getMonth() && sd.getFullYear() === d.getFullYear();
    }).length;
    return { month: d.toLocaleString('pt', { month: 'short' }), novos: count };
  });

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Newsletter</h2>
        <button type="button" onClick={exportCsv} className="admin-btn-secondary"><Download size={16} /> Exportar CSV</button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatsCard label="Total activos" value={active} icon={<span>✉️</span>} color="blue" />
        <StatsCard label="Inactivos" value={subscribers.length - active} icon={<span>📭</span>} color="amber" />
        <StatsCard label="Novos este mês" value={thisMonth} icon={<span>📈</span>} color="green" changeType="positive" />
      </div>

      <div className="admin-card p-5">
        <h3 className="font-medium mb-4">Crescimento de subscritores</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={growthData}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="novos" fill="#1B4B6B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="admin-card overflow-x-auto">
        <table className="admin-table w-full">
          <thead><tr><th>Email</th><th>Nome</th><th>Data</th><th>Estado</th></tr></thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id}>
                <td>{s.email}</td>
                <td>{s.name || '—'}</td>
                <td>{formatDate(s.subscribed_at)}</td>
                <td>{s.is_active ? 'Activo' : 'Inactivo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
