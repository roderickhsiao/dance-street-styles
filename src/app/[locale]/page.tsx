'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { MainNavigation } from '../../components/MainNavigation';
import { Hero } from '../../components/Hero';
import { Section } from '../../components/Section';
import { Stats } from '../../components/Stats';
import { FeatureCard } from '../../components/FeatureCard';
import { StyleGridCard } from '../../components/StyleGridCard';
import { CTAButton } from '../../components/ui/cta-button';
import { getAllDanceStyles } from '../../data/danceStyles';
import { useFeatureCardsData } from '../../data/featureCards';

export default function Home() {
  const t = useTranslations();
  const danceStyles = getAllDanceStyles();
  const featureCardsData = useFeatureCardsData();

  // Memoize meaningful stats for street dance culture
  const overviewStats = useMemo(
    () => [
      {
        value: t('overview.stats.birthYear.value'),
        label: t('overview.stats.birthYear.label'),
        color: 'accent-primary' as const,
      },
      {
        value: t('overview.stats.styles.value'),
        label: t('overview.stats.styles.label'),
        color: 'accent-secondary' as const,
      },
      {
        value: t('overview.stats.countries.value'),
        label: t('overview.stats.countries.label'),
        color: 'accent-tertiary' as const,
      },
      {
        value: t('overview.stats.olympic.value'),
        label: t('overview.stats.olympic.label'),
        color: 'accent-primary' as const,
      },
    ],
    [t]
  );

  return (
    <div className="min-h-screen bg-surface-primary">
      <MainNavigation />

      <Hero
        backgroundVariant="magazine"
        layout="magazine"
        masthead={t('hero.masthead')}
        title=""
        titleLines={{
          line1: t('hero.title.line1'),
          line2: t('hero.title.line2'),
          line3: t('hero.title.line3'),
        }}
        subtitle={t('hero.subtitle')}
      />
      <Section background="secondary" padding="lg">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-header-md sm:text-header-lg md:text-header-xl font-black text-content-primary mb-4 leading-tight magazine-headline">
            {t('overview.title.main')}
            <span className="text-accent-primary">.</span>
            <span className="text-transparent bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text">
              {' '}
              {t('overview.title.accent')}
            </span>
          </h2>
          <p className="text-content-tertiary text-body-md sm:text-body-lg max-w-2xl mx-auto magazine-body">
            {t('overview.description')}
          </p>
        </div>

        <Stats
          stats={overviewStats}
          columns={4}
        />
      </Section>

      {/* Origin of Street Dance Main Section */}
      <section
        id="origins"
        className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 scroll-fade-in">
            <motion.div
              className="text-orange-400 font-bold text-sm md:text-base mb-4 tracking-[0.3em] uppercase magazine-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('streetSection.masthead.foundation')}
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] magazine-headline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text">
                {t('streetSection.title.line1')}
              </span>
              <br />
              <span className="text-yellow-400">
                {t('streetSection.title.line2')}
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto magazine-body font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t('streetSection.subtitle')}
            </motion.p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {featureCardsData.map((card) => (
              <FeatureCard
                key={card.id}
                icon={card.icon}
                title={t(card.titleKey)}
                description={t(card.descriptionKey)}
                gradientFrom={card.gradientFrom}
                gradientTo={card.gradientTo}
                borderColor={card.borderColor}
                hoverBorderColor={card.hoverBorderColor}
                delay={card.delay}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <CTAButton
                href="/origins"
                variant="outline"
                size="default"
                showArrow={true}
              >
                {t('streetSection.button')}
              </CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dance Styles Grid */}
      <section id="styles" className="py-12 sm:py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 scroll-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 magazine-headline">
              {t('styles.title')}{' '}
              <span className="text-orange-400">{t('styles.titleAccent')}</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base magazine-body">
              {t('styles.subtitle')}
            </p>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            id="styles"
          >
            {danceStyles.slice(1).map((style, index) => (
              <StyleGridCard
                key={style.id}
                id={style.id}
                name={style.name}
                slug={style.slug}
                shortDescription={style.shortDescription}
                origins={style.origins}
                theme={style.theme}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
