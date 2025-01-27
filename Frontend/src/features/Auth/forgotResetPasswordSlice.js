import { createSlice } from '@reduxjs/toolkit';
import { forgotPassword, resetPassword } from './forgotResetPasswordAction';

// % Initial State
const initialState = {
  loading: false,
  message: null,
  error: null,
};

// % Auth Slice
const forgotResetPasswordSlice = createSlice({
  name: 'forgotResetPassword',
  initialState,
  reducers: {
    resetState: (state) => {
      state.message = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = forgotResetPasswordSlice.actions;

export const forgotResetPasswordReducer = forgotResetPasswordSlice.reducer;
