import React, { useState } from 'react';
import { DollarSign, Landmark, Clock, X, Info, CreditCard, Sparkles, ExternalLink } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const LoanOffers = ({ requirements, recommendations, loading, error }) => {
  const { formatCurrency, getSymbol } = useCurrency();
  const [selectedTerms, setSelectedTerms] = useState(null);

  const amount = requirements?.amount ? parseFloat(requirements.amount) : 0;
  const tenure = requirements?.tenure ? parseInt(requirements.tenure) : 10;

  const calculateEMI = (principal, annualRate, years) => {
    if (!principal) return 0;
    const r = annualRate / 12 / 100;
    const n = years * 12;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Landmark': return <Landmark className="w-6 h-6" />;
      case 'DollarSign': return <DollarSign className="w-6 h-6" />;
      case 'Clock': return <Clock className="w-6 h-6" />;
      default: return <Landmark className="w-6 h-6" />;
    }
  };

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl text-center flex flex-col items-center justify-center min-h-[300px] animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 mb-4">
          <Info className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Comparison Service Unavailable</h3>
        <p className="text-[var(--text-secondary)] text-sm max-w-xs mx-auto mb-6"> Our AI comparison engine is experiencing high traffic. Please try recalculating in a few moments. </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-[var(--bg-secondary)] rounded-xl w-48 mb-6"></div>
        <div className="h-24 bg-[var(--bg-secondary)] rounded-2xl w-full mb-4"></div>
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-[var(--bg-secondary)] rounded-2xl w-full"></div>
        ))}
      </div>
    );
  }

  const offers = recommendations?.offers || [];
  const summary = recommendations?.summary || "Analyzing the best options for your profile...";

  return (
    <div className="space-y-4 h-full relative">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-[var(--accent-orange)]" /> Recommended Providers
      </h2>

      {/* AI Advisor Summary */}
      {recommendations && (
        <div className="bg-gradient-to-r from-[var(--accent-blue)]/10 to-[var(--accent-orange)]/10 border border-[var(--border-color)] p-5 rounded-2xl mb-6 flex gap-4 items-start shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-white dark:bg-black/20 p-2.5 rounded-xl text-[var(--accent-orange)] shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
             <div className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mb-1">AI Advisor Summary</div>
             <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">{summary}</p>
          </div>
        </div>
      )}
      
      {offers.map((loan, idx) => {
        const emi = calculateEMI(amount, loan.rate, tenure);
        return (
          <div 
            key={idx} 
            className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg hover:border-[var(--accent-blue)] group animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] flex items-center justify-center text-[var(--accent-blue)] group-hover:scale-110 transition-transform">
                {getIcon(loan.icon)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  {loan.provider} 
                  <span className={`px-2 py-0.5 text-[10px] uppercase font-bold border rounded-md ${
                    loan.status === 'Pre-approved' 
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                      : loan.status === 'Pending Review'
                      ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                      : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                  }`}>
                    {loan.status}
                  </span>
                </h3>
                <div className="text-[var(--text-secondary)] text-sm flex flex-wrap gap-x-3 gap-y-1 mt-1 font-medium">
                  <span className="text-[var(--text-primary)]">{loan.amountLabel}</span>
                  <span className="text-[var(--text-muted)]">•</span>
                  <span>{loan.rate}% APR</span>
                  <span className="text-[var(--text-muted)]">•</span>
                  <span className="text-[var(--accent-orange)] font-bold">{getSymbol()}{Math.round(emi).toLocaleString()} /mo</span>
                </div>
                <div className="text-[10px] text-[var(--text-muted)] mt-2 italic font-medium max-w-xs">{loan.reasoning}</div>
              </div>
            </div>

            <div className="w-full sm:w-auto flex flex-col gap-2">
              <a 
                href={loan.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto px-4 py-2 rounded-xl text-sm justify-center flex items-center gap-2"
              >
                Apply Now <ExternalLink className="w-4 h-4" />
              </a>
              <button 
                onClick={() => setSelectedTerms({ ...loan, emi })}
                className="w-full sm:w-auto border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] text-[var(--text-secondary)] font-medium px-4 py-1.5 rounded-xl transition-colors shadow-sm text-xs"
              >
                Details
              </button>
            </div>
          </div>
        );
      })}

      {/* Terms Modal */}
      {selectedTerms && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card-vibrant w-full max-w-md scale-in-center animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center">
              <h3 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-2">
                <Info className="w-5 h-5 text-[var(--accent-blue)]" /> Term Details
              </h3>
              <button 
                onClick={() => setSelectedTerms(null)}
                className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors border border-[var(--border-color)] text-[var(--text-secondary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
               <div>
                 <div className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Provider</div>
                 <div className="text-lg font-bold text-[var(--text-primary)]">{selectedTerms.provider}</div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                    <div className="text-xs text-[var(--text-secondary)] font-semibold">Interest Rate</div>
                    <div className="text-lg font-black text-[var(--text-primary)]">{selectedTerms.rate}%</div>
                  </div>
                  <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                    <div className="text-xs text-[var(--text-secondary)] font-semibold">Estimated EMI</div>
                    <div className="text-lg font-black text-[var(--accent-orange)]">{getSymbol()}{Math.round(selectedTerms.emi).toLocaleString()}</div>
                  </div>
                  <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                    <div className="text-xs text-[var(--text-secondary)] font-semibold">Processing Fee</div>
                    <div className="text-sm font-bold text-[var(--text-primary)]">{selectedTerms.processingFee}</div>
                  </div>
                  <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                    <div className="text-xs text-[var(--text-secondary)] font-semibold">Avg. Time</div>
                    <div className="text-sm font-bold text-[var(--text-primary)]">{selectedTerms.time}</div>
                  </div>
               </div>
               <button 
                 onClick={() => setSelectedTerms(null)} 
                 className="btn-primary w-full mt-2"
               >
                 Acknowledge
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LoanOffers;
