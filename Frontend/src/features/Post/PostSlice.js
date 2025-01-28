import { createSlice } from '@reduxjs/toolkit';
import { createPost, getAllPosts, getCategories } from './PostAction';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: true,
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
        state.allPosts.push(action.payload.post);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // % Get All POsts
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.allPosts = action.payload.allPosts;
        const uniqueCategories = [
          ...new Set(state.allPosts.map((post) => post.category)),
        ];
        state.allCategories = uniqueCategories;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      });

    // % Get All Categories
    // builder
    //   .addCase(getCategories.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(getCategories.fulfilled, (state, action) => {
    //     state.status = 'succeeded';
    //     state.allCategories = action.payload;
    //   })
    //   .addCase(getCategories.rejected, (state, action) => {
    //     state.status = 'failed';
    //   });
  },
});
export const postReducer = postSlice.reducer;

export const getAllPostsState = (state) => state.postReducer?.allPosts;

export const allCategoriesState = (state) => state.postReducer?.allCategories;
