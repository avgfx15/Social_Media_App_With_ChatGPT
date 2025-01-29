// filepath: /f:/Coding Ninjas Coourse/GENERATIVE_AI_TOOLS/Social_Media_App_With_ChatGPT/Backend/Controllers/likeController.js
const Like = require('../Models/likeSchema');
const Post = require('../Models/postSchema');

/**
 * Adds a like to a post.
 *
 * @async
 * @function addLike
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.postId - The ID of the post to like.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user._id - The ID of the authenticated user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 * @throws {Error} - If there is an error while adding the like.
 */
const addLike = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You already liked this post' });
    }

    // Add like to Like Model
    const like = new Like({
      post: postId,
      user: userId,
    });

    await like.save();

    const allLikesByPostId = await Like.find({ post: postId });

    post.likes.push(userId);
    await post.save();

    res
      .status(200)
      .json({ message: 'Post liked successfully', post, allLikesByPostId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add like to post', error });
  }
};

/**
 * Removes a like from a post.
 *
 * @async
 * @function removeLike
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.postId - The ID of the post to unlike.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user.id - The ID of the authenticated user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 * @throws {Error} - If there is a server error.
 */
const removeLike = async (req, res) => {
  try {
    const postId = req.params.postId;

    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex === -1) {
      return res
        .status(400)
        .json({ message: 'You have not liked this post', likeStatus: false });
    }

    await Like.findOneAndDelete({ post: postId, user: userId });

    const allLikesByPostId = await Like.find({ post: postId });

    post.likes.splice(likeIndex, 1);
    await post.save();

    res.status(200).json({
      message: 'Post unliked successfully',
      post,
      allLikesByPostId,
      likeStatus: true,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  addLike,
  removeLike,
};
