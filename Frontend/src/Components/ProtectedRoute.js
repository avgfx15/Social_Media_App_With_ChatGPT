import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { validateToken } from '../features/Auth/authAction';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    if (authToken) {
      dispatch(validateToken(authToken));
    }
  }, [authToken, dispatch]);

  if (!authToken) {
    return <Navigate to='/signin' replace />; // Redirect unauthenticated users
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
