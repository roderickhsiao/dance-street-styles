"use client";

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Footer = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { text: t('sections.explore.links.styles'), href: '/styles' },
    { text: t('sections.explore.links.origins'), href: '/origins' },
    { text: t('sections.explore.links.trivia'), href: '/trivia' },
  ];

  const connectLinks = [
    { text: t('sections.connect.links.about'), href: '/about' },
    { text: t('sections.connect.links.contact'), href: '/contact' },
  ];

  return (
    <footer className="relative py-12 sm:py-16 bg-surface-primary border-t border-stroke-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-header-xs sm:text-header-sm font-black text-content-primary mb-4 magazine-headline">
              {t('title')}<span className="text-accent-primary">.</span>
            </h3>
            <p className="text-content-secondary leading-relaxed mb-6 magazine-body text-body-sm sm:text-body-md">
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
            <ul className="space-y-2 sm:space-y-3 text-content-secondary text-body-sm sm:text-body-md">
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
            <ul className="space-y-2 sm:space-y-3 text-content-secondary text-body-sm sm:text-body-md">
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
        
        <div className="border-t border-stroke-secondary pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 gap-4 sm:gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <p className="text-content-tertiary text-body-xs sm:text-body-sm magazine-body text-start">
                {t('copyright', { year: currentYear })}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
              {/* Theme Toggle appears before the established text */}
              <ThemeToggle />
              <div className="text-content-tertiary text-body-xs sm:text-body-sm flex items-center magazine-sans">
                <span className="me-2">{t('established.prefix')}</span>
                <span className="font-bold text-accent-primary">{t('established.year')}</span>
                <span className="ms-2">• {t('established.suffix')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
