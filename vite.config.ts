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
        // Only include main entry file
        include: ['lib/index.ts'],
        // Adjust output path for declaration files
        beforeWriteFile: (filePath, content) => ({
          filePath: filePath.replace('/lib', ''),
          content,
        }),
      }),
    ],
    build: {
      lib: {
        // Set library entry point
        entry: resolve('lib', 'index.ts'),
        // Set library name for UMD builds
        name: 'antd-form-composer',
        // Configure output filename format
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        // Mark React as external dependency
        external: ['react', 'antd'],
      },
    },
  };
});
