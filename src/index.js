import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './config/config' // FCL config
import './index.css';

console.log(`Started on: ${process.env.REACT_APP_ENV}`);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
