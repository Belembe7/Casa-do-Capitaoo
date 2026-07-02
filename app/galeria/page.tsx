import type { Metadata } from 'next';
import Gallery from '@/components/gallery/Gallery';

export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Galeria fotográfica do Hotel Casa do Capitão em Inhambane.',
};

export default function GaleriaPage() {
  return <Gallery />;
}
