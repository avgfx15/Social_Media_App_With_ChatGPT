import { createSlice } from '@reduxjs/toolkit';
import { signinUser, signupUser, validateToken } from './authAction';

// % Define INITIALSTATE
const initialState = {
  loggedInUser: null,
  token: null,
  loading: false,
  error: null,
};

// Authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedInUser = null;
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
        state.loggedInUser = action.payload.user;
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

        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // % Check Valid Token
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        state.token = action.payload.token;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const loggedInUserState = (state) => state.authReducer.loggedInUser;

export const tokenState = (state) => state.authReducer.token;

export const loadingState = (state) => state.authReducer.loading;

export const errorState = (state) => state.authReducer.error;
