const sharedConfig = require('@doodle-together/tailwind-config/tailwind.config.js');
const tailwindAnimate = require('tailwindcss-animate');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  presets: [sharedConfig],
  plugins: [tailwindAnimate],
};
