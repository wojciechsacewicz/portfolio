import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './app/App';

export function render(pathname: string): string {
  return renderToString(
    <StrictMode>
      <App pathname={pathname} />
    </StrictMode>,
  );
}
