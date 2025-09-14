'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../i18n/navigation';
import { useIntlDisplayNames } from '../i18n/hooks';

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
    <div className="flex items-center gap-2">
      {availableLocales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => switchLocale(loc.code)}
          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
            locale === loc.code
              ? 'bg-accent-primary text-surface-primary'
              : 'text-content-tertiary hover:text-content-primary'
          }`}
          title={loc.nativeName}
        >
          {loc.code === 'en' ? 'EN' : '中文'}
        </button>
      ))}
    </div>
  );
}
