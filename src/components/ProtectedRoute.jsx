import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { currentUser } = useAuth();
  return currentUser.isAuthenticated ? <Outlet /> : <Navigate to='/signin' />;
}
