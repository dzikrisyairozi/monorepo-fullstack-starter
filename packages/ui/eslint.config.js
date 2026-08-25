import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

// Not built on @repo/eslint-config/react-internal: it pulls in
// eslint-plugin-react, whose latest release (7.37.5) only supports
// eslint ^9.7 and crashes under this repo's eslint 10.8.1 (calls the
// removed context.getFilename() API). Same rule subset apps/dashboard
// already lints clean with.
export default defineConfig([
  globalIgnores(['dist/**']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
