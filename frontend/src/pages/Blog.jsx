import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiCalendar, HiUser, HiClock, HiArrowRight, HiSparkles, HiDocumentText } from 'react-icons/hi';
import { supabase } from '../lib/supabase';

// Fallback high-impact GTT stories
const gttStories = [
  {
    id: 'story-1',
    title: 'From Village to IT Professional: How Priya Transformed Her Family’s Future',
    slug: 'priya-it-skilling-journey',
    category: 'Skilling',
    excerpt: 'Coming from a farming family in rural Maharashtra, Priya had never owned a computer. Through GTT Foundation’s 3-month IT Skilling Bootcamp, she mastered web technologies and secured a software role.',
    content: `Coming from a small farming household in rural Maharashtra, Priya had never touched a high-performance computer. Financial hardship meant college was an uphill battle, and job opportunities in her village were virtually non-existent.

When GTT Foundation announced its free 3-month IT Skilling Bootcamp in Pune, Priya took a leap of faith. The curriculum was rigorous — covering practical programming, database fundamentals, communication, and interview etiquette.

"The trainers didn't just teach code; they believed in us when we doubted ourselves," Priya recalls. 

Within two weeks of graduation, Priya cracked her interview at a leading multinational IT services firm in Pune. Today, she earns a stable income, supports her siblings’ higher education, and volunteers as a peer mentor for newer cohorts entering GTT Foundation programs.`,
    author_name: 'GTT Editorial Team',
    created_at: '2026-02-15T10:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1604177091072-b7b677a077f6?w=800&auto=format&fit=crop&q=80',
    published: true,
  },
  {
    id: 'story-2',
    title: 'Bridge 4 Bharat: Bringing High-Demand Digital Skills to Tier-3 Towns',
    slug: 'bridge-4-bharat-tier3-impact',
    category: 'Bridge 4 Bharat',
    excerpt: 'How GTT Foundation’s mobile training labs and community centers are bridging the rural-urban digital divide, equipping 8,000+ youth with in-demand technical competencies.',
    content: `While metro cities surge ahead with tech jobs, youth in tier-2 and tier-3 towns often find themselves disconnected from industry demand. GTT Foundation launched 'Bridge 4 Bharat' specifically to dissolve this geographic penalty.

By partnering with local community colleges, establishing computer hubs, and mobilizing certified trainers, the initiative has reached over 8,000 participants across 14 districts. 

The courses focus heavily on employment readiness: digital literacy, back-office software, data handling, and customer relations. Crucially, local placement drives connect graduates directly with hiring companies.`,
    author_name: 'Dr. Ganesh Natarajan',
    created_at: '2026-01-28T09:30:00Z',
    image_url: 'https://images.unsplash.com/photo-1569653402334-2e98fbaa80ee?w=800&auto=format&fit=crop&q=80',
    published: true,
  },
  {
    id: 'story-3',
    title: 'Women in Retail: Breaking Stereotypes and Building Livelihoods',
    slug: 'women-in-retail-livelihoods',
    category: 'Livelihood',
    excerpt: 'A deep-dive into how specialized retail and customer management training helped 200+ young women in Pune secure structured employment with healthcare and social security benefits.',
    content: `Economic independence transforms families. When young women earn a regular salary, family nutrition improves, children stay in school longer, and community health indicators rise.

GTT Foundation’s Retail Operations training program was designed from the ground up for women aged 18 to 26. The training simulated real store environments — inventory management, POS software, customer dispute resolution, and professional English.

Over 90% of the recent cohort received job offers within 30 days of program completion at major organized retail chains.`,
    author_name: 'GTT Placement Cell',
    created_at: '2026-01-12T14:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1646578486121-67aed93c4f4e?w=800&auto=format&fit=crop&q=80',
    published: true,
  },
];

const categories = ['All', 'Skilling', 'Bridge 4 Bharat', 'Livelihood', 'Training', 'Placement'];

function estimateReadTime(text) {
  if (!text) return 3;
  const words = text.split(/\s+/).length;
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
          supabase.from('blogs').select('*').eq('published', true).order('created_at', { ascending: false })
            .then(({ data: sbData }) => {
              if (sbData && sbData.length > 0) {
                setBlogs(sbData);
              } else {
                setBlogs(gttStories);
              }
            });
        }
      })
      .catch(() => {
        setBlogs(gttStories);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = blogs.filter((b) => {
    if (selectedCategory === 'All') return true;
    return b.category && b.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 transition-colors">
      {/* Header — Clean Slate, Zero Glow Blobs */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 sm:py-28 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#f78c72] bg-[#ec4d25]/15 px-4 py-1.5 rounded-full border border-[#ec4d25]/30 backdrop-blur-sm">
              Voices & Insights
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 tracking-tight leading-tight">
              Stories of Real{' '}
              <span className="text-[#ec4d25]">Transformation</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mt-6 leading-relaxed">
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
                  ? 'bg-[#ec4d25] text-white shadow-sm'
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
            <div className="w-12 h-12 border-4 border-[#ec4d25] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading stories...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 transition-colors">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#fff5f2] dark:bg-[#ec4d25]/15 text-[#ec4d25] border border-[#ffdcd2] dark:border-[#ec4d25]/30 flex items-center justify-center">
              <HiDocumentText className="text-3xl" />
            </div>
            <p className="text-slate-900 dark:text-white text-lg font-bold mb-2">No stories published yet.</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-md mx-auto">
              Impact stories and updates will appear here soon.
            </p>
            {selectedCategory !== 'All' && (
              <button onClick={() => setSelectedCategory('All')} className="px-5 py-2.5 text-xs font-bold text-[#ec4d25] border border-[#ffdcd2] dark:border-[#ec4d25]/30 rounded-xl hover:bg-[#fff5f2] dark:hover:bg-[#ec4d25]/10 transition cursor-pointer">
                View All Stories
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Article */}
            {featured && (
              <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row group animate-fade-in-up">
                <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={featured.image_url || 'https://images.unsplash.com/photo-1692269725911-87697c558be1?w=800&auto=format&fit=crop&q=80'}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#ec4d25] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {featured.category || 'Impact Story'}
                  </span>
                  <span className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5">
                    <HiSparkles className="text-[#ec4d25]" /> Featured
                  </span>
                </div>
                <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><HiCalendar className="text-[#ec4d25]" /> {new Date(featured.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><HiUser className="text-[#ec4d25]" /> {featured.author_name || 'GTT Team'}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><HiClock className="text-[#ec4d25]" /> {estimateReadTime(featured.content)} min read</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-[#ec4d25] transition leading-tight mb-4">
                    <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                  <Link
                    to={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#ec4d25] hover:text-[#d73e16] transition group/link"
                  >
                    Read Full Story <HiArrowRight className="group-hover/link:translate-x-0.5 transition-transform" />
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
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg dark:shadow-black/30 hover:border-[#ec4d25]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col group animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={blog.image_url || 'https://images.unsplash.com/photo-1692269725851-f5d3a3f02807?w=800&auto=format&fit=crop&q=80'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-[#ec4d25] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        {blog.category || 'Impact Story'}
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-3">
                          <span className="flex items-center gap-1"><HiCalendar className="text-[#ec4d25]" /> {new Date(blog.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><HiClock className="text-[#ec4d25]" /> {estimateReadTime(blog.content)} min</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#ec4d25] transition leading-snug mb-3">
                          <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">{blog.excerpt}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1"><HiUser className="text-[#ec4d25]" /> {blog.author_name || 'GTT Team'}</span>
                        <Link
                          to={`/blog/${blog.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ec4d25] hover:text-[#d73e16] transition"
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
