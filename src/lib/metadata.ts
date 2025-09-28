import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

interface MetadataConfig {
  namespace: string;
  heroNamespace?: string;
  title: string;
  subtitle: string;
  type?: 'website' | 'article';
  keywords?: string | string[];
  canonical?: string;
  languages?: Record<string, string>;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
}

export async function generatePageMetadata(config: MetadataConfig): Promise<Metadata> {
  const { 
    namespace, 
    heroNamespace, 
    title, 
    subtitle, 
    type = 'website',
    keywords,
    canonical,
    languages,
    publishedTime,
    modifiedTime,
    locale
  } = config;

  const t = await getTranslations(namespace);
  const tHero = heroNamespace ? await getTranslations(heroNamespace) : null;

  const ogImageUrl = `/api/og/dynamic?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}`;

  const baseMetadata: Metadata = {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type,
      ...(locale && { locale }),
      siteName: 'Street Dance Culture Magazine',
      images: [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: t('title')
      }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    }
  };

  // Add keywords if provided
  if (keywords) {
    baseMetadata.keywords = typeof keywords === 'string' ? keywords : keywords.join(', ');
  } else if (t('keywords')) {
    baseMetadata.keywords = t('keywords');
  }

  // Add alternates if provided
  if (canonical || languages) {
    baseMetadata.alternates = {};
    if (canonical) baseMetadata.alternates.canonical = canonical;
    if (languages) baseMetadata.alternates.languages = languages;
  }

  return baseMetadata;
}

// Specialized metadata generators for common patterns
export async function generateStylePageMetadata(styleName: string, locale: string): Promise<Metadata> {
  return generatePageMetadata({
    namespace: 'stylesPage.seo',
    title: styleName.toUpperCase(),
    subtitle: 'DANCE STYLE',
    type: 'article',
    canonical: `/styles/${styleName.toLowerCase()}`,
    languages: { 'en': `/en/styles/${styleName.toLowerCase()}` },
    locale
  });
}

export async function generateSimplePageMetadata(
  namespace: string, 
  heroNamespace: string, 
  titleKey: string, 
  subtitleKey: string
): Promise<Metadata> {
  const t = await getTranslations(namespace);
  const tHero = await getTranslations(heroNamespace);
  
  return generatePageMetadata({
    namespace,
    heroNamespace,
    title: tHero(titleKey),
    subtitle: tHero(subtitleKey)
  });
}