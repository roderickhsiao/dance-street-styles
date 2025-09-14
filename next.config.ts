import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
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