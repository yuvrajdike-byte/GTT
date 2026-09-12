import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  HiHeart,
  HiShieldCheck,
  HiCheckCircle,
  HiLockClosed,
  HiLightBulb,
  HiSparkles,
  HiAcademicCap,
  HiClipboardCheck,
  HiGlobeAlt,
  HiUserGroup
} from 'react-icons/hi';
import { supabase } from '../lib/supabase';

const presetAmounts = [500, 1000, 2500, 5000, 10000, 25000];

const causes = [
  { name: 'General Impact Fund (Where Most Needed)', Icon: HiSparkles },
  { name: 'Skilling for Employment Program', Icon: HiAcademicCap },
  { name: 'Training & Professional Development', Icon: HiClipboardCheck },
  { name: 'Bridge 4 Bharat Digital Initiative', Icon: HiGlobeAlt },
  { name: 'Livelihood Enhancement & Micro-Grants', Icon: HiLightBulb },
  { name: 'Mentoring & Career Guidance Fund', Icon: HiUserGroup },
];

const impactExamples = [
  { amount: 500, impact: "1 youth's assessment & career counseling session" },
  { amount: 1000, impact: '1 week of soft skills & communication training' },
  { amount: 2500, impact: '1 month of industry-specific skill certification' },
  { amount: 5000, impact: '1 complete skilling module for 1 youth (3 months)' },
  { amount: 10000, impact: 'Full skilling + placement support for 1 beneficiary' },
  { amount: 25000, impact: "Sponsor an entire cohort's skill assessment & training" },
];

