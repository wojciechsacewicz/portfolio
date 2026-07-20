import { ActionLink } from '../../components/InterfaceElements';
import {
  experience,
  recruiterFaq,
  type ExperienceEntry,
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

function ExperienceArticle({ entry }: { readonly entry: ExperienceEntry }) {
  return (
    <article data-reveal>
      <time>{entry.period}</time>
      <div className="experience-title">
        <h3>{entry.role}</h3>
        <p>{entry.company}</p>
      </div>
      <p className="experience-summary">{entry.lead}</p>
    </article>
  );
}

function ExperienceSection() {
  return (
    <section className="section experience-section" id="experience">
      <header className="profile-section-heading" data-reveal>
        <p className="eyebrow">Work history</p>
        <h2>Experience</h2>
      </header>

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
    <section className="section github-section" id="github" aria-labelledby="github-heading">
      <div className="github-heading" data-reveal>
        <p className="eyebrow">GitHub / snapshot</p>
        <h2 id="github-heading">Activity</h2>
        <p>Public and private contribution activity across the latest recorded year.</p>
        <ActionLink href="https://github.com/wojciechsacewicz" target="_blank" rel="noreferrer">
          Open GitHub
        </ActionLink>
      </div>

      <div className="github-card" data-reveal>
        <div className="github-card-header">
          <span>@wojciechsacewicz</span>
          <span>As of {githubContributionSnapshot.asOf}</span>
        </div>

        <div className="github-metrics">
          <div>
            <strong>{githubContributionSnapshot.total.toLocaleString('en-US')}</strong>
            <span>contributions</span>
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
          <div className="contribution-weekdays" aria-hidden="true">
            <span>Mon</span><span>Wed</span><span>Fri</span>
          </div>
          <div className="contribution-chart" aria-label="GitHub contribution activity for the recorded year">
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
          <span className="contribution-legend">
            <i /> Less <i className="contribution-level-2" /><i className="contribution-level-4" /> More
          </span>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <header className="about-heading" data-reveal>
        <p className="eyebrow">About</p>
        <h2>Wojtek, 21, Tricity.</h2>
      </header>

      <div className="about-copy" data-reveal>
        <p>
          I build web products, internal tools and automation. Most of my current work uses
          React, TypeScript and Cloudflare.
        </p>
        <p>
          I work at IDEGO and study Computer Science and Econometrics at the University of
          Gdańsk. Outside work, I build and maintain my own products.
        </p>
        <div className="about-links">
          <ActionLink href="https://github.com/wojciechsacewicz" target="_blank" rel="noreferrer">
            GitHub
          </ActionLink>
          <ActionLink href="https://linkedin.com/in/wojciech-sacewicz" target="_blank" rel="noreferrer">
            LinkedIn
          </ActionLink>
          <ActionLink href="/resume">Resume</ActionLink>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-heading">
      <header className="faq-heading" data-reveal>
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-heading">Quick answers</h2>
      </header>

      <div className="faq-list">
        {recruiterFaq.map((item) => (
          <details key={item.question} data-reveal>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function HomeContactSection() {
  return (
    <section className="home-contact" id="contact">
      <div data-reveal>
        <p className="eyebrow">Contact</p>
        <h2>
          <a href="mailto:wojciechsacewicz@outlook.com">wojciechsacewicz@outlook.com</a>
        </h2>
        <p>For a role, a project or a direct question.</p>
      </div>

      <footer>
        <span>Wojciech Sacewicz © 2026</span>
        <span>Tricity, Poland</span>
      </footer>
    </section>
  );
}

export function ProfileModule() {
  return (
    <>
      <ExperienceSection />
      <GithubSection />
      <AboutSection />
      <FaqSection />
      <HomeContactSection />
    </>
  );
}
