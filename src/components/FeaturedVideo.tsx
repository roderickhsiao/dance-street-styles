import { PlayCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { VideoEntity } from '@/data/types';

interface FeaturedVideoProps {
  video?: VideoEntity;
  className?: string;
}

export function FeaturedVideo({ video, className = "" }: FeaturedVideoProps) {
  const t = useTranslations();

  if (!video) {
    // Default video if no data
    return (
      <div className={className}>
        <div className="aspect-video bg-surface-elevated border border-stroke-secondary rounded-xl flex items-center justify-center group cursor-pointer hover:border-accent-primary/50 transition-colors">
          <div className="text-center">
            <PlayCircle className="h-10 w-10 md:h-12 md:w-12 text-accent-primary mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-body-sm md:text-body-md font-bold text-content-primary mb-1 md:mb-2">
              Feature Video Coming Soon
            </h3>
            <p className="text-body-xs md:text-body-sm text-content-tertiary">
              Showcase video demonstrating key moves
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleVideoClick = () => {
    if (video.url) {
      window.open(video.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={className}>
      <div
        className="aspect-video bg-surface-elevated border border-stroke-secondary rounded-xl flex items-center justify-center group cursor-pointer hover:border-accent-primary/50 transition-colors"
        onClick={handleVideoClick}
      >
        <div className="text-center">
          <PlayCircle className="h-10 w-10 md:h-12 md:w-12 text-accent-primary mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-body-sm md:text-body-md font-bold text-content-primary mb-1 md:mb-2">
            {video.titleKey ? t(video.titleKey) : 'Featured Video'}
          </h3>
          <p className="text-body-xs md:text-body-sm text-content-tertiary">
            {video.descriptionKey ? t(video.descriptionKey) : 'Showcase video demonstrating key moves'}
          </p>
        </div>
      </div>
    </div>
  );
}
