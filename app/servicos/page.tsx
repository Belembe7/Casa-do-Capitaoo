import type { Metadata } from 'next';
import {
  Waves, Wifi, UtensilsCrossed, Wine, Car, Shirt, Plane, Users,
} from 'lucide-react';
import { services } from '@/lib/data/content';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Todos os serviços oferecidos pela Casa do Capitão.',
};

const iconMap: Record<string, React.ReactNode> = {
  Waves: <Waves size={28} />,
  Wifi: <Wifi size={28} />,
  UtensilsCrossed: <UtensilsCrossed size={28} />,
  Wine: <Wine size={28} />,
  Car: <Car size={28} />,
  Shirt: <Shirt size={28} />,
  Plane: <Plane size={28} />,
  Users: <Users size={28} />,
};

export default function ServicosPage() {
  return (
    <section className="pt-32 pb-section section-padding">
      <h1 className="font-display text-4xl md:text-6xl mb-4">Serviços</h1>
      <p className="text-text-light max-w-2xl mb-12">
        Tudo o que precisa para uma estadia perfeita em Inhambane.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, i) => (
          <ScrollReveal key={service.title} delay={i * 0.1}>
            <div className="border border-gray-200 p-8 hover:border-secondary transition-colors h-full">
              <div className="text-secondary mb-4">
                {iconMap[service.icon]}
              </div>
              <h3 className="font-display text-xl mb-2">{service.title}</h3>
              <p className="text-sm text-text-light">{service.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
