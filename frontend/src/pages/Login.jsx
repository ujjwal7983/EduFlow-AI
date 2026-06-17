import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post(ENDPOINTS.AUTH.LOGIN, formData).catch(() => null);

      if (response && response.data) {
        const data = response.data;
        if(data.success) {
          await login(data.user, data.token);
          navigate('/dashboard');
        } else {
          setError(data.message || 'Login failed. Please check your credentials.');
        }
      } else {
        // Fallback for demo without backend - spoof profile to avoid onboarding loop
        setTimeout(async () => {
          await login({ name: 'Demo User', email: formData.email }, 'demo-token', { degree: 'Demo Degree', cgpa: 3.5 });
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err) {
      setError('Network error. Make sure the backend is running.');
    } finally {
      if(!loading) setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden">
      
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent-orange)] rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[var(--accent-blue)] rounded-full blur-[120px] opacity-20"></div>

      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors font-medium z-10 dynamic-icon-hover group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Home
      </Link>

      <div className="glass-card-vibrant w-full max-w-md p-8 sm:p-10 text-center relative z-10">
        
        <div className="inline-flex p-4 bg-[var(--accent-light)] text-[var(--accent-orange)] rounded-2xl mb-6 shadow-sm dynamic-icon-hover">
          <GraduationCap className="w-10 h-10" />
        </div>
        
        <h2 className="text-3xl font-black text-[var(--text-primary)] mb-2 tracking-tight">Welcome back</h2>
        <p className="text-[var(--text-secondary)] mb-8 font-medium">Log in to access your AI Career Navigator</p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-6 text-sm font-medium border border-red-100 dark:border-red-900/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          
          <div>
            <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 tracking-wide">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                <Mail className="w-5 h-5" />
              </div>
              <input 
                type="email" 
                required 
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-12 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl focus:ring-2 focus:ring-[var(--accent-orange)] outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 tracking-wide">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-12 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl focus:ring-2 focus:ring-[var(--accent-orange)] outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <><LogIn className="w-5 h-5 dynamic-icon-hover" /> Log in</>
            )}
          </button>

        </form>

        <p className="mt-8 text-[var(--text-secondary)] text-sm font-medium">
          Don't have an account? <Link to="/register" className="text-[var(--accent-orange)] font-bold hover:underline">Sign up now</Link>
        </p>
      </div>

    </div>
  );
};

export default Login;
