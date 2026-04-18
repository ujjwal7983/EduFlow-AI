import React, { useState } from 'react';
import { ShieldCheck, Crosshair, HelpCircle, Activity } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import CurrencySelector from '../../components/CurrencySelector';

const Eligibility = () => {
  const { formatCurrency } = useCurrency();
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);

  const checkEligibility = () => {
    setChecking(true);
    // Mock the eligibility logic normally computed on backend using user's profile
    setTimeout(() => {
      setResult({
        status: 'HIGH', // LOW, MEDIUM, HIGH
        maxAmount: 65000,
        score: 84,
        reasons: ['Strong academic record', 'High demand field (Data Science)', 'Targeting Tier-1 University']
      });
      setChecking(false);
    }, 1200);
  };

  return (
    <div className="glass-card-vibrant rounded-2xl shadow border border-[var(--border-color)] overflow-hidden mb-6">
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start justify-between">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent-blue)] text-sm font-semibold border border-[var(--accent-light)] shadow-sm">
              <ShieldCheck className="w-4 h-4" /> Smart Assessment
            </div>
            <CurrencySelector />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Check Your Loan Eligibility</h2>
          <p className="text-[var(--text-secondary)] max-w-lg">
            Our AI analyzes your academic profile, target destination, and chosen degree to give you instant pre-approval probability before you formally apply.
          </p>
          
          {!result && (
            <button 
              onClick={checkEligibility} disabled={checking}
              className="mt-2 btn-primary hover:scale-105 disabled:opacity-75"
            >
              {checking ? 'Analyzing Profile Data...' : 'Run Eligibility Check'}
            </button>
          )}
        </div>

        <div className="flex-shrink-0 w-full md:w-auto">
          {result ? (
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 border border-[var(--border-color)] shadow-sm w-full md:w-80 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-24 h-24 text-emerald-500" />
              </div>
              <div className="relative z-10">
                <div className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-widest mb-1">Probability</div>
                <div className={`text-3xl font-black mb-4 ${
                  result.status === 'HIGH' ? 'text-emerald-500' : 
                  result.status === 'MEDIUM' ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {result.status}
                </div>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-xs text-[var(--text-secondary)]">Pre-approved up to</div>
                    <div className="text-xl font-bold text-[var(--text-primary)]">{formatCurrency(result.maxAmount)}</div>
                  </div>
                  <div className="w-full bg-[var(--border-color)] rounded-full h-2">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${result.score}%` }}></div>
                  </div>
                </div>

                <div className="text-xs font-medium text-[var(--text-secondary)]">
                  <div className="mb-1 flex items-center gap-1"><Crosshair className="w-3 h-3"/> Top Factors:</div>
                  <ul className="list-disc pl-4 space-y-1 text-[var(--text-secondary)]">
                    {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 border border-dashed border-[var(--border-color)] w-full md:w-80 flex flex-col items-center justify-center text-center h-full min-h-[250px]">
              <Activity className="w-12 h-12 text-[var(--text-muted)] mb-3" />
              <div className="text-sm text-[var(--text-secondary)]">Awaiting assessment trigger...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
