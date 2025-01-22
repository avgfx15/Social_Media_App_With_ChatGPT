// src/components/Home.js
import React from 'react';
import CreatePostComponent from './PostComponents/CreatePostComponent';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the User Authentication App</h2>
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <CreatePostComponent />
      </div>
    </div>
  );
};

export default Home;
