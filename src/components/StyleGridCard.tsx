'use client';

import { Link } from '../i18n/navigation';
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

const getEmojiByIndex = (index: number): string => {
  const emojis = ['🕺', '💃', '🎭', '🎪', '🔥', '⚡', '🌟', '🎵'];
  return emojis[index] || '🎪';
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
  const t = useTranslations();

  // Get location from translations if locationKey is provided, otherwise use static location
  const location = origins.locationKey
    ? t(origins.locationKey)
    : origins.locationKey;

  return (
    <div
      key={id}
      className="group relative bg-gray-800 border border-gray-700 overflow-hidden hover:border-orange-500 transition-all duration-300 scroll-fade-in"
      style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
    >
      <Link href={`/styles/${slug}`}>
        <div className="cursor-pointer">
          {/* Style Header Image */}
          <div
            className="relative aspect-[4/3] flex items-center justify-center text-white font-black text-xl overflow-hidden group-hover:scale-105 transition-transform duration-300"
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 text-center">
              <div className="text-3xl sm:text-4xl mb-2 opacity-80 group-hover:scale-110 transition-transform duration-300">
                {getEmojiByIndex(index)}
              </div>
              <div className="font-black text-base sm:text-lg uppercase tracking-wider">
                {name}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              {location}
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mb-3 group-hover:text-orange-400 transition-colors magazine-headline">
              {name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 magazine-body">
              {shortDescription}
            </p>
            <div className="text-orange-400 text-xs sm:text-sm font-bold uppercase tracking-wider group-hover:text-orange-300 magazine-sans">
              {t('styles.cardAction')}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
