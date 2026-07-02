'use client';

import { galleryCategories } from '@/lib/data/content';

interface GalleryFilterProps {
  activeFilter: string;
  onFilterChange: (slug: string) => void;
}

export default function GalleryFilter({ activeFilter, onFilterChange }: GalleryFilterProps) {
  return (
    <div
      className="flex flex-wrap gap-2 md:gap-3"
      role="tablist"
      aria-label="Filtrar galeria por categoria"
    >
      {galleryCategories.map((cat) => {
        const isActive = activeFilter === cat.slug;
        return (
          <button
            key={cat.slug}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(cat.slug)}
            className={`rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
              isActive
                ? 'bg-primary text-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]'
                : 'border border-gray-200 bg-white/80 text-text-light hover:border-primary/40 hover:text-primary'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
