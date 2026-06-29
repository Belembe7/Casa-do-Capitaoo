'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import BlogSectionHeader from '@/components/blog/BlogSectionHeader';
import BlogFeaturedPost from '@/components/blog/BlogFeaturedPost';
import BlogListItem from '@/components/blog/BlogListItem';
import BlogHighlights from '@/components/blog/BlogHighlights';
import { getBlogPostsByCategory } from '@/lib/data/blog-posts';
import { useI18n } from '@/lib/i18n/context';
import { useSiteContent } from '@/lib/i18n/hooks';
import {
  staggerContainerVariants,
  staggerInViewOptions,
  staggerItemVariants,
} from '@/lib/animations/staggeredEntry';

const categories = ['todos', 'História', 'Excursão', 'Gastronomia', 'Destino', 'Eventos'];

export default function BlogPage() {
  const { t } = useI18n();
  const content = useSiteContent();
  const [category, setCategory] = useState('todos');
  const posts = getBlogPostsByCategory(category);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, staggerInViewOptions);

  const featured = posts[0];
  const listPosts = posts.slice(1, 4);
  const morePosts = posts.slice(4);
  const showMagazineLayout = posts.length >= 2;

  return (
    <section className="pt-32 pb-section section-padding">
      <div className="mb-10 md:mb-14">
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          {content.pages.blog.title}
        </h1>
        <p className="text-text-light max-w-2xl text-lg leading-relaxed">
          {content.pages.blog.intro}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider border transition-all ${
              category === cat
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 text-text-light hover:border-gray-300'
            }`}
          >
            {cat === 'todos' ? 'Todos' : cat}
          </button>
        ))}
      </div>

      <div ref={sectionRef} key={category}>
        {showMagazineLayout ? (
          <>
            <BlogSectionHeader title={t.home.blogLatestTitle} />

            <motion.div
              className="grid gap-8 lg:grid-cols-5 lg:gap-10 xl:gap-12"
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

              {listPosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  variants={staggerItemVariants(i + 1)}
                  className="flex items-center lg:col-span-2"
                >
                  <BlogListItem post={post} />
                </motion.div>
              ))}
            </motion.div>

            {morePosts.length > 0 && (
              <motion.div
                className="mt-12 md:mt-16 pt-12 border-t border-gray-200 grid gap-8 sm:grid-cols-2"
                variants={staggerContainerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                {morePosts.map((post, i) => (
                  <motion.div key={post.slug} variants={staggerItemVariants(i + 4)}>
                    <BlogListItem post={post} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {category === 'todos' && <BlogHighlights animate={isInView} />}
          </>
        ) : (
          <motion.div
            className="max-w-xl"
            variants={staggerContainerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {posts.map((post, i) => (
              <motion.div key={post.slug} variants={staggerItemVariants(i)} className="mb-8">
                <BlogListItem post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
