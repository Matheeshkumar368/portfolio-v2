import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { PROJECTS, type Project } from '@/data/portfolio';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useAudio } from '@/audio/AudioProvider';
import { Stagger, StaggerItem } from './Stagger';

export function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null);
  const reduced = useReducedMotion();

  return (
    <div className="relative">
      <Stagger delay={0.1}>
        <div className="flex flex-col gap-1 mb-6">
          <p className="eyebrow text-[#38bdf8]">Engineered Systems & Products</p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
            Featured Projects
          </h2>
          <p className="max-w-2xl text-pretty text-xs sm:text-sm leading-relaxed text-ink-300">
            Real enterprise and full-stack software architectures. Select any project to inspect its problem statement, technical solution, verified features, and repositories.
          </p>
        </div>
      </Stagger>

      <div className="grid gap-6 md:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <StaggerItem key={project.id} delay={0.15 + i * 0.08} from="scale">
            <ProjectTile project={project} onOpen={() => setSelected(project)} />
          </StaggerItem>
        ))}
      </div>

      {/* Case-study expansion */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="absolute inset-0 z-20 -m-4 sm:-m-6 overflow-y-auto rounded-2xl bg-[#090c18]/98 backdrop-blur-2xl border border-white/10"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCaseStudy project={selected} onBack={() => setSelected(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectTile({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { playSfx } = useAudio();
  const placeholder = project.contentStatus === 'placeholder';

  return (
    <motion.button
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        playSfx('click');
        onOpen();
      }}
      onMouseEnter={() => playSfx('hover')}
      className="group relative flex flex-col justify-between w-full h-full overflow-hidden rounded-2xl border border-ink-700/80 bg-[#0c1224]/80 p-4 sm:p-5 text-left transition-all duration-300 hover:border-[#38bdf8]/50 hover:shadow-[0_12px_36px_rgba(56,189,248,0.18)]"
    >
      <div>
        {/* Authentic Visual Project Preview */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-inner">
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Context Badge */}
          <span className="absolute top-2.5 left-2.5 rounded-full border border-white/15 bg-black/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/90 backdrop-blur-md">
            {project.context}
          </span>

          {placeholder && (
            <span className="absolute bottom-2.5 right-2.5 rounded-full bg-amber-500/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-black font-semibold backdrop-blur">
              Placeholder
            </span>
          )}
        </div>

        {/* Project Name & Info */}
        <h3 className="mt-4 font-display text-lg sm:text-xl font-semibold text-white group-hover:text-[#38bdf8] transition-colors leading-snug">
          {project.name}
        </h3>
        <p className="mt-1 text-xs text-ink-300 leading-relaxed line-clamp-2">
          {project.tagline}
        </p>

        {/* Technology Badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-ink-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs font-medium text-[#38bdf8] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          Open Case Study →
        </span>
        <span className="font-mono text-[10px] text-ink-400">Verified System</span>
      </div>
    </motion.button>
  );
}

function ProjectCaseStudy({ project, onBack }: { project: Project; onBack: () => void }) {
  const { playSfx } = useAudio();
  const github = project.links.find((l) => l.kind === 'github');
  const demo = project.links.find((l) => l.kind === 'demo');
  const placeholder = project.contentStatus === 'placeholder';

  return (
    <div className="min-h-full p-5 sm:p-8 md:p-10">
      <button
        onClick={() => {
          playSfx('click');
          onBack();
        }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-600 px-4 py-2 text-xs font-medium text-ink-200 transition-all hover:border-[#38bdf8]/60 hover:text-white"
      >
        <ArrowLeft size={14} className="text-[#38bdf8]" /> Back to projects
      </button>

      {/* Hero Visual Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative h-48 sm:h-64 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
      >
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
              {project.context}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-md">
              {project.name}
            </h2>
          </div>
        </div>
      </motion.div>

      <div className="mt-6">
        <p className="text-sm sm:text-base text-ink-200 leading-relaxed font-light">
          {project.tagline}
        </p>

        {placeholder && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4 text-sm text-warning">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>
              This showcase uses placeholders. Replace with details verified from the actual project source.
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#f9621a]">
              The Challenge
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-pretty leading-relaxed text-ink-200">
              {project.problem}
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#38bdf8]">
              Engineering Solution
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-pretty leading-relaxed text-ink-200">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-white/80">
            Technologies & Tools
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="chip bg-white/5 border-white/10 text-white/90 text-xs">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-white/80">
            Key Architecture Features
          </h3>
          <ul className="mt-4 space-y-3">
            {project.features.map((f) => (
              <li
                key={f.title}
                className="flex items-start gap-3 rounded-xl border border-ink-700/60 bg-ink-850/50 p-4"
              >
                {f.verified ? (
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                ) : (
                  <Circle size={18} className="mt-0.5 shrink-0 text-ink-500" />
                )}
                <div>
                  <p className="font-medium text-white text-sm">{f.title}</p>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink-300">
                    {f.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-ink-700/60 pt-6">
          {github && (
            <a
              href={github.url ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!github.url}
              onClick={(e) => {
                if (!github.url) e.preventDefault();
                playSfx('click');
              }}
              className={github.url ? 'btn-ghost' : 'btn-ghost cursor-not-allowed opacity-40'}
            >
              <Github size={16} /> {github.label}
            </a>
          )}
          {demo && (
            <a
              href={demo.url ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!demo.url}
              onClick={(e) => {
                if (!demo.url) e.preventDefault();
                playSfx('click');
              }}
              className={demo.url ? 'btn-primary' : 'btn-primary cursor-not-allowed opacity-40'}
            >
              <ExternalLink size={16} /> {demo.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
