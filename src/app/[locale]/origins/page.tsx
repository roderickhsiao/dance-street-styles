'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MainNavigation } from '@/components/MainNavigation';
import { FiveElementCard } from '@/components/FiveElementCard';
import { Timeline } from '@/components/Timeline';
import { Hero } from '@/components/Hero';
import { CardGrid } from '@/components/CardGrid';
import { Stats } from '@/components/Stats';
import { Section } from '@/components/Section';

const compactTimeline = [
  {
    year: '1973',
    titleKey: 'streetCulture.timeline.1973.title',
    locationKey: 'streetCulture.timeline.1973.location',
    descriptionKey: 'streetCulture.timeline.1973.description',
    icon: '🎧',
  },
  {
    year: '1975',
    titleKey: 'streetCulture.timeline.1975.title',
    locationKey: 'streetCulture.timeline.1975.location',
    descriptionKey: 'streetCulture.timeline.1975.description',
    icon: '💫',
  },
  {
    year: '1977',
    titleKey: 'streetCulture.timeline.1977.title',
    locationKey: 'streetCulture.timeline.1977.location',
    descriptionKey: 'streetCulture.timeline.1977.description',
    icon: '👥',
  },
  {
    year: '1982',
    titleKey: 'streetCulture.timeline.1982.title',
    locationKey: 'streetCulture.timeline.1982.location',
    descriptionKey: 'streetCulture.timeline.1982.description',
    icon: '🎬',
  },
  {
    year: '1990s',
    titleKey: 'streetCulture.timeline.1990s.title',
    locationKey: 'streetCulture.timeline.1990s.location',
    descriptionKey: 'streetCulture.timeline.1990s.description',
    icon: '🌍',
  },
  {
    year: '2024',
    titleKey: 'streetCulture.timeline.2024.title',
    locationKey: 'streetCulture.timeline.2024.location',
    descriptionKey: 'streetCulture.timeline.2024.description',
    icon: '🏅',
  },
];

const streetValues = [
  {
    titleKey: 'streetCulture.values.authenticity.title',
    descriptionKey: 'streetCulture.values.authenticity.description',
    icon: '✨',
  },
  {
    titleKey: 'streetCulture.values.community.title',
    descriptionKey: 'streetCulture.values.community.description',
    icon: '🤝',
  },
  {
    titleKey: 'streetCulture.values.respect.title',
    descriptionKey: 'streetCulture.values.respect.description',
    icon: '🙏',
  },
  {
    titleKey: 'streetCulture.values.peace.title',
    descriptionKey: 'streetCulture.values.peace.description',
    icon: '✌️',
  },
  {
    titleKey: 'streetCulture.values.innovation.title',
    descriptionKey: 'streetCulture.values.innovation.description',
    icon: '🚀',
  },
  {
    titleKey: 'streetCulture.values.unity.title',
    descriptionKey: 'streetCulture.values.unity.description',
    icon: '🌟',
  },
];

