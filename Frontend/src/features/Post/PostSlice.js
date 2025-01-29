import { createSlice } from '@reduxjs/toolkit';
import {
  createPost,
  getAllPosts,
  getCategories,
  getPostById,
} from './PostAction';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: true,
    allPosts: [],
    currentPost: null,
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

    // % Get Post By Id
    builder
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.currentPost = action.payload.post;
      })
      .addCase(getPostById.rejected, (state, action) => {
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

export const getCurrentPostState = (state) => state.postReducer?.currentPost;

export const allCategoriesState = (state) => state.postReducer?.allCategories;
