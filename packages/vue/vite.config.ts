import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Library mode: ESM + CJS, Vue externalized, all component CSS bundled into a
// single dist/styles.css (consumers import '@iskra-ui/vue/styles.css').
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: 'styles.css',
        globals: { vue: 'Vue' },
      },
    },
    sourcemap: true,
  },
});
