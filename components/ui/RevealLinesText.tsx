'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealLinesTextProps {
  text: string;
  className?: string;
  lineClassName?: string;
  stagger?: number;
  duration?: number;
  holdDuration?: number;
  fadeOutDuration?: number;
  loop?: boolean;
  onFirstComplete?: () => void;
}

function splitIntoLines(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  if (!sentences) return [text];
  return sentences.map((line) => line.trim()).filter(Boolean);
}

export default function RevealLinesText({
  text,
  className = '',
  lineClassName = '',
  stagger = 1.6,
  duration = 1.8,
  holdDuration = 3,
  fadeOutDuration = 1.2,
  loop = true,
  onFirstComplete,
}: RevealLinesTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const lines = splitIntoLines(text);

  const [visibleCount, setVisibleCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [cycle, setCycle] = useState(0);
  const firstCompleteRef = useRef(false);

  useEffect(() => {
    if (!isInView) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    const clearTimers = () => {
      timers.forEach(clearTimeout);
      timers.length = 0;
    };

    const runCycle = () => {
      if (cancelled) return;

      clearTimers();
      setFadeOut(false);
      setVisibleCount(0);
      setCycle((c) => c + 1);

      lines.forEach((_, index) => {
        schedule(() => {
          if (!cancelled) setVisibleCount(index + 1);
        }, index * stagger * 1000);
      });

      const revealEndMs = ((lines.length - 1) * stagger + duration) * 1000;

      schedule(() => {
        if (!cancelled && !firstCompleteRef.current) {
          firstCompleteRef.current = true;
          onFirstComplete?.();
        }
      }, revealEndMs);

      schedule(() => {
        if (!cancelled) setFadeOut(true);
      }, revealEndMs + holdDuration * 1000);

      if (loop) {
        schedule(() => {
          if (!cancelled) runCycle();
        }, revealEndMs + holdDuration * 1000 + fadeOutDuration * 1000);
      }
    };

    runCycle();

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [
    isInView,
    text,
    lines.length,
    stagger,
    duration,
    holdDuration,
    fadeOutDuration,
    loop,
    onFirstComplete,
  ]);

  return (
    <div ref={ref} className={className} aria-live="polite">
      {lines.map((line, i) => {
        const isVisible = i < visibleCount;
        return (
          <motion.p
            key={`${cycle}-${i}`}
            initial={false}
            animate={{
              opacity: isVisible && !fadeOut ? 1 : 0,
              y: isVisible && !fadeOut ? 0 : 14,
            }}
            transition={{
              duration: fadeOut ? fadeOutDuration : duration,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={lineClassName}
          >
            {line}
          </motion.p>
        );
      })}
    </div>
  );
}
