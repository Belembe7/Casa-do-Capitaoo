'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  speed?: number;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  as: Tag = 'p',
  className = '',
  speed = 24,
  onComplete,
}: TypewriterTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    setDisplayed('');
    setDone(false);

    const timer = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
        setDone(true);
        onComplete?.();
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [isInView, text, speed, onComplete]);

  return (
    <div ref={ref}>
      <Tag className={className}>
        {displayed}
        {!done && (
          <span className="inline-block w-[2px] h-[1em] ml-0.5 align-middle bg-white/70 animate-pulse" />
        )}
      </Tag>
    </div>
  );
}
