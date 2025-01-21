const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      { unique: true, fields: ['follower', 'following'] }, // Prevent duplicate follow entries
    ],
  }
);

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;