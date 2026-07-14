import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './app/App';
import './styles/foundation.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Portfolio root element was not found.');
}

const application = (
  <StrictMode>
    <App pathname={window.location.pathname} />
  </StrictMode>
);

if (rootElement.dataset.renderMode === 'ssr') {
  hydrateRoot(rootElement, application);
} else {
  rootElement.textContent = '';
  rootElement.dataset.renderMode = 'client';
  createRoot(rootElement).render(application);
}
