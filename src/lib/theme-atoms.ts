'use client';

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import Cookies from 'universal-cookie';
import { Theme } from './theme';

const STORAGE_KEY = 'sdc_theme';
const cookies = new Cookies();

// Simple theme atom with cookie persistence
export const themeAtom = atomWithStorage<Theme>(
  STORAGE_KEY,
  Theme.DARK,
  {
    getItem: (key) => {
      // Server-side: always return dark to prevent hydration mismatch
      if (typeof window === 'undefined') {
        return Theme.DARK;
      }
      
      // Client-side: try cookie first
      const cookieValue = cookies.get(key);
      if (cookieValue && Object.values(Theme).includes(cookieValue)) {
        return cookieValue;
      }
      
      // Fallback to localStorage (client only)
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(key);
        if (stored && Object.values(Theme).includes(stored as Theme)) {
          return stored as Theme;
        }
      }
      
      return Theme.DARK;
    },
    setItem: (key, value) => {
      // Set cookie (30 days)
      cookies.set(key, value, { 
        path: '/', 
        maxAge: 30 * 24 * 60 * 60,
        sameSite: 'lax'
      });
      
      // Set localStorage as backup
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      }
    },
    removeItem: (key) => {
      cookies.remove(key, { path: '/' });
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    },
  }
);

// Derived atoms
export const isDarkAtom = atom((get) => get(themeAtom) === Theme.DARK);
export const isLightAtom = atom((get) => get(themeAtom) === Theme.LIGHT);