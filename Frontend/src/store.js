import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import forgotResetPasswordReducer from './features/forgotResetPasswordSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotResetPassword: forgotResetPasswordReducer,
  },
});

export default store;
