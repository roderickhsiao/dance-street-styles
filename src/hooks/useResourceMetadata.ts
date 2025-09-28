import { useTranslations } from 'next-intl';
import type { ResourceEntity } from '@/data/types';

export interface ResourceMetadata {
  title: string;
  description: string;
  siteName?: string;
  image?: string;
  author?: string;
  platform?: string;
}

export function useResourceMetadata(resource: ResourceEntity): ResourceMetadata {
  const tResources = useTranslations('resources');

  const title = resource.ogMetadata?.titleKey 
    ? tResources(resource.ogMetadata.titleKey)
    : resource.ogMetadata?.title || tResources(resource.titleKey);

  const description = resource.ogMetadata?.descriptionKey
    ? tResources(resource.ogMetadata.descriptionKey)
    : resource.ogMetadata?.description || tResources(resource.descriptionKey);

  const siteName = resource.ogMetadata?.siteNameKey
    ? tResources(resource.ogMetadata.siteNameKey)
    : resource.ogMetadata?.siteName;

  const author = resource.authorKey ? tResources(resource.authorKey) : null;
  const platform = resource.platformKey ? tResources(resource.platformKey) : siteName;

  return {
    title,
    description,
    siteName,
    image: resource.ogMetadata?.image,
    author: author || undefined,
    platform: platform || undefined,
  };
}