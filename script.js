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
      flashbang: 'uważaj na flashbanga!'
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
      flashbang: 'watch out for the flashbang!'
    }
  }
};

const typingEl = document.querySelector('.typed-text');
const cursorEl = document.querySelector('.cursor');
const langBtns = document.querySelectorAll('.lang-btn');
const themeBtn = document.querySelector('.theme-btn');
const themeIcon = document.querySelector('.theme-icon');
const themeTooltip = document.querySelector('.theme-tooltip');
const translatables = document.querySelectorAll('[data-translate]');

let lang = 'pl';
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
  queue = shuffle(translations[lang].messages);
  if (queue.length > 1 && queue[0] === last) [queue[0], queue[1]] = [queue[1], queue[0]];
}

function applyLang(newLang) {
  if (newLang === lang || !translations[newLang]) return;
  lang = newLang;
  queue = [];
  last = '';
  document.documentElement.setAttribute('lang', lang);
  translatables.forEach(el => {
    const k = el.dataset.translate;
    if (translations[lang].ui[k]) el.textContent = translations[lang].ui[k];
  });
  if (themeTooltip) {
    themeTooltip.textContent = translations[lang].ui.flashbang;
  }
  langBtns.forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  startCycle();
}

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function typeMsg(msg, token) {
  for (const ch of msg) {
    if (token !== cycleToken) return;
    typingEl.textContent += ch;
    await wait(45);
  }
}

async function deleteMsg(token) {
  while (typingEl.textContent && token === cycleToken) {
    typingEl.textContent = typingEl.textContent.slice(0, -1);
    await wait(40);
  }
}

async function runCycle(token) {
  while (token === cycleToken) {
    if (!queue.length) refillQueue();
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
  cycleToken++;
  const t = cycleToken;
  typingEl.textContent = '';
  if (!queue.length) refillQueue();
  runCycle(t);
}

function toggleTheme() {
  theme = theme === 'dark' ? 'light' : 'dark';
  document.body.classList.toggle('light-mode', theme === 'light');
  themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  themeBtn.dataset.theme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') theme = 'light';
  document.body.classList.toggle('light-mode', theme === 'light');
  themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  themeBtn.dataset.theme = theme === 'dark' ? 'light' : 'dark';
}

langBtns.forEach(btn => btn.addEventListener('click', () => applyLang(btn.dataset.lang)));
themeBtn.addEventListener('click', toggleTheme);

translatables.forEach(el => {
  const k = el.dataset.translate;
  if (translations[lang].ui[k]) el.textContent = translations[lang].ui[k];
});
if (themeTooltip) {
  themeTooltip.textContent = translations[lang].ui.flashbang;
}

initTheme();
startCycle();