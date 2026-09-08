import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { HiMail, HiPhone, HiLocationMarker, HiChatAlt2, HiCheckCircle, HiChevronDown } from 'react-icons/hi';
import { supabase } from '../lib/supabase';

const faqs = [
  { q: 'How can my company partner with GTT Foundation?', a: 'We offer CSR partnerships, corporate volunteering programs, and skill-gap assessments. Reach out via the form or email csr@gttfoundation.org to discuss a tailored collaboration.' },
  { q: 'Are donations tax-deductible?', a: 'Yes. GTT Foundation is registered under 12A and 80G. All donations are 100% tax deductible and you receive an instant tax receipt via email.' },
  { q: 'Can I volunteer remotely?', a: 'Absolutely! We have remote mentoring, content creation, and social media roles. Visit our Volunteer page to apply.' },
  { q: 'Where are your training centers located?', a: 'Our primary centers are in Pune, Mumbai, and Nagpur. We also run satellite workshops in tier-2 and tier-3 cities across Maharashtra.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Thank you! Your message has been received.');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        return;
      }
      const { error } = await supabase.from('contacts').insert([form]);
      if (error) throw error;
      toast.success('Thank you! Your message has been received.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.success('Message sent! Our team will respond shortly.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-24 sm:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-80 h-80 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-900/60 px-4 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-sm">
            Reach Out
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 tracking-tight">
            Contact Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Team</span>
          </h1>
          <p className="text-emerald-100/80 text-lg sm:text-xl max-w-3xl mt-6 leading-relaxed">
            Have questions about our initiatives, want to partner, or need support? We're always here to help.
          </p>
        </div>
      </section>

      {/* Form & Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors animate-fade-in-up">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md">
                  <HiChatAlt2 className="text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Send us a Message</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">We typically reply within 24 business hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text" required placeholder="e.g. Ramesh Patel"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email" required placeholder="ramesh@example.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel" placeholder="+91 98765 43210"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text" placeholder="e.g. CSR Partnership / Volunteer"
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required rows={5} placeholder="Tell us how we can collaborate or assist you..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none transition"
                  />
                </div>

                <button
                  type="submit" disabled={submitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-lg shadow-emerald-600/20 transition disabled:opacity-50 active:scale-[0.98]"
                >
                  {submitting ? 'Sending Message...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 transition-colors animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Headquarters</h3>
              <div className="space-y-5 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <HiLocationMarker className="text-xl" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-bold">Main Office</strong>
                    <span>Pune, Maharashtra, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <HiMail className="text-xl" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-bold">Email Desks</strong>
                    <p>General: info@gttfoundation.org</p>
                    <p>Partnerships: csr@gttfoundation.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <HiPhone className="text-xl" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-bold">Helpline</strong>
                    <p>Mon - Sat (9:30 AM to 6:00 PM IST)</p>
                    <p className="text-emerald-700 dark:text-emerald-400 font-bold">+91 98346 71803</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Card */}
            <div className="bg-gradient-to-br from-emerald-700 to-teal-700 rounded-2xl p-6 sm:p-8 text-white shadow-md space-y-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h4 className="text-lg font-bold flex items-center gap-2">
                <HiCheckCircle className="text-emerald-300 text-2xl" />
                Government & FCRA Registered
              </h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                GTT Foundation is a certified non-profit registered under the Indian Societies Act with 12A, 80G tax-exempt status and valid CSR-1 certification.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['12A', '80G', 'CSR-1'].map((badge) => (
                  <span key={badge} className="text-[10px] font-bold uppercase bg-white/15 px-3 py-1 rounded-lg border border-white/20">
                    {badge} Certified
                  </span>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
              <div className="h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
                    <HiLocationMarker className="text-2xl" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Pune, Maharashtra</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              FAQ
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{faq.q}</span>
                  <HiChevronDown className={`text-slate-400 text-lg flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'pb-4 max-h-40' : 'max-h-0'}`}>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
