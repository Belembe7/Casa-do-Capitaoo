'use client';

import type { LucideIcon } from 'lucide-react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface ContactFloatingFieldProps {
  id: string;
  label: string;
  icon: LucideIcon;
  register: UseFormRegisterReturn;
  error?: boolean;
  type?: string;
  multiline?: boolean;
}

export default function ContactFloatingField({
  id,
  label,
  icon: Icon,
  register,
  error,
  type = 'text',
  multiline,
}: ContactFloatingFieldProps) {
  const fieldClass = [
    'contact-field',
    multiline && 'contact-field--textarea',
    error && 'contact-field--error',
  ]
    .filter(Boolean)
    .join(' ');

  const labelClass = ['contact-field-label', multiline && 'contact-field-label--textarea']
    .filter(Boolean)
    .join(' ');

  const iconClass = ['contact-field-icon', multiline && 'contact-field-icon--textarea']
    .filter(Boolean)
    .join(' ');

  return (
    <div className="contact-field-wrap">
      <div className="relative">
        <Icon className={iconClass} size={18} strokeWidth={1.5} aria-hidden />
        {multiline ? (
          <textarea
            id={id}
            placeholder=" "
            aria-invalid={error ? 'true' : 'false'}
            className={fieldClass}
            {...register}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder=" "
            aria-invalid={error ? 'true' : 'false'}
            className={fieldClass}
            {...register}
          />
        )}
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      </div>
    </div>
  );
}
