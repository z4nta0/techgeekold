
// #region Imports

import { defineConfig }  from 'eslint/config';               /** This import enables TypeScript intellisense and provide a type-safe way to define configurations. */
import   globals         from 'globals';                     /** This import is an NPM package that uses global identifiers from different JavaScript environments and is typically used by ESLint. */
import { globalIgnores } from 'eslint/config';               /** This import is a utility function from ESLint that allows you to specify glob patterns for files and directories that should be ignored during linting, and it is the modern equivalent of the .eslintignore file. */
import   js              from '@eslint/js';                  /** This import is the official ESLint configuration for JavaScript projects, providing a set of recommended rules and settings for linting JavaScript code. */
import   reactHooks      from 'eslint-plugin-react-hooks';   /** This import is the official ESLint plugin for React Hooks, which provides linting rules to enforce the correct usage of React Hooks in your codebase. */
import   reactRefresh    from 'eslint-plugin-react-refresh'; /** This import is the official ESLint plugin for React Refresh, which provides linting rules to ensure that your React components are compatible with Fast Refresh (hot reloading) for a better development experience. */
import   tseslint        from 'typescript-eslint';           /** This import is the official ESLint plugin for TypeScript, which provides linting rules and configurations to help you write clean and error free TypeScript code. */

// #endregion Imports



/** @see {@link https://eslint.org/docs/latest/use/configure/configuration-files} */

export default defineConfig([


    globalIgnores( [ 'dist' ] ),

    {

        files : [ '**/*.{ts,tsx}' ],

        extends : [

            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs[ 'recommended-latest' ],
            reactRefresh.configs.vite,

        ],

        languageOptions : {

            ecmaVersion : 2020,
            globals     : globals.browser,

        },

    },


]);


