import type { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'A equipa e a missão da Casa do Capitão em Inhambane.',
};

export default function SobreNosPage() {
  return (
    <>
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
          alt="Sobre Nós"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 section-padding pb-12">
          <h1 className="font-display text-4xl md:text-6xl text-white">Sobre Nós</h1>
        </div>
      </section>

      <section className="py-section section-padding max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-3xl mb-6">A Nossa Missão</h2>
          <p className="text-text-light leading-relaxed mb-6">
            A Casa do Capitão nasceu do desejo de partilhar a beleza e a história
            de Inhambane com o mundo. Somos uma equipa apaixonada por
            hospitalidade moçambicana, comprometida em oferecer experiências
            autênticas que conectam os nossos hóspedes com a cultura, a
            gastronomia e as paisagens únicas desta região.
          </p>
          <p className="text-text-light leading-relaxed mb-6">
            Acreditamos que viajar é uma forma de estar — de estar presente, de
            estar em contacto com a natureza, de estar em comunidade. Cada
            detalhe do nosso hotel reflete este compromisso.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h2 className="font-display text-3xl mb-6 mt-12">Compromisso Sustentável</h2>
          <p className="text-text-light leading-relaxed">
            Trabalhamos com produtores locais, apoiamos artesãos de Inhambane e
            implementamos práticas sustentáveis em todas as áreas do hotel. O
            nosso compromisso é preservar o que torna este lugar especial para
            as gerações futuras.
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
