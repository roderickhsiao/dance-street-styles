// Dance Style ID enum to prevent typos and ensure consistency
export enum DanceStyleId {
  BREAKING = 'breaking',
  FOOTWORK = 'footwork',
  HIP_HOP = 'hipHop',
  HOUSE = 'house',
  HUSTLE = 'hustle',
  JIT = 'jit',
  KRUMPING = 'krumping',
  LITEFEET = 'litefeet',
  LOCKING = 'locking',
  POPPING = 'popping',
  PUNKING = 'punking',
  SOUL = 'soul',
  TURFING = 'turfing',
  VOGUING = 'voguing',
  WAACKING = 'waacking',
}

// Video categories enum
export enum VideoCategory {
  HISTORY = 'history',
  TUTORIAL = 'tutorial',
  PERFORMANCE = 'performance',
  BATTLE = 'battle',
  INTERVIEW = 'interview',
  DOCUMENTARY = 'documentary'
}

// Resource types enum  
export enum ResourceType {
  VIDEO = 'video',
  PODCAST = 'podcast',
  BOOK = 'book',
  ARTICLE = 'article',
  WEBSITE = 'website',
  PLAYLIST = 'playlist',
  COURSE = 'course',
  ARCHIVE = 'archive',
  IMAGE = 'image',
  SOCIAL_MEDIA = 'social_media',
  DOCUMENTARY = 'documentary'
}

// Consolidated video reference structure
export interface VideoReference {
  id: string;
  featured?: boolean; // Whether this is the main featured video
  category?: VideoCategory;
  order?: number; // Display order (featured videos get priority)
}

// Resource reference structure - can reference any type of resource
export interface ResourceReference {
  id: string; // References entity in videos, podcasts, books, etc.
  type: ResourceType;
  featured?: boolean; // Whether to highlight this resource
  category?: string; // Subcategory within the type (e.g., 'beginner', 'advanced')
  order?: number; // Display order
  context?: string; // Additional context about why this resource is relevant
}

// More robust dance style structure
export interface DanceStyle {
  id: DanceStyleId;
  slug: string;
  
  // Content (prefer translation keys for i18n)
  nameKey: string;
  shortDescriptionKey: string;
  fullDescriptionKey: string;
  
  // Metadata
  eraKey: string; // Translation key for era (e.g. 'eras.1970s')
  locationKey: string; // Translation key for location (e.g. 'locations.southBronxNYC')
  eraIcon: string;
  locationIcon: string;
  tags: string[]; // Array of tag IDs for flexible categorization
  
  // Origins info
  origins: {
    yearKey: string;
    locationKey: string;
    cultureKey: string;
  };
  
  // Content references (consolidated approach - use entity IDs)
  keyFigureIds?: string[]; // People who are key to this style
  influentialArtistIds?: string[]; // Subset of key figures who are particularly influential
  crewIds?: string[]; // Important crews/groups
  moveIds?: string[]; // Signature moves
  musicGenreIds?: string[]; // Associated music genres
  
  // Media (consolidated video structure)
  videos?: VideoReference[]; // All videos with metadata about their role
  
  // Additional resources (documentaries, books, websites, podcasts, etc.)
  resources?: ResourceReference[]; // Collection of different resource types
  
  // Timeline and characteristics (use translation keys for consistency)
  characteristicsKey?: string; // Points to translation key with array
  keyMovesKey?: string; // Points to translation key with array  
  timelineKey?: string; // Points to translation key with timeline events
  
  // Visual theming
  theme: ThemeColors;
  
  // Relationships
  relatedStyles: DanceStyleId[];
  
  // Status and validation
  status?: 'complete' | 'draft' | 'needs_review';
  lastUpdated?: string; // ISO date string
  sources?: string[]; // Source attribution for data accuracy
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
  birthDate?: Date;
  deathDate?: Date;
  crewIds?: string[]; // crews this person belongs/belonged to
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

export interface OGMetadata {
  title?: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  image: string;
  siteName?: string;
  siteNameKey?: string;
}

export interface ResourceEntity {
  id: string;
  titleKey: string; // Translation key for title
  type: 'documentary' | 'book' | 'article' | 'website' | 'podcast' | 'playlist' | 'course' | 'interview' | 'archive' | 'video';
  url?: string;
  descriptionKey: string; // Translation key for description
  authorKey?: string; // Translation key for author/creator
  year?: string;
  duration?: string; // For videos/podcasts (e.g., "90 min", "45 min")
  language?: string; // ISO code like 'en', 'fr', 'es'
  platformKey?: string; // Translation key for platform (e.g., "Netflix", "YouTube", "Spotify")
  thumbnailUrl?: string;
  tags?: string[]; // Resource tags like 'beginner-friendly', 'historical', 'technical'
  accessibility?: {
    hasSubtitles?: boolean;
    hasTranscript?: boolean;
    languages?: string[]; // Available subtitle languages
  };
  sourceKey?: string; // Translation key for source attribution
  featured?: boolean; // Whether to highlight this resource
  trailerId?: string; // Video ID reference for trailer
  ogMetadata?: OGMetadata; // Server-side fetched Open Graph metadata for websites
}
