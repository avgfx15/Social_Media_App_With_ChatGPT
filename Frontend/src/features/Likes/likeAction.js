import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; // Replace with your API URL

export const addLike = createAsyncThunk(
  'likes/addLike',
  async (postId, { rejectWithValue }) => {
    const token = localStorage.getItem('token'); // Ensure token is fetched here
    if (!token) {
      return rejectWithValue({ message: 'No token provided' });
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/posts/${postId}/like`,
        {}, // Empty object as the body since we are not sending any data
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add Bearer token here
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeLike = createAsyncThunk(
  'likes/removeLike',
  async (postId, { rejectWithValue }) => {
    const token = localStorage.getItem('token'); // Ensure token is fetched here
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/posts/${postId}/like`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add Bearer token here
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
