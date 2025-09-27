'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Globe, BookOpen, ExternalLink } from 'lucide-react';

interface ResourceItemProps {
  resource: { 
    id: string; 
    titleKey: string; 
    descriptionKey: string; 
    type: string; 
    url?: string; 
    featured?: boolean;
  };
}

export function ResourceItem({ resource }: ResourceItemProps) {
  const tResources = useTranslations('resources');
  
  // Get icon and color based on resource type
  const getResourceIcon = () => {
    const type = resource.type.toLowerCase();
    if (type === 'book' || type === 'publication') return { icon: BookOpen, color: 'text-amber-400' };
    if (type === 'documentary' || type === 'video') return { icon: '🎬', color: 'text-red-400' };
    if (type === 'podcast' || type === 'audio') return { icon: '🎧', color: 'text-purple-400' };
    return { icon: Globe, color: 'text-gray-400' };
  };
  
  const { icon, color } = getResourceIcon();
  const IconComponent = typeof icon === 'string' ? null : icon;
  const iconText = typeof icon === 'string' ? icon : null;
  
  return (
    <div className="group bg-surface-secondary/30 border border-stroke-secondary rounded-lg p-3 hover:bg-surface-secondary hover:border-accent-secondary/50 transition-all duration-300">
      <div className="flex items-start gap-3">
        {/* Type Icon */}
        <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center shrink-0">
          {IconComponent ? (
            <IconComponent className={`w-4 h-4 ${color}`} />
          ) : (
            <span className="text-sm">{iconText}</span>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-body-sm font-semibold text-content-primary line-clamp-2 mb-1">
            {tResources(resource.titleKey)}
          </h4>
          <p className="text-body-xs text-content-secondary line-clamp-2 mb-3">
            {tResources(resource.descriptionKey)}
          </p>
          
          {/* Action Button */}
          {resource.url && (
            <Link 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent-secondary hover:text-accent-primary text-body-xs font-medium transition-colors"
            >
              <span>Learn More</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}