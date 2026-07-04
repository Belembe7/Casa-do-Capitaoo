'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { HOTEL_INFO } from '@/lib/utils';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import BrandLogo from '@/components/ui/BrandLogo';

const navLinks = [
  { href: '/quartos', key: 'rooms' as const, external: false },
  { href: '/o-hotel', key: 'hotel' as const, external: false },
  { href: '/galeria', key: 'gallery' as const, external: false },
  { href: '/ofertas', key: 'offers' as const, external: false },
  { href: '/contacto', key: 'contact' as const, external: false },
];

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const textColor = scrolled ? 'text-primary' : 'text-white';
  const logoColor = scrolled ? 'text-primary' : 'text-white';

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="section-padding">
          <div className="hidden lg:flex items-center justify-between h-20 gap-12">
            <Link href="/" className="flex-shrink-0">
              <BrandLogo className={logoColor} overMedia={!scrolled} />
            </Link>

            <nav className="flex items-center justify-end gap-x-5 xl:gap-x-7">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`nav-link whitespace-nowrap ${textColor}`}
                  >
                    {t.nav[link.key]}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link whitespace-nowrap ${textColor}`}
                  >
                    {t.nav[link.key]}
                  </Link>
                )
              )}

              <span className={`h-4 w-px mx-1 ${scrolled ? 'bg-gray-300' : 'bg-white/30'}`} />

              <LanguageSwitcher textColor={textColor} />
            </nav>
          </div>

          <div className="lg:hidden flex items-center justify-between h-16">
            <Link href="/">
              <BrandLogo className={logoColor} overMedia={!scrolled} size="sm" />
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className={`flex items-center gap-2 ${textColor}`}
            >
              <Menu size={20} />
              <span className="text-xs uppercase tracking-widest">{t.nav.menu}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-primary text-white flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <BrandLogo className="text-white" size="sm" />
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 space-y-6">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl hover:text-secondary transition-colors"
                  >
                    {t.nav[link.key]}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl hover:text-secondary transition-colors"
                  >
                    {t.nav[link.key]}
                  </Link>
                )
              ))}
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl hover:text-secondary transition-colors"
              >
                {t.nav.blog}
              </Link>
            </nav>

            <div className="p-8 border-t border-white/10 space-y-4">
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 mb-2">
                <Globe size={14} aria-hidden />
                <span className="sr-only">Language</span>
              </p>
              <LanguageSwitcher variant="list" onSelect={() => setMobileOpen(false)} />
              <p className="text-sm text-white/60 pt-4">{HOTEL_INFO.address}</p>
              <p className="text-sm text-white/60">{HOTEL_INFO.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
