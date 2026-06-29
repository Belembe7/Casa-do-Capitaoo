'use client';

import { useForm } from 'react-hook-form';
import FormFeedback from '@/components/ui/FormFeedback';
import { handleApiResponse, notifyValidation, notifyError, FEEDBACK } from '@/lib/feedback';

interface NewsletterFormData {
  email: string;
  terms: boolean;
}

interface NewsletterFormProps {
  onSubmit?: (data: NewsletterFormData) => void;
}

export default function NewsletterForm({ onSubmit }: NewsletterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>();

  const handleFormSubmit = async (data: NewsletterFormData) => {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const { ok } = await handleApiResponse(
      res,
      FEEDBACK.newsletter.success,
      FEEDBACK.newsletter.successHint
    );

    if (ok) {
      onSubmit?.(data);
      reset();
    }
  };

  const onInvalid = () => {
    if (errors.terms) {
      notifyError(FEEDBACK.newsletter.terms, { hint: FEEDBACK.newsletter.termsHint });
    } else if (errors.email) {
      notifyError(FEEDBACK.newsletter.email, { hint: FEEDBACK.newsletter.emailHint });
    } else {
      notifyValidation(FEEDBACK.newsletter.email, FEEDBACK.newsletter.emailHint);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit, onInvalid)} className="space-y-4" noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <input
            type="email"
            placeholder="email@exemplo.com *"
            aria-invalid={!!errors.email}
            {...register('email', {
              required: FEEDBACK.newsletter.email,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: FEEDBACK.newsletter.email,
              },
            })}
            className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-secondary ${
              errors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
            }`}
          />
          <FormFeedback message={errors.email?.message} hint={FEEDBACK.newsletter.emailHint} />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary whitespace-nowrap self-start sm:self-auto"
        >
          {isSubmitting ? 'A subscrever...' : 'Subscrever'}
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs text-text-light cursor-pointer">
        <input
          type="checkbox"
          {...register('terms', { required: FEEDBACK.newsletter.terms })}
          className="mt-0.5"
        />
        <span>
          Aceito os{' '}
          <a href="/aviso-legal" className="underline hover:text-secondary">
            termos e condições
          </a>{' '}
          de uso *
        </span>
      </label>
      <FormFeedback message={errors.terms?.message} hint={FEEDBACK.newsletter.termsHint} />
    </form>
  );
}
