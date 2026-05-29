import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const routes = {
  '/': 'home',
  '/work': 'work',
  '/about': 'about',
  '/contact': 'contact',
  '/about/workspace': 'workspace',
  '/about/windows': 'windows',
};

const normalizePath = () => {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  return routes[path] ? path : '/';
};

const copy = {
  pl: {
    navWork: 'Projekty',
    navAbout: 'O mnie',
    navContact: 'Kontakt',
    language: 'EN',
    heroKicker: 'Wojciech Sacewicz · Automation & AI Intern',
    heroTitle: 'Automatyzuję powtarzalną pracę.',
    heroBody: 'UiPath, Make.com, MongoDB, REST API i webhooks. Najpierw rozumiem proces, potem tnę ręczną robotę.',
    heroPrimary: 'Zobacz projekty',
    heroSecondary: 'Pobierz CV',
    proofRole: 'Idego',
    proofRoleText: 'Automation & AI Intern',
    proofTime: '40%',
    proofTimeText: 'krótsze generowanie raportów w procesie DOVISTA',
    proofStack: 'UiPath + SAP',
    proofStackText: 'robot RPA i Document Understanding',
    proofLang: 'C1 English',
    proofLangText: 'praca po polsku i angielsku',
    interestTitle: 'Rozbieram proces na części.',
    interestBody: 'Najlepiej działam tam, gdzie ktoś codziennie klika to samo, poprawia dane albo przenosi informacje między systemami.',
    desireTitle: 'Tak pracuję.',
    desireBody: 'Mapa procesu, pierwszy działający flow, potem demo i handoff.',
    stepOne: 'Mapa',
    stepOneBody: 'As-is, to-be, właściciele, wyjątki.',
    stepTwo: 'Automatyzacja',
    stepTwoBody: 'Jeden użyteczny flow przed rozdmuchaniem zakresu.',
    stepThree: 'Dowód',
    stepThreeBody: 'Demo, dokumentacja i jasny wynik.',
    workTitle: 'Wybrane projekty',
    workBody: 'Kod, automatyzacje i wideo. Każde z realnego zadania.',
    stackTitle: 'Narzędzia, nie religia.',
    aboutTitle: 'Computer Science + Econometrics, a po godzinach praktyczne systemy.',
    aboutBody: 'Studiuję na Uniwersytecie Gdańskim. Łączę procesy, dane, low-code i trochę kreatywnej produkcji wideo.',
    contactTitle: 'Masz proces, który wraca co tydzień?',
    contactBody: 'Wyślij mi maila. Lubię zadania, w których trzeba zrozumieć pracę ludzi, a dopiero potem dobrać narzędzie.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    workspaceTitle: 'Setup bez tarcia.',
    workspaceBody: 'Biurko, skróty i tiling mają zniknąć z drogi.',
    windowsTitle: 'Windows bez bałaganu.',
    windowsBody: 'GlazeWM, Flow Launcher, Fences i Windhawk pod szybkie przełączanie.',
    footer: 'sacewi.cz · Gdańsk · automatyzacje, dane, RPA',
  },
  en: {
    navWork: 'Work',
    navAbout: 'About',
    navContact: 'Contact',
    language: 'PL',
    heroKicker: 'Wojciech Sacewicz · Automation & AI Intern',
    heroTitle: 'I automate repeat work.',
    heroBody: 'UiPath, Make.com, MongoDB, REST APIs and webhooks. I map the work first, then remove the manual part.',
    heroPrimary: 'View work',
    heroSecondary: 'Download CV',
    proofRole: 'Idego',
    proofRoleText: 'Automation & AI Intern',
    proofTime: '40%',
    proofTimeText: 'shorter report generation in a DOVISTA process',
    proofStack: 'UiPath + SAP',
    proofStackText: 'RPA robot and Document Understanding',
    proofLang: 'C1 English',
    proofLangText: 'Polish and English work',
    interestTitle: 'I take processes apart.',
    interestBody: 'Best fit: repeated clicks, messy data, and information moving between systems.',
    desireTitle: 'How I work.',
    desireBody: 'Map the process, ship one useful flow, then clean up the demo and handoff.',
    stepOne: 'Map',
    stepOneBody: 'As-is, to-be, owners, edge cases.',
    stepTwo: 'Automate',
    stepTwoBody: 'One useful path before the scope grows.',
    stepThree: 'Prove',
    stepThreeBody: 'Demo, documentation, clear result.',
    workTitle: 'Selected work',
    workBody: 'Code, automation and video. Each came from a real task.',
    stackTitle: 'Tools, not religion.',
    aboutTitle: 'Computer Science + Econometrics, with practical systems after class.',
    aboutBody: 'I study at the University of Gdańsk and work across process mapping, data, low-code and video explainers.',
    contactTitle: 'Got a process that keeps coming back?',
    contactBody: 'Send me an email. I like work where you need to understand the people before choosing the tool.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    workspaceTitle: 'Low-friction setup.',
    workspaceBody: 'Desk, shortcuts and tiling should get out of the way.',
    windowsTitle: 'Windows without mess.',
    windowsBody: 'GlazeWM, Flow Launcher, Fences and Windhawk for fast switching.',
    footer: 'sacewi.cz · Gdańsk · automation, data, RPA',
  },
};

