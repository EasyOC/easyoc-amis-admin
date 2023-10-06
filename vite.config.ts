const { resolve } = require('path');
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import svgr from 'vite-plugin-svgr';
// import replace from '@rollup/plugin-replace';

// import i18nPlugin from 'plugin-react-i18n';
// import i18nConfig from './i18nConfig';
// import monacoEditorPlugin from 'vite-plugin-monaco-editor';
// const env = loadEnv('development', process.cwd(), '')

// https://vitejs.dev/config/
export default defineConfig({
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
        parserOpts: {
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            // ['plugin-transform-class-properties', { loose: true }],

            ['@babel/plugin-proposal-class-properties', { loose: true }]
            // 'decorators-legacy', 'classProperties'
          ]
        }
      }
    }),
    // svgr({
    //   exportAsDefault: true,
    //   svgrOptions: {
    //     svgProps: {
    //       className: 'icon'
    //     },
    //     prettier: false,
    //     dimensions: false
    //   }
    // }),
    monacoEditorPlugin({}),
    // replace({
    //   __editor_i18n: !!I18N
    // })
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [],
    },
    include: [
      `monaco-editor/esm/vs/language/json/json.worker`,
      `monaco-editor/esm/vs/language/css/css.worker`,
      `monaco-editor/esm/vs/language/html/html.worker`,
      `monaco-editor/esm/vs/language/typescript/ts.worker`,
      `monaco-editor/esm/vs/editor/editor.worker`
    ],
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    }
  }
});
