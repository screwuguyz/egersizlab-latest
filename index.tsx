import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Dashboard from './components/Dashboard';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {window.location.pathname.includes('dashboard') ? <Dashboard /> : <App />}
  </React.StrictMode>
);
