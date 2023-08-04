const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  extends: ['doodle-together', 'plugin:react/recommended', 'next'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'consistent-return': 'off',
    'react/function-component-definition': 'off',
  },
});
