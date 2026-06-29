import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rooftop Bar',
  description: 'Cocktails ao pôr do sol com vista panorâmica para a baía de Inhambane.',
};

const gallery = [
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7bfa?w=800&q=80',
];

export default function RooftopPage() {
  return (
    <>
      <section className="hero-video-container">
        <div className="absolute inset-0 bg-black/40 z-[1]" />
        <Image
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80"
          alt="Rooftop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-4xl md:text-6xl text-white mb-4">
            Rooftop Bar
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Onde o horizonte encontra o copo
          </p>
        </div>
      </section>

      <section className="py-section section-padding max-w-3xl mx-auto text-center">
        <p className="text-lg leading-relaxed text-text-light mb-8">
          No topo da Casa do Capitão, o nosso Rooftop Bar oferece uma experiência
          única: cocktails artesanais, vinhos selecionados e petiscos da cozinha
          moçambicana, tudo com vista panorâmica para a baía de Inhambane e o
          Oceano Índico.
        </p>
        <div className="grid grid-cols-2 gap-8 text-left max-w-md mx-auto">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-secondary mb-2">Horário</h3>
            <p className="text-sm">17h00 — 00h00</p>
            <p className="text-sm text-text-light">Todos os dias</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-secondary mb-2">Reservas</h3>
            <p className="text-sm">+258 84 123 4567</p>
            <p className="text-sm text-text-light">info@casadocapitao.co.mz</p>
          </div>
        </div>
      </section>

      <section className="section-padding pb-section grid grid-cols-2 md:grid-cols-4 gap-2">
        {gallery.map((src, i) => (
          <div key={i} className={`relative overflow-hidden ${i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}>
            <Image src={src} alt={`Rooftop ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      <section className="py-section section-padding text-center border-t">
        <Link href="/contacto" className="btn-primary">
          Reservar Mesa
        </Link>
      </section>
    </>
  );
}
