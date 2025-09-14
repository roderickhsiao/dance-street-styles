import { useTranslations } from 'next-intl';
import { DanceStyle, PersonEntity, VideoEntity, MusicGenreEntity } from '@/data/types';
import { PlayCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPersonById, getVideoById, getMusicGenreById } from '@/data/entities';

interface DanceStyleContentProps {
  danceStyle: DanceStyle;
  className?: string;
}

// Overview Section Component
export function OverviewSection({ danceStyle, className = "" }: DanceStyleContentProps) {
  const t = useTranslations(`styles.detailed.${danceStyle.slug}.overview`);
  
  try {
  const content = t.raw('content') as string[];
    
    if (!content || content.length === 0) return null;

    return (
      <div className={`space-y-2 md:space-y-3 ${className}`}>
        {content.map((paragraph, index) => (
          <p key={index} className="text-body-sm md:text-body-md text-content-secondary leading-relaxed">
            {paragraph}
          </p>
        ))}
  {/* Source shown at page-level; removed per-section duplication */}
      </div>
    );
  } catch {
    return null;
  }
}

// History Section Component  
export function HistorySection({ danceStyle, className = "" }: DanceStyleContentProps) {
  const t = useTranslations(`styles.detailed.${danceStyle.slug}.history`);
  
  try {
  const content = t.raw('content') as string[];
    
    if (!content || content.length === 0) return null;

    return (
      <div className={`space-y-2 md:space-y-3 ${className}`}>
        {content.map((paragraph, index) => (
          <p key={index} className="text-body-sm md:text-body-md text-content-secondary leading-relaxed">
            {paragraph}
          </p>
        ))}
  {/* Source shown at page-level; removed per-section duplication */}
      </div>
    );
  } catch {
    return null;
  }
}

