'use client';

import { Provider } from 'jotai';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <Provider>{children}</Provider>;
}