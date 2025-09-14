import { DanceStyle, DanceStyleId } from './types';

// Re-export the enum for convenience
export { DanceStyleId };

export interface DanceStyleTag {
  id: string;
  nameKey: string;
  icon: string;
  color: 'primary' | 'secondary' | 'tertiary';
}

// Flexible tags that can be applied to multiple styles
export const danceStyleTags: DanceStyleTag[] = [
  {
    id: 'hipHopFoundation',
    nameKey: 'danceTags.hipHopFoundation.name',
    icon: '🎧',
    color: 'primary'
  },
  {
    id: 'funkStyles',
    nameKey: 'danceTags.funkStyles.name',
    icon: '🕺',
    color: 'secondary'
  },
  {
    id: 'clubCulture',
    nameKey: 'danceTags.clubCulture.name',
    icon: '🏠',
    color: 'tertiary'
  },
  {
    id: 'ballroomCulture',
    nameKey: 'danceTags.ballroomCulture.name',
    icon: '💃',
    color: 'primary'
  },
  {
    id: 'streetBattle',
    nameKey: 'danceTags.streetBattle.name',
    icon: '⚡',
    color: 'secondary'
  },
  {
    id: 'socialDance',
    nameKey: 'danceTags.socialDance.name',
    icon: '👥',
    color: 'tertiary'
  },
  {
    id: 'theatrical',
    nameKey: 'danceTags.theatrical.name',
    icon: '🎭',
    color: 'primary'
  },
  {
    id: 'underground',
    nameKey: 'danceTags.underground.name',
    icon: '🔥',
    color: 'secondary'
  },
  {
    id: 'modernStreet',
    nameKey: 'danceTags.modernStreet.name',
    icon: '🌟',
    color: 'tertiary'
  }
];

