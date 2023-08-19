import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
