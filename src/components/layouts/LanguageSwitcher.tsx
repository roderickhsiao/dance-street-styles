'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useIntlDisplayNames } from '@/i18n/hooks';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { getCountryFlag, getLocaleDisplayName, getLocaleShortName } from '../../i18n/locale-flags';

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
          className="gap-1 text-content-secondary hover:text-content-primary px-2 py-1 rounded-md bg-surface-elevated/10 border border-stroke-secondary shadow-lg min-h-0"
        >
          <span className="text-base">{getCountryFlag(locale)}</span>
          <span className="hidden sm:inline text-xs">
            {getLocaleShortName(locale)}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="min-w-fit max-w-[10rem] px-3 py-1 rounded-md border border-stroke-secondary/10 bg-[rgba(30,30,40,0.7)]"
        align="end"
        style={{
          WebkitBackdropFilter: 'blur(8px)',
          backdropFilter: 'url(#glass-filter)',
        }}
      >
        <div className="space-y-1">
          {availableLocales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => switchLocale(loc.code)}
              className={`w-full text-start px-2 py-1 rounded-sm flex items-center gap-2 transition-colors duration-150 font-normal focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary/60 focus-visible:ring-offset-1 focus-visible:ring-offset-surface-elevated ${
                locale === loc.code
                  ? 'text-accent-primary bg-accent-primary/10'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
              aria-current={locale === loc.code ? 'true' : undefined}
              style={{ minHeight: '2.25rem' }}
            >
              <span className="text-base align-middle flex items-center">{getCountryFlag(loc.code)}</span>
              <span className="flex-1 magazine-sans tracking-normal text-body-sm align-middle flex items-center">{getLocaleDisplayName(loc.code)}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
