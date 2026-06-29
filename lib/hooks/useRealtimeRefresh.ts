'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

/**
 * Subscribes to Supabase Realtime changes and refreshes server components.
 */
export function useRealtimeRefresh(tables: string[]) {
  const router = useRouter();

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const supabase = createClient();
    const channel = supabase.channel('public-refresh');

    tables.forEach((table) => {
      channel.on('postgres_changes', { event: '*', schema: 'public', table }, () => {
        router.refresh();
      });
    });

    channel.subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [tables, router]);
}
