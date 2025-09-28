// Extract page data to separate files for better organization

export interface AboutPageData {
  sections: Array<{
    id: string;
    titleKey: string;
    contentKey: string;
    background: 'primary' | 'secondary' | 'elevated';
  }>;
}

export const aboutPageData: AboutPageData = {
  sections: [
    {
      id: 'mission',
      titleKey: 'mission.title',
      contentKey: 'mission.content',
      background: 'primary'
    },
    {
      id: 'recognition', 
      titleKey: 'recognition.title',
      contentKey: 'recognition.content',
      background: 'secondary'
    },
    {
      id: 'culturalLearning',
      titleKey: 'culturalLearning.title', 
      contentKey: 'culturalLearning.content',
      background: 'secondary'
    },
    {
      id: 'content',
      titleKey: 'content.title',
      contentKey: 'content.description', 
      background: 'primary'
    },
    {
      id: 'feedback',
      titleKey: 'feedback.title',
      contentKey: 'feedback.content',
      background: 'secondary'
    },
    {
      id: 'technical',
      titleKey: 'technical.title',
      contentKey: 'technical.description',
      background: 'secondary'
    }
  ]
};

// Origins page feature cards data
export interface OriginFeatureCard {
  emoji: string;
  titleKey: string;
  descriptionKey: string;
}

export const originLegacyCards: OriginFeatureCard[] = [
  {
    emoji: '🎯',
    titleKey: 'legacy.foundation.title',
    descriptionKey: 'legacy.foundation.description'
  },
  {
    emoji: '🔥',
    titleKey: 'legacy.evolution.title', 
    descriptionKey: 'legacy.evolution.description'
  },
  {
    emoji: '🚀',
    titleKey: 'legacy.futureForward.title',
    descriptionKey: 'legacy.futureForward.description'
  }
];