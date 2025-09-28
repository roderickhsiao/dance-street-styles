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
        className="relative flex gap-4 py-3 hover:bg-surface-elevated/20 rounded-lg transition-colors duration-200 group"
      >
        {/* Social Media Icons - Upper Right Corner */}
        <div className="absolute top-3 end-3 flex items-center gap-1.5">
          {figure.socialLinks?.instagram && (
            <a
              href={`https://instagram.com/${figure.socialLinks.instagram.replace('@', '').replace('https://www.instagram.com/', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200"
              title={`@${figure.socialLinks.instagram}`}
            >
              <svg className="w-4 h-4 text-gray-400 hover:text-pink-500 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          )}
          {figure.socialLinks?.youtube && (
            <a
              href={figure.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200"
              title="YouTube"
            >
              <svg className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          )}
          {figure.socialLinks?.website && (
            <a
              href={figure.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200"
              title="Website"
            >
              <svg className="w-4 h-4 text-gray-400 hover:text-blue-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </a>
          )}
        </div>

        {/* Avatar */}
        <div className="shrink-0">
          <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-medium text-sm group-hover:bg-gray-600 transition-colors duration-200 overflow-hidden">
            {figure.imageUrl ? (
              <Image 
                src={figure.imageUrl} 
                alt={fullName}
                width={60}
                height={60}
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
        </div>
        
        {/* Info - structured with consistent spacing */}
        <div className="flex-1 min-w-0 space-y-1 pe-12">
          {/* Primary info block - always aligned with avatar */}
          <div>
            <h4 className="text-body-md font-semibold text-content-primary leading-tight">
              {fullName}
            </h4>
            <p className="text-body-sm text-content-secondary leading-tight">
              {tPeople(`${personKey}.role`)}
            </p>
          </div>
          
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:ps-9">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:ps-9">
            {dancers.map(renderFigureCard)}
          </div>
          </div>
        )}
      </div>
    </div>
  );
};