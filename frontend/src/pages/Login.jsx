import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiLockClosed, HiMail, HiUser, HiArrowLeft, HiLightningBolt, HiEye, HiEyeOff, HiShieldCheck, HiCheckCircle, HiAcademicCap } from 'react-icons/hi';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('admin@gttfoundation.org');
  const [password, setPassword] = useState('Admin@123456');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password, fullName);
        toast.success('Account created! Welcome to GTT Foundation.');
        navigate('/dashboard');
      } else {
        await signIn(email, password);
        toast.success('Welcome back to GTT Foundation Dashboard!');
        navigate('/dashboard');
      }
    } catch (err) {
      console.warn(err);
      toast.error(err.message || 'Authentication error. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await signIn('admin@gttfoundation.org', 'Admin@123456');
      toast.success('Logged in with Demo Administrator account!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Could not activate demo login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Branding Panel - Desktop Only (Clean Slate, Zero Glow) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 text-white flex-col justify-between p-12 overflow-hidden border-r border-slate-800">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Top: Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-[#ec4d25] flex items-center justify-center text-white text-2xl shadow-sm group-hover:scale-105 transition-transform">
              <HiAcademicCap className="text-2xl text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight">
                GTT<span className="text-[#ec4d25]"> Foundation</span>
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#f78c72]">Admin Portal</p>
            </div>
          </Link>
        </div>

        {/* Center: Value proposition */}
        <div className="relative z-10 space-y-8 animate-fade-in-up">
          <div>
            <h2 className="text-4xl font-black tracking-tight leading-tight">
              Manage Your
              <br />
              <span className="text-[#ec4d25]">Impact Operations</span>
            </h2>
            <p className="text-slate-300 mt-4 text-base leading-relaxed max-w-md">
              Access your complete NGO command center — manage programs, events, donations, volunteers, and community communications from one unified dashboard.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: HiShieldCheck, text: 'Role-based access with Supabase Auth' },
              { icon: HiCheckCircle, text: 'Real-time data sync across all modules' },
              { icon: HiCheckCircle, text: 'CRUD operations for programs, events & blogs' },
              { icon: HiCheckCircle, text: 'Donation ledger & volunteer management' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-sm text-slate-300">
                <item.icon className="text-[#ec4d25] text-lg flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Quote */}
        <div className="relative z-10">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "The dashboard streamlined our operations — we now manage 5,000+ beneficiaries, 200+ partners, and ₹12L+ in donations effortlessly."
            </p>
            <p className="text-xs text-[#f78c72] font-semibold mt-3">— GTT Operations Team</p>
          </div>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors">
        <div className="relative z-10 w-full max-w-md mx-auto px-6 sm:px-8 py-12">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-black text-slate-900 dark:text-white">
              <div className="w-10 h-10 rounded-xl bg-[#ec4d25] flex items-center justify-center text-white text-xl shadow-sm">
                <HiAcademicCap className="text-xl text-white" />
              </div>
              <span>GTT<span className="text-[#ec4d25]"> Foundation</span></span>
            </Link>
          </div>

          <div className="animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isSignUp ? 'Create Your Account' : 'Welcome Back'}
            </h2>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              {isSignUp
                ? 'Sign up to manage GTT Foundation programs and operations'
                : 'Sign in to access your NGO command center'}
            </p>
          </div>

          <div className="mt-8 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            {/* Quick Demo Pill */}
            <div className="p-3.5 bg-[#fff5f2] dark:bg-[#ec4d25]/10 border border-[#ffdcd2] dark:border-[#ec4d25]/30 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#ec4d25] dark:text-[#f78c72] text-xs block flex items-center gap-1.5">
                  <HiLightningBolt className="text-[#ec4d25]" /> Quick Demo Access
                </span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px]">admin@gttfoundation.org</span>
              </div>
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                className="px-4 py-2 bg-[#ec4d25] hover:bg-[#d73e16] text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm text-xs disabled:opacity-50 cursor-pointer"
              >
                <HiLightningBolt />
                Demo Login
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-slate-50 dark:bg-slate-950 text-slate-400 font-medium">or sign in with credentials</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4d25] focus:border-[#ec4d25] transition dark:text-white dark:placeholder-slate-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                  <input
                    type="email"
                    required
                    placeholder="admin@gttfoundation.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4d25] focus:border-[#ec4d25] transition dark:text-white dark:placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4d25] focus:border-[#ec4d25] transition dark:text-white dark:placeholder-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                    tabIndex={-1}
                  >
                    {showPassword ? <HiEyeOff className="text-lg" /> : <HiEye className="text-lg" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ec4d25] hover:bg-[#d73e16] active:bg-[#b8310e] text-white font-extrabold py-3.5 rounded-xl text-sm shadow-sm transition-all disabled:opacity-50 mt-2 cursor-pointer"
              >
                {loading
                  ? 'Authenticating...'
                  : isSignUp
                  ? 'Create Account & Open Dashboard'
                  : 'Sign In to Dashboard'}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-bold text-[#ec4d25] dark:text-[#f78c72] hover:text-[#d73e16] transition cursor-pointer"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Need a new admin login? Sign Up'}
              </button>

              <Link to="/" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 transition">
                <HiArrowLeft /> Back to site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
