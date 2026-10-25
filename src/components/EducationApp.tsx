import { GraduationCap, Award, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { EDUCATION_HISTORY } from '@/data/portfolio';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Stagger } from './Stagger';

export function EducationApp() {
  const reduced = useReducedMotion();

  return (
    <div>
      <Stagger delay={0.1}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ember-500/15 text-ember-400">
            <GraduationCap size={20} />
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold text-ink-100">
              Academic Journey
            </h3>
            <p className="text-xs font-mono text-ink-400">
              Verified from official educational records &amp; resume
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-pretty text-sm sm:text-base leading-relaxed text-ink-300">
          Continuous record of academic excellence across Computer Science, Business Systems,
          and foundational science curricula.
        </p>
      </Stagger>

      {/* Horizontal timeline journey cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {EDUCATION_HISTORY.map((edu, idx) => (
          <motion.div
            key={edu.degree}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col justify-between rounded-2xl border border-ink-700/70 bg-ink-850/50 p-6 transition-all hover:border-ember-500/40 hover:shadow-ember"
          >
            {/* Top row with period & verification badge */}
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-ember-400">
                  <Calendar size={13} /> {edu.period}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 size={13} /> Verified
                </span>
              </div>

              <h4 className="mt-4 font-display text-base sm:text-lg font-semibold text-ink-100 leading-snug">
                {edu.degree}
              </h4>

              <div className="mt-2.5 flex items-start gap-2 text-xs text-ink-300">
                <Building2 size={15} className="mt-0.5 shrink-0 text-azure-400" />
                <span>{edu.institution}</span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-ink-400">
                {edu.details}
              </p>
            </div>

            {/* Bottom Score Highlight */}
            <div className="mt-6 border-t border-ink-700/50 pt-4 flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-wider text-ink-400">Score / Grade</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-ember-500/30 bg-ember-500/10 px-2.5 py-1 font-mono text-xs font-bold text-ember-300">
                <Award size={13} /> {edu.score}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
