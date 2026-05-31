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
    heroBody: 'Buduję małe automatyzacje i aplikacje, które zdejmują z ludzi powtarzalne klikanie: raporty, dane, formularze i integracje.',
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
    interestTitle: 'Najpierw patrzę, gdzie ucieka czas.',
    interestBody: 'Jeśli ktoś codziennie przekleja dane, poprawia raport albo przenosi informacje między systemami, zwykle da się z tego zrobić prostszy sposób pracy.',
    desireTitle: 'Jak wygląda współpraca',
    desireBody: 'Bierzemy jedno męczące zadanie, robię pierwszą wersję i sprawdzamy ją na prawdziwych danych.',
    stepOne: 'Zadanie',
    stepOneBody: 'Co się powtarza, kto tego używa i gdzie proces się wywraca.',
    stepTwo: 'Pierwsza wersja',
    stepTwoBody: 'Ma działać na jednym sensownym przypadku, zanim dopiszemy resztę.',
    stepThree: 'Oddanie',
    stepThreeBody: 'Demo, krótka instrukcja i jasne ograniczenia.',
    workTitle: 'Wybrane projekty',
    workBody: 'Kilka rzeczy z automatyzacji, danych i wideo.',
    stackTitle: 'Mój zestaw narzędzi',
    aboutTitle: 'Automatyzacje, dane i trochę wideo.',
    aboutBody: 'Studiuję Informatykę i Ekonometrię na Uniwersytecie Gdańskim. W Idego pracuję przy automatyzacjach i lubię projekty, które łączą proces, dane i sensowny interfejs.',
    aboutCurrentTitle: 'Teraz',
    aboutCurrentBody: 'Idego · Automation & AI Intern · od kwietnia 2026',
    aboutEducationTitle: 'Studia',
    aboutEducationBody: 'Uniwersytet Gdański · Informatyka i Ekonometria · planowo 2027',
    aboutDovistaTitle: 'DOVISTA',
    aboutDovistaBody: 'Robot UiPath do raportów z SAP. Generowanie raportu krótsze o 40% i mniej powtarzalnego przepisywania danych.',
    contactTitle: 'Robisz codziennie coś, co cię męczy?',
    contactBody: 'Opisz mi proces. Jeśli automatyzacja albo mała aplikacja może go uprościć, pomogę ułożyć pierwszą wersję.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    workspaceTitle: 'Mój setup',
    workspaceBody: 'Biurko, sprzęt i skróty, których używam do pracy.',
    workspaceLink: 'Zobacz setup',
    windowsTitle: 'Mój Windows',
    windowsBody: 'GlazeWM, Flow Launcher, Fences i Windhawk w praktycznym setupie.',
    footer: 'sacewi.cz · Gdańsk · automatyzacje, dane, RPA',
  },
  en: {
    navWork: 'Work',
    navAbout: 'About',
    navContact: 'Contact',
    language: 'PL',
    heroKicker: 'Wojciech Sacewicz · Automation & AI Intern',
    heroTitle: 'I automate repeat work.',
    heroBody: 'I build small automations and apps that remove repetitive clicking: reports, data cleanup, forms and integrations.',
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
    interestTitle: 'I look for the work that wastes time.',
    interestBody: 'If someone copies data, fixes a report, or moves information between tools every day, there is usually a simpler flow to build.',
    desireTitle: 'How we can work',
    desireBody: 'We pick one annoying task, I build a first version, and we test it on real data.',
    stepOne: 'Task',
    stepOneBody: 'What repeats, who uses it, and where the process breaks.',
    stepTwo: 'First version',
    stepTwoBody: 'One useful case should work before the scope grows.',
    stepThree: 'Handoff',
    stepThreeBody: 'Demo, short notes, and clear limits.',
    workTitle: 'Selected work',
    workBody: 'A few things I have built across automation, data and video.',
    stackTitle: 'My tools',
    aboutTitle: 'Automation, data, and a bit of video.',
    aboutBody: 'I study Computer Science and Econometrics at the University of Gdańsk. At Idego I work on automation, and I like projects that connect process, data, and a usable interface.',
    aboutCurrentTitle: 'Now',
    aboutCurrentBody: 'Idego · Automation & AI Intern · since April 2026',
    aboutEducationTitle: 'Studies',
    aboutEducationBody: 'University of Gdańsk · Computer Science and Econometrics · expected 2027',
    aboutDovistaTitle: 'DOVISTA',
    aboutDovistaBody: 'UiPath robot for SAP reports. 40% shorter report generation and fewer repeated data-entry errors.',
    contactTitle: 'Do you do something annoying every day?',
    contactBody: 'Send me the process. If automation or a small app can make it easier, I can help shape the first version.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    workspaceTitle: 'My setup',
    workspaceBody: 'Desk, gear, and shortcuts I use for daily work.',
    workspaceLink: 'View setup',
    windowsTitle: 'My Windows setup',
    windowsBody: 'GlazeWM, Flow Launcher, Fences and Windhawk in my daily setup.',
    footer: 'sacewi.cz · Gdańsk · automation, data, RPA',
  },
};

