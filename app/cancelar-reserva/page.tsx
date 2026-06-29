'use client';

import { useState } from 'react';
import FormFeedback from '@/components/ui/FormFeedback';
import { handleApiResponse, notifyError, FEEDBACK } from '@/lib/feedback';

export default function CancelarReservaPage() {
  const [bookingNumber, setBookingNumber] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCancel = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError('');

    const trimmed = bookingNumber.trim();
    if (!trimmed) {
      setFieldError(FEEDBACK.cancel.empty);
      notifyError(FEEDBACK.cancel.empty, { hint: FEEDBACK.cancel.emptyHint });
      return;
    }

    setLoading(true);
    const res = await fetch('/api/bookings/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingNumber: trimmed }),
    });

    const { ok } = await handleApiResponse(
      res,
      FEEDBACK.cancel.success,
      FEEDBACK.cancel.successHint
    );

    if (ok) setBookingNumber('');
    setLoading(false);
  };

  return (
    <section className="pt-32 pb-section section-padding max-w-lg mx-auto">
      <h1 className="font-display text-4xl mb-4">Cancelar Reserva</h1>
      <p className="text-text-light mb-8">
        Introduza o número da sua reserva para cancelar. Cancelamento gratuito até 48h antes do check-in.
      </p>

      <form onSubmit={handleCancel} className="space-y-4" noValidate>
        <div>
          <input
            type="text"
            value={bookingNumber}
            onChange={(e) => {
              setBookingNumber(e.target.value);
              setFieldError('');
            }}
            placeholder="Ex: CC-XXXXX-XXXX"
            aria-invalid={!!fieldError}
            className={`w-full border px-4 py-3 focus:outline-none focus:border-secondary ${
              fieldError ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
            }`}
          />
          <FormFeedback
            message={fieldError}
            hint={fieldError ? FEEDBACK.cancel.emptyHint : undefined}
          />
          {!fieldError && (
            <p className="text-xs text-text-light mt-1.5">
              O número está no email de confirmação enviado após a reserva.
            </p>
          )}
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'A processar...' : 'Cancelar Reserva'}
        </button>
      </form>
    </section>
  );
}
