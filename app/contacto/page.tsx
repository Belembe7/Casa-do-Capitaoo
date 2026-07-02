'use client';

import { useForm } from 'react-hook-form';
import { HOTEL_INFO } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';
import FormFeedback from '@/components/ui/FormFeedback';
import { useI18n } from '@/lib/i18n/context';
import { useSiteContent } from '@/lib/i18n/hooks';
import { handleApiResponse, notifyValidation, FEEDBACK } from '@/lib/feedback';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactoPage() {
  const { t } = useI18n();
  const p = useSiteContent().pages.contacto;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const { ok } = await handleApiResponse(
      res,
      FEEDBACK.contact.success,
      FEEDBACK.contact.successHint
    );
    if (ok) reset();
  };

  const onInvalid = () => {
    notifyValidation(FEEDBACK.contact.validation, FEEDBACK.contact.validationHint);
  };

  return (
    <>
      <section className="pt-32 pb-12 section-padding">
        <h1 className="font-display text-4xl md:text-6xl mb-12">{p.title}</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal>
            <div className="relative h-80 lg:h-full min-h-[300px] overflow-hidden">
              <iframe
                src={`https://maps.google.com/maps?q=${HOTEL_INFO.coordinates.lat},${HOTEL_INFO.coordinates.lng}&z=15&output=embed`}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                title="Mapa Casa do Capitão"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-secondary mb-2">{p.addressLabel}</h3>
                <p>{HOTEL_INFO.address}</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-secondary mb-2">Informação</h3>
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-secondary transition-colors">
                  {HOTEL_INFO.email}
                </a>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-secondary mb-2">Reservas</h3>
                <a href={`mailto:${HOTEL_INFO.reservationsEmail}`} className="hover:text-secondary transition-colors">
                  {HOTEL_INFO.reservationsEmail}
                </a>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-secondary mb-2">Telemóvel</h3>
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-secondary transition-colors">
                  {HOTEL_INFO.phone}
                </a>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-secondary mb-2">Telefax</h3>
                <a href={`tel:${HOTEL_INFO.fax}`} className="hover:text-secondary transition-colors">
                  {HOTEL_INFO.fax}
                </a>
              </div>
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-green-600 hover:bg-green-700 inline-flex"
              >
                {p.whatsapp}
              </a>
            </div>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4" noValidate>
              <div>
                <input
                  placeholder={`${p.name} *`}
                  aria-invalid={!!errors.name}
                  {...register('name', {
                    required: 'Indique o seu nome.',
                    minLength: { value: 2, message: 'O nome deve ter pelo menos 2 caracteres.' },
                  })}
                  className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-secondary ${
                    errors.name ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
                  }`}
                />
                <FormFeedback
                  message={errors.name?.message}
                  hint={errors.name ? 'Use o nome completo ou como prefere ser tratado.' : undefined}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder={`${p.email} *`}
                  aria-invalid={!!errors.email}
                  {...register('email', {
                    required: 'Indique um email de contacto.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email inválido.',
                    },
                  })}
                  className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-secondary ${
                    errors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
                  }`}
                />
                <FormFeedback
                  message={errors.email?.message}
                  hint={errors.email ? 'Exemplo: oseunome@email.com — usaremos este email para responder.' : undefined}
                />
              </div>
              <div>
                <input
                  placeholder={`${p.subject} *`}
                  aria-invalid={!!errors.subject}
                  {...register('subject', {
                    required: 'Indique o assunto da mensagem.',
                    minLength: { value: 3, message: 'O assunto é demasiado curto.' },
                  })}
                  className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-secondary ${
                    errors.subject ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
                  }`}
                />
                <FormFeedback
                  message={errors.subject?.message}
                  hint={errors.subject ? 'Ex.: Reserva, Informações, Eventos, Reclamação.' : undefined}
                />
              </div>
              <div>
                <textarea
                  placeholder={`${p.message} *`}
                  rows={5}
                  aria-invalid={!!errors.message}
                  {...register('message', {
                    required: 'Escreva a sua mensagem.',
                    minLength: { value: 10, message: 'A mensagem deve ter pelo menos 10 caracteres.' },
                  })}
                  className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-secondary resize-none ${
                    errors.message ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
                  }`}
                />
                <FormFeedback
                  message={errors.message?.message}
                  hint={errors.message ? 'Descreva o seu pedido com o máximo de detalhe possível.' : undefined}
                />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
                {isSubmitting ? t.common.loading : p.sendMessage}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
