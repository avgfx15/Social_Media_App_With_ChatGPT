import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, resetState } from '../features/forgotResetPasswordSlice';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { message, loading, error } = useSelector(
    (state) => state.forgotResetPassword
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email)); // Dispatch the thunk
  };

  React.useEffect(() => {
    return () => {
      dispatch(resetState()); // Reset state on unmount
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
