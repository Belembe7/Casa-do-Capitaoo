import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center section-padding text-center">
      <h1 className="font-display text-6xl mb-4">404</h1>
      <p className="text-text-light mb-8">A página que procura não foi encontrada.</p>
      <Link href="/" className="btn-primary">
        Voltar ao início
      </Link>
    </section>
  );
}
