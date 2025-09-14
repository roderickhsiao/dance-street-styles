export interface DanceStyle {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  origins: {
    year: string;
    location: string;
    culture: string;
  };
  characteristics: string[];
  keyMoves: string[];
  influentialArtists: Artist[];
  musicGenres: string[];
  videos: Video[];
  timeline: TimelineEvent[];
  theme: ThemeColors;
  relatedStyles: string[]; // IDs of related dance styles
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
