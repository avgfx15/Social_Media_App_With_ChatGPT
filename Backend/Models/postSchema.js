const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      unique: true,
    },
    subTitle: {
      type: String,
      required: [true, 'Sub Title is required'],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      // maxlength: [500, 'Content cannot exceed 500 characters'],
      trim: true,
    },

    media: {
      type: String,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like', // Refrence associated likes
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // References associated comments
      },
    ],
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
