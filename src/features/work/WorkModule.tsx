import { useState } from 'react';
import { ActionLink } from '../../components/InterfaceElements';
import {
  isExternalUrl,
  projects,
  type PortfolioProject,
} from '../../content/portfolioContent';
import './work-module.css';

const projectMeta: Record<string, { readonly type: string; readonly year: string }> = {
  veldia: { type: 'SaaS / PWA', year: '2026' },
  llmpolska: { type: 'Platform / Community', year: '2026' },
  dovista: { type: 'RPA / SAP', year: '2025' },
  'mumink-tattoo': { type: 'Client website / CMS', year: '2026' },
};

const dovistaFlow = [
  { label: 'Input', detail: 'Purchasing documents' },
  { label: 'OCR', detail: 'Document Understanding' },
  { label: 'SAP', detail: 'Validated data' },
  { label: 'UiPath', detail: 'Automated workflow' },
  { label: 'Report', detail: '40% faster' },
] as const;

function DovistaProcessVisual() {
  return (
    <div className="dovista-process" aria-hidden="true">
      <div className="process-status">
        <span>DOVISTA / DEPLOYED</span>
        <strong>−40%</strong>
      </div>
      <div className="process-flow">
        {dovistaFlow.map((step, index) => (
          <div className="process-node" key={step.label}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step.label}</strong>
            <small>{step.detail}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function VeldiaProductVisual() {
  return (
    <div className="veldia-product" aria-hidden="true">
      <div className="veldia-product-header">
        <span>VELDIA</span>
        <span>LIVE PRODUCT</span>
      </div>
      <div className="veldia-device veldia-device-primary">
        <img src="/assets/veldia-dashboard.png" alt="" loading="lazy" />
      </div>
      <div className="veldia-device veldia-device-secondary">
        <img src="/assets/veldia-schedule.png" alt="" loading="lazy" />
      </div>
    </div>
  );
}

function ProjectVisual({ project }: { readonly project: PortfolioProject }) {
  const [hasImageFailed, setHasImageFailed] = useState(false);

  if (project.id === 'dovista') return <DovistaProcessVisual />;
  if (project.id === 'veldia') return <VeldiaProductVisual />;

  if (hasImageFailed) {
    return (
      <div className="project-visual-placeholder" aria-hidden="true">
        <span>{project.number}</span>
        <strong>{project.name}</strong>
      </div>
    );
  }

  return (
    <img
      className="project-image"
      src={project.image}
      alt={project.imageAlt}
      loading="lazy"
      onError={() => setHasImageFailed(true)}
    />
  );
}

export function WorkModule() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id ?? '');
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0];

  if (!activeProject) return null;

  const external = isExternalUrl(activeProject.url);
  const activeMeta = projectMeta[activeProject.id] ?? { type: 'Project', year: '2026' };

  return (
    <section className="section work-section" id="work">
      <header className="work-heading" data-reveal>
        <p className="eyebrow">Work / 04</p>
        <h2>Projects</h2>
        <p>Products and automation that are live, deployed or publicly checkable.</p>
      </header>

      <div className="work-browser">
        <article
          key={activeProject.id}
          id={`project-panel-${activeProject.id}`}
          className={`work-preview work-preview-${activeProject.tone}`}
          role="tabpanel"
          aria-labelledby={`project-tab-${activeProject.id}`}
          data-project
        >
          <div className="work-preview-visual project-visual">
            <ProjectVisual key={activeProject.id} project={activeProject} />
            <div className="work-preview-overlay">
              <span>{activeMeta.type}</span>
              <strong>{activeProject.name}</strong>
            </div>
          </div>

          <div className="work-preview-copy">
            <p>{activeProject.descriptor}</p>
            <div className="work-preview-stack" aria-label={`${activeProject.name} technology stack`}>
              {activeProject.stack.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
            <ActionLink
              href={activeProject.url}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
            >
              {external ? 'Open project' : 'Read case study'}
            </ActionLink>
          </div>
        </article>

        <div className="work-index" role="tablist" aria-label="Selected projects">
          {projects.map((project) => {
            const isActive = project.id === activeProject.id;
            const meta = projectMeta[project.id] ?? { type: 'Project', year: '2026' };

            return (
              <button
                key={project.id}
                id={`project-tab-${project.id}`}
                className={isActive ? 'work-index-item is-active' : 'work-index-item'}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`project-panel-${project.id}`}
                onClick={() => setActiveProjectId(project.id)}
                onFocus={() => setActiveProjectId(project.id)}
                onMouseEnter={() => setActiveProjectId(project.id)}
              >
                <span className="work-index-number">{project.number}</span>
                <strong>{project.name}</strong>
                <span className="work-index-type">{meta.type}</span>
                <span className="work-index-year">{meta.year}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
