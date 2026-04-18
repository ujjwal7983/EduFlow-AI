import React from 'react';
import { Award, Zap } from 'lucide-react';

const ProfileScoreCard = ({ score = 0, lastUpdated }) => {
  // Determine color based on score
  const colorClass = score >= 85 ? 'text-emerald-500' : score >= 65 ? 'text-blue-500' : 'text-amber-500';
  const bgClass = score >= 85 ? 'bg-emerald-500' : score >= 65 ? 'bg-blue-500' : 'bg-amber-500';
  const label = score >= 85 ? 'Excellent' : score >= 65 ? 'Good' : 'Needs Work';

  return (
    <div className="glass-card-vibrant border border-[var(--border-color)] p-6 rounded-2xl shadow-sm text-center">
      <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-6 uppercase tracking-wider flex items-center justify-center gap-2">
        <Award className="w-4 h-4" /> Comprehensive Score
      </h3>
      
      <div className="relative inline-flex items-center justify-center w-36 h-36 mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path className="text-[var(--border-color)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="100, 100" />
          <path className={colorClass} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${score}, 100`} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-[var(--text-primary)]">{score}</span>
          <span className={`text-xs font-bold ${colorClass}`}>{label}</span>
        </div>
      </div>
      
      <p className="text-xs text-[var(--text-secondary)] mt-2">
        Last updated {lastUpdated || 'just now'}
      </p>
      
      <button className="mt-5 w-full flex items-center justify-center gap-2 text-sm font-medium border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--accent-light)] text-[var(--text-primary)] py-2.5 rounded-xl transition-colors">
        <Zap className="w-4 h-4 text-[var(--accent-yellow)]" /> Boost Score
      </button>
    </div>
  );
};

export default ProfileScoreCard;
