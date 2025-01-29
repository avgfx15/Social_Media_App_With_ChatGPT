import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; // Replace with your API URL

const token = localStorage.getItem('token'); // Or wherever you store your token

// AsyncThunk for creating a post
export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/posts/`,
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add Bearer token here
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// % Get All POsts
export const getAllPosts = createAsyncThunk(
  'getallpost',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/posts`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// % Get Post By Id
export const getPostById = createAsyncThunk(
  'getpostbyid',
  async (postId, { rejectWithValue }) => {
    console.log(postId);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/posts/${postId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// % Get all categories from post
export const getCategories = createAsyncThunk(
  'categories/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/posts/categories`);
      return response.data;
    } catch {
      return rejectWithValue('Failed to fetch categories');
    }
  }
);
