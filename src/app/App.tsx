import { motion, useReducedMotion } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { ContactModule } from '../features/contact/ContactModule';
import {
  CaseStudyPage,
  DiscoveryModule,
  NotFoundPage,
  ResumePage,
} from '../features/discovery/DiscoveryModule';
import { HeroModule } from '../features/hero/HeroModule';
import { ProfileModule } from '../features/profile/ProfileModule';
import { WorkModule } from '../features/work/WorkModule';
import { usePortfolioRuntime } from './usePortfolioRuntime';
import { IntroOverlay } from './IntroOverlay';
import './app-shell.css';

function normalizePathname(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, '');
  return normalized || '/';
}

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const pathname = normalizePathname(window.location.pathname);
  const isHomePage = pathname === '/';
  const isContactPage = pathname === '/contact';
  const isResumePage = pathname === '/resume';
  const caseStudyMatch = pathname.match(/^\/case-studies\/([^/]+)$/);

  usePortfolioRuntime({ rootRef, reducedMotion });

  let content: ReactNode;
  let skipTarget = '#main-content';

  if (isHomePage) {
    skipTarget = '#work';
    content = (
      <>
        <HeroModule />
        <WorkModule />
        <ProfileModule />
        <DiscoveryModule />
        <ContactModule />
      </>
    );
  } else if (isContactPage) {
    skipTarget = '#contact-details';
    content = <ContactModule standalone />;
  } else if (isResumePage) {
    skipTarget = '#resume';
    content = <ResumePage />;
  } else if (caseStudyMatch) {
    content = <CaseStudyPage slug={caseStudyMatch[1]} />;
  } else {
    content = <NotFoundPage />;
  }

  return (
    <motion.div
      ref={rootRef}
      className="site-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
    >
      {isHomePage ? <IntroOverlay reducedMotion={reducedMotion} /> : null}
      <a className="skip-link" href={skipTarget}>
        Skip to content
      </a>
      <SiteHeader isSubpage={!isHomePage} />
      <main id="main-content">{content}</main>
    </motion.div>
  );
}
