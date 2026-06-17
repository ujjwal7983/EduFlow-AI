import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, MapPin, GraduationCap, Briefcase, ArrowRight, Globe, Calendar } from 'lucide-react';
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
  "MBBS"
];

const DESTINATIONS = ["USA", "UK", "Canada", "Germany", "Australia", "India", "Singapore", "Ireland"];

const Onboarding = () => {
  const { updateProfile, profile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    degree: profile?.degree || '',
    cgpa: profile?.cgpa || '',
    cgpaScale: profile?.cgpaScale || '4.0',
    targetCourse: profile?.targetCourse || '',
    targetCountry: profile?.targetCountry || [],
    residentCountry: profile?.residentCountry || 'India',
    experienceYears: profile?.experienceYears != null ? profile.experienceYears : '',
    enrollmentYear: profile?.enrollmentYear || new Date().getFullYear() + 1,
    strictCountryMatch: profile?.strictCountryMatch || false
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
        targetCountry: formData.targetCountry,
        strictCountryMatch: formData.strictCountryMatch,
        residentCountry: formData.residentCountry,
        experienceYears: formData.experienceYears === '' ? 0 : parseInt(formData.experienceYears),
        enrollmentYear: parseInt(formData.enrollmentYear)
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
                <input
                  type="text"
                  name="targetCourse" required value={formData.targetCourse} onChange={handleChange}
                  list="course-options"
                  placeholder="Select or type your target course"
                  className="w-full pl-12 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl focus:ring-2 focus:ring-[var(--accent-orange)] outline-none transition-all shadow-sm"
                />
                <datalist id="course-options">
                  {POPULAR_COURSES.map(course => <option key={course} value={course}>{course}</option>)}
                </datalist>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">Resident Country</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                  <Globe className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="residentCountry" required value={formData.residentCountry} onChange={handleChange}
                  list="resident-country-options"
                  placeholder="Select or type your resident country"
                  className="w-full pl-12 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl focus:ring-2 focus:ring-[var(--accent-orange)] outline-none transition-all shadow-sm"
                />
                <datalist id="resident-country-options">
                  <option value="India">India</option>
                  <option value="China">China</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="EU/UK">EU / UK</option>
                  <option value="USA/Canada">USA / Canada</option>
                </datalist>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:col-span-2">
              <div>
                <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">Work Exp. (Yrs)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <input 
                    type="number" name="experienceYears" min="0" max="30" placeholder="0" value={formData.experienceYears} onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl focus:ring-2 focus:ring-[var(--accent-orange)] outline-none transition-all shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">Enrollment Year</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input 
                    type="number" name="enrollmentYear" required placeholder="YYYY" value={formData.enrollmentYear} onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl focus:ring-2 focus:ring-[var(--accent-orange)] outline-none transition-all shadow-sm"
                  />
                </div>
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
              <div className="mt-4 flex items-start gap-2 bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)] animate-in fade-in zoom-in duration-300">
                <input 
                  type="checkbox" 
                  id="strictCountryMatch"
                  checked={formData.strictCountryMatch} 
                  onChange={(e) => setFormData({...formData, strictCountryMatch: e.target.checked})}
                  className="w-4 h-4 mt-0.5 accent-[var(--accent-orange)] cursor-pointer"
                />
                <label htmlFor="strictCountryMatch" className="text-sm font-medium text-[var(--text-secondary)] cursor-pointer leading-tight">
                  <strong className="text-[var(--text-primary)]">Strict Match:</strong> Only predict outcomes for exact checked countries (otherwise our algorithm may suggest high ROI fits from similar neighboring regions).
                </label>
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
