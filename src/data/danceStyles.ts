import { DanceStyle, DanceStyleId, VideoCategory, ResourceType } from './types';
import { getResourceById } from './entities/resources';
import { getVideoById } from './entities/videos';
import { getPersonById } from './entities/people';
import { getCrewById } from './entities/crews';
import { getMoveById } from './entities/moves';
import { getMusicGenreById } from './entities/musicGenres';
// Landmarks are accessed in components via getLandmarkById

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
    videos: [
      {
        id: 'breaking-documentary',
        featured: true,
        category: VideoCategory.DOCUMENTARY,
        order: 1,
      },
    ],
    resources: [], // Add verified resources here
    landmarkIds: ['1520-sedgwick-avenue', 'bronx-river-houses', 'cedar-park'],
    theme: {
      primary: '#E74C3C',
      secondary: '#C0392B',
      accent: '#F39C12',
      background: '#2C3E50',
      foreground: '#ECF0F1',
      muted: '#7F8C8D',
    },
    relatedStyles: [
      DanceStyleId.HIP_HOP,
      DanceStyleId.POPPING,
      DanceStyleId.LOCKING,
    ],
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
    videos: [
      {
        id: 'hiphop-birth',
        featured: true,
        category: VideoCategory.HISTORY,
        order: 1,
      },
      {
        id: '5-elements-of-hop-hop',
        category: VideoCategory.HISTORY,
        order: 2,
      },
      {
        id: 'dj-evolution',
        category: VideoCategory.TUTORIAL,
        order: 3,
      },
      {
        id: 'mcing-history',
        category: VideoCategory.HISTORY,
        order: 4,
      },
      {
        id: 'graffiti-art',
        category: VideoCategory.HISTORY,
        order: 5,
      },
    ],
    resources: [], // Add verified resources here
    theme: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F',
      background: '#1A1A1A',
      foreground: '#FFFFFF',
      muted: '#4A4A4A',
    },
    relatedStyles: [
      DanceStyleId.BREAKING,
      DanceStyleId.POPPING,
      DanceStyleId.LOCKING,
      DanceStyleId.KRUMPING,
    ],
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
    videos: [
      {
        id: 'popping-interview',
        featured: true,
        category: VideoCategory.INTERVIEW,
        order: 1,
      },
    ],
    resources: [], // Add verified resources here
    theme: {
      primary: '#9B59B6',
      secondary: '#8E44AD',
      accent: '#E67E22',
      background: '#34495E',
      foreground: '#FFFFFF',
      muted: '#95A5A6',
    },
    relatedStyles: [
      DanceStyleId.LOCKING,
      DanceStyleId.BREAKING,
      DanceStyleId.HIP_HOP,
    ],
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
    keyFigureIds: [
      'don-campbell',
      'toni-basil',
      'fred-berry',
      'greg-pope',
      'adolfo-quinones',
      'bill-williams',
      'leo-williamson',
    ],
    // Consolidated video structure
    videos: [
      {
        id: 'locking-featured',
        featured: true,
        category: VideoCategory.HISTORY,
        order: 1,
      },
      {
        id: 'toni-basil-lockers-memories',
        category: VideoCategory.DOCUMENTARY,
        order: 2,
      },
    ],
    // Collection of different types of resources
    resources: [
      // Don Campbell's official website
      {
        id: 'campbellock-official-website',
        type: ResourceType.WEBSITE,
        featured: true,
        category: 'official',
        order: 1,
        context:
          'Official website of Don Campbell, the creator of locking, with authentic history and personal insights',
      },
      // The Lockers official website
      {
        id: 'the-lockers-official-website',
        type: ResourceType.WEBSITE,
        featured: true,
        category: 'official',
        order: 2,
        context:
          'Official website of The Lockers crew featuring the seven original members and their pioneering role in dance culture',
      },
    ],

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
    keyFigureIds: [
      'frankie-knuckles',
      'larry-levan',
      'ron-hardy',
      'jamie-principle',
      'jesse-saunders',
      'marshall-jefferson',
      'steve-silk-hurley',
      'tony-humphries',
      'brian-footwork-green',
      'ejoe-wilson',
      'kim-holmes',
      'caleaf-sellers',
      'marjory-smarth',
      'tony-mcgregor',
      'brooklyn-terry-wright',
      'shannon-mabra',
      'tony-sekou-williams',
      'voodoo-ray',
      'badson',
      'hagson',
      'yugson',
      'babson',
      'mamson',

      'hiro',
    ],
    videos: [
      {
        id: 'house-marjory-smarth',
        featured: true,
        category: VideoCategory.HISTORY,
        order: 1,
      },
    ],
    resources: [
      // Check Your Body at the Door Documentary
      {
        id: 'check-your-body-at-the-door',
        type: ResourceType.DOCUMENTARY,
        featured: true,
        category: 'documentary',
        order: 1,
        contextKey: 'resources.checkYourBodyAtTheDoor.context',
      },
    ],
    landmarkIds: ['the-warehouse-chicago', 'paradise-garage-nyc'],
    crewIds: [
      'mop-top',
      'dance-fusion',
      'dance-floor',
      'elite-force',
      'house-nation',
      'ghost-shadow',
      'exclusive-elements',
      'supernaturalz',
      'scheme-team',
      'club-house',
      'wanted-posse',
      'serial-stepperz',
    ],
    theme: {
      primary: '#3498DB',
      secondary: '#2980B9',
      accent: '#1ABC9C',
      background: '#ECF0F1',
      foreground: '#2C3E50',
      muted: '#BDC3C7',
    },
    relatedStyles: [
      DanceStyleId.HIP_HOP,
      DanceStyleId.LITEFEET,
      DanceStyleId.HUSTLE,
      DanceStyleId.FOOTWORK,
    ],
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
    keyFigureIds: [
      'william-dorsey-swann',
      'willi-ninja',
      'paris-dupree',
      'jose-xtravaganza',
      'luis-xtravaganza',
      'archie-burnett',
    ],
    videos: [
      {
        id: 'voguing-lgbtq-history',
        featured: true,
        category: VideoCategory.HISTORY,
        order: 1,
      },
      {
        id: 'paris-is-burning',
        category: VideoCategory.DOCUMENTARY,
        order: 2,
      },
      {
        id: 'strike-a-pose',
        category: VideoCategory.DOCUMENTARY,
        order: 3,
      },
    ],
    resources: [], // Add verified resources here
    landmarkIds: ['webster-hall-nyc', 'tracks-nightclub'],
    influentialArtistIds: [
      'william-dorsey-swann',
      'willi-ninja',
      'paris-dupree',
      'jose-xtravaganza',
      'luis-xtravaganza',
      'archie-burnett',
    ],
    theme: {
      primary: '#E91E63',
      secondary: '#AD1457',
      accent: '#FF5722',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    relatedStyles: [
      DanceStyleId.WAACKING,
      DanceStyleId.PUNKING,
      DanceStyleId.HOUSE,
    ],
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
    tags: ['ballroomCulture', 'theatrical', 'clubCulture', 'underground'],
    origins: {
      yearKey: 'eras.1970s',
      locationKey: 'locations.losAngelesCA',
      cultureKey: 'styles.detailed.waacking.origins.culture',
    },
    keyFigureIds: [
      'tyrone-proctor',
      'jeffrey-daniel',
      'archie-burnett',
      'billy-goodson',
      'willi-ninja',
      'viktor-manoel',
    ],
    videos: [
      {
        id: 'waacking-tyrone-proctor',
        featured: true,
        category: VideoCategory.HISTORY,
        order: 1,
      },
      {
        id: 'breed-of-motion',
        category: VideoCategory.DOCUMENTARY,
        order: 2,
      },
    ],
    resources: [], // Add verified resources here
    landmarkIds: ['ginos-ii', 'paradise-ballroom', 'peanuts-club'],
    influentialArtistIds: [
      'tyrone-proctor',
      'jeffrey-daniel',
      'archie-burnett',
      'viktor-manoel',
    ],
    crewIds: ['breed-of-motion', 'outrageous-waack-dancers'],
    theme: {
      primary: '#FF1744',
      secondary: '#D50000',
      accent: '#FF5722',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    relatedStyles: [
      DanceStyleId.VOGUING,
      DanceStyleId.LOCKING,
      DanceStyleId.PUNKING,
    ],
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
    videos: [
      {
        id: 'krumping-tommy-clown',
        featured: true,
        category: VideoCategory.HISTORY,
        order: 1,
      },
    ],
    resources: [], // Add verified resources here
    relatedStyles: [
      DanceStyleId.HIP_HOP,
      DanceStyleId.BREAKING,
      DanceStyleId.TURFING,
    ],
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
    videos: [
      {
        id: 'hustle-latin-origins',
        featured: true,
        category: VideoCategory.HISTORY,
        order: 1,
      },
    ],
    resources: [], // Add verified resources here
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
    locationIcon: '📍',
    tags: ['ballroomCulture', 'theatrical', 'underground'],
    origins: {
      yearKey: 'eras.1970s',
      locationKey: 'locations.losAngelesCA',
      cultureKey: 'styles.detailed.punking.origins.culture',
    },
    keyFigureIds: [
      'andrew-frank',
      'arthur-goff',
      'tinker-toy',
      'billy-starr-estrada',
      'lonny-carbajal',
      'viktor-manoel',
      'tommy-mitchell',
      'faye-raye',
      'kenny-china-doll',
      'michael-angelo-harris',
    ],
    videos: [
      {
        id: 'punking-featured',
        featured: true,
        category: VideoCategory.HISTORY,
        order: 1,
      },
    ],
    resources: [
      {
        id: 'punking-dance-instagram',
        type: ResourceType.WEBSITE,
        featured: true,
        order: 1,
      },
      {
        id: 'viktor-manoel-punking-interview',
        type: ResourceType.ARTICLE,
        featured: true,
        order: 2,
      },
      {
        id: 'viktor-manoel-dance-mogul-pt1',
        type: ResourceType.VIDEO,
        featured: true,
        order: 3,
      },
      {
        id: 'viktor-manoel-dance-mogul-pt2',
        type: ResourceType.VIDEO,
        featured: true,
        order: 4,
      },
      {
        id: 'viktor-manoel-dance-mogul-pt3',
        type: ResourceType.VIDEO,
        featured: true,
        order: 5,
      },
    ],
    influentialArtistIds: [
      'viktor-manoel',
      'andrew-frank',
      'arthur-goff',
      'michael-angelo-harris',
    ],
    landmarkIds: ['ginos-ii', 'paradise-ballroom', 'peanuts-club'],
    theme: {
      primary: '#E91E63',
      secondary: '#AD1457',
      accent: '#F06292',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242',
    },
    relatedStyles: [
      DanceStyleId.WAACKING,
      DanceStyleId.VOGUING,
      DanceStyleId.LOCKING,
    ],
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
    videos: [
      {
        id: 'turfing-liquid-flow',
        featured: true,
        category: VideoCategory.PERFORMANCE,
        order: 1,
      },
      {
        id: 'turfing-scorpion-lopez',
        category: VideoCategory.PERFORMANCE,
        order: 2,
      },
    ],
    resources: [], // Add verified resources here
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
    tags: ['hipHopFoundation', 'socialDance', 'modernStreet'],
    videos: [
      {
        id: 'litefeet-sound-of-subway',
        featured: true,
        category: VideoCategory.HISTORY,
        order: 1,
      },
    ],
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
    resources: [], // Add verified resources here
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
    videos: [
      {
        id: 'footwork-featured',
        featured: true,
        category: VideoCategory.PERFORMANCE,
        order: 1,
      },
      {
        id: 'footwork-let-me-see',
        category: VideoCategory.PERFORMANCE,
        order: 2,
      },
    ],
    resources: [], // Add verified resources here

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
    videos: [
      {
        id: 'jit-pioneers',
        featured: true,
        category: VideoCategory.HISTORY,
        order: 1,
      },
    ],
    resources: [], // Add verified resources here
    relatedStyles: [
      DanceStyleId.FOOTWORK,
      DanceStyleId.HOUSE,
      DanceStyleId.HIP_HOP,
    ],
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
    videos: [
      {
        id: 'soul-yoshie-featured',
        featured: true,
        category: VideoCategory.PERFORMANCE,
        order: 1,
      },
    ],
    resources: [], // Add verified resources here
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

export const getAllLocationsTranslated = (
  t: (key: string) => string
): string[] => {
  return getAllLocations().map((k) => t(k));
};

// Get all tags used by styles
export const getAllUsedTags = (): DanceStyleTag[] => {
  const usedTagIds = [...new Set(danceStyles.flatMap((style) => style.tags))];
  return danceStyleTags.filter((tag) => usedTagIds.includes(tag.id));
};

// Video-related helper functions (consolidated)
export const getVideosForStyle = (styleId: DanceStyleId | string) => {
  const style = getDanceStyleById(styleId as DanceStyleId);
  if (!style?.videos) return [];

  return style.videos
    .map((videoRef) => {
      const video = getVideoById(videoRef.id);
      return video ? { ...video, ...videoRef } : null;
    })
    .filter(Boolean)
    .sort((a, b) => {
      // Featured videos first, then by order, then by id
      if (a!.featured && !b!.featured) return -1;
      if (!a!.featured && b!.featured) return 1;
      if (a!.order && b!.order) return a!.order - b!.order;
      return a!.id.localeCompare(b!.id);
    });
};

export const getFeaturedVideoForStyle = (styleId: DanceStyleId | string) => {
  const videos = getVideosForStyle(styleId);
  return videos.find((video) => video?.featured) || videos[0] || null;
};

export const getVideosByCategory = (
  styleId: DanceStyleId | string,
  category: string
) => {
  const videos = getVideosForStyle(styleId);
  return videos.filter((video) => video?.category === category);
};

// Resource-related helper functions
export const getResourcesForStyle = (styleId: DanceStyleId | string) => {
  const style = getDanceStyleById(styleId as DanceStyleId);
  if (!style?.resources) return [];

  return style.resources
    .map((resourceRef) => {
      const resource = getResourceById(resourceRef.id);
      return resource ? { ...resource, ...resourceRef } : null;
    })
    .filter(Boolean)
    .sort((a, b) => {
      // Featured resources first, then by order, then by id
      if (a!.featured && !b!.featured) return -1;
      if (!a!.featured && b!.featured) return 1;
      if (a!.order && b!.order) return a!.order - b!.order;
      return a!.id.localeCompare(b!.id);
    });
};

export const getResourcesByType = (
  styleId: DanceStyleId | string,
  type: ResourceType
) => {
  const resources = getResourcesForStyle(styleId);
  return resources.filter((resource) => resource && resource.type === type);
};

export const getFeaturedResourcesForStyle = (
  styleId: DanceStyleId | string
) => {
  const resources = getResourcesForStyle(styleId);
  return resources.filter((resource) => resource && resource.featured);
};

// Specific helper functions for different resource types in UI collections
export const getVideoResourcesForStyle = (styleId: DanceStyleId | string) => {
  return getResourcesByType(styleId, ResourceType.VIDEO);
};

export const getPodcastResourcesForStyle = (styleId: DanceStyleId | string) => {
  return getResourcesByType(styleId, ResourceType.PODCAST);
};

export const getBookResourcesForStyle = (styleId: DanceStyleId | string) => {
  return getResourcesByType(styleId, ResourceType.BOOK);
};

export const getArticleResourcesForStyle = (styleId: DanceStyleId | string) => {
  return getResourcesByType(styleId, ResourceType.ARTICLE);
};

// Get resources grouped by type for UI display
export const getResourcesGroupedByType = (styleId: DanceStyleId | string) => {
  const allResources = getResourcesForStyle(styleId);

  const groupedResources = {
    videos: allResources.filter((r) => r && r.type === ResourceType.VIDEO),
    documentaries: allResources.filter(
      (r) => r && r.type === ResourceType.DOCUMENTARY
    ),
    podcasts: allResources.filter((r) => r && r.type === ResourceType.PODCAST),
    books: allResources.filter((r) => r && r.type === ResourceType.BOOK),
    articles: allResources.filter((r) => r && r.type === ResourceType.ARTICLE),
    websites: allResources.filter((r) => r && r.type === ResourceType.WEBSITE),
    playlists: allResources.filter(
      (r) => r && r.type === ResourceType.PLAYLIST
    ),
    courses: allResources.filter((r) => r && r.type === ResourceType.COURSE),
    archives: allResources.filter((r) => r && r.type === ResourceType.ARCHIVE),
    images: allResources.filter((r) => r && r.type === ResourceType.IMAGE),
    socialMedia: allResources.filter(
      (r) => r && r.type === ResourceType.SOCIAL_MEDIA
    ),
  };

  return groupedResources;
};

// Data validation and robustness functions
export const validateDanceStyle = (
  style: Partial<DanceStyle>
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields
  if (!style.id) errors.push('Missing required field: id');
  if (!style.slug) errors.push('Missing required field: slug');
  if (!style.nameKey) errors.push('Missing required field: nameKey');
  if (!style.shortDescriptionKey)
    errors.push('Missing required field: shortDescriptionKey');
  if (!style.fullDescriptionKey)
    errors.push('Missing required field: fullDescriptionKey');
  if (!style.eraKey) errors.push('Missing required field: eraKey');
  if (!style.locationKey) errors.push('Missing required field: locationKey');

  // Validate origins structure
  if (!style.origins) {
    errors.push('Missing required field: origins');
  } else {
    if (!style.origins.yearKey) errors.push('Missing origins.yearKey');
    if (!style.origins.locationKey) errors.push('Missing origins.locationKey');
    if (!style.origins.cultureKey) errors.push('Missing origins.cultureKey');
  }

  // Validate theme structure
  if (!style.theme) {
    errors.push('Missing required field: theme');
  } else {
    const requiredThemeColors = [
      'primary',
      'secondary',
      'accent',
      'background',
      'foreground',
      'muted',
    ];
    requiredThemeColors.forEach((color) => {
      if (!style.theme![color as keyof typeof style.theme])
        errors.push(`Missing theme.${color}`);
    });
  }

  // Validate arrays
  if (style.tags && !Array.isArray(style.tags)) {
    errors.push('tags must be an array');
  }
  if (style.relatedStyles && !Array.isArray(style.relatedStyles)) {
    errors.push('relatedStyles must be an array');
  }

  // Validate video references
  if (style.videos && Array.isArray(style.videos)) {
    style.videos.forEach((video, index: number) => {
      if (!video.id) errors.push(`Video at index ${index} missing id`);
      if (
        video.category &&
        !Object.values(VideoCategory).includes(video.category)
      ) {
        errors.push(
          `Invalid video category at index ${index}: ${video.category}`
        );
      }
    });
  }

  // Validate resource references
  if (style.resources && Array.isArray(style.resources)) {
    style.resources.forEach((resource, index: number) => {
      if (!resource.id) errors.push(`Resource at index ${index} missing id`);
      if (
        !resource.type ||
        !Object.values(ResourceType).includes(resource.type)
      ) {
        errors.push(
          `Invalid or missing resource type at index ${index}: ${resource.type}`
        );
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const getDanceStyleWithFallbacks = (id: DanceStyleId | string) => {
  const style = getDanceStyleById(id as DanceStyleId);
  if (!style) return null;

  // Provide safe defaults for optional fields
  return {
    ...style,
    keyFigureIds: style.keyFigureIds || [],
    influentialArtistIds: style.influentialArtistIds || [],
    crewIds: style.crewIds || [],
    moveIds: style.moveIds || [],
    musicGenreIds: style.musicGenreIds || [],
    videos: style.videos || [],
    resources: style.resources || [],
    tags: style.tags || [],
    relatedStyles: style.relatedStyles || [],
    status: style.status || 'complete',
  };
};

// Get comprehensive style data with all related entities loaded
export const getStyleWithEntities = (styleId: DanceStyleId | string) => {
  const style = getDanceStyleWithFallbacks(styleId);
  if (!style) return null;

  return {
    ...style,
    keyFigures: style.keyFigureIds
      .map((id) => getPersonById(id))
      .filter(Boolean),
    influentialArtists: style.influentialArtistIds
      .map((id) => getPersonById(id))
      .filter(Boolean),
    crews: style.crewIds.map((id) => getCrewById(id)).filter(Boolean),
    moves: style.moveIds.map((id) => getMoveById(id)).filter(Boolean),
    musicGenres: style.musicGenreIds
      .map((id) => getMusicGenreById(id))
      .filter(Boolean),
    videos: getVideosForStyle(styleId),
    resources: getResourcesForStyle(styleId),
    relatedStylesData: style.relatedStyles
      .map((id) => getDanceStyleById(id))
      .filter(Boolean),
  };
};
