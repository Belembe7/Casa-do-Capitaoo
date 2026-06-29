import type { Metadata } from 'next';
import Image from 'next/image';
import OfferCard from '@/components/ui/OfferCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { offers } from '@/lib/data/offers';

export const metadata: Metadata = {
  title: 'Ofertas e Escapadas',
  description: 'Pacotes especiais e ofertas sazonais na Casa do Capitão.',
};

export default function OfertasPage() {
  return (
    <>
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Ofertas"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 section-padding pb-12">
          <h1 className="font-display text-4xl md:text-6xl text-white">
            Ofertas & Escapadas
          </h1>
        </div>
      </section>

      <section className="py-section section-padding">
        <ScrollReveal>
          <p className="text-text-light max-w-2xl mb-12">
            Descubra as nossas ofertas especiais e pacotes que combinam
            hospitalidade moçambicana com experiências únicas em Inhambane.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <OfferCard key={offer.slug} offer={offer} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
