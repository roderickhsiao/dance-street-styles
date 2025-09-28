import { ResourceEntity } from '../types';

export const RESOURCES: Record<string, ResourceEntity> = {
  // Don Campbell's Official Website
  'campbellock-official-website': {
    id: 'campbellock-official-website',
    titleKey: 'campbellockWebsite.title',
    type: 'website',
    url: 'https://campbellock.dance/',
    descriptionKey: 'campbellockWebsite.description',
    authorKey: 'campbellockWebsite.author',
    language: 'en',
    platformKey: 'campbellockWebsite.platform',
    tags: ['official', 'history', 'creator', 'locking', 'don-campbell'],
    sourceKey: 'campbellockWebsite.source',
    featured: true,
    // OG metadata will be populated dynamically using translation keys
    ogMetadata: {
      titleKey: 'campbellockWebsite.title',
      descriptionKey: 'campbellockWebsite.description',
      image: '/images/resources/don-campbell-hero.png',
      siteNameKey: 'campbellockWebsite.siteName'
    }
  },

  // The Lockers Official Website
  'the-lockers-official-website': {
    id: 'the-lockers-official-website',
    titleKey: 'theLockersWebsite.title',
    type: 'website',
    url: 'https://www.thelockersdance.com/',
    descriptionKey: 'theLockersWebsite.description',
    authorKey: 'theLockersWebsite.author',
    language: 'en',
    platformKey: 'theLockersWebsite.platform',
    tags: ['official', 'history', 'crew', 'locking', 'the-lockers', 'original-members'],
    sourceKey: 'theLockersWebsite.source',
    featured: true,
    ogMetadata: {
      titleKey: 'theLockersWebsite.title',
      descriptionKey: 'theLockersWebsite.description',
      image: '/images/resources/the-lockers-hero.webp',
      siteNameKey: 'theLockersWebsite.siteName'
    }
  },

  // Check Your Body at the Door - House Dance Documentary
  'check-your-body-at-the-door': {
    id: 'check-your-body-at-the-door',
    titleKey: 'checkYourBodyAtTheDoor.title',
    type: 'documentary',
    url: 'https://www.checkyourbodyatthedoor.com/',
    descriptionKey: 'checkYourBodyAtTheDoor.description',
    authorKey: 'resources.checkYourBodyAtTheDoor.author',
    language: 'en',
    platformKey: 'resources.checkYourBodyAtTheDoor.platform',
    tags: ['documentary', 'house-dance', '1990s', 'nyc', 'underground', 'club-culture', 'archie-burnett'],
    sourceKey: 'resources.checkYourBodyAtTheDoor.source',
    featured: true,
    trailerId: 'check-your-body-at-the-door-trailer',
    ogMetadata: {
      titleKey: 'resources.checkYourBodyAtTheDoor.title',
      descriptionKey: 'resources.checkYourBodyAtTheDoor.description',
      image: '/images/resources/check-your-body-at-the-door-poster.jpg',
      siteNameKey: 'resources.checkYourBodyAtTheDoor.siteName'
    }
  },

  // Punking Dance - Official Instagram
  'punking-dance-instagram': {
    id: 'punking-dance-instagram',
    titleKey: 'punkingDanceInstagram.title',
    type: 'website',
    url: 'https://www.instagram.com/punking.dance/',
    descriptionKey: 'punkingDanceInstagram.description',
    authorKey: 'punkingDanceInstagram.author',
    language: 'en',
    platformKey: 'punkingDanceInstagram.platform',
    tags: ['social-media', 'punking', 'waacking', 'contemporary', 'community', 'tutorials'],
    sourceKey: 'punkingDanceInstagram.source',
    featured: true,
    ogMetadata: {
      titleKey: 'punkingDanceInstagram.title',
      descriptionKey: 'punkingDanceInstagram.description',
      image: '/images/resources/punking-dance-instagram.jpg',
      siteNameKey: 'punkingDanceInstagram.siteName'
    }
  },

  // Viktor Manoel Interview - Keeping Punking Alive
  'viktor-manoel-punking-interview': {
    id: 'viktor-manoel-punking-interview',
    titleKey: 'viktorManoelPunkingInterview.title',
    type: 'article',
    url: 'https://danseinfo.no/nyheter/interview-viktor-manoel-is-keeping-punking-alive/',
    descriptionKey: 'viktorManoelPunkingInterview.description',
    authorKey: 'viktorManoelPunkingInterview.author',
    year: '2025',
    language: 'en',
    platformKey: 'viktorManoelPunkingInterview.platform',
    tags: ['interview', 'punking', 'viktor-manoel', 'history', 'lgbtq', 'aids-crisis', 'david-bowie', 'originator'],
    sourceKey: 'viktorManoelPunkingInterview.source',
    featured: true,
    ogMetadata: {
      titleKey: 'viktorManoelPunkingInterview.title',
      descriptionKey: 'viktorManoelPunkingInterview.description',
      image: '/images/resources/viktor-manoel-interview.jpg',
      siteNameKey: 'viktorManoelPunkingInterview.siteName'
    }
  },

  // Viktor Manoel Dance Mogul Magazine Videos
  'viktor-manoel-dance-mogul-pt1': {
    id: 'viktor-manoel-dance-mogul-pt1',
    titleKey: 'viktorManoelDanceMogulPt1.title',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=hdUJlNoFhsk',
    descriptionKey: 'viktorManoelDanceMogulPt1.description',
    authorKey: 'viktorManoelDanceMogulPt1.author',
    year: '2012',
    duration: '9:22',
    language: 'en',
    platformKey: 'viktorManoelDanceMogulPt1.platform',
    tags: ['video', 'interview', 'punking', 'viktor-manoel', 'history', 'dance-mogul-magazine', 'originator'],
    sourceKey: 'viktorManoelDanceMogulPt1.source',
    featured: true,
    ogMetadata: {
      titleKey: 'viktorManoelDanceMogulPt1.title',
      descriptionKey: 'viktorManoelDanceMogulPt1.description',
      image: '/images/resources/viktor-manoel-dance-mogul-pt1.jpg',
      siteNameKey: 'viktorManoelDanceMogulPt1.siteName'
    }
  },

  'viktor-manoel-dance-mogul-pt2': {
    id: 'viktor-manoel-dance-mogul-pt2',
    titleKey: 'viktorManoelDanceMogulPt2.title',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=ZRs63Gc6Zt0',
    descriptionKey: 'viktorManoelDanceMogulPt2.description',
    authorKey: 'viktorManoelDanceMogulPt2.author',
    year: '2012',
    duration: '7:25',
    language: 'en',
    platformKey: 'viktorManoelDanceMogulPt2.platform',
    tags: ['video', 'interview', 'punking', 'viktor-manoel', 'history', 'dance-mogul-magazine', 'originator'],
    sourceKey: 'viktorManoelDanceMogulPt2.source',
    featured: true,
    ogMetadata: {
      titleKey: 'viktorManoelDanceMogulPt2.title',
      descriptionKey: 'viktorManoelDanceMogulPt2.description',
      image: '/images/resources/viktor-manoel-dance-mogul-pt2.jpg',
      siteNameKey: 'viktorManoelDanceMogulPt2.siteName'
    }
  },

  'viktor-manoel-dance-mogul-pt3': {
    id: 'viktor-manoel-dance-mogul-pt3',
    titleKey: 'viktorManoelDanceMogulPt3.title',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=FUL6PVdrwkM',
    descriptionKey: 'viktorManoelDanceMogulPt3.description',
    authorKey: 'viktorManoelDanceMogulPt3.author',
    year: '2012',
    duration: '7:54',
    language: 'en',
    platformKey: 'viktorManoelDanceMogulPt3.platform',
    tags: ['video', 'interview', 'punking', 'viktor-manoel', 'history', 'dance-mogul-magazine', 'originator', 'bullying'],
    sourceKey: 'viktorManoelDanceMogulPt3.source',
    featured: true,
    ogMetadata: {
      titleKey: 'viktorManoelDanceMogulPt3.title',
      descriptionKey: 'viktorManoelDanceMogulPt3.description',
      image: '/images/resources/viktor-manoel-dance-mogul-pt3.jpg',
      siteNameKey: 'viktorManoelDanceMogulPt3.siteName'
    }
  }
};

// Helper function to get resource by ID
export function getResourceById(id: string): ResourceEntity | undefined {
  return RESOURCES[id];
}

// Helper function to get resources by type
export function getResourcesByType(type: string): ResourceEntity[] {
  return Object.values(RESOURCES).filter(resource => resource.type === type);
}

// Helper function to get featured resources
export function getFeaturedResources(): ResourceEntity[] {
  return Object.values(RESOURCES).filter(resource => resource.featured);
}

// Helper function to get resources by tag
export function getResourcesByTag(tag: string): ResourceEntity[] {
  return Object.values(RESOURCES).filter(resource => 
    resource.tags?.includes(tag)
  );
}

// Helper function to get all resources
export function getAllResources(): ResourceEntity[] {
  return Object.values(RESOURCES);
}

// Helper function to get resources by language
export function getResourcesByLanguage(language: string): ResourceEntity[] {
  return Object.values(RESOURCES).filter(resource => resource.language === language);
}

// Export as resourceEntities for consistency with other entity files
export const resourceEntities = RESOURCES;