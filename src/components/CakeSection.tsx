import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

interface Confetti {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: string;
}

const CANDLE_COLORS = ['#ff69b4', '#ff1493', '#ffd700', '#ff6eb4', '#ff85a1', '#ff9ec4'];

const candles = [
  { left: 38, height: 44, delay: '0s' },
  { left: 50, height: 48, delay: '0.15s' },
  { left: 62, height: 38, delay: '0.05s' },
];

export default function CakeSection() {
  const [blown, setBlown] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showWish, setShowWish] = useState(false);

  useEffect(() => {
    if (showWish) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showWish]);

  const COLORS = ['#ff69b4', '#ff1493', '#ffd700', '#ff6eb4', '#ffb6c1', '#ff85a1', '#ffc0cb'];

  const blowCandles = () => {
    if (blown) return;
    setBlown(true);
    const pieces: Confetti[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 8 + Math.random() * 10,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.8,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }));
    setConfetti(pieces);
    setTimeout(() => setShowWish(true), 800);
    setTimeout(() => setConfetti([]), 4000);
  };

  useEffect(() => {
    if (blown) {
      const t = setTimeout(() => setConfetti([]), 4500);
      return () => clearTimeout(t);
    }
  }, [blown]);

  return (
    <section className="relative z-10 py-20 px-4 text-center">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {confetti.map((c) => (
          <div key={c.id} className="absolute confetti-piece"
            style={{
              left: `${c.left}%`,
              top: '-20px',
              width: c.shape === 'circle' ? c.size : c.size * 0.7,
              height: c.shape === 'circle' ? c.size : c.size * 1.4,
              borderRadius: c.shape === 'circle' ? '50%' : '2px',
              background: c.color,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }} />
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-black text-pink-600 mb-2">تورتة عيد ميلادك 🎂</h2>
        <p className="text-pink-400 mb-10">
          {blown ? 'كل عام وأنت بخير يا قلبي! 💖' : 'اضغط على الشمعة لإطفائها 🕯️'}
        </p>

        {/* Cake */}
        <div className="flex flex-col items-center cursor-pointer group" onClick={blowCandles}>
          {/* Candles row */}
          <div className="relative w-80 flex justify-center items-end mb-1 transition-transform group-hover:scale-105"
            style={{ height: 56 }}>
            {candles.map((c, i) => (
              <div key={i} className="absolute flex flex-col items-end"
                style={{ left: `${c.left}%`, bottom: 0 }}>
                {!blown ? (
                  <>
                    {/* Flame glow */}
                    <div className="w-5 h-5 rounded-full absolute -top-2 blur-sm"
                      style={{ background: '#ffd700', opacity: 0.4 }} />
                    {/* Flame */}
                    <div className="relative mb-px">
                      <div className="w-2.5 h-4 rounded-full"
                        style={{ background: 'radial-gradient(ellipse, #fff9c4, #ffd700 40%, #ff6b00)' }} />
                    </div>
                  </>
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 opacity-60 mb-1" />
                )}
                {/* Candle body */}
                <div className="w-[5px] rounded-sm"
                  style={{
                    height: c.height,
                    background: `linear-gradient(to bottom, ${CANDLE_COLORS[i]}, ${CANDLE_COLORS[(i + 1) % CANDLE_COLORS.length]})`,
                  }} />
                {/* Candle stripe */}
                <div className="w-[5px] h-[3px] rounded-sm -mt-[2px]"
                  style={{ background: CANDLE_COLORS[(i + 3) % CANDLE_COLORS.length] }} />
              </div>
            ))}
          </div>

          {/* Top tier */}
          <div className="relative w-56 h-16 rounded-t-full shadow-lg overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #ff69b4, #ff85a1)' }}>
            {/* Frosting drips */}
            <div className="absolute top-0 left-0 right-0 h-full flex items-end">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex-1 flex items-end justify-center">
                  <div className="w-[10px] rounded-b-full bg-white/40"
                    style={{ height: `${6 + Math.random() * 10}px` }} />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm drop-shadow-md">🌸 Happy Birthday 🌸</span>
            </div>
          </div>

          {/* Middle tier */}
          <div className="relative w-72 h-20 shadow-lg overflow-hidden -mt-1"
            style={{ background: 'linear-gradient(135deg, #ffc0cb, #ffb6c1)' }}>
            <div className="absolute inset-0 flex items-center justify-center gap-3">
              {['💕', '⭐', '💕', '⭐', '💕'].map((e, i) => (
                <span key={i} className="text-lg">{e}</span>
              ))}
            </div>
            {/* Drip effect */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute top-0 rounded-b-full"
                style={{
                  left: `${8 + i * 12}%`,
                  width: 14,
                  height: 10 + Math.random() * 12,
                  background: '#ff69b4',
                }} />
            ))}
          </div>

          {/* Bottom tier */}
          <div className="relative w-80 h-24 rounded-b-3xl shadow-xl overflow-hidden -mt-1"
            style={{ background: 'linear-gradient(135deg, #ff85a1, #ff69b4)' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-2xl drop-shadow-md">عبد الله 💝</span>
            </div>
            {/* Bottom decoration */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-3">
              {['🌸', '🌷', '✨', '🌷', '🌸'].map((e, i) => (
                <span key={i} className="text-sm">{e}</span>
              ))}
            </div>
          </div>

          {/* Plate */}
          <div className="w-96 h-4 rounded-full -mt-1 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #ffd6e8, #ffc0cb)' }} />
        </div>

        {!blown && (
          <p className="mt-6 text-pink-400 text-sm animate-float-bounce">
            اضغط على التورتة لإطفاء الشمع! ✨
          </p>
        )}
      </div>

      {/* Wish Modal */}
      {showWish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(255, 20, 147, 0.1)', backdropFilter: 'blur(10px)' }}>
          <div className="glass-card rounded-3xl p-8 max-w-md w-full shadow-2xl animate-fade-in-scale relative text-center"
            style={{ boxShadow: '0 30px 70px rgba(255, 105, 180, 0.35)' }}>

            <button onClick={() => setShowWish(false)}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center transition-colors">
              <X size={18} className="text-pink-500" />
            </button>

            <div className="text-6xl mb-4 animate-float-bounce">🎊</div>
            <h3 className="text-3xl font-black shimmer-text mb-4">
              عيد ميلاد سعيد يا عبد الله! 🎂
            </h3>
            <p className="text-pink-700 leading-relaxed text-lg">
              24 سنة من العز والرجولة والتميز...
              أتمنى لك سنةً مليئة بالسعادة والنجاح والحب والخير.
              كل عام وأنت بألف خير يا قلبي 💖
            </p>
            <div className="flex justify-center gap-2 mt-4 text-3xl">
              {['🎉', '🎊', '🌟', '🎈', '💝'].map((e, i) => (
                <span key={i} className="animate-float-bounce" style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
              ))}
            </div>
            <button onClick={() => setShowWish(false)}
              className="mt-6 w-full py-3 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
              شكراً 💕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
