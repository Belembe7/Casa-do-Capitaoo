import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogSectionHeaderProps {
  title: string;
  cta?: { label: string; href: string };
}

export default function BlogSectionHeader({ title, cta }: BlogSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 md:mb-10">
      <h2 className="font-display text-[1.75rem] md:text-[2rem] font-bold tracking-[-0.02em] text-primary">
        {title}
      </h2>
      {cta && (
        <Link
          href={cta.href}
          className="inline-flex w-fit items-center gap-2 text-[11px] font-body font-medium uppercase tracking-[0.18em] text-primary transition-colors hover:text-secondary"
        >
          {cta.label}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
