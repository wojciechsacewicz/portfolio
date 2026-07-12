import { ActionLink } from '../../components/InterfaceElements';
import { proofPoints } from '../../content/portfolioContent';
import './hero-module.css';

function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="Verified proof points">
      {proofPoints.map((point) => (
        <article key={point.value} className="proof-card" data-reveal>
          <strong>{point.value}</strong>
          <div>
            <h2>{point.label}</h2>
            <p>{point.note}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export function HeroModule() {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-grid-lines" aria-hidden="true" />

        <div className="hero-copy" data-hero-copy>
          <p className="eyebrow">AI Native Developer · Product Engineer</p>
          <h1>
            I build with AI.
            <span>I ship like an engineer.</span>
          </h1>
          <div className="hero-support">
            <p className="hero-lead">
              I turn ambiguous product problems into working software: products,
              internal tools and automations built with coding agents, product judgment
              and verification in the loop.
            </p>
            <div className="hero-principle">
              <span>Working principle / 01</span>
              <p>
                AI increases the pace. Engineering discipline decides what is ready to ship.
              </p>
            </div>
          </div>
          <div className="hero-actions">
            <ActionLink variant="primary" href="#work">See the evidence</ActionLink>
            <ActionLink variant="secondary" href="/cv-portfolio-en.pdf" showArrow={false}>Open CV</ActionLink>
          </div>
        </div>
      </section>

      <ProofStrip />
    </>
  );
}
