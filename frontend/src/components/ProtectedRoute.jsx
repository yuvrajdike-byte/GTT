import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4 transition-colors">
        <div className="w-12 h-12 border-4 border-[#ec4d25] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Verifying session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
