import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import './globals.css';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import { MotionProvider } from '@/components/MotionProvider';
import { VideoPlayerProvider } from '@/components/VideoPlayerProvider';
import type { Metadata } from 'next';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

polyfillCountryFlagEmojis();

export const metadata: Metadata = {
  metadataBase: new URL('https://street-dance-culture.vercel.app'),
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        {/* Shared SVG filter for liquid glass effect */}
        <svg style={{ display: 'none' }} aria-hidden="true" focusable="false">
          <filter
            id="glass-filter"
            colorInterpolationFilters="linearRGB"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
          >
            <feDisplacementMap
              in="SourceGraphic"
              in2="SourceGraphic"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="B"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              result="displacementMap"
            />
            <feGaussianBlur
              stdDeviation="3 3"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="displacementMap"
              edgeMode="none"
              result="blur"
            />
          </filter>
        </svg>
        <NextIntlClientProvider>
          <MotionProvider>
            <VideoPlayerProvider>
              {children}
            </VideoPlayerProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
