import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';
import { federationEnabled, remotes, shared } from './src/applications/config/federation';

export default defineConfig({
  plugins: [
    react(),
    federationEnabled
      ? federation({
          name: 'host',
          remotes,
          shared,
        })
      : undefined,
  ].filter(Boolean),
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/applications'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@core': path.resolve(__dirname, './src/core'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
