import { createSlice } from '@reduxjs/toolkit';
import { createPost, getCategories } from './PostAction';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    allPosts: [],
    status: 'idle',
    error: null,
    allCategories: [],
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

    // % Get All Categories
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});
export const postReducer = postSlice.reducer;

export const selectAllPostsState = (state) => state.posts.allPosts;

export const allCategoriesState = (state) => state.posts.allCategories;
