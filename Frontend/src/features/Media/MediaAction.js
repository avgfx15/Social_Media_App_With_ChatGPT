import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; // Replace with your API URL

export const uploadImage = createAsyncThunk('uploadImage', async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/uploads`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Failed to upload the image.');
  }
});
