import type { Metadata } from 'next';
import QuartosPageClient from '@/components/pages/QuartosPageClient';

export const metadata: Metadata = {
  title: 'Quartos',
  description: 'Descubra os nossos quartos com vista para o Oceano Índico em Inhambane.',
};

export default function QuartosPage() {
  return <QuartosPageClient />;
}
