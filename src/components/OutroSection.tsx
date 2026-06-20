import { useState, useEffect, useMemo, useRef } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';

const OUTRO_LINES = [
  'يا عبد الله... أنت أجمل هدية منحتها الحياة لمن يحبّك.',
  'في كل نبضة قلب تسكن ذكراك،',
  'وفي كل نسمة هواء تحمل عبيرك.',
  '',
  'كل عام وأنت أجمل... أسعد... وأكثر إشراقاً.',
  '',
  'أتمنى لك سنةً مليئة بالنجاح الذي تستحقه،',
  'وبالحب الذي يغمر قلبك الطيب،',
  'وبالفرح الذي لا ينتهي.',
  '',
  '✨ عيد ميلادك الرابع والعشرون... بداية أجمل فصول قصتك ✨',
  '',
  '💖 مع كل الحب والتقدير... 💖',
];

const FLOATING_HEARTS = [...Array(12)].map((_, i) => ({
  left: 5 + Math.random() * 90,
  delay: i * 0.6,
  size: 16 + Math.random() * 24,
  duration: 4 + Math.random() * 4,
}));

const FULL_TEXT = OUTRO_LINES.join('\n');

export default function OutroSection() {
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const hearts = useMemo(() => FLOATING_HEARTS, []);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (playing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [playing]);

  const startOutro = () => {
    setPlaying(true);
    setDone(false);
    setTypedChars(0);

    timerRef.current = setInterval(() => {
      setTypedChars(prev => {
        const next = prev + 3;
        if (next >= FULL_TEXT.length) {
          clearInterval(timerRef.current);
          setTimeout(() => setDone(true), 600);
          return FULL_TEXT.length;
        }
        return next;
      });
    }, 25);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const closeOutro = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPlaying(false);
    setDone(false);
    setTypedChars(0);
  };

  return (
    <section className="relative z-10 py-24 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-float-bounce">🎀</div>
          <h2 className="text-3xl md:text-4xl font-black text-pink-600 mb-3">الخاتمة 🌹</h2>
          <p className="text-pink-400 text-lg">كلمات أخيرة من القلب إلى القلب</p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300" />
            <span className="text-pink-400 text-xl">💗</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300" />
          </div>
        </div>

        {/* Gallery strip */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto px-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border-2 border-pink-200/60">
              <img src={`${import.meta.env.BASE_URL}gallery/${i}.jpeg`} alt=""
                className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <button onClick={startOutro} disabled={playing}
          className="px-12 py-5 rounded-full font-bold text-2xl text-white transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
          style={{ background: 'linear-gradient(135deg, #c2185b, #ff1493, #ff69b4)', boxShadow: '0 10px 40px rgba(255,20,147,0.4)' }}>
          <span className="flex items-center gap-3">
            <Heart size={26} className="fill-white" />
            شاهد الخاتمة
            <Heart size={26} className="fill-white" />
          </span>
        </button>

        {/* Bottom decoration */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-28 bg-gradient-to-r from-transparent to-pink-300" />
          <span className="text-pink-300 text-3xl animate-heartbeat">💝</span>
          <div className="h-px w-28 bg-gradient-to-l from-transparent to-pink-300" />
        </div>
        <p className="mt-4 text-pink-300 text-sm">صُنع هذا الموقع بكل المحبة خصيصاً لك يا عبد الله</p>
      </div>

      {/* Outro overlay */}
      {playing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'linear-gradient(135deg, #1a0010, #3d0020, #1a0010)' }}>

          <button onClick={closeOutro}
            className="absolute top-6 left-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X size={20} className="text-white" />
          </button>

          {/* Floating hearts */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {hearts.map((h, i) => (
              <span key={i} className="absolute animate-float-up opacity-40"
                style={{
                  left: `${h.left}%`,
                  bottom: '-20px',
                  fontSize: `${h.size}px`,
                  animationDelay: `${h.delay}s`,
                  animationDuration: `${h.duration}s`,
                }}>💕</span>
            ))}
          </div>

          {/* Stars background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <span key={i} className="absolute text-white/30 animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  fontSize: `${8 + Math.random() * 14}px`,
                  animationDelay: `${Math.random() * 3}s`,
                }}>✦</span>
            ))}
          </div>

          {/* Typewriter text */}
          <div className="relative z-10 max-w-lg w-full px-6 text-center overflow-y-auto"
            style={{ maxHeight: '90vh' }}>
            <div className="text-6xl mb-6 animate-heartbeat">💖</div>
            <div className="text-right leading-relaxed"
              style={{ direction: 'rtl', whiteSpace: 'pre-wrap', fontFamily: 'Cairo, Tajawal, sans-serif' }}>
              <span className="text-pink-200 font-semibold" style={{ fontSize: '0.95rem' }}>
                {FULL_TEXT.slice(0, typedChars)}
                {typedChars < FULL_TEXT.length && (
                  <span className="inline-block w-0.5 h-5 bg-pink-300 ml-0.5 animate-pulse" />
                )}
              </span>
            </div>

            {done && (
              <div className="mt-10 animate-fade-in-up space-y-4">
                <div className="flex justify-center gap-2 text-2xl">
                  {['🌹','💕','✨','💖','🌹'].map((e, i) => (
                    <span key={i} className="animate-float-bounce" style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
                  ))}
                </div>
                <p className="text-white text-3xl md:text-4xl font-black shimmer-text">عبد الله 💕</p>
                <p className="text-pink-300 text-lg">كل عام وأنت بخير يا أجمل إنسان</p>
                <div className="flex items-center justify-center gap-2 text-pink-400 text-sm">
                  <Sparkles size={16} />
                  <span>دائمًا في قلبي</span>
                  <Sparkles size={16} />
                </div>
                <button onClick={closeOutro}
                  className="mt-6 px-10 py-3 rounded-2xl font-bold text-white border-2 border-pink-400 hover:bg-pink-400/20 transition-all duration-300 hover:scale-105">
                  إغلاق 💗
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
