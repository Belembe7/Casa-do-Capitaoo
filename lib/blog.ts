import type { BlogPost } from '@/lib/data/blog-posts';
import { formatDate } from '@/lib/utils';

export function estimateReadTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getPostReadTime(post: BlogPost): number {
  const text = `${post.title} ${post.excerpt} ${post.content}`;
  return estimateReadTime(text);
}

export function formatBlogMeta(
  post: BlogPost,
  locale: string,
  minReadLabel: string
): string {
  const date = formatDate(post.publishedAt, locale);
  const minutes = getPostReadTime(post);
  return `${date} · ${minutes} ${minReadLabel}`;
}
