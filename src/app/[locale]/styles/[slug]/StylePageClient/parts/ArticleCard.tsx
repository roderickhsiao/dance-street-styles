'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink, FileText, User } from 'lucide-react';
import Image from 'next/image';
import { OGMetadata } from '@/data/types';

interface ArticleCardProps {
  resource: { 
    id: string; 
    titleKey: string; 
    descriptionKey: string; 
    type: string; 
    url?: string; 
    authorKey?: string;
    year?: string;
    platformKey?: string;
    featured?: boolean; 
    ogMetadata?: OGMetadata;
  };
}

export function ArticleCard({ resource }: ArticleCardProps) {
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

  const author = resource.authorKey ? tResources(resource.authorKey) : null;
  const platform = resource.platformKey ? tResources(resource.platformKey) : ogSiteName;
  
  if (!resource.url) {
    // If no URL, render as non-clickable card
    return (
      <div className="group bg-surface-elevated p-4 rounded-lg border border-stroke-secondary">
        <div className="flex gap-4">
          {/* Article icon/image with year below */}
          <div className="shrink-0">
            {ogImage ? (
              <div className="relative w-16 h-16 overflow-hidden rounded-lg">
                <Image 
                  src={ogImage} 
                  alt={ogTitle}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-8 h-8 text-amber-400" />
              </div>
            )}
            {/* Year below image */}
            {resource.year && (
              <div className="text-center mt-2">
                <span className="text-body-xs text-content-tertiary bg-surface-secondary px-2 py-1 rounded-md">
                  {resource.year}
                </span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-body-md font-semibold text-content-primary leading-tight mb-1">
              {ogTitle}
            </h4>
            
            {/* Metadata - without year */}
            <div className="flex items-center gap-3 text-body-xs text-content-tertiary mb-2">
              {author && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {author}
                </span>
              )}
              {platform && (
                <span className="text-accent-secondary font-medium">
                  {platform}
                </span>
              )}
            </div>
            
            <p className="text-body-sm text-content-secondary leading-relaxed line-clamp-2">
              {ogDescription}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <a 
      href={resource.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="bg-surface-secondary/30 border border-stroke-secondary rounded-lg p-5 hover:bg-surface-secondary hover:border-accent-secondary/50 transition-all duration-300">
        <div className="flex items-start gap-4">
          {/* Article icon/image with year below */}
          <div className="shrink-0">
            {ogImage ? (
              <div className="relative w-14 h-14 overflow-hidden rounded-lg border border-stroke-secondary">
                <Image 
                  src={ogImage} 
                  alt={ogTitle}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            ) : (
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-stroke-secondary group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-colors">
                <FileText className="w-6 h-6 text-amber-400" />
              </div>
            )}
            {/* Year below image */}
            {resource.year && (
              <div className="text-center mt-2">
                <span className="text-body-xs text-content-tertiary bg-surface-secondary/50 px-2 py-1 rounded-md">
                  {resource.year}
                </span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-body-md font-semibold text-content-primary leading-tight mb-2 line-clamp-2 group-hover:text-accent-primary transition-colors">
              {ogTitle}
            </h4>
            
            {/* Author */}
            {author && (
              <p className="text-body-sm text-content-secondary mb-1">
                {tResources('ui.byAuthor', { author })}
              </p>
            )}
            
            {/* Platform only - year moved below image */}
            {platform && (
              <div className="text-body-xs text-content-tertiary mb-3">
                <span className="font-medium">
                  {platform}
                </span>
              </div>
            )}
            
            <p className="text-body-sm text-content-secondary leading-relaxed line-clamp-3">
              {ogDescription}
            </p>
          </div>
          
          {/* External Link Icon */}
          <ExternalLink className="w-4 h-4 text-content-tertiary group-hover:text-accent-primary transition-colors shrink-0" />
        </div>
      </div>
    </a>
  );
}