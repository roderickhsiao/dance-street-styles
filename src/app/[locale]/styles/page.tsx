'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MainNavigation } from '@/components/MainNavigation';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { CTAButton } from '@/components/ui/cta-button';
import { DanceStyleGridCard } from '@/app/[locale]/styles/parts/DanceStyleGridCard';
import { getAllDanceStyles } from '@/data/danceStyles';

export default function StylesPage() {
  const tPage = useTranslations('stylesPage');
  const tStyleNames = useTranslations('danceStyles.names');
  const tStyleDescriptions = useTranslations('danceStyles.shortDescriptions');
  const allStyles = getAllDanceStyles();
  const tGlobal = useTranslations();

  // Create a map of style IDs to style objects for quick lookup
  // Get all styles sorted alphabetically by translated name
  const sortedStyles = allStyles.sort((a, b) => {
    const nameA = tStyleNames(a.id);
    const nameB = tStyleNames(b.id);
    return nameA.localeCompare(nameB);
  });

  return (
    <div className="min-h-screen bg-surface-primary">
      <MainNavigation />

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
                <DanceStyleGridCard
                  key={style.id}
                  name={tStyleNames(style.id)}
                  description={tStyleDescriptions(style.id)}
                  era={tGlobal(style.eraKey)}
                  location={tGlobal(style.locationKey)}
                  tags={style.tags}
                  slug={style.slug}
                  index={index}
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
