import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import {
  isExternalUrl,
  projects,
  type PortfolioProject,
} from '../../content/portfolioContent';
import {
  ProjectDitherShader,
  type DitherPalette,
} from './ProjectDitherShader';
import './work-module.css';

interface ProjectPresentation {
  readonly type: string;
  readonly year: string;
  readonly status?: string;
  readonly palette: DitherPalette;
}

const projectPresentation: Record<string, ProjectPresentation> = {
  'mumink-tattoo': {
    type: 'Client work',
    year: '2026',
    palette: {
      dark: [0.02, 0.02, 0.025],
      accent: [0.28, 0.28, 0.3],
      paper: [0.95, 0.94, 0.91],
      hoverAccent: [0.36, 0.36, 0.38],
      hoverPaper: [1, 0.98, 0.94],
    },
  },
  veldia: {
    type: 'Product',
    year: '2026',
    palette: {
      dark: [0.03, 0.09, 0.15],
      accent: [0.18, 0.51, 0.74],
      paper: [0.56, 0.84, 1],
      hoverAccent: [0.25, 0.58, 0.8],
      hoverPaper: [0.68, 0.89, 1],
    },
  },
  dovista: {
    type: 'Automation',
    year: '2025',
    palette: {
      dark: [0.07, 0.09, 0.1],
      accent: [0.4, 0.43, 0.45],
      paper: [0.86, 0.88, 0.89],
      hoverAccent: [0.34, 0.46, 0.54],
      hoverPaper: [0.9, 0.93, 0.94],
    },
  },
  llmpolska: {
    type: 'Platform',
    year: '2026',
    palette: {
      dark: [0.035, 0.047, 0.075],
      accent: [0.925, 0.153, 0.145],
      paper: [0.85, 0.87, 0.91],
      hoverAccent: [0.98, 0.23, 0.2],
      hoverPaper: [0.78, 0.84, 0.92],
    },
  },
  roletailor: {
    type: 'Desktop app',
    year: '2026',
    status: 'Currently building',
    palette: {
      dark: [0.02, 0.12, 0.14],
      accent: [0.33, 0.89, 0.78],
      paper: [0.27, 0.48, 0.88],
      hoverAccent: [0.4, 0.94, 0.84],
      hoverPaper: [0.58, 0.74, 0.98],
    },
  },
};

const dovistaFlow = [
  ['01', 'Documents', 'Input'],
  ['02', 'OCR extraction', 'UiPath DU'],
  ['03', 'SAP process', 'Robot'],
  ['04', 'Final report', 'Output'],
] as const;

