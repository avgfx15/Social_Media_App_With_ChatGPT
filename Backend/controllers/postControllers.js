const Post = require('../Models/postSchema');
const Comment = require('../Models/commentSchema');

// + Create Post
const createPost = async (req, res) => {
  try {
    const { title, subTitle, category, content, media } = req.body;
    const author = req.user.id; // Assuming `req.user` is populated via middleware

    // Validate required fields
    if (!title || !subTitle || !category || !content) {
      return res.status(400).json({
        error: 'Title, SubTitle, and Content are required',
      });
    }

    // Check Title and SubTitle uniqueness
    const existingPost = await Post.findOne({ title, subTitle });
    if (existingPost) {
      return res.status(400).json({
        error: 'Post with this title and subtitle already exists',
      });
    }

    // Create the post
    const post = new Post({
      title,
      subTitle,
      category,
      content,
      media,
      author,
    });

    // Attempt to save the post
    await post.save();

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// / Get Post By Id
const getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate('author', 'email username avatar') // Populate author data
      .populate({
        path: 'comments', // Populate comments
        select: 'content author', // Select specific fields
        populate: {
          // Populate author for each comment
          path: 'author',
          select: 'email username avatar',
        },
      });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(201).json({
      message: 'Get Post successfully',
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// / Get All Posts
const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination query params

    const posts = await Post.find()
      .populate('author', 'email username avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({ allPosts: posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// * Update Post By Id
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, subTitle, content, media } = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: postId, author: req.user.id },
      { title, subTitle, content, media },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// - Delete Post By Id
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOneAndDelete({
      _id: postId,
      author: req.user.id,
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// % Search Post By Query
const searchPosts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const posts = await Post.find({ content: { $regex: query, $options: 'i' } })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// % Get category form Post

// Route to get all distinct categories from posts
const categories = async (req, res) => {
  try {
    const categories = await Post.distinct('category'); // Fetch distinct categories
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

module.exports = {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
  searchPosts,
  categories,
};
