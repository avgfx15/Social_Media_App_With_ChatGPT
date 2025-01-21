import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Async thunk for user sign-in
export const signinUser = createAsyncThunk(
  'auth/signinUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/signin',
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
        'http://localhost:5000/api/users/signup',
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

// Authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // $ Sign In
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // + Sign Up
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
