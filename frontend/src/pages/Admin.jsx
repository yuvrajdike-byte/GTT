import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  HiPlus,
  HiTrash,
  HiLogout,
  HiHeart,
  HiAcademicCap,
  HiCalendar,
  HiDocumentText,
  HiMail,
  HiUserGroup,
  HiRefresh,
  HiExternalLink
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const tabs = [
  { id: 'programs', label: 'Programs', icon: HiAcademicCap },
  { id: 'events', label: 'Events', icon: HiCalendar },
  { id: 'blogs', label: 'Articles & Blogs', icon: HiDocumentText },
  { id: 'donations', label: 'Donations Ledger', icon: HiHeart },
  { id: 'contacts', label: 'Inquiries', icon: HiMail },
  { id: 'volunteers', label: 'Volunteers', icon: HiUserGroup }
];

export default function Admin() {
  const { user, session, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('programs');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form states for creating new records
  const [programForm, setProgramForm] = useState({
    title: '',
    category: 'Education',
    description: '',
    target_beneficiaries: '',
    target_amount: 1000000,
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800'
  });

  const [eventForm, setEventForm] = useState(() => ({
    title: '',
    description: '',
    event_date: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 16),
    location: '',
    organizer: 'GTT Team',
    category: 'Community',
    capacity: 100,
    image_url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800'
  }));

  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    category: 'Impact Stories',
    excerpt: '',
    content: '',
    author_name: user?.user_metadata?.full_name || 'GTT Team',
    image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
    published: true
  });

  const token = session?.access_token;

  const fetchTabContent = async () => {
    setLoading(true);
    try {
      if (activeTab === 'programs') {
        const res = await fetch('/api/programs');
        if (res.ok) {
          const data = await res.json();
          setItems(Array.isArray(data) ? data : []);
        } else {
          const { data } = await supabase.from('programs').select('*').order('created_at', { ascending: false });
          setItems(data || []);
        }
      } else if (activeTab === 'events') {
        const res = await fetch('/api/events');
        if (res.ok) {
          const data = await res.json();
          setItems(Array.isArray(data) ? data : []);
        } else {
          const { data } = await supabase.from('events').select('*').order('event_date', { ascending: true });
          setItems(data || []);
        }
      } else if (activeTab === 'blogs') {
        const res = await fetch('/api/blogs/all', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (res.ok) {
          const data = await res.json();
          setItems(Array.isArray(data) ? data : []);
        } else {
          const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
          setItems(data || []);
        }
      } else if (activeTab === 'donations') {
        const res = await fetch('/api/donations', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (res.ok) {
          const data = await res.json();
          setItems(Array.isArray(data) ? data : []);
        } else {
          const { data } = await supabase.from('donations').select('*').order('created_at', { ascending: false });
          setItems(data || []);
        }
      } else if (activeTab === 'contacts') {
        const res = await fetch('/api/contact', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (res.ok) {
          const data = await res.json();
          setItems(Array.isArray(data) ? data : []);
        } else {
          const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
          setItems(data || []);
        }
      } else if (activeTab === 'volunteers') {
        const res = await fetch('/api/volunteers', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (res.ok) {
          const data = await res.json();
          setItems(Array.isArray(data) ? data : []);
        } else {
          const { data } = await supabase.from('volunteers').select('*').order('created_at', { ascending: false });
          setItems(data || []);
        }
      }
    } catch (err) {
      console.warn('Fetch note:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabContent();
  }, [activeTab, token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      const endpoint =
        activeTab === 'programs' ? `/api/programs/${id}` :
        activeTab === 'events' ? `/api/events/${id}` :
        activeTab === 'blogs' ? `/api/blogs/${id}` :
        activeTab === 'contacts' ? `/api/contact/${id}` :
        activeTab === 'volunteers' ? `/api/volunteers/${id}` : null;

      if (endpoint) {
        await fetch(endpoint, {
          method: 'DELETE',
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
      }

      // Also attempt direct Supabase delete
      await supabase.from(activeTab).delete().eq('id', id);

      toast.success('Item deleted successfully');
      setItems(items.filter((i) => i.id !== id));
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleCreateProgram = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(programForm),
      });

      if (!res.ok) {
        await supabase.from('programs').insert([programForm]);
      }

      toast.success('New program added!');
      setShowModal(false);
      fetchTabContent();
    } catch (err) {
      toast.error(err.message || 'Error saving program');
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(eventForm),
      });

      if (!res.ok) {
        await supabase.from('events').insert([eventForm]);
      }

      toast.success('New event created!');
      setShowModal(false);
      fetchTabContent();
    } catch (err) {
      toast.error(err.message || 'Error saving event');
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const payload = { ...blogForm, slug };

      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        await supabase.from('blogs').insert([payload]);
      }

      toast.success('Article published!');
      setShowModal(false);
      fetchTabContent();
    } catch (err) {
      toast.error(err.message || 'Error saving article');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <HiAcademicCap className="text-2xl text-emerald-400" />
              <span className="font-black text-lg text-white">GTT Admin</span>
            </Link>
            <span className="hidden sm:inline-block text-xs bg-emerald-800 text-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
              Supabase Auth Active
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/" className="text-slate-300 hover:text-white flex items-center gap-1">
              <HiExternalLink /> View Website
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 hidden sm:inline">{user?.email || 'admin@gttfoundation.org'}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg transition"
            >
              <HiLogout /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  setShowModal(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                  active
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="text-lg" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white capitalize">{activeTab} Management</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Live synchronization with Supabase PostgreSQL tables</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchTabContent}
              className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <HiRefresh /> Refresh
            </button>

            {['programs', 'events', 'blogs'].includes(activeTab) && (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold transition shadow-md"
              >
                <HiPlus className="text-base" /> Add New {activeTab.slice(0, -1)}
              </button>
            )}
          </div>
        </div>

        {/* Content Table / List */}
        {loading ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-16 text-center shadow-sm transition-colors">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Fetching records from Supabase...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-16 text-center border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <p className="text-base font-bold text-slate-700 dark:text-slate-300">No {activeTab} records found.</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
              Run the SQL schema in your Supabase SQL editor or click "Add New" to populate your first entry.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 uppercase font-black text-[11px] tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">
                      {activeTab === 'donations' ? 'Donor & Email' :
                       activeTab === 'contacts' ? 'Sender' :
                       activeTab === 'volunteers' ? 'Applicant' : 'Title / Item'}
                    </th>
                    <th className="px-6 py-3.5">
                      {activeTab === 'donations' ? 'Amount' :
                       activeTab === 'events' ? 'Date & Venue' :
                       activeTab === 'volunteers' ? 'Skills & Availability' : 'Category / Details'}
                    </th>
                    <th className="px-6 py-3.5">Created At</th>
                    <th className="px-6 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {item.title || item.donor_name || item.name || item.full_name}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">
                          {item.email || (item.slug ? `/blog/${item.slug}` : '')}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-md truncate">
                        {activeTab === 'donations' ? (
                          <span className="font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                            ₹{Number(item.amount).toLocaleString()}
                          </span>
                        ) : activeTab === 'events' ? (
                          <span>
                            {new Date(item.event_date).toLocaleDateString()} • {item.location}
                          </span>
                        ) : activeTab === 'volunteers' ? (
                          <span>
                            {item.interest_area} • {item.skills || 'General'}
                          </span>
                        ) : (
                          item.description || item.excerpt || item.message || '—'
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400 dark:text-slate-500">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Active'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                          title="Delete Record"
                        >
                          <HiTrash className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Creation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto animate-fade-in">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">
                Add New {activeTab === 'programs' ? 'Program' : activeTab === 'events' ? 'Event' : 'Blog Article'}
              </h3>

              {activeTab === 'programs' && (
                <form onSubmit={handleCreateProgram} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={programForm.title}
                      onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Category</label>
                    <select
                      value={programForm.category}
                      onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm"
                    >
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Environment">Environment</option>
                      <option value="Livelihood">Livelihood</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={programForm.description}
                      onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Beneficiaries (e.g. 2,000 Kids)</label>
                    <input
                      type="text"
                      value={programForm.target_beneficiaries}
                      onChange={(e) => setProgramForm({ ...programForm, target_beneficiaries: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={programForm.image_url}
                      onChange={(e) => setProgramForm({ ...programForm, image_url: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl text-sm transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm"
                    >
                      Save Program
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'events' && (
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Event Title *</label>
                    <input
                      type="text"
                      required
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Date & Time *</label>
                    <input
                      type="datetime-local"
                      required
                      value={eventForm.event_date}
                      onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Location / Venue *</label>
                    <input
                      type="text"
                      required
                      value={eventForm.location}
                      onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl text-sm transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm"
                    >
                      Save Event
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'blogs' && (
                <form onSubmit={handleCreateBlog} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Article Title *</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Excerpt *</label>
                    <textarea
                      required
                      rows={2}
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Full Content *</label>
                    <textarea
                      required
                      rows={5}
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl text-sm transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm"
                    >
                      Publish Article
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
