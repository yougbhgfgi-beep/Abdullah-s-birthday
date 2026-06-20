import { useState, useEffect } from 'react';

function useTimeSince(date: Date) {
  const [elapsed, setElapsed] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let diff = now.getTime() - date.getTime();
      if (diff < 0) diff = 0;

      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600) % 24;
      const minutes = Math.floor(totalSeconds / 60) % 60;
      const seconds = totalSeconds % 60;

      let years = now.getFullYear() - date.getFullYear();
      let months = now.getMonth() - date.getMonth();
      let days = now.getDate() - date.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      setElapsed({ years, months, days, hours, minutes, seconds });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [date]);

  return elapsed;
}

function CounterCard({ label, value, delay }: { label: string; value: number; delay: string }) {
  return (
    <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: delay }}>
      <div className="glass-card w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg border border-pink-200/60"
        style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
        <span className="text-lg sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-600 to-rose-400">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="mt-1 sm:mt-2 text-pink-500 font-bold text-[10px] sm:text-sm md:text-base">{label}</span>
    </div>
  );
}

interface Props {
  title: string;
  date: Date;
  icon: string;
  subtitle: string;
  dateLabel?: string;
}

function CounterUnit({ title, date, icon, subtitle, dateLabel }: Props) {
  const t = useTimeSince(date);

  const dateStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

  return (
    <div className="glass-card rounded-3xl p-8 shadow-xl text-center relative overflow-hidden"
      style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff69b4, transparent)' }} />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff1493, transparent)' }} />
      <div className="relative z-10">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-2xl md:text-3xl font-black text-pink-600 mb-1">{title}</h3>
        <p className="text-pink-400 text-sm mb-2">{subtitle}</p>
        <div className="inline-block px-4 py-1 rounded-full bg-pink-100/60 border border-pink-200/40 text-pink-500 font-bold text-sm mb-6">{dateStr}</div>
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 flex-wrap" dir="ltr">
          <CounterCard label="سنين" value={t.years} delay="0s" />
          <span className="text-pink-300 text-lg sm:text-2xl font-light self-center mb-4 sm:mb-6">:</span>
          <CounterCard label="شهور" value={t.months} delay="0.05s" />
          <span className="text-pink-300 text-lg sm:text-2xl font-light self-center mb-4 sm:mb-6">:</span>
          <CounterCard label="أيام" value={t.days} delay="0.1s" />
          <span className="text-pink-300 text-lg sm:text-2xl font-light self-center mb-4 sm:mb-6">:</span>
          <CounterCard label="ساعات" value={t.hours} delay="0.15s" />
          <span className="text-pink-300 text-lg sm:text-2xl font-light self-center mb-4 sm:mb-6">:</span>
          <CounterCard label="دقائق" value={t.minutes} delay="0.2s" />
          <span className="text-pink-300 text-lg sm:text-2xl font-light self-center mb-4 sm:mb-6">:</span>
          <CounterCard label="ثواني" value={t.seconds} delay="0.25s" />
        </div>
      </div>
    </div>
  );
}

export default function CountersSection() {
  const birthDate = new Date(2002, 5, 20);
  const metDate = new Date(2026, 3, 27);

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <CounterUnit
          title="عمر عبد الله"
          date={birthDate}
          icon="🎂"
          subtitle="من يوم ما جيت للدنيا"
        />
        <CounterUnit
          title="من يوم ما تقابلنا"
          date={metDate}
          icon="💗"
          subtitle="من أول نظرة"
        />
      </div>
    </section>
  );
}
