import React from 'react';
import { Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NudgeCard = ({ title, description, timeRemaining, linkText, linkUrl }) => {
  const isExternal = linkUrl && linkUrl.startsWith('http');
  const linkClasses = "inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-blue)] hover:text-[var(--accent-hover)] transition-colors";

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-5 rounded-2xl shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-blue)] opacity-5 rounded-bl-full pointer-events-none group-hover:opacity-10 transition-opacity"></div>
      
      <div className="flex items-start justify-between gap-4">
        <div className="bg-[var(--accent-light)] p-2.5 rounded-xl text-[var(--accent-blue)]">
          <Target className="w-5 h-5" />
        </div>
        {timeRemaining && (
           <div className="text-xs font-semibold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
             {timeRemaining}
           </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-[var(--text-primary)] mb-1.5">{title}</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">{description}</p>
        
        {linkText && (
          isExternal ? (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
              {linkText} <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <Link to={linkUrl || '#'} className={linkClasses}>
              {linkText} <ArrowRight className="w-4 h-4" />
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default NudgeCard;
