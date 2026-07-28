import './site-header.css';

interface SiteHeaderProps {
  readonly isSubpage: boolean;
}

const primaryNavigationItems = [
  { label: 'Projects', href: '#work' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const;

function resolveNavigationHref(href: string, isSubpage: boolean): string {
  return isSubpage && href.startsWith('#') ? `/${href}` : href;
}

export function SiteHeader({ isSubpage }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="wordmark" href={isSubpage ? '/' : '#top'} aria-label="Wojciech Sacewicz home">
          W/S
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {primaryNavigationItems.map((item) => (
            <a key={item.href} href={resolveNavigationHref(item.href, isSubpage)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
