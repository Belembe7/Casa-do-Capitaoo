'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RevealLinesText from '@/components/ui/RevealLinesText';
import { useI18n } from '@/lib/i18n/context';

export default function HotelIntro() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [showCta, setShowCta] = useState(false);
  const handleFirstReveal = useCallback(() => setShowCta(true), []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height + window.innerHeight);
      const translateY = scrollProgress * 100;
      bgRef.current.style.transform = `translateY(${translateY * 0.2}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 parallax-bg overflow-hidden">
        <Image
          src="/images/hotel-intro-bg.png"
          alt="Hotel Casa Do Capitão — fachada em Inhambane"
          fill
          priority
          className="object-cover object-[center_32%] scale-[0.96] origin-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      </div>

      <div className="relative z-10 section-padding py-12 md:py-16 text-center max-w-3xl mx-auto w-full px-6 md:px-10">
        <div className="mx-auto max-w-2xl rounded-xl bg-black/45 px-5 py-6 md:px-8 md:py-7 backdrop-blur-sm border border-white/10">
          <RevealLinesText
            text={t.home.introSubtitle}
            onFirstComplete={handleFirstReveal}
            loop
            stagger={1.75}
            duration={2}
            holdDuration={3.5}
            fadeOutDuration={1.4}
            className="space-y-4 md:space-y-5 min-h-[7rem] md:min-h-[6rem]"
            lineClassName="font-body text-base md:text-lg text-white/95 font-light leading-relaxed [text-shadow:0_1px_10px_rgba(0,0,0,0.75)]"
          />
        </div>

        <Link
          href="/o-hotel"
          className={`inline-block mt-8 font-body text-white/90 text-xs uppercase tracking-[0.2em] border-b border-white/60 pb-1 hover:border-secondary hover:text-secondary transition-all duration-700 ${
            showCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          {t.home.introCta}
        </Link>
      </div>
    </section>
  );
}
