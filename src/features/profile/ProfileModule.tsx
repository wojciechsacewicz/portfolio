import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { experience, portfolioContent } from '../../content/portfolioContent';
import './profile-module.css';

const focusAreas = [
  'Product engineering',
  'AI-assisted delivery',
  'Internal tools',
  'Workflow automation',
] as const;

const socialLinks = [
  { label: 'GitHub', href: portfolioContent.person.links.github },
  { label: 'LinkedIn', href: portfolioContent.person.links.linkedin },
] as const;

function Reveal({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className: string;
}) {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ProfileModule() {
  const featuredExperience = experience.slice(0, 2);

  return (
    <section className="profile-module" id="about" aria-label="About and experience">
      <Reveal className="profile-about">
        <header>
          <p className="module-label">About</p>
          <h2>I turn unclear work into usable software.</h2>
        </header>
        <div className="profile-about-copy">
          <p>
            I use AI as a development environment, not as a substitute for engineering judgment.
            My job is to understand the problem, shape the system and verify what ships.
          </p>
          <p>
            I care about product sense, readable code and the details that decide whether a feature
            feels finished.
          </p>
          <ul className="focus-list" aria-label="Primary areas of work">
            {focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="experience-panel">
        <header className="profile-section-heading">
          <p className="module-label">Experience</p>
          <a href="/resume">Full resume <span aria-hidden="true">↗</span></a>
        </header>

        <ol className="experience-list">
          {featuredExperience.map((entry) => (
            <li key={`${entry.company}-${entry.role}`}>
              <time>{entry.period}</time>
              <div>
                <h3>{entry.role}</h3>
                <p className="experience-company">{entry.company}</p>
                <p>{entry.lead}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="profile-presence">
        <div>
          <p className="module-label">Elsewhere</p>
          <h2>Code, context and the work in progress.</h2>
        </div>
        <nav aria-label="Professional profiles">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </Reveal>

      <Reveal className="profile-contact">
        <div>
          <p className="module-label">Contact</p>
          <h2>Have a product that needs finishing?</h2>
          <p>I am open to useful product work and strong engineering teams.</p>
        </div>
        <a className="profile-email" href={portfolioContent.person.links.email}>
          wojciechsacewicz@outlook.com
          <span aria-hidden="true">↗</span>
        </a>
      </Reveal>

      <footer className="site-footer">
        <span>Wojciech Sacewicz © 2026</span>
        <span>Tricity, Poland</span>
      </footer>
    </section>
  );
}
