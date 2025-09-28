import { getTranslations } from 'next-intl/server';
import { motion } from '@/lib/motion';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { CTAButton } from '@/components/ui/cta-button';
import { StyleGridCard } from '@/components/StyleGridCard';
import { getAllDanceStyles } from '@/data/danceStyles';
import type { Metadata } from 'next';

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
        url: `/opengraph-image?title=${encodeURIComponent(tHero('title.line1') + ' ' + tHero('title.line2'))}&subtitle=${encodeURIComponent(tHero('title.line3'))}`,
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

  // Create a map of style IDs to style objects for quick lookup
  // Get all styles sorted alphabetically by translated name
  const sortedStyles = allStyles.sort((a, b) => {
    const nameA = tStyleNames(a.id);
    const nameB = tStyleNames(b.id);
    return nameA.localeCompare(nameB);
  });

  return (
    <div className="min-h-screen bg-surface-primary">
      <Hero
        title={`${tPage('hero.title.line1')} ${tPage(
          'hero.title.line2'
        )} ${tPage('hero.title.line3')}`}
        subtitle={tPage('hero.subtitle')}
        backgroundVariant="street"
      />

      {/* Overview Section */}
      <Section className="py-16" background="secondary">
        <div className="container mx-auto md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-header-lg font-black text-content-primary mb-6">
              {tPage('overview.title')}
            </h2>
            <p className="text-body-lg text-content-secondary max-w-4xl mx-auto">
              {tPage('overview.content')}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* All Dance Styles */}
      <Section className="py-16" background="primary">
        <div className="container mx-auto md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-header-lg font-black text-content-primary mb-4">
              {tPage('allStyles.title')}
            </h2>
            <p className="text-body-md text-content-secondary max-w-2xl mx-auto">
              {tPage('allStyles.description')}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedStyles.map((style, index) => (
                <StyleGridCard
                  key={style.id}
                  id={style.id}
                  name={tStyleNames(style.id)}
                  slug={style.slug}
                  shortDescription={tStyleDescriptions(style.id)}
                  origins={{ locationKey: style.locationKey }}
                  index={index}
                  tags={style.tags}
                  era={tGlobal(style.eraKey)}
                  location={tGlobal(style.locationKey)}
                  useMotion={true}
                  showTags={true}
                  showEra={true}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="py-20 text-center" background="elevated">
        <div className="container mx-auto md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-header-xl font-black text-content-primary">
              {tPage('cta.title')}
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl mx-auto">
              {tPage('cta.description')}
            </p>
            <CTAButton href="/origins" variant="filled" size="lg">
              {tPage('cta.button')}
            </CTAButton>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
