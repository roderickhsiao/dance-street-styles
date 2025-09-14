/**
 * Locale mappings and utilities using native Intl APIs where possible
 */

/**
 * Manual mappings that can't be derived from Intl APIs
 * Only includes platform-specific format conversions
 */

/**
 * Mapping from next-intl locale codes to OpenGraph locale format
 * OpenGraph uses underscore format (e.g., 'en_US', 'zh_TW')
 * This is platform-specific and can't be derived from Intl APIs
 */
export const LOCALE_TO_OG_LOCALE: Record<string, string> = {
  'en': 'en_US',
  'zh-Hant-TW': 'zh_TW',
  'zh-CN': 'zh_CN',
  'ja': 'ja_JP',
  'ko': 'ko_KR',
  'fr': 'fr_FR',
  'es': 'es_ES',
  'de': 'de_DE',
  'it': 'it_IT',
  'pt': 'pt_PT',
  'pt-BR': 'pt_BR',
  'ru': 'ru_RU',
  'ar': 'ar_AR',
  'hi': 'hi_IN',
} as const;

/**
 * Mapping from next-intl locale codes to HTML lang attribute format
 * HTML lang uses hyphen format (e.g., 'en-US', 'zh-TW')
 * This is also platform-specific
 */
export const LOCALE_TO_HTML_LANG: Record<string, string> = {
  'en': 'en-US',
  'zh-Hant-TW': 'zh-TW',
  'zh-CN': 'zh-CN',
  'ja': 'ja-JP',
  'ko': 'ko-KR',
  'fr': 'fr-FR',
  'es': 'es-ES',
  'de': 'de-DE',
  'it': 'it-IT',
  'pt': 'pt-PT',
  'pt-BR': 'pt-BR',
  'ru': 'ru-RU',
  'ar': 'ar-SA',
  'hi': 'hi-IN',
} as const;

/**
 * Utility functions using native Intl APIs
 */

/**
 * Get native name for a locale using Intl.DisplayNames
 */
export function getNativeName(locale: string, displayLocale: string = locale): string {
  try {
    const displayNames = new Intl.DisplayNames([displayLocale], { type: 'language' });
    return displayNames.of(locale) || locale;
  } catch {
    return locale;
  }
}

/**
 * Get all available locale names using Intl.DisplayNames
 */
export function getAvailableLocaleNames(locales: string[], displayLocale: string = 'en'): Record<string, string> {
  const displayNames = new Intl.DisplayNames([displayLocale], { type: 'language' });
  const names: Record<string, string> = {};
  
  for (const locale of locales) {
    try {
      names[locale] = displayNames.of(locale) || locale;
    } catch {
      names[locale] = locale;
    }
  }
  
  return names;
}

/**
 * Get region name for a locale using Intl.DisplayNames
 */
export function getRegionName(regionCode: string, displayLocale: string = 'en'): string {
  try {
    const displayNames = new Intl.DisplayNames([displayLocale], { type: 'region' });
    return displayNames.of(regionCode) || regionCode;
  } catch {
    return regionCode;
  }
}


/**
 * Get text direction for a locale using Intl.Locale
 */
export function getDirection(locale: string): 'ltr' | 'rtl' {
  try {
    const intlLocale = new Intl.Locale(locale);
    // RTL languages - this is the main case where we need manual mapping
    const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'ps', 'sd'];
    const language = intlLocale.language;
    return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
  } catch {
    return 'ltr';
  }
}

/**
 * Platform-specific conversion functions
 */

/**
 * Convert next-intl locale to OpenGraph format
 */
export function getOGLocale(locale: string): string {
  return LOCALE_TO_OG_LOCALE[locale] || 'en_US';
}

/**
 * Convert next-intl locale to HTML lang format
 */
export function getHtmlLang(locale: string): string {
  return LOCALE_TO_HTML_LANG[locale] || 'en-US';
}

/**
 * Check if locale uses end-to-left text direction
 */
export function isRTL(locale: string): boolean {
  return getDirection(locale) === 'rtl';
}

/**
 * Get comprehensive locale information
 */
export function getLocaleInfo(locale: string, displayLocale: string = 'en') {
  return {
    locale,
    nativeName: getNativeName(locale, locale),
    displayName: getNativeName(locale, displayLocale),
    direction: getDirection(locale),
    htmlLang: getHtmlLang(locale),
    ogLocale: getOGLocale(locale),
    isRTL: isRTL(locale),
  };
}

/**
 * Get all supported locales (for future expansion)
 */
export function getAllSupportedLocales(): string[] {
  return Object.keys(LOCALE_TO_OG_LOCALE);
}
