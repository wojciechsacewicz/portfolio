import { motion, useReducedMotion } from 'motion/react';
import './profile-module.css';

const profileLinks = [
  { label: 'GitHub', href: 'https://github.com/wojciechsacewicz', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/wojciech-sacewicz', external: true },
  { label: 'Resume', href: '/resume', external: false },
] as const;

export function ProfileModule() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section className="profile-module" id="about">
      <motion.div
        className="profile-intro"
        initial={reducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>Have a role or project in mind?</p>
        <a className="profile-email" href="mailto:wojciechsacewicz@outlook.com">
          wojciechsacewicz@outlook.com
        </a>
      </motion.div>

      <footer className="site-footer">
        <span>Wojciech Sacewicz © 2026</span>
        <nav aria-label="Profile links">
          {profileLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <span>Tricity, Poland</span>
      </footer>
    </section>
  );
}
