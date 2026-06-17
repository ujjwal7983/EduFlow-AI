import React, { useState } from 'react';
import { ShieldCheck, Crosshair, Activity, Landmark, User, Calendar } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import CurrencySelector from '../../components/CurrencySelector';

const Eligibility = ({ onAssessmentComplete }) => {
  const { formatCurrency, getSymbol } = useCurrency();
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    amount: '',
    cosignerIncome: '',
    tenure: '10'
  });

  const checkEligibility = (e) => {
    e.preventDefault();
    if (!formData.amount) return;

    setChecking(true);
    
    // Simulate algorithmic assessment
    setTimeout(() => {
      const amount = parseFloat(formData.amount);
      const income = parseFloat(formData.cosignerIncome) || 0;
      
      let status = 'PRIME';
      let score = 750;
      
      if (amount > 5000000 && income < 1000000) {
        status = 'GOOD';
        score = 650;
      }
      if (amount > 10000000 && income < 500000) {
        status = 'FAIR';
        score = 550;
      }
      
      const assessmentResult = {
        status, 
        maxAmount: Math.max(amount, income * 5 + 2000000), // mock ceiling calc
        score,
        reasons: ['Strong academic record', 'High demand field (Data Science)', income > 0 ? 'Solid Co-signer' : 'Self-dependent profile']
      };
      
      setResult(assessmentResult);
      onAssessmentComplete({ ...formData, ...assessmentResult });
      setChecking(false);
    }, 1500);
  };

  return (
    <div className="glass-card-vibrant rounded-2xl shadow border border-[var(--border-color)] overflow-hidden mb-6">
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start justify-between">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent-blue)] text-sm font-semibold border border-[var(--border-color)] shadow-sm">
              <ShieldCheck className="w-4 h-4" /> Smart Assessment
            </div>
            <CurrencySelector />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Check Your Loan Eligibility</h2>
            <p className="text-[var(--text-secondary)] max-w-lg">
              Input our financial requirements so our AI can run a pre-approval probability check against our lending partners.
            </p>
          </div>

          <form onSubmit={checkEligibility} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[var(--text-secondary)] mb-1">Required Loan ({getSymbol()}) *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <input type="number" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-orange)] outline-none shadow-sm" placeholder="e.g. 4500000" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[var(--text-secondary)] mb-1">Co-signer Annual Income</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
                    <User className="w-4 h-4" />
                  </div>
                  <input type="number" value={formData.cosignerIncome} onChange={e => setFormData({...formData, cosignerIncome: e.target.value})} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-orange)] outline-none shadow-sm" placeholder="Optional" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-[var(--text-secondary)] mb-1">Target Repayment Tenure</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <select value={formData.tenure} onChange={e => setFormData({...formData, tenure: e.target.value})} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-orange)] outline-none shadow-sm appearance-none">
                    <option value="5">5 Years (Higher EMI, Faster Payoff)</option>
                    <option value="10">10 Years (Balanced)</option>
                    <option value="15">15 Years (Lower EMI, Long Term)</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" disabled={checking} className="btn-primary w-full sm:w-auto mt-4 disabled:opacity-75 flex items-center justify-center gap-2">
              {checking ? <Activity className="w-5 h-5 animate-pulse" /> : <ShieldCheck className="w-5 h-5" />}
              {checking ? 'Analyzing Profile Data...' : result ? 'Recalculate Probability' : 'Run Eligibility Check'}
            </button>
          </form>
        </div>

        <div className="flex-shrink-0 w-full md:w-80 h-full">
          {result ? (
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 border border-[var(--border-color)] shadow-md w-full relative overflow-hidden h-full flex flex-col justify-center animate-in fade-in zoom-in duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <ShieldCheck className="w-32 h-32 text-emerald-500" />
              </div>
              <div className="relative z-10">
                <div className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-widest mb-1">Approval Tier</div>
                <div className={`text-4xl font-black mb-4 ${
                  result.status === 'PRIME' ? 'text-emerald-500' : 
                  result.status === 'GOOD' ? 'text-blue-500' : 'text-amber-500'
                }`}>
                  {result.status}
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-xs text-[var(--text-secondary)]">Estimated Max Approval</div>
                    <div className="text-xl font-bold text-[var(--text-primary)]">{formatCurrency(result.maxAmount)}</div>
                  </div>
                  <div>
                     <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-[var(--text-secondary)]">Trust Score</span>
                        <span className={result.status === 'PRIME' ? 'text-emerald-500' : result.status === 'GOOD' ? 'text-blue-500' : 'text-amber-500'}>{result.score} / 850</span>
                     </div>
                     <div className="w-full bg-[var(--border-color)] rounded-full h-2">
                        <div className={`h-2 rounded-full transition-all duration-1000 ${result.status === 'PRIME' ? 'bg-emerald-500' : result.status === 'GOOD' ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${Math.max(0, ((result.score - 200) / 650) * 100)}%` }}></div>
                     </div>
                  </div>
                </div>

                <div className="text-xs font-medium text-[var(--text-secondary)]">
                  <div className="mb-2 flex items-center gap-1.5"><Crosshair className="w-4 h-4 text-[var(--accent-orange)]"/> Key Factors:</div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[var(--text-secondary)]">
                    {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
             <div className="bg-[var(--bg-secondary)]/50 rounded-2xl p-8 border-2 border-dashed border-[var(--border-color)] w-full md:w-80 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <Activity className="w-12 h-12 text-[var(--text-muted)] mb-3 opacity-50" />
              <div className="text-sm font-medium text-[var(--text-secondary)]">Awaiting input...</div>
              <div className="text-xs text-[var(--text-muted)] mt-2">Fill the form to calculate your approval odds.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
