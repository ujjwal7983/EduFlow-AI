import React from 'react';
import { CheckCircle2, FileText, Landmark, Clock, FileKey, ShieldCheck } from 'lucide-react';

const LoanChecklist = () => {
  return (
    <div className="glass-card-vibrant rounded-2xl shadow border border-[var(--border-color)] overflow-hidden h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-primary)]">
        <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          Approval Checklist
        </h3>
      </div>
      
      <div className="p-6 flex-1 space-y-6">
        <div className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
          Prepare these essential items before clicking 'Apply Now' on your preferred loan provider's platform to ensure a smooth, single-session application.
        </div>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex gap-4 items-start group">
            <div className="bg-blue-500/10 p-2 rounded-xl text-blue-500 shrink-0 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
             <div>
                <h4 className="text-[var(--text-primary)] font-bold text-sm">Admission Letter</h4>
                <p className="text-[var(--text-muted)] text-xs mt-1">Unconditional offer letter from your target university specifying the course and duration.</p>
             </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 items-start group">
            <div className="bg-orange-500/10 p-2 rounded-xl text-orange-500 shrink-0 group-hover:scale-110 transition-transform">
              <Landmark className="w-5 h-5" />
            </div>
             <div>
                <h4 className="text-[var(--text-primary)] font-bold text-sm">Financial Records</h4>
                <p className="text-[var(--text-muted)] text-xs mt-1">Last 6 months of bank statements for you and your co-signer (if applicable).</p>
             </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 items-start group">
            <div className="bg-purple-500/10 p-2 rounded-xl text-purple-500 shrink-0 group-hover:scale-110 transition-transform">
              <FileKey className="w-5 h-5" />
            </div>
             <div>
                <h4 className="text-[var(--text-primary)] font-bold text-sm">KYC Documents</h4>
                <p className="text-[var(--text-muted)] text-xs mt-1">Passport, national ID, and proof of permanent address.</p>
             </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4 items-start group">
            <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-500 shrink-0 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
             <div>
                <h4 className="text-[var(--text-primary)] font-bold text-sm">Standardized Tests</h4>
                <p className="text-[var(--text-muted)] text-xs mt-1">GRE, GMAT, IELTS, or TOEFL scorecards depending on university requirements.</p>
             </div>
          </div>
        </div>
      </div>

      <div className="p-5 bg-[var(--bg-secondary)]/50 border-t border-[var(--border-color)]">
        <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
           <Clock className="w-5 h-5 text-amber-500" />
           Average approval time after document submission: <strong>48-72 Hours</strong>
        </div>
      </div>
    </div>
  );
};

export default LoanChecklist;
