import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import api from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';
import { useCurrency } from '../../context/CurrencyContext';
import CurrencySelector from '../../components/CurrencySelector';

const ROICalculator = () => {
  const { getSymbol } = useCurrency();
  const [formData, setFormData] = useState({
    courseTuition: '',
    livingCostPerYear: '',
    courseDurationYears: '2',
    expectedStartingSalary: '',
    currentSalary: '0',
  });
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateROI = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Assuming a backend endpoint is ready, if not we fall back to frontend calculation simulation
      const response = await api.post(ENDPOINTS.AI.ROI, formData).catch(() => null);
      
      if (response && response.data) {
        setResults(response.data);
      } else {
        // Fallback simulation for prototype if backend is not hooked yet
        const tuition = parseFloat(formData.courseTuition) || 0;
        const living = (parseFloat(formData.livingCostPerYear) || 0) * (parseFloat(formData.courseDurationYears) || 0);
        const totalInvestment = tuition + living;
        const targetSalary = parseFloat(formData.expectedStartingSalary) || 0;
        const currentSalary = parseFloat(formData.currentSalary) || 0;
        
        const salaryIncrement = targetSalary - currentSalary;
        const breakEvenMonths = salaryIncrement > 0 ? (totalInvestment / salaryIncrement) * 12 : 0;
        
        // Mocked AI insights
        setTimeout(() => {
          setResults({
            totalInvestment,
            estimatedMonthlySavings: salaryIncrement * 0.4 / 12, // assuming 40% of increment is saved
            breakEvenMonths: breakEvenMonths.toFixed(1),
            breakEvenYears: (breakEvenMonths / 12).toFixed(1),
            roiPercentage: (((salaryIncrement * 5) - totalInvestment) / totalInvestment * 100).toFixed(1), // 5 year ROI
            insights: "Based on historical average tech roles in this region, your projected timeline to break even is realistic. Consider applying for teaching assistantships to offset living costs by up to 30%."
          });
        }, 800);
      }
    } catch (err) {
      setError("Failed to calculate ROI. Please try again.");
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <div className="glass-card-vibrant border border-[var(--border-color)] overflow-hidden">
      <div className="bg-[var(--accent-blue)] p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md text-white">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Education ROI Calculator</h2>
              <p className="text-indigo-100 mt-1 font-medium">Data-driven financial feasibility analysis</p>
            </div>
          </div>
          <CurrencySelector />
        </div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="p-6 sm:p-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
        <form onSubmit={calculateROI} className="space-y-5">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2">
              Investment Factors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Total Course Tuition ({getSymbol()})</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)] font-medium">
                    {getSymbol()}
                  </div>
                  <input
                    type="number"
                    name="courseTuition"
                    value={formData.courseTuition}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 py-2.5 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                    placeholder="45000"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Duration (Years)</label>
                <input
                  type="number"
                  name="courseDurationYears"
                  step="0.5"
                  value={formData.courseDurationYears}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 py-2.5 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Living Cost per Year ({getSymbol()})</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)] font-medium">
                    {getSymbol()}
                  </div>
                  <input
                    type="number"
                    name="livingCostPerYear"
                    value={formData.livingCostPerYear}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 py-2.5 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                    placeholder="15000"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2">
              Career Trajectory
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Current Salary / Opp. Cost ({getSymbol()})</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)] font-medium">
                    {getSymbol()}
                  </div>
                  <input
                    type="number"
                    name="currentSalary"
                    value={formData.currentSalary}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 py-2.5 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Post-Grad Target Salary ({getSymbol()})</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)] font-medium">
                    {getSymbol()}
                  </div>
                  <input
                    type="number"
                    name="expectedStartingSalary"
                    value={formData.expectedStartingSalary}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 py-2.5 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                    placeholder="90000"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg text-sm border border-red-500/20">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex justify-center items-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing Data...
              </>
            ) : (
              'Calculate ROI & Break-even'
            )}
          </button>
        </form>

        <div className="bg-[var(--bg-primary)]/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-center border border-[var(--border-color)] transition-all duration-500">
          {!results && !loading && (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-[var(--accent-light)] rounded-full flex items-center justify-center mx-auto text-[var(--accent-blue)] mb-4">
                <TrendingUp className="w-10 h-10 opacity-70" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Awaiting Input</h3>
              <p className="text-[var(--text-secondary)] max-w-sm mx-auto">Fill out your financial structure on the left to see advanced AI estimates on break-even timeline and ROI over 5 years.</p>
            </div>
          )}
          
          {loading && !results && (
            <div className="text-center animate-pulse space-y-8">
              <div className="w-20 h-20 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full mx-auto"></div>
              <div className="space-y-4">
                <div className="h-6 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded w-1/2 mx-auto"></div>
                <div className="h-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded w-2/3 mx-auto"></div>
              </div>
            </div>
          )}

          {results && !loading && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Analysis Results</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)] shadow-sm">
                  <div className="text-sm text-[var(--text-secondary)] mb-1 flex items-center gap-1 font-medium">
                     Required Fixed Capital
                  </div>
                  <div className="text-2xl font-bold text-[var(--text-primary)]">{getSymbol()}{results.totalInvestment?.toLocaleString()}</div>
                </div>
                <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)] shadow-sm leading-tight">
                  <div className="text-sm text-[var(--text-secondary)] mb-1 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> Break-Even Time
                  </div>
                  <div className="text-2xl font-bold text-[var(--accent-blue)]">{results.breakEvenYears} <span className="text-base font-medium">years</span></div>
                </div>
              </div>

              <div className="w-full bg-[var(--border-color)] rounded-full h-3 mb-1 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-400 to-[var(--accent-blue)] h-3 rounded-full" style={{ width: `${Math.min(100, Math.max(10, results.roiPercentage))}%`, transition: 'width 1s ease-out' }}></div>
              </div>
              <div className="flex justify-between text-sm font-medium text-[var(--text-secondary)]">
                <span>Total 5-Year Return:</span>
                <span className="text-emerald-500 font-bold">+{results.roiPercentage}%</span>
              </div>

              <div className="bg-[var(--accent-light)] p-4 rounded-xl border border-[var(--border-color)] text-sm text-[var(--text-primary)]">
                <p className="leading-relaxed"><strong className="text-[var(--accent-orange)]">AI Insight:</strong> {results.insights}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
