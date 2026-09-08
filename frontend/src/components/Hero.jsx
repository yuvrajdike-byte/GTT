import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiHeart, HiCheckCircle, HiAcademicCap, HiClipboardCheck, HiBriefcase } from 'react-icons/hi';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900 text-white pt-12 pb-28 lg:pt-20 lg:pb-36">
      {/* Animated background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" style={{ animationDelay: '3s', animation: 'float 8s ease-in-out infinite' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-emerald-700/40 border border-emerald-500/20 px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-emerald-200 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              Empowering Youth Across India
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Skilling Youth.{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                Building Careers.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-emerald-100/80 max-w-2xl font-normal leading-relaxed">
              GTT Foundation empowers underserved communities through structured skilling, 
              industry-partnered training, and end-to-end placement support — transforming 
              potential into sustainable livelihoods.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                to="/donate"
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-900 font-extrabold px-7 py-3.5 rounded-xl text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <HiHeart className="text-rose-600 text-xl group-hover:scale-110 transition" />
                Support Our Mission
              </Link>
              <Link
                to="/programs"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-7 py-3.5 rounded-xl text-base backdrop-blur-sm transition-all hover:border-white/30"
              >
                Explore Programs
                <HiArrowRight className="group-hover:translate-x-0.5 transition" />
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-emerald-700/40 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-emerald-200/80 font-medium">
              {[
                '100% Tax Deductible (80G)',
                'Transparent Fund Utilization',
                'Verified Impact Reports',
              ].map((text) => (
                <div key={text} className="flex items-center gap-1.5">
                  <HiCheckCircle className="text-emerald-400 text-base flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Mission Card */}
          <div className="lg:col-span-5 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur opacity-25 animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="relative glass-dark rounded-2xl overflow-hidden shadow-2xl p-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl shadow-md shadow-emerald-600/30">
                    <HiAcademicCap className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white leading-tight text-lg">GTT Foundation</p>
                    <p className="text-xs text-emerald-400 font-semibold">Registered Non-Profit • Pune, India</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { Icon: HiAcademicCap, title: 'Skilling', sub: 'Industry-relevant courses in IT, retail, BFSI & manufacturing', color: 'border-emerald-500/30 hover:border-emerald-400/60', iconBg: 'text-emerald-400 bg-emerald-500/10' },
                    { Icon: HiClipboardCheck, title: 'Training', sub: 'Soft skills, digital literacy & domain-specific upskilling', color: 'border-teal-500/30 hover:border-teal-400/60', iconBg: 'text-teal-400 bg-teal-500/10' },
                    { Icon: HiBriefcase, title: 'Placement', sub: '200+ corporate partners for meaningful employment', color: 'border-cyan-500/30 hover:border-cyan-400/60', iconBg: 'text-cyan-400 bg-cyan-500/10' },
                  ].map((row) => (
                    <div
                      key={row.title}
                      className={`flex items-center gap-3.5 bg-white/5 border ${row.color} rounded-xl p-3.5 transition-all duration-300 group cursor-default`}
                    >
                      <div className={`w-10 h-10 rounded-xl ${row.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <row.Icon className="text-xl" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{row.title}</p>
                        <p className="text-xs text-slate-400 leading-snug">{row.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial quote */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-xs text-emerald-200/90 italic leading-relaxed">
                    "GTT Foundation's skilling program helped me land my first IT job. From a small village to a Pune tech company — they made it possible."
                  </p>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-2">— Priya K., Program Graduate '25</p>
                </div>

                <Link
                  to="/about"
                  className="block w-full text-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20"
                >
                  Discover Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
