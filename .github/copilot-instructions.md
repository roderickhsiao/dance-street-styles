# GitHub Copilot Instructions for Street Dance Culture Project

## Project Overview
This is a Next.js street dance culture magazine website with internationalization (i18n) support. The site features a dark, magazine-style design with street culture aesthetics.

## Code Style & Standards

### General Guidelines
- **No React imports**: Don't import React in components after React 19 - it's automatic
- **Use TypeScript**: All files should be properly typed
- **Magazine-style design**: Follow the dark theme with orange/pink/purple accents
- **Responsive-first**: Always design for mobile-first, then scale up
- **DRY Principle**: Create common components instead of repeating code
- **Accessibility & SEO**: Always consider WCAG guidelines and semantic HTML
- **Inclusive Language**: Use diverse examples including b-boys, b-girls, and all dance community members
- **Source Attribution**: Only include content/quotes with proper source attribution
- **Class name**: Use clsx over template literals for conditional class names

### Component Structure
```tsx
// ✅ Good - No React import needed
interface ComponentProps {
  children: React.ReactNode;
  className?: string;
}

export const Component = ({ children, className = "" }: ComponentProps) => {
  return (
    <div className={`base-styles ${className}`}>
      {children}
    </div>
  );
};
```

### Internationalization (i18n)
- **Use next-intl**: We use `next-intl` for server-side i18n with URL-based routing
- **useTranslations hook**: Always use `const t = useTranslations('namespace')` hook for client components
- **getTranslations**: Use `const t = await getTranslations('namespace')` for server components  
- **Nested JSON structure**: Translation keys use nested objects, **never use dots in namespace keys**
- **JSON-based translations**: All translation strings in `/src/i18n/messages/en.json` and `zh-Hant-TW.json`
- **Both languages**: Always add keys to both language files
- **Untranslatable terms**: Some terms like "Battle", "Cypher", "Freestyle" are commonly used as-is in Taiwan and should remain in English even in Chinese translations when culturally appropriate

```tsx
// ✅ Good - Client component with next-intl
'use client';
import { useTranslations } from 'next-intl';

export const ClientComponent = () => {
  const t = useTranslations('hero'); // namespace
  
  return (
    <h1>{t('title.line1')}</h1> // accesses hero.title.line1
  );
};

// ✅ Good - Server component with next-intl  
import { getTranslations } from 'next-intl/server';

export const ServerComponent = async () => {
  const t = await getTranslations('hero');
  
  return (
    <h1>{t('title.line1')}</h1>
  );
};

// ✅ Good - Translation JSON structure
// en.json
{
  "hero": {
    "title": {
      "line1": "STREET",
      "line2": "DANCE"
    }
  }
}

// ❌ Bad - Dots in keys (causes INVALID_KEY error)
{
  "hero.title.line1": "STREET" // ❌ Don't use dots in keys
}

// ❌ Bad - hardcoded text
<h1>Street Culture</h1>
```

### Styling Guidelines & Design System
- **Use Tailwind CSS**: Prefer Tailwind over inline styles and custom CSS
- **Directional Properties**: Always use `start/end` instead of `left/right` for RTL support
- **Typography System**: Use t-shirt sizing system instead of direct Tailwind text classes
  - Headers: `text-header-xs`, `text-header-sm`, `text-header-md`, `text-header-lg`, `text-header-xl`, `text-header-2xl`
  - Body: `text-body-xs`, `text-body-sm`, `text-body-md`, `text-body-lg`
- **Color System**: Use contextual color tokens instead of direct Tailwind colors
  - Backgrounds: `bg-surface-primary`, `bg-surface-secondary`, `bg-surface-elevated`
  - Text: `text-content-primary`, `text-content-secondary`, `text-content-tertiary`
  - Accents: `text-accent-primary`, `text-accent-secondary`, `text-accent-tertiary`
  - Borders: `border-stroke-primary`, `border-stroke-secondary`
- **Theming**: Create consistent theme tokens that can be easily switched
- **Responsive design**: Use `sm:`, `md:`, `lg:`, `xl:` prefixes consistently

