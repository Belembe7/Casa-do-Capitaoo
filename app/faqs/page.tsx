import type { Metadata } from 'next';
import { faqs } from '@/lib/data/content';

export const metadata: Metadata = {
  title: 'Perguntas Frequentes',
  description: 'Respostas às perguntas mais frequentes sobre a Casa do Capitão.',
};

export default function FAQsPage() {
  return (
    <section className="pt-32 pb-section section-padding max-w-3xl mx-auto">
      <h1 className="font-display text-4xl md:text-5xl mb-12">FAQs</h1>
      <div className="space-y-6">
        {faqs.map((faq) => (
          <details key={faq.id} className="border-b border-gray-200 pb-6 group">
            <summary className="font-display text-lg cursor-pointer list-none flex justify-between items-center">
              {faq.question}
              <span className="text-secondary text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-text-light mt-4 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
