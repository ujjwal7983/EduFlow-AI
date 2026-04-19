import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth State
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        localStorage.setItem('token', token);
        try {
          // Verify token and fetch profile
          const response = await api.get(ENDPOINTS.USER.PROFILE).catch(() => null);
          
          if(response && response.data) {
            setProfile(response.data.profile || null);
            // In a full app, user obj is returned from /me. Hardcode spoof for now if missing.
            if(!user) setUser({ name: 'Scholar', email: 'user@example.com' });
          } else {
            console.warn("Could not fetch profile");
          }
          setLoading(false);
        } catch (error) {
          console.error("Token invalid or network error", error);
          logout();
        }
      } else {
        localStorage.removeItem('token');
        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();
  }, [token]);

  const login = async (userData, authToken, userProfile = null) => {
    setLoading(true);
    setUser(userData);
    setToken(authToken);
    setProfile(userProfile);
    localStorage.setItem('token', authToken);

    if (!userProfile && authToken) {
      try {
        const response = await api.get(ENDPOINTS.USER.PROFILE).catch(() => null);
        
        if(response && response.data) {
          setProfile(response.data.profile || null);
        }
      } catch (error) {
        console.warn("Could not fetch profile during login", error);
      }
    }
    
    setLoading(false);
  };

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, profile, token, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
