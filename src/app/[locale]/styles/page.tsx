import { getTranslations } from 'next-intl/server';
import { getAllDanceStyles } from '@/data/danceStyles';
import type { Metadata } from 'next';
import { StylesPageClient } from './StylesPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('stylesPage.seo');
  const tHero = await getTranslations('stylesPage.hero');
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [{
        url: `/api/og/dynamic?title=${encodeURIComponent(tHero('title.line1') + ' ' + tHero('title.line2'))}&subtitle=${encodeURIComponent(tHero('title.line3'))}`,
        width: 1200,
        height: 630,
        alt: t('title')
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    }
  };
}

export default async function StylesPage() {
  const tPage = await getTranslations('stylesPage');
  const tStyleNames = await getTranslations('danceStyles.names');
  const tStyleDescriptions = await getTranslations('danceStyles.shortDescriptions');
  const allStyles = getAllDanceStyles();
  const tGlobal = await getTranslations();

  // Get all styles sorted alphabetically by translated name
  const sortedStyles = allStyles.sort((a, b) => {
    const nameA = tStyleNames(a.id);
    const nameB = tStyleNames(b.id);
    return nameA.localeCompare(nameB);
  });

  // Create objects for translations to pass to client component
  const styleNames: Record<string, string> = {};
  const styleDescriptions: Record<string, string> = {};
  const globalTranslations: Record<string, string> = {};

  sortedStyles.forEach((style) => {
    styleNames[style.id] = tStyleNames(style.id);
    styleDescriptions[style.id] = tStyleDescriptions(style.id);
    globalTranslations[style.eraKey] = tGlobal(style.eraKey);
    globalTranslations[style.locationKey] = tGlobal(style.locationKey);
  });

  return (
    <StylesPageClient
      heroTitle={`${tPage('hero.title.line1')} ${tPage('hero.title.line2')} ${tPage('hero.title.line3')}`}
      heroSubtitle={tPage('hero.subtitle')}
      overviewTitle={tPage('overview.title')}
      overviewContent={tPage('overview.content')}
      allStylesTitle={tPage('allStyles.title')}
      allStylesDescription={tPage('allStyles.description')}
      ctaTitle={tPage('cta.title')}
      ctaDescription={tPage('cta.description')}
      ctaButton={tPage('cta.button')}
      sortedStyles={sortedStyles}
      styleNames={styleNames}
      styleDescriptions={styleDescriptions}
      globalTranslations={globalTranslations}
    />
  );
}
