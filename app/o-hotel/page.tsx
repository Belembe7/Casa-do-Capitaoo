import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import OHotelIntro from '@/components/pages/OHotelIntro';

export const metadata: Metadata = {
  title: 'O Hotel',
  description: 'Conheça a história e os espaços do Hotel Casa do Capitão em Inhambane.',
};

const sections = [
  {
    title: 'Pequeno-almoço à Beira da Piscina',
    text: 'Comece o dia com um pequeno-almoço servido à beira da piscina, com vista para a baía de Inhambane. O nosso serviço personalizado de estilo "5 estrelas" transforma cada manhã num momento de calma, sabor e exclusividade.',
    image: '/images/o-hotel/section-breakfast.png',
    width: 1024,
    height: 681,
    reverse: false,
  },
  {
    title: 'Restaurante com Vista para o Mar',
    text: 'O Restaurante Capitão convida a saborear a cozinha moçambicana num ambiente elegante e luminoso. Mesas postas com vista para o Oceano Índico, luz natural abundante e o ritmo sereno da baía como pano de fundo de cada refeição.',
    image: '/images/amenity-salao.png',
    width: 1024,
    height: 683,
    reverse: true,
  },
  {
    title: 'Vista da Baía de Inhambane',
    text: 'A Baía de Inhambane revela-se em todo o seu esplendor diante do hotel: um panorama amplo, luminoso e sereno, onde o mar e o céu se encontram num dos cenários mais emblemáticos de Moçambique.',
    image: '/images/o-hotel/section-bay-view.png',
    width: 1024,
    height: 577,
    reverse: false,
  },
];

const timeline = [
  { year: 'Antes de 1885', event: 'Residência oficial do Capitão do Porto, voltada para a Baía de Inhambane.' },
  { year: '1918', event: 'O edifício torna-se o Clube Comodoro, espaço de convívio para oficiais da marinha.' },
  { year: '2007', event: 'Inicia-se a reabilitação do património para um novo capítulo da sua história.' },
  { year: '2010', event: 'Nasce o Hotel Casa do Capitão, preservando o legado histórico com hospitalidade contemporânea.' },
  { year: 'Hoje', event: 'Um dos hotéis de referência em Inhambane, onde história, conforto e a beleza da baía se encontram.' },
];

export default function OHotelPage() {
  return (
    <>
      <section className="relative pt-20">
        <div className="relative">
          <Image
            src="/images/o-hotel/hero-pool-sunset.png"
            alt="Piscina do Hotel Casa do Capitão ao pôr do sol"
            width={1024}
            height={349}
            className="w-full h-auto block"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      </section>

      <section className="py-section section-padding text-center max-w-3xl mx-auto">
        <OHotelIntro />
      </section>

      {sections.map((section) => (
        <section
          key={section.title}
          className={`py-section section-padding grid md:grid-cols-2 gap-12 items-center ${
            section.reverse ? 'md:[direction:rtl]' : ''
          }`}
        >
          <ScrollReveal className={section.reverse ? 'md:[direction:ltr]' : ''}>
            <div className="overflow-hidden rounded-2xl bg-[#f3f1ed]">
              <Image
                src={section.image}
                alt={section.title}
                width={section.width}
                height={section.height}
                className="w-full h-auto block"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
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
              <span className="font-display text-xl md:text-2xl text-secondary flex-shrink-0 w-28 md:w-32">
                {item.year}
              </span>
              <p className="text-white/80 pt-1 leading-relaxed">{item.event}</p>
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
