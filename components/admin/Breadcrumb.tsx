'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const LABELS: Record<string, string> = {
  admin: 'Admin',
  dashboard: 'Dashboard',
  reservas: 'Reservas',
  quartos: 'Quartos',
  disponibilidade: 'Disponibilidade',
  editar: 'Editar',
  novo: 'Novo',
  servicos: 'Serviços',
  ofertas: 'Ofertas',
  blog: 'Blog',
  galeria: 'Galeria',
  contactos: 'Contactos',
  newsletter: 'Newsletter',
  analytics: 'Analytics',
  configuracoes: 'Configurações',
  login: 'Login',
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname?.split('/').filter(Boolean) || [];

  if (segments.length <= 1) return null;

  return (
    <nav className="flex items-center gap-1 text-sm text-[var(--admin-text-muted)] mb-6">
      <Link href="/admin/dashboard" className="hover:text-[var(--admin-primary)]">
        <Home size={14} />
      </Link>
      {segments.map((seg, i) => {
        const href = '/' + segments.slice(0, i + 1).join('/');
        const isLast = i === segments.length - 1;
        const label = LABELS[seg] || seg;

        return (
          <span key={href} className="flex items-center gap-1">
            <ChevronRight size={14} />
            {isLast ? (
              <span className="text-[var(--admin-text)] font-medium">{label}</span>
            ) : (
              <Link href={href} className="hover:text-[var(--admin-primary)]">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
