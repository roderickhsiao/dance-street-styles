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
  TURFING = 'turfing'
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
  era: string; // e.g., "1970s", "1980s-1990s" 
  eraKey?: string; // Translation key for era
  location: string; // e.g., "South Bronx, NYC", "Chicago & NYC"
  locationKey?: string; // Translation key for location
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
  influentialArtists?: Artist[];
  influentialArtistsKey?: string;
  musicGenres?: string[];
  musicGenresKey?: string;
  videos?: Video[];
  videosKey?: string;
  timeline?: TimelineEvent[];
  timelineKey?: string;
  theme: ThemeColors;
  relatedStyles: DanceStyleId[]; // Use enum for related styles to prevent typos
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

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  significance: 'high' | 'medium' | 'low';
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
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
