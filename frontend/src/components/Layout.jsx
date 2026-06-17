import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, Sparkles, User, CreditCard, LogOut, Moon, Sun, Menu, X, GraduationCap } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Universities', path: '/universities', icon: <GraduationCap size={20} /> },
    { name: 'AI Tools', path: '/ai-tools', icon: <Sparkles size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
    { name: 'Loans', path: '/loans', icon: <CreditCard size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside className={`glass-panel ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{ width: '250px', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--glass-border)', padding: '1.5rem', transition: 'transform 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '3rem', color: 'var(--accent-primary)' }}>
          <Sparkles size={28} className="dynamic-icon-hover" /> EduFlow AI
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
                  borderRadius: '0.5rem', color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-light)' : 'transparent',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.2s'
                }}
                className="group"
                onMouseOver={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--bg-tertiary)'; }}
                onMouseOut={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }} className="group-hover:scale-110 group-hover:-rotate-6 group-hover:text-[var(--accent-orange)]">
                  {item.icon}
                </div> 
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name || 'Student'}</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={toggleTheme} className="dynamic-icon-hover" style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex' }}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} color="var(--accent-yellow)" />}
            </button>
            <button onClick={logout} className="dynamic-icon-hover" style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex' }}>
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '2rem 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', display: 'none' /* Only show on mobile */ }} className="mobile-header">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)' }}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          aside { position: fixed; z-index: 50; transform: translateX(-100%); background: var(--bg-secondary); }
          aside.mobile-open { transform: translateX(0); }
          .mobile-header { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default Layout;
