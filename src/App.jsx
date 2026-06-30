import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import 'video.js/dist/video-js.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const routes = {
  '/': 'home',
  '/work': 'work',
  '/about': 'about',
  '/contact': 'contact',
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
    navOpen: 'Otwórz menu',
    navClose: 'Zamknij menu',
    skipContent: 'Przejdź do treści',
    language: 'EN',
    heroKicker: 'Wojciech Sacewicz · AI Native Developer',
    heroTitle: 'Zamieniam pomysły w działające narzędzia.',
    heroBody: 'Programuję z agentami AI, szybko prototypuję i lubię pracę blisko ludzi. Jeśli zespół ma pomysł na wewnętrzną aplikację albo proces do uproszczenia, umiem dowieźć pierwszą wersję bez miesięcy czekania.',
    heroPrimary: 'Zobacz projekty',
    heroSecondary: 'Skontaktuj się ze mną',
    proofRole: 'Idego + DOVISTA',
    proofRoleText: 'AI Native Developer w Idego, wcześniej RPA Team Intern w DOVISTA',
    proofTime: '40%',
    proofTimeText: 'o tyle skróciłem generowanie raportów w procesie DOVISTA',
    proofStack: 'AI agents',
    proofStackText: 'Codex, Claude Code, Cursor i codzienne kodowanie z agentami',
    proofSpeed: 'Kilka dni',
    proofSpeedText: 'tyle zwykle wystarcza, żeby pokazać pierwszy klikalny prototyp',
    desireTitle: 'Jak pracuję',
    desireBody: 'Rozmawiamy o problemie, w ciągu kilku dni składam pierwszy prototyp, pokazuję Tobie i wprowadzamy twoje poprawki! :)',
    stepOne: 'Pomysł',
    stepOneBody: 'Co ma ułatwić dzień, kto będzie tego używał i co musi działać od razu.',
    stepTwo: 'Prototyp',
    stepTwoBody: 'Pierwsza wersja ma być klikalna i prawdziwa, nie tylko opisana w slajdach.',
    stepThree: 'Iteracja',
    stepThreeBody: 'Demo, feedback, poprawki i następny sensowny krok.',
    workTitle: 'Wybrane projekty',
    workBody: 'Staż, projekty i rzeczy, które pokazują mój sposób pracy.',
    contributionsEyebrow: 'GitHub activity',
    contributionsTitle: 'Koduję regularnie, nie tylko od święta.',
    contributionsBody: 'Live podgląd publicznych contributions z profilu GitHub.',
    contributionsLoading: 'Ładuję contributions...',
    contributionsFallback: 'Nie udało się pobrać live danych. GitHub profil jest dalej dostępny.',
    contributionsLabel: 'contributions w ostatnich 365 dniach',
    contributionsLink: 'Otwórz GitHub',
    stackTitle: 'Czym pracuję',
    aboutTitle: 'Młody developer, który umie rozmawiać z ludźmi.',
    aboutBody: 'Lubię nowe technologie i szybko sprawdzam, co daje realną przewagę. Pytam, pokazuję działające demo i poprawiam. Tak chcę budować narzędzia, które pomagają zespołom w pracy.',
    aboutCurrentTitle: 'Teraz',
    aboutCurrentBody: 'Idego · AI Native Developer · 2026',
    aboutEducationTitle: 'Studia',
    aboutEducationBody: 'Uniwersytet Gdański · Informatyka i Ekonometria · planowo 2027',
    aboutDovistaTitle: 'DOVISTA',
    aboutDovistaBody: 'Stażowy projekt z UiPath i SAP. Generowanie raportu krótsze o 40% i mniej powtarzalnego przepisywania danych.',
    contactTitle: 'Porozmawiajmy o twoim pomyśle.',
    contactBody: 'Najłatwiej ocenić mnie w rozmowie. Masz pomysł na aplikację, narzędzie wewnętrzne albo proces do uproszczenia? Napisz, pogadamy.',
    contactCta: 'Skontaktuj się!',
    email: 'Napisz do mnie',
    emailAddress: 'wojciechsacewicz@outlook.com',
    emailNote: 'Najlepszy pierwszy krok, jeśli chcesz pogadać o pracy albo pomyśle.',
    linkedin: 'LinkedIn',
    linkedinNote: 'Zobacz profil i odezwij się, jeśli wygodniej Ci pisać tam.',
    github: 'GitHub',
    githubNote: 'Kod, eksperymenty i projekty, które pokazują, jak pracuję z AI, Pythonem, Reactem i automatyzacją.',
    githubKicker: 'warto zajrzeć',
    githubWindowOne: 'Gem Hunter · Python · MongoDB · Gemini API',
    githubWindowTwo: 'portfolio · React · Vite · GSAP',
    githubWindowThree: 'RPA notes · UiPath · SAP',
    windowsTitle: 'Mój Windows',
    windowsBody: 'GlazeWM, Flow Launcher, Fences i Windhawk w praktycznym setupie.',
    videoDovistaTitle: 'DOVISTA RPA workflow',
    videoCyberTitle: 'CyberWizja clips',
    footer: 'sacewi.cz · Gdańsk · AI-native dev, aplikacje, RPA',
  },
  en: {
    navWork: 'Work',
    navAbout: 'About',
    navContact: 'Contact',
    navOpen: 'Open menu',
    navClose: 'Close menu',
    skipContent: 'Skip to content',
    language: 'PL',
    heroKicker: 'Wojciech Sacewicz · AI Native Developer',
    heroTitle: 'I turn ideas into working tools.',
    heroBody: 'I code with AI agents, prototype fast, and like working close to people. If a team has an idea for an internal app or a process worth simplifying, I can help get the first version moving.',
    heroPrimary: 'View work',
    heroSecondary: 'Contact me',
    proofRole: 'Idego + DOVISTA',
    proofRoleText: 'AI Native Developer at Idego, previously RPA Team Intern at DOVISTA',
    proofTime: '40%',
    proofTimeText: 'shorter report generation in a DOVISTA process',
    proofStack: 'AI agents',
    proofStackText: 'Codex, Claude Code, Cursor, and daily agent-based coding',
    proofSpeed: 'A few days',
    proofSpeedText: 'usually enough to show the first clickable prototype',
    desireTitle: 'How I work',
    desireBody: 'We talk through the problem, I build a first prototype in a few days, show it to you, and we make your changes. :)',
    stepOne: 'Idea',
    stepOneBody: 'What should get easier, who will use it, and what has to work first.',
    stepTwo: 'Prototype',
    stepTwoBody: 'The first version should be clickable and real, not only described in slides.',
    stepThree: 'Iteration',
    stepThreeBody: 'Demo, feedback, fixes, and the next sensible step.',
    workTitle: 'Selected work',
    workBody: 'Internships, projects, and work that shows how I think.',
    contributionsEyebrow: 'GitHub activity',
    contributionsTitle: 'I code regularly, not only for polished demos.',
    contributionsBody: 'Live view of public contributions from my GitHub profile.',
    contributionsLoading: 'Loading contributions...',
    contributionsFallback: 'Live data could not be loaded. The GitHub profile is still available.',
    contributionsLabel: 'contributions in the last 365 days',
    contributionsLink: 'Open GitHub',
    stackTitle: 'What I work with',
    aboutTitle: 'A young developer who can talk to people.',
    aboutBody: 'I like new technology and I test fast what can give a real advantage. I ask questions, show a working demo, and improve it. That is how I want to build tools that help teams at work.',
    aboutCurrentTitle: 'Now',
    aboutCurrentBody: 'Idego · AI Native Developer · 2026',
    aboutEducationTitle: 'Studies',
    aboutEducationBody: 'University of Gdańsk · Computer Science and Econometrics · expected 2027',
    aboutDovistaTitle: 'DOVISTA',
    aboutDovistaBody: 'Internship project with UiPath and SAP. 40% shorter report generation and fewer repeated data-entry errors.',
    contactTitle: 'Let’s talk about your idea.',
    contactBody: 'The easiest way to judge me is a conversation. Got an app idea, internal tool, or process worth simplifying? Send me a message and let’s talk.',
    contactCta: 'Get in touch',
    email: 'Email me',
    emailAddress: 'wojciechsacewicz@outlook.com',
    emailNote: 'Best first step if you want to talk about work or an idea.',
    linkedin: 'LinkedIn',
    linkedinNote: 'See my profile and message me there if that is easier.',
    github: 'GitHub',
    githubNote: 'Code, experiments, and projects showing how I work with AI, Python, React, and automation.',
    githubKicker: 'worth opening',
    githubWindowOne: 'Gem Hunter · Python · MongoDB · Gemini API',
    githubWindowTwo: 'portfolio · React · Vite · GSAP',
    githubWindowThree: 'RPA notes · UiPath · SAP',
    windowsTitle: 'My Windows setup',
    windowsBody: 'GlazeWM, Flow Launcher, Fences and Windhawk in my daily setup.',
    videoDovistaTitle: 'DOVISTA RPA workflow',
    videoCyberTitle: 'CyberWizja clips',
    footer: 'sacewi.cz · Gdańsk · AI-native dev, apps, RPA',
  },
};

