# 🎨 Pure CSS Color System

## Overview
This project uses a **pure CSS color system** with CSS custom properties (variables) for maximum performance and simplicity. All colors are defined in `src/app/globals.css` and automatically work with Tailwind CSS.

## Color Categories

### 🏠 Surface Colors (Backgrounds)
```css
bg-surface-primary     /* Main page background */
bg-surface-secondary   /* Section backgrounds */
bg-surface-elevated    /* Cards, modals, raised elements */
bg-surface-inverse     /* High contrast backgrounds */
```

### 📝 Content Colors (Text)
```css
text-content-primary   /* Main text */
text-content-secondary /* Supporting text */
text-content-tertiary  /* Captions, metadata */
text-content-inverse   /* Text on dark backgrounds */
text-content-disabled  /* Disabled text */
```

### ⚡ Accent Colors (Brand)
```css
text-accent-primary    /* Orange - Energy, movement */
text-accent-secondary  /* Pink - Creativity, passion */
text-accent-tertiary   /* Purple - Rhythm, flow */

/* Hover states automatically available */
hover:bg-accent-primary-hover
```

### 🔲 Stroke Colors (Borders)
```css
border-stroke-primary   /* Default borders */
border-stroke-secondary /* Subtle borders */
border-stroke-accent    /* Accent borders */
ring-stroke-focus       /* Focus rings */
```

### 🚦 Status Colors (Feedback)
```css
text-status-success     /* Success states */
text-status-warning     /* Warning states */
text-status-error       /* Error states */
text-status-info        /* Info states */

/* Background variants with automatic alpha */
bg-status-success-bg/10  /* 10% opacity success background */
bg-status-error-bg/20    /* 20% opacity error background */
```

## Alpha Support
All colors automatically support alpha values:
```css
bg-surface-primary/50   /* 50% opacity */
bg-accent-primary/20    /* 20% opacity */
text-content-primary/80 /* 80% opacity */
```

## Theme Switching
Themes are managed by Jotai state with cookie persistence:

### Theme Options:
- **`light`**: Light theme (force light mode)
- **`dark`**: Dark theme (force dark mode) 
- **`system`**: Follows user's system preference (default)

### Implementation:
```tsx
import { useTheme } from '@/components/providers/ThemeProvider';

function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
}
```

### Features:
- ✅ **Cookie persistence** - Works with SSR
- ✅ **React-only** - No direct HTML manipulation
- ✅ **System preference detection** - Respects user's OS setting
- ✅ **Prefixed storage** - Uses `sdc_theme` key to avoid conflicts
- ✅ **Hydration safe** - No flash of unstyled content

### Theme Toggle Components:
```tsx
import { ThemeToggle, ThemeToggleCompact } from '@/components/ThemeToggle';

// Full theme selector with labels
<ThemeToggle />

// Compact toggle for mobile/tight spaces
<ThemeToggleCompact />
```

## Color Management Best Practices

### ✅ Do:
- Use semantic color names (`bg-surface-primary`)
- Test both themes when adding new colors
- Maintain contrast ratios for accessibility
- Document any new color additions

### ❌ Don't:
- Use hardcoded hex colors in components
- Create one-off color variations
- Bypass the color system

## Adding New Colors

To add new colors, edit `src/app/globals.css`:

1. **Add to both themes** (`:root` and `.dark`)
2. **Use RGB values** without `rgb()` wrapper: `255 255 255`
3. **Update Tailwind config** if needed
4. **Document the new color** in this file

Example:
```css
:root {
  --color-custom-highlight: 255 204 0;  /* Yellow highlight */
}

.dark {
  --color-custom-highlight: 255 235 59; /* Brighter yellow for dark theme */
}
```

Then add to `tailwind.config.js`:
```javascript
colors: {
  custom: {
    highlight: 'rgb(var(--color-custom-highlight) / <alpha-value>)',
  }
}
```

## Performance Benefits
- ⚡ **Zero JavaScript** - Pure CSS solution
- 🚀 **Fast theme switching** - Just CSS class toggle
- 📦 **Smaller bundle** - No color definitions in JS
- 🎯 **SEO friendly** - No flash of unstyled content
- 🔧 **Browser optimized** - Native CSS variable support