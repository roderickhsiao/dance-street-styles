// Use direct country code to emoji mapping since country-flag-emoji has type issues
/**
 * Country flag emojis mapped by country code
 */
const COUNTRY_FLAGS: Record<string, string> = {
  'US': '🇺🇸',
  'TW': '🇹🇼',
  'CN': '🇨🇳',
  'JP': '🇯🇵',
  'KR': '🇰🇷',
  'FR': '🇫🇷',
  'ES': '🇪🇸',
  'DE': '🇩🇪',
  'IT': '🇮🇹',
  'PT': '🇵🇹',
  'BR': '🇧🇷',
  'RU': '🇷🇺',
  'SA': '🇸🇦',
  'IN': '🇮🇳',
} as const;

/**
 * Mapping from locale codes to country codes for flag display
 * This maps languages to their primary country flags
 */
const LOCALE_TO_COUNTRY_CODE: Record<string, string> = {
  'en': 'US', // English -> United States flag
  'zh-Hant-TW': 'TW', // Traditional Chinese -> Taiwan flag
  'zh-CN': 'CN', // Simplified Chinese -> China flag
  'ja': 'JP', // Japanese -> Japan flag
  'ko': 'KR', // Korean -> South Korea flag
  'fr': 'FR', // French -> France flag
  'es': 'ES', // Spanish -> Spain flag
  'de': 'DE', // German -> Germany flag
  'it': 'IT', // Italian -> Italy flag
  'pt': 'PT', // Portuguese -> Portugal flag
  'pt-BR': 'BR', // Brazilian Portuguese -> Brazil flag
  'ru': 'RU', // Russian -> Russia flag
  'ar': 'SA', // Arabic -> Saudi Arabia flag
  'hi': 'IN', // Hindi -> India flag
} as const;

/**
 * Get the country flag emoji for a given locale
 * @param locale - The locale code (e.g., 'en', 'zh-Hant-TW')
 * @returns The country flag emoji string
 */
export function getCountryFlag(locale: string): string {
  const countryCode = LOCALE_TO_COUNTRY_CODE[locale];
  if (!countryCode) {
    return '🌐'; // Global/world emoji as fallback
  }
  
  return COUNTRY_FLAGS[countryCode] || '🌐';
}

/**
 * Get display name for a locale with proper formatting
 * @param locale - The locale code
 * @returns The formatted display name
 */
export function getLocaleDisplayName(locale: string): string {
  const displayNames: Record<string, string> = {
    'en': 'English',
    'zh-Hant-TW': '繁體中文',
    'zh-CN': '简体中文',
    'ja': '日本語',
    'ko': '한국어',
    'fr': 'Français',
    'es': 'Español',
    'de': 'Deutsch',
    'it': 'Italiano',
    'pt': 'Português',
    'pt-BR': 'Português (BR)',
    'ru': 'Русский',
    'ar': 'العربية',
    'hi': 'हिन्दी',
  };
  
  return displayNames[locale] || locale;
}

/**
 * Get short display name for a locale (for compact display)
 * @param locale - The locale code
 * @returns The short display name
 */
export function getLocaleShortName(locale: string): string {
  const shortNames: Record<string, string> = {
    'en': 'EN',
    'zh-Hant-TW': '繁中',
    'zh-CN': '简中',
    'ja': '日本',
    'ko': '한국',
    'fr': 'FR',
    'es': 'ES',
    'de': 'DE',
    'it': 'IT',
    'pt': 'PT',
    'pt-BR': 'BR',
    'ru': 'RU',
    'ar': 'AR',
    'hi': 'HI',
  };
  
  return shortNames[locale] || locale.toUpperCase();
}
