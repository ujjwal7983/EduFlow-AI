import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';

const ProfileScoreCard = ({ score = 450, lastUpdated, profile }) => {
  const navigate = useNavigate();
  
  // Normalize 200-850 score to 0-100 percentage for SVG arc calculation
  const percentage = Math.max(0, Math.min(100, ((score - 200) / 650) * 100));
  
  // Determine color based on score
  const colorClass = score >= 750 ? 'text-emerald-500' : score >= 600 ? 'text-blue-500' : 'text-amber-500';
  const bgClass = score >= 750 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : score >= 600 ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20';
  const label = score >= 750 ? 'Prime' : score >= 600 ? 'Good' : 'Fair';

  // Determine missing fields for boosts
  const boosts = [];
  if (!profile?.experienceYears || parseInt(profile.experienceYears) === 0) {
    boosts.push({ label: 'Add relevant internship experience', points: '+50 pts' });
  }
  if (!profile?.cgpa || profile?.cgpa < (profile?.cgpaScale || 4) * 0.8) {
    boosts.push({ label: 'Upload standardized test scores (GRE/GMAT)', points: '+35 pts' });
  }
  if (boosts.length === 0) {
    boosts.push({ label: 'Complete KYC documentation early', points: '+15 pts' });
  }

  return (
    <div className="glass-card-vibrant border border-[var(--border-color)] p-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[var(--accent-orange)]" /> Loan Trust Score
        </h3>
        <span className={`text-xs px-2 py-0.5 rounded-md font-bold border ${bgClass}`}>
          {label} Risk
        </span>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="relative inline-flex items-center justify-center w-40 h-40">
          {/* Background track (semi-circular) */}
          <svg className="w-full h-full transform" viewBox="0 0 36 36">
            <path className="text-[var(--border-color)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="100, 100" opacity="0.3"/>
            {/* Colored actual score track */}
            <path className={colorClass} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${percentage}, 100`} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            <span className="text-4xl font-black text-[var(--text-primary)] tracking-tight">{score}</span>
            <span className={`text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wide mt-1`}>Out of 850</span>
          </div>
        </div>
      </div>
      
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4 border border-[var(--border-color)]">
        <h4 className="text-xs font-bold text-[var(--text-primary)] mb-3 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-[var(--accent-yellow)]" /> AI Score Boosts
        </h4>
        <ul className="space-y-2.5">
          {boosts.slice(0, 2).map((b, i) => (
             <li key={i} className="flex items-start justify-between gap-2 group cursor-pointer" onClick={() => navigate('/onboarding')}>
               <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-[var(--accent-blue)]/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <ChevronRight className="w-3 h-3 text-[var(--accent-blue)] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] leading-snug">{b.label}</span>
               </div>
               <span className="text-[10px] font-bold text-[var(--accent-orange)] whitespace-nowrap bg-[var(--accent-orange)]/10 px-1.5 py-0.5 rounded flex-shrink-0">{b.points}</span>
             </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileScoreCard;