// Enhanced data structure - all user-visible content comes from translations
export const danceStyles: DanceStyle[] = [
  {
    id: DanceStyleId.BREAKING,
    nameKey: 'danceStyles.names.breaking',
    slug: 'breaking',
    shortDescriptionKey: 'danceStyles.shortDescriptions.breaking',
    fullDescriptionKey: 'styles.detailed.breaking.description',
    era: '1970s',
    eraKey: 'styles.eras.1970s',
    location: 'South Bronx, NYC',
    locationKey: 'styles.locations.southBronxNYC',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['hipHopFoundation', 'streetBattle', 'underground'],
    origins: {
      yearKey: 'styles.eras.1970s',
      locationKey: 'styles.locations.southBronxNYC',
      cultureKey: 'styles.detailed.breaking.origins.culture'
    },
    characteristicsKey: 'styles.detailed.breaking.characteristics.items',
    keyMovesKey: 'styles.detailed.breaking.keyMoves.items',
    influentialArtistsKey: 'styles.detailed.breaking.influentialArtists.items',
    musicGenresKey: 'styles.detailed.breaking.musicGenres.items',
    videosKey: 'styles.detailed.breaking.videos.items',
    timelineKey: 'styles.detailed.breaking.timeline.events',
    theme: {
      primary: '#E74C3C',
      secondary: '#C0392B',
      accent: '#F39C12',
      background: '#2C3E50',
      foreground: '#ECF0F1',
      muted: '#7F8C8D'
    },
    relatedStyles: [DanceStyleId.HIP_HOP]
  },
  {
    id: DanceStyleId.HIP_HOP,
    nameKey: 'danceStyles.names.hipHop',
    slug: 'hip-hop',
    shortDescriptionKey: 'danceStyles.shortDescriptions.hipHop',
    fullDescriptionKey: 'styles.detailed.hipHop.description',
    era: '1970s',
    eraKey: 'styles.eras.1970s',
    location: 'New York City',
    locationKey: 'styles.locations.newYorkCity',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['hipHopFoundation', 'socialDance', 'streetBattle'],
    origins: {
      yearKey: 'styles.eras.1970s',
      locationKey: 'styles.locations.newYorkCity',
      cultureKey: 'styles.detailed.hipHop.origins.culture'
    },
    theme: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F',
      background: '#1A1A1A',
      foreground: '#FFFFFF',
      muted: '#4A4A4A'
    },
    relatedStyles: [DanceStyleId.BREAKING, DanceStyleId.POPPING, DanceStyleId.LOCKING]
  },
  {
    id: DanceStyleId.POPPING,
    nameKey: 'danceStyles.names.popping',
    slug: 'popping',
    shortDescriptionKey: 'danceStyles.shortDescriptions.popping',
    fullDescriptionKey: 'styles.detailed.popping.description',
    era: '1960s-1970s',
    eraKey: 'styles.eras.1960s1970s',
    location: 'Fresno, CA',
    locationKey: 'styles.locations.fresnoCA',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['funkStyles', 'streetBattle', 'theatrical'],
    origins: {
      yearKey: 'styles.eras.1960s1970s',
      locationKey: 'styles.locations.fresnoCA',
      cultureKey: 'styles.detailed.popping.origins.culture'
    },
    theme: {
      primary: '#9B59B6',
      secondary: '#8E44AD',
      accent: '#E67E22',
      background: '#34495E',
      foreground: '#FFFFFF',
      muted: '#95A5A6'
    },
    relatedStyles: [DanceStyleId.LOCKING]
  },
  {
    id: DanceStyleId.LOCKING,
    nameKey: 'danceStyles.names.locking',
    slug: 'locking',
    shortDescriptionKey: 'danceStyles.shortDescriptions.locking',
    fullDescriptionKey: 'styles.detailed.locking.description',
    era: '1960s-1970s',
    eraKey: 'styles.eras.1960s1970s',
    location: 'Los Angeles, CA',
    locationKey: 'styles.locations.losAngelesCA',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['funkStyles', 'socialDance', 'theatrical'],
    origins: {
      yearKey: 'styles.eras.1960s1970s',
      locationKey: 'styles.locations.losAngelesCA',
      cultureKey: 'styles.detailed.locking.origins.culture'
    },
    theme: {
      primary: '#F1C40F',
      secondary: '#F39C12',
      accent: '#E67E22',
      background: '#2C3E50',
      foreground: '#2C3E50',
      muted: '#7F8C8D'
    },
    relatedStyles: [DanceStyleId.POPPING, DanceStyleId.WAACKING, DanceStyleId.HIP_HOP]
  },
  {
    id: DanceStyleId.HOUSE,
    nameKey: 'danceStyles.names.house',
    slug: 'house',
    shortDescriptionKey: 'danceStyles.shortDescriptions.house',
    fullDescriptionKey: 'styles.detailed.house.description',
    era: '1980s-1990s',
    eraKey: 'styles.eras.1980s1990s',
    location: 'Chicago & NYC',
    locationKey: 'styles.locations.chicagoNYC',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['clubCulture', 'socialDance', 'underground'],
    origins: {
      yearKey: 'styles.eras.1980s1990s',
      locationKey: 'styles.locations.chicagoNYC',
      cultureKey: 'styles.detailed.house.origins.culture'
    },
    theme: {
      primary: '#3498DB',
      secondary: '#2980B9',
      accent: '#1ABC9C',
      background: '#ECF0F1',
      foreground: '#2C3E50',
      muted: '#BDC3C7'
    },
    relatedStyles: [DanceStyleId.VOGUING, DanceStyleId.WAACKING]
  },
  {
    id: DanceStyleId.VOGUING,
    nameKey: 'danceStyles.names.voguing',
    slug: 'voguing',
    shortDescriptionKey: 'danceStyles.shortDescriptions.voguing',
    fullDescriptionKey: 'styles.detailed.voguing.description',
    era: '1960s-1980s',
    eraKey: 'styles.eras.1960s1980s',
    location: 'Harlem, NYC',
    locationKey: 'styles.locations.harlemNYC',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['ballroomCulture', 'theatrical', 'underground'],
    origins: {
      yearKey: 'styles.eras.1960s1980s',
      locationKey: 'styles.locations.harlemNYC',
      cultureKey: 'styles.detailed.voguing.origins.culture'
    },
    theme: {
      primary: '#E91E63',
      secondary: '#AD1457',
      accent: '#FF5722',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242'
    },
    relatedStyles: [DanceStyleId.HOUSE, DanceStyleId.WAACKING]
  },
  {
    id: DanceStyleId.WAACKING,
    nameKey: 'danceStyles.names.waacking',
    slug: 'waacking',
    shortDescriptionKey: 'danceStyles.shortDescriptions.waacking',
    fullDescriptionKey: 'styles.detailed.waacking.description',
    era: '1970s',
    eraKey: 'styles.eras.1970s',
    location: 'Los Angeles, CA',
    locationKey: 'styles.locations.losAngelesCA',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['funkStyles', 'ballroomCulture', 'theatrical', 'clubCulture'],
    origins: {
      yearKey: 'styles.eras.1970s',
      locationKey: 'styles.locations.losAngelesCA',
      cultureKey: 'styles.detailed.waacking.origins.culture'
    },
    theme: {
      primary: '#FF1744',
      secondary: '#D50000',
      accent: '#FF5722',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242'
    },
    relatedStyles: [DanceStyleId.VOGUING, DanceStyleId.LOCKING]
  },
  {
    id: DanceStyleId.KRUMPING,
    nameKey: 'danceStyles.names.krumping',
    slug: 'krumping',
    shortDescriptionKey: 'danceStyles.shortDescriptions.krumping',
    fullDescriptionKey: 'styles.detailed.krumping.description',
    era: '2000s',
    eraKey: 'styles.eras.2000s',
    location: 'South Central LA',
    locationKey: 'styles.locations.southCentralLA',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['streetBattle', 'theatrical', 'underground'],
    origins: {
      yearKey: 'styles.eras.2000s',
      locationKey: 'styles.locations.southCentralLA',
      cultureKey: 'styles.detailed.krumping.origins.culture'
    },
    theme: {
      primary: '#FF4081',
      secondary: '#E91E63',
      accent: '#FF5722',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242'
    },
    relatedStyles: [DanceStyleId.HIP_HOP, DanceStyleId.BREAKING]
  },
  {
    id: DanceStyleId.HUSTLE,
    nameKey: 'danceStyles.names.hustle',
    slug: 'hustle',
    shortDescriptionKey: 'danceStyles.shortDescriptions.hustle',
    fullDescriptionKey: 'styles.detailed.hustle.description',
    era: '1970s',
    eraKey: 'styles.eras.1970s',
    location: 'New York City',
    locationKey: 'styles.locations.newYorkCity',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['clubCulture', 'socialDance'],
    origins: {
      yearKey: 'styles.eras.1970s',
      locationKey: 'styles.locations.newYorkCity',
      cultureKey: 'styles.detailed.hustle.origins.culture'
    },
    theme: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242'
    },
    relatedStyles: [DanceStyleId.HOUSE]
  },
  {
    id: DanceStyleId.PUNKING,
    nameKey: 'danceStyles.names.punking',
    slug: 'punking',
    shortDescriptionKey: 'danceStyles.shortDescriptions.punking',
    fullDescriptionKey: 'styles.detailed.punking.description',
    era: '1970s-1980s',
    eraKey: 'styles.eras.1970s1980s',
    location: 'New York City',
    locationKey: 'styles.locations.newYorkCity',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['ballroomCulture', 'theatrical', 'funkStyles'],
    origins: {
      yearKey: 'styles.eras.1970s1980s',
      locationKey: 'styles.locations.newYorkCity',
      cultureKey: 'styles.detailed.punking.origins.culture'
    },
    theme: {
      primary: '#E91E63',
      secondary: '#AD1457', 
      accent: '#F06292',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242'
    },
    relatedStyles: [DanceStyleId.WAACKING, DanceStyleId.VOGUING]
  },
  {
    id: DanceStyleId.TURFING,
    nameKey: 'danceStyles.names.turfing',
    slug: 'turfing',
    shortDescriptionKey: 'danceStyles.shortDescriptions.turfing',
    fullDescriptionKey: 'styles.detailed.turfing.description',
    era: '2000s',
    eraKey: 'styles.eras.2000s',
    location: 'Oakland, CA',
    locationKey: 'styles.locations.oaklandCA',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['hipHopFoundation', 'streetBattle', 'modernStreet'],
    origins: {
      yearKey: 'styles.eras.2000s',
      locationKey: 'styles.locations.oaklandCA',
      cultureKey: 'styles.detailed.turfing.origins.culture'
    },
    theme: {
      primary: '#1E88E5',
      secondary: '#42A5F5',
      accent: '#FFC107',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242'
    },
    relatedStyles: [DanceStyleId.HIP_HOP, DanceStyleId.POPPING, DanceStyleId.BREAKING]
  }
];

