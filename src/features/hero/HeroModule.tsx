import { ActionLink } from '../../components/InterfaceElements';
import './hero-module.css';

export function HeroModule() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="hero-copy" data-hero-copy>
        <p className="eyebrow">Wojciech Sacewicz · Tricity, Poland</p>
        <h1>Wojciech Sacewicz.</h1>
        <p className="hero-role">
          AI-native developer building React products, internal tools and automation.
        </p>
        <p className="hero-summary">
          Currently working at IDEGO and studying Computer Science and Econometrics at the
          University of Gdańsk.
        </p>

        <div className="hero-actions">
          <ActionLink variant="primary" href="#work">Selected work</ActionLink>
          <ActionLink variant="secondary" href="/cv-portfolio-en.pdf" showArrow={false}>
            Open CV
          </ActionLink>
        </div>

        <dl className="hero-facts" aria-label="Current professional details">
          <div>
            <dt>Now</dt>
            <dd>IDEGO</dd>
          </div>
          <div>
            <dt>Main stack</dt>
            <dd>React, TypeScript, Cloudflare</dd>
          </div>
          <div>
            <dt>Work</dt>
            <dd>Tricity and remote Europe</dd>
          </div>
        </dl>
      </div>

      <figure className="hero-portrait" data-reveal>
        <img src="/assets/wojtek-profile.png" alt="Wojciech Sacewicz" />
        <figcaption>Gdynia · 2026</figcaption>
      </figure>
    </section>
  );
}
