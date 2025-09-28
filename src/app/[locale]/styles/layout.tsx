import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t('stylesPage.seo.title')} | Street Dance Culture`,
    description: t('stylesPage.seo.description'),
    keywords: t('stylesPage.seo.keywords'),
    openGraph: {
      title: t('stylesPage.seo.title'),
      description: t('stylesPage.seo.description'),
      type: 'website',
      locale: locale,
      siteName: 'Street Dance Culture Magazine',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('stylesPage.seo.title'),
      description: t('stylesPage.seo.description'),
    },
    alternates: {
      canonical: `/styles`,
      languages: {
        'en': '/en/styles',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function StylesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured data for better SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Street Dance Styles Archive',
    description: 'Complete collection of street dance styles from hip-hop to house, breaking to voguing, with authentic history and cultural context.',
    author: {
      '@type': 'Organization',
      name: 'Street Dance Culture Magazine'
    },
    datePublished: '1970-01-01',
    dateModified: new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'Street Dance Culture Magazine'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': '/styles'
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Street Dance Styles',
        description: 'Various forms of dance that developed in urban communities as part of street culture'
      },
      {
        '@type': 'Thing',
        name: 'Hip-Hop Dance',
        description: 'Foundational street dance style that emerged from hip-hop culture'
      },
      {
        '@type': 'Thing',
        name: 'Breaking',
        description: 'Dynamic street dance style featuring toprock, downrock, power moves, and freezes'
      },
      {
        '@type': 'Thing',
        name: 'House Dance',
        description: 'Street dance style that originated in Chicago and New York house music clubs'
      },
      {
        '@type': 'Thing',
        name: 'Popping',
        description: 'Funk-style dance characterized by sudden tensing and relaxing of muscles'
      },
      {
        '@type': 'Thing',
        name: 'Locking',
        description: 'Funk dance style with distinctive freezing movements and energetic pointing'
      }
    ],
    mentions: [
      {
        '@type': 'Place',
        name: 'Bronx, New York',
        description: 'Birthplace of hip-hop and breaking'
      },
      {
        '@type': 'Place',
        name: 'Los Angeles, California',
        description: 'Origin of popping and locking dance styles'
      },
      {
        '@type': 'Place',
        name: 'Chicago, Illinois',
        description: 'Birthplace of house dance culture'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      {children}
    </>
  );
}
