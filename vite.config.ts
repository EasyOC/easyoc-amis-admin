const { resolve } = require('path')
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1688
  },

  resolve: {
    alias: {
      // 关键代码
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [
    react(
      {
        babel: {
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
          ],
        }
      }
    ),

  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        editor: resolve(__dirname, 'src/editor/index.html'),
      }
    }
  }
});
