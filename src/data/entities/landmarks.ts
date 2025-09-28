/**
 * Landmarks and Venues Entity
 * 
 * Important locations, venues, and landmarks that played crucial roles
 * in the development and history of street dance styles.
 */

export enum LandmarkType {
  CLUB = 'club',
  VENUE = 'venue',
  STUDIO = 'studio',
  NEIGHBORHOOD = 'neighborhood',
  BUILDING = 'building',
  PARK = 'park',
  STREET = 'street',
  BALLROOM = 'ballroom',
  WAREHOUSE = 'warehouse',
  CULTURAL_CENTER = 'cultural_center',
}

export interface LandmarkEntity {
  id: string;
  nameKey: string; // Translation key for landmark name
  type: LandmarkType;
  address?: string; // Physical address if known
  city: string;
  state?: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  
  // Historical context
  yearEstablished?: string;
  yearClosed?: string;
  isActive?: boolean; // Still operating/exists
  
  // Cultural significance
  significanceKey: string; // Translation key for significance description
  descriptionKey?: string; // Translation key for detailed description
  
  // Related dance styles that originated or were significant here
  relatedStyleIds?: string[];
  
  // Key figures associated with this landmark
  keyFigureIds?: string[];
  
  // Media and references
  imageUrl?: string;
  websiteUrl?: string;
  wikipediaUrl?: string;
  mapUrl?: string; // Google Maps link
  
  // Additional metadata
  aliases?: string[]; // Other names this place was known by
  capacity?: number; // For venues/clubs
  tags?: string[]; // Additional categorization
}

