import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect, type RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioRuntimeOptions {
  readonly rootRef: RefObject<HTMLElement | null>;
  readonly reducedMotion: boolean;
}

function createSmoothScrollRuntime(): () => void {
  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
  });

  function renderFrame(timeInSeconds: number) {
    lenis.raf(timeInSeconds * 1000);
  }

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(renderFrame);
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.destroy();
    gsap.ticker.remove(renderFrame);
  };
}

function createRevealAnimations(rootElement: HTMLElement): () => void {
  const context = gsap.context(() => {
    const heroCopy = rootElement.querySelector<HTMLElement>('[data-hero-copy]');
    if (heroCopy) {
      gsap.from(heroCopy.children, {
        y: 42,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }

    const heroScene = rootElement.querySelector<HTMLElement>('[data-hero-scene]');
    if (heroScene) {
      gsap.from(heroScene, {
        opacity: 0,
        scale: 0.96,
        duration: 1.2,
        delay: 0.15,
        ease: 'power3.out',
      });
    }

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
      gsap.from(element, {
        y: 48,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 86%',
          once: true,
        },
      });
    });

    gsap.utils.toArray<HTMLElement>('[data-project]').forEach((projectElement) => {
      const image = projectElement.querySelector<HTMLImageElement>('.project-visual img');
      if (!image) return;

      gsap.fromTo(
        image,
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: projectElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, rootElement);

  return () => context.revert();
}

export function usePortfolioRuntime({
  rootRef,
  reducedMotion,
}: PortfolioRuntimeOptions): void {
  useEffect(() => {
    if (reducedMotion) return undefined;
    return createSmoothScrollRuntime();
  }, [reducedMotion]);

  useEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement || reducedMotion) return undefined;
    return createRevealAnimations(rootElement);
  }, [reducedMotion, rootRef]);
}
