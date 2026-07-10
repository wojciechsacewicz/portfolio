import { ActionLink, SectionHeading } from '../../components/InterfaceElements';
import {
  experience,
  workflow,
  type ExperienceEntry,
  type WorkflowStep,
} from '../../content/portfolioContent';
import './profile-module.css';

function WorkflowStepArticle({ step }: { readonly step: WorkflowStep }) {
  return (
    <article data-reveal>
      <span>{step.number}</span>
      <h3>{step.title}</h3>
      <p>{step.body}</p>
    </article>
  );
}

function MethodSection() {
  return (
    <section className="section method-section" id="method">
      <div className="method-intro" data-reveal>
        <p className="eyebrow">Operating model</p>
        <h2>AI increases throughput. The workflow protects quality.</h2>
        <p>
          I use agents across the whole development loop, but not as an excuse to
          skip the work that makes software dependable: scope, repository context,
          review, tests and browser verification.
        </p>
      </div>

      <div className="workflow-list">
        {workflow.map((step) => (
          <WorkflowStepArticle key={step.number} step={step} />
        ))}
      </div>
    </section>
  );
}

function ExperienceArticle({ entry }: { readonly entry: ExperienceEntry }) {
  return (
    <article data-reveal>
      <time>{entry.period}</time>
      <div className="experience-title">
        <h3>{entry.role}</h3>
        <p>{entry.company}</p>
      </div>
      <div className="experience-body">
        <p>{entry.lead}</p>
        <ul>
          {entry.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ExperienceSection() {
  return (
    <section className="section experience-section" id="experience">
      <SectionHeading
        compact
        eyebrow="Experience"
        title="Early career. Real responsibility."
      />

      <div className="experience-list">
        {experience.map((entry) => (
          <ExperienceArticle key={`${entry.company}-${entry.role}`} entry={entry} />
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section about-section">
      <div className="portrait-frame" data-reveal>
        <img
          src="/assets/wojtek-profile.png"
          alt="Portrait of Wojciech Sacewicz"
          loading="lazy"
        />
        <div className="portrait-tag">21 / Gdynia / building now</div>
      </div>

      <div className="about-copy" data-reveal>
        <p className="eyebrow">What I bring</p>
        <h2>A builder who can own the space between a rough problem and a working product.</h2>
        <p>
          My strongest work sits between engineering and product. I can clarify a
          fuzzy requirement, move through a new codebase, build the feature,
          explain the trade-offs and keep iterating until the real workflow works.
        </p>
        <p>
          I study Computer Science and Econometrics at the University of Gdańsk.
          That is context, not the headline. The headline is the work above.
        </p>

        <div className="about-links">
          <ActionLink
            href="https://linkedin.com/in/wojciech-sacewicz"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </ActionLink>
          <ActionLink
            href="https://github.com/wojciechsacewicz"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </ActionLink>
        </div>
      </div>
    </section>
  );
}

export function ProfileModule() {
  return (
    <>
      <MethodSection />
      <ExperienceSection />
      <AboutSection />
    </>
  );
}
