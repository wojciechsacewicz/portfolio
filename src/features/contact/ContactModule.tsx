import { useState } from 'react';
import { ActionLink, CopyIcon, ExternalLinkIcon } from '../../components/InterfaceElements';
import { technologies } from '../../content/portfolioContent';
import './contact-module.css';

const technologyIconPaths: Record<(typeof technologies)[number]['slug'], string> = {
  react: 'M14.23 12.004a2.236 2.236 0 1 1-4.471 0 2.236 2.236 0 0 1 4.471 0zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-2.03 0-2.79 2.48-2.08 6.643C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113.61 6.655 2.09 6.655 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603 2.03 0 2.79-2.47 2.08-6.64C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11-.05-6.658-2.079-6.658zM12 8.1c.74 0 1.477.034 2.202.093.79 1.13 1.53 2.43 2.201 3.806-.65 1.39-1.39 2.7-2.193 3.82-1.46.13-2.95.13-4.412.005-.79-1.13-1.53-2.43-2.201-3.806.65-1.39 1.39-2.7 2.193-3.82A25 25 0 0 1 12 8.1z',
  typescript: 'M1.125 0A1.125 1.125 0 0 0 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75C23.498 24 24 23.498 24 22.875V1.125C24 .502 23.498 0 22.875 0zm2.25 9.938h9.563v2.166H9.506v9.646H6.789v-9.646H3.375zm15.113-.188c1.23 0 2.21.15 2.933.451v2.458a5.1 5.1 0 0 0-2.786-.821c-1.06 0-1.675.43-1.675 1.192 0 .77.7 1.12 1.85 1.61 2.2.93 3.17 2.08 3.17 3.78 0 2.27-1.73 3.49-4.67 3.49-1.28 0-2.49-.22-3.35-.65v-2.63a5.03 5.03 0 0 0 3.237 1.2c1.08 0 1.67-.37 1.67-1.03 0-.77-.82-1.15-2.08-1.68-1.99-.83-2.73-2.04-2.73-3.61 0-2.15 1.67-3.56 4.43-3.56z',
  cloudflare: 'M16.509 16.845c.147-.507.09-.971-.156-1.316-.225-.316-.604-.499-1.061-.52l-8.66-.112a.156.156 0 0 1-.133-.072c-.064-.096.02-.3.183-.31l8.736-.114c1.035-.049 2.16-.887 2.554-1.913l.499-1.302c.021-.056.029-.113.014-.168-.562-2.546-2.835-4.445-5.55-4.445-2.504 0-4.628 1.618-5.387 3.862-.493-.366-1.119-.563-1.794-.5-1.203.12-2.167 1.084-2.286 2.286-.029.31-.007.613.063.894C1.568 13.171 0 14.775 0 16.752c0 .175.014.352.035.527.014.083.084.148.169.148h15.981c.091 0 .176-.065.204-.156l.12-.426zm2.757-5.564c-.077 0-.161 0-.239.011-.056 0-.105.042-.127.098l-.338 1.174c-.147.507-.092.971.154 1.317.226.316.606.498 1.063.519l1.844.113c.16 0 .222.13.154.227-.028.084-.113.148-.204.155l-1.921.112c-1.041.049-2.158.887-2.553 1.914l-.14.358c-.028.072.021.142.099.142h6.597c.077 0 .147-.049.169-.126.112-.408.176-.837.176-1.28 0-2.603-2.125-4.727-4.734-4.727z',
  nodedotjs: 'M11.998 24c-.321 0-.641-.084-.922-.247L2.28 18.675a1.854 1.854 0 0 1-.922-1.604V6.921c0-.659.353-1.275.922-1.603L11.075.236a1.9 1.9 0 0 1 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.273-.924 1.604l-8.794 5.078c-.28.163-.599.247-.925.247zm-.136-1.615a.28.28 0 0 0 .272 0l8.795-5.076a.28.28 0 0 0 .134-.238V6.921a.29.29 0 0 0-.137-.242l-8.791-5.072a.28.28 0 0 0-.271 0L3.075 6.68a.28.28 0 0 0-.139.241v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551l3.552 2.014c.438.245.224.332.08.383l.168.63c.585-.203.703-.25 1.328-.604a.22.22 0 0 1 .218.017z',
  vite: 'M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z',
  threejs: 'M.38 0a.268.268 0 0 0-.256.332l5.794 23.464a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.877-1.4zm6.28 1.538l4.878 1.404-3.662 3.53zm-.52.13l1.208 4.9-4.853-1.392zm6.3 1.534l4.947 1.424-3.715 3.574zm-.524.12l1.215 4.926-4.876-1.398zM2.192 6.478l4.964 1.424-3.726 3.586zm5.855 1.672l4.877 1.4-3.66 3.527zm5.756 1.672l4.965 1.425-3.73 3.586zM3.653 12.387l4.873 1.406-3.656 3.523zm5.854 1.687l4.863 1.403-3.648 3.51zm-4.436 4.06l5.037 1.442-3.782 3.638z',
  docker: 'M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327a5.2 5.2 0 0 0-.612 1.43c-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748c.01 1.4.24 2.77.692 4.062.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.25 12.25 0 0 0 3.823-1.389 11.5 11.5 0 0 0 2.61-2.136c1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046L24 10.077zM2.204 11.078h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185zm2.93 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185zm2.965 0h2.119a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185zm2.93 0h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185zm2.954 0h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185z',
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a10.5 10.5 0 0 1 6 0c2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
};

