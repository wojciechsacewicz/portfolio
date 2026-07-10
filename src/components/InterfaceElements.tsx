import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface ArrowIconProps {
  readonly size?: number;
}

export function ArrowIcon({ size = 18 }: ArrowIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width={size}
      height={size}
      focusable="false"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export function CopyIcon({ size = 18 }: ArrowIconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} focusable="false">
      <rect x="8" y="8" width="11" height="11" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
}

export function ExternalLinkIcon({ size = 18 }: ArrowIconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} focusable="false">
      <path d="M14 5h5v5M19 5l-8 8" />
      <path d="M17 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly children: ReactNode;
  readonly variant?: 'primary' | 'secondary' | 'text';
  readonly showArrow?: boolean;
}

export function ActionLink({
  children,
  className = '',
  variant = 'text',
  showArrow = true,
  ...anchorProps
}: ActionLinkProps) {
  const classes = ['action-link', `action-link-${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={classes} {...anchorProps}>
      <span>{children}</span>
      {showArrow ? <ArrowIcon /> : null}
    </a>
  );
}

interface SectionHeadingProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description?: string;
  readonly compact?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  compact = false,
}: SectionHeadingProps) {
  const className = compact ? 'section-heading section-heading-compact' : 'section-heading';

  return (
    <header className={className} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}
