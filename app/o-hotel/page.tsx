import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'O Hotel',
  description: 'Conheça a história e os espaços da Casa do Capitão em Inhambane.',
};

const sections = [
  {
    title: 'Uma Herança Marítima',
    text: 'A Casa do Capitão nasceu da rica história marítima de Inhambane. O edifício que hoje abriga o nosso hotel foi outrora a residência de um capitão de mar que comandava as embarcações que cruzavam o Índico entre África, Ásia e Europa.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    reverse: false,
  },
  {
    title: 'Arquitectura e Alma',
    text: 'Cada detalhe honra a memória desta terra: dos azulejos originais às vigas de madeira recuperadas dos dhows tradicionais. Combinamos património histórico com conforto contemporâneo para criar um refúgio único na baía de Inhambane.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    reverse: true,
  },
  {
    title: 'O Jardim Tropical',
    text: 'O nosso jardim é um oásis de palmeiras, flores tropicais e o som distante das ondas. Um espaço para contemplar, ler um livro à sombra ou simplesmente deixar o tempo passar.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    reverse: false,
  },
];

const timeline = [
  { year: '1534', event: 'Navegadores portugueses chegam a Inhambane' },
  { year: '1854', event: 'Construção da residência que hoje é o hotel' },
  { year: '2018', event: 'Restauração e abertura da Casa do Capitão' },
  { year: '2024', event: 'Expansão do Rooftop Bar e novas suites' },
];

export default function OHotelPage() {
  return (
    <>
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="O Hotel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 section-padding pb-12">
          <h1 className="font-display text-4xl md:text-6xl text-white">O Hotel</h1>
        </div>
      </section>

      <section className="py-section section-padding text-center max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-lg md:text-xl leading-relaxed text-text-light font-light">
            Na baía onde os dhows ancestrais ainda cruzam o horizonte, a Casa do
            Capitão é um refúgio que não procura chamar a atenção. Deixa que
            fale o mar.
          </p>
        </ScrollReveal>
      </section>

      {sections.map((section) => (
        <section
          key={section.title}
          className={`py-section section-padding grid md:grid-cols-2 gap-12 items-center ${
            section.reverse ? 'md:[direction:rtl]' : ''
          }`}
        >
          <ScrollReveal className={section.reverse ? 'md:[direction:ltr]' : ''}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={section.image} alt={section.title} fill className="object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal
            delay={0.2}
            className={section.reverse ? 'md:[direction:ltr]' : ''}
          >
            <h2 className="font-display text-3xl mb-6">{section.title}</h2>
            <p className="text-text-light leading-relaxed">{section.text}</p>
          </ScrollReveal>
        </section>
      ))}

      <section className="py-section section-padding bg-primary text-white">
        <h2 className="font-display text-3xl text-center mb-12">A Nossa História</h2>
        <div className="max-w-2xl mx-auto space-y-8">
          {timeline.map((item) => (
            <div key={item.year} className="flex gap-6 items-start">
              <span className="font-display text-2xl text-secondary flex-shrink-0 w-20">
                {item.year}
              </span>
              <p className="text-white/80 pt-1">{item.event}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-section section-padding text-center">
        <Link href="/galeria" className="btn-outline">
          Ver Galeria
        </Link>
      </section>
    </>
  );
}
