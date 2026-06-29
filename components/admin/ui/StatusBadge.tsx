import clsx from 'clsx';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-blue-100 text-blue-800',
  checked_in: 'bg-emerald-100 text-emerald-800',
  checked_out: 'bg-slate-100 text-slate-600',
  cancelled: 'bg-red-100 text-red-800',
  no_show: 'bg-orange-100 text-orange-800',
  unpaid: 'bg-amber-100 text-amber-800',
  partial: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-emerald-100 text-emerald-800',
  refunded: 'bg-slate-100 text-slate-600',
  draft: 'bg-slate-100 text-slate-600',
  published: 'bg-emerald-100 text-emerald-800',
  archived: 'bg-slate-100 text-slate-500',
  unread: 'bg-blue-100 text-blue-800',
  read: 'bg-slate-100 text-slate-600',
  replied: 'bg-emerald-100 text-emerald-800',
  active: 'bg-emerald-100 text-emerald-800',
  inactive: 'bg-slate-100 text-slate-500',
};

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        STATUS_STYLES[status] || 'bg-slate-100 text-slate-600'
      )}
    >
      {label || status.replace(/_/g, ' ')}
    </span>
  );
}
