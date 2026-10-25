import { Award, CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS_LIST } from '@/data/portfolio';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Stagger } from './Stagger';

export function CertificationsApp() {
  const reduced = useReducedMotion();

  return (
    <div>
      <Stagger delay={0.1}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-azure-500/15 text-azure-400">
            <Award size={20} />
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold text-ink-100">
              Verified Certifications &amp; Credentials
            </h3>
            <p className="text-xs font-mono text-ink-400">
              Official validations from Infosys Springboard &amp; FutureSkills Prime / Salesforce
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-pretty text-sm sm:text-base leading-relaxed text-ink-300">
          Rigorous professional credentials testing Java enterprise architecture, full-stack microservices,
          and cloud administration.
        </p>
      </Stagger>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CERTIFICATIONS_LIST.map((cert, idx) => (
          <motion.div
            key={cert.title}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl border border-ink-700/60 bg-ink-850/50 p-6 transition-all hover:border-azure-400/40 hover:shadow-[0_0_24px_-6px_rgba(77,181,232,0.3)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-azure-400">
                  <ShieldCheck size={14} /> {cert.issuer}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 size={13} /> Verified
                </span>
              </div>

              <h4 className="mt-3 font-display text-base sm:text-lg font-semibold text-ink-100 leading-snug">
                {cert.title}
              </h4>

              {cert.credentialNote && (
                <p className="mt-2 text-xs leading-relaxed text-ink-300">
                  {cert.credentialNote}
                </p>
              )}
            </div>

            <div className="mt-5 border-t border-ink-700/50 pt-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-400">
                  <Calendar size={13} /> {cert.date}
                </span>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {cert.skills.map((s) => (
                  <span
                    key={s}
                    className="inline-block rounded-md border border-ink-700 bg-ink-900/60 px-2 py-0.5 text-[10px] font-mono text-ink-300"
                  >
                    {s}
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
