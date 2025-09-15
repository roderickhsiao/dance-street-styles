'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useIntl } from '@/i18n/hooks';
import { MainNavigation } from '@/components/MainNavigation';
import { ExpandableCard } from '@/components/ExpandableCard';
import { Timeline } from '@/components/Timeline';
import { Hero } from '@/components/Hero';
import { CardGrid } from '@/components/CardGrid';
import { Stats } from '@/components/Stats';
import { Section } from '@/components/Section';
import { VideoCarousel } from '@/components/VideoCarousel';
import { ValueCards } from '@/components/ValueCards';
import { Quote } from '@/components/Quote';
import { CTAButton } from '@/components/ui/cta-button';
import { PEOPLE } from '@/data/entities';
import { VIDEOS } from '@/data/entities';

const compactTimeline = [
  {
    year: '1973',
    titleKey: 'streetCulture.timeline.events.1973.title',
    locationKey: 'streetCulture.timeline.events.1973.location',
    descriptionKey: 'streetCulture.timeline.events.1973.description',
    icon: '🎧',
  },
  {
    year: '1975',
    titleKey: 'streetCulture.timeline.events.1975.title',
    locationKey: 'streetCulture.timeline.events.1975.location',
    descriptionKey: 'streetCulture.timeline.events.1975.description',
    icon: '💫',
  },
  {
    year: '1977',
    titleKey: 'streetCulture.timeline.events.1977.title',
    locationKey: 'streetCulture.timeline.events.1977.location',
    descriptionKey: 'streetCulture.timeline.events.1977.description',
    icon: '👥',
  },
  {
    year: '1982',
    titleKey: 'streetCulture.timeline.events.1982.title',
    locationKey: 'streetCulture.timeline.events.1982.location',
    descriptionKey: 'streetCulture.timeline.events.1982.description',
    icon: '🎬',
  },
  {
    year: '1990s',
    titleKey: 'streetCulture.timeline.events.1990s.title',
    locationKey: 'streetCulture.timeline.events.1990s.location',
    descriptionKey: 'streetCulture.timeline.events.1990s.description',
    icon: '🌍',
  },
  {
    year: '2024',
    titleKey: 'streetCulture.timeline.events.2024.title',
    locationKey: 'streetCulture.timeline.events.2024.location',
    descriptionKey: 'streetCulture.timeline.events.2024.description',
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

// Insight cards data
const insightCards = [
  {
    icon: '🏙️',
    titleKey: 'streetCulture.insights.exclusion.title',
    descriptionKey: 'streetCulture.insights.exclusion.description',
    accent: 'primary' as const,
  },
  {
    icon: '⚡',
    titleKey: 'streetCulture.insights.community.title',
    descriptionKey: 'streetCulture.insights.community.description',
    accent: 'secondary' as const,
  },
  {
    icon: '🌍',
    titleKey: 'streetCulture.insights.global.title',
    descriptionKey: 'streetCulture.insights.global.description',
    accent: 'tertiary' as const,
  },
];

// Stats data
const statsData = [
  {
    value: '1973',
    labelKey: 'streetCulture.stats.birthYear',
    color: 'accent-primary' as const,
  },
  {
    value: '5',
    labelKey: 'streetCulture.stats.coreElements',
    color: 'accent-secondary' as const,
  },
  {
    value: '180+',
    labelKey: 'streetCulture.stats.countries',
    color: 'accent-tertiary' as const,
  },
  {
    value: '2024',
    labelKey: 'streetCulture.stats.olympics',
    color: 'accent-primary' as const,
  },
];

// Why Streets sections data
const whyStreetsData = [
  {
    titleKey: 'streetCulture.whyStreets.exclusion.title',
    descriptionKey: 'streetCulture.whyStreets.exclusion.description',
    borderColor: 'border-accent-primary',
  },
  {
    titleKey: 'streetCulture.whyStreets.blockParty.title',
    descriptionKey: 'streetCulture.whyStreets.blockParty.description',
    borderColor: 'border-accent-secondary',
  },
  {
    titleKey: 'streetCulture.whyStreets.rawExpression.title',
    descriptionKey: 'streetCulture.whyStreets.rawExpression.description',
    borderColor: 'border-accent-tertiary',
  },
];

// Five Elements data
const fiveElementsData = [
  {
    icon: '🎧',
    nameKey: 'streetCulture.elements.djing.name',
    subtitleKey: 'streetCulture.elements.djing.subtitle',
    descriptionKey: 'streetCulture.elements.djing.description',
    whyKey: 'streetCulture.elements.djing.why',
    pioneers: ['dj-kool-herc', 'grandmaster-flash', 'afrika-bambaataa'],
    historicalNoteKey: 'streetCulture.elements.djing.historicalNote',
    bgColor: 'bg-accent-primary/20',
    hoverColor: 'hover:bg-accent-primary/30',
    borderColor: 'border-accent-primary/30',
    videoUrl: 'https://www.youtube.com/watch?v=Q5L2PvkZbU0',
  },
  {
    icon: '🎤',
    nameKey: 'streetCulture.elements.mcing.name',
    subtitleKey: 'streetCulture.elements.mcing.subtitle',
    descriptionKey: 'streetCulture.elements.mcing.description',
    whyKey: 'streetCulture.elements.mcing.why',
    pioneers: ['grandmaster-caz', 'melle-mel', 'kurtis-blow'],
    historicalNoteKey: 'streetCulture.elements.mcing.historicalNote',
    bgColor: 'bg-accent-secondary/20',
    hoverColor: 'hover:bg-accent-secondary/30',
    borderColor: 'border-accent-secondary/30',
    videoUrl: 'https://www.youtube.com/watch?v=s9nEeyhld2E',
  },
  {
    icon: '💫',
    nameKey: 'streetCulture.elements.breaking.name',
    subtitleKey: 'streetCulture.elements.breaking.subtitle',
    descriptionKey: 'streetCulture.elements.breaking.description',
    whyKey: 'streetCulture.elements.breaking.why',
    pioneers: ['crazy-legs', 'ken-swift', 'baby-love'],
    historicalNoteKey: 'streetCulture.elements.breaking.historicalNote',
    bgColor: 'bg-accent-tertiary/20',
    hoverColor: 'hover:bg-accent-tertiary/30',
    borderColor: 'border-accent-tertiary/30',
    videoUrl: 'https://www.youtube.com/watch?v=9TMBWCcYs3o',
  },
  {
    icon: '🎨',
    nameKey: 'streetCulture.elements.graffiti.name',
    subtitleKey: 'streetCulture.elements.graffiti.subtitle',
    descriptionKey: 'streetCulture.elements.graffiti.description',
    whyKey: 'streetCulture.elements.graffiti.why',
    pioneers: ['darryl-cornbread-mc-cray', 'taki-183', 'phase-2', 'lady-pink'],
    historicalNoteKey: 'streetCulture.elements.graffiti.historicalNote',
    bgColor: 'bg-green-500/20',
    hoverColor: 'hover:bg-green-500/30',
    borderColor: 'border-green-500/30',
    videoUrl: 'https://www.youtube.com/watch?v=O0E2Y_R85c0',
  },
  {
    icon: '📚',
    nameKey: 'streetCulture.elements.knowledge.name',
    subtitleKey: 'streetCulture.elements.knowledge.subtitle',
    descriptionKey: 'streetCulture.elements.knowledge.description',
    whyKey: 'streetCulture.elements.knowledge.why',
    pioneers: ['afrika-bambaataa', 'krs-one', 'grandmaster-flash'],
    historicalNoteKey: 'streetCulture.elements.knowledge.historicalNote',
    bgColor: 'bg-yellow-500/20',
    hoverColor: 'hover:bg-yellow-500/30',
    borderColor: 'border-yellow-500/30',
  },
];

// (compactTimeline is used above)

export default function OriginOfStreetDancePage() {
  const t = useTranslations('origins');
  const tGloblal = useTranslations();
  const intl = useIntl();

  // Translate pioneers arrays into localized, formatted lists
  const translatedFiveElements = useMemo(() => {
    return fiveElementsData.map((el) => {
      const pioneerNames = el.pioneers.map((id: string) => {
        const person = PEOPLE[id];
        if (!person) return id;
        // person.nameKey contains the i18n key for the person's name
        const name = tGloblal(person.nameKey);
        // roleKey may be present; include it in parentheses if available
        let labeledName = name;
        try {
          if (person.roleKey) {
            const role = tGloblal(person.roleKey);
            labeledName = `${name} (${role})`;
          }
        } catch {
          // if role translation fails or missing, ignore and keep name only
        }
        return labeledName;
      });

      // use our intl helper to format lists (conjunction style)
      const pioneers = intl.formatConjunctionList(pioneerNames);

      return {
        ...el,
        pioneers,
      };
    });
  }, [t, intl]);

  // Memoize translated badges
  const heroBadges = useMemo(
    () => [
      t('hero.badges.location'),
      t('hero.badges.movement'),
      t('hero.badges.impact'),
    ],
    [t]
  );

  // Memoize insight cards with translations
  const translatedInsightCards = useMemo(
    () =>
      insightCards.map((card) => ({
        icon: card.icon,
        title: t(card.titleKey),
        description: t(card.descriptionKey),
        accent: card.accent,
      })),
    [t]
  );

  // Memoize stats with translations
  const translatedStats = useMemo(
    () =>
      statsData.map((stat) => ({
        value: stat.value,
        label: t(stat.labelKey),
        color: stat.color,
      })),
    [t]
  );

  // Memoize timeline events with translations
  const translatedTimelineEvents = useMemo(
    () =>
      compactTimeline.map((event) => ({
        year: event.year,
        icon: event.icon,
        title: t(event.titleKey),
        location: t(event.locationKey),
        description: t(event.descriptionKey),
      })),
    [t]
  );

  // Memoize street values with translations
  const translatedStreetValues = useMemo(
    () =>
      streetValues.map((value) => ({
        icon: value.icon,
        title: t(value.titleKey),
        description: t(value.descriptionKey),
      })),
    [t]
  );

  // Simplified video data with just URLs
  // Video data with working YouTube URLs for Hip-Hop culture education
  const videoData = useMemo(
    () => [
      { url: VIDEOS['5-elements-of-hop-hop'].url },
      { url: VIDEOS['dj-evolution'].url },
      { url: VIDEOS['mcing-history'].url },
      { url: VIDEOS['breaking-documentary'].url },
      { url: VIDEOS['graffiti-art'].url },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-surface-primary">
      <MainNavigation />

      <Hero
        backgroundVariant="magazine"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        badges={heroBadges}
      />

      <Section background="secondary" padding="lg">
        <CardGrid items={translatedInsightCards} columns={3} />

        <Stats stats={translatedStats} columns={4} className="mt-16" />
      </Section>

      <Section background="primary" padding="lg">
        <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-content-primary magazine-headline">
          {t('streetCulture.whyStreets.title')}
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {whyStreetsData.map((section, index) => (
              <div
                key={index}
                className={`bg-surface-secondary p-4 sm:p-6 md:p-8 rounded-2xl border-l-4 ${section.borderColor} hover:bg-surface-elevated transition-all duration-300`}
              >
                <h3 className="font-bold text-lg mb-3 text-content-primary magazine-headline">
                  {t(section.titleKey)}
                </h3>
                <p className="text-content-secondary leading-relaxed magazine-body">
                  {t(section.descriptionKey)}
                </p>
              </div>
            ))}
          </div>

          {/* Five Elements - Expandable Cards */}
          <div className="bg-surface-secondary/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-3xl border border-stroke-primary">
            <h3 className="text-header-md font-black mb-8 text-content-primary text-center magazine-headline">
              {t('streetCulture.elements.title')}
            </h3>
            <div className="space-y-6">
              {translatedFiveElements.map((element, index) => (
                <ExpandableCard
                  key={index}
                  icon={element.icon}
                  title={t(element.nameKey)}
                  subtitle={t(element.subtitleKey)}
                  description={t(element.descriptionKey)}
                  why={t(element.whyKey)}
                  pioneers={element.pioneers}
                  historicalNote={t(element.historicalNoteKey)}
                  bgColor={element.bgColor}
                  hoverColor={element.hoverColor}
                  borderColor={element.borderColor}
                  videoUrl={element.videoUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Timeline
        events={translatedTimelineEvents}
        title={t('streetCulture.timeline.title')}
      />

      <VideoCarousel videos={videoData} className="bg-surface-secondary" />

      <Section background="primary" padding="none">
        <ValueCards
          values={translatedStreetValues}
          title={t('streetCulture.values.title')}
        />
      </Section>

      <Section background="primary" padding="lg">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-header-xl font-black mb-6 text-content-primary magazine-headline">
              {t('legacy.title')}
            </h2>
            <p className="text-content-secondary text-body-lg max-w-4xl mx-auto leading-relaxed magazine-body">
              {t('legacy.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-surface-secondary/30 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl border border-stroke-secondary text-center"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-header-sm font-black mb-4 text-content-primary magazine-headline">
                {t('legacy.foundation.title')}
              </h3>
              <p className="text-content-secondary text-body-sm leading-relaxed magazine-body">
                {t('legacy.foundation.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-surface-secondary/30 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl border border-stroke-secondary text-center"
            >
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-header-sm font-black mb-4 text-content-primary magazine-headline">
                {t('legacy.globalImpact.title')}
              </h3>
              <p className="text-content-secondary text-body-sm leading-relaxed magazine-body">
                {t('legacy.globalImpact.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-surface-secondary/30 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl border border-stroke-secondary text-center"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-header-sm font-black mb-4 text-content-primary magazine-headline">
                {t('legacy.futureForward.title')}
              </h3>
              <p className="text-content-secondary text-body-sm leading-relaxed magazine-body">
                {t('legacy.futureForward.description')}
              </p>
            </motion.div>
          </div>

          <div className="text-center">
            <Quote
              quote={t('legacy.quote.text')}
              author={t('legacy.quote.author')}
              authorTitle={t('legacy.quote.title')}
              variant="featured"
              className="mb-8"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <CTAButton
                href="/styles"
                variant="filled"
                size="default"
                showArrow={true}
              >
                {t('legacy.cta.exploreStyles')}
              </CTAButton>
              <CTAButton href="/" variant="outline" size="default">
                {t('legacy.cta.backHome')}
              </CTAButton>
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
}
