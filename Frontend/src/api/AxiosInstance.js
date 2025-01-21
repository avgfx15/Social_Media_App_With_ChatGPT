// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Your Express backend URL
    timeout: 10000, // Optional: Set a timeout for requests
});

export default axiosInstance;