const contactItems = [
  { label: 'Portfolio', value: 'sacewi.cz', href: 'https://sacewi.cz/' },
  { label: 'Email', value: 'wojciechsacewicz@outlook.com', href: 'mailto:wojciechsacewicz@outlook.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/wojciech-sacewicz', href: 'https://linkedin.com/in/wojciech-sacewicz' },
  { label: 'GitHub', value: 'github.com/wojciechsacewicz', href: 'https://github.com/wojciechsacewicz' },
] as const;

function TechnologyBand() {
  const repeatedTechnologies = [...technologies, ...technologies];

  return (
    <section className="technology-band" aria-label="Core technologies">
      <div className="technology-track">
        {repeatedTechnologies.map((technology, index) => (
          <div className="technology-item" key={`${technology.slug}-${index}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d={technologyIconPaths[technology.slug]} />
            </svg>
            <span>{technology.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactPage() {
  const [copyStatus, setCopyStatus] = useState<string>('');

  async function copyValue(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(`${label} copied`);
    } catch {
      setCopyStatus('Copy is unavailable in this browser');
    }
  }

  return (
    <>
      <section className="contact-page" id="contact-details">
        <div className="contact-page-intro" data-hero-copy>
          <p className="eyebrow">Contact / direct channels</p>
          <h1>Let’s make the next useful thing.</h1>
          <p>
            For product engineering, internal tools, automation or a difficult
            workflow that deserves a clearer system.
          </p>
        </div>

        <div className="contact-grid" aria-live="polite">
          {contactItems.map((item, index) => (
            <article className="contact-card" key={item.label} data-reveal>
              <span className="contact-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
              <div className="contact-actions">
                <button type="button" onClick={() => copyValue(item.label, item.value)} aria-label={`Copy ${item.label}`}>
                  <CopyIcon />
                  <span>Copy</span>
                </button>
                <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>
                  <ExternalLinkIcon />
                  <span>Open</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="copy-status" role="status">{copyStatus}</p>

        <footer className="contact-footer">
          <span>Wojciech Sacewicz © 2026</span>
          <span>Gdynia / Tricity, Poland</span>
        </footer>
      </section>
      <TechnologyBand />
    </>
  );
}

function ContactTeaser() {
  return (
    <section className="contact-section" id="contact">
      <p className="eyebrow">Next step</p>
      <h2>A direct line, without the form.</h2>
      <p>Portfolio, email, LinkedIn and GitHub — all in one focused contact view.</p>
      <ActionLink className="contact-link" href="/contact">Open contact page</ActionLink>
      <footer>
        <span>Wojciech Sacewicz © 2026</span>
        <span>React, Three.js and verified evidence.</span>
      </footer>
    </section>
  );
}

interface ContactModuleProps {
  readonly standalone?: boolean;
}

export function ContactModule({ standalone = false }: ContactModuleProps) {
  if (standalone) return <ContactPage />;

  return (
    <>
      <TechnologyBand />
      <ContactTeaser />
    </>
  );
}
