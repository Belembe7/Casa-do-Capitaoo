'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/data/blog-posts';
import { formatBlogMeta } from '@/lib/blog';
import { useI18n } from '@/lib/i18n/context';

interface BlogFeaturedPostProps {
  post: BlogPost;
}

export default function BlogFeaturedPost({ post }: BlogFeaturedPostProps) {
  const { locale } = useI18n();
  const meta = formatBlogMeta(post, locale);

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="mb-6 overflow-hidden rounded-2xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={post.coverWidth ?? 800}
            height={post.coverHeight ?? 533}
            className="w-full h-auto block"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>

        <div className="space-y-4 max-w-2xl">
          <span className="inline-block text-[11px] font-body font-medium uppercase tracking-[0.22em] text-secondary">
            {post.category}
          </span>

          <h3 className="font-display text-[1.625rem] md:text-[2rem] font-normal leading-[1.25] tracking-[-0.01em] text-primary transition-colors duration-300 group-hover:text-secondary">
            {post.title}
          </h3>

          <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-light">
            {meta}
          </p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-[15px] md:text-base font-light leading-[1.8] text-text-main/75 line-clamp-4 md:line-clamp-5"
          >
            {post.excerpt}
          </motion.p>
        </div>
      </Link>
    </article>
  );
}
