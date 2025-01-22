# Product Requirements Document (PRD): Social Media Application (MERN Stack)

## Overview
The goal of this project is to create a social media application similar to Twitter using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application will enable users to create posts, interact with other users via comments and likes, build a personalized feed, and manage their profile and relationships with other users.

---

## Objectives
- Build an intuitive and user-friendly social media platform.
- Implement scalable architecture for future enhancements.
- Utilize modern web technologies (MERN stack) and ensure secure and efficient performance.

---

## Features and Functional Requirements

### 1. User Management
#### 1.1. User Authentication
- **Registration**: New users can register with a username, email, password (hashed), and optional profile information.
- **Login**: Users log in with email and password.
- **Authentication**: Use JWT for session management. Tokens will expire after a set duration.
- **Forgot Password**: Allow users to reset their password via email verification.

#### 1.2. User Profile
- Editable profile including name, bio, avatar, and location.
- Display user’s posts, followers, and following.
- Followers and following counts visible to the user and others.

#### 1.3. User Connections
- Follow/unfollow functionality.
- Ability to view followers and following lists.

---

### 2. Post Management
#### 2.1. Create Posts
- Users can create text-based posts.
- Support for uploading images or media files.

#### 2.2. Post Interactions
- **Like Posts**: Users can like and unlike posts.
- **Comment on Posts**: Users can write comments on posts (supports nested commenting).

#### 2.3. Post Feed
- Personalized feed showing posts from followed users, sorted by recency.
- Ability to paginate and load older posts.
- Trending posts section displaying posts with the highest engagement.

---

### 3. Comment Management
#### 3.1. Comment Creation
- Allow users to add comments on posts.
- Users can also comment on other comments (nested/hierarchical structure).

#### 3.2. Comment Interactions
- Users can like and unlike comments.
- View all comments (and sub-comments) for a post in a threaded format.

---

### 4. Feed and Notifications
#### 4.1. Personalized Feed
- The feed is dynamically generated based on posts by followed users.
- Include posts’ metadata, such as total likes and comments.

#### 4.2. Notifications
- Real-time notifications for likes, comments, follows, and replies.
- Mark notifications as read.

---

### 5. Search and Discovery
#### 5.1. Search Functionality
- Search for users by username or name.
- Display top results based on relevance.

#### 5.2. Discovery Section
- Suggest users to follow based on mutual connections or trending activity.

---

### 6. Admin Panel (Optional for Future Phase)
- Moderate posts and comments.
- Suspend or delete user accounts for violating policies.

---

## Technical Requirements

### 1. Technology Stack
- **Frontend**: React.js (with Context API or Redux for state management).
- **Backend**: Express.js.
- **Database**: MongoDB (using Mongoose for schema definition).
- **Authentication**: JSON Web Tokens (JWT).
- **Storage**: Cloudinary or AWS S3 for media uploads.

### 2. API Endpoints
#### User
- POST /api/auth/register
- POST /api/auth/login
- GET /api/users/:userId
- PUT /api/users/:userId
- GET /api/users/:userId/followers
- GET /api/users/:userId/following

#### Posts
- POST /api/posts
- GET /api/posts/:postId
- PUT /api/posts/:postId
- DELETE /api/posts/:postId
- GET /api/feed

#### Comments
- POST /api/comments/:postId
- GET /api/comments/:postId
- PUT /api/comments/:commentId
- DELETE /api/comments/:commentId

#### Likes
- POST /api/posts/:postId/like
- POST /api/comments/:commentId/like

#### Notifications
- GET /api/notifications
- PUT /api/notifications/mark-read

### 3. Performance Considerations
- Use pagination for feed and comment loading to handle large data sets.
- Implement indexes in MongoDB for faster queries (e.g., on `createdAt`, `likes`).
- Optimize image uploads by resizing and compressing.

### 4. Security
- Use bcrypt to hash passwords.
- Secure endpoints with middleware for authorization and rate-limiting.
- Use HTTPS for secure data transmission.

