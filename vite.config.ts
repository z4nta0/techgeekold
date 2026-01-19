
// #region Imports

import { defineConfig } from 'vite';                 /** This import enables TypeScript intellisense and provide a type-safe way to define configurations. */
import   react          from '@vitejs/plugin-react'; /** This import is the official Vite plugin that provides React support, including JSX transformation and Fast Refresh (Hot Module Replacement). */

// #endregion Imports



/** @see {@link https://vite.dev/config/} */

export default defineConfig({


    plugins : [ react() ],


});


