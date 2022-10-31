import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DataListProvider } from './context/IssueContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataListProvider>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </DataListProvider>
);
