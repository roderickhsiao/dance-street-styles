// Dance Style ID enum to prevent typos and ensure consistency
export enum DanceStyleId {
  BREAKING = 'breaking',
  HIP_HOP = 'hipHop',
  POPPING = 'popping',
  LOCKING = 'locking',
  HOUSE = 'house',
  VOGUING = 'voguing',
  WAACKING = 'waacking',
  KRUMPING = 'krumping',
  HUSTLE = 'hustle',
  PUNKING = 'punking',
  TURFING = 'turfing',
  LITEFEET = 'litefeet'
}

export interface DanceStyle {
  id: DanceStyleId;
  // Support both translation keys and static content for backwards compatibility
  name?: string;
  nameKey?: string;
  slug: string;
  shortDescription?: string;
  shortDescriptionKey?: string;
  fullDescription?: string;
  fullDescriptionKey?: string;
  // Additional metadata from categories
  // All user-visible era/location values must be provided as translation keys.
  eraKey: string; // Translation key for era (e.g. 'styles.eras.1970s')
  locationKey: string; // Translation key for location (e.g. 'styles.locations.southBronxNYC')
  eraIcon: string;
  locationIcon: string;
  tags: string[]; // Array of tag IDs for flexible categorization
  origins: {
    yearKey?: string;
    locationKey?: string;
    cultureKey?: string;
  };
  // Support both arrays and translation keys
  characteristics?: string[];
  characteristicsKey?: string;
  keyMoves?: string[];
  keyMovesKey?: string;
  // References to normalized entity records (use ids)
  influentialArtistIds?: string[];
  influentialArtistsKey?: string;
  featuredVideoId?: string; // Main featured video for the style
  videoIds?: string[]; // Additional videos for the style
  videosKey?: string;
  timelineEventIds?: string[];
  timelineKey?: string;
  theme: ThemeColors;
  relatedStyles: DanceStyleId[]; // Use enum for related styles to prevent typos
  // Structured performer and crew data
  dancerIds?: string[];
  crewIds?: string[];
  // Named moves with translation keys
  moveIds?: string[];
  // Music genres as structured items (ids reference translation keys)
  musicGenreIds?: string[];
}

export interface Artist {
  name: string;
  role: string; // e.g., "Pioneer", "Innovator", "Contemporary Master"
  bio: string;
  imageUrl?: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    website?: string;
  };
}

// More specific performer types for structured data
export interface Dancer extends Artist {
  // Optionally reference a crew id
  crewId?: string;
  // Primary era / active years (translation key)
  eraKey?: string;
}

export interface Crew {
  id: string;
  nameKey: string; // translation key for crew name
  foundedYear?: string;
  originLocationKey?: string;
  members?: string[]; // array of dancer names or ids
  descriptionKey?: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  type: 'tutorial' | 'performance' | 'history' | 'battle';
  description: string;
  artist?: string;
  year?: string;
  thumbnailUrl?: string;
}

export interface Move {
  id: string;
  nameKey: string; // translation key for move name
  descriptionKey?: string; // translation key for move description
  videos?: Video[]; // reference video examples
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface MusicGenre {
  id: string;
  nameKey: string; // translation key for genre name
  descriptionKey?: string;
}

export interface TimelineEvent {
  year: string; // e.g., '1973' or '1970s'
  titleKey?: string; // translation key for title
  descriptionKey?: string; // translation key for description
  locationKey?: string; // translation key for event location
  significance: 'high' | 'medium' | 'low';
  media?: Video[];
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
}

// Entity records for a lightweight, file-based DB
export interface PersonEntity {
  id: string;
  nameKey: string;
  roleKey?: string;
  bioKey?: string;
  imageUrl?: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    website?: string;
  };
}

export interface CrewEntity {
  id: string;
  nameKey: string;
  foundedYear?: string;
  originLocationKey?: string;
  memberIds?: string[]; // person ids
  descriptionKey?: string;
}

export interface VideoEntity {
  id: string;
  titleKey?: string;
  url: string;
  type: 'tutorial' | 'performance' | 'history' | 'battle';
  descriptionKey?: string;
  artistId?: string; // person or crew id
  year?: string;
  thumbnailUrl?: string;
}

export interface MoveEntity {
  id: string;
  nameKey: string;
  descriptionKey?: string;
  videoIds?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface MusicGenreEntity {
  id: string;
  nameKey: string;
  descriptionKey?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'book' | 'documentary' | 'website' | 'podcast';
  url?: string;
  description: string;
  author?: string;
  year?: string;
}