const projects = [
  {
    id: 'idego-ai-native',
    title: 'Idego AI Native Developer',
    meta: 'AI agents · Codex · Claude Code · Cursor',
    body: {
      pl: 'Aktualnie pracuję w Idego z agentami AI, szybkim prototypowaniem i kodem pisanym w realnym środowisku firmowym.',
      en: 'Current work at Idego with AI agents, fast prototyping, and code written in a real company environment.',
    },
    visual: '/assets/mySetup2.jpg',
    scale: 'large',
  },
  {
    id: 'dovista-rpa-animation',
    title: 'DOVISTA RPA workflow',
    meta: 'RPA Team Intern · UiPath · SAP',
    body: {
      pl: 'Stażowy projekt RPA. Skróciłem generowanie raportów o 40% i ograniczyłem powtarzalne przepisywanie danych.',
      en: 'RPA internship project. I shortened report generation by 40% and reduced repeated data entry.',
    },
    video: '/assets/businessAnimationCutForPortfolio.mp4',
    poster: '/assets/dovista-poster.jpg',
    scale: 'medium',
  },
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
    id: 'llmpolska',
    title: 'llmpolska',
    meta: 'React Router · Cloudflare Workers · D1 · community',
    body: {
      pl: 'Polska platforma społecznościowo-edukacyjna o pracy z AI: forum, academy, helper i backend na Cloudflare Workers.',
      en: 'Polish community and education platform for working with AI: forum, academy, helper, and a Cloudflare Workers backend.',
    },
    href: 'https://llmpolska.pl/',
    visual: 'https://llmpolska.pl/og-default.svg',
    scale: 'large',
  },
  {
    id: 'veldia',
    title: 'Veldia',
    meta: 'Astro · SaaS/PWA · Cloudflare · Supabase',
    body: {
      pl: 'Mobilna aplikacja i strona produktu dla biznesów zmianowych: grafiki, godziny pracy, dyspozycyjność, wolne i komunikacja zespołu.',
      en: 'Mobile app and product site for shift-based businesses: schedules, work hours, availability, time off, and team communication.',
    },
    href: 'https://veldia.pl/',
    visual: 'https://veldia.pl/assets/og-image.png',
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
  {
    id: 'notification-system',
    title: 'Smart Notifications',
    meta: 'Make.com · Weather API · Calendar · Discord',
    body: {
      pl: 'Mały eksperyment z osobistymi powiadomieniami, webhookami i codziennym kontekstem.',
      en: 'Small experiment with personal notifications, webhooks, and daily context.',
    },
    href: 'https://github.com/wojciechsacewicz/smart-notification-system',
    visual: '/assets/flow launcher.png',
    scale: 'medium',
  },
];

