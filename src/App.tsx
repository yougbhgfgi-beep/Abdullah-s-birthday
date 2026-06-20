import { useState, useRef, useCallback, useEffect } from 'react';

import { Volume2, VolumeX } from 'lucide-react';
import FloatingBackground from './components/FloatingBackground';
import LoginPage from './components/LoginPage';
import EnvelopeModal from './components/EnvelopeModal';
import HeroSection from './components/HeroSection';
import MagicSection from './components/MagicSection';
import CakeSection from './components/CakeSection';
import SweetWords from './components/SweetWords';
import MemoriesSection from './components/MemoriesSection';
import CountersSection from './components/CountersSection';
import GallerySection from './components/GallerySection';
import VideoSection from './components/VideoSection';
import OutroSection from './components/OutroSection';

type Stage = 'login' | 'envelope' | 'main';

export default function App() {
  const [stage, setStage] = useState<Stage>('login');
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicOnRef = useRef(false);

  const handleLogin = useCallback(() => {
    setStage('envelope');
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setMusicOn(true);
        musicOnRef.current = true;
      }
    }, 300);
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (musicOnRef.current) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    musicOnRef.current = !musicOnRef.current;
    setMusicOn(musicOnRef.current);
  }, []);

  const pauseMusic = useCallback(() => {
    if (audioRef.current && musicOnRef.current) {
      audioRef.current.pause();
      musicOnRef.current = false;
      setMusicOn(false);
    }
  }, []);

  const resumeMusic = useCallback(() => {
    if (audioRef.current && !musicOnRef.current) {
      audioRef.current.play().catch(() => {});
      musicOnRef.current = true;
      setMusicOn(true);
    }
  }, []);

  if (stage === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  useEffect(() => {
    document.body.style.overflow = '';
  }, []);

  return (
    <div className="relative min-h-screen"
      style={{
        overflowX: 'clip',
        background: 'linear-gradient(180deg, #fff0f5 0%, #ffe4f0 30%, #fff0f5 60%, #ffd6e8 100%)',
      }}>

      <FloatingBackground />

      {/* Music toggle button */}
      <div className="fixed top-6 left-6 z-30">
        <button onClick={toggleMusic}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-90 ${musicOn ? 'animate-pulse-glow' : ''}`}
          style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
          {musicOn ? <Volume2 size={22} className="text-white" /> : <VolumeX size={22} className="text-white" />}
        </button>
        {musicOn && (
          <span className="absolute -top-2 -right-2 text-sm animate-float-bounce" style={{ animationDelay: '0s' }}>🎵</span>
        )}
        {musicOn && (
          <span className="absolute -bottom-2 -left-2 text-xs animate-float-bounce" style={{ animationDelay: '0.5s' }}>🎶</span>
        )}
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio.webm`} loop preload="auto" />

      {stage === 'envelope' && (
        <EnvelopeModal onClose={() => setStage('main')} />
      )}

      {/* Page content — always rendered so it's behind the envelope modal */}
      <main>
        {/* Decorative frame */}
        <div className="mx-4 md:mx-8 lg:mx-16 relative">
          {/* Frame borders */}
          <div className="absolute inset-0 pointer-events-none border-[2px] md:border-[3px] border-pink-300/40 rounded-[24px] md:rounded-[60px]" />
          <div className="absolute inset-[4px] md:inset-[10px] pointer-events-none border border-pink-200/30 rounded-[18px] md:rounded-[52px]" />
          <div className="absolute inset-[8px] md:inset-[18px] pointer-events-none border border-dashed border-pink-300/20 rounded-[12px] md:rounded-[44px]" />

          {/* Corner decorations */}
          <div className="absolute -top-0.5 -left-0.5 md:-top-2 md:-left-2 w-6 h-6 md:w-12 md:h-12 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full border-t-[2px] md:border-t-[3px] border-l-[2px] md:border-l-[3px] border-pink-400/60 rounded-tl-[24px] md:rounded-tl-[60px]" />
            <span className="absolute -top-0.5 -left-0.5 md:-top-2 md:-left-2 text-sm md:text-2xl animate-float-bounce" style={{ animationDelay: '0s' }}>🌸</span>
          </div>
          <div className="absolute -top-0.5 -right-0.5 md:-top-2 md:-right-2 w-6 h-6 md:w-12 md:h-12 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full border-t-[2px] md:border-t-[3px] border-r-[2px] md:border-r-[3px] border-pink-400/60 rounded-tr-[24px] md:rounded-tr-[60px]" />
            <span className="absolute -top-0.5 -right-0.5 md:-top-2 md:-right-2 text-sm md:text-2xl animate-float-bounce" style={{ animationDelay: '0.2s' }}>💕</span>
          </div>
          <div className="absolute -bottom-0.5 -left-0.5 md:-bottom-2 md:-left-2 w-6 h-6 md:w-12 md:h-12 pointer-events-none">
            <div className="absolute bottom-0 left-0 w-full h-full border-b-[2px] md:border-b-[3px] border-l-[2px] md:border-l-[3px] border-pink-400/60 rounded-bl-[24px] md:rounded-bl-[60px]" />
            <span className="absolute -bottom-0.5 -left-0.5 md:-bottom-2 md:-left-2 text-sm md:text-2xl animate-float-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-2 md:-right-2 w-6 h-6 md:w-12 md:h-12 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-full h-full border-b-[2px] md:border-b-[3px] border-r-[2px] md:border-r-[3px] border-pink-400/60 rounded-br-[24px] md:rounded-br-[60px]" />
            <span className="absolute -bottom-0.5 -right-0.5 md:-bottom-2 md:-right-2 text-sm md:text-2xl animate-float-bounce" style={{ animationDelay: '0.6s' }}>🌹</span>
          </div>

          <HeroSection />

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 px-4">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-pink-200" />
            <span className="text-2xl">🌸</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-pink-200" />
          </div>

          <MagicSection />

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 px-4">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-pink-200" />
            <span className="text-2xl">💕</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-pink-200" />
          </div>

          <CakeSection />

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 px-4">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-pink-200" />
            <span className="text-2xl">✨</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-pink-200" />
          </div>

          <SweetWords />

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 px-4">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-pink-200" />
            <span className="text-2xl">📖</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-pink-200" />
          </div>

          <MemoriesSection />

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 px-4">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-pink-200" />
            <span className="text-2xl">⏳</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-pink-200" />
          </div>

          <CountersSection />

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 px-4">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-pink-200" />
            <span className="text-2xl">📸</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-pink-200" />
          </div>

          <GallerySection />

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 px-4">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-pink-200" />
            <span className="text-2xl">🎬</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-pink-200" />
          </div>

          <VideoSection onPlay={pauseMusic} onPause={resumeMusic} />

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 px-4">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-pink-200" />
            <span className="text-2xl">🎀</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-pink-200" />
          </div>

          <OutroSection />
        </div>
      </main>
    </div>
  );
}