const projects = [
  {
    id: 'gem-hunter',
    title: 'Gem Hunter',
    meta: 'Python · MongoDB · Gemini API',
    body: {
      pl: 'Pipeline do zbierania ofert, parsowania szczegółów i sprawdzania dopasowania do CV.',
      en: 'Pipeline for collecting offers, parsing details, and checking fit against a CV.',
    },
    href: 'https://github.com/wojciechsacewicz/Gem-Hunter',
    visual: '/assets/mySetup2.jpg',
    scale: 'large',
  },
  {
    id: 'notification-system',
    title: 'Smart Notifications',
    meta: 'Make.com · Weather API · Calendar · Discord',
    body: {
      pl: 'Osobiste powiadomienia z webhookami, JSON-em i codziennym kontekstem.',
      en: 'Personal notifications built with webhooks, JSON, and daily context.',
    },
    href: 'https://github.com/wojciechsacewicz/smart-notification-system',
    visual: '/assets/flow launcher.png',
    scale: 'medium',
  },
  {
    id: 'dovista-rpa-animation',
    title: 'DOVISTA RPA explainer',
    meta: 'UiPath · SAP · video handoff',
    body: {
      pl: 'Wideo tłumaczące proces RPA bez wysyłania ludzi do technicznej dokumentacji.',
      en: 'Video explaining an RPA process without sending people into technical docs.',
    },
    video: '/assets/businessAnimationCutForPortfolio.mp4',
    poster: '/assets/dovista-poster.jpg',
    scale: 'wide',
  },
  {
    id: 'cyberwizja',
    title: 'CyberWizja',
    meta: 'Zwolnieni z Teorii finalist',
    body: {
      pl: 'Edukacyjna kampania o bezpieczeństwie w sieci. Prowadziłem wideo i grafiki.',
      en: 'Educational campaign about online safety. I handled video and graphics.',
    },
    video: '/assets/cyberwizjaIntro.mp4',
    poster: '/assets/cyberwizja-poster.jpg',
    href: 'https://www.tiktok.com/@cyberwizja',
    scale: 'medium',
  },
];

const stacks = {
  pl: [
    ['Automatyzacja', 'UiPath Studio, n8n, Make.com'],
    ['Dane i integracje', 'MongoDB, JSON, REST API, webhooks, podstawy SQL'],
    ['Proces', 'mapy as-is / to-be, BPMN, UML, dokumentacja'],
    ['Wideo i grafika', 'DaVinci Resolve, Adobe Creative Cloud, krótkie explainery'],
  ],
  en: [
    ['Automation', 'UiPath Studio, n8n, Make.com'],
    ['Data + integration', 'MongoDB, JSON, REST APIs, webhooks, SQL basics'],
    ['Process', 'as-is / to-be mapping, BPMN, UML, documentation'],
    ['Video + design', 'DaVinci Resolve, Adobe Creative Cloud, short explainers'],
  ],
};

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
    },
    { scope: shell, dependencies: [page, lang], revertOnUpdate: true },
  );

  const content = useMemo(() => {
    if (page === 'work') return <WorkPage t={t} lang={lang} />;
    if (page === 'about') return <AboutPage t={t} setLightbox={setLightbox} />;
    if (page === 'contact') return <ContactPage t={t} />;
    if (page === 'workspace') return <GalleryPage title={t.workspaceTitle} body={t.workspaceBody} images={workspaceImages} setLightbox={setLightbox} />;
    if (page === 'windows') return <GalleryPage title={t.windowsTitle} body={t.windowsBody} images={windowsImages} setLightbox={setLightbox} />;
    return <HomePage t={t} lang={lang} setLightbox={setLightbox} />;
  }, [page, t, lang]);

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

function HomePage({ t, lang, setLightbox }) {
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
          <h2 data-reveal>{t.interestTitle}</h2>
        </div>
        <p data-reveal>{t.interestBody}</p>
      </section>

      <WorkMotion t={t} lang={lang} />
      <ProcessSection t={t} />
      <StackSection t={t} lang={lang} />
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

function WorkMotion({ t, lang }) {
  return (
    <section className="work-motion" data-work-motion>
      <div className="motion-heading">
        <h2>{t.workTitle}</h2>
        <p>{t.workBody}</p>
      </div>
      <div className="motion-lane" data-lane>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, lang }) {
  const body = typeof project.body === 'string' ? project.body : project.body[lang] || project.body.pl;

  const content = (
    <article className={`project-tile ${project.scale}`} data-reveal>
      <div className="project-media">
        <img src={project.poster || project.visual} alt="" loading="lazy" />
      </div>
      <div className="project-copy">
        <span>{project.meta}</span>
        <h3>{project.title}</h3>
        <p>{body}</p>
      </div>
    </article>
  );

  if (!project.href) return content;

  return (
    <a className={`project-link-wrap ${project.scale}`} href={project.href} target="_blank" rel="noreferrer">
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
          <article key={title} data-reveal>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StackSection({ t, lang }) {
  return (
    <section className="stack-section chapter">
      <div data-reveal>
        <h2>{t.stackTitle}</h2>
      </div>
      <div className="stack-grid">
        {stacks[lang].map(([title, body]) => (
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
          {t.workspaceLink}
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

function WorkPage({ t, lang }) {
  return (
    <PageShell title={t.workTitle} body={t.workBody}>
      <div className="work-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} lang={lang} />
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
          <h2>{t.aboutCurrentTitle}</h2>
          <p>{t.aboutCurrentBody}</p>
        </article>
        <article data-reveal>
          <h2>{t.aboutEducationTitle}</h2>
          <p>{t.aboutEducationBody}</p>
        </article>
        <article data-reveal>
          <h2>{t.aboutDovistaTitle}</h2>
          <p>{t.aboutDovistaBody}</p>
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
