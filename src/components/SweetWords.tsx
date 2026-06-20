const quotes = [
  {
    text: 'أنت لست مجرد إنسان جميل، أنت قصيدة تمشي على قدمين.',
    icon: '🌹',
  },
  {
    text: 'في عينيك أرى كل ما يستحق الحياة... الأمل، الجمال، والنور.',
    icon: '✨',
  },
  {
    text: 'حظي من الحياة أن أعرف شخصاً مثلك... يملأ الدنيا دفئاً وبهجة.',
    icon: '💫',
  },
  {
    text: 'كل يوم يمر تكتشف نفسك أكثر، وكل اكتشاف يُثبت أنك أروع مما تتخيل.',
    icon: '🌸',
  },
  {
    text: 'الحياة أجمل لأنك فيها، والقلوب أكثر دفئاً بسبب ابتسامتك.',
    icon: '💖',
  },
  {
    text: 'تستحق كل الخير، كل الحب، وكل سعادة في هذا الكون.',
    icon: '🌺',
  },
];

export default function SweetWords() {
  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-black text-pink-600 mb-3">كلمات من القلب 💕</h2>
          <p className="text-pink-400 text-lg">لأنك تستحق أجمل الكلمات</p>
          <div className="flex justify-center gap-2 mt-4 text-xl">
            {'🌸 💕 🌸 💕 🌸'.split(' ').map((e, i) => (
              <span key={i} className="animate-float-bounce" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-right"
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-4xl mb-4 text-center animate-float-bounce"
                style={{ animationDelay: `${i * 0.3}s` }}>
                {q.icon}
              </div>
              <p className="text-pink-700 leading-relaxed font-medium text-sm">
                "{q.text}"
              </p>
              <div className="mt-4 flex justify-end">
                <div className="h-1 w-16 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #ff69b4, #ff1493)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Center quote */}
        <div className="mt-12 text-center p-10 rounded-3xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493, #c2185b)' }}>
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="absolute text-2xl text-white"
                style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}>✦</span>
            ))}
          </div>
          <div className="relative z-10">
            <p className="text-5xl mb-6">👑</p>
            <p className="text-white text-2xl font-bold leading-relaxed">
              عبد الله... أنت ملك بكل معنى الكلمة.
            </p>
            <p className="text-pink-100 text-lg mt-3">
              لا يحتاج جمالك إلى شرح، فهو يتكلم من تلقاء نفسه.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
