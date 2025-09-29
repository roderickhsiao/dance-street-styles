import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import './globals.css';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import { MotionProvider } from '@/components/ui/motion-provider';
import { VideoPlayerProvider } from '@/components/features/video/VideoPlayerProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
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

export default async function RootLayout({ children }: Props) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = 'dark';
                  var stored = '';
                  
                  // Try to get from cookie first
                  var cookies = document.cookie.split('; ');
                  for (var i = 0; i < cookies.length; i++) {
                    if (cookies[i].startsWith('sdc_theme=')) {
                      stored = cookies[i].split('=')[1];
                      break;
                    }
                  }
                  
                  // Fallback to localStorage
                  if (!stored && typeof localStorage !== 'undefined') {
                    stored = localStorage.getItem('sdc_theme');
                  }
                  
                  if (stored === 'light' || stored === 'dark') {
                    theme = stored;
                  }
                  
                  document.documentElement.classList.add(theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased font-sans bg-surface-primary text-content-primary`}>
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
        <ThemeProvider>
          <NextIntlClientProvider>
            <MotionProvider>
              <VideoPlayerProvider>
                {children}
              </VideoPlayerProvider>
            </MotionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
