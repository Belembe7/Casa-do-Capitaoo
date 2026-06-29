'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { AdminProvider, useAdmin } from './AdminProvider';
import AdminSidebar from './AdminSidebar';
import Breadcrumb from './Breadcrumb';

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading || pathname === '/admin/login') return;

    const hasSupabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
    if (hasSupabase) {
      if (!user) router.push('/admin/login');
      return;
    }

    if (!sessionStorage.getItem('admin-auth')) {
      router.push('/admin/login');
    }
  }, [loading, pathname, router, user]);

  if (loading) {
    return (
      <div className="admin-root flex items-center justify-center min-h-screen">
        <p className="text-[var(--admin-text-muted)]">A carregar...</p>
      </div>
    );
  }

  return (
    <div className="admin-root min-h-screen">
      <AdminSidebar />
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <main className="flex-1 p-6 lg:p-8">
          <Breadcrumb />
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminShellInner>{children}</AdminShellInner>
    </AdminProvider>
  );
}
