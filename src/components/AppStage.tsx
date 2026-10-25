import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useAudio } from '@/audio/AudioProvider';

interface AppStageProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** origin point (in viewport px) the section expands from / collapses to */
  origin?: { x: number; y: number };
  label: string;
}

/**
 * The signature transition: a section expands from a compact state into a
 * near-full-screen "app" panel — inspired by macOS app-opening fluidity,
 * without imitating the desktop or browser chrome. Each open/close is
 * interruptible (Framer Motion handles mid-animation reversals).
 */
export function AppStage({ id, isOpen, onClose, children, origin, label }: AppStageProps) {
  const reduced = useReducedMotion();
  const { playSfx } = useAudio();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const expand: Variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: {
          opacity: 0,
          scale: 0.6,
          x: origin ? origin.x - window.innerWidth / 2 : 0,
          y: origin ? origin.y - window.innerHeight / 2 : 120,
          filter: 'blur(8px)',
        },
        show: {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          filter: 'blur(0px)',
          transition: { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 },
        },
        exit: {
          opacity: 0,
          scale: 0.7,
          filter: 'blur(6px)',
          transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
        },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={id}
          variants={expand}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-[70] overflow-y-auto"
          onAnimationStart={() => playSfx('transition')}
          role="dialog"
          aria-modal="true"
          aria-label={`${label} section`}
        >
          {/* Backdrop with depth */}
          <motion.div
            className="fixed inset-0 bg-ink-950/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* The expanding panel */}
          <div className="relative flex min-h-full items-start justify-center p-4 md:p-8">
            <motion.div
              className="relative my-auto w-full max-w-5xl rounded-3xl border border-ink-700/70 bg-ink-900/80 shadow-ember-lg backdrop-blur-2xl"
              style={{ transformOrigin: origin ? 'center' : 'center bottom' }}
            >
              {/* Top bar — close + section label, not a window chrome */}
              <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b border-ink-700/50 bg-ink-900/80 px-6 py-4 backdrop-blur-xl md:px-8">
                <span className="eyebrow">{label}</span>
                <button
                  onClick={() => { playSfx('click'); onClose(); }}
                  className="group flex items-center gap-2 rounded-full border border-ink-600 px-3 py-1.5 text-xs font-medium text-ink-300 transition-all hover:border-ember-400/60 hover:text-ember-300"
                  aria-label={`Close ${label}`}
                >
                  <X size={14} /> Close
                </button>
              </div>

              <div className="px-6 py-8 md:px-10 md:py-10">{children}</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
