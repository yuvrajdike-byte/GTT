import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiHeart, HiSearch, HiCheckCircle, HiArrowRight, HiUserGroup, HiAcademicCap, HiBriefcase, HiLightBulb, HiChartBar, HiLocationMarker } from 'react-icons/hi';
import { supabase } from '../lib/supabase';

const categories = ['All', 'Skilling', 'Training', 'Livelihood', 'Placement', 'Mentoring'];

// GTT Foundation's actual flagship initiatives as fallback
const gttPrograms = [
  {
    id: 'gtt-1',
    title: 'Skilling for Employment',
    category: 'Skilling',
    description: 'Comprehensive skill development programs designed to bridge the gap between education and employability. We offer industry-relevant courses in IT, retail, healthcare, BFSI, and manufacturing sectors to empower youth with market-ready skills.',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    target_beneficiaries: 'Underserved Youth (18-30)',
    target_amount: 2500000,
    raised_amount: 1875000,
    status: 'Active',
    impact_count: '5,000+ Skilled',
    location: 'Pan India',
  },
  {
    id: 'gtt-2',
    title: 'Professional Training & Upskilling',
    category: 'Training',
    description: 'Industry-partnered training modules covering soft skills, communication, digital literacy, and domain-specific expertise. Our training programs are designed in collaboration with corporate partners to ensure real-world applicability.',
    image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    target_beneficiaries: 'Young Professionals',
    target_amount: 1800000,
    raised_amount: 1260000,
    status: 'Active',
    impact_count: '3,200+ Trained',
    location: 'Pune & Mumbai',
  },
  {
    id: 'gtt-3',
    title: 'Livelihood Enhancement Program',
    category: 'Livelihood',
    description: 'Creating sustainable livelihood opportunities through micro-enterprise development, self-employment support, and community-based economic initiatives. We empower individuals to build financially independent futures.',
    image_url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    target_beneficiaries: 'Rural & Semi-Urban Communities',
    target_amount: 3000000,
    raised_amount: 2100000,
    status: 'Active',
    impact_count: '1,800+ Livelihoods',
    location: 'Maharashtra',
  },
  {
    id: 'gtt-4',
    title: 'Bridge 4 Bharat',
    category: 'Skilling',
    description: 'A flagship digital skilling initiative connecting underserved youth in tier-2 and tier-3 cities with technology-driven career opportunities. The program bridges the digital divide through structured online and offline learning pathways.',
    image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    target_beneficiaries: 'Tier 2-3 City Youth',
    target_amount: 5000000,
    raised_amount: 3250000,
    status: 'Active',
    impact_count: '8,000+ Impacted',
    location: 'Tier 2-3 Cities',
  },
  {
    id: 'gtt-5',
    title: 'Campus to Corporate Placement',
    category: 'Placement',
    description: 'End-to-end placement support connecting trained candidates with industry partners. Our dedicated placement cell works with 200+ companies to ensure candidates find meaningful employment aligned with their skills.',
    image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    target_beneficiaries: 'Job Seekers',
    target_amount: 1500000,
    raised_amount: 1350000,
    status: 'Active',
    impact_count: '4,500+ Placed',
    location: 'Pan India',
  },
  {
    id: 'gtt-6',
    title: 'Mentoring & Career Guidance',
    category: 'Mentoring',
    description: 'One-on-one and group mentoring sessions led by industry professionals and domain experts. Our mentoring framework provides personalized career guidance, goal setting, and continuous support for holistic development.',
    image_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    target_beneficiaries: 'Students & Early Careers',
    target_amount: 1200000,
    raised_amount: 960000,
    status: 'Active',
    impact_count: '2,500+ Mentored',
    location: 'Pune',
  },
];

