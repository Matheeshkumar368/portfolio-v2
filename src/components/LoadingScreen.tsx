import { useEffect, useState } from 'react';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1600);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950 transition-opacity duration-500 ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-radial-ember opacity-60" />
      <div className="relative flex flex-col items-center gap-6">
        <p className="eyebrow">Initializing universe</p>
        <div className="font-display text-5xl font-semibold tracking-tight text-ink-100 md:text-7xl">
          <span className="shimmer-text">Matheeshkumar S</span>
        </div>
        <div className="h-px w-56 overflow-hidden bg-ink-700 md:w-72">
          <div
            className="h-full bg-gradient-to-r from-ember-500 to-ember-300 transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono text-xs text-ink-400">{progress}%</p>
      </div>
    </div>
  );
}
