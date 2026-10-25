import { Briefcase, CheckCircle2, Terminal } from 'lucide-react';
import { EXPERIENCE_HISTORY } from '@/data/portfolio';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Stagger } from './Stagger';

export function ExperienceApp() {
  const reduced = useReducedMotion();

  return (
    <div>
      <Stagger delay={0.1}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ember-500/15 text-ember-400">
            <Briefcase size={20} />
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold text-ink-100">
              Work Experience &amp; Internships
            </h3>
            <p className="text-xs font-mono text-ink-400">
              Hands-on engineering, microservices, and technology operations
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-pretty text-sm sm:text-base leading-relaxed text-ink-300">
          Practical internships in Java backend architecture, web engineering, and applied AI systems.
          All details verified directly from technical projects and certificates.
        </p>
      </Stagger>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {EXPERIENCE_HISTORY.map((exp, idx) => (
          <motion.div
            key={exp.title}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl border border-ink-700/60 bg-ink-850/50 p-6 transition-all hover:border-ember-500/40 hover:shadow-ember"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-ember-400">
                  {exp.roleType}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 size={13} /> Verified
                </span>
              </div>

              <h4 className="mt-3 font-display text-lg font-semibold text-ink-100">
                {exp.title}
              </h4>
              <p className="text-xs font-medium text-azure-400">{exp.organization}</p>

              <p className="mt-3 text-xs leading-relaxed text-ink-300">
                {exp.summary}
              </p>

              {/* Bullet highlights */}
              <ul className="mt-4 space-y-2 border-t border-ink-700/50 pt-3">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-ink-300 leading-relaxed">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mt-6 border-t border-ink-700/50 pt-4">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink-400 mb-2">
                <Terminal size={12} /> Tech Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="inline-block rounded-md border border-ink-700/80 bg-ink-900/60 px-2 py-0.5 text-[10px] font-mono text-ink-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
