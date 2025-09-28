import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Footer } from '../../components/Footer';
import { MainNavigation } from '../../components/MainNavigation';
import { locales } from '../../i18n/request';
import { getOGLocale } from '../../i18n/locale-mappings';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(', '),
    authors: [{ name: t('author') }],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: getOGLocale(locale),
      images: [{
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: t('title'),
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  return (
    <>
      <MainNavigation />
      {children}
      <Footer />
    </>
  );
}
