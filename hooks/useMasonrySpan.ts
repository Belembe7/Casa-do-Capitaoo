'use client';

import { useEffect, useRef, useState } from 'react';

export const MASONRY_ROW_HEIGHT = 6;
export const MASONRY_GAP = 14;

export function estimateRowSpan(width: number, height: number, columnWidth = 280): number {
  const itemHeight = (columnWidth * height) / width;
  return Math.max(
    Math.ceil((itemHeight + MASONRY_GAP) / (MASONRY_ROW_HEIGHT + MASONRY_GAP)),
    10
  );
}

export function useMasonryRowSpan(width: number, height: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [rowSpan, setRowSpan] = useState(() => estimateRowSpan(width, height));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const columnWidth = el.offsetWidth;
      if (columnWidth <= 0) return;
      setRowSpan(estimateRowSpan(width, height, columnWidth));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width, height]);

  return {
    ref,
    rowSpan,
    style: { gridRowEnd: `span ${rowSpan}` } as const,
  };
}
