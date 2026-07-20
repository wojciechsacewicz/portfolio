import { useEffect, useState } from 'react';
import './site-header.css';

interface SiteHeaderProps {
  readonly isSubpage: boolean;
}

const primaryNavigationItems = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '#contact' },
] as const;

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
        {primaryNavigationItems.map((item) => (
          <a
            key={item.href}
            href={isSubpage && item.href.startsWith('#') ? `/${item.href}` : item.href}
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
