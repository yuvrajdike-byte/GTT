import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiArrowLeft, HiCalendar, HiUser, HiClock, HiArrowRight, HiDocumentText } from 'react-icons/hi';
import { FaWhatsapp, FaLinkedin, FaTwitter, FaLink } from 'react-icons/fa';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/blogs/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.title) {
          setBlog(data);
          setLoading(false);
        } else {
          supabase.from('blogs').select('*').eq('slug', slug).single()
            .then(({ data: sbData }) => {
              if (sbData) setBlog(sbData);
              setLoading(false);
            })
            .catch(() => setLoading(false));
        }
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const shareUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const shareTitle = blog ? encodeURIComponent(blog.title) : '';

  const readTime = blog ? Math.max(3, Math.ceil((blog.content || '').split(/\s+/).length / 200)) : 3;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-4 shadow-sm">
          <HiDocumentText className="text-3xl" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Article Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">The story you're looking for might have been moved or updated.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700 transition">
          <HiArrowLeft /> Back to Impact Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-20 transition-colors">
      {/* Top Nav */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition">
            <HiArrowLeft /> All Articles
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline font-medium">Share:</span>
            <a href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-950/40 text-green-600 flex items-center justify-center hover:bg-green-100 dark:hover:bg-green-900/40 transition">
              <FaWhatsapp size={14} />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
              <FaLinkedin size={14} />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-500 flex items-center justify-center hover:bg-sky-100 dark:hover:bg-sky-900/40 transition">
              <FaTwitter size={14} />
            </a>
            <button onClick={handleCopyLink}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition">
              <FaLink size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 animate-fade-in-up">
        {/* Header */}
        <div className="mb-8">
          <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {blog.category || 'Impact Story'}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mt-5 tracking-tight leading-tight">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed italic">
              {blog.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <HiUser className="text-emerald-600 dark:text-emerald-400 text-base" />
              By {blog.author_name || 'GTT Editorial Team'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <HiCalendar className="text-emerald-600 dark:text-emerald-400 text-base" />
              {blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <HiClock className="text-emerald-600 dark:text-emerald-400 text-base" />
              {readTime} min read
            </span>
          </div>
        </div>

        {/* Hero Image */}
        {blog.image_url && (
          <div className="rounded-2xl overflow-hidden shadow-lg dark:shadow-black/30 mb-12 border border-slate-100 dark:border-slate-800">
            <img src={blog.image_url} alt={blog.title} className="w-full h-80 sm:h-[450px] object-cover" />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-emerald prose-lg max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-6 text-base sm:text-lg whitespace-pre-line">
          {blog.content}
        </div>

        {/* Tags / Category */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Tags:</span>
          {['GTT Foundation', blog.category || 'Impact', 'Community Development'].map((tag) => (
            <span key={tag} className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 p-8 sm:p-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white text-center space-y-4 shadow-lg">
          <h3 className="text-2xl font-bold">Inspired by this story?</h3>
          <p className="text-sm text-emerald-100 max-w-xl mx-auto">
            Your contributions enable us to replicate these programs and impact more lives.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link to="/donate" className="bg-white text-slate-900 font-extrabold px-6 py-3 rounded-xl text-sm shadow-xl hover:bg-slate-100 hover:scale-105 active:scale-[0.98] transition-all flex items-center gap-2">
              Support This Program <HiArrowRight />
            </Link>
            <Link to="/volunteer" className="bg-emerald-800/60 hover:bg-emerald-800/80 border border-emerald-400/40 text-white font-bold px-6 py-3 rounded-xl text-sm transition">
              Volunteer With Us
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
