import React from 'react';
import { useSelector } from 'react-redux';
import { getAllPostsState } from '../features/Post/PostSlice';
import { useNavigate } from 'react-router-dom';
import RichTextViewer from './RichTextViewer';

const PostList = () => {
  const navigate = useNavigate();

  const getAllPosts = useSelector(getAllPostsState);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
      {getAllPosts.map((post) => (
        <div
          key={post._id}
          className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg'
        >
          <img
            src={`./uploads/` + post.media}
            alt={post.title}
            className='w-full h-48 object-cover'
          />
          <div className='p-4'>
            <RichTextViewer title={post.title} />

            <div className='mt-2 text-gray-700'>{post.subTitle}</div>
            <div className='text-sm text-gray-600'>{post.category}</div>
            <RichTextViewer content={post.content.slice(0, 100)} />

            <button
              onClick={() => navigate(`/post/${post._id}`)}
              className='mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700'
            >
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
