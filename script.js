const translations = {
  pl: {
    messages: [
      'student IT z pasją do ulepszania narzędzi i procesów',
      'analityczne myślenie. kreatywne wykonanie.',
      'buduję boty, które oszczędzają czas',
      'automatyzuję procesy w Make.com i UiPath',
      'rpa + low-code: szybciej, czyściej, taniej',
      'integracje API, webhooki, JSON',
      'analiza danych i pipeline’y w MongoDB',
      'automatyzacje, które realnie oszczędzają czas',
      'entuzjasta klawiatur mechanicznych'
    ],
    ui: {
      ctaWork: 'zobacz projekty',
      ctaContact: 'skontaktuj się',
      ctaAboutMe: 'o mnie',
      mainName: 'wojciech sacewicz',
      flashbang: 'uważaj na flashbanga!',
      // about page stuff
      aboutTitle: ' o mnie',
      aboutIntro: 'jestem studentem informatyki i ekonometrii, który uwielbia majsterkować przy różnych rzeczach, takich jak:',
      btnWorkspace: '<moje stanowisko>',
      btnWindows: '<mój setup windows>',
      goBack: 'wróć',
      // competencies
      compTitle: '> kompetencje',
      compAnalyt: ':: analityczne & org.',
      compComm: ':: komunikacja',
      compAttr: ':: kluczowe cechy',
      listAnalyt1: 'rozwiązywanie problemów',
      listAnalyt2: 'samodzielność w działaniu',
      listAnalyt3: 'zarządzanie czasem',
      listComm1: 'duch współpracy',
      listComm2: 'prezentacje',
      listComm3: 'tłumaczenie tech -> biznes',
      listAttr1: 'szybkie przyswajanie wiedzy',
      listAttr2: 'budowanie relacji',
      listAttr3: 'angielski (C1)',
      // contact
      contactTitle: ' skontaktuj się',
      contactIntro: 'chcesz współpracować? skontaktuj się ze mną tutaj...',
      btnEmail: 'email',
      btnLinkedin: 'linkedin',
      btnCV: 'pobierz moje cv!',
      // work stuff
      workTitle: ' moje projekty',
      secVideo: 'montaż wideo',
      vidTutorialTitle: 'tutorial youtube',
      vidTutorialDesc: 'Poradnik o nagrywaniu gameplayu w 960 FPS i resamplowaniu do 60 FPS (mieszanie klatek), żeby dodać naturalnie wyglądający motion blur przy normalnej prędkości. Pokazuję ustawienia nagrywania i cały workflow — ten film zrobił się dość viralowy.',
      vidDovistaTitle: 'animacja dovista rpa',
      vidDovistaDesc: 'Wewnętrzne wideo szkoleniowe stworzone, aby w prosty sposób wyjaśnić nietechnicznym pracownikom firmowe rozwiązanie RPA — co robi, po co powstało i jak zmienia codzienny workflow.',
      vidCyberTitle: 'cyberwizja (edukacja + animacja)',
      cyberTiktokLink: 'tiktok.com/@cyberwizja',
      vidCyberDesc: 'Grupowy projekt szkolny o cyberbezpieczeństwie. Prowadziliśmy zajęcia dla dzieci w szkołach, ucząc jak bezpiecznie korzystać z internetu i unikać najczęstszych zagrożeń.',
      expandClosed: 'rozwiń sekcję ↴',
      expandOpen: 'zwiń sekcję ↟',
      vidCyberClip1Title: 'cyberwizja klip #1',
      vidCyberClip1Desc: 'Intro przygotowane na profile social media naszego szkolnego projektu — szybkie ustawienie klimatu i identyfikacji.',
      vidCyberClip2Title: 'cyberwizja klip #2',
      vidCyberClip2Desc: 'Krótki TikTok nastawiony na zasięg: mocny hook + najważniejsze info, żeby odbiorcy trafili na profil i mogli później dowiedzieć się więcej o projekcie.',

      secCode: 'kod',
      codeNotifTitle: 'inteligentny system powiadomień',
      codeNotifDesc: 'Automatyzacja zbudowana w Make.com integrująca Weather API, Google Calendar i Discord przez webhooki. Parsuje JSON, aby wysyłać spersonalizowane codzienne powiadomienia.',
      codeNotifStack: 'Make.com · Webhooki · JSON',
      codeGemHunterTitle: 'gem hunter — pipeline ofert pracy',
      codeGemHunterDesc: 'Pipeline w Pythonie zbierający oferty pracy z sitemapów rocketjobs.pl i justjoin.it. Filtruje, parsuje szczegóły i używa Gemini API do oceny dopasowania każdej oferty do CV.',
      codeGemHunterStack: 'Python · MongoDB · Gemini API',
      codeDataTitle: 'analiza i agregacja danych nosql',
      codeDataDesc: 'Zaprojektowałem pipeline przetwarzania danych i zapytania agregujące w MongoDB. Pracowałem na złożonych strukturach JSON, aby wydobywać kluczowe insighty biznesowe.',
      codeDataStack: 'MongoDB · JSON · NoSQL',
      linkGithub: 'zobacz na githubie →',
      // badges
      badgeViews: '100k+ wyświetleń',
      badgeTime: '-40% czasu procesu',
      badgeFinalist: 'finalista',
      // windows page
      winTitle: ' setup windows',
      winIntro: 'personalizacja windowsa dla maksymalnej produktywności i estetyki przy użyciu zewnętrznego oprogramowania!',
      winListIntro: 'oto lista oprogramowania, którego używam:',
      winZoomNote: '* kliknij zdjęcia aby powiększyć *',
      capDesktop: 'mój pulpit',
      capExplorer: 'eksplorator plików',
      capGlazeDesc: 'glazewm to kafelkowy menedżer okien dla windowsa, który pozwala mi na bardziej zorganizowaną i produktywną pracę, w zasadzie zamieniając laptopa z jednym monitorem w setup z 10 monitorami!',
      capGlaze: 'kafelkowanie glazewm',
      capFlowDesc: 'flow launcher to szybki i potężny launcher, który pozwala mi błyskawicznie otwierać pliki i aplikacje',
      capFlow: 'flow launcher',
      capFencesDesc: "stardock fences pozwala mi ukryć ikony pulpitu, gdy ich nie potrzebuję, i zachować porządek!",
      capFencesRolled: 'fences (zwinięte)',
      capFencesUnrolled: 'fences (rozwinięte)',
      windhawkTitle: 'Windhawk (o programie + lista modów)',
      windhawkDesc: 'windhawk pozwala mi zamienić pulpit windowsa w szklany, przezroczysty, stylizowany na macos 26 tahoe windows 11, który jest stabilny, prosty, szybki, znacznie bardziej produktywny niż zwykły windows i oczywiście znacznie przyjemniejszy dla oka :)',
      modCore: ':: Mody Podstawowe',
      modSystem: ':: Usprawnienia Systemowe',
      // workspace page
      spaceTitle: ' stanowisko',
      spaceIntro: 'oto mój setup — inspirowany estetyką clean, black, minimalist.',
      spaceCapSetup1: 'setup — ujęcie 1',
      spaceCapSetup2: 'setup — ujęcie 2',
      spaceCapPC: 'mój pc',
      modCoreItem1: 'Resource Redirect',
      modCoreNoteIcons: '(ikony macOS 26 od niivu)',
      modCoreItem2: 'Translucent Windows',
      modCoreItem3: 'UXTheme Hook',
      modCoreItem4: 'Windows 11 File Explorer Styler',
      modCoreItem5: 'Windows 11 Notification Center Styler',
      modCoreItem6: 'Windows 11 Start Menu Styler',
      modCoreItem7: 'Windows 11 Taskbar Styler',
      modCoreItem8: 'Taskbar Clock Customization',
      modCoreItem9: 'CEF/Spotify Tweaks',
      modCoreNoteSpotify: '(bez auto-aktualizacji)',
      modCoreItem10: 'No Focus Rectangle',
      modCoreItem11: 'Slick Window Arrangement',
      modCoreItem12: 'Taskbar Volume Control',
      modSystemItem1: 'Lepsze rozmiary plików w szczegółach Eksploratora',
      modSystemItem2: 'Otwórz za pomocą - usuń pozycję MS Store',
      modSystemItem3: 'Zmiana położenia powiadomień Windows',
      modSystemItem4: 'Tryb ciemny dla menu kontekstowych',
      modSystemItem5: 'Wyłączenie grupowania na pasku zadań',
      modSystemItem6: 'Naprawa ciemnych ListViews',
      modSystemItem7: 'Wysokość paska i rozmiar ikon',
      modSystemItem8: 'Pasek zadań na górze w Windows 11',
      modSystemItem9: 'Odstępy i siatka ikon w zasobniku',
      modSystemItem10: 'Drobne poprawki ikon zasobnika'
    }
  },
  en: {
    messages: [
      'it student focused on improving tools and processes',
      'analytical thinking. creative execution.',
      'building bots that save time',
      'automation with Make.com and UiPath',
      'rpa + low-code: faster, cleaner, cheaper',
      'api integrations, webhooks, json',
      'mongodb pipelines & data aggregation',
      'automation that saves real time',
      'mechanical keyboard enthusiast'
    ],
    ui: {
      ctaWork: 'see my work',
      ctaContact: 'get in touch',
      ctaAboutMe: 'about me',
      mainName: 'wojciech sacewicz',
      flashbang: 'watch out for the flashbang!',
      // about page
      aboutTitle: ' about me',
      aboutIntro: 'i am a computer science and econometrics student that loves tinkering with stuff, which some of them are:',
      btnWorkspace: '<my workspace>',
      btnWindows: '<my windows setup>',
      goBack: 'go back',
      // competencies
      compTitle: ' competencies',
      compAnalyt: ':: analytical & org.',
      compComm: ':: communication',
      compAttr: ':: key attributes',
      listAnalyt1: 'problem solving',
      listAnalyt2: 'autonomy',
      listAnalyt3: 'time management',
      listComm1: 'collaborative spirit',
      listComm2: 'presentations',
      listComm3: 'tech -> business translation',
      listAttr1: 'fast learner',
      listAttr2: 'relationship building',
      listAttr3: 'english (C1)',
      // contact page
      contactTitle: ' get in touch',
      contactIntro: 'want to work together? contact me here...',
      btnEmail: 'email',
      btnLinkedin: 'linkedin',
      btnCV: 'download my cv!',
      // work page
      workTitle: ' my work',
      secVideo: 'video editing',
      vidTutorialTitle: 'youtube tutorial (100k+ views)',
      vidTutorialDesc: 'A tutorial on recording gameplay at 960 FPS, then resampling down to 60 FPS (with frame blending) to add natural-looking motion blur at normal speed. I walk through the capture settings and the workflow—this one ended up going semi-viral.',
      vidDovistaTitle: 'dovista rpa animation',
      vidDovistaDesc: 'Internal training video created to explain an RPA solution to non-technical coworkers—what it does, why it matters, and how it changes the day-to-day workflow.',
      vidCyberTitle: 'cyberwizja (educational + animation)',
      cyberTiktokLink: 'tiktok.com/@cyberwizja',
      vidCyberDesc: 'A group school project about cybersecurity. We taught children in schools how to stay safe online and avoid common digital threats.',
      expandClosed: 'expand section ↴',
      expandOpen: 'collapse section ↟',

      // add missing keys (used by work/index.html)
      vidCyberClip1Title: 'cyberwizja clip #1',
      vidCyberClip1Desc: 'Intro clip created for our school project’s social media profiles—meant to quickly set the tone and branding.',
      vidCyberClip2Title: 'cyberwizja clip #2',
      vidCyberClip2Desc: 'A short TikTok optimized for reach: quick hook + key info to help viewers discover the profile and learn more about the project later.',

      secCode: 'code',
      codeNotifTitle: 'smart notification system',
      codeNotifDesc: 'Automation built in Make.com integrating Weather API, Google Calendar, and Discord via Webhooks. It parses JSON to send personalized daily notifications.',
      codeNotifStack: 'Make.com · Webhooks · JSON',
      codeGemHunterTitle: 'gem hunter — job offer pipeline',
      codeGemHunterDesc: 'A Python pipeline that harvests job offers from rocketjobs.pl and justjoin.it sitemaps. It filters, parses offer details, and uses the Gemini API to score each offer against a CV.',
      codeGemHunterStack: 'Python · MongoDB · Gemini API',
      codeDataTitle: 'nosql data analysis & aggregation',
      codeDataDesc: 'Designed a data processing pipeline and aggregation queries in MongoDB. Worked on complex JSON structures to extract key business insights.',
      codeDataStack: 'MongoDB · JSON · NoSQL',
      linkGithub: 'view on github →',
      // badges
      badgeViews: '100k+ views',
      badgeTime: '-40% process time',
      badgeFinalist: 'finalist',
      // windows page
      winTitle: ' windows setup',
      winIntro: 'customizing windows for maximum productivity and aesthetics using third party software!',
      winListIntro: 'here is a list of some of the software I use:',
      winZoomNote: '* click images to zoom in *',
      capDesktop: 'my desktop',
      capExplorer: 'file explorer',
      capGlazeDesc: 'glazewm is a tiling window manager for windows that allows me to have a more organized and productive workspace, basically turning a single monitor laptop into a 10 monitor setup!',
      capGlaze: 'glazewm tiling',
      capFlowDesc: 'flow launcher is a fast and powerful launcher that allows me to quickly access files and applications',
      capFlow: 'flow launcher',
      capFencesDesc: "stardock fences allow me to hide my desktop icons whenever i don't need them and keep my desktop tidy!",
      capFencesRolled: 'fences (rolled)',
      capFencesUnrolled: 'fences (unrolled)',
      windhawkTitle: 'Windhawk (about + mod list)',
      windhawkDesc: 'windhawk allows me to turn my windows desktop into a glass themed, transparent, macos 26 tahoe styled windows 11 which is stable, simple, quick, way more productive than regular windows and obviously way more pleasing to the eye :)',
      modCore: ':: Core Mods',
      modSystem: ':: System Tweaks',
      // workspace page
      spaceTitle: ' workspace',
      spaceIntro: "here's my setup — inspired by a clean, black, minimalist aesthetic.",
      spaceCapSetup1: 'setup — angle 1',
      spaceCapSetup2: 'setup — angle 2',
      spaceCapPC: 'my pc',
      modCoreItem1: 'Resource Redirect',
      modCoreNoteIcons: '(macOS 26 icons by niivu)',
      modCoreItem2: 'Translucent Windows',
      modCoreItem3: 'UXTheme Hook',
      modCoreItem4: 'Windows 11 File Explorer Styler',
      modCoreItem5: 'Windows 11 Notification Center Styler',
      modCoreItem6: 'Windows 11 Start Menu Styler',
      modCoreItem7: 'Windows 11 Taskbar Styler',
      modCoreItem8: 'Taskbar Clock Customization',
      modCoreItem9: 'CEF/Spotify Tweaks',
      modCoreNoteSpotify: '(no auto-updates)',
      modCoreItem10: 'No Focus Rectangle',
      modCoreItem11: 'Slick Window Arrangement',
      modCoreItem12: 'Taskbar Volume Control',
      modSystemItem1: 'Better file sizes in Explorer details',
      modSystemItem2: 'Open With - Remove MS Store Menu Item',
      modSystemItem3: 'Customize Windows notifications placement',
      modSystemItem4: 'Dark mode context menus',
      modSystemItem5: 'Disable grouping on the taskbar',
      modSystemItem6: 'Fix Darkmode ListViews',
      modSystemItem7: 'Taskbar height and icon size',
      modSystemItem8: 'Taskbar on top for Windows 11',
      modSystemItem9: 'Taskbar tray icon spacing and grid',
      modSystemItem10: 'Taskbar tray system icon tweaks'
    }
  }
};

