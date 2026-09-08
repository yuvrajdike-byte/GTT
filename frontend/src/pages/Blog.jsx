import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiCalendar, HiUser, HiClock, HiDocumentText, HiSparkles } from 'react-icons/hi';
import { supabase } from '../lib/supabase';

const fallbackBlogs = [
  {
    id: 'fb-1',
    title: 'How 500 Youth Were Skilled and Placed in 6 Months',
    slug: 'youth-skilled-placed',
    category: 'Impact Story',
    excerpt: 'A deep dive into our latest skilling cohort in Pune — from assessment to placement, and the real-world outcomes of industry-aligned training.',
    content: '',
    author_name: 'GTT Editorial Team',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    published: true,
  },
  {
    id: 'fb-2',
    title: 'Bridge 4 Bharat: Bringing Digital Skills to Tier-3 Cities',
    slug: 'bridge-4-bharat-digital',
    category: 'Program Update',
    excerpt: 'Our Bridge 4 Bharat initiative reached 12 new towns this quarter, training 800+ youth in basic digital literacy and online job readiness.',
    content: '',
    author_name: 'Bridge 4 Bharat Team',
    image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    published: true,
  },
  {
    id: 'fb-3',
    title: 'Women Entrepreneurs: 200 Micro-Businesses Launched',
    slug: 'women-entrepreneurs-200',
    category: 'Success Story',
    excerpt: 'Our Livelihood Enhancement Program has helped 200 women from underserved communities start their own micro-businesses with mentoring and micro-grants.',
    content: '',
    author_name: 'Livelihood Team',
    image_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    published: true,
  },
  {
    id: 'fb-4',
    title: 'Industry Connect 2026: 300 Candidates, 30 Employers',
    slug: 'industry-connect-2026',
    category: 'Event Recap',
    excerpt: "Our flagship hiring event brought together 300 GTT-trained candidates with 30+ companies. Here's how the day unfolded and the placements achieved.",
    content: '',
    author_name: 'Placement Cell',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    published: true,
  },
];

const categories = ['All', 'Impact Story', 'Program Update', 'Success Story', 'Event Recap'];

function estimateReadTime(text) {
  const words = (text || '').split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 200));
}

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    fetch('/api/blogs')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
        } else {
          return supabase
            .from('blogs')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });
        }
      })
      .then((result) => {
        if (result && result.data && result.data.length > 0) {
          setBlogs(result.data);
        } else if (!blogs.length) {
          setBlogs(fallbackBlogs);
        }
      })
      .catch(() => setBlogs(fallbackBlogs))
      .finally(() => setLoading(false));
  }, []);

  const filtered = selectedCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === selectedCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 transition-colors">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-24 sm:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-10 left-20 w-64 h-64 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-900/60 px-4 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-sm">
              Voices & Insights
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 tracking-tight leading-tight">
              Stories of Real{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Transformation</span>
            </h1>
            <p className="text-emerald-100/80 text-lg sm:text-xl max-w-2xl mt-6 leading-relaxed">
              Read how youth skilling, industry partnerships, and community empowerment are creating lasting change across India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Category Filter Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-lg dark:shadow-black/30 border border-slate-200/80 dark:border-slate-800 flex flex-wrap gap-2 mb-10 transition-colors">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-[1.02]'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading stories...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 transition-colors">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <HiDocumentText className="text-3xl" />
            </div>
            <p className="text-slate-900 dark:text-white text-lg font-bold mb-2">No stories published yet.</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-md mx-auto">
              Impact stories and updates will appear here soon.
            </p>
            {selectedCategory !== 'All' && (
              <button onClick={() => setSelectedCategory('All')} className="px-5 py-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition cursor-pointer">
                View All Stories
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Article */}
            {featured && (
              <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row group animate-fade-in-up">
                <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={featured.image_url || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800'}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {featured.category || 'Impact Story'}
                  </span>
                  <span className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5">
                    <HiSparkles className="text-amber-500" /> Featured
                  </span>
                </div>
                <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><HiCalendar className="text-emerald-500" /> {new Date(featured.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><HiUser className="text-emerald-500" /> {featured.author_name || 'GTT Team'}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><HiClock className="text-emerald-500" /> {estimateReadTime(featured.content)} min read</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition leading-tight mb-4">
                    <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                  <Link
                    to={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition group/link"
                  >
                    Read Full Story <HiArrowRight className="group-hover/link:translate-x-0.5 transition" />
                  </Link>
                </div>
              </article>
            )}

            {/* Rest of articles */}
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((blog, i) => (
                  <article
                    key={blog.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-black/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={blog.image_url || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        {blog.category || 'Impact Story'}
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-3">
                          <span className="flex items-center gap-1"><HiCalendar className="text-emerald-500" /> {new Date(blog.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><HiClock className="text-emerald-500" /> {estimateReadTime(blog.content)} min</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition leading-snug mb-3">
                          <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">{blog.excerpt}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1"><HiUser className="text-emerald-500" /> {blog.author_name || 'GTT Team'}</span>
                        <Link
                          to={`/blog/${blog.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition"
                        >
                          Read <HiArrowRight />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
