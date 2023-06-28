
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['route.tsx', 'route.jsx', 'api.ts', 'api.js'],
  images: {
    domains: ['soundmint-pressly.s3.amazonaws.com', 'lh3.googleusercontent.com']
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, stream: false, constants: false };
    return config;
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  }
}

module.exports = nextConfig
