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