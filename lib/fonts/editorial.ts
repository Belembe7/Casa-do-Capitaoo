import { Playfair_Display } from 'next/font/google';

export const editorial = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-editorial',
  display: 'swap',
});
