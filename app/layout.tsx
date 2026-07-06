import type { Metadata } from 'next';
import '@/styles/globals.css';
import { I18nProvider } from '@/lib/i18n/context';
import PublicChrome from '@/components/layout/PublicChrome';
import PageViewTracker from '@/components/analytics/PageViewTracker';
import { HOTEL_INFO } from '@/lib/utils';
import { satoshi } from '@/lib/fonts/satoshi';
import { brandLogo } from '@/lib/fonts/logo';
import { editorial } from '@/lib/fonts/editorial';

export const metadata: Metadata = {
  title: {
    default: 'Casa do Capitão | Hotel Boutique em Inhambane',
    template: '%s | Casa do Capitão',
  },
  description:
    'Hotel boutique em Inhambane, Moçambique. Vista para o Oceano Índico, história marítima e hospitalidade moçambicana.',
  keywords: ['hotel', 'inhambane', 'moçambique', 'boutique', 'praia', 'tofo'],
  openGraph: {
    title: 'Casa do Capitão | Hotel Boutique em Inhambane',
    description: 'Hotel boutique em Inhambane com vista para o Oceano Índico.',
    type: 'website',
    locale: 'pt_PT',
    siteName: 'Casa do Capitão',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hotelJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: HOTEL_INFO.name,
    description: metadata.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: HOTEL_INFO.address,
      addressLocality: 'Inhambane',
      addressCountry: 'MZ',
    },
    telephone: [HOTEL_INFO.landline, HOTEL_INFO.phone],
    email: HOTEL_INFO.email,
    url: 'https://casadocapitao.co.mz',
    starRating: { '@type': 'Rating', ratingValue: '4' },
  };

  return (
    <html lang="pt" className={`${satoshi.variable} ${brandLogo.variable} ${editorial.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }}
        />
      </head>
      <body>
        <I18nProvider>
          <PageViewTracker />
          <PublicChrome>{children}</PublicChrome>
        </I18nProvider>
      </body>
    </html>
  );
}
