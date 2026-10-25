import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS, type SkillCategory } from '@/data/portfolio';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Stagger } from './Stagger';

const CATEGORIES: SkillCategory[] = [
  'Languages',
  'Backend & Frameworks',
  'Web Development',
  'Databases',
  'Security',
  'Tools & Operations',
];

export function SkillsApp() {
  const [active, setActive] = useState<SkillCategory | 'all'>('all');
  const reduced = useReducedMotion();

  const items = active === 'all' ? SKILLS : SKILLS.filter((s) => s.category === active);

  return (
    <div>
      <Stagger delay={0.1}>
        <p className="max-w-2xl text-pretty leading-relaxed text-ink-300">
          Skills verified from my resume and project repositories — grouped by where
          they fit in a stack. No invented proficiency scores or years of experience.
        </p>
      </Stagger>

      {/* Category filters */}
      <Stagger delay={0.2} className="mt-8 flex flex-wrap gap-2">
        <FilterChip label="All" active={active === 'all'} onClick={() => setActive('all')} />
        {CATEGORIES.map((c) => (
          <FilterChip key={c} label={c} active={active === c} onClick={() => setActive(c)} />
        ))}
      </Stagger>

      {/* Skill constellation */}
      <div className="relative mt-10 min-h-[320px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={reduced ? false : { opacity: 0, scale: 0.7, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reduced ? undefined : { scale: 1.05, y: -3 }}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-ink-700/60 bg-ink-850/40 p-5 text-center transition-colors hover:border-azure-400/50"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-ink-700 bg-ink-900 text-azure-400 transition-all group-hover:border-azure-400/50 group-hover:shadow-[0_0_24px_-6px_rgba(77,181,232,0.5)]">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-100">{skill.name}</p>
                    {skill.note && (
                      <p className="mt-0.5 text-xs text-ink-400">{skill.note}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
        active
          ? 'border-azure-400/60 bg-azure-500/15 text-azure-400'
          : 'border-ink-600 text-ink-300 hover:border-azure-400/40 hover:text-ink-100'
      }`}
    >
      {label}
    </button>
  );
}
