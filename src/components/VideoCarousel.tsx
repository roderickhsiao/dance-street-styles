'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

interface VideoItem {
  url: string;
}

interface VideoCarouselProps {
  videos: VideoItem[];
  className?: string;
}

export const VideoCarousel = ({ videos, className = '' }: VideoCarouselProps) => {
  const t = useTranslations('streetCulture.elements.videos');
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToVideo = (index: number) => {
    setCurrentIndex(index);
    // Scroll thumbnail into view within the container only
    if (thumbnailRefs.current[index] && thumbnailContainerRef.current) {
      const thumbnail = thumbnailRefs.current[index];
      const container = thumbnailContainerRef.current;
      
      if (thumbnail && container) {
        // Calculate the scroll position to center the thumbnail
        const thumbnailCenter = thumbnail.offsetLeft + thumbnail.offsetWidth / 2;
        const containerCenter = container.offsetWidth / 2;
        const scrollLeft = thumbnailCenter - containerCenter;
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`py-16 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-header-lg font-black mb-4 text-content-primary magazine-headline">
            {t('title')}
          </h2>
          <p className="text-content-secondary text-body-lg max-w-3xl mx-auto magazine-body">
            {t('subtitle')}
          </p>
        </div>

        {/* Main Video Display */}
        <div className="relative max-w-5xl mx-auto mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-surface-secondary/50 backdrop-blur-sm rounded-2xl border border-stroke-primary overflow-hidden shadow-2xl"
              layoutId={`video-${currentIndex}`}
            >
              <div className="aspect-video bg-surface-primary relative">
                {(() => {
                  const videoId = getYouTubeVideoId(videos[currentIndex].url);
                  return videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`}
                      title={t('videoTitle', { number: currentIndex + 1 })}
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <a
                      href={videos[currentIndex].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full h-full bg-accent-primary/10 hover:bg-accent-primary/20 transition-colors text-accent-primary font-bold text-lg magazine-sans"
                    >
                      <div className="text-center">
                        <div className="mb-4">
                          <Play size={48} className="mx-auto" />
                        </div>
                        <div>{t('watchVideo')}</div>
                      </div>
                    </a>
                  );
                })()}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevVideo}
            className="absolute start-4 top-1/2 -translate-y-1/2 bg-surface-elevated/90 backdrop-blur-sm border border-stroke-primary rounded-full w-12 h-12 flex items-center justify-center text-content-primary hover:bg-accent-primary hover:text-surface-primary transition-all duration-300 z-10"
            aria-label={t('previousVideo')}
          >
            ←
          </button>
          <button
            onClick={nextVideo}
            className="absolute end-4 top-1/2 -translate-y-1/2 bg-surface-elevated/90 backdrop-blur-sm border border-stroke-primary rounded-full w-12 h-12 flex items-center justify-center text-content-primary hover:bg-accent-primary hover:text-surface-primary transition-all duration-300 z-10"
            aria-label={t('nextVideo')}
          >
            →
          </button>
        </div>

        {/* Video Thumbnails with smooth scrolling */}
        <div className="relative mb-6">
          <div 
            ref={thumbnailContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth"
          >
            <div className="flex gap-3 md:px-4 mx-auto">
              {videos.map((video, index) => {
                const videoId = getYouTubeVideoId(video.url);
                const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
                
                return (
                  <motion.button
                    key={index}
                    ref={(el) => { thumbnailRefs.current[index] = el; }}
                    onClick={() => goToVideo(index)}
                    className={`flex-shrink-0 relative overflow-hidden rounded-lg border-2 transition-all duration-300 snap-center ${
                      index === currentIndex
                        ? 'border-accent-primary scale-105 shadow-lg shadow-accent-primary/25'
                        : 'border-stroke-secondary hover:border-accent-primary/50 hover:scale-102'
                    }`}
                    whileHover={{ scale: index === currentIndex ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    layoutId={`thumbnail-${index}`}
                  >
                    <div className="w-32 sm:w-40 aspect-video bg-surface-primary relative">
                      {thumbnailUrl ? (
                        <Image
                          src={thumbnailUrl}
                          alt={t('thumbnailAlt', { number: index + 1 })}
                          className="w-full h-full object-cover"
                          width={160}
                          height={90}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-accent-primary/10">
                          <Play size={24} className="text-accent-primary" />
                        </div>
                      )}
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <div className="w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center text-surface-primary">
                          <Play size={12} />
                        </div>
                      </div>
                      
                      {/* Current video indicator */}
                      {index === currentIndex && (
                        <div className="absolute top-2 end-2 w-3 h-3 bg-accent-primary rounded-full shadow-lg animate-pulse"></div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress indicators for mobile */}
        <div className="flex justify-center gap-2 mt-6 sm:hidden">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToVideo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-accent-primary w-6'
                  : 'bg-stroke-secondary hover:bg-accent-primary/50 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