---

## Non-Functional Requirements
- **Scalability**: Design the backend to handle increased user traffic.
- **Responsiveness**: Ensure the UI is mobile-friendly and adjusts to different screen sizes.
- **Performance**: Target low response times (<200ms for key APIs).
- **Accessibility**: Follow best practices for accessibility, including ARIA labels and keyboard navigation.

---

## Timeline and Milestones
1. **Week 1-2**: Backend setup, authentication, and user model.
2. **Week 3-4**: Post and comment functionality.
3. **Week 5**: Feed and like features.
4. **Week 6**: Search, user profiles, and following system.
5. **Week 7**: Notifications and testing.
6. **Week 8**: UI/UX refinements and deployment.

---

## Future Enhancements
- Add a chat/messaging system.
- Implement video uploads.
- Introduce a monetization system for premium users.

---

## Conclusion
This application aims to deliver a feature-rich, secure, and scalable social media platform. By following this PRD, development can remain focused and efficient while delivering a high-quality product that meets user expectations.



- Technical Design Document for Social Media Application (MERN Stack)

Background

This document details the technical implementation of a social media application with key features such as user management, posts, comments, feeds, notifications, and search. The design will use the MERN stack, where:

    MongoDB: Database for storing data.
    Express.js: Backend framework.
    React.js: Frontend library for building the user interface.
    Node.js: Runtime for backend logic.

Feature Details
1. User Management
1.1 User Authentication
Backend API Specification

    Registration
        Method: POST
        URL: /api/auth/register
        Request Body:

{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response Body (Success):

{
  "message": "User registered successfully",
  "userId": "string"
}

Response Body (Error):

    {
      "error": "string"
    }

Login

    Method: POST
    URL: /api/auth/login
    Request Body:

{
  "email": "string",
  "password": "string"
}

Response Body (Success):

{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "avatar": "string"
  }
}

Response Body (Error):

    {
      "error": "Invalid email or password"
    }

Forgot Password

    Method: POST
    URL: /api/auth/forgot-password
    Request Body:

{
  "email": "string"
}

Response Body (Success):

{
  "message": "Password reset email sent"
}

Response Body (Error):

        {
          "error": "Email not found"
        }

Database Schema

    User Schema:

    const UserSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      avatar: { type: String },
      bio: { type: String },
      location: { type: String },
      followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    });

Relevant DB Queries

    Register User:

const user = new User({ username, email, password: hashedPassword });
await user.save();

Login User:

    const user = await User.findOne({ email });

Frontend Logic

    States:
        isAuthenticated: Boolean state for authentication.
        user: Object containing user details.
    API Calls:
        Use axios for API calls.
        On registration or login success, store the JWT token in local storage and update the isAuthenticated and user states.
    Implementation:
        Add api/auth/register and api/auth/login calls in AuthContext or Redux store.

2. Post Management
2.1 Create Posts
Backend API Specification

    Create Post
        Method: POST
        URL: /api/posts
        Request Body:

{
  "content": "string",
  "media": "string (optional)",
  "author": "userId"
}

Response Body (Success):

        {
          "message": "Post created successfully",
          "post": {
            "id": "string",
            "content": "string",
            "media": "string",
            "author": "userId",
            "createdAt": "string"
          }
        }

Database Schema

    Post Schema:

    const PostSchema = new mongoose.Schema({
      content: { type: String, required: true },
      media: { type: String },
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
      createdAt: { type: Date, default: Date.now }
    });

Relevant DB Queries

    Create Post:

    const post = new Post({ content, media, author });
    await post.save();

Frontend Logic

    States:
        posts: Array of posts displayed in the feed.
    API Calls:
        Add a POST request to /api/posts in the PostContext or Redux slice.
    Implementation:
        Create a CreatePost component with form inputs for content and optional media upload.
        On submission, call the backend API, then update the posts state.

