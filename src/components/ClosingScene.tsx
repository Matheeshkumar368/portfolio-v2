import { motion } from 'framer-motion';
import { ArrowUp, RotateCcw } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useAudio } from '@/audio/AudioProvider';

export function ClosingScene({ onReturn }: { onReturn: () => void }) {
  const reduced = useReducedMotion();
  const { playSfx } = useAudio();

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden py-20 md:py-28" aria-label="End of journey">
      <div className="absolute inset-0 bg-radial-ember opacity-30 pointer-events-none" />
      <div className="absolute inset-0 shadow-inset-cine pointer-events-none" />

      {/* Cinematic Studio Glow & Confident Character on the left */}
      <div className="container-cine relative z-10 grid items-center gap-10 md:grid-cols-12">
        {/* Character Pose 1 (Standing confident, head to shoes, fully visible) */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex h-[500px] sm:h-[560px] md:h-[620px] lg:h-[660px] w-full max-w-[340px] sm:max-w-[380px] items-end justify-center md:col-span-5"
        >
          {/* Subtle amber rim light behind */}
          <div className="pointer-events-none absolute bottom-12 h-80 w-80 rounded-full bg-ember-500/20 blur-3xl" />

          <picture className="relative z-10 h-full w-auto flex items-end justify-center">
            <source srcSet="/assets/character/pose_01_confident.webp" type="image/webp" />
            <img
              src="/assets/character/pose_01_confident.png"
              alt="Matheeshkumar S - Software Engineer"
              className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter contrast-[1.02]"
            />
          </picture>
        </motion.div>

        {/* Narrative & Return Call to Action on the right */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left md:col-span-7 md:pl-6"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f9621a]" />
            <p className="eyebrow text-[#f9621a]">The journey continues</p>
          </div>

          <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            Thanks for exploring my portfolio.
          </h2>

          <p className="mt-4 max-w-xl text-pretty text-sm sm:text-base leading-relaxed text-ink-300">
            I am ready to bring engineering dedication, clean Java microservices, and IT operational reliability
            to your team. Every section remains directly accessible anytime.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => { playSfx('click'); onReturn(); }}
              onMouseEnter={() => playSfx('hover')}
              className="btn-primary flex items-center gap-2"
            >
              <RotateCcw size={16} /> Return to top <ArrowUp size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
