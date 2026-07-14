import { useEffect, type RefObject } from 'react';

interface PortfolioRuntimeOptions {
  readonly rootRef: RefObject<HTMLElement | null>;
  readonly reducedMotion: boolean;
}

export function usePortfolioRuntime({
  rootRef,
  reducedMotion,
}: PortfolioRuntimeOptions): void {
  useEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement || reducedMotion) return undefined;

    let isCancelled = false;
    let disposeRuntime: (() => void) | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('lenis'),
    ]).then(([gsapModule, scrollTriggerModule, lenisModule]) => {
      if (isCancelled) return;

      const gsap = gsapModule.default;
      const { ScrollTrigger } = scrollTriggerModule;
      const Lenis = lenisModule.default;
      gsap.registerPlugin(ScrollTrigger);

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

      disposeRuntime = () => {
        context.revert();
        lenis.destroy();
        gsap.ticker.remove(renderFrame);
      };
    });

    return () => {
      isCancelled = true;
      disposeRuntime?.();
    };
  }, [reducedMotion, rootRef]);
}
