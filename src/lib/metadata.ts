import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateOpenGraphMetadata() {
  return {
    images: [{
      url: '/images/og-default.jpg',
      width: 1200,
      height: 630,
      alt: 'Street Dance Culture',
    }],
    type: 'website' as const,
    siteName: 'Street Dance Culture',
  };
}

// Specialized metadata generators for common patterns
export async function generateStylePageMetadata(styleName: string): Promise<Metadata> {
  const t = await getTranslations('stylesPage.seo');
  
  return {
    title: `${styleName.toUpperCase()} - DANCE STYLE`,
    description: t('description'),
    alternates: {
      canonical: `/styles/${styleName.toLowerCase()}`,
      languages: { 'en': `/en/styles/${styleName.toLowerCase()}` }
    },
    openGraph: await generateOpenGraphMetadata()
  };
}

export async function generateSimplePageMetadata(
  namespace: string, 
  heroNamespace: string, 
  titleKey: string, 
  subtitleKey: string
): Promise<Metadata> {
  const tHero = await getTranslations(heroNamespace);
  
  return {
    title: `${tHero(titleKey)} - ${tHero(subtitleKey)}`,
    description: tHero('description'),
    openGraph: await generateOpenGraphMetadata()
  };
}