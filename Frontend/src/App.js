import React, { useEffect } from 'react';

import RoutesComponent from './Components/RoutesComponent';
import Navbar from './Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from './features/Post/PostAction';
import { getAllPostsState } from './features/Post/PostSlice';
import Footer from './Components/Footer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <div className='h-screen'>
      <Navbar />

      <RoutesComponent />

      <Footer />
    </div>
  );
};

export default App;
