const translations = {
  pl: {
    messages: [
      'eksploruje technologię',
      "techniczny_pasjonat = {'od kodu po wideo'}",
      'student IT z pasją do ulepszania narzędzi i procesów',
      'analityczne myślenie. kreatywne wykonanie.'
    ],
    ui: {
      ctaWork: 'zobacz projekty',
      ctaContact: 'skontaktuj się',
      ctaAboutMe: 'o mnie',
      flashbang: 'uważaj na flashbanga!',
      // about page stuff
      aboutTitle: '> o mnie',
      aboutIntro: 'jestem studentem informatyki i ekonometrii, który uwielbia majsterkować przy różnych rzeczach, takich jak:',
      btnWorkspace: '<moje stanowisko>',
      btnWindows: '<mój setup windows>',
      goBack: 'wróć',
      // contact
      contactTitle: '> skontaktuj się',
      contactIntro: 'chcesz współpracować? skontaktuj się ze mną tutaj...',
      btnEmail: 'email',
      btnLinkedin: 'linkedin',
      btnCV: 'pobierz moje cv!',
      // work stuff
      workTitle: '> moje projekty',
      secVideo: 'montaż wideo',
      vidPlaceholder: '[ miejsce na wideo ]',
      vidSub: 'później dodam tu właściwe wideo',
      secCode: 'kod',
      projPortfolioTitle: 'strona portfolio',
      projPortfolioDesc: 'strona, którą teraz przeglądasz. zbudowana w czystym html/css/js.',
      linkGithub: 'zobacz na githubie →',
      projMoreTitle: 'więcej wkrótce...',
      projMoreDesc: 'sprawdź mój github po najnowsze aktualizacje.',
      linkProfile: 'zobacz profil →',
      // windows page
      winTitle: '> setup windows',
      winIntro: 'personalizacja windowsa dla maksymalnej produktywności i estetyki przy użyciu zewnętrznego oprogramowania!',
      winListIntro: 'oto lista oprogramowania, którego używam:',
      winZoomNote: '* kliknij zdjęcia aby powiększyć *',
      capDesktop: 'mój pulpit',
      capExplorer: 'eksplorator plików',
      capGlazeDesc: 'glazewm to kafelkowy menedżer okien dla windowsa, który pozwala mi na bardziej zorganizowaną i produktywną pracę, w zasadzie zamieniając laptopa z jednym monitorem w setup z 10 monitorami!',
      capGlaze: 'kafelkowanie glazewm',
      capFlowDesc: 'flow launcher to szybki i potężny launcher, który pozwala mi błyskawicznie otwierać pliki i aplikacje',
      capFlow: 'flow launcher',
      capFencesDesc: "stardock fences allow me to hide my desktop icons whenever i don't need them and keep my desktop tidy!",
      capFencesRolled: 'fences (rolled)',
      capFencesUnrolled: 'fences (unrolled)',
      windhawkTitle: 'Windhawk (o programie + lista modów)',
      windhawkDesc: 'windhawk pozwala mi zamienić pulpit windowsa w szklany, przezroczysty, stylizowany na macos 26 tahoe windows 11, który jest stabilny, prosty, szybki, znacznie bardziej produktywny niż zwykły windows i oczywiście znacznie przyjemniejszy dla oka :)',
      modCore: ':: Mody Podstawowe',
      modSystem: ':: Usprawnienia Systemowe',
      // workspace page
      spaceTitle: '> stanowisko',
      spaceIntro: 'tutaj wstawię zdjęcia mojego czystego, minimalistycznego, czarnego biurka',
      spacePlaceholder: 'TO JEST PLACEHOLDER, prawdziwe zdjęcie biurka pojawi się wkrótce'
    }
  },
  en: {
    messages: [
      'exploring technology',
      "technical_enthusiast = {'from code to video'}",
      'it student focused on improving tools and processes',
      'analytical thinking. creative execution.'
    ],
    ui: {
      ctaWork: 'see my work',
      ctaContact: 'get in touch',
      ctaAboutMe: 'about me',
      flashbang: 'watch out for the flashbang!',
      // about page
      aboutTitle: '> about me',
      aboutIntro: 'i am computer science and econometrics student that loves tinkering with stuff, which some of them are:',
      btnWorkspace: '<my workspace>',
      btnWindows: '<my windows setup>',
      goBack: 'go back',
      // contact page
      contactTitle: '> get in touch',
      contactIntro: 'want to work together? contact me here...',
      btnEmail: 'email',
      btnLinkedin: 'linkedin',
      btnCV: 'download my cv!',
      // work page
      workTitle: '> my work',
      secVideo: 'video editing',
      vidPlaceholder: '[ video placeholder ]',
      vidSub: "later i'll add the proper video here",
      secCode: 'code',
      projPortfolioTitle: 'portfolio website',
      projPortfolioDesc: 'the site you are looking at right now. built with vanilla html/css/js.',
      linkGithub: 'view on github →',
      projMoreTitle: 'more coming soon...',
      projMoreDesc: 'check my github for latest updates.',
      linkProfile: 'view profile →',
      // windows page
      winTitle: '> windows setup',
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
      spaceTitle: '> workspace',
      spaceIntro: "here i'll put some pictures of my clean, minimalistic black desk setup",
      spacePlaceholder: 'THIS IS A PLACEHOLDER, real desk picture will come soon'
    }
  }
};

let lang = localStorage.getItem('lang') || 'en';

const typingEl = document.querySelector('.typed-text');
const cursorEl = document.querySelector('.cursor');
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

  const isMainPage = !!langToggle;

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

// initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
    initImageFadeIn();
  });
} else {
  initLightbox();
  initImageFadeIn();
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