'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/data/blog-posts';
import { formatBlogMeta } from '@/lib/blog';
import { useI18n } from '@/lib/i18n/context';

interface BlogFeaturedPostProps {
  post: BlogPost;
}

export default function BlogFeaturedPost({ post }: BlogFeaturedPostProps) {
  const { locale, t } = useI18n();
  const meta = formatBlogMeta(post, locale, t.common.minRead);

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-3xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-sky-600">
            {post.category}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight text-primary transition-colors group-hover:text-sky-700">
            {post.title}
          </h3>
          <p className="text-sm text-text-light">{meta}</p>
          <p className="text-base leading-relaxed text-gray-600 line-clamp-2 md:line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
