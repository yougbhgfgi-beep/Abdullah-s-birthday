import { useState } from 'react';
import { X, Heart } from 'lucide-react';

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

export default function OutroSection() {
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);

  const startOutro = () => {
    setPlaying(true);
    setDone(false);
    setTimeout(() => {
      setDone(true);
    }, 7500);
  };

  return (
    <section className="relative z-10 py-24 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <div className="text-5xl mb-4 animate-float-bounce">🎀</div>
          <h2 className="text-3xl font-black text-pink-600 mb-3">الخاتمة 🌹</h2>
          <p className="text-pink-400 text-lg">كلمات أخيرة من القلب إلى القلب</p>
        </div>

        <button onClick={startOutro} disabled={playing && !done}
          className="px-12 py-5 rounded-full font-bold text-2xl text-white transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #c2185b, #ff1493, #ff69b4)' }}>
          <span className="flex items-center gap-3">
            <Heart size={26} className="fill-white" />
            شاهد الخاتمة
            <Heart size={26} className="fill-white" />
          </span>
        </button>

        {/* Bottom decoration */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-28 bg-gradient-to-r from-transparent to-pink-300" />
          <span className="text-pink-300 text-2xl">💝</span>
          <div className="h-px w-28 bg-gradient-to-l from-transparent to-pink-300" />
        </div>
        <p className="mt-4 text-pink-300 text-sm">صُنع هذا الموقع بكل المحبة خصيصاً لك يا عبد الله</p>
      </div>

      {/* Outro overlay */}
      {playing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1a0010, #3d0020, #1a0010)' }}>

          <button onClick={() => { setPlaying(false); setDone(false); }}
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X size={20} className="text-white" />
          </button>

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

          <div className={`relative z-10 max-w-lg w-full px-8 text-center ${!done ? 'animate-outro' : ''}`}>
            <div className="text-6xl mb-8 animate-heartbeat">💖</div>
            <div className="space-y-3">
              {OUTRO_LINES.map((line, i) => (
                line === '' ? (
                  <div key={i} className="h-4" />
                ) : (
                  <p key={i} className="text-pink-200 font-semibold leading-relaxed"
                    style={{
                      fontSize: line.includes('✨') || line.includes('💖') ? '1.1rem' : '1rem',
                      fontWeight: line.includes('✨') || line.includes('💖') ? 700 : 500,
                    }}>
                    {line}
                  </p>
                )
              ))}
            </div>

            {done && (
              <div className="mt-10 animate-fade-in-up">
                <p className="text-white text-3xl font-black shimmer-text">عبد الله 💕</p>
                <p className="text-pink-300 mt-2">كل عام وأنت بخير</p>
                <button onClick={() => { setPlaying(false); setDone(false); }}
                  className="mt-6 px-8 py-3 rounded-2xl font-bold text-white border-2 border-pink-400 hover:bg-pink-400/20 transition-colors">
                  إغلاق
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
