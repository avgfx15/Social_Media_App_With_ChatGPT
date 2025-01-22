import { createSlice } from '@reduxjs/toolkit';
import { createPost } from './PostAction';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    allPosts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allPosts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;

export const selectAllPostsState = (state) => state.posts.allPosts;
