const express = require('express');
const {
  createCommentByPostIdByUser,
  getAllCommentsByPostId,
  updateCommentByAuthor,
  deleteCommentByAuthor,
  addLike,
  removeLike,
} = require('../controllers/commentControllers');
const authenticateToken = require('../Middleware/authMiddleware');

const commentRouter = express.Router();

commentRouter.post(
  '/posts/:postId/comments',
  authenticateToken,
  createCommentByPostIdByUser
);
commentRouter.get('/posts/:postId/comments', getAllCommentsByPostId);
commentRouter.put(
  '/comments/:commentId',
  authenticateToken,
  updateCommentByAuthor
);
commentRouter.delete(
  '/comments/:commentId',
  authenticateToken,
  deleteCommentByAuthor
);
commentRouter.post('/comments/:commentId/like', authenticateToken, addLike);
commentRouter.delete(
  '/comments/:commentId/like',
  authenticateToken,
  removeLike
);

module.exports = commentRouter;
