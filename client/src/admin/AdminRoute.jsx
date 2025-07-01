import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAuthenticated =
    localStorage.getItem('admin-auth') === 'true' ||
    !!localStorage.getItem('admin-token');

  const loginPath = import.meta.env.VITE_ADMIN_PATH || '/admin-login';
  const location = useLocation();

  // If not authenticated, redirect to login with state for redirect after login
  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default AdminRoute;