export default function OriginOfStreetDancePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-surface-primary">
      <MainNavigation />

      <Hero
        backgroundVariant="magazine"
        title={t('origins.hero.title')}
        subtitle={t('origins.hero.subtitle')}
        badges={[
          'South Bronx • 1970s',
          'Cultural Revolution',
          'Global Movement',
        ]}
      />

      <Section background="secondary" padding="lg">
        <CardGrid
          items={[
            {
              icon: '🏙️',
              title: t('streetCulture.insights.exclusion.title'),
              description: t('streetCulture.insights.exclusion.description'),
              accent: 'primary',
            },
            {
              icon: '⚡',
              title: t('streetCulture.insights.community.title'),
              description: t('streetCulture.insights.community.description'),
              accent: 'secondary',
            },
            {
              icon: '🌍',
              title: t('streetCulture.insights.global.title'),
              description: t('streetCulture.insights.global.description'),
              accent: 'tertiary',
            },
          ]}
          columns={3}
        />

        <Stats
          stats={[
            {
              value: '1973',
              label: t('streetCulture.stats.birthYear'),
              color: 'accent-primary',
            },
            {
              value: '5',
              label: t('streetCulture.stats.coreElements'),
              color: 'accent-secondary',
            },
            {
              value: '180+',
              label: t('streetCulture.stats.countries'),
              color: 'accent-tertiary',
            },
            {
              value: '2024',
              label: t('streetCulture.stats.olympics'),
              color: 'accent-primary',
            },
          ]}
          columns={4}
          className="mt-16"
        />
      </Section>

      <Section background="primary" padding="lg">
        <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-content-primary magazine-headline">
          {t('streetCulture.whyStreets.title')}
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="bg-surface-secondary p-8 rounded-2xl border-l-4 border-accent-primary hover:bg-surface-elevated transition-all duration-300">
              <h3 className="font-bold text-lg mb-3 text-content-primary magazine-headline">
                {t('streetCulture.whyStreets.exclusion.title')}
              </h3>
              <p className="text-content-secondary leading-relaxed magazine-body">
                {t('streetCulture.whyStreets.exclusion.description')}
              </p>
            </div>

            <div className="bg-surface-secondary p-8 rounded-2xl border-l-4 border-accent-secondary hover:bg-surface-elevated transition-all duration-300">
              <h3 className="font-bold text-lg mb-3 text-content-primary magazine-headline">
                {t('streetCulture.whyStreets.blockParty.title')}
              </h3>
              <p className="text-content-secondary leading-relaxed magazine-body">
                {t('streetCulture.whyStreets.blockParty.description')}
              </p>
            </div>

            <div className="bg-surface-secondary p-8 rounded-2xl border-l-4 border-accent-tertiary hover:bg-surface-elevated transition-all duration-300">
              <h3 className="font-bold text-lg mb-3 text-content-primary magazine-headline">
                {t('streetCulture.whyStreets.rawExpression.title')}
              </h3>
              <p className="text-content-secondary leading-relaxed magazine-body">
                {t('streetCulture.whyStreets.rawExpression.description')}
              </p>
            </div>
          </div>

          {/* Five Elements - Expandable Cards */}
          <div className="bg-surface-secondary/50 backdrop-blur-sm p-8 rounded-3xl border border-stroke-primary">
            <h3 className="text-header-md font-black mb-8 text-content-primary text-center magazine-headline">
              {t('streetCulture.elements.title')}
            </h3>
            <div className="space-y-6">
              {/* DJ Element */}
              <FiveElementCard
                icon="🎧"
                title={t('streetCulture.elements.djing.name')}
                subtitle={t('streetCulture.elements.djing.subtitle')}
                description={t('streetCulture.elements.djing.description')}
                why={t('streetCulture.elements.djing.why')}
                pioneers={t('streetCulture.elements.djing.pioneers')}
                bgColor="bg-accent-primary/20"
                hoverColor="hover:bg-accent-primary/30"
                borderColor="border-accent-primary/30"
              />

              {/* MC Element */}
              <FiveElementCard
                icon="🎤"
                title={t('streetCulture.elements.mcing.name')}
                subtitle={t('streetCulture.elements.mcing.subtitle')}
                description={t('streetCulture.elements.mcing.description')}
                why={t('streetCulture.elements.mcing.why')}
                pioneers={t('streetCulture.elements.mcing.pioneers')}
                bgColor="bg-accent-secondary/20"
                hoverColor="hover:bg-accent-secondary/30"
                borderColor="border-accent-secondary/30"
              />

              {/* Breaking Element */}
              <FiveElementCard
                icon="💫"
                title={t('streetCulture.elements.breaking.name')}
                subtitle={t('streetCulture.elements.breaking.subtitle')}
                description={t('streetCulture.elements.breaking.description')}
                why={t('streetCulture.elements.breaking.why')}
                pioneers={t('streetCulture.elements.breaking.pioneers')}
                bgColor="bg-accent-tertiary/20"
                hoverColor="hover:bg-accent-tertiary/30"
                borderColor="border-accent-tertiary/30"
              />

              {/* Graffiti Element */}
              <FiveElementCard
                icon="🎨"
                title={t('streetCulture.elements.graffiti.name')}
                subtitle={t('streetCulture.elements.graffiti.subtitle')}
                description={t('streetCulture.elements.graffiti.description')}
                why={t('streetCulture.elements.graffiti.why')}
                pioneers={t('streetCulture.elements.graffiti.pioneers')}
                bgColor="bg-green-500/20"
                hoverColor="hover:bg-green-500/30"
                borderColor="border-green-500/30"
              />

              {/* Knowledge Element */}
              <FiveElementCard
                icon="📚"
                title={t('streetCulture.elements.knowledge.name')}
                subtitle={t('streetCulture.elements.knowledge.subtitle')}
                description={t('streetCulture.elements.knowledge.description')}
                why={t('streetCulture.elements.knowledge.why')}
                pioneers={t('streetCulture.elements.knowledge.pioneers')}
                bgColor="bg-yellow-500/20"
                hoverColor="hover:bg-yellow-500/30"
                borderColor="border-yellow-500/30"
              />
            </div>
          </div>
        </div>
      </Section>

      <Timeline
        events={compactTimeline.map((event) => ({
          year: event.year,
          icon: event.icon,
          title: t(event.titleKey),
          location: t(event.locationKey),
          description: t(event.descriptionKey),
        }))}
        title={t('streetCulture.timeline.title')}
      />

      <Section background="primary" padding="lg">
        <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-content-primary magazine-headline">
          {t('streetCulture.values.title')}
        </h2>

        <CardGrid
          items={streetValues.map((value) => ({
            icon: value.icon,
            title: t(value.titleKey),
            description: t(value.descriptionKey),
          }))}
          columns={3}
          variant="glass"
        />
      </Section>

      <Section background="primary" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-header-lg font-black mb-6 text-content-primary magazine-headline">
              {t(`streetCulture.cta.title`, {
                culture: t(`streetCulture.cta.culture`),
              })}
            </h2>
            <p className="text-content-secondary text-body-lg max-w-2xl mx-auto mb-10 leading-normal magazine-body">
              {t(`streetCulture.cta.description`)}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/styles"
                className="px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-surface-primary font-bold hover:from-accent-primary/90 hover:to-accent-secondary/90 transition-all duration-300 rounded-xl uppercase tracking-wider magazine-sans"
              >
                {t(`streetCulture.cta.exploreStyles`)}
              </Link>
              <Link
                href="/"
                className="px-8 py-4 border-2 border-stroke-primary text-content-secondary font-bold hover:border-accent-primary hover:text-accent-primary transition-colors rounded-xl uppercase tracking-wider magazine-sans"
              >
                {t(`streetCulture.cta.backHome`)}
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
