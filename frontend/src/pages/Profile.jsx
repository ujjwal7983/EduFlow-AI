import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { MapPin, GraduationCap, Map, Edit, Briefcase, Globe, Calendar } from 'lucide-react';
import ProfileScoreCard from '../components/cards/ProfileScoreCard';

const Profile = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Student Profile</h1>
          <button onClick={() => navigate('/onboarding')} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-orange)] text-[var(--text-primary)] px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm dynamic-icon-hover">
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="glass-card-vibrant p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
              
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--accent-orange)] to-[var(--accent-blue)] flex items-center justify-center text-white text-5xl font-black border-4 border-white/20 shadow-lg hover:scale-105 transition-transform">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">{user?.name || 'Unknown Student'}</h2>
                  <span className="inline-block mt-2 bg-[var(--bg-secondary)] px-3 py-1 rounded-full text-sm font-medium text-[var(--text-secondary)] border border-[var(--border-color)]">
                    {user?.email || 'email@example.com'}
                  </span>
                </div>
              </div>

              <div className="flex-1 w-full space-y-8 mt-4 md:mt-0">
                <div className="pb-6 border-b border-[var(--border-color)]">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
                    <GraduationCap className="w-5 h-5 text-[var(--accent-orange)]" /> Academic Background
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm">
                    <div>
                      <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Current Degree</div>
                      <div className="font-bold text-[var(--text-primary)]">{profile?.degree || 'Not Provided'}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">CGPA / Grade</div>
                      <div className="font-bold text-[var(--text-primary)]">{profile?.cgpa ? `${profile.cgpa} / ${profile.cgpaScale || 4.0}` : '-'}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
                    <Map className="w-5 h-5 text-[var(--accent-blue)]" /> Career Aspirations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm">
                    <div>
                      <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Target Course</div>
                      <div className="font-bold text-[var(--text-primary)] flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-[var(--accent-orange)]"/> {profile?.targetCourse || 'Undecided'}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Target Location</div>
                      <div className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                         <MapPin className="w-4 h-4 text-[var(--accent-blue)]" /> {(profile?.targetCountry && profile?.targetCountry.length > 0) ? (Array.isArray(profile.targetCountry) ? profile.targetCountry.join(', ') : profile.targetCountry) : 'Open to Options'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
                    <Globe className="w-5 h-5 text-emerald-500" /> Personal Background
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm">
                    <div>
                      <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Resident Country</div>
                      <div className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-emerald-500" /> {profile?.residentCountry || 'Not Provided'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Work Exp.</div>
                      <div className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-[var(--accent-primary)]" /> {profile?.experienceYears != null ? `${profile.experienceYears} Years` : '0 Years'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Enrollment</div>
                      <div className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[var(--accent-yellow)]" /> {profile?.enrollmentYear || 'Not Provided'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
             <ProfileScoreCard score={88} lastUpdated="Just now" />
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Profile;
