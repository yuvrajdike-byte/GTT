import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker, HiHeart, HiArrowRight, HiCheckCircle, HiAcademicCap } from 'react-icons/hi';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      toast.success('Thank you for subscribing to our newsletter!');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-300 relative overflow-hidden transition-colors">
      {/* Gradient top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-lg">Stay Updated on Our Impact</h3>
              <p className="text-slate-400 text-sm mt-1">Get monthly updates on programs, events, and success stories.</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition flex-shrink-0 flex items-center gap-1.5"
              >
                Subscribe <HiArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition">
                <HiAcademicCap className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                GTT<span className="text-emerald-400"> Foundation</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              GTT Foundation is on a mission to empower underserved segments of society in their pursuit 
              of sustainable livelihoods and enhanced employability through skilling, training, and placement initiatives.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {[FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-emerald-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300">
                  <Icon size={14} />
                </a>
              ))}
            </div>

            {/* Registration info */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['12A Certified', '80G Tax Exempt', 'CSR-1 Registered'].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/50">
                  <HiCheckCircle className="text-xs" /> {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/about', text: 'About Our Mission' },
                { to: '/programs', text: 'Flagship Programs' },
                { to: '/events', text: 'Upcoming Events' },
                { to: '/blog', text: 'Impact Stories' },
                { to: '/volunteer', text: 'Volunteer With Us' },
                { to: '/donate', text: 'Donate Now' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                    <HiArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Focus Areas */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-teal-500 rounded-full" />
              Focus Areas
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Skilling for Employment</li>
              <li>Professional Training</li>
              <li>Livelihood Enhancement</li>
              <li>Campus to Corporate Placement</li>
              <li>Mentoring & Career Guidance</li>
              <li>Bridge 4 Bharat</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-cyan-500 rounded-full" />
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-slate-400">
                <HiLocationMarker className="text-emerald-400 text-lg flex-shrink-0 mt-0.5" />
                <span>Pune, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <HiMail className="text-emerald-400 text-lg flex-shrink-0" />
                <span>info@gttfoundation.org</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <HiPhone className="text-emerald-400 text-lg flex-shrink-0" />
                <span>+91 98346 71803</span>
              </li>
            </ul>
            <div className="mt-5">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 text-xs font-bold bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 px-4 py-2 rounded-lg uppercase tracking-wider transition"
              >
                <HiHeart className="text-rose-400" />
                Tax-Exempt Donations (80G)
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GTT Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition">Transparency Reports</a>
            <a href="#" className="hover:text-slate-300 transition">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
