'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogOut, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { useAdmin } from './AdminProvider';
import { getNavForRole } from '@/lib/admin/permissions';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { role, signOut, badges } = useAdmin();
  const [collapsed, setCollapsed] = useState(false);
  const navItems = getNavForRole(role);

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
      style={{ background: 'var(--admin-sidebar)' }}
    >
      <div className="relative flex items-center justify-center min-h-[5.5rem] py-3 px-3 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex-shrink-0 w-full flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Casa do Capitão"
            width={1024}
            height={682}
            className={clsx(
              'h-auto object-contain drop-shadow-md',
              collapsed ? 'max-h-14 w-auto' : 'max-h-[4.5rem] w-[min(220px,90%)]'
            )}
            priority
          />
        </Link>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--admin-sidebar-text)] hover:text-white p-1"
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + '/');
          const badge =
            item.badgeKey === 'contacts' ? badges.contacts :
            item.badgeKey === 'bookings' ? badges.bookings : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={clsx(
                'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md text-sm transition-colors relative',
                active
                  ? 'text-white'
                  : 'text-[var(--admin-sidebar-text)] hover:text-white hover:bg-white/5'
              )}
              style={active ? { background: 'var(--admin-sidebar-active)' } : undefined}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {badge > 0 && (
                <span
                  className={clsx(
                    'bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center',
                    collapsed ? 'absolute -top-1 -right-1' : 'ml-auto'
                  )}
                >
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          type="button"
          onClick={signOut}
          className={clsx(
            'flex items-center gap-3 w-full px-2 py-2 text-sm text-[var(--admin-sidebar-text)] hover:text-white transition-colors',
            collapsed && 'justify-center'
          )}
        >
          <LogOut size={18} />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
