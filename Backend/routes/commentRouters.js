const express = require('express');
const {
  createCommentByPostIdByUser,
  getAllCommentsByPostId,
  updateCommentByAuthor,
  deleteCommentByAuthor,
  addLike,
  removeLike,
} = require('../controllers/commentControllers');
const { protect } = require('../Middleware/authMiddleware');

const commentRouter = express.Router();

commentRouter.post(
  '/posts/:postId/comments',
  protect,
  createCommentByPostIdByUser
);
commentRouter.get('/posts/:postId/comments', getAllCommentsByPostId);
commentRouter.put('/comments/:commentId', protect, updateCommentByAuthor);
commentRouter.delete('/comments/:commentId', protect, deleteCommentByAuthor);
commentRouter.post('/comments/:commentId/like', protect, addLike);
commentRouter.delete('/comments/:commentId/like', protect, removeLike);

module.exports = commentRouter;
