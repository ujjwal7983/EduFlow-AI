import React, { useState } from 'react';
import { FileText, UploadCloud, CheckCircle } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import CurrencySelector from '../../components/CurrencySelector';

const ApplyLoan = () => {
  const { getSymbol } = useCurrency();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass-card-vibrant rounded-2xl shadow p-8 text-center border border-[var(--border-color)]">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Application Submitted!</h3>
        <p className="text-[var(--text-secondary)] max-w-md mx-auto">
          Your formal application has been forwarded to our lending partners. You will receive an update in 24-48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card-vibrant rounded-2xl shadow border border-[var(--border-color)] overflow-hidden">
      <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
        <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-500" />
          Formal Loan Application
        </h3>
        <CurrencySelector />
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-[var(--text-secondary)] mb-1">Requested Amount ({getSymbol()})</label>
            <input type="number" required className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 py-3 focus:ring-2 focus:ring-[var(--accent-orange)] outline-none shadow-sm" placeholder="e.g. 45000" />
          </div>
          <div>
            <label className="block text-sm font-bold text-[var(--text-secondary)] mb-1">Co-signer Status</label>
            <select className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 py-3 focus:ring-2 focus:ring-[var(--accent-orange)] outline-none shadow-sm appearance-none">
              <option>No Co-signer (Based on my profile)</option>
              <option>With US Co-signer</option>
              <option>With Domestic Co-signer</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">Upload Supporting Documents</label>
          <div className="border-2 border-dashed border-[var(--border-color)] rounded-xl p-8 text-center bg-[var(--bg-secondary)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] transition-colors cursor-pointer shadow-sm group">
            <UploadCloud className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-2 group-hover:text-[var(--accent-blue)]" />
            <div className="font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent-blue)]">Click to upload or drag & drop</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">PDF, JPG, PNG up to 10MB</div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="btn-primary">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyLoan;
