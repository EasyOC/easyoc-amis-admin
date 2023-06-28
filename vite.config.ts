const { resolve } = require('path')
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import monacoEditorPlugin from 'vite-plugin-monaco-editor';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 2688,
    host: 'localhost'
  },

  resolve: {
    alias: {
      // 关键代码
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [
    // monacoEditorPlugin({}),
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
