import react from '@vitejs/plugin-react-swc';
import { watchRebuildPlugin } from '@chrome-extension-boilerplate/hmr';

export const isDev = process.env.__DEV__ === 'true';
export const isProduction = !isDev;

export default {
  base: '',
  plugins: [react(), isDev && watchRebuildPlugin({ refresh: true })],
  build: {
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    rollupOptions: {
      external: ['chrome'],
    },
  },
  define: {
    'process.env.NODE_ENV': isDev ? `"development"` : `"production"`,
  },
};
