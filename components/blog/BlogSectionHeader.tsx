import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogSectionHeaderProps {
  title: string;
  cta?: { label: string; href: string };
}

export default function BlogSectionHeader({ title, cta }: BlogSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 md:mb-10">
      <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-primary">
        {title}
      </h2>
      {cta && (
        <Link
          href={cta.href}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          {cta.label}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
