import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Galeria de fotos da Casa do Capitão — hotel, quartos, restaurante, piscina e mais.',
};

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
