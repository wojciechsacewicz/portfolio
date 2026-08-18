import { motion, useReducedMotion } from 'motion/react';
import { portfolioContent } from '../../content/portfolioContent';
import './hero-module.css';

const heroTransition = { duration: 0.72, ease: [0.22, 1, 0.36, 1] } as const;

const heroLinks = [
  { label: 'View projects', href: '#work', external: false },
  { label: 'GitHub', href: 'https://github.com/wojciechsacewicz', external: true },
  { label: 'Email', href: 'mailto:wojciechsacewicz@outlook.com', external: false },
] as const;

export function HeroModule() {
  const reducedMotion = Boolean(useReducedMotion());
  const initial = reducedMotion ? false : { opacity: 0, y: 22 };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <motion.div
        className="hero-copy"
        initial={initial}
        animate={{ opacity: 1, y: 0 }}
        transition={heroTransition}
      >
        <div className="hero-person">
          <img
            src="/assets/wojtek-profile.png"
            alt="Portrait of Wojciech Sacewicz"
            width="64"
            height="64"
          />
          <div>
            <p className="hero-kicker">AI-native product engineer · Tricity, Poland</p>
            <p className="hero-status">Building at IDEGO</p>
          </div>
        </div>

        <h1 id="hero-title">Wojciech Sacewicz</h1>
        <p className="hero-summary">I build web products, internal tools and automation.</p>
        <p className="hero-detail">
          I work best in the messy middle: unclear requirements, unfamiliar codebases and the
          last 10% before something is actually usable.
        </p>

        <nav className="hero-actions" aria-label="Portfolio shortcuts">
          {heroLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>

        <dl className="hero-context" aria-label="Current professional context">
          <div>
            <dt>Now</dt>
            <dd>{portfolioContent.person.currentJobTitle} · IDEGO</dd>
          </div>
          <div>
            <dt>Study</dt>
            <dd>{portfolioContent.person.education}</dd>
          </div>
        </dl>
      </motion.div>
    </section>
  );
}
