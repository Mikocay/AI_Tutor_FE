'use client';

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from './hooks/useAuth';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';

// User Pages
import Dashboard from './pages/user/Dashboard';
import AIChat from './pages/user/AIChat';
import StudyPlanner from './pages/user/StudyPlanner';
import Analytics from './pages/user/Analytics';
import Community from './pages/user/Community';
import Profile from './pages/user/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import AIConfiguration from './pages/admin/AIConfiguration';
import ContentManagement from './pages/admin/ContentManagement';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

const App = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (user) {
      setIsAdmin(user.role === 'admin');
    }
  }, [user]);

  if (loading) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Route>

      {/* User Routes */}
      <Route
        element={
          <ProtectedRoute isAuthenticated={!!user && !isAdmin}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/ai-chat' element={<AIChat />} />
        <Route path='/study-planner' element={<StudyPlanner />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/community' element={<Community />} />
        <Route path='/profile' element={<Profile />} />
      </Route>

      {/* Admin Routes */}
      <Route
        element={
          <ProtectedRoute isAuthenticated={!!user && isAdmin}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/users' element={<UserManagement />} />
        <Route path='/admin/ai-config' element={<AIConfiguration />} />
        <Route path='/admin/content' element={<ContentManagement />} />
      </Route>

      {/* Redirect to login if not authenticated, or to appropriate dashboard if authenticated */}
      <Route
        path='*'
        element={
          !user ? (
            <Navigate to='/login' replace />
          ) : isAdmin ? (
            <Navigate to='/admin' replace />
          ) : (
            <Navigate to='/dashboard' replace />
          )
        }
      />
    </Routes>
  );
};

// Protected Route Component
const ProtectedRoute = ({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: JSX.Element;
}) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

export default App;
