import { useEffect, useState } from 'react';
import { navigationItems } from '../content/portfolioContent';
import { ActionLink } from './InterfaceElements';
import './site-header.css';

interface SiteHeaderProps {
  readonly isSubpage: boolean;
}

export function SiteHeader({ isSubpage }: SiteHeaderProps) {
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
      <a className="wordmark" href={isSubpage ? '/' : '#top'} aria-label="Wojciech Sacewicz home">
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
          <a
            key={item.href}
            href={isSubpage && item.href.startsWith('#') ? `/${item.href}` : item.href}
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
        <a href="/resume" onClick={closeMenu}>Resume</a>
      </nav>

      <ActionLink
        className="header-cta"
        href={isSubpage ? '/' : '/contact'}
      >
        {isSubpage ? 'Back to portfolio' : 'Contact'}
      </ActionLink>
    </header>
  );
}
