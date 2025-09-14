import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    title: `${t('origins.seo.title')} | Street Dance Culture`,
    description: t('origins.seo.description'),
    keywords: [
      'street dance origins',
      'hip hop culture',
      'breaking history',
      'DJ Kool Herc',
      'Five Elements hip hop',
      'Bronx dance culture',
      'street dance history',
      'b-boy b-girl',
      'hip hop timeline',
      'street culture documentary'
    ].join(', '),
    openGraph: {
      title: t('origins.seo.title'),
      description: t('origins.seo.description'),
      type: 'article',
      locale: locale,
      siteName: 'Street Dance Culture Magazine',
      publishedTime: '1973-08-11T00:00:00.000Z', // Historical significance
      modifiedTime: new Date().toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('origins.seo.title'),
      description: t('origins.seo.description'),
    },
    alternates: {
      canonical: `/origins`,
      languages: {
        'en': '/en/origins',
        'zh-Hant-TW': '/zh-Hant-TW/origins',
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

export default function OriginsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured data for better SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Origins of Street Dance Culture - From Bronx to Global Movement',
    description: 'Discover the authentic origins of street dance culture from DJ Kool Herc\'s 1973 Bronx block parties to Olympic recognition.',
    author: {
      '@type': 'Organization',
      name: 'Street Dance Culture Magazine'
    },
    datePublished: '1973-08-11',
    dateModified: new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'Street Dance Culture Magazine'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': '/origins'
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Hip-Hop Culture',
        description: 'A cultural movement that originated in the Bronx, New York City in the 1970s'
      },
      {
        '@type': 'Thing',
        name: 'Breaking',
        description: 'A style of street dance that originated as part of hip-hop culture'
      },
      {
        '@type': 'Person',
        name: 'DJ Kool Herc',
        description: 'Jamaican-American DJ who is credited with originating hip-hop music in 1973'
      }
    ],
    mentions: [
      {
        '@type': 'Event',
        name: 'First Hip-Hop Block Party',
        startDate: '1973-08-11',
        location: {
          '@type': 'Place',
          name: 'South Bronx, New York City'
        }
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
