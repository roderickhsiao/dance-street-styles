'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { themeAtom, isDarkAtom, isLightAtom } from '@/lib/theme-atoms';
import { Theme } from '@/lib/theme';

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [isDark] = useAtom(isDarkAtom);
  const [isLight] = useAtom(isLightAtom);

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(Theme.LIGHT, Theme.DARK);
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark,
    isLight,
  };
}
