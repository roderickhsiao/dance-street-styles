"use client";
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function MainNavigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  const navLinks = [
    { 
      href: '/origins', 
      label: t('links.origins')
    },
    { 
      href: '/styles', 
      label: t('links.styles')
    },
  ];

  return (
    <nav className="fixed top-0 start-0 end-0 z-50 bg-surface-primary/95 backdrop-blur-sm border-b border-stroke-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-header-xs sm:text-header-sm font-black text-content-primary group-hover:text-accent-primary transition-colors magazine-headline">
              {t('logo.main')}
              <span className="text-accent-primary ms-1">.</span>
            </div>
            <div className="hidden sm:block text-body-sm font-bold text-content-tertiary uppercase tracking-wider magazine-sans">
              {t('logo.accent')}
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    'font-medium transition-colors magazine-sans uppercase tracking-wider text-body-sm px-3 py-1 rounded-lg ' +
                    (isActive
                      ? 'text-accent-primary font-bold bg-accent-primary/10'
                      : 'text-content-secondary hover:text-accent-primary')
                  }
                >
                  {link.label}
                </Link>
              );
            })}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu - simplified */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button className="text-content-secondary hover:text-accent-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
