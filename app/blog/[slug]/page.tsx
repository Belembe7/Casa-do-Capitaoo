import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogPostAnimatedContent from '@/components/blog/BlogPostAnimatedContent';
import { getBlogPostBySlug, blogPosts } from '@/lib/data/blog-posts';
import { formatDate } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Artigo não encontrado' };
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="pt-20">
      <div className="section-padding pt-8 pb-4">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={post.coverWidth ?? 800}
          height={post.coverHeight ?? 533}
          className="w-full h-auto max-w-4xl mx-auto block rounded-2xl"
          priority
          sizes="100vw"
        />
      </div>

      <div className="section-padding max-w-3xl mx-auto py-section">
        <span className="text-xs uppercase tracking-[0.2em] text-secondary">
          {post.category}
        </span>
        <h1 className="font-display text-3xl md:text-5xl mt-4 mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-sm text-text-light mb-10">
          {formatDate(post.publishedAt)}
        </p>

        <BlogPostAnimatedContent content={post.content} />

        <div className="mt-12 pt-8 border-t">
          <Link href="/blog" className="text-sm uppercase tracking-widest link-underline">
            &larr; Voltar ao Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
