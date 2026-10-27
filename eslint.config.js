import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * The lint setup of the site.
 *
 * ESLint covers the first-party JavaScript, TypeScript and Astro sources with
 * the recommended rules of ESLint, of typescript-eslint and of
 * eslint-plugin-astro. The Markdown of the articles is linted by
 * markdownlint-cli2, which reads `.markdownlint-cli2.yaml`.
 */
export default [
  {
    ignores: [
      // Dependencies and generated output.
      'node_modules/',
      'dist/',
      '.astro/',
      'public/',
      '.wrangler/',
      '.netlify/',
      // The migration plans and the ledger of the migration are working
      // documents, not site sources.
      'docs/',
      '.superpowers/',
      // The instructions of the coding agents are working documents too.
      '.qoder/',
      '.qoder-cn/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    // The scripts of the repository run on Node.
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },
  {
    // The code of an Astro component is TypeScript that runs on Node.
    files: ['**/*.astro', '**/*.astro/*.js', '**/*.astro/*.ts'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      // Prettier formats the Astro files themselves (`pnpm format:check`);
      // the ESLint pass only looks at the code.
      'prettier/prettier': 'off',
    },
  },
];
