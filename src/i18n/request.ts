import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// Re-export the locales and types from routing
export const locales = routing.locales;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const store = await cookies();
  const persistLocale = store.get('locale')?.value || routing.defaultLocale;

  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : persistLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
