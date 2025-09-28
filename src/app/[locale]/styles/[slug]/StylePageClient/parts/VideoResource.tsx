'use client';

import { useTranslations } from 'next-intl';
import { Play, ExternalLink, X } from 'lucide-react';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { YouTubeApiManager } from '@/lib/youtube-api';
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


export const VideoResource = ({ resource }: VideoResourceProps) => {
  const tResources = useTranslations('resources');
  const videoPlayer = useVideoPlayer();
  const [isInlineExpanded, setIsInlineExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  // Use a truly unique player ID per resource instance that never changes
  const playerInstanceId = useMemo(() => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `inline-player-${resource.id}-${timestamp}-${random}`;
  }, [resource.id]); // Only depend on resource.id for stability
  const [playerCreated, setPlayerCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const resourceConfig = useMemo(() => getResourceTypeConfig(resource.type), [resource.type]);



  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoized video data
  const videoData = useMemo(() => {
    const getVideoUrl = () => {
      if (resource.type === 'documentary' && resource.trailerId) {
        const trailerVideo = getVideoById(resource.trailerId);
        return trailerVideo?.url;
      }
      return resource.url;
    };

    const videoUrl = getVideoUrl();
    const isVideoResource = (videoUrl && isVideoUrl(videoUrl)) || 
                           (resource.type === 'documentary' && resource.trailerId);
    const youTubeVideoId = isVideoResource && videoUrl ? getYouTubeVideoId(videoUrl) : null;
    
    return { videoUrl, isVideoResource, youTubeVideoId };
  }, [resource.type, resource.trailerId, resource.url]);

  // Memoized translated content
  const translatedContent = useMemo(() => ({
    title: tResources(resource.titleKey),
    description: tResources(resource.descriptionKey)
  }), [tResources, resource.titleKey, resource.descriptionKey]);

  // Handle video click - mobile inline or desktop modal
  const handleVideoClick = useCallback(() => {
    if (!videoData.youTubeVideoId) {
      return;
    }
    
    if (isMobile) {
      // Mobile: expand inline (completely independent)
      setIsInlineExpanded(true);
    } else {
      // Desktop: open in modal/PiP (global system)
      videoPlayer.openVideo(
        videoData.youTubeVideoId,
        translatedContent.title,
        translatedContent.description
      );
    }
  }, [videoData.youTubeVideoId, isMobile, videoPlayer, translatedContent]);  // Handle inline close with cleanup
  const handleInlineClose = useCallback(() => {
    // Destroy player to prevent conflicts
    if (playerCreated) {
      const apiManager = YouTubeApiManager.getInstance();
      apiManager.destroyPlayer(playerInstanceId);
    }
    
    // Reset all states
    setIsInlineExpanded(false);
    setPlayerCreated(false);
    setIsLoading(false);
  }, [playerCreated, playerInstanceId]);

  // Initialize inline YouTube player when expanded
  useEffect(() => {
    if (!isInlineExpanded || !videoData.youTubeVideoId || playerCreated) {
      return;
    }

    const apiManager = YouTubeApiManager.getInstance();
    const playerId = playerInstanceId;
    
    const createPlayerWithDelay = async (retryCount = 0) => {
      try {
        setIsLoading(true);
        
        // Ensure container is ready
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (!playerRef.current || !isInlineExpanded) {
          setIsLoading(false);
          return;
        }

        // Ensure no existing player with this ID (extra safety)
        apiManager.destroyPlayer(playerId);
        
        await apiManager.createPlayer(playerId, videoData.youTubeVideoId!, {
          autoplay: true,
          startTime: 0,
        });
        
        // Only set states if we're still expanded
        if (isInlineExpanded) {
          setPlayerCreated(true);
          setIsLoading(false);
        }
      } catch {
        // Retry up to 3 times with increasing delay
        if (retryCount < 2 && isInlineExpanded) {
          setTimeout(() => createPlayerWithDelay(retryCount + 1), (retryCount + 1) * 1000);
        } else {
          // Final failure - reset states
          setPlayerCreated(false);
          setIsLoading(false);
        }
      }
    };

    // Wait for next tick to ensure DOM is ready
    setTimeout(createPlayerWithDelay, 0);
  }, [isInlineExpanded, videoData.youTubeVideoId, playerCreated, playerInstanceId]);

  // Cleanup player on unmount
  useEffect(() => {
    const playerId = playerInstanceId;
    
    return () => {
      const apiManager = YouTubeApiManager.getInstance();
      apiManager.destroyPlayer(playerId);
    };
  }, [playerInstanceId]);
  
  // Additional cleanup when video changes or component state changes
  useEffect(() => {
    if (!isInlineExpanded && playerCreated) {
      const apiManager = YouTubeApiManager.getInstance();
      apiManager.destroyPlayer(playerInstanceId);
      setPlayerCreated(false);
      setIsLoading(false);
    }
  }, [isInlineExpanded, playerCreated, playerInstanceId, videoData.youTubeVideoId]);

  // All video resources use consistent card layout
  if (resource.url) {
    const thumbnailUrl = getYouTubeThumbnailUrl(videoData.videoUrl || resource.url, 'medium');

    // Create the clickable wrapper based on resource type
    const ClickableWrapper = ({ children }: { children: React.ReactNode }) => {
      if (videoData.isVideoResource && videoData.youTubeVideoId) {
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
        {/* Mobile inline expanded video */}
        <AnimatePresence>
          {isInlineExpanded && isMobile && videoData.youTubeVideoId && (
            <m.div
              key="mobile-video-player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 mb-6"
            >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">{translatedContent.title}</h3>
              <button
                onClick={handleInlineClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video relative rounded-xl overflow-hidden">
              <div
                ref={playerRef}
                id={playerInstanceId}
                className="w-full h-full bg-black"
              />
              {/* Loading indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}

            </div>
            <p className="text-gray-300 text-sm mt-4">{translatedContent.description}</p>
          </m.div>
          )}
          
          {/* Hide the clickable card when video is playing inline on mobile */}
          {!(isInlineExpanded && isMobile) && (
            <m.div
              key="video-card"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
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
              
              {!videoData.isVideoResource && (
                <div className="inline-flex items-center gap-1 text-accent-secondary group-hover:text-accent-primary text-body-xs font-medium transition-colors max-w-full">
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  <span className="truncate">{tResources('ui.visitSite')}</span>
                </div>
              )}
            </div>
          </div>
              </ClickableWrapper>
            </m.div>
          )}
        </AnimatePresence>
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