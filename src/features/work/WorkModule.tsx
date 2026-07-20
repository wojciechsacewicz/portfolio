import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { useState, type PointerEvent as ReactPointerEvent } from 'react';
import {
  isExternalUrl,
  projects,
  type PortfolioProject,
} from '../../content/portfolioContent';
import './work-module.css';

const projectMeta: Record<string, { readonly type: string; readonly year: string }> = {
  veldia: { type: 'Product', year: '2026' },
  llmpolska: { type: 'Platform', year: '2026' },
  dovista: { type: 'Automation', year: '2025' },
  'mumink-tattoo': { type: 'Client work', year: '2026' },
};

const dovistaFlow = ['Documents', 'OCR', 'SAP', 'Report'] as const;

function DovistaProcessVisual() {
  return (
    <div className="dovista-process" aria-hidden="true">
      <strong>−40%</strong>
      <div className="dovista-flow">
        {dovistaFlow.map((step, index) => (
          <span key={step}>
            {step}
            {index < dovistaFlow.length - 1 ? <i>→</i> : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function VeldiaProductVisual() {
  return (
    <div className="veldia-product" aria-hidden="true">
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

  if (hasImageFailed || !project.image) {
    return (
      <div className="project-visual-placeholder" aria-hidden="true">
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

interface ProjectCardProps {
  readonly project: PortfolioProject;
  readonly index: number;
  readonly isWide: boolean;
}

function ProjectCard({ project, index, isWide }: ProjectCardProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [3.5, -3.5]), {
    stiffness: 180,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-4.5, 4.5]), {
    stiffness: 180,
    damping: 24,
  });
  const shineX = useTransform(pointerX, [0, 1], ['10%', '90%']);
  const shineY = useTransform(pointerY, [0, 1], ['10%', '90%']);
  const meta = projectMeta[project.id] ?? { type: 'Project', year: '2026' };
  const external = isExternalUrl(project.url);

  function updatePointer(event: ReactPointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  }

  function resetPointer() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <motion.article
      className={`project-card project-card-${project.id}${isWide ? ' project-card-wide' : ''}`}
      style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      initial={reducedMotion ? false : { opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.04, 0.16), ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
    >
      <a
        className="project-card-link"
        href={project.url}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        aria-label={`${project.name}: ${project.descriptor}`}
      >
        <div className="project-card-media">
          <ProjectVisual project={project} />
          <motion.span
            className="project-card-shine"
            aria-hidden="true"
            style={reducedMotion ? undefined : { left: shineX, top: shineY }}
          />
        </div>

        <div className="project-card-copy">
          <div className="project-card-title">
            <h3>{project.name}</h3>
            <span aria-hidden="true">↗</span>
          </div>
          <p>{project.descriptor}</p>
          <div className="project-card-meta" aria-label={`${meta.type}, ${meta.year}`}>
            <span>{meta.type}</span>
            <span>{meta.year}</span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

export function WorkModule() {
  return (
    <section className="work-section" id="work" aria-labelledby="work-heading">
      <h2 className="sr-only" id="work-heading">Selected projects</h2>
      <div className="project-grid">
        {projects.map((project, index) => {
          const isLastUnpairedCard = index === projects.length - 1 && projects.length % 2 === 0;
          return (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isWide={index === 0 || isLastUnpairedCard}
            />
          );
        })}
      </div>
    </section>
  );
}
