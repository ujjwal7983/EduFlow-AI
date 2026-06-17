import React, { useState } from 'react';
import { ShieldAlert, Send, Activity, CheckCircle2, AlertTriangle, RefreshCcw } from 'lucide-react';
import api from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';

const QUESTIONS = [
  "Why did you choose this specific university over options in your home country?",
  "Who is sponsoring your education, and how can they afford it?",
  "What are your plans immediately after completing your degree?"
];

const VisaSimulator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setLoading(true);
    try {
      const response = await api.post(ENDPOINTS.AI.VISA_VETTING, {
        question: QUESTIONS[currentStep],
        answer: answer
      });

      if (response.data?.success) {
        setResults([...results, {
          question: QUESTIONS[currentStep],
          answer,
          ...response.data.evaluation
        }]);

        if (currentStep < QUESTIONS.length - 1) {
          setCurrentStep(currentStep + 1);
          setAnswer("");
        } else {
          setFinished(true);
        }
      }
    } catch (err) {
      console.error("Evaluation failed", err);
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setResults([]);
    setAnswer("");
    setFinished(false);
  };

  const averageScore = results.length > 0 
    ? Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / results.length)
    : 0;

  if (finished) {
    return (
      <div className="glass-card-vibrant rounded-3xl p-8 border border-[var(--border-color)] animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 bg-[var(--bg-secondary)] border-4" style={{ borderColor: averageScore > 75 ? '#10b981' : averageScore > 50 ? '#f59e0b' : '#ef4444'}}>
             <span className="text-3xl font-black text-[var(--text-primary)]">{averageScore}%</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Readiness Score</h2>
          <p className="text-[var(--text-secondary)]">Consular Officers look for scores above 85%.</p>
        </div>

        <div className="space-y-6">
          {results.map((res, idx) => (
            <div key={idx} className="bg-[var(--bg-secondary)] p-5 rounded-2xl border border-[var(--border-color)]">
               <div className="text-sm font-bold text-[var(--text-primary)] mb-2">Q: {res.question}</div>
               <div className="text-sm text-[var(--text-secondary)] italic mb-4">You: "{res.answer}"</div>
               <div className="grid sm:grid-cols-2 gap-4">
                 <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                   <div className="text-xs font-black text-red-500 uppercase tracking-wider mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Feedback</div>
                   <div className="text-sm text-[var(--text-primary)]">{res.feedback}</div>
                 </div>
                 <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                   <div className="text-xs font-black text-emerald-500 uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ideal Phrasing</div>
                   <div className="text-sm text-[var(--text-primary)]">{res.improvement}</div>
                 </div>
               </div>
            </div>
          ))}
        </div>

        <button onClick={reset} className="mt-8 btn-primary w-full flex items-center justify-center gap-2">
           <RefreshCcw className="w-5 h-5" /> Retake Mock Interview
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card-vibrant rounded-3xl p-6 md:p-8 flex flex-col h-full border border-[var(--border-color)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-[var(--bg-secondary)]">
         <div className="h-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-orange)] transition-all duration-500" style={{ width: `${(currentStep / QUESTIONS.length) * 100}%` }}></div>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 flex items-center justify-center text-white shadow-xl">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Visa Readiness Simulator</h2>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Question {currentStep + 1} of {QUESTIONS.length}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center mb-8">
        <div className="text-2xl md:text-3xl font-black text-[var(--text-primary)] leading-tight mb-8">
          "{QUESTIONS[currentStep]}"
        </div>

        <form onSubmit={handleSubmit} className="relative group">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={loading}
            placeholder="Type your answer as if speaking to the officer..."
            className="w-full h-40 bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-2xl p-5 text-[var(--text-primary)] resize-none focus:outline-none focus:border-[var(--accent-blue)] transition-colors disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={loading || !answer.trim()}
            className="absolute bottom-4 right-4 bg-[var(--accent-blue)] hover:bg-blue-600 text-white p-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
          >
            {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
      
      <div className="text-xs text-[var(--text-muted)] text-center font-medium">
        Speak confidently. Do not memorize scripts. The AI is grading context, not grammar.
      </div>
    </div>
  );
};

export default VisaSimulator;
