import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
//@ts-ignore
self.MonacoEnvironment = {
  getWorker: async function (workerId, label) {
    switch (label) {
      case 'json': {
        // @ts-ignore
        const jsonWorker = (
          await import('monaco-editor/esm/vs/language/json/json.worker?worker')
        ).default;
        return new jsonWorker();
      }
      case 'css':
      case 'scss':
      case 'less': {
        // @ts-ignore
        const cssWorker = (
          await import('monaco-editor/esm/vs/language/css/css.worker?worker')
        ).default;
        return new cssWorker();
      }
      case 'html': {
        // @ts-ignore
        const htmlWorker = (
          await import('monaco-editor/esm/vs/language/html/html.worker?worker')
        ).default;
        return new htmlWorker();
      }
      case 'typescript':
      case 'javascript': {
        // @ts-ignore
        const tsWorker = (
          await import(
            'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
          )
        ).default;
        return new tsWorker();
      }
      default: {
        // @ts-ignore
        const EditorWorker = (
          await import('monaco-editor/esm/vs/editor/editor.worker?worker')
        ).default;
        return new EditorWorker();
      }
    }
  }
};
// ReactDOM.render(<APP />, document.getElementById('root'));
//react 18
createRoot(document.getElementById('root') as HTMLElement).render(<App />);