let lang = localStorage.getItem('lang') || 'en';

const typingEl = document.querySelector('.typed-text');
const langToggle = document.getElementById('lang-toggle');
const themeBtn = document.querySelector('.theme-btn');
const themeIcon = document.querySelector('.theme-icon');
const themeTooltip = document.querySelector('.theme-tooltip');
const translatables = document.querySelectorAll('[data-translate]');

let queue = [];
let last = '';
let cycleToken = 0;
let theme = 'dark';

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function refillQueue() {
  if (translations[lang] && translations[lang].messages) {
    queue = shuffle(translations[lang].messages);
    if (queue.length > 1 && queue[0] === last) [queue[0], queue[1]] = [queue[1], queue[0]];
  }
}

function updateLangButton() {
  if (langToggle) {
    langToggle.textContent = `lang=${lang}`;
  }
}

function scrambleText(el, finalText) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
  const length = finalText.length;
  let iterations = 0;

  const interval = setInterval(() => {
    el.textContent = finalText
      .split('')
      .map((letter, index) => {
        if (index < iterations) {
          return finalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');

    if (iterations >= length) {
      clearInterval(interval);
      el.textContent = finalText;
    }

    iterations += 1 / 3;
  }, 30);
}

function applyLang(newLang) {
  if (!translations[newLang]) return;
  lang = newLang;
  localStorage.setItem('lang', lang);
  queue = [];
  last = '';
  document.documentElement.setAttribute('lang', lang);

  const isMainPage = !!typingEl;

  // update all translatable elements
  translatables.forEach(el => {
    const k = el.dataset.translate;
    if (translations[lang].ui[k]) {
      if (isMainPage) {
        scrambleText(el, translations[lang].ui[k]);
      } else {
        el.textContent = translations[lang].ui[k];
      }
    }
  });

  if (themeTooltip && translations[lang].ui.flashbang) {
    themeTooltip.textContent = translations[lang].ui.flashbang;
  }

  updateExpandPills();

  updateLangButton();
  // restart typing cycle if on main page
  if (typingEl) startCycle();
}

function triggerMatrixExplosion(x, y) {
  const particles = 30;
  for (let i = 0; i < particles; i++) {
    const span = document.createElement('span');
    span.className = 'matrix-particle';
    span.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);

    const offsetX = (Math.random() - 0.5) * 150;
    const offsetY = (Math.random() - 0.5) * 150;

    span.style.left = `${x + offsetX}px`;
    span.style.top = `${y + offsetY}px`;
    span.style.animationDuration = `${1.5 + Math.random() * 2}s`;

    document.body.appendChild(span);

    setTimeout(() => {
      span.remove();
    }, 4000);
  }
}

function toggleLanguage(e) {
  if (e && e.target) {
    const rect = e.target.getBoundingClientRect();
    triggerMatrixExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }
  const newLang = lang === 'en' ? 'pl' : 'en';
  applyLang(newLang);
}

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function typeMsg(msg, token) {
  if (!typingEl) return;
  for (const ch of msg) {
    if (token !== cycleToken) return;
    typingEl.textContent += ch;
    await wait(45);
  }
}

async function deleteMsg(token) {
  if (!typingEl) return;
  while (typingEl.textContent && token === cycleToken) {
    typingEl.textContent = typingEl.textContent.slice(0, -1);
    await wait(40);
  }
}

async function runCycle(token) {
  if (!typingEl) return;
  while (token === cycleToken) {
    if (!queue.length) refillQueue();
    if (!queue.length) break;
    const msg = queue.shift();
    last = msg;
    await typeMsg(msg, token);
    if (token !== cycleToken) break;
    const hold = Math.max(1000, 10000 - msg.length * (45 + 40));
    await wait(hold);
    if (token !== cycleToken) break;
    await deleteMsg(token);
  }
}

function startCycle() {
  if (!typingEl) return;
  cycleToken++;
  const t = cycleToken;
  typingEl.textContent = '';
  if (!queue.length) refillQueue();
  runCycle(t);
}

function toggleTheme(e) {
  if (e && e.target) {
    const btn = e.target.closest('.theme-btn') || e.target;
    const rect = btn.getBoundingClientRect();
    triggerMatrixExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }
  theme = theme === 'dark' ? 'light' : 'dark';
  document.body.classList.toggle('light-mode', theme === 'light');
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  if (themeBtn) themeBtn.dataset.theme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') theme = 'light';
  document.body.classList.toggle('light-mode', theme === 'light');
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  if (themeBtn) themeBtn.dataset.theme = theme === 'dark' ? 'light' : 'dark';
}

/* image fade-in logic */
function initImageFadeIn() {
  const images = document.querySelectorAll('img');

  const fadeIn = (img) => {
    img.classList.add('fade-in');
  };

  images.forEach(img => {
    if (img.complete) {
      fadeIn(img);
    } else {
      img.addEventListener('load', () => fadeIn(img));
    }
  });
}

/* lightbox logic */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item img');
  if (galleryItems.length === 0) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';

  const img = document.createElement('img');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.ariaLabel = 'Close lightbox';

  lightbox.appendChild(img);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);

  galleryItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', e => {
      e.preventDefault();
      img.src = item.src;
      img.alt = item.alt;
      lightbox.classList.add('active');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    setTimeout(() => {
      img.src = '';
    }, 300);
  };

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

