const User = require('../Models/userSchema');

const crypto = require('crypto');

const nodemailer = require('nodemailer');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const dotend = require('dotenv');
const { log } = require('console');

dotend.config();

// Controller for user signup
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create and save the user
    const newUser = new User({ email, password });
    const savedUser = await newUser.save();

    // Return success response
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: savedUser._id, email: savedUser.email },
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// $ Controller for user sign-in
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || '1h' } // Default expiration: 1 hour
    );
    const userData = {
      _id: user._id,
      email: user.email,
    };
    // Send the token to the response
    res.status(200).json({
      message: 'Login successful',
      token,
      userData,
    });
  } catch (error) {
    console.error('Error during signin:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// # forgot Password controller
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Save hashed token and expiry to the user model
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiry = Date.now() + 3600000; // 1-hour expiration
    await user.save();

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `Click this link to reset your password: ${resetLink}`,
    });

    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// # reset-password controller
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  console.log(token, newPassword);
  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user by reset token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, signin, forgotPassword, resetPassword };
