import { ActionLink } from '../../components/InterfaceElements';
import { CrtMonitor } from './crt-monitor/CrtMonitor';
import './hero-module.css';

export function HeroModule() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="hero-copy" data-hero-copy>
        <p className="eyebrow">Wojciech Sacewicz · Tricity, Poland</p>
        <h1>Wojciech Sacewicz.</h1>
        <p className="hero-role">
          Product engineering across React, Cloudflare and automation.
        </p>
        <p className="hero-summary">
          Building commercial software at IDEGO and independent products in Tricity, Poland.
        </p>

        <div className="hero-actions">
          <ActionLink variant="primary" href="#work">View work</ActionLink>
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
            <dt>Stack</dt>
            <dd>React / TypeScript / Cloudflare</dd>
          </div>
          <div>
            <dt>Based</dt>
            <dd>Tricity, Poland</dd>
          </div>
        </dl>
      </div>

      <div className="hero-stage" data-reveal>
        <CrtMonitor />
      </div>

      <a className="hero-scroll" href="#work">
        Scroll to work <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