// Landmark entities database - Only verified historical locations with documented addresses
export const landmarks: Record<string, LandmarkEntity> = {
  // Chicago House Music Landmarks - Well-documented venues
  'the-warehouse-chicago': {
    id: 'the-warehouse-chicago',
    nameKey: 'landmarks.the-warehouse-chicago.name',
    type: LandmarkType.CLUB,
    address: '206 S. Jefferson Street',
    city: 'Chicago',
    state: 'Illinois',
    country: 'United States',
    yearEstablished: '1977',
    yearClosed: '1982',
    isActive: false,
    significanceKey: 'landmarks.the-warehouse-chicago.significance',
    descriptionKey: 'landmarks.theWarehouse.description',
    relatedStyleIds: ['house'],
    keyFigureIds: ['frankie-knuckles'],
    aliases: ['Warehouse', 'The Warehouse'],
    imageUrl: '/images/landmarks/the-warehouse-chicago-optimized.jpg',
    mapUrl: 'https://maps.google.com/?q=206+S.+Jefferson+Street,+Chicago,+IL',
    tags: ['birthplace-of-house-music', 'legendary-venue'],
  },

  'paradise-garage-nyc': {
    id: 'paradise-garage-nyc',
    nameKey: 'landmarks.paradise-garage-nyc.name',
    type: LandmarkType.CLUB,
    address: '84 King Street',
    city: 'New York City',
    state: 'New York',
    country: 'United States',
    yearEstablished: '1977',
    yearClosed: '1987',
    isActive: false,
    significanceKey: 'landmarks.paradise-garage-nyc.significance',
    descriptionKey: 'landmarks.paradiseGarage.description',
    relatedStyleIds: ['house'],
    keyFigureIds: ['larry-levan'],
    aliases: ['Paradise Garage', 'The Garage'],
    imageUrl: '/images/landmarks/paradise-garage-nyc.jpg',
    mapUrl: 'https://maps.google.com/?q=84+King+Street,+New+York,+NY',
    tags: ['legendary-venue', 'house-music-mecca'],
  },

  // Breaking & Hip-Hop Landmarks - Documented historical sites
  '1520-sedgwick-avenue': {
    id: '1520-sedgwick-avenue',
    nameKey: 'landmarks.1520-sedgwick-avenue.name',
    type: LandmarkType.BUILDING,
    address: '1520 Sedgwick Avenue',
    city: 'Bronx',
    state: 'New York',
    country: 'United States',
    coordinates: {
      lat: 40.8484,
      lng: -73.9194,
    },
    yearEstablished: '1973',
    isActive: true,
    significanceKey: 'landmarks.1520-sedgwick-avenue.significance',
    descriptionKey: 'landmarks.sedgwickAvenue.description',
    relatedStyleIds: ['breaking', 'hipHop'],
    keyFigureIds: ['dj-kool-herc'],
    aliases: ['1520 Sedgwick', 'Birthplace of Hip-Hop'],
    // imageUrl: '/images/landmarks/1520-sedgwick-avenue.jpg', // TODO: Get working image
    mapUrl: 'https://maps.google.com/?q=1520+Sedgwick+Avenue,+Bronx,+NY',
    tags: ['hip-hop-birthplace', 'dj-kool-herc'],
  },

  // Additional Hip-Hop Landmarks
  'bronx-river-houses': {
    id: 'bronx-river-houses',
    nameKey: 'landmarks.bronx-river-houses.name',
    type: LandmarkType.NEIGHBORHOOD,
    address: 'Bronx River Houses',
    city: 'Bronx',
    state: 'New York',
    country: 'United States',
    coordinates: {
      lat: 40.8295,
      lng: -73.8964,
    },
    yearEstablished: '1970s',
    isActive: true,
    significanceKey: 'landmarks.bronx-river-houses.significance',
    relatedStyleIds: ['breaking', 'hip-hop'],
    keyFigureIds: ['afrika-bambaataa'],
    aliases: ['Bronx River Projects', 'The River Houses'],
    mapUrl: 'https://maps.google.com/?q=Bronx+River+Houses,+Bronx,+NY',
    tags: ['hip-hop-culture', 'community-housing', 'zulu-nation'],
  },

  'cedar-park': {
    id: 'cedar-park',
    nameKey: 'landmarks.cedar-park.name',
    type: LandmarkType.PARK,
    address: 'Cedar Park',
    city: 'Bronx',
    state: 'New York',
    country: 'United States',
    coordinates: {
      lat: 40.8410,
      lng: -73.9180,
    },
    yearEstablished: '1970s',
    isActive: true,
    significanceKey: 'landmarks.cedar-park.significance',
    relatedStyleIds: ['breaking', 'hip-hop'],
    aliases: ['Cedar Ave Park'],
    mapUrl: 'https://maps.google.com/?q=Cedar+Park,+Bronx,+NY',
    tags: ['breaking-battles', 'outdoor-jams', 'bronx-culture'],
  },

  // Punking/Waacking Landmarks - Los Angeles Scene
  'ginos-ii': {
    id: 'ginos-ii',
    nameKey: 'landmarks.ginos-ii.name',
    type: LandmarkType.CLUB,
    address: '1123 Vine Street',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    yearEstablished: '1976',
    yearClosed: '1985',
    isActive: false,
    significanceKey: 'landmarks.ginos-ii.significance',
    relatedStyleIds: ['punking', 'waacking'],
    keyFigureIds: ['michael-angelo-harris'],
    aliases: ['Ginos II', 'Gino\'s', 'Ginos'],
    imageUrl: '/images/landmarks/ginos-ii.jpg',
    mapUrl: 'https://maps.google.com/?q=1123+Vine+Street,+Los+Angeles,+CA',
    tags: ['punking-birthplace', 'all-ages-club', 'disco-era', 'lgbtq-venue'],
  },

  'paradise-ballroom': {
    id: 'paradise-ballroom',
    nameKey: 'landmarks.paradise-ballroom.name',
    type: LandmarkType.BALLROOM,
    address: '836 N Highland Ave',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    yearEstablished: '1974',
    yearClosed: '1977',
    isActive: false,
    significanceKey: 'landmarks.paradise-ballroom.significance',
    relatedStyleIds: ['punking', 'waacking'],
    aliases: ['Paradise Ballroom'],
    mapUrl: 'https://maps.google.com/?q=836+N+Highland+Ave,+Los+Angeles,+CA',
    tags: ['punking-venue', 'early-gay-disco', 'posing-dance'],
  },

  'peanuts-club': {
    id: 'peanuts-club',
    nameKey: 'landmarks.peanuts-club.name',
    type: LandmarkType.CLUB,
    address: '7969 Santa Monica Blvd',
    city: 'West Hollywood',
    state: 'California',
    country: 'United States',
    yearEstablished: '1979',
    yearClosed: '1995',
    isActive: false,
    significanceKey: 'landmarks.peanuts-club.significance',
    relatedStyleIds: ['punking', 'waacking'],
    aliases: ['Peanuts'],
    mapUrl: 'https://maps.google.com/?q=7969+Santa+Monica+Blvd,+West+Hollywood,+CA',
    tags: ['lesbian-nightclub', 'mixed-crowd', 'lgbtq-venue'],
  },

  // Ballroom/Voguing Landmarks
  'webster-hall-nyc': {
    id: 'webster-hall-nyc',
    nameKey: 'landmarks.webster-hall-nyc.name',
    type: LandmarkType.BALLROOM,
    address: '125 E 11th Street',
    city: 'New York City',
    state: 'New York',
    country: 'United States',
    yearEstablished: '1886',
    isActive: true,
    significanceKey: 'landmarks.webster-hall-nyc.significance',
    descriptionKey: 'landmarks.websterHall.description',
    relatedStyleIds: ['voguing'],
    capacity: 1500,
    websiteUrl: 'https://websterhall.com',
    // imageUrl: '/images/landmarks/webster-hall-nyc.jpg', // TODO: Get working image
    mapUrl: 'https://maps.google.com/?q=125+E+11th+Street,+New+York,+NY',
    tags: ['ballroom-venue', 'historic-venue'],
  },

  'tracks-nightclub': {
    id: 'tracks-nightclub',
    nameKey: 'landmarks.tracks-nightclub.name',
    type: LandmarkType.CLUB,
    address: '531 West 19th Street',
    city: 'New York City',
    state: 'New York',
    country: 'United States',
    yearEstablished: '1980s',
    yearClosed: '1999',
    isActive: false,
    significanceKey: 'landmarks.tracks-nightclub.significance',
    relatedStyleIds: ['voguing', 'ballroom'],
    aliases: ['Tracks', 'Tracks NYC'],
    mapUrl: 'https://maps.google.com/?q=531+West+19th+Street,+New+York,+NY',
    tags: ['ballroom-scene', 'voguing-venue', 'lgbtq-club'],
  },
};

// Helper functions
export function getLandmarkById(id: string): LandmarkEntity | undefined {
  return landmarks[id];
}

export function getLandmarksByStyleId(styleId: string): LandmarkEntity[] {
  return Object.values(landmarks).filter(
    landmark => landmark.relatedStyleIds?.includes(styleId)
  );
}

export function getLandmarksByType(type: LandmarkType): LandmarkEntity[] {
  return Object.values(landmarks).filter(landmark => landmark.type === type);
}

export function getActiveLandmarks(): LandmarkEntity[] {
  return Object.values(landmarks).filter(landmark => landmark.isActive === true);
}

export function getHistoricalLandmarks(): LandmarkEntity[] {
  return Object.values(landmarks).filter(landmark => landmark.isActive === false);
}