3. Comment Management
3.1 Add Comments
Backend API Specification

    Add Comment
        Method: POST
        URL: /api/comments
        Request Body:

        {
          "content": "string",
          "postId": "string",
          "author": "userId",
          "parentComment": "string (optional)"
        }

Database Schema

    Comment Schema:

    const CommentSchema = new mongoose.Schema({
      content: { type: String, required: true },
      postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      createdAt: { type: Date, default: Date.now }
    });

Relevant DB Queries

    Add Comment:

    const comment = new Comment({ content, postId, author, parentComment });
    await comment.save();

Frontend Logic

    States:
        comments: Array of comments for a post.
    API Calls:
        Add a POST request to /api/comments in the CommentContext or Redux slice.
    Implementation:
        Create a CommentSection component.
        On adding a comment, update the comments state and call the backend API.

This document can be extended to other features such as notifications, feeds, and admin panels with similar details for APIs, frontend states, backend schemas, and queries. Let me know if you’d like the complete document or focus on any specific feature!

Technical Design Document for Followers/Following Feature
Background

The followers/following feature allows users to connect with others in the application. A user can follow another user, and this relationship should be reflected in the database, enabling functionalities such as personalized feeds and social connectivity.
Feature Details
Key Functionalities

    Follow User: A user can follow another user by clicking a button.
    Unfollow User: A user can unfollow another user.
    Followers/Following Lists: Users can view the list of their followers and the users they are following.
    Counts: Display follower and following counts on user profiles.

Backend API Specification
1. Follow a User

    Method: POST

    URL: /api/follow

    Request Body:

{
  "userId": "string",
  "followUserId": "string"
}

    userId: ID of the user initiating the follow action.
    followUserId: ID of the user being followed.

Response Body (Success):

{
  "message": "User followed successfully"
}

Response Body (Error):

    {
      "error": "User is already followed" // or any relevant error message.
    }

2. Unfollow a User

    Method: POST

    URL: /api/unfollow

    Request Body:

{
  "userId": "string",
  "unfollowUserId": "string"
}

Response Body (Success):

{
  "message": "User unfollowed successfully"
}

Response Body (Error):

    {
      "error": "User is not being followed"
    }

3. Get Followers List

    Method: GET

    URL: /api/users/:userId/followers

    Response Body (Success):

{
  "followers": [
    {
      "id": "string",
      "username": "string",
      "avatar": "string"
    }
  ]
}

Response Body (Error):

    {
      "error": "User not found"
    }

4. Get Following List

    Method: GET

    URL: /api/users/:userId/following

    Response Body (Success):

{
  "following": [
    {
      "id": "string",
      "username": "string",
      "avatar": "string"
    }
  ]
}

Response Body (Error):

    {
      "error": "User not found"
    }

## Database Schema and Models
1. User Schema

Update the User schema to include followers and following references:

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  bio: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

## Relevant Database Queries

  2. Follow a User:

const user = await User.findByIdAndUpdate(userId, {
  $addToSet: { following: followUserId }
});
const followedUser = await User.findByIdAndUpdate(followUserId, {
  $addToSet: { followers: userId }
});

3. Unfollow a User:

const user = await User.findByIdAndUpdate(userId, {
  $pull: { following: unfollowUserId }
});
const unfollowedUser = await User.findByIdAndUpdate(unfollowUserId, {
  $pull: { followers: userId }
});

4. Get Followers List:

const followers = await User.findById(userId).populate("followers", "username avatar");

5. Get Following List:

    const following = await User.findById(userId).populate("following", "username avatar");

### Frontend Logic
States

    followers: Array of follower data.
    following: Array of following data.
    isFollowing: Boolean indicating if the current user follows the profile user.

## API Calls

    Follow/Unfollow:
        Add API Call:

    const followUser = async (userId, followUserId) => {
      try {
        await axios.post("/api/follow", { userId, followUserId });
        // Update state (e.g., isFollowing)
      } catch (error) {
        console.error(error);
      }
    };

## Fetch Followers/Following:

    Get Followers:

