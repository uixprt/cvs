const { dirname } = require("path");
const { fileURLToPath } = require("url");
const { FlatCompat } = require("@eslint/eslintrc");

const __filename = fileURLToPath(require.main.filename);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = {
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  rules: {
    '@next/next/no-page-custom-font': 'off', // in App Router projects, you should add font <link> tags in layout.tsx or app/head.tsx
    // ...add other custom rules here
  },
};