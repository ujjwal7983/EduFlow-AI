import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const CurrencySelector = ({ className }) => {
  const { currency, setCurrency, CURRENCIES } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className={`bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-bold rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:border-[var(--accent-blue)] transition-colors shadow-sm focus:ring-2 focus:ring-[var(--accent-blue)] appearance-none ${className || ''}`}
    >
      {CURRENCIES.map(c => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
};

export default CurrencySelector;
