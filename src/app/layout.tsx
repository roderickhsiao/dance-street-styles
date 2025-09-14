import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import './globals.css';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

polyfillCountryFlagEmojis();

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
