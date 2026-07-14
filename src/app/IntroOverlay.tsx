import { useEffect, useState } from 'react';

const INTRO_SESSION_KEY = 'portfolio-intro-seen';
const INTRO_DURATION_MS = 2800;

interface IntroOverlayProps {
  readonly reducedMotion: boolean;
}

export function IntroOverlay({ reducedMotion }: IntroOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion || sessionStorage.getItem(INTRO_SESSION_KEY) === 'true') {
      return undefined;
    }

    setIsVisible(true);
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    const timeoutId = window.setTimeout(() => setIsVisible(false), INTRO_DURATION_MS);

    function skipOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsVisible(false);
    }

    window.addEventListener('keydown', skipOnEscape);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('keydown', skipOnEscape);
    };
  }, [reducedMotion]);

  if (!isVisible) return null;

  return (
    <div className="intro-overlay" role="dialog" aria-label="Website introduction">
      <div className="intro-copy" aria-live="polite">
        <span>Hello.</span>
        <span>I am Wojciech Sacewicz.</span>
        <span>This is my work.</span>
      </div>
      <button className="intro-skip" type="button" onClick={() => setIsVisible(false)}>
        Skip intro
      </button>
    </div>
  );
}
