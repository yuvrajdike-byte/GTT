import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiHeart, HiCheckCircle, HiAcademicCap, HiClipboardCheck, HiBriefcase } from 'react-icons/hi';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-slate-800">
      {/* Subtle clean grid texture — no glowing blur orbs */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-[#ec4d25]/15 border border-[#ec4d25]/30 px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-[#f78c72]">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ec4d25]" />
              </span>
              Empowering Youth Across India
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Skilling Youth.{' '}
              <span className="text-[#ec4d25]">
                Building Careers.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              GTT Foundation empowers underserved communities through structured skilling, 
              industry-partnered training, and end-to-end placement support — transforming 
              potential into sustainable livelihoods.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                to="/donate"
                className="group flex items-center justify-center gap-2 bg-[#ec4d25] hover:bg-[#d73e16] active:bg-[#b8310e] text-white font-extrabold px-7 py-3.5 rounded-xl text-base shadow-md hover:shadow-lg transition-all"
              >
                <HiHeart className="text-white text-xl group-hover:scale-110 transition-transform" />
                Support Our Mission
              </Link>
              <Link
                to="/programs"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-7 py-3.5 rounded-xl text-base backdrop-blur-sm transition-all hover:border-white/30"
              >
                Explore Programs
                <HiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
              {[
                '100% Tax Deductible (80G)',
                'Transparent Fund Utilization',
                'Verified Impact Reports',
              ].map((text) => (
                <div key={text} className="flex items-center gap-1.5">
                  <HiCheckCircle className="text-[#ec4d25] text-base flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Mission Card (Zero glow halo) */}
          <div className="lg:col-span-5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl p-7 space-y-5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#ec4d25] flex items-center justify-center text-white text-2xl shadow-sm">
                    <HiAcademicCap className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white leading-tight text-lg">GTT Foundation</p>
                    <p className="text-xs text-[#f78c72] font-semibold">Registered Non-Profit • Pune, India</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { Icon: HiAcademicCap, title: 'Skilling', sub: 'Industry-relevant courses in IT, retail, BFSI & manufacturing' },
                    { Icon: HiClipboardCheck, title: 'Training', sub: 'Soft skills, digital literacy & domain-specific upskilling' },
                    { Icon: HiBriefcase, title: 'Placement', sub: '200+ corporate partners for meaningful employment' },
                  ].map((row) => (
                    <div
                      key={row.title}
                      className="flex items-center gap-3.5 bg-white/5 border border-slate-700 hover:border-[#ec4d25]/50 rounded-xl p-3.5 transition-colors group cursor-default"
                    >
                      <div className="w-10 h-10 rounded-xl text-[#ec4d25] bg-[#ec4d25]/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
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
                <div className="bg-slate-900/60 border border-slate-700/70 rounded-xl p-4">
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "GTT Foundation's skilling program helped me land my first IT job. From a small village to a Pune tech company — they made it possible."
                  </p>
                  <p className="text-[11px] text-[#f78c72] font-semibold mt-2">— Priya K., Program Graduate '25</p>
                </div>

                <Link
                  to="/about"
                  className="block w-full text-center bg-[#ec4d25] hover:bg-[#d73e16] active:bg-[#b8310e] text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-sm"
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
