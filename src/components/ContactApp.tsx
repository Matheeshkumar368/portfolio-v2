import { Mail, Github, Linkedin, Code2, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROFILE } from '@/data/portfolio';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useAudio } from '@/audio/AudioProvider';
import { Stagger } from './Stagger';

export function ContactApp() {
  const reduced = useReducedMotion();
  const { playSfx } = useAudio();

  const channels = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: PROFILE.links.email!,
      href: `mailto:${PROFILE.links.email}`,
      external: false,
      accent: '#f9621a',
    },
    {
      icon: <Phone size={20} />,
      label: 'Direct Phone',
      value: PROFILE.phone,
      href: `tel:${PROFILE.phone}`,
      external: false,
      accent: '#22c55e',
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      value: 'in/matheeshkumar-s',
      href: PROFILE.links.linkedin!,
      external: true,
      accent: '#4db5e8',
    },
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      value: 'Matheeshkumar368',
      href: PROFILE.links.github!,
      external: true,
      accent: '#e6e6f0',
    },
    {
      icon: <Code2 size={20} />,
      label: 'LeetCode',
      value: 'MATHEESHKUMAR_S',
      href: PROFILE.links.leetcode!,
      external: true,
      accent: '#facc15',
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: `${PROFILE.location}, India`,
      href: '#',
      external: false,
      accent: '#fb923c',
    },
  ];

  return (
    <div>
      <Stagger delay={0.1}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ember-500/15 text-ember-400">
            <Mail size={20} />
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold text-ink-100">
              Get in Touch
            </h3>
            <p className="text-xs font-mono text-ink-400">
              Direct communication channels &amp; professional profiles
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-pretty text-sm sm:text-base leading-relaxed text-ink-200">
          I am actively open to Java developer roles, backend engineering opportunities, and entry into IT operations.
          Feel free to reach out directly via email, phone, or connect on LinkedIn and GitHub.
        </p>
      </Stagger>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.external ? '_blank' : undefined}
            rel={c.external ? 'noopener noreferrer' : undefined}
            onMouseEnter={() => playSfx('hover')}
            onClick={() => playSfx('click')}
            initial={reduced ? false : { opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover={reduced ? undefined : { y: -3, scale: 1.02 }}
            className="group flex items-center gap-4 rounded-2xl border border-ink-700/60 bg-ink-850/40 p-5 transition-all hover:border-ember-500/40 hover:bg-ink-800/60"
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all group-hover:shadow-ember"
              style={{
                background: `linear-gradient(135deg, ${c.accent}22, ${c.accent}08)`,
                color: c.accent,
                boxShadow: `0 0 0 1px ${c.accent}33`,
              }}
            >
              {c.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-mono uppercase tracking-wider text-ink-400">{c.label}</p>
              <p className="truncate font-medium text-sm text-ink-100">{c.value}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <Stagger delay={0.6}>
        <p className="mt-10 text-center font-mono text-xs text-ink-500">
          Matheeshkumar S · Interactive Developer Universe · Built with React &amp; TypeScript
        </p>
      </Stagger>
    </div>
  );
}
