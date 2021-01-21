import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import App from './app';
import { DataProvider } from './components/purchase-request-form/data-contex';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>, 
  document.getElementById('root')
);
