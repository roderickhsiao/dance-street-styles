"use client";

import { Link } from '../../i18n/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MainNavigation } from '../../components/MainNavigation';
import { Hero } from '../../components/Hero';
import { Section } from '../../components/Section';
import { Stats } from '../../components/Stats';
import { FeatureCard } from '../../components/FeatureCard';
import { StyleGridCard } from '../../components/StyleGridCard';
import { getAllDanceStyles } from '../../data/danceStyles';

export default function Home() {
  const t = useTranslations();
  const danceStyles = getAllDanceStyles();

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
          line3: t('hero.title.line3')
        }}
        subtitle={t('hero.subtitle')}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/styles"
            className="inline-block px-8 py-4 bg-accent-primary text-surface-primary font-bold uppercase tracking-wider hover:bg-accent-primary/90 transition-all duration-300 transform magazine-sans text-center rounded-none"
          >
            {t('hero.buttons.primary')}
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/timeline"
            className="inline-block px-8 py-4 border-2 border-content-primary text-content-primary font-bold uppercase tracking-wider hover:bg-content-primary hover:text-surface-primary transition-all duration-300 magazine-sans text-center rounded-none"
          >
            {t('hero.buttons.secondary')}
          </Link>
        </motion.div>
      </Hero>

      <Section background="secondary" padding="lg">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-header-md sm:text-header-lg md:text-header-xl font-black text-content-primary mb-4 leading-tight magazine-headline">
            {t('overview.title.main')}<span className="text-accent-primary">.</span>
            <span className="text-transparent bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text"> {t('overview.title.accent')}</span>
          </h2>
          <p className="text-content-tertiary text-body-md sm:text-body-lg max-w-2xl mx-auto magazine-body">
            {t('overview.description')}
          </p>
        </div>

        <Stats 
          stats={[
            {
              value: t('overview.stats.0.value'),
              label: t('overview.stats.0.label'),
              color: 'accent-primary'
            },
            {
              value: t('overview.stats.1.value'),
              label: t('overview.stats.1.label'),
              color: 'accent-secondary'
            },
            {
              value: t('overview.stats.2.value'),
              label: t('overview.stats.2.label'),
              color: 'accent-tertiary'
            },
            {
              value: t('overview.stats.3.value'),
              label: t('overview.stats.3.label'),
              color: 'accent-primary'
            }
          ]}
          columns={4}
        />
      </Section>

      {/* Origin of Street Dance Main Section */}
      <section id="origins" className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800">
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
              <span className="text-yellow-400">{t('streetSection.title.line2')}</span>
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
            <FeatureCard
              icon="🎤"
              title={t('streetSection.cards.0.title')}
              description={t('streetSection.description')}
              gradientFrom="from-orange-500/10"
              gradientTo="to-pink-500/10"
              borderColor="border-orange-500/20"
              hoverBorderColor="hover:border-orange-500/40"
              delay={0.8}
            />

            <FeatureCard
              icon="💃"
              title={t('streetSection.cards.1.title')}
              description={t('streetSection.cards.1.description')}
              gradientFrom="from-pink-500/10"
              gradientTo="to-purple-500/10"
              borderColor="border-pink-500/20"
              hoverBorderColor="hover:border-pink-500/40"
              delay={1.0}
            />

            <FeatureCard
              icon="🌍"
              title={t('streetSection.impact.title')}
              description={t('streetSection.impact.description')}
              gradientFrom="from-purple-500/10"
              gradientTo="to-blue-500/10"
              borderColor="border-purple-500/20"
              hoverBorderColor="hover:border-purple-500/40"
              delay={1.2}
            />
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/origins"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold uppercase tracking-wider hover:from-orange-400 hover:to-pink-400 transition-all duration-300 transform magazine-sans rounded-lg shadow-lg hover:shadow-orange-500/25"
              >
                <span>{t('streetSection.button')}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dance Styles Grid */}
      <section id="styles" className="py-12 sm:py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 scroll-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 magazine-headline">
              {t('styles.title')} <span className="text-orange-400">{t('styles.titleAccent')}</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base magazine-body">
              {t('styles.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" id="styles">
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
