import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { signinUser } from '../features/Auth/authAction';
import { loadingState, tokenState } from '../features/Auth/authSlice';

const SignIn = () => {
  const navigate = useNavigate();

  const isUserLoggedIn = useSelector(tokenState);
  const loading = useSelector(loadingState);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      if (isUserLoggedIn) return; // Prevent login if checkbox is not checked.
      // Call your Redux action or any API to perform signin
      await dispatch(signinUser({ email, password }));

      navigate('/');
    } catch (error) {
      console.error('Error during sign-in:', error);
      toast.error('Something went wrong, please try again.');
    }
  };

  return (
    <div className='container mt-5'>
      <ToastContainer />
      <h1 className='text-center mb-4'>Sign In</h1>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type='checkbox'
                id='terms'
                checked={isCheckboxChecked}
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
              />
              <label htmlFor='terms' className='m-3'>
                I agree to Sign In
              </label>
            </div>
            <button
              type='submit'
              className='btn btn-primary w-100'
              disabled={!isCheckboxChecked}
              style={{
                backgroundColor: isCheckboxChecked ? 'blue' : 'grey',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                cursor: isCheckboxChecked ? 'pointer' : 'not-allowed',
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <p>
            <Link to='/forgot-password'>Forgot Password?</Link>{' '}
            {/* Link to Forgot Password page */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
