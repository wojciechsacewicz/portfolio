import { useEffect, useState } from 'react';
import { navigationItems } from '../content/portfolioContent';
import { ActionLink } from './InterfaceElements';
import './site-header.css';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Wojciech Sacewicz home">
        WS<span>.</span>
      </a>

      <button
        className="menu-button"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="site-navigation"
        onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      <nav
        id="site-navigation"
        className={isMenuOpen ? 'site-nav is-open' : 'site-nav'}
        aria-label="Primary navigation"
      >
        {navigationItems.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
      </nav>

      <ActionLink
        className="header-cta"
        href="mailto:wojciechsacewicz@outlook.com"
      >
        Start a conversation
      </ActionLink>
    </header>
  );
}