const stacks = {
  pl: [
    ['AI coding', 'Codex, Claude Code, Cursor, agentic coding, prompt engineering'],
    ['Aplikacje', 'React, Vite, Node.js, JavaScript, TypeScript, Python'],
    ['Automatyzacja i RPA', 'UiPath, SAP, Make.com, REST API, webhooks'],
    ['Dane i backend', 'MongoDB, SQL, JSON, integracje API, małe backendy'],
    ['Adaptacja', 'szybko wchodzę w stack zespołu i nowe narzędzia z pomocą AI'],
    ['Proces i demo', 'rozmowa z użytkownikiem, mały zakres, działająca wersja'],
  ],
  en: [
    ['AI coding', 'Codex, Claude Code, Cursor, agentic coding, prompt engineering'],
    ['Apps', 'React, Vite, Node.js, JavaScript, TypeScript, Python'],
    ['Automation + RPA', 'UiPath, SAP, Make.com, REST APIs, webhooks'],
    ['Data + backend', 'MongoDB, SQL, JSON, API integrations, small backends'],
    ['Adaptation', 'I can enter a team stack and learn new tools fast with AI'],
    ['Process + demo', 'user conversation, tight scope, working version'],
  ],
};

const windowsImages = [
  ['/assets/my desktop.png', 'desktop'],
  ['/assets/glazewm showcase.png', 'GlazeWM tiling'],
  ['/assets/flow launcher.png', 'Flow Launcher'],
  ['/assets/rolled fence.png', 'Fences collapsed'],
  ['/assets/unrolled fence.png', 'Fences expanded'],
  ['/assets/windhawk mod list.png', 'Windhawk mods'],
  ['/assets/file explorer this pc.png', 'File explorer'],
];

