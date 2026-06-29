interface FlagIconProps {
  countryCode: string;
  size?: number;
  className?: string;
}

export default function FlagIcon({ countryCode, size = 20, className = '' }: FlagIconProps) {
  const height = Math.round(size * 0.75);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${countryCode}.png`}
      srcSet={`https://flagcdn.com/w80/${countryCode}.png 2x`}
      width={size}
      height={height}
      alt=""
      aria-hidden
      className={`inline-block rounded-[2px] object-cover shadow-sm ${className}`}
      style={{ width: size, minWidth: size, height }}
    />
  );
}
