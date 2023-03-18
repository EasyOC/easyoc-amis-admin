import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

// ReactDOM.render(<APP />, document.getElementById('root'));
//react 18
createRoot(document.getElementById('root') as HTMLElement).render(<App />);
