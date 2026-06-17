import React, { useState } from 'react';
import { Calendar, Compass, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import api from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';

const TimelineGenerator = () => {
  const [targetIntake, setTargetIntake] = useState('Fall 2026');
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState(null);

  const generateTimeline = async () => {
    setLoading(true);
    try {
      const response = await api.post(ENDPOINTS.AI.TIMELINE, { targetIntake }).catch(() => null);
      if(response && response.data) {
        setTimeline(response.data.steps || []);
      } else {
        // Mocked response
        setTimeout(() => {
          setTimeline([
            { phase: "Research & Shortlisting", timeframe: "Now - 2 Months", description: "Finalize top 5 target universities based on ROI and placement stats.", status: "current" },
            { phase: "Standardized Tests", timeframe: "Month 3 - 4", description: "Prepare and appear for GRE/GMAT and TOEFL/IELTS.", status: "upcoming" },
            { phase: "Document Preparation", timeframe: "Month 5", description: "Draft SOPs, secure LORs from professors and managers.", status: "upcoming" },
            { phase: "Application Submission", timeframe: "Month 6 - 7", description: "Submit applications ahead of Priority deadlines to secure scholarships.", status: "upcoming" },
            { phase: "Financing & Loan Approvals", timeframe: "Month 8", description: "Leverage EduFlow Loan Matcher to apply for financing pre-approval.", status: "upcoming" },
            { phase: "Visa Process", timeframe: "Month 9 - 10", description: "I-20 reception and F1 Visa Interview preparation.", status: "upcoming" },
          ]);
          setLoading(false);
        }, 1000);
        return;
      }
    } catch (_) {
      // Error handling
    }
    setLoading(false);
  };

  return (
    <div className="glass-card-vibrant rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden">
      <div className="p-6 border-b border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Compass className="w-6 h-6 text-indigo-500" />
            AI Journey Timeline
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Generate a customized roadmap for your study abroad journey.</p>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-3">
          <select 
            value={targetIntake} 
            onChange={(e) => setTargetIntake(e.target.value)}
            className="bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none flex-1"
          >
            <option>Fall 2026</option>
            <option>Spring 2027</option>
            <option>Fall 2027</option>
          </select>
          <button 
            onClick={generateTimeline}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-70 whitespace-nowrap"
          >
            {loading ? 'Thinking...' : 'Generate'}
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {!timeline && !loading && (
          <div className="text-center py-12 text-[var(--text-secondary)] flex flex-col items-center">
            <Calendar className="w-16 h-16 mb-4 opacity-20" />
            <p>Select your target intake and click Generate to see your AI-crafted timeline.</p>
          </div>
        )}

        {loading && (
          <div className="space-y-6 max-w-2xl mx-auto py-4 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex-shrink-0"></div>
                <div className="flex-1 space-y-3 pt-1">
                  <div className="h-4 bg-[var(--bg-secondary)] rounded w-1/4 pb-1"></div>
                  <div className="h-3 bg-[var(--bg-secondary)] rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {timeline && !loading && (
          <div className="relative border-l border-[var(--border-color)] ml-4 md:ml-8 space-y-8 pb-4">
            {timeline.map((step, idx) => (
              <div key={idx} className="relative pl-8 md:pl-10 group">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--border-color)] ring-4 ring-transparent">
                  {step.status === 'current' ? (
                    <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-ping"></div>
                  ) : step.status === 'past' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <div className="w-2.5 h-2.5 bg-[var(--text-muted)] rounded-full"></div>
                  )}
                </span>
                <div className="bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm hover:border-indigo-500/50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{step.phase}</h3>
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-[var(--accent-light)] text-[var(--accent-blue)] px-2.5 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> {step.timeframe}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineGenerator;
