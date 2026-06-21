import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
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
  '/veldia': 'veldia',
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
    interestTitle: 'Najlepiej działam przy rzeczach, które trzeba ruszyć z miejsca.',
    interestBody: 'Panel dla zespołu, narzędzie do grafiku, komunikacja z managerami, dane z kilku systemów. Lubię brać pomysł, który brzmi jak “fajnie byłoby to mieć”, i szybko robić wersję, którą da się kliknąć.',
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
    workspaceTitle: 'Jak pracuję, czyli mój setup',
    workspaceBody: 'Biurko, sprzęt i Windows, bo lubię mieć środowisko, które nie przeszkadza mi w szybkim budowaniu rzeczy.',
    workspaceLink: 'Zobacz setup',
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
    interestTitle: 'I am useful when an idea needs momentum.',
    interestBody: 'A team panel, a scheduling tool, manager communication, data from several systems. I like taking an idea that sounds like “this would be nice to have” and turning it into something clickable.',
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
    workspaceTitle: 'How I work, aka my setup',
    workspaceBody: 'Desk, gear, and Windows setup, because I like an environment that does not slow down building things.',
    workspaceLink: 'View setup',
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

const veldiaCopy = {
  pl: {
    eyebrow: 'Mobile-first SaaS/PWA dla zespołów zmianowych',
    heroTitle: 'Veldia',
    heroBody: 'Grafik, dyspozycyjność, zastępstwa i godziny pracy dla sklepów oraz zespołów zmianowych.',
    primaryCta: 'Napisz o demo',
    secondaryCta: 'Wróć do portfolio',
    previewLabel: 'Podgląd interfejsu Veldii',
    storeName: 'Sklep Wrzeszcz',
    weekLabel: 'Tydzień',
    aiAssist: 'AI schedule assist',
    aiAssistBody: 'Ułożył szkic po dyspozycyjności i limitach godzin.',
    smsClaim: 'SMS claim',
    smsClaimBody: 'Pracownik potwierdza dostęp przez telefon.',
    staffTitle: 'Zespół',
    ownerTitle: 'Owner',
    problemTitle: 'Dla biznesów, gdzie grafik żyje cały tydzień.',
    problemBody: 'Veldia celuje w sklepy, kawiarnie, punkty usługowe i małe sieci, które potrzebują porządku bez ciężkiego systemu HR.',
    todayTitle: 'Excel i WhatsApp',
    todayItems: ['grafik krąży w kilku wersjach', 'dyspozycyjność ginie w wiadomościach', 'zastępstwa nie mają jasnego właściciela'],
    veldiaTitle: 'Veldia',
    veldiaItems: ['jeden grafik na telefonie', 'wnioski o wolne i zamiany przy zmianie', 'godziny pracy spięte z rolą i sklepem'],
    flowTitle: 'Start właściciela, dostęp pracownika.',
    flowBody: 'Produkt rozdziela billing, lokalizację i role. Dzięki temu jeden SaaS może obsługiwać wiele biznesów bez osobnych wdrożeń.',
    ownerFlowTitle: 'Owner flow',
    ownerFlow: [
      ['Konto', 'właściciel zakłada profil i biznes'],
      ['Pierwszy sklep', 'dodaje lokalizację, kolor i moduły'],
      ['Onboarding', 'wybiera typ biznesu i potrzeby grafiku'],
      ['Trial', 'uruchamia okres próbny i Stripe Billing'],
    ],
    staffFlowTitle: 'Staff flow',
    staffFlow: [
      ['SMS', 'pracownik odbiera zaproszenie na telefon'],
      ['Phone OTP', 'potwierdza tożsamość bez fake emaila'],
      ['Grafik', 'widzi zmiany, dyspozycyjność i wolne'],
      ['Zespół', 'pisze do managera i bierze zastępstwa'],
    ],
    roleTitle: 'Role są domenowe, nie kosmetyczne.',
    roleBody: 'Business opłaca usługę, Store reprezentuje lokalizację, Membership łączy użytkownika z rolą i zakresem dostępu.',
    roles: [
      ['business_owner', 'billing, biznes, właściciele sklepów'],
      ['store_owner', 'lokalizacja, zespół, moduły sklepu'],
      ['manager', 'grafik, zastępstwa, komunikacja'],
      ['scheduler', 'planowanie zmian i dyspozycyjność'],
      ['staff', 'telefon, zmiany, wolne, wiadomości'],
    ],
    modulesTitle: 'Moduły, które mają robić codzienną robotę.',
    modules: [
      ['Grafik', 'tygodniowy i miesięczny widok zmian'],
      ['Dyspozycyjność', 'pracownik zgłasza, kiedy może pracować'],
      ['Wolne i zastępstwa', 'prośby, akceptacje i czytelny status'],
      ['Ewidencja godzin', 'praca przy zmianie, sklepie i roli'],
      ['Team messaging', 'wiadomości tam, gdzie jest grafik'],
      ['AI assist', 'propozycje planu bez ręcznego układania od zera'],
      ['Brand sklepu', 'kolor i nazwa lokalizacji w UI'],
      ['Trial i billing', 'docelowo Stripe Billing w jednym deploymentcie'],
    ],
    architectureTitle: 'Jeden SaaS, wiele biznesów.',
    architectureBody: 'Docelowa architektura nie zakłada osobnego deploymentu per sklep. Granica produktu to Business -> Store -> Membership, z tenant-scoped dostępem i billingiem na poziomie biznesu.',
    architectureNotes: ['multi-tenant deployment', 'phone-first staff access', 'Stripe Billing po trialu'],
    ctaTitle: 'Veldia ma być produktem, nie kolejnym arkuszem.',
    ctaBody: 'Landing pokazuje kierunek produktu i case w portfolio. Demo lub rozmowa może zejść do owner flow, ról i modułów.',
  },
  en: {
    eyebrow: 'Mobile-first SaaS/PWA for shift teams',
    heroTitle: 'Veldia',
    heroBody: 'Scheduling, availability, cover shifts and time records for shops and shift-based teams.',
    primaryCta: 'Ask for demo',
    secondaryCta: 'Back to portfolio',
    previewLabel: 'Veldia interface preview',
    storeName: 'Wrzeszcz store',
    weekLabel: 'Week',
    aiAssist: 'AI schedule assist',
    aiAssistBody: 'Drafted shifts from availability and hour limits.',
    smsClaim: 'SMS claim',
    smsClaimBody: 'Staff confirms access through the phone.',
    staffTitle: 'Team',
    ownerTitle: 'Owner',
    problemTitle: 'For businesses where the schedule changes all week.',
    problemBody: 'Veldia is for shops, cafes, service points and small chains that need order without a heavy HR suite.',
    todayTitle: 'Excel and WhatsApp',
    todayItems: ['the schedule lives in several versions', 'availability gets buried in messages', 'cover shifts have no clear owner'],
    veldiaTitle: 'Veldia',
    veldiaItems: ['one schedule on the phone', 'time off and swaps next to the shift', 'hours tied to role and store'],
    flowTitle: 'Owner starts it, staff enters by phone.',
    flowBody: 'The product separates billing, location and roles. One SaaS can serve many businesses without per-store deployments.',
    ownerFlowTitle: 'Owner flow',
    ownerFlow: [
      ['Account', 'the owner creates a profile and business'],
      ['First store', 'adds location, color and modules'],
      ['Onboarding', 'selects business type and scheduling needs'],
      ['Trial', 'starts trial and Stripe Billing'],
    ],
    staffFlowTitle: 'Staff flow',
    staffFlow: [
      ['SMS', 'the worker receives a phone invite'],
      ['Phone OTP', 'confirms identity without fake email'],
      ['Schedule', 'sees shifts, availability and time off'],
      ['Team', 'messages the manager and takes cover shifts'],
    ],
    roleTitle: 'Roles are domain boundaries.',
    roleBody: 'Business pays for the product, Store represents a location, Membership connects the user to a role and access scope.',
    roles: [
      ['business_owner', 'billing, business, store owners'],
      ['store_owner', 'location, team, store modules'],
      ['manager', 'schedule, cover shifts, communication'],
      ['scheduler', 'shift planning and availability'],
      ['staff', 'phone, shifts, time off, messages'],
    ],
    modulesTitle: 'Modules for daily operational work.',
    modules: [
      ['Schedule', 'weekly and monthly shift views'],
      ['Availability', 'staff shares when they can work'],
      ['Time off and cover', 'requests, approvals and clear status'],
      ['Time records', 'work tied to shift, store and role'],
      ['Team messaging', 'messages where scheduling happens'],
      ['AI assist', 'draft schedules without starting from zero'],
      ['Store brand', 'location name and color in the UI'],
      ['Trial and billing', 'Stripe Billing in one deployment'],
    ],
    architectureTitle: 'One SaaS, many businesses.',
    architectureBody: 'The target architecture does not assume a separate deployment per store. The product boundary is Business -> Store -> Membership, with tenant-scoped access and business-level billing.',
    architectureNotes: ['multi-tenant deployment', 'phone-first staff access', 'Stripe Billing after trial'],
    ctaTitle: 'Veldia should be a product, not another spreadsheet.',
    ctaBody: 'This page shows the product direction and portfolio case. A demo conversation can go deeper into owner flow, roles and modules.',
  },
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
    if (page === 'veldia') return <VeldiaPage lang={lang} />;
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

      <section className="statement chapter">
        <div>
          <h2 data-reveal>{t.interestTitle}</h2>
        </div>
        <p data-reveal>{t.interestBody}</p>
      </section>

      <WorkMotion t={t} lang={lang} />
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

function VeldiaPage({ lang }) {
  const v = veldiaCopy[lang] || veldiaCopy.pl;

  return (
    <article className="veldia-page">
      <section className="veldia-hero" data-hero>
        <div className="veldia-hero-copy">
          <p className="veldia-kicker">{v.eyebrow}</p>
          <h1>{v.heroTitle}</h1>
          <p>{v.heroBody}</p>
          <div className="button-row veldia-actions">
            <a className="button primary" href="mailto:wojciechsacewicz@outlook.com?subject=Veldia%20demo">
              {v.primaryCta}
            </a>
            <a className="button ghost" href="/">
              {v.secondaryCta}
            </a>
          </div>
        </div>
        <VeldiaProductPreview v={v} lang={lang} />
      </section>

      <section className="veldia-problem chapter">
        <div className="veldia-section-copy" data-reveal>
          <h2>{v.problemTitle}</h2>
          <p>{v.problemBody}</p>
        </div>
        <div className="veldia-comparison" data-reveal>
          <VeldiaComparisonColumn title={v.todayTitle} items={v.todayItems} muted />
          <VeldiaComparisonColumn title={v.veldiaTitle} items={v.veldiaItems} />
        </div>
      </section>

      <section className="veldia-flow chapter">
        <div className="veldia-section-copy" data-reveal>
          <h2>{v.flowTitle}</h2>
          <p>{v.flowBody}</p>
        </div>
        <div className="veldia-flow-grid">
          <VeldiaFlowColumn title={v.ownerFlowTitle} items={v.ownerFlow} />
          <VeldiaFlowColumn title={v.staffFlowTitle} items={v.staffFlow} />
        </div>
      </section>

      <section className="veldia-roles chapter">
        <div className="veldia-role-card" data-reveal>
          <h2>{v.roleTitle}</h2>
          <p>{v.roleBody}</p>
          <div className="veldia-domain-line" aria-label="Business to Store to Membership">
            <span>Business</span>
            <span>Store</span>
            <span>Membership</span>
          </div>
        </div>
        <div className="veldia-role-list">
          {v.roles.map(([role, body]) => (
            <article key={role} data-reveal>
              <strong>{role}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="veldia-modules chapter">
        <div className="veldia-section-copy" data-reveal>
          <h2>{v.modulesTitle}</h2>
        </div>
        <div className="veldia-module-grid">
          {v.modules.map(([title, body], index) => (
            <article key={title} className={index === 0 || index === 5 ? 'is-featured' : ''} data-reveal>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="veldia-architecture chapter">
        <div data-reveal>
          <h2>{v.architectureTitle}</h2>
          <p>{v.architectureBody}</p>
        </div>
        <div className="veldia-architecture-notes" data-reveal>
          {v.architectureNotes.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>
      </section>

      <section className="veldia-cta chapter">
        <div data-reveal>
          <h2>{v.ctaTitle}</h2>
          <p>{v.ctaBody}</p>
        </div>
        <div className="button-row veldia-actions" data-reveal>
          <a className="button primary" href="mailto:wojciechsacewicz@outlook.com?subject=Veldia%20demo">
            {v.primaryCta}
          </a>
          <a className="button ghost" href="/contact">
            {lang === 'pl' ? 'Kontakt' : 'Contact'}
          </a>
        </div>
      </section>
    </article>
  );
}

function VeldiaProductPreview({ v, lang }) {
  const days = lang === 'pl' ? ['Pon', 'Wt', 'Śr', 'Czw'] : ['Mon', 'Tue', 'Wed', 'Thu'];
  const offLabel = lang === 'pl' ? 'wolne' : 'off';
  const schedule = [
    ['Monika', '08-14', '08-14', offLabel, '10-16'],
    ['Kamil', '14-21', '14-21', '12-18', offLabel],
    ['Zuza', '10-16', offLabel, '08-14', '08-14'],
  ];

  return (
    <div className="veldia-product-scene" aria-label={v.previewLabel}>
      <div className="veldia-board" data-reveal>
        <div className="veldia-board-head">
          <span className="veldia-mark">V</span>
          <div>
            <strong>{v.storeName}</strong>
            <span>{v.weekLabel}</span>
          </div>
        </div>
        <div className="veldia-week-grid">
          <span />
          {days.map((day) => (
            <strong key={day}>{day}</strong>
          ))}
          {schedule.map(([name, ...shifts]) => (
            <Fragment key={name}>
              <strong className="veldia-person">{name}</strong>
              {shifts.map((shift, index) => (
                <span key={`${name}-${days[index]}`} className={shift === offLabel ? 'is-off' : ''}>
                  {shift}
                </span>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="veldia-phone" data-reveal>
        <div className="veldia-phone-bar">
          <span />
          <strong>{v.staffTitle}</strong>
        </div>
        <div className="veldia-phone-shift">
          <span>{lang === 'pl' ? 'Dziś' : 'Today'}</span>
          <strong>14:00-21:00</strong>
          <p>{lang === 'pl' ? 'Kasjer, sklep Wrzeszcz' : 'Cashier, Wrzeszcz store'}</p>
        </div>
        <div className="veldia-phone-message">
          <strong>{v.smsClaim}</strong>
          <p>{v.smsClaimBody}</p>
        </div>
      </div>

      <div className="veldia-assist" data-reveal>
        <span>{v.aiAssist}</span>
        <strong>7 {lang === 'pl' ? 'zmian gotowych' : 'shifts ready'}</strong>
        <p>{v.aiAssistBody}</p>
      </div>

      <div className="veldia-owner-chip" data-reveal>
        <span>{v.ownerTitle}</span>
        <strong>Business {'->'} Store {'->'} Membership</strong>
      </div>
    </div>
  );
}

function VeldiaComparisonColumn({ title, items, muted = false }) {
  return (
    <article className={muted ? 'is-muted' : ''}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function VeldiaFlowColumn({ title, items }) {
  return (
    <article data-reveal>
      <h3>{title}</h3>
      <div>
        {items.map(([label, body]) => (
          <section key={label}>
            <strong>{label}</strong>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </article>
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
      <WorkspacePreview t={t} setLightbox={setLightbox} />
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
