import { ActionLink, SectionHeading } from '../../components/InterfaceElements';
import {
  experience,
  workflow,
  type ExperienceEntry,
  type WorkflowStep,
} from '../../content/portfolioContent';
import './profile-module.css';

const githubContributionSnapshot = {
  asOf: '10 Jul 2026',
  total: 1231,
  activeDays: 86,
  publicRepos: 11,
  startDate: '2025-07-12',
  days: [
    ['2026-01-15', 8], ['2026-01-17', 5], ['2026-01-19', 13],
    ['2026-01-21', 4], ['2026-01-24', 11], ['2026-01-28', 6],
    ['2026-02-01', 1], ['2026-02-13', 3], ['2026-03-01', 3],
    ['2026-03-09', 4], ['2026-03-11', 1], ['2026-03-16', 3],
    ['2026-03-17', 5], ['2026-03-19', 3], ['2026-03-23', 11],
    ['2026-03-24', 2], ['2026-03-29', 1], ['2026-03-30', 39],
    ['2026-03-31', 1], ['2026-04-01', 5], ['2026-04-14', 2],
    ['2026-04-16', 12], ['2026-04-17', 2], ['2026-04-19', 4],
    ['2026-04-21', 10], ['2026-04-22', 14], ['2026-04-23', 18],
    ['2026-04-24', 19], ['2026-04-28', 7], ['2026-04-29', 11],
    ['2026-05-05', 37], ['2026-05-06', 51], ['2026-05-07', 21],
    ['2026-05-08', 13], ['2026-05-12', 22], ['2026-05-13', 67],
    ['2026-05-14', 20], ['2026-05-15', 13], ['2026-05-19', 20],
    ['2026-05-20', 6], ['2026-05-21', 32], ['2026-05-22', 2],
    ['2026-05-24', 20], ['2026-05-25', 8], ['2026-05-26', 26],
    ['2026-05-27', 45], ['2026-05-28', 43], ['2026-05-29', 47],
    ['2026-05-30', 16], ['2026-05-31', 55], ['2026-06-02', 20],
    ['2026-06-03', 14], ['2026-06-05', 25], ['2026-06-07', 56],
    ['2026-06-08', 12], ['2026-06-09', 8], ['2026-06-10', 50],
    ['2026-06-11', 3], ['2026-06-12', 1], ['2026-06-15', 33],
    ['2026-06-19', 1], ['2026-06-20', 8], ['2026-06-21', 12],
    ['2026-06-23', 33], ['2026-06-24', 6], ['2026-06-25', 2],
    ['2026-06-26', 15], ['2026-06-29', 10], ['2026-06-30', 2],
    ['2026-07-01', 5], ['2026-07-02', 11], ['2026-07-03', 18],
    ['2026-07-05', 1], ['2026-07-06', 17], ['2026-07-07', 35],
    ['2026-07-08', 4], ['2026-07-09', 1], ['2026-07-10', 15],
  ] as const,
} as const;

function createContributionCells() {
  const countsByDate = new Map<string, number>(githubContributionSnapshot.days);
  const startDate = new Date(`${githubContributionSnapshot.startDate}T00:00:00Z`);

  return Array.from({ length: 364 }, (_, index) => {
    const date = new Date(startDate);
    date.setUTCDate(startDate.getUTCDate() + index);
    const dateString = date.toISOString().slice(0, 10);
    return { date: dateString, count: countsByDate.get(dateString) ?? 0 };
  });
}

function contributionLevel(count: number) {
  if (count === 0) return 0;
  if (count < 5) return 1;
  if (count < 15) return 2;
  if (count < 35) return 3;
  return 4;
}

const contributionCells = createContributionCells();

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

function GithubSection() {
  return (
    <section className="section github-section" aria-labelledby="github-heading">
      <div className="github-copy" data-reveal>
        <p className="eyebrow">GitHub / verified activity</p>
        <h2 id="github-heading">The work continues between the case studies.</h2>
        <p>
          A dated snapshot of coding activity across public and private work. The
          graph covers the latest year and keeps the same honest zero-days as GitHub.
        </p>
        <ActionLink href="https://github.com/wojciechsacewicz" target="_blank" rel="noreferrer">
          Open GitHub profile
        </ActionLink>
      </div>

      <div className="github-card" data-reveal>
        <div className="github-card-header">
          <span>@wojciechsacewicz</span>
          <span>Snapshot · {githubContributionSnapshot.asOf}</span>
        </div>
        <div className="github-metrics">
          <div>
            <strong>{githubContributionSnapshot.total.toLocaleString('en-US')}</strong>
            <span>contributions / 365 days</span>
          </div>
          <div>
            <strong>{githubContributionSnapshot.activeDays}</strong>
            <span>active days</span>
          </div>
          <div>
            <strong>{githubContributionSnapshot.publicRepos}</strong>
            <span>public repos</span>
          </div>
        </div>
        <div className="contribution-visual">
          <div className="contribution-weekdays" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
          <div className="contribution-chart" aria-label="GitHub contribution activity for the last year">
            {contributionCells.map((cell) => (
              <span
                key={cell.date}
                className={`contribution-level-${contributionLevel(cell.count)}`}
                title={`${cell.date}: ${cell.count} contributions`}
              />
            ))}
          </div>
        </div>
        <div className="github-card-footer">
          <span>Jul</span><span>Sep</span><span>Nov</span><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span>
          <span className="contribution-legend"><i /> Less <i className="contribution-level-2" /><i className="contribution-level-4" /> More</span>
        </div>
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
        <div className="portrait-tag">21 / building now</div>
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
      <GithubSection />
      <AboutSection />
    </>
  );
}
