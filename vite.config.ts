const { resolve } = require('path');
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import runtime from './src/utils/helper/envHelper';
// import monacoEditorPlugin from 'vite-plugin-monaco-editor';
// const env = loadEnv('development', process.cwd(), '')

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "/public",
  server: {
    port: 2688,
    // host: '0.0.0.0'
    host: '0.0.0.0'
  },

  resolve: {
    alias: {
      // 关键代码
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [
    // monacoEditorPlugin({}),
    react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }]
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    }
  }
});
