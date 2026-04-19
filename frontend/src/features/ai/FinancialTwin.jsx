import React, { useState, useEffect, useRef } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { Activity, Landmark, Briefcase, GraduationCap, ArrowRight, Zap, Target, PiggyBank } from 'lucide-react';
import CurrencySelector from '../../components/CurrencySelector';
import api from '../../api/axios';

const FinancialTwin = () => {
  const { formatCurrency, getSymbol, currentCurrency } = useCurrency();
  
  // Base sliders
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [startingSalary, setStartingSalary] = useState(85000);
  const [currentSalary, setCurrentSalary] = useState(30000);
  const [livingExpenses, setLivingExpenses] = useState(2500); // monthly post-grad


  const [metrics, setMetrics] = useState({
    yearsToPayoff: 0,
    totalInterest: 0,
    monthlyEMI: 0,
    disposableIncome: 0,
    roiPercentage: 0,
    breakEvenYears: 0
  });

  // Financial Twin calculation engine
  useEffect(() => {
    // Basic amortization logic
    // We assume they dedicate 30% of post-tax disposable income (after living expenses) to the loan,
    // plus any surplus from their part-time job during studying (simplified as a flat deduction).
    
    // Convert to target currency roughly if needed, but we keep it logical based on inputs
    // The sliders control the raw numbers. Let's assume input is in local currency units (e.g. USD).
    
    // Post tax assumption = 75%
    const monthlyNetSalary = (startingSalary * 0.75) / 12;
    const disposable = monthlyNetSalary - livingExpenses;
    
    // If they can't even afford living expenses, cap at 0
    const usableDisposable = Math.max(0.1, disposable); // Prevent divide by zero
    
    // Assume they pay 40% of their disposable income aggressively towards the loan
    let monthlyEMI = Math.max(usableDisposable * 0.4, 100); 

    const r = (interestRate / 100) / 12;
    
    // Calculate months to payoff using NPER formula
    // n = -log(1 - (r * P) / A) / log(1 + r)
    // where P is Principal, A is Monthly Payment
    
    let monthsToPayoff = 0;
    let totalInterest = 0;
    
    if ((r * loanAmount) >= monthlyEMI) {
      // EMI is too low to even cover interest
      monthsToPayoff = 360; // Max 30 years
      monthlyEMI = (r * loanAmount) + 10; // Force a minimum
    }
    
    monthsToPayoff = -Math.log(1 - (r * loanAmount) / monthlyEMI) / Math.log(1 + r);
    
    if (isNaN(monthsToPayoff) || monthsToPayoff > 360 || monthsToPayoff < 0) {
      monthsToPayoff = 360;
    }

    const years = monthsToPayoff / 12;
    totalInterest = (monthlyEMI * monthsToPayoff) - loanAmount;

    // ROI Math from old calculator
    const totalInvestment = loanAmount; 
    const salaryIncrement = startingSalary - currentSalary;
    
    let breakEvenYears = 0;
    let roiPercentage = 0;
    
    if (salaryIncrement > 0 && totalInvestment > 0) {
      breakEvenYears = totalInvestment / salaryIncrement;
      // 5 year ROI
      roiPercentage = (((salaryIncrement * 5) - totalInvestment) / totalInvestment) * 100;
    } else if (totalInvestment === 0) {
      roiPercentage = salaryIncrement > 0 ? 999 : 0;
    }

    setMetrics({
      yearsToPayoff: loanAmount === 0 ? "0.0" : years.toFixed(1),
      totalInterest: Math.max(0, totalInterest),
      monthlyEMI: loanAmount === 0 ? 0 : monthlyEMI,
      disposableIncome: disposable,
      roiPercentage: roiPercentage.toFixed(1),
      breakEvenYears: breakEvenYears.toFixed(1)
    });

  }, [loanAmount, interestRate, startingSalary, livingExpenses, currentSalary]);

  // AI Context Synchronization
  const contextTimer = useRef(null);
  useEffect(() => {
    // Only report context changes periodically to save API calls
    if (contextTimer.current) clearTimeout(contextTimer.current);
    
    contextTimer.current = setTimeout(() => {
      const message = `User is using Financial Twin. They tested a Loan of ${loanAmount} at ${interestRate}% with a Starting Salary of ${startingSalary} and Living Expenses set to ${livingExpenses}.`;
      // Fire and forget
      api.post('/user/context', { message }).catch(() => {});
    }, 2000); // Debounce for 2 seconds after they stop moving the slider

    return () => clearTimeout(contextTimer.current);
  }, [loanAmount, interestRate, startingSalary, livingExpenses]);

  return (
    <div className="glass-card-vibrant p-1 rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-[var(--bg-secondary)] rounded-t-3xl p-6 md:p-8 border-b border-[var(--border-color)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <Activity className="w-64 h-64 text-[var(--accent-blue)]" />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-[var(--accent-blue)]/20 shadow-sm">
              <Zap className="w-3.5 h-3.5" /> Interactive Playground
            </div>
            <h2 className="text-3xl font-black text-[var(--text-primary)]">AI Financial Twin</h2>
            <p className="text-[var(--text-secondary)] mt-1 max-w-lg leading-relaxed">
              Drag the sliders below to simulate your future financial life. See exactly how your loan interacts with part-time jobs and starting salaries.
            </p>
          </div>
          <CurrencySelector className="!bg-[var(--bg-primary)] border-[var(--border-color)] shadow-sm" />
        </div>
      </div>

      <div className="p-6 md:p-8 grid lg:grid-cols-12 gap-10 lg:gap-14 bg-[var(--glass-bg)]">
        
        {/* Sliders Column */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold flex items-center gap-2 text-[var(--text-primary)]">
                  <Landmark className="w-4 h-4 text-[var(--accent-orange)]" /> Loan Amount
                </label>
                <div className="text-xl font-black text-[var(--text-primary)]">{formatCurrency(loanAmount)}</div>
              </div>
              <input type="range" min="0" max="150000" step="1000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-orange)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)] focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)]" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold flex items-center gap-2 text-[var(--text-primary)]">
                  <Briefcase className="w-4 h-4 text-[var(--text-muted)]" /> Current Pre-Degree Salary
                </label>
                <div className="text-xl font-black text-[var(--text-primary)]">{formatCurrency(currentSalary)} / yr</div>
              </div>
              <input type="range" min="0" max="150000" step="1000" value={currentSalary} onChange={(e) => setCurrentSalary(Number(e.target.value))} className="w-full h-2 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--text-muted)] focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)]" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold flex items-center gap-2 text-[var(--text-primary)]">
                  <Activity className="w-4 h-4 text-emerald-500" /> Expected Starting Salary
                </label>
                <div className="text-xl font-black text-[var(--text-primary)]">{formatCurrency(startingSalary)} / yr</div>
              </div>
              <input type="range" min="0" max="250000" step="1000" value={startingSalary} onChange={(e) => setStartingSalary(Number(e.target.value))} className="w-full h-2 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)]" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold flex items-center gap-2 text-[var(--text-primary)]">
                  <PiggyBank className="w-4 h-4 text-rose-500" /> Est. Living Expenses
                </label>
                <div className="text-xl font-black text-[var(--text-primary)]">{formatCurrency(livingExpenses)} / mo</div>
              </div>
              <input type="range" min="0" max="10000" step="100" value={livingExpenses} onChange={(e) => setLivingExpenses(Number(e.target.value))} className="w-full h-2 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)]" />
            </div>

            <div className="space-y-3 p-4 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold flex items-center gap-2 text-[var(--text-primary)]">
                  <Target className="w-4 h-4 text-[var(--accent-blue)]" /> Aggressive Payoff Strategy
                </label>
                <div className="text-xl font-black text-[var(--accent-blue)]">{interestRate.toFixed(1)}% <span className="text-xs text-[var(--text-secondary)] font-medium">Interest Rate</span></div>
              </div>
               <input type="range" min="4.0" max="15.0" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-blue)] mt-2" />
               <p className="text-xs text-[var(--text-muted)] mt-2 italic">A lower interest rate means drastically smaller compounding debt over 10 years.</p>
            </div>
          </div>
        </div>

        {/* Visual Graph Output Column */}
        <div className="lg:col-span-5 flex flex-col justify-center">
           <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-8 relative shadow-md">
             
             <div className="text-center space-y-2 mb-8">
               <div className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)]">Debt Freedom Timestamp</div>
               <div className={`text-6xl font-black ${metrics.yearsToPayoff > 15 ? 'text-rose-500' : metrics.yearsToPayoff > 7 ? 'text-[var(--accent-orange)]' : 'text-emerald-500'}`}>
                 {metrics.yearsToPayoff} <span className="text-2xl text-[var(--text-secondary)] font-semibold">yrs</span>
               </div>
             </div>

             <div className="space-y-5">
               <div className="flex justify-between items-center py-3 border-b border-[var(--border-color)]">
                 <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm font-medium">
                   <Landmark className="w-4 h-4" /> Recommended EMI
                 </div>
                 <div className="font-bold text-[var(--text-primary)]">{formatCurrency(metrics.monthlyEMI)} <span className="text-xs font-normal">/mo</span></div>
               </div>
               
               <div className="flex justify-between items-center py-3 border-b border-[var(--border-color)]">
                 <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm font-medium">
                   <PiggyBank className="w-4 h-4" /> Lifetime Interest Paid
                 </div>
                 <div className="font-bold text-rose-500">+{formatCurrency(metrics.totalInterest)}</div>
               </div>

               <div className="flex justify-between items-center py-3 border-b border-[var(--border-color)]">
                 <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm font-medium">
                   <Target className="w-4 h-4" /> 5-Year Return on Investment
                 </div>
                 <div className={`font-bold ${metrics.roiPercentage > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{metrics.roiPercentage > 0 ? `+${metrics.roiPercentage}%` : `${metrics.roiPercentage}%`}</div>
               </div>

               <div className="flex justify-between items-center py-3 border-b border-[var(--border-color)]">
                 <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm font-medium">
                   <Activity className="w-4 h-4" /> Break Even Time
                 </div>
                 <div className="font-bold text-[var(--text-primary)]">{metrics.breakEvenYears} yrs</div>
               </div>

               <div className="flex justify-between items-center pt-3">
                 <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm font-medium">
                   <Briefcase className="w-4 h-4" /> Free Cash Post-EMI
                 </div>
                 <div className="font-bold text-emerald-500">{formatCurrency(Math.max(0, metrics.disposableIncome - metrics.monthlyEMI))} <span className="text-xs font-normal">/mo</span></div>
               </div>
             </div>

             {/* dynamic visual bar */}
             <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
               <div className="flex justify-between text-xs text-[var(--text-muted)] mb-2 font-bold uppercase">
                 <span>Year 0</span>
                 <span>Year 10</span>
                 <span>Year 20</span>
               </div>
               <div className="w-full h-3 bg-[var(--border-color)] rounded-full overflow-hidden relative">
                 <div 
                   className={`absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[var(--accent-orange)] to-rose-500 rounded-full transition-all duration-300`} 
                   style={{ width: `${Math.min(100, (metrics.yearsToPayoff / 30) * 100)}%` }}
                 ></div>
               </div>
             </div>
             
           </div>
        </div>
        
      </div>
    </div>
  );
};

export default FinancialTwin;
