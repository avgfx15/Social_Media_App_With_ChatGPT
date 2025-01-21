const express = require("express");
const { signup, signin, forgotPassword, resetPassword } = require("../controllers/userControllers");


const userRoutes = express.Router();

// POST /api/users/signup
userRoutes.post("/signup", signup);

// POST /api/users/signin - Sign in a user
userRoutes.post("/signin", signin);

// POST /api/users/forgot-password - Forgot password in a user
userRoutes.post("/forgot-password", forgotPassword);
// POST /api/users/signin - Sign in a user
userRoutes.post("/reset-password", resetPassword);

module.exports = userRoutes;
