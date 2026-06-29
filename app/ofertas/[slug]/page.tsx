import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getOfferBySlug, offers } from '@/lib/data/offers';
import { formatDate } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return offers.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const offer = getOfferBySlug(params.slug);
  if (!offer) return { title: 'Oferta não encontrada' };
  return { title: offer.title, description: offer.description };
}

export default function OfferDetailPage({ params }: Props) {
  const offer = getOfferBySlug(params.slug);
  if (!offer) notFound();

  return (
    <section className="pt-20 section-padding max-w-4xl mx-auto">
      <div className="relative aspect-[16/9] overflow-hidden mb-8">
        <Image src={offer.image} alt={offer.title} fill className="object-cover" priority />
        <span className="absolute top-6 left-6 bg-secondary text-white text-sm px-4 py-2 uppercase tracking-wider">
          {offer.badge}
        </span>
      </div>

      <h1 className="font-display text-4xl md:text-5xl mb-6">{offer.title}</h1>
      <p className="text-text-light leading-relaxed text-lg mb-8">{offer.description}</p>

      {offer.validUntil && (
        <p className="text-sm text-text-light mb-8">
          Válido até: {formatDate(offer.validUntil)}
        </p>
      )}

      <Link href={`/reservar?oferta=${offer.slug}`} className="btn-primary">
        Reservar esta oferta
      </Link>
    </section>
  );
}
