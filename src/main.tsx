import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index.less';
import App from './App';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
