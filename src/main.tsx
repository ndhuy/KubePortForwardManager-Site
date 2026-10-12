import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import { SITE } from './site';
import './styles.css';

// Every route is prerendered to static HTML (scripts/prerender.mjs); the client hydrates it.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <BrowserRouter basename={SITE.basePath}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
