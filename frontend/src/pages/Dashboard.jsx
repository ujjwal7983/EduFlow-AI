import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Target, TrendingUp, Award, BookOpen, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileScoreCard from '../components/cards/ProfileScoreCard';
import NudgeCard from '../components/cards/NudgeCard';
import RecommendationCard from '../components/cards/RecommendationCard';
import { generateUniversityMatches, generateNudges } from '../utils/dashboardHelpers';

const Dashboard = () => {
  const { user, profile } = useAuth();
  
  // Use profile values or fallbacks
  // Use profile values or fallbacks
  const cgpaDisplay = profile?.cgpa ? `${profile.cgpa.toFixed(1)} / ${profile.cgpaScale || 4.0}` : '-';
  const targetCourseDisplay = profile?.targetCourse || 'Target Course Info Needed';
  const degreeDisplay = profile?.degree ? profile.degree.split(' ')[0] : 'Degree';

  const recommendedUniversities = generateUniversityMatches(profile);
  const nudges = generateNudges(profile);

  const stats = [
    { title: 'Goal Progress', value: '75%', icon: <Target className="w-6 h-6 text-blue-500" /> },
    { title: 'Current CGPA', value: cgpaDisplay, icon: <TrendingUp className="w-6 h-6 text-emerald-500" /> },
    { title: 'Latest Milestone', value: `${degreeDisplay} Started`, icon: <BookOpen className="w-6 h-6 text-purple-500" /> },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 space-y-8">
        <header className="mb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-blue)]">{user?.name?.split(' ')[0] || 'Student'}</span>!
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">Here is your academic overview and AI-driven timeline for today.</p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-card-vibrant p-5 rounded-2xl shadow-sm flex items-center gap-4 dynamic-icon-hover">
                  <div className="p-3 bg-[var(--bg-secondary)] rounded-xl">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--text-secondary)]">{stat.title}</div>
                    <div className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Career Suggestion */}
            <div className="bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-blue)] rounded-3xl p-8 relative overflow-hidden shadow-lg border border-white/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              <div className="relative z-10 text-white max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-4 text-white border border-white/20 shadow-sm dynamic-icon-hover">
                  <Zap className="w-4 h-4 text-amber-200" /> New AI Career Insight
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">Strong Match: {targetCourseDisplay}</h2>
                <p className="text-white/90 mb-6 text-lg leading-relaxed font-medium">
                  {profile?.cgpa ? `Based on your recent CGPA of ${profile.cgpa}, our AI suggests you have a high affinity for your targeted program.` : 'Complete your academic profile outline to generate a precise AI matching score.'}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/ai-tools" className="bg-white text-[var(--accent-blue)] hover:bg-slate-50 px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg dynamic-icon-hover">
                    Run ROI Calculator
                  </Link>
                  <Link to="/ai-tools" className="bg-black/20 hover:bg-black/30 text-white border border-white/30 px-6 py-3 rounded-xl font-semibold backdrop-blur-sm transition-all focus:ring-4 focus:ring-white/50 dynamic-icon-hover">
                    Open AI Chat
                  </Link>
                </div>
              </div>
            </div>

            {/* Top Recommendations */}
            <div>
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-xl font-bold text-[var(--text-primary)]">Smart Match Universities</h2>
                 <Link to="#" className="text-[var(--accent-blue)] font-semibold text-sm flex items-center gap-1 hover:underline dynamic-icon-hover">
                   View all <ChevronRight className="w-4 h-4" />
                 </Link>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {recommendedUniversities.map((uni, idx) => (
                   <RecommendationCard 
                     key={idx}
                     title={uni.title} 
                     location={uni.location} 
                     matchPercent={uni.matchPercent} 
                     description={uni.description}
                     tags={uni.tags}
                   />
                 ))}
               </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            <ProfileScoreCard score={82} lastUpdated="Today, 9:41 AM" />
            
            <div className="glass-card-vibrant p-6">
              <h3 className="font-bold text-[var(--text-primary)] mb-4">Urgent Nudges</h3>
              <div className="space-y-4">
                {nudges.map((nudge, idx) => (
                  <NudgeCard 
                     key={idx}
                     title={nudge.title} 
                     description={nudge.description} 
                     timeRemaining={nudge.timeRemaining} 
                     linkText={nudge.linkText} 
                     linkUrl={nudge.linkUrl}
                  />
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
