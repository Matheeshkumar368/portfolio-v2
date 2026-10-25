import { FolderGit2, FileText, ArrowDown } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import { useAudio } from '@/audio/AudioProvider';

/** Lightweight 2D fallback shown when WebGL/3D is unavailable or on very small screens. */
export function HeroFallback({ onExplore, onResume }: { onExplore: () => void; onResume: () => void }) {
  const { playSfx } = useAudio();
  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-ink-950">
      <div className="absolute inset-0 bg-radial-ember opacity-70" />
      <div className="absolute inset-0 bg-grid-faint [background-size:40px_40px] opacity-30" />
      {/* Stylized silhouette stand-in (left) */}
      <div className="absolute left-1/2 top-1/2 h-[70vh] w-[40vh] -translate-x-[140%] -translate-y-1/2 rounded-t-full bg-gradient-to-b from-ink-700/60 to-ink-900/80 shadow-ember-lg md:left-[18%] md:translate-x-0" aria-hidden />

      <div className="container-cine relative z-10">
        <div className="ml-auto max-w-xl">
          <p className="eyebrow mb-5">Interactive Developer Universe</p>
          <h1 className="heading-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
            {PROFILE.name}
          </h1>
          <p className="mt-4 font-display text-lg font-medium text-ember-300 md:text-xl">
            {PROFILE.title}
          </p>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ink-300">
            {PROFILE.education}. {PROFILE.intro}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => { playSfx('click'); onExplore(); }}
              onMouseEnter={() => playSfx('hover')}
              className="btn-primary"
            >
              <FolderGit2 size={18} /> Explore projects
            </button>
            <button
              onClick={() => { playSfx('click'); onResume(); }}
              onMouseEnter={() => playSfx('hover')}
              className="btn-ghost"
              disabled={!PROFILE.links.resumeUrl}
            >
              <FileText size={18} /> View resume
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">Scroll to enter</span>
        <ArrowDown size={16} className="text-ember-400 animate-pulse-soft" />
      </div>
    </div>
  );
}
