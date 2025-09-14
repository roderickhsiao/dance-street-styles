import { useMemo } from 'react';

export interface FeatureCardData {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  hoverBorderColor: string;
  delay: number;
}

export const useFeatureCardsData = (): FeatureCardData[] => {
  return useMemo(() => [
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
  ], []);
};
