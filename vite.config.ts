import { resolve } from 'node:path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [
      // Add TypeScript type checking
      checker({
        typescript: true,
      }),

      // Add React SWC transform plugin
      react(),

      // Enable TypeScript path aliases
      tsconfigPaths(),

      // Generate TypeScript declaration files
      dts({
        insertTypesEntry: true,
        outDir: './dist', // Changed this to output to root directory
        include: ['lib'], // Specify the source directory to generate types from
      }),
    ],
    build: {
      lib: {
        // Main entry point of your library
        entry: resolve(__dirname, 'lib/index.ts'),

        // Set library name for UMD builds
        name: 'antd-form-composer',

        // Configure output filename format
        fileName: (format) => `index.${format}.js`,

        // Specify which formats to build
        // 'es' - for ESM (import/export)
        // 'umd' - for CommonJS and UMD
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        // Mark React as external dependency
        external: ['react', 'antd'],
      },
    },
  };
});
