'use client';

import { useForm } from 'react-hook-form';
import {
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
  FileText,
} from 'lucide-react';
import { HOTEL_INFO } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';
import FormFeedback from '@/components/ui/FormFeedback';
import ContactFloatingField from '@/components/contact/ContactFloatingField';
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
    <section className="contact-page min-h-screen pt-32 pb-section section-padding">
      <h1 className="font-display text-4xl md:text-6xl mb-10 md:mb-14">{p.title}</h1>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        <ScrollReveal className="h-full">
          <div className="contact-card h-full min-h-[420px] lg:min-h-[720px]">
            <iframe
              src={`https://maps.google.com/maps?q=${HOTEL_INFO.coordinates.lat},${HOTEL_INFO.coordinates.lng}&z=15&output=embed`}
              className="h-full w-full min-h-[420px] lg:min-h-[720px] border-0"
              loading="lazy"
              title="Mapa Casa do Capitão"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="h-full">
          <div className="contact-card contact-form-card h-full flex flex-col">
            <div className="mb-8">
              <h2 className="font-display text-3xl md:text-4xl text-text-main mb-3">
                {p.formTitle}
              </h2>
              <p className="text-text-light leading-relaxed">{p.formSubtitle}</p>
              <p className="mt-2 text-sm font-medium text-[#B8955A]">{p.responseTime}</p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={`mailto:${HOTEL_INFO.email}`}
                className="contact-channel"
              >
                <Mail size={16} strokeWidth={1.5} className="text-[#B8955A]" aria-hidden />
                {p.emailLabel}
              </a>
              <a href={`tel:${HOTEL_INFO.phoneTel}`} className="contact-channel">
                <Phone size={16} strokeWidth={1.5} className="text-[#B8955A]" aria-hidden />
                {p.phoneLabel}
              </a>
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel"
              >
                <MessageSquare size={16} strokeWidth={1.5} className="text-[#B8955A]" aria-hidden />
                {p.whatsapp}
              </a>
            </div>

            <div className="space-y-4 mb-8 pb-8">
              <div className="contact-info-item">
                <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#B8955A]" aria-hidden />
                <div>
                  <p className="font-medium text-text-main">{p.addressLabel}</p>
                  <p>{HOTEL_INFO.address}</p>
                </div>
              </div>
              <div className="contact-info-item">
                <Phone size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#B8955A]" aria-hidden />
                <a href={`tel:${HOTEL_INFO.landlineTel}`} className="hover:text-[#B8955A] transition-colors duration-base">
                  TEL. {HOTEL_INFO.landline}
                </a>
              </div>
              <div className="contact-info-item">
                <Phone size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#B8955A]" aria-hidden />
                <a
                  href={`tel:${HOTEL_INFO.phoneTel}`}
                  className="hover:text-[#B8955A] transition-colors duration-base"
                >
                  CEL. {HOTEL_INFO.phone}
                </a>
              </div>
              <div className="contact-info-item">
                <Mail size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#B8955A]" aria-hidden />
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="hover:text-[#B8955A] transition-colors duration-base"
                >
                  {HOTEL_INFO.email}
                </a>
              </div>
              <div className="contact-info-item">
                <Clock size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#B8955A]" aria-hidden />
                <p>{p.receptionHours}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-5 flex-1" noValidate>
              <div>
                <ContactFloatingField
                  id="contact-name"
                  label={p.name}
                  icon={User}
                  error={!!errors.name}
                  register={register('name', {
                    required: 'Indique o seu nome.',
                    minLength: { value: 2, message: 'O nome deve ter pelo menos 2 caracteres.' },
                  })}
                />
                <FormFeedback
                  message={errors.name?.message}
                  hint={errors.name ? 'Use o nome completo ou como prefere ser tratado.' : undefined}
                />
              </div>

              <div>
                <ContactFloatingField
                  id="contact-email"
                  label={p.email}
                  icon={Mail}
                  type="email"
                  error={!!errors.email}
                  register={register('email', {
                    required: 'Indique um email de contacto.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email inválido.',
                    },
                  })}
                />
                <FormFeedback
                  message={errors.email?.message}
                  hint={
                    errors.email
                      ? 'Exemplo: oseunome@email.com — usaremos este email para responder.'
                      : undefined
                  }
                />
              </div>

              <div>
                <ContactFloatingField
                  id="contact-subject"
                  label={p.subject}
                  icon={FileText}
                  error={!!errors.subject}
                  register={register('subject', {
                    required: 'Indique o assunto da mensagem.',
                    minLength: { value: 3, message: 'O assunto é demasiado curto.' },
                  })}
                />
                <FormFeedback
                  message={errors.subject?.message}
                  hint={errors.subject ? 'Ex.: Reserva, Informações, Eventos, Reclamação.' : undefined}
                />
              </div>

              <div>
                <ContactFloatingField
                  id="contact-message"
                  label={p.message}
                  icon={MessageSquare}
                  multiline
                  error={!!errors.message}
                  register={register('message', {
                    required: 'Escreva a sua mensagem.',
                    minLength: { value: 10, message: 'A mensagem deve ter pelo menos 10 caracteres.' },
                  })}
                />
                <FormFeedback
                  message={errors.message?.message}
                  hint={
                    errors.message ? 'Descreva o seu pedido com o máximo de detalhe possível.' : undefined
                  }
                />
              </div>

              <div className="pt-2">
                <button type="submit" disabled={isSubmitting} className="contact-submit-btn">
                  {isSubmitting ? t.common.loading : p.sendMessage}
                </button>
                <p className="mt-4 text-center text-xs text-text-light leading-relaxed">
                  {p.submitNote}
                </p>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