// Helper functions for comprehensive data access
export const getDanceStyleById = (id: DanceStyleId | string): DanceStyle | undefined => {
  return danceStyles.find(style => style.id === id);
};

export const getDanceStyleBySlug = (slug: string): DanceStyle | undefined => {
  return danceStyles.find(style => style.slug === slug);
};

export const getRelatedStyles = (styleId: DanceStyleId | string): DanceStyle[] => {
  const style = getDanceStyleById(styleId as DanceStyleId);
  if (!style) return [];
  
  return style.relatedStyles
    .map(relatedId => getDanceStyleById(relatedId))
    .filter((style): style is DanceStyle => style !== undefined);
};

export const getAllDanceStyles = (): DanceStyle[] => {
  return danceStyles;
};

// Enhanced helper functions from categories
export const getStylesByTag = (tagId: string): DanceStyle[] => {
  return danceStyles.filter(style => style.tags.includes(tagId));
};

export const getTagById = (tagId: string): DanceStyleTag | undefined => {
  return danceStyleTags.find(tag => tag.id === tagId);
};

export const getStylesByEra = (era: string): DanceStyle[] => {
  return danceStyles.filter(style => style.era === era);
};

export const getStylesByLocation = (location: string): DanceStyle[] => {
  return danceStyles.filter(style => 
    style.location.toLowerCase().includes(location.toLowerCase())
  );
};

// Get all unique eras and locations for filtering
export const getAllEras = (): string[] => {
  return [...new Set(danceStyles.map(style => style.era))].sort();
};

export const getAllLocations = (): string[] => {
  return [...new Set(danceStyles.map(style => style.location))].sort();
};

// Get all tags used by styles
export const getAllUsedTags = (): DanceStyleTag[] => {
  const usedTagIds = [...new Set(danceStyles.flatMap(style => style.tags))];
  return danceStyleTags.filter(tag => usedTagIds.includes(tag.id));
};