const videoSources = {
  dovista: [
    { src: '/assets/hls/dovista/index.m3u8', type: 'application/x-mpegURL' },
    { src: '/assets/businessAnimationCutForPortfolio.mp4', type: 'video/mp4' },
  ],
  cyberIntro: [
    { src: '/assets/hls/cyberwizja-intro/index.m3u8', type: 'application/x-mpegURL' },
    { src: '/assets/cyberwizjaIntro.mp4', type: 'video/mp4' },
  ],
  cyberPlugins: [
    { src: '/assets/hls/cyberwizja-plugins/index.m3u8', type: 'application/x-mpegURL' },
    { src: '/assets/cyberwizja5wtyczek.mp4', type: 'video/mp4' },
  ],
};

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio-lang') || 'pl');
  const [lightbox, setLightbox] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const shell = useRef(null);
  const t = copy[lang];
  const page = routes[normalizePath()];

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('portfolio-lang', lang);
  }, [lang]);

  useEffect(() => {
    setMenuOpen(false);
  }, [page, lang]);

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
    if (page === 'windows') return <GalleryPage title={t.windowsTitle} body={t.windowsBody} images={windowsImages} setLightbox={setLightbox} />;
    return <HomePage t={t} lang={lang} setLightbox={setLightbox} />;
  }, [page, t, lang]);

  return (
    <div ref={shell} className="site-shell">
      <div className="scroll-progress" data-scroll-progress aria-hidden="true" />
      <a className="skip-link" href="#content">
        {t.skipContent}
      </a>
      <Header lang={lang} setLang={setLang} t={t} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="content">{content}</main>
      <Footer t={t} />
      {lightbox && <Lightbox image={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

function Header({ lang, setLang, t, menuOpen, setMenuOpen }) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="sacewi.cz home">
        <span>sacewi.cz</span>
      </a>
      <nav id="primary-navigation" className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Primary navigation">
        <a href="/work">{t.navWork}</a>
        <a href="/about">{t.navAbout}</a>
        <a href="/contact">{t.navContact}</a>
      </nav>
      <button className="lang-toggle" type="button" onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}>
        {t.language}
      </button>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? t.navClose : t.navOpen}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
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
            <a className="button ghost" href="mailto:wojciechsacewicz@outlook.com">
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

      <WorkMotion t={t} lang={lang} />
      <GithubContributions t={t} />
      <ProcessSection t={t} />
      <StackSection t={t} lang={lang} />
      <ContactBand t={t} />
    </>
  );
}

