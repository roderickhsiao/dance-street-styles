import { PlayCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FeaturedVideoProps {
  styleId: string;
  className?: string;
}

export function FeaturedVideo({ styleId, className = "" }: FeaturedVideoProps) {
  const t = useTranslations(`styles.detailed.${styleId}.media`);
  
  try {
    const media = t.raw('') as Array<{
      title: string;
      type: string;
      url: string;
      description: string;
    }>;

    const featuredVideo = media.find(item => item.type === 'video');
    
    if (!featuredVideo) return null;

    const handleVideoClick = () => {
      if (featuredVideo.url) {
        window.open(featuredVideo.url, '_blank', 'noopener,noreferrer');
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
              {featuredVideo.title}
            </h3>
            <p className="text-body-xs md:text-body-sm text-content-tertiary">
              {featuredVideo.description}
            </p>
          </div>
        </div>
      </div>
    );
  } catch {
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
}
