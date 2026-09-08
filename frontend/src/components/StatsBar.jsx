import React, { useEffect, useState, useRef } from 'react';
import { HiUserGroup, HiAcademicCap, HiBriefcase, HiLightBulb } from 'react-icons/hi';

const stats = [
  { icon: HiUserGroup, value: 25000, suffix: '+', label: 'Lives Impacted', color: 'from-emerald-500 to-teal-500' },
  { icon: HiAcademicCap, value: 5000, suffix: '+', label: 'Youth Skilled', color: 'from-teal-500 to-cyan-500' },
  { icon: HiBriefcase, value: 4500, suffix: '+', label: 'Placed in Jobs', color: 'from-cyan-500 to-blue-500' },
  { icon: HiLightBulb, value: 200, suffix: '+', label: 'Corporate Partners', color: 'from-amber-500 to-orange-500' },
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
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-black/30 rounded-2xl p-6 sm:p-8 transition-colors">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 shadow-md`}>
                  <Icon className="text-2xl text-white" />
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
