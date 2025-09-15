'use client';

import { motion } from '@/lib/motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface DanceStyleGridCardProps {
  name: string;
  description: string;
  era: string;
  location: string;
  tags: string[];
  slug: string;
  index: number;
}

const getStyleEmoji = (slug: string): string => {
  const emojiMap: Record<string, string> = {
    breaking: '🌀', // Spinning motion for breaking/b-boying
    'hip-hop': '🎤', // Microphone for hip-hop culture
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
  return emojiMap[slug] || '🎪';
};

export function DanceStyleGridCard({
  name,
  description,
  era,
  location,
  tags,
  slug,
  index,
}: DanceStyleGridCardProps) {
  const t = useTranslations();
  // The page passes raw era/location for compatibility; prefer translation keys
  // If the caller instead passes translation keys, they should already be translated
  const tTags = useTranslations('danceTags');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.05 
      }}
      viewport={{ once: true }}
      className="relative h-full"
    >
      <Link href={`/styles/${slug}`}>
        <div className="group relative h-full flex flex-col overflow-hidden transition-all duration-500">
          
          {/* Dark card with subtle radial gradient */}
          <div className="relative h-full bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden group-hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col">
            {/* Subtle radial gradient overlay */}
            <div 
              className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`
              }}
            />
            
            {/* Blurred background emoji for color effect */}
            <div className="absolute top-0 start-0 text-7xl blur-3xl pointer-events-none select-none opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              {getStyleEmoji(slug)}
            </div>
            
            {/* Header section with emoji and style name */}
            <div className="relative p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {getStyleEmoji(slug)}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-orange-400/70">
                  📍 {location}
                </div>
              </div>
              
              <h3 className="text-xl font-black text-white mb-4 group-hover:text-orange-400 transition-colors duration-300 magazine-headline">
                {name}
              </h3>

              {/* Style Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-300 border border-gray-600/30"
                  >
                    {tTags(`${tag}.name`)}
                  </span>
                ))}
              </div>
            </div>

            {/* Content section */}
            <div className="relative px-6 pb-6 flex-grow flex flex-col">
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3 magazine-body">
                {description}
              </p>
              
              {/* Era badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-xs font-medium">
                  📅 {era}
                </span>
              </div>
              
              {/* Bottom action with subtle accent line */}
              <div className="flex items-center text-orange-400 text-sm font-bold uppercase tracking-wider group-hover:text-orange-300 transition-colors duration-300 magazine-sans mt-auto">
                <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent mr-3 group-hover:w-12 transition-all duration-300"></div>
                {t('stylesPage.styleCard.exploreStyle')}
              </div>
            </div>

            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 via-transparent to-pink-500/10"></div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
