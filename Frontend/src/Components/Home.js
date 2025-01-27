// src/components/Home.js
import React from 'react';
import CreatePostComponent from './PostComponents/CreatePostComponent';

const Home = () => {
  return (
    <div className='container mx-auto'>
      <h2 className='m-3 font-bold text-3xl'>
        Welcome to the User Authentication App
      </h2>
      <div>
        <CreatePostComponent />
      </div>
    </div>
  );
};

export default Home;
