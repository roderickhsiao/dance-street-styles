'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LandmarkEntity } from '@/data/entities/landmarks';
import Image from 'next/image';

interface LandmarkCardProps {
  landmark: LandmarkEntity;
  index?: number;
}

export function LandmarkCard({ landmark, index = 0 }: LandmarkCardProps) {
  const t = useTranslations('landmarks');
  const tCommon = useTranslations('common');

  const isActive = landmark.isActive;
  const hasAddress = Boolean(landmark.address);

  // Emoji mapping for landmark types
  const getTypeEmoji = (type: string): string => {
    switch (type) {
      case 'club': return '🕺';
      case 'venue': return '🎭';
      case 'studio': return '🎵';
      case 'neighborhood': return '🏘️';
      case 'building': return '🏢';
      case 'park': return '🌳';
      case 'street': return '🛣️';
      case 'ballroom': return '💃';
      case 'warehouse': return '🏭';
      case 'cultural_center': return '🏛️';
      default: return '📍';
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group hover:bg-surface-elevated/20 rounded-lg transition-colors duration-200 w-full overflow-hidden"
    >
      <div className="flex gap-4 w-full min-w-0 overflow-hidden">
        {/* Image */}
        <div className="size-20 md:size-24 rounded-lg overflow-hidden bg-surface-elevated shrink-0 relative group">
            {landmark.imageUrl ? (
              <Image
                src={landmark.imageUrl}
                alt={t(`${landmark.id}.name`)}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to emoji with blurred background effect
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('bg-accent-primary/10', 'flex', 'items-center', 'justify-center');
                    parent.innerHTML = `
                      <div class="absolute inset-0 text-4xl blur-xl pointer-events-none select-none opacity-20">
                        ${getTypeEmoji(landmark.type)}
                      </div>
                      <span class="relative text-2xl z-10">${getTypeEmoji(landmark.type)}</span>
                    `;
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-accent-primary/10 flex items-center justify-center relative">
                {/* Blurred background emoji for color effect */}
                <div className="absolute inset-0 text-4xl blur-xl pointer-events-none select-none opacity-20 flex items-center justify-center">
                  {getTypeEmoji(landmark.type)}
                </div>
                {/* Main emoji */}
                <span className="relative text-2xl z-10">
                  {getTypeEmoji(landmark.type)}
                </span>
              </div>
            )}
          </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1.5 overflow-hidden">
          {/* Title with subtle status indicator */}
          <div className="flex items-center gap-2 mb-1.5">
            <h4 className="text-body-sm md:text-body-md font-semibold text-content-primary leading-tight break-words flex-1 min-w-0">
              {t(`${landmark.id}.name`)}
            </h4>
            <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-green-400' : 'bg-orange-400/60'}`}></span>
          </div>

          {/* Full address and date info */}
          <div className="space-y-1 text-xs text-content-secondary">
            {hasAddress && (
              <div className="min-w-0 overflow-hidden">
                {landmark.mapUrl ? (
                  <a
                    href={landmark.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-primary hover:text-accent-secondary transition-colors break-words"
                  >
                    📍 {landmark.address}, {landmark.city}
                    {landmark.state && `, ${landmark.state}`}
                  </a>
                ) : (
                  <span className="text-content-secondary break-words">
                    📍 {landmark.address}, {landmark.city}
                    {landmark.state && `, ${landmark.state}`}
                  </span>
                )}
              </div>
            )}
            
            {(landmark.yearEstablished || landmark.yearClosed) && (
              <div className="text-content-tertiary">
                📅 {landmark.yearEstablished}
                {landmark.yearClosed && ` - ${landmark.yearClosed}`}
                {landmark.yearEstablished && !landmark.yearClosed && isActive && ' - Present'}
              </div>
            )}
          </div>

          {/* Significance - Full content */}
          <p className="text-xs md:text-body-sm text-content-secondary leading-relaxed break-words w-full min-w-0">
            {t(`${landmark.id}.significance`)}
          </p>

          {/* Actions - More compact */}
          {landmark.wikipediaUrl && (
            <div className="pt-1">
              <a
                href={landmark.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 bg-surface-elevated hover:bg-surface-elevated/80 text-content-secondary hover:text-content-primary rounded text-xs font-medium transition-colors border border-stroke-secondary"
              >
                <span className="shrink-0">📖</span>
                <span>{tCommon('actions.learnMore')}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
}