import { getTranslations } from 'next-intl/server';
import { getAllDanceStyles } from '../../data/danceStyles';
import { HomePageClient } from './HomePageClient';
import { FeatureCardData } from '../../data/featureCards';

// Add ISR with 24 hour revalidation for mostly static content
export const revalidate = 86400; // 24 hours

// Server-side feature cards data (no hooks needed)
const getFeatureCardsData = (): FeatureCardData[] => [
  {
    id: 'origins',
    icon: '🎤',
    titleKey: 'streetSection.cards.0.title',
    descriptionKey: 'streetSection.description',
    gradientFrom: 'from-orange-500/10',
    gradientTo: 'to-pink-500/10',
    borderColor: 'border-orange-500/20',
    hoverBorderColor: 'hover:border-orange-500/40',
    delay: 0.8
  },
  {
    id: 'movement',
    icon: '💃',
    titleKey: 'streetSection.cards.1.title',
    descriptionKey: 'streetSection.cards.1.description',
    gradientFrom: 'from-pink-500/10',
    gradientTo: 'to-purple-500/10',
    borderColor: 'border-pink-500/20',
    hoverBorderColor: 'hover:border-pink-500/40',
    delay: 1.0
  },
  {
    id: 'impact',
    icon: '🌍',
    titleKey: 'streetSection.impact.title',
    descriptionKey: 'streetSection.impact.description',
    gradientFrom: 'from-purple-500/10',
    gradientTo: 'to-blue-500/10',
    borderColor: 'border-purple-500/20',
    hoverBorderColor: 'hover:border-purple-500/40',
    delay: 1.2
  }
];

export default async function HomePage() {
  const tOverview = await getTranslations('overview');
  const danceStyles = getAllDanceStyles();
  const featureCardsData = getFeatureCardsData();

  // Pre-compute stats server-side to avoid client-side calculations
  const overviewStats = [
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
  ];

  return (
    <HomePageClient 
      danceStyles={danceStyles}
      featureCardsData={featureCardsData}
      overviewStats={overviewStats}
    />
  );
}
