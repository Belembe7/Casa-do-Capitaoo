'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import type { BlogPost } from '@/lib/data/blog-posts';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  index?: number;
  staggered?: boolean;
}

export default function BlogCard({
  post,
  featured = false,
  index = 0,
  staggered = false,
}: BlogCardProps) {
  const { t } = useI18n();

  const content = (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <div
        className={`relative overflow-hidden mb-4 ${
          featured ? 'aspect-[4/5] md:aspect-auto md:h-full md:min-h-[400px]' : 'aspect-[4/3]'
        }`}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-slow group-hover:scale-105"
          sizes={featured ? '50vw' : '25vw'}
        />
      </div>
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-secondary">
          {post.category}
        </span>
        <h3
          className={`font-display leading-tight group-hover:text-secondary transition-colors ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
        >
          {post.title}
        </h3>
        <span className="inline-block text-xs uppercase tracking-widest link-underline pt-2">
          {t.common.learnMore}
        </span>
      </div>
    </Link>
  );

  if (staggered) {
    return (
      <article className={`group h-full ${featured ? 'md:row-span-2' : ''}`}>
        {content}
      </article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`group ${featured ? 'md:row-span-2' : ''}`}
    >
      {content}
    </motion.article>
  );
}
