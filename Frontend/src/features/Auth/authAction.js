import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; // Replace with your API URL

// Async thunk for user sign-in
export const signinUser = createAsyncThunk(
  'auth/signinUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/signin`,
        userData
      );
      toast.success('Login successful!');

      return response.data; // Return user data and token
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed!');
      return rejectWithValue(
        error.response?.data?.error || 'An error occurred.'
      );
    }
  }
);

// Async thunk for user sign-up
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/signup`,
        userData
      );
      toast.success('Sign-up successful!');
      return response.data; // Return response data from signup
    } catch (error) {
      toast.error(error.response?.data?.error || 'Sign-up failed!');
      return rejectWithValue(
        error.response?.data?.error || 'An error occurred.'
      );
    }
  }
);

export const validateToken = createAsyncThunk(
  'userAuthenticate',
  async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;

      if (data.success) {
        return { data, token: token };
      } else {
        return { error: 'Access denied' };
      }
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }
);
