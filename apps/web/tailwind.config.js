const sharedConfig = require('@doodle-together/tailwind-config/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  presets: [sharedConfig],
};
