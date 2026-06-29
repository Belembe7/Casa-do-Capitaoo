import { NextResponse } from 'next/server';
import { rooms } from '@/lib/data/rooms';
import { offers } from '@/lib/data/offers';
import { blogPosts } from '@/lib/data/blog-posts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const results: { title: string; url: string; type: string; excerpt: string }[] = [];

  rooms.forEach((room) => {
    if (
      room.name.toLowerCase().includes(q) ||
      room.description.toLowerCase().includes(q) ||
      room.category.toLowerCase().includes(q)
    ) {
      results.push({
        title: room.name,
        url: `/quartos/${room.slug}`,
        type: 'Quarto',
        excerpt: room.shortDescription,
      });
    }
  });

  offers.forEach((offer) => {
    if (
      offer.title.toLowerCase().includes(q) ||
      offer.description.toLowerCase().includes(q)
    ) {
      results.push({
        title: offer.title,
        url: `/ofertas/${offer.slug}`,
        type: 'Oferta',
        excerpt: offer.description,
      });
    }
  });

  blogPosts.forEach((post) => {
    if (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q)
    ) {
      results.push({
        title: post.title,
        url: `/blog/${post.slug}`,
        type: 'Blog',
        excerpt: post.excerpt,
      });
    }
  });

  const staticPages = [
    { title: 'O Hotel', url: '/o-hotel', type: 'Página', excerpt: 'Sobre o hotel Casa do Capitão' },
    { title: 'Restaurante', url: '/restaurante', type: 'Página', excerpt: 'Restaurante Capitão' },
    { title: 'Rooftop Bar', url: '/rooftop', type: 'Página', excerpt: 'Bar no terraço com vista para o mar' },
    { title: 'Serviços', url: '/servicos', type: 'Página', excerpt: 'Serviços do hotel' },
    { title: 'Contacto', url: '/contacto', type: 'Página', excerpt: 'Contacte-nos' },
  ];

  staticPages.forEach((page) => {
    if (page.title.toLowerCase().includes(q) || page.excerpt.toLowerCase().includes(q)) {
      results.push(page);
    }
  });

  return NextResponse.json({ results });
}
