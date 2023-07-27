const sharedConfig = require('@doodle-together/tailwind-config/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'ui-',
  darkMode: ['class', '[class="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('tailwindcss-animate')],
  presets: [sharedConfig],
};
