import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';
import { resetPassword } from '../features/Auth/forgotResetPasswordAction';
import { resetState } from '../features/Auth/forgotResetPasswordSlice';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { message, loading, error } = useSelector(
    (state) => state.forgotResetPassword
  );

  const dispatch = useDispatch();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); // Retrieve token from URL

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      dispatch(resetPassword({ token, newPassword }));
    } else {
      alert("Passwords don't match!");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetState()); // Reset state on unmount
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='password'
          placeholder='Enter new password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Confirm new password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
