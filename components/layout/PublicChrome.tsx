'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingBar from '@/components/layout/BookingBar';
import LocalizedPopup from '@/components/layout/LocalizedPopup';
import AppToaster from '@/components/ui/AppToaster';
import MediaWarmup from '@/components/media/MediaWarmup';
import BackButton from '@/components/ui/BackButton';

export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <MediaWarmup />
      <AppToaster />
      <Navbar />
      {pathname !== '/' && <BackButton />}
      <main className="page-transition pb-24 md:pb-20">{children}</main>
      <Footer />
      <BookingBar />
      <LocalizedPopup />
    </>
  );
}
