import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_SECTIONS, type SectionId } from '@/data/portfolio';
import { useAudio } from '@/audio/AudioProvider';

interface NavBarProps {
  active: SectionId | 'hero';
  onNavigate: (id: SectionId) => void;
}

export function NavBar({ active, onNavigate }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { playSfx } = useAudio();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: SectionId) => {
    playSfx('click');
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-ink-700/60' : 'bg-transparent'
      }`}
    >
      <nav className="container-cine flex h-16 items-center justify-between md:h-20">
        <button
          onClick={() => { playSfx('click'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-display text-sm font-semibold tracking-widest text-ink-100 transition-colors hover:text-ember-300"
          aria-label="Return to top"
        >
          M.S<span className="text-ember-500">.</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_SECTIONS.map((s) => (
            <li key={s.id} className="relative">
              {/* hidden anchor — the app transition expands from here */}
              <span id={`nav-origin-${s.id}`} className="absolute left-1/2 top-1/2 h-0 w-0" aria-hidden />
              <button
                onClick={() => go(s.id)}
                onMouseEnter={() => playSfx('hover')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === s.id ? 'text-ember-300' : 'text-ink-300 hover:text-ink-100'
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="rounded-full p-2 text-ink-200 hover:text-ember-300 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-ink-700/60 lg:hidden">
          <ul className="container-cine flex flex-col gap-1 py-4">
            {NAV_SECTIONS.map((s) => (
              <li key={s.id} className="relative">
                <span id={`nav-origin-${s.id}`} className="absolute left-4 top-4 h-0 w-0" aria-hidden />
                <button
                  onClick={() => go(s.id)}
                  className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                    active === s.id ? 'bg-ember-500/10 text-ember-300' : 'text-ink-200 hover:bg-ink-800/60'
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