// Pioneers Section - Uses structured data from config
export function PioneersSection({ danceStyle, className = "" }: DanceStyleContentProps) {
  // Always call the hook, but we may not use its result
  const t = useTranslations(`styles.detailed.${danceStyle.slug}.pioneers`);
  const tGlobal = useTranslations();

  // First try to get data from config (ids referencing normalized PersonEntity records)
  if (danceStyle.influentialArtistIds && danceStyle.influentialArtistIds.length > 0) {
    const artists: PersonEntity[] = danceStyle.influentialArtistIds
      .map(id => getPersonById(id))
      .filter(Boolean) as PersonEntity[];

    return (
      <div className={`space-y-2 md:space-y-3 ${className}`}>
        {artists.map((artist, index) => {
          const displayName = artist.nameKey ? tGlobal(artist.nameKey) : (artist.id || '');
          const displayRole = artist.roleKey ? tGlobal(artist.roleKey) : artist.roleKey;
          const displayBio = artist.bioKey ? tGlobal(artist.bioKey) : artist.bioKey;

          return (
            <div
              key={artist.id || index}
              className="bg-gradient-to-r from-surface-secondary/30 to-surface-secondary/10 rounded-xl p-2 md:p-3 border border-stroke-secondary/20 backdrop-blur-sm hover:from-surface-secondary/40 hover:to-surface-secondary/20 hover:border-accent-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-2 md:space-x-3 mb-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-accent-primary/30 to-accent-primary/10 rounded-xl flex items-center justify-center group-hover:from-accent-primary/40 group-hover:to-accent-primary/20 transition-all duration-300">
                  <span className="text-sm md:text-base font-bold text-accent-primary">
                    {displayName.split?.(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-body-sm md:text-body-md font-bold text-content-primary group-hover:text-accent-primary transition-colors mb-1">
                    {displayName}
                  </h4>
                  <p className="text-body-xs text-accent-primary font-medium mb-1 md:mb-2">
                    {displayRole}
                  </p>
                  <p className="text-body-xs md:text-body-sm text-content-secondary leading-relaxed">
                    {displayBio}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Fallback to translation-based pioneers
  try {
    const pioneers = t.raw('') as Array<{
      name: string;
      title: string;
      years?: string;
      initials?: string;
      type?: string;
      description: string;
    }>;

    if (!pioneers || pioneers.length === 0) return null;

    return (
      <div className={`space-y-2 md:space-y-3 ${className}`}>
        {pioneers.map((pioneer, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-surface-secondary/30 to-surface-secondary/10 rounded-xl p-2 md:p-3 border border-stroke-secondary/20 backdrop-blur-sm hover:from-surface-secondary/40 hover:to-surface-secondary/20 hover:border-accent-primary/30 transition-all duration-300 group"
          >
            <div className="flex items-start space-x-2 md:space-x-3 mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-accent-primary/30 to-accent-primary/10 rounded-xl flex items-center justify-center group-hover:from-accent-primary/40 group-hover:to-accent-primary/20 transition-all duration-300">
                {pioneer.initials ? (
                  <span className="text-sm md:text-base font-bold text-accent-primary">{pioneer.initials}</span>
                ) : (
                  <span className="text-sm md:text-base font-bold text-accent-primary">
                    {pioneer.type === 'crew' ? '👥' : '⭐'}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-body-sm md:text-body-md font-bold text-content-primary group-hover:text-accent-primary transition-colors mb-1">
                  {pioneer.name}
                </h4>
                <p className="text-body-xs text-accent-primary font-medium mb-1 md:mb-2">
                  {pioneer.title} {pioneer.years && `(${pioneer.years})`}
                </p>
                <p className="text-body-xs md:text-body-sm text-content-secondary leading-relaxed">
                  {pioneer.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } catch {
    return null;
  }
}

// Featured Video Section - Uses structured data from config
export function FeaturedVideoSection({ danceStyle, className = "" }: DanceStyleContentProps) {
  // Always call the hook, but we may not use its result
  const t = useTranslations(`styles.detailed.${danceStyle.slug}`);
  
  // First try to get video from config data (ids referencing normalized VideoEntity records)
  if (danceStyle.videoIds && danceStyle.videoIds.length > 0) {
  const vids = danceStyle.videoIds.map(id => getVideoById(id)).filter(Boolean) as VideoEntity[];
    const featuredVideo = vids.find(v => v.type === 'tutorial' || v.type === 'performance') || vids[0];

    if (featuredVideo) {
      return (
        <div className={`bg-gradient-to-br from-surface-secondary/30 to-surface-secondary/5 rounded-2xl overflow-hidden border border-stroke-secondary/20 backdrop-blur-sm hover:border-accent-primary/30 transition-all duration-500 group ${className}`}>
          <div className="aspect-video bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 relative group-hover:from-accent-primary/20 group-hover:to-accent-secondary/20 transition-all duration-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 cursor-pointer">
                <PlayCircle className="w-8 h-8 md:w-10 md:h-10 text-content-primary" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-body-md md:text-header-sm font-bold text-content-primary mb-2">
                {featuredVideo.titleKey || featuredVideo.id}
              </h3>
              <p className="text-body-xs md:text-body-sm text-content-secondary leading-relaxed mb-2">
                {featuredVideo.descriptionKey}
              </p>
              {(featuredVideo.artistId || featuredVideo.year) && (
                <p className="text-body-xs text-accent-primary font-medium">
                  {featuredVideo.artistId} {featuredVideo.year && `• ${featuredVideo.year}`}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  // Fallback to translation-based media
  try {
  const media = t.raw('media') as Array<{
      title: string;
      type: string;
      url: string;
      description: string;
    }>;

    const featuredVideo = media.find(item => item.type === 'video');
    
    if (!featuredVideo) return null;

    return (
      <div className={`bg-gradient-to-br from-surface-secondary/30 to-surface-secondary/5 rounded-2xl overflow-hidden border border-stroke-secondary/20 backdrop-blur-sm hover:border-accent-primary/30 transition-all duration-500 group ${className}`}>
        <div className="aspect-video bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 relative group-hover:from-accent-primary/20 group-hover:to-accent-secondary/20 transition-all duration-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 cursor-pointer">
              <PlayCircle className="w-8 h-8 md:w-10 md:h-10 text-content-primary" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <h3 className="text-body-md md:text-header-sm font-bold text-content-primary mb-2">
              {featuredVideo.title}
            </h3>
            <p className="text-body-xs md:text-body-sm text-content-secondary leading-relaxed">
              {featuredVideo.description}
            </p>
          </div>
        </div>
      </div>
    );
  } catch {
    return null;
  }
}

// Techniques Section - Uses structured data from config
export function TechniquesSection({ danceStyle, className = "" }: DanceStyleContentProps) {
  // Always call the hook, but we may not use its result
  const tParent = useTranslations(`styles.detailed.${danceStyle.slug}`);
  
  // First try to get techniques from config data
  if (danceStyle.keyMoves && danceStyle.keyMoves.length > 0) {
    return (
      <motion.div
        className={`bg-gradient-to-br from-surface-secondary/20 to-surface-secondary/5 rounded-2xl p-6 md:p-8 border border-stroke-secondary/20 backdrop-blur-sm hover:border-accent-secondary/30 transition-all duration-500 ${className}`}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-accent-secondary to-accent-tertiary rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-content-primary" />
          </div>
          <h3 className="text-header-sm md:text-header-md font-bold text-content-primary">
            Key Moves
          </h3>
        </div>
        
        <div className="grid gap-4 md:gap-6">
          {danceStyle.keyMoves.map((move, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-surface-secondary/40 to-surface-secondary/20 rounded-xl p-4 border border-stroke-secondary/10 hover:border-accent-secondary/30 transition-all duration-300"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent-secondary rounded-full flex-shrink-0"></div>
                <h4 className="text-body-sm md:text-body-md font-semibold text-content-primary">
                  {move}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Fallback to translation-based techniques
  try {
    const techniques = tParent.raw('techniques') as Array<{
      name: string;
      description: string;
    }>;

    if (!techniques || techniques.length === 0) return null;

    return (
      <motion.div
        className={`bg-gradient-to-br from-surface-secondary/20 to-surface-secondary/5 rounded-2xl p-6 md:p-8 border border-stroke-secondary/20 backdrop-blur-sm hover:border-accent-secondary/30 transition-all duration-500 ${className}`}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-accent-secondary to-accent-tertiary rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-content-primary" />
          </div>
          <h3 className="text-header-sm md:text-header-md font-bold text-content-primary">
            {tParent('techniques.title')}
          </h3>
        </div>
        
        <div className="grid gap-4 md:gap-6">
          {techniques.map((technique, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-surface-secondary/40 to-surface-secondary/20 rounded-xl p-4 border border-stroke-secondary/10 hover:border-accent-secondary/30 transition-all duration-300"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent-secondary rounded-full flex-shrink-0"></div>
                  <h4 className="text-body-sm md:text-body-md font-semibold text-content-primary">
                    {technique.name}
                  </h4>
                </div>
                <p className="text-body-xs md:text-body-sm text-content-secondary leading-relaxed ml-5">
                  {technique.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  } catch {
    return null;
  }
}// Culture Section Component
export function CultureSection({ danceStyle, className = "" }: DanceStyleContentProps) {
  const t = useTranslations(`styles.detailed.${danceStyle.slug}.culture`);
  
  try {
    const content = t.raw('content') as string[];
    
    
    if (!content || content.length === 0) return null;

    return (
      <div className={`space-y-2 md:space-y-3 ${className}`}>
        {content.map((paragraph, index) => (
          <p key={index} className="text-body-sm md:text-body-md text-content-secondary leading-relaxed">
            {paragraph}
          </p>
        ))}
  {/* Source shown at page-level; removed per-section duplication */}
      </div>
    );
  } catch {
    return null;
  }
}

// Music Section - Enhanced to use structured data when available
export function MusicSection({ danceStyle, className = "" }: DanceStyleContentProps) {
  const t = useTranslations(`styles.detailed.${danceStyle.slug}.music`);
  
  // Use structured data from config when available (ids referencing MusicGenreEntity records)
  const musicGenres = (danceStyle.musicGenreIds || []).map(id => getMusicGenreById(id)).filter(Boolean) as MusicGenreEntity[];
  
  try {
    const bpm = t('bpm');
    const timeSignature = t('timeSignature');
    const keyElements = t('keyElements');
    const description = t('description');
    const playlist = t('playlist');
    const artists = t.raw('artists') as Array<{
      name: string;
      type: string;
      contribution: string;
    }>;

    return (
      <div className={`space-y-2 md:space-y-3 ${className}`}>
        {/* Musical Characteristics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
          <div className="bg-gradient-to-br from-surface-secondary/30 to-surface-secondary/10 rounded-xl p-2 md:p-3 border border-stroke-secondary/20 backdrop-blur-sm text-center group hover:from-surface-secondary/40 hover:to-surface-secondary/20 transition-all duration-300">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-accent-primary/20 rounded-xl flex items-center justify-center mx-auto mb-1 md:mb-2 group-hover:bg-accent-primary/30 transition-all duration-300">
              <span className="text-sm md:text-base" role="img" aria-hidden="true">⚡</span>
            </div>
            <h3 className="text-body-xs md:text-body-sm font-bold text-content-primary mb-1">Typical BPM</h3>
            <p className="text-body-sm md:text-header-xs font-bold text-accent-primary">{bpm}</p>
            <p className="text-body-xs text-content-tertiary">Beats per minute</p>
          </div>
          
          <div className="bg-gradient-to-br from-surface-secondary/30 to-surface-secondary/10 rounded-xl p-2 md:p-3 border border-stroke-secondary/20 backdrop-blur-sm text-center group hover:from-surface-secondary/40 hover:to-surface-secondary/20 transition-all duration-300">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-accent-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-1 md:mb-2 group-hover:bg-accent-secondary/30 transition-all duration-300">
              <span className="text-sm md:text-base" role="img" aria-hidden="true">🎼</span>
            </div>
            <h3 className="text-body-xs md:text-body-sm font-bold text-content-primary mb-1">Time Signature</h3>
            <p className="text-body-sm md:text-header-xs font-bold text-accent-secondary">{timeSignature}</p>
            <p className="text-body-xs text-content-tertiary">Common time</p>
          </div>
          
          <div className="bg-gradient-to-br from-surface-secondary/30 to-surface-secondary/10 rounded-xl p-2 md:p-3 border border-stroke-secondary/20 backdrop-blur-sm text-center group hover:from-surface-secondary/40 hover:to-surface-secondary/20 transition-all duration-300">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-accent-tertiary/20 rounded-xl flex items-center justify-center mx-auto mb-1 md:mb-2 group-hover:bg-accent-tertiary/30 transition-all duration-300">
              <span className="text-sm md:text-base" role="img" aria-hidden="true">🎧</span>
            </div>
            <h3 className="text-body-xs md:text-body-sm font-bold text-content-primary mb-1">Music Genres</h3>
            <p className="text-body-sm md:text-header-xs font-bold text-accent-tertiary">
              {musicGenres.length > 0 ? musicGenres.map(g => g.nameKey || g.id).join(', ') : keyElements}
            </p>
            <p className="text-body-xs text-content-tertiary">& rhythm</p>
          </div>
        </div>

        {/* Musical Description */}
        <div className="bg-gradient-to-r from-surface-secondary/20 to-surface-secondary/10 rounded-xl p-2 md:p-3 border border-stroke-secondary/20 backdrop-blur-sm">
          <h3 className="text-body-sm md:text-body-md font-bold text-content-primary mb-2 flex items-center">
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-lg bg-accent-primary/20 flex items-center justify-center mr-2">
              <span className="text-xs" role="img" aria-hidden="true">🎶</span>
            </div>
            Musical Foundation
          </h3>
          <p className="text-body-sm text-content-secondary leading-relaxed">
            {description}
          </p>
        </div>

        {/* Artists */}
        {artists && artists.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-body-sm md:text-body-md font-bold text-content-primary flex items-center">
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-lg bg-accent-secondary/20 flex items-center justify-center mr-2">
                <span className="text-xs" role="img" aria-hidden="true">⭐</span>
              </div>
              Influential Artists & Producers
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {artists.map((artist, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-surface-secondary/30 to-surface-secondary/10 rounded-xl p-2 md:p-3 border border-stroke-secondary/20 backdrop-blur-sm hover:from-surface-secondary/40 hover:to-surface-secondary/20 hover:border-accent-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-2 mb-1 md:mb-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-accent-primary/30 to-accent-primary/10 rounded-xl flex items-center justify-center group-hover:from-accent-primary/40 group-hover:to-accent-primary/20 transition-all duration-300">
                      <span className="text-xs md:text-sm font-bold text-accent-primary">🎤</span>
                    </div>
                    <div>
                      <h4 className="text-body-xs md:text-body-sm font-bold text-content-primary group-hover:text-accent-primary transition-colors">
                        {artist.name}
                      </h4>
                      <p className="text-body-xs text-content-tertiary">{artist.type}</p>
                    </div>
                  </div>
                  <p className="text-body-xs md:text-body-sm text-content-secondary leading-relaxed">
                    {artist.contribution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Playlist */}
        {playlist && (
          <div className="bg-gradient-to-r from-surface-secondary/15 to-surface-secondary/5 rounded-xl p-2 md:p-3 border border-stroke-secondary/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-body-sm md:text-body-md font-bold text-content-primary flex items-center">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-lg bg-accent-tertiary/20 flex items-center justify-center mr-2">
                  <span className="text-xs" role="img" aria-hidden="true">🎧</span>
                </div>
                Essential Listening
              </h3>
              <button className="text-body-xs text-accent-primary hover:text-accent-secondary transition-colors font-medium bg-accent-primary/10 hover:bg-accent-primary/20 px-2 py-1 rounded-lg">
                <span className="mr-1" role="img" aria-hidden="true">📱</span>
                View Playlist
              </button>
            </div>
            <p className="text-body-xs md:text-body-sm text-content-tertiary">
              {playlist}
            </p>
          </div>
        )}
      </div>
    );
  } catch {
    return null;
  }
}

// Generic Content Section (for backwards compatibility)
export function ContentSection({ danceStyle, sectionKey, className = "" }: DanceStyleContentProps & { sectionKey: string }) {
  const t = useTranslations(`styles.detailed.${danceStyle.slug}.${sectionKey}`);
  
  try {
    const content = t.raw('content') as string[];
    if (!content || content.length === 0) return null;
        
    return (
      <div className={`space-y-2 md:space-y-3 ${className}`}>
        {content.map((paragraph, index) => (
          <p key={index} className="text-body-sm md:text-body-md text-content-secondary leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    );
  } catch {
    return null; // Hide section if no content
  }
}
