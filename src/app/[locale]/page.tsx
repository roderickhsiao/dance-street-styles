'use client';

import { motion } from '@/lib/motion';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Hero } from '../../components/Hero';
import { Section } from '../../components/Section';
import { Stats } from '../../components/Stats';
import { FeatureCard } from '../../components/FeatureCard';
import { StyleGridCard } from '../../components/StyleGridCard';
import { CTAButton } from '../../components/ui/cta-button';
import { getAllDanceStyles } from '../../data/danceStyles';
import { useFeatureCardsData } from '../../data/featureCards';

export default function HomePage() {
  const t = useTranslations();
  const tOverview = useTranslations('overview');
  const danceStyles = getAllDanceStyles();
  const featureCardsData = useFeatureCardsData();

  // Memoize meaningful stats for street dance culture
  const overviewStats = useMemo(
    () => [
      {
        value: tOverview('stats.birthYear.value'),
        label: tOverview('stats.birthYear.label'),
        color: 'accent-primary' as const,
      },
      {
        value: tOverview('stats.styles.value'),
        label: tOverview('stats.styles.label'),
        color: 'accent-secondary' as const,
      },
      {
        value: tOverview('stats.countries.value'),
        label: tOverview('stats.countries.label'),
        color: 'accent-tertiary' as const,
      },
      {
        value: tOverview('stats.olympic.value'),
        label: tOverview('stats.olympic.label'),
        color: 'accent-primary' as const,
      },
    ],
    [tOverview]
  );

  return (
    <div className="min-h-screen bg-surface-primary">
      <Hero
        backgroundVariant="magazine"
        layout="magazine"
        masthead={tOverview('hero.masthead')}
        title={tOverview.rich('hero.titleFull', {
          accent1: (chunks) => (
            <motion.span
              className="block text-white mb-2"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {chunks}
            </motion.span>
          ),
          accent2: (chunks) => (
            <motion.span
              className="block text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text mb-2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              {chunks}
            </motion.span>
          ),
          accent3: (chunks) => (
            <motion.span
              className="block text-transparent bg-gradient-to-r from-accent-secondary to-accent-tertiary bg-clip-text"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              {chunks}
            </motion.span>
          ),
        })}
        subtitle={tOverview('hero.subtitle')}
      />
      <Section background="secondary" padding="lg">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-header-md sm:text-header-lg md:text-header-xl font-black text-content-primary mb-4 leading-tight magazine-headline">
            {tOverview.rich('title.titleFull', {
              dot: (chunks) => (
                <span className="text-accent-primary">{chunks}</span>
              ),
              accent: (chunks) => (
                <span className="text-transparent bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text">{chunks}</span>
              ),
            })}
          </h2>
          <p className="text-content-tertiary text-body-md sm:text-body-lg max-w-2xl mx-auto magazine-body">
            {tOverview('description')}
          </p>
        </div>

        <Stats stats={overviewStats} columns={4} />
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
              {tOverview('streetSection.masthead.foundation')}
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] magazine-headline"
              initial={false}
              animate={false}
            >
              {tOverview.rich('streetSection.titleFull', {
                accent1: (chunks) => (
                  <motion.span
                    className="block text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  >
                    {chunks}
                  </motion.span>
                ),
                accent2: (chunks) => (
                  <motion.span
                    className="block text-yellow-400"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  >
                    {chunks}
                  </motion.span>
                ),
              })}
            </motion.h2>
            <motion.p
              className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto magazine-body font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {tOverview('streetSection.subtitle')}
            </motion.p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {featureCardsData.map((card) => (
              <FeatureCard
                key={card.id}
                icon={card.icon}
                title={tOverview(card.titleKey)}
                description={tOverview(card.descriptionKey)}
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
                {tOverview('streetSection.button')}
              </CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dance Styles Grid */}
      <section id="styles" className="py-12 sm:py-16 bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
        {/* Elite backdrop effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-600/5"></div>
        <div className="absolute top-0 start-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-10 scroll-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 magazine-headline">
              {t.rich('styles.titleFull', {
                accent: (chunks) => (
                  <span className="text-orange-400">{chunks}</span>
                ),
              })}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base magazine-body">
              {t('styles.subtitle')}
            </p>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            id="styles"
          >
            {danceStyles.map((style, index) => (
              <StyleGridCard
                key={style.id}
                id={style.id}
                name={t(style.nameKey!)}
                slug={style.slug}
                shortDescription={t(style.shortDescriptionKey!)}
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
