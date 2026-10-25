import { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Music,
  Play,
  Pause,
  Maximize,
  Minimize,
  ChevronUp,
  AlertTriangle,
} from 'lucide-react';
import { useAudio } from '@/audio/AudioProvider';
import { useFullscreen } from '@/hooks/useFullscreen';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Single, fixed, intentional music & control dock.
 * Accurately reports "Enable Music", "Pause Music", or "Resume Music",
 * with a sophisticated, cinematic flowing audio-wave visualizer.
 */
export function ControlDock() {
  const {
    isPlaying,
    isPaused,
    muted,
    volume,
    sfxVolume,
    audioError,
    toggleMusic,
    toggleMute,
    setVolume,
    setSfxVolume,
  } = useAudio();
  const { isFullscreen, toggle } = useFullscreen();
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const isVisualizerActive = isPlaying && !muted && !reduced;

  return (
    <aside
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end gap-3 pointer-events-auto select-none"
      aria-label="Audio and Viewport Controls"
    >
      {/* Expanded Control Panel */}
      {expanded && (
        <div className="w-80 rounded-2xl border border-ink-700/80 bg-[#0c1020]/95 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl animate-fade-in text-ink-100">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-2 w-2 rounded-full ${
                  isPlaying ? 'bg-[#38bdf8] animate-pulse' : 'bg-ink-500'
                }`}
              />
              <span className="font-mono text-xs font-medium uppercase tracking-wider text-ink-200">
                Saxophone Jazz
              </span>
            </div>
            <button
              onClick={toggleMute}
              className="text-ink-400 hover:text-[#38bdf8] transition-colors p-1"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Audio File Notice if Missing */}
            {audioError && (
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-[11px] leading-relaxed text-amber-200 flex items-start gap-2.5">
                <AlertTriangle size={15} className="shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <p className="font-semibold text-amber-300">Audio Track Needed</p>
                  <p className="mt-1 text-[10px] text-amber-200/90">
                    Place your slow jazz saxophone MP3 at:
                  </p>
                  <code className="block mt-1 font-mono text-[10px] bg-black/40 px-2 py-1 rounded text-white border border-amber-500/20 break-all">
                    public/assets/audio/portfolio-jazz.mp3
                  </code>
                </div>
              </div>
            )}

            {/* Music Volume Control (default 35%) */}
            <div>
              <div className="mb-1.5 flex items-center justify-between text-ink-300">
                <label htmlFor="music-volume-slider" className="flex items-center gap-1.5 font-medium">
                  <Music size={13} className="text-[#38bdf8]" /> Music Volume
                </label>
                <span className="font-mono text-[11px] text-ink-400">
                  {muted ? '0%' : `${Math.round(volume * 100)}%`}
                </span>
              </div>
              <input
                id="music-volume-slider"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="slider w-full cursor-pointer"
                aria-label="Music volume"
              />
            </div>

            {/* Sound Effects Volume Control */}
            <div>
              <div className="mb-1.5 flex items-center justify-between text-ink-300">
                <label htmlFor="sfx-volume-slider" className="font-medium text-ink-300">
                  Interface SFX
                </label>
                <span className="font-mono text-[11px] text-ink-400">
                  {Math.round(sfxVolume * 100)}%
                </span>
              </div>
              <input
                id="sfx-volume-slider"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={sfxVolume}
                onChange={(e) => setSfxVolume(Number(e.target.value))}
                className="slider w-full cursor-pointer"
                aria-label="Sound effects volume"
              />
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggle}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-medium text-ink-200 transition-colors hover:border-[#38bdf8]/50 hover:text-white"
            >
              {isFullscreen ? <Minimize size={13} /> : <Maximize size={13} />}
              {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </button>
          </div>
        </div>
      )}

      {/* Main Dock Buttons with Exact Required Labels & Flowing Waveform */}
      <div className="flex items-center gap-2">
        <button
          id="music-toggle-btn"
          onClick={toggleMusic}
          className={`group relative flex flex-col items-center justify-center rounded-2xl border px-4 py-2 shadow-lg backdrop-blur-xl transition-all duration-300 min-w-[136px] ${
            isPlaying
              ? 'border-[#38bdf8]/60 bg-[#0c1220]/95 text-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.25)]'
              : 'border-white/10 bg-[#0c1220]/90 text-ink-300 hover:border-[#38bdf8]/40 hover:text-white'
          }`}
          aria-pressed={isPlaying}
          aria-label={
            isPlaying
              ? 'Pause Music'
              : isPaused
              ? 'Resume Music'
              : 'Enable Music'
          }
        >
          <div className="flex items-center gap-2 text-xs font-medium">
            {isPlaying ? (
              <Pause size={14} className="text-[#38bdf8]" />
            ) : isPaused ? (
              <Play size={14} className="text-[#38bdf8]" />
            ) : (
              <Music size={14} className="text-[#38bdf8]" />
            )}
            <span>
              {isPlaying ? 'Pause Music' : isPaused ? 'Resume Music' : 'Enable Music'}
            </span>
          </div>

          {/* Thin, flowing cinematic audio waveform directly underneath music icon & label */}
          <div className="mt-1 h-3 w-28 overflow-hidden flex items-center justify-center">
            <svg
              className="h-full w-full"
              viewBox="0 0 120 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: isVisualizerActive ? 'drop-shadow(0 0 3px rgba(56,189,248,0.4))' : 'none',
              }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="cinematicWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="55%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#f9621a" />
                </linearGradient>
              </defs>
              {/* Primary delicate sine wave */}
              <g
                className="animate-wave-flow"
                style={{
                  animationPlayState: isVisualizerActive ? 'running' : 'paused',
                }}
              >
                <path
                  d="M -30 6 Q -15 1.5, 0 6 T 30 6 T 60 6 T 90 6 T 120 6 T 150 6"
                  stroke="url(#cinematicWaveGrad)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
              {/* Secondary subtle harmonic wave */}
              <g
                className="animate-wave-flow-rev"
                style={{
                  animationPlayState: isVisualizerActive ? 'running' : 'paused',
                }}
              >
                <path
                  d="M -30 6 Q -15 9.5, 0 6 T 30 6 T 60 6 T 90 6 T 120 6 T 150 6"
                  stroke="url(#cinematicWaveGrad)"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeOpacity="0.6"
                  fill="none"
                />
              </g>
            </svg>
          </div>
        </button>

        <button
          onClick={() => setExpanded((e) => !e)}
          className="rounded-full border border-white/10 bg-[#0c1220]/90 p-2.5 text-ink-400 shadow-lg backdrop-blur-xl transition-all hover:border-[#38bdf8]/40 hover:text-white"
          aria-label={expanded ? 'Collapse audio controls' : 'Expand audio controls'}
          aria-expanded={expanded}
        >
          <ChevronUp
            size={14}
            className={`transition-transform duration-300 ${expanded ? '' : 'rotate-180'}`}
          />
        </button>
      </div>
    </aside>
  );
}
