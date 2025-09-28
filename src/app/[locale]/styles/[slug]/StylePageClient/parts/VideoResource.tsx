'use client';

import { useTranslations } from 'next-intl';
import { Play, ExternalLink } from 'lucide-react';

import Image from 'next/image';
import { getVideoById } from '@/data/entities/videos';
import { 
  getYouTubeVideoId, 
  getYouTubeThumbnailUrl, 
  isVideoUrl 
} from '@/lib/youtube';
import { useVideoPlayer } from '@/components/VideoPlayerProvider';

interface VideoResourceProps {
  resource: {
    id: string;
    titleKey: string;
    descriptionKey: string;
    type: string;
    url?: string;
    featured?: boolean;
    trailerId?: string;
  };
}

/**
 * Get resource type configuration for display
 */
function getResourceTypeConfig(type: string) {
  switch (type.toLowerCase()) {
    case 'documentary':
      return { 
        labelKey: 'resourceTypes.documentary', 
        icon: '🎬', 
        bgColor: 'bg-red-500/10', 
        textColor: 'text-red-400',
        borderColor: 'border-red-500/20'
      };
    case 'video':
      return { 
        labelKey: 'resourceTypes.video', 
        icon: '📹', 
        bgColor: 'bg-blue-500/10', 
        textColor: 'text-blue-400',
        borderColor: 'border-blue-500/20'
      };
    case 'interview':
    case 'article':
      return { 
        labelKey: 'resourceTypes.interview', 
        icon: '🎙️', 
        bgColor: 'bg-purple-500/10', 
        textColor: 'text-purple-400',
        borderColor: 'border-purple-500/20'
      };
    default:
      return { 
        labelKey: 'resourceTypes.video', 
        icon: '🎬', 
        bgColor: 'bg-gray-500/10', 
        textColor: 'text-gray-400',
        borderColor: 'border-gray-500/20'
      };
  }
}


export function VideoResource({ resource }: VideoResourceProps) {
  const tResources = useTranslations('resources');
  const videoPlayer = useVideoPlayer();
  const resourceConfig = getResourceTypeConfig(resource.type);



  // For documentaries, we need to get the trailer URL
  const getVideoUrl = () => {
    if (resource.type === 'documentary' && resource.trailerId) {
      const trailerVideo = getVideoById(resource.trailerId);
      return trailerVideo?.url;
    }
    return resource.url;
  };

  const videoUrl = getVideoUrl();
  
  // Check if this is a video resource (YouTube, Vimeo, etc.) or documentary with trailer
  const isVideoResource = (videoUrl && isVideoUrl(videoUrl)) || 
                         (resource.type === 'documentary' && resource.trailerId);

  const youTubeVideoId = isVideoResource && videoUrl ? getYouTubeVideoId(videoUrl) : null;

  // Handle video click
  const handleVideoClick = () => {
    if (youTubeVideoId) {
      videoPlayer.openVideo(
        youTubeVideoId,
        tResources(resource.titleKey),
        tResources(resource.descriptionKey)
      );
    }
  };

  // All video resources use consistent card layout
  if (resource.url) {
    const thumbnailUrl = getYouTubeThumbnailUrl(videoUrl || resource.url, 'medium');

    // Create the clickable wrapper based on resource type
    const ClickableWrapper = ({ children }: { children: React.ReactNode }) => {
      if (isVideoResource && youTubeVideoId) {
        // For YouTube videos, make entire card clickable to open video player
        return (
          <button
            onClick={handleVideoClick}
            className="group bg-surface-secondary/30 border border-stroke-secondary rounded-lg p-2 sm:p-3 hover:bg-surface-secondary hover:border-accent-secondary/50 transition-all duration-300 w-full max-w-full overflow-hidden relative text-start"
          >
            {children}
          </button>
        );
      } else {
        // For external resources, make entire card link to external URL
        return (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-surface-secondary/30 border border-stroke-secondary rounded-lg p-2 sm:p-3 hover:bg-surface-secondary hover:border-accent-secondary/50 transition-all duration-300 w-full max-w-full overflow-hidden relative block"
          >
            {children}
          </a>
        );
      }
    };

    return (
      <>
        <ClickableWrapper>
          <div className="flex items-start gap-2 sm:gap-3">
            {/* Video Thumbnail */}
            <div className="relative w-16 sm:w-20 rounded-lg overflow-hidden shrink-0 bg-surface-elevated flex items-center justify-center"
                 style={{ aspectRatio: '4/3' }}>
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={tResources(resource.titleKey)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 64px, 80px"
                />
              ) : (
                <div className="w-full h-full bg-accent-primary/10 flex items-center justify-center">
                  <Play className="w-4 h-4 sm:w-6 sm:h-6 text-accent-primary" />
                </div>
              )}
              
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-1 sm:p-1.5">
                  <Play className="w-2 h-2 sm:w-3 sm:h-3 text-black fill-current" />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0 max-w-full overflow-hidden">
              <h4 className="text-body-xs sm:text-body-sm font-semibold text-content-primary line-clamp-1 sm:line-clamp-2 mb-1 break-words">
                {tResources(resource.titleKey)}
              </h4>
              <p className="text-xs sm:text-body-xs text-content-secondary line-clamp-2 break-words mb-2">
                {tResources(resource.descriptionKey)}
              </p>
              
              {/* Resource Type Badge - Below Content */}
              <div className="mb-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full border text-xs font-medium ${resourceConfig.bgColor} ${resourceConfig.textColor} ${resourceConfig.borderColor}`}>
                  {tResources(resourceConfig.labelKey)}
                </span>
              </div>
              
              {!isVideoResource && (
                <div className="inline-flex items-center gap-1 text-accent-secondary group-hover:text-accent-primary text-body-xs font-medium transition-colors max-w-full">
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  <span className="truncate">{tResources('ui.visitSite')}</span>
                </div>
              )}
            </div>
          </div>
        </ClickableWrapper>
      </>
    );
  }

  // Fallback for resources without URL
  return (
    <div className="group bg-surface-secondary/30 border border-stroke-secondary rounded-lg p-2 sm:p-3 w-full max-w-full overflow-hidden">
      <div className="flex items-start gap-2 sm:gap-3">
        {/* Placeholder thumbnail */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-surface-elevated flex items-center justify-center shrink-0">
          <Play className="w-4 h-4 sm:w-6 sm:h-6 text-accent-primary" />
        </div>
        
        <div className="flex-1 min-w-0 max-w-full overflow-hidden">
          <h4 className="text-body-xs sm:text-body-sm font-semibold text-content-primary line-clamp-1 sm:line-clamp-2 mb-1 break-words">
            {tResources(resource.titleKey)}
          </h4>
          <p className="text-xs sm:text-body-xs text-content-secondary line-clamp-1 sm:line-clamp-2 mb-2 break-words">
            {tResources(resource.descriptionKey)}
          </p>
          
          {/* Resource Type Badge - Pill Style */}
          <div>
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-medium max-w-full ${resourceConfig.bgColor} ${resourceConfig.textColor} ${resourceConfig.borderColor}`}>
              <span className="text-xs shrink-0">{resourceConfig.icon}</span>
              <span className="truncate">{tResources(resourceConfig.labelKey)}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}