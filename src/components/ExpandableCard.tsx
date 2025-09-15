'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

interface ExpandableCardProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  why: string;
  pioneers: string;
  historicalNote: string;
  bgColor: string;
  hoverColor: string;
  borderColor: string;
  videoUrl?: string;
}

export const ExpandableCard = ({
  icon,
  title,
  subtitle,
  description,
  why,
  pioneers,
  historicalNote,
  bgColor,
  hoverColor,
  borderColor,
  videoUrl
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations('origins.streetCulture.elements.sections');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${bgColor} ${hoverColor} ${borderColor} backdrop-blur-sm p-4 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{icon}</div>
          <div>
            <h4 className="text-header-sm font-black text-content-primary magazine-headline">
              {title}
            </h4>
            <p className="text-body-sm text-content-secondary magazine-sans">
              {subtitle}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-content-tertiary"
        >
          ▼
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-stroke-secondary">
              <div className="space-y-4">
                <div>
                  <h5 className="text-body-sm font-bold text-content-primary mb-2 magazine-headline">
                    {t('description')}
                  </h5>
                  <p className="text-body-sm text-content-secondary magazine-sans leading-normal font-medium">
                    {description}
                  </p>
                </div>
                
                <div>
                  <h5 className="text-body-sm font-bold text-content-primary mb-2 magazine-headline">
                    {t('whyItMatters')}
                  </h5>
                  <p className="text-body-sm text-content-secondary magazine-sans leading-normal font-medium">
                    {why}
                  </p>
                </div>
                
                <div>
                  <h5 className="text-body-sm font-bold text-content-primary mb-2 magazine-headline">
                    {t('pioneers')}
                  </h5>
                  <p className="text-body-sm text-content-secondary magazine-sans leading-normal font-medium">
                    {pioneers}
                  </p>
                </div>

                <div>
                  <h5 className="text-body-sm font-bold text-content-primary mb-2 magazine-headline">
                    {t('historicalNote')}
                  </h5>
                  <p className="text-body-sm text-content-secondary magazine-sans leading-normal font-medium">
                    {historicalNote}
                  </p>
                </div>

                {videoUrl && (
                  <div>
                    <h5 className="text-body-sm font-bold text-content-primary mb-3 magazine-headline">
                      {t('watchVideo')}
                    </h5>
                    <div className="aspect-video bg-surface-primary rounded-lg overflow-hidden">
                      {(() => {
                        const videoId = getYouTubeVideoId(videoUrl);
                        return videoId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                            title={`${title} Video`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        ) : (
                          <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full h-full bg-accent-primary/10 hover:bg-accent-primary/20 transition-colors text-accent-primary font-bold text-body-sm magazine-sans"
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-1">▶</div>
                              <div>Watch Video</div>
                            </div>
                          </a>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
