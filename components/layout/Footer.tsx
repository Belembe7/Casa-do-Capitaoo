'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { HOTEL_INFO } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/context';
import { useSiteContent } from '@/lib/i18n/hooks';

const partners = [
  'TripAdvisor',
  'Booking.com',
  'Mozambique Tourism',
  'UNESCO',
  'Green Key',
];

export default function Footer() {
  const { t } = useI18n();
  const f = useSiteContent().footer;

  const footerLinks = [
    {
      title: f.hotel,
      links: [
        { label: f.rooms, href: '/quartos' },
        { label: f.theHotel, href: '/o-hotel' },
        { label: f.gallery, href: '/galeria' },
        { label: f.services, href: '/servicos' },
      ],
    },
    {
      title: f.bookings,
      links: [
        { label: f.book, href: '/reservar' },
        { label: f.offers, href: '/ofertas' },
        { label: f.restaurant, href: '/restaurante' },
        { label: f.contact, href: '/contacto' },
      ],
    },
    {
      title: f.info,
      links: [
        { label: f.blog, href: '/blog' },
        { label: f.about, href: '/sobre-nos' },
        { label: f.faqs, href: '/faqs' },
        { label: f.legal, href: '/aviso-legal' },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="section-padding py-section grid md:grid-cols-2 gap-8">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <iframe
            src={`https://maps.google.com/maps?q=${HOTEL_INFO.coordinates.lat},${HOTEL_INFO.coordinates.lng}&z=15&output=embed`}
            className="absolute inset-0 w-full h-full border-0 grayscale opacity-80"
            loading="lazy"
            title="Casa do Capitão"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4 py-8">
          <h2 className="font-display text-3xl">Casa do Capitão</h2>
          <p className="text-white/70">{HOTEL_INFO.address}</p>
          <a
            href={HOTEL_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm link-underline text-secondary inline-block w-fit"
          >
            {t.footer.openMaps}
          </a>
          <div className="space-y-1 pt-4">
            <a href={`mailto:${HOTEL_INFO.email}`} className="block text-white/70 hover:text-secondary transition-colors">
              {HOTEL_INFO.email}
            </a>
            <a href={`tel:${HOTEL_INFO.phone}`} className="block text-white/70 hover:text-secondary transition-colors">
              T. {HOTEL_INFO.phone}
            </a>
          </div>
          <a
            href={`https://wa.me/${HOTEL_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-green-600 hover:bg-green-700 w-fit mt-4"
          >
            {f.whatsapp}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 overflow-hidden">
        <div className="ticker-track">
          {[...partners, ...partners].map((partner, i) => (
            <span
              key={`${partner}-${i}`}
              className="flex items-center px-8 text-sm uppercase tracking-[0.2em] text-white/40 whitespace-nowrap"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>

      <div className="section-padding py-12 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-secondary mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Casa do Capitão. {t.footer.copyright}
          </p>
          <div className="flex gap-4 text-xs text-white/40">
            <Link href="/aviso-legal" className="hover:text-white transition-colors">
              {t.footer.legal}
            </Link>
            <Link href="/politica-cookies" className="hover:text-white transition-colors">
              {t.footer.cookies}
            </Link>
          </div>
          <div className="flex gap-4">
            <a href={HOTEL_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-secondary transition-colors">
              <Facebook size={18} />
            </a>
            <a href={HOTEL_INFO.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-secondary transition-colors">
              <Instagram size={18} />
            </a>
            <a href={HOTEL_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-secondary transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={HOTEL_INFO.social.youtube} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-secondary transition-colors">
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
