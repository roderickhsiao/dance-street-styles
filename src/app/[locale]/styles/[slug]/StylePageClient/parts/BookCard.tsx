'use client';

import { useTranslations } from 'next-intl';
import { Book, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ResourceEntity } from '@/data/types';

interface BookCardProps {
  resource: ResourceEntity;
}

export function BookCard({ resource }: BookCardProps) {
  const t = useTranslations('resources');
  
  const title = resource.titleKey ? t(resource.titleKey) : t('ui.untitled');
  const description = resource.descriptionKey ? t(resource.descriptionKey) : '';
  const author = resource.authorKey ? t(resource.authorKey) : '';
  const publisher = resource.sourceKey ? t(resource.sourceKey) : '';
  const year = resource.year || '';
  
  // Ensure URL exists for proper linking
  if (!resource.url) {
    return null;
  }

  return (
    <Link 
      href={resource.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="bg-surface-secondary/30 border border-stroke-secondary rounded-lg p-4 hover:bg-surface-secondary hover:border-accent-secondary/50 transition-all duration-300">
        <div className="flex items-start gap-4">
          {/* Book Cover or Icon */}
          <div className="flex-shrink-0 w-14 h-20 bg-surface-elevated rounded-lg flex items-center justify-center overflow-hidden border border-stroke-secondary">
            {resource.ogMetadata?.image ? (
              <Image
                src={resource.ogMetadata.image}
                alt={title}
                width={56}
                height={80}
                className="object-cover w-full h-full"
              />
            ) : (
              <Book className="w-5 h-5 text-green-400" />
            )}
          </div>
          
          {/* Book Info */}
          <div className="flex-1 min-w-0">
            <h5 className="text-body-sm font-semibold text-content-primary mb-1 line-clamp-2 group-hover:text-accent-primary transition-colors">
              {title}
            </h5>
            {author && (
              <p className="text-body-xs text-content-secondary mb-1">
                {t('ui.byAuthor', { author })}
              </p>
            )}
            {publisher && year && (
              <p className="text-body-xs text-content-tertiary mb-2">
                {t('ui.publisherYear', { publisher, year })}
              </p>
            )}
            {description && (
              <p className="text-body-xs text-content-secondary line-clamp-2">
                {description}
              </p>
            )}
          </div>
          
          {/* External Link Icon */}
          <ExternalLink className="w-4 h-4 text-content-tertiary group-hover:text-accent-primary transition-colors flex-shrink-0" />
        </div>
      </div>
    </Link>
  );
}