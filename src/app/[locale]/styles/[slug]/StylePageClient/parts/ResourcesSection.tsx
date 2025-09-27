'use client';

import { useTranslations } from 'next-intl';
import { Globe, BookOpen } from 'lucide-react';
import { getResourcesGroupedByType } from '@/data/danceStyles';
import { WebsitePreviewCard } from './WebsitePreviewCard';
import { ResourceItem } from './ResourceItem';
import { VideoResource } from './VideoResource';

interface ResourcesSectionProps {
  danceStyleId: string;
}

export function ResourcesSection({ danceStyleId }: ResourcesSectionProps) {
  const tUi = useTranslations('resources.ui');
  
  const resourcesByType = getResourcesGroupedByType(danceStyleId);
  
  // Check if we have any resources
  const hasResources = Object.values(resourcesByType).some(resources => resources.length > 0);
  
  if (!hasResources) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-header-sm font-bold text-content-primary mb-2">
          {tUi('noResourcesTitle')}
        </h3>
        <p className="text-body-md text-content-secondary">
          {tUi('noResourcesMessage')}
        </p>
      </div>
    );
  }

  // Group all resources for more efficient rendering
  const allResources = [
    ...resourcesByType.websites,
    ...resourcesByType.documentaries,
    ...resourcesByType.books, 
    ...resourcesByType.videos,
    ...resourcesByType.podcasts
  ].filter((resource): resource is NonNullable<typeof resource> => resource !== null);

  if (allResources.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">📚</div>
        <h3 className="text-body-lg font-medium text-content-primary mb-1">
          {tUi('noResourcesTitle')}
        </h3>
        <p className="text-body-sm text-content-secondary">
          {tUi('noResourcesMessage')}
        </p>
      </div>
    );
  }

  // Separate resources by type
  const websites = allResources.filter(r => r.type === 'website');
  const videos = allResources.filter(r => r.type === 'video' || r.type === 'documentary');
  const otherResources = allResources.filter(r => r.type !== 'website' && r.type !== 'video' && r.type !== 'documentary');
  
  return (
    <div className="space-y-8">
      {/* Website Previews - Special cards with OG-like previews */}
      {websites.length > 0 && (
        <div>
          <h4 className="text-body-md font-semibold text-content-primary mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            {tUi('websitesSection')}
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {websites.map((resource) => (
              <WebsitePreviewCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}
      
      {/* Videos - Special cards with inline playback */}
      {videos.length > 0 && (
        <div>
          <h4 className="text-body-md font-semibold text-content-primary mb-4 flex items-center gap-2">
            <span className="text-red-400">🎬</span>
            {tUi('videosSection')}
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {videos.map((resource) => (
              <VideoResource key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}
      
      {/* Other Resources - Compact grid */}
      {otherResources.length > 0 && (
        <div>
          <h4 className="text-body-md font-semibold text-content-primary mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            {tUi('otherSection')}
          </h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {otherResources.map((resource) => (
              <ResourceItem key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}