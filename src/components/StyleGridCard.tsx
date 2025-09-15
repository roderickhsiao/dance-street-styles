'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface StyleGridCardProps {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  origins: {
    yearKey?: string;
    locationKey?: string;
    cultureKey?: string;
  };
  theme: {
    primary: string;
    secondary: string;
  };
  index: number;
}

const getStyleEmoji = (id: string): string => {
  const emojiMap: Record<string, string> = {
    breaking: '🌀', // Spinning motion for breaking/b-boying
    hipHop: '🎤', // Microphone for hip-hop culture
    popping: '🤖', // Robot for popping/animation
    locking: '🔒', // Lock for locking/campbellock
    house: '🏠', // House for house dance
    voguing: '💅', // Nail polish for voguing/ballroom
    waacking: '🪩', // Disco ball for waacking
    krumping: '🔥', // Fire for krumping's intensity
    hustle: '✨', // Sparkles for disco hustle
    punking: '🎭', // Theater mask for punking's theatricality
    turfing: '🌉', // Bridge for Oakland/Bay Area turfing
    litefeet: '⚡', // Lightning for litefeet's quick movements
  };
  return emojiMap[id] || '🎪';
};

export const StyleGridCard = ({
  id,
  name,
  slug,
  shortDescription,
  origins,
  theme,
  index,
}: StyleGridCardProps) => {
  const tGlobal = useTranslations();

  // Get location from translations if locationKey is provided, otherwise use static location
  const location = origins.locationKey
    ? tGlobal(origins.locationKey)
    : origins.locationKey;

  return (
    <div
      key={id}
      className="group relative overflow-hidden transition-all duration-500 scroll-fade-in"
      style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
    >
      <Link href={`/styles/${slug}`}>
        <div className="cursor-pointer h-full">
          {/* Dark card with subtle radial gradient */}
          <div className="relative h-full bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden group-hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10">
            {/* Subtle radial gradient overlay */}
            <div 
              className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 20% 20%, ${theme.primary}40 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${theme.secondary}30 0%, transparent 50%)`
              }}
            />
            
            {/* Blurred background emoji for color effect */}
            <div className="absolute top-0 start-0 text-6xl blur-3xl pointer-events-none select-none opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              {getStyleEmoji(id)}
            </div>
            
            {/* Header section with emoji and style name */}
            <div className="relative p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {getStyleEmoji(id)}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-orange-400/70">
                  {location}
                </div>
              </div>
              
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-orange-400 transition-colors duration-300 magazine-headline">
                {name}
              </h3>
            </div>

            {/* Content section */}
            <div className="relative px-6 pb-6">
              <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 magazine-body">
                {shortDescription}
              </p>
              
              {/* Bottom action with subtle accent line */}
              <div className="flex items-center text-orange-400 text-sm font-bold uppercase tracking-wider group-hover:text-orange-300 transition-colors duration-300 magazine-sans">
                <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent mr-3 group-hover:w-12 transition-all duration-300"></div>
                {tGlobal('styles.cardAction')}
              </div>
            </div>

            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 via-transparent to-pink-500/10"></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
