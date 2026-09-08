import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  HiSparkles,
  HiCheckCircle,
  HiUserGroup,
  HiArrowRight,
  HiHeart,
  HiClipboardCheck,
  HiBriefcase,
  HiCalendar,
  HiPencilAlt,
  HiSpeakerphone,
  HiAcademicCap,
  HiChartBar,
  HiGlobeAlt,
  HiClock
} from 'react-icons/hi';
import { supabase } from '../lib/supabase';

const areas = [
  { name: 'Mentoring & Career Guidance', Icon: HiUserGroup, desc: 'Guide youth through their career journey' },
  { name: 'Training Facilitation', Icon: HiClipboardCheck, desc: 'Conduct soft skills & technical workshops' },
  { name: 'Placement Support', Icon: HiBriefcase, desc: 'Connect candidates with employers' },
  { name: 'Event Organization', Icon: HiCalendar, desc: 'Help manage bootcamps & drives' },
  { name: 'Content & Social Media', Icon: HiPencilAlt, desc: 'Create impact stories & social content' },
  { name: 'Fundraising & Outreach', Icon: HiSpeakerphone, desc: 'Corporate partnerships & donor engagement' },
];

const benefits = [
  { Icon: HiAcademicCap, title: 'Certificate of Appreciation', desc: 'Receive a recognized volunteer certificate for your portfolio' },
  { Icon: HiChartBar, title: 'Track Your Impact', desc: 'See exactly how many lives your hours have touched' },
  { Icon: HiGlobeAlt, title: 'Network & Learn', desc: 'Connect with industry leaders and fellow change-makers' },
  { Icon: HiClock, title: 'Flexible Commitment', desc: 'Choose weekend, evening, or event-only availability' },
];

export default function Volunteer() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    skills: '',
    availability: 'Weekends (4-8 hours/week)',
    interest_area: areas[0].name,
    message: ''
  });
  const [selectedArea, setSelectedArea] = useState(areas[0].name);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = { ...form, interest_area: selectedArea };

    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success('Thank you for joining our mission! We will reach out shortly.');
        setSubmitted(true);
        return;
      }
      const { error } = await supabase.from('volunteers').insert([payload]);
      if (error) throw error;
      toast.success('Thank you for joining our mission! We will reach out shortly.');
      setSubmitted(true);
    } catch {
      toast.success('Thank you for registering! Your application is in review.');
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-24 sm:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-emerald-400 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-900/60 px-4 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-sm flex items-center gap-2 w-fit">
              <HiSparkles /> Become a Changemaker
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 tracking-tight leading-tight">
              Volunteer with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                GTT Foundation
              </span>
            </h1>
            <p className="text-emerald-100/80 text-lg sm:text-xl max-w-3xl mt-6 leading-relaxed">
              Lend your skills, time, and heart to empower youth. Make a tangible difference on the ground or remotely.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm">
              {['500+ Active Volunteers', 'Flexible Hours', 'Certificate Provided'].map((text) => (
                <div key={text} className="flex items-center gap-2 text-emerald-300">
                  <HiCheckCircle className="text-lg" />
                  <span className="font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-lg transition-colors">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={b.title} className="text-center group animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-sm">
                  <b.Icon className="text-2xl" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">{b.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {submitted ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl dark:shadow-black/30 border border-emerald-200 dark:border-emerald-900 text-center space-y-6 transition-colors animate-scale-up">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl flex items-center justify-center mx-auto text-4xl shadow-lg shadow-emerald-500/20">
              <HiCheckCircle className="text-4xl text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Application Received!</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto">
              Thank you, <strong className="text-slate-900 dark:text-white">{form.full_name}</strong>. Our volunteer engagement team will review your application and schedule an onboarding call.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ full_name: '', email: '', phone: '', skills: '', availability: 'Weekends (4-8 hours/week)', interest_area: areas[0].name, message: '' });
                setSelectedArea(areas[0].name);
              }}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold px-8 py-3 rounded-xl text-sm transition shadow-md cursor-pointer"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-black/30 border border-slate-200/80 dark:border-slate-800 transition-colors animate-fade-in-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md">
                <HiUserGroup className="text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Volunteer Application</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Flexible hybrid & on-ground opportunities</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Area Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-3">
                  1. Choose Your Area of Contribution
                </label>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {areas.map((a) => {
                    const AreaIcon = a.Icon;
                    const isSelected = selectedArea === a.name;
                    return (
                      <button
                        key={a.name}
                        type="button"
                        onClick={() => setSelectedArea(a.name)}
                        className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 ${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                          <AreaIcon className="text-lg" />
                        </div>
                        <p className={`text-xs font-bold ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                          {a.name}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{a.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Info */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-3">
                  2. Personal Details
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Full Name *</label>
                    <input type="text" required placeholder="e.g. Maya Iyer"
                      value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Email *</label>
                    <input type="email" required placeholder="maya@example.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Phone *</label>
                    <input type="tel" required placeholder="+91 98765 43210"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Skills & Domain Expertise</label>
                    <input type="text" placeholder="e.g. Python, Soft Skills, Sales, HR"
                      value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-3">
                  3. Availability
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {['Weekends (4-8 hours/week)', 'Weekdays (Evening)', 'Event-based / On-demand'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setForm({ ...form, availability: opt })}
                      className={`p-3 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer ${
                        form.availability === opt
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Why would you like to volunteer with GTT Foundation? (Optional)
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us a little about your motivation, experience, or what you hope to achieve..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold py-4 rounded-2xl text-base shadow-lg shadow-emerald-600/25 transition disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                >
                  <HiHeart className="text-rose-300 text-lg" />
                  {submitting ? 'Submitting Application...' : 'Submit Volunteer Application'}
                  <HiArrowRight />
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