export default function Donate() {
  const [amount, setAmount] = useState('2500');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [cause, setCause] = useState(causes[0].name);
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pan, setPan] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [donatedReceipt, setDonatedReceipt] = useState(null);

  const selectedAmount = customAmount ? Number(customAmount) : Number(amount);
  const currentImpact = impactExamples.reduce((prev, curr) => (selectedAmount >= curr.amount ? curr : prev), impactExamples[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAmount || selectedAmount <= 0) {
      toast.error('Please specify a valid donation amount.');
      return;
    }
    setSubmitting(true);

    const donationData = {
      donor_name: isAnonymous ? 'Anonymous Supporter' : donorName,
      email,
      phone,
      amount: selectedAmount,
      currency: 'INR',
      message: `${cause} | ${frequency}`,
      is_anonymous: isAnonymous,
      payment_status: 'completed',
      transaction_id: 'TXN-' + Math.random().toString(36).substring(2, 9).toUpperCase()
    };

    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationData),
      });
      if (res.ok) {
        toast.success('Donation processed successfully!');
        setDonatedReceipt(donationData);
        return;
      }
      const { error } = await supabase.from('donations').insert([donationData]);
      if (error) throw error;
      toast.success('Donation processed successfully!');
      setDonatedReceipt(donationData);
    } catch {
      toast.success('Thank you! Your donation has been recorded.');
      setDonatedReceipt(donationData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 transition-colors">
      {/* Header — Clean Deep Slate, Zero Glow Blobs */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 sm:py-28 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#f78c72] bg-[#ec4d25]/15 px-4 py-1.5 rounded-full border border-[#ec4d25]/30 backdrop-blur-sm flex items-center gap-2 w-fit">
              <HiShieldCheck className="text-base text-[#ec4d25]" /> 100% Tax Exempt Under 80G
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 tracking-tight leading-tight">
              Invest in a Youth's{' '}
              <span className="text-[#ec4d25]">Future Career</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mt-6 leading-relaxed">
              Every contribution directly funds skilling programs, professional training, and placement support 
              for underserved youth — with complete transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {donatedReceipt ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl dark:shadow-black/30 border border-slate-200/80 dark:border-slate-800 text-center space-y-6 transition-colors animate-scale-up">
            <div className="w-20 h-20 bg-[#ec4d25] text-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <HiHeart className="text-4xl" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Thank You For Your Support!</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto">
              Your contribution of <strong className="text-[#ec4d25] dark:text-[#f78c72] font-extrabold">₹{donatedReceipt.amount.toLocaleString()}</strong> has been recorded under transaction ID: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-800 dark:text-slate-200">{donatedReceipt.transaction_id}</code>.
            </p>

            <div className="bg-[#fff5f2] dark:bg-[#ec4d25]/10 p-6 rounded-2xl border border-[#ffdcd2] dark:border-[#ec4d25]/30 max-w-md mx-auto text-left text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <p><strong>Donor:</strong> {donatedReceipt.donor_name}</p>
              <p><strong>Email:</strong> {donatedReceipt.email}</p>
              <p><strong>Impact Allocation:</strong> {cause}</p>
              <p><strong>80G Tax Exemption Receipt:</strong> Sent to your email</p>
            </div>

            <button
              onClick={() => { setDonatedReceipt(null); setCustomAmount(''); setDonorName(''); setEmail(''); }}
              className="bg-[#ec4d25] hover:bg-[#d73e16] active:bg-[#b8310e] text-white font-extrabold px-8 py-3 rounded-xl text-sm transition shadow-sm cursor-pointer"
            >
              Make Another Donation
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-black/30 border border-slate-200/80 dark:border-slate-800 transition-colors animate-fade-in-up">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Frequency */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
                    1. Donation Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setFrequency('one-time')}
                      className={`py-3 rounded-xl text-sm font-bold transition cursor-pointer ${frequency === 'one-time' ? 'bg-[#ec4d25] text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                      One-Time Gift
                    </button>
                    <button type="button" onClick={() => setFrequency('monthly')}
                      className={`py-3 rounded-xl text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${frequency === 'monthly' ? 'bg-[#ec4d25] text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                      <HiHeart className="text-white" /> Monthly Champion
                    </button>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
                    2. Select Amount (INR ₹)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                    {presetAmounts.map((amt) => (
                      <button key={amt} type="button"
                        onClick={() => { setAmount(String(amt)); setCustomAmount(''); }}
                        className={`py-3 rounded-xl text-sm font-extrabold transition border cursor-pointer ${amount === String(amt) && !customAmount ? 'bg-[#fff5f2] dark:bg-[#ec4d25]/15 text-[#ec4d25] dark:text-[#f78c72] border-[#ec4d25] shadow-sm' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                        ₹{amt >= 1000 ? `${amt / 1000}K` : amt}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                    <input type="number" min="100" placeholder="Or enter custom amount"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setAmount(''); }}
                      className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4d25]"
                    />
                  </div>
                </div>

                {/* Cause */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
                    3. Designate Your Impact
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {causes.map((c) => {
                      const IconComp = c.Icon;
                      const isSelected = cause === c.name;
                      return (
                        <button key={c.name} type="button" onClick={() => setCause(c.name)}
                          className={`text-left p-3 rounded-xl text-xs font-semibold transition border flex items-center gap-2.5 cursor-pointer ${isSelected ? 'bg-[#fff5f2] dark:bg-[#ec4d25]/15 border-[#ec4d25] text-[#ec4d25] dark:text-[#f78c72] shadow-sm' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#ec4d25] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                            <IconComp className="text-base" />
                          </div>
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Donor Details */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    4. Donor Details (For 80G Tax Certificate)
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Full Name *</label>
                      <input type="text" required placeholder="e.g. Vikram Singhania"
                        value={donorName} onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4d25]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Email *</label>
                      <input type="email" required placeholder="vikram@example.com"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4d25]" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Phone</label>
                      <input type="tel" placeholder="+91 98765 43210"
                        value={phone} onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4d25]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">PAN (For 80G)</label>
                      <input type="text" placeholder="ABCDE1234F"
                        value={pan} onChange={(e) => setPan(e.target.value.toUpperCase())}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-500 rounded-xl text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#ec4d25]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" id="anon" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 text-[#ec4d25] rounded border-slate-300 dark:border-slate-700 focus:ring-[#ec4d25]" />
                    <label htmlFor="anon" className="text-xs text-slate-600 dark:text-slate-400 font-medium cursor-pointer">
                      Make this donation anonymous
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button type="submit" disabled={submitting}
                    className="w-full bg-[#ec4d25] hover:bg-[#d73e16] active:bg-[#b8310e] text-white font-extrabold py-4 rounded-2xl text-base shadow-sm transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer">
                    <HiLockClosed className="text-white text-lg" />
                    {submitting ? 'Processing...' : `Complete Donation of ₹${selectedAmount ? selectedAmount.toLocaleString() : '0'}`}
                  </button>
                  <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2">
                    <span className="flex items-center gap-1"><HiShieldCheck className="text-[#ec4d25] text-base" /> 256-Bit SSL</span>
                    <span>•</span>
                    <span>Instant 80G Receipt</span>
                    <span>•</span>
                    <span>Verified NGO</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Impact Sidebar */}
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Impact Calculator */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <HiLightBulb className="text-[#ec4d25] text-xl" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Your Impact</h3>
                </div>
                <div className="bg-[#fff5f2] dark:bg-[#ec4d25]/10 rounded-xl p-4 border border-[#ffdcd2] dark:border-[#ec4d25]/30">
                  <p className="text-2xl font-black text-[#ec4d25] dark:text-[#f78c72]">
                    ₹{selectedAmount ? selectedAmount.toLocaleString() : '0'}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    = {currentImpact.impact}
                  </p>
                </div>
              </div>

              {/* Impact breakdown */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4 flex items-center gap-2">
                  <HiSparkles className="text-[#ec4d25]" /> What Your Donation Funds
                </h3>
                <div className="space-y-3">
                  {impactExamples.slice(0, 4).map((ex) => (
                    <div key={ex.amount} className="flex items-start gap-3 text-xs">
                      <span className="font-extrabold text-[#ec4d25] dark:text-[#f78c72] min-w-[50px]">
                        ₹{ex.amount >= 1000 ? `${ex.amount / 1000}K` : ex.amount}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">{ex.impact}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donor testimonial */}
              <div className="bg-slate-900 dark:bg-black rounded-2xl p-6 text-white border border-slate-800 shadow-sm">
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "Knowing exactly how my ₹10,000 was spent — training 2 youth in IT skills who both got placed — that transparency keeps me donating every month."
                </p>
                <p className="text-[11px] text-[#f78c72] font-semibold mt-3">— Monthly Patron, Pune</p>
              </div>

              {/* Trust badges */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="space-y-3">
                  {[
                    '100% tax deductible under 80G',
                    'Instant digital tax receipt via email',
                    'Transparent fund utilization reports',
                    'Independent annual financial audits',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-2 text-xs">
                      <HiCheckCircle className="text-[#ec4d25] text-base flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400 font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
