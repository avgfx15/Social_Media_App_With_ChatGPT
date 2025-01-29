import { configureStore } from '@reduxjs/toolkit';

import { postReducer } from './features/Post/PostSlice';
import { mediaReducer } from './features/Media/MediaSlice';
import { forgotResetPasswordReducer } from './features/Auth/forgotResetPasswordSlice';
import { authReducer } from './features/Auth/authSlice';
import { likeReducer } from './features/Likes/LikeSlice';

const store = configureStore({
  reducer: {
    authReducer,
    forgotResetPasswordReducer,
    postReducer,
    mediaReducer,
    likeReducer,
  },
});

export default store;
