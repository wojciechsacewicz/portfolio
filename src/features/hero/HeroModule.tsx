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

      <div className="hero-stage" data-reveal aria-label="Preview of selected portfolio projects">
        <div className="hero-stage-header">
          <span>Selected work</span>
          <span>2025—2026</span>
        </div>

        <div className="hero-frame hero-frame-primary">
          <img src="/assets/veldia-dashboard.png" alt="Veldia manager dashboard" />
        </div>
        <div className="hero-frame hero-frame-secondary">
          <img src="/assets/veldia-schedule.png" alt="Veldia schedule interface" />
        </div>
        <div className="hero-frame hero-frame-signal" aria-hidden="true">
          <span>llmpolska</span>
          <strong>Practical AI in Polish.</strong>
        </div>

        <div className="hero-stage-footer">
          <span>03 live products</span>
          <span>01 deployed automation</span>
        </div>
      </div>

      <a className="hero-scroll" href="#work">
        Scroll to work <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
