import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated, userId } = useAuth();

  return isAuthenticated ? <Element {...rest} userId={userId} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