```tsx
// ✅ Good - Design system approach with next-intl
'use client';
import { useTranslations } from 'next-intl';

export const Component = () => {
  const t = useTranslations('section');
  
  return (
    <section className="py-20 px-6 bg-surface-primary">
      <h2 className="text-header-xl font-black text-content-primary text-start">
        {t('title')}
      </h2>
      <p className="text-body-md text-content-secondary">
        {t('description')}
      </p>
    </section>
  );
};

// ❌ Bad - Direct Tailwind classes
<section className="py-20 px-6 bg-black">
  <h2 className="text-4xl md:text-5xl font-black text-white text-left">
    Hardcoded text
  </h2>
  <p className="text-gray-400">
    More hardcoded text
  </p>
</section>
```

### Animation Guidelines
- **Use Framer Motion**: For scroll animations and interactions
- **Consistent patterns**: Use `whileInView` for scroll-triggered animations
- **Staggered animations**: Use delays like `delay: index * 0.1` for lists

```tsx
// ✅ Good - Standard scroll animation
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  viewport={{ once: true }}
>
```

### Layout Patterns
- **Footer in layout**: Footer is in `app/layout.tsx`, don't add it to individual pages
- **Navigation**: Use `<MainNavigation />` component on all pages
- **Page structure**: Dark background with proper spacing sections

```tsx
// ✅ Good page structure
return (
  <div className="min-h-screen bg-surface-primary">
    <MainNavigation />
    
    {/* Hero section */}
    <section className="relative bg-gradient-to-br from-accent-tertiary via-accent-secondary to-accent-primary min-h-[80vh]">
      {/* content */}
    </section>
    
    {/* Other sections */}
    <section className="py-20 px-6 bg-surface-secondary">
      {/* content */}
    </section>
  </div>
);
```

## File Organization
- **Components**: Keep in `/src/components/`
- **Pages**: Use Next.js 15 app directory structure
- **Translations**: All strings in `/src/i18n/messages/`
- **Data**: Dance styles and content in `/src/data/`

## Common Patterns to Remember

### Card Components
```tsx
// Standard dark card pattern
<div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
```

### Grid Layouts
```tsx
// Responsive grid
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
```

### Buttons
```tsx
// Primary CTA button
<Link
  href="/path"
  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-black font-bold hover:from-orange-400 hover:to-pink-400 transition-all duration-300 rounded-xl uppercase tracking-wider magazine-sans"
>

// Secondary button  
<Link
  href="/path"
  className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-bold hover:border-orange-400 hover:text-orange-400 transition-colors rounded-xl uppercase tracking-wider magazine-sans"
>
```

## Street Dance Context
- **Five hip-hop elements**: DJing, MCing, Breaking, Graffiti, Knowledge
- **Cultural authenticity**: Respect the origins and history
- **Timeline**: Key dates from 1973 (DJ Kool Herc) to 2024 (Olympics)
- **Values**: Authenticity, Community, Respect, Peace, Innovation, Unity

## Don't Repeat These Mistakes
1. ❌ Importing React unnecessarily
2. ❌ Hardcoding user-visible text instead of using translations
3. ❌ Using light colors on dark backgrounds without proper contrast
4. ❌ Missing responsive breakpoints
5. ❌ Adding footer to individual pages (it's in layout)
6. ❌ Inconsistent animation patterns
7. ❌ Missing TypeScript types
8. ❌ Using `FormattedMessage` component instead of `useTranslations` hook
9. ❌ Using `left/right` instead of `start/end` for directional properties
10. ❌ Using direct Tailwind classes instead of design system tokens
11. ❌ Including content without proper source attribution
12. ❌ Using non-inclusive language or examples
13. ❌ Using dots in translation namespace keys (causes INVALID_KEY error)
14. ❌ Missing 'use client' directive when using useTranslations hook

## When Making Changes
1. **Always check both English and Chinese translations**
2. **Test responsive design on mobile, tablet, desktop**
3. **Ensure dark theme consistency**
4. **Use proper TypeScript typing**
5. **Follow the magazine aesthetic with street culture authenticity**
6. **Use design system tokens instead of direct Tailwind classes**
7. **Verify accessibility and SEO compliance**
8. **Include diverse examples (b-boys, b-girls, all community members)**
9. **Ensure all content has proper source attribution**

Remember: This is a cultural documentation project, so maintain respect for street dance history and communities while creating an engaging, modern web experience.
