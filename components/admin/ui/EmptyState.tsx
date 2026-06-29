import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-full bg-slate-100 text-slate-400 mb-4">
        <Inbox size={32} />
      </div>
      <h3 className="font-medium text-[var(--admin-text)]">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--admin-text-muted)] mt-1 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
