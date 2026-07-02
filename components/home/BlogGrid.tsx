'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import BlogSectionHeader from '@/components/blog/BlogSectionHeader';
import BlogFeaturedPost from '@/components/blog/BlogFeaturedPost';
import BlogListItem from '@/components/blog/BlogListItem';
import BlogHighlights from '@/components/blog/BlogHighlights';
import { blogPosts } from '@/lib/data/blog-posts';
import { useI18n } from '@/lib/i18n/context';
import {
  staggerContainerVariants,
  staggerInViewOptions,
  staggerItemVariants,
} from '@/lib/animations/staggeredEntry';

export default function BlogGrid() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, staggerInViewOptions);

  const featured = blogPosts[0];
  const listPosts = blogPosts.slice(1, 4);

  return (
    <section className="py-section section-padding bg-white">
      <div ref={sectionRef}>
        <BlogSectionHeader
          title={t.home.blogLatestTitle}
          cta={{ label: t.home.blogCta, href: '/blog' }}
        />

        <motion.div
          className="grid gap-10 lg:grid-cols-5 lg:gap-12 xl:gap-14"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            variants={staggerItemVariants(0)}
            className="lg:col-span-3 lg:row-span-3"
          >
            <BlogFeaturedPost post={featured} />
          </motion.div>

          {listPosts.length > 0 && (
            <motion.div
              variants={staggerItemVariants(1)}
              className="flex flex-col gap-8 lg:col-span-2 lg:justify-center"
            >
              {listPosts.map((post) => (
                <BlogListItem key={post.slug} post={post} />
              ))}
            </motion.div>
          )}
        </motion.div>

        <BlogHighlights animate={isInView} />
      </div>
    </section>
  );
}
