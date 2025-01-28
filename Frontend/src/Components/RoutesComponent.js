import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import CreatePostComponent from './PostComponents/CreatePostComponent';
import Dashboard from './Dashboard';

const RoutesComponent = () => {
  const authToken = localStorage.getItem('token');

  return (
    <Routes>
      {/* Protected Route for Home */}
      {authToken && (
        <>
          <Route
            path='/createpost'
            element={
              <ProtectedRoute>
                <CreatePostComponent />
              </ProtectedRoute>
            }
          />
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
        </>
      )}
      <Route path='/' element={<Home />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      {!authToken && (
        <>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesComponent;
