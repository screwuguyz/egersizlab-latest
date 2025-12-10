import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Dashboard from './components/Dashboard';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const AppRouter: React.FC = () => {
  const [isDashboard, setIsDashboard] = useState(() => {
    return window.location.pathname.includes('dashboard') || window.location.hash === '#dashboard';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setIsDashboard(window.location.pathname.includes('dashboard') || window.location.hash === '#dashboard');
    };

    window.addEventListener('hashchange', handleHashChange);
    // İlk yüklemede de kontrol et
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return <React.StrictMode>{isDashboard ? <Dashboard /> : <App />}</React.StrictMode>;
};

const root = ReactDOM.createRoot(rootElement);
root.render(<AppRouter />);
