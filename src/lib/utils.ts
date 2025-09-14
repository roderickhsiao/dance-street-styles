import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ThemeColors } from "@/data/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Theme management utilities
export const applyThemeColors = (theme: ThemeColors) => {
  const root = document.documentElement;
  
  // Convert hex to hsl for CSS custom properties
  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const [primaryH, primaryS, primaryL] = hexToHsl(theme.primary);
  const [secondaryH, secondaryS, secondaryL] = hexToHsl(theme.secondary);
  const [accentH, accentS, accentL] = hexToHsl(theme.accent);
  const [backgroundH, backgroundS, backgroundL] = hexToHsl(theme.background);
  const [foregroundH, foregroundS, foregroundL] = hexToHsl(theme.foreground);
  const [mutedH, mutedS, mutedL] = hexToHsl(theme.muted);

  root.style.setProperty('--primary', `${primaryH} ${primaryS}% ${primaryL}%`);
  root.style.setProperty('--secondary', `${secondaryH} ${secondaryS}% ${secondaryL}%`);
  root.style.setProperty('--accent', `${accentH} ${accentS}% ${accentL}%`);
  root.style.setProperty('--background', `${backgroundH} ${backgroundS}% ${backgroundL}%`);
  root.style.setProperty('--foreground', `${foregroundH} ${foregroundS}% ${foregroundL}%`);
  root.style.setProperty('--muted', `${mutedH} ${mutedS}% ${mutedL}%`);
};

export const resetTheme = () => {
  const root = document.documentElement;
  // Reset to default theme values
  root.style.removeProperty('--primary');
  root.style.removeProperty('--secondary');
  root.style.removeProperty('--accent');
  root.style.removeProperty('--background');
  root.style.removeProperty('--foreground');
  root.style.removeProperty('--muted');
};
