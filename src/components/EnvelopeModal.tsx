import { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function EnvelopeModal({ onClose }: Props) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(255, 20, 147, 0.12)', backdropFilter: 'blur(8px)' }}>

      <div className="relative w-full max-w-lg animate-fade-in-scale">
        {!opened ? (
          /* ENVELOPE CLOSED */
          <div className="text-center">
            <p className="text-pink-600 font-bold text-xl mb-8 animate-float-bounce">
              ✉️ رسالة خاصة لك... اضغط لفتحها 💌
            </p>
            <button onClick={() => setOpened(true)}
              className="relative mx-auto block cursor-pointer group transition-transform hover:scale-105">
              {/* Envelope body */}
              <div className="w-64 sm:w-72 h-48 mx-auto rounded-2xl shadow-2xl relative overflow-hidden"
                style={{ background: 'linear-gradient(145deg, #ffe4f0, #ffc0cb)' }}>

                {/* Envelope flap */}
                <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
                  <div className="w-full h-full"
                    style={{
                      background: 'linear-gradient(145deg, #ffb6c1, #ff69b4)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }} />
                </div>

                {/* Center heart */}
                <div className="absolute inset-0 flex items-center justify-center mt-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg animate-heartbeat"
                    style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
                    <Heart size={24} className="text-white fill-white" />
                  </div>
                </div>

                {/* Bottom folds */}
                <div className="absolute bottom-0 left-0 right-0 h-16"
                  style={{
                    background: 'linear-gradient(to top, #ffb6c1, transparent)',
                  }} />
              </div>
            </button>
          </div>
        ) : (
          /* LETTER OPENED */
          <div className="glass-card rounded-3xl p-8 shadow-2xl animate-letter-slide relative"
            style={{ boxShadow: '0 30px 70px rgba(255, 105, 180, 0.3)' }}>

            <button onClick={onClose}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center transition-colors">
              <X size={18} className="text-pink-500" />
            </button>

            <div className="text-center mb-6">
              <div className="flex justify-center gap-1 text-2xl mb-3">
                {'💌 💕 💌'.split(' ').map((e, i) => (
                  <span key={i} className="animate-float-bounce" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
                ))}
              </div>
              <h2 className="text-3xl font-black shimmer-text">إلى... عبد الله 🌹</h2>
            </div>

            <div className="space-y-4 text-right leading-relaxed"
              style={{ fontFamily: 'Cairo', color: '#8b1a4a' }}>
              <p className="text-base text-pink-700">
                حبيبي و نور عيني و أغلى حد على قلبي اللي مليش غيره
              </p>
              <p className="text-base text-pink-700">
                دخلت حياتي نورتها و مليتها عليا
              </p>
              <p className="text-base text-pink-700">
                جيت لقيتني متدمرة و مكسورة و الدنيا بهدلتني كتير
              </p>
              <p className="text-base text-pink-700">
                صلحت كل ده و بقيت ليا كل حاجة
              </p>
              <p className="text-base text-pink-700">
                عملت حاجات عكس طبيعتك عشاني.. عشان متحرمنيش من حاجة
              </p>
              <p className="text-base text-pink-700">
                لقينا بعض ؟ لا يا حبيبي احنا نعرف بعض من زمان أوي أوي
              </p>
              <p className="text-base text-pink-700">
                كل حد فينا عدى بقصة صعبة أو "قصص" بس كان لازم كل ده عشان نعرف قيمة بعض و نعرف إن وجودنا سوا هو رحمة من ربنا لينا عشان نعيش مع بعض أحلى حياة إن شاء الله و نعوض بعض عن اللي فات
              </p>
            </div>

            <button onClick={onClose}
              className="mt-6 w-full py-3 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
              أغلق الرسالة 💕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
