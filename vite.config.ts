import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import autoExternal from 'rollup-plugin-auto-external';
//@ts-ignore
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

function transpileDynamicImportForCJS() {
  return {
    name: 'transpile-dynamic-import-for-cjs',
    renderDynamicImport({ format, targetModuleId }) {
      if (format !== 'cjs') {
        return null;
      }

      return {
        left: 'Promise.resolve().then(function() {return new Promise(function(fullfill) {require([',
        right:
          '], function(mod) {fullfill(require("tslib").__importStar(mod))})})})'
      };
    }
  };
}
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 2688,
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: [
            'decorators-legacy', 'classProperties'
          ]
        }
      }
    }),

    svgr({
      exportAsDefault: true,
      svgrOptions: {
        svgProps: {
          className: 'icon'
        },
        prettier: false,
        dimensions: false
      }
    }),
    monacoEditorPlugin({}),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }, plugins: [
        transpileDynamicImportForCJS(),
        autoExternal(),
        json(),
        commonjs({
          sourceMap: false
        }),
      ]
    }
  }
});

