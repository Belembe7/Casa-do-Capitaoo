'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

interface SearchResult {
  title: string;
  url: string;
  type: string;
  excerpt: string;
}

export default function PesquisaPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.results || []);
    setSearched(true);
  };

  return (
    <section className="pt-32 pb-section section-padding max-w-3xl mx-auto">
      <h1 className="font-display text-4xl md:text-5xl mb-8">Pesquisar</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-12">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar quartos, ofertas, blog..."
          className="flex-1 border border-gray-300 px-4 py-3 focus:outline-none focus:border-secondary"
        />
        <button type="submit" className="btn-primary px-6">
          <Search size={18} />
        </button>
      </form>

      {searched && results.length === 0 && (
        <p className="text-text-light">Nenhum resultado encontrado para &ldquo;{query}&rdquo;.</p>
      )}

      <div className="space-y-6">
        {results.map((result) => (
          <Link
            key={result.url}
            href={result.url}
            className="block border-b border-gray-200 pb-6 hover:text-secondary transition-colors"
          >
            <span className="text-xs uppercase tracking-widest text-secondary">
              {result.type}
            </span>
            <h3 className="font-display text-xl mt-1">{result.title}</h3>
            <p className="text-sm text-text-light mt-1">{result.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
