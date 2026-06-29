import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies',
};

export default function PoliticaCookiesPage() {
  return (
    <section className="pt-32 pb-section section-padding max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Política de Cookies</h1>
      <p className="text-text-light leading-relaxed mb-4">
        Este website utiliza cookies para melhorar a experiência do utilizador,
        analisar o tráfego e personalizar conteúdo. Ao continuar a navegar,
        aceita a utilização de cookies conforme descrito nesta política.
      </p>
      <h2 className="font-display text-xl mt-8 mb-4">Tipos de Cookies</h2>
      <ul className="text-text-light space-y-2 list-disc ml-6">
        <li>Cookies essenciais — necessários para o funcionamento do site</li>
        <li>Cookies analíticos — Google Analytics para estatísticas de uso</li>
        <li>Cookies de preferências — idioma e configurações do utilizador</li>
      </ul>
    </section>
  );
}
