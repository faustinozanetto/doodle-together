const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#f0faff',
          100: '#e0f4fe',
          200: '#bae6fd',
          300: '#7dd1fc',
          400: '#38b7f8',
          500: '#0e9fe9',
          600: '#0284c7',
          700: '#036ba1',
          800: '#075a85',
          900: '#0c4d6e',
          950: '#083349',
        },
        secondary: colors.blue,
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        skeleton: 'hsl(var(--skeleton))',
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
    },
  },
};
