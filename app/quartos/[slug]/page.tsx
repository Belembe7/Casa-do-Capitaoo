import type { Metadata } from 'next';
import { rooms } from '@/lib/data/rooms';
import RoomDetailClient from '@/components/pages/RoomDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const room = rooms.find((r) => r.slug === params.slug);
  if (!room) return { title: 'Quarto não encontrado' };
  return {
    title: room.name,
    description: room.shortDescription,
  };
}

export default function RoomDetailPage({ params }: Props) {
  return <RoomDetailClient slug={params.slug} />;
}
