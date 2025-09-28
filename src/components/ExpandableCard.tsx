'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { useTranslations } from 'next-intl';
import { getYouTubeVideoId } from '@/lib/youtube';

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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
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
        <div
          className={`text-content-tertiary transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ▼
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="origin-top"
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
