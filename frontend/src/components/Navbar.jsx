import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX, HiHeart, HiShieldCheck, HiUser, HiAcademicCap } from 'react-icons/hi';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const baseNavLinks = [
  { name: 'Programs', path: '/programs' },
  { name: 'Events', path: '/events' },
  { name: 'Volunteer', path: '/volunteer' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navLinks = user
    ? [...baseNavLinks, { name: 'Dashboard', path: '/dashboard' }]
    : baseNavLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-50 transition-all border-b ${
        scrolled
          ? 'border-slate-200/80 dark:border-slate-800 shadow-sm shadow-slate-900/5 dark:shadow-black/20'
          : 'border-slate-100 dark:border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#ec4d25] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
              <HiAcademicCap className="text-2xl text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-[#ec4d25] transition-colors">
                GTT<span className="text-[#ec4d25]"> Foundation</span>
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#ec4d25] -mt-1">
                Empowering Communities
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors py-1 relative ${
                    active
                      ? 'text-[#ec4d25] dark:text-[#f78c72]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#ec4d25] dark:hover:text-[#f78c72]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ec4d25] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-[#ec4d25] dark:hover:text-[#f78c72] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <MdOutlineLightMode size={22} /> : <MdOutlineDarkMode size={22} />}
            </button>

            {user ? (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-[#ec4d25] dark:text-[#f78c72] bg-[#fff5f2] dark:bg-[#ec4d25]/10 hover:bg-[#ffede8] dark:hover:bg-[#ec4d25]/20 rounded-xl transition border border-[#ffdcd2] dark:border-[#ec4d25]/30"
                >
                  <HiShieldCheck className="text-lg text-[#ec4d25] dark:text-[#f78c72]" />
                  Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#ec4d25] dark:hover:text-[#f78c72] transition"
              >
                <HiUser className="text-base text-slate-400 dark:text-slate-500" />
                Staff Login
              </Link>
            )}

            <Link
              to="/donate"
              className="flex items-center gap-2 bg-[#ec4d25] hover:bg-[#d73e16] active:bg-[#b8310e] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:shadow transition-all"
            >
              <HiHeart className="text-white text-base" />
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <MdOutlineLightMode size={22} /> : <MdOutlineDarkMode size={22} />}
            </button>
            <Link
              to="/donate"
              className="flex items-center gap-1 bg-[#ec4d25] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm"
            >
              <HiHeart className="text-white" />
              Donate
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none"
              aria-label="Toggle Menu"
            >
              {open ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="lg:hidden py-4 border-t border-slate-100 dark:border-slate-800 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  pathname === link.path
                    ? 'bg-[#fff5f2] dark:bg-[#ec4d25]/10 text-[#ec4d25] dark:text-[#f78c72] font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2 space-y-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#fff5f2] dark:bg-[#ec4d25]/10 text-[#ec4d25] dark:text-[#f78c72]"
                  >
                    <HiShieldCheck className="text-lg text-[#ec4d25] dark:text-[#f78c72]" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-semibold text-rose-600 dark:text-rose-400"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <HiUser />
                  Staff Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
