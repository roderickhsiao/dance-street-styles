'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useIntlDisplayNames } from '@/i18n/hooks';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { getCountryFlag, getLocaleDisplayName, getLocaleShortName } from '../i18n/locale-flags';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { getAvailableLocales } = useIntlDisplayNames();

  // Get locales with proper display names
  const availableLocales = getAvailableLocales();

  const switchLocale = (newLocale: string) => {
    // Use next-intl's router for proper locale handling
    router.push(pathname, { locale: newLocale });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-content-secondary hover:text-content-primary"
        >
          <span className="text-lg">{getCountryFlag(locale)}</span>
          <span className="hidden sm:inline">
            {getLocaleShortName(locale)}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2" align="end">
        <div className="space-y-1">
          {availableLocales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => switchLocale(loc.code)}
              className={`w-full text-left px-2 py-1.5 text-sm rounded-sm transition-colors ${
                locale === loc.code
                  ? 'bg-accent-primary text-surface-primary font-medium'
                  : 'text-content-secondary hover:text-content-primary hover:bg-surface-elevated'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{getCountryFlag(loc.code)}</span>
                  <span>{getLocaleDisplayName(loc.code)}</span>
                </div>
                {locale === loc.code && (
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                )}
              </div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
