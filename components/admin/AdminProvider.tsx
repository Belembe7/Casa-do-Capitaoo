'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import type { AdminProfile, AdminRole } from '@/lib/supabase/types';
import type { User } from '@supabase/supabase-js';

interface AdminContextValue {
  user: User | null;
  profile: AdminProfile | null;
  role: AdminRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
  badges: { contacts: number; bookings: number };
  refreshBadges: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState({ contacts: 0, bookings: 0 });

  const refreshBadges = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      try {
        const res = await fetch('/api/admin');
        const data = await res.json();
        setBadges({
          contacts: data.stats?.unreadNotifications || 0,
          bookings: data.stats?.pendingBookings || 0,
        });
      } catch { /* ignore */ }
      return;
    }

    const supabase = createClient();
    const [contacts, bookings] = await Promise.all([
      supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'unread'),
      supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    ]);
    setBadges({
      contacts: contacts.count || 0,
      bookings: bookings.count || 0,
    });
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      const legacy = typeof window !== 'undefined' && sessionStorage.getItem('admin-auth');
      if (legacy) {
        setProfile({ id: 'local', name: 'Admin', role: 'super_admin', avatar_url: null, created_at: '' });
      }
      setLoading(false);
      refreshBadges();
      return;
    }

    const supabase = createClient();

    const loadProfile = async (authUser: User) => {
      const { data } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
      setProfile(data as AdminProfile | null);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user);
      setLoading(false);
      refreshBadges();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, [refreshBadges]);

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem('admin-auth');
    router.push('/admin/login');
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        profile,
        role: profile?.role ?? null,
        loading,
        signOut,
        badges,
        refreshBadges,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
