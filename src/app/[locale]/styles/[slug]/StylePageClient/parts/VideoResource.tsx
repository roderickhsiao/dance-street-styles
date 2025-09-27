'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Play, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { motion } from '@/lib/motion';
import { videoEntities } from '@/data/entities/videos';
import type { VideoEntity } from '@/data/types';

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

// Helper function to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Helper function to get YouTube thumbnail URL
function getYouTubeThumbnailUrl(url: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'medium'): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault', 
    high: 'hqdefault',
    maxres: 'maxresdefault'
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

// Separate component for trailer embed to avoid hydration issues
function TrailerEmbed({ video, tResources }: { 
  video: VideoEntity; 
  tResources: ReturnType<typeof useTranslations>; 
}) {
  const videoId = getYouTubeVideoId(video.url);
  
  if (!videoId) {
    return (
      <div className="w-full h-full bg-surface-secondary flex items-center justify-center">
        <p className="text-content-secondary text-body-sm">
          Trailer unavailable
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={tResources(video.titleKey || '')}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
}

export function VideoResource({ resource }: VideoResourceProps) {
  const tResources = useTranslations('resources');
  const [showTrailer, setShowTrailer] = useState(false);

  // Get trailer video data if exists
  const trailerVideo = resource.trailerId
    ? videoEntities[resource.trailerId]
    : null;

  // Documentary with trailer - Hero style with integrated trailer
  if (resource.type === 'documentary' && trailerVideo && resource.url) {
    const thumbnailUrl = getYouTubeThumbnailUrl(trailerVideo.url, 'high');
    
    return (
      <div className="bg-surface-elevated border border-stroke-secondary rounded-lg overflow-hidden hover:border-accent-secondary/50 transition-all duration-300">
        {/* Hero Section - AnimatePresence with fixed container */}
        <div className="aspect-[16/9] relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {!showTrailer ? (
              <motion.button
                key="thumbnail"
                type="button"
                aria-label={tResources(resource.titleKey)}
                className="absolute inset-0 w-full h-full group flex items-end justify-start p-0 m-0"
                onClick={() => setShowTrailer(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {thumbnailUrl ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{
                        scale: 1.02,
                        filter: 'brightness(1.04)',
                      }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <Image
                        src={thumbnailUrl}
                        alt={tResources(resource.titleKey)}
                        className="w-full h-full object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 transition-colors pointer-events-none group-hover:bg-black/10" />
                  </div>
                ) : (
                  <div className="w-full h-full bg-surface-secondary flex items-center justify-center">
                    <Play className="h-12 w-12 text-accent-primary" />
                  </div>
                )}

                {/* Documentary badge */}
                <div className="absolute top-4 end-4">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    🎬 {tResources('ui.documentary')}
                  </span>
                </div>

                {/* Bottom gradient overlay and content */}
                <div className="absolute start-0 end-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-left">
                      <h4 className="text-body-sm md:text-body-md font-bold text-white leading-tight">
                        {tResources(resource.titleKey)}
                      </h4>
                    </div>

                    <div className="ms-auto">
                      <motion.div
                        className="bg-accent-primary/80 rounded-full p-2 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Play className="h-4 w-4 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ) : (
              <motion.div
                key="iframe"
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TrailerEmbed video={trailerVideo} tResources={tResources} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Close button when trailer is playing */}
          {showTrailer && (
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 start-4 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-colors z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Description and Actions */}
        <div className="p-3">
          <p className="text-body-xs text-content-secondary mb-3 line-clamp-2">
            {tResources(resource.descriptionKey)}
          </p>
          
          {/* Visit Site Link */}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-content-secondary hover:text-content-primary text-body-xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {tResources('ui.visitSite')}
          </a>
        </div>
      </div>
    );
  }

  // Standard video resource (for regular videos)
  if (resource.url) {
    const thumbnailUrl = getYouTubeThumbnailUrl(resource.url, 'medium');
    
    return (
      <div className="group bg-surface-elevated border border-stroke-secondary rounded-lg overflow-hidden hover:border-accent-secondary/50 transition-all duration-300">
        <div className="flex gap-3 p-3">
          {/* Video Thumbnail - Clickable */}
          <a 
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-secondary block"
          >
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={tResources(resource.titleKey)}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="absolute inset-0 bg-red-500 flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
            )}
            
            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-1.5">
                <Play className="w-3 h-3 text-black fill-current" />
              </div>
            </div>
          </a>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-body-sm font-semibold text-content-primary line-clamp-2 mb-1">
              {tResources(resource.titleKey)}
            </h4>
            <p className="text-body-xs text-content-secondary line-clamp-2 mb-2">
              {tResources(resource.descriptionKey)}
            </p>
            
            <Link
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent-secondary hover:text-accent-primary text-body-xs font-medium transition-colors"
            >
              <Play className="w-3 h-3" />
              <span>{tResources('ui.playVideo')}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for resources without URL
  return (
    <div className="group bg-surface-secondary/30 border border-stroke-secondary rounded-lg p-3">
      <div className="flex items-start gap-3">
        {/* Placeholder thumbnail */}
        <div className="w-16 h-12 rounded-lg bg-surface-elevated flex items-center justify-center flex-shrink-0">
          <Play className="w-4 h-4 text-red-400" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-body-sm font-semibold text-content-primary line-clamp-2 mb-1">
            {tResources(resource.titleKey)}
          </h4>
          <p className="text-body-xs text-content-secondary line-clamp-2">
            {tResources(resource.descriptionKey)}
          </p>
        </div>
      </div>
    </div>
  );
}