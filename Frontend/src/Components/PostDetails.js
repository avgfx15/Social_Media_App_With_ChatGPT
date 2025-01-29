import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../features/Post/PostAction';
import { getCurrentPostState } from '../features/Post/PostSlice';
import RichTextViewer from './RichTextViewer';
import { addLike, removeLike } from '../features/Likes/likeAction';
import { loggedInUserState } from '../features/Auth/authSlice';
import { likesState } from '../features/Likes/LikeSlice';

const PostDetails = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const currentPost = useSelector(getCurrentPostState);
  const loggedInUser = useSelector(loggedInUserState);
  const allLikes = useSelector(likesState);
  console.log(allLikes);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPostById(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (currentPost) {
      setPost(currentPost);
    }
  }, [currentPost]);

  const handleLikePost = async () => {
    await dispatch(addLike(postId));
    dispatch(getPostById(postId)); // Refetch post data
  };

  const handleUnLikePost = async () => {
    await dispatch(removeLike(postId));
    dispatch(getPostById(postId)); // Refetch post data
  };

  const handleLikeComment = async (commentId) => {
    // Implement like comment functionality
  };

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  const hasLiked = currentPost?.likes?.includes(loggedInUser?._id);
  console.log(hasLiked);

  return (
    <div className='container mx-auto p-6'>
      <div className='rounded-3 shadow-lg mb-8'>
        <div className='relative w-full h-96 rounded-t-2xl overflow-hidden'>
          <img
            src={`/uploads/` + currentPost.media}
            alt={currentPost.title}
            className='w-full h-full object-cover border border-2 rounded-3'
          />
        </div>
        <div className='p-6'>
          <div className='mb-2'>
            <h3 className='text-2xl'>Title</h3>
            <RichTextViewer content={currentPost?.title} />
          </div>
          <h2 className='text-xl text-gray-700 mb-4'>
            {currentPost?.subTitle}
          </h2>
          <p className='text-sm text-gray-800 mb-6'>
            Category: {currentPost?.category}
          </p>

          <div className='text-lg mb-6'>
            <RichTextViewer content={currentPost?.content} />
          </div>
          <div className='flex items-center space-x-4'>
            {hasLiked ? (
              <button
                onClick={handleUnLikePost}
                disabled={!currentPost}
                type='button'
                className='py-1 px-2 bg-red-600'
              >
                Unlike
              </button>
            ) : (
              <button
                onClick={handleLikePost}
                disabled={!currentPost}
                type='button'
                className='py-1 px-2 bg-blue-600'
              >
                Like
              </button>
            )}
            <p>Likes: {currentPost?.likes?.length}</p>
            {/* Render comments and other post details */}
          </div>
        </div>
      </div>

      <section className='comments-section'>
        <h3 className='text-2xl font-semibold mb-4'>Comments</h3>
        {comments.length === 0 ? (
          <p className='text-gray-500'>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className='rounded-2xl shadow-md p-4 mb-4 bg-gray-50'
            >
              <p className='text-gray-800 mb-2'>{comment.content}</p>
              <div className='text-sm text-gray-400 mb-4'>
                By: {comment.author}
              </div>
              <button size='sm' onClick={() => handleLikeComment(comment.id)}>
                Like ({comment.likes})
              </button>
            </div>
          ))
        )}
      </section>

      <button className='mt-6' onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default PostDetails;
