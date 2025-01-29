import { createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getAllCommentsByPostId,
  likeComment,
  unlikeComment,
  updateComment,
} from './commentAction';

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    getCommentByPostId: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        console.log(action.payload);

        state.loading = false;
        state.comments.push(action.payload.newComment);
        state.getCommentByPostId = action.payload.allCommentByPostId;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCommentsByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getAllCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.comments.findIndex(
          (comment) => comment._id === action.payload._id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.meta.arg
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.comments.findIndex(
          (comment) => comment._id === action.payload.comment._id
        );
        if (index !== -1) {
          state.comments[index] = action.payload.comment;
        }
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(unlikeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlikeComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.comments.findIndex(
          (comment) => comment._id === action.payload.comment._id
        );
        if (index !== -1) {
          state.comments[index] = action.payload.comment;
        }
      })
      .addCase(unlikeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const commentReducer = commentSlice.reducer;

export const commentsState = (state) => state.commentReducer.comments;
export const getCommentByPostIdState = (state) =>
  state.commentReducer.getCommentByPostId;
