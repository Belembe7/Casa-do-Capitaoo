'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/data/blog-posts';
import { formatBlogMeta } from '@/lib/blog';
import { useI18n } from '@/lib/i18n/context';

interface BlogListItemProps {
  post: BlogPost;
}

export default function BlogListItem({ post }: BlogListItemProps) {
  const { locale, t } = useI18n();
  const meta = formatBlogMeta(post, locale, t.common.minRead);

  return (
    <article className="group">
      <Link
        href={`/blog/${post.slug}`}
        className="flex gap-4 md:gap-5"
      >
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl md:h-28 md:w-28">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="112px"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 py-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-sky-600">
            {post.category}
          </span>
          <h3 className="font-display text-base md:text-lg font-semibold leading-snug text-primary transition-colors group-hover:text-sky-700 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs text-text-light">{meta}</p>
        </div>
      </Link>
    </article>
  );
}