function initExpandableDetails() {
  const detailsList = document.querySelectorAll('details');
  if (!detailsList.length) return;

  const setOpenState = (details, open, animate = true) => {
    const content = details.querySelector('.expand-content');
    if (!content) return;

    const openContent = () => {
      content.style.maxHeight = `${content.scrollHeight}px`;
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
    };

    const closeContent = () => {
      content.style.maxHeight = '0px';
      content.style.opacity = '0';
      content.style.transform = 'translateY(-6px)';
    };

    if (!animate) {
      content.style.transition = 'none';
      if (open) {
        details.open = true;
        openContent();
      } else {
        closeContent();
        details.open = false;
      }
      requestAnimationFrame(() => {
        content.style.transition = '';
        updateExpandPills();
      });
      return;
    }

    if (open) {
      details.open = true;
      requestAnimationFrame(() => {
        openContent();
        updateExpandPills();
      });
    } else {
      const onEnd = (e) => {
        if (e.propertyName !== 'max-height') return;
        content.removeEventListener('transitionend', onEnd);
        details.open = false;
        updateExpandPills();
      };
      content.addEventListener('transitionend', onEnd);
      requestAnimationFrame(() => {
        content.style.maxHeight = `${content.scrollHeight}px`;
        requestAnimationFrame(closeContent);
      });
    }
  };

  detailsList.forEach(details => {
    setOpenState(details, details.open, false);

    const summary = details.querySelector('summary');
    if (!summary) return;

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      setOpenState(details, !details.open, true);
    });
  });

  const openDetailsForHash = () => {
    const hash = window.location.hash;
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    const details = target.closest('details');
    if (details) {
      setOpenState(details, true, false);
    }
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  openDetailsForHash();
  window.addEventListener('hashchange', openDetailsForHash);
}

function updateExpandPills() {
  const pills = document.querySelectorAll('[data-expand-pill]');
  if (!pills.length) return;

  pills.forEach(pill => {
    const details = pill.closest('details');
    const isOpen = details ? details.open : false;
    const openKey = pill.dataset.expandOpenKey || 'expandOpen';
    const closedKey = pill.dataset.expandClosedKey || 'expandClosed';
    const openText = translations[lang]?.ui?.[openKey] || 'collapse section ↟';
    const closedText = translations[lang]?.ui?.[closedKey] || 'expand section ↴';
    pill.textContent = isOpen ? openText : closedText;
    pill.dataset.state = isOpen ? 'open' : 'closed';
  });
}

// initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
    initImageFadeIn();
    initExpandableDetails();
  });
} else {
  initLightbox();
  initImageFadeIn();
  initExpandableDetails();
}

if (langToggle) {
  langToggle.addEventListener('click', toggleLanguage);
}
if (themeBtn) {
  themeBtn.addEventListener('click', toggleTheme);
}

// initial setup
updateLangButton();
initTheme();
applyLang(lang);