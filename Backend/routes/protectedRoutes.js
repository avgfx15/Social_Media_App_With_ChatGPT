const express = require("express");
const authenticateToken = require("../Middleware/authMiddleware");

const protectedRouter = express.Router();

protectedRouter.get("/", authenticateToken, (req, res) => {


  res.json({ message: `Welcome, ${req.user.name}` });
});

module.exports = protectedRouter;
