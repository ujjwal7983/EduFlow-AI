import React, { useState, useEffect } from 'react';
import { Wallet, Activity, AlertCircle, TrendingUp, PlaneTakeoff, Globe, BookOpen } from 'lucide-react';
import api from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';

const HiddenCostsAnalyzer = () => {
  const { profile } = useAuth();
  const { formatCurrency } = useCurrency();
  const [country, setCountry] = useState('United Kingdom');
  const [course, setCourse] = useState('Master\'s Degree');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (profile) {
      if (profile.targetCountry && Array.isArray(profile.targetCountry)) {
        setCountry(profile.targetCountry[0]);
      } else if (profile.targetCountry) {
        setCountry(profile.targetCountry);
      }
      if (profile.targetCourse) setCourse(profile.targetCourse);
    }
  }, [profile]);

  const analyze = async () => {
    setLoading(true);
    try {
      const response = await api.post(ENDPOINTS.AI.HIDDEN_COSTS, {
        targetCountry: country,
        targetCourse: course
      });
      if (response.data?.success) {
        setAnalysis(response.data.analysis);
      }
    } catch (error) {
      console.error("Hidden cost analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card-vibrant rounded-3xl p-6 md:p-8 flex flex-col h-full border border-[var(--border-color)]">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-3">
           <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-sm">
             <AlertCircle className="w-6 h-6" />
           </div>
           <div>
             <h2 className="text-xl font-bold text-[var(--text-primary)]">Pre-Arrival Shock Tester</h2>
             <p className="text-sm text-[var(--text-secondary)] font-medium">Uncover hidden upfront costs.</p>
           </div>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-3">
          <label className="text-xs font-bold text-[var(--text-secondary)] uppercase flex items-center gap-1 mb-1"><Globe className="w-3 h-3" /> Destination</label>
          <input 
            type="text" 
            value={country} 
            onChange={e => setCountry(e.target.value)}
            className="w-full bg-transparent text-[var(--text-primary)] font-medium outline-none"
          />
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-3">
          <label className="text-xs font-bold text-[var(--text-secondary)] uppercase flex items-center gap-1 mb-1"><BookOpen className="w-3 h-3" /> Program</label>
          <input 
            type="text" 
            value={course} 
            onChange={e => setCourse(e.target.value)}
            className="w-full bg-transparent text-[var(--text-primary)] font-medium outline-none"
          />
        </div>
      </div>

      <button 
        onClick={analyze} 
        disabled={loading}
        className="w-full bg-slate-900 border border-slate-700 text-white font-bold py-3 rounded-xl hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mb-8 shadow-md"
      >
        {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Wallet className="w-5 h-5" />}
        {loading ? "Analyzing..." : "Reveal Hidden Costs"}
      </button>

      {analysis && (
        <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="text-center p-6 bg-red-500/5 border border-red-500/20 rounded-2xl relative overflow-hidden">
             <div className="text-sm font-black text-red-500 uppercase tracking-widest mb-2 z-10 relative">Estimated Cash Shortfall</div>
             <div className="text-4xl font-black text-[var(--text-primary)] z-10 relative flex items-center justify-center gap-2">
               {formatCurrency(analysis.totalEstimatedHiddenUSD)}
             </div>
             <div className="absolute top-0 left-0 w-full h-full opacity-10">
               <TrendingUp className="w-full h-full text-red-500" />
             </div>
          </div>

          <div className="space-y-3">
             <div className="text-sm font-bold text-[var(--text-secondary)]">Itemized Breakdown</div>
             {analysis.items?.map((item, idx) => (
                <div key={idx} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 rounded-xl flex items-start gap-4 hover:border-amber-500/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-primary)] flex items-center justify-center text-amber-500 shrink-0">
                    <PlaneTakeoff className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-center mb-1">
                       <h4 className="font-bold text-[var(--text-primary)] text-sm">{item.name}</h4>
                       <span className="font-black text-[var(--text-primary)]">{formatCurrency(item.costUSD)}</span>
                     </div>
                     <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">{item.reason}</p>
                  </div>
                </div>
             ))}
          </div>
        </div>
      )}

      {!analysis && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-50">
           <PlaneTakeoff className="w-12 h-12 text-[var(--text-muted)] mb-4" />
           <p className="text-[var(--text-secondary)] font-medium">Most students only budget for tuition and rent. Click above to test your real prep budget.</p>
        </div>
      )}
    </div>
  );
};

export default HiddenCostsAnalyzer;
