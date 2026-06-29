import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
      <div className="relative h-[50vh] overflow-hidden">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="section-padding max-w-3xl mx-auto py-section">
        <span className="text-xs uppercase tracking-[0.2em] text-secondary">
          {post.category}
        </span>
        <h1 className="font-display text-3xl md:text-5xl mt-4 mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-sm text-text-light mb-8">
          {formatDate(post.publishedAt)}
        </p>

        <div className="prose prose-lg max-w-none text-text-light leading-relaxed">
          {post.content.split('\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={i} className="font-display text-2xl text-primary mt-8 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('- ')) {
              return (
                <li key={i} className="ml-4 mb-2">
                  {paragraph.replace('- ', '')}
                </li>
              );
            }
            if (paragraph.trim()) {
              return <p key={i} className="mb-4">{paragraph}</p>;
            }
            return null;
          })}
        </div>

        <div className="mt-12 pt-8 border-t">
          <Link href="/blog" className="text-sm uppercase tracking-widest link-underline">
            &larr; Voltar ao Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
