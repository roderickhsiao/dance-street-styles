import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    viewTransition: true,
    inlineCss: true,
  },
  poweredByHeader: false,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default withNextIntl(nextConfig);
