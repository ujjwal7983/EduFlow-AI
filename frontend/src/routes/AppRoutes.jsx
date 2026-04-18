import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pages
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AiTools from '../pages/AiTools';
import Profile from '../pages/Profile';
import Loans from '../pages/Loans';
import Onboarding from '../pages/Onboarding';
import Universities from '../pages/Universities';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { token, profile, loading } = useAuth();
  
  if (loading) return null; // Avoid flashing

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // If user has no profile, force onboarding!
  if (!profile && window.location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route 
        path="/onboarding" 
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/ai-tools" 
        element={  
          <ProtectedRoute>
            <AiTools />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/loans" 
        element={
          <ProtectedRoute>
            <Loans />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/universities" 
        element={
          <ProtectedRoute>
            <Universities />
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