function DovistaProcessVisual() {
  return (
    <div className="dovista-process" aria-hidden="true">
      <div className="dovista-report">
        <span>Management report</span>
        <strong>
          SAP
          <br />→ PDF
        </strong>
        <div className="dovista-report-lines">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="dovista-flow">
        <div>
          <strong>−40%</strong>
          <span>report generation time</span>
        </div>
        <ol>
          {dovistaFlow.map(([number, label, detail]) => (
            <li key={number}>
              <b>{number}</b>
              <span>{label}</span>
              <em>{detail}</em>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function VeldiaProductVisual() {
  return (
    <div className="veldia-product" aria-hidden="true">
      <div className="veldia-preview">
        <span>Manager overview</span>
        <div className="veldia-dashboard">
          <img src="/assets/veldia-dashboard.png" alt="" loading="lazy" />
        </div>
      </div>

      <div className="veldia-preview">
        <span>Schedule workflow</span>
        <div className="veldia-schedule">
          <div>
            <img src="/assets/veldia-schedule.png" alt="" loading="lazy" />
          </div>
          <i aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function FramedProjectImage({ project }: { readonly project: PortfolioProject }) {
  const [hasImageFailed, setHasImageFailed] = useState(false);

  if (hasImageFailed || !project.image) {
    return (
      <div className="project-visual-placeholder" aria-hidden="true">
        <span>{project.number}</span>
        <strong>{project.name}</strong>
      </div>
    );
  }

  return (
    <div className={`project-frame project-frame-${project.id}`}>
      {project.id === 'roletailor' ? (
        <div className="project-window-bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      ) : null}
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        onError={() => setHasImageFailed(true)}
      />
    </div>
  );
}

function MuminkProjectVideo({
  active,
  project,
}: {
  readonly active: boolean;
  readonly project: PortfolioProject;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const desktopQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    let pauseTimer = 0;
    let animationFrame = 0;
    let cancelled = false;

    const stop = () => {
      window.clearTimeout(pauseTimer);
      window.cancelAnimationFrame(animationFrame);
      video.pause();
    };

    const reverse = (onComplete?: () => void) => {
      stop();
      const startTime = video.currentTime;
      const startedAt = performance.now();
      const duration = Math.max(450, (startTime / video.duration) * 4800);
      let lastSeekAt = 0;

      const tick = (now: number) => {
        if (cancelled) return;

        const progress = Math.min((now - startedAt) / duration, 1);
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        if (now - lastSeekAt >= 1000 / 30 || progress === 1) {
          video.currentTime = startTime * (1 - eased);
          lastSeekAt = now;
        }

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(tick);
        } else {
          onComplete?.();
        }
      };

      animationFrame = window.requestAnimationFrame(tick);
    };

    const startMobileBoomerang = () => {
      let forward: () => void;
      const backward = () => {
        if (cancelled) return;
        reverse(() => {
          pauseTimer = window.setTimeout(forward, 420);
        });
      };

      forward = () => {
        if (cancelled) return;
        video.addEventListener(
          'ended',
          () => {
            pauseTimer = window.setTimeout(backward, 380);
          },
          { once: true },
        );
        video.play().catch(() => undefined);
      };

      forward();
    };

    const syncPlayback = () => {
      stop();

      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      if (reducedMotion) {
        video.currentTime = 0;
      } else if (desktopQuery.matches) {
        if (active) {
          video.play().catch(() => undefined);
        } else if (video.currentTime > 0) {
          reverse();
        }
      } else {
        startMobileBoomerang();
      }
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      syncPlayback();
    } else {
      video.addEventListener('loadeddata', syncPlayback, { once: true });
    }
    desktopQuery.addEventListener('change', syncPlayback);

    return () => {
      cancelled = true;
      stop();
      video.removeEventListener('loadeddata', syncPlayback);
      desktopQuery.removeEventListener('change', syncPlayback);
    };
  }, [active, reducedMotion]);

  return (
    <div className="project-frame project-frame-mumink-tattoo">
      <video
        ref={videoRef}
        src="/assets/projects/mumink-scroll-60fps.webm"
        poster={project.image}
        aria-label={project.imageAlt}
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}

function ProjectVisual({
  active,
  project,
}: {
  readonly active: boolean;
  readonly project: PortfolioProject;
}) {
  if (project.id === 'dovista') return <DovistaProcessVisual />;
  if (project.id === 'veldia') return <VeldiaProductVisual />;
  if (project.id === 'mumink-tattoo') {
    return <MuminkProjectVideo active={active} project={project} />;
  }

  return <FramedProjectImage project={project} />;
}

function ProjectLink({
  href,
  project,
}: {
  readonly href: string;
  readonly project: PortfolioProject;
}) {
  const external = isExternalUrl(href);
  const label =
    project.id === 'roletailor'
      ? 'View source'
      : external
        ? 'View project'
        : 'View case study';

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function technologyMark(technology: string): string {
  return technology
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function ProjectCard({
  project,
  index,
}: {
  readonly project: PortfolioProject;
  readonly index: number;
}) {
  const reducedMotion = Boolean(useReducedMotion());
  const [isActive, setIsActive] = useState(false);
  const presentation = projectPresentation[project.id] ?? projectPresentation.veldia!;
  const primaryDestination = project.caseStudyUrl || project.url;

  return (
    <motion.article
      className={`project-card project-card-${project.id}`}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: reducedMotion ? 0 : 0.5,
        delay: reducedMotion ? 0 : Math.min(index * 0.04, 0.12),
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerEnter={() => setIsActive(true)}
      onPointerLeave={() => setIsActive(false)}
      onFocusCapture={() => setIsActive(true)}
      onBlurCapture={() => setIsActive(false)}
    >
      <a
        className="project-card-media"
        href={primaryDestination}
        target={isExternalUrl(primaryDestination) ? '_blank' : undefined}
        rel={isExternalUrl(primaryDestination) ? 'noreferrer' : undefined}
        aria-label={`Open ${project.name}`}
      >
        <ProjectDitherShader active={isActive} palette={presentation.palette} />
        <ProjectVisual active={isActive} project={project} />
      </a>

      <div className="project-card-copy">
        <div className="project-heading">
          <div>
            <h3>{project.name}</h3>
            {presentation.status ? (
              <span className="project-status">{presentation.status}</span>
            ) : null}
          </div>
          <span className="project-year">
            {presentation.type} · {presentation.year}
          </span>
        </div>

        <p className="project-description">{project.descriptor}</p>

        <div className="project-card-footer">
          <ProjectLink href={primaryDestination} project={project} />
          <ul className="project-stack" aria-label={`${project.name} technology stack`}>
            {project.stack.slice(0, 4).map((technology) => (
              <li key={technology} title={technology}>
                <span aria-hidden="true">{technologyMark(technology)}</span>
                <span className="sr-only">{technology}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export function WorkModule() {
  return (
    <section className="work-section" id="work" aria-labelledby="work-heading">
      <header className="module-heading work-heading">
        <p className="module-label">Projects</p>
        <div>
          <h2 id="work-heading">Selected work.</h2>
          <p>Client work, owned products and one measured automation.</p>
        </div>
      </header>

      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
