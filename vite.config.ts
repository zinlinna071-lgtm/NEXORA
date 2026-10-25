import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // The Express middleware server does not own Vite's WebSocket upgrade
      // endpoint, so an HMR client would repeatedly fail during preview.
      hmr: false,
      watch: null,
    },
  };
});