const projects = [
  {
    id: 'gem-hunter',
    title: 'Gem Hunter',
    meta: 'Python · MongoDB · Gemini API',
    body: 'Pipeline do zbierania ofert, parsowania szczegółów i sprawdzania dopasowania do CV.',
    href: 'https://github.com/wojciechsacewicz/Gem-Hunter',
    visual: '/assets/mySetup2.jpg',
    scale: 'large',
  },
  {
    id: 'notification-system',
    title: 'Smart Notifications',
    meta: 'Make.com · Weather API · Calendar · Discord',
    body: 'Osobiste powiadomienia z webhookami, JSON-em i codziennym kontekstem.',
    href: 'https://github.com/wojciechsacewicz/smart-notification-system',
    visual: '/assets/flow launcher.png',
    scale: 'medium',
  },
  {
    id: 'dovista-rpa-animation',
    title: 'DOVISTA RPA explainer',
    meta: 'UiPath · SAP · video handoff',
    body: 'Wideo tłumaczące proces RPA bez wysyłania ludzi do technicznej dokumentacji.',
    video: '/assets/businessAnimationCutForPortfolio.mp4',
    poster: '/assets/dovista-poster.jpg',
    scale: 'wide',
  },
  {
    id: 'cyberwizja',
    title: 'CyberWizja',
    meta: 'Zwolnieni z Teorii finalist',
    body: 'Edukacyjna kampania o bezpieczeństwie w sieci. Prowadziłem wideo i grafiki.',
    video: '/assets/cyberwizjaIntro.mp4',
    poster: '/assets/cyberwizja-poster.jpg',
    href: 'https://www.tiktok.com/@cyberwizja',
    scale: 'medium',
  },
];

const stacks = [
  ['Automation', 'UiPath Studio, n8n, Make.com'],
  ['Data + integration', 'MongoDB, JSON, REST APIs, webhooks, SQL basics'],
  ['Process', 'as-is / to-be mapping, BPMN, UML, documentation'],
  ['Creative', 'DaVinci Resolve, Adobe Creative Cloud, short explainers'],
];

const workspaceImages = [
  ['/assets/mySetup1.jpg', 'desk setup, front angle'],
  ['/assets/mySetup2.jpg', 'keyboard and headphones'],
  ['/assets/myPC.jpg', 'pc build'],
];

