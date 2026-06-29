'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedText from '@/components/ui/AnimatedText';
import { useI18n } from '@/lib/i18n/context';

export default function HotelIntro() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height + window.innerHeight);
      const translateY = scrollProgress * 100;
      bgRef.current.style.transform = `translateY(${translateY * 0.3}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 parallax-bg scale-110">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="Casa do Capitão"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 section-padding py-section text-center max-w-4xl mx-auto">
        <AnimatedText
          text={t.home.introTitle}
          as="h2"
          className="text-3xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight"
        />
        <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light mb-10 max-w-3xl mx-auto">
          {t.home.introSubtitle}
        </p>
        <Link
          href="/o-hotel"
          className="inline-block text-white text-sm uppercase tracking-[0.2em] border-b border-white/50 pb-1 hover:border-secondary hover:text-secondary transition-all duration-base"
        >
          {t.home.introCta}
        </Link>
      </div>
    </section>
  );
}
