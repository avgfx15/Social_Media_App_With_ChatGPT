const express = require('express');
const postRoutes = express.Router();

const {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
  searchPosts,
} = require('../controllers/postControllers');
const authenticateToken = require('../Middleware/authMiddleware');

// Post routes
postRoutes.post('/', authenticateToken, createPost);
postRoutes.get('/:postId', getPost);
postRoutes.get('/', getAllPosts); // For fetching with pagination
postRoutes.patch('/:postId', authenticateToken, updatePost);
postRoutes.delete('/:postId', authenticateToken, deletePost);
postRoutes.get('/search', searchPosts);

module.exports = postRoutes;
