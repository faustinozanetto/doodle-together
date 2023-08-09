const sharedConfig = require('@doodle-together/tailwind-config/tailwind.config.js');
const tailwindAnimate = require('tailwindcss-animate');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [sharedConfig],
  plugins: [tailwindAnimate],
};
