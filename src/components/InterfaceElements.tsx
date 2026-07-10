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
