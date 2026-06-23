// @iskra-ui/eslint-config — shared flat config.
// Composes ESLint recommended + typescript-eslint + react-hooks + eslint-plugin-vue.
// Formatting is delegated to Prettier (this config is semantic-only).
// eslint-plugin-vue is appended last so it owns the parser for .vue files.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export const ignores = {
  ignores: ['**/dist/**', '**/storybook-static/**', '**/coverage/**', '**/*.tsbuildinfo'],
};

// Node/tooling scripts: build pipelines, config files, custom checks.
export const node = {
  files: ['**/*.mjs', '**/*.config.{js,ts,mjs}', '**/.storybook/**', 'scripts/**'],
  languageOptions: {
    globals: { ...globals.node },
  },
};

/** Ready-to-use flat config covering both React/TS and Vue sources. */
export const config = tseslint.config(
  ignores,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2022 },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: { ...reactHooks.configs.recommended.rules },
  },
  {
    files: ['packages/**/src/**/*.{ts,tsx}'],
    ignores: [
      '**/*.stories.{ts,tsx}',
      '**/*.test.{ts,tsx}',
      '**/i18n/**',
      'packages/i18n/**',
    ],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/[А-Яа-яЁё]/]',
          message:
            'User-facing Cyrillic strings belong in @iskra-ui/i18n catalogs. Use useIskraT() or props.',
        },
        {
          selector: 'TemplateElement[value.raw=/[А-Яа-яЁё]/]',
          message:
            'User-facing Cyrillic strings belong in @iskra-ui/i18n catalogs. Use useIskraT() or props.',
        },
      ],
    },
  },
  node,
  // Storybook `render` functions legitimately use hooks for interactive stories.
  {
    files: ['**/*.stories.{ts,tsx,js,jsx}'],
    rules: { 'react-hooks/rules-of-hooks': 'off' },
  },
  // Vue last: it sets vue-eslint-parser for .vue and delegates <script> to the TS parser.
  // `flat/essential` keeps correctness rules only — stylistic formatting is owned by Prettier.
  ...vue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser, ecmaVersion: 'latest', sourceType: 'module' },
    },
    rules: {
      // Design-system primitives are deliberately single-word (Button, Card, Icon…).
      'vue/multi-word-component-names': 'off',
    },
  },
);

export default config;
