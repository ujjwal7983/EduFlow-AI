import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, MapPin, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';

const POPULAR_COURSES = [
  "B.Tech / B.E.",
  "M.Tech / M.E.",
  "BCA (Bachelor of Computer Applications)",
  "MCA (Master of Computer Applications)",
  "MBA (Master of Business Administration)",
  "BBA (Bachelor of Business Administration)",
  "MS in Computer Science",
  "MS in Data Science",
  "MS in Artificial Intelligence",
  "MBBS",
  "Other"
];

const DESTINATIONS = ["USA", "UK", "Canada", "Germany", "Australia", "India", "Singapore", "Ireland"];

const Onboarding = () => {
  const { updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    degree: '',
    cgpa: '',
    cgpaScale: '4.0',
    targetCourse: '',
    targetCountry: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleCountry = (country) => {
    setFormData(prev => ({
      ...prev,
      targetCountry: prev.targetCountry.includes(country) 
        ? prev.targetCountry.filter(c => c !== country)
        : [...prev.targetCountry, country]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to the backend
      const response = await api.post(ENDPOINTS.USER.PROFILE, {
        degree: formData.degree,
        cgpa: parseFloat(formData.cgpa) || null,
        cgpaScale: parseFloat(formData.cgpaScale),
        targetCourse: formData.targetCourse,
        targetCountry: formData.targetCountry
      });
      
      if (response.data?.success) {
        updateProfile(response.data.profile);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Failed to setup profile. Make sure the backend is responding.');
    } finally {
      if(!loading) setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent-blue)] rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--accent-orange)] rounded-full blur-[120px] opacity-20"></div>
      
      <div className="glass-card-vibrant w-full max-w-xl p-8 sm:p-12 relative z-10">
        <div className="inline-flex py-1.5 px-4 bg-[var(--accent-light)] text-[var(--accent-blue)] rounded-full mb-6 text-sm font-bold items-center gap-1.5 shadow-sm border border-[var(--border-color)]">
          <Sparkles className="w-4 h-4 text-[var(--accent-orange)]" /> Just a few quick questions
        </div>
        
        <h2 className="text-3xl font-black text-[var(--text-primary)] mb-2 tracking-tight">Let's craft your journey</h2>
        <p className="text-[var(--text-secondary)] mb-8 font-medium">To give you the most accurate AI insights, we need a baseline.</p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-6 text-sm font-medium border border-red-100 dark:border-red-900/30">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div>
              <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">Current Degree</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <input 
                  type="text" name="degree" required placeholder="e.g. B.Tech Computer Science" value={formData.degree} onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl focus:ring-2 focus:ring-[var(--accent-orange)] outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">Current CGPA & Scale</label>
              <div className="flex gap-2">
                <input 
                  type="number" name="cgpa" step="0.01" max={formData.cgpaScale} required placeholder="Score" value={formData.cgpa} onChange={handleChange}
                  className="w-2/3 px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl focus:ring-2 focus:ring-[var(--accent-orange)] outline-none transition-all shadow-sm"
                />
                <select
                  name="cgpaScale" value={formData.cgpaScale} onChange={handleChange}
                  className="w-1/3 px-3 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl focus:ring-2 focus:ring-[var(--accent-orange)] outline-none transition-all shadow-sm"
                >
                  <option value="4.0">/ 4.0</option>
                  <option value="5.0">/ 5.0</option>
                  <option value="10.0">/ 10.0</option>
                  <option value="100">/ 100%</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">Target Course</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <select
                  name="targetCourse" required value={formData.targetCourse} onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl focus:ring-2 focus:ring-[var(--accent-orange)] outline-none transition-all shadow-sm appearance-none"
                >
                  <option value="" disabled>Select a course</option>
                  {POPULAR_COURSES.map(course => <option key={course} value={course}>{course}</option>)}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-[var(--text-secondary)]">Target Destinations <span className="text-[var(--text-muted)] font-normal ml-1">(Optional)</span></label>
              </div>
              <div className="flex flex-wrap gap-2">
                {DESTINATIONS.map(country => {
                  const isSelected = formData.targetCountry.includes(country);
                  return (
                    <button
                      key={country}
                      type="button"
                      onClick={() => toggleCountry(country)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                        isSelected 
                          ? 'bg-[var(--accent-blue)] text-white border-[var(--accent-blue)] shadow-sm' 
                          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]'
                      }`}
                    >
                      {country}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="btn-primary w-full flex justify-center items-center gap-2 mt-8"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>Generate My Dashboard <ArrowRight className="w-5 h-5 dynamic-icon-hover" /></>}
          </button>
          
          <p className="text-center text-[var(--text-secondary)] text-sm mt-4">You can fill in financial specifics like Budget & Collateral later when using the Loan/ROI modules.</p>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
