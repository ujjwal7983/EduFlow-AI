import React from 'react';
import { DollarSign, Landmark, Clock } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const LoanOffers = () => {
  const { formatCurrency } = useCurrency();
  const availableLoans = [
    { provider: 'HDFC Credila', amount: `Up to ${formatCurrency(50000)}`, rate: '8.5%', status: 'Available', icon: <Landmark className="w-6 h-6" /> },
    { provider: 'Prodigy Finance', amount: 'Up to 100% Tuition', rate: '7.0%', status: 'Pre-approved', icon: <DollarSign className="w-6 h-6" /> },
    { provider: 'Sallie Mae', amount: 'Variable', rate: '9.2%', status: 'Pending Review', icon: <Clock className="w-6 h-6" /> },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Recommended Loan Providers</h2>
      {availableLoans.map((loan, idx) => (
        <div 
          key={idx} 
          className="glass-card-vibrant border border-[var(--border-color)] p-6 rounded-2xl flex items-center justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer group"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent-blue)] group-hover:bg-[var(--accent-light)] transition-colors border border-[var(--border-color)]">
              {loan.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{loan.provider}</h3>
              <div className="text-[var(--text-secondary)] text-sm flex gap-3 mt-1 font-medium">
                <span className="text-[var(--text-primary)]">{loan.amount}</span>
                <span className="text-[var(--text-muted)]">|</span>
                <span>Interest: {loan.rate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 text-xs font-semibold border rounded-full ${
              loan.status === 'Pre-approved' 
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                : loan.status === 'Pending Review'
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)]'
            }`}>
              {loan.status}
            </span>
            <button className="hidden sm:block border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--accent-blue)] text-[var(--text-primary)] font-bold px-4 py-2 rounded-xl transition-colors shadow-sm">
              View Terms
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanOffers;
