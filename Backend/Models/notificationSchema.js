const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: String,
      enum: ['FOLLOW', 'LIKE', 'COMMENT', 'REPLY'],
      required: true,
    },
    initiator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // User who performed the action
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // Optional reference to the associated post
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', // Optional reference to the associated comment
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;