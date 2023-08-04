const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  extends: ['doodle-together', 'plugin:react/recommended', 'next'],
  plugins: ['react', 'react-hooks'],
});
