import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import {
  HiArrowRight,
  HiHeart,
  HiCheckCircle,
  HiSparkles,
  HiAcademicCap,
  HiBriefcase,
  HiLightBulb,
  HiSearch,
  HiBookOpen,
  HiUserGroup,
  HiUser,
} from 'react-icons/hi';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch('/api/programs')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPrograms(data.slice(0, 3));
        } else {
          supabase.from('programs').select('*').limit(3).then(({ data }) => {
            if (data && data.length > 0) setPrograms(data);
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      <Hero />
      <StatsBar />

      {/* GTT Core Pillars — Skilling, Training, Placement */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              Our Flagship Model
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
              From Skill Building to Sustainable Careers
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 text-base sm:text-lg">
              Our integrated 4-step model ensures every participant moves from assessment to meaningful employment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: HiAcademicCap,
                title: 'Skilling for Employment',
                desc: 'Industry-relevant courses in IT, retail, healthcare, BFSI, and manufacturing sectors — powered by expert trainers and modern curricula.',
                points: ['Market-ready skill certifications', 'Digital literacy & coding'],
                color: 'from-emerald-500 to-emerald-600',
                border: 'hover:border-emerald-300 dark:hover:border-emerald-700',
                check: 'text-emerald-500',
              },
              {
                icon: HiLightBulb,
                title: 'Training & Mentoring',
                desc: 'Comprehensive soft skills, communication, professional etiquette, and one-on-one mentoring from industry leaders across 200+ companies.',
                points: ['1:1 career mentoring', 'Soft skills & interview prep'],
                color: 'from-teal-500 to-teal-600',
                border: 'hover:border-teal-300 dark:hover:border-teal-700',
                check: 'text-teal-500',
              },
              {
                icon: HiBriefcase,
                title: 'Placement & Livelihood',
                desc: 'End-to-end placement support connecting trained candidates with 200+ corporate partners for meaningful, sustainable employment.',
                points: ['200+ hiring partners', 'Livelihood micro-grants'],
                color: 'from-cyan-500 to-cyan-600',
                border: 'hover:border-cyan-300 dark:hover:border-cyan-700',
                check: 'text-cyan-500',
              },
            ].map((pillar, i) => (
              <div
                key={pillar.title}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-black/30 ${pillar.border} hover:-translate-y-1.5 transition-all duration-300 group animate-fade-in-up`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition shadow-md`}>
                  <pillar.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">{pillar.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{pillar.desc}</p>
                <ul className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {pillar.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <HiCheckCircle className={`${pillar.check} text-base flex-shrink-0`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
              Your Journey to a Sustainable Career
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-20" />

            {[
              { step: '01', title: 'Assessment', desc: 'Evaluate aptitude, interests, and existing skill level', Icon: HiSearch },
              { step: '02', title: 'Skill Building', desc: 'Industry-aligned courses with hands-on practice', Icon: HiBookOpen },
              { step: '03', title: 'Mentoring', desc: 'Dedicated career guidance from industry professionals', Icon: HiUserGroup },
              { step: '04', title: 'Placement', desc: 'Direct connections with 200+ hiring partners', Icon: HiBriefcase },
            ].map((item, i) => (
              <div
                key={item.step}
                className="relative text-center group animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:shadow-emerald-500/30 transition-all duration-300">
                  <item.Icon className="text-3xl text-white" />
                </div>
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Step {item.step}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-1.5">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                Active Initiatives
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
                Featured Programs
              </h2>
            </div>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition group"
            >
              View All Programs <HiArrowRight className="group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          {programs.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors">
              <p className="text-slate-900 dark:text-white font-bold mb-1">Programs coming soon</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Our program catalogue is being prepared. Check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((program, i) => (
                <div
                  key={program.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-black/30 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={program.image_url}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {program.category || 'General'}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                        {program.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                        {program.target_beneficiaries || 'Community Project'}
                      </span>
                      <Link
                        to="/donate"
                        className="text-xs font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-1"
                      >
                        Support <HiArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
              Real Lives, Real Transformations
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "After completing the GTT Skilling program, I got placed at a leading IT company in Pune. My family's life has completely changed.",
                name: 'Priya Kamble',
                role: 'Software Trainee, TCS',
                program: 'Skilling for Employment',
                initials: 'PK',
              },
              {
                quote: "The mentoring sessions gave me confidence I never had. My mentor helped me prepare for interviews and negotiate my first salary.",
                name: 'Rahul Jadhav',
                role: 'Retail Associate, Reliance',
                program: 'Mentoring & Guidance',
                initials: 'RJ',
              },
              {
                quote: "Bridge 4 Bharat brought digital skills training right to our village. Now I run a small e-commerce business from home.",
                name: 'Sunita Patil',
                role: 'Micro-Entrepreneur',
                program: 'Bridge 4 Bharat',
                initials: 'SP',
              },
            ].map((story, i) => (
              <div
                key={story.name}
                className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-7 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-sm flex items-center justify-center mb-5 shadow-md shadow-emerald-600/20">
                  {story.initials}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic mb-6">
                  "{story.quote}"
                </p>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{story.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{story.role}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    {story.program}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                Why Partner With Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight leading-tight">
                Trust Built Through Transparency & Measured Outcomes
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-5 leading-relaxed">
                Every rupee is accounted for, every program is measured, and every outcome is published.
              </p>
              <div className="grid sm:grid-cols-2 gap-5 mt-8">
                {[
                  '100% transparent fund utilization',
                  'Independent annual financial audits',
                  'Milestone-based fund disbursement',
                  'Published impact metrics & data',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <HiCheckCircle className="text-emerald-500 text-xl flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug">{point}</p>
                  </div>
                ))}
              </div>
              <div className="pt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition shadow-md shadow-emerald-600/20 group"
                >
                  Read Our Full Story <HiArrowRight className="group-hover:translate-x-0.5 transition" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { value: '100%', label: 'Funds to programs', sub: 'Admin costs covered by patrons' },
                { value: '12A & 80G', label: 'Tax certified', sub: 'Government registered & audited' },
                { value: '24h', label: 'Response time', sub: 'For partners and donor queries' },
                { value: '2030', label: 'Mission horizon', sub: 'Empowering 100,000 families' },
              ].map((card, i) => (
                <div
                  key={card.label}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                    {card.value}
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1.5">{card.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <HiSparkles className="text-emerald-200 text-4xl mx-auto mb-5" />
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6 leading-tight">
            Ready to be the catalyst for lasting change?
          </h2>
          <p className="text-emerald-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Whether you donate, volunteer your expertise, or partner with us as an institution — your support transforms lives every single day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-white text-slate-900 font-extrabold px-8 py-4 rounded-xl text-base shadow-xl hover:bg-slate-100 hover:scale-105 active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <HiHeart className="text-rose-600 text-xl" />
              Make a Donation
            </Link>
            <Link
              to="/volunteer"
              className="bg-emerald-800/60 hover:bg-emerald-800/80 border border-emerald-400/40 text-white font-bold px-8 py-4 rounded-xl text-base transition"
            >
              Join as a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
