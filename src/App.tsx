import { useCallback, useState } from 'react';
import { AudioProvider } from '@/audio/AudioProvider';
import { LoadingScreen } from '@/components/LoadingScreen';
import { NavBar } from '@/components/NavBar';
import { ControlDock } from '@/components/ControlDock';
import { HeroSection } from '@/components/HeroSection';
import { Launcher } from '@/components/Launcher';
import { ClosingScene } from '@/components/ClosingScene';
import { useActiveSection } from '@/hooks/useActiveSection';
import type { SectionId } from '@/data/portfolio';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeApp, setActiveApp] = useState<SectionId | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const active = useActiveSection();

  const handleOpenTabletApp = useCallback((id: SectionId) => {
    setIsUnlocked(true);
    setActiveApp(id);
    const launcherEl = document.getElementById('launcher');
    if (launcherEl) {
      launcherEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <AudioProvider>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div className="relative min-h-screen bg-ink-950 text-ink-100">
        <div className="pointer-events-none fixed inset-0 z-0 bg-radial-ember opacity-30" />
        <div className="pointer-events-none fixed inset-0 z-0 bg-grid-faint [background-size:60px_60px] opacity-20" />

        <NavBar
          active={active}
          onNavigate={(id) => {
            handleOpenTabletApp(id);
          }}
        />

        <main className="relative z-10">
          <HeroSection
            onExplore={() => {
              handleOpenTabletApp('projects');
            }}
            onResume={() => {
              handleOpenTabletApp('resume');
            }}
            onOpenSection={(id) => {
              handleOpenTabletApp(id);
            }}
            onTransitionComplete={() => {}}
          />

          <Launcher
            activeAppId={activeApp}
            setActiveAppId={setActiveApp}
            isUnlocked={isUnlocked}
            setIsUnlocked={setIsUnlocked}
          />

          <ClosingScene onReturn={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </main>

        <ControlDock />
      </div>
    </AudioProvider>
  );
}

export default App;

