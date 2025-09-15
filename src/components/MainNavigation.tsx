"use client";
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';

export function MainNavigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <nav className="fixed top-0 start-0 end-0 z-50 bg-surface-primary/95 backdrop-blur-sm border-b border-stroke-primary w-[100vw]">
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
            <motion.button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-content-secondary hover:text-accent-primary transition-colors"
              aria-label="Toggle mobile menu"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <motion.path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden border-t border-stroke-primary bg-surface-primary/98 backdrop-blur-sm overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.04, 0.62, 0.23, 0.98] 
              }}
            >
              <motion.div 
                className="px-4 py-4 space-y-3"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.2 + index * 0.1,
                        ease: [0.04, 0.62, 0.23, 0.98]
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={
                          'block font-medium transition-colors magazine-sans uppercase tracking-wider text-body-md px-3 py-2 rounded-lg ' +
                          (isActive
                            ? 'text-accent-primary font-bold bg-accent-primary/10'
                            : 'text-content-secondary hover:text-accent-primary')
                        }
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
