const express = require('express');
const { addLike, removeLike } = require('../controllers/likeControllers');
const authenticateToken = require('../Middleware/authMiddleware');
const likeRouter = express.Router();

likeRouter.post('/posts/:postId/like', authenticateToken, addLike);
likeRouter.delete('/posts/:postId/like', authenticateToken, removeLike);

module.exports = likeRouter;