const impactStats = [
  { icon: HiUserGroup, value: '25,000+', label: 'Lives Impacted' },
  { icon: HiAcademicCap, value: '5,000+', label: 'Youth Skilled' },
  { icon: HiBriefcase, value: '4,500+', label: 'Placed in Jobs' },
  { icon: HiLightBulb, value: '200+', label: 'Corporate Partners' },
];

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/programs')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPrograms(data);
        } else {
          supabase.from('programs').select('*').then(({ data: sbData }) => {
            if (sbData && sbData.length > 0) {
              setPrograms(sbData);
            } else {
              setPrograms(gttPrograms);
            }
          });
        }
      })
      .catch(() => {
        setPrograms(gttPrograms);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredPrograms = programs.filter((p) => {
    const matchesCat =
      selectedCategory === 'All' ||
      (p.category && p.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch =
      (p.title && p.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-24 sm:py-28">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-300 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-900/60 px-4 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-sm">
                Our Flagship Initiatives
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent max-w-32" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Empowering{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Youth
              </span>{' '}
              Through Skills &amp; Career Development
            </h1>
            <p className="text-emerald-100/80 text-lg sm:text-xl max-w-3xl mt-6 leading-relaxed">
              GTT Foundation is on a mission to empower underserved segments of society in their pursuit 
              of sustainable livelihoods and enhanced employability through structured skilling, training, 
              and placement initiatives.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/volunteer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/30"
              >
                <HiUserGroup className="text-lg" />
                Join as Volunteer
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-6 py-3.5 rounded-xl text-sm transition border border-white/20"
              >
                <HiHeart className="text-rose-400" />
                Support Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Bar */}
      <section className="relative z-20 -mt-12 sm:-mt-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/30 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impactStats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
                    <stat.icon className="text-2xl" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-md shadow-slate-900/5 dark:shadow-black/20 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between transition-colors">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search initiatives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-800 transition"
            />
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading initiatives...</p>
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-5 text-3xl">
              <HiSearch />
            </div>
            <p className="text-slate-900 dark:text-white text-lg font-bold mb-2">
              {searchQuery || selectedCategory !== 'All'
                ? 'No initiatives matched your filters.'
                : 'No programs published yet.'}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-md mx-auto">
              {searchQuery || selectedCategory !== 'All'
                ? 'Try a different category or search term.'
                : 'Programs added from the dashboard will appear here.'}
            </p>
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => {
              const target = Number(program.target_amount) || 1000000;
              const raised = Number(program.raised_amount) || 750000;
              const percent = Math.min(100, Math.round((raised / target) * 100));

              return (
                <div
                  key={program.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-black/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={program.image_url || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800'}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-900 dark:text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                        {program.category || 'General'}
                      </span>
                      {program.status && (
                        <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          {program.status}
                        </span>
                      )}
                    </div>
                    {program.impact_count && (
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-emerald-700 dark:text-emerald-400 text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                          <HiChartBar className="text-sm" />
                          {program.impact_count}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                        {program.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-3">
                        {program.description}
                      </p>
                      {program.location && (
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-3 flex items-center gap-1.5">
                          <HiLocationMarker className="text-emerald-500 text-sm flex-shrink-0" /> {program.location}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 pt-2">
                      {/* Funding Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-600 dark:text-slate-400">
                            Funded: <strong className="text-slate-900 dark:text-white">{percent}%</strong>
                          </span>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                            Goal: ₹{target.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-1000 relative"
                            style={{ width: `${percent}%` }}
                          >
                            <div className="absolute right-0 top-0 w-2 h-full bg-white/30 rounded-full" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                          <HiAcademicCap className="text-emerald-600 dark:text-emerald-400 text-sm" /> {program.target_beneficiaries || 'Community'}
                        </span>
                        <Link
                          to="/donate"
                          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm shadow-emerald-600/20 group/btn"
                        >
                          <HiHeart className="text-rose-300 group-hover/btn:scale-110 transition" />
                          Fund Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* How It Works / Our Approach Section */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              Our Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
              From Skill Building to Sustainable Careers
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 text-base sm:text-lg">
              Our integrated model ensures every participant moves through a structured pathway from assessment to employment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Assessment & Counseling',
                desc: 'Evaluate aptitude, interests, and existing skills to create personalized development plans.',
                color: 'from-emerald-500 to-emerald-600',
              },
              {
                step: '02',
                title: 'Skilling & Training',
                desc: 'Industry-aligned courses covering technical, digital, and soft skills with hands-on practice.',
                color: 'from-teal-500 to-teal-600',
              },
              {
                step: '03',
                title: 'Mentoring & Guidance',
                desc: 'Dedicated mentors from industry provide career advice, goal-setting, and ongoing support.',
                color: 'from-cyan-500 to-cyan-600',
              },
              {
                step: '04',
                title: 'Placement & Livelihood',
                desc: 'Connect trained candidates with 200+ corporate partners for meaningful, sustainable employment.',
                color: 'from-emerald-600 to-teal-500',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition group"
              >
                <span className={`inline-block text-xs font-black text-white bg-gradient-to-r ${item.color} px-3 py-1 rounded-lg mb-4 shadow-sm`}>
                  Step {item.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Partner With Us to Transform Lives
          </h2>
          <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Whether through corporate partnerships, volunteering, or donations — every contribution helps us skill, train, and place more youth in meaningful careers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-white text-slate-900 font-extrabold px-8 py-4 rounded-xl text-sm shadow-xl hover:bg-slate-100 hover:scale-105 transition flex items-center gap-2"
            >
              <HiHeart className="text-rose-600 text-lg" />
              Support Our Initiatives
            </Link>
            <Link
              to="/contact"
              className="bg-emerald-800/60 hover:bg-emerald-800/80 border border-emerald-400/40 text-white font-bold px-8 py-4 rounded-xl text-sm transition flex items-center gap-2"
            >
              Become a Partner <HiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
