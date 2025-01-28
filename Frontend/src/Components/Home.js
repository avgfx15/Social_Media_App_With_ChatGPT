// src/components/Home.js
import React from 'react';

import { useSelector } from 'react-redux';
import { getAllPostsState } from '../features/Post/PostSlice';
import PostList from './PostList';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

const Home = () => {
  const getAllPosts = useSelector(getAllPostsState);
  console.log(getAllPosts);

  return (
    <div className='container mx-auto mb-3'>
      <h2 className='m-3 font-bold text-3xl'>
        Welcome to the User Authentication App
      </h2>
      <div className='text-center'>
        <button className='mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700'>
          <Link to='/createpost'>Create New Post</Link>
        </button>
      </div>
      <div>
        <PostList />
      </div>

      <Dashboard />
    </div>
  );
};

export default Home;