function ProofStrip({ t }) {
  const items = [
    [t.proofRole, t.proofRoleText],
    [t.proofTime, t.proofTimeText],
    [t.proofStack, t.proofStackText],
    [t.proofSpeed, t.proofSpeedText],
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

function GithubContributions({ t }) {
  const [state, setState] = useState({ status: 'loading', total: null, days: [] });

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://github-contributions-api.jogruber.de/v4/wojciechsacewicz', {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub contributions API returned ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(today);
        start.setDate(start.getDate() - 364);

        const days = (data.contributions || [])
          .map((day) => ({ ...day, parsedDate: new Date(`${day.date}T00:00:00`) }))
          .filter((day) => day.parsedDate >= start && day.parsedDate <= today)
          .sort((a, b) => a.parsedDate - b.parsedDate);

        const total = days.reduce((sum, day) => sum + day.count, 0);
        setState({ status: 'ready', total, days });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ status: 'error', total: null, days: [] });
        }
      });

    return () => controller.abort();
  }, []);

  const cells = state.days.slice(-182);

  return (
    <section className="github-contributions chapter" data-reveal>
      <div className="github-contributions-copy">
        <span>{t.contributionsEyebrow}</span>
        <h2>{t.contributionsTitle}</h2>
        <p>{t.contributionsBody}</p>
        <a className="text-action" href="https://github.com/wojciechsacewicz" target="_blank" rel="noreferrer">
          {t.contributionsLink}
        </a>
      </div>
      <div className="github-contributions-card" aria-live="polite">
        {state.status === 'loading' && <p className="github-contributions-status">{t.contributionsLoading}</p>}
        {state.status === 'error' && <p className="github-contributions-status">{t.contributionsFallback}</p>}
        {state.status === 'ready' && (
          <>
            <div className="github-contributions-total">
              <strong>{state.total.toLocaleString('en-US')}</strong>
              <span>{t.contributionsLabel}</span>
            </div>
            <div className="github-contributions-grid" aria-label={t.contributionsLabel}>
              {cells.map((day) => (
                <span
                  key={day.date}
                  className={`level-${day.level}`}
                  title={`${day.date}: ${day.count} contributions`}
                  aria-label={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
            <div className="github-contributions-scale" aria-hidden="true">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <i key={level} className={`level-${level}`} />
              ))}
              <span>More</span>
            </div>
          </>
        )}
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

function ContactBand({ t }) {
  return (
    <section className="contact-band chapter">
      <div data-reveal>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactBody}</p>
      </div>
      <div className="button-row" data-reveal>
        <a className="button primary" href="/contact">
          {t.contactCta}
        </a>
        <a className="button ghost" href="mailto:wojciechsacewicz@outlook.com">
          {t.email}
        </a>
      </div>
    </section>
  );
}

function WorkPage({ t, lang }) {
  return (
    <PageShell title={t.workTitle} body={t.workBody} pageClass="work-page">
      <div className="work-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} lang={lang} />
        ))}
      </div>
      <section className="video-detail" id="dovista-rpa-animation">
        <h2>{t.videoDovistaTitle}</h2>
        <VideoJsPlayer
          label={t.videoDovistaTitle}
          poster="/assets/dovista-poster.jpg"
          sources={videoSources.dovista}
        />
      </section>
      <section className="video-detail" id="cyberwizja">
        <h2>{t.videoCyberTitle}</h2>
        <div className="video-pair">
          <VideoJsPlayer
            label={`${t.videoCyberTitle} intro`}
            poster="/assets/cyberwizja-poster.jpg"
            sources={videoSources.cyberIntro}
            aspectRatio="9:16"
          />
          <VideoJsPlayer
            label={`${t.videoCyberTitle} plugins`}
            poster="/assets/cyberwizja-poster.jpg"
            sources={videoSources.cyberPlugins}
            aspectRatio="9:16"
          />
        </div>
      </section>
    </PageShell>
  );
}

