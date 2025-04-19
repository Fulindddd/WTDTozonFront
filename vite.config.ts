import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

try {
  const file = dotenv.parse(fs.readFileSync('.env'));
  switch (process.env.NODE_ENV) {
    case 'development':
      process.env.API_URL = file.DEVELOPMENT_URL;
      break;
    case 'production':
      process.env.API_URL = file.PRODUCTION_URL;
      break;
  }
} catch (e) {
  console.error(e);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 9999,
    open: false,
    proxy: {
      '/eco-eods': {
        target: process.env.API_URL,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/eco-eods/, ''),
      },
    },
  },
});
