import { useMemo } from 'react';
import { ArrowDown, FileText, FolderGit2 } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import { useAudio } from '@/audio/AudioProvider';

interface HeroOverlayProps {
  progress: number;
  onExplore: () => void;
  onResume: () => void;
  onScrollDown?: (e: React.MouseEvent) => void;
}

/**
 * Right-side hero narrative: Name, title, verified education, summary and direct CTA actions.
 * Prominently positioned on the right half of the viewport while Matheeshkumar's character
 * stands on the left. Fades out smoothly as the user initiates scroll.
 */
export function HeroOverlay({ progress, onExplore, onResume, onScrollDown }: HeroOverlayProps) {
  const { playSfx } = useAudio();
  const opacity = useMemo(() => Math.max(0, 1 - progress * 2.2), [progress]);
  const translateY = useMemo(() => progress * -35, [progress]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center"
      style={{ opacity, transform: `translateY(${translateY}px)` }}
      aria-hidden={opacity < 0.05}
    >
      <div className="container-cine">
        <div className="ml-auto w-full md:w-1/2 md:max-w-xl lg:max-w-2xl pl-0 md:pl-6">
          {/* Eyebrow & status indicator */}
          <div className="mb-4 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ember-400/90">
              Interactive Developer Universe
            </span>
          </div>

          {/* Primary Name */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink-100 leading-[1.08]">
            {PROFILE.name}
          </h1>

          {/* Title with accent */}
          <p className="mt-3 font-display text-lg sm:text-xl font-semibold text-ember-400">
            {PROFILE.title}
          </p>

          {/* Academic & Professional intro */}
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-azure-300">
            <span>{PROFILE.college}</span>
            <span aria-hidden="true">·</span>
            <span>Anna University</span>
          </div>

          <p className="mt-4 text-pretty text-sm sm:text-base leading-relaxed text-ink-200">
            {PROFILE.intro}
          </p>

          {/* Action buttons */}
          <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                playSfx('click');
                onExplore();
              }}
              onMouseEnter={() => playSfx('hover')}
              className="btn-primary"
            >
              <FolderGit2 size={17} /> Explore projects
            </button>
            <a
              href={PROFILE.links.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playSfx('click');
                onResume();
              }}
              onMouseEnter={() => playSfx('hover')}
              className="btn-ghost"
              title="Open verified resume PDF"
            >
              <FileText size={17} /> View resume (PDF)
            </a>
          </div>

          {/* Quick jump link for visitors who prefer not to scroll */}
          {onScrollDown && (
            <div className="pointer-events-auto mt-5">
              <button
                onClick={onScrollDown}
                className="inline-flex items-center gap-1.5 text-xs text-ink-400 hover:text-ember-300 transition-colors"
              >
                <span>Jump straight to portfolio sections</span>
                <ArrowDown size={13} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scroll cue indicator at bottom center */}
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ opacity: Math.max(0, 1 - progress * 4) }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-400">
          Scroll to activate story
        </span>
        <ArrowDown size={15} className="text-ember-400 animate-bounce" />
      </div>
    </div>
  );
}
