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
  const { locale } = useI18n();
  const meta = formatBlogMeta(post, locale);

  return (
    <article className="group w-full border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
      <Link
        href={`/blog/${post.slug}`}
        className="flex gap-5 md:gap-6"
      >
        <div className="relative h-[88px] w-[88px] flex-shrink-0 overflow-hidden rounded-xl bg-[#f3f1ed] md:h-[96px] md:w-[96px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="96px"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-0.5">
          <span className="text-[10px] font-body font-medium uppercase tracking-[0.22em] text-secondary">
            {post.category}
          </span>

          <h3 className="font-display text-[1.05rem] md:text-[1.125rem] font-normal leading-[1.35] tracking-[-0.01em] text-primary transition-colors duration-300 group-hover:text-secondary line-clamp-2">
            {post.title}
          </h3>

          <p className="font-body text-[11px] uppercase tracking-[0.12em] text-text-light">
            {meta}
          </p>
        </div>
      </Link>
    </article>
  );
}
