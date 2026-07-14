import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/foundation.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Portfolio root element was not found.');
}

rootElement.replaceChildren();
document.getElementById('seo-snapshot-style')?.remove();

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
