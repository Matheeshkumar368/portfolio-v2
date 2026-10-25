import { User, GraduationCap, MapPin, Terminal, ShieldCheck } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import { Stagger, StaggerItem } from './Stagger';

export function AboutApp() {
  return (
    <div className="grid gap-10 md:grid-cols-5">
      {/* Portrait showcase — Real verified photo */}
      <Stagger className="md:col-span-2" delay={0.1}>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl border border-ink-700 bg-gradient-to-b from-ink-800 to-ink-950 shadow-2xl">
          <img
            src="/assets/character/about-me.png"
            alt={`${PROFILE.name} - Professional Portrait`}
            className="h-full w-full object-cover object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ember-400">
              Verified Identity
            </span>
            <p className="font-display text-lg font-semibold text-ink-100">{PROFILE.name}</p>
            <p className="text-xs text-ink-300">{PROFILE.title}</p>
          </div>
        </div>
      </Stagger>

      {/* Progressive narrative reveal */}
      <div className="md:col-span-3">
        <Stagger delay={0.2}>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ember-500/15 text-ember-300">
              <User size={18} />
            </span>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink-100">
                {PROFILE.name}
              </h2>
              <p className="text-xs font-mono text-ink-400">Tamil Nadu, India · Open for Roles</p>
            </div>
          </div>
        </Stagger>

        <Stagger delay={0.3}>
          <p className="mt-4 font-display text-lg font-medium text-ember-400">{PROFILE.title}</p>
        </Stagger>

        <Stagger delay={0.4}>
          <p className="mt-4 text-pretty leading-relaxed text-ink-200">
            {PROFILE.intro}
          </p>
        </Stagger>

        <Stagger delay={0.5}>
          <p className="mt-4 text-pretty leading-relaxed text-ink-300">
            My backend work centers on Java and Spring Boot — engineering RESTful microservices,
            securing endpoints with JWT and Spring Security, and designing relational data models
            with Spring Data JPA, Hibernate, and MySQL 8. Concurrently, I possess practical knowledge
            in modern React.js frontend structures and IT infrastructure operations covering Windows environments
            and networking fundamentals.
          </p>
        </Stagger>

        {/* Key Educational & Background Highlights */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <StaggerItem delay={0.6} from="left">
            <div className="flex items-center gap-3.5 rounded-xl border border-ink-700/60 bg-ink-850/50 p-4">
              <GraduationCap size={20} className="shrink-0 text-ember-400" />
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-ink-400">Education</p>
                <p className="text-sm font-semibold text-ink-100">{PROFILE.education}</p>
                <p className="text-xs text-ember-400/90 font-mono">CGPA: {PROFILE.cgpa} · 2023–2027</p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem delay={0.65} from="right">
            <div className="flex items-center gap-3.5 rounded-xl border border-ink-700/60 bg-ink-850/50 p-4">
              <MapPin size={20} className="shrink-0 text-azure-400" />
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-ink-400">Institution</p>
                <p className="text-sm font-semibold text-ink-100">{PROFILE.college}</p>
                <p className="text-xs text-ink-400">Karur, Tamil Nadu</p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem delay={0.7} from="left">
            <div className="flex items-center gap-3.5 rounded-xl border border-ink-700/60 bg-ink-850/50 p-4">
              <Terminal size={20} className="shrink-0 text-ember-400" />
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-ink-400">Core Expertise</p>
                <p className="text-sm font-semibold text-ink-100">Java 21 · Spring Boot · MySQL</p>
                <p className="text-xs text-ink-400">RESTful Services &amp; APIs</p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem delay={0.75} from="right">
            <div className="flex items-center gap-3.5 rounded-xl border border-ink-700/60 bg-ink-850/50 p-4">
              <ShieldCheck size={20} className="shrink-0 text-azure-400" />
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-ink-400">IT Operations</p>
                <p className="text-sm font-semibold text-ink-100">Windows · Networking · Security</p>
                <p className="text-xs text-ink-400">JWT &amp; Access Controls</p>
              </div>
            </div>
          </StaggerItem>
        </div>
      </div>
    </div>
  );
}
