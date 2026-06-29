import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal',
};

export default function AvisoLegalPage() {
  return (
    <section className="pt-32 pb-section section-padding max-w-3xl mx-auto prose">
      <h1 className="font-display text-4xl mb-8">Aviso Legal</h1>
      <p className="text-text-light leading-relaxed mb-4">
        A Casa do Capitão, Lda. é responsável pelo conteúdo deste website.
        Todos os direitos reservados. O conteúdo, design e imagens são propriedade
        da Casa do Capitão e não podem ser reproduzidos sem autorização prévia.
      </p>
      <p className="text-text-light leading-relaxed">
        Para questões legais, contacte-nos em info@casadocapitao.co.mz.
      </p>
    </section>
  );
}
