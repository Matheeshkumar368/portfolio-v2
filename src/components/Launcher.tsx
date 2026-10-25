import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  User,
  Sparkles,
  FolderGit2,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  Mail,
  Github,
  Linkedin,
  Lock,
  Unlock,
  Fingerprint,
  Wifi,
  Battery,
  ArrowLeft,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { PROFILE, type SectionId } from '@/data/portfolio';
import { useAudio } from '@/audio/AudioProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

import { AboutApp } from './AboutApp';
import { SkillsApp } from './SkillsApp';
import { ProjectsApp } from './ProjectsApp';
import { EducationApp } from './EducationApp';
import { ExperienceApp } from './ExperienceApp';
import { CertificationsApp } from './CertificationsApp';
import { ResumeApp } from './ResumeApp';
import { ContactApp } from './ContactApp';

interface LauncherProps {
  activeAppId?: SectionId | null;
  setActiveAppId?: (id: SectionId | null) => void;
  isUnlocked?: boolean;
  setIsUnlocked?: (unlocked: boolean) => void;
  onOpen?: (id: SectionId, origin: { x: number; y: number }) => void;
}

interface TabletAppItem {
  id: string;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  accent: 'orange' | 'blue';
  isExternal?: boolean;
  url?: string;
  sectionId?: SectionId;
}

const TABLET_APPS: TabletAppItem[] = [
  {
    id: 'about',
    sectionId: 'about',
    label: 'About Me',
    subtitle: 'Profile & Background',
    icon: User,
    accent: 'orange',
  },
  {
    id: 'skills',
    sectionId: 'skills',
    label: 'Skills',
    subtitle: 'Java, Spring & Ops',
    icon: Sparkles,
    accent: 'blue',
  },
  {
    id: 'projects',
    sectionId: 'projects',
    label: 'Projects',
    subtitle: '3 Verified Builds',
    icon: FolderGit2,
    accent: 'orange',
  },
  {
    id: 'education',
    sectionId: 'education',
    label: 'Education',
    subtitle: 'B.Tech CSBS · Anna Univ',
    icon: GraduationCap,
    accent: 'blue',
  },
  {
    id: 'experience',
    sectionId: 'experience',
    label: 'Experience',
    subtitle: '3 Practical Roles',
    icon: Briefcase,
    accent: 'orange',
  },
  {
    id: 'certifications',
    sectionId: 'certifications',
    label: 'Certifications',
    subtitle: '4 Credentials',
    icon: Award,
    accent: 'blue',
  },
  {
    id: 'resume',
    sectionId: 'resume',
    label: 'Resume',
    subtitle: 'Verified PDF & Experience',
    icon: FileText,
    accent: 'orange',
  },
  {
    id: 'contact',
    sectionId: 'contact',
    label: 'Contact',
    subtitle: 'Email & Inquiries',
    icon: Mail,
    accent: 'blue',
  },
  {
    id: 'github',
    label: 'GitHub',
    subtitle: 'Matheeshkumar368',
    icon: Github,
    accent: 'blue',
    isExternal: true,
    url: PROFILE.links.github,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    subtitle: 'matheeshkumar-s',
    icon: Linkedin,
    accent: 'blue',
    isExternal: true,
    url: PROFILE.links.linkedin,
  },
];

