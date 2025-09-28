import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getDanceStyleBySlug, getRelatedStyles, danceStyleTags, getAllDanceStyles } from '@/data/danceStyles';
import { locales } from '../../../../i18n/constants';
import { Metadata } from 'next';
import { StylePageClient } from './StylePageClient';

// Generate static params for all dance style pages across all locales
export function generateStaticParams() {
  const allStyles = getAllDanceStyles();
  
  return locales.flatMap((locale) =>
    allStyles.map((style) => ({
      locale,
      slug: style.slug,
    }))
  );
}

// Generate metadata for each style page
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const danceStyle = getDanceStyleBySlug(slug);
  
  if (!danceStyle) {
    return {
      title: 'Style Not Found | Street Dance Culture',
      description: 'The requested dance style could not be found.',
    };
  }

  const styleName = await getTranslations({ locale, namespace: 'danceStyles.names' });
  const styleDesc = await getTranslations({ locale, namespace: 'danceStyles.shortDescriptions' });
  
  const title = `${styleName(danceStyle.id)} | Street Dance Culture`;
  const description = styleDesc(danceStyle.id);
  // Resolve era/location using translations when available
  const tGlobal = await getTranslations({ locale, namespace: undefined });
  const resolvedLocation = tGlobal(danceStyle.locationKey);
  const resolvedEra = tGlobal(danceStyle.eraKey);

  return {
    title,
    description,
    keywords: `${styleName(danceStyle.id)}, street dance, dance style, ${resolvedLocation}, ${resolvedEra}, urban dance, dance culture`,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: locale,
      siteName: 'Street Dance Culture Magazine',
      images: [{
        url: `/opengraph-image?title=${encodeURIComponent(styleName(danceStyle.id).toUpperCase())}&subtitle=${encodeURIComponent('DANCE STYLE')}`,
        width: 1200,
        height: 630,
        alt: title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/styles/${slug}`,
      languages: locales.reduce((acc, loc) => ({
        ...acc,
        [loc]: `/${loc}/styles/${slug}`,
      }), {}),
    },
  };
}

interface StylePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function StylePage({ params }: StylePageProps) {
  const { slug } = await params;
  const danceStyle = getDanceStyleBySlug(slug);
  
  if (!danceStyle) {
    notFound();
  }

  const relatedStyles = getRelatedStyles(danceStyle.id);

  // Get tag objects for the style
  const styleTags = danceStyle.tags.map((tagId: string) => 
    danceStyleTags.find(tag => tag.id === tagId)
  ).filter((tag): tag is NonNullable<typeof tag> => tag !== undefined);

  return (
    <StylePageClient 
      danceStyle={danceStyle}
      relatedStyles={relatedStyles}
      styleTags={styleTags}
    />
  );
}
