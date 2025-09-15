import { PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from '@/lib/motion';
import { VideoEntity } from '@/data/types';

interface FeaturedVideoProps {
  video?: VideoEntity;
  className?: string;
}

function getYouTubeId(url?: string | null) {
  if (!url) return null;
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

export function FeaturedVideo({ video, className = '' }: FeaturedVideoProps) {
  const t = useTranslations();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video) {
    // Default placeholder
    return (
      <div className={className}>
        <div className="aspect-video bg-surface-elevated border border-stroke-secondary rounded-xl flex items-center justify-center group transition-colors">
          <div className="text-center">
            <PlayCircle className="h-10 w-10 md:h-12 md:w-12 text-accent-primary mx-auto mb-2 md:mb-3" />
          </div>
        </div>
      </div>
    );
  }

  const videoId = getYouTubeId(video.url);

  return (
    <div className={className}>
      <div className="aspect-video bg-surface-elevated border border-stroke-secondary rounded-xl overflow-hidden relative">
        <AnimatePresence initial={false}>
          {!isPlaying ? (
            <motion.button
              key="thumb"
              type="button"
              aria-label={video.titleKey ? t(video.titleKey) : 'Play video'}
              className="w-full h-full group flex items-end justify-start p-0 m-0 relative"
              onClick={() => setIsPlaying(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
            >
              {video.thumbnailUrl ? (
                <div className="w-full h-full relative overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{
                      scale: 1.02,
                      filter: 'brightness(1.04) grayscale(0%)',
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <Image
                      src={video.thumbnailUrl}
                      alt={
                        video.titleKey
                          ? t(video.titleKey)
                          : t('featuredVideo.placeholderAlt')
                      }
                      className="w-full h-full object-cover filter grayscale-30"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                  {/* subtle overlay for hover effects - low opacity to avoid flashing */}
                  <div className="absolute inset-0 transition-colors pointer-events-none group-hover:bg-[rgba(0,0,0,0.06)]" />
                </div>
              ) : (
                <div className="w-full h-full bg-surface-elevated flex items-center justify-center">
                  <PlayCircle className="h-10 w-10 md:h-12 md:w-12 text-accent-primary" />
                </div>
              )}

              {/* dark gradient overlay at bottom for title/description */}
              <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-left">
                    <h3 className="text-body-sm md:text-body-md font-bold text-white leading-tight">
                      {video.titleKey
                        ? t(video.titleKey)
                        : t('featuredVideo.title')}
                    </h3>
                    <p className="text-body-xs md:text-body-sm text-white/80 mt-1">
                      {video.descriptionKey
                        ? t(video.descriptionKey)
                        : t('featuredVideo.description')}
                    </p>
                  </div>

                  <div className="ms-auto">
                    <motion.div
                      className="bg-accent-primary/80 rounded-full p-3 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.18 }}
                    >
                      <PlayCircle className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.button>
          ) : (
            <motion.div
              key="iframe"
              className="w-full h-full"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
                  title={video.titleKey ? t(video.titleKey) : 'Featured video'}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <iframe
                  src={video.url}
                  title={video.titleKey ? t(video.titleKey) : 'Featured video'}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
