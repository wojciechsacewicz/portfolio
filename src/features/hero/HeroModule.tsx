import { lazy, Suspense } from 'react';
import { ActionLink } from '../../components/InterfaceElements';
import { proofPoints } from '../../content/portfolioContent';
import './hero-module.css';

const WorkflowScene = lazy(() =>
  import('./WorkflowScene').then((module) => ({ default: module.WorkflowScene })),
);

interface HeroModuleProps {
  readonly reducedMotion: boolean;
}

function HeroScene({ reducedMotion }: HeroModuleProps) {
  return (
    <div className="hero-scene" data-hero-scene>
      <Suspense fallback={<div className="scene-fallback">Loading system map…</div>}>
        <WorkflowScene reducedMotion={reducedMotion} />
      </Suspense>
    </div>
  );
}

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

export function HeroModule({ reducedMotion }: HeroModuleProps) {
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
          <p className="hero-lead">
            Products, internal tools and automations built with coding agents,
            product judgment and verification in the loop.
          </p>
          <div className="hero-actions">
            <ActionLink variant="primary" href="#work">
              See the evidence
            </ActionLink>
            <ActionLink variant="secondary" href="/cv-portfolio-en.pdf" showArrow={false}>
              Open CV
            </ActionLink>
          </div>
        </div>

        <HeroScene reducedMotion={reducedMotion} />

        <div className="hero-meta">
          <span>Gdynia / Tricity, Poland</span>
          <span>Available for ambitious product teams</span>
        </div>
      </section>

      <ProofStrip />
    </>
  );
}
