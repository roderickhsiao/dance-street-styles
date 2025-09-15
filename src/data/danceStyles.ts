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
    color: 'primary',
  },
  {
    id: 'funkStyles',
    nameKey: 'danceTags.funkStyles.name',
    icon: '🕺',
    color: 'secondary',
  },
  {
    id: 'clubCulture',
    nameKey: 'danceTags.clubCulture.name',
    icon: '🏠',
    color: 'tertiary',
  },
  {
    id: 'ballroomCulture',
    nameKey: 'danceTags.ballroomCulture.name',
    icon: '💃',
    color: 'primary',
  },
  {
    id: 'streetBattle',
    nameKey: 'danceTags.streetBattle.name',
    icon: '⚡',
    color: 'secondary',
  },
  {
    id: 'socialDance',
    nameKey: 'danceTags.socialDance.name',
    icon: '👥',
    color: 'tertiary',
  },
  {
    id: 'theatrical',
    nameKey: 'danceTags.theatrical.name',
    icon: '🎭',
    color: 'primary',
  },
  {
    id: 'underground',
    nameKey: 'danceTags.underground.name',
    icon: '🔥',
    color: 'secondary',
  },
  {
    id: 'modernStreet',
    nameKey: 'danceTags.modernStreet.name',
    icon: '🌟',
    color: 'tertiary',
  },
  {
    id: 'party',
    nameKey: 'danceTags.party.name',
    icon: '🎉',
    color: 'primary',
  },
  {
    id: 'japanese',
    nameKey: 'danceTags.japanese.name',
    icon: '🇯🇵',
    color: 'secondary',
  },
];

