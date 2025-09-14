"use client";

import { useState } from 'react';
import { ThemeColors } from '@/data/types';
import { applyThemeColors, resetTheme } from '@/lib/utils';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeColors | null>(null);

  const applyTheme = (theme: ThemeColors) => {
    setCurrentTheme(theme);
    applyThemeColors(theme);
  };

  const clearTheme = () => {
    setCurrentTheme(null);
    resetTheme();
  };

  return {
    currentTheme,
    applyTheme,
    clearTheme
  };
};
