'use client';

import { useEffect } from 'react';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  onConfirm,
  onCancel,
  destructive,
}: ConfirmModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative admin-card p-6 max-w-md w-full shadow-xl">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-[var(--admin-text-muted)] mt-2">{message}</p>
        <div className="flex gap-3 justify-end mt-6">
          <button type="button" onClick={onCancel} className="admin-btn-secondary">
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={destructive ? 'px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700' : 'admin-btn-primary'}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
