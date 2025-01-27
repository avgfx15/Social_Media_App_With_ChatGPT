import { createSlice } from '@reduxjs/toolkit';
const { uploadImage } = require('./MediaAction');

const initialState = {
  uploading: false,
  imageUrl: null,
  error: null,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        console.log(action.payload.url);

        state.uploading = false;
        state.imageUrl = action.payload.url;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.error.message;
      });
  },
});

export const mediaReducer = mediaSlice.reducer;

export const uploadingState = (state) => state.mediaReducer.uploading;

export const imageUrlState = (state) => state.mediaReducer?.imageUrl;

export const errorState = (state) => state.mediaReducer.error;
