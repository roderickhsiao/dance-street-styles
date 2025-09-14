import { locales, type Locale } from './constants';
import { getNativeName } from './locale-mappings';

/**
 * Utility functions for using the native Intl API with our supported locales
 */

/**
 * Get the display name of a locale in the target locale
 * @param locale - The locale to get the display name for
 * @param targetLocale - The locale to display the name in
 * @returns The display name of the locale
 */
export function getLocaleDisplayName(locale: Locale, targetLocale: Locale): string {
  return getNativeName(locale, targetLocale);
}

/**
 * Get all available locales with their display names
 * @param targetLocale - The locale to display the names in
 * @returns Array of locale objects with code and display name
 */
export function getAvailableLocales(targetLocale: Locale) {
  return locales.map(locale => ({
    code: locale,
    name: getNativeName(locale, targetLocale),
    nativeName: getNativeName(locale, locale),
  }));
}

/**
 * Format a date using the locale
 * @param date - The date to format
 * @param locale - The locale to use for formatting
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

/**
 * Format a number using the locale
 * @param number - The number to format
 * @param locale - The locale to use for formatting
 * @param options - Intl.NumberFormatOptions
 * @returns Formatted number string
 */
export function formatNumber(
  number: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(number);
}

/**
 * Format a relative time using the locale
 * @param value - The relative time value
 * @param unit - The unit of time
 * @param locale - The locale to use for formatting
 * @param options - Intl.RelativeTimeFormatOptions
 * @returns Formatted relative time string
 */
export function formatRelativeTime(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale: Locale,
  options?: Intl.RelativeTimeFormatOptions
): string {
  return new Intl.RelativeTimeFormat(locale, options).format(value, unit);
}

/**
 * Get the collator for the locale (useful for sorting)
 * @param locale - The locale to use
 * @param options - Intl.CollatorOptions
 * @returns Intl.Collator instance
 */
export function getCollator(
  locale: Locale,
  options?: Intl.CollatorOptions
): Intl.Collator {
  return new Intl.Collator(locale, options);
}

/**
 * Get plural rules for the locale
 * @param locale - The locale to use
 * @param options - Intl.PluralRulesOptions
 * @returns Intl.PluralRules instance
 */
export function getPluralRules(
  locale: Locale,
  options?: Intl.PluralRulesOptions
): Intl.PluralRules {
  return new Intl.PluralRules(locale, options);
}

/**
 * Get the plural rule for a specific number
 * @param number - The number to get the plural rule for
 * @param locale - The locale to use
 * @param options - Intl.PluralRulesOptions
 * @returns The plural rule ('zero', 'one', 'two', 'few', 'many', or 'other')
 */
export function getPluralRule(
  number: number,
  locale: Locale,
  options?: Intl.PluralRulesOptions
): Intl.LDMLPluralRule {
  return new Intl.PluralRules(locale, options).select(number);
}

/**
 * Format a list using the locale
 * @param list - The array of items to format as a list
 * @param locale - The locale to use for formatting
 * @param options - Intl.ListFormatOptions
 * @returns Formatted list string
 */
export function formatList(
  list: string[],
  locale: Locale,
  options?: Intl.ListFormatOptions
): string {
  return new Intl.ListFormat(locale, options).format(list);
}

/**
 * Get currency display name
 * @param currency - The currency code (e.g., 'USD', 'EUR')
 * @param locale - The locale to display the name in
 * @returns The currency display name
 */
export function getCurrencyDisplayName(currency: string, locale: Locale): string {
  const displayNames = new Intl.DisplayNames([locale], { type: 'currency' });
  return displayNames.of(currency) ?? currency;
}

/**
 * Get country display name
 * @param country - The country code (e.g., 'US', 'TW')
 * @param locale - The locale to display the name in
 * @returns The country display name
 */
export function getCountryDisplayName(country: string, locale: Locale): string {
  const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
  return displayNames.of(country) ?? country;
}

/**
 * Get script display name
 * @param script - The script code (e.g., 'Latn', 'Hant')
 * @param locale - The locale to display the name in
 * @returns The script display name
 */
export function getScriptDisplayName(script: string, locale: Locale): string {
  const displayNames = new Intl.DisplayNames([locale], { type: 'script' });
  return displayNames.of(script) ?? script;
}
