import { type ReactNode } from 'react';
import clsx from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'emerald';
}

const colorMap = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  purple: 'bg-purple-50 text-purple-600',
  emerald: 'bg-teal-50 text-teal-600',
};

export default function StatsCard({
  label,
  value,
  icon,
  change,
  changeType = 'neutral',
  color = 'blue',
}: StatsCardProps) {
  const TrendIcon =
    changeType === 'positive' ? TrendingUp : changeType === 'negative' ? TrendingDown : Minus;

  return (
    <div className="admin-card p-5">
      <div className="flex items-start justify-between">
        <div className={clsx('p-2.5 rounded-lg', colorMap[color])}>{icon}</div>
      </div>
      <p className="text-xs uppercase tracking-wider text-[var(--admin-text-muted)] mt-4">{label}</p>
      <p className="text-2xl font-semibold mt-1 text-[var(--admin-text)]">{value}</p>
      {change && (
        <p
          className={clsx(
            'text-xs mt-2 flex items-center gap-1',
            changeType === 'positive' && 'text-emerald-600',
            changeType === 'negative' && 'text-red-500',
            changeType === 'neutral' && 'text-[var(--admin-text-muted)]'
          )}
        >
          <TrendIcon size={12} />
          {change}
        </p>
      )}
    </div>
  );
}
