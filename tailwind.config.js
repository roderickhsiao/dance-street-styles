/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design system colors
        surface: {
          primary: 'rgb(0 0 0)',
          secondary: 'rgb(17 17 17)',
          elevated: 'rgb(38 38 38)',
        },
        content: {
          primary: 'rgb(255 255 255)',
          secondary: 'rgb(156 163 175)',
          tertiary: 'rgb(107 114 128)',
        },
        accent: {
          primary: 'rgb(249 115 22)', // orange-500
          secondary: 'rgb(236 72 153)', // pink-500
          tertiary: 'rgb(168 85 247)', // purple-500
        },
        stroke: {
          primary: 'rgb(75 85 99)', // gray-600
          secondary: 'rgb(55 65 81)', // gray-700
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
  plugins: [],
};
