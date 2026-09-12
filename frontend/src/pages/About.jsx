import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiSparkles,
  HiGlobeAlt,
  HiAcademicCap,
  HiBriefcase,
  HiClipboardCheck,
  HiArrowRight,
  HiHeart,
  HiShieldCheck,
  HiScale,
  HiUserGroup,
} from 'react-icons/hi';

const milestones = [
  { year: '2018', event: 'GTT Foundation registered as a dedicated non-profit entity in Pune.' },
  { year: '2020', event: 'Launched digital skilling initiatives during the pandemic, reaching 10,000+ youth remotely.' },
  { year: '2022', event: 'Crossed 15,000 placements across IT, retail, BFSI, and manufacturing sectors.' },
  { year: '2024', event: 'Expanded Bridge 4 Bharat rural livelihood programs across 5 states.' },
  { year: '2026', event: 'Targeting 100,000 empowered youth with expanded CSR partnerships.' },
];

const values = [
  {
    title: 'Empathy First',
    desc: 'Understanding the lived realities of underserved youth and crafting pathways that respect their aspirations.',
    Icon: HiHeart,
  },
  {
    title: 'Excellence in Training',
    desc: 'Delivering world-class, industry-certified curricula through expert trainers and practical workshops.',
    Icon: HiAcademicCap,
  },
  {
    title: 'Uncompromised Integrity',
    desc: '100% transparency in fund utilization, audited metrics, and open reporting to donors and stakeholders.',
    Icon: HiShieldCheck,
  },
  {
    title: 'Equity & Inclusion',
    desc: 'Ensuring affirmative action for women, rural youth, and historically disadvantaged communities.',
    Icon: HiScale,
  },
];

const team = [
  { name: 'Dr. Ganesh Natarajan', role: 'Founder & Trustee', Icon: HiUserGroup },
  { name: 'Dr. Uma Ganesh', role: 'Trustee & Educationalist', Icon: HiAcademicCap },
  { name: 'Head of Skilling', role: 'Curriculum Design & Trainer Development', Icon: HiAcademicCap },
  { name: 'Head of Placements', role: 'Corporate Partnerships & Hiring', Icon: HiBriefcase },
];

export default function About() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      {/* Header Banner — Clean Deep Slate, No Glowing Orbs */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 sm:py-28 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#f78c72] bg-[#ec4d25]/15 px-4 py-1.5 rounded-full border border-[#ec4d25]/30">
              About Our Organization
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 tracking-tight leading-tight">
              Empowering Youth Through{' '}
              <span className="text-[#ec4d25]">
                Skills & Opportunities
              </span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mt-6 leading-relaxed">
              GTT Foundation is a registered non-profit organization dedicated to creating sustainable livelihoods 
              for underprivileged youth, women, and marginalized communities across India.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-xl dark:shadow-black/30 border border-slate-200/80 dark:border-slate-800 transition-colors animate-fade-in-up">
            <div className="w-12 h-12 rounded-2xl bg-[#fff5f2] dark:bg-[#ec4d25]/15 text-[#ec4d25] border border-[#ffdcd2] dark:border-[#ec4d25]/30 flex items-center justify-center mb-6">
              <HiSparkles className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              An India where every young individual, regardless of their socio-economic background, has access 
              to high-quality vocational skilling, professional mentoring, and pathways to dignified, formal-sector employment.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-xl dark:shadow-black/30 border border-slate-200/80 dark:border-slate-800 transition-colors animate-fade-in-up" style={{ animationDelay: '120ms' }}>
            <div className="w-12 h-12 rounded-2xl bg-[#fff5f2] dark:bg-[#ec4d25]/15 text-[#ec4d25] border border-[#ffdcd2] dark:border-[#ec4d25]/30 flex items-center justify-center mb-6">
              <HiGlobeAlt className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              To bridge the critical divide between education and industry requirements by delivering market-relevant skilling, 
              fostering entrepreneurship, and securing gainful employment for 100,000+ youth by 2030.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones / Journey */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#ec4d25] dark:text-[#f78c72] bg-[#fff5f2] dark:bg-[#ec4d25]/10 border border-[#ffdcd2] dark:border-[#ec4d25]/20 px-3.5 py-1.5 rounded-full">
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Key Milestones
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#ec4d25]/20" />
          
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`relative flex items-start gap-6 sm:gap-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} animate-fade-in-up`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'} hidden sm:block`}>
                  <div className={`bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition inline-block max-w-sm ${i % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{m.event}</p>
                  </div>
                </div>
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#ec4d25] flex items-center justify-center text-white font-black text-sm shadow-sm">
                    {m.year}
                  </div>
                </div>
                <div className="flex-1 sm:hidden">
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{m.event}</p>
                  </div>
                </div>
                <div className="flex-1 hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#ec4d25] dark:text-[#f78c72] bg-[#fff5f2] dark:bg-[#ec4d25]/10 border border-[#ffdcd2] dark:border-[#ec4d25]/20 px-3.5 py-1.5 rounded-full">
              Our Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
              Values That Drive Every Action
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#ec4d25]/40 hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#fff5f2] dark:bg-[#ec4d25]/15 text-[#ec4d25] border border-[#ffdcd2] dark:border-[#ec4d25]/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <v.Icon className="text-2xl" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 group-hover:text-[#ec4d25] transition-colors">{v.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#ec4d25] dark:text-[#f78c72] bg-[#fff5f2] dark:bg-[#ec4d25]/10 border border-[#ffdcd2] dark:border-[#ec4d25]/20 px-3.5 py-1.5 rounded-full">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
              The People Behind the Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base">
              Passionate professionals combining corporate expertise with deep grassroots commitment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 text-center hover:shadow-md hover:border-[#ec4d25]/40 hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#ec4d25] text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform shadow-sm">
                  <member.Icon className="text-2xl text-white" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{member.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#ec4d25] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">Want to collaborate with us?</h2>
          <p className="text-white/90 text-sm max-w-xl mx-auto mb-8">
            We actively partner with CSR programs, corporates, universities, and international foundations.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#ec4d25] font-extrabold px-6 py-3 rounded-xl text-sm transition shadow-sm hover:bg-slate-50 active:scale-[0.98]"
          >
            Connect With Our Team <HiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
