/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'player.vimeo.com' },
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/**',
      'node_modules/webpack/**',
      'node_modules/esbuild/**',
    ],
  },
};

export default nextConfig;
