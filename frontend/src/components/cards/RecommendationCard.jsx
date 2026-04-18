import React from 'react';
import { Sparkles, MapPin, ExternalLink } from 'lucide-react';

const RecommendationCard = ({ type = 'university', title, location, description, matchPercent, tags = [], linkUrl }) => {
  return (
    <div className="glass-card-vibrant border border-[var(--border-color)] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
           <Sparkles className="w-5 h-5" />
        </div>
        {matchPercent && (
           <div className="flex flex-col items-end">
             <span className="text-2xl font-black text-[var(--text-primary)] leading-none">{matchPercent}%</span>
             <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Match</span>
           </div>
        )}
      </div>

      <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1.5 pr-8">{title}</h3>
      {location && (
        <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm mb-3">
          <MapPin className="w-4 h-4" /> {location}
        </div>
      )}
      
      <p className="text-sm text-[var(--text-secondary)] mb-5 flex-grow line-clamp-3">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {tags.map((tag, i) => (
          <span key={i} className="text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-primary)] px-2 py-1 rounded-md">
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-4 border-t border-[var(--border-color)] mt-auto">
        <a href={linkUrl || '#'} className="flex items-center justify-center gap-2 w-full py-2 bg-[var(--bg-secondary)] hover:bg-[var(--accent-light)] text-[var(--accent-blue)] font-medium rounded-xl transition-colors">
          View Details <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default RecommendationCard;
