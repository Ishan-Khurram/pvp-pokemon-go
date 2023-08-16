import React from 'react';
import ReactDOM from 'react-dom/client';
import Links from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Links />
  </React.StrictMode>
);

reportWebVitals();
