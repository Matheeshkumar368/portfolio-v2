import { useEffect, useState } from 'react';
import { type SectionId } from '@/data/portfolio';

/**
 * Reports which launcher section is currently in view so the nav can
 * highlight it. Section apps open as overlays (not scroll targets), so this
 * tracks the launcher tiles by their index position.
 */
export function useActiveSection(): SectionId | 'hero' {
  const [active, setActive] = useState<SectionId | 'hero'>('hero');

  useEffect(() => {
    const launcher = document.getElementById('launcher');
    const onScroll = () => {
      if (!launcher) return;
      const top = launcher.getBoundingClientRect().top;
      if (top > window.innerHeight * 0.6) {
        setActive('hero');
      } else {
        // Highlight projects as the representative section while in the launcher.
        setActive('projects');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return active;
}
