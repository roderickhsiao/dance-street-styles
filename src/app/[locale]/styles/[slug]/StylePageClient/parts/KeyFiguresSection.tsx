'use client';

import { useTranslations } from 'next-intl';
import { getPersonById, getCrewById } from '../../../../../../data/entities';
import Image from 'next/image';
import { PersonEntity } from '../../../../../../data/types';

interface KeyFiguresSectionProps {
  keyFigureIds: string[];
  className?: string;
}

export const KeyFiguresSection = ({ keyFigureIds, className = "" }: KeyFiguresSectionProps) => {
  const tPeople = useTranslations('people');
  const tCrews = useTranslations('crews');
  const t = useTranslations('keyFigures');

  if (!keyFigureIds || keyFigureIds.length === 0) {
    return (
      <p className="text-content-tertiary text-body-md">
        No key figures listed for this style yet.
      </p>
    );
  }

  // Helper function to get clean name for abbreviations (remove quotes and special chars)
  const getCleanName = (fullName: string): string => {
    return fullName.replace(/['"]/g, '').trim();
  };

  // Helper function to get initials from clean name
  const getInitials = (name: string): string => {
    const cleanName = getCleanName(name);
    const words = cleanName.split(' ').filter(word => word.length > 0);
    if (words.length === 0) return '';
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
  };

  // Separate figures by category using the new category attribute
  const figures = keyFigureIds.map(id => getPersonById(id)).filter(Boolean);
  const musicPioneers = figures.filter(figure => figure!.category === 'musician');
  const dancers = figures.filter(figure => figure!.category === 'dancer' || !figure!.category); // fallback for entries without category

  const renderFigureCard = (figure: PersonEntity | undefined) => {
    if (!figure) return null;
    const personKey = figure.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const fullName = tPeople(`${personKey}.name`);
    const initials = getInitials(fullName);

    return (
      <div
        key={figure.id}
        className="flex gap-4 py-3 hover:bg-surface-elevated/20 rounded-lg transition-colors duration-200 group"
      >
        {/* Avatar - with image support */}
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-medium text-sm shrink-0 group-hover:bg-gray-600 transition-colors duration-200 overflow-hidden">
          {figure.imageUrl ? (
            <Image 
              src={figure.imageUrl} 
              alt={fullName}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-gray-300 font-medium text-sm">${initials}</span>`;
                }
              }}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        
        {/* Info - structured with consistent spacing */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* Primary info block - always aligned with avatar */}
          <div>
            <h4 className="text-body-md font-semibold text-content-primary leading-tight">
              {fullName}
            </h4>
            <p className="text-body-sm text-content-secondary leading-tight">
              {tPeople(`${personKey}.role`)}
            </p>
          </div>
          
          {/* Social Media Links */}
          {figure.socialLinks && (
            <div className="flex items-center gap-2">
              {figure.socialLinks.instagram && (
                <a
                  href={`https://instagram.com/${figure.socialLinks.instagram.replace('@', '').replace('https://www.instagram.com/', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-gray-600 text-gray-300 text-body-xs font-medium hover:border-pink-400 hover:text-pink-400 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>{figure.socialLinks.instagram}</span>
                </a>
              )}
              {figure.socialLinks.youtube && (
                <a
                  href={figure.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-600 text-white text-body-xs font-medium hover:bg-red-700 transition-colors"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>YT</span>
                </a>
              )}
              {figure.socialLinks.website && (
                <a
                  href={figure.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-600 text-white text-body-xs font-medium hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169-.331-.135-.705.09-1.004a10.408 10.408 0 0 0-3.589-3.589c-.298.225-.673.259-1.004.09-.4-.206-.683-.57-.781-.994A10.351 10.351 0 0 0 12 2.542c-.095 0-.189.003-.284.007-.098.424-.381.788-.781.994-.331.169-.705.135-1.004-.09a10.408 10.408 0 0 0-3.589 3.589c.225.298.259.673.09 1.004-.206.4-.57.683-.994.781-.004.095-.007.189-.007.284 0 .095.003.189.007.284.424.098.788.381.994.781.169.331.135.705-.09 1.004a10.408 10.408 0 0 0 3.589 3.589c.298-.225.673-.259 1.004-.09.4.206.683.57.781.994.095.004.189.007.284.007s.189-.003.284-.007c.098-.424.381-.788.781-.994.331-.169.705-.135 1.004.09a10.408 10.408 0 0 0 3.589-3.589c-.225-.298-.259-.673-.09-1.004.206-.4.57-.683.994-.781.004-.095.007-.189.007-.284 0-.095-.003-.189-.007-.284-.424-.098-.788-.381-.994-.781z"/>
                  </svg>
                  <span>Web</span>
                </a>
              )}
            </div>
          )}
          
          {/* Secondary info - crew badges if available */}
          {figure.crewIds && figure.crewIds.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {figure.crewIds.map((crewId) => {
                const crew = getCrewById(crewId);
                if (!crew) return null;
                const crewKey = crewId.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                return (
                  <span 
                    key={crewId} 
                    className="inline-flex items-center px-2 py-0.5 rounded-md bg-surface-elevated/40 border border-stroke-secondary text-body-xs text-content-tertiary font-medium"
                  >
                    {tCrews(`${crewKey}.name`)}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-surface-secondary rounded-2xl p-6 md:p-8 ${className}`}>
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-header-lg font-black text-content-primary mb-3">{t('title')}</h2>
        <p className="text-body-md text-content-secondary leading-relaxed">
          {t('description')}
        </p>
      </div>

      <div className="space-y-6">
        {/* Music Artists Section */}
        {musicPioneers.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <h3 className="text-header-sm font-bold text-content-primary">{t('musicArtists')}</h3>
            </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pl-9">
            {musicPioneers.map(renderFigureCard)}
          </div>
        </div>
      )}

      {/* Dancers Section */}
      {dancers.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
              </svg>
            </div>
            <h3 className="text-header-sm font-bold text-content-primary">{t('dancers')}</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pl-9">
            {dancers.map(renderFigureCard)}
          </div>
          </div>
        )}
      </div>
    </div>
  );
};