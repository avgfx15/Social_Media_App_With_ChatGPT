import { createSlice } from '@reduxjs/toolkit';
import { addLike, removeLike } from './likeAction';

const likeSlice = createSlice({
  name: 'likes',
  initialState: {
    likes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = action.payload.allLikesByPostId;
      })
      .addCase(addLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = state.likes.filter(
          (like) => like._id !== action.payload._id
        );
      })
      .addCase(removeLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const likeReducer = likeSlice.reducer;

export const likesState = (state) => state.likeReducer.likes;
