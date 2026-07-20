import './site-header.css';

interface SiteHeaderProps {
  readonly isSubpage: boolean;
}

const primaryNavigationItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '/resume' },
] as const;

export function SiteHeader({ isSubpage }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="wordmark" href={isSubpage ? '/' : '#top'} aria-label="Wojciech Sacewicz home">
          W/S
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {primaryNavigationItems.map((item) => (
            <a key={item.href} href={isSubpage && item.href.startsWith('#') ? `/${item.href}` : item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
