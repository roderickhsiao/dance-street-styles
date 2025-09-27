'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { OGMetadata } from '@/data/types';

interface WebsitePreviewCardProps {
  resource: { 
    id: string; 
    titleKey: string; 
    descriptionKey: string; 
    type: string; 
    url?: string; 
    featured?: boolean; 
    ogMetadata?: OGMetadata;
  };
}

export function WebsitePreviewCard({ resource }: WebsitePreviewCardProps) {
  const tResources = useTranslations('resources');
  
  // Use OG metadata if available, with support for both static text and translation keys
  const ogImage = resource.ogMetadata?.image;
  const ogTitle = resource.ogMetadata?.titleKey 
    ? tResources(resource.ogMetadata.titleKey)
    : resource.ogMetadata?.title || tResources(resource.titleKey);
  const ogDescription = resource.ogMetadata?.descriptionKey
    ? tResources(resource.ogMetadata.descriptionKey)
    : resource.ogMetadata?.description || tResources(resource.descriptionKey);
  const ogSiteName = resource.ogMetadata?.siteNameKey
    ? tResources(resource.ogMetadata.siteNameKey)
    : resource.ogMetadata?.siteName;
  
  if (!resource.url) {
    // If no URL, render as non-clickable card
    return (
      <div className="group bg-surface-elevated p-3 rounded-lg border border-stroke-secondary">
        <div className="flex gap-3">
          {/* Improved landscape image display */}
          {ogImage && (
            <div className="relative size-24 shrink-0 overflow-hidden rounded">
              <Image 
                src={ogImage} 
                alt={ogTitle}
                fill
                className="object-contain object-center p-1"
                sizes="96px"
              />
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-body-sm font-semibold text-content-primary mb-1">
              {ogTitle}
            </h4>
            
            <p className="text-body-xs text-content-secondary line-clamp-2 mb-2">
              {ogDescription}
            </p>
            
            <span className="text-body-xs text-content-tertiary">
              {ogSiteName}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-surface-elevated p-3 rounded-lg border border-stroke-secondary hover:border-accent-primary/50 transition-all duration-300 cursor-pointer"
    >
      <div className="flex gap-3">
        {/* Improved landscape image display */}
        {ogImage && (
          <div className="relative size-24 shrink-0 overflow-hidden rounded">
            <Image 
              src={ogImage} 
              alt={ogTitle}
              fill
              className="object-contain object-center group-hover:scale-105 transition-transform duration-300 p-1"
              sizes="96px"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-body-sm font-semibold text-content-primary group-hover:text-accent-primary transition-colors line-clamp-2 mb-1">
            {ogTitle}
          </h4>
          
          <p className="text-body-xs text-content-secondary line-clamp-2 mb-2">
            {ogDescription}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-body-xs text-content-tertiary truncate">
              {ogSiteName || resource.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </span>
            
            <span className="px-2 py-1 bg-accent-primary/10 group-hover:bg-accent-primary/20 text-accent-primary text-body-xs font-medium rounded transition-colors shrink-0">
              {tResources('visit')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}