function VideoJsPlayer({ label, poster, sources, aspectRatio = '16:9' }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const sourceKey = sources.map((source) => `${source.type}:${source.src}`).join('|');

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const videoElement = document.createElement('video-js');
    videoElement.classList.add('video-js', 'vjs-big-play-centered', 'portfolio-video-js');
    videoElement.setAttribute('aria-label', label);
    videoElement.setAttribute('playsinline', 'true');
    videoElement.setAttribute('poster', poster);
    videoElement.setAttribute('preload', 'none');
    containerRef.current.appendChild(videoElement);

    let disposed = false;

    const createPlayer = async () => {
      const { default: videojs } = await import('video.js');

      if (disposed) return;

      const player = videojs(videoElement, {
        aspectRatio,
        controls: true,
        fluid: true,
        html5: {
          vhs: {
            overrideNative: true,
          },
        },
        playbackRates: [0.75, 1, 1.25, 1.5],
        playsinline: true,
        poster,
        preload: 'none',
        responsive: true,
        sources,
      });

      playerRef.current = player;
    };

    createPlayer();

    return () => {
      disposed = true;

      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
      } else {
        videoElement.remove();
      }

      playerRef.current = null;
    };
  }, [aspectRatio, label, poster, sourceKey]);

  return (
    <div className="video-js-shell" data-vjs-player>
      <div ref={containerRef} />
    </div>
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
    </PageShell>
  );
}

function ContactPage({ t }) {
  return (
    <PageShell
      title={t.contactTitle}
      body={t.contactBody}
      pageClass="contact-page"
      heroAction={{ label: t.contactCta, href: 'mailto:wojciechsacewicz@outlook.com' }}
    >
      <section className="contact-grid contact-showcase">
        <a className="contact-card mail-card" href="mailto:wojciechsacewicz@outlook.com" data-reveal>
          <span className="contact-icon" aria-hidden="true">
            <MailIcon />
          </span>
          <span className="contact-card-copy">
            <strong>{t.email}</strong>
            <span>{t.emailAddress}</span>
            <em>{t.emailNote}</em>
          </span>
        </a>
        <a className="contact-card linkedin-card" href="https://linkedin.com/in/wojciech-sacewicz" target="_blank" rel="noreferrer" data-reveal>
          <span className="contact-icon" aria-hidden="true">
            <LinkedInIcon />
          </span>
          <span className="contact-card-copy">
            <strong>{t.linkedin}</strong>
            <span>linkedin.com/in/wojciech-sacewicz</span>
            <em>{t.linkedinNote}</em>
          </span>
        </a>
        <a className="contact-card github-feature" href="https://github.com/wojciechsacewicz" target="_blank" rel="noreferrer" data-reveal>
          <span className="contact-icon" aria-hidden="true">
            <GitHubIcon />
          </span>
          <span className="contact-card-copy">
            <small>{t.githubKicker}</small>
            <strong>{t.github}</strong>
            <span>github.com/wojciechsacewicz</span>
            <em>{t.githubNote}</em>
          </span>
          <span className="github-window" aria-hidden="true">
            <span>{t.githubWindowOne}</span>
            <span>{t.githubWindowTwo}</span>
            <span>{t.githubWindowThree}</span>
          </span>
        </a>
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

function PageShell({ title, body, children, pageClass = '', heroAction = null }) {
  return (
    <section className={['page-shell', pageClass].filter(Boolean).join(' ')}>
      <header className="page-hero" data-hero-copy>
        <h1>{title}</h1>
        <p>{body}</p>
        {heroAction && (
          <div className="button-row page-hero-actions">
            <a className="button primary" href={heroAction.href}>
              {heroAction.label}
            </a>
          </div>
        )}
      </header>
      {children}
    </section>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path d="M4.5 6.5h15v11h-15z" />
      <path d="m5 7 7 6 7-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path d="M5.1 9.1v10" />
      <path d="M5.1 5.2v.1" />
      <path d="M10 19.1v-10" />
      <path d="M10 13.8c.6-3.1 6.1-3.7 6.1 1v4.3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path d="M9 19.2c-4.3 1.4-4.3-2.1-6-2.5" />
      <path d="M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.7-1.4 5.7-6.1a4.8 4.8 0 0 0-1.3-3.4 4.5 4.5 0 0 0-.1-3.4s-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0C6.5 2.3 5.4 2.6 5.4 2.6a4.5 4.5 0 0 0-.1 3.4A4.8 4.8 0 0 0 4 9.4c0 4.7 2.9 5.8 5.7 6.1-.4.4-.6.9-.6 1.8V21" />
    </svg>
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
