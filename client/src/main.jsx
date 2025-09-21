import { HelmetProvider } from "react-helmet-async";
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';  // Removed .tsx extension
import './index.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </HelmetProvider>
);
