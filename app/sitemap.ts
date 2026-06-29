import type { MetadataRoute } from 'next';
import { rooms } from '@/lib/data/rooms';
import { offers } from '@/lib/data/offers';
import { blogPosts } from '@/lib/data/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://casadocapitao.co.mz';

  const staticPages = [
    '', '/quartos', '/o-hotel', '/rooftop', '/galeria', '/ofertas',
    '/blog', '/contacto', '/sobre-nos', '/servicos', '/restaurante',
    '/reservar', '/faqs', '/pesquisa',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const roomPages = rooms.map((room) => ({
    url: `${baseUrl}/quartos/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const offerPages = offers.map((offer) => ({
    url: `${baseUrl}/ofertas/${offer.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...roomPages, ...offerPages, ...blogPages];
}
