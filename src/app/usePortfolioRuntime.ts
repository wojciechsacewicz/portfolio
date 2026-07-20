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
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        autoRaf: true,
        anchors: true,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const context = gsap.context(() => {
        const heroCopy = rootElement.querySelector<HTMLElement>('[data-hero-copy]');
        if (heroCopy) {
          gsap.from(heroCopy.children, {
            y: 36,
            opacity: 0,
            duration: 0.9,
            stagger: 0.07,
            ease: 'power3.out',
          });
        }

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 42,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-project]').forEach((projectElement) => {
          const image = projectElement.querySelector<HTMLImageElement>('.project-visual img');
          if (!image) return;

          gsap.fromTo(
            image,
            { scale: 1.06 },
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
      };
    });

    return () => {
      isCancelled = true;
      disposeRuntime?.();
    };
  }, [reducedMotion, rootRef]);
}
