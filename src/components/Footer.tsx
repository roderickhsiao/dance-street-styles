"use client";

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { text: t('sections.explore.links.0'), href: '/styles' },
    { text: t('sections.explore.links.1'), href: '/origins' },
  ];

  const connectLinks = [
    { text: t('sections.connect.links.0'), href: '/about' },
    { text: t('sections.connect.links.1'), href: '/submit' },
    { text: t('sections.connect.links.2'), href: '/contact' },
  ];

  return (
    <footer className="py-12 sm:py-16 bg-surface-primary border-t border-stroke-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-header-xs sm:text-header-sm font-black text-content-primary mb-4 magazine-headline">
              {t('title')}<span className="text-accent-primary">.</span>
            </h3>
            <p className="text-content-tertiary leading-relaxed mb-6 magazine-body text-body-sm sm:text-body-md">
              {t('description')}
            </p>
            <div className="text-accent-primary font-bold text-body-sm uppercase tracking-wider magazine-sans">
              {t('keepCultureAlive')}
            </div>
          </div>
          
          <div>
            <h4 className="font-black mb-4 sm:mb-6 text-content-primary uppercase tracking-wider magazine-sans text-body-sm sm:text-body-md">
              {t('sections.explore.title')}
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-content-tertiary text-body-sm sm:text-body-md">
              {exploreLinks.map((link, index) => (
                <li key={index} className="hover:translate-x-1 transition-transform">
                  <Link href={link.href} className="hover:text-accent-primary transition-colors font-medium magazine-body">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-black mb-4 sm:mb-6 text-content-primary uppercase tracking-wider magazine-sans text-body-sm sm:text-body-md">
              {t('sections.connect.title')}
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-content-tertiary text-body-sm sm:text-body-md">
              {connectLinks.map((link, index) => (
                <li key={index} className="hover:translate-x-1 transition-transform">
                  <Link href={link.href} className="hover:text-accent-primary transition-colors font-medium magazine-body">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stroke-primary pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-content-tertiary text-body-xs sm:text-body-sm magazine-body text-center sm:text-start">
              {t('copyright', { year: currentYear })}
            </p>
            <div className="text-content-tertiary text-body-xs sm:text-body-sm flex items-center magazine-sans">
              <span className="me-2">{t('established.prefix')}</span>
              <span className="font-bold text-accent-primary">{t('established.year')}</span>
              <span className="ms-2">• {t('established.suffix')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
