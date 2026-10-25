import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export interface AudioState {
  enabled: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  muted: boolean;
  volume: number;
  sfxVolume: number;
  audioError: string | null;
  audioSrc: string;
  toggleMusic: () => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  setSfxVolume: (v: number) => void;
  playSfx: (kind: SfxKind) => void;
}

export type SfxKind = 'hover' | 'click' | 'transition';

export const JAZZ_TRACK_PATH = '/assets/audio/portfolio-jazz.mp3';

const AudioContext = createContext<AudioState | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [muted, setMuted] = useState(false);

  // Default comfortable volume: 35% (0.35)
  const [volume, setVolumeState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('portfolio_music_vol');
      if (saved) {
        const parsed = Number(saved);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) return parsed;
      }
    }
    return 0.35;
  });

  const [sfxVolume, setSfxVolumeState] = useState(0.35);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Persistent single HTML5 Audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playbackPosRef = useRef<number>(0);
  const autoplayAttemptedRef = useRef<boolean>(false);
  // Track if user explicitly clicked Pause to prevent unwanted auto-resumption
  const userPausedRef = useRef<boolean>(false);

  // WebAudio context for subtle click SFX
  const ctxRef = useRef<AudioContext | null>(null);

  // Initial setup, volume synchronization, and graceful autoplay / first-interaction handling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = muted ? 0 : volume;
    audio.muted = muted;

    if (autoplayAttemptedRef.current) return;
    autoplayAttemptedRef.current = true;

    let removeListeners: (() => void) | null = null;

    const setupInteractionListeners = () => {
      const events = ['click', 'keydown', 'pointerdown', 'touchstart'];

      const onFirstInteraction = (e: Event) => {
        // If clicking the music toggle button itself, let toggleMusic handle it
        const target = e.target as HTMLElement | null;
        if (target && target.closest('#music-toggle-btn')) {
          return;
        }

        // If the user has explicitly paused the audio, never auto-play
        if (userPausedRef.current) {
          if (removeListeners) removeListeners();
          return;
        }

        const a = audioRef.current;
        if (!a) return;

        const p = a.play();
        if (p !== undefined) {
          p.then(() => {
            setEnabled(true);
            setIsPlaying(true);
            setIsPaused(false);
            setAudioError(null);
            if (removeListeners) removeListeners();
          }).catch(() => {
            // If interaction still restricted, leave listeners active for next gesture
          });
        }
      };

      removeListeners = () => {
        events.forEach((evt) => {
          window.removeEventListener(evt, onFirstInteraction);
        });
      };

      events.forEach((evt) => {
        window.addEventListener(evt, onFirstInteraction, { passive: true });
      });
    };

    // 1. Attempt autoplay immediately when portfolio opens
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setEnabled(true);
          setIsPlaying(true);
          setIsPaused(false);
          setAudioError(null);
        })
        .catch(() => {
          // Autoplay blocked by browser policy without sound.
          // Gracefully wait for the user's first genuine interaction (click, tap, key) anywhere on page.
          setIsPlaying(false);
          setIsPaused(false);
          setupInteractionListeners();
        });
    }

    return () => {
      if (removeListeners) removeListeners();
    };
  }, [muted, volume]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setAudioError(null);

    // If currently playing, explicitly pause it
    if (isPlaying) {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }

    // User explicitly pressed Play / Resume
    userPausedRef.current = false;

    // Start / resume playback on user gesture
    if (playbackPosRef.current > 0 && Math.abs(audio.currentTime - playbackPosRef.current) > 0.2) {
      audio.currentTime = playbackPosRef.current;
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setEnabled(true);
          setIsPlaying(true);
          setIsPaused(false);
          setAudioError(null);
        })
        .catch((err: unknown) => {
          setIsPlaying(false);
          setIsPaused(false);
          const errMsg = err instanceof Error ? err.message : String(err);
          setAudioError(`Playback error: ${errMsg}`);
          console.error('Playback error:', err);
        });
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      if (audioRef.current) {
        audioRef.current.muted = next;
        audioRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  }, [volume]);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio_music_vol', String(clamped));
    }
    if (audioRef.current && !muted) {
      audioRef.current.volume = clamped;
    }
  }, [muted]);

  const setSfxVolume = useCallback((v: number) => {
    setSfxVolumeState(Math.max(0, Math.min(1, v)));
  }, []);

  const playSfx = useCallback(
    (kind: SfxKind) => {
      if (muted || sfxVolume <= 0) return;
      try {
        if (!ctxRef.current) {
          const Ctor =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          if (Ctor) ctxRef.current = new Ctor();
        }
        const ctx = ctxRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') {
          void ctx.resume();
        }

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g);
        g.connect(ctx.destination);

        const gainVal = sfxVolume * 0.12;

        if (kind === 'hover') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
          g.gain.setValueAtTime(0.0001, now);
          g.gain.exponentialRampToValueAtTime(gainVal * 0.6, now + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
          osc.start(now);
          osc.stop(now + 0.13);
        } else if (kind === 'click') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.exponentialRampToValueAtTime(220, now + 0.1);
          g.gain.setValueAtTime(0.0001, now);
          g.gain.exponentialRampToValueAtTime(gainVal, now + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
          osc.start(now);
          osc.stop(now + 0.2);
        } else {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.exponentialRampToValueAtTime(720, now + 0.4);
          g.gain.setValueAtTime(0.0001, now);
          g.gain.exponentialRampToValueAtTime(gainVal * 0.8, now + 0.04);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
          osc.start(now);
          osc.stop(now + 0.55);
        }
      } catch {
        // Silently handled
      }
    },
    [muted, sfxVolume]
  );

  const value = useMemo<AudioState>(
    () => ({
      enabled,
      isPlaying,
      isPaused,
      muted,
      volume,
      sfxVolume,
      audioError,
      audioSrc: JAZZ_TRACK_PATH,
      toggleMusic,
      toggleMute,
      setVolume,
      setSfxVolume,
      playSfx,
    }),
    [
      enabled,
      isPlaying,
      isPaused,
      muted,
      volume,
      sfxVolume,
      audioError,
      toggleMusic,
      toggleMute,
      setVolume,
      setSfxVolume,
      playSfx,
    ]
  );

  return (
    <AudioContext.Provider value={value}>
      {/* Persistent HTML5 Audio Element in DOM */}
      <audio
        ref={audioRef}
        src={JAZZ_TRACK_PATH}
        loop
        preload="auto"
        onPlaying={() => {
          setIsPlaying(true);
          setIsPaused(false);
          setAudioError(null);
        }}
        onPause={() => {
          setIsPlaying(false);
          setIsPaused(true);
          if (audioRef.current) {
            playbackPosRef.current = audioRef.current.currentTime;
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setIsPaused(true);
        }}
        onTimeUpdate={() => {
          if (audioRef.current) {
            playbackPosRef.current = audioRef.current.currentTime;
          }
        }}
        onError={() => {
          if (audioRef.current && audioRef.current.src) {
            setIsPlaying(false);
            setIsPaused(false);
            setAudioError(`Audio file could not be loaded from ${JAZZ_TRACK_PATH}`);
          }
        }}
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio(): AudioState {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
