import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC = () => {
  const { user } = useAuth();
  
  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Otherwise, render the child routes
  return <Outlet />;
};

export default PrivateRoute;