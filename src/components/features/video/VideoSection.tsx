'use client';

import { motion } from '@/lib/motion';
import { useTranslations } from 'next-intl';
import { getYouTubeVideoId } from '@/lib/youtube';

interface VideoItem {
  title: string;
  description: string;
  url: string;
}

interface VideoSectionProps {
  videos: VideoItem[];
  className?: string;
}

export const VideoSection = ({ videos, className = '' }: VideoSectionProps) => {
  const t = useTranslations('streetCulture.elements.videos');

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

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => {
            const videoId = getYouTubeVideoId(video.url);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-surface-secondary/50 backdrop-blur-sm rounded-2xl border border-stroke-primary overflow-hidden hover:border-accent-primary/50 transition-all duration-300"
              >
                <div className="aspect-video bg-surface-primary">
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full h-full bg-accent-primary/10 hover:bg-accent-primary/20 transition-colors text-accent-primary font-bold text-lg magazine-sans"
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2">▶</div>
                        <div>Watch Video</div>
                      </div>
                    </a>
                  )}
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-header-sm font-black mb-2 text-content-primary magazine-headline">
                    {video.title}
                  </h3>
                  <p className="text-content-secondary text-body-sm magazine-body leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
