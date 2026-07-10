import { motion, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { ContactModule } from '../features/contact/ContactModule';
import { HeroModule } from '../features/hero/HeroModule';
import { ProfileModule } from '../features/profile/ProfileModule';
import { WorkModule } from '../features/work/WorkModule';
import { usePortfolioRuntime } from './usePortfolioRuntime';
import { IntroOverlay } from './IntroOverlay';
import './app-shell.css';

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const isContactPage = window.location.pathname.replace(/\/$/, '') === '/contact';

  usePortfolioRuntime({ rootRef, reducedMotion });

  return (
    <motion.div
      ref={rootRef}
      className="site-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
    >
      <IntroOverlay reducedMotion={reducedMotion} />
      <a className="skip-link" href={isContactPage ? '#contact-details' : '#work'}>
        Skip to content
      </a>
      <SiteHeader isContactPage={isContactPage} />
      <main>
        {isContactPage ? (
          <ContactModule standalone />
        ) : (
          <>
            <HeroModule reducedMotion={reducedMotion} />
            <WorkModule />
            <ProfileModule />
            <ContactModule />
          </>
        )}
      </main>
    </motion.div>
  );
}
