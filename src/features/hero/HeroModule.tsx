import { motion, useReducedMotion } from 'motion/react';
import './hero-module.css';

const heroTransition = { duration: 0.85, ease: [0.22, 1, 0.36, 1] } as const;

export function HeroModule() {
  const reducedMotion = Boolean(useReducedMotion());
  const initial = reducedMotion ? false : { opacity: 0, y: 28 };

  return (
    <section className="hero" id="top">
      <div className="hero-orbit" aria-hidden="true">
        <span />
      </div>

      <motion.div
        className="hero-copy"
        initial={initial}
        animate={{ opacity: 1, y: 0 }}
        transition={heroTransition}
      >
        <p className="hero-kicker">AI-native product engineer · Tricity, Poland</p>
        <h1>Wojciech Sacewicz</h1>
        <p className="hero-summary">
          I build web products, internal tools and automation.
        </p>

        <nav className="hero-actions" aria-label="Portfolio shortcuts">
          <a href="#work">View projects</a>
          <a href="mailto:wojciechsacewicz@outlook.com">Email me</a>
        </nav>
      </motion.div>
    </section>
  );
}
