/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        // Surface colors - backgrounds and containers
        surface: {
          primary: 'rgb(var(--color-surface-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-surface-secondary) / <alpha-value>)',
          elevated: 'rgb(var(--color-surface-elevated) / <alpha-value>)',
          overlay: 'rgb(var(--color-surface-overlay) / 0.8)',
          inverse: 'rgb(var(--color-surface-inverse) / <alpha-value>)',
        },
        // Content colors - text and foreground elements
        content: {
          primary: 'rgb(var(--color-content-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-content-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-content-tertiary) / <alpha-value>)',
          inverse: 'rgb(var(--color-content-inverse) / <alpha-value>)',
          disabled: 'rgb(var(--color-content-disabled) / <alpha-value>)',
        },
        // Brand accent colors
        accent: {
          primary: 'rgb(var(--color-accent-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-accent-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-accent-tertiary) / <alpha-value>)',
          'primary-hover': 'rgb(var(--color-accent-primaryHover) / <alpha-value>)',
          'secondary-hover': 'rgb(var(--color-accent-secondaryHover) / <alpha-value>)',
          'tertiary-hover': 'rgb(var(--color-accent-tertiaryHover) / <alpha-value>)',
        },
        // Border and stroke colors
        stroke: {
          primary: 'rgb(var(--color-stroke-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-stroke-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-stroke-tertiary) / <alpha-value>)',
          accent: 'rgb(var(--color-stroke-accent) / <alpha-value>)',
          focus: 'rgb(var(--color-stroke-focus) / <alpha-value>)',
        },
        // Status colors
        status: {
          success: 'rgb(var(--color-status-success) / <alpha-value>)',
          warning: 'rgb(var(--color-status-warning) / <alpha-value>)',
          error: 'rgb(var(--color-status-error) / <alpha-value>)',
          info: 'rgb(var(--color-status-info) / <alpha-value>)',  
          'success-bg': 'rgb(var(--color-status-successBg) / 0.1)',
          'warning-bg': 'rgb(var(--color-status-warningBg) / 0.1)',
          'error-bg': 'rgb(var(--color-status-errorBg) / 0.1)',
          'info-bg': 'rgb(var(--color-status-infoBg) / 0.1)',
        },
      },
      fontSize: {
        // Typography system
        'header-xs': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '800' }], // text-lg
        'header-sm': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '800' }], // text-xl
        'header-md': ['1.5rem', { lineHeight: '2rem', fontWeight: '800' }], // text-2xl
        'header-lg': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '800' }], // text-4xl
        'header-xl': ['3rem', { lineHeight: '1', fontWeight: '800' }], // text-5xl
        'header-2xl': ['4.5rem', { lineHeight: '1', fontWeight: '800' }], // text-7xl
        'body-xs': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }], // text-xs
        'body-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }], // text-sm
        'body-md': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }], // text-base
        'body-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }], // text-lg
      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        'magazine-headline': ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        'magazine-body': ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        'magazine-sans': ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Add custom utilities
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-3': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        },
        '.line-clamp-none': {
          overflow: 'visible',
          display: 'block',
          '-webkit-box-orient': 'horizontal',
          '-webkit-line-clamp': 'none',
        }
      })
    }
  ],
};