const windowsImages = [
  ['/assets/my desktop.png', 'desktop'],
  ['/assets/glazewm showcase.png', 'GlazeWM tiling'],
  ['/assets/flow launcher.png', 'Flow Launcher'],
  ['/assets/rolled fence.png', 'Fences collapsed'],
  ['/assets/unrolled fence.png', 'Fences expanded'],
  ['/assets/windhawk mod list.png', 'Windhawk mods'],
  ['/assets/file explorer this pc.png', 'File explorer'],
];

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio-lang') || 'pl');
  const [lightbox, setLightbox] = useState(null);
  const shell = useRef(null);
  const t = copy[lang];
  const page = routes[normalizePath()];

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('portfolio-lang', lang);
  }, [lang]);

  useEffect(() => {
    let frame = 0;

    const onPointerMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
        document.documentElement.style.setProperty('--my', `${event.clientY}px`);
      });
    };

    window.addEventListener('pointermove', onPointerMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

      const mm = gsap.matchMedia();

      gsap.from('[data-hero-copy] > *', {
        y: 42,
        opacity: 0,
        duration: 1.05,
        ease: 'power3.out',
        stagger: 0.08,
      });

      if (shell.current.querySelector('[data-orbit]')) {
        gsap.to('[data-orbit]', {
          rotate: 360,
          duration: 32,
          ease: 'none',
          repeat: -1,
        });
      }

      gsap.to('[data-scroll-progress]', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
        },
      });

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 70,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
          },
        });
      });

      gsap.utils.toArray('[data-word-reveal]').forEach((el) => {
        const words = el.textContent.trim().split(/\s+/);
        el.innerHTML = words.map((word) => `<span>${word}</span>`).join(' ');
        gsap.fromTo(
          el.querySelectorAll('span'),
          { opacity: 0.16, y: 16 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 72%',
              end: 'bottom 42%',
              scrub: 0.7,
            },
          },
        );
      });

      if (shell.current.querySelector('[data-hero]') && shell.current.querySelector('[data-hero-media]')) {
        gsap.to('[data-hero-media]', {
          yPercent: 14,
          scale: 1.08,
          scrollTrigger: {
            trigger: '[data-hero]',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      mm.add('(min-width: 940px)', () => {
        if (shell.current.querySelector('[data-work-motion]') && shell.current.querySelector('[data-lane]')) {
          gsap.to('[data-lane]', {
            xPercent: -42,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-work-motion]',
              start: 'top top',
              end: '+=1700',
              pin: true,
              scrub: 1,
            },
          });
        }

        gsap.utils.toArray('[data-stack-card]').forEach((card, index) => {
          gsap.to(card, {
            y: index * -28,
            scale: 1 - index * 0.025,
            scrollTrigger: {
              trigger: card,
              start: 'top 68%',
              end: 'bottom 28%',
              scrub: true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: shell, dependencies: [page, lang], revertOnUpdate: true },
  );

  const content = useMemo(() => {
    if (page === 'work') return <WorkPage t={t} />;
    if (page === 'about') return <AboutPage t={t} setLightbox={setLightbox} />;
    if (page === 'contact') return <ContactPage t={t} />;
    if (page === 'workspace') return <GalleryPage title={t.workspaceTitle} body={t.workspaceBody} images={workspaceImages} setLightbox={setLightbox} />;
    if (page === 'windows') return <GalleryPage title={t.windowsTitle} body={t.windowsBody} images={windowsImages} setLightbox={setLightbox} />;
    return <HomePage t={t} setLightbox={setLightbox} />;
  }, [page, t]);

  return (
    <div ref={shell} className="site-shell">
      <div className="scroll-progress" data-scroll-progress aria-hidden="true" />
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Header lang={lang} setLang={setLang} t={t} />
      <main id="content">{content}</main>
      <Footer t={t} />
      {lightbox && <Lightbox image={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

function Header({ lang, setLang, t }) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="sacewi.cz home">
        <span>sacewi.cz</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="/work">{t.navWork}</a>
        <a href="/about">{t.navAbout}</a>
        <a href="/contact">{t.navContact}</a>
      </nav>
      <button className="lang-toggle" type="button" onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}>
        {t.language}
      </button>
    </header>
  );
}

function HomePage({ t, setLightbox }) {
  return (
    <>
      <section className="hero" data-hero>
        <div className="hero-visual" data-hero-media>
          <img src="/assets/mySetup2.jpg" alt="Desk with keyboard and headphones" />
          <div className="scan-field" aria-hidden="true">
            {Array.from({ length: 40 }).map((_, index) => (
              <span key={index} style={{ '--d': `${index * 0.035}s` }} />
            ))}
          </div>
        </div>
        <div className="hero-copy" data-hero-copy>
          <p className="kicker">{t.heroKicker}</p>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroBody}</p>
          <div className="button-row">
            <a className="button primary" href="/work">
              {t.heroPrimary}
            </a>
            <a className="button ghost" href="/assets/CV_censored_github_version.pdf" target="_blank" rel="noreferrer">
              {t.heroSecondary}
            </a>
          </div>
        </div>
        <div className="orbit" data-orbit aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <ProofStrip t={t} />

      <section className="statement chapter">
        <div>
          <h2 data-word-reveal>{t.interestTitle}</h2>
        </div>
        <p data-reveal>{t.interestBody}</p>
      </section>

      <WorkMotion t={t} />
      <ProcessSection t={t} />
      <StackSection t={t} />
      <WorkspacePreview t={t} setLightbox={setLightbox} />
      <ContactBand t={t} />
    </>
  );
}

function ProofStrip({ t }) {
  const items = [
    [t.proofRole, t.proofRoleText],
    [t.proofTime, t.proofTimeText],
    [t.proofStack, t.proofStackText],
    [t.proofLang, t.proofLangText],
  ];

  return (
    <section className="proof-strip" aria-label="Proof points">
      {items.map(([title, body]) => (
        <article key={title} data-reveal>
          <strong>{title}</strong>
          <span>{body}</span>
        </article>
      ))}
    </section>
  );
}

function WorkMotion({ t }) {
  return (
    <section className="work-motion" data-work-motion>
      <div className="motion-heading">
        <h2>{t.workTitle}</h2>
        <p>{t.workBody}</p>
      </div>
      <div className="motion-lane" data-lane>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const content = (
    <article className={`project-tile ${project.scale}`} data-reveal>
      <div className="project-media">
        <img src={project.poster || project.visual} alt="" loading="lazy" />
      </div>
      <div className="project-copy">
        <span>{project.meta}</span>
        <h3>{project.title}</h3>
        <p>{project.body}</p>
      </div>
    </article>
  );

  if (!project.href) return content;

  return (
    <a className="project-link-wrap" href={project.href} target="_blank" rel="noreferrer">
      {content}
    </a>
  );
}

function ProcessSection({ t }) {
  const steps = [
    [t.stepOne, t.stepOneBody],
    [t.stepTwo, t.stepTwoBody],
    [t.stepThree, t.stepThreeBody],
  ];

  return (
    <section className="process chapter">
      <div className="process-intro" data-reveal>
        <h2>{t.desireTitle}</h2>
        <p>{t.desireBody}</p>
      </div>
      <div className="stack-cards">
        {steps.map(([title, body], index) => (
          <article key={title} data-stack-card>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StackSection({ t }) {
  return (
    <section className="stack-section chapter">
      <div data-reveal>
        <h2>{t.stackTitle}</h2>
      </div>
      <div className="stack-grid">
        {stacks.map(([title, body]) => (
          <article key={title} data-reveal>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WorkspacePreview({ t, setLightbox }) {
  return (
    <section className="workspace-preview chapter">
      <div data-reveal>
        <h2>{t.workspaceTitle}</h2>
        <p>{t.workspaceBody}</p>
        <a className="text-action" href="/about/workspace">
          Open workspace
        </a>
      </div>
      <div className="image-stack">
        {workspaceImages.map(([src, alt]) => (
          <button key={src} type="button" onClick={() => setLightbox([src, alt])} data-reveal>
            <img src={src} alt={alt} loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  );
}

function ContactBand({ t }) {
  return (
    <section className="contact-band chapter">
      <div data-reveal>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactBody}</p>
      </div>
      <div className="button-row" data-reveal>
        <a className="button primary" href="mailto:wojciechsacewicz@outlook.com">
          {t.email}
        </a>
        <a className="button ghost" href="https://linkedin.com/in/wojciech-sacewicz" target="_blank" rel="noreferrer">
          {t.linkedin}
        </a>
      </div>
    </section>
  );
}

function WorkPage({ t }) {
  return (
    <PageShell title={t.workTitle} body={t.workBody}>
      <div className="work-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <section className="video-detail" id="dovista-rpa-animation">
        <h2>DOVISTA RPA explainer</h2>
        <video controls playsInline preload="metadata" poster="/assets/dovista-poster.jpg">
          <source src="/assets/businessAnimationCutForPortfolio.mp4" type="video/mp4" />
        </video>
      </section>
      <section className="video-detail" id="cyberwizja">
        <h2>CyberWizja clips</h2>
        <div className="video-pair">
          <video controls playsInline preload="metadata" poster="/assets/cyberwizja-poster.jpg">
            <source src="/assets/cyberwizjaIntro.mp4" type="video/mp4" />
          </video>
          <video controls playsInline preload="metadata" poster="/assets/cyberwizja-poster.jpg">
            <source src="/assets/cyberwizja5wtyczek.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </PageShell>
  );
}

function AboutPage({ t, setLightbox }) {
  return (
    <PageShell title={t.aboutTitle} body={t.aboutBody}>
      <section className="about-grid">
        <article data-reveal>
          <h2>Current</h2>
          <p>Idego · Automation & AI Intern · Apr 2026 - Present</p>
        </article>
        <article data-reveal>
          <h2>Education</h2>
          <p>University of Gdańsk · Computer Science and Econometrics · expected 2027</p>
        </article>
        <article data-reveal>
          <h2>DOVISTA</h2>
          <p>UiPath robot for SAP report workflows. 40% shorter report generation and fewer recurring manual data-entry errors.</p>
        </article>
      </section>
      <WorkspacePreview t={t} setLightbox={setLightbox} />
    </PageShell>
  );
}

function ContactPage({ t }) {
  return (
    <PageShell title={t.contactTitle} body={t.contactBody}>
      <section className="contact-grid">
        <a href="mailto:wojciechsacewicz@outlook.com">{t.email}<span>wojciechsacewicz@outlook.com</span></a>
        <a href="https://linkedin.com/in/wojciech-sacewicz" target="_blank" rel="noreferrer">{t.linkedin}<span>linkedin.com/in/wojciech-sacewicz</span></a>
        <a href="https://github.com/wojciechsacewicz" target="_blank" rel="noreferrer">{t.github}<span>github.com/wojciechsacewicz</span></a>
        <a href="/assets/CV_censored_github_version.pdf" target="_blank" rel="noreferrer">CV<span>PDF</span></a>
      </section>
    </PageShell>
  );
}

function GalleryPage({ title, body, images, setLightbox }) {
  return (
    <PageShell title={title} body={body}>
      <div className="gallery-grid">
        {images.map(([src, alt]) => (
          <button key={src} type="button" onClick={() => setLightbox([src, alt])} data-reveal>
            <img src={src} alt={alt} loading="lazy" />
            <span>{alt}</span>
          </button>
        ))}
      </div>
    </PageShell>
  );
}

function PageShell({ title, body, children }) {
  return (
    <section className="page-shell">
      <header className="page-hero" data-hero-copy>
        <h1>{title}</h1>
        <p>{body}</p>
      </header>
      {children}
    </section>
  );
}

function Lightbox({ image, onClose }) {
  const [src, alt] = image;
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button type="button" onClick={onClose}>Close</button>
      <img src={src} alt={alt} />
    </div>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <p>{t.footer}</p>
      <nav aria-label="Footer navigation">
        <a href="/work">{t.navWork}</a>
        <a href="/about">{t.navAbout}</a>
        <a href="/contact">{t.navContact}</a>
      </nav>
    </footer>
  );
}

export default App;
