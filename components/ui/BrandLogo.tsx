import clsx from 'clsx';

interface BrandLogoProps {
  className?: string;
  /** Adds subtle shadow for legibility over photos/video */
  overMedia?: boolean;
  size?: 'sm' | 'md';
}

export default function BrandLogo({ className, overMedia = false, size = 'md' }: BrandLogoProps) {
  return (
    <span
      className={clsx(
        'font-logo inline-flex flex-col leading-none select-none transition-colors duration-300',
        overMedia && 'drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]',
        className
      )}
      aria-label="Casa do Capitão"
    >
      <span
        className={clsx(
          'font-normal uppercase tracking-[0.34em]',
          size === 'sm' ? 'text-[9px]' : 'text-[10px] md:text-[11px]'
        )}
      >
        Casa do
      </span>
      <span
        className={clsx(
          'font-semibold italic tracking-[0.04em]',
          size === 'sm' ? 'text-xl -mt-0.5' : 'text-[1.65rem] md:text-[1.85rem] -mt-1'
        )}
      >
        Capitão
      </span>
    </span>
  );
}
