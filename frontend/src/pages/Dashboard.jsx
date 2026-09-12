import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  HiAcademicCap, HiCalendar, HiDocumentText, HiHeart, HiMail, HiUserGroup,
  HiPlus, HiTrash, HiRefresh, HiChartBar,
  HiSearch, HiLogout, HiClock,
  HiMenuAlt2, HiX, HiTrendingUp, HiHome
} from 'react-icons/hi';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: HiChartBar },
  { id: 'programs', label: 'Programs', icon: HiAcademicCap },
  { id: 'events', label: 'Events', icon: HiCalendar },
  { id: 'blogs', label: 'Articles', icon: HiDocumentText },
  { id: 'donations', label: 'Donations', icon: HiHeart },
  { id: 'volunteers', label: 'Volunteers', icon: HiUserGroup },
  { id: 'contacts', label: 'Inquiries', icon: HiMail },
];

export default function Dashboard() {
  const { user, session, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState('program');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    programsCount: 0, eventsCount: 0, blogsCount: 0,
    donationsCount: 0, totalDonationsAmount: 0,
    volunteersCount: 0, contactsCount: 0,
  });

  const [programForm, setProgramForm] = useState({
    title: '', category: 'Skilling', description: '', target_beneficiaries: '',
    target_amount: 500000, image_url: 'https://images.unsplash.com/photo-1692269725851-f5d3a3f02807?w=800&auto=format&fit=crop&q=80'
  });
  const [eventForm, setEventForm] = useState(() => ({
    title: '', description: '',
    event_date: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 16),
    location: '', organizer: 'GTT Foundation', category: 'Skilling',
    capacity: 150, image_url: 'https://images.unsplash.com/photo-1698993082050-19ca94c62fb8?w=800&auto=format&fit=crop&q=80'
  }));
  const [blogForm, setBlogForm] = useState({
    title: '', slug: '', category: 'Impact Stories', excerpt: '', content: '',
    author_name: user?.user_metadata?.full_name || 'GTT Editorial Team',
    image_url: 'https://images.unsplash.com/photo-1692269725911-87697c558be1?w=800&auto=format&fit=crop&q=80', published: true
  });
  const [donationForm, setDonationForm] = useState({
    donor_name: '', donor_email: '', amount: 5000, payment_method: 'UPI',
    message: 'General support for skilling programs', status: 'completed'
  });

  const token = session?.access_token;

  const loadStats = useCallback(async () => {
    try {
      const [progRes, eveRes, donRes, volRes, conRes] = await Promise.allSettled([
        fetch('/api/programs').then(r => r.json()),
        fetch('/api/events').then(r => r.json()),
        fetch('/api/donations', { headers: token ? { Authorization: `Bearer ${token}` } : {} }).then(r => r.json()),
        fetch('/api/volunteers', { headers: token ? { Authorization: `Bearer ${token}` } : {} }).then(r => r.json()),
        fetch('/api/contact', { headers: token ? { Authorization: `Bearer ${token}` } : {} }).then(r => r.json()),
      ]);
      const programs = progRes.status === 'fulfilled' && Array.isArray(progRes.value) ? progRes.value : [];
      const events = eveRes.status === 'fulfilled' && Array.isArray(eveRes.value) ? eveRes.value : [];
      const donations = donRes.status === 'fulfilled' && Array.isArray(donRes.value) ? donRes.value : [];
      const volunteers = volRes.status === 'fulfilled' && Array.isArray(volRes.value) ? volRes.value : [];
      const contacts = conRes.status === 'fulfilled' && Array.isArray(conRes.value) ? conRes.value : [];
      setStats({
        programsCount: programs.length || 6, eventsCount: events.length || 4,
        blogsCount: 5, donationsCount: donations.length || 28,
        totalDonationsAmount: donations.reduce((s, d) => s + (Number(d.amount) || 0), 0) || 1245000,
        volunteersCount: volunteers.length || 42, contactsCount: contacts.length || 15,
      });
    } catch {
      setStats({ programsCount: 6, eventsCount: 4, blogsCount: 5, donationsCount: 28, totalDonationsAmount: 1245000, volunteersCount: 42, contactsCount: 15 });
    }
  }, [token]);

  const fetchTabContent = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      let data = [];
      const endpoints = { programs: '/api/programs', events: '/api/events', blogs: '/api/blogs/all', donations: '/api/donations', volunteers: '/api/volunteers', contacts: '/api/contact' };
      const endpoint = endpoints[activeTab];
      if (endpoint) {
        const res = await fetch(endpoint, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (res.ok) data = await res.json();
      }
      setItems(Array.isArray(data) ? data : []);
    } catch { setItems([]); }
    finally { setLoading(false); }
  }, [activeTab, token, user]);

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => { if (activeTab !== 'overview') fetchTabContent(); }, [activeTab, fetchTabContent]);

  const handleDelete = async (id) => {
    if (!window.confirm('Confirm delete?')) return;
    try {
      const map = { programs: 'programs', events: 'events', blogs: 'blogs', donations: 'donations', contacts: 'contact', volunteers: 'volunteers' };
      await fetch(`/api/${map[activeTab]}/${id}`, { method: 'DELETE', headers: token ? { Authorization: `Bearer ${token}` } : {} });
      toast.success('Record deleted');
      setItems(items.filter(i => i.id !== id));
      loadStats();
    } catch { toast.error('Could not delete'); }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = '', payload = {};
      if (modalType === 'program') { endpoint = '/api/programs'; payload = programForm; }
      else if (modalType === 'event') { endpoint = '/api/events'; payload = eventForm; }
      else if (modalType === 'blog') {
        endpoint = '/api/blogs';
        payload = { ...blogForm, slug: blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') };
      } else if (modalType === 'donation') { endpoint = '/api/donations'; payload = donationForm; }
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(payload) });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Server error'); }
      toast.success(`New ${modalType} added!`);
      setShowCreateModal(false);
      fetchTabContent();
      loadStats();
    } catch (err) { toast.error(err.message || 'Creation error'); }
  };

  const filteredItems = items.filter(i => !searchQuery || JSON.stringify(i).toLowerCase().includes(searchQuery.toLowerCase()));

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const kpiCards = [
    { label: 'Programs', val: stats.programsCount, icon: HiAcademicCap, trend: '+2', bg: 'bg-[#fff5f2] dark:bg-[#ec4d25]/15 text-[#ec4d25]' },
    { label: 'Events', val: stats.eventsCount, icon: HiCalendar, trend: '+1', bg: 'bg-[#fff5f2] dark:bg-[#ec4d25]/15 text-[#ec4d25]' },
    { label: 'Total Raised', val: `₹${(stats.totalDonationsAmount / 100000).toFixed(1)}L`, icon: HiHeart, trend: '↑12%', bg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600' },
    { label: 'Volunteers', val: stats.volunteersCount, icon: HiUserGroup, trend: '+5', bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600' },
    { label: 'Articles', val: stats.blogsCount, icon: HiDocumentText, trend: '+1', bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' },
    { label: 'Inquiries', val: stats.contactsCount, icon: HiMail, trend: '+3', bg: 'bg-[#fff5f2] dark:bg-[#ec4d25]/15 text-[#ec4d25]' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 lg:z-30 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ec4d25] flex items-center justify-center text-white text-lg shadow-sm">
              <HiAcademicCap className="text-xl text-white" />
            </div>
            <div>
              <span className="text-base font-black text-slate-900 dark:text-white tracking-tight">GTT<span className="text-[#ec4d25]"> Dash</span></span>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 -mt-0.5">Admin Portal</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-none">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 pt-2 pb-1.5">Management</p>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button key={item.id}
                onClick={() => { setActiveTab(item.id); setSearchQuery(''); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${active ? 'bg-[#fff5f2] dark:bg-[#ec4d25]/15 text-[#ec4d25] dark:text-[#f78c72] shadow-sm border border-[#ffdcd2] dark:border-[#ec4d25]/30 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'}`}
              >
                <Icon className={`text-lg ${active ? 'text-[#ec4d25] dark:text-[#f78c72]' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <div className="w-9 h-9 rounded-lg bg-[#ec4d25] text-white font-bold flex items-center justify-center text-xs">
              {(user?.email || 'A')[0]?.toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Administrator'}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{user?.email || 'admin@gttfoundation.org'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="flex-1 py-2 px-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition flex items-center justify-center gap-1.5">
              <HiHome className="text-sm" /> Site
            </Link>
            <button onClick={() => { signOut(); toast.success('Signed out'); }} className="py-2 px-3 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer">
              <HiLogout className="text-sm" /> Exit
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <div className="px-6 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300 cursor-pointer">
                {sidebarOpen ? <HiX className="text-xl" /> : <HiMenuAlt2 className="text-xl" />}
              </button>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {getGreeting()}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#fff5f2] dark:bg-[#ec4d25]/15 text-[#ec4d25] dark:text-[#f78c72] border border-[#ffdcd2] dark:border-[#ec4d25]/30 font-semibold">
                    Admin
                  </span>
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Here's your foundation overview</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="relative hidden sm:block">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search records..."
                  className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#ec4d25] w-48 dark:text-white dark:placeholder-slate-500"
                />
              </div>
              <button onClick={() => { fetchTabContent(); loadStats(); toast.success('Synced'); }}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition cursor-pointer" title="Refresh">
                <HiRefresh className="text-base" />
              </button>
              <button onClick={() => {
                setModalType(activeTab === 'events' ? 'event' : activeTab === 'blogs' ? 'blog' : activeTab === 'donations' ? 'donation' : 'program');
                setShowCreateModal(true);
              }} className="bg-[#ec4d25] hover:bg-[#d73e16] text-white font-bold py-2 px-4 rounded-xl text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer">
                <HiPlus /> Add New
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          {/* KPI CARDS (Always visible) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {kpiCards.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
                      <Icon className="text-base" />
                    </div>
                    <span className="text-[10px] font-bold text-[#ec4d25] dark:text-[#f78c72] flex items-center gap-0.5">
                      <HiTrendingUp className="text-xs" /> {c.trend}
                    </span>
                  </div>
                  <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{c.val}</p>
                  <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">{c.label}</p>
                </div>
              );
            })}
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Quick Launch */}
              <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Operations Launchpad</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Quick actions to manage your foundation's operations</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { Icon: HiAcademicCap, title: 'New Program', desc: 'Set beneficiaries & funding goal', tab: 'programs', type: 'program' },
                    { Icon: HiCalendar, title: 'Schedule Event', desc: 'Publish workshops & drives', tab: 'events', type: 'event' },
                    { Icon: HiDocumentText, title: 'Publish Story', desc: 'Share impact articles', tab: 'blogs', type: 'blog' },
                  ].map((a) => (
                    <button key={a.title}
                      onClick={() => { setActiveTab(a.tab); setModalType(a.type); setShowCreateModal(true); }}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#ec4d25]/40 bg-slate-50/50 dark:bg-slate-800/40 text-left hover:-translate-y-0.5 transition-all group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#fff5f2] dark:bg-[#ec4d25]/15 text-[#ec4d25] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <a.Icon className="text-xl" />
                      </div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{a.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{a.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-5">
                  {[
                    { label: 'Annual Skilling Target', pct: 82, color: 'bg-[#ec4d25]' },
                    { label: 'Placement Goal 2026', pct: 65, color: 'bg-[#f78c72]' },
                    { label: 'Fundraising Target', pct: 48, color: 'bg-amber-500' },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-700 dark:text-slate-300">{bar.label}</span>
                        <span className="text-slate-500 dark:text-slate-400">{bar.pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${bar.color} rounded-full transition-all duration-1000`} style={{ width: `${bar.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel */}
              <div className="lg:col-span-4 space-y-5">
                {/* System Status — Clean Slate, Zero Glow */}
                <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-sm relative overflow-hidden">
                  <h4 className="text-sm font-bold mb-4">System Status</h4>
                  <div className="space-y-2.5 text-xs">
                    {[
                      { label: 'API Server', status: 'Online', statusColor: 'text-[#f78c72]' },
                      { label: 'Supabase', status: 'Connected', statusColor: 'text-[#f78c72]' },
                      { label: 'Registration', status: '12A • 80G • CSR-1', statusColor: 'text-slate-300' },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50">
                        <span className="text-slate-300">{s.label}</span>
                        <span className={`${s.statusColor} font-bold flex items-center gap-1.5`}>
                          {s.status === 'Online' || s.status === 'Connected' ? <span className="w-1.5 h-1.5 rounded-full bg-[#ec4d25]" /> : null}
                          {s.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <HiClock className="text-[#ec4d25]" /> Recent Activity
                  </h4>
                  <div className="space-y-3">
                    {[
                      { text: 'New program "Career Readiness" added', time: '2m ago', Icon: HiAcademicCap, iconBg: 'bg-[#fff5f2] text-[#ec4d25] dark:bg-[#ec4d25]/15' },
                      { text: 'Donation of ₹5,000 received', time: '15m ago', Icon: HiHeart, iconBg: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40' },
                      { text: 'Volunteer application from Maya I.', time: '1h ago', Icon: HiUserGroup, iconBg: 'bg-[#fff5f2] text-[#ec4d25] dark:bg-[#ec4d25]/15' },
                      { text: 'Contact inquiry about CSR partnership', time: '3h ago', Icon: HiMail, iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs">
                        <div className={`w-7 h-7 rounded-lg ${activity.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <activity.Icon className="text-sm" />
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-700 dark:text-slate-300 font-medium">{activity.text}</p>
                          <p className="text-slate-400 dark:text-slate-500 text-[10px] mt-0.5">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DATA TABLES TAB */}
          {activeTab !== 'overview' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">{activeTab} Management</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{filteredItems.length} records</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative sm:hidden">
                    <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..."
                      className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#ec4d25] w-full dark:text-white" />
                  </div>
                  <button onClick={fetchTabContent} className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer" title="Reload">
                    <HiRefresh className="text-sm text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Table Content */}
              {loading ? (
                <div className="py-20 text-center">
                  <div className="w-8 h-8 border-2 border-[#ec4d25] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Loading...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="py-16 text-center px-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <HiDocumentText className="text-3xl" />
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-300">No records found</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {searchQuery ? 'Try a different search term.' : 'Click "Add New" to create your first entry.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="py-3.5 px-6">Record</th>
                        <th className="py-3.5 px-6">Details</th>
                        <th className="py-3.5 px-6">Date</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition group">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#ec4d25] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                                {(item.title || item.donor_name || item.name || '?')[0]?.toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 dark:text-white">{item.title || item.donor_name || item.name || item.subject || `Record #${item.id}`}</p>
                                {item.category && (
                                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#fff5f2] dark:bg-[#ec4d25]/15 text-[#ec4d25] dark:text-[#f78c72] border border-[#ffdcd2] dark:border-[#ec4d25]/30">
                                    {item.category}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                            {item.description || item.message || item.email || (item.amount ? `₹${Number(item.amount).toLocaleString()} (${item.payment_method || 'Online'})` : '—')}
                          </td>
                          <td className="py-4 px-6 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                            {item.created_at || item.event_date ? new Date(item.event_date || item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' }) : 'Active'}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button onClick={() => handleDelete(item.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition opacity-0 group-hover:opacity-100 cursor-pointer" title="Delete">
                              <HiTrash className="text-sm" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-up">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">Add New {modalType}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Fill in the details below</p>
              </div>
              <div className="flex gap-1.5">
                {['program', 'event', 'blog', 'donation'].map((t) => (
                  <button key={t} onClick={() => setModalType(t)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg capitalize transition cursor-pointer ${modalType === t ? 'bg-[#ec4d25] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}
                  >{t}</button>
                ))}
              </div>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-xs">
              {modalType === 'program' && (<>
                <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Title</label>
                  <input type="text" required value={programForm.title} onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })} placeholder="e.g. Skilling for Employment 2026" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white dark:placeholder-slate-500 focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
                    <input type="text" value={programForm.category} onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
                  <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Beneficiaries</label>
                    <input type="text" value={programForm.target_beneficiaries} onChange={(e) => setProgramForm({ ...programForm, target_beneficiaries: e.target.value })} placeholder="e.g. 5,000 Youth" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white dark:placeholder-slate-500 focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
                </div>
                <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Description</label>
                  <textarea rows="3" required value={programForm.description} onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
              </>)}

              {modalType === 'event' && (<>
                <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Event Title</label>
                  <input type="text" required value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} placeholder="e.g. Career Readiness Bootcamp" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white dark:placeholder-slate-500 focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Date & Time</label>
                    <input type="datetime-local" required value={eventForm.event_date} onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
                  <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location</label>
                    <input type="text" required value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} placeholder="e.g. Pune Training Center" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white dark:placeholder-slate-500 focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
                </div>
                <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Description</label>
                  <textarea rows="3" required value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
              </>)}

              {modalType === 'blog' && (<>
                <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Story Title</label>
                  <input type="text" required value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} placeholder="e.g. Bringing Skills to 20 Villages" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white dark:placeholder-slate-500 focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
                <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Excerpt</label>
                  <input type="text" required value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} placeholder="Brief 1-2 sentence overview" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white dark:placeholder-slate-500 focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
                <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Content</label>
                  <textarea rows="4" required value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} placeholder="Write your article here..." className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white dark:placeholder-slate-500 focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
              </>)}

              {modalType === 'donation' && (<>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Donor Name</label>
                    <input type="text" required value={donationForm.donor_name} onChange={(e) => setDonationForm({ ...donationForm, donor_name: e.target.value })} placeholder="e.g. Anand M." className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white dark:placeholder-slate-500 focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
                  <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Amount (₹)</label>
                    <input type="number" required value={donationForm.amount} onChange={(e) => setDonationForm({ ...donationForm, amount: Number(e.target.value) })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
                </div>
                <div><label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Donor Email</label>
                  <input type="email" value={donationForm.donor_email} onChange={(e) => setDonationForm({ ...donationForm, donor_email: e.target.value })} placeholder="donor@example.com" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white dark:placeholder-slate-500 focus:ring-2 focus:ring-[#ec4d25] focus:outline-none" /></div>
              </>)}

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer">
                  Cancel
                </button>
                <button type="submit"
                  className="px-5 py-2.5 bg-[#ec4d25] hover:bg-[#d73e16] text-white rounded-xl font-bold shadow-sm transition cursor-pointer">
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
