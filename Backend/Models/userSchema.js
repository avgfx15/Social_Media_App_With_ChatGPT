const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Email validation
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long'],
      validate: {
        validator: function (value) {
          // Ensure password has both letters and numbers
          return /[A-Za-z]/.test(value) && /\d/.test(value);
        },
        message:
          'Password must be alphanumeric and contain both letters and numbers',
      },
    },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
  try {
    // Check if password is modified
    if (!this.isModified('password')) {
      return next();
    }

    // Hash the password
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);

    next();
  } catch (error) {
    next(error);
  }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
