import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        'text-main': 'var(--color-text)',
        'text-light': 'var(--color-text-light)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      spacing: {
        section: 'var(--spacing-section)',
      },
      transitionDuration: {
        base: '300ms',
        slow: '600ms',
      },
    },
  },
  plugins: [],
};

export default config;
