export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

// Storage key with prefix
const STORAGE_KEY = 'sdc_theme'; // street-dance-culture prefix

// Utility function to get theme from cookie server-side
export function getThemeFromCookie(cookieHeader?: string): Theme {
  if (!cookieHeader) return Theme.DARK;
  
  const match = cookieHeader
    .split('; ')
    .find(row => row.startsWith(`${STORAGE_KEY}=`))
    ?.split('=')[1];
  
  if (match && Object.values(Theme).includes(match as Theme)) {
    return match as Theme;
  }
  
  return Theme.DARK;
}