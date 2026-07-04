import { Cormorant_Garamond } from 'next/font/google';

export const brandLogo = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-brand-logo',
  display: 'swap',
});
