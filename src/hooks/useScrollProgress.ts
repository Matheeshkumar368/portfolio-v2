import { useEffect, useRef } from 'react';

/**
 * Tracks the user's scroll position within a target element as a 0..1
 * progress value and writes it into a ref. Using a ref (not state) means
 * Three.js's useFrame can read it every frame without re-rendering React.
 */
export function useScrollProgress(
  targetHeight: number
): React.MutableRefObject<number> {
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const p = Math.max(0, Math.min(1, y / targetHeight));
      progress.current = p;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [targetHeight]);

  return progress;
}
