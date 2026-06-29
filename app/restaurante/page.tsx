import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Restaurante',
  description: 'Cozinha moçambicana e internacional no Restaurante Capitão.',
};

const menu = [
  {
    category: 'Entradas',
    items: [
      { name: 'Camarão à Zambeziana', price: '850 MT', desc: 'Camarão grelhado com molho de coco e piri-piri' },
      { name: 'Salada Tropical', price: '450 MT', desc: 'Manga, abacate e mariscos frescos' },
      { name: 'Sopa de Matapa', price: '350 MT', desc: 'Folhas de mandioca com amendoim e coco' },
    ],
  },
  {
    category: 'Pratos Principais',
    items: [
      { name: 'Matapa de Caranguejo', price: '1200 MT', desc: 'Prato emblemático da região' },
      { name: 'Gambas Grelhadas', price: '1500 MT', desc: 'Gambas frescas com molho piri-piri da casa' },
      { name: 'Peixe do Dia', price: '1100 MT', desc: 'Captura local grelhada com legumes' },
      { name: 'Frango à Piripiri', price: '750 MT', desc: 'Frango grelhado marinado 24h' },
    ],
  },
  {
    category: 'Sobremesas',
    items: [
      { name: 'Pudim de Coco', price: '350 MT', desc: 'Receita tradicional moçambicana' },
      { name: 'Mousse de Manga', price: '400 MT', desc: 'Manga da estação com chocolate' },
    ],
  },
];

const gallery = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
];

export default function RestaurantePage() {
  return (
    <>
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          alt="Restaurante"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 section-padding pb-12">
          <h1 className="font-display text-4xl md:text-6xl text-white">
            Restaurante Capitão
          </h1>
        </div>
      </section>

      <section className="py-section section-padding max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-lg leading-relaxed text-text-light">
            Sabores autênticos de Moçambique, do mar à terra. O nosso restaurante
            celebra a riqueza gastronómica da região com ingredientes frescos e
            receitas de família.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-8 text-left max-w-md mx-auto">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-secondary mb-2">Horário</h3>
              <p className="text-sm">Pequeno-almoço: 7h00 — 10h30</p>
              <p className="text-sm">Almoço: 12h30 — 15h00</p>
              <p className="text-sm">Jantar: 19h00 — 22h00</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest text-secondary mb-2">Reservas</h3>
              <p className="text-sm">+258 84 123 4567</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-section section-padding bg-white">
        <h2 className="font-display text-3xl text-center mb-12">Cardápio</h2>
        <div className="max-w-2xl mx-auto space-y-12">
          {menu.map((section) => (
            <div key={section.category}>
              <h3 className="font-display text-xl text-secondary mb-6 border-b border-gray-200 pb-2">
                {section.category}
              </h3>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-text-light">{item.desc}</p>
                    </div>
                    <span className="text-secondary font-medium flex-shrink-0 ml-4">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding pb-section grid grid-cols-3 gap-2">
        {gallery.map((src, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden">
            <Image src={src} alt={`Restaurante ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      <section className="py-section section-padding text-center border-t">
        <Link href="/contacto" className="btn-primary">Reservar Mesa</Link>
      </section>
    </>
  );
}
