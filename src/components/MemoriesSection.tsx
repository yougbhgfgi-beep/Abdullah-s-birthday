import { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';

const memories = [
  {
    text: 'فاكر الكوتشي لما نزلنا ؟',
    emoji: '👟',
    reaction: '😂😭',
  },
  {
    text: 'و فاكر هاتي ايدك.. لا ؟',
    emoji: '🤲',
    reaction: '😂😭',
  },
  {
    text: 'فاكر أول مرة في ***** ؟',
    emoji: '💗',
    reaction: '💗',
  },
  {
    text: 'فاكر أول لمسة إيد و أول بوسة لإيدي اللي كانت عكس طبيعتك و عملتها عشاني أنا ؟',
    emoji: '🥹',
    reaction: '💗',
  },
];

export default function MemoriesSection() {
  const [openMemories, setOpenMemories] = useState(false);

  useEffect(() => {
    if (openMemories) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [openMemories]);

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-black text-pink-600 mb-3">مواقف بينا 💕</h2>
          <p className="text-pink-400 text-lg">ذكريات عمرنا اللي جمّعنا 💫</p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300" />
            <span className="text-pink-400 text-xl">📖</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300" />
          </div>
        </div>

        <div className="space-y-5">
          {memories.map((m, i) => (
            <div key={i}
              className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-right animate-fade-in-up flex items-start gap-4"
              style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="text-4xl flex-shrink-0 animate-float-bounce"
                style={{ animationDelay: `${i * 0.3}s` }}>
                {m.emoji}
              </div>
              <div className="flex-1">
                <p className="text-pink-700 font-semibold text-lg leading-relaxed">
                  {m.text}
                </p>
                <p className="text-2xl mt-2">{m.reaction}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button to show cute modal */}
        <div className="text-center mt-10">
          <button onClick={() => setOpenMemories(true)}
            className="px-10 py-4 rounded-full font-bold text-xl text-white transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-glow"
            style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
            <span className="flex items-center gap-2">
              <Heart size={22} className="fill-white" />
              ذكرياتنا
              <Heart size={22} className="fill-white" />
            </span>
          </button>
        </div>
      </div>

      {/* Cute modal */}
      {openMemories && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(255, 20, 147, 0.1)', backdropFilter: 'blur(10px)' }}>
          <div className="glass-card rounded-3xl p-8 max-w-md w-full shadow-2xl animate-fade-in-scale text-center relative"
            style={{ boxShadow: '0 30px 70px rgba(255, 105, 180, 0.35)' }}>
            <button onClick={() => setOpenMemories(false)}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center transition-colors">
              <X size={18} className="text-pink-500" />
            </button>
            <div className="text-6xl mb-4 animate-heartbeat">💖</div>
            <h3 className="text-2xl font-black text-pink-600 mb-3">كل لحظة معاك ذكرى</h3>
            <p className="text-pink-700 leading-relaxed">
              حتى لو كبرنا و كبرت ذكرياتنا، فضلت أحلى حاجة في حياتي إن كل لحظة جميلة عشناها سوا.
              كل موقف و كل ضحكة و كل دمعة... كل ده خلّينا احنا.
            </p>
            <p className="text-pink-600 font-bold mt-4 text-lg">
              و لسه قدامنا كتييير 🥹💗
            </p>
            <button onClick={() => setOpenMemories(false)}
              className="mt-6 w-full py-3 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
              بحبك 💕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
