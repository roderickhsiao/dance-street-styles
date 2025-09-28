'use client';

import { motion } from '@/lib/motion';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { CTAButton } from '@/components/ui/cta-button';
import { StyleGridCard } from '@/components/StyleGridCard';
import type { DanceStyle } from '@/data/types';

interface StylesPageClientProps {
  heroTitle: string;
  heroSubtitle: string;
  overviewTitle: string;
  overviewContent: string;
  allStylesTitle: string;
  allStylesDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  sortedStyles: DanceStyle[];
  styleNames: Record<string, string>;
  styleDescriptions: Record<string, string>;
  globalTranslations: Record<string, string>;
}

export function StylesPageClient({
  heroTitle,
  heroSubtitle,
  overviewTitle,
  overviewContent,
  allStylesTitle,
  allStylesDescription,
  ctaTitle,
  ctaDescription,
  ctaButton,
  sortedStyles,
  styleNames,
  styleDescriptions,
  globalTranslations,
}: StylesPageClientProps) {
  return (
    <div className="min-h-screen bg-surface-primary">
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
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
              {overviewTitle}
            </h2>
            <p className="text-body-lg text-content-secondary max-w-4xl mx-auto">
              {overviewContent}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* All Dance Styles */}
      <Section className="py-16" background="primary">
        <div className="container mx-auto md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-header-lg font-black text-content-primary mb-4">
              {allStylesTitle}
            </h2>
            <p className="text-body-md text-content-secondary max-w-2xl mx-auto">
              {allStylesDescription}
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
                  name={styleNames[style.id]}
                  slug={style.slug}
                  shortDescription={styleDescriptions[style.id]}
                  origins={{ locationKey: style.locationKey }}
                  index={index}
                  tags={style.tags}
                  era={globalTranslations[style.eraKey]}
                  location={globalTranslations[style.locationKey]}
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
              {ctaTitle}
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl mx-auto">
              {ctaDescription}
            </p>
            <CTAButton href="/origins" variant="filled" size="lg">
              {ctaButton}
            </CTAButton>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}