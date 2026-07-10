import { useState } from 'react';
import { ActionLink, SectionHeading } from '../../components/InterfaceElements';
import {
  isExternalUrl,
  projects,
  type PortfolioProject,
} from '../../content/portfolioContent';
import './work-module.css';

interface ProjectVisualProps {
  readonly project: PortfolioProject;
}

function ProjectVisual({ project }: ProjectVisualProps) {
  const [hasImageFailed, setHasImageFailed] = useState(false);
  const external = isExternalUrl(project.url);

  return (
    <a
      className={`project-visual${hasImageFailed ? ' project-visual-fallback' : ''}`}
      href={project.url}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      aria-label={`Open ${project.name}`}
    >
      {hasImageFailed ? (
        <div className="project-visual-placeholder" aria-hidden="true">
          <span>{project.number}</span>
          <strong>{project.name}</strong>
        </div>
      ) : (
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          onError={() => setHasImageFailed(true)}
        />
      )}
      <span className="visual-label">{external ? 'Live evidence' : 'Case evidence'}</span>
    </a>
  );
}

interface ProjectArticleProps {
  readonly project: PortfolioProject;
}

function ProjectArticle({ project }: ProjectArticleProps) {
  const external = isExternalUrl(project.url);

  return (
    <article className={`project project-${project.tone}`} data-project>
      <div className="project-index">{project.number}</div>

      <div className="project-copy">
        <p className="project-kicker">{project.descriptor}</p>
        <h3>{project.name}</h3>
        <p className="project-summary">{project.summary}</p>

        <ul className="evidence-list">
          {project.evidence.map((evidenceItem) => (
            <li key={evidenceItem}>{evidenceItem}</li>
          ))}
        </ul>

        <div className="stack-row" aria-label={`${project.name} technology stack`}>
          {project.stack.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <ActionLink
          className="project-link"
          href={project.url}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
        >
          {external ? 'Open live product' : 'Read experience'}
        </ActionLink>
      </div>

      <ProjectVisual project={project} />
    </article>
  );
}

export function WorkModule() {
  return (
    <section className="section work-section" id="work">
      <SectionHeading
        eyebrow="Selected work / 2025—2026"
        title="Proof over potential."
        description="Each project shows a different part of the job: product ownership, full-stack delivery and process automation with a measured outcome."
      />

      <div className="project-list">
        {projects.map((project) => (
          <ProjectArticle key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
