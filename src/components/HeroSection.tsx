import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SectionId } from '@/data/portfolio';

export interface HeroSectionProps {
  onExplore?: () => void;
  onResume?: () => void;
  onOpenSection?: (id: SectionId, origin: { x: number; y: number }) => void;
  onTransitionComplete?: () => void;
}

export function HeroSection(props: HeroSectionProps) {
  void props;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      if (video.paused) {
        video.play().catch((err) => {
          console.warn('Hero video autoplay was prevented:', err);
        });
      }
    }
  }, []);

  const handleScrollToExplore = () => {
    const nextSection = document.getElementById('launcher') || document.querySelector('main > section:not(#hero)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  const videoSrc = `${import.meta.env.BASE_URL}assets/videos/portfolio-drive.mp4`;
  const posterSrc = `${import.meta.env.BASE_URL}assets/reference-hero.png`;

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[100svh] w-full overflow-hidden bg-black select-none"
      aria-label="Matheesh Kumar Hero"
    >
      {/* Full viewport background driving video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        className="absolute inset-0 h-full w-full object-cover z-[1]"
      >
        <source src={videoSrc} type="video/mp4" />
        <source src="/assets/videos/portfolio-drive.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle dark gradient on the left side so text pops while keeping driving video visible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 via-35% md:via-45% to-transparent to-70% z-[2]" />

      {/* Subtle top and bottom cinematic gradient vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-[2]" />

      {/* Left-aligned Hero Content (composition closely matching reference image) */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between px-[6%] pt-28 pb-10 sm:pb-12 pointer-events-none">
        {/* Upper-middle focal text block aligned ~6% from left */}
        <div className="my-auto max-w-3xl pointer-events-auto">
          {/* Small uppercase introduction */}
          <p className="font-sans text-[11px] sm:text-xs font-light uppercase tracking-[0.35em] text-white/70">
            HELLO, I&apos;M
          </p>

          {/* Main heading: MATHEESH in white, KUMAR in electric-blue */}
          <h1 className="mt-2.5 sm:mt-3 font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight tracking-[0.16em] sm:tracking-[0.22em] text-white whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            MATHEESH <span className="font-light text-[#38bdf8] drop-shadow-[0_0_16px_rgba(56,189,248,0.4)]">KUMAR</span>
          </h1>

          {/* Professional role */}
          <p className="mt-3 sm:mt-4 font-sans text-[10px] sm:text-xs md:text-sm font-light uppercase tracking-[0.2em] sm:tracking-[0.26em] text-white/80">
            JAVA DEVELOPER | IT OPERATIONS ENTHUSIAST
          </p>

          {/* Small horizontal electric-blue accent line */}
          <div className="mt-4 sm:mt-5 h-[2px] w-24 sm:w-32 rounded-full bg-gradient-to-r from-[#38bdf8] via-[#38bdf8]/70 to-transparent shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
        </div>

        {/* Bottom-left scroll indicator */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleScrollToExplore}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleScrollToExplore();
            }
          }}
          className="group pointer-events-auto inline-flex w-fit cursor-pointer flex-col items-start gap-2 transition-opacity duration-300 hover:opacity-100 opacity-80"
          aria-label="Scroll to explore"
        >
          <span className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-white/70 transition-colors duration-300 group-hover:text-[#38bdf8]">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown
            size={16}
            className="text-[#38bdf8] transition-transform duration-300 group-hover:translate-y-1 animate-bounce"
          />
        </div>
      </div>
    </section>
  );
}
