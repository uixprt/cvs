const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({});

module.exports = {
  extends: compat.extends('next/core-web-vitals', 'next/typescript'),
  rules: {
    '@next/next/no-page-custom-font': 'off',
  },
};