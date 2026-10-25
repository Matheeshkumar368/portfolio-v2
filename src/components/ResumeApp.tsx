import { motion } from 'framer-motion';
import { FileText, ExternalLink, Download, CheckCircle2, GraduationCap, Briefcase, Award } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useAudio } from '@/audio/AudioProvider';
import { Stagger } from './Stagger';

export function ResumeApp() {
  const reduced = useReducedMotion();
  const { playSfx } = useAudio();
  const resumeUrl = PROFILE.links.resumeUrl;

  return (
    <div>
      <Stagger delay={0.1}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ember-500/15 text-ember-400">
            <FileText size={20} />
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold text-ink-100">
              Curriculum Vitae
            </h3>
            <p className="text-xs font-mono text-ink-400">
              Official verified resume of Matheeshkumar S
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-pretty text-sm sm:text-base leading-relaxed text-ink-300">
          Complete professional record including degree qualifications, Infosys Springboard internships,
          full-stack Java projects, and technical skills.
        </p>
      </Stagger>

      {/* Document materialization card */}
      <div className="mt-8 flex flex-col items-center gap-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-2xl border border-ink-700/80 bg-ink-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
        >
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-ink-700/70 pb-5 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-display text-xl font-bold text-ink-100">{PROFILE.name}</h4>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 size={13} /> Verified
                </span>
              </div>
              <p className="text-xs font-mono text-ember-400 mt-1">{PROFILE.title}</p>
            </div>
            <div className="text-left sm:text-right font-mono text-xs text-ink-400">
              <p>{PROFILE.location}</p>
              <p className="text-azure-400">{PROFILE.links.email}</p>
            </div>
          </div>

          {/* Quick Resume Sections */}
          <div className="mt-5 space-y-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-ember-400">
                Professional Summary
              </span>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink-300">
                {PROFILE.intro}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 pt-2 border-t border-ink-800">
              <div className="rounded-xl border border-ink-800 bg-ink-950/40 p-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-ink-200">
                  <GraduationCap size={15} className="text-ember-400" /> Education
                </div>
                <p className="mt-1 text-xs text-ink-300 font-medium">B.Tech CSBS (2023–2027)</p>
                <p className="text-[11px] text-ink-400">VSB Engineering College · CGPA: 7.97</p>
              </div>

              <div className="rounded-xl border border-ink-800 bg-ink-950/40 p-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-ink-200">
                  <Briefcase size={15} className="text-azure-400" /> Key Experience
                </div>
                <p className="mt-1 text-xs text-ink-300 font-medium">Infosys Springboard 6.0</p>
                <p className="text-[11px] text-ink-400">Java Spring Boot &amp; JWT Backend</p>
              </div>
            </div>

            <div className="rounded-xl border border-ink-800 bg-ink-950/40 p-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink-200">
                <Award size={15} className="text-ember-400" /> Core Tech Stack
              </div>
              <p className="mt-1 text-xs text-ink-300">
                Java 21, Spring Boot, Spring Security, JWT, MySQL 8, React.js, Node.js, REST APIs, Git, Maven, Windows
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSfx('click')}
            onMouseEnter={() => playSfx('hover')}
            className="btn-primary"
          >
            <ExternalLink size={16} /> Open Full Resume PDF
          </a>

          <a
            href={resumeUrl}
            download="Matheeshkumar_S_Resume.pdf"
            onClick={() => playSfx('click')}
            onMouseEnter={() => playSfx('hover')}
            className="btn-ghost"
          >
            <Download size={16} /> Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
