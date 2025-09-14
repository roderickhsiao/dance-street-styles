import { VideoEntity } from '../../data/types';

export const VIDEOS: Record<string, VideoEntity> = {
  'locking-featured': {
    id: 'locking-featured',
    titleKey: 'videos.locking.lockingFeatured.title',
    url: 'https://www.youtube.com/watch?v=C592tQXkbDs',
    type: 'history',
    descriptionKey: 'videos.locking.lockingFeatured.description',
    artistId: 'the-lockers',
    thumbnailUrl: 'https://img.youtube.com/vi/C592tQXkbDs/hqdefault.jpg',
  },
  '5-elements-of-hop-hop': {
    id: '5-elements-of-hop-hop',
    titleKey: 'videos.5ElementsOfHipHop.title',
    url: 'https://www.youtube.com/watch?v=_bOPlFICJAE',
    type: 'history',
    descriptionKey: 'videos.5ElementsOfHipHop.description',
    thumbnailUrl: 'https://img.youtube.com/vi/_bOPlFICJAE/hqdefault.jpg',
  },
  'dj-evolution': {
    id: 'dj-evolution',
    titleKey: 'videos.djEvolution.title',
    url: 'https://www.youtube.com/watch?v=Q5L2PvkZbU0',
    type: 'tutorial',
    descriptionKey: 'videos.djEvolution.description',
    thumbnailUrl: 'https://img.youtube.com/vi/Q5L2PvkZbU0/hqdefault.jpg',
  },
  'mcing-history': {
    id: 'mcing-history',
    titleKey: 'videos.mcingHistory.title',
    url: 'https://www.youtube.com/watch?v=s9nEeyhld2E',
    type: 'history',
    descriptionKey: 'videos.mcingHistory.description',
    thumbnailUrl: 'https://img.youtube.com/vi/s9nEeyhld2E/hqdefault.jpg',
  },
  'breaking-documentary': {
    id: 'breaking-documentary',
    titleKey: 'videos.breakingDocumentary.title',
    url: 'https://www.youtube.com/watch?v=9TMBWCcYs3o',
    type: 'history',
    descriptionKey: 'videos.breakingDocumentary.description',
    thumbnailUrl: 'https://img.youtube.com/vi/9TMBWCcYs3o/hqdefault.jpg',
  },
  'graffiti-art': {
    id: 'graffiti-art',
    titleKey: 'videos.graffitiArt.title',
    url: 'https://www.youtube.com/watch?v=O0E2Y_R85c0',
    type: 'history',
    descriptionKey: 'videos.graffitiArt.description',
    thumbnailUrl: 'https://img.youtube.com/vi/O0E2Y_R85c0/hqdefault.jpg',
  },
};

export const VIDEOS_LIST: VideoEntity[] = Object.values(VIDEOS);

export const getVideoById = (id: string): VideoEntity | undefined => {
  return VIDEOS[id];
};

export const getAllVideos = () => VIDEOS_LIST;
