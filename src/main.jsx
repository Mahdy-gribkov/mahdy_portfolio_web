import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import Portfolio from './Portfolio';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider> {/* Wrap your application with HelmetProvider */}
      <Portfolio />
    </HelmetProvider>
  </React.StrictMode>
);