import { useLocale } from 'next-intl';
import { type Locale } from './constants';
import {
  formatDate,
  formatNumber,
  formatRelativeTime,
  formatList,
  getLocaleDisplayName,
  getAvailableLocales,
  getCurrencyDisplayName,
  getCountryDisplayName,
} from './utils';

/**
 * Custom hooks for using Intl utilities with next-intl
 */

/**
 * Hook to format dates with the current locale
 */
export function useIntlDate() {
  const locale = useLocale() as Locale;
  
  return {
    formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) =>
      formatDate(date, locale, options),
    
    formatShortDate: (date: Date | string | number) =>
      formatDate(date, locale, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
    
    formatLongDate: (date: Date | string | number) =>
      formatDate(date, locale, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      }),
      
    formatTime: (date: Date | string | number) =>
      formatDate(date, locale, { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
  };
}

/**
 * Hook to format numbers with the current locale
 */
export function useIntlNumber() {
  const locale = useLocale() as Locale;
  
  return {
    formatNumber: (number: number, options?: Intl.NumberFormatOptions) =>
      formatNumber(number, locale, options),
    
    formatCurrency: (number: number, currency: string) =>
      formatNumber(number, locale, { 
        style: 'currency', 
        currency 
      }),
    
    formatPercent: (number: number, minimumFractionDigits?: number) =>
      formatNumber(number, locale, { 
        style: 'percent',
        minimumFractionDigits 
      }),
    
    formatCompact: (number: number) =>
      formatNumber(number, locale, { 
        notation: 'compact' 
      }),
  };
}

/**
 * Hook to format relative time with the current locale
 */
export function useIntlRelativeTime() {
  const locale = useLocale() as Locale;
  
  return {
    formatRelativeTime: (value: number, unit: Intl.RelativeTimeFormatUnit, options?: Intl.RelativeTimeFormatOptions) =>
      formatRelativeTime(value, unit, locale, options),
    
    formatTimeAgo: (date: Date | string | number) => {
      const now = new Date();
      const targetDate = new Date(date);
      const diffInSeconds = (targetDate.getTime() - now.getTime()) / 1000;
      
      const absDiff = Math.abs(diffInSeconds);
      
      if (absDiff < 60) {
        return formatRelativeTime(Math.round(diffInSeconds), 'second', locale);
      } else if (absDiff < 3600) {
        return formatRelativeTime(Math.round(diffInSeconds / 60), 'minute', locale);
      } else if (absDiff < 86400) {
        return formatRelativeTime(Math.round(diffInSeconds / 3600), 'hour', locale);
      } else if (absDiff < 2592000) {
        return formatRelativeTime(Math.round(diffInSeconds / 86400), 'day', locale);
      } else if (absDiff < 31536000) {
        return formatRelativeTime(Math.round(diffInSeconds / 2592000), 'month', locale);
      } else {
        return formatRelativeTime(Math.round(diffInSeconds / 31536000), 'year', locale);
      }
    },
  };
}

/**
 * Hook to format lists with the current locale
 */
export function useIntlList() {
  const locale = useLocale() as Locale;
  
  return {
    formatList: (list: string[], options?: Intl.ListFormatOptions) =>
      formatList(list, locale, options),
    
    formatConjunctionList: (list: string[]) =>
      formatList(list, locale, { style: 'long', type: 'conjunction' }),
    
    formatDisjunctionList: (list: string[]) =>
      formatList(list, locale, { style: 'long', type: 'disjunction' }),
  };
}

/**
 * Hook to get locale display names
 */
export function useIntlDisplayNames() {
  const locale = useLocale() as Locale;
  
  return {
    getLocaleDisplayName: (targetLocale: Locale) =>
      getLocaleDisplayName(targetLocale, locale),
    
    getAvailableLocales: () =>
      getAvailableLocales(locale),
    
    getCurrencyDisplayName: (currency: string) =>
      getCurrencyDisplayName(currency, locale),
    
    getCountryDisplayName: (country: string) =>
      getCountryDisplayName(country, locale),
  };
}

/**
 * All-in-one hook that provides access to all Intl utilities
 */
export function useIntl() {
  const locale = useLocale() as Locale;
  const dateUtils = useIntlDate();
  const numberUtils = useIntlNumber();
  const relativeTimeUtils = useIntlRelativeTime();
  const listUtils = useIntlList();
  const displayNameUtils = useIntlDisplayNames();
  
  return {
    locale,
    ...dateUtils,
    ...numberUtils,
    ...relativeTimeUtils,
    ...listUtils,
    ...displayNameUtils,
  };
}