export function Launcher({
  activeAppId: externalActiveAppId,
  setActiveAppId: externalSetActiveAppId,
  isUnlocked: externalIsUnlocked,
  setIsUnlocked: externalSetIsUnlocked,
}: LauncherProps) {
  const { playSfx } = useAudio();
  const reduced = useReducedMotion();
  void reduced;

  // Tablet state: controlled by parent if provided, otherwise internal fallback
  const [internalUnlocked, setInternalUnlocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [internalActiveAppId, setInternalActiveAppId] = useState<SectionId | null>(null);

  const isUnlocked = externalIsUnlocked !== undefined ? externalIsUnlocked : internalUnlocked;
  const setIsUnlocked = externalSetIsUnlocked || setInternalUnlocked;

  const activeAppId = externalActiveAppId !== undefined ? externalActiveAppId : internalActiveAppId;
  const setActiveAppId = externalSetActiveAppId || setInternalActiveAppId;

  // Live device clock & calendar
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = useMemo(() => {
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }, [now]);

  const dateString = useMemo(() => {
    return now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  }, [now]);

  // Fingerprint visual scan unlock handler
  const handleUnlock = useCallback(() => {
    if (isScanning || isUnlocked) return;
    setIsScanning(true);
    playSfx('click');

    setTimeout(() => {
      setIsUnlocked(true);
      setIsScanning(false);
      playSfx('transition');
    }, 650);
  }, [isScanning, isUnlocked, playSfx, setIsUnlocked]);

  const handleLock = useCallback(() => {
    playSfx('click');
    setIsUnlocked(false);
    setActiveAppId(null);
  }, [playSfx, setIsUnlocked, setActiveAppId]);

  const handleAppClick = useCallback(
    (app: TabletAppItem) => {
      playSfx('click');
      if (app.isExternal && app.url) {
        window.open(app.url, '_blank', 'noopener,noreferrer');
        return;
      }
      if (app.sectionId) {
        // Open ONLY inside the tablet screen
        setActiveAppId(app.sectionId);
      }
    },
    [playSfx, setActiveAppId]
  );

  return (
    <section
      id="launcher"
      className="relative flex min-h-screen w-full items-center justify-center py-20 px-4 sm:px-6 md:px-10 overflow-hidden"
      aria-label="Interactive Universe Tablet"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-radial-ember opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-ink-950 to-black" />

      {/* Realistic Tablet Hardware Chassis */}
      <div className="relative w-full max-w-5xl rounded-[2.2rem] sm:rounded-[2.8rem] p-3 sm:p-4 md:p-5 bg-gradient-to-b from-[#262636] via-[#161622] to-[#0d0d16] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_2px_rgba(255,255,255,0.2)]">
        {/* Top Bezel Center Camera Pinhole */}
        <div className="flex items-center justify-center pb-2.5 sm:pb-3">
          <div className="h-2 w-2 rounded-full bg-[#08080f] border border-white/10 shadow-inner" />
        </div>

        {/* Tablet Glass Screen Display */}
        <div className="relative aspect-[16/10] min-h-[580px] sm:min-h-[640px] md:min-h-[680px] w-full rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden bg-[#060814] flex flex-col border border-white/5 shadow-inner">
          {/* Cosmic Glow Gradient Layers (matching reference images) */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {/* Top-left electric-blue luminous wave */}
            <div className="absolute -top-24 -left-24 h-[420px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.28),transparent_70%)] blur-2xl" />
            
            {/* Bottom-right fiery-orange luminous wave */}
            <div className="absolute -bottom-24 -right-24 h-[440px] w-[540px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(249,98,26,0.26),transparent_70%)] blur-2xl" />

            {/* Sweeping SVG Light Arcs */}
            <svg
              className="absolute inset-0 h-full w-full opacity-40 mix-blend-screen"
              viewBox="0 0 1000 650"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M-50 120 C 300 80, 500 350, 1050 240"
                stroke="url(#blue-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M-50 480 C 400 420, 650 620, 1050 490"
                stroke="url(#orange-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#0284c7" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f9621a" stopOpacity="0" />
                  <stop offset="40%" stopColor="#f9621a" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ffedd5" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Status Bar */}
          <header className="relative z-30 flex h-9 sm:h-10 shrink-0 items-center justify-between px-5 sm:px-8 text-xs font-mono text-white/70 select-none border-b border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-wide text-white/90">{timeString}</span>
            </div>

            <div className="flex items-center gap-4">
              {isUnlocked && (
                <button
                  onClick={handleLock}
                  className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-sans text-white/75 transition-colors hover:border-[#38bdf8]/60 hover:text-white"
                  title="Lock tablet"
                  aria-label="Lock tablet"
                >
                  <Lock size={12} className="text-[#38bdf8]" />
                  <span className="hidden sm:inline">Lock</span>
                </button>
              )}

              <div className="flex items-center gap-2">
                {/* Cellular signal bars */}
                <div className="flex items-end gap-0.5 h-3" aria-hidden="true">
                  <span className="w-1 h-1 rounded-sm bg-white/80" />
                  <span className="w-1 h-1.5 rounded-sm bg-white/80" />
                  <span className="w-1 h-2 rounded-sm bg-white/80" />
                  <span className="w-1 h-2.5 rounded-sm bg-white/80" />
                </div>
                <Wifi size={13} className="text-white/80" />
                <div className="flex items-center gap-1 text-[11px]">
                  <span>98%</span>
                  <Battery size={14} className="text-white/90" />
                </div>
              </div>
            </div>
          </header>

          {/* ============================================================== */}
          {/* SCREEN CONTENT: LOCK SCREEN vs DASHBOARD vs IN-TABLET APP VIEW */}
          {/* ============================================================== */}
          <div className="relative z-10 flex-1 overflow-hidden">
            {/* VIEW A: BIOMETRIC LOCK SCREEN */}
            {!isUnlocked && (
              <div
                className="flex h-full w-full flex-col items-center justify-between py-10 sm:py-14 px-6 text-center select-none"
                aria-label="Tablet Lock Screen"
              >
                {/* Upper Clock & Date with Padlock */}
                <div className="flex flex-col items-center mt-2 sm:mt-4">
                  <div className="mb-2 sm:mb-3 text-white/60">
                    {isScanning ? (
                      <Unlock size={22} className="text-[#38bdf8] animate-bounce" />
                    ) : (
                      <Lock size={20} className="text-white/50" />
                    )}
                  </div>
                  <h2 className="font-display text-6xl sm:text-7xl md:text-8xl font-extralight tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                    {timeString.replace(/\s*[AP]M$/i, '')}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm font-sans tracking-wide text-white/70">
                    {dateString}
                  </p>
                </div>

                {/* Centered Biometric Fingerprint Scanner */}
                <div className="flex flex-col items-center mb-4 sm:mb-8">
                  <button
                    type="button"
                    onClick={handleUnlock}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleUnlock();
                      }
                    }}
                    disabled={isScanning}
                    className="group relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
                    aria-label="Touch fingerprint to unlock tablet"
                  >
                    {/* Outer Electric-Blue Glowing Ring */}
                    <span
                      className={`absolute inset-0 rounded-full border-2 border-[#38bdf8] transition-all duration-500 shadow-[0_0_24px_rgba(56,189,248,0.65)] ${
                        isScanning
                          ? 'scale-125 border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.9)]'
                          : 'animate-pulse'
                      }`}
                    />

                    {/* Inner Fiery-Orange Glowing Ring */}
                    <span
                      className={`absolute inset-2 sm:inset-2.5 rounded-full border-2 border-[#f9621a] transition-all duration-300 shadow-[0_0_18px_rgba(249,98,26,0.6)] ${
                        isScanning ? 'scale-110 border-[#38bdf8]' : ''
                      }`}
                    />

                    {/* Fingerprint Glyph with Neon Glow */}
                    <div className="relative z-10 flex items-center justify-center text-[#38bdf8] transition-colors group-hover:text-cyan-200">
                      <Fingerprint
                        size={38}
                        className={`transition-all duration-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] ${
                          isScanning ? 'text-emerald-300 scale-110' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
                    {isScanning ? 'Scanning Authenticity…' : 'Touch to unlock'}
                  </span>
                </div>
              </div>
            )}

            {/* VIEW B: UNLOCKED TABLET DASHBOARD */}
            {isUnlocked && !activeAppId && (
              <div className="h-full w-full overflow-y-auto px-6 sm:px-10 py-6 sm:py-8 flex flex-col justify-between">
                {/* Welcome Heading */}
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#f9621a] font-medium">
                    The Universe
                  </p>
                  <h3 className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
                    Choose where to{' '}
                    <span className="text-[#38bdf8] drop-shadow-[0_0_16px_rgba(56,189,248,0.4)]">
                      enter
                    </span>
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-300 max-w-xl leading-relaxed">
                    Each section opens like its own application. Jump directly to what matters to you —
                    no need to scroll through everything.
                  </p>
                </div>

                {/* 10 Application Cards Grid */}
                <div className="my-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
                  {TABLET_APPS.map((app) => {
                    const Icon = app.icon;
                    const isOrange = app.accent === 'orange';
                    const glowClass = isOrange
                      ? 'border-[#f9621a]/30 group-hover:border-[#f9621a]/70 group-hover:shadow-[0_0_24px_rgba(249,98,26,0.3)]'
                      : 'border-[#38bdf8]/30 group-hover:border-[#38bdf8]/70 group-hover:shadow-[0_0_24px_rgba(56,189,248,0.3)]';
                    const iconColor = isOrange ? '#f9621a' : '#38bdf8';

                    return (
                      <button
                        key={app.id}
                        onClick={() => handleAppClick(app)}
                        className={`group relative flex flex-col justify-between rounded-2xl border bg-[#0a0f1d]/75 p-4 sm:p-5 text-left transition-all duration-300 hover:bg-[#10172c]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] ${glowClass}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                            style={{
                              background: `linear-gradient(135deg, ${iconColor}22, ${iconColor}08)`,
                              color: iconColor,
                              boxShadow: `0 0 16px ${iconColor}33`,
                              border: `1px solid ${iconColor}44`,
                            }}
                          >
                            <Icon size={20} />
                          </span>
                          {app.isExternal && (
                            <ArrowUpRight size={13} className="text-white/40 group-hover:text-white" />
                          )}
                        </div>

                        <div>
                          <h4 className="font-display text-sm sm:text-base font-semibold text-white group-hover:text-[#38bdf8] transition-colors">
                            {app.label}
                          </h4>
                          <p className="mt-0.5 text-[11px] font-mono text-ink-400">
                            {app.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer hint */}
                <div className="flex items-center justify-between text-xs text-white/50 border-t border-white/5 pt-3">
                  <span>Press any application to launch within tablet view</span>
                  <button
                    onClick={handleLock}
                    className="text-[#38bdf8] hover:underline"
                  >
                    Lock tablet 🔒
                  </button>
                </div>
              </div>
            )}

            {/* VIEW C: IN-TABLET ACTIVE APPLICATION VIEW */}
            {isUnlocked && activeAppId && (
              <div className="flex h-full w-full flex-col bg-[#070914]/95">
                {/* Active App Header Bar */}
                <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-black/40 px-6 sm:px-8 backdrop-blur-md">
                  <button
                    onClick={() => {
                      playSfx('click');
                      setActiveAppId(null);
                    }}
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-all hover:border-[#38bdf8]/60 hover:text-white"
                  >
                    <ArrowLeft size={14} className="text-[#38bdf8]" />
                    <span>Dashboard</span>
                  </button>

                  <h3 className="font-display text-sm sm:text-base font-semibold uppercase tracking-wider text-white">
                    {TABLET_APPS.find((a) => a.sectionId === activeAppId)?.label || 'Application'}
                  </h3>

                  <div className="flex items-center gap-2">
                    {activeAppId === 'resume' && (
                      <a
                        href={PROFILE.links.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[#f9621a] px-3 py-1 text-xs font-medium text-white shadow-md hover:bg-[#e05312] transition-colors"
                      >
                        PDF
                      </a>
                    )}
                    <button
                      onClick={() => setActiveAppId(null)}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/60 hover:text-white transition-colors"
                    >
                      Close ✕
                    </button>
                  </div>
                </div>

                {/* Active App Component Scrollable Viewport */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                  {activeAppId === 'about' && <AboutApp />}
                  {activeAppId === 'skills' && <SkillsApp />}
                  {activeAppId === 'projects' && <ProjectsApp />}
                  {activeAppId === 'education' && <EducationApp />}
                  {activeAppId === 'experience' && <ExperienceApp />}
                  {activeAppId === 'certifications' && <CertificationsApp />}
                  {activeAppId === 'resume' && <ResumeApp />}
                  {activeAppId === 'contact' && <ContactApp />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
