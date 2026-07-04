'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSiteContent } from '@/lib/i18n/hooks';

export default function OHotelIntro() {
  const intro = useSiteContent().pages.oHotel.intro;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const paragraphs = intro.split(/(?<=\.)\s+/).filter(Boolean);

  return (
    <div ref={ref} className="space-y-5 md:space-y-6">
      {paragraphs.map((paragraph, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.18,
          }}
          className="text-lg md:text-xl leading-relaxed text-text-light font-light"
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );
}
