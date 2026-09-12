import React, { useEffect, useState, useRef } from 'react';
import { HiUserGroup, HiAcademicCap, HiBriefcase, HiLightBulb } from 'react-icons/hi';

const stats = [
  { icon: HiUserGroup, value: 25000, suffix: '+', label: 'Lives Impacted' },
  { icon: HiAcademicCap, value: 5000, suffix: '+', label: 'Youth Skilled' },
  { icon: HiBriefcase, value: 4500, suffix: '+', label: 'Placed in Jobs' },
  { icon: HiLightBulb, value: 200, suffix: '+', label: 'Corporate Partners' },
];

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="relative z-20 -mt-10 mx-4 sm:mx-8 lg:mx-auto max-w-6xl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-black/30 rounded-2xl p-6 sm:p-8 transition-colors">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#fff5f2] dark:bg-[#ec4d25]/15 border border-[#ffdcd2] dark:border-[#ec4d25]/30 text-[#ec4d25] flex items-center justify-center mx-auto mb-3 group-hover:scale-105 group-hover:bg-[#ec4d25] group-hover:text-white transition-all duration-200 shadow-sm">
                  <Icon className="text-2xl transition-colors" />
                </div>
                <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
