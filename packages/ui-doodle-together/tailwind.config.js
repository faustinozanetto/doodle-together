const sharedConfig = require('@doodle-together/tailwind-config/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'ui-',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('tailwindcss-animate')],
  presets: [sharedConfig],
};
