import { ActionLink, SectionHeading } from '../../components/InterfaceElements';
import seoProfile from '../../content/seoProfile.json';
import './discovery-module.css';

interface CaseStudyPageProps {
  readonly slug: string;
}

function RoleIndex() {
  return (
    <ul className="role-index" aria-label="Relevant software engineering roles">
      {seoProfile.roleAliases.map((role) => (
        <li key={role}>{role}</li>
      ))}
    </ul>
  );
}

function CapabilityGrid() {
  return (
    <div className="capability-grid">
      {seoProfile.capabilityGroups.map((group) => (
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
      {seoProfile.caseStudies.map((study) => (
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
      {seoProfile.faq.map((item) => (
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
    <section className="section discovery-section" id="profile-index" aria-labelledby="profile-index-heading">
      <SectionHeading
        eyebrow="Recruiter and AI search profile"
        title="AI-native developer in Poland / Tricity."
        description={seoProfile.person.summary}
      />

      <div className="discovery-intro" data-reveal>
        <p>{seoProfile.person.fit}</p>
        <p>
          Current context: {seoProfile.person.education}. Languages: {seoProfile.person.languages.join(' and ')}.
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
        <p className="eyebrow">Structured resume / updated {seoProfile.lastModified}</p>
        <h1>{seoProfile.person.name}</h1>
        <p className="indexed-page-title">{seoProfile.person.headline} · {seoProfile.person.location}</p>
        <p>{seoProfile.person.summary}</p>
        <div className="indexed-page-actions">
          <ActionLink variant="primary" href="/cv-portfolio-en.pdf">Open PDF CV</ActionLink>
          <ActionLink variant="secondary" href="/contact">Contact</ActionLink>
        </div>
      </header>

      <section className="indexed-page-section" aria-labelledby="resume-fit-heading">
        <p className="eyebrow">Best fit</p>
        <h2 id="resume-fit-heading">Product engineering with AI-assisted delivery and verification.</h2>
        <p>{seoProfile.person.fit}</p>
        <RoleIndex />
      </section>

      <section className="indexed-page-section" aria-labelledby="resume-experience-heading">
        <p className="eyebrow">Experience</p>
        <h2 id="resume-experience-heading">Commercial work and measurable outcomes.</h2>
        <div className="resume-experience-list">
          {seoProfile.experience.map((entry) => (
            <article key={`${entry.company}-${entry.role}`}>
              <time>{entry.period}</time>
              <div>
                <h3>{entry.role}</h3>
                <p className="resume-company">{entry.company}</p>
                <p>{entry.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="indexed-page-section" aria-labelledby="resume-capabilities-heading">
        <p className="eyebrow">Capabilities and keywords</p>
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

export function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const study = seoProfile.caseStudies.find((candidate) => candidate.slug === slug);
  if (!study) return <NotFoundPage />;

  return (
    <article className="indexed-page case-study-page">
      <header className="indexed-page-hero" data-hero-copy>
        <p className="eyebrow">Case study / {seoProfile.person.name}</p>
        <h1>{study.title}</h1>
        <p>{study.description}</p>
        <div className="indexed-page-actions">
          {study.liveUrl ? (
            <ActionLink variant="primary" href={study.liveUrl} target="_blank" rel="noreferrer">
              Open live product
            </ActionLink>
          ) : null}
          <ActionLink variant="secondary" href="/resume">View resume</ActionLink>
        </div>
      </header>

      <section className="case-study-facts" aria-label={`${study.shortTitle} project details`}>
        <article>
          <p className="eyebrow">Problem</p>
          <h2>What needed to change</h2>
          <p>{study.problem}</p>
        </article>
        <article>
          <p className="eyebrow">Ownership</p>
          <h2>What I was responsible for</h2>
          <p>{study.ownership}</p>
        </article>
        <article>
          <p className="eyebrow">Outcome</p>
          <h2>What shipped or improved</h2>
          <p>{study.outcome}</p>
        </article>
      </section>

      <section className="indexed-page-section" aria-labelledby="case-study-stack-heading">
        <p className="eyebrow">Technology and methods</p>
        <h2 id="case-study-stack-heading">The implementation vocabulary.</h2>
        <ul className="role-index">
          {study.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </section>

      <nav className="case-study-navigation" aria-label="More case studies">
        <p>More evidence</p>
        {seoProfile.caseStudies
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
