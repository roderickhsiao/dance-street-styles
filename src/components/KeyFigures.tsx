'use client';

import { useTranslations } from 'next-intl';
import { getPersonById, getCrewById } from '../data/entities';
import Image from 'next/image';

interface KeyFiguresProps {
  keyFigureIds: string[];
  className?: string;
}

export const KeyFigures = ({ keyFigureIds, className = "" }: KeyFiguresProps) => {
  const tPeople = useTranslations('people');
  const tCrews = useTranslations('crews');

  if (!keyFigureIds || keyFigureIds.length === 0) {
    return (
      <p className="text-content-tertiary text-body-md">
        No key figures listed for this style yet.
      </p>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* 2-column grid for desktop, single column for mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {keyFigureIds.map((figureId) => {
          const figure = getPersonById(figureId);
          if (!figure) return null;
          
          // Convert kebab-case to camelCase for translation key
          const personKey = figureId.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          
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
                    alt={tPeople(`${personKey}.name`)}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-gray-300 font-medium text-sm">${tPeople(`${personKey}.name`).split(' ')[0].charAt(0)}${tPeople(`${personKey}.name`).split(' ').length > 1 ? tPeople(`${personKey}.name`).split(' ')[1].charAt(0) : ''}</span>`;
                      }
                    }}
                  />
                ) : (
                  <>
                    {tPeople(`${personKey}.name`).split(' ')[0].charAt(0)}
                    {tPeople(`${personKey}.name`).split(' ').length > 1 ? 
                      tPeople(`${personKey}.name`).split(' ')[1].charAt(0) : ''}
                  </>
                )}
              </div>
              
              {/* Info - structured with consistent spacing */}
              <div className="flex-1 min-w-0 space-y-1">
                {/* Primary info block - always aligned with avatar */}
                <div>
                  <h4 className="text-body-md font-semibold text-content-primary leading-tight">
                    {tPeople(`${personKey}.name`)}
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
        })}
      </div>
    </div>
  );
};