const fetchFollowers = async (userId) => {
  const { data } = await axios.get(`/api/users/${userId}/followers`);
  setFollowers(data.followers);
};

Get Following:

        const fetchFollowing = async (userId) => {
          const { data } = await axios.get(`/api/users/${userId}/following`);
          setFollowing(data.following);
        };

## Implementation

    Add Follow/Unfollow Button:
        Use the isFollowing state to conditionally render the follow/unfollow button.

    Integrate API Calls:
        Call the followUser function on the button click for follow/unfollow actions.
        Use the fetchFollowers and fetchFollowing functions when rendering user profile pages.

    Profile Page Component:
        Render followers/following counts dynamically from the API responses.

## Connecting Backend and Frontend

    API Endpoints:
        Use axios or fetch to call the endpoints.
        Ensure the backend is accessible (CORS or proxy setup for local development).

    Global State:
        Use Context API or Redux for global user data (e.g., auth, profile, isFollowing).

    Error Handling:
        Display toast notifications or alerts for errors like network failures or invalid actions.

Below are the **additional models** required for your social media application built on top of the existing `User` model, adhering to the original project requirements and maintaining robust validations.

---
**As per the Base UserSchema Create Other relevent Schema for the Project with implementation code**

### **User Model**

```javascript

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


```

### **Post Model**
Represents user-created posts, supporting text and optional media.

```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Content is required'],
      maxlength: [500, 'Content cannot exceed 500 characters'],
      trim: true,
    },
    media: {
      type: String, // URL of media file (optional)
      validate: {
        validator: function (value) {
          return /^(http(s)?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|mp4|avi|mkv))$/.test(
            value
          );
        },
        message: 'Invalid media URL',
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tracks users who liked the post
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
```

---

### **Comment Model**
Supports hierarchical/nested commenting with parent-child relationships.

```javascript
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      maxlength: [250, 'Comment cannot exceed 250 characters'],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', // Enables nested comments
      default: null,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tracks users who liked the comment
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
```

---

### **Follow Model**
Tracks relationships between users for the followers/following functionality. (Optional as this relationship can also be handled in the `User` model.)

```javascript
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
```

---

### **Like Model (Optional)**
If likes need to be maintained in a separate collection for scalability and analytics.

```javascript
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
```

---

### **Notification Model**
Tracks user notifications for events like likes, comments, and follows.

```javascript
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
```

---

### **Database Relationships**

1. **User and Post**:
   - One-to-Many: A user can create multiple posts.
   - Defined via the `author` field in the `Post` schema.

2. **Post and Comment**:
   - One-to-Many: A post can have multiple comments.
   - Defined via the `post` field in the `Comment` schema and the `comments` array in the `Post` schema.

3. **Follow System**:
   - Many-to-Many: Users follow other users. Managed via an array (`followers` and `following`) in the `User` schema or the separate `Follow` schema.

4. **Likes**:
   - One-to-Many: A post or comment can have multiple likes. Managed via arrays in the `Post` and `Comment` models or a separate `Like` schema.

---

### **Validations Recap**
- Emails must follow a proper format.
- Passwords must be alphanumeric and >= 6 characters.
- Post content must not exceed 500 characters.
- Comments content must not exceed 250 characters.
- URLs must match valid media file formats.
- Relationships should be consistent (e.g., ensure referenced IDs exist).

---

### **Modifying the Auth User Model**
If you'd like, we can enhance the existing user schema to also track followers and following using:
```javascript
followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
```

Let me know if you’d like a specific adjustment or further optimization!

### **Create All POST related API**
Below are the implementation details for Post APIs, starting with /api/posts for operations such as create, retrieve, update, delete, and search posts.

We'll follow a layered architecture with controllers, routes, and repository methods to ensure modularity and maintainability.
Route Definitions

**Define routes in /routes/postRoutes.js:**
```javascript

const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Post routes
router.post('/', postController.createPost);
router.get('/:postId', postController.getPost);
router.get('/', postController.getAllPosts); // For fetching with pagination
router.patch('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);
router.get('/search', postController.searchPosts);

module.exports = router;

```

