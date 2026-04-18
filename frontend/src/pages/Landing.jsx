import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BrainCircuit, GraduationCap, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 relative">
      
      {/* Navigation Bar */}
      <nav className="px-6 py-5 md:px-12 flex justify-between items-center border-b border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3 font-extrabold text-2xl tracking-tight text-[var(--accent-primary)] dynamic-icon-hover">
          <GraduationCap className="w-8 h-8" />
          <span>EduFlow AI</span>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? <Moon className="w-5 h-5 dynamic-icon-hover" /> : <Sun className="w-5 h-5 text-[var(--accent-yellow)] dynamic-icon-hover" />}
          </button>
          <Link to="/login" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-[var(--accent-primary)] transition-colors hidden sm:block">Log in</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col relative overflow-hidden pb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12 lg:pt-20 gap-10">
          
          <div className="absolute top-1/3 left-10 w-96 h-96 bg-[var(--accent-orange)] rounded-full blur-[100px] pointer-events-none opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent-blue)] rounded-full blur-[100px] pointer-events-none opacity-10"></div>

          <div className="flex-1 lg:pr-10 relative z-10 w-full text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
              Your Intelligent <br className="hidden sm:block" />
              <span className="text-gradient-vibrant pb-2">
                Career Navigator
              </span>
            </h1>
            
            <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Harness the power of AI to roadmap your academic journey, discover top institutions, and build a stellar career trajectory perfectly tailored to your profile.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register" className="btn-primary text-lg !px-8 !py-4 flex items-center justify-center gap-2">
                Start your journey <ArrowRight className="w-5 h-5 dynamic-icon-hover" />
              </Link>
              <Link to="/login" className="glass-panel hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all text-lg border border-[var(--border-color)]">
                View Demo
              </Link>
            </div>
          </div>

          {/* Dynamic Image Element - Framed Illustration */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative z-10 mt-10 lg:mt-0">
            <div className="w-full max-w-[450px] relative animate-float">
               {/* Background Glow */}
               <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--accent-orange)] to-[var(--accent-blue)] rounded-[2.5rem] blur-2xl opacity-30 dark:opacity-50"></div>
               
               {/* Framed Glass Card container */}
               <div className="relative glass-card-vibrant p-2 md:p-4 rounded-[2rem] overflow-hidden aspect-square flex items-center justify-center bg-white dark:bg-[#111928]">
                 <img src="/hero_light_isometric.png" alt="Career Navigator Illustration" className="w-full h-full object-cover rounded-3xl shadow-sm" />
               </div>
            </div>
          </div>
        </div>

          {/* Feature Grid */}
          <div className="grid sm:grid-cols-2 gap-6 mt-24 text-left max-w-3xl mx-auto z-20 relative">
            <div className="glass-card-vibrant p-8">
              <div className="bg-[var(--accent-light)] w-14 h-14 rounded-xl flex items-center justify-center mb-6 dynamic-icon-hover">
                 <BrainCircuit className="w-8 h-8 text-[var(--accent-orange)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Career Coach</h3>
              <p className="text-[var(--text-secondary)]">Chat natively with Google Gemini to explore your future options, prep for interviews, and get personalized advice.</p>
            </div>
            <div className="glass-card-vibrant p-8">
              <div className="bg-[var(--accent-light)] w-14 h-14 rounded-xl flex items-center justify-center mb-6 dynamic-icon-hover">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--accent-blue)]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Timeline Generator</h3>
              <p className="text-[var(--text-secondary)]">Structurally map out the exact months required to hit your target metrics for applications, visas, and financing.</p>
            </div>
          </div>
      </main>

    </div>
  );
};

export default Landing;
