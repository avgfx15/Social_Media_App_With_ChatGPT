const Comment = require('../Models/commentSchema');
const Post = require('../Models/postSchema');

exports.createCommentByPostIdByUser = async (req, res) => {
  try {
    const { content, parentComment } = req.body;
    const { postId } = req.params;
    const userId = req.user._id;

    const newComment = new Comment({
      content,
      author: userId,
      post: postId,
      parentComment: parentComment || null,
    });

    const savedComment = await newComment.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllCommentsByPostId = async (req, res) => {
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

exports.updateCommentByAuthor = async (req, res) => {
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

exports.deleteCommentByAuthor = async (req, res) => {
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

exports.addLike = async (req, res) => {
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

exports.removeLike = async (req, res) => {
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
