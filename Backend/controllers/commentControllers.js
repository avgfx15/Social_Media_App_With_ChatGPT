const Comment = require('../Models/commentSchema');
const { findById } = require('../Models/likeSchema');
const Post = require('../Models/postSchema');

const createCommentByPostIdByUser = async (req, res) => {
  try {
    const { content, parentComment } = req.body;
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = new Comment({
      content,
      author: userId,
      post: postId,
      parentComment: parentComment || null,
    });

    const savedComment = await newComment.save();

    post.comments.push(savedComment._id);
    await post.save();

    const allCommentByPostId = await Comment.find({ post: postId }).populate(
      'author',
      'email'
    );

    const getPostById = await Post.findById({ _id: postId });

    res
      .status(201)
      .json({ newComment: savedComment, allCommentByPostId, getPostById });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate('author', 'name')
      .populate('likes', 'name');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateCommentByAuthor = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, author: userId },
      { content },
      { new: true }
    );

    if (!comment) {
      return res
        .status(404)
        .json({ message: 'Comment not found or not authorized' });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteCommentByAuthor = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      author: userId,
    });

    if (!comment) {
      return res
        .status(404)
        .json({ message: 'Comment not found or not authorized' });
    }

    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: commentId },
    });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const addLike = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: 'You already liked this comment' });
    }

    comment.likes.push(userId);
    await comment.save();

    res.status(200).json({ message: 'Comment liked successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const removeLike = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const likeIndex = comment.likes.indexOf(userId);
    if (likeIndex === -1) {
      return res
        .status(400)
        .json({ message: 'You have not liked this comment' });
    }

    comment.likes.splice(likeIndex, 1);
    await comment.save();

    res.status(200).json({ message: 'Comment unliked successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createCommentByPostIdByUser,
  getAllCommentsByPostId,
  updateCommentByAuthor,
  deleteCommentByAuthor,
  addLike,
  removeLike,
};
