import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Library mode: ESM + CJS. React and the @iskra-dci/* foundation are externalized
// so consumers dedupe a single copy; domain CSS bundles into dist/styles.css.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    sourcemap: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@iskra-dci/react',
        '@iskra-dci/icons',
        '@iskra-dci/core',
      ],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        assetFileNames: 'styles.css',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    css: true,
  },
});
