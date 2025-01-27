const express = require('express');
const authenticateToken = require('../Middleware/authMiddleware');

const protectedRouter = express.Router();

protectedRouter.get('/', authenticateToken, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.name}`, success: true });
});

module.exports = protectedRouter;
