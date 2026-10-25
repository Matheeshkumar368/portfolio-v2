import { memo, useEffect, useRef } from 'react';

export interface CinematicCharacterProps {
  progress: number;
  reduced?: boolean;
}

const CHARACTER_POSES = [
  {
    id: 'confident',
    src: '/assets/character/pose_01_confident.webp',
    fallback: '/assets/character/pose_01_confident.png',
    label: 'Matheeshkumar S standing confidently',
    scale: 1.0,
    offsetY: 0,
    widthRatio: 255 / 724,
  },
  {
    id: 'look_side',
    src: '/assets/character/pose_02_look_side.webp',
    fallback: '/assets/character/pose_02_look_side.png',
    label: 'Matheeshkumar looking to side',
    scale: 1.0,
    offsetY: 0,
    widthRatio: 250 / 724,
  },
  {
    id: 'look_down',
    src: '/assets/character/pose_03_look_down.webp',
    fallback: '/assets/character/pose_03_look_down.png',
    label: 'Matheeshkumar stepping forward and looking down',
    scale: 1.01,
    offsetY: 2,
    widthRatio: 295 / 724,
  },
  {
    id: 'pocket_reach',
    src: '/assets/character/pose_04_pocket_reach.webp',
    fallback: '/assets/character/pose_04_pocket_reach.png',
    label: 'Matheeshkumar reaching into suit pocket for smartphone',
    scale: 1.02,
    offsetY: 4,
    widthRatio: 310 / 724,
  },
  {
    id: 'phone_inspect',
    src: '/assets/character/pose_05_phone_inspect.webp',
    fallback: '/assets/character/pose_05_phone_inspect.png',
    label: 'Matheeshkumar retrieving and inspecting smartphone',
    scale: 1.04,
    offsetY: 4,
    widthRatio: 265 / 724,
  },
  {
    id: 'phone_forward',
    src: '/assets/character/pose_06_phone_forward.webp',
    fallback: '/assets/character/pose_06_phone_forward.png',
    label: 'Matheeshkumar presenting smartphone forward toward camera',
    scale: 1.1,
    offsetY: -6,
    widthRatio: 345 / 724,
  },
];

export const CinematicCharacter = memo(function CinematicCharacter({
  progress,
  reduced = false,
}: CinematicCharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload all pose images immediately on mount
  useEffect(() => {
    CHARACTER_POSES.forEach((pose) => {
      const img = new Image();
      img.src = pose.src;
      img.onerror = () => {
        img.src = pose.fallback;
      };
    });
  }, []);

  // Frame calculation across progress 0.0 -> 0.88
  // From 0.88 onwards, pose 6 stays locked as the phone screen expands to become the portfolio.
  const maxAnimProgress = 0.88;
  const normalizedP = Math.min(1, Math.max(0, progress / maxAnimProgress));
  const numTransitions = CHARACTER_POSES.length - 1;
  const rawIdx = normalizedP * numTransitions;
  const currentIdx = Math.min(numTransitions - 1, Math.floor(rawIdx));
  const nextIdx = Math.min(numTransitions, currentIdx + 1);
  const blend = rawIdx - currentIdx;

  // Cinematic camera push-in and subtle breathing
  const scalePush = reduced ? 1 : 1 + progress * 0.08;
  const lateralShift = reduced ? 0 : progress * -18;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center md:justify-start md:pl-[6vw] lg:pl-[9vw]"
      aria-hidden="true"
    >
      {/* Studio back-lighting & atmosphere aura */}
      <div
        className="pointer-events-none absolute bottom-0 left-[2vw] md:left-[8vw] h-[75vh] w-[45vw] max-w-[650px] -translate-x-1/4 rounded-full opacity-60 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at 50% 65%, rgba(249, 98, 26, ${0.18 + progress * 0.12}) 0%, rgba(77, 181, 232, 0.08) 55%, transparent 75%)`,
          filter: 'blur(45px)',
          transform: `translateY(${progress * -15}px)`,
        }}
      />

      {/* Ground contact shadow */}
      <div
        className="pointer-events-none absolute bottom-4 left-[6vw] md:left-[12vw] h-12 w-[36vw] max-w-[420px] rounded-full bg-ink-950/90 blur-xl transition-all duration-300"
        style={{
          transform: `scale(${1 - progress * 0.15})`,
          opacity: Math.max(0.3, 0.85 - progress * 0.4),
        }}
      />

      {/* Main Character Silhouette Container */}
      <div
        className="relative flex h-[82vh] max-h-[820px] min-h-[500px] w-[88vw] max-w-[480px] sm:w-[65vw] sm:max-w-[500px] md:w-[46vw] md:max-w-[540px] items-end justify-center transition-transform ease-out will-change-transform"
        style={{
          transform: `scale(${scalePush}) translateX(${lateralShift}px)`,
          transformOrigin: 'bottom center',
        }}
      >
        {CHARACTER_POSES.map((pose, i) => {
          // Calculate opacity for each pose
          let opacity = 0;
          let zIndex = 1;

          if (reduced) {
            // In reduced motion, stay on the confident pose or smoothly shift at 0.5
            opacity = progress < 0.5 ? (i === 0 ? 1 : 0) : i === 5 ? 1 : 0;
          } else if (i === currentIdx) {
            opacity = 1 - blend;
            zIndex = 2;
          } else if (i === nextIdx) {
            opacity = blend;
            zIndex = 3;
          }

          if (opacity <= 0.005) return null;

          return (
            <picture
              key={pose.id}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full max-h-full transition-opacity duration-150 ease-out will-change-transform"
              style={{
                opacity,
                zIndex,
                transform: `translateX(-50%) translateY(${pose.offsetY}px) scale(${pose.scale})`,
                transformOrigin: 'bottom center',
              }}
            >
              <source srcSet={pose.src} type="image/webp" />
              <img
                src={pose.fallback}
                alt={pose.label}
                loading={i <= 1 ? 'eager' : 'lazy'}
                className="h-full w-auto max-h-[82vh] object-contain object-bottom drop-shadow-[0_24px_38px_rgba(0,0,0,0.85)] filter contrast-[1.03]"
                style={{
                  maxHeight: '82vh',
                }}
              />
            </picture>
          );
        })}

        {/* Dynamic Phone Screen Glow (Active in Frame 6 when phone is forward) */}
        {progress > 0.7 && (
          <div
            className="pointer-events-none absolute top-[18%] left-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
            style={{
              width: `${Math.min(180, 80 + (progress - 0.7) * 450)}px`,
              height: `${Math.min(240, 100 + (progress - 0.7) * 550)}px`,
              opacity: Math.min(1, (progress - 0.7) * 3.5),
              background:
                'radial-gradient(circle, rgba(249,98,26,0.45) 0%, rgba(77,181,232,0.3) 45%, transparent 75%)',
              filter: 'blur(20px)',
            }}
          />
        )}
      </div>
    </div>
  );
});