### Controller Methods

Controller methods are responsible for processing the request, invoking the appropriate repository logic, and sending responses.

1. Create Post

``` javascript
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { content, media } = req.body;
    const author = req.user.id; // Assuming `req.user` is populated via middleware

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const post = new Post({ content, media, author });
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

```

2. Get a Single Post

``` javascript

exports.getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate('author', 'username avatar').populate('comments');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

```

3. Get All Posts (with Pagination)

``` javascript

exports.getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination query params

    const posts = await Post.find()
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

```

4. Update a Post

``` javascript

exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, media } = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: postId, author: req.user.id },
      { content, media },
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

```

5. Delete a Post

```javascript

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOneAndDelete({ _id: postId, author: req.user.id });
    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

```

6. Search Posts

```javascript

exports.searchPosts = async (req, res) => {
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

```

### Repository Layer (Optional)

Use a repository layer to centralize database logic in /repositories/postRepository.js:

```javascript
const Post = require('../models/Post');

// Create a post
exports.createPost = (postData) => new Post(postData).save();

// Get post by ID with populates
exports.getPostById = (postId) => Post.findById(postId).populate('author comments');

// Get all posts with pagination
exports.getAllPosts = (page, limit) =>
  Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate('author comments');

// Update a post
exports.updatePost = (postId, authorId, updateData) =>
  Post.findOneAndUpdate(
    { _id: postId, author: authorId },
    updateData,
    { new: true, runValidators: true }
  );

// Delete a post
exports.deletePost = (postId, authorId) =>
  Post.findOneAndDelete({ _id: postId, author: authorId });

// Search posts
exports.searchPosts = (query) =>
  Post.find({ content: { $regex: query, $options: 'i' } }).populate('author comments');

```
### Service Layer (Optional)
Use a service layer to encapsulate business logic in /services/postService.js:

``` javascript
const PostRepository = require('../repositories/postRepository');
const CommentRepository = require('../repositories/commentRepository');
const AuthorRepository = require('../repositories/authorRepository');
const { validatePost } = require('../utils/validation');
const { createComment } = require('../services/commentService');
const { createAuthor } = require('../services/authorService');
const { createPost } = require('../repositories/postRepository');
const { updatePost } = require('../repositories/postRepository');
const { deletePost } = require('../repositories/postRepository');
const { searchPosts } = require('../repositories/postRepository');
const { getPostById } = require('../repositories/postRepository');
const { getAllPosts } = require('../repositories/postRepository');
const { updatePost } = require('../repositories/postRepository');
// Create a post
exports.createPost = async (postData) => {
  const author = await createAuthor(postData.author);
  const post = await createPost({ ...postData, author });
  return post;
  };
  // Get a post by ID
  exports.getPostById = async (postId) => {
    const post = await getPostById(postId);
    return post;
    };
    // Get all posts
    exports.getAllPosts = async (limit, page) => {
      const posts = await getAllPosts(limit, page);
      return posts;
      };
      // Update a post
      exports.updatePost = async (postId, authorId, updateData) => {
        const post = await getPostById(postId);
        if (post.author !== authorId) {
          throw new Error('Unauthorized');
          }
          const updatedPost = await updatePost(postId, updateData);
          return updatedPost;
          };
          // Delete a post
          exports.deletePost = async (postId, authorId) => {
            const post = await getPostById(postId);
            if (post.author !== authorId) {
              throw new Error('Unauthorized');
              }
              const deletedPost = await deletePost(postId);
              return deletedPost;
              };
              // Search posts
              exports.searchPosts = async (searchTerm) => {
                const posts = await searchPosts(searchTerm);
                return posts;
              }


              ```

### Connecting Layers

    Import Repositories in Controllers: Call repository methods from the controller to abstract database logic.
    Routing: Add the postRoutes.js to your app.js:

const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

Middleware: Ensure req.user is populated using authentication middleware before accessing routes that require user identification.