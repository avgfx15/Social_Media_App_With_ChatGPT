import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for Forgot Password (sending reset email)
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/users/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      return data.message; // Return the success message
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for Reset Password (handling new password reset)
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/users/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      return data.message; // Return success message
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const forgotResetPasswordSlice = createSlice({
  name: 'forgotResetPassword',
  initialState: {
    loading: false,
    message: null,
    error: null,
  },
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

export default forgotResetPasswordSlice.reducer;
