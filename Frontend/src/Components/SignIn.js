import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser } from '../features/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      if (!isCheckboxChecked) return; // Prevent login if checkbox is not checked.
      // Call your Redux action or any API to perform signin
      const response = await dispatch(signinUser({ email, password }));
      console.log(response);
      console.log(response?.payload);

      // Assuming `signinUser` resolves with the server response
      if (response?.payload?.token) {
        // Adjust based on your API response
        // If success, navigate to dashboard
        toast.success('Login successful!');
        navigate('/');
      } else {
        // Handle login failure
        toast.error(response?.payload?.message || 'Login failed');
      }
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
              <label htmlFor='terms' className='ms-3'>
                I agree to the terms and conditions
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
