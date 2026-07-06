import toast from 'react-hot-toast';
import { HOTEL_INFO } from '@/lib/utils';

interface FeedbackOptions {
  hint?: string;
  duration?: number;
}

function showFeedback(
  type: 'success' | 'error' | 'info',
  title: string,
  { hint, duration = 5500 }: FeedbackOptions = {}
) {
  const styles = {
    success: 'border-green-500 bg-green-50',
    error: 'border-red-500 bg-red-50',
    info: 'border-secondary bg-amber-50',
  };
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const iconColors = {
    success: 'text-green-600 bg-green-100',
    error: 'text-red-600 bg-red-100',
    info: 'text-secondary bg-secondary/10',
  };

  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
        } transition-all duration-300 max-w-sm w-full shadow-lg border-l-4 rounded-r-md p-4 pointer-events-auto ${styles[type]}`}
        role="alert"
      >
        <div className="flex gap-3">
          <span
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${iconColors[type]}`}
          >
            {icons[type]}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-primary text-sm leading-snug">{title}</p>
            {hint && (
              <p className="text-xs text-text-light mt-1.5 leading-relaxed">{hint}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => toast.dismiss(t.id)}
            className="text-text-light hover:text-primary text-lg leading-none flex-shrink-0"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
      </div>
    ),
    { duration, position: 'top-center' }
  );
}

export function notifySuccess(title: string, options?: FeedbackOptions) {
  showFeedback('success', title, options);
}

export function notifyError(title: string, options?: FeedbackOptions) {
  showFeedback('error', title, options);
}

export function notifyInfo(title: string, options?: FeedbackOptions) {
  showFeedback('info', title, options);
}

export function notifyValidation(title: string, hint?: string) {
  notifyError(title, {
    hint: hint || 'Revise os campos assinalados e tente novamente.',
    duration: 6000,
  });
}

export async function handleApiResponse<T = Record<string, unknown>>(
  res: Response,
  successMessage: string,
  successHint?: string
): Promise<{ ok: boolean; data: T }> {
  let data = {} as T;
  try {
    data = await res.json();
  } catch {
    data = {} as T;
  }

  const errData = data as { error?: string; hint?: string; message?: string };

  if (res.ok) {
    notifySuccess(successMessage, { hint: successHint });
    return { ok: true, data };
  }

  const title = errData.error || errData.message || 'Ocorreu um erro. Tente novamente.';
  const hint =
    errData.hint ||
    (res.status === 400
      ? 'Verifique se preencheu todos os campos correctamente.'
      : res.status === 404
        ? 'Confirme se os dados introduzidos estão correctos.'
        : res.status >= 500
          ? 'O problema é temporário. Aguarde alguns minutos ou contacte-nos por telefone ou WhatsApp.'
          : `Se o problema persistir, contacte ${HOTEL_INFO.email} ou use o WhatsApp.`);

  notifyError(title, { hint });
  return { ok: false, data };
}

export const FEEDBACK = {
  contact: {
    success: 'Mensagem enviada com sucesso!',
    successHint: 'Responderemos em até 24 horas úteis. Verifique também a pasta de spam.',
    validation: 'Preencha todos os campos obrigatórios.',
    validationHint: 'Nome, email válido, assunto e mensagem são necessários para o envio.',
  },
  newsletter: {
    success: 'Subscrição confirmada!',
    successHint: 'Receberá novidades e ofertas exclusivas do Casa do Capitão.',
    duplicate: 'Este email já está subscrito.',
    duplicateHint: 'Se não recebe os nossos emails, verifique a pasta de spam ou contacte-nos.',
    terms: 'Aceite os termos para subscrever.',
    termsHint: 'Marque a caixa de confirmação dos termos e condições.',
    email: 'Introduza um email válido.',
    emailHint: 'Exemplo: oseunome@email.com',
  },
  booking: {
    success: 'Reserva confirmada!',
    datesRequired: 'Seleccione as datas de check-in e check-out.',
    datesHint: 'O check-out deve ser posterior ao check-in.',
    noRooms: 'Nenhum quarto disponível para estas datas.',
    noRoomsHint: 'Tente alterar as datas ou reduzir o número de hóspedes.',
    paymentRequired: 'Seleccione um método de pagamento.',
    paymentHint: 'Escolha uma das opções disponíveis antes de confirmar.',
    fieldsRequired: 'Preencha os seus dados de contacto.',
    fieldsHint: 'Nome, email e telefone são obrigatórios para a confirmação.',
    failed: 'Não foi possível concluir a reserva.',
    failedHint: 'Verifique os dados e tente novamente, ou contacte-nos directamente.',
  },
  cancel: {
    success: 'Reserva cancelada com sucesso.',
    successHint: 'Receberá um email de confirmação do cancelamento.',
    notFound: 'Reserva não encontrada.',
    notFoundHint: 'Verifique o número da reserva no email de confirmação. Formato: CC-XXXXX-XXXX',
    tooLate: 'Cancelamento não permitido.',
    tooLateHint: 'Só é possível cancelar gratuitamente até 48 horas antes do check-in. Contacte-nos para assistência.',
    empty: 'Introduza o número da reserva.',
    emptyHint: 'O número está no email de confirmação que recebeu ao reservar.',
  },
} as const;
