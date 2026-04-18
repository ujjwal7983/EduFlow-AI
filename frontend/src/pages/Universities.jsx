import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';
import { Search, GraduationCap, Target, AlertTriangle, ShieldCheck, ArrowRight, DollarSign, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import CurrencySelector from '../components/CurrencySelector';

const Universities = () => {
  const { profile } = useAuth();
  const { formatCurrency, getSymbol } = useCurrency();
  
  const [filters, setFilters] = useState({
    budget: 50000,
    targetCountry: 'USA',
    targetCourse: 'Computer Science'
  });
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profile) {
      setFilters(prev => ({
        ...prev,
        targetCountry: Array.isArray(profile.targetCountry) ? profile.targetCountry[0] : profile.targetCountry || 'USA',
        targetCourse: profile.targetCourse || 'Computer Science'
      }));
    }
  }, [profile]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await api.post(ENDPOINTS.AI.UNIVERSITY_MATCH, {
        cgpa: profile?.cgpa || null,
        cgpaScale: profile?.cgpaScale || 4.0,
        ...filters
      });

      if (response.data?.success) {
        setResults(response.data.prediction.recommendations || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate predictions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Safe': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Target': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Reach': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Safe': return <ShieldCheck className="w-5 h-5" />;
      case 'Target': return <Target className="w-5 h-5" />;
      case 'Reach': return <AlertTriangle className="w-5 h-5" />;
      default: return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 space-y-8">
        
        {/* Header Content */}
        <div className="glass-card-vibrant rounded-3xl p-8 relative overflow-hidden shadow-sm border border-[var(--border-color)] w-full animate-in fade-in zoom-in duration-500">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-blue)] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
           <div className="relative z-10 text-[var(--text-primary)] max-w-3xl">
             <div className="flex items-center justify-between mb-4">
               <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent-blue)]/10 backdrop-blur-md rounded-full text-sm font-semibold text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 shadow-sm">
                 <Target className="w-4 h-4" /> AI Admission Predictor
               </div>
               <CurrencySelector className="!bg-[var(--bg-secondary)] !text-[var(--text-primary)] !border-[var(--border-color)] hover:!border-[var(--accent-blue)]" />
             </div>
             <h1 className="text-3xl sm:text-4xl font-black mb-3">University Matchmaker</h1>
             <p className="text-[var(--text-secondary)] text-lg leading-relaxed font-medium mb-8">
               Our predictive algorithm analyzes your CGPA against historical admission data to calculate your acceptance probability and categorize actual universities into Safe, Target, and Reach options.
             </p>
             
             <form onSubmit={handleSearch} className="glass-panel p-2 rounded-2xl flex flex-col sm:flex-row gap-2 max-w-4xl border border-[var(--border-color)]">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                  <select 
                    value={filters.targetCountry}
                    onChange={(e) => setFilters({...filters, targetCountry: e.target.value})}
                    className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] border border-transparent focus:border-[var(--accent-blue)] transition-all font-medium appearance-none"
                    required
                  >
                    <option value="" disabled>Select Country</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ireland">Ireland</option>
                    <option value="India">India</option>
                  </select>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <GraduationCap className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                  <select 
                    value={filters.targetCourse}
                    onChange={(e) => setFilters({...filters, targetCourse: e.target.value})}
                    className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] border border-transparent focus:border-[var(--accent-blue)] transition-all font-medium appearance-none"
                    required
                  >
                    <option value="" disabled>Select Major</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Arts & Humanities">Arts & Humanities</option>
                  </select>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <span className="font-bold text-[var(--text-muted)]">{getSymbol()}</span>
                  </div>
                  <input 
                    type="number" 
                    value={filters.budget}
                    onChange={(e) => setFilters({...filters, budget: e.target.value})}
                    placeholder="Max Budget" 
                    className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl py-3 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] border border-transparent focus:border-[var(--accent-blue)] transition-all font-medium"
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2 px-8 min-w-[160px]">
                  {loading ? (
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                     <><Search className="w-5 h-5" /> Search</>
                  )}
                </button>
             </form>
           </div>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="space-y-6 pt-4 animate-pulse">
            <div className="h-8 bg-[var(--bg-secondary)] w-64 rounded-lg border border-[var(--border-color)]"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="h-64 bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-color)] p-6">
                   <div className="flex justify-between">
                     <div className="w-16 h-16 rounded-full bg-[var(--bg-primary)]"></div>
                     <div className="w-24 h-8 rounded-full bg-[var(--bg-primary)]"></div>
                   </div>
                   <div className="mt-6 space-y-3">
                     <div className="h-6 bg-[var(--bg-primary)] rounded w-3/4"></div>
                     <div className="h-4 bg-[var(--bg-primary)] rounded w-1/2"></div>
                     <div className="h-4 bg-[var(--bg-primary)] rounded w-full mt-4"></div>
                     <div className="h-4 bg-[var(--bg-primary)] rounded w-full"></div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
           <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl font-medium flex items-center gap-2">
             <AlertTriangle className="w-5 h-5" /> {error}
           </div>
        )}

        {/* Results Grid */}
        {results.length > 0 && !loading && (
          <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-2xl font-bold text-[var(--text-primary)]">AI Admissions Predictions</h2>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {results.map((uni, idx) => (
                 <div key={idx} className="glass-card-vibrant border border-[var(--border-color)] rounded-3xl p-6 flex flex-col hover:border-[var(--accent-blue)] transition-all group overflow-hidden relative">
                    
                    {/* Ring indicator background */}
                    <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors ${
                      uni.probabilityScore > 75 ? 'bg-emerald-500' : uni.probabilityScore > 40 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}></div>

                    <div className="flex justify-between items-start mb-6 z-10">
                       <div className="relative">
                          <svg className="w-20 h-20 transform -rotate-90">
                            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[var(--bg-secondary)]" />
                            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" 
                                    strokeDasharray={`${2 * Math.PI * 36}`} 
                                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - (uni.probabilityScore / 100))}`}
                                    className={`${uni.category === 'Safe' ? 'text-emerald-500' : uni.category === 'Target' ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000 ease-out`} />
                          </svg>
                          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                             <span className="text-xl font-black text-[var(--text-primary)]">{uni.probabilityScore}%</span>
                          </div>
                       </div>
                       <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border shadow-sm ${getCategoryColor(uni.category)}`}>
                         {getCategoryIcon(uni.category)} {uni.category}
                       </div>
                    </div>

                    <div className="z-10 flex-grow">
                      <h3 className="text-xl font-black text-[var(--text-primary)] mb-1 leading-tight group-hover:text-[var(--accent-blue)] transition-colors">{uni.name}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm font-medium text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {uni.location}</span>
                        <span className="flex items-center gap-1 font-bold text-[var(--text-primary)]">{formatCurrency(uni.estimatedTuitionUSD)} / yr</span>
                      </div>
                      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 rounded-xl text-sm text-[var(--text-primary)] leading-relaxed mb-6 shadow-sm">
                        <strong className="text-[var(--accent-orange)] block mb-1">AI Reason:</strong>
                        {uni.whyGoodFit}
                      </div>
                    </div>

                    <div className="mt-auto border-t border-[var(--border-color)] pt-4 z-10 flex flex-col gap-2">
                       <a href={`https://www.google.com/search?q=${encodeURIComponent(uni.name + " admissions international students")}`} target="_blank" rel="noopener noreferrer" className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] text-[var(--text-primary)] font-bold py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                         Research University <Search className="w-4 h-4" />
                       </a>
                       <Link to="/loans" state={{ tuition: uni.estimatedTuitionUSD, university: uni.name }} className="w-full bg-slate-900 border border-slate-700 text-white hover:bg-black font-bold py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                         Calculate Loan Eligibility <ArrowRight className="w-4 h-4" />
                       </Link>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}
        
        {/* Placeholder before search */}
        {!loading && results.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-16 text-center opacity-50">
            <GraduationCap className="w-20 h-20 text-[var(--text-muted)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--text-primary)]">Awaiting Parameters</h3>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto mt-2 font-medium">Verify your budget and course preferences above, then click Search to let our AI scan for matching universities.</p>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Universities;