// Enhanced data structure - all user-visible content comes from translations
export const danceStyles: DanceStyle[] = [
  {
    id: DanceStyleId.BREAKING,
    nameKey: 'danceStyles.names.breaking',
    slug: 'breaking',
    shortDescriptionKey: 'danceStyles.shortDescriptions.breaking',
    fullDescriptionKey: 'styles.detailed.breaking.description',
    eraKey: 'eras.1970s',
    locationKey: 'locations.southBronxNYC',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['hipHopFoundation', 'streetBattle', 'underground'],
    origins: {
      yearKey: 'eras.1970s',
      locationKey: 'locations.southBronxNYC',
      cultureKey: 'styles.detailed.breaking.origins.culture',
    },
    characteristicsKey: 'styles.detailed.breaking.characteristics.items',
    keyMovesKey: 'styles.detailed.breaking.keyMoves.items',
    influentialArtistsKey: 'styles.detailed.breaking.influentialArtists.items',
    videosKey: 'styles.detailed.breaking.videos.items',
    timelineKey: 'styles.detailed.breaking.timeline.events',
    featuredVideoId: 'breaking-documentary',
    videoIds: [], // Additional videos
    theme: {
      primary: '#E74C3C',
      secondary: '#C0392B',
      accent: '#F39C12',
      background: '#2C3E50',
      foreground: '#ECF0F1',
      muted: '#7F8C8D',
    },
    relatedStyles: [DanceStyleId.HIP_HOP, DanceStyleId.POPPING, DanceStyleId.LOCKING],
  },
  {
    id: DanceStyleId.HIP_HOP,
    nameKey: 'danceStyles.names.hipHop',
    slug: 'hip-hop',
    shortDescriptionKey: 'danceStyles.shortDescriptions.hipHop',
    fullDescriptionKey: 'styles.detailed.hipHop.description',
    eraKey: 'eras.1970s',
    locationKey: 'locations.newYorkCity',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['hipHopFoundation', 'socialDance', 'streetBattle'],
    origins: {
      yearKey: 'eras.1970s',
      locationKey: 'locations.newYorkCity',
      cultureKey: 'styles.detailed.hipHop.origins.culture',
    },
    featuredVideoId: 'hiphop-birth',
    videoIds: ['5-elements-of-hop-hop', 'dj-evolution', 'mcing-history', 'graffiti-art'],
    theme: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F',
      background: '#1A1A1A',
      foreground: '#FFFFFF',
      muted: '#4A4A4A',
    },
    relatedStyles: [DanceStyleId.BREAKING, DanceStyleId.POPPING, DanceStyleId.LOCKING, DanceStyleId.KRUMPING],
  },
  {
    id: DanceStyleId.POPPING,
    nameKey: 'danceStyles.names.popping',
    slug: 'popping',
    shortDescriptionKey: 'danceStyles.shortDescriptions.popping',
    fullDescriptionKey: 'styles.detailed.popping.description',
    eraKey: 'eras.1960s1970s',
    locationKey: 'locations.fresnoCA',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['funkStyles', 'streetBattle', 'theatrical'],
    origins: {
      yearKey: 'eras.1960s1970s',
      locationKey: 'locations.fresnoCA',
      cultureKey: 'styles.detailed.popping.origins.culture',
    },
    featuredVideoId: 'popping-interview',
    theme: {
      primary: '#9B59B6',
      secondary: '#8E44AD',
      accent: '#E67E22',
      background: '#34495E',
      foreground: '#FFFFFF',
      muted: '#95A5A6',
    },
    relatedStyles: [DanceStyleId.LOCKING, DanceStyleId.BREAKING, DanceStyleId.HIP_HOP],
  },
  {
    id: DanceStyleId.LOCKING,
    nameKey: 'danceStyles.names.locking',
    slug: 'locking',
    shortDescriptionKey: 'danceStyles.shortDescriptions.locking',
    fullDescriptionKey: 'styles.detailed.locking.description',
    eraKey: 'eras.1960s1970s',
    locationKey: 'locations.losAngelesCA',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['funkStyles', 'socialDance', 'theatrical'],
    origins: {
      yearKey: 'eras.1960s1970s',
      locationKey: 'locations.losAngelesCA',
      cultureKey: 'styles.detailed.locking.origins.culture',
    },
  featuredVideoId: 'locking-featured',
  videoIds: ['toni-basil-lockers-memories'], // Additional videos
  influentialArtistIds: ['don-campbell', 'toni-basil'],
  crewIds: ['the-lockers'],
  dancerIds: ['don-campbell', 'toni-basil'],
  moveIds: ['the-lock', 'points'],
  musicGenreIds: ['funk', 'soul'],
  // Musical characteristics (structured above in `musicGenres`)
    theme: {
      primary: '#F1C40F',
      secondary: '#F39C12',
      accent: '#E67E22',
      background: '#2C3E50',
      foreground: '#2C3E50',
      muted: '#7F8C8D',
    },
    relatedStyles: [
      DanceStyleId.POPPING,
      DanceStyleId.WAACKING,
      DanceStyleId.HIP_HOP,
      DanceStyleId.BREAKING,
    ],
  },
  {
    id: DanceStyleId.HOUSE,
    nameKey: 'danceStyles.names.house',
    slug: 'house',
    shortDescriptionKey: 'danceStyles.shortDescriptions.house',
    fullDescriptionKey: 'styles.detailed.house.description',
    eraKey: 'eras.1980s1990s',
    locationKey: 'locations.chicagoNYC',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['clubCulture', 'socialDance', 'underground'],
    origins: {
      yearKey: 'eras.1980s1990s',
      locationKey: 'locations.chicagoNYC',
      cultureKey: 'styles.detailed.house.origins.culture',
    },
    featuredVideoId: 'house-marjory-smarth',
    theme: {
      primary: '#3498DB',
      secondary: '#2980B9',
      accent: '#1ABC9C',
      background: '#ECF0F1',
      foreground: '#2C3E50',
      muted: '#BDC3C7',
    },
    relatedStyles: [DanceStyleId.HIP_HOP, DanceStyleId.LITEFEET, DanceStyleId.HUSTLE, DanceStyleId.FOOTWORK],
  },
  {
    id: DanceStyleId.VOGUING,
    nameKey: 'danceStyles.names.voguing',
    slug: 'voguing',
    shortDescriptionKey: 'danceStyles.shortDescriptions.voguing',
    fullDescriptionKey: 'styles.detailed.voguing.description',
    eraKey: 'eras.1960s1980s',
    locationKey: 'locations.harlemNYC',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['ballroomCulture', 'theatrical', 'underground'],
    origins: {
      yearKey: 'eras.1960s1980s',
      locationKey: 'locations.harlemNYC',
      cultureKey: 'styles.detailed.voguing.origins.culture',
    },
    featuredVideoId: 'voguing-lgbtq-history',
    theme: {
      primary: '#E91E63',
      secondary: '#AD1457',
      accent: '#FF5722',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    relatedStyles: [DanceStyleId.WAACKING, DanceStyleId.PUNKING, DanceStyleId.HOUSE],
  },
  {
    id: DanceStyleId.WAACKING,
    nameKey: 'danceStyles.names.waacking',
    slug: 'waacking',
    shortDescriptionKey: 'danceStyles.shortDescriptions.waacking',
    fullDescriptionKey: 'styles.detailed.waacking.description',
    eraKey: 'eras.1970s',
    locationKey: 'locations.losAngelesCA',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['funkStyles', 'ballroomCulture', 'theatrical', 'clubCulture'],
    origins: {
      yearKey: 'eras.1970s',
      locationKey: 'locations.losAngelesCA',
      cultureKey: 'styles.detailed.waacking.origins.culture',
    },
    featuredVideoId: 'waacking-tyrone-proctor',
    theme: {
      primary: '#FF1744',
      secondary: '#D50000',
      accent: '#FF5722',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    relatedStyles: [DanceStyleId.VOGUING, DanceStyleId.LOCKING, DanceStyleId.PUNKING],
  },
  {
    id: DanceStyleId.KRUMPING,
    nameKey: 'danceStyles.names.krumping',
    slug: 'krumping',
    shortDescriptionKey: 'danceStyles.shortDescriptions.krumping',
    fullDescriptionKey: 'styles.detailed.krumping.description',
    eraKey: 'eras.2000s',
    locationKey: 'locations.southCentralLA',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['streetBattle', 'theatrical', 'underground'],
    origins: {
      yearKey: 'eras.2000s',
      locationKey: 'locations.southCentralLA',
      cultureKey: 'styles.detailed.krumping.origins.culture',
    },
    theme: {
      primary: '#FF4081',
      secondary: '#E91E63',
      accent: '#FF5722',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    featuredVideoId: 'krumping-tommy-clown',
    relatedStyles: [DanceStyleId.HIP_HOP, DanceStyleId.BREAKING, DanceStyleId.TURFING],
  },
  {
    id: DanceStyleId.HUSTLE,
    nameKey: 'danceStyles.names.hustle',
    slug: 'hustle',
    shortDescriptionKey: 'danceStyles.shortDescriptions.hustle',
    fullDescriptionKey: 'styles.detailed.hustle.description',
    eraKey: 'eras.1970s',
    locationKey: 'locations.newYorkCity',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['clubCulture', 'socialDance'],
    origins: {
      yearKey: 'eras.1970s',
      locationKey: 'locations.newYorkCity',
      cultureKey: 'styles.detailed.hustle.origins.culture',
    },
    theme: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    featuredVideoId: 'hustle-latin-origins',
    relatedStyles: [DanceStyleId.HOUSE, DanceStyleId.HIP_HOP],
  },
  {
    id: DanceStyleId.PUNKING,
    nameKey: 'danceStyles.names.punking',
    slug: 'punking',
    shortDescriptionKey: 'danceStyles.shortDescriptions.punking',
    fullDescriptionKey: 'styles.detailed.punking.description',
    eraKey: 'eras.1970s',
    locationKey: 'locations.losAngelesCA',
    eraIcon: '📅',
    featuredVideoId: 'punking-featured',
    locationIcon: '📍',
    tags: ['ballroomCulture', 'theatrical', 'funkStyles'],
    origins: {
      yearKey: 'eras.1970s',
      locationKey: 'locations.losAngelesCA',
      cultureKey: 'styles.detailed.punking.origins.culture',
    },
    theme: {
      primary: '#E91E63',
      secondary: '#AD1457',
      accent: '#F06292',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    relatedStyles: [DanceStyleId.WAACKING, DanceStyleId.VOGUING, DanceStyleId.LOCKING],
  },
  {
    id: DanceStyleId.TURFING,
    nameKey: 'danceStyles.names.turfing',
    slug: 'turfing',
    shortDescriptionKey: 'danceStyles.shortDescriptions.turfing',
    fullDescriptionKey: 'styles.detailed.turfing.description',
    eraKey: 'eras.2000s',
    locationKey: 'locations.oaklandCA',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['hipHopFoundation', 'streetBattle', 'modernStreet'],
    origins: {
      yearKey: 'eras.2000s',
      locationKey: 'locations.oaklandCA',
      cultureKey: 'styles.detailed.turfing.origins.culture',
    },
    featuredVideoId: 'turfing-liquid-flow',
    videoIds: ['turfing-scorpion-lopez'],
    theme: {
      primary: '#1E88E5',
      secondary: '#42A5F5',
      accent: '#FFC107',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    relatedStyles: [
      DanceStyleId.HIP_HOP,
      DanceStyleId.POPPING,
      DanceStyleId.KRUMPING,
    ],
  },
  {
    id: DanceStyleId.LITEFEET,
    nameKey: 'danceStyles.names.litefeet',
    slug: 'litefeet',
    shortDescriptionKey: 'danceStyles.shortDescriptions.litefeet',
    fullDescriptionKey: 'styles.detailed.litefeet.description',
    eraKey: 'eras.2000s',
    locationKey: 'locations.harlemNYC',
    eraIcon: '📅',
    locationIcon: '📍',
    featuredVideoId: 'litefeet-sound-of-subway',
    tags: ['hipHopFoundation', 'socialDance', 'modernStreet'],
    origins: {
      yearKey: 'eras.2000s',
      locationKey: 'locations.harlemNYC',
      cultureKey: 'styles.detailed.litefeet.origins.culture',
    },
    characteristicsKey: 'styles.detailed.litefeet.characteristics.items',
    keyMovesKey: 'styles.detailed.litefeet.keyMoves.items',
    influentialArtistsKey: 'styles.detailed.litefeet.influentialArtists.items',
    videosKey: 'styles.detailed.litefeet.videos.items',
    timelineKey: 'styles.detailed.litefeet.timeline.events',
    theme: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    relatedStyles: [
      DanceStyleId.HIP_HOP,
      DanceStyleId.HOUSE,
      DanceStyleId.HUSTLE,
    ],
  },
  {
    id: DanceStyleId.FOOTWORK,
    nameKey: 'danceStyles.names.footwork',
    slug: 'footwork',
    shortDescriptionKey: 'danceStyles.shortDescriptions.footwork',
    fullDescriptionKey: 'styles.detailed.footwork.description',
    eraKey: 'eras.1980s1990s',
    locationKey: 'locations.chicagoIL',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['clubCulture', 'streetBattle', 'modernStreet', 'underground'],
    origins: {
      yearKey: 'eras.1980s1990s',
      locationKey: 'locations.chicagoIL',
      cultureKey: 'styles.detailed.footwork.origins.culture',
    },
    theme: {
      primary: '#FF6F00',
      secondary: '#FF8F00',
      accent: '#FFC107',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    featuredVideoId: 'footwork-featured',
    videoIds: ['footwork-let-me-see'],
    relatedStyles: [DanceStyleId.HOUSE, DanceStyleId.JIT, DanceStyleId.HIP_HOP],
  },
  {
    id: DanceStyleId.JIT,
    nameKey: 'danceStyles.names.jit',
    slug: 'jit',
    shortDescriptionKey: 'danceStyles.shortDescriptions.jit',
    fullDescriptionKey: 'styles.detailed.jit.description',
    eraKey: 'eras.1970s1980s',
    locationKey: 'locations.detroitMI',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['clubCulture', 'socialDance', 'modernStreet', 'underground'],
    origins: {
      yearKey: 'eras.1970s1980s',
      locationKey: 'locations.detroitMI',
      cultureKey: 'styles.detailed.jit.origins.culture',
    },
    theme: {
      primary: '#4CAF50',
      secondary: '#388E3C',
      accent: '#8BC34A',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    featuredVideoId: 'jit-pioneers',
    relatedStyles: [DanceStyleId.FOOTWORK, DanceStyleId.HOUSE, DanceStyleId.HIP_HOP],
  },
  {
    id: DanceStyleId.SOUL,
    nameKey: 'danceStyles.names.soul',
    slug: 'soul',
    shortDescriptionKey: 'danceStyles.shortDescriptions.soul',
    fullDescriptionKey: 'styles.detailed.soul.description',
    eraKey: 'eras.1980s1990s',
    locationKey: 'locations.japan',
    eraIcon: '📅',
    locationIcon: '📍',
    tags: ['socialDance', 'clubCulture', 'party', 'japanese'],
    origins: {
      yearKey: 'eras.1980s1990s',
      locationKey: 'locations.japan',
      cultureKey: 'styles.detailed.soul.origins.culture',
    },
    theme: {
      primary: '#9C27B0',
      secondary: '#7B1FA2',
      accent: '#E1BEE7',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    featuredVideoId: 'soul-yoshie-featured',
    relatedStyles: [DanceStyleId.HOUSE, DanceStyleId.HIP_HOP],
  },
].sort((a, b) => a.id.localeCompare(b.id)); // Sort alphabetically by id

// Helper functions for comprehensive data access
export const getDanceStyleById = (
  id: DanceStyleId | string
): DanceStyle | undefined => {
  return danceStyles.find((style) => style.id === id);
};

export const getDanceStyleBySlug = (slug: string): DanceStyle | undefined => {
  return danceStyles.find((style) => style.slug === slug);
};

export const getRelatedStyles = (
  styleId: DanceStyleId | string
): DanceStyle[] => {
  const style = getDanceStyleById(styleId as DanceStyleId);
  if (!style) return [];

  return style.relatedStyles
    .map((relatedId) => getDanceStyleById(relatedId))
    .filter((style): style is DanceStyle => style !== undefined);
};

export const getAllDanceStyles = (): DanceStyle[] => {
  return danceStyles;
};

// Enhanced helper functions from categories
export const getStylesByTag = (tagId: string): DanceStyle[] => {
  return danceStyles.filter((style) => style.tags.includes(tagId));
};

export const getTagById = (tagId: string): DanceStyleTag | undefined => {
  return danceStyleTags.find((tag) => tag.id === tagId);
};

export const getStylesByEra = (eraKey: string): DanceStyle[] => {
  // eraKey must be a translation key like 'eras.1970s'
  return danceStyles.filter((style) => style.eraKey === eraKey);
};

export const getStylesByLocation = (locationKey: string): DanceStyle[] => {
  // locationKey must be a translation key like 'locations.newYorkCity'
  return danceStyles.filter((style) => style.locationKey === locationKey);
};

// Get all unique era and location translation keys for filtering
export const getAllEras = (): string[] => {
  return [...new Set(danceStyles.map((style) => style.eraKey))].sort();
};

export const getAllLocations = (): string[] => {
  return [...new Set(danceStyles.map((style) => style.locationKey))].sort();
};

// Convenience helpers: translate the keys into user-visible strings.
// Accepts a translation function (such as the one returned by next-intl's useTranslations
// or getTranslations) so this module stays platform-agnostic.
export const getAllErasTranslated = (t: (key: string) => string): string[] => {
  return getAllEras().map((k) => t(k));
};

export const getAllLocationsTranslated = (t: (key: string) => string): string[] => {
  return getAllLocations().map((k) => t(k));
};

// Get all tags used by styles
export const getAllUsedTags = (): DanceStyleTag[] => {
  const usedTagIds = [...new Set(danceStyles.flatMap((style) => style.tags))];
  return danceStyleTags.filter((tag) => usedTagIds.includes(tag.id));
};
