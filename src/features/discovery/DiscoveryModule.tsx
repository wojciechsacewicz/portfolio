import { ActionLink, SectionHeading } from '../../components/InterfaceElements';
import {
  capabilityGroups,
  caseStudies,
  portfolioContent,
  recruiterFaq,
  roleMatches,
  type CaseStudy,
} from '../../content/portfolioContent';
import './discovery-module.css';

interface CaseStudyPageProps {
  readonly slug: string;
}

function RoleIndex() {
  return (
    <ul className="role-index" aria-label="Roles that match this portfolio">
      {roleMatches.map((role) => (
        <li key={role}>{role}</li>
      ))}
    </ul>
  );
}

function CapabilityGrid() {
  return (
    <div className="capability-grid">
      {capabilityGroups.map((group) => (
        <article key={group.title} className="capability-card" data-reveal>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function CaseStudyLinks() {
  return (
    <div className="discovery-case-list">
      {caseStudies.map((study) => (
        <article key={study.slug} data-reveal>
          <p className="eyebrow">Case study</p>
          <h3>{study.shortTitle}</h3>
          <p>{study.description}</p>
          <ActionLink href={`/case-studies/${study.slug}`}>Read case study</ActionLink>
        </article>
      ))}
    </div>
  );
}

function RecruiterFaq() {
  return (
    <div className="recruiter-faq">
      {recruiterFaq.map((item) => (
        <details key={item.question} data-reveal>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function DiscoveryModule() {
  return (
    <section
      className="section discovery-section"
      id="profile-index"
      aria-labelledby="profile-index-heading"
    >
      <SectionHeading
        eyebrow="Recruiter profile"
        title="AI-native developer in Tricity, Poland."
        description={portfolioContent.person.summary}
      />

      <div className="discovery-intro" data-reveal>
        <p>{portfolioContent.person.fit}</p>
        <p>
          {portfolioContent.person.availability} Current context:{' '}
          {portfolioContent.person.education}. Languages:{' '}
          {portfolioContent.person.languages.join(' and ')}.
        </p>
      </div>

      <RoleIndex />
      <CapabilityGrid />

      <div className="discovery-subsection">
        <div>
          <p className="eyebrow">Evidence by project</p>
          <h2 id="profile-index-heading">Work that can be checked, not a list of claims.</h2>
        </div>
        <CaseStudyLinks />
      </div>

      <div className="discovery-subsection discovery-faq-section">
        <div>
          <p className="eyebrow">Direct answers</p>
          <h2>Questions a recruiter or search assistant can resolve quickly.</h2>
        </div>
        <RecruiterFaq />
      </div>

      <div className="discovery-actions" data-reveal>
        <ActionLink variant="primary" href="/resume">Open structured resume</ActionLink>
        <ActionLink variant="secondary" href="/contact">Contact</ActionLink>
      </div>
    </section>
  );
}

export function ResumePage() {
  return (
    <section className="indexed-page resume-page" id="resume">
      <header className="indexed-page-hero" data-hero-copy>
        <p className="eyebrow">
          Structured resume / updated{' '}
          <time dateTime={portfolioContent.lastModified}>{portfolioContent.lastModified}</time>
        </p>
        <h1>{portfolioContent.person.name}</h1>
        <p className="indexed-page-title">
          {portfolioContent.person.headline} · {portfolioContent.person.locationShort}
        </p>
        <p>{portfolioContent.person.summary}</p>
        <p>{portfolioContent.person.availability}</p>
        <div className="indexed-page-actions">
          <ActionLink variant="primary" href="/cv-portfolio-en.pdf">Open PDF CV</ActionLink>
          <ActionLink variant="secondary" href="/contact">Contact</ActionLink>
        </div>
      </header>

      <section className="indexed-page-section" aria-labelledby="resume-fit-heading">
        <p className="eyebrow">Best fit</p>
        <h2 id="resume-fit-heading">Product engineering with AI-assisted delivery and verification.</h2>
        <p>{portfolioContent.person.fit}</p>
        <RoleIndex />
      </section>

      <section className="indexed-page-section" aria-labelledby="resume-experience-heading">
        <p className="eyebrow">Experience</p>
        <h2 id="resume-experience-heading">Commercial work and measurable outcomes.</h2>
        <div className="resume-experience-list">
          {portfolioContent.experience.map((entry) => (
            <article key={`${entry.company}-${entry.role}`}>
              <time>{entry.period}</time>
              <div>
                <h3>{entry.role}</h3>
                <p className="resume-company">{entry.company}</p>
                <p>{entry.summary}</p>
                <ul>
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="indexed-page-section" aria-labelledby="resume-capabilities-heading">
        <p className="eyebrow">Capabilities and tools</p>
        <h2 id="resume-capabilities-heading">Technologies, workflows and problem areas.</h2>
        <CapabilityGrid />
      </section>

      <section className="indexed-page-section" aria-labelledby="resume-evidence-heading">
        <p className="eyebrow">Selected evidence</p>
        <h2 id="resume-evidence-heading">Detailed project context.</h2>
        <CaseStudyLinks />
      </section>
    </section>
  );
}

function CaseStudyListSection({
  eyebrow,
  title,
  items,
}: {
  readonly eyebrow: string;
  readonly title: string;
  readonly items: readonly string[];
}) {
  return (
    <section className="case-study-detail" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function EvidenceSection({ study }: { readonly study: CaseStudy }) {
  return (
    <section className="indexed-page-section" aria-labelledby="case-study-evidence-heading">
      <p className="eyebrow">Evidence</p>
      <h2 id="case-study-evidence-heading">What can be checked.</h2>
      <div className="case-study-evidence-list">
        {study.evidence.map((evidence) => {
          const external = evidence.url.startsWith('http');
          return (
            <article key={`${evidence.kind}-${evidence.url}`}>
              <span>{evidence.kind}</span>
              <h3>{evidence.label}</h3>
              <a
                href={evidence.url}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
              >
                Open evidence
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const study = caseStudies.find((candidate) => candidate.slug === slug);
  if (!study) return <NotFoundPage />;

  return (
    <article className="indexed-page case-study-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Portfolio</a>
        <span aria-hidden="true">/</span>
        <a href="/resume">Case studies</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{study.shortTitle}</span>
      </nav>

      <header className="indexed-page-hero" data-hero-copy>
        <p className="eyebrow">Case study by {portfolioContent.person.name}</p>
        <h1>{study.title}</h1>
        <p>{study.description}</p>
        <dl className="case-study-meta">
          <div>
            <dt>Published</dt>
            <dd><time dateTime={study.datePublished}>{study.datePublished}</time></dd>
          </div>
          <div>
            <dt>Updated</dt>
            <dd><time dateTime={study.dateModified}>{study.dateModified}</time></dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{portfolioContent.person.locationShort}</dd>
          </div>
        </dl>
        <div className="indexed-page-actions">
          {study.liveUrl ? (
            <ActionLink variant="primary" href={study.liveUrl} target="_blank" rel="noreferrer">
              Open live product
            </ActionLink>
          ) : null}
          <ActionLink variant="secondary" href="/resume">View resume</ActionLink>
        </div>
      </header>

      <section className="case-study-summary-grid" aria-label={`${study.shortTitle} project summary`}>
        <article>
          <p className="eyebrow">Context</p>
          <h2>The workflow and users</h2>
          <p>{study.context}</p>
        </article>
        <article>
          <p className="eyebrow">Role and boundaries</p>
          <h2>What I owned</h2>
          <p>{study.roleAndBoundaries}</p>
        </article>
        <article>
          <p className="eyebrow">Outcome</p>
          <h2>What shipped or improved</h2>
          <p>{study.outcome}</p>
        </article>
      </section>

      <div className="case-study-detail-grid">
        <CaseStudyListSection
          eyebrow="Constraints"
          title="What shaped the solution"
          items={study.constraints}
        />
        <CaseStudyListSection
          eyebrow="Implementation"
          title="How the system works"
          items={study.implementation}
        />
        <CaseStudyListSection
          eyebrow="Decisions and trade-offs"
          title="Why it was built this way"
          items={study.decisions}
        />
        <CaseStudyListSection
          eyebrow="AI and automation"
          title="Where automation helped—and where it stopped"
          items={study.aiWorkflow}
        />
        <CaseStudyListSection
          eyebrow="Verification"
          title="How the result was checked"
          items={study.verification}
        />
      </div>

      <section className="case-study-measurement" data-reveal>
        <div>
          <p className="eyebrow">Measurement</p>
          <h2>What the outcome means.</h2>
          <p>{study.measurement}</p>
        </div>
        <aside>
          <p className="eyebrow">Disclosure boundary</p>
          <p>{study.limitations}</p>
        </aside>
      </section>

      <section className="indexed-page-section" aria-labelledby="case-study-stack-heading">
        <p className="eyebrow">Technologies used</p>
        <h2 id="case-study-stack-heading">The implementation stack.</h2>
        <ul className="role-index">
          {study.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </section>

      <EvidenceSection study={study} />

      <nav className="case-study-navigation" aria-label="More case studies">
        <p>More evidence</p>
        {caseStudies
          .filter((candidate) => candidate.slug !== slug)
          .map((candidate) => (
            <a key={candidate.slug} href={`/case-studies/${candidate.slug}`}>
              {candidate.shortTitle}
            </a>
          ))}
      </nav>
    </article>
  );
}

export function NotFoundPage() {
  return (
    <section className="indexed-page not-found-page">
      <header className="indexed-page-hero">
        <p className="eyebrow">404</p>
        <h1>This page does not exist.</h1>
        <p>The portfolio, structured resume and case studies are still available.</p>
        <ActionLink variant="primary" href="/">Back to portfolio</ActionLink>
      </header>
    </section>
  );
}
